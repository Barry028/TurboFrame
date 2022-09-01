"use strict";
window.JsUtilsElementDataStore = {};
window.JsUtilsElementDataStoreID = 0;
window.JsUtilsDelegatedEventHandlers = {};

var JsUtils = (function() {
  var resizeHandlers = [];
  var flag = true;
  var start = null;
  var _windowResizeHandler = function() {
    var _runResizeHandlers = function() {
      // reinitialize other subscribed elements
      for (var i = 0; i < resizeHandlers.length; i++) {
        var each = resizeHandlers[i];
        each.call();
      }
    };
    window.addEventListener("resize", JsUtils.throttle(function(event) {
      _runResizeHandlers();
    }, 250), false);
  };
  return {
    ////////////////////////////
    // **     Resize       ** //
    ////////////////////////////
    init: function(settings) {
      _windowResizeHandler();
    },
    addResizeHandler: function(callback) {
      resizeHandlers.push(callback);
    },
    removeResizeHandler: function(callback) {
      for (var i = 0; i < resizeHandlers.length; i++) {
        if (callback === resizeHandlers[i]) {
          delete resizeHandlers[i];
        }
      }
    },
    ////////////////////////////
    // **     fetch        ** //
    ////////////////////////////
    // JsUtils.fetch(url, 'GET')
    //   .then((responseData) => { console.log(responseData); })
    //   .catch((error) => { console.log('Error 異常!!'); });
    fetch: function(url, method) {
      // console.log(url, method)
      // 發起請求,返回給調用者一個 Promise 對象
      return new Promise(function(resolve, reject) {
        fetch(url, {
            method: method // GET POST
          })
          .then((response) => response.json())
          .then((responseData) => {
            // 後渠道解析後的數據
            console.log("responseData= " + JSON.stringify(responseData)); // 通過 Promise 機制的 resolve 函數返回正常狀態
            return resolve(responseData);
          })
          .catch((error) => {
            // 通過 Promise 機制的 reject 函數返回 catch
            return reject(error);
          });
      });
    },
    ////////////////////////////
    // **     Selectors    ** //
    ////////////////////////////
    // JsUtils.Gbody();
    Gbody: function() {
      return document.getElementsByTagName("body")[0];
    },
    // JsUtils.Gid("changeMode");
    // JsUtils.Gid("changeMode" , JsUtils.Gbody());
    Gid: function(id, parentNode) {
      parentNode ? (parentNode = parentNode || parentNode[0]) : (parentNode = document);
      return parentNode.getElementById("" + id + "");
    },
    // JsUtils.Gtag("li");
    // JsUtils.Gtag("li" , JsUtils.Gbody());
    Gtag: function(tag, parentNode) {
      parentNode ? (parentNode = parentNode || parentNode[0]) : (parentNode = document);
      return parentNode.getElementsByTagName("" + tag + "");
    },
    // JsUtils.Gclass("container");
    // JsUtils.Gclass("container" , JsUtils.Gbody());
    Gclass: function(className, parentNode) {
      parentNode ? (parentNode = parentNode || parentNode[0]) : (parentNode = document);
      return parentNode.getElementsByClassName("" + className + "");
    },
    // JsUtils.QuerAll("#changeMode");
    // JsUtils.QuerAll("#changeMode" , JsUtils.Gbody());
    QuerAll: function(selector, parentNode) {
      parentNode ? (parentNode = parentNode || parentNode[0]) : (parentNode = document);
      return parentNode.querySelectorAll("" + selector + "");
    },
    // JsUtils.Quer(".container");
    // JsUtils.Quer(".container" , JsUtils.Gbody());
    Quer: function(selector, parentNode) {
      parentNode ? (parentNode = parentNode || parentNode[0]) : (parentNode = document);
      return parentNode.querySelector("" + selector + "");
    },
    /////////////////////////////
    // **   objects   ** //
    ////////////////////////////
    isset: function(obj, keys) {
      var stone;
      keys = keys || "";
      if (keys.indexOf("[") !== -1) {
        throw new Error("Unsupported object path notation.");
      }
      keys = keys.split(".");
      do { if (obj === undefined) { return false; }
          stone = keys.shift();
          if (!obj.hasOwnProperty(stone)) { return false; }
          obj = obj[stone];
        } while (keys.length);
      return true;
    },
    isArray: function(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    },
    isCollectionContains: function(collection, searchText) {
      for (var i = 0; i < collection.length; i++) {
        if (collection[i].innerText.toLowerCase().indexOf(searchText) > -1) { return true; }
      }
      return false;
    },
    isFunction: function(obj) {
      return Object.prototype.toString.call(obj) === "[object Function]";
    },
    isArrayLike: function(obj) {
      return (obj instanceof Object && typeof obj.length === "number" && obj.length >= 0);
    },
    /////////////////////////////
    // **   Arrays Tools   ** //
    ////////////////////////////
    // JsUtils.makeArray(document.getElementsByTagName("li"))
    // JsUtils.makeArray(document.querySelectorAll("li"))
    // JsUtils.makeArray(document.getElementsByClassName(".li"))
    makeArray: function(arrayLike) {
      return arrayLike.length !== null ? Array.prototype.slice.call(arrayLike, 0)
        .filter(function(ele) {
          return ele !== undefined;
        }) : [];
    },
    // 去除數組中的重複項
    // JsUtils.unique(arr);
    unique: function(arr) {
      let newArr = [],
        len = arr.length;
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) { 
          arr[i] ? arr[j] : (j = ++i); // if (arr[i] === arr[j]) { j = ++i; }
        }
        newArr.push(arr[i]);
      }
      return newArr;
    },
    // JsUtils.each(document.querySelectorAll("li") , function(event){
    //   event.style.background ="#000" ;
    // })
    each: function(obj, callback) {
      let length = obj.length;
      let isObj = length === undefined || JsUtils.isFunction(obj);
      if (isObj) {
        for (var name in obj) {
          if (callback.call(obj[name], obj[name], name) === false) {
            break;
          }
        }
      } else {
        for (var i = 0, value = obj[0]; i < length && callback.call(obj[i], value, i) !== false; value = obj[++i]) {}
      }
      return obj;
    },
    // var newArr2= JsUtils.map(arr, function(item, index, array) {
    //   console.log(this, item, index, array);
    //   item.name = obj.name; return item;
    // }, obj);
    // console.log(newArr);
    map: function(arr, callBack) {
      var arr = arr,
        len = arr.length,
        arg2 = arguments[1],
        newArr = [],
        item,
        res;
      for (let i = 0; i < len; i++) {
        item = JsUtils.deepExtend(arr[i]);
        res = callBack.apply(arg2, [item, i, arr]);
        res && newArr.push(res);
      }
      return newArr;
    },
    // var arr = [1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10];
    // var dataf = JsUtils.filter(arr, function(item, index, arr) {
    //   console.log(item, index, arr)
    //   return index == 3
    // })
    // console.log('data', dataf)
    filter: function(arr, callBack) {
      var newArr = [];
      for (let i = 0; i < arr.length; i++) {
        var item = arr[i];
        callBack(item, i, arr) && newArr.push(item);
      }
      return newArr;
    },
    /////////////////////////////
    // **   Screen Check   ** //
    ////////////////////////////
    // JsUtils.isAppleDevice()
    isAppleDevice: function() {
      return /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    },
    // JsUtils.isMobileDevice()
    isMobileDevice: function() {
      var test = this.getViewPort()
        .width < this.getBreakpoint("lg") ? true : false;
      if (test === false) {
        test = navigator.userAgent.match(/iPad/i) != null;
      }
      return test;
    },
    // JsUtils.isDesktopDevice()
    isDesktopDevice: function() {
      return JsUtils.isMobileDevice() ? false : true;
    },
    // JsUtils.getMobileSystem()
    getMobileSystem: function() {
      var ua = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Linux") > -1;
      var isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isIOS) {
        return "iOS";
      }
      if (isAndroid) {
        return "Android";
      }
      return false;
    },
    /////////////////////////////
    // **   Clone Extent   ** //
    ////////////////////////////
    // Deep extend:  JsUtils.extend(true, {}, objA, objB);
    deepExtend: function(out) {
      out = out || {};
      for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];
        if (!obj) continue;
        for (var key in obj) {
          if (!obj.hasOwnProperty(key)) {
            continue;
          } // based on https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
          if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
            out[key] = JsUtils.deepExtend(out[key], obj[key]);
            continue;
          }
          out[key] = obj[key];
        }
      }
      return out;
    },
    // extend:  JsUtils.extend({}, objA, objB);
    extend: function(out) {
      out = out || {};
      for (var i = 1; i < arguments.length; i++) {
        if (!arguments[i]) continue;
        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
        }
      }
      return out;
    },
    /////////////////////////////
    // **   throttle debounce   ** //
    ////////////////////////////
    throttle: function(callback, delay) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
      var timer = null;
      var timeStamp = new Date();
      return function() {
        // console.log("throttle");
        var _this = this;
        var args = arguments; // console.log(_this)
        if (new Date() - timeStamp > delay) {
          timeStamp = new Date();
          timer = setTimeout(function() {
            callback.apply(_this, args);
          }, delay);
        }
      };
    },
    debounce: function(callback, delay) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
      var timer;
      return function() {
        var _this = this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(function() {
          callback.apply(_this, args);
        }, delay);
      };
    },
    hasFixedPositionedParent: function(el) {
      var position;
      while (el && el !== document) {
        position = JsUtils.css(el, "position");
        if (position === "fixed") {
          return true;
        }
        el = el.parentNode;
      }
      return false;
    },
    /////////////////////////////
    // **   sleep   ** //
    ////////////////////////////
    sleep: function(milliseconds) {
      var start = new Date()
        .getTime();
      for (var i = 0; i < 1e7; i++) {
        if (new Date()
          .getTime() - start > milliseconds) {
          break;
        }
      }
    },
    /////////////////////////////
    // **   trigger   ** //
    ////////////////////////////
    triggerCustomEvent: function(el, eventName, data) {
      var event;
      if (window.CustomEvent) {
        event = new CustomEvent(eventName, {
          detail: data
        });
      } else {
        event = document.createEvent("CustomEvent");
        event.initCustomEvent(eventName, true, true, data);
      }
      el.dispatchEvent(event);
    },
    triggerEvent: function(node, eventName) {
      var doc;
      if (node.ownerDocument) {
        doc = node.ownerDocument;
      } else if (node.nodeType == 9) {
        doc = node;
      } else {
        throw new Error("Invalid node passed to fireEvent: " + node.id);
      }
      if (node.dispatchEvent) {
        var eventClass = "";
        switch (eventName) {
          case "click":
          case "mouseenter":
          case "mouseleave":
          case "mousedown":
          case "mouseup":
            eventClass = "MouseEvents";
            break;
          case "focus":
          case "change":
          case "blur":
          case "select":
            eventClass = "HTMLEvents";
            break;
          default:
            throw ("fireEvent: Couldn't find an event class for event '" + eventName + "'.");
            break;
        }
        var event = doc.createEvent(eventClass);
        var bubbles = eventName == "change" ? false : true;
        event.initEvent(eventName, bubbles, true); // All events created as bubbling and cancelable.
        event.synthetic = true; // allow detection of synthetic events
        // The second parameter says go ahead with the default action
        node.dispatchEvent(event, true);
      } else if (node.fireEvent) {
        // IE-old school style
        var event = doc.createEventObject();
        event.synthetic = true; // allow detection of synthetic events
        node.fireEvent("on" + eventName, event);
      }
    },
    /////////////////////////////
    // **   elemments Dom   ** //
    ////////////////////////////
    remove: function(el) {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    },
    find: function(parent, query) {
      if (parent !== null) {
        return parent.querySelector(query);
      } else {
        return null;
      }
    },
    findAll: function(parent, query) {
      if (parent !== null) {
        return parent.querySelectorAll(query);
      } else {
        return null;
      }
    },
    parents: function(elem, selector) {
      // Set up a parent array
      var parents = []; // Push each parent element to the array
      for (; elem && elem !== document; elem = elem.parentNode) {
        if (selector) {
          if (elem.matches(selector)) {
            parents.push(elem);
          }
          continue;
        }
        parents.push(elem);
      } // Return our parent array
      return parents;
    },
    children: function(el, selector, log) {
      if (!el || !el.childNodes) {
        return null;
      }
      var result = [],
        i = 0,
        l = el.childNodes.length;
      for (var i; i < l; ++i) {
        if (el.childNodes[i].nodeType == 1 && JsUtils.matches(el.childNodes[i], selector, log)) {
          result.push(el.childNodes[i]);
        }
      }
      return result;
    },
    matches: function(el, selector, log) {
      var p = Element.prototype;
      var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
        return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
      };
      if (el && el.tagName) {
        return f.call(el, selector);
      } else {
        return false;
      }
    },
    data: function(el) {
      return {
        set: function(name, data) {
          if (!el) {
            return;
          }
          if (el.customDataTag === undefined) {
            window.JsUtilsElementDataStoreID++;
            el.customDataTag = window.JsUtilsElementDataStoreID;
          }
          if (window.JsUtilsElementDataStore[el.customDataTag] === undefined) {
            window.JsUtilsElementDataStore[el.customDataTag] = {};
          }
          window.JsUtilsElementDataStore[el.customDataTag][name] = data;
        },
        get: function(name) {
          if (!el) {
            return;
          }
          if (el.customDataTag === undefined) {
            return null;
          }
          return this.has(name) ? window.JsUtilsElementDataStore[el.customDataTag][name] : null;
        },
        has: function(name) {
          if (!el) {
            return false;
          }
          if (el.customDataTag === undefined) {
            return false;
          }
          return window.JsUtilsElementDataStore[el.customDataTag] && window.JsUtilsElementDataStore[el.customDataTag][name] ? true : false;
        },
        remove: function(name) {
          if (el && this.has(name)) {
            delete window.JsUtilsElementDataStore[el.customDataTag][name];
          }
        }
      };
    },
    outerWidth: function(el, margin) {
      var width;
      if (margin === true) {
        width = parseFloat(el.offsetWidth);
        width += parseFloat(JsUtils.css(el, "margin-left")) + parseFloat(JsUtils.css(el, "margin-right"));
        return parseFloat(width);
      } else {
        width = parseFloat(el.offsetWidth);
        return width;
      }
    },
    offset: function(el) {
      var rect, win;
      if (!el) {
        return;
      }
      if (!el.getClientRects()
        .length) {
        return {
          top: 0,
          left: 0
        };
      } // Get document-relative position by adding viewport scroll to viewport-relative gBCR
      rect = el.getBoundingClientRect();
      win = el.ownerDocument.defaultView;
      return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset,
        right: window.innerWidth - (el.offsetLeft + el.offsetWidth)
      };
    },
    height: function(el) {
      return JsUtils.css(el, "height");
    },
    outerHeight: function(el, withMargin) {
      var height = el.offsetHeight;
      var style;
      if (typeof withMargin !== "undefined" && withMargin === true) {
        style = getComputedStyle(el);
        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        return height;
      } else {
        return height;
      }
    },
    visible: function(el) {
      return !(el.offsetWidth === 0 && el.offsetHeight === 0);
    },
    /////////////////////////////
    // **   attr   ** //
    ////////////////////////////
    attr: function(el, name, value) {
      if (el == undefined) {
        return;
      }
      if (value !== undefined) {
        el.setAttribute(name, value);
      } else {
        return el.getAttribute(name);
      }
    },
    hasAttr: function(el, name) {
      if (el == undefined) {
        return;
      }
      return el.getAttribute(name) ? true : false;
    },
    removeAttr: function(el, name) {
      if (el == undefined) {
        return;
      }
      el.removeAttribute(name);
    },
    /////////////////////////////
    // **   animate   ** //
    ////////////////////////////
    animate: function(from, to, duration, update, easing, done) {
      var easings = {};
      var easing;
      easings.linear = function(t, b, c, d) {
        return (c * t) / d + b;
      };
      easing = easings.linear;
      if (typeof from !== "number" || typeof to !== "number" || typeof duration !== "number" || typeof update !== "function") {
        return;
      }
      if (typeof done !== "function") {
        done = function() {};
      }
      var rAF = window.requestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 50);
      };
      var canceled = false;
      var change = to - from;

      function loop(timestamp) {
        var time = (timestamp || +new Date()) - start;
        if (time >= 0) {
          update(easing(time, from, change, duration));
        }
        if (time >= 0 && time >= duration) {
          update(to);
          done();
        } else {
          rAF(loop);
        }
      }
      update(from);
      var start = window.performance && window.performance.now ? window.performance.now() : +new Date();
      return rAF(loop);
    },
    fadeIn: function(el) {
      var easing;
      var duration = duration ? duration : 300;
      var from = 1;
      var to = 0;
      JsUtils.animate(from, to, duration, function(event) {
        el.style.opacity = 0;
      }, easing, function() {
        el.style.opacity = 1;
      });
    },
    fadeOut: function(el) {
      var easing;
      var duration = duration ? duration : 300;
      var from = 0;
      var to = 1;
      JsUtils.animate(from, to, duration, function(event) {
        el.style.opacity = 0;
      }, easing, function() {
        el.style.opacity = 1;
      });
    },
    slide: function(el, dir, speed, callback, recalcMaxHeight) {
      if (!el || (dir == "up" && JsUtils.visible(el) === false) || (dir == "down" && JsUtils.visible(el) === true)) {
        return;
      }
      speed = speed ? speed : 600;
      var calcHeight = JsUtils.actualHeight(el);
      var calcPaddingTop = false;
      var calcPaddingBottom = false;
      if (JsUtils.css(el, "padding-top") && JsUtils.data(el)
        .has("slide-padding-top") !== true) {
        JsUtils.data(el)
          .set("slide-padding-top", JsUtils.css(el, "padding-top"));
      }
      if (JsUtils.css(el, "padding-bottom") && JsUtils.data(el)
        .has("slide-padding-bottom") !== true) {
        JsUtils.data(el)
          .set("slide-padding-bottom", JsUtils.css(el, "padding-bottom"));
      }
      if (JsUtils.data(el)
        .has("slide-padding-top")) {
        calcPaddingTop = parseInt(JsUtils.data(el)
          .get("slide-padding-top"));
      }
      if (JsUtils.data(el)
        .has("slide-padding-bottom")) {
        calcPaddingBottom = parseInt(JsUtils.data(el)
          .get("slide-padding-bottom"));
      }
      if (dir == "up") {
        // up
        el.style.cssText = "display: block; overflow: hidden;";
        if (calcPaddingTop) {
          JsUtils.animate(0, calcPaddingTop, speed, function(value) {
            el.style.paddingTop = calcPaddingTop - value + "px";
          }, "linear");
        }
        if (calcPaddingBottom) {
          JsUtils.animate(0, calcPaddingBottom, speed, function(value) {
            el.style.paddingBottom = calcPaddingBottom - value + "px";
          }, "linear");
        }
        JsUtils.animate(0, calcHeight, speed, function(value) {
          el.style.height = calcHeight - value + "px";
        }, "linear", function() {
          el.style.height = "";
          el.style.display = "none";
          if (typeof callback === "function") {
            callback();
          }
        });
      } else if (dir == "down") {
        // down
        el.style.cssText = "display: block; overflow: hidden;";
        if (calcPaddingTop) {
          JsUtils.animate(0, calcPaddingTop, speed, function(value) {
            //
            el.style.paddingTop = value + "px";
          }, "linear", function() {
            el.style.paddingTop = "";
          });
        }
        if (calcPaddingBottom) {
          JsUtils.animate(0, calcPaddingBottom, speed, function(value) {
            el.style.paddingBottom = value + "px";
          }, "linear", function() {
            el.style.paddingBottom = "";
          });
        }
        JsUtils.animate(0, calcHeight, speed, function(value) {
          el.style.height = value + "px";
        }, "linear", function() {
          el.style.height = "";
          el.style.display = "";
          el.style.overflow = "";
          if (typeof callback === "function") {
            callback();
          }
        });
      }
    },
    slideUp: function(el, speed, callback) {
      JsUtils.slide(el, "up", speed, callback);
    },
    slideDown: function(el, speed, callback) {
      JsUtils.slide(el, "down", speed, callback);
    },
    /////////////////////////////
    // **   actualCss   ** //
    ////////////////////////////
    actualCss: function(el, prop, cache) {
      var css = "";
      if (el instanceof HTMLElement === false) {
        return;
      }
      if (!el.getAttribute("tu-hidden-" + prop) || cache === false) {
        var value;
        css = el.style.cssText;
        el.style.cssText = "position: absolute; visibility: hidden; display: block;";
        if (prop == "width") {
          value = el.offsetWidth;
        } else if (prop == "height") {
          value = el.offsetHeight;
        }
        el.style.cssText = css;
        el.setAttribute("tu-hidden-" + prop, value);
        return parseFloat(value);
      } else {
        return parseFloat(el.getAttribute("tu-hidden-" + prop));
      }
    },
    actualHeight: function(el, cache) {
      return JsUtils.actualCss(el, "height", cache);
    },
    actualWidth: function(el, cache) {
      return JsUtils.actualCss(el, "width", cache);
    },
    css: function(el, styleProp, value, important) {
      if (!el) {
        return;
      }
      if (value !== undefined) {
        if (important === true) {
          el.style.setProperty(styleProp, value, "important");
        } else {
          el.style[styleProp] = value;
        }
      } else {
        var defaultView = (el.ownerDocument || document)
          .defaultView;
        if (defaultView && defaultView.getComputedStyle) {
          styleProp = styleProp.replace(/([A-Z])/g, "-$1")
            .toLowerCase();
          return defaultView.getComputedStyle(el, null)
            .getPropertyValue(styleProp);
        } else if (el.currentStyle) {
          styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
            return letter.toUpperCase();
          });
          value = el.currentStyle[styleProp];
          if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
            return (function(value) {
              var oldLeft = el.style.left,
                oldRsLeft = el.runtimeStyle.left;
              el.runtimeStyle.left = el.currentStyle.left;
              el.style.left = value || 0;
              value = el.style.pixelLeft + "px";
              el.style.left = oldLeft;
              el.runtimeStyle.left = oldRsLeft;
              return value;
            })(value);
          }
          return value;
        }
      }
    },
    show: function(el, display) {
      if (typeof el !== "undefined") {
        el.style.display = display ? display : "block";
      }
    },
    hide: function(el) {
      if (typeof el !== "undefined") {
        el.style.display = "none";
      }
    },
    /////////////////////////////
    // **   eventHandles   ** //
    ////////////////////////////
    addEvent: function(el, type, handler, one) {
      if (typeof el !== "undefined" && el !== null) {
        el.addEventListener(type, handler);
      }
    },
    removeEvent: function(el, type, handler) {
      if (el !== null) {
        el.removeEventListener(type, handler);
      }
    },
    on: function(element, selector, event, handler) {
      if (element === null) {
        return;
      }
      var eventId = JsUtils.getUniqueId("event");
      window.JsUtilsDelegatedEventHandlers[eventId] = function(e) {
        var targets = element.querySelectorAll(selector);
        var target = e.target;
        while (target && target !== element) {
          for (var i = 0, j = targets.length; i < j; i++) {
            if (target === targets[i]) {
              handler.call(target, e);
            }
          }
          target = target.parentNode;
        }
      };
      JsUtils.addEvent(element, event, window.JsUtilsDelegatedEventHandlers[eventId]);
      return eventId;
    },
    off: function(element, event, eventId) {
      if (!element || !window.JsUtilsDelegatedEventHandlers[eventId]) {
        return;
      }
      JsUtils.removeEvent(element, event, window.JsUtilsDelegatedEventHandlers[eventId]);
      delete window.JsUtilsDelegatedEventHandlers[eventId];
    },
    one: function onetime(el, type, callback) {
      el.addEventListener(type, function callee(e) {
        // remove event
        if (e.target && e.target.removeEventListener) {
          e.target.removeEventListener(e.type, callee);
        } // need to verify from https://themeforest.net/author_dashboard#comment_23615588
        if (el && el.removeEventListener) {
          e.currentTarget.removeEventListener(e.type, callee);
        } // call handler
        return callback(e);
      });
    },
    /////////////////////////////
    // **   scroll   ** //
    ////////////////////////////
    scrollTo: function(target, offset, duration) {
      // console.log(Math.abs(target.getBoundingClientRect().top - window.innerHeight / 2) / 2)
      var duration = duration ? duration : 300;
      var targetPos = target ? JsUtils.offset(target)
        .top : 0;
      var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var from, to;
      if (offset) {
        targetPos = targetPos - offset;
      }
      from = scrollPos;
      to = targetPos;
      JsUtils.animate(from, to, duration, function(value) {
        document.documentElement.scrollTop = value;
        document.body.parentNode.scrollTop = value;
        document.body.scrollTop = value;
      });
    },
    scrollTop: function(offset, duration) {
      JsUtils.scrollTo(null, offset, duration);
    },
    getScroll: function(element, method) {
      method = "scroll" + method;
      return element == window || element == document ? self[method == "scrollTop" ? "pageYOffset" : "pageXOffset"] || (browserSupportsBoxModel && document.documentElement[method]) || document.body[method] : element[method];
    },
    getDocumentHeight: function() {
      var body = document.body;
      var html = document.documentElement;
      return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    },
    getScrollTop: function() {
      return (document.scrollingElement || document.documentElement)
        .scrollTop;
    },
    /////////////////////////////
    // **   get Values ** //
    ////////////////////////////
    // JsUtils.getViewPort()
    getViewPort: function() {
      var view = window,
        val = "inner";
      if (!("innerWidth" in window)) {
        val = "client";
        view = document.documentElement || document.body;
      }
      return {
        width: view[val + "Width"],
        height: view[val + "Height"]
      };
    },
    getViewportWidth: function() {
      return this.getViewPort()
        .width;
    },
    getResponsiveValue: function(value, defaultValue) {
      var width = this.getViewPort()
        .width;
      var result;
      value = JsUtils.parseJson(value);
      if (typeof value === "object") {
        var resultKey;
        var resultBreakpoint = -1;
        var breakpoint;
        for (var key in value) {
          if (key === "default") {
            breakpoint = 0;
          } else {
            breakpoint = this.getBreakpoint(key) ? this.getBreakpoint(key) : parseInt(key);
          }
          if (breakpoint <= width && breakpoint > resultBreakpoint) {
            resultKey = key;
            resultBreakpoint = breakpoint;
          }
        }
        if (resultKey) {
          result = value[resultKey];
        } else {
          result = value;
        }
      } else {
        result = value;
      }
      return result;
    },
    getSelectorMatchValue: function(value) {
      var result = null;
      value = JsUtils.parseJson(value);
      if (typeof value === "object") {
        // Match condition
        if (value["match"] !== undefined) {
          var selector = Object.keys(value["match"])[0];
          value = Object.values(value["match"])[0];
          if (document.querySelector(selector) !== null) {
            result = value;
          }
        }
      } else {
        result = value;
      }
      return result;
    },
    getConditionalValue: function(value) {
      var value = JsUtils.parseJson(value);
      var result = JsUtils.getResponsiveValue(value);
      if (result !== null && result["match"] !== undefined) {
        result = JsUtils.getSelectorMatchValue(result);
      }
      if (result === null && value !== null && value["default"] !== undefined) {
        result = value["default"];
      }
      return result;
    },
    getCssVariableValue: function(variableName) {
      var hex = getComputedStyle(document.documentElement)
        .getPropertyValue(variableName);
      if (hex && hex.length > 0) {
        hex = hex.trim();
      }
      return hex;
    },
    getUniqueId: function(prefix) {
      return prefix + Math.floor(Math.random() * new Date()
        .getTime());
    },
    getBreakpoint: function(breakpoint) {
      var value = this.getCssVariableValue("--bs-" + breakpoint);
      if (value) {
        value = parseInt(value.trim());
      }
      return value;
    },
    isInViewport: function(element) {
      var rect = element.getBoundingClientRect();
      return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth));
    },
    isBreakpointUp: function(mode) {
      var width = this.getViewPort()
        .width;
      var breakpoint = this.getBreakpoint(mode);
      return width >= breakpoint;
    },
    isBreakpointDown: function(mode) {
      var width = this.getViewPort()
        .width;
      var breakpoint = this.getBreakpoint(mode);
      return width < breakpoint;
    },
    /////////////////////////////
    // **     Strings      ** //
    ////////////////////////////
    parseJson: function(value) {
      if (typeof value === "string") {
        value = value.replace(/'/g, '"');
        var jsonStr = value.replace(/(\w+:)|(\w+ :)/g, function(matched) {
          return '"' + matched.substring(0, matched.length - 1) + '":';
        });
        try {
          value = JSON.parse(jsonStr);
        } catch (e) {}
      }
      return value;
    },
    // 在字符串兩端添加雙引號，然後內部需要轉義的地方都要轉義，常用於接裝 JSON 的鍵名。
    // Target 目標字符串
    // JsUtils.quote(uu)
    quote: function(target) {
      //需要轉義的非法字符
      var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
      var meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
      };
      if (target.match(escapeable)) {
        return ('"' + target.replace(escapeable, function(str) {
          var ctx = meta[str];
          if (typeof ctx === "string") {
            return ctx;
          }
          return "\\u" + ("0000" + ctx.charCodeAt(0)
              .toString(16))
            .slice(-4);
        }) + '"');
      }
      return '"' + target + '"';
    },
    // JsUtils.snakeToCamel('background-color')
    snakeToCamel: function(string) {
      return string.replace(/(\-\w)/g, function(val) {
        return val[1].toUpperCase();
      });
    },
    // JsUtils.getRandomInt(0,100)
    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    // JsUtils.trim.all(' background-color ')
    trim: function(string) {
      return {
        all: (function() {
          return string.replace(/(^\s*)|(\s*$)/g, "");
        })(),
        left: (function() {
          return string.replace(/^\s*/g, "");
        })(),
        right: (function() {
          return string.replace(/\s*$/g, "");
        })()
      };
    },
    /**
     * 按照一定順序的屬性對資料進行分組
     * JsUtils.groupByProps(arrayOcj, 'count');
     */
    // const arrayOcj = [
    //   { type: 'a', name: 'x', count: 10 },
    //   { type: 'a', name: 'y', count: 11 },
    //   { type: 'a', name: 'x', count: 12 },
    //   { type: 'a', name: 'y', count: 13 },
    //   { type: 'b', name: 'x', count: 14 },
    //   { type: 'b', name: 'y', count: 15 }
    // ]
    groupByProps: function(arrayOcj, props = []) {
      if (typeof props === "string" || typeof props === "function") {
        props = [props];
      }
      const propCount = props.length;
      const zipData = {};
      for (const item of arrayOcj) {
        let data;
        for (let i = 0; i < propCount; ++i) {
          const isLast = i === propCount - 1;
          const prop = props[i];
          const value = typeof prop === "function" ? prop(item) : item[prop];
          if (!data) {
            if (!zipData[value]) {
              zipData[value] = isLast ? [] : {};
            }
            data = zipData[value];
          } else {
            if (!data[value]) {
              data[value] = isLast ? [] : {};
            }
            data = data[value];
          }
        }
        data.push(item);
      }
      return zipData;
    },
    //  const str2 = JsUtils.replaceAll('Hello World 222',"222", "1")
    replaceAll: function(strings, search, replacement) {
      return strings.replace(new RegExp(search, "g"), replacement);
    },
    /////////////////////////////
    // **   Colors   ** //
    ////////////////////////////
    colorLighten: function(color, amount) {
      const addLight = function(color, amount) {
        let cc = parseInt(color, 16) + amount;
        let c = cc > 255 ? 255 : cc;
        c = c.toString(16)
          .length > 1 ? c.toString(16) : `0${c.toString(16)}`;
        return c;
      };
      color = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color;
      amount = parseInt((255 * amount) / 100);
      return (color = `#${addLight(color.substring(0, 2), amount)}${addLight(
        color.substring(2, 4),
        amount
      )}${addLight(color.substring(4, 6), amount)}`);
    },
    colorDarken: function(color, amount) {
      const subtractLight = function(color, amount) {
        let cc = parseInt(color, 16) - amount;
        let c = cc < 0 ? 0 : cc;
        c = c.toString(16)
          .length > 1 ? c.toString(16) : `0${c.toString(16)}`;
        return c;
      };
      color = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color;
      amount = parseInt((255 * amount) / 100);
      return (color = `#${subtractLight(
        color.substring(0, 2),
        amount
      )}${subtractLight(color.substring(2, 4), amount)}${subtractLight(
        color.substring(4, 6),
        amount
      )}`);
    },
    isHexColor(code) {
      return /^#[0-9A-F]{6}$/i.test(code);
    }
  };
})();
var JSTU = JsUtils.extend(JsUtils);