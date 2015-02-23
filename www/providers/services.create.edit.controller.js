(function() {
    'use strict';

    angular.module('provider')
        .controller('ServicesCreateEditController', ServicesCreateEditController);

    function ServicesCreateEditController ($scope, $state, ServicesService) {

        var vm = this;

        vm.service = {};
        vm.newService = {};
        vm.serviceTypeList = [];
        vm.submit = submit;
        vm.update = update;

        activate();

        function activate () {
            vm.service = ServicesService.service;
            ServicesService.serviceTypeList()
                .then(function (serviceTypeList) {
                    vm.serviceTypeList = serviceTypeList;
                });
        }

        function submit () {
            ServicesService.create(vm.newService);
        }

        function update () {
            ServicesService.update(vm.service);
        }

        $scope.$on('services.create', function() {
            $state.go('app.services.my-services');
        });

        $scope.$on('services.update', function() {
            $state.go('app.services.my-services');
        });

    }

})();
