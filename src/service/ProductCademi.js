const axios = require('../cademi/connectionAxios')
const utils = require('../utils')



let getAllProductsCademi = async()=>{

  try {
    let productCademi = await axios.get('/produto')
    if(productCademi.status == 200){
      let produtos = []
      
      produtos.push(...productCademi.data.data.produto)
      
      let urlNova = productCademi.data.data.paginator.next_page_url
      while(urlNova != null){
        
              
          let url = utils.retornaUrl(urlNova)
          productCademi = await axios.get(url)
         
          if(productCademi.status == 200){
              usuarios.push(...productCademi.data.data.produto)
              urlNova = productCademi.data.data.paginator.next_page_url;
          }else { return produtos }

      }
          return produtos
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  
}

let getAllProductsCademiById = async ()=>{

  try {
    let products = await getAllProductsCademi()
    let ArrayOfProductId = await utils.getAllProductsId(products)
    let produtos = []
    for(id of ArrayOfProductId){
      let productCademi = await axios.get(`/produto/${id}`)
      if(productCademi.status == 200){
        produtos.push(productCademi.data.data.produto)
      }
    }
          return produtos
    
  } catch (error) {
    console.log(error);
    return false;
  }
  
}

module.exports = {
  
  getAllProductsCademi,
  getAllProductsCademiById
}