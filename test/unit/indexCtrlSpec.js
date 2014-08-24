describe("indexCtrl", function() {
	var scope, ctrl;

	beforeEach(function() {
		// We need to define a global variable to prevent our app from breaking
		window.__config__ = {};

		// module('angularSeed');
		module('controllers');
	});

	it('should have a properly working IndexCtrl', function() {
    inject(function($rootScope, $controller) {
      scope = $rootScope.$new();

      ctrl = $controller("IndexCtrl", {
        $scope: scope,
				aerobatic: { cdnUrl: 'http://cdn.com' }
      });
	  });

    expect(scope.repoUrl).toEqual('https://github.com/aerobatic/angular-seed/');
  });
});
