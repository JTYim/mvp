// HTTP Express Server
var express = require('express');
var partial = require('express-partials');

var app = express();
app.configure(function(){
	app.set('views', __dirname+'/views');
	app.set('view engine', 'ejs');
})

app.get('/', function(req,res){
	res.render('index', { title: "Hello World" });
});

var port = process.env.PORT || 3033;
app.listen(port);
console.log(' ***** Server now listening on port ' + port + " ***** ");

var fs = require("fs");
