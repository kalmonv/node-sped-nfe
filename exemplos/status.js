import { Tools } from "../dist/index.js"
import fs from "fs";

let myTools = new Tools({ //Configuração de habiente e sistema
    mod: '65',
    tpAmb: 1,
    UF: 'MT',
    versao: "4.00",


    //Optativo: Leia sobre Requisitos.
    xmllint: `../libs/libxml2-2.9.3-win32-x86_64/bin/xmllint.exe`,
    openssl: `../libs/openssl-3.5.0.win86/bin/openssl.exe`
}, { //Certificado digital
    pfx: '../certificado.pfx', // Buffer | String
    senha: fs.readFileSync('../senha.txt', { encoding: "utf8" }),
});

myTools.sefazStatus().then(res => {
    console.log(res)
}).catch(err=>{
    console.log(err)
})