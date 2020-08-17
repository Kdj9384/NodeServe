var express = require("express");
var router = express.Router();
var path = require("path");
var mysql = require("mysql");

// sql 접속
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "jsman",
});
connection.connect();

router.get("/", function (req, res) {
  console.log("emailPage is loaded well");
  res.render("email.ejs");
});

router.post("/email_post", function (req, res) {
  //get: req.param('email') 을 통해 url에서 뽑아낸다.
  console.log(req.body);
  console.log(req.body.email);
  //res.send("<h2> welcom "+ req.body.email+"</h2>")

  res.render(path.join(__dirname, "../views/email.ejs"), {
    email: req.body.email,
  });
  // email.ejs에 키값 email을 req.body.email로 치환해서 렌더링 해라
  // ejs형식의 템플릿 엔진을 사용
});

router.post("/ajax_send_email", function (req, res) {
  // 입력값이 valid한지 확인 필요 --> select db(db확인)

  var email = req.body.email;
  var responseData = {};

  var query = connection.query(
    'select name from users where email="' + email + '"',
    function (err, rows) {
      if (err) console.log("something wrong");
      if (rows[0]) {
        responseData.result = "ok";
        responseData.name = rows[0].name;
      } else {
        responseData.result = "none";
        responseData.name = "";
        console.log(" no data");
      }
      // response 값: responseData를 응답으로 준다.
      res.json(responseData);
    }
  );
});

module.exports = router;
