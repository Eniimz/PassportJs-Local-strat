const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./database');
// const User = connection.models.User;
const validpassword = require('../lib/passportUtils').validpassword;


const customFields = {
    usernameField : 'uname',
    passwordField : 'pw'
}

const verifyCallBack = (username, password, done) => {
    User.findOne({username : username})
    .then((user) => {
        if (!user){
            return done(null, false)
        }

        const isvalid = validpassword(password, user.hash, user.salt);

        if (isvalid){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
     
     })
     .catch((err) => {
        done(err)

    })
}

const strategy = new LocalStrategy (customFields, verifyCallBack);

passport.use(strategy);


passport.serializeUser((user, done) => {
    console.log("SEAR CALLED");
    done(null,user.id);
})

passport.deserializeUser((userId, done) => {
    console.log("DESEAR CALLED");
    User.findById(userId)
    .then((user) => {
        done(null, user);
    })
    .catch((err) => done(err))
})

