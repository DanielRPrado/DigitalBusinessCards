const express = require('express');
const router = express.Router();
const { createCard, getUserCards } = require('../controllers/cardController');

router.post('/create', createCard);
router.get('/:userId', getUserCards);

module.exports = router;