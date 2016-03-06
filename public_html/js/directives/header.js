angular.module('task1')
.directive('header', ['$route', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/header.html',
        controller: function($route) {
          this.$route = $route;
       },
       controllerAs: 'headerCtrl'
    };
}]);