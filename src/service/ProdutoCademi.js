const axios = require('../cademi/connectionAxios')
const utils = require('../utils')
const ServiceDatabase = require('./Database')


let obterTodosProdutosCademi = async()=>{

  try {
    let produtosCademi = await axios.get('/produto')
    if(produtosCademi.status == 200){
      let produtos = []
      
      produtos.push(...produtosCademi.data.data.produto)
      
      let urlNova = produtosCademi.data.data.paginator.next_page_url
      while(urlNova != null){  
        produtosCademi = await axios.get(utils.retornaUrl(urlNova))
        if(produtosCademi.status == 200){
              usuarios.push(...produtosCademi.data.data.produto)
              urlNova = produtosCademi.data.data.paginator.next_page_url;
        }
      }
          return produtos
    }
  } catch (error) {
    console.log(error);
    return false;
  }
  
}

let obterTodosProdutosCademiById = async ()=>{

  try {
    let produtosCademi = await obterTodosProdutosCademi()
    let produtosCademiIds = await utils.obterTodosIdsProduto(produtosCademi)
    let produtos = []
    for(id of produtosCademiIds){
      let produtoCademi = await axios.get(`/produto/${id}`)
      if(produtoCademi.status == 200){
        produtos.push(produtoCademi.data.data.produto)
      }
    }
          return produtos
    
  } catch (error) {
    console.log(error);
    return false;
  }
  
}

let obterTodasAulasCademiById = async ()=>{

  try {
    let produtosIdsCademi = await ServiceDatabase.obterTodosIdsProdutoCademi();
    let aulasAssistidas = []
    
    for(itens of produtosIdsCademi){
      // console.log(itens);
      let aula = await axios.get(`/item/lista_por_produto/${itens.id_produto_cademi}`)
      if(aula.data.code = 200){
        padraoAula = {
          produtoId : itens.id_produto_cademi,
          aulas: aula.data.data.itens
        }
        aulasAssistidas.push(padraoAula)
      }
    }
    // console.log(aulasAssistidas);
    return aulasAssistidas
    
  } catch (error) {
    console.log(error);
    return false;
  }
  
}

module.exports = {
  
  obterTodosProdutosCademi,
  obterTodosProdutosCademiById,
  obterTodasAulasCademiById
}