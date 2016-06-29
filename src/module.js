(function (root, factory) {
  /* global define, module */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular', 'xjs/Observable'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('angular'), require('xjs/Observable'));
  } else {
    // Browser globals (root is window)
    root.returnExports = factory(root.angular, root.Rx);
  }
}(this, function (angular, rxjs_Observable) {
  'use strict';


  // Create the "global" variable that will hold the dependencies that the
  // Angular 2 HTTP UMD module requires
  const root = {
    // Basic RxJS support is required by the library
    Rx: rxjs_Observable,

    // This shim contains bits that would have normally been provided by
    // the Angular 2 library so that we don't have to actually load in the
    // whole of that library
    ng: {
      // @Injectable shim
      core: { Injectable: {} },
      // Cookie shim
      platformBrowser: {
        __platform_browser_private__: {
          getDOM: function() {
            return { getCookie: function(cookieName) { return parseCookieValue(document.cookie, cookieName); } };
          }
        }
      }
    }
  };


  // Override potential global variables that might cause the HTTP UMD module
  // to load libraries instead of using our shims
  const exports = undefined;
  const define = undefined;

  // We are calling the `loadNg2HttpLib` function via `.call(...)` because we
  // need to set the `this` value for the UMD module, which allows us to
  // manually specify the dependencies that the A2 HTTP library cares about
  // e.g. Angular 2 core and RxJS
  loadNg2HttpLib.call(root);

  const ng1HttpModuleName = 'ng2-http';

  //[[NG1_HTTP_MODULE]]//

  // Return the name of the new Angular 1 module for use by clients, e.g. via RequireJS.
  return ng1HttpModuleName;

  function loadNg2HttpLib() {

    //[[NG2_HTTP_LIBRARY]]//

  }

  // A litle helper function to get hold of the browser's cookie for use in the
  // CookieXSRFStrategy class
  function parseCookieValue(cookie, name) {
    name = encodeURIComponent(name);
    var cookies = cookie.split(';');
    for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
      var cookie_1 = cookies_1[_i];
      var _a = cookie_1.split('=', 2), key = _a[0], value = _a[1];
      if (key.trim() === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }
}));