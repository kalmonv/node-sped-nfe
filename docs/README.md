# 🚀 Bem-vindo à jornada de emissão de NF-e!

Aqui começa sua aventura pelo mundo fiscal brasileiro!  
Abaixo você encontrará todos os passos necessários para emitir suas Notas Fiscais Eletrônicas (NF-e) com sucesso e tranquilidade. 💡

---

## 📦 Requisitos

Antes de começar, verifique se seu ambiente está preparado:

- ✅ **Node.js** `v22.14.0` (versão testada e recomendada)
- ✅ **xmllint / libxml**
   Utilizado para validação e assinatura de XML.  
- ✅ **OpenSSL**  

  📚 Guia de instalação e uso:  
  👉 [Requisitos](https://github.com/kalmonv/node-sped-nfe/blob/main/docs/requisitos.md)

---
## 📌 Considerações

O sistema atualmente segue o layout da **NF-e versão 4.00**, conforme os padrões da SEFAZ.

Está sendo desenvolvido com estrutura flexível para facilitar futuras adaptações a novas versões da NF-e.

🔗 **Leitura obrigatória**:  
Para uma integração correta, consulte sempre o **Manual de Integração do Contribuinte**, disponível em:  
[https://www.nfe.fazenda.gov.br/portal/listaConteudo.aspx?tipoConteudo=ndIjl+iEFdE=](https://www.nfe.fazenda.gov.br/portal/listaConteudo.aspx?tipoConteudo=ndIjl+iEFdE=)

> ⚠️ Manter-se atualizado com esse manual é essencial para garantir conformidade fiscal.

---

### 1. 🧾 Criar o XML da NF-e ou NFC-e 
   📚 Guia de instalação e uso:  
   [Documentação](https://github.com/kalmonv/node-sped-nfe/blob/main/docs/Make.md)
- 📂 **NF-e**: [Ver exemplo completo](https://github.com/kalmonv/node-sped-nfe/blob/main/exemplos/nfe.js)  
- 📂 **NFC-e**: [Ver exemplo completo](https://github.com/kalmonv/node-sped-nfe/blob/main/exemplos/nfce.js)

---

### 2. 🧾 Consulta status da sefaz

- 📂 **NF-e/NFC-e**: [Ver exemplo completo](https://github.com/kalmonv/node-sped-nfe/blob/main/exemplos/status.js)  

---

4. 📬 **Entendendo as respostas da SEFAZ**  
   Interprete corretamente os códigos e status da resposta da SEFAZ.  
   👉 [Tabela de status](https://github.com/kalmonv/node-sped-nfe/blob/main/docs/sefaz_status.md)

---

## ✨ Pronto para emitir?

Com esses passos em mãos, você está oficialmente preparado para integrar a emissão de NF-e na sua aplicação!  
Se algo não funcionar, revise os links, verifique as dependências e conte com a comunidade. 😉

---

💙 Feito com dedicação para desenvolvedores que enfrentam a selva do SPED todos os dias.
