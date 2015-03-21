(function () {
    'use strict';

    angular.module('provider')
        .service('AuthenticationService', AuthenticationService);

    function AuthenticationService($state, localStorageService, Restangular, AlertsService) {

        this.user = {};
        this.login = login;
        this.logout = logout;
        this.create = create;
        this.update = update;
        this.checkUser = checkUser;

        var parent = this;
        var _authenticationService = Restangular;

        function login(user) {
            return _authenticationService.one('login').post(null, user)
                .then(function (response) {
                    if (response.success) {
                        localStorageService.set('user', response.user);
                        parent.user = response.user;
                        return;
                    }
                    else {
                        AlertsService.error(response.alert);
                        throw response;
                    }
                });
        }

        function logout() {
            return _authenticationService.one('logout').get()
                .then(function (response) {
                    if (response.success) {
                        localStorageService.remove('user');
                        parent.user = {};
                        return;
                    }
                    else {
                        AlertsService.error(response.alert);
                        throw response;
                    }
                });
        }

        function create(user) {
            if (user.password !== user.confirm_password) {
                AlertsService.error('Password mismatch');
                throw {};
            }
            else {
                return _authenticationService.all('users').post(user)
                    .then(function (response) {
                        if (response.success) {
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

        function update(user) {
            _authenticationService.all('users').one(user.id).put(user)
                .then(function (response) {
                    if (response.success) {
                        localStorageService.set('user', response.user);
                        parent.user = response.user;
                        AlertsService.success(response.alert);
                        return;
                    }
                    else {
                        AlertsService.error(response.alert);
                        throw response;
                    }
                });
        }

        function checkUser(event, toState) {
            parent.user = localStorageService.get('user');
            if ((toState.url !== 'login') && _.isEmpty(parent.user)) {
                $state.go('login');
//                AlertsService.success('Please Login');
//                event.preventDefault();
            }
        }
    }

})();
