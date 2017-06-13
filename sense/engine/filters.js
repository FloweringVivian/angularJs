'use strict';

/* Filters */

//分页
app.filter('paginateBig', [function() {
  return function(tatal, current) {
    var ret = [];
    var min = current - 4;
    var max = current + 3;
    if (min < 0) {
      min = 0;
    }
    if (max > tatal) {
      max = tatal;
    }
    for (var i = min; i < max; i++)
      ret.push(i);
    return ret;
  };
}]);

//小数转百分数
app.filter('turnPercent', [function() {
  return function(num) {
    num = num ? num : 0;
    return (Math.round(num * 10000) / 100).toFixed(2) + '%';
  };
}]);