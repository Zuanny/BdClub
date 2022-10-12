const knex = require('../database')
const { getAllProductsCademiById, getAllClassCademiById} = require ('../service/ProductCademi.js')


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

const classAtualization = async (req, res) => {
  try {
    let productIds = await getAllClassCademiById();
    let resposta = []
    
    for(let ids of productIds){
        for(let itens of ids.aulas){
              
            let classAtualization = await knex('aulas')
              .insert({
                id_aula_cademi: itens.id,
                id_produto_cademi: ids.produtoId,
                nome: itens.nome,
                ordem: itens.ordem,
                secao_id: itens.secao.id,
                secao_tipo: itens.secao.tipo,
                secao_ordem: itens.secao.ordem,
                secao_nome: itens.secao.nome
              })
              .onConflict('id_aula_cademi')
              .merge(['id_produto_cademi','nome', 'ordem','secao_tipo','secao_ordem','secao_nome'])
            resposta.push([classAtualization.command,classAtualization.rowCount])
        }

      }
      return res.status(200).json(resposta.length + ' aulas Atualizadas')
    
  } catch (error) {
    return console.log(error);
  }
}


module.exports = {
  productAtualization,
  classAtualization
}