/*global Connection*/
/*global GameManager*/
/*global $*/

var Game;
var kills = [];

$(function Launch() {
    Game = new GameManager();
    Game.Initialize();
    Game.Start(200, 10, function Initializer(game, scene) {
      var connection = new Connection();
      var input = { clicked: false, x: 0, y: 0, firstAbility: false, secondAbility: false };
      var leaderboard = document.getElementById('leaderboard');
      var ScoreToDom = function ScoreToDom(score) {
        var html = "<h3>Score</h3><ul>{list}</ul>";
        var li = "<li><strong>{name}</strong>:{score}</li>";
        var list = "";
        
        score.forEach(function(record) {
          list += li.replace("{name}", record.name).replace("{score}", record.score);
        });
        
        return html.replace("{list}", list);
      };
      
      connection.AddResponseHandler("ship-id", function(id) {
          scene.shipId = id;
      });
      
      connection.AddResponseHandler("frameshift", function(shift) {
          scene.FrameNumber = shift;
      });
      
      connection.AddResponseHandler("kill", function(data) {
        var killData = {
          "time": new Date().toLocaleTimeString(),
          "killer": data.killer,
          "died": data.died,
        };
        kills.push(killData);  
        var str = "["+killData.time+"] "+killData.killer + " killed " + killData.died;
        document.getElementById("last-kill").innerHTML = str;
      });
      
      connection.AddResponseHandler('gamestate', function(data) {
        var entities = data.coords;
        
        scene.Entities = entities;
        scene.ExpectedFrameNumber = data.frame;
        leaderboard.innerHTML = ScoreToDom(data.points);
        
        connection.Send("getInput_response", input);
      });
      
      window.onmousemove = function (event) {
        input.x = event.clientX;
        input.y = event.clientY;
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
      
      document.getElementById('start').addEventListener('click', function () {
        var name = document.getElementById('name').value;
        connection.Start(name);
      });
    
    });
});

$(function Preparation() {
  var btnStart = document.getElementById('start');
  var btnSpectrate = document.getElementById('spectrate');
  
  btnStart.onclick = function () {
    var type = document.getElementById('ship-type').value;
    var hint = "<li> <strong>{key}</strong> - {desc} </li>";
    var shipHint = document.getElementById("hint-ship");
    var hints = document.getElementById("hints-list");
    document.getElementById('popup').style.display = "none";
    switch (type) {
      case 'interceptor-ship':
        hints.innerHTML += hint.replace("{key}", "Q").replace("{desc}", "Place mine that explodes on touch, dealing 10 dmg.");
        hints.innerHTML += hint.replace("{key}", "W").replace("{desc}", "Overdrive reactor, increasing move and firing speed.");
        shipHint.innerHTML = "Fast ship, 60 HP. <br/> Projectile damage: 0.9 <br/>  Projectile speed: 20";
        break;
      case 'common-ship':
        hints.innerHTML += hint.replace("{key}", "Q").replace("{desc}", "Launch homing missle, that deals 10 dmg. Only 2 rockets can exist at on time.");
        hints.innerHTML += hint.replace("{key}", "W").replace("{desc}", "Place mine that explodes on touch, dealing 10 dmg.");
        shipHint.innerHTML = "Medium speed ship, 100 HP. <br/> Projectile damage: 1.5 <br/>  Projectile speed: 15";
        break;
      case 'frigate-ship':
        hints.innerHTML += hint.replace("{key}", "Q").replace("{desc}", "Activate shield, lowering all incoming damage to 1.");
        hints.innerHTML += hint.replace("{key}", "W").replace("{desc}", "Charge your attacks, increasing projectile speed and lowering activation time.");
        shipHint.innerHTML = "Slow ship, 170 HP. <br/> Projectile damage: 25 <br/>  Projectile speed: 10 <br/> Homing projectiles";
        break;
      case 'destroyer-ship':
        hints.innerHTML += hint.replace("{key}", "Q").replace("{desc}", "Repair your ship for 25hp.");
        hints.innerHTML += hint.replace("{key}", "W").replace("{desc}", "Warp, increasing speed and acceleration.");
        hints.innerHTML += hint.replace("{key}", "Passive").replace("{desc}", "Repairs your ship slowly.");
        shipHint.innerHTML = "Very slow ship, 250 HP. <br/> Projectile damage: 0.5 <br/>  Projectile speed: 5 <br/> AOE over time damage projectiles";
        break;
    }
    
  };
  btnSpectrate.onclick = function () {
    document.getElementById('popup').style.display = "none";
    document.getElementById('hints').style.display = "none";
  };
});

