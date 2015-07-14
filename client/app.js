var app = angular.module('music', ['music.services'])

.controller('search', function ($scope, APICalls, CompareLists) {
  $scope.similarArtists = {left:[], right:[]};
  //var sample = JSON.parse('[{"name":"Thom Yorke","mbid":"8ed2e0b3-aa4c-4e13-bec3-dc7393ed4d6b","match":"1","url":"www.last.fm/music/Thom+Yorke","image":[{"#text":"http://userserve-ak.last.fm/serve/34/16916957.jpg","size":"small"},{"#text":"http://userserve-ak.last.fm/serve/64/16916957.jpg","size":"medium"},{"#text":"http://userserve-ak.last.fm/serve/126/16916957.jpg","size":"large"},{"#text":"http://userserve-ak.last.fm/serve/252/16916957.jpg","size":"extralarge"},{"#text":"http://userserve-ak.last.fm/serve/_/16916957/Thom+Yorke.jpg","size":"mega"}],"streamable":"0"},{"name":"Atoms for Peace","mbid":"9e299bee-d7e2-49f3-8cd7-d6b28ab204d1","match":"0.699154","url":"www.last.fm/music/Atoms+for+Peace","image":[{"#text":"http://userserve-ak.last.fm/serve/34/90676581.png","size":"small"},{"#text":"http://userserve-ak.last.fm/serve/64/90676581.png","size":"medium"},{"#text":"http://userserve-ak.last.fm/serve/126/90676581.png","size":"large"},{"#text":"http://userserve-ak.last.fm/serve/252/90676581.png","size":"extralarge"},{"#text":"http://userserve-ak.last.fm/serve/500/90676581/Atoms+for+Peace+AFP_PNG_180613_01.png","size":"mega"}],"streamable":"0"}]');
  $scope.displayArtists = {left:[], right:[]};
  $scope.numSearchesFinished = 0;



  $scope.getSimilar = function(artist, side, length) {
    $scope.numSearchesFinished = 0;
    if(side === 'left' || side === 'right') {
      artist = artist || (side === 'left' ? 'Radiohead' : 'The Beatles');
      return APICalls.getSimilar(artist, length)
      .then(function (result) {
        $scope.similarArtists[side] = result.data.similarartists.artist;
        console.log($scope.similarArtists[side].length)
        $scope.displayArtists[side] = $scope.similarArtists[side].slice(0,20);

        return $scope.displayArtists[side];
      });
    } else {
      console.log("invalid input for 'side'");
    }
  }

  $scope.getSimilarBoth = function() {
    $scope.getSimilar($scope.artist1, 'left').then(function(){
      $scope.numSearchesFinished++;
      $scope.compareWhenBothFinished();
    });
    $scope.getSimilar($scope.artist2, 'right').then(function(){
      $scope.numSearchesFinished++;
      $scope.compareWhenBothFinished();
    });

  }

  $scope.compareWhenBothFinished = function() {
    if($scope.numSearchesFinished !== 2) return;

    $scope.commonArtists = CompareLists.artistIntersection($scope.similarArtists['left'], $scope.similarArtists['right']);
  }

});

app.directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background-image': 'url(' + value +')',
                'background-size' : 'cover'
            });
        });
    };
});