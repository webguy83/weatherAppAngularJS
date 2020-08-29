app.controller('WeatherController', function (cityNameService, $scope, $resource, $routeParams, $filter) {
  $scope.cityName = cityNameService.cityName;
  $scope.hourIntervals = +$routeParams.hourIntervals || 40;
  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast")
  $scope.errorMsg = '';

  $scope.convertTime = function (date) {
    return $filter('date')(new Date(date * 1000), 'h:mm a');
  }

  $scope.convertDate = function (date) {
    return $filter('date')(new Date(date * 1000), 'MMM d, y');
  }

  $scope.weatherAPI.get({
    q: $scope.cityName, cnt: $scope.hourIntervals, appid: apiKey
  })
    .$promise
    .then((data) => {
      const output = {};
      data.list = data.list.filter(item => {
        return $scope.convertTime(item.dt) === '2:00 PM' ||
          $scope.convertTime(item.dt) === '8:00 AM' ||
          $scope.convertTime(item.dt) === '11:00 PM'
      })

      data.list.forEach(i => {
        if (output[$scope.convertDate(i.dt)]) {
          output[$scope.convertDate(i.dt)].push(i);
        } else {
          output[$scope.convertDate(i.dt)] = [i];
        }
      })

      $scope.weatherAPIOutput = output;
    })
    .catch((err) => {
      $scope.errorMsg = err.data.message;
    })

  $scope.convertTempToC = function (temp) {
    return Math.round(temp - 273.15);
  }

  $scope.go = cityNameService.go;
})