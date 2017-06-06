"use strict";

webApp.directive('loadView', [function () {
    return {
        restrict: "E",
        templateUrl: function (elem, attr) {
            return attr.src + '?' + config.version;
        }
    };
}]);

//左侧菜单栏
webApp.directive('leftMenu', [function () {

    function judgeCurrentSelected(currentUrl, _CURRENTMENU_) {
        _.forEach(_CURRENTMENU_.child, function (val) {
            if (val.url && currentUrl.indexOf(val.url) > -1) {
                val.selected = true;
            } else {
                val.selected = false;
                _.forEach(val.child, function (valChild) {
                    if (valChild.url && currentUrl.indexOf(valChild.url) > -1) {
                        val.selected = true;
                    }
                    valChild.pageUrl = valChild.url ? ('.' + valChild.url) : '';
                });
            }
            //图标地址
            val.pageIconUrl = val.iconUrl ? ('common/' + val.iconUrl) : 'common/img/left/sale/khgl.png';
            //是否含有二级菜单
            val.hasChild = val.child && val.child.length > 0 ? true : false;
            //有子菜单的菜单的url会为空，正在建设中的页面(_CURRENTMENU_.constructionUrl)的地址接口也会返回空
            val.pageUrl = val.url ? ('.' + val.url) : (val.hasChild ? '#' : '');
            // //最多5个字限制
            // val.menuName = val.menuName.length > 5 ? val.menuName.substr(0, 5) : val.menuName;
        });
    }

    return {
        restrict: "E",
        templateUrl: 'common/views/module/left.html',
        controller: ['$scope', 'queryMenu', '$element', '$rootScope', '$location', '$route', function ($scope, queryMenu, $element, $rootScope, $location, $route) {
            //点击菜单
            $scope.menuClick = function (url, event) {
                $('.nav-left .menu-link').removeClass('active');
                if ($location.path() == url) {
                    event.preventDefault();
                    $route.reload();
                }
            };

            if (queryMenu.getCurrentMenu()) {
                // 当前页面所属的大类名称(路由中配置的)与上个页面整理的左侧菜单中的大类名称相同，
                // 则不需要再次进行查询整理（为了提高速度）
                if (queryMenu.getCurrTopMenuName() == queryMenu.getCurrentMenu().topMenuName) {
                    $scope._CURRENTMENU_ = queryMenu.getCurrentMenu();
                    judgeCurrentSelected($location.path(), $scope._CURRENTMENU_);
                    return;
                }
            }
            //重新查询，然后整理菜单
            queryMenu.getMenus().then(function (data) {
                $scope._CURRENTMENU_ = data._CURRENTMENU_;
                judgeCurrentSelected($location.path(), $scope._CURRENTMENU_);
            });

        }]
    };
}]);

//顶端大蓝条
webApp.directive('headMain', [function () {
    //获取企业logo
    function getLogo($scope, $resource, user) {
        var resourceLogo = $resource(config.userUrl + 'usersystem/company/getCompanyByCurrentUser/v1');
        var param = {
            commonParam: {
                dataSource: 1,
                interfaceVersion: 0,
                mobileModel: 0,
                mobileSysVersion: 0,
                sourcePage: window.location.pathname,
                sourceSystem: 1
            }
        };
        param.token = user.getToken();
        param.secretNumber = user.getSecret();
        resourceLogo.save(JSON.stringify(param), function (data) {
            if (data.errorCode == "0") {
                //默认为undefined，查询过后如果为空则设置为空字符串（避免再次查询浪费资源）
                if (!data.companyInfo.logoUrl) {
                    $scope.strLogoUrl = data.companyInfo.logoUrl = 'common/img/logo-default.png';
                } else {
                    $scope.strLogoUrl = decodeURIComponent(data.companyInfo.logoUrl + '&token=' + param.token + '&secretNumber=' + param.secretNumber);
                }
                user.setUserInfo(data.companyInfo);
                if (window.isIE9) {
                    $scope.$apply();
                }
            }
        });
    }

    return {
        restrict: "E",
        templateUrl: 'common/views/module/headMain.html',
        controller: ['$scope', 'queryMenu', '$resource', '$location', '$route', 'user', 'oss', function ($scope, queryMenu, $resource, $location, $route, user, oss) {
            //点击菜单
            $scope.menuClick = function (url, event) {
                if ($location.path() == url) {
                    event.preventDefault();
                    $route.reload();
                }
            };

            $scope.userinfo = user.getUserInfo();
            if (!$scope.userinfo.logoUrl) {
                getLogo($scope, $resource, user);
            } else if ($scope.userinfo.logoUrl == 'common/img/logo-default.png') {
                $scope.strLogoUrl = $scope.userinfo.logoUrl;
            } else {
                $scope.strLogoUrl = decodeURIComponent($scope.userinfo.logoUrl + '&token=' + user.getToken() + '&secretNumber=' + user.getSecret());
            }

            $scope.UnReadNum = '';
            $scope.getUnReadNum = (function () {
              // 获取我的消息未读消息数量：
              oss.post('queryMessage', {"UserId": parseInt($scope.userinfo.memberId, 10), "currentPage": 1, "pageSize": 1}, function (data) {
                  if (data.errorCode != 0) {
                      log("错误提示信息：" + data.errorMsg);
                      return;
                  } else if (data.dataSet.data.UnReadNum > 0) {
                    $scope.UnReadNum = data.dataSet.data.UnReadNum;
                  }
              }, 'notify');
            })();

            if (queryMenu.getCurrentMenu()) {
                // 当前页面所属的大类名称(路由中配置的)与上个页面整理的左侧菜单中的大类名称相同，
                // 则不需要再次进行查询整理（为了提高速度）
                if (queryMenu.getCurrTopMenuName() == queryMenu.getCurrentMenu().topMenuName) {
                    $scope._TOPMENU_ = queryMenu.getTopMenus();
                    return;
                }
            }
            //重新查询，然后整理菜单
            queryMenu.getMenus().then(function (data) {
                data._TOPMENU_.sort(function(v1,v2){
                    return v1.menuId - v2.menuId;
                });
                $scope._TOPMENU_ = data._TOPMENU_;
            });

        }]
    };
}]);

//价格权限控制
webApp.directive('pricepower', [function () {
    return {
        restrict: "AE",
        transclude: true,
        scope: {
            "powercode": "@"
        },
        // template: '<div style="display:inline-block;"><ng-transclude ng-if="power"></ng-transclude><span ng-if="!power" style="font-weight:bolder;">***</span></div>',
        template: '<ng-transclude ng-if="power"></ng-transclude><span ng-if="!power">***</span>',
        controller: ['$scope', 'user', function ($scope, user) {
            user.checkButtonPower(function () {

                $scope.power = user.hasBtnPower(config.price[$scope.powercode]);
            })
        }]
    };
}]);