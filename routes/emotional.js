const express = require('express');
const router = express.Router();
const { isAuthenticated } = require("./authenticate.js");

const emotionalController = require('../controllers/emotional');

// GET / emotional
router.get('/', emotionalController.getAll);
// GET / emotional / { list_identifier }
router.get('/:listId', emotionalController.getSingle);
// GET / emotional / users
router.get('/users', emotionalController.getUsersForEmotional)
// POST / emotional
router.post('/', isAuthenticated, emotionalController.createEmotional);
// PUT / emotional / { list_identifier }
router.put('/:listId', isAuthenticated, emotionalController.updateEmotional);
// PUT / emotional / { list_identifier }
router.put('/:listId/:username', isAuthenticated, emotionalController.updateEmotionalWithNewUser);
// DELETE / emotional / { list_identifier }
router.delete('/:listId', isAuthenticated, emotionalController.deleteEmotional);

module.exports = router;
