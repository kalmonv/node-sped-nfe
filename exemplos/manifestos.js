import { Tools } from "../dist/index.js"
import fs from "fs";

let myTools = new Tools({ //Configuração de habiente e sistema
    mod: '55',
    tpAmb: "1",
    UF: 'MT',
    versao: '4.00',
    CNPJ: "47506306000188", // CNPJ/CPF DO TOMADOR

    //Optativo: Leia sobre Requisitos.
    xmllint: `../libs/libxml2-2.9.3-win32-x86_64/bin/xmllint.exe`
}, { //Certificado digital
    pfx: '../certificado.pfx', // Buffer | String
    senha: fs.readFileSync('../senha.txt', { encoding: "utf8" }),
});

// 1. Manifestação - Confirmação
myTools.sefazEvento({ chNFe: "351701...", tpEvento: "210200" }).then(res => {
    console.log(res)
}).catch(err=>{
    console.error(err)
});

/* ---------------- EXEMPLOS DE OUTROS METODOS!
1. Ciência (210210), Confirmação (210200), Desconhecimento (210220) não precisam de campos extras
myTools.sefazEvento({ chNFe: "351701...", tpEvento: "210200" }).then(res => {
    console.log(res)
}).catch(err=>{
    console.error(err)
});

2. Cancelamento
myTools.sefazEvento({ chNFe: "351701...", tpEvento: "110111", nProt: "135230000000000", xJust: "Cancelamento por erro na emissão." }).then(res => {
    console.log(res)
}).catch(err=>{
    console.error(err)
});

3. Carta de Correção
myTools.sefazEvento({ chNFe: "351701...", tpEvento: "110110", xJust: "Corrigir a descrição do produto." }).then(res => {
    console.log(res)
}).catch(err=>{
    console.error(err)
});

4. Operação Não Realizada
myTools.sefazEvento({ chNFe: "351701...", tpEvento: "210240", xJust: "Entrega não realizada por recusa do destinatário." }).then(res => {
    console.log(res)
}).catch(err=>{
    console.error(err)
});
*/
