// 모듈을 다운 받을때마다 --save하여 pacakage.json파일에 등록하기
// require: 모듈 삽입
// __dirname : 현재까지의 주소
// 즉 app.get() 은 비동기로 대기하고 있다가 해당하는 url로 접근이 확인되면 function을 실행시킨다.
// GET: URL에 붙여서 전송 'naver.com/main.html' -> 길이제한, url에 정보 노출
// POST: 

var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mysql = require('mysql');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')

var router = require('./router/index');

// 서버 생성
app.listen(3000, function () {
    console.log("start express server on port 3000");
})

console.log("end of server code...")
// 동기화된 코드 먼저 실행, 후에 비동기 코드가 실행됨

app.use(express.static('public')) // public 폴더를 express에 static으로 등록해서, 내용물을 쉽게 꺼내 쓸 수 있다.
app.use(bodyParser.json()) // 이러한 형태의 문서를 bodyparser를 통해 처리하겠다.
app.use(bodyParser.urlencoded({extended:true})) 
app.set('view engine', 'ejs') // 뷰 엔진으로 ejs를 사용하겠다
app.use(session({
    secret:"#JDKLF439jsdlfsjl",
    resave:false,
    saveUninitialized:true
}))

app.use(session({secret:"#JDKLF439jsdlfsjl"}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(router);



