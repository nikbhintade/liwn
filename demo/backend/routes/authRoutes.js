const express = require('express')
const router = express.Router();

const { nonce, authenticate } = require('../controllers/authController');

router.post('/nonce', nonce);
router.post('/authenticate', authenticate);

module.exports = router