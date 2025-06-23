# ATENÇÃO, A BIBLIOTECA NÃO ESTA COMPLETA!
O XML é estruturado em uma ordem específica, sendo indispensável que se observe a sequência de chamadas das funções mencionadas abaixo, bem como a ordem de seus atributos. Por exemplo:
```javascript
var usuario = new Object();

// 1 OPÇÃO - CORRETO
usuario.nome = "Joao"
usuario.ultNome = "Silva"

// 2 OPÇÃO -  CORRETO
usuario = {
    nome: "Joao",
    ultNome: "Silva"
}

// 3 OPÇÃO - INVALIDO
usuario.ultNome = "Silva"
usuario.nome = "Joao"

// 4 OPÇÃO - INVALIDO
usuario = {
    ultNome: "Silva",
    nome: "Joao"
}
```

| Aonde | Motivo            |
|-------|-------------------|
| 🔴    | Não implementado  |
| 🟢    | Implementado      |

# Iniciar biblioteca
```javascript
import { Make, Tools } from "node-sped-nfe"
import fs from "fs";

let myTools = new Tools({ //Configuração de habiente e sistema
    mod: 55,
    tpAmb: 2,
    cUF: 51,

    /*
        OPTATIVO!
        LEIA Instalação do xmllint
    */
    xmllint: `../libxml2-2.9.3-win32-x86_64/bin/xmllint.exe`
}, { //Certificado digital
    pfx: 'certificado.pfx',
    senha: "senha-certificado",
});
```

> NOTA: Muitos campos não são obrigatórios. Caso não haja nenhum valor a ser informado, devem ser criados como NULL.
> NOTA: Caso existam erros na passagem de parâmetros para a classe, será disparada uma Exception e esses erros poderão ser recuperados pelo método getErrors().
 

# Métodos

### 🟢 function __construct()
Método construtor. Instancia a classe

```Javascript
var nfe = new Make();
```

### 🟢 function taginfNFe(std)
Node principal

NOTA: **se o parametro std.Id não for passado a chave será criada e inclusa e poderá ser recuperada no parâmetro chNFe da classe,**
**De outra forma se a chave for passada no parâmetro std.Id e estiver incorreta, um erro será inserido na proriedade errors.**

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.versao = '4.00'; //versão do layout (string)
std.Id = 'NFe35150271780456000160550010000000021800700082'; //se o Id de 44 digitos não for passado será gerado automaticamente
std.pk_nItem = null; //deixe essa variavel sempre como NULL

nfe.taginfNFe(std);

```

### 🟢 function tagIde(std)
Node de identificação da NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.cUF = 35;
std.cNF = '80070008';
std.natOp = 'VENDA';

std.indPag = 0; //NÃO EXISTE MAIS NA VERSÃO 4.00

std.mod = 55;
std.serie = 1;
std.nNF = 2;
std.dhEmi = '2015-02-19T13:48:00-02:00';
std.dhSaiEnt = null;
std.tpNF = 1;
std.idDest = 1;
std.cMunFG = 3518800;
std.tpImp = 1;
std.tpEmis = 1;
std.cDV = 2;
std.tpAmb = 2;
std.finNFe = 1;
std.indFinal = 0;
std.indPres = 0;
std.indIntermed = null;
std.procEmi = 0;
std.verProc = '3.10.31';
std.dhCont = null;
std.xJust = null;

nfe.tagIde(std);
```


### 🟢 function tagRefNFe(std)
Node referente a NFe referenciada

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
nfe.tagRefNFe('Chave da NFe');
// OU
nfe.tagRefNFe(['Chave da NFe', 'Chave da NFe', 'Chave da NFe']);
```

### 🟢 function tagrefNF(std)
Node referente a Nota Fiscal referenciada modelo 1 ou 2

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.cUF = 35;
std.AAMM = 1412;
std.CNPJ = '52297850000105';
std.mod = '01';
std.serie = 3;
std.nNF = 587878;

nfe.tagrefNF(std);
```

### 🟢 function tagrefNFP(std)
Node referente a Nota Fiscal referenciada de produtor rural

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.cUF = 35;
std.AAMM = 1502;
std.CNPJ;
std.CPF;
std.IE = 'ISENTO';
std.mod = '04';
std.serie = 0;
std.nNF = 5578;
std.refCTe = '35150271780456000160550010000253101000253101'

nfe.tagrefNFP(std);
```
### 🟢 function tagrefCTe(std)
Node referente aos CTe referenciados

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.refCTe = '35150268252816000146570010000016161002008472';

nfe.tagrefCTe(std);
```

### 🟢 function tagrefECF(std)
Node referente aos ECF referenciados

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.mod = '2C';
std.nECF = 788;
std.nCOO = 114;

nfe.tagrefECF(std);
```

### 🟢 function tagemit(std)
Node com os dados do emitente

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.xNome;
std.xFant;
std.IE;
std.IEST;
std.IM;
std.CNAE;
std.CRT;
std.CNPJ; //indicar apenas um CNPJ ou CPF
std.CPF;

nfe.tagemit(std);
```

### 🟢 function tagenderEmit(std)
Node com o endereço do emitente

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.xLgr;
std.nro;
std.xCpl;
std.xBairro;
std.cMun;
std.xMun;
std.UF;
std.CEP;
std.cPais;
std.xPais;
std.fone;

nfe.tagenderEmit(std);
```

### 🟢 function tagdest(std)
Node com os dados do destinatário

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.xNome;
std.indIEDest;
std.IE;
std.ISUF;
std.IM;
std.email;
std.CNPJ; //indicar apenas um CNPJ ou CPF ou idEstrangeiro
std.CPF;
std.idEstrangeiro;

nfe.tagdest(std);
```

### 🟢 function tagenderDest(std)
Node de endereço do destinatário

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.xLgr;
std.nro;
std.xCpl;
std.xBairro;
std.cMun;
std.xMun;
std.UF;
std.CEP;
std.cPais;
std.xPais;
std.fone;

nfe.tagenderDest(std);
```

### 🟢 function tagretirada(std)
> NOTA: Ajustado para NT 2018.005
Node indicativo de local de retirada diferente do endereço do emitente

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.CNPJ = '12345678901234'; //indicar apenas um CNPJ ou CPF
std.CPF = null;
std.IE = '12345678901';
std.xNome = 'Beltrano e Cia Ltda';
std.xLgr = 'Rua Um';
std.nro = '123';
std.xCpl = 'sobreloja';
std.xBairro = 'centro';
std.cMun = '3550308';
std.xMun = 'Sao Paulo';
std.UF = 'SP';
std.CEP = '01023000';
std.cPais = '1058';
std.xPais = 'BRASIL';
std.fone = '1122225544';
std.email = 'contato@beltrano.com.br';

nfe.tagretirada(std);
```


### 🔴 function tagentrega(std)
> NOTA: Ajustado para NT 2018.005
Node indicativo de local de entrega diferente do endereço do destinatário

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.CNPJ; //indicar um CNPJ ou CPF
std.CPF = null;
std.IE = '12345678901';
std.xNome = 'Beltrano e Cia Ltda';
std.xLgr = 'Rua Um';
std.nro = '123';
std.xCpl = 'sobreloja';
std.xBairro = 'centro';
std.cMun = '3550308';
std.xMun = 'Sao Paulo';
std.UF = 'SP';
std.CEP = '01023000';
std.cPais = '1058';
std.xPais = 'BRASIL';
std.fone = '1122225544';
std.email = 'contato@beltrano.com.br';

nfe.tagentrega(std);
```

### 🟢 function tagautXML(std)
Node de registro de pessoas autorizadas a acessar a NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.CNPJ = '12345678901234'; //indicar um CNPJ ou CPF
//std.CPF = null; //indicar um CNPJ ou CPF
nfe.tagautXML(std);
```

### 🟢 function tagprod(std)
Node de dados do produto/serviço

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.cProd;
std.cEAN;
std.cBarra;
std.xProd;
std.NCM;
std.cBenef;
std.EXTIPI;
std.CFOP;
std.uCom;
std.qCom;
std.vUnCom;
std.vProd;
std.cEANTrib;
std.cBarraTrib;
std.uTrib;
std.qTrib;
std.vUnTrib;
std.vFrete;
std.vSeg;
std.vDesc;
std.vOutro;
std.indTot;
std.xPed;
std.nItemPed;
std.nFCI;

nfe.tagProd([std]);
```

### 🔴 function tagCreditoPresumidoProd(std): void
Node opcional com dados de Crédito Presumido, são permitidos até 4 registros por item

| Parâmetro | Tipo | Descrição                                                              |
| :--- | :---: |:-----------------------------------------------------------------------|
|item|inteiro| Número do item da NFe                                                 |
|cCredPresumido|string|Código de Benefício Fiscal de Crédito Presumido na UF aplicado ao item |
|pCredPresumido|numerico|Percentual do Crédito Presumido                                        |
|vCredPresumido|numerico|Valor do Crédito Presumido                                             |

```javascript
let std = new \Object();
let indexProd = 1;
std.cCredPresumido = '2222211234';
std.pCredPresumido = '4';
std.vCredPresumido = '4';

$make.tagCreditoPresumidoProd(indexProd ,std);
```

### 🟢 function taginfAdProd(std)
Node de informações adicionais do produto

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe

std.infAdProd = 'informacao adicional do item';

nfe.taginfAdProd(indexProd, std);
```

### 🔴 function tagNVE(std) !! Pode ser declarado no tagProd({...NCM, NVE:[]})
Node com a Nomenclatura de Valor Aduaneiro e Estatística do item da NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.NVE = 'AA0001';

nfe.tagNVE(indexProd, std);
```

### 🔴 function tagCEST(std) !! Pode ser declarado no tagProd({...NCM, CEST, indEscala, CNPJFab})
Node de detalhamento do Especificador da Substituição Tributária do item da NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.CEST = '0200100';
std.indEscala = 'N'; //incluido no layout 4.00
std.CNPJFab = '12345678901234'; //incluido no layout 4.00

nfe.tagCEST(indexProd, std);
```

### 🔴 function tagRECOPI(std) !! Pode ser declarado no tagProd({...NCM, nRECOPI})
Node com o número do RECOPI

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.nRECOPI = '12345678901234567890';

nfe.tagRECOPI(indexProd, std);
```

### 🟢 function tagDI(std)  !! Pode ser declarado no tagProd({..., DI:{...}})
Node com informações da Declaração de Importação do item da NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.nDI;
std.dDI;
std.xLocDesemb;
std.UFDesemb;
std.dDesemb;
std.tpViaTransp;
std.vAFRMM;
std.tpIntermedio;
std.CNPJ;
std.CPF; //NT 2023.004 v1.00
std.UFTerceiro;
std.cExportador;

nfe.tagDI(indexProd, std);
```

### 🟢 function tagadi(std) !! Pode ser declarado no tagProd({..., DI:{...,adi:{...}}})
Node de Adições relativas as DI do item

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.nDI; //número da DI
std.nAdicao;
std.nSeqAdic;
std.cFabricante;
std.vDescDI;
std.nDraw;

nfe.tagadi(indexProd, std);
```

### 🔴 function tagdetExport(std)
Node com informações de exportação para o item

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.nDraw = '82828';

nfe.tagdetExport(indexProd, std);
```

### 🔴 function tagdetExportInd(std)
Node com Grupo sobre exportação indireta, deve ser indicado logo após
nfe.tagdetExport(std) pois pertence a essa tag

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.nRE = '123456789012';
std.chNFe = '53170924915365000295550550000001951000001952';
std.qExport = 1234.123;

nfe.tagdetExportInd(indexProd, std);
```
### 🔴 function tagRastro(std)
Node com os dados de rastreabilidade do item da NFe

*Método Incluso para atender layout 4.00*

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.nLote = '11111';
std.qLote = 200;
std.dFab = '2018-01-01';
std.dVal = '2020-01-01';
std.cAgreg = '1234';

nfe.tagRastro(indexProd, std);
```

### 🔴 function tagveicProd(std)
Node com o detalhamento de Veículos novos do item da NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.tpOp;
std.chassi;
std.cCor;
std.xCor;
std.pot;
std.cilin;
std.pesoL;
std.pesoB;
std.nSerie;
std.tpComb;
std.nMotor;
std.CMT;
std.dist;
std.anoMod;
std.anoFab;
std.tpPint;
std.tpVeic;
std.espVeic;
std.VIN;
std.condVeic;
std.cMod;
std.cCorDENATRAN;
std.lota;
std.tpRest;

nfe.tagveicProd(indexProd, std);
```

### 🔴 function tagmed(std)
> NOTA: Ajustado conforme NT 2018.005
Node com o detalhamento de Medicamentos e de matérias-primas farmacêuticas

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.cProdANVISA = '1234567890123'; //incluido no layout 4.00
std.xMotivoIsencao = 'RDC 238';
std.vPMC = 102.22;

nfe.tagmed(indexProd, std);
```

### 🔴 function tagarma(std)
Node com informações e detalhamento de Armamento do item da NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.nAR; //Indicativo de número da arma
std.tpArma;
std.nSerie;
std.nCano;
std.descr;

nfe.tagarma(indexProd, std);
```

### 🔴 function tagcomb(std)
Node das informações específicas para combustíveis líquidos e lubrificantes do item da NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.cProdANP;

std.pMixGN; //removido no layout 4.00

std.descANP; //incluido no layout 4.00
std.pGLP; //incluido no layout 4.00
std.pGNn; //incluido no layout 4.00
std.pGNi; //incluido no layout 4.00
std.vPart; //incluido no layout 4.00

std.CODIF;
std.qTemp;
std.UFCons;
std.qBCProd;
std.vAliqProd;
std.vCIDE;

nfe.tagcomb(indexProd, std);
```

### 🔴 function tagencerrante(std)
Node das informações do grupo de “encerrante” disponibilizado por hardware específico acoplado à bomba de Combustível, definido no controle da venda do Posto Revendedor de Combustível.
Referente ao item da NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.nBico;
std.nBomba;
std.nTanque;
std.vEncIni;
std.vEncFin;
std.pBio; //NT 2022.001 v1.10


nfe.tagencerrante(indexProd, std);
```

### 🔴 function tagorigComb(std)
Parte do grupo encerrante, podem haver de 0 até 30 tags desse tipo  

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.indImport= 0; //NT 2023.001 v1.00
std.cUFOrig = 35; //NT 2023.001 v1.00
std.Orig = 100; //NT 2023.001 v1.00

nfe.tagOrigComb(indexProd, std);
```


### 🔴 function tagimposto(std)
Node inicial dos Tributos incidentes no Produto ou Serviço do item da NFe 

| Parametro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | stcClass | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.vTotTrib = 1000.00;

nfe.tagimposto(indexProd, std);
```

### 🟢 function tagProdICMS(std)
> NOTA: Ajustado conforme NT 2018.005_1.10
Node com informações do ICMS do item da NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let indexProd = 1; //item da NFe
const icms = {
  "00": {
    orig: 0,
    CST: "00",
    modBC: 3,
    vBC: 1000.00,
    pICMS: 18.00,
    vICMS: 180.00
  },
  "10": {
    orig: 0,
    CST: "10",
    modBC: 3,
    vBC: 1000.00,
    pICMS: 18.00,
    vICMS: 180.00,
    modBCST: 4,
    pMVAST: 40.00,
    vBCST: 1400.00,
    pICMSST: 12.00,
    vICMSST: 168.00
  },
  "20": {
    orig: 0,
    CST: "20",
    modBC: 3,
    pRedBC: 10.00,
    vBC: 900.00,
    pICMS: 18.00,
    vICMS: 162.00
  },
  "30": {
    orig: 0,
    CST: "30",
    modBCST: 4,
    pMVAST: 40.00,
    vBCST: 1400.00,
    pICMSST: 18.00,
    vICMSST: 252.00
  },
  "40": {
    orig: 0,
    CST: "40"
  },
  "41": {
    orig: 0,
    CST: "41"
  },
  "50": {
    orig: 0,
    CST: "50"
  },
  "51": {
    orig: 0,
    CST: "51",
    modBC: 3,
    vBC: 1000.00,
    pICMS: 18.00,
    vICMSOp: 180.00,
    pDif: 70.00,
    vICMSDif: 126.00,
    vICMS: 54.00
  },
  "60": {
    orig: 0,
    CST: "60",
    vBCSTRet: 1200.00,
    vICMSSTRet: 216.00
  },
  "70": {
    orig: 0,
    CST: "70",
    modBC: 3,
    pRedBC: 10.00,
    vBC: 900.00,
    pICMS: 18.00,
    vICMS: 162.00,
    modBCST: 4,
    pMVAST: 40.00,
    vBCST: 1400.00,
    pICMSST: 18.00,
    vICMSST: 252.00
  },
  "90": {
    orig: 0,
    CST: "90",
    modBC: 3,
    vBC: 1000.00,
    pICMS: 18.00,
    vICMS: 180.00,
    modBCST: 4,
    pMVAST: 40.00,
    vBCST: 1400.00,
    pICMSST: 12.00,
    vICMSST: 168.00
  }
};
nfe.tagICMS(indexProd, icms[?]); // ? = Codigo do CST
```

### 🟢 function tagICMSPart(std)
Node com informações da partilha do ICMS entre a UF de origem e UF de destino ou a UF definida na legislação.

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.orig = 0;
std.CST = '90';
std.modBC = 0;
std.vBC = 1000.00;
std.pRedBC = null;
std.pICMS = 18.00;
std.vICMS = 180.00;
std.modBCST = 1000.00;
std.pMVAST = 40.00;
std.pRedBCST = null;
std.vBCST = 1400.00;
std.pICMSST = 10.00;
std.vICMSST = 140.00;
std.pBCOp = 10.00;
std.UFST = 'RJ';

nfe.tagICMSPart(indexProd, std);
```

### 🟢 function tagProdICMSST(std)
> NOTA: Ajustado conforme NT 2018.005 e NT 2018.005_1.10
Node Repasse de ICMS ST retido anteriormente em operações interestaduais com repasses através do Substituto Tributário

| Parametro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | stcClass | contêm os dados dos campos, nomeados conforme manual |
```javascript
let indexProd = 1; //item da NFe
const icms = {
  "10": {
    orig: 0,
    CST: "10",
    modBC: 3,
    vBC: 200.00,
    pICMS: 18.00,
    vICMS: 36.00,
    modBCST: 4,
    pMVAST: 40.00,
    pRedBCST: "0.00",
    vBCST: 280.00,
    pICMSST: 18.00,
    vICMSST: 50.40
    // FCP opcional
  },
  "30": {
    orig: 0,
    CST: "30",
    modBCST: 4,
    pMVAST: 40.00,
    pRedBCST: "0.00",
    vBCST: 280.00,
    pICMSST: 18.00,
    vICMSST: 50.40
    // FCP opcional
  },
  "60-sem-fcp": {
    orig: 0,
    CST: "60",
    vBCSTRet: 1000.00,
    pST: 18.00,
    vICMSSTRet: 180.00
  },
  "60-com-fcp": {
    orig: 0,
    CST: "60",
    vBCSTRet: 1000.00,
    pST: 18.00,
    vICMSSTRet: 180.00,
    vBCFCPSTRet: 1000.00,
    pFCPSTRet: 2.00,
    vFCPSTRet: 20.00
  },
  "70": {
    orig: 0,
    CST: "70",
    modBC: 3,
    pRedBC: 20.00,
    vBC: 160.00,
    pICMS: 18.00,
    vICMS: 28.80,
    modBCST: 4,
    pMVAST: 40.00,
    pRedBCST: "0.00",
    vBCST: 224.00,
    pICMSST: 18.00,
    vICMSST: 40.32
    // FCP opcional
  },
  "90": {
    orig: 0,
    CST: "90",
    modBC: 3,
    vBC: 200.00,
    pICMS: 18.00,
    vICMS: 36.00,
    modBCST: 4,
    pMVAST: 40.00,
    pRedBCST: "0.00",
    vBCST: 280.00,
    pICMSST: 18.00,
    vICMSST: 50.40
    // FCP opcional
  }
};



nfe.tagICMSST(indexProd, icms[?]); // ? = codigo do CST
```

### 🟢 function tagProdICMSSN(std)
Node referente Tributação ICMS pelo Simples Nacional do item da NFe
> NOTA: Ajustado conforme NT 2018.005_1.10

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.orig = 0;
std.CSOSN = '101';
std.pCredSN = 2.00;
std.vCredICMSSN = 20.00;
std.modBCST = null;
std.pMVAST = null;
std.pRedBCST = null;
std.vBCST = null;
std.pICMSST = null;
std.vICMSST = null;
std.vBCFCPST = null; //incluso no layout 4.00
std.pFCPST = null; //incluso no layout 4.00
std.vFCPST = null; //incluso no layout 4.00
std.vBCSTRet = null;
std.pST = null;
std.vICMSSTRet = null;
std.vBCFCPSTRet = null; //incluso no layout 4.00
std.pFCPSTRet = null; //incluso no layout 4.00
std.vFCPSTRet = null; //incluso no layout 4.00
std.modBC = null;
std.vBC = null;
std.pRedBC = null;
std.pICMS = null;
std.vICMS = null;
std.pRedBCEfet = null;
std.vBCEfet = null;
std.pICMSEfet = null;
std.vICMSEfet = null;
std.vICMSSubstituto = null;

nfe.tagICMSSN(indexProd, std);
```

### 🟢 function tagProdICMSUFDest(std)
Node de informação do ICMS Interestadual do item na NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | stcClass | contêm os dados dos campos, nomeados conforme manual |
```javascript
let indexProd = 1; //item da NFe
const std = {
  // Valor da base de cálculo do ICMS na UF de destino
  vBCUFDest: 1000.00,

  // Valor da base de cálculo do FCP (Fundo de Combate à Pobreza) na UF de destino
  vBCFCPUFDest: 1000.00,

  // Alíquota do FCP na UF de destino (ex: 2%)
  pFCPUFDest: 2.00,

  // Alíquota do ICMS na UF de destino (ex: 18%)
  pICMSUFDest: 18.00,

  // Alíquota interestadual do ICMS (deve ser 4.00, 7.00 ou 12.00 conforme operação)
  pICMSInter: 12.00,

  // Percentual de partilha do ICMS interestadual para a UF de destino (ex: 80%)
  pICMSInterPart: 80.00,

  // Valor do FCP destinado à UF de destino
  vFCPUFDest: 20.00,

  // Valor do ICMS destinado à UF de destino
  vICMSUFDest: 144.00,

  // Valor do ICMS destinado à UF de origem (remetente)
  vICMSUFRemet: 36.00
};



nfe.tagProdICMSUFDest(indexProd, std);
```

### 🟢 function tagProdIPI(std)
Node referente ao IPI do item da NFe

> NOTA: clEnq foi removido do layout 4.00 na NT_2016_V1.40

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.clEnq = null;
std.CNPJProd = null;
std.cSelo = null;
std.qSelo = null;
std.cEnq = '999';
std.CST = '50';
std.vIPI = 150.00;
std.vBC = 1000.00;
std.pIPI = 15.00;
std.qUnid = null;
std.vUnid = null;

nfe.tagProdIPI(indexProd, std);
```

### 🟢 function tagProdII(std)
Node Imposto de Importação do item da NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.vBC = 1000.00;
std.vDespAdu = 100.00;
std.vII = 220.00;
std.vIOF = null;

nfe.tagProdII(indexProd, std);
```

### 🟢 function tagProdPIS(std)
Node PIS do item da NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.CST = '07';
std.vBC = null;
std.pPIS = null;
std.vPIS = null;
std.qBCProd = null;
std.vAliqProd = null;

nfe.tagPIS(indexProd, std);
```

### 🟢 function tagProdPISST(std)
Node PIS Substituição Tributária do item da NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.vPIS =  16.00;
std.vBC = 1000.00
std.pPIS = 1.60;
std.qBCProd = null;
std.vAliqProd = null;
std.indSomaPISST = 0; //0=Valor do PISST não compõe o valor total da NF-e
                        //1=Valor do PISST compõe o valor total da NF-e

nfe.tagPISST(indexProd, std);
```

### 🟢 function tagProdCOFINS(std)
Node COFINS do item da NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.CST = '07';
std.vBC = null;
std.pCOFINS = null;
std.vCOFINS = null;
std.qBCProd = null;
std.vAliqProd = null;

nfe.tagCOFINS(indexProd, std);
```

### 🟢 function tagProdCOFINSST(std)
Node COFINS Substituição Tributária do item da NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.vCOFINS = 289.30;
std.vBC = 2893.00;
std.pCOFINS = 10.00;
std.qBCProd = null;
std.vAliqProd = null;
std.indSomaCOFINSST = 0; //0=Valor do COFINS ST não compõe o valor total da NF-e
                           //1=Valor do COFINS ST compõe o valor total da NF-e

nfe.tagProdCOFINSST(indexProd, std);
```

### 🟢 function tagProdISSQN(std)
Node ISSQN do item da NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.vBC = 1000.00;
std.vAliq = 5.00;
std.vISSQN = 50.00;
std.cMunFG = '3518800';
std.cListServ = '12.23';
std.vDeducao = null;
std.vOutro = null;
std.vDescIncond = null;
std.vDescCond = null;
std.vISSRet = null;
std.indISS = 2;
std.cServico = '123';
std.cMun = '3518800';
std.cPais = '1058';
std.nProcesso = null;
std.indIncentivo = 2;

nfe.tagProdISSQN(indexProd, std);
```

### 🔴 function tagProdImpostoDevol(std)
Node referente a informação do Imposto devolvido

> NOTA: O motivo da devolução deverá ser informado pela empresa no campo de Informações Adicionais do Produto (tag:infAdProd).

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //item da NFe
std.pDevol = 2.00;
std.vIPIDevol = 123.36;

nfe.tagProdImpostoDevol(indexProd, std);
```

### 🟢 function tagICMSTot(std)
Node dos totais referentes ao ICMS

> NOTA: Esta tag não necessita que sejam passados valores, pois a classe irá calcular esses totais e irá usar essa totalização para complementar e gerar esse node, caso nenhum valor seja passado como parâmetro.

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.vBC;
std.vICMS;
std.vICMSDeson;
std.vBCST;
std.vST;
std.vProd;
std.vFrete;
std.vSeg;
std.vDesc;
std.vII;
std.vIPI;
std.vPIS;
std.vCOFINS;
std.vOutro;
std.vNF;
std.vIPIDevol;
std.vTotTrib;
std.vFCP;
std.vFCPST;
std.vFCPSTRet;
std.vFCPUFDest;
std.vICMSUFDest;
std.vICMSUFRemet;
std.qBCMono;
std.vICMSMono;
std.qBCMonoReten;
std.vICMSMonoReten;
std.qBCMonoRet;
std.vICMSMonoRet;


nfe.tagICMSTot(std);
```

### 🔴 function tagISSQNTot(std)
Node de Totais referentes ao ISSQN

> NOTA: caso os valores não existam indique "null". Se for indicado 0.00 esse número será incluso no XML o que poderá causar sua rejeição.

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.vServ = 1000.00;
std.vBC = 1000.00;
std.vISS = 10.00;
std.vPIS = 2.00;
std.vCOFINS = 6.00;
std.dCompet = '2017-09-12';
std.vDeducao = 10.00;
std.vOutro = 10.00;
std.vDescIncond = null;
std.vDescCond = null;
std.vISSRet = null;
std.cRegTrib = 5;

nfe.tagISSQNTot(std);
```

### 🔴 function tagretTrib(std)
Node referente a retenções de tributos

> Exemplos de atos normativos que definem obrigatoriedade da retenção de contribuições:

> a) IRPJ/CSLL/PIS/COFINS - Fonte - Recebimentos de Órgão Público Federal, Lei no 9.430, de 27 de dezembro de 1996, art. 64, Lei no 10.833/2003, art. 34, como normas infralegais, temos como exemplo: IN SRF 480/2004 e IN 539, de 25/04/05.

> b) Retenção do Imposto de Renda pelas Fontes Pagadoras, REMUNERAÇÃO DE SERVIÇOS PROFISSIONAIS PRESTADOS POR PESSOA JURÍDICA, Lei no 7.450/85, art. 52

> c) IRPJ, CSLL, COFINS e PIS - Serviços Prestados por Pessoas Jurídicas - Retenção na Fonte, Lei no 10.833 de 29.12.2003, art. 30, 31, 32, 35 e 36

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.vRetPIS = 100.00;
std.vRetCOFINS = 100.00;
std.vRetCSLL = 100.00;
std.vBCIRRF = 100.00;
std.vIRRF = 100.00;
std.vBCRetPrev = 100.00;
std.vRetPrev = 100.00;

nfe.tagretTrib(std);
```

### 🟢 function tagtransp(std)
Node indicativo da forma de frete

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.modFrete = 1;

nfe.tagtransp(std);
```

### 🔴 function tagtransporta(std)
Node com os dados da transportadora

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.xNome = 'Rodo Fulano';
std.IE = '12345678901';
std.xEnder = 'Rua Um, sem numero';
std.xMun = 'Cotia';
std.UF = 'SP';
std.CNPJ = '12345678901234';//só pode haver um ou CNPJ ou CPF, se um deles é especificado o outro deverá ser null
std.CPF = null;

nfe.tagtransporta(std);
```

### 🔴 function tagretTransp(std)
Node referente a retenção de ICMS do serviço de transporte

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.vServ = 240.00;
std.vBCRet = 240.00;
std.pICMSRet = 1.00;
std.vICMSRet = 2.40;
std.CFOP = '5353';
std.cMunFG = '3518800';

nfe.tagretTransp(std);
```

### 🔴 function tagveicTransp(std)
Node para informação do veículo trator

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.placa = 'ABC1111';
std.UF = 'RJ';
std.RNTC = '999999';

nfe.tagveicTransp(std);
```

### 🔴 function tagreboque(std)
Node para informar os reboques/Dolly

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.placa = 'BCB0897';
std.UF = 'SP';
std.RNTC = '123456';

nfe.tagreboque(std);
```

### 🔴 function tagvagao(std)
Node para informar o vagão usado

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.vagao = 'YY452-19';

nfe.tagvagao(std);
```

### 🔴 function tagbalsa(std)
Node para informar a balsa usada

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.balsa = 'BNAV111';

nfe.tagbalsa(std);
```


### 🔴 function tagvol(std)
Node com as informações dos volumes transportados

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //indicativo do numero do volume
std.qVol = 2;
std.esp = 'caixa';
std.marca = 'OLX';
std.nVol = '11111';
std.pesoL = 10.50;
std.pesoB = 11.00;

nfe.tagvol(indexProd, std);
```

### 🔴 function taglacres(std)
Node com a identificação dos lacres, referentes ao volume

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
let indexProd = 1; //indicativo do numero do volume
std.nLacre = 'ZZEX425365';

nfe.taglacres(indexProd, std);
```

### 🔴 function tagfat(std)
Node com os dados da fatura

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.nFat = '1233';
std.vOrig = 1254.22;
std.vDesc = null;
std.vLiq = 1254.22;

nfe.tagfat(std);
```
### 🔴 function tagdup(std)
Node de informações das duplicatas

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.nDup = '1233-1';
std.dVenc = '2017-08-22';
std.vDup = 1254.22;

nfe.tagdup(std);
```

### 🔴 function tagpag(std)
Node referente as formas de pagamento **OBRIGATÓRIO para NFCe a partir do layout 3.10**
e também **obrigatório para NFe (modelo 55)** a partir do layout 4.00

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |


```javascript
let std = new Object();
std.vTroco = null; //incluso no layout 4.00, obrigatório informar para NFCe (65)

nfe.tagpag(std);
```
>NOTA: usualmente para NFe modelo 55, vTroco é null.

### 🟢 function tagdetPag(std)
Node com o detalhamento da forma de pagamento **OBRIGATÓRIO para NFCe e NFe layout4.00**

> NOTA: indPag re-incluso no layout 4.00 NT_2016_V1.51
> NOTA: tPag 14 - duplicata foi removido do layout 4.00 na NT_2016_V1.51

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.indPag = '0'; //0= Pagamento à Vista 1= Pagamento à Prazo
std.tPag = '03';
std.xPag = "Pagamento via PIX através de app externo."; //Obrigatorio caso tPag=99
std.vPag = 200.00; //Obs: deve ser informado o valor pago pelo cliente
std.CNPJ = '12345678901234';
std.tBand = '01';
std.cAut = '3333333';
std.tpIntegra = 1; //incluso na NT 2015/002
std.CNPJPag; //NT 2023.004 v1.00
std.UFPag; //NT 2023.004 v1.00
std.CNPJReceb; //NT 2023.004 v1.00
std.idTermPag; //NT 2023.004 v1.00

nfe.tagdetPag(std);
```
>NOTA: para NFe (modelo 55), temos ...
>
> vPag=0.00 **mas pode ter valor se a venda for à vista**
>
> tPag é usualmente:

> - 15 = Boleto Bancário
> - 16 = Depósito Bancário
> - 17 = Pagamento Instantâneo (PIX)
> - 18 = Transferência bancária, Carteira Digital
> - 19 = Programa de fidelidade, Cashback, Crédito Virtual
> - 90 = Sem pagamento
> - 98 = Regime Especial NFF
> - 99 = Outros
>
> *Porém podem haver casos que os outros nodes e valores tenham de ser usados.*


### 🔴 function tagIntermed(std)
Node referente aos dados do Intermediador NT 2020.006

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.CNPJ = '12345678901234';
std.idCadIntTran = 'fulano';

nfe.tagIntermed(std);
```


### 🟢 function taginfAdic(std)
Node referente as informações adicionais da NFe

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.infAdFisco = 'informacoes para o fisco';
std.infCpl = 'informacoes complementares';

nfe.taginfAdic(std);
```

### 🔴 function tagobsCont(std)
Campo de uso livre do contribuinte, Informar o nome do campo no atributo xCampo e o conteúdo do campo no xTexto

*NOTA: pode ser usado, por exemplo, para indicar outros destinatários de e-mail, além do próprio destinatário da NFe, como o contador, etc.*

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.xCampo = 'email';
std.xTexto = 'algum@mail.com';

nfe.tagobsCont(std);
```

### 🔴 function tagobsFisco(std)
Campo de uso livre do Fisco. Informar o nome do campo no atributo xCampo e o conteúdo do campo no xTexto

| Parametro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | stcClass | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.xCampo = 'Info';
std.xTexto = 'alguma coisa';

nfe.tagobsFisco(std);
```


### 🔴 function tagprocRef(std)
Node com a identificação do processo ou ato concessório

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.nProc 'ks7277272';
std.indProc = 0;

nfe.tagprocRef(std);
```

### 🔴 function tagexporta(std)
Node com dados de exportação.

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.UFSaidaPais = 'PR';
std.xLocExporta = 'Paranagua';
std.xLocDespacho = 'Informação do Recinto Alfandegado';

nfe.tagexporta(std);
```
### 🔴 function tagcompra(std)
Node com a informação adicional de compra

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.xNEmp = 'ajhjs8282828';
std.xPed = '828288jjshsjhjwj';
std.xCont = 'contrato 1234';

nfe.tagcompra(std);
```

### 🔴 function tagcana(std)
Node com as informações de registro aquisições de cana

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.safra = '2017';
std.ref = '09/2017';
std.qTotMes = 20000;
std.qTotAnt = 18000;
std.qTotGer = 38000;
std.vFor = 2500.00;
std.vTotDed = 500.00;
std.vLiqFor = 2000.00;

nfe.tagcana(std);
```

### 🔴 function tagforDia(std)
Node informativo do fornecimento diário de cana

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.dia = 1;
std.qtde = 1000;

nfe.tagforDia(std);
```

### 🔴 function tagdeduc(std)
Node Grupo Deduções – Taxas e Contribuições da aquisição de cana

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |
```javascript
let std = new Object();
std.xDed = 'deducao 1';
std.vDed = 100.00;

nfe.tagdeduc(std);
```
### 🔴 function taginfNFeSupl(std)
Node das informações suplementares da NFCe.

*Não é necessário informar será preenchido automaticamente após a assinatura da NFCe*

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.qrcode;
std.urlChave;

nfe.taginfNFeSupl(std);
```

### 🟢 function taginfRespTec(std)
Node da informação referente ao Responsável Técnico NT 2018.005
**Esta tag é OPCIONAL mas se for passada todos os campos devem ser passados para a função.**

| Parâmetro | Tipo | Descrição |
| :--- | :---: | :--- |
| std | Object | contêm os dados dos campos, nomeados conforme manual |

```javascript
let std = new Object();
std.CNPJ = '99999999999999'; //CNPJ da pessoa jurídica responsável pelo sistema utilizado na emissão do documento fiscal eletrônico
std.xContato= 'Fulano de Tal'; //Nome da pessoa a ser contatada
std.email = 'fulano@soft.com.br'; //E-mail da pessoa jurídica a ser contatada
std.fone = '1155551122'; //Telefone da pessoa jurídica/física a ser contatada
std.CSRT = 'G8063VRTNDMO886SFNK5LDUDEI24XJ22YIPO'; //Código de Segurança do Responsável Técnico
std.idCSRT = '01'; //Identificador do CSRT

nfe.taginfRespTec(std);
```

### 🔴 function montaNFe():boolean
Este método chama o metodo monta(), mantido apenas para compatibilidade.

```javascript
$xml = nfe.montaNFe();
```

### 🔴 function monta()
Este método executa a montagem do XML

> NOTA: irá retornar uma Exception caso existam erros na montagem OU retorna o XML montado caso não hajam erros.

```javascript
$xml = nfe.monta();
```

### 🔴 function getXMl():string
Este método retorna o XML em uma string, mesmo que existam erros.

```javascript
$xml = nfe.getXML();
```

### 🔴 function getErrors(): array
Este método retorna os erros identificados na passagem dos parâmetros para a classe.

```javascript
$erros = nfe.getErrors();
```


### 🔴 function getChave():string
Este método retorna o numero da chave da NFe

```javascript
$chave = nfe.getChave();
```

### 🔴 function getModelo():int
Este método retorna o modelo de NFe 55 ou 65

```javascript
$modelo = nfe.getModelo();
```
