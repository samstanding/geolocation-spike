const app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        redirectTo: 'home'
    })
    .when('/home', {
        templateUrl:'/views/home.html',
        controller: "AppController as vm",
    })
    .when('/locator', {
        templateUrl: '/views/locator.html',
        controller: "LocController as vm",
    })
    .otherwise ({
        template:  '<h1>404</h1>'
    });
}])