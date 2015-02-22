(function() {
    'use strict';

    angular.module('provider')
        .controller('ExploreController', ExploreController);

    function ExploreController (ExploreService) {

        var vm = this;

        vm.serviceTypes = [];

        activate();

        function activate () {
            vm.serviceTypes = ExploreService.list().$object;
        }

    }

})();
