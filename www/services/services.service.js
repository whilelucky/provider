(function() {
    'use strict';

    angular.module('provider')
        .service('ServicesService', ServicesService);

    function ServicesService (Restangular, AuthenticationService, AlertsService) {

        var _servicesService = Restangular.all('services');

        this.service = {};
        this.list = list;
        this.myList = myList;
        this.serviceTypeList = serviceTypeList;
        this.imageList = imageList;
        this.create = create;
        this.update = update;
        this.remove = remove;

        function list () {
            return _servicesService.getList({user_id: AuthenticationService.user.id});
        }

        function myList () {
            return _servicesService.getList({user_id: AuthenticationService.user.id, my_services: true});
        }

        function serviceTypeList () {
            return Restangular.all('service-types').getList();
        }

        function imageList (service) {
            return _servicesService.one(service.id).all('images').getList();
        }

        function create (service) {
            service.user_id = AuthenticationService.user.id;
            return _servicesService.post(service)
                .then(function (response) {
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

        function update (service) {
            return service.put()
                .then(function (response) {
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

        function remove (service) {
            return service.remove()
                .then(function (response) {
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
