const express = require('express');
const router = express.Router();
const isAuthenticated = require("./authenticate.js");

const usersController = require('../controllers/users');

// GET /user
router.get('/', usersController.getAll);
// GET /user/{username}
router.get('/:id', usersController.getSingle);
// POST /user
router.post('/', isAuthenticated, usersController.createUser);
// PUT /user/{username}
router.put('/:id', isAuthenticated, usersController.updateUser);
// DELETE /user/{username}
router.delete('/:id', isAuthenticated, usersController.deleteUser);


module.exports = router;
