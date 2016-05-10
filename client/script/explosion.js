function Explosion(x,y)
{
    this.x = x;
    this.y = y;
    this.stage = 0;
    
    this.NextStage();
}

Explosion.prototype.NextStage = function() {
    var self = this;
    if (this.stage < 5)
        setTimeout(function() { self.NextStage() }, 75);
    this.stage++;
}