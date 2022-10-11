const express = require('express')
const router = express()

const {listUsers, listAcessUser, progressUserByProduct,userAtualization} = require('../controllers/usersCademi')


router.get('/', listUsers)
router.get('/acessos/:idOrEmail', listAcessUser)
router.get('/progresso_por_produto/:idOrEmail/:idProduct', progressUserByProduct)
router.patch('/', userAtualization)


module.exports = router