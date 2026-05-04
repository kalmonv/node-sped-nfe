import event55 from "./webservices/mod55.js"
import event65 from "./webservices/mod65.js"

function urlEventos(UF: string, versao: string): any {
    if (versao !== "4.00") throw `Versão incompativel! Tools({...versao:${versao}})`;

    return {
        get mod65() { return event65.eventos(UF); },
        get mod55() { return event55.eventos(UF); }
    };
}

export { urlEventos }