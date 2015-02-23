(function() {
    'use strict';

    angular.module('provider')
        .service('RequestsService', RequestsService);

    function RequestsService ($rootScope, Restangular, AlertsService, AuthenticationService) {

        var _requestsService = Restangular.all('requests');

        this.sentRequests = sentRequests;
        this.receivedRequests = receivedRequests;
        this.accept = accept;
        this.decline = decline;
        this.create = create;
        this.remove = remove;


        function sentRequests () {
            return _requestsService.getList({sent_requests: true, user_id: AuthenticationService.user.id});
        }

        function receivedRequests () {
            return _requestsService.getList({received_requests: true, user_id: AuthenticationService.user.id});
        }

        function accept (request) {
            request.status = 'accepted';
            request.put()
                .then(function (response) {
                    if(response.success) {
                        $rootScope.$broadcast('requests.update');
                    }
                });
        }

        function decline (request) {
            request.status = 'declined';
            request.put()
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
