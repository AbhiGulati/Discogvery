angular.module('music', ['music.services'])

.controller('search', function ($scope, APICalls) {
  $scope.similarArtists = [];

  $scope.getSimilar = function(artist) {
    APICalls.getSimilar(artist)
    .then(function (result) {
      console.log(result);
      $scope.similarArtists = result.data.similarartists.artist;
    });
  }
});