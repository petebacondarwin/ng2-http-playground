import 'babel-polyfill';

import angular from 'angular';
import http2Module  from './http';

console.log(http2Module);

angular.module('app', [http2Module])

.run(function(ng2Http) {
  ng2Http.get('test.json').subscribe((response)=> {
    console.log(response);
  });
});