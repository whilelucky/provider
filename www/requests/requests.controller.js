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
                .then(function(sentRequestsList) {
                    vm.sentRequestsList = sentRequestsList;
                });
            RequestsService.receivedRequests()
                .then(function(receivedRequestsList) {
                    vm.receivedRequestsList = receivedRequestsList;
                });
        }

        $scope.$on('$ionicView.enter', function() {
            activate();
        });

        function acceptRequest (request) {
            RequestsService.accept(request)
                .then(activate);
        }

        function declineRequest (request) {
            RequestsService.decline(request)
                .then(activate);
        }

        function cancelRequest (request) {
            RequestsService.remove(request)
                .then(activate);
        }

    }

})();
