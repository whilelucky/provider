(function () {
    'use strict';

    angular.module('provider')
        .controller('MyLaboursController', MyLaboursController);

    function MyLaboursController($scope, $state, $ionicActionSheet, LaboursService) {

        var vm = this;

        vm.myLaboursList = [];
        vm.showOptions = showOptions;

//        activate();

        function activate() {
            vm.myLaboursList = LaboursService.myLabours;
            LaboursService.myList()
                .then(function (myLabours) {
                    LaboursService.myLabours = myLabours;
                    vm.myLaboursList = myLabours;
                });
        }

        $scope.$on('$ionicView.enter', function () {
            activate();
        });

        function showLabour(labour) {
            LaboursService.labour = labour;
            $state.go('app.labours.show', {id: labour.id});
        }

        function editLabour(labour) {
            LaboursService.labour = labour;
            $state.go('app.labours.edit');
        }

        function editLabourImages(labour) {
            LaboursService.labour = labour;
            $state.go('app.labours.images');
        }

        function editLabourCertificates(labour) {
            LaboursService.labour = labour;
            $state.go('app.labours.certificates');
        }

        function deleteLabour(labour) {
            LaboursService.remove(labour)
                .then(activate);
        }

        function showOptions(labour) {
            $ionicActionSheet.show({
                titleText: 'Modify Service',
                buttons: [
                    { text: 'View' },
                    { text: 'Edit' },
                    { text: 'Images' },
                    { text: 'Certificates' }
                ],
                destructiveText: 'Delete',
                destructiveButtonClicked: function () {
                    if (confirm('Are you sure you want to delete this service?')) {
                        deleteLabour(labour);
                    }
                    return true;
                },
                cancelText: 'Cancel',
                buttonClicked: function (index) {
                    if (index === 0) {
                        showLabour(labour);
                    }
                    if (index === 1) {
                        editLabour(labour);
                    }
                    else if (index === 2) {
                        editLabourImages(labour);
                    }
                    else if (index === 3) {
                        editLabourCertificates(labour);
                    }
                    return true;
                }
            });
        }

    }

})();
