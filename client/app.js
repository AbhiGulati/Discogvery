angular.module('music', ['music.services'])

.controller('search', function ($scope, APICalls) {
  $scope.similarArtists = {left:[], right:[]};

  $scope.getSimilar = function(artist, side) {
    if(side === 'left' || side === 'right') {
      APICalls.getSimilar(artist)
      .then(function (result) {
        $scope.similarArtists[side] = result.data.similarartists.artist;
      });
    } else {
      console.log("invalid input for 'side'");
    }
  }

  $scope.getBoth = function() {
    
  }
});