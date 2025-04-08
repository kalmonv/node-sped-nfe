var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Tools_instances, _Tools_cert, _Tools_xmlTools, _Tools_pem, _Tools_config, _Tools_xmlValido, _Tools_certTools;
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import pem from "pem";
import https from "https";
import { spawnSync } from "child_process";
import tmp from "tmp";
import crypto from "crypto";
import { urlServicos } from "./eventos.js";
import fs from "fs";
class Tools {
    constructor(config = { mod: "", xmllint: 'xmllint', cUF: '51', tpAmb: 2 }, certificado = { pfx: "", senha: "" }) {
        _Tools_instances.add(this);
        _Tools_cert.set(this, void 0);
        _Tools_xmlTools.set(this, {
            XMLBuilder: {},
            XMLParser: {}
        });
        _Tools_pem.set(this, {});
        _Tools_config.set(this, void 0);
        //Configurar certificado
        __classPrivateFieldSet(this, _Tools_config, config, "f");
        __classPrivateFieldSet(this, _Tools_cert, certificado, "f");
        __classPrivateFieldGet(this, _Tools_xmlTools, "f").XMLBuilder = new XMLBuilder({
            ignoreAttributes: false,
            attributeNamePrefix: "@",
        });
        __classPrivateFieldGet(this, _Tools_xmlTools, "f").XMLParser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@",
            parseTagValue: false, // Evita conversão automática de valores
        });
    }
    sefazEnviaLote(xml, data = { idLote: 1, indSinc: 0, compactar: false }) {
        return new Promise(async (resvol, reject) => {
            if (typeof data.idLote == "undefined")
                data.idLote = 1;
            if (typeof data.indSinc == "undefined")
                data.indSinc = 0;
            if (typeof data.compactar == "undefined")
                data.compactar = false;
            await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_certTools).call(this);
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
            };
            let xmlLote = await this.json2xml(jsonXmlLote);
            fs.writeFileSync("testes/nfe_guara_sign_lote.xml", xmlLote, { encoding: "utf8" });
            try {
                const req = https.request(urlServicos[`${__classPrivateFieldGet(this, _Tools_config, "f").cUF}`][`mod_${__classPrivateFieldGet(this, _Tools_config, "f").mod}`].NFeAutorizacao[(__classPrivateFieldGet(this, _Tools_config, "f").tpAmb == 1 ? "producao" : "homologacao")], {
                    ...{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/soap+xml; charset=utf-8',
                            'Content-Length': xmlLote.length,
                        },
                        rejectUnauthorized: false
                    },
                    ...__classPrivateFieldGet(this, _Tools_pem, "f")
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
            }
            catch (erro) {
                reject(erro);
            }
        });
    }
    async xmlSign(xmlJSON, data) {
        return new Promise(async (resvol, reject) => {
            if (data.tag === undefined)
                data.tag = "infNFe";
            //Obter a tag que ira ser assinada
            let xml = await this.xml2json(xmlJSON);
            let pem = await this.getCertificado();
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
            };
            sign.update(await this.json2xml(signedInfo), 'utf8');
            xml.NFe.Signature = {
                ...signedInfo,
                ...{
                    "SignatureValue": sign.sign(pem.key, 'base64'),
                    "KeyInfo": {
                        "X509Data": {
                            "X509Certificate": pem.cert.replace(/-----BEGIN CERTIFICATE-----/g, '').replace(/-----END CERTIFICATE-----/g, '').replace(/\r\n/g, '')
                        }
                    },
                    "@xmlns": "http://www.w3.org/2000/09/xmldsig#"
                }
            };
            this.json2xml(xml).then(async (res) => {
                __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_xmlValido).call(this, res);
                resvol(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
    async xml2json(xml) {
        return new Promise((resvol, reject) => {
            resvol(__classPrivateFieldGet(this, _Tools_xmlTools, "f").XMLParser.parse(xml));
        });
    }
    async json2xml(obj) {
        return new Promise((resvol, reject) => {
            resvol(__classPrivateFieldGet(this, _Tools_xmlTools, "f").XMLBuilder.build(obj));
        });
    }
    async getCertificado() {
        return new Promise(async (resvol, reject) => {
            await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_certTools).call(this).then(resvol).catch(reject);
        });
    }
    //Consulta status sefaz
    async sefazStatus() {
        return new Promise(async (resvol, reject) => {
            await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_certTools).call(this);
            if (typeof __classPrivateFieldGet(this, _Tools_config, "f").cUF == "undefined")
                throw "sefazStatus({...cUF}) -> não definido!";
            if (typeof __classPrivateFieldGet(this, _Tools_config, "f").tpAmb == "undefined")
                throw "sefazStatus({...tpAmb}) -> não definido!";
            if (typeof __classPrivateFieldGet(this, _Tools_config, "f").mod == "undefined")
                throw "sefazStatus({...mod}) -> não definido!";
            let xmlObj = {
                "soap:Envelope": {
                    "@xmlns:soap": "http://www.w3.org/2003/05/soap-envelope",
                    "@xmlns:nfe": "http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4",
                    "soap:Body": {
                        "nfe:nfeDadosMsg": {
                            "consStatServ": {
                                "@versao": "4.00",
                                "@xmlns": "http://www.portalfiscal.inf.br/nfe",
                                "tpAmb": __classPrivateFieldGet(this, _Tools_config, "f").tpAmb,
                                "cUF": __classPrivateFieldGet(this, _Tools_config, "f").cUF,
                                "xServ": "STATUS"
                            }
                        }
                    }
                }
            };
            try {
                let tempBuild = new XMLBuilder({
                    ignoreAttributes: false,
                    attributeNamePrefix: "@"
                });
                let xml = tempBuild.build(xmlObj);
                const req = https.request(urlServicos[`${__classPrivateFieldGet(this, _Tools_config, "f").cUF}`][`mod_${__classPrivateFieldGet(this, _Tools_config, "f").mod}`].NfeStatusServico[(__classPrivateFieldGet(this, _Tools_config, "f").tpAmb == 1 ? "producao" : "homologacao")], {
                    ...{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/soap+xml; charset=utf-8',
                            'Content-Length': xml.length,
                        },
                        rejectUnauthorized: false
                    },
                    ...__classPrivateFieldGet(this, _Tools_pem, "f")
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
            }
            catch (erro) {
                reject(erro);
            }
        });
    }
}
_Tools_cert = new WeakMap(), _Tools_xmlTools = new WeakMap(), _Tools_pem = new WeakMap(), _Tools_config = new WeakMap(), _Tools_instances = new WeakSet(), _Tools_xmlValido = 
//Validar XML da NFe, somente apos assinar
async function _Tools_xmlValido(xml) {
    const xmlFile = tmp.fileSync({ mode: 0o644, prefix: 'xml-', postfix: '.xml' });
    fs.writeFileSync(xmlFile.name, xml, { encoding: 'utf8' });
    const verif = spawnSync(__classPrivateFieldGet(this, _Tools_config, "f").xmllint, ['--noout', '--schema', './utils/schemas/nfe_v4.00.xsd', xmlFile.name], { encoding: 'utf8' });
    xmlFile.removeCallback();
    // Aqui, usamos o operador de encadeamento opcional (?.)
    if (verif.error) {
        throw new Error("Biblioteca xmllint não encontrada!");
    }
    else if (!verif.stderr.includes(".xml validates")) {
        throw new Error(verif.stderr);
    }
    return 1;
}, _Tools_certTools = function _Tools_certTools() {
    return new Promise(async (resvol, reject) => {
        if (__classPrivateFieldGet(this, _Tools_pem, "f") != null)
            resvol(__classPrivateFieldGet(this, _Tools_pem, "f"));
        pem.readPkcs12(__classPrivateFieldGet(this, _Tools_cert, "f").pfx, { p12Password: __classPrivateFieldGet(this, _Tools_cert, "f").senha }, (err, myPem) => {
            __classPrivateFieldSet(this, _Tools_pem, myPem, "f");
            resvol(myPem);
        });
    });
};
export { Tools };
