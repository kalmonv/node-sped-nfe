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



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Tools {
    #cert: {
        pfx: string;
        senha: string;
    };
    #xmlTools: {
        XMLBuilder: XMLBuilder;
        XMLParser: XMLParser;
    } = {
            XMLBuilder: {} as XMLBuilder,
            XMLParser: {} as XMLParser
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
    };

    constructor(config = { mod: "", xmllint: 'xmllint', UF: '', tpAmb: 2, CSC: "", CSCid: "", versao: "4.00", timeout: 30 }, certificado = { pfx: "", senha: "" }) {
        if (typeof config != "object") throw "Tools({config},{}): Config deve ser um objecto!";
        if (typeof config.UF == "undefined") throw "Tools({...,UF:?},{}): UF não definida!";
        if (typeof config.tpAmb == "undefined") throw "Tools({...,tpAmb:?},{}): tpAmb não definida!";
        if (typeof config.versao == "undefined") throw "Tools({...,versao:?},{}): versao não definida!";

        if (typeof config.timeout == "undefined") config.timeout = 30;
        if (typeof config.xmllint == "undefined") config.xmllint = 'xmllint';

        //Configurar certificado
        this.#config = config;
        this.#cert = certificado;
        this.#xmlTools.XMLBuilder = new XMLBuilder({
            ignoreAttributes: false,
            attributeNamePrefix: "@",
        });
        this.#xmlTools.XMLParser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@",
            parseTagValue: false,       // Evita conversão automática de valores
        });
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

            //Obter a tag que ira ser assinada
            let xml = await this.xml2json(xmlJSON) as any;
            let tempPem = await this.#certTools() as any;

            const sign = crypto.createSign('RSA-SHA1'); // Correção: Alterado para RSA-SHA1
            let signedInfo = {
                "SignedInfo": {
                    "@xmlns": "http://www.w3.org/2000/09/xmldsig#",
                    "CanonicalizationMethod": {
                        "@Algorithm": "http://www.w3.org/TR/2001/REC-xml-c14n-20010315"
                    },
                    "SignatureMethod": {
                        "@Algorithm": "http://www.w3.org/2000/09/xmldsig#rsa-sha1" // Mantém SHA1
                    },
                    "Reference": {
                        "@URI": `#${xml.NFe.infNFe['@Id']}`,
                        "Transforms": {
                            "Transform": [
                                {
                                    "@Algorithm": "http://www.w3.org/2000/09/xmldsig#enveloped-signature"
                                },
                                {
                                    "@Algorithm": "http://www.w3.org/TR/2001/REC-xml-c14n-20010315"
                                },
                            ]
                        },
                        "DigestMethod": {
                            "@Algorithm": "http://www.w3.org/2000/09/xmldsig#sha1" // Mantém SHA1
                        },
                        "DigestValue": crypto.createHash('sha1').update(await this.json2xml({ infNFe: xml.NFe.infNFe }), 'utf8') // Mantém Hash SHA1
                            .digest('base64')

                    }
                }
            }
            sign.update(await this.json2xml(signedInfo), 'utf8');
            xml.NFe.Signature = {
                ...signedInfo,
                ...{
                    "SignatureValue": sign.sign(tempPem.key, 'base64'),
                    "KeyInfo": {
                        "X509Data": {
                            "X509Certificate": tempPem.cert.replace(/-----BEGIN CERTIFICATE-----/g, '').replace(/-----END CERTIFICATE-----/g, '').replace(/\r\n/g, '')
                        }
                    },
                    "@xmlns": "http://www.w3.org/2000/09/xmldsig#"
                }
            }


            if (xml.NFe.infNFe.ide.mod == 65) {
                xml.NFe.infNFeSupl.qrCode = this.#gerarQRCodeNFCe(xml.NFe, "2", this.#config.CSCid, this.#config.CSC)
            }

            this.json2xml(xml).then(async res => {
                this.#xmlValido(res, `nfe_v${this.#config.versao}`);
                resvol(res);
            }).catch(err => {
                reject(err)
            })
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
            resvol(this.#xmlTools.XMLParser.parse(xml))
        })
    }

    async json2xml(obj: object): Promise<string> {
        return new Promise((resvol, reject) => {
            resvol(this.#xmlTools.XMLBuilder.build(obj))
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

            if (typeof this.#config.UF === "undefined") throw "consultarNFe({...UF}) -> não definido!";
            if (typeof this.#config.tpAmb === "undefined") throw "consultarNFe({...tpAmb}) -> não definido!";
            if (typeof this.#config.mod === "undefined") throw "consultarNFe({...mod}) -> não definido!";

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
                this.#xmlValido(builder.build({ consSitNFe }), `consSitNFe_v${this.#config.versao}`);

                const xml = builder.build(xmlObj);

                let tempUF = urlEventos(this.#config.UF, this.#config.versao);

                const url = tempUF[`mod${this.#config.mod}`][(this.#config.tpAmb == 1 ? "producao" : "homologacao")].NFeConsultaProtocolo;

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
                this.#xmlValido(tempBuild.build({ consStatServ }), `consStatServ_v${this.#config.versao}`);
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


    //Validar XML da NFe, somente apos assinar
    async #xmlValido(xml: string, xsd: string) {
        const xmlFile = tmp.fileSync({ mode: 0o644, prefix: 'xml-', postfix: '.xml' });
        fs.writeFileSync(xmlFile.name, xml, { encoding: 'utf8' });
        const schemaPath = path.resolve(__dirname, `../../schemas/${xsd}.xsd`);
        const verif: SpawnSyncReturns<string> = spawnSync(
            this.#config.xmllint,
            ['--noout', '--schema', schemaPath, xmlFile.name],
            { encoding: 'utf8' }
        );

        xmlFile.removeCallback();

        // Aqui, usamos o operador de encadeamento opcional (?.)
        if (verif.error) {
            throw new Error("Biblioteca xmllint não encontrada!");
        } else if (!verif.stderr.includes(".xml validates")) {
            throw new Error(verif.stderr);
        }
        return 1;
    }

    #certTools(): Promise<object> {
        return new Promise(async (resvol, reject) => {
            if (this.#pem.key != "") resvol(this.#pem);
            pem.readPkcs12(this.#cert.pfx, { p12Password: this.#cert.senha }, (err, myPem) => {
                if (err) return reject(err); // <-- importante!
                this.#pem = myPem;
                resvol(this.#pem);
            });
        })
    }
}
export { Tools }