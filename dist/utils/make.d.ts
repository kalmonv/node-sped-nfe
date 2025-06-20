declare class Make {
    #private;
    formatData(dataUsr?: Date): string;
    tagInfNFe(obj: any): void;
    tagIde(obj: any): void;
    tagRefNFe(obj: string | string[]): void;
    tagRefNF(obj: any): void;
    tagRefNFP(obj: any): void;
    tagRefCTe(obj: any): void;
    tagRefECF(obj: any): void;
    tagEmit(obj: any): void;
    tagEnderEmit(obj: any): void;
    tagDest(obj: any): void;
    tagEnderDest(obj: any): 1 | undefined;
    tagRetirada(obj: any): void;
    tagAutXML(obj: any): void;
    tagProd(obj: any): Promise<void>;
    tagCreditoPresumidoProd(obj: any): void;
    taginfAdProd(index: any, obj: any): void;
    tagCEST(obj: any): void;
    tagRECOPI(obj: any): void;
    tagDI(index: any, obj: any): void;
    tagAdi(index: any, obj: any): void;
    tagDetExport(obj: any): void;
    tagDetExportInd(obj: any): void;
    tagRastro(obj: any): void;
    tagVeicProd(obj: any): void;
    tagMed(obj: any): void;
    tagArma(obj: any): void;
    tagComb(obj: any): void;
    tagEncerrante(): void;
    tagOrigComb(): void;
    tagImposto(): void;
    tagProdICMS(index: any, obj: any): void;
    tagProdICMSST(index: any, obj: any): void;
    tagProdICMSSN(index: any, obj: any): void;
    tagProdICMSUFDest(index: any, obj: any): void;
    tagProdIPI(index: any, obj: any): void;
    tagProdII(index: any, obj: any): void;
    tagProdPIS(index: any, obj: any): void;
    tagProdPISST(index: any, obj: any): void;
    tagProdCOFINS(index: any, obj: any): void;
    tagProdCOFINSST(index: any, obj: any): void;
    tagProdISSQN(index: any, obj: any): void;
    tagProdImpostoDevol(index: any, obj: any): void;
    tagICMSTot(obj?: null): void;
    tagISSQNTot(obj: any): void;
    tagRetTrib(obj: any): void;
    tagTransp(obj: any): void;
    tagTransporta(obj: any): void;
    tagRetTransp(obj: any): void;
    tagVeicTransp(obj: any): void;
    tagReboque(obj: any): void;
    tagVagao(obj: any): void;
    tagBalsa(obj: any): void;
    tagVol(obj: any): void;
    tagLacres(obj: any): void;
    tagFat(obj: any): void;
    tagDup(obj: any): void;
    tagTroco(obj: any): void;
    tagDetPag(obj: any): void;
    tagIntermed(obj: any): void;
    tagInfAdic(obj: any): void;
    tagObsCont(obj: any): void;
    tagObsFisco(obj: any): void;
    tagProcRef(obj: any): void;
    tagExporta(obj: any): void;
    tagCompra(obj: any): void;
    tagCana(obj: any): void;
    tagforDia(): void;
    tagdeduc(): void;
    taginfNFeSupl(): void;
    tagInfRespTec(obj: any): void;
    tagRetiEnder(obj: any): void;
    tagEntrega(obj: any): void;
    xml(): any;
}
export { Make };
declare const _default: {
    Make: typeof Make;
};
export default _default;
