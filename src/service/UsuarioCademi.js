const axios = require('../cademi/connectionAxios')
const utils = require('../utils')



let obterTodosUsuariosCademi = async()=>{
  try {
    let usuariosCademi = await axios.get('/usuario')
    if(usuariosCademi.status == 200){
      let usuarios = []
      usuarios.push(...usuariosCademi.data.data.usuario)
      let urlNova = usuariosCademi.data.data.paginator.next_page_url
      while(urlNova != null){
          let url = utils.retornaUrl(urlNova)
          usuariosCademi = await axios.get(url)
          if(usuariosCademi.status == 200){
              usuarios.push(...usuariosCademi.data.data.usuario)
              urlNova = usuariosCademi.data.data.paginator.next_page_url;
          }
      }
      return usuarios
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  obterTodosUsuariosCademi
}