var app = angular.module('app', []);

app.controller('MembersCtrl', function($scope, $http) {
  $http.get('members.json').success(function(data){
    $scope.members = data;
  });
});
