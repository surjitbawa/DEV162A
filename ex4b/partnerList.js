var hdb = require("sap-hdb-connection");
var express = require('express');
var async = require("async");

var PORT = process.env.PORT || 3000;
var app = express();

function readTables(cb) {
    console.log("starting partner read query ...");

    hdb.createConnection(function(error, client) {
        
    if(error) {
        console.error(error);
    }
    if(client) {    

    async.waterfall([
    	function(callback){
    		client.prepare(
    			'select * from "SAP_HANA_EPM_NEXT"."sap.hana.democontent.epmNext.data::MD.BusinessPartner" where PARTNERROLE = ?',
                callback
    		);
    	},
    	function(statement, callback){
    		statement.exec(
    			['01'], 
                callback
    		);
    	},
    	function(res,callback){
            result = JSON.stringify( { PARTNERS: res });
            client.disconnect();
            return cb(result);    		
    	}
    ], function (err) {
        return cb("Custom ERROR: " + err);
    }); //end Waterfall
    }   //end if client
   });  //end create connection
}

app.route('/partners')
    .get(function(req,res){
        readTables(function(result) {
            res.type('application/json').status(200).send(result);
        })
    });

// Start the server
var server = app.listen(PORT, function() {
  console.log('Listening on http://localhost:'+ PORT +'/partners');
});

