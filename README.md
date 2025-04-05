# 📦 Biblioteca de Emissão de NF-e (Modelos 55 e 65)

Seja bem-vindo(a) à **Biblioteca de Emissão de NF-e** — sua parceira definitiva para integrar **emissão de Nota Fiscal Eletrônica modelo 55 (NF-e)** e **modelo 65 (NFC-e)** em aplicações modernas, com simplicidade, robustez e total conformidade com a legislação brasileira! 🇧🇷🚀

---

## ✨ Por que usar esta biblioteca?

- ✅ **Simples de integrar** — fácil de configurar e começar a emitir em minutos.
- 🔒 **Segura por padrão** — validação de schema, assinatura digital e envio via WS.
- ⚡ **Alta performance** — ideal para ambientes de alto volume.
- 🧩 **Flexível** — suporte a múltiplos ambientes (homologação e produção).
- 📚 **Documentação clara** — explicações, exemplos e dicas práticas.

---

## 🧾 O que são NF-e modelo 55 e 65?

| Modelo | Tipo                         | Uso principal                                 |
|--------|------------------------------|-----------------------------------------------|
| 55     | Nota Fiscal Eletrônica       | Vendas B2B, movimentações fiscais entre CNPJs |
| 65     | Nota Fiscal de Consumidor    | Vendas B2C em ponto de venda (PDV)            |

---

## 📌 Requisitos

Para garantir o funcionamento correto da biblioteca, certifique-se de que os seguintes requisitos estejam atendidos:

### 🔧 Ambiente

- **Node.js** `v22.14.0` (versão testada e recomendada)
- **xmllint** `2.9.3` (utilizado para validação dos XMLs gerados)

### 🖥 Instalação do `xmllint`

#### 🔵 Windows

1. Baixe o pacote do libxml para Windows:
   - [Download libxml2 para Windows (64bit)](http://xmlsoft.org/sources/win32/64bit/)

2. Extraia o conteúdo em um diretório acessível.

3. Declaração uma das opção:
    ( ) Declaração de variavel no sistema.
        Adicione o caminho do executável (`xmllint.exe`) à variável de ambiente `PATH` do windows.
    ( ) Ao declarar Tools({..., xmllint: 'diretorio/bin/xmllint.exe'}, ...) no proprio codigo.

#### 🐧 Linux (Debian/Ubuntu)

Execute o comando abaixo para instalar via APT:

```bash
sudo apt -y install libxml2-utils
```

---

## 🚀 Começando

### 1. Instalação

```bash
npm install biblioteca-nfe
# ou
yarn add biblioteca-nfe
