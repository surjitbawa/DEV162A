
var fs = require('fs');

module.exports = {
   fileDemo: function(wss){
var text = fs.readFileSync('file.txt','utf8'); 
wss.broadcast(text);
 
wss.broadcast("After First Read\n");
 
text = fs.readFileSync('file2.txt','utf8');
wss.broadcast(text);
 
wss.broadcast("After Second Read\n");

  }
}