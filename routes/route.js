app.config(function ($routeProvider) {
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
