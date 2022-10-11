require('dotenv').config()
const express = require('express')
const app = express()


const cors = require('cors')
const userCademi = require('./router/userCademi')
const produtoCademi = require('./router/productCademi')
const useuarioProdutoCademi = require('./router/usersProductCademi')


const corsOptions = {
    exposedHeaders: ["x-access-token"],
  };
  
app.use(express.json())
app.use(cors(corsOptions));

app.use('/usuariosCademi',userCademi )
app.use('/produtosCademi',produtoCademi )
app.use('/usuarioProdutosCademi',useuarioProdutoCademi )


app.listen(process.env.PORT || '3000')

