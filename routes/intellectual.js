const express = require('express');
const router = express.Router();
const isAuthenticated = require("./authenticate.js");

const intellectualController = require('../controllers/intellectual');

// GET / intellectual
router.get('/', intellectualController.getAll);
// GET / intellectual / { list_identifier }
router.get('/:listId', intellectualController.getSingle);
// GET / intellectual / users
router.get('/users', intellectualController.getUsersForIntellectual)
// POST / intellectual
router.post('/', isAuthenticated, intellectualController.createIntellectual);
// PUT / intellectual / { list_identifier }
router.put('/:listId', isAuthenticated, intellectualController.updateIntellectual);
// PUT / intellectual / { list_identifier }
router.put('/:listId/:username', isAuthenticated, intellectualController.updateIntellectualWithNewUser);
// DELETE / intellectual / { list_identifier }
router.delete('/:listId', isAuthenticated, intellectualController.deleteIntellectual);

module.exports = router;
