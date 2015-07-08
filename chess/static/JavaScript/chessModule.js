var app = angular.module("chessModule", []);


var CHESS_URL = "/chess";

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
     $("div.b111").hide();


     $http.post(CHESS_URL + "/get_opponents/"
        ).success (function(data, status, headers, config) {
        $scope.opponents = data;
        //Тут буду вызывать функцию для проверки вызовов
    }).
    error(function(data, status, headers, config){
        $scope.opponents = "Error, send message to administrator"
    });


    $scope.checkChallenge = function () {
        $http.post(CHESS_URL + "/challenge/get/").success(function (data, status, headers, config) {
            $scope.response_data = data;
            if ($scope.response_data.challenge != "" && $scope.response_data.challenge != $scope.response_data.user) {
                console.log("Y c");
                $("div#challenge_got").show();

            }else {

                //setTimeout($scope.checkChallenge(),10000);

            }
        });
    };


    $scope.checkChallenge();


    $scope.send_challenge = function (eventObj) {
        $scope.challenge_target = eventObj.target.id;


        $http({
            method: 'post',
            url: CHESS_URL + "/challenge/send/",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
                },
            data: { 'target':$scope.challenge_target }
             }).success (function (data, status, headers, config) {

                $scope.response_data = data;

                if ($scope.response_data.status == "Ok") {

                    $("div#challenge_send").show();
                    $("div#load_line").animate({width:"0px",},20000);
                    setTimeout(function () {
                    $("div.b111").hide();
                    $("div#load_line").css({width:"280px",});
                    }, 20000);


                } else {

                    alert ($scope.response_data.status);

                };
              });
    };


});