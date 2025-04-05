/*
    NFe Producao: https://www.nfe.fazenda.gov.br/portal/webservices.aspx
    NFe Homologacao: https://hom.nfe.fazenda.gov.br/portal/webServices.aspx
*/
const urlServicos = {
    "51": {
        "nome": "Mato Grosso",
        "mod_65": {
            "NFeAutorizacao": {
                "producao": "https://nfce.sefaz.mt.gov.br/nfcews/services/NfeAutorizacao4",
                "homologacao": "https://homologacao.sefaz.mt.gov.br/nfcews/services/NfeAutorizacao4"
            },
            "NfeStatusServico": {
                "producao": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/NfeStatusServico4?wsdl",
                "homologacao": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/NfeStatusServico4?wsdl"
            }
        },
        "mod_55": {
            "NFeAutorizacao": {
                "producao": "https://nfe.sefaz.mt.gov.br/nfews/v2/services/NfeAutorizacao4",
                "homologacao": "https://homologacao.sefaz.mt.gov.br/nfews/v2/services/NfeAutorizacao4"
            },
            "NfeStatusServico": {
                "producao": "https://nfce.sefaz.mt.gov.br/nfcews/services/NfeStatusServico4",
                "homologacao": "https://homologacao.sefaz.mt.gov.br/nfcews/services/NfeStatusServico4"
            },

        },
    }
};

export { urlServicos }