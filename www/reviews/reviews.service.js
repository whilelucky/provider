(function() {
    'use strict';

    angular.module('provider')
        .service('ReviewsService', ReviewsService);

    function ReviewsService ($rootScope, Restangular, ServicesService, AuthenticationService, AlertsService) {

        var _reviewsService = Restangular.all('services');

        this.list = list;
        this.create = create;
        this.update = update;
        this.remove = remove;

        function list () {
            return _reviewsService.one(ServicesService.service.id).all('reviews').getList();
        }

        function create (review) {
            review.user_id = AuthenticationService.user.id;
            _reviewsService.one(ServicesService.service.id).all('reviews').post(review)
                .then(function (response) {
                    if(response.success) {
                        $rootScope.$broadcast('reviews.create');
                        AlertsService.success(response.alert);
                    }
                    else {
                        AlertsService.error(response.alert);
                    }
                });
        }

        function update (review) {
            review.put()
                .then(function (response) {
                    if(response.success) {
                        $rootScope.$broadcast('reviews.update');
                    }
                });
        }

        function remove (review) {
            review.remove()
                .then(function (response) {
                    if(response.success) {
                        $rootScope.$broadcast('reviews.remove');
                        AlertsService.success(response.alert);
                    }
                    else {
                        AlertsService.error(response.alert);
                    }
                });
        }

    }

})();
