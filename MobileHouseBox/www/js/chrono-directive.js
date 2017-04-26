angular.module('starter.controllers')

.directive('chronoTime', function() {
    return {
      restrict: 'E',
      template: '<div>' +
      '<div ng-show="active" style="font-size: 36px; text-align: center; padding: 8px;">{{ formated }}</div>' +
      '<div ng-hide="active" style="text-align: center; padding: 8px;">Not started yet</div>' +
      '</div>',
      scope: {
        start: '=',
        end: '=',
        value: '=',
        chronoStart: '='
      },
      link: function(scope, element, attrs, controllers) {
        scope.active = false;

        function pad2(s) {
          return s.length<2 ? "0" + s : s;
        }

        // $scope.formated = ":" + $scope.value;
        var now = new Date().getTime();
        scope.$watch("value", function() {
          if (scope.value < scope.start || scope.value > scope.end || !scope.value) {
            scope.active = false;
            scope.formatted = "Not yet";
            return;
          }

          scope.active = true;
          var total = Math.floor((scope.value - scope.chronoStart) / 1000);
          var secs = total%60;
          var mins = Math.floor(total/60)%60;
          scope.formated = "" + pad2(mins.toString()) + ":" + pad2(secs.toString());
        })
      }
    };
  });
