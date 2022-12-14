var express = require('express');
var router = express.Router();
const {adminLoginRoute,getAllusersRoute,adminSession,isAdminLoggedIn,adminLogout,addUserRoute,editPage,editUserRoute,deleteUser}=require('../controller/adminController');
const { nocache } = require('../controller/userController');

// router.get('/',isAdminLoggedIn,(req, res)=> {
//   res.render('adminView/adminLogin');
// });
router.post('/admin-login',adminLoginRoute)

router.get('/',nocache,isAdminLoggedIn)
router.get('/dashboard',adminSession,getAllusersRoute)
router.get('/adduser',adminSession,(req,res)=>{
  res.render('adminView/addUser',{admin:true,addUser:true})
})
router.post('/adduser-submit',adminSession,addUserRoute)
router.get('/edituser/:id',adminSession,editPage)
router.post('/edituser-submit/:id',adminSession,editUserRoute)
router.get('/deleteuser/:id',deleteUser)
router.get('/logout',adminLogout)

module.exports = router;