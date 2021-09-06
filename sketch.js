//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock; 
var food;  
var addFood, feed; 
var fedTime, lastFed;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 500);
  
  dog = createSprite(900,250,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
  
  
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  
  food = new Food();
 
  addFood = createButton("Add Food"); 
  addFood.position(500,70);  
  addFood.mousePressed(AddFood);

  feed = createButton("Feed Food"); 
  feed.position(600,70);
  feed.mousePressed(FeedFood);





}


function draw() {  
  background("green");
  
    fedTime = database.ref("FeedTime"); 
    fedTime.on("value",function (data){ 
      lastFed = data.val();
    });

    

    
    food.display();
    drawSprites();
  
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val(); 
  food.updateFood(foods)
}


function AddFood(){ 
foodS++; 
dog.addImage(dogImg);
database.ref("/").update({ 
  Food:foodS,
})
  }


function FeedFood(){ 
if(foodS > 0){
  foodS++; 
dog.addImage(happyDogImg); 

database.ref("/").update({ 
  Food:foodS, 
  FeedTime:hour()
});
 }
}


















