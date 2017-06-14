# angularJs
angularJs demos

## angularJs优点

* 单页面应用

	angularJs采用的单页面应用，通过路由的方式来控制跳转，相比于传统的独立页面模式来说，加载时速度更快。

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

	


