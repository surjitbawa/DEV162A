var http = require('https')
var url = "https://www.loc.gov/pictures/search/?fo=json&q=SAP&";

console.log("Before HTTP Call\n");

http.get(url,function (response) 
 {
  response.setEncoding('utf8');
  response.on('data', console.log);
  response.on('error', console.error);
  }
);
console.log("After HTTP Call\n");
