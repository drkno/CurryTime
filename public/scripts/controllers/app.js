(function () {
    'use strict';

    var app = angular.module('app', [
        'ngRoute',
        'pageControllers'
    ]);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/CurryTable.html',
                controller: 'TableController'
            }).
            otherwise({
                redirectTo: '/'
            });
      }]);
}());
