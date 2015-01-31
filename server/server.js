
var express = require('express'),
    querystring = require('querystring'),
    bodyParser = require('body-parser'),
    request = require('request'),
    fs = require('fs'),
    app = express();



var pub = __dirname + '/../public';
app.use(express.static(pub));

app.use(bodyParser.urlencoded({extended: true}));

var apiKey;
fs.readFile(__dirname + '/apikey.txt', 'utf8', function(err,data) {
    apiKey = data; 
});

var port = 4000;

var server = app.listen(port, function() {
    console.log('listening');
});


var baseUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";


app.post('/coordinates/', function(req, response) {
    console.log(req.body); 

    var apiUrl = baseUrl + req.body.address + "&key=" + apiKey;
    console.log(apiUrl); 
    console.log('ses');
    


    request(apiUrl, function(err, res, body) {
        try {
            console.log('body');
            console.log(body);
            body = JSON.parse(body);
            var formattedAddress = body.results[0].formatted_address;
            console.log(formattedAddress);
            var location = body.results[0].geometry.location;
            console.log(location);
        }
        catch (err) {
            console.log(err);
            response.write(err);
            response.end();
            return;
        }

        var obj = {
           address: formattedAddress,
           location: location
        };
        
        console.log('sending');
        console.log(obj);
        response.json(obj);
        response.end();
        
    });
    //response.end();
});



