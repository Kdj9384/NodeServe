/**
 * 라우터는 요청을 쪼개서 관리하는 방법
 */

var express = require('express')
var router = express.Router();
var path = require('path')

// URL이 'localhost/main' 인 경우
// app.js에서 /main으로 받았으므로 라우터에선 /가 /main을 의미한다.
router.get('/', function(req, res) {
    if(!req.user) {res.redirect('/login')}
    //res.send("<h1>hi friend<h1>")
    console.log(" main2 is loaded well", req.user)
    // res.sendFile(path.join(__dirname, "../public/main2.html"));
    res.render('main.ejs', {uid : req.user.uid, email : req.user.email});
});

module.exports = router;