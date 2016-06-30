/* globals angular NG1_HTTP_MODULE_NAME http */

angular.module(NG1_HTTP_MODULE_NAME, [])

.service('ng2HttpBrowserXhr', http.BrowserXhr)

.service('ng2HttpBaseResponseOptions', http.BaseResponseOptions)

.service('ng2HttpBaseRequestOptions', http.BaseRequestOptions)

.provider('ng2HttpXsrfStrategy', function() {
  this.cookieName = 'NG2-HTTP-XSRF-COOKIE-NAME';
  this.headerName = 'X-NG2-HTTP-XSRF-HEADER-NAME';
  this.$get = function() {
    return new http.CookieXSRFStrategy(this.cookieName, this.headerName);
  };
})

.service('ng2HttpBackend', ['ng2HttpBrowserXhr', 'ng2HttpBaseResponseOptions', 'ng2HttpXsrfStrategy', http.XHRBackend])

.service('ng2Http', ['ng2HttpBackend', 'ng2HttpBaseRequestOptions', http.Http]);