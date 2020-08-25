angular.module('myApp', ['ngMaterial', 'ngMessages', 'ngResource', 'ngRoute'])
  .service('cityNameService', function () {
    this.cityName = "Langley";
  })
  .directive('weatherBlock', function () {
    return {
      templateUrl: 'directives/weather-block.directive.html',
      replace: true,
      restrict: 'E',
      scope: {
        date: '@',
        image: '@',
        description: '@',
        temp: '@',
        convertTime: '&',
        convertTempToC: '&'
      }
    }
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
  .controller('WeatherController', function (cityNameService, $scope, $resource, $routeParams, $location, $filter, $log) {
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

    $scope.go = (path) => {
      $location.path(path);
    }
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
