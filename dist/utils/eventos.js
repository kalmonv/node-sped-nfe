/*
    NFe Producao: https://www.nfe.fazenda.gov.br/portal/webservices.aspx
    NFe Homologacao: https://hom.nfe.fazenda.gov.br/portal/webServices.aspx
*/
const urlServicos = {
    "11": {
        "nome": "Rondônia",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefin.ro.gov.br/NFeAutorizacao/NFeAutorizacao.asmx",
                "homologacao": "https://nfe-homologacao.sefin.ro.gov.br/NFeAutorizacao/NFeAutorizacao.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefin.ro.gov.br/NFeStatusServico/NFeStatusServico.asmx",
                "homologacao": "https://nfe-homologacao.sefin.ro.gov.br/NFeStatusServico/NFeStatusServico.asmx"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefin.ro.gov.br/NFeAutorizacao/NFeAutorizacao.asmx",
                "homologacao": "https://nfce-homologacao.sefin.ro.gov.br/NFeAutorizacao/NFeAutorizacao.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefin.ro.gov.br/NFeStatusServico/NFeStatusServico.asmx",
                "homologacao": "https://nfce-homologacao.sefin.ro.gov.br/NFeStatusServico/NFeStatusServico.asmx"
            },
            "NFeConsulta": {
                "producao": "http://www.sefin.ro.gov.br/nfce/consulta",
                "homologacao": "http://www.sefin.ro.gov.br/nfce/consulta"
            }
        }
    },
    "12": {
        "nome": "Acre",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "homologacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx",
                "homologacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "homologacao": "https://hom.nfce.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx",
                "homologacao": "https://hom.nfce.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx"
            },
            "NFeConsulta": {
                "producao": "http://www.sefaznet.ac.gov.br/nfce/consulta",
                "homologacao": "http://www.sefaznet.ac.gov.br/nfce/consulta"
            }
        }
    },
    "13": {
        "nome": "Amazonas",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefaz.am.gov.br/services2/services/NfeAutorizacao4",
                "homologacao": "https://homnfe.sefaz.am.gov.br/services2/services/NfeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefaz.am.gov.br/services2/services/NfeStatusServico4",
                "homologacao": "https://homnfe.sefaz.am.gov.br/services2/services/NfeStatusServico4"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefaz.am.gov.br/nfce-services/services/NfeAutorizacao4",
                "homologacao": "https://homnfce.sefaz.am.gov.br/nfce-services/services/NfeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefaz.am.gov.br/nfce-services/services/NfeStatusServico4",
                "homologacao": "https://homnfce.sefaz.am.gov.br/nfce-services/services/NfeStatusServico4"
            },
            "NFeConsulta": {
                "producao": "http://www.sefaz.am.gov.br/nfce/consulta",
                "homologacao": "http://www.sefaz.am.gov.br/nfce/consulta"
            }
        }
    },
    "14": {
        "nome": "Roraima",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefaz.rr.gov.br/NFeAutorizacao/NFeAutorizacao.asmx",
                "homologacao": "https://hom.nfe.sefaz.rr.gov.br/NFeAutorizacao/NFeAutorizacao.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefaz.rr.gov.br/NFeStatusServico/NFeStatusServico.asmx",
                "homologacao": "https://hom.nfe.sefaz.rr.gov.br/NFeStatusServico/NFeStatusServico.asmx"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefaz.rr.gov.br/NFeAutorizacao/NFeAutorizacao.asmx",
                "homologacao": "https://hom.nfce.sefaz.rr.gov.br/NFeAutorizacao/NFeAutorizacao.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefaz.rr.gov.br/NFeStatusServico/NFeStatusServico.asmx",
                "homologacao": "https://hom.nfce.sefaz.rr.gov.br/NFeStatusServico/NFeStatusServico.asmx"
            },
            "NFeConsulta": {
                "producao": "http://www.sefaz.rr.gov.br/nfce/consulta",
                "homologacao": "http://www.sefaz.rr.gov.br/nfce/consulta"
            }
        }
    },
    "15": {
        "nome": "Pará",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefa.pa.gov.br/NFeAutorizacao/NFeAutorizacao.asmx",
                "homologacao": "https://homologacao.sefa.pa.gov.br/NFeAutorizacao/NFeAutorizacao.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefa.pa.gov.br/NFeStatusServico/NFeStatusServico.asmx",
                "homologacao": "https://homologacao.sefa.pa.gov.br/NFeStatusServico/NFeStatusServico.asmx"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefa.pa.gov.br/NFeAutorizacao/NFeAutorizacao.asmx",
                "homologacao": "https://homologacao.sefa.pa.gov.br/NFeAutorizacao/NFeAutorizacao.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefa.pa.gov.br/NFeStatusServico/NFeStatusServico.asmx",
                "homologacao": "https://homologacao.sefa.pa.gov.br/NFeStatusServico/NFeStatusServico.asmx"
            },
            "NFeConsulta": {
                "producao": "http://www.sefa.pa.gov.br/nfce/consulta",
                "homologacao": "http://www.sefa.pa.gov.br/nfce/consulta"
            }
        }
    },
    "16": {
        "nome": "Amapá",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "homologacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx",
                "homologacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "homologacao": "https://hom.nfce.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx",
                "homologacao": "https://hom.nfce.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx"
            },
            "NFeConsulta": {
                "producao": "http://www.sefaz.ap.gov.br/nfce/consulta",
                "homologacao": "http://www.sefaz.ap.gov.br/nfce/consulta"
            }
        }
    },
    "17": {
        "nome": "Pará",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "homologacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx",
                "homologacao": "https://hom.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "homologacao": "https://hom.nfce.sefazvirtual.fazenda.gov.br/NFeAutorizacao4/NFeAutorizacao4.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx",
                "homologacao": "https://hom.nfce.sefazvirtual.fazenda.gov.br/NFeStatusServico4/NFeStatusServico4.asmx"
            },
            "NFeConsulta": {
                "producao": "http://www.sefaz.to.gov.br/nfce/consulta",
                "homologacao": "http://homologacao.sefaz.to.gov.br/nfce/consulta.jsf"
            }
        }
    },
    "21": {
        "nome": "Maranhão",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefaz.ma.gov.br/ws/NFeAutorizacao4",
                "homologacao": "https://hom.nfe.sefaz.ma.gov.br/ws/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefaz.ma.gov.br/ws/NFeStatusServico4",
                "homologacao": "https://hom.nfe.sefaz.ma.gov.br/ws/NFeStatusServico4"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefaz.ma.gov.br/ws/NFeAutorizacao4",
                "homologacao": "https://hom.nfce.sefaz.ma.gov.br/ws/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefaz.ma.gov.br/ws/NFeStatusServico4",
                "homologacao": "https://hom.nfce.sefaz.ma.gov.br/ws/NFeStatusServico4"
            },
            "NFeConsulta": {
                "producao": "http://www.sefaz.ma.gov.br/nfce/consulta",
                "homologacao": "http://www.sefaz.ma.gov.br/nfce/consulta"
            }
        }
    },
    "22": {
        "nome": "Piauí",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefaz.pi.gov.br/nfeweb/services/NFeAutorizacao4",
                "homologacao": "https://homologacao.sefaz.pi.gov.br/nfeweb/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefaz.pi.gov.br/nfeweb/services/NFeStatusServico4",
                "homologacao": "https://homologacao.sefaz.pi.gov.br/nfeweb/services/NFeStatusServico4"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefaz.pi.gov.br/nfceweb/services/NFeAutorizacao4",
                "homologacao": "https://homologacao.sefaz.pi.gov.br/nfceweb/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefaz.pi.gov.br/nfceweb/services/NFeStatusServico4",
                "homologacao": "https://homologacao.sefaz.pi.gov.br/nfceweb/services/NFeStatusServico4"
            },
            "NFeConsulta": {
                "producao": "http://www.sefaz.pi.gov.br/nfce/consulta",
                "homologacao": "http://www.sefaz.pi.gov.br/nfce/consulta"
            }
        }
    },
    "23": {
        "nome": "Ceará",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefaz.ce.gov.br/nfe4/services/NFeAutorizacao4",
                "homologacao": "https://nfeh.sefaz.ce.gov.br/nfe4/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefaz.ce.gov.br/nfe4/services/NFeStatusServico4",
                "homologacao": "https://nfeh.sefaz.ce.gov.br/nfe4/services/NFeStatusServico4"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefaz.ce.gov.br/nfce4/services/NFeAutorizacao4",
                "homologacao": "https://nfceh.sefaz.ce.gov.br/nfce4/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefaz.ce.gov.br/nfce4/services/NFeStatusServico4",
                "homologacao": "https://nfceh.sefaz.ce.gov.br/nfce4/services/NFeStatusServico4"
            },
            "NFeConsulta": {
                "producao": "http://www.sefaz.ce.gov.br/nfce/consulta",
                "homologacao": "http://www.sefaz.ce.gov.br/nfce/consulta"
            }
        }
    },
    "24": {
        "nome": "Rio Grande do Norte",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.set.rn.gov.br/WSNFE/NFeAutorizacao4.asmx",
                "homologacao": "https://hom.nfe.set.rn.gov.br/WSNFE/NFeAutorizacao4.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.set.rn.gov.br/WSNFE/NFeStatusServico4.asmx",
                "homologacao": "https://hom.nfe.set.rn.gov.br/WSNFE/NFeStatusServico4.asmx"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.set.rn.gov.br/WSNFE/NFeAutorizacao4.asmx",
                "homologacao": "https://hom.nfce.set.rn.gov.br/WSNFE/NFeAutorizacao4.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.set.rn.gov.br/WSNFE/NFeStatusServico4.asmx",
                "homologacao": "https://hom.nfce.set.rn.gov.br/WSNFE/NFeStatusServico4.asmx"
            },
            "NFeConsulta": {
                "producao": "http://www.set.rn.gov.br/nfce/consulta",
                "homologacao": "http://www.set.rn.gov.br/nfce/consulta"
            }
        }
    },
    "25": {
        "nome": "Paraíba",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefaz.pb.gov.br/nfe/services/NFeAutorizacao4",
                "homologacao": "https://homologacao.nfe.sefaz.pb.gov.br/nfe/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefaz.pb.gov.br/nfe/services/NFeStatusServico4",
                "homologacao": "https://homologacao.nfe.sefaz.pb.gov.br/nfe/services/NFeStatusServico4"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefaz.pb.gov.br/nfce/services/NFeAutorizacao4",
                "homologacao": "https://homologacao.nfce.sefaz.pb.gov.br/nfce/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefaz.pb.gov.br/nfce/services/NFeStatusServico4",
                "homologacao": "https://homologacao.nfce.sefaz.pb.gov.br/nfce/services/NFeStatusServico4"
            },
            "NFeConsulta": {
                "producao": "http://www.receita.pb.gov.br/nfce/consulta",
                "homologacao": "http://www.receita.pb.gov.br/nfcehom"
            }
        }
    },
    "26": {
        "nome": "Pernambuco",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeAutorizacao4",
                "homologacao": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefaz.pe.gov.br/nfe-service/services/NFeStatusServico4",
                "homologacao": "https://nfehomolog.sefaz.pe.gov.br/nfe-service/services/NFeStatusServico4"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefaz.pe.gov.br/nfce-service/services/NFeAutorizacao4",
                "homologacao": "https://nfcehomolog.sefaz.pe.gov.br/nfce-service/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefaz.pe.gov.br/nfce-service/services/NFeStatusServico4",
                "homologacao": "https://nfcehomolog.sefaz.pe.gov.br/nfce-service/services/NFeStatusServico4"
            },
            "NFeConsulta": {
                "producao": "http://nfce.sefaz.pe.gov.br/nfce/consulta",
                "homologacao": "http://nfce.sefaz.pe.gov.br/nfce/consulta"
            }
        }
    },
    "27": {
        "nome": "Alagoas",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefaz.al.gov.br/nfe/services/NFeAutorizacao4",
                "homologacao": "https://nfehomolog.sefaz.al.gov.br/nfe/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefaz.al.gov.br/nfe/services/NFeStatusServico4",
                "homologacao": "https://nfehomolog.sefaz.al.gov.br/nfe/services/NFeStatusServico4"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefaz.al.gov.br/nfce/services/NFeAutorizacao4",
                "homologacao": "https://nfcehomolog.sefaz.al.gov.br/nfce/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefaz.al.gov.br/nfce/services/NFeStatusServico4",
                "homologacao": "https://nfcehomolog.sefaz.al.gov.br/nfce/services/NFeStatusServico4"
            },
            "NFeConsulta": {
                "producao": "http://www.sefaz.al.gov.br/nfce/consulta",
                "homologacao": "http://www.sefaz.al.gov.br/nfce/consulta"
            }
        }
    },
    "28": {
        "nome": "Sergipe",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefaz.se.gov.br/nfe/services/NFeAutorizacao4",
                "homologacao": "https://nfehomolog.sefaz.se.gov.br/nfe/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefaz.se.gov.br/nfe/services/NFeStatusServico4",
                "homologacao": "https://nfehomolog.sefaz.se.gov.br/nfe/services/NFeStatusServico4"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefaz.se.gov.br/nfce/services/NFeAutorizacao4",
                "homologacao": "https://nfcehomolog.sefaz.se.gov.br/nfce/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefaz.se.gov.br/nfce/services/NFeStatusServico4",
                "homologacao": "https://nfcehomolog.sefaz.se.gov.br/nfce/services/NFeStatusServico4"
            },
            "NFeConsulta": {
                "producao": "http://www.nfce.se.gov.br/nfce/consulta",
                "homologacao": "http://www.hom.nfe.se.gov.br/nfce/consulta"
            }
        }
    },
    "29": {
        "nome": "Bahia",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefaz.ba.gov.br/webservices/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "homologacao": "https://hnfe.sefaz.ba.gov.br/webservices/NFeAutorizacao4/NFeAutorizacao4.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefaz.ba.gov.br/webservices/NFeStatusServico4/NFeStatusServico4.asmx",
                "homologacao": "https://hnfe.sefaz.ba.gov.br/webservices/NFeStatusServico4/NFeStatusServico4.asmx"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefaz.ba.gov.br/webservices/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "homologacao": "https://hnfce.sefaz.ba.gov.br/webservices/NFeAutorizacao4/NFeAutorizacao4.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefaz.ba.gov.br/webservices/NFeStatusServico4/NFeStatusServico4.asmx",
                "homologacao": "https://hnfce.sefaz.ba.gov.br/webservices/NFeStatusServico4/NFeStatusServico4.asmx"
            },
            "NFeConsulta": {
                "producao": "http://www.sefaz.ba.gov.br/nfce/consulta",
                "homologacao": "http://hinternet.sefaz.ba.gov.br/nfce/consulta"
            }
        }
    },
    "31": {
        "nome": "Minas Gerais",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.fazenda.mg.gov.br/nfe/services/NFeAutorizacao4",
                "homologacao": "https://hnfe.fazenda.mg.gov.br/nfe/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.fazenda.mg.gov.br/nfe/services/NFeStatusServico4",
                "homologacao": "https://hnfe.fazenda.mg.gov.br/nfe/services/NFeStatusServico4"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.fazenda.mg.gov.br/nfce/services/NFeAutorizacao4",
                "homologacao": "https://hnfce.fazenda.mg.gov.br/nfce/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.fazenda.mg.gov.br/nfce/services/NFeStatusServico4",
                "homologacao": "https://hnfce.fazenda.mg.gov.br/nfce/services/NFeStatusServico4"
            },
            "NFeConsulta": {
                "producao": "http://nfce.fazenda.mg.gov.br/portalnfce",
                "homologacao": "http://hinternet.sefaz.ba.gov.br/nfce/consulta"
            }
        }
    },
    "32": {
        "nome": "Espírito Santo",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefaz.es.gov.br/ws/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "homologacao": "https://homologacao.nfe.sefaz.es.gov.br/ws/NFeAutorizacao4/NFeAutorizacao4.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefaz.es.gov.br/ws/NFeStatusServico4/NFeStatusServico4.asmx",
                "homologacao": "https://homologacao.nfe.sefaz.es.gov.br/ws/NFeStatusServico4/NFeStatusServico4.asmx"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefaz.es.gov.br/ws/NFeAutorizacao4/NFeAutorizacao4.asmx",
                "homologacao": "https://homologacao.nfce.sefaz.es.gov.br/ws/NFeAutorizacao4/NFeAutorizacao4.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefaz.es.gov.br/ws/NFeStatusServico4/NFeStatusServico4.asmx",
                "homologacao": "https://homologacao.nfce.sefaz.es.gov.br/ws/NFeStatusServico4/NFeStatusServico4.asmx"
            },
            "NFeConsulta": {
                "producao": "http://www.sefaz.es.gov.br/nfce/consulta",
                "homologacao": "http://www.sefaz.es.gov.br/nfce/consulta"
            }
        }
    },
    "33": {
        "nome": "Rio de Janeiro",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.fazenda.rj.gov.br/nfe/services/NFeAutorizacao4",
                "homologacao": "https://homologacao.nfe.fazenda.rj.gov.br/nfe/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.fazenda.rj.gov.br/nfe/services/NFeStatusServico4",
                "homologacao": "https://homologacao.nfe.fazenda.rj.gov.br/nfe/services/NFeStatusServico4"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.fazenda.rj.gov.br/nfce/services/NFeAutorizacao4",
                "homologacao": "https://homologacao.nfce.fazenda.rj.gov.br/nfce/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.fazenda.rj.gov.br/nfce/services/NFeStatusServico4",
                "homologacao": "https://homologacao.nfce.fazenda.rj.gov.br/nfce/services/NFeStatusServico4"
            },
            "NFeConsulta": {
                "producao": "http://www.fazenda.rj.gov.br/nfce/consulta",
                "homologacao": "http://www.fazenda.rj.gov.br/nfce/consulta"
            }
        }
    },
    "35": {
        "nome": "São Paulo",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.fazenda.sp.gov.br/ws/nfeautorizacao4.asmx",
                "homologacao": "https://homologacao.nfe.fazenda.sp.gov.br/ws/nfeautorizacao4.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.fazenda.sp.gov.br/ws/nfestatusservico4.asmx",
                "homologacao": "https://homologacao.nfe.fazenda.sp.gov.br/ws/nfestatusservico4.asmx"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.fazenda.sp.gov.br/ws/nfeautorizacao4.asmx",
                "homologacao": "https://homologacao.nfce.fazenda.sp.gov.br/ws/nfeautorizacao4.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.fazenda.sp.gov.br/ws/nfestatusservico4.asmx",
                "homologacao": "https://homologacao.nfce.fazenda.sp.gov.br/ws/nfestatusservico4.asmx"
            },
            "NFeConsulta": {
                "producao": "https://www.nfce.fazenda.sp.gov.br/consulta",
                "homologacao": "https://www.homologacao.nfce.fazenda.sp.gov.br/consulta"
            }
        }
    },
    "41": {
        "nome": "Paraná",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefa.pr.gov.br/nfe/NFeAutorizacao4",
                "homologacao": "https://homologacao.nfe.sefa.pr.gov.br/nfe/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefa.pr.gov.br/nfe/NFeStatusServico4",
                "homologacao": "https://homologacao.nfe.sefa.pr.gov.br/nfe/NFeStatusServico4"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefa.pr.gov.br/nfce/NFeAutorizacao4",
                "homologacao": "https://homologacao.nfce.sefa.pr.gov.br/nfce/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefa.pr.gov.br/nfce/NFeStatusServico4",
                "homologacao": "https://homologacao.nfce.sefa.pr.gov.br/nfce/NFeStatusServico4"
            },
            "NFeConsulta": {
                "producao": "http://www.fazenda.pr.gov.br/nfce/consulta",
                "homologacao": "http://www.fazenda.pr.gov.br/nfce/consulta"
            }
        }
    },
    "42": {
        "nome": "Santa Catarina",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sef.sc.gov.br/nfe/services/NFeAutorizacao4",
                "homologacao": "https://homologacao.nfe.sef.sc.gov.br/nfe/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sef.sc.gov.br/nfe/services/NFeStatusServico4",
                "homologacao": "https://homologacao.nfe.sef.sc.gov.br/nfe/services/NFeStatusServico4"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sef.sc.gov.br/nfce/services/NFeAutorizacao4",
                "homologacao": "https://homologacao.nfce.sef.sc.gov.br/nfce/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sef.sc.gov.br/nfce/services/NFeStatusServico4",
                "homologacao": "https://homologacao.nfce.sef.sc.gov.br/nfce/services/NFeStatusServico4"
            },
            "urlChave": "http://www.sef.sc.gov.br/nfce/consulta"
        }
    },
    "43": {
        "nome": "Rio Grande do Sul",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefazrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "homologacao": "https://homologacao.nfe.sefazrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "homologacao": "https://homologacao.nfe.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefazrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx",
                "homologacao": "https://homologacao.nfce.sefazrs.rs.gov.br/ws/NfeAutorizacao/NFeAutorizacao4.asmx"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx",
                "homologacao": "https://homologacao.nfce.sefazrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx"
            },
            "NFeConsulta": {
                "producao": "http://www.sefaz.rs.gov.br/nfce/consulta",
                "homologacao": "http://www.sefaz.rs.gov.br/nfce/consulta"
            }
        }
    },
    "50": {
        "nome": "Mato Grosso do Sul",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefaz.ms.gov.br/ws/NFeAutorizacao4",
                "homologacao": "https://hom.nfe.sefaz.ms.gov.br/ws/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefaz.ms.gov.br/ws/NFeStatusServico4",
                "homologacao": "https://hom.nfe.sefaz.ms.gov.br/ws/NFeStatusServico4"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefaz.ms.gov.br/ws/NFeAutorizacao4",
                "homologacao": "https://hom.nfce.sefaz.ms.gov.br/ws/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefaz.ms.gov.br/ws/NFeStatusServico4",
                "homologacao": "https://hom.nfce.sefaz.ms.gov.br/ws/NFeStatusServico4"
            },
            "NFeConsulta": {
                "producao": "http://www.dfe.ms.gov.br/nfce/consulta",
                "homologacao": "http://www.dfe.ms.gov.br/nfce/consulta"
            }
        }
    },
    "51": {
        "nome": "Mato Grosso",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/NfeAutorizacao4",
                "homologacao": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/NfeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/NfeStatusServico4",
                "homologacao": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/NfeStatusServico4"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefaz.mt.gov.br/nfcews/services/NfeAutorizacao4",
                "homologacao": "https://homologacao.sefaz.mt.gov.br/nfcews/services/NfeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefaz.mt.gov.br/nfcews/services/NfeStatusServico4",
                "homologacao": "https://homologacao.sefaz.mt.gov.br/nfcews/services/NfeStatusServico4"
            },
            "NFeConsulta": {
                "producao": "https://www.sefaz.mt.gov.br/nfce/consultanfce",
                "homologacao": "https://homologacao.sefaz.mt.gov.br/nfce/consultanfce"
            }
        }
    },
    "52": {
        "nome": "Goiás",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefaz.go.gov.br/nfe/services/NFeAutorizacao4",
                "homologacao": "https://homolog.sefaz.go.gov.br/nfe/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.sefaz.go.gov.br/nfe/services/NFeStatusServico4",
                "homologacao": "https://homolog.sefaz.go.gov.br/nfe/services/NFeStatusServico4"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefaz.go.gov.br/nfe/services/NFeAutorizacao4",
                "homologacao": "https://homolog.sefaz.go.gov.br/nfe/services/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.sefaz.go.gov.br/nfe/services/NFeStatusServico4",
                "homologacao": "https://homolog.sefaz.go.gov.br/nfe/services/NFeStatusServico4"
            },
            "NFeConsulta": {
                "producao": "http://www.sefaz.go.gov.br/nfce/consulta",
                "homologacao": "http://www.sefaz.go.gov.br/nfce/consulta"
            }
        }
    },
    "53": {
        "nome": "Distrito Federal",
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.fazenda.df.gov.br/ws/NFeAutorizacao4",
                "homologacao": "https://homolog.nfe.fazenda.df.gov.br/ws/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfe.fazenda.df.gov.br/ws/NFeStatusServico4",
                "homologacao": "https://homolog.nfe.fazenda.df.gov.br/ws/NFeStatusServico4"
            }
        },
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.fazenda.df.gov.br/ws/NFeAutorizacao4",
                "homologacao": "https://homolog.nfce.fazenda.df.gov.br/ws/NFeAutorizacao4"
            },
            "NFeStatusServico": {
                "producao": "https://nfce.fazenda.df.gov.br/ws/NFeStatusServico4",
                "homologacao": "https://homolog.nfce.fazenda.df.gov.br/ws/NFeStatusServico4"
            },
            "NFeConsulta": {
                "producao": "http://www.fazenda.df.gov.br/nfce/consulta",
                "homologacao": "http://www.fazenda.df.gov.br/nfce/consulta"
            }
        }
    }
};
const qrCodeUrls = {
    "producao": {
        "12": { "urlChave": "www.sefaznet.ac.gov.br/nfce/consulta", "urlQRCode": "http://www.sefaznet.ac.gov.br/nfce/qrcode" },
        "27": { "urlChave": "www.sefaz.al.gov.br/nfce/consulta", "urlQRCode": "http://nfce.sefaz.al.gov.br/QRCode/consultarNFCe.jsp" },
        "16": { "urlChave": "www.sefaz.ap.gov.br/nfce/consulta", "urlQRCode": "https://www.sefaz.ap.gov.br/nfce/nfcep.php" },
        "13": { "urlChave": "www.sefaz.am.gov.br/nfce/consulta", "urlQRCode": "http://sistemas.sefaz.am.gov.br/nfceweb/consultarNFCe.jsp" },
        "29": { "urlChave": "www.sefaz.ba.gov.br/nfce/consulta", "urlQRCode": "http://nfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx" },
        "23": { "urlChave": "www.sefaz.ce.gov.br/nfce/consulta", "urlQRCode": "http://nfce.sefaz.ce.gov.br/pages/ShowNFCe.html" },
        "53": { "urlChave": "www.fazenda.df.gov.br/nfce/consulta", "urlQRCode": "http://dec.fazenda.df.gov.br/ConsultarNFCe.aspx" },
        "32": { "urlChave": "www.sefaz.es.gov.br/nfce/consulta", "urlQRCode": "http://app.sefaz.es.gov.br/ConsultaNFCe/qrcode.aspx" },
        "52": { "urlChave": "www.sefaz.go.gov.br/nfce/consulta", "urlQRCode": "http://nfe.sefaz.go.gov.br/nfeweb/sites/nfce/danfeNFCe" },
        "21": { "urlChave": "www.sefaz.ma.gov.br/nfce/consulta", "urlQRCode": "http://www.nfce.sefaz.ma.gov.br/portal/consultarNFCe.jsp" },
        "31": { "urlChave": "http://nfce.fazenda.mg.gov.br/portalnfce", "urlQRCode": "https://nfce.fazenda.mg.gov.br/portalnfce/sistema/qrcode.xhtml" },
        "50": { "urlChave": "http://www.dfe.ms.gov.br/nfce/consulta", "urlQRCode": "http://www.dfe.ms.gov.br/nfce/qrcode" },
        "51": { "urlChave": "http://www.sefaz.mt.gov.br/nfce/consultanfce", "urlQRCode": "http://www.sefaz.mt.gov.br/nfce/consultanfce" },
        "15": { "urlChave": "www.sefa.pa.gov.br/nfce/consulta", "urlQRCode": "https://appnfc.sefa.pa.gov.br/portal/view/consultas/nfce/nfceForm.seam" },
        "25": { "urlChave": "www.receita.pb.gov.br/nfce/consulta", "urlQRCode": "http://www.receita.pb.gov.br/nfce" },
        "26": { "urlChave": "nfce.sefaz.pe.gov.br/nfce/consulta", "urlQRCode": "http://nfce.sefaz.pe.gov.br/nfce-web/consultarNFCe" },
        "22": { "urlChave": "www.sefaz.pi.gov.br/nfce/consulta", "urlQRCode": "http://www.sefaz.pi.gov.br/nfce/qrcode" },
        "41": { "urlChave": "http://www.fazenda.pr.gov.br/nfce/consulta", "urlQRCode": "http://www.fazenda.pr.gov.br/nfce/qrcode/" },
        "33": { "urlChave": "www.fazenda.rj.gov.br/nfce/consulta", "urlQRCode": "http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode" },
        "24": { "urlChave": "www.set.rn.gov.br/nfce/consulta", "urlQRCode": "http://nfce.set.rn.gov.br/consultarNFCe.aspx" },
        "11": { "urlChave": "www.sefin.ro.gov.br/nfce/consulta", "urlQRCode": "http://www.nfce.sefin.ro.gov.br/consultanfce/consulta.jsp" },
        "43": { "urlChave": "www.sefaz.rs.gov.br/nfce/consulta", "urlQRCode": "https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx" },
        "14": { "urlChave": "www.sefaz.rr.gov.br/nfce/consulta", "urlQRCode": "https://www.sefaz.rr.gov.br/nfce/servlet/qrcode" },
        "28": { "urlChave": "http://www.nfce.se.gov.br/nfce/consulta", "urlQRCode": "http://www.nfce.se.gov.br/portal/consultarNFCe.jsp" },
        "35": { "urlChave": "https://www.nfce.fazenda.sp.gov.br/consulta", "urlQRCode": "https://www.nfce.fazenda.sp.gov.br/qrcode" },
        "17": { "urlChave": "www.sefaz.to.gov.br/nfce/consulta", "urlQRCode": "http://www.sefaz.to.gov.br/nfce/qrcode" }
    },
    "homologacao": {
        "12": { "urlChave": "www.sefaznet.ac.gov.br/nfce/consulta", "urlQRCode": "http://hml.sefaznet.ac.gov.br/nfce/qrcode" },
        "27": { "urlChave": "www.sefaz.al.gov.br/nfce/consulta", "urlQRCode": "http://nfce.sefaz.al.gov.br/QRCode/consultarNFCe.jsp" },
        "16": { "urlChave": "www.sefaz.ap.gov.br/nfce/consulta", "urlQRCode": "https://www.sefaz.ap.gov.br/nfcehml/nfce.php" },
        "13": { "urlChave": "https://sistemas.sefaz.am.gov.br/nfceweb-hom/formConsulta.do", "urlQRCode": "https://sistemas.sefaz.am.gov.br/nfceweb-hom/consultarNFCe.jsp" },
        "29": { "urlChave": "http://hinternet.sefaz.ba.gov.br/nfce/consulta", "urlQRCode": "http://hnfe.sefaz.ba.gov.br/servicos/nfce/modulos/geral/NFCEC_consulta_chave_acesso.aspx" },
        "23": { "urlChave": "www.sefaz.ce.gov.br/nfce/consulta", "urlQRCode": "http://nfceh.sefaz.ce.gov.br/pages/ShowNFCe.html" },
        "53": { "urlChave": "www.fazenda.df.gov.br/nfce/consulta", "urlQRCode": "http://dec.fazenda.df.gov.br/ConsultarNFCe.aspx" },
        "32": { "urlChave": "www.sefaz.es.gov.br/nfce/consulta", "urlQRCode": "http://homologacao.sefaz.es.gov.br/ConsultaNFCe/qrcode.aspx" },
        "52": { "urlChave": "http://www.nfce.go.gov.br/post/ver/214413/consulta-nfc-e-homologacao", "urlQRCode": "http://homolog.sefaz.go.gov.br/nfeweb/sites/nfce/danfeNFCe" },
        "21": { "urlChave": "www.sefaz.ma.gov.br/nfce/consulta", "urlQRCode": "http://www.hom.nfce.sefaz.ma.gov.br/portal/consultarNFCe.jsp" },
        "31": { "urlChave": "http://hnfce.fazenda.mg.gov.br/portalnfce", "urlQRCode": "https://nfce.fazenda.mg.gov.br/portalnfce/sistema/qrcode.xhtml" },
        "50": { "urlChave": "http://www.dfe.ms.gov.br/nfce/consulta", "urlQRCode": "http://www.dfe.ms.gov.br/nfce/qrcode" },
        "51": { "urlChave": "http://homologacao.sefaz.mt.gov.br/nfce/consultanfce", "urlQRCode": "http://homologacao.sefaz.mt.gov.br/nfce/consultanfce" },
        "15": { "urlChave": "www.sefa.pa.gov.br/nfce/consulta", "urlQRCode": "https://appnfc.sefa.pa.gov.br/portal-homologacao/view/consultas/nfce/nfceForm.seam" },
        "25": { "urlChave": "www.receita.pb.gov.br/nfcehom", "urlQRCode": "http://www.receita.pb.gov.br/nfcehom" },
        "26": { "urlChave": "nfce.sefaz.pe.gov.br/nfce/consulta", "urlQRCode": "http://nfcehomolog.sefaz.pe.gov.br/nfce-web/consultarNFCe" },
        "22": { "urlChave": "www.sefaz.pi.gov.br/nfce/consulta", "urlQRCode": "http://www.sefaz.pi.gov.br/nfce/qrcode" },
        "41": { "urlChave": "http://www.fazenda.pr.gov.br/nfce/consulta", "urlQRCode": "http://www.fazenda.pr.gov.br/nfce/qrcode/" },
        "33": { "urlChave": "www.fazenda.rj.gov.br/nfce/consulta", "urlQRCode": "http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode" },
        "24": { "urlChave": "www.set.rn.gov.br/nfce/consulta", "urlQRCode": "http://hom.nfce.set.rn.gov.br/consultarNFCe.aspx" },
        "11": { "urlChave": "www.sefin.ro.gov.br/nfce/consulta", "urlQRCode": "http://www.nfce.sefin.ro.gov.br/consultanfce/consulta.jsp" },
        "43": { "urlChave": "www.sefaz.rs.gov.br/nfce/consulta", "urlQRCode": "https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx" },
        "14": { "urlChave": "www.sefaz.rr.gov.br/nfce/consulta", "urlQRCode": "http://200.174.88.103:8080/nfce/servlet/qrcode" },
        "28": { "urlChave": "http://www.hom.nfe.se.gov.br/nfce/consulta", "urlQRCode": "http://www.hom.nfe.se.gov.br/portal/consultarNFCe.jsp" },
        "35": { "urlChave": "https://www.homologacao.nfce.fazenda.sp.gov.br/consulta", "urlQRCode": "https://www.homologacao.nfce.fazenda.sp.gov.br/qrcode" },
        "17": { "urlChave": "http://homologacao.sefaz.to.gov.br/nfce/consulta.jsf", "urlQRCode": "http://homologacao.sefaz.to.gov.br/nfce/qrcode" }
    }
};
export { urlServicos, qrCodeUrls };
