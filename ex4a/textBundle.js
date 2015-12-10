'use strict';

var express = require('express');
var os = require('os');
var TextBundle = require('sap-textbundle');
var langparser = require('accept-language-parser');

var port = process.env.PORT || 3000;
var app = express();
app.route('/')
	.get(function(req,res){
		var bundle = new TextBundle({ path: 'messages', locale: getLocale(req) } );
 		res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});	
		var greeting = bundle.getText('greeting', [os.hostname(), os.type()]);
	
  		res.end(greeting, 'utf-8');
	});

// Start the server
var server = app.listen(port, function() {
  console.log('Listening on http://localhost:'+ port );
});

function getLocale(req) {
	var lang = req.headers['accept-language'];
	if (!lang) {
		return;
	}
	var arr = langparser.parse(lang);
	if (!arr || arr.length < 1) {
		return;
	}
	var locale = arr[0].code;
	if (arr[0].region) {
		locale += '_' + arr[0].region;
	}
	return locale;
}