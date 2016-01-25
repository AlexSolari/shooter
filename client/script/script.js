/*global Connection*/
/*global Drawer*/

var drawer;
var connection;
var input = { clicked: false, x: 0, y: 0 };
var isActive = true;

var getInputRequest = "getInput_request";
var getInputResponse = "getInput_response";

window.onload = function() {
  drawer = new Drawer();
  connection = new Connection();
  
  connection.AddResponseHandler(getInputRequest, function () {
    connection.Send(getInputResponse, input);
  });
  
  connection.AddResponseHandler('gamestate', function(coords) {
    if (isActive)
    {
      drawer.Clear();
      coords.forEach(function (coord) {
          var color = coord.clicked ? "red" : "black";
          drawer.Circle(coord.x, coord.y, 25, color);
      });
    }
  });
};

window.onmousemove = function (event) {
  input.x = event.clientX;
  input.y = event.clientY;
};

window.onmousedown = function () { input.clicked = true; };

window.onmouseup = function () { input.clicked = false; };

window.onfocus = function() { this.isActive = true; };

window.onblur = function() { this.isActive = false; };