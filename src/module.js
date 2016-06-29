/* global define, module */
(function (root, factory) {
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

  // Override potential global variables that might cause the HTTP UMD module
  // to load libraries instead of using our shims
  const exports = undefined;
  const define = undefined;

  // Create the "global" variable that will hold the various dependnencies
  // for the HTTP UMD module
  const root = {
    Rx: rxjs_Observable
  };

  //[[SHIM]]//

  // We need to set the `this` value for the A2 HTTP lib UMD module
  defineHttpLib.call(root);

  //[[NG1_HTTP_MODULE]]//

  function defineHttpLib() {
    //[[NG2_HTTP_LIBRARY]]//
  }

}));