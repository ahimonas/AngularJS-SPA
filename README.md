# Single Page Application Tutorial Using AngularJS/DreamFactory 

  - Overview 1.1 Understanding Web Applications 1.2  System Architecture 1.2.1 Frameworks 1.2.2 Platforms 1.2.3 Additional Components
  - AngularJS Intro 2.1 Basic Structure of a Web Application using Angular 2.2 AngularJS topics
  - 2.2.1 Data-Binding 2.2.2 Using Directives 2.2.3 Service Objects 2.2.4 Module Loading & Dependencies 
  - 2.3 Combined Topics 2.3.1 AngularJS Promises 2.3.2 Making an Ajax Call in Angular using JSON Data and Promises 2.3.3 MVC Implementation
  - 3 DreamFactory Integration 3.1 Dreamfactory Introduction 3.2 Creating mySQL Tables via Dreamfactory API 3.3 Accessing and Configuring DSP
  - 4 Code Recomposition 4.1 Authentication 4.2 Dreamfactory Table

# Background

Understanding Web Applications Generally there exist two types of web application: round-trip and single-page applications (SPAs). Round-trip Application (Earlier versioned web apps) The browser requests an initial HTML document from the server. Each user interactions results in the browser to constantly request and receive new HTML documents. The browser makes a series of HTTP requests that the server handles by generating HTML documents and populating them with data dynamically. A drawback of round-trip applications is that they make the user wait while the next HTML document is requested and loaded. Single-page Applications (SPAs)
Single-page applications work differently. An initial HTML document is sent to the browser. Each user interaction results in the browser sending Ajax (“Asynchronous Javascript and XML”) requests for small fragments of HTML or JSON data (see below) inserted into the existing page being displayed to the user. The initially loaded HTML document is never reloaded and the user can continue to interact with the existing HTML while the Ajax requests are being performed asynchronously. SPAs allow for partial page refresh with data-only calls to the server. JSON Data Below is an example of a .JSON file format.

[{ "action": "Buy Flowers", "done": false }, { "action": "Get Shoes", "done": false }, { "action": "Collect Tickets", "done": true }, { "action": "Call Joe", "done": false }]

1.2 - System Architecture 1.2.1 - Frameworks AngularJS is a framework which is 100% JavaScript and 100% client-side based. AngularJS applications are html pages with angular code, that is, angular-enhanced JavaScript. . AngularJS relies heavily on the MVC (Model-View-Controller) paradigm which it uses to organize data and simplify development (We will explore this in Section 2). Bootstrap is an HTML, CSS, and JavaScript framework for developing responsive, mobile friendly web applications. Responsive applications resize the content of the browser based on the screen size.
1.2.2 - Platforms The Apache HTTP Server is an application server that renders static or dynamic HTML content to the browsers. Html pages that include JSON data, HTML files, JavaScript files and any other content are sent via the Apache HTTP server to the browser.

Dreamfactory functions as a server middleware which connects an application to a backend resource such as SQL/noSQL database, file storage or email. Through AngularJS, HTTP request headers will be directed to the location of Dreamfactory. HTTP methods will then be called on the connected Dreamfactory resources.
MySQL is a relational database accessed via SQL commands from the server.

1.2.3 - Additional Components Bitnami is an installer which installs and configures application bundles; in our case Apache, MySQL and Dreamfactory on Windows or UNIX platforms. It is also responsible for starting and stopping the Apache server and mySQL database, provides for admin access, environment variable configuration and component connectivity. Bower is a package manager is responsible for installing and organizing necessary web components including frameworks and libraries.

Section 2 - AngularJS Introduction 2.1 Basic structure of a Web Application using Angular Below is a sample boilerplate of a web application using AngularJS with the addition of a simple controller. The steps and necessary components for creating an HTML5, AngularJS compatible .html file are included. (See below)

testApp.html
Step-1: 
Declare HTML step-2 Define App
Step-2 Load the library: 
<scrpt src ="https/ajaxgoogleapis.com…/angularJS"</script>
Step-3: 
Define controller
Step-4:
Define model function TextController($scope){ $scope.someText = “Binding” } 
Step 5: Define view:
{{someText}}
Step 6: 
Load in browser:

Result: When loading the HTML page we will see the output “Binding”. In this example we created a controller “Text Controller” and added the variable someText to its scope. The The curly braces are used {{ }} to bind expressions to elements is built-in Angular, in our case someText is set equal to the string “Binding” and was assigned to a controller. When we invoked {{someText}} the value of the bounded variable is displayed.

2.2 - AngularJS Topics 2.2.1 Built-in Directives AngularJS lets you extend HTML with attributes called Directives. A built-in directive is one that is already pre-defined by Angular, all built-in directives are prefixed with the ng namespace.

Scopes are objects that contain functionality and data to use when rendering the view. You can think of scopes as view models.

2.2.3 Data-Binding Consider the following example.
<script src="angular.js"></script>
First name: {{firstName}}
Last name:
<label>Set the first name: <input type="text" ng-model="firstName"/></label>
<label>Set the last name: <input type="text" ng-model="lastName"/></label>
<!---------------------------------------------Example 1 (One way binding)-------------------------------------->
   <body ng-app ng-init="firstName = ‘Andreas'; lastName = 'Himonas';">
<br> First name: {{firstName}}<br />
<br> Last name: <span ng-bind="lastName"></br>

<!-------------------------------------------Example 2 (Two way binding)-------------------------------------------->
 	<label>Set the first name: <input type="text" ng-model="firstName"/></label>
 	<label>Set the last name: <input type="text" ng-model="lastName"/></label>
   </body>
</html>


Results
Example 1
Output:
First name:  Andreas
lastName = 'Himonas'; 

The code in Example1 simply sets the first and last name in a static fashion by declaring them with the directive ng-init and displaying the value of the variables via {{firstName}} and ng-bind="lastName"(these statements are analogous). 

Example 2:
Behavior:
The code in Example2 behaves a bit differently and has dynamic attributes. At the most basic level, the ngModel directive provides a two-way data-binding mechanism that connects the view-model to various User Interface controls. In our case it two-way binded our View-Model to input type="text" conversely, AngularJs through the ng-model directive knows how to update the Input value as our View-Model changes. The effects in this case causes our variable firstName and lastName dynamically change its value based on what the user inputs as text.

2.2.3 - Service Objects 
Services provide a method for us to keep data around for the lifetime of the app and aid in communicating across controllers. Services are objects that are instantiated only once per app. They provide an interface to keep together methods that relate to a specific function.

$http, for instance, is an example of an AngularJS service. It provides low-level access to the browser’s XMLHttpRequest object. Rather than filling the application with low-level calls to the XMLHttpRequest object, we can alternatively use a much more efficient $http API (see 2.3.2). 

2.2.4 - Module Loading & Dependencies
A module is a collection of configuration and run blocks which get applied to the application during the bootstrap process. In its simplest form the module consist of a collection of two kinds of blocks, which are listed below.

Configuration blocks 
These blocks will get executed during the provider registrations and configuration phase. Only providers and constants can be injected into configuration blocks. This is to prevent accidental instantiation of services before they have been fully configured.

Run blocks
These blocks will get executed after the injector is created and are used to kickstart the application. Only instances and constants can be injected into run blocks. This is to prevent further system configuration during application run time.

ex.
angular.module('myModule', [])

.config(function(injectables) { // provider-injector
  // This is an example of config block.
  // You can only inject Providers (not instances) into config blocks
 // $routeProvider will go here to set the appropriate routes
})

.run(function(injectables) { // instance-injector
//You can only inject instances (not Providers) into run blocks.
/This is where you would assign your $HTTP service object.
});

2.3 - Combined Topics 
2.3.1 - Promises
Promises are the JavaScript way of representing an item of work that will be performed asynchronously and that will be completed at some point in the future. The most common way to encounter promises is by making Ajax requests; the browser makes the HTTP request behind the scenes and uses a promise to notify your application when the request has completed. 

2.3.2 - Making an Ajax Call from Angular with JSON Data and Promises
The $http service is used for making Ajax requests, and the get method takes the URL of the file that you want to retrieve from the server.

//The following code snippet would typically found in app.js
//We assume that that “file.json” is in the same path as the code below
var asynchronousRequest = $http.get("file.json");  
asynchronousRequest.success(function (data) { //example of Asynchronous request
 $scope.retrieved_JSON_data = data;
}); 
…
/* The remaining code will continue to execute while the promise is being fulfilled*/
…

The Ajax request is performed asynchronously, and the browser continues to run the application while the request is being made. The $http.get method returns a promise object that can be used to receive notifications about the Ajax request. 

 2.3.3 MVC Implementation 
Consider the following example.

File Structure of Web Application
main.js     <!--attaches controllers to module-->
app.js      <!--configuration-->
index.html  <!-- main layout -->
pages <!-- the pages that will be injected into the main--> 
layouts
                    - home.html
                    - about.html
----------------------------------------------------app.js--------------------------------------------------------------
//Includes ngRoute for all our routing needs
angular.module('sampleApp', ['ngRoute']);
//Configure our routes
   sampleApp.config(function($routeProvider) {
        $routeProvider
            //route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            //route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });
    });
-------------------------------------------------main.js----------------------------------------------------------------
angular.module('sampleApp', []);
//attaches the controller to the module and inject Angular's $scope
.controller('mainController', function($scope) {
//create a message to display in our view
 $scope.message = 'I AM THE MAIN CONTROLLER AND I WILL BE DISPLAYED’;
 });
----------------------------------------------index.html--------------------------------------------------------------
<!DOCTYPE html>

<!-- define angular app, typically uses ng-app followed by the  module name-->
<html ng-app="sampleApp"> 

<head>
<!-- load bootstrap via CDN -->
<!-- CDN - (content delivery network) : system of distributed servers that deliver web content to users --> 
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" />
<!-- Load angular.js and angular-route.js via CDN -->
<scriptsrc="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-route.js"></script>
</head>
     <!-- define angular controller -->
    <body ng-controller="mainController">
        <!-- MAIN CONTENT AND INJECTED VIEWS -->
       <div id="main">
        {{ message }}
       <!-- angular templating -->
       <!-- this is where content will be injected -->
       </div> 
   <!-- Load additional scripts --> 
   <script src="app.js"></script>
   <script src="main.js"></script> 
   </body> 
</html>

BEHAVIOR:
 The most intuitive way to to analyze the effects of the above code is to first analyze app.js(our configuration code) then main.js (our controller code) then index.html(our main application page). In app.js we initially injects ngRoute into our application module. This directive is used to keep track of the location of the user by deep linking Urls to controllers and views and attempting to map the current path to an existing route. In app.js we have two route cases the first one being .when('/'...) and the second .when('/contact'...). In the first case the ‘/’ represents our root directory(index.htm), hence when the user sends the initial HTTP request, the server will know that the index.html template needs to be loaded along with its corresponding controller (mainController). Typically templates are loaded along with controllers, this helps to separate the code and restricts the controller to only accessing part of the model. In main.js we attached the mainController to our module. The controller passed in a function of the $scope and set the scope variable message to 'I AM THE MAIN CONTROLLER AND I WILL BE DISPLAYED’'. In practice we should’ve also set a contactsController with its own scope but for simplicity this is left out. Once all necessary controllers are attached to the module we can begin to reference them in our HTML templates. Before we begin to analyze our main application page it is important to note the dependencies that were loaded, bootstrap.css,  angular.js and angular-route.js(ngRoute), which were declared in the <head> of our HTML page. Additionally, any files that need to be loaded in order for the application to run must have their paths declared, as seen in the bottom of the <body>. After we have index.html setup the controller can be declared and thus referencing its scope variables is referencing the scope variables that were declared upon controller instantiation in main.js. Hence the effects of binding {{message}} under the main controller results in the message 'I AM THE MAIN CONTROLLER AND I WILL BE DISPLAYED’ being displayed. A few more things to note, in app.js we originally had a routing case when('/contact'...) if we wanted to have another template loaded with a potential contactController we would have the following code somewhere in index.html <a href="#/contacts">Contacts</a>. The result of clicking this link would notify the route provider that our paths have changed and the contacts.html page should be loaded. If we had instantiated and attached a contactsController to our module we could declare the controller in contacts.html and reference its scope variables in the same fashion index.html did with the mainController.  
 
2.3.4 Controller Hierarchy (Scopes Within Scopes) 
Consider the following example: 

-------------------------------------------------main.js----------------------------------------------------------------
app.controller('ParentController', function($scope) { 
$scope.person = {greeted: false}; 
}); 

app.controller('ChildController', function($scope) { 
$scope.sayHello = function() { 
$scope.person.name = "Andrew Himonas";
$scope.person.greeted = true; 
} });

----------------------------------------------index.html--------------------------------------------------------------
<div ng-controller=”ParentController”>  ←(***)
<div ng-controller=”ChildController> 
        <!-- when say hello is clicked say hello function from child controller is invoked --> 
        <a ng-click= ”sayHello()”> say hello</a> 
    <div> 
        {{ person }} 
   </div>

Results:
Say hello 
{“greeted”:true, “name”:Andrew Himonas}

BEHAVIOR: The reason the value for greeted changed from false to true in the parent controller’s scope is due to the way we nested the controllers in index.html. If we bind the ChildController under the ParentController in our view (***), then any changes to the parent of the ChildController’s $scope object will also be reflected in the ParentController’s $scope object. Due to controller behavior, we can then reference data in the ParentController’s $scope in the child’s scope. Hence if the controllers shared the same attributes any changes from the child is reflected in the parents.

Section - 3 DreamFactory Integration

3.1 DreamFactory Overview
Through our application we will create and connect to a DSP that lives on the DreamFactory Hosted System. Assuming that we have installed and started Bitnami correctly as well as created an instance of the app in our DSP (DSP app), we can begin to use the Dreamfactory API to create database tables and utilize session capabilities.  
 
3.2 Creating mySQL Tables via Dreamfactory API. 
Dreamfactory’s REST API allows users to create mySQL database tables, which in turn will be accessed through our application.  In our DSP if we Navigate to the schema tab and click on the ‘db’ tab it will expand and have an option at the bottom to ‘Import JSON Schema’. Once clicked we can paste in a JSON from and hit the Post Schema button. This will create a mySQL table that we defined in the JSON schema. Later we will access the table through our application.

The following is a JSON schema example used in our application which has fields for text, strings and integer fields.  

{
  "name": "TutorAppContacts",
  "label": "TutorAppContacts",
  "plural": "TutorAppContacts",
  "primary_key": "id",
  "name_field": null,
  "field": [
    {
      "name": "field_text",
      "is_new": false,
      "label": "Field Text",
      "type": "text"
    },
    {
      "name": "field_int",
      "is_new": false,
      "label": "Field Int",
      "type": "integer"
    },
    {
      "name": "email",
      "is_new": false,
      "label": "Email",
      "type": "string"
    },
    {
      "name": "last_name",
      "is_new": false,
      "label": "Last Name",
      "type": "string"
    },
    {
      "name": "first_name",
      "is_new": false,
      "label": "First Name",
      "type": "string"
    },
    {
      "name": "id",
      "label": "Id",
      "type": "id",
      "db_type": "int(11)",
      "length": 11,
      "precision": 11,
      "scale": 0,
      "default": null,
      "required": false,
      "allow_null": false,
      "fixed_length": false,
      "supports_multibyte": false,
      "auto_increment": true,
      "is_primary_key": true,
      "is_foreign_key": false,
      "ref_table": "",
      "ref_fields": "",
      "validation": null,
      "value": [],
      "is_new": false
    }
  ]
}

3.3 Accessing and Configuring DSP
In order to respond to requests from your application the DSP requires a specific header, namely, 'X-DreamFactory-YOUR_APPLICATION_NAME'. To configure AngularJS to use this header we have to configure the AngularJS $httpProvider. In order to do this we add the following constants and headers to the application (specifically in app.js which generally holds configuration script).

DSP Constants and Configuration 
The application needs to be aware of the location of your DSP, this is done by attaching constants which defines our DSP location. (Seen below). 

    .constant('DSP_URL', ‘REPLACE WITH DSP URL’)
    .constant('DSP_API_KEY', ‘REPLACE WITH NAME OF DSP APP’)
   
In order to finish our DSP configuration we need to attach a piece of information to our module which in turn tells AngularJS to add the X-DreamFactory header to all $http requests made. (Seen below).

    .config(['$httpProvider', 'DSP_API_KEY', function($httpProvider, DSP_API_KEY) {
        $httpProvider.defaults.headers.common['X-DreamFactory-Application-Name'] = DSP_API_KEY;
    }])

Section 4 - Application Recomposition 
Before we begin we will need the following bower components in order to successfully authenticate a user and utilize the Dreamfactory table module.

ngCookies
ngMessages
ngResource
ngRoute
ngSanitize
dfTable
dfUserManagement

Assuming we have done all the necessary Dreamfactory setup, that is created our database table and application instance in The Dreamfactory environment (see Section 3 - Dreamfactory). We can create the directories and files that our application needs, these are listed below. 

index.html:  the base html file for our Angular app.
scripts directory: contains JavaScripts files
        - apps.js: our main Angular application code
        - controllers.js: our Angular controllers 
styles directory: contains css style sheet
- main.css
views directory: contains Angular templates
	-main.html 
	-login.html
	-register.html 
bower_components directory: contains JavaScript/web dependencies, installed by Bower.


4.1 - Authentication 
We will first begin explaining the authentication portion and then move onto actually referencing the Dreamfactory table from our /scripts/main.js. In order to authenticate someone in our application we'll need a way for them to login, a way for them to logout  and a way for them to register. The DreamFactory User Management module has directives along with forms which allows us to do this. In /scripts/app.js we initially have the following code which consists of dependencies and Dreamfactory configuration constants (see Dreamfactory 3.3) attached to our application module.
 
angular.module('TutorApp', [
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'dfTable',
    'dfUserManagement'
  ])


//Our DSP_URL is localhost
.constant('DSP_URL', ‘REPLACE WITH DSP URL’)


//our DSP API KEY is tutorApp 
.constant('DSP_API_KEY', ‘REPLACE WITH NAME OF DSP APP’)


.config(['$httpProvider', 'DSP_API_KEY', function($httpProvider, DSP_API_KEY) {
$httpProvider.defaults.headers.common['X-DreamFactory-Application-Name'] = DSP_API_KEY;
 }])


The first step is to set up the routes. We need routes to the main, the login, the logout and register pages, keep in mind views are typically assigned with their corresponding controllers. This is demonstrated in the following code in /scripts/app.js.


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


The file /scripts/main.js initially contains the following code, which consists of controllers attached to our application module. We will get into the semantics of the functionality of the controllers in just a minute. 


angular.module('TutorApp’')
.controller('TopLevelAppCtrl', ['$scope', function($scope) { }])
.controller('LoginCtrl', ['$scope', function($scope) {  }])
.controller('LogoutCtrl', ['$scope', function($scope) { }])
.controller('RegisterCtrl', ['$scope', function($scope) { }])
.controller('NavigationCtrl', ['$scope', function($scope) { }]);


The application requires data about the user. Hence we have to be able to display appropriate navigation and protect certain routes based on whether or not the user is logged in. These two things have a global scope in the application, hence following code in index.html.


<div data-ng-controller="TopLevelAppCtrl">
/*The closing div tag will encapsulate a majority of the class to allow a hierarchy amongst the controllers. Meaning, we now have a controller that our child application controllers can inherit from.*/


The TopLevelAppCtrl controller found in /scripts/main.js should check for a current user on instantiation. Basically if we reload the app and we're logged in we want the currentUser variable to be adjusted accordingly. In order to do this we need to inject the DreamFactory User Management module's 'UserDataService' into the TopLevelAppCtrl.
   
 // inject 'UserDataService'
 .controller( 

, ['$scope', 'UserDataService', function ($scope, UserDataService) {
            // Add $scope variable to store the user
            $scope.currentUser = UserDataService.getCurrentUser();
 }])


Since we know that our $scope variable in our TopLevelAppCtrl controller are available through inheritance we can set the user in our login and logout success event handlers. To set a parent's $scope variable we use the $parent property. This is done in the following code /scripts/main.js.
   
.controller('LoginCtrl', ['$scope', '$location', 'UserEventsService', function($scope, $location, UserEventsService) {
            $scope.$on(UserEventsService.login.loginSuccess, function(e, userDataObj) {
            $scope.$parent.currentUser = userDataObj;
            $location.url('/');
            });
        }])
    
The DreamFactory User Management module has passed our currently logged in user object with the event. We use this data to set the $scope.currentUser variable that was inherited from our parent controller(TopLevelAppCtrl) .We also need to be able to logout the user, hence the following code in /scripts/main.js.
   
.controller('NavigationCtrl', ['$scope', function($scope) {
            $scope.hasUser = false;
            $scope.$watch('currentUser', function(newValue, oldValue) {
            $scope.hasUser = !!newValue;
            })
        }])
.controller('LogoutCtrl', ['$scope', '$location', 'UserEventsService', function($scope, $location, UserEventsService) {
            $scope.$on(UserEventsService.logout.logoutSuccess, function(e, userDataObj) {
            $scope.$parent.currentUser = userDataObj;
            $location.url('/')
            })
        }]);    


In the NavigationCtrl, we have variable called $scope.hasUser and initialized it to false. We have also set a watcher on the inherited 'currentUser' variable. When the currentUser variable is updated by either a login or logout event the NavigationCtrl will see that through the watcher and sets $scope.hasUser accordingly. Essentially $scope.hasUser will be set to false if the user is not logged in and set to true if the user is logged in we see the advantage of this in the following code in /scripts/main.js. 
   
        <div data-ng-controller="NavigationCtrl">
            <ul>
                <li data-ng-if="!hasUser"><a href="#/login">Login</a></li>
	   <li data-ng-if="!hasUser"><a href="#/register">Login</a></li>
                <li data-ng-if="hasUser"><a href="#/logout">Logout</a></li>
            </ul>
        </div>
    
Now we can evaluate expressions in context to the NavigationCtrl controller. The use of the data-ng-if directives inside the list item tag hides certain attributes based on the expression. This means evaluating data-ng-if="!hasUser" results in only the login and registration links to display, while evaluating data-ng-if="hasUser" results in only the logout link to display.

NOTE: THE LOGIN SUBMISSION IS NOT COMPATIBLE WITH NEWER VERSIONS OF ANGULAR. 

Hence actually submitting the users credentials was done through the TopLevelAppCtrl in /scripts/main.js. When the user enters his credentials in the login screen it stores them in a variable named creds through binding (see below).


$scope.creds = {email:"Enter your email here!", password:"Enter pass"};

Next the getSession() function, which takes an email and password as arguments posts the credentials through Dreamfactory. Posting to user/session creates a new session and logs in the user, assuming that the user has already registered. Hence our TopLevelAppCtrl code will have the following. (see below)

$scope.getSession = function (emailStr, passwordStr) {
 return $https({
	method: "POST",
	url: 'http://localhost/rest/user/session',
	data: {
	         "email" : emailStr, "password" : passwordStr
	}
	});

4.2 - Dreamfactory Table 
That wrapped up the authentication portion, now we can move onto The Dreamfactory table module. The dfTable is a directive that takes an options object. To configure it, add the following code to /views/main.html.


<df-table options="options"></df-table>
Next we allow the main controller in /scripts/main.js to access our database in Dreamfactory(see Dreamfactory 3.4). 
//The DSP_URL is localhost
  .controller('MainCtrl', function ($scope, DSP_URL) {
        $scope.options = {
            service: 'db',
            table: 'SchemaAppContacts',
            url: DSP_URL + '/rest/db/SchemaAppContacts'
        }
  });

At this point we have access to our table and can invoke a create-records form which adds a new record to the database. Keep in mind the database is linked to our DSP and AngularJS is aware of the location of our DSP. From here we can dig into the module and customize the df-table as necessary.

Below is the JavaScript code which is creating a form from our database table entries and allowing user to create a record. When the user fills out the fields and hits the submit button our AngularJS application sends an HTTP request to Dreamfactory using the header we specified with $http.
