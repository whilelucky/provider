(function() {
    'use strict';

    angular.module('provider')
        .controller('ProfileController', ProfileController);

    function ProfileController ($scope, $state, AuthenticationService, CordovaService) {

        var vm = this;

        vm.user = {};
        vm.save = save;
        vm.logout = logout;
        vm.getGpsPosition = getGpsPosition;

//        activate();

        function activate () {
            vm.user = AuthenticationService.user;
        }

        $scope.$on('$ionicView.enter', function() {
            activate();
        });

        function getGpsPosition () {
            CordovaService.getGpsPosition()
                .then(function(position) {
                    vm.user.gps_latitude = position.coords.latitude;
                    vm.user.gps_longitude = position.coords.longitude;
                });
        }

        function save () {
            AuthenticationService.update(vm.user);
        }

        function logout () {
            AuthenticationService.logout()
                .then(function () {
                    $state.go('login');
                });
        }

    }

})();
