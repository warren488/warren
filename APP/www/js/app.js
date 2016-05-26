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
    controller: 'EMGController',
  })


  .state('services', {
    url: '/ser',
    templateUrl: 'templates/services.html',
    //controller: 'SMSController',
  });

  $urlRouterProvider.otherwise("/map");

})
app.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $cordovaSms, $ionicPopup, $timeout) {
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
    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        var lat  = position.coords.latitude
        var long = position.coords.longitude

        $scope.sms={
        number: 12462415241,
        message: "HELP ME! Find me at https://www.google.com/maps/@" + lat + "," + long + ",15z"
    };
      }, function(err) {
        // error
        console.log("Could not get location");
      });

       //ignore console.log($scope.sms.message);

       $scope.DclickA = function() {
         $scope.showPopup = function() {
           $scope.data = {};
           var myPopup = $ionicPopup.show('double tap to send sms');
           myPopup.then(function(res) {
             console.log('Tapped!', res);
           });

           $timeout(function() {
             myPopup.close(); //close the popup after 3 seconds for some reason
           }, 3000);
         };

         alert('double tap to send sms');
       }

      //actual sms send function
    $scope.sendSMS = function() {
        console.log($scope.sms.message);
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

/*var app = angular.module('starter', ['ionic', 'ngCordova'])*/
app.service('smsService', function () {
    var num = 0;
        
    return {
    getNum: function () {
        if (num == 0)
            return 12462415241;
        else
            return num;
    },
    setNum: function (value) {
        num = value;
        console.log("THe num is " + num);
    }
    }
});

//Controller to handle SMS
app.controller('SMSController', function($scope, $cordovaGeolocation, $cordovaSms, smsService) {
//  $scope.sms={
//      number: 12462415241,
//      message: "Put GPS coordinates here for https://www.google.com/maps/"
//  };

var options = {timeout: 10000, enableHighAccuracy: true};
 $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
     
      var smsNum = smsService.getNum();
      
      $scope.sms={
      number: smsNum,
      message: "HELP ME! Find me at https://www.google.com/maps/@" + lat + "," + long + ",15z"
  };
    }, function(err) {
      // error
      console.log("Could not get location");
    });

  document.addEventListener("deviceready", function() {
      console.log("Entered sms controller");
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: '' // send SMS with the native android SMS messaging
          //intent: '' // send SMS without open any other app
          //intent: 'INTENT' // send SMS inside a default SMS app
      }
    };
   //console.log($scope.sms.number);
   //console.log($scope.sms.message);

   $scope.setNumber = function(num) {
      $scope.sms={
            number: num,
        };
          console.log($scope.sms.number);

    }
<<<<<<< HEAD

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
=======
  };
 console.log($scope.sms.number);
 console.log($scope.sms.message);

 //actual sms send function
  $scope.sendSMS = function() {
    alert('trigered');

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
>>>>>>> 18c7e12be70ff7822628b7ad6dbc150afd0d26e5
});


//Controller to handle SMS
app.controller('EMGController', function($scope, smsService) {
//  $scope.sms={
//      number: 12462415241,
//      message: "Put GPS coordinates here for https://www.google.com/maps/"
//  };
//var options = {timeout: 10000, enableHighAccuracy: true};
// $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
//      var lat  = position.coords.latitude
//      var long = position.coords.longitude
//      
//      $scope.sms={
//      number: 12462415241,
//      message: "HELP ME! Find me at https://www.google.com/maps/@" + lat + "," + long + ",15z"
//  };
//    }, function(err) {
//      // error
//      console.log("Could not get location");
//    });
//    
//  document.addEventListener("deviceready", function() {
//
//  var options = {
//    replaceLineBreaks: false, // true to replace \n by a new line, false by default
//    android: {
//      intent: '' // send SMS with the native android SMS messaging
//        //intent: '' // send SMS without open any other app
//        //intent: 'INTENT' // send SMS inside a default SMS app
//    }
 // };
 //console.log($scope.sms.number);
 //console.log($scope.sms.message);
 
 $scope.setNumber = function(num) {
   smsService.setNum(num)
   
    
  }

// //actual sms send function
//  $scope.sendSMS = function() {
//
//    $cordovaSms
//      .send($scope.sms.number, $scope.sms.message, options) //take number and message from scope
//      .then(function() {
//        console.log('Success');
//        alert('Success');
//        // Success! SMS was sent
//      }, function(error) {
//        console.log('Error');
//        alert('Error');
//        // An error occurred
//      });
//  }
//});
});
