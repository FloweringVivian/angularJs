"use strict";

app.directive('userList', [function () {

  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    scope: {
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
    templateUrl: "views/directives/userList.html",
    controller: ['$scope', '$http', '$element', '$timeout', function ($scope, $http, $element, $timeout) {
      $scope.pageSize = 10;
      $scope.currentPage = 1;
      $scope.totalPage = 0;

      $scope.selectAll = (angular.isString($scope.all) && $scope.all.toLocaleLowerCase() == "true") ? true : false;
      $scope.selectEmpty = (angular.isString($scope.empty) && $scope.empty.toLocaleLowerCase() == "true") ? true : false;
      $scope.isMulti = (angular.isString($scope.multi) && $scope.multi.toLocaleLowerCase() == "false") ? false : true;
      $scope.isDropdown = (angular.isString($scope.dropdown) && $scope.dropdown.toLocaleLowerCase() == "false") ? false : true;
      if (angular.isString($scope.readonly) && $scope.readonly.toLocaleLowerCase() == "true") {
        $element.find('.dropdown-toggle > input').attr("readonly", "readonly");
      }

      $scope.$watch('disabled', function (nv, ov) {
        if (angular.isString($scope.disabled) && ($scope.disabled.toLocaleLowerCase() == "true" || $scope.disabled.toLocaleLowerCase() == "disabled")) {
          $element.find('.dropdown-toggle').addClass("disabled");
        } else {
          $element.find('.dropdown-toggle').removeClass("disabled");
        }
      });

      $scope.$watch('defval', function (nv, ov) {
        if (!(nv)) {
          return;
        }
        var url = 'http://localhost:63342/sense/json/userList.json';
        var param = {
          "searchKey": $scope.searchKey,
          "currentPage": $scope.currentPage,
          "pageSize": $scope.pageSize
        };
        $http.post(url, param).success(function (data) {

          $scope.userList = data.userList;

          angular.forEach($scope.userList, function (val) {

            if (val.id == nv) {
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
        if (angular.isFunction($scope.onBlur)) {
          $scope.onBlur($scope.value);
        }
      };

      // 取得资料
      var queryData = function () {
        $scope.list = [];
        var url = 'http://localhost:63342/sense/json/userList.json';
        var param = {
          "searchKey": $scope.searchKey,
          "currentPage": $scope.currentPage,
          "pageSize": $scope.pageSize
        };
        $http.post(url, param).success(function (data) {
          //log(data, 'B01_findCustomerList');
          $scope.userList = data.userList;
          $scope.totalPage = parseInt(data.totalPage ? data.totalPage : 1);
        });
      };

      // 点击下方选择button
      $scope.selectBtn = function (item) {
        $scope.oldvalue = $scope.value;
        $scope.value = item;
        $scope.name = item.userName;

        if (angular.isFunction($scope.onChange)) {
          $timeout($scope.onChange);
        }
        $element.find('.modal').modal("hide");
      }

      // 选择单一个
      $scope.select = function (item) {
        $scope.oldvalue = $scope.value;
        $scope.value = item;
        $scope.name = item.userName;
      };

    }]
  };
}]);