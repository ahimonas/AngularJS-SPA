'use strict';

/**
 * @ngdoc overview
 * @name schemaAppApp
 * @description
 * # schemaAppApp
 *
 * Main module of the application.
 */
angular
.module('schemaAppApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
	'dfUserManagement',
    'ngTouch',
    'dfTable'
	// Added dfTable to deps
  ])
.constant('DSP_URL', 'http://localhost')
.constant('DSP_API_KEY', 'schema-app')
.config(['$httpProvider', 'DSP_API_KEY', function ($httpProvider, DSP_API_KEY) {

        // Set default headers for http requests
        $httpProvider.defaults.headers.common["X-DreamFactory-Application-Name"] = DSP_API_KEY;

    }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
	  	.when('/login', {
				templateUrl: 'views/login.html',
			controller: 'LoginCtrl'
		})
		.when('/logout', {
			templateUrl: 'views/logout.html',
			controller: 'LogoutCtrl'
		})
		.when('/register', {
		templateUrl: 'views/register.html',
		controller: 'RegisterCtrl'
		})
		.when('/user-info', {
            templateUrl: 'views/user-info.html',
            controller: 'UserInfoCtrl',
            resolve: {
				 getUserData: ['$location', 'UserDataService', function($location, UserDataService) {

            if (!UserDataService.getCurrentUser()) {

                $location.url('/user-info')
                }else {

                return UserDataService.getCurrentUser();
            }
        }]

            }
        })
   
      .otherwise({
        redirectTo: '/'
      });
  });
