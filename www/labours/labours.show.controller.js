(function () {
    'use strict';

    angular.module('provider')
        .controller('LaboursShowController', LaboursShowController);

    function LaboursShowController($scope, $state, $ionicModal, LaboursService, RequestsService, ReviewsService, AuthenticationService) {

        var vm = this;

        vm.user = {};
        vm.labour = {};
        vm.review = {rating: "0"};
        vm.reviewsList = [];
        vm.hasReview = false;
        vm.sendRequest = sendRequest;
        vm.submitReview = submitReview;
        vm.updateReview = updateReview;
        vm.showReviewForm = showReviewForm;
        vm.hideReviewForm = hideReviewForm;

        $ionicModal.fromTemplateUrl('reviews/reviews.form.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        activate();

        function activate() {
            vm.user = AuthenticationService.user;
            vm.labour = LaboursService.labour;
            vm.hasReview = false;
            getReviews();
        }

        function sendRequest() {
            var request = {};
            request.service_id = vm.labour.id;
            RequestsService.create(request)
                .then(function () {
                    $state.go('app.requests');
                });
        }

        function getReviews() {
            ReviewsService.list()
                .then(function (reviewsList) {
                    vm.reviewsList = reviewsList;
                    findUserReview();
                });
        }

        function showReviewForm() {
            $scope.modal.show();
        }

        function hideReviewForm() {
            $scope.modal.hide();
        }

        function submitReview() {
            hideReviewForm();
            ReviewsService.create(vm.review)
                .then(activate);
        }

        function updateReview() {
            hideReviewForm();
            ReviewsService.update(vm.review)
                .then(activate);
        }

        function findUserReview() {
            angular.forEach(vm.reviewsList, function (review) {
                if (review.user_id === vm.user.id) {
                    vm.review = review;
                    vm.hasReview = true;
                }
            });
        }


    }

})();
