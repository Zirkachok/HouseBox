angular.module('starter.controllers')
  .controller('HistoryCtrl', function($scope) {

    $scope.history = [
      { label: "Today, 10am-11am", min: 60, max: 87},
      { label: "Today, 9am-10am", min: 62, max: 76},
      { label: "Today, 8am-9am", min: 55, max: 79},
      { label: "Yesterday, 10pm-11pm", min: 66, max: 83},
      { label: "Yesterday, 6pm-7pm", min: 62, max: 91},
      { label: "Yesterday, 5m-6pm", min: 54, max: 82},
      { label: "Yesterday, 10am-11pm", min: 62, max: 97},
      { label: "Yesterday, 9am-10pm", min: 64, max: 79},
    ];

    $scope.history.forEach(function(entry) {
      if (entry.max > 95) {
        entry.bgCol = "red";
        entry.fgCol = "white";
        entry.weight = "bold";
      } else if( entry.max > 85) {
        entry.bgCol = "orange";
        entry.fgCol = "white";
        entry.weight = "bold";
      } else {
        entry.bgCol = "white";
        entry.fgCol = "black";
        entry.weight = "normal";
      }
    });

  });
