var express = require('express');
var app = express();

// Routes
	app.get('/', function(req, res){
		res.sendFile(__dirname + '/public/index.html');
	});
	// app.get('/*', function(req, res){
	// 	res.redirect('/');
	// });

// HTTP
	var http = require('http');
	var port = process.env.PORT || 3033;
	var server = http.createServer(app).listen(port, function(){
		console.log(' ***** Server now listening on port ' + port + ' ***** ');
	});

// Socket
	var io = require('socket.io').listen(server);
	// var socket = io(server);
	io.on('connection', function(socket){
		var date = new Date();
		console.log(' ** New User Connected on '+ date);
		handler(socket);
	});
	// io.configure(function(){
	// 	io.enable("browser client minification"); // send minified client
	// 	io.enable("browser client etag"); // apply etag caching logic based on version number
	// 	io.set("log level", 1); // reduce logging
	// 	io.set("transports", [
	// 		"websocket",
	// 		"xhr-polling",
	// 		"jsonp-polling"
	// 	]);
	// });

	function handler(socket){
		function disconnect() {
			clearInterval(interval);
			console.log(" !! Disconnected");
		}
		socket.on("disconnect",disconnect);

		socket.on("toServer",function(data){
			console.log(" recv from client ",data)
			socket.emit(data)
		})

		var interval = setInterval(function(){
			var date = new Date().toString();
			socket.emit("toClient", date);
		},15000);

		socket.on("test",function(data){
			console.log("From: " ,data);
			socket.broadcast.emit("toClient" ,data);
		});

		socket.on("draw",function(data){
			console.log("From: " ,data);
			socket.broadcast.emit("toClient" ,data);
		});		
	}






// Read File
	// var fs = require("fs");
	// var asq = require("asynquence");
	// require("asynquence-contrib");

	// setTimeout(function(){
	// 	getFile('test.txt')
	// },2000);

	// function getFile(filename) {
	// 	return asq( function(callback){
	// 		var stream = fs.createReadStream(filename);
	// 		var data = "";

	// 		stream.pipe(fs.createWriteStream(filename+".txt"));
	// 		stream.on("data",function(chunk){
	// 			// console.log("data streaming");
	// 			data += chunk;
	// 		});
			
	// 		stream.on("end",function(){
	// 			socket.emit("data",data);
	// 		});
	// 	});
	// }

	// function connection(socket) {
	// 	// function disconnect() {
	// 	// 	console.log("Client disconnected!");
	// 	// 	clearInterval(timer);
	// 	// }
	// 	// socket.on("disconnect",disconnect);
	// 	var timer = setInterval(function(){
	// 		socket.emit("hello",Math.random());
	// 	},1000);
	// }
	// socket.on("connection", connection)
	// var fs = require("fs");
	// var file = require('test.txt')
	// function fileInfo(filename,cb) {
	// 	fs.readFile(filename,function(err,msg){
	// 		if (err) {
	// 			console.error("Error: " + err);
	// 		}else{
	// 			cb(null,msg);
	// 		}
	// 	});
	// }
