import { XMLParser, XMLBuilder } from "fast-xml-parser";
import https from "https";
import { spawnSync, SpawnSyncReturns } from "child_process"
import tmp from "tmp"
import crypto from "crypto";
import { urlEventos } from "./eventos.js"
import fs from "fs"
import path from 'path';
import { fileURLToPath } from 'url';
import pem from 'pem';
import { cUF2UF, json2xml, xml2json, formatData } from "./extras.js"
import { SignedXml } from 'xml-crypto';




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        return new Promise(async (resvol, reject) => {
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
                    ...this.#pem
                }, (res) => {
                    let data = '';

                    res.on('data', (chunk) => {
                        data += chunk;
                    });

                    res.on('end', () => {
                        resvol(data);
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
                if (xml.NFe.infNFe.ide.mod == 65) {
                    xml.NFe.infNFeSupl.qrCode = this.#gerarQRCodeNFCe(xml.NFe, "2", this.#config.CSCid, this.#config.CSC)
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
                    res.on('end', () => resolve(data));
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

    async sefazEvento({ chNFe = "", tpEvento = "", nProt = "", justificativa = "", textoCorrecao = "", sequencial = 1 }): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!chNFe) throw "sefazEvento({chNFe}) -> não definido!";
                if (!tpEvento) throw "sefazEvento({tpEvento}) -> não definido!";
                if (!this.#config.CNPJ && !this.#config.CPF) throw "new Tools({CNPJ|CPF}) -> não definido!";

                const geradorLote = function () {
                    const agora = new Date();

                    const ano = agora.getFullYear().toString().slice(2); // Só os 2 últimos dígitos do ano
                    const mes = String(agora.getMonth() + 1).padStart(2, '0');
                    const dia = String(agora.getDate()).padStart(2, '0');
                    const hora = String(agora.getHours()).padStart(2, '0');
                    const minuto = String(agora.getMinutes()).padStart(2, '0');
                    const segundo = String(agora.getSeconds()).padStart(2, '0');

                    // Junta tudo
                    let idLote = `${ano}${mes}${dia}${hora}${minuto}${segundo}`;

                    // Se ainda tiver menos de 15 dígitos, adiciona um número aleatório no final
                    while (idLote.length < 15) {
                        idLote += Math.floor(Math.random() * 10); // Adiciona dígitos aleatórios
                    }

                    return idLote;
                }

                const tempUF = urlEventos(`AN`, this.#config.versao);

                let detEvento: any = {
                    "@versao": "1.00",
                    "descEvento": this.#descEvento(`${tpEvento}`)
                };

                // Adicionar campos específicos por tipo de evento
                if (tpEvento === "110111") { // Cancelamento
                    if (!nProt) throw "sefazEvento({nProt}) obrigatório para Cancelamento!";
                    if (!justificativa) throw "sefazEvento({justificativa}) obrigatório para Cancelamento!";
                    detEvento["nProt"] = nProt;
                    detEvento["xJust"] = justificativa;
                } else if (tpEvento === "110110") { // Carta de Correção
                    if (!textoCorrecao) throw "sefazEvento({textoCorrecao}) obrigatório para Carta de Correção!";
                    detEvento["xCorrecao"] = textoCorrecao;
                    detEvento["xCondUso"] = "A carta de correção é disciplinada pelo § 1º-A do art. 7º do Convênio S/N, de 15 de dezembro de 1970...";
                } else if (tpEvento === "210240") { // Operação não realizada
                    if (!justificativa) throw "sefazEvento({justificativa}) obrigatório para Operação não realizada!";
                    detEvento["xJust"] = justificativa;
                }
                // Ciência (210210), Confirmação (210200), Desconhecimento (210220) não precisam de campos extras

                const evento = {
                    "envEvento": {
                        "@xmlns": "http://www.portalfiscal.inf.br/nfe",
                        "@versao": "1.00",
                        "idLote": "250429141621528",
                        "evento": {
                            "@xmlns": "http://www.portalfiscal.inf.br/nfe",
                            "@versao": "1.00",
                            "infEvento": {
                                "@Id": `ID${tpEvento}${chNFe}${sequencial.toString().padStart(2, '0')}`,
                                "cOrgao": "91",
                                "tpAmb": this.#config.tpAmb,
                                "CNPJ": this.#config.CNPJ,
                                "chNFe": chNFe,
                                "dhEvento": "2025-04-29T14:16:21-03:00",
                                "tpEvento": tpEvento,
                                "nSeqEvento": sequencial,
                                "verEvento": "1.00",
                                "detEvento": detEvento
                            }
                        }
                    }
                };

                let xmlSing = await json2xml(evento);
                xmlSing = await this.xmlSign(xmlSing, { tag: "infEvento" }); //Assinado

                fs.writeFileSync("testes/xmlEvento.xml", xmlSing, "utf8")

                await this.#xmlValido(xmlSing, `envEvento_v1.00`).catch(reject); //Validar corpo
                xmlSing = await json2xml({
                    "soap:Envelope": {
                        "@xmlns:soap": "http://www.w3.org/2003/05/soap-envelope",
                        "@xmlns:nfe": "http://www.portalfiscal.inf.br/nfe/wsdl/NFeRecepcaoEvento4",
                        "soap:Body": {
                            "nfe:nfeDadosMsg": await xml2json(xmlSing)
                        }
                    }
                });


                try {
                    const req = https.request(tempUF[`mod${this.#config.mod}`][(this.#config.tpAmb == 1 ? "producao" : "homologacao")].NFeRecepcaoEvento, {
                        ...{
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/soap+xml; charset=utf-8',
                                'Content-Length': xmlSing.length,
                            },
                            rejectUnauthorized: false
                        },
                        ...this.#pem
                    }, (res) => {
                        let data = '';

                        res.on('data', (chunk) => {
                            data += chunk;
                        });

                        res.on('end', () => {
                            resolve(data);
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
        return new Promise(async (resvol, reject) => {

            if (typeof this.#config.UF == "undefined") throw "sefazStatus({...UF}) -> não definido!";
            if (typeof this.#config.tpAmb == "undefined") throw "sefazStatus({...tpAmb}) -> não definido!";
            if (typeof this.#config.mod == "undefined") throw "sefazStatus({...mod}) -> não definido!";

            let tempUF = urlEventos(this.#config.UF, this.#config.versao);

            //Separado para validar o corpo da consulta
            let consStatServ = {
                "@versao": "4.00",
                "@xmlns": "http://www.portalfiscal.inf.br/nfe",
                "tpAmb": this.#config.tpAmb,
                "cUF": tempUF.cUF,
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
                        },
                        rejectUnauthorized: false
                    },
                    ...await this.#certTools()
                }, (res) => {
                    let data = '';

                    res.on('data', (chunk) => {
                        data += chunk;
                    });

                    res.on('end', () => {
                        resvol(data);
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
            const schemaPath = path.resolve(__dirname, `../../schemas/PL_010_V1/${xsd}.xsd`);

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
}
export { Tools }