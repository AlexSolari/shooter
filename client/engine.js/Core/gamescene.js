function GameScene(width, height)
{
    this.Entities = [];
    var canvas = $("#canvas");
    canvas[0].width = width;
    canvas[0].height = height;
    this.Screen = canvas[0].getContext("2d");
    this.Screen.width = width;
    this.Screen.height = height;
    this.shipId = -1;
}

GameScene.prototype.Add = function Add(entity) {
    this.Entities.push(entity);
}

GameScene.prototype.Clear = function Clear() {
    this.Entities = [];
    this.Screen.clearRect(0, 0, Game.ScreenWidth, Game.ScreenHeight);
}

GameScene.prototype.Update = function Update() {
}

GameScene.prototype.Render = function Render(fps, tickrate) {
    var self = this;
    
    this.Screen.clearRect(0, 0, this.Screen.width, this.Screen.height);
    this.Entities.forEach(function EntityRender(entity) {
        if (entity.state && entity.state != "alive")
            return;
            
        if (entity.timedLife && entity.lifeSpan < 50 && (entity.lifeSpan % 5 == 0 || entity.lifeSpan % 3 == 0 || entity.lifeSpan % 7 == 0))
            return;
       
        self.Draw(
            (entity.id != self.shipId) ? entity.type : entity.type+"-self"
            , entity.angle + 90, entity.x, entity.y);
        
        if (entity.hp)
            self.Text(entity.hp.toFixed(2) + "/" + entity.maxhp, entity.x-30, entity.y - 20, 10, "Arial", "white");
        if (entity.name)            
            self.Text(entity.name, entity.x-30, entity.y - 35, 10, "Arial", "white");
            
        if (entity.type == "singularity-projectile")
        {
            var radius = 150;
            var enemies = self.Entities.filter(function (s) {
                return s.type.indexOf("-ship") > 0 && s.state != "dead" && s.id != entity.emitter;
            });
            var targets = enemies;
     
            for (var i = 0; i < targets.length; i++) {
                if (Math.pow(entity.x - targets[i].x, 2) + Math.pow(entity.y- targets[i].y, 2) < radius * radius)
                    self.Curve([entity, targets[i]], "#99D9EA");
            }
        }
    });
}

GameScene.prototype.Text = function Text(text, x, y, size, font, color) {
    this.Screen.beginPath();
    this.Screen.font = size+"pt "+font;
    this.Screen.fillStyle = color;
    this.Screen.fillText(text,x,y);
    this.Screen.closePath();
}

GameScene.prototype.Draw = function Draw(sprite, angle, x, y) {
    var self = this; 
    
    Game.ImageCache.Get("sprites/"+sprite+".png", function (image) {
        self.Screen.save(); 
	    self.Screen.translate(x, y);
	    self.Screen.rotate(angle * Math.PI/180);
	    self.Screen.drawImage(image, -(image.width/2), -(image.height/2));
	    self.Screen.restore(); 
    });
}

GameScene.prototype.Curve = function Curve(points, color) {
    color = color || this.Defaults.Color;
    
    this.Screen.beginPath();
    this.Screen.strokeStyle = color;
    this.Screen.beginPath();
    this.Screen.moveTo( points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
        this.Screen.lineTo( points[i].x, points[i].y);
    }
    this.Screen.stroke();
    this.Screen.closePath();
};