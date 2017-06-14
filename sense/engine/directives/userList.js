"use strict";

app.directive('userList', [function () {

  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    scope: {
      "companyid": "=",
      "value": "=",
      "oldvalue": "=",
      "defval": "=",
      "name": "=",
      "readonly": "@",
      "all": "@",
      "empty": "@",
      "multi": "@",
      "dropdown": "@",
      "onBlur": "&",
      "onChange": "&",
      "disabled": "@"
    },
    templateUrl: "common/views/module/input/customer.html",
    controller: ['$scope', 'rest', '$element', '$timeout', function ($scope, rest, $element, $timeout) {
      $scope.pageSize = config.windowPageSize;
      $scope.currentPage = 1;
      $scope.totalPage = 0;

      $scope.selectAll = (_.isString($scope.all) && $scope.all.toLocaleLowerCase() == "true") ? true : false;
      $scope.selectEmpty = (_.isString($scope.empty) && $scope.empty.toLocaleLowerCase() == "true") ? true : false;
      $scope.isMulti = (_.isString($scope.multi) && $scope.multi.toLocaleLowerCase() == "false") ? false : true;
      $scope.isDropdown = (_.isString($scope.dropdown) && $scope.dropdown.toLocaleLowerCase() == "false") ? false : true;
      if (_.isString($scope.readonly) && $scope.readonly.toLocaleLowerCase() == "true") {
        $element.find('.dropdown-toggle > input').attr("readonly", "readonly");
      }

      $scope.$watch('disabled', function (nv, ov) {
        if (_.isString($scope.disabled) && ($scope.disabled.toLocaleLowerCase() == "true" || $scope.disabled.toLocaleLowerCase() == "disabled")) {
          $element.find('.dropdown-toggle').addClass("disabled");
        } else {
          $element.find('.dropdown-toggle').removeClass("disabled");
        }
      });

      $scope.$watch('defval', function (nv, ov) {
        if (!(nv)) {
          return;
        }

        rest.get('B01_findCustomerList', {
          "companyId": $scope.companyid,
          "pageSize": $scope.pageSize,
          "currentPage": $scope.currentPage,
          "customerKey": ""
        }, function (data) {
          //log(data, 'B01_findCustomerList');
          $scope.customerList = data.customerList;

          _.forEach($scope.customerList, function (val) {

            if (val.customerId == nv) {
              $scope.select(val);
            }
          });
        });


      });

      // 开窗
      $scope.openWin = function () {
        queryData();
        $element.find('.modal').modal({});
      };

      // 当输入框blur时，触发onBlur
      $scope.inputBlur = function () {
        if (_.isFunction($scope.onBlur)) {
          $scope.onBlur($scope.value);
        }
      };

      // 搜索
      var keybak = "";
      $scope.search = function () {
        if ($scope.searchkey == keybak) return;
        keybak = $scope.searchkey;

        $scope.currentPage = 1;
        queryData();
      };

      // 换页
      $scope.goPage = function (pageNum) {
        pageNum = parseInt(pageNum);
        if (isNaN(pageNum) || pageNum > $scope.totalPage || pageNum < 1) return;

        $scope.currentPage = pageNum;
        queryData();
      };

      // 取得资料
      var queryData = function () {
        $scope.list = [];
        rest.get('B01_findCustomerList', {
          "companyId": $scope.companyid,
          "pageSize": $scope.pageSize,
          "currentPage": $scope.currentPage,
          "customerKey": keybak
        }, function (data) {
          //log(data, 'B01_findCustomerList');
          $scope.customerList = data.customerList;

          $scope.totalPage = parseInt(data.totalPage ? data.totalPage : 1);

          _.forEach($scope.customerList, function (val) {
            if (selectTemp["key" + val.id]) {
              val.sel = true;
            }
          });
        });
      };

      // 点选单个checkbox
      var selectTemp = {};
      $scope.oncheck = function (item) {
        $scope.selAll = true;
        _.forEach($scope.customerList, function (val) {
          if (!val.sel) {
            $scope.selAll = false;
          }
        });
        if (item.sel) {
          selectTemp["key" + item.id] = item;
        } else {
          delete selectTemp["key" + item.id];
        }
      };
      // 点选全选的checkbox
      $scope.checkAll = function (sel) {
        _.forEach($scope.customerList, function (val) {
          val.sel = sel;
          if (val.sel) {
            selectTemp["key" + val.id] = val;
          } else {
            delete selectTemp["key" + val.id];
          }
        });
      };

      // 点击下方选择button
      $scope.selectBtn = function (item) {
        $scope.oldvalue = $scope.value;
        if (item) {
          $scope.value = item;
          $scope.name = item.buyCompName;
        } else {
          var temp = [];
          _.forEach(selectTemp, function (val) {
            if (val.sel) {
              temp.push(val);
            }
          });
          $scope.value = temp;
        }
        if (_.isFunction($scope.onChange)) {
          $timeout($scope.onChange);
        }
        $element.find('.modal').modal("hide");
      }

      // 选择单一个
      $scope.select = function (item) {
        $scope.oldvalue = $scope.value;
        $scope.value = item;
        $scope.name = item.buyCompName;
      };

      // 下拉选单选择全部
      $scope.select_all = function (e) {
        // 未实现
      };

      // 下拉选择空
      $scope.select_empty = function () {
        $scope.value = "";
        $scope.name = "";
      };
      // 只能输入正数
      $scope.mustPlus = function () {
        if (!$scope.pageNum) {
          $scope.pageNum = 1;
          return;
        }
        if (isNaN($scope.pageNum * 1)) {
          $scope.pageNum = 1;
          return;
        }
        if ($scope.pageNum < 1) {
          $scope.pageNum = 1;
          return;
        }
      };

      // 输入框内容变更时
      //var oldName;
      $scope.change = function (e) {

        // 没对应的接口
        // if (_.trim($scope.name) == "") {
        //     $scope.list = $scope.response;
        //     return;
        // }
        //
        // if ($scope.name == oldName) return;
        //
        // var self = $(e.target);
        // var parent = self.parent().parent();
        // parent.addClass("open");
        //
        // oldName = $scope.name;
        //
        // $scope.list = [];
        // rest.get('B01_getVendorInfoByCode', {
        //     "companyId": $scope.companyid,
        //     "vendorKey": $scope.name
        // }, function (data) {
        //     //log(data, 'B01_getVendorInfoByCode');
        //     $scope.list = data.customerList;
        // });
      };
    }]
  };
}]);