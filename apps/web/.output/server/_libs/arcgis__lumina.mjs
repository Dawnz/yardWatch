var __getProtoOf = Object.getPrototypeOf;
var __reflectGet = Reflect.get;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __superGet = (cls, obj, key) => __reflectGet(__getProtoOf(cls), key, obj);
var _litElement, _store, _pendingAttributes, _ProxyComponent_instances, initializeComponent_fn, _observables, _originalShouldUpdate, _enableUpdating, _postLoadedDeferred, _trackingTarget, _LitElement_instances, doTrackedUpdate_fn, load_fn;
import { D as Deferred, r as rethrowError, s as safeCall, a as safeAsyncCall, d as devToolsAwareTimeout, c as camelToKebab, o as observeAncestorsMutation, b as getElementAttribute, e as getElementLocale, f as startLocaleObserver } from "./arcgis__toolkit.mjs";
import { i } from "./lit-element.mjs";
import { A, a as e, o } from "./lit-html.mjs";
import { m } from "./lit__reactive-element.mjs";
import { c as a$1, s, l as l$1, a } from "./arcgis__core.mjs";
const controllerSymbol = /* @__PURE__ */ Symbol.for("controller");
const isController = (value) => typeof value === "object" && value !== null && (controllerSymbol in value || "hostConnected" in value || "hostDisconnected" in value || "hostUpdate" in value || "hostUpdated" in value);
const isPromise = (arg) => typeof arg?.then === "function";
let ambientComponent;
const setAmbientComponent = (component) => {
  if (ambientComponent === component) {
    return;
  }
  ambientComponent = component;
  queueMicrotask(() => ambientComponent === component ? ambientComponent = void 0 : 0);
};
const retrieveComponent = (name) => {
  return ambientComponent;
};
let ambientControllers = [];
const setParentController = (controller) => {
  if (controller === void 0) {
    ambientControllers = [];
    return;
  }
  const index = ambientControllers.indexOf(controller);
  ambientControllers = index === -1 ? [...ambientControllers, controller] : ambientControllers.slice(0, index + 1);
  queueMicrotask(() => ambientControllers = []);
};
const retrieveParentControllers = () => ambientControllers;
let ambientChildController;
const setAmbientChildController = (controller) => {
  if (ambientChildController === controller) {
    return;
  }
  ambientChildController = controller;
  queueMicrotask(() => ambientChildController === controller ? ambientChildController = void 0 : 0);
};
const retrieveAmbientChildController = () => {
  const controller = ambientChildController;
  ambientChildController = void 0;
  return controller;
};
const use = async (value, watchExports) => {
  const controller = useRefSync(value);
  if (controller === void 0) {
    return value;
  }
  await controller.ready;
  if (typeof watchExports === "function") {
    const unsubscribe = controller.watchExports(
      (exports$1) => watchExports(exports$1, unsubscribe)
    );
  }
  return controller.exports;
};
const useRef = async (value) => {
  const controller = useRefSync(value);
  await controller.ready;
  return controller;
};
const useRefSync = (value) => {
  const component = retrieveComponent();
  const controller = component.manager.X(value);
  if (controller !== void 0) {
    return controller;
  }
  if (isController(value)) {
    return value;
  }
  const ambientChildController2 = retrieveAmbientChildController();
  if (ambientChildController2 !== void 0) {
    return ambientChildController2;
  }
  return void 0;
};
let shouldBypassReadOnly = false;
const bypassReadOnly = (callback) => {
  shouldBypassReadOnly = true;
  try {
    return callback();
  } finally {
    shouldBypassReadOnly = false;
  }
};
const trackPropertyKey = (object, onResolved, defaultValue) => {
  const keys = Object.keys(object);
  const keyCount = keys.length;
  if (keyTrackMap === void 0) {
    queueMicrotask(propertyTrackResolve);
  }
  keyTrackMap ??= /* @__PURE__ */ new Map();
  let pendingTrackers = keyTrackMap.get(object);
  if (pendingTrackers === void 0) {
    pendingTrackers = { callbacks: [], keyCount };
    keyTrackMap.set(object, pendingTrackers);
  }
  if (pendingTrackers.keyCount !== keyCount) {
    pendingTrackers.callbacks.forEach((resolve) => resolve(keys));
    pendingTrackers.callbacks = [];
    pendingTrackers.keyCount = keyCount;
  }
  pendingTrackers.callbacks.push((keys2) => {
    const callback = (key2) => safeCall(onResolved, null, key2);
    const key = keys2[keyCount];
    if (key === void 0) {
      callback(void 0);
    } else if (object[key] === defaultValue) {
      callback(key);
    } else {
      callback(void 0);
    }
  });
  return defaultValue;
};
let keyTrackMap = void 0;
const propertyTrackResolve = () => {
  keyTrackMap?.forEach(({ callbacks }, object) => {
    const keys = Object.keys(object);
    callbacks.forEach((commit) => commit(keys));
  });
  keyTrackMap = void 0;
};
const trackPropKey = (component, onResolved, defaultValue) => {
  const manager = component.manager;
  if (manager.V !== A && manager.V !== defaultValue) {
    manager.S(void 0, void 0);
  }
  if (manager.T.length === 0) {
    queueMicrotask(() => manager.S(void 0, void 0));
  }
  manager.V = defaultValue;
  manager.T.push((key, value) => safeCall(onResolved, void 0, defaultValue === value ? key : void 0));
  return defaultValue;
};
const trackKey = (hostsCandidates = [
  retrieveComponent(),
  ...retrieveParentControllers()
], onResolved, defaultValue) => {
  const candidateHosts = Array.isArray(hostsCandidates) ? hostsCandidates : [hostsCandidates];
  let leftToResolve = candidateHosts.length + 1;
  const resolved = (resolution) => {
    leftToResolve -= 1;
    if (resolution !== void 0) {
      leftToResolve = Math.min(leftToResolve, 0);
    }
    if (leftToResolve === 0) {
      onResolved(resolution);
    }
  };
  candidateHosts.forEach(
    (host) => trackPropertyKey(
      host,
      (key) => resolved(key === void 0 ? void 0 : { key, host, isReactive: false }),
      defaultValue
    )
  );
  for (const host of candidateHosts) {
    if ("manager" in host && host.manager.component === host) {
      trackPropKey(
        host,
        (key) => resolved(key === void 0 ? void 0 : { key, host, isReactive: true }),
        defaultValue
      );
      break;
    }
  }
  return defaultValue;
};
const createEventFactory = (eventName2 = "", options = {}, component = retrieveComponent()) => {
  const emitter = {
    emit: (payload) => {
      if (eventName2 === "") {
        propertyTrackResolve();
      }
      const event = new CustomEvent(eventName2, {
        detail: payload,
        cancelable: true,
        bubbles: true,
        composed: true,
        ...options
      });
      component.el.dispatchEvent(event);
      return event;
    }
  };
  if (eventName2 === "") {
    trackKey(
      void 0,
      (resolution) => eventName2 = resolution.key,
      emitter
    );
  }
  return emitter;
};
const createEvent = createEventFactory.bind(null, "");
var _a;
_a = controllerSymbol;
class Controller {
  constructor(component) {
    this.#hostConnected = [];
    this.#hostDisconnected = [];
    this.#hostLoad = [];
    this.#hostLoaded = [];
    this.#hostUpdate = [];
    this.#hostUpdated = [];
    this.#hostDestroy = [];
    this.#hostLifecycle = [];
    this.#lifecycleCleanups = [];
    this.#loadCalled = false;
    this.P = new Deferred();
    this.connectedCalled = false;
    this.loadedCalled = false;
    this[_a] = true;
    this.#exportWatchers = [];
    const that = this;
    const resolvedComponent = component ?? retrieveComponent();
    that.#component = resolvedComponent;
    that.ready = that.P.promise;
    that.#exports = makeProvisionalValue(that);
    {
      that.component = resolvedComponent;
    }
    that.#component.addController(that);
    const manager = that.#component.manager;
    const isInControllerManager = manager === void 0;
    if (!isInControllerManager) {
      setParentController(that);
      queueMicrotask(() => that.catchUpLifecycle());
    }
  }
  #hostConnected;
  #hostDisconnected;
  #hostLoad;
  #hostLoaded;
  #hostUpdate;
  #hostUpdated;
  #hostDestroy;
  #hostLifecycle;
  #lifecycleCleanups;
  #loadCalled;
  #component;
  /**
   * If controller is being added dynamically, after the component
   * construction, then trigger connected and load right away
   */
  catchUpLifecycle() {
    const { manager } = this.#component;
    const connectedWillStillHappen = !manager.connectedCalled;
    if (!connectedWillStillHappen && !this.connectedCalled) {
      this.triggerConnected();
    }
    const loadWillStillHappen = !manager.#loadCalled;
    if (loadWillStillHappen) {
      return;
    }
    this.triggerLoad().then(
      () => (
        // Call loaded ourself, unless manager is going to do it
        manager.loadedCalled && this.triggerLoaded()
      )
    ).catch(rethrowError(this.#component));
  }
  #exports;
  get exports() {
    return this.#exports;
  }
  /**
   * Set controller's exports property (for usage with proxyExports()) and mark
   * controller as ready (for usage in other controllers). Also, triggers
   * re-render of the component
   */
  set exports(exports$1) {
    const oldExports = this.#exports;
    if (oldExports !== exports$1) {
      this.#exports = exports$1;
      this.#exportWatchers.forEach(safeCall);
      if (this.connectedCalled && this.O !== false) {
        this.#component.requestUpdate(this.O, oldExports);
      }
    }
    this.P.resolve(exports$1);
  }
  setProvisionalExports(exports$1, proxy2 = true) {
    this.#exports = proxy2 ? makeProvisionalValue(exports$1) : exports$1;
    this.#exportWatchers.forEach(safeCall);
  }
  #exportWatchers;
  watchExports(callback) {
    const safeCallback = () => callback(this.#exports);
    this.#exportWatchers.push(safeCallback);
    return () => void this.#exportWatchers.splice(this.#exportWatchers.indexOf(safeCallback), 1);
  }
  /**
   * A flexible utility for making sure a controller is loaded before it's used,
   * regardless of how or where a controller was defined:
   *
   * @example
   * makeGenericController(async (component, controller) => {
   *   // Await some controller from the component:
   *   await controller.use(component.someController);
   *   // Initialize new controllers
   *   await controller.use(load(importCoreReactiveUtils));
   *   await controller.use(new ViewModelController(component,newWidgetsHomeHomeViewModel));
   *   await controller.use(someController(component));
   * });
   *
   * @remarks
   * If your controller is not async, and you are not creating it async, then
   * you are not required to use controller.use - you can use it directly.
   * Similarly, accessing controllers after componentWillLoad callback does not
   * require awaiting them as they are guaranteed to be loaded by then.
   */
  get use() {
    setAmbientComponent(this.#component);
    return use;
  }
  /**
   * Just like controller.use, but returns the controller itself, rather than it's
   * exports
   *
   * Use cases:
   * - You have a controller and you want to make sure it's loaded before you
   *   try to use it
   * - Your controller is not using exports, so you wish to access some props on
   *   it directly
   * - You have a controller exports only, and you want to retrieve the
   *   controller itself. This is useful if you wish to call .watchExports() or
   *   some other method on the controller
   */
  get useRef() {
    setAmbientComponent(this.#component);
    return useRef;
  }
  /**
   * Like useRef, but doesn't wait for the controller to get ready
   *
   * @private
   */
  get useRefSync() {
    setAmbientComponent(this.#component);
    return useRefSync;
  }
  controllerRemoved() {
    if (this.#component.el.isConnected) {
      this.triggerDisconnected();
    }
    this.triggerDestroy();
  }
  // Register a lifecycle callback
  onConnected(callback) {
    this.#hostConnected.push(callback);
  }
  onDisconnected(callback) {
    this.#hostDisconnected.push(callback);
  }
  onLoad(callback) {
    this.#hostLoad.push(callback);
  }
  onLoaded(callback) {
    this.#hostLoaded.push(callback);
  }
  onUpdate(callback) {
    this.#hostUpdate.push(callback);
  }
  onUpdated(callback) {
    this.#hostUpdated.push(callback);
  }
  onDestroy(callback) {
    this.#hostDestroy.push(callback);
  }
  onLifecycle(callback) {
    this.#hostLifecycle.push(callback);
    if (this.connectedCalled && this.#component.el.isConnected) {
      this.#callLifecycle(callback);
    }
  }
  // Call each lifecycle hook
  /** @private */
  triggerConnected() {
    const that = this;
    if (that.hostConnected) {
      safeCall(that.hostConnected, that);
    }
    that.#hostConnected.forEach(safeCall);
    that.triggerLifecycle();
    that.connectedCalled = true;
  }
  /** @private */
  triggerDisconnected() {
    const that = this;
    if (that.hostDisconnected) {
      safeCall(that.hostDisconnected, that);
    }
    that.#hostDisconnected.forEach(safeCall);
    that.#lifecycleCleanups.forEach(safeCall);
    that.#lifecycleCleanups = [];
  }
  /** @private */
  async triggerLoad() {
    if (this.#loadCalled) {
      return;
    }
    this.#loadCalled = true;
    const genericController = this;
    if (genericController.hostLoad) {
      await safeAsyncCall(genericController.hostLoad, genericController);
    }
    if (this.#hostLoad.length > 0) {
      await Promise.allSettled(this.#hostLoad.map(safeAsyncCall));
    }
    this.P.resolve(this.#exports);
  }
  /** @private */
  triggerLoaded() {
    if (this.loadedCalled) {
      return;
    }
    if (this.hostLoaded) {
      safeCall(this.hostLoaded, this);
    }
    this.#hostLoaded.forEach(safeCall);
    this.loadedCalled = true;
  }
  /** @private */
  triggerUpdate(changes) {
    if (this.hostUpdate) {
      safeCall(this.hostUpdate, this, changes);
    }
    this.#hostUpdate.forEach(callUpdate, changes);
  }
  /** @private */
  triggerUpdated(changes) {
    if (this.hostUpdated) {
      safeCall(this.hostUpdated, this, changes);
    }
    this.#hostUpdated.forEach(callUpdate, changes);
  }
  /** @private */
  triggerDestroy() {
    if (this.hostDestroy) {
      safeCall(this.hostDestroy, this);
    }
    this.#hostDestroy.forEach(safeCall);
  }
  /** @private */
  triggerLifecycle() {
    if (this.hostLifecycle) {
      this.#callLifecycle(() => this.hostLifecycle());
    }
    this.#hostLifecycle.forEach(this.#callLifecycle, this);
  }
  #callLifecycle(callback) {
    setAmbientComponent(this.#component);
    const cleanupRaw = safeCall(callback);
    const cleanup = Array.isArray(cleanupRaw) ? cleanupRaw : [cleanupRaw];
    cleanup.forEach((cleanup2) => {
      if (typeof cleanup2 === "function") {
        this.#lifecycleCleanups.push(cleanup2);
      } else if (typeof cleanup2 === "object" && typeof cleanup2.remove === "function") {
        this.#lifecycleCleanups.push(cleanup2.remove);
      }
    });
  }
}
function callUpdate(callback) {
  safeCall(callback, void 0, this);
}
const GenericController = Controller;
const makeProvisionalValue = (base) => {
  if (typeof base !== "object" && typeof base !== "function" || base === null) {
    return base;
  }
  const proxyDefinition = {
    get(target, prop, receiver) {
      if ((prop === "exports" || prop === "_exports") && prop in target && target[prop] === proxy2) {
        return void 0;
      }
      if (prop in target || prop in Promise.prototype || typeof prop === "symbol") {
        return typeof target === "function" ? target[prop] : Reflect.get(target, prop, receiver);
      }
      return void 0;
    }
  };
  const proxy2 = new Proxy(base, proxyDefinition);
  return proxy2;
};
const propertyFlagAttribute = 1 << 0;
const propertyFlagReflect = 1 << 1;
const propertyFlagBoolean = 1 << 2;
const propertyFlagNumber = 1 << 3;
const propertyFlagState = 1 << 4;
const propertyFlagReadOnly = 1 << 5;
const propertyFlagNoAccessor = 1 << 6;
const attachToAncestor = (child) => {
  let ancestor = child;
  while (ancestor = ancestor.parentNode ?? ancestor.host) {
    if (ancestor?.constructor?.lumina) {
      const litParent = ancestor;
      if (!litParent.manager?.loadedCalled) {
        (litParent.J ?? litParent["_offspring"]).push(child);
      }
      return (litParent.I ?? litParent["_postLoad"]).promise;
    }
  }
  return false;
};
const noShadowRoot = {};
function emptyFunction() {
}
const defineProperty = Object.defineProperty;
const HtmlElement = globalThis.HTMLElement ?? emptyFunction;
const _ProxyComponent = class _ProxyComponent extends HtmlElement {
  constructor() {
    var _a2;
    super();
    __privateAdd(this, _ProxyComponent_instances);
    __privateAdd(this, _litElement);
    __privateAdd(this, _store);
    __privateAdd(this, _pendingAttributes);
    __privateSet(this, _store, {});
    __privateSet(this, _pendingAttributes, []);
    this.I = new Deferred();
    this.H = new Deferred();
    this.J = [];
    const that = this;
    const ProxyClass = that.constructor;
    that["_offspring"] = that.J;
    that["_postLoad"] = that.I;
    ProxyClass.C?.forEach((propName) => {
      if (Object.hasOwn(that, propName)) {
        __privateGet(that, _store)[propName] = that[propName];
        delete that[propName];
      }
    });
    if (ProxyClass.A) {
      __privateMethod(_a2 = that, _ProxyComponent_instances, initializeComponent_fn).call(_a2, { a: ProxyClass.A });
    } else {
      void ProxyClass.B.then(async (module) => {
        var _a3;
        await ProxyClass.K.p;
        __privateMethod(_a3 = that, _ProxyComponent_instances, initializeComponent_fn).call(
          _a3,
          /**
           * "$$" is our top-level await polyfill due to broken top-level await
           * support in Safari. Only applies in CDN build.
           * See https://devtopia.esri.com/WebGIS/arcgis-web-components/issues/3933
           * and https://bugs.webkit.org/show_bug.cgi?id=242740
           */
          await (module.default?.then(
            (module2) => typeof module2 === "function" ? { a: module2 } : module2
          ) ?? module)
        );
      }).catch((error) => {
        that.H.reject(error);
        setTimeout(() => {
          throw error;
        });
      });
    }
  }
  static F() {
    for (const propName of this.C ?? []) {
      defineProperty(this.prototype, propName, {
        configurable: true,
        enumerable: true,
        get() {
          return __privateGet(this, _store)[propName];
        },
        set(value) {
          __privateGet(this, _store)[propName] = value;
        }
      });
    }
    for (const methodName of this.E ?? []) {
      defineProperty(this.prototype, methodName, {
        async value(...args) {
          if (!__privateGet(this, _litElement)) {
            await this.H.promise;
          }
          const genericLitElement = __privateGet(this, _litElement);
          return await genericLitElement[methodName](...args);
        },
        configurable: true
      });
    }
    for (const methodName of this.D ?? []) {
      defineProperty(this.prototype, methodName, {
        value(...args) {
          const genericLitElement = __privateGet(this, _litElement);
          return genericLitElement[methodName](...args);
        },
        configurable: true
      });
    }
  }
  get manager() {
    return __privateGet(this, _litElement)?.manager;
  }
  /*
   * This method must be statically present rather than added later, or else,
   * browsers won't call it. Same for connected and disconnected callbacks.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    __privateGet(this, _litElement)?.attributeChangedCallback(name, oldValue, newValue);
    if (!__privateGet(this, _litElement)) {
      __privateGet(this, _pendingAttributes).push(name);
    }
  }
  connectedCallback() {
    if (__privateGet(this, _litElement)) {
      __privateGet(this, _litElement).connectedCallback?.();
    } else {
      queueMicrotask(() => this.G = attachToAncestor(this));
    }
  }
  disconnectedCallback() {
    __privateGet(this, _litElement)?.disconnectedCallback?.();
  }
  /**
   * Creates a promise that resolves once the component is fully loaded
   */
  async componentOnReady() {
    await this.H.promise;
    return this;
  }
  /**
   * Implemented on the proxy for compatibility with Lit Context.
   */
  addController() {
  }
  /**
   * Implemented on the proxy for compatibility with Lit Context.
   */
  requestUpdate() {
    __privateGet(this, _litElement)?.requestUpdate();
  }
};
_litElement = new WeakMap();
_store = new WeakMap();
_pendingAttributes = new WeakMap();
_ProxyComponent_instances = new WeakSet();
initializeComponent_fn = function(module) {
  const ProxyClass = this.constructor;
  const tagName = ProxyClass.L;
  const store = __privateGet(this, _store);
  const LitConstructor = Object.values(module).find(
    (LitConstructor2) => LitConstructor2.L === tagName
  );
  const lazyTagName = `${tagName}--lazy`;
  let parentClass = LitConstructor;
  while (parentClass && !Object.hasOwn(parentClass, "lumina")) {
    parentClass = Object.getPrototypeOf(parentClass);
  }
  patchLitElement(parentClass);
  const isFirstInitialization = !ProxyClass.A;
  if (isFirstInitialization) {
    ProxyClass.A = LitConstructor;
    customElements.define(lazyTagName, LitConstructor);
  }
  LitConstructor.N = this;
  const litElement = document.createElement(lazyTagName);
  LitConstructor.N = void 0;
  __privateSet(this, _litElement, litElement);
  __privateSet(this, _store, litElement);
  __privateGet(this, _pendingAttributes).forEach(
    (name) => litElement.attributeChangedCallback(
      name,
      // Lit doesn't look at this value, thus even if attribute already exists, that's ok
      null,
      this.getAttribute(name)
    )
  );
  Object.entries(store).forEach(syncLitElement, litElement);
  const isStillConnected = this.isConnected;
  if (isStillConnected || this.G) {
    litElement.connectedCallback?.();
    if (!isStillConnected) {
      litElement.disconnectedCallback();
    }
  }
};
_ProxyComponent.lumina = true;
let ProxyComponent = _ProxyComponent;
function syncLitElement([key, value]) {
  this[key] = value;
}
const patchLitElement = (parentClass) => {
  const litElementPrototype = parentClass.prototype;
  const elementPrototype = Element.prototype;
  const alreadyPatched = Object.hasOwn(litElementPrototype, "isConnected");
  if (!alreadyPatched) {
    litElementPrototype.setAttribute = function(qualifiedName, value) {
      elementPrototype.setAttribute.call(this.el, qualifiedName, value);
    };
    litElementPrototype.removeAttribute = function(qualifiedName) {
      elementPrototype.removeAttribute.call(this.el, qualifiedName);
    };
    defineProperty(litElementPrototype, "isConnected", {
      get() {
        return Reflect.get(elementPrototype, "isConnected", this.el);
      }
    });
  }
};
class ControllerManager extends GenericController {
  constructor(component) {
    super(component);
    this.destroyed = false;
    this.R = false;
    this.V = A;
    this.T = [];
    this.#exportsStore = /* @__PURE__ */ new WeakMap();
    this.#component = component;
    this.exports = void 0;
    this.hasDestroy = autoDestroyDisabledPropName in component && typeof component.destroy === "function";
    i.prototype.addController.call(component, {
      // Lit will call these callbacks
      // We do not directly implement hostConnected and etc on ControllerManager
      // because ControllerManager is also included in the list of controllers
      // we manage - and for each controller we manage we call hostConnected
      // (from inside of .triggerConnected). So there would be an infinite
      // loop if Lit calls hostConnected which in turn calls
      // triggerConnected which calls hostConnected again.
      hostConnected: () => {
        if (this.destroyed) {
          const tagName = component.el.localName;
          component.el.remove();
          throw new Error(
            `The ${tagName} component has already been destroyed. It cannot be used again. If you meant to disconnect and reconnect a component without automatic destroy, set the ${autoDestroyDisabledPropName} prop.`
          );
        }
        if (this.#autoDestroyTimeout !== void 0) {
          clearTimeout(this.#autoDestroyTimeout);
        }
        propertyTrackResolve();
        for (const controller of component.M) {
          if ("triggerConnected" in controller) {
            controller.triggerConnected();
          } else {
            safeCall(controller.hostConnected, controller);
          }
        }
      },
      hostDisconnected: () => {
        for (const controller of component.M) {
          if ("triggerDisconnected" in controller) {
            controller.triggerDisconnected();
          } else {
            safeCall(controller.hostDisconnected, controller);
          }
        }
        if (this.hasDestroy && !this.destroyed) {
          this.U();
        }
      },
      hostUpdate: () => {
        for (const controller of component.M) {
          if ("triggerUpdate" in controller) {
            controller.triggerUpdate(this.Q);
          } else {
            safeCall(controller.hostUpdate, controller, this.Q);
          }
        }
      },
      hostUpdated: () => {
        for (const controller of component.M) {
          if ("triggerUpdated" in controller) {
            controller.triggerUpdated(this.Q);
          } else {
            safeCall(controller.hostUpdated, controller, this.Q);
          }
        }
        this.Q = void 0;
      }
    });
    queueMicrotask(() => this.R = true);
    setAmbientComponent(component);
  }
  #autoDestroyTimeout;
  #component;
  // Keep this method async needlessly for now to avoid a breaking change if we
  // would need to make it async in the future
  // eslint-disable-next-line @typescript-eslint/require-await
  async destroy() {
    if (this.destroyed) {
      return;
    }
    if (this.#component.el.isConnected) {
      this.hasDestroy = false;
      this.#component.el.remove();
    }
    this.#autoDestroyTimeout = void 0;
    this.destroyed = true;
    for (const controller of this.#component.M) {
      if ("triggerDestroy" in controller) {
        controller.triggerDestroy();
      } else {
        safeCall(controller.hostDestroy, controller);
      }
    }
    this.#component.M.splice(0);
  }
  /** @private */
  U() {
    if (this.#autoDestroyTimeout !== void 0) {
      clearTimeout(this.#autoDestroyTimeout);
    }
    if (!this.#component.el.isConnected && !this.#component.autoDestroyDisabled) {
      const destroy = () => void this.#component.destroy();
      {
        this.#autoDestroyTimeout = devToolsAwareTimeout(destroy, autoDestroyOnDisconnectTimeout);
      }
    }
  }
  /** @private */
  S(key, value) {
    const trackers = this.T;
    this.V = A;
    this.T = [];
    trackers.forEach((tracker) => tracker(key, value));
  }
  #exportsStore;
  /**
   * Associate an exports object with a controller for reverse lookup in
   * controller.use
   *
   * @private
   */
  W(controller, exports$1) {
    if (typeof exports$1 === "object" && exports$1 !== null || typeof exports$1 === "function") {
      this.#exportsStore.set(exports$1, controller);
    }
  }
  /** @private */
  X(exports$1) {
    if (typeof exports$1 === "object" && exports$1 !== null || typeof exports$1 === "function") {
      return this.#exportsStore.get(exports$1);
    } else {
      return void 0;
    }
  }
}
let autoDestroyOnDisconnectTimeout = 1e3;
const autoDestroyDisabledPropName = "autoDestroyDisabled";
const _LitElement = class _LitElement extends i {
  constructor() {
    super();
    __privateAdd(this, _LitElement_instances);
    /**
     * The JS API's Accessor observables. This is used to integrate with the JS
     * API's reactivity system.
     *
     * @private
     */
    __privateAdd(this, _observables);
    __privateAdd(this, _originalShouldUpdate);
    __privateAdd(this, _enableUpdating);
    __privateAdd(this, _postLoadedDeferred);
    __privateAdd(this, _trackingTarget);
    this.M = [];
    this.manager = new ControllerManager(this);
    const that = this;
    const constructor = that.constructor;
    const lazy = constructor.N;
    const createObservable = constructor.K.o;
    const ourShouldUpdate = _LitElement.prototype.shouldUpdate;
    __privateSet(that, _postLoadedDeferred, lazy?.H ?? new Deferred());
    that.I = lazy?.I ?? new Deferred();
    that.J = lazy?.J ?? [];
    that["_offspring"] = that.J;
    that["_postLoad"] = that.I;
    that.el = lazy ?? that;
    __privateSet(that, _enableUpdating, that.enableUpdating);
    that.enableUpdating = emptyFunction;
    if (that.shouldUpdate !== ourShouldUpdate) {
      __privateSet(that, _originalShouldUpdate, that.shouldUpdate);
      that.shouldUpdate = ourShouldUpdate;
    }
    if (createObservable) {
      __privateSet(that, _observables, /* @__PURE__ */ new Map());
      constructor.elementProperties.forEach((_, name) => __privateGet(that, _observables).set(name, createObservable()));
    }
    {
      that.el.setAttribute(constructor.K.hydratedAttribute, "");
    }
  }
  /**
   * Customize Lit's default style handling to support non-shadow-root styles
   */
  static finalizeStyles(styles) {
    const finalizedStyles = super.finalizeStyles(styles);
    const useLightDom = this.shadowRootOptions === noShadowRoot;
    return this.K?.commonStyles === void 0 || useLightDom ? finalizedStyles : [this.K.commonStyles, ...finalizedStyles];
  }
  static createProperty(name, options) {
    const flags = typeof options === "number" ? options : Array.isArray(options) ? options[0] : 0;
    const rest = Array.isArray(options) ? options[1] : void 0;
    const hasChanged = rest?.hasChanged ?? m;
    const normalizedOptions = {
      /**
       * By default to infer attribute name from property name, Lit just
       * converts property name to lowercase. That is consistent with
       * native DOM attributes.
       *
       * However, that is not consistent with Stencil and would be a
       * breaking change for us. Also, kebab-case is more common among the
       * web components. But the most important reason is that we have
       * some pretty long attribute names, which would be utterly
       * unreadable in lowercase.
       *
       * Also, if browsers add new attributes, that may cause a conflict
       * with our attributes.
       *
       * Thus, overwriting Lit's default behavior to use kebab-case:
       */
      attribute: !!(flags & propertyFlagAttribute) && typeof name === "string" ? camelToKebab(name) : false,
      reflect: !!(flags & propertyFlagReflect),
      type: flags & propertyFlagBoolean ? Boolean : flags & propertyFlagNumber ? Number : void 0,
      /**
       * At the moment in Lit, state:true just means attribute:false, so this
       * line is technically redundant, but let's keep it here just in case Lit
       * will add more meaning to state:true in the future.
       */
      state: !!(flags & propertyFlagState),
      // Controllers add this option to Lit
      readOnly: !!(flags & propertyFlagReadOnly),
      noAccessor: !!(flags & propertyFlagNoAccessor),
      c: false,
      ...rest,
      hasChanged(newValue, oldValue) {
        const changed = hasChanged(newValue, oldValue);
        normalizedOptions.c = changed;
        return changed;
      }
    };
    super.createProperty(name, normalizedOptions);
  }
  static getPropertyDescriptor(name, key, options) {
    const runtime = this.K;
    const accessor = super.getPropertyDescriptor(name, key, options);
    options.d = accessor;
    return {
      ...accessor,
      get() {
        runtime.t?.(__privateGet(this, _observables).get(name));
        return accessor.get?.call(this);
      },
      set(rawNewValue) {
        const manager = this.manager;
        if (options.readOnly && !shouldBypassReadOnly && (manager.R || manager.connectedCalled)) {
          throw Error(
            `Cannot assign to read-only property "${name}" of ${this.el.localName}. Trying to assign "${rawNewValue}"`
          );
        }
        accessor.set.call(this, rawNewValue ?? void 0);
        if (options.c) {
          __privateGet(this, _observables)?.get(name)?.notify();
        }
        if (manager.T.length > 0) {
          propertyTrackResolve();
          manager?.S(name, rawNewValue);
        }
      }
    };
  }
  connectedCallback() {
    if (this.el.hasAttribute("defer-hydration")) {
      return;
    }
    const trackingTarget = this.constructor.K.c?.(() => this.requestUpdate());
    __privateSet(this, _trackingTarget, trackingTarget);
    const isFirstCall = !this.manager.connectedCalled;
    super.connectedCallback();
    if (isFirstCall) {
      queueMicrotask(
        // eslint-disable-next-line @typescript-eslint/promise-function-async, @typescript-eslint/no-misused-promises
        () => __privateMethod(this, _LitElement_instances, load_fn).call(this).catch((error) => {
          __privateGet(this, _postLoadedDeferred).reject(error);
          setTimeout(() => {
            throw error;
          });
        })
      );
    } else if (trackingTarget) {
      this.requestUpdate();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    __privateGet(this, _trackingTarget)?.destroy();
    __privateSet(this, _trackingTarget, void 0);
  }
  /**
   * Overwrite Lit's default behavior of attaching shadow root to the lit
   * element, and instead use this.el to support lazy builds.
   *
   * Also, support the case when component asked to not use shadow root
   */
  createRenderRoot() {
    const existingShadowRoot = this.el.shadowRoot;
    const Class = this.constructor;
    const options = Class.shadowRootOptions;
    const useLightDom = options === noShadowRoot;
    const renderRoot = existingShadowRoot ?? (useLightDom ? this.el : this.el.attachShadow(options));
    if (this.isConnected) {
      const domRoot = renderRoot.getRootNode();
      domRoot.adoptedStyleSheets = [
        ...domRoot.adoptedStyleSheets,
        ...Class.elementStyles.map((stylesheet) => "styleSheet" in stylesheet ? stylesheet.styleSheet : stylesheet)
      ];
    }
    return renderRoot;
  }
  /**
   * Overwriting default shouldUpdate simply to get access to
   * "changedProperties" so that we can later provide it to ControllerManager
   */
  shouldUpdate(_changedProperties) {
    var _a2;
    this.manager.Q = _changedProperties;
    return ((_a2 = __privateGet(this, _originalShouldUpdate)) == null ? void 0 : _a2.call(this, _changedProperties)) ?? true;
  }
  update(changedProperties) {
    if (__privateGet(this, _trackingTarget)) {
      __privateMethod(this, _LitElement_instances, doTrackedUpdate_fn).call(this, changedProperties);
    } else {
      super.update(changedProperties);
    }
  }
  listen(name, listener, options) {
    const boundListener = listener?.bind(this) ?? listener;
    this.manager.onLifecycle(() => {
      this.el.addEventListener(name, boundListener, options);
      return () => this.el.removeEventListener(name, boundListener, options);
    });
  }
  listenOn(target, name, listener, options) {
    const boundListener = listener?.bind(this) ?? listener;
    this.manager.onLifecycle(() => {
      target.addEventListener(name, boundListener, options);
      return () => target.removeEventListener(name, boundListener, options);
    });
  }
  /**
   * Creates a promise that resolves once the component is fully loaded.
   *
   * @example
   * const map = document.createElement('arcgis-map');
   * document.body.append(map);
   * map.componentOnReady().then(() => {
   *   console.log('Map is ready to go!');
   * });
   */
  async componentOnReady() {
    await __privateGet(this, _postLoadedDeferred).promise;
    return this;
  }
  /**
   * Adds a controller to the host, which connects the controller's lifecycle
   * methods to the host's lifecycle.
   *
   * @remarks
   * Even though Lit's LitElement already has addController,
   * we overwrite it with a compatible version to have more control over
   * timing, and to add support for load/loaded lifecycle hooks.
   */
  addController(controller) {
    this.M.push(controller);
    if (!(controllerSymbol in controller) && this.renderRoot && this.el.isConnected) {
      controller.hostConnected?.();
    }
  }
  /**
   * Removes a controller from the host.
   */
  removeController(controller) {
    this.M.splice(this.M.indexOf(controller), 1);
    controller.controllerRemoved?.();
  }
};
_observables = new WeakMap();
_originalShouldUpdate = new WeakMap();
_enableUpdating = new WeakMap();
_postLoadedDeferred = new WeakMap();
_trackingTarget = new WeakMap();
_LitElement_instances = new WeakSet();
doTrackedUpdate_fn = function(changedProperties) {
  try {
    __privateGet(this, _trackingTarget).clear();
    this.constructor.K.r(
      __privateGet(this, _trackingTarget),
      () => __superGet(_LitElement.prototype, this, "update").call(this, changedProperties)
    );
  } catch (error) {
    __privateGet(this, _trackingTarget).clear();
    throw error;
  }
};
load_fn = async function() {
  const parentLoadPromise = this.el.G ?? attachToAncestor(this.el);
  if (parentLoadPromise) {
    await parentLoadPromise;
  }
  const promises = [];
  for (const controller of this.M) {
    if ("triggerLoad" in controller) {
      promises.push(controller.triggerLoad());
    } else {
      promises.push(safeAsyncCall(controller.hostLoad, controller));
    }
  }
  await Promise.all(promises);
  await this.load?.();
  if (this.manager.hasDestroy) {
    this.manager.onUpdate(
      (changes) => changes.has(autoDestroyDisabledPropName) && this.manager.U()
    );
  }
  __privateGet(this, _enableUpdating).call(this, true);
  this.performUpdate();
  this.I.resolve();
  await Promise.resolve();
  const pendingChildren = this.J.filter((loaded) => !loaded.manager?.loadedCalled);
  if (pendingChildren.length) {
    await Promise.allSettled(pendingChildren.map(async (child) => await child.componentOnReady()));
  }
  this.J.length = 0;
  this.el.setAttribute(this.constructor.K.hydratedAttribute, "");
  for (const controller of this.M) {
    if ("triggerLoaded" in controller) {
      controller.triggerLoaded();
    } else {
      safeCall(controller.hostLoaded, controller);
    }
  }
  this.loaded?.();
  __privateGet(this, _postLoadedDeferred).resolve();
};
_LitElement.lumina = true;
let LitElement = _LitElement;
const makeRuntime = (options) => {
  let assetPath;
  const setAssetPath = (path) => {
    assetPath = new URL(
      path,
      /**
       * setAssetPath() is called in global scope whenever Lumina runtime is
       * imported. Thus we need to carefully handle different environments.
       *
       * Need `|| undefined` because Stencil's unit tests mock-dock defines
       * `location.href` as empty string, which crashes `new URL()`. Stencil's
       * test environment does not define `NODE_ENV` by default, so we have to
       * add a few bytes to production.
       *
       * For happy-dom and jsdom, we are assuming that `NODE_ENV` is set.
       * Depending on configuration, `location?.href` is either undefined (not
       * an exception) or `about:blank` (an exception - thus handling that case
       * explicitly).
       *
       * For Node.js without a DOM environment, `location?.href` is undefined so
       * all is good.
       */
      globalThis.location?.href || void 0
    ).href;
  };
  const runtime = {
    ...options,
    // FEATURE: research https://vitejs.dev/guide/build.html#advanced-base-options
    getAssetPath(suffix) {
      const assetUrl = new URL(suffix, assetPath);
      return assetUrl.origin !== globalThis.location?.origin ? assetUrl.href : assetUrl.pathname;
    },
    setAssetPath,
    customElement(tagName, component) {
      component.K = runtime;
      component.L = tagName;
      if (!customElements.get(tagName)) {
        customElements.define(tagName, component);
      }
    }
  };
  setAssetPath(options.defaultAssetPath);
  return runtime;
};
const safeClassMap = (parameters) => typeof parameters === "object" && parameters != null ? e(parameters) : parameters;
const safeStyleMap = (parameters) => typeof parameters === "object" && parameters != null ? o(parameters) : parameters;
const nothing = A;
function setAttribute(element, attributeName, value) {
  if (value == null) {
    element.removeAttribute(attributeName);
  } else {
    element.setAttribute(attributeName, value);
  }
}
const stringOrBoolean = {
  toAttribute: (value) => value === true ? "" : value === false ? null : value
};
const proxyExports = (Class) => (...args) => {
  const ambientControllers2 = retrieveParentControllers();
  const instance = new Class(...args);
  const initialExports = instance.exports;
  setParentController(ambientControllers2.at(-1));
  const manager = instance.component.manager;
  manager.W(instance, initialExports);
  instance.watchExports(manager.W.bind(manager, instance));
  setAmbientChildController(instance);
  const hostCandidates = [instance.component, ...ambientControllers2].reverse();
  return trackKey(
    hostCandidates,
    (resolution) => resolution === void 0 ? void 0 : setProxy(instance, resolution, initialExports),
    initialExports
  );
};
const setProxy = (controller, { host, key, isReactive: assignedToProp }, initialExports) => {
  const genericHost = host;
  const controllerValueChanged = genericHost[key] !== controller.exports;
  const hostValueChanged = genericHost[key] !== initialExports;
  const controllerUpdatedExports = initialExports !== controller.exports;
  if (controllerValueChanged && !hostValueChanged && controllerUpdatedExports) {
    genericHost[key] = controller.exports;
  }
  const isProxyExportsOnComponent = host === controller.component;
  if (isProxyExportsOnComponent) {
    if (assignedToProp) {
      const manager = controller.component.manager;
      if (hostValueChanged) {
        manager.W(controller, genericHost[key]);
      }
      controller.onUpdate((changes) => {
        if (changes.has(key)) {
          const value = genericHost[key];
          if (value !== controller.exports) {
            manager.W(controller, value);
          }
        }
      });
    }
    controller.O = assignedToProp ? void 0 : key;
  }
  const isReadOnly = controller.component.constructor.elementProperties.get(key)?.readOnly;
  controller.watchExports(() => {
    if (genericHost[key] === controller.exports) {
      return;
    }
    if (isReadOnly) {
      bypassReadOnly(() => {
        genericHost[key] = controller.exports;
      });
    } else {
      genericHost[key] = controller.exports;
    }
  });
};
const reEmitEvent = (getEventedAccessor, eventName2) => {
  const component = retrieveComponent();
  const manager = component.manager;
  manager.onLoaded(() => manager.onLifecycle(() => a$1(getEventedAccessor, eventName2, emitter.emit)));
  const emitter = createEventFactory();
  return emitter;
};
const makeAccessorController = (createInstance, _options) => (component) => proxy$1(component, createInstance);
class AccessorController extends GenericController {
  constructor(component, createInstance) {
    super(component);
    this.Y = /* @__PURE__ */ new Map();
    this.A = void 0;
    this.#exportsObservable = s();
    const that = this;
    that.#createInstance = createInstance;
    that.Z();
    that.setProvisionalExports(
      makeBinderProxy(
        component,
        new WeakRef(that),
        component.M.length - 1,
        that.instance,
        that.Y
      ),
      false
    );
    trackPropKey(
      component,
      (resolved) => {
        if (resolved) {
          const handle = l$1(
            // If the property to which controller is assigned is public, the user may
            // manually create an accessor instance and assign it to this property
            // We pick it up and replace our created accessor instance with user's.
            () => component[resolved],
            (newInstance) => {
              if (newInstance === that.instance) {
                return;
              }
              const oldInstance = that.instance;
              that.exports = newInstance;
              that.instance = newInstance;
              that.Y.forEach(
                (propName, propertyName) => component.requestUpdate(propName, oldInstance[propertyName])
              );
              if (that.#isInstanceOwner) {
                oldInstance.destroy();
              }
              that.#isInstanceOwner = false;
            },
            { sync: true }
          );
          that.onDestroy(handle.remove);
        }
      },
      that.exports
    );
  }
  #isInstanceOwner;
  #exportsObservable;
  #createInstance;
  get exports() {
    a(this.#exportsObservable);
    return super.exports;
  }
  set exports(value) {
    super.exports = value;
    this.#exportsObservable.notify();
  }
  /** @private */
  Z() {
    const that = this;
    that.instance = "prototype" in that.#createInstance && "declaredClass" in that.#createInstance.prototype ? new that.#createInstance() : that.#createInstance();
    that.#isInstanceOwner = true;
  }
  hostConnected() {
    this.exports = this.instance;
  }
  // FEATURE: is there a way to detect that accessor does not need to be destroyed?
  //   Is it possible to write accessors that don't need to be destroyed?
  hostDestroy() {
    if (this.#isInstanceOwner) {
      this.instance.destroy?.();
    }
  }
}
const proxy$1 = proxyExports(AccessorController);
const makeBinderProxy = (component, accessorControllerRef, accessorControllerIndex, instance, boundProperties) => new Proxy(instance, {
  get: (target, propertyName) => {
    const value = target[propertyName];
    if (
      // Possibly called by the JS engine
      typeof propertyName === "symbol" || // Already bound?
      boundProperties.has(propertyName)
    ) {
      return value;
    }
    const accessorController = component.M[accessorControllerIndex];
    accessorController.A = propertyName;
    return trackKey(
      component,
      (resolved) => {
        accessorController.A = void 0;
        if (resolved !== void 0) {
          const propName = resolved.key;
          boundProperties.set(propertyName, propName);
          const descriptor = component.constructor.getPropertyOptions(
            propName
          );
          const shouldFlipBoolean = propertyName !== propName && propName.toLowerCase().includes("disable");
          watchBoundProperty(accessorControllerRef, descriptor, propertyName, propName, shouldFlipBoolean);
          if (descriptor.i === void 0) {
            bindPropToProperty(descriptor, accessorControllerIndex, propertyName, shouldFlipBoolean);
          }
        }
      },
      value
    );
  }
});
const watchBoundProperty = (controllerRef, descriptor, propertyName, propName, shouldFlipBoolean, _handle) => _handle = l$1(
  () => {
    const controller = controllerRef.deref();
    return controller === void 0 || controller.component.manager.destroyed ? _handle = _handle.remove() : controller.exports[propertyName];
  },
  (_, oldValue) => {
    if (!_handle) {
      return;
    }
    const component = controllerRef.deref().component;
    component?.requestUpdate(propName, shouldFlipBoolean ? !oldValue : oldValue);
    descriptor.c = false;
  },
  // At present, since useAccessor initializes the Accessor instance without
  // any properties, it assumes that there is no need to do initial sync of
  // accessor properties to the component, especially since the component
  // setter always gets the newest value from the Accessor instance anyway.
  // We might wish to change that if view model is shared between multiple
  // components and has default value for some property. Even then, this issue
  // will only manifest itself in default value not being reflected to
  // attribute (). If fixing above becomes important, can do so by adding
  // `initial: true` here and updating the above code to only call .notify()
  // if hasChanged returns true (see reference implementation in
  // _handleInstanceChanged). Not doing so yet as it is an edge case that is
  // easy to work around and proper fix will add overhead to the startup of
  // each component.
  { sync: true }
);
const bindPropToProperty = (descriptor, accessorControllerIndex, propertyName, shouldFlipBoolean) => {
  descriptor.d.get = function() {
    const value = this.M[accessorControllerIndex]?.exports[propertyName];
    return shouldFlipBoolean ? !value : value;
  };
  descriptor.d.set = function(newValue) {
    const accessorController = this.M[accessorControllerIndex];
    if (accessorController.A !== propertyName) {
      accessorController.exports[propertyName] = shouldFlipBoolean ? !newValue : newValue;
    }
  };
};
const reCreateAccessor = (instance, component) => {
  const accessorController = component.manager.useRefSync(instance);
  accessorController?.hostDestroy();
  accessorController?.Z();
  accessorController?.hostConnected();
};
const makeController = (constructor) => proxy(void 0, constructor);
const makeGenericController = (constructor) => (component) => proxy(
  component,
  /**
   * GenericController is identical to Controller, in all except for typing.
   * So doing a type-cast here so as not to needlessly add one more object
   * to the prototype chain
   */
  constructor
);
class FunctionalController extends Controller {
  constructor(component, constructor) {
    super(component);
    const originalExports = this.exports;
    try {
      setAmbientComponent(this.component);
      const value = constructor(this.component, this);
      const constructorChangedExports = this.exports !== originalExports;
      if (isPromise(value)) {
        if (!constructorChangedExports) {
          this.setProvisionalExports(value);
        }
        const resolved = value.then((result) => {
          this.exports = result;
          super.catchUpLifecycle();
        }).catch((error) => {
          this.P.reject(error);
        });
        this.onLoad(async () => await resolved);
      } else {
        if (!constructorChangedExports || value !== void 0) {
          this.exports = value;
        }
        queueMicrotask(() => super.catchUpLifecycle());
      }
    } catch (error) {
      this.P.reject(error);
    }
  }
  /** Noop - will be called in the constructor instead */
  catchUpLifecycle() {
    return;
  }
}
const proxy = proxyExports(FunctionalController);
const useWatchAttributes = (attributes, callback) => new AttributeWatchController(attributes, callback);
class AttributeWatchController extends Controller {
  #observer;
  #attributes;
  #callback;
  constructor(attributes, callback) {
    super();
    {
      return;
    }
  }
  hostConnected() {
    this.#attributes.forEach((attribute) => {
      if (this.component.el.hasAttribute(attribute)) {
        this.#callback.call(this.component, this.component.el.getAttribute(attribute), null, attribute);
      }
    });
    this.#observer.observe(this.component.el, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: this.#attributes
    });
  }
  hostDisconnected() {
    this.#observer.disconnect();
  }
}
const defaultDirection = "ltr";
const useDirection = () => makeController((component, controller) => {
  controller.exports = defaultDirection;
  controller.onLifecycle(() => {
    const callback = () => {
      const dir = getElementAttribute(component.el, "dir", defaultDirection);
      controller.exports = dir === "rtl" ? "rtl" : "ltr";
    };
    callback();
    return observeAncestorsMutation(component.el, ["dir"], callback);
  });
  return void 0;
});
const makeT9nController = (getAssetPath) => (options = {}) => (
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  makeController((component, controller) => {
    const locale = getElementLocale(component.el);
    const pending = { ["_lang"]: locale.lang, ["_t9nLocale"]: locale.t9nLocale, ["_loading"]: true };
    const componentWithOverrides = component;
    controller.onLifecycle(
      () => startLocaleObserver(
        component.el,
        () => getAssetPath("./assets"),
        ({ t9nLocale, t9nStrings, lang }) => {
          const withoutOverrides = {
            ...t9nStrings,
            ["_lang"]: lang,
            ["_t9nLocale"]: t9nLocale,
            ["_loading"]: false
          };
          controller.exports = withoutOverrides;
          const label = t9nStrings.componentLabel;
          if (typeof label === "string" && "label" in component && component.label == null) {
            component.label ??= label;
          }
          applyOverrides(componentWithOverrides.messageOverrides);
        },
        options.name
      )
    );
    const applyOverrides = (messageOverrides) => {
      const currentValue = controller.exports;
      const rawMessages = currentValue["_original"] ?? currentValue;
      const updated = deepMerge(rawMessages, messageOverrides);
      if (messageOverrides) {
        updated["_original"] = rawMessages;
      }
      controller.exports = updated;
    };
    if ("messageOverrides" in componentWithOverrides) {
      controller.onUpdate((changes) => {
        if (changes.has("messageOverrides")) {
          applyOverrides(componentWithOverrides.messageOverrides);
        }
      });
    }
    if (options.blocking) {
      controller.setProvisionalExports(pending, false);
      return controller.ready;
    } else {
      return pending;
    }
  })
);
const deepMerge = (original, overwrites) => {
  if (!overwrites) {
    return original;
  }
  const merged = { ...original };
  Object.entries(overwrites).forEach(([key, value]) => {
    if (original[key] !== void 0) {
      if (typeof value === "object") {
        merged[key] = deepMerge(original[key], value);
      } else {
        merged[key] = value ?? original[key];
      }
    }
  });
  return merged;
};
const usePropertyChange = (_component) => propertyChangeController;
const eventName = "arcgisPropertyChange";
const propertyChangeController = (...toWatch) => {
  const component = retrieveComponent();
  const eventEmitter = createEventFactory(eventName, void 0, component);
  let isFirst = true;
  component.manager.onUpdated((changes) => {
    if (isFirst || !component.el.isConnected) {
      isFirst = false;
      return;
    }
    for (const name of toWatch) {
      if (changes.has(name)) {
        eventEmitter.emit({ name });
      }
    }
  });
  return eventEmitter;
};
export {
  GenericController as G,
  LitElement as L,
  makeGenericController as a,
  reCreateAccessor as b,
  createEvent as c,
  makeAccessorController as d,
  makeT9nController as e,
  usePropertyChange as f,
  setAttribute as g,
  safeStyleMap as h,
  useWatchAttributes as i,
  stringOrBoolean as j,
  makeController as k,
  makeRuntime as m,
  nothing as n,
  proxyExports as p,
  reEmitEvent as r,
  safeClassMap as s,
  useDirection as u
};
