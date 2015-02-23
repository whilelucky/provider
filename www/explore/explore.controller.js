(function() {
    'use strict';

    angular.module('provider')
        .controller('ExploreController', ExploreController);

    function ExploreController (ExploreService) {

        var vm = this;

        vm.serviceTypes = [];

        activate();

        function activate () {
            ExploreService.list()
                .then(function (serviceTypes) {
                    vm.serviceTypes = serviceTypes;
                });
        }

    }

})();
