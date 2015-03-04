(function () {
    'use strict';

    angular.module('provider')
        .controller('AuthenticationController', AuthenticationController);

    function AuthenticationController($scope, $state, $ionicHistory, $ionicModal, AuthenticationService, CordovaService) {

        var vm = this;

        vm.user = {};
        vm.login = login;
        vm.register = register;
        vm.showRegisterForm = showRegisterForm;
        vm.hideRegisterForm = hideRegisterForm;
        vm.getGpsPosition = getGpsPosition;

        $ionicModal.fromTemplateUrl('auth/register.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        activate();

        function activate() {
            if (!_.isEmpty(AuthenticationService.user)) {
                gotoHomePage();
            }
        }

//        function login() {
//            AuthenticationService.login(vm.user)
//                .then(gotoHomePage);
//        }

        //remove this function in prod and uncomment above login function
        function login() {
            if (!_.isEmpty(vm.user)) {
                AuthenticationService.login(vm.user)
                    .then(gotoHomePage);
            }
            else {
                AuthenticationService.login({email: 'lakie@ranganath', password: 'lakie'})
                    .then(gotoHomePage);
            }
        }

        function showRegisterForm() {
            $scope.modal.show();
        }

        function hideRegisterForm() {
            $scope.modal.hide();
        }

        function register() {
            AuthenticationService.create(vm.user)
                .then(hideRegisterForm);
        }

        function getGpsPosition() {
            CordovaService.getGpsPosition()
                .then(function (position) {
                    vm.user.gps_latitude = position.coords.latitude;
                    vm.user.gps_longitude = position.coords.longitude;
                });
        }

        function gotoHomePage() {
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                historyRoot: true
            });
            $state.go('app.explore');
        }

    }

})();
