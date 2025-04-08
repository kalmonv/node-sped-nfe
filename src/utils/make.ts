
import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";

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
        throw "Não implementado!";
    }

    tagRefNF(obj: any) {
        throw "Não implementado!";
    }

    tagRefNFP(obj: any) {
        throw "Não implementado!";
    }

    tagRefCTe(obj: any) {
        throw "Não implementado!";
    }

    tagRefECF(obj: any) {
        throw "Não implementado!";
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
        if (this.#NFe.infNFe.ide.mod == 55) {
            /*this.#NFe.infNFeSupl = {
                qrCode: "",
                urlChave: ""
            }*/
        }

        let tempBuild = new XMLBuilder({
            ignoreAttributes: false,
            attributeNamePrefix: "@"
        });
        return tempBuild.build({ NFe: this.#NFe });
    }

    #getInfoQRCodeByUF(uf: any, amb: any) {
        if (this.#NFe.infNFe.ide.tpAmb) {
            switch (this.#NFe.infNFe.ide.cUF) {
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
            switch (this.#NFe.infNFe.ide.cUF) {
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
    }

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