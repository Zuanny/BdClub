const express = require('express')
const router = express()

const {produtoAtualizacao, aulaAtualizacao} = require('../controllers/produtoCademi')
const {atualizarUsuario} = require('../controllers/usuariosRdStation')
const {teste} = require('../controllers/test')



router.patch('/', produtoAtualizacao)
router.patch('/aulas', aulaAtualizacao)
router.patch('/rd',atualizarUsuario)
router.get('/teste',teste)


module.exports = router