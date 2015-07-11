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


app.controller ("oppCtrl", function($scope, $http, $timeout) {
     $("div.b111").hide();


     $http.post(CHESS_URL + "/get_opponents/"
        ).success (function(data, status, headers, config) {
        $scope.opponents = data;
        //Тут буду вызывать функцию для проверки принятия вызовов
    }).
    error(function(data, status, headers, config){
        $scope.opponents = "Error, send message to administrator"
    });


    $scope.checkChallenge = function () {
        $http.post(CHESS_URL + "/challenge/get/").success(function (data, status, headers, config) {
            $scope.response_data = data;
            if ($scope.response_data.challenge_t != "" && $scope.response_data.challenge_s != $scope.response_data.user) {
                $("div#challenge_get").show();

            }else {

                $timeout($scope.checkChallenge,2000);

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

                $("div#load_line").css({width:"280px",});
                $scope.response_data = data;

                if ($scope.response_data.status == "Ok") {

                    $scope.checkChallengeAnswerd ($scope.challenge_target);
                    $("div#challenge_send").show();
                    $("div#load_line").animate({width:"0px",},20000);
                    $timeout(function () {
                        $("div.b111").hide();
                        $timeout.cancel($scope.checkChallengeAnswerd);
                    }, 20000);

                } else {

                    alert ($scope.response_data.status);

                };
              });
    };


    $scope.refuseChallenge= function (challengeSender) {

        $http({
            method: 'post',
            url: CHESS_URL + "/challenge/answerd_challenge/",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
                },
            data: { "sender":challengeSender, "operation":"refuse"  }
            });


        $("div#challenge_get").hide();
        $scope.checkChallenge();
    };


    $scope.checkChallengeAnswerd = function (challengeTarget) {

         $http({
            method: 'post',
            url: CHESS_URL + "/challenge/check_answerd/",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
                },
            data: { "target":challengeTarget }
             }).success(function (data, status, headers, config) {

                $scope.answerd = data.answerd;

                if ($scope.answerd == "wait") {

                    $timeout($scope.checkChallengeAnswerd(challengeTarget), 2000);

                }else{

                   $("div.b111").hide();
                   alert($scope.answerd);

                };
             });



    };


    $scope.acceptChallenge = function () {

        $http({
            method: 'post',
            url: CHESS_URL + "/challenge/answerd_challenge/",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
                },
            data: { "sender":challengeSender, "operation":"accept"  }
            });

            $("div#challenge_get").show();

    };

});