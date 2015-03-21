(function () {
    'use strict';

    angular.module('provider')
        .service('ReviewsService', ReviewsService);

    function ReviewsService(Restangular, LaboursService, AuthenticationService, AlertsService) {

        var _reviewsService = Restangular.all('services');

        this.list = list;
        this.create = create;
        this.update = update;
        this.remove = remove;

        function list() {
            return _reviewsService.one(LaboursService.labour.id).all('reviews').getList();
        }

        function create(review) {
            review.user_id = AuthenticationService.user.id;
            return _reviewsService.one(LaboursService.labour.id).all('reviews').post(review)
                .then(function (response) {
                    if (response.success) {
                        AlertsService.success(response.alert);
                        return;
                    }
                    else {
                        AlertsService.error(response.alert);
                        throw response;
                    }
                });
        }

        function update(review) {
            return review.put()
                .then(function (response) {
                    if (response.success) {
                        AlertsService.success(response.alert);
                        return;
                    }
                    else {
                        AlertsService.success(response.alert);
                        throw response;
                    }
                });
        }

        function remove(review) {
            return review.remove()
                .then(function (response) {
                    if (response.success) {
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
