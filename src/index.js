require('dotenv').config()
const express = require('express')
const app = express()


const cors = require('cors')
const usuarioCademi = require('./router/usuarioCademi')
const produtoCademi = require('./router/produtoCademi')
const usuarioProdutoCademi = require('./router/usuarioProdutoCademi')
const integracoesRd = require('./router/integracoes')
const test = require('./controllers/test')


const corsOptions = {
    exposedHeaders: ["Authorization"],
  };
  
app.use(express.json())
app.use(cors(corsOptions));

app.use('/usuariosCademi',usuarioCademi )
app.use('/produtosCademi',produtoCademi )
app.use('/usuarioProdutosCademi',usuarioProdutoCademi )
app.use('/rd',integracoesRd )
app.post('/teste',test.teste )


app.listen(process.env.PORT || '3000')

