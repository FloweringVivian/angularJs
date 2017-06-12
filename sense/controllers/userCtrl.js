"use strict";

app.controller("userCtrl", function($scope, $http){
    var url = 'http://localhost:63342/sense/json/userList.json';
    $http.get(url, {"userName": ""}).success(function(data) {
        $scope.userList = data.userList;
    });
});


