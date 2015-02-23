(function() {
    'use strict';

    angular.module('provider')
        .controller('RequestsController', RequestsController);

    function RequestsController ($scope, RequestsService) {

        var vm = this;

        vm.sentRequestsList = [];
        vm.receivedRequestsList = [];
        vm.acceptRequest = acceptRequest;
        vm.declineRequest = declineRequest;
        vm.cancelRequest = cancelRequest;

        activate();

        function activate () {
            RequestsService.sentRequests()
                .then(function (sentRequestsList) {
                    vm.sentRequestsList = sentRequestsList;
                });
            RequestsService.receivedRequests()
                .then(function (receivedRequestsList) {
                    vm.receivedRequestsList = receivedRequestsList;
                });
        }

        $scope.$on('$stateChangeSuccess', function() {
            activate();
        });

        function acceptRequest (request) {
            RequestsService.accept(request);
        }

        function declineRequest (request) {
            RequestsService.decline(request);
        }

        function cancelRequest (request) {
            RequestsService.remove(request);
        }

        $scope.$on('requests.update', activate);
        $scope.$on('requests.remove', activate);

    }

})();
