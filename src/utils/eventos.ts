/*
    NFe Producao: https://www.nfe.fazenda.gov.br/portal/webservices.aspx
    NFe Homologacao: https://hom.nfe.fazenda.gov.br/portal/webServices.aspx
*/

function urlEventos(UF: string, versao: string): any {
    switch (`${versao}`) {
        case "4.00":
            return urlEventos400[UF]
        default:
            throw `Versão incompativel! Tools({...versao:${versao}})`;
            break;
    }
}

const urlEventos400: { [key: string]: any } = {
    "AM": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://nfe.sefaz.am.gov.br/services2/services/NfeStatusServico4",
                "NFeAutorizacao": "https://nfe.sefaz.am.gov.br/services2/services/NfeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfe.sefaz.am.gov.br/services2/services/NfeConsulta4",
                "NFeInutilizacao": "https://nfe.sefaz.am.gov.br/services2/services/NfeInutilizacao4",
                "NFeRetAutorizacao": "https://nfe.sefaz.am.gov.br/services2/services/NfeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfe.sefaz.am.gov.br/services2/services/RecepcaoEvento4"
            },
            "homologacao": {
                "NFeStatusServico": "https://homnfe.sefaz.am.gov.br/services2/services/NfeStatusServico4",
                "NFeAutorizacao": "https://homnfe.sefaz.am.gov.br/services2/services/NfeAutorizacao4",
                "NFeConsultaProtocolo": "https://homnfe.sefaz.am.gov.br/services2/services/NfeConsulta4",
                "NFeInutilizacao": "https://homnfe.sefaz.am.gov.br/services2/services/NfeInutilizacao4",
                "NFeRetAutorizacao": "https://homnfe.sefaz.am.gov.br/services2/services/NfeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://homnfe.sefaz.am.gov.br/services2/services/RecepcaoEvento4"
            }
        },
        "mod65": {
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
            },
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
            }
        },
        "cUF": "13"
    },
    "AN": {
        "mod55": {
            "producao": {
                "NFeRecepcaoEvento": "https://www.nfe.fazenda.gov.br/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx",
                "NFeDistribuicaoDFe": "https://www1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx",
                "NFeDownloadNF": "https://www.nfe.fazenda.gov.br/NfeDownloadNF/NfeDownloadNF.asmx",
                "RecepcaoEPEC": "https://www.nfe.fazenda.gov.br/RecepcaoEvento/RecepcaoEvento.asmx"
            },
            "homologacao": {
                "NFeRecepcaoEvento": "https://hom1.nfe.fazenda.gov.br/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx",
                "NFeDistribuicaoDFe": "https://hom1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx",
                "NFeDownloadNF": "https://hom.nfe.fazenda.gov.br/NfeDownloadNF/NfeDownloadNF.asmx",
                "RecepcaoEPEC": "https://hom.nfe.fazenda.gov.br/RecepcaoEvento/RecepcaoEvento.asmx"
            }
        },
        "cUF": "91"
    },
    "BA": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://nfe.sefaz.ba.gov.br/webservices/NFeStatusServico4/NFeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe.sefaz.ba.gov.br/webservices/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe.sefaz.ba.gov.br/webservices/NFeConsultaProtocolo4/NFeConsultaProtocolo4.asmx",
                "NFeInutilizacao": "https://nfe.sefaz.ba.gov.br/webservices/NFeInutilizacao4/NFeInutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe.sefaz.ba.gov.br/webservices/NFeRetAutorizacao4/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe.sefaz.ba.gov.br/webservices/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx",
                "NFeConsultaCadastro": "https://nfe.sefaz.ba.gov.br/webservices/CadConsultaCadastro4/CadConsultaCadastro4.asmx"
            },
            "homologacao": {
                "NFeStatusServico": "https://hnfe.sefaz.ba.gov.br/webservices/NFeStatusServico4/NFeStatusServico4.asmx",
                "NFeAutorizacao": "https://hnfe.sefaz.ba.gov.br/webservices/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://hnfe.sefaz.ba.gov.br/webservices/NFeConsultaProtocolo4/NFeConsultaProtocolo4.asmx",
                "NFeInutilizacao": "https://hnfe.sefaz.ba.gov.br/webservices/NFeInutilizacao4/NFeInutilizacao4.asmx",
                "NFeRetAutorizacao": "https://hnfe.sefaz.ba.gov.br/webservices/NFeRetAutorizacao4/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://hnfe.sefaz.ba.gov.br/webservices/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx",
                "NFeConsultaCadastro": "https://hnfe.sefaz.ba.gov.br/webservices/CadConsultaCadastro4/CadConsultaCadastro4.asmx"
            }
        },
        "mod65": {
            "producao": {
                "NFeConsultaQR": "http://nfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx",
                "urlChave": "http://www.sefaz.ba.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeConsultaQR": "http://hnfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx",
                "urlChave": "http://hinternet.sefaz.ba.gov.br/nfce/consulta"
            }
        },
        "cUF": "29"
    },
    "GO": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://nfe.sefaz.go.gov.br/nfe/services/NFeStatusServico4",
                "NFeAutorizacao": "https://nfe.sefaz.go.gov.br/nfe/services/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfe.sefaz.go.gov.br/nfe/services/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://nfe.sefaz.go.gov.br/nfe/services/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://nfe.sefaz.go.gov.br/nfe/services/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfe.sefaz.go.gov.br/nfe/services/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://nfe.sefaz.go.gov.br/nfe/services/CadConsultaCadastro4"
            },
            "homologacao": {
                "NFeStatusServico": "https://homolog.sefaz.go.gov.br/nfe/services/NFeStatusServico4?wsdl",
                "NFeAutorizacao": "https://homolog.sefaz.go.gov.br/nfe/services/NFeAutorizacao4?wsdl",
                "NFeConsultaProtocolo": "https://homolog.sefaz.go.gov.br/nfe/services/NFeConsultaProtocolo4?wsdl",
                "NFeInutilizacao": "https://homolog.sefaz.go.gov.br/nfe/services/NFeInutilizacao4?wsdl",
                "NFeRetAutorizacao": "https://homolog.sefaz.go.gov.br/nfe/services/NFeRetAutorizacao4?wsdl",
                "NFeRecepcaoEvento": "https://homolog.sefaz.go.gov.br/nfe/services/NFeRecepcaoEvento4?wsdl",
                "NFeConsultaCadastro": "https://homolog.sefaz.go.gov.br/nfe/services/CadConsultaCadastro4?wsdl"
            }
        },
        "mod65": {
            "producao": {
                "NFeAutorizacao": "https://nfe.sefaz.go.gov.br/nfe/services/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://nfe.sefaz.go.gov.br/nfe/services/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://nfe.sefaz.go.gov.br/nfe/services/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://nfe.sefaz.go.gov.br/nfe/services/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://nfe.sefaz.go.gov.br/nfe/services/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://nfe.sefaz.go.gov.br/nfe/services/NFeRecepcaoEvento4",
                "CscNFCe": "https://nfe.sefaz.go.gov.br/nfe/services/v2/CscNFCe",
                "NFeConsultaQR": "http://nfe.sefaz.go.gov.br/nfeweb/sites/nfce/danfeNFCe",
                "urlChave": "www.sefaz.go.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeAutorizacao": "https://homolog.sefaz.go.gov.br/nfe/services/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://homolog.sefaz.go.gov.br/nfe/services/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://homolog.sefaz.go.gov.br/nfe/services/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://homolog.sefaz.go.gov.br/nfe/services/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://homolog.sefaz.go.gov.br/nfe/services/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://homolog.sefaz.go.gov.br/nfe/services/NFeRecepcaoEvento4",
                "CscNFCe": "https://homolog.sefaz.go.gov.br/nfe/services/v2/CscNFCe",
                "NFeConsultaQR": "http://homolog.sefaz.go.gov.br/nfeweb/sites/nfce/danfeNFCe",
                "urlChave": "www.nfce.go.gov.br/post/ver/214413/consulta-nfc-e-homologacao"
            }
        },
        "cUF": "52"
    },
    "MG": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://nfe.fazenda.mg.gov.br/nfe2/services/NFeStatusServico4",
                "NFeAutorizacao": "https://nfe.fazenda.mg.gov.br/nfe2/services/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfe.fazenda.mg.gov.br/nfe2/services/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://nfe.fazenda.mg.gov.br/nfe2/services/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://nfe.fazenda.mg.gov.br/nfe2/services/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfe.fazenda.mg.gov.br/nfe2/services/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://nfe.fazenda.mg.gov.br/nfe2/services/CadConsultaCadastro4"
            },
            "homologacao": {
                "NFeStatusServico": "https://hnfe.fazenda.mg.gov.br/nfe2/services/NFeStatusServico4",
                "NFeAutorizacao": "https://hnfe.fazenda.mg.gov.br/nfe2/services/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://hnfe.fazenda.mg.gov.br/nfe2/services/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://hnfe.fazenda.mg.gov.br/nfe2/services/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://hnfe.fazenda.mg.gov.br/nfe2/services/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://hnfe.fazenda.mg.gov.br/nfe2/services/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://hnfe.fazenda.mg.gov.br/nfe2/services/CadConsultaCadastro4"
            }
        },
        "mod65": {
            "producao": {
                "NFeAutorizacao": "https://nfce.fazenda.mg.gov.br/nfce/services/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://nfce.fazenda.mg.gov.br/nfce/services/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://nfce.fazenda.mg.gov.br/nfce/services/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://nfce.fazenda.mg.gov.br/nfce/services/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://nfce.fazenda.mg.gov.br/nfce/services/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://nfce.fazenda.mg.gov.br/nfce/services/NFeRecepcaoEvento4",
                "NFeConsultaQR": "https://portalsped.fazenda.mg.gov.br/portalnfce/sistema/qrcode.xhtml",
                "urlChave": "https://portalsped.fazenda.mg.gov.br/portalnfce"
            },
            "homologacao": {
                "NFeAutorizacao": "https://hnfce.fazenda.mg.gov.br/nfce/services/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://hnfce.fazenda.mg.gov.br/nfce/services/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://hnfce.fazenda.mg.gov.br/nfce/services/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://hnfce.fazenda.mg.gov.br/nfce/services/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://hnfce.fazenda.mg.gov.br/nfce/services/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://hnfce.fazenda.mg.gov.br/nfce/services/NFeRecepcaoEvento4",
                "NFeConsultaQR": "https://portalsped.fazenda.mg.gov.br/portalnfce/sistema/qrcode.xhtml",
                "urlChave": "https://hportalsped.fazenda.mg.gov.br/portalnfce"
            }
        },
        "cUF": "31"
    },
    "MS": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://nfe.sefaz.ms.gov.br/ws/NFeStatusServico4",
                "NFeAutorizacao": "https://nfe.sefaz.ms.gov.br/ws/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfe.sefaz.ms.gov.br/ws/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://nfe.sefaz.ms.gov.br/ws/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://nfe.sefaz.ms.gov.br/ws/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfe.sefaz.ms.gov.br/ws/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://nfe.sefaz.ms.gov.br/ws/CadConsultaCadastro4"
            },
            "homologacao": {
                "NFeStatusServico": "https://hom.nfe.sefaz.ms.gov.br/ws/NFeStatusServico4",
                "NFeAutorizacao": "https://hom.nfe.sefaz.ms.gov.br/ws/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://hom.nfe.sefaz.ms.gov.br/ws/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://hom.nfe.sefaz.ms.gov.br/ws/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://hom.nfe.sefaz.ms.gov.br/ws/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://hom.nfe.sefaz.ms.gov.br/ws/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://hom.nfe.sefaz.ms.gov.br/ws/CadConsultaCadastro4"
            }
        },
        "mod65": {
            "producao": {
                "NFeAutorizacao": "https://nfce.sefaz.ms.gov.br/ws/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://nfce.sefaz.ms.gov.br/ws/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://nfce.sefaz.ms.gov.br/ws/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://nfce.sefaz.ms.gov.br/ws/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://nfce.sefaz.ms.gov.br/ws/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://nfce.sefaz.ms.gov.br/ws/NFeRecepcaoEvento4",
                "NFeConsultaQR": "http://www.dfe.ms.gov.br/nfce/qrcode",
                "urlChave": "http://www.dfe.ms.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeAutorizacao": "https://hom.nfce.sefaz.ms.gov.br/ws/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://hom.nfce.sefaz.ms.gov.br/ws/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://hom.nfce.sefaz.ms.gov.br/ws/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://hom.nfce.sefaz.ms.gov.br/ws/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://hom.nfce.sefaz.ms.gov.br/ws/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://hom.nfce.sefaz.ms.gov.br/ws/NFeRecepcaoEvento4",
                "NFeConsultaQR": "http://www.dfe.ms.gov.br/nfce/qrcode",
                "urlChave": "http://www.dfe.ms.gov.br/nfce/consulta"
            }
        },
        "cUF": "50"
    },
    "MT": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/NfeStatusServico4",
                "NFeAutorizacao": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/NfeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/NfeConsulta4",
                "NFeInutilizacao": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/NfeInutilizacao4",
                "NFeRetAutorizacao": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/NfeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/RecepcaoEvento4",
                "NFeConsultaCadastro": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/CadConsultaCadastro4"
            },
            "homologacao": {
                "NFeStatusServico": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/NfeStatusServico4",
                "NFeAutorizacao": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/NfeAutorizacao4",
                "NFeConsultaProtocolo": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/NfeConsulta4",
                "NFeInutilizacao": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/NfeInutilizacao4",
                "NFeRetAutorizacao": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/NfeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/RecepcaoEvento4",
                "NFeConsultaCadastro": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/CadConsultaCadastro4"
            }
        },
        "mod65": {
            "producao": {
                "NFeAutorizacao": "https://nfce.sefaz.mt.gov.br/nfcews/services/NfeAutorizacao4",
                "NFeRetAutorizacao": "https://nfce.sefaz.mt.gov.br/nfcews/services/NfeRetAutorizacao4",
                "NFeInutilizacao": "https://nfce.sefaz.mt.gov.br/nfcews/services/NfeInutilizacao4",
                "NFeConsultaProtocolo": "https://nfce.sefaz.mt.gov.br/nfcews/services/NfeConsulta4",
                "NFeStatusServico": "https://nfce.sefaz.mt.gov.br/nfcews/services/NfeStatusServico4",
                "NFeRecepcaoEvento": "https://nfce.sefaz.mt.gov.br/nfcews/services/RecepcaoEvento4",
                "NFeConsultaQR": "http://www.sefaz.mt.gov.br/nfce/consultanfce",
                "urlChave": "http://www.sefaz.mt.gov.br/nfce/consultanfce"
            },
            "homologacao": {
                "NFeAutorizacao": "https://homologacao.sefaz.mt.gov.br/nfcews/services/NfeAutorizacao4",
                "NFeRetAutorizacao": "https://homologacao.sefaz.mt.gov.br/nfcews/services/NfeRetAutorizacao4",
                "NFeInutilizacao": "https://homologacao.sefaz.mt.gov.br/nfcews/services/NfeInutilizacao4",
                "NFeConsultaProtocolo": "https://homologacao.sefaz.mt.gov.br/nfcews/services/NfeConsulta4",
                "NFeStatusServico": "https://homologacao.sefaz.mt.gov.br/nfcews/services/NfeStatusServico4",
                "NFeRecepcaoEvento": "https://homologacao.sefaz.mt.gov.br/nfcews/services/RecepcaoEvento4",
                "NFeConsultaQR": "http://homologacao.sefaz.mt.gov.br/nfce/consultanfce",
                "urlChave": "http://homologacao.sefaz.mt.gov.br/nfce/consultanfce"
            }
        },
        "cUF": "51"
    },
    "PE": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeStatusServico4",
                "NFeAutorizacao": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://nfe.sefaz.pe.gov.br/nfe-service/services/CadConsultaCadastro4"
            },
            "homologacao": {
                "NFeStatusServico": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeStatusServico4",
                "NFeAutorizacao": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/CadConsultaCadastro4"
            }
        },
        "mod65": {
            "producao": {
                "NFeConsultaQR": "http://nfce.sefaz.pe.gov.br/nfce/consulta",
                "urlChave": "nfce.sefaz.pe.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeConsultaQR": "http://nfcehomolog.sefaz.pe.gov.br/nfce/consulta",
                "urlChave": "nfce.sefaz.pe.gov.br/nfce/consulta"
            }
        },
        "cUF": "26"
    },
    "PR": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://nfe.sefa.pr.gov.br/nfe/NFeStatusServico4",
                "NFeAutorizacao": "https://nfe.sefa.pr.gov.br/nfe/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://nfe.sefa.pr.gov.br/nfe/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://nfe.sefa.pr.gov.br/nfe/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://nfe.sefa.pr.gov.br/nfe/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://nfe.sefa.pr.gov.br/nfe/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://nfe.sefa.pr.gov.br/nfe/CadConsultaCadastro4"
            },
            "homologacao": {
                "NFeStatusServico": "https://homologacao.nfe.sefa.pr.gov.br/nfe/NFeStatusServico4",
                "NFeAutorizacao": "https://homologacao.nfe.sefa.pr.gov.br/nfe/NFeAutorizacao4",
                "NFeConsultaProtocolo": "https://homologacao.nfe.sefa.pr.gov.br/nfe/NFeConsultaProtocolo4",
                "NFeInutilizacao": "https://homologacao.nfe.sefa.pr.gov.br/nfe/NFeInutilizacao4",
                "NFeRetAutorizacao": "https://homologacao.nfe.sefa.pr.gov.br/nfe/NFeRetAutorizacao4",
                "NFeRecepcaoEvento": "https://homologacao.nfe.sefa.pr.gov.br/nfe/NFeRecepcaoEvento4",
                "NFeConsultaCadastro": "https://homologacao.nfe.sefa.pr.gov.br/nfe/CadConsultaCadastro4"
            }
        },
        "mod65": {
            "producao": {
                "NFeAutorizacao": "https://nfce.sefa.pr.gov.br/nfce/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://nfce.sefa.pr.gov.br/nfce/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://nfce.sefa.pr.gov.br/nfce/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://nfce.sefa.pr.gov.br/nfce/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://nfce.sefa.pr.gov.br/nfce/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://nfce.sefa.pr.gov.br/nfce/NFeRecepcaoEvento4",
                "NFeConsultaQR": "http://www.fazenda.pr.gov.br/nfce/qrcode",
                "urlChave": "http://www.fazenda.pr.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeAutorizacao": "https://homologacao.nfce.sefa.pr.gov.br/nfce/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://homologacao.nfce.sefa.pr.gov.br/nfce/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://homologacao.nfce.sefa.pr.gov.br/nfce/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://homologacao.nfce.sefa.pr.gov.br/nfce/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://homologacao.nfce.sefa.pr.gov.br/nfce/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://homologacao.nfce.sefa.pr.gov.br/nfce/NFeRecepcaoEvento4",
                "NFeConsultaQR": "http://www.fazenda.pr.gov.br/nfce/qrcode",
                "urlChave": "http://www.fazenda.pr.gov.br/nfce/consulta"
            }
        },
        "cUF": "41"
    },
    "RS": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://nfe.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe.sefazrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe.sefazrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeInutilizacao": "https://nfe.sefazrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe.sefazrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe.sefazrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad.sefazrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            },
            "homologacao": {
                "NFeStatusServico": "https://nfe-homologacao.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe-homologacao.sefazrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe-homologacao.sefazrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeInutilizacao": "https://nfe-homologacao.sefazrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe-homologacao.sefazrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe-homologacao.sefazrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad.sefazrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            }
        },
        "mod65": {
            "producao": {
                "NFeAutorizacao": "https://nfce.sefazrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfce.sefazrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfce.sefazrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfce.sefazrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeStatusServico": "https://nfce.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeRecepcaoEvento": "https://nfce.sefazrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaQR": "https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx",
                "urlChave": "www.sefaz.rs.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeAutorizacao": "https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfce-homologacao.sefazrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeStatusServico": "https://nfce-homologacao.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeRecepcaoEvento": "https://nfce-homologacao.sefazrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaQR": "https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx",
                "urlChave": "www.sefaz.rs.gov.br/nfce/consulta"
            }
        },
        "cUF": "43"
    },
    "SP": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://nfe.fazenda.sp.gov.br/ws/nfestatusservico4.asmx",
                "NFeAutorizacao": "https://nfe.fazenda.sp.gov.br/ws/nfeautorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe.fazenda.sp.gov.br/ws/nfeconsultaprotocolo4.asmx",
                "NFeInutilizacao": "https://nfe.fazenda.sp.gov.br/ws/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe.fazenda.sp.gov.br/ws/nferetautorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe.fazenda.sp.gov.br/ws/nferecepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://nfe.fazenda.sp.gov.br/ws/cadconsultacadastro4.asmx"
            },
            "homologacao": {
                "NFeStatusServico": "https://homologacao.nfe.fazenda.sp.gov.br/ws/nfestatusservico4.asmx",
                "NFeAutorizacao": "https://homologacao.nfe.fazenda.sp.gov.br/ws/nfeautorizacao4.asmx",
                "NFeConsultaProtocolo": "https://homologacao.nfe.fazenda.sp.gov.br/ws/nfeconsultaprotocolo4.asmx",
                "NFeInutilizacao": "https://homologacao.nfe.fazenda.sp.gov.br/ws/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://homologacao.nfe.fazenda.sp.gov.br/ws/nferetautorizacao4.asmx",
                "NFeRecepcaoEvento": "https://homologacao.nfe.fazenda.sp.gov.br/ws/nferecepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://homologacao.nfe.fazenda.sp.gov.br/ws/cadconsultacadastro4.asmx"
            }
        },
        "mod65": {
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
            },
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
                "urlChave": "https://www.homologacao.nfce.fazenda.sp.gov.br/NFCeConsultaPublica"
            }
        },
        "cUF": "35"
    },
    "SVAN": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://www.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx",
                "NFeAutorizacao": "https://www.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://www.sefazvirtual.fazenda.gov.br/NFeConsultaProtocolo4/NFeConsultaProtocolo4.asmx",
                "NFeInutilizacao": "https://www.sefazvirtual.fazenda.gov.br/NFeInutilizacao4/NFeInutilizacao4.asmx",
                "NFeRetAutorizacao": "https://www.sefazvirtual.fazenda.gov.br/NFeRetAutorizacao4/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://www.sefazvirtual.fazenda.gov.br/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx"
            },
            "homologacao": {
                "NFeStatusServico": "https://hom.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx",
                "NFeAutorizacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://hom.sefazvirtual.fazenda.gov.br/NFeConsultaProtocolo4/NFeConsultaProtocolo4.asmx",
                "NFeInutilizacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeInutilizacao4/NFeInutilizacao4.asmx",
                "NFeRetAutorizacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeRetAutorizacao4/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://hom.sefazvirtual.fazenda.gov.br/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx"
            }
        }
    },
    "SVRS": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://nfe.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeInutilizacao": "https://nfe.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            },
            "homologacao": {
                "NFeStatusServico": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeInutilizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx"
            }
        },
        "mod65": {
            "producao": {
                "NFeAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfce.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeStatusServico": "https://nfce.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeRecepcaoEvento": "https://nfce.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx"
            },
            "homologacao": {
                "NFeAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeStatusServico": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeRecepcaoEvento": "https://nfce-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx"
            }
        }
    },
    "SVCAN": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://www.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx",
                "NFeAutorizacao": "https://www.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://www.sefazvirtual.fazenda.gov.br/NFeConsultaProtocolo4/NFeConsultaProtocolo4.asmx",
                "NFeInutilizacao": "https://www.sefazvirtual.fazenda.gov.br/NFeInutilizacao4/NFeInutilizacao4.asmx",
                "NFeRetAutorizacao": "https://www.sefazvirtual.fazenda.gov.br/NFeRetAutorizacao4/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://www.sefazvirtual.fazenda.gov.br/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx"
            },
            "homologacao": {
                "NFeStatusServico": "https://hom.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx",
                "NFeAutorizacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://hom.sefazvirtual.fazenda.gov.br/NFeConsultaProtocolo4/NFeConsultaProtocolo4.asmx",
                "NFeInutilizacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeInutilizacao4/NFeInutilizacao4.asmx",
                "NFeRetAutorizacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeRetAutorizacao4/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://hom.sefazvirtual.fazenda.gov.br/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx"
            }
        }
    },
    "SVCRS": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://nfe.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeInutilizacao": "https://nfe.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            },
            "homologacao": {
                "NFeStatusServico": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeInutilizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx"
            }
        }
    },
    "AC": {
        "mod65": {
            "producao": {
                "NFeConsultaQR": "http://www.sefaznet.ac.gov.br/nfce/qrcode",
                "urlChave": "www.sefaznet.ac.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeConsultaQR": "http://www.hml.sefaznet.ac.gov.br/nfce/qrcode",
                "urlChave": "www.sefaznet.ac.gov.br/nfce/consulta"
            }
        },
        "cUF": "12"
    },
    "AL": {
        "mod65": {
            "producao": {
                "NFeConsultaQR": "http://nfce.sefaz.al.gov.br/QRCode/consultarNFCe.jsp",
                "urlChave": "www.sefaz.al.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeConsultaQR": "http://nfce.sefaz.al.gov.br/QRCode/consultarNFCe.jsp",
                "urlChave": "www.sefaz.al.gov.br/nfce/consulta"
            }
        },
        "cUF": "27"
    },
    "AP": {
        "mod65": {
            "producao": {
                "NFeConsultaQR": "https://www.sefaz.ap.gov.br/nfce/nfcep.php",
                "urlChave": "www.sefaz.ap.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeConsultaQR": "https://www.sefaz.ap.gov.br/nfcehml/nfce.php",
                "urlChave": "www.sefaz.ap.gov.br/nfce/consulta"
            }
        },
        "cUF": "16"
    },
    "CE": {
        "mod65": {
            "producao": {
                "NFeAutorizacao": "https://nfce.sefaz.ce.gov.br/nfce4/services/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://nfce.sefaz.ce.gov.br/nfce4/services/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://nfce.sefaz.ce.gov.br/nfce4/services/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://nfce.sefaz.ce.gov.br/nfce4/services/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://nfce.sefaz.ce.gov.br/nfce4/services/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://nfce.sefaz.ce.gov.br/nfce4/services/NFeRecepcaoEvento4",
                "NFeConsultaQR": "http://nfce.sefaz.ce.gov.br/pages/ShowNFCe.html",
                "urlChave": "www.sefaz.ce.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeAutorizacao": "https://nfceh.sefaz.ce.gov.br/nfce4/services/NFeAutorizacao4",
                "NFeRetAutorizacao": "https://nfceh.sefaz.ce.gov.br/nfce4/services/NFeRetAutorizacao4",
                "NFeInutilizacao": "https://nfceh.sefaz.ce.gov.br/nfce4/services/NFeInutilizacao4",
                "NFeConsultaProtocolo": "https://nfceh.sefaz.ce.gov.br/nfce4/services/NFeConsultaProtocolo4",
                "NFeStatusServico": "https://nfceh.sefaz.ce.gov.br/nfce4/services/NFeStatusServico4",
                "NFeRecepcaoEvento": "https://nfceh.sefaz.ce.gov.br/nfce4/services/NFeRecepcaoEvento4",
                "NFeConsultaQR": "http://nfceh.sefaz.ce.gov.br/pages/ShowNFCe.html",
                "urlChave": "www.sefaz.ce.gov.br/nfce/consulta"
            }
        },
        "cUF": "23"
    },
    "ES": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://nfe.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfe.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeRecepcaoEvento": "https://nfe.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            },
            "homologacao": {
                "NFeStatusServico": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NfeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NfeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeRecepcaoEvento": "https://nfe-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad-homologacao.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            }
        },
        "mod65": {
            "producao": {
                "NFeStatusServico": "https://nfce.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico2.asmx",
                "NFeAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao.asmx",
                "NFeRetAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao.asmx",
                "NFeInutilizacao": "https://nfce.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao2.asmx",
                "NFeConsultaProtocolo": "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta2.asmx",
                "NFeRecepcaoEvento": "https://nfce.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento.asmx",
                "NFeConsultaQR": "http://app.sefaz.es.gov.br/ConsultaNFCe",
                "urlChave": "www.sefaz.es.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeStatusServico": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico2.asmx",
                "NFeAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao.asmx",
                "NFeRetAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao.asmx",
                "NFeInutilizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao2.asmx",
                "NFeConsultaProtocolo": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta2.asmx",
                "NFeRecepcaoEvento": "https://nfce-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento.asmx",
                "NFeConsultaQR": "http://app.sefaz.es.gov.br/ConsultaNFCe",
                "urlChave": "www.sefaz.es.gov.br/nfce/consulta"
            }
        },
        "cUF": "32"
    },
    "DF": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://nfe.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfe.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeRecepcaoEvento": "https://nfe.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            },
            "homologacao": {
                "NFeStatusServico": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeRecepcaoEvento": "https://nfe-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad-homologacao.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            }
        },
        "mod65": {
            "producao": {
                "NFeStatusServico": "https://nfce.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico2.asmx",
                "NFeAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao.asmx",
                "NFeRetAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao.asmx",
                "NFeInutilizacao": "https://nfce.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao2.asmx",
                "NFeConsultaProtocolo": "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta2.asmx",
                "NFeRecepcaoEvento": "https://nfce.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento.asmx",
                "NFeConsultaQR": "http://www.fazenda.df.gov.br/nfce/qrcode",
                "urlChave": "www.fazenda.df.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeStatusServico": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico2.asmx",
                "NFeAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao.asmx",
                "NFeRetAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao.asmx",
                "NFeInutilizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao2.asmx",
                "NFeConsultaProtocolo": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta2.asmx",
                "NFeRecepcaoEvento": "https://nfce-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento.asmx",
                "NFeConsultaQR": "http://www.fazenda.df.gov.br/nfce/qrcode",
                "urlChave": "www.fazenda.df.gov.br/nfce/consulta"
            }
        },
        "cUF": "53"
    },
    "MA": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://www.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx",
                "NFeAutorizacao": "https://www.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://www.sefazvirtual.fazenda.gov.br/NFeRetAutorizacao4/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://www.sefazvirtual.fazenda.gov.br/NFeInutilizacao4/NFeInutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://www.sefazvirtual.fazenda.gov.br/NFeConsultaProtocolo4/NFeConsultaProtocolo4.asmx",
                "NFeRecepcaoEvento": "https://www.sefazvirtual.fazenda.gov.br/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx",
                "NFeConsultaCadastro": "https://www.sefazvirtual.fazenda.gov.br/CadConsultaCadastro4/CadConsultaCadastro4.asmx"
            },
            "homologacao": {
                "NFeStatusServico": "https://hom.nfe.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx",
                "NFeAutorizacao": "https://hom.nfe.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://hom.nfe.fazenda.gov.br/NFeRetAutorizacao4/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://hom.nfe.fazenda.gov.br/NFeInutilizacao4/NFeInutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://hom.nfe.fazenda.gov.br/NFeConsultaProtocolo4/NFeConsultaProtocolo4.asmx",
                "NFeRecepcaoEvento": "https://hom.nfe.fazenda.gov.br/NFeRecepcaoEvento4/NFeRecepcaoEvento4.asmx",
                "NFeConsultaCadastro": "https://hom.nfe.fazenda.gov.br/CadConsultaCadastro4/CadConsultaCadastro4.asmx"
            }
        },
        "mod65": {
            "producao": {
                "NFeStatusServico": "https://nfce.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico2.asmx",
                "NFeAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao.asmx",
                "NFeRetAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao.asmx",
                "NFeInutilizacao": "https://nfce.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao2.asmx",
                "NFeConsultaProtocolo": "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta2.asmx",
                "NFeRecepcaoEvento": "https://nfce.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento.asmx",
                "NFeConsultaQR": "http://www.nfce.sefaz.ma.gov.br/portal/consultarNFCe.jsp",
                "urlChave": "www.sefaz.ma.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeStatusServico": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico2.asmx",
                "NFeAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao.asmx",
                "NFeRetAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao.asmx",
                "NFeInutilizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao2.asmx",
                "NFeConsultaProtocolo": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta2.asmx",
                "NFeRecepcaoEvento": "https://nfce-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento.asmx",
                "NFeConsultaQR": "http://www.hom.nfce.sefaz.ma.gov.br/portal/consultarNFCe.jsp",
                "urlChave": "www.sefaz.ma.gov.br/nfce/consulta"
            }
        },
        "cUF": "21"
    },
    "PA": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://nfe.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfe.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeRecepcaoEvento": "https://nfe.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            },
            "homologacao": {
                "NFeStatusServico": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeRecepcaoEvento": "https://nfe-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad-homologacao.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            }
        },
        "mod65": {
            "producao": {
                "NFeStatusServico": "https://nfce.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico2.asmx",
                "NFeAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao.asmx",
                "NFeRetAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao.asmx",
                "NFeInutilizacao": "https://nfce.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao2.asmx",
                "NFeConsultaProtocolo": "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta2.asmx",
                "NFeRecepcaoEvento": "https://nfce.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento.asmx",
                "NFeConsultaQR": "https://appnfc.sefa.pa.gov.br/portal/view/consultas/nfce/consultanfce.seam",
                "urlChave": "www.sefa.pa.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeStatusServico": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico2.asmx",
                "NFeAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao.asmx",
                "NFeRetAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao.asmx",
                "NFeInutilizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao2.asmx",
                "NFeConsultaProtocolo": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta2.asmx",
                "NFeRecepcaoEvento": "https://nfce-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento.asmx",
                "NFeConsultaQR": "https://appnfc.sefa.pa.gov.br/portal/view/consultas/nfce/consultanfce.seam",
                "urlChave": "www.sefa.pa.gov.br/nfce/consulta"
            }
        },
        "cUF": "15"
    },
    "PB": {
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://nfe.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfe.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeRecepcaoEvento": "https://nfe.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            },
            "homologacao": {
                "NFeStatusServico": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NfeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NfeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeRecepcaoEvento": "https://nfe-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad-homologacao.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            }
        },
        "mod65": {
            "producao": {
                "NFeStatusServico": "https://nfce.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico2.asmx",
                "NFeAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao.asmx",
                "NFeRetAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao.asmx",
                "NFeInutilizacao": "https://nfce.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao2.asmx",
                "NFeConsultaProtocolo": "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta2.asmx",
                "NFeRecepcaoEvento": "https://nfce.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento.asmx",
                "NFeConsultaQR": "http://www.sefaz.pb.gov.br/nfce",
                "urlChave": "www.sefaz.pb.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeStatusServico": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico2.asmx",
                "NFeAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao.asmx",
                "NFeRetAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao.asmx",
                "NFeInutilizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao2.asmx",
                "NFeConsultaProtocolo": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta2.asmx",
                "NFeRecepcaoEvento": "https://nfce-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento.asmx",
                "NFeConsultaQR": "http://www.sefaz.pb.gov.br/nfce",
                "urlChave": "www.sefaz.pb.gov.br/nfcehom"
            }
        },
        "cUF": "25"
    },
    "PI": {
        "mod65": {
            "producao": {
                "NFeConsultaQR": "http://www.sefaz.pi.gov.br/nfce/qrcode",
                "urlChave": "www.sefaz.pi.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeConsultaQR": "http://www.sefaz.pi.gov.br/nfce/qrcode",
                "urlChave": "www.sefaz.pi.gov.br/nfce/consulta"
            }
        },
        "cUF": "22"
    },
    "RJ": {
        "mod65": {
            "producao": {
                "NFeConsultaQR": "https://consultadfe.fazenda.rj.gov.br/consultaNFCe/QRCode",
                "urlChave": "www.fazenda.rj.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeConsultaQR": "http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode",
                "urlChave": "www.fazenda.rj.gov.br/nfce/consulta"
            }
        },
        "cUF": "33"
    },
    "RN": {
        "mod65": {
            "producao": {
                "NFeConsultaQR": "http://nfce.set.rn.gov.br/consultarNFCe.aspx",
                "urlChave": "www.set.rn.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeConsultaQR": "http://hom.nfce.set.rn.gov.br/consultarNFCe.aspx",
                "urlChave": "www.set.rn.gov.br/nfce/consulta"
            }
        },
        "cUF": "24"
    },
    "RO": {
        "mod65": {
            "producao": {
                "NFeConsultaQR": "http://www.nfce.sefin.ro.gov.br/consultanfce/consulta.jsp",
                "urlChave": "www.sefin.ro.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeConsultaQR": "http://www.nfce.sefin.ro.gov.br/consultanfce/consulta.jsp",
                "urlChave": "www.sefin.ro.gov.br/nfce/consulta"
            }
        },
        "cUF": "11"
    },
    "RR": {
        "mod65": {
            "producao": {
                "NFeConsultaQR": "https://www.sefaz.rr.gov.br/servlet/qrcode",
                "urlChave": "www.sefaz.rr.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeConsultaQR": "http://200.174.88.103:8080/nfce/servlet/qrcode",
                "urlChave": "www.sefaz.rr.gov.br/nfce/consulta"
            }
        },
        "cUF": "14"
    },
    "SC": {
        "mod65": {
            "producao": {
                "NFeConsultaQR": "https://sat.sef.sc.gov.br/nfce/consulta",
                "urlChave": "https://sat.sef.sc.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeConsultaQR": "https://hom.sat.sef.sc.gov.br/nfce/consulta",
                "urlChave": "https://hom.sat.sef.sc.gov.br/nfce/consulta"
            }
        },
        "cUF": "42"
    },
    "SE": {
        "mod65": {
            "producao": {
                "NFeAutorizacao": "https://www.nfce.se.gov.br/ws/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://www.nfce.se.gov.br/ws/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://www.nfce.se.gov.br/ws/NFeInutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://www.nfce.se.gov.br/ws/NFeConsultaProtocolo4.asmx",
                "NFeStatusServico": "https://www.nfce.se.gov.br/ws/NFeStatusServico4.asmx",
                "NFeRecepcaoEvento": "https://www.nfce.se.gov.br/ws/RecepcaoEvento4.asmx",
                "NFeConsultaCadastro": "https://www.nfce.se.gov.br/ws/CadConsultaCadastro4.asmx",
                "NFeConsultaQR": "http://www.nfce.se.gov.br/nfce/qrcode",
                "urlChave": "http://www.nfce.se.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeAutorizacao": "https://www.hom.nfce.se.gov.br/ws/NFeAutorizacao4.asmx",
                "NFeRetAutorizacao": "https://www.hom.nfce.se.gov.br/ws/NFeRetAutorizacao4.asmx",
                "NFeInutilizacao": "https://www.hom.nfce.se.gov.br/ws/NFeInutilizacao4.asmx",
                "NFeConsultaProtocolo": "https://www.hom.nfce.se.gov.br/ws/NFeConsultaProtocolo4.asmx",
                "NFeStatusServico": "https://www.hom.nfce.se.gov.br/ws/NFeStatusServico4.asmx",
                "NFeRecepcaoEvento": "https://www.hom.nfce.se.gov.br/ws/RecepcaoEvento4.asmx",
                "NFeConsultaCadastro": "https://www.hom.nfce.se.gov.br/ws/CadConsultaCadastro4.asmx",
                "NFeConsultaQR": "http://www.hom.nfce.se.gov.br/nfce/qrcode",
                "urlChave": "http://www.hom.nfe.se.gov.br/nfce/consulta"
            }
        },
        "mod55": {
            "producao": {
                "NFeStatusServico": "https://nfe.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeInutilizacao": "https://nfe.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            },
            "homologacao": {
                "NFeStatusServico": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "NFeAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "NFeConsultaProtocolo": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                "NFeInutilizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                "NFeRetAutorizacao": "https://nfe-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                "NFeRecepcaoEvento": "https://nfe-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx",
                "NFeConsultaCadastro": "https://cad-homologacao.svrs.rs.gov.br/ws/cadconsultacadastro/cadconsultacadastro4.asmx"
            }
        },
        "cUF": "28"
    },
    "TO": {
        "mod65": {
            "producao": {
                "NFeConsultaQR": "http://www.sefaz.to.gov.br/nfce/qrcode",
                "urlChave": "www.sefaz.to.gov.br/nfce/consulta"
            },
            "homologacao": {
                "NFeConsultaQR": "http://homologacao.sefaz.to.gov.br/nfce/qrcode",
                "urlChave": "http://homologacao.sefaz.to.gov.br/nfce/consulta.jsf"
            }
        },
        "cUF": "17"
    }
}

export { urlEventos }