const UsuarioService = require('../service/UsuarioProdutoCademi')
const {existeUsuarioProduto, atualizarUsuarioProduto, inserirUsuarioProduto,existeUsuarioAula, atualizarUsuarioAula, inserirUsuarioAula} = require('../service/Database')
const {modelarUsuarioProduto, modelarUsuarioProdutoByAula, modelarUsuarioAula}= require('../utils')


const usuarioProdutosAtualizacao = async (req , res) => {
  let usuarioProdutos = await UsuarioService.obterTodosUsuarioProdutosById()
  if(!usuarioProdutos){
    return res.status(400).json({menssagem: "Erro ao capturar dados da base do Cademi"})
  }
  let  listaUsuariosAtualizados = []
  try {
    for (usuario of usuarioProdutos) {
      for(produto of usuario.produtos){
        let existTabela = await existeUsuarioProduto(usuario.id, produto.produto.id)
        if(existTabela) {
          produto.id = produto.produto.id
          let usuarioProduto = modelarUsuarioProduto(produto, usuario)
          let usuarioAtualizado = await atualizarUsuarioProduto(usuario.id, produto.id, usuarioProduto)
          listaUsuariosAtualizados.push(usuarioAtualizado)
        }else{
          produto.id = produto.produto.id
          let usuarioProduto = modelarUsuarioProduto(produto, usuario)
          let usuarioProdutoAtualizado = await inserirUsuarioProduto(usuarioProduto)
          listaUsuariosAtualizados.push(usuarioProdutoAtualizado)
        }
      }
    }
    return res.status(200).json({menssagem:'foram atualizadas' + listaUsuariosAtualizados.length})
  } catch (error) {
    console.log(error);
    res.status(500).json({menssagem: "Erro ao salvar no banco de dados"})
  }

}

const atualizarUsuarioProdutosPorUltimoAcesso = async (req , res) => {
  
  let {ultimo_acesso} = req.query
  ultimo_acesso ? ultimo_acesso : null

  let idsUsuarioEProdutos = await UsuarioService.obterTodosUsuarioProdutosDetalhes(ultimo_acesso)
  
  if(!idsUsuarioEProdutos){
    return res.status(400).json({menssagem: "Erro ao capturar dados da base do Cademi"})
  }
  let  listaAtualizados = []
  let atualizacao = {}
  try {
    for (ids of idsUsuarioEProdutos) {
      let usuarioProdutoModeloByAula = modelarUsuarioProdutoByAula(ids.respAxios)
      let atualizacaoProdutos = await atualizarUsuarioProduto(ids.idUsuario, ids.idProduto, usuarioProdutoModeloByAula)
      atualizacao.produtoComando = atualizacaoProdutos.command
      atualizacao.produtoCount = atualizacaoProdutos.rowCount
      atualizacao.produtoAulas = []
          
      for(aula of ids.respAxios.aulas){
        let existeAulas = await existeUsuarioAula(ids.idUsuario, aula.item_id)
        if(existeAulas){
          let modeloUsuarioAula = modelarUsuarioAula(ids.idUsuario, aula)
          let atualizarAula = await atualizarUsuarioAula(ids.idUsuario,aula.item_id, modeloUsuarioAula )
          atualizacao.produtoAulas.push(atualizarAula)
        }else{
          let modeloUsuarioAula = modelarUsuarioAula(ids.idUsuario, aula)
          let aulaAtualizada = await inserirUsuarioAula(modeloUsuarioAula)
          atualizacao.produtoAulas.push(aulaAtualizada)
        }
      }
      listaAtualizados.push(atualizacao)
    }
    return res.status(200).json(`Foram atualizadas ${listaAtualizados.length} produtos`)
  } catch (error) {
    console.log(error);
    res.status(500).json({menssagem: "Erro ao salvar no banco de dados"})
  }

}



module.exports = {
  usuarioProdutosAtualizacao,
  atualizarUsuarioProdutosPorUltimoAcesso
}
