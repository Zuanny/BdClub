const knex = require('../database')
const axios = require('../cademi/connectionAxios')
const {obterTodosUsuariosCademi} = require ('../service/UsuarioCademi.js')

const listaUsuarios = async (req , res) => {
  try {
    let usuariosCademi = await obterTodosUsuariosCademi()
    return res.status(200).json(usuariosCademi)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const usuarioAtualizacao = async (req , res) => {
  
  let usuarios = await obterTodosUsuariosCademi()
  if(!usuarios){
    return res.status(400).json({menssagem: "Erro ao capturar dados da base do Cademi"})
  }
  let  listaAtualizacaoUsuarios = []
  try {
    for (let usuario of usuarios) {
      if(usuario.id){
        let usersAtualization = await knex('usuario')
        .insert({
          id_usuario_cademi: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          celular: usuario.celular,
          login_auto: usuario.login_auto,
          gratis: usuario.gratis,
          criado_em: usuario.criado_em,
          ultimo_acesso_em: usuario.ultimo_acesso_em,
        })
        .onConflict('id_usuario_cademi')
        .merge(['ultimo_acesso_em', 'celular', 'email'])
    
        listaAtualizacaoUsuarios.push([usersAtualization.command,usersAtualization.rowCount])
      }
      
    }
   
    return res.status(200).json(`Foram atualizados ${listaAtualizacaoUsuarios.length}`)
  } catch (error) {
    res.status(500).json({menssagem: "Erro ao salvar no banco de dados"})
  }

  

}

const ListaAcessoUsuario = async (req, res) => {
  let {idOrEmail} = req.params
  if(!idOrEmail){
    return res.status(400).json({menssagem : "Id ou Email não passado"})
  }
  try {
    let usuarioCademi = await axios.get(`/usuario/acesso/${idOrEmail}`)
    return res.status(200).json(usuarioCademi.data.data)
  } catch (error) {
    return res.status(500).json(error)
  }
  
}

const usuarioProgressoByProduto = async (req, res) => {
  let {idOrEmail} = req.params
  let {idProduct} = req.params
  if(!idOrEmail || !idProduct ){
    return res.status(400).json({menssagem : "Parametro do cliente ou produto não passado"})
  }
  try {
    let usuarioCademi = await axios.get(`/usuario/progresso_por_produto/${idOrEmail}/${idProduct}`)
    return res.status(200).json(usuarioCademi.data.data)
  } catch (error) {
    return res.status(500).json(error)
  }
  
}


module.exports = {
  listaUsuarios,
  ListaAcessoUsuario,
  usuarioProgressoByProduto,
  usuarioAtualizacao
}