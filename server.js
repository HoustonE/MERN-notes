require('dotenv').config();

const dotenv = require('dotenv');

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const notes = require('./notes');
const app = express();
const mongoose = require("mongoose");
app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());



// ****** Mongoose ******

mongoose.connect('mongodb://localhost:27017/notesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.set("useCreateIndex", true);

// ****** NotesSchema ******

const notesSchema = new mongoose.Schema({
  title : String,
  content : String
});

const Note = new mongoose.model("Note", notesSchema);


app.get('/', function (req, resp) {
  //TODO:: Home Page
  resp.send({express : 'request sent back from Express'});
});

app.get('/notes', function (req, resp){
  Note.find({}, function (err, results){
    if(err){
      resp.send(err);
    } else {
      resp.send(results); 
    }
  });
});

app.post('/notes', function(req, resp){
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content
  });

  newNote.save();
  
  resp.send("note added");
});

app.delete('/notes', function(req, resp){
  console.log("delete called " + req.body.id);
  Note.findByIdAndDelete(req.body.id , function(err){
    if(err){
      console.log(err);
    } else {
      console.log("item deleted");
    }
  });

  resp.send("item deleted successfully");
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, function() {
  console.log("Server started successfully on:: "+ port);
});