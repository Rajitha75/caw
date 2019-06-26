const express = require('express');
const bodyParser = require('body-parser');
const authcontroller = require('./controllers/authcontroller');
const homecontroller = require('./controllers/homecontroller');
const cors= require('cors');
var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200'}));
var server = app.listen(3000 , function(){
var host = server.address().address;
  var port = server.address().port;
   console.log('server started at port 3000')
});
app.use('/auth', authcontroller);
app.use('/home', homecontroller);

module.exports = server;