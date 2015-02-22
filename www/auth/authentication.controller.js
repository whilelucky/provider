(function() {
    'use strict';

    angular.module('provider')
        .controller('AuthenticationController', AuthenticationController);

    function AuthenticationController ($scope, $ionicModal, AuthenticationService) {

        var vm = this;

        vm.user = {};
        vm.login = login;
        vm.register = register;
        vm.showRegisterForm = showRegisterForm;
        vm.hideRegisterForm = hideRegisterForm;

        $ionicModal.fromTemplateUrl('auth/register.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        function login () {
            AuthenticationService.login(vm.user);
        }

        function showRegisterForm () {
            $scope.modal.show();
        }

        function hideRegisterForm () {
            $scope.modal.hide();
        }

        function register () {
            AuthenticationService.create(vm.user);
        }

    }

})();
