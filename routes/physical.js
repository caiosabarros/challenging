const express = require('express');
const router = express.Router();

const physicalController = require('../controllers/physical');

// GET / physical
router.get('/', physicalController.getAll);
// GET / physical / { list_identifier }
router.get('/:id', physicalController.getSingle);
// GET / physical / users
router.get('/users', physicalController.getPhysicalChallengesByUser)
// POST / physical
router.post('/', physicalController.createPhysicalChallenge);
// PUT / physical / { list_identifier }
router.put('/:id', physicalController.updatePhysicalChallenge);
// DELETE / physical / { list_identifier }
router.delete('/:id', physicalController.deletePhysicalChallenge);

module.exports = router;
