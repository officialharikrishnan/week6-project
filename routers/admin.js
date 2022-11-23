var express = require('express');
var router = express.Router();
const {adminLoginRoute,getAllusersRoute,adminSession,isAdminLoggedIn,adminLogout}=require('../controller/adminController')
/* GET home page. */
router.get('/',isAdminLoggedIn,(req, res)=> {
  res.render('adminView/adminLogin');
});
router.post('/admin-login',adminLoginRoute)

router.get('/dashboard',adminSession,(req,res)=>{
  res.render('adminView/dashBoard',{admin:true})
})
router.get('/users',getAllusersRoute)
router.get('/logout',adminLogout)

module.exports = router;
