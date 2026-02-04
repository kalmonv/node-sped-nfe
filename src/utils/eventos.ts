import event55 from "./webservices/mod55"
import event65 from "./webservices/mod65"

function urlEventos(mod: string, UF: string, versao: string): any {
    switch (`${versao}`) {
        case "4.00":
            switch (mod) {
                case "mod65":
                    return event65.eventos(UF)
                case "mod55":
                    return event55.eventos(UF)
                default:
                    throw `Modulo incompativel! Tools({...mod:${mod}})`;
                    break;
            }
        default:
            throw `Versão incompativel! Tools({...versao:${versao}})`;
            break;
    }
}

export { urlEventos }