const UsuarioRd = require('../service/UsuarioRdStation')
const {obterUsuarioByEmail, obterTodosUsuariosEmailComUltimoAcesso} = require('../service/Database')

const atualizarUsuario = async (req, res) =>{

  try {
    const usuariosEmails = await obterTodosUsuariosEmailComUltimoAcesso();
    let usuariosAtualizados = []
    for (let usuario of usuariosEmails) {
      const usuarioEmail = await obterUsuarioByEmail(usuario.email);
      let usuarioAtualizado = await UsuarioRd.atualizarUsuario(usuarioEmail.email, usuarioEmail.datapassada)
      
      usuariosAtualizados.push(usuarioAtualizado)
    }
    return res.status(200).json(usuariosAtualizados)
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }

}

module.exports = {
  atualizarUsuario
}