require('dotenv').config()
const express = require('express')
const app = express()


const cors = require('cors')
const usuarioCademi = require('./router/usuarioCademi')
const produtoCademi = require('./router/produtoCademi')
const usuarioProdutoCademi = require('./router/usuarioProdutoCademi')


const corsOptions = {
    exposedHeaders: ["x-access-token"],
  };
  
app.use(express.json())
app.use(cors(corsOptions));

app.use('/usuariosCademi',usuarioCademi )
app.use('/produtosCademi',produtoCademi )
app.use('/usuarioProdutosCademi',usuarioProdutoCademi )


app.listen(process.env.PORT || '3000')

