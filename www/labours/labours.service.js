(function () {
    'use strict';

    angular.module('provider')
        .service('LaboursService', LaboursService);

    function LaboursService(Restangular, AuthenticationService, AlertsService) {

        var _laboursService = Restangular.all('services');

        this.labour = {};
        this.myLabours = [];
        this.list = list;
        this.myList = myList;
        this.create = create;
        this.update = update;
        this.remove = remove;
        this.labourTypeList = labourTypeList;

        function list() {
            return _laboursService.getList({user_id: AuthenticationService.user.id});
        }

        function myList() {
            return _laboursService.getList({user_id: AuthenticationService.user.id, my_services: true});
        }

        function labourTypeList() {
            return Restangular.all('service-types').getList();
        }

        function create(labour) {
            labour.user_id = AuthenticationService.user.id;
            return _laboursService.post(labour)
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

        function update(labour) {
            return labour.put()
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

        function remove(labour) {
            return labour.remove()
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
