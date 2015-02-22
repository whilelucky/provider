(function() {
    'use strict';

    angular.module('provider')
        .service('RequestsService', RequestsService);

    function RequestsService ($rootScope, $state, Restangular, AlertsService, AuthenticationService) {

        var _requestsService = Restangular.all('requests');

        this.sentRequests = sentRequests;
        this.receivedRequests = receivedRequests;
        this.accept = accept;
        this.decline = decline;
        this.create = create;
        this.remove = remove;


        function sentRequests () {
            return _requestsService.all('sent-requests').getList({user_id: AuthenticationService.user.id});
        }

        function receivedRequests () {
            return _requestsService.all('received-requests').getList({user_id: AuthenticationService.user.id});
        }

        function accept (request) {
            request.status = 'accepted';
            _requestsService.one(request.id).put(request)
                .then(function (response) {
                    if(response.success) {
                        $rootScope.$broadcast('requests.update');
                    }
                });
        }

        function decline (request) {
            request.status = 'declined';
            _requestsService.one(request.id).put(request)
                .then(function (response) {
                    if(response.success) {
                        $rootScope.$broadcast('requests.update');
                    }
                });
        }

        function create (request) {
            request.user_id = AuthenticationService.user.id;
            _requestsService.post(request)
                .then(function (response) {
                    if(response.success) {
                        $rootScope.$broadcast('requests.create');
                        AlertsService.success(response.alert);
                    }
                    else {
                        AlertsService.error(response.alert);
                    }
                });
        }

        function remove (request) {
            _requestsService.one(request.id).remove()
                .then(function (response) {
                    if(response.success) {
                        $rootScope.$broadcast('requests.remove');
                        AlertsService.success(response.alert);
                    }
                    else {
                        AlertsService.error(response.alert);
                    }
                });
        }

    }

})();
