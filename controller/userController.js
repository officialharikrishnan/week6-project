const userHelpers = require('../model/user-helper/userHelper')
var count=0
var error
module.exports = {

    userLoginRoute: (req, res) => {
        userHelpers.userLogin(req.body).then((data) => {
            req.session.user = {name:data.name,id:data.id}
            req.session.loggedIn = true
            res.redirect('/home')
        }).catch(() => {
            res.render('userView/login', { error: "invalid email or password" })
        })
    },
    userSignupRoute: (req, res) => {
        if(!req.body.name || !req.body.email || !req.body.password){
            res.render('userView/signup',{error:"Enter details"})
        }else{
        userHelpers.userSignup(req.body)
        .then((data) => {
            console.log("dosign",data);
            req.session.user = {name:data.name,id:data.id}
            req.session.loggedIn = true
            res.redirect('/home')
        }).catch((err) => {
            if(err){
                res.render('userView/signup',{error : "This email already used"})
            }
        })
    }
    },
    sessionCheck: (req, res, next) => {
        if (req.session.user) {
            next()
        } else {
            res.render('userView/login')
        }
    },
    isLoggedIn: (req, res, next) => {
        if (!req.session.user) {
            req.session.loggedIn = false
        }
        if (req.session.loggedIn) {
            res.redirect('/home')
        } else {
            res.render('userView/login')
        }
    },
    accountInfo:(req,res)=>{
        userHelpers.accountDetails(req.session.user.id).then((data)=>{
            res.render('userView/account',{data})
        }).catch(()=>{
            console.log("account info error");
        })
    },
    logOut: (req, res) => {
        req.session.user = null
        req.session.loggedIn = false
        res.redirect('/')
    }

}