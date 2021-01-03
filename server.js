require('dotenv').config();

const dotenv = require('dotenv');

const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, function() {
  console.log("Server started successfully on:: "+ port);
});