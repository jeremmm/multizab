var app = angular.module('multiZab', ['angularMoment'])

app.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
}]);

app.controller('AlertsListCtrl', function ($scope, $http, $q, $interval, $timeout){
    this.loadNotifications = function (){
        var deferred = $q.defer()
        $http.get('api/alerts')
            .success(function (data, status) {
                deferred.resolve(data);
            }).error(function (data, status){
                deferred.reject('Error');
            });
            deferred.promise.then(function(results){
                $scope.results = results;
                console.log(results)
            })
    }

    $interval(function(){
        $timeout(function(){
            this.loadNotifications();
        }, 1000);
    }.bind(this), 10000);

    this.loadNotifications();

})