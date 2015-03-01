(function() {
    'use strict';

    angular.module('provider')
        .controller('MyServicesController', MyServicesController);

    function MyServicesController ($scope, $state, $ionicActionSheet, ServicesService) {

        var vm = this;

        vm.myServicesList = [];
        vm.showOptions = showOptions;

        activate();

        function activate () {
            ServicesService.myList()
                .then(function(myServicesList) {
                    vm.myServicesList = myServicesList;
                });
        }

        $scope.$on('$ionicView.enter', function() {
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

        function editServiceImages (service) {
            ServicesService.service = service;
            $state.go('app.services.images');
        }

        function editServiceCertificates (service) {
            ServicesService.service = service;
            $state.go('app.services.certificates');
        }

        function deleteService (service) {
            ServicesService.remove(service)
                .then(activate);
        }

        function showOptions (service) {
            $ionicActionSheet.show({
                titleText: 'Modify Service',
                buttons: [
                    { text: 'View' },
                    { text: 'Edit' },
                    { text: 'Images' },
                    { text: 'Certificates' }
                ],
                destructiveText: 'Delete',
                destructiveButtonClicked: function() {
                    if(confirm('Are you sure you want to delete this service?')) {
                        deleteService(service);
                    }
                    return true;
                },
                cancelText: 'Cancel',
                buttonClicked: function(index) {
                    if (index === 0) {
                        showService(service);
                    }
                    if (index === 1) {
                        editService(service);
                    }
                    else if (index === 2) {
                        editServiceImages(service);
                    }
                    else if (index === 3) {
                        editServiceCertificates(service);
                    }
                    return true;
                }
            });
        }

    }

})();
