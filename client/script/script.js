/*global Connection*/
/*global Drawer*/

var drawer;
var connection;
var input = { clicked: false, x: 0, y: 0, rocket: false };
var fpsDom = null;
var pingDom = null;
var getInputRequest = "getInput_request";
var getInputResponse = "getInput_response";
var frameTime = 0, lastLoop = new Date, thisLoop;

var tails = {};

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
    var fps = (1000/frameTime).toFixed(0);
    
    var coords = data.coords;
    var date = data.date;
    
    pingDom.innerHTML = (new Date().getTime() - date) + "ms";
    fpsDom.innerHTML = fps + "fps";
    
    drawer.Clear();
    coords.forEach(function (entity) {
        if (entity.type != "common-ship")
        {
          if (entity.type == "common-rocket-projectile")
          {
            drawer.Image("rocket.png", entity.x, entity.y, entity.angle+90);
          }
          else 
          {
            drawer.Circle(entity.x, entity.y, 1, "#aaa");
          }
            
        }
        else
        {
          drawer.Image("sprite.png", entity.x, entity.y, entity.angle+90);
          drawer.Text(entity.hp + "/1000", entity.x-30, entity.y - 20, 10, undefined, "white");
        }
    });
  });
};

window.onmousemove = function (event) {
  input.x = event.clientX;
  input.y = event.clientY;
};

window.onmousedown = function () { 
  input.clicked = true; 
};

window.onkeydown = function (event) {
  if (String.fromCharCode(event.keyCode).toLowerCase() == "r")
  {
    input.rocket = true;  
  }
};

window.onkeyup = function (event) {
  if (String.fromCharCode(event.keyCode).toLowerCase() == "r")
  {
    input.rocket = false;  
  }
};

window.onmouseup = function () { input.clicked = false; };