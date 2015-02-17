(function() {
    'use strict';

    angular.module('provider')
        .config(config);

    function config ($stateProvider, $urlRouterProvider, RestangularProvider) {

        RestangularProvider.setBaseUrl('http://localhost/provider-backend/public/api');

        $stateProvider

        .state('app', {
            url: '/',
            abstract: true,
            templateUrl: 'navigation/nav.html',
            controller: 'AppController as vm'
        })

        .state('app.explore', {
            url: 'explore',
            templateUrl: 'explore/explore.html',
            controller: 'ExploreController as vm'
        })

        .state('app.services', {
            url: 'services',
            abstract: true,
            template: '<ion-nav-view></ion-nav-view>'
        })

        .state('app.services.type', {
            url: '/type/:type',
            templateUrl: 'providers/services.type.list.html',
            controller: 'ServicesTypeListController as vm'
        })

        .state('app.services.my-services', {
            url: '/my-services',
            templateUrl: 'providers/services.my.list.html',
            controller: 'ServicesMyListController as vm'
        })

        .state('app.services.show', {
            url: '/:id',
            templateUrl: 'providers/services.show.html',
            controller: 'ServicesShowController as vm'
        })

        .state('app.services.create', {
            url: '/create',
            templateUrl: 'providers/services.create.html',
            controller: 'ServicesCreateController'
        })

        .state('app.profile', {
            url: 'profile',
            templateUrl: 'users/profile/profile.html',
            controller: 'ProfileController as vm'
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('explore');
    }

})();
