/*global Connection*/
/*global Drawer*/
/*global Explosion*/

var drawer;
var connection;
var input = { clicked: false, x: 0, y: 0, firstAbility: false, secondAbility: false };
var fpsDom = null;
var pingDom = null;
var getInputRequest = "getInput_request";
var getInputResponse = "getInput_response";
var frameTime = 0, lastLoop = new Date, thisLoop;
var inputScanAllowed = true;
var shipId;
var frameToDraw = null;
var explosions = [];
var kills = [];

function Draw() {
  var entities = frameToDraw || [];
  entities = entities.filter(function (entity) { return (entity.x != 0 && entity.y != 0) });
  
  drawer.Clear();
  var ships = entities.filter(function (entity) { return entity.type.indexOf("-ship") > 0});
  var projectiles = entities.filter(function (entity) { return entity.type.indexOf("-ship") < 0});
  ships.forEach(function(entity) {
      if (entity.state == "dead" && entity.respawnTimer > 98)
        {
          explosions.push(new Explosion(entity.x, entity.y));
        }
        if ((entity.id != shipId && entity.state != "dead") ||
          (entity.id == shipId && entity.state == "alive")) 
        {
          var path = "sprites/ships/" + entity.type + ((entity.id == shipId) ? "/sprite-self.png" : "/sprite.png");
          drawer.Image(path, entity.x, entity.y, entity.angle+90);
          drawer.Text(entity.hp.toFixed(2) + "/" + entity.maxhp, entity.x-30, entity.y - 20, 10, undefined, "white");
          drawer.Text(entity.name, entity.x-30, entity.y - 35, 10, 20, "white");
        }
  });
  projectiles.forEach(function (entity) {
      if (entity.type.indexOf("-rocket") > 0)
        {
          if (entity.type.indexOf("small") >= 0 && !entity.autotargetEnabled)
          {
            drawer.Image("sprites/rockets/disabled-small-rocket-projectile.png", entity.x, entity.y);
          }
          else 
            drawer.Image("sprites/rockets/"+entity.type+".png", entity.x, entity.y, entity.angle+90);
        }
        else if (entity.type.indexOf("-mine") > 0)
        {
          drawer.Image("sprites/mines/"+entity.type+".png", entity.x, entity.y, entity.angle+new Date().getSeconds()*15);
        }
        else 
        {
          drawer.Image("sprites/projectiles/"+entity.type+".png", entity.x, entity.y);
          if (entity.type == "singularity-projectile")
          {
            var radius = 150;
            var enemies = ships.filter(s => s.state != "dead" && s.id != entity.emitter);
            var targets = enemies;
            
            for (var i = 0; i < targets.length; i++) {
                if (Math.sqrt(Math.pow(entity.x - targets[i].x, 2) + Math.pow(entity.y- targets[i].y, 2)) < radius)
                    drawer.Curve([entity, targets[i]], "#99D9EA");
                
            }
          }
        }
  });
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
  frameToDraw = entities;
}

window.onload = function() {
  drawer = new Drawer();
  connection = new Connection();
  var btn = document.getElementById('start');
  var btn2 = document.getElementById('spectrate');
  
  btn.onclick = function () {
    connection.Start(document.getElementById('name').value);
    document.getElementById('popup').style.display = "none";
  };
  btn2.onclick = function () {
    document.getElementById('popup').style.display = "none";
  };
  
  fpsDom = document.getElementById('fps');
  pingDom = document.getElementById("ping");
  
  connection.AddResponseHandler("ship-id", function(id) {
      shipId = id;
  });
  
  connection.AddResponseHandler(getInputRequest, function () {
    connection.Send(getInputResponse, input);
    inputScanAllowed = true;
  });
  
  connection.AddResponseHandler("kill", function(data) {
    var killData = {
      "time": new Date().toLocaleTimeString(),
      "killer": data.killer,
      "died": data.died,
    };
    kills.push(killData);  
    var str = "["+killData.time+"] "+killData.killer + " killed " + killData.died;
    console.log(str);
    document.getElementById("last-kill").innerHTML = str;
  });
  
  connection.AddResponseHandler('gamestate', function(data) {
    var thisFrameTime = (thisLoop=new Date) - lastLoop;
    frameTime+= (thisFrameTime - frameTime)/5;
    lastLoop = thisLoop;
    var fps = (1000/frameTime).toFixed(0);
    
    var entities = data.coords;
    var date = data.date;
    
    pingDom.innerHTML = "UpdateTime: " + date + "ms";
    fpsDom.innerHTML = fps + "fps";
    
    ProcessResponse(entities);
  });
  
  var UpdatesPerSecond = 60;
  
  setInterval(Draw, 1000 / UpdatesPerSecond);
};

window.onmousemove = function (event) {
  if (inputScanAllowed){
    input.x = event.clientX/drawer.delta;
    input.y = event.clientY/drawer.delta;
    inputScanAllowed = false;
  }
};

window.onmousedown = function () { 
  input.clicked = true; 
};

window.onkeydown = function (event) {
  if (String.fromCharCode(event.keyCode).toLowerCase() == "q")
  {
    input.firstAbility = true;  
  }
  if (String.fromCharCode(event.keyCode).toLowerCase() == "w")
  {
    input.secondAbility = true;  
  }
};

window.onkeyup = function (event) {
  if (String.fromCharCode(event.keyCode).toLowerCase() == "q")
  {
    input.firstAbility = false;  
  }
  if (String.fromCharCode(event.keyCode).toLowerCase() == "w")
  {
    input.secondAbility = false;  
  }
};

window.onmouseup = function () {
  input.clicked = false; 
  
};