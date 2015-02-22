(function() {
    'use strict';

    angular.module('provider')
        .service('AuthenticationService', AuthenticationService);

    function AuthenticationService ($state, $rootScope, Restangular, AlertsService) {

        this.user = {id: "1"};
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
            _authenticationService.one('logout').get()
                .then(function (response) {
                    if(response.success) {
                        parent.user = {};
                        $rootScope.$broadcast('user.loggedOut');
                    }
                    else {
                        AlertsService.error(response.alert);
                    }
                })
        }

        function create (user) {
            if(user.password !== user.repeat_password) {
                AlertsService.error('Password mismatch');
            }
            else {
                _authenticationService.all('users').post(user)
                    .then(function (response) {
                        if(response.success) {
                            login(user);
                        }
                        else {
                            AlertsService.error(response.alert);
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
                event.preventDefault();
                $state.go('app.login');
                AlertsService.error('Please login to continue');
            }

            else if(toState.url === 'login'  && !(_.isEmpty(parent.user))) {
                event.preventDefault();
                AlertsService.warning('Already logged in');
            }

        }
    }

})();
