(function() {
    'use strict';

    angular.module('provider')
        .filter('partition', partition)
        .filter('distance', distance);

    function partition () {
        var cache = {};
        return function (arr, size) {
            if (!arr) {
                return;
            }
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }
            var arrString = JSON.stringify(arr);
            var fromCache = cache[arrString + size];
            if (JSON.stringify(fromCache) === JSON.stringify(newArr)) {
                return fromCache;
            }
            cache[arrString + size] = newArr;
            return newArr;
        };
    }

    function distance () {
        return function (input) {
            input = parseFloat(input);
            if (input >= 1000) {
                return (input/1000).toFixed(2) + 'km';
            } else {
                return input.toFixed(2) + 'm';
            }
        }
    }



})();
