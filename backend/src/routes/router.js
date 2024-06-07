// Esse .js do router adiciona as rotas das tabelas ao router que será usado pelo server.js

const router = require('express').Router();

// Clube router
const clubeRouter = require('./clube');
router.use('/', clubeRouter);

// Coordenador router
const coordenadorRouter = require('./coordenador');
router.use('/', coordenadorRouter);

// Pergunta router
const perguntaRouter = require('./pergunta');
router.use('/', perguntaRouter);

// Tema router
const temaRouter = require('./tema');
router.use('/', temaRouter);

module.exports = router;

