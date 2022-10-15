const express = require('express')
const router = express()

const {produtoAtualizacao, aulaAtualizacao} = require('../controllers/produtoCademi')



router.patch('/', produtoAtualizacao)
router.patch('/aulas', aulaAtualizacao)


module.exports = router