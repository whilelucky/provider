(function() {
    'use strict';

    angular.module('provider')
        .controller('MyServicesController', MyServicesController);

    function MyServicesController ($scope, $state, $ionicActionSheet, ServicesService) {

        var vm = this;

        vm.myServicesList = [];
        vm.showService = showService;
        vm.editService = editService;
        vm.deleteService = deleteService;
        vm.showOptions = showOptions;

        activate();

        function activate () {
            ServicesService.myList()
                .then(function (myServicesList) {
                    vm.myServicesList = myServicesList;
                });
        }

        $scope.$on('$stateChangeSuccess', function() {
            activate();
        });

        function showService (service) {
            ServicesService.service = service;
            $state.go('app.services.show', {id: service.id});
        }

        function editService (service) {
            ServicesService.service = service;
            $state.go('app.services.edit');
        }

        function deleteService (service) {
            ServicesService.remove(service);
        }

        function showOptions (service) {
            $ionicActionSheet.show({
                buttons: [
                    { text: 'Edit' }
                ],
                destructiveText: 'Delete',
                destructiveButtonClicked: function() {
                    vm.deleteService(service);
                    return true;
                },
                titleText: 'Modify Service',
                cancelText: 'Cancel',
                buttonClicked: function(index) {
                    if (index === 0) {
                        vm.editService(service);
                    }
                    return true;
                }
            });
        }

        $scope.$on('services.update', activate);
        $scope.$on('services.remove', activate);

    }

})();
