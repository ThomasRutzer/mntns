webpackJsonp([4],{

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__contact__ = __webpack_require__(142);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ContactComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__contact__["a"]; });




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

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Router__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Router_Link__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router_default_component_abstract__ = __webpack_require__(128);
/* unused harmony reexport Router */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__Router_Link__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__router_default_component_abstract__["a"]; });






/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Link = /** @class */ (function () {
    function Link(name, path) {
        this.name = name;
        this.path = path;
    }
    return Link;
}());
/* harmony default export */ __webpack_exports__["a"] = (Link);


/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RouterDefaultComponentAbstract; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store___ = __webpack_require__(18);
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


/**
 * abstract component. May extend every "common" router component,
 * e.g. any content pages like contact etc, to abstract common behavior
 */
var RouterDefaultComponentAbstract = /** @class */ (function (_super) {
    __extends(RouterDefaultComponentAbstract, _super);
    function RouterDefaultComponentAbstract() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RouterDefaultComponentAbstract.prototype.beforeCreate = function () {
        this.$store.commit(__WEBPACK_IMPORTED_MODULE_1__store___["b" /* mutationTypes */].REDUCE_BACKGROUND);
    };
    RouterDefaultComponentAbstract = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["Component"])({
            computed: {
                titleIn: function () {
                    return this.$store.state.currentRoute.titleAnimatedIn;
                }
            },
        })
    ], RouterDefaultComponentAbstract);
    return RouterDefaultComponentAbstract;
}(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["Vue"]));



/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_property_decorator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__(126);
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


var ContactComponent = /** @class */ (function (_super) {
    __extends(ContactComponent, _super);
    function ContactComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContactComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_vue_property_decorator__["Component"])({
            template: __webpack_require__(143),
        })
    ], ContactComponent);
    return ContactComponent;
}(__WEBPACK_IMPORTED_MODULE_1__router__["a" /* RouterDefaultComponentAbstract */]));



/***/ }),

/***/ 143:
/***/ (function(module, exports) {

module.exports = "<div class=\"contact\">\r\n    <div class=\"contact__content\">\r\n        <h1 class=\"contact__title\"\r\n            v-title-animation>\r\n            Hello you, don´t be a stranger anymore\r\n        </h1>\r\n\r\n        <div class=\"margin-top--m revealing-content revealing-content--medium-duration\"\r\n             :class=\"{'revealing-content--reveal' : titleIn}\">\r\n            <div class=\"contact-option\">\r\n                <span class=\"contact-option__label\">mail</span>\r\n                <a class=\"contact-option__value bare-link\" href=\"mailto:thomas@rutzer.de\" title=\"email me\">\r\n                    thomas@rutzer.de\r\n                </a>\r\n            </div>\r\n\r\n            <div class=\"contact-option margin-top--s\">\r\n                <span class=\"contact-option__label\">social</span>\r\n                <div class=\"contact-option__value \">\r\n                    <ul class=\"contact__social-list inline-list bare-list\">\r\n                        <li>\r\n                            <a title=\"\" href=\"\">\r\n                                <svg class=\"contact-social-icon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 64 64\">\r\n                                    <g>\r\n                                        <path d=\"M31.84,7.56a24.65,24.65,0,0,0-7.79,48c1.23.23,1.68-.53,1.68-1.19s0-2.13,0-4.19c-6.86,1.49-8.3-3.3-8.3-3.3-1.12-2.85-2.74-3.61-2.74-3.61-2.24-1.53.17-1.5.17-1.5a5.19,5.19,0,0,1,3.77,2.54c2.2,3.77,5.77,2.68,7.18,2a5.3,5.3,0,0,1,1.56-3.3c-5.47-.62-11.22-2.73-11.22-12.18a9.54,9.54,0,0,1,2.53-6.61,8.88,8.88,0,0,1,.24-6.52s2.07-.67,6.78,2.52a23.35,23.35,0,0,1,12.34,0c4.71-3.19,6.78-2.52,6.78-2.52A8.88,8.88,0,0,1,45,24.31a9.49,9.49,0,0,1,2.53,6.61c0,9.47-5.76,11.56-11.25,12.17A5.85,5.85,0,0,1,38,47.65c0,3.3,0,6,0,6.76s.45,1.43,1.7,1.19a24.66,24.66,0,0,0-7.81-48Z\">\r\n\r\n                                        </path>\r\n                                    </g>\r\n                                </svg>\r\n                            </a>\r\n                        </li>\r\n                        <li>\r\n                            <a title=\"\" href=\"\">\r\n                                <svg class=\"contact-social-icon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 64 64\">\r\n                                    <g>\r\n                                        <path d=\"M30.92,7.4A24.62,24.62,0,1,0,55.53,32,24.61,24.61,0,0,0,30.92,7.4Zm12.36,20c0,.25,0,.51,0,.76C43.3,36,37.33,45,26.41,45a16.8,16.8,0,0,1-9.09-2.67,10.9,10.9,0,0,0,1.41.08,11.85,11.85,0,0,0,7.37-2.54,5.91,5.91,0,0,1-5.54-4.12,5.84,5.84,0,0,0,2.68-.1,5.93,5.93,0,0,1-4.76-5.82v-.07a5.94,5.94,0,0,0,2.69.74,5.94,5.94,0,0,1-1.84-7.92,16.86,16.86,0,0,0,12.23,6.2,6.1,6.1,0,0,1-.15-1.36,5.93,5.93,0,0,1,10.26-4.05,12,12,0,0,0,3.77-1.44,6,6,0,0,1-2.61,3.28,11.8,11.8,0,0,0,3.41-.94A12.21,12.21,0,0,1,43.28,27.35Z\">\r\n\r\n                                        </path>\r\n                                    </g>\r\n                                </svg>\r\n                            </a>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ })

});
//# sourceMappingURL=4.5a1981ca18daa0fce05e.js.map