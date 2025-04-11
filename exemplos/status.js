import { Tools } from "../dist/index.js"
import fs from "fs";

let myTools = new Tools({ //Configuração de habiente e sistema
    mod: '65',
    tpAmb: 2,
    UF: 'MT',
    versao: "4.00",
    timeout: 1,

    //Optativo: Leia sobre Requisitos.
    xmllint: `../libxml2-2.9.3-win32-x86_64/bin/xmllint.exe`
}, { //Certificado digital
    pfx: '../certificado.pfx',
    senha: fs.readFileSync('../senha.txt', { encoding: "utf8" }),
});

myTools.sefazStatus().then(res => {
    console.log(res)
}).catch(err=>{
    console.log(err)
})