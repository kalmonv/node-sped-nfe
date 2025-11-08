import { XMLBuilder } from "fast-xml-parser";
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
                //"@xmlns": "http://www.portalfiscal.inf.br/nfe",
            }
        };

    #tagTotal: Record<string, any> = {};

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

    //Referencimanto de NFe
    tagRefNFe(obj: string | string[]) {
        if (typeof this.#NFe.infNFe.ide.NFref == "undefined") {
            this.#NFe.infNFe.ide.NFref = new Array();
        }
        if (Array.isArray(obj)) { //Array de referenciamento de refNFe
            this.#NFe.infNFe.ide.NFref = obj.map(ref => ({ refNFe: `${ref}` }));
        } else { //String unica de refNFe
            this.#NFe.infNFe.ide.NFref.push({ refNFe: obj });
        }
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
        this.#NFe.infNFe.retirada = {};
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.retirada[key] = obj[key];
        });
    }

    tagAutXML(obj: any) {
        if (typeof this.#NFe.infNFe.autXML == "undefined") {
            this.#NFe.infNFe.autXML = new Array();
        }
        this.#NFe.infNFe.autXML.push(obj);
    }

    //tagprod
    async tagProd(obj: any) {
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
            this.#calICMSTot({
                ...obj[cont].prod,
                ...{
                    vNF: ((obj[cont].prod.vUnCom - (obj[cont].prod?.vDesc || 0)) * obj[cont].prod.qTrib).toFixed(2)
                }
            });
        }
        this.#NFe.infNFe.det = obj;
    }

    tagCreditoPresumidoProd(obj: any) {
        throw "não implementado!";
    }

    taginfAdProd(index: number, obj: any) {
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.det[index][key] = obj[key];
        });
    }

    tagCEST(obj: any) {
        throw "não implementado!";
    }

    tagRECOPI(obj: any) {
        throw "não implementado!";
    }

    tagDI(index: number, obj: any) {
        if (this.#NFe.infNFe.det[index].DI === undefined) this.#NFe.infNFe.det[index].DI = {};
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.det[index].DI[key] = obj[key];
        });

        //Adicionar ao imposto global
        this.#calICMSTot(obj);
    }

    tagAdi(index: number, obj: any) {
        if (this.#NFe.infNFe.det[index].DI === undefined) this.#NFe.infNFe.det[index].DI = {};
        if (this.#NFe.infNFe.det[index].DI.adi === undefined) this.#NFe.infNFe.det[index].DI.adi = {};

        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.det[index].DI.adi[key] = obj[key];
        });

        //Adicionar ao imposto global
        this.#calICMSTot(obj);
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

    tagProdICMS(index: number, obj: any) {
        if (this.#NFe.infNFe.det[index].imposto.ICMS === undefined) this.#NFe.infNFe.det[index].imposto.ICMS = {};
        let keyXML = "";
        switch (obj.CST) {
            case '00': keyXML = 'ICMS00'; break;
            case '10': keyXML = 'ICMS10'; break;
            case '20': keyXML = 'ICMS20'; break;
            case '30': keyXML = 'ICMS30'; break;
            case '40': case '41': case '50': keyXML = 'ICMS40'; break;
            case '51': keyXML = 'ICMS51'; break;
            case '60': keyXML = 'ICMS60'; break;
            case '70': keyXML = 'ICMS70'; break;
            case '90': keyXML = 'ICMS90'; break;
            default: throw new Error('CST inválido');
        }

        this.#NFe.infNFe.det[index].imposto.ICMS[keyXML] = {};
        Object.keys(obj).forEach(key => {
            if (!['orig', 'CST', 'modBC', 'modBCST', 'motDesICMS', 'motDesICMSST', 'cBenefRBC', 'indDeduzDeson', 'UFST'].includes(key))
                obj[key] = obj[key] == 0 ? "0.00" : obj[key];
            this.#NFe.infNFe.det[index].imposto.ICMS[keyXML][key] = obj[key];
        });
    }

    tagProdICMSPart(index: number, obj: any) {
        if (this.#NFe.infNFe.det[index].imposto.ICMS === undefined) this.#NFe.infNFe.det[index].imposto.ICMS = {};

        this.#NFe.infNFe.det[index].imposto.ICMS.ICMSPart = {};
        Object.keys(obj).forEach(key => {
            if (key != 'orig' && key != 'modBC')
                obj[key] = obj[key] == 0 ? "0.00" : obj[key];
            this.#NFe.infNFe.det[index].imposto.ICMS.ICMSPart[key] = obj[key];
        });

        //Calcular ICMSTot
        this.#calICMSTot(obj);
    }

    //
    tagProdICMSST(index: number, obj: any) {
        if (this.#NFe.infNFe.det[index].imposto.ICMS === undefined) this.#NFe.infNFe.det[index].imposto.ICMS = {};
        let CST = obj.CST;
        //delete obj.CST;

        this.#NFe.infNFe.det[index].imposto.ICMS[`ICMS${CST}`] = {};
        Object.keys(obj).forEach(key => {
            if (!["orig", "CSOSN", "modBC", "modBCST"].includes(key))
                obj[key] = obj[key] == 0 ? "0.00" : obj[key];
            this.#NFe.infNFe.det[index].imposto.ICMS[`ICMS${CST}`][key] = obj[key];
        });

        //Calcular ICMSTot
        this.#calICMSTot(obj);
    }

    //
    tagProdICMSSN(index: number, obj: any) {
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
            if (key != 'orig')
                obj[key] = obj[key] == 0 ? "0.00" : obj[key];
            this.#NFe.infNFe.det[index].imposto.ICMS[keyXML][key] = obj[key];
        });

        //Calcular ICMSTot
        this.#calICMSTot(obj);
    }


    tagProdICMSUFDest(index: number, obj: any) {
        if (this.#NFe.infNFe.det[index].imposto.ICMSUFDest === undefined) this.#NFe.infNFe.det[index].imposto.ICMSUFDest = {};

        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.det[index].imposto.ICMSUFDest[key] = obj[key] == 0 ? "0.00" : obj[key];
        });
        this.#calICMSTot?.(obj); // opcional
    }

    tagProdIPI(index: number, obj: any) {
        if (this.#NFe.infNFe.det[index].imposto.IPI === undefined)
            this.#NFe.infNFe.det[index].imposto.IPI = {};


        // Campo obrigatório na raiz do IPI
        this.#NFe.infNFe.det[index].imposto.IPI.cEnq = obj.cEnq;
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

        this.#NFe.infNFe.det[index].imposto.IPI[keyXML] = {};
        Object.keys(obj).forEach(key => {
            obj[key] = obj[key] == 0 ? "0.00" : obj[key];
            this.#NFe.infNFe.det[index].imposto.IPI[keyXML][key] = obj[key];
        });

        this.#calICMSTot(obj); // opcional se considerar IPI no total
    }


    tagProdII(index: number, obj: any) {
        if (this.#NFe.infNFe.det[index].imposto.II === undefined) this.#NFe.infNFe.det[index].imposto.II = {};
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.det[index].imposto.II[key] = obj[key];
        });
        this.#calICMSTot(obj);
    }

    tagProdPIS(index: number, obj: any) {
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

    tagProdPISST(index: number, obj: any) {
        if (this.#NFe.infNFe.det[index].imposto.PISST === undefined) this.#NFe.infNFe.det[index].imposto.PISST = {};

        this.#NFe.infNFe.det[index].imposto.PISST = {};
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.det[index].imposto.PISST[key] = obj[key];
        });


        //Calcular ICMSTot
        this.#calICMSTot(obj);
    }

    tagProdCOFINS(index: number, obj: any) {
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

    tagProdCOFINSST(index: number, obj: any) {
        if (this.#NFe.infNFe.det[index].imposto.COFINS === undefined) this.#NFe.infNFe.det[index].imposto.COFINS = {};

        this.#NFe.infNFe.det[index].imposto.COFINS.COFINSST = {};
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.det[index].imposto.PIS.COFINSST[key] = obj[key];
        });

        //Calcular ICMSTot
        this.#calICMSTot(obj);
    }


    //!FALTA
    tagProdIS(index: number, obj: any) {
        if (this.#NFe.infNFe.det[index].imposto === undefined)
            this.#NFe.infNFe.det[index].imposto = {};

        this.#NFe.infNFe.det[index].imposto.IS = {};
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.det[index].imposto.IS[key] = obj[key];
        });
    }

    tagProdIBSCBS(index: number, obj: any) {
        if (this.#NFe.infNFe.det[index].imposto.IBSCBS === undefined)
            this.#NFe.infNFe.det[index].imposto.IBSCBS = {};

        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.det[index].imposto.IBSCBS[key] = obj[key];
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

        this.#tagTotal.IBSCBSTot = this.#mergeobject(this.#tagTotal.IBSCBSTot ?? {}, temp);
    }

    tagProdISSQN(index: number, obj: any) {
        this.#NFe.infNFe.det[index].imposto.ISSQN = {};
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.det[index].imposto.ISSQN[key] = obj[key];
        });

        //Calcular ICMSTot
        //this.#calICMSTot(obj);
        this.#tagTotal.ISSQNtot = this.#mergeobject(this.#tagTotal.ISSQNtot ?? {
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

    tagProdImpostoDevol(index: number, obj: any) {
        throw "Não implementado!";
    }

    //["ICMSTot", "ISSQNtot", "retTrib", "ISTot", "IBSCBSTot", "vNFTot"]
    tagTotal(obj: any, force: boolean = false) {
        if (this.#NFe.infNFe.total == undefined)
            this.#NFe.infNFe.total = new Object();

        //Ignora o calculo auxiliar.
        if (force) {
            this.#NFe.infNFe.total = obj;
            return obj;
        }

        //ICMSTot
        if (this.#tagTotal.ICMSTot !== undefined) {
            if (this.#NFe.infNFe.total.ICMSTot == undefined)
                this.#NFe.infNFe.total.ICMSTot = new Object();

            Object.keys(this.#tagTotal.ICMSTot).forEach(key => {
                this.#NFe.infNFe.total.ICMSTot[key] = (this.#tagTotal.ICMSTot[key] * 1).toFixed(2);
            });

            this.#NFe.infNFe.total.ICMSTot.vNF = (this.#NFe.infNFe.total.ICMSTot.vProd - this.#NFe.infNFe.total.ICMSTot.vDesc).toFixed(2)

            if (obj?.ICMSTot != null) { // Substituir campos que deseja
                Object.keys(obj.ICMSTot).forEach(key => {
                    this.#NFe.infNFe.total.ICMSTot[key] = obj.ICMSTot[key];
                });
            }
        }

        //ISSQNtot - Não implementado
        //retTrib - Não implementado
        //ISTot - Não implementado

        //IBSCBSTot
        if (this.#tagTotal.IBSCBSTot !== undefined) {
            if (this.#NFe.infNFe.total.IBSCBSTot == undefined)
                this.#NFe.infNFe.total.IBSCBSTot = {};

            Object.keys(this.#tagTotal.IBSCBSTot).forEach(key => {
                this.#NFe.infNFe.total.IBSCBSTot[key] = this.#tagTotal.IBSCBSTot[key];
            });

            if (obj?.IBSCBSTot != null) { // Substituir campos que deseja
                Object.keys(obj.IBSCBSTot).forEach(key => {
                    this.#NFe.infNFe.total.IBSCBSTot[key] = obj.IBSCBSTot[key];
                });
            }
        }

        //vNFTot
        if (this.#tagTotal.vNFTot !== undefined) {
            this.#NFe.infNFe.total.vNFTot = this.#tagTotal.vNFTot;
        }

        return this.#NFe.infNFe.total;
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
        if (this.#NFe.infNFe.infAdic === undefined) this.#NFe.infNFe.infAdic = {};
        Object.keys(obj).forEach(key => {
            this.#NFe.infNFe.infAdic[key] = obj[key];
        });
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
            `${this.#NFe.infNFe.ide.cUF}`.padStart(2, '0') + // Código da UF (2 dígitos)
            this.#NFe.infNFe.ide.dhEmi.substring(2, 4) + this.#NFe.infNFe.ide.dhEmi.substring(5, 7) + // Ano e Mês da emissão (AAMM, 4 dígitos)
            `${this.#NFe.infNFe.emit.CNPJ}`.padStart(14, '0') + // CNPJ do emitente (14 dígitos)
            `${this.#NFe.infNFe.ide.mod}`.padStart(2, '0') + // Modelo da NF (2 dígitos)
            `${this.#NFe.infNFe.ide.serie}`.padStart(3, '0') + // Série da NF (3 dígitos)
            `${this.#NFe.infNFe.ide.nNF}`.padStart(9, '0') + // Número da NF (9 dígitos)
            `${this.#NFe.infNFe.ide.tpEmis}`.padStart(1, '0') + // Tipo de Emissão (1 dígito)
            `${this.#NFe.infNFe.ide.cNF}`.padStart(8, '0'); // Código Numérico da NF (8 dígitos)
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
        if (this.#NFe.infNFe.ide.mod * 1 == 65) {
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
        if (this.#tagTotal.ICMSTot == undefined)
            this.#tagTotal.ICMSTot = {
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
            }

        Object.keys(obj).map(key => {
            if (this.#tagTotal.ICMSTot[key] !== undefined) {
                this.#tagTotal.ICMSTot[key] += (obj[key]) * 1;
            }
        });
    }

    // ---- merge recursivo mantendo ordem de el1 ----
    #mergeobject<T1 extends Record<string, unknown>, T2 extends Record<string, unknown>>(
        el1: T1,
        el2: T2,
        fixedScale?: number
    ): T1 & T2 {
        // --- helpers locais (apenas dentro deste método) ---
        const isRecord = (v: unknown): v is Record<string, unknown> =>
            typeof v === "object" && v !== null && !Array.isArray(v);

        const isDecimalLike = (v: unknown): v is string | number => {
            if (typeof v === "number") return Number.isFinite(v);
            if (typeof v === "string") return /^-?\d+(?:\.\d+)?$/.test(v.trim());
            return false;
        };

        const decLen = (s: string) => (String(s).split(".")[1] || "").length;

        const addDecimalStrings = (
            a: string | number,
            b: string | number,
            scaleOverride?: number
        ): string => {
            const sa = String(a).trim();
            const sb = String(b).trim();
            const scale = scaleOverride ?? Math.max(decLen(sa), decLen(sb));

            const toInt = (s: string): bigint => {
                let neg = false;
                if (s.startsWith("-")) { neg = true; s = s.slice(1); }
                let [i = "0", f = ""] = s.split(".");
                f = f.padEnd(scale, "0").slice(0, scale);
                const bi = BigInt(((i.replace(/^0+(?=\d)/, "")) || "0") + f);
                return neg ? -bi : bi;
            };

            const fromInt = (bi: bigint): string => {
                const neg = bi < 0n;
                let s = (neg ? -bi : bi).toString();
                if (scale > 0) {
                    if (s.length <= scale) s = "0".repeat(scale - s.length + 1) + s;
                    s = s.slice(0, -scale) + "." + s.slice(-scale);
                }
                return (neg ? "-" : "") + s;
            };

            return fromInt(toInt(sa) + toInt(sb));
        };

        // --- regra: se el1 não for objeto simples, retorna el1 (prioridade) ---
        if (!isRecord(el1)) return el1 as T1 & T2;

        const out: Record<string, unknown> = {};
        const k1 = Object.keys(el1 || {});
        const k2 = Object.keys(el2 || {});

        // 1) percorre chaves de el1 (preserva ordem do el1)
        for (const k of k1) {
            const v1 = (el1 as Record<string, unknown>)[k];
            const hasV2 = Object.prototype.hasOwnProperty.call(el2 || {}, k);
            const v2 = hasV2 ? (el2 as Record<string, unknown>)[k] : undefined;

            if (isRecord(v1)) {
                const sub2 = isRecord(v2) ? v2 : {};
                out[k] = this.#mergeobject(
                    v1 as Record<string, unknown>,
                    sub2 as Record<string, unknown>,
                    fixedScale
                );
            } else if (hasV2 && isDecimalLike(v1) && isDecimalLike(v2)) {
                out[k] = addDecimalStrings(v1, v2, fixedScale);
            } else {
                out[k] = v1; // mantém valor de el1
            }
        }

        // 2) acrescenta ao final as chaves que existem só em el2
        for (const k of k2) {
            if (!Object.prototype.hasOwnProperty.call(el1, k)) {
                out[k] = (el2 as Record<string, unknown>)[k];
            }
        }

        return out as T1 & T2;
    }

}


export { Make }
export default { Make }