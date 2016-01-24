/* --- Loading libraries --- */
var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var express = require('express');

/* --- Initializing server variables --- */
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

/* --- Initializing server (disabling logging and setuping client-resourses resolving) --- */
io.set('log level', 1);
router.use(express.static(path.resolve(__dirname, 'client')));
var sockets = [];


/* --- Starting server --- */
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  io.on('connection', function (socket) {
  
      sockets.push(socket);
  
      socket.on('disconnect', function () {
        sockets.splice(sockets.indexOf(socket), 1);
      });
  
      socket.emit("greeting", "Hello!");
  });
});

server.broadcast = function(type, data){
 sockets.forEach(function (socket) {
   socket.emit(type, data);
 }); 
};