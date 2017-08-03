"use strict";

app.controller("userCtrl", function($scope, $http){

    //title
    $("title").html("用户管理");

    //重置变量
    $scope.searchKey = "";
    $scope.currentPage = 1;
    $scope.pageSize = 10;

    //用户列表
    $scope.getUserList = function(){
        var url = 'http://localhost:63342/sense/json/userList.json';
        var param = {
            "searchKey": $scope.searchKey,
            "currentPage": $scope.currentPage,
            "pageSize": $scope.pageSize
        };
        $http.post(url, param).success(function(data) {
            if($scope.currentPage == 1){
                $scope.userList = data.userList;
            }else{
                $scope.userList = data.userList2;
            }
            $scope.totalPage = data.totalPage;
            $scope.totalCount = data.totalCount;
        });
    };

    //添加用户
    $scope.addUser = function(){
        console.log(JSON.stringify($scope.labelList));
        console.log(JSON.stringify($scope.typeList));
        var userJson = {
            "id": "10000111",
            "userName": $scope.userName,
            "email": $scope.email,
            "phone": $scope.phone,
            "address": $scope.address,
            "remark": $scope.remark
        };
        $scope.userList.unshift(userJson);
        $("#newUser").modal("hide");
    };

    //添加用户时用户标签
    $scope.labelList = [{"value": "normal"},{"value": "vip"}];
    $scope.addLabel = function(){
        $scope.labelList.push({"value": ""});
    };

    //查看用户
    $scope.viewUserInfo = function(user){
        $scope.userOne = user;
    };

    //删除用户
    $scope.delUser = function(user){
        var idx = $scope.userList.indexOf(user);
        $scope.userList.splice(idx, 1);
    };

    //批量删除用户
    $scope.batchDelUser = function(){
        for (var i = $scope.userList.length - 1; i >= 0; i--) {
            if ($scope.userList[i].isChecked) {
                $scope.userList.splice(i, 1);
            }
        }
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

    //分页
    $scope.goPage = function( num ){
        num = parseInt(num);
        var re = /^[1-9]+[0-9]*]*$/;
        if( !re.test(num) ){
            //log("页码不是整数");
            return;
        }
        if( num <1 || num >$scope.totalPage ){
            //log("页码超出");
            return;
        }
        $scope.currentPage = num;

        $scope.isChecked = false;
        $scope.getUserList();
    };

    //初始化
    $scope.getUserList();
});


