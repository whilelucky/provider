(function() {
    'use strict';

    angular.module('provider', [
        'ionic',
        'toastr',
        'restangular'
    ]);

    angular.module('provider')
        .run(run);

    function run ($ionicPlatform, $rootScope, AuthenticationService) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            AuthenticationService.checkUser(event, toState);
        });
    }

})();
