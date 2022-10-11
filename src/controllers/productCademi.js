const knex = require('../database')
const axios = require('../cademi/connectionAxios')
const { getAllProductsCademiById} = require ('../service/ProductCademi.js')



const productAtualization = async (req , res) => {
  
  let product = await getAllProductsCademiById()
  if(!product){
    return res.status(400).json({menssagem: "Erro ao capturar dados da base do Cademi"})
  }
  let  produtcsAtualizationList = []
  try {
    for (let produtos of product) {
      if(produtos.id){
        let productsAtualization = await knex('produto')
        .insert({
          id_produto_cademi: produtos.id,
          nome: produtos.nome,
          ordem: produtos.ordem,
          oferta_url: produtos.oferta_url,
          vitrine_id: produtos.vitrine.id,
          vitrine_ordem: produtos.vitrine.ordem,
          vitrine_nome: produtos.vitrine.nome
         
        })
        .onConflict('id_produto_cademi')
        .merge(['oferta_url', 'ordem'])
    
        produtcsAtualizationList.push([productsAtualization.command,productsAtualization.rowCount])
      }
      
    }
   
    return res.status(200).json(produtcsAtualizationList.length)
  } catch (error) {
    console.log(error);
    res.status(500).json({menssagem: "Erro ao salvar no banco de dados"})
  }

  

}






module.exports = {
  productAtualization
}