(function() {
    'use strict';

    angular.module('provider')
        .service('ImagesService', ImagesService);

    function ImagesService (Restangular, AlertsService) {

        var _imagesService = Restangular.all('services');

        this.list = list;
        this.remove = remove;

        function list (service) {
            return _imagesService.one(service.id).all('images').getList();
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
