

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


app.controller('TwitterCtrl', function ($scope, InstagramAPI) {
	

  

  $scope.searchPictures = function(lon,lat){
  $scope.data = {};


	InstagramAPI.fetchGeo(lon, lat, function(data){
		$scope.pics = data;
    
    

	});  
};

});


