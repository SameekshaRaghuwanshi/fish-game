//canvas setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');//it is used to draw any shape
canvas.width = 800;
canvas.height = 500;

let score = 0; //let variable.
let gameframe = 0;
ctx.font = '50px Georgia';
alert("hello!");

//Mouse Interactivity
let canvasPosition = canvas.getBoundingClientRect();//to get correct canvas element position
//console.log(canvasPosition);

 const mouse = {
   x: canvas.width/2,
   y: canvas.height/2,
   click: false
 }
 canvas.addEventListener('mousedown',function(event){
   mouse.click = true;
   mouse.x = event.x - canvasPosition.left;//to get correct canvas's x element position.
   mouse.y = event.y - canvasPosition.top;
  // console.log(mouse.x, mouse.y);
 });
 canvas.addEventListener('mouseup',function(){
   mouse.click = false;
 });
//player
class Player{
  constructor(){
    this.x = canvas.width;
    this.y = canvas.height/2;
    this.radius = 50;
    this.angle = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.spriteWidth = 498;
    this.spriteHeight = 327;
  }
  update(){
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    if(mouse.x != this.x){
      this.x -= dx/10;
    }
    if(mouse.y != this.y){
      this.y -= dy/10;
    }
  }
  draw(){
    if(mouse.click){
      ctx.lineWidth = 0.2;
      ctx.beginPath();
      ctx.moveTo(this.x,this.y);
      ctx.lineTo(mouse.x,mouse.y);
      ctx.stroke();
    }
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
const player = new Player();
//bubbles
const bubblesArray = [];
class Bubble{
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = canvas.height + 100;
    this.radius = 50;
    this.speed = Math.random()*5 + 1;
    this.distance;
  }
  update(){
    this.y -= this.speed;
  }
  draw(){
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius, 0,Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }
}
function handelBubble(){
  if(gameframe % 50 === 0)
  {
    bubblesArray.push(new Bubble());
  }
  for(let i = 0; i< bubblesArray.length; i++)
  {
    if(bubblesArray[i].y < 0 - this.radius * 2){
      bubblesArray.splice(i,1);
    }
    bubblesArray[i].update();
    bubblesArray[i].draw();

  }
  console.log(bubblesArray.length);
}
//animation loop
function animate(){
  ctx.clearRect(0, 0 , canvas.width, canvas.height);//to show proper circle it clear old path
  player.update();
  player.draw();
  ctx.fillStyle = 'black';
  ctx.fillText('Score: ' + score, 10, 50);
  gameframe++;
  handelBubble();
  requestAnimationFrame(animate);
}
animate();
