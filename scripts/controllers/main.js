'use strict';

angular.module('schemaAppApp')
      .controller('TopLevelAppCtrl', ['$scope','$http', 'UserDataService',  '$location',  function ($scope, $http, UserDataService, $location) {
		 $scope.hasUser = false;
		 console.log($scope.hasUser);
		 $location.url('/');

	  $scope.currentUser = UserDataService.getCurrentUser(); 
     $scope.showTemplat = true;
     $scope.loginActive = true;
     console.log("Entering Controller xxxxxx");
     $scope.creds = {email:"Enter your email here!", password:"Enter pass"}; 
     console.log("Entering Controller xxxxx454545x");
     console.log($scope.creds.email);
		 
                 console.log("Entering Controller 123456xxxxxx");
				  console.log("Entering Controller 123457xxxxxx");
                   $scope.getSession = function (emailStr, passwordStr) {
                    console.log("loginin111");
							 
                return $http({
    			method: "POST",
    			url: 'http://localhost/rest/user/session',
    			data: {                   
    				"email" : emailStr, "password" : passwordStr
    			}
    		});
    }
     console.log("Entering Controller xxxxx454sdfsdfsdfsfsd545x");


     $scope.login1 = function () {
  console.log("ssssssss3"); 
    	// Call our login function and handle its returned promise
    	$scope.getSession($scope.creds.email, $scope.creds.password).then(
 
    		// Handle successful login
    		function (result, userDataObj) {
  console.log("ssssssss4"); 
    			// set header for future $http service calls to dreamfactory
    			$http.defaults.headers.common['X-DreamFactory-Session-Token'] = result.session_id;

    			// Do whatever else you want to do for app setup after login
                            console.log("LOGGGGEEDDDDDDDD INNN REDIRECT TO MAIN")
							    $scope.currentUser = userDataObj;
                            $location.url('/');
							console.log("LOGGGGEEDDDDDDDD INNN ?")
							$scope.hasUser = true;
							console.log($scope.hasUser);

    		},
    		function (reject) {

    			throw reject;
    		});
	 }	 
        }])
       .controller('NavigationCtrl', ['$scope', function($scope) {

            $scope.hasUser = false;

            $scope.$watch('currentUser', function(newValue, oldValue) {

                $scope.hasUser = !!newValue;
            })
        }])
 
 .controller('Login3Ctrl', ['$scope', function($scope, $http) {
 


     }] )


 	.controller('RegisterCtrl', ['$scope', '$location', 'UserEventsService', function($scope, $location, UserEventsService) 
    {
        $scope.options = null;
		$scope.$on(UserEventsService.register.registerSuccess, function(e, userDataObj) 
        {
            $location.url('/');
        });
    }])
	
  .controller('LoginCtrl', ['$scope', '$location', 'UserEventsService', function($scope, $location, UserEventsService) {
/*
  $scope.$on(UserEventsService.login.loginSuccess, function(e, userDataObj) {
            $scope.$parent.currentUser = userDataObj;
                $location.url('/');
            })
    */
	}])
	

        .controller('LogoutCtrl', ['$scope', '$location', 'UserEventsService', function($scope, $location, UserEventsService) {
			/* if (!UserDataService.getCurrentUser()) {

                $location.url('/login')
			 }
     
		console.log($scope.hasUser);
		 $location.url('/login')
		 */
		     $scope.$parent.hasUser = false;
            $scope.$on(UserEventsService.logout.logoutSuccess, function(e, userDataObj) {

            $scope.$parent.currentUser = userDataObj;
                $location.url('/login')
            })
			
        }])
    .controller('UserInfoCtrl', ['$scope', 'getUserData', function($scope, getUserData) {
 $scope.userData = getUserData;
 //.$scope.userData.first_name
}])  
.controller('MainCtrl', function ($scope, DSP_URL) {

$scope.options = {
            service: 'db',
            table: 'SchemaAppContacts',
            url: DSP_URL + '/rest/db/SchemaAppContacts',
            defaultFields: {
                id: true,
                first_name: true,
				email: true,
                last_name: true,
                field_int: false,
				field_text: true,
                field_bool: 'private'
                // field_text was omitted to show how it will default
                // to false
            },
            // Set the group fields property
            groupFields: {

                // order is determined by property number
                1: {
                    // This is the name of the group and will appear in
                    // the rendered template
                    name: 'Group A',

                    // The order of the fields in this array will
                    // determine the order the fields are rendered in
                    fields: ['id', 'first_name', 'last_name', 'email','field_text'],

                    // You can add a horizontal rule between the fields
                    dividers: false
                }
            },

            // we add the excludeFields option
            excludeFields: [
                {
                    // We set the name of the field we want to exclude
                    name: 'id',

                    // then set the visibility for the operations
                    // You'll only possibly see the value during create and edit operations so
                    // those are the only 'fields' or options available
                    fields: {

                        // Setting 'create' to true excludes the field from a generated create form
                        create: true,

                        // Setting 'edit' to false allows the field to be shown in a generated edit form
                        edit: false
                    }
                }
            ],

            // add overrideFields option
            overrideFields: [
                {
                    // Set the field name
                    field: 'field_text',

                    // determine whether the field should be editable or not
                    editable: true,

                    // contains our display settings
                    display: {

                        // set the type of display
                        type: 'textarea'
						
                    }
                },
                {
                    // Set the override field name
                    field: 'field_int',

                    // set editable true
                    editable: true,

                    // add record property with array of data objects for select box
                    record: [
                        {
                            num: 0,
                            name: 'Zero'
                        },
                        {
                            num: 1,
                            name: 'One'
                        },
                        {
                            num: 2,
                            name: 'Two'
                        }
                    ],

                    // Set display
                    display: {

                        // set to select field
                        type: 'select',

                        // property of data object to use for select option value
                        value: 'num',

                        // property of data object to use for select option label
                        label: 'name'
                    }
                }

            ]
        }



  });;

  
  