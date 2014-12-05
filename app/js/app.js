angular.module('services', []);
angular.module('controllers', []);
angular.module('directives', []);

angular.module('angularSeed', ['ngRoute', 'Aerobatic', 'services', 'controllers', 'directives', 'templates'])
  .config(function ($routeProvider, $locationProvider, $sceDelegateProvider, aerobaticProvider) {
    // Use html5 pushState for route navigation
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        controller: 'IndexCtrl',
        // The templates have already been pre-cached so no network call is incurred
        templateUrl: aerobaticProvider.templateUrl('partials/index.html')
      })
      .otherwise({redirectTo: '/'});
  });
