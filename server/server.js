var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//database
mongoose.connect('mongodb://localhost/dndchartracker');

var db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error...'));
db.once('open', function (){
  console.log('dndchartracker db opened');
});

//db schema





//routes
app.get('*', function (req,res){

  res.send('Hello from Server!');
});

app.post('/', function (req,res){

  res.send('Hello from Server!');
});



//
var port = 3000;
app.listen(port, function (){
  console.log('Listening on port: ' + port);
});

