(function() {
    'use strict';

    angular.module('provider')
        .controller('ServicesCreateController', ServicesCreateController);

    function ServicesCreateController ($scope, $state, ServicesService) {

        var vm = this;

        vm.service = {};
        vm.serviceTypeList = [];
        vm.submit = submit;

        activate();

        function activate () {
            vm.serviceTypeList = ServicesService.serviceTypeList().$object;
        }

        function submit () {
            ServicesService.create(vm.service);
        }

        $scope.$on('services.create', function() {
            $state.go('app.services.my-services');
        });

    }

})();
