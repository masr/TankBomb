
function Tank(){
    this.x = Game.canvasWidth / 2;
    this.y = Game.canvasHeight / 2;
    var angle = 0;
    var bombFlag = 0;
    var shitCount = 0;
    var kissCount = 0;
    
    this.drawMe = function(){
        ctx.beginPath();
        ctx.fillStyle = Game.tankColor;
        ctx.arc(this.x, this.y, Game.tankR, 0, 2 * Math.PI, true);
        ctx.fill();
        
        ctx.beginPath();
        ctx.strokeStyle = Game.tubeColor;
        ctx.lineWidth = Game.tubeWidth;
        ctx.moveTo(this.x, this.y);
        var newX = this.x + Game.tubeL * Math.cos(angle);
        var newY = this.y + Game.tubeL * Math.sin(angle);
        ctx.lineTo(newX, newY);
        ctx.stroke();
        
        ctx.drawImage(Game.tankImg, this.x - Game.tankR, this.y - Game.tankR, 2 * Game.tankR, 2 * Game.tankR);
    }
    
    this.turnTube = function(i){
        var per = Game.tubePerTurn;
        if (i == 'c') 
            angle += per;
        else 
            if (i == 'a') 
                angle -= per;
        
        if (angle >= Math.PI * 2) 
            angle -= Math.PI * 2;
        else 
            if (angle < 0) 
                angle += Math.PI * 2;
    }
    
    this.move = function(direct){
    
        var per = Game.tankPerMove;
        switch (direct) {
            case 'a':
                this.x -= per;
                break;
            case 's':
                this.y += per;
                break;
            case 'd':
                this.x += per;
                break;
            case 'w':
                this.y -= per;
                break;
        }
    }
    
    this.fire = function(){
        var flag = 1000 / Game.refreshTime / Game.bombFre;
        if (bombFlag <= 0) {
            context.addBomb(this.x, this.y, angle);
            bombFlag = flag;
        }
        bombFlag--;
    }
    
    
    this.kiss = function(){
        kissCount++;
        $("#kiss_count").text(kissCount);
    }
    this.shit = function(){
        shitCount++;
        $("#shit_count").text(shitCount);
    }
    this.report = function(){
        alert("洁宝宝的最终战绩是亲了小苏苏" + kissCount + "下，吃了" + shitCount + "坨屎，得了"+(kissCount*5-shitCount*10)+"分");
    }
    
    
    this.clear = function(){
        this.x = Game.canvasWidth / 2;
        this.y = Game.canvasHeight / 2;
        angle = 0;
        bombFlag = 0;
        shitCount = 0;
        kissCount = 0;
    }
    
}
