var app = angular.module('memberApp', ['ngRoute', 'squealControllers']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/members', {
        templateUrl: 'app/partials/member_index.html',
      }).when('/members/:memberId', {
        templateUrl: 'app/partials/member_show.html',
        controller: "MemberShowCtrl"
      }).when('/businesses', {
        templateUrl: 'app/partials/business_index.html',
      }).when('/businesses/:businessName', {
        templateUrl: 'app/partials/business_show.html',
      }).when('/reviews', {
        templateUrl: 'app/partials/review_index.html',
      }).otherwise({
        redirectTo: '/members'
      });
  }]);

var squealControllers = angular.module('squealControllers', [])

squealControllers.controller('MemberIndexCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.query = {};

  $http.get('app/members.json').success(function(data){
    $scope.members = data;
  });
}]);

squealControllers.controller('MemberShowCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $scope.search = function() {
      return $http.get('app/members.json').success(function(data) {
        $scope.members = data;
      });
    }

    function getById(arr, id) {
      for (var d=0; d < arr.length; d +=1) {
        if (arr[d]._id === id) {
          return arr[d];
        }
      }
    }

    $scope.search().then(function() {
      $scope.member = getById($scope.members, $routeParams.memberId);
    });

    // $scope._id = $routeParams.memberId;

}]);

squealControllers.controller('ReviewIndexCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('app/reviews.json').success(function(data){
    $scope.reviews = data;
  });
}]);

squealControllers.controller('BusinessIndexCtrl', function($scope) {
  $scope.message = 'This is BusinessIndexCtrl (businesses - companies) screen';
});

squealControllers.controller('BusinessShowCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    var reviews = [];
    $scope.search = function() {
      return $http.get('app/reviews.json').success(function(data) {
        $scope.reviews = data;
      });
    }

    function getById(arr, name) {
      for (var d=0; d < arr.length; d +=1) {
        if (arr[d].businessName === name) {
          reviews.push(arr[d])
          return reviews;
        }
      }
    }

    $scope.search().then(function() {
      $scope.reviews = getById($scope.reviews, $routeParams.businessName);
    });

    $scope.businessName = $routeParams.businessName;

}]);
