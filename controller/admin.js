var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('adminView/adminLogin');
});
router.get('/dashboard',(req,res)=>{
  res.render('adminView/dashBoard',{admin:true})
})

module.exports = router;
