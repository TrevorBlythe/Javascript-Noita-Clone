//This will be the main js that utilizes all the classes to run the game
// made by trevor blythe
// canvas widht and height will aslways be 900 by 480

var mapWidth = 900;
var mapHeight = 480;


generate(mapWidth, mapHeight,9.5);

generateCave(1, 1, mapWidth, mapHeight,9);






var selected = 3.5;
var input = [0, 0, 0, 0];
var feedback = document.getElementById("feedback");
var renderPix = function(i, j) {
  var part = Math.abs(particles[i][j]);
  var particle = pProps[Math.floor(part)];
  var heat = (part - Math.floor(part) - 0.5) * 300;

  canvasOneGraphics.fillStyle = `rgb(${particle.color[0] + heat},${particle.color[1] - heat},${particle.color[2] - heat})`;
  //canvasOneGraphics.fillStyle = `rgb(${particle.color[0]},${particle.color[1]},${particle.color[2]})`;
  canvasOneGraphics.fillRect(j,i, 1, 1);
  
  
};

var renderEntity = function(entity){
  canvasThreeGraphics.fillStyle = 'black';
  canvasThreeGraphics.fillRect(entity.x,entity.y,entity.width,entity.height);
}

var fullRender = function() {
  for (var i = 0; i < particles.length; i++) {
    for (var j = 0; j < particles[i].length; j++) {
      renderPix(i, j);

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
   *
   *
  */
  stepParticles(particles, Math.max(Math.floor(frame.x),0), Math.max(Math.floor(frame.y), 0), Math.floor(frame.x) + frame.width + 10, Math.floor(frame.y) + frame.height + 10);
  stepEntitiesPhysics(Math.max(frame.x,0), Math.max(frame.y, 0), frame.x + frame.width, frame.y + frame.height)
  canvasTwoGraphics.drawImage(canvasOne, frame.x, frame.y, frame.width, frame.height, 0, 0, 900, 480);
  canvasTwoGraphics.drawImage(canvasThree, frame.x, frame.y, frame.width, frame.height, 0, 0, 900, 480);
  
  frame.x = lerp(frame.x,entities[0].x - 75,.05);
  frame.y = lerp(frame.y,entities[0].y - 40,.05);
  


  
  if (mouseDown) {
    var mpoa = positionToArrayPos(mousex/(mapWidth/frame.width) + frame.x,  mousey/(mapHeight/frame.height) + frame.y, particles, 1);
    if(particles[mpoa[0]][mpoa[1]]){
    particles[mpoa[0]][mpoa[1]] = selected;
    
    renderPix(mpoa[0],mpoa[1]);
    }
  }
  if (input[0] == 1) {
    entities[0].yVel = -.5;
  }
  if (input[1] == 1) {
    entities[0].xVel = -.5;
  }
  if (input[2] == 1) {
    entities[0].yVel = .5;
  }
  if (input[3] == 1) {
    entities[0].xVel = .5;
  }




}, 1);