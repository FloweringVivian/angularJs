"use strict";

var app = angular.module('app.filters', []);

//多语言过滤器
webApp.filter("T", ['$translate', function($translate) {
    return function(word, key) {
        //优先处理key值
        if (key) {
            return $translate.instant(key);
        } else {
            return $translate.instant(word);
        }
    };
}]);

webApp.filter('range', [function() {
    return function(input) {
        var ret = [];
        var total = parseInt(input);
        for (var i = 0; i < total; i++)
            ret.push(i);
        return ret;
    };
}]);

webApp.filter('zcurrency', ["$filter", function($filter) {
    var currencyList = {
        "CN": { "symbol": "￥", "fractionSize": "2" },
        "US": { "symbol": "$", "fractionSize": "2" }
    };

    return function(currency, type) {
        return $filter('currency')(currency, currencyList[type].symbol, currencyList[type].fractionSize);
    };
}]);

//大 分页
webApp.filter('paginateBig', [function() {
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
    /*return function (pagesize, current, showpage) {
     var ret = [];
     var half = parseInt(showpage/2);
     var min = parseInt(current - half);
     if(min < 1) {
     min = 0;
     }
     var max = parseInt(min + showpage);
     if(max > pagesize) {
     max = pagesize;
     min = ((max - showpage) > 0)?(max-showpage):0;
     }
     for (var i=min; i<max; i++)
     ret.push(i);
     return ret;
     }  */
}]);

//小数转百分数
webApp.filter('turnPercent', [function() {
    return function(num) {
        num = num ? num : 0;
        return (Math.round(num * 10000) / 100).toFixed(2) + '%';
    };
}]);

webApp.filter('min', [function() {
    return function(input, param) {
        var v1 = parseInt(input);
        var v2 = parseInt(param);

        if (v1 < v2) {
            return v1;
        } else {
            return v2;
        }
    };
}]);

webApp.filter('max', [function() {
    return function(input, param) {
        var v1 = parseInt(input);
        var v2 = parseInt(param);

        if (v1 > v2) {
            return v1;
        } else {
            return v2;
        }
    };
}]);

// //根据平台币种格式化单价或金额
// webApp.filter('fmcurrency', ["$filter", "user", function ($filter, user) {
//     var userInfo = user.getUserInfo();
//
//     //获取所有平台币种及小数位的接口（不分页）
//     function queryPlatformCurrency() {
//         var param = {
//             "serviceId": "B01_queryAllPlatformCurrency"
//         };
//         param.commonParam = commonParam();
//         param.token = user.getToken();
//         param.secretNumber = user.getSecret();
//         $.ajax({
//             type: "POST",
//             url: config.serviceUrl,
//             async: false,
//             data: {"param": JSON.stringify(param)},
//             success: function (response) {
//                 if (!response.success) {
//                     return;
//                 }
//                 user.setUserInfo({platformCurrencyList: response.platformCurrencyList});
//             }
//         });
//     }
//
//     if (!userInfo.platformCurrencyList) {
//         queryPlatformCurrency();
//     }
//     /*
//      * type=aumount:金额，price:单价
//      * currencycode=币种编码
//      * no_show_symbol=（bool值，控制是否显示币种符号）
//      * */
//     return function (currency, type, currencycode, no_show_symbol) {
//         var userInfo = user.getUserInfo(),
//             decimalNum,
//             currencySymbol = '';//币种符号
//         _.forEach(userInfo.platformCurrencyList, function (val, key) {
//             if (val.currencyCode == currencycode) {
//                 currencySymbol = val.currencySymbol;
//                 //aumount:金额，price:单价
//                 if (type == 'price') {
//                     //格式化单价
//                     decimalNum = val.priceDecimalNum;
//                 } else {
//                     //格式化金额
//                     decimalNum = val.amountDecimalNum;
//                 }
//                 return false;
//             }
//         });
//         decimalNum = (decimalNum > 0 || decimalNum === 0) ? decimalNum : 2;
//         if (no_show_symbol) {
//             currencySymbol = '';
//         }
//         currency = parseFloat(currency);
//         currency = currency ? currency : 0;
//         return currencySymbol + currency.toFixed(decimalNum);
//         // return $filter('currency')(currency, currencySymbol, decimalNum);
//     };
// }]);


//根据单位格式化数量
webApp.filter('fmnumber', ["$filter", "user", function($filter, user) {
    var companyId = user.getCompanyId();
    var arrUnitList;
    var decimalNum;
    var commonUnitDecimal = -1; //通用小数位
    var hasFirstLoad = false; //是否已经查询过数据

    //获取企业所有单位（必须含是否允许小数字段，不分页）
    function queryAllUnit() {
        var param = {
            "serviceId": "B01_queryAllUnit",
            "companyId": companyId,
            "commonParam": commonParam(),
            "token": user.getToken(),
            "secretNumber": user.getSecret()
        };
        $.ajax({
            type: "POST",
            url: config.serviceUrl,
            async: false,
            data: { "param": JSON.stringify(param) },
            success: function(response) {
                if (!response.success) {
                    return;
                }
                arrUnitList = response.unitList;
            }
        });
    }
    //查询通用小数位（OSS接口）
    function queryCommonDecimal() {
        var param = {
            "content": {
                "header": {
                    "key": "",
                    "module": "",
                    "operator": ""
                },
                "body": {
                    "method": "sysParamMgr",
                    "commonParam": commonParam(),
                    "data": { action: "query" }
                }
            }
        };
        $.ajax({
            type: "POST",
            url: config.ossConfigUrl,
            async: false,
            dataType: 'json',
            data: JSON.stringify({ "params": param }),
            success: function(response) {
                if (response.dataSet.header.code == 0) {
                    _.forEach(response.dataSet.data.detail, function(dval) {
                        if (dval.ParamKey == 'UnitDecimal') {
                            // 通用小数位
                            commonUnitDecimal = parseInt(dval.ParamValue);
                            return false;
                        }
                    });
                }
            }
        });
    }

    //默认只查询一次，如果公司变了则再次查询（提高速度）
    if (!hasFirstLoad || (companyId != user.getCompanyId())) {
        hasFirstLoad = true;
        companyId = user.getCompanyId();
        queryAllUnit();
    }
    return function(number, unitcode) {
        if (!unitcode) {
            decimalNum = 4;
        } else {
            _.forEach(arrUnitList, function(val, key) {
                if (val.unitCode == unitcode) {
                    //是否允许小数位
                    if (val.isDecimalNum) {
                        //不存在(通用)小数位
                        if (commonUnitDecimal == -1) {
                            queryCommonDecimal();
                        }
                        decimalNum = commonUnitDecimal;
                    } else {
                        //整数的时候默认为0
                        decimalNum = 0;
                    }
                }
            });
        }
        decimalNum = Number(decimalNum) >= 0 ? decimalNum : 4;
        number = parseFloat(number);
        number = number ? number : 0;
        return number.toFixed(decimalNum);
        // return $filter('number')(number, decimalNum);
    };
}]);

/* format product price */
webApp.filter('productPrice', function() {
    return function(input, part) {
        var price = '0',
            main = '0',
            sub = '';
        if (!isNaN(parseInt(input, 10))) {
            price = input.toString();
        }
        if (price.length <= 3) {
            main = price;
        } else {
            main = price.slice(0, -3);
            sub = price.slice(-3);
        }

        if (part === 'main') {
            return main;
        } else if (part === 'sub') {
            return sub;
        }
        return price;
    };
});

webApp.filter('trustHtml', function($sce) {

    return function(input) {

        return $sce.trustAsHtml(input);

    }

});
