angular.module('services', []);
angular.module('controllers', []);
angular.module('directives', []);

// Simple service wrapper around the __config__ global;
angular.module('services').value('aerobatic', window.__config__);

angular.module('angularSeed', ['ngRoute', 'services', 'controllers', 'directives'])
  .config(function ($routeProvider, $locationProvider, $sceDelegateProvider) {
    // Use html5 pushState for route navigation
    $locationProvider.html5Mode(true);

    // Configure the the cdnHost to be whitelisted for cross-domain calls
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://' + __config__.cdnHost + '/**',
      'https://' + __config__.cdnHost + '/**'
    ]);

    $routeProvider
      .when('/', {
        controller: 'IndexCtrl',
        templateUrl: __config__.cdnUrl + '/partials/index.html'
      })
      .otherwise({redirectTo: '/'});
  });

angular.module('angularSeed').run(function($rootScope, $location, aerobatic) {
  // Preserve the querystring during HTML5 view navigations when in simulator
  // mode. This way when livereload forces the browser to refresh we won't lose
  // the fact we are in simulator mode designeated by the "sim=1" in the querystring.
  if (aerobatic.simulator === true) {
    var originalQuery = $location.search();
    $rootScope.$on('$routeChangeStart', function() {
      for (key in originalQuery) {
        $location.search(key, originalQuery[key]);
      }
    });
  }
});
