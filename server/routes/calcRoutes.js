const { Router } = require('express');
const calcController = require('../controllers/calcControllers');

const router = Router();

router.get('/calculate', calcController.calculate_get);
router.post('/calculate', calcController.calculate_post);

module.exports = router;