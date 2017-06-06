"use strict";

webApp.register.controller("testCtrl", ['$q', '$scope', '$rootScope', '$routeParams','urest', 'enumService','user','$location','$translate', function($q, $scope, $rootScope, $routeParams, urest, enumService, user,$location,$translate){
    console.log('in test ctrl');
    //log(id, "id:");
    //判断登录
    if( !user.isLogin() ){
        $location.url("login");
    }

    $scope.switching = function(lang){
        $translate.use(lang);
        window.localStorage.lang = lang;
        window.location.reload();
    };
    $scope.cur_lang = $translate.use();


    $scope.num=12144455666666.63413265654;
    $scope.tprice='price';
    $scope.tcode='CNY';
    // $scope.changedata=function () {
    //     $scope.num=9999999.4545444444633333;
    //     $scope.tprice='amount';
    //     $scope.tcode='USD';
    // };

    $scope.num1=9999999.4543414244633333;
    $scope.tcode1='CM';
    // $scope.changedata1=function () {
    //     $scope.num1=9999999.4545444444633333;
    //     $scope.tcode1='CB';
    // };
    

    // 设定 title 如果是数字，则查询枚举表；如果不是数字，则直接赋值给title
    user.setPageTitle("这是测试页");
    
    //定义当前模块  我的采购:mypurchase   企业管理:businessmanage 我的销售:mysale
    $rootScope.curModule = "mypurchase";
    
    var promise = enumService.getValue('B01_MemberType', "1");
    promise.then(function(data) {
        //alert(data);
    });
    
    log($routeParams, "route:");
    
    $scope.enumv = "test enumv";
    
    $scope.rows = "2";
    
    $scope.cmid = ['10000008'];
    $scope.cmid2 = '10000001';
    $scope.cvid = "100001000000025";
    $scope.ccid = "100001000000009";
    $scope.salecompcode = "v002";
    $scope.prodid = "100001000000016";
    $scope.vendorid = "10000002";
    
    $scope.compabbr = "vera02";
    $scope.compcode = "v002";
    $scope.changeCompany = function(){
        $scope.cmid2 = ($scope.cmid2 == '10000002')?'10000001':'10000002';
    };
    
    $scope.timeChange = function(){
        alert($scope.itime);
        var d = new Date($scope.itime);
        $scope.timeText = d.getTime();
    }
    
    $scope.callback = function(t1, t2, t3){
        log(t1, "t1=======================");
        log(t2, "t2=======================");
        log(t3, "t3=======================");
    }

    $scope.strCurrency = 519746.21354667;
    $scope.strNumber = 87867.367891;
}]);

