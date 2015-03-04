(function () {
    'use strict';

    angular.module('provider')
        .controller('RequestsController', RequestsController);

    function RequestsController($scope, RequestsService) {

        var vm = this;

        vm.sentRequestsList = [];
        vm.receivedRequestsList = [];
        vm.getSentRequests = getSentRequests;
        vm.getReceivedRequests = getReceivedRequests;
        vm.acceptRequest = acceptRequest;
        vm.declineRequest = declineRequest;
        vm.cancelRequest = cancelRequest;

//        activate();

        function activate() {
            getSentRequests();
            getReceivedRequests();
        }

        $scope.$on('$ionicView.enter', function () {
            activate();
        });

        function getSentRequests() {
            RequestsService.sentRequests()
                .then(function (sentRequestsList) {
                    vm.sentRequestsList = sentRequestsList;
                    $scope.$broadcast('scroll.refreshComplete')
                });
        }

        function getReceivedRequests() {
            RequestsService.receivedRequests()
                .then(function (receivedRequestsList) {
                    vm.receivedRequestsList = receivedRequestsList;
                    $scope.$broadcast('scroll.refreshComplete')
                });
        }

        function acceptRequest(request) {
            RequestsService.accept(request)
                .then(getReceivedRequests);
        }

        function declineRequest(request) {
            RequestsService.decline(request)
                .then(getReceivedRequests);
        }

        function cancelRequest(request) {
            RequestsService.remove(request)
                .then(getSentRequests);
        }

    }

})();
