"use strict";

webApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({enabled: true, rewriteLinks: true, requireBase: true});

    // 路由表
    $routeProvider
        .when('/angularJs/sense/', {
            redirectTo: '/angularJs/sense/login'
        })
        .when('/angularJs/sense/login/:invitationSource?/:invitationCode?', {
            templateUrl: '/angularJs/sense/common/views/login.html?',
            controller: 'loginCtrl',
            resolve: loader(['common/engine/controllers/login'])
        })
        .when('/experience', {
            templateUrl: 'common/views/experience.html?',
            controller: 'experienceCtrl',
            resolve: loader(['common/engine/controllers/experience'])
        })
        .when('/error', {
            templateUrl: 'common/views/error.html?'
        })
        .when('/index', {
            templateUrl: 'common/views/index.html?',
            controller: 'indexCtrl',
            resolve: loader(['common/engine/controllers/index'])
        })
        // 注册 1
        .when('/register/step1/:invitationSource?/:invitationCode?', {
            templateUrl: 'common/views/register/step1.html?',
            controller: 'RegisterController',
            resolve: loader(['common/engine/controllers/register/user_register'])
        })
        // 注册 2-1
        .when('/register/step2_1/:invitationCode?', {
            templateUrl: 'common/views/register/step2_1.html?',
            controller: 'StepTwoOneController',
            resolve: loader(['common/engine/controllers/register/user_register_step2_1'])
        })
        // 注册 2-2
        .when('/register/step2_2/:invitationCode?', {
            templateUrl: 'common/views/register/step2_2.html?',
            controller: 'StepTwoController',
            resolve: loader(['common/engine/controllers/register/user_register_step2'])
        })
        // 注册 3-1
        .when('/register/step3_1', {
            templateUrl: 'common/views/register/step3_1.html?',
            controller: 'StepThreeController',
            resolve: loader(['common/engine/controllers/register/user_register_step3'])
        })
        //找回密码
        .when('/forgetPW', {
            templateUrl: 'common/views/forgetpw/step1.html?',
            controller: 'forgetPWCtrl',
            resolve: loader(['common/engine/controllers/forgetPW'])
        })
        // // 注册 3-2
        // .when('/register/step3_2', {
        //     templateUrl: 'views/register/step3_2.html?' ,
        //     //controller: 'RegisterController',
        //     //resolve: loader(['register/user_register'])
        // })
        // // 注册 3-3
        // .when('/register/step3_3', {
        //     templateUrl: 'views/register/step3_3.html?' ,
        //     //controller: 'RegisterController',
        //     //resolve: loader(['register/user_register'])
        // })
        // // 注册 4
        // .when('/register/step4', {
        //     templateUrl: 'views/register/step4.html?' ,
        //     //controller: 'RegisterController',
        //     //resolve: loader(['register/user_register'])
        // })
        //============================采购 start==============================
        .when('/mypurchase', {
            templateUrl: 'supplyCloud/views/mypurchase.html?',
            controller: 'myPurchaseCtrl',
            resolve: loader(['supplyCloud/controllers/mypurchase'], 'mypurchase')
        })
        //采购订单列表
        .when('/order/my/list/:status?', {
            templateUrl: 'supplyCloud/views/order/my/list.html?',
            controller: 'purchaseListCtrl',
            resolve: loader(['supplyCloud/controllers/order/my/list'], 'mypurchase')
        })
        // 采购订单查看
        .when('/order/my/detail/:poId/:companyId/:status?', {
            templateUrl: 'supplyCloud/views/order/my/detail.html?',
            controller: 'purchaseODetail',
            resolve: loader(['supplyCloud/controllers/order/my/detail'], 'mypurchase')
        })
        // 采购回收站查看
        .when('/order/my/detail_delete/:poId/:companyId', {
            templateUrl: 'supplyCloud/views/order/my/detail_delete.html?',
            controller: 'purchaseODetailDelete',
            resolve: loader(['supplyCloud/controllers/order/my/detail_delete'], 'mypurchase')
        })
        // 采购订单新增
        .when('/order/my/add', {
            templateUrl: 'supplyCloud/views/order/my/add.html?',
            controller: 'addPurchaseCtrl',
            resolve: loader(['supplyCloud/controllers/order/my/add'], 'mypurchase')
        })
        // 采购订单编辑
        .when('/order/my/edit/:poId/:companyId', {
            templateUrl: 'supplyCloud/views/order/my/edit.html?',
            controller: 'editPurchaseCtrl',
            resolve: loader(['supplyCloud/controllers/order/my/edit'], 'mypurchase')
        })
        //采购变更列表
        .when('/purchase_change/list/:status?', {
            templateUrl: 'supplyCloud/views/purchase_change/list.html?',
            controller: 'purchaseChangeListCtrl',
            resolve: loader(['supplyCloud/controllers/purchase_change/list'], 'mypurchase')
        })
        //采购变更 订单选择
        .when('/purchase_change/select', {
            templateUrl: 'supplyCloud/views/purchase_change/select.html?',
            controller: 'purchaseChangeSelectCtrl',
            resolve: loader(['supplyCloud/controllers/purchase_change/select'], 'mypurchase')
        })
        //采购变更 新建
        .when('/purchase_change/add/:poId/:companyId/:changeType', {
            templateUrl: 'supplyCloud/views/purchase_change/add.html?',
            controller: 'purchaseChangeAdd',
            resolve: loader(['supplyCloud/controllers/purchase_change/add'], 'mypurchase')
        })
        //采购变更 详情
        .when('/purchase_change/look/:id/:companyId/:status?', {
            templateUrl: 'supplyCloud/views/purchase_change/look_refused.html?',
            controller: 'lookDetailCtrl',
            resolve: loader(['supplyCloud/controllers/purchase_change/look'], 'mypurchase')
        })
        //采购价格列表
        .when('/purchase_price/purchase_price_list', {
            templateUrl: 'supplyCloud/views/purchase_price/purchase_price_list.html?',
            controller: 'purchasePriceCtrl',
            resolve: loader(['supplyCloud/controllers/purchase_price/purchase_price_list'], 'mypurchase')
        })
        //收货单列表
        .when('/order/received/list', {
            templateUrl: 'supplyCloud/views/order/received/list.html?',
            controller: 'receivedListCtrl',
            resolve: loader(['supplyCloud/controllers/order/received/list'], 'mypurchase')
        })
        //收货单详情
        .when('/order/received/detail/:roId/:companyId', {
            templateUrl: 'supplyCloud/views/order/received/detail.html?',
            controller: 'receivedDetailCtrl',
            resolve: loader(['supplyCloud/controllers/order/received/detail'])
        })
        //收货单新增
        .when('/order/received/add/:comeSource/:companyId?/:orderId?/:poLineId?', {
            templateUrl: 'supplyCloud/views/order/received/add.html?',
            controller: 'AddController',
            resolve: loader(['supplyCloud/controllers/order/received/add'], 'mypurchase')
        })
        //收货单编辑
        .when('/order/received/edit/:source', {
            templateUrl: 'supplyCloud/views/order/received/edit.html?',
            controller: 'EditController',
            resolve: loader(['supplyCloud/controllers/order/received/edit'], 'mypurchase')
        })

        //我的收货计划
        .when('/order/received/plan_list', {
            templateUrl: 'supplyCloud/views/order/received/plan_list.html?',
            controller: 'receivedPlanListCtrl',
            resolve: loader(['supplyCloud/controllers/order/received/plan_list'], 'mypurchase')
        })

        //我的到货通知
        .when('/order/arrival/list', {
            templateUrl: 'supplyCloud/views/order/arrival/list.html?',
            controller: 'arrivalListCtrl',
            resolve: loader(['supplyCloud/controllers/order/arrival/list'], 'mypurchase')
        })
        //到货通知查看
        .when('/order/arrival/detail/:id/:companyId', {
            templateUrl: 'supplyCloud/views/order/arrival/detail.html?',
            controller: 'arrivalDetailCtrl',
            resolve: loader(['supplyCloud/controllers/order/arrival/detail'], 'mypurchase')
        })

        //供应商和产品关系
        .when('/supply_product/supply_product', {
            templateUrl: 'supplyCloud/views/supply_product/supply_product.html?',
            controller: 'supplyProductCtrl',
            resolve: loader(['supplyCloud/controllers/supply_product/supply_product'], 'mypurchase')
        })

        //我的供应商列表
        .when('/supply/supply_my/:tabId?', {
            templateUrl: 'supplyCloud/views/supply/supply_my.html?',
            controller: 'supplyMyCtrl',
            resolve: loader(['supplyCloud/controllers/supply/supply_my'], 'mypurchase')
        })
        //新增供应商
        .when('/supply/supply_add/:saleCompType', {
            templateUrl: 'supplyCloud/views/supply/supply_add.html?',
            controller: 'supplyAddCtrl',
            resolve: loader(['supplyCloud/controllers/supply/supply_add'], 'mypurchase')
        })
        //供应商发起邀约
        .when('/supply/invite_single/:compVendorId/:companyId', {
            templateUrl: 'supplyCloud/views/supply/invite_single.html?',
            controller: 'inviteSingleCtrl',
            resolve: loader(['supplyCloud/controllers/supply/invite_single'], 'mypurchase')
        })
        //接受供应商邀约
        .when('/supply/invite_accept/:vendorInviteId/:sourceId/:companyId/:vendorId', {
            templateUrl: 'supplyCloud/views/supply/invite_accept.html?',
            controller: 'inviteAcceptCtrl',
            resolve: loader(['supplyCloud/controllers/supply/invite_accept'], 'mypurchase')
        })
        //维护供应商档案
        .when('/supply/supply_info/:cvId/:companyId/:vendorId?/:companyName', {
            templateUrl: 'supplyCloud/views/supply/supply_info.html?',
            controller: 'supplyInfoCtrl',
            resolve: loader(['supplyCloud/controllers/supply/supply_info'], 'mypurchase')
        })

        //供应商邀约码
        .when('/invite/user/:invitationCode', {
            templateUrl: 'supplyCloud/views/invite/user.html?',
            controller: 'userPartnerCtrl',
            resolve: loader(['supplyCloud/controllers/invite/user_partner'])
        })
        //邀约成功后，提示页面-后台配置展示页面
        .when('/invite/partner/:invitationCode', {
            templateUrl: 'supplyCloud/views/invite/partner.html?',
            controller: 'partnerCtrl',
            resolve: loader(['supplyCloud/controllers/invite/partner'])
        })
        //=========================采购 end============================
        //=========================销售 start==========================
        .when('/mysale', {
            templateUrl: 'senseYun/views/mysale.html',
            controller: 'mySaleCtrl',
            resolve: loader(['senseYun/controllers/mysale'], 'mysale')
        })
        //客户订单列表
        .when('/order/customer/list/:tabId?', {
            templateUrl: 'supplyCloud/views/order/customer/list.html?',
            controller: 'ListController',
            resolve: loader(['supplyCloud/controllers/order/customer/customer_list'], 'mysale')
        })
        //客户订单查看
        .when('/order/customer/detail_transfer/:vendorId/:poAnswerId/:status?', {
            templateUrl: 'supplyCloud/views/order/customer/detail.html?',
            controller: 'DetailController',
            resolve: loader(['supplyCloud/controllers/order/customer/customer_detail'], 'mysale')
        })
        //客户订单答交
        .when('/order/customer/check/:vendorId/:poAnswerId', {
            templateUrl: 'supplyCloud/views/order/customer/check.html?',
            controller: 'CheckController',
            resolve: loader(['supplyCloud/controllers/order/customer/customer_check'], 'mysale')
        })
        //客户订单转销售订单
        .when('/order/customer/return_sale/:poAnswerId/:vendorId', {
            templateUrl: 'supplyCloud/views/order/customer/return_sale.html?',
            controller: 'returnSaleCtrl',
            resolve: loader(['supplyCloud/controllers/order/customer/return_sale'], 'mysale')
        })
        //销售订单列表
        .when('/order/sales/list/:tabId?', {
            templateUrl: 'supplyCloud/views/order/sales/list.html?',
            controller: 'salesListCtrl',
            resolve: loader(['supplyCloud/controllers/order/sales/list'], 'mysale')
        })
        //销售订单详情
        .when('/order/sales/detail/:id/:vendorId', {
            templateUrl: 'supplyCloud/views/order/sales/detail.html?',
            controller: 'salesDetailCtrl',
            resolve: loader(['supplyCloud/controllers/order/sales/detail'], 'mysale')
        })
        //客户变更列表
        .when('/customer_change/list/:status?', {
            templateUrl: 'supplyCloud/views/customer_change/list.html?',
            controller: 'customerChangeListCtrl',
            resolve: loader(['supplyCloud/controllers/customer_change/list'], 'mysale')
        })
        //客户变更详情
        .when('/customer_change/detail/:pocId/:companyId', {
            templateUrl: 'supplyCloud/views/customer_change/detail.html?',
            controller: 'customerChangeDetailCtrl',
            resolve: loader(['supplyCloud/controllers/customer_change/detail'], 'mysale')
        })
        //客户变更转销售变更
        .when('/customer_change/return_sale/:pocId/:companyId', {
            templateUrl: 'supplyCloud/views/customer_change/return_sale.html?',
            controller: 'customerChangeSaleCtrl',
            resolve: loader(['supplyCloud/controllers/customer_change/return_sale'], 'mysale')
        })
        //销售变更列表
        .when('/sale_change/list', {
            templateUrl: 'supplyCloud/views/sale_change/list.html?',
            controller: 'saleChangeListCtrl',
            resolve: loader(['supplyCloud/controllers/sale_change/list'], 'mysale')
        })
        //销售变更详情
        .when('/sale_change/detail/:id/:companyId', {
            templateUrl: 'supplyCloud/views/sale_change/detail.html?',
            controller: 'saleChangeDetailCtrl',
            resolve: loader(['supplyCloud/controllers/sale_change/detail'], 'mysale')
        })
        //我的出货计划
        .when('/order/delivery/plan_list', {
            templateUrl: 'supplyCloud/views/order/delivery/plan_list.html?',
            controller: 'deliveryPlanList',
            resolve: loader(['supplyCloud/controllers/order/delivery/plan_list'], 'mysale')
        })
        //我的客户列表
        .when('/customer/customer_my/:tabId?', {
            templateUrl: 'supplyCloud/views/customer/customer_my.html?',
            controller: 'CustomerController',
            resolve: loader(['supplyCloud/controllers/customer/customer_my'], 'mysale')
        })
        //新增客户
        .when('/customer/customer_add/:buyCompType', {
            templateUrl: 'supplyCloud/views/customer/customer_add.html?',
            controller: 'CustomerAddController',
            resolve: loader(['supplyCloud/controllers/customer/customer_add'], 'mysale')
        })
        //客户发起邀约
        .when('/customer/invite_single/:compCustomerId/:companyId', {
            templateUrl: 'supplyCloud/views/customer/invite_single.html?',
            controller: 'cusInviteSingleCtrl',
            resolve: loader(['supplyCloud/controllers/customer/invite_single'], 'mysale')
        })
        //维护客户档案
        .when('/customer/customer_info/:ccId/:companyId/:customerId?/:companyName', {
            templateUrl: 'supplyCloud/views/customer/customer_info.html?',
            controller: 'customerInfoCtrl',
            resolve: loader(['supplyCloud/controllers/customer/customer_info'], 'mysale')
        })
        //接受客户邀约
        .when('/customer/invite_accept/:customerInvitationId/:sourceId/:companyId/:customerId', {
            templateUrl: 'supplyCloud/views/customer/invite_accept.html?',
            controller: 'cusInviteAcceptCtrl',
            resolve: loader(['supplyCloud/controllers/customer/invite_accept'], 'mysale')
        })
        //出货 start----------------------------
        //出货单列表
        .when('/order/delivery/list', {
            templateUrl: 'supplyCloud/views/order/delivery/list.html?',
            controller: 'deliveryListCtrl',
            resolve: loader(['supplyCloud/controllers/order/delivery/list'], 'mysale')
        })
        //出货单详情
        .when('/order/delivery/detail/:id/:companyId', {
            templateUrl: 'supplyCloud/views/order/delivery/detail.html?',
            controller: 'deliveryDetailCtrl',
            resolve: loader(['supplyCloud/controllers/order/delivery/detail'], 'mysale')
        })
        //出货单新增
        .when('/order/delivery/add/:vendorId?/:sourceSoId?/:sourceSoLineId?', {
            templateUrl: 'supplyCloud/views/order/delivery/add.html?',
            controller: 'deliveryAddCtrl',
            resolve: loader(['supplyCloud/controllers/order/delivery/add'], 'mysale')
        })
        //出货单编辑
        .when('/order/delivery/edit/:doId/:companyId', {
            templateUrl: 'supplyCloud/views/order/delivery/edit.html?',
            controller: 'deliveryEditCtrl',
            resolve: loader(['supplyCloud/controllers/order/delivery/edit'], 'mysale')
        })

        //客户和产品关系
        .when('/customer_product/customer_product', {
            templateUrl: 'supplyCloud/views/customer_product/customer_product.html?',
            controller: 'customerProductCtrl',
            resolve: loader(['supplyCloud/controllers/customer_product/customer_product'], 'mysale')
        })
        // =========================销售 end==========================
        // =========================配置 start==========================
        .when('/businessmanage', {
            templateUrl: 'supplyCloud/views/businessmanage.html?',
            controller: 'businessManageCtrl',
            resolve: loader(['supplyCloud/controllers/businessmanage'], 'businessmanage')
        })
        //收发货地址
        .when('/company/address_list/:addressType?', {
            templateUrl: 'supplyCloud/views/company/address_list.html?',
            controller: 'companyAddressListCtrl',
            resolve: loader(['supplyCloud/controllers/company/address_list'], 'businessmanage')
        })
        //新增收发货地址
        .when('/company/address_add/:addressType', {
            templateUrl: 'supplyCloud/views/company/address_add.html?',
            controller: 'companyAddressAddCtrl',
            resolve: loader(['supplyCloud/controllers/company/address_add'], 'businessmanage')
        })
        //編輯收发货地址
        .when('/company/address_edit/:addressType/:addressId/:companyId', {
            templateUrl: 'supplyCloud/views/company/address_edit.html?',
            controller: 'companyAddressEditCtrl',
            resolve: loader(['supplyCloud/controllers/company/address_edit'], 'businessmanage')
        })
        //产品管理
        .when('/product/info_list', {
            templateUrl: 'supplyCloud/views/product/info_list.html?',
            controller: 'productInfoListCtrl',
            resolve: loader(['supplyCloud/controllers/product/info_list'], 'businessmanage')
        })
        //编辑产品信息
        .when('/product/info_edit/:companyId/:prodId', {
            templateUrl: 'supplyCloud/views/product/info_edit.html?',
            controller: 'ProductInfoEditCtrl',
            resolve: loader(['supplyCloud/controllers/product/info_edit'], 'businessmanage')
        })
        //新增产品
        .when('/product/info_add', {
            templateUrl: 'supplyCloud/views/product/info_add.html?',
            controller: 'ProductInfoAddCtrl',
            resolve: loader(['supplyCloud/controllers/product/info_add'], 'businessmanage')
        })
        //系统参数设置
        .when('/base_info/system_info', {
            templateUrl: 'supplyCloud/views/base_info/system_info.html?',
            controller: 'baseInfoSystemInfoCtrl',
            resolve: loader(['supplyCloud/controllers/base_info/system_info'], 'businessmanage')
        })
        //计量单位维护
        .when('/base_info/unit_metering/:operate?', {
            templateUrl: 'supplyCloud/views/base_info/unit_metering.html?',
            controller: 'baseinfoUnitMeteringCtrl',
            resolve: loader(['supplyCloud/controllers/base_info/unit_metering'], 'businessmanage')
        })
        //单位换算关系维护
        .when('/base_info/unit_convert', {
            templateUrl: 'supplyCloud/views/base_info/unit_convert.html?',
            controller: 'baseinfoUnitConvertCtrl',
            resolve: loader(['supplyCloud/controllers/base_info/unit_convert'], 'businessmanage')
        })
        //单位换算关系维护 新增与修改
        .when("/base_info/uc_detail/:ucId?/:companyId?", {
            templateUrl: "supplyCloud/views/base_info/unit_convert_detail.html?",
            controller: "baseinfoUcDetailCtrl",
            resolve: loader(["supplyCloud/controllers/base_info/unit_convert_detail"], "businessmanage")
        })
        //产品单位管理
        .when('/base_info/unit_product', {
            templateUrl: 'supplyCloud/views/base_info/unit_product.html?',
            controller: 'baseInfoUnitProductCtrl',
            resolve: loader(['supplyCloud/controllers/base_info/unit_product'], 'businessmanage')
        })
        //币种维护
        .when('/base_info/currency/:operate?', {
            templateUrl: 'supplyCloud/views/base_info/currency.html?',
            controller: 'baseinfoCurrencyCtrl',
            resolve: loader(['supplyCloud/controllers/base_info/currency'], 'businessmanage')
        })
        //交易条件维护
        .when('/base_info/trade_terms/:operate?', {
            templateUrl: 'supplyCloud/views/base_info/trade_terms.html?',
            controller: 'baseInfoTradeTremsCtrl',
            resolve: loader(['supplyCloud/controllers/base_info/trade_terms'], 'businessmanage')
        })
        //汇率维护
        .when('/base_info/exchange_rate', {
            templateUrl: 'supplyCloud/views/base_info/exchange_rate.html?',
            controller: 'baseinfoExchangeRateCtrl',
            resolve: loader(['supplyCloud/controllers/base_info/exchange_rate'], 'businessmanage')
        })
        //收付款条件维护
        .when('/base_info/payment_condition/:operate?', {
            templateUrl: 'supplyCloud/views/base_info/payment_condition.html?',
            controller: 'baseInfoPaymentConditionCtrl',
            resolve: loader(['supplyCloud/controllers/base_info/payment_condition'], 'businessmanage')
        })
        //税别维护
        .when('/base_info/taxes/:operate?', {
            templateUrl: 'supplyCloud/views/base_info/taxes.html?',
            controller: 'baseinfoTaxesCtrl',
            resolve: loader(['supplyCloud/controllers/base_info/taxes'], 'businessmanage')
        })
        //仓库库位维护
        .when('/base_info/inv_info', {
            templateUrl: 'supplyCloud/views/base_info/inv_info.html?',
            controller: 'baseinfoInvInfoCtrl',
            resolve: loader(['supplyCloud/controllers/base_info/inv_info'], 'businessmanage')
        })
        //新增仓库库位
        .when('/base_info/inv_info_add', {
            templateUrl: 'supplyCloud/views/base_info/inv_info_add.html?',
            controller: 'baseinfoInvInfoAddCtrl',
            resolve: loader(['supplyCloud/controllers/base_info/inv_info_add'], 'businessmanage')
        })
        //编辑仓库库位
        .when('/base_info/inv_info_edit/:invInfoId/:companyId', {
            templateUrl: 'supplyCloud/views/base_info/inv_info_edit.html?',
            controller: 'baseinfoInvInfoEditCtrl',
            resolve: loader(['supplyCloud/controllers/base_info/inv_info_edit'], 'businessmanage')
        })

        //======================配置 end============================
        //======================退换货 end==========================
        //新建仓退 from_source 退货来源 1-采购订单 2-收货单 3-无订单退货 po_id：单号
        .when('/purchase_return/add_inv/:from_source?/:po_id?/:companyId?', {
            templateUrl: 'supplyCloud/views/purchase_return/add_inv.html?',
            controller: 'purchaseReturnAddInvCtrl',
            resolve: loader(['supplyCloud/controllers/purchase_return/add_inv'], 'mypurchase')
        })
        .when('/purchase_return/edit_inv/:id/:companyId', {
            templateUrl: 'supplyCloud/views/purchase_return/edit_inv.html?',
            controller: 'purchaseReturnEditInvCtrl',
            resolve: loader(['supplyCloud/controllers/purchase_return/edit_inv'], 'mypurchase')
        })
        .when('/purchase_return/return_list', {
            templateUrl: 'supplyCloud/views/purchase_return/return_list.html?',
            controller: 'purchaseReturnListCtrl',
            resolve: loader(['supplyCloud/controllers/purchase_return/return_list'], 'mypurchase')
        })
        .when('/purchase_return/return_detail/:id/:companyId', {
            templateUrl: 'supplyCloud/views/purchase_return/return_detail.html?',
            controller: 'purchaseReturnDetailCtrl',
            resolve: loader(['supplyCloud/controllers/purchase_return/return_detail'], 'mypurchase')
        })
        //验退新增
        .when('/purchase_return/return_check/add/:roId?/:companyId?', {
            templateUrl: 'supplyCloud/views/purchase_return/return_check/add.html?',
            controller: 'purchaseReturnCheckAddCtrl',
            resolve: loader(['supplyCloud/controllers/purchase_return/return_check/add'], 'mypurchase')
        })
        //验退编辑
        .when('/purchase_return/return_check/edit/:roId/:companyId', {
            templateUrl: 'supplyCloud/views/purchase_return/return_check/edit.html?',
            controller: 'purchaseReturnCheckEditCtrl',
            resolve: loader(['supplyCloud/controllers/purchase_return/return_check/edit'], 'mypurchase')
        })
        //采购退换货  end
        //销售退换货  start
        .when('/sale_return/sale_list', {
            templateUrl: 'supplyCloud/views/sale_return/sale_list.html?',
            controller: 'saleReturnListCtrl',
            resolve: loader(['supplyCloud/controllers/sale_return/sale_list'], 'mysale')
        })
        .when('/sale_return/customer_detail/:prId/:companyId', {
            templateUrl: 'supplyCloud/views/sale_return/customer_detail.html?',
            controller: 'customerReturnDetailCtrl',
            resolve: loader(['supplyCloud/controllers/sale_return/customer_detail'], 'mysale')
        })
        .when('/sale_return/customer_list/:status?', {
            templateUrl: 'supplyCloud/views/sale_return/customer_list.html?',
            controller: 'customerReturnListCtrl',
            resolve: loader(['supplyCloud/controllers/sale_return/customer_list'], 'mysale')
        })
        .when('/sale_return/customer_to_sale/:prId/:companyId', {
            templateUrl: 'supplyCloud/views/sale_return/customer_to_sale.html?',
            controller: 'customerReturnToSaleCtrl',
            resolve: loader(['supplyCloud/controllers/sale_return/customer_to_sale'], 'mysale')
        })

        .when('/sale_return/return_detail/:id/:companyId', {
            templateUrl: 'supplyCloud/views/sale_return/return_detail.html?',
            controller: 'saleReturnDetailCtrl',
            resolve: loader(['supplyCloud/controllers/sale_return/return_detail'], 'mysale')
        })
        .when('/sale_return/return_add/:deliveryId?/:deliveryCompanyId?', {
            templateUrl: 'supplyCloud/views/sale_return/return_add.html?',
            controller: 'saleReturnAddCtrl',
            resolve: loader(['supplyCloud/controllers/sale_return/return_add'], 'mysale')
        })
        //======================退换货 end==========================
        //*****订单打印*****
        .when('/print_order/:id/:db_sharding_id/:order_type', {
            templateUrl: 'supplyCloud/views/print_order/purchase_order.html?',
            controller: 'printCtrl',
            resolve: loader(['supplyCloud/controllers/print_order/print', 'common/vendors/JsBarcode.all.min', 'common/vendors/jquery.qrcode.min'])
        })
        //====================其他======================
        //正在建设中
        .when('/construction/:topmenu?/:childmenu?', {
            templateUrl: 'common/views/construction.html',
            controller: 'constructionCtrl',
            resolve: loader(['common/engine/controllers/construction'])
        })
        //接口测试工具
        .when('/interface_test', {
            templateUrl: 'common/views/interface_test.html?',
            controller: 'interfaceCtrl',
            resolve: loader(['common/engine/controllers/interface'])
        })
        //接口测试工具2
        .when('/interface_test2', {
            templateUrl: 'common/views/interface_test2.html?',
            controller: 'interfaceCtrl2',
            resolve: loader(['common/engine/controllers/interface2'])
        })
        .when('/url', {
            templateUrl: 'common/url.html'
        })
        .when('/test/:id?', {
            templateUrl: 'common/views/test.html',
            controller: 'testCtrl',
            resolve: loader(['common/engine/controllers/test'])
        })
        .otherwise({
            redirectTo: '/index'
        });
}]);
