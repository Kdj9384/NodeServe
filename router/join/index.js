var express = require('express');
var router = express.Router();
var path = require('path')
var mysql = require('mysql');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    port : 3306,
    database : 'jsman'
})
connection.connect();

router.get('/', function(req, res) {
    console.log("Join is loaded");
    res.render('join.ejs');
})

// passport.use('local', new LocalStrategy({

// }))

passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },
    function(req, email, password, done) {
        console.log("local-join callback called")
    }
))

router.post('/', function(req, res) {
    var email = req.body.email;
    var name = req.body.name;
    var passwd = req.body.password;

    // escaping query
    
    var sql = {email:email, name:name, pw:passwd};
    var query = connection.query('insert into users set ?',sql, function(err, rows) {
        if(err) {throw err;}
        else res.render('welcom.ejs', {name:name, uid:rows.insertId});
        
        console.log("well", rows)
    })

    // render는 views라는 파일을 자동으로 찾아준다.
    // res.render(path.join(__dirname, '../../views/email.ejs'), {email : email})
})


module.exports = router;