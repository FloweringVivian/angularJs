"use strict";

app.controller("userCtrl", function($scope, $http){

    //title
    $("title").html("用户管理");

    //重置变量
    $scope.searchKey = "";

    //用户列表
    $scope.getUserList = function(){
        var url = 'http://localhost:63342/sense/json/userList.json';
        var param = {
            "searchKey": $scope.searchKey
        };
        $http.post(url, param).success(function(data) {
            $scope.userList = data.userList;
        });
    };

    //全选
    $scope.checkAll = function(){
        $scope.isChecked = !$scope.isChecked;

        angular.forEach($scope.userList, function(value, key) {
            value.isChecked=$scope.isChecked;
        });
    };

    //单选
    $scope.checkOne = function (user) {
        user.isChecked = !user.isChecked;
        $scope.isChecked = true;

        angular.forEach($scope.userList, function (value, key) {
            if (!value.isChecked) {
                $scope.isChecked = false;
            }
        });
    };

    //初始化
    $scope.getUserList();
});


