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
        openssl: null;
        CPF: string;
        CNPJ: string;
    }, certificado?: {
        pfx: string;
        senha: string;
    });
    sefazEnviaLote(xml: string, data?: {
        idLote?: 1;
        indSinc?: 0;
        compactar?: false;
    }): Promise<string>;
    xmlSign(xmlJSON: string, data?: any): Promise<string>;
    xml2json(xml: string): Promise<object>;
    json2xml(obj: object): Promise<string>;
    getCertificado(): Promise<object>;
    consultarNFe(chNFe: string): Promise<string>;
    sefazEvento({ chNFe, tpEvento, nProt, xJust, nSeqEvento, dhEvento }: {
        chNFe?: string | undefined;
        tpEvento?: string | undefined;
        nProt?: string | undefined;
        xJust?: string | undefined;
        nSeqEvento?: number | undefined;
        dhEvento?: string | undefined;
    }): Promise<string>;
    sefazDistDFe({ ultNSU, chNFe }: {
        ultNSU?: string;
        chNFe?: string;
    }): Promise<string>;
    sefazStatus(): Promise<string>;
    validarNFe(xml: string): Promise<any>;
}
export { Tools };
