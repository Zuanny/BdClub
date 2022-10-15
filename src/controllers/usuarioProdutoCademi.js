const knex = require('../database')
const UsuarioService = require('../service/UsuarioProdutoCademi')


const usuarioProdutosAtualizacao = async (req , res) => {
  
  let usuarioProdutos = await UsuarioService.obterTodosUsuarioProdutosById()
  if(!usuarioProdutos){
    return res.status(400).json({menssagem: "Erro ao capturar dados da base do Cademi"})
  }
  let  listaUsuariosAtualizados = []
  try {
    for (usuario of usuarioProdutos) {
      for(produto of usuario.produtos){

        let existTabela = await knex('usuario_produtos')
                          .where({
                            id_usuario_cademi:usuario.id,
                            id_produto_cademi: produto.produto.id
                          }).first();
                                
        if(existTabela) {
          let usuarioAtualizacao = await knex('usuario_produtos') .where({
            id_usuario_cademi:usuario.id,
            id_produto_cademi: produto.produto.id
          }).update({
             id_usuario_cademi: usuario.id,
             id_produto_cademi: produto.produto.id,
             duracao_total: produto.duracao,
             duracao_tipo: produto.duracao_tipo,
             comecou_em: produto.comecou_em,
             encerra_em: produto.encerra_em,
             encerrado: produto.encerrado
                              })
                              listaUsuariosAtualizados.push([usuarioAtualizacao.command,usuarioAtualizacao.rowCount])

        }else{
          
          let usuarioAtualizacao = await knex('usuario_produtos')
          .insert({
            id_usuario_cademi: usuario.id,
            id_produto_cademi: produto.produto.id,
            duracao_total: produto.duracao,
            duracao_tipo: produto.duracao_tipo,
            comecou_em: produto.comecou_em,
            encerra_em: produto.encerra_em,
            encerrado: produto.encerrado
          })
          listaUsuariosAtualizados.push([usuarioAtualizacao.command,usuarioAtualizacao.rowCount])
        }
      }
    }
    return res.status(200).json(listaUsuariosAtualizados.length)
  } catch (error) {
    console.log(error);
    res.status(500).json({menssagem: "Erro ao salvar no banco de dados"})
  }

}

const atualizarUsuarioProdutosPorUltimoAcesso = async (req , res) => {
  
  let {ultimo_acesso} = req.query
  ultimo_acesso ? ultimo_acesso : null

  let idsUsuarioEProdutos = await UsuarioService.obterTodosUsuarioProdutosDetalhes(ultimo_acesso)
  
  if(!idsUsuarioEProdutos){
    return res.status(400).json({menssagem: "Erro ao capturar dados da base do Cademi"})
  }
  let  listaAtualizados = []
  let atualizacao = {}
  try {
    for (ids of idsUsuarioEProdutos) {
          let atualizacaoProdutos = await knex('usuario_produtos') .where({
            id_usuario_cademi:ids.idUsuario,
            id_produto_cademi: ids.idProduto
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
          id_usuario_cademi:ids.idUsuario
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
            id_usuario_cademi: ids.idUsuario,
            acesso_em: aula.acesso_em,
            count: aula.ordem
          })

          atualizacao.produtoAulas.push([atualizarAula.command, atualizarAula.rowCount ])
        }
      }
      listaAtualizados.push(atualizacao)
    }
    return res.status(200).json(`Foram atualizadas ${listaAtualizados.length} produtos`)
  } catch (error) {
    console.log(error);
    res.status(500).json({menssagem: "Erro ao salvar no banco de dados"})
  }

}



module.exports = {
  usuarioProdutosAtualizacao,
  atualizarUsuarioProdutosPorUltimoAcesso
}
