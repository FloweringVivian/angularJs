'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){

  $routeProvider
      .when('/',{
        controller: 'HomeController' ,
        templateUrl: 'views/home.html'
      })
      .when('/schools',{
        controller: 'AllSchoolsController',
        templateUrl: 'views/allSchools.html'
      })
      .when('/classrooms',{
        controller: 'AllClassroomsController',
        templateUrl: 'views/allClassrooms.html'
      })
      .when('/activities',{
        controller: 'AllActivitiesController',
        templateUrl: 'views/allActivities.html'
      })
      .otherwise('/');
}]);