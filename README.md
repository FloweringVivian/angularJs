# angularJs

## angularJs优点

* 良好的应用程序结构

通常情况下，我们编写 JavaScript 没有明确的结构。使用 AngularJS，可以通过MVC（模型 - 视图 - 控制器）或MVVM （模型 - 视图 - 视图模型）模式来组织源代码。AngularJS 是一个 MVW 框架，其中W代表可以用于任何项目。你可以组织你的代码模块，它可显著提高应用程序的可测试性和可维护性。

* 单页面应用

angularJs采用的单页面应用，通过路由的方式来控制页面跳转，相比于传统的独立页面模式来说，加载时速度更快。

路由配置如下：

```javascript
var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){

  $routeProvider
      .when('/',{
        controller: 'homeCtrl' ,
        templateUrl: 'views/home.html'
      })
      .when('/user',{
        controller: 'userCtrl',
        templateUrl: 'views/user.html'
      })
      .when('/product',{
        controller: 'productCtrl',
        templateUrl: 'views/product.html'
      })
      .when('/my',{
        controller: 'myCtrl',
        templateUrl: 'views/my.html'
      })
      .otherwise('/');
}]);
```

* 数据绑定

典型的DOM操作，都是先通过id或者class找到相应的dom节点然后对dom节点进行赋值等操作。而使用了Angularjs就不用担心查找dom节点以及js动态生成dom节点不能绑定事件的事了，使用ng只需要将要绑定的事件写在相应的dom上即可。至于数据绑定，则是控制器中模型的数据与视图层模型的数据时刻保持一致。

代码示例：

```javascript
<tr ng-repeat="user in userList">
    <td><input type="checkbox" ng-checked="user.isChecked" ng-click="checkOne(user)"></td>
    <td ng-bind="user.userName"></td>
    <td ng-bind="user.email"></td>
    <td ng-bind="user.phone"></td>
    <td ng-bind="user.address"></td>
    <td ng-bind="user.remark"></td>
    <td>
        <span class="cursor-pointer" data-toggle="modal" data-target="#viewUser" ng-click="viewUserInfo(user)">查看</span>
        <span class="cursor-pointer" ng-click="delUser(user)">删除</span>
    </td>
</tr>
```

* 自定义指令

假如一个网站中多处都会用到一个相同的功能，那就可以把这个功能写成一个自定义的指令，详情见demo中的产品列表页面的选择用户。

* 自定义服务

网站中一些公共的数据信息可以写到自定义服务里，例如demo中将登录用户的基本信息写到了user这个service中，详情见demo中的个人中心。

* 自定义过滤器

详情见demo中的产品列表-数量占总数百分比

## angularJs缺点

* 不利于SEO（搜索引擎优化）

* ngView只能有一个，不能嵌套多个视图，引入angular-ui/ui-router可以解决

* 验证功能错误信息显示比较薄弱，需要写很多模板标签，没有jQuery Validate方便

* 不适合交互频繁的网站，如游戏之类交互体验网站

* 数据绑定影响性能

* 在IE9上兼容不好

* 相比于react或者vue，angular自身是一个重量级的框架，用户要受到框架的很多制约灵活性不够。

	没有react或者vue这样的单文件组件，写一个组件，往往要在html,js,css三个文件中切换。一些小型项目还好,可到了大型项目简直就是灾难.每增加一个组件就要增加三个文件，文件非常琐碎。

## 针对我们现在开发方式存在的痛点，angular能否很好的解决

* 页面跳转

对于目前网站页面跳转存在的问题，angularJs的路由功能可以解决，并且jsp页面home页太多庞大的问题，通过angularJs的路由也可以解决。

* 列表数据

对于目前网站使用jqGrid展示表格数据，angularJs可以提供更简单的方法，使用ng-repeat和ng-bind，可以更灵活的操作表格数据，并且便于更改，以前用jqGrid修改表格样式比较麻烦，angularJs针对表格的样式修改也容易很多。

* 前后端分离

使用angularJs可以把前后端代码完全分离开，避免传统jsp页面前后端分离的局限性。

* dom操作问题

目前网站中大量的dom操作都是添加id的方式，id名加的特别多，angularJs的数据绑定可以避免这种问题。

## 学习曲线

个人觉得学习难度属于中级偏上，基本的简单地方学习起来比较容易，但是想要灵活的运用自定义组件还是需要花费一定的时间和精力。

## 打包压缩

使用gulp进行打包压缩

## 兼容性

兼容到IE9以上，但是对IE9的兼容存在问题









