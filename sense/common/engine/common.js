/**
 * 公共参数
 */
function commonParam() {
    return {
        dataSource: "1",
        interfaceVersion: "",
        mobileModel: "",
        mobileSysVersion: "",
        sourcePage: window.location.pathname,
        sourceSystem: "1"
    };
}

/**
 * 加载路径数组中的所有js文件
 * @param arrayName
 * @param firstLevelMenu：页面所属的一级菜单名称
 * @returns {{load: *[], init: *[], menu: *[]}}
 */
function loader(arrayName, firstLevelMenu) {
    return {
        load: ['$q', function ($q) {
            var deferred = $q.defer();

            var map = arrayName.map(function (path) {
                return loadScript(path + ".js" + random);
            });
            $q.all(map).then(function (r) {
                deferred.resolve();
            });
            return deferred.promise;
        }],
        init: ['$location', '$rootScope', 'user', function ($location, $rootScope, user) {
            config.refererPage = config.currentPage;
            config.currentPage = $location.url();
            //获取页头信息
            // $rootScope.userinfo = user.getUserInfo();
            if (window.isIE9) {
                return user.init();
            }
        }],
        menu: ['queryMenu', function (queryMenu) {
            if (firstLevelMenu) {
                //存储当前页面所属的顶级菜单的名称
                queryMenu.setCurrTopMenuName(firstLevelMenu);
            }
        }]
    };
}

/**param
 * 将对象格式化成字符串保存（只能保存对象）
 * @param key
 * @param value
 */
Storage.prototype.put = function (key, value) {
    this.setItem(key, JSON.stringify(value));
};
Storage.prototype.get = function (key) {
    var value = this.getItem(key);
    if (!value) {
        return '';
    }
    try {
        return JSON.parse(value);
    } catch (e) {
        return '';
    }
};

// 日期转为时间戳
// 开始时间--（适用于搜索条件中结束时间为年月日不带时分秒，
// 则取当日00:00:00秒的时间，以及开始和结束时间带时分秒的情况）
function formateDateSt(date) {
    if (_.isEmpty(date)) {
        //log("时间格式不对");
        return;
    }
    var format_time = date.replace(/-/g, '/');
    return new Date(format_time).getTime();
}
//结束时间--（搜索条件中结束时间为年月日不带时分秒，则取当日23:59:59秒的时间）
function formateDateEd(date) {
    if (_.isEmpty(date)) {
        //log("时间格式不对");
        return;
    }
    var format_time = date.replace(/-/g, '/');
    return new Date(format_time).getTime() + (1000 * 60 * 60 * 24 - 1);
}

//四舍五入小数 num-被格式化小数 place保留小数位数
//is_fix：是否补零
function round_num(num, place, is_fix) {
    if (isNaN(Number(num))) {
        return 0;
    }
    place = isNaN(Number(place)) ? 2 : place;//金额默认两位

    var format = Math.round(num * Math.pow(10, place)) / Math.pow(10, place);
    if (is_fix) {
        return format.toFixed(place);
    } else {
        return format;
    }
}

/*big.js
 *运算封装(对异常值进行了处理)
 * */
/**
 * 相除
 * @param a 加数
 * @param b 加数
 * @returns {number} 返回值
 */
function big_add_d(a, b) {
    a = isNaN(Number(a)) ? 0 : a;
    b = isNaN(Number(b)) ? 0 : b;
    return big_add(a, b);
}
// 相减
function big_minus_d(a, b) {
    a = isNaN(Number(a)) ? 0 : a;
    b = isNaN(Number(b)) ? 0 : b;
    return Number(Big(a).minus(b).toString());
}
// 相乘
function big_mul_d(a, b) {
    a = isNaN(Number(a)) ? 1 : a;
    b = isNaN(Number(b)) ? 1 : b;
    return Number(Big(a).times(b).toString());
}
/**
 * 相除
 * @param a 除数
 * @param b 被除数
 * @returns {number} 返回值
 */
function big_div_d(a, b) {
    a = isNaN(Number(a)) ? 0 : a;
    b = isNaN(Number(b)) ? 1 : b;
    return Number(Big(a).div(b).toString());
}

//big.js 运算封装 + - * /
function big_add(a, b) {
    return Number(Big(a).plus(b).toString());
}
function big_minus(a, b) {
    return Number(Big(a).minus(b).toString());
}
function big_mul(a, b) {
    if (isNaN(a)) {
        return NaN;
    }
    return Number(Big(a).times(b).toString());
}
function big_div(a, b) {
    if (isNaN(a) || isNaN(b)) {
        return NaN;
    }
    return Number(Big(a).div(b).toString());
}

/** 
 *把yyyy-MM-dd格式的时间转成数组
 */
function dateReturn(date){
    var d = date?new Date(date):new Date();
    var dateArr = [];
    dateArr.push(d.getFullYear());
    dateArr.push(d.getMonth()+1);
    dateArr.push(d.getDate());
    return dateArr;
}