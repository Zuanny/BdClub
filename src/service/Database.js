const knex = require('../database')

const getAllIdUser = async ()=>{
  try { 
    let usuarioId = await knex('usuario').select('id_usuario_cademi');
    return usuarioId
  } catch (error) {
    console.log(error);
  }
}

const getAllIdCademiProduct = async () => {
  try { 
    let produtoId = await knex('produto').select('id_produto_cademi');
    // console.log(productId);
    return produtoId
  } catch (error) {
    console.log(error);
  }
}


const obterTodosIdsUsuarioProdutosPorUltimoAcesso = async (ultimoAcesso = null) => {
  try { 
    let productId
    if (ultimoAcesso) {
       productId = await knex.select(['usuario_produtos.id_produto_cademi', 'usuario_produtos.id_usuario_cademi'])
                             .from('usuario_produtos')
                             .innerJoin('usuario','usuario.id_usuario_cademi','=','usuario_produtos.id_usuario_cademi')
                             .where('usuario.ultimo_acesso_em','>',ultimoAcesso )
        return productId
      }
                           

    productId = await knex('usuario_produtos').select(['id_produto_cademi', 'id_usuario_cademi'])
    return productId
    
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  getAllIdUser,
  getAllIdCademiProduct,
  obterTodosIdsUsuarioProdutosPorUltimoAcesso
}