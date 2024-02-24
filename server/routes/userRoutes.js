const { Router } = require('express');
const userController = require('../controllers/userControllers');

const router = Router();

router.get('/userpage/:detailId', userController.userpage_get);
router.put('/userpage/:detailId', userController.userpage_put);
router.get('/news', userController.news_get);

module.exports = router;