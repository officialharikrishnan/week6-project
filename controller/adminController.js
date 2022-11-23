var adminHelper = require('../model/admin-helper/admin-helper')
module.exports = {
    adminLoginRoute: (req, res) => {
        adminHelper.adminLogin(req.body).then(() => {
            req.session.admin=req.body.id
            req.session.adminLoggedIn=true
            res.redirect('/admin/dashboard')
        })
            .catch(() => {
                res.render('adminView/adminLogin', { error: "invalid ID or Password" })
            })
    },
    getAllusersRoute: (req, res) => {
        adminHelper.getAllUsers().then((response) => {
            res.render('adminView/users', { response, admin: true })
        })
            .catch(() => {
                console.log("error");
            })
    },
    adminSession:(req,res,next)=>{
        console.log(">>.",req.session.admin);
        if(req.session.admin){
            
            next()
        }else{
            res.render('adminView/adminLogin')
        }
    },
    isAdminLoggedIn:(req,res,next)=>{
        if(!req.session.admin){
            req.session.adminLoggedIn=false
        }
        if(req.session.adminLoggedIn){
            res.render('adminView/dashBoard')
        }else{
            next()
        }
    },
    adminLogout:(req,res)=>{
        req.session.admin=null
        req.session.adminLoggedIn=false
        res.render('adminView/adminLogin')
    }
}