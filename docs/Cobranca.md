# Grupo de Cobrança (cobr) - NF-e

## 📋 Visão Geral

Este documento descreve a implementação do **Grupo de Cobrança (cobr)** para NF-e modelo 55, conforme o **MOC Versão 7.00 – Novembro/2020**.

O grupo de cobrança é **opcional** e permite informar dados da fatura e duplicatas da operação fiscal.

> ⚠️ **Atenção**: O grupo de cobrança é válido **apenas para NF-e (modelo 55)**. Não se aplica à NFC-e (modelo 65).

---

## 🔧 Funções Implementadas

### `tagFat(obj)` - Dados da Fatura

Cria ou atualiza as informações da fatura da operação.

#### Estrutura do Objeto

```javascript
{
  nFat?: string,   // Número da fatura (até 60 caracteres)
  vOrig?: number,  // Valor original da fatura
  vDesc?: number,  // Valor do desconto
  vLiq?: number    // Valor líquido da fatura
}
```

#### Parâmetros

| Campo | Tipo   | Obrigatório | Descrição                          | Formato        |
|-------|--------|-------------|------------------------------------|----------------|
| nFat  | string | Não         | Número da fatura                   | Até 60 chars   |
| vOrig | number | Não         | Valor original da fatura           | Decimal (13,2) |
| vDesc | number | Não         | Valor do desconto da fatura        | Decimal (13,2) |
| vLiq  | number | Não         | Valor líquido da fatura            | Decimal (13,2) |

#### Exemplo de Uso

```javascript
NFe.tagFat({
    nFat: "FAT-100",
    vOrig: 3000.00,
    vDesc: 150.00,
    vLiq: 2850.00
});
```

#### XML Gerado

```xml
<fat>
  <nFat>FAT-100</nFat>
  <vOrig>3000.00</vOrig>
  <vDesc>150.00</vDesc>
  <vLiq>2850.00</vLiq>
</fat>
```

---

### `tagDup(obj)` - Dados das Duplicatas

Adiciona uma duplicata ao grupo de cobrança. Pode ser chamada **múltiplas vezes** para adicionar várias parcelas.

#### Estrutura do Objeto

```javascript
{
  nDup: string,            // Número da duplicata (obrigatório)
  dVenc: string | Date,    // Data de vencimento (obrigatório)
  vDup: number             // Valor da duplicata (obrigatório)
}
```

#### Parâmetros

| Campo | Tipo         | Obrigatório | Descrição               | Formato                |
|-------|--------------|-------------|-------------------------|------------------------|
| nDup  | string       | **Sim**     | Número da duplicata     | Até 60 chars           |
| dVenc | string/Date  | **Sim**     | Data de vencimento      | YYYY-MM-DD ou Date     |
| vDup  | number       | **Sim**     | Valor da duplicata      | Decimal (13,2)         |

#### Exemplo de Uso

```javascript
// Parcela 1/3
NFe.tagDup({
    nDup: "001",
    dVenc: "2025-12-01",
    vDup: 950.00
});

// Parcela 2/3 (usando objeto Date)
NFe.tagDup({
    nDup: "002",
    dVenc: new Date("2026-01-01"),
    vDup: 950.00
});

// Parcela 3/3
NFe.tagDup({
    nDup: "003",
    dVenc: "2026-02-01",
    vDup: 950.00
});
```

#### XML Gerado

```xml
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
```

---

## 📦 Estrutura XML Completa

Quando ambas as funções são utilizadas, a estrutura XML gerada é:

```xml
<infNFe>
  <!-- ... outros grupos ... -->
  
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
  
  <!-- ... outros grupos ... -->
</infNFe>
```

---

## 📝 Exemplo Completo

Veja o arquivo [`exemplos/cobranca.js`](../exemplos/cobranca.js) para um exemplo completo de uso.

```javascript
import { Make } from '../dist/utils/make.js';

const NFe = new Make();

// ... configurações básicas da nota ...

// Dados da fatura
NFe.tagFat({
    nFat: "FAT-100",
    vOrig: 3000.00,
    vDesc: 150.00,
    vLiq: 2850.00
});

// Duplicatas (parcelas)
NFe.tagDup({
    nDup: "001",
    dVenc: "2025-12-01",
    vDup: 950.00
});

NFe.tagDup({
    nDup: "002",
    dVenc: "2026-01-01",
    vDup: 950.00
});

NFe.tagDup({
    nDup: "003",
    dVenc: "2026-02-01",
    vDup: 950.00
});

// Gerar XML
const xml = NFe.xml();
```

---

## ✅ Validação

A implementação segue rigorosamente o **MOC Versão 7.00** e é compatível com o schema `procNFe_v4.00.xsd` da SEFAZ.

### Validações Automáticas

1. **Valores monetários**: Normalizados para 2 casas decimais (formato: `0.00`)
2. **Datas**: Convertidas para formato `YYYY-MM-DD`
3. **Strings**: Convertidas para string quando necessário
4. **Estrutura**: Grupo `cobr` criado automaticamente quando necessário

---

## 🔍 Observações Importantes

1. **Modelo da Nota**: O grupo de cobrança é válido **apenas para NF-e modelo 55**. Para NFC-e (modelo 65), essas informações são ignoradas.

2. **Campos Opcionais**: Todos os campos de `tagFat` são opcionais. Você pode informar apenas os campos que desejar.

3. **Duplicatas Múltiplas**: Você pode chamar `tagDup` quantas vezes forem necessárias para adicionar todas as parcelas.

4. **Formato de Data**: A função `tagDup` aceita tanto string (`"YYYY-MM-DD"`) quanto objeto `Date` do JavaScript. A conversão é feita automaticamente.

5. **Normalização de Valores**: Todos os valores monetários são automaticamente normalizados para 2 casas decimais usando `.toFixed(2)`.

---

## 📚 Referência Normativa

- **MOC Versão 7.00** – Novembro/2020
- **Schema**: `procNFe_v4.00.xsd`
- **Grupo**: G. Grupo de Fatura e Duplicatas (cobr)
- **Hierarquia**: `<infNFe> → <cobr> → <fat> | <dup>`

---

## 🆕 Histórico de Alterações

| Data       | Versão | Descrição                                          |
|------------|--------|----------------------------------------------------|
| 16/11/2025 | 1.0.0  | Implementação inicial de `tagFat` e `tagDup`      |

---

## 💡 Suporte

Para dúvidas ou problemas, consulte:

- [Documentação do MOC 7.00](../docs/NT_2025.002_v1.30_RTC_NF-e_IBS_CBS_IS.pdf)
- [Exemplos de uso](../exemplos/)
- [README principal](../README.md)

