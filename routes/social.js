const express = require('express');
const router = express.Router();
const { isAuthenticated } = require("./authenticate");

const socialController = require('../controllers/social');

// GET / social
router.get('/', socialController.getAll);
// GET / social / { list_identifier }
router.get('/:listId', socialController.getSingle);
// GET / social / users
router.get('/users', socialController.getUsersForSocial)
// POST / social
router.post('/', isAuthenticated, socialController.createSocial);
// PUT / social / { list_identifier }
router.put('/:listId', isAuthenticated, socialController.updateSocial);
// PUT / social / { list_identifier }
router.put('/:listId/:username', isAuthenticated, socialController.updateSocialWithNewUser);
// DELETE / social / { list_identifier }
router.delete('/:listId', isAuthenticated, socialController.deleteSocial);

module.exports = router;
