let degreesToRadians = function(degrees)
{
  alert('test');
  var pi = Math.PI;
  return degrees * (pi/180);
}

function radiansToDegrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

var pProps = [

  {
    name: "border",
    bouyancy: 1,
    falls: 0,
    s: 's',
    color: [0, 0, 20],
    radiates: 0
  }, //0
  //0
  {
    name: "nothing",
    bouyancy: 0,
    falls: 0,
    s: 'g',
    radiates: 0,
    color: [50, 50, 50]
  }, //1
  //1
  {
    name: "gold",
    bouyancy: 1,
    falls: 1,
    s: 's',
    color: [255, 255, 0],
    radiates: 0
  },
  //2
  {
    name: "water",
    bouyancy: 0.3,
    falls: 1,
    s: 'l',
    mixes: [8, 12.5, 12.5],
    stateChange: [6, 7, 0.6, 0.4, 0.1],
    color: [0, 0, 255],
    radiates: -0.01
  },
  //3
  {
    name: "lava",
    bouyancy: 0.9,
    falls: 1,
    s: 'l',
    color: [255, 0, 0],
    stateChange: [4, 14, 1, 0.5, 0.5],
    radiates: 0.4
  },
  //4
  {
    name: "staticRock",
    bouyancy: 1,
    falls: 0,
    s: 's',
    color: [150, 150, 150],
    stateChange: [4, 5, 0.7, 0, 0.1],
    radiates: 0
  },
  //5
  {
    name: "steam",
    bouyancy: 0.2,
    falls: -1,
    s: 'g',
    stateChange: [4, 3, 1, 0.6, 0.0001],
    color: [200, 200, 200],
    radiates: 0
  },
  //6
  {
    name: "ice",
    bouyancy: 0.2,
    falls: 1,
    s: 's',
    stateChange: [3, 7, .2, -0.9, 0.5],
    color: [200, 200, 255],
    radiates: -0.5
  },
  //7
  {
    name: "dirt",
    bouyancy: 0.8,
    falls: 0,
    s: 's',
    color: [210, 105, 30],
    radiates: 0
  },
  //8
  {
    name: "grass",
    bouyancy: 0.7,
    falls: 0,
    s: 's',
    color: [0, 255, 0],
    radiates: 0,
    stateChange: [13, 9, 0.51, 0, 0.3]
  },
  //9
  {
    name: "fire",
    bouyancy: 0.9,
    falls: -1,
    s: 'g',
    color: [255, 0, 0],
    radiates: 0.2,
    stateChange: [11, 11, 0, 1, 0.1]
  },
  //10
  {
    name: "smoke",
    bouyancy: 1,
    falls: -1,
    s: 'g',
    color: [100, 100, 100],
    radiates: 0.05,
    stateChange: [1, 1, 1, 1, 0.11]
  },
  //11
  {
    name: "mud",
    bouyancy: 1,
    falls: 1,
    s: 's',
    color: [101, 67, 33],
    radiates: 0,
    stateChange: [8, 12, 0.7, 0, 0.9]
  },
  //12
  {
    name: "burning",
    bouyancy: 0.5,
    falls: 1,
    s: 'g',
    color: [200, 0, 0],
    radiates: 0.1,
    mixes: [1, 13, 10],
    stateChange: [1, 1, 1, 1, 0.5]
  },
  //13
  {
    name: "gravel",
    bouyancy: 1,
    falls: 1,
    s: 's',
    color: [170, 170, 170],
    stateChange: [4, 5, 0.7, 0, 0.1],
    radiates: 0
  },
  //14
    {
    name: "downRocket",
    bouyancy: .1,
    falls: 1,
    s: 'g',
    color: [190, 70, 20],
    stateChange: [1, 1, 0, 0, 0.1],
    radiates: 0.1
  }
  //15


];
/****
 
 Bigger bouyancy means heavier in the direciton it falls.
 
 
 
 **/

let particles = []; // A array containing data about each particle

let frame = {
  x: 0,
  y: 0,
  width: 149,
  height: 80
};
let canvasOne = document.getElementById('screen');

let canvasOneGraphics = canvasOne.getContext('2d', {
  alpha: 'false'
});
let canvasTwo = document.getElementById('screen2');


let canvasTwoGraphics = canvasTwo.getContext('2d', {
  alpha: 'false'
});
let canvasThree = document.getElementById('entitiesScreen');

let canvasThreeGraphics = canvasThree.getContext('2d', {
  alpha: 'false'
});

let entities = [{
    name: "character",
    image: 0,
    x: 5,
    y: 5,
    width: 4,
    flipped:0,
    height:10,
    yVel: 0,
    xVel: 5,
    angle:0,
  },
  {
    name: "test",
    image: 1,
    x: 5,
    y: 5,
    width: 7,
    flipped:0,  //1 if true 0 if not flipped
    height:5,
    yVel: 0,
    xVel: 5,
    angle:0,
  }

];

let images = [
  new Image(),
  new Image()
  
  
  ];

images[0].src = 'Images/brondon.jpg';
images[1].src = 'Images/gun.png';
