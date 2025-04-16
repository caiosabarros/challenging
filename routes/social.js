const express = require('express');
const router = express.Router();
const { isAuthenticated } = require("./authenticate");
const { validate, validationRules } = require("./validate.js");

const socialController = require('../controllers/social');
const rules = validationRules();
// GET / social
router.get('/', socialController.getAll);
// GET / social / users
router.get('/users', socialController.getUsersForSocial)
// GET / social / { list_identifier }
router.get('/:listId', socialController.getSingle);
// POST / social
router.post('/', isAuthenticated, rules[0], validate, socialController.createSocial);
// PUT / social / { list_identifier }
router.put('/:listId', isAuthenticated, rules[0], validate, socialController.updateSocial);
// PUT / social / { list_identifier }
router.put('/:listId/:username', isAuthenticated, socialController.updateSocialWithNewUser);
// DELETE / social / { list_identifier }
router.delete('/:listId', isAuthenticated, socialController.deleteSocial);

module.exports = router;
