app.controller('HomeController', function ($scope, cityNameService) {
  $scope.cityName = cityNameService.cityName;

  $scope.$watch('cityName', function () {
    cityNameService.cityName = $scope.cityName;
  })

  $scope.go = cityNameService.go;
})