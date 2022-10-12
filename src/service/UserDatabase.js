const knex = require('../database')

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
    // console.log(productId);
    return productId
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  getAllIdUser,
  getAllIdCademiProduct
}