const express = require('express')
const router = express()

const {listaUsuarios, ListaAcessoUsuario, usuarioProgressoByProduto,usuarioAtualizacao} = require('../controllers/usuarioCademi')


router.get('/', listaUsuarios)
router.get('/acessos/:idOrEmail', ListaAcessoUsuario)
router.get('/progresso_por_produto/:idOrEmail/:idProduct', usuarioProgressoByProduto)
router.patch('/', usuarioAtualizacao)


module.exports = router