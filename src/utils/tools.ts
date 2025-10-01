import { XMLBuilder } from "fast-xml-parser";
import https from "https";
import { spawnSync, SpawnSyncReturns } from "child_process"
import tmp from "tmp"
import crypto from "crypto";
import { urlEventos } from "./eventos.js"
import fs from "fs"
import path from 'path';
import { fileURLToPath } from 'url';
import pem from 'pem';
import { cUF2UF, json2xml, xml2json, formatData, UF2cUF } from "./extras.js"
import { SignedXml } from 'xml-crypto';






class Tools {
    #cert: {
        pfx: string;
        senha: string;
    };
    #pem: {
        key: string;
        cert: string;
        ca: string[]; // <- define que pode ser uma lista de strings
    } = {
            key: "",            // A chave privada extraída do PKCS#12, em formato PEM
            cert: "",           // O certificado extraído, em formato PEM
            ca: []     // Uma lista de certificados da cadeia (se houver), ou null
        };
    #config: {
        mod: string;
        xmllint: string;
        UF: string;
        tpAmb: number;
        CSC: string;
        CSCid: string;
        versao: string;
        timeout: number;
        openssl: any;
        CPF: any;
        CNPJ: any;
    };

    constructor(config = { mod: "", xmllint: 'xmllint', UF: '', tpAmb: 2, CSC: "", CSCid: "", versao: "4.00", timeout: 30, openssl: null, CPF: "", CNPJ: "" }, certificado = { pfx: "", senha: "" }) {
        if (typeof config != "object") throw "Tools({config},{}): Config deve ser um objecto!";
        if (typeof config.UF == "undefined") throw "Tools({...,UF:?},{}): UF não definida!";
        if (typeof config.tpAmb == "undefined") throw "Tools({...,tpAmb:?},{}): tpAmb não definida!";
        if (typeof config.versao == "undefined") throw "Tools({...,versao:?},{}): versao não definida!";

        //Default do sistema
        if (typeof config.timeout == "undefined") config.timeout = 30;
        if (typeof config.xmllint == "undefined") config.xmllint = 'xmllint';
        if (typeof config.openssl == "undefined") config.openssl = null;

        //Configurar certificado
        this.#config = config;
        this.#cert = certificado;
    }

    sefazEnviaLote(xml: string, data: any = { idLote: 1, indSinc: 0, compactar: false }): Promise<string> {
        return new Promise(async (resolve, reject) => {
            if (typeof data.idLote == "undefined") data.idLote = 1;
            if (typeof data.indSinc == "undefined") data.indSinc = 0;
            if (typeof data.compactar == "undefined") data.compactar = false;

            await this.#certTools();
            let jsonXmlLote = {
                "soap:Envelope": {
                    "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                    "@xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
                    "@xmlns:soap": "http://www.w3.org/2003/05/soap-envelope",
                    "soap:Body": {
                        "nfeDadosMsg": {
                            "@xmlns": "http://www.portalfiscal.inf.br/nfe/wsdl/NFeAutorizacao4",
                            "enviNFe": {
                                ...{
                                    "@xmlns": "http://www.portalfiscal.inf.br/nfe",
                                    "@versao": "4.00",
                                    "idLote": data.idLote,
                                    "indSinc": data.indSinc,
                                },
                                ...(await this.xml2json(xml))
                            }
                        }
                    }
                },
            }
            let xmlLote = await this.json2xml(jsonXmlLote);
            try {
                let tempUF = urlEventos(this.#config.UF, this.#config.versao);
                const req = https.request(tempUF[`mod${this.#config.mod}`][(this.#config.tpAmb == 1 ? "producao" : "homologacao")].NFeAutorizacao, {
                    ...{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/soap+xml; charset=utf-8',
                            'Content-Length': xmlLote.length,
                        },
                        rejectUnauthorized: false
                    },
                    ...await this.#certTools()
                }, (res) => {
                    let data = '';

                    res.on('data', (chunk) => {
                        data += chunk;
                    });

                    res.on('end', async () => {
                        try {
                            resolve(await this.#limparSoap(data));
                        } catch (error) {
                            resolve(data)
                        }
                    });
                });

                req.setTimeout(this.#config.timeout * 1000, () => {
                    reject({
                        name: 'TimeoutError',
                        message: 'The operation was aborted due to timeout'
                    });
                    req.destroy(); // cancela a requisição
                });
                req.on('error', (erro) => {
                    reject(erro);
                });
                req.write(xmlLote);
                req.end();
            } catch (erro) {
                reject(erro);
            }
        })
    }

    async xmlSign(xmlJSON: string, data: any = { tag: "infNFe" }): Promise<string> {
        return new Promise(async (resvol, reject) => {
            if (data.tag === undefined) data.tag = "infNFe";
            var xml = await this.xml2json(xmlJSON) as any;

            if (data.tag == "infNFe") {
                if (xml.NFe.infNFe.ide.mod * 1 == 65) {
                    xml.NFe.infNFeSupl.qrCode = this.#gerarQRCodeNFCe(xml.NFe, "2", this.#config.CSCid, this.#config.CSC);
                    xmlJSON = await json2xml(xml);
                }
                xml.NFe = {
                    ...xml.NFe,
                    ... await xml2json(await this.#getSignature(xmlJSON, data.tag))
                };
            } else if (data.tag == "infEvento") {
                xml.envEvento.evento = {
                    ...xml.envEvento.evento,
                    ... (await xml2json(await this.#getSignature(xmlJSON, data.tag)))
                };
            }
            resvol(await json2xml(xml));
        })
    }

    //Responsavel por gerar assinatura
    async #getSignature(xmlJSON: string, tag: string): Promise<string> {
        return new Promise(async (resvol, reject) => {
            let tempPem = await this.#certTools() as any;
            const sig = new SignedXml({
                privateKey: tempPem.key,
                canonicalizationAlgorithm: 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315',
                signatureAlgorithm: 'http://www.w3.org/2000/09/xmldsig#rsa-sha1',
                publicCert: tempPem.pem,
                getKeyInfoContent: (args?: { key: string, prefix: string }) => {
                    const cert = tempPem.cert
                        .toString()
                        .replace('-----BEGIN CERTIFICATE-----', '')
                        .replace('-----END CERTIFICATE-----', '')
                        .replace(/\r?\n|\r/g, '');

                    return `<X509Data><X509Certificate>${cert}</X509Certificate></X509Data>`;
                }
            });

            sig.addReference({
                xpath: `//*[local-name(.)='${tag}']`,
                transforms: [
                    'http://www.w3.org/2000/09/xmldsig#enveloped-signature',
                    'http://www.w3.org/TR/2001/REC-xml-c14n-20010315'
                ],
                digestAlgorithm: 'http://www.w3.org/2000/09/xmldsig#sha1'
            });


            sig.computeSignature(xmlJSON, {
                location: {
                    reference: `//*[local-name()='${tag}']`,
                    action: 'after' // <- insere DENTRO da tag <evento>
                }
            });

            return resvol(sig.getSignatureXml())
        })
    }

    //Gerar QRCode da NFCe
    #gerarQRCodeNFCe(NFe: any, versaoQRCode: string = "2", idCSC: string, CSC: string): string {
        let s = '|',
            concat,
            hash;
        if (NFe.infNFe.ide.tpEmis == 1) {
            concat = [NFe.infNFe['@Id'].replace("NFe", ""), versaoQRCode, NFe.infNFe.ide.tpAmb, Number(idCSC)].join(s);
        } else {
            let hexDigestValue = Buffer.from(NFe.Signature.SignedInfo.Reference.DigestValue).toString('hex');
            concat = [NFe.infNFe['@Id'].replace("NFe", ""), versaoQRCode, NFe.infNFe.ide.tpAmb, NFe.infNFe.ide.dhEmi, NFe.infNFe.total.ICMSTot.vNF, hexDigestValue, Number(idCSC)].join(s);
        }
        hash = crypto.createHash('sha1').update(concat + CSC).digest('hex');
        return NFe.infNFeSupl.qrCode + '?p=' + concat + s + hash;
    }

    async xml2json(xml: string): Promise<object> {
        return new Promise((resvol, reject) => {
            xml2json(xml).then(resvol).catch(reject)
        })
    }

    async json2xml(obj: object): Promise<string> {
        return new Promise((resvol, reject) => {
            json2xml(obj).then(resvol).catch(reject)
        })
    }

    //Obter certificado 
    async getCertificado(): Promise<object> {
        return new Promise(async (resvol, reject) => {
            this.#certTools().then(resvol).catch(reject)
        })
    }

    //Consulta NFe
    consultarNFe(chNFe: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            if (!chNFe || chNFe.length !== 44) {
                return reject("consultarNFe(chNFe) -> chave inválida!");
            }
            let cUF = `${chNFe}`.substring(0, 2);
            let UF = cUF2UF[cUF];
            let mod = `${chNFe}`.substring(20, 22);

            //https://www.nfe.fazenda.gov.br/portal/webservices.aspx?AspxAutoDetectCookieSupport=1
            if (["AC", "AL", "AP", "CE", "DF", "ES", "PA", "PB", "PI", "RJ", "RN", "RO", "RR", "SC", "SE", "TO"].includes(UF))
                UF = 'SVRS';

            if (["MA"].includes(UF))
                UF = 'SVAN';


            if (typeof this.#config.tpAmb === "undefined") throw "consultarNFe({...tpAmb}) -> não definido!";

            let consSitNFe = {
                "@xmlns": "http://www.portalfiscal.inf.br/nfe",
                "@versao": "4.00",
                "tpAmb": this.#config.tpAmb,
                "xServ": "CONSULTAR",
                "chNFe": chNFe
            };

            let xmlObj = {
                "soap:Envelope": {
                    "@xmlns:soap": "http://www.w3.org/2003/05/soap-envelope",
                    "@xmlns:nfe": "http://www.portalfiscal.inf.br/nfe/wsdl/NFeConsultaProtocolo4",
                    "soap:Body": {
                        "nfe:nfeDadosMsg": {
                            "consSitNFe": consSitNFe
                        }
                    }
                }
            };

            try {
                const builder = new XMLBuilder({
                    ignoreAttributes: false,
                    attributeNamePrefix: "@"
                });

                // Validação do XML interno (opcional)
                await this.#xmlValido(builder.build({ consSitNFe }), `consSitNFe_v${this.#config.versao}`).catch(reject);;

                const xml = builder.build(xmlObj);

                let tempUF = urlEventos(UF, this.#config.versao);

                const url = tempUF[`mod${mod}`][(this.#config.tpAmb == 1 ? "producao" : "homologacao")].NFeConsultaProtocolo;

                const req = https.request(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/soap+xml; charset=utf-8',
                        'Content-Length': xml.length,
                    },
                    rejectUnauthorized: false,
                    ...await this.#certTools()
                }, (res) => {
                    let data = '';
                    res.on('data', (chunk) => data += chunk);
                    res.on('end', async () => {
                        try {
                            resolve(await this.#limparSoap(data));
                        } catch (error) {
                            resolve(data)
                        }
                    });
                });

                req.setTimeout(this.#config.timeout * 1000, () => {
                    reject({
                        name: 'TimeoutError',
                        message: 'The operation was aborted due to timeout'
                    });
                    req.destroy(); // cancela a requisição
                });
                req.on('error', (err) => reject(err));
                req.write(xml);
                req.end();
            } catch (err) {
                reject(err);
            }
        });
    }

    async sefazEvento({ chNFe = "", tpEvento = "", nProt = "", xJust = "", nSeqEvento = 1, dhEvento = formatData() }): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!chNFe) throw "sefazEvento({chNFe}) -> não definido!";
                if (!tpEvento) throw "sefazEvento({tpEvento}) -> não definido!";
                if (!this.#config.CNPJ && !this.#config.CPF) throw "new Tools({CNPJ|CPF}) -> não definido!";

                let detEvento: any = {
                    "@versao": "1.00",
                    "descEvento": this.#descEvento(`${tpEvento}`)
                };

                const cOrgao = !['210200', '210210', '210220', '210240'].includes(tpEvento) ? chNFe.substring(0, 2) : '91';

                // Adicionar campos específicos por tipo de evento
                if (tpEvento === "110111") { // Cancelamento
                    if (!nProt) throw "sefazEvento({nProt}) obrigatório para Cancelamento!";
                    if (!xJust) throw "sefazEvento({xJust}) obrigatório para Cancelamento!";
                    detEvento["nProt"] = nProt;
                    detEvento["xJust"] = xJust;
                } else if (tpEvento === "110110") { // Carta de Correção
                    if (!xJust) throw "sefazEvento({xJust}) obrigatório para Carta de Correção!";
                    detEvento["xCorrecao"] = xJust;
                    detEvento["xCondUso"] = "A Carta de Correcao e disciplinada pelo paragrafo 1o-A do art. 7o do Convenio S/N, de 15 de dezembro de 1970 e pode ser utilizada para regularizacao de erro ocorrido na emissao de documento fiscal, desde que o erro nao esteja relacionado com: I - as variaveis que determinam o valor do imposto tais como: base de calculo, aliquota, diferenca de preco, quantidade, valor da operacao ou da prestacao; II - a correcao de dados cadastrais que implique mudanca do remetente ou do destinatario; III - a data de emissao ou de saida.";
                } else if (tpEvento === "210240") { // Operação não realizada
                    if (!xJust) throw "sefazEvento({xJust}) obrigatório para Operação não realizada!";
                    detEvento["xJust"] = xJust;
                }
                // Ciência (210210), Confirmação (210200), Desconhecimento (210220) não precisam de campos extras

                const tempUF = urlEventos(cUF2UF[cOrgao], this.#config.versao);
                const evento = {
                    "envEvento": {
                        "@xmlns": "http://www.portalfiscal.inf.br/nfe",
                        "@versao": "1.00",
                        "idLote": "250429141621528",
                        "evento": {
                            "@xmlns": "http://www.portalfiscal.inf.br/nfe",
                            "@versao": "1.00",
                            "infEvento": {
                                "@Id": `ID${tpEvento}${chNFe}${nSeqEvento.toString().padStart(2, '0')}`,
                                cOrgao,
                                "tpAmb": this.#config.tpAmb,
                                "CNPJ": this.#config.CNPJ,
                                "chNFe": chNFe,
                                dhEvento,
                                "tpEvento": tpEvento,
                                "nSeqEvento": nSeqEvento,
                                "verEvento": "1.00",
                                "detEvento": detEvento
                            }
                        }
                    }
                };

                let xmlSing = await json2xml(evento);
                xmlSing = await this.xmlSign(xmlSing, { tag: "infEvento" }); //Assinado
                await this.#xmlValido(xmlSing, `envEvento_v1.00`).catch(reject); //Validar corpo

                xmlSing = await json2xml({
                    "soap:Envelope": {
                        "@xmlns:soap": "http://www.w3.org/2003/05/soap-envelope",
                        "@xmlns:nfe": "http://www.portalfiscal.inf.br/nfe/wsdl/NFeRecepcaoEvento4",
                        "soap:Body": {
                            "nfe:nfeDadosMsg": {
                                ...await xml2json(xmlSing),
                                "@xmlns": "http://www.portalfiscal.inf.br/nfe/wsdl/NFeRecepcaoEvento4"
                            }
                        }
                    }
                });

                try {
                    const req = https.request(tempUF[`mod${chNFe.substring(20, 22)}`][(this.#config.tpAmb == 1 ? "producao" : "homologacao")].NFeRecepcaoEvento, {
                        ...{
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/soap+xml; charset=utf-8',
                                'Content-Length': xmlSing.length,
                            },
                            rejectUnauthorized: false,
                        },
                        ...await this.#certTools()
                    }, (res) => {
                        let data = '';

                        res.on('data', (chunk) => {
                            data += chunk;
                        });

                        res.on('end', async () => {
                            try {
                                resolve(await this.#limparSoap(data));
                            } catch (error) {
                                resolve(data)
                            }
                        });
                    });

                    req.setTimeout(this.#config.timeout * 1000, () => {
                        reject({
                            name: 'TimeoutError',
                            message: 'The operation was aborted due to timeout'
                        });
                        req.destroy(); // cancela a requisição
                    });
                    req.on('error', (erro) => {
                        reject(erro);
                    });
                    req.write(xmlSing);
                    req.end();
                } catch (erro) {
                    reject(erro);
                }
            } catch (erro) {
                reject(erro);
            }
        });
    }

    async sefazDistDFe({ ultNSU = undefined, chNFe = undefined }: { ultNSU?: string, chNFe?: string }): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!chNFe && !ultNSU) throw "sefazDistDFe({chNFe|ultNSU})";
                if (!this.#config.CNPJ && !this.#config.CPF) throw "Tools({CNPJ|CPF})";
                if (this.#config.CPF != undefined) {
                    if (this.#config.CPF.length !== 11) throw "Tools({CPF}) inválido!";
                } else {
                    if (this.#config.CNPJ.length !== 14) throw "Tools({CNPJ}) inválido!";
                }



                // Gera o XML da consulta
                // Prepara o SOAP
                var xmlSing = await json2xml({
                    "distDFeInt": {
                        "@xmlns": "http://www.portalfiscal.inf.br/nfe",
                        "@versao": "1.01",
                        "tpAmb": 1, // 1 = produção, 2 = homologação
                        "cUFAutor": UF2cUF[this.#config.UF], // "AN" - Ambiente Nacional
                        "CNPJ": this.#config.CNPJ,
                        ...(typeof ultNSU != "undefined" ?
                            { "distNSU": { "ultNSU": `${ultNSU}`.padStart(15, '0') } } :
                            {}
                        ),
                        ...(typeof chNFe != "undefined" ?
                            { "consChNFe": { "chNFe": chNFe } } :
                            {}
                        )

                    }
                });

                await this.#xmlValido(xmlSing, `distDFeInt_v1.01`).catch(reject); //Validar corpo
                const tempUF = urlEventos(`AN`, this.#config.versao);

                xmlSing = await json2xml({
                    "soap:Envelope": {
                        "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                        "@xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
                        "@xmlns:soap": "http://www.w3.org/2003/05/soap-envelope",
                        "soap:Body": {
                            "nfeDistDFeInteresse": {
                                "@xmlns": "http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe",
                                "nfeDadosMsg": {
                                    ... { "@xmlns": "http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe" },
                                    ...await xml2json(xmlSing)
                                }
                            }
                        }
                    }
                });
                // HTTPS Request, trava modelo 55
                const req = https.request(tempUF[`mod55`][(this.#config.tpAmb == 1 ? "producao" : "homologacao")].NFeDistribuicaoDFe, {
                    ...{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/soap+xml; charset=utf-8',
                            'Content-Length': xmlSing.length,
                        },
                        rejectUnauthorized: false
                    },
                    ...await this.#certTools()
                }, (res) => {
                    let data = '';

                    res.on('data', (chunk) => {
                        data += chunk;
                    });

                    res.on('end', async () => {
                        try {
                            resolve(await this.#limparSoap(data));
                        } catch (error) {
                            resolve(data)
                        }
                    });
                });

                req.setTimeout(this.#config.timeout * 1000, () => {
                    reject({
                        name: 'TimeoutError',
                        message: 'The operation was aborted due to timeout'
                    });
                    req.destroy(); // cancela a requisição
                });
                req.on('error', (erro) => {
                    reject(erro);
                });
                req.write(xmlSing);
                req.end();
            } catch (erro) {
                reject(erro);
            }
        });
    }

    #descEvento(tpEvento: string): string {
        const eventos: Record<string, string> = {
            "110110": "Carta de Correcao",
            "110111": "Cancelamento",
            "210200": "Confirmacao da Operacao",
            "210210": "Ciencia da Operacao",
            "210220": "Desconhecimento da Operacao",
            "210240": "Operacao nao Realizada"
        };
        return eventos[tpEvento] || "Evento";
    }

    //Consulta status sefaz
    async sefazStatus(): Promise<string> {
        return new Promise(async (resolve, reject) => {

            if (typeof this.#config.UF == "undefined") throw "sefazStatus({...UF}) -> não definido!";
            if (typeof this.#config.tpAmb == "undefined") throw "sefazStatus({...tpAmb}) -> não definido!";
            if (typeof this.#config.mod == "undefined") throw "sefazStatus({...mod}) -> não definido!";

            //Separado para validar o corpo da consulta
            let consStatServ = {
                "@versao": "4.00",
                "@xmlns": "http://www.portalfiscal.inf.br/nfe",
                "tpAmb": this.#config.tpAmb,
                "cUF": UF2cUF[this.#config.UF],
                "xServ": "STATUS"
            }

            let xmlObj = {
                "soap:Envelope": {
                    "@xmlns:soap": "http://www.w3.org/2003/05/soap-envelope",
                    "@xmlns:nfe": "http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4",
                    "soap:Body": {
                        "nfe:nfeDadosMsg": {
                            consStatServ
                        }
                    }
                }
            }

            try {
                let tempBuild = new XMLBuilder({
                    ignoreAttributes: false,
                    attributeNamePrefix: "@"
                });

                //Validação
                await this.#xmlValido(tempBuild.build({ consStatServ }), `consStatServ_v${this.#config.versao}`).catch(reject);
                let tempUF = urlEventos(this.#config.UF, this.#config.versao);
                let xml = tempBuild.build(xmlObj);
                const req = https.request(tempUF[`mod${this.#config.mod}`][(this.#config.tpAmb == 1 ? "producao" : "homologacao")].NFeStatusServico, {
                    ...{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/soap+xml; charset=utf-8',
                            'Content-Length': xml.length,
                            'SOAPAction': 'http://www.portalfiscal.inf.br/nfe/wsdl/NfeStatusServico4/nfeStatusServicoNF'
                        },
                        rejectUnauthorized: false
                    },
                    ...await this.#certTools()
                }, (res) => {
                    let data = '';

                    res.on('data', (chunk) => {
                        data += chunk;
                    });

                    res.on('end', async () => {
                        try {
                            resolve(await this.#limparSoap(data));
                        } catch (error) {
                            resolve(data)
                        }
                    });
                });

                req.setTimeout(this.#config.timeout * 1000, () => {
                    reject({
                        name: 'TimeoutError',
                        message: 'The operation was aborted due to timeout'
                    });
                    req.destroy(); // cancela a requisição
                });
                req.on('error', (erro) => {
                    reject(erro);
                });

                req.write(xml);
                req.end();
            } catch (erro) {
                reject(erro);
            }
        })
    }

    async validarNFe(xml: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.#xmlValido(xml, `nfe_v${this.#config.versao}`).then(resolve).catch(reject);
        })
    }


    //Validar XML da NFe, somente apos assinar
    async #xmlValido(xml: string, xsd: string) {
        return new Promise((resolve, reject) => {
            const xmlFile = tmp.fileSync({ mode: 0o644, prefix: 'xml-', postfix: '.xml' });

            fs.writeFileSync(xmlFile.name, xml, { encoding: 'utf8' });

            //Obter caminho, dos schemas
            var schemaPath = ""
            try { //NW.js + ElectronJS
                schemaPath = path.dirname(require.resolve("node-sped-nfe"));
                schemaPath = path.resolve(`${path.join(schemaPath, "..", "schemas")}/PL_010_V1/${xsd}.xsd`);
            } catch (error) { //Caso o require seja desativo
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = path.dirname(__filename);
                schemaPath = path.resolve(__dirname, `../../schemas/PL_010_V1/${xsd}.xsd`);
            }

            const verif: SpawnSyncReturns<string> = spawnSync(
                this.#config.xmllint,
                ['--noout', '--schema', schemaPath, xmlFile.name],
                { encoding: 'utf8' }
            );

            xmlFile.removeCallback();

            // Aqui, usamos o operador de encadeamento opcional (?.)
            if (verif.error) {
                return reject("Biblioteca xmllint não encontrada!")
            } else if (!verif.stderr.includes(".xml validates")) {
                return reject(verif.stderr.replace(/\/tmp\/[^:\s]+\.xml/g, '') // Remove os caminhos /tmp/*.xml
                    .replace(/\s{2,}/g, ' ')             // Ajusta múltiplos espaços para um só
                    .trim())                           // Remove espaços no começo e fim)
            } else {
                resolve(true);
            }

        })
    }

    #certTools(): Promise<object> {
        return new Promise(async (resvol, reject) => {
            if (this.#pem.key != "") resvol(this.#pem);
            if (this.#config.openssl != null) {
                pem.config({
                    pathOpenSSL: this.#config.openssl
                })
            }
            pem.readPkcs12(this.#cert.pfx, { p12Password: this.#cert.senha }, (err, myPem) => {
                if (err) return reject(err); // <-- importante!
                this.#pem = myPem;
                resvol(this.#pem);
            });
        })
    }

    //Remove coisas inuteis da resposta do sefaz
    async #limparSoap(xml: string) {
        if (xml == "Bad Request") throw xml
        const clear: any = [
            'env:Envelope',
            'env:Body',
            'S:Envelope',
            'S:Body',
            'soapenv:Envelope',
            'soapenv:Body',
            'soap:Envelope',
            'soap:Body',
            'nfeResultMsg',
            'nfeDistDFeInteresseResponse'
        ]
        let jXml = await xml2json(xml) as any;
        let index = 0;
        while (index < clear.length) {
            if (typeof jXml[clear[index]] !== "undefined") {
                jXml = jXml[clear[index]];
                index = 0; // reinicia a busca no novo nível
            } else {
                index++;
            }
        }
        return await json2xml(jXml);
    }
}
export { Tools }