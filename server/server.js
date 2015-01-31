
var express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    app = express();



var pub = __dirname + '/../public';
app.use(express.static(pub));

app.use(bodyParser.urlencoded({extended: true}));

var port = 4000;

var server = app.listen(port, function() {
    console.log('listening');
});


var baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";


app.post('/coordinates/', function(request, response) {
    console.log(request.body); 

    var apiUrl = baseUrl + request.body.address + "&key=" + apiKey;
    console.log(apiUrl); 
    


    request(apiUrl, function(error, response, body) {
        var formattedAddress = body.results[0].formatted_address;
        var location = body.results[0].geometry.location;

        var obj = {
           address: formattedAddress,
           location: location
        };
        
        console.log('sending');
        console.log(obj);
        response.json(obj);
        response.end();
        
    });
    response.end();
});



