const {
  atualizarUsuariosBancoDeDados,
  atualizarProdutosBancoDeDados,
  atualizarAulasBancoDeDados,
  atualizarUsuarioProdutosBancoDeDados,
  atualizarPorcentagemUsuarioProdutosBancoDeDados,
  atualizarUltimoAcessoRd
} = require('../service/Intergracao')

const atualizarUltimoAcesso = async (req , res) => {
  let {ultimo_acesso} = req.query
  ultimo_acesso ? ultimo_acesso : null

  try {
   await atualizarUsuariosBancoDeDados()
   console.log('atualizado Usuarios');
   await atualizarProdutosBancoDeDados()
   console.log('atualizado Produtos');

   await atualizarAulasBancoDeDados()
   console.log('atualizado Aulas');

   await atualizarUsuarioProdutosBancoDeDados()
   console.log('atualizado Usuario Produtos');
   await atualizarPorcentagemUsuarioProdutosBancoDeDados(ultimo_acesso)
   console.log('atualizado Usuario Produtos com detalhes de porcentagem' + ultimo_acesso);

   let resp = await atualizarUltimoAcessoRd()
   console.log('atualizado Usuarios no RdStation');
    return res.status(200).json(resp)
  } catch (error) {
    
  }
}
module.exports= {
  atualizarUltimoAcesso
}