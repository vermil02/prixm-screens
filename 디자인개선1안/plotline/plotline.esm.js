const Je = Symbol.for("yaml.alias"), _e = Symbol.for("yaml.document"), xt = Symbol.for("yaml.map"), qs = Symbol.for("yaml.pair"), pt = Symbol.for("yaml.scalar"), _t = Symbol.for("yaml.seq"), rt = Symbol.for("yaml.node.type"), Ut = (r) => !!r && typeof r == "object" && r[rt] === Je, xe = (r) => !!r && typeof r == "object" && r[rt] === _e, ee = (r) => !!r && typeof r == "object" && r[rt] === xt, W = (r) => !!r && typeof r == "object" && r[rt] === qs, B = (r) => !!r && typeof r == "object" && r[rt] === pt, se = (r) => !!r && typeof r == "object" && r[rt] === _t;
function U(r) {
  if (r && typeof r == "object")
    switch (r[rt]) {
      case xt:
      case _t:
        return !0;
    }
  return !1;
}
function H(r) {
  if (r && typeof r == "object")
    switch (r[rt]) {
      case Je:
      case xt:
      case pt:
      case _t:
        return !0;
    }
  return !1;
}
const Fs = (r) => (B(r) || U(r)) && !!r.anchor, St = Symbol("break visit"), Ai = Symbol("skip children"), Jt = Symbol("remove node");
function Ht(r, t) {
  const e = Ci(t);
  xe(r) ? Ot(null, r.contents, e, Object.freeze([r])) === Jt && (r.contents = null) : Ot(null, r, e, Object.freeze([]));
}
Ht.BREAK = St;
Ht.SKIP = Ai;
Ht.REMOVE = Jt;
function Ot(r, t, e, s) {
  const i = Ni(r, t, e, s);
  if (H(i) || W(i))
    return Ii(r, s, i), Ot(r, i, e, s);
  if (typeof i != "symbol") {
    if (U(t)) {
      s = Object.freeze(s.concat(t));
      for (let n = 0; n < t.items.length; ++n) {
        const o = Ot(n, t.items[n], e, s);
        if (typeof o == "number")
          n = o - 1;
        else {
          if (o === St)
            return St;
          o === Jt && (t.items.splice(n, 1), n -= 1);
        }
      }
    } else if (W(t)) {
      s = Object.freeze(s.concat(t));
      const n = Ot("key", t.key, e, s);
      if (n === St)
        return St;
      n === Jt && (t.key = null);
      const o = Ot("value", t.value, e, s);
      if (o === St)
        return St;
      o === Jt && (t.value = null);
    }
  }
  return i;
}
function Ci(r) {
  return typeof r == "object" && (r.Collection || r.Node || r.Value) ? Object.assign({
    Alias: r.Node,
    Map: r.Node,
    Scalar: r.Node,
    Seq: r.Node
  }, r.Value && {
    Map: r.Value,
    Scalar: r.Value,
    Seq: r.Value
  }, r.Collection && {
    Map: r.Collection,
    Seq: r.Collection
  }, r) : r;
}
function Ni(r, t, e, s) {
  if (typeof e == "function")
    return e(r, t, s);
  if (ee(t))
    return e.Map?.(r, t, s);
  if (se(t))
    return e.Seq?.(r, t, s);
  if (W(t))
    return e.Pair?.(r, t, s);
  if (B(t))
    return e.Scalar?.(r, t, s);
  if (Ut(t))
    return e.Alias?.(r, t, s);
}
function Ii(r, t, e) {
  const s = t[t.length - 1];
  if (U(s))
    s.items[r] = e;
  else if (W(s))
    r === "key" ? s.key = e : s.value = e;
  else if (xe(s))
    s.contents = e;
  else {
    const i = Ut(s) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${i} parent`);
  }
}
const Oi = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
}, Pi = (r) => r.replace(/[!,[\]{}]/g, (t) => Oi[t]);
class J {
  constructor(t, e) {
    this.docStart = null, this.docEnd = !1, this.yaml = Object.assign({}, J.defaultYaml, t), this.tags = Object.assign({}, J.defaultTags, e);
  }
  clone() {
    const t = new J(this.yaml, this.tags);
    return t.docStart = this.docStart, t;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const t = new J(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = !0;
        break;
      case "1.2":
        this.atNextDocument = !1, this.yaml = {
          explicit: J.defaultYaml.explicit,
          version: "1.2"
        }, this.tags = Object.assign({}, J.defaultTags);
        break;
    }
    return t;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(t, e) {
    this.atNextDocument && (this.yaml = { explicit: J.defaultYaml.explicit, version: "1.1" }, this.tags = Object.assign({}, J.defaultTags), this.atNextDocument = !1);
    const s = t.trim().split(/[ \t]+/), i = s.shift();
    switch (i) {
      case "%TAG": {
        if (s.length !== 2 && (e(0, "%TAG directive should contain exactly two parts"), s.length < 2))
          return !1;
        const [n, o] = s;
        return this.tags[n] = o, !0;
      }
      case "%YAML": {
        if (this.yaml.explicit = !0, s.length !== 1)
          return e(0, "%YAML directive should contain exactly one part"), !1;
        const [n] = s;
        if (n === "1.1" || n === "1.2")
          return this.yaml.version = n, !0;
        {
          const o = /^\d+\.\d+$/.test(n);
          return e(6, `Unsupported YAML version ${n}`, o), !1;
        }
      }
      default:
        return e(0, `Unknown directive ${i}`, !0), !1;
    }
  }
  /**
   * Resolves a tag, matching handles to those defined in %TAG directives.
   *
   * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
   *   `'!local'` tag, or `null` if unresolvable.
   */
  tagName(t, e) {
    if (t === "!")
      return "!";
    if (t[0] !== "!")
      return e(`Not a valid tag: ${t}`), null;
    if (t[1] === "<") {
      const o = t.slice(2, -1);
      return o === "!" || o === "!!" ? (e(`Verbatim tags aren't resolved, so ${t} is invalid.`), null) : (t[t.length - 1] !== ">" && e("Verbatim tags must end with a >"), o);
    }
    const [, s, i] = t.match(/^(.*!)([^!]*)$/s);
    i || e(`The ${t} tag has no suffix`);
    const n = this.tags[s];
    if (n)
      try {
        return n + decodeURIComponent(i);
      } catch (o) {
        return e(String(o)), null;
      }
    return s === "!" ? t : (e(`Could not resolve tag: ${t}`), null);
  }
  /**
   * Given a fully resolved tag, returns its printable string form,
   * taking into account current tag prefixes and defaults.
   */
  tagString(t) {
    for (const [e, s] of Object.entries(this.tags))
      if (t.startsWith(s))
        return e + Pi(t.substring(s.length));
    return t[0] === "!" ? t : `!<${t}>`;
  }
  toString(t) {
    const e = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], s = Object.entries(this.tags);
    let i;
    if (t && s.length > 0 && H(t.contents)) {
      const n = {};
      Ht(t.contents, (o, a) => {
        H(a) && a.tag && (n[a.tag] = !0);
      }), i = Object.keys(n);
    } else
      i = [];
    for (const [n, o] of s)
      n === "!!" && o === "tag:yaml.org,2002:" || (!t || i.some((a) => a.startsWith(o))) && e.push(`%TAG ${n} ${o}`);
    return e.join(`
`);
  }
}
J.defaultYaml = { explicit: !1, version: "1.2" };
J.defaultTags = { "!!": "tag:yaml.org,2002:" };
function zs(r) {
  if (/[\x00-\x19\s,[\]{}]/.test(r)) {
    const e = `Anchor must not contain whitespace or control characters: ${JSON.stringify(r)}`;
    throw new Error(e);
  }
  return !0;
}
function Bs(r) {
  const t = /* @__PURE__ */ new Set();
  return Ht(r, {
    Value(e, s) {
      s.anchor && t.add(s.anchor);
    }
  }), t;
}
function js(r, t) {
  for (let e = 1; ; ++e) {
    const s = `${r}${e}`;
    if (!t.has(s))
      return s;
  }
}
function qi(r, t) {
  const e = [], s = /* @__PURE__ */ new Map();
  let i = null;
  return {
    onAnchor: (n) => {
      e.push(n), i ?? (i = Bs(r));
      const o = js(t, i);
      return i.add(o), o;
    },
    /**
     * With circular references, the source node is only resolved after all
     * of its child nodes are. This is why anchors are set only after all of
     * the nodes have been created.
     */
    setAnchors: () => {
      for (const n of e) {
        const o = s.get(n);
        if (typeof o == "object" && o.anchor && (B(o.node) || U(o.node)))
          o.node.anchor = o.anchor;
        else {
          const a = new Error("Failed to resolve repeated object (this should not happen)");
          throw a.source = n, a;
        }
      }
    },
    sourceObjects: s
  };
}
function Pt(r, t, e, s) {
  if (s && typeof s == "object")
    if (Array.isArray(s))
      for (let i = 0, n = s.length; i < n; ++i) {
        const o = s[i], a = Pt(r, s, String(i), o);
        a === void 0 ? delete s[i] : a !== o && (s[i] = a);
      }
    else if (s instanceof Map)
      for (const i of Array.from(s.keys())) {
        const n = s.get(i), o = Pt(r, s, i, n);
        o === void 0 ? s.delete(i) : o !== n && s.set(i, o);
      }
    else if (s instanceof Set)
      for (const i of Array.from(s)) {
        const n = Pt(r, s, i, i);
        n === void 0 ? s.delete(i) : n !== i && (s.delete(i), s.add(n));
      }
    else
      for (const [i, n] of Object.entries(s)) {
        const o = Pt(r, s, i, n);
        o === void 0 ? delete s[i] : o !== n && (s[i] = o);
      }
  return r.call(t, e, s);
}
function nt(r, t, e) {
  if (Array.isArray(r))
    return r.map((s, i) => nt(s, String(i), e));
  if (r && typeof r.toJSON == "function") {
    if (!e || !Fs(r))
      return r.toJSON(t, e);
    const s = { aliasCount: 0, count: 1, res: void 0 };
    e.anchors.set(r, s), e.onCreate = (n) => {
      s.res = n, delete e.onCreate;
    };
    const i = r.toJSON(t, e);
    return e.onCreate && e.onCreate(i), i;
  }
  return typeof r == "bigint" && !e?.keep ? Number(r) : r;
}
class Qe {
  constructor(t) {
    Object.defineProperty(this, rt, { value: t });
  }
  /** Create a copy of this node.  */
  clone() {
    const t = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return this.range && (t.range = this.range.slice()), t;
  }
  /** A plain JavaScript representation of this node. */
  toJS(t, { mapAsMap: e, maxAliasCount: s, onAnchor: i, reviver: n } = {}) {
    if (!xe(t))
      throw new TypeError("A document argument is required");
    const o = {
      anchors: /* @__PURE__ */ new Map(),
      doc: t,
      keep: !0,
      mapAsMap: e === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof s == "number" ? s : 100
    }, a = nt(this, "", o);
    if (typeof i == "function")
      for (const { count: l, res: c } of o.anchors.values())
        i(c, l);
    return typeof n == "function" ? Pt(n, { "": a }, "", a) : a;
  }
}
class Ze extends Qe {
  constructor(t) {
    super(Je), this.source = t, Object.defineProperty(this, "tag", {
      set() {
        throw new Error("Alias nodes cannot have tags");
      }
    });
  }
  /**
   * Resolve the value of this alias within `doc`, finding the last
   * instance of the `source` anchor before this node.
   */
  resolve(t, e) {
    if (e?.maxAliasCount === 0)
      throw new ReferenceError("Alias resolution is disabled");
    let s;
    e?.aliasResolveCache ? s = e.aliasResolveCache : (s = [], Ht(t, {
      Node: (n, o) => {
        (Ut(o) || Fs(o)) && s.push(o);
      }
    }), e && (e.aliasResolveCache = s));
    let i;
    for (const n of s) {
      if (n === this)
        break;
      n.anchor === this.source && (i = n);
    }
    return i;
  }
  toJSON(t, e) {
    if (!e)
      return { source: this.source };
    const { anchors: s, doc: i, maxAliasCount: n } = e, o = this.resolve(i, e);
    if (!o) {
      const l = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
      throw new ReferenceError(l);
    }
    let a = s.get(o);
    if (a || (nt(o, null, e), a = s.get(o)), a?.res === void 0) {
      const l = "This should not happen: Alias anchor was not resolved?";
      throw new ReferenceError(l);
    }
    if (n >= 0 && (a.count += 1, a.aliasCount === 0 && (a.aliasCount = he(i, o, s)), a.count * a.aliasCount > n)) {
      const l = "Excessive alias count indicates a resource exhaustion attack";
      throw new ReferenceError(l);
    }
    return a.res;
  }
  toString(t, e, s) {
    const i = `*${this.source}`;
    if (t) {
      if (zs(this.source), t.options.verifyAliasOrder && !t.anchors.has(this.source)) {
        const n = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(n);
      }
      if (t.implicitKey)
        return `${i} `;
    }
    return i;
  }
}
function he(r, t, e) {
  if (Ut(t)) {
    const s = t.resolve(r), i = e && s && e.get(s);
    return i ? i.count * i.aliasCount : 0;
  } else if (U(t)) {
    let s = 0;
    for (const i of t.items) {
      const n = he(r, i, e);
      n > s && (s = n);
    }
    return s;
  } else if (W(t)) {
    const s = he(r, t.key, e), i = he(r, t.value, e);
    return Math.max(s, i);
  }
  return 1;
}
const Rs = (r) => !r || typeof r != "function" && typeof r != "object";
class C extends Qe {
  constructor(t) {
    super(pt), this.value = t;
  }
  toJSON(t, e) {
    return e?.keep ? this.value : nt(this.value, t, e);
  }
  toString() {
    return String(this.value);
  }
}
C.BLOCK_FOLDED = "BLOCK_FOLDED";
C.BLOCK_LITERAL = "BLOCK_LITERAL";
C.PLAIN = "PLAIN";
C.QUOTE_DOUBLE = "QUOTE_DOUBLE";
C.QUOTE_SINGLE = "QUOTE_SINGLE";
const Fi = "tag:yaml.org,2002:";
function zi(r, t, e) {
  if (t) {
    const s = e.filter((n) => n.tag === t), i = s.find((n) => !n.format) ?? s[0];
    if (!i)
      throw new Error(`Tag ${t} not found`);
    return i;
  }
  return e.find((s) => s.identify?.(r) && !s.format);
}
function Zt(r, t, e) {
  if (xe(r) && (r = r.contents), H(r))
    return r;
  if (W(r)) {
    const d = e.schema[xt].createNode?.(e.schema, null, e);
    return d.items.push(r), d;
  }
  (r instanceof String || r instanceof Number || r instanceof Boolean || typeof BigInt < "u" && r instanceof BigInt) && (r = r.valueOf());
  const { aliasDuplicateObjects: s, onAnchor: i, onTagObj: n, schema: o, sourceObjects: a } = e;
  let l;
  if (s && r && typeof r == "object") {
    if (l = a.get(r), l)
      return l.anchor ?? (l.anchor = i(r)), new Ze(l.anchor);
    l = { anchor: null, node: null }, a.set(r, l);
  }
  t?.startsWith("!!") && (t = Fi + t.slice(2));
  let c = zi(r, t, o.tags);
  if (!c) {
    if (r && typeof r.toJSON == "function" && (r = r.toJSON()), !r || typeof r != "object") {
      const d = new C(r);
      return l && (l.node = d), d;
    }
    c = r instanceof Map ? o[xt] : Symbol.iterator in Object(r) ? o[_t] : o[xt];
  }
  n && (n(c), delete e.onTagObj);
  const p = c?.createNode ? c.createNode(e.schema, r, e) : typeof c?.nodeClass?.from == "function" ? c.nodeClass.from(e.schema, r, e) : new C(r);
  return t ? p.tag = t : c.default || (p.tag = c.tag), l && (l.node = p), p;
}
function ge(r, t, e) {
  let s = e;
  for (let i = t.length - 1; i >= 0; --i) {
    const n = t[i];
    if (typeof n == "number" && Number.isInteger(n) && n >= 0) {
      const o = [];
      o[n] = s, s = o;
    } else
      s = /* @__PURE__ */ new Map([[n, s]]);
  }
  return Zt(s, void 0, {
    aliasDuplicateObjects: !1,
    keepUndefined: !1,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: r,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
const Xt = (r) => r == null || typeof r == "object" && !!r[Symbol.iterator]().next().done;
class _s extends Qe {
  constructor(t, e) {
    super(t), Object.defineProperty(this, "schema", {
      value: e,
      configurable: !0,
      enumerable: !1,
      writable: !0
    });
  }
  /**
   * Create a copy of this collection.
   *
   * @param schema - If defined, overwrites the original's schema
   */
  clone(t) {
    const e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return t && (e.schema = t), e.items = e.items.map((s) => H(s) || W(s) ? s.clone(t) : s), this.range && (e.range = this.range.slice()), e;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(t, e) {
    if (Xt(t))
      this.add(e);
    else {
      const [s, ...i] = t, n = this.get(s, !0);
      if (U(n))
        n.addIn(i, e);
      else if (n === void 0 && this.schema)
        this.set(s, ge(this.schema, i, e));
      else
        throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`);
    }
  }
  /**
   * Removes a value from the collection.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(t) {
    const [e, ...s] = t;
    if (s.length === 0)
      return this.delete(e);
    const i = this.get(e, !0);
    if (U(i))
      return i.deleteIn(s);
    throw new Error(`Expected YAML collection at ${e}. Remaining path: ${s}`);
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(t, e) {
    const [s, ...i] = t, n = this.get(s, !0);
    return i.length === 0 ? !e && B(n) ? n.value : n : U(n) ? n.getIn(i, e) : void 0;
  }
  hasAllNullValues(t) {
    return this.items.every((e) => {
      if (!W(e))
        return !1;
      const s = e.value;
      return s == null || t && B(s) && s.value == null && !s.commentBefore && !s.comment && !s.tag;
    });
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   */
  hasIn(t) {
    const [e, ...s] = t;
    if (s.length === 0)
      return this.has(e);
    const i = this.get(e, !0);
    return U(i) ? i.hasIn(s) : !1;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(t, e) {
    const [s, ...i] = t;
    if (i.length === 0)
      this.set(s, e);
    else {
      const n = this.get(s, !0);
      if (U(n))
        n.setIn(i, e);
      else if (n === void 0 && this.schema)
        this.set(s, ge(this.schema, i, e));
      else
        throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`);
    }
  }
}
const Bi = (r) => r.replace(/^(?!$)(?: $)?/gm, "#");
function ft(r, t) {
  return /^\n+$/.test(r) ? r.substring(1) : t ? r.replace(/^(?! *$)/gm, t) : r;
}
const Lt = (r, t, e) => r.endsWith(`
`) ? ft(e, t) : e.includes(`
`) ? `
` + ft(e, t) : (r.endsWith(" ") ? "" : " ") + e, Us = "flow", Ue = "block", ue = "quoted";
function we(r, t, e = "flow", { indentAtStart: s, lineWidth: i = 80, minContentWidth: n = 20, onFold: o, onOverflow: a } = {}) {
  if (!i || i < 0)
    return r;
  i < n && (n = 0);
  const l = Math.max(1 + n, 1 + i - t.length);
  if (r.length <= l)
    return r;
  const c = [], p = {};
  let d = i - t.length;
  typeof s == "number" && (s > i - Math.max(2, n) ? c.push(0) : d = i - s);
  let h, u, g = !1, f = -1, b = -1, x = -1;
  e === Ue && (f = gs(r, f, t.length), f !== -1 && (d = f + l));
  for (let m; m = r[f += 1]; ) {
    if (e === ue && m === "\\") {
      switch (b = f, r[f + 1]) {
        case "x":
          f += 3;
          break;
        case "u":
          f += 5;
          break;
        case "U":
          f += 9;
          break;
        default:
          f += 1;
      }
      x = f;
    }
    if (m === `
`)
      e === Ue && (f = gs(r, f, t.length)), d = f + t.length + l, h = void 0;
    else {
      if (m === " " && u && u !== " " && u !== `
` && u !== "	") {
        const v = r[f + 1];
        v && v !== " " && v !== `
` && v !== "	" && (h = f);
      }
      if (f >= d)
        if (h)
          c.push(h), d = h + l, h = void 0;
        else if (e === ue) {
          for (; u === " " || u === "	"; )
            u = m, m = r[f += 1], g = !0;
          const v = f > x + 1 ? f - 2 : b - 1;
          if (p[v])
            return r;
          c.push(v), p[v] = !0, d = v + l, h = void 0;
        } else
          g = !0;
    }
    u = m;
  }
  if (g && a && a(), c.length === 0)
    return r;
  o && o();
  let $ = r.slice(0, c[0]);
  for (let m = 0; m < c.length; ++m) {
    const v = c[m], w = c[m + 1] || r.length;
    v === 0 ? $ = `
${t}${r.slice(0, w)}` : (e === ue && p[v] && ($ += `${r[v]}\\`), $ += `
${t}${r.slice(v + 1, w)}`);
  }
  return $;
}
function gs(r, t, e) {
  let s = t, i = t + 1, n = r[i];
  for (; n === " " || n === "	"; )
    if (t < i + e)
      n = r[++t];
    else {
      do
        n = r[++t];
      while (n && n !== `
`);
      s = t, i = t + 1, n = r[i];
    }
  return s;
}
const ke = (r, t) => ({
  indentAtStart: t ? r.indent.length : r.indentAtStart,
  lineWidth: r.options.lineWidth,
  minContentWidth: r.options.minContentWidth
}), $e = (r) => /^(%|---|\.\.\.)/m.test(r);
function ji(r, t, e) {
  if (!t || t < 0)
    return !1;
  const s = t - e, i = r.length;
  if (i <= s)
    return !1;
  for (let n = 0, o = 0; n < i; ++n)
    if (r[n] === `
`) {
      if (n - o > s)
        return !0;
      if (o = n + 1, i - o <= s)
        return !1;
    }
  return !0;
}
function Qt(r, t) {
  const e = JSON.stringify(r);
  if (t.options.doubleQuotedAsJSON)
    return e;
  const { implicitKey: s } = t, i = t.options.doubleQuotedMinMultiLineLength, n = t.indent || ($e(r) ? "  " : "");
  let o = "", a = 0;
  for (let l = 0, c = e[l]; c; c = e[++l])
    if (c === " " && e[l + 1] === "\\" && e[l + 2] === "n" && (o += e.slice(a, l) + "\\ ", l += 1, a = l, c = "\\"), c === "\\")
      switch (e[l + 1]) {
        case "u":
          {
            o += e.slice(a, l);
            const p = e.substr(l + 2, 4);
            switch (p) {
              case "0000":
                o += "\\0";
                break;
              case "0007":
                o += "\\a";
                break;
              case "000b":
                o += "\\v";
                break;
              case "001b":
                o += "\\e";
                break;
              case "0085":
                o += "\\N";
                break;
              case "00a0":
                o += "\\_";
                break;
              case "2028":
                o += "\\L";
                break;
              case "2029":
                o += "\\P";
                break;
              default:
                p.substr(0, 2) === "00" ? o += "\\x" + p.substr(2) : o += e.substr(l, 6);
            }
            l += 5, a = l + 1;
          }
          break;
        case "n":
          if (s || e[l + 2] === '"' || e.length < i)
            l += 1;
          else {
            for (o += e.slice(a, l) + `

`; e[l + 2] === "\\" && e[l + 3] === "n" && e[l + 4] !== '"'; )
              o += `
`, l += 2;
            o += n, e[l + 2] === " " && (o += "\\"), l += 1, a = l + 1;
          }
          break;
        default:
          l += 1;
      }
  return o = a ? o + e.slice(a) : e, s ? o : we(o, n, ue, ke(t, !1));
}
function He(r, t) {
  if (t.options.singleQuote === !1 || t.implicitKey && r.includes(`
`) || /[ \t]\n|\n[ \t]/.test(r))
    return Qt(r, t);
  const e = t.indent || ($e(r) ? "  " : ""), s = "'" + r.replace(/'/g, "''").replace(/\n+/g, `$&
${e}`) + "'";
  return t.implicitKey ? s : we(s, e, Us, ke(t, !1));
}
function qt(r, t) {
  const { singleQuote: e } = t.options;
  let s;
  if (e === !1)
    s = Qt;
  else {
    const i = r.includes('"'), n = r.includes("'");
    i && !n ? s = He : n && !i ? s = Qt : s = e ? He : Qt;
  }
  return s(r, t);
}
let We;
try {
  We = new RegExp(`(^|(?<!
))
+(?!
|$)`, "g");
} catch {
  We = /\n+(?!\n|$)/g;
}
function fe({ comment: r, type: t, value: e }, s, i, n) {
  const { blockQuote: o, commentString: a, lineWidth: l } = s.options;
  if (!o || /\n[\t ]+$/.test(e))
    return qt(e, s);
  const c = s.indent || (s.forceBlockIndent || $e(e) ? "  " : ""), p = o === "literal" ? !0 : o === "folded" || t === C.BLOCK_FOLDED ? !1 : t === C.BLOCK_LITERAL ? !0 : !ji(e, l, c.length);
  if (!e)
    return p ? `|
` : `>
`;
  let d, h;
  for (h = e.length; h > 0; --h) {
    const w = e[h - 1];
    if (w !== `
` && w !== "	" && w !== " ")
      break;
  }
  let u = e.substring(h);
  const g = u.indexOf(`
`);
  g === -1 ? d = "-" : e === u || g !== u.length - 1 ? (d = "+", n && n()) : d = "", u && (e = e.slice(0, -u.length), u[u.length - 1] === `
` && (u = u.slice(0, -1)), u = u.replace(We, `$&${c}`));
  let f = !1, b, x = -1;
  for (b = 0; b < e.length; ++b) {
    const w = e[b];
    if (w === " ")
      f = !0;
    else if (w === `
`)
      x = b;
    else
      break;
  }
  let $ = e.substring(0, x < b ? x + 1 : b);
  $ && (e = e.substring($.length), $ = $.replace(/\n+/g, `$&${c}`));
  let v = (f ? c ? "2" : "1" : "") + d;
  if (r && (v += " " + a(r.replace(/ ?[\r\n]+/g, " ")), i && i()), !p) {
    const w = e.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${c}`);
    let k = !1;
    const E = ke(s, !0);
    o !== "folded" && t !== C.BLOCK_FOLDED && (E.onOverflow = () => {
      k = !0;
    });
    const y = we(`${$}${w}${u}`, c, Ue, E);
    if (!k)
      return `>${v}
${c}${y}`;
  }
  return e = e.replace(/\n+/g, `$&${c}`), `|${v}
${c}${$}${e}${u}`;
}
function Ri(r, t, e, s) {
  const { type: i, value: n } = r, { actualString: o, implicitKey: a, indent: l, indentStep: c, inFlow: p } = t;
  if (a && n.includes(`
`) || p && /[[\]{},]/.test(n))
    return qt(n, t);
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(n))
    return a || p || !n.includes(`
`) ? qt(n, t) : fe(r, t, e, s);
  if (!a && !p && i !== C.PLAIN && n.includes(`
`))
    return fe(r, t, e, s);
  if ($e(n)) {
    if (l === "")
      return t.forceBlockIndent = !0, fe(r, t, e, s);
    if (a && l === c)
      return qt(n, t);
  }
  const d = n.replace(/\n+/g, `$&
${l}`);
  if (o) {
    const h = (f) => f.default && f.tag !== "tag:yaml.org,2002:str" && f.test?.test(d), { compat: u, tags: g } = t.doc.schema;
    if (g.some(h) || u?.some(h))
      return qt(n, t);
  }
  return a ? d : we(d, l, Us, ke(t, !1));
}
function ts(r, t, e, s) {
  const { implicitKey: i, inFlow: n } = t, o = typeof r.value == "string" ? r : Object.assign({}, r, { value: String(r.value) });
  let { type: a } = r;
  a !== C.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value) && (a = C.QUOTE_DOUBLE);
  const l = (p) => {
    switch (p) {
      case C.BLOCK_FOLDED:
      case C.BLOCK_LITERAL:
        return i || n ? qt(o.value, t) : fe(o, t, e, s);
      case C.QUOTE_DOUBLE:
        return Qt(o.value, t);
      case C.QUOTE_SINGLE:
        return He(o.value, t);
      case C.PLAIN:
        return Ri(o, t, e, s);
      default:
        return null;
    }
  };
  let c = l(a);
  if (c === null) {
    const { defaultKeyType: p, defaultStringType: d } = t.options, h = i && p || d;
    if (c = l(h), c === null)
      throw new Error(`Unsupported default string type ${h}`);
  }
  return c;
}
function Hs(r, t) {
  const e = Object.assign({
    blockQuote: !0,
    commentString: Bi,
    defaultKeyType: null,
    defaultStringType: "PLAIN",
    directives: null,
    doubleQuotedAsJSON: !1,
    doubleQuotedMinMultiLineLength: 40,
    falseStr: "false",
    flowCollectionPadding: !0,
    indentSeq: !0,
    lineWidth: 80,
    minContentWidth: 20,
    nullStr: "null",
    simpleKeys: !1,
    singleQuote: null,
    trailingComma: !1,
    trueStr: "true",
    verifyAliasOrder: !0
  }, r.schema.toStringOptions, t);
  let s;
  switch (e.collectionStyle) {
    case "block":
      s = !1;
      break;
    case "flow":
      s = !0;
      break;
    default:
      s = null;
  }
  return {
    anchors: /* @__PURE__ */ new Set(),
    doc: r,
    flowCollectionPadding: e.flowCollectionPadding ? " " : "",
    indent: "",
    indentStep: typeof e.indent == "number" ? " ".repeat(e.indent) : "  ",
    inFlow: s,
    options: e
  };
}
function _i(r, t) {
  if (t.tag) {
    const i = r.filter((n) => n.tag === t.tag);
    if (i.length > 0)
      return i.find((n) => n.format === t.format) ?? i[0];
  }
  let e, s;
  if (B(t)) {
    s = t.value;
    let i = r.filter((n) => n.identify?.(s));
    if (i.length > 1) {
      const n = i.filter((o) => o.test);
      n.length > 0 && (i = n);
    }
    e = i.find((n) => n.format === t.format) ?? i.find((n) => !n.format);
  } else
    s = t, e = r.find((i) => i.nodeClass && s instanceof i.nodeClass);
  if (!e) {
    const i = s?.constructor?.name ?? (s === null ? "null" : typeof s);
    throw new Error(`Tag not resolved for ${i} value`);
  }
  return e;
}
function Ui(r, t, { anchors: e, doc: s }) {
  if (!s.directives)
    return "";
  const i = [], n = (B(r) || U(r)) && r.anchor;
  n && zs(n) && (e.add(n), i.push(`&${n}`));
  const o = r.tag ?? (t.default ? null : t.tag);
  return o && i.push(s.directives.tagString(o)), i.join(" ");
}
function jt(r, t, e, s) {
  if (W(r))
    return r.toString(t, e, s);
  if (Ut(r)) {
    if (t.doc.directives)
      return r.toString(t);
    if (t.resolvedAliases?.has(r))
      throw new TypeError("Cannot stringify circular structure without alias nodes");
    t.resolvedAliases ? t.resolvedAliases.add(r) : t.resolvedAliases = /* @__PURE__ */ new Set([r]), r = r.resolve(t.doc);
  }
  let i;
  const n = H(r) ? r : t.doc.createNode(r, { onTagObj: (l) => i = l });
  i ?? (i = _i(t.doc.schema.tags, n));
  const o = Ui(n, i, t);
  o.length > 0 && (t.indentAtStart = (t.indentAtStart ?? 0) + o.length + 1);
  const a = typeof i.stringify == "function" ? i.stringify(n, t, e, s) : B(n) ? ts(n, t, e, s) : n.toString(t, e, s);
  return o ? B(n) || a[0] === "{" || a[0] === "[" ? `${o} ${a}` : `${o}
${t.indent}${a}` : a;
}
function Hi({ key: r, value: t }, e, s, i) {
  const { allNullValues: n, doc: o, indent: a, indentStep: l, options: { commentString: c, indentSeq: p, simpleKeys: d } } = e;
  let h = H(r) && r.comment || null;
  if (d) {
    if (h)
      throw new Error("With simple keys, key nodes cannot have comments");
    if (U(r) || !H(r) && typeof r == "object") {
      const E = "With simple keys, collection cannot be used as a key value";
      throw new Error(E);
    }
  }
  let u = !d && (!r || h && t == null && !e.inFlow || U(r) || (B(r) ? r.type === C.BLOCK_FOLDED || r.type === C.BLOCK_LITERAL : typeof r == "object"));
  e = Object.assign({}, e, {
    allNullValues: !1,
    implicitKey: !u && (d || !n),
    indent: a + l
  });
  let g = !1, f = !1, b = jt(r, e, () => g = !0, () => f = !0);
  if (!u && !e.inFlow && b.length > 1024) {
    if (d)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    u = !0;
  }
  if (e.inFlow) {
    if (n || t == null)
      return g && s && s(), b === "" ? "?" : u ? `? ${b}` : b;
  } else if (n && !d || t == null && u)
    return b = `? ${b}`, h && !g ? b += Lt(b, e.indent, c(h)) : f && i && i(), b;
  g && (h = null), u ? (h && (b += Lt(b, e.indent, c(h))), b = `? ${b}
${a}:`) : (b = `${b}:`, h && (b += Lt(b, e.indent, c(h))));
  let x, $, m;
  H(t) ? (x = !!t.spaceBefore, $ = t.commentBefore, m = t.comment) : (x = !1, $ = null, m = null, t && typeof t == "object" && (t = o.createNode(t))), e.implicitKey = !1, !u && !h && B(t) && (e.indentAtStart = b.length + 1), f = !1, !p && l.length >= 2 && !e.inFlow && !u && se(t) && !t.flow && !t.tag && !t.anchor && (e.indent = e.indent.substring(2));
  let v = !1;
  const w = jt(t, e, () => v = !0, () => f = !0);
  let k = " ";
  if (h || x || $) {
    if (k = x ? `
` : "", $) {
      const E = c($);
      k += `
${ft(E, e.indent)}`;
    }
    w === "" && !e.inFlow ? k === `
` && m && (k = `

`) : k += `
${e.indent}`;
  } else if (!u && U(t)) {
    const E = w[0], y = w.indexOf(`
`), L = y !== -1, A = e.inFlow ?? t.flow ?? t.items.length === 0;
    if (L || !A) {
      let O = !1;
      if (L && (E === "&" || E === "!")) {
        let N = w.indexOf(" ");
        E === "&" && N !== -1 && N < y && w[N + 1] === "!" && (N = w.indexOf(" ", N + 1)), (N === -1 || y < N) && (O = !0);
      }
      O || (k = `
${e.indent}`);
    }
  } else (w === "" || w[0] === `
`) && (k = "");
  return b += k + w, e.inFlow ? v && s && s() : m && !v ? b += Lt(b, e.indent, c(m)) : f && i && i(), b;
}
function Ws(r, t) {
  (r === "debug" || r === "warn") && console.warn(t);
}
const re = "<<", gt = {
  identify: (r) => r === re || typeof r == "symbol" && r.description === re,
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new C(Symbol(re)), {
    addToJSMap: Ks
  }),
  stringify: () => re
}, Wi = (r, t) => (gt.identify(t) || B(t) && (!t.type || t.type === C.PLAIN) && gt.identify(t.value)) && r?.doc.schema.tags.some((e) => e.tag === gt.tag && e.default);
function Ks(r, t, e) {
  const s = Ys(r, e);
  if (se(s))
    for (const i of s.items)
      Ce(r, t, i);
  else if (Array.isArray(s))
    for (const i of s)
      Ce(r, t, i);
  else
    Ce(r, t, s);
}
function Ce(r, t, e) {
  const s = Ys(r, e);
  if (!ee(s))
    throw new Error("Merge sources must be maps or map aliases");
  const i = s.toJSON(null, r, Map);
  for (const [n, o] of i)
    t instanceof Map ? t.has(n) || t.set(n, o) : t instanceof Set ? t.add(n) : Object.prototype.hasOwnProperty.call(t, n) || Object.defineProperty(t, n, {
      value: o,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  return t;
}
function Ys(r, t) {
  return r && Ut(t) ? t.resolve(r.doc, r) : t;
}
function Vs(r, t, { key: e, value: s }) {
  if (H(e) && e.addToJSMap)
    e.addToJSMap(r, t, s);
  else if (Wi(r, e))
    Ks(r, t, s);
  else {
    const i = nt(e, "", r);
    if (t instanceof Map)
      t.set(i, nt(s, i, r));
    else if (t instanceof Set)
      t.add(i);
    else {
      const n = Ki(e, i, r), o = nt(s, n, r);
      n in t ? Object.defineProperty(t, n, {
        value: o,
        writable: !0,
        enumerable: !0,
        configurable: !0
      }) : t[n] = o;
    }
  }
  return t;
}
function Ki(r, t, e) {
  if (t === null)
    return "";
  if (typeof t != "object")
    return String(t);
  if (H(r) && e?.doc) {
    const s = Hs(e.doc, {});
    s.anchors = /* @__PURE__ */ new Set();
    for (const n of e.anchors.keys())
      s.anchors.add(n.anchor);
    s.inFlow = !0, s.inStringifyKey = !0;
    const i = r.toString(s);
    if (!e.mapKeyWarned) {
      let n = JSON.stringify(i);
      n.length > 40 && (n = n.substring(0, 36) + '..."'), Ws(e.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${n}. Set mapAsMap: true to use object keys.`), e.mapKeyWarned = !0;
    }
    return i;
  }
  return JSON.stringify(t);
}
function es(r, t, e) {
  const s = Zt(r, void 0, e), i = Zt(t, void 0, e);
  return new Q(s, i);
}
class Q {
  constructor(t, e = null) {
    Object.defineProperty(this, rt, { value: qs }), this.key = t, this.value = e;
  }
  clone(t) {
    let { key: e, value: s } = this;
    return H(e) && (e = e.clone(t)), H(s) && (s = s.clone(t)), new Q(e, s);
  }
  toJSON(t, e) {
    const s = e?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return Vs(e, s, this);
  }
  toString(t, e, s) {
    return t?.doc ? Hi(this, t, e, s) : JSON.stringify(this);
  }
}
function Xs(r, t, e) {
  return (t.inFlow ?? r.flow ? Vi : Yi)(r, t, e);
}
function Yi({ comment: r, items: t }, e, { blockItemPrefix: s, flowChars: i, itemIndent: n, onChompKeep: o, onComment: a }) {
  const { indent: l, options: { commentString: c } } = e, p = Object.assign({}, e, { indent: n, type: null });
  let d = !1;
  const h = [];
  for (let g = 0; g < t.length; ++g) {
    const f = t[g];
    let b = null;
    if (H(f))
      !d && f.spaceBefore && h.push(""), me(e, h, f.commentBefore, d), f.comment && (b = f.comment);
    else if (W(f)) {
      const $ = H(f.key) ? f.key : null;
      $ && (!d && $.spaceBefore && h.push(""), me(e, h, $.commentBefore, d));
    }
    d = !1;
    let x = jt(f, p, () => b = null, () => d = !0);
    b && (x += Lt(x, n, c(b))), d && b && (d = !1), h.push(s + x);
  }
  let u;
  if (h.length === 0)
    u = i.start + i.end;
  else {
    u = h[0];
    for (let g = 1; g < h.length; ++g) {
      const f = h[g];
      u += f ? `
${l}${f}` : `
`;
    }
  }
  return r ? (u += `
` + ft(c(r), l), a && a()) : d && o && o(), u;
}
function Vi({ items: r }, t, { flowChars: e, itemIndent: s }) {
  const { indent: i, indentStep: n, flowCollectionPadding: o, options: { commentString: a } } = t;
  s += n;
  const l = Object.assign({}, t, {
    indent: s,
    inFlow: !0,
    type: null
  });
  let c = !1, p = 0;
  const d = [];
  for (let g = 0; g < r.length; ++g) {
    const f = r[g];
    let b = null;
    if (H(f))
      f.spaceBefore && d.push(""), me(t, d, f.commentBefore, !1), f.comment && (b = f.comment);
    else if (W(f)) {
      const $ = H(f.key) ? f.key : null;
      $ && ($.spaceBefore && d.push(""), me(t, d, $.commentBefore, !1), $.comment && (c = !0));
      const m = H(f.value) ? f.value : null;
      m ? (m.comment && (b = m.comment), m.commentBefore && (c = !0)) : f.value == null && $?.comment && (b = $.comment);
    }
    b && (c = !0);
    let x = jt(f, l, () => b = null);
    c || (c = d.length > p || x.includes(`
`)), g < r.length - 1 ? x += "," : t.options.trailingComma && (t.options.lineWidth > 0 && (c || (c = d.reduce(($, m) => $ + m.length + 2, 2) + (x.length + 2) > t.options.lineWidth)), c && (x += ",")), b && (x += Lt(x, s, a(b))), d.push(x), p = d.length;
  }
  const { start: h, end: u } = e;
  if (d.length === 0)
    return h + u;
  if (!c) {
    const g = d.reduce((f, b) => f + b.length + 2, 2);
    c = t.options.lineWidth > 0 && g > t.options.lineWidth;
  }
  if (c) {
    let g = h;
    for (const f of d)
      g += f ? `
${n}${i}${f}` : `
`;
    return `${g}
${i}${u}`;
  } else
    return `${h}${o}${d.join(" ")}${o}${u}`;
}
function me({ indent: r, options: { commentString: t } }, e, s, i) {
  if (s && i && (s = s.replace(/^\n+/, "")), s) {
    const n = ft(t(s), r);
    e.push(n.trimStart());
  }
}
function Tt(r, t) {
  const e = B(t) ? t.value : t;
  for (const s of r)
    if (W(s) && (s.key === t || s.key === e || B(s.key) && s.key.value === e))
      return s;
}
class it extends _s {
  static get tagName() {
    return "tag:yaml.org,2002:map";
  }
  constructor(t) {
    super(xt, t), this.items = [];
  }
  /**
   * A generic collection parsing method that can be extended
   * to other node classes that inherit from YAMLMap
   */
  static from(t, e, s) {
    const { keepUndefined: i, replacer: n } = s, o = new this(t), a = (l, c) => {
      if (typeof n == "function")
        c = n.call(e, l, c);
      else if (Array.isArray(n) && !n.includes(l))
        return;
      (c !== void 0 || i) && o.items.push(es(l, c, s));
    };
    if (e instanceof Map)
      for (const [l, c] of e)
        a(l, c);
    else if (e && typeof e == "object")
      for (const l of Object.keys(e))
        a(l, e[l]);
    return typeof t.sortMapEntries == "function" && o.items.sort(t.sortMapEntries), o;
  }
  /**
   * Adds a value to the collection.
   *
   * @param overwrite - If not set `true`, using a key that is already in the
   *   collection will throw. Otherwise, overwrites the previous value.
   */
  add(t, e) {
    let s;
    W(t) ? s = t : !t || typeof t != "object" || !("key" in t) ? s = new Q(t, t?.value) : s = new Q(t.key, t.value);
    const i = Tt(this.items, s.key), n = this.schema?.sortMapEntries;
    if (i) {
      if (!e)
        throw new Error(`Key ${s.key} already set`);
      B(i.value) && Rs(s.value) ? i.value.value = s.value : i.value = s.value;
    } else if (n) {
      const o = this.items.findIndex((a) => n(s, a) < 0);
      o === -1 ? this.items.push(s) : this.items.splice(o, 0, s);
    } else
      this.items.push(s);
  }
  delete(t) {
    const e = Tt(this.items, t);
    return e ? this.items.splice(this.items.indexOf(e), 1).length > 0 : !1;
  }
  get(t, e) {
    const i = Tt(this.items, t)?.value;
    return (!e && B(i) ? i.value : i) ?? void 0;
  }
  has(t) {
    return !!Tt(this.items, t);
  }
  set(t, e) {
    this.add(new Q(t, e), !0);
  }
  /**
   * @param ctx - Conversion context, originally set in Document#toJS()
   * @param {Class} Type - If set, forces the returned collection type
   * @returns Instance of Type, Map, or Object
   */
  toJSON(t, e, s) {
    const i = s ? new s() : e?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    e?.onCreate && e.onCreate(i);
    for (const n of this.items)
      Vs(e, i, n);
    return i;
  }
  toString(t, e, s) {
    if (!t)
      return JSON.stringify(this);
    for (const i of this.items)
      if (!W(i))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);
    return !t.allNullValues && this.hasAllNullValues(!1) && (t = Object.assign({}, t, { allNullValues: !0 })), Xs(this, t, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: t.indent || "",
      onChompKeep: s,
      onComment: e
    });
  }
}
const Wt = {
  collection: "map",
  default: !0,
  nodeClass: it,
  tag: "tag:yaml.org,2002:map",
  resolve(r, t) {
    return ee(r) || t("Expected a mapping for this tag"), r;
  },
  createNode: (r, t, e) => it.from(r, t, e)
};
class Dt extends _s {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(t) {
    super(_t, t), this.items = [];
  }
  add(t) {
    this.items.push(t);
  }
  /**
   * Removes a value from the collection.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   *
   * @returns `true` if the item was found and removed.
   */
  delete(t) {
    const e = oe(t);
    return typeof e != "number" ? !1 : this.items.splice(e, 1).length > 0;
  }
  get(t, e) {
    const s = oe(t);
    if (typeof s != "number")
      return;
    const i = this.items[s];
    return !e && B(i) ? i.value : i;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(t) {
    const e = oe(t);
    return typeof e == "number" && e < this.items.length;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   *
   * If `key` does not contain a representation of an integer, this will throw.
   * It may be wrapped in a `Scalar`.
   */
  set(t, e) {
    const s = oe(t);
    if (typeof s != "number")
      throw new Error(`Expected a valid index, not ${t}.`);
    const i = this.items[s];
    B(i) && Rs(e) ? i.value = e : this.items[s] = e;
  }
  toJSON(t, e) {
    const s = [];
    e?.onCreate && e.onCreate(s);
    let i = 0;
    for (const n of this.items)
      s.push(nt(n, String(i++), e));
    return s;
  }
  toString(t, e, s) {
    return t ? Xs(this, t, {
      blockItemPrefix: "- ",
      flowChars: { start: "[", end: "]" },
      itemIndent: (t.indent || "") + "  ",
      onChompKeep: s,
      onComment: e
    }) : JSON.stringify(this);
  }
  static from(t, e, s) {
    const { replacer: i } = s, n = new this(t);
    if (e && Symbol.iterator in Object(e)) {
      let o = 0;
      for (let a of e) {
        if (typeof i == "function") {
          const l = e instanceof Set ? a : String(o++);
          a = i.call(e, l, a);
        }
        n.items.push(Zt(a, void 0, s));
      }
    }
    return n;
  }
}
function oe(r) {
  let t = B(r) ? r.value : r;
  return t && typeof t == "string" && (t = Number(t)), typeof t == "number" && Number.isInteger(t) && t >= 0 ? t : null;
}
const Kt = {
  collection: "seq",
  default: !0,
  nodeClass: Dt,
  tag: "tag:yaml.org,2002:seq",
  resolve(r, t) {
    return se(r) || t("Expected a sequence for this tag"), r;
  },
  createNode: (r, t, e) => Dt.from(r, t, e)
}, Se = {
  identify: (r) => typeof r == "string",
  default: !0,
  tag: "tag:yaml.org,2002:str",
  resolve: (r) => r,
  stringify(r, t, e, s) {
    return t = Object.assign({ actualString: !0 }, t), ts(r, t, e, s);
  }
}, Ee = {
  identify: (r) => r == null,
  createNode: () => new C(null),
  default: !0,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new C(null),
  stringify: ({ source: r }, t) => typeof r == "string" && Ee.test.test(r) ? r : t.options.nullStr
}, ss = {
  identify: (r) => typeof r == "boolean",
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (r) => new C(r[0] === "t" || r[0] === "T"),
  stringify({ source: r, value: t }, e) {
    if (r && ss.test.test(r)) {
      const s = r[0] === "t" || r[0] === "T";
      if (t === s)
        return r;
    }
    return t ? e.options.trueStr : e.options.falseStr;
  }
};
function lt({ format: r, minFractionDigits: t, tag: e, value: s }) {
  if (typeof s == "bigint")
    return String(s);
  const i = typeof s == "number" ? s : Number(s);
  if (!isFinite(i))
    return isNaN(i) ? ".nan" : i < 0 ? "-.inf" : ".inf";
  let n = Object.is(s, -0) ? "-0" : JSON.stringify(s);
  if (!r && t && (!e || e === "tag:yaml.org,2002:float") && /^-?\d/.test(n) && !n.includes("e")) {
    let o = n.indexOf(".");
    o < 0 && (o = n.length, n += ".");
    let a = t - (n.length - o - 1);
    for (; a-- > 0; )
      n += "0";
  }
  return n;
}
const Gs = {
  identify: (r) => typeof r == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (r) => r.slice(-3).toLowerCase() === "nan" ? NaN : r[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: lt
}, Js = {
  identify: (r) => typeof r == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (r) => parseFloat(r),
  stringify(r) {
    const t = Number(r.value);
    return isFinite(t) ? t.toExponential() : lt(r);
  }
}, Qs = {
  identify: (r) => typeof r == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(r) {
    const t = new C(parseFloat(r)), e = r.indexOf(".");
    return e !== -1 && r[r.length - 1] === "0" && (t.minFractionDigits = r.length - e - 1), t;
  },
  stringify: lt
}, Le = (r) => typeof r == "bigint" || Number.isInteger(r), is = (r, t, e, { intAsBigInt: s }) => s ? BigInt(r) : parseInt(r.substring(t), e);
function Zs(r, t, e) {
  const { value: s } = r;
  return Le(s) && s >= 0 ? e + s.toString(t) : lt(r);
}
const ti = {
  identify: (r) => Le(r) && r >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (r, t, e) => is(r, 2, 8, e),
  stringify: (r) => Zs(r, 8, "0o")
}, ei = {
  identify: Le,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (r, t, e) => is(r, 0, 10, e),
  stringify: lt
}, si = {
  identify: (r) => Le(r) && r >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (r, t, e) => is(r, 2, 16, e),
  stringify: (r) => Zs(r, 16, "0x")
}, Xi = [
  Wt,
  Kt,
  Se,
  Ee,
  ss,
  ti,
  ei,
  si,
  Gs,
  Js,
  Qs
];
function ms(r) {
  return typeof r == "bigint" || Number.isInteger(r);
}
const ae = ({ value: r }) => JSON.stringify(r), Gi = [
  {
    identify: (r) => typeof r == "string",
    default: !0,
    tag: "tag:yaml.org,2002:str",
    resolve: (r) => r,
    stringify: ae
  },
  {
    identify: (r) => r == null,
    createNode: () => new C(null),
    default: !0,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: ae
  },
  {
    identify: (r) => typeof r == "boolean",
    default: !0,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (r) => r === "true",
    stringify: ae
  },
  {
    identify: ms,
    default: !0,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (r, t, { intAsBigInt: e }) => e ? BigInt(r) : parseInt(r, 10),
    stringify: ({ value: r }) => ms(r) ? r.toString() : JSON.stringify(r)
  },
  {
    identify: (r) => typeof r == "number",
    default: !0,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (r) => parseFloat(r),
    stringify: ae
  }
], Ji = {
  default: !0,
  tag: "",
  test: /^/,
  resolve(r, t) {
    return t(`Unresolved plain scalar ${JSON.stringify(r)}`), r;
  }
}, Qi = [Wt, Kt].concat(Gi, Ji), ns = {
  identify: (r) => r instanceof Uint8Array,
  // Buffer inherits from Uint8Array
  default: !1,
  tag: "tag:yaml.org,2002:binary",
  /**
   * Returns a Buffer in node and an Uint8Array in browsers
   *
   * To use the resulting buffer as an image, you'll want to do something like:
   *
   *   const blob = new Blob([buffer], { type: 'image/jpeg' })
   *   document.querySelector('#photo').src = URL.createObjectURL(blob)
   */
  resolve(r, t) {
    if (typeof atob == "function") {
      const e = atob(r.replace(/[\n\r]/g, "")), s = new Uint8Array(e.length);
      for (let i = 0; i < e.length; ++i)
        s[i] = e.charCodeAt(i);
      return s;
    } else
      return t("This environment does not support reading binary tags; either Buffer or atob is required"), r;
  },
  stringify({ comment: r, type: t, value: e }, s, i, n) {
    if (!e)
      return "";
    const o = e;
    let a;
    if (typeof btoa == "function") {
      let l = "";
      for (let c = 0; c < o.length; ++c)
        l += String.fromCharCode(o[c]);
      a = btoa(l);
    } else
      throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    if (t ?? (t = C.BLOCK_LITERAL), t !== C.QUOTE_DOUBLE) {
      const l = Math.max(s.options.lineWidth - s.indent.length, s.options.minContentWidth), c = Math.ceil(a.length / l), p = new Array(c);
      for (let d = 0, h = 0; d < c; ++d, h += l)
        p[d] = a.substr(h, l);
      a = p.join(t === C.BLOCK_LITERAL ? `
` : " ");
    }
    return ts({ comment: r, type: t, value: a }, s, i, n);
  }
};
function ii(r, t) {
  if (se(r))
    for (let e = 0; e < r.items.length; ++e) {
      let s = r.items[e];
      if (!W(s)) {
        if (ee(s)) {
          s.items.length > 1 && t("Each pair must have its own sequence indicator");
          const i = s.items[0] || new Q(new C(null));
          if (s.commentBefore && (i.key.commentBefore = i.key.commentBefore ? `${s.commentBefore}
${i.key.commentBefore}` : s.commentBefore), s.comment) {
            const n = i.value ?? i.key;
            n.comment = n.comment ? `${s.comment}
${n.comment}` : s.comment;
          }
          s = i;
        }
        r.items[e] = W(s) ? s : new Q(s);
      }
    }
  else
    t("Expected a sequence for this tag");
  return r;
}
function ni(r, t, e) {
  const { replacer: s } = e, i = new Dt(r);
  i.tag = "tag:yaml.org,2002:pairs";
  let n = 0;
  if (t && Symbol.iterator in Object(t))
    for (let o of t) {
      typeof s == "function" && (o = s.call(t, String(n++), o));
      let a, l;
      if (Array.isArray(o))
        if (o.length === 2)
          a = o[0], l = o[1];
        else
          throw new TypeError(`Expected [key, value] tuple: ${o}`);
      else if (o && o instanceof Object) {
        const c = Object.keys(o);
        if (c.length === 1)
          a = c[0], l = o[a];
        else
          throw new TypeError(`Expected tuple with one key, not ${c.length} keys`);
      } else
        a = o;
      i.items.push(es(a, l, e));
    }
  return i;
}
const rs = {
  collection: "seq",
  default: !1,
  tag: "tag:yaml.org,2002:pairs",
  resolve: ii,
  createNode: ni
};
class Ft extends Dt {
  constructor() {
    super(), this.add = it.prototype.add.bind(this), this.delete = it.prototype.delete.bind(this), this.get = it.prototype.get.bind(this), this.has = it.prototype.has.bind(this), this.set = it.prototype.set.bind(this), this.tag = Ft.tag;
  }
  /**
   * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
   * but TypeScript won't allow widening the signature of a child method.
   */
  toJSON(t, e) {
    if (!e)
      return super.toJSON(t);
    const s = /* @__PURE__ */ new Map();
    e?.onCreate && e.onCreate(s);
    for (const i of this.items) {
      let n, o;
      if (W(i) ? (n = nt(i.key, "", e), o = nt(i.value, n, e)) : n = nt(i, "", e), s.has(n))
        throw new Error("Ordered maps must not include duplicate keys");
      s.set(n, o);
    }
    return s;
  }
  static from(t, e, s) {
    const i = ni(t, e, s), n = new this();
    return n.items = i.items, n;
  }
}
Ft.tag = "tag:yaml.org,2002:omap";
const os = {
  collection: "seq",
  identify: (r) => r instanceof Map,
  nodeClass: Ft,
  default: !1,
  tag: "tag:yaml.org,2002:omap",
  resolve(r, t) {
    const e = ii(r, t), s = [];
    for (const { key: i } of e.items)
      B(i) && (s.includes(i.value) ? t(`Ordered maps must not include duplicate keys: ${i.value}`) : s.push(i.value));
    return Object.assign(new Ft(), e);
  },
  createNode: (r, t, e) => Ft.from(r, t, e)
};
function ri({ value: r, source: t }, e) {
  return t && (r ? oi : ai).test.test(t) ? t : r ? e.options.trueStr : e.options.falseStr;
}
const oi = {
  identify: (r) => r === !0,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new C(!0),
  stringify: ri
}, ai = {
  identify: (r) => r === !1,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new C(!1),
  stringify: ri
}, Zi = {
  identify: (r) => typeof r == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (r) => r.slice(-3).toLowerCase() === "nan" ? NaN : r[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: lt
}, tn = {
  identify: (r) => typeof r == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (r) => parseFloat(r.replace(/_/g, "")),
  stringify(r) {
    const t = Number(r.value);
    return isFinite(t) ? t.toExponential() : lt(r);
  }
}, en = {
  identify: (r) => typeof r == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(r) {
    const t = new C(parseFloat(r.replace(/_/g, ""))), e = r.indexOf(".");
    if (e !== -1) {
      const s = r.substring(e + 1).replace(/_/g, "");
      s[s.length - 1] === "0" && (t.minFractionDigits = s.length);
    }
    return t;
  },
  stringify: lt
}, ie = (r) => typeof r == "bigint" || Number.isInteger(r);
function Te(r, t, e, { intAsBigInt: s }) {
  const i = r[0];
  if ((i === "-" || i === "+") && (t += 1), r = r.substring(t).replace(/_/g, ""), s) {
    switch (e) {
      case 2:
        r = `0b${r}`;
        break;
      case 8:
        r = `0o${r}`;
        break;
      case 16:
        r = `0x${r}`;
        break;
    }
    const o = BigInt(r);
    return i === "-" ? BigInt(-1) * o : o;
  }
  const n = parseInt(r, e);
  return i === "-" ? -1 * n : n;
}
function as(r, t, e) {
  const { value: s } = r;
  if (ie(s)) {
    const i = s.toString(t);
    return s < 0 ? "-" + e + i.substr(1) : e + i;
  }
  return lt(r);
}
const sn = {
  identify: ie,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (r, t, e) => Te(r, 2, 2, e),
  stringify: (r) => as(r, 2, "0b")
}, nn = {
  identify: ie,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (r, t, e) => Te(r, 1, 8, e),
  stringify: (r) => as(r, 8, "0")
}, rn = {
  identify: ie,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (r, t, e) => Te(r, 0, 10, e),
  stringify: lt
}, on = {
  identify: ie,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (r, t, e) => Te(r, 2, 16, e),
  stringify: (r) => as(r, 16, "0x")
};
class zt extends it {
  constructor(t) {
    super(t), this.tag = zt.tag;
  }
  add(t) {
    let e;
    W(t) ? e = t : t && typeof t == "object" && "key" in t && "value" in t && t.value === null ? e = new Q(t.key, null) : e = new Q(t, null), Tt(this.items, e.key) || this.items.push(e);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(t, e) {
    const s = Tt(this.items, t);
    return !e && W(s) ? B(s.key) ? s.key.value : s.key : s;
  }
  set(t, e) {
    if (typeof e != "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof e}`);
    const s = Tt(this.items, t);
    s && !e ? this.items.splice(this.items.indexOf(s), 1) : !s && e && this.items.push(new Q(t));
  }
  toJSON(t, e) {
    return super.toJSON(t, e, Set);
  }
  toString(t, e, s) {
    if (!t)
      return JSON.stringify(this);
    if (this.hasAllNullValues(!0))
      return super.toString(Object.assign({}, t, { allNullValues: !0 }), e, s);
    throw new Error("Set items must all have null values");
  }
  static from(t, e, s) {
    const { replacer: i } = s, n = new this(t);
    if (e && Symbol.iterator in Object(e))
      for (let o of e)
        typeof i == "function" && (o = i.call(e, o, o)), n.items.push(es(o, null, s));
    return n;
  }
}
zt.tag = "tag:yaml.org,2002:set";
const ls = {
  collection: "map",
  identify: (r) => r instanceof Set,
  nodeClass: zt,
  default: !1,
  tag: "tag:yaml.org,2002:set",
  createNode: (r, t, e) => zt.from(r, t, e),
  resolve(r, t) {
    if (ee(r)) {
      if (r.hasAllNullValues(!0))
        return Object.assign(new zt(), r);
      t("Set items must all have null values");
    } else
      t("Expected a mapping for this tag");
    return r;
  }
};
function cs(r, t) {
  const e = r[0], s = e === "-" || e === "+" ? r.substring(1) : r, i = (o) => t ? BigInt(o) : Number(o), n = s.replace(/_/g, "").split(":").reduce((o, a) => o * i(60) + i(a), i(0));
  return e === "-" ? i(-1) * n : n;
}
function li(r) {
  let { value: t } = r, e = (o) => o;
  if (typeof t == "bigint")
    e = (o) => BigInt(o);
  else if (isNaN(t) || !isFinite(t))
    return lt(r);
  let s = "";
  t < 0 && (s = "-", t *= e(-1));
  const i = e(60), n = [t % i];
  return t < 60 ? n.unshift(0) : (t = (t - n[0]) / i, n.unshift(t % i), t >= 60 && (t = (t - n[0]) / i, n.unshift(t))), s + n.map((o) => String(o).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
const ci = {
  identify: (r) => typeof r == "bigint" || Number.isInteger(r),
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (r, t, { intAsBigInt: e }) => cs(r, e),
  stringify: li
}, di = {
  identify: (r) => typeof r == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (r) => cs(r, !1),
  stringify: li
}, Me = {
  identify: (r) => r instanceof Date,
  default: !0,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(r) {
    const t = r.match(Me.test);
    if (!t)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, e, s, i, n, o, a] = t.map(Number), l = t[7] ? Number((t[7] + "00").substr(1, 3)) : 0;
    let c = Date.UTC(e, s - 1, i, n || 0, o || 0, a || 0, l);
    const p = t[8];
    if (p && p !== "Z") {
      let d = cs(p, !1);
      Math.abs(d) < 30 && (d *= 60), c -= 6e4 * d;
    }
    return new Date(c);
  },
  stringify: ({ value: r }) => r?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
}, bs = [
  Wt,
  Kt,
  Se,
  Ee,
  oi,
  ai,
  sn,
  nn,
  rn,
  on,
  Zi,
  tn,
  en,
  ns,
  gt,
  os,
  rs,
  ls,
  ci,
  di,
  Me
], ys = /* @__PURE__ */ new Map([
  ["core", Xi],
  ["failsafe", [Wt, Kt, Se]],
  ["json", Qi],
  ["yaml11", bs],
  ["yaml-1.1", bs]
]), vs = {
  binary: ns,
  bool: ss,
  float: Qs,
  floatExp: Js,
  floatNaN: Gs,
  floatTime: di,
  int: ei,
  intHex: si,
  intOct: ti,
  intTime: ci,
  map: Wt,
  merge: gt,
  null: Ee,
  omap: os,
  pairs: rs,
  seq: Kt,
  set: ls,
  timestamp: Me
}, an = {
  "tag:yaml.org,2002:binary": ns,
  "tag:yaml.org,2002:merge": gt,
  "tag:yaml.org,2002:omap": os,
  "tag:yaml.org,2002:pairs": rs,
  "tag:yaml.org,2002:set": ls,
  "tag:yaml.org,2002:timestamp": Me
};
function Ne(r, t, e) {
  const s = ys.get(t);
  if (s && !r)
    return e && !s.includes(gt) ? s.concat(gt) : s.slice();
  let i = s;
  if (!i)
    if (Array.isArray(r))
      i = [];
    else {
      const n = Array.from(ys.keys()).filter((o) => o !== "yaml11").map((o) => JSON.stringify(o)).join(", ");
      throw new Error(`Unknown schema "${t}"; use one of ${n} or define customTags array`);
    }
  if (Array.isArray(r))
    for (const n of r)
      i = i.concat(n);
  else typeof r == "function" && (i = r(i.slice()));
  return e && (i = i.concat(gt)), i.reduce((n, o) => {
    const a = typeof o == "string" ? vs[o] : o;
    if (!a) {
      const l = JSON.stringify(o), c = Object.keys(vs).map((p) => JSON.stringify(p)).join(", ");
      throw new Error(`Unknown custom tag ${l}; use one of ${c}`);
    }
    return n.includes(a) || n.push(a), n;
  }, []);
}
const ln = (r, t) => r.key < t.key ? -1 : r.key > t.key ? 1 : 0;
class ds {
  constructor({ compat: t, customTags: e, merge: s, resolveKnownTags: i, schema: n, sortMapEntries: o, toStringDefaults: a }) {
    this.compat = Array.isArray(t) ? Ne(t, "compat") : t ? Ne(null, t) : null, this.name = typeof n == "string" && n || "core", this.knownTags = i ? an : {}, this.tags = Ne(e, this.name, s), this.toStringOptions = a ?? null, Object.defineProperty(this, xt, { value: Wt }), Object.defineProperty(this, pt, { value: Se }), Object.defineProperty(this, _t, { value: Kt }), this.sortMapEntries = typeof o == "function" ? o : o === !0 ? ln : null;
  }
  clone() {
    const t = Object.create(ds.prototype, Object.getOwnPropertyDescriptors(this));
    return t.tags = this.tags.slice(), t;
  }
}
function cn(r, t) {
  const e = [];
  let s = t.directives === !0;
  if (t.directives !== !1 && r.directives) {
    const l = r.directives.toString(r);
    l ? (e.push(l), s = !0) : r.directives.docStart && (s = !0);
  }
  s && e.push("---");
  const i = Hs(r, t), { commentString: n } = i.options;
  if (r.commentBefore) {
    e.length !== 1 && e.unshift("");
    const l = n(r.commentBefore);
    e.unshift(ft(l, ""));
  }
  let o = !1, a = null;
  if (r.contents) {
    if (H(r.contents)) {
      if (r.contents.spaceBefore && s && e.push(""), r.contents.commentBefore) {
        const p = n(r.contents.commentBefore);
        e.push(ft(p, ""));
      }
      i.forceBlockIndent = !!r.comment, a = r.contents.comment;
    }
    const l = a ? void 0 : () => o = !0;
    let c = jt(r.contents, i, () => a = null, l);
    a && (c += Lt(c, "", n(a))), (c[0] === "|" || c[0] === ">") && e[e.length - 1] === "---" ? e[e.length - 1] = `--- ${c}` : e.push(c);
  } else
    e.push(jt(r.contents, i));
  if (r.directives?.docEnd)
    if (r.comment) {
      const l = n(r.comment);
      l.includes(`
`) ? (e.push("..."), e.push(ft(l, ""))) : e.push(`... ${l}`);
    } else
      e.push("...");
  else {
    let l = r.comment;
    l && o && (l = l.replace(/^\n+/, "")), l && ((!o || a) && e[e.length - 1] !== "" && e.push(""), e.push(ft(n(l), "")));
  }
  return e.join(`
`) + `
`;
}
class De {
  constructor(t, e, s) {
    this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, rt, { value: _e });
    let i = null;
    typeof e == "function" || Array.isArray(e) ? i = e : s === void 0 && e && (s = e, e = void 0);
    const n = Object.assign({
      intAsBigInt: !1,
      keepSourceTokens: !1,
      logLevel: "warn",
      prettyErrors: !0,
      strict: !0,
      stringKeys: !1,
      uniqueKeys: !0,
      version: "1.2"
    }, s);
    this.options = n;
    let { version: o } = n;
    s?._directives ? (this.directives = s._directives.atDocument(), this.directives.yaml.explicit && (o = this.directives.yaml.version)) : this.directives = new J({ version: o }), this.setSchema(o, s), this.contents = t === void 0 ? null : this.createNode(t, i, s);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const t = Object.create(De.prototype, {
      [rt]: { value: _e }
    });
    return t.commentBefore = this.commentBefore, t.comment = this.comment, t.errors = this.errors.slice(), t.warnings = this.warnings.slice(), t.options = Object.assign({}, this.options), this.directives && (t.directives = this.directives.clone()), t.schema = this.schema.clone(), t.contents = H(this.contents) ? this.contents.clone(t.schema) : this.contents, this.range && (t.range = this.range.slice()), t;
  }
  /** Adds a value to the document. */
  add(t) {
    Ct(this.contents) && this.contents.add(t);
  }
  /** Adds a value to the document. */
  addIn(t, e) {
    Ct(this.contents) && this.contents.addIn(t, e);
  }
  /**
   * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
   *
   * If `node` already has an anchor, `name` is ignored.
   * Otherwise, the `node.anchor` value will be set to `name`,
   * or if an anchor with that name is already present in the document,
   * `name` will be used as a prefix for a new unique anchor.
   * If `name` is undefined, the generated anchor will use 'a' as a prefix.
   */
  createAlias(t, e) {
    if (!t.anchor) {
      const s = Bs(this);
      t.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !e || s.has(e) ? js(e || "a", s) : e;
    }
    return new Ze(t.anchor);
  }
  createNode(t, e, s) {
    let i;
    if (typeof e == "function")
      t = e.call({ "": t }, "", t), i = e;
    else if (Array.isArray(e)) {
      const b = ($) => typeof $ == "number" || $ instanceof String || $ instanceof Number, x = e.filter(b).map(String);
      x.length > 0 && (e = e.concat(x)), i = e;
    } else s === void 0 && e && (s = e, e = void 0);
    const { aliasDuplicateObjects: n, anchorPrefix: o, flow: a, keepUndefined: l, onTagObj: c, tag: p } = s ?? {}, { onAnchor: d, setAnchors: h, sourceObjects: u } = qi(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      o || "a"
    ), g = {
      aliasDuplicateObjects: n ?? !0,
      keepUndefined: l ?? !1,
      onAnchor: d,
      onTagObj: c,
      replacer: i,
      schema: this.schema,
      sourceObjects: u
    }, f = Zt(t, p, g);
    return a && U(f) && (f.flow = !0), h(), f;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(t, e, s = {}) {
    const i = this.createNode(t, null, s), n = this.createNode(e, null, s);
    return new Q(i, n);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(t) {
    return Ct(this.contents) ? this.contents.delete(t) : !1;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(t) {
    return Xt(t) ? this.contents == null ? !1 : (this.contents = null, !0) : Ct(this.contents) ? this.contents.deleteIn(t) : !1;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(t, e) {
    return U(this.contents) ? this.contents.get(t, e) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(t, e) {
    return Xt(t) ? !e && B(this.contents) ? this.contents.value : this.contents : U(this.contents) ? this.contents.getIn(t, e) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(t) {
    return U(this.contents) ? this.contents.has(t) : !1;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(t) {
    return Xt(t) ? this.contents !== void 0 : U(this.contents) ? this.contents.hasIn(t) : !1;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(t, e) {
    this.contents == null ? this.contents = ge(this.schema, [t], e) : Ct(this.contents) && this.contents.set(t, e);
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(t, e) {
    Xt(t) ? this.contents = e : this.contents == null ? this.contents = ge(this.schema, Array.from(t), e) : Ct(this.contents) && this.contents.setIn(t, e);
  }
  /**
   * Change the YAML version and schema used by the document.
   * A `null` version disables support for directives, explicit tags, anchors, and aliases.
   * It also requires the `schema` option to be given as a `Schema` instance value.
   *
   * Overrides all previously set schema options.
   */
  setSchema(t, e = {}) {
    typeof t == "number" && (t = String(t));
    let s;
    switch (t) {
      case "1.1":
        this.directives ? this.directives.yaml.version = "1.1" : this.directives = new J({ version: "1.1" }), s = { resolveKnownTags: !1, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        this.directives ? this.directives.yaml.version = t : this.directives = new J({ version: t }), s = { resolveKnownTags: !0, schema: "core" };
        break;
      case null:
        this.directives && delete this.directives, s = null;
        break;
      default: {
        const i = JSON.stringify(t);
        throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`);
      }
    }
    if (e.schema instanceof Object)
      this.schema = e.schema;
    else if (s)
      this.schema = new ds(Object.assign(s, e));
    else
      throw new Error("With a null YAML version, the { schema: Schema } option is required");
  }
  // json & jsonArg are only used from toJSON()
  toJS({ json: t, jsonArg: e, mapAsMap: s, maxAliasCount: i, onAnchor: n, reviver: o } = {}) {
    const a = {
      anchors: /* @__PURE__ */ new Map(),
      doc: this,
      keep: !t,
      mapAsMap: s === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof i == "number" ? i : 100
    }, l = nt(this.contents, e ?? "", a);
    if (typeof n == "function")
      for (const { count: c, res: p } of a.anchors.values())
        n(p, c);
    return typeof o == "function" ? Pt(o, { "": l }, "", l) : l;
  }
  /**
   * A JSON representation of the document `contents`.
   *
   * @param jsonArg Used by `JSON.stringify` to indicate the array index or
   *   property name.
   */
  toJSON(t, e) {
    return this.toJS({ json: !0, jsonArg: t, mapAsMap: !1, onAnchor: e });
  }
  /** A YAML representation of the document. */
  toString(t = {}) {
    if (this.errors.length > 0)
      throw new Error("Document with errors cannot be stringified");
    if ("indent" in t && (!Number.isInteger(t.indent) || Number(t.indent) <= 0)) {
      const e = JSON.stringify(t.indent);
      throw new Error(`"indent" option must be a positive integer, not ${e}`);
    }
    return cn(this, t);
  }
}
function Ct(r) {
  if (U(r))
    return !0;
  throw new Error("Expected a YAML collection as document contents");
}
class pi extends Error {
  constructor(t, e, s, i) {
    super(), this.name = t, this.code = s, this.message = i, this.pos = e;
  }
}
class Gt extends pi {
  constructor(t, e, s) {
    super("YAMLParseError", t, e, s);
  }
}
class dn extends pi {
  constructor(t, e, s) {
    super("YAMLWarning", t, e, s);
  }
}
const xs = (r, t) => (e) => {
  if (e.pos[0] === -1)
    return;
  e.linePos = e.pos.map((a) => t.linePos(a));
  const { line: s, col: i } = e.linePos[0];
  e.message += ` at line ${s}, column ${i}`;
  let n = i - 1, o = r.substring(t.lineStarts[s - 1], t.lineStarts[s]).replace(/[\n\r]+$/, "");
  if (n >= 60 && o.length > 80) {
    const a = Math.min(n - 39, o.length - 79);
    o = "…" + o.substring(a), n -= a - 1;
  }
  if (o.length > 80 && (o = o.substring(0, 79) + "…"), s > 1 && /^ *$/.test(o.substring(0, n))) {
    let a = r.substring(t.lineStarts[s - 2], t.lineStarts[s - 1]);
    a.length > 80 && (a = a.substring(0, 79) + `…
`), o = a + o;
  }
  if (/[^ ]/.test(o)) {
    let a = 1;
    const l = e.linePos[1];
    l?.line === s && l.col > i && (a = Math.max(1, Math.min(l.col - i, 80 - n)));
    const c = " ".repeat(n) + "^".repeat(a);
    e.message += `:

${o}
${c}
`;
  }
};
function Rt(r, { flow: t, indicator: e, next: s, offset: i, onError: n, parentIndent: o, startOnNewline: a }) {
  let l = !1, c = a, p = a, d = "", h = "", u = !1, g = !1, f = null, b = null, x = null, $ = null, m = null, v = null, w = null;
  for (const y of r)
    switch (g && (y.type !== "space" && y.type !== "newline" && y.type !== "comma" && n(y.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), g = !1), f && (c && y.type !== "comment" && y.type !== "newline" && n(f, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), f = null), y.type) {
      case "space":
        !t && (e !== "doc-start" || s?.type !== "flow-collection") && y.source.includes("	") && (f = y), p = !0;
        break;
      case "comment": {
        p || n(y, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const L = y.source.substring(1) || " ";
        d ? d += h + L : d = L, h = "", c = !1;
        break;
      }
      case "newline":
        c ? d ? d += y.source : (!v || e !== "seq-item-ind") && (l = !0) : h += y.source, c = !0, u = !0, (b || x) && ($ = y), p = !0;
        break;
      case "anchor":
        b && n(y, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), y.source.endsWith(":") && n(y.offset + y.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), b = y, w ?? (w = y.offset), c = !1, p = !1, g = !0;
        break;
      case "tag": {
        x && n(y, "MULTIPLE_TAGS", "A node can have at most one tag"), x = y, w ?? (w = y.offset), c = !1, p = !1, g = !0;
        break;
      }
      case e:
        (b || x) && n(y, "BAD_PROP_ORDER", `Anchors and tags must be after the ${y.source} indicator`), v && n(y, "UNEXPECTED_TOKEN", `Unexpected ${y.source} in ${t ?? "collection"}`), v = y, c = e === "seq-item-ind" || e === "explicit-key-ind", p = !1;
        break;
      case "comma":
        if (t) {
          m && n(y, "UNEXPECTED_TOKEN", `Unexpected , in ${t}`), m = y, c = !1, p = !1;
          break;
        }
      default:
        n(y, "UNEXPECTED_TOKEN", `Unexpected ${y.type} token`), c = !1, p = !1;
    }
  const k = r[r.length - 1], E = k ? k.offset + k.source.length : i;
  return g && s && s.type !== "space" && s.type !== "newline" && s.type !== "comma" && (s.type !== "scalar" || s.source !== "") && n(s.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), f && (c && f.indent <= o || s?.type === "block-map" || s?.type === "block-seq") && n(f, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), {
    comma: m,
    found: v,
    spaceBefore: l,
    comment: d,
    hasNewline: u,
    anchor: b,
    tag: x,
    newlineAfterProp: $,
    end: E,
    start: w ?? E
  };
}
function te(r) {
  if (!r)
    return null;
  switch (r.type) {
    case "alias":
    case "scalar":
    case "double-quoted-scalar":
    case "single-quoted-scalar":
      if (r.source.includes(`
`))
        return !0;
      if (r.end) {
        for (const t of r.end)
          if (t.type === "newline")
            return !0;
      }
      return !1;
    case "flow-collection":
      for (const t of r.items) {
        for (const e of t.start)
          if (e.type === "newline")
            return !0;
        if (t.sep) {
          for (const e of t.sep)
            if (e.type === "newline")
              return !0;
        }
        if (te(t.key) || te(t.value))
          return !0;
      }
      return !1;
    default:
      return !0;
  }
}
function Ke(r, t, e) {
  if (t?.type === "flow-collection") {
    const s = t.end[0];
    s.indent === r && (s.source === "]" || s.source === "}") && te(t) && e(s, "BAD_INDENT", "Flow end indicator should be more indented than parent", !0);
  }
}
function hi(r, t, e) {
  const { uniqueKeys: s } = r.options;
  if (s === !1)
    return !1;
  const i = typeof s == "function" ? s : (n, o) => n === o || B(n) && B(o) && n.value === o.value;
  return t.some((n) => i(n.key, e));
}
const ws = "All mapping items must start at the same column";
function pn({ composeNode: r, composeEmptyNode: t }, e, s, i, n) {
  const o = n?.nodeClass ?? it, a = new o(e.schema);
  e.atRoot && (e.atRoot = !1);
  let l = s.offset, c = null;
  for (const p of s.items) {
    const { start: d, key: h, sep: u, value: g } = p, f = Rt(d, {
      indicator: "explicit-key-ind",
      next: h ?? u?.[0],
      offset: l,
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !0
    }), b = !f.found;
    if (b) {
      if (h && (h.type === "block-seq" ? i(l, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in h && h.indent !== s.indent && i(l, "BAD_INDENT", ws)), !f.anchor && !f.tag && !u) {
        c = f.end, f.comment && (a.comment ? a.comment += `
` + f.comment : a.comment = f.comment);
        continue;
      }
      (f.newlineAfterProp || te(h)) && i(h ?? d[d.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
    } else f.found?.indent !== s.indent && i(l, "BAD_INDENT", ws);
    e.atKey = !0;
    const x = f.end, $ = h ? r(e, h, f, i) : t(e, x, d, null, f, i);
    e.schema.compat && Ke(s.indent, h, i), e.atKey = !1, hi(e, a.items, $) && i(x, "DUPLICATE_KEY", "Map keys must be unique");
    const m = Rt(u ?? [], {
      indicator: "map-value-ind",
      next: g,
      offset: $.range[2],
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !h || h.type === "block-scalar"
    });
    if (l = m.end, m.found) {
      b && (g?.type === "block-map" && !m.hasNewline && i(l, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), e.options.strict && f.start < m.found.offset - 1024 && i($.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
      const v = g ? r(e, g, m, i) : t(e, l, u, null, m, i);
      e.schema.compat && Ke(s.indent, g, i), l = v.range[2];
      const w = new Q($, v);
      e.options.keepSourceTokens && (w.srcToken = p), a.items.push(w);
    } else {
      b && i($.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), m.comment && ($.comment ? $.comment += `
` + m.comment : $.comment = m.comment);
      const v = new Q($);
      e.options.keepSourceTokens && (v.srcToken = p), a.items.push(v);
    }
  }
  return c && c < l && i(c, "IMPOSSIBLE", "Map comment with trailing content"), a.range = [s.offset, l, c ?? l], a;
}
function hn({ composeNode: r, composeEmptyNode: t }, e, s, i, n) {
  const o = n?.nodeClass ?? Dt, a = new o(e.schema);
  e.atRoot && (e.atRoot = !1), e.atKey && (e.atKey = !1);
  let l = s.offset, c = null;
  for (const { start: p, value: d } of s.items) {
    const h = Rt(p, {
      indicator: "seq-item-ind",
      next: d,
      offset: l,
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !0
    });
    if (!h.found)
      if (h.anchor || h.tag || d)
        d?.type === "block-seq" ? i(h.end, "BAD_INDENT", "All sequence items must start at the same column") : i(l, "MISSING_CHAR", "Sequence item without - indicator");
      else {
        c = h.end, h.comment && (a.comment = h.comment);
        continue;
      }
    const u = d ? r(e, d, h, i) : t(e, h.end, p, null, h, i);
    e.schema.compat && Ke(s.indent, d, i), l = u.range[2], a.items.push(u);
  }
  return a.range = [s.offset, l, c ?? l], a;
}
function ne(r, t, e, s) {
  let i = "";
  if (r) {
    let n = !1, o = "";
    for (const a of r) {
      const { source: l, type: c } = a;
      switch (c) {
        case "space":
          n = !0;
          break;
        case "comment": {
          e && !n && s(a, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const p = l.substring(1) || " ";
          i ? i += o + p : i = p, o = "";
          break;
        }
        case "newline":
          i && (o += l), n = !0;
          break;
        default:
          s(a, "UNEXPECTED_TOKEN", `Unexpected ${c} at node end`);
      }
      t += l.length;
    }
  }
  return { comment: i, offset: t };
}
const Ie = "Block collections are not allowed within flow collections", Oe = (r) => r && (r.type === "block-map" || r.type === "block-seq");
function un({ composeNode: r, composeEmptyNode: t }, e, s, i, n) {
  const o = s.start.source === "{", a = o ? "flow map" : "flow sequence", l = n?.nodeClass ?? (o ? it : Dt), c = new l(e.schema);
  c.flow = !0;
  const p = e.atRoot;
  p && (e.atRoot = !1), e.atKey && (e.atKey = !1);
  let d = s.offset + s.start.source.length;
  for (let b = 0; b < s.items.length; ++b) {
    const x = s.items[b], { start: $, key: m, sep: v, value: w } = x, k = Rt($, {
      flow: a,
      indicator: "explicit-key-ind",
      next: m ?? v?.[0],
      offset: d,
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !1
    });
    if (!k.found) {
      if (!k.anchor && !k.tag && !v && !w) {
        b === 0 && k.comma ? i(k.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`) : b < s.items.length - 1 && i(k.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${a}`), k.comment && (c.comment ? c.comment += `
` + k.comment : c.comment = k.comment), d = k.end;
        continue;
      }
      !o && e.options.strict && te(m) && i(
        m,
        // checked by containsNewline()
        "MULTILINE_IMPLICIT_KEY",
        "Implicit keys of flow sequence pairs need to be on a single line"
      );
    }
    if (b === 0)
      k.comma && i(k.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${a}`);
    else if (k.comma || i(k.start, "MISSING_CHAR", `Missing , between ${a} items`), k.comment) {
      let E = "";
      t: for (const y of $)
        switch (y.type) {
          case "comma":
          case "space":
            break;
          case "comment":
            E = y.source.substring(1);
            break t;
          default:
            break t;
        }
      if (E) {
        let y = c.items[c.items.length - 1];
        W(y) && (y = y.value ?? y.key), y.comment ? y.comment += `
` + E : y.comment = E, k.comment = k.comment.substring(E.length + 1);
      }
    }
    if (!o && !v && !k.found) {
      const E = w ? r(e, w, k, i) : t(e, k.end, v, null, k, i);
      c.items.push(E), d = E.range[2], Oe(w) && i(E.range, "BLOCK_IN_FLOW", Ie);
    } else {
      e.atKey = !0;
      const E = k.end, y = m ? r(e, m, k, i) : t(e, E, $, null, k, i);
      Oe(m) && i(y.range, "BLOCK_IN_FLOW", Ie), e.atKey = !1;
      const L = Rt(v ?? [], {
        flow: a,
        indicator: "map-value-ind",
        next: w,
        offset: y.range[2],
        onError: i,
        parentIndent: s.indent,
        startOnNewline: !1
      });
      if (L.found) {
        if (!o && !k.found && e.options.strict) {
          if (v)
            for (const N of v) {
              if (N === L.found)
                break;
              if (N.type === "newline") {
                i(N, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          k.start < L.found.offset - 1024 && i(L.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else w && ("source" in w && w.source?.[0] === ":" ? i(w, "MISSING_CHAR", `Missing space after : in ${a}`) : i(L.start, "MISSING_CHAR", `Missing , or : between ${a} items`));
      const A = w ? r(e, w, L, i) : L.found ? t(e, L.end, v, null, L, i) : null;
      A ? Oe(w) && i(A.range, "BLOCK_IN_FLOW", Ie) : L.comment && (y.comment ? y.comment += `
` + L.comment : y.comment = L.comment);
      const O = new Q(y, A);
      if (e.options.keepSourceTokens && (O.srcToken = x), o) {
        const N = c;
        hi(e, N.items, y) && i(E, "DUPLICATE_KEY", "Map keys must be unique"), N.items.push(O);
      } else {
        const N = new it(e.schema);
        N.flow = !0, N.items.push(O);
        const X = (A ?? y).range;
        N.range = [y.range[0], X[1], X[2]], c.items.push(N);
      }
      d = A ? A.range[2] : L.end;
    }
  }
  const h = o ? "}" : "]", [u, ...g] = s.end;
  let f = d;
  if (u?.source === h)
    f = u.offset + u.source.length;
  else {
    const b = a[0].toUpperCase() + a.substring(1), x = p ? `${b} must end with a ${h}` : `${b} in block collection must be sufficiently indented and end with a ${h}`;
    i(d, p ? "MISSING_CHAR" : "BAD_INDENT", x), u && u.source.length !== 1 && g.unshift(u);
  }
  if (g.length > 0) {
    const b = ne(g, f, e.options.strict, i);
    b.comment && (c.comment ? c.comment += `
` + b.comment : c.comment = b.comment), c.range = [s.offset, f, b.offset];
  } else
    c.range = [s.offset, f, f];
  return c;
}
function Pe(r, t, e, s, i, n) {
  const o = e.type === "block-map" ? pn(r, t, e, s, n) : e.type === "block-seq" ? hn(r, t, e, s, n) : un(r, t, e, s, n), a = o.constructor;
  return i === "!" || i === a.tagName ? (o.tag = a.tagName, o) : (i && (o.tag = i), o);
}
function fn(r, t, e, s, i) {
  const n = s.tag, o = n ? t.directives.tagName(n.source, (h) => i(n, "TAG_RESOLVE_FAILED", h)) : null;
  if (e.type === "block-seq") {
    const { anchor: h, newlineAfterProp: u } = s, g = h && n ? h.offset > n.offset ? h : n : h ?? n;
    g && (!u || u.offset < g.offset) && i(g, "MISSING_CHAR", "Missing newline after block sequence props");
  }
  const a = e.type === "block-map" ? "map" : e.type === "block-seq" ? "seq" : e.start.source === "{" ? "map" : "seq";
  if (!n || !o || o === "!" || o === it.tagName && a === "map" || o === Dt.tagName && a === "seq")
    return Pe(r, t, e, i, o);
  let l = t.schema.tags.find((h) => h.tag === o && h.collection === a);
  if (!l) {
    const h = t.schema.knownTags[o];
    if (h?.collection === a)
      t.schema.tags.push(Object.assign({}, h, { default: !1 })), l = h;
    else
      return h ? i(n, "BAD_COLLECTION_TYPE", `${h.tag} used for ${a} collection, but expects ${h.collection ?? "scalar"}`, !0) : i(n, "TAG_RESOLVE_FAILED", `Unresolved tag: ${o}`, !0), Pe(r, t, e, i, o);
  }
  const c = Pe(r, t, e, i, o, l), p = l.resolve?.(c, (h) => i(n, "TAG_RESOLVE_FAILED", h), t.options) ?? c, d = H(p) ? p : new C(p);
  return d.range = c.range, d.tag = o, l?.format && (d.format = l.format), d;
}
function gn(r, t, e) {
  const s = t.offset, i = mn(t, r.options.strict, e);
  if (!i)
    return { value: "", type: null, comment: "", range: [s, s, s] };
  const n = i.mode === ">" ? C.BLOCK_FOLDED : C.BLOCK_LITERAL, o = t.source ? bn(t.source) : [];
  let a = o.length;
  for (let f = o.length - 1; f >= 0; --f) {
    const b = o[f][1];
    if (b === "" || b === "\r")
      a = f;
    else
      break;
  }
  if (a === 0) {
    const f = i.chomp === "+" && o.length > 0 ? `
`.repeat(Math.max(1, o.length - 1)) : "";
    let b = s + i.length;
    return t.source && (b += t.source.length), { value: f, type: n, comment: i.comment, range: [s, b, b] };
  }
  let l = t.indent + i.indent, c = t.offset + i.length, p = 0;
  for (let f = 0; f < a; ++f) {
    const [b, x] = o[f];
    if (x === "" || x === "\r")
      i.indent === 0 && b.length > l && (l = b.length);
    else {
      b.length < l && e(c + b.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), i.indent === 0 && (l = b.length), p = f, l === 0 && !r.atRoot && e(c, "BAD_INDENT", "Block scalar values in collections must be indented");
      break;
    }
    c += b.length + x.length + 1;
  }
  for (let f = o.length - 1; f >= a; --f)
    o[f][0].length > l && (a = f + 1);
  let d = "", h = "", u = !1;
  for (let f = 0; f < p; ++f)
    d += o[f][0].slice(l) + `
`;
  for (let f = p; f < a; ++f) {
    let [b, x] = o[f];
    c += b.length + x.length + 1;
    const $ = x[x.length - 1] === "\r";
    if ($ && (x = x.slice(0, -1)), x && b.length < l) {
      const v = `Block scalar lines must not be less indented than their ${i.indent ? "explicit indentation indicator" : "first line"}`;
      e(c - x.length - ($ ? 2 : 1), "BAD_INDENT", v), b = "";
    }
    n === C.BLOCK_LITERAL ? (d += h + b.slice(l) + x, h = `
`) : b.length > l || x[0] === "	" ? (h === " " ? h = `
` : !u && h === `
` && (h = `

`), d += h + b.slice(l) + x, h = `
`, u = !0) : x === "" ? h === `
` ? d += `
` : h = `
` : (d += h + x, h = " ", u = !1);
  }
  switch (i.chomp) {
    case "-":
      break;
    case "+":
      for (let f = a; f < o.length; ++f)
        d += `
` + o[f][0].slice(l);
      d[d.length - 1] !== `
` && (d += `
`);
      break;
    default:
      d += `
`;
  }
  const g = s + i.length + t.source.length;
  return { value: d, type: n, comment: i.comment, range: [s, g, g] };
}
function mn({ offset: r, props: t }, e, s) {
  if (t[0].type !== "block-scalar-header")
    return s(t[0], "IMPOSSIBLE", "Block scalar header not found"), null;
  const { source: i } = t[0], n = i[0];
  let o = 0, a = "", l = -1;
  for (let h = 1; h < i.length; ++h) {
    const u = i[h];
    if (!a && (u === "-" || u === "+"))
      a = u;
    else {
      const g = Number(u);
      !o && g ? o = g : l === -1 && (l = r + h);
    }
  }
  l !== -1 && s(l, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${i}`);
  let c = !1, p = "", d = i.length;
  for (let h = 1; h < t.length; ++h) {
    const u = t[h];
    switch (u.type) {
      case "space":
        c = !0;
      case "newline":
        d += u.source.length;
        break;
      case "comment":
        e && !c && s(u, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), d += u.source.length, p = u.source.substring(1);
        break;
      case "error":
        s(u, "UNEXPECTED_TOKEN", u.message), d += u.source.length;
        break;
      default: {
        const g = `Unexpected token in block scalar header: ${u.type}`;
        s(u, "UNEXPECTED_TOKEN", g);
        const f = u.source;
        f && typeof f == "string" && (d += f.length);
      }
    }
  }
  return { mode: n, indent: o, chomp: a, comment: p, length: d };
}
function bn(r) {
  const t = r.split(/\n( *)/), e = t[0], s = e.match(/^( *)/), n = [s?.[1] ? [s[1], e.slice(s[1].length)] : ["", e]];
  for (let o = 1; o < t.length; o += 2)
    n.push([t[o], t[o + 1]]);
  return n;
}
function yn(r, t, e) {
  const { offset: s, type: i, source: n, end: o } = r;
  let a, l;
  const c = (h, u, g) => e(s + h, u, g);
  switch (i) {
    case "scalar":
      a = C.PLAIN, l = vn(n, c);
      break;
    case "single-quoted-scalar":
      a = C.QUOTE_SINGLE, l = xn(n, c);
      break;
    case "double-quoted-scalar":
      a = C.QUOTE_DOUBLE, l = wn(n, c);
      break;
    default:
      return e(r, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${i}`), {
        value: "",
        type: null,
        comment: "",
        range: [s, s + n.length, s + n.length]
      };
  }
  const p = s + n.length, d = ne(o, p, t, e);
  return {
    value: l,
    type: a,
    comment: d.comment,
    range: [s, p, d.offset]
  };
}
function vn(r, t) {
  let e = "";
  switch (r[0]) {
    case "	":
      e = "a tab character";
      break;
    case ",":
      e = "flow indicator character ,";
      break;
    case "%":
      e = "directive indicator character %";
      break;
    case "|":
    case ">": {
      e = `block scalar indicator ${r[0]}`;
      break;
    }
    case "@":
    case "`": {
      e = `reserved character ${r[0]}`;
      break;
    }
  }
  return e && t(0, "BAD_SCALAR_START", `Plain value cannot start with ${e}`), ui(r);
}
function xn(r, t) {
  return (r[r.length - 1] !== "'" || r.length === 1) && t(r.length, "MISSING_CHAR", "Missing closing 'quote"), ui(r.slice(1, -1)).replace(/''/g, "'");
}
function ui(r) {
  let t, e;
  try {
    t = new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`, "sy"), e = new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`, "sy");
  } catch {
    t = /(.*?)[ \t]*\r?\n/sy, e = /[ \t]*(.*?)[ \t]*\r?\n/sy;
  }
  let s = t.exec(r);
  if (!s)
    return r;
  let i = s[1], n = " ", o = t.lastIndex;
  for (e.lastIndex = o; s = e.exec(r); )
    s[1] === "" ? n === `
` ? i += n : n = `
` : (i += n + s[1], n = " "), o = e.lastIndex;
  const a = /[ \t]*(.*)/sy;
  return a.lastIndex = o, s = a.exec(r), i + n + (s?.[1] ?? "");
}
function wn(r, t) {
  let e = "";
  for (let s = 1; s < r.length - 1; ++s) {
    const i = r[s];
    if (!(i === "\r" && r[s + 1] === `
`))
      if (i === `
`) {
        const { fold: n, offset: o } = kn(r, s);
        e += n, s = o;
      } else if (i === "\\") {
        let n = r[++s];
        const o = $n[n];
        if (o)
          e += o;
        else if (n === `
`)
          for (n = r[s + 1]; n === " " || n === "	"; )
            n = r[++s + 1];
        else if (n === "\r" && r[s + 1] === `
`)
          for (n = r[++s + 1]; n === " " || n === "	"; )
            n = r[++s + 1];
        else if (n === "x" || n === "u" || n === "U") {
          const a = n === "x" ? 2 : n === "u" ? 4 : 8;
          e += Sn(r, s + 1, a, t), s += a;
        } else {
          const a = r.substr(s - 1, 2);
          t(s - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${a}`), e += a;
        }
      } else if (i === " " || i === "	") {
        const n = s;
        let o = r[s + 1];
        for (; o === " " || o === "	"; )
          o = r[++s + 1];
        o !== `
` && !(o === "\r" && r[s + 2] === `
`) && (e += s > n ? r.slice(n, s + 1) : i);
      } else
        e += i;
  }
  return (r[r.length - 1] !== '"' || r.length === 1) && t(r.length, "MISSING_CHAR", 'Missing closing "quote'), e;
}
function kn(r, t) {
  let e = "", s = r[t + 1];
  for (; (s === " " || s === "	" || s === `
` || s === "\r") && !(s === "\r" && r[t + 2] !== `
`); )
    s === `
` && (e += `
`), t += 1, s = r[t + 1];
  return e || (e = " "), { fold: e, offset: t };
}
const $n = {
  0: "\0",
  // null character
  a: "\x07",
  // bell character
  b: "\b",
  // backspace
  e: "\x1B",
  // escape character
  f: "\f",
  // form feed
  n: `
`,
  // line feed
  r: "\r",
  // carriage return
  t: "	",
  // horizontal tab
  v: "\v",
  // vertical tab
  N: "",
  // Unicode next line
  _: " ",
  // Unicode non-breaking space
  L: "\u2028",
  // Unicode line separator
  P: "\u2029",
  // Unicode paragraph separator
  " ": " ",
  '"': '"',
  "/": "/",
  "\\": "\\",
  "	": "	"
};
function Sn(r, t, e, s) {
  const i = r.substr(t, e), o = i.length === e && /^[0-9a-fA-F]+$/.test(i) ? parseInt(i, 16) : NaN;
  try {
    return String.fromCodePoint(o);
  } catch {
    const a = r.substr(t - 2, e + 2);
    return s(t - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${a}`), a;
  }
}
function fi(r, t, e, s) {
  const { value: i, type: n, comment: o, range: a } = t.type === "block-scalar" ? gn(r, t, s) : yn(t, r.options.strict, s), l = e ? r.directives.tagName(e.source, (d) => s(e, "TAG_RESOLVE_FAILED", d)) : null;
  let c;
  r.options.stringKeys && r.atKey ? c = r.schema[pt] : l ? c = En(r.schema, i, l, e, s) : t.type === "scalar" ? c = Ln(r, i, t, s) : c = r.schema[pt];
  let p;
  try {
    const d = c.resolve(i, (h) => s(e ?? t, "TAG_RESOLVE_FAILED", h), r.options);
    p = B(d) ? d : new C(d);
  } catch (d) {
    const h = d instanceof Error ? d.message : String(d);
    s(e ?? t, "TAG_RESOLVE_FAILED", h), p = new C(i);
  }
  return p.range = a, p.source = i, n && (p.type = n), l && (p.tag = l), c.format && (p.format = c.format), o && (p.comment = o), p;
}
function En(r, t, e, s, i) {
  if (e === "!")
    return r[pt];
  const n = [];
  for (const a of r.tags)
    if (!a.collection && a.tag === e)
      if (a.default && a.test)
        n.push(a);
      else
        return a;
  for (const a of n)
    if (a.test?.test(t))
      return a;
  const o = r.knownTags[e];
  return o && !o.collection ? (r.tags.push(Object.assign({}, o, { default: !1, test: void 0 })), o) : (i(s, "TAG_RESOLVE_FAILED", `Unresolved tag: ${e}`, e !== "tag:yaml.org,2002:str"), r[pt]);
}
function Ln({ atKey: r, directives: t, schema: e }, s, i, n) {
  const o = e.tags.find((a) => (a.default === !0 || r && a.default === "key") && a.test?.test(s)) || e[pt];
  if (e.compat) {
    const a = e.compat.find((l) => l.default && l.test?.test(s)) ?? e[pt];
    if (o.tag !== a.tag) {
      const l = t.tagString(o.tag), c = t.tagString(a.tag), p = `Value may be parsed as either ${l} or ${c}`;
      n(i, "TAG_RESOLVE_FAILED", p, !0);
    }
  }
  return o;
}
function Tn(r, t, e) {
  if (t) {
    e ?? (e = t.length);
    for (let s = e - 1; s >= 0; --s) {
      let i = t[s];
      switch (i.type) {
        case "space":
        case "comment":
        case "newline":
          r -= i.source.length;
          continue;
      }
      for (i = t[++s]; i?.type === "space"; )
        r += i.source.length, i = t[++s];
      break;
    }
  }
  return r;
}
const Mn = { composeNode: gi, composeEmptyNode: ps };
function gi(r, t, e, s) {
  const i = r.atKey, { spaceBefore: n, comment: o, anchor: a, tag: l } = e;
  let c, p = !0;
  switch (t.type) {
    case "alias":
      c = Dn(r, t, s), (a || l) && s(t, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      c = fi(r, t, l, s), a && (c.anchor = a.source.substring(1));
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      try {
        c = fn(Mn, r, t, e, s), a && (c.anchor = a.source.substring(1));
      } catch (d) {
        const h = d instanceof Error ? d.message : String(d);
        s(t, "RESOURCE_EXHAUSTION", h);
      }
      break;
    default: {
      const d = t.type === "error" ? t.message : `Unsupported token (type: ${t.type})`;
      s(t, "UNEXPECTED_TOKEN", d), p = !1;
    }
  }
  return c ?? (c = ps(r, t.offset, void 0, null, e, s)), a && c.anchor === "" && s(a, "BAD_ALIAS", "Anchor cannot be an empty string"), i && r.options.stringKeys && (!B(c) || typeof c.value != "string" || c.tag && c.tag !== "tag:yaml.org,2002:str") && s(l ?? t, "NON_STRING_KEY", "With stringKeys, all keys must be strings"), n && (c.spaceBefore = !0), o && (t.type === "scalar" && t.source === "" ? c.comment = o : c.commentBefore = o), r.options.keepSourceTokens && p && (c.srcToken = t), c;
}
function ps(r, t, e, s, { spaceBefore: i, comment: n, anchor: o, tag: a, end: l }, c) {
  const p = {
    type: "scalar",
    offset: Tn(t, e, s),
    indent: -1,
    source: ""
  }, d = fi(r, p, a, c);
  return o && (d.anchor = o.source.substring(1), d.anchor === "" && c(o, "BAD_ALIAS", "Anchor cannot be an empty string")), i && (d.spaceBefore = !0), n && (d.comment = n, d.range[2] = l), d;
}
function Dn({ options: r }, { offset: t, source: e, end: s }, i) {
  const n = new Ze(e.substring(1));
  n.source === "" && i(t, "BAD_ALIAS", "Alias cannot be an empty string"), n.source.endsWith(":") && i(t + e.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
  const o = t + e.length, a = ne(s, o, r.strict, i);
  return n.range = [t, o, a.offset], a.comment && (n.comment = a.comment), n;
}
function An(r, t, { offset: e, start: s, value: i, end: n }, o) {
  const a = Object.assign({ _directives: t }, r), l = new De(void 0, a), c = {
    atKey: !1,
    atRoot: !0,
    directives: l.directives,
    options: l.options,
    schema: l.schema
  }, p = Rt(s, {
    indicator: "doc-start",
    next: i ?? n?.[0],
    offset: e,
    onError: o,
    parentIndent: 0,
    startOnNewline: !0
  });
  p.found && (l.directives.docStart = !0, i && (i.type === "block-map" || i.type === "block-seq") && !p.hasNewline && o(p.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), l.contents = i ? gi(c, i, p, o) : ps(c, p.end, s, null, p, o);
  const d = l.contents.range[2], h = ne(n, d, !1, o);
  return h.comment && (l.comment = h.comment), l.range = [e, d, h.offset], l;
}
function Yt(r) {
  if (typeof r == "number")
    return [r, r + 1];
  if (Array.isArray(r))
    return r.length === 2 ? r : [r[0], r[1]];
  const { offset: t, source: e } = r;
  return [t, t + (typeof e == "string" ? e.length : 1)];
}
function ks(r) {
  let t = "", e = !1, s = !1;
  for (let i = 0; i < r.length; ++i) {
    const n = r[i];
    switch (n[0]) {
      case "#":
        t += (t === "" ? "" : s ? `

` : `
`) + (n.substring(1) || " "), e = !0, s = !1;
        break;
      case "%":
        r[i + 1]?.[0] !== "#" && (i += 1), e = !1;
        break;
      default:
        e || (s = !0), e = !1;
    }
  }
  return { comment: t, afterEmptyLine: s };
}
class Cn {
  constructor(t = {}) {
    this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (e, s, i, n) => {
      const o = Yt(e);
      n ? this.warnings.push(new dn(o, s, i)) : this.errors.push(new Gt(o, s, i));
    }, this.directives = new J({ version: t.version || "1.2" }), this.options = t;
  }
  decorate(t, e) {
    const { comment: s, afterEmptyLine: i } = ks(this.prelude);
    if (s) {
      const n = t.contents;
      if (e)
        t.comment = t.comment ? `${t.comment}
${s}` : s;
      else if (i || t.directives.docStart || !n)
        t.commentBefore = s;
      else if (U(n) && !n.flow && n.items.length > 0) {
        let o = n.items[0];
        W(o) && (o = o.key);
        const a = o.commentBefore;
        o.commentBefore = a ? `${s}
${a}` : s;
      } else {
        const o = n.commentBefore;
        n.commentBefore = o ? `${s}
${o}` : s;
      }
    }
    if (e) {
      for (let n = 0; n < this.errors.length; ++n)
        t.errors.push(this.errors[n]);
      for (let n = 0; n < this.warnings.length; ++n)
        t.warnings.push(this.warnings[n]);
    } else
      t.errors = this.errors, t.warnings = this.warnings;
    this.prelude = [], this.errors = [], this.warnings = [];
  }
  /**
   * Current stream status information.
   *
   * Mostly useful at the end of input for an empty stream.
   */
  streamInfo() {
    return {
      comment: ks(this.prelude).comment,
      directives: this.directives,
      errors: this.errors,
      warnings: this.warnings
    };
  }
  /**
   * Compose tokens into documents.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *compose(t, e = !1, s = -1) {
    for (const i of t)
      yield* this.next(i);
    yield* this.end(e, s);
  }
  /** Advance the composer by one CST token. */
  *next(t) {
    switch (t.type) {
      case "directive":
        this.directives.add(t.source, (e, s, i) => {
          const n = Yt(t);
          n[0] += e, this.onError(n, "BAD_DIRECTIVE", s, i);
        }), this.prelude.push(t.source), this.atDirectives = !0;
        break;
      case "document": {
        const e = An(this.options, this.directives, t, this.onError);
        this.atDirectives && !e.directives.docStart && this.onError(t, "MISSING_CHAR", "Missing directives-end/doc-start indicator line"), this.decorate(e, !1), this.doc && (yield this.doc), this.doc = e, this.atDirectives = !1;
        break;
      }
      case "byte-order-mark":
      case "space":
        break;
      case "comment":
      case "newline":
        this.prelude.push(t.source);
        break;
      case "error": {
        const e = t.source ? `${t.message}: ${JSON.stringify(t.source)}` : t.message, s = new Gt(Yt(t), "UNEXPECTED_TOKEN", e);
        this.atDirectives || !this.doc ? this.errors.push(s) : this.doc.errors.push(s);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const s = "Unexpected doc-end without preceding document";
          this.errors.push(new Gt(Yt(t), "UNEXPECTED_TOKEN", s));
          break;
        }
        this.doc.directives.docEnd = !0;
        const e = ne(t.end, t.offset + t.source.length, this.doc.options.strict, this.onError);
        if (this.decorate(this.doc, !0), e.comment) {
          const s = this.doc.comment;
          this.doc.comment = s ? `${s}
${e.comment}` : e.comment;
        }
        this.doc.range[2] = e.offset;
        break;
      }
      default:
        this.errors.push(new Gt(Yt(t), "UNEXPECTED_TOKEN", `Unsupported token ${t.type}`));
    }
  }
  /**
   * Call at end of input to yield any remaining document.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *end(t = !1, e = -1) {
    if (this.doc)
      this.decorate(this.doc, !0), yield this.doc, this.doc = null;
    else if (t) {
      const s = Object.assign({ _directives: this.directives }, this.options), i = new De(void 0, s);
      this.atDirectives && this.onError(e, "MISSING_CHAR", "Missing directives-end indicator line"), i.range = [0, e, e], this.decorate(i, !1), yield i;
    }
  }
}
const mi = "\uFEFF", bi = "", yi = "", Ye = "";
function Nn(r) {
  switch (r) {
    case mi:
      return "byte-order-mark";
    case bi:
      return "doc-mode";
    case yi:
      return "flow-error-end";
    case Ye:
      return "scalar";
    case "---":
      return "doc-start";
    case "...":
      return "doc-end";
    case "":
    case `
`:
    case `\r
`:
      return "newline";
    case "-":
      return "seq-item-ind";
    case "?":
      return "explicit-key-ind";
    case ":":
      return "map-value-ind";
    case "{":
      return "flow-map-start";
    case "}":
      return "flow-map-end";
    case "[":
      return "flow-seq-start";
    case "]":
      return "flow-seq-end";
    case ",":
      return "comma";
  }
  switch (r[0]) {
    case " ":
    case "	":
      return "space";
    case "#":
      return "comment";
    case "%":
      return "directive-line";
    case "*":
      return "alias";
    case "&":
      return "anchor";
    case "!":
      return "tag";
    case "'":
      return "single-quoted-scalar";
    case '"':
      return "double-quoted-scalar";
    case "|":
    case ">":
      return "block-scalar-header";
  }
  return null;
}
function at(r) {
  switch (r) {
    case void 0:
    case " ":
    case `
`:
    case "\r":
    case "	":
      return !0;
    default:
      return !1;
  }
}
const $s = new Set("0123456789ABCDEFabcdef"), In = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"), le = new Set(",[]{}"), On = new Set(` ,[]{}
\r	`), qe = (r) => !r || On.has(r);
class Pn {
  constructor() {
    this.atEnd = !1, this.blockScalarIndent = -1, this.blockScalarKeep = !1, this.buffer = "", this.flowKey = !1, this.flowLevel = 0, this.indentNext = 0, this.indentValue = 0, this.lineEndPos = null, this.next = null, this.pos = 0;
  }
  /**
   * Generate YAML tokens from the `source` string. If `incomplete`,
   * a part of the last line may be left as a buffer for the next call.
   *
   * @returns A generator of lexical tokens
   */
  *lex(t, e = !1) {
    if (t) {
      if (typeof t != "string")
        throw TypeError("source is not a string");
      this.buffer = this.buffer ? this.buffer + t : t, this.lineEndPos = null;
    }
    this.atEnd = !e;
    let s = this.next ?? "stream";
    for (; s && (e || this.hasChars(1)); )
      s = yield* this.parseNext(s);
  }
  atLineEnd() {
    let t = this.pos, e = this.buffer[t];
    for (; e === " " || e === "	"; )
      e = this.buffer[++t];
    return !e || e === "#" || e === `
` ? !0 : e === "\r" ? this.buffer[t + 1] === `
` : !1;
  }
  charAt(t) {
    return this.buffer[this.pos + t];
  }
  continueScalar(t) {
    let e = this.buffer[t];
    if (this.indentNext > 0) {
      let s = 0;
      for (; e === " "; )
        e = this.buffer[++s + t];
      if (e === "\r") {
        const i = this.buffer[s + t + 1];
        if (i === `
` || !i && !this.atEnd)
          return t + s + 1;
      }
      return e === `
` || s >= this.indentNext || !e && !this.atEnd ? t + s : -1;
    }
    if (e === "-" || e === ".") {
      const s = this.buffer.substr(t, 3);
      if ((s === "---" || s === "...") && at(this.buffer[t + 3]))
        return -1;
    }
    return t;
  }
  getLine() {
    let t = this.lineEndPos;
    return (typeof t != "number" || t !== -1 && t < this.pos) && (t = this.buffer.indexOf(`
`, this.pos), this.lineEndPos = t), t === -1 ? this.atEnd ? this.buffer.substring(this.pos) : null : (this.buffer[t - 1] === "\r" && (t -= 1), this.buffer.substring(this.pos, t));
  }
  hasChars(t) {
    return this.pos + t <= this.buffer.length;
  }
  setNext(t) {
    return this.buffer = this.buffer.substring(this.pos), this.pos = 0, this.lineEndPos = null, this.next = t, null;
  }
  peek(t) {
    return this.buffer.substr(this.pos, t);
  }
  *parseNext(t) {
    switch (t) {
      case "stream":
        return yield* this.parseStream();
      case "line-start":
        return yield* this.parseLineStart();
      case "block-start":
        return yield* this.parseBlockStart();
      case "doc":
        return yield* this.parseDocument();
      case "flow":
        return yield* this.parseFlowCollection();
      case "quoted-scalar":
        return yield* this.parseQuotedScalar();
      case "block-scalar":
        return yield* this.parseBlockScalar();
      case "plain-scalar":
        return yield* this.parsePlainScalar();
    }
  }
  *parseStream() {
    let t = this.getLine();
    if (t === null)
      return this.setNext("stream");
    if (t[0] === mi && (yield* this.pushCount(1), t = t.substring(1)), t[0] === "%") {
      let e = t.length, s = t.indexOf("#");
      for (; s !== -1; ) {
        const n = t[s - 1];
        if (n === " " || n === "	") {
          e = s - 1;
          break;
        } else
          s = t.indexOf("#", s + 1);
      }
      for (; ; ) {
        const n = t[e - 1];
        if (n === " " || n === "	")
          e -= 1;
        else
          break;
      }
      const i = (yield* this.pushCount(e)) + (yield* this.pushSpaces(!0));
      return yield* this.pushCount(t.length - i), this.pushNewline(), "stream";
    }
    if (this.atLineEnd()) {
      const e = yield* this.pushSpaces(!0);
      return yield* this.pushCount(t.length - e), yield* this.pushNewline(), "stream";
    }
    return yield bi, yield* this.parseLineStart();
  }
  *parseLineStart() {
    const t = this.charAt(0);
    if (!t && !this.atEnd)
      return this.setNext("line-start");
    if (t === "-" || t === ".") {
      if (!this.atEnd && !this.hasChars(4))
        return this.setNext("line-start");
      const e = this.peek(3);
      if ((e === "---" || e === "...") && at(this.charAt(3)))
        return yield* this.pushCount(3), this.indentValue = 0, this.indentNext = 0, e === "---" ? "doc" : "stream";
    }
    return this.indentValue = yield* this.pushSpaces(!1), this.indentNext > this.indentValue && !at(this.charAt(1)) && (this.indentNext = this.indentValue), yield* this.parseBlockStart();
  }
  *parseBlockStart() {
    const [t, e] = this.peek(2);
    if (!e && !this.atEnd)
      return this.setNext("block-start");
    if ((t === "-" || t === "?" || t === ":") && at(e)) {
      const s = (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0));
      return this.indentNext = this.indentValue + 1, this.indentValue += s, "block-start";
    }
    return "doc";
  }
  *parseDocument() {
    yield* this.pushSpaces(!0);
    const t = this.getLine();
    if (t === null)
      return this.setNext("doc");
    let e = yield* this.pushIndicators();
    switch (t[e]) {
      case "#":
        yield* this.pushCount(t.length - e);
      case void 0:
        return yield* this.pushNewline(), yield* this.parseLineStart();
      case "{":
      case "[":
        return yield* this.pushCount(1), this.flowKey = !1, this.flowLevel = 1, "flow";
      case "}":
      case "]":
        return yield* this.pushCount(1), "doc";
      case "*":
        return yield* this.pushUntil(qe), "doc";
      case '"':
      case "'":
        return yield* this.parseQuotedScalar();
      case "|":
      case ">":
        return e += yield* this.parseBlockScalarHeader(), e += yield* this.pushSpaces(!0), yield* this.pushCount(t.length - e), yield* this.pushNewline(), yield* this.parseBlockScalar();
      default:
        return yield* this.parsePlainScalar();
    }
  }
  *parseFlowCollection() {
    let t, e, s = -1;
    do
      t = yield* this.pushNewline(), t > 0 ? (e = yield* this.pushSpaces(!1), this.indentValue = s = e) : e = 0, e += yield* this.pushSpaces(!0);
    while (t + e > 0);
    const i = this.getLine();
    if (i === null)
      return this.setNext("flow");
    if ((s !== -1 && s < this.indentNext && i[0] !== "#" || s === 0 && (i.startsWith("---") || i.startsWith("...")) && at(i[3])) && !(s === this.indentNext - 1 && this.flowLevel === 1 && (i[0] === "]" || i[0] === "}")))
      return this.flowLevel = 0, yield yi, yield* this.parseLineStart();
    let n = 0;
    for (; i[n] === ","; )
      n += yield* this.pushCount(1), n += yield* this.pushSpaces(!0), this.flowKey = !1;
    switch (n += yield* this.pushIndicators(), i[n]) {
      case void 0:
        return "flow";
      case "#":
        return yield* this.pushCount(i.length - n), "flow";
      case "{":
      case "[":
        return yield* this.pushCount(1), this.flowKey = !1, this.flowLevel += 1, "flow";
      case "}":
      case "]":
        return yield* this.pushCount(1), this.flowKey = !0, this.flowLevel -= 1, this.flowLevel ? "flow" : "doc";
      case "*":
        return yield* this.pushUntil(qe), "flow";
      case '"':
      case "'":
        return this.flowKey = !0, yield* this.parseQuotedScalar();
      case ":": {
        const o = this.charAt(1);
        if (this.flowKey || at(o) || o === ",")
          return this.flowKey = !1, yield* this.pushCount(1), yield* this.pushSpaces(!0), "flow";
      }
      default:
        return this.flowKey = !1, yield* this.parsePlainScalar();
    }
  }
  *parseQuotedScalar() {
    const t = this.charAt(0);
    let e = this.buffer.indexOf(t, this.pos + 1);
    if (t === "'")
      for (; e !== -1 && this.buffer[e + 1] === "'"; )
        e = this.buffer.indexOf("'", e + 2);
    else
      for (; e !== -1; ) {
        let n = 0;
        for (; this.buffer[e - 1 - n] === "\\"; )
          n += 1;
        if (n % 2 === 0)
          break;
        e = this.buffer.indexOf('"', e + 1);
      }
    const s = this.buffer.substring(0, e);
    let i = s.indexOf(`
`, this.pos);
    if (i !== -1) {
      for (; i !== -1; ) {
        const n = this.continueScalar(i + 1);
        if (n === -1)
          break;
        i = s.indexOf(`
`, n);
      }
      i !== -1 && (e = i - (s[i - 1] === "\r" ? 2 : 1));
    }
    if (e === -1) {
      if (!this.atEnd)
        return this.setNext("quoted-scalar");
      e = this.buffer.length;
    }
    return yield* this.pushToIndex(e + 1, !1), this.flowLevel ? "flow" : "doc";
  }
  *parseBlockScalarHeader() {
    this.blockScalarIndent = -1, this.blockScalarKeep = !1;
    let t = this.pos;
    for (; ; ) {
      const e = this.buffer[++t];
      if (e === "+")
        this.blockScalarKeep = !0;
      else if (e > "0" && e <= "9")
        this.blockScalarIndent = Number(e) - 1;
      else if (e !== "-")
        break;
    }
    return yield* this.pushUntil((e) => at(e) || e === "#");
  }
  *parseBlockScalar() {
    let t = this.pos - 1, e = 0, s;
    t: for (let n = this.pos; s = this.buffer[n]; ++n)
      switch (s) {
        case " ":
          e += 1;
          break;
        case `
`:
          t = n, e = 0;
          break;
        case "\r": {
          const o = this.buffer[n + 1];
          if (!o && !this.atEnd)
            return this.setNext("block-scalar");
          if (o === `
`)
            break;
        }
        default:
          break t;
      }
    if (!s && !this.atEnd)
      return this.setNext("block-scalar");
    if (e >= this.indentNext) {
      this.blockScalarIndent === -1 ? this.indentNext = e : this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
      do {
        const n = this.continueScalar(t + 1);
        if (n === -1)
          break;
        t = this.buffer.indexOf(`
`, n);
      } while (t !== -1);
      if (t === -1) {
        if (!this.atEnd)
          return this.setNext("block-scalar");
        t = this.buffer.length;
      }
    }
    let i = t + 1;
    for (s = this.buffer[i]; s === " "; )
      s = this.buffer[++i];
    if (s === "	") {
      for (; s === "	" || s === " " || s === "\r" || s === `
`; )
        s = this.buffer[++i];
      t = i - 1;
    } else if (!this.blockScalarKeep)
      do {
        let n = t - 1, o = this.buffer[n];
        o === "\r" && (o = this.buffer[--n]);
        const a = n;
        for (; o === " "; )
          o = this.buffer[--n];
        if (o === `
` && n >= this.pos && n + 1 + e > a)
          t = n;
        else
          break;
      } while (!0);
    return yield Ye, yield* this.pushToIndex(t + 1, !0), yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const t = this.flowLevel > 0;
    let e = this.pos - 1, s = this.pos - 1, i;
    for (; i = this.buffer[++s]; )
      if (i === ":") {
        const n = this.buffer[s + 1];
        if (at(n) || t && le.has(n))
          break;
        e = s;
      } else if (at(i)) {
        let n = this.buffer[s + 1];
        if (i === "\r" && (n === `
` ? (s += 1, i = `
`, n = this.buffer[s + 1]) : e = s), n === "#" || t && le.has(n))
          break;
        if (i === `
`) {
          const o = this.continueScalar(s + 1);
          if (o === -1)
            break;
          s = Math.max(s, o - 2);
        }
      } else {
        if (t && le.has(i))
          break;
        e = s;
      }
    return !i && !this.atEnd ? this.setNext("plain-scalar") : (yield Ye, yield* this.pushToIndex(e + 1, !0), t ? "flow" : "doc");
  }
  *pushCount(t) {
    return t > 0 ? (yield this.buffer.substr(this.pos, t), this.pos += t, t) : 0;
  }
  *pushToIndex(t, e) {
    const s = this.buffer.slice(this.pos, t);
    return s ? (yield s, this.pos += s.length, s.length) : (e && (yield ""), 0);
  }
  *pushIndicators() {
    let t = 0;
    t: for (; ; ) {
      switch (this.charAt(0)) {
        case "!":
          t += yield* this.pushTag(), t += yield* this.pushSpaces(!0);
          continue t;
        case "&":
          t += yield* this.pushUntil(qe), t += yield* this.pushSpaces(!0);
          continue t;
        case "-":
        case "?":
        case ":": {
          const e = this.flowLevel > 0, s = this.charAt(1);
          if (at(s) || e && le.has(s)) {
            e ? this.flowKey && (this.flowKey = !1) : this.indentNext = this.indentValue + 1, t += yield* this.pushCount(1), t += yield* this.pushSpaces(!0);
            continue t;
          }
        }
      }
      break t;
    }
    return t;
  }
  *pushTag() {
    if (this.charAt(1) === "<") {
      let t = this.pos + 2, e = this.buffer[t];
      for (; !at(e) && e !== ">"; )
        e = this.buffer[++t];
      return yield* this.pushToIndex(e === ">" ? t + 1 : t, !1);
    } else {
      let t = this.pos + 1, e = this.buffer[t];
      for (; e; )
        if (In.has(e))
          e = this.buffer[++t];
        else if (e === "%" && $s.has(this.buffer[t + 1]) && $s.has(this.buffer[t + 2]))
          e = this.buffer[t += 3];
        else
          break;
      return yield* this.pushToIndex(t, !1);
    }
  }
  *pushNewline() {
    const t = this.buffer[this.pos];
    return t === `
` ? yield* this.pushCount(1) : t === "\r" && this.charAt(1) === `
` ? yield* this.pushCount(2) : 0;
  }
  *pushSpaces(t) {
    let e = this.pos - 1, s;
    do
      s = this.buffer[++e];
    while (s === " " || t && s === "	");
    const i = e - this.pos;
    return i > 0 && (yield this.buffer.substr(this.pos, i), this.pos = e), i;
  }
  *pushUntil(t) {
    let e = this.pos, s = this.buffer[e];
    for (; !t(s); )
      s = this.buffer[++e];
    return yield* this.pushToIndex(e, !1);
  }
}
class qn {
  constructor() {
    this.lineStarts = [], this.addNewLine = (t) => this.lineStarts.push(t), this.linePos = (t) => {
      let e = 0, s = this.lineStarts.length;
      for (; e < s; ) {
        const n = e + s >> 1;
        this.lineStarts[n] < t ? e = n + 1 : s = n;
      }
      if (this.lineStarts[e] === t)
        return { line: e + 1, col: 1 };
      if (e === 0)
        return { line: 0, col: t };
      const i = this.lineStarts[e - 1];
      return { line: e, col: t - i + 1 };
    };
  }
}
function yt(r, t) {
  for (let e = 0; e < r.length; ++e)
    if (r[e].type === t)
      return !0;
  return !1;
}
function Ss(r) {
  for (let t = 0; t < r.length; ++t)
    switch (r[t].type) {
      case "space":
      case "comment":
      case "newline":
        break;
      default:
        return t;
    }
  return -1;
}
function vi(r) {
  switch (r?.type) {
    case "alias":
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "flow-collection":
      return !0;
    default:
      return !1;
  }
}
function ce(r) {
  switch (r.type) {
    case "document":
      return r.start;
    case "block-map": {
      const t = r.items[r.items.length - 1];
      return t.sep ?? t.start;
    }
    case "block-seq":
      return r.items[r.items.length - 1].start;
    default:
      return [];
  }
}
function Nt(r) {
  if (r.length === 0)
    return [];
  let t = r.length;
  t: for (; --t >= 0; )
    switch (r[t].type) {
      case "doc-start":
      case "explicit-key-ind":
      case "map-value-ind":
      case "seq-item-ind":
      case "newline":
        break t;
    }
  for (; r[++t]?.type === "space"; )
    ;
  return r.splice(t, r.length);
}
function be(r, t) {
  if (t.length < 1e5)
    Array.prototype.push.apply(r, t);
  else
    for (let e = 0; e < t.length; ++e)
      r.push(t[e]);
}
function Es(r) {
  if (r.start.type === "flow-seq-start")
    for (const t of r.items)
      t.sep && !t.value && !yt(t.start, "explicit-key-ind") && !yt(t.sep, "map-value-ind") && (t.key && (t.value = t.key), delete t.key, vi(t.value) ? t.value.end ? be(t.value.end, t.sep) : t.value.end = t.sep : be(t.start, t.sep), delete t.sep);
}
class Fn {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(t) {
    this.atNewLine = !0, this.atScalar = !1, this.indent = 0, this.offset = 0, this.onKeyLine = !1, this.stack = [], this.source = "", this.type = "", this.lexer = new Pn(), this.onNewLine = t;
  }
  /**
   * Parse `source` as a YAML stream.
   * If `incomplete`, a part of the last line may be left as a buffer for the next call.
   *
   * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
   *
   * @returns A generator of tokens representing each directive, document, and other structure.
   */
  *parse(t, e = !1) {
    this.onNewLine && this.offset === 0 && this.onNewLine(0);
    for (const s of this.lexer.lex(t, e))
      yield* this.next(s);
    e || (yield* this.end());
  }
  /**
   * Advance the parser by the `source` of one lexical token.
   */
  *next(t) {
    if (this.source = t, this.atScalar) {
      this.atScalar = !1, yield* this.step(), this.offset += t.length;
      return;
    }
    const e = Nn(t);
    if (e)
      if (e === "scalar")
        this.atNewLine = !1, this.atScalar = !0, this.type = "scalar";
      else {
        switch (this.type = e, yield* this.step(), e) {
          case "newline":
            this.atNewLine = !0, this.indent = 0, this.onNewLine && this.onNewLine(this.offset + t.length);
            break;
          case "space":
            this.atNewLine && t[0] === " " && (this.indent += t.length);
            break;
          case "explicit-key-ind":
          case "map-value-ind":
          case "seq-item-ind":
            this.atNewLine && (this.indent += t.length);
            break;
          case "doc-mode":
          case "flow-error-end":
            return;
          default:
            this.atNewLine = !1;
        }
        this.offset += t.length;
      }
    else {
      const s = `Not a YAML token: ${t}`;
      yield* this.pop({ type: "error", offset: this.offset, message: s, source: t }), this.offset += t.length;
    }
  }
  /** Call at end of input to push out any remaining constructions */
  *end() {
    for (; this.stack.length > 0; )
      yield* this.pop();
  }
  get sourceToken() {
    return {
      type: this.type,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
  }
  *step() {
    const t = this.peek(1);
    if (this.type === "doc-end" && t?.type !== "doc-end") {
      for (; this.stack.length > 0; )
        yield* this.pop();
      this.stack.push({
        type: "doc-end",
        offset: this.offset,
        source: this.source
      });
      return;
    }
    if (!t)
      return yield* this.stream();
    switch (t.type) {
      case "document":
        return yield* this.document(t);
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return yield* this.scalar(t);
      case "block-scalar":
        return yield* this.blockScalar(t);
      case "block-map":
        return yield* this.blockMap(t);
      case "block-seq":
        return yield* this.blockSequence(t);
      case "flow-collection":
        return yield* this.flowCollection(t);
      case "doc-end":
        return yield* this.documentEnd(t);
    }
    yield* this.pop();
  }
  peek(t) {
    return this.stack[this.stack.length - t];
  }
  *pop(t) {
    const e = t ?? this.stack.pop();
    if (!e)
      yield { type: "error", offset: this.offset, source: "", message: "Tried to pop an empty stack" };
    else if (this.stack.length === 0)
      yield e;
    else {
      const s = this.peek(1);
      switch (e.type === "block-scalar" ? e.indent = "indent" in s ? s.indent : 0 : e.type === "flow-collection" && s.type === "document" && (e.indent = 0), e.type === "flow-collection" && Es(e), s.type) {
        case "document":
          s.value = e;
          break;
        case "block-scalar":
          s.props.push(e);
          break;
        case "block-map": {
          const i = s.items[s.items.length - 1];
          if (i.value) {
            s.items.push({ start: [], key: e, sep: [] }), this.onKeyLine = !0;
            return;
          } else if (i.sep)
            i.value = e;
          else {
            Object.assign(i, { key: e, sep: [] }), this.onKeyLine = !i.explicitKey;
            return;
          }
          break;
        }
        case "block-seq": {
          const i = s.items[s.items.length - 1];
          i.value ? s.items.push({ start: [], value: e }) : i.value = e;
          break;
        }
        case "flow-collection": {
          const i = s.items[s.items.length - 1];
          !i || i.value ? s.items.push({ start: [], key: e, sep: [] }) : i.sep ? i.value = e : Object.assign(i, { key: e, sep: [] });
          return;
        }
        default:
          yield* this.pop(), yield* this.pop(e);
      }
      if ((s.type === "document" || s.type === "block-map" || s.type === "block-seq") && (e.type === "block-map" || e.type === "block-seq")) {
        const i = e.items[e.items.length - 1];
        i && !i.sep && !i.value && i.start.length > 0 && Ss(i.start) === -1 && (e.indent === 0 || i.start.every((n) => n.type !== "comment" || n.indent < e.indent)) && (s.type === "document" ? s.end = i.start : s.items.push({ start: i.start }), e.items.splice(-1, 1));
      }
    }
  }
  *stream() {
    switch (this.type) {
      case "directive-line":
        yield { type: "directive", offset: this.offset, source: this.source };
        return;
      case "byte-order-mark":
      case "space":
      case "comment":
      case "newline":
        yield this.sourceToken;
        return;
      case "doc-mode":
      case "doc-start": {
        const t = {
          type: "document",
          offset: this.offset,
          start: []
        };
        this.type === "doc-start" && t.start.push(this.sourceToken), this.stack.push(t);
        return;
      }
    }
    yield {
      type: "error",
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML stream`,
      source: this.source
    };
  }
  *document(t) {
    if (t.value)
      return yield* this.lineEnd(t);
    switch (this.type) {
      case "doc-start": {
        Ss(t.start) !== -1 ? (yield* this.pop(), yield* this.step()) : t.start.push(this.sourceToken);
        return;
      }
      case "anchor":
      case "tag":
      case "space":
      case "comment":
      case "newline":
        t.start.push(this.sourceToken);
        return;
    }
    const e = this.startBlockValue(t);
    e ? this.stack.push(e) : yield {
      type: "error",
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML document`,
      source: this.source
    };
  }
  *scalar(t) {
    if (this.type === "map-value-ind") {
      const e = ce(this.peek(2)), s = Nt(e);
      let i;
      t.end ? (i = t.end, i.push(this.sourceToken), delete t.end) : i = [this.sourceToken];
      const n = {
        type: "block-map",
        offset: t.offset,
        indent: t.indent,
        items: [{ start: s, key: t, sep: i }]
      };
      this.onKeyLine = !0, this.stack[this.stack.length - 1] = n;
    } else
      yield* this.lineEnd(t);
  }
  *blockScalar(t) {
    switch (this.type) {
      case "space":
      case "comment":
      case "newline":
        t.props.push(this.sourceToken);
        return;
      case "scalar":
        if (t.source = this.source, this.atNewLine = !0, this.indent = 0, this.onNewLine) {
          let e = this.source.indexOf(`
`) + 1;
          for (; e !== 0; )
            this.onNewLine(this.offset + e), e = this.source.indexOf(`
`, e) + 1;
        }
        yield* this.pop();
        break;
      default:
        yield* this.pop(), yield* this.step();
    }
  }
  *blockMap(t) {
    const e = t.items[t.items.length - 1];
    switch (this.type) {
      case "newline":
        if (this.onKeyLine = !1, e.value) {
          const s = "end" in e.value ? e.value.end : void 0;
          (Array.isArray(s) ? s[s.length - 1] : void 0)?.type === "comment" ? s?.push(this.sourceToken) : t.items.push({ start: [this.sourceToken] });
        } else e.sep ? e.sep.push(this.sourceToken) : e.start.push(this.sourceToken);
        return;
      case "space":
      case "comment":
        if (e.value)
          t.items.push({ start: [this.sourceToken] });
        else if (e.sep)
          e.sep.push(this.sourceToken);
        else {
          if (this.atIndentedComment(e.start, t.indent)) {
            const i = t.items[t.items.length - 2]?.value?.end;
            if (Array.isArray(i)) {
              be(i, e.start), i.push(this.sourceToken), t.items.pop();
              return;
            }
          }
          e.start.push(this.sourceToken);
        }
        return;
    }
    if (this.indent >= t.indent) {
      const s = !this.onKeyLine && this.indent === t.indent, i = s && (e.sep || e.explicitKey) && this.type !== "seq-item-ind";
      let n = [];
      if (i && e.sep && !e.value) {
        const o = [];
        for (let a = 0; a < e.sep.length; ++a) {
          const l = e.sep[a];
          switch (l.type) {
            case "newline":
              o.push(a);
              break;
            case "space":
              break;
            case "comment":
              l.indent > t.indent && (o.length = 0);
              break;
            default:
              o.length = 0;
          }
        }
        o.length >= 2 && (n = e.sep.splice(o[1]));
      }
      switch (this.type) {
        case "anchor":
        case "tag":
          i || e.value ? (n.push(this.sourceToken), t.items.push({ start: n }), this.onKeyLine = !0) : e.sep ? e.sep.push(this.sourceToken) : e.start.push(this.sourceToken);
          return;
        case "explicit-key-ind":
          !e.sep && !e.explicitKey ? (e.start.push(this.sourceToken), e.explicitKey = !0) : i || e.value ? (n.push(this.sourceToken), t.items.push({ start: n, explicitKey: !0 })) : this.stack.push({
            type: "block-map",
            offset: this.offset,
            indent: this.indent,
            items: [{ start: [this.sourceToken], explicitKey: !0 }]
          }), this.onKeyLine = !0;
          return;
        case "map-value-ind":
          if (e.explicitKey)
            if (e.sep)
              if (e.value)
                t.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (yt(e.sep, "map-value-ind"))
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: n, key: null, sep: [this.sourceToken] }]
                });
              else if (vi(e.key) && !yt(e.sep, "newline")) {
                const o = Nt(e.start), a = e.key, l = e.sep;
                l.push(this.sourceToken), delete e.key, delete e.sep, this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: o, key: a, sep: l }]
                });
              } else n.length > 0 ? e.sep = e.sep.concat(n, this.sourceToken) : e.sep.push(this.sourceToken);
            else if (yt(e.start, "newline"))
              Object.assign(e, { key: null, sep: [this.sourceToken] });
            else {
              const o = Nt(e.start);
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: o, key: null, sep: [this.sourceToken] }]
              });
            }
          else
            e.sep ? e.value || i ? t.items.push({ start: n, key: null, sep: [this.sourceToken] }) : yt(e.sep, "map-value-ind") ? this.stack.push({
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [], key: null, sep: [this.sourceToken] }]
            }) : e.sep.push(this.sourceToken) : Object.assign(e, { key: null, sep: [this.sourceToken] });
          this.onKeyLine = !0;
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const o = this.flowScalar(this.type);
          i || e.value ? (t.items.push({ start: n, key: o, sep: [] }), this.onKeyLine = !0) : e.sep ? this.stack.push(o) : (Object.assign(e, { key: o, sep: [] }), this.onKeyLine = !0);
          return;
        }
        default: {
          const o = this.startBlockValue(t);
          if (o) {
            if (o.type === "block-seq") {
              if (!e.explicitKey && e.sep && !yt(e.sep, "newline")) {
                yield* this.pop({
                  type: "error",
                  offset: this.offset,
                  message: "Unexpected block-seq-ind on same line with key",
                  source: this.source
                });
                return;
              }
            } else s && t.items.push({ start: n });
            this.stack.push(o);
            return;
          }
        }
      }
    }
    yield* this.pop(), yield* this.step();
  }
  *blockSequence(t) {
    const e = t.items[t.items.length - 1];
    switch (this.type) {
      case "newline":
        if (e.value) {
          const s = "end" in e.value ? e.value.end : void 0;
          (Array.isArray(s) ? s[s.length - 1] : void 0)?.type === "comment" ? s?.push(this.sourceToken) : t.items.push({ start: [this.sourceToken] });
        } else
          e.start.push(this.sourceToken);
        return;
      case "space":
      case "comment":
        if (e.value)
          t.items.push({ start: [this.sourceToken] });
        else {
          if (this.atIndentedComment(e.start, t.indent)) {
            const i = t.items[t.items.length - 2]?.value?.end;
            if (Array.isArray(i)) {
              be(i, e.start), i.push(this.sourceToken), t.items.pop();
              return;
            }
          }
          e.start.push(this.sourceToken);
        }
        return;
      case "anchor":
      case "tag":
        if (e.value || this.indent <= t.indent)
          break;
        e.start.push(this.sourceToken);
        return;
      case "seq-item-ind":
        if (this.indent !== t.indent)
          break;
        e.value || yt(e.start, "seq-item-ind") ? t.items.push({ start: [this.sourceToken] }) : e.start.push(this.sourceToken);
        return;
    }
    if (this.indent > t.indent) {
      const s = this.startBlockValue(t);
      if (s) {
        this.stack.push(s);
        return;
      }
    }
    yield* this.pop(), yield* this.step();
  }
  *flowCollection(t) {
    const e = t.items[t.items.length - 1];
    if (this.type === "flow-error-end") {
      let s;
      do
        yield* this.pop(), s = this.peek(1);
      while (s?.type === "flow-collection");
    } else if (t.end.length === 0) {
      switch (this.type) {
        case "comma":
        case "explicit-key-ind":
          !e || e.sep ? t.items.push({ start: [this.sourceToken] }) : e.start.push(this.sourceToken);
          return;
        case "map-value-ind":
          !e || e.value ? t.items.push({ start: [], key: null, sep: [this.sourceToken] }) : e.sep ? e.sep.push(this.sourceToken) : Object.assign(e, { key: null, sep: [this.sourceToken] });
          return;
        case "space":
        case "comment":
        case "newline":
        case "anchor":
        case "tag":
          !e || e.value ? t.items.push({ start: [this.sourceToken] }) : e.sep ? e.sep.push(this.sourceToken) : e.start.push(this.sourceToken);
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const i = this.flowScalar(this.type);
          !e || e.value ? t.items.push({ start: [], key: i, sep: [] }) : e.sep ? this.stack.push(i) : Object.assign(e, { key: i, sep: [] });
          return;
        }
        case "flow-map-end":
        case "flow-seq-end":
          t.end.push(this.sourceToken);
          return;
      }
      const s = this.startBlockValue(t);
      s ? this.stack.push(s) : (yield* this.pop(), yield* this.step());
    } else {
      const s = this.peek(2);
      if (s.type === "block-map" && (this.type === "map-value-ind" && s.indent === t.indent || this.type === "newline" && !s.items[s.items.length - 1].sep))
        yield* this.pop(), yield* this.step();
      else if (this.type === "map-value-ind" && s.type !== "flow-collection") {
        const i = ce(s), n = Nt(i);
        Es(t);
        const o = t.end.splice(1, t.end.length);
        o.push(this.sourceToken);
        const a = {
          type: "block-map",
          offset: t.offset,
          indent: t.indent,
          items: [{ start: n, key: t, sep: o }]
        };
        this.onKeyLine = !0, this.stack[this.stack.length - 1] = a;
      } else
        yield* this.lineEnd(t);
    }
  }
  flowScalar(t) {
    if (this.onNewLine) {
      let e = this.source.indexOf(`
`) + 1;
      for (; e !== 0; )
        this.onNewLine(this.offset + e), e = this.source.indexOf(`
`, e) + 1;
    }
    return {
      type: t,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
  }
  startBlockValue(t) {
    switch (this.type) {
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return this.flowScalar(this.type);
      case "block-scalar-header":
        return {
          type: "block-scalar",
          offset: this.offset,
          indent: this.indent,
          props: [this.sourceToken],
          source: ""
        };
      case "flow-map-start":
      case "flow-seq-start":
        return {
          type: "flow-collection",
          offset: this.offset,
          indent: this.indent,
          start: this.sourceToken,
          items: [],
          end: []
        };
      case "seq-item-ind":
        return {
          type: "block-seq",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: [this.sourceToken] }]
        };
      case "explicit-key-ind": {
        this.onKeyLine = !0;
        const e = ce(t), s = Nt(e);
        return s.push(this.sourceToken), {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: s, explicitKey: !0 }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = !0;
        const e = ce(t), s = Nt(e);
        return {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: s, key: null, sep: [this.sourceToken] }]
        };
      }
    }
    return null;
  }
  atIndentedComment(t, e) {
    return this.type !== "comment" || this.indent <= e ? !1 : t.every((s) => s.type === "newline" || s.type === "space");
  }
  *documentEnd(t) {
    this.type !== "doc-mode" && (t.end ? t.end.push(this.sourceToken) : t.end = [this.sourceToken], this.type === "newline" && (yield* this.pop()));
  }
  *lineEnd(t) {
    switch (this.type) {
      case "comma":
      case "doc-start":
      case "doc-end":
      case "flow-seq-end":
      case "flow-map-end":
      case "map-value-ind":
        yield* this.pop(), yield* this.step();
        break;
      case "newline":
        this.onKeyLine = !1;
      case "space":
      case "comment":
      default:
        t.end ? t.end.push(this.sourceToken) : t.end = [this.sourceToken], this.type === "newline" && (yield* this.pop());
    }
  }
}
function zn(r) {
  const t = r.prettyErrors !== !1;
  return { lineCounter: r.lineCounter || t && new qn() || null, prettyErrors: t };
}
function Bn(r, t = {}) {
  const { lineCounter: e, prettyErrors: s } = zn(t), i = new Fn(e?.addNewLine), n = new Cn(t);
  let o = null;
  for (const a of n.compose(i.parse(r), !0, r.length))
    if (!o)
      o = a;
    else if (o.options.logLevel !== "silent") {
      o.errors.push(new Gt(a.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  return s && e && (o.errors.forEach(xs(r, e)), o.warnings.forEach(xs(r, e))), o;
}
function jn(r, t, e) {
  let s;
  const i = Bn(r, e);
  if (!i)
    return null;
  if (i.warnings.forEach((n) => Ws(i.options.logLevel, n)), i.errors.length > 0) {
    if (i.options.logLevel !== "silent")
      throw i.errors[0];
    i.errors = [];
  }
  return i.toJS(Object.assign({ reviver: s }, e));
}
const Rn = {
  sun: "sun",
  mon: "mon",
  tue: "tue",
  wed: "wed",
  thu: "thu",
  fri: "fri",
  sat: "sat"
}, Ls = ["mon", "tue", "wed", "thu", "fri"];
function hs(r) {
  if (typeof r == "number") return r * 24 * 36e5;
  if (typeof r != "string") return null;
  const t = r.trim().toLowerCase(), e = /^(-?\d+(?:\.\d+)?)\s*(d|day|days|h|hr|hour|hours|w|week|weeks|m|min|minutes)?$/.exec(t);
  if (!e) return null;
  const s = parseFloat(e[1]), i = e[2] || "d", n = i.startsWith("h") || i === "hr" ? 36e5 : i.startsWith("m") && !i.startsWith("mon") ? 6e4 : i.startsWith("w") ? 7 * 24 * 36e5 : 24 * 36e5;
  return s * n;
}
function vt(r) {
  if (r == null) return null;
  if (r instanceof Date) return isNaN(r.getTime()) ? null : r;
  if (typeof r == "string") {
    const t = r.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(t)) {
      const [s, i, n] = t.split("-").map(Number);
      return new Date(s, i - 1, n);
    }
    const e = new Date(t);
    return isNaN(e.getTime()) ? null : e;
  }
  return null;
}
function ye(r) {
  return r.trim().replace(/\s+/g, "-").replace(/[^\w가-힣-]/g, "");
}
function _n(r) {
  if (typeof r == "number")
    return r > 1 ? Math.max(0, Math.min(100, r)) / 100 : Math.max(0, Math.min(1, r));
}
function Un(r) {
  if (!r) return null;
  if (typeof r == "string") return { id: ye(r), type: "FS", lag: 0 };
  if (typeof r == "object" && r !== null) {
    const t = r, e = t.id ? ye(String(t.id)) : null;
    if (!e) return null;
    const s = ["FS", "SS", "FF", "SF"].includes(t.type) ? t.type : "FS", i = hs(t.lag) ?? 0;
    return { id: e, type: s, lag: i };
  }
  return null;
}
function xi(r, t, e, s, i, n) {
  const o = [];
  for (const a of r) {
    if (!a || typeof a != "object") continue;
    const l = String(a.name ?? a.title ?? "").trim();
    if (!l) {
      n.push("태스크 이름이 비어 있어요");
      continue;
    }
    const c = a.id ? ye(String(a.id)) : ye(l);
    if (s.has(c)) {
      n.push(`중복 id: ${c}`);
      continue;
    }
    const p = hs(a.duration);
    let d = vt(a.start);
    const h = a.open === !0 || a.end === "?" || a.end === "tbd" || a.end === "TBD";
    let u = h ? null : vt(a.end);
    const g = Un(a.after);
    if (g) {
      const v = s.get(g.id);
      if (!v)
        n.push(`${c}: after 대상 ${g.id} 찾을 수 없음`);
      else {
        if (!d) {
          const w = g.type === "SS" || g.type === "SF" ? v.start.getTime() : v.end.getTime();
          d = new Date(w + g.lag), (g.type === "FF" || g.type === "SF") && p != null && (d = new Date(d.getTime() - p));
        }
        i.push({ source: g.id, target: c, type: g.type, lag: g.lag });
      }
    }
    d || (d = e.today ?? /* @__PURE__ */ new Date()), u || (p != null ? u = new Date(d.getTime() + p) : u = new Date(d.getTime() + 24 * 36e5));
    const f = !!a.milestone;
    f && (u = new Date(d.getTime()));
    let b, x;
    const $ = a.baseline;
    $ && typeof $ == "object" && (b = vt($.start) ?? void 0, x = vt($.end) ?? void 0), b = vt(a.baselineStart) ?? b, x = vt(a.baselineEnd) ?? x;
    const m = {
      id: c,
      name: l,
      start: d,
      end: u,
      duration: u.getTime() - d.getTime(),
      progress: _n(a.progress),
      parentId: t,
      assignee: a.assignee ? String(a.assignee) : void 0,
      color: a.color ? String(a.color) : void 0,
      critical: !!a.critical,
      milestone: f,
      baselineStart: b,
      baselineEnd: x,
      open: h && !f ? !0 : void 0,
      locked: a.locked === !0 ? !0 : void 0,
      note: a.note != null ? String(a.note) : void 0,
      status: ["done", "progress", "overdue", "upcoming", "hold"].includes(a.status) ? a.status : void 0
    };
    s.set(c, m), o.push(m), Array.isArray(a.children) && o.push(...xi(a.children, c, e, s, i, n));
  }
  return o;
}
function Hn(r) {
  let t;
  try {
    t = jn(r);
  } catch (e) {
    return { ir: null, errors: [`YAML 파싱 실패: ${e?.message || e}`], warnings: [] };
  }
  return wi(t?.gantt ?? t);
}
function Ts(r) {
  return r == null || typeof r != "object" ? { ir: null, errors: ["간트 데이터 객체가 필요해요"], warnings: [] } : wi(r.gantt ?? r);
}
function wi(r) {
  const t = [], e = [];
  if (!r || typeof r != "object")
    return t.push("gantt 루트가 없어요"), { ir: null, errors: t, warnings: e };
  const i = (Array.isArray(r.workdays) ? r.workdays : Ls).map((p) => Rn[String(p).toLowerCase()]).filter(Boolean), n = Array.isArray(r.holidays) ? r.holidays.map(vt).filter((p) => !!p) : [], o = {
    title: r.title ? String(r.title) : void 0,
    today: vt(r.today) ?? void 0,
    workdays: i.length ? i : Ls,
    holidays: n,
    scale: ["day", "week", "month"].includes(r.scale) ? r.scale : "day",
    theme: r.theme && typeof r.theme == "object" ? r.theme : void 0
  }, a = /* @__PURE__ */ new Map(), l = [], c = Array.isArray(r.tasks) ? xi(r.tasks, void 0, o, a, l, t) : [];
  if (Array.isArray(r.links))
    for (const p of r.links) {
      if (!p || typeof p != "object") continue;
      const d = String(p.source ?? ""), h = String(p.target ?? "");
      if (!a.has(d) || !a.has(h)) {
        t.push(`links: ${d}→${h} 대상 없음`);
        continue;
      }
      if (d === h) {
        t.push(`links: 자기참조 링크 무시 (${d})`);
        continue;
      }
      if (l.some((g) => g.source === d && g.target === h)) {
        t.push(`links: 중복 링크 무시 (${d}→${h})`);
        continue;
      }
      const u = ["FS", "SS", "FF", "SF"].includes(p.type) ? p.type : "FS";
      l.push({ source: d, target: h, type: u, lag: hs(p.lag) ?? 0 });
    }
  return c.length || e.push("태스크가 없어요"), { ir: { meta: o, tasks: c, links: l }, errors: t, warnings: e };
}
const Wn = ["mon", "tue", "wed", "thu", "fri"];
function Fe(r) {
  return r.trim().replace(/\s+/g, "-").replace(/[^\w가-힣-]/g, "");
}
function Ms(r) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(r)) {
    const [e, s, i] = r.split("-").map(Number);
    return new Date(e, s - 1, i);
  }
  const t = new Date(r);
  return isNaN(t.getTime()) ? null : t;
}
function Ds(r) {
  const t = /^(-?\d+(?:\.\d+)?)\s*(d|w|h|min|m|s)?$/i.exec(r.trim());
  if (!t) return null;
  const e = parseFloat(t[1]), s = (t[2] || "d").toLowerCase(), i = s === "h" ? 36e5 : s === "w" ? 7 * 24 * 36e5 : s === "min" || s === "m" ? 6e4 : s === "s" ? 1e3 : 24 * 36e5;
  return e * i;
}
function Kn(r) {
  const t = [], e = [], s = r.split(`
`).map((c) => c.replace(/\s+$/, ""));
  if (!s.length)
    return t.push("입력이 비어 있어요"), { ir: null, errors: t, warnings: e };
  let i = 0;
  for (; i < s.length && !/^\s*gantt\s*$/.test(s[i]); ) i++;
  if (i === s.length)
    return t.push("gantt 지시어를 찾을 수 없어요"), { ir: null, errors: t, warnings: e };
  i++;
  const n = {
    workdays: Wn,
    holidays: [],
    scale: "day"
  }, o = [], a = [], l = /* @__PURE__ */ new Map();
  for (; i < s.length; i++) {
    const c = s[i];
    if (!c.trim() || c.trim().startsWith("%")) continue;
    const p = /^\s*title\s+(.+)$/.exec(c);
    if (p) {
      n.title = p[1].trim();
      continue;
    }
    if (/^\s*dateFormat\s+(.+)$/.exec(c) || /^\s*axisFormat\b/.test(c) || /^\s*todayMarker\b/.test(c)) continue;
    if (/^\s*excludes\s+weekends/i.test(c)) {
      n.workdays = ["mon", "tue", "wed", "thu", "fri"];
      continue;
    }
    const h = /^\s*section\s+(.+)$/.exec(c);
    if (h) {
      h[1].trim();
      continue;
    }
    const u = /^\s{2,}(.+?)\s*:\s*(.+)$/.exec(c);
    if (!u) continue;
    const g = u[1].trim(), f = u[2].split(",").map((O) => O.trim()).filter(Boolean), b = /* @__PURE__ */ new Set();
    let x = 0;
    for (; x < f.length && /^(active|done|crit|milestone|after\s+.+)$/.test(f[x]) && !f[x].startsWith("after "); )
      b.add(f[x]), x++;
    let $;
    x < f.length && !/^\d{4}-/.test(f[x]) && !/^after\s+/.test(f[x]) && !Ds(f[x]) ? ($ = Fe(f[x]), x++) : $ = Fe(g);
    let m = null, v = null;
    if (x < f.length) {
      const O = f[x];
      if (/^after\s+/i.test(O))
        v = Fe(O.replace(/^after\s+/i, "")), x++;
      else {
        const N = Ms(O);
        N && (m = N, x++);
      }
    }
    let w = null, k = null;
    if (x < f.length) {
      const O = f[x], N = Ms(O);
      if (N)
        k = N, x++;
      else {
        const X = Ds(O);
        X != null && (w = X, x++);
      }
    }
    if (!m && v) {
      const O = l.get(v);
      if (!O) {
        t.push(`${$}: after ${v} 대상을 찾을 수 없음`);
        continue;
      }
      m = new Date(O.end.getTime()), a.push({ source: v, target: $, type: "FS", lag: 0 });
    }
    m || (m = /* @__PURE__ */ new Date()), k || (k = new Date(m.getTime() + (w ?? 24 * 36e5)));
    const E = b.has("milestone");
    E && (k = new Date(m.getTime()));
    const y = b.has("done") ? 1 : b.has("active") ? 0.5 : void 0, L = b.has("crit"), A = {
      id: $,
      name: g,
      start: m,
      end: k,
      duration: k.getTime() - m.getTime(),
      progress: y,
      parentId: void 0,
      // Mermaid는 section을 IR parentId로 매핑하지 않음 (v1)
      assignee: void 0,
      critical: L,
      milestone: E
    };
    l.set(A.id, A), o.push(A);
  }
  return o.length || e.push("태스크가 없어요"), { ir: { meta: n, tasks: o, links: a }, errors: t, warnings: e };
}
const D = 24 * 36e5, Yn = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
function q(r) {
  return `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, "0")}-${String(r.getDate()).padStart(2, "0")}`;
}
function ki(r, t) {
  const e = r.getDay();
  return t.some((s) => Yn[s] === e);
}
function $i(r, t) {
  const e = q(r);
  return t.some((s) => q(s) === e);
}
function ve(r, t, e) {
  return !(t.length && !ki(r, t) || $i(r, e));
}
function _r(r, t, e, s) {
  const i = e.length ? e : ["mon", "tue", "wed", "thu", "fri"], n = new Date(r.getFullYear(), r.getMonth(), r.getDate());
  let o = 0;
  for (; !ve(n, i, s) && o++ < 3660; ) n.setDate(n.getDate() + 1);
  let a = 0;
  for (o = 0; a < Math.max(1, Math.round(t)) && o++ < 36600 && !(ve(n, i, s) && (a++, a >= Math.max(1, Math.round(t)))); )
    n.setDate(n.getDate() + 1);
  const l = new Date(n);
  return l.setDate(l.getDate() + 1), l;
}
function It(r, t, e, s) {
  const i = e.length ? e : ["mon", "tue", "wed", "thu", "fri"], n = new Date(r.getFullYear(), r.getMonth(), r.getDate()), o = new Date(t.getFullYear(), t.getMonth(), t.getDate());
  let a = 0, l = 0;
  for (; n < o && l++ < 36600; )
    ve(n, i, s) && a++, n.setDate(n.getDate() + 1);
  return a;
}
function ze(r, t, e) {
  const s = t.length ? t : ["mon", "tue", "wed", "thu", "fri"], i = new Date(r);
  let n = 0;
  for (; !ve(i, s, e) && n++ < 3660; ) i.setDate(i.getDate() + 1);
  return i;
}
function As(r, t = "day", e = 40, s) {
  const i = !!s?.workdaysOnly, n = r.tasks.flatMap(($) => [$.start.getTime(), $.end.getTime()]), o = n.length ? Math.min(...n) : Date.now(), a = n.length ? Math.max(...n) : Date.now() + 7 * D, l = s?.origin ? new Date(s.origin) : new Date(o - 2 * D);
  l.setHours(0, 0, 0, 0);
  const c = s?.end ? new Date(s.end) : new Date(a + 3 * D), p = [], d = /* @__PURE__ */ new Map(), h = r.meta.today ?? /* @__PURE__ */ new Date(), u = q(h), g = new Date(l);
  let f = 0, b = 0;
  const x = 36600;
  for (; g.getTime() < c.getTime() && b < x; ) {
    b++;
    const $ = q(g), m = !ki(g, r.meta.workdays), v = $i(g, r.meta.holidays), w = i && (m || v);
    d.set($, f), w || (p.push({ date: new Date(g), x: f, isWeekend: m, isHoliday: v, isToday: $ === u }), f += e), g.setDate(g.getDate() + 1);
  }
  return { colWidth: e, unit: t, originDate: l, cells: p, totalWidth: f, workdaysOnly: i, dayX: d };
}
function z(r, t) {
  if (r.workdaysOnly) {
    const s = r.dayX.get(q(t));
    if (s != null) return s;
    const i = r.cells[0], n = r.cells[r.cells.length - 1];
    return i && t.getTime() < i.date.getTime() ? i.x - (i.date.getTime() - t.getTime()) / D * r.colWidth : n ? n.x + r.colWidth + (t.getTime() - n.date.getTime()) / D * r.colWidth : 0;
  }
  return (t.getTime() - r.originDate.getTime()) / D * r.colWidth;
}
const Vn = 6e4;
function _(r) {
  const t = r.tasks, e = new Map(t.map((m) => [m.id, m])), s = r.links.filter((m) => e.has(m.source) && e.has(m.target)), i = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const m of t)
    i.set(m.id, []), n.set(m.id, []);
  for (const m of s)
    i.get(m.source).push(m), n.get(m.target).push(m);
  const o = new Map(t.map((m) => [m.id, n.get(m.id).length])), a = t.filter((m) => o.get(m.id) === 0).map((m) => m.id), l = [];
  for (; a.length; ) {
    const m = a.shift();
    l.push(m);
    for (const v of i.get(m))
      o.set(v.target, o.get(v.target) - 1), o.get(v.target) === 0 && a.push(v.target);
  }
  const c = new Set(l), p = l.length !== t.length ? [t.filter((m) => !c.has(m.id)).map((m) => m.id)] : [], d = new Map(t.map((m) => [m.id, Math.max(0, m.duration)])), h = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
  for (const m of t)
    h.set(m.id, m.start.getTime()), u.set(m.id, m.start.getTime() + d.get(m.id));
  for (const m of l) {
    const v = d.get(m);
    let w = h.get(m);
    for (const k of n.get(m)) {
      const E = h.get(k.source), y = u.get(k.source);
      switch (k.type) {
        case "FS":
          w = Math.max(w, y + k.lag);
          break;
        case "SS":
          w = Math.max(w, E + k.lag);
          break;
        case "FF":
          w = Math.max(w, y + k.lag - v);
          break;
        case "SF":
          w = Math.max(w, E + k.lag - v);
          break;
      }
    }
    h.set(m, w), u.set(m, w + v);
  }
  const g = t.length ? Math.max(...t.map((m) => u.get(m.id))) : Date.now(), f = /* @__PURE__ */ new Map();
  for (const m of t) f.set(m.id, g - d.get(m.id));
  const b = (m) => f.get(m) + d.get(m);
  for (const m of [...l].reverse()) {
    const v = d.get(m);
    let w = g - v;
    for (const k of i.get(m)) {
      const E = f.get(k.target), y = b(k.target);
      switch (k.type) {
        case "FS":
          w = Math.min(w, E - k.lag - v);
          break;
        case "SS":
          w = Math.min(w, E - k.lag);
          break;
        case "FF":
          w = Math.min(w, y - k.lag - v);
          break;
        case "SF":
          w = Math.min(w, y - k.lag);
          break;
      }
    }
    f.set(m, w);
  }
  const x = /* @__PURE__ */ new Map(), $ = /* @__PURE__ */ new Set();
  for (const m of t) {
    const v = f.get(m.id) - h.get(m.id);
    x.set(m.id, v), v <= Vn && $.add(m.id);
  }
  return { bySlack: x, criticalIds: $, cycles: p, projectEnd: g };
}
function Xn(r) {
  const t = new Set(r.tasks.map((a) => a.id)), e = r.links.filter((a) => t.has(a.source) && t.has(a.target)), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const a of r.tasks)
    s.set(a.id, []), i.set(a.id, 0);
  for (const a of e)
    s.get(a.source).push(a.target), i.set(a.target, i.get(a.target) + 1);
  const n = r.tasks.filter((a) => i.get(a.id) === 0).map((a) => a.id), o = [];
  for (; n.length; ) {
    const a = n.shift();
    o.push(a);
    for (const l of s.get(a))
      i.set(l, i.get(l) - 1), i.get(l) === 0 && n.push(l);
  }
  for (const a of r.tasks) o.includes(a.id) || o.push(a.id);
  return o;
}
function Cs(r, t, e) {
  if (t === e) return !0;
  const s = /* @__PURE__ */ new Map();
  for (const o of r.links)
    s.has(o.source) || s.set(o.source, []), s.get(o.source).push(o.target);
  const i = /* @__PURE__ */ new Set(), n = [e];
  for (; n.length; ) {
    const o = n.pop();
    if (o === t) return !0;
    if (!i.has(o)) {
      i.add(o);
      for (const a of s.get(o) ?? []) n.push(a);
    }
  }
  return !1;
}
function Gn(r, t, e, s) {
  switch (r.type) {
    case "FS":
      return e + r.lag;
    case "SS":
      return t + r.lag;
    case "FF":
      return e + r.lag - s;
    case "SF":
      return t + r.lag - s;
    default:
      return e + r.lag;
  }
}
function mt(r, t, e) {
  const s = new Map(r.tasks.map((a) => [a.id, a])), i = /* @__PURE__ */ new Map();
  for (const a of r.tasks) i.set(a.id, []);
  for (const a of r.links)
    s.has(a.source) && s.has(a.target) && i.get(a.target).push(a);
  const n = new Set(t);
  {
    const a = /* @__PURE__ */ new Map();
    for (const c of r.links)
      a.has(c.source) || a.set(c.source, []), a.get(c.source).push(c.target);
    const l = [...t];
    for (; l.length; ) {
      const c = l.pop();
      for (const p of a.get(c) ?? [])
        n.has(p) || (n.add(p), l.push(p));
    }
  }
  let o = 0;
  for (const a of Xn(r)) {
    if (!n.has(a) || t.has(a)) continue;
    const l = s.get(a);
    let c = l.start.getTime();
    for (const d of i.get(a)) {
      const h = s.get(d.source);
      c = Math.max(c, Gn(d, h.start.getTime(), h.end.getTime(), l.duration));
    }
    let p = c;
    if (e?.snapStart && p > l.start.getTime() && (p = e.snapStart(new Date(p)).getTime()), p > l.start.getTime()) {
      const d = p - l.start.getTime();
      l.start = new Date(l.start.getTime() + d), l.end = new Date(l.end.getTime() + d), o++;
    }
  }
  return o;
}
function Si(r, t = "task") {
  const e = t.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9가-힣-]/g, "") || "task", s = new Set(r.tasks.map((n) => n.id));
  if (!s.has(e)) return e;
  let i = 2;
  for (; s.has(`${e}-${i}`); ) i++;
  return `${e}-${i}`;
}
function Jn(r, t = {}) {
  const e = t.name?.trim() || "새 태스크", s = t.durationDays ?? 1, i = t.start ? new Date(t.start) : /* @__PURE__ */ new Date();
  i.setHours(0, 0, 0, 0);
  const n = new Date(i.getTime() + s * D), o = {
    id: Si(r, e === "새 태스크" ? "task" : e),
    name: e,
    start: i,
    end: n,
    duration: n.getTime() - i.getTime(),
    progress: 0
  };
  let a = r.tasks.length;
  if (t.afterId) {
    const l = r.tasks.findIndex((c) => c.id === t.afterId);
    l >= 0 && (a = l + 1);
  }
  return r.tasks.splice(a, 0, o), { task: o, index: a };
}
function Qn(r, t, e, s) {
  const i = r.links.find((n) => n.source === t && n.target === e);
  return i ? (i.type = s, !0) : !1;
}
function Ns(r, t, e) {
  const s = r.links.length;
  return r.links = r.links.filter((i) => !(i.source === t && i.target === e)), r.links.length < s;
}
function Y(r, t) {
  return r.tasks.some((e) => e.parentId === t);
}
function Zn(r, t) {
  const e = new Map(r.tasks.map((i) => [i.id, i])), s = (i) => {
    let n = i.parentId;
    const o = /* @__PURE__ */ new Set();
    for (; n && !o.has(n); ) {
      if (o.add(n), t.has(n)) return !0;
      n = e.get(n)?.parentId;
    }
    return !1;
  };
  return r.tasks.filter((i) => !s(i));
}
const us = 7;
function Bt(r, t) {
  const e = new Map(r.tasks.map((o) => [o.id, o]));
  let s = 1, i = e.get(t)?.parentId;
  const n = /* @__PURE__ */ new Set();
  for (; i && !n.has(i); )
    n.add(i), s++, i = e.get(i)?.parentId;
  return s;
}
function fs(r, t, e) {
  if (!e) return !0;
  const s = Bt(r, t);
  let i = 1;
  for (const n of dt(r, t)) i = Math.max(i, Bt(r, n) - s + 1);
  return Bt(r, e) + i <= us;
}
function tr(r, t) {
  const e = r.tasks.findIndex((n) => n.id === t);
  if (e <= 0) return !1;
  const s = r.tasks[e - 1], i = r.tasks[e];
  return s.id === i.parentId || s.id === i.id || !fs(r, t, s.id) ? !1 : (i.parentId = s.id, !0);
}
function er(r, t) {
  const e = r.tasks.find((i) => i.id === t);
  if (!e || !e.parentId) return !1;
  const s = r.tasks.find((i) => i.id === e.parentId);
  return e.parentId = s?.parentId, !0;
}
function dt(r, t) {
  const e = /* @__PURE__ */ new Map();
  for (const n of r.tasks)
    n.parentId && (e.get(n.parentId) ?? e.set(n.parentId, []).get(n.parentId)).push(n.id);
  const s = /* @__PURE__ */ new Set(), i = [t];
  for (; i.length; ) {
    const n = i.pop();
    if (!s.has(n)) {
      s.add(n);
      for (const o of e.get(n) ?? []) i.push(o);
    }
  }
  return s;
}
function sr(r, t, e, s = {}) {
  const i = r.tasks.find((d) => d.id === t);
  if (!i || e === "child" && Bt(r, t) >= us) return null;
  const n = s.name?.trim() || "새 태스크", o = new Date(i.start);
  o.setHours(0, 0, 0, 0);
  const a = new Date(o.getTime() + D), l = {
    id: Si(r, n === "새 태스크" ? "task" : n),
    name: n,
    start: o,
    end: a,
    duration: D,
    progress: 0,
    parentId: e === "child" ? t : i.parentId
  }, c = r.tasks.findIndex((d) => d.id === t);
  let p;
  if (e === "above") p = c;
  else if (e === "child") p = c + 1;
  else {
    const d = dt(r, t);
    let h = c;
    for (let u = c; u < r.tasks.length; u++) d.has(r.tasks[u].id) && (h = u);
    p = h + 1;
  }
  return r.tasks.splice(p, 0, l), { task: l, index: p };
}
function j(r) {
  const t = /* @__PURE__ */ new Map();
  for (const i of r.tasks)
    i.parentId && (t.has(i.parentId) || t.set(i.parentId, []), t.get(i.parentId).push(i));
  if (!t.size) return;
  const e = new Map(r.tasks.map((i) => [i.id, i])), s = r.tasks.filter((i) => t.has(i.id)).map((i) => ({ t: i, d: ir(i.id, e) })).sort((i, n) => n.d - i.d);
  for (const { t: i } of s) {
    const n = t.get(i.id);
    if (!n.length) continue;
    let o = 1 / 0, a = -1 / 0, l = 0, c = 0, p = 0;
    for (const d of n) {
      o = Math.min(o, d.start.getTime()), a = Math.max(a, d.end.getTime());
      const h = Math.max(0, d.end.getTime() - d.start.getTime());
      l += h, c += (d.progress ?? 0) * h, p += d.progress ?? 0;
    }
    i.start = new Date(o), i.locked ? i.duration = i.end.getTime() - i.start.getTime() : (i.end = new Date(a), i.duration = a - o), i.progress = l > 0 ? c / l : p / n.length, i.milestone = void 0, i.open = void 0;
  }
}
function ir(r, t) {
  let e = 1, s = t.get(r)?.parentId;
  const i = /* @__PURE__ */ new Set();
  for (; s && !i.has(s); )
    i.add(s), e++, s = t.get(s)?.parentId;
  return e;
}
function nr(r, t, e, s) {
  if (t === s) return !1;
  const i = r.tasks.find((h) => h.id === t), n = r.tasks.find((h) => h.id === s);
  if (!i || !n) return !1;
  const o = dt(r, t);
  if (o.has(s)) return !1;
  const a = e === "child" ? s : n.parentId ?? null;
  if (!fs(r, t, a)) return !1;
  const l = r.tasks.filter((h) => o.has(h.id)), c = r.tasks.filter((h) => !o.has(h.id));
  i.parentId = a ?? void 0;
  const p = c.findIndex((h) => h.id === s);
  let d;
  if (e === "before")
    d = p;
  else if (e === "child")
    d = p + 1;
  else {
    const h = dt({ ...r, tasks: c }, s);
    let u = p;
    for (let g = p; g < c.length; g++) h.has(c[g].id) && (u = g);
    d = u + 1;
  }
  return c.splice(d, 0, ...l), r.tasks = c, !0;
}
function rr(r) {
  const t = /* @__PURE__ */ new Map();
  for (const e of r.tasks) {
    if (e.milestone) continue;
    const s = e.assignee?.trim() || "미지정", i = t.get(s) ?? { assignee: s, count: 0, totalMs: 0, minStart: 1 / 0, maxEnd: -1 / 0 };
    i.count++, i.totalMs += Math.max(0, e.end.getTime() - e.start.getTime()), i.minStart = Math.min(i.minStart, e.start.getTime()), i.maxEnd = Math.max(i.maxEnd, e.end.getTime()), t.set(s, i);
  }
  return [...t.values()].sort((e, s) => s.totalMs - e.totalMs);
}
function V(r, t) {
  if (r.status) return r.status;
  if ((r.progress ?? 0) >= 1) return "done";
  const s = (a) => new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime(), i = s(t), n = s(r.start);
  return s(r.end) < i ? "overdue" : n <= i ? "progress" : "upcoming";
}
const or = ["upcoming", "progress", "overdue", "hold", "done"];
function ar(r, t, e) {
  const s = " root", i = r.meta.today ?? /* @__PURE__ */ new Date(), n = /* @__PURE__ */ new Map();
  for (const d of r.tasks) {
    const h = d.parentId ?? s;
    n.has(h) || n.set(h, []), n.get(h).push(d);
  }
  const o = (d) => t === "name" ? d.name : t === "start" ? d.start.getTime() : t === "progress" ? d.progress ?? 0 : t === "end" ? d.open ? Number.MAX_SAFE_INTEGER : d.end.getTime() : t === "duration" ? d.open ? Number.MAX_SAFE_INTEGER : d.end.getTime() - d.start.getTime() : or.indexOf(V(d, i)), a = (d, h) => {
    const u = o(d), g = o(h);
    let f;
    return typeof u == "string" || typeof g == "string" ? f = String(u).localeCompare(String(g), "ko") : f = u - g, e === "desc" ? -f : f;
  };
  for (const d of n.values()) d.sort(a);
  const l = [], c = /* @__PURE__ */ new Set(), p = (d) => {
    for (const h of n.get(d) ?? [])
      c.has(h.id) || (c.add(h.id), l.push(h), p(h.id));
  };
  if (p(s), l.length < r.tasks.length)
    for (const d of r.tasks) c.has(d.id) || (c.add(d.id), l.push(d));
  return l;
}
function lr(r, t) {
  const e = new Map(r.tasks.map((i) => [i.id, i])), s = /* @__PURE__ */ new Set();
  for (const i of r.tasks) {
    if (!t(i)) continue;
    s.add(i.id);
    let n = i.parentId;
    const o = /* @__PURE__ */ new Set();
    for (; n && !o.has(n); )
      o.add(n), s.add(n), n = e.get(n)?.parentId;
  }
  return s;
}
const Et = new TextEncoder();
function Ei(r) {
  return r.replace(/[&<>"']/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[t]);
}
function de(r) {
  let t = r + 1, e = "";
  for (; t > 0; ) {
    const s = (t - 1) % 26;
    e = String.fromCharCode(65 + s) + e, t = Math.floor((t - 1) / 26);
  }
  return e;
}
function cr(r, t = {}) {
  const e = r.map((p, d) => {
    const h = d === 0 && t.headerHeight ? ` ht="${t.headerHeight}" customHeight="1"` : "", u = t.outlineLevels?.[d] ?? 0, g = u > 0 ? ` outlineLevel="${Math.min(7, u)}"` : "";
    return `<row r="${d + 1}"${h}${g}>` + p.map((f, b) => {
      const { v: x, st: $ } = typeof f == "object" && f !== null ? { v: f.v, st: f.s } : { v: f, st: void 0 }, m = `${de(b)}${d + 1}`, v = $ != null ? ` s="${$}"` : "";
      return typeof x == "number" && Number.isFinite(x) ? `<c r="${m}"${v} t="n"><v>${x}</v></c>` : `<c r="${m}"${v} t="inlineStr"><is><t xml:space="preserve">${Ei(String(x))}</t></is></c>`;
    }).join("") + "</row>";
  }).join(""), s = t.colWidths?.length ? `<cols>${t.colWidths.map((p, d) => `<col min="${d + 1}" max="${d + 1}" width="${p}" customWidth="1"/>`).join("")}</cols>` : "", i = t.freezeHeader ? '<sheetViews><sheetView workbookViewId="0" showGridLines="false"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>' : "", n = Math.min(7, Math.max(0, ...t.outlineLevels ?? [0])), o = n > 0 ? '<sheetPr><outlinePr summaryBelow="0"/></sheetPr>' : "", a = t.rowHeight || n > 0 ? `<sheetFormatPr${t.rowHeight ? ` defaultRowHeight="${t.rowHeight}" customHeight="1"` : ""}${n > 0 ? ` outlineLevelRow="${n}"` : ""}/>` : "", l = t.autoFilter && r.length ? `<autoFilter ref="A1:${de(r[0].length - 1)}${r.length}"/>` : "", c = t.dataBar && r.length > 1 ? `<conditionalFormatting sqref="${de(t.dataBar.col)}2:${de(t.dataBar.col)}${r.length}"><cfRule type="dataBar" priority="1"><dataBar><cfvo type="num" val="0"/><cfvo type="num" val="100"/><color rgb="${t.dataBar.color ?? "FF8B7CF2"}"/></dataBar></cfRule></conditionalFormatting>` : "";
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">${o}${i}${a}${s}<sheetData>${e}</sheetData>${l}${c}</worksheet>`;
}
const dr = 1, pr = 2, hr = 3, ur = 4, fr = 5, gr = { 완료: 6, 진행: 7, 지연: 8, 예정: 9, 보류: 10 }, mr = 25, br = 26, yr = 27;
function vr(r, t) {
  const e = Math.max(0, Math.min(6, r - 1));
  return (t ? 18 : 11) + e;
}
function xr() {
  const r = (n) => `<fill><patternFill patternType="solid"><fgColor rgb="${n}"/></patternFill></fill>`, t = (n, o, a, l, c = 0) => `<xf xfId="0" fontId="${n}" fillId="${o}" borderId="${a}" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="${l}" vertical="center"${c ? ` indent="${c}"` : ""}/></xf>`, e = (n, o = !1, a = 11) => `<font>${o ? "<b/>" : ""}<sz val="${a}"/><name val="Malgun Gothic"/><color rgb="${n}"/></font>`, s = Array.from({ length: 7 }, (n, o) => t(0, 0, 2, "left", o)).join(""), i = Array.from({ length: 7 }, (n, o) => t(8, 9, 2, "left", o)).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<fonts count="9">
  ${e("FF3F3F46")}
  ${e("FFFFFFFF", !0, 11.5)}
  ${e("FF1F9D6B", !0)}${e("FF4C7CE8", !0)}${e("FFD97742", !0)}${e("FF64707E", !0)}${e("FFC08A2D", !0)}
  ${e("FF8E8E99")}
  ${e("FF3A3560", !0)}
</fonts>
<fills count="10">
  <fill><patternFill patternType="none"/></fill>
  <fill><patternFill patternType="gray125"/></fill>
  <fill><patternFill patternType="none"/></fill>
  ${r("FFEAF8F1")}${r("FFEDF3FE")}${r("FFFDF1E8")}${r("FFF1F4F7")}${r("FFFCF5E4")}
  ${r("FF2F2E45")}${r("FFEFEEFA")}
</fills>
<borders count="3">
  <border><left/><right/><top/><bottom/><diagonal/></border>
  <border><left/><right/><top/><bottom style="medium"><color rgb="FF7C5CFF"/></bottom><diagonal/></border>
  <border><left/><right/><top/><bottom style="thin"><color rgb="FFEFEFF4"/></bottom><diagonal/></border>
</borders>
<cellStyleXfs count="1"><xf/></cellStyleXfs>
<cellXfs count="28">
  <xf xfId="0"/>
  ${t(1, 8, 1, "left")}${t(1, 8, 1, "center")}
  ${t(0, 0, 2, "left")}${t(0, 0, 2, "right")}${t(0, 0, 2, "center")}
  ${t(2, 3, 2, "center")}${t(3, 4, 2, "center")}${t(4, 5, 2, "center")}${t(5, 6, 2, "center")}${t(6, 7, 2, "center")}
  ${s}
  ${i}
  ${t(0, 9, 2, "left")}${t(0, 9, 2, "right")}${t(0, 9, 2, "center")}
</cellXfs>
</styleSheet>`;
}
const wr = (() => {
  const r = new Uint32Array(256);
  for (let t = 0; t < 256; t++) {
    let e = t;
    for (let s = 0; s < 8; s++) e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
    r[t] = e >>> 0;
  }
  return r;
})();
function kr(r) {
  let t = 4294967295;
  for (let e = 0; e < r.length; e++) t = wr[(t ^ r[e]) & 255] ^ t >>> 8;
  return (t ^ 4294967295) >>> 0;
}
function $r(r) {
  const t = [], e = [];
  let s = 0;
  const i = (...p) => {
    const d = p.reduce((f, [, b]) => f + b, 0), h = new Uint8Array(d), u = new DataView(h.buffer);
    let g = 0;
    for (const [f, b] of p)
      b === 2 ? u.setUint16(g, f, !0) : u.setUint32(g, f >>> 0, !0), g += b;
    return h;
  };
  for (const p of r) {
    const d = Et.encode(p.name), h = kr(p.data), u = i(
      [67324752, 4],
      [20, 2],
      [2048, 2],
      [0, 2],
      // sig, version, UTF-8 flag, method=store
      [0, 2],
      [8448, 2],
      // time, date (고정 — 재현 가능한 출력)
      [h, 4],
      [p.data.length, 4],
      [p.data.length, 4],
      [d.length, 2],
      [0, 2]
    );
    t.push(u, d, p.data), e.push(i(
      [33639248, 4],
      [20, 2],
      [20, 2],
      [2048, 2],
      [0, 2],
      [0, 2],
      [8448, 2],
      [h, 4],
      [p.data.length, 4],
      [p.data.length, 4],
      [d.length, 2],
      [0, 2],
      [0, 2],
      [0, 2],
      [0, 2],
      [0, 4],
      [s, 4]
    ), d), s += u.length + d.length + p.data.length;
  }
  const n = e.reduce((p, d) => p + d.length, 0), o = i(
    [101010256, 4],
    [0, 2],
    [0, 2],
    [r.length, 2],
    [r.length, 2],
    [n, 4],
    [s, 4],
    [0, 2]
  ), a = s + n + o.length, l = new Uint8Array(a);
  let c = 0;
  for (const p of [...t, ...e, o])
    l.set(p, c), c += p.length;
  return l;
}
function Sr(r, t = "Sheet1", e = {}) {
  const s = Ei(t.replace(/[[\]:*?/\\]/g, " ").trim().slice(0, 31) || "Sheet1"), i = [
    {
      name: "[Content_Types].xml",
      data: Et.encode(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`)
    },
    {
      name: "_rels/.rels",
      data: Et.encode(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`)
    },
    {
      name: "xl/workbook.xml",
      data: Et.encode(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${s}" sheetId="1" r:id="rId1"/></sheets></workbook>`)
    },
    {
      name: "xl/_rels/workbook.xml.rels",
      data: Et.encode(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`)
    },
    { name: "xl/styles.xml", data: Et.encode(xr()) },
    { name: "xl/worksheets/sheet1.xml", data: Et.encode(cr(r, e)) }
  ];
  return $r(i);
}
function Ve(r, t, e = /* @__PURE__ */ new Date()) {
  const s = new Date(r, t, 1), i = new Date(r, t, 1 - s.getDay()), n = q(e), o = [];
  for (let a = 0; a < 42; a++) {
    const l = new Date(i.getFullYear(), i.getMonth(), i.getDate() + a);
    o.push({
      date: l,
      inMonth: l.getMonth() === t,
      isToday: q(l) === n,
      iso: q(l)
    });
  }
  return o;
}
const Er = ["일", "월", "화", "수", "목", "금", "토"];
function Lr(r, t) {
  const e = t.today ?? /* @__PURE__ */ new Date();
  let s = new Date((t.value ?? e).getFullYear(), (t.value ?? e).getMonth(), 1);
  const i = t.value ? q(t.value) : null, n = () => {
    const o = Ve(s.getFullYear(), s.getMonth(), e);
    r.innerHTML = `
      <div class="cal-head">
        <button class="cal-nav" data-nav="-12" title="이전 해">«</button>
        <button class="cal-nav" data-nav="-1" title="이전 달">‹</button>
        <span class="cal-title">${s.getFullYear()}년 ${s.getMonth() + 1}월</span>
        <button class="cal-nav" data-nav="1" title="다음 달">›</button>
        <button class="cal-nav" data-nav="12" title="다음 해">»</button>
      </div>
      <div class="cal-grid">
        ${Er.map((a, l) => `<span class="cal-wd${l === 0 ? " sun" : l === 6 ? " sat" : ""}">${a}</span>`).join("")}
        ${o.map((a) => {
      const l = ["cal-day"];
      a.inMonth || l.push("dim"), a.isToday && l.push("today"), i && a.iso === i && l.push("sel");
      const c = a.date.getDay();
      return c === 0 && l.push("sun"), c === 6 && l.push("sat"), `<button class="${l.join(" ")}" data-iso="${a.iso}">${a.date.getDate()}</button>`;
    }).join("")}
      </div>
      <div class="cal-foot">
        <button class="cal-preset" data-preset="today">오늘</button>
        <button class="cal-preset" data-preset="+7">+1주</button>
        <button class="cal-preset" data-preset="+30">+1개월</button>
        <button class="cal-preset" data-preset="+90">+3개월</button>
      </div>
    `, r.querySelectorAll(".cal-nav").forEach((a) => a.addEventListener("click", (l) => {
      l.stopPropagation(), s = new Date(s.getFullYear(), s.getMonth() + Number(a.dataset.nav), 1), n();
    })), r.querySelectorAll(".cal-day").forEach((a) => a.addEventListener("click", (l) => {
      l.stopPropagation();
      const [c, p, d] = a.dataset.iso.split("-").map(Number);
      t.onPick(new Date(c, p - 1, d));
    })), r.querySelectorAll(".cal-preset").forEach((a) => a.addEventListener("click", (l) => {
      l.stopPropagation();
      const c = a.dataset.preset, p = new Date(e.getFullYear(), e.getMonth(), e.getDate()), d = c === "today" ? p : new Date(p.getTime() + Number(c) * 864e5);
      t.onPick(d);
    }));
  };
  return n(), () => {
    r.innerHTML = "";
  };
}
const Tr = `
.cal-pop {
  position: absolute; z-index: 60; width: 252px;
  background: var(--plot-surface); border: 1px solid var(--plot-border);
  border-radius: 10px; box-shadow: 0 14px 40px rgba(0,0,0,0.2);
  padding: 10px; animation: pop-in 140ms cubic-bezier(0.32,0.72,0,1);
}
.cal-head { display: flex; align-items: center; gap: 2px; margin-bottom: 6px; }
.cal-title { flex: 1; text-align: center; font-size: 12.5px; font-weight: 700; color: var(--plot-text); }
.cal-nav {
  width: 22px; height: 22px; border: 0; background: transparent; border-radius: 5px;
  color: var(--plot-text-mute); cursor: pointer; font-size: 13px; line-height: 1;
}
.cal-nav:hover { background: var(--plot-select); color: var(--plot-text); }
.cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; }
.cal-wd { text-align: center; font-size: 10px; font-weight: 700; color: var(--plot-text-mute); padding: 3px 0; }
.cal-day {
  height: 26px; border: 0; background: transparent; border-radius: 6px;
  font-size: 11.5px; color: var(--plot-text); cursor: pointer; font-variant-numeric: tabular-nums;
}
.cal-day:hover { background: var(--plot-select); }
.cal-day.dim { color: var(--plot-text-mute); opacity: 0.45; }
.cal-day.today { box-shadow: inset 0 0 0 1.5px var(--plot-bar-fill); font-weight: 700; }
.cal-day.sel { background: var(--plot-bar-fill); color: #fff; font-weight: 700; }
.cal-day.sun:not(.sel) { color: #e5484d; } .cal-day.sun.dim { color: #e5484d; opacity: 0.35; }
.cal-day.sat:not(.sel) { color: #2563eb; } .cal-day.sat.dim { color: #2563eb; opacity: 0.35; }
.cal-wd.sun { color: #e5484d; } .cal-wd.sat { color: #2563eb; }
.cal-foot { display: flex; gap: 4px; margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--plot-border); }
.cal-preset {
  flex: 1; border: 1px solid var(--plot-border); background: transparent; border-radius: 6px;
  font-size: 10.5px; color: var(--plot-text-mute); cursor: pointer; padding: 4px 0;
}
.cal-preset:hover { border-color: var(--plot-bar-fill); color: var(--plot-text); }
`, Mr = /^(~|null|true|false|yes|no|on|off)$/i, Dr = /^[-+]?(\d[\d_]*(\.[\d_]*)?|\.[\d_]+|0[xXoObB][\dA-Fa-f_]+|\.(inf|Inf|INF|nan|NaN|NAN))([eE][-+]?\d+)?$/;
function ut(r) {
  return r === "" || /[\n\r\t:#\-?&*!|>'"%@`{}[\],]|^\s|\s$/.test(r) || Mr.test(r) || Dr.test(r) ? JSON.stringify(r) : r;
}
function Li(r, t, e, s) {
  const i = "  ".repeat(s + 2), n = [];
  n.push(`${i}- id: ${ut(r.id)}`), n.push(`${i}  name: ${ut(r.name)}`);
  const o = e.get(r.id);
  o ? n.push(`${i}  after: ${ut(o)}`) : n.push(`${i}  start: ${q(r.start)}`), r.milestone ? n.push(`${i}  milestone: true`) : r.open ? n.push(`${i}  open: true`) : n.push(`${i}  end: ${q(r.end)}`), r.assignee && n.push(`${i}  assignee: ${ut(r.assignee)}`), r.progress && n.push(`${i}  progress: ${r.progress}`), r.status && n.push(`${i}  status: ${r.status}`), r.color && n.push(`${i}  color: ${ut(r.color)}`), r.note && n.push(`${i}  note: ${ut(r.note)}`), r.critical && n.push(`${i}  critical: true`), r.locked && n.push(`${i}  locked: true`), r.baselineStart && r.baselineEnd && n.push(`${i}  baseline: { start: ${q(r.baselineStart)}, end: ${q(r.baselineEnd)} }`);
  const a = t.get(r.id) ?? [];
  if (a.length) {
    n.push(`${i}  children:`);
    for (const l of a) n.push(...Li(l, t, e, s + 1));
  }
  return n;
}
function Ar(r) {
  const t = ["gantt:"], e = r.meta;
  e.title && t.push(`  title: ${ut(e.title)}`), e.today && t.push(`  today: ${q(e.today)}`), e.workdays?.length && t.push(`  workdays: [${e.workdays.join(", ")}]`), e.holidays?.length && t.push(`  holidays: [${e.holidays.map(q).join(", ")}]`), e.scale && t.push(`  scale: ${e.scale}`);
  const s = new Map(r.tasks.map((c) => [c.id, c])), i = /* @__PURE__ */ new Map();
  for (const c of r.links)
    i.has(c.target) || i.set(c.target, []), i.get(c.target).push(c);
  const n = /* @__PURE__ */ new Map(), o = [];
  for (const c of r.tasks) {
    const p = i.get(c.id) ?? [], d = p.length === 1 ? p[0] : null, h = d ? s.get(d.source) : null;
    d && h && d.type === "FS" && !d.lag && h.end.getTime() === c.start.getTime() ? n.set(c.id, d.source) : o.push(...p);
  }
  const a = /* @__PURE__ */ new Map(), l = [];
  for (const c of r.tasks)
    c.parentId && s.has(c.parentId) ? (a.has(c.parentId) || a.set(c.parentId, []), a.get(c.parentId).push(c)) : l.push(c);
  t.push("  tasks:");
  for (const c of l) t.push(...Li(c, a, n, 0));
  if (o.length) {
    t.push("  links:");
    for (const c of o) {
      const p = c.lag ? `, lag: ${Math.round(c.lag / D * 10) / 10}d` : "";
      t.push(`    - { source: ${ut(c.source)}, target: ${ut(c.target)}, type: ${c.type}${p} }`);
    }
  }
  return t.join(`
`) + `
`;
}
const Cr = 34, Mt = 22, Ti = 32, Mi = Mt + Ti, Nr = 300, bt = 6, Ir = 150, Is = 10, Or = 50, Os = [
  { key: "status", label: "상태", width: 44 },
  { key: "name", label: "태스크", width: 176 },
  { key: "assignee", label: "담당자", width: 52 },
  { key: "duration", label: "기간", width: 122 },
  { key: "days", label: "일수", width: 44 },
  { key: "progress", label: "진척률", width: 44 }
], Pr = [
  { key: "status", label: "상태", width: 60 },
  { key: "name", label: "태스크", width: 280 },
  { key: "assignee", label: "담당자", width: 120 },
  { key: "start", label: "시작", width: 128 },
  { key: "end", label: "종료", width: 128 },
  { key: "duration", label: "기간", width: 168 },
  { key: "days", label: "일수", width: 56 },
  { key: "progress", label: "진척률", width: 96 }
], Xe = 26, Be = [
  { key: "name", label: "태스크" },
  { key: "status", label: "상태" },
  { key: "assignee", label: "담당자" },
  { key: "duration", label: "기간" },
  { key: "days", label: "일수" },
  { key: "start", label: "시작" },
  { key: "end", label: "종료" },
  { key: "progress", label: "진척률" }
], Ps = { day: 40, week: 20, month: 8 }, pe = {
  done: "#5ec79b",
  progress: "#82a8f4",
  overdue: "#f09a6c",
  upcoming: "#9aa7b4",
  hold: "#f3c06b"
}, et = {
  done: "완료",
  progress: "진행",
  overdue: "지연",
  upcoming: "예정",
  hold: "보류"
};
function Vt(r) {
  let t = 0;
  for (const e of r) t = (t * 31 + e.charCodeAt(0)) % 360;
  return t;
}
const qr = { name: "이름", start: "시작일", progress: "진척", end: "종료일", duration: "기간", status: "상태" }, Fr = {
  name: "name",
  progress: "progress",
  duration: "duration",
  start: "start",
  end: "end",
  status: "status"
};
function je(r) {
  return r >= 28 ? "day" : r >= 11 ? "week" : "month";
}
function zr(r) {
  return `<svg viewBox="0 0 14 14" width="12.5" height="12.5" aria-hidden="true"><path d="${r ? "M4.1 6 V4.3 a2.9 2.9 0 0 1 5.8 0 V6" : "M4.1 6 V4.3 a2.9 2.9 0 0 1 5.5 -1.15"}" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><rect x="2.7" y="6" width="8.6" height="6.3" rx="1.5" fill="currentColor"/></svg>`;
}
const Re = `
:host {
  display: block;
  color-scheme: light;
  --plot-bar: #7c5cff;
  --plot-bar-fill: #5b3ee0;
  --plot-critical: #e5484d;
  --plot-critical-fill: #b91c1c;
  --plot-milestone: #f3c06b;
  --plot-today: #ef4444;
  --plot-weekend: rgba(0, 0, 0, 0.035);
  --plot-holiday: rgba(229, 72, 77, 0.06);
  --plot-grid: rgba(0, 0, 0, 0.06);
  --plot-arrow: #b8b8c0;
  --plot-arrow-critical: var(--plot-critical);
  --plot-select: rgba(124, 92, 255, 0.10);
  --plot-accent: #0891b2;
  --plot-accent-glow: rgba(8, 145, 178, 0.35);
  --plot-row-hover: rgba(0, 0, 0, 0.06);
  --plot-subtree: rgba(124, 92, 255, 0.05);
  --plot-hover-soft: rgba(0, 0, 0, 0.06);
  --plot-text: #18181b;
  --plot-text-mute: #71717a;
  --plot-surface: #ffffff;
  --plot-surface-2: #fcfcfc;
  --plot-border: rgba(0, 0, 0, 0.08);
  --plot-scrollbar: rgba(24, 24, 27, 0.3);
  --plot-scrollbar-hover: rgba(24, 24, 27, 0.5);
  --plot-font: -apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", sans-serif;
  font-family: var(--plot-font);
  color: var(--plot-text);
  background: var(--plot-surface);
  border: 1px solid var(--plot-border);
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
}
/* ── 다크 토큰 (theme=dark 또는 auto+시스템다크). WCAG 4.5:1 확보한 색값. ── */
:host([theme="dark"]), :host([theme="auto"]) {
  color-scheme: dark;
  --plot-bar: #a78bfa; --plot-bar-fill: #8b73ff;
  --plot-critical: #f87171; --plot-critical-fill: #ef4444;
  --plot-milestone: #f7d391; --plot-today: #f87171;
  --plot-weekend: rgba(255,255,255,0.045); --plot-holiday: rgba(248,113,113,0.12);
  --plot-grid: rgba(255,255,255,0.08); --plot-arrow: #7a7a86;
  --plot-select: rgba(167,139,250,0.20); --plot-accent: #22d3ee; --plot-accent-glow: rgba(34,211,238,0.40); --plot-row-hover: rgba(255,255,255,0.09);
  --plot-subtree: rgba(167,139,250,0.12); --plot-hover-soft: rgba(255,255,255,0.08);
  --plot-text: #f4f4f5; --plot-text-mute: #a1a1aa;
  --plot-surface: #1a1a1f; --plot-surface-2: #202027; --plot-border: rgba(255,255,255,0.12);
  --plot-scrollbar: rgba(255,255,255,0.28); --plot-scrollbar-hover: rgba(255,255,255,0.48);
}
/* theme=auto 는 시스템이 라이트면 다크 토큰을 되돌린다 (light 재선언) */
@media (prefers-color-scheme: light) {
  :host([theme="auto"]) {
    color-scheme: light;
    --plot-bar: #7c5cff; --plot-bar-fill: #5b3ee0;
    --plot-critical: #e5484d; --plot-critical-fill: #b91c1c;
    --plot-milestone: #f3c06b; --plot-today: #ef4444;
    --plot-weekend: rgba(0,0,0,0.035); --plot-holiday: rgba(229,72,77,0.06);
    --plot-grid: rgba(0,0,0,0.06); --plot-arrow: #b8b8c0;
    --plot-select: rgba(124,92,255,0.10); --plot-accent: #0891b2; --plot-accent-glow: rgba(8,145,178,0.35); --plot-row-hover: rgba(0,0,0,0.06);
    --plot-subtree: rgba(124,92,255,0.05); --plot-hover-soft: rgba(0,0,0,0.06);
    --plot-text: #18181b; --plot-text-mute: #71717a;
    --plot-surface: #ffffff; --plot-surface-2: #fcfcfc; --plot-border: rgba(0,0,0,0.08);
    --plot-scrollbar: rgba(24,24,27,0.3); --plot-scrollbar-hover: rgba(24,24,27,0.5);
  }
}
/* 다크에서 상태색 밝게 (바 --bar-c, 도트, 배지) */
:host([theme="dark"]) .bar.st-done, :host([theme="auto"]) .bar.st-done { --bar-c: #82dcb8; }
:host([theme="dark"]) .bar.st-progress, :host([theme="auto"]) .bar.st-progress { --bar-c: #a7c0f8; }
:host([theme="dark"]) .bar.st-overdue, :host([theme="auto"]) .bar.st-overdue { --bar-c: #f6b58e; }
:host([theme="dark"]) .bar.st-upcoming, :host([theme="auto"]) .bar.st-upcoming { --bar-c: #b3bec9; }
:host([theme="dark"]) .bar.st-hold, :host([theme="auto"]) .bar.st-hold { --bar-c: #f7d391; }
@media (prefers-color-scheme: light) {
  :host([theme="auto"]) .bar.st-done { --bar-c: #5ec79b; }
  :host([theme="auto"]) .bar.st-progress { --bar-c: #82a8f4; }
  :host([theme="auto"]) .bar.st-overdue { --bar-c: #f09a6c; }
  :host([theme="auto"]) .bar.st-upcoming { --bar-c: #9aa7b4; }
  :host([theme="auto"]) .bar.st-hold { --bar-c: #f3c06b; }
}
:host(.dragging-any), :host(.dragging-any) * { user-select: none !important; }
:host(.linking) { cursor: crosshair; }
* { box-sizing: border-box; }

/* absolute 오버레이(컨텍스트 메뉴·드로어·드래그팁)의 기준 좌표계 — relative 필수 */
.root { position: relative; display: grid; grid-template-rows: 40px 1fr auto; height: 100%; min-height: 260px; }

/* ── 툴바 ── */
.toolbar {
  display: flex; align-items: center; gap: 3px;
  padding: 7px 12px;
  border-bottom: 1px solid var(--plot-border);
  background: var(--plot-surface);
  font-size: 11.5px;
  overflow-x: auto; scrollbar-width: none;   /* 좁으면 줄바꿈 대신 내부 스크롤 */
}
.toolbar::-webkit-scrollbar { display: none; }
/* 툴바 그룹 — 박스 없이 투명 flex 묶음. 시각 구분은 얇은 세로선(.tb-div)으로만. */
.tb-sec {
  display: flex; align-items: center; gap: 2px; flex: none;
}
/* 그룹 구분선 — 박스 대신 1px 저대비 세로선 */
.tb-div {
  width: 1px; height: 16px; flex: none; margin: 0 5px;
  background: var(--plot-border);
}
.tb-cap { display: none; }
/* 정보 칩 — 라벨+숫자로 정체를 분명히 */
.tb-chip {
  display: inline-flex; align-items: center; gap: 3px; flex: none;
  height: 20px; padding: 0 7px; border-radius: 999px;
  background: var(--plot-hover-soft); color: var(--plot-text-mute);
  font-size: 10.5px; font-weight: 600;
}
.tb-chip b { color: var(--plot-text); font-weight: 800; font-variant-numeric: tabular-nums; }
.tb-chip.sel { background: var(--plot-select); color: var(--plot-bar-fill); }
.tb-chip.sel b { color: var(--plot-bar-fill); }
.tb-chip.err { background: rgba(229,72,77,0.12); color: var(--plot-critical); }
.tb-chip.err b { color: var(--plot-critical); }
/* 범례 — 차트 우상단 오버레이 칩 */
/* ── 뷰 스위처 탭 ── */
/* 뷰 전환 = 언더라인 탭 (박스 컨테이너 제거 — 툴바 안 '박스 속 박스' 방지) */
.tb-views { display: inline-flex; gap: 1px; flex: none; margin-right: 8px; align-self: stretch; }
.tb-view { position: relative; display: inline-flex; align-items: center; gap: 5px; border: 0; background: transparent; border-radius: 6px; padding: 5px 10px; font-size: 12px; font-weight: 700; color: var(--plot-text-mute); cursor: pointer; transition: background 0.14s, color 0.14s; }
.tb-view svg { flex: none; opacity: 0.6; transition: opacity 0.14s; }
.tb-view:hover { color: var(--plot-text); background: var(--plot-hover-soft); }
.tb-view:hover svg { opacity: 0.9; }
.tb-view.on { color: var(--plot-bar-fill); }
.tb-view.on svg { opacity: 1; }
.tb-view.on::after { content: ''; position: absolute; left: 8px; right: 8px; bottom: -1px; height: 2px; border-radius: 2px 2px 0 0; background: var(--plot-bar-fill); }
.view-empty { display: flex; align-items: center; justify-content: center; height: 100%; color: var(--plot-text-mute); font-size: 13px; }

/* 간트 외 뷰: body의 간트용 grid(좌측·스플리터·차트) 해제 → 전체 폭 사용 */
.body.view-list, .body.view-board, .body.view-calendar { display: block; }
/* ── List 뷰: 좌측 리스트만 전체폭·자체 스크롤 ── */
.body.view-list .left { width: 100%; height: 100%; overflow-y: auto; }
.body.view-list .left-canvas { transform: none !important; }
/* 리스트 뷰: 태스크명 컬럼이 남은 폭을 채워 우측 여백 제거 */
.body.view-list .cell-name, .body.view-list .col-cell.col-name { flex: 1 1 auto !important; width: auto !important; min-width: 180px; }
.body.view-list .left-header, .body.view-list .task-row, .body.view-list .group-row { width: 100%; }

/* ── Board 뷰 (칸반) ── */
.board { display: flex; gap: 12px; height: 100%; overflow-x: auto; padding: 12px; box-sizing: border-box; }
.board-col { flex: 1 1 0; min-width: 232px; display: flex; flex-direction: column; background: var(--plot-surface-2); border: 1px solid var(--plot-border); border-radius: 12px; max-height: 100%; }
.board-head { display: flex; align-items: center; gap: 7px; padding: 11px 13px; font-size: 12.5px; font-weight: 700; color: var(--plot-text); border-bottom: 1px solid var(--plot-border); }
.board-head .st-dot { box-shadow: none; }
.board-title { flex: 1; }
.board-count { font-size: 11px; font-weight: 700; color: var(--plot-text-mute); background: var(--plot-hover-soft); border-radius: 999px; min-width: 20px; text-align: center; padding: 1px 6px; }
.board-cards { flex: 1; overflow-y: auto; padding: 8px; display: flex; flex-direction: column; gap: 8px; }
.board-cards::-webkit-scrollbar { width: 3px; }
.board::-webkit-scrollbar { height: 3px; }
.board-card { background: var(--plot-surface); border: 1px solid var(--plot-border); border-radius: 10px; padding: 10px 11px; cursor: pointer; transition: border-color 0.12s, box-shadow 0.12s, transform 0.12s; }
.board-card { cursor: grab; }
.board-card:hover { border-color: var(--plot-bar-fill); box-shadow: 0 3px 12px rgba(0,0,0,0.08); transform: translateY(-1px); }
.board-card.dragging { opacity: 0.4; cursor: grabbing; }
.board-col.drop-over { background: var(--plot-select); }
.board-col.drop-over .board-cards { outline: 2px dashed var(--plot-bar-fill); outline-offset: -4px; border-radius: 8px; }
.bc-name { font-size: 13px; font-weight: 600; color: var(--plot-text); line-height: 1.35; margin-bottom: 6px; }
.bc-meta { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 11px; color: var(--plot-text-mute); font-variant-numeric: tabular-nums; }
.bc-pct { font-weight: 700; color: var(--plot-bar-fill); }
.bc-asg { margin-top: 8px; }
.board-empty-col { color: var(--plot-text-mute); font-size: 11px; text-align: center; padding: 14px 0; opacity: 0.6; }

/* ── Calendar 뷰 ── */
.calv { display: flex; flex-direction: column; height: 100%; padding: 12px; box-sizing: border-box; }
.calv-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.calv-title { font-size: 15px; font-weight: 800; color: var(--plot-text); }
.calv-nav { display: flex; gap: 4px; }
.calv-nav button { border: 1px solid var(--plot-border); background: var(--plot-surface); border-radius: 7px; padding: 5px 11px; font-size: 12px; font-weight: 600; color: var(--plot-text-mute); cursor: pointer; }
.calv-nav button:hover { border-color: var(--plot-bar-fill); color: var(--plot-text); }
.calv-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
.calv-wds { border-bottom: 1px solid var(--plot-border); }
.calv-wd { text-align: center; font-size: 11px; font-weight: 700; color: var(--plot-text-mute); padding: 6px 0; }
.calv-wd.sun { color: #e5484d; } .calv-wd.sat { color: #2563eb; }
/* 주 단위 연속 스팬 바 */
.calv-weeks { flex: 1; display: flex; flex-direction: column; border: 1px solid var(--plot-border); border-top: 0; border-radius: 0 0 10px 10px; overflow-y: auto; }
.cw { flex: 1 0 auto; min-height: 88px; display: flex; flex-direction: column; border-bottom: 1px solid var(--plot-grid); }
.cw:last-child { border-bottom: 0; }
.cw-dates { display: grid; grid-template-columns: repeat(7, 1fr); }
.cw-date { text-align: right; padding: 3px 6px 1px; font-size: 11.5px; font-weight: 600; color: var(--plot-text); font-variant-numeric: tabular-nums; border-right: 1px solid var(--plot-grid); }
.cw-date:last-child { border-right: 0; }
.cw-date.dim { color: var(--plot-text-mute); opacity: 0.45; }
.cw-date.today { color: #fff; }
.cw-date.today::after { content: ''; }
.cw-date.today { background: linear-gradient(transparent 0, transparent 100%); }
.cw-date.sun:not(.today) { color: #e5484d; } .cw-date.sat:not(.today) { color: #2563eb; }
.cw-bars { flex: 1; display: grid; grid-template-columns: repeat(7, 1fr); grid-auto-rows: 20px; gap: 2px; padding: 2px 3px 4px; overflow: hidden; align-content: start; }
.cw-bar {
  border-radius: 0; padding: 0 7px; font-size: 10.5px; font-weight: 600; line-height: 18px;
  color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer;
  opacity: 0.92; transition: opacity 0.12s, transform 0.12s;
}
.cw-bar:hover { opacity: 1; transform: translateY(-1px); }
.cw-bar.rs { border-radius: 5px 0 0 5px; } .cw-bar.re { border-radius: 0 5px 5px 0; } .cw-bar.rs.re { border-radius: 5px; }
.cw-more {
  border: 0; background: var(--plot-select); color: var(--plot-bar-fill);
  font-size: 10px; font-weight: 800; cursor: pointer; padding: 0; text-align: center;
  border-radius: 999px; height: 17px; min-width: 26px; justify-self: start; align-self: center; margin-left: 3px;
}
.cw-more:hover { filter: brightness(0.95); box-shadow: 0 0 0 2px var(--plot-select); }
.cell-pop.day-pop { width: 200px; max-height: 320px; overflow-y: auto; }

.gantt-footer {
  display: flex; align-items: center; justify-content: flex-end; gap: 14px;
  height: 26px; padding: 0 14px; flex: none;
  border-top: 1px solid var(--plot-border); background: var(--plot-surface-2);
}
.gantt-search {
  display: inline-flex; align-items: center; gap: 5px; flex: none;
  background: var(--plot-hover-soft); border: 1px solid transparent;
  border-radius: 7px; padding: 0 9px; height: 26px;
  transition: background 0.12s, border-color 0.12s;
}
.gantt-search:focus-within { background: var(--plot-surface); border-color: var(--plot-bar-fill); }
.gantt-search .i-search { color: var(--plot-text-mute); font-size: 12px; }
.gantt-search .search-input { border: 0; background: transparent; outline: none; font: inherit; font-size: 11.5px; color: var(--plot-text); width: 84px; }
.gantt-search .search-count { font-size: 10px; font-weight: 700; color: #fff; background: var(--plot-bar-fill); border-radius: 999px; padding: 0 5px; }
.task-row.search-hit { background: rgba(245,197,24,0.18); box-shadow: inset 2px 0 0 #f5c518; }
.task-row.search-dim, .bar.search-dim { opacity: 0.32; }
/* 커스텀 셀렉트(필터 트리거) — 네이티브 select 대체 */
.tb-select {
  display: inline-flex; align-items: center; gap: 5px; flex: none;
  height: 26px; padding: 0 9px; border: 1px solid transparent; border-radius: 7px;
  background: transparent; color: var(--plot-text); font: inherit; font-size: 11px; cursor: pointer;
  transition: background 0.12s, color 0.12s;
}
.tb-select:hover { background: var(--plot-hover-soft); }
.tb-select .ts-lab { color: var(--plot-text-mute); font-weight: 600; }
.tb-select .ts-val { font-weight: 700; max-width: 72px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tb-select .ts-car { color: var(--plot-text-mute); font-size: 8px; }
.tb-select.on { background: var(--plot-select); }
.tb-select.on .ts-val, .tb-select.on .ts-car { color: var(--plot-bar-fill); }
/* 드롭다운 메뉴 (필터) */
.cell-pop.menu-pop { width: 188px; padding: 6px; }
.mi {
  display: flex; align-items: center; gap: 8px; width: 100%;
  border: 0; background: transparent; border-radius: 7px; padding: 7px 9px;
  font-size: 12px; font-weight: 600; color: var(--plot-text); cursor: pointer; text-align: left;
}
.mi:hover { background: var(--plot-select); }
.mi.on { color: var(--plot-bar-fill); }
.mi .mi-chk { margin-left: auto; color: var(--plot-bar-fill); font-weight: 800; }
.mi .mi-ic { width: 16px; text-align: center; color: var(--plot-text-mute); }
.mi .mi-av { width: 16px; height: 16px; font-size: 8px; }
.mi .st-dot { box-shadow: none; }
/* ⚙ 설정 레이어 */
.cell-pop.settings-pop { width: 300px; max-width: 300px; }
.cell-pop .cp-x {
  border: 0; background: transparent; cursor: pointer; color: var(--plot-text-mute);
  font-size: 12px; width: 22px; height: 22px; border-radius: 6px; flex: none;
  display: inline-flex; align-items: center; justify-content: center; padding: 0; font-family: inherit;
}
.cell-pop .cp-x:hover { background: var(--plot-select); color: var(--plot-text); }
.set-row {
  display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%;
  border: 0; background: transparent; border-radius: 8px; padding: 7px 8px;
  font-size: 12px; font-weight: 600; color: var(--plot-text); cursor: pointer; text-align: left;
}
.set-row:hover { background: var(--plot-hover-soft); }
.set-txt { display: flex; flex-direction: column; gap: 2px; }
.set-desc { font-size: 10px; font-weight: 500; color: var(--plot-text-mute); }
.set-sw {
  width: 30px; height: 17px; border-radius: 999px; background: var(--plot-border);
  position: relative; flex: none; transition: background 0.15s;
}
.set-sw::after {
  content: ''; position: absolute; top: 2px; left: 2px; width: 13px; height: 13px;
  border-radius: 50%; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.25);
  transition: transform 0.15s cubic-bezier(0.32,0.72,0,1);
}
.set-sw.on { background: var(--plot-bar-fill); }
.set-sw.on::after { transform: translateX(13px); }
.set-sect { font-size: 10px; font-weight: 800; color: var(--plot-text-mute); letter-spacing: 0.08em; margin: 10px 4px 5px; }
.set-seg { display: flex; gap: 4px; }
.set-seg button {
  flex: 1; border: 1px solid var(--plot-border); background: var(--plot-surface);
  border-radius: 7px; padding: 6px 0; font-size: 11px; font-weight: 600; color: var(--plot-text-mute); cursor: pointer;
}
.set-seg button:hover { border-color: var(--plot-text-mute); }
.set-seg button.on { border-color: var(--plot-bar-fill); color: var(--plot-bar-fill); background: var(--plot-select); }
.set-cols { display: grid; grid-template-columns: 1fr 1fr; }
/* 트리 접기/펼치기 팝오버 — 실행 버튼들 (선택 상태 없음, 누르면 즉시 적용·팝오버 유지) */
.depth-pop { min-width: 196px; }
.depth-actions { display: flex; gap: 6px; }
.depth-actions button {
  flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  height: 30px; border: 1px solid var(--plot-border); border-radius: 7px;
  background: var(--plot-surface); color: var(--plot-text); font-size: 11.5px; font-weight: 600;
  cursor: pointer; font-family: inherit; transition: background 0.1s, border-color 0.1s, transform 0.05s;
}
.depth-actions button:hover { border-color: var(--plot-bar-fill); color: var(--plot-bar-fill); }
.depth-actions button:active { transform: scale(0.96); background: var(--plot-select); }
.depth-actions .depth-glyph { color: currentColor; }
/* 단계 칩 — 항상 한 줄 (인라인 grid-template-columns: repeat(N,1fr)) */
.depth-lvls { display: grid; gap: 5px; }
.depth-lvl {
  display: inline-flex; align-items: center; justify-content: center; height: 30px; padding: 0;
  border: 1px solid var(--plot-border); border-radius: 7px;
  background: var(--plot-surface); color: var(--plot-text); font-size: 12.5px; font-weight: 800;
  cursor: pointer; font-family: inherit; transition: background 0.1s, border-color 0.1s, transform 0.05s;
}
.depth-lvl:hover { border-color: var(--plot-bar-fill); color: var(--plot-bar-fill); }
.depth-lvl:active { transform: scale(0.94); background: var(--plot-select); }
.depth-pop .set-sect { display: flex; align-items: center; gap: 6px; }
.depth-pop .set-sect .depth-glyph { color: var(--plot-text-mute); }

/* 도움말 팝오버 */
/* .cell-pop.help-pop 로 specificity 를 올려 공통 .cell-pop{max-width:284px} 의 클램프를 이김
   (안 그러면 460px 도움말이 284px 로 짓눌려 단축키 표가 좁게 렌더 = '도움말 작게 보임') */
.cell-pop.help-pop { width: 760px; max-width: min(760px, calc(100vw - 24px)); max-height: calc(100dvh - 40px); overflow-y: auto; }
.help-pop .cp-title { position: sticky; top: -12px; margin: -2px -2px 8px; padding: 4px 2px 8px; background: var(--plot-surface); border-bottom: 1px solid var(--plot-border); z-index: 1; font-size: 13px; }
/* 2분할 컬럼 — 세로 길이를 반으로 줄여 스크롤 최소화. 섹션(블록)은 컬럼 사이에서 쪼개지지 않게 */
.help-body { padding: 2px 2px 4px; column-count: 2; column-gap: 22px; }
.help-block { break-inside: avoid; margin-bottom: 14px; }
.help-block:last-child { margin-bottom: 0; }
.help-sect { font-size: 10px; font-weight: 800; color: var(--plot-text-mute); letter-spacing: 0.06em; text-transform: uppercase; margin: 0 4px 6px; display: flex; align-items: baseline; gap: 7px; }
.help-note { font-size: 10px; font-weight: 500; letter-spacing: 0; text-transform: none; color: var(--plot-text-mute); opacity: 0.85; }
.help-rows { display: flex; flex-direction: column; gap: 2px; }
.help-row { display: grid; grid-template-columns: 148px 1fr; gap: 10px; align-items: center; padding: 5px 6px; border-radius: 7px; }
.help-row:hover { background: var(--plot-hover-soft); }
.help-keys { display: flex; flex-wrap: wrap; gap: 3px; align-items: center; font-size: 10.5px; color: var(--plot-text-mute); }
.help-desc { font-size: 12px; color: var(--plot-text); line-height: 1.35; }
.help-desc b { color: var(--plot-bar-fill); font-weight: 700; }
.help-k {
  display: inline-flex; align-items: center; justify-content: center; min-width: 18px; height: 19px; padding: 0 5px;
  border: 1px solid var(--plot-border); border-bottom-width: 2px; border-radius: 5px;
  background: var(--plot-surface); color: var(--plot-text); font-size: 10.5px; font-weight: 700;
  font-family: inherit; line-height: 1;
}
.col-cell.sortable { cursor: pointer; }
.col-cell.sortable:hover { color: var(--plot-text); }
.col-sort-arrow { font-size: 8px; color: var(--plot-bar-fill); }
.tb-badge {
  flex: none; height: 20px; border: 0; border-radius: 999px; padding: 0 9px;
  font-size: 10.5px; font-weight: 700; cursor: pointer;
}
.tb-badge.overdue { background: rgba(240,154,108,0.16); color: #f09a6c; }
.tb-badge.overdue:hover { background: rgba(240,154,108,0.28); }
.spacer { flex: 1; }
.tb-btn {
  border: 0; background: transparent;
  color: var(--plot-text-mute);
  cursor: pointer;
  padding: 4px 9px;
  font-size: 11px;
  border-radius: 5px;
  font-family: inherit;
  white-space: nowrap; flex: none;
  transition: background 0.12s, color 0.12s;
  font-variant-numeric: tabular-nums;
}
.tb-btn:hover { background: rgba(0,0,0,0.06); color: var(--plot-text); }
.tb-btn:disabled { opacity: 0.35; cursor: default; }
.tb-btn.cp-on { color: var(--plot-critical); font-weight: 700; background: rgba(229,72,77,0.08); }
.scale-toggle { display: inline-flex; padding: 2px; background: rgba(0,0,0,0.06); border-radius: 6px; gap: 1px; }
.scale-toggle button {
  border: 0; background: transparent;
  padding: 3px 10px; font-size: 11px; font-weight: 500;
  color: var(--plot-text-mute); cursor: pointer;
  border-radius: 4px; font-family: inherit; transition: all 0.12s;
}
.scale-toggle button.on { background: var(--plot-surface); color: var(--plot-text); box-shadow: 0 1px 2px rgba(0,0,0,0.08); }

/* ── 컬럼 피커 ── */
.col-picker-item { display: flex; align-items: center; gap: 8px; padding: 6px 10px; font-size: 12px; cursor: pointer; border-radius: 4px; }
.col-picker-item:hover { background: rgba(0,0,0,0.04); }
.col-picker-item input { accent-color: var(--plot-bar-fill); }

/* 리소스(담당자별 워크로드) 패널 */
.resource-panel {
  position: absolute; right: 8px; top: 44px; z-index: 30;
  background: var(--plot-surface); border: 1px solid var(--plot-border);
  border-radius: 8px; box-shadow: 0 12px 32px rgba(0,0,0,0.12);
  padding: 10px 12px; min-width: 260px;
  animation: pop-in 160ms cubic-bezier(0.32, 0.72, 0, 1);
}
.resource-panel .rp-title { font-size: 12px; font-weight: 600; margin-bottom: 8px; color: var(--plot-text); }
.resource-row { display: grid; grid-template-columns: 66px 1fr 44px; gap: 8px; align-items: center; margin-bottom: 7px; font-size: 11.5px; }
.resource-row .rp-name { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.resource-row .rp-track { height: 8px; background: rgba(0,0,0,0.06); border-radius: 4px; overflow: hidden; }
.resource-row .rp-fill { height: 100%; background: var(--plot-bar-fill); border-radius: 4px; }
.resource-row .rp-val { text-align: right; color: var(--plot-text-mute); font-variant-numeric: tabular-nums; }

/* ── 상세 드로어 (더블클릭/⚙/우클릭으로 열림) ── */
.detail-drawer {
  position: absolute; z-index: 40; background: var(--plot-surface);
  border: 1px solid var(--plot-border); box-shadow: 0 8px 40px rgba(0,0,0,0.16);
  display: flex; flex-direction: column;
}
.detail-drawer.left {
  left: 0; top: 0; bottom: 0; width: 320px; max-width: 82%;
  border-left: 0; border-radius: 0 12px 12px 0;
  animation: dd-slide 200ms cubic-bezier(0.32,0.72,0,1);
}
.detail-drawer.float {
  width: 300px; border-radius: 12px;
  animation: pop-in 160ms cubic-bezier(0.32,0.72,0,1);
}
/* 가운데 모달 (기본) — 백드롭 + 진한 그림자로 확실한 '레이어' */
.dd-backdrop {
  position: absolute; inset: 0; z-index: 39;
  background: rgba(15, 15, 20, 0.32);
  animation: fade-in 140ms ease;
}
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
.detail-drawer.center {
  left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: 576px; max-width: 94%; max-height: 90%;
  border-radius: 14px;
  box-shadow: 0 24px 64px rgba(0,0,0,0.32), 0 4px 16px rgba(0,0,0,0.18);
  animation: dd-pop 180ms cubic-bezier(0.32,0.72,0,1);
}
@keyframes dd-pop { from { transform: translate(-50%, -47%) scale(0.97); opacity: 0.5; } to { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
/* 인라인 편집 후 새로고침(reopen)은 애니메이션 없이 즉시 교체 → 깜빡임 제거 */
.detail-drawer.dd-noanim { animation: none !important; }
@keyframes dd-slide { from { transform: translateX(-16px); opacity: 0.4; } to { transform: none; opacity: 1; } }
.dd-head { display: flex; align-items: center; gap: 8px; padding: 12px 12px 10px; border-bottom: 1px solid var(--plot-border); }
.dd-name { flex: 1; min-width: 0; border: 1px solid transparent; border-radius: 6px; padding: 4px 6px; font-size: 13px; font-weight: 600; background: transparent; color: var(--plot-text); }
.dd-name:hover { border-color: var(--plot-border); }
.dd-name:focus { border-color: var(--plot-bar-fill); outline: none; background: var(--plot-surface); }
.dd-close { border: 0; background: transparent; font-size: 15px; color: var(--plot-text-mute); cursor: pointer; width: 26px; height: 26px; border-radius: 6px; flex: none; }
.dd-close:hover { background: var(--plot-select); }
.dd-htitle { flex: 1; min-width: 0; font-size: 12.5px; font-weight: 700; color: var(--plot-text); }
/* 타입 세그먼트 토글 */
.dd-seg { display: flex; gap: 4px; background: var(--plot-hover-soft); border-radius: 9px; padding: 3px; }
.dd-seg-btn { flex: 1; border: 0; background: transparent; border-radius: 6px; padding: 6px 0; font-size: 12px; font-weight: 600; color: var(--plot-text-mute); cursor: pointer; transition: background 0.12s, color 0.12s; }
.dd-seg-btn:hover { color: var(--plot-text); }
.dd-seg-btn.on { background: var(--plot-surface); color: var(--plot-text); box-shadow: 0 1px 3px rgba(0,0,0,0.10); }
/* 상태 칩 — 셀 팝오버의 stp-opt 를 상세용 가로 배치로 재사용 (native select 대체) */
.dd-stp { display: flex; flex-wrap: wrap; gap: 5px; }
.dd-stp .stp-opt { flex: 0 0 auto; padding: 5px 9px; font-size: 11.5px; gap: 5px; }
.stp-auto { margin-left: 1px; font-size: 8.5px; font-weight: 800; letter-spacing: 0.04em; color: var(--plot-bar-fill); background: var(--plot-select); border-radius: 4px; padding: 1px 4px; }
.dd-input, .dd-select { width: 100%; box-sizing: border-box; border: 1px solid var(--plot-border); border-radius: 8px; padding: 7px 9px; font-size: 13px; background: var(--plot-surface); color: var(--plot-text); }
.dd-input:focus, .dd-select:focus { border-color: var(--plot-bar-fill); outline: none; }
.dd-select { cursor: pointer; }
.dd-asg-cur { display: flex; flex-wrap: wrap; gap: 5px; align-items: center; }
/* 상세 — 카드 chrome 없이 평평한 라벨-좌측 폼 로우. 박스-속-박스 제거. */
.dd-body { padding: 16px 18px; display: flex; flex-direction: column; gap: 11px; overflow-y: auto; }
.dd-title-inp { font-size: 14px; font-weight: 600; padding: 9px 11px; }
.dd-row { display: flex; align-items: center; gap: 12px; min-width: 0; }
.dd-row.dd-row-top { align-items: flex-start; }
.dd-rlab { width: 40px; flex: none; font-size: 11.5px; font-weight: 700; color: var(--plot-text-mute); padding-top: 1px; }
.dd-rctl { flex: 1; min-width: 0; }
.dd-div { height: 1px; background: var(--plot-border); margin: 3px 0; }
.dd-meta-row { display: flex; align-items: center; gap: 8px; padding-left: 52px; margin-top: -5px; font-size: 11px; color: var(--plot-text-mute); }
.dd-meta-row .dd-days { flex: none; white-space: nowrap; font-variant-numeric: tabular-nums; }
/* '종료 미정으로'는 회색 풀폭 바가 아니라 은은한 인라인 링크 (cp-link 기본 block/width 오버라이드) */
.dd-meta-row .cp-link { display: inline-flex; align-items: center; width: auto; margin: 0; padding: 2px 7px; background: transparent; border-radius: 6px; font-size: 11px; font-weight: 600; color: var(--plot-text-mute); text-align: left; }
.dd-meta-row .cp-link::before { content: '·'; margin-right: 7px; color: var(--plot-border); }
.dd-meta-row .cp-link:hover { background: var(--plot-hover-soft); color: var(--plot-bar-fill); }
.dd-cal-fields { margin-bottom: 0; }
.dd-row .dd-stp { gap: 4px; }
.stp-sep { width: 1px; align-self: stretch; background: var(--plot-border); margin: 3px 2px; flex: none; }
.stp-opt.stp-urgent.on { border-color: #ea6a6a; background: rgba(234,106,106,0.12); color: #d9534f; }
.dd-foot-del { display: flex; justify-content: flex-end; }
/* 연결(선행/후행) 블록 */
.dd-links-block { display: flex; flex-direction: column; gap: 7px; }
.dd-links-head { display: flex; align-items: baseline; gap: 8px; font-size: 11.5px; font-weight: 700; color: var(--plot-text); }
.dd-links-hint { font-size: 10px; font-weight: 500; color: var(--plot-text-mute); }
.dd-links-row { display: flex; align-items: center; gap: 12px; }
/* 담당자 트리거 = 일정과 같은 .dp-field 재사용 */
.dp-field.dd-asg-field { justify-content: flex-start; gap: 8px; }
.dp-field.dd-asg-field .asg-stack { flex: none; }
.dd-asg-txt { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12.5px; font-weight: 600; color: var(--plot-text); }
.dd-asg-txt.muted { color: var(--plot-text-mute); font-weight: 500; }
.dp-caret { flex: none; margin-left: auto; color: var(--plot-text-mute); font-size: 11px; }
.dp-field.dd-asg-field:hover { border-color: var(--plot-bar-fill); box-shadow: 0 0 0 2.5px var(--plot-select); }
/* 진척 1로우 */
.pp-onerow { display: flex; align-items: center; gap: 10px; }
.pp-onerow .pp-range { flex: 1; min-width: 0; margin: 0; accent-color: var(--plot-bar-fill); }
.pp-onerow .pp-num-wrap { flex: none; }
.pp-onerow .pp-num { width: 46px; }
.dd-foot-row { display: flex; gap: 8px; align-items: stretch; }
.dd-foot-row .set-row { flex: 1; margin: 0; }
.dd-foot-row .dd-del { flex: none; margin: 0; white-space: nowrap; }
.dd-body > .dd-note { flex: 0 0 auto; min-height: 52px; }
.dd-sect {
  display: flex; align-items: baseline; justify-content: space-between; gap: 8px;
  font-size: 10px; font-weight: 800; color: var(--plot-text-mute); letter-spacing: 0.08em;
  margin-top: 4px;
}
.dd-sect:first-child { margin-top: 0; }
/* 상세용 담당자 체크리스트 — 우측 단독 컬럼이라 넉넉히(큰 팀만 내부 스크롤) */
.dd-body .dd-asg { max-height: 306px; overflow-y: auto; flex: none; }
.dd-body .dd-asg .asg-item { padding: 4px 7px; gap: 7px; }
.dd-body .dd-asg .asg-item > span:last-child { font-size: 12px; }
.dd-body .dd-asg .asg-avatar { width: 18px; height: 18px; font-size: 9px; }
.dd-links { display: flex; flex-wrap: wrap; gap: 6px; }
.dd-field { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--plot-text-mute); }
.dd-field > span:first-child { width: 48px; flex: none; }
.dd-field > b { color: var(--plot-text); font-weight: 500; }
.dd-field input[type="text"], .dd-assignee, .dd-field input[type="date"] { flex: 1; min-width: 0; border: 1px solid var(--plot-border); border-radius: 6px; padding: 4px 7px; font: inherit; font-size: 12px; color: var(--plot-text); background: var(--plot-surface); }
.dd-field input:focus { outline: none; border-color: var(--plot-bar-fill); }
.dd-tbd { color: var(--plot-critical); font-weight: 700; flex: 1; }
.dd-links { display: flex; flex-wrap: wrap; gap: 5px; flex: 1; }
.dd-link {
  display: inline-flex; align-items: center; gap: 4px; cursor: pointer;
  background: var(--plot-surface-2); border: 1px solid var(--plot-border); color: var(--plot-text);
  font-size: 11px; font-weight: 600; padding: 3px 6px 3px 9px; border-radius: 999px;
  transition: border-color 0.12s, background 0.12s;
}
.dd-link:hover { border-color: var(--plot-bar-fill); background: var(--plot-select); }
.dd-link-nm { max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dd-unlink { border: 0; background: transparent; color: var(--plot-text-mute); cursor: pointer; font-size: 11px; line-height: 1; padding: 2px; border-radius: 50%; display: inline-flex; }
.dd-unlink:hover { color: var(--plot-critical); background: rgba(229,72,77,0.1); }
.dd-mini { border: 1px solid var(--plot-border); background: var(--plot-surface); color: var(--plot-text-mute); border-radius: 5px; padding: 3px 7px; font-size: 10.5px; cursor: pointer; flex: none; }
.dd-mini:hover { border-color: var(--plot-bar-fill); color: var(--plot-text); }
.dd-progress { flex: 1; accent-color: var(--plot-bar-fill); }
.dd-progress-val { width: 38px; text-align: right; flex: none; color: var(--plot-text); }
.dd-note { flex: 1; min-width: 0; border: 1px solid var(--plot-border); border-radius: 6px; padding: 5px 7px; font: inherit; font-size: 12px; color: var(--plot-text); background: var(--plot-surface); resize: vertical; }
.dd-note:focus { outline: none; border-color: var(--plot-bar-fill); }
/* 삭제는 위험 액션이지만 상시 강조는 과함 → 은은한 고스트, hover 시에만 빨강 (아이콘 없음) */
.dd-del { margin: 0; border: 0; background: transparent; color: var(--plot-text-mute); border-radius: 7px; padding: 6px 10px; font-size: 11.5px; font-weight: 600; cursor: pointer; }
.dd-del:hover { background: rgba(229,72,77,0.10); color: var(--plot-critical); }

/* ── 행 왼쪽 거터 (⠿ 그립: 클릭=상세 · 드래그=이동) — hover 시 노출 ── */
.row-actions {
  width: 26px; flex: none; align-self: stretch;
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.12s;
}
.task-row { position: relative; }
.task-row:hover .row-actions { opacity: 1; }
.row-act {
  width: 20px; height: 20px; border: 0; background: transparent;
  border-radius: 4px; font-size: 11px; line-height: 1; color: var(--plot-text-mute); cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; flex: none; padding: 0;
}
.row-act:hover { background: var(--plot-select); color: var(--plot-text); }
.row-act.grip { cursor: grab; }
.row-act.grip:active { cursor: grabbing; }
/* 헤더도 거터만큼 들여쓰기해 컬럼 정렬 유지 */
/* 거터 칸은 .col-menu-btn(26px)이 차지 */

/* ── 행 아래 인서트 라인 (hover 시 은은한 점선 + ＋, '이 사이에 들어감' 표시) ── */
/* 히트존은 '자기 행'의 아래쪽에만 놓는다(bottom:-2px) — 예전 -8px 는 다음 행 상단까지
   침범해 "이게 어느 행 사이냐" 혼동을 유발했다. 좌측 padding 은 행 깊이(--ins-indent)만큼
   들여, ＋ 어포던스가 해당 레벨 아래에서 시작하도록 한다(레벨 식별). */
.insert-zone {
  position: absolute; left: 0; right: 0; bottom: -2px; height: 14px; z-index: 6;
  display: flex; align-items: center; gap: 6px;
  padding-left: calc(var(--ins-indent, 0px) + 12px); padding-right: 12px;
  opacity: 0; transition: opacity 0.12s;
}
/* hover 중이거나 '여기에 추가' 메뉴가 열려 있는 동안은 계속 보이게 유지 */
.insert-zone:hover, .insert-zone.menu-open { opacity: 1; }
.insert-line {
  flex: 1; height: 0; border-top: 2px dashed color-mix(in srgb, var(--plot-accent) 45%, transparent); border-radius: 1px;
  position: relative;
}
/* 왼쪽 라인 시작점 ▸ 삽입 위치 캐럿 (행 깊이 지점에서 시작) */
.insert-zone:hover .insert-line:first-of-type::before,
.insert-zone.menu-open .insert-line:first-of-type::before {
  content: '▸'; position: absolute; left: -6px; top: -9px; font-size: 11px; color: var(--plot-accent);
}
.insert-btn {
  height: 18px; border-radius: 999px; flex: none;
  border: 1px solid color-mix(in srgb, var(--plot-accent) 50%, transparent); background: var(--plot-surface); color: var(--plot-accent);
  font-size: 10.5px; font-weight: 700; line-height: 1; cursor: pointer; padding: 0 9px;
  display: inline-flex; align-items: center; justify-content: center; gap: 3px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  transition: background 0.12s, color 0.12s;
}
.insert-btn::after { content: '여기에 추가'; font-size: 10px; font-weight: 600; }
/* 메뉴 열린 동안엔 버튼을 액티브(채움)로 — 어느 행의 메뉴인지 시각적으로 고정 */
.insert-btn:hover,
.insert-zone.menu-open .insert-btn { background: var(--plot-accent); color: #fff; border-color: var(--plot-accent); }
/* 날짜 필드 (자체 달력) */
.dd-date { cursor: pointer; }
.dd-date:hover { border-color: var(--plot-bar-fill); }

/* ── 우클릭 컨텍스트 메뉴 ── */
.ctx-menu {
  position: absolute; z-index: 50; background: var(--plot-surface);
  border: 1px solid var(--plot-border); border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.16);
  padding: 4px; min-width: 148px; animation: pop-in 130ms cubic-bezier(0.32,0.72,0,1);
}
.ctx-item { display: block; width: 100%; text-align: left; border: 0; background: transparent; padding: 7px 10px; font-size: 12px; color: var(--plot-text); cursor: pointer; border-radius: 5px; }
.ctx-item:hover { background: var(--plot-select); }
.ctx-item.danger { color: var(--plot-critical); }
.ctx-item.sep { border-top: 1px solid var(--plot-border); margin-top: 3px; padding-top: 8px; }
.ctx-menu.add-menu { min-width: 132px; }

/* ── 본체 ── */
.body {
  display: grid;
  grid-template-columns: var(--left-total, ${Nr}px) 6px 1fr;
  min-height: 0; height: 100%; position: relative;
}
.left { overflow: hidden; display: flex; flex-direction: column; min-width: 0; }
.left-header {
  height: ${Mi}px; flex: none; position: relative;
  display: flex; align-items: stretch;
  font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700;
  color: var(--plot-text-mute);
  border-bottom: 1px solid var(--plot-border);
  background: rgba(0,0,0,0.02);
}
.left-header .col-cell {
  padding: 0 10px;
  border-right: 1px solid var(--plot-grid);
  display: flex; align-items: center; justify-content: center;
  height: 100%; overflow: hidden; white-space: nowrap;
  position: relative; flex: none;
}
/* 맨 왼쪽 드래그 거터 칸의 컬럼 설정 버튼 */
.col-menu-btn {
  flex: none; width: ${Xe}px; height: 100%;
  border: 0; background: transparent; cursor: pointer; padding: 0;
  display: flex; align-items: center; justify-content: center;
  color: var(--plot-text-mute); opacity: 0.75;
  transition: opacity 0.12s, color 0.12s;
}
.col-menu-btn svg { fill: currentColor; border-radius: 3px; }
.col-menu-btn:hover { color: var(--plot-bar-fill); opacity: 1; }
.col-menu-btn:hover svg { filter: drop-shadow(0 0 5px var(--plot-select)); }
.col-collapse {
  display: inline-flex; align-items: center; justify-content: center;
  width: 20px; height: 20px; margin-right: 4px; padding: 0;
  border: 0; border-radius: 5px; background: transparent;
  color: var(--plot-text-mute); cursor: pointer; transition: background 0.12s, color 0.12s;
}
.col-collapse:hover { background: var(--plot-hover-soft); color: var(--plot-bar-fill); }
.cell-pop.cols-pop { width: 210px; }
.col-grip {
  position: absolute; top: 0; bottom: 0; right: -3px; width: 7px;
  cursor: col-resize; z-index: 2;
}
.col-grip:hover { background: color-mix(in srgb, var(--plot-accent) 25%, transparent); }
.left-viewport { flex: 1; overflow: hidden; position: relative; }
.left-canvas { will-change: transform; }
.task-row {
  height: var(--row-h, 34px);
  display: flex; align-items: center;
  border-bottom: 1px solid var(--plot-grid);
  font-size: 12.5px; cursor: pointer;
  transition: background 0.12s;
}
.task-row:hover, .task-row.hl { background: var(--plot-row-hover); }
.task-row.selected { background: var(--plot-select); }
/* 크리티컬은 우측 차트 바 빨간 테두리로 표시 — 좌측 리스트엔 인디케이터 없음(중복·혼란 제거) */
.task-row.critical .name-text { font-weight: 600; }
.task-row.milestone .name-text { color: #c08a2d; font-weight: 600; }
.task-row .cell {
  padding: 0 10px;
  border-right: 1px solid var(--plot-grid);
  height: 100%;
  display: flex; align-items: center; gap: 4px;
  overflow: hidden; flex: none;
}
.task-row .cell.num { font-variant-numeric: tabular-nums; color: var(--plot-text-mute); font-size: 11px; white-space: nowrap; }
/* 기간 셀: 날짜 범위는 남는 폭에서 줄어들며(…) 잘리고, 근무일 배지·잠금은 항상 보이게 고정 —
   좁은 컬럼/긴 범위 행에서 'N일' 배지가 들쭉날쭉 사라지던 문제(사용자 지적) 제거 */
.dur-range { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.dur-wd { color: var(--plot-accent); font-weight: 700; margin-left: 2px; flex: none; }
.name-text { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: text; padding: 1px 3px; border-radius: 4px; }
.name-text:hover { background: var(--plot-hover-soft); }
.cell-status { justify-content: center; cursor: pointer; overflow: visible; }   /* 긴급 글로우가 잘리지 않게 */
.cell-status .st-dot, .cell-status .st-ms { transition: transform 0.14s cubic-bezier(0.32,0.72,0,1), box-shadow 0.14s; }
.cell-status:hover .st-dot {
  transform: scale(1.35);
  box-shadow: inset 0 0 0 2px rgba(255,255,255,0.35), 0 0 0 3.5px var(--plot-select);
}
/* 긴급은 hover 시에도 코랄 글로우 유지 (기본 hover 링에 덮이지 않게) */
.cell-status:hover .st-dot.st-crit { box-shadow: inset 0 0 0 2px rgba(255,255,255,0.35), 0 0 0 1.5px #ea6a6a, 0 0 9px 2px rgba(234,106,106,0.6); }
.cell-status:hover .st-ms { transform: scale(1.3); text-shadow: 0 0 8px rgba(243,192,107,0.5); }
.st-ms { color: var(--plot-milestone); font-size: 12px; display: inline-block; }
.cell-edit { cursor: pointer; }
/* 상태·진척률은 값/라벨 모두 중앙 정렬 */
[data-progress-cell] { justify-content: center; }
.prog-ring { flex: none; display: block; }
.pr-track { fill: none; stroke: var(--plot-border); stroke-width: 2.6; }
.pr-arc { fill: none; stroke-width: 2.6; stroke-linecap: round; transform: rotate(-90deg); transform-origin: center; }
.col-cell.col-status, .col-cell.col-progress, .col-cell.col-assignee, .col-cell.col-days { justify-content: center; padding-left: 4px; padding-right: 4px; }
.cell-asg { justify-content: center; padding: 0 4px; }
.cell-edit:hover { background: var(--plot-hover-soft); }
/* 일수 = 숫자만 담은 원형/필 태그, 셀 중앙 */
.cell-days { justify-content: center; padding: 0 4px; }
.day-badge {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 16px; height: 16px; padding: 0 4px;
  border-radius: 999px; background: var(--plot-hover-soft);
  color: var(--plot-text-mute); font-size: 10px; font-weight: 700; font-variant-numeric: tabular-nums; line-height: 1;
}
.day-dash, .day-open { color: var(--plot-text-mute); font-size: 10.5px; }

/* ── 셀 편집 팝오버 (공통 카드) ── */
.cell-pop {
  position: absolute; z-index: 55; min-width: 228px; max-width: 284px;
  background: var(--plot-surface); border: 1px solid var(--plot-border);
  border-radius: 12px; box-shadow: 0 14px 44px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08);
  padding: 12px 14px; animation: pop-in 130ms cubic-bezier(0.32,0.72,0,1); font-size: 12px;
  /* 화면보다 커도 확인 버튼이 잘리지 않게: 뷰포트로 높이 제한 + 내부 스크롤(확인은 sticky) */
  max-height: calc(100dvh - 24px); overflow-y: auto;
}
.cp-title {
  display: flex; align-items: baseline; justify-content: space-between; gap: 8px;
  font-size: 11px; font-weight: 700; color: var(--plot-text); margin-bottom: 10px;
}
.cp-hint { font-size: 10px; font-weight: 500; color: var(--plot-text-mute); }
.cp-val { font-size: 15px; font-weight: 800; color: var(--plot-bar-fill); font-variant-numeric: tabular-nums; }
.cp-sect { margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--plot-border); }
.cp-swatches { display: flex; gap: 6px; flex-wrap: wrap; }
/* 날짜 */
.dates-line { display: flex; align-items: center; gap: 6px; }
.cp-date {
  flex: 1; text-align: center; border: 1px solid var(--plot-border); background: var(--plot-surface);
  color: var(--plot-text); border-radius: 8px; padding: 7px 6px; font: inherit; font-size: 12px;
  font-weight: 600; cursor: pointer; font-variant-numeric: tabular-nums; transition: border-color 0.12s, color 0.12s;
}
.cp-date:hover { border-color: var(--plot-bar-fill); color: var(--plot-bar-fill); }
/* 상태 팝오버 긴급 토글 */
.cp-crit { display: flex; align-items: center; gap: 7px; width: 100%; margin-top: 6px; border: 1px solid var(--plot-border); background: var(--plot-surface); color: var(--plot-text); border-radius: 8px; padding: 7px 10px; font-size: 12px; font-weight: 600; cursor: pointer; }
.cp-crit:hover { border-color: #ea6a6a; }
.cp-crit.on { border-color: #ea6a6a; background: rgba(234,106,106,0.12); color: #d9534f; }
.cp-crit-hint { margin-left: auto; font-size: 10px; font-weight: 500; color: var(--plot-text-mute); }
.cp-crit.on .cp-crit-hint { color: #d9534f; }
.dates-arrow { color: var(--plot-text-mute); flex: none; }
.dates-meta { margin-top: 8px; font-size: 11px; color: var(--plot-text-mute); text-align: center; }
.cp-link {
  display: block; width: 100%; margin-top: 10px; padding: 6px 0; text-align: center;
  border: 0; background: var(--plot-hover-soft); color: var(--plot-text-mute);
  border-radius: 7px; font-size: 11px; font-weight: 600; cursor: pointer;
}
.cp-link:hover { color: var(--plot-text); background: var(--plot-select); }
.cp-tbd { color: var(--plot-critical); font-weight: 700; }
/* 담당자 */
.asg-list { display: flex; flex-direction: column; gap: 1px; max-height: 190px; overflow-y: auto; margin: -2px -6px 0; }
.asg-item { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 7px; cursor: pointer; }
.asg-item:hover { background: var(--plot-hover-soft); }
.asg-item input { accent-color: var(--plot-bar-fill); }
.asg-item .asg-nm { flex: 1; min-width: 0; }
.asg-item .asg-check { margin-left: auto; color: var(--plot-bar-fill); font-weight: 800; font-size: 12px; opacity: 0; transition: opacity 0.12s; }
.asg-item:has(input:checked) { background: var(--plot-select); }
.asg-item:has(input:checked) .asg-check { opacity: 1; }
.asg-item:has(input:checked) .asg-avatar { box-shadow: 0 0 0 2px var(--plot-surface), 0 0 0 3.5px var(--plot-bar-fill); }
/* 담당자 이름 검색 */
.asg-search { display: flex; align-items: center; gap: 6px; margin: 0 0 7px; padding: 6px 9px; border: 1px solid var(--plot-border); border-radius: 9px; background: var(--plot-surface); }
.asg-search-i { color: var(--plot-text-mute); font-size: 13px; }
.asg-search input { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; font-size: 12px; color: var(--plot-text); }
.asg-clear { margin-left: 2px; border: 0; background: transparent; color: var(--plot-text-mute); font-size: 10.5px; font-weight: 700; cursor: pointer; padding: 3px 7px; border-radius: 6px; }
.asg-clear:hover { background: var(--plot-hover-soft); color: var(--plot-critical); }
.asg-avatar {
  width: 20px; height: 20px; border-radius: 50%; flex: none; color: #fff;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700;
}
.asg-empty { color: var(--plot-text-mute); font-size: 11px; padding: 6px 8px; }
/* 선택된 담당자 칩 (팝오버 상단 고정 표시) */
/* 선택 표시 — 헤더(선택 N + 모두 해제)는 고정, 칩만 높이캡+스크롤 → 20명+ 선택해도 폭주 안 함 */
.asg-selected { display: block; padding: 0; margin-bottom: 6px; border-bottom: 1px solid var(--plot-border); }
.asg-sel-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 6px 2px; position: sticky; top: 0; background: var(--plot-surface); z-index: 1; }
.asg-sel-chips { display: flex; flex-wrap: wrap; gap: 5px; align-content: flex-start; max-height: 76px; overflow-y: auto; padding: 0 2px 8px; scrollbar-width: thin; }
.asg-sel-chips::-webkit-scrollbar { width: 6px; }
.asg-sel-chips::-webkit-scrollbar-thumb { background: var(--plot-border); border-radius: 3px; }
.cell-pop.asg-pop { width: 300px; max-width: 300px; }
.asg-sel-lab { font-size: 10px; font-weight: 700; color: var(--plot-text-mute); margin-right: 2px; }
.asg-none { font-size: 11px; color: var(--plot-text-mute); }
.asg-sel-chip { display: inline-flex; align-items: center; gap: 4px; padding: 2px 6px 2px 3px; border-radius: 999px; background: var(--plot-hover-soft); font-size: 11px; color: var(--plot-text); cursor: pointer; }
.asg-sel-chip:hover { background: var(--plot-select); }
.asg-sel-chip .asg-x { color: var(--plot-text-mute); font-size: 12px; margin-left: 1px; }
.asg-avatar.sm { width: 15px; height: 15px; font-size: 8.5px; }
/* 진척률 */
.pp-range { width: 100%; accent-color: var(--plot-bar-fill); margin-top: 2px; }
.pp-presets { display: flex; gap: 5px; margin-top: 10px; }
.pp-preset { flex: 1; border: 1px solid var(--plot-border); background: var(--plot-surface); color: var(--plot-text-mute); border-radius: 999px; padding: 4px 0; font-size: 10.5px; font-weight: 600; cursor: pointer; }
.pp-preset:hover, .pp-preset.on { border-color: var(--plot-bar-fill); color: var(--plot-bar-fill); background: var(--plot-select); }
/* 상태 */
.stp-current { display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: var(--plot-hover-soft); border-radius: 8px; font-weight: 600; }
.stp-desc { font-size: 10.5px; color: var(--plot-text-mute); font-weight: 500; margin-left: auto; }
.stp-done {
  display: block; width: 100%; margin-top: 10px; border: 1px solid var(--plot-border);
  background: var(--plot-surface); color: var(--plot-text); border-radius: 8px;
  padding: 7px 0; font-size: 12px; font-weight: 700; cursor: pointer;
}
.stp-done:hover { border-color: #5ec79b; color: #1f9d6b; background: rgba(94,199,155,0.08); }
.stp-options { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.stp-opt[data-st="hold"] { grid-column: 1 / -1; }
/* 확인/취소 푸터 — 누르기 전엔 반영되지 않음 */
/* 확인/취소는 항상 보이게 — 팝오버가 스크롤돼도 하단에 고정 */
.cp-actions { display: flex; gap: 6px; margin-top: 12px; position: sticky; bottom: -12px; background: var(--plot-surface); padding: 8px 0 2px; margin-bottom: -2px; }
.cp-cancel, .cp-ok { flex: 1; border-radius: 8px; padding: 7px 0; font-size: 12px; font-weight: 700; cursor: pointer; }
.cp-cancel { border: 1px solid var(--plot-border); background: var(--plot-surface); color: var(--plot-text-mute); }
.cp-cancel:hover { color: var(--plot-text); }
.cp-ok { border: 0; background: var(--plot-bar-fill); color: #fff; }
.cp-ok:hover { filter: brightness(1.08); }
.cp-link.on { color: var(--plot-bar-fill); background: var(--plot-select); font-weight: 700; }
/* 담당자 아바타 스택 (좌측 셀) */
.asg-stack { display: inline-flex; align-items: center; flex: none; }
.asg-chip {
  width: 18px; height: 18px; border-radius: 50%; color: #fff;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 9px; font-weight: 700; border: 2px solid var(--plot-surface);
  position: relative; flex: none; line-height: 1;
}
.asg-chip.hollow > * { line-height: 1; }
.asg-chip + .asg-chip { margin-left: -7px; }
.asg-chip.more {
  background: var(--plot-text-mute); width: auto; min-width: 18px;
  padding: 0 5px; border-radius: 999px; letter-spacing: 0.02em;
}
.asg-chip.hollow {
  background: transparent; border: 1.4px dashed rgba(113,113,122,0.55);
  color: var(--plot-text-mute); font-size: 11px; font-weight: 600; opacity: 0.75;
  transition: border-color 0.12s, color 0.12s;
  padding-bottom: 1px;   /* '+' 글리프 광학 세로 중앙 보정 */
}
.cell-edit:hover .asg-chip.hollow { border-color: var(--plot-bar-fill); color: var(--plot-bar-fill); opacity: 1; }
/* 진척 숫자 입력 */
.pp-num-wrap { display: inline-flex; align-items: center; gap: 2px; font-size: 12px; color: var(--plot-text); }
.pp-num {
  width: 52px; border: 1px solid var(--plot-border); border-radius: 6px; padding: 3px 6px;
  font: inherit; font-size: 12px; text-align: right; background: var(--plot-surface);
  color: var(--plot-text); font-variant-numeric: tabular-nums;
}
.pp-num:focus { outline: none; border-color: var(--plot-bar-fill); }
/* 기간 레이어 — 시작/종료 필드 + 프리셋 + 인라인 범위 달력 */
.cell-pop.dates-pop { width: 452px; max-width: 452px; }
.dp-cal .cal-title { white-space: nowrap; }
.dp-mode { display: flex; gap: 4px; margin-bottom: 10px; background: var(--plot-surface-2); border: 1px solid var(--plot-border); border-radius: 9px; padding: 3px; }
.dp-mode button { flex: 1; border: 0; background: transparent; border-radius: 6px; padding: 6px 0; font-size: 12px; font-weight: 700; color: var(--plot-text-mute); cursor: pointer; transition: background 0.12s, color 0.12s; }
.dp-mode button.on { background: var(--plot-surface); color: var(--plot-bar-fill); box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
.dp-fields { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.dp-field {
  flex: 1; display: flex; align-items: center; gap: 7px;
  border: 1px solid var(--plot-border); background: var(--plot-surface-2);
  border-radius: 8px; padding: 7px 10px; font-size: 12.5px; font-weight: 600;
  color: var(--plot-text); cursor: pointer; font-variant-numeric: tabular-nums;
  transition: border-color 0.12s, box-shadow 0.12s;
}
.dp-field.on { border-color: var(--plot-bar-fill); box-shadow: 0 0 0 2.5px var(--plot-select); }
.dp-field.tbd .dp-val { color: var(--plot-text-mute); font-style: italic; }
.dp-field .dp-lab { font-size: 10px; color: var(--plot-text-mute); font-weight: 700; flex: none; }
.dp-body { display: flex; gap: 12px; }
.dp-presets {
  width: 126px; flex: none; display: flex; flex-direction: column; gap: 2px;
  border-right: 1px solid var(--plot-border); padding-right: 10px;
}
.dp-preset {
  display: flex; align-items: center; justify-content: space-between; gap: 6px;
  border: 0; background: transparent; border-radius: 6px; padding: 6px 8px;
  font-size: 12px; font-weight: 600; color: var(--plot-text); cursor: pointer; text-align: left;
}
.dp-preset:hover { background: var(--plot-select); }
.dp-preset .sub { font-size: 10px; color: var(--plot-text-mute); font-weight: 500; }
.dp-cal { flex: 1; min-width: 0; }
.dp-cal .cal-head { display: flex; align-items: center; gap: 2px; margin-bottom: 6px; }
.dp-cal .cal-nav[data-nav="t"] { width: auto; padding: 0 7px; font-size: 10.5px; font-weight: 700; }
.dp-cal .cal-grid { gap: 1px 0; }
.dp-cal .cal-day.in-rng { background: var(--plot-select); border-radius: 0; }
.dp-cal .cal-day.rng-start, .dp-cal .cal-day.rng-end { background: var(--plot-bar-fill); color: #fff; font-weight: 700; }
.dp-cal .cal-day.rng-start { border-radius: 6px 0 0 6px; }
.dp-cal .cal-day.rng-end { border-radius: 0 6px 6px 0; }
.dp-cal .cal-day.rng-start.rng-end { border-radius: 6px; }
.stp-opt {
  display: flex; align-items: center; gap: 7px;
  border: 1px solid var(--plot-border); background: var(--plot-surface);
  border-radius: 8px; padding: 7px 10px; font-size: 12px; font-weight: 600;
  color: var(--plot-text); cursor: pointer; transition: border-color 0.12s, background 0.12s;
}
.stp-opt:hover { border-color: var(--plot-text-mute); }
/* 선택 하이라이트는 그 상태의 고유색으로 — 보라(UI 강조색)와 분리 */
.stp-opt.on[data-st="done"] { border-color: #5ec79b; background: rgba(94,199,155,0.10); }
.stp-opt.on[data-st="progress"] { border-color: #82a8f4; background: rgba(130,168,244,0.10); }
.stp-opt.on[data-st="overdue"] { border-color: #f09a6c; background: rgba(240,154,108,0.10); }
.stp-opt.on[data-st="upcoming"] { border-color: #9aa7b4; background: rgba(154,167,180,0.12); }
.stp-opt.on[data-st="hold"] { border-color: #f3c06b; background: rgba(243,192,107,0.12); }
.stp-opt .st-dot { box-shadow: none; }
.tree-toggle {
  display: inline-flex; align-items: center; justify-content: center;
  width: 14px; height: 14px; flex: none; font-size: 8px; cursor: pointer;
  color: var(--plot-text-mute); border-radius: 3px; user-select: none;
}
.tree-toggle:hover { background: rgba(0,0,0,0.08); color: var(--plot-text); }
.tree-spacer { display: inline-block; width: 14px; flex: none; }
/* 기간 잠금 토글 — 요약 행 오른쪽. 평소 흐림, hover/잠금 시 강조 */
.tree-lock {
  margin-left: 6px; flex: none; display: inline-flex; align-items: center; justify-content: center;
  width: 20px; height: 18px; padding: 0; border: 0; border-radius: 4px; cursor: pointer;
  background: transparent; color: var(--plot-text-mute); opacity: 0; transition: opacity .12s, color .12s, background .12s;
}
.task-row:hover .tree-lock { opacity: .55; }
.tree-lock:hover { opacity: 1; background: rgba(0,0,0,0.06); color: var(--plot-text); }
.tree-lock.on { opacity: 1; color: var(--plot-critical); }
/* 기간 잠금은 이제 기간 컬럼 우측 끝에 붙는다 */
.cell.num .tree-lock { margin-left: auto; }
/* 잠금 표시 — 요약 바 종료 지점 우상단에 걸친 작은 자물쇠 (배경 없이 글리프만, 가독 위해 얇은 면색 헤일로) */
.bar .lock-mark { pointer-events: none; paint-order: stroke fill; }
.bar .lock-mark .lm-shackle { stroke: var(--plot-text-mute); }
.bar .lock-mark .lm-body { fill: var(--plot-text-mute); stroke: var(--plot-surface); stroke-width: 1.6; }
/* 트리 들여쓰기 — 레벨당 14px 균일. 가이드 선 없음(서브트리 범위는 hover 연보라 밴드) */
.tree-indent { display: inline-block; flex: none; }
.name-text.has-kids { font-weight: 650; }
/* 업무명 컬럼은 고정 width(다른 셀과 동일) → col-grip 리사이즈가 정상 반영. flex-grow 금지. */
.cell-name { flex: none; }
/* 상태 컬럼 배지 */
/* 셀 커서는 용도별(.name-text=text, .cell-edit=pointer)로 개별 지정 */
/* 담당자별 그룹 헤더 행 */
.group-row {
  display: flex; align-items: center; gap: 7px; padding: 0 12px;
  background: var(--plot-select); font-size: 12px; font-weight: 700; color: var(--plot-text);
  border-bottom: 1px solid var(--plot-border);
}
.group-name { flex: 1; }
.group-meta { font-size: 10.5px; font-weight: 500; color: var(--plot-text-mute); }
.group-band { fill: var(--plot-subtree); }
:host(.reparenting) .task-row { cursor: grabbing; }
.task-row.drag-ghost { opacity: 0.45; }
/* 드롭 확정 직후 착지한 행을 잠깐 강조 — 정적 리스트에선 드롭 순간 위치가 바뀌므로 '여기 들어왔다'를 확인시켜준다 */
@keyframes gantt-land { 0% { background: color-mix(in srgb, var(--plot-accent) 30%, transparent); } 100% { background: transparent; } }
.task-row.just-landed { animation: gantt-land 0.45s ease-out; }
@media (prefers-reduced-motion: reduce) { .task-row.just-landed { animation-duration: 0.01s; } }
/* 하위(child)로 드롭 — 대상+후손을 티얼로 채워 '이 안(하위)으로 들어감' 명확히 (보라 금지) */
.task-row.drop-target { background: color-mix(in srgb, var(--plot-accent) 22%, transparent); box-shadow: inset 4px 0 0 var(--plot-accent); }
.task-row.drop-child { background: color-mix(in srgb, var(--plot-accent) 9%, transparent); box-shadow: inset 4px 0 0 color-mix(in srgb, var(--plot-accent) 45%, transparent); }
/* 형제(sibling) 재정렬 삽입선 (위/아래) — 얇은 3px 선이 '진짜 미세'해 위치가 안 보이던 걸
   두꺼운 라운드 티얼 바(4px) + 글로우 + 시작점 원형 노드로 강화. 노드는 착지 depth(--drop-x)에
   정확히 놓여 '어느 레벨 사이에 끼는지'를 확실히 보여준다. */
.task-row.drop-before::after, .task-row.drop-after::after {
  content: ''; position: absolute; left: var(--drop-x, 0px); right: 8px; height: 4px;
  background: var(--plot-accent); border-radius: 3px; z-index: 5; pointer-events: none;
  box-shadow: 0 0 0 2px var(--plot-surface), 0 2px 9px color-mix(in srgb, var(--plot-accent) 60%, transparent);
}
/* 시작점 원형 노드 — 삽입 지점(깊이)을 콕 집어준다 */
.task-row.drop-before::before, .task-row.drop-after::before {
  content: ''; position: absolute; left: calc(var(--drop-x, 0px) - 3px); width: 10px; height: 10px;
  border-radius: 50%; background: var(--plot-accent); z-index: 6; pointer-events: none;
  box-shadow: 0 0 0 2px var(--plot-surface), 0 0 7px color-mix(in srgb, var(--plot-accent) 75%, transparent);
}
.task-row.drop-before::after { top: -2px; }
.task-row.drop-before::before { top: -5px; }
.task-row.drop-after::after { bottom: -2px; }
.task-row.drop-after::before { bottom: -5px; }
/* 드래그 중엔 인서트존('여기에 추가')을 숨김 — 드롭 피드백과 겹쳐 뜨지 않게 */
:host(.reparenting) .insert-zone, :host(.dragging-any) .insert-zone { opacity: 0 !important; pointer-events: none !important; }
.reparent-ghost {
  position: absolute; z-index: 60; pointer-events: none;
  background: var(--plot-accent); color: #fff; font-size: 11px; font-weight: 600;
  padding: 3px 9px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); white-space: nowrap;
}
.inline-edit {
  flex: 1; width: 100%; min-width: 0; border: 1px solid var(--plot-bar-fill);
  border-radius: 4px; padding: 1px 5px; font: inherit; font-size: 12px;
  background: var(--plot-surface); color: var(--plot-text); outline: none;
}
.progress-mini { flex: 1; height: 4px; background: rgba(0,0,0,0.08); border-radius: 2px; overflow: hidden; }
.progress-mini > div { height: 100%; background: var(--plot-bar-fill); border-radius: 2px; }
.progress-label { font-size: 10.5px; color: var(--plot-text-mute); font-variant-numeric: tabular-nums; }

/* ── 스플리터 ── */
.splitter { cursor: col-resize; position: relative; z-index: 4; }
.splitter::after {
  content: ''; position: absolute; top: 0; bottom: 0; left: 2px; width: 2px;
  background: var(--plot-border); transition: background 0.12s;
}
.splitter:hover::after, .splitter.dragging::after { background: var(--plot-accent); }

/* ── 우측 ── */
.right { position: relative; overflow: auto; min-width: 0; }
/* 얇은 스크롤바 (세로/가로 6px · 트랙 투명) */
/* Shadow 내 모든 스크롤 영역 6px 슬림 (리스트·보드·캘린더·차트·팝오버 공통) */
.root *::-webkit-scrollbar { width: 5px; height: 5px; }
.root *::-webkit-scrollbar-track { background: transparent; }
.root *::-webkit-scrollbar-thumb { background: transparent; border-radius: 3px; }
.root *:hover::-webkit-scrollbar-thumb { background: var(--plot-scrollbar); }
.root *::-webkit-scrollbar-thumb:hover { background: var(--plot-scrollbar-hover); }
.root *::-webkit-scrollbar-corner { background: transparent; }
.root * { scrollbar-width: thin; scrollbar-color: transparent transparent; }
.root *:hover { scrollbar-color: var(--plot-scrollbar) transparent; }
.toolbar, .gantt-footer { scrollbar-width: none; }
.toolbar::-webkit-scrollbar, .gantt-footer::-webkit-scrollbar { display: none; }
.right-inner { position: relative; }
.month-band {
  position: sticky; top: 0; z-index: 3;
  height: ${Mt}px; display: flex;
  background: var(--plot-surface);
  border-bottom: 1px solid var(--plot-grid);
  font-size: 10px; font-weight: 700;
}
.month-cell {
  border-right: 1px solid var(--plot-grid);
  display: flex; align-items: center;
  white-space: nowrap; flex: none;   /* overflow:visible — sticky 라벨이 스크롤을 따라오게 */
}
/* 현재 달 라벨이 뷰포트 왼쪽에 붙어 따라오다가, 다음 달에 밀려나는 sticky */
.month-label { position: sticky; left: 8px; padding: 0 8px; }
.scale-header {
  position: sticky; top: ${Mt}px; z-index: 3;
  height: ${Ti}px;
  background: var(--plot-surface);
  border-bottom: 1px solid var(--plot-border);
  display: flex;
  font-size: 10px; color: var(--plot-text-mute);
  font-variant-numeric: tabular-nums;
}
.day-cell {
  border-right: 1px solid var(--plot-grid);
  height: 100%;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 1px; flex: none;
}
.day-cell .dow { font-size: 9px; opacity: 0.65; }
.week-cell { font-size: 10px; font-variant-numeric: tabular-nums; color: var(--plot-text-mute); }
.week-cell.today { color: var(--plot-today); font-weight: 700; }
.grid-line.grid-month { stroke: var(--plot-border); stroke-width: 1.2; }
.day-cell.today { color: var(--plot-today); font-weight: 700; }
.day-cell.weekend { background: var(--plot-weekend); }
.day-cell.holiday { background: var(--plot-holiday); }
.chart-body { position: relative; }
.chart-svg { display: block; }
.chart-svg text { user-select: none; }

/* ── 행 hover 연동 ── */
.row-hit { fill: transparent; }
.row-hit.hl { fill: var(--plot-row-hover); }
.row-hit.selected { fill: rgba(124,92,255,0.05); }
/* 부모 hover 시 서브트리 연한 영역 (좌 리스트 + 우 차트) */
/* 하위 행 전체 틴트는 제거 — 점선 리전(.subtree-region)이 범위를 이미 표현 */

/* ── 태스크 바 (파스텔 + 상태별 색상 분류) ──
   각 상태 클래스가 --bar-c 하나를 지정 → 외곽은 연한 파스텔(투명도),
   내부(진행)는 같은 색을 진하게. YAML color 지정 시 --bar-c 인라인으로 덮어씀. */
.bar { cursor: grab; touch-action: none; --bar-c: #9aa7b4; }
.bar.st-done      { --bar-c: #5ec79b; }  /* 완료 — 그린 */
.bar.st-progress  { --bar-c: #82a8f4; }  /* 진행 — 블루 */
.bar.st-overdue   { --bar-c: #f09a6c; }  /* 지연 — 오렌지 (크리티컬 빨강과 분리) */
.bar.st-upcoming  { --bar-c: #9aa7b4; }  /* 예정 — 슬레이트 (보라=선택/인터랙션 전용) */
.bar.st-hold      { --bar-c: #f3c06b; }  /* 보류 — 앰버 (수동 지정 전용 · 보라=UI 강조색과 분리) */
.bar.grabbing { cursor: grabbing; }
/* 바 hover — 살짝 부풀어 오르는 확대 (기간 판독엔 영향 없는 세로 확대) */
.bar .bar-outer, .bar .bar-inner, .bar .bar-bg {
  transition: transform 0.15s cubic-bezier(0.32,0.72,0,1), fill-opacity 0.12s;
  transform-box: fill-box; transform-origin: center;
}
.bar:hover .bar-outer, .bar:hover .bar-inner, .bar:hover .bar-bg { transform: scaleY(1.16); }
/* 불투명 언더레이 — 반투명 파스텔 바(0.26) 아래에 깔아 배경(오늘선·오늘띠·그리드·화살표)이
   바를 통과해 비쳐 보이지 않게 한다. 파스텔 톤은 이 위에 얹혀 그대로 유지. */
.bar-bg { fill: var(--plot-surface); stroke: none; pointer-events: none; rx: 3; }
.bar:hover .bar-outer { fill-opacity: 0.42; }
/* 앞뒤 리사이즈 엣지 — 커서가 그 존에 들어오면 보라 스트립으로 점등 */
.bar-handle { transition: fill-opacity 0.12s; rx: 2px; }
.bar-handle.hot { fill: var(--plot-bar-fill); fill-opacity: 0.35; }
/* 진척 노치 — 존에 들어오면 확대 + % 라벨 */
.prog-notch { transition: transform 0.12s cubic-bezier(0.32,0.72,0,1); transform-box: fill-box; transform-origin: center; }
.prog-notch.hot { transform: scale(1.6); }
.notch-tip {
  font-size: 9.5px; font-weight: 800; fill: var(--plot-bar-fill);
  paint-order: stroke; stroke: var(--plot-surface); stroke-width: 3px;
  pointer-events: none; text-anchor: middle;
}
/* hover 시 드러나는 조작 힌트 — 엣지 그립(기간 조절), 무브 그립(통째 이동) */
.edge-grip {
  stroke: var(--plot-bar-fill); stroke-width: 2; stroke-linecap: round;
  opacity: 0; transition: opacity 0.12s, transform 0.15s cubic-bezier(0.32,0.72,0,1);
  transform-box: fill-box; transform-origin: center; pointer-events: none;
}
.bar:hover .edge-grip { opacity: 0.65; transform: scaleY(1.16); }
.move-grip {
  stroke: #fff; stroke-width: 2.2; stroke-linecap: round; stroke-dasharray: 0.1 4.3;
  fill: none; opacity: 0; transition: opacity 0.12s; pointer-events: none;
  filter: drop-shadow(0 0 1.5px rgba(0,0,0,0.55));
}
.bar:hover .move-grip { opacity: 0.95; }
/* 링크 연결점 — 존에 들어오면 확대 */
.link-dot { transition: transform 0.12s cubic-bezier(0.32,0.72,0,1); transform-box: fill-box; transform-origin: center; }
.link-dot.hot { transform: scale(1.55); }
/* 연한 채움 + 또렷한 색 테두리로 확실히 구분 (fill/stroke 투명도 분리) */
.bar-outer { fill: var(--bar-c); fill-opacity: 0.26; stroke: var(--bar-c); stroke-opacity: 0.85; stroke-width: 1.25; rx: 3; }
.bar-inner { fill: var(--bar-c); fill-opacity: 0.92; rx: 3; }
/* 긴급(크리티컬)은 색을 덮지 않고 깔끔한 빨강 테두리 + 은은한 글로우로 → 상태색과 공존, 크루드하지 않게 */
.bar.critical .bar-outer { stroke: #ea6a6a; stroke-width: 1.75; stroke-opacity: 1; }
.bar.critical { filter: drop-shadow(0 0 3px rgba(234,106,106,0.45)); }
/* 선택/액티브 아웃라인 — 티얼 accent(보라 지양). selected·active·크리티컬 조합 모두 동일 두께로 통일해 크기 불일치 제거 */
.bar.selected .bar-outer, .bar.active .bar-outer { stroke: var(--plot-accent); stroke-width: 2; stroke-opacity: 0.95; }
.bar.critical.selected .bar-outer, .bar.critical.active .bar-outer { stroke: #ea6a6a; stroke-width: 2; stroke-opacity: 1; }
.bar-handle { fill: transparent; cursor: ew-resize; }
/* 바 이름 라벨 — 안(in)은 진하게+흰 외곽, 밖(out)은 뮤트 */
.bar-name {
  font-size: 10.5px; dominant-baseline: middle; pointer-events: none;
  paint-order: stroke; stroke: var(--plot-surface); stroke-width: 2.5px;
}
.bar-name.out { fill: var(--plot-text-mute); }
/* 부모 hover 시 하위영역 전체를 감싸는 점선 리전 (차트) */
.subtree-region {
  fill: none; stroke: var(--plot-bar-fill); stroke-opacity: 0.5;
  stroke-width: 1.3; stroke-dasharray: 6 4; stroke-linecap: round;
  pointer-events: none;
}
/* 진행 노치 투명 히트존 — 액티브(선택) 바에서만 활성 (평상시·hover엔 화살표/행 클릭을 가로채지 않게). 활성 규칙은 .bar.active 참조 */
.prog-notch-hit { fill: transparent; cursor: ew-resize; pointer-events: none; }

/* 종료 미정(open) — 오른쪽 변 없는 흐릿한 네모 + 끝 물결 페이드 (상태 열은 그대로 도트) */
.bar.open .bar-outer { fill-opacity: 0.13; stroke-opacity: 0.5; }
/* 베이스라인(계획) — 실제 바 아래 얇은 회색 막대. 지연 시 코랄 */
.baseline-bar { fill: var(--plot-text-mute); opacity: 0.4; pointer-events: none; }
.bar-label { font-size: 10.5px; fill: var(--plot-text-mute); dominant-baseline: middle; pointer-events: none; }

/* 좌측 행 상태 도트 + 범례 스와치 공통 */
.st-dot { display: inline-block; width: 11px; height: 11px; border-radius: 50%; flex: none; background: #9aa7b4; box-shadow: inset 0 0 0 2px rgba(255,255,255,0.35); }
.st-dot-done { background: #5ec79b; }
.st-dot-progress { background: #82a8f4; }
.st-dot-overdue { background: #f09a6c; }
.st-dot-upcoming { background: #9aa7b4; }
.st-dot-hold { background: #f3c06b; }
/* 긴급 = 상태 도트에 부드러운 코랄 글로우 (딱딱한 링 X, 파스텔 팔레트와 조화) */
.st-dot.st-crit { box-shadow: inset 0 0 0 2px rgba(255,255,255,0.35), 0 0 0 1.5px #ea6a6a, 0 0 6px 1px rgba(234,106,106,0.5); }
.legend { display: flex; align-items: center; gap: 10px; font-size: 10.5px; color: var(--plot-text-mute); }
.legend .lg { display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; }
.legend .sw { width: 9px; height: 9px; border-radius: 2px; flex: none; }
.legend .sw.bl { background: var(--plot-text-mute); opacity: 0.55; height: 3.5px; border-radius: 2px; align-self: center; }
.legend .sw.crit { background: transparent; border: 1.6px solid var(--plot-critical); }

/* 링크 핸들 — 시각 원(.link-dot)과 넉넉한 투명 히트존(.link-handle)을 분리.
   바 '바깥'에 두어 우측 리사이즈 핸들과 히트가 겹치지 않게 한다. */
.link-dot {
  fill: var(--plot-surface);
  stroke: var(--plot-bar-fill);
  stroke-width: 1.5;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.12s;
}
.link-handle { fill: transparent; cursor: crosshair; }
.bar:hover .link-dot { opacity: 1; }
.bar.critical .link-dot { stroke: var(--plot-critical-fill); }
.bar.link-target .bar-outer { stroke: var(--plot-bar-fill); stroke-width: 2; opacity: 0.55; }
.bar.link-invalid .bar-outer { stroke: var(--plot-critical); stroke-width: 2; stroke-dasharray: 3 2; opacity: 0.7; }
:host(.link-bad) { cursor: not-allowed; }
.link-temp {
  fill: none;
  stroke: var(--plot-bar-fill);
  stroke-width: 1.6;
  stroke-dasharray: 5 3;
  pointer-events: none;
}

/* 장식 레이어(주말음영·그리드·행구분·오늘선)는 절대 포인터를 가로채면 안 된다.
   — 바/핸들 위를 덮으면 드래그·리사이즈·링크 생성이 조용히 삼켜진다. */
.deco { pointer-events: none; }
/* SVG deco — var() 는 attribute 로 안 먹으므로 반드시 class+CSS (다크 토큰 추종) */
.weekend-strip { fill: var(--plot-weekend); }
.holiday-strip { fill: var(--plot-holiday); }
.grid-line { stroke: var(--plot-grid); }
.today-line { stroke: var(--plot-today); stroke-opacity: 0.45; stroke-linecap: round; }

/* ── 의존성 화살표 ── */
.dep-path {
  fill: none;
  stroke: var(--plot-arrow);
  stroke-width: 1.2;
  stroke-linejoin: round;
  pointer-events: none;   /* 화살표도 바 위를 지날 수 있어 포인터 비활성 */
  transition: stroke 0.15s, stroke-width 0.15s, opacity 0.15s;
}
.dep-hit { fill: none; stroke: transparent; stroke-width: 8; pointer-events: stroke; cursor: pointer; }
/* 드래그 중에는 화살표를 흐리게(따라오는 rubber-band 어색함 제거) */
:host(.dragging-any) .dep-path { opacity: 0.1; transition: none; }
:host(.dragging-any) .dep-hit { pointer-events: none; }
/* 드래그 중(재부모=.reparenting · 바/링크 이동=.dragging-any) 다른 행·바의 hover 피드백 억제 —
   드롭 타깃 피드백(.drop-*)과 선택(.selected)만 남긴다. 밴드(.hl)·서브트리 리전은 JS(isDraggingAny)에서 차단. */
:host(.reparenting) .task-row:hover:not(.drop-target):not(.drop-child):not(.drop-before):not(.drop-after):not(.selected),
:host(.dragging-any) .task-row:hover:not(.selected) { background: transparent; }
:host(.dragging-any) .bar:hover .bar-outer,
:host(.dragging-any) .bar:hover .bar-inner,
:host(.dragging-any) .bar:hover .bar-bg { transform: none; }
:host(.dragging-any) .bar:hover:not(.selected):not(.active) .bar-outer { fill-opacity: 0.26; }
:host(.dragging-any) .bar:hover .edge-grip,
:host(.dragging-any) .bar:hover .move-grip,
:host(.dragging-any) .bar:hover .link-dot { opacity: 0; }
/* 드래그 중 커서가 지나는 좌측 셀의 hover 효과 억제 — 셀 배경이 밝아지거나(.cell-edit·name)
   상태 도트가 부풀어(scale) 링이 뜨는 게 드롭 피드백과 겹치는 문제(사용자 지적) 제거 */
:host(.dragging-any) .cell-edit:hover,
:host(.dragging-any) .name-text:hover { background: transparent; }
:host(.dragging-any) .cell-status:hover .st-dot,
:host(.dragging-any) .cell-status:hover .st-dot.st-crit,
:host(.dragging-any) .cell-status:hover .st-ms { transform: none; box-shadow: none; text-shadow: none; }
.dep-path.critical { stroke: var(--plot-arrow-critical); stroke-width: 1.4; }
/* hover 강조 = 굵기 대신 '흐름' — 점선이 출발점→도착점으로 흘러가는 애니메이션 */
.dep-path.hl {
  stroke: var(--plot-bar-fill); stroke-width: 1.5; stroke-opacity: 0.85;
  stroke-dasharray: 6 5; stroke-linecap: round;
  animation: dep-flow 0.8s linear infinite;
}
.dep-path.critical.hl { stroke: var(--plot-arrow-critical); }
@keyframes dep-flow { to { stroke-dashoffset: -11; } }
.dep-path.dim { opacity: 0.18; }
.dep-arrow { fill: var(--plot-arrow); }
.dep-arrow.critical { fill: var(--plot-arrow-critical); }

/* ── 팝오버 ── */
.popover {
  position: absolute; z-index: 20;
  min-width: 270px; max-width: 340px;
  background: var(--plot-surface);
  border: 1px solid var(--plot-border);
  border-radius: 8px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08);
  padding: 12px 14px;
  font-size: 12px;
  transform-origin: top left;
  animation: pop-in 160ms cubic-bezier(0.32, 0.72, 0, 1);
}
@keyframes pop-in {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}
.popover .p-title { font-size: 13.5px; font-weight: 600; margin-bottom: 6px; }
.popover .p-row { display: flex; gap: 8px; align-items: center; font-size: 11.5px; color: var(--plot-text-mute); margin-bottom: 4px; }
.popover .p-row > span:first-child { width: 44px; flex: none; }
.popover .p-row b { color: var(--plot-text); font-weight: 500; font-variant-numeric: tabular-nums; }
.popover .p-progress { flex: 1; accent-color: var(--plot-bar-fill); height: 4px; cursor: pointer; }
.popover .p-progress-val { width: 38px; text-align: right; flex: none; }
.popover .link-types { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; flex: 1; }
.popover .lt {
  border: 1px solid var(--plot-border); background: var(--plot-surface);
  color: var(--plot-text-mute); border-radius: 5px; padding: 2px 7px;
  font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.12s;
}
.popover .lt:hover { border-color: var(--plot-bar-fill); }
.popover .lt.on { background: var(--plot-bar-fill); color: #fff; border-color: var(--plot-bar-fill); }
.popover .p-lag { border: 1px solid var(--plot-border); border-radius: 5px; padding: 1px 5px; font: inherit; font-size: 11.5px; }
.popover .lt-del {
  border: 1px solid rgba(229,72,77,0.4); background: rgba(229,72,77,0.06);
  color: var(--plot-critical); border-radius: 5px; padding: 3px 9px;
  font-size: 11px; font-weight: 600; cursor: pointer; width: 100%;
}
.popover .lt-del:hover { background: rgba(229,72,77,0.14); }
.popover .p-close {
  position: absolute; top: 6px; right: 6px;
  width: 22px; height: 22px;
  border: 0; background: transparent;
  color: var(--plot-text-mute); cursor: pointer; border-radius: 4px;
  font-family: inherit;
}
.popover .p-close:hover { background: rgba(0,0,0,0.05); }

/* ── 드래그 툴팁 ── */
.drag-tip {
  position: absolute; pointer-events: none; z-index: 30;
  background: #18181b; color: #fafafa;
  font-size: 10.5px; font-weight: 500;
  padding: 4px 8px; border-radius: 4px;
  white-space: nowrap;
  transform: translate(-50%, -120%);
  font-variant-numeric: tabular-nums;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.empty { padding: 32px; text-align: center; color: var(--plot-text-mute); font-size: 12px; }
.empty-cta {
  border: 1px solid var(--plot-bar-fill); background: var(--plot-bar-fill); color: #fff;
  border-radius: 8px; padding: 8px 16px; font-size: 12.5px; font-weight: 700; cursor: pointer;
}
.empty-cta:hover { filter: brightness(1.08); }

/* ── hover 툴팁 ── */
.gantt-tip {
  position: absolute; z-index: 65; pointer-events: none;
  background: var(--plot-surface); color: var(--plot-text); font-size: 11px; line-height: 1.5;
  border: 1px solid var(--plot-border);
  padding: 7px 10px; border-radius: 8px; box-shadow: 0 6px 22px rgba(0,0,0,0.16);
  max-width: 230px; animation: fade-in 120ms ease;
}
.gantt-tip .tip-title { font-weight: 700; font-size: 12px; margin-bottom: 3px; display: flex; align-items: center; gap: 5px; }
.gantt-tip .tip-title .st-dot { box-shadow: none; }
.gantt-tip .tip-crit { color: var(--plot-critical); font-weight: 600; }
.gantt-tip .tip-note { margin-top: 3px; color: var(--plot-text-mute); font-style: italic; }

/* ── 스낵바 (하단 중앙) ── */
.gantt-toast {
  position: absolute; left: 50%; bottom: 14px; transform: translateX(-50%);
  z-index: 70; display: flex; align-items: center; gap: 10px;
  background: #1f2028; color: #f4f4f6; font-size: 12px; font-weight: 500;
  padding: 8px 14px; border-radius: 9px; box-shadow: 0 8px 28px rgba(0,0,0,0.3);
  animation: toast-in 180ms cubic-bezier(0.32,0.72,0,1); max-width: 80%;
}
@keyframes toast-in { from { transform: translate(-50%, 8px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
.gantt-toast.warn { background: #7c2d12; }
.gantt-toast.error { background: #7f1d1d; }
.gantt-toast .gt-undo {
  border: 1px solid rgba(255,255,255,0.35); background: transparent; color: #fff;
  border-radius: 6px; padding: 3px 9px; font-size: 11px; font-weight: 700; cursor: pointer; flex: none;
}
.gantt-toast .gt-undo:hover { background: rgba(255,255,255,0.15); }
.parse-err { padding: 12px 16px; background: rgba(229,72,77,0.08); color: var(--plot-critical); font-size: 11.5px; }

/* ── 퍼센트 정밀 조절 노치 (bar-inner 경계, 액티브 바에서만 노출) ── */
.prog-notch {
  fill: var(--plot-surface); stroke: var(--bar-c, var(--plot-bar-fill)); stroke-width: 1.5;
  opacity: 0; cursor: ew-resize; transition: opacity 0.12s;
  pointer-events: none;   /* 비활성 바의 '안 보이는' 노치가 클릭되어 진척률이 바뀌는 것 방지(히트존과 동일 게이트) */
}
/* 액티브(클릭) 바 — 퍼센트 조절 노치 노출(=조절 슬라이더) + 히트존 활성 + 살짝 강조. hover만으론 안 뜸 */
.bar.active .prog-notch { opacity: 1; r: 6; pointer-events: all; }
.bar.active .prog-notch-hit { pointer-events: all; }
/* 액티브 = selected 아웃라인(위에서 통일한 두께·색) + 은은한 글로우로만 강화 (두께는 건드리지 않음) */
.bar.active .bar-outer { filter: drop-shadow(0 0 3px var(--plot-accent-glow)); }
.bar.critical.active .bar-outer { filter: drop-shadow(0 0 3px rgba(234,106,106,0.45)); }
/* 조절 중엔 바 몸체만 확대 — 그룹 전체를 늘리면 % 글자가 세로로 왜곡됨 */
.bar.adjusting .bar-outer, .bar.adjusting .bar-inner { transform: scaleY(1.3); }
.bar.adjusting .bar-outer { stroke-width: 2; }
.prog-live {
  font-size: 11px; font-weight: 800; fill: var(--plot-text);
  dominant-baseline: middle; text-anchor: middle; pointer-events: none;
  paint-order: stroke; stroke: var(--plot-surface); stroke-width: 3px;
}
${Tr}
`, Br = `
.exp-name{font-size:12.5px;fill:var(--plot-text);dominant-baseline:middle;}
.exp-name.parent{font-weight:650;}
.exp-num{font-size:11px;fill:var(--plot-text-mute);dominant-baseline:middle;font-variant-numeric:tabular-nums;}
.exp-colhead{font-size:10px;font-weight:700;fill:var(--plot-text-mute);dominant-baseline:middle;}
.exp-sep{stroke:var(--plot-border);}
.exp-day{font-size:10px;text-anchor:middle;fill:var(--plot-text-mute);}
.exp-dow{font-size:8.5px;text-anchor:middle;fill:var(--plot-text-mute);opacity:0.7;}
.exp-month{font-size:10px;font-weight:700;fill:var(--plot-text);dominant-baseline:middle;}
.exp-ms{fill:#c08a2d;dominant-baseline:middle;}
`, jr = typeof HTMLElement < "u" ? HTMLElement : class {
}, ct = class ct extends jr {
  constructor() {
    super(), this.ir = null, this.scale = null, this.colW = Ps.day, this.zoom = 1, this.workdayMode = !1, this.searchTerm = "", this.sortKey = null, this.sortDir = "asc", this.filterAssignees = /* @__PURE__ */ new Set(), this.filterStatuses = /* @__PURE__ */ new Set(), this.cols = Os.map((t) => ({ ...t })), this.popEl = null, this.contextMenu = null, this.calendarPop = null, this.calendarCloser = null, this.subLayer = null, this.subLayerCloser = null, this.repositionPopover = null, this.toastEl = null, this.toastTimer = 0, this.barLabelsOn = !0, this.baselineOn = !1, this.resourceOpen = !1, this.parseErrors = [], this.cpm = null, this.leftOverride = null, this.people = [], this.autoScrolled = !1, this.rangeStart = null, this.rangeEnd = null, this.extending = !1, this.suppressExtendUntil = 0, this.selection = /* @__PURE__ */ new Set(), this.selAnchor = null, this.activeBarId = null, this.progressStep = 0.05, this.defaultTreeDepth = "all", this.undoStack = [], this.redoStack = [], this.pendingSnap = null, this.collapsed = /* @__PURE__ */ new Set(), this.visList = [], this.visIdx = /* @__PURE__ */ new Map(), this.rows = [], this.groupBy = "none", this.viewMode = "gantt", this.colsBackup = null, this.calMonth = null, this.reparentDrag = null, this.dragChipEl = null, this.suppressRowClick = !1, this.winStart = 0, this.winEnd = 1 / 0, this.winRaf = 0, this.zoomRaf = 0, this.zoomPending = null, this.keyHandler = (t) => {
      if (ct.active && ct.active !== this && !t.composedPath().includes(this)) return;
      if (t.key === "Escape") {
        if (this.reparentDrag?.moved) {
          this.cancelReparent();
          return;
        }
        this.closeCalendar(), this.cancelLinkDrag(), this.closeContextMenu(), this.closePopover(), (this.selection.size || this.activeBarId) && (this.selection.clear(), this.activeBarId = null, this.refreshSelectionUI());
        return;
      }
      const e = t.metaKey || t.ctrlKey, s = t.composedPath?.()[0] ?? t.target, i = !!s && (s.tagName === "INPUT" || s.tagName === "TEXTAREA" || s.isContentEditable), n = !!this.popEl || !!this.calendarPop;
      if (e && (t.key === "z" || t.key === "Z")) {
        if (i) return;
        t.preventDefault(), t.shiftKey ? this.redo() : this.undo();
        return;
      }
      if (!(i || n)) {
        if (this.activeBarId && (t.key === "ArrowLeft" || t.key === "ArrowRight" || t.key === "ArrowUp" || t.key === "ArrowDown")) {
          const o = this.ir?.tasks.find((a) => a.id === this.activeBarId);
          if (o) {
            t.preventDefault(), t.key === "ArrowUp" || t.key === "ArrowDown" ? this.nudgeProgress(o, t.key === "ArrowUp" ? 1 : -1) : t.shiftKey ? this.nudgeDuration(o, t.key === "ArrowRight" ? 1 : -1) : this.nudgeMove(o, t.key === "ArrowRight" ? 1 : -1);
            return;
          }
        }
        if ((t.key === "Delete" || t.key === "Backspace") && this.selection.size && (t.preventDefault(), this.deleteSelected()), t.key === "Tab" && this.selection.size === 1) {
          t.preventDefault();
          const o = [...this.selection][0];
          this.moveLevel(o, t.shiftKey ? "out" : "in");
        }
        if ((t.key === "ArrowDown" || t.key === "ArrowUp") && this.selection.size) {
          t.preventDefault();
          const o = this.visList, a = o.findIndex((p) => p.id === this.selAnchor), l = Math.max(0, Math.min(o.length - 1, (a < 0 ? 0 : a) + (t.key === "ArrowDown" ? 1 : -1))), c = o[l];
          c && (this.selection = /* @__PURE__ */ new Set([c.id]), this.selAnchor = c.id, this.refreshSelectionUI(), this.root.querySelector(`.task-row[data-task-id="${st(c.id)}"]`)?.scrollIntoView?.({ block: "nearest" }), this.scrollToTask(c.id));
          return;
        }
        t.key === "Enter" && this.selection.size === 1 && (t.preventDefault(), this.openDetail([...this.selection][0]));
      }
    }, this.markActive = () => {
      ct.active = this;
    }, this.onDocPointerDown = (t) => {
      t.composedPath().includes(this) || (this.contextMenu && this.closeContextMenu(), this.resourceOpen && (this.resourceOpen = !1, this.renderPreserve()));
    }, this.srcSeq = 0, this.dragging = null, this.linkDrag = null, this.tipEl = null, this.tipTimer = 0, this.root = this.attachShadow({ mode: "open" });
  }
  // 차트 바 옆 이름 라벨 표시
  /** storage-key 속성이 있으면 보기 설정(주말제외·라벨·계획·그룹·테마·컬럼)을 localStorage에 영속화 */
  loadViewState() {
    const t = this.getAttribute("storage-key");
    if (t)
      try {
        const e = JSON.parse(localStorage.getItem(t + ":view") || "null");
        if (!e) return;
        if (typeof e.workday == "boolean" && (this.workdayMode = e.workday), typeof e.labels == "boolean" && (this.barLabelsOn = e.labels), typeof e.progStep == "number" && e.progStep > 0 && e.progStep <= 1 && (this.progressStep = e.progStep), (e.treeDepth === "all" || typeof e.treeDepth == "number" && e.treeDepth >= 1 && e.treeDepth <= 6) && (this.defaultTreeDepth = e.treeDepth), (e.groupBy === "assignee" || e.groupBy === "none") && (this.groupBy = e.groupBy), typeof e.theme == "string" && this.setAttribute("theme", e.theme), Array.isArray(e.cols) && e.cols.length) {
          const s = new Map(Be.map((o) => [o.key, o.label])), i = Os.find((o) => o.key === "days")?.width ?? 44, n = e.cols.filter((o) => s.has(o.key)).map((o) => ({ key: o.key, label: s.get(o.key), width: o.key === "days" ? i : Number(o.width) || 80 }));
          if (n.length && !n.some((o) => o.key === "days")) {
            const o = n.findIndex((l) => l.key === "duration"), a = { key: "days", label: "일수", width: i };
            o >= 0 ? n.splice(o + 1, 0, a) : n.push(a);
          }
          n.length && (this.cols = n);
        }
      } catch {
      }
  }
  saveViewState() {
    const t = this.getAttribute("storage-key");
    if (t)
      try {
        localStorage.setItem(t + ":view", JSON.stringify({
          workday: this.workdayMode,
          labels: this.barLabelsOn,
          groupBy: this.groupBy,
          theme: this.getAttribute("theme") || "light",
          progStep: this.progressStep,
          treeDepth: this.defaultTreeDepth,
          cols: this.cols.map((e) => ({ key: e.key, width: e.width }))
        }));
      } catch {
      }
  }
  connectedCallback() {
    this.loadViewState(), document.addEventListener("keydown", this.keyHandler), document.addEventListener("pointerdown", this.onDocPointerDown, !0), this.addEventListener("pointerdown", this.markActive, !0), ct.active = this;
    const t = (this.textContent || "").trim();
    t && !this.ir ? this.setSource(t) : this.render();
  }
  disconnectedCallback() {
    document.removeEventListener("keydown", this.keyHandler), document.removeEventListener("pointerdown", this.onDocPointerDown, !0), this.removeEventListener("pointerdown", this.markActive, !0), this.dragChipEl && (this.dragChipEl.remove(), this.dragChipEl = null), ct.active === this && (ct.active = null), this.tipTimer && (clearTimeout(this.tipTimer), this.tipTimer = 0), this.toastTimer && (clearTimeout(this.toastTimer), this.toastTimer = 0), this.winRaf && (cancelAnimationFrame(this.winRaf), this.winRaf = 0), this.zoomRaf && (cancelAnimationFrame(this.zoomRaf), this.zoomRaf = 0), this.zoomPending = null;
  }
  attributeChangedCallback(t, e, s) {
    if (t === "src" && s) {
      const i = ++this.srcSeq;
      fetch(s).then((n) => {
        if (!n.ok) throw new Error(`HTTP ${n.status}`);
        return n.text();
      }).then((n) => {
        i === this.srcSeq && this.setSource(n);
      }).catch((n) => this.dispatchEvent(new CustomEvent("loaderror", { detail: { src: s, error: String(n) } })));
    }
    t === "scale" && ["day", "week", "month"].includes(s) && this.setScale(s);
  }
  // ───────────────────────── 데이터
  /** 현재 파싱된 IR (읽기 전용 관점 — 소비자가 private ir에 의존하지 않도록 공개) */
  get data() {
    return this.ir;
  }
  /** 마지막 파싱 에러 목록 */
  get errors() {
    return this.parseErrors;
  }
  setSource(t) {
    const e = t.trim();
    if (e.startsWith("{"))
      try {
        this.applyResult(Ts(JSON.parse(e)));
        return;
      } catch (i) {
        this.applyResult({ ir: null, errors: [`JSON 문법 오류: ${i?.message ?? i}`], warnings: [] });
        return;
      }
    const s = /^gantt\s*$/m.test(e) && !/^\s*gantt\s*:/m.test(e) ? Kn(t) : Hn(t);
    this.applyResult(s);
  }
  /** JSON/JS 객체로 데이터 주입 — 즉시 반영. Vue 등 반응형 객체를 그대로 넘기기 좋음. */
  setData(t) {
    this.applyResult(Ts(t));
  }
  /** 프로퍼티 바인딩용 — `el.data = {...}` */
  set data(t) {
    this.setData(t);
  }
  applyResult(t) {
    if (this.parseErrors = t.errors, t.errors.length && (console.warn("[plot-line] parse errors:", t.errors), this.dispatchEvent(new CustomEvent("parseerror", { detail: { errors: t.errors } }))), t.ir) {
      this.ir = t.ir, j(t.ir), this.cpm = _(t.ir), this.workdayMode && this.applyWorkdaySnap(), this.cpm.cycles.length && console.warn("[plot-line] 순환 의존성:", this.cpm.cycles);
      const e = (t.ir.meta.today ?? /* @__PURE__ */ new Date()).getTime(), s = t.ir.tasks.flatMap((o) => [o.start.getTime(), o.end.getTime()]), i = Math.min(e, ...s.length ? s : [e]), n = Math.max(e, ...s.length ? s : [e]);
      this.rangeStart = new Date(i - 14 * D), this.rangeEnd = new Date(n + 45 * D);
    } else
      this.ir = null, this.cpm = null, this.rangeStart = this.rangeEnd = null;
    if (this.collapsed.clear(), this.ir && this.defaultTreeDepth !== "all") {
      const e = this.defaultTreeDepth;
      this.summaryLevels().forEach((s) => {
        s.lv >= e && this.collapsed.add(s.id);
      });
    }
    this.undoStack = [], this.redoStack = [], this.selection.clear(), this.activeBarId = null, this.autoScrolled = !1, this.winStart = 0, this.winEnd = 1 / 0, this.render();
  }
  setYaml(t) {
    this.setSource(t);
  }
  /** 현재 차트(UI 편집 반영)를 YAML로 — 저장·내보내기·드로어 동기의 기반 */
  getSource() {
    return this.ir ? Ar(this.ir) : "";
  }
  setScale(t) {
    const e = this.colW;
    if (this.colW = Ps[t], !this.ir) return;
    const s = this.root.querySelector(".right");
    if (s && e !== this.colW) {
      const i = (s.scrollLeft + s.clientWidth / 2) / e, n = s.scrollTop;
      this.autoScrolled = !0, this.render();
      const o = this.root.querySelector(".right");
      o && (o.scrollTop = n, o.scrollLeft = Math.max(0, i * this.colW - o.clientWidth / 2));
    } else
      this.renderPreserve();
  }
  get unit() {
    return je(this.colW);
  }
  get todayDate() {
    return this.ir?.meta.today ?? /* @__PURE__ */ new Date();
  }
  /** 검색어 매칭 태스크 id (이름·담당자, 대소문자 무시) */
  searchMatchIds() {
    const t = this.searchTerm.trim().toLowerCase();
    return !t || !this.ir ? [] : this.ir.tasks.filter(
      (e) => e.name.toLowerCase().includes(t) || (e.assignee ?? "").toLowerCase().includes(t)
    ).map((e) => e.id);
  }
  applySearch(t) {
    this.searchTerm = t;
    const e = new Set(this.searchMatchIds()), s = e.size > 0;
    this.root.querySelectorAll(".task-row").forEach((n) => {
      const o = n, a = e.has(o.dataset.taskId);
      o.classList.toggle("search-hit", s && a), o.classList.toggle("search-dim", s && !a);
    }), this.root.querySelectorAll(".bar").forEach((n) => {
      const o = n;
      o.classList.toggle("search-dim", s && !e.has(o.dataset.taskId));
    });
    const i = this.root.querySelector(".search-count");
    if (i) i.textContent = String(e.size);
    else if (s) {
      const n = this.root.querySelector(".gantt-search");
      if (n) {
        const o = document.createElement("span");
        o.className = "search-count", o.textContent = String(e.size), n.appendChild(o);
      }
    }
    if (s) {
      const n = [...e][0];
      this.root.querySelector(`.task-row[data-task-id="${st(n)}"]`)?.scrollIntoView?.({ block: "nearest" }), this.scrollToTask(n);
    }
  }
  /** 작업일 모드일 때 rescheduleFrom 에 넘길 주말/휴일 스냅 옵션 */
  rescheduleOpts() {
    if (!this.workdayMode || !this.ir) return;
    const { workdays: t, holidays: e } = this.ir.meta;
    return { snapStart: (s) => ze(s, t, e) };
  }
  /** 주말/휴일 제외 켜는 즉시 — 리프 태스크 시작을 다음 근무일로 밀어 전체 재정렬(기간 길이 유지).
   *  이후 후행 자동배치·잠금 벽 클램프·롤업·CPM 재계산. */
  applyWorkdaySnap() {
    if (!this.ir) return;
    const { workdays: t, holidays: e } = this.ir.meta, s = /* @__PURE__ */ new Set();
    for (const i of this.ir.tasks) {
      if (Y(this.ir, i.id)) continue;
      const n = ze(i.start, t, e);
      if (n.getTime() !== i.start.getTime()) {
        const o = n.getTime() - i.start.getTime();
        i.start = n, i.end = new Date(i.end.getTime() + o), i.duration = i.end.getTime() - i.start.getTime(), s.add(i.id);
      }
    }
    mt(this.ir, s.size ? s : new Set(this.ir.tasks.map((i) => i.id)), this.rescheduleOpts()), this.clampToLocks(), j(this.ir), this.cpm = _(this.ir);
  }
  /** 주말/휴일 제외 토글 (툴바·설정 공용). 켤 때 전체 재정렬. */
  toggleWorkday() {
    this.workdayMode = !this.workdayMode, this.workdayMode && (this.pushUndo(), this.applyWorkdaySnap()), this.toast(this.workdayMode ? "주말·휴일 제외 — 주말/휴일 칸을 숨기고 근무일로 재정렬" : "달력일 모드 — 모든 날짜 표시"), this.saveViewState(), this.autoScrolled = !1, this.render();
  }
  /** 줌 반영 행 높이 (차트 전체 확대/축소의 세로 축) */
  get rowH() {
    return Math.round(Cr * this.zoom);
  }
  toggleColumn(t) {
    this.suppressExtendUntil = Date.now() + 300;
    const e = this.cols.findIndex((a) => a.key === t);
    if (e >= 0) {
      if (this.cols.length === 1) return;
      this.cols.splice(e, 1);
    } else {
      const a = Be.find((l) => l.key === t)?.label ?? t;
      this.cols.push({ key: t, label: a, width: t === "name" ? 200 : 80 });
    }
    this.leftOverride = null;
    const s = this.root.querySelector(".right"), i = s && this.scale ? this.dateAtX(this.scale, s.scrollLeft) : null, n = s?.scrollTop ?? 0;
    this.autoScrolled = !0, this.render();
    const o = this.root.querySelector(".right");
    if (o && this.scale && (o.scrollTop = n, i)) {
      const a = Math.max(0, o.scrollWidth - o.clientWidth);
      o.scrollLeft = Math.max(0, Math.min(a, z(this.scale, i)));
    }
  }
  /** x(px) → 그 위치의 날짜. xAt의 역함수. 압축축(주말제외)은 셀 인덱스, 아니면 원점 선형. */
  dateAtX(t, e) {
    if (t.workdaysOnly) {
      const s = Math.max(0, Math.min(t.cells.length - 1, Math.round(e / t.colWidth)));
      return t.cells[s]?.date ?? t.originDate;
    }
    return new Date(t.originDate.getTime() + e / t.colWidth * D);
  }
  criticalSet() {
    const t = /* @__PURE__ */ new Set();
    if (!this.ir) return t;
    for (const e of this.ir.tasks) e.critical && t.add(e.id);
    return t;
  }
  /** 지연 태스크 id (ir.tasks 원본 순서 = 트리 순서). 마일스톤·부모 제외. */
  overdueTaskIds() {
    if (!this.ir) return [];
    const t = this.todayDate;
    return this.ir.tasks.filter((e) => !e.milestone && !Y(this.ir, e.id) && V(e, t) === "overdue").map((e) => e.id);
  }
  get leftTotal() {
    const t = this.leftOverride ?? this.cols.reduce((i, n) => i + n.width, 0) + Xe + 8, e = this.clientWidth || this.getBoundingClientRect().width || 0, s = e - 6 - 240;
    return e > 0 && s > 120 && t > s ? s : t;
  }
  get virtOn() {
    return this.visList.length > Ir;
  }
  /** 렌더 시작 시 행 모델(그룹 헤더+태스크)·인덱스 갱신 */
  refreshVisible() {
    let t = this.ir ? Zn(this.ir, this.collapsed) : [];
    if (this.ir && (this.filterAssignees.size || this.filterStatuses.size)) {
      const e = this.todayDate, s = lr(this.ir, (i) => !(this.filterAssignees.size && !(i.assignee?.trim() ? i.assignee.split(",").map((o) => o.trim()) : ["미지정"]).some((o) => this.filterAssignees.has(o)) || this.filterStatuses.size && !this.filterStatuses.has(V(i, e))));
      t = t.filter((i) => s.has(i.id));
    }
    if (this.ir && this.groupBy === "assignee") {
      const e = /* @__PURE__ */ new Map();
      for (const o of t) {
        const a = o.assignee?.trim() || "미지정";
        e.has(a) || e.set(a, []), e.get(a).push(o);
      }
      const s = (o) => o.reduce((a, l) => a + (l.milestone ? 0 : Math.max(0, l.end.getTime() - l.start.getTime())), 0), i = [...e.entries()].sort((o, a) => s(a[1]) - s(o[1])), n = [];
      for (const [o, a] of i) {
        n.push({ group: { label: o, count: a.length, days: Math.round(s(a) / D * 10) / 10 } });
        for (const l of a) n.push({ task: l });
      }
      this.rows = n;
    } else
      this.rows = t.map((e) => ({ task: e }));
    this.visList = this.rows.filter((e) => e.task).map((e) => e.task), this.visIdx = /* @__PURE__ */ new Map(), this.rows.forEach((e, s) => {
      e.task && this.visIdx.set(e.task.id, s);
    });
  }
  /** 좌측 헤더 클릭 정렬 — 형제 내 안정 정렬(계층 보존), 같은 키=asc/desc 토글. 파괴적+undo. */
  applySort(t) {
    this.ir && (this.sortKey === t ? this.sortDir = this.sortDir === "asc" ? "desc" : "asc" : (this.sortKey = t, this.sortDir = "asc"), this.pushUndo(), this.ir.tasks = ar(this.ir, t, this.sortDir), j(this.ir), this.cpm = _(this.ir), this.renderPreserve(), this.toast(`${qr[t]} ${this.sortDir === "asc" ? "오름차순" : "내림차순"} 정렬`, "info", !0));
  }
  /** 툴바 필터 토글 — 다중선택(뷰 전용, undo 안 함). v='' 이면 전체 해제. */
  toggleFilter(t, e) {
    const s = t === "assignee" ? this.filterAssignees : this.filterStatuses;
    e === "" ? s.clear() : s.has(e) ? s.delete(e) : s.add(e), this.selAnchor = null, this.keepPopoverAcross(() => this.renderPreserve());
    const i = this.popEl;
    i?.classList.contains("menu-pop") && this.renderFilterMenu(t, i);
  }
  /** 필터 드롭다운용 담당자 목록 — 복수 담당자 세트는 개별 담당자로 분해 (미지정 포함, 중복 제거) */
  assigneeOptions() {
    if (!this.ir) return [];
    const t = /* @__PURE__ */ new Set();
    for (const e of this.ir.tasks) {
      if (e.milestone) continue;
      const s = (e.assignee ?? "").split(",").map((i) => i.trim()).filter(Boolean);
      if (!s.length) {
        t.add("미지정");
        continue;
      }
      for (const i of s) t.add(i);
    }
    return [...t].sort((e, s) => e === "미지정" ? 1 : s === "미지정" ? -1 : e.localeCompare(s, "ko"));
  }
  /** 트리 접기/펼치기 토글 */
  toggleCollapse(t) {
    this.collapsed.has(t) ? this.collapsed.delete(t) : this.collapsed.add(t), this.renderPreserve();
  }
  /** 요약 태스크들의 (id, 트리 레벨) — 레벨 1 = 루트 */
  summaryLevels() {
    if (!this.ir) return [];
    const t = new Map(this.ir.tasks.map((s) => [s.id, s])), e = (s) => {
      let i = 1, n = s;
      for (; n?.parentId && (n = t.get(n.parentId), !(!n || (i++, i > 12))); )
        ;
      return i;
    };
    return this.ir.tasks.filter((s) => Y(this.ir, s.id)).map((s) => ({ id: s.id, lv: e(s) }));
  }
  /** 트리 실제 최대 깊이 — 잎 포함 (마지막 칩 = 전부 보임). 들여쓰기 한계 9 캡 */
  treeMaxLevel() {
    if (!this.ir) return 1;
    const t = new Map(this.ir.tasks.map((s) => [s.id, s]));
    let e = 1;
    for (const s of this.ir.tasks) {
      let i = 1, n = s;
      for (; n?.parentId && (n = t.get(n.parentId), !(!n || (i++, i > 9))); )
        ;
      i > e && (e = i);
    }
    return Math.min(9, e);
  }
  /** 트리를 n단계까지만 펼침 — 레벨 ≥ n 요약은 접고, < n 은 펼침. 'all' = 모두 펼침 */
  setTreeDepth(t) {
    if (!this.ir) return;
    const e = this.summaryLevels();
    t === "all" ? this.collapsed.clear() : e.forEach((s) => {
      s.lv >= t ? this.collapsed.add(s.id) : this.collapsed.delete(s.id);
    }), this.renderPreserve();
  }
  /** 재렌더를 거치며 열린 팝오버(레이어)를 파괴하지 않고 같은 엘리먼트로 유지 — 깜빡임 방지.
   *  render()는 팝오버를 닫지 않고 innerHTML 교체로 분리만 시키므로, 같은 노드를 도로 붙인다.
   *  (인라인 left/top이 보존되고 앵커는 고정 UI라 위치도 그대로 유효) */
  keepPopoverAcross(t) {
    const e = this.popEl, s = this.repositionPopover;
    if (!e) {
      t();
      return;
    }
    const i = e.previousElementSibling?.classList.contains("dd-backdrop") ? e.previousElementSibling : null;
    if (e.style.animation = "none", t(), !e.isConnected) {
      const n = this.root.querySelector(".root");
      n && (i && n.appendChild(i), n.appendChild(e)), this.popEl = e, this.repositionPopover = s;
    }
  }
  /** 트리 접기/펼치기 팝오버 — 이름 컬럼 헤더 계층 아이콘.
   *  선택형 메뉴가 아니라 '실행' 버튼들: 누르면 즉시 접히고/펼쳐지고 팝오버는 그대로 열려 있어
   *  단계를 연달아 눌러보며 조절할 수 있다. (기본 단계 영속 설정은 ⚙ 설정에) */
  openDepthPopover(t) {
    if (this.popEl?.isConnected && this.popEl.classList.contains("depth-pop")) {
      this.closePopover();
      return;
    }
    if (!this.ir || !this.summaryLevels().length) return;
    const s = this.treeMaxLevel(), a = this.openCellPopover(t, "depth-pop", `
      <div class="cp-title">트리 접기/펼치기 <button class="cp-x" data-x title="닫기">✕</button></div>
      <div class="depth-actions">
        <button data-depth="all"><svg class="depth-glyph" width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 3 L7 6 L10.5 3"/><path d="M3.5 7.8 L7 10.8 L10.5 7.8"/></svg>모두 펼치기</button>
        <button data-depth="1"><svg class="depth-glyph" width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 6 L7 3 L10.5 6"/><path d="M3.5 10.8 L7 7.8 L10.5 10.8"/></svg>모두 접기</button>
      </div>
      <div class="set-sect"><svg class="depth-glyph" width="13" height="13" viewBox="0 0 14 14" fill="currentColor"><rect x="0" y="1.5" width="13" height="1.8" rx="0.9"/><rect x="3" y="4.7" width="10" height="1.8" rx="0.9"/><rect x="6" y="7.9" width="7" height="1.8" rx="0.9"/></svg> 단계까지 펼치기</div>
      <div class="depth-lvls" style="grid-template-columns: repeat(${s}, 1fr)">
        ${Array.from({ length: s }, (l, c) => c + 1).map((l) => `<button class="depth-lvl" data-depth="${l}" title="${l}단계까지 펼치기">${l}</button>`).join("")}
      </div>
    `);
    a.style.minWidth = Math.max(196, s * 34 + 26) + "px", a.querySelector("[data-x]")?.addEventListener("click", () => this.closePopover()), a.querySelectorAll("[data-depth]").forEach((l) => l.addEventListener("click", () => {
      const c = l.dataset.depth;
      this.keepPopoverAcross(() => this.setTreeDepth(c === "all" ? "all" : Number(c)));
    }));
  }
  /** 기간 잠금 토글 (요약 태스크 전용). 잠그면 현재 종료일을 고정해 하위가 넘지 못하게 한다.
   *  드래그 커밋과 동일한 영속 경로(undo·rollup·CPM·taskchange)를 태워 새로고침/undo에도 유지. */
  toggleLock(t) {
    if (!this.ir) return;
    const e = this.ir.tasks.find((i) => i.id === t);
    if (!e || !Y(this.ir, t)) return;
    const s = this.takeSnapshot();
    e.locked = e.locked ? void 0 : !0, this.pushUndo(s), j(this.ir), this.cpm = _(this.ir), this.renderPreserve(), this.toast(e.locked ? `‘${e.name}’ 기간을 잠갔어요` : `‘${e.name}’ 기간 잠금을 풀었어요`, "info"), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t, task: e } }));
  }
  /** 레벨 이동 (들여/내어쓰기) */
  moveLevel(t, e) {
    if (!this.ir) return;
    const s = this.takeSnapshot();
    if (!(e === "in" ? tr(this.ir, t) : er(this.ir, t))) {
      e === "in" && this.toast("더 들여쓸 수 없어요 (최대 9단계 또는 첫 행)", "warn");
      return;
    }
    this.pushUndo(s);
    const n = this.clampToLocks();
    j(this.ir), this.cpm = _(this.ir), this.renderPreserve(), n > 0 && this.toast(`잠긴 종료일에 막혀 ${n}건이 조정됐어요`, "info", !0), this.dispatchEvent(new CustomEvent("taskmove", { detail: { taskId: t, dir: e } }));
  }
  // ───────────────────────── undo/redo
  takeSnapshot() {
    const t = this.ir;
    return {
      tasks: t.tasks.map((e) => ({
        id: e.id,
        name: e.name,
        start: e.start.getTime(),
        end: e.end.getTime(),
        duration: e.duration,
        progress: e.progress,
        parentId: e.parentId,
        assignee: e.assignee,
        color: e.color,
        critical: e.critical,
        milestone: e.milestone,
        open: e.open,
        locked: e.locked,
        note: e.note,
        status: e.status,
        baselineStart: e.baselineStart?.getTime(),
        baselineEnd: e.baselineEnd?.getTime()
      })),
      links: t.links.map((e) => ({ ...e }))
    };
  }
  pushUndo(t) {
    this.ir && (this.undoStack.push(t ?? this.takeSnapshot()), this.undoStack.length > Or && this.undoStack.shift(), this.redoStack = []);
  }
  /** 두 스냅샷이 실질적으로 동일한지 — no-op(완전 차단) 이동을 undo/토스트에서 걸러내는 데 사용.
   *  Snapshot 은 원시값(수치·문자열·undefined)만 담아 JSON 직렬화 비교로 충분·안전. */
  snapEqual(t, e) {
    return JSON.stringify(t) === JSON.stringify(e);
  }
  /** 스냅샷의 tasks/links 를 this.ir 로 되돌린다(데이터만 — 렌더·이벤트 없음).
   *  드래그 라이브 미리보기에서 매 프레임 원본 복원용으로 재사용(taskchange 이벤트 스팸 방지). */
  restoreTasks(t) {
    this.ir && (this.ir.tasks = t.tasks.map((e) => ({
      id: e.id,
      name: e.name,
      start: new Date(e.start),
      end: new Date(e.end),
      duration: e.duration,
      progress: e.progress,
      parentId: e.parentId,
      assignee: e.assignee,
      color: e.color,
      critical: e.critical,
      milestone: e.milestone,
      open: e.open,
      locked: e.locked,
      note: e.note,
      status: e.status,
      baselineStart: e.baselineStart != null ? new Date(e.baselineStart) : void 0,
      baselineEnd: e.baselineEnd != null ? new Date(e.baselineEnd) : void 0
    })), this.ir.links = t.links.map((e) => ({ ...e })));
  }
  applySnapshot(t) {
    if (!this.ir) return;
    this.restoreTasks(t);
    const e = new Set(this.ir.tasks.map((s) => s.id));
    this.selection = new Set([...this.selection].filter((s) => e.has(s))), this.activeBarId && !e.has(this.activeBarId) && (this.activeBarId = null), j(this.ir), this.cpm = _(this.ir), this.renderPreserve(), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: null, source: "snapshot" } }));
  }
  undo() {
    if (!this.undoStack.length) return;
    const t = this.undoStack.pop();
    this.redoStack.push(this.takeSnapshot()), this.applySnapshot(t);
  }
  redo() {
    if (!this.redoStack.length) return;
    const t = this.redoStack.pop();
    this.undoStack.push(this.takeSnapshot()), this.applySnapshot(t);
  }
  deleteSelected() {
    if (!this.ir || !this.selection.size) return;
    this.pushUndo();
    const t = this.selection;
    this.ir.tasks = this.ir.tasks.filter((e) => !t.has(e.id)), this.ir.links = this.ir.links.filter((e) => !t.has(e.source) && !t.has(e.target)), this.selection = /* @__PURE__ */ new Set(), this.activeBarId && t.has(this.activeBarId) && (this.activeBarId = null), j(this.ir), this.cpm = _(this.ir), this.renderPreserve(), this.dispatchEvent(new CustomEvent("taskchange", { detail: { deleted: [...t] } }));
  }
  // ───────────────────────── render
  renderPreserve() {
    const t = this.root.querySelector(".right"), e = t?.scrollTop ?? 0, s = t?.scrollLeft ?? 0;
    this.autoScrolled = !0, this.render();
    const i = this.root.querySelector(".right");
    i && (i.scrollTop = e, i.scrollLeft = s);
  }
  render() {
    if (!this.ir || !this.ir.tasks.length) {
      this.visList = [], this.visIdx = /* @__PURE__ */ new Map(), this.root.innerHTML = `<style>${Re}</style>
        <div class="root"><div class="toolbar"><div class="title">${this.parseErrors.length ? "⚠ 파싱 오류" : "간트"}</div></div>
        <div>${this.parseErrors.length ? `<div class="parse-err">${T(this.parseErrors.join(" · "))}</div>` : ""}
        <div class="empty">
          <div style="margin-bottom:12px">아직 태스크가 없어요.</div>
          <button class="empty-cta" data-action="add-first">＋ 첫 태스크 추가</button>
          <div style="margin-top:10px;font-size:11px;opacity:0.7">또는 소스 편집에서 YAML/Mermaid로 시작할 수 있어요.</div>
        </div></div></div>`, this.root.querySelector('[data-action="add-first"]')?.addEventListener("click", () => this.addTask());
      return;
    }
    j(this.ir), this.refreshVisible(), this.scale = As(this.ir, this.unit, this.colW, {
      origin: this.rangeStart ?? void 0,
      end: this.rangeEnd ?? void 0,
      workdaysOnly: this.workdayMode
    }), this.root.innerHTML = `
      <style>${Re}</style>
      <div class="root" style="--row-h:${this.rowH}px">
        ${this.renderToolbar()}
        <div class="body view-${this.viewMode}" style="--left-total:${this.leftTotal}px">
          ${this.viewMode === "board" ? this.renderBoard() : this.viewMode === "calendar" ? this.renderCalendarView() : this.viewMode === "list" ? this.renderLeft() : `${this.renderLeft()}<div class="splitter" data-role="splitter"></div>${this.renderRight()}`}
        </div>
        <div class="legend gantt-footer" aria-label="상태 색상 범례">
          <span class="lg"><span class="sw" style="background:#5ec79b"></span>완료</span>
          <span class="lg"><span class="sw" style="background:#82a8f4"></span>진행</span>
          <span class="lg"><span class="sw" style="background:#f09a6c"></span>지연</span>
          <span class="lg"><span class="sw" style="background:#9aa7b4"></span>예정</span>
          ${this.baselineOn ? '<span class="lg"><span class="sw bl"></span>계획</span>' : ""}
          <span class="lg"><span class="sw crit"></span>크리티컬</span>
        </div>
        ${this.resourceOpen ? this.renderResourcePanel() : ""}
      </div>
    `, this.attachEvents(), this.viewMode === "gantt" && (this.ensureViewportFill(), this.autoScrollToToday());
  }
  ensureViewportFill() {
    const t = this.root.querySelector(".right");
    if (!t || !this.scale || !this.rangeEnd) return;
    const e = t.clientWidth - this.scale.totalWidth;
    if (e > 0) {
      const s = Math.ceil(e / this.scale.colWidth) + 7;
      this.rangeEnd = new Date(this.rangeEnd.getTime() + s * D), this.renderPreserve();
    }
  }
  maybeExtendRange(t) {
    if (this.extending || Date.now() < this.suppressExtendUntil || !this.scale || !this.rangeStart || !this.rangeEnd) return;
    const e = Math.max(240, t.clientWidth), s = this.scale.colWidth, i = Math.max(30, Math.ceil(t.clientWidth / s) * 2), n = t.scrollLeft + t.clientWidth > t.scrollWidth - e, o = t.scrollLeft < e;
    if (!n && !o) return;
    this.extending = !0;
    const a = t.scrollTop;
    let l = t.scrollLeft;
    n && (this.rangeEnd = new Date(this.rangeEnd.getTime() + i * D)), o && (this.rangeStart = new Date(this.rangeStart.getTime() - i * D), l += i * s), this.autoScrolled = !0, this.render();
    const c = this.root.querySelector(".right");
    c && (c.scrollTop = a, c.scrollLeft = l), setTimeout(() => {
      this.extending = !1;
    }, 120);
  }
  renderToolbar() {
    T(this.ir?.meta.title ?? "간트차트");
    const t = this.unit, e = { gantt: "간트", list: "리스트", board: "보드", calendar: "캘린더" }, s = {
      gantt: '<svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true"><rect x="2" y="2.8" width="8" height="2.3" rx="1.15"/><rect x="5" y="6.85" width="9" height="2.3" rx="1.15"/><rect x="3" y="10.9" width="6" height="2.3" rx="1.15"/></svg>',
      list: '<svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true"><circle cx="3" cy="4" r="1.25"/><circle cx="3" cy="8" r="1.25"/><circle cx="3" cy="12" r="1.25"/><rect x="6" y="3.15" width="8" height="1.7" rx="0.85"/><rect x="6" y="7.15" width="8" height="1.7" rx="0.85"/><rect x="6" y="11.15" width="8" height="1.7" rx="0.85"/></svg>',
      board: '<svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true"><rect x="2" y="2.5" width="3.3" height="11" rx="1.1"/><rect x="6.35" y="2.5" width="3.3" height="7.6" rx="1.1"/><rect x="10.7" y="2.5" width="3.3" height="11" rx="1.1"/></svg>',
      calendar: '<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="2.3" y="3.3" width="11.4" height="10.4" rx="2"/><path d="M2.3 6.4h11.4"/><path d="M5.4 2v2.4M10.6 2v2.4" stroke-linecap="round"/></svg>'
    };
    return `
      <div class="toolbar">
        <div class="tb-views">
          ${["gantt", "list", "board", "calendar"].map((i) => `<button class="tb-view${this.viewMode === i ? " on" : ""}" data-view="${i}" title="${e[i]} 보기">${s[i]}<span>${e[i]}</span></button>`).join("")}
        </div>
        <span class="tb-div"></span>
        <div class="tb-sec" data-sec="list" title="태스크 리스트">
          <label class="gantt-search" title="이름·담당자 검색">
            <span class="i-search">⌕</span>
            <input type="search" class="search-input" placeholder="검색" value="${T(this.searchTerm)}" />
            ${this.searchTerm ? `<span class="search-count">${this.searchMatchIds().length}</span>` : ""}
          </label>
          <button class="tb-select${this.filterAssignees.size ? " on" : ""}" data-filter="assignee" title="담당자 필터 (여러 명 선택)">
            <span class="ts-lab">담당자</span><span class="ts-val">${this.filterAssignees.size === 0 ? "전체" : this.filterAssignees.size === 1 ? T([...this.filterAssignees][0]) : `${this.filterAssignees.size}명`}</span><span class="ts-car">▾</span>
          </button>
          <button class="tb-select${this.filterStatuses.size ? " on" : ""}" data-filter="status" title="상태 필터 (여러 개 선택)">
            <span class="ts-lab">상태</span><span class="ts-val">${this.filterStatuses.size === 0 ? "전체" : this.filterStatuses.size === 1 ? et[[...this.filterStatuses][0]] : `${this.filterStatuses.size}개`}</span><span class="ts-car">▾</span>
          </button>
          <button class="tb-btn" data-action="undo" title="실행 취소 (⌘Z)" ${this.undoStack.length ? "" : "disabled"}>↩</button>
          <button class="tb-btn" data-action="redo" title="다시 실행 (⌘⇧Z)" ${this.redoStack.length ? "" : "disabled"}>↪</button>
        </div>

        <div class="spacer"></div>

        <div class="tb-sec" data-sec="chart" title="차트 보기">
          <button class="tb-btn" data-action="today" title="오늘 위치로">오늘</button>
          <div class="scale-toggle">
            <button class="${t === "day" ? "on" : ""}" data-scale="day">일</button>
            <button class="${t === "week" ? "on" : ""}" data-scale="week">주</button>
            <button class="${t === "month" ? "on" : ""}" data-scale="month">월</button>
          </div>
          <div class="zoom-group">
            <button class="tb-btn" data-action="zoom-out" title="축소 (Ctrl+휠)">−</button>
            <button class="tb-btn" data-action="zoom-in" title="확대 (Ctrl+휠)">＋</button>
            <button class="tb-btn" data-action="zoom-fit" title="전체 맞춤">맞춤</button>
          </div>
          <button class="tb-btn ${this.resourceOpen ? "cp-on" : ""}" data-action="resource" title="담당자별 워크로드">리소스</button>
        </div>

        <span class="tb-div"></span>

        <div class="tb-sec" data-sec="export" title="내보내기">
          <button class="tb-btn" data-action="export-xlsx" title="태스크 표를 엑셀(.xlsx)로 내보내기">엑셀</button>
          <button class="tb-btn" data-action="export" title="차트 PNG로 내보내기">PNG</button>
          <button class="tb-btn" data-action="export-svg" title="차트 SVG로 내보내기">SVG</button>
        </div>

        <span class="tb-div"></span>

        <button class="tb-btn tb-settings" data-action="settings" title="보기 설정 (주말제외·CP·그룹·테마·컬럼)">⚙ 설정</button>
        <button class="tb-btn tb-help" data-action="help" title="도움말 — 기능·단축키 정리">? 도움말</button>
      </div>
    `;
  }
  // ── Board 뷰 — 상태별 칸반 컬럼
  renderBoard() {
    const t = this.ir;
    if (!t || !t.tasks.length) return '<div class="view-empty">태스크가 없어요</div>';
    const e = ["upcoming", "progress", "overdue", "hold", "done"], s = new Map(e.map((i) => [i, []]));
    for (const i of t.tasks) s.get(V(i, this.todayDate)).push(i);
    return `<div class="board">${e.map((i) => {
      const n = s.get(i);
      return `<div class="board-col" data-board-st="${i}">
        <div class="board-head">
          <span class="st-dot st-dot-${i}"></span><span class="board-title">${et[i]}</span>
          <span class="board-count">${n.length}</span>
        </div>
        <div class="board-cards">
          ${n.map((o) => this.boardCard(o)).join("") || '<div class="board-empty-col">비어 있음</div>'}
        </div>
      </div>`;
    }).join("")}</div>`;
  }
  /** 보드 DnD·상태 팝오버 공통 — 태스크 상태를 targetSt로. 자동 판정과 같으면 오버라이드 해제. */
  setTaskStatus(t, e) {
    const s = this.ir?.tasks.find((o) => o.id === t);
    if (!s) return;
    const i = V({ ...s, status: void 0 }, this.todayDate), n = e === i ? void 0 : e;
    n !== s.status && (this.pushUndo(), s.status = n, this.renderPreserve(), this.toast(`상태: ${et[e]}${n ? " (수동)" : " (자동과 일치)"}`), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t, task: s } })));
  }
  /** 캘린더 +N 클릭 — 그 날짜에 걸친 태스크 전체 목록 레이어 */
  openDayTasks(t, e) {
    const s = this.ir;
    if (!s) return;
    const [i, n, o] = t.split("-").map(Number), a = new Date(i, n - 1, o);
    a.setHours(0, 0, 0, 0);
    const l = a.getTime(), c = (h) => {
      const u = new Date(h);
      return u.setHours(0, 0, 0, 0), u.getTime();
    }, p = s.tasks.filter((h) => c(h.start) <= l && c(h.end) >= l);
    this.openCellPopover(e, "menu-pop day-pop", `
      <div class="cp-title">${n}월 ${o}일 <span class="cp-hint">${p.length}개</span></div>
      ${p.map((h) => {
      const u = V(h, this.todayDate);
      return `<button class="mi" data-day-task="${T(h.id)}"><span class="st-dot st-dot-${u}"></span>${T(h.name)}</button>`;
    }).join("")}
    `).querySelectorAll("[data-day-task]").forEach((h) => h.addEventListener("click", () => {
      this.closePopover(), this.openDetail(h.dataset.dayTask);
    }));
  }
  boardCard(t) {
    const e = (t.assignee ?? "").split(",").map((a) => a.trim()).filter(Boolean), s = e.slice(0, 3).map((a) => `<span class="asg-chip" style="background:hsl(${Vt(a)},60%,50%)">${T(a.charAt(0))}</span>`).join(""), i = e.length > 3 ? `<span class="asg-chip more">+${e.length - 3}</span>` : "", n = Math.round((t.progress ?? 0) * 100), o = t.milestone ? `◆ ${K(t.start)}` : `${K(t.start)} ~ ${t.open ? "미정" : K(t.end)}`;
    return `<div class="board-card" draggable="true" data-board-task="${T(t.id)}">
      <div class="bc-name">${T(t.name)}</div>
      <div class="bc-meta"><span class="bc-range">${o}</span>${n > 0 ? `<span class="bc-pct">${n}%</span>` : ""}</div>
      ${e.length ? `<div class="bc-asg"><span class="asg-stack">${s}${i}</span></div>` : ""}
    </div>`;
  }
  // ── Calendar 뷰 — 월 그리드에 태스크 칩
  renderCalendarView() {
    const t = this.ir;
    if (!t || !t.tasks.length) return '<div class="view-empty">태스크가 없어요</div>';
    const e = this.calMonth ?? new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), 1), s = Ve(e.getFullYear(), e.getMonth(), this.todayDate), i = q(this.todayDate), n = (l) => {
      const c = new Date(l);
      return c.setHours(0, 0, 0, 0), c.getTime();
    }, o = ["일", "월", "화", "수", "목", "금", "토"], a = [];
    for (let l = 0; l < s.length / 7; l++) {
      const c = s.slice(l * 7, l * 7 + 7), p = n(c[0].date), d = n(c[6].date), h = t.tasks.filter((v) => n(v.start) <= d && n(v.end) >= p).map((v) => {
        const w = Math.max(0, Math.min(6, Math.round((Math.max(n(v.start), p) - p) / D))), k = Math.max(w, Math.min(6, Math.round((Math.min(n(v.end), d) - p) / D)));
        return { t: v, cs: w, ce: k, isStart: n(v.start) >= p, isEnd: n(v.end) <= d, st: V(v, this.todayDate) };
      }).sort((v, w) => v.cs - w.cs || w.ce - v.ce), u = 3, g = [], f = [0, 0, 0, 0, 0, 0, 0], b = [];
      for (const v of h) {
        let w = g.findIndex((L) => L < v.cs);
        if (w < 0 && (w = g.length, g.push(-1)), g[w] = v.ce, w >= u) {
          for (let L = v.cs; L <= v.ce; L++) f[L]++;
          continue;
        }
        const k = v.t.color || pe[v.st], E = v.isStart && v.isEnd ? "rs re" : v.isStart ? "rs" : v.isEnd ? "re" : "", y = v.isStart ? v.t.milestone ? `◆ ${T(v.t.name)}` : T(v.t.name) : "";
        b.push(`<div class="cw-bar ${E}" style="grid-column:${v.cs + 1}/${v.ce + 2};grid-row:${w + 1};background:${k}" data-cal-task="${T(v.t.id)}" title="${T(v.t.name)}">${y}</div>`);
      }
      const x = f.map((v, w) => v > 0 ? `<button class="cw-more" style="grid-column:${w + 1};grid-row:${u + 1}" data-cal-more="${q(c[w].date)}">+${v}</button>` : "").join(""), $ = b.join("") + x, m = c.map((v) => {
        const w = v.date.getMonth() !== e.getMonth(), k = v.date.getDay();
        return `<div class="cw-date${w ? " dim" : ""}${q(v.date) === i ? " today" : ""}${k === 0 ? " sun" : k === 6 ? " sat" : ""}">${v.date.getDate()}</div>`;
      }).join("");
      a.push(`<div class="cw"><div class="cw-dates">${m}</div><div class="cw-bars">${$}</div></div>`);
    }
    return `<div class="calv">
      <div class="calv-head">
        <span class="calv-title">${e.getFullYear()}년 ${e.getMonth() + 1}월</span>
        <div class="calv-nav">
          <button data-cal-nav="t">오늘</button>
          <button data-cal-nav="-1">‹</button>
          <button data-cal-nav="1">›</button>
        </div>
      </div>
      <div class="calv-grid calv-wds">${o.map((l, c) => `<div class="calv-wd${c === 0 ? " sun" : c === 6 ? " sat" : ""}">${l}</div>`).join("")}</div>
      <div class="calv-weeks">${a.join("")}</div>
    </div>`;
  }
  renderResourcePanel() {
    const t = rr(this.ir), e = Math.max(1, ...t.map((i) => i.totalMs));
    return `<div class="resource-panel">
      <div class="rp-title">담당자별 워크로드</div>
      ${t.length ? t.map((i) => {
      const n = Math.round(i.totalMs / D * 10) / 10, o = Math.round(i.totalMs / e * 100);
      return `<div class="resource-row">
            <span class="rp-name">${T(i.assignee)}</span>
            <span class="rp-track"><span class="rp-fill" style="width:${o}%"></span></span>
            <span class="rp-val">${i.count}건·${n}d</span>
          </div>`;
    }).join("") : '<div style="font-size:11.5px;color:var(--plot-text-mute)">담당자 데이터가 없어요.</div>'}
    </div>`;
  }
  /** 가상화 윈도우 [start, end) — 가시 목록 기준 */
  rowWindow() {
    const t = this.rows.length;
    if (!this.virtOn) return [0, t];
    const e = Math.max(0, this.winStart), s = Math.min(t, this.winEnd === 1 / 0 ? t : this.winEnd);
    return [e, Math.max(e, s)];
  }
  renderLeft() {
    const t = this.ir, e = this.criticalSet(), [s, i] = this.rowWindow(), o = (this.ir ? this.ir.tasks.filter((p) => Y(this.ir, p.id)).map((p) => p.id) : []).length > 0 && this.groupBy === "none", a = this.cols.map((p, d) => {
      const h = Fr[p.key], u = h && this.sortKey === h ? this.sortDir === "asc" ? " ▲" : " ▼" : "", g = p.key === "name" && o ? `<button class="col-collapse" data-action="collapse-all" title="트리 표시 단계 — 단계별 접기/펼치기">
             <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round">
               <path d="M2 3.2 h10"/><path d="M5 7 h7"/><path d="M8 10.8 h4"/>
             </svg>
           </button>` : "";
      return `<div class="col-cell col-${p.key}${p.key === "name" ? " cell-name" : ""}${h ? " sortable" : ""}" style="width:${p.width}px" data-col-idx="${d}"${h ? ` data-sort="${h}"` : ""}>
        ${g}${T(p.label)}<span class="col-sort-arrow">${u}</span>
        <span class="col-grip" data-col-idx="${d}"></span>
      </div>`;
    }).join(""), l = this.groupBy !== "none", c = [];
    this.virtOn && s > 0 && c.push(`<div style="height:${s * this.rowH}px"></div>`);
    for (let p = s; p < i; p++) {
      const d = this.rows[p];
      if (d.group) {
        const k = d.group;
        c.push(`<div class="group-row" data-idx="${p}" style="height:${this.rowH}px">
          <span class="st-dot" style="background:var(--plot-bar-fill)"></span>
          <span class="group-name">${T(k.label)}</span>
          <span class="group-meta">${k.count}건 · ${k.days}d</span>
        </div>`);
        continue;
      }
      const h = d.task, u = l ? 0 : this.getLevel(h), g = V(h, this.todayDate), f = !l && Y(t, h.id), b = this.collapsed.has(h.id), x = ["task-row", `st-${g}`];
      h.milestone && x.push("milestone"), e.has(h.id) && !f && x.push("critical"), this.selection.has(h.id) && x.push("selected");
      const $ = this.cols.map((k) => {
        const E = `style="width:${k.width}px"`;
        switch (k.key) {
          case "name": {
            const y = `<span class="tree-indent" style="width:${u * 14}px"></span>`, L = f ? `<span class="tree-toggle" data-toggle="${h.id}" title="${b ? "펼치기" : "접기"}">${b ? "▶" : "▼"}</span>` : '<span class="tree-spacer"></span>';
            return `<div class="cell cell-name" ${E}>
              ${y}
              ${L}
              <span class="name-text${f ? " has-kids" : ""}" data-edit="name" title="클릭해 이름 편집">${T(h.name)}</span>
            </div>`;
          }
          case "status":
            return `<div class="cell cell-status cell-edit" ${E} data-edit="status" title="${h.critical ? "긴급 · " : ""}클릭해 상태 변경"><span class="st-dot st-dot-${g}${h.critical ? " st-crit" : ""}"${h.color ? ` style="background:${T(h.color)}"` : ""}></span></div>`;
          case "assignee": {
            const y = (h.assignee ?? "").split(",").map((A) => A.trim()).filter(Boolean), L = this.renderAsgStack(y, 2);
            return `<div class="cell cell-asg cell-edit" ${E} data-edit="assignee" title="${T(y.join(", ") || "클릭해 담당자 지정")}">${L}</div>`;
          }
          case "duration": {
            if (h.milestone) return `<div class="cell num cell-edit" ${E} data-edit="dates" title="클릭해 날짜 변경">${K(h.start)}</div>`;
            const y = h.open ? `${K(h.start)} ~ 미정` : Rr(h.start, $t(h.end)), L = f ? `<button class="tree-lock${h.locked ? " on" : ""}" data-lock="${h.id}" title="${h.locked ? "기간 잠금 해제" : "기간 잠금 · 하위가 이 종료일을 넘지 못하게"}" aria-label="기간 잠금" aria-pressed="${!!h.locked}">${zr(!!h.locked)}</button>` : "";
            return `<div class="cell num cell-edit" ${E} data-edit="dates" title="${T(y)} · 클릭해 날짜 변경"><span class="dur-range">${y}</span>${L}</div>`;
          }
          case "days": {
            if (h.milestone) return `<div class="cell cell-days" ${E} title="마일스톤"><span class="day-dash">—</span></div>`;
            if (h.open) return `<div class="cell cell-days" ${E}><span class="day-open">미정</span></div>`;
            const y = this.workdayMode ? It(h.start, h.end, this.ir.meta.workdays, this.ir.meta.holidays) : Math.max(1, Math.round((h.end.getTime() - h.start.getTime()) / D));
            return `<div class="cell cell-days" ${E} title="${this.workdayMode ? "근무일 수 (주말·휴일 제외)" : "달력 기준 소요 일수"}"><span class="day-badge">${y}</span></div>`;
          }
          case "start":
            return `<div class="cell num" ${E}>${ht(h.start)}</div>`;
          case "end":
            return `<div class="cell num" ${E}>${h.open ? "미정" : ht(h.milestone ? h.end : $t(h.end))}</div>`;
          case "progress": {
            const y = Math.round((h.progress ?? 0) * 100), L = 2 * Math.PI * 6.5, A = h.color || pe[g];
            return `<div class="cell cell-edit" ${E} data-progress-cell data-edit="progress" title="진척률 ${y}% · 클릭해 변경">
              <svg class="prog-ring" viewBox="0 0 16 16" width="16" height="16" data-p="${y}">
                <circle class="pr-track" cx="8" cy="8" r="6.5" />
                ${y > 0 ? `<circle class="pr-arc" cx="8" cy="8" r="6.5" style="stroke:${T(A)}" stroke-dasharray="${(L * y / 100).toFixed(1)} ${L.toFixed(1)}" />` : ""}
              </svg>
            </div>`;
          }
        }
      }).join(""), m = l ? '<div class="row-actions"></div>' : `<div class="row-actions">
        <button class="row-act grip" data-grip title="클릭=상세 · 드래그=이동">⠿</button>
      </div>`, v = l ? "" : `<div class="insert-zone" data-insert-after="${h.id}" style="--ins-indent:${u * 14}px">
        <span class="insert-line"></span>
        <button class="insert-btn" title="여기에 태스크 추가">＋</button>
        <span class="insert-line"></span>
      </div>`, w = `role="treeitem" aria-level="${u + 1}" aria-selected="${this.selection.has(h.id)}"${f ? ` aria-expanded="${!b}"` : ""} aria-label="${T(h.name)}"`;
      c.push(`<div class="${x.join(" ")}" ${w} data-task-id="${h.id}" data-idx="${p}">${m}${$}${v}</div>`);
    }
    return this.virtOn && i < this.rows.length && c.push(`<div style="height:${(this.rows.length - i) * this.rowH}px"></div>`), `
      <div class="left">
        <div class="left-header"><button class="col-menu-btn" data-action="col-menu" title="컬럼 표시 설정"><svg viewBox="0 0 14 14" width="13" height="13" aria-hidden="true"><rect x="1" y="2" width="3" height="10" rx="1"/><rect x="5.5" y="2" width="3" height="10" rx="1"/><rect x="10" y="2" width="3" height="10" rx="1"/></svg></button>${a}</div>
        <div class="left-viewport"><div class="left-canvas" role="tree" aria-label="태스크 목록">${c.join("")}</div></div>
      </div>
    `;
  }
  renderRight() {
    const t = this.scale, e = this.ir, s = this.rows.length * this.rowH, i = t.cells, [n, o] = this.rowWindow(), a = [];
    let l = 0;
    const c = (M, S) => this.unit === "month" ? M.getFullYear() !== S.getFullYear() : M.getMonth() !== S.getMonth();
    for (let M = 1; M <= i.length; M++) {
      const S = i[M - 1].date, I = M < i.length ? i[M].date : null;
      if (!I || c(I, S)) {
        const P = (M - l) * t.colWidth, R = this.unit === "month" ? `${S.getFullYear()}년` : P < 70 ? P < 28 ? "" : `${S.getMonth() + 1}월` : `${S.getFullYear()}년 ${S.getMonth() + 1}월`;
        a.push(`<div class="month-cell" style="width:${P}px"><span class="month-label">${R}</span></div>`), l = M;
      }
    }
    const p = this.unit;
    let d;
    if (p === "day")
      d = i.map((M) => {
        const S = ["day-cell"];
        return M.isToday && S.push("today"), M.isWeekend && S.push("weekend"), M.isHoliday && S.push("holiday"), `<div class="${S.join(" ")}" style="width:${t.colWidth}px"><div class="dow">${["일", "월", "화", "수", "목", "금", "토"][M.date.getDay()]}</div><div>${M.date.getDate()}</div></div>`;
      }).join("");
    else {
      const M = (R) => p === "week" ? R.getDay() === 1 : R.getDate() === 1, S = (R) => p === "week" ? `${R.getMonth() + 1}/${R.getDate()}` : `${R.getMonth() + 1}월`, I = [];
      let P = 0;
      for (let R = 1; R <= i.length; R++)
        if (R === i.length || M(i[R].date)) {
          const Z = i[P], F = (R - P) * t.colWidth, tt = i.slice(P, R).some((ot) => ot.isToday);
          I.push(`<div class="day-cell week-cell${tt ? " today" : ""}" style="width:${F}px"><div>${S(Z.date)}</div></div>`), P = R;
        }
      d = I.join("");
    }
    const h = i.filter((M) => M.isHoliday || p === "day" && M.isWeekend).map((M) => `<rect class="deco ${M.isHoliday ? "holiday-strip" : "weekend-strip"}" x="${M.x}" y="0" width="${t.colWidth}" height="${s}" />`).join(""), u = i.filter((M) => p === "day" || (p === "week" ? M.date.getDay() === 1 : M.date.getDate() === 1)).map((M) => `<line class="deco grid-line${p === "week" && M.date.getDate() <= 7 ? " grid-month" : ""}" x1="${M.x}" y1="0" x2="${M.x}" y2="${s}" />`).join(""), g = [], f = [], b = [];
    for (let M = n; M < o; M++) {
      g.push(`<line class="deco grid-line" x1="0" y1="${(M + 1) * this.rowH}" x2="${t.totalWidth}" y2="${(M + 1) * this.rowH}" />`);
      const S = this.rows[M];
      if (S.group) {
        b.push(`<rect class="deco group-band" x="0" y="${M * this.rowH}" width="${t.totalWidth}" height="${this.rowH}" />`);
        continue;
      }
      const I = this.selection.has(S.task.id) ? " selected" : "";
      f.push(`<rect class="row-hit${I}" data-idx="${M}" x="0" y="${M * this.rowH}" width="${t.totalWidth}" height="${this.rowH}" />`);
    }
    const x = this.criticalSet(), $ = [], m = [], v = Math.max(10, Math.round(this.rowH * 0.5));
    Math.round((this.rowH - v) / 2);
    const w = [];
    for (let M = n; M < o; M++) {
      const S = this.rows[M].task;
      if (S) {
        if ($.push(this.renderBar(S, M, t, x)), !S.milestone) {
          const I = z(t, S.start), P = Math.max(bt, z(t, S.end) - I);
          w.push(this.barLabel(S, I, P, M * this.rowH + this.rowH / 2, !!S.open));
        }
        if (this.baselineOn && !S.milestone && S.baselineStart && S.baselineEnd) {
          const I = z(t, S.baselineStart), P = Math.max(2, z(t, S.baselineEnd) - I);
          m.push(`<rect class="baseline-bar" x="${I}" y="${M * this.rowH + this.rowH - 5}" width="${P}" height="3" rx="1.5" data-baseline="${S.id}"><title>계획(베이스라인) ${q(S.baselineStart)} ~ ${q(S.baselineEnd)}</title></rect>`);
        }
      }
    }
    const k = this.visIdx, y = e.links.filter((M) => {
      const S = k.get(M.source), I = k.get(M.target);
      if (S == null || I == null) return !1;
      if (!this.virtOn) return !0;
      const P = Math.min(S, I), R = Math.max(S, I);
      return P <= o + 1 && R >= n - 1;
    }).map((M) => this.arrowPathHtml(M, x)).join(""), L = e.meta.today ?? /* @__PURE__ */ new Date(), A = q(L), O = i.find((M) => q(M.date) === A), N = new Date(L.getFullYear(), L.getMonth(), L.getDate()), X = i[i.length - 1], At = !!X && N.getTime() >= t.originDate.getTime() && N.getTime() <= X.date.getTime() + D, G = O ? O.x + t.colWidth / 2 : At ? z(t, N) : null, wt = G != null ? `<line class="deco today-line" x1="${G}" y1="0" x2="${G}" y2="${s}" stroke-width="1.1" stroke-dasharray="4 5" />` : "";
    return `
      <div class="right">
        <div class="right-inner" style="width:${t.totalWidth}px">
          <div class="month-band" style="width:${t.totalWidth}px">${a.join("")}</div>
          <div class="scale-header" style="width:${t.totalWidth}px">${d}</div>
          <div class="chart-body" style="height:${s}px; width:${t.totalWidth}px">
            <svg class="chart-svg" width="${t.totalWidth}" height="${s}" viewBox="0 0 ${t.totalWidth} ${s}">
              <defs>
                <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
                  <path class="dep-arrow" d="M0.5,1 L7,4 L0.5,7 Z" />
                </marker>
                <marker id="arrow-crit" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
                  <path class="dep-arrow critical" d="M0.5,1 L7,4 L0.5,7 Z" />
                </marker>
              </defs>
              ${h}
              ${wt}
              ${u}
              ${b.join("")}
              ${f.join("")}
              ${g.join("")}
              ${m.join("")}
              ${y}
              ${$.join("")}
              ${w.join("")}
            </svg>
          </div>
        </div>
      </div>
    `;
  }
  renderBar(t, e, s, i) {
    const n = e * this.rowH, o = (v, w, k, E) => `M ${v + 3} ${k} H ${w} q -2.5 ${E / 4} 0 ${E / 2} q 2.5 ${E / 4} 0 ${E / 2} H ${v + 3} Q ${v} ${k + E} ${v} ${k + E - 3} V ${k + 3} Q ${v} ${k} ${v + 3} ${k} Z`;
    if (t.milestone) {
      const v = z(s, t.start), w = Math.max(bt, Math.round(s.colWidth)), k = Math.max(10, Math.round(this.rowH * 0.5)), E = n + Math.round((this.rowH - k) / 2), y = n + this.rowH / 2, L = ["bar", "open", "milestone", `st-${V(t, this.todayDate)}`];
      this.selection.has(t.id) && L.push("selected");
      const A = t.color ? ` style="--bar-c:${T(t.color)}"` : "";
      return `<g class="${L.join(" ")}"${A} data-task-id="${t.id}" data-idx="${e}">
        <path class="bar-bg" d="${o(v, v + w, E, k)}" />
        <path class="bar-outer" d="${o(v, v + w, E, k)}" />
        <path class="move-grip" d="M ${v + 7} ${y - 4.5} V ${y + 4.5} M ${v + 11.5} ${y - 4.5} V ${y + 4.5}" />
        ${this.barLabelsOn ? `<text class="bar-name out" data-for="${T(t.id)}" x="${v + w + 16}" y="${y}">${T(t.name)}</text>` : ""}
        <circle class="link-dot l" cx="${v - 8}" cy="${y}" r="3.5" />
        <circle class="link-handle l" cx="${v - 8}" cy="${y}" r="7" data-link-src="${t.id}" />
        <circle class="link-dot r" cx="${v + w + 8}" cy="${y}" r="3.5" />
        <circle class="link-handle r" cx="${v + w + 8}" cy="${y}" r="7" data-link-src="${t.id}" />
      </g>`;
    }
    const a = z(s, t.start), l = z(s, t.end), c = Math.max(bt, l - a), p = Math.max(10, Math.round(this.rowH * 0.5)), d = n + Math.round((this.rowH - p) / 2), h = n + this.rowH / 2, u = Math.max(0, Math.min(1, t.progress ?? 0)), g = ["bar", `st-${V(t, this.todayDate)}`];
    i.has(t.id) && !(this.ir && Y(this.ir, t.id)) && g.push("critical"), this.selection.has(t.id) && g.push("selected"), t.locked && g.push("locked"), t.open && g.push("open");
    const f = t.color ? ` style="--bar-c:${T(t.color)}"` : "", b = a + c * u, x = u <= 0.02 ? b + 8 : u >= 0.98 ? b - 4 : b, $ = `<circle class="prog-notch" cx="${b}" cy="${d + p}" r="4.5" data-notch="${t.id}" />
      <circle class="prog-notch-hit" cx="${x}" cy="${d + p}" r="9" data-notch="${t.id}" />`;
    return !!this.ir && Y(this.ir, t.id) ? `<g class="${g.join(" ")} summary"${f} data-task-id="${t.id}" data-idx="${e}">
        <rect class="bar-bg" x="${a}" y="${d}" width="${c}" height="${p}" rx="3" />
        <rect class="bar-outer" x="${a}" y="${d}" width="${c}" height="${p}" rx="3" />
        ${u > 0 ? `<rect class="bar-inner" x="${a}" y="${d}" width="${c * u}" height="${p}" rx="3" />` : ""}
        ${t.locked ? `<g class="lock-mark" transform="translate(${(a + c - 13).toFixed(1)}, ${(d - 6).toFixed(1)})"><path class="lm-shackle" d="M2.4 6 V4.7 a1.75 1.75 0 0 1 3.5 0 V6" fill="none" stroke-width="1.2" stroke-linecap="round" /><rect class="lm-body" x="1" y="6" width="6.3" height="4.5" rx="1.1" /></g>` : ""}
        <path class="move-grip" d="M ${a + 8} ${h - 4.5} V ${h + 4.5} M ${a + 12.5} ${h - 4.5} V ${h + 4.5}" />
        <circle class="link-dot l" cx="${a - 8}" cy="${h}" r="3.5" />
        <circle class="link-handle l" cx="${a - 8}" cy="${h}" r="7" data-link-src="${t.id}" />
        <circle class="link-dot r" cx="${a + c + 8}" cy="${h}" r="3.5" />
        <circle class="link-handle r" cx="${a + c + 8}" cy="${h}" r="7" data-link-src="${t.id}" />
      </g>` : `<g class="${g.join(" ")}"${f} data-task-id="${t.id}" data-idx="${e}">
      ${t.open ? `<path class="bar-bg" d="${o(a, a + c, d, p)}" />` : `<rect class="bar-bg" x="${a}" y="${d}" width="${c}" height="${p}" rx="3" />`}
      ${t.open ? `<path class="bar-outer" d="${o(a, a + c, d, p)}" />` : `<rect class="bar-outer" x="${a}" y="${d}" width="${c}" height="${p}" rx="3" />`}
      ${u > 0 ? `<rect class="bar-inner" x="${a}" y="${d}" width="${c * u}" height="${p}" rx="3" />` : ""}
      <rect class="bar-handle" x="${a}" y="${d}" width="6" height="${p}" data-handle="left" />
      ${t.open ? "" : `<rect class="bar-handle" x="${a + c - 6}" y="${d}" width="6" height="${p}" data-handle="right" />`}
      <path class="edge-grip" d="M ${a + 3} ${d + 3.5} V ${d + p - 3.5}" />
      ${t.open ? "" : `<path class="edge-grip" d="M ${a + c - 3} ${d + 3.5} V ${d + p - 3.5}" />`}
      ${$}
      <circle class="link-dot l" cx="${a - 8}" cy="${h}" r="3.5" />
      <circle class="link-handle l" cx="${a - 8}" cy="${h}" r="7" data-link-src="${t.id}" />
      <circle class="link-dot r" cx="${a + c + 8}" cy="${h}" r="3.5" />
      <circle class="link-handle r" cx="${a + c + 8}" cy="${h}" r="7" data-link-src="${t.id}" />
    </g>`;
  }
  /** 바 이름 라벨 — 항상 바 '바깥' 오른쪽에만 (바 위에 글자를 얹지 않는다). 월 축소 뷰는 생략. */
  barLabel(t, e, s, i, n = !1) {
    if (!this.barLabelsOn || (this.scale?.colWidth ?? 40) < 10) return "";
    const o = e + s + (n ? 20 : 18);
    return `<text class="bar-name out" data-for="${T(t.id)}" x="${o}" y="${i}">${T(t.name)}</text>`;
  }
  /** 직교(elbow) 채널 라우팅 — 상세는 arrowD 주석 참고. y좌표는 가시 인덱스 기준. */
  arrowD(t) {
    const e = this.ir, s = this.scale, i = new Map(e.tasks.map((S) => [S.id, S])), n = this.visIdx, o = i.get(t.source), a = i.get(t.target);
    if (!o || !a || !n.has(t.source) || !n.has(t.target)) return null;
    const l = n.get(t.source), c = n.get(t.target), p = l * this.rowH + this.rowH / 2, d = c * this.rowH + this.rowH / 2, h = 8, u = z(s, o.start), g = z(s, o.end), f = z(s, a.start), b = z(s, a.end), x = Math.max(8, Math.round(s.colWidth)), $ = o.milestone ? u + x : g, m = a.milestone ? f + x : b, v = e.links.filter((S) => S.source === t.source && n.has(S.target)), w = Math.max(0, v.indexOf(t)) * 6, k = t.type === "FS" || t.type === "FF", E = k ? $ : u, y = E + (k ? h : -h), L = t.type === "FS" || t.type === "SS", A = L ? f : m, O = A + (L ? -h : h), N = 3, X = L ? A - N : A + N;
    if (l === c) return `M ${E},${p} L ${X},${d}`;
    if (L ? A >= E : A <= E) {
      let S = L ? A >= E + 2 * h ? E + h : (E + A) / 2 : A <= E - 2 * h ? E - h : (E + A) / 2;
      return L ? S = Math.min(S + w, A - h) : S = Math.max(S - w, A + h), [
        `M ${E},${p}`,
        `L ${S},${p}`,
        `L ${S},${d}`,
        `L ${X},${d}`
      ].join(" ");
    }
    const wt = d >= p ? (l + 1) * this.rowH : l * this.rowH, M = k ? y + w : y - w;
    return [
      `M ${E},${p}`,
      `L ${M},${p}`,
      `L ${M},${wt}`,
      `L ${O},${wt}`,
      `L ${O},${d}`,
      `L ${X},${d}`
    ].join(" ");
  }
  arrowPathHtml(t, e) {
    const s = this.arrowD(t);
    if (!s) return "";
    const i = e.has(t.source) && e.has(t.target), n = i ? "dep-path critical" : "dep-path", o = i ? "arrow-crit" : "arrow";
    return `<path class="${n}" data-src="${t.source}" data-tgt="${t.target}" d="${s}" marker-end="url(#${o})" /><path class="dep-hit" data-link-src="${t.source}" data-link-tgt="${t.target}" d="${s}" />`;
  }
  getLevel(t, e = /* @__PURE__ */ new Map()) {
    if (e.has(t.id)) return e.get(t.id);
    if (!t.parentId)
      return e.set(t.id, 0), 0;
    const s = this.ir.tasks.find((n) => n.id === t.parentId);
    if (!s) return 0;
    const i = this.getLevel(s, e) + 1;
    return e.set(t.id, i), i;
  }
  // ───────────────────────── events
  attachEvents() {
    this.root.querySelectorAll(".tb-view").forEach((n) => n.addEventListener("click", () => {
      const o = n.dataset.view;
      if (o === this.viewMode) return;
      const a = this.viewMode === "list";
      this.viewMode = o, o === "list" ? (this.colsBackup || (this.colsBackup = this.cols), this.cols = Pr.map((l) => ({ ...l }))) : a && this.colsBackup && (this.cols = this.colsBackup, this.colsBackup = null), o === "calendar" && !this.calMonth && (this.calMonth = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), 1)), this.closePopover(), this.render();
    })), this.root.querySelectorAll("[data-board-task]").forEach((n) => n.addEventListener("click", (o) => {
      o.stopPropagation(), this.openDetail(n.dataset.boardTask);
    })), this.root.querySelectorAll(".board-card").forEach((n) => {
      n.addEventListener("dragstart", (o) => {
        o.dataTransfer?.setData("text/plain", n.dataset.boardTask), o.dataTransfer.effectAllowed = "move", n.classList.add("dragging");
      }), n.addEventListener("dragend", () => n.classList.remove("dragging"));
    }), this.root.querySelectorAll(".board-col").forEach((n) => {
      n.addEventListener("dragover", (o) => {
        o.preventDefault(), o.dataTransfer.dropEffect = "move", n.classList.add("drop-over");
      }), n.addEventListener("dragleave", (o) => {
        n.contains(o.relatedTarget) || n.classList.remove("drop-over");
      }), n.addEventListener("drop", (o) => {
        o.preventDefault(), n.classList.remove("drop-over");
        const a = o.dataTransfer?.getData("text/plain");
        a && this.setTaskStatus(a, n.dataset.boardSt);
      });
    }), this.root.querySelectorAll("[data-cal-more]").forEach((n) => n.addEventListener("click", (o) => {
      o.stopPropagation(), this.openDayTasks(n.dataset.calMore, n);
    })), this.root.querySelectorAll("[data-cal-task]").forEach((n) => n.addEventListener("click", (o) => {
      o.stopPropagation(), this.openDetail(n.dataset.calTask);
    })), this.root.querySelectorAll("[data-cal-nav]").forEach((n) => n.addEventListener("click", () => {
      const o = n.dataset.calNav, a = this.calMonth ?? new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), 1);
      this.calMonth = o === "t" ? new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), 1) : new Date(a.getFullYear(), a.getMonth() + Number(o), 1), this.render();
    })), this.root.querySelectorAll(".scale-toggle button").forEach((n) => {
      n.addEventListener("click", () => this.setScale(n.dataset.scale));
    }), this.root.querySelector('[data-action="zoom-in"]')?.addEventListener("click", () => this.zoomBy(1.4)), this.root.querySelector('[data-action="zoom-out"]')?.addEventListener("click", () => this.zoomBy(1 / 1.4)), this.root.querySelector('[data-action="zoom-fit"]')?.addEventListener("click", () => this.zoomFit()), this.root.querySelector('[data-action="jump-overdue"]')?.addEventListener("click", () => {
      const n = this.overdueTaskIds();
      if (!n.length) return;
      const o = new Map(this.ir.tasks.map((c) => [c.id, c]));
      let a = o.get(n[0])?.parentId;
      for (; a; )
        this.collapsed.delete(a), a = o.get(a)?.parentId;
      this.selection = /* @__PURE__ */ new Set([n[0]]), this.selAnchor = n[0], this.renderPreserve(), this.root.querySelector(`.task-row[data-task-id="${st(n[0])}"]`)?.scrollIntoView?.({ block: "nearest" }), this.scrollToTask(n[0]);
    }), this.root.querySelector('[data-action="today"]')?.addEventListener("click", () => this.scrollToToday(!0)), this.root.querySelector('[data-action="add-task"]')?.addEventListener("click", () => this.addTask()), this.root.querySelector('[data-action="export"]')?.addEventListener("click", () => this.exportPNG()), this.root.querySelector('[data-action="export-svg"]')?.addEventListener("click", () => this.exportSVG()), this.root.querySelector('[data-action="export-xlsx"]')?.addEventListener("click", () => this.exportXlsx()), this.root.querySelector('[data-action="undo"]')?.addEventListener("click", () => this.undo()), this.root.querySelector('[data-action="redo"]')?.addEventListener("click", () => this.redo()), this.root.querySelector('[data-action="resource"]')?.addEventListener("click", (n) => {
      n.stopPropagation(), this.resourceOpen = !this.resourceOpen, this.renderPreserve();
    });
    const t = this.root.querySelector(".search-input");
    t && (t.addEventListener("input", () => this.applySearch(t.value)), t.addEventListener("keydown", (n) => {
      n.stopPropagation();
    }), this.searchTerm && requestAnimationFrame(() => this.applySearch(this.searchTerm))), this.root.querySelectorAll(".tb-select").forEach((n) => n.addEventListener("click", (o) => {
      o.stopPropagation(), this.openFilterMenu(n.dataset.filter, n);
    })), this.root.querySelector('[data-action="settings"]')?.addEventListener("click", (n) => {
      n.stopPropagation(), this.openSettingsPopover(n.currentTarget);
    }), this.root.querySelector('[data-action="help"]')?.addEventListener("click", (n) => {
      n.stopPropagation(), this.openHelpPopover(n.currentTarget);
    }), this.root.querySelector('[data-action="col-menu"]')?.addEventListener("click", (n) => {
      n.stopPropagation(), this.openColsPopover(n.currentTarget);
    }), this.root.querySelector('[data-action="collapse-all"]')?.addEventListener("click", (n) => {
      n.stopPropagation(), this.openDepthPopover(n.currentTarget);
    }), this.root.querySelector('[data-action="workday"]')?.addEventListener("click", () => {
      this.toggleWorkday();
    }), this.root.querySelector('[data-action="group-assignee"]')?.addEventListener("click", () => {
      this.groupBy = this.groupBy === "assignee" ? "none" : "assignee", this.collapsed.clear(), this.closePopover(), this.renderPreserve();
    }), this.root.querySelectorAll(".col-picker-item input").forEach((n) => {
      n.addEventListener("change", (o) => this.toggleColumn(o.target.dataset.col));
    });
    const e = this.root.querySelector(".right"), s = this.root.querySelector(".left-canvas");
    e && s && (e.addEventListener("scroll", () => {
      e.isConnected && (s.style.transform = `translateY(${-e.scrollTop}px)`, this.maybeExtendRange(e), this.maybeUpdateWindow(e));
    }), this.root.querySelector(".left")?.addEventListener("wheel", (o) => {
      o.preventDefault(), e.scrollTop += o.deltaY, e.scrollLeft += o.deltaX;
    }, { passive: !1 }), e.addEventListener("wheel", (o) => {
      if (!(o.ctrlKey || o.altKey)) return;
      o.preventDefault();
      const a = e.getBoundingClientRect(), l = o.clientX - a.left, c = Math.exp(-o.deltaY * 22e-4);
      this.zoomPending ? (this.zoomPending.factor *= c, this.zoomPending.cursorX = l) : this.zoomPending = { factor: c, cursorX: l }, this.zoomRaf || (this.zoomRaf = requestAnimationFrame(() => {
        this.zoomRaf = 0;
        const p = this.zoomPending;
        this.zoomPending = null, p && this.applyZoom(p.factor, p.cursorX);
      }));
    }, { passive: !1 })), this.root.querySelectorAll(".dep-hit").forEach((n) => {
      const o = n;
      o.addEventListener("click", (a) => {
        a.stopPropagation(), this.showLinkPopover(o.dataset.linkSrc, o.dataset.linkTgt, a);
      });
    });
    const i = this.root.querySelector('[data-role="splitter"]');
    i && i.addEventListener("pointerdown", (n) => this.onSplitterDown(i, n)), this.root.querySelectorAll(".col-grip").forEach((n) => {
      n.addEventListener("pointerdown", (o) => this.onColGripDown(n, o));
    }), this.root.querySelectorAll(".col-cell.sortable").forEach((n) => {
      n.addEventListener("click", (o) => {
        o.target.closest(".col-grip") || this.applySort(n.dataset.sort);
      });
    }), this.root.querySelectorAll(".task-row").forEach((n) => {
      const o = n;
      o.addEventListener("click", (a) => this.onRowClick(o.dataset.taskId, Number(o.dataset.idx), a)), o.addEventListener("mouseenter", () => this.syncRowHover(Number(o.dataset.idx), !0)), o.addEventListener("mouseleave", () => this.syncRowHover(Number(o.dataset.idx), !1)), o.querySelector('[data-edit="name"]')?.addEventListener("click", (a) => {
        a.stopPropagation(), this.startInlineEdit(o.dataset.taskId, "name", a.currentTarget);
      }), o.querySelector('[data-edit="assignee"]')?.addEventListener("click", (a) => {
        a.stopPropagation(), this.openAssigneePopover(o.dataset.taskId, a.currentTarget);
      }), o.querySelector('[data-edit="dates"]')?.addEventListener("click", (a) => {
        a.stopPropagation(), this.openDatesPopover(o.dataset.taskId, a.currentTarget);
      }), o.querySelector('[data-edit="progress"]')?.addEventListener("click", (a) => {
        a.stopPropagation(), this.openProgressPopover(o.dataset.taskId, a.currentTarget);
      }), o.querySelector('[data-edit="status"]')?.addEventListener("click", (a) => {
        a.stopPropagation(), this.openStatusPopover(o.dataset.taskId, a.currentTarget);
      }), o.querySelector("[data-toggle]")?.addEventListener("click", (a) => {
        a.stopPropagation(), this.toggleCollapse(a.currentTarget.dataset.toggle);
      }), o.querySelector("[data-lock]")?.addEventListener("click", (a) => {
        a.stopPropagation(), this.toggleLock(a.currentTarget.dataset.lock);
      }), o.addEventListener("dblclick", (a) => {
        a.stopPropagation(), this.openDetail(o.dataset.taskId);
      }), o.addEventListener("contextmenu", (a) => {
        a.preventDefault(), this.showContextMenu(o.dataset.taskId, a);
      }), o.querySelector(".insert-btn")?.addEventListener("click", (a) => {
        a.stopPropagation();
        const l = a.currentTarget, c = l.closest(".insert-zone");
        this.openAddMenu(c.dataset.insertAfter, l);
      }), o.addEventListener("pointerdown", (a) => this.onRowPointerDown(o, a));
    }), this.root.querySelectorAll(".row-hit").forEach((n) => {
      const o = n, a = Number(o.dataset.idx);
      o.addEventListener("mouseenter", () => this.syncRowHover(a, !0)), o.addEventListener("mouseleave", () => this.syncRowHover(a, !1)), o.addEventListener("click", (l) => {
        const c = this.rows[a]?.task;
        c && this.onRowClick(c.id, a, l);
      });
    }), this.root.querySelectorAll(".bar").forEach((n) => {
      const o = n;
      o.addEventListener("pointerdown", (c) => this.onBarPointerDown(o, c)), o.addEventListener("mouseenter", () => {
        this.isDraggingAny() || (this.highlightArrows(o.dataset.taskId), this.syncRowHover(Number(o.dataset.idx), !0));
      }), o.addEventListener("mousemove", (c) => this.scheduleTip(o.dataset.taskId, c)), o.addEventListener("mouseleave", () => {
        this.highlightArrows(null), this.hideTip(), this.syncRowHover(Number(o.dataset.idx), !1);
      }), o.addEventListener("dblclick", (c) => {
        c.stopPropagation(), this.openDetail(o.dataset.taskId, c);
      }), o.addEventListener("contextmenu", (c) => {
        c.preventDefault(), this.showContextMenu(o.dataset.taskId, c);
      }), o.querySelectorAll(".bar-handle").forEach((c) => {
        c.addEventListener("mouseenter", () => {
          this.isDraggingAny() || c.classList.add("hot");
        }), c.addEventListener("mouseleave", () => c.classList.remove("hot"));
      });
      const a = o.querySelector(".prog-notch-hit"), l = o.querySelector(".prog-notch");
      a && l && (a.addEventListener("mouseenter", () => {
        if (!this.isDraggingAny() && (l.classList.add("hot"), !o.querySelector(".notch-tip"))) {
          const c = this.ir?.tasks.find((u) => u.id === o.dataset.taskId), p = Math.round((c?.progress ?? 0) * 100), d = Number(l.getAttribute("cx")), h = Number(l.getAttribute("cy"));
          o.insertAdjacentHTML("beforeend", `<text class="notch-tip" x="${d}" y="${h + 15}">${p}%</text>`);
        }
      }), a.addEventListener("mouseleave", () => {
        l.classList.remove("hot"), o.querySelector(".notch-tip")?.remove();
      })), o.querySelectorAll(".link-handle").forEach((c) => {
        const p = o.querySelector(c.classList.contains("l") ? ".link-dot.l" : ".link-dot.r");
        p && (c.addEventListener("mouseenter", () => {
          this.isDraggingAny() || p.classList.add("hot");
        }), c.addEventListener("mouseleave", () => p.classList.remove("hot")));
      });
    }), this.root.addEventListener("click", (n) => {
      const o = n.target;
      this.contextMenu && !o.closest?.(".ctx-menu") && this.closeContextMenu();
      const a = ".detail-drawer, .popover, .cell-pop, .cal-pop, .bar, .task-row, .row-hit, .tb-btn, .row-actions";
      n.composedPath().some((c) => c.matches?.(a)) || this.closePopover();
      const l = ".bar, .task-row, .row-hit, .row-actions, .detail-drawer, .popover, .cell-pop, .cal-pop, .toolbar, .ctx-menu";
      this.activeBarId && !n.composedPath().some((c) => c.matches?.(l)) && (this.activeBarId = null, this.refreshSelectionUI()), this.resourceOpen && !o.closest?.('.resource-panel, [data-action="resource"]') && (this.resourceOpen = !1, this.renderPreserve());
    });
  }
  maybeUpdateWindow(t) {
    if (!this.virtOn) return;
    const e = Math.floor(t.scrollTop / this.rowH) - Is, s = Math.ceil((t.scrollTop + t.clientHeight) / this.rowH) + Is;
    Math.abs(e - this.winStart) < 3 && Math.abs(s - this.winEnd) < 3 || (this.winStart = Math.max(0, e), this.winEnd = s, this.winRaf || (this.winRaf = requestAnimationFrame(() => {
      this.winRaf = 0, this.renderPreserve();
    })));
  }
  applyZoom(t, e) {
    const s = this.root.querySelector(".right");
    if (!s || !this.scale) return;
    const i = this.colW, n = Math.max(4, Math.min(80, i * t));
    if (Math.abs(n - i) < 0.2) return;
    const o = (s.scrollLeft + e) / i;
    this.colW = n, this.autoScrolled = !0, this.render();
    const a = this.root.querySelector(".right");
    a && (a.scrollLeft = Math.max(0, o * n - e));
  }
  /** 차트 전체 확대/축소 (툴바 ＋/− 버튼) — 가로(colW)+세로(rowH) 동시 스케일 */
  zoomBy(t) {
    const e = this.root.querySelector(".right");
    if (!e) return;
    const s = this.zoom, i = Math.max(0.6, Math.min(2.4, s * t)), n = i / s, o = e.scrollTop;
    this.zoom = i, this.applyZoom(t, e.clientWidth / 2);
    const a = this.root.querySelector(".right");
    a && (a.scrollTop = o * n);
  }
  /** 전체 맞춤 — 모든 태스크 기간이 뷰포트에 들어오도록 colW 조정 */
  zoomFit() {
    const t = this.root.querySelector(".right");
    if (!t || !this.ir || !this.ir.tasks.length) return;
    const e = this.ir.tasks.flatMap((l) => [l.start.getTime(), l.end.getTime()]), s = Math.min(...e), i = Math.max(...e), n = Math.max(1, (i - s) / D) + 4, o = Math.max(4, Math.min(80, (t.clientWidth - 24) / n));
    this.colW = o, this.zoom = 1, this.rangeStart = new Date(s - 2 * D), this.rangeEnd = new Date(i + 2 * D), this.autoScrolled = !0, this.render();
    const a = this.root.querySelector(".right");
    a && (a.scrollLeft = 0);
  }
  syncRowHover(t, e) {
    if (e && this.isDraggingAny()) return;
    const s = this.root.querySelector(`.task-row[data-idx="${t}"]`), i = this.root.querySelector(`.row-hit[data-idx="${t}"]`);
    if (s?.classList.toggle("hl", e), i?.classList.toggle("hl", e), !e) {
      this.root.querySelectorAll(".subtree-region, .subtree-region-left").forEach((l) => l.remove());
      return;
    }
    const n = this.rows[t]?.task;
    if (!n || !this.ir || this.groupBy !== "none" || !Y(this.ir, n.id)) return;
    const o = dt(this.ir, n.id);
    o.delete(n.id);
    let a = t;
    for (const l of o) {
      const c = this.visIdx.get(l);
      c != null && (a = Math.max(a, c));
    }
    if (a > t) {
      this.root.querySelectorAll(".subtree-region, .subtree-region-left").forEach((d) => d.remove());
      const l = t * this.rowH + 3, c = (a - t + 1) * this.rowH - 6, p = this.root.querySelector(".chart-svg");
      if (p && this.scale) {
        const d = z(this.scale, n.start), h = z(this.scale, n.end);
        p.insertAdjacentHTML(
          "beforeend",
          `<rect class="subtree-region" x="${d - 5}" y="${l}" width="${Math.max(10, h - d) + 10}" height="${c}" rx="9" />`
        );
      }
    }
  }
  highlightArrows(t) {
    const e = this.root.querySelectorAll(".dep-path");
    if (!t) {
      e.forEach((s) => s.classList.remove("hl", "dim"));
      return;
    }
    e.forEach((s) => {
      const i = s, n = i.dataset.src === t || i.dataset.tgt === t;
      i.classList.toggle("hl", n), i.classList.toggle("dim", !n);
    });
  }
  // ── 선택
  // ── 좌측 행 드래그로 부모 변경(reparent)
  onRowPointerDown(t, e) {
    if (!this.ir || this.groupBy !== "none" || !e.target.closest("[data-grip]") || e.button !== 0) return;
    e.preventDefault();
    const i = t.dataset.taskId;
    if (!i) return;
    this.reparentDrag = { id: i, startX: e.clientX, startY: e.clientY, moved: !1, target: null, mode: "child" };
    const n = (a) => this.onRowPointerMove(a), o = (a) => {
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", o), this.onRowPointerUp(a);
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", o);
  }
  onRowPointerMove(t) {
    const e = this.reparentDrag;
    if (!e || !this.ir) return;
    if (!e.moved) {
      if (Math.abs(t.clientY - e.startY) < 5 && Math.abs(t.clientX - e.startX) < 5) return;
      e.moved = !0, this.classList.add("reparenting", "dragging-any"), this.clearHoverFx();
      const c = dt(this.ir, e.id);
      c.forEach((u) => this.root.querySelector(`.task-row[data-task-id="${st(u)}"]`)?.classList.add("drag-ghost")), this.style.userSelect = "none";
      const p = this.ir.tasks.find((u) => u.id === e.id), d = c.size - 1, h = document.createElement("div");
      h.textContent = (p?.name || e.id) + (d > 0 ? `  +${d}` : ""), h.style.cssText = "position:fixed;z-index:2147483647;pointer-events:none;background:#0891b2;color:#fff;font:600 12px/1.2 system-ui,-apple-system,sans-serif;padding:5px 11px;border-radius:7px;box-shadow:0 8px 22px rgba(0,0,0,0.3);transform:rotate(-1deg);white-space:nowrap;max-width:280px;overflow:hidden;text-overflow:ellipsis", document.body.appendChild(h), this.dragChipEl = h;
    }
    this.dragChipEl && (this.dragChipEl.style.left = t.clientX + 14 + "px", this.dragChipEl.style.top = t.clientY + 8 + "px");
    const i = this.root.elementFromPoint(t.clientX, t.clientY)?.closest?.(".task-row"), n = i?.dataset.taskId ?? null, o = dt(this.ir, e.id);
    if (!n || o.has(n)) return;
    let a = n, l = "child";
    {
      const c = i.getBoundingClientRect(), p = (t.clientY - c.top) / c.height;
      l = Y(this.ir, a) && !this.collapsed.has(a) ? p < 0.4 ? "before" : "child" : p < 0.28 ? "before" : p > 0.72 ? "after" : "child";
      const h = this.ir.tasks.find((g) => g.id === a), u = l === "child" ? a : h?.parentId ?? null;
      fs(this.ir, e.id, u) || (a = null);
    }
    (a !== e.target || l !== e.mode) && (e.target = a, e.mode = l, this.paintDropFeedback(a, l));
  }
  /** 드롭 피드백 — 리스트는 정적으로 두고 '선(형제 사이) / 박스(하위 안)'만 그린다.
   *  선=BETWEEN, 박스=INTO 를 시각적으로 확실히 구분(레퍼런스 문법)해서 '어디/어느 레벨로'를 한눈에 답한다. */
  paintDropFeedback(t, e) {
    if (this.root.querySelectorAll(".drop-before, .drop-after, .drop-target, .drop-child").forEach((i) => i.classList.remove("drop-before", "drop-after", "drop-target", "drop-child")), !t || !this.ir) return;
    const s = this.root.querySelector(`.task-row[data-task-id="${st(t)}"]`);
    if (s)
      if (e === "child") {
        s.classList.add("drop-target");
        for (const i of dt(this.ir, t))
          i !== t && this.root.querySelector(`.task-row[data-task-id="${st(i)}"]`)?.classList.add("drop-child");
      } else {
        s.classList.add(e === "before" ? "drop-before" : "drop-after");
        const i = s.querySelector(".name-text"), n = i ? i.getBoundingClientRect().left - s.getBoundingClientRect().left : 0;
        s.style.setProperty("--drop-x", Math.max(0, n) + "px");
      }
  }
  /** 진행 중 재부모 드래그 취소 — 데이터는 손 안 댔으므로 표시(고스트·인디케이터·칩)만 정리. (Escape) */
  cancelReparent() {
    const t = this.reparentDrag;
    t && (this.reparentDrag = null, this.style.userSelect = "", this.classList.remove("reparenting", "dragging-any"), this.dragChipEl && (this.dragChipEl.remove(), this.dragChipEl = null), this.root.querySelectorAll(".drag-ghost, .drop-before, .drop-after, .drop-target, .drop-child").forEach((e) => e.classList.remove("drag-ghost", "drop-before", "drop-after", "drop-target", "drop-child")), t.moved && (this.suppressRowClick = !0));
  }
  onRowPointerUp(t) {
    const e = this.reparentDrag;
    if (this.reparentDrag = null, this.style.userSelect = "", this.classList.remove("reparenting", "dragging-any"), this.dragChipEl && (this.dragChipEl.remove(), this.dragChipEl = null), this.root.querySelectorAll(".drag-ghost, .drop-before, .drop-after, .drop-target, .drop-child").forEach((s) => s.classList.remove("drag-ghost", "drop-before", "drop-after", "drop-target", "drop-child")), !!e) {
      if (!e.moved) {
        this.suppressRowClick = !0, this.openDetail(e.id);
        return;
      }
      if (this.suppressRowClick = !0, e.target && this.ir) {
        const s = this.takeSnapshot();
        if (nr(this.ir, e.id, e.mode, e.target)) {
          this.pushUndo(s), e.mode === "child" && this.collapsed.delete(e.target);
          const i = this.clampToLocks();
          j(this.ir), this.cpm = _(this.ir), this.renderPreserve(), this.flashLanded(e.id), i > 0 && this.toast(`잠긴 종료일에 막혀 ${i}건이 조정됐어요`, "info", !0), this.dispatchEvent(new CustomEvent("taskmove", { detail: { taskId: e.id, mode: e.mode, refId: e.target } }));
        }
      }
    }
  }
  /** 드롭 후 착지한 행을 잠깐 강조(정적 리스트에서 '여기 들어왔다' 확인) */
  flashLanded(t) {
    const e = this.root.querySelector(`.task-row[data-task-id="${st(t)}"]`);
    e && (e.classList.add("just-landed"), setTimeout(() => e?.classList.remove("just-landed"), 500));
  }
  onRowClick(t, e, s) {
    if (this.suppressRowClick) {
      this.suppressRowClick = !1;
      return;
    }
    if (s.metaKey || s.ctrlKey) {
      this.toggleSelect(t);
      return;
    }
    if (s.shiftKey && this.selAnchor) {
      this.rangeSelect(t);
      return;
    }
    this.selection = /* @__PURE__ */ new Set([t]), this.selAnchor = t, this.activeBarId = null, this.refreshSelectionUI(), this.scrollToTask(t);
  }
  toggleSelect(t) {
    if (this.activeBarId = null, this.ir?.tasks.find((s) => s.id === t)?.locked) {
      this.selection = /* @__PURE__ */ new Set([t]), this.selAnchor = t, this.refreshSelectionUI();
      return;
    }
    this.selection.has(t) ? this.selection.delete(t) : this.selection.add(t), this.selAnchor = t, this.refreshSelectionUI();
  }
  rangeSelect(t) {
    this.activeBarId = null;
    const e = this.visList, s = e.findIndex((a) => a.id === this.selAnchor), i = e.findIndex((a) => a.id === t);
    if (s < 0 || i < 0) return;
    const [n, o] = s < i ? [s, i] : [i, s];
    for (let a = n; a <= o; a++) this.selection.add(e[a].id);
    this.refreshSelectionUI();
  }
  refreshSelectionUI() {
    this.root.querySelectorAll(".task-row").forEach((e) => {
      const s = e, i = this.selection.has(s.dataset.taskId);
      s.classList.toggle("selected", i), s.setAttribute("aria-selected", String(i));
    }), this.root.querySelectorAll(".bar").forEach((e) => {
      const s = e;
      s.classList.toggle("selected", this.selection.has(s.dataset.taskId)), s.classList.toggle("active", this.activeBarId === s.dataset.taskId);
    }), this.root.querySelectorAll(".row-hit").forEach((e) => {
      const s = e, i = this.rows[Number(s.dataset.idx)]?.task;
      s.classList.toggle("selected", !!i && this.selection.has(i.id));
    });
    const t = this.root.querySelector(".tb-count");
    t && this.ir && (t.textContent = `${this.ir.tasks.length}개${this.selection.size ? ` · 선택 ${this.selection.size}` : ""}${this.parseErrors.length ? ` · ⚠ ${this.parseErrors.length}` : ""}`);
  }
  // ── 오늘 스크롤
  todayX() {
    if (!this.scale || !this.ir) return null;
    const t = q(this.ir.meta.today ?? /* @__PURE__ */ new Date()), e = this.scale.cells.find((s) => q(s.date) === t);
    return e ? e.x + this.scale.colWidth / 2 : null;
  }
  scrollToToday(t) {
    const e = this.root.querySelector(".right"), s = this.todayX();
    !e || s === null || e.scrollTo({ left: Math.max(0, s - e.clientWidth / 2), behavior: t ? "smooth" : "auto" });
  }
  autoScrollToToday() {
    this.autoScrolled || (this.autoScrolled = !0, requestAnimationFrame(() => this.scrollToToday(!1)));
  }
  // ── 스플리터
  onSplitterDown(t, e) {
    e.preventDefault();
    const s = e.clientX, i = this.leftTotal;
    t.classList.add("dragging"), this.classList.add("dragging-any"), this.style.userSelect = "none";
    const n = this.cols.reduce((d, h) => d + h.width, 0) + Xe + 8, o = this.clientWidth || this.getBoundingClientRect().width || 0, a = Math.max(140, Math.min(n, o > 0 ? o - 6 - 240 : n));
    let l = i;
    const c = (d) => {
      const h = Math.max(140, Math.min(a, i + (d.clientX - s)));
      this.leftOverride = h, this.root.querySelector(".body")?.style.setProperty("--left-total", h + "px");
      const g = this.root.querySelector(".right");
      g && (g.scrollLeft += h - l), l = h;
    }, p = () => {
      window.removeEventListener("pointermove", c), window.removeEventListener("pointerup", p), t.classList.remove("dragging"), this.classList.remove("dragging-any"), this.style.userSelect = "";
    };
    window.addEventListener("pointermove", c), window.addEventListener("pointerup", p);
  }
  // ── 컬럼 그립
  onColGripDown(t, e) {
    e.preventDefault(), e.stopPropagation();
    const s = Number(t.dataset.colIdx), i = this.cols[s];
    if (!i) return;
    const n = e.clientX, o = i.width;
    this.classList.add("dragging-any"), this.style.userSelect = "none";
    const a = this.root.querySelector(".right");
    let l = this.leftTotal;
    const c = (h) => {
      i.width = h, this.root.querySelectorAll(`.left-header .col-cell[data-col-idx="${s}"]`).forEach((g) => {
        g.style.width = h + "px";
      }), this.root.querySelectorAll(".task-row").forEach((g) => {
        const f = g.querySelectorAll(":scope > .cell")[s];
        f && (f.style.width = h + "px");
      }), this.leftOverride = null, this.root.querySelector(".body")?.style.setProperty("--left-total", this.leftTotal + "px"), a && (a.scrollLeft += this.leftTotal - l), l = this.leftTotal;
    }, p = (h) => {
      c(Math.max(50, Math.min(420, o + (h.clientX - n))));
    }, d = () => {
      window.removeEventListener("pointermove", p), window.removeEventListener("pointerup", d), this.classList.remove("dragging-any"), this.style.userSelect = "", this.saveViewState();
    };
    window.addEventListener("pointermove", p), window.addEventListener("pointerup", d);
  }
  /** id의 (batchIds에 안 든) 잠금 조상 종료일 중 가장 이른 값(ms). 없으면 null.
   *  batchIds에 든 조상은 함께 이동하므로 벽이 같이 움직여 제약이 아님 → 제외. */
  externalLockedEnd(t, e) {
    if (!this.ir) return null;
    const s = (l) => (e instanceof Set, e.has(l)), i = new Map(this.ir.tasks.map((l) => [l.id, l]));
    let n = null, o = i.get(t)?.parentId;
    const a = /* @__PURE__ */ new Set();
    for (; o && !a.has(o); ) {
      a.add(o);
      const l = i.get(o);
      l?.locked && !s(o) && (n = n == null ? l.end.getTime() : Math.min(n, l.end.getTime())), o = l?.parentId;
    }
    return n;
  }
  /** 링크 캐스케이드 등으로 잠금 벽을 넘어간 태스크를 벽 안으로 되당김(기간 보존). 조정된 수 반환.
   *  후행 자동배치(rescheduleFrom) 뒤에 호출 — 잠금이 자동 이동보다 우선. */
  clampToLocks() {
    if (!this.ir) return 0;
    const t = /* @__PURE__ */ new Set(), { workdays: e, holidays: s } = this.ir.meta;
    let i = 0;
    for (const n of this.ir.tasks) {
      if (Y(this.ir, n.id)) continue;
      const o = this.externalLockedEnd(n.id, t);
      if (o != null && n.end.getTime() > o) {
        const a = n.end.getTime() - o;
        let l = new Date(n.start.getTime() - a);
        if (this.workdayMode) {
          let p = 0;
          for (; ze(l, e, s).getTime() !== l.getTime() && p++ < 3660; ) l = new Date(l.getTime() - D);
        }
        const c = n.start.getTime() - l.getTime();
        n.start = l, n.end = new Date(n.end.getTime() - c), i++;
      }
    }
    return i;
  }
  onBarPointerDown(t, e) {
    if (!this.ir) return;
    this.tipTimer && (clearTimeout(this.tipTimer), this.tipTimer = 0), this.hideTip();
    const s = t.dataset.taskId;
    if (!s) return;
    const i = this.ir.tasks.find((f) => f.id === s);
    if (!i) return;
    const n = e.target;
    if (n.classList.contains("link-handle")) {
      e.preventDefault(), e.stopPropagation(), this.startLinkDrag(s, e);
      return;
    }
    if (n.classList.contains("prog-notch") || n.classList.contains("prog-notch-hit")) {
      e.preventDefault(), e.stopPropagation(), this.startProgressDrag(i, t, e);
      return;
    }
    if (e.metaKey || e.ctrlKey) {
      this.toggleSelect(s);
      return;
    }
    if (e.shiftKey && this.selAnchor) {
      this.rangeSelect(s);
      return;
    }
    if (i.locked && Y(this.ir, s)) {
      this.selection = /* @__PURE__ */ new Set([s]), this.selAnchor = s, this.activeBarId = s, this.refreshSelectionUI();
      return;
    }
    i.milestone && (this.selection = /* @__PURE__ */ new Set([s]), this.selAnchor = s, this.activeBarId = s, this.refreshSelectionUI()), e.preventDefault();
    const o = n.getAttribute("data-handle"), a = Y(this.ir, s), l = a ? "move" : o === "left" ? "left" : o === "right" ? "right" : "move";
    t.classList.add("grabbing"), this.classList.add("dragging-any"), this.clearHoverFx(), this.style.userSelect = "none";
    try {
      n.setPointerCapture?.(e.pointerId);
    } catch {
    }
    const c = a ? [...dt(this.ir, s)] : l === "move" && this.selection.has(s) && this.selection.size > 1 ? [...this.selection] : [s], p = /* @__PURE__ */ new Map();
    for (const f of c) {
      const b = this.ir.tasks.find((x) => x.id === f);
      b && p.set(f, { s: b.start.getTime(), e: b.end.getTime() });
    }
    let d;
    for (const [f, b] of p) {
      const x = this.externalLockedEnd(f, p);
      if (x != null) {
        const $ = x - b.e;
        d = d == null ? $ : Math.min(d, $);
      }
    }
    const h = this.externalLockedEnd(i.id, p) ?? void 0;
    this.dragging = {
      task: i,
      kind: l,
      startX: e.clientX,
      origMap: p,
      barGroup: t,
      moved: !1,
      snapBefore: this.takeSnapshot(),
      maxRightDelta: d,
      boundEnd: h
    };
    const u = (f) => this.onBarPointerMove(f), g = (f) => {
      window.removeEventListener("pointermove", u), window.removeEventListener("pointerup", g), this.onBarPointerUp(f);
    };
    window.addEventListener("pointermove", u), window.addEventListener("pointerup", g);
  }
  onBarPointerMove(t) {
    const e = this.dragging;
    if (!e || !this.scale || !this.ir) return;
    const s = t.clientX - e.startX;
    if (Math.abs(s) < 3 && !e.moved) return;
    e.moved = !0;
    const i = this.scale.colWidth, n = D;
    let o;
    if (this.scale.workdaysOnly) {
      const a = Math.round(s / i), l = this.scale.cells, c = e.origMap.get(e.task.id), p = e.kind === "right" ? c.e : c.s, d = Math.round(z(this.scale, new Date(p)) / i), h = Math.max(0, Math.min(l.length - 1, d + a));
      o = l.length ? l[h].date.getTime() - p : 0;
    } else {
      const a = s / (i / D);
      o = Math.round(a / n) * n;
    }
    if (e.kind === "move") {
      e.maxRightDelta != null && (o = Math.min(o, Math.max(0, e.maxRightDelta)));
      for (const [a, l] of e.origMap) {
        const c = this.ir.tasks.find((p) => p.id === a);
        c && (c.start = new Date(l.s + o), c.end = new Date(l.e + o), c.duration = c.end.getTime() - c.start.getTime(), this.updateBarRect(c));
      }
    } else {
      const a = e.origMap.get(e.task.id);
      if (e.kind === "left") {
        const l = new Date(a.s + o);
        l.getTime() < e.task.end.getTime() - n && (e.task.start = l);
      } else {
        let l = a.e + o;
        e.boundEnd != null && (l = Math.min(l, e.boundEnd));
        const c = new Date(l);
        c.getTime() > e.task.start.getTime() + n && (e.task.end = c);
      }
      e.task.duration = e.task.end.getTime() - e.task.start.getTime(), this.updateBarRect(e.task);
    }
    this.updateDragTip(t, e.task, e.kind, e.origMap.size);
  }
  updateBarRect(t) {
    if (!this.scale) return;
    const e = this.root.querySelector(`.bar[data-task-id="${st(t.id)}"]`);
    if (!e) return;
    const s = z(this.scale, t.start), i = z(this.scale, t.end), n = Math.max(bt, i - s), o = e.querySelector(".bar-outer"), a = e.querySelector(".bar-inner"), l = e.querySelector('.bar-handle[data-handle="left"]'), c = e.querySelector('.bar-handle[data-handle="right"]'), p = e.querySelector(".link-handle.r"), d = e.querySelector(".link-dot.r"), h = e.querySelector(".link-handle.l"), u = e.querySelector(".link-dot.l");
    if (h && h.setAttribute("cx", String(s - 8)), u && u.setAttribute("cx", String(s - 8)), o && (o.setAttribute("x", String(s)), o.setAttribute("width", String(n))), a) {
      const L = Math.max(0, Math.min(1, t.progress ?? 0));
      a.setAttribute("x", String(s)), a.setAttribute("width", String(n * L));
    }
    l && l.setAttribute("x", String(s)), c && c.setAttribute("x", String(s + n - 6)), p && p.setAttribute("cx", String(s + n + 8)), d && d.setAttribute("cx", String(s + n + 8));
    const g = Math.max(0, Math.min(1, t.progress ?? 0)), f = e.querySelector(".prog-notch");
    f && f.setAttribute("cx", String(s + n * g));
    const b = e.querySelector(".prog-notch-hit");
    b && b.setAttribute("cx", String(s + n * g + (g <= 0.02 ? 8 : g >= 0.98 ? -4 : 0)));
    const $ = Number(e.dataset.idx ?? 0) * this.rowH, m = Math.max(10, Math.round(this.rowH * 0.5)), v = $ + Math.round((this.rowH - m) / 2), w = $ + this.rowH / 2;
    if (o && o.tagName === "path") {
      const L = t.milestone ? Math.max(bt, Math.round(this.scale.colWidth)) : n, A = s + L;
      o.setAttribute("d", `M ${s + 3} ${v} H ${A} q -2.5 ${m / 4} 0 ${m / 2} q 2.5 ${m / 4} 0 ${m / 2} H ${s + 3} Q ${s} ${v + m} ${s} ${v + m - 3} V ${v + 3} Q ${s} ${v} ${s + 3} ${v} Z`), p && p.setAttribute("cx", String(A + 8)), d && d.setAttribute("cx", String(A + 8));
    }
    const k = e.querySelectorAll(".edge-grip");
    k[0] && k[0].setAttribute("d", `M ${s + 3} ${v + 3.5} V ${v + m - 3.5}`), k[1] && k[1].setAttribute("d", `M ${s + n - 3} ${v + 3.5} V ${v + m - 3.5}`);
    const E = e.querySelector(".move-grip");
    if (E) {
      const L = t.milestone ? s + 7 : s + 8;
      E.setAttribute("d", `M ${L} ${w - 4.5} V ${w + 4.5} M ${L + 4.5} ${w - 4.5} V ${w + 4.5}`);
    }
    const y = this.root.querySelector(`.bar-name[data-for="${st(t.id)}"]`);
    if (y) {
      const L = t.milestone ? Math.max(bt, Math.round(this.scale.colWidth)) : n;
      y.setAttribute("x", String(s + L + (t.milestone ? 16 : t.open ? 20 : 18)));
    }
  }
  updateDragTip(t, e, s, i) {
    const n = this.getBoundingClientRect();
    let o = this.dragging?.tip;
    if (o || (o = document.createElement("div"), o.className = "drag-tip", this.root.querySelector(".root")?.appendChild(o), this.dragging && (this.dragging.tip = o)), o.style.left = t.clientX - n.left + "px", o.style.top = t.clientY - n.top + "px", s === "left") o.textContent = `시작 ${ht(e.start)}`;
    else if (s === "right") o.textContent = `종료 ${ht(e.end)}`;
    else {
      const a = Math.max(1, Math.round(e.duration / D)), l = i > 1 ? `${i}개 · ` : "";
      o.textContent = `${l}${ht(e.start)} → ${ht(e.end)} (${a}일)`;
    }
  }
  onBarPointerUp(t) {
    if (!this.dragging) return;
    const { barGroup: e, tip: s, moved: i, task: n, origMap: o, snapBefore: a } = this.dragging;
    if (e.classList.remove("grabbing"), this.classList.remove("dragging-any"), this.style.userSelect = "", s && s.remove(), this.dragging = null, !i) {
      this.selection = /* @__PURE__ */ new Set([n.id]), this.selAnchor = n.id, this.activeBarId = n.id, this.refreshSelectionUI();
      return;
    }
    let l = 0, c = 0;
    this.ir && (l = mt(this.ir, new Set(o.keys()), this.rescheduleOpts()), c = this.clampToLocks(), j(this.ir), this.cpm = _(this.ir));
    const p = !this.snapEqual(this.takeSnapshot(), a);
    p && this.pushUndo(a), this.renderPreserve(), p && (l > 0 && this.toast(`후행 ${l}건이 함께 이동됐어요`, "info", !0), c > 0 && this.toast(`잠긴 종료일에 막혀 ${c}건이 조정됐어요`, "info", !0), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: n.id, task: n } })));
  }
  // ── 키보드 넛지 (액티브 바) — 드래그 커밋과 동일 경로를 태워 invariant 유지
  /** 한 칸(=1컬럼) 이동/기간 델타(ms). workday 모드에선 근무일 컬럼 기준(주말 스킵). */
  colDeltaMs(t, e) {
    if (!this.scale || !this.scale.workdaysOnly) return e * D;
    const s = this.scale.cells;
    if (!s.length) return e * D;
    const i = this.scale.colWidth, n = Math.round(z(this.scale, new Date(t)) / i), o = Math.max(0, Math.min(s.length - 1, n + e));
    return s[o].date.getTime() - t;
  }
  /** ←/→ : 한 칸 이동 (요약이면 서브트리 통째).
   *  드래그(move)와 동일한 잠금 처리 — 잠긴 요약은 통째 이동 금지, 그 외엔 잠긴 조상 종료일까지만
   *  오른쪽 이동을 제한(왼쪽은 자유)한다. 전면 차단하지 않고 드래그의 maxRightDelta clamp 와 일치. */
  nudgeMove(t, e) {
    if (!this.ir) return;
    if (t.locked && Y(this.ir, t.id)) {
      this.toast("잠긴 태스크는 이동할 수 없어요", "warn");
      return;
    }
    const i = Y(this.ir, t.id) ? [...dt(this.ir, t.id)] : [t.id];
    let n = this.colDeltaMs(t.start.getTime(), e);
    if (!n) return;
    const o = new Set(i);
    let a = null;
    for (const c of i) {
      const p = this.ir.tasks.find((h) => h.id === c);
      if (!p) continue;
      const d = this.externalLockedEnd(c, o);
      if (d != null) {
        const h = d - p.end.getTime();
        a = a == null ? h : Math.min(a, h);
      }
    }
    if (e > 0 && a != null && (n = Math.min(n, Math.max(0, a))), n === 0) {
      e > 0 && this.toast("잠긴 종료일에 막혀 더 옮길 수 없어요", "warn");
      return;
    }
    const l = this.takeSnapshot();
    for (const c of i) {
      const p = this.ir.tasks.find((d) => d.id === c);
      p && (p.start = new Date(p.start.getTime() + n), p.end = new Date(p.end.getTime() + n), p.duration = p.end.getTime() - p.start.getTime());
    }
    this.commitDateNudge(t, o, l);
  }
  /** Shift+←/→ : 기간 ±1일 (종료일만 이동, 최소 1일). 요약·마일스톤은 불가.
   *  드래그(right 리사이즈)와 동일 — 잠긴 조상 종료일 너머로는 못 늘리되(boundEnd clamp), 축소는 허용. 전면 차단 X. */
  nudgeDuration(t, e) {
    if (!this.ir) return;
    if (Y(this.ir, t.id)) {
      this.toast("요약 태스크 기간은 하위에서 정해져요", "warn");
      return;
    }
    if (t.milestone) {
      this.toast("마일스톤은 기간이 없어요", "warn");
      return;
    }
    const s = this.colDeltaMs(t.end.getTime(), e);
    if (!s) return;
    let i = t.end.getTime() + s;
    const n = this.externalLockedEnd(t.id, /* @__PURE__ */ new Set([t.id]));
    if (n != null && (i = Math.min(i, n)), i - t.start.getTime() < D) {
      if (n != null && n < t.start.getTime() + D) {
        this.toast("잠긴 종료일에 막혀 기간을 둘 수 없어요", "warn");
        return;
      }
      i = t.start.getTime() + D;
    }
    if (i === t.end.getTime()) {
      e > 0 && n != null && this.toast("잠긴 종료일에 막혀 늘릴 수 없어요", "warn");
      return;
    }
    const o = this.takeSnapshot();
    t.end = new Date(i), t.duration = t.end.getTime() - t.start.getTime(), this.commitDateNudge(t, /* @__PURE__ */ new Set([t.id]), o);
  }
  /** 날짜 변경 확정 — onBarPointerUp 이동 확정과 동일 경로(재배치·잠금·롤업·CPM·재렌더·통지) */
  commitDateNudge(t, e, s) {
    let i = 0, n = 0;
    this.ir && (i = mt(this.ir, e, this.rescheduleOpts()), n = this.clampToLocks(), j(this.ir), this.cpm = _(this.ir));
    const o = !this.snapEqual(this.takeSnapshot(), s);
    o && this.pushUndo(s), this.renderPreserve(), this.refreshSelectionUI(), this.scrollToTask(t.id), o && (i > 0 && this.toast(`후행 ${i}건이 함께 이동됐어요`, "info", !0), n > 0 && this.toast(`잠긴 종료일에 막혀 ${n}건이 조정됐어요`, "info", !0), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t.id, task: t } })));
  }
  /** ↑/↓ : 진척 ±step — startProgressDrag 커밋과 동일 경로. 요약/마일스톤 제외. */
  nudgeProgress(t, e) {
    if (!this.ir) return;
    if (Y(this.ir, t.id)) {
      this.toast("요약 진척률은 하위에서 집계돼요", "warn");
      return;
    }
    if (t.milestone) return;
    const s = this.progressStep > 0 ? this.progressStep : 0.05, i = Math.max(0, Math.min(1, t.progress ?? 0)), n = Math.max(0, Math.min(1, Math.round(i / s) * s + e * s)), o = Math.round(n * 100) / 100;
    if (o === i) return;
    const a = this.takeSnapshot();
    t.progress = o, this.pushUndo(a), this.renderPreserve(), this.refreshSelectionUI(), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t.id, task: t } }));
  }
  // ── 링크 생성 드래그
  startLinkDrag(t, e) {
    if (!this.ir || !this.scale) return;
    const s = this.root.querySelector(".chart-svg"), i = this.ir.tasks.find((d) => d.id === t);
    if (!s || !i) return;
    const n = this.ir.tasks.findIndex((d) => d.id === t), o = z(this.scale, i.end), a = n * this.rowH + this.rowH / 2, l = document.createElementNS("http://www.w3.org/2000/svg", "path");
    l.setAttribute("class", "link-temp"), l.setAttribute("d", `M ${o},${a} L ${o},${a}`), s.appendChild(l), this.classList.add("linking", "dragging-any"), this.style.userSelect = "none", this.clearHoverFx(), this.linkDrag = { sourceId: t, temp: l, sx: o, sy: a, target: null, hover: null };
    const c = (d) => {
      const h = this.linkDrag;
      if (!h) return;
      const u = s.getBoundingClientRect(), g = d.clientX - u.left, f = d.clientY - u.top;
      h.temp.setAttribute("d", `M ${h.sx},${h.sy} L ${g},${f}`);
      const $ = this.root.elementFromPoint(d.clientX, d.clientY)?.closest?.(".bar")?.dataset.taskId ?? null, m = $ && $ !== h.sourceId ? $ : null, v = !!m && this.ir != null && !this.ir.links.some((w) => w.source === h.sourceId && w.target === m) && !Cs(this.ir, h.sourceId, m);
      m !== h.hover && (this.root.querySelectorAll(".bar.link-target, .bar.link-invalid").forEach((w) => w.classList.remove("link-target", "link-invalid")), m && this.root.querySelector(`.bar[data-task-id="${st(m)}"]`)?.classList.add(v ? "link-target" : "link-invalid"), this.classList.toggle("link-bad", !!m && !v), h.hover = m, h.target = v ? m : null);
    }, p = () => {
      window.removeEventListener("pointermove", c), window.removeEventListener("pointerup", p), this.finishLinkDrag();
    };
    window.addEventListener("pointermove", c), window.addEventListener("pointerup", p);
  }
  finishLinkDrag() {
    const t = this.linkDrag;
    if (!t || !this.ir) {
      this.cancelLinkDrag();
      return;
    }
    const { sourceId: e, target: s, hover: i } = t;
    if (this.cancelLinkDrag(), !s) {
      if (i && i !== e) {
        const n = this.ir.links.some((o) => o.source === e && o.target === i);
        this.toast(n ? `이미 연결되어 있어요: ${e} → ${i}` : `순환 의존이 생겨 연결할 수 없어요: ${e} → ${i}`, n ? "warn" : "error");
      }
      return;
    }
    if (this.ir.links.some((n) => n.source === e && n.target === s)) {
      this.toast(`이미 연결되어 있어요: ${e} → ${s}`, "warn");
      return;
    }
    if (Cs(this.ir, e, s)) {
      this.toast(`순환 의존이 생겨 연결할 수 없어요: ${e} → ${s}`, "error");
      return;
    }
    this.pushUndo(), this.ir.links.push({ source: e, target: s, type: "FS", lag: 0 }), mt(this.ir, /* @__PURE__ */ new Set([e]), this.rescheduleOpts()), j(this.ir), this.cpm = _(this.ir), this.renderPreserve(), this.dispatchEvent(new CustomEvent("linkcreate", { detail: { source: e, target: s } }));
  }
  // ── 퍼센트 정밀 조절 (노치 드래그) — 바 확대 + 중앙 % 라이브 표시
  startProgressDrag(t, e, s) {
    if (!this.ir || !this.scale) return;
    const i = this.takeSnapshot(), n = z(this.scale, t.start), o = Math.max(bt, z(this.scale, t.end) - n), a = s.clientX, l = Math.max(0, Math.min(1, t.progress ?? 0));
    e.classList.add("adjusting"), this.classList.add("dragging-any"), this.tipTimer && (clearTimeout(this.tipTimer), this.tipTimer = 0), this.hideTip(), this.style.userSelect = "none";
    const c = Number(e.dataset.idx), p = document.createElementNS("http://www.w3.org/2000/svg", "text");
    p.setAttribute("class", "prog-live"), p.setAttribute("x", String(n + o / 2)), p.setAttribute("y", String(c * this.rowH + this.rowH / 2)), e.appendChild(p);
    const d = (g) => {
      p.textContent = `${Math.round(g * 100)}%`;
    };
    d(l);
    const h = (g) => {
      const f = (g.clientX - a) / o, b = Math.max(0, Math.min(1, Math.round((l + f) * 100) / 100));
      b !== (t.progress ?? 0) && (t.progress = b, this.updateBarRect(t), this.updateProgressCell(t), d(b));
    }, u = () => {
      window.removeEventListener("pointermove", h), window.removeEventListener("pointerup", u), p.remove(), e.classList.remove("adjusting"), this.classList.remove("dragging-any"), this.style.userSelect = "", (t.progress ?? 0) !== l && (this.pushUndo(i), this.renderPreserve(), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t.id, task: t } })));
    };
    window.addEventListener("pointermove", h), window.addEventListener("pointerup", u);
  }
  // ── 자체 데이트피커 팝오버 (Element Plus 참고, 자체 구현)
  openCalendarAt(t, e, s) {
    this.closeCalendar();
    const i = document.createElement("div");
    i.className = "cal-pop";
    const n = this.getBoundingClientRect();
    this.root.querySelector(".root")?.appendChild(i), Lr(i, {
      value: s.value,
      today: this.todayDate,
      onPick: (d) => {
        this.closeCalendar(), s.onPick(d);
      }
    });
    const o = i.offsetHeight || 320, a = i.offsetWidth || 252, l = 12, c = window.innerHeight;
    let p = e + 6;
    p + o > c - l && (p = e - o - 6), p = Math.max(l, Math.min(p, c - o - l)), i.style.left = Math.max(4, Math.min(t - n.left, n.width - a - 8)) + "px", i.style.top = p - n.top + "px", this.calendarPop = i, setTimeout(() => {
      const d = (h) => {
        const u = h.composedPath();
        this.calendarPop && !u.includes(this.calendarPop) && this.closeCalendar();
      };
      this.calendarCloser = d, document.addEventListener("mousedown", d);
    }, 0);
  }
  closeCalendar() {
    this.calendarCloser && (document.removeEventListener("mousedown", this.calendarCloser), this.calendarCloser = null), this.calendarPop && (this.calendarPop.remove(), this.calendarPop = null);
  }
  /** 어떤 종류든 드래그 중인지 (바 이동·링크·reparent·노치 조절 = dragging-any) */
  isDraggingAny() {
    return !!(this.dragging || this.linkDrag || this.reparentDrag) || this.classList.contains("dragging-any");
  }
  scheduleTip(t, e) {
    if (this.isDraggingAny()) return;
    const s = this.getBoundingClientRect(), i = e.clientX - s.left, n = e.clientY - s.top;
    this.tipTimer && clearTimeout(this.tipTimer), this.tipTimer = window.setTimeout(() => this.showTip(t, i, n), 450);
  }
  showTip(t, e, s) {
    if (this.isDraggingAny()) return;
    const i = this.ir?.tasks.find((d) => d.id === t);
    if (!i) return;
    const n = V(i, this.todayDate), o = Math.max(1, Math.round((i.end.getTime() - i.start.getTime()) / D)), a = this.workdayMode ? `${It(i.start, i.end, this.ir.meta.workdays, this.ir.meta.holidays)}근무일` : `${o}일`, l = [
      `<div class="tip-title"><span class="st-dot st-dot-${n}"></span>${T(i.name)}</div>`,
      i.milestone ? `<div>◆ ${ht(i.start)}</div>` : `<div>${ht(i.start)} → ${i.open ? "미정" : ht(i.end)}${i.open ? "" : ` · ${a}`}</div>`,
      `<div>진척 ${Math.round((i.progress ?? 0) * 100)}%${i.assignee ? ` · ${T(i.assignee)}` : ""}</div>`,
      this.criticalSet().has(t) ? '<div class="tip-crit">크리티컬</div>' : "",
      i.note ? `<div class="tip-note">${T(i.note.split(`
`)[0].slice(0, 60))}</div>` : ""
    ].filter(Boolean).join("");
    this.hideTip();
    const c = document.createElement("div");
    c.className = "gantt-tip", c.innerHTML = l, this.root.querySelector(".root")?.appendChild(c);
    const p = this.getBoundingClientRect();
    c.style.left = Math.min(e + 14, p.width - 230) + "px", c.style.top = Math.min(s + 14, p.height - 100) + "px", this.tipEl = c;
  }
  hideTip() {
    this.tipTimer && (clearTimeout(this.tipTimer), this.tipTimer = 0), this.tipEl && (this.tipEl.remove(), this.tipEl = null);
  }
  /** 드래그 시작 시 모든 일시적 hover 피드백을 한 번에 제거 — 잔상이 드래그·드롭 피드백과
   *  겹치지 않게. 특히 바 드래그는 setPointerCapture 로 시작 행의 mouseleave 가 안 떠
   *  그 행의 .hl 밴드가 남고, 드롭 지점 행까지 밝아지면 '두 행이 동시에 강조'되는
   *  겹침(hl 4개)이 생긴다. 여기서 시작 행 잔상을 먼저 지워 그 겹침을 없앤다. */
  clearHoverFx() {
    this.hideTip(), this.root.querySelectorAll(".subtree-region, .subtree-region-left, .notch-tip").forEach((t) => t.remove()), this.root.querySelectorAll(".task-row.hl, .row-hit.hl").forEach((t) => t.classList.remove("hl")), this.root.querySelectorAll(".hot").forEach((t) => t.classList.remove("hot")), this.highlightArrows(null);
  }
  // ── 스낵바 — 조용한 실패/자동 변경을 사용자에게 알리는 유일한 통지 채널
  /** kind: info(회색)·warn(주황)·error(빨강). withUndo=true 면 '되돌리기' 버튼. */
  toast(t, e = "info", s = !1) {
    this.toastEl?.remove(), this.toastTimer && clearTimeout(this.toastTimer);
    const i = document.createElement("div");
    i.className = `gantt-toast ${e}`, i.setAttribute("role", "status"), i.innerHTML = `<span class="gt-msg">${T(t)}</span>${s ? '<button class="gt-undo">되돌리기</button>' : ""}`, i.querySelector(".gt-undo")?.addEventListener("click", () => {
      this.undo(), i.remove();
    }), this.root.querySelector(".root")?.appendChild(i), this.toastEl = i, this.toastTimer = window.setTimeout(() => {
      i.remove(), this.toastEl === i && (this.toastEl = null);
    }, s ? 6e3 : 3200);
  }
  /** 담당자 오버랩 아바타 스택 (셀·상세 필드 공용). max=표시 최대치, 초과 시 (max-1)명 + "+N". */
  renderAsgStack(t, e) {
    if (!t.length) return '<span class="asg-stack"><span class="asg-chip hollow">+</span></span>';
    const s = t.length > e ? e - 1 : t.length, i = t.slice(0, s).map((o, a) => `<span class="asg-chip" style="background:hsl(${Vt(o)},60%,50%);z-index:${e - a}">${T(o.charAt(0))}</span>`).join(""), n = t.length > s ? `<span class="asg-chip more">+${t.length - s}</span>` : "";
    return `<span class="asg-stack">${i}${n}</span>`;
  }
  cancelLinkDrag() {
    this.linkDrag && (this.linkDrag.temp.remove(), this.root.querySelectorAll(".bar.link-target, .bar.link-invalid").forEach((t) => t.classList.remove("link-target", "link-invalid")), this.classList.remove("link-bad"), this.linkDrag = null, this.classList.remove("linking", "dragging-any"), this.style.userSelect = "");
  }
  // ── 팝오버
  /** 상세 편집 레이어 — 더블클릭/그립 클릭/우클릭 메뉴로만 연다.
   *  기본은 가운데 모달(백드롭으로 명확히 레이어). detail-placement="left"|"float" 옵션. */
  openDetail(t, e, s = !1) {
    if (!this.ir) return;
    const i = this.ir.tasks.find((y) => y.id === t);
    if (!i) return;
    const n = s ? this.popEl?.querySelector(".dd-body")?.scrollTop ?? 0 : 0;
    s ? (this.closeSubLayer(), this.popEl && (this.popEl.remove(), this.popEl = null)) : this.closePopover(), this.selection = /* @__PURE__ */ new Set([t]), this.selAnchor = t, this.refreshSelectionUI();
    const o = Math.round((i.progress ?? 0) * 100), a = this.ir.links.filter((y) => y.target === t), l = this.ir.links.filter((y) => y.source === t);
    this.criticalSet().has(t);
    const c = V(i, this.todayDate), p = et[c], d = (this.getAttribute("detail-placement") || "center").toLowerCase();
    let h = null;
    d === "center" && !this.root.querySelector(".dd-backdrop") && (h = document.createElement("div"), h.className = "dd-backdrop", h.addEventListener("click", () => this.closePopover()), this.root.querySelector(".root")?.appendChild(h));
    const u = document.createElement("div");
    u.className = (d === "float" ? "detail-drawer float" : d === "left" ? "detail-drawer left" : "detail-drawer center") + (s ? " dd-noanim" : "");
    const g = V({ ...i, status: void 0 }, this.todayDate), f = ["done", "progress", "overdue", "upcoming", "hold"], b = (i.assignee ?? "").split(",").map((y) => y.trim()).filter(Boolean), x = Math.max(1, Math.round((i.end.getTime() - i.start.getTime()) / D)), $ = It(i.start, i.end, this.ir.meta.workdays, this.ir.meta.holidays);
    if (u.innerHTML = `
      <header class="dd-head">
        <span class="st-dot st-dot-${c}" title="${p}"></span>
        <div class="dd-htitle">태스크 상세</div>
        <button class="dd-close" aria-label="닫기">✕</button>
      </header>
      <div class="dd-body">
        <input class="dd-name dd-input dd-title-inp" value="${T(i.name)}" aria-label="항목명" placeholder="항목명" />

        <div class="dd-row dd-row-top">
          <span class="dd-rlab">상태</span>
          <div class="dd-stp dd-rctl">
            ${f.map((y) => `<button type="button" class="stp-opt${c === y ? " on" : ""}" data-st="${y}"><span class="st-dot st-dot-${y}"></span>${et[y]}</button>`).join("")}
            <span class="stp-sep"></span>
            <button type="button" class="stp-opt stp-urgent${i.critical ? " on" : ""}" data-dd-crit title="긴급 표시 (빨간 강조)"><span class="st-dot" style="background:#ea6a6a;box-shadow:none"></span>긴급</button>
          </div>
        </div>

        <div class="dd-div"></div>

        <div class="dd-row">
          <span class="dd-rlab">일정</span>
          <div class="dd-rctl">
            <div class="dp-fields dd-cal-fields">
              <button class="dp-field dd-start" data-dd-cal="start"><span class="dp-lab">시작</span><span class="dp-val">${K(i.start)}</span></button>
              <span class="dates-arrow">→</span>
              <button class="dp-field dd-end${i.open ? " tbd" : ""}" data-dd-cal="end"><span class="dp-lab">종료</span><span class="dp-val">${i.open ? "미정" : K($t(i.end))}</span></button>
            </div>
          </div>
        </div>
        <div class="dd-meta-row"><span class="dd-days">${i.open ? "종료일 미정" : `${x}일 · 근무일 ${$}일`}</span><button class="cp-link" data-dd-open>${i.open ? "종료일 지정" : "종료 미정으로"}</button></div>

        <div class="dd-row">
          <span class="dd-rlab">진척</span>
          <div class="dd-rctl pp-onerow">
            <input type="range" class="pp-range dd-progress" min="0" max="100" step="1" value="${o}" aria-label="진척률" />
            <span class="pp-num-wrap"><input type="number" class="pp-num dd-prog-num" min="0" max="100" step="1" value="${o}" /><span>%</span></span>
          </div>
        </div>

        <div class="dd-row">
          <span class="dd-rlab">담당</span>
          <div class="dd-rctl">
            <button class="dp-field dd-asg-field${b.length ? "" : " is-empty"}" data-dd-asg title="${T(b.join(", ") || "담당자 지정")}" aria-label="담당자 변경">
              ${this.renderAsgStack(b, 4)}
              <span class="dd-asg-txt${b.length ? "" : " muted"}">${T(b.length === 0 ? "담당자 지정" : b.length === 1 ? b[0] : `${b.length}명`)}</span>
              <span class="dp-caret">⌄</span>
            </button>
          </div>
        </div>

        <div class="dd-div"></div>

        <textarea class="dd-note" rows="2" placeholder="설명 · 메모 · 지연 사유…">${T(i.note ?? "")}</textarea>

        ${a.length || l.length ? `
        <div class="dd-links-block">
          <div class="dd-links-head">연결된 작업 <span class="dd-links-hint">선행: 먼저 끝나야 함 · 후행: 이 작업 뒤에 진행</span></div>
          ${a.length ? `<div class="dd-links-row"><span class="dd-rlab" title="이 작업이 시작되려면 먼저 끝나야 하는 작업">선행</span><div class="dd-links">${a.map((y) => {
      const L = this.ir.tasks.find((N) => N.id === y.source), A = L?.name ?? y.source, O = L ? ` · ${K(L.start)}~${K($t(L.end))}` : "";
      return `<span class="dd-link" data-goto="${T(y.source)}" title="${T(A)}${O} · 클릭해 상세 열기"><span class="dd-link-nm">${T(A)}</span><button class="dd-unlink" data-unlink-src="${T(y.source)}" data-unlink-tgt="${T(y.target)}" title="연결 끊기">✕</button></span>`;
    }).join("")}</div></div>` : ""}
          ${l.length ? `<div class="dd-links-row"><span class="dd-rlab" title="이 작업이 끝나야 시작되는 작업">후행</span><div class="dd-links">${l.map((y) => {
      const L = this.ir.tasks.find((N) => N.id === y.target), A = L?.name ?? y.target, O = L ? ` · ${K(L.start)}~${K($t(L.end))}` : "";
      return `<span class="dd-link" data-goto="${T(y.target)}" title="${T(A)}${O} · 클릭해 상세 열기"><span class="dd-link-nm">${T(A)}</span><button class="dd-unlink" data-unlink-src="${T(y.source)}" data-unlink-tgt="${T(y.target)}" title="연결 끊기">✕</button></span>`;
    }).join("")}</div></div>` : ""}
        </div>` : ""}

        <div class="dd-div"></div>
        <div class="dd-foot-del">
          <button class="dd-del" data-detail-del>태스크 삭제</button>
        </div>
      </div>
    `, d === "float" && e) {
      const y = this.getBoundingClientRect();
      u.style.left = Math.max(4, Math.min(e.clientX - y.left + 8, y.width - 320)) + "px", u.style.top = Math.max(40, Math.min(e.clientY - y.top + 8, y.height - 300)) + "px";
    }
    if (this.root.querySelector(".root")?.appendChild(u), this.popEl = u, s && n) {
      const y = u.querySelector(".dd-body");
      y && (y.scrollTop = n);
    }
    u.querySelector(".dd-close")?.addEventListener("click", () => this.closePopover());
    const m = u.querySelector(".dd-name"), v = () => {
      const y = m.value.trim();
      y && y !== i.name && (this.pushUndo(), i.name = y, this.renderPreserve(), this.reopenDetail(t));
    };
    m.addEventListener("keydown", (y) => {
      y.key === "Enter" && m.blur();
    }), m.addEventListener("change", v), u.querySelectorAll(".dd-stp .stp-opt").forEach((y) => y.addEventListener("click", () => {
      const L = y.dataset.st, A = L === g ? void 0 : L;
      A !== i.status && (this.pushUndo(), i.status = A, this.renderPreserve(), this.reopenDetail(t), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t, task: i } })));
    })), u.querySelector("[data-dd-asg]")?.addEventListener("click", () => {
      this.openAssigneePopover(t, u.querySelector("[data-dd-asg]"), { layer: !0, onCommit: () => this.reopenDetail(t) });
    }), u.querySelectorAll("[data-dd-cal]").forEach((y) => y.addEventListener("click", () => {
      this.openDatesPopover(t, y, { layer: !0, onCommit: () => this.reopenDetail(t) });
    })), u.querySelector("[data-dd-open]")?.addEventListener("click", () => {
      this.pushUndo(), i.open ? (i.open = void 0, i.end = new Date(i.start.getTime() + D), i.duration = D, mt(this.ir, /* @__PURE__ */ new Set([t]), this.rescheduleOpts())) : (i.open = !0, i.end = new Date(i.start.getTime() + D), i.duration = D), j(this.ir), this.cpm = _(this.ir), this.renderPreserve(), this.reopenDetail(t), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t, task: i } }));
    }), u.querySelector("[data-dd-crit]")?.addEventListener("click", () => {
      this.pushUndo(), i.critical = i.critical ? void 0 : !0, this.renderPreserve(), this.reopenDetail(t), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t, task: i } }));
    });
    const w = u.querySelector(".dd-prog-num");
    w?.addEventListener("keydown", (y) => y.stopPropagation()), w?.addEventListener("change", () => {
      const y = Math.max(0, Math.min(100, Math.round(Number(w.value) || 0)));
      y !== Math.round((i.progress ?? 0) * 100) && (this.pushUndo(), i.progress = y / 100, j(this.ir), this.cpm = _(this.ir), this.renderPreserve(), this.reopenDetail(t), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t, task: i } })));
    });
    const k = u.querySelector(".dd-progress");
    k && (k.addEventListener("pointerdown", () => {
      this.pendingSnap = this.takeSnapshot();
    }), k.addEventListener("input", () => {
      this.pendingSnap || (this.pendingSnap = this.takeSnapshot());
      const y = Number(k.value);
      i.progress = y / 100;
      const L = u.querySelector(".dd-prog-num");
      L && document.activeElement !== L && (L.value = String(y)), this.updateBarRect(i), this.updateProgressCell(i);
    }), k.addEventListener("change", () => {
      this.pendingSnap && (this.pushUndo(this.pendingSnap), this.pendingSnap = null), this.renderPreserve(), this.reopenDetail(t), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t, task: i } }));
    }));
    const E = u.querySelector(".dd-note");
    E?.addEventListener("change", () => {
      const y = E.value.trim();
      y !== (i.note ?? "") && (this.pushUndo(), i.note = y || void 0, this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t, task: i } })));
    }), u.querySelectorAll(".dd-unlink").forEach((y) => y.addEventListener("click", (L) => {
      L.stopPropagation();
      const A = y.dataset.unlinkSrc, O = y.dataset.unlinkTgt;
      this.pushUndo(), Ns(this.ir, A, O), j(this.ir), this.cpm = _(this.ir), this.renderPreserve(), this.reopenDetail(t), this.dispatchEvent(new CustomEvent("linkdelete", { detail: { source: A, target: O } }));
    })), u.querySelectorAll(".dd-link[data-goto]").forEach((y) => y.addEventListener("click", () => {
      this.openDetail(y.dataset.goto);
    })), u.querySelector("[data-detail-del]")?.addEventListener("click", () => {
      this.selection = /* @__PURE__ */ new Set([t]), this.closePopover(), this.deleteSelected();
    });
  }
  /** 편집 후 드로어를 최신 상태로 다시 연다 (선택 유지) */
  reopenDetail(t) {
    this.ir?.tasks.some((e) => e.id === t) && requestAnimationFrame(() => this.openDetail(t, void 0, !0));
  }
  updateProgressCell(t) {
    const s = this.root.querySelector(`.task-row[data-task-id="${st(t.id)}"]`)?.querySelector("[data-progress-cell]");
    if (!s) return;
    const i = Math.round((t.progress ?? 0) * 100);
    s.title = `진척률 ${i}% · 클릭해 변경`;
    const n = s.querySelector(".prog-ring");
    if (!n) return;
    n.dataset.p = String(i);
    let o = n.querySelector(".pr-arc");
    if (i <= 0) {
      o?.remove();
      return;
    }
    const a = 2 * Math.PI * 6.5;
    o || (o = document.createElementNS("http://www.w3.org/2000/svg", "circle"), o.setAttribute("class", "pr-arc"), o.setAttribute("cx", "8"), o.setAttribute("cy", "8"), o.setAttribute("r", "6.5"), n.appendChild(o)), o.style.stroke = t.color || pe[V(t, this.todayDate)], o.setAttribute("stroke-dasharray", `${(a * i / 100).toFixed(1)} ${a.toFixed(1)}`);
  }
  // ── 링크(의존성) 편집 팝오버 — 타입 4종 + lag + 삭제
  showLinkPopover(t, e, s) {
    if (!this.ir) return;
    const i = this.ir.links.find((u) => u.source === t && u.target === e);
    if (!i) return;
    this.closePopover();
    const n = [
      { t: "FS", label: "끝나면 시작", desc: "앞 작업이 끝나야 이 작업 시작 (기본)" },
      { t: "SS", label: "같이 시작", desc: "앞 작업이 시작될 때 이 작업도 시작" },
      { t: "FF", label: "같이 종료", desc: "앞 작업이 끝날 때 이 작업도 종료" },
      { t: "SF", label: "시작되면 종료", desc: "앞 작업이 시작되면 이 작업 종료" }
    ], o = Math.round((i.lag ?? 0) / D), a = document.createElement("div");
    a.className = "popover", a.innerHTML = `
      <button class="p-close" aria-label="닫기">✕</button>
      <div class="p-title">연결: ${T(t)} → ${T(e)}</div>
      <div class="p-row" style="align-items:flex-start"><span>방식</span>
        <span class="link-types">
          ${n.map((u) => `<button class="lt ${i.type === u.t ? "on" : ""}" data-lt="${u.t}" title="${u.desc}">${u.label}</button>`).join("")}
        </span>
      </div>
      <div class="p-row"><span>간격</span>
        <input type="number" class="p-lag" value="${o}" step="1" style="width:64px" /> <b>일 뒤에</b>
      </div>
      <div class="p-row"><button class="lt-del" data-link-del>연결 끊기</button></div>
    `;
    const l = this.getBoundingClientRect(), c = s.clientX - l.left + 8, p = s.clientY - l.top + 8;
    a.style.left = Math.max(4, Math.min(c, l.width - 260)) + "px", a.style.top = Math.max(4, Math.min(p, l.height - 180)) + "px", this.root.querySelector(".root")?.appendChild(a), this.popEl = a, a.querySelector(".p-close")?.addEventListener("click", () => this.closePopover());
    const d = () => {
      mt(this.ir, /* @__PURE__ */ new Set([t]), this.rescheduleOpts()), j(this.ir), this.cpm = _(this.ir), this.renderPreserve(), this.dispatchEvent(new CustomEvent("linkchange", { detail: { source: t, target: e, type: i.type, lag: i.lag } }));
    };
    a.querySelectorAll(".lt").forEach((u) => u.addEventListener("click", () => {
      const g = u.dataset.lt;
      g !== i.type && (this.pushUndo(), Qn(this.ir, t, e, g), d());
    }));
    const h = a.querySelector(".p-lag");
    h?.addEventListener("change", () => {
      const u = Math.round(Number(h.value) || 0);
      u * D !== (i.lag ?? 0) && (this.pushUndo(), i.lag = u * D, d());
    }), a.querySelector("[data-link-del]")?.addEventListener("click", () => {
      this.pushUndo(), Ns(this.ir, t, e), j(this.ir), this.cpm = _(this.ir), this.closePopover(), this.renderPreserve(), this.dispatchEvent(new CustomEvent("linkdelete", { detail: { source: t, target: e } }));
    });
  }
  closePopover() {
    this.closeSubLayer(), this.popEl && (this.popEl.remove(), this.popEl = null), this.repositionPopover = null, this.root.querySelectorAll(".dd-backdrop").forEach((t) => t.remove());
  }
  // ── 태스크 추가 (선택 항목 다음, 없으면 끝)
  addTask() {
    if (!this.ir) {
      const o = /* @__PURE__ */ new Date();
      o.setHours(0, 0, 0, 0), this.ir = {
        meta: { title: "새 프로젝트", today: o, workdays: ["mon", "tue", "wed", "thu", "fri"], holidays: [], scale: "day" },
        tasks: [],
        links: []
      }, this.parseErrors = [], this.rangeStart = new Date(o.getTime() - 14 * D), this.rangeEnd = new Date(o.getTime() + 45 * D);
    }
    this.closePopover(), this.pushUndo();
    const t = this.selection.size ? [...this.selection][this.selection.size - 1] : null, e = this.ir.tasks.map((o) => o.start.getTime()), s = e.length ? new Date(Math.min(...e)) : /* @__PURE__ */ new Date(), { task: i, index: n } = Jn(this.ir, { afterId: t, start: s });
    j(this.ir), this.cpm = _(this.ir), this.selection = /* @__PURE__ */ new Set([i.id]), this.selAnchor = i.id, this.renderPreserve(), this.beginNameEdit(i.id), this.dispatchEvent(new CustomEvent("taskadd", { detail: { taskId: i.id, index: n } }));
  }
  /** 새 행 이름 편집 진입 — 초기 스크롤이 선제 무한확장 재렌더를 유발할 수 있어
   *  확장 스로틀(120ms) 이후 최종 DOM에서 진입한다. */
  beginNameEdit(t) {
    setTimeout(() => {
      const e = this.root.querySelector(`.task-row[data-task-id="${st(t)}"]`);
      e?.scrollIntoView?.({ block: "nearest" });
      const s = e?.querySelector('[data-edit="name"]');
      s && this.startInlineEdit(t, "name", s);
    }, 200);
  }
  /** 기준 태스크 대비 상대 추가 (행 ＋버튼 · 우클릭 메뉴). 추가 후 즉시 이름 편집. */
  addRelative(t, e) {
    if (!this.ir) return;
    this.closeContextMenu(), this.closePopover();
    const s = this.takeSnapshot(), i = sr(this.ir, t, e);
    if (!i) {
      e === "child" && this.toast("더 깊게 하위로 넣을 수 없어요", "warn");
      return;
    }
    this.pushUndo(s), e === "child" && this.collapsed.delete(t), j(this.ir), this.cpm = _(this.ir), this.selection = /* @__PURE__ */ new Set([i.task.id]), this.selAnchor = i.task.id, this.renderPreserve(), this.beginNameEdit(i.task.id), this.dispatchEvent(new CustomEvent("taskadd", { detail: { taskId: i.task.id, mode: e, refId: t } }));
  }
  // ── 이름 셀 "+" 추가 메뉴 (하위 / 같은 레벨) — "+" 하나의 모호성 제거
  openAddMenu(t, e) {
    if (!this.ir) return;
    this.closeContextMenu();
    const i = [
      ...Bt(this.ir, t) >= us ? [] : [{ label: "하위 추가", mode: "child" }],
      { label: "같은 레벨 추가", mode: "below" }
    ], n = document.createElement("div");
    n.className = "ctx-menu add-menu", n.setAttribute("role", "menu"), n.innerHTML = i.map((u, g) => `<button class="ctx-item" role="menuitem" data-ci="${g}">${u.label}</button>`).join(""), this.root.querySelector(".root")?.appendChild(n);
    const o = this.getBoundingClientRect(), a = e.getBoundingClientRect(), l = n.offsetWidth || 130, c = n.offsetHeight || 74, p = Math.max(4, Math.min(a.left - o.left, o.width - l - 8)), d = a.bottom - o.top + 4, h = d + c > o.height - 8 ? Math.max(4, a.top - o.top - c - 4) : d;
    n.style.left = p + "px", n.style.top = h + "px", this.contextMenu = n, e.closest(".insert-zone")?.classList.add("menu-open"), n.querySelectorAll(".ctx-item").forEach((u) => u.addEventListener("click", (g) => {
      g.stopPropagation();
      const f = i[Number(u.dataset.ci)];
      this.closeContextMenu(), this.addRelative(t, f.mode);
    }));
  }
  // ── 우클릭 컨텍스트 메뉴
  showContextMenu(t, e) {
    if (!this.ir) return;
    this.closeContextMenu(), this.selection = /* @__PURE__ */ new Set([t]), this.selAnchor = t, this.refreshSelectionUI();
    const s = !!this.ir.tasks.find((d) => d.id === t)?.milestone, i = [
      { label: "상세 보기", act: () => this.openDetail(t) },
      { label: "날짜로 이동…", act: () => this.openMoveCalendar(t, e) },
      { label: s ? "일반 태스크로 전환" : "마일스톤으로 전환", act: () => this.toggleMilestone(t) },
      { label: "위에 추가", act: () => this.addRelative(t, "above"), sep: !0 },
      { label: "아래에 추가", act: () => this.addRelative(t, "below") },
      { label: "하위항목 추가", act: () => this.addRelative(t, "child") },
      { label: "들여쓰기", act: () => this.moveLevel(t, "in"), sep: !0 },
      { label: "내어쓰기", act: () => this.moveLevel(t, "out") },
      { label: "삭제", act: () => {
        this.selection = /* @__PURE__ */ new Set([t]), this.deleteSelected();
      }, danger: !0, sep: !0 }
    ], n = document.createElement("div");
    n.className = "ctx-menu", n.innerHTML = i.map(
      (d, h) => `<button class="ctx-item${d.danger ? " danger" : ""}${d.sep ? " sep" : ""}" data-ci="${h}">${d.label}</button>`
    ).join(""), this.root.querySelector(".root")?.appendChild(n);
    const o = this.getBoundingClientRect(), a = n.offsetWidth || 170, l = n.offsetHeight || 280, c = e.clientX - o.left, p = e.clientY - o.top;
    n.style.left = Math.max(4, Math.min(c, o.width - a - 8)) + "px", n.style.top = (p + l > o.height - 8 ? Math.max(4, p - l) : p) + "px", this.contextMenu = n, n.querySelectorAll(".ctx-item").forEach((d) => d.addEventListener("click", () => {
      const h = i[Number(d.dataset.ci)];
      this.closeContextMenu(), h.act();
    }));
  }
  closeContextMenu() {
    this.contextMenu && (this.contextMenu.remove(), this.contextMenu = null), this.root.querySelectorAll(".insert-zone.menu-open").forEach((t) => t.classList.remove("menu-open"));
  }
  /** 필터 메뉴 내용 렌더 — 열 때와 토글 후 갱신에서 공용 (같은 노드 유지로 깜빡임 없음) */
  renderFilterMenu(t, e) {
    const s = t === "assignee" ? this.filterAssignees : this.filterStatuses, i = t === "assignee" ? [
      { v: "", html: '<span class="mi-ic">◎</span>담당자 전체' },
      ...this.assigneeOptions().map((n) => ({ v: n, html: `<span class="asg-avatar mi-av" style="background:hsl(${Vt(n)},60%,50%)">${T(n.charAt(0))}</span>${T(n)}` }))
    ] : [
      { v: "", html: '<span class="mi-ic">◎</span>상태 전체' },
      ...["done", "progress", "overdue", "upcoming", "hold"].map((n) => ({ v: n, html: `<span class="st-dot st-dot-${n}"></span>${et[n]}` }))
    ];
    e.innerHTML = i.map((n) => {
      const o = n.v === "" ? s.size === 0 : s.has(n.v);
      return `<button class="mi${o ? " on" : ""}" data-v="${T(n.v)}">${n.html}${o ? '<span class="mi-chk">✓</span>' : ""}</button>`;
    }).join(""), e.querySelectorAll(".mi").forEach((n) => n.addEventListener("click", (o) => {
      o.stopPropagation(), this.toggleFilter(t, n.dataset.v ?? "");
    }));
  }
  /** 커스텀 드롭다운(필터) — 네이티브 select 대체. 항목에 아바타/상태 도트 표시. */
  openFilterMenu(t, e) {
    if (this.popEl?.isConnected && this.popEl.classList.contains("menu-pop")) {
      this.closePopover();
      return;
    }
    const s = this.openCellPopover(e, "menu-pop", "");
    this.renderFilterMenu(t, s);
  }
  /** ⚙ 설정 레이어 — 툴바에서 분리한 보기 설정. 즉시 적용, 레이어는 유지(재오픈). */
  openSettingsPopover(t) {
    if (this.popEl?.isConnected && this.popEl.classList.contains("settings-pop")) {
      this.closePopover();
      return;
    }
    const e = (a, l, c, p = "") => `<button class="set-row${c ? " cp-on" : ""}" data-action="${a}">
        <span class="set-txt">${l}${p ? `<span class="set-desc">${p}</span>` : ""}</span>
        <span class="set-sw${c ? " on" : ""}"></span>
      </button>`, s = this.getAttribute("theme") || "light", i = this.openCellPopover(t, "settings-pop", `
      <div class="cp-title">보기 설정 <button class="cp-x" data-x title="닫기">✕</button></div>
      ${e("workday", "주말·휴일 제외", this.workdayMode, "자동 배치가 근무일로 스냅")}
      ${e("group-assignee", "담당자별 그룹", this.groupBy === "assignee", "리스트를 담당자 단위로 묶기")}
      ${e("labels-toggle", "바 이름 라벨", this.barLabelsOn, "차트 바 옆 태스크명 표시")}
      <div class="set-sect">진척 조절 스텝 <span class="set-desc">바 클릭 후 ↑/↓ 방향키로 조절되는 단위</span></div>
      <div class="set-seg">
        ${[[0.01, "1%"], [0.05, "5%"], [0.1, "10%"], [0.25, "25%"]].map(([a, l]) => `<button class="${Math.abs(this.progressStep - a) < 1e-6 ? "on" : ""}" data-step="${a}">${l}</button>`).join("")}
      </div>
      <div class="set-sect">트리 기본 단계 <span class="set-desc">문서를 열 때 몇 단계까지 펼칠지</span></div>
      <div class="set-seg">
        ${[[1, "1단계"], [2, "2단계"], [3, "3단계"], ["all", "전체"]].map(([a, l]) => `<button class="${this.defaultTreeDepth === a ? "on" : ""}" data-tree-depth="${a}">${l}</button>`).join("")}
      </div>
      <div class="set-sect">테마</div>
      <div class="set-seg">
        ${[["light", "☀ 라이트"], ["dark", "🌙 다크"], ["auto", "◐ 자동"]].map(([a, l]) => `<button class="${s === a ? "on" : ""}" data-theme="${a}">${l}</button>`).join("")}
      </div>
    `);
    {
      const a = this.getBoundingClientRect();
      i.style.left = Math.max(8, Math.round((a.width - i.offsetWidth) / 2)) + "px", i.style.top = Math.max(16, Math.round((a.height - i.offsetHeight) / 2)) + "px";
      const l = document.createElement("div");
      l.className = "dd-backdrop", l.addEventListener("click", () => this.closePopover()), i.before(l);
    }
    i.querySelector("[data-x]")?.addEventListener("click", () => this.closePopover());
    const n = () => {
      const a = (c, p) => {
        const d = i.querySelector(`[data-action="${c}"]`);
        d?.classList.toggle("cp-on", p), d?.querySelector(".set-sw")?.classList.toggle("on", p);
      };
      a("workday", this.workdayMode), a("group-assignee", this.groupBy === "assignee"), a("labels-toggle", this.barLabelsOn), i.querySelectorAll("[data-step]").forEach((c) => c.classList.toggle("on", Math.abs(this.progressStep - Number(c.dataset.step)) < 1e-6)), i.querySelectorAll("[data-tree-depth]").forEach((c) => c.classList.toggle("on", String(this.defaultTreeDepth) === c.dataset.treeDepth));
      const l = this.getAttribute("theme") || "light";
      i.querySelectorAll("[data-theme]").forEach((c) => c.classList.toggle("on", l === c.dataset.theme));
    }, o = (a) => {
      this.keepPopoverAcross(a), n();
    };
    i.querySelector('[data-action="workday"]')?.addEventListener("click", () => o(() => this.toggleWorkday())), i.querySelector('[data-action="group-assignee"]')?.addEventListener("click", () => o(() => {
      this.groupBy = this.groupBy === "assignee" ? "none" : "assignee", this.collapsed.clear(), this.saveViewState(), this.renderPreserve();
    })), i.querySelector('[data-action="labels-toggle"]')?.addEventListener("click", () => o(() => {
      this.barLabelsOn = !this.barLabelsOn, this.saveViewState(), this.renderPreserve();
    })), i.querySelectorAll("[data-step]").forEach((a) => a.addEventListener("click", () => {
      this.progressStep = Number(a.dataset.step) || 0.05, this.saveViewState(), n(), this.toast(`진척 스텝: ${Math.round(this.progressStep * 100)}% (↑/↓)`);
    })), i.querySelectorAll("[data-tree-depth]").forEach((a) => a.addEventListener("click", () => {
      const l = a.dataset.treeDepth;
      o(() => {
        this.defaultTreeDepth = l === "all" ? "all" : Number(l), this.saveViewState(), this.setTreeDepth(this.defaultTreeDepth);
      }), this.toast(`트리 기본 단계: ${l === "all" ? "전체 펼침" : l + "단계까지"} — 문서 열 때 적용`);
    })), i.querySelectorAll("[data-theme]").forEach((a) => a.addEventListener("click", () => {
      const l = a.dataset.theme;
      o(() => {
        this.setAttribute("theme", l), this.saveViewState(), this.renderPreserve();
      }), this.toast(`테마: ${l === "dark" ? "다크" : l === "auto" ? "시스템 자동" : "라이트"}`);
    }));
  }
  /** 도움말 팝오버 — 기능·단축키를 카테고리별로 정리 (센터 레이어) */
  openHelpPopover(t) {
    if (this.popEl?.isConnected && this.popEl.classList.contains("help-pop")) {
      this.closePopover();
      return;
    }
    const e = (c) => `<kbd class="help-k">${c}</kbd>`, s = `${Math.round((this.progressStep > 0 ? this.progressStep : 0.05) * 100)}%`, i = (c, p, d) => `
      <div class="help-block">
        <div class="help-sect">${c}${p ? `<span class="help-note">${p}</span>` : ""}</div>
        <div class="help-rows">
          ${d.map(([h, u]) => `<div class="help-row"><div class="help-keys">${h}</div><div class="help-desc">${u}</div></div>`).join("")}
        </div>
      </div>`, n = `
      <div class="cp-title">도움말 · 기능 정리 <button class="cp-x" data-x title="닫기">✕</button></div>
      <div class="help-body">
        ${i("바 클릭 · 액티브", "차트에서", [
      [e("클릭"), "바 선택 + <b>액티브</b> — 진척 조절 노치(슬라이더)가 나타남"],
      [e("더블클릭"), "태스크 상세 열기"],
      [e("우클릭"), "컨텍스트 메뉴 (상태·삭제 등)"],
      [`${e("⌘")}/${e("Ctrl")}+클릭`, "다중 선택 토글"],
      [`${e("Shift")}+클릭`, "범위 선택"],
      [`빈 곳 클릭 / ${e("Esc")}`, "액티브·선택 해제"]
    ])}
        ${i("방향키 조작", `바를 클릭해 <b>액티브</b>된 상태에서 · 진척 스텝 ${s} (설정에서 변경)`, [
      [`${e("←")} ${e("→")}`, "한 칸씩 이동 (기간 유지)"],
      [`${e("Shift")}+${e("←")} ${e("→")}`, "기간 하루씩 증감 (최소 1일)"],
      [`${e("↑")} ${e("↓")}`, `진척 ${s}씩 조절 (0~100% 클램프)`]
    ])}
        ${i("드래그", "차트에서 마우스로", [
      ["바 몸통 드래그", "기간 유지한 채 이동"],
      ["좌·우 끝 드래그", "시작/종료일 조절 (기간 변경)"],
      ["진척 노치 드래그", "진척% 정밀 조절 (1% 단위)"],
      ["링크 점 드래그", "태스크 간 의존(연결) 생성"],
      ["좌측 ⠿ 그립 드래그", "계층 재배치 (부모 변경)"]
    ])}
        ${i("키보드 (선택)", "액티브가 아닐 때", [
      [e("Enter"), "선택 태스크 상세"],
      [`${e("Tab")} / ${e("Shift")}+${e("Tab")}`, "들여쓰기 / 내어쓰기 (레벨 이동)"],
      [`${e("Delete")} / ${e("Backspace")}`, "선택 태스크 삭제"],
      [`${e("↑")} ${e("↓")}`, "행(선택) 위·아래 이동"],
      [`${e("⌘")}/${e("Ctrl")}+${e("Z")}`, "실행 취소"],
      [`${e("⌘")}/${e("Ctrl")}+${e("Shift")}+${e("Z")}`, "다시 실행"]
    ])}
        ${i("보기 · 탐색", "", [
      [`${e("Ctrl")}/${e("Alt")}+휠`, "차트 확대/축소"],
      ["일 / 주 / 월 토글", "시간 축 단위 전환"],
      ["이름 컬럼 헤더 계층 아이콘", "트리 접기/펼치기 — 모두 접기·펼치기 / n단계까지 (연속 실행)"],
      ["⚙ 설정", "주말제외·그룹·테마·진척 스텝·트리 기본 단계·컬럼"]
    ])}
      </div>`, o = this.openCellPopover(t, "help-pop", n), a = document.createElement("div");
    a.className = "dd-backdrop", a.addEventListener("click", () => this.closePopover()), o.before(a);
    const l = () => {
      const c = this.getBoundingClientRect(), p = o.offsetWidth || 760;
      o.style.left = Math.max(8, Math.round((c.width - p) / 2)) + "px";
      const d = o.offsetHeight, h = Math.max(12, Math.round((c.height - d) / 2));
      o.style.top = h + "px";
      const u = o.getBoundingClientRect().top;
      o.style.maxHeight = Math.max(160, Math.round(window.innerHeight - u - 14)) + "px";
    };
    l(), requestAnimationFrame(l), o.querySelector("[data-x]")?.addEventListener("click", () => this.closePopover());
  }
  /** 컬럼 표시 팝오버 — 좌측 헤더 ⊞ 버튼 아래. 즉시 적용, 레이어는 같은 노드로 유지(깜빡임 없음). */
  openColsPopover(t) {
    if (this.popEl?.isConnected && this.popEl.classList.contains("cols-pop")) {
      this.closePopover();
      return;
    }
    this.openCellPopover(t, "cols-pop", `
      <div class="cp-title">컬럼 표시</div>
      <div class="set-cols">
        ${Be.map((s) => `<label class="col-picker-item"><input type="checkbox" ${this.cols.some((i) => i.key === s.key) ? "checked" : ""} data-col="${s.key}" /><span>${T(s.label)}</span></label>`).join("")}
      </div>
    `).querySelectorAll(".set-cols input").forEach((s) => s.addEventListener("change", (i) => {
      this.keepPopoverAcross(() => {
        this.toggleColumn(i.target.dataset.col), this.saveViewState();
      });
    }));
  }
  // ── 셀 편집 팝오버 공통: 앵커 아래(아래 공간 부족 시 위로 플립) 카드.
  //    onOk가 있으면 확인/취소 푸터 — 확인을 눌러야 반영, 바깥 클릭·취소는 폐기.
  openCellPopover(t, e, s, i) {
    const n = !!i?.layer;
    n ? this.closeSubLayer() : this.closePopover();
    const o = () => n ? this.closeSubLayer() : this.closePopover(), a = document.createElement("div");
    a.className = `cell-pop ${e}${n ? " cp-layer" : ""}`, a.innerHTML = s + (i?.onOk ? `
      <div class="cp-actions">
        <button class="cp-cancel">취소</button>
        <button class="cp-ok">확인</button>
      </div>` : ""), a.style.visibility = "hidden", this.root.querySelector(".root")?.appendChild(a);
    const l = () => {
      if (!a.isConnected) return;
      const c = this.getBoundingClientRect(), p = t.getBoundingClientRect(), d = a.offsetHeight || 220, h = a.offsetWidth || 240, u = 12, g = window.innerHeight, f = g - p.bottom - u, b = p.top - u;
      let x = f >= d || f >= b ? p.bottom + 4 : p.top - d - 4;
      x = Math.max(u, Math.min(x, g - d - u)), a.style.left = Math.max(4, Math.min(p.left - c.left, c.width - h - 8)) + "px", a.style.top = x - c.top + "px";
    };
    return l(), requestAnimationFrame(() => {
      l(), a.style.visibility = "visible";
    }), this.repositionPopover = l, n ? this.subLayer = a : this.popEl = a, i?.onOk && (a.querySelector(".cp-ok")?.addEventListener("click", () => {
      i.onOk() !== !0 && o();
    }), a.querySelector(".cp-cancel")?.addEventListener("click", () => o())), setTimeout(() => {
      const c = (p) => {
        if ((n ? this.subLayer : this.popEl) !== a) {
          document.removeEventListener("mousedown", c);
          return;
        }
        const h = p.composedPath(), u = h.some((g) => g?.classList?.contains?.("cal-pop"));
        !h.includes(a) && !u && (o(), document.removeEventListener("mousedown", c));
      };
      n && (this.subLayerCloser = c), document.addEventListener("mousedown", c);
    }, 0), a;
  }
  closeSubLayer() {
    this.subLayerCloser && (document.removeEventListener("mousedown", this.subLayerCloser), this.subLayerCloser = null), this.subLayer && (this.subLayer.remove(), this.subLayer = null), this.repositionPopover = null;
  }
  /** ④ 담당자 — 원형 아바타 다중 선택(스테이징). 확인을 눌러야 반영. layer=true면 상세 위 보조 레이어. */
  openAssigneePopover(t, e, s) {
    const i = this.ir?.tasks.find((g) => g.id === t);
    if (!i) return;
    const n = (i.assignee ?? "").split(",").map((g) => g.trim()).filter(Boolean), o = this.people.length ? [...this.people] : this.assigneeOptions().filter((g) => g !== "미지정");
    for (const g of n) o.includes(g) || o.push(g);
    const a = new Set(n), l = (g, f) => `<label class="asg-item" data-name="${T(g)}"><input type="checkbox" data-asg="${T(g)}"${f ? " checked" : ""}/><span class="asg-avatar" style="background:hsl(${Vt(g)},60%,50%)">${T(g.charAt(0))}</span><span class="asg-nm">${T(g)}</span><span class="asg-check">✓</span></label>`, c = this.openCellPopover(e, "asg-pop", `
      <div class="cp-title">담당자 <span class="cp-hint">${o.length}명 · 여러 명 가능</span></div>
      <label class="asg-search"><span class="asg-search-i">⌕</span><input type="search" placeholder="이름 검색" /></label>
      <div class="asg-selected"></div>
      <div class="asg-list">${o.map((g) => l(g, a.has(g))).join("") || '<div class="asg-empty">등록된 담당자가 없어요</div>'}</div>
    `, { layer: s?.layer, onOk: () => {
      const g = [...a].join(", ");
      g !== (i.assignee ?? "") && (this.pushUndo(), i.assignee = g || void 0, this.renderPreserve(), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t, task: i } })), s?.onCommit?.());
    } }), p = c.querySelector(".asg-selected"), d = () => {
      p.innerHTML = a.size ? `<div class="asg-sel-head"><span class="asg-sel-lab">선택 ${a.size}</span><button type="button" class="asg-clear" data-clear>모두 해제</button></div><div class="asg-sel-chips">` + [...a].map((g) => `<span class="asg-sel-chip" data-chip="${T(g)}"><span class="asg-avatar sm" style="background:hsl(${Vt(g)},60%,50%)">${T(g.charAt(0))}</span>${T(g)}<span class="asg-x">×</span></span>`).join("") + "</div>" : '<div class="asg-sel-head"><span class="asg-none">선택된 담당자 없음</span></div>', p.querySelectorAll(".asg-sel-chips [data-chip]").forEach((g) => g.addEventListener("click", () => {
        const f = g.dataset.chip;
        a.delete(f);
        const b = [...c.querySelectorAll(".asg-item input")].find((x) => x.dataset.asg === f);
        b && (b.checked = !1), d();
      })), p.querySelector("[data-clear]")?.addEventListener("click", () => {
        a.clear(), c.querySelectorAll(".asg-item input").forEach((g) => g.checked = !1), d();
      }), this.repositionPopover?.();
    }, h = (g) => g.addEventListener("change", () => {
      g.checked ? a.add(g.dataset.asg) : a.delete(g.dataset.asg), d();
    });
    c.querySelectorAll(".asg-item input").forEach((g) => h(g));
    const u = c.querySelector(".asg-search input");
    u?.addEventListener("keydown", (g) => g.stopPropagation()), u?.addEventListener("input", () => {
      const g = u.value.trim().toLowerCase();
      c.querySelectorAll(".asg-item").forEach((f) => {
        const b = (f.dataset.name || "").toLowerCase();
        f.style.display = !g || b.includes(g) ? "" : "none";
      });
    }), d();
  }
  /** ⑤ 기간 — 시작/종료 필드 + 한글 프리셋 + 인라인 범위 달력(레이어 안에 내장 → 달력을 눌러도 닫히지 않음).
   *  전부 스테이징, 확인을 눌러야 반영. */
  openDatesPopover(t, e, s) {
    const i = this.ir?.tasks.find((x) => x.id === t);
    if (!i) return;
    const n = { start: new Date(i.start), end: new Date(i.end), open: !!i.open, mode: i.milestone ? "point" : "range" };
    let o = "start";
    const a = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), this.todayDate.getDate()), l = (x) => `${x.getMonth() + 1}/${x.getDate()} ${"일월화수목금토"[x.getDay()]}`, c = new Date(a.getTime() + ((8 - a.getDay()) % 7 || 7) * D), p = [
      { k: "0", name: "오늘", sub: l(a) },
      { k: "1", name: "내일", sub: l(new Date(a.getTime() + D)) },
      { k: "nextmon", name: "다음 주", sub: l(c) },
      { k: "14", name: "2주 뒤", sub: l(new Date(a.getTime() + 14 * D)) },
      { k: "28", name: "4주 뒤", sub: l(new Date(a.getTime() + 28 * D)) },
      { k: "tbd", name: "종료 미정", sub: "지정 안 함" }
    ], d = this.openCellPopover(e, "dates-pop", `
      <div class="cp-title">일정 <span class="cp-hint">확인을 눌러야 반영</span></div>
      <div class="dp-fields">
        <button class="dp-field on" data-fld="start"><span class="dp-lab">시작</span><span class="dp-val"></span></button>
        <span class="dates-arrow dp-end-only">→</span>
        <button class="dp-field dp-end-only" data-fld="end"><span class="dp-lab">종료</span><span class="dp-val"></span></button>
      </div>
      <div class="dp-body">
        <div class="dp-presets">
          ${p.map((x) => `<button class="dp-preset${x.k === "tbd" ? " dp-end-only" : ""}" data-p="${x.k}"><span>${x.name}</span><span class="sub">${x.sub}</span></button>`).join("")}
        </div>
        <div class="dp-cal"></div>
      </div>
      <div class="dates-meta"></div>
    `, { layer: s?.layer, onOk: () => {
      const x = n.mode === "point";
      if (!x && !n.open && n.end.getTime() <= n.start.getTime())
        return this.toast("종료일은 시작일보다 뒤여야 해요", "warn"), !0;
      if (!(n.start.getTime() !== i.start.getTime() || n.end.getTime() !== i.end.getTime() || n.open !== !!i.open || x !== !!i.milestone)) return;
      this.pushUndo(), i.start = n.start, x ? (i.milestone = !0, i.open = void 0, i.end = new Date(n.start)) : (i.milestone = void 0, n.open ? (i.open = !0, i.end = new Date(n.start.getTime() + D)) : (i.open = void 0, i.end = n.end)), i.duration = i.end.getTime() - i.start.getTime();
      const m = mt(this.ir, /* @__PURE__ */ new Set([t]), this.rescheduleOpts());
      j(this.ir), this.cpm = _(this.ir), this.renderPreserve(), m > 0 && this.toast(`후행 ${m}건이 함께 이동됐어요`, "info", !0), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t, task: i } })), s?.onCommit?.();
    } }), h = d.querySelector(".dp-cal");
    let u = new Date(n.start.getFullYear(), n.start.getMonth(), 1);
    const g = () => {
      const x = Ve(u.getFullYear(), u.getMonth(), this.todayDate), $ = n.mode === "point", m = q(n.start), v = $ || n.open ? m : q($t(n.end)), w = q(this.todayDate);
      h.innerHTML = `
        <div class="cal-head">
          <span class="cal-title">${u.getFullYear()}년 ${u.getMonth() + 1}월</span>
          <button class="cal-nav" data-nav="t" title="오늘 달로">오늘</button>
          <button class="cal-nav" data-nav="-1">‹</button>
          <button class="cal-nav" data-nav="1">›</button>
        </div>
        <div class="cal-grid">
          ${["일", "월", "화", "수", "목", "금", "토"].map((k, E) => `<span class="cal-wd${E === 0 ? " sun" : E === 6 ? " sat" : ""}">${k}</span>`).join("")}
          ${x.map((k) => {
        const E = q(k.date), y = ["cal-day"];
        k.date.getMonth() !== u.getMonth() && y.push("dim"), E === w && y.push("today"), E === m && y.push("rng-start"), !$ && !n.open && E === v && y.push("rng-end"), !$ && !n.open && E > m && E < v && y.push("in-rng");
        const L = k.date.getDay();
        return L === 0 ? y.push("sun") : L === 6 && y.push("sat"), `<button class="${y.join(" ")}" data-iso="${E}">${k.date.getDate()}</button>`;
      }).join("")}
        </div>`, h.querySelectorAll(".cal-nav").forEach((k) => k.addEventListener("click", () => {
        const E = k.dataset.nav;
        u = E === "t" ? new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), 1) : new Date(u.getFullYear(), u.getMonth() + Number(E), 1), g();
      })), h.querySelectorAll(".cal-day").forEach((k) => k.addEventListener("click", () => {
        const [E, y, L] = k.dataset.iso.split("-").map(Number);
        b(new Date(E, y - 1, L));
      }));
    }, f = () => {
      const x = n.mode === "point";
      d.querySelectorAll(".dp-end-only").forEach((w) => w.style.display = x ? "none" : "");
      const $ = d.querySelector('[data-fld="start"]'), m = d.querySelector('[data-fld="end"]');
      $.querySelector(".dp-val").textContent = K(n.start), x && (o = "start"), $.classList.toggle("on", o === "start"), m && (m.querySelector(".dp-val").textContent = n.open ? "미정" : K($t(n.end)), m.classList.toggle("on", o === "end" && !x), m.classList.toggle("tbd", n.open));
      const v = d.querySelector(".dates-meta");
      if (x) v.textContent = K(n.start);
      else if (n.open) v.textContent = "종료일 미정 — 나중에 정하면 돼요";
      else {
        const w = Math.max(1, Math.round((n.end.getTime() - n.start.getTime()) / D)), k = It(n.start, n.end, this.ir.meta.workdays, this.ir.meta.holidays);
        v.textContent = `${w}일 · 근무일 ${k}일`;
      }
      g(), this.repositionPopover?.();
    }, b = (x) => {
      n.mode === "point" ? n.start = x : o === "start" ? (n.start = x, !n.open && n.end.getTime() <= x.getTime() && (n.end = new Date(x.getTime() + D)), o = "end") : x.getTime() < n.start.getTime() ? n.start = x : (n.end = new Date(x.getTime() + D), n.open = !1), u = new Date(x.getFullYear(), x.getMonth(), 1), f();
    };
    d.querySelectorAll(".dp-field").forEach((x) => x.addEventListener("click", () => {
      o = x.dataset.fld, f();
    })), d.querySelectorAll(".dp-preset").forEach((x) => x.addEventListener("click", () => {
      const $ = x.dataset.p;
      if ($ === "tbd") {
        n.open = !0, o = "end", f();
        return;
      }
      const m = $ === "nextmon" ? c : new Date(a.getTime() + Number($) * D);
      b(m);
    })), f();
  }
  /** ⑥ 진척률 — 슬라이더 + 숫자 입력 + 프리셋(스테이징), 확인 시 반영 */
  openProgressPopover(t, e) {
    const s = this.ir?.tasks.find((c) => c.id === t);
    if (!s) return;
    let i = Math.round((s.progress ?? 0) * 100);
    const n = this.openCellPopover(e, "prog-pop", `
      <div class="cp-title">진척률
        <span class="pp-num-wrap"><input type="number" class="pp-num" min="0" max="100" step="1" value="${i}" /><span>%</span></span>
      </div>
      <input type="range" class="pp-range" min="0" max="100" step="1" value="${i}" />
      <div class="pp-presets">${[0, 25, 50, 75, 100].map((c) => `<button class="pp-preset${c === i ? " on" : ""}" data-p="${c}">${c}%</button>`).join("")}</div>
    `, { onOk: () => {
      const c = Math.max(0, Math.min(100, i));
      c !== Math.round((s.progress ?? 0) * 100) && (this.pushUndo(), s.progress = c / 100, j(this.ir), this.cpm = _(this.ir), this.renderPreserve(), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t, task: s } })));
    } }), o = n.querySelector(".pp-range"), a = n.querySelector(".pp-num"), l = (c) => {
      i = Math.max(0, Math.min(100, Math.round(c || 0))), o.value = String(i), document.activeElement !== a && (a.value = String(i)), n.querySelectorAll(".pp-preset").forEach((p) => p.classList.toggle("on", Number(p.dataset.p) === i));
    };
    o.addEventListener("input", () => l(Number(o.value))), a.addEventListener("input", () => l(Number(a.value))), a.addEventListener("keydown", (c) => {
      c.stopPropagation(), c.key === "Enter" && n.querySelector(".cp-ok")?.click();
    }), n.querySelectorAll(".pp-preset").forEach((c) => c.addEventListener("click", () => l(Number(c.dataset.p))));
  }
  /** ③ 상태 — 5종(완료·진행·지연·예정·보류) 고유색 선택 스테이징, 확인 시 반영.
   *  자동 판정(날짜·진척 기반)과 같은 상태를 고르면 오버라이드 없이 자동 유지. 보류는 수동 전용. */
  openStatusPopover(t, e) {
    const s = this.ir?.tasks.find((d) => d.id === t);
    if (!s) return;
    if (s.milestone) {
      this.openCellPopover(e, "status-pop", `
        <div class="cp-title">상태</div>
        <div class="stp-current"><span class="st-ms">◆</span>마일스톤</div>
        <button class="stp-done" data-unms>일반 태스크로 전환</button>
      `).querySelector("[data-unms]")?.addEventListener("click", () => this.toggleMilestone(t));
      return;
    }
    const i = V({ ...s, status: void 0 }, this.todayDate), n = { done: "진척 100%", progress: "오늘이 기간 안", overdue: "종료일 지남", upcoming: "시작 전", hold: "수동 전용" }, o = ["done", "progress", "overdue", "upcoming", "hold"];
    let a = s.status, l = !!s.critical;
    const c = this.openCellPopover(e, "status-pop", `
      <div class="cp-title">상태 <span class="cp-hint">${s.status ? "수동 지정됨" : "자동 판정"}</span></div>
      <div class="stp-options">
        ${o.map((d) => `<button class="stp-opt${(a ?? i) === d ? " on" : ""}" data-st="${d}"><span class="st-dot st-dot-${d}"></span>${et[d]}</button>`).join("")}
      </div>
      <button class="cp-link${a ? "" : " on"}" data-auto>자동 판정 (${et[i]} · ${n[i]})</button>
      <button class="cp-crit${l ? " on" : ""}" data-crit><span class="st-dot" style="background:#ea6a6a;box-shadow:none"></span>긴급 표시<span class="cp-crit-hint">빨간 강조</span></button>
    `, { onOk: () => {
      const d = a === i ? void 0 : a, h = l || void 0;
      d === s.status && h === s.critical || (this.pushUndo(), s.status = d, s.critical = h, this.renderPreserve(), this.toast(d ? `상태: ${et[d]} (수동)` : `자동 판정으로 (${et[i]})`), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t, task: s } })));
    } }), p = () => {
      c.querySelectorAll(".stp-opt").forEach((d) => d.classList.toggle("on", d.dataset.st === (a ?? i))), c.querySelector("[data-auto]")?.classList.toggle("on", !a);
    };
    c.querySelectorAll(".stp-opt").forEach((d) => d.addEventListener("click", () => {
      a = d.dataset.st, p();
    })), c.querySelector("[data-auto]")?.addEventListener("click", () => {
      a = void 0, p();
    }), c.querySelector("[data-crit]")?.addEventListener("click", () => {
      l = !l, c.querySelector("[data-crit]")?.classList.toggle("on", l);
    });
  }
  /** 마일스톤 ↔ 일반 태스크 전환 (우클릭/모달) */
  toggleMilestone(t) {
    const e = this.ir?.tasks.find((s) => s.id === t);
    e && (this.pushUndo(), e.milestone ? (e.milestone = void 0, e.end = new Date(e.start.getTime() + D), e.duration = D) : (e.milestone = !0, e.end = new Date(e.start.getTime()), e.duration = 0, e.open = void 0), j(this.ir), this.cpm = _(this.ir), this.closePopover(), this.renderPreserve(), this.toast(e.milestone ? "마일스톤으로 전환했어요" : "일반 태스크로 전환했어요"), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t, task: e } })));
  }
  /** 장거리 날짜 이동 — 달력에서 새 시작일 선택 → 기간 유지 통째 이동 (드래그로 끝까지 끌 필요 없음) */
  openMoveCalendar(t, e) {
    const s = this.ir?.tasks.find((i) => i.id === t);
    s && this.openCalendarAt(e.clientX, e.clientY, {
      value: s.start,
      onPick: (i) => {
        const n = i.getTime() - new Date(s.start.getFullYear(), s.start.getMonth(), s.start.getDate()).getTime();
        n && (this.pushUndo(), s.start = new Date(s.start.getTime() + n), s.end = new Date(s.end.getTime() + n), mt(this.ir, /* @__PURE__ */ new Set([t]), this.rescheduleOpts()), j(this.ir), this.cpm = _(this.ir), this.renderPreserve(), this.scrollToTask(t), this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t, task: s } })));
      }
    });
  }
  /** 특정 태스크 바가 보이게 가로 스크롤 (이동 후 시야 유지) */
  scrollToTask(t) {
    if (!this.scale) return;
    const e = this.ir?.tasks.find((n) => n.id === t), s = this.root.querySelector(".right");
    if (!e || !s) return;
    const i = z(this.scale, e.start);
    (i < s.scrollLeft + 40 || i > s.scrollLeft + s.clientWidth - 80) && (s.scrollLeft = Math.max(0, i - s.clientWidth / 3));
  }
  // ── 인라인 편집 (이름/담당자) — 셀에 input 오버레이, Enter/blur 커밋, Esc 취소
  startInlineEdit(t, e, s) {
    if (!this.ir) return;
    const i = this.ir.tasks.find((d) => d.id === t);
    if (!i || s.querySelector(".inline-edit")) return;
    const n = e === "name" ? i.name : i.assignee ?? "", o = document.createElement("input");
    o.className = "inline-edit", o.value = n, o.spellcheck = !1;
    const a = e === "name" ? s.querySelector(".name-text") ?? s : s, l = a.innerHTML;
    a.innerHTML = "", a.appendChild(o), o.focus(), o.select();
    let c = !1;
    const p = (d) => {
      if (c) return;
      c = !0;
      const h = o.value.trim();
      d && h !== n ? (this.pushUndo(), e === "name" ? i.name = h || i.name : i.assignee = h || void 0, this.dispatchEvent(new CustomEvent("taskchange", { detail: { taskId: t, task: i } })), this.renderPreserve()) : a.innerHTML = l;
    };
    o.addEventListener("keydown", (d) => {
      d.key === "Enter" ? (d.preventDefault(), p(!0)) : d.key === "Escape" && (d.preventDefault(), p(!1)), d.stopPropagation();
    }), o.addEventListener("blur", () => p(!0));
  }
  // ── SVG/PNG 공통: Shadow CSS·테마변수를 주입한 독립 SVG 클론
  /** 내보내기 전용 렌더패스 — 좌측 이름/담당자/기간 컬럼 + 상단 날짜축 + 전체 행(가상화 무시)을
   *  하나의 오프스크린 SVG로 합성. 화면 렌더러의 renderBar/barLabel/arrowPathHtml 재사용. */
  buildExportSvg() {
    if (!this.ir || !this.ir.tasks.length) return null;
    j(this.ir), this.refreshVisible();
    const t = this.colW, e = As(this.ir, je(t), t), s = this.rowH, i = this.cols.reduce((b, x) => b + x.width, 0), n = Mi, o = e.totalWidth, a = this.rows.length * s, l = i + o, c = n + a, p = e.cells, d = je(t), h = this.criticalSet(), u = q(this.todayDate), g = this.scale;
    let f = "";
    try {
      this.scale = e;
      const b = p.filter((S) => S.isWeekend || S.isHoliday).map((S) => `<rect x="${S.x}" y="0" width="${e.colWidth}" height="${a}" fill="${S.isHoliday ? "rgba(229,72,77,0.06)" : "rgba(0,0,0,0.035)"}" />`).join(""), x = p.map((S) => `<line x1="${S.x}" y1="0" x2="${S.x}" y2="${a}" stroke="rgba(0,0,0,0.06)" />`).join(""), $ = [], m = [], v = [], w = [], k = Math.max(10, Math.round(s * 0.5)), E = Math.round((s - k) / 2), y = 6e4;
      for (let S = 0; S < this.rows.length; S++) {
        $.push(`<line x1="0" y1="${(S + 1) * s}" x2="${o}" y2="${(S + 1) * s}" stroke="rgba(0,0,0,0.06)" />`);
        const I = this.rows[S].task;
        if (I && (m.push(this.renderBar(I, S, e, h)), !I.milestone)) {
          const P = z(e, I.start), R = Math.max(bt, z(e, I.end) - P);
          if (v.push(this.barLabel(I, P, R, S * s + s / 2, !!I.open)), I.baselineStart && I.baselineEnd) {
            const Z = z(e, I.baselineStart), F = Math.max(2, z(e, I.baselineEnd) - Z);
            this.baselineOn && w.push(`<rect class="baseline-bar" x="${Z}" y="${S * s + s - 5}" width="${F}" height="3" rx="1.5" />`);
          }
        }
      }
      const L = this.ir.links.map((S) => this.arrowPathHtml(S, h)).join(""), A = p.find((S) => q(S.date) === u), O = A ? `<line x1="${A.x + e.colWidth / 2}" y1="0" x2="${A.x + e.colWidth / 2}" y2="${a}" stroke="var(--plot-today)" stroke-width="1.5" stroke-dasharray="3 2" />` : "", N = [];
      let X = 0;
      for (let S = 1; S <= p.length; S++) {
        const I = p[S - 1].date, P = S < p.length ? p[S].date : null;
        (!P || P.getMonth() !== I.getMonth()) && (N.push(`<text class="exp-month" x="${X * e.colWidth + 4}" y="${Mt / 2}">${I.getFullYear()}.${I.getMonth() + 1}</text>`), X = S);
      }
      p.forEach((S) => {
        const I = S.x + e.colWidth / 2;
        d === "day" ? (N.push(`<text class="exp-dow" x="${I}" y="${Mt + 10}">${["일", "월", "화", "수", "목", "금", "토"][S.date.getDay()]}</text>`), N.push(`<text class="exp-day" x="${I}" y="${Mt + 24}">${S.date.getDate()}</text>`)) : (d === "week" && S.date.getDay() === 1 || d === "month" && S.date.getDate() === 1) && N.push(`<text class="exp-day" x="${I}" y="${Mt + 20}">${S.date.getDate()}</text>`);
      });
      const At = [], G = [], wt = [];
      let M = 0;
      this.cols.forEach((S, I) => {
        At.push(`<text class="exp-colhead" x="${M + 8}" y="${n - 12}">${T(S.label)}</text>`), I > 0 && At.push(`<line class="exp-sep" x1="${M}" y1="0" x2="${M}" y2="${n + a}" />`);
        const P = M, R = S.width;
        for (let Z = 0; Z < this.rows.length; Z++) {
          const F = this.rows[Z].task;
          if (!F) {
            I === 0 && this.rows[Z].group && G.push(`<text class="exp-name parent" x="${P + 8}" y="${Z * s + s / 2 + n}">${T(this.rows[Z].group.label)}</text>`);
            continue;
          }
          const tt = Z * s + s / 2 + n, ot = `exc${I}_${Z}`;
          wt.push(`<clipPath id="${ot}"><rect x="${P}" y="${Z * s + n}" width="${R - 6}" height="${s}" /></clipPath>`);
          const Ae = this.getLevel(F);
          if (S.key === "name") {
            const kt = F.milestone ? `<text class="exp-ms" x="${P + 8 + Ae * 12}" y="${tt}">◆</text>` : `<circle cx="${P + 12 + Ae * 12}" cy="${tt}" r="4.5" fill="${F.color || pe[V(F, this.todayDate)]}" />`;
            G.push(`<g clip-path="url(#${ot})">${kt}<text class="exp-name${this.rows.some((Di) => Di.task?.parentId === F.id) ? " parent" : ""}" x="${P + 22 + Ae * 12}" y="${tt}">${T(F.name)}</text></g>`);
          } else if (S.key === "assignee")
            G.push(`<g clip-path="url(#${ot})"><text class="exp-num" x="${P + 8}" y="${tt}">${T(F.assignee ?? "-")}</text></g>`);
          else if (S.key === "duration") {
            const kt = F.milestone ? K(F.start) : `${K(F.start)} ~ ${F.open ? "미정" : K(F.end)}`;
            G.push(`<g clip-path="url(#${ot})"><text class="exp-num" x="${P + 8}" y="${tt}">${kt}</text></g>`);
          } else if (S.key === "days") {
            const kt = F.milestone ? "—" : F.open ? "미정" : `${this.workdayMode ? It(F.start, F.end, this.ir.meta.workdays, this.ir.meta.holidays) : Math.max(1, Math.round((F.end.getTime() - F.start.getTime()) / D))}일`;
            G.push(`<g clip-path="url(#${ot})"><text class="exp-num" x="${P + 8}" y="${tt}">${kt}</text></g>`);
          } else if (S.key === "progress")
            G.push(`<g clip-path="url(#${ot})"><text class="exp-num" x="${P + 8}" y="${tt}">${Math.round((F.progress ?? 0) * 100)}%</text></g>`);
          else if (S.key === "start")
            G.push(`<g clip-path="url(#${ot})"><text class="exp-num" x="${P + 8}" y="${tt}">${K(F.start)}</text></g>`);
          else if (S.key === "end")
            G.push(`<g clip-path="url(#${ot})"><text class="exp-num" x="${P + 8}" y="${tt}">${F.milestone ? "—" : K(F.end)}</text></g>`);
          else if (S.key === "status") {
            const kt = V(F, this.todayDate);
            G.push(`<g clip-path="url(#${ot})"><text class="exp-num" x="${P + 8}" y="${tt}">${et[kt]}</text></g>`);
          }
        }
        M += S.width;
      }), f = `<svg xmlns="http://www.w3.org/2000/svg" width="${l}" height="${c}" viewBox="0 0 ${l} ${c}"
          style="--plot-bar:#7c5cff;--plot-bar-fill:#5b3ee0;--plot-critical:#e5484d;--plot-critical-fill:#b91c1c;--plot-milestone:#f3c06b;--plot-today:#ef4444;--plot-arrow:#c2c2ca;--plot-arrow-critical:#e5484d;--plot-text:#18181b;--plot-text-mute:#71717a;--plot-surface:#ffffff;--plot-border:rgba(0,0,0,0.1);--plot-grid:rgba(0,0,0,0.06);background:#ffffff">
        <style>${Re}${Br}</style>
        <defs>
          <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path class="dep-arrow" d="M0.5,1 L7,4 L0.5,7 Z" /></marker>
          <marker id="arrow-crit" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path class="dep-arrow critical" d="M0.5,1 L7,4 L0.5,7 Z" /></marker>
          ${wt.join("")}
        </defs>
        <rect x="0" y="0" width="${l}" height="${c}" fill="#ffffff" />
        <g transform="translate(${i},${n})">${b}${x}${$.join("")}${w.join("")}${L}${m.join("")}${v.join("")}${O}</g>
        <g transform="translate(${i},0)">${N.join("")}</g>
        <line class="exp-sep" x1="${i}" y1="0" x2="${i}" y2="${c}" />
        <line class="exp-sep" x1="0" y1="${n}" x2="${l}" y2="${n}" />
        ${At.join("")}
        <g>${G.join("")}</g>
      </svg>`;
    } finally {
      this.scale = g;
    }
    return { xml: f, w: l, h: c };
  }
  exportTitle() {
    return (this.ir?.meta.title ?? "gantt").replace(/[^\w가-힣-]+/g, "_");
  }
  // ── PNG 내보내기 (차트 SVG → 2x canvas → download)
  exportPNG() {
    const t = this.buildExportSvg();
    if (!t) return;
    const { xml: e, w: s, h: i } = t, n = URL.createObjectURL(new Blob([e], { type: "image/svg+xml;charset=utf-8" })), o = new Image();
    o.onload = () => {
      const a = Math.min(2, 16e3 / Math.max(s, i)), l = document.createElement("canvas");
      l.width = Math.round(s * a), l.height = Math.round(i * a);
      const c = l.getContext("2d");
      c.fillStyle = "#ffffff", c.fillRect(0, 0, l.width, l.height), c.scale(a, a), c.drawImage(o, 0, 0), URL.revokeObjectURL(n);
      const p = document.createElement("a");
      p.download = `${this.exportTitle()}.png`, p.href = l.toDataURL("image/png"), p.click();
    }, o.onerror = () => URL.revokeObjectURL(n), o.src = n;
  }
  // ── SVG 내보내기 (벡터 그대로 다운로드)
  exportSVG() {
    const t = this.buildExportSvg();
    if (!t) return;
    const e = URL.createObjectURL(new Blob([t.xml], { type: "image/svg+xml;charset=utf-8" })), s = document.createElement("a");
    s.download = `${this.exportTitle()}.svg`, s.href = e, s.click(), setTimeout(() => URL.revokeObjectURL(e), 1e3);
  }
  // ── 엑셀(.xlsx) 내보내기 — 헤더 색·상태 틴트·지브라·헤더 고정·자동필터까지 자체 스타일
  exportXlsx() {
    if (!this.ir) return;
    const e = [["태스크", "상태", "담당자", "시작일", "종료일", "기간(일)", "근무일", "진척률(%)", "구분", "크리티컬", "메모"].map((l, c) => ({ v: l, s: c === 0 || c === 10 ? dr : pr }))], s = [0], i = this.criticalSet();
    for (const l of this.ir.tasks) {
      const c = Bt(this.ir, l.id), p = V(l, this.todayDate), d = Math.max(1, Math.round((l.end.getTime() - l.start.getTime()) / D)), h = It(l.start, l.end, this.ir.meta.workdays, this.ir.meta.holidays), u = et[p], g = Y(this.ir, l.id), f = g ? yr : fr, b = g ? br : ur, x = g ? mr : hr;
      s.push(c - 1), e.push([
        { v: l.name, s: vr(c, g) },
        // Excel 들여쓰기 + 그룹 볼드/밴드
        { v: u, s: gr[u] ?? f },
        { v: l.assignee ?? "", s: x },
        { v: q(l.start), s: f },
        { v: l.milestone ? q(l.start) : l.open ? "미정" : q(l.end), s: f },
        { v: l.milestone ? 0 : d, s: b },
        { v: l.milestone ? 0 : h, s: b },
        { v: Math.round((l.progress ?? 0) * 100), s: b },
        { v: l.milestone ? "마일스톤" : g ? "그룹" : "태스크", s: f },
        { v: i.has(l.id) ? "Y" : "", s: f },
        { v: l.note ?? "", s: x }
      ]);
    }
    const n = Sr(e, this.ir.meta.title || "간트", {
      colWidths: [44, 10, 16, 13, 13, 9, 9, 13, 11, 10, 40],
      freezeHeader: !0,
      autoFilter: !0,
      headerHeight: 34,
      rowHeight: 30,
      dataBar: { col: 7 },
      // 진척률(%) 컬럼(0기준 7)에 보라 데이터 바
      outlineLevels: s
    }), o = URL.createObjectURL(new Blob([n], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })), a = document.createElement("a");
    a.download = `${this.exportTitle()}.xlsx`, a.href = o, a.click(), setTimeout(() => URL.revokeObjectURL(o), 1e3);
  }
};
ct.observedAttributes = ["src", "scale", "theme"], ct.active = null;
let Ge = ct;
function T(r) {
  return r.replace(/[&<>"']/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[t]);
}
function st(r) {
  return window.CSS?.escape ? window.CSS.escape(r) : r.replace(/["\\]/g, "\\$&");
}
function ht(r) {
  return `${r.getFullYear()}. ${String(r.getMonth() + 1).padStart(2, "0")}. ${String(r.getDate()).padStart(2, "0")}.`;
}
function K(r) {
  return `${String(r.getFullYear() % 100).padStart(2, "0")}.${String(r.getMonth() + 1).padStart(2, "0")}.${String(r.getDate()).padStart(2, "0")}`;
}
function $t(r) {
  return new Date(r.getTime() - D);
}
function Rr(r, t) {
  const e = (d) => String(d).padStart(2, "0"), [s, i, n] = [r.getFullYear() % 100, r.getMonth() + 1, r.getDate()], [o, a, l] = [t.getFullYear() % 100, t.getMonth() + 1, t.getDate()], c = `${e(s)}.${e(i)}.${e(n)}`;
  if (s === o && i === a && n === l) return c;
  const p = s === o && i === a ? e(l) : s === o ? `${e(a)}.${e(l)}` : `${e(o)}.${e(a)}.${e(l)}`;
  return `${c} ~ ${p}`;
}
typeof customElements < "u" && !customElements.get("plot-line") && customElements.define("plot-line", Ge);
export {
  D as DAY_MS,
  Ge as Plotline,
  _r as addWorkdays,
  As as buildScale,
  It as diffWorkdays,
  ve as isWorkingDay,
  q as isoLocal,
  ze as nextWorkday,
  Ts as parseGanttData,
  Kn as parseMermaidGantt,
  Hn as parseYamlGantt,
  _ as runCPM,
  Ar as serializeYaml,
  z as xAt
};
