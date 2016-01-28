function ImageCache()
{
    this.data = [];    
}

ImageCache.prototype.Get = function (url, callback) {
    var result = this.data[url];
    
    if (!result)
    {
        var self = this;
        result = new Image();
        
        result.onload = function () {
            self.data[url] = result;
            callback(result);
        };
        result.src = url;
        
        return;
    }
    
    callback(result);
};

function Drawer() {
    this.Pool = new ImageCache();
    var domCanvas = document.getElementById("canvas");
    domCanvas.width = window.innerWidth;
    domCanvas.height = window.innerHeight;
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
    
    this.Pool.Get(url, function (image) {
        self.Canvas.save(); 
	    self.Canvas.translate(x, y);
	    self.Canvas.rotate(angle * Math.PI/180);
	    self.Canvas.drawImage(image, -(image.width/2), -(image.height/2));
	    self.Canvas.restore(); 
    });
    
	
};

Drawer.prototype.Clear = function() {
    this.Canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
};