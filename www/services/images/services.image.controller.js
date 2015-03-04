(function () {
    'use strict';

    angular.module('provider')
        .controller('ServicesImageController', ServicesImageController);

    function ServicesImageController($scope, $state, $ionicActionSheet, ServicesService, ImagesService, CordovaService) {

        var vm = this;

        vm.service = {};
        vm.imagesList = [];
        vm.showImageOptions = showImageOptions;
        vm.getImagesList = getImagesList;
        vm.pickImages = pickImages;

        activate();

        function activate() {
            vm.service = ServicesService.service;
            getImagesList();
        }

        function getImagesList() {
            if ($state.current.url === '/images') {
                ImagesService.imagesList(vm.service)
                    .then(function (images) {
                        vm.imagesList = images;
                    });
            }
            else if ($state.current.url === '/certificates') {
                ImagesService.certificatesList(vm.service)
                    .then(function (images) {
                        vm.imagesList = images;
                    });
            }
        }

        function pickImages() {
            CordovaService.pickImages();
        }

        function deleteImage(image) {
            ImagesService.remove(image)
                .then(getImagesList);
        }

        function showImageOptions(image) {
            $ionicActionSheet.show({
                destructiveText: 'Delete',
                destructiveButtonClicked: function () {
                    if (confirm('Are you sure you want to delete this image?')) {
                        deleteImage(image);
                    }
                    return true;
                },
                titleText: 'Modify Image',
                cancelText: 'Cancel'
            });
        }

        $scope.$on('images.picked', function (event, images) {
            if ($state.current.url === '/images') {
                CordovaService.uploadImages(vm.service, images, {});
            }
            else if ($state.current.url === '/certificates') {
                CordovaService.uploadImages(vm.service, images, {certificate: 1});
            }
        });

        $scope.$on('images.uploaded', function () {
            getImagesList();
        });

    }

})();
