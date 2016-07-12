var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.use(bodyParser.json())
app.use(express.static('client/'))

//database
var dbport = process.env.MONGOLABS || 'mongodb://localhost/dndchartracker'
mongoose.connect(dbport);

var db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error...'));
db.once('open', function (){
  console.log('dndchartracker db opened');
});

//db schema
var UserSchema = new mongoose.Schema({
  user : String,
});

var User = mongoose.model('User', UserSchema);

// User({user:"HELLO"}).save(function(err,data){
//   if(!err){
//     console.log("saved");
//   }
// })


//routes
app.get('/', function (req,res){

  res.render('index')

});

app.post('/', function (req,res){


  User.find({},function (err,user){
    console.log(err, user);
    res.send(user);
  })

});

//
var port = process.env.PORT || 3000;
app.listen(port, function (){
  console.log('Listening on port: ' + port);
});

