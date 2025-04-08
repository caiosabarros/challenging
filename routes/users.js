const express = require('express');
const router = express.Router();
const { isAuthenticated } = require("./authenticate");

const usersController = require('../controllers/users');

// GET /user
router.get('/', usersController.getAll);
// GET /user/{username}
router.get('/:username', usersController.getSingle);
// POST /user
router.post('/', isAuthenticated, usersController.createUser);
// PUT /user/{username}
router.put('/:username', isAuthenticated, usersController.updateUser);
// DELETE /user/{username}
router.delete('/:username', isAuthenticated, usersController.deleteUser);


module.exports = router;
