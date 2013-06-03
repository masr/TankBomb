function Enemy(x, y, angle, r, type){//type 0 enemy 1 vip
    this.available = true;
    this.x = x;
    this.y = y;
    this.r = r;
    this.type = type;
    this.update = function(){
        var perMove = Game.enemyPerMove;
        this.x = this.x + perMove * Math.cos(angle);
        this.y = this.y + perMove * Math.sin(angle);
        
        if (this.x > Game.canvasWidth || this.y > Game.canvasHeight || this.x < 0 || this.y < 0) 
            this.available = false;
    }
    
    this.drawMe = function(){
        ctx.beginPath();
        ctx.fillStyle = Game.enemyColor;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.fill();
        var img;
        if (this.type == 0) 
            img = Game.enemyImg;
        if (this.type == 1) 
            img = Game.vipImg;
        ctx.drawImage(img, this.x - this.r, this.y - this.r, 2 * this.r, 2 * this.r );
    }
    
    this.bombed = function(){
        this.available = false;
    }
	
	this.kissed=function(){
		this.available=false;
		
	}
}
