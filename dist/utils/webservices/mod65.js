const extras = {
    "SVRS": {
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
};
const eventos = (UF) => {
    switch (UF) {
        case 'AM':
            return {
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
            };
        case 'CE':
            return {
                "homologacao": {
                    "NFeConsultaQR": "http://nfceh.sefaz.ce.gov.br/pages/ShowNFCe.html",
                    "urlChave": "www.sefaz.ce.gov.br/nfce/consulta"
                },
                "producao": {
                    "NFeConsultaQR": "http://nfce.sefaz.ce.gov.br/pages/ShowNFCe.html",
                    "urlChave": "www.sefaz.ce.gov.br/nfce/consulta"
                }
            };
        case 'GO':
            return {
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
            };
        case 'MT':
            return {
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
            };
        case 'MS':
            return {
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
            };
        case 'MG':
            return {
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
            };
        case 'PR':
            return {
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
            };
        case 'RS':
            return {
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
            };
        case 'SP':
            return {
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
            };
        case 'AC':
            return {
                "homologacao": {
                    ...extras.SVRS.homologacao,
                    "NFeConsultaQR": "http://www.hml.sefaznet.ac.gov.br/nfce/qrcode",
                    "urlChave": "www.sefaznet.ac.gov.br/nfce/consulta"
                },
                "producao": {
                    ...extras.SVRS.producao,
                    "NFeConsultaQR": "http://www.sefaznet.ac.gov.br/nfce/qrcode",
                    "urlChave": "www.sefaznet.ac.gov.br/nfce/consulta"
                }
            };
        case 'AL':
            return {
                "homologacao": {
                    ...extras.SVRS.homologacao,
                    "NFeConsultaQR": "http://nfce.sefaz.al.gov.br/QRCode/consultarNFCe.jsp",
                    "urlChave": "www.sefaz.al.gov.br/nfce/consulta"
                },
                "producao": {
                    ...extras.SVRS.producao,
                    "NFeConsultaQR": "http://nfce.sefaz.al.gov.br/QRCode/consultarNFCe.jsp",
                    "urlChave": "www.sefaz.al.gov.br/nfce/consulta"
                }
            };
        case 'AP':
            return {
                "homologacao": {
                    ...extras.SVRS.homologacao,
                    "NFeAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                    "NFeRetAutorizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                    "NFeInutilizacao": "https://nfce-homologacao.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                    "NFeConsultaProtocolo": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                    "NFeStatusServico": "https://nfce-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                    "NFeRecepcaoEvento": "https://nfce-homologacao.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx"
                },
                "producao": {
                    ...extras.SVRS.producao,
                    "NFeAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                    "NFeRetAutorizacao": "https://nfce.svrs.rs.gov.br/ws/NfeRetAutorizacao/NFeRetAutorizacao4.asmx",
                    "NFeInutilizacao": "https://nfce.svrs.rs.gov.br/ws/nfeinutilizacao/nfeinutilizacao4.asmx",
                    "NFeConsultaProtocolo": "https://nfce.svrs.rs.gov.br/ws/NfeConsulta/NfeConsulta4.asmx",
                    "NFeStatusServico": "https://nfce.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                    "NFeRecepcaoEvento": "https://nfce.svrs.rs.gov.br/ws/recepcaoevento/recepcaoevento4.asmx"
                }
            };
        case 'BA':
            return {
                "homologacao": {
                    ...extras.SVRS.homologacao,
                    "NFeConsultaQR": "http://hnfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx",
                    "urlChave": "http://www.sefaz.ba.gov.br/nfce/consulta"
                },
                "producao": {
                    ...extras.SVRS.producao,
                    "NFeConsultaQR": "http://nfe.sefaz.ba.gov.br/servicos/nfce/qrcode.aspx",
                    "urlChave": "http://www.sefaz.ba.gov.br/nfce/consulta"
                }
            };
        case 'DF':
            return {
                "homologacao": {
                    ...extras.SVRS.homologacao,
                    "NFeConsultaQR": "http://dec.fazenda.df.gov.br/ConsultarNFCe.aspx",
                    "urlChave": "www.fazenda.df.gov.br/nfce/consulta"
                },
                "producao": {
                    ...extras.SVRS.producao,
                    "NFeConsultaQR": "http://www.fazenda.df.gov.br/nfce/qrcode",
                    "urlChave": "www.fazenda.df.gov.br/nfce/consulta"
                }
            };
        case 'ES':
            return {
                "homologacao": {
                    ...extras.SVRS.homologacao,
                    "NFeConsultaQR": "http://homologacao.sefaz.es.gov.br/ConsultaNFCe/qrcode.aspx",
                    "urlChave": "www.sefaz.es.gov.br/nfce/consulta"
                },
                "producao": {
                    ...extras.SVRS.producao,
                    "NFeConsultaQR": "http://app.sefaz.es.gov.br/ConsultaNFCe/qrcode.aspx",
                    "urlChave": "www.sefaz.es.gov.br/nfce/consulta"
                }
            };
        case 'MA':
            return {
                "homologacao": {
                    ...extras.SVRS.homologacao,
                    "NFeConsultaQR": "http://www.hom.nfce.sefaz.ma.gov.br/portal/consultarNFCe.jsp",
                    "urlChave": "www.sefaz.ma.gov.br/nfce/consulta"
                },
                "producao": {
                    ...extras.SVRS.producao,
                    "NFeConsultaQR": "http://www.nfce.sefaz.ma.gov.br/portal/consultarNFCe.jsp",
                    "urlChave": "www.sefaz.ma.gov.br/nfce/consulta"
                }
            };
        case 'PA':
            return {
                "homologacao": {
                    ...extras.SVRS.homologacao,
                    "NFeConsultaQR": "https://appnfc.sefa.pa.gov.br/portal-homologacao/view/consultas/nfce/nfceForm.seam",
                    "urlChave": "www.sefa.pa.gov.br/nfce/consulta"
                },
                "producao": {
                    ...extras.SVRS.producao,
                    "NFeConsultaQR": "https://appnfc.sefa.pa.gov.br/portal/view/consultas/nfce/nfceForm.seam",
                    "urlChave": "www.sefa.pa.gov.br/nfce/consulta"
                }
            };
        case 'PB':
            return {
                "homologacao": {
                    ...extras.SVRS.homologacao,
                    "NFeConsultaQR": "http://www.sefaz.pb.gov.br/nfcehom",
                    "urlChave": "www.sefaz.pb.gov.br/nfce/consulta"
                },
                "producao": {
                    ...extras.SVRS.producao,
                    "NFeConsultaQR": "http://www.sefaz.pb.gov.br/nfce",
                    "urlChave": "www.sefaz.pb.gov.br/nfce/consulta"
                }
            };
        case 'PE':
            return {
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
            };
        case 'PI':
            return {
                "homologacao": {
                    ...extras.SVRS.homologacao,
                    "NFeConsultaQR": "http://www.sefaz.pi.gov.br/nfce/qrcode",
                    "urlChave": "www.sefaz.pi.gov.br/nfce/consulta"
                },
                "producao": {
                    ...extras.SVRS.producao,
                    "NFeConsultaQR": "http://www.sefaz.pi.gov.br/nfce/qrcode",
                    "urlChave": "www.sefaz.pi.gov.br/nfce/consulta"
                }
            };
        case 'RJ':
            return {
                "homologacao": {
                    ...extras.SVRS.homologacao,
                    "NFeConsultaQR": "http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode",
                    "urlChave": "www.fazenda.rj.gov.br/nfce/consulta"
                },
                "producao": {
                    ...extras.SVRS.producao,
                    "NFeConsultaQR": "https://consultadfe.fazenda.rj.gov.br/consultaNFCe/QRCode",
                    "urlChave": "www.fazenda.rj.gov.br/nfce/consulta"
                }
            };
        case 'RN':
            return {
                "homologacao": {
                    ...extras.SVRS.homologacao,
                    "NFeConsultaQR": "http://hom.nfce.set.rn.gov.br/consultarNFCe.aspx",
                    "urlChave": "www.set.rn.gov.br/nfce/consulta"
                },
                "producao": {
                    ...extras.SVRS.producao,
                    "NFeConsultaQR": "http://nfce.set.rn.gov.br/consultarNFCe.aspx",
                    "urlChave": "www.set.rn.gov.br/nfce/consulta"
                }
            };
        case 'RO':
            return {
                "homologacao": {
                    ...extras.SVRS.homologacao,
                    "NFeConsultaQR": "http://www.nfce.sefin.ro.gov.br/consultanfce/consulta.jsp",
                    "urlChave": "www.sefin.ro.gov.br/nfce/consulta"
                },
                "producao": {
                    ...extras.SVRS.producao,
                    "NFeConsultaQR": "http://www.nfce.sefin.ro.gov.br/consultanfce/consulta.jsp",
                    "urlChave": "www.sefin.ro.gov.br/nfce/consulta"
                }
            };
        case 'RR':
            return {
                "homologacao": {
                    ...extras.SVRS.homologacao,
                    "NFeConsultaQR": "http://200.174.88.103:8080/nfce/servlet/qrcode",
                    "urlChave": "www.sefaz.rr.gov.br/nfce/consulta"
                },
                "producao": {
                    ...extras.SVRS.producao,
                    "NFeConsultaQR": "https://www.sefaz.rr.gov.br/servlet/qrcode",
                    "urlChave": "www.sefaz.rr.gov.br/nfce/consulta"
                }
            };
        case 'SE':
            return {
                "homologacao": {
                    ...extras.SVRS.homologacao,
                    "NFeConsultaQR": "http://www.hom.nfe.se.gov.br/nfce/qrcode",
                    "urlChave": "http://www.nfce.se.gov.br/nfce/consulta"
                },
                "producao": {
                    ...extras.SVRS.producao,
                    "NFeConsultaQR": "http://www.nfce.se.gov.br/nfce/qrcode",
                    "urlChave": "http://www.nfce.se.gov.br/nfce/consulta"
                }
            };
        case 'SC':
            return {
                "homologacao": {
                    ...extras.SVRS.homologacao,
                    "NFeConsultaQR": "https://hom.sat.sef.sc.gov.br/nfce/consulta",
                    "urlChave": "https://sat.sef.sc.gov.br/nfce/consulta"
                },
                "producao": {
                    ...extras.SVRS.producao,
                    "NFeConsultaQR": "https://sat.sef.sc.gov.br/nfce/consulta",
                    "urlChave": "https://sat.sef.sc.gov.br/nfce/consulta"
                }
            };
        case 'TO':
            return {
                "homologacao": {
                    ...extras.SVRS.homologacao,
                    "NFeConsultaQR": "http://homologacao.sefaz.to.gov.br/nfce/qrcode",
                    "urlChave": "www.sefaz.to.gov.br/nfce/consulta"
                },
                "producao": {
                    ...extras.SVRS.producao,
                    "NFeConsultaQR": "http://www.sefaz.to.gov.br/nfce/qrcode",
                    "urlChave": "www.sefaz.to.gov.br/nfce/consulta"
                }
            };
        case 'SVRS':
            return extras.SVRS;
        default:
            throw new Error('Autorizador não encontrado!');
    }
};
export default { eventos };
