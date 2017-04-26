angular.module('starter.services')


.service('authService',	function ($rootScope)
{
	var service = {
		//Establish connection to SEMA server
		Login: function($user, $pass, $remember)
		{
			console.log("Try auth with user=" + $user + " and pass=" + $pass + " and remember=" +$remember)
		}
	};

	return service;
})


/**
 * A simple example service that returns some data.
 */
.service('usersService', function()
{
	// Might use a resource here that returns a JSON array

	// Some fake testing data
	var users = [
		{ id: 0, name: 'Julien', photo: 'jul.png', pass: 'loljul' },
		{ id: 1, name: 'Maryna', photo: 'mary.png', pass: 'lolmary' },
		{ id: 2, name: 'Gerard', photo: 'default-user.png', pass: 'lolgerard' },
	];

	var service = {
		//Establish connection to SEMA server
		getAll: function()
		{
			return users;
		},
		getByItem: function(userID)
		{
			// Simple index lookup
			return users[userID];
		}
	};

	return service;
});