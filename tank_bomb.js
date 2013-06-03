
var ctx;
var Game;
var context;

$(document).ready(function(){
    init();
    initEvent();
    context = new Context();
    context.start();
});



function init(){
    var canvas = document.getElementById("game_canvas");
    ctx = canvas.getContext("2d");
    Game = {
		
        tankColor: "#ffffff",
        enemyColor: "#ffffff",
        bombColor: "#000000",
		tubeColor:"blue",
		
        tankR: 15,
        bombR: 1,
        enemyR: 10,//敌人半径在  r/2 和2r平均分布
        tubeL: 25,
		tubeWidth:5,
		
        refreshTime: 50,//多少毫秒update下以及刷屏
        tankPerMove: 6,//没执行一次update移动的像素值
        bombPerMove: 10,
        tubePerTurn: 0.2,//没执行一下update转过的弧度
        enemyPerMove: 5,
        enemyShowUpFre: 4,//一秒出现多少个敌人
        bombFre:7,//一秒多少发子弹
		
        enemyRFixed: true,
        tankImgSrc: "zj.png",
        enemyImgSrc: "shit.png",
        vipImgSrc: "msh.png",
		portion:0.65,//enemy比重
		time:60,
		goodArea:0.8
		
    }
    Game.tankImg = new Image();
    Game.tankImg.src = Game.tankImgSrc;
    Game.vipImg = new Image();
    Game.vipImg.src = Game.vipImgSrc;
    Game.enemyImg = new Image();
    Game.enemyImg.src = Game.enemyImgSrc;
    Game.canvasWidth=parseInt($("#game_canvas").attr('width'));
    Game.canvasHeight=parseInt($("#game_canvas").attr('height'));
	
	$("#time").text(Game.time);
}


function initEvent(){
    $(window).keydown(function(e){
        context.acceptKeyDownEvent(e);
        
    });
    
    $(window).keyup(function(e){
        context.acceptKeyUpEvent(e);
    })
    
    $("#control_button").click(function(){
    
        switch (context.getStatus()) {
            case 0:
                context.resume();
                $("#control_button").text("暂停");
                break;
            case 1:
                context.pause();
                $("#control_button").text("开始");
                break;
        }
        
    });
	

    
    
}





