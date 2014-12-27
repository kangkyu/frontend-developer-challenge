var app = angular.module('memberApp', ['ngRoute', 'squealControllers']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/members', {
        templateUrl: 'app/partials/member_index.html',
      }).when('/members/:memberId', {
        templateUrl: 'app/partials/member_show.html',
        controller: "MemberShowCtrl"
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

squealControllers.controller('BusinessIndexCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.search = function() {
    return $http.get('app/reviews.json').success(function(data) {
      $scope.reviews = data;
    });
  }

  function getBusinessNames(arr) {
    var names = [];
    for (var d=0; d < arr.length; d +=1) {
      names.push(arr[d].businessName);
    }
    return names;
  }

  var businessUnique = function(a) {
    return a.reduce(function(p,c){
      if (p.indexOf(c) < 0) p.push(c);
      return p;
    }, []);
  };

  $scope.search().then(function() {
    $scope.names = businessUnique(getBusinessNames($scope.reviews));
  });

  // $scope.message = 'This is BusinessIndexCtrl (businesses - companies) screen';

}]);

squealControllers.controller('BusinessShowCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    var reviews = [];
    $scope.search = function() {
      return $http.get('app/reviews.json').success(function(data) {
        $scope.reviews = data;
      });
    }

    function getByName(arr, name) {
      for (var d=0; d < arr.length; d +=1) {
        if (arr[d].businessName === name) {
          reviews.push(arr[d])
        }
      }
      return reviews;
    }

    function getAveRating(arr) {
      var total = 0
      for (var d=0; d < arr.length; d +=1) {
        total += parseFloat(arr[d].rating)
      }
      return (total / arr.length).toPrecision(2);
    }

    $scope.search().then(function() {
      $scope.reviews = getByName($scope.reviews, $routeParams.businessName);
      $scope.ratingAve = getAveRating($scope.reviews)
    });

    $scope.businessName = $routeParams.businessName;

}]);
