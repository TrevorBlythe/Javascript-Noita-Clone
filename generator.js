
        let generate = function(width,height,elem) {
                particles = [];
                
                for (var i = 0; i < height; i++) {
                        particles.push([]);
         
                       
                        for (var j = 0; j < width; j++) {
                                
                                if (i !== 0 && i !== height - 1) {
                                  
                                  if(j !== 0 && j !== width - 1){
           
                                        
                                        
                                      if(.7 > Math.random()){
                                        particles[i].push(elem);
                                      }else{
                                        particles[i].push(1.5);
                                      }
                                  
                                          
                                    
                                  }else{
                                    particles[i].push(0);
                                   
                                    
                                  }
                                        
                                } else {
                                        particles[i].push(0);
                                      
                                        
                                }
                                
                                
                                
                        }
                        
                }
                
                
        }
        
        
        let generateCave = function(beginX,beginY,endX,endY,elem){
              
              for(var a = 0;a<20;a++){
                let oldMap = JSON.parse(JSON.stringify(particles));
              for (var i = endY - 1; i >= beginY; i-=1) {
              for (var j = beginX; j < endX - 1; j++) {
                if(oldMap[i][j] !== 0){
                  let wallCount = 0;
         
                  
                  
                  if(Math.floor(oldMap[i + 1][j]) != 1){
                    wallCount++;
                  }
                  if(Math.floor(oldMap[i-1][j]) != 1){
                    wallCount++;
                  }
                  if(Math.floor(oldMap[i][j+1]) != 1){
                    wallCount++;
                  }
                  if(Math.floor(oldMap[i][j-1]) != 1){
                    wallCount++;
                  }
                  if(Math.floor(oldMap[i+1][j+1]) != 1){
                    wallCount++;
                  }
                  if(Math.floor(oldMap[i-1][j+1]) != 1){
                    wallCount++;
                  }
                  if(Math.floor(oldMap[i+1][j-1]) != 1){
                    wallCount++;
                  }
                  if(Math.floor(oldMap[i-1][j-1]) != 1){
                    wallCount++;
                  }
                  
                  
                  
                  
                  
                  //alert(oldMap[i][j]);
                    
                
                    
                  if(Math.floor(oldMap[i][j]) == 1 && wallCount >= 7 ){
                    particles[i][j] = elem;
                  }else if(Math.floor(oldMap[i][j]) != 1 && wallCount < 4 + a % 2){
                    particles[i][j] = 1.5;
                  }
                  
                
                  
                  
                  
                  
                  
                  
                  
                }
              }
              }
              }
              
              
             
              
              
        }
        
        
        
      

