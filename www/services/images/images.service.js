(function() {
    'use strict';

    angular.module('provider')
        .service('ImagesService', ImagesService);

    function ImagesService (Restangular, AlertsService) {

        var _imagesService = Restangular.all('services');

        this.imagesList = imagesList;
        this.certificatesList = certificatesList;
        this.remove = remove;

        function imagesList (service) {
            return _imagesService.one(service.id).all('images').getList();
        }

        function certificatesList (service) {
            return _imagesService.one(service.id).all('images').getList({certificates: true});
        }

        function remove (image) {
            return image.remove()
                .then(function(response) {
                    if(response.success) {
                        AlertsService.success(response.alert);
                        return;
                    }
                    else {
                        AlertsService.error(response.alert);
                        throw response;
                    }
                });
        }

    }

})();
