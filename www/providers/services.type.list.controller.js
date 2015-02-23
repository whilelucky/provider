(function() {
    'use strict';

    angular.module('provider')
        .controller('ServicesTypeListController', ServicesTypeListController);

    function ServicesTypeListController ($scope, $stateParams, $state, ServicesService) {

        var vm = this;

        vm.serviceType = '';
        vm.servicesList = [];
        vm.refresh = refresh;
        vm.showService = showService;


        activate();

        function activate () {
            vm.serviceType = $stateParams.type;
            ServicesService.list(vm.serviceType)
                .then(function (servicesList) {
                    vm.servicesList = servicesList;
                });
        }

        function refresh () {
            ServicesService.list(vm.serviceType)
                .then(function (services) {
                    vm.servicesList = services;
                    $scope.$broadcast('scroll.refreshComplete')
                });
        }

        function showService (service) {
            ServicesService.service = service;
            $state.go('app.services.show', {id: service.id});
        }


    }

})();
