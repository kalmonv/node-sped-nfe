import { docZip, Tools } from "../dist/index.js"
import fs from "fs";

let myTools = new Tools({ //Configuração de habiente e sistema
    mod: '55',
    tpAmb: 1,
    UF: 'MT',
    versao: '4.00',
    CNPJ: "0000000000", // CNPJ/CPF DO TOMADOR

    //Optativo: Leia sobre Requisitos.
    xmllint: `../libs/libxml2-2.9.3-win32-x86_64/bin/xmllint.exe`
}, { //Certificado digital
    pfx: '../certificado.pfx', // Buffer | String
    senha: fs.readFileSync('../senha.txt', { encoding: "utf8" }),
});

// Busca XML da NFSe atraves da chave, para obter o conteudo completo da nota fiscal deve se fazer manifesto de 210210 - Ciência da Operação
myTools.sefazDistDFe({ chNFe: "0000000000000000000000000000000" }).then(res => {
    console.log(res) // XML contendo varios docZip
    docZip(res).then(res => { //Funçao que extrai XML do documento
        console.log(res) //[{xml, NSU, schema}]
    })
}).catch(err => {
    console.error(err)
});