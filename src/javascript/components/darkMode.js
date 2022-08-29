"use strict"; // Class definition

var JsDarkMode = function JsDarkMode(element, options) {
  ////////////////////////////
  // ** Private variables  ** //
  ////////////////////////////
  var that = this;
  var body = document.getElementsByTagName("BODY")[0];

  if (typeof element === "undefined" || element === null) {
    return;
  } // Default options


  var defaultOptions = {
    storageName: "darkMode",
    isDarkMode: ""
  };
  ////////////////////////////
  // ** Private methods  ** //
  ////////////////////////////

  var _construct = function _construct() {
    if (JsUtils.data(element).has('scheme')) {
      that = JsUtils.data(element).get('scheme');
    } else {
      _init();
    }
  };

  var _init = function _init() {
    // Variables
    var darkMode = localStorage.getItem("darkMode");
    var isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    that.options = JsUtils.deepExtend({}, defaultOptions, options);
    that.uid = JsUtils.getUniqueId('scheme');
    that.element = element; // Set initialized
    that.element.setAttribute('data-tu-scheme', 'true'); // Event Handlers
    darkMode === "enabled" ? openDarkMode() : offDarkMode();
    _handlers();
    JsUtils.data(that.element).set('scheme', that);
  };

  var openDarkMode = function openDarkMode() {
    window.matchMedia("(prefers-color-scheme: dark)");
    body.classList.add("dark__mode");
    localStorage.setItem("darkMode", "enabled");
  }

  var offDarkMode = function offDarkMode() {
    window.matchMedia("(prefers-color-scheme: light)");
    body.classList.remove("dark__mode");
    localStorage.setItem("darkMode", "");
  }

  var scheme = window.matchMedia("scheme-dark");

  var observeMediaChange = function observeMediaChange(scheme, callback) {
    var disposeFunc = {};
    if (scheme.addEventListener && scheme.removeEventListener) {
      scheme.addEventListener("change", callback);
      disposeFunc = function() {
        scheme.removeEventListener("change", callback);
      };
    }
    return disposeFunc;
  }
  var _handlers = function _handlers() {
    observeMediaChange(scheme, function(event) {
      event.matches ? openDarkMode() : offDarkMode();
    });
    JsUtils.addEvent(that.element, 'click', function(event) {
      var darkMode = localStorage.getItem("darkMode");
      darkMode == "enabled" ? offDarkMode() : openDarkMode();
    });
  };



  var _getOption = function _getOption(name) {
    if (that.element.hasAttribute('data-tu-scheme-' + name) === true) {
      var attr = that.element.getAttribute('data-tu-scheme-' + name);
      var value = JsUtils.getResponsiveValue(attr);

      if (value !== null && String(value) === 'true') {
        value = true;
      } else if (value !== null && String(value) === 'false') {
        value = false;
      }

      return value;
    } else {
      var optionName = JsUtils.snakeToCamel(name);

      if (that.options[optionName]) {
        return JsUtils.getResponsiveValue(that.options[optionName]);
      } else {
        return null;
      }
    }
  };

  var _destroy = function _destroy() {
    JsUtils.data(that.element).remove('scheme');
  };

  _construct();
  ///////////////////////
  // ** Public API  ** //
  ///////////////////////

  that.getElement = function() {
    return that.element;
  };

  that.destroy = function() {
    return _destroy();
  };
};
// Static


JsDarkMode.getInstance = function(element) {
  if (element && JsUtils.data(element).has('scheme')) {
    return JsUtils.data(element).get('scheme');
  } else {
    return null;
  }
};
// Create


JsDarkMode.createInstances = function() {
  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[data-tu-scheme="true"]';
  var body = document.getElementsByTagName("BODY")[0]; // Initialize Menus

  var elements = body.querySelectorAll(selector);
  var darkMode;
  console.log(elements)
  if (elements && elements.length > 0) {
    for (var i = 0, len = elements.length; i < len; i++) {
      darkMode = new JsDarkMode(elements[i]);
    }
  }
};
// Global


JsDarkMode.init = function() {
  JsDarkMode.createInstances();
};
// On document ready


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', JsDarkMode.init);
} else {
  JsDarkMode.init();
}
// Webpack support


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = JsDarkMode;
}