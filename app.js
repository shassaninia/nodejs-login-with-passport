var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');

//Init loginapp
var app = express();

//View Engine
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('view engine','handlebars');

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser);

//Set static folder
app.set(express.static(path.join(__dirname,'public'))); 

//Express session
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}));

//Express Validator
app.use({
    errorFormatter:function(param,msg,value){
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParm = root;
    

    while(namespace.length){
        formParm += '['+ namespace.shift() +']'
    }
    return {
        param formParm,
        msg:msg,
        value:value
    }
    }
});