'use strict';

app.service('user', ["$q", '$rootScope', function ($q, $rootScope) {
  var self = this;

  // 取得用户信息
  self.getUserInfo = function () {
    var userInfo = {
      "account": "shiyy@sense.com.cn",
      "userName": "史媛媛",
      "email": "shiyy@sense.com.cn",
      "phone": "13552240366"
    };
    return userInfo;
  };

}]);