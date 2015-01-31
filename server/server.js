
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();


var pub = __dirname + '/../public';
app.use(express.static(pub));

app.use(bodyParser.urlencoded({extended: true}));

var port = 4000;

var server = app.listen(port, function() {
    console.log('listening');
});

app.post('/coordinates/', function(request, response) {
    console.log(request.body); 
    response.end();
});



