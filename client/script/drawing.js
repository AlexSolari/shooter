function Drawer(){
    this.Canvas = document.getElementById("canvas").getContext("2d");
}

Drawer.prototype.DrawText = function (text, x, y, size, font) {
    x = x || 0;
    y = y || 0;
    size = size || 16;
    font = font || "Arial";
    
    this.Canvas.font = size+"pt "+font;
    this.Canvas.fillText(text,x,y);
};