"use strict";

app.controller("homeCtrl", ["$scope", "user", function($scope, user){
    //title
    $("title").html("首页");

    var info = user.getUserInfo();
    $scope.headUserName = info.userName;
}]);


