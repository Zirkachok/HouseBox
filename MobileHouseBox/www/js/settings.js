angular.module('starter.controllers')
  .controller('SettingsCtrl', function($scope, SettingsProvider) {
    this.data = SettingsProvider.getAll();

    $scope.save = function() {
      SettingsProvider.save();
    }
  });
