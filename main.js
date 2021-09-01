//This will be the main js that utilizes all the classes to run the game
// made by trevor blythe
// canvas widht and height will aslways be 900 by 480

var mapWidth = 900;
var mapHeight = 100;


generate(mapWidth, mapHeight,5.5);

generateCave(1, 1, mapWidth, mapHeight,5);


var bombAmount = 5



var selected = 3.5;
var input = [0, 0, 0, 0];
var feedback = document.getElementById("feedback");
var renderPix = function(i, j) {
  var part = Math.abs(particles[i][j]);
  var particle = pProps[Math.floor(part)];
  var heat = (part - Math.floor(part) - 0.5) * 300;

  canvasOneGraphics.fillStyle = `rgb(${particle.color[0] + heat},${particle.color[1] - heat},${particle.color[2] - heat})`;
  //canvasOneGraphics.fillStyle = `rgb(${particle.color[0]},${particle.color[1]},${particle.color[2]})`;
  canvasOneGraphics.fillRect(j*2,i*2, 2, 2);
  
  
};


var renderEntity = function(entity){
  /*
  var x = entity.x*4;
var y = entity.y*4;
var width = images[entity.image].width*4;
var height = images[entity.image].height*4;


canvasThreeGraphics.translate(x, y);
canvasThreeGraphics.rotate(entity.angle);
canvasThreeGraphics.drawImage(images[entity.image], -(entity.width) / 2, -(entity.height) / 2, entity.width*4, entity.height*4);
canvasThreeGraphics.rotate(-entity.angle);
canvasThreeGraphics.translate(-x, -y);
*/
canvasThreeGraphics.save();
canvasThreeGraphics.translate(entity.x * 4, entity.y * 4);
canvasThreeGraphics.rotate(entity.angle);
canvasThreeGraphics.translate(0,0);

canvasThreeGraphics.drawImage(images[entity.image],0,0,entity.width*4,entity.height*4);
canvasThreeGraphics.restore();


  //canvasThreeGraphics.drawImage(images[entity.image], entity.x*4,entity.y*4,entity.width*4,entity.height*4);
}

var fullRender = function() {
  for (var i = 0; i < particles.length; i++) {
    for (var j = 0; j < particles[i].length; j++) {
      //if(particles[i][j] !== 0){
      renderPix(i, j);
      //}
    }
  }
  renderEntity(entities[0]);
};

    
          
        canvasTwo.addEventListener("mousemove", function(e)
        {
            getMousePosition(canvasTwo, e);
        });


function keyGotUp(e) {
  var keynum;

  if (window.event) { // IE
    keynum = e.keyCode;
  } else if (e.which) { // Netscape/Firefox/Opera
    keynum = e.which;
  }

  if (keynum == 68) {
    input[3] = 0;
  }
  if (keynum == 87) {
    input[0] = 0;
  }
  if (keynum == 83) {
    input[2] = 0;
  }
  if (keynum == 65) {
    input[1] = 0;
  }
  if (keynum == 66) {
    //Drop a bomb
    input[1] = 1;
  }
}

function keyGotPressed(e) {
  var keynum;

  if (window.event) { // IE
    keynum = e.keyCode;
  } else if (e.which) { // Netscape/Firefox/Opera
    keynum = e.which;
  }

  if (keynum == 100) {
    input[3] = 1;
  }
  if (keynum == 119) {
    input[0] = 1;
  }
  if (keynum == 115) {
    input[2] = 1;
  }
  if (keynum == 97) {
    input[1] = 1;
  }
}






var mouseDown = 0;
document.body.onmousedown = function() {
  mouseDown++;
};
document.body.onmouseup = function() {
  --mouseDown;
};









var getMousePosition = function(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  mousex = event.clientX - rect.left;
  mousey = event.clientY - rect.top;


};




var showMap = function() {
  document.getElementById('outputy').innerHTML = JSON.stringify(particles);
  alert(canvasOneGraphics.getImageData(0,0,900,480).data[1]);
};





// MAKES ELEMENT BUTTONS
for (var i = 0; i < pProps.length; i++) {
  myFunction(i);
}

function myFunction(elem) {
  var button = document.createElement('button');
  button.innerHTML = pProps[elem].name;
  button.onclick = function() {
    selected = elem + pProps[elem].radiates + 0.5;
    return false;
  };
  document.body.appendChild(button);
}






fullRender();


setInterval(function() {
  
  
  /********
   * GAME LOOP
   * GameLOOp
   *
   *GAME LOOP NOW NOW NOW NOW NOWWWWWWWWWWWW!!!!!!!!!!!!!!!!
   *
  */

  stepParticles(particles, Math.max(Math.floor(frame.x),0), Math.max(Math.floor(frame.y), 0), Math.floor(frame.x) + frame.width + 10, Math.floor(frame.y) + frame.height + 10);
  stepEntitiesPhysics(Math.max(frame.x,0), Math.max(frame.y, 0), frame.x + frame.width, frame.y + frame.height)
  canvasTwoGraphics.drawImage(canvasOne, frame.x*2, frame.y*2, frame.width*2, frame.height*2, 0, 0, 900, 480);
  canvasTwoGraphics.drawImage(canvasThree, frame.x*4, frame.y*4, frame.width*4, frame.height*4, 0, 0, 900, 480);
  
  frame.x = lerp(frame.x,entities[0].x - 75,.1);
  frame.y = lerp(frame.y,entities[0].y - 40,.1);
  
  try{
  var mpoa = positionToArrayPos(mousex/(900/frame.width) + frame.x,  mousey/(480/frame.height) + frame.y, particles, 1);
  }catch(err){
  var mpoa = [0,0];
  }
  
  entities[1].y = entities[0].y;
  if(entities[0].x > mpoa[1]){
    images[1].src = 'Images/gun.png';
    entities[1].x = entities[0].x + -7;
  }else{
    images[1].src = 'Images/gunFlipped.png';
    entities[1].x = entities[0].x + 5;
  }
  if (mouseDown) {
    
    if(particles[mpoa[0]][mpoa[1]]){
    particles[mpoa[0]][mpoa[1]] = selected;
    
    renderPix(mpoa[0],mpoa[1]);
    }
  }
  if (input[0] == 1) {
    entities[0].yVel += -.14;
  }
  if (input[1] == 1) {
    entities[0].xVel = -1;
  }
  if (input[2] == 1) {
    entities[0].yVel = .5;
  }
  if (input[3] == 1) {
    entities[0].xVel = 1;
  }




}, 16);