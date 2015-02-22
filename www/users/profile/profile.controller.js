(function() {
    'use strict';

    angular.module('provider')
        .controller('ProfileController', ProfileController);

    function ProfileController (AuthenticationService) {

        var vm = this;

        vm.user = {};
        vm.save = save;

        activate();

        function activate () {
            vm.user = AuthenticationService.user;
        }

        function save () {
            AuthenticationService.update(vm.user);
        }

    }

})();
