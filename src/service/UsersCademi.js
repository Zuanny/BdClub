const axios = require('../cademi/connectionAxios')
const utils = require('../utils')



let getAllUsersCademi = async()=>{

  try {
    let usersCademi = await axios.get('/usuario')
    if(usersCademi.status == 200){
      let usuarios = []
      usuarios.push(...usersCademi.data.data.usuario)
      
      let urlNova = usersCademi.data.data.paginator.next_page_url
      while(urlNova != null){
        
              
          let url = utils.retornaUrl(urlNova)
          usersCademi = await axios.get(url)
          // console.log(usersCademi.data.data);
          if(usersCademi.status == 200){
              usuarios.push(...usersCademi.data.data.usuario)
              urlNova = usersCademi.data.data.paginator.next_page_url;
          }else { return usuarios }

      }
          return usuarios
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  
}

module.exports = {
  getAllUsersCademi
}