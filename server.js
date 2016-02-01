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
io.set('log level', 1);
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
      
      client.Update();
    });
    
    client.AddRequestHandler('start', function() {
       client.Start(); 
    });
    
    client.AddRequestHandler("login", function(name) {
      name = name.slice(0, 10).replace(/^\s+|\s+$/gm,'');
      if (name.length == 0)
        name = "Anon";
      client.ship.name = name;
    });
      
  });
  
  game.StartMainLoop(UpdatesPerSecond, function () {
    game.Broadcast("getInput_request");
    
    var sTime = new Date().getTime();
    var state = game.GetState();
    
    game.Broadcast("gamestate", { coords: state, date: new Date().getTime() - sTime } );
  });
  
});

