const userHelpers = require('../model/user-helper/userHelper')

module.exports = {

    userLoginRoute: (req, res) => {
        userHelpers.userLogin(req.body).then(() => {
            req.session.user = req.body.email
            req.session.loggedIn = true
            res.redirect('/home')
        }).catch(() => {
            res.render('userView/login', { error: "invalid email or password" })
        })
    },
    userSignupRoute: (req, res) => {
        userHelpers.userSignup(req.body).then(() => {
            req.session.user = req.body.email
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
    logOut: (req, res) => {
        req.session.user = null
        req.session.loggedIn = false
        res.redirect('/')
    }

}