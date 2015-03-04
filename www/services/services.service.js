(function () {
    'use strict';

    angular.module('provider')
        .service('ServicesService', ServicesService);

    function ServicesService(Restangular, AuthenticationService, AlertsService) {

        var _servicesService = Restangular.all('services');

        this.service = {};
        this.myServices = [];
        this.list = list;
        this.myList = myList;
        this.create = create;
        this.update = update;
        this.remove = remove;
        this.serviceTypeList = serviceTypeList;

        function list() {
            return _servicesService.getList({user_id: AuthenticationService.user.id});
        }

        function myList() {
            return _servicesService.getList({user_id: AuthenticationService.user.id, my_services: true});
        }

        function serviceTypeList() {
            return Restangular.all('service-types').getList();
        }

        function create(service) {
            service.user_id = AuthenticationService.user.id;
            return _servicesService.post(service)
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

        function update(service) {
            return service.put()
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

        function remove(service) {
            return service.remove()
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
