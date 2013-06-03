function EventManager(){

    var keyTable = {
        65: {
            fun: function(){
                context.tank.turnTube('a');
            },
            flag: 0
        },
        68: {
            fun: function(){
                context.tank.turnTube('c');
            },
            flag: 0
        },
        32: {
            fun: function(){
                context.tank.fire();
            },
            flag: 0
        },
        37: {
            fun: function(){
                context.tank.move('a');
            },
            flag: 0
        },
        38: {
            fun: function(){
                context.tank.move('w');
            },
            flag: 0
        },
        39: {
            fun: function(){
                context.tank.move('d');
            },
            flag: 0
        },
        40: {
            fun: function(){
                context.tank.move('s');
            },
            flag: 0
        }
    };
    
    
    this.acceptKeyDownEvent = function(e){
        var obj = keyTable[e.keyCode];
        if (obj != undefined) {//可能按到其他键
            obj.flag = 1;
        }
    }
    
    this.acceptKeyUpEvent = function(e){
        var obj = keyTable[e.keyCode];
        if (obj != undefined) {
            obj.flag = 0;
        }
    }
    
    this.executeEvent = function(){
        for (var p in keyTable) {
            if (keyTable[p].flag == 1) 
                keyTable[p]['fun']();
        }
    }
    
    this.clear = function(){
        for (var p in keyTable) {
            keyTable[p].flag = 0;
            
        }
    }
    
    
    
    
    
}
