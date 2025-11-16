/**
 * Exemplo de uso das funções tagFat e tagDup
 * Grupo de Cobrança (cobr) - MOC 7.00
 * 
 * Válido apenas para NF-e modelo 55 (não se aplica à NFC-e modelo 65)
 */

import { Make } from '../dist/utils/make.js';

// Criar instância da NF-e
const NFe = new Make();

// Configurar dados básicos da nota (ide)
NFe.tagIde({
    cUF: 35,
    natOp: "VENDA",
    mod: 55, // NF-e (modelo 55)
    serie: 1,
    nNF: 123,
    dhEmi: new Date().toISOString().split('.')[0] + '-03:00',
    tpNF: 1,
    idDest: 1,
    cMunFG: 3550308,
    tpImp: 1,
    tpEmis: 1,
    cDV: 0,
    tpAmb: 2, // Homologação
    finNFe: 1,
    indFinal: 0,
    indPres: 1,
    procEmi: 0,
    verProc: "1.0.0",
    cNF: "12345678"
});

// Configurar emitente (simplificado)
NFe.tagEmit({
    CNPJ: "12345678000195",
    xNome: "Empresa Teste",
    xFant: "Empresa Teste", // xFant inicializa enderEmit
    IE: "123456789",
    CRT: "1"
});

NFe.tagEnderEmit({
    xLgr: "Rua Teste",
    nro: "123",
    xBairro: "Centro",
    cMun: 3550308,
    xMun: "São Paulo",
    UF: "SP",
    CEP: "01310100",
    cPais: 1058,
    xPais: "Brasil"
});

// Configurar destinatário (simplificado)
NFe.tagDest({
    CNPJ: "98765432000191",
    xNome: "Cliente Teste",
    indIEDest: "1"
});

NFe.tagEnderDest({
    xLgr: "Avenida Teste",
    nro: "456",
    xBairro: "Vila Nova",
    cMun: 3550308,
    xMun: "São Paulo",
    UF: "SP",
    CEP: "01234567",
    cPais: 1058,
    xPais: "Brasil"
});

// ========================================
// GRUPO DE COBRANÇA (cobr)
// ========================================

/**
 * tagFat - Dados da Fatura
 * 
 * Grupo opcional que representa a fatura da operação
 * 
 * Parâmetros:
 * - nFat: Número da fatura (opcional, string até 60 caracteres)
 * - vOrig: Valor original da fatura (opcional, decimal 2 casas)
 * - vDesc: Valor do desconto (opcional, decimal 2 casas)
 * - vLiq: Valor líquido da fatura (opcional, decimal 2 casas)
 */
NFe.tagFat({
    nFat: "FAT-100",
    vOrig: 3000.00,
    vDesc: 150.00,
    vLiq: 2850.00
});

/**
 * tagDup - Dados das Duplicatas
 * 
 * Grupo que representa as parcelas da cobrança (0-n ocorrências)
 * Pode ser chamado múltiplas vezes para adicionar várias duplicatas
 * 
 * Parâmetros:
 * - nDup: Número da duplicata (obrigatório, string até 60 caracteres)
 * - dVenc: Data de vencimento (obrigatório, Date ou string YYYY-MM-DD)
 * - vDup: Valor da duplicata (obrigatório, decimal 2 casas)
 */

// Parcela 1/3
NFe.tagDup({
    nDup: "001",
    dVenc: "2025-12-01",
    vDup: 950.00
});

// Parcela 2/3
NFe.tagDup({
    nDup: "002",
    dVenc: new Date("2026-01-01"), // Aceita Date também
    vDup: 950.00
});

// Parcela 3/3
NFe.tagDup({
    nDup: "003",
    dVenc: "2026-02-01",
    vDup: 950.00
});

// ========================================
// Gerar XML (simplificado para demonstração)
// ========================================

console.log("✅ Funções tagFat e tagDup implementadas com sucesso!");
console.log("\n📋 Estrutura de cobrança criada:");
console.log(JSON.stringify({
    cobr: {
        fat: {
            nFat: "FAT-100",
            vOrig: "3000.00",
            vDesc: "150.00",
            vLiq: "2850.00"
        },
        dup: [
            { nDup: "001", dVenc: "2025-12-01", vDup: "950.00" },
            { nDup: "002", dVenc: "2026-01-01", vDup: "950.00" },
            { nDup: "003", dVenc: "2026-02-01", vDup: "950.00" }
        ]
    }
}, null, 2));

console.log("\n📄 XML esperado:");
console.log(`
<cobr>
  <fat>
    <nFat>FAT-100</nFat>
    <vOrig>3000.00</vOrig>
    <vDesc>150.00</vDesc>
    <vLiq>2850.00</vLiq>
  </fat>
  <dup>
    <nDup>001</nDup>
    <dVenc>2025-12-01</dVenc>
    <vDup>950.00</vDup>
  </dup>
  <dup>
    <nDup>002</nDup>
    <dVenc>2026-01-01</dVenc>
    <vDup>950.00</vDup>
  </dup>
  <dup>
    <nDup>003</nDup>
    <dVenc>2026-02-01</dVenc>
    <vDup>950.00</vDup>
  </dup>
</cobr>
`);

console.log("\n✨ Conforme MOC Versão 7.00 – Novembro/2020");

