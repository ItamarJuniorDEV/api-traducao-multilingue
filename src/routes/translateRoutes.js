const express = require('express');
const router = express.Router();
const TranslateController = require('../controllers/translateController');
const auth = require('../middleware/authMiddleware');

// Rota para tradução de texto
router.post('/traduzir', auth, TranslateController.traduzirTexto);

module.exports = router;