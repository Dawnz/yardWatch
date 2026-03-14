const t$1 = globalThis, i$4 = (t2) => t2, s$1 = t$1.trustedTypes, e$3 = s$1 ? s$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, h$2 = "$lit$", o$4 = `lit$${Math.random().toFixed(9).slice(2)}$`, n$4 = "?" + o$4, r$2 = `<${n$4}>`, l$2 = void 0 === t$1.document ? { createTreeWalker: () => ({}) } : document, c$1 = () => l$2.createComment(""), a$1 = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, u$1 = Array.isArray, d = (t2) => u$1(t2) || "function" == typeof t2?.[Symbol.iterator], f$1 = "[ 	\n\f\r]", v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _ = /-->/g, m$1 = />/g, p$1 = RegExp(`>|${f$1}(?:([^\\s"'>=/]+)(${f$1}*=${f$1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), g = /'/g, $ = /"/g, y = /^(?:script|style|textarea|title)$/i, x = (t2) => (i3, ...s2) => ({ _$litType$: t2, strings: i3, values: s2 }), T = x(1), b = x(2), E = /* @__PURE__ */ Symbol.for("lit-noChange"), A = /* @__PURE__ */ Symbol.for("lit-nothing"), C = /* @__PURE__ */ new WeakMap(), P = l$2.createTreeWalker(l$2, 129);
function V(t2, i3) {
  if (!u$1(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e$3 ? e$3.createHTML(i3) : i3;
}
const N = (t2, i3) => {
  const s2 = t2.length - 1, e2 = [];
  let n2, l2 = 2 === i3 ? "<svg>" : 3 === i3 ? "<math>" : "", c2 = v;
  for (let i4 = 0; i4 < s2; i4++) {
    const s3 = t2[i4];
    let a2, u2, d2 = -1, f2 = 0;
    for (; f2 < s3.length && (c2.lastIndex = f2, u2 = c2.exec(s3), null !== u2); ) f2 = c2.lastIndex, c2 === v ? "!--" === u2[1] ? c2 = _ : void 0 !== u2[1] ? c2 = m$1 : void 0 !== u2[2] ? (y.test(u2[2]) && (n2 = RegExp("</" + u2[2], "g")), c2 = p$1) : void 0 !== u2[3] && (c2 = p$1) : c2 === p$1 ? ">" === u2[0] ? (c2 = n2 ?? v, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? p$1 : '"' === u2[3] ? $ : g) : c2 === $ || c2 === g ? c2 = p$1 : c2 === _ || c2 === m$1 ? c2 = v : (c2 = p$1, n2 = void 0);
    const x2 = c2 === p$1 && t2[i4 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === v ? s3 + r$2 : d2 >= 0 ? (e2.push(a2), s3.slice(0, d2) + h$2 + s3.slice(d2) + o$4 + x2) : s3 + o$4 + (-2 === d2 ? i4 : x2);
  }
  return [V(t2, l2 + (t2[s2] || "<?>") + (2 === i3 ? "</svg>" : 3 === i3 ? "</math>" : "")), e2];
};
class S {
  constructor({ strings: t2, _$litType$: i3 }, e2) {
    let r2;
    this.parts = [];
    let l2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = N(t2, i3);
    if (this.el = S.createElement(f2, e2), P.currentNode = this.el.content, 2 === i3 || 3 === i3) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = P.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(h$2)) {
          const i4 = v2[a2++], s2 = r2.getAttribute(t3).split(o$4), e3 = /([.?@])?(.*)/.exec(i4);
          d2.push({ type: 1, index: l2, name: e3[2], strings: s2, ctor: "." === e3[1] ? I : "?" === e3[1] ? L : "@" === e3[1] ? z : H }), r2.removeAttribute(t3);
        } else t3.startsWith(o$4) && (d2.push({ type: 6, index: l2 }), r2.removeAttribute(t3));
        if (y.test(r2.tagName)) {
          const t3 = r2.textContent.split(o$4), i4 = t3.length - 1;
          if (i4 > 0) {
            r2.textContent = s$1 ? s$1.emptyScript : "";
            for (let s2 = 0; s2 < i4; s2++) r2.append(t3[s2], c$1()), P.nextNode(), d2.push({ type: 2, index: ++l2 });
            r2.append(t3[i4], c$1());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === n$4) d2.push({ type: 2, index: l2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(o$4, t3 + 1)); ) d2.push({ type: 7, index: l2 }), t3 += o$4.length - 1;
      }
      l2++;
    }
  }
  static createElement(t2, i3) {
    const s2 = l$2.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function M(t2, i3, s2 = t2, e2) {
  if (i3 === E) return i3;
  let h2 = void 0 !== e2 ? s2._$Co?.[e2] : s2._$Cl;
  const o2 = a$1(i3) ? void 0 : i3._$litDirective$;
  return h2?.constructor !== o2 && (h2?._$AO?.(false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ??= [])[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i3 = M(t2, h2._$AS(t2, i3.values), h2, e2)), i3;
}
class k {
  constructor(t2, i3) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i3 }, parts: s2 } = this._$AD, e2 = (t2?.creationScope ?? l$2).importNode(i3, true);
    P.currentNode = e2;
    let h2 = P.nextNode(), o2 = 0, n2 = 0, r2 = s2[0];
    for (; void 0 !== r2; ) {
      if (o2 === r2.index) {
        let i4;
        2 === r2.type ? i4 = new R(h2, h2.nextSibling, this, t2) : 1 === r2.type ? i4 = new r2.ctor(h2, r2.name, r2.strings, this, t2) : 6 === r2.type && (i4 = new W(h2, this, t2)), this._$AV.push(i4), r2 = s2[++n2];
      }
      o2 !== r2?.index && (h2 = P.nextNode(), o2++);
    }
    return P.currentNode = l$2, e2;
  }
  p(t2) {
    let i3 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i3), i3 += s2.strings.length - 2) : s2._$AI(t2[i3])), i3++;
  }
}
class R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t2, i3, s2, e2) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t2, this._$AB = i3, this._$AM = s2, this.options = e2, this._$Cv = e2?.isConnected ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i3 = this._$AM;
    return void 0 !== i3 && 11 === t2?.nodeType && (t2 = i3.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i3 = this) {
    t2 = M(this, t2, i3), a$1(t2) ? t2 === A || null == t2 || "" === t2 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t2 !== this._$AH && t2 !== E && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : d(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== A && a$1(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(l$2.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    const { values: i3, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = S.createElement(V(s2.h, s2.h[0]), this.options)), s2);
    if (this._$AH?._$AD === e2) this._$AH.p(i3);
    else {
      const t3 = new k(e2, this), s3 = t3.u(this.options);
      t3.p(i3), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i3 = C.get(t2.strings);
    return void 0 === i3 && C.set(t2.strings, i3 = new S(t2)), i3;
  }
  k(t2) {
    u$1(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i3.length ? i3.push(s2 = new R(this.O(c$1()), this.O(c$1()), this, this.options)) : s2 = i3[e2], s2._$AI(h2), e2++;
    e2 < i3.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i3.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, s2) {
    for (this._$AP?.(false, true, s2); t2 !== this._$AB; ) {
      const s3 = i$4(t2).nextSibling;
      i$4(t2).remove(), t2 = s3;
    }
  }
  setConnected(t2) {
    void 0 === this._$AM && (this._$Cv = t2, this._$AP?.(t2));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i3, s2, e2, h2) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t2, this.name = i3, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = A;
  }
  _$AI(t2, i3 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = M(this, t2, i3, 0), o2 = !a$1(t2) || t2 !== this._$AH && t2 !== E, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n2, r2;
      for (t2 = h2[0], n2 = 0; n2 < h2.length - 1; n2++) r2 = M(this, e3[s2 + n2], i3, n2), r2 === E && (r2 = this._$AH[n2]), o2 ||= !a$1(r2) || r2 !== this._$AH[n2], r2 === A ? t2 = A : t2 !== A && (t2 += (r2 ?? "") + h2[n2 + 1]), this._$AH[n2] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class I extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === A ? void 0 : t2;
  }
}
class L extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== A);
  }
}
class z extends H {
  constructor(t2, i3, s2, e2, h2) {
    super(t2, i3, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i3 = this) {
    if ((t2 = M(this, t2, i3, 0) ?? A) === E) return;
    const s2 = this._$AH, e2 = t2 === A && s2 !== A || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== A && (s2 === A || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class W {
  constructor(t2, i3, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    M(this, t2);
  }
}
const j = t$1.litHtmlPolyfillSupport;
j?.(S, R), (t$1.litHtmlVersions ??= []).push("3.3.2");
const B = (t2, i3, s2) => {
  const e2 = s2?.renderBefore ?? i3;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = s2?.renderBefore ?? null;
    e2._$litPart$ = h2 = new R(i3.insertBefore(c$1(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
const t = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4 }, e$2 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
let i$3 = class i {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i3) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i3;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
};
const e$1 = e$2(class extends i$3 {
  constructor(t$12) {
    if (super(t$12), t$12.type !== t.ATTRIBUTE || "class" !== t$12.name || t$12.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter((s2) => t2[s2]).join(" ") + " ";
  }
  update(s2, [i3]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s2.strings && (this.nt = new Set(s2.strings.join(" ").split(/\s/).filter((t2) => "" !== t2)));
      for (const t2 in i3) i3[t2] && !this.nt?.has(t2) && this.st.add(t2);
      return this.render(i3);
    }
    const r2 = s2.element.classList;
    for (const t2 of this.st) t2 in i3 || (r2.remove(t2), this.st.delete(t2));
    for (const t2 in i3) {
      const s3 = !!i3[t2];
      s3 === this.st.has(t2) || this.nt?.has(t2) || (s3 ? (r2.add(t2), this.st.add(t2)) : (r2.remove(t2), this.st.delete(t2)));
    }
    return E;
  }
});
const n$3 = "important", i$2 = " !" + n$3, o$3 = e$2(class extends i$3 {
  constructor(t$12) {
    if (super(t$12), t$12.type !== t.ATTRIBUTE || "style" !== t$12.name || t$12.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return Object.keys(t2).reduce((e2, r2) => {
      const s2 = t2[r2];
      return null == s2 ? e2 : e2 + `${r2 = r2.includes("-") ? r2 : r2.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s2};`;
    }, "");
  }
  update(e2, [r2]) {
    const { style: s2 } = e2.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r2)), this.render(r2);
    for (const t2 of this.ft) null == r2[t2] && (this.ft.delete(t2), t2.includes("-") ? s2.removeProperty(t2) : s2[t2] = null);
    for (const t2 in r2) {
      const e3 = r2[t2];
      if (null != e3) {
        this.ft.add(t2);
        const r3 = "string" == typeof e3 && e3.endsWith(i$2);
        t2.includes("-") || r3 ? s2.setProperty(t2, r3 ? e3.slice(0, -11) : e3, r3 ? n$3 : "") : s2[t2] = e3;
      }
    }
    return E;
  }
});
const r$1 = (o2) => void 0 === o2.strings, m = {}, p = (o2, t2 = m) => o2._$AH = t2;
const l$1 = e$2(class extends i$3 {
  constructor(r2) {
    if (super(r2), r2.type !== t.PROPERTY && r2.type !== t.ATTRIBUTE && r2.type !== t.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!r$1(r2)) throw Error("`live` bindings can only contain a single expression");
  }
  render(r2) {
    return r2;
  }
  update(i3, [t$12]) {
    if (t$12 === E || t$12 === A) return t$12;
    const o2 = i3.element, l2 = i3.name;
    if (i3.type === t.PROPERTY) {
      if (t$12 === o2[l2]) return E;
    } else if (i3.type === t.BOOLEAN_ATTRIBUTE) {
      if (!!t$12 === o2.hasAttribute(l2)) return E;
    } else if (i3.type === t.ATTRIBUTE && o2.getAttribute(l2) === t$12 + "") return E;
    return p(i3), t$12;
  }
});
const s = (i3, t2) => {
  const e2 = i3._$AN;
  if (void 0 === e2) return false;
  for (const i4 of e2) i4._$AO?.(t2, false), s(i4, t2);
  return true;
}, o$2 = (i3) => {
  let t2, e2;
  do {
    if (void 0 === (t2 = i3._$AM)) break;
    e2 = t2._$AN, e2.delete(i3), i3 = t2;
  } while (0 === e2?.size);
}, r = (i3) => {
  for (let t2; t2 = i3._$AM; i3 = t2) {
    let e2 = t2._$AN;
    if (void 0 === e2) t2._$AN = e2 = /* @__PURE__ */ new Set();
    else if (e2.has(i3)) break;
    e2.add(i3), c(t2);
  }
};
function h$1(i3) {
  void 0 !== this._$AN ? (o$2(this), this._$AM = i3, r(this)) : this._$AM = i3;
}
function n$2(i3, t2 = false, e2 = 0) {
  const r2 = this._$AH, h2 = this._$AN;
  if (void 0 !== h2 && 0 !== h2.size) if (t2) if (Array.isArray(r2)) for (let i4 = e2; i4 < r2.length; i4++) s(r2[i4], false), o$2(r2[i4]);
  else null != r2 && (s(r2, false), o$2(r2));
  else s(this, i3);
}
const c = (i3) => {
  i3.type == t.CHILD && (i3._$AP ??= n$2, i3._$AQ ??= h$1);
};
class f extends i$3 {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i3, t2, e2) {
    super._$AT(i3, t2, e2), r(this), this.isConnected = i3._$AU;
  }
  _$AO(i3, t2 = true) {
    i3 !== this.isConnected && (this.isConnected = i3, i3 ? this.reconnected?.() : this.disconnected?.()), t2 && (s(this, i3), o$2(this));
  }
  setValue(t2) {
    if (r$1(this._$Ct)) this._$Ct._$AI(t2, this);
    else {
      const i3 = [...this._$Ct._$AH];
      i3[this._$Ci] = t2, this._$Ct._$AI(i3, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
const e = () => new h();
class h {
}
const o$1 = /* @__PURE__ */ new WeakMap(), n$1 = e$2(class extends f {
  render(i3) {
    return A;
  }
  update(i3, [s2]) {
    const e2 = s2 !== this.G;
    return e2 && void 0 !== this.G && this.rt(void 0), (e2 || this.lt !== this.ct) && (this.G = s2, this.ht = i3.options?.host, this.rt(this.ct = i3.element)), A;
  }
  rt(t2) {
    if (this.isConnected || (t2 = void 0), "function" == typeof this.G) {
      const i3 = this.ht ?? globalThis;
      let s2 = o$1.get(i3);
      void 0 === s2 && (s2 = /* @__PURE__ */ new WeakMap(), o$1.set(i3, s2)), void 0 !== s2.get(this.G) && this.G.call(this.ht, void 0), s2.set(this.G, t2), void 0 !== t2 && this.G.call(this.ht, t2);
    } else this.G.value = t2;
  }
  get lt() {
    return "function" == typeof this.G ? o$1.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
const a = /* @__PURE__ */ Symbol.for(""), o = (t2) => {
  if (t2?.r === a) return t2?._$litStatic$;
}, i$1 = (t2, ...r2) => ({ _$litStatic$: r2.reduce((r3, e2, a2) => r3 + ((t3) => {
  if (void 0 !== t3._$litStatic$) return t3._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t3}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(e2) + t2[a2 + 1], t2[0]), r: a }), l = /* @__PURE__ */ new Map(), n = (t2) => (r2, ...e2) => {
  const a2 = e2.length;
  let s2, i3;
  const n2 = [], u2 = [];
  let c2, $2 = 0, f2 = false;
  for (; $2 < a2; ) {
    for (c2 = r2[$2]; $2 < a2 && void 0 !== (i3 = e2[$2], s2 = o(i3)); ) c2 += s2 + r2[++$2], f2 = true;
    $2 !== a2 && u2.push(i3), n2.push(c2), $2++;
  }
  if ($2 === a2 && n2.push(r2[a2]), f2) {
    const t3 = n2.join("$$lit$$");
    void 0 === (r2 = l.get(t3)) && (n2.raw = n2, l.set(t3, r2 = n2)), e2 = u2;
  }
  return t2(r2, ...e2);
}, u = n(T);
const i2 = e$2(class extends i$3 {
  constructor() {
    super(...arguments), this.key = A;
  }
  render(r2, t2) {
    return this.key = r2, t2;
  }
  update(r2, [t2, e2]) {
    return t2 !== this.key && (p(r2), this.key = t2), e2;
  }
});
export {
  A,
  B,
  E,
  T,
  e$1 as a,
  b,
  i2 as c,
  e,
  i$1 as i,
  l$1 as l,
  n$1 as n,
  o$3 as o,
  u
};
