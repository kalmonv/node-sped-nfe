import event55 from "./webservices/mod55.js"
import event65 from "./webservices/mod65.js"

function urlEventos(UF: string, versao: string): any {
    switch (`${versao}`) {
        case "4.00":
            return {
                mod65: event65.eventos(UF),
                mod55: event55.eventos(UF)
            }
        default:
            throw `Versão incompativel! Tools({...versao:${versao}})`;
            break;
    }
}

export { urlEventos }