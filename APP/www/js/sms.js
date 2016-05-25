var app = angular.module('starter', ['ionic', 'ngCordova'])

//Controller to handle SMS
app.controller('SMSController', function($scope, $cordovaGeolocation, $cordovaSms) 
{
    //  $scope.sms={
    //      number: 12462415241,
    //      message: "Put GPS coordinates here for https://www.google.com/maps/"
    //  };
    var options = {timeout: 10000, enableHighAccuracy: true};
    
    $cordovaGeolocation.getCurrentPosition(options).then(function (position) 
    {
          var lat  = position.coords.latitude
          var long = position.coords.longitude

          $scope.sms=
            {
                number: 12462415241,
                message: "Put GPS coordinates here for https://www.google.com/maps/@" + lat + "," + long + ",15z"
            };
    }, function(err) 
        {
          // error
          console.log("Could not get location");
        }
    );

    document.addEventListener("deviceready", function() 
    {

        var options = 
        {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: 
            {
              intent: '' // send SMS with the native android SMS messaging
                //intent: '' // send SMS without open any other app
                //intent: 'INTENT' // send SMS inside a default SMS app
            }
        };
         
         console.log($scope.sms.number);
         console.log($scope.sms.message);

         //actual sms send function
          $scope.sendSMS = function() 
          {

            $cordovaSms.send($scope.sms.number, $scope.sms.message, options).then(function() 
            {
                console.log('Success');
                alert('Success');
                // Success! SMS was sent
            }, function(error) 
               {
                    console.log('Error');
                    alert('Error');
                    // An error occurred
               });
          }
    }
    );
}
);