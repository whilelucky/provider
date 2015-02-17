(function() {
    'use strict';

    angular.module('provider')
        .controller('ServicesMyListController', ServicesMyListController);

    function ServicesMyListController ($state, ServicesService) {

        var vm = this;

        vm.myServicesList = [];
        vm.showService = showService;


        activate();

        function activate () {
            // vm.servicesList = ServicesService.list().$object;
            vm.myServicesList = [
                {'id': 1, 'business_name': 'Muthuraj Electricans'},
                {'id': 2, 'business_name': 'Bobby Carpenters'},
                {'id': 3, 'business_name': 'Lolipop Painters'}
            ];
        }

        function showService (service) {
            ServicesService.service = service;
            $state.go('app.services.show', {id: service.id});
        }


    }

})();
