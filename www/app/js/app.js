var angular = require('angular');
require('angular-route')
var imageGallery = angular.module('imageGallery', ['ngRoute']);
imageGallery.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/images', {
        templateUrl: 'templates/images.html',
        controller: 'ImageController'
      })
      .when('/post', {
        templateUrl: 'templates/post.html',
        controller: 'PostController'
      })
      .otherwise('/post');
  }
]);
imageGallery.controller('PostController', ['$scope', '$http',
  function($scope, $http) {
    $scope.baseURI = BASE_URI + '/image'

    $scope.newPost = {
      url: "",
      content: ""
    };
    // Post New Image
    $scope.postNewImage = function() {
      $http.post($scope.baseURI + '/new', $scope.newPost)
        .then(function(res) {
          console.log(res.data);
        });
    }
  }
]);
imageGallery.controller('ImageController', ['$scope', '$http',
  function($scope, $http) {

    // Base Url
    $scope.baseURI = BASE_URI + '/image'

    // All url
    $scope.urls = [];

    // Post New Image
    $scope.getImages = function() {
      $http.get($scope.baseURI)
        .then(function(res) {
          $scope.urls = res.data;
        });
    };
  }
]);