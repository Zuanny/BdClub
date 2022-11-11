const axios = require('../cademi/connectionAxios')
const {obterTodosUsuariosCademi} = require ('../service/UsuarioCademi.js')
const {atualizarUsuariosBancoDeDados} = require('../service/Intergracao')

const listaUsuarios = async (req , res) => {
  try {
    let usuariosCademi = await obterTodosUsuariosCademi()
    return res.status(200).json(usuariosCademi)
  } catch (error) {
    return res.status(500).json(error)
  }
}


const usuarioAtualizacao = async (req , res) => {
  let resp = await atualizarUsuariosBancoDeDados()
  res.status(200).json(resp)
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