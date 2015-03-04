(function () {
    'use strict';

    angular.module('provider')
        .service('RequestsService', RequestsService);

    function RequestsService(Restangular, AlertsService, AuthenticationService) {

        var _requestsService = Restangular.all('requests');

        this.sentRequests = sentRequests;
        this.receivedRequests = receivedRequests;
        this.accept = accept;
        this.decline = decline;
        this.create = create;
        this.remove = remove;


        function sentRequests() {
            return _requestsService.getList({sent_requests: true, user_id: AuthenticationService.user.id});
        }

        function receivedRequests() {
            return _requestsService.getList({received_requests: true, user_id: AuthenticationService.user.id});
        }

        function accept(request) {
            request.status = 'accepted';
            return request.put()
                .then(function (response) {
                    if (response.success) {
                        return;
                    }
                    else {
                        AlertService.error('Failed to accept request');
                        throw response;
                    }
                });
        }

        function decline(request) {
            request.status = 'declined';
            return request.put()
                .then(function (response) {
                    if (response.success) {
                        return;
                    }
                    else {
                        AlertService.error('Failed to decline request');
                        throw response;
                    }
                });
        }

        function create(request) {
            request.user_id = AuthenticationService.user.id;
            return _requestsService.post(request)
                .then(function (response) {
                    if (response.success) {
                        AlertsService.success(response.alert);
                        return;
                    }
                    else {
                        AlertsService.error(response.alert);
                        throw response;
                    }
                });
        }

        function remove(request) {
            return _requestsService.one(request.id).remove()
                .then(function (response) {
                    if (response.success) {
                        AlertsService.success(response.alert);
                        return;
                    }
                    else {
                        AlertsService.error(response.alert);
                        throw response;
                    }
                });
        }

    }

})();
