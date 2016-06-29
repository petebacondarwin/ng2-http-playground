/* globals angular NG1_HTTP_MODULE_NAME http */

angular.module(NG1_HTTP_MODULE_NAME, [])

.factory('ng2BrowserXhr', function() {
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

.factory('ng2HttpBackend', ['ng2BrowserXhr', 'ng2HttpResponseOptions', 'ng2HttpXsrfStrategy', function(ng2BrowserXhr, ng2HttpResponseOptions, ng2HttpXsrfStrategy) {
  return new http.XHRBackend(ng2BrowserXhr, ng2HttpResponseOptions, ng2HttpXsrfStrategy);
}])

.factory('ng2Http', ['ng2HttpBackend', 'ng2HttpRequestOptions', function(ng2HttpBackend, ng2HttpRequestOptions) {
  return new http.Http(ng2HttpBackend, ng2HttpRequestOptions);
}]);