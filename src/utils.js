let retornaUrl=(URL)=>{
  let arrayLink = URL.split('v1/')
  return arrayLink[1]
}

let getAllProductsId = async  (products)=>{
  let productsId = []
  for(let product of products){
    // console.log(product);
    productsId.push(product.id)
  }
  
  return productsId
}

module.exports = {
  retornaUrl,
  getAllProductsId
}