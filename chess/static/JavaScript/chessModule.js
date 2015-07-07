var app = angular.module("chessModule", []);

var CHESS_URL = "http://127.0.0.1:8000/chess";
var CHESS_URL2 = "/chess";

app.controller("coordCtrl", function($scope) {
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
    }
    
    
    $scope.moveFigure = function (eventObj) {
        if ( $scope.csFig.xPos != 0 && $scope.csFig.yPos !=0 && $scope.csFig.id != ''){
            
            
             $("img#" + $scope.csFig.id).animate ({left: $scope.getPosition(eventObj).x + 'px',
                                                  top: $scope.getPosition(eventObj).y + 'px'
                    });
            
            //angular.element($scope.getEl($scope.csFig.id)).css({left: $scope.getPosition(eventObj).x + 'px',
                                               // top: $scope.getPosition(eventObj).y + 'px'
                                                //});
            $scope.getEl($scope.csFig.id).className = "figure";
            $scope.csFig = { id:"" , xPos:0, yPos:0 };
        }else{
            return false;
        }
        
        //Обнулить значение выбраной фигуры 
    }
    
});


app.controller ("oppCtrl", function($scope, $http) {
     alert("oppCtrl!");
     $scope.opponents = {};
     $http.post(CHESS_URL2 + "/get_opponents/","js_request"

        ).success (function(data, status, headers, config) {
        alert("succes");
        $scope.opponents = data;
    });

});