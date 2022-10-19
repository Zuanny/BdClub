const axios = require('../RdStation/connectionAxios')
const atualizarUsuario = async (email, diasSemAcesso)=>{

  try {
    
    let access_token=  await axios.atualizarToken()
    let usuario = await axios.instance.patch('/platform/contacts/email:'+ email, {
      
     cf_ultimo_acesso: diasSemAcesso
    },
    {  headers : {
        Authorization: `Bearer ${access_token}`
      }})
      
    return [usuario.data.uuid, usuario.data.email, usuario.data.name ]
  } catch (error) {
    console.log(error.response).data;
  }
}

module.exports = {
  atualizarUsuario
}