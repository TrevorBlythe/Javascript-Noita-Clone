
        let generate = function(width,height,elem) {
                particles = [];
                
                for (var i = 0; i < height; i++) {
                        particles.push([]);
         
                       
                        for (var j = 0; j < width; j++) {
                                
                                if (i !== 0 && i !== height - 1) {
                                  
                                  if(j !== 0 && j !== width - 1){
                                        
                                        particles[i].push(1);
                                      
                                  }else{
                                    particles[i].push(0);
                                   
                                    
                                  }
                                        
                                } else {
                                        particles[i].push(0);
                                      
                                        
                                }
                                
                                
                                
                        }
                        
                }
                
                
        };
        
        
        let generateCave = function(beginX,beginY,endX,endY,elem){
          
            let asdf = [];
            
            for(let x=0;x<(endY-beginY)/2;x++){
              asdf.push([]);
              for(let y=0;y<(endX-beginX)/2;y++){
                if(Math.random() < 0.55){
                  
                  asdf[x].push(1.5);
                  

                }else{
                  asdf[x].push(elem);
                }
              }
            }
            
            for(a=0;a<20;a++){
              
              let oldmap = JSON.parse(JSON.stringify(asdf));
              for(i=1;i<asdf.length-1;i++){
                for(j=1;j<asdf[i].length-1;j++){
                    let wallCount = 0
                    if(oldmap[i][j] !== 0){

                      if(Math.floor(oldmap[i][j+1]) == elem){
                        wallCount++;
                      }

                      if(Math.floor(oldmap[i][j+-1]) == elem){
                        wallCount++;
                      }

                      if(Math.floor(oldmap[i+1][j+1]) == elem){
                        wallCount++;
                      }

                      if(Math.floor(oldmap[i+-1][j+1]) == elem){
                        wallCount++;
                      }

                      if(Math.floor(oldmap[i-1][j+-1]) == elem){
                        wallCount++;
                      }

                      if(Math.floor(oldmap[i-1][j]) == elem){
                        wallCount++;
                      }
                      if(Math.floor(oldmap[i+1][j]) == elem){
                        wallCount++;
                      }
                      if(Math.floor(oldmap[i+1][j+-1]) == elem){
                        wallCount++;
                      }


                      if(wallCount > 4){
                        asdf[i][j] = elem;
                      }
                      if(wallCount < 4){
                        asdf[i][j] = 1.5;
                      }
                      
                      
                      
                    }
                }
              }
              
             
              
            }
          try{
            for(i=0;i<asdf.length;i++){
              for(j=0;j<asdf[0].length;j++){
                if(particles[i*2+beginY][j*2+beginX]){
                  particles[i*2+beginY][j*2+beginX] = asdf[i][j];
                }
                if(particles[i*2+1+beginY][j*2+1+beginX]){
                  particles[i*2+1+beginY][j*2+1+beginX] = asdf[i][j];
                }
                if(particles[i*2+beginY][j*2+1+beginX]){
                  particles[i*2+beginY][j*2+1+beginX] = asdf[i][j];
                }
                if(particles[i*2+1+beginY][j*2+beginX]){
                  particles[i*2+1+beginY][j*2+beginX] = asdf[i][j];
                }
                
              }
            }
          }
          catch(err){
            console.log("useless error just happened lol i dont care shut up");
          }
             asdf = undefined;

        }
        
        
        
      

