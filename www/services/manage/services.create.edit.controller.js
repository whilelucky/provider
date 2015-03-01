(function() {
    'use strict';

    angular.module('provider')
        .controller('ServicesCreateEditController', ServicesCreateEditController);

    function ServicesCreateEditController ($scope, $state, $ionicActionSheet, ServicesService, ImagesService, CordovaService) {

        var vm = this;

        vm.service = {};
        vm.newService = {};
        vm.serviceTypeList = [];
        vm.imageList = [];
        vm.showImageOptions = showImageOptions;
        vm.getImageList = getImageList;
        vm.getGpsCoordinates = getGpsCoordinates;
        vm.submit = submit;
        vm.pickImages = pickImages;
        vm.update = update;

        activate();

        function activate () {
            vm.service = ServicesService.service;
            getImageList();
            ServicesService.serviceTypeList()
                .then(function (serviceTypeList) {
                    vm.serviceTypeList = serviceTypeList;
                });
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

        function submit () {
            CordovaService.getGpsCoordinates()
                .then(function(position) {
                    vm.newService.gps_latitude = position.coords.latitude;
                    vm.newService.gps_longitude = position.coords.longitude;
                    ServicesService.create(vm.newService)
                        .then(function() {
                            $state.go('app.services.my-services');
                        });
                });
        }

        function update () {
            ServicesService.update(vm.service)
                .then(function() {
                    $state.go('app.services.my-services');
                });
        }

        function getGpsCoordinates () {
            CordovaService.getGpsCoordinates()
                .then(function(position) {
                    vm.service.gps_latitude = position.coords.latitude;
                    vm.service.gps_longitude = position.coords.longitude;
                });
        }

        function showImageOptions (image) {
            $ionicActionSheet.show({
                destructiveText: 'Delete',
                destructiveButtonClicked: function() {
                    deleteImage(image);
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
