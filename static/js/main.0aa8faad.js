!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/jslib-html5-camera-photo/",e(e.s=2)}([function(t,e,n){"use strict";function r(){}function o(t){try{return t.then}catch(t){return g=t,v}}function i(t,e){try{return t(e)}catch(t){return g=t,v}}function a(t,e,n){try{t(e,n)}catch(t){return g=t,v}}function s(t){if("object"!==typeof this)throw new TypeError("Promises must be constructed via new");if("function"!==typeof t)throw new TypeError("Promise constructor's argument is not a function");this._75=0,this._83=0,this._18=null,this._38=null,t!==r&&y(t,this)}function u(t,e,n){return new t.constructor(function(o,i){var a=new s(r);a.then(o,i),c(t,new p(e,n,a))})}function c(t,e){for(;3===t._83;)t=t._18;if(s._47&&s._47(t),0===t._83)return 0===t._75?(t._75=1,void(t._38=e)):1===t._75?(t._75=2,void(t._38=[t._38,e])):void t._38.push(e);f(t,e)}function f(t,e){m(function(){var n=1===t._83?e.onFulfilled:e.onRejected;if(null===n)return void(1===t._83?l(e.promise,t._18):d(e.promise,t._18));var r=i(n,t._18);r===v?d(e.promise,g):l(e.promise,r)})}function l(t,e){if(e===t)return d(t,new TypeError("A promise cannot be resolved with itself."));if(e&&("object"===typeof e||"function"===typeof e)){var n=o(e);if(n===v)return d(t,g);if(n===t.then&&e instanceof s)return t._83=3,t._18=e,void h(t);if("function"===typeof n)return void y(n.bind(e),t)}t._83=1,t._18=e,h(t)}function d(t,e){t._83=2,t._18=e,s._71&&s._71(t,e),h(t)}function h(t){if(1===t._75&&(c(t,t._38),t._38=null),2===t._75){for(var e=0;e<t._38.length;e++)c(t,t._38[e]);t._38=null}}function p(t,e,n){this.onFulfilled="function"===typeof t?t:null,this.onRejected="function"===typeof e?e:null,this.promise=n}function y(t,e){var n=!1,r=a(t,function(t){n||(n=!0,l(e,t))},function(t){n||(n=!0,d(e,t))});n||r!==v||(n=!0,d(e,g))}var m=n(5),g=null,v={};t.exports=s,s._47=null,s._71=null,s._44=r,s.prototype.then=function(t,e){if(this.constructor!==s)return u(this,t,e);var n=new s(r);return c(this,new p(t,e,n)),n}},function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"e",function(){return i}),n.d(e,"a",function(){return a}),n.d(e,"f",function(){return s}),n.d(e,"c",function(){return u}),n.d(e,"b",function(){return c}),n.d(e,"d",function(){return f});var o,i=["user","environment"],a={USER:"user",ENVIRONMENT:"environment"},s=["jpg","png"],u={PNG:"png",JPG:"jpg"},c=(o={},r(o,"jpg","image/jpeg"),r(o,"png","image/png"),o),f={audio:!1,video:!0}},function(t,e,n){n(3),t.exports=n(10)},function(t,e,n){"use strict";"undefined"===typeof Promise&&(n(4).enable(),window.Promise=n(7)),n(8),Object.assign=n(9)},function(t,e,n){"use strict";function r(){c=!1,s._47=null,s._71=null}function o(t){function e(e){(t.allRejections||a(l[e].error,t.whitelist||u))&&(l[e].displayId=f++,t.onUnhandled?(l[e].logged=!0,t.onUnhandled(l[e].displayId,l[e].error)):(l[e].logged=!0,i(l[e].displayId,l[e].error)))}function n(e){l[e].logged&&(t.onHandled?t.onHandled(l[e].displayId,l[e].error):l[e].onUnhandled||(console.warn("Promise Rejection Handled (id: "+l[e].displayId+"):"),console.warn('  This means you can ignore any previous messages of the form "Possible Unhandled Promise Rejection" with id '+l[e].displayId+".")))}t=t||{},c&&r(),c=!0;var o=0,f=0,l={};s._47=function(t){2===t._83&&l[t._56]&&(l[t._56].logged?n(t._56):clearTimeout(l[t._56].timeout),delete l[t._56])},s._71=function(t,n){0===t._75&&(t._56=o++,l[t._56]={displayId:null,error:n,timeout:setTimeout(e.bind(null,t._56),a(n,u)?100:2e3),logged:!1})}}function i(t,e){console.warn("Possible Unhandled Promise Rejection (id: "+t+"):"),((e&&(e.stack||e))+"").split("\n").forEach(function(t){console.warn("  "+t)})}function a(t,e){return e.some(function(e){return t instanceof e})}var s=n(0),u=[ReferenceError,TypeError,RangeError],c=!1;e.disable=r,e.enable=o},function(t,e,n){"use strict";(function(e){function n(t){a.length||(i(),s=!0),a[a.length]=t}function r(){for(;u<a.length;){var t=u;if(u+=1,a[t].call(),u>c){for(var e=0,n=a.length-u;e<n;e++)a[e]=a[e+u];a.length-=u,u=0}}a.length=0,u=0,s=!1}function o(t){return function(){function e(){clearTimeout(n),clearInterval(r),t()}var n=setTimeout(e,0),r=setInterval(e,50)}}t.exports=n;var i,a=[],s=!1,u=0,c=1024,f="undefined"!==typeof e?e:self,l=f.MutationObserver||f.WebKitMutationObserver;i="function"===typeof l?function(t){var e=1,n=new l(t),r=document.createTextNode("");return n.observe(r,{characterData:!0}),function(){e=-e,r.data=e}}(r):o(r),n.requestFlush=i,n.makeRequestCallFromTimer=o}).call(e,n(6))},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"===typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";function r(t){var e=new o(o._44);return e._83=1,e._18=t,e}var o=n(0);t.exports=o;var i=r(!0),a=r(!1),s=r(null),u=r(void 0),c=r(0),f=r("");o.resolve=function(t){if(t instanceof o)return t;if(null===t)return s;if(void 0===t)return u;if(!0===t)return i;if(!1===t)return a;if(0===t)return c;if(""===t)return f;if("object"===typeof t||"function"===typeof t)try{var e=t.then;if("function"===typeof e)return new o(e.bind(t))}catch(t){return new o(function(e,n){n(t)})}return r(t)},o.all=function(t){var e=Array.prototype.slice.call(t);return new o(function(t,n){function r(a,s){if(s&&("object"===typeof s||"function"===typeof s)){if(s instanceof o&&s.then===o.prototype.then){for(;3===s._83;)s=s._18;return 1===s._83?r(a,s._18):(2===s._83&&n(s._18),void s.then(function(t){r(a,t)},n))}var u=s.then;if("function"===typeof u){return void new o(u.bind(s)).then(function(t){r(a,t)},n)}}e[a]=s,0===--i&&t(e)}if(0===e.length)return t([]);for(var i=e.length,a=0;a<e.length;a++)r(a,e[a])})},o.reject=function(t){return new o(function(e,n){n(t)})},o.race=function(t){return new o(function(e,n){t.forEach(function(t){o.resolve(t).then(e,n)})})},o.prototype.catch=function(t){return this.then(null,t)}},function(t,e){!function(t){"use strict";function e(t){if("string"!==typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function n(t){return"string"!==typeof t&&(t=String(t)),t}function r(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return g.iterable&&(e[Symbol.iterator]=function(){return e}),e}function o(t){this.map={},t instanceof o?t.forEach(function(t,e){this.append(e,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function i(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function a(t){return new Promise(function(e,n){t.onload=function(){e(t.result)},t.onerror=function(){n(t.error)}})}function s(t){var e=new FileReader,n=a(e);return e.readAsArrayBuffer(t),n}function u(t){var e=new FileReader,n=a(e);return e.readAsText(t),n}function c(t){for(var e=new Uint8Array(t),n=new Array(e.length),r=0;r<e.length;r++)n[r]=String.fromCharCode(e[r]);return n.join("")}function f(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function l(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,t)if("string"===typeof t)this._bodyText=t;else if(g.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(g.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(g.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(g.arrayBuffer&&g.blob&&b(t))this._bodyArrayBuffer=f(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!g.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!w(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=f(t)}else this._bodyText="";this.headers.get("content-type")||("string"===typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):g.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},g.blob&&(this.blob=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?i(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(s)}),this.text=function(){var t=i(this);if(t)return t;if(this._bodyBlob)return u(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(c(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},g.formData&&(this.formData=function(){return this.text().then(p)}),this.json=function(){return this.text().then(JSON.parse)},this}function d(t){var e=t.toUpperCase();return _.indexOf(e)>-1?e:t}function h(t,e){e=e||{};var n=e.body;if(t instanceof h){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new o(t.headers)),this.method=t.method,this.mode=t.mode,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new o(e.headers)),this.method=d(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function p(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var n=t.split("="),r=n.shift().replace(/\+/g," "),o=n.join("=").replace(/\+/g," ");e.append(decodeURIComponent(r),decodeURIComponent(o))}}),e}function y(t){var e=new o;return t.split(/\r?\n/).forEach(function(t){var n=t.split(":"),r=n.shift().trim();if(r){var o=n.join(":").trim();e.append(r,o)}}),e}function m(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new o(e.headers),this.url=e.url||"",this._initBody(t)}if(!t.fetch){var g={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(g.arrayBuffer)var v=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],b=function(t){return t&&DataView.prototype.isPrototypeOf(t)},w=ArrayBuffer.isView||function(t){return t&&v.indexOf(Object.prototype.toString.call(t))>-1};o.prototype.append=function(t,r){t=e(t),r=n(r);var o=this.map[t];this.map[t]=o?o+","+r:r},o.prototype.delete=function(t){delete this.map[e(t)]},o.prototype.get=function(t){return t=e(t),this.has(t)?this.map[t]:null},o.prototype.has=function(t){return this.map.hasOwnProperty(e(t))},o.prototype.set=function(t,r){this.map[e(t)]=n(r)},o.prototype.forEach=function(t,e){for(var n in this.map)this.map.hasOwnProperty(n)&&t.call(e,this.map[n],n,this)},o.prototype.keys=function(){var t=[];return this.forEach(function(e,n){t.push(n)}),r(t)},o.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),r(t)},o.prototype.entries=function(){var t=[];return this.forEach(function(e,n){t.push([n,e])}),r(t)},g.iterable&&(o.prototype[Symbol.iterator]=o.prototype.entries);var _=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];h.prototype.clone=function(){return new h(this,{body:this._bodyInit})},l.call(h.prototype),l.call(m.prototype),m.prototype.clone=function(){return new m(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new o(this.headers),url:this.url})},m.error=function(){var t=new m(null,{status:0,statusText:""});return t.type="error",t};var E=[301,302,303,307,308];m.redirect=function(t,e){if(-1===E.indexOf(e))throw new RangeError("Invalid status code");return new m(null,{status:e,headers:{location:t}})},t.Headers=o,t.Request=h,t.Response=m,t.fetch=function(t,e){return new Promise(function(n,r){var o=new h(t,e),i=new XMLHttpRequest;i.onload=function(){var t={status:i.status,statusText:i.statusText,headers:y(i.getAllResponseHeaders()||"")};t.url="responseURL"in i?i.responseURL:t.headers.get("X-Request-URL");var e="response"in i?i.response:i.responseText;n(new m(e,t))},i.onerror=function(){r(new TypeError("Network request failed"))},i.ontimeout=function(){r(new TypeError("Network request failed"))},i.open(o.method,o.url,!0),"include"===o.credentials&&(i.withCredentials=!0),"responseType"in i&&g.blob&&(i.responseType="blob"),o.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send("undefined"===typeof o._bodyInit?null:o._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!==typeof self?self:this)},function(t,e,n){"use strict";function r(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}var o=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},n=0;n<10;n++)e["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(t){r[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var n,s,u=r(t),c=1;c<arguments.length;c++){n=Object(arguments[c]);for(var f in n)i.call(n,f)&&(u[f]=n[f]);if(o){s=o(n);for(var l=0;l<s.length;l++)a.call(n,s[l])&&(u[s[l]]=n[s[l]])}}return u}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n(11)},function(t,e,n){"use strict";function r(){w.startCamera().then(function(){console.log("Camera started with default All")}).catch(function(t){console.error("Camera not started!",t)})}function o(){var t=h.value;w.startCamera(c.a[t]).then(function(){var e="Camera started with default resolution and prefered facingMode : "+t;console.log(e)}).catch(function(t){console.error("Camera not started!",t)})}function i(){var t=c.b.JPG,e={sizeFactor:1,imageType:t,imageCompression:1},n=w.getDataUri(e);d.src=n}function a(){var t=w.getCameraSettings(),e="No camera";if(t){e="\n        aspectRatio:"+t.aspectRatio+"\n        frameRate: "+t.frameRate+"\n        height: "+t.height+"\n        width: "+t.width+"\n    "}b.innerHTML=e}function s(){w.stopCamera().then(function(){console.log("Camera stoped!")}).catch(function(t){console.log("No camera to stop!:",t)})}function u(){var t=h.value;w.startCameraMaxResolution(c.a[t]).then(function(){var e="Camera started with maximum resoluton and prefered facingMode : "+t;console.log(e)}).catch(function(t){console.error("Camera not started!",t)})}var c=n(12),f=n(16),l=(n.n(f),document.getElementById("videoId")),d=document.getElementById("imgId"),h=document.getElementById("facingModeSelectId"),p=document.getElementById("startDefaultAllButtonId"),y=document.getElementById("startDefaultResolutionButtonId"),m=document.getElementById("startMaxResolutionId"),g=document.getElementById("takePhotoButtonId"),v=document.getElementById("stopCameraButtonId"),b=document.getElementById("cameraSettingsId"),w=new c.c(l);document.addEventListener("DOMContentLoaded",function(){setInterval(function(){a()},500),p.onclick=r,y.onclick=o,m.onclick=u,g.onclick=i,v.onclick=s})},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.d(e,"a",function(){return c}),n.d(e,"b",function(){return f});var o=n(13),i=n(15),a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=o.a.IMAGE_TYPES.PNG,u=function(){function t(e){r(this,t),this.videoElement=e,this.stream=null,this.numberOfMaxResolutionTry=1,this.settings=null,this.windowURL=o.a.getWindowURL(),this.mediaDevices=o.a.getNavigatorMediaDevices()}return a(t,[{key:"_getStreamDevice",value:function(t,e){var n=this;return new Promise(function(r,i){var a=o.a.getIdealConstraints(t,e);n.mediaDevices.getUserMedia(a).then(function(t){n._gotStream(t),r(t)}).catch(function(t){i(t)})})}},{key:"_getStreamDeviceMaxResolution",value:function(t){var e=this,n=o.a.getMaxResolutionConstraints(t,this.numberOfMaxResolutionTry);if(null==n){var r={};return this._getStreamDevice(t,r)}return new Promise(function(r,o){e.mediaDevices.getUserMedia(n).then(function(t){e._gotStream(t),r(t)}).catch(function(n){setTimeout(function(){e.numberOfMaxResolutionTry+=1,e._getStreamDeviceMaxResolution(t).catch(function(){o(n)})},20)})})}},{key:"_setVideoSrc",value:function(t){if("srcObject"in this.videoElement)this.videoElement.srcObject=t;else{var e=this.windowURL.createObjectURL(t);this.videoElement.src=e}}},{key:"_setSettings",value:function(t){this.settings=null;var e=t&&t.getTracks?t.getTracks():[];e.length>0&&e[0].getSettings&&(this.settings=e[0].getSettings())}},{key:"_gotStream",value:function(t){this.stream=t,this._setSettings(t),this._setVideoSrc(t)}},{key:"getCameraSettings",value:function(){return this.settings}},{key:"startCamera",value:function(t,e){var n=this;return this.stopCamera().then(function(){}).catch(function(){}).then(function(){return n._getStreamDevice(t,e)})}},{key:"startCameraMaxResolution",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.stopCamera().then(function(){}).catch(function(){}).then(function(){return t._getStreamDeviceMaxResolution(e)})}},{key:"getDataUri",value:function(t){var e={sizeFactor:void 0===t.sizeFactor?i.c:t.sizeFactor,imageType:void 0===t.imageType?s:t.imageType,imageCompression:void 0===t.imageCompression?i.a:t.imageCompression,isImageMirror:void 0===t.isImageMirror?i.b:t.isImageMirror};return o.a.getDataUri(this.videoElement,e)}},{key:"stopCamera",value:function(){var t=this;return new Promise(function(e,n){t.stream&&(t.stream.getTracks().forEach(function(t){t.stop()}),t.videoElement.src="",t.stream=null,t._setSettings(null),e()),n(Error("no stream to stop!"))})}}]),t}(),c=o.a.FACING_MODES,f=o.a.IMAGE_TYPES;e.c=u},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=n(14),i=n(1),a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=function(){function t(){r(this,t)}return a(t,null,[{key:"getDataUri",value:function(t,e){var n=e.sizeFactor,r=e.imageType,i=e.imageCompression,a=e.isImageMirror,s=t.videoWidth,u=t.videoHeight,c=Object(o.b)(s,u,n),f=c.imageWidth,l=c.imageHeight,d=document.createElement("canvas");d.width=f,d.height=l;var h=d.getContext("2d");return a&&h.setTransform(-1,0,0,1,d.width,0),h.drawImage(t,0,0,f,l),Object(o.a)(d,r,i)}},{key:"getWindowURL",value:function(){return window.URL||window.webkitURL||window.mozURL||window.msURL}},{key:"getNavigatorMediaDevices",value:function(){var t=null,e=!(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia),n=!(!navigator.mozGetUserMedia&&!navigator.webkitGetUserMedia);if(e)t=navigator.mediaDevices;else if(n){var r=navigator.mozGetUserMedia||navigator.webkitGetUserMedia,o={getUserMedia:function(t){return new Promise(function(e,n){r.call(navigator,t,e,n)})}};t=Object.assign(r,o)}return t}},{key:"isSupportedFacingMode",value:function(){return t.getNavigatorMediaDevices().getSupportedConstraints().facingMode}},{key:"getIdealConstraints",value:function(t,e){var n={audio:!1,video:{}};if(Object(o.c)(t,e))return i.d;var r=navigator.mediaDevices.getSupportedConstraints();return r.width&&r.height&&r.facingMode?(t&&i.e.includes(t)&&(n.video.facingMode=t),e&&e.width&&(n.video.width=e.width),e&&e.height&&(n.video.height=e.height),n):(console.error("Constraint width height or facingMode not supported!"),i.d)}},{key:"getMaxResolutionConstraints",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments[1],r=t.getIdealConstraints(e),o=r.video.facingMode,i=[{width:{min:640},ideal:{facingMode:o}},{width:{min:800},ideal:{facingMode:o}},{width:{min:900},ideal:{facingMode:o}},{width:{min:1024},ideal:{facingMode:o}},{width:{min:1080},ideal:{facingMode:o}},{width:{min:1280},ideal:{facingMode:o}},{width:{min:1920},ideal:{facingMode:o}},{width:{min:2560},ideal:{facingMode:o}},{width:{min:3840},ideal:{facingMode:o}}];if(n>=i.length)return null;var a=i.slice(0,-n);return r.video.advanced=a,r}},{key:"FACING_MODES",get:function(){return i.a}},{key:"IMAGE_TYPES",get:function(){return i.c}}]),t}();e.a=s},function(t,e,n){"use strict";function r(t,e){if(!(e>=0&&e<=1))throw new Error(e+" is invalid imageCompression, choose between: [0, 1]");if(!c.f.includes(t))throw new Error(t+" is invalid imageType, choose between: "+c.f.join(", "));return!0}function o(t,e){var n={};try{r(t,e),n.imageType=t,n.imageCompression=e}catch(t){console.error(t),console.error("default value of "+c.c.PNG+" is used"),n.imageType=c.c.PNG,n.imageCompression=null}return n}function i(t,e,n){var r=t*parseFloat(n);return{imageWidth:r,imageHeight:e/(t/r)}}function a(t,e,n){return o(e,n).imageType===c.c.JPG?n?t.toDataURL(c.b[c.c.JPG],n):t.toDataURL(c.b[c.c.JPG]):t.toDataURL(c.b[e])}function s(t){if("object"===("undefined"===typeof t?"undefined":f(t)))for(var e in t)if(t.hasOwnProperty(e))return!1;return!0}function u(t,e){return!(t||e&&!s(e))}e.b=i,e.a=a,e.c=u;var c=n(1),f="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t}},function(t,e,n){"use strict";n.d(e,"c",function(){return r}),n.d(e,"a",function(){return o}),n.d(e,"b",function(){return i});var r=1,o=null,i=!1},function(t,e){}]);
//# sourceMappingURL=main.0aa8faad.js.map