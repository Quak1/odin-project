(()=>{var e={648:(e,t,n)=>{"use strict";n.d(t,{A:()=>i});var r=n(601),o=n.n(r),a=n(314),s=n.n(a)()(o());s.push([e.id,"h1 {\n    font-size: 60px;\n    text-align: center;\n}\n\nh2 {\n    font-size: 40px;\n}\n\n#content {\n    margin: 0 auto;\n    width: 700px;\n}\n\n#why-us .card {\n    background-color: var(--green);\n    margin: 20px 0;\n    padding: 20px;\n    border-radius: 10px;\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);\n    border-top: 10px solid var(--gold);\n}\n\n#why-us .card div:first-child {\n    margin: 0 0 20px 30px;\n    font-size: 30px;\n    font-weight: bold;\n}\n\n#reviews .container {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 20px;\n    padding-bottom: 10px;\n}\n\n#reviews .card {\n    width: 300px;\n    height: fit-content;\n    background-color: var(--light-brown);\n    color: var(--black);\n    border-radius: 10px;\n    padding: 20px;\n}\n\n#reviews .card>div:last-child {\n    text-align: right;\n}\n",""]);const i=s},872:(e,t,n)=>{"use strict";n.d(t,{A:()=>i});var r=n(601),o=n.n(r),a=n(314),s=n.n(a)()(o());s.push([e.id,"#menu .card {\n    display: grid;\n    grid-template-columns: 300px 1fr;\n    grid-template-rows: auto auto 1fr;\n    height: 300px;\n    background-color: var(--off-white);\n    color: var(--black);\n    margin-bottom: 30px;\n    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);\n}\n\n#menu .card>div:nth-child(1) {\n    grid-row: 1/4;\n    height: 100%;\n    overflow: hidden;\n}\n\n#menu .card div img {\n    object-fit: cover;\n    object-position: center;\n    height: 100%;\n    width: 100%;\n}\n\n#menu .card>div:nth-child(2) {\n    margin: 20px;\n    font-size: 50px;\n    font-weight: bold;\n    color: var(--gold);\n}\n\n#menu .card>div:nth-child(3) {\n    margin: 0 20px;\n}\n\n#menu .card>div:nth-child(4) {\n    color: var(--green);\n    font-weight: bold;\n    text-align: right;\n    margin: 20px;\n}\n",""]);const i=s},208:(e,t,n)=>{"use strict";n.d(t,{A:()=>i});var r=n(601),o=n.n(r),a=n(314),s=n.n(a)()(o());s.push([e.id,':root {\n    --brown: #4B382A;\n    --off-white: #F2F0E9;\n    --green: #1D4134;\n    --light-brown: #C2B2A3;\n    --gold: #B4975A;\n    --black: #111111;\n}\n\nhtml {\n    background-color: var(--brown);\n    color: var(--off-white);\n    font-family: "Roboto", sans-serif;\n    font-size: 20px;\n}\n\nimg {\n    width: 100%;\n}\n\nnav {\n    display: flex;\n    flex-flow: row;\n    justify-content: center;\n    gap: 30px;\n}\n\nnav>button {\n    background-color: var(--green);\n    color: var(--off-white);\n    font-size: 30px;\n    font-weight: bold;\n    border-radius: 5px;\n    border: none;\n    padding: 10px;\n}\n\nnav>button:active {\n    transform: translateY(2px);\n}\n\nnav>button:hover {\n    filter: brightness(0.9);\n    cursor: pointer;\n}\n\nnav>button.mark {\n    outline: 3px solid var(--gold)\n}\n',""]);const i=s},314:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var s={};if(r)for(var i=0;i<this.length;i++){var c=this[i][0];null!=c&&(s[c]=!0)}for(var d=0;d<e.length;d++){var l=[].concat(e[d]);r&&s[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),t.push(l))}},t}},601:e=>{"use strict";e.exports=function(e){return e[1]}},72:e=>{"use strict";var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var a={},s=[],i=0;i<e.length;i++){var c=e[i],d=r.base?c[0]+r.base:c[0],l=a[d]||0,u="".concat(d," ").concat(l);a[d]=l+1;var p=n(u),h={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)t[p].references++,t[p].updater(h);else{var f=o(h,r);r.byIndex=i,t.splice(i,0,{identifier:u,updater:f,references:1})}s.push(u)}return s}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var a=r(e=e||[],o=o||{});return function(e){e=e||[];for(var s=0;s<a.length;s++){var i=n(a[s]);t[i].references--}for(var c=r(e,o),d=0;d<a.length;d++){var l=n(a[d]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}a=c}}},659:e=>{"use strict";var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},540:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},56:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},825:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},113:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},295:(e,t,n)=>{var r={"./assets/beef_taco.jpg":871,"./assets/beer.jpg":811,"./assets/cheeseburger.jpg":969,"./assets/lemonade.jpg":354,"./assets/margherita.jpg":965,"./assets/menu.jpg":228,"./assets/pepperoni.jpg":829,"./assets/restaurant.jpg":104,"./assets/soft_drinks.jpg":539,"./assets/veggie_burger.jpg":28,"./assets/veggie_pizza.jpg":885,"./assets/veggie_taco.jpg":984};function o(e){var t=a(e);return n(t)}function a(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id=295},871:(e,t,n)=>{"use strict";e.exports=n.p+"9fcc017120d0f9a44122.jpg"},811:(e,t,n)=>{"use strict";e.exports=n.p+"bdaa60ff8412cfb69628.jpg"},969:(e,t,n)=>{"use strict";e.exports=n.p+"8907609ff11b40874a3b.jpg"},354:(e,t,n)=>{"use strict";e.exports=n.p+"dcd76952e210308d2d7b.jpg"},965:(e,t,n)=>{"use strict";e.exports=n.p+"a34d500029ae9115d84f.jpg"},228:(e,t,n)=>{"use strict";e.exports=n.p+"43ac44b27013b9db701b.jpg"},829:(e,t,n)=>{"use strict";e.exports=n.p+"96f299044bc9df4865be.jpg"},104:(e,t,n)=>{"use strict";e.exports=n.p+"f985cfbe5fe9e9073f44.jpg"},539:(e,t,n)=>{"use strict";e.exports=n.p+"23ee7252eead549f0ba7.jpg"},28:(e,t,n)=>{"use strict";e.exports=n.p+"1587b284f8cd72313106.jpg"},885:(e,t,n)=>{"use strict";e.exports=n.p+"ca8f4e444ac24d848d5f.jpg"},984:(e,t,n)=>{"use strict";e.exports=n.p+"c4dfd2f70d06dc06e485.jpg"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={id:r,exports:{}};return e[r](a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&(!e||!/^http(s?):/.test(e));)e=r[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),n.nc=void 0,(()=>{"use strict";var e=n(72),t=n.n(e),r=n(825),o=n.n(r),a=n(659),s=n.n(a),i=n(56),c=n.n(i),d=n(540),l=n.n(d),u=n(113),p=n.n(u),h=n(208),f={};function m(e,t){const n=document.createElement(t);return n.textContent=e,n}function g(e,t,r="h2"){const o=document.createElement("div");o.id=t;const a=m(e[t].title,r),s=function(e){const t=document.createElement("div");t.classList.add("container");for(const r of e){const e=document.createElement("div");e.classList.add("card");for(const t in r)if("picture"===t){const t=new Image;t.src=n(295)(`./${r.picture.src}.jpg`),t.alt=r.picture.alt;const o=document.createElement("div");o.appendChild(t),e.appendChild(o)}else{const n=document.createElement("div");n.textContent=r[t],e.appendChild(n)}t.appendChild(e)}return t}(e[t].cards);return o.appendChild(a),o.appendChild(s),o}f.styleTagTransform=p(),f.setAttributes=c(),f.insert=s().bind(null,"head"),f.domAPI=o(),f.insertStyleElement=l(),t()(h.A,f),h.A&&h.A.locals&&h.A.locals;const v=JSON.parse('{"welcome":{"title":"Welcome to Flavor Town","content":"Discover the taste of REAL FOOD in the heart of CITY. Our chefs use only the freshest ingredients to create unforgettable dishes that will delight your senses."},"why-us":{"title":"Why Choose Us?","cards":[{"title":"Fresh Ingredients","content":"At our restaurant, we believe that the foundation of an exceptional dining experience starts with the quality of our ingredients. That’s why we are committed to sourcing our produce from local farms and purveyors who share our passion for freshness."},{"title":"Authentic Recipes","content":"Our menu is a celebration of time-honored culinary traditions, meticulously crafted with a modern twist. We take pride in preserving the essence of traditional recipes while infusing them with innovative touches that reflect contemporary tastes."},{"title":"Friendly Atmosphere","content":"We strive to create more than just a place to eat—we aim to offer a warm, inviting environment where you feel like part of our family."}]},"reviews":{"title":"Customer Reviews","cards":[{"content":"A must-visit restaurant in CITY. Their FOOD DISH is phenomenal!","author":"Yuki"},{"content":"The best FOOD I’ve ever had! The ambiance was perfect, and the service was outstanding.","author":"Andy"},{"content":" Fantastic experience! Fresh, local ingredients make the dishes stand out. The staff was warm and welcoming, and the house special was delicious. Can’t wait to return!","author":"Emily R."},{"content":"Wonderful spot! Fresh, creative dishes and a warm atmosphere. The seafood risotto was superb. Great service and a pleasant evening overall!","author":"Mark T."},{"content":"Good food and welcoming atmosphere. The signature burger was tasty but not outstanding. Service was friendly but slow. I’ll give it another try! ","author":"Anna C."}]}}');var b=n(104),w=n(648),y={};function x(e){const t=document.createElement("div");t.id="welcome";const n=m(v.welcome.title,"h1"),r=m(v.welcome.content,"div"),o=new Image;o.src=b,t.append(n,o,r);const a=g(v,"why-us"),s=g(v,"reviews");e.textContent="",e.append(t,a,s)}y.styleTagTransform=p(),y.setAttributes=c(),y.insert=s().bind(null,"head"),y.domAPI=o(),y.insertStyleElement=l(),t()(w.A,y),w.A&&w.A.locals&&w.A.locals;const T=JSON.parse('{"D":"About Us","Q":[{"title":"Welcome to Flavor Town!","content":["At Flavor Town, we believe that every meal should be an adventure—a culinary journey that excites the senses and warms the soul. Nestled in the heart of the community, our restaurant is a celebration of bold flavors, innovative dishes, and a commitment to bringing people together."]},{"title":"Our Story","content":["Flavor Town was born from a passion for food that transcends borders and cultures. Our founders, a dynamic duo of chefs and food enthusiasts, envisioned a place where every dish tells a story. With backgrounds in diverse culinary traditions and a love for experimentation, they set out to create a menu that marries the familiar with the extraordinary."]},{"title":"Our Philosophy","content":["At Flavor Town, we’re dedicated to using only the freshest, locally-sourced ingredients to craft our vibrant and diverse menu. We believe that great food starts with great ingredients, which is why we partner with local farmers and artisans to ensure that every plate is a testament to quality and sustainability.","Our menu is a fusion of classic favorites and daring new creations, all designed to tantalize your taste buds. From savory starters to decadent desserts, each dish is thoughtfully prepared to deliver an unforgettable dining experience. Whether you’re in the mood for a comforting classic or an adventurous new flavor, you’ll find something to love at Flavor Town."]},{"title":"Our Atmosphere","content":["Step into Flavor Town and be greeted by a warm, inviting atmosphere that reflects our commitment to hospitality. Our stylish and cozy interior is designed to make you feel right at home, whether you’re here for a casual meal with friends or a special celebration. Our friendly staff is always ready to provide exceptional service and ensure that your visit is memorable."]},{"title":"Join Us","content":["We invite you to make Flavor Town your go-to destination for delicious food and great company. Whether you’re a longtime foodie or just looking for a new dining experience, we’re here to make every meal a delightful adventure."]},{"title":"Contact Us","content":["Have questions or want to make a reservation? Reach out to us at flavor@example.com, or visit us at LOCATION. We look forward to serving you soon!"]}]}');function A(e){const t=[m(T.D,"h1")];for(const e of T.Q){t.push(m(e.title,"h2"));for(const n of e.content)t.push(m(n,"p"))}e.textContent="",e.append(...t)}var k=n(872),j={};j.styleTagTransform=p(),j.setAttributes=c(),j.insert=s().bind(null,"head"),j.domAPI=o(),j.insertStyleElement=l(),t()(k.A,j),k.A&&k.A.locals&&k.A.locals;const C=JSON.parse('{"menu":{"title":"Menu","cards":[{"picture":{"src":"assets/cheeseburger","alt":"Cheesburger"},"name":"Classic Cheeseburger","description":"Juicy beef patty, lettuce, tomato, pickles, and cheddar cheese, served with fries.","price":"$14"},{"picture":{"src":"assets/veggie_burger","alt":"Veggie Burger"},"name":"Veggie Burger","description":"Grilled plant-based patty with avocado, lettuce, tomato, and a spicy aioli, served with sweet potato fries.","price":"$15"},{"picture":{"src":"assets/margherita","alt":"Margherita Pizza"},"name":"Margherita Pizza","description":"Tomato sauce, fresh mozzarella, basil, and a drizzle of olive oil on a classic pizza crust.","price":"$13"},{"picture":{"src":"assets/pepperoni","alt":"Pepperoni Pizza"},"name":"Pepperoni Pizza","description":"Tomato sauce, mozzarella cheese, and generous slices of spicy pepperoni.","price":"$15"},{"picture":{"src":"assets/veggie_pizza","alt":"Veggie Supreme Pizza"},"name":"Veggie Supreme Pizza","description":"Tomato sauce, mozzarella cheese, bell peppers, mushrooms, olives, and onions.","price":"$14"},{"picture":{"src":"assets/beef_taco","alt":"Classic Beef Tacos"},"name":"Classic Beef Tacos","description":"Seasoned beef with onions, cilantro, and salsa","price":"$12"},{"picture":{"src":"assets/veggie_taco","alt":"Vegetarian Tacos"},"name":"Vegetarian Tacos","description":"Roasted vegetables, black beans, corn, and a zesty lime crema in soft tortillas.","price":"$12"},{"picture":{"src":"assets/soft_drinks","alt":"Soft Drinks"},"name":"Soft Drinks","description":"Coke, Diet Coke, Sprite, Iced Tea","price":"$3"},{"picture":{"src":"assets/lemonade","alt":"House Lemonade"},"name":"House Lemonade","description":"Freshly squeezed lemonade with a hint of mint.","price":"$4"},{"picture":{"src":"assets/beer","alt":"Craft Beer"},"name":"Craft Beers","description":"A selection of local craft beers, rotating regularly.","price":"$6 - $8"}]}}');function z(e){const t=g(C,"menu","h1");e.textContent="",e.append(t)}const E=document.getElementById("content"),O=document.getElementById("homeBtn"),S=document.getElementById("menuBtn"),F=document.getElementById("aboutBtn");function I(e,t){O.classList.remove("mark"),S.classList.remove("mark"),F.classList.remove("mark"),e.classList.add("mark"),t(E)}O.addEventListener("click",(e=>I(e.target,x))),S.addEventListener("click",(e=>I(e.target,z))),F.addEventListener("click",(e=>I(e.target,A))),O.click()})()})();