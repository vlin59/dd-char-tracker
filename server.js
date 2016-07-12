var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.use(bodyParser.json())
app.use(express.static('client/'))

//database
var dbport = process.env.MONGOLAB_URI || 'mongodb://localhost/dndchartracker'
mongoose.connect(dbport);

var db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error...'));
db.once('open', function (){
  console.log('dndchartracker db opened');
});

//db schema
var CharSchema = new mongoose.Schema({
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

var Char = mongoose.model('Char', CharSchema);


//routes
app.get('/', function (req,res){

  res.render('index')

});

app.post('/', function (req,res){
  var name = req.body.name;
  var align,
      race,
      classname,
      gender,
      exp,
      level,
      str,
      dex,
      con,
      inte,
      wis,
      cha,
      eventname,
      dice;

  Char.findOne({name:name},function (err, charfounddefault){
    if (!err){
      align = req.body.align || charfounddefault.align;
      race = req.body.race || charfounddefault.race;
      classname = req.body.classname || charfounddefault.classname;
      gender = req.body.gender || charfounddefault.gender;
      exp = req.body.exp || charfounddefault.exp;
      level = req.body.level || charfounddefault.level;
      str = req.body.str || charfounddefault.str;
      dex = req.body.dex || charfounddefault.dex;
      con = req.body.con || charfounddefault.con;
      inte = req.body.inte || charfounddefault.inte;
      wis = req.body.wis || charfounddefault.wis;
      cha = req.body.cha || charfounddefault.cha;
      eventname = req.body.eventname || '';
      dice = req.body.dice || null;
    }
  });


  Char.findOne({name:name},function (err,charfound){
    if(charfound){
      var id = charfound._id;
      Char.findByIdAndUpdate({_id:id},
        { align : align,
        race : race,
        classname : classname,
        gender : gender,
        exp : exp,
        level : level,
        str : str,
        dex : dex,
        con : con,
        inte : inte,
        wis : wis,
        cha : cha,
        eventname : eventname,
        dice: dice}

       ,function(err, charupdated){
        if (!err){

          Char.findById(id, function(err, updatedchar){
                      console.log("charupdated")
                      console.log(updatedchar)
            res.send(updatedchar);
          });
        }
        //res.send(charupdated);
      })

    } else {
      //console.log("err")
      //char is not found, create char
      Char({
        name : name,
        align : align,
        race : race,
        classname : classname,
        gender : gender,
        exp : exp,
        level : level,
        str : str,
        dex : dex,
        con : con,
        inte : inte,
        wis : wis,
        cha : cha,
        eventname : eventname,
        dice: dice})
        .save(function(err,savedchar){
          if(!err){
            res.send(savedchar);
          }
        });
    }
  });

});

//
var port = process.env.PORT || 3000;
app.listen(port, function (){
  console.log('Listening on port: ' + port);
});

