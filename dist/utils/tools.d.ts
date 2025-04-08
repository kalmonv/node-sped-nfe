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
    sefazEnviaLote(xml: string, data?: {
        idLote: number;
        indSinc: number;
        compactar: boolean;
    }): Promise<unknown>;
    xmlSign(xmlJSON: string, data: any): Promise<unknown>;
    xml2json(xml: string): Promise<object>;
    json2xml(obj: object): Promise<string>;
    getCertificado(): Promise<unknown>;
    sefazStatus(): Promise<unknown>;
}
export { Tools };
