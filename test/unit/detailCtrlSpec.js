// http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-karma.html#testing-controllers

describe("detailCtrl", function() {
	var scope, ctrl, thingMock;

	beforeEach(function() {
		// We need to define a global variable to prevent our app from breaking
		window.__config__ = {};

		// module('angularSeed');
		module('seedControllers');

    thingMock = {
      find: function(id) {
        return {id: id};
      }
    };
	});

	it('should have a properly working DetailCtrl', function() {
    inject(function($rootScope, $controller) {
      scope = $rootScope.$new();

      ctrl = $controller("DetailCtrl", {
        $scope: scope,
        $routeParams: {id: 2},
				aerobatic: { cdnUrl: 'http://cdn.com' },
        Thing: thingMock
      });
	  });

		expect(scope.thing).toBeDefined();
    expect(scope.thing.id).toEqual(2);
  });
});
