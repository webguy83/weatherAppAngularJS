app.directive('weatherBlock', function () {
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