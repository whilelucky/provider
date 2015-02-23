(function() {
    'use strict';

    angular.module('provider')
        .controller('ServicesShowController', ServicesShowController);

    function ServicesShowController ($scope, $state, $ionicModal, ServicesService, RequestsService, ReviewsService) {

        var vm = this;

        vm.service = {};
        vm.review = {};
        vm.reviewsList = [];
        vm.sendRequest = sendRequest;
        vm.createReview = createReview;
        vm.showReviewForm = showReviewForm;
        vm.hideReviewForm = hideReviewForm;

        activate();

        function activate () {
            vm.service = ServicesService.service;
            ReviewsService.list()
                .then(function (reviewsList) {
                    vm.reviewsList = reviewsList;
                });
        }

        function sendRequest () {
            var request = {};
            request.service_id = vm.service.id;
            RequestsService.create(request);
        }

        function showReviewForm () {
            $scope.modal.show();
        }

        function hideReviewForm () {
            $scope.modal.hide();
        }

        function createReview () {
            ReviewsService.create(vm.review);
        }

        $scope.$on('requests.create', function() {
            $state.go('app.requests');
        });

        $scope.$on('reviews.create', function() {
            $scope.modal.hide();
            activate();
        });

        $ionicModal.fromTemplateUrl('reviews/reviews.create.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });


    }

})();
