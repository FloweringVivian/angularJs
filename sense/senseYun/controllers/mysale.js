"use strict";

webApp.register.controller("mySaleCtrl", [ '$scope','user','$location','$rootScope','urest','rest','oss', function( $scope, user, $location,$rootScope,urest,rest,oss ){
    //判断登录
    if (!user.isLogin()) {
        zhlModalTip("您未登录或登录超时，请登录后操作！",function(){
            $location.path("login");
            $scope.$apply();
        });
        return;
    }
    // 设定 title “销售工作台”
    user.setPageTitle(78);

    $scope._ = _;

    //获取用户的相关信息
    $scope.userInfo = user.getUserInfo();

    //获取所属公司列表（初始化）
    $scope.companyIdList = [];
    $scope.getCompanyId = function(){
        urest.get('usersystem/authority_management/getDataAuthCompByMember/v1', {"memberId": parseInt( $scope.userInfo.memberId ) }, function (data) {
            _.forEach(data.companyAuthSet, function (val, key) {
                $scope.companyIdList.push(val.companyId);
            });
            $scope.getBillCount();
            $scope.getSaleOrder();
        });
    }
    $scope.getCompanyId();

    //根据用户权限获取销售工作台单据数量及总量
    $scope.getBillCount = function(){
        rest.get("B01_soWorkbenchBillCount", {"companyId":$scope.companyIdList}, function(data){
            if(!data.success){
                //log( "错误提示信息："+data.errorMsg );
                return;
            }
            $scope.billCount = data.resultMap; 
        });
    };
    //   销售工作台待接收和待答交客户订单
    $scope.getSaleOrder = function(){
        rest.get("B01_soWorkbenchByStatus", {"companyId":$scope.companyIdList,"lineCount":"6"}, function(data){
            if(!data.success){
                //log( "错误提示信息："+data.errorMsg );
                return;
            }
            $scope.soList = data.soList;
        });
    };

    // 获取我的消息未读消息数量：
    oss.post('queryMessage', {"UserId": parseInt($scope.userInfo.memberId),"currentPage": 1,"pageSize": 100}, function (data) {
        if(data.errorCode != 0){
            //log("错误提示信息：" + data.errorMsg);
            return;
        }
        $scope.myMasTotalNum = data.dataSet.data.TotalNum;
    }, 'notify');
    //查询消息类型列表
    $scope.systemList = [];
    oss.post('messageTypeMgr', {"action": "query"}, function (data) {
        if(data.errorCode != 0){
            //log("错误提示信息：" + data.errorMsg);
            return;
        }
        angular.forEach(data.dataSet.data.detail,function(val){
            $scope.systemList[val.TypeId] = val.TypeName;
        });
        $scope.getCustomerNotify();
    }, 'config');

    // 获取客户通知
    $scope.getCustomerNotify = function(){
        oss.post('queryMessage', {"UserId": parseInt($scope.userInfo.memberId),"currentPage": 1,"pageSize": 3,'inviteType':1}, function (data) {
            if(data.errorCode != 0){
                //log("错误提示信息：" + data.errorMsg);
                return;
            }
            _.forEach(data.dataSet.data.detail,function(val){
                val.TypeName = $scope.systemList[val.TypeId];
            });
            $scope.customerNotify = data.dataSet.data;
        }, 'notify');
    };

    //根据登录名获取用户详细信息包含头像
    urest.get('usersystem/company/getUserInfoByAccount/v1', {}, function (data) {
        if( data.errorCode != "0"){
            //log( "获取头像失败"+data.errorMsg );
            return;
        }    
        $scope.userInfoDetail = data.userInfo;
    });

    //接收订单
    $scope.receiveOrder = function ( item ) {
        if( _.isEmpty(item) ){
            return;
        }
        //参数不全 待添加
        zhlModalTip('您确定要接收订单吗？', function () {
            var param = {
                "serviceId": "B03_vendorReceivePoAnswer",
                "poAnswerId": item.id,
                "companyId": item.customerId,
                "vendorId": item.companyId
            };
            rest.get(param.serviceId, param, function (data) {
                if(!data.success){
                    //log( "错误提示信息："+data.errorMsg );
                    zhlModalTip( "错误提示信息："+data.errorMsg );
                    return;
                }
                zhlModalTip("接收成功",function(){location.reload();});
            });
        }, function () {});     
    };

    //拒绝订单
    $scope.refuseOrder = function ( item ) {
        if( _.isEmpty(item) ){
            return;
        }
        zhlModalTip('您确定要拒绝接单吗？拒绝后的订单，将不能恢复。', function () {
            var param = {
                "serviceId": "B03_vendorRefuseReceivePoAnswer",
                "poAnswerId": item.id,
                "vendorId": item.companyId
            };
            rest.get(param.serviceId, param, function (data) {
                if(!data.success){
                    //log( "错误提示信息："+data.errorMsg );
                    zhlModalTip( "错误提示信息："+data.errorMsg );
                    return;
                }
                zhlModalTip("拒绝成功",function(){location.reload();});
            });
        }, function () {}); 
    };

    //员工停用
    urest.get('usersystem/login/get_employee_status/v1', {}, function (data) {
                // alert(user.getToken());`
            if(data.errorCode == "03128"){
                sessionStorage.hasIntro = true;
                if(_.isEmpty(data.time)){
                    zhlModalTip("该员工已被停用","","","温馨提示");
                }else{
                    zhlModalTip("您的账号已被停用,请在个人中心>>我的消息>>企业消息下查看详细","","","温馨提示");
                }
            }
        });        


    //拼接下载地址
    $scope.getDownLoadUrl = function (fileUrl) {
        return decodeURIComponent(fileUrl) + "&token=" + user.getToken() + "&secretNumber=" + user.getSecret();
    };
}]);


