var express = require('express');
var myModule = require('./myModule');
var PORT = process.env.PORT || 3000;
var app = express();

//Home Router
app.use('/', express.static(__dirname + '/html'));

//Hello Router
app.route('/hello')
  .get(function(req, res) {
    res.send('Hello World');
  })

//Module Router
app.route('/module')
  .get(function(req, res) {
    res.send(myModule.helloModule());
  })

// Start the server
var server = app.listen(PORT, function() {
  //console.log('Listening on http://localhost:'+ PORT +'/module');
});


