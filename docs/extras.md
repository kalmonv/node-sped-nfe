# FUNÇOES EXTRAS

### 🟢 json2xml(object) <Promise>
Converte um JSON para XML.
```javascript
import {json2xml} from "node-sped-nfe"
```

### 🟢 xml2json(string) <Promise>
Converte um XML para JSON.
```javascript
import {xml2json} from "node-sped-nfe"
```

### 🟢 cUF2UF[string] <Promise>
Converte numero da UF para sigla da UF.
```javascript
import {cUF2UF} from "node-sped-nfe"
console.log(cUF2UF["51"]) // MT
```
### 🟢 UF2cUF[string] <Promise>
Converte sigla da UF para numero da UF.
```javascript
import {UF2cUF} from "node-sped-nfe"
console.log(UF2cUF["MT"]) // 51
```

### 🔴 impEstrutura[object] <Promise>
Retorna estrutura de imposto que deve ser preenchida, indicando passao a passo.
```javascript
import {impEstrutura} from "node-sped-nfe"
console.log(impEstrutura({})) // {ICMS, IPI, PIS, CONFINS}
console.log(impEstrutura({ICMS:null})) // {ICMS:{ CST: [lista de opc], qBCProd: 0, vAliqProd: 0, vPIS: 0 }}
```

### 🟢 formatData(new Date())
Retorna data formatada, caso não seja informada nem uma data o sistema ira gerar uma data atual.
```javascript
import {formatData} from "node-sped-nfe"
console.log(formatData()) // 2025-04-29T20:18:31-03:00
```

### 🟢 docZip(xmlDistNFe) <Promise>
Retorna data formatada, caso não seja informada nem uma data o sistema ira gerar uma data atual.
```javascript
import {docZip} from "node-sped-nfe"
console.log(docZip(xmlDistNFe)) // [{xml, NSU, schema}, {xml, NSU, schema}, ...]
```


### 🟢 certInfo(pfx, senha) <Promise>
Retorna informação do certificado
```javascript
import { certInfo } from "../dist/index.js"
import fs from "fs"

//pfx pode ser um Buffer ou diretorio para certificado!
const pfx = fs.readFileSync('../certificado.pfx')
//const pfx = '../certificado.pfx'
certInfo(pfx, 'senha').then(res => {
    console.log(res) //{ xNome: 'PROGRAMADORES GALATICOS', xMun: 'Novo JavaScript', UF: 'SP', xPais: 'BR', criado: '01/10/2025', validade: '01/10/2026', CNPJ/CPF: '00000000000000' }
}).catch(err => {
    console.error(err)
});
```