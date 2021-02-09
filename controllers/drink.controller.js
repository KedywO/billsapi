const express = require('express');
const router = express.Router();
const drinkService = require('../services/drink.service');
const authorize = require('../config/authorize');

module.exports = router;

router.post('/',authorize, drinkService.addDrink);
router.get('/', drinkService.getAll);
router.delete('/:id',authorize, drinkService.deleteDrink);
