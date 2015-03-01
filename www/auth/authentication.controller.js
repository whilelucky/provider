(function() {
    'use strict';

    angular.module('provider')
        .controller('AuthenticationController', AuthenticationController);

    function AuthenticationController ($scope, $state, $ionicModal, AuthenticationService, CordovaService) {

        var vm = this;

        vm.user = {};
        vm.login = login;
        vm.register = register;
        vm.showRegisterForm = showRegisterForm;
        vm.hideRegisterForm = hideRegisterForm;

        activate();

        function activate () {
//            angular.element('#loading-bar').remove();
            if(! _.isEmpty(AuthenticationService.user)) {
                $state.go('app.explore')
            }
        }

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
            CordovaService.getGpsCoordinates()
                .then(function(position) {
                    vm.user.gps_latitude = position.coords.latitude;
                    vm.user.gps_longitude = position.coords.longitude;
                    AuthenticationService.create(vm.user)
                        .then(hideRegisterForm);
                });
        }

    }

})();
