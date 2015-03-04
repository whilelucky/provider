(function () {
    'use strict';

    angular.module('provider')
        .config(config);

    function config($stateProvider, $urlRouterProvider, cfpLoadingBarProvider, toastrConfig, RestangularProvider) {

        //----Configurations-----//

        RestangularProvider.setBaseUrl('http://localhost/provider-backend/public');
//        RestangularProvider.setBaseUrl('http://provider.creativevortex.in/public');

        cfpLoadingBarProvider.includeSpinner = false;

        angular.extend(toastrConfig, {
            positionClass: 'toast-bottom-full-width'
        });


        //----Routes-----//

        $stateProvider

            .state('login', {
                url: '/',
                templateUrl: 'auth/login.html',
                controller: 'AuthenticationController as vm'
            })

            .state('app', {
                url: 'app',
                abstract: true,
                templateUrl: 'navigation/nav.html'
            })

            .state('app.explore', {
                url: '/explore',
                templateUrl: 'explore/services.list.html',
                controller: 'ServicesListController as vm'
            })

            .state('app.services', {
                url: '/services',
                abstract: true,
                template: '<ion-nav-view></ion-nav-view>'
            })

            .state('app.services.my-services', {
                url: '/my-services',
                templateUrl: 'services/manage/my.services.html',
                controller: 'MyServicesController as vm'
            })

            .state('app.services.create', {
                url: '/create',
                templateUrl: 'services/manage/services.create.html',
                controller: 'ServicesCreateEditController as vm'
            })

            .state('app.services.edit', {
                url: '/edit',
                templateUrl: 'services/manage/services.edit.html',
                controller: 'ServicesCreateEditController as vm'
            })

            .state('app.services.images', {
                url: '/images',
                templateUrl: 'services/images/services.images.html',
                controller: 'ServicesImageController as vm'
            })

            .state('app.services.certificates', {
                url: '/certificates',
                templateUrl: 'services/images/services.certificates.html',
                controller: 'ServicesImageController as vm'
            })

            .state('app.services.show', {
                url: '/:id',
                templateUrl: 'services/services.show.html',
                controller: 'ServicesShowController as vm'
            })

            .state('app.requests', {
                url: '/requests',
                templateUrl: 'requests/requests.html',
                controller: 'RequestsController as vm'
            })

            .state('app.profile', {
                url: '/profile',
                templateUrl: 'users/profile/profile.html',
                controller: 'ProfileController as vm'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');

    }

})();
