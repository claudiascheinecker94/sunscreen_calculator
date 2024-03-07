const { Router } = require('express');
const userController = require('../controllers/userControllers');

const router = Router();

router.get('/userpage/:detailId', userController.userpage_get);
router.put('/userpage/:detailId', userController.userpage_put);
router.get(`/userpage/:id/goals`, userController.goals_get);
//router.get(`/userpage/:id/goals`, userController.readings_get);
router.post(`/userpage/:id/goals`, userController.goals_post);
router.get('/news', userController.news_get);


module.exports = router;