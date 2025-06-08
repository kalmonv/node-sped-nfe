declare const cUF2UF: any, UF2cUF: any;
declare const xml2json: (xml: string) => Promise<object>;
declare const json2xml: (obj: object) => Promise<string>;
declare const formatData: (dataUsr?: Date) => string;
declare const docZip: (xml: string, retorno?: string) => Promise<unknown>;
declare const certInfo: (pfx: string, senha: string) => Promise<unknown>;
export { cUF2UF, UF2cUF, json2xml, xml2json, formatData, docZip, certInfo };
