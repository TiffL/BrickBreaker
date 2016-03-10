var vimg = document.getElementById("svgimg");
var paddle = document.getElementById('paddle');
var ball = document.getElementById('ball');

var pad = svgimg.createSVGRect();
pad.x=375;
pad.y=415;
pad.width=85;
pad.height=16;


var xVal= paddle.getAttribute("x");

var startGame = function(){
  window.addEventListener('keydown', function (e) {
    switch(e.keyCode) {
      case 37: //left
        paddle.setAttribute("x",parseInt(xVal)-5);
        pad.x-=5;
        if (xVal <= 0) {
          paddle.setAttribute("x","0");
        }
        break;
      case 39: //right
        paddle.setAttribute("x",parseInt(xVal)+5);
        pad.x+=5;
        if (xVal >= 705) {
          paddle.setAttribute("x","705");
        }
        break;
    }
    xVal = paddle.getAttribute("x");
  }, true);
    moveBall();
};

var numBricks = 10;  //total number of bricks in row
var brickSetup = function(){
    var vimgWidth = parseInt(vimg.getAttribute("width"));
    var bricksLeft = numBricks;
    while (bricksLeft > 0){
    	var brick = document.createElementNS("http://www.w3.org/2000/svg","rect");
    	brick.setAttribute("x",(numBricks-bricksLeft)*(vimgWidth/numBricks));
    	brick.setAttribute("y",0);
    	brick.setAttribute("width",vimgWidth/numBricks);
    	brick.setAttribute("height",25);
    	brick.setAttribute("fill","red");
    	brick.setAttribute("stroke","black");
    	vimg.appendChild(brick);
    	bricksLeft -= 1;
    }
}
brickSetup();

var moveBall = function(){
    var currentX  = parseInt(ball.getAttribute("x"));
    var currentY  = parseInt(ball.getAttribute("y"));
    var deltaX = 1;
    var deltaY = 1;


    var bounce = function(){
      	ball.setAttribute("x",currentX);
      	ball.setAttribute("y",currentY);
      	vimg.appendChild(ball);

      	/*if (currentX == 0 || currentX == parseInt(vimg.getAttribute("width")) - parseInt(ball.getAttribute("width")))
      	    deltaX *= -1;
      	else if (currentY == 0 || currentY == parseInt(vimg.getAttribute("height")) - parseInt(ball.getAttribute("height")))
      	    deltaY *= -1;*/

        //bounce off walls
      	if (currentX == 0)
      	    deltaX = 1;
      	else if (currentX == parseInt(vimg.getAttribute("width"))-20)
      	    deltaX = -1;
      	else if (currentY == 0)
      	    deltaY = 1;
      	else if (currentY == parseInt(vimg.getAttribute("height"))-20)
      	    window.alert("DEAD (shocker)");


        //bounce off pad
        else if (intersectRect(ball,paddle))
        	deltaY = -1;    

      	currentX += deltaX;
      	currentY += deltaY;
    };

    id = window.setInterval(bounce,10);
}

var startButton = document.getElementById("start");
startButton.addEventListener("click",startGame);

//////TESTING TESTING
function intersectRect(r1, r2) {
    r1 = r1.getBoundingClientRect();    //BOUNDING BOX OF THE FIRST OBJECT
    r2 = r2.getBoundingClientRect();    //BOUNDING BOX OF THE SECOND OBJECT
 
    //CHECK IF THE TWO BOUNDING BOXES OVERLAP
  return !(r2.left > r1.right || 
           r2.right < r1.left || 
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}

function whichSide(brick, ball){//if 0 don't do anything, if 1 invert the ball's x movement, else invert ball's y movement
    if (!intersectRect(brick, ball)){
        return 0;
    }
    var r1 = brick.getBoundingClientRect();
    var r2 = ball.getBoundingClientRect();
    if (r1.left > r2.right || r1.left < r2.right){
        return 1;
    }else{
        return 2;
    }
}
//go through all of the brick elements
//If whichside returns something other than 0, stop checking and tell that element to delete itself
//If the ball is below a specific Y coordinate, don't even bother running the brick check
