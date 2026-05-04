"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEventos = urlEventos;
const mod55_js_1 = __importDefault(require("./webservices/mod55.js"));
const mod65_js_1 = __importDefault(require("./webservices/mod65.js"));
function urlEventos(UF, versao) {
    switch (`${versao}`) {
        case "4.00":
            return {
                mod65: mod65_js_1.default.eventos(UF),
                mod55: mod55_js_1.default.eventos(UF)
            };
        default:
            throw `Versão incompativel! Tools({...versao:${versao}})`;
            break;
    }
}
