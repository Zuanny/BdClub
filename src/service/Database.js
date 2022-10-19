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


const inserirProdutoCademi = async (produto)=>{
  let produtoAtualizacao = await knex('produto')
        .insert(produto)
        .onConflict('id_produto_cademi')
        .merge(['oferta_url', 'ordem'])
  return [produtoAtualizacao.command,produtoAtualizacao.rowCount]
}

const inserirAulaCademi = async (aula)=>{
  let aulaAtualizadas = await knex('aulas')
  .insert(aula)
  .onConflict('id_aula_cademi')
  .merge(['id_produto_cademi','nome', 'ordem','secao_tipo','secao_ordem','secao_nome'])
  return [aulaAtualizadas.command,aulaAtualizadas.rowCount]
}

const inserirUsuario = async (usuario)=>{
  let usuarioAtualizado = await knex('usuario')
  .insert(usuario)
  .onConflict('id_usuario_cademi')
  .merge(['ultimo_acesso_em', 'celular', 'email'])

  return [usuarioAtualizado.command,usuarioAtualizado.rowCount]
}


const existeUsuarioProduto = async (id_usuario_cademi, id_produto_cademi) => {
  let existTabela = await knex('usuario_produtos').where({id_usuario_cademi, id_produto_cademi}).first();
  return existTabela
}

const existeUsuarioAula = async (id_usuario_cademi, id_aula_cademi) => {
  let existTabela = await knex('usuario_aulas').where({id_usuario_cademi, id_aula_cademi}).first();
  return existTabela
}

const atualizarUsuarioProduto = async (id_usuario_cademi, id_produto_cademi,produto) =>{

  let usuarioAtualizacao = await knex('usuario_produtos')
  .where({ id_usuario_cademi, id_produto_cademi})
  .update(produto)

  return [usuarioAtualizacao.command,usuarioAtualizacao.rowCount];
}

const atualizarUsuarioAula = async (id_usuario_cademi, id_aula_cademi, aula) =>{

  let usuarioAtualizacao = await knex('usuario_aulas')
  .where({ id_usuario_cademi, id_aula_cademi})
  .update(aula)

  return [usuarioAtualizacao.command,usuarioAtualizacao.rowCount];
}

const inserirUsuarioProduto = async(usuarioProduto)=>{
  let usuarioAtualizacao = await knex('usuario_produtos').insert(usuarioProduto)
  return usuarioAtualizacao
}

const inserirUsuarioAula = async (usuarioAula) =>{
  let atualizarAula = await knex('usuario_aulas').insert(usuarioAula)
  return [atualizarAula.command, atualizarAula.rowCount ]
}

const obterRdToken = async ()=>{
  let token = await knex('rdtoken').select('access_token').where('id', 1).first()
  return token
}

const obterRdRefreshTokens = async ()=>{
  let token = await knex('rdtoken').select('refresh_token').where('id', 1).first()
  return token
}

const atualiarRdToken = async (token)=>{
  await knex('rdtoken').where('id',1).update(token)
  return
}

const obterUsuarioByEmail = async(email)=>{
try {
  let usuario = await knex('usuario').select(knex.raw(" *, to_date(ultimo_acesso_em, 'yyyy-mm-dd') , to_char((now() - to_date(ultimo_acesso_em, 'yyyy-mm-dd')), 'dd') as dataPassada")).where({email}).first()
  return usuario
} catch (error) {
  console.log(error);
}}

const obterTodosUsuariosEmailComUltimoAcesso = async () =>{
  try {
    let usuario = await knex('usuario').select('*');
    return usuario
  } catch (error) {
    console.log(error);
  }

}
module.exports = {
  obterTodosIdUsuario,
  obterTodosIdsProdutoCademi,
  obterTodosIdsUsuarioProdutosPorUltimoAcesso,
  inserirProdutoCademi,
  inserirAulaCademi,
  inserirUsuario,
  existeUsuarioProduto,
  atualizarUsuarioProduto,
  inserirUsuarioProduto,
  existeUsuarioAula,
  atualizarUsuarioAula,
  inserirUsuarioAula,
  obterRdToken,
  obterRdRefreshTokens,
  obterUsuarioByEmail,
  atualiarRdToken,
  obterTodosUsuariosEmailComUltimoAcesso
}