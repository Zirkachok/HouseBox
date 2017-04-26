// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 1st parameter is the name of this angular module example (also set in a <body> attribute in index.html)
// 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'chart.js'])


.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}

		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})


.config(function($stateProvider, $urlRouterProvider) {
	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// Presents the application logo and main informations
	.state('intro', {
		url: '/intro',
		controller: "IntroCtrl",
		templateUrl: 'templates/intro.html'
	})

	.state('login', {
		url: '/login',
		controller: "LoginCtrl",
		templateUrl: 'templates/login.html'
	})

	.state('newUser', {
		url: '/newuser',
		controller: "newUserCtrl",
		templateUrl: 'templates/newUser.html'
	})

	.state('history', {
		url: '/history',
		templateUrl: 'templates/history.html',
		controller: 'HistoryCtrl'
	})

	.state('liberty', {
		url: '/liberty',
		templateUrl: 'templates/libertyMode.html',
		controller: 'LibertyCtrl'
	})

    // setup an abstract state for the tabs directive
	.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/tabs.html'
	})

	// Each tab has its own nav history stack:

	.state('tab.activity', {
		url: '/activity',
		views: {
			'tab-activity': {
				templateUrl: 'templates/tab-activity.html',
				controller: 'ActivityCtrl'
			}
		}
	})

	.state('tab.account', {
		url: '/account',
		views: {
			'tab-account': {
				templateUrl: 'templates/tab-account.html',
				controller: 'SettingsCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/intro');
});