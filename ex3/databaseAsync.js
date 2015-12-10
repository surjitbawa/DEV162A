var hana = require('./database');
var async = require("async");

module.exports = {
   dbCall: function(wss){
   	  function dummy(){}
    var body ='';
	wss.broadcast('Before Database Call');
	hana.callHANA1(dummy, wss);
	hana.callHANA2(dummy, wss);
	wss.broadcast("After Database Call");	
  }
}




