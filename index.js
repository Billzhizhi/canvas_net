/**
 * Created by gzx on 2017/6/14. codeES5
 */
function Circle(x, y){
    this.x =x;
    this.y =y;
    this.r =Math.random()*10;
    this._mx=Math.random();
    this._my=Math.random();
}

Circle.prototype.drawCricle = function(ctx){
    ctx.fillStyle ="rgba(204, 204, 204, .3)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
    ctx.closePath();
    ctx.fill();
}

Circle.prototype.drawLine = function(ctx, _circle){
    var dx =this.x-_circle.x;
    var dy =this.y-_circle.y;
    var d =Math.sqrt(dx*dx+dy*dy);
    if(d<150){
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(_circle.x, _circle.y);
        ctx.strokeStyle ='rgba(204, 204, 204, .3)';
        ctx.stroke();
    }

}

Circle.prototype.move = function(w, h){
    this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
    this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
    this.x += this._mx / 2;
    this.y += this._my / 2;

}

var cnv = document.getElementById("paint-board");
var ctx =cnv.getContext('2d');
var w = cnv.width = cnv.offsetWidth;
var h =cnv.height = cnv.offsetHeight;
var circles =[];
var current_circle=new Circle(0,0);
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame|| window.msRequestAnimationFrame ;
var init =function(num){
    for(var i=0; i<num; i++){
        circles.push(new Circle(Math.random()*w, Math.random()*h));
    }
    draw();
}

var draw = function(){
    ctx.clearRect(0, 0, w, h);
    for(var j=0; j<circles.length; j++){
        circles[j].move(w,h);
        circles[j].drawCricle(ctx);
        for(var k=j+1; k<circles.length; k++){
            circles[j].drawLine(ctx, circles[k]);
        }
    }

    if(current_circle.x){
        current_circle.drawCricle(ctx);
        for(var i=0; i<circles.length; i++){
            current_circle.drawLine(ctx, circles[i]);
        }
    }
    requestAnimationFrame(draw);
}

window.onload =function(){
    init(60);
}

window.onmousemove= function(e){
    e =e || window.event;
    console.log("over...")
    current_circle.x = e.clientX;
    current_circle.y = e.clientY;

}

window.onmouseout =function(){
    current_circle.x =null;
    current_circle.y=null;
}