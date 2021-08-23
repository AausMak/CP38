var path,mainCyclist;

var pathImg,mainRacerImg1,mainRacerImg2;

var player1 , player2 , player3 ;

var gameOver_img , cycleBell ;

var oppPink1_img,oppPink2_img;

var oppYellow1_img,oppYellow2_img;

var oppRed1_img,oppRed2_img;

var pinkG , yellowG ,redG ;

var END =0;

var PLAY =1;

var gameOver , restart ;

var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  oppPink1_img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2_img = loadAnimation("opponent3.png");
  
  oppYellow1_img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2_img = loadAnimation("opponent6.png");
  
  oppRed1_img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2_img = loadAnimation("opponent9.png");
  
  gameOver_img = loadImage("gameOver.png");
  
  cycleBell = loadSound("sound/bell.mp3");
}

function setup(){
  
createCanvas(displayWidth,displayHeight/2);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5; 

//creating boy running
mainCyclist  = createSprite(displayWidth/7,displayHeight/2,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
mainCyclist.setCollider("rectangle",0,0,40,40);
  
gameOver=createSprite(650,150);
gameOver.addImage("over",gameOver_img);
gameOver.scale=0.8;
gameOver.visible = false; 

pinkG = new Group();
yellowG = new Group();
redG = new Group();

}

function draw() {
  background(0);
  camera.position.x=620;
  camera.position.y=150;
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
      
  if(gameState===PLAY){
  
   path.velocityX=-(6+2*distance/150);
   mainCyclist.y = World.mouseY;
  
   distance = distance+Math.round(getFrameRate ()/50);
    
   edges= createEdgeSprites();
   mainCyclist.collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
      
    if (keyDown("space")) {

     cycleBell.play();
      
    }
    
    var oppPlayer = Math.round(random(1,3))
    
    if (World.frameCount % 150 === 0){
        
      if (oppPlayer === 1 )  {
        
        pinkCyclists();
        
      }
      
      else if (oppPlayer === 2) {
        
        yellowCyclists();
        
      }
      else {
        
        redCyclists();
        
      }
        }
    
    if (pinkG.isTouching(mainCyclist) ) {
        
        gameState = END ;
      
       player1.velocityY=0;
      
       player1.addAnimation("opponent",oppPink2_img);
     
    
    }
    
        
    if (yellowG.isTouching(mainCyclist)) {
        
        gameState = END ;

       player2.velocityY=0;
           
       player2.addAnimation("opponent",oppYellow2_img);

      
      }
    
            
    if (redG.isTouching(mainCyclist)) {
        
        gameState = END ;

       player3.velocityY=0;
           
       player3.addAnimation("opponent",oppRed2_img);

      
      }
    

 }
  
  else if (gameState === END) {
    
    gameOver.visible = true ;
    
    text("PRESS UP ARROW TO RESTART THE GAME",500,200);
    textSize(20);
    
    path.velocityX=0;
    mainCyclist.velocityY=0;
    
    mainCyclist.addAnimation("racer",mainRacerImg2);
    
    pinkG.setVelocityXEach(0);
    pinkG.setLifetimeEach(-1);
    
    yellowG.setVelocityXEach(0);
    yellowG.setLifetimeEach(-1);
    
    redG.setVelocityXEach(0);
    redG.setLifetimeEach(-1);
    
    if (keyDown("UP_ARROW")){
      
      reset();
      
    }
  }
  
}

function pinkCyclists () {
  
  player1 = createSprite(1100,Math.round(random(50,250)))
  player1.scale=0.06;
  player1.velocityX=-(6+2*distance/150);
  player1.addAnimation("opponent",oppPink1_img);
  player1.setLifetime=170;
  pinkG.add(player1);
}

function yellowCyclists() {
    
  player2 = createSprite(1100,Math.round(random(50,250)))
  player2.scale=0.06;
  player2.velocityX=-(6+2*distance/150);
  player2.addAnimation("opponent",oppYellow2_img);
  player2.setLifetime=170;
  yellowG.add(player2);
}

function redCyclists() {
    
  player3 = createSprite(1100,Math.round(random(50,250)))
  player3.scale=0.06;
  player3.velocityX=-(6+2*distance/150);
  player3.addAnimation("opponent",oppRed1_img);
  player3.setLifetime=170;
  redG.add(player3);
}

function reset () {
  
  gameState = PLAY ;
  gameOver.visible = false ;
  mainCyclist.addAnimation("opponent",mainRacerImg1);
  pinkG.destroyEach();
  yellowG.destroyEach();
  redG.destroyEach(); 
  distance=0;
}