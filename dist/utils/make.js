var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Make_instances, _Make_NFe, _Make_ICMSTot, _Make_gerarChaveNFe, _Make_calcularDigitoVerificador, _Make_calICMSTot;
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
        _Make_ICMSTot.set(this, {
            vBC: 0,
            vICMS: 0,
            vICMSDeson: 0,
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
            vNF: 0
        });
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
            __classPrivateFieldGet(this, _Make_instances, "m", _Make_calICMSTot).call(this, obj[cont].prod);
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
        throw "não implementado!";
    }
    //
    tagProdICMSST(index, obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS = {};
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS.ICMSST = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS.ICMSST[key] = obj[key];
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
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ICMS[keyXML][key] = obj[key];
        });
        //Calcular ICMSTot
        __classPrivateFieldGet(this, _Make_instances, "m", _Make_calICMSTot).call(this, obj);
    }
    tagProdICMSUFDest(index, obj) {
        throw "Não implementado!";
    }
    tagProdIPI(index, obj) {
        throw "Não implementado!";
    }
    tagProdII(index, obj) {
        throw "Não implementado!";
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
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.PIS === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.PIS = {};
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.PIS.PISST = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.PIS.PISST[key] = obj[key];
        });
        //Calcular ICMSTot
        __classPrivateFieldGet(this, _Make_instances, "m", _Make_calICMSTot).call(this, obj);
    }
    tagProdCOFINS(index, obj) {
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.COFINS === undefined)
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.COFINS = {};
        let keyXML = null;
        switch (obj.CST) {
            case '01':
            case '02':
                keyXML = null;
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
        }
        if (keyXML == null) {
            Object.keys(obj).forEach(key => {
                __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.COFINS[key] = obj[key];
            });
        }
        else {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.COFINS[keyXML] = {};
            Object.keys(obj).forEach(key => {
                __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.COFINS[keyXML][key] = obj[key];
            });
        }
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
    tagProdISSQN(index, obj) {
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ISSQN = {};
        Object.keys(obj).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.det[index].imposto.ISSQN[key] = obj[key];
        });
        //Calcular ICMSTot
        __classPrivateFieldGet(this, _Make_instances, "m", _Make_calICMSTot).call(this, obj);
    }
    tagProdImpostoDevol(index, obj) {
        throw "Não implementado!";
    }
    tagICMSTot(obj = null) {
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total = {
            ICMSTot: {}
        };
        Object.keys(__classPrivateFieldGet(this, _Make_ICMSTot, "f")).forEach(key => {
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.ICMSTot[key] = (__classPrivateFieldGet(this, _Make_ICMSTot, "f")[key] * 1).toFixed(2);
        });
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.ICMSTot.vNF = (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.ICMSTot.vProd - __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.ICMSTot.vDesc).toFixed(2);
        if (obj != null) { // Substituir campos que deseja
            Object.keys(obj).forEach(key => {
                __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.ICMSTot[key] = obj[key];
            });
        }
    }
    tagISSQNTot(obj) {
        throw "Não implementado!";
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
_Make_NFe = new WeakMap(), _Make_ICMSTot = new WeakMap(), _Make_instances = new WeakSet(), _Make_gerarChaveNFe = function _Make_gerarChaveNFe() {
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
    Object.keys(obj).map(key => {
        if (__classPrivateFieldGet(this, _Make_ICMSTot, "f")[key] !== undefined) {
            __classPrivateFieldGet(this, _Make_ICMSTot, "f")[key] += (obj[key]) * 1;
        }
    });
};
export { Make };
export default { Make };
