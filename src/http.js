import angular from 'angular';

import {
  Http,
  XHRBackend,
  BrowserXhr,
  ResponseOptions,
  RequestOptions,
  CookieXSRFStrategy
} from '@angular/http';

import {
  BrowserDomAdapter
} from '@angular/platform-browser/src/browser/browser_adapter';

const ng2HttpModule = angular.module('ng2-http', [])

.factory('ng2HttpBrowser', function() {
  BrowserDomAdapter.makeCurrent();
  return new BrowserXhr();
})

.provider('ng2HttpResponseOptions', function() {
  this.$get = function() {
    return new ResponseOptions(this);
  };
})

.provider('ng2HttpRequestOptions', function() {
  this.$get = function() {
    return new RequestOptions(this);
  };
})

.provider('ng2HttpXsrfStrategy', function() {
  this.cookieName = 'MY-XSRF-COOKIE-NAME';
  this.headerName = 'X-MY-XSRF-HEADER-NAME';
  this.$get = function() {
    return new CookieXSRFStrategy(this.cookieName, this.headerName);
  };
})

.factory('ng2HttpBackend', function(ng2HttpBrowser, ng2HttpResponseOptions, ng2HttpXsrfStrategy) {
  return new XHRBackend(ng2HttpBrowser, ng2HttpResponseOptions, ng2HttpXsrfStrategy);
})

.factory('ng2Http', function(ng2HttpBackend, ng2HttpRequestOptions) {
  return new Http(ng2HttpBackend, ng2HttpRequestOptions);
});

export default ng2HttpModule.name;