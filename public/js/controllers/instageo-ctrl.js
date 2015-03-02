

  app.factory("InstagramAPI", ['$http', function($http) {
  

    return {
      fetchGeo: function(lon,lat, callback){
        var endpoint = "https://api.instagram.com/v1/media/search?";
        
        
        
        endpoint += "&client_id=5005fb61f69a4b44ad53ab6bc2662431";
        endpoint +="&lat=" + lat;
        endpoint +="&lng=" + lon;
        endpoint +="&distance=100"
        endpoint += "&callback=JSON_CALLBACK";
        $http.jsonp(endpoint).success(function(response){
          callback(response.data);
        });
      }
    }
  }]);

app.factory("GoogleApi", ['$http', function($http){

  return {
    fetchCoordinates: function(address, callback){
      var endpoint = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&callback=JSON_CALLBACK"
      $http.get(endpoint).success(function(response){
        callback(response.results);
      });
    }

  }
}]);



app.controller('InstaGeoCtrl', function ($scope, InstagramAPI, GoogleApi) {
	$scope.koordinaatit = {};


   $scope.searchAddress = function(address){
      GoogleApi.fetchCoordinates(address, function(results){
        var lat = results[0].geometry.location.lat;
        var lon = results[0].geometry.location.lng;

        InstagramAPI.fetchGeo(lon, lat, function(data){
    $scope.pics = data;
    
    

  });  

      });
   };


  

  $scope.searchPictures = function(lon,lat){
  $scope.data = {};


	InstagramAPI.fetchGeo(lon, lat, function(data){
		$scope.pics = data;
    
    

	});  
};

});


