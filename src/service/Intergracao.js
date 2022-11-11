const {obterTodosUsuariosCademi} = require ('../service/UsuarioCademi.js')
const {obterTodosProdutosCademiById, obterTodasAulasCademiById} = require ('../service/ProdutoCademi.js')
const {modelarUsuario, modelarProduto, modelarAula, modelarUsuarioProduto, modelarUsuarioProdutoByAula, modelarUsuarioAula } = require('../utils')
const {inserirUsuario, inserirProdutoCademi, inserirAulaCademi, existeUsuarioProduto, atualizarUsuarioProduto, inserirUsuarioProduto,existeUsuarioAula, atualizarUsuarioAula, inserirUsuarioAula, obterTodosUsuariosEmailComUltimoAcesso} = require('../service/Database')
const UsuarioService = require('../service/UsuarioProdutoCademi')
const UsuarioRd = require('../service/UsuarioRdStation')


const atualizarUsuariosBancoDeDados = async () =>{
  let usuarios = await obterTodosUsuariosCademi()
  if(!usuarios){
    return res.status(400).json({menssagem: "Erro ao capturar dados da base do Cademi"})
  }
  let  listaAtualizacaoUsuarios = []
  try {
    for (let usuario of usuarios) {
      if(usuario.id){
        let usuarioModelo = modelarUsuario(usuario)
        let usuarioAtualizado = await inserirUsuario(usuarioModelo)
        listaAtualizacaoUsuarios.push(usuarioAtualizado)
      }
    }
    return (`Foram atualizados ${listaAtualizacaoUsuarios.length}`)
  } catch (error) {
    return {menssagem: "Erro ao salvar no banco de dados"}
  }
}


const atualizarProdutosBancoDeDados = async () => {
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
    return listaProdutosAtualizados.length
  } catch (error) {
    console.log(error);
    return{menssagem: "Erro ao salvar no banco de dados"}
  }
}

const atualizarAulasBancoDeDados = async () => {
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
      return (resposta.length + ' aulas Atualizadas')
  } catch (error) {
    return console.log(error);
  }

}

const atualizarUsuarioProdutosBancoDeDados = async () => {
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
    return {menssagem:'foram atualizadas ' + listaUsuariosAtualizados.length}
  } catch (error) {
    console.log(error);
    return {menssagem: "Erro ao salvar no banco de dados"}
  }
}

const  atualizarPorcentagemUsuarioProdutosBancoDeDados = async (ultimo_acesso = null) => {

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
    return `Foram atualizadas ${listaAtualizados.length} produtos`
  } catch (error) {
    console.log(error);
    return{menssagem: "Erro ao salvar no banco de dados"}
  }

}

const atualizarUltimoAcessoRd = async ()=>{
  try {
    const usuariosEmails = await obterTodosUsuariosEmailComUltimoAcesso();
    let usuariosAtualizados = []
    for (let usuario of usuariosEmails) {
      let usuarioAtualizado = await UsuarioRd.atualizarUsuario(usuario.email, usuario.datapassada)
      usuariosAtualizados.push(usuarioAtualizado)
    }
    return usuariosAtualizados
  } catch (error) {
    console.log(error);
    return error
  }
}

module.exports = {
  atualizarUsuariosBancoDeDados,
  atualizarProdutosBancoDeDados,
  atualizarAulasBancoDeDados,
  atualizarUsuarioProdutosBancoDeDados,
  atualizarPorcentagemUsuarioProdutosBancoDeDados,
  atualizarUltimoAcessoRd
}