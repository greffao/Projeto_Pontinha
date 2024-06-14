const express = require('express');
const router = express.Router();

// Importar middleware de autenticação
const authController = require('../controllers/auth');

// Clube router
const clubeRouter = require('./clube');
router.use('/', clubeRouter);

// Coordenador router (protegido)
const coordenadorRouter = require('./coordenador');
router.use('/coordenador', authController.validate, coordenadorRouter);
// router.use('/', coordenadorRouter);

// Pergunta router
const perguntaRouter = require('./pergunta');
router.use('/', perguntaRouter);

// Tema router
const temaRouter = require('./tema');
router.use('/', temaRouter);

module.exports = router;
