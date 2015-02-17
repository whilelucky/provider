(function() {
    'use strict';

    angular.module('provider')
        .controller('ProfileController', ProfileController);

    function ProfileController () {

        var vm = this;

        vm.user = {};

        activate();

        function activate () {
            // vm.user = SessionService.user;
            vm.user = {
                'first_name': 'lakshya',
                'last_name': 'ranganath',
                'email': 'lakshya@something.com',
                'dob': '30/10/1993'
            };
            console.log(vm.user);
        }

    }

})();
