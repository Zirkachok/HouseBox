angular.module('starter.controllers', ['starter.services'])


.controller("IntroCtrl", function($scope, $state, $timeout)
{
	//authService.ClearCredentials();
	//$scope.data = {};

	console.log("Introduction controller")

	// Stay 5sec showing the logo
	$timeout(function()
	{
		$state.go("login");
	}, 5000);

	$scope.go = function()
	{
		$state.go("login");
	};

	/*$scope.$on('event:authFailed', function(e, status)
	{
		var alertPopup = $ionicPopup.alert(
		{
			title: 'Connection to Open-Heart failed',
			template: 'Are you already registered? If yes, please check your credentials.'
		});
	});

	$scope.$on('event:authSucceed', function(e, status)
	{
		$state.go('tab.dash');
	});*/
	
	/*
	$scope.data.remember = true

	$scope.login = function()
	{
		if(angular.isUndefined($scope.data.username) || angular.isUndefined($scope.data.password) ||
			$scope.data.username === '' || $scope.data.password === '')
		{
			var alertPopup = $ionicPopup.alert(
			{
				title: 'Missing information',
				template: '<center>Are you already registered? If yes, please fill all your credentials.</center>'
			});
		}
		else
		{
			//console.log("Got user=" + $scope.data.username + " and pass=" + $scope.data.password)
			//console.log("Remember me? " + $scope.data.remember)

			//$state.go('tab.dash');
			$scope.result = authService.Login($scope.data.username, $scope.data.password, $scope.data.remember);
			if($scope.result == true)
			{
				if($scope.data.remember == true)
				{
					//window.localStorage.setItem("username", $scope.data.username);
					//window.localStorage.setItem("password", $scope.data.password);
				}
				
				$state.go('tab.dash');
			}
			else
			{
				var alertPopup = $ionicPopup.alert(
				{
					title: 'Login failed',
					template: '<center>Are you already registered? If yes, please check your credentials.</center>'
				});
			}
		}
	}

	$scope.createAccount = function()
	{
		console.log("Create new account!!!")
		$state.go('newUser');
	}*/
})

.controller("LoginCtrl", function($scope, $state, $ionicPopup, usersService)
{
	$scope.users = usersService.getAll();

	console.log("Login!!!")

	$scope.createAccount = function()
	{
		$state.go('newUser');
	}

	$scope.removeUser = function($id, $user)
	{
		var confirmPopup = $ionicPopup.confirm(
		{
			title: 'Are you sure?',
			template: "<center>Are you sure you want to remove " + $user + "\'s account?</center>"
		});

		confirmPopup.then(function(res)
		{
			if(res)
			{
				console.log('You are sure');
			} else
			{
				console.log('You are not sure');
			}
		});
	}

	$scope.logWithAccount = function($id)
	{
		console.log("Log with account " + $id)
		//window.localStorage.setItem("currUser", $id);
		$state.go('tab.activity');
	}
})

.controller("newUserCtrl", function($scope, $state, $ionicPopup)//, authService)
{
	//console.log("New user..." + window.localStorage.getItem("username"))

	$scope.data = {};

	$scope.registerUser = function()
	{
		if(angular.isUndefined($scope.data.username) || angular.isUndefined($scope.data.password) ||
			$scope.data.username === '' || $scope.data.password === '')
		{
			var alertPopup = $ionicPopup.alert(
			{
				title: 'Missing information',
				template: '<center>You need to at least fill a username and password</center>'
			});
		}
		else
		{
			console.log("New user registered!")

			//window.localStorage.setItem("username", $scope.data.username);
			//window.localStorage.setItem("password", $scope.data.password);

			var alertPopup = $ionicPopup.alert(
			{
				title: 'Welcome to Open-Heart, ' + $scope.data.username + ' !',
				template: '<center>You are now successfully registered to Open-Heart. Enjoy your journey!</center>'
			});
			
			$state.go('tab.activity');
		}
	}
})

.controller('ActivityCtrl',function($scope, $state)
{
	console.log("Activity...")

	$scope.libertyMode = function()
	{
		console.log("Liberty Mode!")
		$state.go('liberty');
	}

	$scope.programMode = function()
	{
		console.log("Program Mode!")
	}

	$scope.historyMode = function()
	{
		console.log("History Mode!")
		$state.go('history');
	}
});
;
