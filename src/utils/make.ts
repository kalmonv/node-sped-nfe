
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
import { urlEventos } from "./eventos.js"
import { cUF2UF } from "./extras.js"

//Classe da nota fiscal
class Make {
    #NFe: {
        [key: string]: any;
        infNFe: { [key: string]: any }
    } = {
            "@xmlns": "http://www.portalfiscal.inf.br/nfe",
            infNFe: {
                "@xmlns": "http://www.portalfiscal.inf.br/nfe",
            }
        };
    #ICMSTot: Record<string, number> = {
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
    };

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
    tagInfNFe(obj: any) {
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe[`@${key}`] = obj[key];
        });
    }

    tagIde(obj: any) {
        this.#NFe.infNFe.ide = new Object();
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.ide[key] = obj[key];
        });
    }

    tagRefNFe(obj: any) {
        if (typeof this.#NFe.infNFe.ide.NFref == "undefined") {
            this.#NFe.infNFe.ide.NFref = new Array();
        }
        this.#NFe.infNFe.ide.NFref.push({ refNFe: obj });
    }

    tagRefNF(obj: any) {
        if (typeof this.#NFe.infNFe.ide.NFref == "undefined") {
            this.#NFe.infNFe.ide.NFref = new Array();
        }
        this.#NFe.infNFe.ide.NFref.push({ refNF: obj });
    }

    tagRefNFP(obj: any) {
        if (typeof this.#NFe.infNFe.ide.NFref == "undefined") {
            this.#NFe.infNFe.ide.NFref = new Array();
        }
        this.#NFe.infNFe.ide.NFref.push({ refNFP: obj });
    }

    tagRefCTe(obj: any) {
        if (typeof this.#NFe.infNFe.ide.NFref == "undefined") {
            this.#NFe.infNFe.ide.NFref = new Array();
        }
        this.#NFe.infNFe.ide.NFref.push({ refCTe: obj });
    }

    tagRefECF(obj: any) {
        if (typeof this.#NFe.infNFe.ide.NFref == "undefined") {
            this.#NFe.infNFe.ide.NFref = new Array();
        }
        this.#NFe.infNFe.ide.NFref.push({ refECF: obj });
    }

    tagEmit(obj: any) {
        this.#NFe.infNFe.emit = new Object();
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.emit[key] = obj[key];
            if (key == "xFant") {
                this.#NFe.infNFe.emit.enderEmit = {};
            }
        });
    }

    tagEnderEmit(obj: any) {
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.emit.enderEmit[key] = obj[key];
        });
    }

    tagDest(obj: any) {
        this.#NFe.infNFe.dest = {};
        if (this.#NFe.infNFe.ide.tpAmb == 2 && obj['xNome'] !== undefined) obj['xNome'] = "NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL";
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.dest[key] = obj[key];
            if (key == "xNome" && this.#NFe.infNFe.ide.mod == 55) {
                this.#NFe.infNFe.dest.enderDest = {};
            }
        });
    }

    tagEnderDest(obj: any) {
        if (this.#NFe.infNFe.ide.mod == 65) return 1;

        this.#NFe.infNFe.dest.enderDest = {};
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.dest.enderDest[key] = obj[key];
        });
    }

    tagRetirada(obj: any) {
        throw "não implementado!";
    }

    tagAutXML(obj: any) {
        throw "não implementado!";
    }

    //tagprod
    tagProd(obj: any) {
        //Abrir tag de imposto
        for (let cont = 0; cont < obj.length; cont++) {

            if (obj[cont]['@nItem'] === undefined) {
                obj[cont] = { '@nItem': cont + 1, prod: obj[cont], imposto: {} };
            } else {
                obj[cont] = { '@nItem': obj[cont]['@nItem'], prod: obj[cont], imposto: {} };
                delete obj[cont].prod['@nItem'];
            }

            //Primeiro item + NFCe + Homologação
            if (cont == 0 && this.#NFe.infNFe.ide.mod == 65 && this.#NFe.infNFe.ide.tpAmb == 2) obj[cont].prod.xProd = "NOTA FISCAL EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL";

            obj[cont].prod.qCom = (obj[cont].prod.qCom * 1).toFixed(4)
            obj[cont].prod.vUnCom = (obj[cont].prod.vUnCom * 1).toFixed(10)
            obj[cont].prod.vProd = (obj[cont].prod.vProd * 1).toFixed(2)

            if (obj[cont].prod.vDesc !== undefined) obj[cont].prod.vDesc = (obj[cont].prod.vDesc * 1).toFixed(2)

            obj[cont].prod.qTrib = (obj[cont].prod.qTrib * 1).toFixed(4)
            obj[cont].prod.vUnTrib = (obj[cont].prod.vUnTrib * 1).toFixed(10)
            //Calcular ICMSTot
            this.#calICMSTot(obj[cont].prod);
        }
        this.#NFe.infNFe.det = obj;
    }

    tagCreditoPresumidoProd(obj: any) {
        throw "não implementado!";
    }

    taginfAdProd(obj: any) {
        throw "não implementado!";
    }

    tagCEST(obj: any) {
        throw "não implementado!";
    }

    tagRECOPI(obj: any) {
        throw "não implementado!";
    }

    tagAdi(obj: any) {
        throw "não implementado!";
    }

    tagDetExport(obj: any) {
        throw "não implementado!";
    }

    tagDetExportInd(obj: any) {
        throw "não implementado!";
    }

    tagRastro(obj: any) {
        throw "não implementado!";
    }

    tagVeicProd(obj: any) {
        throw "não implementado!";
    }

    tagMed(obj: any) {
        throw "não implementado!";
    }

    tagArma(obj: any) {
        throw "não implementado!";
    }

    tagComb(obj: any) {
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

    tagProdICMS(index: any, obj: any) {
        throw "não implementado!";
    }

    //
    tagProdICMSST(index: any, obj: any) {
        if (this.#NFe.infNFe.det[index].imposto.ICMS === undefined) this.#NFe.infNFe.det[index].imposto.ICMS = {};

        this.#NFe.infNFe.det[index].imposto.ICMS.ICMSST = {};
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.det[index].imposto.ICMS.ICMSST[key] = obj[key];
        });

        //Calcular ICMSTot
        this.#calICMSTot(obj);
    }

    //
    tagProdICMSSN(index: any, obj: any) {
        if (this.#NFe.infNFe.det[index].imposto.ICMS === undefined) this.#NFe.infNFe.det[index].imposto.ICMS = {};

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
        this.#NFe.infNFe.det[index].imposto.ICMS[keyXML] = {};
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.det[index].imposto.ICMS[keyXML][key] = obj[key];
        });

        //Calcular ICMSTot
        this.#calICMSTot(obj);
    }


    tagProdICMSUFDest(index: any, obj: any) {
        throw "Não implementado!";
    }

    tagProdIPI(index: any, obj: any) {
        throw "Não implementado!";
    }

    tagProdII(index: any, obj: any) {
        throw "Não implementado!";
    }

    tagProdPIS(index: any, obj: any) {
        if (this.#NFe.infNFe.det[index].imposto.PIS === undefined) this.#NFe.infNFe.det[index].imposto.PIS = {};

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
        this.#NFe.infNFe.det[index].imposto.PIS[keyXML] = {};
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.det[index].imposto.PIS[keyXML][key] = obj[key];
        });

        //Calcular ICMSTot
        this.#calICMSTot(obj);
    }

    tagProdPISST(index: any, obj: any) {
        if (this.#NFe.infNFe.det[index].imposto.PIS === undefined) this.#NFe.infNFe.det[index].imposto.PIS = {};

        this.#NFe.infNFe.det[index].imposto.PIS.PISST = {};
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.det[index].imposto.PIS.PISST[key] = obj[key];
        });


        //Calcular ICMSTot
        this.#calICMSTot(obj);
    }

    tagProdCOFINS(index: any, obj: any) {
        if (this.#NFe.infNFe.det[index].imposto.COFINS === undefined) this.#NFe.infNFe.det[index].imposto.COFINS = {};

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
                this.#NFe.infNFe.det[index].imposto.COFINS[key] = obj[key];
            });
        } else {
            this.#NFe.infNFe.det[index].imposto.COFINS[keyXML] = {};
            Object.keys(obj).forEach(key => {
                this.#NFe.infNFe.det[index].imposto.COFINS[keyXML][key] = obj[key];
            });
        }

        //Calcular ICMSTot
        this.#calICMSTot(obj);
    }

    tagProdCOFINSST(index: any, obj: any) {
        if (this.#NFe.infNFe.det[index].imposto.COFINS === undefined) this.#NFe.infNFe.det[index].imposto.COFINS = {};

        this.#NFe.infNFe.det[index].imposto.COFINS.COFINSST = {};
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.det[index].imposto.PIS.COFINSST[key] = obj[key];
        });

        //Calcular ICMSTot
        this.#calICMSTot(obj);
    }

    tagProdISSQN(index: any, obj: any) {
        this.#NFe.infNFe.det[index].imposto.ISSQN = {};
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.det[index].imposto.ISSQN[key] = obj[key];
        });

        //Calcular ICMSTot
        this.#calICMSTot(obj);
    }

    tagProdImpostoDevol(index: any, obj: any) {
        throw "Não implementado!";
    }

    tagICMSTot(obj = null) {
        this.#NFe.infNFe.total = {
            ICMSTot: {}
        };
        if (obj != null) {
            Object.keys(obj).forEach(key => {
                this.#NFe.infNFe.total.ICMSTot[key] = obj[key];
            });
        } else {
            Object.keys(this.#ICMSTot).forEach(key => {
                this.#NFe.infNFe.total.ICMSTot[key] = (this.#ICMSTot[key] * 1).toFixed(2);
            });
            this.#NFe.infNFe.total.ICMSTot.vNF = (this.#NFe.infNFe.total.ICMSTot.vProd - this.#NFe.infNFe.total.ICMSTot.vDesc).toFixed(2)
        }
    }

    tagISSQNTot(obj: any) {
        throw "Não implementado!";
    }

    tagRetTrib(obj: any) {
        throw "Não implementado!";
    }


    tagTransp(obj: any) {
        this.#NFe.infNFe.transp = {};
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.transp[key] = obj[key];
        });
    }

    tagTransporta(obj: any) {
        throw "Não implementado!";
    }

    tagRetTransp(obj: any) {
        throw "Não implementado!";
    }

    tagVeicTransp(obj: any) {
        throw "Não implementado!";
    }

    tagReboque(obj: any) {
        throw "Não implementado!";
    }

    tagVagao(obj: any) {
        throw "Não implementado!";
    }

    tagBalsa(obj: any) {
        throw "Não implementado!";
    }

    tagVol(obj: any) {
        throw "Não implementado!";
    }

    tagLacres(obj: any) {
        throw "Não implementado!";
    }

    tagFat(obj: any) {
        throw "Não implementado!";
    }

    tagDup(obj: any) {
        throw "Não implementado!";
    }

    //tagpag()
    tagTroco(obj: any) {
        if (this.#NFe.infNFe.pag === undefined) this.#NFe.infNFe.pag = {};
        this.#NFe.infNFe.pag.vTroco = obj;
    }

    tagDetPag(obj: any) {
        if (this.#NFe.infNFe.pag === undefined) this.#NFe.infNFe.pag = {};
        this.#NFe.infNFe.pag.detPag = obj;
    }

    tagIntermed(obj: any) {
        throw "Não implementado!";
    }

    tagInfAdic(obj: any) {
        throw "Não implementado!";
    }

    tagObsCont(obj: any) {
        throw "Não implementado!";
    }

    tagObsFisco(obj: any) {
        throw "Não implementado!";
    }

    tagProcRef(obj: any) {
        throw "Não implementado!";
    }

    tagExporta(obj: any) {
        throw "Não implementado!";
    }

    tagCompra(obj: any) {
        throw "Não implementado!";
    }

    tagCana(obj: any) {
        throw "Não implementado!";
    }

    tagforDia() {

    }

    tagdeduc() {

    }

    taginfNFeSupl() {

    }

    tagInfRespTec(obj: any) {
        if (this.#NFe.infNFe.infRespTec === undefined) this.#NFe.infNFe.infRespTec = {};
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.infRespTec[key] = obj[key];
        });
    }



    //Endereço para retirada
    tagRetiEnder(obj: any) {
        throw "Ainda não configurado!";
    }

    //Endereço para entrega
    tagEntrega(obj: any) {
        throw "Ainda não configurado!";
    }

    //Sistema gera a chave da nota fiscal
    #gerarChaveNFe() {
        const chaveSemDV =
            this.#NFe.infNFe.ide.cUF.padStart(2, '0') + // Código da UF (2 dígitos)
            this.#NFe.infNFe.ide.dhEmi.substring(2, 4) + this.#NFe.infNFe.ide.dhEmi.substring(5, 7) + // Ano e Mês da emissão (AAMM, 4 dígitos)
            this.#NFe.infNFe.emit.CNPJ.padStart(14, '0') + // CNPJ do emitente (14 dígitos)
            this.#NFe.infNFe.ide.mod.padStart(2, '0') + // Modelo da NF (2 dígitos)
            this.#NFe.infNFe.ide.serie.padStart(3, '0') + // Série da NF (3 dígitos)
            this.#NFe.infNFe.ide.nNF.padStart(9, '0') + // Número da NF (9 dígitos)
            this.#NFe.infNFe.ide.tpEmis.padStart(1, '0') + // Tipo de Emissão (1 dígito)
            this.#NFe.infNFe.ide.cNF.padStart(8, '0'); // Código Numérico da NF (8 dígitos)
        this.#NFe.infNFe.ide.cDV = this.#calcularDigitoVerificador(chaveSemDV)
        return `${chaveSemDV}${this.#NFe.infNFe.ide.cDV}`;

    }

    #calcularDigitoVerificador(key: any) {
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
    }

    xml() {
        if (this.#NFe.infNFe[`@Id`] == null) this.#NFe.infNFe[`@Id`] = `NFe${this.#gerarChaveNFe()}`;

        //Adicionar QrCode
        if (this.#NFe.infNFe.ide.mod == 65) {
            //Como ja temos cUF, vamos usar o extras.cUF2UF
            let tempUF = urlEventos(cUF2UF[this.#NFe.infNFe.ide.cUF], this.#NFe.infNFe['@versao']);
            this.#NFe.infNFeSupl = {
                qrCode: tempUF.mod65[this.#NFe.infNFe.ide.tpAmb == 1 ? 'producao' : 'homologacao'].NFeConsultaQR, //Este não e o valor final, vamos utilizar apenas para carregar os dados que vão ser utlizados no make
                urlChave: tempUF.mod65[this.#NFe.infNFe.ide.tpAmb == 1 ? 'producao' : 'homologacao'].urlChave
            }
        }

        let tempBuild = new XMLBuilder({
            ignoreAttributes: false,
            attributeNamePrefix: "@"
        });
        return tempBuild.build({ NFe: this.#NFe });
    }

    //Obtem os dados de importo e soma no total, utlizado sempre que for setado algum imposto.
    #calICMSTot(obj: any) {
        Object.keys(obj).map(key => {
            if (this.#ICMSTot[key] !== undefined) {
                this.#ICMSTot[key] += 1 * (obj[key]);
            }
        });

    }
}


export { Make }
export default { Make }