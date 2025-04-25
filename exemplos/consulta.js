import { Tools } from "../dist/index.js"
import fs from "fs";

let myTools = new Tools({ //Configuração de habiente e sistema
    mod: '55',
    tpAmb: 1,
    UF: 'MT',
    versao: "4.00",

    //Optativo: Leia sobre Requisitos.
    xmllint: `../libs/libxml2-2.9.3-win32-x86_64/bin/xmllint.exe`,
    openssl: `../libs/openssl-3.5.0.win86/bin/openssl.exe`
}, { //Certificado digital
    pfx: '../certificado.pfx',
    senha: fs.readFileSync('../senha.txt', { encoding: "utf8" }),
});

myTools.consultarNFe("32250405570714000825550010245869211458123605").then(res => {
    console.log(res);
})