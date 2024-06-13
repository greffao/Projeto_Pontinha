const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// Rota de registro
router.post('/register', authController.register);

// Rota de login
router.post('/login', authController.login);

module.exports = router;
