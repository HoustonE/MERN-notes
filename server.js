require('dotenv').config();

const dotenv = require('dotenv');

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const notes = require('./notes');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());

app.get('/ping', function (req, resp) {
  return resp.send('pong');
});

app.get('/', function (req, resp) {
  resp.send({express : 'request sent back from Express'});
});

app.get('/notes', function (req, resp){
  resp.send(notes);
});

app.post('/notes', function(req, resp){
  //todo add received note in todo -- redirect to return get /notes
  console.log("POST notes call received");
  console.log(req.body.title);
  console.log(req.body);
  resp.send("HELLO FROM POST METHOD");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, function() {
  console.log("Server started successfully on:: "+ port);
});