'use strict';

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