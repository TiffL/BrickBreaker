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

};


//to change to circle
var circle = function(){
    var currentX  = (picWidth-logoWidth)/2;
    var currentY  = (picHeight-logoHeight)/2;
    var deltaX = 1;
    var deltaY = 1;


    var bounce = function(){
      while (pic.childElementCount > 0){
      	    pic.removeChild(pic.children[0]);
      	}


      	var logo = document.createElementNS("http://www.w3.org/2000/svg","rect");
      	logo.setAttribute("x",currentX);
      	logo.setAttribute("y",currentY);
      	logo.setAttribute("width",logoWidth);
      	logo.setAttribute("height",logoHeight);
      	pic.appendChild(logo);


      	if (currentX == 0)
      	    deltaX = 1;
      	else if (currentX == picWidth-logoWidth)
      	    deltaX = -1;
      	else if (currentY == 0)
      	    deltaY = 1;
      	else if (currentY == picHeight-logoHeight)
      	    deltaY = -1;


      	currentX += deltaX;
      	currentY += deltaY;
    };

    id = window.setInterval(bounce,10);
}

var startButton = document.getElementById("start");
startButton.addEventListener("click",startGame);
