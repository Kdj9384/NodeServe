var express = require("express");
var router = express.Router();
var path = require("path");
var mysql = require("mysql");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var flash = require("connect-flash");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  port: 3306,
  database: "jsman",
});
connection.connect();

router.get("/", function (req, res) {
  var msg;
  var errMsg = req.flash("error");
  if (errMsg) msg = errMsg;
  console.log("Login is loaded");
  res.render("login.ejs", { message: msg });
  // res.sendFile(path.join(__dirname, "../../public/join.html"));
});

// serialize로 저장해 놨다가
passport.serializeUser(function(user, done) {
  console.log('passport session saved', user)
  done(null, user)
})
// 요청이 올때 deserialize로 저장한 user객체를 사용하여 로드
passport.deserializeUser(function (user, done) {
  console.log('passport session get id ', user)
  done(null,user)
})
// passport.use('local', new LocalStrategy({

// }))

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      console.log("local-join callback called");
      var query = connection.query(
        "select * from users where email=?",
        [email],
        function (err, rows) {
          if (err) return done(err);
          if(rows.length) {
              return done(null, {"email":email})
          }else {
              return done(null, false, {'message': 'you login is fail'})
          }
        }
      );
    }
  )
);

router.post('/', function(req,res,next) {
    passport.authenticate('local-login', function(err, user, info) {
        if(err) res.status(500).json(err)
        if (!user) {return res.status(401).json(info.message)}

        req.logIn(user, function(err) {
            if(err) return next(err)
            console.log("success login")
            return res.json(user)
        }) 
    })(req,res,next)
})

module.exports = router;
