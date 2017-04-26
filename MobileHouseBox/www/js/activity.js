angular.module('starter.controllers')


    /*$scope.state = 'list';

    $scope.data = ActivitiesProvider.get();
    console.log("Data", $scope.data);
    $scope.active = undefined;
    $scope.activeIndex = -1;

    <!--  State = list -->

    $scope.transitionEdit = function(index, $event) {
      $scope.state = "edit";
      $scope.activeIndex = index;
      $event.preventDefault();
      $event.stopPropagation();
      $scope.editedActivity = angular.copy($scope.data[$scope.activeIndex]);
      $scope.editedActivityNew = false;
    };

    $scope.transitionEditNew = function() {
      $scope.state = "edit";
      $scope.activeIndex = -1;
      $scope.editedActivity = {
        name: "",
        entries: []
      };
      $scope.editedActivityNew = true;
    };

    $scope.transitionChrono = function(index) {
      $scope.state = "chrono";
      $scope.activeIndex = index;
      $scope.chronoActive = false;
      $scope.chrono = undefined;
      $scope.entries = $scope.data[$scope.activeIndex].entries;
    };



    <!--  State = edit -->

    function addPeriod(type, min) {
      var activity = $scope.editedActivity;
      if (activity.entries.length
        && activity.entries[activity.entries.length-1].type == type
      ) {
        activity.entries[activity.entries.length-1].time += 5;
      }
      else {
        activity.entries.push({
          type: type,
          time: min
        })
      }
    }

    $scope.addActivityPeriod = function(min) {
      addPeriod('act', 5);
    };

    $scope.addRestingPeriod = function(min) {
      addPeriod('rest', 5);
    };

    $scope.saveEdited = function(){
      if (!$scope.editedActivity.name) {
        $scope.editedActivity.name = "Unnamed Exercise";
      }
      if ($scope.editedActivity.id == undefined) {
        $scope.editedActivity.id = ActivitiesProvider.getNewId();
        ActivitiesProvider.add($scope.editedActivity);
        //$scope.data.push(angular.copy($scope.editedActivity));
      } else {
        ActivitiesProvider.update($scope.editedActivity);
        //$scope.data[$scope.activeIndex] = angular.copy($scope.editedActivity);
      }
      $scope.data = ActivitiesProvider.get();
      $scope.state = "list";
    };

    $scope.removeEdited = function() {
      ActivitiesProvider.remove($scope.editedActivity);
      if ($scope.activeIndex>=0) {
        $scope.data.splice($scope.activeIndex, 1);
      }
      $scope.state = "list";
    };



    <!--  State = Chrono activity -->

    function chronoRunner() {
      console.log("timeout");
      if ($scope.activeIndex>-1 && $scope.chronoActive) {
        $scope.chrono = new Date().getTime();
        $timeout(chronoRunner, 200);
      }
    }

    $scope.chronoStart = function() {
      if ($scope.chronoActive) {
        console.log("Chrono Stop");
        $scope.chronoActive = false;
        $scope.activeIndex = -1;
        $scope.state = "list";
        $scope.entries = [];
        return;
      }
      console.log("Chrono Start");

      $scope.entries = [];
      var start = new Date().getTime();
      var active = $scope.data[$scope.activeIndex];
      for (var i=0; i<active.entries.length; i++) {
        var a = active.entries[i];
        var e = {
          type: a.type,
          time: a.time,
          start: start,
          end: start + a.time*60*1000
        };
        start += a.time * 60 * 1000;
        $scope.entries.push(e);
      }
      $scope.chrono = 0;

      $scope.chronoActive = true;
      $scope.chronoStartTime = new Date().getTime();
      $timeout(chronoRunner, 200);
    };

  });
;
*/