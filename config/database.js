const mongoose = require('mongoose');

require('dotenv').config();

const dbString = process.env.DB_STRING;
const url = 'mongodb://127.0.0.1:27017/asas';

const connection = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('DATABASE CONNECTED')
})
.catch (() => {
    console.log(err)
})


const UserSchema =  new mongoose.Schema({
    username: String,
    hash: String,
    salt : String,
    admin : Boolean
})


const User = mongoose.model('User', UserSchema);

module.exports = User;
