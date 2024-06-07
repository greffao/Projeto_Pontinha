const router = require('express').Router();

const temaController = require('../controllers/temaController');

router
    .route('/tema')
    .post((req, res) => temaController.create(req, res));

router
    .route('/tema')
    .get((req, res) => temaController.getAll(req, res));

router
    .route('/tema/:cod')
    .get((req, res) => temaController.get(req, res));

router
    .route('/tema/:cod')
    .delete((req, res) => temaController.delete(req, res));

router
    .route('/tema/:cod')
    .put((req, res) => temaController.update(req, res));


module.exports = router;