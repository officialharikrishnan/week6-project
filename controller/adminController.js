var adminHelper = require('../model/admin-helper/admin-helper')
var {userSignup} = require('../model/user-helper/userHelper')
// const { response } = require('../routers/app')
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
            res.render('adminView/users', { response, admin: true,alluser:true })
        })
            .catch(() => {
                console.log("error");
            })
    },

    adminSession:(req,res,next)=>{
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
    },
    addUserRoute:(req,res)=>{
        userSignup(req.body).then((response)=>{
            res.redirect('/admin/users')
        })
        .catch(()=>{
            res.render('adminView/addUser',{error:"somthing went wrong"})
        })
    },
    editPage:(req,res)=>{
        console.log(req.params.id);
        adminHelper.getEditUser(req.params.id).then((response)=>{
            res.render('adminView/editUser',{response})
        })
        .catch(()=>{
            alert("Somthing went to wrong")
        })
    },
    editUserRoute:(req,res)=>{
        adminHelper.editUser(req.params.id,req.body).then((response)=>{
            res.redirect('/admin/users')
        })
        .catch(()=>{
            alert("Somthing went to wrong")
        })
    },
    deleteUser:(req,res)=>{
        adminHelper.removeUser(req.params.id).then((response)=>{
            console.log(response);
            res.redirect('/admin/users')
        })
        .catch(()=>{
            alert("Somthing went to wrong")
        })
    }
}