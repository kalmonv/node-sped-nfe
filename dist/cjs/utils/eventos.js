"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEventos = urlEventos;
const mod55_js_1 = __importDefault(require("./webservices/mod55.js"));
const mod65_js_1 = __importDefault(require("./webservices/mod65.js"));
function urlEventos(UF, versao) {
    if (versao !== "4.00")
        throw `Versão incompativel! Tools({...versao:${versao}})`;
    return {
        get mod65() { return mod65_js_1.default.eventos(UF); },
        get mod55() { return mod55_js_1.default.eventos(UF); }
    };
}
