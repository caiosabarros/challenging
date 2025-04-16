const express = require('express');
const router = express.Router();
const { isAuthenticated } = require("./authenticate.js");
const { validate, validationRules } = require("./validate.js");
const rules = validationRules();
const emotionalController = require('../controllers/emotional');

// GET / emotional
router.get('/', emotionalController.getAll);
// GET / emotional / users
router.get('/users', emotionalController.getUsersForEmotional)
// GET / emotional / { list_identifier }
router.get('/:listId', emotionalController.getSingle);
// POST / emotional
router.post('/', isAuthenticated, rules[0], validate, emotionalController.createEmotional);
// PUT / emotional / { list_identifier }
router.put('/:listId', isAuthenticated, rules[0], validate, emotionalController.updateEmotional);
// PUT / emotional / { list_identifier }
router.put('/:listId/:username', isAuthenticated, emotionalController.updateEmotionalWithNewUser);
// DELETE / emotional / { list_identifier }
router.delete('/:listId', isAuthenticated, emotionalController.deleteEmotional);

module.exports = router;
