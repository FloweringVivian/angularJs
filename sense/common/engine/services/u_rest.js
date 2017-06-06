"use strict";

webApp.service('urest', ["user", "$resource", "$location", "$rootScope", function (user, $resource, $location, $rootScope) {
    this.get = function (route, param, callback, type) {
        var url = config.userUrl;
        if (type == 'IM') {
            url = config.imUrl;
        } else if (type == 'trans') {
            url = config.transUrl;
        }
        var rest = $resource(url + route);

        param.commonParam = commonParam();
        param.token = user.getToken();
        param.secretNumber = user.getSecret();
        return rest.save(JSON.stringify(param), function (response) {
            if (response.errorCode !== '') {
                var codeStatus = false;
                var strErrCode=",01364,01384,01314,01394,01354,01714,01374,01744,01734,01724,01344,01335,01324,01624,01614,02043,02393,02013,02714,02735,02725," +
                    "02754,02744,01984,01544,01534,02824,01584,01974,01574,01534,4,01514,02814,02864,01524,01944,02834,02854,01594,01924,01954,02394,02384," +
                    "02934,02374,02364,02314,02914,02924,02944,02614,02227,02244,02254,02234,02215,02164,01232,01221,02434,02414,";
                if (strErrCode.indexOf(',' + response.errorCode + ',') > -1) {
                    codeStatus = true;
                }
                if (response.errorCode == 'ERR_CODE_004' || response.errorCode == '4' || codeStatus) {
                    $location.path('login');
                    return;
                }
            }
            callback(response);

            if (window.isIE9) {
                $rootScope.$apply();
            }
        });
    };

    this.post = function (route, param, callback, type) {
        var url = config.userUrl;
        if (type == 'IM') {
            url = config.imUrl;
        } else if (type == 'trans') {
            url = config.transUrl;
        }
        var rest = $resource(url + route);

        param.commonParam = commonParam();
        param.token = user.getToken();
        param.secretNumber = user.getSecret();
        return rest.save(JSON.stringify(param), function (response) {
            if (response.errorCode !== '') {
                var codeStatus = false;
                var strErrCode=",01364,01384,01314,01394,01354,01714,01374,01744,01734,01724,01344,01335,01324,01624,01614,02043,02393,02013,02714,02735,02725," +
                    "02754,02744,01984,01544,01534,02824,01584,01974,01574,01534,4,01514,02814,02864,01524,01944,02834,02854,01594,01924,01954,02394,02384," +
                    "02934,02374,02364,02314,02914,02924,02944,02614,02227,02244,02254,02234,02215,02164,01232,01221,02434,02414,";
                if (strErrCode.indexOf(',' + response.errorCode + ',') > -1) {
                    codeStatus = true;
                }
                if (response.errorCode == 'ERR_CODE_004' || response.errorCode == '4' || codeStatus) {
                    $location.path('login');
                    return;
                }
            }
            callback(response);

            if (window.isIE9) {
                $rootScope.$apply();
            }
        });
    };
}]);