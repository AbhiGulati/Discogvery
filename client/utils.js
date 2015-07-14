angular.module('music.services', [])

.factory('APICalls', function($http) {
  var getArtist  = function (artistName) {
    return $http({
      method: 'GET',
      url: 'http://ws.audioscrobbler.com/2.0/?method='
       + 'artist.search&artist=' + artistName
       + (length ? '&length=' + length : '')
       + '&api_key=9a542383b477d237de93ea727034cb5e'
    });
  }

  var getSimilar  = function (artistName, length) {
    return $http({
      method: 'GET',
      url: 'http://ws.audioscrobbler.com/2.0/?method='
       + 'artist.getsimilar&artist=' + artistName
       + (length ? '&limit=' + length : '')
       + '&api_key=9a542383b477d237de93ea727034cb5e&format=json'
    });
  }

  return {
    getArtist : getArtist,
    getSimilar : getSimilar
  };
})

.factory('CompareLists', function() {
  var intersection = function(arr1, arr2) {
    var res = [];
    arr2Names = _.pluck(arr2, 'name');
    return _.filter(arr1, function(artistObj) {
      return _.contains(arr2Names, artistObj.name);
    });
  }

  return {
    artistIntersection : intersection
  }

})