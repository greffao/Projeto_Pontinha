const router = require('express').Router();

const perguntaController = require('../controllers/perguntaController');

router
    .route('/pergunta')
    .post((req, res) => perguntaController.create(req, res));

router
    .route('/pergunta')
    .get((req, res) => perguntaController.getAll(req, res));

router
    .route('/pergunta/:cod')
    .get((req, res) => perguntaController.get(req, res));

router
    .route('/pergunta/:cod')
    .delete((req, res) => perguntaController.delete(req, res));

router
    .route('/pergunta/:cod')
    .put((req, res) => perguntaController.update(req, res));


module.exports = router;