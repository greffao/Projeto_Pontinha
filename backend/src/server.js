const express = require('express');
const cors = require('cors');
const app = express()

app.use(cors());
app.use(express.json());

// Conexão com a Base de Dados
const conn = require('./db/conn');
conn();

// Router
const routes = require('./routes/router');

// Router de autenticação
const authRouter = require('./routes/auth');

// Definindo todas as rotas do servidor para /api
app.use('/api', routes);

// Definindo rotas de autenticação
app.use('/auth', authRouter);

app.listen(4242, () => console.log("Servidor rodando na porta 4242"));

// Username e Senha do Administrador do Banco de Dados estão armazenados na nuvem
