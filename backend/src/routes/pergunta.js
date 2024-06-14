const router = require('express').Router();

const perguntaController = require('../controllers/perguntaController');
const authController = require('../controllers/auth');

// Middleware que valida as operações
const validateAuth = (req, res, next) => {
    return authController.validate(req, res, next);
};

router
    .route('/pergunta')
    .post(validateAuth, (req, res) => perguntaController.create(req, res));

router
    .route('/pergunta')
    .get((req, res) => perguntaController.getAll(req, res));

router
    .route('/pergunta/:cod')
    .get((req, res) => perguntaController.get(req, res));

router
    .route('/pergunta/:cod')
    .delete(validateAuth, (req, res) => perguntaController.delete(req, res));

router
    .route('/pergunta/:cod')
    .put(validateAuth, (req, res) => perguntaController.update(req, res));


module.exports = router;