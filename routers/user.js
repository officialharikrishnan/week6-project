var express = require('express');
var router = express.Router();
const { userLoginRoute, userSignupRoute,accountInfo, sessionCheck, logOut, isLoggedIn } = require('../controller/userController')




/* GET users listing. */
router.get('/', isLoggedIn, (req, res) => {
  res.render('userView/login');
});
router.post('/login-submit', userLoginRoute)

router.get('/signup', (req, res) => {
  res.render('userView/signup');
});
router.post('/signup-submit', userSignupRoute);

router.get('/home', sessionCheck, (req, res) => {
  res.render('userView/homePage', { user: true ,name:req.session.user.name});
});
router.get('/account',sessionCheck,accountInfo)
router.get('/logout', logOut)


module.exports = router;
