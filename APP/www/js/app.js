// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
  })

  .config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('map', {
    url: '/map',
    templateUrl: 'templates/map.html',
    controller: 'MapCtrl',


  })

  .state('sms', {
    url: '/sms',
    templateUrl: 'templates/sms.html',
    controller: 'SMSController',
  })


  .state('emergency', {
    url: '/emg',
    templateUrl: 'templates/emergency-tab.html',
    //controller: 'SMSController',
  });

  $urlRouterProvider.otherwise("/map");

})
app.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};





  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);



    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });

  var infoWindow = new google.maps.InfoWindow({
      content: "Here You Are!"
  });

  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });

});
  }, function(error){
    console.log("Could not get location");
  });
});

/*var app = angular.module('starter', ['ionic', 'ngCordova'])*/

//Controller to handle SMS
app.controller('SMSController', function($scope, $cordovaSms) {
  $scope.sms={
      number: 12462415241,
      message: "Put GPS coordinates here for https://www.google.com/maps/"
  };
  document.addEventListener("deviceready", function() {

  var options = {
    replaceLineBreaks: false, // true to replace \n by a new line, false by default
    android: {
      intent: '' // send SMS with the native android SMS messaging
        //intent: '' // send SMS without open any other app
        //intent: 'INTENT' // send SMS inside a default SMS app
    }
  };
 console.log($scope.sms.number);
 console.log($scope.sms.message);

 //actual sms send function
  $scope.sendSMS = function() {

    $cordovaSms
      .send($scope.sms.number, $scope.sms.message, options) //take number and message from scope
      .then(function() {
        console.log('Success');
        alert('Success');
        // Success! SMS was sent
      }, function(error) {
        console.log('Error');
        alert('Error');
        // An error occurred
      });
  }
});
});
