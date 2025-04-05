const express = require('express');
const router = express.Router();

const intellectualController = require('../controllers/intellectual');

// GET / intellectual
router.get('/', intellectualController.getAll);
// GET / intellectual / { list_identifier }
router.get('/:id', intellectualController.getSingle);
// GET / intellectual / users
router.get('/users', intellectualController.getIntellectualChallengesByUser)
// POST / intellectual
router.post('/', intellectualController.createIntellectualChallenge);
// PUT / intellectual / { list_identifier }
router.put('/:id', intellectualController.updateIntellectualChallenge);
// DELETE / intellectual / { list_identifier }
router.delete('/:id', intellectualController.deleteIntellectualChallenge);

module.exports = router;
