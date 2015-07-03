$(document).ready(function () {

    $("#w_king").click(function () {
    $(this).hide();
    alert("sss")
        });
    function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft + element.clientLeft);
        yPosition += (element.offsetTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

var myElement = document.getElementById("1,1"); 
var position = getPosition(myElement);
alert("The image is located at: " + position.x + ", " + position.y);

    
});


