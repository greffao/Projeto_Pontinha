const router = require('express').Router();

const clubeController = require('../controllers/clubeController');

router
    .route('/clube')
    .post((req, res) => clubeController.create(req, res));

router
    .route('/clube')
    .get((req, res) => clubeController.getAll(req, res));

router
    .route('/clube/:cod')
    .get((req, res) => clubeController.get(req, res));

router
    .route('/clube/:cod')
    .delete((req, res) => clubeController.delete(req, res));

router
    .route('/clube/:cod')
    .put((req, res) => clubeController.update(req, res));


module.exports = router;