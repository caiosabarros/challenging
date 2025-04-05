const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

// GET /user
router.get('/', usersController.getAll);
// GET /user/{username}
router.get('/:id', usersController.getSingle);
// POST /user
router.post('/', usersController.createUser);
// PUT /user/{username}
router.put('/:id', usersController.updateUser);
// DELETE /user/{username}
router.delete('/:id', usersController.deleteUser);


module.exports = router;
