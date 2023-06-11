var express = require('express');
var router = express.Router();
var User = require('../models/user')

/* GET home page. */


router.get('/register', function (req, res, next) {
    res.render("register")
});

router.get('/login', function (req, res, next) {
    res.render("login")
});

router.post('/login', async function (req, res, next) {
    let user = await User.findOne({ email: req.body.email, password: req.body.password })
    if (!user) return res.redirect("/register");
    req.session.user = user;
    return res.redirect("/books")
});

router.post('/register', async function (req, res, next) {
    let user = new User(req.body)
    await user.save()
    res.redirect("/")
});

router.get('/logout', function (req, res, next) {
    req.session.user = null;
    res.redirect("/")
});

module.exports = router;
