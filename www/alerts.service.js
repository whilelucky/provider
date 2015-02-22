(function() {
    'use strict';

    angular.module('provider')
        .service('AlertsService', AlertsService);

    function AlertsService (toastr) {

        this.success = success;
        this.warning = warning;
        this.error = error;

        function success (alert) {
            toastr.success(alert);
        }

        function warning (alert) {
            toastr.warning(alert);
        }

        function error (alert) {
            toastr.error(alert);
        }


    }

})();
