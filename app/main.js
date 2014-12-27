var app = angular.module('memberApp', []);

app
.controller('MembersIndexCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('app/members.json').success(function(data){
    $scope.members = data;
  });
}]);

