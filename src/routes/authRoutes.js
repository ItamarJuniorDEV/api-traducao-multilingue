const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.post('/registrar', AuthController.registrarUsuario);

router.post('/login', AuthController.loginUsuario);

module.exports = router;