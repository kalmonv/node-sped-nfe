import { XMLParser, XMLBuilder } from "fast-xml-parser";
import https from "https";
import { spawnSync, SpawnSyncReturns } from "child_process"
import tmp from "tmp"
import crypto from "crypto";
import { urlServicos } from "./eventos.js"
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
        cUF: string;
        tpAmb: number;
        CSC: string;
        CSCid: string;
    };

    constructor(config = { mod: "", xmllint: 'xmllint', cUF: '51', tpAmb: 2, CSC: "", CSCid: "" }, certificado = { pfx: "", senha: "" }) {
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
                const req = https.request(urlServicos[`${this.#config.cUF}`][`mod_${this.#config.mod}`].NFeAutorizacao[(this.#config.tpAmb == 1 ? "producao" : "homologacao")], {
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
                this.#xmlValido(res);
                resvol(res);
            }).catch(err => {
                reject(err)
            })
        })
    }

    #gerarQRCodeNFCe(NFe: any, versaoQRCode: string = "2", idCSC: string, CSC: string) {
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

    async getCertificado() {
        return new Promise(async (resvol, reject) => {
            this.#certTools().then(resvol).catch(reject)
        })
    }

    //Consulta status sefaz
    async sefazStatus(): Promise<string> {
        return new Promise(async (resvol, reject) => {

            if (typeof this.#config.cUF == "undefined") throw "sefazStatus({...cUF}) -> não definido!";
            if (typeof this.#config.tpAmb == "undefined") throw "sefazStatus({...tpAmb}) -> não definido!";
            if (typeof this.#config.mod == "undefined") throw "sefazStatus({...mod}) -> não definido!";

            let xmlObj = {
                "soap:Envelope": {
                    "@xmlns:soap": "http://www.w3.org/2003/05/soap-envelope",
                    "@xmlns:nfe": "http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4",
                    "soap:Body": {
                        "nfe:nfeDadosMsg": {
                            "consStatServ": {
                                "@versao": "4.00",
                                "@xmlns": "http://www.portalfiscal.inf.br/nfe",
                                "tpAmb": this.#config.tpAmb,
                                "cUF": this.#config.cUF,
                                "xServ": "STATUS"
                            }
                        }
                    }
                }
            }

            try {
                let tempBuild = new XMLBuilder({
                    ignoreAttributes: false,
                    attributeNamePrefix: "@"
                });
                let xml = tempBuild.build(xmlObj);

                const req = https.request(urlServicos[`${this.#config.cUF}`][`mod_${this.#config.mod}`].NFeStatusServico[(this.#config.tpAmb == 1 ? "producao" : "homologacao")], {
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
    async #xmlValido(xml: string) {
        const xmlFile = tmp.fileSync({ mode: 0o644, prefix: 'xml-', postfix: '.xml' });
        fs.writeFileSync(xmlFile.name, xml, { encoding: 'utf8' });

        const schemaPath = path.resolve(__dirname, '../../schemas/nfe_v4.00.xsd');
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