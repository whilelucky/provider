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
                templateUrl: 'explore/labours.list.html',
                controller: 'LaboursListController as vm'
            })

            .state('app.labours', {
                url: '/labours',
                abstract: true,
                template: '<ion-nav-view></ion-nav-view>'
            })

            .state('app.labours.my-labours', {
                url: '/my-labours',
                templateUrl: 'labours/manage/my.labours.html',
                controller: 'MyLaboursController as vm'
            })

            .state('app.labours.create', {
                url: '/create',
                templateUrl: 'labours/manage/labours.create.html',
                controller: 'LaboursCreateEditController as vm'
            })

            .state('app.labours.edit', {
                url: '/edit',
                templateUrl: 'labours/manage/labours.edit.html',
                controller: 'LaboursCreateEditController as vm'
            })

            .state('app.labours.images', {
                url: '/images',
                templateUrl: 'labours/images/labours.images.html',
                controller: 'LaboursImageController as vm'
            })

            .state('app.labours.certificates', {
                url: '/certificates',
                templateUrl: 'labours/images/labours.certificates.html',
                controller: 'LaboursImageController as vm'
            })

            .state('app.labours.show', {
                url: '/:id',
                templateUrl: 'labours/labours.show.html',
                controller: 'LaboursShowController as vm'
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
