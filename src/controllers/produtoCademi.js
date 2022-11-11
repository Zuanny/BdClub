const {atualizarProdutosBancoDeDados, atualizarAulasBancoDeDados} = require('../service/Intergracao')


const produtoAtualizacao = async (req , res) => {
  let produtos = await atualizarProdutosBancoDeDados()
  return res.status(200).json(produtos)
}

const aulaAtualizacao = async (req, res) => {
  let aulas = await atualizarAulasBancoDeDados()
  return res.status(200).json(aulas)
}


module.exports = {
  produtoAtualizacao,
  aulaAtualizacao
}