var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.use(bodyParser.json())
app.use(express.static('./client/'))

//database
mongoose.connect('mongodb://localhost/random');

var db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error...'));
db.once('open', function (){
  console.log('dndchartracker db opened');
});

//db schema
var UserSchema = new mongoose.Schema({user : String});

var User = mongoose.model('User', UserSchema);

//routes
app.get('/', function (req,res){

  res.render('index')

});

app.post('/', function (req,res){
  var user = req.body.user;
  res.send(user);

  // User.find({},function (err,user){
  //   console.log(err, user);
  //   res.send(user);
  // })

});






//
var port = 3000;
app.listen(port, function (){
  console.log('Listening on port: ' + port);
});

