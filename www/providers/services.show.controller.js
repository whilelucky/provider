(function() {
    'use strict';

    angular.module('provider')
        .controller('ServicesShowController', ServicesShowController);

    function ServicesShowController ($stateParams, ServicesService) {

        var vm = this;

        vm.service = {};


        activate();


        function activate () {
            vm.service = ServicesService.service;
        }

    }

})();
