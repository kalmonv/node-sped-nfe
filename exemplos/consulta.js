import { Tools } from "../dist/index.js"
import fs from "fs";

let myTools = new Tools({ //Configuração de habiente e sistema
    mod: '55',
    tpAmb: 1,
    UF: 'MT',
    versao: "4.00",

    //Optativo: Leia sobre Requisitos.
    xmllint: `../libxml2-2.9.3-win32-x86_64/bin/xmllint.exe`
}, { //Certificado digital
    pfx: '../certificado.pfx',
    senha: fs.readFileSync('../senha.txt', { encoding: "utf8" }),
});

myTools.consultarNFe("CHAVE DA NFE").then(res => {
    console.log(res);
})