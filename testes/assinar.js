import SefazService from "../utils/sefaz.js";
const baseURL = DISTRIBUICAO[opts.tpAmb]
const options = {
  method: 'POST',
  data: data,
}
const client = new SefazService({
  baseURL: baseURL,
  ca: CA,
  cert: opts.cert,
  key: opts.key,
  requestOptions: opts.requestOptions,
  httpsOptions: opts.httpsOptions,
})

const retorno = await client.request(options)