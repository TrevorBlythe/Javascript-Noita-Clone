//This will hold all of the game logic

let stepEntitiesPhysics = function(x,y,width,height){
  canvasThreeGraphics.clearRect(0,0,900,480);
  for(let i = 0;i<entities.length;i++){
    
    if(!entities[i].touchingGround){
      entities[i].yVel += 0.05;
    }
    if(!collidingRight(entities[i]) && entities[i].xVel > 0){
      entities[i].x += entities[i].xVel;
    }
    if(!collidingLeft(entities[i]) && entities[i].xVel < 0){
      entities[i].x += entities[i].xVel;
    }
    if(entities[i].yVel < 0){
      if(!collidingUp(entities[i])){
        entities[i].y += entities[i].yVel;
      }else{
        entities[i].yVel = 0;
      }
    }
    if(!collidingDown(entities[i])){
      entities[i].touchingGround = false;
      if(entities[i].yVel > 0){
        entities[i].y += entities[i].yVel;
      }
    }

    entities[i].xVel = lerp(entities[i].xVel,0,0.2);
    entities[i].yVel = lerp(entities[i].yVel,0,0.05);
    renderEntity(entities[i]);
  }
};

let stepParticles = function(list, x, y, width, height) {

  //for(var l = 1; l<4;l++){

  for (var i = height - 1; i >= y; i -= 1) {
    if(list[i] !== undefined){
    for (var j = x; j < width - 1; j++) {
      //START OF FOR LOOPS


      if (list[i][j] !== undefined) {
        if (list[i][j] > 0) {

          let part = Math.floor(list[i][j]);
          let particle = pProps[part];
          let partUp = Math.floor(Math.abs(list[i - 1][j]));
          let partDown = Math.floor(Math.abs(list[i + 1][j]));
          let partLeft = Math.floor(Math.abs(list[i][j - 1]));
          let partRight = Math.floor(Math.abs(list[i][j + 1]));
          //set heat


          let temp = list[i][j] - Math.floor(list[i][j]);
          let heat = pProps[partUp].radiates + pProps[partDown].radiates + pProps[partLeft].radiates + pProps[partRight].radiates;

          //temp is current temp of element. .5 is neutral heat is the heat that is around it.

          if (temp != heat + 0.5) {
            list[i][j] = part + Math.max(Math.min(0.4, heat), -0.4) + 0.5;
            renderPix(i, j);

          }



          if (Math.floor(Math.abs(list[i][j])) != 1) {

            //alert('test');
            if (particle.stateChange) {
              if (heat + 0.5 > particle.stateChange[2] && Math.random() < particle.stateChange[4]) {
                list[i][j] = particle.stateChange[0] + Math.max(Math.min(0.4, heat), -0.4) + 0.5;
                renderPix(i, j);
                continue;
              } else if (heat + 0.5 < particle.stateChange[3] && Math.random() < particle.stateChange[4]) {
                list[i][j] = particle.stateChange[1] + Math.max(Math.min(0.4, heat), -0.4) + 0.5;
                renderPix(i, j);
                continue;
              }
            }


            let mixed = false;
            if (particle.mixes) {
              for (var k = 0; k < particle.mixes.length; k += 3) {

                if (partDown == particle.mixes[k]) {
                  list[i][j] = particle.mixes[k + 1];
                  list[i + 1][j] = particle.mixes[k + 2];
                  mixed = true;
                  //continue;
                }
                if (partUp == particle.mixes[k]) {
                  list[i][j] = particle.mixes[k + 1];
                  list[i - 1][j] = particle.mixes[k + 2];
                  mixed = true;
                  //continue;
                }
                if (partLeft == particle.mixes[k]) {
                  list[i][j] = particle.mixes[k + 1];
                  list[i][j - 1] = particle.mixes[k + 2];
                  mixed = true;
                  //continue;
                }
                if (partRight == particle.mixes[k]) {
                  list[i][j] = particle.mixes[k + 1];
                  list[i][j + 1] = particle.mixes[k + 2];
                  mixed = true;
                  //continue;
                }
              }
            }

            if (mixed === true) {
              continue;
            }






            if (particle.falls !== 0) {
              if (pProps[Math.floor(Math.abs(list[i + particle.falls][j]))].s != 's' && Math.floor(Math.abs(list[i + particle.falls][j])) != part) {
                if (particle.bouyancy > pProps[Math.floor(Math.abs(list[i + particle.falls][j]))].bouyancy) {
                  [list[i][j], list[i + particle.falls][j]] = [-list[i + particle.falls][j], -list[i][j]];
                  renderPix(i + particle.falls, j);
                  renderPix(i, j);
                  continue;
                }
              }
            }

            if (particle.s != 's') {
              if (Math.random() <= 0.5) {
                
                
                
                if (pProps[partLeft].s != 's' && partLeft != part) {
                  if (pProps[Math.floor(Math.abs(particles[i][j-2]))].s != 's' && Math.floor(Math.abs(particles[i][j-2])) != part) {
                    [list[i][j], list[i][j - 2]] = [list[i][j - 2], list[i][j]];
                    renderPix(i, j);
                    renderPix(i, j - 2);
                    continue;
                  }else{
                  [list[i][j], list[i][j - 1]] = [list[i][j - 1], list[i][j]];
                  renderPix(i, j);
                  renderPix(i, j - 1);
                  continue;
                  }
                }
                
                
                
              } else {
                
                
                
                
                if (pProps[partRight].s != 's' && partRight != part) {
                  if (pProps[Math.floor(Math.abs(particles[i][j+2]))].s != 's' && Math.floor(Math.abs(particles[i][j+2])) != part) {
                    [list[i][j], list[i][j + 2]] = [list[i][j + 2], list[i][j]];
                    renderPix(i, j);
                    renderPix(i, j + 2);
                    continue;
                  }else{
                  [list[i][j], list[i][j + 1]] = [list[i][j + 1], list[i][j]];
                  renderPix(i, j);
                  renderPix(i, j + 1);
                  continue;
                  }
                }
                
                
                
                
                
                
              }

            }


          }





        } else {
          list[i][j] = list[i][j] * -1;
        }






      } //J FOR LOOP

    }

    } // I FOR LOOP





  }


};

let collidingDown = function(thing){
  let part = Math.floor(particles[Math.floor(thing.y + thing.height)][Math.floor(thing.x + 1)]);
  let part2 = Math.floor(particles[Math.floor(thing.y + thing.height)][Math.floor(thing.x + thing.width - 1)]);
  if(pProps[part].s == "s" || pProps[part2].s == "s"){
    return true;
  }else{
    return false;
  }
};
let collidingUp = function(thing){
  let part = Math.floor(particles[Math.floor(thing.y)][Math.floor(thing.x+1)])
  let part2 = Math.floor(particles[Math.floor(thing.y)][Math.floor(thing.x + thing.width-1)])
  if(pProps[part].s == "s" || pProps[part2].s == "s"){
    return true;
  }else{
    return false;
  }
};
let collidingRight = function(thing){
  let part = Math.floor(particles[Math.floor(thing.y + 1)][Math.floor(thing.x + thing.width)])
  let part2 = Math.floor(particles[Math.floor(thing.y + thing.height - 1)][Math.floor(thing.x + thing.width)])
  if(pProps[part].s == "s" || pProps[part2].s == "s"){
    return true;
  }else{
    return false;
  }
};
let collidingLeft = function(thing){
  let part = Math.floor(particles[Math.floor(thing.y+1)][Math.floor(thing.x)])
  let part2 = Math.floor(particles[Math.floor(thing.y + thing.height-1)][Math.floor(thing.x)])
  if(pProps[part].s == "s" || pProps[part2].s == "s"){
    return true;
  }else{
    return false;
  }
};
let positionToArrayItem = function(ex, why, ary, tilePix) {
  return ary[Math.ceil((why) / tilePix) - 1][Math.ceil(ex / tilePix)];
};

let positionToArrayPos = function(ex, why, ary, tilePix) {
  return [Math.ceil((why) / tilePix) - 1, Math.ceil(ex / tilePix)];
}

let lerp = function(e,t,r){
  // E is first number t is second r is how much
  return r*(t-e)+e;
}
