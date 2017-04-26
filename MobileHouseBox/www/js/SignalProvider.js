function SignalProviderMock() {
  this.dataIndex = 0;
  this.data = window.ECG_DATA;
}

var demoMode = true;

SignalProviderMock.prototype.getData = function() {

  var self = this;

  function resolve() {
    var pulse = undefined;
    if (demoMode) {
      var table = window.ECG_DATA.rate;
      pulse = Math.floor(table[self.dataIndex++ % table.length]);
      console.log("pulsed", pulse, self.dataIndex);
    } else {
      pulse = javaBridge.DataProviderBLE.getPulseRate();
    }
    return {
      pulse: pulse
    }
  }

  return resolve();
};

function Activities() {
  this.data = JSON.parse(window.localStorage.getItem("activities") || "[]");
}

Activities.prototype.getNewId = function() {
  var newId = 0;
  this.data.forEach(function(e) {
    newId = Math.max(e.id+1, newId);
  });
  return newId;
};


Activities.prototype.get = function() {
  return this.data;
};

Activities.prototype.add = function(entry) {
  var copy = angular.copy(entry);
  this.data.push(copy);
  this.save();
};

Activities.prototype.update = function(act) {
  this.data.forEach(function(e) {
    if (e.id == act.id) {
      e.name = act.name;
      e.entries = act.entries;
    }
  });
  this.save();
};

Activities.prototype.remove = function(act) {
  this.data = this.data.filter(function(e) {
    return (e.id != act.id)
  });
  this.save();
};

Activities.prototype.save = function() {
  var copy = angular.copy(this.data);
  window.localStorage.setItem("activities", JSON.stringify(copy));
}

function Settings() {
  this.data = JSON.parse(window.localStorage.getItem("settings") || "{}");
}
Settings.prototype.save = function(name, value) {
  var copy = angular.copy(this.data);
  window.localStorage.setItem("settings", JSON.stringify(copy));
}

Settings.prototype.set = function(name, value) {
  this.data[name] = value;
  this.save();
}

Settings.prototype.get = function(name) {
  return this.data[name];
}

Settings.prototype.getAll = function() {
  return this.data;
}


angular.module('starter.services', [])

  .factory('SignalProvider', function() {
    return new SignalProviderMock();
  })

  .factory("ActivitiesProvider", function() {
    return new Activities();
  })
  .factory("SettingsProvider", function() {
    return new Settings();
  });

;
