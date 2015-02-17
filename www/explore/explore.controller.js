(function() {
    'use strict';

    angular.module('provider')
        .controller('ExploreController', ExploreController);

    function ExploreController () {

        var vm = this;

        vm.serviceTypes = [
            {'id': 1, 'name': 'Electrician', 'icon': 'ion-flash'},
            {'id': 2, 'name': 'Plumber', 'icon': 'ion-wrench'},
            {'id': 3, 'name': 'Painter', 'icon': 'ion-waterdrop'},
            {'id': 4, 'name': 'Tailor', 'icon': 'ion-scissors'},
            {'id': 5, 'name': 'Carpenter', 'icon': 'ion-hammer'}
        ];


    }

})();
