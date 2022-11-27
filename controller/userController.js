const userHelpers = require('../model/user-helper/userHelper')
var count = 0
var error
module.exports = {

    userLoginRoute: (req, res) => {
        userHelpers.userLogin(req.body).then((data) => {
            req.session.user = { name: data.name, id: data.id }
            req.session.loggedIn = true
            res.redirect('/home')
        }).catch(() => {
            res.render('userView/login', { error: "invalid email or password" })
        })
    },
    userSignupRoute: (req, res) => {
        if (!req.body.name || !req.body.email || !req.body.password) {
            res.render('userView/signup', { error: "Enter details" })
        } else {
            userHelpers.userSignup(req.body)
                .then((data) => {
                    console.log("dosign", data);
                    req.session.user = { name: data.name, id: data.id }
                    req.session.loggedIn = true
                    res.redirect('/home')
                }).catch((err) => {
                    if (err) {
                        res.render('userView/signup', { error: "This email already used" })
                    }
                })
        }
    },
    sessionCheck: (req, res, next) => {
        if (req.session.user) {
            // res.header(
            //     "Cache-Control",
            //     "no-cache, private, no-store, must-revalidate,max-stale=0, post-check=0, pre-check=0"
            //   )
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
    nocache: (req, res, next) => {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    },
    accountInfo: (req, res) => {
        userHelpers.accountDetails(req.session.user.id).then((data) => {
            res.render('userView/account', { data })
        }).catch(() => {
            console.log("account info error");
        })
    },
    logOut: (req, res) => {
        req.session.user = null
        req.session.loggedIn = false
        res.redirect('/')
    }

}