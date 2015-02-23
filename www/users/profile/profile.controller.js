(function() {
    'use strict';

    angular.module('provider')
        .controller('ProfileController', ProfileController);

    function ProfileController ($scope, AuthenticationService) {

        var vm = this;

        vm.user = {};
        vm.save = save;
        vm.logout = logout;

        activate();

        function activate () {
            vm.user = AuthenticationService.user;
        }

        $scope.$on('$stateChangeSuccess', function() {
            activate();
        });

        function save () {
            AuthenticationService.update(vm.user);
        }

        function logout () {
            AuthenticationService.logout();
        }

    }

})();
