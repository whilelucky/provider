(function () {
    'use strict';

    angular.module('provider')
        .directive('labourDetails', labourDetails)
        .directive('gpsPosFinder', gpsPosFinder);

    function labourDetails() {
        var directive = {};

        directive.restrict = 'E';

        directive.scope = {
            labour: '=data'
        };

        directive.template = '' +
            '<i class="icon {{labour.service_type_icon}}"></i>' +
            '<h2>{{labour.name}}</h2>' +
            '<p>{{labour.address}}</p>' +
            '<p>{{labour.mobile}}, {{labour.landline}}</p>' +
            '<p>' +
            '<i class="icon ion-location"></i> {{labour.range | distance}}' +
            '&nbsp;&nbsp;&nbsp;' +
            '<i class="icon ion-star"></i> {{labour.rating}}/5.00' +
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
