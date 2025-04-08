declare class Tools {
    #private;
    constructor(config?: {
        mod: string;
        xmllint: string;
        cUF: string;
        tpAmb: number;
    }, certificado?: {
        pfx: string;
        senha: string;
    });
    teste(): Promise<object>;
    sefazEnviaLote(xml: string, data?: any): Promise<string>;
    xmlSign(xmlJSON: string, data?: any): Promise<string>;
    xml2json(xml: string): Promise<object>;
    json2xml(obj: object): Promise<string>;
    getCertificado(): Promise<unknown>;
    sefazStatus(): Promise<unknown>;
}
export { Tools };
