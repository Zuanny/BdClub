const express = require('express')
const router = express()

const {userProductsAtualization} = require('../controllers/usersProductCademi')



router.patch('/', userProductsAtualization)


module.exports = router