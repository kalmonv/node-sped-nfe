/*
    NFe Producao: https://www.nfe.fazenda.gov.br/portal/webservices.aspx
    NFe Homologacao: https://hom.nfe.fazenda.gov.br/portal/webServices.aspx
*/
const urlServicos = {
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
            }
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
            }
        }
    }
};
export { urlServicos };
