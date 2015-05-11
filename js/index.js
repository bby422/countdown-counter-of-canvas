// var window_width=1024;
// var window_height=768;
// var radius=8;
// var margin_top=60;
// var margin_left=30;
const beginTime=new Date(2014,3,20,23,50,50);
var totalSeconds=0;
var balls=[];
var colors=['#33B5E5','#0099CC','#AA66CC','#99CC00','#9933CC','#669900','#FFBB33','#FF8800','#FF4444','#CC000C'];

// 绘制脉络：先画布，在分别每个数字，解构分析法。
window.onload=function(){	
	// window_width=document.body.clientWidth||document.documentElement.clientWidth;
	// window_height=document.body.clientHeight||document.documentElement.clientHeight;
	window_width=window.innerWidth;
	window_height=window.innerHeight;
	margin_left=Math.round(window_width/10);
	margin_top=Math.round(window_height/14);
	radius=Math.round(window_width*4/5/162)-1;
	canvas=document.getElementById('canvas');
	canvas.width=window_width;
	canvas.height=window_height;
	var context=canvas.getContext('2d');
	currentSeconds=getCurrentSeconds();
	setInterval(function(){
		render(context);
		update();
	},50);
}

function getCurrentSeconds(){
	var curTime=new Date();
	var ret=curTime.getTime()-beginTime.getTime();
	ret=Math.round(ret/1000);
	return ret>=0?ret:0;
}

function update(){
	var nextSeconds=getCurrentSeconds();
	
	var newDays=parseInt(nextSeconds/86400);
	var newHours=parseInt((nextSeconds-newDays*86400)/3600);
	var newMinutes=parseInt((nextSeconds-newDays*86400-newHours*3600)/60);
	var newSeconds=parseInt(nextSeconds%60);

	var curDays=parseInt(currentSeconds/86400);
	var curHours=parseInt((currentSeconds-curDays*86400)/3600);
	var curMinutes=parseInt((currentSeconds-curDays*86400-curHours*3600)/60);
	var curSeconds=parseInt(currentSeconds%60);

	if(nextSeconds!=curSeconds){

		if (parseInt(newDays/100)!=parseInt(curDays/100)) {
			addBalls(margin_left,margin_top,parseInt(newDays/100));
		};
		if (parseInt(((newDays%100)/10))!=parseInt(((curDays%100)/10))) {
			addBalls(margin_left+15*(radius+1),margin_top,parseInt(((newDays%100)/10)));
		};
		if (parseInt(newDays%10)!=parseInt(curDays%10)) {
			addBalls(margin_left+30*(radius+1),margin_top,parseInt(newDays%10));
		};

		if (parseInt(curHours/10)!=parseInt(newHours/10)) {
			addBalls(margin_left+54*(radius+1),margin_top,parseInt(newHours/10));
		};
		if (parseInt(curHours%10)!=parseInt(newHours%10)) {
			addBalls(margin_left+69*(radius+1),margin_top,parseInt(newHours%10));
		};
		if (parseInt(curMinutes/10)!=parseInt(newMinutes/10)) {
			addBalls(margin_left+93*(radius+1),margin_top,parseInt(newMinutes/10));
		};
		if (parseInt(curMinutes%10)!=parseInt(newMinutes%10)) {
			addBalls(margin_left+108*(radius+1),margin_top,parseInt(newMinutes%10));
		};
		if (parseInt(curSeconds/10)!=parseInt(newSeconds/10)) {
			addBalls(margin_left+132*(radius+1),margin_top,parseInt(newSeconds/10));
		};
		if (parseInt(curSeconds%10)!=parseInt(newSeconds%10)) {
			addBalls(margin_left+147*(radius+1),margin_top,parseInt(newSeconds%10));
		};
		currentSeconds=nextSeconds;
	}
	updateBalls();
	console.log(balls.length);
}

function updateBalls(){
	for (var i = 0; i < balls.length; i++) {
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		if (balls[i].y>=(window_height-radius)) {
			balls[i].y=window_height-radius;
			balls[i].vy=-balls[i].vy*0.75;
		};
	};

	var cnt=0;
	for (var i = 0; i < balls.length; i++) {
		if (balls[i].x+radius>0&&balls[i].x-radius<window_width) {
			balls[cnt++]=balls[i];
		};
	};
	while(balls.length>cnt){
		balls.pop();
	}
}

function addBalls(x,y,num){
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j]==1) {
                var aBall={
                	x:x+2*j*(radius+1)+(radius+1),
                	y:y+2*i*(radius+1)+(radius+1),
                	g:1.5+Math.random(),
                	vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,  //+-4
                	vy:-5,
                	color:colors[Math.floor(Math.random()*colors.length)]
                }
                balls.push(aBall);
			};
		};

	};
}

function render(cxt){
	cxt.clearRect(0,0,window_width,window_height);

	var days=parseInt(currentSeconds/86400);
	var hours=parseInt((currentSeconds-days*86400)/3600);
	var minutes=parseInt((currentSeconds-days*86400-hours*3600)/60);
	var seconds=parseInt(currentSeconds%60);
	// alert(minutes)

	renderGigit(margin_left,margin_top,parseInt(days/100),cxt);
	renderGigit(margin_left+15*(radius+1),margin_top,parseInt(((days%100)/10)),cxt);
	renderGigit(margin_left+30*(radius+1),margin_top,parseInt(days%10),cxt);
	renderGigit(margin_left+45*(radius+1),margin_top,10,cxt);
	renderGigit(margin_left+54*(radius+1),margin_top,parseInt(hours/10),cxt);
	renderGigit(margin_left+69*(radius+1),margin_top,parseInt(hours%10),cxt);
	renderGigit(margin_left+84*(radius+1),margin_top,10,cxt);
	renderGigit(margin_left+93*(radius+1),margin_top,parseInt(minutes/10),cxt);
	renderGigit(margin_left+108*(radius+1),margin_top,parseInt(minutes%10),cxt);
	renderGigit(margin_left+123*(radius+1),margin_top,10,cxt);
	renderGigit(margin_left+132*(radius+1),margin_top,parseInt(seconds/10),cxt);
	renderGigit(margin_left+147*(radius+1),margin_top,parseInt(seconds%10),cxt);

	for (var i = 0; i < balls.length; i++) {
		cxt.fillStyle=balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,radius,0,2*Math.PI,true);
		cxt.closePath();
		cxt.fill();
	};
}

function renderGigit(x,y,num,cxt){
	cxt.fillStyle="rgb(0,102,153)";
	// x,y确定了圆心的坐标，非常重要！
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {        
			if (digit[num][i][j]==1) {
               	cxt.beginPath();
               	cxt.arc(x+2*j*(radius+1)+(radius+1),y+2*i*(radius+1)+(radius+1),radius,0,2*Math.PI);
               	cxt.closePath();
               	cxt.fill();
			};
		};
	};
}