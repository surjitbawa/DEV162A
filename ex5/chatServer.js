'use strict';

var server = require('http').createServer();
var express = require('express');
var httpPort = process.env.PORT || 3000;
var url = require('url');
//var wsPort = 3080;
var app = express();
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ server: server });


app.use(function(req, res){
    res.send({ msg: "hello" });
});


wss.broadcast = function (data) {
    for (var i in this.clients)
        this.clients[i].send(data);
    console.log('sent: %s', data);
};

wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('received: %s', message);
        wss.broadcast(message);
    });
    ws.send(JSON.stringify({
        user: 'XS',
        text: 'Hello from Node.js XS Server'
    }));
});

server.on('request', app);
// start http server
server.listen(httpPort, function () {
    console.log('HTTP Server: ' + server.address().port );
  //  console.log('WS Server: ws://localhost:' + wsPort);  	   	
});




