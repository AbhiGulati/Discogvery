angular.module('music.services', [])

.factory('APICalls', function($http) {
  var getArtist  = function (artistName) {
    return $http({
      method: 'GET',
      url: 'http://ws.audioscrobbler.com/2.0/?method='
       + 'artist.search&artist=' + artistName + 
       '&api_key=9a542383b477d237de93ea727034cb5e'
    });
  }

  var getSimilar  = function (artistName) {
    return $http({
      method: 'GET',
      url: 'http://ws.audioscrobbler.com/2.0/?method='
       + 'artist.getsimilar&artist=' + artistName + 
       '&api_key=9a542383b477d237de93ea727034cb5e&format=json'
    });
  }

  return {
    getArtist : getArtist,
    getSimilar : getSimilar
  };
})