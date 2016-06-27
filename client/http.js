const ng2HttpModule = angular.module('ng2-http', [])

.factory('ng2HttpBrowser', function() {
  return new ng.http.BrowserXhr();
})

.provider('ng2HttpResponseOptions', function() {
  this.$get = function() {
    return new ng.http.ResponseOptions(this);
  };
})

.provider('ng2HttpRequestOptions', function() {
  this.$get = function() {
    return new ng.http.RequestOptions(this);
  };
})

.provider('ng2HttpXsrfStrategy', function() {
  this.cookieName = 'MY-XSRF-COOKIE-NAME';
  this.headerName = 'X-MY-XSRF-HEADER-NAME';
  this.$get = function() {
    return new ng.http.CookieXSRFStrategy(this.cookieName, this.headerName);
  };
})

.factory('ng2HttpBackend', ['ng2HttpBrowser', 'ng2HttpResponseOptions', 'ng2HttpXsrfStrategy', function(ng2HttpBrowser, ng2HttpResponseOptions, ng2HttpXsrfStrategy) {
  return new ng.http.XHRBackend(ng2HttpBrowser, ng2HttpResponseOptions, ng2HttpXsrfStrategy);
}])

.factory('ng2Http', ['ng2HttpBackend', 'ng2HttpRequestOptions', function(ng2HttpBackend, ng2HttpRequestOptions) {
  return new ng.http.Http(ng2HttpBackend, ng2HttpRequestOptions);
}]);