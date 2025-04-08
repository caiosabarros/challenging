const express = require('express');
const router = express.Router();

const socialController = require('../controllers/social');

// GET / social
router.get('/', socialController.getAll);
// GET / social / { list_identifier }
router.get('/:listId', socialController.getSingle);
// GET / social / users
router.get('/users', socialController.getUsersForSocial)
// POST / social
router.post('/', socialController.createSocial);
// PUT / social / { list_identifier }
router.put('/:listId', socialController.updateSocial);
// PUT / social / { list_identifier }
router.put('/:listId/:username', socialController.updateSocialWithNewUser);
// DELETE / social / { list_identifier }
router.delete('/:listId', socialController.deleteSocial);

module.exports = router;
