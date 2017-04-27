// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 1st parameter is the name of this angular module example (also set in a <body> attribute in index.html)
// 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'chart.js', 'pascalprecht.translate'])


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


.config(function($stateProvider, $urlRouterProvider, $translateProvider) {
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
		controller: "NewUserCtrl",
		templateUrl: 'templates/newUser.html'
	})

    // setup an abstract state for the tabs directive
	.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/tabs.html'
	})

	// Each tab has its own nav history stack:

	.state('tab.home', {
		url: '/home',
		views: {
			'tab-home': {
				templateUrl: 'templates/tab-home.html',
				controller: 'HomeCtrl'
			}
		}
	})

	.state('tab.checklist', {
		url: '/checklist',
		views: {
			'tab-checklist': {
				templateUrl: 'templates/tab-checklist.html',
				controller: 'ChecklistCtrl'
			}
		}
	})

	.state('tab.simulator', {
		url: '/simulator',
		views: {
			'tab-simulator': {
				templateUrl: 'templates/tab-simulator.html',
				controller: 'SimulatorCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/intro');


	// i18n
	$translateProvider.translations('en', {
		// Login state
		login_title   : "Login",
		select_account: "Select an account:",
		create_account: "Create an account!"
	});

	$translateProvider.translations('fr', {
		// Login state
		login_title   : "Connection",
		select_account: "Sélectionnez un compte:",
		create_account: "Créer un compte!",
	});
	
	$translateProvider.preferredLanguage("fr");
	$translateProvider.fallbackLanguage("en");
});
