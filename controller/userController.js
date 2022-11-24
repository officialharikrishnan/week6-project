const userHelpers = require('../model/user-helper/userHelper')

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
        userHelpers.userSignup(req.body).then((data) => {
            req.session.user = {name:data.name,id:data.id}
            req.session.loggedIn = true
            res.redirect('/home')
        }).catch((err) => {
            console.log(err);
        })
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
            alert('somthing went wrong')
        })
    },
    logOut: (req, res) => {
        req.session.user = null
        req.session.loggedIn = false
        res.redirect('/')
    }

}