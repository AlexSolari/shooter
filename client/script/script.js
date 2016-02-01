/*global Connection*/
/*global Drawer*/
/*global Explosion*/

var drawer;
var connection;
var input = { clicked: false, x: 0, y: 0, rocket: false, mine: false };
var fpsDom = null;
var pingDom = null;
var getInputRequest = "getInput_request";
var getInputResponse = "getInput_response";
var frameTime = 0, lastLoop = new Date, thisLoop;

var shipId;

var explosions = [];

function DrawExplosions() {
  explosions.forEach(function (explosion) {
    if (explosion.stage == 6)
    {
      explosions.splice(explosions.indexOf(explosion),1);
      return;
    }
    drawer.Image("sprites/explosion/"+explosion.stage+".png", explosion.x, explosion.y);
  });
}

function ProcessResponse(entities) {
  drawer.Clear();
  entities.forEach(function (entity) {
      if (entity.type != "common-ship")
      {
        if (entity.type.indexOf("-rocket") > 0)
        {
          drawer.Image("sprites/rockets/"+entity.type+".png", entity.x, entity.y, entity.angle+90);
        }
        else if (entity.type.indexOf("-mine") > 0)
        {
          drawer.Image("sprites/mines/"+entity.type+".png", entity.x, entity.y, new Date().getSeconds()*15);
        }
        else 
        {
          drawer.Image("sprites/projectiles/"+entity.type+".png", entity.x, entity.y);
        }
      }
      else
      {
        if (entity.state == "dead" && entity.respawnTimer > 98)
        {
          explosions.push(new Explosion(entity.x, entity.y));
        }
        if ((entity.id != shipId && entity.state != "dead") ||
          (entity.id == shipId && entity.state == "alive")) 
        {
          var path = "sprites/ships/" + entity.type + ((entity.id == shipId) ? "/sprite-self.png" : "/sprite.png");
          drawer.Image(path, entity.x, entity.y, entity.angle+90);
          drawer.Text(entity.hp + "/100", entity.x-30, entity.y - 20, 10, undefined, "white");
          drawer.Text(entity.name, entity.x-30, entity.y - 35, 10, 20, "white");
        }
      }
  });
};

window.onload = function() {
  drawer = new Drawer();
  connection = new Connection();
  var btn = document.getElementById('start');
  
  btn.onclick = function () {
    connection.Start(document.getElementById('name').value);
    document.getElementById('popup').style.display = "none";
  };
  
  fpsDom = document.getElementById('fps');
  pingDom = document.getElementById("ping");
  
  connection.AddResponseHandler("ship-id", function(id) {
      shipId = id;
  });
  
  connection.AddResponseHandler(getInputRequest, function () {
    connection.Send(getInputResponse, input);
  });
  
  connection.AddResponseHandler('gamestate', function(data) {
    var thisFrameTime = (thisLoop=new Date) - lastLoop;
    frameTime+= (thisFrameTime - frameTime)/5;
    lastLoop = thisLoop;
    var fps = (1000/frameTime).toFixed(0);
    
    var entities = data.coords;
    var date = data.date;
    
    pingDom.innerHTML = date + "ms";
    fpsDom.innerHTML = fps + "fps";
    
    ProcessResponse(entities);
    DrawExplosions();
  });
};

window.onmousemove = function (event) {
  input.x = event.clientX/drawer.delta;
  input.y = event.clientY/drawer.delta;
};

window.onmousedown = function () { 
  input.clicked = true; 
};

window.onkeydown = function (event) {
  if (String.fromCharCode(event.keyCode).toLowerCase() == "r")
  {
    input.rocket = true;  
  }
  if (String.fromCharCode(event.keyCode).toLowerCase() == "e")
  {
    input.mine = true;  
  }
};

window.onkeyup = function (event) {
  if (String.fromCharCode(event.keyCode).toLowerCase() == "r")
  {
    input.rocket = false;  
  }
  if (String.fromCharCode(event.keyCode).toLowerCase() == "e")
  {
    input.mine = false;  
  }
};

window.onmouseup = function () { input.clicked = false; };