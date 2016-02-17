var express = require('express');
var app = express();

// var http = require('http');
// var socketIo = require('socket.io');
// var server =  http.createServer(app);
// var io = socketIo.listen(server);
// server.listen(8080);

// HTTP
	var http = require('http');
	var port = process.env.PORT || 3033;
	var server = http.createServer(app).listen(port, function(){
		console.log(' ***** Server now listening on port ' + port + ' ***** ');
	});

// Socket
	var io = require('socket.io').listen(server);
	app.get('/', function(req, res){
		res.sendFile(__dirname + '/public/index.html');
	});

	var history = [];
	io.on('connection', function (socket) {
		var date = new Date();
		console.log(' ** New User Connected on '+ date);
		
		socket.on("disconnect",disconnect);
		function disconnect() {
			clearInterval(interval);
			console.log(" !! Disconnected");
		}

		socket.on("toServer",function(data){
			console.log(" From Client ",data)
			socket.emit(data)
		})

		socket.on("test",function(msg){
			console.log("From: " ,msg);
			socket.broadcast.emit("toClient" ,msg);
		});

		var interval = setInterval(function(){
			var date = new Date().toString();
			socket.emit("toClient", date); 
		},15000);

		for (var i in history) { socket.emit('draw', {line: history[i]} );}

	 	 socket.on('clear', function(data) {
			history = []
			io.emit('clear', true);
			io.emit('draw', { line: data.line });
		 });

		 socket.on('draw', function(data) {
			history.push(data.line);
			io.emit('draw', { line: data.line });
		 });
		 
	});