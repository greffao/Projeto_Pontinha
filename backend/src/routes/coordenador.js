const router = require('express').Router();

const coordenadorController = require('../controllers/coordenadorController');

router
    .route('/coordenador')
    .post((req, res) => coordenadorController.create(req, res));

router
    .route('/coordenador')
    .get((req, res) => coordenadorController.getAll(req, res));

router
    .route('/coordenador/:login')
    .get((req, res) => coordenadorController.get(req, res));

router
    .route('/coordenador/:login')
    .delete((req, res) => coordenadorController.delete(req, res));

router
    .route('/coordenador/:login')
    .put((req, res) => coordenadorController.update(req, res));


module.exports = router;