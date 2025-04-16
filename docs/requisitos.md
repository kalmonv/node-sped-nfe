# Requisitos do Projeto

Este projeto foi desenvolvido e testado com os seguintes requisitos. Certifique-se de instalá-los corretamente para garantir o funcionamento adequado.

## 1. Node.js

- **Versão testada**: `v22.1.4`  
- É altamente recomendável utilizar a mesma versão para evitar incompatibilidades.

### 1.1 Links para Download

- [Node.js para Windows](https://nodejs.org/dist/v22.1.4/node-v22.1.4-x64.msi)
- [Node.js para Linux](https://nodejs.org/dist/v22.1.4/node-v22.1.4-linux-x64.tar.xz)

## 2. LibXml + OpenSSL
- **LibXml**: `v2.9.3`
- Validação do xml atraves do schema.
- **OpenSSL**: `v3.5.0` 
- Leitura certificado.
### 2.1 Links para Download

- Windows [Libxml2+OpenSSL](https://raw.githubusercontent.com/kalmonv/node-sped-nfe/refs/heads/main/docs/windows%20libs.zip) ou individual [libxml2](http://xmlsoft.org/sources/win32/) + [OpenSSL](https://slproweb.com/products/Win32OpenSSL.html)
- Para Linux, você pode instalar via terminal:
  ```bash
  sudo apt install libxml2-utils openssl