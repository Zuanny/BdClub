const {obterTodosProdutosCademiById, obterTodasAulasCademiById} = require ('../service/ProdutoCademi.js')
const {inserirProdutoCademi, inserirAulaCademi} = require('../service/Database')
const {modelarProduto, modelarAula } = require('../utils')


const produtoAtualizacao = async (req , res) => {
  let produtos = await obterTodosProdutosCademiById()
  if(!produtos){
    return res.status(400).json({menssagem: "Erro ao capturar dados da base do Cademi"})
  }
  let  listaProdutosAtualizados = []
  try {
    for (let produto of produtos) {
      if(produto.id){
        let produtoModelo = modelarProduto(produto)
        let produtoAtualizacao = await inserirProdutoCademi(produtoModelo);
        listaProdutosAtualizados.push(produtoAtualizacao)
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
        let aulaAtualizadas = modelarAula(ids.produtoId, itens);
        let aulaAtualizada = await inserirAulaCademi(aulaAtualizadas);
        resposta.push(aulaAtualizada)
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