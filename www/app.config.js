(function() {
    'use strict';

    angular.module('provider')
        .config(config);

    function config ($stateProvider, $urlRouterProvider, toastrConfig, RestangularProvider) {

//        RestangularProvider.setBaseUrl('http://localhost/provider-backend/public');
        RestangularProvider.setBaseUrl('http://provider.creativevortex.in/public');

        angular.extend(toastrConfig, {
            positionClass: 'toast-bottom-left'
        });


        $stateProvider

        .state('app', {
            url: '/',
            abstract: true,
            templateUrl: 'navigation/nav.html'
        })

        .state('app.login', {
            url: 'login',
            templateUrl: 'auth/login.html',
            controller: 'AuthenticationController as vm'
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
            templateUrl: 'providers/my.services.html',
            controller: 'MyServicesController as vm'
        })

        .state('app.services.create', {
            url: '/create',
            templateUrl: 'providers/services.create.html',
            controller: 'ServicesCreateEditController as vm'
        })

        .state('app.services.edit', {
            url: '/edit',
            templateUrl: 'providers/services.edit.html',
            controller: 'ServicesCreateEditController as vm'
        })

        .state('app.services.show', {
            url: '/:id',
            templateUrl: 'providers/services.show.html',
            controller: 'ServicesShowController as vm'
        })



        .state('app.requests', {
            url: 'requests',
            templateUrl: 'requests/requests.html',
            controller: 'RequestsController as vm'
        })

        .state('app.profile', {
            url: 'profile',
            templateUrl: 'users/profile/profile.html',
            controller: 'ProfileController as vm'
        });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('login');
    }

})();
