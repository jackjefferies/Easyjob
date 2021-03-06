angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  .controller('CategoriesCtrl', function ($scope) {
    $scope.categories = [{
      title: 'General',
      id: 1
    }, {
      title: 'DIY',
      id: 2
    }, {
      title: 'Finance',
      id: 3
    }, {
      title: 'Landscaping',
      id: 4
    }, {
      title: 'Software',
      id: 5
    }];
  })

  .controller('CategoryCtrl', function ($scope, adService) {
    $scope.getAdByCategory = function () {
      adService.getAdDetailsByCategory($scope.adCategory)
        .then(function (response) {
          $scope.adCategoryData = response.data;
        })
    }
  })

  .controller('AdCrtl', function ($scope, adService) {
    $scope.getAdByTitle = function () {
      adService.getAdDetailsByTitle($scope.title)
        .then(function (response) {
          $scope.adTitleData = response.data;
        })
    };

    $scope.postAd = function () {
      navigator.geolocation.getCurrentPosition(getLocation);
    };

    function getLocation(location) {
      var lat = location.coords.latitude;
      var lon = location.coords.longitude;
      sendPostAdRequest(lat, lon);
    }

    function sendPostAdRequest(lat, lon) {
      adService.postAdDetails($scope.email, $scope.title, $scope.description, $scope.fee, lat, lon)
        .then(function successCallBack(response) {
          $scope.email = '';
          $scope.title = '';
          $scope.description = '';
          $scope.fee = '';
          $scope.category = 'General';
        }, function errorCallBack(response) {
          console.log(response);
        });
    }
  });
