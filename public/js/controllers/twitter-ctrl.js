  app.factory("InstagramAPI", ['$http', function($http) {
	var client_id = '5005fb61f69a4b44ad53ab6bc2662431';
    return {
      fetchPopular: function(callback){
        var endpoint = "https://api.instagram.com/v1/media/popular";
        endpoint += "?count=15";
        endpoint += "&client_id=" + client_id;
        endpoint += "&callback=JSON_CALLBACK";
        $http.jsonp(endpoint).success(function(response){
          callback(response.data);
        });
      }
    }
  }]);

app.controller('TwitterCtrl', function ($scope, InstagramAPI) {
	$scope.data = {};
	InstagramAPI.fetchPopular(function(data){
		$scope.pics = data;

	});  
});


