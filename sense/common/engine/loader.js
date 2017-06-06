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
jsLAB.script('common/engine/directives.js')
    .script('common/engine/filters.js')
    .script('common/engine/factory.js');

if (!localStorage.debug) {
    jsLAB.script('common/engine/concat/services.concat.min.js')
        .script('common/engine/concat/directive.concat.min.js')
} else {
    // 载入核心服务
    jsLAB.script('common/engine/services/user.js')
    // .script('common/engine/services/file_stream.js')
    // .script('common/engine/services/route_resolver.js')
        .script('common/engine/services/rest.js')
        .script('common/engine/services/restapi.js')
        .script('common/engine/services/oss.js')
        .script('common/engine/services/u_rest.js')
        .script('common/engine/services/query_menu.js')
        .script('common/engine/services/enum.js')
        .script('common/engine/services/currency.js')
        .script('common/engine/services/purchase_order.js')
        .script('common/engine/services/position/positionService.js')
        .script('common/engine/services/staff/staffService.js')
        .script('common/engine/services/message/messageService.js')
        .script('common/engine/services/business/businessService.js')
        .script('common/engine/services/tbdefine/tbjoinService.js')
        .script('common/engine/services/cache.js')
        .script('common/engine/services/g_model.js')

        // 载入自定义指令
        .script('common/engine/directives/global_model.js')
        .script('common/engine/directives/currency.js')
        .script('common/engine/directives/currency_decimal.js')
        .script('common/engine/directives/download.js')
        .script('common/engine/directives/upload.js')
        // .script('common/engine/directives/left_bar.js')
        .script('common/engine/directives/region.js')
        .script('common/engine/directives/vendor_product.js')
        .script('common/engine/directives/purchase/p_vendor_product.js')
        .script('common/engine/directives/return_purchase/return_checkprod.js')
        .script('common/engine/directives/return_purchase/return_invprod.js')
        .script('common/engine/directives/return_purchase/return_invsale.js')
        .script('common/engine/directives/return_purchase/return_prod.js')
        .script('common/engine/directives/product.js')
        .script('common/engine/directives/customer.js')
        .script('common/engine/directives/inside_customer.js')
        .script('common/engine/directives/inside_vendor.js')
        .script('common/engine/directives/staff.js')
        .script('common/engine/directives/staff_model.js')
        .script('common/engine/directives/position.js')
        .script('common/engine/directives/customer_address.js')
        .script('common/engine/directives/produnit.js')
        .script('common/engine/directives/company.js')
        .script('common/engine/directives/vendor.js')
        .script('common/engine/directives/takepoint.js')
        .script('common/engine/directives/logistics.js')
        .script('common/engine/directives/trading.js')
        .script('common/engine/directives/address.js')
        .script('common/engine/directives/payway.js')
        .script('common/engine/directives/tax.js')
        .script('common/engine/directives/enum.js')
        .script('common/engine/directives/number_decimal.js')
        // .script('common/engine/directives/price_decimal.js')
        // .script('common/engine/directives/price_format.js')
        .script('common/engine/directives/number_format.js')
        .script('common/engine/directives/register/register.js')
        .script('common/engine/directives/document_track.js')
        .script('common/engine/directives/asyncDate.js')
        .script('common/engine/directives/purchase_order.js')
        .script('common/engine/directives/arrive_notice.js')
        .script('common/engine/directives/store_house.js')
        .script('common/engine/directives/store_location.js')
        .script('common/engine/directives/deliver_product.js')
        .script('common/engine/directives/imgUpload.js')
        .script('common/engine/directives/invoice_order.js')
        .script('common/engine/directives/enterEvent.js')
        .script('common/engine/directives/more_desc.js')
        .script('common/engine/directives/bill_category.js')
        .script('common/engine/directives/sale_returnpro.js')

        //集成平台语义模型涉及组件
        .script('common/engine/directives/new/allCompany.js')
        .script('common/engine/directives/new/allService.js')
        .script('common/engine/directives/application.js')
        .script('common/engine/directives/meta_table.js')
        .script('common/engine/directives/meta_field.js')
        .script('common/engine/directives/model_table.js')
        .script('common/engine/directives/model_joincon.js')
        .script('common/engine/directives/meta_fieldtwo.js')
        .script('common/engine/directives/meta_tabletwo.js');
}

// 载入通用函式
jsLAB.script('common/engine/common.js')

//载入环信IM
// .script('common/easemob/config.js')
// .script('common/easemob/easemob.conn.js')

// 启动angularjs
.wait(function () {
    log('angularjs boot start');
    angular.bootstrap(document, ['webApp']);
    log('angularjs boot end');
});