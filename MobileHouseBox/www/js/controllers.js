angular.module('starter.controllers', ['starter.services'])


.controller("IntroCtrl", function($scope, $state, $timeout)
{
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
		$state.go('tab.home');
	}
})

.controller("NewUserCtrl", function($scope, $state, $ionicPopup)//, authService)
{
	//console.log("New user..." + window.localStorage.getItem("username"))

	$scope.data = {};

	// $scope.registerUser = function()
	// {
	// 	if(angular.isUndefined($scope.data.username) || angular.isUndefined($scope.data.password) ||
	// 		$scope.data.username === '' || $scope.data.password === '')
	// 	{
	// 		var alertPopup = $ionicPopup.alert(
	// 		{
	// 			title: 'Missing information',
	// 			template: '<center>You need to at least fill a username and password</center>'
	// 		});
	// 	}
	// 	else
	// 	{
	// 		console.log("New user registered!")

	// 		//window.localStorage.setItem("username", $scope.data.username);
	// 		//window.localStorage.setItem("password", $scope.data.password);

	// 		var alertPopup = $ionicPopup.alert(
	// 		{
	// 			title: 'Welcome to Open-Heart, ' + $scope.data.username + ' !',
	// 			template: '<center>You are now successfully registered to Open-Heart. Enjoy your journey!</center>'
	// 		});
			
	// 		$state.go('tab.home');
	// 	}
	// }
})


.controller("HomeCtrl", function($scope, $state)
{
	console.log("Home sweet home...")

	$scope.items = [
	{
		color: "#E47500",
		icon: "ion-android-checkbox-outline",
		title: "Checklist"
	},
	{
		color: "#5AD863",
		icon: "ion-pie-graph",
		title: "Simulator"
	},
	{
		color: "#F8E548",
		icon: "ion-ios-home",
		title: "Home"
	},
	{
		color: "#AD5CE9",
		icon: "ion-android-settings",
		title: "Settings"
	}
	// {
	// 	color: "#3DBEC9",
	// 	icon: "ion-social-css3",
	// 	title: "CSS3"
	// },
	// {
	// 	color: "#D86B67",
	// 	icon: "ion-social-angular",
	// 	title: "Angular"
	// }
];
})

.controller("SimulatorCtrl", function($scope, $state)
{
	console.log("Simulator...")
})

.controller("ChecklistCtrl", function($scope, $state)
{
	console.log("Checklist...")
});
;
