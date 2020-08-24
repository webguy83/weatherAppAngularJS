angular.module('myApp', ['ngMaterial', 'ngMessages', 'ngResource', 'ngRoute'])
  .service('cityNameService', function () {
    this.cityName = "Vancouver";
  })
  .controller('ToolBarController', function ($scope, $location) {
    $scope.go = (path) => {
      $location.path(path);
    }
  })
  .controller('HomeController', function ($scope, $location, cityNameService) {
    $scope.cityName = cityNameService.cityName;

    $scope.$watch('cityName', function () {
      cityNameService.cityName = $scope.cityName;
    })

    $scope.go = (path) => {
      $location.path(path);
    }
  })
  .controller('WeatherController', function (cityNameService, $scope, $resource, $routeParams, $location, $log) {
    $scope.cityName = cityNameService.cityName;

    $scope.hourIntervals = +$routeParams.hourIntervals || 8;

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast")

    $scope.weatherAPIOutput = $scope.weatherAPI.get({
      q: $scope.cityName, cnt: $scope.hourIntervals, appid: apiKey
    })

    $scope.convertDate = function (date) {
      return new Date(date * 1000);
    }

    $scope.convertTempToC = function (temp) {
      return Math.round(temp - 273.15);
    }

    $scope.go = (path) => {
      $location.path(path);
    }

    $log.log($scope.weatherAPIOutput)
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'HomeController'
      })
      .when('/weather', {
        templateUrl: 'pages/weather.html',
        controller: 'WeatherController'
      })
      .when('/weather/:hourIntervals', {
        templateUrl: 'pages/weather.html',
        controller: 'WeatherController'
      })
  })
