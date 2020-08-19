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
  console.log("Join is loaded");
  res.render("join.ejs", { message: msg });
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
  "local-join",
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
          if (rows.length) {
            console.log("existed user");
            return done(null, false, { message: "your email is already used" });
          } else {
            var sql = { email: email, password: password };
            var query = connection.query(
              "insert into users set ?",
              sql,
              function (err, rows) {
                if (err) throw err;
                return done(null, { email: email, uid: rows.insertId, password : password });
              }
            );
          }
        }
      );
    }
  )
);

router.post(
  "/",
  passport.authenticate("local-join", {
    successRedirect: "/main",
    failureRedirect: "/join",
    failureFlash: true,
  })
);

// router.post("/", function (req, res) {
//   var email = req.body.email;
//   var name = req.body.name;
//   var passwd = req.body.password;

//   // escaping query

//   var sql = { email: email, name: name, pw: passwd };
//   var query = connection.query("insert into users set ?", sql, function (
//     err,
//     rows
//   ) {
//     if (err) {
//       throw err;
//     } else
//       res.render("welcom.ejs", {
//         name: name,
//         uid: rows.insertId,
//         email: email,
//         password: passwd,
//       });

//     console.log("well", rows);
//   });

//   // render는 views라는 파일을 자동으로 찾아준다.
//   // res.render(path.join(__dirname, '../../views/email.ejs'), {email : email})
// });

module.exports = router;
