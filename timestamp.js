
var express = require("express");
var moment = require("moment");
var path = require("path");
var port = process.env.PORT || 8080;
var app = express();

app.get('/', function(req, res) {
  var fileName = path.join(__dirname, 'index.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      //console.log('Sent:', fileName);
    }
  });
});
//app.set('etag', false);
app.get('/:timestring', function(request, response) {
   var url_time = request.params.timestring;
   var whole_url = request.originalUrl;
   console.log("param: "+url_time);
   console.log("param type "+typeof url_time);

   if (moment.unix(url_time).isValid()) {
       var result;
       var unix = moment.unix(url_time).unix();
       var natural = moment.unix(url_time).format("MMMM DD, YYYY");
       result = '{"unix": '+unix+', "natural": '+natural+'}';
   } else  if (moment(url_time.split('%20'), "MMMM DD YYYY").isValid()) {
       var result;
       var nat_time = moment(url_time.split('%20'), "MMMM DD, YYYY");
       var unix = nat_time.unix();
       var natural = nat_time.format("MMMM DD, YYYY");
       result = '{"unix": '+unix+', "natural": '+natural+'}';
   };
   console.log("result is "+result);
   console.log("type of result is "+typeof result);
   response.sendStatus(result);
});


app.listen(port, function () {
  console.log('listening on port '+port);
});
