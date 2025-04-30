import { XMLParser, XMLBuilder } from "fast-xml-parser";
import { gunzipSync } from 'zlib'; // ou zlibSync
import { Buffer } from 'buffer';
const cUF2UF = {
    "11": "RO",
    "12": "AC",
    "13": "AM",
    "14": "RR",
    "15": "PA",
    "16": "AP",
    "17": "TO",
    "21": "MA",
    "22": "PI",
    "23": "CE",
    "24": "RN",
    "25": "PB",
    "26": "PE",
    "27": "AL",
    "28": "SE",
    "29": "BA",
    "31": "MG",
    "32": "ES",
    "33": "RJ",
    "35": "SP",
    "41": "PR",
    "42": "SC",
    "43": "RS",
    "50": "MS",
    "51": "MT",
    "52": "GO",
    "53": "DF"
}, UF2cUF = {
    "RO": "11",
    "AC": "12",
    "AM": "13",
    "RR": "14",
    "PA": "15",
    "AP": "16",
    "TO": "17",
    "MA": "21",
    "PI": "22",
    "CE": "23",
    "RN": "24",
    "PB": "25",
    "PE": "26",
    "AL": "27",
    "SE": "28",
    "BA": "29",
    "MG": "31",
    "ES": "32",
    "RJ": "33",
    "SP": "35",
    "PR": "41",
    "SC": "42",
    "RS": "43",
    "MS": "50",
    "MT": "51",
    "GO": "52",
    "DF": "53"
};
//Função auxliar de imposto
const impEstrutura = (imposto) => {
    const gStruct = {
        ICMS: {
            ICMS_ICMSSN: {
                "@label": "Tributação",
                "@type": "select",
                "@obrig": true,
                "@values": [
                    { "102": "Tributação Normal" },
                    { "103": "Simples Nacional" }
                ],
                "@next": {
                    CST: {
                        "@label": "Situação Tributaria",
                        "@type": "select",
                        "@obrig": true,
                        "@values": [
                            { "00": "00 - Tributada integralmente" },
                            { "10": "10 - Tributada com cobrança do ICMS por ST" },
                            { "10v2": "10 - Tributada com cobrança do ICMS por ST(com partilha do ICMS entre UF de origem e a UF de destino ou a UFdefinida na legislação)" },
                            { "20": "20 - Com redução de base de cálculo" },
                            { "30": "30 - Isenta ou não tributada e com cobrança do ICMS por ST" },
                            { "40": "40 - Isenta" },
                            { "41": "41 - Não tributada" },
                            { "41v2": "41 - Não tributada (ICMSST devido para UF de destino, nas operações interestaduais de produtos que tiveram retenção de ICMS na UF do rementente)" },
                            { "50": "50 - Suspensão" },
                            { "51": "51 - Diferimento" },
                            { "60": "60 - Cobrado anteriormente por ST" },
                            { "60v2": "60 - Cobrado anteriormente por ST" },
                            { "70": "70 - Com redução de base de cálculo e cobrança do ICMS por ST" },
                            { "90": "90 - Outros (Com partilha do ICMS entre a UF de origem e a UF de destino ou a UF definida na legistação)" },
                            { "90v2": "90 - Outros" },
                        ],
                    },
                    orig: {
                        "@label": "Origem",
                        "@type": "select",
                        "@obrig": true,
                        "@values": [
                            { "0": "Nacional, exceto as indicadas nos códigos 3, 4, 5 e 8" },
                            { "1": "Estrangeira - Importação direta, exceto a indicada no código 6" },
                            { "2": "Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7" },
                            { "3": "Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40% e inferior ou igual a 70%" },
                            { "4": "Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos de que tratam as legislações citadas nos Ajustes" },
                            { "5": "Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40% " },
                            { "6": "Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX e gás natural" },
                            { "7": "Estrangeira - Adquirida no mercado interno, sem similar nacional, constante lista CAMEX e gás natural" }
                        ],
                    },
                    "@next": {
                        "@CST_00": {
                            modBC: {
                                "@label": "Modalidade de determinação da base de calculo ICMS",
                                "@type": "select",
                                "@obrig": true,
                                "@values": [
                                    { "0": "0-Margem Valor Agregado (%)" },
                                    { "1": "1-Pauta (Valor)" },
                                    { "2": "2-Preço Tabelado Máx" },
                                    { "3": "3-Valor da operação" }
                                ],
                            },
                            vBC: {
                                "@label": "Base de calculo ICMS",
                                "@type": "input",
                                "@obrig": true,
                            },
                            pICMS: {
                                "@label": "Líquota do ICMS",
                                "@type": "input",
                                "@obrig": true,
                            },
                            vICMS: {
                                "@label": "Valor ICMS",
                                "@type": "input",
                                "@obrig": true,
                            },
                            pFCP: {
                                "@label": "% Relativo ao FCP ST",
                                "@type": "input",
                                "@obrig": false,
                            },
                            vFCP: {
                                "@label": "Valor ICMS FCP ST",
                                "@type": "input",
                                "@obrig": false,
                            }
                        },
                        "@CST_10": {
                            modBC: {
                                "@label": "Modalidade de determinação da base de calculo ICMS",
                                "@type": "select",
                                "@obrig": true,
                                "@values": [
                                    { "0": "0-Margem Valor Agregado (%)" },
                                    { "1": "1-Pauta (Valor)" },
                                    { "2": "2-Preço Tabelado Máx" },
                                    { "3": "3-Valor da operação" }
                                ],
                            },
                            vBC: {
                                "@label": "Base de calculo ICMS",
                                "@type": "input",
                                "@obrig": true,
                            },
                            pICMS: {
                                "@label": "Líquota do ICMS",
                                "@type": "input",
                                "@obrig": true,
                            },
                            vICMS: {
                                "@label": "Valor ICMS",
                                "@type": "input",
                                "@obrig": true,
                            },
                            modBCST: {
                                "@label": "Modalidade de determinação da BC do ICMS ST",
                                "@type": "select",
                                "@obrig": true,
                                "@values": [
                                    { "0": "Preço tabelado ou máximo sugerido" },
                                    { "1": "Lista Negativa (valor)" },
                                    { "2": "Lista Positiva (valor)" },
                                    { "3": "Lista Neutra (valor)" },
                                    { "4": "Margem Valor Agregado (%)" },
                                    { "5": "Pauta (valor)" },
                                    { "6": "Valor da Operação (NT 2019.001)" }
                                ],
                            },
                            pMVAST: {
                                "@label": "% Margem de valor adic. ICMS ST",
                                "@type": "input",
                                "@obrig": true,
                            },
                            pRedBCST: {
                                "@label": "% Redução de BC ICMS ST",
                                "@type": "input",
                                "@obrig": true,
                            },
                            vBCST: {
                                "@label": "BC ICMS ST",
                                "@type": "input",
                                "@obrig": true,
                            },
                            pICMSST: {
                                "@label": "Alíquota de ICMS ST",
                                "@type": "input",
                                "@obrig": true,
                            },
                            vICMSST: {
                                "@label": "ICMS ST",
                                "@type": "input",
                                "@obrig": true,
                            },
                            vBCFCPST: {
                                "@label": "BC ICMS FCP ST",
                                "@type": "input",
                                "@obrig": true,
                            },
                            pFCPST: {
                                "@label": "% Relativo ao FCP ST",
                                "@type": "input",
                                "@obrig": true,
                            },
                            vFCPST: {
                                "@label": "Valor ICMS FCP ST",
                                "@type": "input",
                                "@obrig": true,
                            },
                            vBCFCP: {
                                "@label": "BC ICMS FCP",
                                "@type": "input",
                                "@obrig": false,
                            },
                            pFCP: {
                                "@label": "% Relativo ao FCP",
                                "@type": "input",
                                "@obrig": false,
                            },
                            vFCP: {
                                "@label": "Valor ICMS FCP",
                                "@type": "input",
                                "@obrig": false,
                            },
                        }
                    }
                }
            },
        },
        II: {},
        ICMSint: {},
        IPI: {},
        IPIDev: {},
        ISSQN: {},
        COFINS: {},
        PIS: {}
    };
    //Configurar valores
    let configStruct = async (el, struc) => {
        Object.keys(struc).forEach(key => {
            if (typeof el[key] == "undefined") { //Não foi definido pelo usuario!
                if (struc[key]["@obrig"]) { //Obrigatorio?
                    return struc; //Retonar estrutura
                }
            }
        });
        Object.keys(struc).forEach(key => {
            if (typeof el[key]["@next"][`${key}_${el[key].value}`] != "undefined") { //Não foi definido pelo usuario!
            }
        });
        if (el["@next"]) {
        }
        return configStruct(imposto, gStruct);
    };
    imposto = configStruct(imposto, gStruct);
};
const xml2json = (xml) => {
    return new Promise((resvol, reject) => {
        let XMLPar = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@",
            parseTagValue: false, // Evita conversão automática de valores
        });
        resvol(XMLPar.parse(xml));
    });
};
const json2xml = (obj) => {
    return new Promise((resvol, reject) => {
        let XMLBuil = new XMLBuilder({
            ignoreAttributes: false,
            attributeNamePrefix: "@",
        });
        resvol(XMLBuil.build(obj));
    });
};
const formatData = (dataUsr = new Date()) => {
    const ano = dataUsr.getFullYear();
    const mes = String(dataUsr.getMonth() + 1).padStart(2, '0'); // Adiciona 1 porque os meses começam do 0
    const dia = String(dataUsr.getDate()).padStart(2, '0');
    const horas = String(dataUsr.getHours()).padStart(2, '0');
    const minutos = String(dataUsr.getMinutes()).padStart(2, '0');
    const segundos = String(dataUsr.getSeconds()).padStart(2, '0');
    const fusoHorario = -dataUsr.getTimezoneOffset() / 60; // Obtém o fuso horário em horas
    const formatoISO = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}${fusoHorario >= 0 ? '+' : '-'}${String(Math.abs(fusoHorario)).padStart(2, '0')}:00`;
    return formatoISO;
};
const docZip = async (xml, retorno = "original") => {
    return new Promise(async (resolve, reject) => {
        if (typeof retorno == "undefined")
            retorno = "original";
        const decodeDocZipToXml = (docZipBase64) => {
            // 1. Converte base64 para buffer
            const zippedBuffer = Buffer.from(docZipBase64, 'base64');
            // 2. Descomprime com gzip
            const xmlBuffer = gunzipSync(zippedBuffer);
            // 3. Converte para string UTF-8
            return xmlBuffer.toString('utf8');
        };
        const jXml = await xml2json(xml);
        try {
            var docZips = jXml["nfeDistDFeInteresseResponse"]["nfeDistDFeInteresseResult"]["retDistDFeInt"];
            if (typeof docZips['loteDistDFeInt'] == "undefined")
                return resolve([]);
            docZips = docZips["loteDistDFeInt"]['docZip'];
            if (!Array.isArray(docZips))
                docZips = [docZips];
            for (const doc of docZips) {
                doc['xml'] = decodeDocZipToXml(doc['#text']);
                doc['NSU'] = doc['@NSU'];
                doc['schema'] = doc['@schema'];
                delete doc['#text'];
                delete doc['@NSU'];
                delete doc['@schema'];
            }
            resolve(docZips);
        }
        catch (error) {
            reject(error);
        }
    });
};
export { cUF2UF, UF2cUF, json2xml, xml2json, formatData, docZip };
