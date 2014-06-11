'use strict';

/**
 * @ngdoc function
 * @name safeTrackWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the safeTrackWebApp
 */
angular.module('safeTrackWebApp')
  .controller('ReportCtrl', function ($scope, $sce, $http, $timeout, promiseTracker) {

        $scope.reportSent = false

        $scope.sendingReport = promiseTracker('sendingReport')

        $scope.report = {
            dateTime: new Date(),
            message: '',
            geoCode: null
        }


        $scope.submitReport = function() {
            $http.post('api/incident', $scope.report, {tracker: $scope.sendingReport}).success(function() {
                $scope.reportSent = true
                $scope.report = {
                    dateTime: new Date(),
                    message: '',
                    geoCode: null
                }
                $timeout(function() {
                    $scope.reportSent = false
                }, 3000)
            })
        }

        $scope.updateMap = function(details) {
            if (!_.isEmpty(details)) {
                $scope.map.center.latitude = details.geometry.location.lat()
                $scope.map.center.longitude = details.geometry.location.lng()
                $scope.map.zoom = zoom(details.geometry.viewport)
                $scope.marker = $scope.map.center
                $scope.report.geoCode = details
            }
        }

        $scope.marker = {}

        $scope.map = {
            center: {
                latitude: 34,
                longitude: 37
            },
            zoom: 2
        };

        function zoom(viewport) {
            function latRad(lat) {
                var sin = Math.sin(lat * Math.PI / 180);
                var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
                return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
            }

            function zoom(mapPx, worldPx, fraction) {
                return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
            }

            if (!_.isEmpty(viewport)) {
                var WORLD_DIM = { height: 256, width: 256 };
                var MAP_DIM = { height: 150, width: 700 };
                var ZOOM_MAX = 21;

                var ne = viewport.getNorthEast();
                var sw = viewport.getSouthWest();

                var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

                var lngDiff = ne.lng() - sw.lng();
                var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

                var latZoom = zoom(MAP_DIM.height, WORLD_DIM.height, latFraction);
                var lngZoom = zoom(MAP_DIM.width, WORLD_DIM.width, lngFraction);

                return Math.min(latZoom, lngZoom, ZOOM_MAX);
            }
            return 15
        }
});
