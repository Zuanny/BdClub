const rdAxios = require('../RdStation/connectionAxios')

const teste = async (req , res)=>{
  try {
    
    let access_token=  await rdAxios.atualizarToken()

    let rota = await rdAxios.instance.post('/platform/events',
    {
      "event_type": "CONVERSION",
      "event_family":"CDP",
      "payload": {
      "conversion_identifier": "Name of the conversion event",
      "email": "gustavo@brunodoria.com.br",
      "cf_ultimo_acesso": "10/02/1905"
      }
      },{headers : {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5yZC5zZXJ2aWNlcyIsInN1YiI6InFvcDRHMHhobGVOSDJldnpMdXVsNmQ1QjlsUV9yaE1kQzZFNE9sVHoxRlVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBwLnJkc3RhdGlvbi5jb20uYnIvYXBpL3YyLyIsImFwcF9uYW1lIjoicm9kcmlnb0xlYWRzIiwiZXhwIjoxNjY2MjMxMjg3LCJpYXQiOjE2NjYxNDQ4ODcsInNjb3BlIjoiIn0.IPQBjzrMXBhMIOTgBbHtB11TXVyCxuI6yYX0vPoZBuLsrydo8E621AvObKRsfUSeXq0wXE15zAJyMdreOxBloDdOH5QQdKfAh4cxmjEM0HaQxllGpoCrJLOXLxbL8gD9M89ENiflwcD0snJZ9cydFbBOze2ql23pwrmfGmu7K5xD0_WBVaft_BwoLpfkza0MrneWTWRpOzgaiRm8m6M0l-Zxv4zwJ2atffYWeuzyoDL_0PfD_AnLS2Pp7oTz_gt9cws5i5psPtsrM1K7Ykgj1gY9-QRkEAZE3PQMkDpkHzbf2vn7sKgdEYBNT63-kxsaUA9iFvn5TDpAJru7JICuWQ`
      }})
        

    console.log(rota);
    return res.status(200).json(rota)
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  teste
}