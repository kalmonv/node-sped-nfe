declare const cUF2UF: any, UF2cUF: any;
declare const xml2json: (xml: string) => Promise<object>;
declare const json2xml: (obj: object) => Promise<string>;
declare const formatData: (dataUsr?: Date) => string;
export { cUF2UF, UF2cUF, json2xml, xml2json, formatData };
