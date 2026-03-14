import { m as makeRuntime, e as makeT9nController, L as LitElement, g as setAttribute, s as safeClassMap, h as safeStyleMap, a as makeGenericController, i as useWatchAttributes, j as stringOrBoolean, n as nothing, k as makeController, c as createEvent } from "./arcgis__lumina.mjs";
import { T, A, b, e, i as i$1, n, u, c as i$2, l } from "./lit-html.mjs";
import { i, o } from "./lit__reactive-element.mjs";
import { c as createFocusTrap } from "./focus-trap.mjs";
import { S as Sortable } from "./sortablejs.mjs";
import { h as defaultLocale } from "./arcgis__toolkit.mjs";
import { d as debounce } from "./es-toolkit.mjs";
import { c as computePosition, f as flip, o as offset, a as autoPlacement, b as arrow, s as shift, h as hide } from "./floating-ui__dom.mjs";
const CSS_UTILITY = {
  rtl: "calcite--rtl"
};
const DEBOUNCE = {
  nextTick: 0,
  resize: 150,
  reposition: 100
};
const resizeShiftStep = 25;
let effectiveConfig = void 0;
const defaultConfig = {
  focusTrapStack: [],
  logLevel: "info"
};
function initConfig() {
  return {
    ...defaultConfig,
    ...globalThis["calciteConfig"] ?? {}
  };
}
function getConfig() {
  if (!effectiveConfig) {
    effectiveConfig = initConfig();
  }
  return effectiveConfig;
}
const version = "5.0.2";
const buildDate = "2026-02-18";
const revision = "960214b84";
function stampVersion() {
  const config = getConfig();
  if (config && config.version) {
    return;
  }
  console.info(`Using Calcite Components ${version} [Date: ${buildDate}, Revision: ${revision}]`);
  Object.defineProperty(config, "version", {
    value: version,
    writable: false
  });
  globalThis["calciteConfig"] = config;
}
{
  queueMicrotask(stampVersion);
}
const runtime = makeRuntime({ defaultAssetPath: "https://js.arcgis.com/calcite-components/5.0.2/", hydratedAttribute: "calcite-hydrated" });
const { customElement, getAssetPath, setAssetPath: setAssetPath$1 } = runtime;
let assetPathChanged = false;
const setAssetPath = (path) => {
  assetPathChanged = true;
  setAssetPath$1(path);
};
function gen(counts) {
  return counts.map((count) => {
    let out = "";
    for (let i2 = 0; i2 < count; i2++) {
      out += ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
    }
    return out;
  }).join("-");
}
const guid = () => gen([2, 1, 1, 1, 3]);
const useT9n = makeT9nController(getAssetPath);
const CSS$p = {
  percentage: "percentage",
  progressRing: "ring--progress",
  ring: "ring",
  rings: "rings",
  text: "text",
  trackRing: "ring--track"
};
const styles$l = i`:host{position:relative;margin-inline:auto;display:flex;align-items:center;justify-content:center;opacity:1;flex-direction:column;min-block-size:var(--calcite-loader-size);font-size:var(--calcite-loader-font-size);stroke-width:var(--calcite-internal-stroke-width);fill:none;transform:scale(1);padding-block:var(--calcite-loader-spacing, 4rem)}:host([scale=s]){--calcite-internal-stroke-width: 3;--calcite-internal-text-offset: var(--calcite-spacing-xxs);--calcite-internal-loader-font-size: var(--calcite-font-size--3);--calcite-internal-loader-size: 2rem;--calcite-internal-loader-size-inline: .75rem;--calcite-internal-loader-value-line-height: .625rem}:host([scale=m]){--calcite-internal-stroke-width: 6;--calcite-internal-text-offset: var(--calcite-spacing-sm);--calcite-internal-loader-font-size: var(--calcite-font-size-relative-md);--calcite-internal-loader-size: 4rem;--calcite-internal-loader-size-inline: 1rem;--calcite-internal-loader-value-line-height: 1.375rem}:host([scale=l]){--calcite-internal-stroke-width: 8;--calcite-internal-text-offset: var(--calcite-spacing-md);--calcite-internal-loader-font-size: var(--calcite-font-size-relative-xl);--calcite-internal-loader-size: 6rem;--calcite-internal-loader-size-inline: 1.5rem;--calcite-internal-loader-value-line-height: 1.71875rem}.text{display:block;text-align:center;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm);margin-block-start:var(--calcite-loader-text-spacing, var(--calcite-internal-text-offset));font-weight:var(--calcite-loader-text-weight, var(--calcite-font-weight-normal));color:var(--calcite-loader-text-color, var(--calcite-color-text-1))}.percentage{display:block;text-align:center;font-size:var(--calcite-loader-font-size);inline-size:var(--calcite-loader-size, var(--calcite-internal-loader-size));line-height:var(--calcite-internal-loader-value-line-height);align-self:center;color:var(--calcite-loader-text-color, var(--calcite-color-text-1))}.rings{position:relative;display:flex;overflow:visible;opacity:1;inline-size:var(--calcite-loader-size, var(--calcite-internal-loader-size));block-size:var(--calcite-loader-size, var(--calcite-internal-loader-size))}.ring{position:absolute;inset-block-start:0px;transform-origin:center;overflow:visible;inset-inline-start:0;inline-size:var(--calcite-loader-size, var(--calcite-internal-loader-size));block-size:var(--calcite-loader-size, var(--calcite-internal-loader-size))}.ring--track{stroke:var(--calcite-loader-track-color, var(--calcite-color-transparent-press))}.ring--progress{stroke:var(--calcite-loader-progress-color, var(--calcite-color-brand));transform:rotate(-90deg);transition:all var(--calcite-internal-animation-timing-fast) linear}:host([type=indeterminate]) .ring--progress{animation:loader-clockwise calc(var(--calcite-internal-animation-timing-slow) / var(--calcite-internal-duration-factor) * 2 / var(--calcite-internal-duration-factor)) linear infinite}:host([inline]){--calcite-internal-stroke-width: 2;position:relative;margin:0;stroke:currentColor;stroke-width:2;padding-block:0px;block-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)));min-block-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)));inline-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)));vertical-align:calc(var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline))) * -1 * .2)}:host([inline]) .rings{inset-block-start:0px;margin:0;inset-inline-start:0;inline-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)));block-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)))}:host([inline]) .ring{inline-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)));block-size:var(--calcite-loader-size, var(--calcite-loader-size-inline, var(--calcite-internal-loader-size-inline)))}:host([inline]) .ring--progress{stroke:var(--calcite-loader-progress-color-inline, currentColor)}:host([complete]){opacity:0;transform:scale(.75);transform-origin:center;transition:opacity var(--calcite-internal-animation-timing-medium) linear 1s,transform var(--calcite-internal-animation-timing-medium) linear 1s}:host([complete]) .rings{opacity:0;transform:scale(.75);transform-origin:center;transition:opacity calc(.18s * var(--calcite-internal-duration-factor)) linear .8s,transform calc(.18s * var(--calcite-internal-duration-factor)) linear .8s}:host([complete]) .percentage{color:var(--calcite-color-brand);transform:scale(1.05);transform-origin:center;transition:color var(--calcite-internal-animation-timing-medium) linear,transform var(--calcite-internal-animation-timing-medium) linear}@keyframes loader-clockwise{0%{transform:rotate(0)}to{transform:rotate(360deg)}}:host([hidden]){display:none}[hidden]{display:none}`;
const _Loader = class _Loader extends LitElement {
  constructor() {
    super(...arguments);
    this.messages = useT9n({ name: null });
    this.complete = false;
    this.inline = false;
    this.scale = "m";
    this.text = "";
    this.type = "indeterminate";
    this.value = 0;
  }
  connectedCallback() {
    super.connectedCallback();
    this.updateFormatter();
  }
  load() {
    requestAnimationFrame(() => this.valueChangeHandler());
  }
  willUpdate(changes) {
    if (changes.has("value") && (this.hasUpdated || this.value !== 0)) {
      this.valueChangeHandler();
    }
    if (changes.has("type") && (this.hasUpdated || this.type !== "indeterminate") || changes.has("messages")) {
      this.updateFormatter();
    }
  }
  valueChangeHandler() {
    this.complete = this.type.startsWith("determinate") && this.value === 100;
  }
  formatValue() {
    if (this.type !== "determinate-value") {
      return `${this.value}`;
    }
    return this.formatter.format(this.value / 100);
  }
  getSize(scale) {
    return {
      s: 32,
      m: 64,
      l: 96
    }[scale];
  }
  getInlineSize(scale) {
    return {
      s: 12,
      m: 16,
      l: 24
    }[scale];
  }
  updateFormatter() {
    if (this.type !== "determinate-value" || this.formatter?.resolvedOptions().locale === this.messages._lang) {
      return;
    }
    this.formatter = new Intl.NumberFormat(this.messages._lang, {
      style: "percent"
    });
  }
  render() {
    const { el, inline, label, text, type, value } = this;
    const id = el.id || guid();
    const isDeterminate = type !== "indeterminate";
    const valueNow = Math.floor(value);
    this.el.ariaLabel = label;
    this.el.ariaValueMax = isDeterminate ? "100" : void 0;
    this.el.ariaValueMin = isDeterminate ? "0" : void 0;
    this.el.ariaValueNow = isDeterminate ? valueNow.toString() : void 0;
    setAttribute(this.el, "id", id);
    this.el.role = "progressbar";
    return T`<div class=${safeClassMap(CSS$p.rings)}>${this.renderRing("track")}${this.renderRing("progress")}${!inline && isDeterminate && T`<div class=${safeClassMap(CSS$p.percentage)}>${this.formatValue()}</div>` || ""}</div>${!inline && text && T`<div class=${safeClassMap(CSS$p.text)}>${text}</div>` || ""}`;
  }
  renderRing(type) {
    const { inline, scale, value } = this;
    const size = inline ? this.getInlineSize(scale) : this.getSize(scale);
    const radiusRatio = 0.45;
    const radius = size * radiusRatio;
    let style;
    if (type === "progress") {
      const circumference = 2 * radius * Math.PI;
      const progress = (this.type.startsWith("determinate") ? value : 24) / 100 * circumference;
      const remaining = circumference - progress;
      style = { "stroke-dasharray": `${progress} ${remaining}` };
    }
    return T`<svg aria-hidden=true class=${safeClassMap({
      [CSS$p.ring]: true,
      [CSS$p.trackRing]: type === "track",
      [CSS$p.progressRing]: type === "progress"
    })} style=${safeStyleMap(style)} viewBox=${`0 0 ${size} ${size}`}>${b`<circle cx=${size / 2} cy=${size / 2} r=${radius ?? A} />`}</svg>`;
  }
};
_Loader.properties = { complete: [7, {}, { reflect: true, type: Boolean }], inline: [7, {}, { reflect: true, type: Boolean }], label: 1, scale: [3, {}, { reflect: true }], text: 1, type: [3, {}, { reflect: true }], value: [9, {}, { type: Number }] };
_Loader.styles = styles$l;
let Loader = _Loader;
customElement("calcite-loader", Loader);
const index$k = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Loader
});
var candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode$1 = !NoElement && Element.prototype.getRootNode ? function(element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var isInert = function isInert2(node, lookUp) {
  var _node$getAttribute;
  if (lookUp === void 0) {
    lookUp = true;
  }
  var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
  var inert = inertAtt === "" || inertAtt === "true";
  var result = inert || lookUp && node && isInert2(node.parentNode);
  return result;
};
var isContentEditable = function isContentEditable2(node) {
  var _node$getAttribute2;
  var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
  return attValue === "" || attValue === "true";
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  if (isInert(el)) {
    return [];
  }
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (isInert(element, false)) {
      continue;
    }
    if (element.tagName === "SLOT") {
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively2(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }
      var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
      var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var hasTabIndex = function hasTabIndex2(node) {
  return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
};
var getTabIndex = function getTabIndex2(node) {
  if (!node) {
    throw new Error("No node provided");
  }
  if (node.tabIndex < 0) {
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
};
var getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
  var tabIndex = getTabIndex(node);
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0;
  }
  return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b2) {
  return a.tabIndex === b2.tabIndex ? a.documentOrder - b2.documentOrder : a.tabIndex - b2.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i2 = 0; i2 < nodes.length; i2++) {
    if (nodes[i2].checked && nodes[i2].form === form) {
      return nodes[i2];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode$1(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached2(node) {
  var _nodeRoot;
  var nodeRoot = node && getRootNode$1(node);
  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
  var attached = false;
  if (nodeRoot && nodeRoot !== node) {
    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
      nodeRoot = getRootNode$1(nodeRootHost);
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
    }
  }
  return attached;
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  if (!displayCheck || displayCheck === "full" || displayCheck === "legacy-full") {
    if (typeof getShadowRoot === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode$1(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (isNodeAttached(node)) {
      return !node.getClientRects().length;
    }
    if (displayCheck !== "legacy-full") {
      return true;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i2 = 0; i2 < parentNode.children.length; i2++) {
          var child = parentNode.children.item(i2);
          if (child.tagName === "LEGEND") {
            return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  isInert(node) || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var sortByOrder = function sortByOrder2(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function(item, i2) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getSortOrderTabIndex(element, isScope);
    var elements = isScope ? sortByOrder2(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i2,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusable = function focusable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
const tabbableOptions = {
  getShadowRoot: true
};
function getElementDir(el) {
  const prop = "dir";
  const selector = `[${prop}]`;
  const closest = closestElementCrossShadowBoundary(el, selector);
  return closest ? closest.getAttribute(prop) : "ltr";
}
function getRootNode(el) {
  return el.getRootNode();
}
function getShadowRootNode(el) {
  const rootNode = getRootNode(el);
  return "host" in rootNode ? rootNode : null;
}
function getHost(root) {
  return root.host || null;
}
function queryElementRoots(el, {
  selector,
  id
}) {
  if (!el) {
    return null;
  }
  if (el.assignedSlot) {
    el = el.assignedSlot;
  }
  const rootNode = getRootNode(el);
  const found = id ? "getElementById" in rootNode ? (
    /*
      Check to make sure 'getElementById' exists in cases where element is no longer connected to the DOM and getRootNode() returns the element.
      https://github.com/Esri/calcite-design-system/pull/4280
       */
    rootNode.getElementById(id)
  ) : null : selector ? rootNode.querySelector(selector) : null;
  return found || queryElementRoots(getHost(rootNode), { selector, id });
}
function closestElementCrossShadowBoundary(element, selector) {
  return element ? element.closest(selector) || closestElementCrossShadowBoundary(getHost(getRootNode(element)), selector) : null;
}
function isCalciteFocusable(el) {
  return typeof el?.setFocus === "function";
}
async function focusElement(el, includeContainer = false, strategy = "tabbable", context, options) {
  if (!el) {
    return;
  }
  if (isCalciteFocusable(el) && context !== el) {
    return el.setFocus(options);
  }
  const firstFocusFunction = strategy === "tabbable" ? focusFirstTabbable : focusFirstFocusable;
  return firstFocusFunction(el, includeContainer, options);
}
function getFirstTabbable(element, includeContainer) {
  if (!element) {
    return;
  }
  return tabbable(element, { ...tabbableOptions, includeContainer })[0] ?? element;
}
function focusFirstTabbable(element, includeContainer, options) {
  getFirstTabbable(element, includeContainer)?.focus(options);
}
function getFirstFocusable(element, includeContainer) {
  if (!element) {
    return;
  }
  return focusable(element, { ...tabbableOptions, includeContainer })[0] ?? element;
}
function focusFirstFocusable(element, includeContainer, options) {
  getFirstFocusable(element, includeContainer)?.focus(options);
}
function filterElementsBySelector(elements, selector) {
  return elements.filter((element) => element.matches(selector));
}
function setRequestedIcon(iconObject, iconValue, matchedValue) {
  if (typeof iconValue === "string" && iconValue !== "") {
    return iconValue;
  } else if (iconValue === "" || iconValue === true) {
    return iconObject[matchedValue];
  }
}
function toAriaBoolean(value) {
  return Boolean(value).toString();
}
function hasVisibleContent(element) {
  for (const node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== "" || node.nodeType === Node.ELEMENT_NODE) {
      return true;
    }
  }
  return false;
}
function slotChangeHasAssignedElement(event) {
  return !!slotChangeGetAssignedElements(event).length;
}
function slotChangeGetAssignedElements(event, selector) {
  return getSlotAssignedElements(event.currentTarget, selector);
}
function getSlotAssignedElements(slot, selector) {
  const assignedElements = slot.assignedElements({
    flatten: true
  });
  return selector ? filterElementsBySelector(assignedElements, selector) : assignedElements;
}
function isPrimaryPointerButton(event) {
  return !!(event.isPrimary && event.button === 0);
}
const focusElementInGroup = (elements, currentElement, destination, cycle = true, includeContainer = true, targetAsContext = false) => {
  const currentIndex = elements.indexOf(currentElement);
  const isFirstItem = currentIndex === 0;
  const isLastItem = currentIndex === elements.length - 1;
  if (cycle) {
    destination = destination === "previous" && isFirstItem ? "last" : destination === "next" && isLastItem ? "first" : destination;
  }
  let focusTarget;
  if (destination === "previous") {
    focusTarget = elements[currentIndex - 1] || elements[cycle ? elements.length - 1 : currentIndex];
  } else if (destination === "next") {
    focusTarget = elements[currentIndex + 1] || elements[cycle ? 0 : currentIndex];
  } else if (destination === "last") {
    focusTarget = elements[elements.length - 1];
  } else {
    focusTarget = elements[0];
  }
  focusElement(focusTarget, includeContainer, "tabbable", targetAsContext ? focusTarget : void 0);
  return focusTarget;
};
function isBefore(a, b2) {
  if (a.parentNode !== b2.parentNode) {
    return false;
  }
  const children = Array.from(a.parentNode.children);
  return children.indexOf(a) < children.indexOf(b2);
}
async function whenAnimationDone(targetEl, animationName) {
  return whenTransitionOrAnimationDone(targetEl, animationName, "animation");
}
async function whenTransitionDone(targetEl, transitionProp) {
  return whenTransitionOrAnimationDone(targetEl, transitionProp, "transition");
}
function findAnimation(targetEl, type, transitionPropOrAnimationName) {
  const targetProp = type === "transition" ? "transitionProperty" : "animationName";
  return targetEl.getAnimations().find((anim) => anim[targetProp] === transitionPropOrAnimationName);
}
async function whenTransitionOrAnimationDone(targetEl, transitionPropOrAnimationName, type) {
  let anim = findAnimation(targetEl, type, transitionPropOrAnimationName);
  if (!anim) {
    await nextFrame();
    anim = findAnimation(targetEl, type, transitionPropOrAnimationName);
  }
  if (!anim) {
    return;
  }
  try {
    await anim.finished;
  } catch {
  }
}
async function nextFrame() {
  await new Promise((resolve) => requestAnimationFrame(() => resolve()));
}
function getStylePixelValue(value) {
  if (value.endsWith("px")) {
    return parseFloat(value);
  } else if (value.endsWith("vw")) {
    return viewportUnitToPixel(parseFloat(value), window.innerWidth);
  } else if (value.endsWith("vh")) {
    return viewportUnitToPixel(parseFloat(value), window.innerHeight);
  }
  return 0;
}
function viewportUnitToPixel(value, viewportSize) {
  return value * viewportSize / 100;
}
function createObserver(type, callback, options) {
  {
    return void 0;
  }
}
function updateRefObserver(observer, oldTarget, target, options) {
  if (!observer) {
    return;
  }
  if (oldTarget) {
    observer.unobserve(oldTarget);
  }
  if (!target) {
    return;
  }
  if (observer instanceof MutationObserver) {
    observer.observe(target, options);
    return;
  }
  observer.observe(target);
}
const loggedDeprecations = /* @__PURE__ */ new Set();
const logLevels = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 4,
  error: 8,
  off: 10
};
function willLog(level) {
  return logLevels[level] >= logLevels[getConfig().logLevel];
}
function forwardToConsole(level, ...data) {
  if (!willLog(level)) {
    return;
  }
  const badgeTemplate = "%ccalcite";
  const badgeStyle = "background: #007AC2; color: #fff; border-radius: 4px; padding: 2px 4px;";
  console[level](badgeTemplate, badgeStyle, ...data);
}
let listFormatter;
const logger = {
  debug: (message) => forwardToConsole("debug", message),
  info: (message) => forwardToConsole("info", message),
  warn: (message) => forwardToConsole("warn", message),
  error: (message) => forwardToConsole("error", message),
  trace: (message) => forwardToConsole("trace", message),
  deprecated
};
function deprecated(context, { component, name, suggested, removalVersion }) {
  const key = `${context}:${context === "component" ? "" : component}${name}`;
  const removalVersionText = removalVersion === "future" ? `a future version` : `v${removalVersion}`;
  if (loggedDeprecations.has(key)) {
    return;
  }
  loggedDeprecations.add(key);
  let message = "";
  message = context === "component" ? `This component is deprecated and will be removed in ${removalVersionText}.` : `The [${name}] ${context} is deprecated and will be removed in ${removalVersionText}.`;
  if (suggested) {
    listFormatter = new Intl.ListFormat("en", { style: "long", type: "disjunction" });
    message += ` Use ${listFormatter.format([suggested].flat().map((suggestion) => `"${suggestion}"`))} instead.`;
  }
  const composed = `[${component.el.tagName.toLocaleLowerCase().slice("calcite-".length)}] - ${message}`;
  forwardToConsole("warn", composed);
}
const CSS$o = {
  flipRtl: "flip-rtl",
  svg: "svg"
};
const scaleToPx = {
  s: 16,
  m: 24,
  l: 32
};
const styles$k = i`:host{display:inline-flex;color:var(--calcite-icon-color, var(--calcite-ui-icon-color, currentColor))}:host([scale=s]){inline-size:16px;block-size:16px;min-inline-size:16px;min-block-size:16px}:host([scale=m]){inline-size:24px;block-size:24px;min-inline-size:24px;min-block-size:24px}:host([scale=l]){inline-size:32px;block-size:32px;min-inline-size:32px;min-block-size:32px}.flip-rtl{transform:scaleX(-1)}.svg{display:block}:host([hidden]){display:none}[hidden]{display:none}`;
const _Icon = class _Icon extends LitElement {
  constructor() {
    super(...arguments);
    this.visible = false;
    this.flipRtl = false;
    this.icon = null;
    this.preload = false;
    this.scale = "m";
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.preload) {
      this.visible = true;
      this.loadIconPathData();
      return;
    }
    if (!this.visible) {
      this.waitUntilVisible(() => {
        this.visible = true;
        this.loadIconPathData();
      });
    }
  }
  willUpdate(changes) {
    if (changes.has("icon") && (this.hasUpdated || this.icon !== null) || changes.has("scale") && (this.hasUpdated || this.scale !== "m")) {
      this.loadIconPathData();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;
  }
  async loadIconPathData() {
    const { icon, scale, visible } = this;
    {
      return;
    }
  }
  waitUntilVisible(callback) {
    this.intersectionObserver = createObserver();
    if (!this.intersectionObserver) {
      callback();
      return;
    }
    this.intersectionObserver.observe(this.el);
  }
  render() {
    const { el, flipRtl, pathData, scale, textLabel } = this;
    const dir = getElementDir(el);
    const size = scaleToPx[scale];
    const semantic = !!textLabel;
    const paths = [].concat(pathData || "");
    this.el.ariaHidden = toAriaBoolean(!semantic);
    this.el.ariaLabel = semantic ? textLabel : null;
    this.el.role = semantic ? "img" : null;
    return T`<svg aria-hidden=true class=${safeClassMap({
      [CSS$o.flipRtl]: dir === "rtl" && flipRtl,
      [CSS$o.svg]: true
    })} fill=currentColor height=100% viewBox=${`0 0 ${size} ${size}`} width=100% xmlns=http://www.w3.org/2000/svg>${paths.map((path) => typeof path === "string" ? b`<path d=${path ?? A} />` : b`<path d=${path.d ?? A} opacity=${("opacity" in path ? path.opacity : 1) ?? A} />`)}</svg>`;
  }
};
_Icon.properties = { pathData: [16, {}, { state: true }], visible: [16, {}, { state: true }], flipRtl: [7, {}, { reflect: true, type: Boolean }], icon: [3, { type: String }, { reflect: true }], preload: [7, {}, { reflect: true, type: Boolean }], scale: [3, {}, { reflect: true }], textLabel: 1 };
_Icon.styles = styles$k;
let Icon = _Icon;
customElement("calcite-icon", Icon);
const index$j = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Icon
});
const componentsWithInputEvent = [
  "calcite-input",
  "calcite-input-number",
  "calcite-input-text",
  "calcite-text-area"
];
function getClearValidationEventName(componentTag) {
  const componentTagCamelCase = componentTag.split("-").map((part, index2) => index2 === 0 ? part : `${part[0].toUpperCase()}${part.slice(1)}`).join("");
  const clearValidationEvent = `${componentTagCamelCase}${componentsWithInputEvent.includes(componentTag) ? "Input" : "Change"}`;
  return clearValidationEvent;
}
const hiddenFormInputSlotName = "hidden-form-input";
function isCheckable(component) {
  return "checked" in component;
}
const onFormResetMap = /* @__PURE__ */ new WeakMap();
const formComponentSet = /* @__PURE__ */ new WeakSet();
function hasRegisteredFormComponentParent(form, formComponentEl) {
  const hasParentComponentWithFormIdSet = closestElementCrossShadowBoundary(formComponentEl.parentElement, "[form]");
  if (hasParentComponentWithFormIdSet) {
    return true;
  }
  const formComponentRegisterEventName = "calciteInternalFormComponentRegister";
  let hasRegisteredFormComponentParent2 = false;
  form.addEventListener(formComponentRegisterEventName, (event) => {
    hasRegisteredFormComponentParent2 = event.composedPath().some((element) => formComponentSet.has(element));
    event.stopPropagation();
  }, { once: true });
  formComponentEl.dispatchEvent(new CustomEvent(formComponentRegisterEventName, {
    bubbles: true,
    composed: true
  }));
  return hasRegisteredFormComponentParent2;
}
function displayValidationMessage(component, { status, message, icon }) {
  if ("status" in component) {
    component.status = status;
  }
  if ("validationIcon" in component && typeof component.validationIcon !== "string") {
    component.validationIcon = icon;
  }
  if ("validationMessage" in component && !component.validationMessage) {
    component.validationMessage = message;
  }
}
function getValidationComponent(el) {
  if (el.nodeName === "CALCITE-RADIO-BUTTON") {
    return closestElementCrossShadowBoundary(el, "calcite-radio-button-group");
  }
  return el;
}
const invalidEvent = new CustomEvent("calciteInvalid", { bubbles: true, composed: true });
function invalidHandler(event) {
  const hiddenInput = event?.target;
  const hiddenInputMessage = hiddenInput?.validationMessage;
  const formComponent = getValidationComponent(hiddenInput?.parentElement);
  if (!formComponent) {
    return;
  }
  const componentTag = formComponent?.nodeName?.toLowerCase();
  const componentTagParts = componentTag?.split("-");
  if (componentTagParts.length < 2 || componentTagParts[0] !== "calcite") {
    return;
  }
  event?.preventDefault();
  if ("validity" in formComponent) {
    formComponent.validity = hiddenInput?.validity;
  }
  formComponent.dispatchEvent(invalidEvent);
  displayValidationMessage(formComponent, {
    message: hiddenInputMessage,
    icon: true,
    status: "invalid"
  });
  const clearValidationEvent = getClearValidationEventName(componentTag);
  formComponent.addEventListener(clearValidationEvent, () => {
    if ("status" in formComponent) {
      formComponent.status = "idle";
    }
    if ("validationIcon" in formComponent && // validationIcon could be an empty string when true due to reflection
    (!formComponent.validationIcon || formComponent.validationIcon === true)) {
      formComponent.validationIcon = false;
    }
    if ("validationMessage" in formComponent && formComponent.validationMessage === hiddenInputMessage) {
      formComponent.validationMessage = "";
    }
    if ("validity" in formComponent) {
      formComponent.validity = hiddenInput?.validity;
    }
  }, { once: true });
}
function submitForm(component) {
  const { formEl } = component;
  if (!formEl) {
    return false;
  }
  formEl.addEventListener("invalid", invalidHandler, true);
  formEl.requestSubmit();
  formEl.removeEventListener("invalid", invalidHandler, true);
  requestAnimationFrame(() => {
    const invalidEls = formEl.querySelectorAll("[status=invalid]");
    for (const el of invalidEls) {
      if (el?.validationMessage) {
        el?.setFocus();
        break;
      }
    }
  });
  return true;
}
function resetForm(component) {
  component.formEl?.reset();
}
function connectForm(component) {
  const { el, value } = component;
  const associatedForm = findAssociatedForm(component);
  if (!associatedForm || hasRegisteredFormComponentParent(associatedForm, el)) {
    return;
  }
  component.formEl = associatedForm;
  component.defaultValue = value;
  if (isCheckable(component)) {
    component.defaultChecked = component.checked;
  }
  const boundOnFormReset = onFormReset.bind(component);
  associatedForm.addEventListener("reset", boundOnFormReset);
  onFormResetMap.set(component.el, boundOnFormReset);
  formComponentSet.add(el);
}
function findAssociatedForm(component) {
  const { el, form } = component;
  return form ? queryElementRoots(el, { id: form }) : closestElementCrossShadowBoundary(el, "form");
}
function onFormReset() {
  if ("status" in this) {
    this.status = "idle";
  }
  if ("validationIcon" in this) {
    this.validationIcon = false;
  }
  if ("validationMessage" in this) {
    this.validationMessage = "";
  }
  if (isCheckable(this)) {
    this.checked = this.defaultChecked;
    return;
  }
  this.value = this.defaultValue;
  this.onFormReset?.();
}
function disconnectForm(component) {
  const { el, formEl } = component;
  if (!formEl) {
    return;
  }
  const boundOnFormReset = onFormResetMap.get(el);
  formEl.removeEventListener("reset", boundOnFormReset);
  onFormResetMap.delete(el);
  component.formEl = null;
  formComponentSet.delete(el);
}
const internalHiddenInputInputEvent = "calciteInternalHiddenInputInput";
function syncHiddenFormInput$1(component) {
  const { el, formEl, name, value } = component;
  const { ownerDocument } = el;
  {
    return;
  }
}
const HiddenFormInputSlot = ({ component }) => {
  syncHiddenFormInput$1(component);
  return T`<slot name=${hiddenFormInputSlotName}></slot>`;
};
const labelClickEvent = "calciteInternalLabelClick";
const labelConnectedEvent = "calciteInternalLabelConnected";
const labelDisconnectedEvent = "calciteInternalLabelDisconnected";
const labelTagName = "calcite-label";
const labelToLabelables = /* @__PURE__ */ new WeakMap();
const onLabelClickMap = /* @__PURE__ */ new WeakMap();
const onLabelConnectedMap = /* @__PURE__ */ new WeakMap();
const onLabelDisconnectedMap = /* @__PURE__ */ new WeakMap();
const unlabeledComponents = /* @__PURE__ */ new Set();
const findLabelForComponent = (componentEl) => {
  const { id } = componentEl;
  const forLabel = id && queryElementRoots(componentEl, { selector: `${labelTagName}[for="${id}"]` });
  if (forLabel) {
    return forLabel;
  }
  const parentLabel = closestElementCrossShadowBoundary(componentEl, labelTagName);
  if (!parentLabel || // labelable components within other custom elements are not considered labelable
  hasAncestorCustomElements(parentLabel, componentEl)) {
    return null;
  }
  return parentLabel;
};
function hasAncestorCustomElements(label, componentEl) {
  let traversedElements;
  const customElementAncestorCheckEventType = "custom-element-ancestor-check";
  const listener = (event) => {
    event.stopImmediatePropagation();
    const composedPath = event.composedPath();
    traversedElements = composedPath.slice(composedPath.indexOf(componentEl), composedPath.indexOf(label));
  };
  label.addEventListener(customElementAncestorCheckEventType, listener, { once: true });
  componentEl.dispatchEvent(new CustomEvent(customElementAncestorCheckEventType, { composed: true, bubbles: true }));
  label.removeEventListener(customElementAncestorCheckEventType, listener);
  const ancestorCustomElements = traversedElements.filter((el) => el !== componentEl && el !== label).filter((el) => el.tagName?.includes("-"));
  return ancestorCustomElements.length > 0;
}
function connectLabel(component) {
  if (!component) {
    return;
  }
  const labelEl = findLabelForComponent(component.el);
  if (onLabelClickMap.has(labelEl) && labelEl === component.labelEl || !labelEl && unlabeledComponents.has(component)) {
    return;
  }
  const boundOnLabelDisconnected = onLabelDisconnected.bind(component);
  if (labelEl) {
    component.labelEl = labelEl;
    const labelables = labelToLabelables.get(labelEl) || [];
    labelables.push(component);
    labelToLabelables.set(labelEl, labelables.sort(sortByDOMOrder));
    if (!onLabelClickMap.has(component.labelEl)) {
      onLabelClickMap.set(component.labelEl, onLabelClick);
      component.labelEl.addEventListener(labelClickEvent, onLabelClick);
    }
    unlabeledComponents.delete(component);
    document.removeEventListener(labelConnectedEvent, onLabelConnectedMap.get(component));
    onLabelDisconnectedMap.set(component, boundOnLabelDisconnected);
    document.addEventListener(labelDisconnectedEvent, boundOnLabelDisconnected);
  } else if (!unlabeledComponents.has(component)) {
    boundOnLabelDisconnected();
    document.removeEventListener(labelDisconnectedEvent, onLabelDisconnectedMap.get(component));
  }
}
function disconnectLabel(component) {
  if (!component) {
    return;
  }
  unlabeledComponents.delete(component);
  document.removeEventListener(labelConnectedEvent, onLabelConnectedMap.get(component));
  document.removeEventListener(labelDisconnectedEvent, onLabelDisconnectedMap.get(component));
  onLabelConnectedMap.delete(component);
  onLabelDisconnectedMap.delete(component);
  if (!component.labelEl) {
    return;
  }
  const labelables = labelToLabelables.get(component.labelEl);
  if (labelables.length === 1) {
    component.labelEl.removeEventListener(labelClickEvent, onLabelClickMap.get(component.labelEl));
    onLabelClickMap.delete(component.labelEl);
  }
  labelToLabelables.set(
    component.labelEl,
    labelables.filter((labelable) => labelable !== component).sort(sortByDOMOrder)
  );
  component.labelEl = null;
}
function sortByDOMOrder(a, b2) {
  return isBefore(a.el, b2.el) ? -1 : 1;
}
function getLabelText(component) {
  return component.label || component.labelEl?.textContent?.trim() || "";
}
function onLabelClick(event) {
  const labelClickTarget = event.detail.sourceEvent.target;
  const labelables = labelToLabelables.get(this);
  const clickedLabelable = labelables.find((labelable) => labelable.el === labelClickTarget);
  const labelableChildClicked = labelables.includes(clickedLabelable);
  if (labelableChildClicked) {
    return;
  }
  const firstLabelable = labelables[0];
  if (firstLabelable.disabled) {
    return;
  }
  firstLabelable.onLabelClick(event);
}
function onLabelConnected() {
  if (unlabeledComponents.has(this)) {
    connectLabel(this);
  }
}
function onLabelDisconnected() {
  unlabeledComponents.add(this);
  const boundOnLabelConnected = onLabelConnectedMap.get(this) || onLabelConnected.bind(this);
  onLabelConnectedMap.set(this, boundOnLabelConnected);
  document.addEventListener(labelConnectedEvent, boundOnLabelConnected);
}
async function associateExplicitLabelToUnlabeledComponent(label) {
  await label.componentOnReady();
  const alreadyLabeled = labelToLabelables.has(label);
  if (alreadyLabeled) {
    return;
  }
  const forComponentEl = label.ownerDocument?.getElementById(label.for);
  if (!forComponentEl) {
    return;
  }
  requestAnimationFrame(() => {
    for (const labelable of unlabeledComponents) {
      if (labelable.el === forComponentEl) {
        connectLabel(labelable);
        break;
      }
    }
  });
}
function getIconScale(componentScale) {
  return componentScale === "l" ? "m" : "s";
}
async function componentFocusable(component) {
  await component.componentOnReady();
  await component.updateComplete;
}
const useSetFocus = () => {
  return makeGenericController((component, controller) => {
    let abortController;
    function handleFocusOut() {
      abortController?.abort();
    }
    controller.onLoad(() => {
      component.listen("focus", () => {
        abortController = new AbortController();
        component.el.addEventListener("focusout", handleFocusOut, { signal: abortController.signal });
      });
    });
    controller.onDisconnected(() => {
      component.el.removeEventListener("focusout", handleFocusOut);
    });
    return async (getFocusTarget, options) => {
      if (component.disabled) {
        return;
      }
      const focusConfig = toFocusConfig(getFocusTarget());
      if (!focusConfig) {
        return;
      }
      const { target, includeContainer, strategy } = focusConfig;
      const rootNode = getRootNode(component.el);
      const currentActiveElement = rootNode.activeElement;
      await componentFocusable(component);
      const focusAlreadyChanged = currentActiveElement !== rootNode.activeElement;
      if (focusAlreadyChanged || abortController && !abortController?.signal.aborted) {
        return;
      }
      component.el.removeEventListener("focus", handleFocusOut);
      return focusElement(target, includeContainer, strategy, component.el, options);
    };
  });
};
function isFocusOverride(focusTarget) {
  return "target" in focusTarget && ("includeContainer" in focusTarget || "strategy" in focusTarget);
}
function toFocusConfig(focusTarget) {
  if (!focusTarget) {
    return;
  }
  return isFocusOverride(focusTarget) ? focusTarget : { target: focusTarget };
}
const CSS$n = {
  container: "interaction-container"
};
const InteractiveContainer = ({ children, disabled }) => T`<div class=${safeClassMap(CSS$n.container)} .inert=${disabled}>${children}</div>`;
const useInteractive = makeGenericController((component, controller) => {
  controller.onUpdated(() => updateHostInteraction(component));
  return InteractiveContainer;
});
function interceptedClick() {
  const { disabled } = this;
  if (!disabled) {
    HTMLElement.prototype.click.call(this);
  }
}
function onPointerDown(event) {
  const interactiveElement = event.target;
  if (interactiveElement.disabled) {
    event.preventDefault();
  }
}
const nonBubblingWhenDisabledMouseEvents = ["mousedown", "mouseup", "click"];
function onNonBubblingWhenDisabledMouseEvent(event) {
  const interactiveElement = event.target;
  if (interactiveElement.disabled) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
}
const captureOnlyOptions = { capture: true };
function updateHostInteraction(component) {
  if (component.disabled) {
    component.el.setAttribute("aria-disabled", "true");
    if (component.el.contains(document.activeElement)) {
      document.activeElement.blur();
    }
    blockInteraction(component);
    return;
  }
  restoreInteraction(component);
  component.el.removeAttribute("aria-disabled");
}
function blockInteraction(component) {
  component.el.click = interceptedClick;
  addInteractionListeners(component.el);
}
function addInteractionListeners(element) {
  element.addEventListener("pointerdown", onPointerDown, captureOnlyOptions);
  nonBubblingWhenDisabledMouseEvents.forEach((event) => element.addEventListener(event, onNonBubblingWhenDisabledMouseEvent, captureOnlyOptions));
}
function restoreInteraction(component) {
  delete component.el.click;
  removeInteractionListeners(component.el);
}
function removeInteractionListeners(element) {
  element.removeEventListener("pointerdown", onPointerDown, captureOnlyOptions);
  nonBubblingWhenDisabledMouseEvents.forEach((event) => element.removeEventListener(event, onNonBubblingWhenDisabledMouseEvent, captureOnlyOptions));
}
const CSS$m = {
  buttonLoader: "calcite-button--loader",
  content: "content",
  contentSlotted: "content--slotted",
  icon: "icon",
  iconStart: "icon--start",
  iconEnd: "icon--end",
  loadingIn: "loading-in",
  loadingOut: "loading-out",
  iconStartEmpty: "icon-start-empty",
  iconEndEmpty: "icon-end-empty",
  buttonPadding: "button-padding",
  buttonPaddingShrunk: "button-padding--shrunk"
};
const styles$j = i`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block;inline-size:auto;vertical-align:middle;border-radius:var(--calcite-button-corner-radius, var(--calcite-internal-button-corner-radius, 0))}:host a,:host button{--calcite-internal-button-content-margin: .5rem;--calcite-internal-button-padding-x: 7px;--calcite-internal-button-padding-y: 3px;position:relative;box-sizing:border-box;display:flex;block-size:100%;inline-size:100%;cursor:pointer;-webkit-user-select:none;user-select:none;appearance:none;align-items:center;justify-content:center;border-style:none;text-align:center;font-family:inherit;font-weight:var(--calcite-font-weight-normal);text-decoration-line:none;outline-color:transparent;box-shadow:var(--calcite-button-shadow, var(--calcite-shadow-none));background-color:var(--calcite-button-background-color, var(--calcite-internal-button-background-color, var(--calcite-color-transparent)));border-block-start-color:var(--calcite-button-border-color, var(--calcite-internal-button-border-block-start-color, var(--calcite-internal-button-border-color, var(--calcite-color-transparent))));border-block-end-color:var(--calcite-button-border-color, var(--calcite-internal-button-border-block-end-color, var(--calcite-internal-button-border-color, var(--calcite-color-transparent))));border-inline-start-color:var(--calcite-button-border-color, var(--calcite-internal-button-border-inline-start-color, var(--calcite-internal-button-border-color, var(--calcite-color-transparent))));border-inline-end-color:var(--calcite-button-border-color, var(--calcite-internal-button-border-inline-end-color, var(--calcite-internal-button-border-color, var(--calcite-color-transparent))));border-style:solid;border-width:var(--calcite-border-width-sm);border-radius:var(--calcite-button-corner-radius, var(--calcite-internal-button-corner-radius, 0));color:var(--calcite-button-text-color, var(--calcite-internal-button-text-color, currentColor));padding-block:var(--calcite-internal-button-padding-y);padding-inline:var(--calcite-internal-button-padding-x);transition:color var(--calcite-animation-timing) ease-in-out,background-color var(--calcite-animation-timing) ease-in-out,box-shadow var(--calcite-animation-timing) ease-in-out,outline-color var(--calcite-internal-animation-timing-fast) ease-in-out}:host a:hover,:host button:hover{text-decoration-line:none;background-color:var(--calcite-button-background-color, var(--calcite-internal-button-background-color-hover, var(--calcite-color-transparent)))}:host a:focus,:host button:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))));background-color:var(--calcite-button-background-color, var(--calcite-internal-button-background-color))}:host a:active,:host button:active{background-color:var(--calcite-button-background-color, var(--calcite-internal-button-background-color-press, var(--calcite-color-transparent)))}:host a span,:host button span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host a calcite-loader,:host button calcite-loader{color:var(--calcite-button-loader-color, var(--calcite-internal-button-loader-color, var(--calcite-button-text-color, var(--calcite-internal-button-text-color))))}:host([round]){--calcite-internal-button-corner-radius: 50px}.content{margin-inline:var(--calcite-internal-button-content-margin)}.icon-start-empty .content{margin-inline-start:unset}.icon-end-empty .content{margin-inline-end:unset}:host([scale=m]) button,:host([scale=m]) a{--calcite-internal-button-content-margin: .75rem}:host([scale=l]) button,:host([scale=l]) a{--calcite-internal-button-content-margin: 1rem}:host([width=auto]){inline-size:auto}:host([width=half]){inline-size:50%}:host([width=full]){inline-size:100%}:host([alignment=center]:not([width=auto])) a,:host([alignment=center]:not([width=auto])) button{justify-content:center}:host([alignment=start]:not([width=auto])) a,:host([alignment=start]:not([width=auto])) button{justify-content:flex-start}:host([alignment=end]:not([width=auto])) a,:host([alignment=end]:not([width=auto])) button{justify-content:flex-end}:host([alignment*=space-between]:not([width=auto])) a,:host([alignment*=space-between]:not([width=auto])) button{justify-content:space-between}:host([alignment=icon-start-space-between]:not([width=auto])) .icon--start{margin-inline-end:auto}:host([alignment=icon-start-space-between]:not([width=auto])) a,:host([alignment=icon-start-space-between]:not([width=auto])) button{text-align:unset}:host([alignment=icon-end-space-between]:not([width=auto])) .icon--end{margin-inline-start:auto}:host([alignment=icon-end-space-between]:not([width=auto])) a,:host([alignment=icon-end-space-between]:not([width=auto])) button{text-align:unset}:host([alignment=center]) a:not(.content--slotted) .icon--start+.icon--end,:host([alignment=center]) button:not(.content--slotted) .icon--start+.icon--end{margin-inline-start:var(--calcite-internal-button-content-margin)}.icon--start,.icon--end{color:var(--calcite-button-icon-color, var(--calcite-icon-color, var(--calcite-ui-icon-color)))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}@keyframes loader-in{0%{inline-size:0;opacity:0;transform:scale(.5)}to{inline-size:1em;opacity:1;transform:scale(1)}}@keyframes loader-out{0%{inline-size:1em;opacity:1;transform:scale(1)}to{inline-size:0;opacity:0;transform:scale(.5)}}.calcite-button--loader{display:flex}.calcite-button--loader calcite-loader{margin:0}:host([loading]) button.content--slotted .calcite-button--loader calcite-loader,:host([loading]) a.content--slotted .calcite-button--loader calcite-loader{margin-inline-end:var(--calcite-internal-button-content-margin)}:host([loading]) button:not(.content--slotted) .icon--start,:host([loading]) button:not(.content--slotted) .icon--end,:host([loading]) a:not(.content--slotted) .icon--start,:host([loading]) a:not(.content--slotted) .icon--end{display:none}:host([appearance]) button,:host([appearance]) a{--calcite-internal-button-border-color: var(--calcite-color-transparent);border-style:solid;border-width:var(--calcite-button-border-size, 1px)}:host([kind=brand]){--calcite-internal-button-background-color: var(--calcite-color-brand);--calcite-internal-button-background-color-hover: var(--calcite-color-brand-hover);--calcite-internal-button-background-color-press: var(--calcite-color-brand-press);--calcite-internal-button-loader-color: var(--calcite-color-text-inverse);--calcite-internal-button-text-color: var(--calcite-color-text-inverse)}:host([kind=danger]){--calcite-internal-button-background-color: var(--calcite-color-status-danger);--calcite-internal-button-background-color-hover: var(--calcite-color-status-danger-hover);--calcite-internal-button-background-color-press: var(--calcite-color-status-danger-press);--calcite-internal-button-loader-color: var(--calcite-color-text-inverse);--calcite-internal-button-text-color: var(--calcite-color-text-inverse)}:host([kind=neutral]){--calcite-internal-button-background-color: var(--calcite-color-foreground-3);--calcite-internal-button-background-color-hover: var(--calcite-color-foreground-2);--calcite-internal-button-background-color-press: var(--calcite-color-foreground-1);--calcite-internal-button-loader-color: var(--calcite-color-text-1);--calcite-internal-button-text-color: var(--calcite-color-text-1)}:host([kind=inverse]){--calcite-internal-button-background-color: var(--calcite-color-inverse);--calcite-internal-button-background-color-hover: var(--calcite-color-inverse-hover);--calcite-internal-button-background-color-press: var(--calcite-color-inverse-press);--calcite-internal-button-loader-color: var(--calcite-color-text-inverse);--calcite-internal-button-text-color: var(--calcite-color-text-inverse)}:host([appearance=outline-fill]){--calcite-internal-button-background-color: var(--calcite-color-foreground-1);--calcite-internal-button-background-color-hover: var(--calcite-color-foreground-2);--calcite-internal-button-background-color-press: var(--calcite-color-foreground-3)}:host([appearance=outline-fill]) button,:host([appearance=outline-fill]) a{border-style:solid;border-width:var(--calcite-button-border-size, 1px)}:host([appearance=outline-fill][kind=brand]) button,:host([appearance=outline-fill][kind=brand]) a{--calcite-internal-button-border-color: var(--calcite-color-brand);--calcite-internal-button-text-color: var(--calcite-color-brand);--calcite-internal-button-loader-color: var(--calcite-color-brand)}:host([appearance=outline-fill][kind=brand]) button:hover,:host([appearance=outline-fill][kind=brand]) a:hover{--calcite-internal-button-border-color: var(--calcite-color-brand-hover);--calcite-internal-button-text-color: var(--calcite-color-brand-hover)}:host([appearance=outline-fill][kind=brand]) button:focus,:host([appearance=outline-fill][kind=brand]) a:focus{--calcite-internal-button-border-color: var(--calcite-color-brand);--calcite-internal-button-text-color: var(--calcite-color-brand)}:host([appearance=outline-fill][kind=brand]) button:active,:host([appearance=outline-fill][kind=brand]) a:active{--calcite-internal-button-border-color: var(--calcite-color-brand-press);--calcite-internal-button-text-color: var(--calcite-color-brand-press)}:host([appearance=outline-fill][kind=brand]) button calcite-loader,:host([appearance=outline-fill][kind=brand]) a calcite-loader{--calcite-internal-button-loader-color: var(--calcite-color-brand)}:host([appearance=outline-fill][kind=danger]) button,:host([appearance=outline-fill][kind=danger]) a{--calcite-internal-button-border-color: var(--calcite-color-status-danger);--calcite-internal-button-text-color: var(--calcite-color-status-danger);--calcite-internal-button-loader-color: var(--calcite-color-status-danger)}:host([appearance=outline-fill][kind=danger]) button:hover,:host([appearance=outline-fill][kind=danger]) a:hover{--calcite-internal-button-border-color: var(--calcite-color-status-danger-hover);--calcite-internal-button-text-color: var(--calcite-color-status-danger-hover)}:host([appearance=outline-fill][kind=danger]) button:focus,:host([appearance=outline-fill][kind=danger]) a:focus{--calcite-internal-button-border-color: var(--calcite-color-status-danger);--calcite-internal-button-text-color: var(--calcite-color-status-danger)}:host([appearance=outline-fill][kind=danger]) button:active,:host([appearance=outline-fill][kind=danger]) a:active{--calcite-internal-button-border-color: var(--calcite-color-status-danger-press);--calcite-internal-button-text-color: var(--calcite-color-status-danger-press)}:host([appearance=outline-fill][kind=danger]) button calcite-loader,:host([appearance=outline-fill][kind=danger]) a calcite-loader{--calcite-internal-button-loader-color: var(--calcite-color-status-danger)}:host([appearance=outline-fill][kind=neutral]) button,:host([appearance=outline-fill][kind=neutral]) a{--calcite-internal-button-border-color: var(--calcite-color-border-1);--calcite-internal-button-text-color: var(--calcite-color-text-1);--calcite-internal-button-loader-color: var(--calcite-color-text-1)}:host([appearance=outline-fill][kind=neutral]) button:hover,:host([appearance=outline-fill][kind=neutral]) a:hover{--calcite-internal-button-border-color: var(--calcite-color-border-input)}:host([appearance=outline-fill][kind=neutral]) button:focus,:host([appearance=outline-fill][kind=neutral]) a:focus{--calcite-internal-button-border-color: var(--calcite-color-foreground-3)}:host([appearance=outline-fill][kind=neutral]) button:active,:host([appearance=outline-fill][kind=neutral]) a:active{--calcite-internal-button-border-color: var(--calcite-color-text-3)}:host([appearance=solid][kind=neutral]){--calcite-internal-button-background-color-hover: var(--calcite-color-border-2);--calcite-internal-button-background-color-press: var(--calcite-color-border-1)}:host([appearance=outline-fill][kind=inverse]) button,:host([appearance=outline-fill][kind=inverse]) a{--calcite-internal-button-text-color: var(--calcite-color-text-1);--calcite-internal-button-border-color: var(--calcite-color-inverse);--calcite-internal-button-loader-color: var(--calcite-color-text-1)}:host([appearance=outline-fill][kind=inverse]) button:hover,:host([appearance=outline-fill][kind=inverse]) a:hover{--calcite-internal-button-border-color: var(--calcite-color-inverse-hover)}:host([appearance=outline-fill][kind=inverse]) button:focus,:host([appearance=outline-fill][kind=inverse]) a:focus{--calcite-internal-button-border-color: var(--calcite-color-inverse)}:host([appearance=outline-fill][kind=inverse]) button:active,:host([appearance=outline-fill][kind=inverse]) a:active{--calcite-internal-button-border-color: var(--calcite-color-inverse-press)}:host([appearance=outline]){--calcite-internal-button-background-color: var(--calcite-color-transparent);--calcite-internal-button-background-color-hover: var(--calcite-color-transparent-hover);--calcite-internal-button-background-color-press: var(--calcite-color-transparent-press)}:host([appearance=outline]) button,:host([appearance=outline]) a{border-style:solid;border-width:var(--calcite-button-border-size, 1px)}:host([appearance=outline][kind=brand]) button,:host([appearance=outline][kind=brand]) a{--calcite-internal-button-border-color: var(--calcite-color-brand);--calcite-internal-button-text-color: var(--calcite-color-brand);--calcite-internal-button-loader-color: var(--calcite-color-brand)}:host([appearance=outline][kind=brand]) button:hover,:host([appearance=outline][kind=brand]) a:hover{--calcite-internal-button-border-color: var(--calcite-color-brand-hover);--calcite-internal-button-text-color: var(--calcite-color-brand-hover)}:host([appearance=outline][kind=brand]) button:focus,:host([appearance=outline][kind=brand]) a:focus{--calcite-internal-button-border-color: var(--calcite-color-brand);--calcite-internal-button-text-color: var(--calcite-color-brand)}:host([appearance=outline][kind=brand]) button:active,:host([appearance=outline][kind=brand]) a:active{--calcite-internal-button-border-color: var(--calcite-color-brand-press);--calcite-internal-button-text-color: var(--calcite-color-brand-press)}:host([appearance=outline][kind=brand]) button calcite-loader,:host([appearance=outline][kind=brand]) a calcite-loader{--calcite-internal-button-loader-color: var(--calcite-color-brand)}:host([appearance=outline][kind=danger]) button,:host([appearance=outline][kind=danger]) a{--calcite-internal-button-border-color: var(--calcite-color-status-danger);--calcite-internal-button-text-color: var(--calcite-color-status-danger);--calcite-internal-button-loader-color: var(--calcite-color-status-danger)}:host([appearance=outline][kind=danger]) button:hover,:host([appearance=outline][kind=danger]) a:hover{--calcite-internal-button-border-color: var(--calcite-color-status-danger-hover);--calcite-internal-button-text-color: var(--calcite-color-status-danger-hover)}:host([appearance=outline][kind=danger]) button:focus,:host([appearance=outline][kind=danger]) a:focus{--calcite-internal-button-border-color: var(--calcite-color-status-danger);--calcite-internal-button-text-color: var(--calcite-color-status-danger)}:host([appearance=outline][kind=danger]) button:active,:host([appearance=outline][kind=danger]) a:active{--calcite-internal-button-border-color: var(--calcite-color-status-danger-press);--calcite-internal-button-text-color: var(--calcite-color-status-danger-press)}:host([appearance=outline][kind=danger]) button calcite-loader,:host([appearance=outline][kind=danger]) a calcite-loader{--calcite-internal-button-loader-color: var(--calcite-color-status-danger)}:host([appearance=outline][kind=neutral]) button,:host([appearance=outline][kind=neutral]) a{--calcite-internal-button-text-color: var(--calcite-color-text-1);--calcite-internal-button-border-color: var(--calcite-color-border-1);--calcite-internal-button-loader-color: var(--calcite-color-text-1)}:host([appearance=outline][kind=neutral]) button:hover,:host([appearance=outline][kind=neutral]) a:hover{--calcite-internal-button-border-color: var(--calcite-color-border-input)}:host([appearance=outline][kind=neutral]) button:focus,:host([appearance=outline][kind=neutral]) a:focus{--calcite-internal-button-border-color: var(--calcite-color-foreground-3)}:host([appearance=outline][kind=neutral]) button:active,:host([appearance=outline][kind=neutral]) a:active{--calcite-internal-button-border-color: var(--calcite-color-text-3)}:host([appearance=outline][kind=inverse]) button,:host([appearance=outline][kind=inverse]) a{--calcite-internal-button-text-color: var(--calcite-color-text-1);--calcite-internal-button-border-color: var(--calcite-color-inverse);--calcite-internal-button-loader-color: var(--calcite-color-text-1)}:host([appearance=outline][kind=inverse]) button:hover,:host([appearance=outline][kind=inverse]) a:hover{--calcite-internal-button-border-color: var(--calcite-color-inverse-hover)}:host([appearance=outline][kind=inverse]) button:focus,:host([appearance=outline][kind=inverse]) a:focus{--calcite-internal-button-border-color: var(--calcite-color-inverse)}:host([appearance=outline][kind=inverse]) button:active,:host([appearance=outline][kind=inverse]) a:active{--calcite-internal-button-border-color: var(--calcite-color-inverse-press)}:host([appearance=outline-fill][split-child=primary]) button,:host([appearance=outline][split-child=primary]) button,:host([appearance=outline-fill][split-child=primary]) a,:host([appearance=outline][split-child=primary]) a{border-inline-end-width:0;border-inline-start-width:1px}:host([appearance=outline-fill][split-child=secondary]) button,:host([appearance=outline][split-child=secondary]) button,:host([appearance=outline-fill][split-child=secondary]) a,:host([appearance=outline][split-child=secondary]) a{border-inline-start-width:0;border-inline-end-width:1px}:host([appearance=transparent]){--calcite-internal-button-background-color: var(--calcite-color-transparent);--calcite-internal-button-background-color-hover: var(--calcite-color-transparent-hover);--calcite-internal-button-background-color-press: var(--calcite-color-transparent-press)}:host([appearance=transparent]:not(.enable-editing-button)){--calcite-internal-button-background-color-hover: var(--calcite-color-transparent-hover);--calcite-internal-button-background-color-press: var(--calcite-color-transparent-press)}:host([appearance=transparent][kind=brand]) button,:host([appearance=transparent][kind=brand]) a{--calcite-internal-button-text-color: var(--calcite-color-brand);--calcite-internal-button-loader-color: var(--calcite-color-brand)}:host([appearance=transparent][kind=brand]) button:hover,:host([appearance=transparent][kind=brand]) a:hover{--calcite-internal-button-text-color: var(--calcite-color-brand-hover)}:host([appearance=transparent][kind=brand]) button:focus,:host([appearance=transparent][kind=brand]) a:focus{--calcite-internal-button-text-color: var(--calcite-color-brand)}:host([appearance=transparent][kind=brand]) button:active,:host([appearance=transparent][kind=brand]) a:active{--calcite-internal-button-text-color: var(--calcite-color-brand-press)}:host([appearance=transparent][kind=brand]) button calcite-loader,:host([appearance=transparent][kind=brand]) a calcite-loader{--calcite-internal-button-loader-color: var(--calcite-color-brand)}:host([appearance=transparent][kind=danger]) button,:host([appearance=transparent][kind=danger]) a{--calcite-internal-button-text-color: var(--calcite-color-status-danger);--calcite-internal-button-loader-color: var(--calcite-color-status-danger)}:host([appearance=transparent][kind=danger]) button:hover,:host([appearance=transparent][kind=danger]) a:hover{--calcite-internal-button-text-color: var(--calcite-color-status-danger-hover)}:host([appearance=transparent][kind=danger]) button:focus,:host([appearance=transparent][kind=danger]) a:focus{--calcite-internal-button-text-color: var(--calcite-color-status-danger)}:host([appearance=transparent][kind=danger]) button:active,:host([appearance=transparent][kind=danger]) a:active{--calcite-internal-button-text-color: var(--calcite-color-status-danger-press)}:host([appearance=transparent][kind=danger]) button calcite-loader,:host([appearance=transparent][kind=danger]) a calcite-loader{--calcite-internal-button-loader-color: var(--calcite-color-status-danger)}:host([appearance=transparent][kind=neutral]:not(.cancel-editing-button)) button,:host([appearance=transparent][kind=neutral]:not(.cancel-editing-button)) a,:host([appearance=transparent][kind=neutral]:not(.cancel-editing-button)) calcite-loader{--calcite-internal-button-text-color: var(--calcite-color-text-1)}:host([appearance=transparent][kind=neutral].cancel-editing-button) button{--calcite-internal-button-text-color: var(--calcite-color-text-3)}:host([appearance=transparent][kind=neutral].cancel-editing-button) button:hover{--calcite-internal-button-text-color: var(--calcite-color-text-1);--calcite-internal-button-padding-y: 0}:host(.confirm-changes-button) button:focus,:host(.cancel-editing-button) button:focus,:host(.enable-editing-button) button:focus{outline-offset:-2px}:host([appearance=transparent][kind=inverse]){--calcite-internal-button-background-color-hover: var(--calcite-color-transparent-hover);--calcite-internal-button-background-color-press: var(--calcite-color-transparent-press)}:host([appearance=transparent][kind=inverse]) button calcite-loader,:host([appearance=transparent][kind=inverse]) a calcite-loader{--calcite-internal-button-text-color: var(--calcite-color-text-inverse)}:host([scale=s]) button.content--slotted,:host([scale=s]) a.content--slotted{font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm)}:host([scale=s][appearance=transparent]) button.content--slotted,:host([scale=s][appearance=transparent]) a.content--slotted{--calcite-internal-button-padding-x: .5rem}:host([scale=s]) button,:host([scale=s]) a{--calcite-internal-button-padding-y: 3px}:host([scale=m]) button.content--slotted,:host([scale=m]) a.content--slotted{--calcite-internal-button-padding-x: 11px;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base)}:host([scale=m]) button,:host([scale=m]) a{--calcite-internal-button-padding-y: 7px}:host([scale=m][appearance=transparent]) button.content--slotted,:host([scale=m][appearance=transparent]) a.content--slotted{--calcite-internal-button-padding-x: .75rem}:host([scale=l]) button.content--slotted,:host([scale=l]) a.content--slotted{--calcite-internal-button-padding-x: 15px;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md)}:host([scale=l]) .button-padding{--calcite-internal-button-padding-x: 1rem;--calcite-internal-button-padding-y: 11px}:host([scale=l]) .button-padding--shrunk{--calcite-internal-button-padding-y: 9px}:host([scale=s]) button:not(.content--slotted),:host([scale=s]) a:not(.content--slotted){--calcite-internal-button-padding-x: .125rem;--calcite-internal-button-padding-y: 3px;inline-size:1.5rem;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md);min-block-size:1.5rem}:host([scale=m]) button:not(.content--slotted),:host([scale=m]) a:not(.content--slotted){--calcite-internal-button-padding-x: .125rem;--calcite-internal-button-padding-y: 7px;inline-size:2rem;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md);min-block-size:2rem}:host([scale=l]) button:not(.content--slotted),:host([scale=l]) a:not(.content--slotted){--calcite-internal-button-padding-x: .125rem;--calcite-internal-button-padding-y: 9px;inline-size:2.75rem;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md);min-block-size:2.75rem}:host(:is([scale=s],[scale=m],[scale=l])[width=full]) a:not(.content--slotted),:host(:is([scale=s],[scale=m],[scale=l])[width=full]) button:not(.content--slotted){inline-size:var(--calcite-container-size-content-fluid)}:host([scale=l][appearance=transparent]) button:not(.content--slotted),:host([scale=l][appearance=transparent]) a:not(.content--slotted){--calcite-internal-button-padding-y: .625rem}:host([scale=s][icon-start][icon-end]) button:not(.content--slotted),:host([scale=s][icon-start][icon-end]) a:not(.content--slotted){--calcite-internal-button-padding-x: 23px;block-size:1.5rem;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md)}:host([scale=s][icon-start][icon-end][appearance=transparent]) button:not(.content--slotted),:host([scale=s][icon-start][icon-end][appearance=transparent]) a:not(.content--slotted){--calcite-internal-button-padding-x: 1.5rem}:host([scale=m][icon-start][icon-end]) button:not(.content--slotted),:host([scale=m][icon-start][icon-end]) a:not(.content--slotted){--calcite-internal-button-padding-x: 2rem;block-size:2rem;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md)}:host([scale=m][icon-start][icon-end][appearance=transparent]) button:not(.content--slotted),:host([scale=m][icon-start][icon-end][appearance=transparent]) a:not(.content--slotted){--calcite-internal-button-padding-x: 33px}:host([scale=l][icon-start][icon-end]) button:not(.content--slotted),:host([scale=l][icon-start][icon-end]) a:not(.content--slotted){--calcite-internal-button-padding-x: 43px;block-size:2.75rem;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md)}:host([scale=l][icon-start][icon-end]) button:not(.content--slotted) .icon--start+.icon--end,:host([scale=l][icon-start][icon-end]) a:not(.content--slotted) .icon--start+.icon--end{margin-inline-start:1rem}:host([scale=l][icon-start][icon-end][appearance=transparent]) button:not(.content--slotted),:host([scale=l][icon-start][icon-end][appearance=transparent]) a:not(.content--slotted){--calcite-internal-button-padding-x: 2.75rem}:host([hidden]){display:none}[hidden]{display:none}`;
const _Button = class _Button extends LitElement {
  constructor() {
    super(...arguments);
    this.attributeWatch = useWatchAttributes(["aria-expanded"], this.handleGlobalAttributesChanged);
    this.contentRef = e();
    this.mutationObserver = createObserver();
    this.resizeObserver = createObserver();
    this.focusSetter = useSetFocus()(this);
    this.messages = useT9n();
    this.interactiveContainer = useInteractive(this);
    this.hasContent = false;
    this.alignment = "center";
    this.appearance = "solid";
    this.disabled = false;
    this.download = false;
    this.kind = "brand";
    this.loading = false;
    this.round = false;
    this.scale = "m";
    this.splitChild = false;
    this.type = "button";
    this.width = "auto";
  }
  async setFocus(options) {
    return this.focusSetter(() => this.childEl, options);
  }
  connectedCallback() {
    super.connectedCallback();
    this.setupTextContentObserver();
    connectLabel(this);
    this.formEl = findAssociatedForm(this);
  }
  async load() {
  }
  loaded() {
    this.setTooltipText();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.mutationObserver?.disconnect();
    disconnectLabel(this);
    this.resizeObserver?.disconnect();
    this.formEl = null;
  }
  handleGlobalAttributesChanged() {
    this.requestUpdate();
  }
  updateHasContent() {
    this.hasContent = hasVisibleContent(this.el);
  }
  setupTextContentObserver() {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }
  onLabelClick() {
    this.handleClick();
    this.setFocus();
  }
  handleClick() {
    const { type } = this;
    if (this.href) {
      return;
    }
    if (type === "submit") {
      submitForm(this);
    } else if (type === "reset") {
      resetForm(this);
    }
  }
  setTooltipText() {
    const { contentRef: { value: contentEl } } = this;
    if (contentEl) {
      this.tooltipText = contentEl.offsetWidth < contentEl.scrollWidth ? this.el.innerText || null : null;
    }
  }
  setChildEl(el) {
    updateRefObserver(this.resizeObserver, this.childEl, el);
    this.childEl = el;
  }
  render() {
    const childElType = this.href ? "a" : "button";
    const DynamicHtmlTag = this.href ? i$1`a` : i$1`button`;
    const loaderNode = this.loading ? T`<div class=${safeClassMap(CSS$m.buttonLoader)}><calcite-loader class=${safeClassMap(this.loading ? CSS$m.loadingIn : CSS$m.loadingOut)} inline .label=${this.messages.loading} .scale=${this.scale === "l" ? "m" : "s"}></calcite-loader></div>` : null;
    const noStartEndIcons = !this.iconStart && !this.iconEnd;
    const iconStartEl = T`<calcite-icon class=${safeClassMap({ [CSS$m.icon]: true, [CSS$m.iconStart]: true })} .flipRtl=${this.iconFlipRtl === "start" || this.iconFlipRtl === "both"} .icon=${this.iconStart} .scale=${getIconScale(this.scale)}></calcite-icon>`;
    const iconEndEl = T`<calcite-icon class=${safeClassMap({ [CSS$m.icon]: true, [CSS$m.iconEnd]: true })} .flipRtl=${this.iconFlipRtl === "end" || this.iconFlipRtl === "both"} .icon=${this.iconEnd} .scale=${getIconScale(this.scale)}></calcite-icon>`;
    const contentEl = T`<span class=${safeClassMap(CSS$m.content)} ${n(this.contentRef)}><slot></slot></span>`;
    return this.interactiveContainer({ disabled: this.disabled, children: u`<${DynamicHtmlTag} .ariaBusy=${this.loading} .ariaExpanded=${this.el.ariaExpanded ? this.el.ariaExpanded : null} .ariaLabel=${!this.loading ? getLabelText(this) : this.messages.loading} aria-live=polite class=${safeClassMap({
      [CSS$m.buttonPadding]: noStartEndIcons,
      [CSS$m.buttonPaddingShrunk]: !noStartEndIcons,
      [CSS$m.contentSlotted]: this.hasContent,
      [CSS$m.iconStartEmpty]: !this.iconStart,
      [CSS$m.iconEndEmpty]: !this.iconEnd
    })} .disabled=${childElType === "button" ? this.disabled : null} download=${(childElType === "a" ? this.download === true || this.download === "" ? "" : this.download || null : null) ?? A} href=${(childElType === "a" && this.href) ?? A} name=${(childElType === "button" && this.name) ?? A} @click=${this.handleClick} rel=${(childElType === "a" && this.rel) ?? A} tabindex=${(this.disabled ? -1 : null) ?? A} target=${(childElType === "a" && this.target) ?? A} title=${this.tooltipText ?? A} type=${(childElType === "button" ? this.type : null) ?? A} ${n(this.setChildEl)}>${loaderNode}${this.iconStart ? iconStartEl : null}${this.hasContent ? contentEl : null}${this.iconEnd ? iconEndEl : null}</${DynamicHtmlTag}>` });
  }
};
_Button.properties = { hasContent: [16, {}, { state: true }], tooltipText: [16, {}, { state: true }], alignment: [3, {}, { reflect: true }], appearance: [3, {}, { reflect: true }], disabled: [7, {}, { reflect: true, type: Boolean }], download: [3, { converter: stringOrBoolean }, { reflect: true }], form: [3, {}, { reflect: true }], href: [3, {}, { reflect: true }], iconEnd: [3, { type: String }, { reflect: true }], iconFlipRtl: [3, {}, { reflect: true }], iconStart: [3, { type: String }, { reflect: true }], kind: [3, {}, { reflect: true }], label: 1, loading: [7, {}, { reflect: true, type: Boolean }], messageOverrides: [0, {}, { attribute: false }], name: [3, {}, { reflect: true }], rel: [3, {}, { reflect: true }], round: [7, {}, { reflect: true, type: Boolean }], scale: [3, {}, { reflect: true }], splitChild: [3, {}, { reflect: true }], target: [3, {}, { reflect: true }], type: [3, {}, { reflect: true }], width: [3, {}, { reflect: true }] };
_Button.styles = styles$j;
let Button = _Button;
customElement("calcite-button", Button);
const index$i = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Button
});
const CSS$l = {
  button: "button",
  buttonTextVisible: "button--text-visible",
  buttonCompact: "button--compact",
  indicatorText: "indicator-text",
  iconContainer: "icon-container",
  slotContainer: "slot-container",
  slotContainerHidden: "slot-container--hidden",
  textContainer: "text-container",
  textContainerVisible: "text-container--visible",
  indicatorWithIcon: "indicator-with-icon",
  indicatorWithoutIcon: "indicator-without-icon"
};
const prefixId = "calcite-action";
const IDS$3 = {
  button: (id) => `${prefixId}-${id}-button`,
  indicator: (id) => `${prefixId}-${id}-indicator`
};
function isAction(el) {
  return el?.tagName === "CALCITE-ACTION";
}
const styles$i = i`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]){--calcite-internal-action-font-size: var(--calcite-font-size--2);--calcite-internal-action-height: var(--calcite-size-sm);--calcite-internal-action-line-height: 1rem;--calcite-internal-action-spacing: var(--calcite-spacing-xxs)}:host([scale=m]){--calcite-internal-action-font-size: var(--calcite-font-size--1);--calcite-internal-action-height: var(--calcite-size-md);--calcite-internal-action-line-height: 1rem;--calcite-internal-action-spacing: var(--calcite-spacing-sm)}:host([scale=l]){--calcite-internal-action-font-size: var(--calcite-font-size-0);--calcite-internal-action-height: var(--calcite-size-lg);--calcite-internal-action-line-height: 1.25rem;--calcite-internal-action-spacing: var(--calcite-spacing-sm-plus)}:host{display:flex;cursor:pointer;background-color:transparent;--calcite-internal-action-text-color: var(--calcite-color-text-3);border-radius:var(--calcite-action-corner-radius, var(--calcite-action-corner-radius-start-start, var(--calcite-corner-radius-xs)) var(--calcite-action-corner-radius-start-end, var(--calcite-corner-radius-xs)) var(--calcite-action-corner-radius-end-end, var(--calcite-corner-radius-xs)) var(--calcite-action-corner-radius-end-start, var(--calcite-corner-radius-xs)))}.interaction-container{border-radius:inherit}:host([width=full]){flex:1 0 auto}:host([width=full]) .button{justify-content:center}:host([width=full]) .button .text-container--visible{flex:none}:host([drag-handle]){cursor:move;--calcite-internal-action-text-color: var(--calcite-color-border-input);--calcite-internal-action-padding-inline: var(--calcite-spacing-xxs)}.button{position:relative;margin:0;display:flex;inline-size:auto;align-items:center;justify-content:flex-start;border-style:none;outline-color:transparent;background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-1));border-radius:inherit;color:var(--calcite-action-text-color, var(--calcite-internal-action-text-color));cursor:inherit;flex:1 0 auto;font-family:inherit;font-size:var(--calcite-internal-action-font-size);font-weight:var(--calcite-font-weight-normal);line-height:var(--calcite-internal-action-line-height);min-block-size:var(--calcite-internal-action-height);padding-block:var(--calcite-internal-action-padding-block, var(--calcite-internal-action-spacing));padding-inline:var(--calcite-internal-action-padding-inline, var(--calcite-internal-action-spacing));text-align:start}.button:hover{background-color:var(--calcite-action-background-color-hover, var(--calcite-color-foreground-2));color:var(--calcite-action-text-color-press, var(--calcite-action-text-color-pressed, var(--calcite-color-text-1)))}.button:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.button:active{background-color:var(--calcite-action-background-color-press, var(--calcite-action-background-color-pressed, var(--calcite-color-foreground-3)))}.button--text-visible{gap:var(--calcite-internal-action-spacing);inline-size:100%}.icon-container{pointer-events:none;margin:0;display:flex;align-items:center;justify-content:center}.text-container{margin:0;inline-size:0px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;opacity:0;transition-property:opacity;transition-duration:var(--calcite-animation-timing);transition-timing-function:cubic-bezier(.4,0,.2,1);transition-property:inline-size}.text-container--visible{inline-size:auto;flex:1 1 auto;opacity:1}:host([active]) .button{background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-3));color:var(--calcite-action-text-color-press, var(--calcite-action-text-color-pressed, var(--calcite-color-text-1)))}:host([active]) .button:hover{background-color:var(--calcite-action-background-color-hover, var(--calcite-color-foreground-3))}:host([active]) .button:active{background-color:var(--calcite-action-background-color-press, var(--calcite-action-background-color-pressed, var(--calcite-color-foreground-3)))}:host([loading]) .button:hover,:host([loading]) .button:focus{background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-1))}:host([loading]) calcite-loader[inline]{margin-inline-end:0px}:host([appearance=transparent]):host([active]) .button{background-color:var(--calcite-action-background-color-press, var(--calcite-action-background-color-pressed, var(--calcite-color-transparent-press)))}:host([appearance=transparent]) .button{transition-property:box-shadow;transition-duration:var(--calcite-animation-timing);transition-timing-function:cubic-bezier(.4,0,.2,1);background-color:var(--calcite-action-background-color, var(--calcite-color-transparent))}:host([appearance=transparent]) .button:hover{background-color:var(--calcite-action-background-color-hover, var(--calcite-color-transparent-hover))}:host([appearance=transparent]) .button:active{background-color:var(--calcite-action-background-color-press, var(--calcite-action-background-color-pressed, var(--calcite-color-transparent-press)))}:host([selection-appearance=highlight]):host([active]) .button{background-color:var(--calcite-color-surface-highlight);color:var(--calcite-color-text-highlight)}:host([active-descendant]) .button{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([alignment=center]) .button{justify-content:center}:host([alignment=end]) .button{justify-content:flex-end}:host([alignment=center]) .button .text-container--visible,:host([alignment=end]) .button .text-container--visible{flex:0 1 auto}:host([scale=s][compact]) .button,:host([scale=m][compact]) .button,:host([scale=l][compact]) .button{padding-inline:0px}.slot-container{display:flex}.slot-container--hidden{display:none}.indicator-with-icon{position:relative}.indicator-with-icon:after{content:"";position:absolute;block-size:.5rem;inline-size:.5rem;border-radius:9999px;inset-block-end:-.275rem;inset-inline-end:-.275rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand))}.indicator-without-icon{margin-inline:.25rem;inline-size:1rem;position:relative}.indicator-without-icon:after{content:"";position:absolute;block-size:.5rem;inline-size:.5rem;border-radius:9999px;inset-block-end:-.275rem;inset-inline-end:-.275rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand))}:host([scale=s]) .indicator-with-icon{position:relative}:host([scale=s]) .indicator-with-icon:after{content:"";position:absolute;block-size:.5rem;inline-size:.5rem;border-radius:9999px;inset-block-end:-.125rem;inset-inline-end:-.125rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand));block-size:.375rem;inline-size:.375rem}:host([scale=s]) .indicator-without-icon{position:relative}:host([scale=s]) .indicator-without-icon:after{content:"";position:absolute;block-size:.5rem;inline-size:.5rem;border-radius:9999px;inset-block-end:-.175rem;inset-inline-end:-.175rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand));block-size:.375rem;inline-size:.375rem}.indicator-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
const _Action = class _Action extends LitElement {
  constructor() {
    super(...arguments);
    this.guid = guid();
    this.buttonRef = e();
    this.buttonId = IDS$3.button(this.guid);
    this.mutationObserver = createObserver();
    this.messages = useT9n({ blocking: true });
    this.focusSetter = useSetFocus()(this);
    this.indicatorRef = e();
    this.interactiveContainer = useInteractive(this);
    this.active = false;
    this.activeDescendant = false;
    this.appearance = "transparent";
    this.compact = false;
    this.disabled = false;
    this.dragHandle = false;
    this.iconFlipRtl = false;
    this.indicator = false;
    this.loading = false;
    this.scale = "m";
    this.width = "auto";
    this.textEnabled = false;
    this.type = "button";
  }
  async setFocus(options) {
    return this.focusSetter(() => this.buttonRef.value, options);
  }
  connectedCallback() {
    super.connectedCallback();
    this.formEl = findAssociatedForm(this);
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.formEl = null;
    this.mutationObserver?.disconnect();
  }
  handleClick() {
    const { type } = this;
    if (type === "submit") {
      submitForm(this);
    } else if (type === "reset") {
      resetForm(this);
    }
  }
  renderTextContainer() {
    const { text, textEnabled } = this;
    const textContainerClasses = {
      [CSS$l.textContainer]: true,
      [CSS$l.textContainerVisible]: textEnabled
    };
    return text ? i$2("text-container", T`<div class=${safeClassMap(textContainerClasses)}>${text}</div>`) : null;
  }
  renderIndicatorText() {
    const { indicator, messages, buttonId } = this;
    return T`<div aria-labelledby=${buttonId ?? nothing} aria-live=polite class=${safeClassMap(CSS$l.indicatorText)} role=region ${n(this.indicatorRef)}>${indicator ? messages.indicator : null}</div>`;
  }
  renderIconContainer() {
    const { loading, icon, scale, el, iconFlipRtl, indicator } = this;
    const loaderScale = scale === "l" ? "l" : "m";
    const calciteLoaderNode = loading ? T`<calcite-loader inline .label=${this.messages.loading} .scale=${loaderScale}></calcite-loader>` : null;
    const calciteIconNode = icon ? T`<calcite-icon class=${safeClassMap({ [CSS$l.indicatorWithIcon]: indicator })} .flipRtl=${iconFlipRtl} .icon=${icon} .scale=${getIconScale(this.scale)}></calcite-icon>` : null;
    const iconNode = calciteLoaderNode || calciteIconNode;
    const hasIconToDisplay = iconNode || el.children?.length;
    const slotContainerNode = T`<div class=${safeClassMap({
      [CSS$l.slotContainer]: true,
      [CSS$l.slotContainerHidden]: loading
    })}><slot></slot></div>`;
    return hasIconToDisplay ? i$2("icon-container", T`<div aria-hidden=true class=${safeClassMap(CSS$l.iconContainer)}>${iconNode}${slotContainerNode}</div>`) : null;
  }
  renderButton() {
    const { compact, disabled, icon, loading, textEnabled, label, text, indicator, indicatorRef, buttonId, messages } = this;
    const labelFallback = label || text || "";
    const ariaLabel = indicator ? messages.indicatorLabel.replace("{label}", labelFallback) : labelFallback;
    const buttonClasses = {
      [CSS$l.button]: true,
      [CSS$l.buttonTextVisible]: textEnabled,
      [CSS$l.buttonCompact]: compact
    };
    const buttonContent = T`${this.renderIconContainer()}${this.renderTextContainer()}${!icon && indicator && i$2("indicator-no-icon", T`<div class=${safeClassMap(CSS$l.indicatorWithoutIcon)}></div>`) || ""}`;
    const internalControlsElements = indicator && indicatorRef.value ? [indicatorRef.value] : [];
    const ariaControlsElements = [
      ...this.aria?.controlsElements ?? [],
      ...internalControlsElements
    ];
    if (this.dragHandle) {
      return T`<span .ariaBusy=${loading} .ariaControlsElements=${ariaControlsElements} .ariaDescribedByElements=${this.aria?.describedByElements} .ariaExpanded=${this.aria?.expanded} .ariaHasPopup=${this.aria?.hasPopup} .ariaLabel=${ariaLabel} .ariaLabelledByElements=${this.aria?.labelledByElements} .ariaOwnsElements=${this.aria?.ownsElements} .ariaPressed=${this.aria?.pressed} class=${safeClassMap(buttonClasses)} id=${buttonId ?? nothing} role=button tabindex=${(this.disabled ? null : 0) ?? nothing} ${n(this.buttonRef)}>${buttonContent}</span>`;
    }
    return T`<button .ariaBusy=${loading} .ariaChecked=${this.aria?.checked} .ariaControlsElements=${ariaControlsElements} .ariaDescribedByElements=${this.aria?.describedByElements} .ariaExpanded=${this.aria?.expanded} .ariaHasPopup=${this.aria?.hasPopup} .ariaLabel=${ariaLabel} .ariaLabelledByElements=${this.aria?.labelledByElements} .ariaOwnsElements=${this.aria?.ownsElements} .ariaPressed=${this.aria?.pressed} class=${safeClassMap(buttonClasses)} .disabled=${disabled} id=${buttonId ?? nothing} @click=${this.handleClick} .role=${this.aria?.role} ${n(this.buttonRef)}>${buttonContent}</button>`;
  }
  render() {
    return this.interactiveContainer({ disabled: this.disabled, children: T`${this.renderButton()}${this.renderIndicatorText()}` });
  }
};
_Action.properties = { aria: [0, {}, { attribute: false }], active: [7, {}, { reflect: true, type: Boolean }], activeDescendant: [7, {}, { reflect: true, type: Boolean }], alignment: [3, {}, { reflect: true }], appearance: [3, {}, { reflect: true }], compact: [7, {}, { reflect: true, type: Boolean }], disabled: [7, {}, { reflect: true, type: Boolean }], dragHandle: [7, {}, { reflect: true, type: Boolean }], form: [3, {}, { reflect: true }], icon: [3, { type: String }, { reflect: true }], iconFlipRtl: [7, {}, { reflect: true, type: Boolean }], indicator: [7, {}, { reflect: true, type: Boolean }], label: 1, loading: [7, {}, { reflect: true, type: Boolean }], messageOverrides: [0, {}, { attribute: false }], scale: [3, {}, { reflect: true }], width: [3, {}, { reflect: true }], text: 1, textEnabled: [7, {}, { reflect: true, type: Boolean }], type: [3, {}, { reflect: true }], selectionAppearance: [3, {}, { reflect: true }] };
_Action.styles = styles$i;
let Action = _Action;
customElement("calcite-action", Action);
const index$h = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Action
});
function roundByDPR(value) {
  const dpr = window.devicePixelRatio || 1;
  return Math.round(value * dpr) / dpr;
}
const positionFloatingUI = (
  /* we export arrow function to allow us to spy on it during testing */
  (async (component, {
    referenceEl,
    floatingEl,
    overlayPositioning = "absolute",
    placement,
    flipDisabled,
    flipPlacements: flipPlacements2,
    offsetDistance,
    offsetSkidding,
    arrowEl,
    type
  }) => {
    if (!referenceEl || !floatingEl) {
      return;
    }
    const isRTL = getElementDir(floatingEl) === "rtl";
    const {
      x,
      y,
      placement: effectivePlacement,
      strategy: position,
      middlewareData
    } = await computePosition(referenceEl, floatingEl, {
      strategy: overlayPositioning,
      placement: placement === "auto" || placement === "auto-start" || placement === "auto-end" ? void 0 : getEffectivePlacement(placement, isRTL),
      middleware: getMiddleware({
        placement,
        flipDisabled,
        flipPlacements: flipPlacements2?.map((placement2) => getEffectivePlacement(placement2, isRTL)),
        offsetDistance,
        offsetSkidding,
        arrowEl,
        type
      })
    });
    if (arrowEl && middlewareData.arrow) {
      const { x: x2, y: y2 } = middlewareData.arrow;
      const side = effectivePlacement.split("-")[0];
      const alignment = x2 != null ? "left" : "top";
      const transform = ARROW_CSS_TRANSFORM[side];
      const reset = { left: "", top: "", bottom: "", right: "" };
      if ("floatingLayout" in component) {
        component.floatingLayout = side === "left" || side === "right" ? "horizontal" : "vertical";
      }
      Object.assign(arrowEl.style, {
        ...reset,
        [alignment]: `${alignment == "left" ? x2 : y2}px`,
        [side]: "100%",
        transform
      });
    }
    const referenceHidden = middlewareData.hide?.referenceHidden;
    const visibility = referenceHidden ? "hidden" : null;
    const pointerEvents = visibility ? "none" : null;
    floatingEl.setAttribute(placementDataAttribute, effectivePlacement);
    Object.assign(floatingEl.style, {
      pointerEvents,
      position,
      transform: `translate(${roundByDPR(x)}px,${roundByDPR(y)}px)`,
      visibility
    });
  })
);
const placementDataAttribute = "data-placement";
const flipPlacements = [
  "top",
  "bottom",
  "right",
  "left",
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
  "right-start",
  "right-end",
  "left-start",
  "left-end",
  "leading",
  "trailing",
  "leading-start",
  "leading-end",
  "trailing-start",
  "trailing-end"
];
const defaultMenuPlacement = "bottom-start";
const FloatingCSS = {
  animation: "calcite-floating-ui-anim",
  animationActive: "calcite-floating-ui-anim--active"
};
function getMiddleware({
  placement,
  flipDisabled,
  flipPlacements: flipPlacements2,
  offsetDistance,
  offsetSkidding,
  arrowEl,
  type
}) {
  const middleware = [shift(), hide()];
  if (type === "menu") {
    middleware.push(
      flip({
        fallbackPlacements: flipPlacements2 || ["top-start", "top", "top-end", "bottom-start", "bottom", "bottom-end"]
      })
    );
  }
  middleware.push(
    offset({
      mainAxis: typeof offsetDistance === "number" ? offsetDistance : 0,
      crossAxis: typeof offsetSkidding === "number" ? offsetSkidding : 0
    })
  );
  if (placement === "auto" || placement === "auto-start" || placement === "auto-end") {
    middleware.push(
      autoPlacement({ alignment: placement === "auto-start" ? "start" : placement === "auto-end" ? "end" : null })
    );
  } else if (!flipDisabled) {
    middleware.push(flip(flipPlacements2 ? { fallbackPlacements: flipPlacements2 } : {}));
  }
  if (arrowEl) {
    middleware.push(
      arrow({
        element: arrowEl
      })
    );
  }
  return middleware;
}
function isFlipPlacement(placement) {
  return flipPlacements.includes(placement);
}
function filterValidFlipPlacements(placements2, el) {
  const filteredPlacements = placements2.filter(isFlipPlacement);
  if (filteredPlacements.length !== placements2.length) {
    console.warn(
      `${el.tagName}: Invalid value found in: flipPlacements. Try any of these: ${flipPlacements.map((placement) => `"${placement}"`).join(", ").trim()}`,
      { el }
    );
  }
  return filteredPlacements;
}
function getEffectivePlacement(placement, isRTL = false) {
  const placements2 = ["left", "right"];
  if (isRTL) {
    placements2.reverse();
  }
  return placement.replace(/leading/gi, placements2[0]).replace(/trailing/gi, placements2[1]);
}
async function reposition(component, options, delayed = false) {
  if (!component.open || !options.floatingEl || !options.referenceEl) {
    return;
  }
  Object.assign(options.floatingEl.style, {
    display: "block",
    inset: "unset",
    // initial positioning based on https://floating-ui.com/docs/computePosition#initial-layout
    left: "0",
    position: options.overlayPositioning ?? "absolute",
    top: "0"
  });
  const trackedState = autoUpdatingComponentMap.get(component);
  if (!trackedState) {
    return runAutoUpdate(component);
  }
  const positionFunction = delayed ? getDebouncedReposition(component) : positionFloatingUI;
  await positionFunction(component, options);
}
function getDebouncedReposition(component) {
  let debounced = componentToDebouncedRepositionMap.get(component);
  if (debounced) {
    return debounced;
  }
  debounced = debounce(positionFloatingUI, DEBOUNCE.reposition, {
    edges: ["leading", "trailing"]
  });
  componentToDebouncedRepositionMap.set(component, debounced);
  return debounced;
}
const ARROW_CSS_TRANSFORM = {
  top: "",
  left: "rotate(-90deg)",
  bottom: "rotate(180deg)",
  right: "rotate(90deg)"
};
const autoUpdatingComponentMap = /* @__PURE__ */ new WeakMap();
const componentToDebouncedRepositionMap = /* @__PURE__ */ new WeakMap();
async function runAutoUpdate(component) {
  const { referenceEl, floatingEl } = component;
  if (!floatingEl.isConnected) {
    return;
  }
  const effectiveAutoUpdate = (_refEl, _floatingEl, updateCallback) => {
    updateCallback();
    return () => {
    };
  };
  autoUpdatingComponentMap.set(component, { state: "pending" });
  let repositionPromise;
  const cleanUp = effectiveAutoUpdate(
    referenceEl,
    floatingEl,
    // callback is invoked immediately
    () => {
      const promise = component.reposition();
      if (!repositionPromise) {
        repositionPromise = promise;
      }
    }
  );
  autoUpdatingComponentMap.set(component, { state: "active", cleanUp });
  return repositionPromise;
}
function hideFloatingUI(component) {
  const { floatingEl } = component;
  if (!floatingEl) {
    return;
  }
  Object.assign(floatingEl.style, {
    display: "",
    left: "",
    pointerEvents: "",
    position: "",
    top: "",
    transform: "",
    visibility: ""
  });
}
async function connectFloatingUI(component) {
  const { floatingEl, referenceEl } = component;
  hideFloatingUI(component);
  if (!floatingEl || !referenceEl) {
    return;
  }
  disconnectFloatingUI(component);
  if (!component.open) {
    return;
  }
  return runAutoUpdate(component);
}
function disconnectFloatingUI(component) {
  const trackedState = autoUpdatingComponentMap.get(component);
  if (trackedState?.state === "active") {
    trackedState.cleanUp();
  }
  autoUpdatingComponentMap.delete(component);
  componentToDebouncedRepositionMap.get(component)?.cancel();
  componentToDebouncedRepositionMap.delete(component);
}
const visiblePointerSize = 4;
const defaultOffsetDistance = Math.ceil(Math.hypot(visiblePointerSize, visiblePointerSize));
function isOpen(component) {
  return component[component.openProp || "open"];
}
async function toggleOpenClose(component) {
  await component.updateComplete;
  if (isOpen(component)) {
    component.onBeforeOpen();
  } else {
    component.onBeforeClose();
  }
  await component.updateComplete;
  const transitionNode = hasRef(component) ? component.transitionRef.value : component.transitionEl;
  if (transitionNode) {
    await whenTransitionDone(transitionNode, component.transitionProp);
  }
  if (isOpen(component)) {
    component.onOpen();
  } else {
    component.onClose();
  }
}
function hasRef(component) {
  return !!component.transitionRef;
}
const CSS$k = {
  arrow: "calcite-floating-ui-arrow",
  arrowStroke: "calcite-floating-ui-arrow__stroke"
};
const DEFAULTS = {
  width: 12,
  height: 6,
  strokeWidth: 1
};
const FloatingArrow = ({ floatingLayout, key, ref: ref$1 }) => {
  const { width, height, strokeWidth } = DEFAULTS;
  const svgX = width / 2;
  const isVertical = floatingLayout === "vertical";
  const dValue = `M0,0 H${width} L${width - svgX},${height} Q${svgX},${height} ${svgX},${height} Z`;
  return i$2(key, T`<svg aria-hidden=true class=${safeClassMap(CSS$k.arrow)} height=${width} viewBox=${`0 0 ${width} ${width + (!isVertical ? strokeWidth : 0)}`} width=${width + (isVertical ? strokeWidth : 0)} ${n(ref$1)}>${b`${b`<path class=${safeClassMap(CSS$k.arrowStroke)} d=${dValue ?? A} fill=none stroke-width=${strokeWidth + 1} />` || ""}<path d=${dValue ?? A} stroke=none />`}</svg>`);
};
function getEffectiveContainerElements(targetEl, { focusTrapOptions }, extraContainers) {
  if (!focusTrapOptions?.extraContainers && !extraContainers) {
    return targetEl;
  }
  return [targetEl, ...toContainerArray(focusTrapOptions?.extraContainers), ...toContainerArray(extraContainers)];
}
function toContainerArray(containers = []) {
  return Array.isArray(containers) ? containers : [containers];
}
const outsideClickDeactivated = /* @__PURE__ */ new WeakSet();
function defaultSetReturnFocus(hostEl, el) {
  const hasPreviousRelatedFocusedEl = el && el !== document.body && el !== document.documentElement;
  if (!outsideClickDeactivated.has(hostEl) && hasPreviousRelatedFocusedEl) {
    focusElement(el);
  }
  return false;
}
function createFocusTrapOptions(hostEl, options) {
  const fallbackFocus = options?.fallbackFocus || hostEl;
  const clickOutsideDeactivates = options?.clickOutsideDeactivates ?? true;
  return {
    fallbackFocus,
    ...options,
    // the following options are not overridable
    document: hostEl.ownerDocument,
    tabbableOptions,
    trapStack: getConfig().focusTrapStack,
    clickOutsideDeactivates: (event) => {
      if (!outsideClickDeactivated.has(hostEl)) {
        outsideClickDeactivated.add(hostEl);
      }
      return typeof clickOutsideDeactivates === "function" ? clickOutsideDeactivates(event) : clickOutsideDeactivates;
    },
    onPostDeactivate: () => {
      outsideClickDeactivated.delete(hostEl);
    },
    setReturnFocus: (el) => {
      const returnFocusTarget = typeof options?.setReturnFocus === "function" ? options.setReturnFocus(el) : options?.setReturnFocus;
      return returnFocusTarget === void 0 ? defaultSetReturnFocus(hostEl, el) : returnFocusTarget;
    }
  };
}
const useFocusTrap = (options) => {
  return makeGenericController((component, controller) => {
    let focusTrap;
    let focusTrapEl;
    let effectiveContainers;
    const internalFocusTrapOptions = options.focusTrapOptions;
    controller.onConnected(() => {
      if (component[options.triggerProp] && focusTrap) {
        utils.activate();
      }
    });
    controller.onUpdate((changes) => {
      if (component.hasUpdated && changes.has("focusTrapDisabled")) {
        if (component.focusTrapDisabled) {
          utils.deactivate();
        } else {
          utils.activate();
        }
      }
    });
    controller.onDisconnected(() => utils.deactivate());
    const utils = {
      get _instance() {
        return void 0;
      },
      activate: () => {
        const targetEl = focusTrapEl || component.el;
        if (!targetEl.isConnected) {
          return;
        }
        if (!focusTrap) {
          effectiveContainers ||= getEffectiveContainerElements(targetEl, component);
          focusTrap = createFocusTrap(
            effectiveContainers,
            createFocusTrapOptions(targetEl, {
              ...internalFocusTrapOptions,
              ...component.focusTrapOptions
            })
          );
        }
        if (typeof component.focusTrapDisabledOverride === "function" ? !component.focusTrapDisabledOverride() : !component.focusTrapDisabled) {
          focusTrap.activate();
        }
      },
      deactivate: () => focusTrap?.deactivate(),
      overrideFocusTrapEl: (el) => {
        if (focusTrap) {
          throw new Error("Focus trap already created");
        }
        focusTrapEl = el;
      },
      setExtraContainers: (extraContainers) => {
        const targetEl = focusTrapEl || component.el;
        effectiveContainers = getEffectiveContainerElements(targetEl, component, extraContainers);
      },
      updateContainerElements: () => {
        return focusTrap?.updateContainerElements(effectiveContainers);
      }
    };
    return utils;
  });
};
const useTopLayer = (options) => {
  return makeGenericController((component, controller) => {
    let opened = false;
    controller.onConnected(() => {
      if (opened) {
        togglePopover(true);
      }
    });
    async function togglePopover(open) {
      await component.componentOnReady();
      const nativePopoverEl = typeof options.target === "function" ? options.target() : options.target.value;
      if (!nativePopoverEl || !nativePopoverEl.hasAttribute("popover")) {
        return;
      }
      const isDisabled = options.disabledOverride?.() || "topLayerDisabled" in component && component.topLayerDisabled === true;
      if (isDisabled || !open) {
        opened = false;
        nativePopoverEl.hidePopover();
        return;
      }
      opened = true;
      nativePopoverEl.showPopover();
    }
    return {
      show: async () => {
        await togglePopover(true);
      },
      hide: async () => {
        await togglePopover(false);
      }
    };
  });
};
function isActivationKey(key) {
  return key === "Enter" || key === " ";
}
const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const SLOTS$c = {
  tooltip: "tooltip",
  trigger: "trigger"
};
const SLOTS$b = {
  actionBar: "action-bar",
  alerts: "alerts",
  contentBottom: "content-bottom",
  contentTop: "content-top",
  headerActionsStart: "header-actions-start",
  headerActionsEnd: "header-actions-end",
  headerMenuActions: "header-menu-actions",
  headerContent: "header-content",
  fab: "fab",
  footer: "footer",
  footerEnd: "footer-end",
  footerStart: "footer-start"
};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var interact_min$1 = { exports: {} };
var interact_min = interact_min$1.exports;
var hasRequiredInteract_min;
function requireInteract_min() {
  if (hasRequiredInteract_min) return interact_min$1.exports;
  hasRequiredInteract_min = 1;
  (function(module, exports$1) {
    !(function(t, e2) {
      module.exports = e2();
    })(interact_min, (function() {
      function t(t2, e22) {
        var n22 = Object.keys(t2);
        if (Object.getOwnPropertySymbols) {
          var r2 = Object.getOwnPropertySymbols(t2);
          e22 && (r2 = r2.filter((function(e3) {
            return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
          }))), n22.push.apply(n22, r2);
        }
        return n22;
      }
      function e2(e22) {
        for (var n22 = 1; n22 < arguments.length; n22++) {
          var r2 = null != arguments[n22] ? arguments[n22] : {};
          n22 % 2 ? t(Object(r2), true).forEach((function(t2) {
            a(e22, t2, r2[t2]);
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e22, Object.getOwnPropertyDescriptors(r2)) : t(Object(r2)).forEach((function(t2) {
            Object.defineProperty(e22, t2, Object.getOwnPropertyDescriptor(r2, t2));
          }));
        }
        return e22;
      }
      function n2(t2) {
        return n2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
          return typeof t3;
        } : function(t3) {
          return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
        }, n2(t2);
      }
      function r(t2, e22) {
        if (!(t2 instanceof e22)) throw new TypeError("Cannot call a class as a function");
      }
      function i2(t2, e22) {
        for (var n22 = 0; n22 < e22.length; n22++) {
          var r2 = e22[n22];
          r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t2, d(r2.key), r2);
        }
      }
      function o2(t2, e22, n22) {
        return e22 && i2(t2.prototype, e22), Object.defineProperty(t2, "prototype", { writable: false }), t2;
      }
      function a(t2, e22, n22) {
        return (e22 = d(e22)) in t2 ? Object.defineProperty(t2, e22, { value: n22, enumerable: true, configurable: true, writable: true }) : t2[e22] = n22, t2;
      }
      function s(t2, e22) {
        if ("function" != typeof e22 && null !== e22) throw new TypeError("Super expression must either be null or a function");
        t2.prototype = Object.create(e22 && e22.prototype, { constructor: { value: t2, writable: true, configurable: true } }), Object.defineProperty(t2, "prototype", { writable: false }), e22 && l2(t2, e22);
      }
      function c(t2) {
        return c = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
          return t3.__proto__ || Object.getPrototypeOf(t3);
        }, c(t2);
      }
      function l2(t2, e22) {
        return l2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
          return t3.__proto__ = e3, t3;
        }, l2(t2, e22);
      }
      function u2(t2) {
        if (void 0 === t2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t2;
      }
      function p(t2) {
        var e22 = (function() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return false;
          if (Reflect.construct.sham) return false;
          if ("function" == typeof Proxy) return true;
          try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {
            }))), true;
          } catch (t3) {
            return false;
          }
        })();
        return function() {
          var n22, r2 = c(t2);
          if (e22) {
            var i22 = c(this).constructor;
            n22 = Reflect.construct(r2, arguments, i22);
          } else n22 = r2.apply(this, arguments);
          return (function(t3, e3) {
            if (e3 && ("object" == typeof e3 || "function" == typeof e3)) return e3;
            if (void 0 !== e3) throw new TypeError("Derived constructors may only return object or undefined");
            return u2(t3);
          })(this, n22);
        };
      }
      function f() {
        return f = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(t2, e22, n22) {
          var r2 = (function(t3, e3) {
            for (; !Object.prototype.hasOwnProperty.call(t3, e3) && null !== (t3 = c(t3)); ) ;
            return t3;
          })(t2, e22);
          if (r2) {
            var i22 = Object.getOwnPropertyDescriptor(r2, e22);
            return i22.get ? i22.get.call(arguments.length < 3 ? t2 : n22) : i22.value;
          }
        }, f.apply(this, arguments);
      }
      function d(t2) {
        var e22 = (function(t3, e3) {
          if ("object" != typeof t3 || null === t3) return t3;
          var n22 = t3[Symbol.toPrimitive];
          if (void 0 !== n22) {
            var r2 = n22.call(t3, e3);
            if ("object" != typeof r2) return r2;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(t3);
        })(t2, "string");
        return "symbol" == typeof e22 ? e22 : e22 + "";
      }
      var h = function(t2) {
        return !(!t2 || !t2.Window) && t2 instanceof t2.Window;
      }, v = void 0, g = void 0;
      function m(t2) {
        v = t2;
        var e22 = t2.document.createTextNode("");
        e22.ownerDocument !== t2.document && "function" == typeof t2.wrap && t2.wrap(e22) === e22 && (t2 = t2.wrap(t2)), g = t2;
      }
      function y(t2) {
        return h(t2) ? t2 : (t2.ownerDocument || t2).defaultView || g.window;
      }
      "undefined" != typeof window && window && m(window);
      var b2 = function(t2) {
        return !!t2 && "object" === n2(t2);
      }, x = function(t2) {
        return "function" == typeof t2;
      }, w = { window: function(t2) {
        return t2 === g || h(t2);
      }, docFrag: function(t2) {
        return b2(t2) && 11 === t2.nodeType;
      }, object: b2, func: x, number: function(t2) {
        return "number" == typeof t2;
      }, bool: function(t2) {
        return "boolean" == typeof t2;
      }, string: function(t2) {
        return "string" == typeof t2;
      }, element: function(t2) {
        if (!t2 || "object" !== n2(t2)) return false;
        var e22 = y(t2) || g;
        return /object|function/.test("undefined" == typeof Element ? "undefined" : n2(Element)) ? t2 instanceof Element || t2 instanceof e22.Element : 1 === t2.nodeType && "string" == typeof t2.nodeName;
      }, plainObject: function(t2) {
        return b2(t2) && !!t2.constructor && /function Object\b/.test(t2.constructor.toString());
      }, array: function(t2) {
        return b2(t2) && void 0 !== t2.length && x(t2.splice);
      } };
      function E(t2) {
        var e22 = t2.interaction;
        if ("drag" === e22.prepared.name) {
          var n22 = e22.prepared.axis;
          "x" === n22 ? (e22.coords.cur.page.y = e22.coords.start.page.y, e22.coords.cur.client.y = e22.coords.start.client.y, e22.coords.velocity.client.y = 0, e22.coords.velocity.page.y = 0) : "y" === n22 && (e22.coords.cur.page.x = e22.coords.start.page.x, e22.coords.cur.client.x = e22.coords.start.client.x, e22.coords.velocity.client.x = 0, e22.coords.velocity.page.x = 0);
        }
      }
      function T2(t2) {
        var e22 = t2.iEvent, n22 = t2.interaction;
        if ("drag" === n22.prepared.name) {
          var r2 = n22.prepared.axis;
          if ("x" === r2 || "y" === r2) {
            var i22 = "x" === r2 ? "y" : "x";
            e22.page[i22] = n22.coords.start.page[i22], e22.client[i22] = n22.coords.start.client[i22], e22.delta[i22] = 0;
          }
        }
      }
      var S = { id: "actions/drag", install: function(t2) {
        var e22 = t2.actions, n22 = t2.Interactable, r2 = t2.defaults;
        n22.prototype.draggable = S.draggable, e22.map.drag = S, e22.methodDict.drag = "draggable", r2.actions.drag = S.defaults;
      }, listeners: { "interactions:before-action-move": E, "interactions:action-resume": E, "interactions:action-move": T2, "auto-start:check": function(t2) {
        var e22 = t2.interaction, n22 = t2.interactable, r2 = t2.buttons, i22 = n22.options.drag;
        if (i22 && i22.enabled && (!e22.pointerIsDown || !/mouse|pointer/.test(e22.pointerType) || 0 != (r2 & n22.options.drag.mouseButtons))) return t2.action = { name: "drag", axis: "start" === i22.lockAxis ? i22.startAxis : i22.lockAxis }, false;
      } }, draggable: function(t2) {
        return w.object(t2) ? (this.options.drag.enabled = false !== t2.enabled, this.setPerAction("drag", t2), this.setOnEvents("drag", t2), /^(xy|x|y|start)$/.test(t2.lockAxis) && (this.options.drag.lockAxis = t2.lockAxis), /^(xy|x|y)$/.test(t2.startAxis) && (this.options.drag.startAxis = t2.startAxis), this) : w.bool(t2) ? (this.options.drag.enabled = t2, this) : this.options.drag;
      }, beforeMove: E, move: T2, defaults: { startAxis: "xy", lockAxis: "xy" }, getCursor: function() {
        return "move";
      }, filterEventType: function(t2) {
        return 0 === t2.search("drag");
      } }, _ = S, P = { init: function(t2) {
        var e22 = t2;
        P.document = e22.document, P.DocumentFragment = e22.DocumentFragment || O, P.SVGElement = e22.SVGElement || O, P.SVGSVGElement = e22.SVGSVGElement || O, P.SVGElementInstance = e22.SVGElementInstance || O, P.Element = e22.Element || O, P.HTMLElement = e22.HTMLElement || P.Element, P.Event = e22.Event, P.Touch = e22.Touch || O, P.PointerEvent = e22.PointerEvent || e22.MSPointerEvent;
      }, document: null, DocumentFragment: null, SVGElement: null, SVGSVGElement: null, SVGElementInstance: null, Element: null, HTMLElement: null, Event: null, Touch: null, PointerEvent: null };
      function O() {
      }
      var k = P;
      var D = { init: function(t2) {
        var e22 = k.Element, n22 = t2.navigator || {};
        D.supportsTouch = "ontouchstart" in t2 || w.func(t2.DocumentTouch) && k.document instanceof t2.DocumentTouch, D.supportsPointerEvent = false !== n22.pointerEnabled && !!k.PointerEvent, D.isIOS = /iP(hone|od|ad)/.test(n22.platform), D.isIOS7 = /iP(hone|od|ad)/.test(n22.platform) && /OS 7[^\d]/.test(n22.appVersion), D.isIe9 = /MSIE 9/.test(n22.userAgent), D.isOperaMobile = "Opera" === n22.appName && D.supportsTouch && /Presto/.test(n22.userAgent), D.prefixedMatchesSelector = "matches" in e22.prototype ? "matches" : "webkitMatchesSelector" in e22.prototype ? "webkitMatchesSelector" : "mozMatchesSelector" in e22.prototype ? "mozMatchesSelector" : "oMatchesSelector" in e22.prototype ? "oMatchesSelector" : "msMatchesSelector", D.pEventTypes = D.supportsPointerEvent ? k.PointerEvent === t2.MSPointerEvent ? { up: "MSPointerUp", down: "MSPointerDown", over: "mouseover", out: "mouseout", move: "MSPointerMove", cancel: "MSPointerCancel" } : { up: "pointerup", down: "pointerdown", over: "pointerover", out: "pointerout", move: "pointermove", cancel: "pointercancel" } : null, D.wheelEvent = k.document && "onmousewheel" in k.document ? "mousewheel" : "wheel";
      }, supportsTouch: null, supportsPointerEvent: null, isIOS7: null, isIOS: null, isIe9: null, isOperaMobile: null, prefixedMatchesSelector: null, pEventTypes: null, wheelEvent: null };
      var I = D;
      function M(t2, e22) {
        if (t2.contains) return t2.contains(e22);
        for (; e22; ) {
          if (e22 === t2) return true;
          e22 = e22.parentNode;
        }
        return false;
      }
      function z(t2, e22) {
        for (; w.element(t2); ) {
          if (R(t2, e22)) return t2;
          t2 = A2(t2);
        }
        return null;
      }
      function A2(t2) {
        var e22 = t2.parentNode;
        if (w.docFrag(e22)) {
          for (; (e22 = e22.host) && w.docFrag(e22); ) ;
          return e22;
        }
        return e22;
      }
      function R(t2, e22) {
        return g !== v && (e22 = e22.replace(/\/deep\//g, " ")), t2[I.prefixedMatchesSelector](e22);
      }
      var C = function(t2) {
        return t2.parentNode || t2.host;
      };
      function j(t2, e22) {
        for (var n22, r2 = [], i22 = t2; (n22 = C(i22)) && i22 !== e22 && n22 !== i22.ownerDocument; ) r2.unshift(i22), i22 = n22;
        return r2;
      }
      function F(t2, e22, n22) {
        for (; w.element(t2); ) {
          if (R(t2, e22)) return true;
          if ((t2 = A2(t2)) === n22) return R(t2, e22);
        }
        return false;
      }
      function X(t2) {
        return t2.correspondingUseElement || t2;
      }
      function Y(t2) {
        var e22 = t2 instanceof k.SVGElement ? t2.getBoundingClientRect() : t2.getClientRects()[0];
        return e22 && { left: e22.left, right: e22.right, top: e22.top, bottom: e22.bottom, width: e22.width || e22.right - e22.left, height: e22.height || e22.bottom - e22.top };
      }
      function L(t2) {
        var e22, n22 = Y(t2);
        if (!I.isIOS7 && n22) {
          var r2 = { x: (e22 = (e22 = y(t2)) || g).scrollX || e22.document.documentElement.scrollLeft, y: e22.scrollY || e22.document.documentElement.scrollTop };
          n22.left += r2.x, n22.right += r2.x, n22.top += r2.y, n22.bottom += r2.y;
        }
        return n22;
      }
      function q(t2) {
        for (var e22 = []; t2; ) e22.push(t2), t2 = A2(t2);
        return e22;
      }
      function B(t2) {
        return !!w.string(t2) && (k.document.querySelector(t2), true);
      }
      function V(t2, e22) {
        for (var n22 in e22) t2[n22] = e22[n22];
        return t2;
      }
      function W(t2, e22, n22) {
        return "parent" === t2 ? A2(n22) : "self" === t2 ? e22.getRect(n22) : z(n22, t2);
      }
      function G(t2, e22, n22, r2) {
        var i22 = t2;
        return w.string(i22) ? i22 = W(i22, e22, n22) : w.func(i22) && (i22 = i22.apply(void 0, r2)), w.element(i22) && (i22 = L(i22)), i22;
      }
      function N(t2) {
        return t2 && { x: "x" in t2 ? t2.x : t2.left, y: "y" in t2 ? t2.y : t2.top };
      }
      function U(t2) {
        return !t2 || "x" in t2 && "y" in t2 || ((t2 = V({}, t2)).x = t2.left || 0, t2.y = t2.top || 0, t2.width = t2.width || (t2.right || 0) - t2.x, t2.height = t2.height || (t2.bottom || 0) - t2.y), t2;
      }
      function H(t2, e22, n22) {
        t2.left && (e22.left += n22.x), t2.right && (e22.right += n22.x), t2.top && (e22.top += n22.y), t2.bottom && (e22.bottom += n22.y), e22.width = e22.right - e22.left, e22.height = e22.bottom - e22.top;
      }
      function K(t2, e22, n22) {
        var r2 = n22 && t2.options[n22];
        return N(G(r2 && r2.origin || t2.options.origin, t2, e22, [t2 && e22])) || { x: 0, y: 0 };
      }
      function $(t2, e22) {
        var n22 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function(t3) {
          return true;
        }, r2 = arguments.length > 3 ? arguments[3] : void 0;
        if (r2 = r2 || {}, w.string(t2) && -1 !== t2.search(" ") && (t2 = J(t2)), w.array(t2)) return t2.forEach((function(t3) {
          return $(t3, e22, n22, r2);
        })), r2;
        if (w.object(t2) && (e22 = t2, t2 = ""), w.func(e22) && n22(t2)) r2[t2] = r2[t2] || [], r2[t2].push(e22);
        else if (w.array(e22)) for (var i22 = 0, o22 = e22; i22 < o22.length; i22++) {
          var a2 = o22[i22];
          $(t2, a2, n22, r2);
        }
        else if (w.object(e22)) for (var s2 in e22) {
          $(J(s2).map((function(e3) {
            return "".concat(t2).concat(e3);
          })), e22[s2], n22, r2);
        }
        return r2;
      }
      function J(t2) {
        return t2.trim().split(/ +/);
      }
      var Q = function(t2, e22) {
        return Math.sqrt(t2 * t2 + e22 * e22);
      }, Z = ["webkit", "moz"];
      function tt(t2, e22) {
        t2.__set || (t2.__set = {});
        var n22 = function(n3) {
          if (Z.some((function(t3) {
            return 0 === n3.indexOf(t3);
          }))) return 1;
          "function" != typeof t2[n3] && "__set" !== n3 && Object.defineProperty(t2, n3, { get: function() {
            return n3 in t2.__set ? t2.__set[n3] : t2.__set[n3] = e22[n3];
          }, set: function(e3) {
            t2.__set[n3] = e3;
          }, configurable: true });
        };
        for (var r2 in e22) n22(r2);
        return t2;
      }
      function et(t2, e22) {
        t2.page = t2.page || {}, t2.page.x = e22.page.x, t2.page.y = e22.page.y, t2.client = t2.client || {}, t2.client.x = e22.client.x, t2.client.y = e22.client.y, t2.timeStamp = e22.timeStamp;
      }
      function nt(t2) {
        t2.page.x = 0, t2.page.y = 0, t2.client.x = 0, t2.client.y = 0;
      }
      function rt(t2) {
        return t2 instanceof k.Event || t2 instanceof k.Touch;
      }
      function it(t2, e22, n22) {
        return t2 = t2 || "page", (n22 = n22 || {}).x = e22[t2 + "X"], n22.y = e22[t2 + "Y"], n22;
      }
      function ot(t2, e22) {
        return e22 = e22 || { x: 0, y: 0 }, I.isOperaMobile && rt(t2) ? (it("screen", t2, e22), e22.x += window.scrollX, e22.y += window.scrollY) : it("page", t2, e22), e22;
      }
      function at(t2) {
        return w.number(t2.pointerId) ? t2.pointerId : t2.identifier;
      }
      function st(t2, e22, n22) {
        var r2 = e22.length > 1 ? lt(e22) : e22[0];
        ot(r2, t2.page), (function(t3, e3) {
          e3 = e3 || {}, I.isOperaMobile && rt(t3) ? it("screen", t3, e3) : it("client", t3, e3);
        })(r2, t2.client), t2.timeStamp = n22;
      }
      function ct(t2) {
        var e22 = [];
        return w.array(t2) ? (e22[0] = t2[0], e22[1] = t2[1]) : "touchend" === t2.type ? 1 === t2.touches.length ? (e22[0] = t2.touches[0], e22[1] = t2.changedTouches[0]) : 0 === t2.touches.length && (e22[0] = t2.changedTouches[0], e22[1] = t2.changedTouches[1]) : (e22[0] = t2.touches[0], e22[1] = t2.touches[1]), e22;
      }
      function lt(t2) {
        for (var e22 = { pageX: 0, pageY: 0, clientX: 0, clientY: 0, screenX: 0, screenY: 0 }, n22 = 0; n22 < t2.length; n22++) {
          var r2 = t2[n22];
          for (var i22 in e22) e22[i22] += r2[i22];
        }
        for (var o22 in e22) e22[o22] /= t2.length;
        return e22;
      }
      function ut(t2) {
        if (!t2.length) return null;
        var e22 = ct(t2), n22 = Math.min(e22[0].pageX, e22[1].pageX), r2 = Math.min(e22[0].pageY, e22[1].pageY), i22 = Math.max(e22[0].pageX, e22[1].pageX), o22 = Math.max(e22[0].pageY, e22[1].pageY);
        return { x: n22, y: r2, left: n22, top: r2, right: i22, bottom: o22, width: i22 - n22, height: o22 - r2 };
      }
      function pt(t2, e22) {
        var n22 = e22 + "X", r2 = e22 + "Y", i22 = ct(t2), o22 = i22[0][n22] - i22[1][n22], a2 = i22[0][r2] - i22[1][r2];
        return Q(o22, a2);
      }
      function ft(t2, e22) {
        var n22 = e22 + "X", r2 = e22 + "Y", i22 = ct(t2), o22 = i22[1][n22] - i22[0][n22], a2 = i22[1][r2] - i22[0][r2];
        return 180 * Math.atan2(a2, o22) / Math.PI;
      }
      function dt(t2) {
        return w.string(t2.pointerType) ? t2.pointerType : w.number(t2.pointerType) ? [void 0, void 0, "touch", "pen", "mouse"][t2.pointerType] : /touch/.test(t2.type || "") || t2 instanceof k.Touch ? "touch" : "mouse";
      }
      function ht(t2) {
        var e22 = w.func(t2.composedPath) ? t2.composedPath() : t2.path;
        return [X(e22 ? e22[0] : t2.target), X(t2.currentTarget)];
      }
      var vt = (function() {
        function t2(e22) {
          r(this, t2), this.immediatePropagationStopped = false, this.propagationStopped = false, this._interaction = e22;
        }
        return o2(t2, [{ key: "preventDefault", value: function() {
        } }, { key: "stopPropagation", value: function() {
          this.propagationStopped = true;
        } }, { key: "stopImmediatePropagation", value: function() {
          this.immediatePropagationStopped = this.propagationStopped = true;
        } }]), t2;
      })();
      Object.defineProperty(vt.prototype, "interaction", { get: function() {
        return this._interaction._proxy;
      }, set: function() {
      } });
      var gt = function(t2, e22) {
        for (var n22 = 0; n22 < e22.length; n22++) {
          var r2 = e22[n22];
          t2.push(r2);
        }
        return t2;
      }, mt = function(t2) {
        return gt([], t2);
      }, yt = function(t2, e22) {
        for (var n22 = 0; n22 < t2.length; n22++) if (e22(t2[n22], n22, t2)) return n22;
        return -1;
      }, bt = function(t2, e22) {
        return t2[yt(t2, e22)];
      }, xt = (function(t2) {
        s(n22, t2);
        var e22 = p(n22);
        function n22(t3, i22, o22) {
          var a2;
          r(this, n22), (a2 = e22.call(this, i22._interaction)).dropzone = void 0, a2.dragEvent = void 0, a2.relatedTarget = void 0, a2.draggable = void 0, a2.propagationStopped = false, a2.immediatePropagationStopped = false;
          var s2 = "dragleave" === o22 ? t3.prev : t3.cur, c2 = s2.element, l22 = s2.dropzone;
          return a2.type = o22, a2.target = c2, a2.currentTarget = c2, a2.dropzone = l22, a2.dragEvent = i22, a2.relatedTarget = i22.target, a2.draggable = i22.interactable, a2.timeStamp = i22.timeStamp, a2;
        }
        return o2(n22, [{ key: "reject", value: function() {
          var t3 = this, e3 = this._interaction.dropState;
          if ("dropactivate" === this.type || this.dropzone && e3.cur.dropzone === this.dropzone && e3.cur.element === this.target) if (e3.prev.dropzone = this.dropzone, e3.prev.element = this.target, e3.rejected = true, e3.events.enter = null, this.stopImmediatePropagation(), "dropactivate" === this.type) {
            var r2 = e3.activeDrops, i22 = yt(r2, (function(e4) {
              var n3 = e4.dropzone, r3 = e4.element;
              return n3 === t3.dropzone && r3 === t3.target;
            }));
            e3.activeDrops.splice(i22, 1);
            var o22 = new n22(e3, this.dragEvent, "dropdeactivate");
            o22.dropzone = this.dropzone, o22.target = this.target, this.dropzone.fire(o22);
          } else this.dropzone.fire(new n22(e3, this.dragEvent, "dragleave"));
        } }, { key: "preventDefault", value: function() {
        } }, { key: "stopPropagation", value: function() {
          this.propagationStopped = true;
        } }, { key: "stopImmediatePropagation", value: function() {
          this.immediatePropagationStopped = this.propagationStopped = true;
        } }]), n22;
      })(vt);
      function wt(t2, e22) {
        for (var n22 = 0, r2 = t2.slice(); n22 < r2.length; n22++) {
          var i22 = r2[n22], o22 = i22.dropzone, a2 = i22.element;
          e22.dropzone = o22, e22.target = a2, o22.fire(e22), e22.propagationStopped = e22.immediatePropagationStopped = false;
        }
      }
      function Et(t2, e22) {
        for (var n22 = (function(t3, e3) {
          for (var n3 = [], r3 = 0, i3 = t3.interactables.list; r3 < i3.length; r3++) {
            var o22 = i3[r3];
            if (o22.options.drop.enabled) {
              var a2 = o22.options.drop.accept;
              if (!(w.element(a2) && a2 !== e3 || w.string(a2) && !R(e3, a2) || w.func(a2) && !a2({ dropzone: o22, draggableElement: e3 }))) for (var s2 = 0, c2 = o22.getAllElements(); s2 < c2.length; s2++) {
                var l22 = c2[s2];
                l22 !== e3 && n3.push({ dropzone: o22, element: l22, rect: o22.getRect(l22) });
              }
            }
          }
          return n3;
        })(t2, e22), r2 = 0; r2 < n22.length; r2++) {
          var i22 = n22[r2];
          i22.rect = i22.dropzone.getRect(i22.element);
        }
        return n22;
      }
      function Tt(t2, e22, n22) {
        for (var r2 = t2.dropState, i22 = t2.interactable, o22 = t2.element, a2 = [], s2 = 0, c2 = r2.activeDrops; s2 < c2.length; s2++) {
          var l22 = c2[s2], u22 = l22.dropzone, p2 = l22.element, f2 = l22.rect, d2 = u22.dropCheck(e22, n22, i22, o22, p2, f2);
          a2.push(d2 ? p2 : null);
        }
        var h2 = (function(t3) {
          for (var e3, n3, r3, i3 = [], o3 = 0; o3 < t3.length; o3++) {
            var a3 = t3[o3], s3 = t3[e3];
            if (a3 && o3 !== e3) if (s3) {
              var c3 = C(a3), l3 = C(s3);
              if (c3 !== a3.ownerDocument) if (l3 !== a3.ownerDocument) if (c3 !== l3) {
                i3 = i3.length ? i3 : j(s3);
                var u3 = void 0;
                if (s3 instanceof k.HTMLElement && a3 instanceof k.SVGElement && !(a3 instanceof k.SVGSVGElement)) {
                  if (a3 === l3) continue;
                  u3 = a3.ownerSVGElement;
                } else u3 = a3;
                for (var p3 = j(u3, s3.ownerDocument), f3 = 0; p3[f3] && p3[f3] === i3[f3]; ) f3++;
                var d3 = [p3[f3 - 1], p3[f3], i3[f3]];
                if (d3[0]) for (var h3 = d3[0].lastChild; h3; ) {
                  if (h3 === d3[1]) {
                    e3 = o3, i3 = p3;
                    break;
                  }
                  if (h3 === d3[2]) break;
                  h3 = h3.previousSibling;
                }
              } else r3 = s3, (parseInt(y(n3 = a3).getComputedStyle(n3).zIndex, 10) || 0) >= (parseInt(y(r3).getComputedStyle(r3).zIndex, 10) || 0) && (e3 = o3);
              else e3 = o3;
            } else e3 = o3;
          }
          return e3;
        })(a2);
        return r2.activeDrops[h2] || null;
      }
      function St(t2, e22, n22) {
        var r2 = t2.dropState, i22 = { enter: null, leave: null, activate: null, deactivate: null, move: null, drop: null };
        return "dragstart" === n22.type && (i22.activate = new xt(r2, n22, "dropactivate"), i22.activate.target = null, i22.activate.dropzone = null), "dragend" === n22.type && (i22.deactivate = new xt(r2, n22, "dropdeactivate"), i22.deactivate.target = null, i22.deactivate.dropzone = null), r2.rejected || (r2.cur.element !== r2.prev.element && (r2.prev.dropzone && (i22.leave = new xt(r2, n22, "dragleave"), n22.dragLeave = i22.leave.target = r2.prev.element, n22.prevDropzone = i22.leave.dropzone = r2.prev.dropzone), r2.cur.dropzone && (i22.enter = new xt(r2, n22, "dragenter"), n22.dragEnter = r2.cur.element, n22.dropzone = r2.cur.dropzone)), "dragend" === n22.type && r2.cur.dropzone && (i22.drop = new xt(r2, n22, "drop"), n22.dropzone = r2.cur.dropzone, n22.relatedTarget = r2.cur.element), "dragmove" === n22.type && r2.cur.dropzone && (i22.move = new xt(r2, n22, "dropmove"), n22.dropzone = r2.cur.dropzone)), i22;
      }
      function _t(t2, e22) {
        var n22 = t2.dropState, r2 = n22.activeDrops, i22 = n22.cur, o22 = n22.prev;
        e22.leave && o22.dropzone.fire(e22.leave), e22.enter && i22.dropzone.fire(e22.enter), e22.move && i22.dropzone.fire(e22.move), e22.drop && i22.dropzone.fire(e22.drop), e22.deactivate && wt(r2, e22.deactivate), n22.prev.dropzone = i22.dropzone, n22.prev.element = i22.element;
      }
      function Pt(t2, e22) {
        var n22 = t2.interaction, r2 = t2.iEvent, i22 = t2.event;
        if ("dragmove" === r2.type || "dragend" === r2.type) {
          var o22 = n22.dropState;
          e22.dynamicDrop && (o22.activeDrops = Et(e22, n22.element));
          var a2 = r2, s2 = Tt(n22, a2, i22);
          o22.rejected = o22.rejected && !!s2 && s2.dropzone === o22.cur.dropzone && s2.element === o22.cur.element, o22.cur.dropzone = s2 && s2.dropzone, o22.cur.element = s2 && s2.element, o22.events = St(n22, 0, a2);
        }
      }
      var Ot = { id: "actions/drop", install: function(t2) {
        var e22 = t2.actions, n22 = t2.interactStatic, r2 = t2.Interactable, i22 = t2.defaults;
        t2.usePlugin(_), r2.prototype.dropzone = function(t3) {
          return (function(t4, e3) {
            if (w.object(e3)) {
              if (t4.options.drop.enabled = false !== e3.enabled, e3.listeners) {
                var n3 = $(e3.listeners), r3 = Object.keys(n3).reduce((function(t5, e4) {
                  return t5[/^(enter|leave)/.test(e4) ? "drag".concat(e4) : /^(activate|deactivate|move)/.test(e4) ? "drop".concat(e4) : e4] = n3[e4], t5;
                }), {}), i3 = t4.options.drop.listeners;
                i3 && t4.off(i3), t4.on(r3), t4.options.drop.listeners = r3;
              }
              return w.func(e3.ondrop) && t4.on("drop", e3.ondrop), w.func(e3.ondropactivate) && t4.on("dropactivate", e3.ondropactivate), w.func(e3.ondropdeactivate) && t4.on("dropdeactivate", e3.ondropdeactivate), w.func(e3.ondragenter) && t4.on("dragenter", e3.ondragenter), w.func(e3.ondragleave) && t4.on("dragleave", e3.ondragleave), w.func(e3.ondropmove) && t4.on("dropmove", e3.ondropmove), /^(pointer|center)$/.test(e3.overlap) ? t4.options.drop.overlap = e3.overlap : w.number(e3.overlap) && (t4.options.drop.overlap = Math.max(Math.min(1, e3.overlap), 0)), "accept" in e3 && (t4.options.drop.accept = e3.accept), "checker" in e3 && (t4.options.drop.checker = e3.checker), t4;
            }
            if (w.bool(e3)) return t4.options.drop.enabled = e3, t4;
            return t4.options.drop;
          })(this, t3);
        }, r2.prototype.dropCheck = function(t3, e3, n3, r3, i3, o22) {
          return (function(t4, e4, n4, r4, i4, o3, a2) {
            var s2 = false;
            if (!(a2 = a2 || t4.getRect(o3))) return !!t4.options.drop.checker && t4.options.drop.checker(e4, n4, s2, t4, o3, r4, i4);
            var c2 = t4.options.drop.overlap;
            if ("pointer" === c2) {
              var l22 = K(r4, i4, "drag"), u22 = ot(e4);
              u22.x += l22.x, u22.y += l22.y;
              var p2 = u22.x > a2.left && u22.x < a2.right, f2 = u22.y > a2.top && u22.y < a2.bottom;
              s2 = p2 && f2;
            }
            var d2 = r4.getRect(i4);
            if (d2 && "center" === c2) {
              var h2 = d2.left + d2.width / 2, v2 = d2.top + d2.height / 2;
              s2 = h2 >= a2.left && h2 <= a2.right && v2 >= a2.top && v2 <= a2.bottom;
            }
            if (d2 && w.number(c2)) {
              s2 = Math.max(0, Math.min(a2.right, d2.right) - Math.max(a2.left, d2.left)) * Math.max(0, Math.min(a2.bottom, d2.bottom) - Math.max(a2.top, d2.top)) / (d2.width * d2.height) >= c2;
            }
            t4.options.drop.checker && (s2 = t4.options.drop.checker(e4, n4, s2, t4, o3, r4, i4));
            return s2;
          })(this, t3, e3, n3, r3, i3, o22);
        }, n22.dynamicDrop = function(e3) {
          return w.bool(e3) ? (t2.dynamicDrop = e3, n22) : t2.dynamicDrop;
        }, V(e22.phaselessTypes, { dragenter: true, dragleave: true, dropactivate: true, dropdeactivate: true, dropmove: true, drop: true }), e22.methodDict.drop = "dropzone", t2.dynamicDrop = false, i22.actions.drop = Ot.defaults;
      }, listeners: { "interactions:before-action-start": function(t2) {
        var e22 = t2.interaction;
        "drag" === e22.prepared.name && (e22.dropState = { cur: { dropzone: null, element: null }, prev: { dropzone: null, element: null }, rejected: null, events: null, activeDrops: [] });
      }, "interactions:after-action-start": function(t2, e22) {
        var n22 = t2.interaction, r2 = (t2.event, t2.iEvent);
        if ("drag" === n22.prepared.name) {
          var i22 = n22.dropState;
          i22.activeDrops = [], i22.events = {}, i22.activeDrops = Et(e22, n22.element), i22.events = St(n22, 0, r2), i22.events.activate && (wt(i22.activeDrops, i22.events.activate), e22.fire("actions/drop:start", { interaction: n22, dragEvent: r2 }));
        }
      }, "interactions:action-move": Pt, "interactions:after-action-move": function(t2, e22) {
        var n22 = t2.interaction, r2 = t2.iEvent;
        if ("drag" === n22.prepared.name) {
          var i22 = n22.dropState;
          _t(n22, i22.events), e22.fire("actions/drop:move", { interaction: n22, dragEvent: r2 }), i22.events = {};
        }
      }, "interactions:action-end": function(t2, e22) {
        if ("drag" === t2.interaction.prepared.name) {
          var n22 = t2.interaction, r2 = t2.iEvent;
          Pt(t2, e22), _t(n22, n22.dropState.events), e22.fire("actions/drop:end", { interaction: n22, dragEvent: r2 });
        }
      }, "interactions:stop": function(t2) {
        var e22 = t2.interaction;
        if ("drag" === e22.prepared.name) {
          var n22 = e22.dropState;
          n22 && (n22.activeDrops = null, n22.events = null, n22.cur.dropzone = null, n22.cur.element = null, n22.prev.dropzone = null, n22.prev.element = null, n22.rejected = false);
        }
      } }, getActiveDrops: Et, getDrop: Tt, getDropEvents: St, fireDropEvents: _t, filterEventType: function(t2) {
        return 0 === t2.search("drag") || 0 === t2.search("drop");
      }, defaults: { enabled: false, accept: null, overlap: "pointer" } }, kt = Ot;
      function Dt(t2) {
        var e22 = t2.interaction, n22 = t2.iEvent, r2 = t2.phase;
        if ("gesture" === e22.prepared.name) {
          var i22 = e22.pointers.map((function(t3) {
            return t3.pointer;
          })), o22 = "start" === r2, a2 = "end" === r2, s2 = e22.interactable.options.deltaSource;
          if (n22.touches = [i22[0], i22[1]], o22) n22.distance = pt(i22, s2), n22.box = ut(i22), n22.scale = 1, n22.ds = 0, n22.angle = ft(i22, s2), n22.da = 0, e22.gesture.startDistance = n22.distance, e22.gesture.startAngle = n22.angle;
          else if (a2 || e22.pointers.length < 2) {
            var c2 = e22.prevEvent;
            n22.distance = c2.distance, n22.box = c2.box, n22.scale = c2.scale, n22.ds = 0, n22.angle = c2.angle, n22.da = 0;
          } else n22.distance = pt(i22, s2), n22.box = ut(i22), n22.scale = n22.distance / e22.gesture.startDistance, n22.angle = ft(i22, s2), n22.ds = n22.scale - e22.gesture.scale, n22.da = n22.angle - e22.gesture.angle;
          e22.gesture.distance = n22.distance, e22.gesture.angle = n22.angle, w.number(n22.scale) && n22.scale !== 1 / 0 && !isNaN(n22.scale) && (e22.gesture.scale = n22.scale);
        }
      }
      var It = { id: "actions/gesture", before: ["actions/drag", "actions/resize"], install: function(t2) {
        var e22 = t2.actions, n22 = t2.Interactable, r2 = t2.defaults;
        n22.prototype.gesturable = function(t3) {
          return w.object(t3) ? (this.options.gesture.enabled = false !== t3.enabled, this.setPerAction("gesture", t3), this.setOnEvents("gesture", t3), this) : w.bool(t3) ? (this.options.gesture.enabled = t3, this) : this.options.gesture;
        }, e22.map.gesture = It, e22.methodDict.gesture = "gesturable", r2.actions.gesture = It.defaults;
      }, listeners: { "interactions:action-start": Dt, "interactions:action-move": Dt, "interactions:action-end": Dt, "interactions:new": function(t2) {
        t2.interaction.gesture = { angle: 0, distance: 0, scale: 1, startAngle: 0, startDistance: 0 };
      }, "auto-start:check": function(t2) {
        if (!(t2.interaction.pointers.length < 2)) {
          var e22 = t2.interactable.options.gesture;
          if (e22 && e22.enabled) return t2.action = { name: "gesture" }, false;
        }
      } }, defaults: {}, getCursor: function() {
        return "";
      }, filterEventType: function(t2) {
        return 0 === t2.search("gesture");
      } }, Mt = It;
      function zt(t2, e22, n22, r2, i22, o22, a2) {
        if (!e22) return false;
        if (true === e22) {
          var s2 = w.number(o22.width) ? o22.width : o22.right - o22.left, c2 = w.number(o22.height) ? o22.height : o22.bottom - o22.top;
          if (a2 = Math.min(a2, Math.abs(("left" === t2 || "right" === t2 ? s2 : c2) / 2)), s2 < 0 && ("left" === t2 ? t2 = "right" : "right" === t2 && (t2 = "left")), c2 < 0 && ("top" === t2 ? t2 = "bottom" : "bottom" === t2 && (t2 = "top")), "left" === t2) {
            var l22 = s2 >= 0 ? o22.left : o22.right;
            return n22.x < l22 + a2;
          }
          if ("top" === t2) {
            var u22 = c2 >= 0 ? o22.top : o22.bottom;
            return n22.y < u22 + a2;
          }
          if ("right" === t2) return n22.x > (s2 >= 0 ? o22.right : o22.left) - a2;
          if ("bottom" === t2) return n22.y > (c2 >= 0 ? o22.bottom : o22.top) - a2;
        }
        return !!w.element(r2) && (w.element(e22) ? e22 === r2 : F(r2, e22, i22));
      }
      function At(t2) {
        var e22 = t2.iEvent, n22 = t2.interaction;
        if ("resize" === n22.prepared.name && n22.resizeAxes) {
          var r2 = e22;
          n22.interactable.options.resize.square ? ("y" === n22.resizeAxes ? r2.delta.x = r2.delta.y : r2.delta.y = r2.delta.x, r2.axes = "xy") : (r2.axes = n22.resizeAxes, "x" === n22.resizeAxes ? r2.delta.y = 0 : "y" === n22.resizeAxes && (r2.delta.x = 0));
        }
      }
      var Rt, Ct, jt = { id: "actions/resize", before: ["actions/drag"], install: function(t2) {
        var e22 = t2.actions, n22 = t2.browser, r2 = t2.Interactable, i22 = t2.defaults;
        jt.cursors = (function(t3) {
          return t3.isIe9 ? { x: "e-resize", y: "s-resize", xy: "se-resize", top: "n-resize", left: "w-resize", bottom: "s-resize", right: "e-resize", topleft: "se-resize", bottomright: "se-resize", topright: "ne-resize", bottomleft: "ne-resize" } : { x: "ew-resize", y: "ns-resize", xy: "nwse-resize", top: "ns-resize", left: "ew-resize", bottom: "ns-resize", right: "ew-resize", topleft: "nwse-resize", bottomright: "nwse-resize", topright: "nesw-resize", bottomleft: "nesw-resize" };
        })(n22), jt.defaultMargin = n22.supportsTouch || n22.supportsPointerEvent ? 20 : 10, r2.prototype.resizable = function(e3) {
          return (function(t3, e4, n3) {
            if (w.object(e4)) return t3.options.resize.enabled = false !== e4.enabled, t3.setPerAction("resize", e4), t3.setOnEvents("resize", e4), w.string(e4.axis) && /^x$|^y$|^xy$/.test(e4.axis) ? t3.options.resize.axis = e4.axis : null === e4.axis && (t3.options.resize.axis = n3.defaults.actions.resize.axis), w.bool(e4.preserveAspectRatio) ? t3.options.resize.preserveAspectRatio = e4.preserveAspectRatio : w.bool(e4.square) && (t3.options.resize.square = e4.square), t3;
            if (w.bool(e4)) return t3.options.resize.enabled = e4, t3;
            return t3.options.resize;
          })(this, e3, t2);
        }, e22.map.resize = jt, e22.methodDict.resize = "resizable", i22.actions.resize = jt.defaults;
      }, listeners: { "interactions:new": function(t2) {
        t2.interaction.resizeAxes = "xy";
      }, "interactions:action-start": function(t2) {
        !(function(t3) {
          var e22 = t3.iEvent, n22 = t3.interaction;
          if ("resize" === n22.prepared.name && n22.prepared.edges) {
            var r2 = e22, i22 = n22.rect;
            n22._rects = { start: V({}, i22), corrected: V({}, i22), previous: V({}, i22), delta: { left: 0, right: 0, width: 0, top: 0, bottom: 0, height: 0 } }, r2.edges = n22.prepared.edges, r2.rect = n22._rects.corrected, r2.deltaRect = n22._rects.delta;
          }
        })(t2), At(t2);
      }, "interactions:action-move": function(t2) {
        !(function(t3) {
          var e22 = t3.iEvent, n22 = t3.interaction;
          if ("resize" === n22.prepared.name && n22.prepared.edges) {
            var r2 = e22, i22 = n22.interactable.options.resize.invert, o22 = "reposition" === i22 || "negate" === i22, a2 = n22.rect, s2 = n22._rects, c2 = s2.start, l22 = s2.corrected, u22 = s2.delta, p2 = s2.previous;
            if (V(p2, l22), o22) {
              if (V(l22, a2), "reposition" === i22) {
                if (l22.top > l22.bottom) {
                  var f2 = l22.top;
                  l22.top = l22.bottom, l22.bottom = f2;
                }
                if (l22.left > l22.right) {
                  var d2 = l22.left;
                  l22.left = l22.right, l22.right = d2;
                }
              }
            } else l22.top = Math.min(a2.top, c2.bottom), l22.bottom = Math.max(a2.bottom, c2.top), l22.left = Math.min(a2.left, c2.right), l22.right = Math.max(a2.right, c2.left);
            for (var h2 in l22.width = l22.right - l22.left, l22.height = l22.bottom - l22.top, l22) u22[h2] = l22[h2] - p2[h2];
            r2.edges = n22.prepared.edges, r2.rect = l22, r2.deltaRect = u22;
          }
        })(t2), At(t2);
      }, "interactions:action-end": function(t2) {
        var e22 = t2.iEvent, n22 = t2.interaction;
        if ("resize" === n22.prepared.name && n22.prepared.edges) {
          var r2 = e22;
          r2.edges = n22.prepared.edges, r2.rect = n22._rects.corrected, r2.deltaRect = n22._rects.delta;
        }
      }, "auto-start:check": function(t2) {
        var e22 = t2.interaction, n22 = t2.interactable, r2 = t2.element, i22 = t2.rect, o22 = t2.buttons;
        if (i22) {
          var a2 = V({}, e22.coords.cur.page), s2 = n22.options.resize;
          if (s2 && s2.enabled && (!e22.pointerIsDown || !/mouse|pointer/.test(e22.pointerType) || 0 != (o22 & s2.mouseButtons))) {
            if (w.object(s2.edges)) {
              var c2 = { left: false, right: false, top: false, bottom: false };
              for (var l22 in c2) c2[l22] = zt(l22, s2.edges[l22], a2, e22._latestPointer.eventTarget, r2, i22, s2.margin || jt.defaultMargin);
              c2.left = c2.left && !c2.right, c2.top = c2.top && !c2.bottom, (c2.left || c2.right || c2.top || c2.bottom) && (t2.action = { name: "resize", edges: c2 });
            } else {
              var u22 = "y" !== s2.axis && a2.x > i22.right - jt.defaultMargin, p2 = "x" !== s2.axis && a2.y > i22.bottom - jt.defaultMargin;
              (u22 || p2) && (t2.action = { name: "resize", axes: (u22 ? "x" : "") + (p2 ? "y" : "") });
            }
            return !t2.action && void 0;
          }
        }
      } }, defaults: { square: false, preserveAspectRatio: false, axis: "xy", margin: NaN, edges: null, invert: "none" }, cursors: null, getCursor: function(t2) {
        var e22 = t2.edges, n22 = t2.axis, r2 = t2.name, i22 = jt.cursors, o22 = null;
        if (n22) o22 = i22[r2 + n22];
        else if (e22) {
          for (var a2 = "", s2 = 0, c2 = ["top", "bottom", "left", "right"]; s2 < c2.length; s2++) {
            var l22 = c2[s2];
            e22[l22] && (a2 += l22);
          }
          o22 = i22[a2];
        }
        return o22;
      }, filterEventType: function(t2) {
        return 0 === t2.search("resize");
      }, defaultMargin: null }, Ft = jt, Xt = { id: "actions", install: function(t2) {
        t2.usePlugin(Mt), t2.usePlugin(Ft), t2.usePlugin(_), t2.usePlugin(kt);
      } }, Yt = 0;
      var Lt = { request: function(t2) {
        return Rt(t2);
      }, cancel: function(t2) {
        return Ct(t2);
      }, init: function(t2) {
        if (Rt = t2.requestAnimationFrame, Ct = t2.cancelAnimationFrame, !Rt) for (var e22 = ["ms", "moz", "webkit", "o"], n22 = 0; n22 < e22.length; n22++) {
          var r2 = e22[n22];
          Rt = t2["".concat(r2, "RequestAnimationFrame")], Ct = t2["".concat(r2, "CancelAnimationFrame")] || t2["".concat(r2, "CancelRequestAnimationFrame")];
        }
        Rt = Rt && Rt.bind(t2), Ct = Ct && Ct.bind(t2), Rt || (Rt = function(e3) {
          var n3 = Date.now(), r3 = Math.max(0, 16 - (n3 - Yt)), i22 = t2.setTimeout((function() {
            e3(n3 + r3);
          }), r3);
          return Yt = n3 + r3, i22;
        }, Ct = function(t3) {
          return clearTimeout(t3);
        });
      } };
      var qt = { defaults: { enabled: false, margin: 60, container: null, speed: 300 }, now: Date.now, interaction: null, i: 0, x: 0, y: 0, isScrolling: false, prevTime: 0, margin: 0, speed: 0, start: function(t2) {
        qt.isScrolling = true, Lt.cancel(qt.i), t2.autoScroll = qt, qt.interaction = t2, qt.prevTime = qt.now(), qt.i = Lt.request(qt.scroll);
      }, stop: function() {
        qt.isScrolling = false, qt.interaction && (qt.interaction.autoScroll = null), Lt.cancel(qt.i);
      }, scroll: function() {
        var t2 = qt.interaction, e22 = t2.interactable, n22 = t2.element, r2 = t2.prepared.name, i22 = e22.options[r2].autoScroll, o22 = Bt(i22.container, e22, n22), a2 = qt.now(), s2 = (a2 - qt.prevTime) / 1e3, c2 = i22.speed * s2;
        if (c2 >= 1) {
          var l22 = { x: qt.x * c2, y: qt.y * c2 };
          if (l22.x || l22.y) {
            var u22 = Vt(o22);
            w.window(o22) ? o22.scrollBy(l22.x, l22.y) : o22 && (o22.scrollLeft += l22.x, o22.scrollTop += l22.y);
            var p2 = Vt(o22), f2 = { x: p2.x - u22.x, y: p2.y - u22.y };
            (f2.x || f2.y) && e22.fire({ type: "autoscroll", target: n22, interactable: e22, delta: f2, interaction: t2, container: o22 });
          }
          qt.prevTime = a2;
        }
        qt.isScrolling && (Lt.cancel(qt.i), qt.i = Lt.request(qt.scroll));
      }, check: function(t2, e22) {
        var n22;
        return null == (n22 = t2.options[e22].autoScroll) ? void 0 : n22.enabled;
      }, onInteractionMove: function(t2) {
        var e22 = t2.interaction, n22 = t2.pointer;
        if (e22.interacting() && qt.check(e22.interactable, e22.prepared.name)) if (e22.simulation) qt.x = qt.y = 0;
        else {
          var r2, i22, o22, a2, s2 = e22.interactable, c2 = e22.element, l22 = e22.prepared.name, u22 = s2.options[l22].autoScroll, p2 = Bt(u22.container, s2, c2);
          if (w.window(p2)) a2 = n22.clientX < qt.margin, r2 = n22.clientY < qt.margin, i22 = n22.clientX > p2.innerWidth - qt.margin, o22 = n22.clientY > p2.innerHeight - qt.margin;
          else {
            var f2 = Y(p2);
            a2 = n22.clientX < f2.left + qt.margin, r2 = n22.clientY < f2.top + qt.margin, i22 = n22.clientX > f2.right - qt.margin, o22 = n22.clientY > f2.bottom - qt.margin;
          }
          qt.x = i22 ? 1 : a2 ? -1 : 0, qt.y = o22 ? 1 : r2 ? -1 : 0, qt.isScrolling || (qt.margin = u22.margin, qt.speed = u22.speed, qt.start(e22));
        }
      } };
      function Bt(t2, e22, n22) {
        return (w.string(t2) ? W(t2, e22, n22) : t2) || y(n22);
      }
      function Vt(t2) {
        return w.window(t2) && (t2 = window.document.body), { x: t2.scrollLeft, y: t2.scrollTop };
      }
      var Wt = { id: "auto-scroll", install: function(t2) {
        var e22 = t2.defaults, n22 = t2.actions;
        t2.autoScroll = qt, qt.now = function() {
          return t2.now();
        }, n22.phaselessTypes.autoscroll = true, e22.perAction.autoScroll = qt.defaults;
      }, listeners: { "interactions:new": function(t2) {
        t2.interaction.autoScroll = null;
      }, "interactions:destroy": function(t2) {
        t2.interaction.autoScroll = null, qt.stop(), qt.interaction && (qt.interaction = null);
      }, "interactions:stop": qt.stop, "interactions:action-move": function(t2) {
        return qt.onInteractionMove(t2);
      } } }, Gt = Wt;
      function Nt(t2, e22) {
        var n22 = false;
        return function() {
          return n22 || (g.console.warn(e22), n22 = true), t2.apply(this, arguments);
        };
      }
      function Ut(t2, e22) {
        return t2.name = e22.name, t2.axis = e22.axis, t2.edges = e22.edges, t2;
      }
      function Ht(t2) {
        return w.bool(t2) ? (this.options.styleCursor = t2, this) : null === t2 ? (delete this.options.styleCursor, this) : this.options.styleCursor;
      }
      function Kt(t2) {
        return w.func(t2) ? (this.options.actionChecker = t2, this) : null === t2 ? (delete this.options.actionChecker, this) : this.options.actionChecker;
      }
      var $t = { id: "auto-start/interactableMethods", install: function(t2) {
        var e22 = t2.Interactable;
        e22.prototype.getAction = function(e3, n22, r2, i22) {
          var o22 = (function(t3, e4, n3, r3, i3) {
            var o3 = t3.getRect(r3), a2 = e4.buttons || { 0: 1, 1: 4, 3: 8, 4: 16 }[e4.button], s2 = { action: null, interactable: t3, interaction: n3, element: r3, rect: o3, buttons: a2 };
            return i3.fire("auto-start:check", s2), s2.action;
          })(this, n22, r2, i22, t2);
          return this.options.actionChecker ? this.options.actionChecker(e3, n22, o22, this, i22, r2) : o22;
        }, e22.prototype.ignoreFrom = Nt((function(t3) {
          return this._backCompatOption("ignoreFrom", t3);
        }), "Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."), e22.prototype.allowFrom = Nt((function(t3) {
          return this._backCompatOption("allowFrom", t3);
        }), "Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue})."), e22.prototype.actionChecker = Kt, e22.prototype.styleCursor = Ht;
      } };
      function Jt(t2, e22, n22, r2, i22) {
        return e22.testIgnoreAllow(e22.options[t2.name], n22, r2) && e22.options[t2.name].enabled && ee(e22, n22, t2, i22) ? t2 : null;
      }
      function Qt(t2, e22, n22, r2, i22, o22, a2) {
        for (var s2 = 0, c2 = r2.length; s2 < c2; s2++) {
          var l22 = r2[s2], u22 = i22[s2], p2 = l22.getAction(e22, n22, t2, u22);
          if (p2) {
            var f2 = Jt(p2, l22, u22, o22, a2);
            if (f2) return { action: f2, interactable: l22, element: u22 };
          }
        }
        return { action: null, interactable: null, element: null };
      }
      function Zt(t2, e22, n22, r2, i22) {
        var o22 = [], a2 = [], s2 = r2;
        function c2(t3) {
          o22.push(t3), a2.push(s2);
        }
        for (; w.element(s2); ) {
          o22 = [], a2 = [], i22.interactables.forEachMatch(s2, c2);
          var l22 = Qt(t2, e22, n22, o22, a2, r2, i22);
          if (l22.action && !l22.interactable.options[l22.action.name].manualStart) return l22;
          s2 = A2(s2);
        }
        return { action: null, interactable: null, element: null };
      }
      function te(t2, e22, n22) {
        var r2 = e22.action, i22 = e22.interactable, o22 = e22.element;
        r2 = r2 || { name: null }, t2.interactable = i22, t2.element = o22, Ut(t2.prepared, r2), t2.rect = i22 && r2.name ? i22.getRect(o22) : null, ie(t2, n22), n22.fire("autoStart:prepared", { interaction: t2 });
      }
      function ee(t2, e22, n22, r2) {
        var i22 = t2.options, o22 = i22[n22.name].max, a2 = i22[n22.name].maxPerElement, s2 = r2.autoStart.maxInteractions, c2 = 0, l22 = 0, u22 = 0;
        if (!(o22 && a2 && s2)) return false;
        for (var p2 = 0, f2 = r2.interactions.list; p2 < f2.length; p2++) {
          var d2 = f2[p2], h2 = d2.prepared.name;
          if (d2.interacting()) {
            if (++c2 >= s2) return false;
            if (d2.interactable === t2) {
              if ((l22 += h2 === n22.name ? 1 : 0) >= o22) return false;
              if (d2.element === e22 && (u22++, h2 === n22.name && u22 >= a2)) return false;
            }
          }
        }
        return s2 > 0;
      }
      function ne(t2, e22) {
        return w.number(t2) ? (e22.autoStart.maxInteractions = t2, this) : e22.autoStart.maxInteractions;
      }
      function re(t2, e22, n22) {
        var r2 = n22.autoStart.cursorElement;
        r2 && r2 !== t2 && (r2.style.cursor = ""), t2.ownerDocument.documentElement.style.cursor = e22, t2.style.cursor = e22, n22.autoStart.cursorElement = e22 ? t2 : null;
      }
      function ie(t2, e22) {
        var n22 = t2.interactable, r2 = t2.element, i22 = t2.prepared;
        if ("mouse" === t2.pointerType && n22 && n22.options.styleCursor) {
          var o22 = "";
          if (i22.name) {
            var a2 = n22.options[i22.name].cursorChecker;
            o22 = w.func(a2) ? a2(i22, n22, r2, t2._interacting) : e22.actions.map[i22.name].getCursor(i22);
          }
          re(t2.element, o22 || "", e22);
        } else e22.autoStart.cursorElement && re(e22.autoStart.cursorElement, "", e22);
      }
      var oe = { id: "auto-start/base", before: ["actions"], install: function(t2) {
        var e22 = t2.interactStatic, n22 = t2.defaults;
        t2.usePlugin($t), n22.base.actionChecker = null, n22.base.styleCursor = true, V(n22.perAction, { manualStart: false, max: 1 / 0, maxPerElement: 1, allowFrom: null, ignoreFrom: null, mouseButtons: 1 }), e22.maxInteractions = function(e3) {
          return ne(e3, t2);
        }, t2.autoStart = { maxInteractions: 1 / 0, withinInteractionLimit: ee, cursorElement: null };
      }, listeners: { "interactions:down": function(t2, e22) {
        var n22 = t2.interaction, r2 = t2.pointer, i22 = t2.event, o22 = t2.eventTarget;
        n22.interacting() || te(n22, Zt(n22, r2, i22, o22, e22), e22);
      }, "interactions:move": function(t2, e22) {
        !(function(t3, e3) {
          var n22 = t3.interaction, r2 = t3.pointer, i22 = t3.event, o22 = t3.eventTarget;
          "mouse" !== n22.pointerType || n22.pointerIsDown || n22.interacting() || te(n22, Zt(n22, r2, i22, o22, e3), e3);
        })(t2, e22), (function(t3, e3) {
          var n22 = t3.interaction;
          if (n22.pointerIsDown && !n22.interacting() && n22.pointerWasMoved && n22.prepared.name) {
            e3.fire("autoStart:before-start", t3);
            var r2 = n22.interactable, i22 = n22.prepared.name;
            i22 && r2 && (r2.options[i22].manualStart || !ee(r2, n22.element, n22.prepared, e3) ? n22.stop() : (n22.start(n22.prepared, r2, n22.element), ie(n22, e3)));
          }
        })(t2, e22);
      }, "interactions:stop": function(t2, e22) {
        var n22 = t2.interaction, r2 = n22.interactable;
        r2 && r2.options.styleCursor && re(n22.element, "", e22);
      } }, maxInteractions: ne, withinInteractionLimit: ee, validateAction: Jt }, ae = oe;
      var se = { id: "auto-start/dragAxis", listeners: { "autoStart:before-start": function(t2, e22) {
        var n22 = t2.interaction, r2 = t2.eventTarget, i22 = t2.dx, o22 = t2.dy;
        if ("drag" === n22.prepared.name) {
          var a2 = Math.abs(i22), s2 = Math.abs(o22), c2 = n22.interactable.options.drag, l22 = c2.startAxis, u22 = a2 > s2 ? "x" : a2 < s2 ? "y" : "xy";
          if (n22.prepared.axis = "start" === c2.lockAxis ? u22[0] : c2.lockAxis, "xy" !== u22 && "xy" !== l22 && l22 !== u22) {
            n22.prepared.name = null;
            for (var p2 = r2, f2 = function(t3) {
              if (t3 !== n22.interactable) {
                var i3 = n22.interactable.options.drag;
                if (!i3.manualStart && t3.testIgnoreAllow(i3, p2, r2)) {
                  var o3 = t3.getAction(n22.downPointer, n22.downEvent, n22, p2);
                  if (o3 && "drag" === o3.name && (function(t4, e3) {
                    if (!e3) return false;
                    var n3 = e3.options.drag.startAxis;
                    return "xy" === t4 || "xy" === n3 || n3 === t4;
                  })(u22, t3) && ae.validateAction(o3, t3, p2, r2, e22)) return t3;
                }
              }
            }; w.element(p2); ) {
              var d2 = e22.interactables.forEachMatch(p2, f2);
              if (d2) {
                n22.prepared.name = "drag", n22.interactable = d2, n22.element = p2;
                break;
              }
              p2 = A2(p2);
            }
          }
        }
      } } };
      function ce(t2) {
        var e22 = t2.prepared && t2.prepared.name;
        if (!e22) return null;
        var n22 = t2.interactable.options;
        return n22[e22].hold || n22[e22].delay;
      }
      var le = { id: "auto-start/hold", install: function(t2) {
        var e22 = t2.defaults;
        t2.usePlugin(ae), e22.perAction.hold = 0, e22.perAction.delay = 0;
      }, listeners: { "interactions:new": function(t2) {
        t2.interaction.autoStartHoldTimer = null;
      }, "autoStart:prepared": function(t2) {
        var e22 = t2.interaction, n22 = ce(e22);
        n22 > 0 && (e22.autoStartHoldTimer = setTimeout((function() {
          e22.start(e22.prepared, e22.interactable, e22.element);
        }), n22));
      }, "interactions:move": function(t2) {
        var e22 = t2.interaction, n22 = t2.duplicate;
        e22.autoStartHoldTimer && e22.pointerWasMoved && !n22 && (clearTimeout(e22.autoStartHoldTimer), e22.autoStartHoldTimer = null);
      }, "autoStart:before-start": function(t2) {
        var e22 = t2.interaction;
        ce(e22) > 0 && (e22.prepared.name = null);
      } }, getHoldDuration: ce }, ue = le, pe = { id: "auto-start", install: function(t2) {
        t2.usePlugin(ae), t2.usePlugin(ue), t2.usePlugin(se);
      } }, fe = function(t2) {
        return /^(always|never|auto)$/.test(t2) ? (this.options.preventDefault = t2, this) : w.bool(t2) ? (this.options.preventDefault = t2 ? "always" : "never", this) : this.options.preventDefault;
      };
      function de(t2) {
        var e22 = t2.interaction, n22 = t2.event;
        e22.interactable && e22.interactable.checkAndPreventDefault(n22);
      }
      var he = { id: "core/interactablePreventDefault", install: function(t2) {
        var e22 = t2.Interactable;
        e22.prototype.preventDefault = fe, e22.prototype.checkAndPreventDefault = function(e3) {
          return (function(t3, e4, n22) {
            var r2 = t3.options.preventDefault;
            if ("never" !== r2) if ("always" !== r2) {
              if (e4.events.supportsPassive && /^touch(start|move)$/.test(n22.type)) {
                var i22 = y(n22.target).document, o22 = e4.getDocOptions(i22);
                if (!o22 || !o22.events || false !== o22.events.passive) return;
              }
              /^(mouse|pointer|touch)*(down|start)/i.test(n22.type) || w.element(n22.target) && R(n22.target, "input,select,textarea,[contenteditable=true],[contenteditable=true] *") || n22.preventDefault();
            } else n22.preventDefault();
          })(this, t2, e3);
        }, t2.interactions.docEvents.push({ type: "dragstart", listener: function(e3) {
          for (var n22 = 0, r2 = t2.interactions.list; n22 < r2.length; n22++) {
            var i22 = r2[n22];
            if (i22.element && (i22.element === e3.target || M(i22.element, e3.target))) return void i22.interactable.checkAndPreventDefault(e3);
          }
        } });
      }, listeners: ["down", "move", "up", "cancel"].reduce((function(t2, e22) {
        return t2["interactions:".concat(e22)] = de, t2;
      }), {}) };
      function ve(t2, e22) {
        if (e22.phaselessTypes[t2]) return true;
        for (var n22 in e22.map) if (0 === t2.indexOf(n22) && t2.substr(n22.length) in e22.phases) return true;
        return false;
      }
      function ge(t2) {
        var e22 = {};
        for (var n22 in t2) {
          var r2 = t2[n22];
          w.plainObject(r2) ? e22[n22] = ge(r2) : w.array(r2) ? e22[n22] = mt(r2) : e22[n22] = r2;
        }
        return e22;
      }
      var me = (function() {
        function t2(e22) {
          r(this, t2), this.states = [], this.startOffset = { left: 0, right: 0, top: 0, bottom: 0 }, this.startDelta = void 0, this.result = void 0, this.endResult = void 0, this.startEdges = void 0, this.edges = void 0, this.interaction = void 0, this.interaction = e22, this.result = ye(), this.edges = { left: false, right: false, top: false, bottom: false };
        }
        return o2(t2, [{ key: "start", value: function(t3, e22) {
          var n22, r2, i22 = t3.phase, o22 = this.interaction, a2 = (function(t4) {
            var e3 = t4.interactable.options[t4.prepared.name], n3 = e3.modifiers;
            if (n3 && n3.length) return n3;
            return ["snap", "snapSize", "snapEdges", "restrict", "restrictEdges", "restrictSize"].map((function(t5) {
              var n4 = e3[t5];
              return n4 && n4.enabled && { options: n4, methods: n4._methods };
            })).filter((function(t5) {
              return !!t5;
            }));
          })(o22);
          this.prepareStates(a2), this.startEdges = V({}, o22.edges), this.edges = V({}, this.startEdges), this.startOffset = (n22 = o22.rect, r2 = e22, n22 ? { left: r2.x - n22.left, top: r2.y - n22.top, right: n22.right - r2.x, bottom: n22.bottom - r2.y } : { left: 0, top: 0, right: 0, bottom: 0 }), this.startDelta = { x: 0, y: 0 };
          var s2 = this.fillArg({ phase: i22, pageCoords: e22, preEnd: false });
          return this.result = ye(), this.startAll(s2), this.result = this.setAll(s2);
        } }, { key: "fillArg", value: function(t3) {
          var e22 = this.interaction;
          return t3.interaction = e22, t3.interactable = e22.interactable, t3.element = e22.element, t3.rect || (t3.rect = e22.rect), t3.edges || (t3.edges = this.startEdges), t3.startOffset = this.startOffset, t3;
        } }, { key: "startAll", value: function(t3) {
          for (var e22 = 0, n22 = this.states; e22 < n22.length; e22++) {
            var r2 = n22[e22];
            r2.methods.start && (t3.state = r2, r2.methods.start(t3));
          }
        } }, { key: "setAll", value: function(t3) {
          var e22 = t3.phase, n22 = t3.preEnd, r2 = t3.skipModifiers, i22 = t3.rect, o22 = t3.edges;
          t3.coords = V({}, t3.pageCoords), t3.rect = V({}, i22), t3.edges = V({}, o22);
          for (var a2 = r2 ? this.states.slice(r2) : this.states, s2 = ye(t3.coords, t3.rect), c2 = 0; c2 < a2.length; c2++) {
            var l22, u22 = a2[c2], p2 = u22.options, f2 = V({}, t3.coords), d2 = null;
            null != (l22 = u22.methods) && l22.set && this.shouldDo(p2, n22, e22) && (t3.state = u22, d2 = u22.methods.set(t3), H(t3.edges, t3.rect, { x: t3.coords.x - f2.x, y: t3.coords.y - f2.y })), s2.eventProps.push(d2);
          }
          V(this.edges, t3.edges), s2.delta.x = t3.coords.x - t3.pageCoords.x, s2.delta.y = t3.coords.y - t3.pageCoords.y, s2.rectDelta.left = t3.rect.left - i22.left, s2.rectDelta.right = t3.rect.right - i22.right, s2.rectDelta.top = t3.rect.top - i22.top, s2.rectDelta.bottom = t3.rect.bottom - i22.bottom;
          var h2 = this.result.coords, v2 = this.result.rect;
          if (h2 && v2) {
            var g2 = s2.rect.left !== v2.left || s2.rect.right !== v2.right || s2.rect.top !== v2.top || s2.rect.bottom !== v2.bottom;
            s2.changed = g2 || h2.x !== s2.coords.x || h2.y !== s2.coords.y;
          }
          return s2;
        } }, { key: "applyToInteraction", value: function(t3) {
          var e22 = this.interaction, n22 = t3.phase, r2 = e22.coords.cur, i22 = e22.coords.start, o22 = this.result, a2 = this.startDelta, s2 = o22.delta;
          "start" === n22 && V(this.startDelta, o22.delta);
          for (var c2 = 0, l22 = [[i22, a2], [r2, s2]]; c2 < l22.length; c2++) {
            var u22 = l22[c2], p2 = u22[0], f2 = u22[1];
            p2.page.x += f2.x, p2.page.y += f2.y, p2.client.x += f2.x, p2.client.y += f2.y;
          }
          var d2 = this.result.rectDelta, h2 = t3.rect || e22.rect;
          h2.left += d2.left, h2.right += d2.right, h2.top += d2.top, h2.bottom += d2.bottom, h2.width = h2.right - h2.left, h2.height = h2.bottom - h2.top;
        } }, { key: "setAndApply", value: function(t3) {
          var e22 = this.interaction, n22 = t3.phase, r2 = t3.preEnd, i22 = t3.skipModifiers, o22 = this.setAll(this.fillArg({ preEnd: r2, phase: n22, pageCoords: t3.modifiedCoords || e22.coords.cur.page }));
          if (this.result = o22, !o22.changed && (!i22 || i22 < this.states.length) && e22.interacting()) return false;
          if (t3.modifiedCoords) {
            var a2 = e22.coords.cur.page, s2 = { x: t3.modifiedCoords.x - a2.x, y: t3.modifiedCoords.y - a2.y };
            o22.coords.x += s2.x, o22.coords.y += s2.y, o22.delta.x += s2.x, o22.delta.y += s2.y;
          }
          this.applyToInteraction(t3);
        } }, { key: "beforeEnd", value: function(t3) {
          var e22 = t3.interaction, n22 = t3.event, r2 = this.states;
          if (r2 && r2.length) {
            for (var i22 = false, o22 = 0; o22 < r2.length; o22++) {
              var a2 = r2[o22];
              t3.state = a2;
              var s2 = a2.options, c2 = a2.methods, l22 = c2.beforeEnd && c2.beforeEnd(t3);
              if (l22) return this.endResult = l22, false;
              i22 = i22 || !i22 && this.shouldDo(s2, true, t3.phase, true);
            }
            i22 && e22.move({ event: n22, preEnd: true });
          }
        } }, { key: "stop", value: function(t3) {
          var e22 = t3.interaction;
          if (this.states && this.states.length) {
            var n22 = V({ states: this.states, interactable: e22.interactable, element: e22.element, rect: null }, t3);
            this.fillArg(n22);
            for (var r2 = 0, i22 = this.states; r2 < i22.length; r2++) {
              var o22 = i22[r2];
              n22.state = o22, o22.methods.stop && o22.methods.stop(n22);
            }
            this.states = null, this.endResult = null;
          }
        } }, { key: "prepareStates", value: function(t3) {
          this.states = [];
          for (var e22 = 0; e22 < t3.length; e22++) {
            var n22 = t3[e22], r2 = n22.options, i22 = n22.methods, o22 = n22.name;
            this.states.push({ options: r2, methods: i22, index: e22, name: o22 });
          }
          return this.states;
        } }, { key: "restoreInteractionCoords", value: function(t3) {
          var e22 = t3.interaction, n22 = e22.coords, r2 = e22.rect, i22 = e22.modification;
          if (i22.result) {
            for (var o22 = i22.startDelta, a2 = i22.result, s2 = a2.delta, c2 = a2.rectDelta, l22 = 0, u22 = [[n22.start, o22], [n22.cur, s2]]; l22 < u22.length; l22++) {
              var p2 = u22[l22], f2 = p2[0], d2 = p2[1];
              f2.page.x -= d2.x, f2.page.y -= d2.y, f2.client.x -= d2.x, f2.client.y -= d2.y;
            }
            r2.left -= c2.left, r2.right -= c2.right, r2.top -= c2.top, r2.bottom -= c2.bottom;
          }
        } }, { key: "shouldDo", value: function(t3, e22, n22, r2) {
          return !(!t3 || false === t3.enabled || r2 && !t3.endOnly || t3.endOnly && !e22 || "start" === n22 && !t3.setStart);
        } }, { key: "copyFrom", value: function(t3) {
          this.startOffset = t3.startOffset, this.startDelta = t3.startDelta, this.startEdges = t3.startEdges, this.edges = t3.edges, this.states = t3.states.map((function(t4) {
            return ge(t4);
          })), this.result = ye(V({}, t3.result.coords), V({}, t3.result.rect));
        } }, { key: "destroy", value: function() {
          for (var t3 in this) this[t3] = null;
        } }]), t2;
      })();
      function ye(t2, e22) {
        return { rect: e22, coords: t2, delta: { x: 0, y: 0 }, rectDelta: { left: 0, right: 0, top: 0, bottom: 0 }, eventProps: [], changed: true };
      }
      function be(t2, e22) {
        var n22 = t2.defaults, r2 = { start: t2.start, set: t2.set, beforeEnd: t2.beforeEnd, stop: t2.stop }, i22 = function(t3) {
          var i3 = t3 || {};
          for (var o22 in i3.enabled = false !== i3.enabled, n22) o22 in i3 || (i3[o22] = n22[o22]);
          var a2 = { options: i3, methods: r2, name: e22, enable: function() {
            return i3.enabled = true, a2;
          }, disable: function() {
            return i3.enabled = false, a2;
          } };
          return a2;
        };
        return e22 && "string" == typeof e22 && (i22._defaults = n22, i22._methods = r2), i22;
      }
      function xe(t2) {
        var e22 = t2.iEvent, n22 = t2.interaction.modification.result;
        n22 && (e22.modifiers = n22.eventProps);
      }
      var we = { id: "modifiers/base", before: ["actions"], install: function(t2) {
        t2.defaults.perAction.modifiers = [];
      }, listeners: { "interactions:new": function(t2) {
        var e22 = t2.interaction;
        e22.modification = new me(e22);
      }, "interactions:before-action-start": function(t2) {
        var e22 = t2.interaction, n22 = t2.interaction.modification;
        n22.start(t2, e22.coords.start.page), e22.edges = n22.edges, n22.applyToInteraction(t2);
      }, "interactions:before-action-move": function(t2) {
        var e22 = t2.interaction, n22 = e22.modification, r2 = n22.setAndApply(t2);
        return e22.edges = n22.edges, r2;
      }, "interactions:before-action-end": function(t2) {
        var e22 = t2.interaction, n22 = e22.modification, r2 = n22.beforeEnd(t2);
        return e22.edges = n22.startEdges, r2;
      }, "interactions:action-start": xe, "interactions:action-move": xe, "interactions:action-end": xe, "interactions:after-action-start": function(t2) {
        return t2.interaction.modification.restoreInteractionCoords(t2);
      }, "interactions:after-action-move": function(t2) {
        return t2.interaction.modification.restoreInteractionCoords(t2);
      }, "interactions:stop": function(t2) {
        return t2.interaction.modification.stop(t2);
      } } }, Ee = we, Te = { base: { preventDefault: "auto", deltaSource: "page" }, perAction: { enabled: false, origin: { x: 0, y: 0 } }, actions: {} }, Se = (function(t2) {
        s(n22, t2);
        var e22 = p(n22);
        function n22(t3, i22, o22, a2, s2, c2, l22) {
          var p2;
          r(this, n22), (p2 = e22.call(this, t3)).relatedTarget = null, p2.screenX = void 0, p2.screenY = void 0, p2.button = void 0, p2.buttons = void 0, p2.ctrlKey = void 0, p2.shiftKey = void 0, p2.altKey = void 0, p2.metaKey = void 0, p2.page = void 0, p2.client = void 0, p2.delta = void 0, p2.rect = void 0, p2.x0 = void 0, p2.y0 = void 0, p2.t0 = void 0, p2.dt = void 0, p2.duration = void 0, p2.clientX0 = void 0, p2.clientY0 = void 0, p2.velocity = void 0, p2.speed = void 0, p2.swipe = void 0, p2.axes = void 0, p2.preEnd = void 0, s2 = s2 || t3.element;
          var f2 = t3.interactable, d2 = (f2 && f2.options || Te).deltaSource, h2 = K(f2, s2, o22), v2 = "start" === a2, g2 = "end" === a2, m2 = v2 ? u2(p2) : t3.prevEvent, y2 = v2 ? t3.coords.start : g2 ? { page: m2.page, client: m2.client, timeStamp: t3.coords.cur.timeStamp } : t3.coords.cur;
          return p2.page = V({}, y2.page), p2.client = V({}, y2.client), p2.rect = V({}, t3.rect), p2.timeStamp = y2.timeStamp, g2 || (p2.page.x -= h2.x, p2.page.y -= h2.y, p2.client.x -= h2.x, p2.client.y -= h2.y), p2.ctrlKey = i22.ctrlKey, p2.altKey = i22.altKey, p2.shiftKey = i22.shiftKey, p2.metaKey = i22.metaKey, p2.button = i22.button, p2.buttons = i22.buttons, p2.target = s2, p2.currentTarget = s2, p2.preEnd = c2, p2.type = l22 || o22 + (a2 || ""), p2.interactable = f2, p2.t0 = v2 ? t3.pointers[t3.pointers.length - 1].downTime : m2.t0, p2.x0 = t3.coords.start.page.x - h2.x, p2.y0 = t3.coords.start.page.y - h2.y, p2.clientX0 = t3.coords.start.client.x - h2.x, p2.clientY0 = t3.coords.start.client.y - h2.y, p2.delta = v2 || g2 ? { x: 0, y: 0 } : { x: p2[d2].x - m2[d2].x, y: p2[d2].y - m2[d2].y }, p2.dt = t3.coords.delta.timeStamp, p2.duration = p2.timeStamp - p2.t0, p2.velocity = V({}, t3.coords.velocity[d2]), p2.speed = Q(p2.velocity.x, p2.velocity.y), p2.swipe = g2 || "inertiastart" === a2 ? p2.getSwipe() : null, p2;
        }
        return o2(n22, [{ key: "getSwipe", value: function() {
          var t3 = this._interaction;
          if (t3.prevEvent.speed < 600 || this.timeStamp - t3.prevEvent.timeStamp > 150) return null;
          var e3 = 180 * Math.atan2(t3.prevEvent.velocityY, t3.prevEvent.velocityX) / Math.PI;
          e3 < 0 && (e3 += 360);
          var n3 = 112.5 <= e3 && e3 < 247.5, r2 = 202.5 <= e3 && e3 < 337.5;
          return { up: r2, down: !r2 && 22.5 <= e3 && e3 < 157.5, left: n3, right: !n3 && (292.5 <= e3 || e3 < 67.5), angle: e3, speed: t3.prevEvent.speed, velocity: { x: t3.prevEvent.velocityX, y: t3.prevEvent.velocityY } };
        } }, { key: "preventDefault", value: function() {
        } }, { key: "stopImmediatePropagation", value: function() {
          this.immediatePropagationStopped = this.propagationStopped = true;
        } }, { key: "stopPropagation", value: function() {
          this.propagationStopped = true;
        } }]), n22;
      })(vt);
      Object.defineProperties(Se.prototype, { pageX: { get: function() {
        return this.page.x;
      }, set: function(t2) {
        this.page.x = t2;
      } }, pageY: { get: function() {
        return this.page.y;
      }, set: function(t2) {
        this.page.y = t2;
      } }, clientX: { get: function() {
        return this.client.x;
      }, set: function(t2) {
        this.client.x = t2;
      } }, clientY: { get: function() {
        return this.client.y;
      }, set: function(t2) {
        this.client.y = t2;
      } }, dx: { get: function() {
        return this.delta.x;
      }, set: function(t2) {
        this.delta.x = t2;
      } }, dy: { get: function() {
        return this.delta.y;
      }, set: function(t2) {
        this.delta.y = t2;
      } }, velocityX: { get: function() {
        return this.velocity.x;
      }, set: function(t2) {
        this.velocity.x = t2;
      } }, velocityY: { get: function() {
        return this.velocity.y;
      }, set: function(t2) {
        this.velocity.y = t2;
      } } });
      var _e = o2((function t2(e22, n22, i22, o22, a2) {
        r(this, t2), this.id = void 0, this.pointer = void 0, this.event = void 0, this.downTime = void 0, this.downTarget = void 0, this.id = e22, this.pointer = n22, this.event = i22, this.downTime = o22, this.downTarget = a2;
      })), Pe = (function(t2) {
        return t2.interactable = "", t2.element = "", t2.prepared = "", t2.pointerIsDown = "", t2.pointerWasMoved = "", t2._proxy = "", t2;
      })({}), Oe = (function(t2) {
        return t2.start = "", t2.move = "", t2.end = "", t2.stop = "", t2.interacting = "", t2;
      })({}), ke = 0, De = (function() {
        function t2(e22) {
          var n22 = this, i22 = e22.pointerType, o22 = e22.scopeFire;
          r(this, t2), this.interactable = null, this.element = null, this.rect = null, this._rects = void 0, this.edges = null, this._scopeFire = void 0, this.prepared = { name: null, axis: null, edges: null }, this.pointerType = void 0, this.pointers = [], this.downEvent = null, this.downPointer = {}, this._latestPointer = { pointer: null, event: null, eventTarget: null }, this.prevEvent = null, this.pointerIsDown = false, this.pointerWasMoved = false, this._interacting = false, this._ending = false, this._stopped = true, this._proxy = void 0, this.simulation = null, this.doMove = Nt((function(t3) {
            this.move(t3);
          }), "The interaction.doMove() method has been renamed to interaction.move()"), this.coords = { start: { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 }, prev: { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 }, cur: { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 }, delta: { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 }, velocity: { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 } }, this._id = ke++, this._scopeFire = o22, this.pointerType = i22;
          var a2 = this;
          this._proxy = {};
          var s2 = function(t3) {
            Object.defineProperty(n22._proxy, t3, { get: function() {
              return a2[t3];
            } });
          };
          for (var c2 in Pe) s2(c2);
          var l22 = function(t3) {
            Object.defineProperty(n22._proxy, t3, { value: function() {
              return a2[t3].apply(a2, arguments);
            } });
          };
          for (var u22 in Oe) l22(u22);
          this._scopeFire("interactions:new", { interaction: this });
        }
        return o2(t2, [{ key: "pointerMoveTolerance", get: function() {
          return 1;
        } }, { key: "pointerDown", value: function(t3, e22, n22) {
          var r2 = this.updatePointer(t3, e22, n22, true), i22 = this.pointers[r2];
          this._scopeFire("interactions:down", { pointer: t3, event: e22, eventTarget: n22, pointerIndex: r2, pointerInfo: i22, type: "down", interaction: this });
        } }, { key: "start", value: function(t3, e22, n22) {
          return !(this.interacting() || !this.pointerIsDown || this.pointers.length < ("gesture" === t3.name ? 2 : 1) || !e22.options[t3.name].enabled) && (Ut(this.prepared, t3), this.interactable = e22, this.element = n22, this.rect = e22.getRect(n22), this.edges = this.prepared.edges ? V({}, this.prepared.edges) : { left: true, right: true, top: true, bottom: true }, this._stopped = false, this._interacting = this._doPhase({ interaction: this, event: this.downEvent, phase: "start" }) && !this._stopped, this._interacting);
        } }, { key: "pointerMove", value: function(t3, e22, n22) {
          this.simulation || this.modification && this.modification.endResult || this.updatePointer(t3, e22, n22, false);
          var r2, i22, o22 = this.coords.cur.page.x === this.coords.prev.page.x && this.coords.cur.page.y === this.coords.prev.page.y && this.coords.cur.client.x === this.coords.prev.client.x && this.coords.cur.client.y === this.coords.prev.client.y;
          this.pointerIsDown && !this.pointerWasMoved && (r2 = this.coords.cur.client.x - this.coords.start.client.x, i22 = this.coords.cur.client.y - this.coords.start.client.y, this.pointerWasMoved = Q(r2, i22) > this.pointerMoveTolerance);
          var a2, s2, c2, l22 = this.getPointerIndex(t3), u22 = { pointer: t3, pointerIndex: l22, pointerInfo: this.pointers[l22], event: e22, type: "move", eventTarget: n22, dx: r2, dy: i22, duplicate: o22, interaction: this };
          o22 || (a2 = this.coords.velocity, s2 = this.coords.delta, c2 = Math.max(s2.timeStamp / 1e3, 1e-3), a2.page.x = s2.page.x / c2, a2.page.y = s2.page.y / c2, a2.client.x = s2.client.x / c2, a2.client.y = s2.client.y / c2, a2.timeStamp = c2), this._scopeFire("interactions:move", u22), o22 || this.simulation || (this.interacting() && (u22.type = null, this.move(u22)), this.pointerWasMoved && et(this.coords.prev, this.coords.cur));
        } }, { key: "move", value: function(t3) {
          t3 && t3.event || nt(this.coords.delta), (t3 = V({ pointer: this._latestPointer.pointer, event: this._latestPointer.event, eventTarget: this._latestPointer.eventTarget, interaction: this }, t3 || {})).phase = "move", this._doPhase(t3);
        } }, { key: "pointerUp", value: function(t3, e22, n22, r2) {
          var i22 = this.getPointerIndex(t3);
          -1 === i22 && (i22 = this.updatePointer(t3, e22, n22, false));
          var o22 = /cancel$/i.test(e22.type) ? "cancel" : "up";
          this._scopeFire("interactions:".concat(o22), { pointer: t3, pointerIndex: i22, pointerInfo: this.pointers[i22], event: e22, eventTarget: n22, type: o22, curEventTarget: r2, interaction: this }), this.simulation || this.end(e22), this.removePointer(t3, e22);
        } }, { key: "documentBlur", value: function(t3) {
          this.end(t3), this._scopeFire("interactions:blur", { event: t3, type: "blur", interaction: this });
        } }, { key: "end", value: function(t3) {
          var e22;
          this._ending = true, t3 = t3 || this._latestPointer.event, this.interacting() && (e22 = this._doPhase({ event: t3, interaction: this, phase: "end" })), this._ending = false, true === e22 && this.stop();
        } }, { key: "currentAction", value: function() {
          return this._interacting ? this.prepared.name : null;
        } }, { key: "interacting", value: function() {
          return this._interacting;
        } }, { key: "stop", value: function() {
          this._scopeFire("interactions:stop", { interaction: this }), this.interactable = this.element = null, this._interacting = false, this._stopped = true, this.prepared.name = this.prevEvent = null;
        } }, { key: "getPointerIndex", value: function(t3) {
          var e22 = at(t3);
          return "mouse" === this.pointerType || "pen" === this.pointerType ? this.pointers.length - 1 : yt(this.pointers, (function(t4) {
            return t4.id === e22;
          }));
        } }, { key: "getPointerInfo", value: function(t3) {
          return this.pointers[this.getPointerIndex(t3)];
        } }, { key: "updatePointer", value: function(t3, e22, n22, r2) {
          var i22, o22, a2, s2 = at(t3), c2 = this.getPointerIndex(t3), l22 = this.pointers[c2];
          return r2 = false !== r2 && (r2 || /(down|start)$/i.test(e22.type)), l22 ? l22.pointer = t3 : (l22 = new _e(s2, t3, e22, null, null), c2 = this.pointers.length, this.pointers.push(l22)), st(this.coords.cur, this.pointers.map((function(t4) {
            return t4.pointer;
          })), this._now()), i22 = this.coords.delta, o22 = this.coords.prev, a2 = this.coords.cur, i22.page.x = a2.page.x - o22.page.x, i22.page.y = a2.page.y - o22.page.y, i22.client.x = a2.client.x - o22.client.x, i22.client.y = a2.client.y - o22.client.y, i22.timeStamp = a2.timeStamp - o22.timeStamp, r2 && (this.pointerIsDown = true, l22.downTime = this.coords.cur.timeStamp, l22.downTarget = n22, tt(this.downPointer, t3), this.interacting() || (et(this.coords.start, this.coords.cur), et(this.coords.prev, this.coords.cur), this.downEvent = e22, this.pointerWasMoved = false)), this._updateLatestPointer(t3, e22, n22), this._scopeFire("interactions:update-pointer", { pointer: t3, event: e22, eventTarget: n22, down: r2, pointerInfo: l22, pointerIndex: c2, interaction: this }), c2;
        } }, { key: "removePointer", value: function(t3, e22) {
          var n22 = this.getPointerIndex(t3);
          if (-1 !== n22) {
            var r2 = this.pointers[n22];
            this._scopeFire("interactions:remove-pointer", { pointer: t3, event: e22, eventTarget: null, pointerIndex: n22, pointerInfo: r2, interaction: this }), this.pointers.splice(n22, 1), this.pointerIsDown = false;
          }
        } }, { key: "_updateLatestPointer", value: function(t3, e22, n22) {
          this._latestPointer.pointer = t3, this._latestPointer.event = e22, this._latestPointer.eventTarget = n22;
        } }, { key: "destroy", value: function() {
          this._latestPointer.pointer = null, this._latestPointer.event = null, this._latestPointer.eventTarget = null;
        } }, { key: "_createPreparedEvent", value: function(t3, e22, n22, r2) {
          return new Se(this, t3, this.prepared.name, e22, this.element, n22, r2);
        } }, { key: "_fireEvent", value: function(t3) {
          var e22;
          null == (e22 = this.interactable) || e22.fire(t3), (!this.prevEvent || t3.timeStamp >= this.prevEvent.timeStamp) && (this.prevEvent = t3);
        } }, { key: "_doPhase", value: function(t3) {
          var e22 = t3.event, n22 = t3.phase, r2 = t3.preEnd, i22 = t3.type, o22 = this.rect;
          if (o22 && "move" === n22 && (H(this.edges, o22, this.coords.delta[this.interactable.options.deltaSource]), o22.width = o22.right - o22.left, o22.height = o22.bottom - o22.top), false === this._scopeFire("interactions:before-action-".concat(n22), t3)) return false;
          var a2 = t3.iEvent = this._createPreparedEvent(e22, n22, r2, i22);
          return this._scopeFire("interactions:action-".concat(n22), t3), "start" === n22 && (this.prevEvent = a2), this._fireEvent(a2), this._scopeFire("interactions:after-action-".concat(n22), t3), true;
        } }, { key: "_now", value: function() {
          return Date.now();
        } }]), t2;
      })();
      function Ie(t2) {
        Me(t2.interaction);
      }
      function Me(t2) {
        if (!(function(t3) {
          return !(!t3.offset.pending.x && !t3.offset.pending.y);
        })(t2)) return false;
        var e22 = t2.offset.pending;
        return Ae(t2.coords.cur, e22), Ae(t2.coords.delta, e22), H(t2.edges, t2.rect, e22), e22.x = 0, e22.y = 0, true;
      }
      function ze(t2) {
        var e22 = t2.x, n22 = t2.y;
        this.offset.pending.x += e22, this.offset.pending.y += n22, this.offset.total.x += e22, this.offset.total.y += n22;
      }
      function Ae(t2, e22) {
        var n22 = t2.page, r2 = t2.client, i22 = e22.x, o22 = e22.y;
        n22.x += i22, n22.y += o22, r2.x += i22, r2.y += o22;
      }
      Oe.offsetBy = "";
      var Re = { id: "offset", before: ["modifiers", "pointer-events", "actions", "inertia"], install: function(t2) {
        t2.Interaction.prototype.offsetBy = ze;
      }, listeners: { "interactions:new": function(t2) {
        t2.interaction.offset = { total: { x: 0, y: 0 }, pending: { x: 0, y: 0 } };
      }, "interactions:update-pointer": function(t2) {
        return (function(t3) {
          t3.pointerIsDown && (Ae(t3.coords.cur, t3.offset.total), t3.offset.pending.x = 0, t3.offset.pending.y = 0);
        })(t2.interaction);
      }, "interactions:before-action-start": Ie, "interactions:before-action-move": Ie, "interactions:before-action-end": function(t2) {
        var e22 = t2.interaction;
        if (Me(e22)) return e22.move({ offset: true }), e22.end(), false;
      }, "interactions:stop": function(t2) {
        var e22 = t2.interaction;
        e22.offset.total.x = 0, e22.offset.total.y = 0, e22.offset.pending.x = 0, e22.offset.pending.y = 0;
      } } }, Ce = Re;
      var je = (function() {
        function t2(e22) {
          r(this, t2), this.active = false, this.isModified = false, this.smoothEnd = false, this.allowResume = false, this.modification = void 0, this.modifierCount = 0, this.modifierArg = void 0, this.startCoords = void 0, this.t0 = 0, this.v0 = 0, this.te = 0, this.targetOffset = void 0, this.modifiedOffset = void 0, this.currentOffset = void 0, this.lambda_v0 = 0, this.one_ve_v0 = 0, this.timeout = void 0, this.interaction = void 0, this.interaction = e22;
        }
        return o2(t2, [{ key: "start", value: function(t3) {
          var e22 = this.interaction, n22 = Fe(e22);
          if (!n22 || !n22.enabled) return false;
          var r2 = e22.coords.velocity.client, i22 = Q(r2.x, r2.y), o22 = this.modification || (this.modification = new me(e22));
          if (o22.copyFrom(e22.modification), this.t0 = e22._now(), this.allowResume = n22.allowResume, this.v0 = i22, this.currentOffset = { x: 0, y: 0 }, this.startCoords = e22.coords.cur.page, this.modifierArg = o22.fillArg({ pageCoords: this.startCoords, preEnd: true, phase: "inertiastart" }), this.t0 - e22.coords.cur.timeStamp < 50 && i22 > n22.minSpeed && i22 > n22.endSpeed) this.startInertia();
          else {
            if (o22.result = o22.setAll(this.modifierArg), !o22.result.changed) return false;
            this.startSmoothEnd();
          }
          return e22.modification.result.rect = null, e22.offsetBy(this.targetOffset), e22._doPhase({ interaction: e22, event: t3, phase: "inertiastart" }), e22.offsetBy({ x: -this.targetOffset.x, y: -this.targetOffset.y }), e22.modification.result.rect = null, this.active = true, e22.simulation = this, true;
        } }, { key: "startInertia", value: function() {
          var t3 = this, e22 = this.interaction.coords.velocity.client, n22 = Fe(this.interaction), r2 = n22.resistance, i22 = -Math.log(n22.endSpeed / this.v0) / r2;
          this.targetOffset = { x: (e22.x - i22) / r2, y: (e22.y - i22) / r2 }, this.te = i22, this.lambda_v0 = r2 / this.v0, this.one_ve_v0 = 1 - n22.endSpeed / this.v0;
          var o22 = this.modification, a2 = this.modifierArg;
          a2.pageCoords = { x: this.startCoords.x + this.targetOffset.x, y: this.startCoords.y + this.targetOffset.y }, o22.result = o22.setAll(a2), o22.result.changed && (this.isModified = true, this.modifiedOffset = { x: this.targetOffset.x + o22.result.delta.x, y: this.targetOffset.y + o22.result.delta.y }), this.onNextFrame((function() {
            return t3.inertiaTick();
          }));
        } }, { key: "startSmoothEnd", value: function() {
          var t3 = this;
          this.smoothEnd = true, this.isModified = true, this.targetOffset = { x: this.modification.result.delta.x, y: this.modification.result.delta.y }, this.onNextFrame((function() {
            return t3.smoothEndTick();
          }));
        } }, { key: "onNextFrame", value: function(t3) {
          var e22 = this;
          this.timeout = Lt.request((function() {
            e22.active && t3();
          }));
        } }, { key: "inertiaTick", value: function() {
          var t3, e22, n22, r2, i22, o22, a2, s2 = this, c2 = this.interaction, l22 = Fe(c2).resistance, u22 = (c2._now() - this.t0) / 1e3;
          if (u22 < this.te) {
            var p2, f2 = 1 - (Math.exp(-l22 * u22) - this.lambda_v0) / this.one_ve_v0;
            this.isModified ? (t3 = 0, e22 = 0, n22 = this.targetOffset.x, r2 = this.targetOffset.y, i22 = this.modifiedOffset.x, o22 = this.modifiedOffset.y, p2 = { x: Ye(a2 = f2, t3, n22, i22), y: Ye(a2, e22, r2, o22) }) : p2 = { x: this.targetOffset.x * f2, y: this.targetOffset.y * f2 };
            var d2 = { x: p2.x - this.currentOffset.x, y: p2.y - this.currentOffset.y };
            this.currentOffset.x += d2.x, this.currentOffset.y += d2.y, c2.offsetBy(d2), c2.move(), this.onNextFrame((function() {
              return s2.inertiaTick();
            }));
          } else c2.offsetBy({ x: this.modifiedOffset.x - this.currentOffset.x, y: this.modifiedOffset.y - this.currentOffset.y }), this.end();
        } }, { key: "smoothEndTick", value: function() {
          var t3 = this, e22 = this.interaction, n22 = e22._now() - this.t0, r2 = Fe(e22).smoothEndDuration;
          if (n22 < r2) {
            var i22 = { x: Le(n22, 0, this.targetOffset.x, r2), y: Le(n22, 0, this.targetOffset.y, r2) }, o22 = { x: i22.x - this.currentOffset.x, y: i22.y - this.currentOffset.y };
            this.currentOffset.x += o22.x, this.currentOffset.y += o22.y, e22.offsetBy(o22), e22.move({ skipModifiers: this.modifierCount }), this.onNextFrame((function() {
              return t3.smoothEndTick();
            }));
          } else e22.offsetBy({ x: this.targetOffset.x - this.currentOffset.x, y: this.targetOffset.y - this.currentOffset.y }), this.end();
        } }, { key: "resume", value: function(t3) {
          var e22 = t3.pointer, n22 = t3.event, r2 = t3.eventTarget, i22 = this.interaction;
          i22.offsetBy({ x: -this.currentOffset.x, y: -this.currentOffset.y }), i22.updatePointer(e22, n22, r2, true), i22._doPhase({ interaction: i22, event: n22, phase: "resume" }), et(i22.coords.prev, i22.coords.cur), this.stop();
        } }, { key: "end", value: function() {
          this.interaction.move(), this.interaction.end(), this.stop();
        } }, { key: "stop", value: function() {
          this.active = this.smoothEnd = false, this.interaction.simulation = null, Lt.cancel(this.timeout);
        } }]), t2;
      })();
      function Fe(t2) {
        var e22 = t2.interactable, n22 = t2.prepared;
        return e22 && e22.options && n22.name && e22.options[n22.name].inertia;
      }
      var Xe = { id: "inertia", before: ["modifiers", "actions"], install: function(t2) {
        var e22 = t2.defaults;
        t2.usePlugin(Ce), t2.usePlugin(Ee), t2.actions.phases.inertiastart = true, t2.actions.phases.resume = true, e22.perAction.inertia = { enabled: false, resistance: 10, minSpeed: 100, endSpeed: 10, allowResume: true, smoothEndDuration: 300 };
      }, listeners: { "interactions:new": function(t2) {
        var e22 = t2.interaction;
        e22.inertia = new je(e22);
      }, "interactions:before-action-end": function(t2) {
        var e22 = t2.interaction, n22 = t2.event;
        return (!e22._interacting || e22.simulation || !e22.inertia.start(n22)) && null;
      }, "interactions:down": function(t2) {
        var e22 = t2.interaction, n22 = t2.eventTarget, r2 = e22.inertia;
        if (r2.active) for (var i22 = n22; w.element(i22); ) {
          if (i22 === e22.element) {
            r2.resume(t2);
            break;
          }
          i22 = A2(i22);
        }
      }, "interactions:stop": function(t2) {
        var e22 = t2.interaction.inertia;
        e22.active && e22.stop();
      }, "interactions:before-action-resume": function(t2) {
        var e22 = t2.interaction.modification;
        e22.stop(t2), e22.start(t2, t2.interaction.coords.cur.page), e22.applyToInteraction(t2);
      }, "interactions:before-action-inertiastart": function(t2) {
        return t2.interaction.modification.setAndApply(t2);
      }, "interactions:action-resume": xe, "interactions:action-inertiastart": xe, "interactions:after-action-inertiastart": function(t2) {
        return t2.interaction.modification.restoreInteractionCoords(t2);
      }, "interactions:after-action-resume": function(t2) {
        return t2.interaction.modification.restoreInteractionCoords(t2);
      } } };
      function Ye(t2, e22, n22, r2) {
        var i22 = 1 - t2;
        return i22 * i22 * e22 + 2 * i22 * t2 * n22 + t2 * t2 * r2;
      }
      function Le(t2, e22, n22, r2) {
        return -n22 * (t2 /= r2) * (t2 - 2) + e22;
      }
      var qe = Xe;
      function Be(t2, e22) {
        for (var n22 = 0; n22 < e22.length; n22++) {
          var r2 = e22[n22];
          if (t2.immediatePropagationStopped) break;
          r2(t2);
        }
      }
      var Ve = (function() {
        function t2(e22) {
          r(this, t2), this.options = void 0, this.types = {}, this.propagationStopped = false, this.immediatePropagationStopped = false, this.global = void 0, this.options = V({}, e22 || {});
        }
        return o2(t2, [{ key: "fire", value: function(t3) {
          var e22, n22 = this.global;
          (e22 = this.types[t3.type]) && Be(t3, e22), !t3.propagationStopped && n22 && (e22 = n22[t3.type]) && Be(t3, e22);
        } }, { key: "on", value: function(t3, e22) {
          var n22 = $(t3, e22);
          for (t3 in n22) this.types[t3] = gt(this.types[t3] || [], n22[t3]);
        } }, { key: "off", value: function(t3, e22) {
          var n22 = $(t3, e22);
          for (t3 in n22) {
            var r2 = this.types[t3];
            if (r2 && r2.length) for (var i22 = 0, o22 = n22[t3]; i22 < o22.length; i22++) {
              var a2 = o22[i22], s2 = r2.indexOf(a2);
              -1 !== s2 && r2.splice(s2, 1);
            }
          }
        } }, { key: "getRect", value: function(t3) {
          return null;
        } }]), t2;
      })();
      var We = (function() {
        function t2(e22) {
          r(this, t2), this.currentTarget = void 0, this.originalEvent = void 0, this.type = void 0, this.originalEvent = e22, tt(this, e22);
        }
        return o2(t2, [{ key: "preventOriginalDefault", value: function() {
          this.originalEvent.preventDefault();
        } }, { key: "stopPropagation", value: function() {
          this.originalEvent.stopPropagation();
        } }, { key: "stopImmediatePropagation", value: function() {
          this.originalEvent.stopImmediatePropagation();
        } }]), t2;
      })();
      function Ge(t2) {
        return w.object(t2) ? { capture: !!t2.capture, passive: !!t2.passive } : { capture: !!t2, passive: false };
      }
      function Ne(t2, e22) {
        return t2 === e22 || ("boolean" == typeof t2 ? !!e22.capture === t2 && false == !!e22.passive : !!t2.capture == !!e22.capture && !!t2.passive == !!e22.passive);
      }
      var Ue = { id: "events", install: function(t2) {
        var e22, n22 = [], r2 = {}, i22 = [], o22 = { add: a2, remove: s2, addDelegate: function(t3, e3, n3, o3, s3) {
          var u22 = Ge(s3);
          if (!r2[n3]) {
            r2[n3] = [];
            for (var p2 = 0; p2 < i22.length; p2++) {
              var f2 = i22[p2];
              a2(f2, n3, c2), a2(f2, n3, l22, true);
            }
          }
          var d2 = r2[n3], h2 = bt(d2, (function(n4) {
            return n4.selector === t3 && n4.context === e3;
          }));
          h2 || (h2 = { selector: t3, context: e3, listeners: [] }, d2.push(h2));
          h2.listeners.push({ func: o3, options: u22 });
        }, removeDelegate: function(t3, e3, n3, i3, o3) {
          var a3, u22 = Ge(o3), p2 = r2[n3], f2 = false;
          if (!p2) return;
          for (a3 = p2.length - 1; a3 >= 0; a3--) {
            var d2 = p2[a3];
            if (d2.selector === t3 && d2.context === e3) {
              for (var h2 = d2.listeners, v2 = h2.length - 1; v2 >= 0; v2--) {
                var g2 = h2[v2];
                if (g2.func === i3 && Ne(g2.options, u22)) {
                  h2.splice(v2, 1), h2.length || (p2.splice(a3, 1), s2(e3, n3, c2), s2(e3, n3, l22, true)), f2 = true;
                  break;
                }
              }
              if (f2) break;
            }
          }
        }, delegateListener: c2, delegateUseCapture: l22, delegatedEvents: r2, documents: i22, targets: n22, supportsOptions: false, supportsPassive: false };
        function a2(t3, e3, r3, i3) {
          if (t3.addEventListener) {
            var a3 = Ge(i3), s3 = bt(n22, (function(e4) {
              return e4.eventTarget === t3;
            }));
            s3 || (s3 = { eventTarget: t3, events: {} }, n22.push(s3)), s3.events[e3] || (s3.events[e3] = []), bt(s3.events[e3], (function(t4) {
              return t4.func === r3 && Ne(t4.options, a3);
            })) || (t3.addEventListener(e3, r3, o22.supportsOptions ? a3 : a3.capture), s3.events[e3].push({ func: r3, options: a3 }));
          }
        }
        function s2(t3, e3, r3, i3) {
          if (t3.addEventListener && t3.removeEventListener) {
            var a3 = yt(n22, (function(e4) {
              return e4.eventTarget === t3;
            })), c3 = n22[a3];
            if (c3 && c3.events) if ("all" !== e3) {
              var l3 = false, u22 = c3.events[e3];
              if (u22) {
                if ("all" === r3) {
                  for (var p2 = u22.length - 1; p2 >= 0; p2--) {
                    var f2 = u22[p2];
                    s2(t3, e3, f2.func, f2.options);
                  }
                  return;
                }
                for (var d2 = Ge(i3), h2 = 0; h2 < u22.length; h2++) {
                  var v2 = u22[h2];
                  if (v2.func === r3 && Ne(v2.options, d2)) {
                    t3.removeEventListener(e3, r3, o22.supportsOptions ? d2 : d2.capture), u22.splice(h2, 1), 0 === u22.length && (delete c3.events[e3], l3 = true);
                    break;
                  }
                }
              }
              l3 && !Object.keys(c3.events).length && n22.splice(a3, 1);
            } else for (e3 in c3.events) c3.events.hasOwnProperty(e3) && s2(t3, e3, "all");
          }
        }
        function c2(t3, e3) {
          for (var n3 = Ge(e3), i3 = new We(t3), o3 = r2[t3.type], a3 = ht(t3)[0], s3 = a3; w.element(s3); ) {
            for (var c3 = 0; c3 < o3.length; c3++) {
              var l3 = o3[c3], u22 = l3.selector, p2 = l3.context;
              if (R(s3, u22) && M(p2, a3) && M(p2, s3)) {
                var f2 = l3.listeners;
                i3.currentTarget = s3;
                for (var d2 = 0; d2 < f2.length; d2++) {
                  var h2 = f2[d2];
                  Ne(h2.options, n3) && h2.func(i3);
                }
              }
            }
            s3 = A2(s3);
          }
        }
        function l22(t3) {
          return c2(t3, true);
        }
        return null == (e22 = t2.document) || e22.createElement("div").addEventListener("test", null, { get capture() {
          return o22.supportsOptions = true;
        }, get passive() {
          return o22.supportsPassive = true;
        } }), t2.events = o22, o22;
      } }, He = { methodOrder: ["simulationResume", "mouseOrPen", "hasPointer", "idle"], search: function(t2) {
        for (var e22 = 0, n22 = He.methodOrder; e22 < n22.length; e22++) {
          var r2 = n22[e22], i22 = He[r2](t2);
          if (i22) return i22;
        }
        return null;
      }, simulationResume: function(t2) {
        var e22 = t2.pointerType, n22 = t2.eventType, r2 = t2.eventTarget, i22 = t2.scope;
        if (!/down|start/i.test(n22)) return null;
        for (var o22 = 0, a2 = i22.interactions.list; o22 < a2.length; o22++) {
          var s2 = a2[o22], c2 = r2;
          if (s2.simulation && s2.simulation.allowResume && s2.pointerType === e22) for (; c2; ) {
            if (c2 === s2.element) return s2;
            c2 = A2(c2);
          }
        }
        return null;
      }, mouseOrPen: function(t2) {
        var e22, n22 = t2.pointerId, r2 = t2.pointerType, i22 = t2.eventType, o22 = t2.scope;
        if ("mouse" !== r2 && "pen" !== r2) return null;
        for (var a2 = 0, s2 = o22.interactions.list; a2 < s2.length; a2++) {
          var c2 = s2[a2];
          if (c2.pointerType === r2) {
            if (c2.simulation && !Ke(c2, n22)) continue;
            if (c2.interacting()) return c2;
            e22 || (e22 = c2);
          }
        }
        if (e22) return e22;
        for (var l22 = 0, u22 = o22.interactions.list; l22 < u22.length; l22++) {
          var p2 = u22[l22];
          if (!(p2.pointerType !== r2 || /down/i.test(i22) && p2.simulation)) return p2;
        }
        return null;
      }, hasPointer: function(t2) {
        for (var e22 = t2.pointerId, n22 = 0, r2 = t2.scope.interactions.list; n22 < r2.length; n22++) {
          var i22 = r2[n22];
          if (Ke(i22, e22)) return i22;
        }
        return null;
      }, idle: function(t2) {
        for (var e22 = t2.pointerType, n22 = 0, r2 = t2.scope.interactions.list; n22 < r2.length; n22++) {
          var i22 = r2[n22];
          if (1 === i22.pointers.length) {
            var o22 = i22.interactable;
            if (o22 && (!o22.options.gesture || !o22.options.gesture.enabled)) continue;
          } else if (i22.pointers.length >= 2) continue;
          if (!i22.interacting() && e22 === i22.pointerType) return i22;
        }
        return null;
      } };
      function Ke(t2, e22) {
        return t2.pointers.some((function(t3) {
          return t3.id === e22;
        }));
      }
      var $e = He, Je = ["pointerDown", "pointerMove", "pointerUp", "updatePointer", "removePointer", "windowBlur"];
      function Qe(t2, e22) {
        return function(n22) {
          var r2 = e22.interactions.list, i22 = dt(n22), o22 = ht(n22), a2 = o22[0], s2 = o22[1], c2 = [];
          if (/^touch/.test(n22.type)) {
            e22.prevTouchTime = e22.now();
            for (var l22 = 0, u22 = n22.changedTouches; l22 < u22.length; l22++) {
              var p2 = u22[l22], f2 = { pointer: p2, pointerId: at(p2), pointerType: i22, eventType: n22.type, eventTarget: a2, curEventTarget: s2, scope: e22 }, d2 = Ze(f2);
              c2.push([f2.pointer, f2.eventTarget, f2.curEventTarget, d2]);
            }
          } else {
            var h2 = false;
            if (!I.supportsPointerEvent && /mouse/.test(n22.type)) {
              for (var v2 = 0; v2 < r2.length && !h2; v2++) h2 = "mouse" !== r2[v2].pointerType && r2[v2].pointerIsDown;
              h2 = h2 || e22.now() - e22.prevTouchTime < 500 || 0 === n22.timeStamp;
            }
            if (!h2) {
              var g2 = { pointer: n22, pointerId: at(n22), pointerType: i22, eventType: n22.type, curEventTarget: s2, eventTarget: a2, scope: e22 }, m2 = Ze(g2);
              c2.push([g2.pointer, g2.eventTarget, g2.curEventTarget, m2]);
            }
          }
          for (var y2 = 0; y2 < c2.length; y2++) {
            var b22 = c2[y2], x2 = b22[0], w2 = b22[1], E2 = b22[2];
            b22[3][t2](x2, n22, w2, E2);
          }
        };
      }
      function Ze(t2) {
        var e22 = t2.pointerType, n22 = t2.scope, r2 = { interaction: $e.search(t2), searchDetails: t2 };
        return n22.fire("interactions:find", r2), r2.interaction || n22.interactions.new({ pointerType: e22 });
      }
      function tn(t2, e22) {
        var n22 = t2.doc, r2 = t2.scope, i22 = t2.options, o22 = r2.interactions.docEvents, a2 = r2.events, s2 = a2[e22];
        for (var c2 in r2.browser.isIOS && !i22.events && (i22.events = { passive: false }), a2.delegatedEvents) s2(n22, c2, a2.delegateListener), s2(n22, c2, a2.delegateUseCapture, true);
        for (var l22 = i22 && i22.events, u22 = 0; u22 < o22.length; u22++) {
          var p2 = o22[u22];
          s2(n22, p2.type, p2.listener, l22);
        }
      }
      var en = { id: "core/interactions", install: function(t2) {
        for (var e22 = {}, n22 = 0; n22 < Je.length; n22++) {
          var i22 = Je[n22];
          e22[i22] = Qe(i22, t2);
        }
        var a2, c2 = I.pEventTypes;
        function l22() {
          for (var e3 = 0, n3 = t2.interactions.list; e3 < n3.length; e3++) {
            var r2 = n3[e3];
            if (r2.pointerIsDown && "touch" === r2.pointerType && !r2._interacting) for (var i3 = function() {
              var e4 = a3[o22];
              t2.documents.some((function(t3) {
                return M(t3.doc, e4.downTarget);
              })) || r2.removePointer(e4.pointer, e4.event);
            }, o22 = 0, a3 = r2.pointers; o22 < a3.length; o22++) i3();
          }
        }
        (a2 = k.PointerEvent ? [{ type: c2.down, listener: l22 }, { type: c2.down, listener: e22.pointerDown }, { type: c2.move, listener: e22.pointerMove }, { type: c2.up, listener: e22.pointerUp }, { type: c2.cancel, listener: e22.pointerUp }] : [{ type: "mousedown", listener: e22.pointerDown }, { type: "mousemove", listener: e22.pointerMove }, { type: "mouseup", listener: e22.pointerUp }, { type: "touchstart", listener: l22 }, { type: "touchstart", listener: e22.pointerDown }, { type: "touchmove", listener: e22.pointerMove }, { type: "touchend", listener: e22.pointerUp }, { type: "touchcancel", listener: e22.pointerUp }]).push({ type: "blur", listener: function(e3) {
          for (var n3 = 0, r2 = t2.interactions.list; n3 < r2.length; n3++) {
            r2[n3].documentBlur(e3);
          }
        } }), t2.prevTouchTime = 0, t2.Interaction = (function(e3) {
          s(i3, e3);
          var n3 = p(i3);
          function i3() {
            return r(this, i3), n3.apply(this, arguments);
          }
          return o2(i3, [{ key: "pointerMoveTolerance", get: function() {
            return t2.interactions.pointerMoveTolerance;
          }, set: function(e4) {
            t2.interactions.pointerMoveTolerance = e4;
          } }, { key: "_now", value: function() {
            return t2.now();
          } }]), i3;
        })(De), t2.interactions = { list: [], new: function(e3) {
          e3.scopeFire = function(e4, n4) {
            return t2.fire(e4, n4);
          };
          var n3 = new t2.Interaction(e3);
          return t2.interactions.list.push(n3), n3;
        }, listeners: e22, docEvents: a2, pointerMoveTolerance: 1 }, t2.usePlugin(he);
      }, listeners: { "scope:add-document": function(t2) {
        return tn(t2, "add");
      }, "scope:remove-document": function(t2) {
        return tn(t2, "remove");
      }, "interactable:unset": function(t2, e22) {
        for (var n22 = t2.interactable, r2 = e22.interactions.list.length - 1; r2 >= 0; r2--) {
          var i22 = e22.interactions.list[r2];
          i22.interactable === n22 && (i22.stop(), e22.fire("interactions:destroy", { interaction: i22 }), i22.destroy(), e22.interactions.list.length > 2 && e22.interactions.list.splice(r2, 1));
        }
      } }, onDocSignal: tn, doOnInteractions: Qe, methodNames: Je }, nn = en, rn = (function(t2) {
        return t2[t2.On = 0] = "On", t2[t2.Off = 1] = "Off", t2;
      })(rn || {}), on = (function() {
        function t2(e22, n22, i22, o22) {
          r(this, t2), this.target = void 0, this.options = void 0, this._actions = void 0, this.events = new Ve(), this._context = void 0, this._win = void 0, this._doc = void 0, this._scopeEvents = void 0, this._actions = n22.actions, this.target = e22, this._context = n22.context || i22, this._win = y(B(e22) ? this._context : e22), this._doc = this._win.document, this._scopeEvents = o22, this.set(n22);
        }
        return o2(t2, [{ key: "_defaults", get: function() {
          return { base: {}, perAction: {}, actions: {} };
        } }, { key: "setOnEvents", value: function(t3, e22) {
          return w.func(e22.onstart) && this.on("".concat(t3, "start"), e22.onstart), w.func(e22.onmove) && this.on("".concat(t3, "move"), e22.onmove), w.func(e22.onend) && this.on("".concat(t3, "end"), e22.onend), w.func(e22.oninertiastart) && this.on("".concat(t3, "inertiastart"), e22.oninertiastart), this;
        } }, { key: "updatePerActionListeners", value: function(t3, e22, n22) {
          var r2, i22 = this, o22 = null == (r2 = this._actions.map[t3]) ? void 0 : r2.filterEventType, a2 = function(t4) {
            return (null == o22 || o22(t4)) && ve(t4, i22._actions);
          };
          (w.array(e22) || w.object(e22)) && this._onOff(rn.Off, t3, e22, void 0, a2), (w.array(n22) || w.object(n22)) && this._onOff(rn.On, t3, n22, void 0, a2);
        } }, { key: "setPerAction", value: function(t3, e22) {
          var n22 = this._defaults;
          for (var r2 in e22) {
            var i22 = r2, o22 = this.options[t3], a2 = e22[i22];
            "listeners" === i22 && this.updatePerActionListeners(t3, o22.listeners, a2), w.array(a2) ? o22[i22] = mt(a2) : w.plainObject(a2) ? (o22[i22] = V(o22[i22] || {}, ge(a2)), w.object(n22.perAction[i22]) && "enabled" in n22.perAction[i22] && (o22[i22].enabled = false !== a2.enabled)) : w.bool(a2) && w.object(n22.perAction[i22]) ? o22[i22].enabled = a2 : o22[i22] = a2;
          }
        } }, { key: "getRect", value: function(t3) {
          return t3 = t3 || (w.element(this.target) ? this.target : null), w.string(this.target) && (t3 = t3 || this._context.querySelector(this.target)), L(t3);
        } }, { key: "rectChecker", value: function(t3) {
          var e22 = this;
          return w.func(t3) ? (this.getRect = function(n22) {
            var r2 = V({}, t3.apply(e22, n22));
            return "width" in r2 || (r2.width = r2.right - r2.left, r2.height = r2.bottom - r2.top), r2;
          }, this) : null === t3 ? (delete this.getRect, this) : this.getRect;
        } }, { key: "_backCompatOption", value: function(t3, e22) {
          if (B(e22) || w.object(e22)) {
            for (var n22 in this.options[t3] = e22, this._actions.map) this.options[n22][t3] = e22;
            return this;
          }
          return this.options[t3];
        } }, { key: "origin", value: function(t3) {
          return this._backCompatOption("origin", t3);
        } }, { key: "deltaSource", value: function(t3) {
          return "page" === t3 || "client" === t3 ? (this.options.deltaSource = t3, this) : this.options.deltaSource;
        } }, { key: "getAllElements", value: function() {
          var t3 = this.target;
          return w.string(t3) ? Array.from(this._context.querySelectorAll(t3)) : w.func(t3) && t3.getAllElements ? t3.getAllElements() : w.element(t3) ? [t3] : [];
        } }, { key: "context", value: function() {
          return this._context;
        } }, { key: "inContext", value: function(t3) {
          return this._context === t3.ownerDocument || M(this._context, t3);
        } }, { key: "testIgnoreAllow", value: function(t3, e22, n22) {
          return !this.testIgnore(t3.ignoreFrom, e22, n22) && this.testAllow(t3.allowFrom, e22, n22);
        } }, { key: "testAllow", value: function(t3, e22, n22) {
          return !t3 || !!w.element(n22) && (w.string(t3) ? F(n22, t3, e22) : !!w.element(t3) && M(t3, n22));
        } }, { key: "testIgnore", value: function(t3, e22, n22) {
          return !(!t3 || !w.element(n22)) && (w.string(t3) ? F(n22, t3, e22) : !!w.element(t3) && M(t3, n22));
        } }, { key: "fire", value: function(t3) {
          return this.events.fire(t3), this;
        } }, { key: "_onOff", value: function(t3, e22, n22, r2, i22) {
          w.object(e22) && !w.array(e22) && (r2 = n22, n22 = null);
          var o22 = $(e22, n22, i22);
          for (var a2 in o22) {
            "wheel" === a2 && (a2 = I.wheelEvent);
            for (var s2 = 0, c2 = o22[a2]; s2 < c2.length; s2++) {
              var l22 = c2[s2];
              ve(a2, this._actions) ? this.events[t3 === rn.On ? "on" : "off"](a2, l22) : w.string(this.target) ? this._scopeEvents[t3 === rn.On ? "addDelegate" : "removeDelegate"](this.target, this._context, a2, l22, r2) : this._scopeEvents[t3 === rn.On ? "add" : "remove"](this.target, a2, l22, r2);
            }
          }
          return this;
        } }, { key: "on", value: function(t3, e22, n22) {
          return this._onOff(rn.On, t3, e22, n22);
        } }, { key: "off", value: function(t3, e22, n22) {
          return this._onOff(rn.Off, t3, e22, n22);
        } }, { key: "set", value: function(t3) {
          var e22 = this._defaults;
          for (var n22 in w.object(t3) || (t3 = {}), this.options = ge(e22.base), this._actions.methodDict) {
            var r2 = n22, i22 = this._actions.methodDict[r2];
            this.options[r2] = {}, this.setPerAction(r2, V(V({}, e22.perAction), e22.actions[r2])), this[i22](t3[r2]);
          }
          for (var o22 in t3) "getRect" !== o22 ? w.func(this[o22]) && this[o22](t3[o22]) : this.rectChecker(t3.getRect);
          return this;
        } }, { key: "unset", value: function() {
          if (w.string(this.target)) for (var t3 in this._scopeEvents.delegatedEvents) for (var e22 = this._scopeEvents.delegatedEvents[t3], n22 = e22.length - 1; n22 >= 0; n22--) {
            var r2 = e22[n22], i22 = r2.selector, o22 = r2.context, a2 = r2.listeners;
            i22 === this.target && o22 === this._context && e22.splice(n22, 1);
            for (var s2 = a2.length - 1; s2 >= 0; s2--) this._scopeEvents.removeDelegate(this.target, this._context, t3, a2[s2][0], a2[s2][1]);
          }
          else this._scopeEvents.remove(this.target, "all");
        } }]), t2;
      })(), an = (function() {
        function t2(e22) {
          var n22 = this;
          r(this, t2), this.list = [], this.selectorMap = {}, this.scope = void 0, this.scope = e22, e22.addListeners({ "interactable:unset": function(t3) {
            var e3 = t3.interactable, r2 = e3.target, i22 = w.string(r2) ? n22.selectorMap[r2] : r2[n22.scope.id], o22 = yt(i22, (function(t4) {
              return t4 === e3;
            }));
            i22.splice(o22, 1);
          } });
        }
        return o2(t2, [{ key: "new", value: function(t3, e22) {
          e22 = V(e22 || {}, { actions: this.scope.actions });
          var n22 = new this.scope.Interactable(t3, e22, this.scope.document, this.scope.events);
          return this.scope.addDocument(n22._doc), this.list.push(n22), w.string(t3) ? (this.selectorMap[t3] || (this.selectorMap[t3] = []), this.selectorMap[t3].push(n22)) : (n22.target[this.scope.id] || Object.defineProperty(t3, this.scope.id, { value: [], configurable: true }), t3[this.scope.id].push(n22)), this.scope.fire("interactable:new", { target: t3, options: e22, interactable: n22, win: this.scope._win }), n22;
        } }, { key: "getExisting", value: function(t3, e22) {
          var n22 = e22 && e22.context || this.scope.document, r2 = w.string(t3), i22 = r2 ? this.selectorMap[t3] : t3[this.scope.id];
          if (i22) return bt(i22, (function(e3) {
            return e3._context === n22 && (r2 || e3.inContext(t3));
          }));
        } }, { key: "forEachMatch", value: function(t3, e22) {
          for (var n22 = 0, r2 = this.list; n22 < r2.length; n22++) {
            var i22 = r2[n22], o22 = void 0;
            if ((w.string(i22.target) ? w.element(t3) && R(t3, i22.target) : t3 === i22.target) && i22.inContext(t3) && (o22 = e22(i22)), void 0 !== o22) return o22;
          }
        } }]), t2;
      })();
      var sn = (function() {
        function t2() {
          var e22 = this;
          r(this, t2), this.id = "__interact_scope_".concat(Math.floor(100 * Math.random())), this.isInitialized = false, this.listenerMaps = [], this.browser = I, this.defaults = ge(Te), this.Eventable = Ve, this.actions = { map: {}, phases: { start: true, move: true, end: true }, methodDict: {}, phaselessTypes: {} }, this.interactStatic = (function(t3) {
            var e3 = function e4(n3, r2) {
              var i22 = t3.interactables.getExisting(n3, r2);
              return i22 || ((i22 = t3.interactables.new(n3, r2)).events.global = e4.globalEvents), i22;
            };
            return e3.getPointerAverage = lt, e3.getTouchBBox = ut, e3.getTouchDistance = pt, e3.getTouchAngle = ft, e3.getElementRect = L, e3.getElementClientRect = Y, e3.matchesSelector = R, e3.closest = z, e3.globalEvents = {}, e3.version = "1.10.27", e3.scope = t3, e3.use = function(t4, e4) {
              return this.scope.usePlugin(t4, e4), this;
            }, e3.isSet = function(t4, e4) {
              return !!this.scope.interactables.get(t4, e4 && e4.context);
            }, e3.on = Nt((function(t4, e4, n3) {
              if (w.string(t4) && -1 !== t4.search(" ") && (t4 = t4.trim().split(/ +/)), w.array(t4)) {
                for (var r2 = 0, i22 = t4; r2 < i22.length; r2++) {
                  var o22 = i22[r2];
                  this.on(o22, e4, n3);
                }
                return this;
              }
              if (w.object(t4)) {
                for (var a2 in t4) this.on(a2, t4[a2], e4);
                return this;
              }
              return ve(t4, this.scope.actions) ? this.globalEvents[t4] ? this.globalEvents[t4].push(e4) : this.globalEvents[t4] = [e4] : this.scope.events.add(this.scope.document, t4, e4, { options: n3 }), this;
            }), "The interact.on() method is being deprecated"), e3.off = Nt((function(t4, e4, n3) {
              if (w.string(t4) && -1 !== t4.search(" ") && (t4 = t4.trim().split(/ +/)), w.array(t4)) {
                for (var r2 = 0, i22 = t4; r2 < i22.length; r2++) {
                  var o22 = i22[r2];
                  this.off(o22, e4, n3);
                }
                return this;
              }
              if (w.object(t4)) {
                for (var a2 in t4) this.off(a2, t4[a2], e4);
                return this;
              }
              var s2;
              return ve(t4, this.scope.actions) ? t4 in this.globalEvents && -1 !== (s2 = this.globalEvents[t4].indexOf(e4)) && this.globalEvents[t4].splice(s2, 1) : this.scope.events.remove(this.scope.document, t4, e4, n3), this;
            }), "The interact.off() method is being deprecated"), e3.debug = function() {
              return this.scope;
            }, e3.supportsTouch = function() {
              return I.supportsTouch;
            }, e3.supportsPointerEvent = function() {
              return I.supportsPointerEvent;
            }, e3.stop = function() {
              for (var t4 = 0, e4 = this.scope.interactions.list; t4 < e4.length; t4++) e4[t4].stop();
              return this;
            }, e3.pointerMoveTolerance = function(t4) {
              return w.number(t4) ? (this.scope.interactions.pointerMoveTolerance = t4, this) : this.scope.interactions.pointerMoveTolerance;
            }, e3.addDocument = function(t4, e4) {
              this.scope.addDocument(t4, e4);
            }, e3.removeDocument = function(t4) {
              this.scope.removeDocument(t4);
            }, e3;
          })(this), this.InteractEvent = Se, this.Interactable = void 0, this.interactables = new an(this), this._win = void 0, this.document = void 0, this.window = void 0, this.documents = [], this._plugins = { list: [], map: {} }, this.onWindowUnload = function(t3) {
            return e22.removeDocument(t3.target);
          };
          var n22 = this;
          this.Interactable = (function(t3) {
            s(i22, t3);
            var e3 = p(i22);
            function i22() {
              return r(this, i22), e3.apply(this, arguments);
            }
            return o2(i22, [{ key: "_defaults", get: function() {
              return n22.defaults;
            } }, { key: "set", value: function(t4) {
              return f(c(i22.prototype), "set", this).call(this, t4), n22.fire("interactable:set", { options: t4, interactable: this }), this;
            } }, { key: "unset", value: function() {
              f(c(i22.prototype), "unset", this).call(this);
              var t4 = n22.interactables.list.indexOf(this);
              t4 < 0 || (n22.interactables.list.splice(t4, 1), n22.fire("interactable:unset", { interactable: this }));
            } }]), i22;
          })(on);
        }
        return o2(t2, [{ key: "addListeners", value: function(t3, e22) {
          this.listenerMaps.push({ id: e22, map: t3 });
        } }, { key: "fire", value: function(t3, e22) {
          for (var n22 = 0, r2 = this.listenerMaps; n22 < r2.length; n22++) {
            var i22 = r2[n22].map[t3];
            if (i22 && false === i22(e22, this, t3)) return false;
          }
        } }, { key: "init", value: function(t3) {
          return this.isInitialized ? this : (function(t4, e22) {
            t4.isInitialized = true, w.window(e22) && m(e22);
            return k.init(e22), I.init(e22), Lt.init(e22), t4.window = e22, t4.document = e22.document, t4.usePlugin(nn), t4.usePlugin(Ue), t4;
          })(this, t3);
        } }, { key: "pluginIsInstalled", value: function(t3) {
          var e22 = t3.id;
          return e22 ? !!this._plugins.map[e22] : -1 !== this._plugins.list.indexOf(t3);
        } }, { key: "usePlugin", value: function(t3, e22) {
          if (!this.isInitialized) return this;
          if (this.pluginIsInstalled(t3)) return this;
          if (t3.id && (this._plugins.map[t3.id] = t3), this._plugins.list.push(t3), t3.install && t3.install(this, e22), t3.listeners && t3.before) {
            for (var n22 = 0, r2 = this.listenerMaps.length, i22 = t3.before.reduce((function(t4, e3) {
              return t4[e3] = true, t4[cn(e3)] = true, t4;
            }), {}); n22 < r2; n22++) {
              var o22 = this.listenerMaps[n22].id;
              if (o22 && (i22[o22] || i22[cn(o22)])) break;
            }
            this.listenerMaps.splice(n22, 0, { id: t3.id, map: t3.listeners });
          } else t3.listeners && this.listenerMaps.push({ id: t3.id, map: t3.listeners });
          return this;
        } }, { key: "addDocument", value: function(t3, e22) {
          if (-1 !== this.getDocIndex(t3)) return false;
          var n22 = y(t3);
          e22 = e22 ? V({}, e22) : {}, this.documents.push({ doc: t3, options: e22 }), this.events.documents.push(t3), t3 !== this.document && this.events.add(n22, "unload", this.onWindowUnload), this.fire("scope:add-document", { doc: t3, window: n22, scope: this, options: e22 });
        } }, { key: "removeDocument", value: function(t3) {
          var e22 = this.getDocIndex(t3), n22 = y(t3), r2 = this.documents[e22].options;
          this.events.remove(n22, "unload", this.onWindowUnload), this.documents.splice(e22, 1), this.events.documents.splice(e22, 1), this.fire("scope:remove-document", { doc: t3, window: n22, scope: this, options: r2 });
        } }, { key: "getDocIndex", value: function(t3) {
          for (var e22 = 0; e22 < this.documents.length; e22++) if (this.documents[e22].doc === t3) return e22;
          return -1;
        } }, { key: "getDocOptions", value: function(t3) {
          var e22 = this.getDocIndex(t3);
          return -1 === e22 ? null : this.documents[e22].options;
        } }, { key: "now", value: function() {
          return (this.window.Date || Date).now();
        } }]), t2;
      })();
      function cn(t2) {
        return t2 && t2.replace(/\/.*$/, "");
      }
      var ln = new sn(), un = ln.interactStatic, pn = "undefined" != typeof globalThis ? globalThis : window;
      ln.init(pn);
      var fn = Object.freeze({ __proto__: null, edgeTarget: function() {
      }, elements: function() {
      }, grid: function(t2) {
        var e22 = [["x", "y"], ["left", "top"], ["right", "bottom"], ["width", "height"]].filter((function(e3) {
          var n3 = e3[0], r2 = e3[1];
          return n3 in t2 || r2 in t2;
        })), n22 = function(n3, r2) {
          for (var i22 = t2.range, o22 = t2.limits, a2 = void 0 === o22 ? { left: -1 / 0, right: 1 / 0, top: -1 / 0, bottom: 1 / 0 } : o22, s2 = t2.offset, c2 = void 0 === s2 ? { x: 0, y: 0 } : s2, l22 = { range: i22, grid: t2, x: null, y: null }, u22 = 0; u22 < e22.length; u22++) {
            var p2 = e22[u22], f2 = p2[0], d2 = p2[1], h2 = Math.round((n3 - c2.x) / t2[f2]), v2 = Math.round((r2 - c2.y) / t2[d2]);
            l22[f2] = Math.max(a2.left, Math.min(a2.right, h2 * t2[f2] + c2.x)), l22[d2] = Math.max(a2.top, Math.min(a2.bottom, v2 * t2[d2] + c2.y));
          }
          return l22;
        };
        return n22.grid = t2, n22.coordFields = e22, n22;
      } }), dn = { id: "snappers", install: function(t2) {
        var e22 = t2.interactStatic;
        e22.snappers = V(e22.snappers || {}, fn), e22.createSnapGrid = e22.snappers.grid;
      } }, hn = dn, vn = { start: function(t2) {
        var n22 = t2.state, r2 = t2.rect, i22 = t2.edges, o22 = t2.pageCoords, a2 = n22.options, s2 = a2.ratio, c2 = a2.enabled, l22 = n22.options, u22 = l22.equalDelta, p2 = l22.modifiers;
        "preserve" === s2 && (s2 = r2.width / r2.height), n22.startCoords = V({}, o22), n22.startRect = V({}, r2), n22.ratio = s2, n22.equalDelta = u22;
        var f2 = n22.linkedEdges = { top: i22.top || i22.left && !i22.bottom, left: i22.left || i22.top && !i22.right, bottom: i22.bottom || i22.right && !i22.top, right: i22.right || i22.bottom && !i22.left };
        if (n22.xIsPrimaryAxis = !(!i22.left && !i22.right), n22.equalDelta) {
          var d2 = (f2.left ? 1 : -1) * (f2.top ? 1 : -1);
          n22.edgeSign = { x: d2, y: d2 };
        } else n22.edgeSign = { x: f2.left ? -1 : 1, y: f2.top ? -1 : 1 };
        if (false !== c2 && V(i22, f2), null != p2 && p2.length) {
          var h2 = new me(t2.interaction);
          h2.copyFrom(t2.interaction.modification), h2.prepareStates(p2), n22.subModification = h2, h2.startAll(e2({}, t2));
        }
      }, set: function(t2) {
        var n22 = t2.state, r2 = t2.rect, i22 = t2.coords, o22 = n22.linkedEdges, a2 = V({}, i22), s2 = n22.equalDelta ? gn : mn;
        if (V(t2.edges, o22), s2(n22, n22.xIsPrimaryAxis, i22, r2), !n22.subModification) return null;
        var c2 = V({}, r2);
        H(o22, c2, { x: i22.x - a2.x, y: i22.y - a2.y });
        var l22 = n22.subModification.setAll(e2(e2({}, t2), {}, { rect: c2, edges: o22, pageCoords: i22, prevCoords: i22, prevRect: c2 })), u22 = l22.delta;
        l22.changed && (s2(n22, Math.abs(u22.x) > Math.abs(u22.y), l22.coords, l22.rect), V(i22, l22.coords));
        return l22.eventProps;
      }, defaults: { ratio: "preserve", equalDelta: false, modifiers: [], enabled: false } };
      function gn(t2, e22, n22) {
        var r2 = t2.startCoords, i22 = t2.edgeSign;
        e22 ? n22.y = r2.y + (n22.x - r2.x) * i22.y : n22.x = r2.x + (n22.y - r2.y) * i22.x;
      }
      function mn(t2, e22, n22, r2) {
        var i22 = t2.startRect, o22 = t2.startCoords, a2 = t2.ratio, s2 = t2.edgeSign;
        if (e22) {
          var c2 = r2.width / a2;
          n22.y = o22.y + (c2 - i22.height) * s2.y;
        } else {
          var l22 = r2.height * a2;
          n22.x = o22.x + (l22 - i22.width) * s2.x;
        }
      }
      var yn = be(vn, "aspectRatio"), bn = function() {
      };
      bn._defaults = {};
      var xn = bn;
      function wn(t2, e22, n22) {
        return w.func(t2) ? G(t2, e22.interactable, e22.element, [n22.x, n22.y, e22]) : G(t2, e22.interactable, e22.element);
      }
      var En = { start: function(t2) {
        var e22 = t2.rect, n22 = t2.startOffset, r2 = t2.state, i22 = t2.interaction, o22 = t2.pageCoords, a2 = r2.options, s2 = a2.elementRect, c2 = V({ left: 0, top: 0, right: 0, bottom: 0 }, a2.offset || {});
        if (e22 && s2) {
          var l22 = wn(a2.restriction, i22, o22);
          if (l22) {
            var u22 = l22.right - l22.left - e22.width, p2 = l22.bottom - l22.top - e22.height;
            u22 < 0 && (c2.left += u22, c2.right += u22), p2 < 0 && (c2.top += p2, c2.bottom += p2);
          }
          c2.left += n22.left - e22.width * s2.left, c2.top += n22.top - e22.height * s2.top, c2.right += n22.right - e22.width * (1 - s2.right), c2.bottom += n22.bottom - e22.height * (1 - s2.bottom);
        }
        r2.offset = c2;
      }, set: function(t2) {
        var e22 = t2.coords, n22 = t2.interaction, r2 = t2.state, i22 = r2.options, o22 = r2.offset, a2 = wn(i22.restriction, n22, e22);
        if (a2) {
          var s2 = (function(t3) {
            return !t3 || "left" in t3 && "top" in t3 || ((t3 = V({}, t3)).left = t3.x || 0, t3.top = t3.y || 0, t3.right = t3.right || t3.left + t3.width, t3.bottom = t3.bottom || t3.top + t3.height), t3;
          })(a2);
          e22.x = Math.max(Math.min(s2.right - o22.right, e22.x), s2.left + o22.left), e22.y = Math.max(Math.min(s2.bottom - o22.bottom, e22.y), s2.top + o22.top);
        }
      }, defaults: { restriction: null, elementRect: null, offset: null, endOnly: false, enabled: false } }, Tn = be(En, "restrict"), Sn = { top: 1 / 0, left: 1 / 0, bottom: -1 / 0, right: -1 / 0 }, _n = { top: -1 / 0, left: -1 / 0, bottom: 1 / 0, right: 1 / 0 };
      function Pn(t2, e22) {
        for (var n22 = 0, r2 = ["top", "left", "bottom", "right"]; n22 < r2.length; n22++) {
          var i22 = r2[n22];
          i22 in t2 || (t2[i22] = e22[i22]);
        }
        return t2;
      }
      var On = { noInner: Sn, noOuter: _n, start: function(t2) {
        var e22, n22 = t2.interaction, r2 = t2.startOffset, i22 = t2.state, o22 = i22.options;
        o22 && (e22 = N(wn(o22.offset, n22, n22.coords.start.page))), e22 = e22 || { x: 0, y: 0 }, i22.offset = { top: e22.y + r2.top, left: e22.x + r2.left, bottom: e22.y - r2.bottom, right: e22.x - r2.right };
      }, set: function(t2) {
        var e22 = t2.coords, n22 = t2.edges, r2 = t2.interaction, i22 = t2.state, o22 = i22.offset, a2 = i22.options;
        if (n22) {
          var s2 = V({}, e22), c2 = wn(a2.inner, r2, s2) || {}, l22 = wn(a2.outer, r2, s2) || {};
          Pn(c2, Sn), Pn(l22, _n), n22.top ? e22.y = Math.min(Math.max(l22.top + o22.top, s2.y), c2.top + o22.top) : n22.bottom && (e22.y = Math.max(Math.min(l22.bottom + o22.bottom, s2.y), c2.bottom + o22.bottom)), n22.left ? e22.x = Math.min(Math.max(l22.left + o22.left, s2.x), c2.left + o22.left) : n22.right && (e22.x = Math.max(Math.min(l22.right + o22.right, s2.x), c2.right + o22.right));
        }
      }, defaults: { inner: null, outer: null, offset: null, endOnly: false, enabled: false } }, kn = be(On, "restrictEdges"), Dn = V({ get elementRect() {
        return { top: 0, left: 0, bottom: 1, right: 1 };
      }, set elementRect(t2) {
      } }, En.defaults), In = be({ start: En.start, set: En.set, defaults: Dn }, "restrictRect"), Mn = { width: -1 / 0, height: -1 / 0 }, zn = { width: 1 / 0, height: 1 / 0 };
      var An = be({ start: function(t2) {
        return On.start(t2);
      }, set: function(t2) {
        var e22 = t2.interaction, n22 = t2.state, r2 = t2.rect, i22 = t2.edges, o22 = n22.options;
        if (i22) {
          var a2 = U(wn(o22.min, e22, t2.coords)) || Mn, s2 = U(wn(o22.max, e22, t2.coords)) || zn;
          n22.options = { endOnly: o22.endOnly, inner: V({}, On.noInner), outer: V({}, On.noOuter) }, i22.top ? (n22.options.inner.top = r2.bottom - a2.height, n22.options.outer.top = r2.bottom - s2.height) : i22.bottom && (n22.options.inner.bottom = r2.top + a2.height, n22.options.outer.bottom = r2.top + s2.height), i22.left ? (n22.options.inner.left = r2.right - a2.width, n22.options.outer.left = r2.right - s2.width) : i22.right && (n22.options.inner.right = r2.left + a2.width, n22.options.outer.right = r2.left + s2.width), On.set(t2), n22.options = o22;
        }
      }, defaults: { min: null, max: null, endOnly: false, enabled: false } }, "restrictSize");
      var Rn = { start: function(t2) {
        var e22, n22 = t2.interaction, r2 = t2.interactable, i22 = t2.element, o22 = t2.rect, a2 = t2.state, s2 = t2.startOffset, c2 = a2.options, l22 = c2.offsetWithOrigin ? (function(t3) {
          var e3 = t3.interaction.element, n3 = N(G(t3.state.options.origin, null, null, [e3])), r3 = n3 || K(t3.interactable, e3, t3.interaction.prepared.name);
          return r3;
        })(t2) : { x: 0, y: 0 };
        if ("startCoords" === c2.offset) e22 = { x: n22.coords.start.page.x, y: n22.coords.start.page.y };
        else {
          var u22 = G(c2.offset, r2, i22, [n22]);
          (e22 = N(u22) || { x: 0, y: 0 }).x += l22.x, e22.y += l22.y;
        }
        var p2 = c2.relativePoints;
        a2.offsets = o22 && p2 && p2.length ? p2.map((function(t3, n3) {
          return { index: n3, relativePoint: t3, x: s2.left - o22.width * t3.x + e22.x, y: s2.top - o22.height * t3.y + e22.y };
        })) : [{ index: 0, relativePoint: null, x: e22.x, y: e22.y }];
      }, set: function(t2) {
        var e22 = t2.interaction, n22 = t2.coords, r2 = t2.state, i22 = r2.options, o22 = r2.offsets, a2 = K(e22.interactable, e22.element, e22.prepared.name), s2 = V({}, n22), c2 = [];
        i22.offsetWithOrigin || (s2.x -= a2.x, s2.y -= a2.y);
        for (var l22 = 0, u22 = o22; l22 < u22.length; l22++) for (var p2 = u22[l22], f2 = s2.x - p2.x, d2 = s2.y - p2.y, h2 = 0, v2 = i22.targets.length; h2 < v2; h2++) {
          var g2 = i22.targets[h2], m2 = void 0;
          (m2 = w.func(g2) ? g2(f2, d2, e22._proxy, p2, h2) : g2) && c2.push({ x: (w.number(m2.x) ? m2.x : f2) + p2.x, y: (w.number(m2.y) ? m2.y : d2) + p2.y, range: w.number(m2.range) ? m2.range : i22.range, source: g2, index: h2, offset: p2 });
        }
        for (var y2 = { target: null, inRange: false, distance: 0, range: 0, delta: { x: 0, y: 0 } }, b22 = 0; b22 < c2.length; b22++) {
          var x2 = c2[b22], E2 = x2.range, T22 = x2.x - s2.x, S2 = x2.y - s2.y, _2 = Q(T22, S2), P2 = _2 <= E2;
          E2 === 1 / 0 && y2.inRange && y2.range !== 1 / 0 && (P2 = false), y2.target && !(P2 ? y2.inRange && E2 !== 1 / 0 ? _2 / E2 < y2.distance / y2.range : E2 === 1 / 0 && y2.range !== 1 / 0 || _2 < y2.distance : !y2.inRange && _2 < y2.distance) || (y2.target = x2, y2.distance = _2, y2.range = E2, y2.inRange = P2, y2.delta.x = T22, y2.delta.y = S2);
        }
        return y2.inRange && (n22.x = y2.target.x, n22.y = y2.target.y), r2.closest = y2, y2;
      }, defaults: { range: 1 / 0, targets: null, offset: null, offsetWithOrigin: true, origin: null, relativePoints: null, endOnly: false, enabled: false } }, Cn = be(Rn, "snap");
      var jn = { start: function(t2) {
        var e22 = t2.state, n22 = t2.edges, r2 = e22.options;
        if (!n22) return null;
        t2.state = { options: { targets: null, relativePoints: [{ x: n22.left ? 0 : 1, y: n22.top ? 0 : 1 }], offset: r2.offset || "self", origin: { x: 0, y: 0 }, range: r2.range } }, e22.targetFields = e22.targetFields || [["width", "height"], ["x", "y"]], Rn.start(t2), e22.offsets = t2.state.offsets, t2.state = e22;
      }, set: function(t2) {
        var e22 = t2.interaction, n22 = t2.state, r2 = t2.coords, i22 = n22.options, o22 = n22.offsets, a2 = { x: r2.x - o22[0].x, y: r2.y - o22[0].y };
        n22.options = V({}, i22), n22.options.targets = [];
        for (var s2 = 0, c2 = i22.targets || []; s2 < c2.length; s2++) {
          var l22 = c2[s2], u22 = void 0;
          if (u22 = w.func(l22) ? l22(a2.x, a2.y, e22) : l22) {
            for (var p2 = 0, f2 = n22.targetFields; p2 < f2.length; p2++) {
              var d2 = f2[p2], h2 = d2[0], v2 = d2[1];
              if (h2 in u22 || v2 in u22) {
                u22.x = u22[h2], u22.y = u22[v2];
                break;
              }
            }
            n22.options.targets.push(u22);
          }
        }
        var g2 = Rn.set(t2);
        return n22.options = i22, g2;
      }, defaults: { range: 1 / 0, targets: null, offset: null, endOnly: false, enabled: false } }, Fn = be(jn, "snapSize");
      var Xn = { aspectRatio: yn, restrictEdges: kn, restrict: Tn, restrictRect: In, restrictSize: An, snapEdges: be({ start: function(t2) {
        var e22 = t2.edges;
        return e22 ? (t2.state.targetFields = t2.state.targetFields || [[e22.left ? "left" : "right", e22.top ? "top" : "bottom"]], jn.start(t2)) : null;
      }, set: jn.set, defaults: V(ge(jn.defaults), { targets: void 0, range: void 0, offset: { x: 0, y: 0 } }) }, "snapEdges"), snap: Cn, snapSize: Fn, spring: xn, avoid: xn, transform: xn, rubberband: xn }, Yn = { id: "modifiers", install: function(t2) {
        var e22 = t2.interactStatic;
        for (var n22 in t2.usePlugin(Ee), t2.usePlugin(hn), e22.modifiers = Xn, Xn) {
          var r2 = Xn[n22], i22 = r2._defaults, o22 = r2._methods;
          i22._methods = o22, t2.defaults.perAction[n22] = i22;
        }
      } }, Ln = Yn, qn = (function(t2) {
        s(n22, t2);
        var e22 = p(n22);
        function n22(t3, i22, o22, a2, s2, c2) {
          var l22;
          if (r(this, n22), tt(u2(l22 = e22.call(this, s2)), o22), o22 !== i22 && tt(u2(l22), i22), l22.timeStamp = c2, l22.originalEvent = o22, l22.type = t3, l22.pointerId = at(i22), l22.pointerType = dt(i22), l22.target = a2, l22.currentTarget = null, "tap" === t3) {
            var p2 = s2.getPointerIndex(i22);
            l22.dt = l22.timeStamp - s2.pointers[p2].downTime;
            var f2 = l22.timeStamp - s2.tapTime;
            l22.double = !!s2.prevTap && "doubletap" !== s2.prevTap.type && s2.prevTap.target === l22.target && f2 < 500;
          } else "doubletap" === t3 && (l22.dt = i22.timeStamp - s2.tapTime, l22.double = true);
          return l22;
        }
        return o2(n22, [{ key: "_subtractOrigin", value: function(t3) {
          var e3 = t3.x, n3 = t3.y;
          return this.pageX -= e3, this.pageY -= n3, this.clientX -= e3, this.clientY -= n3, this;
        } }, { key: "_addOrigin", value: function(t3) {
          var e3 = t3.x, n3 = t3.y;
          return this.pageX += e3, this.pageY += n3, this.clientX += e3, this.clientY += n3, this;
        } }, { key: "preventDefault", value: function() {
          this.originalEvent.preventDefault();
        } }]), n22;
      })(vt), Bn = { id: "pointer-events/base", before: ["inertia", "modifiers", "auto-start", "actions"], install: function(t2) {
        t2.pointerEvents = Bn, t2.defaults.actions.pointerEvents = Bn.defaults, V(t2.actions.phaselessTypes, Bn.types);
      }, listeners: { "interactions:new": function(t2) {
        var e22 = t2.interaction;
        e22.prevTap = null, e22.tapTime = 0;
      }, "interactions:update-pointer": function(t2) {
        var e22 = t2.down, n22 = t2.pointerInfo;
        if (!e22 && n22.hold) return;
        n22.hold = { duration: 1 / 0, timeout: null };
      }, "interactions:move": function(t2, e22) {
        var n22 = t2.interaction, r2 = t2.pointer, i22 = t2.event, o22 = t2.eventTarget;
        t2.duplicate || n22.pointerIsDown && !n22.pointerWasMoved || (n22.pointerIsDown && Gn(t2), Vn({ interaction: n22, pointer: r2, event: i22, eventTarget: o22, type: "move" }, e22));
      }, "interactions:down": function(t2, e22) {
        !(function(t3, e3) {
          for (var n22 = t3.interaction, r2 = t3.pointer, i22 = t3.event, o22 = t3.eventTarget, a2 = t3.pointerIndex, s2 = n22.pointers[a2].hold, c2 = q(o22), l22 = { interaction: n22, pointer: r2, event: i22, eventTarget: o22, type: "hold", targets: [], path: c2, node: null }, u22 = 0; u22 < c2.length; u22++) {
            var p2 = c2[u22];
            l22.node = p2, e3.fire("pointerEvents:collect-targets", l22);
          }
          if (!l22.targets.length) return;
          for (var f2 = 1 / 0, d2 = 0, h2 = l22.targets; d2 < h2.length; d2++) {
            var v2 = h2[d2].eventable.options.holdDuration;
            v2 < f2 && (f2 = v2);
          }
          s2.duration = f2, s2.timeout = setTimeout((function() {
            Vn({ interaction: n22, eventTarget: o22, pointer: r2, event: i22, type: "hold" }, e3);
          }), f2);
        })(t2, e22), Vn(t2, e22);
      }, "interactions:up": function(t2, e22) {
        Gn(t2), Vn(t2, e22), (function(t3, e3) {
          var n22 = t3.interaction, r2 = t3.pointer, i22 = t3.event, o22 = t3.eventTarget;
          n22.pointerWasMoved || Vn({ interaction: n22, eventTarget: o22, pointer: r2, event: i22, type: "tap" }, e3);
        })(t2, e22);
      }, "interactions:cancel": function(t2, e22) {
        Gn(t2), Vn(t2, e22);
      } }, PointerEvent: qn, fire: Vn, collectEventTargets: Wn, defaults: { holdDuration: 600, ignoreFrom: null, allowFrom: null, origin: { x: 0, y: 0 } }, types: { down: true, move: true, up: true, cancel: true, tap: true, doubletap: true, hold: true } };
      function Vn(t2, e22) {
        var n22 = t2.interaction, r2 = t2.pointer, i22 = t2.event, o22 = t2.eventTarget, a2 = t2.type, s2 = t2.targets, c2 = void 0 === s2 ? Wn(t2, e22) : s2, l22 = new qn(a2, r2, i22, o22, n22, e22.now());
        e22.fire("pointerEvents:new", { pointerEvent: l22 });
        for (var u22 = { interaction: n22, pointer: r2, event: i22, eventTarget: o22, targets: c2, type: a2, pointerEvent: l22 }, p2 = 0; p2 < c2.length; p2++) {
          var f2 = c2[p2];
          for (var d2 in f2.props || {}) l22[d2] = f2.props[d2];
          var h2 = K(f2.eventable, f2.node);
          if (l22._subtractOrigin(h2), l22.eventable = f2.eventable, l22.currentTarget = f2.node, f2.eventable.fire(l22), l22._addOrigin(h2), l22.immediatePropagationStopped || l22.propagationStopped && p2 + 1 < c2.length && c2[p2 + 1].node !== l22.currentTarget) break;
        }
        if (e22.fire("pointerEvents:fired", u22), "tap" === a2) {
          var v2 = l22.double ? Vn({ interaction: n22, pointer: r2, event: i22, eventTarget: o22, type: "doubletap" }, e22) : l22;
          n22.prevTap = v2, n22.tapTime = v2.timeStamp;
        }
        return l22;
      }
      function Wn(t2, e22) {
        var n22 = t2.interaction, r2 = t2.pointer, i22 = t2.event, o22 = t2.eventTarget, a2 = t2.type, s2 = n22.getPointerIndex(r2), c2 = n22.pointers[s2];
        if ("tap" === a2 && (n22.pointerWasMoved || !c2 || c2.downTarget !== o22)) return [];
        for (var l22 = q(o22), u22 = { interaction: n22, pointer: r2, event: i22, eventTarget: o22, type: a2, path: l22, targets: [], node: null }, p2 = 0; p2 < l22.length; p2++) {
          var f2 = l22[p2];
          u22.node = f2, e22.fire("pointerEvents:collect-targets", u22);
        }
        return "hold" === a2 && (u22.targets = u22.targets.filter((function(t3) {
          var e3, r3;
          return t3.eventable.options.holdDuration === (null == (e3 = n22.pointers[s2]) || null == (r3 = e3.hold) ? void 0 : r3.duration);
        }))), u22.targets;
      }
      function Gn(t2) {
        var e22 = t2.interaction, n22 = t2.pointerIndex, r2 = e22.pointers[n22].hold;
        r2 && r2.timeout && (clearTimeout(r2.timeout), r2.timeout = null);
      }
      var Nn = Object.freeze({ __proto__: null, default: Bn });
      function Un(t2) {
        var e22 = t2.interaction;
        e22.holdIntervalHandle && (clearInterval(e22.holdIntervalHandle), e22.holdIntervalHandle = null);
      }
      var Hn = { id: "pointer-events/holdRepeat", install: function(t2) {
        t2.usePlugin(Bn);
        var e22 = t2.pointerEvents;
        e22.defaults.holdRepeatInterval = 0, e22.types.holdrepeat = t2.actions.phaselessTypes.holdrepeat = true;
      }, listeners: ["move", "up", "cancel", "endall"].reduce((function(t2, e22) {
        return t2["pointerEvents:".concat(e22)] = Un, t2;
      }), { "pointerEvents:new": function(t2) {
        var e22 = t2.pointerEvent;
        "hold" === e22.type && (e22.count = (e22.count || 0) + 1);
      }, "pointerEvents:fired": function(t2, e22) {
        var n22 = t2.interaction, r2 = t2.pointerEvent, i22 = t2.eventTarget, o22 = t2.targets;
        if ("hold" === r2.type && o22.length) {
          var a2 = o22[0].eventable.options.holdRepeatInterval;
          a2 <= 0 || (n22.holdIntervalHandle = setTimeout((function() {
            e22.pointerEvents.fire({ interaction: n22, eventTarget: i22, type: "hold", pointer: r2, event: r2 }, e22);
          }), a2));
        }
      } }) }, Kn = Hn;
      var $n = { id: "pointer-events/interactableTargets", install: function(t2) {
        var e22 = t2.Interactable;
        e22.prototype.pointerEvents = function(t3) {
          return V(this.events.options, t3), this;
        };
        var n22 = e22.prototype._backCompatOption;
        e22.prototype._backCompatOption = function(t3, e3) {
          var r2 = n22.call(this, t3, e3);
          return r2 === this && (this.events.options[t3] = e3), r2;
        };
      }, listeners: { "pointerEvents:collect-targets": function(t2, e22) {
        var n22 = t2.targets, r2 = t2.node, i22 = t2.type, o22 = t2.eventTarget;
        e22.interactables.forEachMatch(r2, (function(t3) {
          var e3 = t3.events, a2 = e3.options;
          e3.types[i22] && e3.types[i22].length && t3.testIgnoreAllow(a2, r2, o22) && n22.push({ node: r2, eventable: e3, props: { interactable: t3 } });
        }));
      }, "interactable:new": function(t2) {
        var e22 = t2.interactable;
        e22.events.getRect = function(t3) {
          return e22.getRect(t3);
        };
      }, "interactable:set": function(t2, e22) {
        var n22 = t2.interactable, r2 = t2.options;
        V(n22.events.options, e22.pointerEvents.defaults), V(n22.events.options, r2.pointerEvents || {});
      } } }, Jn = $n, Qn = { id: "pointer-events", install: function(t2) {
        t2.usePlugin(Nn), t2.usePlugin(Kn), t2.usePlugin(Jn);
      } }, Zn = Qn;
      var tr = { id: "reflow", install: function(t2) {
        var e22 = t2.Interactable;
        t2.actions.phases.reflow = true, e22.prototype.reflow = function(e3) {
          return (function(t3, e4, n22) {
            for (var r2 = t3.getAllElements(), i22 = n22.window.Promise, o22 = i22 ? [] : null, a2 = function() {
              var a3 = r2[s2], c2 = t3.getRect(a3);
              if (!c2) return 1;
              var l22, u22 = bt(n22.interactions.list, (function(n3) {
                return n3.interacting() && n3.interactable === t3 && n3.element === a3 && n3.prepared.name === e4.name;
              }));
              if (u22) u22.move(), o22 && (l22 = u22._reflowPromise || new i22((function(t4) {
                u22._reflowResolve = t4;
              })));
              else {
                var p2 = U(c2), f2 = /* @__PURE__ */ (function(t4) {
                  return { coords: t4, get page() {
                    return this.coords.page;
                  }, get client() {
                    return this.coords.client;
                  }, get timeStamp() {
                    return this.coords.timeStamp;
                  }, get pageX() {
                    return this.coords.page.x;
                  }, get pageY() {
                    return this.coords.page.y;
                  }, get clientX() {
                    return this.coords.client.x;
                  }, get clientY() {
                    return this.coords.client.y;
                  }, get pointerId() {
                    return this.coords.pointerId;
                  }, get target() {
                    return this.coords.target;
                  }, get type() {
                    return this.coords.type;
                  }, get pointerType() {
                    return this.coords.pointerType;
                  }, get buttons() {
                    return this.coords.buttons;
                  }, preventDefault: function() {
                  } };
                })({ page: { x: p2.x, y: p2.y }, client: { x: p2.x, y: p2.y }, timeStamp: n22.now() });
                l22 = (function(t4, e5, n3, r3, i3) {
                  var o3 = t4.interactions.new({ pointerType: "reflow" }), a4 = { interaction: o3, event: i3, pointer: i3, eventTarget: n3, phase: "reflow" };
                  o3.interactable = e5, o3.element = n3, o3.prevEvent = i3, o3.updatePointer(i3, i3, n3, true), nt(o3.coords.delta), Ut(o3.prepared, r3), o3._doPhase(a4);
                  var s3 = t4.window, c3 = s3.Promise, l3 = c3 ? new c3((function(t5) {
                    o3._reflowResolve = t5;
                  })) : void 0;
                  o3._reflowPromise = l3, o3.start(r3, e5, n3), o3._interacting ? (o3.move(a4), o3.end(i3)) : (o3.stop(), o3._reflowResolve());
                  return o3.removePointer(i3, i3), l3;
                })(n22, t3, a3, e4, f2);
              }
              o22 && o22.push(l22);
            }, s2 = 0; s2 < r2.length && !a2(); s2++) ;
            return o22 && i22.all(o22).then((function() {
              return t3;
            }));
          })(this, e3, t2);
        };
      }, listeners: { "interactions:stop": function(t2, e22) {
        var n22 = t2.interaction;
        "reflow" === n22.pointerType && (n22._reflowResolve && n22._reflowResolve(), (function(t3, e3) {
          t3.splice(t3.indexOf(e3), 1);
        })(e22.interactions.list, n22));
      } } }, er = tr;
      if (un.use(he), un.use(Ce), un.use(Zn), un.use(qe), un.use(Ln), un.use(pe), un.use(Xt), un.use(Gt), un.use(er), un.default = un, "object" === n2(module) && module) try {
        module.exports = un;
      } catch (t2) {
      }
      return un.default = un, un;
    }));
  })(interact_min$1, interact_min$1.exports);
  return interact_min$1.exports;
}
var interact_minExports = /* @__PURE__ */ requireInteract_min();
const interact = /* @__PURE__ */ getDefaultExportFromCjs(interact_minExports);
const useSizeOverride = (context) => makeController(() => {
  const applyAxis = (requestedSize, axis, el) => {
    if (requestedSize === void 0) {
      return void 0;
    }
    const prop = axis === "block" ? "block-size" : "inline-size";
    if (requestedSize === null) {
      el.style.removeProperty(prop);
      return null;
    }
    let clampedSize = requestedSize;
    const bounds = context.getBounds?.() ?? { inline: { min: null, max: null }, block: { min: null, max: null } };
    const { min, max } = axis === "inline" ? bounds.inline : bounds.block;
    if (min !== null) {
      clampedSize = Math.round(Math.max(clampedSize, min));
    }
    if (max !== null) {
      clampedSize = Math.round(Math.min(clampedSize, max));
    }
    el.style.setProperty(prop, `${Math.round(clampedSize)}px`);
    return clampedSize;
  };
  return {
    resize(sizes) {
      let targetElement;
      if (typeof context.targetElement === "function") {
        const refObject = context.targetElement();
        targetElement = refObject?.value ?? null;
      } else if (context.targetElement && "value" in context.targetElement) {
        targetElement = context.targetElement.value;
      } else {
        targetElement = context.targetElement;
      }
      if (!targetElement) {
        return { inline: void 0, block: void 0 };
      }
      const inline = applyAxis(sizes.inline, "inline", targetElement);
      const block = applyAxis(sizes.block, "block", targetElement);
      return {
        inline,
        block
      };
    }
  };
});
function getDimensionClass(type, size, scale) {
  return size ? `${type}-${size}` : scale ? `${type}-${scale}` : `${type}-m`;
}
let openedComponentCount = 0;
let initialDocumentOverflowStyle = "";
const usePreventDocumentScroll = () => {
  function addOpenedComponent() {
    openedComponentCount++;
    if (openedComponentCount === 1) {
      initialDocumentOverflowStyle = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
    }
  }
  function removeOpenedComponent() {
    openedComponentCount--;
    if (openedComponentCount === 0) {
      document.documentElement.style.overflow = initialDocumentOverflowStyle;
    }
  }
  return makeGenericController((component, controller) => {
    controller.onConnected(() => {
      if (component.opened && component.preventDocumentScroll) {
        addOpenedComponent();
      }
    });
    controller.onUpdate((changes) => {
      if (!component.hasUpdated) {
        return;
      }
      if (changes.has("opened") && component.preventDocumentScroll) {
        if (component.opened) {
          addOpenedComponent();
        } else {
          removeOpenedComponent();
        }
      } else if (changes.has("preventDocumentScroll") && component.opened) {
        if (component.preventDocumentScroll) {
          addOpenedComponent();
        } else {
          removeOpenedComponent();
        }
      }
    });
    controller.onDisconnected(() => {
      if (component.opened && component.preventDocumentScroll) {
        removeOpenedComponent();
      }
    });
  });
};
const CSS$j = {
  dialog: "dialog",
  panel: "panel",
  scrim: "scrim",
  container: "container",
  containerOpen: "container--open",
  containerEmbedded: "container--embedded",
  assistiveText: "assistive-text"
};
const SLOTS$a = {
  actionBar: "action-bar",
  alerts: "alerts",
  customContent: "custom-content",
  contentTop: "content-top",
  contentBottom: "content-bottom",
  headerActionsStart: "header-actions-start",
  headerActionsEnd: "header-actions-end",
  headerMenuActions: "header-menu-actions",
  headerContent: "header-content",
  fab: "fab",
  footer: "footer",
  footerStart: "footer-start",
  footerEnd: "footer-end"
};
const initialDragPosition = { x: null, y: null };
const initialResizePosition = { top: null, right: null, bottom: null, left: null };
const styles$h = i`:host{--calcite-dialog-scrim-background-color: rgba(0, 0, 0, .85);pointer-events:none;inset:0;display:flex;--calcite-internal-dialog-animation-offset: 20px}:host([top-layer-disabled]),:host([top-layer-disabled]) .container,:host([embedded]),.container--embedded{z-index:var(--calcite-z-index-overlay)}:host([embedded][modal]){position:absolute}.container{pointer-events:auto;position:fixed;inset:0;display:flex;block-size:100%;inline-size:100%;align-items:center;justify-content:center;overflow:hidden;color:var(--calcite-color-text-2);opacity:0;visibility:hidden;transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88)}:host([placement=top]) .container{align-items:flex-start;justify-content:center}:host([placement=top-start]) .container{align-items:flex-start;justify-content:flex-start}:host([placement=top-end]) .container{align-items:flex-start;justify-content:flex-end}:host([placement=bottom]) .container{align-items:flex-end;justify-content:center}:host([placement=bottom-start]) .container{align-items:flex-end;justify-content:flex-start}:host([placement=bottom-end]) .container{align-items:flex-end;justify-content:flex-end}:host(:not([modal])) .container{pointer-events:none}:host([scale=s]){--calcite-internal-dialog-content-padding: var(--calcite-dialog-content-space, var(--calcite-spacing-sm));--calcite-internal-dialog-min-size-x: 198px;--calcite-internal-dialog-min-size-y: 140px}:host([scale=m]){--calcite-internal-dialog-content-padding: var(--calcite-dialog-content-space, var(--calcite-spacing-md));--calcite-internal-dialog-min-size-x: 288px;--calcite-internal-dialog-min-size-y: 180px}:host([scale=l]){--calcite-internal-dialog-content-padding: var(--calcite-dialog-content-space, var(--calcite-spacing-md-plus));--calcite-internal-dialog-min-size-x: 388px;--calcite-internal-dialog-min-size-y: 220px}.scrim{--calcite-scrim-background: var(--calcite-dialog-scrim-background-color, var(--calcite-color-transparent-scrim));--calcite-scrim-background-color: var( --calcite-dialog-scrim-background-color, var(--calcite-color-transparent-scrim) );position:fixed;inset:0;display:flex;overflow-y:hidden;z-index:calc(var(--calcite-z-index) * -1)}:host([top-layer-disabled]) .scrim{z-index:unset}calcite-panel{--calcite-panel-content-space: var(--calcite-dialog-content-space, var(--calcite-internal-dialog-content-padding));--calcite-panel-footer-space: var(--calcite-dialog-footer-space);--calcite-panel-border-color: var(--calcite-dialog-border-color);--calcite-panel-background-color: var(--calcite-dialog-background-color, var(--calcite-color-foreground-1));--calcite-panel-icon-color: var(--calcite-dialog-icon-color);--calcite-panel-heading-text-color: var(--calcite-dialog-heading-text-color);--calcite-panel-description-text-color: var(--calcite-dialog-description-text-color);--calcite-panel-header-background-color: var(--calcite-dialog-header-background-color);--calcite-panel-header-action-background-color: var(--calcite-dialog-header-action-background-color);--calcite-panel-header-action-background-color-hover: var(--calcite-dialog-header-action-background-color-hover);--calcite-panel-header-action-background-color-press: var(--calcite-dialog-header-action-background-color-press);--calcite-panel-header-action-text-color: var(--calcite-dialog-header-action-text-color);--calcite-panel-header-action-text-color-press: var(--calcite-dialog-header-action-text-color-press);--calcite-panel-footer-background-color: var(--calcite-dialog-footer-background-color);--calcite-panel-space: var(--calcite-dialog-space, var(--calcite-internal-dialog-content-padding));--calcite-panel-header-content-space: var(--calcite-dialog-header-content-space, var(--calcite-dialog-content-space));--calcite-popover-border-color: var(--calcite-dialog-action-menu-border-color, var(--calcite-color-border-1));--calcite-panel-corner-radius: var(--calcite-dialog-corner-radius)}:host([kind=brand]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-brand))}:host([kind=danger]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-status-danger))}:host([kind=info]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-status-info))}:host([kind=success]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-status-success))}:host([kind=warning]) calcite-panel{--calcite-panel-icon-color: var(--calcite-dialog-icon-color, var(--calcite-color-status-warning))}::slotted(*){--calcite-panel-background-color: initial}[popover]{padding:0;border:none;background-color:transparent;position:fixed;display:flex}[popover]:popover-open{display:flex}.dialog{pointer-events:none;position:relative;margin:1.5rem;box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;opacity:0;--tw-shadow: 0 2px 12px -4px rgba(0, 0, 0, .2), 0 2px 4px -2px rgba(0, 0, 0, .16);--tw-shadow-colored: 0 2px 12px -4px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);-webkit-overflow-scrolling:touch;visibility:hidden;transition:inset-block-start var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88) allow-discrete,opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88);border-radius:var(--calcite-dialog-corner-radius, var(--calcite-corner-radius-sm));min-inline-size:var(--calcite-dialog-min-size-x, var(--calcite-internal-dialog-min-size-x));max-inline-size:var(--calcite-dialog-max-size-x, 100%);min-block-size:var(--calcite-dialog-min-size-y, var(--calcite-internal-dialog-min-size-y));max-block-size:var(--calcite-dialog-max-size-y, 100%);--calcite-internal-dialog-hidden-position: calc( var(--calcite-dialog-offset-y, 0px) + var(--calcite-internal-dialog-animation-offset) );--calcite-internal-dialog-shown-position: var(--calcite-dialog-offset-y, 0);inset-inline-start:var(--calcite-dialog-offset-x, 0);inset-block-start:var(--calcite-internal-dialog-hidden-position)}:host([top-layer-disabled]) .dialog,:host([embedded]) .dialog{z-index:var(--calcite-z-index-modal)}:host([menu-open]) .dialog{transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88)}.panel{visibility:hidden;opacity:0;border-radius:var(--calcite-dialog-corner-radius, var(--calcite-corner-radius-sm));transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow),opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88)}.container--open .panel{visibility:visible;opacity:1;transition:visibility 0ms linear,opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88)}.container--open{opacity:1;visibility:visible;transition-delay:0ms}.container--open .dialog{pointer-events:auto;visibility:visible;opacity:1;transition:inset-block-start var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88) allow-discrete,opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(.215,.44,.42,.88);transition-delay:0ms}.width-s{inline-size:auto;inline-size:var(--calcite-dialog-size-x, 32rem);block-size:var(--calcite-dialog-size-y, auto)}@media screen and (max-width:35rem){:host(:not([fullscreen-disabled])) .width-s{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;inset-inline-start:0;inset-block-start:var(--calcite-internal-dialog-animation-offset)}}.width-m{inline-size:var(--calcite-dialog-size-x, 48rem);block-size:var(--calcite-dialog-size-y, auto)}@media screen and (max-width:51rem){:host(:not([fullscreen-disabled])) .width-m{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;inset-inline-start:0;inset-block-start:var(--calcite-internal-dialog-animation-offset)}}.width-l{inline-size:var(--calcite-dialog-size-x, 94rem);block-size:var(--calcite-dialog-size-y, auto)}@media screen and (max-width:97rem){:host(:not([fullscreen-disabled])) .width-l{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;inset-inline-start:0;inset-block-start:var(--calcite-internal-dialog-animation-offset)}}:host([placement=cover]) .dialog{margin:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;border-radius:0}:host([placement=cover]) .panel{border-radius:0}:host([kind]) .panel{border-start-start-radius:0px;border-start-end-radius:0px}:host([kind]) .dialog{overflow:hidden}:host([kind=brand]) .dialog{border-color:var(--calcite-color-brand)}:host([kind=danger]) .dialog{border-color:var(--calcite-dialog-accent-color, var(--calcite-color-status-danger))}:host([kind=info]) .dialog{border-color:var(--calcite-dialog-accent-color, var(--calcite-color-status-info))}:host([kind=success]) .dialog{border-color:var(--calcite-dialog-accent-color, var(--calcite-color-status-success))}:host([kind=warning]) .dialog{border-color:var(--calcite-dialog-accent-color, var(--calcite-color-status-warning))}:host([open]) .dialog{inset-block-start:var(--calcite-internal-dialog-shown-position)}@starting-style{:host([open]) .dialog{inset-block-start:var(--calcite-internal-dialog-hidden-position)}}:host([kind=brand][open]) .dialog,:host([kind=danger][open]) .dialog,:host([kind=info][open]) .dialog,:host([kind=success][open]) .dialog,:host([kind=warning][open]) .dialog{border-width:0px;border-block-start-width:4px;border-style:solid}.container--embedded{position:absolute;pointer-events:auto}.container--embedded calcite-scrim{position:absolute}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}`;
const _Dialog = class _Dialog extends LitElement {
  constructor() {
    super(...arguments);
    this.dragPosition = { ...initialDragPosition };
    this.focusTrap = useFocusTrap({
      triggerProp: "open",
      focusTrapOptions: {
        // scrim closes on click, so we let it take over
        clickOutsideDeactivates: () => !this.modal || this.embedded,
        escapeDeactivates: (event) => {
          if (!event.defaultPrevented && !this.escapeDisabled) {
            this.open = false;
            event.preventDefault();
          }
          return false;
        }
      }
    })(this);
    this.usePreventDocumentScroll = usePreventDocumentScroll()(this);
    this.mutationObserver = createObserver();
    this._open = false;
    this.openProp = "opened";
    this.transitionProp = "opacity";
    this.panelRef = e();
    this.popoverRef = e();
    this.resizePosition = { ...initialResizePosition };
    this.transitionEl = null;
    this.messages = useT9n();
    this.focusSetter = useSetFocus()(this);
    this.sizeOverride = useSizeOverride({
      targetElement: () => ({ value: this.transitionEl }),
      getBounds: () => ({
        inline: { min: this.resizeValues.minInlineSize, max: this.resizeValues.maxInlineSize },
        block: { min: this.resizeValues.minBlockSize, max: this.resizeValues.maxBlockSize }
      }),
      fullscreenDisabled: () => this.fullscreenDisabled
    });
    this.topLayer = useTopLayer({
      disabledOverride: () => this.embedded,
      target: this.popoverRef
    })(this);
    this.assistiveText = null;
    this.hasContentBottom = false;
    this.hasContentTop = false;
    this.hasFooter = true;
    this.opened = false;
    this.resizeValues = {
      inlineSize: null,
      blockSize: null,
      minInlineSize: null,
      minBlockSize: null,
      maxInlineSize: null,
      maxBlockSize: null
    };
    this.closeDisabled = false;
    this.dragEnabled = false;
    this.embedded = false;
    this.escapeDisabled = false;
    this.fullscreenDisabled = false;
    this.iconFlipRtl = false;
    this.loading = false;
    this.menuOpen = false;
    this.modal = false;
    this.focusTrapDisabled = false;
    this.outsideCloseDisabled = false;
    this.overlayPositioning = "absolute";
    this.placement = "center";
    this.resizable = false;
    this.scale = "m";
    this.topLayerDisabled = false;
    this.widthScale = "m";
    this.calciteDialogBeforeClose = createEvent({ cancelable: false });
    this.calciteDialogBeforeOpen = createEvent({ cancelable: false });
    this.calciteDialogClose = createEvent({ cancelable: false });
    this.calciteDialogOpen = createEvent({ cancelable: false });
    this.calciteDialogScroll = createEvent({ cancelable: false });
  }
  get preventDocumentScroll() {
    return !this.embedded && this.modal;
  }
  get open() {
    return this._open;
  }
  set open(value) {
    const oldValue = this._open;
    if (value !== oldValue) {
      this.setOpenState(value);
    }
  }
  async scrollContentTo(options) {
    await this.panelRef.value?.scrollContentTo(options);
  }
  async setFocus(options) {
    return this.focusSetter(() => this.panelRef.value ?? this.el, options);
  }
  async updateFocusTrapElements(extraContainers) {
    this.focusTrap.setExtraContainers(extraContainers);
    this.focusTrap.updateContainerElements();
  }
  async updateSize(size) {
    this.updateSizeInternal(size);
  }
  connectedCallback() {
    super.connectedCallback();
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.setupInteractions();
  }
  willUpdate(changes) {
    if (changes.has("open") && (this.hasUpdated || this.open !== false) || changes.has("placement") && (this.hasUpdated || this.placement !== "center") || changes.has("resizable") && (this.hasUpdated || this.resizable !== false) || changes.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== false)) {
      this.setupInteractions();
    }
    if (changes.has("messages") || changes.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== false) || changes.has("resizable") && (this.hasUpdated || this.resizable !== false)) {
      this.updateAssistiveText();
    }
    if (changes.has("opened") && (this.hasUpdated || this.opened !== false)) {
      this.handleOpenedChange();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.mutationObserver?.disconnect();
    this.embedded = false;
    this.cleanupInteractions();
  }
  focusTrapDisabledOverride() {
    return !this.modal && this.focusTrapDisabled;
  }
  updateAssistiveText() {
    const { messages } = this;
    this.assistiveText = messages && (this.dragEnabled || this.resizable) ? `${this.dragEnabled ? messages.dragEnabled : ""} ${this.resizable ? messages.resizeEnabled : ""}` : null;
  }
  onBeforeOpen() {
    this.calciteDialogBeforeOpen.emit();
    this.topLayer.show();
  }
  onOpen() {
    if (this.focusTrapDisabled) {
      this.setFocus();
    }
    this.focusTrap.activate();
    this.calciteDialogOpen.emit();
  }
  onBeforeClose() {
    this.calciteDialogBeforeClose.emit();
  }
  onClose() {
    this.focusTrap.deactivate();
    this.calciteDialogClose.emit();
    this.topLayer.hide();
  }
  async setOpenState(value) {
    if (this.beforeClose && !value) {
      try {
        await this.beforeClose?.();
      } catch {
        return;
      }
    }
    this._open = value;
    if (value) {
      await this.componentOnReady();
    }
    this.opened = value;
  }
  handleOpenedChange() {
    toggleOpenClose(this);
  }
  async triggerInteractModifiers() {
    const { interaction } = this;
    if (!interaction) {
      return;
    }
    await interaction.reflow({
      name: "drag"
    });
    await interaction.reflow({
      name: "resize"
    });
  }
  getTransitionRefDOMRect() {
    return this.transitionEl.getBoundingClientRect();
  }
  handleKeyDown(event) {
    const { key, shiftKey, defaultPrevented } = event;
    const { dragEnabled, resizable, resizePosition, dragPosition, transitionEl } = this;
    const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (defaultPrevented || !keys.includes(key)) {
      return;
    }
    switch (key) {
      case "ArrowUp":
        if (shiftKey && resizable && transitionEl) {
          const { minBlockSize } = window.getComputedStyle(transitionEl);
          const minHeight = getStylePixelValue(minBlockSize);
          const height = this.getTransitionRefDOMRect().height;
          if (height <= minHeight) {
            return;
          }
          this.updateSizeInternal({
            block: height - resizeShiftStep
          });
          resizePosition.bottom -= resizeShiftStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        } else if (dragEnabled) {
          dragPosition.y -= resizeShiftStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        }
        break;
      case "ArrowDown":
        if (shiftKey && resizable && transitionEl) {
          this.updateSizeInternal({
            block: this.getTransitionRefDOMRect().height + resizeShiftStep
          });
          resizePosition.bottom += resizeShiftStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        } else if (dragEnabled) {
          dragPosition.y += resizeShiftStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        }
        break;
      case "ArrowLeft":
        if (shiftKey && resizable && transitionEl) {
          const { minInlineSize } = window.getComputedStyle(transitionEl);
          const minWidth = getStylePixelValue(minInlineSize);
          const width = this.getTransitionRefDOMRect().width;
          if (width <= minWidth) {
            return;
          }
          this.updateSizeInternal({
            inline: width - resizeShiftStep
          });
          resizePosition.right -= resizeShiftStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        } else if (dragEnabled) {
          dragPosition.x -= resizeShiftStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        }
        break;
      case "ArrowRight":
        if (shiftKey && resizable && transitionEl) {
          this.updateSizeInternal({
            inline: this.getTransitionRefDOMRect().width + resizeShiftStep
          });
          resizePosition.right += resizeShiftStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        } else if (dragEnabled) {
          dragPosition.x += resizeShiftStep;
          this.updateTransform();
          this.triggerInteractModifiers();
          event.preventDefault();
        }
        break;
    }
  }
  updateTransform() {
    const { dragPosition: { x, y }, resizePosition, transitionEl, dragEnabled, resizable } = this;
    if (!transitionEl) {
      return;
    }
    if (!dragEnabled && !resizable) {
      transitionEl.style.transform = null;
      return;
    }
    const { top, right, bottom, left } = this.getAdjustedResizePosition(resizePosition);
    const translateX = Math.round(x + left + right);
    const translateY = Math.round(y + top + bottom);
    this.transitionEl.style.transform = translateX || translateY ? `translate(${translateX}px, ${translateY}px)` : null;
  }
  cleanupInteractions() {
    this.interaction?.unset();
    this.updateSizeInternal({
      inline: null,
      block: null
    });
    this.dragPosition = { ...initialDragPosition };
    this.resizePosition = { ...initialResizePosition };
    this.updateTransform();
  }
  async setupInteractions() {
    this.cleanupInteractions();
    const { el, transitionEl, resizable, dragEnabled, resizePosition, dragPosition } = this;
    if (!transitionEl || !this.open) {
      return;
    }
    if (resizable || dragEnabled) {
      this.interaction = interact(transitionEl, { context: el.ownerDocument });
    }
    if (resizable) {
      await this.el.componentOnReady();
      const { minInlineSize, minBlockSize, maxInlineSize, maxBlockSize } = window.getComputedStyle(this.transitionEl);
      this.interaction.resizable({
        edges: {
          top: true,
          right: true,
          bottom: true,
          left: true
        },
        modifiers: [
          interact.modifiers.restrictSize({
            min: {
              width: getStylePixelValue(minInlineSize),
              height: getStylePixelValue(minBlockSize)
            },
            max: {
              width: getStylePixelValue(maxInlineSize) || window.innerWidth,
              height: getStylePixelValue(maxBlockSize) || window.innerHeight
            }
          }),
          interact.modifiers.restrict({
            restriction: "parent"
          })
        ],
        listeners: {
          move: ({ rect, deltaRect }) => {
            if (deltaRect) {
              resizePosition.top += deltaRect.top;
              resizePosition.right += deltaRect.right;
              resizePosition.bottom += deltaRect.bottom;
              resizePosition.left += deltaRect.left;
            }
            this.updateSizeInternal({
              inline: rect.width,
              block: rect.height
            });
            this.updateTransform();
          }
        }
      });
    }
    if (dragEnabled) {
      this.interaction.draggable({
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent"
          })
        ],
        listeners: {
          move: ({ dx, dy }) => {
            dragPosition.x += dx;
            dragPosition.y += dy;
            this.updateTransform();
          }
        }
      });
    }
  }
  getAdjustedResizePosition({ top, right, bottom, left }) {
    const halfTop = top / 2;
    const halfRight = right / 2;
    const halfBottom = bottom / 2;
    const halfLeft = left / 2;
    switch (this.placement) {
      case "top":
        return { top, right: halfRight, bottom: 0, left: halfLeft };
      case "top-start":
        return { top, right: 0, bottom: 0, left };
      case "top-end":
        return { top, right, bottom: 0, left: 0 };
      case "bottom":
        return { top: 0, right: halfRight, bottom, left: halfLeft };
      case "bottom-start":
        return { top: 0, right: 0, bottom, left };
      case "bottom-end":
        return { top: 0, right, bottom, left: 0 };
      case "cover":
      case "center":
      default:
        return {
          top: halfTop,
          right: halfRight,
          bottom: halfBottom,
          left: halfLeft
        };
    }
  }
  setTransitionEl(el) {
    if (!el) {
      return;
    }
    this.transitionEl = el;
    this.setupInteractions();
  }
  handleInternalPanelScroll(event) {
    if (event.target !== this.panelRef.value) {
      return;
    }
    event.stopPropagation();
    this.calciteDialogScroll.emit();
  }
  handleInternalPanelCloseClick(event) {
    if (event.target !== this.panelRef.value) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.open = false;
  }
  handlePanelKeyDown(event) {
    if (this.escapeDisabled && event.key === "Escape" && !event.defaultPrevented) {
      event.preventDefault();
    }
  }
  handleOutsideClose() {
    if (this.outsideCloseDisabled) {
      return;
    }
    this.open = false;
  }
  handleMutationObserver() {
    this.focusTrap.updateContainerElements();
  }
  updateSizeInternal(size) {
    const dialogElement = this.transitionEl;
    if (!dialogElement) {
      return;
    }
    const appliedSize = this.sizeOverride.resize(size);
    this.resizeValues = {
      ...this.resizeValues,
      ...appliedSize.inline !== void 0 && {
        inlineSize: appliedSize.inline
      },
      ...appliedSize.block !== void 0 && {
        blockSize: appliedSize.block
      }
    };
  }
  render() {
    const { assistiveText, description, heading, opened, icon, iconFlipRtl } = this;
    return T`<div .ariaDescription=${description} .ariaLabel=${heading} .ariaModal=${this.modal} class=${safeClassMap({
      [CSS$j.container]: true,
      [CSS$j.containerOpen]: opened,
      [CSS$j.containerEmbedded]: this.embedded
    })} .popover=${!this.embedded ? "manual" : null} role=dialog ${n(this.popoverRef)}>${this.modal ? T`<calcite-scrim class=${safeClassMap(CSS$j.scrim)} @click=${this.handleOutsideClose}></calcite-scrim>` : null}<div class=${safeClassMap({
      [CSS$j.dialog]: true,
      [getDimensionClass("width", this.width, this.widthScale)]: !!(this.width || this.widthScale)
    })} @keydown=${this.handleKeyDown} ${n(this.setTransitionEl)}>${assistiveText ? i$2("assistive-text", T`<div aria-live=polite class=${safeClassMap(CSS$j.assistiveText)}>${assistiveText}</div>`) : null}<slot name=${SLOTS$a.customContent}><calcite-panel class=${safeClassMap(CSS$j.panel)} .closable=${!this.closeDisabled} .description=${description} .heading=${heading} .headingLevel=${this.headingLevel} .hidden=${!this.opened} .icon=${icon} .iconFlipRtl=${iconFlipRtl} .loading=${this.loading} .menuOpen=${this.menuOpen} .messageOverrides=${this.messageOverrides} @keydown=${this.handlePanelKeyDown} @calcitePanelClose=${this.handleInternalPanelCloseClick} @calcitePanelScroll=${this.handleInternalPanelScroll} .overlayPositioning=${this.overlayPositioning} .scale=${this.scale} .topLayerDisabled=${this.topLayerDisabled} ${n(this.panelRef)}><slot name=${SLOTS$a.actionBar} slot=${SLOTS$b.actionBar}></slot><slot name=${SLOTS$a.alerts} slot=${SLOTS$b.alerts}></slot><slot name=${SLOTS$a.headerActionsStart} slot=${SLOTS$b.headerActionsStart}></slot><slot name=${SLOTS$a.headerActionsEnd} slot=${SLOTS$b.headerActionsEnd}></slot><slot name=${SLOTS$a.headerContent} slot=${SLOTS$b.headerContent}></slot><slot name=${SLOTS$a.headerMenuActions} slot=${SLOTS$b.headerMenuActions}></slot><slot name=${SLOTS$a.fab} slot=${SLOTS$b.fab}></slot><slot name=${SLOTS$a.contentTop} slot=${SLOTS$b.contentTop}></slot><slot name=${SLOTS$a.contentBottom} slot=${SLOTS$b.contentBottom}></slot><slot name=${SLOTS$a.footerStart} slot=${SLOTS$b.footerStart}></slot><slot name=${SLOTS$a.footer} slot=${SLOTS$b.footer}></slot><slot name=${SLOTS$a.footerEnd} slot=${SLOTS$b.footerEnd}></slot><slot></slot></calcite-panel></slot></div></div>`;
  }
};
_Dialog.properties = { assistiveText: [16, {}, { state: true }], hasContentBottom: [16, {}, { state: true }], hasContentTop: [16, {}, { state: true }], hasFooter: [16, {}, { state: true }], opened: [16, {}, { state: true }], resizeValues: [16, {}, { state: true }], beforeClose: [0, {}, { attribute: false }], closeDisabled: [7, {}, { reflect: true, type: Boolean }], description: 1, dragEnabled: [7, {}, { reflect: true, type: Boolean }], embedded: [7, {}, { reflect: true, type: Boolean }], escapeDisabled: [7, {}, { reflect: true, type: Boolean }], focusTrapOptions: [0, {}, { attribute: false }], fullscreenDisabled: [7, {}, { reflect: true, type: Boolean }], heading: 1, headingLevel: [11, {}, { type: Number, reflect: true }], kind: [3, {}, { reflect: true }], icon: [3, { type: String }, { reflect: true }], iconFlipRtl: [7, {}, { reflect: true, type: Boolean }], loading: [7, {}, { reflect: true, type: Boolean }], menuOpen: [7, {}, { reflect: true, type: Boolean }], messageOverrides: [0, {}, { attribute: false }], modal: [7, {}, { reflect: true, type: Boolean }], focusTrapDisabled: [7, {}, { reflect: true, type: Boolean }], open: [7, {}, { reflect: true, type: Boolean }], outsideCloseDisabled: [7, {}, { reflect: true, type: Boolean }], overlayPositioning: [3, {}, { reflect: true }], placement: [3, {}, { reflect: true }], resizable: [7, {}, { reflect: true, type: Boolean }], scale: [3, {}, { reflect: true }], topLayerDisabled: [7, {}, { reflect: true, type: Boolean }], widthScale: [3, {}, { reflect: true }], width: [3, {}, { reflect: true }] };
_Dialog.styles = styles$h;
let Dialog = _Dialog;
customElement("calcite-dialog", Dialog);
const index$g = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Dialog
});
const StatusIconDefaults = {
  valid: "check-circle",
  invalid: "exclamation-mark-triangle",
  idle: "information"
};
const styles$g = i`:host{box-sizing:border-box;display:flex;block-size:auto;inline-size:100%;align-items:center;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);opacity:1;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;margin-block-start:var(--calcite-input-message-spacing, var(--calcite-input-message-spacing-value, var(--calcite-spacing-xxs)))}.calcite-input-message-icon{pointer-events:none;display:inline-flex;flex-shrink:0;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;margin-inline-end:var(--calcite-spacing-sm)}:host([status=invalid]) .calcite-input-message-icon{color:var(--calcite-input-message-icon-color, var(--calcite-icon-color, var(--calcite-ui-icon-color, var(--calcite-color-status-danger))))}:host([status=valid]) .calcite-input-message-icon{color:var(--calcite-input-message-icon-color, var(--calcite-icon-color, var(--calcite-ui-icon-color, var(--calcite-color-status-success))))}:host([status=idle]) .calcite-input-message-icon{color:var(--calcite-input-message-icon-color, var(--calcite-icon-color, var(--calcite-ui-icon-color, var(--calcite-color-brand))))}:host([scale=s]){font-size:var(--calcite-font-size-relative-xs);line-height:var(--calcite-font-line-height-xs)}:host([scale=m]){font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm)}:host([scale=l]){font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base)}:host([hidden]){display:none}[hidden]{display:none}`;
const CSS$i = {
  inputMessageIcon: "calcite-input-message-icon"
};
const _InputMessage = class _InputMessage extends LitElement {
  constructor() {
    super(...arguments);
    this.iconFlipRtl = false;
    this.scale = "m";
    this.status = "idle";
  }
  connectedCallback() {
    super.connectedCallback();
    this.requestedIcon = setRequestedIcon(StatusIconDefaults, this.icon, this.status);
  }
  willUpdate(changes) {
    if (changes.has("status") && (this.hasUpdated || this.status !== "idle") || changes.has("icon")) {
      this.requestedIcon = setRequestedIcon(StatusIconDefaults, this.icon, this.status);
    }
  }
  render() {
    const hidden = this.el.hidden;
    setAttribute(this.el, "calcite-hydrated-hidden", hidden);
    return T`${this.renderIcon(this.requestedIcon)}<slot></slot>`;
  }
  renderIcon(iconName) {
    if (iconName) {
      return T`<calcite-icon class=${safeClassMap(CSS$i.inputMessageIcon)} .flipRtl=${this.iconFlipRtl} .icon=${iconName} scale=s></calcite-icon>`;
    }
  }
};
_InputMessage.properties = { icon: [3, { converter: stringOrBoolean, type: String }, { reflect: true }], iconFlipRtl: [7, {}, { reflect: true, type: Boolean }], scale: [3, {}, { reflect: true }], status: [3, {}, { reflect: true }] };
_InputMessage.styles = styles$g;
let InputMessage = _InputMessage;
customElement("calcite-input-message", InputMessage);
const index$f = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  InputMessage
});
const unnecessaryDecimal = new RegExp(`\\${"."}(0+)?$`);
const trailingZeros = new RegExp("0+$");
const _BigDecimal = class _BigDecimal {
  // derived constant
  constructor(input) {
    if (input instanceof _BigDecimal) {
      return input;
    }
    const [integers, decimals] = expandExponentialNumberString(input).split(".").concat("");
    this.value = BigInt(integers + decimals.padEnd(_BigDecimal.DECIMALS, "0").slice(0, _BigDecimal.DECIMALS)) + BigInt(_BigDecimal.ROUNDED && decimals[_BigDecimal.DECIMALS] >= "5");
    this.isNegative = input.charAt(0) === "-";
  }
  getIntegersAndDecimals() {
    const s = this.value.toString().replace("-", "").padStart(_BigDecimal.DECIMALS + 1, "0");
    const integers = s.slice(0, -_BigDecimal.DECIMALS);
    const decimals = s.slice(-_BigDecimal.DECIMALS).replace(trailingZeros, "");
    return { integers, decimals };
  }
  toString() {
    const { integers, decimals } = this.getIntegersAndDecimals();
    return `${this.isNegative ? "-" : ""}${integers}${decimals.length ? "." + decimals : ""}`;
  }
  formatToParts(formatter) {
    const { integers, decimals } = this.getIntegersAndDecimals();
    const parts = formatter.numberFormatter.formatToParts(BigInt(integers));
    if (this.isNegative) {
      parts.unshift({ type: "minusSign", value: formatter.minusSign });
    }
    if (decimals.length) {
      parts.push({ type: "decimal", value: formatter.decimal });
      decimals.split("").forEach((char) => parts.push({ type: "fraction", value: char }));
    }
    return parts;
  }
  format(formatter) {
    const { integers, decimals } = this.getIntegersAndDecimals();
    const integersFormatted = `${this.isNegative ? formatter.minusSign : ""}${formatter.numberFormatter.format(
      BigInt(integers)
    )}`;
    const decimalsFormatted = decimals.length ? `${formatter.decimal}${decimals.split("").map((char) => formatter.numberFormatter.format(Number(char))).join("")}` : "";
    return `${integersFormatted}${decimalsFormatted}`;
  }
  add(n2) {
    return _BigDecimal.fromBigInt(this.value + new _BigDecimal(n2).value);
  }
  subtract(n2) {
    return _BigDecimal.fromBigInt(this.value - new _BigDecimal(n2).value);
  }
  multiply(n2) {
    return _BigDecimal._divRound(this.value * new _BigDecimal(n2).value, _BigDecimal.SHIFT);
  }
  divide(n2) {
    return _BigDecimal._divRound(this.value * _BigDecimal.SHIFT, new _BigDecimal(n2).value);
  }
};
_BigDecimal.DECIMALS = 100;
_BigDecimal.ROUNDED = true;
_BigDecimal.SHIFT = BigInt("1" + "0".repeat(_BigDecimal.DECIMALS));
_BigDecimal._divRound = (dividend, divisor) => _BigDecimal.fromBigInt(
  dividend / divisor + (_BigDecimal.ROUNDED ? dividend * BigInt(2) / divisor % BigInt(2) : BigInt(0))
);
_BigDecimal.fromBigInt = (bigint) => Object.assign(Object.create(_BigDecimal.prototype), { value: bigint, isNegative: bigint < BigInt(0) });
let BigDecimal = _BigDecimal;
function isValidNumber(numberString) {
  return !(!numberString || isNaN(Number(numberString)));
}
function parseNumberString(numberString) {
  if (!numberString || !stringContainsNumbers(numberString)) {
    return "";
  }
  return sanitizeExponentialNumberString(numberString, (nonExpoNumString) => {
    let containsDecimal = false;
    const result = nonExpoNumString.split("").filter((value, i2) => {
      if (value.match(/\./g) && !containsDecimal) {
        containsDecimal = true;
        return true;
      }
      if (value.match(/-/g) && i2 === 0) {
        return true;
      }
      return numberKeys.includes(value);
    }).join("");
    return isValidNumber(result) ? new BigDecimal(result).toString() : "";
  });
}
const allLeadingZerosOptionallyNegative = /^([-0])0+(?=\d)/;
const decimalOnlyAtEndOfString = /(?!^\.)\.$/;
const allHyphensExceptTheStart = /(?!^-)-/g;
const isNegativeDecimalOnlyZeros = /^-\b0\b\.?0*$/;
const hasTrailingDecimalZeros = /0*$/;
const charAllowlist = /* @__PURE__ */ new Set(["e", "E", "-", ",", ".", ...numberKeys]);
const sanitizeNumberString = (numberString) => {
  const strippedInvalidCharsValue = Array.from(numberString).filter((char) => charAllowlist.has(char)).join("");
  return sanitizeExponentialNumberString(strippedInvalidCharsValue, (nonExpoNumString) => {
    const sanitizedValue = nonExpoNumString.replace(allHyphensExceptTheStart, "").replace(decimalOnlyAtEndOfString, "").replace(allLeadingZerosOptionallyNegative, "$1");
    return isValidNumber(sanitizedValue) ? isNegativeDecimalOnlyZeros.test(sanitizedValue) ? sanitizedValue : getBigDecimalAsString(sanitizedValue) : nonExpoNumString;
  });
};
function getBigDecimalAsString(sanitizedValue) {
  const sanitizedValueDecimals = sanitizedValue.split(".")[1];
  const value = new BigDecimal(sanitizedValue).toString();
  const [bigDecimalValueInteger, bigDecimalValueDecimals] = value.split(".");
  return sanitizedValueDecimals && bigDecimalValueDecimals !== sanitizedValueDecimals ? `${bigDecimalValueInteger}.${sanitizedValueDecimals}` : value;
}
function sanitizeExponentialNumberString(numberString, func) {
  if (!numberString) {
    return numberString;
  }
  const firstE = numberString.toLowerCase().indexOf("e") + 1;
  if (!firstE) {
    return func(numberString);
  }
  return numberString.replace(/[eE]*$/g, "").substring(0, firstE).concat(numberString.slice(firstE).replace(/[eE]/g, "")).split(/[eE]/).map((section, i2) => i2 === 1 ? func(section.replace(/\./g, "")) : func(section)).join("e").replace(/^e/, "1e");
}
function expandExponentialNumberString(numberString) {
  const exponentialParts = numberString.split(/[eE]/);
  if (exponentialParts.length === 1) {
    return numberString;
  }
  const number = +numberString;
  if (Number.isSafeInteger(number)) {
    return `${number}`;
  }
  const isNegative = numberString.charAt(0) === "-";
  const magnitude = +exponentialParts[1];
  const decimalParts = exponentialParts[0].split(".");
  const integers = (isNegative ? decimalParts[0].substring(1) : decimalParts[0]) || "";
  const decimals = decimalParts[1] || "";
  const shiftDecimalLeft = (integers2, magnitude2) => {
    const magnitudeDelta = Math.abs(magnitude2) - integers2.length;
    const leftPaddedZeros = magnitudeDelta > 0 ? `${"0".repeat(magnitudeDelta)}${integers2}` : integers2;
    const shiftedDecimal = `${leftPaddedZeros.slice(0, magnitude2)}${"."}${leftPaddedZeros.slice(magnitude2)}`;
    return shiftedDecimal;
  };
  const shiftDecimalRight = (decimals2, magnitude2) => {
    const rightPaddedZeros = magnitude2 > decimals2.length ? `${decimals2}${"0".repeat(magnitude2 - decimals2.length)}` : decimals2;
    const shiftedDecimal = `${rightPaddedZeros.slice(0, magnitude2)}${"."}${rightPaddedZeros.slice(magnitude2)}`;
    return shiftedDecimal;
  };
  const expandedNumberString = magnitude > 0 ? `${integers}${shiftDecimalRight(decimals, magnitude)}` : `${shiftDecimalLeft(integers, magnitude)}${decimals}`;
  return `${isNegative ? "-" : ""}${expandedNumberString.charAt(0) === "." ? "0" : ""}${expandedNumberString.replace(unnecessaryDecimal, "").replace(allLeadingZerosOptionallyNegative, "")}`;
}
function stringContainsNumbers(string) {
  return numberKeys.some((number) => string.includes(number));
}
function addLocalizedTrailingDecimalZeros(localizedValue, value, formatter) {
  const decimals = value.split(".")[1];
  if (decimals) {
    const trailingDecimalZeros = decimals.match(hasTrailingDecimalZeros)[0];
    if (trailingDecimalZeros && formatter.delocalize(localizedValue).length !== value.length && decimals.indexOf("e") === -1) {
      const decimalSeparator = formatter.decimal;
      localizedValue = !localizedValue.includes(decimalSeparator) ? `${localizedValue}${decimalSeparator}` : localizedValue;
      return localizedValue.padEnd(localizedValue.length + trailingDecimalZeros.length, formatter.localize("0"));
    }
  }
  return localizedValue;
}
new Map(
  Object.entries({
    bg: { am: "пр.об.", pm: "сл.об." },
    bs: { am: "prijepodne", pm: "popodne" },
    ca: { am: "a. m.", pm: "p. m." },
    cs: { am: "dop.", pm: "odp." },
    es: { am: "a. m.", pm: "p. m." },
    "es-mx": { am: "a.m.", pm: "p.m." },
    "es-MX": { am: "a.m.", pm: "p.m." },
    fi: { am: "ap.", pm: "ip." },
    he: { am: "לפנה״צ", pm: "אחה״צ" },
    hu: { am: "de. ", pm: "du." },
    lt: { am: "priešpiet", pm: "popiet" },
    lv: { am: "priekšpusdienā", pm: "pēcpusdienā" },
    mk: { am: "претпл.", pm: "попл." },
    no: { am: "a.m.", pm: "p.m." },
    nl: { am: "a.m.", pm: "p.m." },
    "pt-pt": { am: "da manhã", pm: "da tarde" },
    "pt-PT": { am: "da manhã", pm: "da tarde" },
    ro: { am: "a.m.", pm: "p.m." },
    sl: { am: "dop.", pm: "pop." },
    sv: { am: "fm", pm: "em" },
    th: { am: "ก่อนเที่ยง", pm: "หลังเที่ยง" },
    tr: { am: "ÖÖ", pm: "ÖS" },
    uk: { am: "дп", pm: "пп" },
    vi: { am: "SA", pm: "CH" }
  })
);
const numberingSystems = ["arab", "arabext", "latn"];
const isNumberingSystemSupported = (numberingSystem) => numberingSystems.includes(numberingSystem);
const browserNumberingSystem = new Intl.NumberFormat().resolvedOptions().numberingSystem;
const defaultNumberingSystem = browserNumberingSystem === "arab" || !isNumberingSystemSupported(browserNumberingSystem) ? "latn" : browserNumberingSystem;
const getSupportedNumberingSystem = (numberingSystem) => isNumberingSystemSupported(numberingSystem) ? numberingSystem : defaultNumberingSystem;
class NumberStringFormat {
  constructor() {
    this.delocalize = (numberString) => (
      // For performance, (de)localization is skipped if the formatter isn't initialized.
      // In order to localize/delocalize, e.g. when lang/numberingSystem props are not default values,
      // `numberFormatOptions` must be set in a component to create and cache the formatter.
      this._numberFormatOptions ? sanitizeExponentialNumberString(
        numberString,
        (nonExpoNumString) => nonExpoNumString.replace(new RegExp(`[${this._minusSign}]`, "g"), "-").replace(new RegExp(`[${this._group}]`, "g"), "").replace(new RegExp(`[${this._decimal}]`, "g"), ".").replace(new RegExp(`[${this._digits.join("")}]`, "g"), this._getDigitIndex)
      ) : numberString
    );
    this.localize = (numberString) => this._numberFormatOptions ? sanitizeExponentialNumberString(
      numberString,
      (nonExpoNumString) => isValidNumber(nonExpoNumString.trim()) ? new BigDecimal(nonExpoNumString.trim()).format(this).replace(new RegExp(`[${this._actualGroup}]`, "g"), this._group) : nonExpoNumString
    ) : numberString;
  }
  get group() {
    return this._group;
  }
  get decimal() {
    return this._decimal;
  }
  get minusSign() {
    return this._minusSign;
  }
  get digits() {
    return this._digits;
  }
  get numberFormatter() {
    return this._numberFormatter;
  }
  get numberFormatOptions() {
    return this._numberFormatOptions;
  }
  /** numberFormatOptions needs to be set before localize/delocalize is called to ensure the options are up to date */
  set numberFormatOptions(options) {
    options.numberingSystem = getSupportedNumberingSystem(options?.numberingSystem);
    options.locale = options?.locale || defaultLocale;
    if (
      // No need to create the formatter if `locale` and `numberingSystem`
      // are the default values and `numberFormatOptions` has not been set
      !this._numberFormatOptions && options.locale === defaultLocale && options.numberingSystem === defaultNumberingSystem && // don't skip initialization if any options besides locale/numberingSystem are set
      Object.keys(options).length === 2 || // cache formatter by only recreating when options change
      JSON.stringify(this._numberFormatOptions) === JSON.stringify(options)
    ) {
      return;
    }
    this._numberFormatOptions = options;
    this._numberFormatter = new Intl.NumberFormat(
      this._numberFormatOptions.locale,
      this._numberFormatOptions
    );
    this._digits = [
      ...new Intl.NumberFormat(this._numberFormatOptions.locale, {
        useGrouping: false,
        numberingSystem: this._numberFormatOptions.numberingSystem
      }).format(9876543210)
    ].reverse();
    const index2 = new Map(this._digits.map((d, i2) => [d, i2]));
    const parts = new Intl.NumberFormat(this._numberFormatOptions.locale, {
      numberingSystem: this._numberFormatOptions.numberingSystem
    }).formatToParts(-123456789e-1);
    this._actualGroup = parts.find((d) => d.type === "group").value;
    this._group = this._actualGroup.trim().length === 0 || this._actualGroup == " " ? " " : this._actualGroup;
    this._decimal = options.locale === "bs" || options.locale === "mk" ? "," : parts.find((d) => d.type === "decimal").value;
    this._minusSign = parts.find((d) => d.type === "minusSign").value;
    this._getDigitIndex = (d) => index2.get(d);
  }
}
const numberStringFormatter = new NumberStringFormat();
const CSS$h = {
  alignmentCenter: "internal-label-alignment--center",
  alignmentEnd: "internal-label-alignment--end",
  container: "internal-label--container",
  requiredIndicator: "internal-label-required--indicator",
  spacingBottom: "internal-label-spacing--bottom",
  spacingInlineEnd: "internal-label-spacing-inline--end",
  spacingInlineStart: "internal-label-spacing-inline--start",
  text: "internal-label--text"
};
const InternalLabel = ({ alignmentCenter, bottomSpacingDisabled, labelText, onClick, required, spacingInlineEnd, spacingInlineStart, tooltipText }) => T`<div class=${safeClassMap({
  [CSS$h.alignmentCenter]: alignmentCenter,
  [CSS$h.alignmentEnd]: !alignmentCenter,
  [CSS$h.container]: true,
  [CSS$h.spacingBottom]: !bottomSpacingDisabled,
  [CSS$h.spacingInlineEnd]: spacingInlineEnd,
  [CSS$h.spacingInlineStart]: spacingInlineStart
})} @click=${onClick}><div class=${safeClassMap(CSS$h.text)}>${labelText}${required && T`<span aria-hidden=true class=${safeClassMap(CSS$h.requiredIndicator)} title=${tooltipText ?? A}>*</span>` || ""}</div><slot name=label-content></slot></div>`;
const CSS$g = {
  validationContainer: "validation-container"
};
const validationReference = () => {
  return;
};
const Validation = ({ scale, status, id, icon, message, ref: ref$1 }) => T`<div class=${safeClassMap(CSS$g.validationContainer)} ${n(ref$1 ? ref$1 : validationReference)}><calcite-input-message aria-live=polite .icon=${icon} id=${id} .scale=${scale} .status=${status}>${message}</calcite-input-message></div>`;
const minMaxStepTypes = ["date", "datetime-local", "month", "number", "range", "time", "week"];
const patternTypes = ["email", "password", "search", "tel", "text", "url"];
const minMaxLengthTypes = ["email", "password", "search", "tel", "text", "textarea", "url"];
function updateConstraintValidation(inputComponent, input, propName, matchesType) {
  const attributeName = propName.toLowerCase();
  const value = inputComponent[propName];
  if (matchesType && value != null) {
    input.setAttribute(attributeName, `${value}`);
  } else {
    input.removeAttribute(attributeName);
  }
}
function syncHiddenFormInput(type, inputComponent, hiddenFormInput) {
  hiddenFormInput.type = type === "textarea" ? "text" : type;
  const isMinMaxStepType = minMaxStepTypes.includes(type);
  const numericInputComponent = inputComponent;
  updateConstraintValidation(numericInputComponent, hiddenFormInput, "min", isMinMaxStepType);
  updateConstraintValidation(numericInputComponent, hiddenFormInput, "max", isMinMaxStepType);
  updateConstraintValidation(numericInputComponent, hiddenFormInput, "step", isMinMaxStepType);
  const isMinMaxLengthType = minMaxLengthTypes.includes(type);
  const textualInputComponent = inputComponent;
  updateConstraintValidation(textualInputComponent, hiddenFormInput, "minLength", isMinMaxLengthType);
  updateConstraintValidation(textualInputComponent, hiddenFormInput, "maxLength", isMinMaxLengthType);
  const isPatternType = patternTypes.includes(type);
  updateConstraintValidation(textualInputComponent, hiddenFormInput, "pattern", isPatternType);
}
const CSS$f = {
  loader: "loader",
  clearButton: "clear-button",
  editingEnabled: "editing-enabled",
  inlineChild: "inline-child",
  inputIcon: "icon",
  prefix: "prefix",
  suffix: "suffix",
  numberButtonWrapper: "number-button-wrapper",
  buttonItemHorizontal: "number-button-item--horizontal",
  wrapper: "element-wrapper",
  inputWrapper: "wrapper",
  actionWrapper: "action-wrapper",
  numberButtonItem: "number-button-item",
  hasSuffix: "has-suffix",
  hasPrefix: "has-prefix"
};
const IDS$2 = {
  validationMessage: "inputValidationMessage"
};
const INPUT_TYPE_ICONS = {
  tel: "phone",
  password: "lock",
  email: "email-address",
  date: "calendar",
  time: "clock",
  search: "search"
};
const SLOTS$9 = {
  action: "action"
};
const DIRECTION = {
  up: "up",
  down: "down"
};
const ICONS$6 = {
  chevronUp: "chevron-up",
  chevronDown: "chevron-down",
  close: "x"
};
const NUDGE_DELAY_IN_MS = 150;
const styles$f = i`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale=s]) input,:host([scale=s]) .prefix,:host([scale=s]) .suffix{block-size:1.5rem;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm)}:host([scale=s]) input{padding-inline:var(--calcite-spacing-sm)}:host([scale=s]) .has-prefix input{padding-inline-start:var(--calcite-spacing-xxs)}:host([scale=s]) .prefix{padding-inline:var(--calcite-spacing-sm) var(--calcite-spacing-xxs)}:host([scale=s]) .has-suffix input{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=s]) .suffix{padding-inline:var(--calcite-spacing-xxs) var(--calcite-spacing-sm)}:host([scale=s]) input[type=file]{min-block-size:1.5rem}:host([scale=s]) .number-button-wrapper,:host([scale=s]) .action-wrapper{block-size:1.5rem}:host([scale=s]) .clear-button{min-block-size:1.5rem;min-inline-size:1.5rem}:host([scale=m]) input,:host([scale=m]) .prefix,:host([scale=m]) .suffix{block-size:2rem;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base)}:host([scale=m]) input{padding-inline:var(--calcite-spacing-md)}:host([scale=m]) .has-prefix input{padding-inline-start:var(--calcite-spacing-xs)}:host([scale=m]) .prefix{padding-inline:var(--calcite-spacing-md) var(--calcite-spacing-xs)}:host([scale=m]) .has-suffix input{padding-inline-end:var(--calcite-spacing-xs)}:host([scale=m]) .suffix{padding-inline:var(--calcite-spacing-xs) var(--calcite-spacing-md)}:host([scale=m]) input[type=file]{min-block-size:2rem}:host([scale=m]) .number-button-wrapper,:host([scale=m]) .action-wrapper{block-size:2rem}:host([scale=m]) .clear-button{min-block-size:2rem;min-inline-size:2rem}:host([scale=l]) input,:host([scale=l]) .prefix,:host([scale=l]) .suffix{block-size:2.75rem;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md)}:host([scale=l]) input{padding-inline:var(--calcite-spacing-lg)}:host([scale=l]) .has-prefix input{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=l]) .prefix{padding-inline:var(--calcite-spacing-lg) var(--calcite-spacing-sm)}:host([scale=l]) .has-suffix input{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=l]) .suffix{padding-inline:var(--calcite-spacing-sm) var(--calcite-spacing-lg)}:host([scale=l]) input[type=file]{min-block-size:2.75rem}:host([scale=l]) .number-button-wrapper,:host([scale=l]) .action-wrapper{block-size:2.75rem}:host([scale=l]) .clear-button{min-block-size:2.75rem;min-inline-size:2.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}input{position:relative;margin:0;box-sizing:border-box;display:flex;max-block-size:100%;inline-size:100%;max-inline-size:100%;flex:1 1 0%;text-overflow:ellipsis;border-width:1px;border-style:solid;font-family:inherit;font-weight:var(--calcite-font-weight-normal);border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-text-color, var(--calcite-color-text-1));transition:var(--calcite-animation-timing),block-size 0,outline-offset 0s;-webkit-appearance:none}input:placeholder-shown{text-overflow:ellipsis}input{border-start-start-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-start-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-end-start-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-end-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}.has-prefix input{border-start-start-radius:0;border-end-start-radius:0}:host(:not([status=invalid])) .has-prefix input{border-inline-start-width:0}:host(:not([status=invalid])) .has-suffix input{border-inline-end-width:0}.has-suffix input,.element-wrapper:has(.clear-button) input,:host([number-button-type=vertical][type=number]) input,:host([number-button-type=horizontal]) .has-suffix .suffix,:host([number-button-type=vertical][type=number]) .has-suffix .suffix,:host([number-button-type=vertical][type=number]) .clear-button,:host([number-button-type=horizontal][type=number]) .clear-button{border-start-end-radius:0;border-end-end-radius:0}:host([number-button-type=horizontal]) input{border-start-start-radius:0;border-start-end-radius:0;border-end-start-radius:0;border-end-end-radius:0}.has-prefix .prefix:first-child,:host([number-button-type=horizontal]) .number-button-item[data-adjustment=down]{border-start-start-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-end-start-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}.has-suffix .suffix,:host([number-button-type=vertical][type=number][read-only]) .has-suffix .suffix,:host([clearable]) .clear-button,:host([number-button-type=horizontal]) .number-button-item[data-adjustment=up]{border-end-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));border-start-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}:host([clearable]) .has-suffix .clear-button{border-end-end-radius:0;border-start-end-radius:0}:host([number-button-type=vertical]) .number-button-item[data-adjustment=down]{border-block-start-width:0px;border-end-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}:host([number-button-type=vertical]) .number-button-item[data-adjustment=up]{border-start-end-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp))}input[type=search]::-webkit-search-decoration{-webkit-appearance:none}input:focus{border-color:var(--calcite-color-brand);color:var(--calcite-input-text-color, var(--calcite-color-text-1))}input[readonly]{font-weight:var(--calcite-font-weight-medium);background-color:var(--calcite-input-background-color, var(--calcite-color-background))}input[readonly]:focus{color:var(--calcite-input-text-color, var(--calcite-color-text-1))}:host([read-only]) .prefix,:host([read-only]) .suffix{background-color:var(--calcite-input-background-color, var(--calcite-color-background))}input{outline-color:transparent}input:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([status=invalid]) input{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) input:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-status-danger);outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host([scale=s]) .icon{inset-inline-start:.5rem}:host([scale=m]) .icon{inset-inline-start:.75rem}:host([scale=l]) .icon{inset-inline-start:1rem}:host([icon][scale=s]) input{padding-inline-start:2rem}:host([icon][scale=m]) input{padding-inline-start:2.5rem}:host([icon][scale=l]) input{padding-inline-start:3.5rem}.element-wrapper{position:relative;order:3;display:inline-flex;flex:1 1 0%;align-items:center;isolation:isolate}.icon{pointer-events:none;position:absolute;display:block;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;color:var(--calcite-input-icon-color, var(--calcite-color-text-3));z-index:var(--calcite-z-index)}input[type=text]::-ms-clear,input[type=text]::-ms-reveal{display:none;block-size:0px;inline-size:0px}input[type=search]::-webkit-search-decoration,input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-results-button,input[type=search]::-webkit-search-results-decoration,input[type=date]::-webkit-clear-button,input[type=time]::-webkit-clear-button{display:none}.clear-button{pointer-events:initial;order:4;margin:0;box-sizing:border-box;display:flex;min-block-size:100%;cursor:pointer;align-items:center;justify-content:center;align-self:stretch;border-width:1px;border-style:solid;outline-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-actions-background-color, var(--calcite-color-foreground-1));border-inline-start-width:0px}.clear-button calcite-icon{transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;color:var(--calcite-input-actions-icon-color, var(--calcite-color-text-3))}.clear-button:hover{background-color:var(--calcite-input-actions-background-color-hover, var(--calcite-color-foreground-2))}.clear-button:hover calcite-icon{color:var(--calcite-input-actions-icon-color-hover, var(--calcite-color-text-1))}.clear-button:active{background-color:var(--calcite-input-actions-background-color-press, var(--calcite-color-foreground-3))}.clear-button:active calcite-icon{color:var(--calcite-input-actions-icon-color-press, var(--calcite-color-text-1))}.clear-button:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.clear-button:disabled{opacity:var(--calcite-opacity-disabled)}.has-suffix .clear-button{border-inline-end-width:0}.loader{inset-block-start:1px;inset-inline:1px;pointer-events:none;position:absolute;display:block;--calcite-progress-background-color: var(--calcite-input-loading-background-color);--calcite-progress-fill-color: var(--calcite-input-loading-fill-color)}.action-wrapper{order:7;display:flex}.prefix,.suffix{box-sizing:border-box;display:flex;block-size:auto;min-block-size:100%;-webkit-user-select:none;user-select:none;align-content:center;align-items:center;overflow-wrap:break-word;border-width:1px;border-style:solid;line-height:1;font-weight:var(--calcite-font-weight-regular);border-color:var(--calcite-input-border-color, var(--calcite-color-border-input))}.prefix{order:2;border-inline-end-width:0px;inline-size:var(--calcite-input-prefix-size, auto);background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-prefix-text-color, var(--calcite-color-text-2))}.suffix{order:5;border-inline-start-width:0px;inline-size:var(--calcite-input-suffix-size, auto);background-color:var(--calcite-input-background-color, var(--calcite-color-foreground-1));color:var(--calcite-input-suffix-text-color, var(--calcite-color-text-2))}:host([alignment=start]) input{text-align:start}:host([alignment=end]) input{text-align:end}input[type=number]{-moz-appearance:textfield}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;-moz-appearance:textfield;margin:0}.number-button-wrapper{pointer-events:none;order:6;box-sizing:border-box;display:flex;flex-direction:column;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}:host([number-button-type=vertical]) .wrapper{flex-direction:row;display:flex}:host([number-button-type=vertical]) input{order:2}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=down] calcite-icon{transform:rotate(-90deg)}:host([number-button-type=horizontal]) .calcite--rtl .number-button-item[data-adjustment=up] calcite-icon{transform:rotate(-90deg)}.number-button-item.number-button-item--horizontal{border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));order:1;max-block-size:100%;min-block-size:100%;align-self:stretch;border-width:1px;border-style:solid}.number-button-item.number-button-item--horizontal[data-adjustment=down] calcite-icon,.number-button-item.number-button-item--horizontal[data-adjustment=up] calcite-icon{transform:rotate(90deg)}.number-button-item.number-button-item--horizontal[data-adjustment=down]{border-inline-end-width:0px}.number-button-item.number-button-item--horizontal[data-adjustment=up]{border-inline-start-width:0px;order:5}.number-button-item{max-block-size:50%;min-block-size:50%;pointer-events:initial;margin:0;box-sizing:border-box;display:flex;cursor:pointer;align-items:center;align-self:center;border-width:1px;border-style:solid;background-color:var(--calcite-color-foreground-1);padding-block:0px;padding-inline:.5rem;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));background-color:var(--calcite-input-actions-background-color, var(--calcite-color-foreground-1));border-inline-start-width:0px}.number-button-item calcite-icon{pointer-events:none;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;color:var(--calcite-input-actions-icon-color, var(--calcite-color-text-3))}.number-button-item:hover{background-color:var(--calcite-input-actions-background-color-hover, var(--calcite-color-foreground-2))}.number-button-item:hover calcite-icon{color:var(--calcite-input-actions-icon-color-hover, var(--calcite-color-text-1))}.number-button-item:active{background-color:var(--calcite-input-actions-background-color-press, var(--calcite-color-foreground-3))}.number-button-item:active calcite-icon{color:var(--calcite-input-actions-icon-color-press, var(--calcite-color-text-1))}.number-button-item:disabled{pointer-events:none}.wrapper{position:relative;display:flex;flex-direction:row;align-items:center;border-radius:var(--calcite-input-corner-radius, var(--calcite-corner-radius-sharp));box-shadow:var(--calcite-input-shadow, var(--calcite-shadow-none))}input[type=date]::-webkit-input-placeholder{visibility:hidden!important}:host([type=color]) input{padding:.25rem}:host([type=file]) input{cursor:pointer;border-width:1px;border-style:dashed;background-color:var(--calcite-color-foreground-1);text-align:center;border-color:var(--calcite-input-border-color, var(--calcite-color-border-input));block-size:initial}:host([type=file][scale=s]) input{padding-block:1px;padding-inline:.5rem}:host([type=file][scale=m]) input{padding-block:.25rem;padding-inline:.75rem}:host([type=file][scale=l]) input{padding-block:.5rem;padding-inline:1rem}:host(.no-bottom-border) input{border-block-end-width:0px}:host(.border-top-color-one) input{border-block-start-color:var(--calcite-color-border-1)}input.inline-child{background-color:transparent;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out}input.inline-child .editing-enabled{background-color:inherit}input.inline-child:not(.editing-enabled){display:flex;cursor:pointer;text-overflow:ellipsis;border-color:transparent;padding-inline-start:0}:host([type=datetime-local]) .element-wrapper{inline-size:100%}:host([type=datetime-local]) .element-wrapper input{display:inline-block;min-inline-size:0}.internal-label-alignment--center{align-items:center}.internal-label-alignment--end{align-items:end}.internal-label--container{display:flex;justify-content:space-between;color:var(--calcite-color-text-1)}.internal-label-required--indicator{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-status-danger);padding-inline:var(--calcite-spacing-base)}.internal-label-required--indicator:hover{cursor:help}.internal-label--text{line-height:1}:host([scale=s]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-xxs)}:host([scale=s]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=s]) .internal-label--text{font-size:var(--calcite-font-size--2)}:host([scale=m]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .internal-label--text{font-size:var(--calcite-font-size--1)}:host([scale=l]) .internal-label-spacing--bottom{margin-block-end:var(--calcite-spacing-sm)}:host([scale=l]) .internal-label-spacing-inline--end{margin-inline-end:var(--calcite-spacing-md)}:host([scale=l]) .internal-label-spacing-inline--start{margin-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .internal-label--text{font-size:var(--calcite-font-size-0)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:.5rem}:host([scale=s]) .validation-container{padding-block-start:.25rem}::slotted(input[slot=hidden-form-input]){margin:0!important;opacity:0!important;outline:none!important;padding:0!important;position:absolute!important;inset:0!important;transform:none!important;-webkit-appearance:none!important;z-index:-1!important}:host([hidden]){display:none}[hidden]{display:none}::placeholder{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-input-placeholder-text-color, var(--calcite-color-text-3))}`;
const _Input = class _Input extends LitElement {
  constructor() {
    super();
    this.actionWrapperRef = e();
    this.attributeWatch = useWatchAttributes(["autofocus", "enterkeyhint", "inputmode", "spellcheck"], this.handleGlobalAttributesChanged);
    this.childRef = e();
    this.childNumberRef = e();
    this.inputWrapperRef = e();
    this.onHiddenFormInputInput = (event) => {
      if (event.target.name === this.name) {
        this.setValue({
          value: event.target.value,
          origin: "direct"
        });
      }
      this.setFocus();
      event.stopPropagation();
    };
    this.previousValueOrigin = "initial";
    this.userChangedValue = false;
    this._value = "";
    this.messages = useT9n();
    this.focusSetter = useSetFocus()(this);
    this.interactiveContainer = useInteractive(this);
    this.slottedActionElDisabledInternally = false;
    this.alignment = "start";
    this.clearable = false;
    this.disabled = false;
    this.editingEnabled = false;
    this.groupSeparator = false;
    this.iconFlipRtl = false;
    this.loading = false;
    this.localeFormat = false;
    this.multiple = false;
    this.numberButtonType = "vertical";
    this.readOnly = false;
    this.required = false;
    this.scale = "m";
    this.status = "idle";
    this.type = "text";
    this.validity = {
      valid: false,
      badInput: false,
      customError: false,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valueMissing: false
    };
    this.calciteInputChange = createEvent({ cancelable: false });
    this.calciteInputInput = createEvent();
    this.calciteInternalInputBlur = createEvent({ cancelable: false });
    this.calciteInternalInputFocus = createEvent({ cancelable: false });
    this.listen("click", this.clickHandler);
    this.listen("keydown", this.keyDownHandler);
  }
  get isClearable() {
    return (this.clearable || this.type === "search") && this.value?.length > 0;
  }
  get value() {
    return this._value;
  }
  set value(value) {
    const oldValue = this._value;
    if (value !== oldValue) {
      this._value = value;
      this.valueWatcher(value, oldValue);
      if (value && this._value === "") {
        this.setValue({
          origin: "reset",
          value: oldValue
        });
      }
    }
  }
  async selectText() {
    const selectTarget = this.type === "number" ? this.childNumberRef : this.childRef;
    selectTarget.value?.select();
  }
  async setFocus(options) {
    return this.focusSetter(() => this.type === "number" ? this.childNumberRef.value : this.childRef.value, options);
  }
  connectedCallback() {
    super.connectedCallback();
    this.inlineEditableEl = this.el.closest("calcite-inline-editable");
    if (this.inlineEditableEl) {
      this.editingEnabled = this.inlineEditableEl.editingEnabled || false;
    }
    connectLabel(this);
    connectForm(this);
    this.el.addEventListener(internalHiddenInputInputEvent, this.onHiddenFormInputInput);
  }
  async load() {
    this.maxString = this.max?.toString();
    this.minString = this.min?.toString();
    this.requestedIcon = setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
    this.setPreviousEmittedValue(this.value);
    this.setPreviousValue(this.value);
    if (this.type === "number") {
      if (this.value === "Infinity" || this.value === "-Infinity") {
        this.displayedValue = this.value;
        this.previousEmittedValue = this.value;
      } else {
        this.warnAboutInvalidNumberValue(this.value);
        this.setValue({
          origin: "connected",
          value: isValidNumber(this.value) ? this.value : ""
        });
      }
    }
  }
  willUpdate(changes) {
    if (changes.has("max")) {
      this.maxString = this.max?.toString() || null;
    }
    if (changes.has("min")) {
      this.minString = this.min?.toString() || null;
    }
    if (changes.has("icon") || changes.has("type") && (this.hasUpdated || this.type !== "text")) {
      this.requestedIcon = setRequestedIcon(INPUT_TYPE_ICONS, this.icon, this.type);
    }
    if (changes.has("readOnly")) {
      this.stopNudging();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    disconnectLabel(this);
    disconnectForm(this);
    this.stopNudging();
    this.el.removeEventListener(internalHiddenInputInputEvent, this.onHiddenFormInputInput);
  }
  stopNudging() {
    window.clearInterval(this.nudgeNumberValueIntervalId);
  }
  handleGlobalAttributesChanged() {
    this.requestUpdate();
  }
  valueWatcher(newValue, previousValue) {
    if (!this.userChangedValue) {
      if (this.type === "number" && (newValue === "Infinity" || newValue === "-Infinity")) {
        this.displayedValue = newValue;
        this.previousEmittedValue = newValue;
        return;
      }
      this.setValue({
        origin: "direct",
        previousValue,
        value: newValue == null || newValue == "" ? "" : this.type === "number" ? isValidNumber(newValue) ? newValue : this.previousValue || "" : newValue
      });
      this.warnAboutInvalidNumberValue(newValue);
    }
    this.userChangedValue = false;
  }
  keyDownHandler(event) {
    if (this.readOnly || this.disabled || event.defaultPrevented) {
      return;
    }
    if (this.isClearable && event.key === "Escape") {
      this.clearInputValue(event);
      event.preventDefault();
    }
    if (event.key === "Enter") {
      if (submitForm(this)) {
        event.preventDefault();
      }
    }
  }
  onLabelClick() {
    this.setFocus();
  }
  incrementOrDecrementNumberValue(direction, inputMax, inputMin, nativeEvent) {
    const { value } = this;
    if (value === "Infinity" || value === "-Infinity") {
      return;
    }
    const adjustment = direction === "up" ? 1 : -1;
    const inputStep = this.step === "any" ? 1 : Math.abs(this.step || 1);
    const inputVal = new BigDecimal(value !== "" ? value : "0");
    const nudgedValue = inputVal.add(`${inputStep * adjustment}`);
    const nudgedValueBelowInputMin = () => typeof inputMin === "number" && !isNaN(inputMin) && nudgedValue.subtract(`${inputMin}`).isNegative;
    const nudgedValueAboveInputMax = () => typeof inputMax === "number" && !isNaN(inputMax) && !nudgedValue.subtract(`${inputMax}`).isNegative;
    const finalValue = nudgedValueBelowInputMin() ? `${inputMin}` : nudgedValueAboveInputMax() ? `${inputMax}` : nudgedValue.toString();
    this.setValue({
      committing: true,
      nativeEvent,
      origin: "user",
      value: finalValue
    });
  }
  clearInputValue(nativeEvent) {
    this.setValue({
      committing: true,
      nativeEvent,
      origin: "user",
      value: ""
    });
  }
  emitChangeIfUserModified() {
    if (this.previousValueOrigin === "user" && this.value !== this.previousEmittedValue) {
      this.calciteInputChange.emit();
      this.setPreviousEmittedValue(this.value);
    }
  }
  inputBlurHandler() {
    this.stopNudging();
    this.calciteInternalInputBlur.emit();
    this.emitChangeIfUserModified();
  }
  clickHandler(event) {
    if (this.disabled) {
      return;
    }
    const composedPath = event.composedPath();
    if (!composedPath.includes(this.inputWrapperRef.value) || composedPath.includes(this.actionWrapperRef.value)) {
      return;
    }
    this.setFocus();
  }
  inputFocusHandler() {
    this.calciteInternalInputFocus.emit();
  }
  inputInputHandler(nativeEvent) {
    if (this.disabled || this.readOnly) {
      return;
    }
    if (this.type === "file") {
      this.files = this.childRef.value.files;
    }
    this.setValue({
      nativeEvent,
      origin: "user",
      value: nativeEvent.target.value
    });
  }
  inputKeyDownHandler(event) {
    if (this.disabled || this.readOnly) {
      return;
    }
    if (event.key === "Enter") {
      this.emitChangeIfUserModified();
    }
  }
  inputNumberInputHandler(nativeEvent) {
    if (this.disabled || this.readOnly) {
      return;
    }
    if (this.value === "Infinity" || this.value === "-Infinity") {
      return;
    }
    const value = nativeEvent.target.value;
    numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    };
    const delocalizedValue = numberStringFormatter.delocalize(value);
    if (nativeEvent.inputType === "insertFromPaste") {
      if (!isValidNumber(delocalizedValue)) {
        nativeEvent.preventDefault();
      }
      this.setValue({
        nativeEvent,
        origin: "user",
        value: parseNumberString(delocalizedValue)
      });
      this.childNumberRef.value.value = this.displayedValue;
    } else {
      this.setValue({
        nativeEvent,
        origin: "user",
        value: delocalizedValue
      });
    }
  }
  inputNumberKeyDownHandler(event) {
    if (this.type !== "number" || this.disabled || this.readOnly) {
      return;
    }
    if (this.value === "Infinity" || this.value === "-Infinity") {
      event.preventDefault();
      if (event.key === "Backspace" || event.key === "Delete") {
        this.clearInputValue(event);
      }
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      this.nudgeNumberValue("up", event);
      return;
    }
    if (event.key === "ArrowDown") {
      this.nudgeNumberValue("down", event);
      return;
    }
    const supportedKeys = [
      ...numberKeys,
      "ArrowLeft",
      "ArrowRight",
      "Backspace",
      "Delete",
      "Enter",
      "Escape",
      "Tab"
    ];
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }
    const isShiftTabEvent = event.shiftKey && event.key === "Tab";
    if (supportedKeys.includes(event.key) || isShiftTabEvent) {
      if (event.key === "Enter") {
        this.emitChangeIfUserModified();
      }
      return;
    }
    numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    };
    if (event.key === numberStringFormatter.decimal) {
      if (!this.value && !this.childNumberRef.value.value) {
        return;
      }
      if (this.value && this.childNumberRef.value.value.indexOf(numberStringFormatter.decimal) === -1) {
        return;
      }
    }
    if (/[eE]/.test(event.key)) {
      if (!this.value && !this.childNumberRef.value.value) {
        return;
      }
      if (this.value && !/[eE]/.test(this.childNumberRef.value.value)) {
        return;
      }
    }
    if (event.key === "-") {
      if (!this.value && !this.childNumberRef.value.value) {
        return;
      }
      if (this.value && this.childNumberRef.value.value.split("-").length <= 2) {
        return;
      }
    }
    event.preventDefault();
  }
  nudgeNumberValue(direction, nativeEvent) {
    if (nativeEvent instanceof KeyboardEvent && nativeEvent.repeat || this.type !== "number") {
      return;
    }
    const inputMax = this.maxString ? parseFloat(this.maxString) : null;
    const inputMin = this.minString ? parseFloat(this.minString) : null;
    this.incrementOrDecrementNumberValue(direction, inputMax, inputMin, nativeEvent);
    if (this.nudgeNumberValueIntervalId) {
      this.stopNudging();
    }
    let firstValueNudge = true;
    this.nudgeNumberValueIntervalId = window.setInterval(() => {
      if (firstValueNudge) {
        firstValueNudge = false;
        return;
      }
      this.incrementOrDecrementNumberValue(direction, inputMax, inputMin, nativeEvent);
    }, NUDGE_DELAY_IN_MS);
  }
  numberButtonPointerUpAndOutHandler() {
    this.stopNudging();
  }
  numberButtonPointerDownHandler(event) {
    if (!isPrimaryPointerButton(event)) {
      return;
    }
    event.preventDefault();
    const direction = event.target.dataset.adjustment;
    if (!this.disabled) {
      this.nudgeNumberValue(direction, event);
    }
  }
  syncHiddenFormInput(input) {
    syncHiddenFormInput(this.type, this, input);
  }
  setInputValue(newInputValue) {
    const target = this.type === "number" ? this.childNumberRef : this.childRef;
    if (target.value) {
      target.value.value = newInputValue;
    }
  }
  setPreviousEmittedValue(value) {
    this.previousEmittedValue = this.normalizeValue(value);
  }
  normalizeValue(value) {
    return this.type === "number" ? isValidNumber(value) ? value : "" : value;
  }
  setPreviousValue(value) {
    this.previousValue = this.normalizeValue(value);
  }
  setValue({ committing = false, nativeEvent, origin, previousValue, value }) {
    this.setPreviousValue(previousValue ?? this.value);
    this.previousValueOrigin = origin;
    if (this.type === "number") {
      numberStringFormatter.numberFormatOptions = {
        locale: this.messages._lang,
        numberingSystem: this.numberingSystem,
        useGrouping: this.groupSeparator,
        signDisplay: "never"
      };
      const isValueDeleted = this.previousValue?.length > value.length || this.value?.length > value.length;
      const hasTrailingDecimalSeparator = value.charAt(value.length - 1) === ".";
      const sanitizedValue = hasTrailingDecimalSeparator && isValueDeleted ? value : sanitizeNumberString(value);
      const newValue = value && !sanitizedValue ? isValidNumber(this.previousValue) ? this.previousValue : "" : sanitizedValue;
      let newLocalizedValue = numberStringFormatter.localize(newValue);
      if (origin !== "connected" && !hasTrailingDecimalSeparator) {
        newLocalizedValue = addLocalizedTrailingDecimalZeros(newLocalizedValue, newValue, numberStringFormatter);
      }
      this.displayedValue = hasTrailingDecimalSeparator && isValueDeleted ? `${newLocalizedValue}${numberStringFormatter.decimal}` : newLocalizedValue;
      this.userChangedValue = origin === "user" && this.value !== newValue;
      this.value = ["-", "."].includes(newValue) ? "" : newValue;
    } else {
      this.userChangedValue = origin === "user" && this.value !== value;
      this.value = value;
    }
    if (origin === "direct") {
      this.setInputValue(value);
      this.previousEmittedValue = value;
    }
    if (nativeEvent) {
      const calciteInputInputEvent = this.calciteInputInput.emit();
      if (calciteInputInputEvent.defaultPrevented) {
        this.value = this.previousValue;
        this.displayedValue = this.type === "number" ? numberStringFormatter.localize(this.previousValue) : this.previousValue;
      } else if (committing) {
        this.emitChangeIfUserModified();
      }
    }
  }
  inputKeyUpHandler() {
    this.stopNudging();
  }
  warnAboutInvalidNumberValue(value) {
    if (this.type === "number" && value && !isValidNumber(value)) {
      console.warn(`The specified value "${value}" cannot be parsed, or is out of range.`);
    }
  }
  render() {
    const dir = getElementDir(this.el);
    const loader = T`<div class=${safeClassMap(CSS$f.loader)}><calcite-progress .label=${this.messages.loading} type=indeterminate></calcite-progress></div>`;
    const inputClearButton = T`<button .ariaLabel=${this.messages.clear} class=${safeClassMap(CSS$f.clearButton)} .disabled=${this.disabled || this.readOnly} @click=${this.clearInputValue} tabindex=-1 title=${this.messages.clear ?? A} type=button><calcite-icon .icon=${ICONS$6.close} .scale=${getIconScale(this.scale)}></calcite-icon></button>`;
    const iconEl = T`<calcite-icon class=${safeClassMap(CSS$f.inputIcon)} .flipRtl=${this.iconFlipRtl} .icon=${this.requestedIcon} .scale=${getIconScale(this.scale)}></calcite-icon>`;
    const isHorizontalNumberButton = this.numberButtonType === "horizontal";
    const numberButtonsHorizontalUp = T`<button aria-hidden=true class=${safeClassMap({
      [CSS$f.numberButtonItem]: true,
      [CSS$f.buttonItemHorizontal]: isHorizontalNumberButton
    })} data-adjustment=${DIRECTION.up} data-testid=number-button-up .disabled=${this.disabled || this.readOnly} @pointerdown=${this.numberButtonPointerDownHandler} @pointerout=${this.numberButtonPointerUpAndOutHandler} @pointerup=${this.numberButtonPointerUpAndOutHandler} tabindex=-1 type=button><calcite-icon .icon=${ICONS$6.chevronUp} .scale=${getIconScale(this.scale)}></calcite-icon></button>`;
    const numberButtonsHorizontalDown = T`<button aria-hidden=true class=${safeClassMap({
      [CSS$f.numberButtonItem]: true,
      [CSS$f.buttonItemHorizontal]: isHorizontalNumberButton
    })} data-adjustment=${DIRECTION.down} data-testid=number-button-down .disabled=${this.disabled || this.readOnly} @pointerdown=${this.numberButtonPointerDownHandler} @pointerout=${this.numberButtonPointerUpAndOutHandler} @pointerup=${this.numberButtonPointerUpAndOutHandler} tabindex=-1 type=button><calcite-icon .icon=${ICONS$6.chevronDown} .scale=${getIconScale(this.scale)}></calcite-icon></button>`;
    const numberButtonsVertical = T`<div class=${safeClassMap(CSS$f.numberButtonWrapper)}>${numberButtonsHorizontalUp}${numberButtonsHorizontalDown}</div>`;
    const prefixText = T`<div class=${safeClassMap(CSS$f.prefix)}>${this.prefixText}</div>`;
    const suffixText = T`<div class=${safeClassMap(CSS$f.suffix)}>${this.suffixText}</div>`;
    const autofocus = this.el.autofocus;
    const enterKeyHint = this.el.enterKeyHint;
    const inputMode = this.el.inputMode;
    const localeNumberInput = this.type === "number" ? i$2("localized-input", T`<input accept=${this.accept ?? A} aria-errormessage=${IDS$2.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${getLabelText(this)} autocomplete=${this.autocomplete ?? A} .autofocus=${autofocus} value=${this.defaultValue ?? A} .disabled=${this.disabled ? true : null} enterkeyhint=${enterKeyHint ?? A} inputmode=${inputMode ?? A} maxlength=${this.maxLength ?? A} minlength=${this.minLength ?? A} .multiple=${this.multiple} name=${A} @blur=${this.inputBlurHandler} @focus=${this.inputFocusHandler} @input=${this.inputNumberInputHandler} @keydown=${this.inputNumberKeyDownHandler} @keyup=${this.inputKeyUpHandler} pattern=${this.pattern ?? A} placeholder=${(this.placeholder || "") ?? A} .readOnly=${this.readOnly} .required=${this.required} type=text .value=${l(this.displayedValue ?? "")} ${n(this.childNumberRef)}>`) : null;
    const childEl = this.type !== "number" ? T`<input accept=${this.accept ?? A} aria-errormessage=${IDS$2.validationMessage} .ariaInvalid=${this.status === "invalid"} .ariaLabel=${getLabelText(this)} autocomplete=${this.autocomplete ?? A} .autofocus=${autofocus} class=${safeClassMap({
      [CSS$f.editingEnabled]: this.editingEnabled,
      [CSS$f.inlineChild]: !!this.inlineEditableEl
    })} value=${this.defaultValue ?? A} .disabled=${this.disabled ? true : null} enterkeyhint=${enterKeyHint ?? A} inputmode=${inputMode ?? A} max=${this.maxString ?? A} maxlength=${this.maxLength ?? A} min=${this.minString ?? A} minlength=${this.minLength ?? A} .multiple=${this.multiple} name=${this.name ?? A} @blur=${this.inputBlurHandler} @focus=${this.inputFocusHandler} @input=${this.inputInputHandler} @keydown=${this.inputKeyDownHandler} @keyup=${this.inputKeyUpHandler} pattern=${this.pattern ?? A} placeholder=${(this.placeholder || "") ?? A} .readOnly=${this.readOnly} .required=${this.required ? true : null} spellcheck=${this.el.spellcheck ?? A} step=${this.step ?? A} tabindex=${(this.disabled || this.inlineEditableEl && !this.editingEnabled ? -1 : null) ?? A} type=${this.type ?? A} .value=${l(this.value ?? "")} ${n(
      this.childRef
      /* using unknown to workaround Lumina dynamic ref type issue */
    )}>` : null;
    return this.interactiveContainer({ disabled: this.disabled, children: T`${this.labelText && InternalLabel({ labelText: this.labelText, onClick: this.onLabelClick, required: this.required, tooltipText: this.messages.required }) || ""}<div class=${safeClassMap({
      [CSS$f.inputWrapper]: true,
      [CSS_UTILITY.rtl]: dir === "rtl",
      [CSS$f.hasSuffix]: this.suffixText,
      [CSS$f.hasPrefix]: this.prefixText
    })} ${n(this.inputWrapperRef)}>${this.type === "number" && this.numberButtonType === "horizontal" && !this.readOnly ? numberButtonsHorizontalDown : null}${this.prefixText ? prefixText : null}<div class=${safeClassMap(CSS$f.wrapper)}>${localeNumberInput}${childEl}${this.isClearable ? inputClearButton : null}${this.requestedIcon ? iconEl : null}${this.loading ? loader : null}</div><div class=${safeClassMap(CSS$f.actionWrapper)} ${n(this.actionWrapperRef)}><slot name=${SLOTS$9.action}></slot></div>${this.type === "number" && this.numberButtonType === "vertical" && !this.readOnly ? numberButtonsVertical : null}${this.suffixText ? suffixText : null}${this.type === "number" && this.numberButtonType === "horizontal" && !this.readOnly ? numberButtonsHorizontalUp : null}${HiddenFormInputSlot({ component: this })}</div>${this.validationMessage && this.status === "invalid" ? Validation({ icon: this.validationIcon, id: IDS$2.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status }) : null}` });
  }
};
_Input.properties = { displayedValue: [16, {}, { state: true }], slottedActionElDisabledInternally: [16, {}, { state: true }], accept: 1, alignment: [3, {}, { reflect: true }], autocomplete: 1, clearable: [7, {}, { reflect: true, type: Boolean }], disabled: [7, {}, { reflect: true, type: Boolean }], editingEnabled: [7, {}, { reflect: true, type: Boolean }], files: [0, {}, { attribute: false }], form: [3, {}, { reflect: true }], groupSeparator: [7, {}, { reflect: true, type: Boolean }], icon: [3, { converter: stringOrBoolean, type: String }, { reflect: true }], iconFlipRtl: [7, {}, { reflect: true, type: Boolean }], label: 1, labelText: 1, loading: [7, {}, { reflect: true, type: Boolean }], localeFormat: [5, {}, { type: Boolean }], max: [11, {}, { reflect: true, type: Number }], maxLength: [11, {}, { reflect: true, type: Number }], messageOverrides: [0, {}, { attribute: false }], min: [11, {}, { reflect: true, type: Number }], minLength: [11, {}, { reflect: true, type: Number }], multiple: [5, {}, { type: Boolean }], name: [3, {}, { reflect: true }], numberButtonType: [3, {}, { reflect: true }], numberingSystem: [3, {}, { reflect: true }], pattern: 1, placeholder: 1, prefixText: 1, readOnly: [7, {}, { reflect: true, type: Boolean }], required: [7, {}, { reflect: true, type: Boolean }], scale: [3, {}, { reflect: true }], status: [3, {}, { reflect: true }], step: [3, {}, { reflect: true }], suffixText: 1, type: [3, {}, { reflect: true }], validationIcon: [3, { converter: stringOrBoolean, type: String }, { reflect: true }], validationMessage: 1, validity: [0, {}, { attribute: false }], value: 1 };
_Input.styles = styles$f;
let Input = _Input;
customElement("calcite-input", Input);
const index$e = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Input
});
const CSS$e = {
  container: "container"
};
const styles$e = i`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}:host([alignment=start]){text-align:start}:host([alignment=end]){text-align:end}:host([alignment=center]){text-align:center}:host([scale=s]) .container{gap:.25rem;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm);margin-block-end:var(--calcite-label-margin-bottom, .5rem)}:host([scale=m]) .container{gap:.5rem;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base);margin-block-end:var(--calcite-label-margin-bottom, .75rem)}:host([scale=l]) .container{gap:.5rem;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md);margin-block-end:var(--calcite-label-margin-bottom, 1rem)}:host .container{margin-inline:0px;margin-block-start:0px;inline-size:100%;line-height:1.375;color:var(--calcite-color-text-1);color:var(--calcite-label-text-color, var(--calcite-color-text-1))}:host([layout=block]) .container,:host([layout=default]) .container{display:flex;flex-direction:column}:host([layout=inline]) .container,:host([layout=inline-space-between]) .container{display:flex;flex-direction:row;align-items:center;gap:.5rem}:host([layout=inline][scale=l]) .container{gap:.75rem}:host([layout=inline-space-between]) .container{justify-content:space-between}:host([disabled])>.container{opacity:var(--calcite-opacity-disabled)}:host([disabled]) ::slotted(*[disabled]),:host([disabled]) ::slotted(*[disabled] *){--tw-bg-opacity: 1}:host([disabled]) ::slotted(calcite-input-message:not([active])){--tw-bg-opacity: 0}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
const _Label = class _Label extends LitElement {
  constructor() {
    super();
    this.alignment = "start";
    this.layout = "default";
    this.scale = "m";
    this.calciteInternalLabelClick = createEvent({ bubbles: false, cancelable: false });
    this.listen("click", this.labelClickHandler);
  }
  connectedCallback() {
    super.connectedCallback();
    document.dispatchEvent(new CustomEvent(labelConnectedEvent));
  }
  willUpdate(changes) {
    if (changes.has("for")) {
      associateExplicitLabelToUnlabeledComponent(this.el);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.dispatchEvent(new CustomEvent(labelDisconnectedEvent));
  }
  labelClickHandler(event) {
    if (window.getSelection()?.type === "Range") {
      return;
    }
    this.calciteInternalLabelClick.emit({
      sourceEvent: event
    });
  }
  render() {
    return T`<div class=${safeClassMap(CSS$e.container)}><slot></slot></div>`;
  }
};
_Label.properties = { alignment: [3, {}, { reflect: true }], for: [3, {}, { reflect: true }], layout: [3, {}, { reflect: true }], scale: [3, {}, { reflect: true }] };
_Label.styles = styles$e;
let Label = _Label;
customElement("calcite-label", Label);
const index$d = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Label
});
const KindIcons = {
  brand: "lightbulb"
};
const KindIconsFilled = {
  danger: "exclamationMarkTriangleF",
  info: "informationF",
  success: "checkCircleF",
  warning: "exclamationMarkTriangleF"
};
const SLOTS$8 = {
  title: "title",
  message: "message",
  link: "link",
  actionsEnd: "actions-end"
};
const CSS$d = {
  actionsEnd: "actions-end",
  close: "notice-close",
  container: "container",
  content: "notice-content",
  icon: "notice-icon"
};
const styles$d = i`:host([scale=s]){--calcite-notice-spacing-token-small: .5rem;--calcite-notice-spacing-token-large: .75rem}:host([scale=s]) .container slot[name=title]::slotted(*),:host([scale=s]) .container *::slotted([slot=title]){font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=s]) .container slot[name=message]::slotted(*),:host([scale=s]) .container *::slotted([slot=message]){font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=s]) ::slotted(calcite-link){font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=m]){--calcite-notice-spacing-token-small: .75rem;--calcite-notice-spacing-token-large: 1rem}:host([scale=m]) .container slot[name=title]::slotted(*),:host([scale=m]) .container *::slotted([slot=title]){font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=m]) .container slot[name=message]::slotted(*),:host([scale=m]) .container *::slotted([slot=message]){font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=m]) ::slotted(calcite-link){font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=l]){--calcite-notice-spacing-token-small: 1rem;--calcite-notice-spacing-token-large: 1.25rem}:host([scale=l]) .container slot[name=title]::slotted(*),:host([scale=l]) .container *::slotted([slot=title]){font-size:var(--calcite-font-size-relative-lg);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=l]) .container slot[name=message]::slotted(*),:host([scale=l]) .container *::slotted([slot=message]){font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=l]) ::slotted(calcite-link){font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-relative-snug)}:host([scale=l]) .notice-close{margin-inline-end:var(--calcite-spacing-sm)}:host([scale=l]) .actions-end{margin-inline-end:var(--calcite-spacing-sm);gap:var(--calcite-spacing-sm)}:host([width=auto]){--calcite-notice-width: auto}:host([width=half]){--calcite-notice-width: 50%}:host([width=full]){--calcite-notice-width: 100%}:host{margin-inline:auto;display:none;max-inline-size:100%;align-items:center;inline-size:var(--calcite-notice-width)}.container{pointer-events:none;margin-block:0px;box-sizing:border-box;display:flex;inline-size:100%;opacity:0;overflow:hidden;max-block-size:0;transition-property:opacity,max-block-size;transition-duration:var(--calcite-animation-timing);text-align:start;border-radius:var(--calcite-notice-corner-radius, var(--calcite-corner-radius-sm));box-shadow:var(--calcite-notice-shadow, var(--calcite-shadow-none))}:host{display:flex}:host([open]) .container{pointer-events:auto;max-block-size:100%;align-items:center;opacity:1;overflow:visible}:host([open][appearance=outline-fill]) .container{border:var(--calcite-border-width-sm) solid}.container slot[name=title]::slotted(*),.container *::slotted([slot=title]){margin:0;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-notice-title-text-color, var(--calcite-color-text-1))}.container slot[name=message]::slotted(*),.container *::slotted([slot=message]){margin:0;display:inline;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-notice-content-text-color, var(--calcite-color-text-2))}:host(:not([kind=neutral])[appearance=solid]) .container slot[name=title]::slotted(*),:host(:not([kind=neutral])[appearance=solid]) .container *::slotted([slot=title]){color:var(--calcite-notice-title-text-color, var(--calcite-color-text-inverse))}:host(:not([kind=neutral])[appearance=solid]) .container slot[name=message]::slotted(*),:host(:not([kind=neutral])[appearance=solid]) .container *::slotted([slot=message]){color:var(--calcite-notice-content-text-color, var(--calcite-color-text-inverse))}.notice-content{box-sizing:border-box;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;padding-inline:var(--calcite-notice-spacing-token-large);flex:0 0 auto;display:flex;min-inline-size:0px;flex-direction:column;overflow-wrap:break-word;flex:1 1 0;padding-block:var(--calcite-notice-spacing-token-small);padding-inline:0 var(--calcite-notice-spacing-token-large)}.notice-content:first-of-type:not(:only-child){padding-inline-start:var(--calcite-notice-spacing-token-large)}.notice-content:only-of-type{padding-block:var(--calcite-notice-spacing-token-small);padding-inline:var(--calcite-notice-spacing-token-large)}.notice-icon{display:flex;align-items:center;box-sizing:border-box;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;padding-block:var(--calcite-notice-spacing-token-small);padding-inline:var(--calcite-notice-spacing-token-large);flex:0 0 auto;padding-inline:var(--calcite-notice-spacing-token-small)}.notice-close{box-sizing:border-box;display:flex;cursor:pointer;align-items:center;transition-property:background-color,block-size,border-color,box-shadow,color,inset-block-end,inset-block-start,inset-inline-end,inset-inline-start,inset-size,opacity,outline-color,transform;transition-duration:var(--calcite-animation-timing);transition-timing-function:ease-in-out;flex:0 0 auto;margin-inline-end:var(--calcite-spacing-xs);--calcite-action-background-color: var(--calcite-notice-close-background-color);--calcite-action-background-color-hover: var( --calcite-notice-close-background-color-hover, var(--calcite-notice-close-background-color-focus) );--calcite-action-background-color-press: var(--calcite-notice-close-background-color-press);--calcite-action-text-color: var(--calcite-notice-close-icon-color, var(--calcite-color-text-3));--calcite-action-text-color-press: var(--calcite-notice-close-icon-color-hover)}.actions-end{display:flex;align-items:center;flex:0 0 auto;margin-inline-end:var(--calcite-spacing-xs);gap:var(--calcite-spacing-xs)}:host([kind=brand][appearance=outline-fill]) .container{border-color:var(--calcite-notice-border-color, rgb(from var(--calcite-color-brand) r g b/var(--calcite-opacity-half)));background-color:var(--calcite-notice-background-color, color-mix(in srgb, var(--calcite-color-brand) 5%, var(--calcite-color-foreground-1)))}:host([kind=brand][appearance=outline-fill]) .notice-icon,:host([kind=brand][appearance=transparent]) .notice-icon{color:var(--calcite-color-brand)}:host([kind=info][appearance=outline-fill]) .container{border-color:var(--calcite-notice-border-color, rgb(from var(--calcite-color-status-info) r g b/var(--calcite-opacity-half)));background-color:var(--calcite-notice-background-color, color-mix(in srgb, var(--calcite-color-status-info) 5%, var(--calcite-color-foreground-1)))}:host([kind=info][appearance=outline-fill]) .notice-icon,:host([kind=info][appearance=transparent]) .notice-icon{color:var(--calcite-color-status-info)}:host([kind=danger][appearance=outline-fill]) .container{border-color:var(--calcite-notice-border-color, rgb(from var(--calcite-color-status-danger) r g b/var(--calcite-opacity-half)));background-color:var(--calcite-notice-background-color, color-mix(in srgb, var(--calcite-color-status-danger) 5%, var(--calcite-color-foreground-1)))}:host([kind=danger][appearance=outline-fill]) .notice-icon,:host([kind=danger][appearance=transparent]) .notice-icon{color:var(--calcite-color-status-danger)}:host([kind=success][appearance=outline-fill]) .container{border-color:var(--calcite-notice-border-color, rgb(from var(--calcite-color-status-success) r g b/var(--calcite-opacity-half)));background-color:var(--calcite-notice-background-color, color-mix(in srgb, var(--calcite-color-status-success) 5%, var(--calcite-color-foreground-1)))}:host([kind=success][appearance=outline-fill]) .notice-icon,:host([kind=success][appearance=transparent]) .notice-icon{color:var(--calcite-color-status-success)}:host([kind=warning][appearance=outline-fill]) .container{border-color:var(--calcite-notice-border-color, rgb(from var(--calcite-color-status-warning) r g b/var(--calcite-opacity-half)));background-color:var(--calcite-notice-background-color, color-mix(in srgb, var(--calcite-color-status-warning) 5%, var(--calcite-color-foreground-1)))}:host([kind=warning][appearance=outline-fill]) .notice-icon,:host([kind=warning][appearance=transparent]) .notice-icon{color:var(--calcite-color-status-warning)}:host([kind=neutral][appearance=outline-fill]) .container{border-color:var(--calcite-color-border-2);background-color:var(--calcite-notice-background-color, var(--calcite-color-foreground-1))}:host([kind=neutral]) .notice-icon{color:var(--calcite-color-text-3)}:host([appearance=transparent]) .container{background-color:transparent}:host([hidden]){display:none}[hidden]{display:none}`;
const _Notice = class _Notice extends LitElement {
  constructor() {
    super(...arguments);
    this.closeButtonRef = e();
    this.transitionProp = "opacity";
    this.transitionRef = e();
    this.messages = useT9n();
    this.focusSetter = useSetFocus()(this);
    this.hasActionEnd = false;
    this.appearance = "outline-fill";
    this.closable = false;
    this.iconFlipRtl = false;
    this.kind = "brand";
    this.open = false;
    this.scale = "m";
    this.width = "auto";
    this.calciteNoticeBeforeClose = createEvent({ cancelable: false });
    this.calciteNoticeBeforeOpen = createEvent({ cancelable: false });
    this.calciteNoticeClose = createEvent({ cancelable: false });
    this.calciteNoticeOpen = createEvent({ cancelable: false });
  }
  async setFocus(options) {
    return this.focusSetter(() => {
      const noticeLinkEl = this.el.querySelector("calcite-link");
      return noticeLinkEl || this.closeButtonRef.value;
    }, options);
  }
  async load() {
    this.kindIcons = { ...KindIconsFilled, brand: KindIcons.brand };
    this.requestedIcon = setRequestedIcon(this.kindIcons, this.icon, this.kind);
  }
  willUpdate(changes) {
    if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
      toggleOpenClose(this);
    }
    if (changes.has("icon") || changes.has("kind") && (this.hasUpdated || this.kind !== "brand")) {
      this.requestedIcon = setRequestedIcon(this.kindIcons, this.icon, this.kind);
    }
  }
  onBeforeClose() {
    this.calciteNoticeBeforeClose.emit();
  }
  onBeforeOpen() {
    this.calciteNoticeBeforeOpen.emit();
  }
  onClose() {
    this.calciteNoticeClose.emit();
  }
  onOpen() {
    this.calciteNoticeOpen.emit();
  }
  close() {
    this.open = false;
  }
  handleActionsEndSlotChange(event) {
    this.hasActionEnd = slotChangeHasAssignedElement(event);
  }
  render() {
    const closeButton = T`<calcite-action class=${safeClassMap(CSS$d.close)} icon=x @click=${this.close} .scale=${this.scale} .text=${this.messages.close} ${n(this.closeButtonRef)}></calcite-action>`;
    return T`<div class=${safeClassMap(CSS$d.container)} ${n(this.transitionRef)}>${this.requestedIcon ? T`<div class=${safeClassMap(CSS$d.icon)}><calcite-icon .flipRtl=${this.iconFlipRtl} .icon=${this.requestedIcon} .scale=${getIconScale(this.scale)}></calcite-icon></div>` : null}<div class=${safeClassMap(CSS$d.content)}><slot name=${SLOTS$8.title}></slot><slot name=${SLOTS$8.message}></slot><slot name=${SLOTS$8.link}></slot></div><div class=${safeClassMap(CSS$d.actionsEnd)} .hidden=${!this.hasActionEnd}><slot name=${SLOTS$8.actionsEnd} @slotchange=${this.handleActionsEndSlotChange}></slot></div>${this.closable ? closeButton : null}</div>`;
  }
};
_Notice.properties = { hasActionEnd: [16, {}, { state: true }], appearance: [3, {}, { reflect: true }], closable: [7, {}, { reflect: true, type: Boolean }], icon: [3, { converter: stringOrBoolean, type: String }, { reflect: true }], iconFlipRtl: [7, {}, { reflect: true, type: Boolean }], kind: [3, {}, { reflect: true }], messageOverrides: [0, {}, { attribute: false }], open: [7, {}, { reflect: true, type: Boolean }], scale: [3, {}, { reflect: true }], width: [3, {}, { reflect: true }] };
_Notice.styles = styles$d;
let Notice = _Notice;
customElement("calcite-notice", Notice);
const index$c = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Notice
});
const CSS$c = {
  title: "title",
  close: "close",
  imageContainer: "image-container",
  chipIcon: "chip-icon",
  textSlotted: "text--slotted",
  container: "container",
  imageSlotted: "image--slotted",
  closable: "closable",
  multiple: "multiple",
  single: "single",
  selectable: "selectable",
  selectIcon: "select-icon",
  selectIconActive: "select-icon--active",
  nonInteractive: "non-interactive",
  isCircle: "is-circle",
  selected: "selected"
};
const SLOTS$7 = {
  image: "image"
};
const ICONS$5 = {
  close: "x",
  checkedSingle: "circle-f",
  uncheckedMultiple: "square",
  checkedMultiple: "check-square-f"
};
const styles$c = i`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-flex;cursor:default;border-radius:var(--calcite-chip-corner-radius, 9999px)}:host([closed]){display:none}:host([appearance=outline]) .container,:host([appearance=outline-fill]) .container{color:var(--calcite-chip-text-color, var(--calcite-color-text-1))}:host([appearance=outline]):host([kind=brand]),:host([appearance=outline-fill]):host([kind=brand]){--calcite-internal-chip-border-color: var(--calcite-chip-border-color, var(--calcite-color-brand));--calcite-internal-chip-selectable-hover-border-color: var(--calcite-chip-border-color, var(--calcite-color-brand));--calcite-internal-chip-selectable-active-border-color: var( --calcite-chip-border-color, var(--calcite-color-brand) )}:host([appearance=outline]):host([kind=inverse]),:host([appearance=outline-fill]):host([kind=inverse]){--calcite-internal-chip-border-color: var(--calcite-chip-border-color, var(--calcite-color-border-inverse))}:host([appearance=outline]):host([kind=neutral]),:host([appearance=outline-fill]):host([kind=neutral]){--calcite-internal-chip-border-color: var(--calcite-chip-border-color, var(--calcite-color-border-1))}:host([appearance=outline]){--calcite-internal-chip-background-color: transparent}:host([appearance=outline-fill]){--calcite-internal-chip-background-color: var(--calcite-chip-background-color, var(--calcite-color-foreground-1))}:host([appearance=solid]){--calcite-internal-chip-border-color: transparent;--calcite-internal-chip-selectable-hover-border-color: transparent;--calcite-internal-chip-selectable-active-border-color: transparent}:host([appearance=solid]):host([kind=brand]),:host([appearance=solid]):host([kind=inverse]){--calcite-internal-chip-close-background-color-hover: var(--calcite-color-transparent-inverse-hover);--calcite-internal-chip-close-background-color-press: var(--calcite-color-transparent-inverse-press);--calcite-internal-chip-close-icon-color: var(--calcite-color-text-inverse);--calcite-internal-chip-close-icon-color-hover: var(--calcite-color-text-inverse)}:host([appearance=solid]):host([kind=brand]) .container,:host([appearance=solid]):host([kind=inverse]) .container{color:var(--calcite-chip-text-color, var(--calcite-color-text-inverse))}:host([appearance=solid]):host([kind=brand]) .close,:host([appearance=solid]):host([kind=inverse]) .close{--calcite-color-focus: var(--calcite-color-text-inverse)}:host([appearance=solid]):host([kind=brand]){--calcite-internal-chip-background-color: var(--calcite-chip-background-color, var(--calcite-color-brand))}:host([appearance=solid]):host([kind=inverse]){--calcite-internal-chip-background-color: var(--calcite-chip-background-color, var(--calcite-color-inverse))}:host([appearance=solid]):host([kind=neutral]){--calcite-internal-chip-background-color: var(--calcite-chip-background-color, var(--calcite-color-foreground-2))}:host([kind=neutral]) .container{color:var(--calcite-chip-text-color, var(--calcite-color-text-1))}:host([selected]) .select-icon{opacity:1}:host([appearance=solid]):host([kind=neutral]){--calcite-internal-chip-selectable-hover-background-color: var(--calcite-color-foreground-3);--calcite-internal-chip-selectable-active-background-color: var(--calcite-color-border-2)}:host([appearance=solid]):host([kind=inverse]){--calcite-internal-chip-selectable-hover-background-color: var(--calcite-color-inverse-hover);--calcite-internal-chip-selectable-active-background-color: var(--calcite-color-inverse-press)}:host([appearance=solid]):host([kind=brand]){--calcite-internal-chip-selectable-hover-background-color: var(--calcite-color-brand-hover);--calcite-internal-chip-selectable-active-background-color: var(--calcite-color-brand-press)}:host([appearance=outline-fill]):host([kind=neutral]){--calcite-internal-chip-selectable-hover-background-color: var(--calcite-color-foreground-2);--calcite-internal-chip-selectable-hover-border-color: var(--calcite-color-border-input);--calcite-internal-chip-selectable-active-background-color: var(--calcite-color-foreground-3);--calcite-internal-chip-selectable-active-border-color: var(--calcite-color-text-3)}:host([appearance=outline-fill]):host([kind=inverse]),:host([appearance=outline-fill]):host([kind=brand]){--calcite-internal-chip-selectable-hover-background-color: var(--calcite-color-foreground-2);--calcite-internal-chip-selectable-active-background-color: var(--calcite-color-foreground-3)}:host([appearance=outline]):host([kind=neutral]){--calcite-internal-chip-selectable-hover-background-color: var(--calcite-color-transparent-hover);--calcite-internal-chip-selectable-hover-border-color: var(--calcite-color-border-input);--calcite-internal-chip-selectable-active-background-color: var(--calcite-color-transparent-press);--calcite-internal-chip-selectable-active-border-color: var(--calcite-color-text-3)}:host([appearance=outline]):host([kind=inverse]),:host([appearance=outline]):host([kind=brand]){--calcite-internal-chip-selectable-hover-background-color: var(--calcite-color-transparent-hover);--calcite-internal-chip-selectable-active-background-color: var(--calcite-color-transparent-press)}:host([scale=s]){--calcite-internal-chip-close-padding: var(--calcite-spacing-none)}:host([scale=s]) .container{--calcite-internal-chip-block-size: var(--calcite-size-sm, 1.5rem) ;--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-font-size: var(--calcite-font-size--2);--calcite-internal-chip-icon-size: var(--calcite-size-xs, 1rem) ;--calcite-internal-chip-icon-space: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-image-size: var(--calcite-spacing-xl, 1.25rem) ;--calcite-internal-chip-title-space: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-close-size: var(--calcite-size-xs, 1rem) }:host([scale=s]) .container:not(.closable).is-circle{--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-px);--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-px)}:host([scale=s]) .container.image--slotted:has(.chip-icon),:host([scale=s]) .container.image--slotted.text--slotted,:host([scale=s]) .container.image--slotted.closable{--calcite-internal-chip-image-space-x-end: var(--calcite-spacing-xxs, .25rem) }:host([scale=s]) .container.image--slotted:not(.text--slotted,:has(.chip-icon)),:host([scale=s]) .container.image--slotted:not(.selectable){--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-px)}:host([scale=s]) .container.selectable.single:not(.is-circle).image--slotted{--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-px)}:host([scale=s]) .container.selectable.single:not(.is-circle).selected{--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-none, 0)}:host([scale=s]) .container.selectable.single:not(.is-circle).selected.image--slotted{--calcite-internal-chip-select-space-x-end: .5rem ;--calcite-internal-chip-select-space-x-start: .125rem }:host([scale=s]) .container.multiple:not(.is-circle){--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=s]) .container.multiple:not(.is-circle).image--slotted{--calcite-internal-chip-select-space-x-end: .5rem ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-px)}:host([scale=s]) .container.multiple:not(.is-circle).image--slotted:not(.text--slotted){--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xs, .375rem) }:host([scale=m]){--calcite-internal-chip-close-padding: var(--calcite-spacing-xxs)}:host([scale=m]) .container{--calcite-internal-chip-block-size: var(--calcite-size-md, 2rem) ;--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-font-size: var(--calcite-font-size--1);--calcite-internal-chip-icon-size: var(--calcite-size-sm, 1.5rem) ;--calcite-internal-chip-icon-space: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-image-size: var(--calcite-size-sm, 1.5rem) ;--calcite-internal-chip-title-space: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-close-size: var(--calcite-size-sm, 1.5rem) }:host([scale=m]) .container:not(.closable).is-circle{--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-px);--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-px)}:host([scale=m]) .container.image--slotted:not(.is-circle){--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=m]) .container.image--slotted:has(.chip-icon),:host([scale=m]) .container.image--slotted.text--slotted,:host([scale=m]) .container.image--slotted.closable{--calcite-internal-chip-image-space-x-end: var(--calcite-spacing-xs, .375rem) }:host([scale=m]) .container.selectable.single:not(.is-circle).image--slotted{--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=m]) .container.selectable.single:not(.is-circle).selected{--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-px);--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-none, 0)}:host([scale=m]) .container.selectable.single:not(.is-circle).selected.image--slotted{--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xs, .375rem) }:host([scale=m]) .container.multiple:not(.is-circle){--calcite-internal-chip-select-space-x-end: .125rem ;--calcite-internal-chip-select-space-x-start: .125rem }:host([scale=m]) .container.multiple:not(.is-circle).image--slotted{--calcite-internal-chip-select-space-x-end: .5rem ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=m]) .container.closable:not(.is-circle){--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-xxs, .25rem) }:host([scale=l]){--calcite-internal-chip-close-padding: var(--calcite-spacing-xxs)}:host([scale=l]) .container{--calcite-internal-chip-block-size: 2.75rem ;--calcite-internal-chip-container-space-x-end: .5rem ;--calcite-internal-chip-container-space-x-start: .5rem ;--calcite-internal-chip-font-size: var(--calcite-font-size-0);--calcite-internal-chip-icon-size: var(--calcite-size-md, 2rem) ;--calcite-internal-chip-icon-space: .5rem ;--calcite-internal-chip-image-size: var(--calcite-size-md, 2rem) ;--calcite-internal-chip-title-space: .5rem ;--calcite-internal-close-size: var(--calcite-size-md, 2rem) }:host([scale=l]) .container:not(.closable).is-circle{--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=l]) .container.image--slotted:not(.is-circle){--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xs, .375rem) }:host([scale=l]) .container.image--slotted:has(.chip-icon),:host([scale=l]) .container.image--slotted.text--slotted,:host([scale=l]) .container.image--slotted.closable{--calcite-internal-chip-image-space-x-end: .5rem }:host([scale=l]) .container.selectable.single:not(.is-circle).image--slotted{--calcite-internal-chip-container-space-x-start: var(--calcite-spacing-xs, .375rem) }:host([scale=l]) .container.selectable.single:not(.is-circle).selected{--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-none, 0)}:host([scale=l]) .container.selectable.single:not(.is-circle).selected.image--slotted{--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xs, .375rem) ;--calcite-internal-chip-select-space-x-start: .5rem }:host([scale=l]) .container.multiple:not(.is-circle){--calcite-internal-chip-container-space-x-start: .5rem ;--calcite-internal-chip-select-space-x-end: var(--calcite-spacing-xxs, .25rem) ;--calcite-internal-chip-select-space-x-start: var(--calcite-spacing-xxs, .25rem) }:host([scale=l]) .container.multiple:not(.is-circle).image--slotted{--calcite-internal-chip-select-space-x-end: .75rem }:host([scale=l]) .container.closable:not(.is-circle){--calcite-internal-chip-container-space-x-end: var(--calcite-spacing-xs, .375rem) }.container{box-sizing:border-box;display:inline-flex;block-size:100%;max-inline-size:100%;align-items:center;justify-content:center;font-weight:var(--calcite-font-weight-medium);outline-color:transparent;background-color:var(--calcite-internal-chip-background-color);border-color:var(--calcite-internal-chip-border-color);border-radius:var(--calcite-chip-corner-radius, 9999px);border-width:var(--calcite-border-width-sm);border-style:solid;font-size:var(--calcite-internal-chip-font-size, var(--calcite-font-size));padding-inline-start:var(--calcite-internal-chip-container-space-x-start);padding-inline-end:var(--calcite-internal-chip-container-space-x-end);block-size:var(--calcite-internal-chip-block-size, auto);inline-size:var(--calcite-internal-chip-inline-size, auto);min-inline-size:var(--calcite-internal-chip-block-size, auto)}.container:hover .select-icon--active{opacity:var(--calcite-opacity-full, 1)}.container.selectable{cursor:pointer}.container.selectable:hover{background-color:var(--calcite-internal-chip-selectable-hover-background-color);border-color:var(--calcite-internal-chip-selectable-hover-border-color)}.container.selectable:active{background-color:var(--calcite-internal-chip-selectable-active-background-color);border-color:var(--calcite-internal-chip-selectable-active-border-color)}.container:not(.non-interactive):focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(var(--calcite-spacing-base) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.container.text--slotted .title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.container:not(.text--slotted) .title,.container:not(.image--slotted) .image-container{display:none}.container.is-circle .chip-icon,.container.is-circle .image-container{padding:var(--calcite-spacing-none, 0)}.title{padding-inline:var(--calcite-internal-chip-title-space)}.image-container{display:inline-flex;overflow:hidden;align-items:center;justify-content:center;pointer-events:none;block-size:var(--calcite-internal-chip-image-size, var(--calcite-spacing-xxl, 1.5rem));inline-size:var(--calcite-internal-chip-image-size, var(--calcite-spacing-xxl, 1.5rem));padding-inline-start:var(--calcite-spacing-none, 0);padding-inline-end:var(--calcite-internal-chip-image-space-x-end, 0)}.chip-icon{position:relative;margin-block:0px;display:inline-flex;transition-timing-function:cubic-bezier(.4,0,.2,1);color:var(--calcite-chip-icon-color, var(--calcite-chip-text-color, var(--calcite-icon-color, var(--calcite-ui-icon-color, currentColor))));padding-inline:var(--calcite-internal-chip-icon-space, var(--calcite-spacing-xs, .375rem))}.select-icon{align-self:center;justify-content:center;align-items:center;display:flex;inset-block-start:-1px;position:absolute;visibility:hidden;inline-size:auto;opacity:0;transition:opacity .15s ease-in-out,inline-size .15s ease-in-out;color:var(--calcite-chip-select-icon-color, currentColor)}.select-icon.select-icon--active{position:relative;visibility:visible;opacity:var(--calcite-opacity-half, .5);color:var(--calcite-chip-select-icon-color-press, var(--calcite-chip-select-icon-color-pressed, var(--calcite-chip-select-icon-color, currentColor)))}.multiple .select-icon{display:flex;align-items:center;justify-content:center}.multiple .select-icon,.single .select-icon--active{padding-inline-start:var(--calcite-internal-chip-select-space-x-start);padding-inline-end:var(--calcite-internal-chip-select-space-x-end);block-size:var(--calcite-internal-chip-icon-size, var(--calcite-spacing-xxl, 1.5rem));inline-size:var(--calcite-internal-chip-icon-size, var(--calcite-spacing-xxl, 1.5rem))}.close{--calcite-action-background-color-hover: var(--calcite-internal-chip-close-background-color-hover);--calcite-action-background-color-press: var(--calcite-internal-chip-close-background-color-press);--calcite-action-corner-radius: var(--calcite-corner-radius-pill);--calcite-action-text-color: var( --calcite-chip-close-icon-color, var(--calcite-close-icon-color, var(--calcite-internal-chip-close-icon-color)) );--calcite-action-text-color-press: var( --calcite-chip-close-icon-color, var(--calcite-close-icon-color, var(--calcite-internal-chip-close-icon-color-hover)) );--calcite-icon-color: var(--calcite-action-text-color);--calcite-internal-action-height: unset;--calcite-internal-action-spacing: var(--calcite-internal-chip-close-padding)}slot[name=image]::slotted(*){display:flex;block-size:100%;inline-size:100%;overflow:hidden;border-radius:50%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}`;
const _Chip = class _Chip extends LitElement {
  constructor() {
    super();
    this.closeButtonRef = e();
    this.containerRef = e();
    this.messages = useT9n();
    this.focusSetter = useSetFocus()(this);
    this.interactiveContainer = useInteractive(this);
    this.hasImage = false;
    this.hasText = false;
    this.appearance = "solid";
    this.closable = false;
    this.closed = false;
    this.closeOnDelete = false;
    this.disabled = false;
    this.iconFlipRtl = false;
    this.interactive = false;
    this.kind = "neutral";
    this.scale = "m";
    this.selected = false;
    this.selectionMode = "none";
    this.calciteChipClose = createEvent({ cancelable: false });
    this.calciteChipSelect = createEvent({ cancelable: false });
    this.calciteInternalChipKeyEvent = createEvent({ cancelable: false });
    this.calciteInternalChipSelect = createEvent({ cancelable: false });
    this.calciteInternalSyncSelectedChips = createEvent({ cancelable: false });
    this.listen("keydown", this.keyDownHandler);
    this.listen("click", this.clickHandler);
  }
  async setFocus(options) {
    return this.focusSetter(() => {
      if (this.interactive) {
        return this.containerRef.value;
      } else if (this.closable) {
        return this.closeButtonRef.value;
      }
    }, options);
  }
  async load() {
  }
  willUpdate(changes) {
    if (changes.has("selected") && this.hasUpdated) {
      this.watchSelected(this.selected);
    }
  }
  loaded() {
    if (this.selectionMode !== "none" && this.interactive && this.selected) {
      this.handleSelectionPropertyChange(this.selected);
    }
  }
  watchSelected(selected) {
    if (this.selectionMode === "none") {
      return;
    }
    this.handleSelectionPropertyChange(selected);
  }
  keyDownHandler(event) {
    if (event.target === this.el) {
      switch (event.key) {
        case " ":
        case "Enter":
          this.handleEmittingEvent();
          event.preventDefault();
          break;
        case "Backspace":
        case "Delete":
          if (this.closable && !this.closed && this.closeOnDelete) {
            event.preventDefault();
            this.close();
          }
          break;
        case "ArrowRight":
        case "ArrowLeft":
        case "Home":
        case "End":
          this.calciteInternalChipKeyEvent.emit(event);
          event.preventDefault();
          break;
      }
    }
  }
  clickHandler() {
    if (!this.interactive && this.closable) {
      focusElement(this.closeButtonRef.value);
    }
  }
  handleDefaultSlotChange() {
    this.updateHasText();
  }
  close() {
    this.calciteChipClose.emit();
    this.selected = false;
    this.closed = true;
  }
  closeButtonKeyDownHandler(event) {
    if (isActivationKey(event.key)) {
      event.preventDefault();
      this.close();
    }
  }
  updateHasText() {
    this.hasText = this.el.textContent.trim().length > 0;
  }
  handleSlotImageChange(event) {
    this.hasImage = slotChangeHasAssignedElement(event);
  }
  handleEmittingEvent() {
    if (this.interactive) {
      this.calciteChipSelect.emit();
    }
  }
  handleSelectionPropertyChange(selected) {
    if (this.selectionMode === "single") {
      this.calciteInternalSyncSelectedChips.emit();
    }
    const selectedInParent = this.parentChipGroup.selectedItems.includes(this.el);
    if (!selectedInParent && selected && this.selectionMode !== "multiple") {
      this.calciteInternalChipSelect.emit();
    }
    if (this.selectionMode !== "single") {
      this.calciteInternalSyncSelectedChips.emit();
    }
  }
  renderChipImage() {
    return T`<div class=${safeClassMap(CSS$c.imageContainer)}><slot name=${SLOTS$7.image} @slotchange=${this.handleSlotImageChange}></slot></div>`;
  }
  renderSelectionIcon() {
    const icon = this.selectionMode === "multiple" ? this.selected ? ICONS$5.checkedMultiple : ICONS$5.uncheckedMultiple : this.selected ? ICONS$5.checkedSingle : void 0;
    return T`<div class=${safeClassMap({
      [CSS$c.selectIcon]: true,
      [CSS$c.selectIconActive]: this.selectionMode === "multiple" || this.selected
    })}>${icon ? T`<calcite-icon .icon=${icon} .scale=${getIconScale(this.scale)}></calcite-icon>` : null}</div>`;
  }
  renderCloseButton() {
    return T`<calcite-action class=${safeClassMap(CSS$c.close)} .icon=${ICONS$5.close} @click=${this.close} @keydown=${this.closeButtonKeyDownHandler} .scale=${this.scale} .text=${this.messages.dismissLabel} ${n(this.closeButtonRef)}></calcite-action>`;
  }
  renderIcon() {
    return T`<calcite-icon class=${safeClassMap(CSS$c.chipIcon)} .flipRtl=${this.iconFlipRtl} .icon=${this.icon} .scale=${getIconScale(this.scale)}></calcite-icon>`;
  }
  render() {
    const { disabled } = this;
    const disableInteraction = disabled || !disabled && !this.interactive;
    const role = this.selectionMode === "multiple" && this.interactive ? "checkbox" : this.selectionMode !== "none" && this.interactive ? "radio" : this.interactive ? "button" : "img";
    return this.interactiveContainer({ disabled, children: T`<div .ariaChecked=${this.selectionMode !== "none" && this.interactive ? this.selected : void 0} .ariaLabel=${this.label} class=${safeClassMap({
      [CSS$c.container]: true,
      [CSS$c.textSlotted]: this.hasText,
      [CSS$c.imageSlotted]: this.hasImage,
      [CSS$c.selectable]: this.selectionMode !== "none",
      [CSS$c.multiple]: this.selectionMode === "multiple",
      [CSS$c.single]: this.selectionMode === "single" || this.selectionMode === "single-persist",
      [CSS$c.selected]: this.selected,
      [CSS$c.closable]: this.closable,
      [CSS$c.nonInteractive]: !this.interactive,
      [CSS$c.isCircle]: !this.closable && !this.hasText && (!this.icon || !this.hasImage) && (this.selectionMode === "none" || !!this.selectionMode && this.selectionMode !== "multiple" && !this.selected)
    })} @click=${this.handleEmittingEvent} .role=${role} .tabIndex=${disableInteraction ? -1 : 0} ${n(this.containerRef)}>${this.selectionMode !== "none" && this.renderSelectionIcon() || ""}${this.renderChipImage()}${this.icon && this.renderIcon() || ""}<span class=${safeClassMap(CSS$c.title)}><slot @slotchange=${this.handleDefaultSlotChange}></slot></span>${this.closable && this.renderCloseButton() || ""}</div>` });
  }
};
_Chip.properties = { hasImage: [16, {}, { state: true }], hasText: [16, {}, { state: true }], appearance: [3, {}, { reflect: true }], closable: [7, {}, { reflect: true, type: Boolean }], closed: [7, {}, { reflect: true, type: Boolean }], closeOnDelete: [7, {}, { reflect: true, type: Boolean }], disabled: [7, {}, { reflect: true, type: Boolean }], icon: [3, { type: String }, { reflect: true }], iconFlipRtl: [7, {}, { reflect: true, type: Boolean }], interactive: [5, {}, { type: Boolean }], kind: [3, {}, { reflect: true }], label: 1, messageOverrides: [0, {}, { attribute: false }], parentChipGroup: [0, {}, { attribute: false }], scale: [3, {}, { reflect: true }], selected: [7, {}, { reflect: true, type: Boolean }], selectionMode: 1, value: 1 };
_Chip.styles = styles$c;
let Chip = _Chip;
customElement("calcite-chip", Chip);
const index$b = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Chip
});
const SLOTS$6 = {
  actionsStart: "actions-start",
  actionsEnd: "actions-end"
};
const useCancelable = () => {
  return makeGenericController((_, controller) => {
    const resources = /* @__PURE__ */ new Set();
    controller.onDisconnected(() => {
      resources.forEach((resource) => resource.cancel());
    });
    return {
      add: (resourceOrResources) => {
        [resourceOrResources].flat().forEach((resource) => resources.add(resource));
      },
      resources
    };
  });
};
const listSelector = "calcite-list";
const listItemGroupSelector = "calcite-list-item-group";
const listItemSelector = "calcite-list-item";
function expandedAncestors(el) {
  const ancestor = el.parentElement?.closest(listItemSelector);
  if (!ancestor) {
    return;
  }
  ancestor.open = true;
  expandedAncestors(ancestor);
}
function getListItemChildren(slotEl) {
  const assignedElements = slotEl.assignedElements({ flatten: true });
  const groupChildren = assignedElements.filter((el) => el?.matches(listItemGroupSelector)).map((group) => Array.from(group.querySelectorAll(listItemSelector))).flat();
  const listItemChildren = assignedElements.filter((el) => el?.matches(listItemSelector));
  const listChildren = assignedElements.filter((el) => el?.matches(listSelector));
  return {
    lists: listChildren,
    items: groupChildren.concat(listItemChildren)
  };
}
function updateListItemChildren(slotEl) {
  const listItemChildren = slotEl.assignedElements({ flatten: true }).filter((el) => el.matches(listItemSelector));
  const filteredListItemChildren = listItemChildren.filter((listItem) => !listItem.filterHidden);
  listItemChildren.forEach((listItem) => {
    const index2 = filteredListItemChildren.indexOf(listItem);
    listItem.setPosition = index2 === -1 ? void 0 : index2 + 1;
    listItem.setSize = index2 === -1 ? void 0 : filteredListItemChildren.length;
  });
}
function getDepth(element, includeGroup = false) {
  {
    return 0;
  }
}
function isListItem(element) {
  return element.tagName === "CALCITE-LIST-ITEM";
}
const sortableComponentSet = /* @__PURE__ */ new Set();
const CSS$b = {
  ghostClass: "calcite-sortable--ghost",
  chosenClass: "calcite-sortable--chosen",
  dragClass: "calcite-sortable--drag",
  fallbackClass: "calcite-sortable--fallback"
};
function connectSortableComponent(component) {
  if (dragActive(component)) {
    return;
  }
  disconnectSortableComponent(component);
  sortableComponentSet.add(component);
  const dataIdAttr = "id";
  const { group, handleSelector: handle, dragSelector: draggable, sortDisabled } = component;
  component.sortable = Sortable.create(component.el, {
    dataIdAttr,
    swapThreshold: 0.5,
    ...CSS$b,
    ...!!draggable && { draggable },
    ...!!group && {
      sort: !sortDisabled,
      group: {
        name: group,
        ...!!component.canPull && {
          pull: (to, from, dragEl, { newDraggableIndex: newIndex, oldDraggableIndex: oldIndex }) => component.canPull({
            toEl: to.el,
            fromEl: from.el,
            dragEl,
            newIndex,
            oldIndex
          })
        },
        ...!!component.canPut && {
          put: (to, from, dragEl, { newDraggableIndex: newIndex, oldDraggableIndex: oldIndex }) => component.canPut({
            toEl: to.el,
            fromEl: from.el,
            dragEl,
            newIndex,
            oldIndex
          })
        }
      }
    },
    onMove: ({ from: fromEl, dragged: dragEl, to: toEl, related: relatedEl }) => {
      if (!component.onDragMove) {
        return;
      }
      component.onDragMove({ fromEl, dragEl, toEl, relatedEl });
    },
    handle,
    filter: `${handle}[disabled]`,
    onStart: ({ from: fromEl, item: dragEl, to: toEl, newDraggableIndex: newIndex, oldDraggableIndex: oldIndex }) => {
      dragState.active = true;
      onGlobalDragStart();
      component.onDragStart({ fromEl, dragEl, toEl, newIndex, oldIndex });
    },
    onEnd: ({ from: fromEl, item: dragEl, to: toEl, newDraggableIndex: newIndex, oldDraggableIndex: oldIndex }) => {
      dragState.active = false;
      onGlobalDragEnd();
      component.onDragEnd({ fromEl, dragEl, toEl, newIndex, oldIndex });
    },
    onSort: ({ from: fromEl, item: dragEl, to: toEl, newDraggableIndex: newIndex, oldDraggableIndex: oldIndex }) => {
      component.onDragSort({ fromEl, dragEl, toEl, newIndex, oldIndex });
    }
  });
}
function disconnectSortableComponent(component) {
  if (dragActive(component)) {
    return;
  }
  sortableComponentSet.delete(component);
  component.sortable?.destroy();
  component.sortable = null;
}
const dragState = { active: false };
function dragActive(component) {
  return component.dragEnabled && dragState.active;
}
function onGlobalDragStart() {
  Array.from(sortableComponentSet).forEach((component) => component.onGlobalDragStart());
}
function onGlobalDragEnd() {
  Array.from(sortableComponentSet).forEach((component) => component.onGlobalDragEnd());
}
const CSS$a = {
  container: "container",
  table: "table",
  scrim: "scrim",
  stack: "stack",
  tableContainer: "table-container",
  sticky: "sticky-pos",
  assistiveText: "assistive-text",
  containerHeight: "container-height"
};
const SLOTS$5 = {
  filterNoResults: "filter-no-results",
  filterActionsStart: "filter-actions-start",
  filterActionsEnd: "filter-actions-end"
};
const styles$b = i`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([scale=s]){--calcite-internal-list-action-spacing: var(--calcite-spacing-xxs)}:host([scale=m]){--calcite-internal-list-action-spacing: var(--calcite-spacing-xxs)}:host([scale=l]){--calcite-internal-list-action-spacing: var(--calcite-spacing-xs)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{position:relative;background-color:var(--calcite-list-background-color, var(--calcite-color-foreground-1))}.container-height{block-size:100%}.table-container{box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;background-color:transparent}.table-container *{box-sizing:border-box}.table{inline-size:100%}.stack{--calcite-stack-padding-inline: 0;--calcite-stack-padding-block: 0}.sticky-pos{position:sticky;inset-block-start:0px;z-index:var(--calcite-z-index-sticky);background-color:var(--calcite-list-background-color, var(--calcite-color-foreground-1))}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}::slotted(:is(calcite-action[slot=filter-actions-start],calcite-action[slot=filter-actions-end])){gap:var(--calcite-internal-list-action-spacing);align-self:center}::slotted(calcite-action[slot=filter-actions-start]){margin-inline-start:var(--calcite-internal-list-action-spacing)}::slotted(calcite-action[slot=filter-actions-end]){margin-inline-end:var(--calcite-internal-list-action-spacing)}:host([hidden]){display:none}[hidden]{display:none}`;
const parentSelector = `${listItemGroupSelector}, ${listItemSelector}`;
const _List = class _List extends LitElement {
  constructor() {
    super();
    this.dragSelector = listItemSelector;
    this.focusableItems = [];
    this.handleSelector = "calcite-sort-handle";
    this.listItems = [];
    this.listItemGroups = [];
    this.mutationObserver = createObserver();
    this.cancelable = useCancelable()(this);
    this.updateListItemsDebounced = debounce(this.updateListItems, DEBOUNCE.nextTick);
    this.visibleItems = [];
    this.willFilterEmit = false;
    this.willPerformFilter = false;
    this.messages = useT9n({ blocking: true });
    this.focusSetter = useSetFocus()(this);
    this.interactiveContainer = useInteractive(this);
    this.dataForFilter = [];
    this.hasFilterActionsEnd = false;
    this.hasFilterActionsStart = false;
    this.hasFilterNoResults = false;
    this.sortHandleMenuItems = [];
    this.disabled = false;
    this.dragEnabled = false;
    this.filterEnabled = false;
    this.filterText = "";
    this.filteredData = [];
    this.filteredItems = [];
    this.interactionMode = "interactive";
    this.loading = false;
    this.displayMode = "flat";
    this.scale = "m";
    this.selectedItems = [];
    this.selectionAppearance = "icon";
    this.selectionMode = "none";
    this.sortDisabled = false;
    this.calciteInternalListDefaultSlotChange = createEvent({ cancelable: false });
    this.calciteListChange = createEvent({ cancelable: false });
    this.calciteListDragEnd = createEvent({ cancelable: false });
    this.calciteListDragStart = createEvent({ cancelable: false });
    this.calciteListFilter = createEvent({ cancelable: false });
    this.calciteListMoveHalt = createEvent({ cancelable: false });
    this.calciteListOrderChange = createEvent({ cancelable: false });
    this.listen("calciteInternalListItemToggle", this.handleCalciteListItemToggle);
    this.listen("calciteInternalFocusPreviousItem", this.handleCalciteInternalFocusPreviousItem);
    this.listen("calciteInternalListItemActive", this.handleCalciteInternalListItemActive);
    this.listen("calciteListItemSelect", this.handleCalciteListItemSelect);
    this.listen("calciteInternalAssistiveTextChange", this.handleCalciteInternalAssistiveTextChange);
    this.listen("calciteListItemSortHandleBeforeOpen", this.updateListItemsDebounced);
    this.listen("calciteSortHandleReorder", this.handleSortReorder);
    this.listen("calciteSortHandleMove", this.handleSortMove);
    this.listen("calciteSortHandleAdd", this.handleSortAdd);
    this.listen("calciteInternalListItemSelect", this.handleCalciteInternalListItemSelect);
    this.listen("calciteInternalListItemSelectMultiple", this.handleCalciteInternalListItemSelectMultiple);
    this.listen("calciteInternalListItemChange", this.handleCalciteInternalListItemChange);
    this.listen("calciteInternalListItemGroupDefaultSlotChange", this.handleCalciteInternalListItemGroupDefaultSlotChange);
  }
  get hasActiveFilter() {
    return this.filterEnabled && this.filterText && this.filteredItems.length !== this.visibleItems.length;
  }
  get showNoResultsContainer() {
    return this.filterEnabled && this.filterText && this.hasFilterNoResults && this.visibleItems.length && !this.filteredItems.length;
  }
  get effectiveFilterProps() {
    if (!this.filterProps) {
      return ["description", "label", "metadata", "heading"];
    }
    return this.filterProps.filter((prop) => prop !== "el");
  }
  emitOrderChangeEvent(detail) {
    this.calciteListOrderChange.emit(detail);
  }
  async setFocus(options) {
    return this.focusSetter(() => this.filterEnabled ? this.filterEl : this.focusableItems.find((listItem) => listItem.active), options);
  }
  connectedCallback() {
    super.connectedCallback();
    this.connectObserver();
    this.willPerformFilter = true;
    this.updateListItemsDebounced();
    this.setUpSorting();
    this.setParentList();
    this.setListItemGroups();
    this.cancelable.add(this.updateListItemsDebounced);
  }
  async load() {
    this.handleInteractionModeWarning();
  }
  willUpdate(changes) {
    if (changes.has("filterText") || changes.has("filterProps") || changes.has("filterPredicate")) {
      this.performFilter();
    }
    if (changes.has("filterEnabled") && (this.hasUpdated || this.filterEnabled !== false) || changes.has("group") || changes.has("sortDisabled") && (this.hasUpdated || this.sortDisabled !== false) || changes.has("dragEnabled") && (this.hasUpdated || this.dragEnabled !== false) || changes.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "none") || changes.has("selectionAppearance") && (this.hasUpdated || this.selectionAppearance !== "icon") || changes.has("displayMode") && this.hasUpdated || changes.has("scale") && this.hasUpdated || changes.has("canPull") && this.hasUpdated || changes.has("canPut") && this.hasUpdated || changes.has("filterPredicate") && this.hasUpdated) {
      this.handleListItemChange();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.disconnectObserver();
    disconnectSortableComponent(this);
  }
  updateListItems() {
    this.updateGroupItems();
    const { selectionAppearance, selectionMode, interactionMode, dragEnabled, el, filterEl, displayMode, scale, sortDisabled, sortHandleMenuItems } = this;
    const items = Array.from(this.el.querySelectorAll(listItemSelector));
    const fromEl = el;
    const fromElItems = Array.from(fromEl.children).filter(isListItem);
    items.forEach((item) => {
      item.scale = scale;
      item.selectionAppearance = selectionAppearance;
      item.selectionMode = selectionMode;
      item.interactionMode = interactionMode;
      if (item.closest(listSelector) === el) {
        item.moveToItems = sortHandleMenuItems.filter((moveToItem) => this.validateSortMenuItem({
          type: "move",
          fromEl,
          toEl: moveToItem.element,
          dragEl: item,
          newIndex: 0,
          oldIndex: fromElItems.indexOf(item)
        }));
        item.addToItems = this.sortHandleMenuItems.filter((moveToItem) => this.validateSortMenuItem({
          type: "add",
          fromEl,
          toEl: moveToItem.element,
          dragEl: item,
          newIndex: 0,
          oldIndex: fromElItems.indexOf(item)
        }));
        item.dragHandle = dragEnabled;
        item.displayMode = displayMode;
        item.sortDisabled = sortDisabled;
      }
    });
    if (this.parentListEl) {
      this.setUpSorting();
      return;
    }
    this.listItems = items;
    if (this.filterEnabled && this.willPerformFilter) {
      this.willPerformFilter = false;
      this.dataForFilter = this.getItemData();
      if (filterEl) {
        filterEl.items = this.dataForFilter;
        this.filterAndUpdateData();
      }
    }
    this.visibleItems = this.listItems.filter((item) => !item.closed && !item.hidden);
    this.updateFilteredItems();
    this.borderItems();
    this.focusableItems = this.filteredItems.filter((item) => !item.disabled);
    this.setActiveListItem();
    this.updateSelectedItems();
    this.setUpSorting();
  }
  handleListItemChange() {
    this.willPerformFilter = true;
    this.updateListItemsDebounced();
  }
  handleCalciteListItemToggle(event) {
    if (this.parentListEl) {
      return;
    }
    event.stopPropagation();
    this.borderItems();
  }
  handleCalciteInternalFocusPreviousItem(event) {
    if (this.parentListEl) {
      return;
    }
    event.stopPropagation();
    const { focusableItems } = this;
    const currentIndex = focusableItems.findIndex((listItem) => listItem.active);
    const prevIndex = currentIndex - 1;
    if (focusableItems[prevIndex]) {
      this.focusRow(focusableItems[prevIndex]);
    }
  }
  handleCalciteInternalListItemActive(event) {
    if (this.parentListEl) {
      return;
    }
    event.stopPropagation();
    const target = event.target;
    const { listItems } = this;
    listItems.forEach((listItem) => {
      listItem.active = listItem === target;
    });
  }
  handleCalciteListItemSelect() {
    if (this.parentListEl) {
      return;
    }
    this.updateSelectedItems(true);
  }
  handleCalciteInternalAssistiveTextChange(event) {
    this.assistiveText = event.detail.message;
    event.stopPropagation();
  }
  handleSortReorder(event) {
    if (this.parentListEl || event.defaultPrevented) {
      return;
    }
    event.preventDefault();
    this.handleReorder(event);
  }
  handleSortAdd(event) {
    if (this.parentListEl || event.defaultPrevented) {
      return;
    }
    event.preventDefault();
    this.handleAdd(event);
  }
  handleSortMove(event) {
    if (this.parentListEl || event.defaultPrevented) {
      return;
    }
    event.preventDefault();
    this.handleMove(event);
  }
  handleCalciteInternalListItemSelect(event) {
    if (this.parentListEl) {
      return;
    }
    event.stopPropagation();
    const target = event.target;
    const { listItems, selectionMode } = this;
    if (target.selected && (selectionMode === "single" || selectionMode === "single-persist")) {
      listItems.forEach((listItem) => listItem.selected = listItem === target);
    }
    this.updateSelectedItems();
  }
  handleCalciteInternalListItemSelectMultiple(event) {
    if (this.parentListEl) {
      return;
    }
    event.stopPropagation();
    const { target, detail } = event;
    const { focusableItems, lastSelectedInfo } = this;
    const selectedItem = target;
    if (detail.selectMultiple && !!lastSelectedInfo) {
      const currentIndex = focusableItems.indexOf(selectedItem);
      const lastSelectedIndex = focusableItems.indexOf(lastSelectedInfo.selectedItem);
      const startIndex = Math.min(lastSelectedIndex, currentIndex);
      const endIndex = Math.max(lastSelectedIndex, currentIndex);
      focusableItems.slice(startIndex, endIndex + 1).forEach((item) => item.selected = lastSelectedInfo.selected);
    } else {
      this.lastSelectedInfo = { selectedItem, selected: selectedItem.selected };
    }
  }
  handleCalciteInternalListItemChange(event) {
    if (this.parentListEl) {
      return;
    }
    event.stopPropagation();
    this.updateListItemsDebounced();
  }
  handleCalciteInternalListItemGroupDefaultSlotChange(event) {
    event.stopPropagation();
  }
  connectObserver() {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }
  disconnectObserver() {
    this.mutationObserver?.disconnect();
  }
  setUpSorting() {
    const { dragEnabled, defaultSlotEl } = this;
    if (!dragEnabled) {
      return;
    }
    if (defaultSlotEl) {
      updateListItemChildren(defaultSlotEl);
    }
    connectSortableComponent(this);
  }
  onGlobalDragStart() {
    this.disconnectObserver();
  }
  onGlobalDragEnd() {
    this.connectObserver();
  }
  onDragEnd(detail) {
    this.calciteListDragEnd.emit(detail);
  }
  onDragStart(detail) {
    detail.dragEl.sortHandleOpen = false;
    this.calciteListDragStart.emit(detail);
  }
  onDragSort(detail) {
    this.setParentList();
    this.updateListItemsDebounced();
    this.calciteListOrderChange.emit(detail);
  }
  setParentList() {
    this.parentListEl = this.el.parentElement?.closest(listSelector);
  }
  handleDefaultSlotChange() {
    if (this.parentListEl) {
      this.calciteInternalListDefaultSlotChange.emit();
    }
  }
  setListItemGroups() {
    this.listItemGroups = Array.from(this.el.querySelectorAll(listItemGroupSelector));
  }
  handleFilterActionsStartSlotChange(event) {
    this.hasFilterActionsStart = slotChangeHasAssignedElement(event);
  }
  handleFilterActionsEndSlotChange(event) {
    this.hasFilterActionsEnd = slotChangeHasAssignedElement(event);
  }
  handleFilterNoResultsSlotChange(event) {
    this.hasFilterNoResults = slotChangeHasAssignedElement(event);
  }
  setActiveListItem() {
    const { focusableItems } = this;
    if (!focusableItems.some((item) => item.active)) {
      if (focusableItems[0]) {
        focusableItems[0].active = true;
      }
    }
  }
  async updateSelectedItems(emit = false) {
    await this.updateComplete;
    this.selectedItems = this.visibleItems.filter((item) => item.selected);
    if (emit) {
      this.calciteListChange.emit();
    }
  }
  filterElements({ el, filteredItems, visibleParents }) {
    const filterHidden = !visibleParents.has(el) && !filteredItems.includes(el);
    el.filterHidden = filterHidden;
    const closestParent = el.parentElement.closest(parentSelector);
    if (!closestParent) {
      return;
    }
    if (!filterHidden) {
      visibleParents.add(closestParent);
    }
    this.filterElements({
      el: closestParent,
      filteredItems,
      visibleParents
    });
  }
  allParentListItemsExpanded(item) {
    const parentItem = item.parentElement?.closest(listItemSelector);
    if (!parentItem) {
      return true;
    } else if (!parentItem.expanded) {
      return false;
    }
    return this.allParentListItemsExpanded(parentItem);
  }
  borderItems() {
    const visibleItems = this.visibleItems.filter((item) => !item.filterHidden && this.allParentListItemsExpanded(item));
    visibleItems.forEach((item) => item.bordered = item !== visibleItems[visibleItems.length - 1]);
  }
  updateFilteredItems() {
    const { visibleItems, filteredData, filterText, filterPredicate } = this;
    const lastDescendantItems = visibleItems?.filter((listItem) => visibleItems.every((li) => li === listItem || !listItem.contains(li)));
    const filteredItems = filterPredicate ? visibleItems.filter(filterPredicate) : !filterText ? visibleItems || [] : filteredData.map((item) => item.el);
    const visibleParents = /* @__PURE__ */ new WeakSet();
    lastDescendantItems.forEach((listItem) => this.filterElements({ el: listItem, filteredItems, visibleParents }));
    this.filteredItems = filteredItems;
    if (this.willFilterEmit) {
      this.willFilterEmit = false;
      this.calciteListFilter.emit();
    }
  }
  updateFilteredData() {
    const { filterEl } = this;
    if (!filterEl) {
      return;
    }
    if (filterEl.filteredItems) {
      this.filteredData = filterEl.filteredItems;
    }
    this.updateListItemsDebounced();
  }
  async filterAndUpdateData() {
    await this.filterEl?.filter(this.filterText);
    this.updateFilteredData();
  }
  performFilter() {
    const { filterEl, filterText, effectiveFilterProps } = this;
    if (!filterEl) {
      return;
    }
    filterEl.value = filterText;
    filterEl.filterProps = effectiveFilterProps;
    this.filterAndUpdateData();
  }
  setDefaultSlotEl(el) {
    this.defaultSlotEl = el;
  }
  setFilterEl(el) {
    this.filterEl = el;
    this.performFilter();
  }
  handleFilterChange(event) {
    event.stopPropagation();
    const { value } = event.currentTarget;
    this.filterText = value;
    this.willFilterEmit = true;
    this.updateFilteredData();
  }
  getItemData() {
    return this.listItems.map((item) => ({
      label: item.label,
      description: item.description,
      metadata: item.metadata,
      heading: this.getGroupHeading(item),
      el: item
    }));
  }
  getGroupHeading(item) {
    const heading = this.listItemGroups.filter((group) => group.contains(item)).map((group) => group.heading);
    return heading;
  }
  updateGroupItems() {
    const { el, group, scale } = this;
    const rootNode = getRootNode(el);
    const lists = group ? Array.from(rootNode.querySelectorAll(`${listSelector}[group="${group}"]`)).filter((list) => !list.disabled && list.dragEnabled) : [];
    this.sortHandleMenuItems = lists.map((element) => ({
      element,
      label: element.label ?? element.id,
      id: guid()
    }));
    const groupItems = Array.from(this.el.querySelectorAll(listItemGroupSelector));
    groupItems.forEach((item) => {
      item.scale = scale;
    });
  }
  focusRow(focusEl) {
    const { focusableItems } = this;
    if (!focusEl) {
      return;
    }
    focusableItems.forEach((listItem) => listItem.active = listItem === focusEl);
    focusEl.setFocus();
  }
  isNavigable(listItem) {
    const parentListItemEl = listItem.parentElement?.closest(listItemSelector);
    if (!parentListItemEl) {
      return true;
    }
    return parentListItemEl.expanded && this.isNavigable(parentListItemEl);
  }
  handleListKeydown(event) {
    if (event.defaultPrevented || !!this.parentListEl) {
      return;
    }
    const { key } = event;
    const navigableItems = this.focusableItems.filter((listItem) => this.isNavigable(listItem));
    const currentIndex = navigableItems.findIndex((listItem) => listItem.active);
    if (key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = event.target === this.filterEl ? 0 : currentIndex + 1;
      if (navigableItems[nextIndex]) {
        this.focusRow(navigableItems[nextIndex]);
      }
    } else if (key === "ArrowUp") {
      event.preventDefault();
      if (currentIndex === 0 && this.filterEnabled) {
        this.filterEl.setFocus();
        return;
      }
      const prevIndex = currentIndex - 1;
      if (navigableItems[prevIndex]) {
        this.focusRow(navigableItems[prevIndex]);
      }
    } else if (key === "Home") {
      event.preventDefault();
      const homeItem = navigableItems[0];
      if (homeItem) {
        this.focusRow(homeItem);
      }
    } else if (key === "End") {
      event.preventDefault();
      const endItem = navigableItems[navigableItems.length - 1];
      if (endItem) {
        this.focusRow(endItem);
      }
    }
  }
  handleInteractionModeWarning() {
    if (this.interactionMode === "static" && this.selectionMode !== "none" && this.selectionAppearance === "border") {
      console.warn(`selection-appearance="border" requires interaction-mode="interactive"`);
    }
  }
  validateSortMenuItem({ fromEl, toEl, dragEl, newIndex, oldIndex, type }) {
    if (!fromEl || !toEl || toEl === fromEl || dragEl.contains(toEl)) {
      return false;
    }
    const canPull = fromEl.canPull?.({
      toEl,
      fromEl,
      dragEl,
      newIndex,
      oldIndex
    }) ?? true;
    const canPut = toEl.canPut?.({
      toEl,
      fromEl,
      dragEl,
      newIndex,
      oldIndex
    }) ?? true;
    return (type === "add" ? canPull === "clone" : canPull === true) && canPut;
  }
  handleAdd(event) {
    const { addTo } = event.detail;
    const dragEl = event.target;
    const fromEl = dragEl?.parentElement;
    const toEl = addTo.element;
    const fromElItems = Array.from(fromEl.children).filter(isListItem);
    const oldIndex = fromElItems.indexOf(dragEl);
    const newIndex = 0;
    if (!this.validateSortMenuItem({ type: "add", fromEl, toEl, dragEl, newIndex, oldIndex })) {
      return;
    }
    dragEl.sortHandleOpen = false;
    this.disconnectObserver();
    const newEl = dragEl.cloneNode();
    toEl.prepend(newEl);
    expandedAncestors(dragEl);
    this.updateListItemsDebounced();
    this.connectObserver();
    const eventDetail = {
      dragEl,
      fromEl,
      toEl,
      newIndex,
      oldIndex
    };
    this.calciteListOrderChange.emit(eventDetail);
    toEl.emitOrderChangeEvent(eventDetail);
  }
  handleMove(event) {
    const { moveTo } = event.detail;
    const dragEl = event.target;
    const fromEl = dragEl?.parentElement;
    const toEl = moveTo.element;
    const fromElItems = Array.from(fromEl.children).filter(isListItem);
    const oldIndex = fromElItems.indexOf(dragEl);
    const newIndex = 0;
    if (!this.validateSortMenuItem({ type: "move", fromEl, toEl, dragEl, newIndex, oldIndex })) {
      return;
    }
    dragEl.sortHandleOpen = false;
    this.disconnectObserver();
    toEl.prepend(dragEl);
    expandedAncestors(dragEl);
    this.updateListItemsDebounced();
    this.connectObserver();
    const eventDetail = {
      dragEl,
      fromEl,
      toEl,
      newIndex,
      oldIndex
    };
    this.calciteListOrderChange.emit(eventDetail);
    toEl.emitOrderChangeEvent(eventDetail);
  }
  handleReorder(event) {
    const { reorder } = event.detail;
    const dragEl = event.target;
    const parentEl = dragEl?.parentElement;
    if (!parentEl) {
      return;
    }
    dragEl.sortHandleOpen = false;
    const sameParentItems = Array.from(parentEl.children).filter(isListItem);
    const lastIndex = sameParentItems.length - 1;
    const oldIndex = sameParentItems.indexOf(dragEl);
    let newIndex = oldIndex;
    switch (reorder) {
      case "top":
        newIndex = 0;
        break;
      case "bottom":
        newIndex = lastIndex;
        break;
      case "up":
        newIndex = oldIndex === 0 ? 0 : oldIndex - 1;
        break;
      case "down":
        newIndex = oldIndex === lastIndex ? lastIndex : oldIndex + 1;
        break;
    }
    this.disconnectObserver();
    const referenceEl = reorder === "up" || reorder === "top" ? sameParentItems[newIndex] : sameParentItems[newIndex].nextSibling;
    parentEl.insertBefore(dragEl, referenceEl);
    this.updateListItemsDebounced();
    this.connectObserver();
    this.calciteListOrderChange.emit({
      dragEl,
      fromEl: parentEl,
      toEl: parentEl,
      newIndex,
      oldIndex
    });
  }
  render() {
    const { loading, label, disabled, dataForFilter, filterEnabled, filterPlaceholder, filterText, filterLabel, hasFilterActionsStart, hasFilterActionsEnd, effectiveFilterProps } = this;
    return this.interactiveContainer({ disabled: this.disabled, children: T`<div class=${safeClassMap({
      [CSS$a.container]: true,
      [CSS$a.containerHeight]: this.listItems.length < 1 && loading
    })}>${this.dragEnabled ? T`<span aria-live=assertive class=${safeClassMap(CSS$a.assistiveText)}>${this.assistiveText}</span>` : null}${this.renderItemAriaLive()}${loading ? T`<calcite-scrim class=${safeClassMap(CSS$a.scrim)} .loading=${loading}></calcite-scrim>` : null}<div .ariaBusy=${loading} .ariaLabel=${label || ""} class=${safeClassMap(CSS$a.table)} @keydown=${this.handleListKeydown} role=treegrid>${filterEnabled || hasFilterActionsStart || hasFilterActionsEnd ? T`<div class=${safeClassMap(CSS$a.sticky)} role=rowgroup><div role=row><div role=columnheader><calcite-stack class=${safeClassMap(CSS$a.stack)}><slot name=${SLOTS$5.filterActionsStart} @slotchange=${this.handleFilterActionsStartSlotChange} slot=${SLOTS$6.actionsStart}></slot><calcite-filter .ariaLabel=${filterPlaceholder} .disabled=${disabled} .filterProps=${effectiveFilterProps} .items=${dataForFilter} .label=${filterLabel} @calciteFilterChange=${this.handleFilterChange} .placeholder=${filterPlaceholder} .scale=${this.scale} .value=${filterText} ${n(this.setFilterEl)}></calcite-filter><slot name=${SLOTS$5.filterActionsEnd} @slotchange=${this.handleFilterActionsEndSlotChange} slot=${SLOTS$6.actionsEnd}></slot></calcite-stack></div></div></div>` : null}<div class=${safeClassMap(CSS$a.tableContainer)} role=rowgroup><slot @slotchange=${this.handleDefaultSlotChange} ${n(this.setDefaultSlotEl)}></slot></div></div><div aria-live=polite .hidden=${!this.showNoResultsContainer}><slot name=${SLOTS$5.filterNoResults} @slotchange=${this.handleFilterNoResultsSlotChange}></slot></div></div>` });
  }
  renderItemAriaLive() {
    const { messages, filteredItems, parentListEl, messages: { _lang: effectiveLocale }, numberingSystem } = this;
    numberStringFormatter.numberFormatOptions = {
      locale: effectiveLocale,
      numberingSystem
    };
    return !parentListEl ? T`<div aria-live=polite class=${safeClassMap(CSS$a.assistiveText)}>${this.hasActiveFilter ? i$2("aria-filter-enabled", T`<div>${messages.filterEnabled}</div>`) : null}${i$2("aria-item-count", T`<div>${messages.total.replace("{count}", numberStringFormatter.localize(filteredItems.length.toString()))}</div>`)}${filteredItems.length ? i$2("aria-item-list", T`<ol>${filteredItems.map((item) => T`<li>${item.label}</li>`)}</ol>`) : null}</div>` : null;
  }
};
_List.properties = { assistiveText: [16, {}, { state: true }], dataForFilter: [16, {}, { state: true }], hasFilterActionsEnd: [16, {}, { state: true }], hasFilterActionsStart: [16, {}, { state: true }], hasFilterNoResults: [16, {}, { state: true }], sortHandleMenuItems: [16, {}, { state: true }], canPull: [0, {}, { attribute: false }], canPut: [0, {}, { attribute: false }], disabled: [7, {}, { reflect: true, type: Boolean }], dragEnabled: [7, {}, { reflect: true, type: Boolean }], filterEnabled: [7, {}, { reflect: true, type: Boolean }], filterPredicate: [0, {}, { attribute: false }], filterLabel: [3, {}, { reflect: true }], filterPlaceholder: [3, {}, { reflect: true }], filterProps: [0, {}, { attribute: false }], filterText: [3, {}, { reflect: true }], filteredData: [0, {}, { attribute: false }], filteredItems: [0, {}, { attribute: false }], group: [3, {}, { reflect: true }], interactionMode: [3, {}, { reflect: true }], label: 1, loading: [7, {}, { reflect: true, type: Boolean }], messageOverrides: [0, {}, { attribute: false }], displayMode: [3, {}, { reflect: true }], numberingSystem: 1, scale: [3, {}, { reflect: true }], selectedItems: [0, {}, { attribute: false }], selectionAppearance: [3, {}, { reflect: true }], selectionMode: [3, {}, { reflect: true }], sortDisabled: [7, {}, { reflect: true, type: Boolean }] };
_List.styles = styles$b;
let List = _List;
customElement("calcite-list", List);
const index$a = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  List
});
const SLOTS$4 = {
  trigger: "trigger"
};
const CSS$9 = {
  content: "content",
  wrapper: "wrapper",
  triggerContainer: "trigger-container"
};
const idPrefix$1 = "calcite-dropdown";
const IDS$1 = {
  menuButton: (id) => `${idPrefix$1}-${id}-menubutton`,
  menu: (id) => `${idPrefix$1}-${id}-menu`
};
const styles$a = i`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-block}.wrapper{inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}@starting-style{.wrapper{opacity:0;inset-block-start:0;left:0}}:host([top-layer-disabled]) .wrapper{--calcite-floating-ui-z-index: var(--calcite-z-index-dropdown)}.wrapper[popover]{padding:0;margin:0;border:none;background-color:transparent;overflow:visible;display:none}.wrapper:popover-open{display:block}.wrapper .calcite-floating-ui-anim{position:relative;transition-duration:var(--calcite-floating-ui-transition);transition-property:inset-block-start,left,opacity,display;transition-behavior:allow-discrete;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.wrapper[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.wrapper[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.wrapper[data-placement^=left] .calcite-floating-ui-anim{left:5px}.wrapper[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.wrapper[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}@starting-style{.wrapper[data-placement] .calcite-floating-ui-anim--active{opacity:0}}.content{max-height:45vh;width:auto;overflow-y:auto;overflow-x:hidden;inline-size:var(--calcite-dropdown-width, var(--calcite-internal-dropdown-width));background-color:var(--calcite-dropdown-background-color, var(--calcite-color-foreground-1))}.trigger-container{position:relative;display:flex;height:100%;flex:1 1 auto;word-wrap:break-word;word-break:break-word}.width-s{--calcite-internal-dropdown-width: 12rem}.width-m{--calcite-internal-dropdown-width: 14rem}.width-l{--calcite-internal-dropdown-width: 16rem}@media(forced-colors:active){:host([open]) .wrapper{border:var(--calcite-border-width-sm) solid canvasText}}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
var __defProp$1 = Object.defineProperty;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = decorator(target, key, result) || result;
  if (result) __defProp$1(target, key, result);
  return result;
};
const _Dropdown = class _Dropdown extends LitElement {
  constructor() {
    super();
    this.focusLastDropdownItem = false;
    this.groups = [];
    this.guid = guid();
    this.items = [];
    this.mutationObserver = createObserver();
    this.transitionProp = "opacity";
    this.resizeObserver = createObserver();
    this.focusSetter = useSetFocus()(this);
    this.interactiveContainer = useInteractive(this);
    this.topLayer = useTopLayer({
      target: () => this.floatingEl
    })(this);
    this.closeOnSelectDisabled = false;
    this.disabled = false;
    this.maxItems = 0;
    this.offsetDistance = 0;
    this.offsetSkidding = 0;
    this.open = false;
    this.overlayPositioning = "absolute";
    this.placement = defaultMenuPlacement;
    this.scale = "m";
    this.selectedItems = [];
    this.topLayerDisabled = false;
    this.type = "click";
    this.calciteDropdownBeforeClose = createEvent({ cancelable: false });
    this.calciteDropdownBeforeOpen = createEvent({ cancelable: false });
    this.calciteDropdownClose = createEvent({ cancelable: false });
    this.calciteDropdownOpen = createEvent({ cancelable: false });
    this.calciteDropdownSelect = createEvent({ cancelable: false });
    this.listenOn(window, "click", this.closeCalciteDropdownOnClick);
    this.listen("calciteInternalDropdownCloseRequest", this.closeCalciteDropdownOnEvent);
    this.listenOn(window, "calciteDropdownOpen", this.closeCalciteDropdownOnOpenEvent);
    this.listen("pointerenter", this.pointerEnterHandler);
    this.listen("pointerleave", this.pointerLeaveHandler);
    this.listen("calciteInternalDropdownItemKeyEvent", this.calciteInternalDropdownItemKeyEvent);
    this.listen("calciteInternalDropdownItemSelect", this.handleItemSelect);
  }
  async reposition(delayed = false) {
    const { filteredFlipPlacements, floatingEl, offsetDistance, offsetSkidding, overlayPositioning, placement, referenceEl } = this;
    return reposition(this, {
      floatingEl,
      referenceEl,
      offsetDistance,
      offsetSkidding,
      overlayPositioning,
      placement,
      flipPlacements: filteredFlipPlacements,
      type: "menu"
    }, delayed);
  }
  async setFocus(options) {
    return this.focusSetter(() => this.referenceEl, options);
  }
  connectedCallback() {
    super.connectedCallback();
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.setFilteredPlacements();
    this.updateItems();
    connectFloatingUI(this);
  }
  willUpdate(changes) {
    if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
      this.openHandler();
    }
    if (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) {
      this.handleDisabledChange(this.disabled);
    }
    if (changes.has("flipPlacements")) {
      this.flipPlacementsHandler();
    }
    if (changes.has("maxItems") && this.hasUpdated) {
      this.setMaxScrollerHeight();
    }
    if (this.hasUpdated && (changes.has("offsetDistance") && this.offsetDistance !== 0 || changes.has("offsetSkidding") && this.offsetSkidding !== 0 || changes.has("overlayPositioning") && this.overlayPositioning !== "absolute" || changes.has("placement") && this.placement !== defaultMenuPlacement)) {
      this.reposition(true);
    }
    if (changes.has("scale") && (this.hasUpdated || this.scale !== "m")) {
      this.handlePropsChange();
    }
  }
  loaded() {
    this.updateSelectedItems();
    connectFloatingUI(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    disconnectFloatingUI(this);
  }
  openHandler() {
    if (this.disabled) {
      return;
    }
    toggleOpenClose(this);
    this.reposition(true);
  }
  handleDisabledChange(value) {
    if (!value) {
      this.open = false;
    }
  }
  flipPlacementsHandler() {
    this.setFilteredPlacements();
    this.reposition(true);
  }
  handlePropsChange() {
    this.updateItems();
    this.updateGroupProps();
  }
  closeCalciteDropdownOnClick(event) {
    if (this.disabled || !this.open || event.composedPath().includes(this.el)) {
      return;
    }
    this.closeCalciteDropdown(false);
  }
  closeCalciteDropdownOnEvent(event) {
    this.closeCalciteDropdown();
    event.stopPropagation();
  }
  closeCalciteDropdownOnOpenEvent(event) {
    if (event.composedPath().includes(this.el)) {
      return;
    }
    this.open = false;
  }
  pointerEnterHandler() {
    if (this.disabled || this.type !== "hover") {
      return;
    }
    this.toggleDropdown();
  }
  pointerLeaveHandler() {
    if (this.disabled || this.type !== "hover") {
      return;
    }
    this.closeCalciteDropdown();
  }
  getTraversableItems() {
    return this.items.filter((item) => !item.disabled && !item.hidden);
  }
  calciteInternalDropdownItemKeyEvent(event) {
    const { keyboardEvent } = event.detail;
    const target = keyboardEvent.target;
    const traversableItems = this.getTraversableItems();
    switch (keyboardEvent.key) {
      case "Tab":
        this.open = false;
        this.updateTabIndexOfItems(target);
        break;
      case "ArrowDown":
        focusElementInGroup(traversableItems, target, "next");
        break;
      case "ArrowUp":
        focusElementInGroup(traversableItems, target, "previous");
        break;
      case "Home":
        focusElementInGroup(traversableItems, target, "first");
        break;
      case "End":
        focusElementInGroup(traversableItems, target, "last");
        break;
    }
    event.stopPropagation();
  }
  handleItemSelect(event) {
    this.updateSelectedItems();
    event.stopPropagation();
    this.calciteDropdownSelect.emit();
    if (!this.closeOnSelectDisabled) {
      this.closeCalciteDropdown();
    }
  }
  setFilteredPlacements() {
    const { el, flipPlacements: flipPlacements2 } = this;
    this.filteredFlipPlacements = flipPlacements2 ? filterValidFlipPlacements(flipPlacements2, el) : null;
  }
  updateItems() {
    this.items = this.groups.map((group) => Array.from(group?.querySelectorAll("calcite-dropdown-item"))).reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);
    this.updateSelectedItems();
    this.reposition(true);
    this.items.forEach((item) => item.scale = this.scale);
  }
  updateGroups(event) {
    const groups = event.target.assignedElements({ flatten: true }).filter((el) => el?.matches("calcite-dropdown-group"));
    this.groups = groups;
    this.updateItems();
    this.updateGroupProps();
  }
  updateGroupProps() {
    this.groups.forEach((group, index2) => {
      group.scale = this.scale;
      group.position = index2;
    });
  }
  resizeObserverCallback(entries) {
    entries.forEach(({ target }) => {
      if (target === this.referenceEl) {
        this.setDropdownWidth();
      } else if (target === this.scrollerEl) {
        this.setMaxScrollerHeight();
      }
    });
  }
  setDropdownWidth() {
    const { referenceEl, scrollerEl } = this;
    if (!scrollerEl || !referenceEl) {
      return;
    }
    scrollerEl.style.minWidth = `${referenceEl.clientWidth}px`;
  }
  setMaxScrollerHeight() {
    const { maxItems, items, scrollerEl } = this;
    if (!scrollerEl) {
      return;
    }
    const maxScrollerHeight = items.length >= maxItems && maxItems > 0 ? this.getYDistanceFromScroller(items.at(maxItems - 1)) : 0;
    scrollerEl.style.maxBlockSize = maxScrollerHeight > 0 ? `${maxScrollerHeight}px` : "";
    this.reposition(true);
  }
  setScrollerAndTransitionEl(el) {
    updateRefObserver(this.resizeObserver, this.scrollerEl, el);
    this.scrollerEl = el;
    this.transitionEl = el;
  }
  onBeforeOpen() {
    this.focusOnFirstActiveOrDefaultItem();
    this.calciteDropdownBeforeOpen.emit();
    this.topLayer.show();
  }
  onOpen() {
    this.calciteDropdownOpen.emit();
  }
  onBeforeClose() {
    this.calciteDropdownBeforeClose.emit();
  }
  onClose() {
    this.calciteDropdownClose.emit();
    hideFloatingUI(this);
    this.topLayer.hide();
  }
  setReferenceEl(el) {
    updateRefObserver(this.resizeObserver, this.referenceEl, el);
    this.referenceEl = el;
    connectFloatingUI(this);
  }
  setFloatingEl(el) {
    this.floatingEl = el;
    connectFloatingUI(this);
  }
  keyDownHandler(event) {
    if (!event.composedPath().includes(this.referenceEl)) {
      return;
    }
    const { defaultPrevented, key } = event;
    if (defaultPrevented) {
      return;
    }
    if (key === "Escape") {
      this.closeCalciteDropdown();
      event.preventDefault();
      return;
    }
    if (this.open && event.shiftKey && key === "Tab") {
      this.closeCalciteDropdown();
      event.preventDefault();
      return;
    }
    if (isActivationKey(key)) {
      this.toggleDropdown();
      event.preventDefault();
    } else if (key === "ArrowDown" || key === "ArrowUp") {
      event.preventDefault();
      this.focusLastDropdownItem = key === "ArrowUp";
      this.open = true;
    }
  }
  updateSelectedItems() {
    this.selectedItems = this.items.filter((item) => item.selected);
  }
  getYDistanceFromScroller(last) {
    const style = last.getBoundingClientRect();
    return last.offsetTop + style.height;
  }
  closeCalciteDropdown(focusTrigger = true) {
    this.open = false;
    if (focusTrigger) {
      focusElement(this.triggerEls[0]);
    }
  }
  async focusOnFirstActiveOrDefaultItem() {
    const selectedItem = this.getTraversableItems().find((item) => item.selected);
    const target = selectedItem || (this.focusLastDropdownItem ? this.items.at(-1) : this.items[0]);
    this.focusLastDropdownItem = false;
    if (!target) {
      return;
    }
    await this.updateComplete;
    await nextFrame();
    await nextFrame();
    await focusElement(target);
    target.scrollIntoView({ block: "nearest" });
  }
  toggleDropdown() {
    this.open = !this.open;
  }
  updateTabIndexOfItems(target) {
    this.items.forEach((item) => {
      item.tabIndex = target !== item ? -1 : 0;
    });
  }
  render() {
    const { open, guid: guid2 } = this;
    return this.interactiveContainer({ disabled: this.disabled, children: T`<div class=${safeClassMap(CSS$9.triggerContainer)} id=${IDS$1.menuButton(guid2) ?? A} @click=${this.toggleDropdown} @keydown=${this.keyDownHandler} ${n(this.setReferenceEl)}><slot aria-controls=${IDS$1.menu(guid2) ?? A} .ariaExpanded=${open} aria-haspopup=menu name=${SLOTS$4.trigger}></slot></div><div .ariaHidden=${!open} class=${safeClassMap({
      [CSS$9.wrapper]: true,
      [getDimensionClass("width", this.width, this.widthScale)]: !!(this.width || this.widthScale)
    })} popover=manual ${n(this.setFloatingEl)}><div aria-labelledby=${IDS$1.menuButton(guid2) ?? A} class=${safeClassMap({
      [CSS$9.content]: true,
      [FloatingCSS.animation]: true,
      [FloatingCSS.animationActive]: open
    })} id=${IDS$1.menu(guid2) ?? A} role=menu ${n(this.setScrollerAndTransitionEl)}><slot @slotchange=${this.updateGroups}></slot></div></div>` });
  }
};
_Dropdown.properties = { closeOnSelectDisabled: [7, {}, { reflect: true, type: Boolean }], disabled: [7, {}, { reflect: true, type: Boolean }], flipPlacements: [0, {}, { attribute: false }], maxItems: [11, {}, { reflect: true, type: Number }], offsetDistance: [11, {}, { type: Number, reflect: true }], offsetSkidding: [11, {}, { reflect: true, type: Number }], open: [7, {}, { reflect: true, type: Boolean }], overlayPositioning: [3, {}, { reflect: true }], placement: [3, {}, { reflect: true }], scale: [3, {}, { reflect: true }], selectedItems: [0, {}, { attribute: false }], topLayerDisabled: [7, {}, { reflect: true, type: Boolean }], type: [3, {}, { reflect: true }], widthScale: [3, {}, { reflect: true }], width: [3, {}, { reflect: true }] };
_Dropdown.shadowRootOptions = { mode: "open", delegatesFocus: true };
_Dropdown.styles = styles$a;
let Dropdown = _Dropdown;
__decorateClass$1([
  o({ slot: SLOTS$4.trigger })
], Dropdown.prototype, "triggerEls");
customElement("calcite-dropdown", Dropdown);
const index$9 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Dropdown
});
const CSS$8 = {
  container: "container",
  containerNone: "container--none-selection",
  icon: "icon",
  iconEnd: "icon--end",
  iconStart: "icon--start",
  itemContent: "content",
  link: "link"
};
const ICONS$4 = {
  check: "check"
};
const styles$9 = i`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;flex-grow:1;align-items:center;outline:2px solid transparent;outline-offset:2px}.container{position:relative;display:flex;flex-grow:1;cursor:pointer;align-items:center;text-decoration-line:none;color:var(--calcite-dropdown-item-text-color, var(--calcite-color-text-1));text-align:start}.container a{outline:none;position:relative;display:flex;flex-grow:1;cursor:pointer;align-items:center;text-decoration-line:none;color:var(--calcite-dropdown-item-text-color, var(--calcite-color-text-1))}.content{flex:1 1 auto}.icon{position:relative;opacity:0;transition-timing-function:cubic-bezier(.4,0,.2,1);transform:scale(.9)}.icon--start,.icon--end{--calcite-icon-color: var(--calcite-dropdown-item-text-color, var(--calcite-color-text-3))}:host([scale=s]) .container{padding-block:.25rem;padding-inline:.5rem;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm)}:host([scale=s]) .icon,:host([scale=s]) .icon--start{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .icon--end{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=m]) .container{padding-block:.5rem;padding-inline:.75rem;font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base)}:host([scale=m]) .icon,:host([scale=m]) .icon--start{padding-inline-end:var(--calcite-spacing-md)}:host([scale=m]) .icon--end{padding-inline-start:var(--calcite-spacing-md)}:host([scale=l]) .container{padding-block:.625rem;padding-inline:1rem;font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md)}:host([scale=l]) .icon,:host([scale=l]) .icon--start{padding-inline-end:var(--calcite-spacing-lg)}:host([scale=l]) .icon--end{padding-inline-start:var(--calcite-spacing-lg)}:host(:focus) .container{text-decoration-line:none;outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}:host(:hover:not([disabled])) .container{background-color:var(--calcite-dropdown-item-background-color-hover, var(--calcite-color-foreground-2))}:host(:active:not([disabled])) .container{background-color:var(--calcite-dropdown-item-background-color-press, var(--calcite-color-foreground-3))}:host(:hover:not([disabled])) .container,:host(:active:not([disabled])) .container{text-decoration-line:none;color:var(--calcite-dropdown-item-text-color-press, var(--calcite-color-text-1))}:host(:hover:not([disabled])) .icon--start,:host(:hover:not([disabled])) .icon--end,:host(:active:not([disabled])) .icon--start,:host(:active:not([disabled])) .icon--end{--calcite-icon-color: var(--calcite-dropdown-item-text-color-press, var(--calcite-color-text-1))}:host(:hover:not([disabled])) .link,:host(:active:not([disabled])) .link{color:var(--calcite-dropdown-item-text-color-press, var(--calcite-color-text-1))}:host([selected]) .container:not(.container--none-selection),:host([selected]) .link{font-weight:var(--calcite-font-weight-medium);--calcite-internal-dropdown-item-text-color: var( --calcite-dropdown-item-text-color-press, var(--calcite-color-text-1) );color:var(--calcite-internal-dropdown-item-text-color)}:host([selected]) .container:not(.container--none-selection) .icon,:host([selected]) .link .icon{--calcite-icon-color: var(--calcite-dropdown-item-icon-color-press, var(--calcite-color-brand))}:host([selected]) .container:not(.container--none-selection) .icon--start,:host([selected]) .container:not(.container--none-selection) .icon--end,:host([selected]) .link .icon--start,:host([selected]) .link .icon--end{--calcite-icon-color: var(--calcite-internal-dropdown-item-text-color)}:host(:hover:not([disabled])) .icon{--calcite-icon-color: var(--calcite-dropdown-item-icon-color-hover)}:host([selected]) .icon{opacity:1}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}`;
const _DropdownItem = class _DropdownItem extends LitElement {
  constructor() {
    super();
    this.childLinkRef = e();
    this.focusSetter = useSetFocus()(this);
    this.interactiveContainer = useInteractive(this);
    this.disabled = false;
    this.scale = "m";
    this.selected = false;
    this.selectionMode = "single";
    this.calciteDropdownItemSelect = createEvent({ cancelable: false });
    this.calciteInternalDropdownCloseRequest = createEvent({ cancelable: false });
    this.calciteInternalDropdownItemKeyEvent = createEvent({ cancelable: false });
    this.calciteInternalDropdownItemSelect = createEvent({ cancelable: false });
    this.listen("click", this.onClick);
    this.listen("keydown", this.keyDownHandler);
    this.listenOn(document.body, "calciteInternalDropdownItemChange", this.updateActiveItemOnChange);
  }
  async setFocus(options) {
    return this.focusSetter(() => this.el, options);
  }
  connectedCallback() {
    super.connectedCallback();
    this.initialize();
  }
  load() {
    this.initialize();
  }
  onClick() {
    this.emitRequestedItem();
  }
  keyDownHandler(event) {
    switch (event.key) {
      case " ":
      case "Enter":
        this.emitRequestedItem();
        if (this.href) {
          this.childLinkRef.value.click();
        }
        event.preventDefault();
        break;
      case "Escape":
        this.calciteInternalDropdownCloseRequest.emit();
        event.preventDefault();
        break;
      case "Tab":
        this.calciteInternalDropdownItemKeyEvent.emit({ keyboardEvent: event });
        break;
      case "ArrowUp":
      case "ArrowDown":
      case "Home":
      case "End":
        event.preventDefault();
        this.calciteInternalDropdownItemKeyEvent.emit({ keyboardEvent: event });
        break;
    }
  }
  updateActiveItemOnChange(event) {
    const parentEmittedChange = event.composedPath().includes(this.parentDropdownGroupEl);
    if (parentEmittedChange) {
      this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
      this.requestedDropdownItem = event.detail.requestedDropdownItem;
      this.determineActiveItem();
    }
    event.stopPropagation();
  }
  initialize() {
    this.parentDropdownGroupEl = this.el.closest("calcite-dropdown-group");
    if (this.selectionMode === "none") {
      this.selected = false;
    }
  }
  determineActiveItem() {
    switch (this.selectionMode) {
      case "multiple":
        if (this.el === this.requestedDropdownItem) {
          this.selected = !this.selected;
        }
        break;
      case "single":
        if (this.el === this.requestedDropdownItem) {
          this.selected = true;
        } else if (this.requestedDropdownGroup === this.parentDropdownGroupEl) {
          this.selected = false;
        }
        break;
      case "none":
        this.selected = false;
        break;
    }
  }
  emitRequestedItem() {
    this.calciteDropdownItemSelect.emit();
    this.calciteInternalDropdownItemSelect.emit({
      requestedDropdownItem: this.el,
      requestedDropdownGroup: this.parentDropdownGroupEl
    });
  }
  render() {
    const { href, selectionMode, label, iconFlipRtl } = this;
    const iconStartEl = T`<calcite-icon class=${safeClassMap(CSS$8.iconStart)} .flipRtl=${iconFlipRtl === "start" || iconFlipRtl === "both"} .icon=${this.iconStart} .scale=${getIconScale(this.scale)}></calcite-icon>`;
    const contentNode = T`<span class=${safeClassMap(CSS$8.itemContent)}><slot></slot></span>`;
    const iconEndEl = T`<calcite-icon class=${safeClassMap(CSS$8.iconEnd)} .flipRtl=${iconFlipRtl === "end" || iconFlipRtl === "both"} .icon=${this.iconEnd} .scale=${getIconScale(this.scale)}></calcite-icon>`;
    const slottedContent = this.iconStart && this.iconEnd ? [iconStartEl, contentNode, iconEndEl] : this.iconStart ? [iconStartEl, contentNode] : this.iconEnd ? [contentNode, iconEndEl] : contentNode;
    const contentEl = !href ? slottedContent : T`<a .ariaLabel=${label} class=${safeClassMap(CSS$8.link)} href=${href ?? nothing} rel=${this.rel ?? nothing} tabindex=-1 target=${this.target ?? nothing} ${n(this.childLinkRef)}>${slottedContent}</a>`;
    const itemRole = href ? null : selectionMode === "single" ? "menuitemradio" : selectionMode === "multiple" ? "menuitemcheckbox" : "menuitem";
    const itemAria = selectionMode !== "none" ? toAriaBoolean(this.selected) : null;
    const { disabled } = this;
    this.el.ariaChecked = itemAria;
    this.el.ariaLabel = !href ? label : "";
    this.el.role = itemRole;
    setAttribute(this.el, "tabIndex", disabled ? -1 : 0);
    return this.interactiveContainer({ disabled, children: T`<div class=${safeClassMap({
      [CSS$8.container]: true,
      [CSS$8.containerNone]: selectionMode === "none"
    })}>${selectionMode !== "none" ? T`<calcite-icon class=${safeClassMap(CSS$8.icon)} .icon=${ICONS$4.check} .scale=${getIconScale(this.scale)}></calcite-icon>` : null}${contentEl}</div>` });
  }
};
_DropdownItem.properties = { disabled: [7, {}, { reflect: true, type: Boolean }], href: [3, {}, { reflect: true }], iconEnd: [3, { type: String }, { reflect: true }], iconFlipRtl: [3, {}, { reflect: true }], iconStart: [3, { type: String }, { reflect: true }], label: 1, rel: [3, {}, { reflect: true }], scale: [3, {}, { reflect: true }], selected: [7, {}, { reflect: true, type: Boolean }], selectionMode: 1, target: [3, {}, { reflect: true }] };
_DropdownItem.styles = styles$9;
let DropdownItem = _DropdownItem;
customElement("calcite-dropdown-item", DropdownItem);
const index$8 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  DropdownItem
});
const CSS$7 = {
  title: "title",
  firstTitle: "first-title",
  separator: "separator"
};
const styles$8 = i`:host{display:block}.container{text-align:start}.title{margin-block-end:-1px;display:block;cursor:default;overflow-wrap:break-word;border-width:0px;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-dropdown-group-title-text-color, var(--calcite-color-text-1))}.separator{display:block;block-size:1px;background-color:var(--calcite-dropdown-group-border-color, var(--calcite-color-border-3))}:host([scale=s]){font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-sm)}:host([scale=s]) .title{padding-block:var(--calcite-spacing-xxs);padding-inline:var(--calcite-spacing-sm)}:host([scale=s]) .first-title{padding-block-start:var(--calcite-spacing-sm)}:host([scale=s]) .separator{margin-block:var(--calcite-spacing-xxs);margin-inline:var(--calcite-spacing-sm)}:host([scale=m]){font-size:var(--calcite-font-size-relative-base);line-height:var(--calcite-font-line-height-base)}:host([scale=m]) .title{padding-block:var(--calcite-spacing-sm);padding-inline:var(--calcite-spacing-md)}:host([scale=m]) .first-title{padding-block-start:var(--calcite-spacing-lg)}:host([scale=m]) .separator{margin-block:var(--calcite-spacing-sm);margin-inline:var(--calcite-spacing-md)}:host([scale=l]){font-size:var(--calcite-font-size-relative-md);line-height:var(--calcite-font-line-height-md)}:host([scale=l]) .title{padding-block:var(--calcite-spacing-sm-plus);padding-inline:var(--calcite-spacing-lg)}:host([scale=l]) .first-title{padding-block-start:var(--calcite-spacing-xl)}:host([scale=l]) .separator{margin-block:var(--calcite-spacing-sm-plus);margin-inline:var(--calcite-spacing-lg)}:host([hidden]){display:none}[hidden]{display:none}`;
const _DropdownGroup = class _DropdownGroup extends LitElement {
  constructor() {
    super();
    this.mutationObserver = createObserver();
    this.position = -1;
    this.scale = "m";
    this.selectionMode = "single";
    this.calciteInternalDropdownItemChange = createEvent({ cancelable: false });
    this.listen("calciteInternalDropdownItemSelect", this.updateActiveItemOnChange);
  }
  connectedCallback() {
    super.connectedCallback();
    this.updateItems();
    this.mutationObserver?.observe(this.el, { childList: true });
  }
  willUpdate(changes) {
    if (changes.has("selectionMode") && (this.hasUpdated || this.selectionMode !== "single")) {
      this.updateItems();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.mutationObserver?.disconnect();
  }
  updateActiveItemOnChange(event) {
    this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
    this.requestedDropdownItem = event.detail.requestedDropdownItem;
    this.calciteInternalDropdownItemChange.emit({
      requestedDropdownGroup: this.requestedDropdownGroup,
      requestedDropdownItem: this.requestedDropdownItem
    });
  }
  updateItems() {
    Array.from(this.el.querySelectorAll("calcite-dropdown-item")).forEach((item) => item.selectionMode = this.selectionMode);
  }
  render() {
    const groupTitle = this.groupTitle ? T`<span aria-hidden=true class=${safeClassMap({ [CSS$7.title]: true, [CSS$7.firstTitle]: this.position === 0 })}>${this.groupTitle}</span>` : null;
    const dropdownSeparator = this.position > 0 ? T`<div class=${safeClassMap(CSS$7.separator)} role=separator></div>` : null;
    this.el.ariaLabel = this.groupTitle;
    this.el.role = "group";
    return T`<div class=${safeClassMap({
      [CSS$8.container]: true
    })}>${dropdownSeparator}${groupTitle}<slot></slot></div>`;
  }
};
_DropdownGroup.properties = { groupTitle: [3, {}, { reflect: true }], position: [9, {}, { type: Number }], scale: [3, {}, { reflect: true }], selectionMode: [3, {}, { reflect: true }] };
_DropdownGroup.shadowRootOptions = { mode: "open", delegatesFocus: true };
_DropdownGroup.styles = styles$8;
let DropdownGroup = _DropdownGroup;
customElement("calcite-dropdown-group", DropdownGroup);
const index$7 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  DropdownGroup
});
const styles$7 = i`:host(.calcite-sortable--chosen),:host(.calcite-sortable--drag),:host(.calcite-sortable--fallback),:host(.calcite-sortable--ghost){position:relative;overflow:hidden}:host(.calcite-sortable--ghost):before{content:"";position:absolute;inset-block:0px;inset-inline-start:0px;inset-inline-end:0px;z-index:var(--calcite-z-index);box-sizing:border-box;border-width:1px;border-style:dashed;border-color:var(--calcite-color-brand);background-color:var(--calcite-color-foreground-2)}:host(.calcite-sortable--drag){--tw-shadow: 0 6px 20px -4px rgba(0, 0, 0, .1), 0 4px 12px -2px rgba(0, 0, 0, .08);--tw-shadow-colored: 0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}`;
const CSS$6 = {
  actionsEnd: "actions-end",
  actionsStart: "actions-start",
  description: "description",
  close: "close",
  container: "container",
  containerHover: "container--hover",
  containerBorder: "container--border",
  containerBorderSelected: "container--border-selected",
  containerHighlightSelected: "container--highlight-selected",
  content: "content",
  contentBottom: "content-bottom",
  contentContainer: "content-container",
  contentContainerHasCenterContent: "content-container--has-center-content",
  contentContainerSelectable: "content-container--selectable",
  contentContainerUnavailable: "content-container--unavailable",
  contentContainerWrapper: "content-container-wrapper",
  contentContainerWrapperBordered: "content-container-wrapper--bordered",
  contentEnd: "content-end",
  contentStart: "content-start",
  customContent: "custom-content",
  expandedContainer: "expanded-container",
  dragContainer: "drag-container",
  gridCell: "grid-cell",
  icon: "icon",
  nestedContainer: "nested-container",
  nestedContainerExpanded: "nested-container--expanded",
  label: "label",
  row: "row",
  selectionContainer: "selection-container",
  selectionContainerSingle: "selection-container--single",
  wrapper: "wrapper",
  wrapperBordered: "wrapper--bordered"
};
const SLOTS$3 = {
  actionsStart: "actions-start",
  contentStart: "content-start",
  content: "content",
  contentBottom: "content-bottom",
  contentEnd: "content-end",
  actionsEnd: "actions-end"
};
const MAX_COLUMNS = 0;
const ICONS$3 = {
  selectedMultiple: "check-square-f",
  selectedSingle: "circle-inset-large",
  unselectedMultiple: "square",
  unselectedSingle: "circle",
  collapsedLTR: "chevron-right",
  collapsedRTL: "chevron-left",
  open: "chevron-down",
  blank: "blank",
  close: "x"
};
const activeCellTestAttribute = "data-test-active";
const styles$6 = i`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column}:host([scale=s]){--calcite-internal-list-action-spacing: var(--calcite-spacing-xxs)}:host([scale=m]){--calcite-internal-list-action-spacing: var(--calcite-spacing-xxs)}:host([scale=l]){--calcite-internal-list-action-spacing: var(--calcite-spacing-xs)}:host([filter-hidden]),:host([closed]){display:none}.wrapper--bordered{border-block-end:1px solid var(--calcite-list-border-color, var(--calcite-color-border-3))}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{box-sizing:border-box;display:flex;flex:1 1 0%;overflow:hidden;background-color:var(--calcite-list-background-color, var(--calcite-color-foreground-1))}.container *{box-sizing:border-box}.container--hover:hover{cursor:pointer;background-color:var(--calcite-list-background-color-hover, var(--calcite-color-foreground-2))}.container:active{background-color:var(--calcite-list-background-color-press, var(--calcite-color-foreground-3))}.container--border{position:relative}.container--border:before{position:absolute;inline-size:var(--calcite-border-width-lg);inset-block:0;inset-inline-start:0;background-color:transparent;content:""}.container--border-selected:before{background-color:var(--calcite-list-selection-border-color, var(--calcite-color-brand))}.container--border-selected:focus{box-shadow:inset var(--calcite-border-width-lg) 0 0 0 var(--calcite-list-selection-border-color, var(--calcite-color-brand))}.container--highlight-selected{background-color:var(--calcite-color-surface-highlight)}.nested-container{display:none;flex-direction:column;border-width:0px;border-style:solid;border-color:1px solid var(--calcite-list-border-color, var(--calcite-color-border-3));margin-inline-start:var(--calcite-list-spacing-indent, 1.5rem)}.nested-container--expanded{display:flex}.selection-container{display:flex;padding-block:0px;color:var(--calcite-list-icon-color, var(--calcite-color-border-input))}:host(:not([disabled]):not([selected])) .container:hover .selection-container--single{color:var(--calcite-list-icon-color, var(--calcite-color-border-input))}:host([selected]:hover) .selection-container,:host([selected]:hover) .selection-container--single,:host([selected]) .selection-container{color:var(--calcite-list-icon-color, var(--calcite-color-brand))}.content-container-wrapper{display:flex;flex:1 1 auto}.content-container-wrapper--bordered{border-block-end:1px solid var(--calcite-list-border-color, var(--calcite-color-border-3))}.content-container{display:flex;flex:1 1 auto;-webkit-user-select:none;user-select:none;align-items:stretch;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-list-content-text-color, var(--calcite-color-text-2))}.content-container--unavailable{opacity:var(--calcite-opacity-disabled)}.row,.grid-cell{outline-color:transparent}.row{position:relative}.row:focus,.grid-cell:focus{outline:var(--calcite-border-width-md) solid var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));outline-offset:calc(calc(-1 * var(--calcite-spacing-base)) * calc(1 - (2*clamp(0,var(--calcite-offset-invert-focus),1))))}.content,.custom-content{display:flex;flex:1 1 auto;flex-direction:column;justify-content:center;line-height:var(--calcite-font-line-height-relative-snug)}.label{color:var(--calcite-list-label-text-color, var(--calcite-color-text-1))}.description{color:var(--calcite-list-description-text-color, var(--calcite-color-text-3))}.icon{align-self:center;color:var(--calcite-list-icon-color, var(--calcite-color-text-3))}.icon:hover,.icon:active{color:var(--calcite-color-text-1)}.actions-start,.actions-end{margin-inline-end:var(--calcite-internal-list-action-spacing);gap:var(--calcite-internal-list-action-spacing)}:host([scale=s]) .content-container{gap:var(--calcite-spacing-sm);min-block-size:32px;padding-block:var(--calcite-spacing-xxs);padding-inline-end:var(--calcite-spacing-sm)}:host([scale=s]) .content,:host([scale=s]) .custom-content,:host([scale=s]) .label{font-size:var(--calcite-font-size--2)}:host([scale=s]) .description{font-size:var(--calcite-font-size--3)}:host([scale=s][display-mode=flat]:not([drag-handle])) .container{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=s][display-mode=flat]:not([drag-handle])) .selection-container{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=s][display-mode=flat][drag-handle]) .selection-container{padding-inline:var(--calcite-spacing-xxs) var(--calcite-spacing-sm)}:host([scale=s][display-mode=nested]) .selection-container{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=s][display-mode=nested][selection-appearance=icon]:not([selection-mode=none]):not([drag-handle])) .container{padding-inline-start:var(--calcite-spacing-sm)}:host([scale=s][display-mode=nested][selection-appearance=icon]:not([selection-mode=none]):not([drag-handle])) .selection-container{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=s][display-mode=nested][drag-handle]) .selection-container{padding-inline:var(--calcite-spacing-xxs)}:host([scale=m]) .content-container{gap:var(--calcite-spacing-sm);min-block-size:40px;padding-block:var(--calcite-spacing-sm);padding-inline-end:var(--calcite-spacing-md)}:host([scale=m]) .content,:host([scale=m]) .custom-content{font-size:var(--calcite-font-size--2)}:host([scale=m]) .label{font-size:var(--calcite-font-size--1)}:host([scale=m]) .description{font-size:var(--calcite-font-size--2)}:host([scale=m][display-mode=flat]) .container{padding-inline-start:var(--calcite-spacing-md)}:host([scale=m][display-mode=flat]) .selection-container{padding-inline-end:var(--calcite-spacing-sm)}:host([scale=m][display-mode=flat][drag-handle]) .container{padding-inline-start:0}:host([scale=m][display-mode=flat][drag-handle]) .selection-container{padding-inline:var(--calcite-spacing-xxs) var(--calcite-spacing-sm)}:host([scale=m][display-mode=nested]) .container{padding-inline-start:var(--calcite-spacing-xxs)}:host([scale=m][display-mode=nested]) .selection-container{padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=m][display-mode=nested][selection-appearance=icon]:not([selection-mode=none]):not([drag-handle])) .container{padding-inline-start:var(--calcite-spacing-md)}:host([scale=m][display-mode=nested][drag-handle]) .container{padding-inline-start:0}:host([scale=m][display-mode=nested][drag-handle]) .selection-container{padding-inline:var(--calcite-spacing-xxs)}:host([scale=l]) .content-container{gap:var(--calcite-spacing-md);min-block-size:56px;padding-block:.625rem;padding-inline-end:var(--calcite-spacing-lg)}:host([scale=l]) .content,:host([scale=l]) .custom-content,:host([scale=l]) .label{font-size:var(--calcite-font-size-0)}:host([scale=l]) .description{font-size:var(--calcite-font-size--1)}:host([scale=l]) .nested-container{margin-inline-start:1.75rem}:host([scale=l][display-mode=flat]) .container{padding-inline-start:var(--calcite-spacing-lg)}:host([scale=l][display-mode=flat]) .selection-container{padding-inline-end:var(--calcite-spacing-md)}:host([scale=l][display-mode=flat][drag-handle]) .container{padding-inline-start:0}:host([scale=l][display-mode=flat][drag-handle]) .selection-container{padding-inline-end:var(--calcite-spacing-md)}:host([scale=l][display-mode=nested]) .container{padding-inline-start:var(--calcite-spacing-xxs)}:host([scale=l][display-mode=nested][drag-handle]) .container{padding-inline-start:0}:host([scale=l][display-mode=nested][selection-appearance=icon]:not([selection-mode=none]):not([drag-handle])) .container{padding-inline-start:var(--calcite-spacing-lg)}.label,.description,.content-bottom{font-weight:var(--calcite-font-weight-normal);word-wrap:break-word;word-break:break-word}:host([selected]) .label{font-weight:var(--calcite-font-weight-medium)}:host([selected]) .icon{color:var(--calcite-list-icon-color, var(--calcite-color-text-1))}:host([selected]) .description{color:var(--calcite-list-description-text-color, var(--calcite-color-text-2))}.content-start{justify-content:flex-start}.content-end{justify-content:flex-end}.content-start,.content-end{flex:1 1 auto}.content-start ::slotted(calcite-icon),.content-end ::slotted(calcite-icon){align-self:center}.content-bottom{display:flex;flex-direction:column}.content-container--has-center-content .content-start,.content-container--has-center-content .content-end{flex:0 1 auto}.expanded-container{color:var(--calcite-list-icon-color, var(--calcite-color-text-3));padding-inline:var(--calcite-spacing-xxs)}:host(:not([disabled])) .expanded-container:hover{color:var(--calcite-list-icon-color, var(--calcite-color-text-1))}.actions-start,.actions-end,.content-start,.content-end,.selection-container,.drag-container,.expanded-container,.close{display:flex;align-items:center}.drag-container,.selection-container,.expanded-container{padding-block-end:var(--calcite-spacing-px)}.expanded-container,.selection-container{cursor:pointer}.actions-start,.actions-end{position:relative;padding:0}.actions-start ::slotted(calcite-action),.actions-start ::slotted(calcite-action-menu),.actions-start ::slotted(calcite-sort-handle),.actions-start ::slotted(calcite-dropdown),.actions-end ::slotted(calcite-action),.actions-end ::slotted(calcite-action-menu),.actions-end ::slotted(calcite-sort-handle),.actions-end ::slotted(calcite-dropdown){color:inherit}.row:focus:after,.row:focus:before{position:absolute;content:"";inline-size:.125rem;z-index:var(--calcite-z-index-header);background-color:var(--calcite-color-focus, var(--calcite-ui-focus-color, var(--calcite-color-brand)));inset-block:0}.row:focus:before{inset-inline-start:0}.row:focus:after{inset-inline-end:0}.container--border:focus:before{display:none}::slotted(calcite-list:empty){border-block-start-width:0px}.drag-container calcite-action,.drag-container ::slotted(calcite-action),.actions-start calcite-action,.actions-start ::slotted(calcite-action),.actions-end calcite-action,.actions-end ::slotted(calcite-action),.close calcite-action,.close ::slotted(calcite-action){align-items:center}.drag-container{margin-inline:var(--calcite-spacing-xxs)}:host([display-mode=nested]) .drag-container,:host([selection-appearance=icon]:not([selection-mode=none])) .drag-container{margin-inline:var(--calcite-spacing-xxs) 0}:host([hidden]){display:none}[hidden]{display:none}`;
const focusMap = /* @__PURE__ */ new Map();
const _ListItem = class _ListItem extends LitElement {
  constructor() {
    super();
    this.actionsEndRef = e();
    this.actionsStartRef = e();
    this.containerRef = e();
    this.contentRef = e();
    this.defaultSlotRef = e();
    this.handleGridRef = e();
    this.messages = useT9n();
    this.focusSetter = useSetFocus()(this);
    this.interactiveContainer = useInteractive(this);
    this.hasActionsEnd = false;
    this.hasActionsStart = false;
    this.hasContentBottom = false;
    this.hasContentEnd = false;
    this.hasContentStart = false;
    this.hasCustomContent = false;
    this.level = null;
    this.expandable = false;
    this.active = false;
    this.bordered = false;
    this.sortDisabled = false;
    this.closable = false;
    this.closed = false;
    this.disabled = false;
    this.dragDisabled = false;
    this.dragHandle = false;
    this.expanded = false;
    this.filterHidden = false;
    this.interactionMode = null;
    this.displayMode = "flat";
    this.addToItems = [];
    this.moveToItems = [];
    this.scale = "m";
    this.selected = false;
    this.selectionMode = null;
    this.sortHandleOpen = false;
    this.unavailable = false;
    this.topLayerDisabled = false;
    this.calciteInternalFocusPreviousItem = createEvent({ cancelable: false });
    this.calciteInternalListItemActive = createEvent({ cancelable: false });
    this.calciteInternalListItemChange = createEvent({ cancelable: false });
    this.calciteInternalListItemSelect = createEvent({ cancelable: false });
    this.calciteInternalListItemSelectMultiple = createEvent({ cancelable: false });
    this.calciteInternalListItemToggle = createEvent({ cancelable: false });
    this.calciteListItemClose = createEvent({ cancelable: false });
    this.calciteListItemCollapse = createEvent({ cancelable: false });
    this.calciteListItemExpand = createEvent({ cancelable: false });
    this.calciteListItemSelect = createEvent({ cancelable: false });
    this.calciteListItemSortHandleBeforeClose = createEvent({ cancelable: false });
    this.calciteListItemSortHandleBeforeOpen = createEvent({ cancelable: false });
    this.calciteListItemSortHandleClose = createEvent({ cancelable: false });
    this.calciteListItemSortHandleOpen = createEvent({ cancelable: false });
    this.calciteListItemToggle = createEvent({ cancelable: false });
    this.listen("calciteInternalListItemGroupDefaultSlotChange", this.handleCalciteInternalListDefaultSlotChanges);
    this.listen("calciteInternalListDefaultSlotChange", this.handleCalciteInternalListDefaultSlotChanges);
  }
  get open() {
    return this.expanded;
  }
  set open(value) {
    logger.deprecated("property", {
      component: this,
      name: "open",
      removalVersion: 5,
      suggested: "expanded"
    });
    this.expanded = value;
  }
  async setFocus(options) {
    return this.focusSetter(() => {
      const { containerRef, parentListEl } = this;
      const focusIndex = focusMap.get(parentListEl);
      if (typeof focusIndex === "number") {
        const cell = this.getGridCells()[focusIndex];
        if (cell) {
          this.focusCell(cell);
          return;
        }
      }
      return { target: containerRef.value, includeContainer: true, strategy: "focusable" };
    }, options);
  }
  connectedCallback() {
    super.connectedCallback();
    const { el } = this;
    this.parentListEl = el.closest(listSelector);
    this.level = getDepth() + 1;
    this.setSelectionDefaults();
  }
  willUpdate(changes) {
    if (changes.has("active") && (this.hasUpdated || this.active !== false)) {
      this.activeHandler(this.active);
    }
    if (changes.has("closed") && (this.hasUpdated || this.closed !== false)) {
      this.handleClosedChange();
    }
    if (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) {
      this.handleDisabledChange();
    }
    if (changes.has("selected") && (this.hasUpdated || this.selected !== false)) {
      this.handleSelectedChange();
    }
    if (changes.has("sortHandleOpen") && (this.hasUpdated || this.sortHandleOpen !== false)) {
      this.sortHandleOpenHandler();
    }
    if (changes.has("displayMode") && this.hasUpdated) {
      this.handleExpandableChange(this.defaultSlotRef.value);
    }
    if (changes.has("expanded") && this.hasUpdated) {
      if (this.expanded) {
        this.handleExpandedChange();
        this.calciteListItemExpand.emit();
      } else {
        this.calciteListItemCollapse.emit();
      }
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    focusMap.clear();
  }
  activeHandler(active) {
    if (!active) {
      this.focusCell(null, false);
    }
  }
  handleClosedChange() {
    this.emitCalciteInternalListItemChange();
  }
  handleDisabledChange() {
    this.emitCalciteInternalListItemChange();
  }
  handleExpandedChange() {
    this.emitCalciteInternalListItemToggle();
  }
  handleSelectedChange() {
    this.calciteInternalListItemSelect.emit();
  }
  sortHandleOpenHandler() {
    if (!this.sortHandleEl) {
      return;
    }
    this.sortHandleEl.open = this.sortHandleOpen;
  }
  handleCalciteInternalListDefaultSlotChanges(event) {
    event.stopPropagation();
    this.handleExpandableChange(this.defaultSlotRef.value);
  }
  setSortHandleEl(el) {
    this.sortHandleEl = el;
    this.sortHandleOpenHandler();
  }
  handleSortHandleBeforeOpen(event) {
    event.stopPropagation();
    this.calciteListItemSortHandleBeforeOpen.emit();
  }
  handleSortHandleBeforeClose(event) {
    event.stopPropagation();
    this.calciteListItemSortHandleBeforeClose.emit();
  }
  handleSortHandleClose(event) {
    event.stopPropagation();
    this.sortHandleOpen = false;
    this.calciteListItemSortHandleClose.emit();
  }
  handleSortHandleOpen(event) {
    event.stopPropagation();
    this.sortHandleOpen = true;
    this.calciteListItemSortHandleOpen.emit();
  }
  emitInternalListItemActive() {
    this.calciteInternalListItemActive.emit();
  }
  emitCalciteInternalListItemToggle() {
    this.calciteInternalListItemToggle.emit();
  }
  emitCalciteInternalListItemChange() {
    this.calciteInternalListItemChange.emit();
  }
  handleCloseClick() {
    this.closed = true;
    this.calciteListItemClose.emit();
  }
  handleContentSlotChange(event) {
    this.hasCustomContent = slotChangeHasAssignedElement(event);
  }
  handleActionsStartSlotChange(event) {
    this.hasActionsStart = slotChangeHasAssignedElement(event);
  }
  handleActionsEndSlotChange(event) {
    this.hasActionsEnd = slotChangeHasAssignedElement(event);
  }
  handleContentStartSlotChange(event) {
    this.hasContentStart = slotChangeHasAssignedElement(event);
  }
  handleContentEndSlotChange(event) {
    this.hasContentEnd = slotChangeHasAssignedElement(event);
  }
  handleContentBottomSlotChange(event) {
    this.hasContentBottom = slotChangeHasAssignedElement(event);
  }
  setSelectionDefaults() {
    const { parentListEl, selectionMode, selectionAppearance } = this;
    if (!parentListEl) {
      return;
    }
    if (!selectionMode) {
      this.selectionMode = parentListEl.selectionMode;
    }
    if (!selectionAppearance) {
      this.selectionAppearance = parentListEl.selectionAppearance;
    }
  }
  handleExpandableChange(slotEl) {
    if (!slotEl) {
      return;
    }
    const children = getListItemChildren(slotEl);
    children.lists.forEach((list) => {
      list.displayMode = this.displayMode;
    });
    this.expandable = this.displayMode === "nested" && (children.lists.length > 0 || children.items.length > 0);
  }
  handleDefaultSlotChange(event) {
    this.handleExpandableChange(event.target);
  }
  handleToggleClick() {
    this.toggle();
  }
  toggle(value = !this.expanded) {
    this.expanded = value;
    this.calciteListItemToggle.emit();
  }
  handleItemClick(event) {
    if (event.defaultPrevented) {
      return;
    }
    this.toggleSelected(event.shiftKey);
  }
  async toggleSelected(shiftKey) {
    const { selectionMode, selected } = this;
    if (this.disabled) {
      return;
    }
    if (selectionMode === "multiple" || selectionMode === "single") {
      this.selected = !selected;
    } else if (selectionMode === "single-persist") {
      this.selected = true;
    }
    this.calciteInternalListItemSelectMultiple.emit({
      selectMultiple: shiftKey && selectionMode === "multiple"
    });
    await this.updateComplete;
    this.calciteListItemSelect.emit();
  }
  getGridCells() {
    return [
      this.handleGridRef.value,
      this.actionsStartRef.value,
      this.contentRef.value,
      this.actionsEndRef.value
    ].filter((el) => el && !el.hidden);
  }
  handleItemKeyDown(event) {
    if (event.defaultPrevented) {
      return;
    }
    const { key } = event;
    const composedPath = event.composedPath();
    const { containerRef, actionsStartRef: { value: actionsStartEl }, actionsEndRef: { value: actionsEndEl }, expanded, expandable } = this;
    const cells = this.getGridCells();
    const currentIndex = cells.findIndex((cell) => composedPath.includes(cell));
    if (key === "Enter" && !composedPath.includes(actionsStartEl) && !composedPath.includes(actionsEndEl)) {
      event.preventDefault();
      this.toggleSelected(event.shiftKey);
    } else if (key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = currentIndex + 1;
      if (currentIndex === -1) {
        if (!expanded && expandable) {
          this.toggle(true);
          this.focusCell(null);
        } else if (cells[0]) {
          this.focusCell(cells[0]);
        }
      } else if (cells[currentIndex] && cells[nextIndex]) {
        this.focusCell(cells[nextIndex]);
      }
    } else if (key === "ArrowLeft") {
      event.preventDefault();
      const prevIndex = currentIndex - 1;
      if (currentIndex === -1) {
        this.focusCell(null);
        if (expanded && expandable) {
          this.toggle(false);
        } else {
          this.calciteInternalFocusPreviousItem.emit();
        }
      } else if (currentIndex === 0) {
        this.focusCell(null);
        containerRef.value.focus();
      } else if (cells[currentIndex] && cells[prevIndex]) {
        this.focusCell(cells[prevIndex]);
      }
    }
  }
  focusCellNull() {
    this.focusCell(null);
  }
  setFocusCell(focusEl, focusedEl, saveFocusIndex) {
    const { parentListEl } = this;
    if (saveFocusIndex) {
      focusMap.set(parentListEl, null);
    }
    const gridCells = this.getGridCells();
    gridCells.forEach((tableCell) => {
      tableCell.removeAttribute("tabindex");
      tableCell.removeAttribute(activeCellTestAttribute);
    });
    if (!focusEl) {
      return;
    }
    if (focusEl === focusedEl) {
      focusEl.tabIndex = 0;
    } else {
      focusEl.removeAttribute("tabindex");
    }
    focusEl.setAttribute(activeCellTestAttribute, "");
    if (saveFocusIndex) {
      focusMap.set(parentListEl, gridCells.indexOf(focusEl));
    }
  }
  focusCell(focusEl, saveFocusIndex = true) {
    const focusedEl = getFirstTabbable(focusEl);
    this.setFocusCell(focusEl, focusedEl, saveFocusIndex);
    focusedEl?.focus();
  }
  renderSelected() {
    const { selected, selectionMode, selectionAppearance } = this;
    if (selectionMode === "none" || selectionAppearance !== "icon") {
      return null;
    }
    return i$2("selection-container", T`<div class=${safeClassMap({
      [CSS$6.selectionContainer]: true,
      [CSS$6.selectionContainerSingle]: selectionMode === "single" || selectionMode === "single-persist"
    })} @click=${this.handleItemClick}><calcite-icon .icon=${selected ? selectionMode === "multiple" ? ICONS$3.selectedMultiple : ICONS$3.selectedSingle : selectionMode === "multiple" ? ICONS$3.unselectedMultiple : ICONS$3.unselectedSingle} .scale=${getIconScale(this.scale)}></calcite-icon></div>`);
  }
  renderDragHandle() {
    const { label, dragHandle, dragDisabled, setPosition, setSize, moveToItems, sortDisabled, addToItems } = this;
    return dragHandle ? i$2("drag-handle-container", T`<div .ariaLabel=${label} class=${safeClassMap({ [CSS$6.dragContainer]: true, [CSS$6.gridCell]: true })} role=gridcell ${n(this.handleGridRef)}><calcite-sort-handle .addToItems=${addToItems} .disabled=${dragDisabled} .label=${label} .moveToItems=${moveToItems} @calciteSortHandleBeforeClose=${this.handleSortHandleBeforeClose} @calciteSortHandleBeforeOpen=${this.handleSortHandleBeforeOpen} @calciteSortHandleClose=${this.handleSortHandleClose} @calciteSortHandleOpen=${this.handleSortHandleOpen} overlay-positioning=fixed .scale=${this.scale} .setPosition=${setPosition} .setSize=${setSize} .sortDisabled=${sortDisabled} .topLayerDisabled=${this.topLayerDisabled} ${n(this.setSortHandleEl)}></calcite-sort-handle></div>`) : null;
  }
  renderExpanded() {
    const { el, expanded, expandable, messages, displayMode, scale } = this;
    if (displayMode !== "nested") {
      return null;
    }
    const dir = getElementDir(el);
    const icon = expandable ? expanded ? ICONS$3.open : dir === "rtl" ? ICONS$3.collapsedRTL : ICONS$3.collapsedLTR : ICONS$3.blank;
    const iconScale = getIconScale(scale);
    const tooltip = expandable ? expanded ? messages.collapse : messages.expand : void 0;
    const expandedClickHandler = expandable ? this.handleToggleClick : void 0;
    return i$2("expanded-container", T`<div class=${safeClassMap(CSS$6.expandedContainer)} @click=${expandedClickHandler} title=${tooltip ?? A}>${i$2(icon, T`<calcite-icon .icon=${icon} .scale=${iconScale}></calcite-icon>`)}</div>`);
  }
  renderActionsStart() {
    const { label, hasActionsStart } = this;
    return i$2("actions-start-container", T`<div .ariaLabel=${label} class=${safeClassMap({ [CSS$6.actionsStart]: true, [CSS$6.gridCell]: true })} .hidden=${!hasActionsStart} role=gridcell ${n(this.actionsStartRef)}><slot name=${SLOTS$3.actionsStart} @slotchange=${this.handleActionsStartSlotChange}></slot></div>`);
  }
  renderActionsEnd() {
    const { label, hasActionsEnd, closable, messages } = this;
    return i$2("actions-end-container", T`<div .ariaLabel=${label} class=${safeClassMap({ [CSS$6.actionsEnd]: true, [CSS$6.gridCell]: true })} .hidden=${!(hasActionsEnd || closable)} role=gridcell ${n(this.actionsEndRef)}><slot name=${SLOTS$3.actionsEnd} @slotchange=${this.handleActionsEndSlotChange}></slot>${closable ? i$2("close-action", T`<calcite-action class=${safeClassMap(CSS$6.close)} .icon=${ICONS$3.close} .label=${messages.close} @click=${this.handleCloseClick} .scale=${this.scale} .text=${messages.close}></calcite-action>`) : null}</div>`);
  }
  renderContentStart() {
    const { hasContentStart } = this;
    return T`<div class=${safeClassMap(CSS$6.contentStart)} .hidden=${!hasContentStart}><slot name=${SLOTS$3.contentStart} @slotchange=${this.handleContentStartSlotChange}></slot></div>`;
  }
  renderCustomContent() {
    const { hasCustomContent } = this;
    return T`<div class=${safeClassMap(CSS$6.customContent)} .hidden=${!hasCustomContent}><slot name=${SLOTS$3.content} @slotchange=${this.handleContentSlotChange}></slot></div>`;
  }
  renderIconStart() {
    const { iconStart, iconFlipRtl, scale } = this;
    return iconStart ? i$2("icon-start", T`<calcite-icon class=${safeClassMap(CSS$6.icon)} .flipRtl=${iconFlipRtl === "both" || iconFlipRtl === "start"} .icon=${iconStart} .scale=${getIconScale(scale)}></calcite-icon>`) : null;
  }
  renderIconEnd() {
    const { iconEnd, iconFlipRtl, scale } = this;
    return iconEnd ? i$2("icon-end", T`<calcite-icon class=${safeClassMap(CSS$6.icon)} .flipRtl=${iconFlipRtl === "both" || iconFlipRtl === "end"} .icon=${iconEnd} .scale=${getIconScale(scale)}></calcite-icon>`) : null;
  }
  renderContentEnd() {
    const { hasContentEnd } = this;
    return T`<div class=${safeClassMap(CSS$6.contentEnd)} .hidden=${!hasContentEnd}><slot name=${SLOTS$3.contentEnd} @slotchange=${this.handleContentEndSlotChange}></slot></div>`;
  }
  renderContentBottom() {
    const { hasContentBottom } = this;
    return T`<div class=${safeClassMap(CSS$6.contentBottom)} .hidden=${!hasContentBottom}><slot name=${SLOTS$3.contentBottom} @slotchange=${this.handleContentBottomSlotChange}></slot></div>`;
  }
  renderDefaultContainer() {
    return T`<div class=${safeClassMap({
      [CSS$6.nestedContainer]: true,
      [CSS$6.nestedContainerExpanded]: this.expandable && this.expanded
    })}><slot @slotchange=${this.handleDefaultSlotChange} ${n(this.defaultSlotRef)}></slot></div>`;
  }
  renderContentProperties() {
    const { label, description, hasCustomContent } = this;
    return !hasCustomContent && (!!label || !!description) ? i$2("content", T`<div class=${safeClassMap(CSS$6.content)}>${label ? i$2("label", T`<div class=${safeClassMap(CSS$6.label)}>${label}</div>`) : null}${description ? i$2("description", T`<div class=${safeClassMap(CSS$6.description)}>${description}</div>`) : null}</div>`) : null;
  }
  renderContentContainer() {
    const { description, label, selectionMode, hasCustomContent, unavailable } = this;
    const hasCenterContent = hasCustomContent || !!label || !!description;
    const content = [
      this.renderContentStart(),
      this.renderIconStart(),
      this.renderCustomContent(),
      this.renderContentProperties(),
      this.renderIconEnd(),
      this.renderContentEnd()
    ];
    return i$2("content-container", T`<div .ariaLabel=${label} class=${safeClassMap({
      [CSS$6.gridCell]: true,
      [CSS$6.contentContainer]: true,
      [CSS$6.contentContainerUnavailable]: unavailable,
      [CSS$6.contentContainerSelectable]: selectionMode !== "none",
      [CSS$6.contentContainerHasCenterContent]: hasCenterContent
    })} @click=${this.handleItemClick} role=gridcell ${n(this.contentRef)}>${content}</div>`);
  }
  render() {
    const { expandable, expanded, level, active, label, selected, selectionAppearance, selectionMode, interactionMode, closed, filterHidden, bordered, disabled, hasContentBottom } = this;
    const wrapperBordered = bordered && hasContentBottom;
    const contentContainerWrapperBordered = bordered && !hasContentBottom;
    const showSelectionBorder = selectionMode !== "none" && selectionAppearance === "border";
    const showSelectionHighlight = selectionMode !== "none" && selectionAppearance === "highlight";
    const containerInteractive = interactionMode === "interactive" || interactionMode === "static" && selectionMode !== "none" && selectionAppearance === "border";
    return this.interactiveContainer({ disabled, children: T`<div class=${safeClassMap({ [CSS$6.wrapper]: true, [CSS$6.wrapperBordered]: wrapperBordered })}><div .ariaExpanded=${expandable ? expanded : null} .ariaLabel=${label} .ariaLevel=${level} .ariaSelected=${selected} class=${safeClassMap({
      [CSS$6.row]: true,
      [CSS$6.container]: true,
      [CSS$6.containerHover]: containerInteractive,
      [CSS$6.containerBorder]: showSelectionBorder,
      [CSS$6.containerBorderSelected]: showSelectionBorder && selected,
      [CSS$6.containerHighlightSelected]: showSelectionHighlight && selected
    })} .hidden=${closed || filterHidden} @focus=${this.focusCellNull} @focusin=${this.emitInternalListItemActive} @keydown=${this.handleItemKeyDown} role=row .tabIndex=${active ? 0 : -1} ${n(this.containerRef)}>${this.renderDragHandle()}${this.renderSelected()}${this.renderExpanded()}<div class=${safeClassMap({
      [CSS$6.contentContainerWrapper]: true,
      [CSS$6.contentContainerWrapperBordered]: contentContainerWrapperBordered
    })}>${this.renderActionsStart()}${this.renderContentContainer()}${this.renderActionsEnd()}</div></div>${this.renderContentBottom()}</div>${this.renderDefaultContainer()}` });
  }
};
_ListItem.properties = { hasActionsEnd: [16, {}, { state: true }], hasActionsStart: [16, {}, { state: true }], hasContentBottom: [16, {}, { state: true }], hasContentEnd: [16, {}, { state: true }], hasContentStart: [16, {}, { state: true }], hasCustomContent: [16, {}, { state: true }], level: [16, {}, { state: true }], expandable: [16, {}, { state: true }], parentListEl: [16, {}, { state: true }], active: [5, {}, { type: Boolean }], bordered: [5, {}, { type: Boolean }], sortDisabled: [5, {}, { type: Boolean }], closable: [7, {}, { reflect: true, type: Boolean }], closed: [7, {}, { reflect: true, type: Boolean }], description: 1, disabled: [7, {}, { reflect: true, type: Boolean }], dragDisabled: [7, {}, { reflect: true, type: Boolean }], dragHandle: [7, {}, { reflect: true, type: Boolean }], expanded: [7, {}, { reflect: true, type: Boolean }], filterHidden: [7, {}, { reflect: true, type: Boolean }], interactionMode: 1, label: 1, messageOverrides: [0, {}, { attribute: false }], metadata: [0, {}, { attribute: false }], displayMode: [3, {}, { reflect: true }], addToItems: [0, {}, { attribute: false }], moveToItems: [0, {}, { attribute: false }], open: [7, {}, { reflect: true, type: Boolean }], scale: [3, {}, { reflect: true }], selected: [7, {}, { reflect: true, type: Boolean }], selectionAppearance: [3, {}, { reflect: true }], selectionMode: [3, {}, { reflect: true }], setPosition: [9, {}, { type: Number }], setSize: [9, {}, { type: Number }], sortHandleOpen: [7, {}, { reflect: true, type: Boolean }], unavailable: [7, {}, { reflect: true, type: Boolean }], value: 1, iconStart: [3, { type: String }, { reflect: true }], iconEnd: [3, { type: String }, { reflect: true }], iconFlipRtl: [3, {}, { reflect: true }], topLayerDisabled: [7, {}, { reflect: true, type: Boolean }] };
_ListItem.styles = [styles$6, styles$7];
let ListItem = _ListItem;
customElement("calcite-list-item", ListItem);
const index$6 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ListItem
});
const SLOTS$2 = {
  menuActions: "menu-actions",
  menuTooltip: "menu-tooltip"
};
const ICONS$2 = {
  menu: "ellipsis"
};
const CSS$5 = {
  container: "container"
};
function isActionGroup(el) {
  return el?.tagName === "CALCITE-ACTION-GROUP";
}
const styles$5 = i`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([scale=s]){--calcite-internal-action-group-gap: var(--calcite-spacing-xxs)}:host([scale=m]){--calcite-internal-action-group-gap: var(--calcite-spacing-sm)}:host([scale=l]){--calcite-internal-action-group-gap: var(--calcite-spacing-sm-plus)}:host{display:flex;flex-direction:column;padding:0;background-color:transparent;border-color:var(--calcite-action-group-border-color, var(--calcite-color-border-3));border-style:solid;border-width:0;gap:var(--calcite-internal-action-group-gap)}.container{display:flex;flex-grow:1;flex-direction:column;gap:inherit}:host([columns="1"]){--calcite-internal-action-group-columns: 1}:host([columns="2"]){--calcite-internal-action-group-columns: 2}:host([columns="3"]){--calcite-internal-action-group-columns: 3}:host([columns="4"]){--calcite-internal-action-group-columns: 4}:host([columns="5"]){--calcite-internal-action-group-columns: 5}:host([columns="6"]){--calcite-internal-action-group-columns: 6}:host(:first-child){padding-block-start:0px}:host([layout=horizontal]),:host([layout=horizontal]) .container{flex-direction:row}:host([layout=grid]){display:grid}:host([layout=grid]) .container{display:grid;place-content:stretch;background-color:transparent;gap:var(--calcite-action-group-gap, var(--calcite-internal-action-group-gap));grid-template-columns:repeat(var(--calcite-action-group-columns, var(--calcite-internal-action-group-columns, 3)),auto);padding:var(--calcite-action-group-gap, 1px)}:host([layout=horizontal]) ::slotted(calcite-action-group){border-inline-end:var(--calcite-size-px)}:host([hidden]){display:none}[hidden]{display:none}`;
var __defProp = Object.defineProperty;
var __decorateClass = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = decorator(target, key, result) || result;
  if (result) __defProp(target, key, result);
  return result;
};
const _ActionGroup = class _ActionGroup extends LitElement {
  constructor() {
    super();
    this.messages = useT9n();
    this.focusSetter = useSetFocus()(this);
    this.hasMenuActions = false;
    this.expanded = false;
    this.layout = "vertical";
    this.menuOpen = false;
    this.overlayPositioning = "absolute";
    this.scale = "m";
    this.selectionMode = "none";
    this.topLayerDisabled = false;
    this.calciteActionGroupCollapse = createEvent({ cancelable: false });
    this.calciteActionGroupExpand = createEvent({ cancelable: false });
    this.listen("click", this.handleActionClick);
  }
  async setFocus(options) {
    return this.focusSetter(() => this.el, options);
  }
  willUpdate(changes) {
    if (this.hasUpdated || changes.has("selectionMode")) {
      if (this.selectionMode !== "none") {
        this.setRoleOnActions();
      } else if (this.selectionMode === "none") {
        this.clearActionAriaAttributes();
      }
    }
    if (changes.has("expanded")) {
      if (this.hasUpdated || this.expanded !== false) {
        this.menuOpen = false;
      }
      if (this.hasUpdated) {
        if (this.expanded) {
          this.calciteActionGroupExpand.emit();
        } else {
          this.calciteActionGroupCollapse.emit();
        }
      }
    }
  }
  setActiveAction(index2, active) {
    if (this.selectionMode === "multiple") {
      active.active = !active.active;
      this.setActionAriaChecked(active, active.active);
      return;
    }
    if (this.selectionMode === "single") {
      this.actions.forEach((action, i2) => {
        action.active = i2 === index2 && !action.active;
        this.setActionAriaChecked(action, action.active);
      });
      return;
    }
    if (this.selectionMode === "single-persist") {
      if (!this.actions[index2].active) {
        this.actions.forEach((action, i2) => {
          action.active = i2 === index2;
          this.setActionAriaChecked(action, action.active);
        });
      }
      return;
    }
  }
  setMenuOpen(event) {
    this.menuOpen = !!event.currentTarget.open;
  }
  handleMenuActionsSlotChange(event) {
    this.hasMenuActions = slotChangeHasAssignedElement(event);
  }
  handleActionClick(event) {
    const target = event.target;
    if (!target) {
      return;
    }
    const index2 = this.actions.indexOf(target);
    if (index2 === -1 || this.selectionMode === "none") {
      return;
    }
    this.setActiveAction(index2, target);
  }
  setRoleOnActions() {
    this.actions.forEach((action) => {
      action.aria = {
        ...action.aria,
        role: this.selectionMode === "single" || this.selectionMode === "single-persist" ? "radio" : "checkbox"
      };
      this.setActionAriaChecked(action, action.active);
    });
  }
  setActionAriaChecked(action, checked) {
    action.aria = {
      ...action.aria,
      checked: checked ? "true" : "false"
    };
  }
  clearActionAriaAttributes() {
    if (this.selectionMode === "none") {
      this.actions.forEach((action) => {
        if (action.aria) {
          action.aria.checked = void 0;
          action.aria.role = void 0;
          action.aria = { ...action.aria };
        }
      });
    }
  }
  renderMenu() {
    const { expanded, menuOpen, scale, layout, messages, overlayPositioning, hasMenuActions, menuFlipPlacements, menuPlacement } = this;
    return T`<calcite-action-menu .expanded=${expanded} .flipPlacements=${menuFlipPlacements ?? (layout === "horizontal" ? ["top", "bottom"] : ["left", "right"])} .hidden=${!hasMenuActions} .label=${messages.more} @calciteActionMenuOpen=${this.setMenuOpen} .open=${menuOpen} .overlayPositioning=${overlayPositioning} .placement=${menuPlacement ?? (layout === "horizontal" ? "bottom-start" : "leading-start")} .scale=${scale} .topLayerDisabled=${this.topLayerDisabled}><calcite-action .aria=${{ expanded }} .icon=${ICONS$2.menu} .scale=${scale} slot=${SLOTS$c.trigger} .text=${messages.more} .textEnabled=${expanded}></calcite-action><slot name=${SLOTS$2.menuActions} @slotchange=${this.handleMenuActionsSlotChange}></slot><slot name=${SLOTS$2.menuTooltip} slot=${SLOTS$c.tooltip}></slot></calcite-action-menu>`;
  }
  render() {
    return T`<div .ariaLabel=${this.label} class=${safeClassMap(CSS$5.container)} .role=${this.selectionMode === "multiple" || this.selectionMode === "none" ? "group" : "radiogroup"}><slot></slot>${this.renderMenu()}</div>`;
  }
};
_ActionGroup.properties = { hasMenuActions: [16, {}, { state: true }], columns: [11, {}, { type: Number, reflect: true }], expanded: [7, {}, { reflect: true, type: Boolean }], label: 1, layout: [3, {}, { reflect: true }], menuFlipPlacements: [0, {}, { attribute: false }], menuOpen: [7, {}, { reflect: true, type: Boolean }], menuPlacement: [3, {}, { reflect: true }], messageOverrides: [0, {}, { attribute: false }], overlayPositioning: [3, {}, { reflect: true }], scale: [3, {}, { reflect: true }], selectionMode: [3, {}, { reflect: true }], topLayerDisabled: [7, {}, { reflect: true, type: Boolean }] };
_ActionGroup.shadowRootOptions = { mode: "open", delegatesFocus: true };
_ActionGroup.styles = styles$5;
let ActionGroup = _ActionGroup;
__decorateClass([
  o({ selector: "calcite-action" })
], ActionGroup.prototype, "actions");
customElement("calcite-action-group", ActionGroup);
const index$5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ActionGroup
});
const queryActions = (el) => {
  return Array.from(el.querySelectorAll("calcite-action")).filter(
    (action) => action.closest("calcite-action-menu") ? action.slot === SLOTS$c.trigger : true
  );
};
const overflowActions = ({
  actionGroups,
  expanded,
  overflowCount
}) => {
  let needToSlotCount = overflowCount;
  actionGroups.reverse().forEach((group) => {
    let slottedWithinGroupCount = 0;
    const directGroupActions = queryActions(group).filter((action) => isActionGroup(action.parentElement)).reverse();
    directGroupActions.forEach((groupAction) => {
      if (groupAction.slot === SLOTS$2.menuActions) {
        groupAction.removeAttribute("slot");
        groupAction.textEnabled = expanded;
      }
    });
    if (needToSlotCount > 0) {
      directGroupActions.some((groupAction) => {
        const unslottedActions = directGroupActions.filter((action) => !action.slot);
        if (unslottedActions.length > 1 && directGroupActions.length > 2 && !groupAction.closest("calcite-action-menu")) {
          groupAction.textEnabled = true;
          groupAction.setAttribute("slot", SLOTS$2.menuActions);
          slottedWithinGroupCount++;
          if (slottedWithinGroupCount > 1) {
            needToSlotCount--;
          }
        }
        return needToSlotCount < 1;
      });
    }
    group.manager.component.requestUpdate();
  });
};
const ICONS$1 = {
  chevronsLeft: "chevrons-left",
  chevronsRight: "chevrons-right"
};
function getCalcitePosition(position, el) {
  return position || el.closest("calcite-shell-panel")?.position || "start";
}
function toggleChildActionText({ el, expanded }) {
  queryActions(el).filter((el2) => el2.slot !== SLOTS$2.menuActions).forEach((action) => action.textEnabled = expanded);
  el.querySelectorAll("calcite-action-group, calcite-action-menu").forEach((el2) => el2.expanded = expanded);
}
const setTooltipReference = ({ tooltip, referenceElement, expanded, ref: ref2 }) => {
  if (tooltip) {
    tooltip.referenceElement = !expanded && referenceElement ? referenceElement : null;
  }
  if (ref2) {
    ref2(referenceElement);
  }
  return referenceElement;
};
const ExpandToggle = ({ expanded, expandText, collapseText, expandLabel, collapseLabel, toggle, el, position, tooltip, ref: ref$1, scale }) => {
  const rtl = getElementDir(el) === "rtl";
  const text = expanded ? collapseText : expandText;
  const label = expanded ? collapseLabel : expandLabel;
  const icons = [ICONS$1.chevronsLeft, ICONS$1.chevronsRight];
  if (rtl) {
    icons.reverse();
  }
  const end = getCalcitePosition(position, el) === "end";
  const expandIcon = end ? icons[1] : icons[0];
  const collapseIcon = end ? icons[0] : icons[1];
  const actionNode = T`<calcite-action .aria=${{ expanded }} .icon=${expanded ? expandIcon : collapseIcon} id=expand-toggle .label=${label} @click=${toggle} .scale=${scale} .text=${text} .textEnabled=${expanded} title=${(!expanded && !tooltip ? text : null) ?? A} ${n((referenceElement) => setTooltipReference({ tooltip, referenceElement, expanded, ref: ref$1 }))}></calcite-action>`;
  return actionNode;
};
const calculateMaxItems = ({
  bufferSize = 0,
  containerSize,
  itemSizes
}) => {
  const maxSize = containerSize - bufferSize;
  let breakpoint = itemSizes.length;
  let sizeSum = 0;
  for (const [index2, size] of itemSizes.entries()) {
    sizeSum = sizeSum + size;
    if (sizeSum > maxSize) {
      breakpoint = index2;
      break;
    } else {
      continue;
    }
  }
  return breakpoint;
};
const getOverflowCount = ({
  bufferSize = 0,
  containerSize,
  itemSizes
}) => {
  return Math.max(itemSizes.length - calculateMaxItems({ bufferSize, itemSizes, containerSize }), 0);
};
const CSS$4 = {
  container: "container",
  actionGroupEnd: "action-group--end"
};
const SLOTS$1 = {
  actionsEnd: "actions-end",
  expandTooltip: "expand-tooltip"
};
const styles$4 = i`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([scale=s]){--calcite-internal-action-bar-gap: var(--calcite-action-bar-items-space, var(--calcite-spacing-xxs));--calcite-internal-action-bar-padding: var(--calcite-spacing-xxs)}:host([scale=m]){--calcite-internal-action-bar-gap: var(--calcite-action-bar-items-space, var(--calcite-spacing-sm));--calcite-internal-action-bar-padding: var(--calcite-spacing-sm)}:host([scale=l]){--calcite-internal-action-bar-gap: var(--calcite-action-bar-items-space, var(--calcite-space-sm-plus));--calcite-internal-action-bar-padding: var(--calcite-spacing-sm-plus)}:host{display:inline-flex;align-self:stretch;background:transparent;--calcite-internal-action-group-dividing-border-margin: calc(var(--calcite-spacing-base) + 1px)}.container{display:inline-flex;flex:1 1 auto;flex-direction:column;background-color:var(--calcite-action-bar-background-color, var(--calcite-color-foreground-1));gap:var(--calcite-internal-action-bar-gap);padding:var(--calcite-internal-action-bar-padding)}@keyframes in{0%{opacity:0}to{opacity:1}}:host([floating]) .container{animation:in var(--calcite-internal-animation-timing-slow) ease-in-out;overflow:hidden;border-radius:var(--calcite-action-bar-corner-radius, var(--calcite-corner-radius-round));--tw-shadow: 0 6px 20px -4px rgba(0, 0, 0, .1), 0 4px 12px -2px rgba(0, 0, 0, .08);--tw-shadow-colored: 0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--calcite-action-bar-shadow, var(--tw-ring-offset-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-ring-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-shadow))}:host([layout=vertical]){flex-direction:column}:host([layout=vertical]):host([overflow-actions-disabled]) .container{overflow-y:auto}:host([layout=vertical]):host([expanded]) .container{max-inline-size:var(--calcite-action-bar-expanded-max-width, auto)}:host([layout=vertical]) .action-group--end{margin-block-start:auto}:host([layout=vertical]) ::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:var(--calcite-border-width-sm);border-image:linear-gradient(to right,transparent var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-group-dividing-border-margin)),transparent var(--calcite-internal-action-group-dividing-border-margin));border-image-slice:1;padding-block-end:var(--calcite-internal-action-bar-padding)}:host([layout=horizontal]){flex-direction:row}:host([layout=horizontal]) .container{flex-direction:row}:host([layout=horizontal]):host([overflow-actions-disabled]) .container{overflow-x:auto}:host([layout=horizontal]) .action-group--end{margin-inline-start:auto}:host([layout=horizontal]) ::slotted(calcite-action-group:not(:last-of-type)){border-image:linear-gradient(transparent var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) var(--calcite-internal-action-group-dividing-border-margin),var(--calcite-action-group-border-color, var(--calcite-color-border-3)) calc(100% - var(--calcite-internal-action-group-dividing-border-margin)),transparent var(--calcite-internal-action-group-dividing-border-margin));border-image-slice:1;border-inline-end-width:var(--calcite-border-width-sm);padding-inline-end:var(--calcite-internal-action-bar-padding)}.action-group--end{justify-content:flex-end}:host([hidden]){display:none}[hidden]{display:none}`;
const _ActionBar = class _ActionBar extends LitElement {
  constructor() {
    super();
    this.actions = [];
    this.containerRef = e();
    this.mutationObserver = createObserver();
    this.cancelable = useCancelable()(this);
    this.resize = debounce(({ width, height }) => {
      const { expanded, expandDisabled, layout, overflowActionsDisabled, actionGroups } = this;
      if (overflowActionsDisabled || layout === "vertical" && !height || layout === "horizontal" && !width) {
        return;
      }
      const itemSizes = this.getItemSizes();
      this.updateGroups();
      const groupCount = this.hasActionsEnd || !expandDisabled ? actionGroups.length + 1 : actionGroups.length;
      let bufferSize = groupCount;
      const actionBarContainerStyle = getComputedStyle(this.containerRef.value);
      bufferSize += getStylePixelValue(layout === "horizontal" ? actionBarContainerStyle.paddingInlineStart : actionBarContainerStyle.paddingBlockStart) + getStylePixelValue(layout === "horizontal" ? actionBarContainerStyle.paddingInlineEnd : actionBarContainerStyle.paddingBlockEnd);
      if (actionGroups.length > 0) {
        actionGroups.forEach((actionGroup, i2) => {
          const actionGroupStyle = getComputedStyle(actionGroup);
          const actionGroupGap = getStylePixelValue(actionGroupStyle.gap);
          const actionGroupGapQuantity = actionGroup.childElementCount - 1;
          bufferSize += actionGroupGap * actionGroupGapQuantity;
          if (i2 < actionGroups.length - 1) {
            bufferSize += getStylePixelValue(layout === "horizontal" ? actionGroupStyle.paddingInlineEnd : actionGroupStyle.paddingBlockEnd);
            bufferSize += getStylePixelValue(layout === "horizontal" ? actionGroupStyle.borderInlineEndWidth : actionGroupStyle.borderBlockEndWidth);
          }
        });
      }
      if (groupCount > 0) {
        for (let i2 = 1; i2 < groupCount; i2++) {
          bufferSize += getStylePixelValue(actionBarContainerStyle.gap);
        }
      }
      const overflowCount = getOverflowCount({
        bufferSize,
        containerSize: layout === "horizontal" ? width : height,
        itemSizes
      });
      overflowActions({
        actionGroups,
        expanded,
        overflowCount
      });
    }, DEBOUNCE.resize);
    this.resizeHandler = (entry) => {
      const { width, height } = entry.contentRect;
      this.resize({ width, height });
    };
    this.resizeObserver = createObserver();
    this.toggleExpand = () => {
      this.expanded = !this.expanded;
      this.calciteActionBarToggle.emit();
    };
    this.messages = useT9n();
    this.focusSetter = useSetFocus()(this);
    this.setExpandToggleEl = (el) => {
      this.expandToggleEl = el;
    };
    this.hasActionsEnd = false;
    this.floating = false;
    this.expandDisabled = false;
    this.expanded = false;
    this.layout = "vertical";
    this.overflowActionsDisabled = false;
    this.overlayPositioning = "absolute";
    this.scale = "m";
    this.selectionAppearance = "neutral";
    this.calciteActionBarCollapse = createEvent({ cancelable: false });
    this.calciteActionBarExpand = createEvent({ cancelable: false });
    this.calciteActionBarToggle = createEvent({ cancelable: false });
    this.listen("calciteActionMenuOpen", this.actionMenuOpenHandler);
    this.listen("keydown", this.handleKeyDown);
  }
  async overflowActions() {
    this.resize({ width: this.el.clientWidth, height: this.el.clientHeight });
  }
  async setFocus(options) {
    return this.focusSetter(() => this.el, options);
  }
  connectedCallback() {
    super.connectedCallback();
    this.updateGroups();
    this.overflowActions();
    this.updateActions();
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    this.overflowActionsDisabledHandler(this.overflowActionsDisabled);
    this.cancelable.add(this.resize);
  }
  willUpdate(changes) {
    if (changes.has("expandDisabled") && (this.hasUpdated || this.expandDisabled !== false)) {
      this.overflowActions();
    }
    if (changes.has("layout") && (this.hasUpdated || this.layout !== "vertical")) {
      this.updateGroups();
    }
    if (changes.has("overflowActionsDisabled") && (this.hasUpdated || this.overflowActionsDisabled !== false)) {
      this.overflowActionsDisabledHandler(this.overflowActionsDisabled);
    }
    if (changes.has("expanded") && this.hasUpdated) {
      this.expandedHandler();
      if (this.expanded) {
        this.calciteActionBarExpand.emit();
      } else {
        this.calciteActionBarCollapse.emit();
      }
    }
    if (changes.has("selectionAppearance") && (this.hasUpdated || this.selectionAppearance !== "neutral")) {
      this.updateActions();
    }
  }
  loaded() {
    this.overflowActions();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
  }
  getItemSizes() {
    const { el, layout, expandToggleEl } = this;
    const actions = queryActions(el);
    if (expandToggleEl) {
      actions.push(expandToggleEl);
    }
    const clientSize = layout === "horizontal" ? "clientWidth" : "clientHeight";
    const fallbackSize = Math.max(...actions.map((action) => action[clientSize] || 0));
    return actions.map((action) => action[clientSize] || fallbackSize);
  }
  expandedHandler() {
    const { el, expanded } = this;
    toggleChildActionText({ el, expanded });
    this.overflowActions();
  }
  overflowActionsDisabledHandler(overflowActionsDisabled) {
    if (overflowActionsDisabled) {
      this.resizeObserver?.disconnect();
      return;
    }
    this.resizeObserver?.observe(this.el);
    this.overflowActions();
  }
  actionMenuOpenHandler(event) {
    if (event.target.menuOpen) {
      const composedPath = event.composedPath();
      this.actionGroups?.forEach((group) => {
        if (!composedPath.includes(group)) {
          group.menuOpen = false;
        }
      });
    }
  }
  mutationObserverHandler() {
    this.updateGroups();
    this.overflowActions();
    this.queryAndStoreActions();
    this.updateActions();
  }
  resizeHandlerEntries(entries) {
    entries.forEach(this.resizeHandler);
  }
  updateGroups() {
    const groups = Array.from(this.el.querySelectorAll("calcite-action-group"));
    this.actionGroups = groups;
    groups.forEach((group) => {
      group.layout = this.layout;
      group.scale = this.scale;
    });
  }
  handleDefaultSlotChange() {
    this.updateGroups();
    this.queryAndStoreActions();
    this.updateActions();
  }
  handleActionsEndSlotChange(event) {
    this.hasActionsEnd = slotChangeHasAssignedElement(event);
  }
  handleTooltipSlotChange(event) {
    const tooltips = slotChangeGetAssignedElements(event).filter((el) => el?.matches("calcite-tooltip"));
    this.expandTooltip = tooltips[0];
  }
  updateActions() {
    this.actions.forEach((action) => {
      action.selectionAppearance = this.selectionAppearance;
    });
  }
  queryAndStoreActions() {
    this.actions = Array.from(this.el.querySelectorAll("calcite-action"));
  }
  handleKeyDown(event) {
    this.queryAndStoreActions();
    const actions = this.actions.filter((action) => !action.disabled);
    const current = document.activeElement;
    if (!isAction(current)) {
      return;
    }
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        focusElementInGroup(actions, current, "next", true);
        event.preventDefault();
        break;
      case "ArrowLeft":
      case "ArrowUp":
        focusElementInGroup(actions, current, "previous", true);
        event.preventDefault();
        break;
      case "Home":
        focusElementInGroup(actions, current, "first", true);
        event.preventDefault();
        break;
      case "End":
        focusElementInGroup(actions, current, "last", true);
        event.preventDefault();
        break;
      case "Tab":
        this.setActionTabIndexes(current);
        break;
    }
  }
  setActionTabIndexes(active) {
    this.actions.forEach((action) => {
      action.tabIndex = !action.disabled && action === active ? 0 : -1;
    });
  }
  renderBottomActionGroup() {
    const { expanded, expandDisabled, el, position, toggleExpand, scale, layout, messages, actionsEndGroupLabel, overlayPositioning } = this;
    const expandToggleNode = !expandDisabled ? ExpandToggle({ collapseLabel: messages.collapseLabel, collapseText: messages.collapse, el, expandLabel: messages.expandLabel, expandText: messages.expand, expanded, position, ref: this.setExpandToggleEl, scale, toggle: toggleExpand, tooltip: this.expandTooltip }) : null;
    return T`<calcite-action-group class=${safeClassMap(CSS$4.actionGroupEnd)} .hidden=${this.expandDisabled && !this.hasActionsEnd} .label=${actionsEndGroupLabel} .layout=${layout} .overlayPositioning=${overlayPositioning} .scale=${scale}><slot name=${SLOTS$1.actionsEnd} @slotchange=${this.handleActionsEndSlotChange}></slot><slot name=${SLOTS$1.expandTooltip} @slotchange=${this.handleTooltipSlotChange}></slot>${expandToggleNode}</calcite-action-group>`;
  }
  render() {
    return T`<div .ariaOrientation=${this.layout === "horizontal" ? "horizontal" : "vertical"} class=${safeClassMap(CSS$4.container)} role=toolbar ${n(this.containerRef)}><slot @slotchange=${this.handleDefaultSlotChange}></slot>${this.renderBottomActionGroup()}</div>`;
  }
};
_ActionBar.properties = { expandTooltip: [16, {}, { state: true }], hasActionsEnd: [16, {}, { state: true }], actionsEndGroupLabel: 1, floating: [7, {}, { reflect: true, type: Boolean }], expandDisabled: [7, {}, { reflect: true, type: Boolean }], expanded: [7, {}, { reflect: true, type: Boolean }], layout: [3, {}, { reflect: true }], messageOverrides: [0, {}, { attribute: false }], overflowActionsDisabled: [7, {}, { reflect: true, type: Boolean }], overlayPositioning: [3, {}, { reflect: true }], position: [3, {}, { reflect: true }], scale: [3, {}, { reflect: true }], selectionAppearance: [3, {}, { reflect: true }] };
_ActionBar.styles = styles$4;
let ActionBar = _ActionBar;
customElement("calcite-action-bar", ActionBar);
const index$4 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ActionBar
});
const CSS$3 = {
  backButton: "back-button"
};
const ICONS = {
  backLeft: "chevron-left",
  backRight: "chevron-right"
};
const SLOTS = {
  actionBar: "action-bar",
  alerts: "alerts",
  contentTop: "content-top",
  contentBottom: "content-bottom",
  headerActionsStart: "header-actions-start",
  headerActionsEnd: "header-actions-end",
  headerMenuActions: "header-menu-actions",
  headerContent: "header-content",
  fab: "fab",
  footer: "footer",
  footerEnd: "footer-end",
  footerStart: "footer-start"
};
const styles$3 = i`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:none;inline-size:100%;flex:1 1 auto;overflow:hidden}:host([selected]){display:flex}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}calcite-panel{--calcite-panel-background-color: var(--calcite-flow-background-color);--calcite-panel-border-color: var(--calcite-flow-border-color, var(--calcite-flow-item-header-border-block-end));--calcite-panel-corner-radius: var(--calcite-flow-corner-radius);--calcite-panel-description-text-color: var(--calcite-flow-description-text-color);--calcite-panel-footer-background-color: var(--calcite-flow-footer-background-color);--calcite-panel-footer-space: var(--calcite-flow-footer-space, var(--calcite-flow-item-footer-padding));--calcite-panel-header-action-background-color-hover: var(--calcite-flow-header-action-background-color-hover);--calcite-panel-header-action-background-color-press: var(--calcite-flow-header-action-background-color-press);--calcite-panel-header-action-background-color: var(--calcite-flow-header-action-background-color);--calcite-panel-header-action-indicator-color: var(--calcite-flow-header-action-indicator-color);--calcite-panel-header-action-text-color-press: var(--calcite-flow-header-action-text-color-press);--calcite-panel-header-action-text-color: var(--calcite-flow-header-action-text-color);--calcite-panel-header-background-color: var(--calcite-flow-header-background-color);--calcite-panel-header-content-space: var(--calcite-flow-header-content-space);--calcite-panel-heading-text-color: var(--calcite-flow-heading-text-color);--calcite-panel-icon-color: var(--calcite-flow-icon-color);--calcite-panel-space: var(--calcite-flow-space)}:host([hidden]){display:none}[hidden]{display:none}`;
const _FlowItem = class _FlowItem extends LitElement {
  constructor() {
    super(...arguments);
    this.backButtonRef = e();
    this.containerRef = e();
    this.messages = useT9n();
    this.focusSetter = useSetFocus()(this);
    this.interactiveContainer = useInteractive(this);
    this.closable = false;
    this.closed = false;
    this.collapseDirection = "down";
    this.collapsed = false;
    this.collapsible = false;
    this.disabled = false;
    this.iconFlipRtl = false;
    this.loading = false;
    this.menuOpen = false;
    this.overlayPositioning = "absolute";
    this.scale = "m";
    this.selected = false;
    this.showBackButton = false;
    this.topLayerDisabled = false;
    this.calciteFlowItemBack = createEvent();
    this.calciteFlowItemClose = createEvent({ cancelable: false });
    this.calciteFlowItemCollapse = createEvent({ cancelable: false });
    this.calciteFlowItemExpand = createEvent({ cancelable: false });
    this.calciteFlowItemScroll = createEvent({ cancelable: false });
    this.calciteFlowItemToggle = createEvent({ cancelable: false });
    this.calciteInternalFlowItemChange = createEvent({ cancelable: false });
  }
  async scrollContentTo(options) {
    await this.containerRef.value?.scrollContentTo(options);
  }
  async setFocus(options) {
    return this.focusSetter(() => this.backButtonRef.value || this.containerRef.value, options);
  }
  willUpdate(changes) {
    if (changes.has("selected") && (this.hasUpdated || this.selected !== false)) {
      this.calciteInternalFlowItemChange.emit();
    }
    if (changes.has("collapsed") && this.hasUpdated) {
      if (this.collapsed) {
        this.calciteFlowItemCollapse.emit();
      } else {
        this.calciteFlowItemExpand.emit();
      }
    }
  }
  handleInternalPanelScroll(event) {
    if (event.target !== this.containerRef.value) {
      return;
    }
    event.stopPropagation();
    this.calciteFlowItemScroll.emit();
  }
  handleInternalPanelClose(event) {
    if (event.target !== this.containerRef.value) {
      return;
    }
    event.stopPropagation();
    this.closed = true;
    this.calciteFlowItemClose.emit();
  }
  handleInternalPanelToggle(event) {
    if (event.target !== this.containerRef.value) {
      return;
    }
    event.stopPropagation();
    this.collapsed = event.target.collapsed;
    this.calciteFlowItemToggle.emit();
  }
  backButtonClick() {
    this.calciteFlowItemBack.emit();
  }
  renderBackButton() {
    const { el } = this;
    const rtl = getElementDir(el) === "rtl";
    const { showBackButton, backButtonClick, messages } = this;
    const label = messages.back;
    const icon = rtl ? ICONS.backRight : ICONS.backLeft;
    return showBackButton ? i$2("flow-back-button", T`<calcite-action .ariaLabel=${label} class=${safeClassMap(CSS$3.backButton)} .icon=${icon} @click=${backButtonClick} .scale=${this.scale} slot=${SLOTS.headerActionsStart} .text=${label} title=${label ?? A} ${n(this.backButtonRef)}></calcite-action>`) : null;
  }
  render() {
    const { collapsed, collapseDirection, collapsible, closable, closed, description, disabled, heading, headingLevel, loading, menuOpen, messages, overlayPositioning, beforeClose, icon, iconFlipRtl } = this;
    return this.interactiveContainer({ disabled, children: T`<calcite-panel .beforeClose=${beforeClose} .closable=${closable} .closed=${closed} .collapseDirection=${collapseDirection} .collapsed=${collapsed} .collapsible=${collapsible} .description=${description} .disabled=${disabled} .heading=${heading} .headingLevel=${headingLevel} .icon=${icon} .iconFlipRtl=${iconFlipRtl} .loading=${loading} .menuOpen=${menuOpen} .messageOverrides=${messages} @calcitePanelClose=${this.handleInternalPanelClose} @calcitePanelScroll=${this.handleInternalPanelScroll} @calcitePanelToggle=${this.handleInternalPanelToggle} .overlayPositioning=${overlayPositioning} .scale=${this.scale} .topLayerDisabled=${this.topLayerDisabled} ${n(this.containerRef)}>${this.renderBackButton()}<slot name=${SLOTS.actionBar} slot=${SLOTS$b.actionBar}></slot><slot name=${SLOTS.alerts} slot=${SLOTS$b.alerts}></slot><slot name=${SLOTS.headerActionsStart} slot=${SLOTS$b.headerActionsStart}></slot><slot name=${SLOTS.headerActionsEnd} slot=${SLOTS$b.headerActionsEnd}></slot><slot name=${SLOTS.headerContent} slot=${SLOTS$b.headerContent}></slot><slot name=${SLOTS.headerMenuActions} slot=${SLOTS$b.headerMenuActions}></slot><slot name=${SLOTS.fab} slot=${SLOTS$b.fab}></slot><slot name=${SLOTS.contentTop} slot=${SLOTS$b.contentTop}></slot><slot name=${SLOTS.contentBottom} slot=${SLOTS$b.contentBottom}></slot><slot name=${SLOTS.footerStart} slot=${SLOTS$b.footerStart}></slot><slot name=${SLOTS.footer} slot=${SLOTS$b.footer}></slot><slot name=${SLOTS.footerEnd} slot=${SLOTS$b.footerEnd}></slot><slot></slot></calcite-panel>` });
  }
};
_FlowItem.properties = { beforeBack: [0, {}, { attribute: false }], beforeClose: [0, {}, { attribute: false }], closable: [7, {}, { reflect: true, type: Boolean }], closed: [7, {}, { reflect: true, type: Boolean }], collapseDirection: 1, collapsed: [7, {}, { reflect: true, type: Boolean }], collapsible: [7, {}, { reflect: true, type: Boolean }], description: 1, disabled: [7, {}, { reflect: true, type: Boolean }], heading: 1, headingLevel: [11, {}, { type: Number, reflect: true }], icon: [3, { type: String }, { reflect: true }], iconFlipRtl: [7, {}, { reflect: true, type: Boolean }], loading: [7, {}, { reflect: true, type: Boolean }], menuOpen: [7, {}, { reflect: true, type: Boolean }], messageOverrides: [0, {}, { attribute: false }], overlayPositioning: [3, {}, { reflect: true }], scale: [3, {}, { reflect: true }], selected: [7, {}, { reflect: true, type: Boolean }], showBackButton: [5, {}, { type: Boolean }], topLayerDisabled: [7, {}, { reflect: true, type: Boolean }] };
_FlowItem.styles = styles$3;
let FlowItem = _FlowItem;
customElement("calcite-flow-item", FlowItem);
const index$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  FlowItem
});
const CSS$2 = {
  frame: "frame",
  frameAdvancing: "frame--advancing",
  frameRetreating: "frame--retreating"
};
const styles$2 = i`:host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{position:relative;display:flex;inline-size:100%;flex:1 1 auto;align-items:stretch;overflow:hidden;background-color:transparent}:host .frame{position:relative;margin:0;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;padding:0;animation-name:none;animation-duration:var(--calcite-animation-timing);background-color:var(--calcite-flow-background-color)}:host ::slotted(*){display:none;block-size:100%}:host ::slotted(*[selected]){display:flex}:host .frame--advancing{animation-name:calcite-frame-advance}:host .frame--retreating{animation-name:calcite-frame-retreat}@keyframes calcite-frame-advance{0%{--tw-bg-opacity: .5;transform:translate3d(50px,0,0)}to{--tw-bg-opacity: 1;transform:translateZ(0)}}@keyframes calcite-frame-retreat{0%{--tw-bg-opacity: .5;transform:translate3d(-50px,0,0)}to{--tw-bg-opacity: 1;transform:translateZ(0)}}:host([hidden]){display:none}[hidden]{display:none}`;
const _Flow = class _Flow extends LitElement {
  constructor() {
    super();
    this.frameRef = e();
    this.itemMutationObserver = createObserver();
    this.items = [];
    this.selectedIndex = -1;
    this.focusSetter = useSetFocus()(this);
    this.flowDirection = "standby";
    this.listen("calciteInternalFlowItemChange", this.handleCalciteInternalFlowItemChange);
    this.listen("calciteFlowItemBack", this.handleItemBackClick);
  }
  async back() {
    const { items, selectedIndex } = this;
    const selectedItem = items[selectedIndex];
    const nextSelectedItem = items[selectedIndex - 1];
    if (!selectedItem || !nextSelectedItem) {
      return;
    }
    const beforeBack = selectedItem.beforeBack ? selectedItem.beforeBack : () => Promise.resolve();
    try {
      await beforeBack.call(selectedItem);
    } catch {
      return;
    }
    selectedItem.selected = false;
    nextSelectedItem.selected = true;
    return nextSelectedItem;
  }
  async setFocus(options) {
    return this.focusSetter(() => this.items[this.selectedIndex], options);
  }
  connectedCallback() {
    super.connectedCallback();
    this.itemMutationObserver?.observe(this.el, { childList: true, subtree: true });
  }
  willUpdate(changes) {
    if (changes.has("flowDirection") && (this.hasUpdated || this.flowDirection !== "standby")) {
      this.handleFlowDirectionChange(this.flowDirection);
    }
  }
  loaded() {
    this.updateItemsAndProps();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.itemMutationObserver?.disconnect();
  }
  async handleFlowDirectionChange(flowDirection) {
    if (flowDirection === "standby" || !this.frameRef.value) {
      return;
    }
    await whenAnimationDone(this.frameRef.value, flowDirection === "retreating" ? "calcite-frame-retreat" : "calcite-frame-advance");
    this.resetFlowDirection();
  }
  handleCalciteInternalFlowItemChange(event) {
    event.stopPropagation();
    this.updateFlowProps();
  }
  async handleItemBackClick(event) {
    if (event.defaultPrevented) {
      return;
    }
    await this.back();
    return this.setFocus();
  }
  resetFlowDirection() {
    this.flowDirection = "standby";
  }
  getFlowDirection(oldSelectedIndex, newSelectedIndex) {
    const allowRetreatingDirection = oldSelectedIndex > 0;
    const allowAdvancingDirection = oldSelectedIndex > -1 && newSelectedIndex > 0;
    if (!allowAdvancingDirection && !allowRetreatingDirection) {
      return "standby";
    }
    return newSelectedIndex < oldSelectedIndex ? "retreating" : "advancing";
  }
  updateItemsAndProps() {
    const { customItemSelectors, el } = this;
    const newItems = Array.from(el.querySelectorAll(`calcite-flow-item${customItemSelectors ? `,${customItemSelectors}` : ""}`)).filter((flowItem) => flowItem.closest("calcite-flow") === el);
    this.items = newItems;
    this.ensureSelectedFlowItemExists();
    this.updateFlowProps();
  }
  updateFlowProps() {
    const { selectedIndex, items } = this;
    const foundSelectedIndex = this.findSelectedFlowItemIndex(items);
    items.forEach((flowItem, index2) => {
      const currentlySelected = index2 === foundSelectedIndex;
      if (!currentlySelected) {
        flowItem.menuOpen = false;
      }
      flowItem.showBackButton = currentlySelected && foundSelectedIndex > 0;
    });
    if (foundSelectedIndex === -1) {
      return;
    }
    if (selectedIndex !== foundSelectedIndex) {
      this.flowDirection = this.getFlowDirection(selectedIndex, foundSelectedIndex);
    }
    this.selectedIndex = foundSelectedIndex;
  }
  findSelectedFlowItemIndex(items) {
    const selectedItem = items.slice(0).reverse().find((item) => !!item.selected);
    return items.indexOf(selectedItem);
  }
  ensureSelectedFlowItemExists() {
    const { items } = this;
    const foundSelectedIndex = this.findSelectedFlowItemIndex(items);
    if (foundSelectedIndex !== -1) {
      return;
    }
    const lastItem = items[items.length - 1];
    if (lastItem) {
      lastItem.selected = true;
    }
  }
  render() {
    const { flowDirection } = this;
    const frameDirectionClasses = {
      [CSS$2.frame]: true,
      [CSS$2.frameAdvancing]: flowDirection === "advancing",
      [CSS$2.frameRetreating]: flowDirection === "retreating"
    };
    return T`<div class=${safeClassMap(frameDirectionClasses)} ${n(this.frameRef)}><slot></slot></div>`;
  }
};
_Flow.properties = { flowDirection: [16, {}, { state: true }], customItemSelectors: 1 };
_Flow.styles = styles$2;
let Flow = _Flow;
customElement("calcite-flow", Flow);
const index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Flow
});
const CSS$1 = {
  container: "container",
  heading: "heading"
};
const styles$1 = i`:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column}:host([filter-hidden]){display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{margin:0;display:flex;flex:1 1 0%;background-color:var(--calcite-list-background-color, var(--calcite-color-foreground-1));color:var(--calcite-list-color, var(--calcite-color-text-1))}.heading{font-weight:var(--calcite-font-weight-bold)}:host([scale=s]) .container{padding-inline:var(--calcite-spacing-sm)}:host([scale=s]) .heading{font-size:var(--calcite-font-size-sm);line-height:var(--calcite-font-line-height-fixed-base);padding-block:var(--calcite-spacing-sm) var(--calcite-spacing-xxs)}:host([scale=s]:not(:first-child)) .container{padding-block-start:var(--calcite-spacing-sm)}:host([scale=m]) .container{padding-inline:var(--calcite-spacing-md)}:host([scale=m]) .heading{font-size:var(--calcite-font-size);line-height:var(--calcite-font-line-height-fixed-base);padding-block:var(--calcite-spacing-lg) var(--calcite-spacing-sm)}:host([scale=m]:not(:first-child)) .container{padding-block-start:var(--calcite-spacing-md)}:host([scale=l]) .container{padding-inline:var(--calcite-spacing-lg)}:host([scale=l]) .heading{font-size:var(--calcite-font-size-md);line-height:var(--calcite-font-line-height-fixed-lg);padding-block:var(--calcite-spacing-xl) var(--calcite-spacing-sm-plus, .625rem)}:host([scale=l]:not(:first-child)) .container{padding-block-start:var(--calcite-spacing-md-plus, .875rem)}.heading{padding:0}:host([hidden]){display:none}[hidden]{display:none}`;
const _ListItemGroup = class _ListItemGroup extends LitElement {
  constructor() {
    super(...arguments);
    this.interactiveContainer = useInteractive(this);
    this.disabled = false;
    this.filterHidden = false;
    this.scale = "m";
    this.calciteInternalListItemGroupDefaultSlotChange = createEvent({ cancelable: false });
  }
  handleDefaultSlotChange() {
    this.calciteInternalListItemGroupDefaultSlotChange.emit();
  }
  render() {
    const { disabled, heading } = this;
    return this.interactiveContainer({ disabled, children: T`<div class=${safeClassMap(CSS$1.container)} role=row><div .ariaColSpan=${MAX_COLUMNS} class=${safeClassMap(CSS$1.heading)} role=cell>${heading}</div></div><slot @slotchange=${this.handleDefaultSlotChange}></slot>` });
  }
};
_ListItemGroup.properties = { disabled: [7, {}, { reflect: true, type: Boolean }], filterHidden: [7, {}, { reflect: true, type: Boolean }], heading: [3, {}, { reflect: true }], scale: [3, {}, { reflect: true }] };
_ListItemGroup.styles = styles$1;
let ListItemGroup = _ListItemGroup;
customElement("calcite-list-item-group", ListItemGroup);
const index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ListItemGroup
});
const CSS = {
  positionContainer: "position-container",
  container: "container"
};
const idPrefix = "calcite-tooltip";
const IDS = {
  host: (id) => `${idPrefix}-${id}`
};
const TOOLTIP_OPEN_DELAY_MS = 300;
const TOOLTIP_QUICK_OPEN_DELAY_MS = TOOLTIP_OPEN_DELAY_MS / 3;
const TOOLTIP_CLOSE_DELAY_MS = TOOLTIP_OPEN_DELAY_MS * 1.5;
const ARIA_DESCRIBED_BY = "aria-describedby";
function getEffectiveReferenceElement(tooltip) {
  const { referenceElement } = tooltip;
  return (typeof referenceElement === "string" ? queryElementRoots(tooltip, { id: referenceElement }) : referenceElement) || null;
}
class TooltipManager {
  constructor() {
    this.registeredElements = /* @__PURE__ */ new WeakMap();
    this.registeredShadowRootCounts = /* @__PURE__ */ new WeakMap();
    this.hoverOpenTimeout = null;
    this.hoverCloseTimeout = null;
    this.activeTooltip = null;
    this.registeredElementCount = 0;
    this.clickedTooltip = null;
    this.hoveredTooltip = null;
    this.queryTooltip = (composedPath) => {
      const { registeredElements } = this;
      const registeredElement = composedPath.find((pathEl) => registeredElements.has(pathEl));
      return registeredElements.get(registeredElement);
    };
    this.keyDownHandler = (event) => {
      if (event.key === "Escape" && !event.defaultPrevented) {
        const { activeTooltip } = this;
        if (activeTooltip?.open) {
          this.clearHoverTimeout();
          this.closeActiveTooltip();
          const referenceElement = getEffectiveReferenceElement(activeTooltip);
          const composedPath = event.composedPath();
          if (referenceElement instanceof Element && composedPath.includes(referenceElement) || composedPath.includes(activeTooltip)) {
            event.preventDefault();
          }
        }
      }
    };
    this.pointerLeaveHandler = (event) => {
      if (event.defaultPrevented) {
        return;
      }
      this.clearHoverTimeout();
      this.closeHoveredTooltip();
    };
    this.pointerMoveHandler = (event) => {
      if (event.defaultPrevented) {
        this.closeHoveredTooltip();
        return;
      }
      const composedPath = event.composedPath();
      const tooltip = this.queryTooltip(composedPath);
      if (this.pathHasOpenTooltip(tooltip, composedPath)) {
        this.clearHoverTimeout();
        return;
      }
      if (tooltip === this.clickedTooltip) {
        return;
      }
      if (tooltip !== this.hoveredTooltip) {
        this.clearHoverOpenTimeout();
      }
      this.hoveredTooltip = tooltip;
      if (tooltip) {
        this.openHoveredTooltip(tooltip);
      } else if (this.activeTooltip?.open) {
        this.closeHoveredTooltip();
      }
      this.clickedTooltip = null;
    };
    this.clickHandler = (event) => {
      if (event.defaultPrevented) {
        return;
      }
      this.clickedTooltip = null;
      const composedPath = event.composedPath();
      const tooltip = this.queryTooltip(composedPath);
      if (this.pathHasOpenTooltip(tooltip, composedPath)) {
        this.clearHoverTimeout();
        return;
      }
      this.closeActiveTooltip();
      if (!tooltip) {
        return;
      }
      this.clearHoverTimeout();
      if (tooltip.closeOnClick) {
        this.clickedTooltip = tooltip;
        this.toggleTooltip(tooltip, false);
        return;
      }
      this.toggleTooltip(tooltip, true);
    };
    this.blurHandler = () => {
      this.closeActiveTooltip();
    };
    this.focusInHandler = (event) => {
      if (event.defaultPrevented) {
        return;
      }
      const composedPath = event.composedPath();
      const tooltip = this.queryTooltip(composedPath);
      if (this.pathHasOpenTooltip(tooltip, composedPath)) {
        this.clearHoverTimeout();
        return;
      }
      if (tooltip === this.clickedTooltip) {
        return;
      }
      this.clickedTooltip = null;
      this.closeTooltipIfNotActive(tooltip);
      if (!tooltip) {
        return;
      }
      this.toggleFocusedTooltip(tooltip, true);
    };
    this.openHoveredTooltip = (tooltip) => {
      this.hoverOpenTimeout = window.setTimeout(
        () => {
          if (this.hoverOpenTimeout === null || tooltip !== this.hoveredTooltip) {
            return;
          }
          this.clearHoverCloseTimeout();
          this.closeTooltipIfNotActive(tooltip);
          this.toggleTooltip(tooltip, true);
        },
        this.activeTooltip?.open ? TOOLTIP_QUICK_OPEN_DELAY_MS : TOOLTIP_OPEN_DELAY_MS
      );
    };
    this.closeHoveredTooltip = () => {
      this.hoverCloseTimeout = window.setTimeout(() => {
        if (this.hoverCloseTimeout === null) {
          return;
        }
        this.closeActiveTooltip();
      }, TOOLTIP_CLOSE_DELAY_MS);
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  registerElement(referenceEl, tooltip) {
    this.registeredElementCount++;
    this.registeredElements.set(referenceEl, tooltip);
    const shadowRoot = this.getReferenceElShadowRootNode(referenceEl);
    if (shadowRoot) {
      this.registerShadowRoot(shadowRoot);
    }
    if (this.registeredElementCount === 1) {
      this.addListeners();
    }
  }
  unregisterElement(referenceEl) {
    const shadowRoot = this.getReferenceElShadowRootNode(referenceEl);
    if (shadowRoot) {
      this.unregisterShadowRoot(shadowRoot);
    }
    if (this.registeredElements.delete(referenceEl)) {
      this.registeredElementCount--;
    }
    if (this.registeredElementCount === 0) {
      this.removeListeners();
    }
  }
  pathHasOpenTooltip(tooltip, composedPath) {
    const { activeTooltip } = this;
    return activeTooltip?.open && composedPath.includes(activeTooltip) || tooltip?.open && composedPath.includes(tooltip);
  }
  addShadowListeners(shadowRoot) {
    shadowRoot.addEventListener("focusin", this.focusInHandler);
  }
  removeShadowListeners(shadowRoot) {
    shadowRoot.removeEventListener("focusin", this.focusInHandler);
  }
  addListeners() {
    window.addEventListener("keydown", this.keyDownHandler);
    window.addEventListener("pointermove", this.pointerMoveHandler);
    window.addEventListener("click", this.clickHandler);
    window.addEventListener("focusin", this.focusInHandler);
    window.addEventListener("blur", this.blurHandler);
    document.addEventListener("pointerleave", this.pointerLeaveHandler);
  }
  removeListeners() {
    window.removeEventListener("keydown", this.keyDownHandler);
    window.removeEventListener("pointermove", this.pointerMoveHandler);
    window.removeEventListener("click", this.clickHandler);
    window.removeEventListener("focusin", this.focusInHandler);
    window.removeEventListener("blur", this.blurHandler);
    document.removeEventListener("pointerleave", this.pointerLeaveHandler);
  }
  clearHoverOpenTimeout() {
    window.clearTimeout(this.hoverOpenTimeout);
    this.hoverOpenTimeout = null;
  }
  clearHoverCloseTimeout() {
    window.clearTimeout(this.hoverCloseTimeout);
    this.hoverCloseTimeout = null;
  }
  clearHoverTimeout() {
    this.clearHoverOpenTimeout();
    this.clearHoverCloseTimeout();
  }
  closeTooltipIfNotActive(tooltip) {
    if (this.activeTooltip !== tooltip) {
      this.closeActiveTooltip();
    }
  }
  closeActiveTooltip() {
    const { activeTooltip } = this;
    if (activeTooltip?.open) {
      this.toggleTooltip(activeTooltip, false);
    }
  }
  toggleFocusedTooltip(tooltip, open) {
    if (open) {
      this.clearHoverTimeout();
    }
    this.toggleTooltip(tooltip, open);
  }
  toggleTooltip(tooltip, open) {
    tooltip.open = open;
    this.activeTooltip = open ? tooltip : null;
  }
  registerShadowRoot(shadowRoot) {
    const { registeredShadowRootCounts } = this;
    const count = registeredShadowRootCounts.get(shadowRoot);
    const newCount = Math.min((typeof count === "number" ? count : 0) + 1, 1);
    if (newCount === 1) {
      this.addShadowListeners(shadowRoot);
    }
    registeredShadowRootCounts.set(shadowRoot, newCount);
  }
  unregisterShadowRoot(shadowRoot) {
    const { registeredShadowRootCounts } = this;
    const count = registeredShadowRootCounts.get(shadowRoot);
    const newCount = Math.max((typeof count === "number" ? count : 1) - 1, 0);
    if (newCount === 0) {
      this.removeShadowListeners(shadowRoot);
    }
    registeredShadowRootCounts.set(shadowRoot, newCount);
  }
  getReferenceElShadowRootNode(referenceEl) {
    return referenceEl instanceof Element ? getShadowRootNode(referenceEl) : null;
  }
}
const styles = i`:host{display:contents}:host([top-layer-disabled]){--calcite-floating-ui-z-index: var(--calcite-z-index-tooltip)}.position-container{inline-size:max-content;display:none;max-inline-size:100vw;max-block-size:100vh;inset-block-start:0;left:0;z-index:var(--calcite-floating-ui-z-index)}@starting-style{.position-container{opacity:0;inset-block-start:0;left:0}}.position-container{max-inline-size:var(--calcite-tooltip-max-size-x, 20rem);max-block-size:20rem}.position-container[popover]{padding:0;margin:0;border:none;background-color:transparent;overflow:visible;display:none}.position-container:popover-open{display:block}.position-container .calcite-floating-ui-anim{position:relative;transition-duration:var(--calcite-floating-ui-transition);transition-property:inset-block-start,left,opacity,display;transition-behavior:allow-discrete;opacity:0;box-shadow:0 0 16px #00000029;z-index:var(--calcite-z-index);border-radius:.25rem}.position-container[data-placement^=bottom] .calcite-floating-ui-anim{inset-block-start:-5px}.position-container[data-placement^=top] .calcite-floating-ui-anim{inset-block-start:5px}.position-container[data-placement^=left] .calcite-floating-ui-anim{left:5px}.position-container[data-placement^=right] .calcite-floating-ui-anim{left:-5px}.position-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;inset-block-start:0;left:0}@starting-style{.position-container[data-placement] .calcite-floating-ui-anim--active{opacity:0}}.calcite-floating-ui-arrow{pointer-events:none;position:absolute;z-index:calc(var(--calcite-z-index) * -1);fill:var(--calcite-color-foreground-1)}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-color-border-3)}.container{position:relative;overflow:hidden;padding:.75rem 1rem;font-size:var(--calcite-font-size-relative-sm);line-height:var(--calcite-font-line-height-relative-snug);font-weight:var(--calcite-font-weight-medium);word-wrap:break-word;word-break:break-word;border-radius:var(--calcite-tooltip-corner-radius, var(--calcite-corner-radius-round));color:var(--calcite-tooltip-text-color, var(--calcite-color-text-1));text-align:start}.position-container .calcite-floating-ui-anim{border-width:1px;border-style:solid;background-color:var(--calcite-tooltip-background-color, var(--calcite-color-foreground-1));border-color:var(--calcite-tooltip-border-color, var(--calcite-color-border-3));border-radius:var(--calcite-tooltip-corner-radius, var(--calcite-corner-radius-round))}.calcite-floating-ui-arrow{fill:var(--calcite-tooltip-background-color, var(--calcite-color-foreground-1))}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-tooltip-border-color, var(--calcite-color-border-3))}:host([hidden]){display:none}[hidden]{display:none}`;
const manager = new TooltipManager();
const _Tooltip = class _Tooltip extends LitElement {
  constructor() {
    super(...arguments);
    this.arrowRef = e();
    this.guid = IDS.host(guid());
    this.transitionProp = "opacity";
    this.transitionRef = e();
    this.topLayer = useTopLayer({
      disabledOverride: () => this.open && !this.referenceEl,
      target: () => this.floatingEl
    })(this);
    this.floatingLayout = "vertical";
    this.closeOnClick = false;
    this.offsetDistance = defaultOffsetDistance;
    this.offsetSkidding = 0;
    this.open = false;
    this.overlayPositioning = "absolute";
    this.placement = "auto";
    this.topLayerDisabled = false;
    this.calciteTooltipBeforeClose = createEvent({ cancelable: false });
    this.calciteTooltipBeforeOpen = createEvent({ cancelable: false });
    this.calciteTooltipClose = createEvent({ cancelable: false });
    this.calciteTooltipOpen = createEvent({ cancelable: false });
  }
  async reposition(delayed = false) {
    const { referenceEl, placement, overlayPositioning, offsetDistance, offsetSkidding, arrowRef, floatingEl } = this;
    return reposition(this, {
      floatingEl,
      referenceEl,
      overlayPositioning,
      placement,
      offsetDistance,
      offsetSkidding,
      arrowEl: arrowRef.value,
      type: "tooltip"
    }, delayed);
  }
  connectedCallback() {
    super.connectedCallback();
    this.setUpReferenceElement(true);
  }
  willUpdate(changes) {
    if (changes.has("offsetDistance") && (this.hasUpdated || this.offsetDistance !== defaultOffsetDistance) || changes.has("offsetSkidding") && (this.hasUpdated || this.offsetSkidding !== 0) || changes.has("overlayPositioning") && (this.hasUpdated || this.overlayPositioning !== "absolute") || changes.has("placement") && (this.hasUpdated || this.placement !== "auto")) {
      this.reposition(true);
    }
    if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
      this.openHandler();
    }
    if (changes.has("referenceElement")) {
      this.setUpReferenceElement();
      if (!this.referenceElement && this.open) {
        this.topLayer.hide();
      }
    }
  }
  loaded() {
    if (this.referenceElement && !this.referenceEl) {
      this.setUpReferenceElement();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeReferences();
    disconnectFloatingUI(this);
  }
  openHandler() {
    toggleOpenClose(this);
    this.reposition(true);
  }
  onBeforeOpen() {
    this.calciteTooltipBeforeOpen.emit();
    this.topLayer.show();
  }
  onOpen() {
    this.calciteTooltipOpen.emit();
  }
  onBeforeClose() {
    this.calciteTooltipBeforeClose.emit();
  }
  onClose() {
    this.calciteTooltipClose.emit();
    hideFloatingUI(this);
    this.topLayer.hide();
  }
  setFloatingEl(el) {
    this.floatingEl = el;
    if (el) {
      requestAnimationFrame(() => this.setUpReferenceElement());
    }
  }
  setUpReferenceElement(warn = true) {
    this.removeReferences();
    this.referenceEl = getEffectiveReferenceElement(this.el);
    connectFloatingUI(this);
    const { el, referenceElement, referenceEl } = this;
    if (warn && referenceElement && !referenceEl) {
      console.warn(`${el.tagName}: reference-element id "${referenceElement}" was not found.`, {
        el
      });
    }
    this.addReferences();
  }
  getId() {
    return this.el.id || this.guid;
  }
  addReferences() {
    const { referenceEl } = this;
    if (!referenceEl) {
      return;
    }
    const id = this.getId();
    if ("setAttribute" in referenceEl) {
      referenceEl.setAttribute(ARIA_DESCRIBED_BY, id);
    }
    manager.registerElement(referenceEl, this.el);
  }
  removeReferences() {
    const { referenceEl } = this;
    if (!referenceEl) {
      return;
    }
    if ("removeAttribute" in referenceEl) {
      referenceEl.removeAttribute(ARIA_DESCRIBED_BY);
    }
    manager.unregisterElement(referenceEl);
  }
  render() {
    const { referenceEl, label, open, floatingLayout } = this;
    const displayed = referenceEl && open;
    const hidden = !displayed;
    this.el.inert = hidden;
    this.el.ariaLabel = label;
    this.el.ariaLive = "polite";
    setAttribute(this.el, "id", this.getId());
    this.el.role = "tooltip";
    return T`<div class=${safeClassMap(CSS.positionContainer)} popover=manual ${n(this.setFloatingEl)}><div class=${safeClassMap({
      [FloatingCSS.animation]: true,
      [FloatingCSS.animationActive]: displayed
    })} ${n(this.transitionRef)}>${FloatingArrow({ floatingLayout, ref: this.arrowRef })}<div class=${safeClassMap(CSS.container)}><slot></slot></div></div></div>`;
  }
};
_Tooltip.properties = { floatingLayout: [16, {}, { state: true }], referenceEl: [16, {}, { state: true }], closeOnClick: [7, {}, { reflect: true, type: Boolean }], label: 1, offsetDistance: [11, {}, { type: Number, reflect: true }], offsetSkidding: [11, {}, { reflect: true, type: Number }], open: [7, {}, { reflect: true, type: Boolean }], overlayPositioning: [3, {}, { reflect: true }], placement: [3, {}, { reflect: true }], referenceElement: 1, topLayerDisabled: [7, {}, { reflect: true, type: Boolean }] };
_Tooltip.styles = styles;
let Tooltip = _Tooltip;
customElement("calcite-tooltip", Tooltip);
const index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Tooltip
});
export {
  assetPathChanged as a,
  index$j as b,
  index$i as c,
  index$h as d,
  index$g as e,
  index$f as f,
  index$e as g,
  index$d as h,
  index$k as i,
  index$c as j,
  index$b as k,
  index$a as l,
  index$9 as m,
  index$8 as n,
  index$7 as o,
  index$6 as p,
  index$5 as q,
  index$4 as r,
  setAssetPath as s,
  index$3 as t,
  index$2 as u,
  index$1 as v,
  index as w
};
