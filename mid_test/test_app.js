var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.listen(3000, function() {
    console.log("3000server strat!");
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/test_main', function(req, res){
    res.sendFile(__dirname+"/test_main.html");
})

app.post('/test_ajax', function(req, res) {
    var request = req.body.keyword;
    var responseData = {'result':'ok', 'keyword':request}
    
    console.log(request)
    res.json(responseData);
})