function Explosion(x,y)
{
    this.x = x;
    this.y = y;
    this.stage = 0;
    
    this.NextStage();
}

Explosion.prototype.NextStage = function() {
    if (this.stage < 5)
        setTimeout(() => this.NextStage(), 75);
    this.stage++;
}