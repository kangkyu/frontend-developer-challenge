var app = angular.module('memberApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/members', {
        templateUrl: 'app/partials/member_index.html',
      }).when('/businesses', {
        templateUrl: 'app/partials/business_index.html',
      }).when('/reviews', {
        templateUrl: 'app/partials/review_index.html',
      }).otherwise({
        redirectTo: '/members'
      });
  }]);

app.controller('MemberIndexCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.query = {};

  $http.get('app/members.json').success(function(data){
    $scope.members = data;
  });
}]);

app.controller('ReviewIndexCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('app/reviews.json').success(function(data){
    $scope.reviews = data;
  });
}]);

app.controller('BusinessIndexCtrl', function($scope) {
  $scope.message = 'This is BusinessIndexCtrl (businesses - companies) screen';
});
