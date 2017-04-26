function getId() {
  var lastId = window.localStorage.getItem("lastActivityId");
  return lastId == 0 ? 1 : ++lastId;
}

angular.module('starter.controllers')
  .controller('EditActivityCtrl', function($scope, $state, $stateParams, ActivitiesProvider) {

    var id = $stateParams.id;

    console.log("id:", id);

    $scope.activity = undefined;

    if (id) {
      var activities = ActivitiesProvider.get();
      activities.forEach(function(a) {
        if (a && a.id == id) {
          $scope.activity = a;
        }
      });
    }

    $scope.isCreation = false;
    if (!$scope.activity) {
      $scope.isCreation = true;
      $scope.activity = {
        id: getId(),
        name: "My Activity",
        entries: []
      }

    }

    function addPeriod(type, min) {
      if ($scope.activity.entries.length
        && $scope.activity.entries[$scope.activity.entries.length-1].type == type
      ) {
        $scope.activity.entries[$scope.activity.entries.length-1].time += 5;
      }
      else {
        $scope.activity.entries.push({
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
    }

    $scope.save = function(){
      if ($scope.isCreation == true) {
        ActivitiesProvider.add($scope.activity);
      } else {
        ActivitiesProvider.update($scope.activity);
      }

      $state.go("tab.activity", {}, {reload: true});
    };

    $scope.remove = function() {
      ActivitiesProvider.remove($scope.activity);
      $state.go("tab.activity", {}, {reload: true});
    };

    });
