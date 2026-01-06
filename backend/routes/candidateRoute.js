const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const upload = require('../middleware/upload');

router.post('/', upload.array('documents', 5), candidateController.createCandidate);
router.get('/', candidateController.getAllCandidates);

module.exports = router;