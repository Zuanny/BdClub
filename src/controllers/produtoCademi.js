const knex = require('../database')
const { obterTodosProdutosCademiById, obterTodasAulasCademiById} = require ('../service/ProdutoCademi.js')


const produtoAtualizacao = async (req , res) => {
  
  let produtos = await obterTodosProdutosCademiById()
  if(!produtos){
    return res.status(400).json({menssagem: "Erro ao capturar dados da base do Cademi"})
  }
  let  listaProdutosAtualizados = []
  try {
    for (let produto of produtos) {
      if(produto.id){
        let produtoAtualizacao = await knex('produto')
        .insert({
          id_produto_cademi: produto.id,
          nome: produto.nome,
          ordem: produto.ordem,
          oferta_url: produto.oferta_url,
          vitrine_id: produto.vitrine.id,
          vitrine_ordem: produto.vitrine.ordem,
          vitrine_nome: produto.vitrine.nome
        })
        .onConflict('id_produto_cademi')
        .merge(['oferta_url', 'ordem'])
        listaProdutosAtualizados.push([produtoAtualizacao.command,produtoAtualizacao.rowCount])
      }
    }
    return res.status(200).json(listaProdutosAtualizados.length)
  } catch (error) {
    console.log(error);
    res.status(500).json({menssagem: "Erro ao salvar no banco de dados"})
  }

  

}

const aulaAtualizacao = async (req, res) => {
  try {
    let idsProdutos = await obterTodasAulasCademiById();
    let resposta = []
    
    for(let ids of idsProdutos){
        for(let itens of ids.aulas){
            let aulaAtualizadas = await knex('aulas')
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
            resposta.push([aulaAtualizadas.command,aulaAtualizadas.rowCount])
        }
      }
      return res.status(200).json(resposta.length + ' aulas Atualizadas')
    
  } catch (error) {
    return console.log(error);
  }
}


module.exports = {
  produtoAtualizacao,
  aulaAtualizacao
}