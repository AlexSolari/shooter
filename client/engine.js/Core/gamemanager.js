/*global ImageCache*/
/*global $*/
/*global GameScene*/

function GameManager() {
    this.UpdateIntervalID = 0;
    this.RenderIntervalID = 0;
    this.FpsIntervalID = 0;

    this.ScreenWidth = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

    this.ScreenHeight = window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;
    
    this.Scenes = [];

    this.FramesRendered = 0;
    
    this.ImageCache = new ImageCache();

    this.Cursor = {};
}

GameManager.prototype.GetTopScene = function GetTopScene() {
    return this.Scenes[0];
}

GameManager.prototype.Restart = function Restart(size, targetFPS) {
    this.Start(size, targetFPS);
}

GameManager.prototype.Initialize = function Initialize() {
    var self = this;

    $("body").on("mousemove", function SaveMousePosition(e) {
        self.Cursor.x = e.clientX;
        self.Cursor.y = e.clientY;
    });
}

GameManager.prototype.Start = function Start(targetFPS, targetTickrate, initializerCallback) {
    targetFPS = targetFPS || 100;
    targetTickrate = targetTickrate || 25;

    var self = this;

    this.Scenes = [];
    this.Scenes.push(new GameScene(this.ScreenWidth, this.ScreenHeight));

    initializerCallback(this, this.GetTopScene());

    clearInterval(this.UpdateIntervalID);
    clearInterval(this.RenderIntervalID);

    this.UpdateIntervalID = setInterval(function GameLoop() {
        self.GetTopScene().Update();
    }, 1000 / targetTickrate);
    this.RenderIntervalID = setInterval(function GameLoop() {
        self.GetTopScene().Render(targetFPS, targetTickrate);
        
        this.FramesRendered++;
    }, 1000 / targetFPS);
    this.FpsIntervalID = setInterval(function GameLoop() {
        $("#fpsMeter").html(this.FramesRendered + "fps");
        
        this.FramesRendered = 0;
    }, 1000);
};