"use strict";

var random = '';
if (!localStorage.debug) {
    random = '?' + Math.random();
}
// 设定依载入顺序执行及BashPath
// 别在改CacheBust:true了,火狐不兼容
var jsLAB = $LAB.setOptions({
    AlwaysPreserveOrder: true,
    BasePath: config.rootUrl,
    CacheBust: localStorage.debug ? false : true
});

// 载入系统核心模組
// jsLAB.script('common/engine/app.js')
// .script('common/engine/route.js')
jsLAB.script('/angularJs/sense/common/engine/directives.js')
    .script('/angularJs/sense/common/engine/filters.js')
    .script('/angularJs/sense/common/engine/factory.js');

//if (!localStorage.debug) {
//    jsLAB.script('common/engine/concat/services.concat.min.js')
//        .script('common/engine/concat/directive.concat.min.js')
//} else {
    // 载入核心服务
    jsLAB.script('/angularJs/sense/common/engine/services/rest.js')
        .script('/angularJs/sense/common/engine/services/u_rest.js')

        // 载入自定义指令
        //.script('common/engine/directives/global_model.js')
        //.script('common/engine/directives/currency.js')
        //.script('common/engine/directives/currency_decimal.js')
        //.script('common/engine/directives/download.js')
        //.script('common/engine/directives/upload.js')

//}

// 载入通用函式
jsLAB.script('/angularJs/sense/common/engine/common.js')

// 启动angularjs
.wait(function () {
    log('angularjs boot start');
    angular.bootstrap(document, ['webApp']);
    log('angularjs boot end');
});