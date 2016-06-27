angular.module('app', ['ng2-http'])

.run(['ng2Http', function(ng2Http) {
  ng2Http.get('test.json')
    .map(response => response.json())
    .subscribe((data)=> {
      console.log(data);
    });
}]);