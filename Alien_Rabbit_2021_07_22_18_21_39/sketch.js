var garden,rabbit;
var gardenImg,rabbitImg;
var dotgi;
var tentacles, mageses;
var apple, seeds;
var bush, bushy;
var condition;
var start, button;
var fox, kill;
var danger, run;
var lose, died;
var points;

function preload(){
  gardenImg = loadImage("garden.png");
  rabbitImg = loadImage("rabbit.png");
  magesesImg = loadImage("hat_21-512.webp");
  seedsImg = loadImage("unnamed.png");
  bushyImg = loadImage("bush.png");
  buttonImg = loadImage("1590582504557-3eb929b8-9fca-413e-8dd1-6ab352f78dd6-image.png");
  killImg = loadImage("gg.png");
  runImg = loadImage("excalamtion.png");
  diedImg = loadImage("65-651523_you-lose-graphic-you-lose.png");
}

function setup(){
  
  createCanvas(400,400);
  condition = "start";
  points = 0;
  
// Moving background
garden=createSprite(200,240);
garden.addImage(gardenImg);

//creating boy running
dotgi = createSprite(180,340,2,2);

fox = createSprite(300, 250, 2, 2);
fox.addImage(killImg);
fox.scale = 0.8; 

bush = createSprite(200,300,50,50);
bush.addImage(bushyImg);
bush.scale = 0.4;
  
apple = createSprite(20, 40, 30, 30);
apple.addImage(seedsImg);
apple.scale = 0.1;
  
rabbit = createSprite(180,340,30,30);
rabbit.scale =0.09;
rabbit.addImage(rabbitImg);
  
tentacles = createSprite(180, 300, 30, 30);
tentacles.addImage(magesesImg);
tentacles.scale = 0.1;

danger = createSprite(600,100);
danger.addImage(runImg);
danger.scale = 0.25;

start = createSprite(200,200, 30, 30);
start.addImage(buttonImg);
start.scale = 0.62;
  
lose = createSprite(600,150,2,2);
lose.addImage(diedImg);
lose.scale = 0.6;

}


function draw() {
  background(0);
  text ("Points: " + points,200, 15);
  //apple.setCollider("rectangle",0,0,600,600);
  //rabbit.setCollider("rectangle",0,0,700,1600);
  
  edges= createEdgeSprites();
  rabbit.collide(edges);
  tentacles.collide(edges);

  if (rabbit.isTouching(apple)) {
    points = points + 1;
  }
  
if (condition === "start") {
  if (keyDown("Enter")) {
    condition = "play";
    start.x = 6000;
  }
}  

if (condition === "play") {
  //rabbit moevemnt
  fox.velocityX = -2;
  if (fox.x === -200) {
    fox.x = 1400;
  }
  
  if (fox.x < 800 && fox.x > -100) {
    danger.x = 300;
  }
  else {
    danger.x = 600;
  }
  
  if (fox.x < 400 && fox.x > 0) {
    if (rabbit.x < 130 || rabbit.x > 270) {
      condition = "game-over";
      
    }
    if (rabbit.y < 300) {
      condition = "game-over";
    }
  }
  
  if (keyDown("right")) {
    rabbit.x = rabbit.x + 2;
    tentacles.x = tentacles.x + 2;
  }
  if (keyDown("left")) {
    rabbit.x = rabbit.x - 2;
    tentacles.x = tentacles.x - 2;
  }
  if (keyDown("up")) {
    rabbit.y = rabbit.y - 2;
    tentacles.y = tentacles.y - 2;
  }
  if (keyDown("down")) {
    rabbit.y = rabbit.y + 2;
    tentacles.y = tentacles.y + 2;
  }
  
  tentacles.x = rabbit.x;
  tentacles.y = rabbit.y - 27;
  
  if (rabbit.isTouching(apple)) {
    apple.y = Math.round(random(10,390));
    apple.x = Math.round(random(10,390));
  }
}

if (condition === "game-over") {
  lose.x = 200;
  if (keyDown("r")) {
    condition = "start";
    lose.x = 600;
    start.x = 200;
  }
}
  drawSprites();
}