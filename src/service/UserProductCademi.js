const axios = require('../cademi/connectionAxios')
const ServiceDatabase = require('../service/Database')
const knex = require('../database')

let getAllUserProductById = async()=>{

  try {
    let usersId = await ServiceDatabase.getAllIdUser()
    let usuariosProdutos = []
    for(id of usersId){
          let userProductCademi = await axios.get(`/usuario/acesso/${id.id_usuario_cademi}`)
          if(userProductCademi.status == 200){
              let usuario = {
                    id: userProductCademi.data.data.usuario.id,
                    produtos: userProductCademi.data.data.acesso
              }
              usuariosProdutos.push(usuario)
          } 
    }
    return usuariosProdutos
  } catch (error) {
    console.log(error);
    return false;
  }
  
}

let obterTodosUsuarioProdutosDetalhes = async (ultimo_acesso = null) => {
  let listaIdsUsuarioProdutos = await ServiceDatabase.obterTodosIdsUsuarioProdutosPorUltimoAcesso(ultimo_acesso)
  let resposta = []
  let atualizacao={}
  for (ids of listaIdsUsuarioProdutos) {
    try {
      let obterProgressoPorAula = await axios.get(`/usuario/progresso_por_produto/${ids.id_usuario_cademi}/${ids.id_produto_cademi}`)
      ids.respAxios = obterProgressoPorAula.data.data.progresso
      let atualizacaoProdutos = await knex('usuario_produtos') .where({
        id_usuario_cademi:ids.id_produto_cademi,
        id_produto_cademi: ids.id_usuario_cademi,
        }).update({
        porcentagem_aulas: ids.respAxios.total,
        aulas_assistidas: ids.respAxios.assistidas,
        aulas_completas: ids.respAxios.completas,
        })
            
      atualizacao.produtoComando = atualizacaoProdutos.command
      atualizacao.produtoCount = atualizacaoProdutos.rowCount
      atualizacao.produtoAulas = []
                      
      for(aula of ids.respAxios.aulas){

        let existeAulas = await knex('usuario_aulas').where({
         id_aula_cademi:aula.item_id,
         id_usuario_cademi: ids.id_usuario_cademi
         }).first()

        if(existeAulas){
          let atualizarAula = await knex('usuario_aulas').where({
           id_aula_cademi:aula.item_id,
           id_usuario_cademi:ids.idUsuario
           }).update({ acesso_em:aula.acesso_em, count: aula.ordem })

          atualizacao.produtoAulas.push([atualizarAula.command, atualizarAula.rowCount ])
        }else{
          let atualizarAula = await knex('usuario_aulas').insert({
           id_aula_cademi: aula.item_id,
           id_usuario_cademi: ids.id_usuario_cademi,
           acesso_em: aula.acesso_em,
           count: aula.ordem
          })
            
          atualizacao.produtoAulas.push([atualizarAula.command, atualizarAula.rowCount ])
        }
      }
                
    
    } catch (error) {
      // console.log(error);
      
    }
  }
  return resposta
}

module.exports = {
  getAllUserProductById,
  obterTodosUsuarioProdutosDetalhes
}