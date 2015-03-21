(function () {
    'use strict';

    angular.module('provider')
        .controller('LaboursCreateEditController', LaboursCreateEditController);

    function LaboursCreateEditController($state, LaboursService, CordovaService) {

        var vm = this;

        vm.labour = {};
        vm.newLabour = {};
        vm.labourTypeList = [];
        vm.submit = submit;
        vm.update = update;
        vm.getGpsPosition = getGpsPosition;

        activate();

        function activate() {
            vm.labour = LaboursService.labour;
            LaboursService.labourTypeList()
                .then(function (labourTypeList) {
                    vm.labourTypeList = labourTypeList;
                });
        }

        function submit() {
            LaboursService.create(vm.newLabour)
                .then(function () {
                    $state.go('app.labours.my-labours');
                });
        }

        function update() {
            LaboursService.update(vm.labour)
                .then(function () {
                    $state.go('app.labours.my-labours');
                });
        }

        function getGpsPosition() {
            CordovaService.getGpsPosition()
                .then(function (position) {
                    vm.newLabour.gps_latitude = position.coords.latitude;
                    vm.newLabour.gps_longitude = position.coords.longitude;
                    vm.labour.gps_latitude = position.coords.latitude;
                    vm.labour.gps_longitude = position.coords.longitude;
                });
        }

    }

})();
