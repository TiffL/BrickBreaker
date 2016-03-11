var vimg = document.getElementById("svgimg");
var paddle = document.getElementById('paddle');
var ball = document.getElementById('ball');
var score = 0;
var id;

var xVal= paddle.getAttribute("x");
var yVal = paddle.getAttribute("y");

var startGame = function(){
  window.addEventListener('keydown', function (e) {
    switch(e.keyCode) {
      case 37: //left
        paddle.setAttribute("x",parseInt(xVal)-10);
        if (xVal <= 0) {
          paddle.setAttribute("x","0");
        }
        break;
      case 39: //right
        paddle.setAttribute("x",parseInt(xVal)+10);
        if (xVal >= 715) {
          paddle.setAttribute("x","715");
        }
        break;
    }
    xVal = paddle.getAttribute("x");
  }, true);
    moveBall();
};

var numBricks = 10;  //total number of bricks in row
var numRows = 6;
var onScreenBricks = numBricks*numRows; //total number of bricks on screen

var brickSetup = function(){
    var vimgWidth = parseInt(vimg.getAttribute("width"));
    var rowsLeft = numRows;
    while (rowsLeft > 0){
	var bricksLeft = numBricks;
	while (bricksLeft > 0){
    	    var brick = document.createElementNS("http://www.w3.org/2000/svg","rect");
    	    brick.setAttribute("x",(numBricks-bricksLeft)*(vimgWidth/numBricks)+5);
    	    brick.setAttribute("y",(numRows-rowsLeft)*30);
	    brick.setAttribute("rx",8);
    	    brick.setAttribute("width",(vimgWidth/numBricks)-10);
    	    brick.setAttribute("height",25);
    	    brick.setAttribute("fill","red");
    	    brick.setAttribute("stroke","black");
    	    vimg.appendChild(brick);
    	    bricksLeft -= 1;
	}
	rowsLeft -= 1;
    }
};
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

	if (onScreenBricks == 0){
	    clearInterval(id);
	    window.alert("Yay! You've won! \n Your Score is:" + score);
	}

        //bounce off walls
      	if (currentX == 0)
      	    deltaX *= -1;
      	else if (currentX == parseInt(vimg.getAttribute("width"))-20)
      	    deltaX *= -1;
      	else if (currentY == 0)
      	    deltaY *= -1;
      	else if (currentY == parseInt(vimg.getAttribute("height"))-20){
	    	clearInterval(id);
      	    window.alert("DEAD (shocker) \n Score:" + score);
		}

        //bounce off pad
        else if (intersectRect(ball,paddle))
        	deltaY *= -1;  

        //Brick Bouncing
        var bricks = document.getElementsByTagName("rect");
        for (i = 0; i<bricks.length; i++){
        	if (whichSide(bricks[i], ball) == 1){
        		deltaY*=-1;
        		bricks[i].parentNode.removeChild(bricks[i]);
        		score += 10;
		        onScreenBricks -= 1;
        		break;
        	}else if (whichSide(bricks[i], ball) == 2){
        		deltaX*=-1;
        		bricks[i].parentNode.removeChild(bricks[i]);
        		score += 10;
		        onScreenBricks -= 1;
        		break;        		
        	}
        }
        //Still testing

      	currentX += deltaX;
      	currentY += deltaY;
      	document.getElementById("score").innerHTML = score;
    };
    id = window.setInterval(bounce,10);
}

var startButton = document.getElementById("start");
startButton.addEventListener("click",startGame);

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
    if (r1.right > r2.left || r1.left < r2.right){
        return 1;
    }else if (r1.top > r2.bottom || r1.bottom < r2.top){
        return 2;
    }
}
//go through all of the brick elements
//If whichside returns something other than 0, stop checking and tell that element to delete itself
//If the ball is below a specific Y coordinate, don't even bother running the brick check
