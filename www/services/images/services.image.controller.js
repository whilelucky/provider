(function() {
    'use strict';

    angular.module('provider')
        .controller('ServicesImageController', ServicesImageController);

    function ServicesImageController ($scope, $state, $ionicActionSheet, ServicesService, ImagesService, CordovaService) {

        var vm = this;

        vm.service = {};
        vm.imageList = [];
        vm.showImageOptions = showImageOptions;
        vm.getImageList = getImageList;
        vm.pickImages = pickImages;

        activate();

        function activate () {
            vm.service = ServicesService.service;
            getImageList();
        }

        function getImageList () {
            ImagesService.list(vm.service)
                .then(function(images) {
                    vm.imageList = images;
                });
        }

        function pickImages () {
            CordovaService.pickImages();
        }

        function deleteImage (image) {
            ImagesService.remove(image)
                .then(getImageList);
        }

        function showImageOptions (image) {
            $ionicActionSheet.show({
                destructiveText: 'Delete',
                destructiveButtonClicked: function() {
                    if(confirm('Are you sure you want to delete this image?')) {
                        deleteImage(image);
                    }
                    return true;
                },
                titleText: 'Modify Image',
                cancelText: 'Cancel'
            });
        }

        $scope.$on('images.picked', function(event, images) {
            if($state.current.url === '/images') {
                CordovaService.uploadImages(vm.service, images, {});
            }
            else if($state.current.url === '/certificates') {
                CordovaService.uploadImages(vm.service, images, {certificate: 1});
            }
        });

        $scope.$on('images.uploaded', function() {
            getImageList();
        });

    }

})();
