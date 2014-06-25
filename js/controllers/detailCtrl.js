

angular.module('seedControllers').controller('DetailCtrl', function($scope, $routeParams, aerobatic, Thing) {
  'use strict';

  var thingId = $routeParams.id;
  $scope.thing = Thing.find(thingId);

  $scope.thingImage = function(thing) {
    // Dynamically create the image source based on the cdnUrl
    return aerobatic.cdnUrl + '/images/' + thing.name.toLowerCase() + '.jpeg';
  };
});
