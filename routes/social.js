const express = require('express');
const router = express.Router();

const socialController = require('../controllers/social');

// GET / social
router.get('/', socialController.getAll);
// GET / social / { list_identifier }
router.get('/:id', socialController.getSingle);
// GET / social / users
router.get('/users', socialController.getSocialChallengesByUser)
// POST / social
router.post('/', socialController.createSocialChallenge);
// PUT / social / { list_identifier }
router.put('/:id', socialController.updateSocialChallenge);
// DELETE / social / { list_identifier }
router.delete('/:id', socialController.deleteSocialChallenge);

module.exports = router;
