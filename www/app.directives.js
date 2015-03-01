(function() {
    'use strict';

    angular.module('provider')
        .directive('serviceDetails', serviceDetails);

    function serviceDetails () {
        return {
            restrict: 'E',
            scope: {
                service: '=data'
            },
            template: "" +
                '<img src="http://lorempixel.com/50/50">' +
                '<h2>{{service.name}}</h2>' +
                '<p>{{service.address}}</p>' +
                '<p>{{service.mobile}} | {{service.landline}}</p>' +
                '<p>' +
                    '<i class="icon ion-location"></i> {{service.range | distance}}' +
                    '&nbsp;&nbsp;&nbsp;' +
                    '<i class="icon ion-star"></i> {{service.rating}}/5' +
                '</p>'
        };
    }


})();
