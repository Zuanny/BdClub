const express = require('express')
const router = express()

const {productAtualization, classAtualization} = require('../controllers/productCademi')



router.patch('/', productAtualization)
router.patch('/aulas', classAtualization)


module.exports = router