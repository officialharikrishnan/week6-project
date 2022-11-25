var adminHelper = require('../model/admin-helper/admin-helper')
var {userSignup} = require('../model/user-helper/userHelper')

module.exports = {

    adminLoginRoute: (req, res) => {
        adminHelper.adminLogin(req.body).then(() => {
            req.session.admin=req.body.id
            req.session.adminLoggedIn=true
            res.redirect('/admin')
        })
            .catch(() => {
                res.render('adminView/adminLogin', {error :"Invalid id or Password"})
            })
    },
    getAllusersRoute: (req, res) => {
        adminHelper.getAllUsers().then((response) => {
            res.render('adminView/dashBoard', { response, admin: true,alluser:true })
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
            res.redirect('/admin/dashboard')
        }else{
            res.render('adminView/adminLogin')
        }
    },
    adminLogout:(req,res)=>{
        req.session.admin=null
        req.session.adminLoggedIn=false
        res.render('adminView/adminLogin')
    },
    addUserRoute:(req,res)=>{
        userSignup(req.body).then((response)=>{
            res.redirect('/admin')
        })
        .catch(()=>{
            res.render('adminView/addUser',{error:"This Email already used",admin:true,addUser:true})
        })
    },
    editPage:(req,res)=>{
        console.log(req.params.id);
        adminHelper.getEditUser(req.params.id).then((response)=>{
            res.render('adminView/editUser',{response})
        })
        .catch(()=>{
            console.log("edit error");
        })
    },
    editUserRoute:(req,res)=>{
        adminHelper.editUser(req.params.id,req.body).then((response)=>{
            res.redirect('/admin')
        })
        .catch(()=>{
            console.log("edit error");
        })
    },
    deleteUser:(req,res)=>{
        adminHelper.removeUser(req.params.id).then((response)=>{
            console.log(response);
            res.redirect('/admin')
        })
        .catch(()=>{
            console.log("delete error");
        })
    }
}