const express = require('express');
const router = express.Router();
const { isAuthenticated } = require("./authenticate.js");
const { validate, validationRules } = require("./validate.js");

const intellectualController = require('../controllers/intellectual');

// GET / intellectual
router.get('/', intellectualController.getAll);
// GET / intellectual / users
router.get('/users', intellectualController.getUsersForIntellectual)
// GET / intellectual / { list_identifier }
router.get('/:listId', intellectualController.getSingle);
// POST / intellectual
router.post('/', isAuthenticated, validationRules[0], validate, intellectualController.createIntellectual);
// PUT / intellectual / { list_identifier }
router.put('/:listId', isAuthenticated, validationRules[0], validate, intellectualController.updateIntellectual);
// PUT / intellectual / { list_identifier }
router.put('/:listId/:username', isAuthenticated, validationRules[0], validate, intellectualController.updateIntellectualWithNewUser);
// DELETE / intellectual / { list_identifier }
router.delete('/:listId', isAuthenticated, intellectualController.deleteIntellectual);

module.exports = router;
