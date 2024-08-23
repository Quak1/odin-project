(() => {
  var t = {
      350: (t, e, n) => {
        var r = {
          "./clear-day.svg": 554,
          "./clear-night.svg": 422,
          "./cloudy.svg": 236,
          "./fog.svg": 996,
          "./hail.svg": 134,
          "./partly-cloudy-day.svg": 518,
          "./partly-cloudy-night.svg": 338,
          "./rain-snow-showers-day.svg": 745,
          "./rain-snow-showers-night.svg": 805,
          "./rain-snow.svg": 342,
          "./rain.svg": 358,
          "./showers-day.svg": 84,
          "./showers-night.svg": 824,
          "./sleet.svg": 377,
          "./snow-showers-day.svg": 954,
          "./snow-showers-night.svg": 310,
          "./snow.svg": 389,
          "./thunder-rain.svg": 301,
          "./thunder-showers-day.svg": 357,
          "./thunder-showers-night.svg": 569,
          "./thunder.svg": 154,
          "./water.svg": 129,
          "./wind.svg": 969,
        };
        function o(t) {
          var e = s(t);
          return n(e);
        }
        function s(t) {
          if (!n.o(r, t)) {
            var e = new Error("Cannot find module '" + t + "'");
            throw ((e.code = "MODULE_NOT_FOUND"), e);
          }
          return r[t];
        }
        (o.keys = function () {
          return Object.keys(r);
        }),
          (o.resolve = s),
          (t.exports = o),
          (o.id = 350);
      },
      208: (t, e, n) => {
        "use strict";
        n.d(e, { A: () => a });
        var r = n(601),
          o = n.n(r),
          s = n(314),
          i = n.n(s)()(o());
        i.push([
          t.id,
          ":root {\n    --main: #374151;\n    --gray: #9ca3af;\n}\n\nbody {\n    background-color: salmon;\n}\n\np {\n    margin: 0;\n}\n\n#container {\n    width: 700px;\n    margin: 0 auto;\n    font-family: sans-serif;\n    font-size: 18px;\n    font-weight: bold;\n    color: var(--main)\n}\n\nform {\n    margin: 20px 0;\n}\n\nform .search-city {\n    display: flex;\n    margin: 0 auto;\n    width: fit-content;\n}\n\nform label {\n    font-size: 22px;\n}\n\nform input[type=text],\nform button[type=submit] {\n    border: none;\n    border-radius: 5px;\n    padding: 5px 10px;\n    font-size: inherit;\n}\n\nform button[type=submit] {\n    margin-left: 10px;\n    color: white;\n    background-color: var(--main);\n    font-weight: 900;\n    cursor: pointer;\n}\n\nform button[type=submit]:active {\n    transform: translateY(2px);\n}\n\nform .toggle-temperature {\n    margin: 0 auto;\n    width: fit-content;\n    display: flex;\n    align-items: center;\n    margin-top: 15px;\n}\n\nform .toggle-temperature input {\n    display: none;\n}\n\n.toggle-btn {\n    --width: 70px;\n    margin-left: 10px;\n    display: inline-block;\n    width: var(--width);\n    height: calc(var(--width) / 2);\n    border-radius: var(--width);\n    cursor: pointer;\n    position: relative;\n    transition: 0.2s;\n    background-color: blue;\n}\n\n.toggle-btn::before {\n    position: absolute;\n    content: '°F';\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    background-color: #fff;\n    width: calc(var(--width) / 2 * 0.8);\n    height: calc(var(--width) / 2 * 0.8);\n    border-radius: var(--width);\n    margin: calc(var(--width) * 0.05);\n    transition: 0.2s;\n}\n\n.toggle-temperature input:checked+.toggle-btn {\n    background-color: green;\n}\n\n.toggle-temperature input:checked+.toggle-btn::before {\n    content: '°C';\n    transform: translateX(calc(var(--width) / 2));\n}\n\n\n#weather-today,\n#weather-week {\n    background-color: white;\n    border-radius: 20px;\n    outline: solid 10px rgba(255, 255, 255, 0.3);\n}\n\n#weather-today {\n    padding: 50px;\n    margin-bottom: 50px;\n}\n\n#weather-today .now {\n    display: flex;\n    margin-bottom: 40px;\n    justify-content: space-between;\n    color: var(--gray)\n}\n\n\n#weather-today .info :first-child {\n    font-size: 60px;\n    font-weight: 900;\n    color: var(--main)\n}\n\n#weather-today .current-condition {\n    text-align: center;\n}\n\n#weather-today .current-condition img {\n    height: 100px;\n}\n\n#weather-today .hourly {\n    display: flex;\n    text-align: center;\n    justify-content: space-between;\n    font-size: 16px;\n}\n\n#weather-today .hourly p:first-child {\n    margin-bottom: 15px;\n    font-size: 18px;\n}\n\n#weather-today .hourly p:last-child {\n    color: var(--gray)\n}\n\n#weather-today .hourly img {\n    height: 50px;\n}\n\n#weather-week {\n    padding: 50px;\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n}\n\n.weekDay {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n}\n\n\n.weekDay :nth-child(2) {\n    justify-self: right;\n    display: flex;\n    align-items: center;\n    padding-right: 20px;\n}\n\n.weekDay :nth-child(3) {\n    justify-self: center;\n}\n\n.weekDay :nth-child(4) {\n    justify-self: right;\n}\n\n.weekDay img {\n    height: 30px;\n}\n\ndialog {\n    font-size: 25px;\n    font-family: sans-serif;\n    max-width: 700px;\n}\n",
          "",
        ]);
        const a = i;
      },
      314: (t) => {
        "use strict";
        t.exports = function (t) {
          var e = [];
          return (
            (e.toString = function () {
              return this.map(function (e) {
                var n = "",
                  r = void 0 !== e[5];
                return (
                  e[4] && (n += "@supports (".concat(e[4], ") {")),
                  e[2] && (n += "@media ".concat(e[2], " {")),
                  r &&
                    (n += "@layer".concat(
                      e[5].length > 0 ? " ".concat(e[5]) : "",
                      " {",
                    )),
                  (n += t(e)),
                  r && (n += "}"),
                  e[2] && (n += "}"),
                  e[4] && (n += "}"),
                  n
                );
              }).join("");
            }),
            (e.i = function (t, n, r, o, s) {
              "string" == typeof t && (t = [[null, t, void 0]]);
              var i = {};
              if (r)
                for (var a = 0; a < this.length; a++) {
                  var c = this[a][0];
                  null != c && (i[c] = !0);
                }
              for (var u = 0; u < t.length; u++) {
                var d = [].concat(t[u]);
                (r && i[d[0]]) ||
                  (void 0 !== s &&
                    (void 0 === d[5] ||
                      (d[1] = "@layer"
                        .concat(d[5].length > 0 ? " ".concat(d[5]) : "", " {")
                        .concat(d[1], "}")),
                    (d[5] = s)),
                  n &&
                    (d[2]
                      ? ((d[1] = "@media "
                          .concat(d[2], " {")
                          .concat(d[1], "}")),
                        (d[2] = n))
                      : (d[2] = n)),
                  o &&
                    (d[4]
                      ? ((d[1] = "@supports ("
                          .concat(d[4], ") {")
                          .concat(d[1], "}")),
                        (d[4] = o))
                      : (d[4] = "".concat(o))),
                  e.push(d));
              }
            }),
            e
          );
        };
      },
      601: (t) => {
        "use strict";
        t.exports = function (t) {
          return t[1];
        };
      },
      72: (t) => {
        "use strict";
        var e = [];
        function n(t) {
          for (var n = -1, r = 0; r < e.length; r++)
            if (e[r].identifier === t) {
              n = r;
              break;
            }
          return n;
        }
        function r(t, r) {
          for (var s = {}, i = [], a = 0; a < t.length; a++) {
            var c = t[a],
              u = r.base ? c[0] + r.base : c[0],
              d = s[u] || 0,
              p = "".concat(u, " ").concat(d);
            s[u] = d + 1;
            var l = n(p),
              f = {
                css: c[1],
                media: c[2],
                sourceMap: c[3],
                supports: c[4],
                layer: c[5],
              };
            if (-1 !== l) e[l].references++, e[l].updater(f);
            else {
              var g = o(f, r);
              (r.byIndex = a),
                e.splice(a, 0, { identifier: p, updater: g, references: 1 });
            }
            i.push(p);
          }
          return i;
        }
        function o(t, e) {
          var n = e.domAPI(e);
          return (
            n.update(t),
            function (e) {
              if (e) {
                if (
                  e.css === t.css &&
                  e.media === t.media &&
                  e.sourceMap === t.sourceMap &&
                  e.supports === t.supports &&
                  e.layer === t.layer
                )
                  return;
                n.update((t = e));
              } else n.remove();
            }
          );
        }
        t.exports = function (t, o) {
          var s = r((t = t || []), (o = o || {}));
          return function (t) {
            t = t || [];
            for (var i = 0; i < s.length; i++) {
              var a = n(s[i]);
              e[a].references--;
            }
            for (var c = r(t, o), u = 0; u < s.length; u++) {
              var d = n(s[u]);
              0 === e[d].references && (e[d].updater(), e.splice(d, 1));
            }
            s = c;
          };
        };
      },
      659: (t) => {
        "use strict";
        var e = {};
        t.exports = function (t, n) {
          var r = (function (t) {
            if (void 0 === e[t]) {
              var n = document.querySelector(t);
              if (
                window.HTMLIFrameElement &&
                n instanceof window.HTMLIFrameElement
              )
                try {
                  n = n.contentDocument.head;
                } catch (t) {
                  n = null;
                }
              e[t] = n;
            }
            return e[t];
          })(t);
          if (!r)
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.",
            );
          r.appendChild(n);
        };
      },
      540: (t) => {
        "use strict";
        t.exports = function (t) {
          var e = document.createElement("style");
          return t.setAttributes(e, t.attributes), t.insert(e, t.options), e;
        };
      },
      56: (t, e, n) => {
        "use strict";
        t.exports = function (t) {
          var e = n.nc;
          e && t.setAttribute("nonce", e);
        };
      },
      825: (t) => {
        "use strict";
        t.exports = function (t) {
          if ("undefined" == typeof document)
            return { update: function () {}, remove: function () {} };
          var e = t.insertStyleElement(t);
          return {
            update: function (n) {
              !(function (t, e, n) {
                var r = "";
                n.supports && (r += "@supports (".concat(n.supports, ") {")),
                  n.media && (r += "@media ".concat(n.media, " {"));
                var o = void 0 !== n.layer;
                o &&
                  (r += "@layer".concat(
                    n.layer.length > 0 ? " ".concat(n.layer) : "",
                    " {",
                  )),
                  (r += n.css),
                  o && (r += "}"),
                  n.media && (r += "}"),
                  n.supports && (r += "}");
                var s = n.sourceMap;
                s &&
                  "undefined" != typeof btoa &&
                  (r +=
                    "\n/*# sourceMappingURL=data:application/json;base64,".concat(
                      btoa(unescape(encodeURIComponent(JSON.stringify(s)))),
                      " */",
                    )),
                  e.styleTagTransform(r, t, e.options);
              })(e, t, n);
            },
            remove: function () {
              !(function (t) {
                if (null === t.parentNode) return !1;
                t.parentNode.removeChild(t);
              })(e);
            },
          };
        };
      },
      113: (t) => {
        "use strict";
        t.exports = function (t, e) {
          if (e.styleSheet) e.styleSheet.cssText = t;
          else {
            for (; e.firstChild; ) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(t));
          }
        };
      },
      554: (t, e, n) => {
        "use strict";
        t.exports = n.p + "e6541ce84a82ea86deaf.svg";
      },
      422: (t, e, n) => {
        "use strict";
        t.exports = n.p + "7228ebde1a1cbbabeed4.svg";
      },
      236: (t, e, n) => {
        "use strict";
        t.exports = n.p + "bd65452b254265c4f761.svg";
      },
      996: (t, e, n) => {
        "use strict";
        t.exports = n.p + "07bf93f0c95051aa29f1.svg";
      },
      134: (t, e, n) => {
        "use strict";
        t.exports = n.p + "7716b874413ac673e7aa.svg";
      },
      518: (t, e, n) => {
        "use strict";
        t.exports = n.p + "749d1251900ec2449417.svg";
      },
      338: (t, e, n) => {
        "use strict";
        t.exports = n.p + "c0a8d00378e555b86fcf.svg";
      },
      745: (t, e, n) => {
        "use strict";
        t.exports = n.p + "207b14093cc421b50195.svg";
      },
      805: (t, e, n) => {
        "use strict";
        t.exports = n.p + "d20b1ffc3bb5091a3478.svg";
      },
      342: (t, e, n) => {
        "use strict";
        t.exports = n.p + "30d0498eaffed5814744.svg";
      },
      358: (t, e, n) => {
        "use strict";
        t.exports = n.p + "848651d20f3f58949d26.svg";
      },
      84: (t, e, n) => {
        "use strict";
        t.exports = n.p + "99f737e43d74ac67225a.svg";
      },
      824: (t, e, n) => {
        "use strict";
        t.exports = n.p + "391e6dd7e7c4056b3e07.svg";
      },
      377: (t, e, n) => {
        "use strict";
        t.exports = n.p + "a791cdeb76b2a1c641a5.svg";
      },
      954: (t, e, n) => {
        "use strict";
        t.exports = n.p + "9b361803bd2c718d208f.svg";
      },
      310: (t, e, n) => {
        "use strict";
        t.exports = n.p + "a917b111f11bd1e967cf.svg";
      },
      389: (t, e, n) => {
        "use strict";
        t.exports = n.p + "f8d40353e151c5c7cce0.svg";
      },
      301: (t, e, n) => {
        "use strict";
        t.exports = n.p + "80f57ee23a7a1d38351e.svg";
      },
      357: (t, e, n) => {
        "use strict";
        t.exports = n.p + "03133e2a54cdc1e8cf84.svg";
      },
      569: (t, e, n) => {
        "use strict";
        t.exports = n.p + "430f208dd338964430c3.svg";
      },
      154: (t, e, n) => {
        "use strict";
        t.exports = n.p + "31fc29a57119a2bd369f.svg";
      },
      129: (t, e, n) => {
        "use strict";
        t.exports = n.p + "2807e2cf293d432ea09d.svg";
      },
      969: (t, e, n) => {
        "use strict";
        t.exports = n.p + "e87b86c9cbeabdd90ce2.svg";
      },
    },
    e = {};
  function n(r) {
    var o = e[r];
    if (void 0 !== o) return o.exports;
    var s = (e[r] = { id: r, exports: {} });
    return t[r](s, s.exports, n), s.exports;
  }
  (n.n = (t) => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return n.d(e, { a: e }), e;
  }),
    (n.d = (t, e) => {
      for (var r in e)
        n.o(e, r) &&
          !n.o(t, r) &&
          Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (t) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (() => {
      var t;
      n.g.importScripts && (t = n.g.location + "");
      var e = n.g.document;
      if (
        !t &&
        e &&
        (e.currentScript &&
          "SCRIPT" === e.currentScript.tagName.toUpperCase() &&
          (t = e.currentScript.src),
        !t)
      ) {
        var r = e.getElementsByTagName("script");
        if (r.length)
          for (var o = r.length - 1; o > -1 && (!t || !/^http(s?):/.test(t)); )
            t = r[o--].src;
      }
      if (!t)
        throw new Error(
          "Automatic publicPath is not supported in this browser",
        );
      (t = t
        .replace(/#.*$/, "")
        .replace(/\?.*$/, "")
        .replace(/\/[^\/]+$/, "/")),
        (n.p = t);
    })(),
    (n.nc = void 0),
    (() => {
      "use strict";
      let t = !0;
      const e = (function () {
          const t = n(350),
            e = {};
          return (
            t.keys().forEach((n) => {
              const r = n.substring(2, n.length - 4);
              e[r] = t(n);
            }),
            e
          );
        })(),
        r = document.querySelector("#weather-today .city"),
        o = document.querySelector("#weather-today .temperature"),
        s = document.querySelector("#weather-today .date"),
        i = document.querySelector(".current-condition img"),
        a = document.querySelector(".current-condition p"),
        c = document.querySelector("#weather-today .hourly"),
        u = document.getElementById("weather-week"),
        d = document.querySelector("dialog");
      let p;
      function l(t) {
        (p = (t.tzoffset < 0 ? "" : "+") + t.tzoffset),
          2 === p.length && (p = p[0] + "0" + p[1]),
          (function ({ resolvedAddress: t, currentConditions: n, days: u }) {
            var d;
            (r.textContent = t),
              (o.textContent = v(n.temp)),
              (s.textContent =
                ((d = u[0].datetime),
                new Date(`${d} GMT${p}`).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  timeZone: p,
                }))),
              (i.alt = `${n.conditions} icon`),
              (i.src = e[n.icon]),
              (a.textContent = n.conditions),
              (function ([t, n], r) {
                let o;
                const s = r + 2;
                (o =
                  s >= 24
                    ? [...n.hours.slice(s % 24, (s + 9) % 24)]
                    : s + 9 > 24
                      ? [...t.hours.slice(s), ...n.hours.slice(0, (s + 9) % 24)]
                      : t.hours.slice(s, s + 9)),
                  (o = o.filter((t, e) => e % 2 == 0));
                const i = o.map((t) =>
                  (function (t) {
                    const n = h(v(t.temp), "p"),
                      r = Number(t.datetime.substring(0, 2)),
                      o = h((r % 12 == 0 ? 12 : r % 12) + ":00", "p"),
                      s = h(r >= 12 ? "PM" : "AM", "p"),
                      i = document.createElement("img");
                    return (
                      (i.alt = `${t.conditions} icon`),
                      (i.src = e[t.icon]),
                      m([n, i, o, s])
                    );
                  })(t),
                );
                (c.textContent = ""), c.append(...i);
              })(u, Number(n.datetime.slice(0, 2)));
          })(t),
          (function ({ days: t }) {
            const n = t.slice(1, 7).map((t) =>
              (function (t) {
                const n = h(
                    (function (t) {
                      return new Date(`${t} GMT${p}`).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                          month: "short",
                          day: "2-digit",
                          timeZone: p,
                        },
                      );
                    })(t.datetime),
                    "p",
                  ),
                  r = h(t.precipprob + "%", "p"),
                  o = h(`${t.tempmin}° / ${t.tempmax}°`, "p"),
                  s = document.createElement("img");
                (s.alt = "Precipitation probability icon"), (s.src = e.water);
                const i = m([r, s]),
                  a = document.createElement("img");
                return (
                  (a.alt = `${t.conditions} icon`),
                  (a.src = e[t.icon]),
                  m([n, i, a, o], "weekDay")
                );
              })(t),
            );
            (u.textContent = ""), u.append(...n);
          })(t);
      }
      function f(t) {
        (d.textContent = t), d.showModal();
      }
      function g() {
        d.close();
      }
      function h(t, e) {
        const n = document.createElement(e);
        return (n.textContent = t), n;
      }
      function m(t, e = "", n = "div") {
        const r = document.createElement(n);
        return (r.classList = e), r.append(...t), r;
      }
      function v(e) {
        return `${e} °${t ? "C" : "F"}`;
      }
      const y =
          "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline",
        w = "2T88MSEVCVADNM8B6CEF2WYTU",
        b = `include=current,hours,days&elements=${["conditions", "icon", "temp", "datetime", "precipprob", "tempmin", "tempmax"].join(",")}&contentType=json`;
      async function x(t, e) {
        const n = await fetch(`${y}/${t}?key=${w}&unitGroup=${e}&${b}`);
        if (!n.ok)
          throw new Error(
            `Data couldn't be fetched with status code ${n.status}.`,
          );
        return await n.json();
      }
      var k = n(72),
        S = n.n(k),
        C = n(825),
        E = n.n(C),
        $ = n(659),
        T = n.n($),
        j = n(56),
        D = n.n(j),
        M = n(540),
        A = n.n(M),
        q = n(113),
        L = n.n(q),
        N = n(208),
        z = {};
      (z.styleTagTransform = L()),
        (z.setAttributes = D()),
        (z.insert = T().bind(null, "head")),
        (z.domAPI = E()),
        (z.insertStyleElement = A()),
        S()(N.A, z),
        N.A && N.A.locals && N.A.locals;
      const I = document.querySelector("form"),
        P = I.querySelector("input"),
        O = document.getElementById("toggle");
      async function U(e) {
        try {
          f("Loading...");
          const n = t ? "metric" : "us";
          l(await x(e, n)), (P.value = ""), g();
        } catch (t) {
          console.log(t),
            f("There was an error getting new data. " + t.message);
        }
      }
      I.addEventListener("submit", async (t) => {
        t.preventDefault(), U(P.value);
      }),
        O.addEventListener("click", () => {
          var e;
          (e = O.checked), (t = e);
          const n = document.querySelector("#weather-today .city");
          n && U(n.textContent);
        }),
        f("Loading..."),
        x("Paris", "metric")
          .then((t) => l(t))
          .then(g);
    })();
})();

