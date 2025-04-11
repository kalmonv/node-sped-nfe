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
var _Tools_instances, _Tools_cert, _Tools_xmlTools, _Tools_pem, _Tools_config, _Tools_gerarQRCodeNFCe, _Tools_xmlValido, _Tools_certTools;
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import https from "https";
import { spawnSync } from "child_process";
import tmp from "tmp";
import crypto from "crypto";
import { urlEventos } from "./eventos.js";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import pem from 'pem';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class Tools {
    constructor(config = { mod: "", xmllint: 'xmllint', UF: '', tpAmb: 2, CSC: "", CSCid: "", versao: "4.00", timeout: 30 }, certificado = { pfx: "", senha: "" }) {
        _Tools_instances.add(this);
        _Tools_cert.set(this, void 0);
        _Tools_xmlTools.set(this, {
            XMLBuilder: {},
            XMLParser: {}
        });
        _Tools_pem.set(this, {
            key: "", // A chave privada extraída do PKCS#12, em formato PEM
            cert: "", // O certificado extraído, em formato PEM
            ca: [] // Uma lista de certificados da cadeia (se houver), ou null
        });
        _Tools_config.set(this, void 0);
        if (typeof config != "object")
            throw "Tools({config},{}): Config deve ser um objecto!";
        if (typeof config.UF == "undefined")
            throw "Tools({...,UF:?},{}): UF não definida!";
        if (typeof config.tpAmb == "undefined")
            throw "Tools({...,tpAmb:?},{}): tpAmb não definida!";
        if (typeof config.versao == "undefined")
            throw "Tools({...,versao:?},{}): versao não definida!";
        if (typeof config.timeout == "undefined")
            config.timeout = 30;
        if (typeof config.xmllint == "undefined")
            config.xmllint = 'xmllint';
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
            try {
                let tempUF = urlEventos(__classPrivateFieldGet(this, _Tools_config, "f").UF, __classPrivateFieldGet(this, _Tools_config, "f").versao);
                const req = https.request(tempUF[`mod${__classPrivateFieldGet(this, _Tools_config, "f").mod}`][(__classPrivateFieldGet(this, _Tools_config, "f").tpAmb == 1 ? "producao" : "homologacao")].NFeAutorizacao, {
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
                req.setTimeout(__classPrivateFieldGet(this, _Tools_config, "f").timeout * 1000, () => {
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
            }
            catch (erro) {
                reject(erro);
            }
        });
    }
    async xmlSign(xmlJSON, data = { tag: "infNFe" }) {
        return new Promise(async (resvol, reject) => {
            if (data.tag === undefined)
                data.tag = "infNFe";
            //Obter a tag que ira ser assinada
            let xml = await this.xml2json(xmlJSON);
            let tempPem = await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_certTools).call(this);
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
                    "SignatureValue": sign.sign(tempPem.key, 'base64'),
                    "KeyInfo": {
                        "X509Data": {
                            "X509Certificate": tempPem.cert.replace(/-----BEGIN CERTIFICATE-----/g, '').replace(/-----END CERTIFICATE-----/g, '').replace(/\r\n/g, '')
                        }
                    },
                    "@xmlns": "http://www.w3.org/2000/09/xmldsig#"
                }
            };
            if (xml.NFe.infNFe.ide.mod == 65) {
                xml.NFe.infNFeSupl.qrCode = __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_gerarQRCodeNFCe).call(this, xml.NFe, "2", __classPrivateFieldGet(this, _Tools_config, "f").CSCid, __classPrivateFieldGet(this, _Tools_config, "f").CSC);
            }
            this.json2xml(xml).then(async (res) => {
                __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_xmlValido).call(this, res, `nfe_v${__classPrivateFieldGet(this, _Tools_config, "f").versao}`);
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
    //Obter certificado 
    async getCertificado() {
        return new Promise(async (resvol, reject) => {
            __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_certTools).call(this).then(resvol).catch(reject);
        });
    }
    //Consulta NFe
    consultarNFe(chNFe) {
        return new Promise(async (resolve, reject) => {
            if (!chNFe || chNFe.length !== 44) {
                return reject("consultarNFe(chNFe) -> chave inválida!");
            }
            if (typeof __classPrivateFieldGet(this, _Tools_config, "f").UF === "undefined")
                throw "consultarNFe({...UF}) -> não definido!";
            if (typeof __classPrivateFieldGet(this, _Tools_config, "f").tpAmb === "undefined")
                throw "consultarNFe({...tpAmb}) -> não definido!";
            if (typeof __classPrivateFieldGet(this, _Tools_config, "f").mod === "undefined")
                throw "consultarNFe({...mod}) -> não definido!";
            let consSitNFe = {
                "@xmlns": "http://www.portalfiscal.inf.br/nfe",
                "@versao": "4.00",
                "tpAmb": __classPrivateFieldGet(this, _Tools_config, "f").tpAmb,
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
                __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_xmlValido).call(this, builder.build({ consSitNFe }), `consSitNFe_v${__classPrivateFieldGet(this, _Tools_config, "f").versao}`);
                const xml = builder.build(xmlObj);
                let tempUF = urlEventos(__classPrivateFieldGet(this, _Tools_config, "f").UF, __classPrivateFieldGet(this, _Tools_config, "f").versao);
                const url = tempUF[`mod${__classPrivateFieldGet(this, _Tools_config, "f").mod}`][(__classPrivateFieldGet(this, _Tools_config, "f").tpAmb == 1 ? "producao" : "homologacao")].NFeConsultaProtocolo;
                const req = https.request(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/soap+xml; charset=utf-8',
                        'Content-Length': xml.length,
                    },
                    rejectUnauthorized: false,
                    ...await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_certTools).call(this)
                }, (res) => {
                    let data = '';
                    res.on('data', (chunk) => data += chunk);
                    res.on('end', () => resolve(data));
                });
                req.setTimeout(__classPrivateFieldGet(this, _Tools_config, "f").timeout * 1000, () => {
                    reject({
                        name: 'TimeoutError',
                        message: 'The operation was aborted due to timeout'
                    });
                    req.destroy(); // cancela a requisição
                });
                req.on('error', (err) => reject(err));
                req.write(xml);
                req.end();
            }
            catch (err) {
                reject(err);
            }
        });
    }
    //Consulta status sefaz
    async sefazStatus() {
        return new Promise(async (resvol, reject) => {
            if (typeof __classPrivateFieldGet(this, _Tools_config, "f").UF == "undefined")
                throw "sefazStatus({...UF}) -> não definido!";
            if (typeof __classPrivateFieldGet(this, _Tools_config, "f").tpAmb == "undefined")
                throw "sefazStatus({...tpAmb}) -> não definido!";
            if (typeof __classPrivateFieldGet(this, _Tools_config, "f").mod == "undefined")
                throw "sefazStatus({...mod}) -> não definido!";
            let tempUF = urlEventos(__classPrivateFieldGet(this, _Tools_config, "f").UF, __classPrivateFieldGet(this, _Tools_config, "f").versao);
            //Separado para validar o corpo da consulta
            let consStatServ = {
                "@versao": "4.00",
                "@xmlns": "http://www.portalfiscal.inf.br/nfe",
                "tpAmb": __classPrivateFieldGet(this, _Tools_config, "f").tpAmb,
                "cUF": tempUF.cUF,
                "xServ": "STATUS"
            };
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
            };
            try {
                let tempBuild = new XMLBuilder({
                    ignoreAttributes: false,
                    attributeNamePrefix: "@"
                });
                //Validação
                __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_xmlValido).call(this, tempBuild.build({ consStatServ }), `consStatServ_v${__classPrivateFieldGet(this, _Tools_config, "f").versao}`);
                let tempUF = urlEventos(__classPrivateFieldGet(this, _Tools_config, "f").UF, __classPrivateFieldGet(this, _Tools_config, "f").versao);
                let xml = tempBuild.build(xmlObj);
                const req = https.request(tempUF[`mod${__classPrivateFieldGet(this, _Tools_config, "f").mod}`][(__classPrivateFieldGet(this, _Tools_config, "f").tpAmb == 1 ? "producao" : "homologacao")].NFeStatusServico, {
                    ...{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/soap+xml; charset=utf-8',
                            'Content-Length': xml.length,
                        },
                        rejectUnauthorized: false
                    },
                    ...await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_certTools).call(this)
                }, (res) => {
                    let data = '';
                    res.on('data', (chunk) => {
                        data += chunk;
                    });
                    res.on('end', () => {
                        resvol(data);
                    });
                });
                req.setTimeout(__classPrivateFieldGet(this, _Tools_config, "f").timeout * 1000, () => {
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
            }
            catch (erro) {
                reject(erro);
            }
        });
    }
}
_Tools_cert = new WeakMap(), _Tools_xmlTools = new WeakMap(), _Tools_pem = new WeakMap(), _Tools_config = new WeakMap(), _Tools_instances = new WeakSet(), _Tools_gerarQRCodeNFCe = function _Tools_gerarQRCodeNFCe(NFe, versaoQRCode = "2", idCSC, CSC) {
    let s = '|', concat, hash;
    if (NFe.infNFe.ide.tpEmis == 1) {
        concat = [NFe.infNFe['@Id'].replace("NFe", ""), versaoQRCode, NFe.infNFe.ide.tpAmb, Number(idCSC)].join(s);
    }
    else {
        let hexDigestValue = Buffer.from(NFe.Signature.SignedInfo.Reference.DigestValue).toString('hex');
        concat = [NFe.infNFe['@Id'].replace("NFe", ""), versaoQRCode, NFe.infNFe.ide.tpAmb, NFe.infNFe.ide.dhEmi, NFe.infNFe.total.ICMSTot.vNF, hexDigestValue, Number(idCSC)].join(s);
    }
    hash = crypto.createHash('sha1').update(concat + CSC).digest('hex');
    return NFe.infNFeSupl.qrCode + '?p=' + concat + s + hash;
}, _Tools_xmlValido = 
//Validar XML da NFe, somente apos assinar
async function _Tools_xmlValido(xml, xsd) {
    const xmlFile = tmp.fileSync({ mode: 0o644, prefix: 'xml-', postfix: '.xml' });
    fs.writeFileSync(xmlFile.name, xml, { encoding: 'utf8' });
    const schemaPath = path.resolve(__dirname, `../../schemas/${xsd}.xsd`);
    const verif = spawnSync(__classPrivateFieldGet(this, _Tools_config, "f").xmllint, ['--noout', '--schema', schemaPath, xmlFile.name], { encoding: 'utf8' });
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
        if (__classPrivateFieldGet(this, _Tools_pem, "f").key != "")
            resvol(__classPrivateFieldGet(this, _Tools_pem, "f"));
        pem.readPkcs12(__classPrivateFieldGet(this, _Tools_cert, "f").pfx, { p12Password: __classPrivateFieldGet(this, _Tools_cert, "f").senha }, (err, myPem) => {
            if (err)
                return reject(err); // <-- importante!
            __classPrivateFieldSet(this, _Tools_pem, myPem, "f");
            resvol(__classPrivateFieldGet(this, _Tools_pem, "f"));
        });
    });
};
export { Tools };
