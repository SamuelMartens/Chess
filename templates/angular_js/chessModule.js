var app = angular.module("chessModule", []);

app.controller("coordCtrl", function($scope){
    $scope.csFig = { id:"" , xPos:0, yPos:0 };
    
    
    $scope.getEl = function (id) {
        return (document.getElementById(id));
    }
    
    
    $scope.getPosition =   function (eventObj) {
    var xPosition = 0;
    var yPosition = 0;
    var element = $scope.getEl(eventObj.target.id);
  
    while(element) {
        xPosition += (element.offsetLeft + element.clientLeft);
        yPosition += (element.offsetTop + element.clientTop);
        element = element.offsetParent;
    }
    //alert ("Element coord " + xPosition + "," + yPosition);
    return { x: xPosition, y: yPosition };
    }
    
    
    $scope.chooseFigure = function (eventObj) {
        $scope.csFig.xPos = $scope.getPosition(eventObj).x;
        $scope.csFig.yPos = $scope.getPosition(eventObj).y;
        $scope.csFig.id = eventObj.target.id;
        $scope.getEl($scope.csFig.id).className = "figure_a";
        //alert("Figure coord is " + $scope.csFig.xPos + "," + $scope.csFig.yPos);               
    }
    
    $scope.moveFigure = function (eventObj) {
        //angular.element($scope.getEl($scope.csFig.id)).css({left: $scope.getPosition(eventObj).x,
                                               //top: $scope.getPosition(eventObj).y
                                              //});
        $scope.getEl($scope.csFig.id).style.left = $scope.getPosition(eventObj).x + "px";
        $scope.getEl($scope.csFig.id).style.top = $scope.getPosition(eventObj).y + "px";
        $scope.getEl($scope.csFig.id).className = "figure";
    }
    
});