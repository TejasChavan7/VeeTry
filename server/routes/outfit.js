const express = require('express');
const router = express.Router();
const outfitController = require('../controllers/outfitController'); // Corrected import

router.post('/generate', outfitController.generateOutfit);

module.exports = router;
