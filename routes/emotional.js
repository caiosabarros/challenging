const express = require('express');
const router = express.Router();

const emotionalController = require('../controllers/emotional');

// GET / emotional
router.get('/', emotionalController.getAll);
// GET / emotional / { list_identifier }
router.get('/:id', emotionalController.getSingle);
// GET / emotional / users
router.get('/users', emotionalController.getEmotionalChallengesByUser)
// POST / emotional
router.post('/', emotionalController.createEmotionalChallenge);
// PUT / emotional / { list_identifier }
router.put('/:id', emotionalController.updateEmotionalChallenge);
// DELETE / emotional / { list_identifier }
router.delete('/:id', emotionalController.deleteEmotionalChallenge);

module.exports = router;
