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
  name : String,
  align : String,
  race : String,
  classname : String,
  gender : String,
  exp : Number,
  level : Number,
  str : Number,
  dex : Number,
  con : Number,
  inte : Number,
  wis : Number,
  cha : Number,
  eventname : String,
  dice: Number,
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
  var name = req.body.name;
  var align = req.body.align;
  var race = req.body.race;
  var classname = req.body.classname;
  var gender = req.body.gender;
  var exp = req.body.exp;
  var level = req.body.level;
  var str = req.body.str;
  var dex = req.body.dex;
  var con = req.body.con;
  var inte = req.body.inte;
  var wis = req.body.wis;
  var cha = req.body.cha;
  var eventname = req.body.eventname;
  var dice = req.body.dice;

console.log(req.body)

  // User.find({},function (err,user){
  //   console.log(err, user);
  //   res.send(user);
  // })

});

//
var port = process.env.PORT || 3000;
app.listen(port, function (){
  console.log('Listening on port: ' + port);
});

