(function() {
    'use strict';

    angular.module('provider')
        .service('ExploreService', ExploreService);

    function ExploreService (Restangular) {

        var _exploreService = Restangular.all('service-types');

        this.list = list;

        function list () {
            return _exploreService.getList();
        }
    }

})();
