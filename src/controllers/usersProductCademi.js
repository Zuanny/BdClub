const knex = require('../database')
const ServiceUserProduct = require('../service/UserProductCademi')


const userProductsAtualization = async (req , res) => {
  
  let usersProducts = await ServiceUserProduct.getAllUserProductById()
  if(!usersProducts){
    return res.status(400).json({menssagem: "Erro ao capturar dados da base do Cademi"})
  }
  let  usersAtualizationList = []
  try {
    for (usuario of usersProducts) {
      for(produto of usuario.produtos){

        let existTabela = await knex('usuario_produtos')
                                .where({
                                        id_usuario_cademi:usuario.id,
                                        id_produto_cademi: produto.produto.id
                                      })
                                .first();
                                
        if(existTabela) {
          let usersAtualization = await knex('usuario_produtos') .where({
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
           usersAtualizationList.push([usersAtualization.command,usersAtualization.rowCount])

        }else{
          
          let usersAtualization = await knex('usuario_produtos')
          .insert({
            id_usuario_cademi: usuario.id,
            id_produto_cademi: produto.produto.id,
            duracao_total: produto.duracao,
            duracao_tipo: produto.duracao_tipo,
            comecou_em: produto.comecou_em,
            encerra_em: produto.encerra_em,
            encerrado: produto.encerrado
          })
          // .onConflict(['id_usuario_cademi', 'id_produto_cademi'])
          // .merge(['duracao_total', 'duracao_tipo', 'comecou_em','encerra_em','encerrado'])
               usersAtualizationList.push([usersAtualization.command,usersAtualization.rowCount])
        }
      }
    }
    return res.status(200).json(usersAtualizationList.length)
  } catch (error) {
    console.log(error);
    res.status(500).json({menssagem: "Erro ao salvar no banco de dados"})
  }

}

module.exports = {
  userProductsAtualization
}
