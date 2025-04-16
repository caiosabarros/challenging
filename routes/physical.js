const express = require('express');
const router = express.Router();
const { isAuthenticated } = require("./authenticate.js");
const { validate, validationRules } = require("./validate.js");

const physicalController = require('../controllers/physical');

// GET / physical
router.get('/', physicalController.getAll);
// GET / physical / users
router.get('/users', physicalController.getUsersForPhysical)
// GET / physical / { list_identifier }
router.get('/:listId', physicalController.getSingle);
// POST / physical
router.post('/', isAuthenticated, validationRules[0], validate, physicalController.createPhysical);
// PUT / physical / { list_identifier }
router.put('/:listId', isAuthenticated, validationRules[0], validate, physicalController.updatePhysical);
// PUT / physical / { list_identifier }
router.put('/:listId/:username', isAuthenticated, physicalController.updatePhysicalWithNewUser);
// DELETE / physical / { list_identifier }
router.delete('/:listId', isAuthenticated, physicalController.deletePhysical);

module.exports = router;
