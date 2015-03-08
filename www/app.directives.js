(function () {
    'use strict';

    angular.module('provider')
        .directive('serviceDetails', serviceDetails)
        .directive('gpsPosFinder', gpsPosFinder);

    function serviceDetails() {
        var directive = {};

        directive.restrict = 'E';

        directive.scope = {
            service: '=data'
        };

        directive.template = '' +
            '<i class="icon {{service.service_type_icon}}"></i>' +
            '<h2>{{service.name}}</h2>' +
            '<p>{{service.address}}</p>' +
            '<p>{{service.mobile}}, {{service.landline}}</p>' +
            '<p>' +
            '<i class="icon ion-location"></i> {{service.range | distance}}' +
            '&nbsp;&nbsp;&nbsp;' +
            '<i class="icon ion-star"></i> {{service.rating}}/5.00' +
            '</p>';

        return directive;
    }


    function gpsPosFinder() {
        var directive = {};

        directive.restrict = 'E';

        directive.scope = {
            data: '=',
            getGpsPosition: '&'
        };

        directive.template = '' +
            '<div class="item item-borderless item-image item-button-right">' +
            '<img ng-src="https://maps.googleapis.com/maps/api/staticmap?markers=color:0x1abc9c|{{data.gps_latitude}},{{data.gps_longitude}}&size=480x270&zoom=16" alt="" style="min-height: 70px"/>' +
            '<button style="top: 16px; padding: 0 6px;" class="button button-outline button-assertive" ng-click="getGpsPosition()">' +
            '<i class="icon ion-android-locate"></i>' +
            '</button>' +
            '</div>';

        return directive;
    }


})();
