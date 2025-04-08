const express = require('express');
const router = express.Router();

const physicalController = require('../controllers/physical');

// GET / physical
router.get('/', physicalController.getAll);
// GET / physical / { list_identifier }
router.get('/:listId', physicalController.getSingle);
// GET / physical / users
router.get('/users', physicalController.getUsersForPhysical)
// POST / physical
router.post('/', physicalController.createPhysical);
// PUT / physical / { list_identifier }
router.put('/:listId', physicalController.updatePhysical);
// PUT / physical / { list_identifier }
router.put('/:listId/:username', physicalController.updatePhysicalWithNewUser);
// DELETE / physical / { list_identifier }
router.delete('/:listId', physicalController.deletePhysical);

module.exports = router;
