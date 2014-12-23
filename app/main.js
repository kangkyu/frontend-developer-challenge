var app = angular.module('app', []);

app.controller('MembersCtrl', function($scope, $http) {
  $http.get('/app/members.json').success(function(data){
    $scope.members = data;
  });
});
