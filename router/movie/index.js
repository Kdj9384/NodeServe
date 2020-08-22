var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'jsman',
})

connection.connect();


router.get('/', function(req, res) {
    res.render('movie.ejs')
})

router.post('/', function(req, res) {
    
})

router.get('/list', function(req, res) {
    res.render('movie.ejs')
})

module.exports = router;