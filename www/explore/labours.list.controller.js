(function () {
    'use strict';

    angular.module('provider')
        .controller('LaboursListController', LaboursListController);

    function LaboursListController($scope, $state, $ionicPopover, LaboursService) {

        var vm = this;

        vm.labourType = '';
        vm.laboursList = [];
        vm.labourTypeList = [];
        vm.range = 0;
        vm.filter = {};
        vm.popoverIcon = 'ion-android-funnel';
        vm.inRange = inRange;
        vm.refresh = refresh;
        vm.filterLabourType = filterLabourType;
        vm.showLabour = showLabour;

        $ionicPopover.fromTemplateUrl('explore/labours.types.popover.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
        });

        activate();

        function activate() {
            LaboursService.labourTypeList()
                .then(function (labourTypeList) {
                    vm.labourTypeList = labourTypeList;
                });
            vm.range = 1000;
            refresh();
        }

        function refresh() {
            LaboursService.list()
                .then(function (laboursList) {
                    vm.laboursList = laboursList;
                    $scope.$broadcast('scroll.refreshComplete')
                });
        }

        function showLabour(labour) {
            LaboursService.labour = labour;
            $state.go('app.labours.show', {id: labour.id});
        }

        function inRange(labour) {
            return labour.range <= vm.range;
        }

        function filterLabourType(labourType) {
            vm.filter.service_type_id = labourType.id;
            vm.popoverIcon = labourType.icon;
            $scope.popover.hide();
        }

    }

})();
