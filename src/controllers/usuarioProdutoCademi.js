const UsuarioService = require('../service/UsuarioProdutoCademi')
const {existeUsuarioProduto,  inserirUsuarioProduto,existeUsuarioAula, atualizarUsuarioAula, inserirUsuarioAula, atualizarUsuarioProduto} = require('../service/Database')
const {modelarUsuarioProduto, modelarUsuarioProdutoByAula, modelarUsuarioAula}= require('../utils')
const {atualizarUsuarioProdutosBancoDeDados, atualizarPorcentagemUsuarioProdutosBancoDeDados} = require('../service/Intergracao')


const usuarioProdutosAtualizacao = async (req , res) => {
  let usuarioProdutos = await atualizarUsuarioProdutosBancoDeDados()
  return res.status(200).json(usuarioProdutos)
}


// const  atualizarPorcentagemUsuarioProdutosBancoDeDados = async (ultimo_acesso) => {
//   let {ultimo_acesso} = req.query
//   ultimo_acesso ? ultimo_acesso : null

//   let idsUsuarioEProdutos = await UsuarioService.obterTodosUsuarioProdutosDetalhes(ultimo_acesso)
  
//   if(!idsUsuarioEProdutos){
//     return res.status(400).json({menssagem: "Erro ao capturar dados da base do Cademi"})
//   }
//   let  listaAtualizados = []
//   let atualizacao = {}
//   try {
//     for (ids of idsUsuarioEProdutos) {
//       let usuarioProdutoModeloByAula = modelarUsuarioProdutoByAula(ids.respAxios)
//       let atualizacaoProdutos = await atualizarUsuarioProduto(ids.idUsuario, ids.idProduto, usuarioProdutoModeloByAula)
//       atualizacao.produtoComando = atualizacaoProdutos.command
//       atualizacao.produtoCount = atualizacaoProdutos.rowCount
//       atualizacao.produtoAulas = []
          
//       for(aula of ids.respAxios.aulas){
//         let existeAulas = await existeUsuarioAula(ids.idUsuario, aula.item_id)
//         if(existeAulas){
//           let modeloUsuarioAula = modelarUsuarioAula(ids.idUsuario, aula)
//           let atualizarAula = await atualizarUsuarioAula(ids.idUsuario,aula.item_id, modeloUsuarioAula )
//           atualizacao.produtoAulas.push(atualizarAula)
//         }else{
//           let modeloUsuarioAula = modelarUsuarioAula(ids.idUsuario, aula)
//           let aulaAtualizada = await inserirUsuarioAula(modeloUsuarioAula)
//           atualizacao.produtoAulas.push(aulaAtualizada)
//         }
//       }
//       listaAtualizados.push(atualizacao)
//     }
//     return res.status(200).json(`Foram atualizadas ${listaAtualizados.length} produtos`)
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({menssagem: "Erro ao salvar no banco de dados"})
//   }

// }

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
