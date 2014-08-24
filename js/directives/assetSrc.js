
// Simple directive used on img elements in partial views. Will dynamically
// specify the correct absolute URL to the image based on the aerobatic.cdnUrl.
angular.module('directives').directive('assetSrc', function(aerobatic) {
  return function(scope, element, attrs) {
    element.attr('src', aerobatic.cdnUrl + '/' + attrs.assetSrc);
  };
});
