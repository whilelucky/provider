(function() {
    'use strict';

    angular.module('provider')
        .controller('ServicesListController', ServicesListController);

    function ServicesListController ($scope, $state, $ionicPopover, ServicesService) {

        var vm = this;

        vm.serviceType = '';
        vm.servicesList = [];
        vm.serviceTypeList = [];
        vm.range = 0;
        vm.filter = {};
        vm.popoverIcon = 'ion-funnel';
        vm.inRange = inRange;
        vm.refresh = refresh;
        vm.filterServiceType = filterServiceType;
        vm.showService = showService;

        $ionicPopover.fromTemplateUrl('explore/services.types.popover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });

        activate();

        function activate () {
            ServicesService.serviceTypeList()
                .then(function(serviceTypeList) {
                    vm.serviceTypeList = serviceTypeList;
                });
            vm.range = 1000;
            refresh();
        }

        function refresh () {
            ServicesService.list()
                .then(function(servicesList) {
                    vm.servicesList = servicesList;
                    $scope.$broadcast('scroll.refreshComplete')
                });
        }

        function showService (service) {
            ServicesService.service = service;
            $state.go('app.services.show', {id: service.id});
        }

        function inRange (service) {
            return service.range <= vm.range;
        }

        function filterServiceType (serviceType) {
            vm.filter.service_type_id = serviceType.id;
            vm.popoverIcon = serviceType.icon;
            $scope.popover.hide();
        }

    }

})();
