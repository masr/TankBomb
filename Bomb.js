
function Bomb(x, y, angle){
    this.available = true;
	this.x=x;
	this.y=y;

    this.update = function(){
        var per = Game.bombPerMove;
        var newX = this.x + per * Math.cos(angle);
        var newY = this.y + per * Math.sin(angle);
        this.x = newX;
        this.y = newY;
        
        if (this.x > Game.canvasWidth || this.y > Game.canvasHeight || this.x < 0 || this.y < 0) 
            this.available = false;
    }
    
    this.drawMe = function(){
        ctx.beginPath();
        ctx.fillStyle = Game.bombColor;
        ctx.arc(this.x, this.y, Game.bombR, 0, Math.PI * 2, true);
        ctx.fill();
    }
}