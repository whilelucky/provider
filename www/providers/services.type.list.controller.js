(function() {
    'use strict';

    angular.module('provider')
        .controller('ServicesTypeListController', ServicesTypeListController);

    function ServicesTypeListController ($stateParams, $state, ServicesService) {

        var vm = this;

        vm.serviceType = '';
        vm.servicesList = [];
        vm.showService = showService;


        activate();

        function activate () {
            vm.serviceType = $stateParams.type;
            // vm.servicesList = ServicesService.list().$object;
            vm.servicesList = [
                {'id': 1, 'business_name': 'Muthuraj Electricans'},
                {'id': 2, 'business_name': 'Bobby Electricans'},
                {'id': 3, 'business_name': 'Lolipop Electricans'}
            ];
        }

        function showService (service) {
            ServicesService.service = service;
            $state.go('app.services.show', {id: service.id});
        }


    }

})();
