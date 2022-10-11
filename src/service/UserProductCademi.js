const axios = require('../cademi/connectionAxios')
const utils = require('../utils')
const ServiceUserDatabase = require('../service/UserDatabase')


let getAllUserProductById = async()=>{

  try {
    let usersId = await ServiceUserDatabase.getAllIdUser()
    let usuariosProdutos = []
   
    
    for(id of usersId){
      let userProductCademi = await axios.get(`/usuario/acesso/${id.id_usuario_cademi}`)
      
      if(userProductCademi.status == 200){
        
        let usuario = {
          id: userProductCademi.data.data.usuario.id,
          produtos: userProductCademi.data.data.acesso
        }

        usuariosProdutos.push(usuario)
        
        
      }
    }
    return usuariosProdutos
  } catch (error) {
    console.log(error);
    return false;
  }
  
}


module.exports = {
  getAllUserProductById
}