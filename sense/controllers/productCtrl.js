"use strict";

app.controller("productCtrl", function($scope, $http){
    //title
    $("title").html("产品列表");

    //产品列表
    $scope.getProductList = function(){
        var url = 'http://localhost:63342/sense/json/productList.json';
        $http.post(url).success(function(data) {
            $scope.productList = data.productList;
        });
    };

    //初始化
    $scope.getProductList();
});


