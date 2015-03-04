(function () {
    'use strict';

    angular.module('provider')
        .controller('ServicesCreateEditController', ServicesCreateEditController);

    function ServicesCreateEditController($state, ServicesService, CordovaService) {

        var vm = this;

        vm.service = {};
        vm.newService = {};
        vm.serviceTypeList = [];
        vm.submit = submit;
        vm.update = update;
        vm.getGpsPosition = getGpsPosition;

        activate();

        function activate() {
            vm.service = ServicesService.service;
            ServicesService.serviceTypeList()
                .then(function (serviceTypeList) {
                    vm.serviceTypeList = serviceTypeList;
                });
        }

        function submit() {
            ServicesService.create(vm.newService)
                .then(function () {
                    $state.go('app.services.my-services');
                });
        }

        function update() {
            ServicesService.update(vm.service)
                .then(function () {
                    $state.go('app.services.my-services');
                });
        }

        function getGpsPosition() {
            CordovaService.getGpsPosition()
                .then(function (position) {
                    vm.newService.gps_latitude = position.coords.latitude;
                    vm.newService.gps_longitude = position.coords.longitude;
                    vm.service.gps_latitude = position.coords.latitude;
                    vm.service.gps_longitude = position.coords.longitude;
                });
        }

    }

})();
