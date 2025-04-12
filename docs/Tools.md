# 🧰 Instanciando a classe `Tools`

A classe `Tools` é responsável por operações centrais da NF-e/NFC-e: geração, assinatura, envio e validação de XMLs.

---

## ✨ Sintaxe

```ts
const config = {
  UF: 'SP', // Obrigatorio
  tpAmb: 2, //1-Produçao, 2-Homologação
  versao: '4.00', //Obrigatorio
  xmllint: '/usr/bin/xmllint.exe', //Optativo, caso sistema não tenha declarado nas variaveis.
  mod: '55', //Obrigatorio, 65 ou 55
  timeout: 60  //Optativo - Tempo limite de requisição
};
const certificado = {
  pfx: fs.readFileSync('./certs/empresa.pfx'),  //Obrigatorio, caminho para o arquivo .pfx
  senha: 'minhasenha123'                        //Obrigatorio, senha do certificado digital
};
const tools = new Tools(config, certificado);
```

## 📥 Método `xml2json(xml: string): Promise<object>`
## 📥 Método `json2xml(obj: object): Promise<string>`
Converte uma string XML em um objeto JavaScript.
Converte uma string XML em um objeto JavaScript.

### Exemplo entrada ou saida:
```xml
<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope">
  <soapenv:Body>
    <nfeResultMsg xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4">
      <retConsStatServ xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">
        <tpAmb>0</tpAmb>
        <verAplic>1.00</verAplic>
        <cStat>999</cStat>
        <xMotivo>Rejeicao: Erro nao catalogado</xMotivo>
        <cUF>51</cUF>
      </retConsStatServ>
    </nfeResultMsg>
  </soapenv:Body>
</soapenv:Envelope>
```
```json
{
  "soapenv:Envelope": {
    "@xmlns:soapenv": "http://www.w3.org/2003/05/soap-envelope",
    "soapenv:Body": {
      "nfeResultMsg": {
        "@xmlns": "http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4",
        "retConsStatServ": {
          "@xmlns": "http://www.portalfiscal.inf.br/nfe",
          "@versao": "4.00",
          "tpAmb": 0,
          "verAplic": "1.00",
          "cStat": 999,
          "xMotivo": "Rejeicao: Erro nao catalogado",
          "cUF": 51
        }
      }
    }
  }
}
```
## 📥 Método `sefazEnviaLote(xml: string, data: any = { idLote: 1, indSinc: 0, compactar: false }): Promise<string>`
Este método é responsável por enviar um lote de NF-e ou NFC-e para a SEFAZ. Ele recebe um XML contendo a NF-e/NFC-e a ser transmitida, além de um objeto de configuração que define parâmetros adicionais para o envio.
```ts
let xml = "Conteudo da NFCe/NFe".
let data = {
    idLote: 1, //Identificador de controle do envio do lote. 
    indSinc: 0, // 0 - Não, 1 = Sim || síncrono
    compactar: false
}
tools.sefazEnviaLote(xml, data);
```

## 📥 Método `async xmlSign(xmlJSON: string, data: any = { tag: "infNFe" }): Promise<string>`
Este método é responsável por **assinar digitalmente** o XML da NF-e ou NFC-e utilizando o certificado digital A1 (formato `.pfx`). A assinatura segue o padrão exigido pela SEFAZ e é essencial para a validação do documento fiscal.
```ts
let xml = "Conteudo da NFCe/NFe".
const xmlAssinado = await tools.xmlSign(xml, {
    tag: "infNFe" //Tag que vai ser usada para gerar assinatura.
});
```

## 📥 Método `getCertificado: Promise<object>`
Este método retorna, de forma assíncrona, o conteúdo do certificado digital **A1 (.pfx)** carregado na instância da classe `Tools`.
```ts
const certificado = await tools.getCertificado();
console.log(certificado) //{ca,key,cert}
```

## 📥 Método `async consultarNFe(chNFe: string): Promise<string>`
O método `consultarNFe` realiza a **consulta de uma NF-e ou NFC-e na SEFAZ** utilizando a chave de acesso completa da nota e retorna o status dela em xml.
```ts
const xmlStatus = await tools.consultarNFe("CHAVE DA NFE");
```

## 📥 Método `async sefazStatus(): Promise<string>`
O método `sefazStatus` realiza a **consulta ao servidor da SEFAZ** utilizando a UF de inicializaçao.
```ts
const xmlStatus = await tools.sefazStatus();
```