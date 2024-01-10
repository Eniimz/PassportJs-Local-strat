const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const User = require('./config/database');


const app = express();

const sessionStore = MongoStore.create({mongoUrl: 'mongodb://127.0.0.1:27017/asas',collectionName : "sessions"});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret : 'abcde',
    resave : false,
    saveUninitialized : true,
    store : sessionStore,
    cookie : {
        maxAge: 1000 * 60 * 60 * 2
    }
}))



require('./config/passport');

app.use(passport.initialize()); //invokes passport.session
app.use(passport.session()) //calls the deserializeUser function


app.use((req, res, next) => {
    console.log(req.session)
    console.log(req.user)
    next();
})

app.use(routes);


app.listen(3000);