import { Make, Tools } from "../dist/index.js"
import fs from "fs";

let myTools = new Tools({ //Configuração de habiente e sistema
    mod: '55',
    tpAmb: 2,
    UF: 'MT',
    versao: '4.00',

    //Optativo: Leia sobre Requisitos.
    xmllint: `../libs/libxml2-2.9.3-win32-x86_64/bin/xmllint.exe`,
    openssl: `../libs/openssl-3.5.0.win86/bin/openssl.exe`
}, { //Certificado digital
    pfx: '../certificado.pfx',
    senha: fs.readFileSync('../senha.txt', { encoding: "utf8" }),
});

let NFe = new Make();
NFe.tagInfNFe({ Id: null, versao: '4.00' });
NFe.tagIde({
    cUF: "51",
    cNF: "00002023",
    natOp: "VENDA",
    mod: "55",
    serie: "0",
    nNF: "248",
    dhEmi: NFe.formatData(),
    tpNF: "1",
    idDest: "1",
    cMunFG: "5106257",
    tpImp: "1",
    tpEmis: "1",
    cDV: "1",
    tpAmb: "2",
    finNFe: "1",
    indFinal: "0",
    indPres: "1",
    indIntermed: "0",
    procEmi: "0",
    verProc: "4.13"
});
NFe.tagEmit({
    CNPJ: "47506306000188",
    xNome: "47.506.306 KALMON VALADAO TAVARES",
    xFant: "GUARA DEV",
    IE: "139551956",
    CRT: "1"
});
NFe.tagEnderEmit({
    xLgr: "AV PARA",
    nro: "138",
    xBairro: "UNIAO",
    cMun: "5106257",
    xMun: "Nova Xavantina",
    UF: "MT",
    CEP: "78690000",
    cPais: "1058",
    xPais: "BRASIL",
    fone: "66981352912"
});
NFe.tagDest({
    CPF: "04079907125",
    xNome: "ADELMO CARLOS CIQUEIRA SILVA",
    indIEDest: "2",
});
NFe.tagEnderDest({
    xLgr: "RUA DAS SAMAMBAIAS",
    nro: "144",
    xBairro: "PARQUE ELDORADO",
    cMun: "5107040",
    xMun: "PRIMAVERA DO LESTE",
    UF: "MT",
    CEP: "78850000",
    cPais: "1058",
    xPais: "BRASIL"
});
NFe.tagProd([
    {
        cProd: "126",
        cEAN: "SEM GTIN",
        xProd: "CABOS MICROFONE DMX XR CANON BALANCEADO 20 METROS",
        NCM: "85044010",
        CFOP: "5102",
        uCom: "UNID",
        qCom: "3.0000",
        vUnCom: "132.0000000000",
        vProd: "396.00",
        cEANTrib: "SEM GTIN",
        uTrib: "UNID",
        qTrib: "3.0000",
        vUnTrib: "132.0000000000",
        indTot: "1"
    },
    {
        cProd: "129",
        cEAN: "SEM GTIN",
        xProd: "CABO P2 PARA P10 CELULAR MESA DE SOM CAIXA DE SOM 25 METRO",
        NCM: "85044010",
        CFOP: "5102",
        uCom: "UNID",
        qCom: "2.0000",
        vUnCom: "218.0000000000",
        vProd: "436.00",
        cEANTrib: "SEM GTIN",
        uTrib: "UNID",
        qTrib: "2.0000",
        vUnTrib: "218.0000000000",
        indTot: "1",
    },
    {
        "cProd": 127,
        "cEAN": "SEM GTIN",
        "xProd": "CABO DE MICROFONE XLR FEMEA PARA P10 MONO 20 METROS CIRILO CABOS",
        "NCM": 85044010,
        "CFOP": 5102,
        "uCom": "UNID",
        "qCom": 2,
        "vUnCom": 185,
        "vProd": 370,
        "cEANTrib": "SEM GTIN",
        "uTrib": "UNID",
        "qTrib": 2,
        "vUnTrib": 185,
        "vDesc": 38,
        "indTot": 1
    },
    {
        "cProd": 128,
        "cEAN": "SEM GTIN",
        "xProd": "CABO DE AUDIO P10 X P10 MONO BLINDADO 5 METROS",
        "NCM": 85044010,
        "CFOP": 5102,
        "uCom": "UNID",
        "qCom": 2,
        "vUnCom": 18,
        "vProd": 36,
        "cEANTrib": "SEM GTIN",
        "uTrib": "UNID",
        "qTrib": 2,
        "vUnTrib": 18,
        "indTot": 1
    }
]);

//Setor o imposto de cada produto.
[0, 1, 2, 3].map((value, index) => {
    NFe.tagProdICMSSN(index, { orig: "0", CSOSN: "400" })
    NFe.tagProdPIS(index, { CST: "49", qBCProd: "0.0000", vAliqProd: "0.0000", vPIS: "0.00" })
    NFe.tagProdCOFINS(index, { CST: "49", qBCProd: "0.0000", vAliqProd: "0.0000", vCOFINS: "0.00" })
});
NFe.tagICMSTot();
NFe.tagTransp({ modFrete: 9 });
NFe.tagDetPag([{ indPag: 0, tPag: 17, vPag: "1200.00" }]);
NFe.tagTroco("0.00");
NFe.tagInfRespTec({ CNPJ: "47506306000188", xContato: "Guara Dev", email: "admin@guaradev.com", fone: "5566999638922" })
fs.writeFileSync("testes/nfe.xml", NFe.xml(), { encoding: "utf-8" });

//NFe.xml() = retorna o XML gerado ate o momento.
// myTools.xmlSign(..) = Assina o xml utlizando o certificado declarado em new Tools.
myTools.xmlSign(NFe.xml()).then(async xmlSign => {
    fs.writeFileSync("testes/nfe_sign.xml", xmlSign, { encoding: "utf-8" });
    myTools.sefazEnviaLote(xmlSign, { indSinc: 1 }).then(res => {
        console.log(res)
    })
}).catch(err => {
    console.log(err)
})

/*
myTools.sefazStatus().then(res => {
    console.log(res)
});
*/