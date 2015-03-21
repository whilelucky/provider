(function () {
    'use strict';

    angular.module('provider')
        .service('AlertsService', AlertsService);

    function AlertsService(toastr) {

        this.success = success;
        this.info = info;
        this.warning = warning;
        this.error = error;

        function success(alert) {
            toastr.success(alert);
        }

        function info(alert) {
            toastr.info(alert);
        }

        function warning(alert) {
            toastr.warning(alert);
        }

        function error(alert) {
            toastr.error(alert);
        }


    }

})();
