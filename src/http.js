/* globals
      root
      ng1HttpModuleName
      angular
*/

const http = root.ng.http;

angular.module(ng1HttpModuleName, [])

.factory('ng2HttpBrowser', function() {
  return new http.BrowserXhr();
})

.provider('ng2HttpResponseOptions', function() {
  this.$get = function() {
    return new http.ResponseOptions(this);
  };
})

.provider('ng2HttpRequestOptions', function() {
  this.$get = function() {
    return new http.RequestOptions(this);
  };
})

.provider('ng2HttpXsrfStrategy', function() {
  this.cookieName = 'MY-XSRF-COOKIE-NAME';
  this.headerName = 'X-MY-XSRF-HEADER-NAME';
  this.$get = function() {
    return new http.CookieXSRFStrategy(this.cookieName, this.headerName);
  };
})

.factory('ng2HttpBackend', ['ng2HttpBrowser', 'ng2HttpResponseOptions', 'ng2HttpXsrfStrategy', function(ng2HttpBrowser, ng2HttpResponseOptions, ng2HttpXsrfStrategy) {
  return new http.XHRBackend(ng2HttpBrowser, ng2HttpResponseOptions, ng2HttpXsrfStrategy);
}])

.factory('ng2Http', ['ng2HttpBackend', 'ng2HttpRequestOptions', function(ng2HttpBackend, ng2HttpRequestOptions) {
  return new http.Http(ng2HttpBackend, ng2HttpRequestOptions);
}])

.factory('ngJsonp', ['ng2HttpBackend', 'ng2HttpRequestOptions', function(ng2HttpBackend, ng2HttpRequestOptions) {
  return new http.Jsonp(ng2HttpBackend, ng2HttpRequestOptions);
}]);

