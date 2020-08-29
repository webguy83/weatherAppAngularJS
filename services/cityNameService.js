app.service('cityNameService', function ($location) {
  this.cityName = "Langley";
  this.go = (path) => {
    $location.path(path);
  }
})