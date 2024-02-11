const { Router } = require('express');
const calcController = require('../controllers/calcControllers');

const router = Router();

router.post('/calculate', calcController.calculate_post);

module.exports = router;