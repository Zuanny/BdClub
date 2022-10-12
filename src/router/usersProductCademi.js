const express = require('express')
const router = express()

const {userProductsAtualization, atualizarUsuarioProdutosPorUltimoAcesso} = require('../controllers/usersProductCademi')



router.patch('/', userProductsAtualization)
router.patch('/acesso', atualizarUsuarioProdutosPorUltimoAcesso)


module.exports = router