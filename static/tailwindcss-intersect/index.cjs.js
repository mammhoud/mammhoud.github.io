var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/tailwindcss/dist/plugin.js
var require_plugin = __commonJS({
  "node_modules/tailwindcss/dist/plugin.js"(exports2, module2) {
    "use strict";
    function g(i, n) {
      return { handler: i, config: n };
    }
    g.withOptions = function(i, n = () => ({})) {
      function t(o) {
        return { handler: i(o), config: n(o) };
      }
      return t.__isOptionsFunction = true, t;
    };
    var u = g;
    module2.exports = u;
  }
});

// src/observer/index.js
var observer_exports = {};
__export(observer_exports, {
  default: () => observer_default
});
var Observer, observer_default;
var init_observer = __esm({
  "src/observer/index.js"() {
    Observer = {
      start() {
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", () => this.observe());
          return;
        }
        this.observe();
      },
      restart() {
        this._observers.forEach((observer) => observer.disconnect());
        this._observers = [];
        this.observe();
      },
      observe() {
        const selectors = [
          '[class*=" intersect:"]',
          '[class*=":intersect:"]',
          '[class^="intersect:"]',
          '[class="intersect"]',
          '[class*=" intersect "]',
          '[class^="intersect "]',
          '[class$=" intersect"]'
        ];
        document.querySelectorAll(selectors.join(",")).forEach((element) => {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) {
                element.setAttribute("no-intersect", "");
                return;
              }
              element.removeAttribute("no-intersect");
              element.classList.contains("intersect-once") && observer.disconnect();
            });
          }, {
            threshold: this._getThreshold(element)
          });
          observer.observe(element);
          this._observers.push(observer);
        });
      },
      _getThreshold(element) {
        if (element.classList.contains("intersect-full")) {
          return 0.99;
        }
        if (element.classList.contains("intersect-half")) {
          return 0.5;
        }
        return 0;
      },
      _observers: []
    };
    observer_default = Observer;
  }
});

// src/index.cjs
var plugin = require_plugin();
module.exports = plugin(
  ({ addVariant }) => {
    addVariant("intersect", "&:not([no-intersect])");
  }
);
module.exports.Observer = (init_observer(), __toCommonJS(observer_exports));
