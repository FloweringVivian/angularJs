"use strict";

app.controller("myCtrl", ["$scope", "user", function($scope, user){
    //title
    $("title").html("个人中心");

    $scope.userInfo = user.getUserInfo();

}]);


