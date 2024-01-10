const router = require('express').Router();
const User = require('../config/database');
const passport = require('passport');
// const User = connection.models.User;
const genpassword = require('../lib/passportUtils').genpassword;
const validpassword = require('../lib/passportUtils').validpassword;
const {isAuth, isAdmin} = require('../lib/MoreAuthMiddlewares');


router.post('/login',passport.authenticate('local', {failureRedirect : '/login-failure', successRedirect : '/login-success'}));

router.post('/register', (req, res, next) => {

    const salthash = genpassword(req.body.pw);

    // const salt = genhash.salt;
    const {salt, hash} = salthash;

    var newUser = new User({
        username : req.body.uname,                                                                                      
        hash : hash,
        salt : salt,
        admin : true
    })

    newUser.save().then((user) => {
        console.log(user)
    });

    res.redirect('/login');

})


router.get('/', (req, res, next) => {
    const heading = '<h1> <a href = "/register"> Go to Register  </a> </h1>';
    res.send(heading);
})

router.get('/register', (req, res, next) => {
    const form = '<h1>Register Page</h1><form method="post" action="register">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
})

router.get('/login', (req, res, next) => {
    const form = '<h1> Login Page </h1> \
    <form method="post" action = "login"> Enter a Username: <br> <input type="text" name="uname"><br>\
    Password: <br> <input type="text" name="pw">\
    <br><br> <input type = "submit" value = "submit"></form>'

    res.send(form);
})

router.get('/login-success', (req, res, next) => {
    res.send("You've logged in");
})

router.get('/user-route', isAuth, (req, res, next) => {
    res.send('<h1> login Success: You are logged in as a user </h1>\
    <a href ="/logout">Click Here To Logout </a>');
})

router.get('/admin-route',isAdmin, (req, res, next) => {
    res.send('<h1> login Success: You are logged in as an admin </h1>\
    <a href ="/logout">Click Here To Logout </a>');
})

router.get('/logout', (req, res, next) => {
    req.logOut((err) => {
        if(err) { return next(err); }
    } );
    res.redirect('/');
})




module.exports = router;