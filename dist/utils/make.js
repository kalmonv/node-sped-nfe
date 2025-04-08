var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Make_instances, _Make_NFe, _Make_ICMSTot, _Make_gerarChaveNFe, _Make_calcularDigitoVerificador, _Make_getInfoQRCodeByUF, _Make_calICMSTot;
import { XMLBuilder } from "fast-xml-parser";
//Classe da nota fiscal
class Make {
    constructor() {
        _Make_instances.add(this);
        _Make_NFe.set(this, {
            "@xmlns": "http://www.portalfiscal.inf.br/nfe",
            infNFe: {
                "@xmlns": "http://www.portalfiscal.inf.br/nfe",
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
    tagRefNFe(obj) {
        throw "Não implementado!";
    }
    tagRefNF(obj) {
        throw "Não implementado!";
    }
    tagRefNFP(obj) {
        throw "Não implementado!";
    }
    tagRefCTe(obj) {
        throw "Não implementado!";
    }
    tagRefECF(obj) {
        throw "Não implementado!";
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
        throw "não implementado!";
    }
    tagAutXML(obj) {
        throw "não implementado!";
    }
    //tagprod
    tagProd(obj) {
        //Abrir tag de imposto
        for (let cont = 0; cont < obj.length; cont++) {
            if (obj[cont]['@nItem'] === undefined) {
                obj[cont] = { '@nItem': cont + 1, prod: obj[cont], imposto: {} };
            }
            else {
                obj[cont] = { '@nItem': obj[cont]['@nItem'], prod: obj[cont], imposto: {} };
                delete obj[cont].prod['@nItem'];
            }
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
    taginfAdProd(obj) {
        throw "não implementado!";
    }
    tagCEST(obj) {
        throw "não implementado!";
    }
    tagRECOPI(obj) {
        throw "não implementado!";
    }
    tagAdi(obj) {
        throw "não implementado!";
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
        if (obj != null) {
            Object.keys(obj).forEach(key => {
                __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.ICMSTot[key] = obj[key];
            });
        }
        else {
            Object.keys(__classPrivateFieldGet(this, _Make_ICMSTot, "f")).forEach(key => {
                __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.ICMSTot[key] = (__classPrivateFieldGet(this, _Make_ICMSTot, "f")[key] * 1).toFixed(2);
            });
            __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.ICMSTot.vNF = (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.ICMSTot.vProd - __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.total.ICMSTot.vDesc).toFixed(2);
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
        throw "Não implementado!";
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
        if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.mod == 55) {
            /*this.#NFe.infNFeSupl = {
                qrCode: "",
                urlChave: ""
            }*/
        }
        let tempBuild = new XMLBuilder({
            ignoreAttributes: false,
            attributeNamePrefix: "@"
        });
        return tempBuild.build({ NFe: __classPrivateFieldGet(this, _Make_NFe, "f") });
    }
}
_Make_NFe = new WeakMap(), _Make_ICMSTot = new WeakMap(), _Make_instances = new WeakSet(), _Make_gerarChaveNFe = function _Make_gerarChaveNFe() {
    const chaveSemDV = __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.cUF.padStart(2, '0') + // Código da UF (2 dígitos)
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.dhEmi.substring(2, 4) + __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.dhEmi.substring(5, 7) + // Ano e Mês da emissão (AAMM, 4 dígitos)
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.emit.CNPJ.padStart(14, '0') + // CNPJ do emitente (14 dígitos)
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.mod.padStart(2, '0') + // Modelo da NF (2 dígitos)
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.serie.padStart(3, '0') + // Série da NF (3 dígitos)
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.nNF.padStart(9, '0') + // Número da NF (9 dígitos)
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.tpEmis.padStart(1, '0') + // Tipo de Emissão (1 dígito)
        __classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.cNF.padStart(8, '0'); // Código Numérico da NF (8 dígitos)
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
}, _Make_getInfoQRCodeByUF = function _Make_getInfoQRCodeByUF(uf, amb) {
    if (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.tpAmb) {
        switch (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.cUF) {
            case 'AC':
                return { urlChave: 'www.sefaznet.ac.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaznet.ac.gov.br/nfce/qrcode' };
            case 'AL':
                return { urlChave: 'www.sefaz.al.gov.br/nfce/consulta', urlQRCode: 'http://nfce.sefaz.al.gov.br/QRCode/consultarNFCe.jsp' };
            case 'AP':
                return { urlChave: 'www.sefaz.ap.gov.br/nfce/consulta', urlQRCode: 'https://www.sefaz.ap.gov.br/nfce/nfcep.php' };
            case 'AM':
                return { urlChave: 'www.sefaz.am.gov.br/nfce/consulta', urlQRCode: 'http://sistemas.sefaz.am.gov.br/nfceweb/consultarNFCe.jsp' };
            case 'BA':
                return { urlChave: 'www.sefaz.ba.gov.br/nfce/consulta', urlQRCode: 'http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx' };
            case 'CE':
                return { urlChave: 'www.sefaz.ce.gov.br/nfce/consulta', urlQRCode: 'http://nfce.sefaz.ce.gov.br/pages/ShowNFCe.html' };
            case 'DF':
                return { urlChave: 'www.fazenda.df.gov.br/nfce/consulta', urlQRCode: 'http://dec.fazenda.df.gov.br/ConsultarNFCe.aspx' };
            case 'ES':
                return { urlChave: 'www.sefaz.es.gov.br/nfce/consulta', urlQRCode: 'http://app.sefaz.es.gov.br/ConsultaNFCe/qrcode.aspx' };
            case 'GO':
                return { urlChave: 'www.sefaz.go.gov.br/nfce/consulta', urlQRCode: 'http://nfe.sefaz.go.gov.br/nfeweb/sites/nfce/danfeNFCe' };
            case 'MA':
                return { urlChave: 'www.sefaz.ma.gov.br/nfce/consulta', urlQRCode: 'http://www.nfce.sefaz.ma.gov.br/portal/consultarNFCe.jsp' };
            case 'MG':
                return { urlChave: 'http://nfce.fazenda.mg.gov.br/portalnfce', urlQRCode: 'https://nfce.fazenda.mg.gov.br/portalnfce/sistema/qrcode.xhtml' };
            case 'MS':
                return { urlChave: 'http://www.dfe.ms.gov.br/nfce/consulta', urlQRCode: 'http://www.dfe.ms.gov.br/nfce/qrcode' };
            case '51': //MT
                return { urlChave: 'http://www.sefaz.mt.gov.br/nfce/consultanfce', urlQRCode: 'http://www.sefaz.mt.gov.br/nfce/consultanfce' };
            case 'PA':
                return { urlChave: 'www.sefa.pa.gov.br/nfce/consulta', urlQRCode: 'https://appnfc.sefa.pa.gov.br/portal/view/consultas/nfce/nfceForm.seam' };
            case 'PB':
                return { urlChave: 'www.receita.pb.gov.br/nfce/consulta', urlQRCode: 'http://www.receita.pb.gov.br/nfce' };
            case 'PE':
                return { urlChave: 'nfce.sefaz.pe.gov.br/nfce/consulta', urlQRCode: 'http://nfce.sefaz.pe.gov.br/nfce-web/consultarNFCe' };
            case 'PI':
                return { urlChave: 'www.sefaz.pi.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.pi.gov.br/nfce/qrcode' };
            case 'PR':
                return { urlChave: 'http://www.fazenda.pr.gov.br/nfce/consulta', urlQRCode: 'http://www.fazenda.pr.gov.br/nfce/qrcode/' };
            case 'RJ':
                return { urlChave: 'www.fazenda.rj.gov.br/nfce/consulta', urlQRCode: 'http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode' };
            case 'RN':
                return { urlChave: 'www.set.rn.gov.br/nfce/consulta', urlQRCode: 'http://nfce.set.rn.gov.br/consultarNFCe.aspx' };
            case 'RO':
                return { urlChave: 'www.sefin.ro.gov.br/nfce/consulta', urlQRCode: 'http://www.nfce.sefin.ro.gov.br/consultanfce/consulta.jsp' };
            case 'RS':
                return { urlChave: 'www.sefaz.rs.gov.br/nfce/consulta', urlQRCode: 'https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx' };
            case 'RR':
                return { urlChave: 'www.sefaz.rr.gov.br/nfce/consulta', urlQRCode: 'https://www.sefaz.rr.gov.br/nfce/servlet/qrcode' };
            case 'SE':
                return { urlChave: 'http://www.nfce.se.gov.br/nfce/consulta', urlQRCode: 'http://www.nfce.se.gov.br/portal/consultarNFCe.jsp' };
            case 'SP':
                return { urlChave: 'https://www.nfce.fazenda.sp.gov.br/consulta', urlQRCode: 'https://www.nfce.fazenda.sp.gov.br/qrcode' };
            case 'TO':
                return { urlChave: 'www.sefaz.to.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.to.gov.br/nfce/qrcode' };
            default:
                throw new Error('URL do QRCode não encontrada pelo UF (' + uf + ') informado.');
        }
    }
    else {
        switch (__classPrivateFieldGet(this, _Make_NFe, "f").infNFe.ide.cUF) {
            case 'AC':
                return { urlChave: 'www.sefaznet.ac.gov.br/nfce/consulta', urlQRCode: 'http://hml.sefaznet.ac.gov.br/nfce/qrcode' };
            case 'AL':
                return { urlChave: 'www.sefaz.al.gov.br/nfce/consulta', urlQRCode: 'http://nfce.sefaz.al.gov.br/QRCode/consultarNFCe.jsp' };
            case 'AP':
                return { urlChave: 'www.sefaz.ap.gov.br/nfce/consulta', urlQRCode: 'https://www.sefaz.ap.gov.br/nfcehml/nfce.php' };
            case 'AM':
                return { urlChave: 'https://sistemas.sefaz.am.gov.br/nfceweb-hom/formConsulta.do', urlQRCode: 'https://sistemas.sefaz.am.gov.br/nfceweb-hom/consultarNFCe.jsp' };
            case 'BA':
                return { urlChave: 'http://hinternet.sefaz.ba.gov.br/nfce/consulta', urlQRCode: 'http://hnfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx' };
            case 'CE':
                return { urlChave: 'www.sefaz.ce.gov.br/nfce/consulta', urlQRCode: 'http://nfceh.sefaz.ce.gov.br/pages/ShowNFCe.html' };
            case 'DF':
                return { urlChave: 'www.fazenda.df.gov.br/nfce/consulta', urlQRCode: 'http://dec.fazenda.df.gov.br/ConsultarNFCe.aspx' };
            case 'ES':
                return { urlChave: 'www.sefaz.es.gov.br/nfce/consulta', urlQRCode: 'http://homologacao.sefaz.es.gov.br/ConsultaNFCe/qrcode.aspx' };
            case 'GO':
                return { urlChave: 'http://www.nfce.go.gov.br/post/ver/214413/consulta-nfc-e-homologacao', urlQRCode: 'http://homolog.sefaz.go.gov.br/nfeweb/sites/nfce/danfeNFCe' };
            case 'MA':
                return { urlChave: 'www.sefaz.ma.gov.br/nfce/consulta', urlQRCode: 'http://www.hom.nfce.sefaz.ma.gov.br/portal/consultarNFCe.jsp' };
            case 'MG':
                return { urlChave: 'http://hnfce.fazenda.mg.gov.br/portalnfce', urlQRCode: 'https://nfce.fazenda.mg.gov.br/portalnfce/sistema/qrcode.xhtml' };
            case 'MS':
                return { urlChave: 'http://www.dfe.ms.gov.br/nfce/consulta', urlQRCode: 'http://www.dfe.ms.gov.br/nfce/qrcode' };
            case '51': //MT
                return { urlChave: 'http://homologacao.sefaz.mt.gov.br/nfce/consultanfce', urlQRCode: 'http://homologacao.sefaz.mt.gov.br/nfce/consultanfce' };
            case 'PA':
                return { urlChave: 'www.sefa.pa.gov.br/nfce/consulta', urlQRCode: 'https://appnfc.sefa.pa.gov.br/portal-homologacao/view/consultas/nfce/nfceForm.seam' };
            case 'PB':
                return { urlChave: 'www.receita.pb.gov.br/nfcehom', urlQRCode: 'http://www.receita.pb.gov.br/nfcehom' };
            case 'PE':
                return { urlChave: 'nfce.sefaz.pe.gov.br/nfce/consulta', urlQRCode: 'http://nfcehomolog.sefaz.pe.gov.br/nfce-web/consultarNFCe' };
            case 'PI':
                return { urlChave: 'www.sefaz.pi.gov.br/nfce/consulta', urlQRCode: 'http://www.sefaz.pi.gov.br/nfce/qrcode' };
            case 'PR':
                return { urlChave: 'http://www.fazenda.pr.gov.br/nfce/consulta', urlQRCode: 'http://www.fazenda.pr.gov.br/nfce/qrcode/' };
            case 'RJ':
                return { urlChave: 'www.fazenda.rj.gov.br/nfce/consulta', urlQRCode: 'http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode' };
            case 'RN':
                return { urlChave: 'www.set.rn.gov.br/nfce/consulta', urlQRCode: 'http://hom.nfce.set.rn.gov.br/consultarNFCe.aspx' };
            case 'RO':
                return { urlChave: 'www.sefin.ro.gov.br/nfce/consulta', urlQRCode: 'http://www.nfce.sefin.ro.gov.br/consultanfce/consulta.jsp' };
            case 'RS':
                return { urlChave: 'www.sefaz.rs.gov.br/nfce/consulta', urlQRCode: 'https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx' };
            case 'RR':
                return { urlChave: 'www.sefaz.rr.gov.br/nfce/consulta', urlQRCode: 'http://200.174.88.103:8080/nfce/servlet/qrcode' };
            case 'SE':
                return { urlChave: 'http://www.hom.nfe.se.gov.br/nfce/consulta', urlQRCode: 'http://www.hom.nfe.se.gov.br/portal/consultarNFCe.jsp' };
            case 'SP':
                return { urlChave: 'https://www.homologacao.nfce.fazenda.sp.gov.br/consulta', urlQRCode: 'https://www.homologacao.nfce.fazenda.sp.gov.br/qrcode' };
            case 'TO':
                return { urlChave: 'http://homologacao.sefaz.to.gov.br/nfce/consulta.jsf', urlQRCode: 'http://homologacao.sefaz.to.gov.br/nfce/qrcode' };
            default:
                throw new Error('URL do QRCode não encontrada pelo UF (' + uf + ') informado.');
        }
    }
}, _Make_calICMSTot = function _Make_calICMSTot(obj) {
    Object.keys(obj).map(key => {
        if (__classPrivateFieldGet(this, _Make_ICMSTot, "f")[key] !== undefined) {
            __classPrivateFieldGet(this, _Make_ICMSTot, "f")[key] += 1 * (obj[key]);
        }
    });
};
export { Make };
export default { Make };
