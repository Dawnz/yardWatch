const safeCall = (callback, thisContext, ...rest) => {
  try {
    return callback?.call(thisContext, ...rest);
  } catch (error) {
    console.error(error, callback);
  }
  return void 0;
};
const safeAsyncCall = async (callback, thisContext, ...rest) => {
  try {
    const result = callback?.call(thisContext, ...rest);
    return await result;
  } catch (error) {
    console.error(error, callback);
  }
  return void 0;
};
class Deferred {
  /**
   * Creates a new deferred promise.
   */
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
const devToolsAwareTimeout = (callback, timeout) => {
  const interval = timeout / shortTimeoutIntervals;
  let elapsed = 0;
  const reference = setInterval(() => {
    elapsed += interval;
    if (elapsed >= timeout) {
      clearInterval(reference);
      callback();
    }
  }, interval);
  return reference;
};
const shortTimeoutIntervals = 4;
const loggedMessages = /* @__PURE__ */ new Set();
const getContextString = (context) => {
  if (typeof context === "string") {
    return context;
  }
  if ("el" in context) {
    return context.el.localName;
  }
  if ("localName" in context) {
    return context.localName;
  }
  return context.declaredClass;
};
const log = (level, context, message, options) => {
  const contextString = getContextString(context);
  if (options?.once) {
    const key = `${level}${contextString}${message}`;
    if (loggedMessages.has(key)) {
      return;
    }
    loggedMessages.add(key);
  }
  let memorySafeDetail;
  if (options?.detail) {
    memorySafeDetail = {};
    for (const [key, value] of Object.entries(options.detail)) {
      if ((typeof value === "object" || typeof value === "function") && value !== null) {
        const weakRefValue = new WeakRef(value);
        Object.defineProperty(memorySafeDetail, key, {
          get() {
            return weakRefValue.deref();
          }
        });
      } else {
        memorySafeDetail[key] = value;
      }
    }
    console[level](`[${contextString}]: ${message}`, memorySafeDetail);
  } else {
    console[level](`[${contextString}]: ${message}`);
  }
};
const rethrowError = (context) => {
  const prefix = `[${getContextString(context)}] `;
  return (error) => {
    const errorToRethrow = error instanceof Error && error.message ? error : new Error(String(error));
    errorToRethrow.message = `${prefix}${errorToRethrow.message}`;
    setTimeout(() => {
      throw error;
    });
  };
};
const camelToKebab = (string) => (
  //#endregion camelToKebab
  string.replace(upperBeforeLower, (upper, remainder) => `${remainder === 0 ? "" : "-"}${upper.toLowerCase()}`)
);
const upperBeforeLower = /[A-Z]+(?![a-z])|[A-Z]/gu;
function getSlotAssignedElements(slot, selector) {
  const assignedElements = slot.assignedElements({
    flatten: true
  });
  return assignedElements.filter((element) => element.matches(selector));
}
const inTargetElement = (element, targetElement) => {
  let currentElement = element;
  while (currentElement) {
    if (currentElement === targetElement) {
      return true;
    }
    if (!currentElement.parentNode) {
      return false;
    }
    if (currentElement.parentNode instanceof ShadowRoot) {
      currentElement = currentElement.parentNode.host;
    } else {
      currentElement = currentElement.parentNode;
    }
  }
  return false;
};
const observeAncestorsMutation = (element, attributeFilter, callback) => {
  const subscribe = observe(attributeFilter).subscribe;
  return subscribe((mutations) => {
    const matched = mutations.some((mutation) => inTargetElement(element, mutation.target));
    if (matched) {
      callback();
    }
  });
};
const observers = {};
const observe = (attributeFilter) => {
  const attributes = attributeFilter.join(",");
  const previousObserver = observers[attributes];
  if (previousObserver !== void 0) {
    return previousObserver;
  }
  const subscribers = /* @__PURE__ */ new Set();
  const mutationObserver = new MutationObserver((mutations) => subscribers.forEach((callback) => callback(mutations)));
  if (globalThis.document) {
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter,
      subtree: true
    });
  }
  const observer = {
    subscribe: (callback) => {
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
        if (subscribers.size === 0) {
          mutationObserver.disconnect();
          observers[attributes] = void 0;
        }
      };
    }
  };
  observers[attributes] = observer;
  return observer;
};
const getClosestElement = (base, selector) => {
  let currentElement = base;
  while (currentElement) {
    const element = currentElement.closest?.(selector);
    if (element) {
      return element;
    }
    const rootElement = currentElement.getRootNode?.();
    if (rootElement === globalThis.document) {
      return;
    }
    currentElement = rootElement.host;
  }
  return;
};
function unsafeGetCalciteModeName(el) {
  const closestElWithMode = getClosestElement(el, `.calcite-mode-dark, .calcite-mode-light, .calcite-mode-auto`);
  return closestElWithMode?.classList.contains("calcite-mode-dark") || closestElWithMode?.classList.contains("calcite-mode-auto") && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
const getElementAttribute = (el, attributeName, fallbackValue) => {
  const closest = getClosestElement(el, `[${attributeName}]`);
  return closest?.getAttribute(attributeName) ?? fallbackValue;
};
const supportedLocalesArray = "ar,bg,bs,ca,cs,da,de,el,en,es,et,fi,fr,he,hr,hu,id,it,ja,ko,lt,lv,nl,nb,no,pl,pt-BR,pt-PT,ro,ru,sk,sl,sr,sv,th,tr,uk,vi,zh-CN,zh-HK,zh-TW".split(
  ","
);
const supportedLocales = (
  //#endregion supportedLocales
  /* @__PURE__ */ new Set(supportedLocalesArray)
);
const defaultLocale = "en";
const localeEquivalencies = {
  //#region localeEquivalencies
  // We use `pt-PT` as it will have the same translations as `pt`, which has no corresponding bundle
  pt: "pt-PT",
  // We support both 'nb' and 'no' (BCP 47) for Norwegian but only `no` has corresponding bundle
  nb: "no",
  // We support both 'nn' and 'no' (BCP 47) for Norwegian but only `no` has corresponding bundle
  // See https://devtopia.esri.com/WebGIS/arcgis-web-components/issues/4667
  nn: "no",
  // We use `zh-CN` as base translation for chinese locales which has no corresponding bundle.
  zh: "zh-CN"
  //#endregion localeEquivalencies
};
const fetchT9nStringsBundle = async (locale, assetsPath, prefix = "") => {
  const path = `${assetsPath}/${prefix}`;
  const filePath = `${path}${locale}.json`;
  t9nStringsCache[filePath] ?? (t9nStringsCache[filePath] = fetchBundle(locale, path));
  return await t9nStringsCache[filePath];
};
const t9nStringsCache = {};
const fetchBundle = async (locale, path) => {
  const filePath = `${path}${locale}.json`;
  try {
    const response = await fetch(filePath);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    {
      log("error", "intl", `An unknown error occurred while fetching localization strings at ${filePath}`, {
        detail: { error }
      });
    }
    return {};
  }
  if (locale === defaultLocale) {
    return {};
  }
  return await fetchBundle(defaultLocale, path);
};
const getElementLocale = (element) => {
  const lang = getElementAttribute(element, "lang", globalThis.navigator?.language || defaultLocale);
  return { lang, t9nLocale: normalizeLocale(lang) };
};
const normalizeLocale = (lang) => {
  const [rawLanguageCode, regionCode] = lang.split("-");
  const languageCode = rawLanguageCode.toLowerCase();
  let normalizedLocale = languageCode;
  if (regionCode) {
    normalizedLocale = `${languageCode}-${regionCode.toUpperCase()}`;
  }
  normalizedLocale = localeEquivalencies[normalizedLocale] ?? normalizedLocale;
  if (supportedLocales.has(normalizedLocale)) {
    return normalizedLocale;
  }
  if (regionCode) {
    return normalizeLocale(languageCode);
  }
  return defaultLocale;
};
const startLocaleObserver = (element, getAssetsPath, onUpdated, assetName) => {
  let result = void 0;
  const callback = () => updateComponentLocaleState(element, getAssetsPath(), assetName).then((newResult) => {
    if (result?.lang !== newResult.lang || result.t9nLocale !== newResult.t9nLocale || result.t9nStrings !== newResult.t9nStrings) {
      onUpdated(newResult);
    }
    result = newResult;
  }).catch((error) => {
    log("error", "intl", "Error updating component locale state", { detail: { error } });
  });
  queueMicrotask(callback);
  return observeAncestorsMutation(element, ["lang"], callback);
};
const updateComponentLocaleState = async (element, assetsPath, assetName = element.localName.split("-").slice(1).join("-")) => {
  const { lang, t9nLocale } = getElementLocale(element);
  const t9nAssetsPath = `${assetsPath}/${assetName}/t9n`;
  const prefix = `messages.`;
  const t9nStrings = (
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    assetName === null ? {} : await fetchT9nStringsBundle(t9nLocale, t9nAssetsPath, prefix)
  );
  return { lang, t9nLocale, t9nStrings };
};
export {
  Deferred as D,
  safeAsyncCall as a,
  getElementAttribute as b,
  camelToKebab as c,
  devToolsAwareTimeout as d,
  getElementLocale as e,
  startLocaleObserver as f,
  getSlotAssignedElements as g,
  defaultLocale as h,
  observeAncestorsMutation as o,
  rethrowError as r,
  safeCall as s,
  unsafeGetCalciteModeName as u
};
