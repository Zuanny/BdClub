const express = require('express')
const router = express()

const {usuarioProdutosAtualizacao, atualizarUsuarioProdutosPorUltimoAcesso} = require('../controllers/usuarioProdutoCademi')



router.patch('/', usuarioProdutosAtualizacao)
router.patch('/acesso', atualizarUsuarioProdutosPorUltimoAcesso)


module.exports = router