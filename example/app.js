/*global angular*/
angular.module('app', ['ng2-http'])

.run(['$rootScope', 'ng2Http', function($rootScope, ng2Http) {
  ng2Http.get('test.json')
    .map(response => response.json())
    .subscribe((data)=> {
      console.log(data);
    });

  $rootScope.$watch('query.address', function(val) {
    ng2Http.get('http://maps.googleapis.com/maps/api/geocode/json', { search: 'address=' + val })
      .map(response => response.json().results.map(result => result.formatted_address))
      .subscribe((data)=> {
        console.log(data);
      });
  });
}]);