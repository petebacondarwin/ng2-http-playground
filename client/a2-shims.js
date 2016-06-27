window.ng = {
  // @Injectable shim
  core: { Injectable: {} },
  // Cookie shim
  platformBrowser: {
    __platform_browser_private__: {
      getDOM: () => ({ getCookie: (cookieName) => parseCookieValue(document.cookie, cookieName) })
    }
  }
};

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