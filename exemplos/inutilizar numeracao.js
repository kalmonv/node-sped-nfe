import { Tools } from "node-sped-nfe"
import fs from "fs";

let myTools = new Tools({ //Configuração de habiente e sistema
    mod: '55',
    tpAmb: 1,
    UF: 'MT',
    versao: "4.00",
    CNPJ: "00000000000"
}, { //Certificado digital
    pfx: '../certificado.pfx', // Buffer | String
    senha: fs.readFileSync('../senha.txt', { encoding: "utf8" }),
});

myTools.sefazInutiliza({nSerie:0, nIni:1, nFin:1, xJust:"TESDE DE INUTILIZAÇÃO"}).then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
});