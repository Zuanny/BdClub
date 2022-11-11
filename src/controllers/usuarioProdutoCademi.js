const {atualizarUsuarioProdutosBancoDeDados, atualizarPorcentagemUsuarioProdutosBancoDeDados} = require('../service/Intergracao')


const usuarioProdutosAtualizacao = async (req , res) => {
  let usuarioProdutos = await atualizarUsuarioProdutosBancoDeDados()
  return res.status(200).json(usuarioProdutos)
}


const atualizarUsuarioProdutosPorUltimoAcesso = async (req , res) => {
  let {ultimo_acesso} = req.query
  ultimo_acesso ? ultimo_acesso : null
  let UsuariosProdutosAtualizados = await atualizarPorcentagemUsuarioProdutosBancoDeDados(ultimo_acesso)
  return res.status(200).json(UsuariosProdutosAtualizados)
}



module.exports = {
  usuarioProdutosAtualizacao,
  atualizarUsuarioProdutosPorUltimoAcesso
}
