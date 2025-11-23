var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Make_instances, _Make_NFe, _Make_tagTotal, _Make_gerarChaveNFe, _Make_calcularDigitoVerificador, _Make_calICMSTot, _Make_mergeobject;
import { XMLBuilder } from "fast-xml-parser";
import { urlEventos } from "./eventos.js";
import { cUF2UF } from "./extras.js";
//Classe da nota fiscal
class Make {
    constructor() {
        _Make_instances.add(this);
        _Make_NFe.set(this, {
            "@xmlns": "http://www.portalfiscal.inf.br/nfe",
            infNFe: {
            //"@xmlns": "http://www.portalfiscal.inf.br/nfe",
            }
        });
        _Make_tagTotal.set(this, {});
    }
    formatData(dataUsr = new Date()) {
        const ano = dataUsr.getFullYear();
        const mes = String(dataUsr.getMonth() + 1).padStart(2, '0'); // Adiciona 1 porque os meses começam do 0
        const dia = String(dataUsr.getDate()).padStart(2, '0');
        const horas = String(dataUsr.getHours()).padStart(2, '0');
        const minutos = String(dataUsr.getMinutes()).padStart(2, '0');
        const segundos = String(dataUsr.getSeconds()).padStart(2, '0');
        const fusoHorario = -dataUsr.getTimezoneOffset() / 60; // Obtém o fuso horário em horas
        const formatoISO = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}${fusoHorario >= 0 ? '+' : '-'}${String(Math.abs(fusoHorario)).padStart(2, '0')}:00`;
        return formatoISO;
    }
    //Optativa
    tagInfNFe(obj) {
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe[`@${key}`] = obj[key];
        });
    }
    tagIde(obj) {
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide = new Object();
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide[key] = obj[key];
        });
    }
    //Referencimanto de NFe
    tagRefNFe(obj) {
        if (typeof __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.NFref == "undefined") {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.NFref = new Array();
        }
        if (Array.isArray(obj)) { //Array de referenciamento de refNFe
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.NFref = obj.map(ref => ({ refNFe: `${ref}` }));
        }
        else { //String unica de refNFe
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.NFref.push({ refNFe: obj });
        }
    }
    tagRefNF(obj) {
        if (typeof __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.NFref == "undefined") {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.NFref = new Array();
        }
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.NFref.push({ refNF: obj });
    }
    tagRefNFP(obj) {
        if (typeof __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.NFref == "undefined") {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.NFref = new Array();
        }
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.NFref.push({ refNFP: obj });
    }
    tagRefCTe(obj) {
        if (typeof __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.NFref == "undefined") {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.NFref = new Array();
        }
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.NFref.push({ refCTe: obj });
    }
    tagRefECF(obj) {
        if (typeof __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.NFref == "undefined") {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.NFref = new Array();
        }
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.NFref.push({ refECF: obj });
    }
    tagEmit(obj) {
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.emit = new Object();
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.emit[key] = obj[key];
            if (key == "xFant") {
                __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.emit.enderEmit = {};
            }
        });
    }
    tagEnderEmit(obj) {
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.emit.enderEmit[key] = obj[key];
        });
    }
    tagDest(obj) {
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.dest = {};
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.tpAmb == 2 && obj['xNome'] !== undefined)
            obj['xNome'] = "NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL";
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.dest[key] = obj[key];
            if (key == "xNome" && __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.mod == 55) {
                __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.dest.enderDest = {};
            }
        });
    }
    tagEnderDest(obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.mod == 65)
            return 1;
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.dest.enderDest = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.dest.enderDest[key] = obj[key];
        });
    }
    tagRetirada(obj) {
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.retirada = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.retirada[key] = obj[key];
        });
    }
    tagAutXML(obj) {
        if (typeof __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.autXML == "undefined") {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.autXML = new Array();
        }
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.autXML.push(obj);
    }
    //tagprod
    async tagProd(obj) {
        //Abrir tag de imposto
        for (let cont = 0; cont < obj.length; cont++) {
            if (obj[cont]['@nItem'] === undefined) {
                obj[cont] = { '@nItem': cont + 1, prod: obj[cont], imposto: {} };
            }
            else {
                obj[cont] = { '@nItem': obj[cont]['@nItem'], prod: obj[cont], imposto: {} };
                delete obj[cont].prod['@nItem'];
            }
            //Primeiro item + NFCe + Homologação
            if (cont == 0 && __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.mod == 65 && __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.tpAmb == 2)
                obj[cont].prod.xProd = "NOTA FISCAL EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL";
            obj[cont].prod.qCom = (obj[cont].prod.qCom * 1).toFixed(4);
            obj[cont].prod.vUnCom = (obj[cont].prod.vUnCom * 1).toFixed(10);
            obj[cont].prod.vProd = (obj[cont].prod.vProd * 1).toFixed(2);
            if (obj[cont].prod.vDesc !== undefined)
                obj[cont].prod.vDesc = (obj[cont].prod.vDesc * 1).toFixed(2);
            obj[cont].prod.qTrib = (obj[cont].prod.qTrib * 1).toFixed(4);
            obj[cont].prod.vUnTrib = (obj[cont].prod.vUnTrib * 1).toFixed(10);
            //Calcular ICMSTot
            __classPrivateFieldGet(this, _Make_instances, "m", _Make_calICMSTot).call(this, {
                ...obj[cont].prod,
                ...{
                    vNF: ((obj[cont].prod.vUnCom - (obj[cont].prod?.vDesc || 0)) * obj[cont].prod.qTrib).toFixed(2)
                }
            });
        }
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det = obj;
    }
    tagCreditoPresumidoProd(obj) {
        throw "não implementado!";
    }
    taginfAdProd(index, obj) {
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index][key] = obj[key];
        });
    }
    tagCEST(obj) {
        throw "não implementado!";
    }
    tagRECOPI(obj) {
        throw "não implementado!";
    }
    tagDI(index, obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].DI === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].DI = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].DI[key] = obj[key];
        });
        //Adicionar ao imposto global
        __classPrivateFieldGet(this, _Make_instances, "m", _Make_calICMSTot).call(this, obj);
    }
    tagAdi(index, obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].DI === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].DI = {};
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].DI.adi === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].DI.adi = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].DI.adi[key] = obj[key];
        });
        //Adicionar ao imposto global
        __classPrivateFieldGet(this, _Make_instances, "m", _Make_calICMSTot).call(this, obj);
    }
    tagDetExport(obj) {
        throw "não implementado!";
    }
    tagDetExportInd(obj) {
        throw "não implementado!";
    }
    tagRastro(obj) {
        throw "não implementado!";
    }
    tagVeicProd(obj) {
        throw "não implementado!";
    }
    tagMed(obj) {
        throw "não implementado!";
    }
    tagArma(obj) {
        throw "não implementado!";
    }
    tagComb(obj) {
        throw "não implementado!";
    }
    tagEncerrante() {
        throw "não implementado!";
    }
    tagOrigComb() {
        throw "não implementado!";
    }
    tagImposto() {
        throw "não implementado!";
    }
    tagProdICMS(index, obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS = {};
        let keyXML = "";
        switch (obj.CST) {
            case '00':
                keyXML = 'ICMS00';
                break;
            case '10':
                keyXML = 'ICMS10';
                break;
            case '20':
                keyXML = 'ICMS20';
                break;
            case '30':
                keyXML = 'ICMS30';
                break;
            case '40':
            case '41':
            case '50':
                keyXML = 'ICMS40';
                break;
            case '51':
                keyXML = 'ICMS51';
                break;
            case '60':
                keyXML = 'ICMS60';
                break;
            case '70':
                keyXML = 'ICMS70';
                break;
            case '90':
                keyXML = 'ICMS90';
                break;
            default: throw new Error('CST inválido');
        }
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS[keyXML] = {};
        Object.keys(obj).forEach(key => {
            if (!['orig', 'CST', 'modBC', 'modBCST', 'motDesICMS', 'motDesICMSST', 'cBenefRBC', 'indDeduzDeson', 'UFST'].includes(key))
                obj[key] = obj[key] == 0 ? "0.00" : obj[key];
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS[keyXML][key] = obj[key];
        });
    }
    tagProdICMSPart(index, obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS = {};
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS.ICMSPart = {};
        Object.keys(obj).forEach(key => {
            if (key != 'orig' && key != 'modBC')
                obj[key] = obj[key] == 0 ? "0.00" : obj[key];
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS.ICMSPart[key] = obj[key];
        });
        //Calcular ICMSTot
        __classPrivateFieldGet(this, _Make_instances, "m", _Make_calICMSTot).call(this, obj);
    }
    //
    tagProdICMSST(index, obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS = {};
        let CST = obj.CST;
        //delete obj.CST;
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS[`ICMS${CST}`] = {};
        Object.keys(obj).forEach(key => {
            if (!["orig", "CSOSN", "modBC", "modBCST"].includes(key))
                obj[key] = obj[key] == 0 ? "0.00" : obj[key];
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS[`ICMS${CST}`][key] = obj[key];
        });
        //Calcular ICMSTot
        __classPrivateFieldGet(this, _Make_instances, "m", _Make_calICMSTot).call(this, obj);
    }
    //
    tagProdICMSSN(index, obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS = {};
        let keyXML = "";
        switch (obj.CSOSN) {
            case '101':
                keyXML = 'ICMSSN101';
                break;
            case '102':
            case '103':
            case '300':
            case '400':
                keyXML = 'ICMSSN102';
                break;
            case '201':
                keyXML = 'ICMSSN201';
                break;
            case '202':
            case '203':
                keyXML = 'ICMSSN202';
                break;
            case '500':
                keyXML = 'ICMSSN500';
                break;
            case '900':
                keyXML = 'ICMSSN900';
                break;
            default:
                throw "CSOSN não identificado!";
                break;
        }
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS[keyXML] = {};
        Object.keys(obj).forEach(key => {
            if (key != 'orig')
                obj[key] = obj[key] == 0 ? "0.00" : obj[key];
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS[keyXML][key] = obj[key];
        });
        //Calcular ICMSTot
        __classPrivateFieldGet(this, _Make_instances, "m", _Make_calICMSTot).call(this, obj);
    }
    tagProdICMSUFDest(index, obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMSUFDest === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMSUFDest = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMSUFDest[key] = obj[key] == 0 ? "0.00" : obj[key];
        });
        __classPrivateFieldGet(this, _Make_instances, "m", _Make_calICMSTot)?.call(this, obj); // opcional
    }
    tagProdIPI(index, obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.IPI === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.IPI = {};
        // Campo obrigatório na raiz do IPI
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.IPI.cEnq = obj.cEnq;
        delete obj.cEnq;
        let keyXML = "";
        switch (obj.CST) {
            case '00':
            case '49':
            case '50':
            case '99':
                keyXML = 'IPITrib';
                break;
            case '01':
            case '02':
            case '03':
            case '04':
            case '05':
            case '51':
            case '52':
            case '53':
            case '54':
            case '55':
                keyXML = 'IPINT';
                break;
            default:
                throw new Error("CST de IPI não identificado!");
        }
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.IPI[keyXML] = {};
        Object.keys(obj).forEach(key => {
            obj[key] = obj[key] == 0 ? "0.00" : obj[key];
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.IPI[keyXML][key] = obj[key];
        });
        __classPrivateFieldGet(this, _Make_instances, "m", _Make_calICMSTot).call(this, obj); // opcional se considerar IPI no total
    }
    tagProdII(index, obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.II === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.II = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.II[key] = obj[key];
        });
        __classPrivateFieldGet(this, _Make_instances, "m", _Make_calICMSTot).call(this, obj);
    }
    tagProdPIS(index, obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.PIS === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.PIS = {};
        let keyXML = "";
        switch (obj.CST) {
            case '01':
            case '02':
                keyXML = 'PISAliq';
                break;
            case '03':
                keyXML = 'PISQtde';
                break;
            case '04':
            case '05':
            case '06':
            case '07':
            case '08':
            case '09':
                keyXML = 'PISNT';
                break;
            case '49':
            case '50':
            case '51':
            case '52':
            case '53':
            case '54':
            case '55':
            case '56':
            case '60':
            case '61':
            case '62':
            case '63':
            case '64':
            case '65':
            case '66':
            case '67':
            case '70':
            case '71':
            case '72':
            case '73':
            case '74':
            case '75':
            case '98':
            case '99':
                keyXML = 'PISOutr';
                break;
            default:
                throw "CSOSN não identificado!";
                break;
        }
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.PIS[keyXML] = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.PIS[keyXML][key] = obj[key];
        });
        //Calcular ICMSTot
        __classPrivateFieldGet(this, _Make_instances, "m", _Make_calICMSTot).call(this, obj);
    }
    tagProdPISST(index, obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.PISST === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.PISST = {};
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.PISST = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.PISST[key] = obj[key];
        });
        //Calcular ICMSTot
        __classPrivateFieldGet(this, _Make_instances, "m", _Make_calICMSTot).call(this, obj);
    }
    tagProdCOFINS(index, obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.COFINS === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.COFINS = {};
        let keyXML;
        switch (obj.CST) {
            case '01':
            case '02':
                keyXML = "COFINSAliq";
                break;
            case '03':
                keyXML = "COFINSQtde";
                break;
            case '04':
            case '05':
            case '06':
            case '07':
            case '08':
            case '09':
                keyXML = "COFINSNT";
                break;
            case '49':
            case '50':
            case '51':
            case '52':
            case '53':
            case '54':
            case '55':
            case '56':
            case '60':
            case '61':
            case '62':
            case '63':
            case '64':
            case '65':
            case '66':
            case '67':
            case '70':
            case '71':
            case '72':
            case '73':
            case '74':
            case '75':
            case '98':
            case '99':
                keyXML = "COFINSOutr";
                break;
            default:
                throw new Error(`CST COFINS inválido: ${obj.CST}`);
        }
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.COFINS[keyXML] = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.COFINS[keyXML][key] = obj[key];
        });
        //Calcular ICMSTot
        __classPrivateFieldGet(this, _Make_instances, "m", _Make_calICMSTot).call(this, obj);
    }
    tagProdCOFINSST(index, obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.COFINS === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.COFINS = {};
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.COFINS.COFINSST = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.PIS.COFINSST[key] = obj[key];
        });
        //Calcular ICMSTot
        __classPrivateFieldGet(this, _Make_instances, "m", _Make_calICMSTot).call(this, obj);
    }
    //!FALTA
    tagProdIS(index, obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto = {};
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.IS = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.IS[key] = obj[key];
        });
    }
    tagProdIBSCBS(index, obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.IBSCBS === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.IBSCBS = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.IBSCBS[key] = obj[key];
        });
        //Calcular IBSCBSTot
        let temp = {
            ...({ vBCIBSCBS: obj.gIBSCBS.vBC }),
            gIBS: {
                gIBSUF: {
                    vDif: obj?.gIBSCBS?.gIBSUF?.gDif?.vDif ?? "0.00",
                    vDevTrib: obj?.gIBSCBS?.gIBSUF?.gDevTrib?.vDevTrib ?? "0.00",
                    vIBSUF: obj?.gIBSCBS?.gIBSUF?.vIBSUF ?? "0.00"
                },
                gIBSMun: {
                    vDif: obj?.gIBSCBS?.gIBSMun?.gDif?.vDif ?? "0.00",
                    vDevTrib: obj?.gIBSCBS?.gIBSMun?.gDevTrib?.vDevTrib ?? "0.00",
                    vIBSMun: obj?.gIBSCBS?.gIBSMun?.vIBSMun ?? "0.00",
                },
                vIBS: obj?.gIBSCBS?.vIBS ?? "0.00",
                vCredPres: obj?.gIBSCBS?.gIBSCredPres?.vCredPres ?? "0.00",
                vCredPresCondSus: obj?.gIBSCBS?.gIBSCredPres?.vCredPresCondSus ?? "0.00"
            },
            gCBS: {
                vDif: obj?.gIBSCBS?.gCBS?.gDif?.vDif ?? "0.00",
                vDevTrib: obj?.gIBSCBS?.gCBS?.gDevTrib?.vDevTrib ?? "0.00",
                vCBS: obj?.gIBSCBS?.gCBS?.vCBS ?? "0.00",
                vCredPres: obj?.gIBSCBS?.gCBS?.gCBSCredPres?.vCredPres ?? "0.00",
                vCredPresCondSus: obj?.gIBSCBS?.gCBS?.gCBSCredPres?.vCredPresCondSus ?? "0.00",
            }
        };
        __classPrivateFieldGet(this, _Make_tagTotal, "f").IBSCBSTot = __classPrivateFieldGet(this, _Make_instances, "m", _Make_mergeobject).call(this, __classPrivateFieldGet(this, _Make_tagTotal, "f").IBSCBSTot ?? {}, temp);
    }
    tagProdISSQN(index, obj) {
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ISSQN = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ISSQN[key] = obj[key];
        });
        //Calcular ICMSTot
        //this.#calICMSTot(obj);
        __classPrivateFieldGet(this, _Make_tagTotal, "f").ISSQNtot = __classPrivateFieldGet(this, _Make_instances, "m", _Make_mergeobject).call(this, __classPrivateFieldGet(this, _Make_tagTotal, "f").ISSQNtot ?? {
            "vServ": 0,
            "vBC": obj.vBC ?? 0,
            "vISS": obj.vISSQN ?? 0,
            "vPIS": 0,
            "vCOFINS": 0,
            "dCompet": this.formatData().split("T")[0],
            "vDeducao": 0,
            "vOutro": 0,
            "vDescIncond": 0,
            "vDescCond": 0,
            "vISSRet": 0,
            "cRegTrib": null
        }, obj);
    }
    tagProdImpostoDevol(index, obj) {
        throw "Não implementado!";
    }
    //["ICMSTot", "ISSQNtot", "retTrib", "ISTot", "IBSCBSTot", "vNFTot"]
    tagTotal(obj, force = false) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total == undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total = new Object();
        //Ignora o calculo auxiliar.
        if (force) {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total = obj;
            return obj;
        }
        //ICMSTot
        if (__classPrivateFieldGet(this, _Make_tagTotal, "f").ICMSTot !== undefined) {
            if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.ICMSTot == undefined)
                __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.ICMSTot = new Object();
            Object.keys(__classPrivateFieldGet(this, _Make_tagTotal, "f").ICMSTot).forEach(key => {
                __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.ICMSTot[key] = (__classPrivateFieldGet(this, _Make_tagTotal, "f").ICMSTot[key] * 1).toFixed(2);
            });
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.ICMSTot.vNF = (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.ICMSTot.vProd - __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.ICMSTot.vDesc).toFixed(2);
            if (obj?.ICMSTot != null) { // Substituir campos que deseja
                Object.keys(obj.ICMSTot).forEach(key => {
                    __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.ICMSTot[key] = obj.ICMSTot[key];
                });
            }
        }
        //ISSQNtot - Não implementado
        //retTrib - Não implementado
        //ISTot - Não implementado
        //IBSCBSTot
        if (__classPrivateFieldGet(this, _Make_tagTotal, "f").IBSCBSTot !== undefined) {
            if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.IBSCBSTot == undefined)
                __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.IBSCBSTot = {};
            Object.keys(__classPrivateFieldGet(this, _Make_tagTotal, "f").IBSCBSTot).forEach(key => {
                __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.IBSCBSTot[key] = __classPrivateFieldGet(this, _Make_tagTotal, "f").IBSCBSTot[key];
            });
            if (obj?.IBSCBSTot != null) { // Substituir campos que deseja
                Object.keys(obj.IBSCBSTot).forEach(key => {
                    __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.IBSCBSTot[key] = obj.IBSCBSTot[key];
                });
            }
        }
        //vNFTot
        if (__classPrivateFieldGet(this, _Make_tagTotal, "f").vNFTot !== undefined) {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.vNFTot = __classPrivateFieldGet(this, _Make_tagTotal, "f").vNFTot;
        }
        return __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total;
    }
    tagRetTrib(obj) {
        throw "Não implementado!";
    }
    tagTransp(obj) {
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.transp = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.transp[key] = obj[key];
        });
    }
    tagTransporta(obj) {
        throw "Não implementado!";
    }
    tagRetTransp(obj) {
        throw "Não implementado!";
    }
    tagVeicTransp(obj) {
        throw "Não implementado!";
    }
    tagReboque(obj) {
        throw "Não implementado!";
    }
    tagVagao(obj) {
        throw "Não implementado!";
    }
    tagBalsa(obj) {
        throw "Não implementado!";
    }
    tagVol(obj) {
        throw "Não implementado!";
    }
    tagLacres(obj) {
        throw "Não implementado!";
    }
    tagFat(obj) {
        throw "Não implementado!";
    }
    tagDup(obj) {
        throw "Não implementado!";
    }
    //tagpag()
    tagTroco(obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.pag === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.pag = {};
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.pag.vTroco = obj;
    }
    tagDetPag(obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.pag === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.pag = {};
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.pag.detPag = obj;
    }
    tagIntermed(obj) {
        throw "Não implementado!";
    }
    tagInfAdic(obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.infAdic === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.infAdic = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.infAdic[key] = obj[key];
        });
    }
    tagObsCont(obj) {
        throw "Não implementado!";
    }
    tagObsFisco(obj) {
        throw "Não implementado!";
    }
    tagProcRef(obj) {
        throw "Não implementado!";
    }
    tagExporta(obj) {
        throw "Não implementado!";
    }
    tagCompra(obj) {
        throw "Não implementado!";
    }
    tagCana(obj) {
        throw "Não implementado!";
    }
    tagforDia() {
    }
    tagdeduc() {
    }
    taginfNFeSupl() {
    }
    tagInfRespTec(obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.infRespTec === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.infRespTec = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.infRespTec[key] = obj[key];
        });
    }
    //Endereço para retirada
    tagRetiEnder(obj) {
        throw "Ainda não configurado!";
    }
    //Endereço para entrega
    tagEntrega(obj) {
        throw "Ainda não configurado!";
    }
    xml() {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe[`@Id`] == null)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe[`@Id`] = `NFe${__classPrivateFieldGet(this, _Make_instances, "m", _Make_gerarChaveNFe).call(this)}`;
        //Adicionar QrCode
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.mod * 1 == 65) {
            //Como ja temos cUF, vamos usar o extras.cUF2UF
            let tempUF = urlEventos(cUF2UF[__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.cUF], __classPrivateFieldGet(this, _Make_NFe, "f").infNFe['@versao']);
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFeSupl = {
                qrCode: tempUF.mod65[__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.tpAmb == 1 ? 'producao' : 'homologacao'].NFeConsultaQR, //Este não e o valor final, vamos utilizar apenas para carregar os dados que vão ser utlizados no make
                urlChave: tempUF.mod65[__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.tpAmb == 1 ? 'producao' : 'homologacao'].urlChave
            };
        }
        let tempBuild = new XMLBuilder({
            ignoreAttributes: false,
            attributeNamePrefix: "@"
        });
        return tempBuild.build({ NFe: __classPrivateFieldGet(this, _Make_NFe, "f") });
    }
}
_Make_NFe = new WeakMap(), _Make_tagTotal = new WeakMap(), _Make_instances = new WeakSet(), _Make_gerarChaveNFe = function _Make_gerarChaveNFe() {
    const chaveSemDV = `${__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.cUF}`.padStart(2, '0') + // Código da UF (2 dígitos)
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.dhEmi.substring(2, 4) + __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.dhEmi.substring(5, 7) + // Ano e Mês da emissão (AAMM, 4 dígitos)
        `${__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.emit.CNPJ}`.padStart(14, '0') + // CNPJ do emitente (14 dígitos)
        `${__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.mod}`.padStart(2, '0') + // Modelo da NF (2 dígitos)
        `${__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.serie}`.padStart(3, '0') + // Série da NF (3 dígitos)
        `${__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.nNF}`.padStart(9, '0') + // Número da NF (9 dígitos)
        `${__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.tpEmis}`.padStart(1, '0') + // Tipo de Emissão (1 dígito)
        `${__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.cNF}`.padStart(8, '0'); // Código Numérico da NF (8 dígitos)
    __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.cDV = __classPrivateFieldGet(this, _Make_instances, "m", _Make_calcularDigitoVerificador).call(this, chaveSemDV);
    return `${chaveSemDV}${__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.cDV}`;
}, _Make_calcularDigitoVerificador = function _Make_calcularDigitoVerificador(key) {
    if (key.length !== 43) {
        return '';
    }
    const multipliers = [2, 3, 4, 5, 6, 7, 8, 9];
    let iCount = 42;
    let weightedSum = 0;
    while (iCount >= 0) {
        for (let mCount = 0; mCount < 8 && iCount >= 0; mCount++) {
            const sub = parseInt(key[iCount], 10);
            weightedSum += sub * multipliers[mCount];
            iCount--;
        }
    }
    let vdigit = 11 - (weightedSum % 11);
    if (vdigit > 9) {
        vdigit = 0;
    }
    return vdigit.toString();
}, _Make_calICMSTot = function _Make_calICMSTot(obj) {
    if (__classPrivateFieldGet(this, _Make_tagTotal, "f").ICMSTot == undefined)
        __classPrivateFieldGet(this, _Make_tagTotal, "f").ICMSTot = {
            vBC: 0,
            vICMS: 0,
            vICMSDeson: 0,
            vFCPUFDest: 0,
            vICMSUFDest: 0,
            vICMSUFRemet: 0,
            vFCP: 0,
            vBCST: 0,
            vST: 0,
            vFCPST: 0,
            vFCPSTRet: 0,
            vProd: 0,
            vFrete: 0,
            vSeg: 0,
            vDesc: 0,
            vII: 0,
            vIPI: 0,
            vIPIDevol: 0,
            vPIS: 0,
            vCOFINS: 0,
            vOutro: 0,
            vNF: 0,
            vTotTrib: 0
        };
    Object.keys(obj).map(key => {
        if (__classPrivateFieldGet(this, _Make_tagTotal, "f").ICMSTot[key] !== undefined) {
            __classPrivateFieldGet(this, _Make_tagTotal, "f").ICMSTot[key] += (obj[key]) * 1;
        }
    });
}, _Make_mergeobject = function _Make_mergeobject(el1, el2, fixedScale) {
    // --- helpers locais (apenas dentro deste método) ---
    const isRecord = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
    const isDecimalLike = (v) => {
        if (typeof v === "number")
            return Number.isFinite(v);
        if (typeof v === "string")
            return /^-?\d+(?:\.\d+)?$/.test(v.trim());
        return false;
    };
    const decLen = (s) => (String(s).split(".")[1] || "").length;
    const addDecimalStrings = (a, b, scaleOverride) => {
        const sa = String(a).trim();
        const sb = String(b).trim();
        const scale = scaleOverride ?? Math.max(decLen(sa), decLen(sb));
        const toInt = (s) => {
            let neg = false;
            if (s.startsWith("-")) {
                neg = true;
                s = s.slice(1);
            }
            let [i = "0", f = ""] = s.split(".");
            f = f.padEnd(scale, "0").slice(0, scale);
            const bi = BigInt(((i.replace(/^0+(?=\d)/, "")) || "0") + f);
            return neg ? -bi : bi;
        };
        const fromInt = (bi) => {
            const neg = bi < 0n;
            let s = (neg ? -bi : bi).toString();
            if (scale > 0) {
                if (s.length <= scale)
                    s = "0".repeat(scale - s.length + 1) + s;
                s = s.slice(0, -scale) + "." + s.slice(-scale);
            }
            return (neg ? "-" : "") + s;
        };
        return fromInt(toInt(sa) + toInt(sb));
    };
    // --- regra: se el1 não for objeto simples, retorna el1 (prioridade) ---
    if (!isRecord(el1))
        return el1;
    const out = {};
    const k1 = Object.keys(el1 || {});
    const k2 = Object.keys(el2 || {});
    // 1) percorre chaves de el1 (preserva ordem do el1)
    for (const k of k1) {
        const v1 = el1[k];
        const hasV2 = Object.prototype.hasOwnProperty.call(el2 || {}, k);
        const v2 = hasV2 ? el2[k] : undefined;
        if (isRecord(v1)) {
            const sub2 = isRecord(v2) ? v2 : {};
            out[k] = __classPrivateFieldGet(this, _Make_instances, "m", _Make_mergeobject).call(this, v1, sub2, fixedScale);
        }
        else if (hasV2 && isDecimalLike(v1) && isDecimalLike(v2)) {
            out[k] = addDecimalStrings(v1, v2, fixedScale);
        }
        else {
            out[k] = v1; // mantém valor de el1
        }
    }
    // 2) acrescenta ao final as chaves que existem só em el2
    for (const k of k2) {
        if (!Object.prototype.hasOwnProperty.call(el1, k)) {
            out[k] = el2[k];
        }
    }
    return out;
};
export { Make };
export default { Make };
