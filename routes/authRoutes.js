const { Router } = require('express');
const authController = require('../controllers/authControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);

router.use('/accountsetup', authMiddleware.checkUser); //using middleware to get userID from cookie
router.get('/accountsetup/:userId', authController.accountsetup_get);
router.post('/accountsetup', authController.accountsetup_post);
router.use('/userpage', authMiddleware.checkUser); 
router.get('/userpage/:detailId', authController.userpage_get);


router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router;