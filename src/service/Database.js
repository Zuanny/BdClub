const knex = require('../database')

const obterTodosIdUsuario = async ()=>{
  try { 
    let IdsUsuarios = await knex('usuario').select('id_usuario_cademi');
    return IdsUsuarios
  } catch (error) {
    console.log(error);
  }
}

const obterTodosIdsProdutoCademi = async () => {
  try { 
    let produtoId = await knex('produto').select('id_produto_cademi');
    return produtoId
  } catch (error) {
    console.log(error);
  }
}


const obterTodosIdsUsuarioProdutosPorUltimoAcesso = async (ultimoAcesso = null) => {
  try { 
    let idProduto
    if (ultimoAcesso) {
      idProduto = await knex.select(['usuario_produtos.id_produto_cademi', 'usuario_produtos.id_usuario_cademi'])
                             .from('usuario_produtos')
                             .innerJoin('usuario','usuario.id_usuario_cademi','=','usuario_produtos.id_usuario_cademi')
                             .where('usuario.ultimo_acesso_em','>',ultimoAcesso )
      return idProduto
    }
    idProduto = await knex('usuario_produtos').select(['id_produto_cademi', 'id_usuario_cademi'])
    return idProduto
    
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  obterTodosIdUsuario,
  obterTodosIdsProdutoCademi,
  obterTodosIdsUsuarioProdutosPorUltimoAcesso
}