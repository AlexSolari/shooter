/* --- Loading libraries --- */
var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var express = require('express');

var game = require("game");

/* --- Initializing server variables --- */
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

/* --- Initializing server (disabling logging and setuping client-resourses resolving) --- */
process.env.DEBUG = false;
router.use(express.static(path.resolve(__dirname, 'client')));
var UpdatesPerSecond = 30;

/* --- Starting server --- */
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  
  io.on('connection', function (socket) {
      
    var client = game.AddClient(socket);
    console.log("connected: " +client.id);
    client.Send("frameshift", game.FrameNumber);
    client.Send("tickrate", UpdatesPerSecond);
    
    client.AddRequestHandler('disconnect', function () {
      console.log("disconnected: " +client.id);
      game.RemoveClient(client.id);
    });
     
    client.AddRequestHandler("getInput_response", function(data) {
      client.input = data;
    });
    
    client.AddRequestHandler('start', function(data) {
       client.Start(data); 
    });
    
    client.AddRequestHandler("login", function(name) {
      name = name.slice(0, 10).replace(/^\s+|\s+$/gm,'');
      if (name.length == 0)
        name = "Anon";
      client.ship.name = name;
    });
    
  });
  
  game.StartMainLoop(UpdatesPerSecond, function () {
    game.clients.forEach(function (client) {
      client.Update();
    });
    
    var state = game.GetState();
    var points = game.score;
    
    game.Broadcast("gamestate", { 
      coords: state,
      points: points,
      frame: game.FrameNumber
    } );
  });
  
  game.AddBots(2);
});

