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

module.exports = {
  retornaUrl,
  obterTodosIdsProduto
}