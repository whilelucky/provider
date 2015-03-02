(function() {
    'use strict';

    angular.module('provider')
        .service('CordovaService', CordovaService);

    function CordovaService ($rootScope, $ionicPlatform, $cordovaGeolocation, $cordovaImagePicker, $cordovaFileTransfer, AlertsService, $q) {

        this.getGpsCoordinates = getGpsCoordinates;
        this.pickImages = pickImages;
        this.uploadImages = uploadImages;


        function getGpsCoordinates () {
            var posOptions = {timeout: 10000, enableHighAccuracy: true};
            return $cordovaGeolocation.getCurrentPosition(posOptions)
                .then(function(position) {
                    AlertsService.success('Received current location');
                    return position;
                }, function(err) {
                    AlertsService.error('Please turn on location services (GPS) and try again');
                    throw err;
                });
        }


        function pickImages () {
            var options = {
                maximumImagesCount: 5,
                width: 0,
                height: 0,
                quality: 100
            };

            $ionicPlatform.ready(function() {
                return $cordovaImagePicker.getPictures(options)
                    .then(function (results) {
                        $rootScope.$broadcast('images.picked', results);
                    }, function(err) {
                        AlertsService.error('Could not get images');
                        throw err;
                    });
            });
        }


        function uploadImages (service, imageList, params) {
            var serverPath = "http://provider.creativevortex.in/public/services/"+service.id+"/images";
            AlertsService.info('Uploading files, this may take a while');

            var uploadPromises = [];

            angular.forEach(imageList, function (imageURI) {
                var options = {
                    fileKey: "image",
                    fileName: imageURI.substr(imageURI.lastIndexOf('/')+1),
                    mimeType: "image/jpeg",
                    params: params
                };

                uploadPromises.push(
                    $cordovaFileTransfer.upload(serverPath, imageURI, options)
                        .then(function(results) {
                            AlertsService.success('Uploaded ' + options.fileName);
                            return;
                        }, function(err) {
                            AlertsService.error('Could not upload ' + options.fileName);
                            throw err;
                        }, function (progress) {
//                            constant progress updates
                        })
                );
            });

            $q.all(uploadPromises)
                .then(function() {
                    $rootScope.$broadcast('images.uploaded');
                    AlertsService.success('Upload complete');
                });

        }


    }

})();
