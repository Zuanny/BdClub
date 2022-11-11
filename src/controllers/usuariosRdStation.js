const {atualizarUltimoAcessoRd} = require('../service/Intergracao')

const atualizarUsuario = async (req, res) =>{
  let usuariosAtualizados = await atualizarUltimoAcessoRd()
  return res.status(200).json(usuariosAtualizados)
}

module.exports = {
  atualizarUsuario
}