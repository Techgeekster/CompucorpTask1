//Routes
angular.module('task1')
.config(function($routeProvider) {
     $routeProvider.
     when('/weather', {
         templateUrl: 'partials/weather.html',
         name: "Weather",
         controller: 'WeatherController',
         controllerAs: "weatherCtrl",
         css: 'css/partials/weather.css'
     }).
     otherwise({
       redirectTo: '/weather'
     });
});