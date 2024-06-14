const router = require('express').Router();

const temaController = require('../controllers/temaController');
const authController = require('../controllers/auth');

// Middleware que valida as operações
const validateAuth = (req, res, next) => {
    return authController.validate(req, res, next);
};

router
    .route('/tema')
    .post(validateAuth, (req, res) => temaController.create(req, res));

router
    .route('/tema')
    .get((req, res) => temaController.getAll(req, res));

router
    .route('/tema/:cod')
    .get((req, res) => temaController.get(req, res));

router
    .route('/tema/:cod')
    .delete(validateAuth, (req, res) => temaController.delete(req, res));

router
    .route('/tema/:cod')
    .put(validateAuth, (req, res) => temaController.update(req, res));


module.exports = router;