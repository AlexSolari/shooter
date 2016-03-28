function ImageCache()
{
    this.data = {};    
    this.Initialize();
}

ImageCache.prototype.Get = function (url, callback) {
    var result = this.data[url];
    
    if (!result)
    {
        var self = this;
        result = new Image();
        
        result.onload = function () {
            self.data[url] = result;
            
            if (callback)
                callback(result);
        };
        
        result.onerror = function () {
            self.data[url] = self.data["sprites/missingTexture.png"];
            console.log("Error while loading sprite " + url);
            
            if (callback)
                callback(self.data["sprites/missingTexture.png"]);
        };
        
        result.src = url;
        
        return;
    }
    
    if (callback)
        callback(result);
};

ImageCache.prototype.Assets = [
                                "sprites/mines/common-mine-projectile.png",
                                "sprites/rockets/common-rocket-projectile.png",
                                "sprites/rockets/disabled-small-rocket-projectile.png",
                                "sprites/rockets/guided-small-rocket-projectile.png",
                                "sprites/rockets/small-rocket-projectile.png",
                                "sprites/ships/common-ship/sprite-self.png", 
                                "sprites/ships/common-ship/sprite.png",
                                "sprites/ships/destroyer-ship/sprite-self.png", 
                                "sprites/ships/destroyer-ship/sprite.png",
                                "sprites/ships/frigate-ship/sprite-self.png", 
                                "sprites/ships/frigate-ship/sprite.png",
                                "sprites/ships/interceptor-ship/sprite-self.png", 
                                "sprites/ships/interceptor-ship/sprite.png",
                                "sprites/explosion/1.png",
                                "sprites/explosion/2.png",
                                "sprites/explosion/3.png",
                                "sprites/explosion/4.png",
                                "sprites/explosion/5.png",
                                "sprites/projectiles/common-projectile.png",
                                "sprites/projectiles/plasma-projectile.png",
                                "sprites/projectiles/singularity-projectile.png",
                                "sprites/missingTexture.png"
                              ];
                                
ImageCache.prototype.Initialize = function () {
    console.log("Loading assets @ " + new Date().getTime());
    for (var i = this.Assets.length - 1; i >= 0; i--) {
        this.Get(this.Assets[i]);
    }
    console.log("Assets loaded @ " + new Date().getTime());        
};

function Drawer() {
    this.Cache = new ImageCache();
    var domCanvas = document.getElementById("canvas");
    this.delta = window.innerWidth/1920;
    domCanvas.width = 1920;
    domCanvas.height = 1080;
    this.Canvas = domCanvas.getContext("2d");
}

Drawer.prototype.Defaults = {
        Font: "Arial",
        FontSize: 16,
        Color: "#000",
        Angle: 0,
    };

Drawer.prototype.Text = function (text, x, y, size, font, color) {
    size = size || this.Defaults.FontSize;
    font = font || this.Defaults.Font;
    color = color || this.Defaults.Color;
    
    this.Canvas.beginPath();
    this.Canvas.font = size+"pt "+font;
    this.Canvas.fillStyle = color;
    this.Canvas.fillText(text,x,y);
    this.Canvas.closePath();
};

Drawer.prototype.Circle = function(x, y, radius, color) {
    color = color || this.Defaults.Color;
    
    this.Canvas.beginPath();
    this.Canvas.arc(x,y,radius, 0, 2*Math.PI);
    this.Canvas.fillStyle = color;
    this.Canvas.fill();
    this.Canvas.closePath();
};

Drawer.prototype.Curve = function(points, color) {
    color = color || this.Defaults.Color;
    
    this.Canvas.beginPath();
    this.Canvas.strokeStyle = color;
    this.Canvas.beginPath();
    this.Canvas.moveTo( points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
        this.Canvas.lineTo( points[i].x, points[i].y);
    }
    this.Canvas.stroke();
    this.Canvas.closePath();
};

Drawer.prototype.Image = function(url, x, y, angle) { 
    angle = angle || this.Defaults.Angle;
    
    var self = this;
    
    this.Cache.Get(url, function (image) {
        self.Canvas.save(); 
	    self.Canvas.translate(x, y);
	    self.Canvas.rotate(angle * Math.PI/180);
	    self.Canvas.drawImage(image, -(image.width/2), -(image.height/2));
	    self.Canvas.restore(); 
    });
    
	
};

Drawer.prototype.Clear = function() {
    this.Canvas.clearRect(0, 0, 1920, 1080);
};