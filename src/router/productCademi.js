const express = require('express')
const router = express()

const {productAtualization} = require('../controllers/productCademi')



router.patch('/', productAtualization)


module.exports = router