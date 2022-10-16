let retornaUrl=(URL)=>{
  let arrayLink = URL.split('v1/')
  return arrayLink[1]
}

let obterTodosIdsProduto = async  (products)=>{
  let productsId = []
  for(let product of products){
    productsId.push(product.id)
  }
  return productsId
}

let modelarProduto = (produto) => {
  let modeloProduto = {
    id_produto_cademi: produto.id,
    nome: produto.nome,
    ordem: produto.ordem,
    oferta_url: produto.oferta_url,
    vitrine_id: produto.vitrine.id,
    vitrine_ordem: produto.vitrine.ordem,
    vitrine_nome: produto.vitrine.nome
  }
  return modeloProduto
}


let modelarAula = (produtoId, aula) => {
  let aulaModelada = {
    id_aula_cademi: aula.id,
    id_produto_cademi: produtoId,
    nome: aula.nome,
    ordem: aula.ordem,
    secao_id: aula.secao.id,
    secao_tipo: aula.secao.tipo,
    secao_ordem: aula.secao.ordem,
    secao_nome: aula.secao.nome
    }

  return aulaModelada
}

let modelarUsuario = (usuario)=>{
  let usuarioModelo ={
    id_usuario_cademi: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    celular: usuario.celular,
    login_auto: usuario.login_auto,
    gratis: usuario.gratis,
    criado_em: usuario.criado_em,
    ultimo_acesso_em: usuario.ultimo_acesso_em,
  }
  return usuarioModelo
}

let modelarUsuarioProduto = (produto, usuario)=>{
  let usuarioProdutoModelo = {
    id_usuario_cademi: usuario.id,
    id_produto_cademi: produto.produto.id,
    duracao_total: produto.duracao,
    duracao_tipo: produto.duracao_tipo,
    comecou_em: produto.comecou_em,
    encerra_em: produto.encerra_em,
    encerrado: produto.encerrado
  }
  return usuarioProdutoModelo
}

let modelarUsuarioProdutoByAula = (produto)=>{
  let usuarioProdutoModelo = {
    porcentagem_aulas: produto.total,
    aulas_assistidas: produto.assistidas,
    aulas_completas: produto.completas
 }
  return usuarioProdutoModelo
}

let modelarUsuarioAula = (idUsuario, aula) => {
  let usuarioAula = {
    id_aula_cademi: aula.item_id,
    id_usuario_cademi: idUsuario,
    acesso_em: aula.acesso_em,
    count: aula.ordem
  }
  return usuarioAula
}
module.exports = {
  retornaUrl,
  obterTodosIdsProduto,
  modelarProduto,
  modelarAula,
  modelarUsuario,
  modelarUsuarioProduto,
  modelarUsuarioProdutoByAula,
  modelarUsuarioAula
}