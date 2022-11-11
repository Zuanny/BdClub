const express = require('express')
const router = express()

const {atualizarUltimoAcesso} = require('../controllers/integracao')

router.get('/', atualizarUltimoAcesso)


module.exports = router