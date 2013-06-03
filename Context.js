
function Context(){
    var contextInterval;
    var timeInterval;
    var bombList = [];
    var tank = this.tank = new Tank();
    var enemyList = [];
    var eventManager = new EventManager();
    var status = 3;//1 running 0 pause 2 end 3 begin
    var time = Game.time
    this.start = function(){
        if (status != 3) 
            return;
        go();
    }
    
    var restart = function(){
        if (status != 2) 
            return;
        time = Game.time;
        enemyList = [];
        bombList = [];
        tank.clear();
		eventManager.clear();
        status=1;
		$("#shit_count").text(0);
		$("#kiss_count").text(0);
    }
    
    var go = function(){
        status = 1;
        contextInterval = setInterval(function(){
            refresh();
            eventManager.executeEvent();
            createEnemy();
            crashCheck();
            timeCheck();
        }, Game.refreshTime);
        timeInterval = setInterval(function(){
            time--;
            $("#time").text(time);
        }, 1000);
    }
    
    
    this.resume = function(){
        if (status != 0) 
            return;
        go();
        
    }
    
    
    this.pause = function(){
        if (status != 1) 
            return;
        
        status = 0;
        clearInterval(contextInterval);
        clearInterval(timeInterval);
    }
    
    var createEnemy = function(){
        var f = 1000 / Game.enemyShowUpFre / Game.refreshTime;
        if (Math.floor(Math.random() * f) == 0) {
        
            var r = Game.enemyRFixed ? Game.enemyR : Math.floor(Game.enemyR + Math.random() * Game.enemyR);
            var temp = Math.floor(Math.random() * 4);
            var x;
            var y;
            
            switch (temp) {
                case 0:
                    x = Math.floor(Math.random() * Game.canvasWidth);
                    y = 0;
                    break;
                case 1:
                    x = Math.floor(Math.random() * Game.canvasWidth);
                    y = Game.canvasHeight;
                    break;
                case 2:
                    x = 0;
                    y = Math.floor(Math.random() * Game.canvasHeight);
                    break;
                case 3:
                    x = Game.canvasWidth;
                    y = Math.floor(Math.random() * Game.canvasHeight);
                    break;
                    
            }
            var type;
            
            if (Math.random() > Game.portion) 
                type = 1;
            else 
                type = 0;
            
            var angle = p2pAngle(tank.x, tank.y, x, y);
            enemyList.splice(0, 0, new Enemy(x, y, angle, r, type));
            cleanNullList(enemyList);
        }
        
    }
    
    var p2pAngle = function(x1, y1, x2, y2){
        var theta = Math.acos((x1 - x2) / Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2)));
        if (y2 > y1) 
            theta = 2 * Math.PI - theta;
        return theta;
    }
    
    var crashCheck = function(){
		
		var p=Game.goodArea;
        for (var j = 0; j < enemyList.length; j++) {
            e = enemyList[j];
            if (!e.available) 
                continue;
            
            for (var i = 0; i < bombList.length; i++) {
                b = bombList[i];
                
                if (!b.available) 
                    continue;
                
                if (pointInCircle(b.x, b.y, e.x, e.y, e.r*p)) {
                    e.available = false;
                }
            }
            if (pointInCircle(tank.x, tank.y, e.x, e.y, e.r*p + Game.tankR*p)) {
                if (e.type == 0) 
                    tank.shit();
                if (e.type == 1) 
                    tank.kiss();
                e.available = false;
            }
        }
    }
    
    var timeCheck = function(){
        if (time <= 0) {
			tank.report();
			status = 2;
			restart();
		}
    }
    
    var pointInCircle = function(x, y, x2, y2, r){
        return (Math.pow(x - x2, 2) + Math.pow(y - y2, 2)) < Math.pow(r, 2);
    }
    
    var refresh = function(){
        clear();
        tank.drawMe();
        refreshList(enemyList);
        refreshList(bombList);
    }
    
    var refreshList = function(list){
        for (var i = 0; i < list.length; i++) {
            if (list[i].available) {
                list[i].update();
                list[i].drawMe();
            }
        }
    }
    
    
    
    this.getStatus = function(){
        return status;
    }
    
    
    
    this.addBomb = function(x, y, angle){
        bombList.splice(0, 0, new Bomb(x, y, angle));
        cleanNullList(bombList);
    }
    
    
    
    
    
    var cleanNullList = function(list){
        var i = list.length - 1;
        for (; i >= 0; i--) 
            if (!list[i].available) 
                list.pop();
            else 
                break;
    }
    
    
    
    var clear = function(){
        ctx.clearRect(0, 0, Game.canvasWidth, Game.canvasHeight);
    }
    
    
    this.acceptKeyDownEvent = function(e){
        eventManager.acceptKeyDownEvent(e);
    }
    
    this.acceptKeyUpEvent = function(e){
        eventManager.acceptKeyUpEvent(e);
    }
    
    
}



