const express = require('express');
const router = express.Router();
const { isAuthenticated } = require("./authenticate");
const { validate, validationRules } = require("./validate.js");

const usersController = require('../controllers/users');

// GET /user
router.get('/', usersController.getAll);
// GET /user/{username}
router.get('/:username', usersController.getSingle);
// POST /user
router.post('/', isAuthenticated, validationRules[1], validate, usersController.createUser);
// PUT /user/{username}
router.put('/:username', isAuthenticated, validationRules[1], validate, usersController.updateUser);
// DELETE /user/{username}
router.delete('/:username', isAuthenticated, usersController.deleteUser);


module.exports = router;
