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
        
    client.AddRequestHandler('disconnect', function () {
        game.RemoveClient(client.id);
    });
     
    client.AddRequestHandler("getInput_response", function(data) {
        client.input = data;
        
        client.ProcessInput();
      });
      
  });
  
  game.StartMainLoop(UpdatesPerSecond, function () {
    game.Broadcast("getInput_request");
    game.Broadcast("gamestate", { coords: game.GetState(), date: new Date().getTime() } );
  });
  
});

