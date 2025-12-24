/*
    NFe Producao: https://www.nfe.fazenda.gov.br/portal/webservices.aspx
    NFe Homologacao: https://hom.nfe.fazenda.gov.br/portal/webServices.aspx
*/
import event55 from "./webservices/mod55"
import event65 from "./webservices/mod65"

function urlEventos(UF: string, versao: string): any {
    switch (`${versao}`) {
        case "4.00":
            return {
                mod65: event65.eventos(UF),
                mod55: event55.eventos(UF)
            }
        default:
            throw `Versão incompativel! Tools({...versao:${versao}})`;
            break;
    }
}

const urlEventos400: { [key: string]: any } = {
    "AM": {
        "mod55": {
            "homologacao": {
                "NFeStatusServico": "https://homnfe.sefaz.am.gov.br/services2/services/NfeStatusServico4",
                "NFeAutorizacao": "https://homnfe.sefaz.am.gov.br/services2/services/NfeAutorizacao4",
                "NFeConsultaProtocolo": "https://homnfe.sefaz.am.gov.br/services2/services/NfeConsulta4",
                "NFeInutilizacao": "https://homnfe.sefaz.am.gov.br/services2/services/NfeInutilizacao4",
                "NFeRetAutorizacao": "https://homnfe.sefaz.am.gov.br/services2/services/NfeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://homnfe.sefaz.am.gov.br/services2/services/RecepcaoEvento4",
                "NFeConsultaCadastro": ""
            },
            "producao": {
                "NFeStatusServico": "https://nfe.sefaz.am.gov.br/services2/services/NfeStatusServico4",
                "NFeAutorizacao": "https://nfe.sefaz.am.gov.br/services2/services/NfeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfe.sefaz.am.gov.br/services2/services/NfeConsulta4",
                "NFeInutilizacao": "https://nfe.sefaz.am.gov.br/services2/services/NfeInutilizacao4",
                "NFeRetAutorizacao": "https://nfe.sefaz.am.gov.br/services2/services/NfeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfe.sefaz.am.gov.br/services2/services/RecepcaoEvento4",
                "NFeConsultaCadastro": ""
            }
        },
        "mod65": {
            "homologacao": {
                "NFeAutorizacao": "https://homnfce.sefaz.am.gov.br/nfce-services/services/NfeAutorizacao4",
                "NFeRetAutorizacao": "https://homnfce.sefaz.am.gov.br/nfce-services/services/NfeRetAutorizacao4",
                "NFeInutilizacao": "https://homnfce.sefaz.am.gov.br/nfce-services/services/NfeInutilizacao4",
                "NFeConsultaProtocolo": "https://homnfce.sefaz.am.gov.br/nfce-services/services/NfeConsulta4",
                "NFeStatusServico": "https://homnfce.sefaz.am.gov.br/nfce-services/services/NfeStatusServico4",
                "NFeRecepcaoEvento": "https://homnfce.sefaz.am.gov.br/nfce-services/services/RecepcaoEvento4",
                "NFeConsultaQR": "https://sistemas.sefaz.am.gov.br/nfceweb-hom/consultarNFCe.jsp",
                "CscNFCe": "https://homnfce.sefaz.am.gov.br/nfce-services/services/CscNFCe",
                "urlChave": "www.sefaz.am.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeAutorizacao": "https://nfce.sefaz.am.gov.br/nfce-services/services/NfeAutorizacao4",
                "NFeRetAutorizacao": "https://nfce.sefaz.am.gov.br/nfce-services/services/NfeRetAutorizacao4",
                "NFeInutilizacao": "https://nfce.sefaz.am.gov.br/nfce-services/services/NfeInutilizacao4",
                "NFeConsultaProtocolo": "https://nfce.sefaz.am.gov.br/nfce-services/services/NfeConsulta4",
                "NFeStatusServico": "https://nfce.sefaz.am.gov.br/nfce-services/services/NfeStatusServico4",
                "NFeRecepcaoEvento": "https://nfce.sefaz.am.gov.br/nfce-services/services/RecepcaoEvento4",
                "NFeConsultaQR": "https://sistemas.sefaz.am.gov.br/nfceweb/consultarNFCe.jsp",
                "CscNFCe": "https://nfce.sefaz.am.gov.br/nfce-services/services/CscNFCe",
                "urlChave": "www.sefaz.am.gov.br/nfce/consulta"
            }
        }
    },
    "AN": {
        "mod55": {
            "homologacao": {
                "NFeRecepcaoEvento": "https://hom1.nfe.fazenda.gov.br/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx",
                "NFeDistribuicaoDFe": "https://hom1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx",
                "NFeConsultaDest": "https://hom.nfe.fazenda.gov.br/NFeConsultaDest/NFeConsultaDest.asmx",
                "NFeDownloadNF": "https://hom.nfe.fazenda.gov.br/NfeDownloadNF/NfeDownloadNF.asmx",
                "RecepcaoEPEC": "https://hom.nfe.fazenda.gov.br/RecepcaoEvento/RecepcaoEvento.asmx"
            },
            "producao": {
                "NFeRecepcaoEvento": "https://www.nfe.fazenda.gov.br/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx",
                "NFeDistribuicaoDFe": "https://www1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx",
                "NFeConsultaDest": "https://www.nfe.fazenda.gov.br/NFeConsultaDest/NFeConsultaDest.asmx",
                "NFeDownloadNF": "https://www.nfe.fazenda.gov.br/NfeDownloadNF/NfeDownloadNF.asmx",
                "RecepcaoEPEC": "https://www.nfe.fazenda.gov.br/RecepcaoEvento/RecepcaoEvento.asmx"
            }
        }
    },
    "BA": {
        "mod55": {
            "homologacao": {
                "NFeStatusServico": "https://hnfe.sefaz.ba.gov.br/webservices/NFeStatusServico4/NFeStatusServico4.asmx",
                "NFeAutorizacao": "https://hnfe.sefaz.ba.gov.br/webservices/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://hnfe.sefaz.ba.gov.br/webservices/NFeConsultaProtocolo4/NFeConsultaProtocolo4.asmx",
                "NFeInutilizacao": "https://hnfe.sefaz.ba.gov.br/webservices/NFeInutilizacao4/NFeInutilizacao4.asmx",
                "NFeRetAutorizacao": "https://hnfe.sefaz.ba.gov.br/webservices/NFeRetAutorizacao4/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://hnfe.sefaz.ba.gov.br/webservices/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx",
                "NFeConsultaCadastro": "https://hnfe.sefaz.ba.gov.br/webservices/CadConsultaCadastro4/CadConsultaCadastro4.asmx"
            },
            "producao": {
                "NFeStatusServico": "https://nfe.sefaz.ba.gov.br/webservices/NFeStatusServico4/NFeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe.sefaz.ba.gov.br/webservices/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe.sefaz.ba.gov.br/webservices/NFeConsultaProtocolo4/NFeConsultaProtocolo4.asmx",
                "NFeInutilizacao": "https://nfe.sefaz.ba.gov.br/webservices/NFeInutilizacao4/NFeInutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe.sefaz.ba.gov.br/webservices/NFeRetAutorizacao4/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe.sefaz.ba.gov.br/webservices/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx",
                "NFeConsultaCadastro": "https://nfe.sefaz.ba.gov.br/webservices/CadConsultaCadastro4/CadConsultaCadastro4.asmx"
            }
        },
        "mod65": {
            "homologacao": {
                "NFeConsultaQR": "http://hnfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx",
                "urlChave": "http://www.sefaz.ba.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeConsultaQR": "http://nfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx",
                "urlChave": "http://www.sefaz.ba.gov.br/nfce/consulta"
            }
        }
    },
    "GO": {
        "mod55": {
            "homologacao": {
                "NFeStatusServico": "https://homolog.sefaz.go.gov.br/nfe/services/NFeStatusServico4",
                "NFeAutorizacao": "https://homolog.sefaz.go.gov.br/nfe/services/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://homolog.sefaz.go.gov.br/nfe/services/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://homolog.sefaz.go.gov.br/nfe/services/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://homolog.sefaz.go.gov.br/nfe/services/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://homolog.sefaz.go.gov.br/nfe/services/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://homolog.sefaz.go.gov.br/nfe/services/CadConsultaCadastro4"
            },
            "producao": {
                "NFeStatusServico": "https://nfe.sefaz.go.gov.br/nfe/services/NFeStatusServico4",
                "NFeAutorizacao": "https://nfe.sefaz.go.gov.br/nfe/services/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfe.sefaz.go.gov.br/nfe/services/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://nfe.sefaz.go.gov.br/nfe/services/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://nfe.sefaz.go.gov.br/nfe/services/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfe.sefaz.go.gov.br/nfe/services/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://nfe.sefaz.go.gov.br/nfe/services/CadConsultaCadastro4"
            }
        },
        "mod65": {
            "homologacao": {
                "NFeAutorizacao": "https://homolog.sefaz.go.gov.br/nfe/services/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://homolog.sefaz.go.gov.br/nfe/services/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://homolog.sefaz.go.gov.br/nfe/services/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://homolog.sefaz.go.gov.br/nfe/services/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://homolog.sefaz.go.gov.br/nfe/services/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://homolog.sefaz.go.gov.br/nfe/services/NFeRecepcaoEvento4",
                "CscNFCe": "https://homolog.sefaz.go.gov.br/nfe/services/v2/CscNFCe",
                "NFeConsultaQR": "https://nfewebhomolog.sefaz.go.gov.br/nfeweb/sites/nfce/danfeNFCe",
                "urlChave": "www.sefaz.go.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeAutorizacao": "https://nfe.sefaz.go.gov.br/nfe/services/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://nfe.sefaz.go.gov.br/nfe/services/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://nfe.sefaz.go.gov.br/nfe/services/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://nfe.sefaz.go.gov.br/nfe/services/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://nfe.sefaz.go.gov.br/nfe/services/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://nfe.sefaz.go.gov.br/nfe/services/NFeRecepcaoEvento4",
                "CscNFCe": "https://nfe.sefaz.go.gov.br/nfe/services/v2/CscNFCe",
                "NFeConsultaQR": "https://nfeweb.sefaz.go.gov.br/nfeweb/sites/nfce/danfeNFCe",
                "urlChave": "www.sefaz.go.gov.br/nfce/consulta"
            }
        }
    },
    "MG": {
        "mod55": {
            "homologacao": {
                "NFeStatusServico": "https://hnfe.fazenda.mg.gov.br/nfe2/services/NFeStatusServico4",
                "NFeAutorizacao": "https://hnfe.fazenda.mg.gov.br/nfe2/services/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://hnfe.fazenda.mg.gov.br/nfe2/services/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://hnfe.fazenda.mg.gov.br/nfe2/services/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://hnfe.fazenda.mg.gov.br/nfe2/services/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://hnfe.fazenda.mg.gov.br/nfe2/services/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://hnfe.fazenda.mg.gov.br/nfe2/services/CadConsultaCadastro4"
            },
            "producao": {
                "NFeStatusServico": "https://nfe.fazenda.mg.gov.br/nfe2/services/NFeStatusServico4",
                "NFeAutorizacao": "https://nfe.fazenda.mg.gov.br/nfe2/services/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfe.fazenda.mg.gov.br/nfe2/services/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://nfe.fazenda.mg.gov.br/nfe2/services/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://nfe.fazenda.mg.gov.br/nfe2/services/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfe.fazenda.mg.gov.br/nfe2/services/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://nfe.fazenda.mg.gov.br/nfe2/services/CadConsultaCadastro4"
            }
        },
        "mod65": {
            "homologacao": {
                "NFeAutorizacao": "https://hnfce.fazenda.mg.gov.br/nfce/services/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://hnfce.fazenda.mg.gov.br/nfce/services/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://hnfce.fazenda.mg.gov.br/nfce/services/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://hnfce.fazenda.mg.gov.br/nfce/services/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://hnfce.fazenda.mg.gov.br/nfce/services/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://hnfce.fazenda.mg.gov.br/nfce/services/NFeRecepcaoEvento4",
                "NFeConsultaQR": "https://portalsped.fazenda.mg.gov.br/portalnfce/sistema/qrcode.xhtml",
                "urlChave": "https://portalsped.fazenda.mg.gov.br/portalnfce"
            },
            "producao": {
                "NFeAutorizacao": "https://nfce.fazenda.mg.gov.br/nfce/services/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://nfce.fazenda.mg.gov.br/nfce/services/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://nfce.fazenda.mg.gov.br/nfce/services/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://nfce.fazenda.mg.gov.br/nfce/services/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://nfce.fazenda.mg.gov.br/nfce/services/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://nfce.fazenda.mg.gov.br/nfce/services/NFeRecepcaoEvento4",
                "NFeConsultaQR": "https://portalsped.fazenda.mg.gov.br/portalnfce/sistema/qrcode.xhtml",
                "urlChave": "https://portalsped.fazenda.mg.gov.br/portalnfce"
            }
        }
    },
    "MS": {
        "mod55": {
            "homologacao": {
                "NFeStatusServico": "https://hom.nfe.sefaz.ms.gov.br/ws/NFeStatusServico4",
                "NFeAutorizacao": "https://hom.nfe.sefaz.ms.gov.br/ws/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://hom.nfe.sefaz.ms.gov.br/ws/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://hom.nfe.sefaz.ms.gov.br/ws/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://hom.nfe.sefaz.ms.gov.br/ws/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://hom.nfe.sefaz.ms.gov.br/ws/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://hom.nfe.sefaz.ms.gov.br/ws/CadConsultaCadastro4"
            },
            "producao": {
                "NFeStatusServico": "https://nfe.sefaz.ms.gov.br/ws/NFeStatusServico4",
                "NFeAutorizacao": "https://nfe.sefaz.ms.gov.br/ws/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfe.sefaz.ms.gov.br/ws/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://nfe.sefaz.ms.gov.br/ws/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://nfe.sefaz.ms.gov.br/ws/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfe.sefaz.ms.gov.br/ws/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://nfe.sefaz.ms.gov.br/ws/CadConsultaCadastro4"
            }
        },
        "mod65": {
            "homologacao": {
                "NFeAutorizacao": "https://hom.nfce.sefaz.ms.gov.br/ws/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://hom.nfce.sefaz.ms.gov.br/ws/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://hom.nfce.sefaz.ms.gov.br/ws/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://hom.nfce.sefaz.ms.gov.br/ws/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://hom.nfce.sefaz.ms.gov.br/ws/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://hom.nfce.sefaz.ms.gov.br/ws/NFeRecepcaoEvento4",
                "NFeConsultaQR": "http://www.dfe.ms.gov.br/nfce/qrcode",
                "urlChave": "http://www.dfe.ms.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeAutorizacao": "https://nfce.sefaz.ms.gov.br/ws/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://nfce.sefaz.ms.gov.br/ws/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://nfce.sefaz.ms.gov.br/ws/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://nfce.sefaz.ms.gov.br/ws/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://nfce.sefaz.ms.gov.br/ws/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://nfce.sefaz.ms.gov.br/ws/NFeRecepcaoEvento4",
                "NFeConsultaQR": "http://www.dfe.ms.gov.br/nfce/qrcode",
                "urlChave": "http://www.dfe.ms.gov.br/nfce/consulta"
            }
        }
    },
    "MT": {
        "mod55": {
            "homologacao": {
                "NFeStatusServico": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/NfeStatusServico4",
                "NFeAutorizacao": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/NfeAutorizacao4",
                "NFeConsultaProtocolo": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/NfeConsulta4",
                "NFeInutilizacao": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/NfeInutilizacao4",
                "NFeRetAutorizacao": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/NfeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/RecepcaoEvento4",
                "NFeConsultaCadastro": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/CadConsultaCadastro4"
            },
            "producao": {
                "NFeStatusServico": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/NfeStatusServico4",
                "NFeAutorizacao": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/NfeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/NfeConsulta4",
                "NFeInutilizacao": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/NfeInutilizacao4",
                "NFeRetAutorizacao": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/NfeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/RecepcaoEvento4",
                "NFeConsultaCadastro": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/CadConsultaCadastro4"
            }
        },
        "mod65": {
            "homologacao": {
                "NFeAutorizacao": "https://homologacao.sefaz.mt.gov.br/nfcews/services/NfeAutorizacao4",
                "NFeRetAutorizacao": "https://homologacao.sefaz.mt.gov.br/nfcews/services/NfeRetAutorizacao4",
                "NFeInutilizacao": "https://homologacao.sefaz.mt.gov.br/nfcews/services/NfeInutilizacao4",
                "NFeConsultaProtocolo": "https://homologacao.sefaz.mt.gov.br/nfcews/services/NfeConsulta4",
                "NFeStatusServico": "https://homologacao.sefaz.mt.gov.br/nfcews/services/NfeStatusServico4",
                "NFeRecepcaoEvento": "https://homologacao.sefaz.mt.gov.br/nfcews/services/RecepcaoEvento4",
                "NFeConsultaQR": "http://homologacao.sefaz.mt.gov.br/nfce/consultanfce",
                "urlChave": "http://www.sefaz.mt.gov.br/nfce/consultanfce"
            },
            "producao": {
                "NFeAutorizacao": "https://nfce.sefaz.mt.gov.br/nfcews/services/NfeAutorizacao4",
                "NFeRetAutorizacao": "https://nfce.sefaz.mt.gov.br/nfcews/services/NfeRetAutorizacao4",
                "NFeInutilizacao": "https://nfce.sefaz.mt.gov.br/nfcews/services/NfeInutilizacao4",
                "NFeConsultaProtocolo": "https://nfce.sefaz.mt.gov.br/nfcews/services/NfeConsulta4",
                "NFeStatusServico": "https://nfce.sefaz.mt.gov.br/nfcews/services/NfeStatusServico4",
                "NFeRecepcaoEvento": "https://nfce.sefaz.mt.gov.br/nfcews/services/RecepcaoEvento4",
                "NFeConsultaQR": "http://www.sefaz.mt.gov.br/nfce/consultanfce",
                "urlChave": "http://www.sefaz.mt.gov.br/nfce/consultanfce"
            }
        }
    },
    "PE": {
        "mod55": {
            "homologacao": {
                "NFeStatusServico": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeStatusServico4",
                "NFeAutorizacao": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/CadConsultaCadastro4"
            },
            "producao": {
                "NFeStatusServico": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeStatusServico4",
                "NFeAutorizacao": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://nfe.sefaz.pe.gov.br/nfe-service/services/CadConsultaCadastro4"
            }
        },
        //Pelo que foi visto, utiliza as mesmas URL para modelo 65;
        "mod65": {
            "homologacao": {
                "NFeStatusServico": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeStatusServico4",
                "NFeAutorizacao": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/CadConsultaCadastro4",
                "NFeConsultaQR": "http://nfcehomolog.sefaz.pe.gov.br/nfce/consulta",
                "urlChave": "nfce.sefaz.pe.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeStatusServico": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeStatusServico4",
                "NFeAutorizacao": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://nfe.sefaz.pe.gov.br/nfe-service/services/CadConsultaCadastro4",
                "NFeConsultaQR": "http://nfce.sefaz.pe.gov.br/nfce/consulta",
                "urlChave": "nfce.sefaz.pe.gov.br/nfce/consulta"
            }
        }
    },
    "PR": {
        "mod55": {
            "homologacao": {
                "NFeStatusServico": "https://homologacao.nfe.sefa.pr.gov.br/nfe/NFeStatusServico4",
                "NFeAutorizacao": "https://homologacao.nfe.sefa.pr.gov.br/nfe/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://homologacao.nfe.sefa.pr.gov.br/nfe/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://homologacao.nfe.sefa.pr.gov.br/nfe/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://homologacao.nfe.sefa.pr.gov.br/nfe/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://homologacao.nfe.sefa.pr.gov.br/nfe/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://homologacao.nfe.sefa.pr.gov.br/nfe/CadConsultaCadastro4"
            },
            "producao": {
                "NFeStatusServico": "https://nfe.sefa.pr.gov.br/nfe/NFeStatusServico4",
                "NFeAutorizacao": "https://nfe.sefa.pr.gov.br/nfe/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfe.sefa.pr.gov.br/nfe/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://nfe.sefa.pr.gov.br/nfe/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://nfe.sefa.pr.gov.br/nfe/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfe.sefa.pr.gov.br/nfe/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://nfe.sefa.pr.gov.br/nfe/CadConsultaCadastro4"
            }
        },
        "mod65": {
            "homologacao": {
                "NFeAutorizacao": "https://homologacao.nfce.sefa.pr.gov.br/nfce/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://homologacao.nfce.sefa.pr.gov.br/nfce/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://homologacao.nfce.sefa.pr.gov.br/nfce/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://homologacao.nfce.sefa.pr.gov.br/nfce/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://homologacao.nfce.sefa.pr.gov.br/nfce/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://homologacao.nfce.sefa.pr.gov.br/nfce/NFeRecepcaoEvento4",
                "NFeConsultaQR": "http://www.fazenda.pr.gov.br/nfce/qrcode",
                "urlChave": "http://www.fazenda.pr.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeAutorizacao": "https://nfce.sefa.pr.gov.br/nfce/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://nfce.sefa.pr.gov.br/nfce/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://nfce.sefa.pr.gov.br/nfce/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://nfce.sefa.pr.gov.br/nfce/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://nfce.sefa.pr.gov.br/nfce/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://nfce.sefa.pr.gov.br/nfce/NFeRecepcaoEvento4",
                "NFeConsultaQR": "http://www.fazenda.pr.gov.br/nfce/qrcode",
                "urlChave": "http://www.fazenda.pr.gov.br/nfce/consulta"
            }
        }
    },
    "RS": {
        "mod55": {
            "homologacao": {
                "NFeStatusServico": "https://nfe-homologacao.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe-homologacao.sefazrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe-homologacao.sefazrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeInutilizacao": "https://nfe-homologacao.sefazrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe-homologacao.sefazrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe-homologacao.sefazrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            },
            "producao": {
                "NFeStatusServico": "https://nfe.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe.sefazrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe.sefazrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeInutilizacao": "https://nfe.sefazrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe.sefazrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe.sefazrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            }
        },
        "mod65": {
            "homologacao": {
                "NFeAutorizacao": "https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfce-homologacao.sefazrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeStatusServico": "https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeRecepcaoEvento": "https://nfce-homologacao.sefazrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaQR": "https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx",
                "urlChave": "www.sefaz.rs.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeAutorizacao": "https://nfce.sefazrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfce.sefazrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfce.sefazrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfce.sefazrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeStatusServico": "https://nfce.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeRecepcaoEvento": "https://nfce.sefazrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaQR": "https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx",
                "urlChave": "www.sefaz.rs.gov.br/nfce/consulta"
            }
        }
    },
    "SP": {
        "mod55": {
            "homologacao": {
                "NFeStatusServico": "https://homologacao.nfe.fazenda.sp.gov.br/ws/nfestatusservico4.asmx",
                "NFeAutorizacao": "https://homologacao.nfe.fazenda.sp.gov.br/ws/nfeautorizacao4.asmx",
                "NFeConsultaProtocolo": "https://homologacao.nfe.fazenda.sp.gov.br/ws/nfeconsultaprotocolo4.asmx",
                "NFeInutilizacao": "https://homologacao.nfe.fazenda.sp.gov.br/ws/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://homologacao.nfe.fazenda.sp.gov.br/ws/nferetautorizacao4.asmx",
                "NFeRecepcaoEvento": "https://homologacao.nfe.fazenda.sp.gov.br/ws/nferecepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://homologacao.nfe.fazenda.sp.gov.br/ws/cadconsultacadastro4.asmx"
            },
            "producao": {
                "NFeStatusServico": "https://nfe.fazenda.sp.gov.br/ws/nfestatusservico4.asmx",
                "NFeAutorizacao": "https://nfe.fazenda.sp.gov.br/ws/nfeautorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe.fazenda.sp.gov.br/ws/nfeconsultaprotocolo4.asmx",
                "NFeInutilizacao": "https://nfe.fazenda.sp.gov.br/ws/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe.fazenda.sp.gov.br/ws/nferetautorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe.fazenda.sp.gov.br/ws/nferecepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://nfe.fazenda.sp.gov.br/ws/cadconsultacadastro4.asmx"
            }
        },
        "mod65": {
            "homologacao": {
                "NFeAutorizacao": "https://homologacao.nfce.fazenda.sp.gov.br/ws/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://homologacao.nfce.fazenda.sp.gov.br/ws/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://homologacao.nfce.fazenda.sp.gov.br/ws/NFeInutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://homologacao.nfce.fazenda.sp.gov.br/ws/NFeConsultaProtocolo4.asmx",
                "NFeStatusServico": "https://homologacao.nfce.fazenda.sp.gov.br/ws/NFeStatusServico4.asmx",
                "NFeRecepcaoEvento": "https://homologacao.nfce.fazenda.sp.gov.br/ws/NFeRecepcaoEvento4.asmx",
                "RecepcaoEPEC": "https://homologacao.nfce.epec.fazenda.sp.gov.br/EPECws/RecepcaoEPEC.asmx",
                "EPECStatusServico": "https://homologacao.nfce.epec.fazenda.sp.gov.br/EPECws/EPECStatusServico.asmx",
                "NFeConsultaQR": "https://www.homologacao.nfce.fazenda.sp.gov.br/qrcode",
                "urlChave": "https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica"
            },
            "producao": {
                "NFeAutorizacao": "https://nfce.fazenda.sp.gov.br/ws/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfce.fazenda.sp.gov.br/ws/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfce.fazenda.sp.gov.br/ws/NFeInutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfce.fazenda.sp.gov.br/ws/NFeConsultaProtocolo4.asmx",
                "NFeStatusServico": "https://nfce.fazenda.sp.gov.br/ws/NFeStatusServico4.asmx",
                "NFeRecepcaoEvento": "https://nfce.fazenda.sp.gov.br/ws/NFeRecepcaoEvento4.asmx",
                "RecepcaoEPEC": "https://nfce.epec.fazenda.sp.gov.br/EPECws/RecepcaoEPEC.asmx",
                "EPECStatusServico": "https://nfce.epec.fazenda.sp.gov.br/EPECws/EPECStatusServico.asmx",
                "NFeConsultaQR": "https://www.nfce.fazenda.sp.gov.br/qrcode",
                "urlChave": "https://www.nfce.fazenda.sp.gov.br/NFCeConsultaPublica"
            }
        }
    },
    "SVAN": {
        "mod55": {
            "homologacao": {
                "NFeStatusServico": "https://hom.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx",
                "NFeAutorizacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://hom.sefazvirtual.fazenda.gov.br/NFeConsultaProtocolo4/NFeConsultaProtocolo4.asmx",
                "NFeInutilizacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeInutilizacao4/NFeInutilizacao4.asmx",
                "NFeRetAutorizacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeRetAutorizacao4/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://hom.sefazvirtual.fazenda.gov.br/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx",
                "NFeConsultaCadastro": ""
            },
            "producao": {
                "NFeStatusServico": "https://www.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx",
                "NFeAutorizacao": "https://www.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://www.sefazvirtual.fazenda.gov.br/NFeConsultaProtocolo4/NFeConsultaProtocolo4.asmx",
                "NFeInutilizacao": "https://www.sefazvirtual.fazenda.gov.br/NFeInutilizacao4/NFeInutilizacao4.asmx",
                "NFeRetAutorizacao": "https://www.sefazvirtual.fazenda.gov.br/NFeRetAutorizacao4/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://www.sefazvirtual.fazenda.gov.br/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx",
                "NFeConsultaCadastro": ""
            }
        }
    },
    "SVRS": {
        "mod55": {
            "homologacao": {
                "NFeStatusServico": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeInutilizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": ""
            },
            "producao": {
                "NFeStatusServico": "https://nfe.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeInutilizacao": "https://nfe.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            }
        },
        "mod65": {
            "homologacao": {
                "NFeAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeStatusServico": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeRecepcaoEvento": "https://nfce-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx"
            },
            "producao": {
                "NFeAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfce.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeStatusServico": "https://nfce.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeRecepcaoEvento": "https://nfce.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx"
            }
        }
    },
    "SVCAN": {
        "mod55": {
            "homologacao": {
                "NFeStatusServico": "https://hom.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx",
                "NFeAutorizacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://hom.sefazvirtual.fazenda.gov.br/NFeConsultaProtocolo4/NFeConsultaProtocolo4.asmx",
                "NFeInutilizacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeInutilizacao4/NFeInutilizacao4.asmx",
                "NFeRetAutorizacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeRetAutorizacao4/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://hom.sefazvirtual.fazenda.gov.br/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx",
                "NFeConsultaCadastro": ""
            },
            "producao": {
                "NFeStatusServico": "https://www.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx",
                "NFeAutorizacao": "https://www.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://www.sefazvirtual.fazenda.gov.br/NFeConsultaProtocolo4/NFeConsultaProtocolo4.asmx",
                "NFeInutilizacao": "https://www.sefazvirtual.fazenda.gov.br/NFeInutilizacao4/NFeInutilizacao4.asmx",
                "NFeRetAutorizacao": "https://www.sefazvirtual.fazenda.gov.br/NFeRetAutorizacao4/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://www.sefazvirtual.fazenda.gov.br/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx",
                "NFeConsultaCadastro": ""
            }
        }
    },
    "SVCRS": {
        "mod55": {
            "homologacao": {
                "NFeStatusServico": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeInutilizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": ""
            },
            "producao": {
                "NFeStatusServico": "https://nfe.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeInutilizacao": "https://nfe.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            }
        }
    },
    "AC": {
        "mod65": {
            "homologacao": {
                "NFeConsultaQR": "http://www.hml.sefaznet.ac.gov.br/nfce/qrcode",
                "urlChave": "www.sefaznet.ac.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeConsultaQR": "http://www.sefaznet.ac.gov.br/nfce/qrcode",
                "urlChave": "www.sefaznet.ac.gov.br/nfce/consulta"
            }
        }
    },
    "AL": {
        "mod65": {
            "homologacao": {
                "NFeConsultaQR": "http://nfce.sefaz.al.gov.br/QRCode/consultarNFCe.jsp",
                "urlChave": "www.sefaz.al.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeConsultaQR": "http://nfce.sefaz.al.gov.br/QRCode/consultarNFCe.jsp",
                "urlChave": "www.sefaz.al.gov.br/nfce/consulta"
            }
        }
    },
    "AP": {
        "mod55": {
            "homologacao": {
                "NFeStatusServico": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeInutilizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": ""
            },
            "producao": {
                "NFeStatusServico": "https://nfe.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeInutilizacao": "https://nfe.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            }
        },
        "mod65": {
            "homologacao": {
                "NFeAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeStatusServico": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeRecepcaoEvento": "https://nfce-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx"
            },
            "producao": {
                "NFeAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfce.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeStatusServico": "https://nfce.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeRecepcaoEvento": "https://nfce.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx"
            }
        }
    },
    "CE": {
        "mod65": {
            "homologacao": {
                "NFeConsultaQR": "http://nfceh.sefaz.ce.gov.br/pages/ShowNFCe.html",
                "urlChave": "www.sefaz.ce.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeConsultaQR": "http://nfce.sefaz.ce.gov.br/pages/ShowNFCe.html",
                "urlChave": "www.sefaz.ce.gov.br/nfce/consulta"
            }
        }
    },
    "ES": {
        "mod65": {
            "homologacao": {
                "NFeConsultaQR": "http://homologacao.sefaz.es.gov.br/ConsultaNFCe/qrcode.aspx",
                "urlChave": "www.sefaz.es.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeConsultaQR": "http://app.sefaz.es.gov.br/ConsultaNFCe/qrcode.aspx",
                "urlChave": "www.sefaz.es.gov.br/nfce/consulta"
            }
        }
    },
    "DF": {
        "mod65": {
            "homologacao": {
                "NFeConsultaQR": "http://dec.fazenda.df.gov.br/ConsultarNFCe.aspx",
                "urlChave": "www.fazenda.df.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeConsultaQR": "http://www.fazenda.df.gov.br/nfce/qrcode",
                "urlChave": "www.fazenda.df.gov.br/nfce/consulta"
            }
        }
    },
    "MA": {
        "mod65": {
            "homologacao": {
                "NFeConsultaQR": "http://www.hom.nfce.sefaz.ma.gov.br/portal/consultarNFCe.jsp",
                "urlChave": "www.sefaz.ma.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeConsultaQR": "http://www.nfce.sefaz.ma.gov.br/portal/consultarNFCe.jsp",
                "urlChave": "www.sefaz.ma.gov.br/nfce/consulta"
            }
        }
    },
    "PA": {
        "mod65": {
            "homologacao": {
                "NFeConsultaQR": "https://appnfc.sefa.pa.gov.br/portal-homologacao/view/consultas/nfce/nfceForm.seam",
                "urlChave": "www.sefa.pa.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeConsultaQR": "https://appnfc.sefa.pa.gov.br/portal/view/consultas/nfce/nfceForm.seam",
                "urlChave": "www.sefa.pa.gov.br/nfce/consulta"
            }
        }
    },
    "PB": {
        "mod65": {
            "homologacao": {
                "NFeConsultaQR": "http://www.sefaz.pb.gov.br/nfcehom",
                "urlChave": "www.sefaz.pb.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeConsultaQR": "http://www.sefaz.pb.gov.br/nfce",
                "urlChave": "www.sefaz.pb.gov.br/nfce/consulta"
            }
        }
    },
    "PI": {
        "mod65": {
            "homologacao": {
                "NFeConsultaQR": "http://www.sefaz.pi.gov.br/nfce/qrcode",
                "urlChave": "www.sefaz.pi.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeConsultaQR": "http://www.sefaz.pi.gov.br/nfce/qrcode",
                "urlChave": "www.sefaz.pi.gov.br/nfce/consulta"
            }
        }
    },
    "RJ": {
        "mod65": {
            "homologacao": {
                "NFeConsultaQR": "http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode",
                "urlChave": "www.fazenda.rj.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeConsultaQR": "https://consultadfe.fazenda.rj.gov.br/consultaNFCe/QRCode",
                "urlChave": "www.fazenda.rj.gov.br/nfce/consulta"
            }
        }
    },
    "RN": {
        "mod65": {
            "homologacao": {
                "NFeConsultaQR": "http://hom.nfce.set.rn.gov.br/consultarNFCe.aspx",
                "urlChave": "www.set.rn.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeConsultaQR": "http://nfce.set.rn.gov.br/consultarNFCe.aspx",
                "urlChave": "www.set.rn.gov.br/nfce/consulta"
            }
        }
    },
    "RO": {
        "mod65": {
            "homologacao": {
                "NFeConsultaQR": "http://www.nfce.sefin.ro.gov.br/consultanfce/consulta.jsp",
                "urlChave": "www.sefin.ro.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeConsultaQR": "http://www.nfce.sefin.ro.gov.br/consultanfce/consulta.jsp",
                "urlChave": "www.sefin.ro.gov.br/nfce/consulta"
            }
        }
    },
    "RR": {
        "mod65": {
            "homologacao": {
                "NFeConsultaQR": "http://200.174.88.103:8080/nfce/servlet/qrcode",
                "urlChave": "www.sefaz.rr.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeConsultaQR": "https://www.sefaz.rr.gov.br/servlet/qrcode",
                "urlChave": "www.sefaz.rr.gov.br/nfce/consulta"
            }
        }
    },
    "SC": {
        "mod65": {
            "homologacao": {
                "NFeConsultaQR": "https://hom.sat.sef.sc.gov.br/nfce/consulta",
                "urlChave": "https://sat.sef.sc.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeConsultaQR": "https://sat.sef.sc.gov.br/nfce/consulta",
                "urlChave": "https://sat.sef.sc.gov.br/nfce/consulta"
            }
        }
    },
    "SE": {
        "mod65": {
            "homologacao": {
                "NFeConsultaQR": "http://www.hom.nfe.se.gov.br/nfce/qrcode",
                "urlChave": "http://www.nfce.se.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeConsultaQR": "http://www.nfce.se.gov.br/nfce/qrcode",
                "urlChave": "http://www.nfce.se.gov.br/nfce/consulta"
            }
        }
    },
    "TO": {
        "mod65": {
            "homologacao": {
                "NFeConsultaQR": "http://homologacao.sefaz.to.gov.br/nfce/qrcode",
                "urlChave": "www.sefaz.to.gov.br/nfce/consulta"
            },
            "producao": {
                "NFeConsultaQR": "http://www.sefaz.to.gov.br/nfce/qrcode",
                "urlChave": "www.sefaz.to.gov.br/nfce/consulta"
            }
        }
    }
}

export { urlEventos }