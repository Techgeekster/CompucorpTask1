angular.module('task1')
.controller('MainController', ['$route', function($route) 
    {
       this.$route = $route; 
       this.title = 'Local Weather';
    }]);