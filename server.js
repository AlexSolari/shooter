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
var UpdatesPerSecond = 60;

/* --- Starting server --- */
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  
  io.on('connection', function (socket) {
      
    var client = game.AddClient(socket);
    console.log("connected: " +client.id);
    
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
    var sTime = new Date().getTime();
    
    game.clients.forEach(function (client) {
      client.Update();
    });
    
    game.Broadcast("getInput_request");

    var state = game.GetState();
    var points = game.clients
      .filter(client => client.ship)
      .map(client => ({name: client.ship.name, score: client.ship.points}) )
      .sort((r1, r2) => r2.score - r1.score);
      
    var interval = new Date().getTime() - sTime;
    
    game.UpdateScaleCooefficient(interval);
    
    game.Broadcast("gamestate", { 
      coords: state,
      date: interval,
      points: points,
    } );
  });
  
  game.AddBots(5);
});

