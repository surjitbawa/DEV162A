'use strict';

var server = require('http').createServer();
var express = require('express');
var httpPort = process.env.PORT || 3000;
var url = require('url');
//var wsPort = 3081;
var app = express();
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ server: server });


var asyncLib = require('./async.js');
var dbAsync = require('./databaseAsync.js');
var dbAsync2 = require('./databaseAsync2.js');
var fileSync = require('./fileSync.js');
var fileAsync = require('./fileAsync.js');
var httpClient = require('./httpClient.js');


//Home Router
//app.use('/', express.static(__dirname + '/html'));

// start web socket server
/*var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        server: server
    });
*/


app.use(function(req, res){
    res.send({ msg: "hello" });
});

wss.broadcast = function (data) {
	var message = JSON.stringify({text: data})
    for (var i in this.clients)
        this.clients[i].send(message);
    console.log('sent: %s', message);
};

wss.on('connection', function (ws) {
    var location = url.parse(ws.upgradeReq.url, true);
    console.log(location);

    ws.on('message', function (message) {
        console.log('received: %s', message);
        var data = JSON.parse(message);
        switch(data.action){
        	case "async":
        		asyncLib.asyncDemo(wss);
        		break;
        	case "fileSync":
        	    fileSync.fileDemo(wss);
        	    break;
        	case "fileAsync":
        	    fileAsync.fileDemo(wss);
        	    break;  
        	case "httpClient":
        	    httpClient.callService(wss);
        	    break;    
        	case "dbAsync":
        	    dbAsync.dbCall(wss);
        	    break;  
        	case "dbAsync2":
        	    dbAsync2.dbCall(wss);
        	    break;         	           	        	          	    
        	default:
				wss.broadcast('Error: Undefined Action: '+ data.action);
				break;
        }
    });
    ws.send(JSON.stringify({
        text: 'Connected to Exercise 3'
    }));
});


server.on('request', app);
// start http server
server.listen(httpPort, function () {
    console.log('HTTP Server: ' + server.address().port );
  //  console.log('WS Server: ws://localhost:' + wsPort);  	   	
});

