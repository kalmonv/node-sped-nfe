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
var _Tools_instances, _Tools_cert, _Tools_pem, _Tools_config, _Tools_getSignature, _Tools_gerarQRCodeNFCe, _Tools_descEvento, _Tools_xmlValido, _Tools_certTools, _Tools_limparSoap;
import { XMLBuilder } from "fast-xml-parser";
import https from "https";
import { spawnSync } from "child_process";
import tmp from "tmp";
import crypto from "crypto";
import { urlEventos } from "./eventos.js";
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import pem from 'pem';
import { cUF2UF, json2xml, xml2json, formatData, UF2cUF } from "./extras.js";
import { SignedXml } from 'xml-crypto';
class Tools {
    constructor(config = { mod: "", xmllint: 'xmllint', UF: '', tpAmb: 2, CSC: "", CSCid: "", versao: "4.00", timeout: 30, openssl: null, CPF: "", CNPJ: "" }, certificado = { pfx: "", senha: "" }) {
        _Tools_instances.add(this);
        _Tools_cert.set(this, void 0);
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
        //Default do sistema
        if (typeof config.timeout == "undefined")
            config.timeout = 30;
        if (typeof config.xmllint == "undefined")
            config.xmllint = 'xmllint';
        if (typeof config.openssl == "undefined")
            config.openssl = null;
        //Configurar certificado
        __classPrivateFieldSet(this, _Tools_config, config, "f");
        __classPrivateFieldSet(this, _Tools_cert, certificado, "f");
    }
    sefazInutiliza({ nSerie, nIni, nFin, xJust, ano, }) {
        return new Promise(async (resolve, reject) => {
            if (!__classPrivateFieldGet(this, _Tools_config, "f").CNPJ && !__classPrivateFieldGet(this, _Tools_config, "f").CPF)
                throw "new Tools({CNPJ|CPF}) -> não definido!";
            ano = `${ano ?? new Date().getFullYear()}`.slice(2, 4);
            await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_certTools).call(this);
            let inutNFeXML = {
                "inutNFe": {
                    "@xmlns": "http://www.portalfiscal.inf.br/nfe",
                    "@versao": "4.00",
                    "infInut": {
                        ...{
                            "tpAmb": __classPrivateFieldGet(this, _Tools_config, "f").tpAmb,
                            "xServ": "INUTILIZAR",
                            "cUF": UF2cUF[__classPrivateFieldGet(this, _Tools_config, "f").UF],
                            "ano": ano,
                        },
                        ...(__classPrivateFieldGet(this, _Tools_config, "f").CNPJ !== undefined ? { CNPJ: __classPrivateFieldGet(this, _Tools_config, "f").CNPJ } : { CPF: __classPrivateFieldGet(this, _Tools_config, "f").CPF }),
                        ...{
                            "mod": __classPrivateFieldGet(this, _Tools_config, "f").mod,
                            "serie": nSerie,
                            "nNFIni": nIni,
                            "nNFFin": nFin,
                            "xJust": xJust,
                            "@Id": `ID${UF2cUF[__classPrivateFieldGet(this, _Tools_config, "f").UF]}${ano}${__classPrivateFieldGet(this, _Tools_config, "f").CNPJ != undefined ? __classPrivateFieldGet(this, _Tools_config, "f").CNPJ : __classPrivateFieldGet(this, _Tools_config, "f").CPF}${__classPrivateFieldGet(this, _Tools_config, "f").mod}${String(nSerie).padStart(3, '0')}${String(nIni).padStart(9, '0')}${String(nFin).padStart(9, '0')}`
                        }
                    },
                }
            };
            let xmlSing = await json2xml(inutNFeXML);
            xmlSing = await this.xmlSign(xmlSing, { tag: "infInut" }); //Assinado
            await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_xmlValido).call(this, xmlSing, `inutNFe_v4.00`).catch(reject); //Validar corpo
            xmlSing = await json2xml({
                "soap:Envelope": {
                    "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                    "@xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
                    "@xmlns:soap": "http://www.w3.org/2003/05/soap-envelope",
                    "soap:Body": {
                        "nfeDadosMsg": {
                            "@xmlns": "http://www.portalfiscal.inf.br/nfe/wsdl/NFeInutilizacao4",
                            ...await xml2json(xmlSing)
                        }
                    }
                }
            });
            try {
                let tempUF = urlEventos(__classPrivateFieldGet(this, _Tools_config, "f").UF, __classPrivateFieldGet(this, _Tools_config, "f").versao);
                const req = https.request(tempUF[`mod${__classPrivateFieldGet(this, _Tools_config, "f").mod}`][(__classPrivateFieldGet(this, _Tools_config, "f").tpAmb == 1 ? "producao" : "homologacao")].NFeInutilizacao, {
                    ...{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/soap+xml; charset=utf-8',
                            'Content-Length': xmlSing.length,
                        },
                        rejectUnauthorized: false
                    },
                    ...await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_certTools).call(this)
                }, (res) => {
                    let data = '';
                    res.on('data', (chunk) => {
                        data += chunk;
                    });
                    res.on('end', async () => {
                        try {
                            resolve(await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_limparSoap).call(this, data));
                        }
                        catch (error) {
                            resolve(data);
                        }
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
                req.write(xmlSing);
                req.end();
            }
            catch (erro) {
                reject(erro);
            }
        });
    }
    sefazEnviaLote(xml, data = { idLote: 1, indSinc: 0, compactar: false }) {
        return new Promise(async (resolve, reject) => {
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
                    ...await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_certTools).call(this)
                }, (res) => {
                    let data = '';
                    res.on('data', (chunk) => {
                        data += chunk;
                    });
                    res.on('end', async () => {
                        try {
                            resolve(await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_limparSoap).call(this, data));
                        }
                        catch (error) {
                            resolve(data);
                        }
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
            var xml = await this.xml2json(xmlJSON);
            if (data.tag == "infNFe") {
                if (xml.NFe.infNFe.ide.mod * 1 == 65) {
                    xml.NFe.infNFeSupl.qrCode = __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_gerarQRCodeNFCe).call(this, xml.NFe, "2", __classPrivateFieldGet(this, _Tools_config, "f").CSCid, __classPrivateFieldGet(this, _Tools_config, "f").CSC);
                    xmlJSON = await json2xml(xml);
                }
                xml.NFe = {
                    ...xml.NFe,
                    ...await xml2json(await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_getSignature).call(this, xmlJSON, data.tag))
                };
            }
            else if (data.tag == "infEvento") {
                xml.envEvento.evento = {
                    ...xml.envEvento.evento,
                    ...(await xml2json(await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_getSignature).call(this, xmlJSON, data.tag)))
                };
            }
            else if (data.tag == "infInut") {
                xml.inutNFe = {
                    ...xml.inutNFe,
                    ...(await xml2json(await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_getSignature).call(this, xmlJSON, data.tag)))
                };
            }
            resvol(await json2xml(xml));
        });
    }
    async xml2json(xml) {
        return new Promise((resvol, reject) => {
            xml2json(xml).then(resvol).catch(reject);
        });
    }
    async json2xml(obj) {
        return new Promise((resvol, reject) => {
            json2xml(obj).then(resvol).catch(reject);
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
            let cUF = `${chNFe}`.substring(0, 2);
            let UF = cUF2UF[cUF];
            let mod = `${chNFe}`.substring(20, 22);
            //https://www.nfe.fazenda.gov.br/portal/webservices.aspx?AspxAutoDetectCookieSupport=1
            if (["AC", "AL", "AP", "CE", "DF", "ES", "PA", "PB", "PI", "RJ", "RN", "RO", "RR", "SC", "SE", "TO"].includes(UF))
                UF = 'SVRS';
            if (["MA"].includes(UF))
                UF = 'SVAN';
            if (typeof __classPrivateFieldGet(this, _Tools_config, "f").tpAmb === "undefined")
                throw "consultarNFe({...tpAmb}) -> não definido!";
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
                await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_xmlValido).call(this, builder.build({ consSitNFe }), `consSitNFe_v${__classPrivateFieldGet(this, _Tools_config, "f").versao}`).catch(reject);
                ;
                const xml = builder.build(xmlObj);
                let tempUF = urlEventos(UF, __classPrivateFieldGet(this, _Tools_config, "f").versao);
                const url = tempUF[`mod${mod}`][(__classPrivateFieldGet(this, _Tools_config, "f").tpAmb == 1 ? "producao" : "homologacao")].NFeConsultaProtocolo;
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
                    res.on('end', async () => {
                        try {
                            resolve(await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_limparSoap).call(this, data));
                        }
                        catch (error) {
                            resolve(data);
                        }
                    });
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
    async sefazEvento({ chNFe = "", tpEvento = "", nProt = "", xJust = "", nSeqEvento = 1, dhEvento = formatData() }) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!chNFe)
                    throw "sefazEvento({chNFe}) -> não definido!";
                if (!tpEvento)
                    throw "sefazEvento({tpEvento}) -> não definido!";
                if (!__classPrivateFieldGet(this, _Tools_config, "f").CNPJ && !__classPrivateFieldGet(this, _Tools_config, "f").CPF)
                    throw "new Tools({CNPJ|CPF}) -> não definido!";
                let detEvento = {
                    "@versao": "1.00",
                    "descEvento": __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_descEvento).call(this, `${tpEvento}`)
                };
                const cOrgao = !['210200', '210210', '210220', '210240'].includes(tpEvento) ? chNFe.substring(0, 2) : '91';
                // Adicionar campos específicos por tipo de evento
                if (tpEvento === "110111") { // Cancelamento
                    if (!nProt)
                        throw "sefazEvento({nProt}) obrigatório para Cancelamento!";
                    if (!xJust)
                        throw "sefazEvento({xJust}) obrigatório para Cancelamento!";
                    detEvento["nProt"] = nProt;
                    detEvento["xJust"] = xJust;
                }
                else if (tpEvento === "110110") { // Carta de Correção
                    if (!xJust)
                        throw "sefazEvento({xJust}) obrigatório para Carta de Correção!";
                    detEvento["xCorrecao"] = xJust;
                    detEvento["xCondUso"] = "A Carta de Correcao e disciplinada pelo paragrafo 1o-A do art. 7o do Convenio S/N, de 15 de dezembro de 1970 e pode ser utilizada para regularizacao de erro ocorrido na emissao de documento fiscal, desde que o erro nao esteja relacionado com: I - as variaveis que determinam o valor do imposto tais como: base de calculo, aliquota, diferenca de preco, quantidade, valor da operacao ou da prestacao; II - a correcao de dados cadastrais que implique mudanca do remetente ou do destinatario; III - a data de emissao ou de saida.";
                }
                else if (tpEvento === "210240") { // Operação não realizada
                    if (!xJust)
                        throw "sefazEvento({xJust}) obrigatório para Operação não realizada!";
                    detEvento["xJust"] = xJust;
                }
                // Ciência (210210), Confirmação (210200), Desconhecimento (210220) não precisam de campos extras
                const tempUF = urlEventos(cUF2UF[cOrgao], __classPrivateFieldGet(this, _Tools_config, "f").versao);
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
                                "tpAmb": __classPrivateFieldGet(this, _Tools_config, "f").tpAmb,
                                "CNPJ": __classPrivateFieldGet(this, _Tools_config, "f").CNPJ,
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
                await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_xmlValido).call(this, xmlSing, `envEvento_v1.00`).catch(reject); //Validar corpo
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
                    const req = https.request(tempUF[`mod${chNFe.substring(20, 22)}`][(__classPrivateFieldGet(this, _Tools_config, "f").tpAmb == 1 ? "producao" : "homologacao")].NFeRecepcaoEvento, {
                        ...{
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/soap+xml; charset=utf-8',
                                'Content-Length': xmlSing.length,
                            },
                            rejectUnauthorized: false,
                        },
                        ...await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_certTools).call(this)
                    }, (res) => {
                        let data = '';
                        res.on('data', (chunk) => {
                            data += chunk;
                        });
                        res.on('end', async () => {
                            try {
                                resolve(await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_limparSoap).call(this, data));
                            }
                            catch (error) {
                                resolve(data);
                            }
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
                    req.write(xmlSing);
                    req.end();
                }
                catch (erro) {
                    reject(erro);
                }
            }
            catch (erro) {
                reject(erro);
            }
        });
    }
    async sefazDistDFe({ ultNSU = undefined, chNFe = undefined }) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!chNFe && !ultNSU)
                    throw "sefazDistDFe({chNFe|ultNSU})";
                if (!__classPrivateFieldGet(this, _Tools_config, "f").CNPJ && !__classPrivateFieldGet(this, _Tools_config, "f").CPF)
                    throw "Tools({CNPJ|CPF})";
                if (__classPrivateFieldGet(this, _Tools_config, "f").CPF != undefined) {
                    if (__classPrivateFieldGet(this, _Tools_config, "f").CPF.length !== 11)
                        throw "Tools({CPF}) inválido!";
                }
                else {
                    if (__classPrivateFieldGet(this, _Tools_config, "f").CNPJ.length !== 14)
                        throw "Tools({CNPJ}) inválido!";
                }
                // Gera o XML da consulta
                // Prepara o SOAP
                var xmlSing = await json2xml({
                    "distDFeInt": {
                        "@xmlns": "http://www.portalfiscal.inf.br/nfe",
                        "@versao": "1.01",
                        "tpAmb": 1, // 1 = produção, 2 = homologação
                        "cUFAutor": UF2cUF[__classPrivateFieldGet(this, _Tools_config, "f").UF], // "AN" - Ambiente Nacional
                        "CNPJ": __classPrivateFieldGet(this, _Tools_config, "f").CNPJ,
                        ...(typeof ultNSU != "undefined" ?
                            { "distNSU": { "ultNSU": `${ultNSU}`.padStart(15, '0') } } :
                            {}),
                        ...(typeof chNFe != "undefined" ?
                            { "consChNFe": { "chNFe": chNFe } } :
                            {})
                    }
                });
                await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_xmlValido).call(this, xmlSing, `distDFeInt_v1.01`).catch(reject); //Validar corpo
                const tempUF = urlEventos(`AN`, __classPrivateFieldGet(this, _Tools_config, "f").versao);
                xmlSing = await json2xml({
                    "soap:Envelope": {
                        "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                        "@xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
                        "@xmlns:soap": "http://www.w3.org/2003/05/soap-envelope",
                        "soap:Body": {
                            "nfeDistDFeInteresse": {
                                "@xmlns": "http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe",
                                "nfeDadosMsg": {
                                    ...{ "@xmlns": "http://www.portalfiscal.inf.br/nfe/wsdl/NFeDistribuicaoDFe" },
                                    ...await xml2json(xmlSing)
                                }
                            }
                        }
                    }
                });
                // HTTPS Request, trava modelo 55
                const req = https.request(tempUF[`mod55`][(__classPrivateFieldGet(this, _Tools_config, "f").tpAmb == 1 ? "producao" : "homologacao")].NFeDistribuicaoDFe, {
                    ...{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/soap+xml; charset=utf-8',
                            'Content-Length': xmlSing.length,
                        },
                        rejectUnauthorized: false
                    },
                    ...await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_certTools).call(this)
                }, (res) => {
                    let data = '';
                    res.on('data', (chunk) => {
                        data += chunk;
                    });
                    res.on('end', async () => {
                        try {
                            resolve(await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_limparSoap).call(this, data));
                        }
                        catch (error) {
                            resolve(data);
                        }
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
                req.write(xmlSing);
                req.end();
            }
            catch (erro) {
                reject(erro);
            }
        });
    }
    //Consulta status sefaz
    async sefazStatus() {
        return new Promise(async (resolve, reject) => {
            if (typeof __classPrivateFieldGet(this, _Tools_config, "f").UF == "undefined")
                throw "sefazStatus({...UF}) -> não definido!";
            if (typeof __classPrivateFieldGet(this, _Tools_config, "f").tpAmb == "undefined")
                throw "sefazStatus({...tpAmb}) -> não definido!";
            if (typeof __classPrivateFieldGet(this, _Tools_config, "f").mod == "undefined")
                throw "sefazStatus({...mod}) -> não definido!";
            //Separado para validar o corpo da consulta
            let consStatServ = {
                "@versao": "4.00",
                "@xmlns": "http://www.portalfiscal.inf.br/nfe",
                "tpAmb": __classPrivateFieldGet(this, _Tools_config, "f").tpAmb,
                "cUF": UF2cUF[__classPrivateFieldGet(this, _Tools_config, "f").UF],
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
                await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_xmlValido).call(this, tempBuild.build({ consStatServ }), `consStatServ_v${__classPrivateFieldGet(this, _Tools_config, "f").versao}`).catch(reject);
                let tempUF = urlEventos(__classPrivateFieldGet(this, _Tools_config, "f").UF, __classPrivateFieldGet(this, _Tools_config, "f").versao);
                let xml = tempBuild.build(xmlObj);
                const req = https.request(tempUF[`mod${__classPrivateFieldGet(this, _Tools_config, "f").mod}`][(__classPrivateFieldGet(this, _Tools_config, "f").tpAmb == 1 ? "producao" : "homologacao")].NFeStatusServico, {
                    ...{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/soap+xml; charset=utf-8',
                            'Content-Length': xml.length,
                            'SOAPAction': 'http://www.portalfiscal.inf.br/nfe/wsdl/NfeStatusServico4/nfeStatusServicoNF'
                        },
                        rejectUnauthorized: false
                    },
                    ...await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_certTools).call(this)
                }, (res) => {
                    let data = '';
                    res.on('data', (chunk) => {
                        data += chunk;
                    });
                    res.on('end', async () => {
                        try {
                            resolve(await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_limparSoap).call(this, data));
                        }
                        catch (error) {
                            resolve(data);
                        }
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
    async validarNFe(xml) {
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_xmlValido).call(this, xml, `nfe_v${__classPrivateFieldGet(this, _Tools_config, "f").versao}`).then(resolve).catch(reject);
        });
    }
}
_Tools_cert = new WeakMap(), _Tools_pem = new WeakMap(), _Tools_config = new WeakMap(), _Tools_instances = new WeakSet(), _Tools_getSignature = 
//Responsavel por gerar assinatura
async function _Tools_getSignature(xmlJSON, tag) {
    return new Promise(async (resvol, reject) => {
        let tempPem = await __classPrivateFieldGet(this, _Tools_instances, "m", _Tools_certTools).call(this);
        const sig = new SignedXml({
            privateKey: tempPem.key,
            canonicalizationAlgorithm: 'http://www.w3.org/TR/2001/REC-xml-c14n-20010315',
            signatureAlgorithm: 'http://www.w3.org/2000/09/xmldsig#rsa-sha1',
            publicCert: tempPem.pem,
            getKeyInfoContent: (args) => {
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
        return resvol(sig.getSignatureXml());
    });
}, _Tools_gerarQRCodeNFCe = function _Tools_gerarQRCodeNFCe(NFe, versaoQRCode = "2", idCSC, CSC) {
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
}, _Tools_descEvento = function _Tools_descEvento(tpEvento) {
    const eventos = {
        "110110": "Carta de Correcao",
        "110111": "Cancelamento",
        "210200": "Confirmacao da Operacao",
        "210210": "Ciencia da Operacao",
        "210220": "Desconhecimento da Operacao",
        "210240": "Operacao nao Realizada"
    };
    return eventos[tpEvento] || "Evento";
}, _Tools_xmlValido = 
//Validar XML da NFe, somente apos assinar
async function _Tools_xmlValido(xml, xsd) {
    return new Promise((resolve, reject) => {
        const xmlFile = tmp.fileSync({ mode: 0o644, prefix: 'xml-', postfix: '.xml' });
        fs.writeFileSync(xmlFile.name, xml, { encoding: 'utf8' });
        //Obter caminho, dos schemas
        var schemaPath = "";
        try { //NW.js + ElectronJS
            schemaPath = path.dirname(require.resolve("node-sped-nfe"));
            schemaPath = path.resolve(`${path.join(schemaPath, "..", "schemas")}/PL_010b_V1.30/${xsd}.xsd`);
        }
        catch (error) { //Caso o require seja desativo
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            schemaPath = path.resolve(__dirname, `../../schemas/PL_010b_V1.30/${xsd}.xsd`);
        }
        const verif = spawnSync(__classPrivateFieldGet(this, _Tools_config, "f").xmllint, ['--noout', '--schema', schemaPath, xmlFile.name], { encoding: 'utf8' });
        xmlFile.removeCallback();
        // Aqui, usamos o operador de encadeamento opcional (?.)
        if (verif.error) {
            return reject("Biblioteca xmllint não encontrada!");
        }
        else if (!verif.stderr.includes(".xml validates")) {
            return reject(verif.stderr.replace(/\/tmp\/[^:\s]+\.xml/g, '') // Remove os caminhos /tmp/*.xml
                .replace(/\s{2,}/g, ' ') // Ajusta múltiplos espaços para um só
                .trim()); // Remove espaços no começo e fim)
        }
        else {
            resolve(true);
        }
    });
}, _Tools_certTools = function _Tools_certTools() {
    return new Promise(async (resvol, reject) => {
        if (__classPrivateFieldGet(this, _Tools_pem, "f").key != "")
            resvol(__classPrivateFieldGet(this, _Tools_pem, "f"));
        if (__classPrivateFieldGet(this, _Tools_config, "f").openssl != null) {
            pem.config({
                pathOpenSSL: __classPrivateFieldGet(this, _Tools_config, "f").openssl
            });
        }
        pem.readPkcs12(__classPrivateFieldGet(this, _Tools_cert, "f").pfx, { p12Password: __classPrivateFieldGet(this, _Tools_cert, "f").senha }, (err, myPem) => {
            if (err)
                return reject(err); // <-- importante!
            __classPrivateFieldSet(this, _Tools_pem, myPem, "f");
            resvol(__classPrivateFieldGet(this, _Tools_pem, "f"));
        });
    });
}, _Tools_limparSoap = 
//Remove coisas inuteis da resposta do sefaz
async function _Tools_limparSoap(xml) {
    if (xml == "Bad Request")
        throw xml;
    const clear = [
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
    ];
    let jXml = await xml2json(xml);
    let index = 0;
    while (index < clear.length) {
        if (typeof jXml[clear[index]] !== "undefined") {
            jXml = jXml[clear[index]];
            index = 0; // reinicia a busca no novo nível
        }
        else {
            index++;
        }
    }
    return await json2xml(jXml);
};
export { Tools };
