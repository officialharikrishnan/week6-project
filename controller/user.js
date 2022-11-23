var express = require('express');
var router = express.Router();
const userHelpers = require('../model/user-helper/userHelper')

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('userView/login');
});
router.post('/login-submit',(req,res)=>{
  userHelpers.userLogin(req.body).then(()=>{
      res.redirect('/home')
  }).catch(()=>{
    res.render('userView/login',{error:"invalid email or password"})
  })
})
router.get('/signup', (req, res) => {
  res.render('userView/signup');
});
router.post('/signup-submit', (req, res) => {
  userHelpers.userSignup(req.body).then((response) => {
    res.redirect('/home')
  })
});
router.get('/home', (req, res) => {
  res.render('userView/homePage', { user: true });
});


module.exports = router;
