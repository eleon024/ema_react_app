!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.EmaMei = t())
    : (e.EmaMei = t());
})(self, function () {
  return (() => {
    var e = {
        884: (e, t, r) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 });
          const n = r(98);
          class s extends n.default {
            toArray(e) {
              const t = this.resolveRangeTokens(e),
                r = Math.floor(t.start),
                s = Math.floor(t.end),
                o = Array.from(n.default.makeRange(s + 1 - r, r));
              return (o[0] = t.start), (o[o.length - 1] = t.end), o;
            }
            static parseRange(e) {
              const t = e.split("-"),
                r = n.default.parseEmaToken(t[0], !0),
                o = n.default.parseEmaToken(t[t.length - 1], !0);
              if (t.length > 1) {
                if ("end" === r && "end" !== o)
                  throw new Error("Bad API request");
                if ("start" === o && "start" !== r)
                  throw new Error("Bad API request");
                if ("all" === r && "all" === o)
                  throw new Error("Bad API request");
              }
              return new s(r, o);
            }
            resolveRangeTokens(e) {
              const t = e + 1,
                r =
                  "start" === this.start || "all" === this.start
                    ? 1
                    : this.start,
                n = "end" === this.end || "all" === this.end ? t : this.end;
              if (r < 0 || n > t) throw Error("EMA Range out of bounds");
              return new s(r, n);
            }
          }
          t.default = s;
        },
        925: (e, t, r) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 });
          const n = r(98),
            s = r(627),
            o = r(884),
            a = r(19);
          class i {
            constructor(e, t, r, a, i) {
              (this.docInfo = e),
                (this.measures = t),
                (this.staves = r),
                (this.beats = a),
                (this.completeness = i),
                (this._measureRanges = t
                  .split(",")
                  .map((e) => n.default.parseRange(e))),
                (this._staffRanges = r
                  .split(",")
                  .map((e) =>
                    e.split("+").map((e) => s.default.parseRange(e))
                  )),
                (this._beatRanges = a.split(",").map((e) =>
                  e.split("+").map((e) =>
                    e
                      .split("@")
                      .slice(1)
                      .map((e) => o.default.parseRange(e))
                  )
                )),
                (this.selection = this.getSelection());
            }
            static fromString(e, t) {
              let r = t.replace(/^\/+/, "");
              r = r.replace(/\/{2,}/g, "/");
              const [n, s, o, a] = r.split("/");
              return new i(e, n, s, o, a);
            }
            getSelection() {
              const e = new a.default([]);
              return (
                this._measureRanges
                  .map((e) => e.toArray(this.docInfo.measures))
                  .flat()
                  .map((t, r) => {
                    let n = r;
                    1 === this._staffRanges.length && (n = 0);
                    const s = this._staffRanges[n].map((e) => {
                        const r = Object.keys(this.docInfo.staves).reduce(
                          (e, r) => {
                            const n = parseInt(r, 10);
                            return (
                              t - 1 >= n && (e = this.docInfo.staves[n].length),
                              e
                            );
                          },
                          0
                        );
                        return e.toArray(r);
                      }),
                      o = new a.default([]);
                    Array.from(new Set(s.flat().sort())).map((e, s) => {
                      let a = s;
                      (n = r),
                        1 === this._beatRanges.length && (n = 0),
                        1 === this._beatRanges[n].length && (a = 0);
                      const i = Object.keys(this.docInfo.beats).reduce(
                        (e, r) => {
                          const n = parseInt(r, 10);
                          return (
                            t - 1 >= n && (e = this.docInfo.beats[n].count), e
                          );
                        },
                        0
                      );
                      o.add({
                        emaIdx: e,
                        selection: this._beatRanges[n][a].map((e) =>
                          e.resolveRangeTokens(i)
                        )
                      });
                    }),
                      e.add({ emaIdx: t, selection: o });
                  }),
                e
              );
            }
          }
          t.default = i;
        },
        98: (e, t) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 });
          class r {
            constructor(e, t) {
              (this.toString = () => `[${this.start} ${this.end}]`),
                (this.start = e),
                (this.end = t);
            }
            static makeRange(e, t = 0) {
              return [...Array(e).keys()].map((e) => e + t);
            }
            static parseEmaToken(e, t = !1) {
              return "all" === e || "start" === e || "end" === e
                ? e
                : t
                ? parseFloat(e)
                : parseInt(e, 10);
            }
            static parseRange(e) {
              const t = e.split("-"),
                n = r.parseEmaToken(t[0]),
                s = r.parseEmaToken(t[t.length - 1]);
              if (t.length > 1) {
                if ("end" === n && "end" !== s)
                  throw new Error("Bad API request");
                if ("start" === s && "start" !== n)
                  throw new Error("Bad API request");
                if ("all" === n && "all" === s)
                  throw new Error("Bad API request");
              }
              return new r(n, s);
            }
            toArray(e) {
              const t =
                  "start" === this.start || "all" === this.start
                    ? 1
                    : this.start,
                n = "end" === this.end || "all" === this.end ? e : this.end;
              if (t < 0 || n > e) throw Error("EMA Range out of bounds");
              return r.makeRange(n + 1 - t, t);
            }
          }
          t.default = r;
        },
        19: (e, t, r) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 });
          const n = r(884);
          class s {
            constructor(e) {
              this.contents = e;
            }
            add(e) {
              this.contents.push(e);
            }
            getSelection(e) {
              const t = this.contents.filter((t) => t.emaIdx === e)[0];
              if (t) return t.selection;
            }
            getMeasure(e) {
              const t = this.getSelection(e);
              if (t instanceof s) return t;
            }
            getStaff(e) {
              const t = this.getSelection(e);
              if (t instanceof Array && t[0] instanceof n.default) return t;
            }
          }
          t.default = s;
        },
        627: (e, t, r) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 });
          const n = r(98);
          class s extends n.default {
            static parseRange(e) {
              const t = e.split("-"),
                r = n.default.parseEmaToken(t[0]),
                o = n.default.parseEmaToken(t[t.length - 1]);
              if (t.length > 1) {
                if ("end" === r && "end" !== o)
                  throw new Error("Bad API request");
                if ("start" === o && "start" !== r)
                  throw new Error("Bad API request");
                if ("all" === r && "all" === o)
                  throw new Error("Bad API request");
              }
              return new s(r, o);
            }
          }
          t.default = s;
        },
        447: (e, t, r) => {
          r(845), (e.exports = self.fetch.bind(self));
        },
        679: (e, t, r) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 });
          const n = r(286);
          t.default = class {
            constructor(e, t) {
              (this.processed = !1),
                (this.mei = e.mei),
                (this.docInfo = e.docInfo),
                (this.ns = e.ns),
                (this.emaExp = t);
            }
            _getCurrentMeter(e) {
              let t;
              for (const r of Object.keys(this.docInfo.beats)) {
                const n = parseInt(r, 10);
                n + 1 <= e && (t = this.docInfo.beats[n]);
              }
              return t;
            }
            _calculateDur(e, t) {
              let r;
              switch (e.getAttribute("dur").trim()) {
                case "breve":
                  r = 0.5;
                  break;
                case "long":
                  r = 0.25;
                  break;
                default:
                  r = parseFloat(e.getAttribute("dur"));
              }
              let n = t.unit / r,
                s = 0;
              e.getAttribute("dots")
                ? (s = parseInt(e.getAttribute("dots"), 10))
                : e.querySelector("dot") &&
                  (s = e.querySelectorAll("dot").length);
              let o = r;
              for (const e of Array(s)) (o *= 2), (n += t.unit / o);
              const a = e.closest("tuplet");
              if (a) {
                const e = a.getAttribute("numbase"),
                  t = a.getAttribute("num");
                if (!t || !e)
                  throw new Error(
                    "Cannot understand tuplet beat: both @num and @numbase must be present"
                  );
                n *= parseFloat(e) / parseFloat(t);
              }
              return n;
            }
            _getPositionInRanges(e, t, r, n) {
              const s = e.closest("staff")
                ? parseInt(e.closest("staff").getAttribute("n"), 10)
                : parseInt(e.getAttribute("staff"), 10);
              if (isNaN(s))
                throw new Error("Cannot determine staff for event in range.");
              const o = this.emaExp.selection.getMeasure(t).getStaff(s);
              if (!o) return "out";
              let a = "out";
              for (const [e, t] of o.entries()) {
                if ("in" === a) continue;
                t.resolveRangeTokens(r);
                const s = n < t.start,
                  i = parseFloat(n.toFixed(4)) > parseFloat(t.end.toFixed(4));
                a =
                  s || i ? (e + 1 === o.length && i ? "out" : "between") : "in";
              }
              return a;
            }
            getSelection() {
              if (this.processed) return this.mei;
              const e = this.emaExp.completeness;
              let t,
                r = 0,
                s = !1,
                o = 1;
              const a = [],
                i = [],
                u = [],
                c = [],
                l = this.mei.querySelector("*|music");
              if (l.namespaceURI !== this.ns)
                throw new Error("Could not find MEI <music> element");
              const f = this.mei.createTreeWalker(l, 1);
              for (; f.nextNode(); ) {
                const n = f.currentNode;
                if (n.namespaceURI === this.ns) {
                  if ("measure" === n.tagName.toLowerCase())
                    r++,
                      this.emaExp.selection.getMeasure(r)
                        ? ((t = this._getCurrentMeter(r)), (s = !0))
                        : (s = !1);
                  else if (s)
                    if ("staff" === n.tagName.toLowerCase()) {
                      const e = parseInt(n.getAttribute("n"), 10);
                      if (isNaN(e)) continue;
                      this.emaExp.selection.getMeasure(r).getStaff(e) ||
                        a.push(n);
                    } else if (
                      n.getAttribute("staff") &&
                      "clef" !== n.tagName.toLowerCase()
                    ) {
                      let s = !1;
                      const o = parseInt(n.getAttribute("staff"), 10);
                      if (isNaN(o)) continue;
                      const i = this.emaExp.selection.getMeasure(r).getStaff(o);
                      if (!i) {
                        a.push(n);
                        continue;
                      }
                      if (
                        (s || "highlight" !== e || (c.push(n), (s = !0)),
                        n.getAttribute("tstamp"))
                      ) {
                        let r = parseFloat(n.getAttribute("tstamp"));
                        r = r < 1 ? 1 : r;
                        for (const o of i)
                          o.resolveRangeTokens(t.count),
                            r < o.start ||
                            parseFloat(r.toFixed(4)) >
                              parseFloat(o.end.toFixed(4))
                              ? a.push(n)
                              : s || "highlight" !== e || (c.push(n), (s = !0));
                      }
                    } else if ("layer" === n.tagName.toLowerCase()) o = 1;
                    else if (
                      n.getAttribute("dur") &&
                      !n.getAttribute("grace")
                    ) {
                      const s = this._getPositionInRanges(n, r, t.count, o);
                      if (
                        ("out" === s
                          ? a.push(n)
                          : "between" === s
                          ? i.push(n)
                          : "highlight" === e && c.push(n),
                        "out" === s || "between" === s)
                      ) {
                        const e = n.getAttribute("xml:id");
                        e &&
                          n
                            .closest("*|measure")
                            .querySelectorAll(`*[startid="#${e}"]`)
                            .forEach((e) => {
                              e.contains(n) || a.push(e);
                            });
                      }
                      o += this._calculateDur(n, t);
                    } else
                      "highlight" === e &&
                        "rest" === n.tagName.toLowerCase() &&
                        c.push(n);
                  n.querySelectorAll("*|measure").length > 0
                    ? u.push(n)
                    : s ||
                      ("clef" !== n.tagName.toLowerCase() &&
                        (n.parentElement.closest("*|measure") ||
                          n.parentElement.closest("*|scoreDef") ||
                          "scoredef" === n.tagName.toLowerCase() ||
                          "staffdef" === n.tagName.toLowerCase())) ||
                      a.push(n);
                }
              }
              if ("highlight" === e) {
                const e = c.map((e) => {
                    const t = e.getAttribute("xml:id");
                    if (t) return `#${t}`;
                    const r = `ema-${n.v4()}`;
                    return e.setAttribute("xml:id", r), `#${r}`;
                  }),
                  t = this.mei.getElementsByTagNameNS(this.ns, "score")[0],
                  r = this.mei.createElementNS(this.ns, "annot");
                return (
                  r.setAttribute("type", "ema_highlight"),
                  r.setAttribute("plist", e.join(" ")),
                  t.appendChild(r),
                  (this.processed = !0),
                  this.mei
                );
              }
              for (const e of a)
                e.parentElement && e.parentElement.removeChild(e);
              for (const e of i)
                if (e.parentElement) {
                  const t = e.getAttribute("dur");
                  let r = parseInt(e.getAttribute("dots"), 10);
                  if ((r || (r = e.querySelectorAll("*|dot").length), t)) {
                    const n = this.mei.createElementNS(this.ns, "space");
                    n.setAttribute("dur", t),
                      r > 0 && n.setAttribute("dots", r.toString()),
                      e.parentElement.insertBefore(n, e);
                  }
                  e.parentElement.removeChild(e);
                }
              for (const e of u)
                e.querySelector("*|measure") || e.parentElement.removeChild(e);
              const h = this.mei.createTreeWalker(l, 1),
                d = [];
              let p = !0;
              for (; h.nextNode(); ) {
                const e = h.currentNode;
                if (e.namespaceURI === this.ns)
                  switch (
                    ("scoredef" === e.tagName.toLowerCase() &&
                      (p ? (p = !1) : d.push(e)),
                    "measure" === e.tagName.toLowerCase() && (p = !0),
                    e.tagName.toLowerCase())
                  ) {
                    case "abbr":
                    case "add":
                    case "bTrem":
                    case "beam":
                    case "chord":
                    case "corr":
                    case "damage":
                    case "del":
                    case "expan":
                    case "fTrem":
                    case "graceGrp":
                    case "layer":
                    case "ligature":
                    case "oLayer":
                    case "supplied":
                    case "syllable":
                    case "tuplet":
                    case "unclear":
                      0 === e.children.length && d.push(e);
                  }
              }
              for (const e of d)
                e.parentElement && e.parentElement.removeChild(e);
              return (this.processed = !0), this.mei;
            }
          };
        },
        321: (e, t, r) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 });
          const n = r(221),
            s = r(286);
          class o {
            constructor(e) {
              (this.ns = "http://www.music-encoding.org/ns/mei"),
                (this.mei = e);
            }
            static fromString(e) {
              const t = n.default(e);
              return new o(t);
            }
            getDocumentInfo() {
              if (!this.docInfo) {
                this.measures = this.mei.querySelectorAll("*|music *|measure");
                const e = [];
                this.measures.forEach((t) => {
                  const r = t;
                  r.namespaceURI === this.ns &&
                    e.push(r.getAttribute("n") || "");
                });
                const t = this.mei.querySelectorAll("*|music *|scoreDef"),
                  { staves: r, beats: n } = this.getScoreInfo(t);
                this.docInfo = {
                  measures: this.measures.length,
                  measure_labels: e,
                  staves: r,
                  beats: n
                };
              }
              return this.docInfo;
            }
            getScoreInfo(e) {
              const t = {},
                r = {};
              return (
                e.forEach((e) => {
                  const n = e;
                  if (n.namespaceURI === this.ns) {
                    const e = n.nextElementSibling;
                    let o,
                      a = -1;
                    if (
                      e.namespaceURI === this.ns &&
                      "measure" === e.tagName.toLowerCase().split(":").pop()
                    )
                      o = e;
                    else if (
                      ((o = e.getElementsByTagNameNS(this.ns, "measure")[0]),
                      !o)
                    )
                      throw new Error(
                        "Could not locate measure after new score definition"
                      );
                    let i = o.getAttribute("xml:id");
                    if (
                      (i || ((i = `m-${s.v4()}`), o.setAttribute("xml:id", i)),
                      this.measures.forEach((e, t) => {
                        const r = e;
                        r.namespaceURI === this.ns &&
                          r.getAttribute("xml:id") === i &&
                          (a = t);
                      }),
                      n.getElementsByTagNameNS(this.ns, "staffGrp").length > 0)
                    ) {
                      const e = n.getElementsByTagNameNS(this.ns, "staffDef"),
                        r = [];
                      Array.from(e).map((e) => {
                        let t = "";
                        if (((t = e.getAttribute("label")), !t)) {
                          const r = e.getElementsByTagNameNS(this.ns, "label");
                          t = r[0] ? r[0].textContent.replace(/\s+/g, " ") : "";
                        }
                        t || (t = e.getAttribute("label.abbr")), r.push(t);
                      }),
                        (t[a] = r);
                    }
                    let u = parseInt(n.getAttribute("meter.count"), 10),
                      c = parseInt(n.getAttribute("meter.unit"), 10);
                    if (u && c) r[a] = { count: u, unit: c };
                    else {
                      const e = n.getElementsByTagNameNS(this.ns, "meterSig");
                      if (e.length > 1)
                        throw new Error("Mixed meter is not supported");
                      if (
                        ((u = parseInt(e[0].getAttribute("meter.count"), 10)),
                        (c = parseInt(e[0].getAttribute("meter.unit"), 10)),
                        !u || !c)
                      )
                        throw new Error(
                          "Could not locate meter and compute beat change."
                        );
                      r[a] = { count: u, unit: c };
                    }
                  }
                }),
                { staves: t, beats: r }
              );
            }
          }
          t.default = o;
        },
        221: (e, t) => {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = function (e) {
              return new DOMParser().parseFromString(e, "text/xml");
            });
        },
        286: (e, t, r) => {
          "use strict";
          var n;
          r.r(t),
            r.d(t, {
              NIL: () => P,
              parse: () => y,
              stringify: () => l,
              v1: () => m,
              v3: () => T,
              v4: () => x,
              v5: () => B,
              validate: () => i,
              version: () => C
            });
          var s = new Uint8Array(16);
          function o() {
            if (
              !n &&
              !(n =
                ("undefined" != typeof crypto &&
                  crypto.getRandomValues &&
                  crypto.getRandomValues.bind(crypto)) ||
                ("undefined" != typeof msCrypto &&
                  "function" == typeof msCrypto.getRandomValues &&
                  msCrypto.getRandomValues.bind(msCrypto)))
            )
              throw new Error(
                "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
              );
            return n(s);
          }
          const a = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,
            i = function (e) {
              return "string" == typeof e && a.test(e);
            };
          for (var u = [], c = 0; c < 256; ++c)
            u.push((c + 256).toString(16).substr(1));
          const l = function (e) {
            var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 0,
              r = (
                u[e[t + 0]] +
                u[e[t + 1]] +
                u[e[t + 2]] +
                u[e[t + 3]] +
                "-" +
                u[e[t + 4]] +
                u[e[t + 5]] +
                "-" +
                u[e[t + 6]] +
                u[e[t + 7]] +
                "-" +
                u[e[t + 8]] +
                u[e[t + 9]] +
                "-" +
                u[e[t + 10]] +
                u[e[t + 11]] +
                u[e[t + 12]] +
                u[e[t + 13]] +
                u[e[t + 14]] +
                u[e[t + 15]]
              ).toLowerCase();
            if (!i(r)) throw TypeError("Stringified UUID is invalid");
            return r;
          };
          var f,
            h,
            d = 0,
            p = 0;
          const m = function (e, t, r) {
              var n = (t && r) || 0,
                s = t || new Array(16),
                a = (e = e || {}).node || f,
                i = void 0 !== e.clockseq ? e.clockseq : h;
              if (null == a || null == i) {
                var u = e.random || (e.rng || o)();
                null == a && (a = f = [1 | u[0], u[1], u[2], u[3], u[4], u[5]]),
                  null == i && (i = h = 16383 & ((u[6] << 8) | u[7]));
              }
              var c = void 0 !== e.msecs ? e.msecs : Date.now(),
                m = void 0 !== e.nsecs ? e.nsecs : p + 1,
                y = c - d + (m - p) / 1e4;
              if (
                (y < 0 && void 0 === e.clockseq && (i = (i + 1) & 16383),
                (y < 0 || c > d) && void 0 === e.nsecs && (m = 0),
                m >= 1e4)
              )
                throw new Error(
                  "uuid.v1(): Can't create more than 10M uuids/sec"
                );
              (d = c), (p = m), (h = i);
              var g = (1e4 * (268435455 & (c += 122192928e5)) + m) % 4294967296;
              (s[n++] = (g >>> 24) & 255),
                (s[n++] = (g >>> 16) & 255),
                (s[n++] = (g >>> 8) & 255),
                (s[n++] = 255 & g);
              var b = ((c / 4294967296) * 1e4) & 268435455;
              (s[n++] = (b >>> 8) & 255),
                (s[n++] = 255 & b),
                (s[n++] = ((b >>> 24) & 15) | 16),
                (s[n++] = (b >>> 16) & 255),
                (s[n++] = (i >>> 8) | 128),
                (s[n++] = 255 & i);
              for (var w = 0; w < 6; ++w) s[n + w] = a[w];
              return t || l(s);
            },
            y = function (e) {
              if (!i(e)) throw TypeError("Invalid UUID");
              var t,
                r = new Uint8Array(16);
              return (
                (r[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24),
                (r[1] = (t >>> 16) & 255),
                (r[2] = (t >>> 8) & 255),
                (r[3] = 255 & t),
                (r[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8),
                (r[5] = 255 & t),
                (r[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8),
                (r[7] = 255 & t),
                (r[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8),
                (r[9] = 255 & t),
                (r[10] =
                  ((t = parseInt(e.slice(24, 36), 16)) / 1099511627776) & 255),
                (r[11] = (t / 4294967296) & 255),
                (r[12] = (t >>> 24) & 255),
                (r[13] = (t >>> 16) & 255),
                (r[14] = (t >>> 8) & 255),
                (r[15] = 255 & t),
                r
              );
            };
          function g(e, t, r) {
            function n(e, n, s, o) {
              if (
                ("string" == typeof e &&
                  (e = (function (e) {
                    e = unescape(encodeURIComponent(e));
                    for (var t = [], r = 0; r < e.length; ++r)
                      t.push(e.charCodeAt(r));
                    return t;
                  })(e)),
                "string" == typeof n && (n = y(n)),
                16 !== n.length)
              )
                throw TypeError(
                  "Namespace must be array-like (16 iterable integer values, 0-255)"
                );
              var a = new Uint8Array(16 + e.length);
              if (
                (a.set(n),
                a.set(e, n.length),
                ((a = r(a))[6] = (15 & a[6]) | t),
                (a[8] = (63 & a[8]) | 128),
                s)
              ) {
                o = o || 0;
                for (var i = 0; i < 16; ++i) s[o + i] = a[i];
                return s;
              }
              return l(a);
            }
            try {
              n.name = e;
            } catch (e) {}
            return (
              (n.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"),
              (n.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8"),
              n
            );
          }
          function b(e) {
            return 14 + (((e + 64) >>> 9) << 4) + 1;
          }
          function w(e, t) {
            var r = (65535 & e) + (65535 & t);
            return (((e >> 16) + (t >> 16) + (r >> 16)) << 16) | (65535 & r);
          }
          function v(e, t, r, n, s, o) {
            return w(
              ((a = w(w(t, e), w(n, o))) << (i = s)) | (a >>> (32 - i)),
              r
            );
            var a, i;
          }
          function A(e, t, r, n, s, o, a) {
            return v((t & r) | (~t & n), e, t, s, o, a);
          }
          function E(e, t, r, n, s, o, a) {
            return v((t & n) | (r & ~n), e, t, s, o, a);
          }
          function I(e, t, r, n, s, o, a) {
            return v(t ^ r ^ n, e, t, s, o, a);
          }
          function _(e, t, r, n, s, o, a) {
            return v(r ^ (t | ~n), e, t, s, o, a);
          }
          const T = g("v3", 48, function (e) {
              if ("string" == typeof e) {
                var t = unescape(encodeURIComponent(e));
                e = new Uint8Array(t.length);
                for (var r = 0; r < t.length; ++r) e[r] = t.charCodeAt(r);
              }
              return (function (e) {
                for (
                  var t = [], r = 32 * e.length, n = "0123456789abcdef", s = 0;
                  s < r;
                  s += 8
                ) {
                  var o = (e[s >> 5] >>> s % 32) & 255,
                    a = parseInt(
                      n.charAt((o >>> 4) & 15) + n.charAt(15 & o),
                      16
                    );
                  t.push(a);
                }
                return t;
              })(
                (function (e, t) {
                  (e[t >> 5] |= 128 << t % 32), (e[b(t) - 1] = t);
                  for (
                    var r = 1732584193,
                      n = -271733879,
                      s = -1732584194,
                      o = 271733878,
                      a = 0;
                    a < e.length;
                    a += 16
                  ) {
                    var i = r,
                      u = n,
                      c = s,
                      l = o;
                    (r = A(r, n, s, o, e[a], 7, -680876936)),
                      (o = A(o, r, n, s, e[a + 1], 12, -389564586)),
                      (s = A(s, o, r, n, e[a + 2], 17, 606105819)),
                      (n = A(n, s, o, r, e[a + 3], 22, -1044525330)),
                      (r = A(r, n, s, o, e[a + 4], 7, -176418897)),
                      (o = A(o, r, n, s, e[a + 5], 12, 1200080426)),
                      (s = A(s, o, r, n, e[a + 6], 17, -1473231341)),
                      (n = A(n, s, o, r, e[a + 7], 22, -45705983)),
                      (r = A(r, n, s, o, e[a + 8], 7, 1770035416)),
                      (o = A(o, r, n, s, e[a + 9], 12, -1958414417)),
                      (s = A(s, o, r, n, e[a + 10], 17, -42063)),
                      (n = A(n, s, o, r, e[a + 11], 22, -1990404162)),
                      (r = A(r, n, s, o, e[a + 12], 7, 1804603682)),
                      (o = A(o, r, n, s, e[a + 13], 12, -40341101)),
                      (s = A(s, o, r, n, e[a + 14], 17, -1502002290)),
                      (r = E(
                        r,
                        (n = A(n, s, o, r, e[a + 15], 22, 1236535329)),
                        s,
                        o,
                        e[a + 1],
                        5,
                        -165796510
                      )),
                      (o = E(o, r, n, s, e[a + 6], 9, -1069501632)),
                      (s = E(s, o, r, n, e[a + 11], 14, 643717713)),
                      (n = E(n, s, o, r, e[a], 20, -373897302)),
                      (r = E(r, n, s, o, e[a + 5], 5, -701558691)),
                      (o = E(o, r, n, s, e[a + 10], 9, 38016083)),
                      (s = E(s, o, r, n, e[a + 15], 14, -660478335)),
                      (n = E(n, s, o, r, e[a + 4], 20, -405537848)),
                      (r = E(r, n, s, o, e[a + 9], 5, 568446438)),
                      (o = E(o, r, n, s, e[a + 14], 9, -1019803690)),
                      (s = E(s, o, r, n, e[a + 3], 14, -187363961)),
                      (n = E(n, s, o, r, e[a + 8], 20, 1163531501)),
                      (r = E(r, n, s, o, e[a + 13], 5, -1444681467)),
                      (o = E(o, r, n, s, e[a + 2], 9, -51403784)),
                      (s = E(s, o, r, n, e[a + 7], 14, 1735328473)),
                      (r = I(
                        r,
                        (n = E(n, s, o, r, e[a + 12], 20, -1926607734)),
                        s,
                        o,
                        e[a + 5],
                        4,
                        -378558
                      )),
                      (o = I(o, r, n, s, e[a + 8], 11, -2022574463)),
                      (s = I(s, o, r, n, e[a + 11], 16, 1839030562)),
                      (n = I(n, s, o, r, e[a + 14], 23, -35309556)),
                      (r = I(r, n, s, o, e[a + 1], 4, -1530992060)),
                      (o = I(o, r, n, s, e[a + 4], 11, 1272893353)),
                      (s = I(s, o, r, n, e[a + 7], 16, -155497632)),
                      (n = I(n, s, o, r, e[a + 10], 23, -1094730640)),
                      (r = I(r, n, s, o, e[a + 13], 4, 681279174)),
                      (o = I(o, r, n, s, e[a], 11, -358537222)),
                      (s = I(s, o, r, n, e[a + 3], 16, -722521979)),
                      (n = I(n, s, o, r, e[a + 6], 23, 76029189)),
                      (r = I(r, n, s, o, e[a + 9], 4, -640364487)),
                      (o = I(o, r, n, s, e[a + 12], 11, -421815835)),
                      (s = I(s, o, r, n, e[a + 15], 16, 530742520)),
                      (r = _(
                        r,
                        (n = I(n, s, o, r, e[a + 2], 23, -995338651)),
                        s,
                        o,
                        e[a],
                        6,
                        -198630844
                      )),
                      (o = _(o, r, n, s, e[a + 7], 10, 1126891415)),
                      (s = _(s, o, r, n, e[a + 14], 15, -1416354905)),
                      (n = _(n, s, o, r, e[a + 5], 21, -57434055)),
                      (r = _(r, n, s, o, e[a + 12], 6, 1700485571)),
                      (o = _(o, r, n, s, e[a + 3], 10, -1894986606)),
                      (s = _(s, o, r, n, e[a + 10], 15, -1051523)),
                      (n = _(n, s, o, r, e[a + 1], 21, -2054922799)),
                      (r = _(r, n, s, o, e[a + 8], 6, 1873313359)),
                      (o = _(o, r, n, s, e[a + 15], 10, -30611744)),
                      (s = _(s, o, r, n, e[a + 6], 15, -1560198380)),
                      (n = _(n, s, o, r, e[a + 13], 21, 1309151649)),
                      (r = _(r, n, s, o, e[a + 4], 6, -145523070)),
                      (o = _(o, r, n, s, e[a + 11], 10, -1120210379)),
                      (s = _(s, o, r, n, e[a + 2], 15, 718787259)),
                      (n = _(n, s, o, r, e[a + 9], 21, -343485551)),
                      (r = w(r, i)),
                      (n = w(n, u)),
                      (s = w(s, c)),
                      (o = w(o, l));
                  }
                  return [r, n, s, o];
                })(
                  (function (e) {
                    if (0 === e.length) return [];
                    for (
                      var t = 8 * e.length, r = new Uint32Array(b(t)), n = 0;
                      n < t;
                      n += 8
                    )
                      r[n >> 5] |= (255 & e[n / 8]) << n % 32;
                    return r;
                  })(e),
                  8 * e.length
                )
              );
            }),
            x = function (e, t, r) {
              var n = (e = e || {}).random || (e.rng || o)();
              if (((n[6] = (15 & n[6]) | 64), (n[8] = (63 & n[8]) | 128), t)) {
                r = r || 0;
                for (var s = 0; s < 16; ++s) t[r + s] = n[s];
                return t;
              }
              return l(n);
            };
          function S(e, t, r, n) {
            switch (e) {
              case 0:
                return (t & r) ^ (~t & n);
              case 1:
                return t ^ r ^ n;
              case 2:
                return (t & r) ^ (t & n) ^ (r & n);
              case 3:
                return t ^ r ^ n;
            }
          }
          function R(e, t) {
            return (e << t) | (e >>> (32 - t));
          }
          const B = g("v5", 80, function (e) {
              var t = [1518500249, 1859775393, 2400959708, 3395469782],
                r = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
              if ("string" == typeof e) {
                var n = unescape(encodeURIComponent(e));
                e = [];
                for (var s = 0; s < n.length; ++s) e.push(n.charCodeAt(s));
              } else Array.isArray(e) || (e = Array.prototype.slice.call(e));
              e.push(128);
              for (
                var o = e.length / 4 + 2,
                  a = Math.ceil(o / 16),
                  i = new Array(a),
                  u = 0;
                u < a;
                ++u
              ) {
                for (var c = new Uint32Array(16), l = 0; l < 16; ++l)
                  c[l] =
                    (e[64 * u + 4 * l] << 24) |
                    (e[64 * u + 4 * l + 1] << 16) |
                    (e[64 * u + 4 * l + 2] << 8) |
                    e[64 * u + 4 * l + 3];
                i[u] = c;
              }
              (i[a - 1][14] = (8 * (e.length - 1)) / Math.pow(2, 32)),
                (i[a - 1][14] = Math.floor(i[a - 1][14])),
                (i[a - 1][15] = (8 * (e.length - 1)) & 4294967295);
              for (var f = 0; f < a; ++f) {
                for (var h = new Uint32Array(80), d = 0; d < 16; ++d)
                  h[d] = i[f][d];
                for (var p = 16; p < 80; ++p)
                  h[p] = R(h[p - 3] ^ h[p - 8] ^ h[p - 14] ^ h[p - 16], 1);
                for (
                  var m = r[0], y = r[1], g = r[2], b = r[3], w = r[4], v = 0;
                  v < 80;
                  ++v
                ) {
                  var A = Math.floor(v / 20),
                    E = (R(m, 5) + S(A, y, g, b) + w + t[A] + h[v]) >>> 0;
                  (w = b), (b = g), (g = R(y, 30) >>> 0), (y = m), (m = E);
                }
                (r[0] = (r[0] + m) >>> 0),
                  (r[1] = (r[1] + y) >>> 0),
                  (r[2] = (r[2] + g) >>> 0),
                  (r[3] = (r[3] + b) >>> 0),
                  (r[4] = (r[4] + w) >>> 0);
              }
              return [
                (r[0] >> 24) & 255,
                (r[0] >> 16) & 255,
                (r[0] >> 8) & 255,
                255 & r[0],
                (r[1] >> 24) & 255,
                (r[1] >> 16) & 255,
                (r[1] >> 8) & 255,
                255 & r[1],
                (r[2] >> 24) & 255,
                (r[2] >> 16) & 255,
                (r[2] >> 8) & 255,
                255 & r[2],
                (r[3] >> 24) & 255,
                (r[3] >> 16) & 255,
                (r[3] >> 8) & 255,
                255 & r[3],
                (r[4] >> 24) & 255,
                (r[4] >> 16) & 255,
                (r[4] >> 8) & 255,
                255 & r[4]
              ];
            }),
            P = "00000000-0000-0000-0000-000000000000",
            C = function (e) {
              if (!i(e)) throw TypeError("Invalid UUID");
              return parseInt(e.substr(14, 1), 16);
            };
        },
        845: (e, t, r) => {
          "use strict";
          r.r(t),
            r.d(t, {
              Headers: () => p,
              Request: () => A,
              Response: () => I,
              DOMException: () => T,
              fetch: () => x
            });
          var n =
              ("undefined" != typeof globalThis && globalThis) ||
              ("undefined" != typeof self && self) ||
              (void 0 !== n && n),
            s = "URLSearchParams" in n,
            o = "Symbol" in n && "iterator" in Symbol,
            a =
              "FileReader" in n &&
              "Blob" in n &&
              (function () {
                try {
                  return new Blob(), !0;
                } catch (e) {
                  return !1;
                }
              })(),
            i = "FormData" in n,
            u = "ArrayBuffer" in n;
          if (u)
            var c = [
                "[object Int8Array]",
                "[object Uint8Array]",
                "[object Uint8ClampedArray]",
                "[object Int16Array]",
                "[object Uint16Array]",
                "[object Int32Array]",
                "[object Uint32Array]",
                "[object Float32Array]",
                "[object Float64Array]"
              ],
              l =
                ArrayBuffer.isView ||
                function (e) {
                  return e && c.indexOf(Object.prototype.toString.call(e)) > -1;
                };
          function f(e) {
            if (
              ("string" != typeof e && (e = String(e)),
              /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(e) || "" === e)
            )
              throw new TypeError("Invalid character in header field name");
            return e.toLowerCase();
          }
          function h(e) {
            return "string" != typeof e && (e = String(e)), e;
          }
          function d(e) {
            var t = {
              next: function () {
                var t = e.shift();
                return { done: void 0 === t, value: t };
              }
            };
            return (
              o &&
                (t[Symbol.iterator] = function () {
                  return t;
                }),
              t
            );
          }
          function p(e) {
            (this.map = {}),
              e instanceof p
                ? e.forEach(function (e, t) {
                    this.append(t, e);
                  }, this)
                : Array.isArray(e)
                ? e.forEach(function (e) {
                    this.append(e[0], e[1]);
                  }, this)
                : e &&
                  Object.getOwnPropertyNames(e).forEach(function (t) {
                    this.append(t, e[t]);
                  }, this);
          }
          function m(e) {
            if (e.bodyUsed)
              return Promise.reject(new TypeError("Already read"));
            e.bodyUsed = !0;
          }
          function y(e) {
            return new Promise(function (t, r) {
              (e.onload = function () {
                t(e.result);
              }),
                (e.onerror = function () {
                  r(e.error);
                });
            });
          }
          function g(e) {
            var t = new FileReader(),
              r = y(t);
            return t.readAsArrayBuffer(e), r;
          }
          function b(e) {
            if (e.slice) return e.slice(0);
            var t = new Uint8Array(e.byteLength);
            return t.set(new Uint8Array(e)), t.buffer;
          }
          function w() {
            return (
              (this.bodyUsed = !1),
              (this._initBody = function (e) {
                var t;
                (this.bodyUsed = this.bodyUsed),
                  (this._bodyInit = e),
                  e
                    ? "string" == typeof e
                      ? (this._bodyText = e)
                      : a && Blob.prototype.isPrototypeOf(e)
                      ? (this._bodyBlob = e)
                      : i && FormData.prototype.isPrototypeOf(e)
                      ? (this._bodyFormData = e)
                      : s && URLSearchParams.prototype.isPrototypeOf(e)
                      ? (this._bodyText = e.toString())
                      : u && a && (t = e) && DataView.prototype.isPrototypeOf(t)
                      ? ((this._bodyArrayBuffer = b(e.buffer)),
                        (this._bodyInit = new Blob([this._bodyArrayBuffer])))
                      : u && (ArrayBuffer.prototype.isPrototypeOf(e) || l(e))
                      ? (this._bodyArrayBuffer = b(e))
                      : (this._bodyText = e = Object.prototype.toString.call(e))
                    : (this._bodyText = ""),
                  this.headers.get("content-type") ||
                    ("string" == typeof e
                      ? this.headers.set(
                          "content-type",
                          "text/plain;charset=UTF-8"
                        )
                      : this._bodyBlob && this._bodyBlob.type
                      ? this.headers.set("content-type", this._bodyBlob.type)
                      : s &&
                        URLSearchParams.prototype.isPrototypeOf(e) &&
                        this.headers.set(
                          "content-type",
                          "application/x-www-form-urlencoded;charset=UTF-8"
                        ));
              }),
              a &&
                ((this.blob = function () {
                  var e = m(this);
                  if (e) return e;
                  if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                  if (this._bodyArrayBuffer)
                    return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                  if (this._bodyFormData)
                    throw new Error("could not read FormData body as blob");
                  return Promise.resolve(new Blob([this._bodyText]));
                }),
                (this.arrayBuffer = function () {
                  return this._bodyArrayBuffer
                    ? m(this) ||
                        (ArrayBuffer.isView(this._bodyArrayBuffer)
                          ? Promise.resolve(
                              this._bodyArrayBuffer.buffer.slice(
                                this._bodyArrayBuffer.byteOffset,
                                this._bodyArrayBuffer.byteOffset +
                                  this._bodyArrayBuffer.byteLength
                              )
                            )
                          : Promise.resolve(this._bodyArrayBuffer))
                    : this.blob().then(g);
                })),
              (this.text = function () {
                var e,
                  t,
                  r,
                  n = m(this);
                if (n) return n;
                if (this._bodyBlob)
                  return (
                    (e = this._bodyBlob),
                    (r = y((t = new FileReader()))),
                    t.readAsText(e),
                    r
                  );
                if (this._bodyArrayBuffer)
                  return Promise.resolve(
                    (function (e) {
                      for (
                        var t = new Uint8Array(e),
                          r = new Array(t.length),
                          n = 0;
                        n < t.length;
                        n++
                      )
                        r[n] = String.fromCharCode(t[n]);
                      return r.join("");
                    })(this._bodyArrayBuffer)
                  );
                if (this._bodyFormData)
                  throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText);
              }),
              i &&
                (this.formData = function () {
                  return this.text().then(E);
                }),
              (this.json = function () {
                return this.text().then(JSON.parse);
              }),
              this
            );
          }
          (p.prototype.append = function (e, t) {
            (e = f(e)), (t = h(t));
            var r = this.map[e];
            this.map[e] = r ? r + ", " + t : t;
          }),
            (p.prototype.delete = function (e) {
              delete this.map[f(e)];
            }),
            (p.prototype.get = function (e) {
              return (e = f(e)), this.has(e) ? this.map[e] : null;
            }),
            (p.prototype.has = function (e) {
              return this.map.hasOwnProperty(f(e));
            }),
            (p.prototype.set = function (e, t) {
              this.map[f(e)] = h(t);
            }),
            (p.prototype.forEach = function (e, t) {
              for (var r in this.map)
                this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this);
            }),
            (p.prototype.keys = function () {
              var e = [];
              return (
                this.forEach(function (t, r) {
                  e.push(r);
                }),
                d(e)
              );
            }),
            (p.prototype.values = function () {
              var e = [];
              return (
                this.forEach(function (t) {
                  e.push(t);
                }),
                d(e)
              );
            }),
            (p.prototype.entries = function () {
              var e = [];
              return (
                this.forEach(function (t, r) {
                  e.push([r, t]);
                }),
                d(e)
              );
            }),
            o && (p.prototype[Symbol.iterator] = p.prototype.entries);
          var v = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
          function A(e, t) {
            if (!(this instanceof A))
              throw new TypeError(
                'Please use the "new" operator, this DOM object constructor cannot be called as a function.'
              );
            var r,
              n,
              s = (t = t || {}).body;
            if (e instanceof A) {
              if (e.bodyUsed) throw new TypeError("Already read");
              (this.url = e.url),
                (this.credentials = e.credentials),
                t.headers || (this.headers = new p(e.headers)),
                (this.method = e.method),
                (this.mode = e.mode),
                (this.signal = e.signal),
                s ||
                  null == e._bodyInit ||
                  ((s = e._bodyInit), (e.bodyUsed = !0));
            } else this.url = String(e);
            if (
              ((this.credentials =
                t.credentials || this.credentials || "same-origin"),
              (!t.headers && this.headers) || (this.headers = new p(t.headers)),
              (this.method =
                ((n = (r = t.method || this.method || "GET").toUpperCase()),
                v.indexOf(n) > -1 ? n : r)),
              (this.mode = t.mode || this.mode || null),
              (this.signal = t.signal || this.signal),
              (this.referrer = null),
              ("GET" === this.method || "HEAD" === this.method) && s)
            )
              throw new TypeError("Body not allowed for GET or HEAD requests");
            if (
              (this._initBody(s),
              !(
                ("GET" !== this.method && "HEAD" !== this.method) ||
                ("no-store" !== t.cache && "no-cache" !== t.cache)
              ))
            ) {
              var o = /([?&])_=[^&]*/;
              o.test(this.url)
                ? (this.url = this.url.replace(
                    o,
                    "$1_=" + new Date().getTime()
                  ))
                : (this.url +=
                    (/\?/.test(this.url) ? "&" : "?") +
                    "_=" +
                    new Date().getTime());
            }
          }
          function E(e) {
            var t = new FormData();
            return (
              e
                .trim()
                .split("&")
                .forEach(function (e) {
                  if (e) {
                    var r = e.split("="),
                      n = r.shift().replace(/\+/g, " "),
                      s = r.join("=").replace(/\+/g, " ");
                    t.append(decodeURIComponent(n), decodeURIComponent(s));
                  }
                }),
              t
            );
          }
          function I(e, t) {
            if (!(this instanceof I))
              throw new TypeError(
                'Please use the "new" operator, this DOM object constructor cannot be called as a function.'
              );
            t || (t = {}),
              (this.type = "default"),
              (this.status = void 0 === t.status ? 200 : t.status),
              (this.ok = this.status >= 200 && this.status < 300),
              (this.statusText = "statusText" in t ? t.statusText : ""),
              (this.headers = new p(t.headers)),
              (this.url = t.url || ""),
              this._initBody(e);
          }
          (A.prototype.clone = function () {
            return new A(this, { body: this._bodyInit });
          }),
            w.call(A.prototype),
            w.call(I.prototype),
            (I.prototype.clone = function () {
              return new I(this._bodyInit, {
                status: this.status,
                statusText: this.statusText,
                headers: new p(this.headers),
                url: this.url
              });
            }),
            (I.error = function () {
              var e = new I(null, { status: 0, statusText: "" });
              return (e.type = "error"), e;
            });
          var _ = [301, 302, 303, 307, 308];
          I.redirect = function (e, t) {
            if (-1 === _.indexOf(t))
              throw new RangeError("Invalid status code");
            return new I(null, { status: t, headers: { location: e } });
          };
          var T = n.DOMException;
          try {
            new T();
          } catch (e) {
            ((T = function (e, t) {
              (this.message = e), (this.name = t);
              var r = Error(e);
              this.stack = r.stack;
            }).prototype = Object.create(Error.prototype)),
              (T.prototype.constructor = T);
          }
          function x(e, t) {
            return new Promise(function (r, s) {
              var o = new A(e, t);
              if (o.signal && o.signal.aborted)
                return s(new T("Aborted", "AbortError"));
              var i = new XMLHttpRequest();
              function c() {
                i.abort();
              }
              (i.onload = function () {
                var e,
                  t,
                  n = {
                    status: i.status,
                    statusText: i.statusText,
                    headers:
                      ((e = i.getAllResponseHeaders() || ""),
                      (t = new p()),
                      e
                        .replace(/\r?\n[\t ]+/g, " ")
                        .split(/\r?\n/)
                        .forEach(function (e) {
                          var r = e.split(":"),
                            n = r.shift().trim();
                          if (n) {
                            var s = r.join(":").trim();
                            t.append(n, s);
                          }
                        }),
                      t)
                  };
                n.url =
                  "responseURL" in i
                    ? i.responseURL
                    : n.headers.get("X-Request-URL");
                var s = "response" in i ? i.response : i.responseText;
                setTimeout(function () {
                  r(new I(s, n));
                }, 0);
              }),
                (i.onerror = function () {
                  setTimeout(function () {
                    s(new TypeError("Network request failed"));
                  }, 0);
                }),
                (i.ontimeout = function () {
                  setTimeout(function () {
                    s(new TypeError("Network request failed"));
                  }, 0);
                }),
                (i.onabort = function () {
                  setTimeout(function () {
                    s(new T("Aborted", "AbortError"));
                  }, 0);
                }),
                i.open(
                  o.method,
                  (function (e) {
                    try {
                      return "" === e && n.location.href ? n.location.href : e;
                    } catch (t) {
                      return e;
                    }
                  })(o.url),
                  !0
                ),
                "include" === o.credentials
                  ? (i.withCredentials = !0)
                  : "omit" === o.credentials && (i.withCredentials = !1),
                "responseType" in i &&
                  (a
                    ? (i.responseType = "blob")
                    : u &&
                      o.headers.get("Content-Type") &&
                      -1 !==
                        o.headers
                          .get("Content-Type")
                          .indexOf("application/octet-stream") &&
                      (i.responseType = "arraybuffer")),
                !t || "object" != typeof t.headers || t.headers instanceof p
                  ? o.headers.forEach(function (e, t) {
                      i.setRequestHeader(t, e);
                    })
                  : Object.getOwnPropertyNames(t.headers).forEach(function (e) {
                      i.setRequestHeader(e, h(t.headers[e]));
                    }),
                o.signal &&
                  (o.signal.addEventListener("abort", c),
                  (i.onreadystatechange = function () {
                    4 === i.readyState &&
                      o.signal.removeEventListener("abort", c);
                  })),
                i.send(void 0 === o._bodyInit ? null : o._bodyInit);
            });
          }
          (x.polyfill = !0),
            n.fetch ||
              ((n.fetch = x),
              (n.Headers = p),
              (n.Request = A),
              (n.Response = I));
        }
      },
      t = {};
    function r(n) {
      var s = t[n];
      if (void 0 !== s) return s.exports;
      var o = (t[n] = { exports: {} });
      return e[n](o, o.exports, r), o.exports;
    }
    (r.d = (e, t) => {
      for (var n in t)
        r.o(t, n) &&
          !r.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
      (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (r.r = (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      });
    var n = {};
    return (
      (() => {
        "use strict";
        var e = n;
        const t = r(925),
          s = r(321),
          o = r(679),
          a = r(447);
        e.default = class {
          static async withFullExpr(e) {
            const t = e.match(/^\/?([^\/]+?)\/(.+?)$/),
              r = t[1],
              n = t[2],
              s = decodeURIComponent(r);
            let o = "";
            try {
              await a(s).then(async (e) => {
                if (200 !== e.status)
                  throw new Error("Could not retrieve MEI data via fetch.");
                o = await e.text();
              });
            } catch (e) {
              throw new Error("Could not retrieve MEI data via fetch.");
            }
            return this.withDocumentString(o, n);
          }
          static withDocumentString(e, r) {
            const n = s.default.fromString(e),
              a = n.getDocumentInfo(),
              i = t.default.fromString(a, r);
            return new o.default(n, i);
          }
        };
      })(),
      n.default
    );
  })();
});

export default EmaMei;
//# sourceMappingURL=ema-mei.js.map
