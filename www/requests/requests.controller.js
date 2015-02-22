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
            vm.sentRequestsList = RequestsService.sentRequests().$object;
            vm.receivedRequestsList = RequestsService.receivedRequests().$object;
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
