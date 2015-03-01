(function() {
    'use strict';

    angular.module('provider')
        .controller('ProfileController', ProfileController);

    function ProfileController ($scope, AuthenticationService, CordovaService) {

        var vm = this;

        vm.user = {};
        vm.getGpsCoordinates = getGpsCoordinates;
        vm.save = save;
        vm.logout = logout;

        activate();

        function activate () {
            vm.user = AuthenticationService.user;
        }

        $scope.$on('$stateChangeSuccess', function() {
            activate();
        });

        function getGpsCoordinates () {
            CordovaService.getGpsCoordinates()
                .then(function(position) {
                    vm.user.gps_latitude = position.coords.latitude;
                    vm.user.gps_longitude = position.coords.longitude;
                });
        }

        function save () {
            AuthenticationService.update(vm.user);
        }

        function logout () {
            AuthenticationService.logout();
        }

    }

})();
