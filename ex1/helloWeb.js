var http = require('http');
var os = require('os');
var PORT = process.env.PORT || 3000;
http.createServer(function (req, res) {
  res.end('Hello World \n');
}).listen(PORT, os.hostname(), function(){
	console.log('Server running at http://'+ os.hostname() + ':' + PORT);
});

