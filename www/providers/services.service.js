(function() {
    'use strict';

    angular.module('provider')
        .service('ServicesService', ServicesService);

    function ServicesService ($rootScope, Restangular, AuthenticationService, AlertsService) {

        var _servicesService = Restangular.all('services');

        this.service = {};
        this.list = list;
        this.myList = myList;
        this.serviceTypeList = serviceTypeList;
        this.create = create;
        this.update = update;
        this.remove = remove;

        function list (serviceType) {
            return _servicesService.getList({service_type: serviceType});
        }

        function myList () {
            return _servicesService.getList({user_id: AuthenticationService.user.id});
        }

        function serviceTypeList () {
            return Restangular.all('service-types').getList();
        }

        function create (service) {
            service.user_id = AuthenticationService.user.id;
            _servicesService.post(service)
                .then(function (response) {
                    if(response.success) {
                        $rootScope.$broadcast('services.create');
                        AlertsService.success(response.alert);
                    }
                    else {
                        AlertsService.error(response.alert);
                    }
                });
        }

        function update (service) {
            service.put()
                .then(function (response) {
                    if(response.success) {
                        $rootScope.$broadcast('services.update');
                    }
                });
        }

        function remove (service) {
            service.remove()
                .then(function (response) {
                    if(response.success) {
                        $rootScope.$broadcast('services.remove');
                        AlertsService.success(response.alert);
                    }
                    else {
                        AlertsService.error(response.alert);
                    }
                });
        }

    }

})();
