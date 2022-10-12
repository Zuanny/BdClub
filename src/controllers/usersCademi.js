const knex = require('../database')
const axios = require('../cademi/connectionAxios')
const {getAllUsersCademi} = require ('../service/UsersCademi.js')

const listUsers = async (req , res) => {

  try {
    let usersCademi = await getAllUsersCademi()
    return res.status(200).json(usersCademi)
  } catch (error) {
    return res.status(500).json(error)
  }
 

}

const userAtualization = async (req , res) => {
  
  let users = await getAllUsersCademi()
  if(!users){
    return res.status(400).json({menssagem: "Erro ao capturar dados da base do Cademi"})
  }
  let  usersAtualizationList = []
  try {
    for (usuarios of users) {
      if(usuarios.id){
        let usersAtualization = await knex('usuario')
        .insert({
          id_usuario_cademi: usuarios.id,
          nome: usuarios.nome,
          email: usuarios.email,
          celular: usuarios.celular,
          login_auto: usuarios.login_auto,
          gratis: usuarios.gratis,
          criado_em: usuarios.criado_em,
          ultimo_acesso_em: usuarios.ultimo_acesso_em,
        })
        .onConflict('id_usuario_cademi')
        .merge(['ultimo_acesso_em', 'celular', 'email'])
    
             usersAtualizationList.push([usersAtualization.command,usersAtualization.rowCount])
      }
      
    }
   
    return res.status(200).json(`Foram atualizados ${usersAtualizationList.length}`)
  } catch (error) {
    res.status(500).json({menssagem: "Erro ao salvar no banco de dados"})
  }

  

}

const listAcessUser = async (req, res) => {
  let {idOrEmail} = req.params
  if(!idOrEmail){
    return res.status(400).json({menssagem : "Id ou Email não passado"})
  }
  try {
    let usersCademi = await axios.get(`/usuario/acesso/${idOrEmail}`)
    console.log(usersCademi.data.data);
    return res.status(200).json(usersCademi.data.data)
  } catch (error) {
    return res.status(500).json(error)
  }
  
}

const progressUserByProduct = async (req, res) => {
  let {idOrEmail} = req.params
  let {idProduct} = req.params
  if(!idOrEmail || !idProduct ){
    return res.status(400).json({menssagem : "Parametro do cliente ou produto não passado"})
  }
  try {
    let usersCademi = await axios.get(`/usuario/progresso_por_produto/${idOrEmail}/${idProduct}`)
    
    console.log( usersCademi.data.data.progresso.aulas);
    return res.status(200).json(usersCademi.data.data)
    
  } catch (error) {
    return res.status(500).json(error)
  }
  
}


module.exports = {
  listUsers,
  listAcessUser,
  progressUserByProduct,
  userAtualization
}