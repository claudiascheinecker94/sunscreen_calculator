const { Router } = require('express');
const userController = require('../controllers/userControllers');

const router = Router();

router.get('/userpage/:detailId', userController.userpage_get);
router.put('/userpage/:detailId', userController.userpage_put);
router.delete('/userpage/:id/deleteaccount', userController.deleteaccount_delete);
router.get(`/userpage/:id/goals`, userController.goals_get);
router.post(`/userpage/:id/goals`, userController.goals_post);
router.get(`/userpage/:id/news`, userController.news_get);
//router.get(`/userpage/:id/products`, userController.products_get);


module.exports = router;