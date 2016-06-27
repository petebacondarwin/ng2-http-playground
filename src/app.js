import angular from 'angular';
import http2Module  from './http';
import 'rxjs/add/operator/map';

console.log(http2Module);

angular.module('app', [http2Module])

.run(['ng2Http', function(ng2Http) {
  ng2Http.get('test.json')
    .map(response => response.json())
    .subscribe((data)=> {
      console.log(data);
    });
}]);