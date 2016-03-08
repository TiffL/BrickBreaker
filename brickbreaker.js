var vimg = document.getElementById("svgimg");
var paddle = document.getElementById('paddle');
var ball = document.getElementById('ball');


var xVal= paddle.getAttribute("x");

var startGame = function(){
  window.addEventListener('keydown', function (e) {
    switch(e.keyCode) {
      case 37: //left
        console.log("37");
        paddle.setAttribute("x",parseInt(xVal)-5);
        if (xVal <= 0) {
          paddle.setAttribute("x","0");
        }
        break;
      case 39: //right
        console.log("39");
        paddle.setAttribute("x",parseInt(xVal)+5);
        if (xVal >= 710) {
          paddle.setAttribute("x","710");
        }
        break;
    }
    xVal = paddle.getAttribute("x");
  }, true);
    moveBall();
};

var moveBall = function(){
    var currentX  = parseInt(ball.getAttribute("x"));
    var currentY  = parseInt(ball.getAttribute("y"));
    var deltaX = 1;
    var deltaY = 1;


    var bounce = function(){
      	ball.setAttribute("x",currentX);
      	ball.setAttribute("y",currentY);
      	vimg.appendChild(ball);


      	if (currentX == 0 || currentX == parseInt(vimg.getAttribute("width")) - parseInt(ball.getAttribute("width")))
      	    deltaX *= -1;
      	else if (currentY == 0 || currentY == parseInt(vimg.getAttribute("height")) - parseInt(ball.getAttribute("height")))
      	    deltaY *= -1;


      	currentX += deltaX;
      	currentY += deltaY;
    };

    id = window.setInterval(bounce,10);
}

var startButton = document.getElementById("start");
startButton.addEventListener("click",startGame);
