(function() {
    'use strict';

    angular.module('provider')
        .service('AuthenticationService', AuthenticationService);

    function AuthenticationService ($state, $rootScope, Restangular, AlertsService) {

        this.user = {id: "1", gps_latitude: "12.905226", gps_longitude: "77.564661"};
//        this.user = {};
        this.login = login;
        this.logout = logout;
        this.create = create;
        this.update = update;
        this.checkUser = checkUser;

        var parent = this;
        var _authenticationService = Restangular;

        function login (user) {
            _authenticationService.one('login').post(null, user)
                .then(function (response) {
                    if(response.success) {
                        parent.user = response.user;
                        $state.go('app.explore');
                    }
                    else {
                        AlertsService.error(response.alert);
                    }
                });
        }

        function logout () {
//            _authenticationService.one('logout').get()
//                .then(function (response) {
//                    if(response.success) {
                        parent.user = {};
                        $state.go('login');
                        AlertsService.success('Logged out');
//                    }
//                    else {
//                        AlertsService.error(response.alert);
//                    }
//                })
        }

        function create (user) {
            if(user.password !== user.repeat_password) {
                AlertsService.error('Password mismatch');
                throw {};
            }
            else {
                return _authenticationService.all('users').post(user)
                    .then(function (response) {
                        if(response.success) {
                            AlertsService.success(response.alert);
                            return;
                        }
                        else {
                            AlertsService.error(response.alert);
                            throw {};
                        }
                    });
            }
        }

        function update (user) {
            _authenticationService.all('users').one(user.id).put(user)
                .then(function (response) {
                    if(response.success) {
                        parent.user = response.user;
                        $rootScope.$broadcast('user.update');
                        AlertsService.success(response.alert);
                    }
                    else {
                        AlertsService.error(response.alert);
                    }
                });
        }

        function checkUser(event, toState) {
            if( (toState.url !== 'login' && toState.url !== 'register') && _.isEmpty(parent.user)) {
                $state.go('login');
//                AlertsService.success('Please Login');
//                event.preventDefault();
            }
        }
    }

})();
