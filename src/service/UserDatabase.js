const axios = require('../cademi/connectionAxios')
const knex = require('../database')
const utils = require('../utils')

const getAllIdUser = async ()=>{
  try { 
    let usersId = await knex('usuario').select('id_usuario_cademi');
    return usersId
  } catch (error) {
    console.log(error);
  }
}

const getAllIdCademiProduct = async () => {
  try { 
    let productId = await knex('produto').select('id_produto_cademi');
    return productId
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  getAllIdUser,
  getAllIdCademiProduct
}