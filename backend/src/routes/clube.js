const router = require('express').Router();

const clubeController = require('../controllers/clubeController');
const authController = require('../controllers/auth');

// Middleware que valida as operações
const validateAuth = (req, res, next) => {
    return authController.validate(req, res, next);
};

router
    .route('/clube')
    .post(validateAuth, (req, res) => clubeController.create(req, res));

router
    .route('/clube')
    .get((req, res) => clubeController.getAll(req, res));

router
    .route('/clube/:cod')
    .get((req, res) => clubeController.get(req, res));

router
    .route('/clube/:cod')
    .delete(validateAuth, (req, res) => clubeController.delete(req, res));

router
    .route('/clube/:cod')
    .put(validateAuth, (req, res) => clubeController.update(req, res));


module.exports = router;