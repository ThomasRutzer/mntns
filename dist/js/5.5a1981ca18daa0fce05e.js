webpackJsonp([5],{

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__background__ = __webpack_require__(183);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BackgroundComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__background__["a"]; });




/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? factory(exports, __webpack_require__(10), __webpack_require__(124), __webpack_require__(19)) :
	typeof define === 'function' && define.amd ? define(['exports', 'vue', 'vue-class-component', 'reflect-metadata'], factory) :
	(factory((global.VuePropertyDecorator = {}),global.Vue,global.VueClassComponent));
}(this, (function (exports,vue,vueClassComponent) { 'use strict';

vue = vue && vue.hasOwnProperty('default') ? vue['default'] : vue;
var vueClassComponent__default = 'default' in vueClassComponent ? vueClassComponent['default'] : vueClassComponent;

/** vue-property-decorator verson 6.0.0 MIT LICENSE copyright 2017 kaorun343 */
'use strict';
/**
 * decorator of an inject
 * @param key key
 * @return PropertyDecorator
 */
function Inject(key) {
    return vueClassComponent.createDecorator(function (componentOptions, k) {
        if (typeof componentOptions.inject === 'undefined') {
            componentOptions.inject = {};
        }
        if (!Array.isArray(componentOptions.inject)) {
            componentOptions.inject[k] = key || k;
        }
    });
}
/**
 * decorator of a provide
 * @param key key
 * @return PropertyDecorator | void
 */
function Provide(key) {
    return vueClassComponent.createDecorator(function (componentOptions, k) {
        var provide = componentOptions.provide;
        if (typeof provide !== 'function' || !provide.managed) {
            var original_1 = componentOptions.provide;
            provide = componentOptions.provide = function () {
                var rv = Object.create((typeof original_1 === 'function' ? original_1.call(this) : original_1) || null);
                for (var i in provide.managed)
                    rv[provide.managed[i]] = this[i];
                return rv;
            };
            provide.managed = {};
        }
        provide.managed[k] = key || k;
    });
}
/**
 * decorator of model
 * @param  event event name
 * @return PropertyDecorator
 */
function Model(event, options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        if (!Array.isArray(options) && typeof options.type === 'undefined') {
            options.type = Reflect.getMetadata('design:type', target, key);
        }
        vueClassComponent.createDecorator(function (componentOptions, k) {
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
            componentOptions.model = { prop: k, event: event || k };
        })(target, key);
    };
}
/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
function Prop(options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        if (!Array.isArray(options) && typeof options.type === 'undefined') {
            options.type = Reflect.getMetadata('design:type', target, key);
        }
        vueClassComponent.createDecorator(function (componentOptions, k) {
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
        })(target, key);
    };
}
/**
 * decorator of a watch function
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
function Watch(path, options) {
    if (options === void 0) { options = {}; }
    var _a = options.deep, deep = _a === void 0 ? false : _a, _b = options.immediate, immediate = _b === void 0 ? false : _b;
    return vueClassComponent.createDecorator(function (componentOptions, handler) {
        if (typeof componentOptions.watch !== 'object') {
            componentOptions.watch = Object.create(null);
        }
        componentOptions.watch[path] = { handler: handler, deep: deep, immediate: immediate };
    });
}
// Code copied from Vue/src/shared/util.js
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = function (str) { return str.replace(hyphenateRE, '-$1').toLowerCase(); };
/**
 * decorator of an event-emitter function
 * @param  event The name of the event
 * @return MethodDecorator
 */
function Emit(event) {
    return function (target, key, descriptor) {
        key = hyphenate(key);
        var original = descriptor.value;
        descriptor.value = function emitter() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (original.apply(this, args) !== false)
                this.$emit.apply(this, [event || key].concat(args));
        };
    };
}

exports.Component = vueClassComponent__default;
exports.Vue = vue;
exports.Inject = Inject;
exports.Provide = Provide;
exports.Model = Model;
exports.Prop = Prop;
exports.Watch = Watch;
exports.Emit = Emit;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
  * vue-class-component v6.1.2
  * (c) 2015-2017 Evan You
  * @license MIT
  */


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(__webpack_require__(10));

var hasProto = { __proto__: [] } instanceof Array;
function createDecorator(factory) {
    return function (target, key, index) {
        var Ctor = typeof target === 'function'
            ? target
            : target.constructor;
        if (!Ctor.__decorators__) {
            Ctor.__decorators__ = [];
        }
        if (typeof index !== 'number') {
            index = undefined;
        }
        Ctor.__decorators__.push(function (options) { return factory(options, key, index); });
    };
}
function isPrimitive(value) {
    var type = typeof value;
    return value == null || (type !== "object" && type !== "function");
}
function warn(message) {
    if (typeof console !== 'undefined') {
        console.warn('[vue-class-component] ' + message);
    }
}

function collectDataFromConstructor(vm, Component) {
    var originalInit = Component.prototype._init;
    Component.prototype._init = function () {
        var _this = this;
        var keys = Object.getOwnPropertyNames(vm);
        if (vm.$options.props) {
            for (var key in vm.$options.props) {
                if (!vm.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        keys.forEach(function (key) {
            if (key.charAt(0) !== '_') {
                Object.defineProperty(_this, key, {
                    get: function () { return vm[key]; },
                    set: function (value) { return vm[key] = value; },
                    configurable: true
                });
            }
        });
    };
    var data = new Component();
    Component.prototype._init = originalInit;
    var plainData = {};
    Object.keys(data).forEach(function (key) {
        if (data[key] !== undefined) {
            plainData[key] = data[key];
        }
    });
    if (false) {
        if (!(Component.prototype instanceof Vue) && Object.keys(plainData).length > 0) {
            warn('Component class must inherit Vue or its descendant class ' +
                'when class property is used.');
        }
    }
    return plainData;
}

var $internalHooks = [
    'data',
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'render',
    'errorCaptured'
];
function componentFactory(Component, options) {
    if (options === void 0) { options = {}; }
    options.name = options.name || Component._componentTag || Component.name;
    var proto = Component.prototype;
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
            return;
        }
        if ($internalHooks.indexOf(key) > -1) {
            options[key] = proto[key];
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (typeof descriptor.value === 'function') {
            (options.methods || (options.methods = {}))[key] = descriptor.value;
        }
        else if (descriptor.get || descriptor.set) {
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
            };
        }
    });
    (options.mixins || (options.mixins = [])).push({
        data: function () {
            return collectDataFromConstructor(this, Component);
        }
    });
    var decorators = Component.__decorators__;
    if (decorators) {
        decorators.forEach(function (fn) { return fn(options); });
        delete Component.__decorators__;
    }
    var superProto = Object.getPrototypeOf(Component.prototype);
    var Super = superProto instanceof Vue
        ? superProto.constructor
        : Vue;
    var Extended = Super.extend(options);
    forwardStaticMembers(Extended, Component, Super);
    return Extended;
}
var reservedPropertyNames = [
    'cid',
    'super',
    'options',
    'superOptions',
    'extendOptions',
    'sealedOptions',
    'component',
    'directive',
    'filter'
];
function forwardStaticMembers(Extended, Original, Super) {
    Object.getOwnPropertyNames(Original).forEach(function (key) {
        if (key === 'prototype') {
            return;
        }
        var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);
        if (extendedDescriptor && !extendedDescriptor.configurable) {
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(Original, key);
        if (!hasProto) {
            if (key === 'cid') {
                return;
            }
            var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);
            if (!isPrimitive(descriptor.value)
                && superDescriptor
                && superDescriptor.value === descriptor.value) {
                return;
            }
        }
        if (false) {
            warn("Static property name '" + key + "' declared on class '" + Original.name + "' " +
                'conflicts with reserved property name of Vue internal. ' +
                'It may cause unexpected behavior of the component. Consider renaming the property.');
        }
        Object.defineProperty(Extended, key, descriptor);
    });
}

function Component(options) {
    if (typeof options === 'function') {
        return componentFactory(options);
    }
    return function (Component) {
        return componentFactory(Component, options);
    };
}
(function (Component) {
    function registerHooks(keys) {
        $internalHooks.push.apply($internalHooks, keys);
    }
    Component.registerHooks = registerHooks;
})(Component || (Component = {}));
var Component$1 = Component;

exports['default'] = Component$1;
exports.createDecorator = createDecorator;


/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackgroundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__background_scss__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__background_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__background_scss__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var BackgroundComponent = /** @class */ (function (_super) {
    __extends(BackgroundComponent, _super);
    function BackgroundComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // actual transition of background component for
        // route specific component inside router-view=background
        // only apply this transition, when route context is "/" (home)
        _this.transition = true;
        // actual expanding transition of
        // route specific component inside router-view=background
        _this.expandTransition = false;
        return _this;
    }
    BackgroundComponent.prototype.created = function () {
        var _this = this;
        this.$router.beforeEach(function (to, from, next) {
            _this.transition = from.path === '/' || to.path === '/';
            _this.expandTransition = from.path === '/experiments' || to.path === '/experiments';
            next();
        });
    };
    BackgroundComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["Component"])({
            template: __webpack_require__(186),
            computed: {
                isExpanded: function () {
                    return this.$store.state.background.visibility === 1;
                },
                isActive: function () {
                    return this.$store.state.background.activated;
                }
            },
        })
    ], BackgroundComponent);
    return BackgroundComponent;
}(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["Vue"]));



/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(185);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(119)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-2!../../../node_modules/postcss-loader/lib/index.js??ref--3-3!../../../node_modules/sass-loader/lib/loader.js??ref--3-4!./background.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-2!../../../node_modules/postcss-loader/lib/index.js??ref--3-3!../../../node_modules/sass-loader/lib/loader.js??ref--3-4!./background.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(118)(true);
// imports


// module
exports.push([module.i, ".background{position:fixed;width:100vw;height:100vh;top:0;left:0}.background--transition{-webkit-transition:all .5s ease-out;transition:all .5s ease-out}@media (min-width:48em){.background{left:50%;top:128px;width:calc(66% - 80px * 2);height:calc(100vh - 128px * 2)}.background--transition-enter-active,.background--transition-leave-active{-webkit-transform-origin:center;transform-origin:center;-webkit-transition:opacity .3s .2s,-webkit-transform 1.1s ease-out .1s;transition:opacity .3s .2s,-webkit-transform 1.1s ease-out .1s;transition:transform 1.1s ease-out .1s,opacity .3s .2s;transition:transform 1.1s ease-out .1s,opacity .3s .2s,-webkit-transform 1.1s ease-out .1s}.background--transition-enter,.background--transition-leave-to{-webkit-transform:scale(.95);transform:scale(.95);opacity:0}}@media (min-width:64em){.background{left:50%;width:33%}}.background--expanded{width:100vw;height:100vh;top:0;left:0;overflow:hidden}.background--active{z-index:5}.background__backdrop{display:none;position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;background:#0fc}@media (min-width:48em){.background__backdrop{-webkit-transform:translate(16px,-16px);transform:translate(16px,-16px)}}.background__backdrop--visible{display:block}@-webkit-keyframes backgroundEntrance{0%{opacity:0}to{opacity:1}}@keyframes backgroundEntrance{0%{opacity:0}to{opacity:1}}", "", {"version":3,"sources":["/mnt/c/Projekte/thomasrutzer/portfolio/src/components/background/background.scss"],"names":[],"mappings":"AAAA,YACE,eAAgB,AAChB,YAAa,AACb,aAAc,AACd,MAAO,AACP,MAAQ,CACT,AAED,wBACE,oCAAuC,AACvC,2BAA+B,CAChC,AAED,wBACE,YACE,SAAU,AACV,UAAW,AACX,2BAA4B,AAC5B,8BAAwC,CACzC,AACD,0EACE,gCAAiC,AACzB,wBAAyB,AACjC,uEAAiF,AACjF,+DAAyE,AACzE,uDAAiE,AACjE,0FAA0G,CAC3G,AACD,+DACE,6BAAqC,AAC7B,qBAA6B,AACrC,SAAW,CACZ,CACF,AAED,wBACE,YACE,SAAU,AACV,SAAW,CACZ,CACF,AAED,sBACE,YAAa,AACb,aAAc,AACd,MAAO,AACP,OAAQ,AACR,eAAiB,CAClB,AAED,oBACE,SAAW,CACZ,AAED,sBACE,aAAc,AACd,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,WAAY,AACZ,YAAa,AACb,WAAY,AACZ,eAAoB,CACrB,AAED,wBACE,sBACE,wCAA0C,AAClC,+BAAkC,CAC3C,CACF,AAED,+BACE,aAAe,CAChB,AAED,sCACE,GACE,SAAW,CACZ,AACD,GACE,SAAW,CACZ,CACF,AAED,8BACE,GACE,SAAW,CACZ,AACD,GACE,SAAW,CACZ,CACF","file":"background.scss","sourcesContent":[".background {\n  position: fixed;\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  left: 0;\n}\n\n.background--transition {\n  -webkit-transition: all 500ms ease-out;\n  transition: all 500ms ease-out;\n}\n\n@media (min-width: 48em) {\n  .background {\n    left: 50%;\n    top: 128px;\n    width: calc(66% - 80px * 2);\n    height: calc(100vh - (64px + 64px) * 2);\n  }\n  .background--transition-enter-active, .background--transition-leave-active {\n    -webkit-transform-origin: center;\n            transform-origin: center;\n    -webkit-transition: opacity 300ms 200ms, -webkit-transform 1100ms ease-out 100ms;\n    transition: opacity 300ms 200ms, -webkit-transform 1100ms ease-out 100ms;\n    transition: transform 1100ms ease-out 100ms, opacity 300ms 200ms;\n    transition: transform 1100ms ease-out 100ms, opacity 300ms 200ms, -webkit-transform 1100ms ease-out 100ms;\n  }\n  .background--transition-enter, .background--transition-leave-to {\n    -webkit-transform: scale(0.95, 0.95);\n            transform: scale(0.95, 0.95);\n    opacity: 0;\n  }\n}\n\n@media (min-width: 64em) {\n  .background {\n    left: 50%;\n    width: 33%;\n  }\n}\n\n.background--expanded {\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n}\n\n.background--active {\n  z-index: 5;\n}\n\n.background__backdrop {\n  display: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: -1;\n  background: #00ffcc;\n}\n\n@media (min-width: 48em) {\n  .background__backdrop {\n    -webkit-transform: translate(16px, -16px);\n            transform: translate(16px, -16px);\n  }\n}\n\n.background__backdrop--visible {\n  display: block;\n}\n\n@-webkit-keyframes backgroundEntrance {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes backgroundEntrance {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 186:
/***/ (function(module, exports) {

module.exports = "<div class=\"background\"\r\n     :class=\"{'background--active': isActive,\r\n              'background--expanded': isExpanded,\r\n              'background--transition': expandTransition}\">\r\n\r\n    <transition :name=\"transition ? 'background--transition' : null\">\r\n        <router-view name=\"background\"></router-view>\r\n    </transition>\r\n\r\n    <div class=\"background__backdrop\"\r\n         :class=\"{'background__backdrop--visible': !isExpanded}\"\r\n    ></div>\r\n</div>"

/***/ })

});
//# sourceMappingURL=5.5a1981ca18daa0fce05e.js.map