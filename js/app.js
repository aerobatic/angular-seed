/**
 * The main app module
 *
 * @type {angular.Module}
 */

angular.module('seedServices', []);
angular.module('seedControllers', []);

// Simple service wrapper around the __config__ global;
angular.module('seedServices').value('aerobatic', window.__config__);

angular.module('angularSeed', ['ngRoute', 'seedServices', 'seedControllers'])
  .config(function ($routeProvider, $locationProvider, $sceDelegateProvider) {
    // Configure the the cdnHost to be whitelisted for cross-domain calls
    $sceDelegateProvider.resourceUrlWhitelist(['http://' + __config__.cdnHost + '/**']);

    // Use the bang prefix for Google ajax crawlability
    // https://developers.google.com/webmasters/ajax-crawling/docs/specification?csw=1
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/', {
        controller: 'IndexCtrl',
        templateUrl: __config__.cdnUrl + '/partials/index.html'
      })
      .when('/:id', {
        controller: 'DetailCtrl',
        templateUrl: __config__.cdnUrl + '/partials/detail.html'
      })
      .otherwise({redirectTo: '/'});
  });
