const axios = require('axios')
const serviceDatabase = require('../service/Database')
// let {access_token} =  await  serviceDatabase.obterRdToken()

const instance = axios.create({
  baseURL: 'https://api.rd.services',
  timeout: 10000
})

const atualizarToken = async () =>{
  let {refresh_token} = await serviceDatabase.obterRdRefreshTokens()
  try {
    let tokenAtualizado = await instance.post('/auth/token', {
      "client_id": process.env.RD_CLIENT_ID,
      "client_secret": process.env.RD_CLIENT_SECRET,
      "refresh_token": refresh_token
    })
   await serviceDatabase.atualiarRdToken({
      access_token: tokenAtualizado.data.access_token,
      refresh_token: tokenAtualizado.data.refresh_token
    })
    return tokenAtualizado.data.access_token
  } catch (error) {
    console.log(error);
  }
  
}

module.exports = {
  atualizarToken,
  instance
}