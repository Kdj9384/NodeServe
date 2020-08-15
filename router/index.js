// 통합 라우터 관리 파일
var express = require("express");
var router = express.Router();
var path = require("path");

var main = require("./main.js"); // 상대경로
var email = require("./email.js");
var join = require("./join/index");

router.use("/main", main);
router.use("/email", email);
router.use("/join", join);
// url이 /main인 경우 main라우터를 사용하겠다.
// main라우터는 /router/main이다.

// URL이 'localhos/' 인 경우
router.get("/", function (req, res) {
  //res.send("<h1>hi friend<h1>")
  res.sendFile(path.join(__dirname, "../public/main2.html"));
});

// router를 모듈화해서 추출
// router에 관련된 메소드들 만이 모듈로서 역할을 할 수 있다.
module.exports = router;
