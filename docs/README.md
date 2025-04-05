# 🚀 Bem-vindo à jornada de emissão de NF-e!

Aqui começa sua aventura pelo mundo fiscal brasileiro!  
Abaixo você encontrará todos os passos necessários para emitir suas Notas Fiscais Eletrônicas (NF-e) com sucesso e tranquilidade. 💡

---

## 📦 Requisitos

Antes de começar, verifique se seu ambiente está preparado:

- ✅ **Node.js** `v22.14.0` (versão testada e recomendada)
- ✅ **xmllint / libxml**  
  Utilizado para validação e assinatura de XML.  
  📚 Guia de instalação e uso:  
  👉 [Assinar XML com xmllint](https://github.com/kalmonv/node-sped-nfe/blob/main/docs/xmllint.md)

---

## 🧭 Passo a passo

Siga os passos abaixo na ordem para garantir uma emissão completa e válida:

1. 🧾 **Criação do XML da NF-e**  
   Gere corretamente seu XML com base nas regras da SEFAZ.  
   👉 [Documentação](https://github.com/kalmonv/node-sped-nfe/blob/main/docs/xml.md)

2. ✍️ **Assinar o XML**  
   Assine digitalmente o XML com seu certificado A1.  
   👉 [Como assinar](https://github.com/kalmonv/node-sped-nfe/blob/main/docs/assinar_xml.md)

3. 📡 **Enviar para a SEFAZ**  
   Transmita o XML assinado para a SEFAZ e obtenha o protocolo.  
   👉 [Envio e retorno](https://github.com/kalmonv/node-sped-nfe/blob/main/docs/sefaz.md)

4. 📬 **Entendendo as respostas da SEFAZ**  
   Interprete corretamente os códigos e status da resposta da SEFAZ.  
   👉 [Tabela de status](https://github.com/kalmonv/node-sped-nfe/blob/main/docs/sefaz_status.md)

---

## ✨ Pronto para emitir?

Com esses passos em mãos, você está oficialmente preparado para integrar a emissão de NF-e na sua aplicação!  
Se algo não funcionar, revise os links, verifique as dependências e conte com a comunidade. 😉

---

💙 Feito com dedicação para desenvolvedores que enfrentam a selva do SPED todos os dias.
