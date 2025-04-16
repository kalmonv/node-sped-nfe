declare class Tools {
    #private;
    constructor(config?: {
        mod: string;
        xmllint: string;
        UF: string;
        tpAmb: number;
        CSC: string;
        CSCid: string;
        versao: string;
        timeout: number;
        openssl: string;
    }, certificado?: {
        pfx: string;
        senha: string;
    });
    sefazEnviaLote(xml: string, data?: any): Promise<string>;
    xmlSign(xmlJSON: string, data?: any): Promise<string>;
    xml2json(xml: string): Promise<object>;
    json2xml(obj: object): Promise<string>;
    getCertificado(): Promise<object>;
    consultarNFe(chNFe: string): Promise<string>;
    sefazStatus(): Promise<string>;
}
export { Tools };
