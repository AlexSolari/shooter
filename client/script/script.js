/*global Connection*/
/*global Drawer*/

var drawer;
var connection;
var input = { clicked: false, x: 0, y: 0 };
var fpsDom = null;
var pingDom = null;
var getInputRequest = "getInput_request";
var getInputResponse = "getInput_response";
var frameTime = 0, lastLoop = new Date, thisLoop;

window.onload = function() {
  drawer = new Drawer();
  connection = new Connection();
  
  fpsDom = document.getElementById('fps');
  pingDom = document.getElementById("ping");
  
  connection.AddResponseHandler(getInputRequest, function () {
    connection.Send(getInputResponse, input);
  });
  
  connection.AddResponseHandler('gamestate', function(data) {
    var thisFrameTime = (thisLoop=new Date) - lastLoop;
    frameTime+= (thisFrameTime - frameTime)/5;
    lastLoop = thisLoop;
    
    var coords = data.coords;
    var date = data.date;
    
    pingDom.innerHTML = (new Date().getTime() - date) + "ms";
    fpsDom.innerHTML = (1000/frameTime).toFixed(0) + "fps";
    
    drawer.Clear();
    coords.forEach(function (coord) {
        if (coord.type != "common-ship")
          drawer.Circle(coord.x, coord.y, 2);
        else
        {
          drawer.Image("sprite.png", coord.x, coord.y, coord.angle+90);
          drawer.Text(coord.hp + "/1000", coord.x-30, coord.y - 20, 10);
        }
    });
  });
};

window.onmousemove = function (event) {
  input.x = event.clientX;
  input.y = event.clientY;
};

window.onmousedown = function () { input.clicked = true; };

window.onmouseup = function () { input.clicked = false; };