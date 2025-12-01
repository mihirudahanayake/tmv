function jE(t,e){for(var n=0;n<e.length;n++){const r=e[n];if(typeof r!="string"&&!Array.isArray(r)){for(const s in r)if(s!=="default"&&!(s in t)){const i=Object.getOwnPropertyDescriptor(r,s);i&&Object.defineProperty(t,s,i.get?i:{enumerable:!0,get:()=>r[s]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function LE(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Fv={exports:{}},gu={},Bv={exports:{}},re={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ko=Symbol.for("react.element"),VE=Symbol.for("react.portal"),ME=Symbol.for("react.fragment"),UE=Symbol.for("react.strict_mode"),FE=Symbol.for("react.profiler"),BE=Symbol.for("react.provider"),zE=Symbol.for("react.context"),$E=Symbol.for("react.forward_ref"),HE=Symbol.for("react.suspense"),WE=Symbol.for("react.memo"),qE=Symbol.for("react.lazy"),Hm=Symbol.iterator;function KE(t){return t===null||typeof t!="object"?null:(t=Hm&&t[Hm]||t["@@iterator"],typeof t=="function"?t:null)}var zv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},$v=Object.assign,Hv={};function mi(t,e,n){this.props=t,this.context=e,this.refs=Hv,this.updater=n||zv}mi.prototype.isReactComponent={};mi.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};mi.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Wv(){}Wv.prototype=mi.prototype;function Wh(t,e,n){this.props=t,this.context=e,this.refs=Hv,this.updater=n||zv}var qh=Wh.prototype=new Wv;qh.constructor=Wh;$v(qh,mi.prototype);qh.isPureReactComponent=!0;var Wm=Array.isArray,qv=Object.prototype.hasOwnProperty,Kh={current:null},Kv={key:!0,ref:!0,__self:!0,__source:!0};function Gv(t,e,n){var r,s={},i=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(i=""+e.key),e)qv.call(e,r)&&!Kv.hasOwnProperty(r)&&(s[r]=e[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var u=Array(l),c=0;c<l;c++)u[c]=arguments[c+2];s.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:Ko,type:t,key:i,ref:o,props:s,_owner:Kh.current}}function GE(t,e){return{$$typeof:Ko,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Gh(t){return typeof t=="object"&&t!==null&&t.$$typeof===Ko}function QE(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var qm=/\/+/g;function Dc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?QE(""+t.key):e.toString(36)}function tl(t,e,n,r,s){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Ko:case VE:o=!0}}if(o)return o=t,s=s(o),t=r===""?"."+Dc(o,0):r,Wm(s)?(n="",t!=null&&(n=t.replace(qm,"$&/")+"/"),tl(s,e,n,"",function(c){return c})):s!=null&&(Gh(s)&&(s=GE(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(qm,"$&/")+"/")+t)),e.push(s)),1;if(o=0,r=r===""?".":r+":",Wm(t))for(var l=0;l<t.length;l++){i=t[l];var u=r+Dc(i,l);o+=tl(i,e,n,u,s)}else if(u=KE(t),typeof u=="function")for(t=u.call(t),l=0;!(i=t.next()).done;)i=i.value,u=r+Dc(i,l++),o+=tl(i,e,n,u,s);else if(i==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Pa(t,e,n){if(t==null)return t;var r=[],s=0;return tl(t,r,"","",function(i){return e.call(n,i,s++)}),r}function YE(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var vt={current:null},nl={transition:null},XE={ReactCurrentDispatcher:vt,ReactCurrentBatchConfig:nl,ReactCurrentOwner:Kh};function Qv(){throw Error("act(...) is not supported in production builds of React.")}re.Children={map:Pa,forEach:function(t,e,n){Pa(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Pa(t,function(){e++}),e},toArray:function(t){return Pa(t,function(e){return e})||[]},only:function(t){if(!Gh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};re.Component=mi;re.Fragment=ME;re.Profiler=FE;re.PureComponent=Wh;re.StrictMode=UE;re.Suspense=HE;re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=XE;re.act=Qv;re.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=$v({},t.props),s=t.key,i=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(i=e.ref,o=Kh.current),e.key!==void 0&&(s=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)qv.call(e,u)&&!Kv.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var c=0;c<u;c++)l[c]=arguments[c+2];r.children=l}return{$$typeof:Ko,type:t.type,key:s,ref:i,props:r,_owner:o}};re.createContext=function(t){return t={$$typeof:zE,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:BE,_context:t},t.Consumer=t};re.createElement=Gv;re.createFactory=function(t){var e=Gv.bind(null,t);return e.type=t,e};re.createRef=function(){return{current:null}};re.forwardRef=function(t){return{$$typeof:$E,render:t}};re.isValidElement=Gh;re.lazy=function(t){return{$$typeof:qE,_payload:{_status:-1,_result:t},_init:YE}};re.memo=function(t,e){return{$$typeof:WE,type:t,compare:e===void 0?null:e}};re.startTransition=function(t){var e=nl.transition;nl.transition={};try{t()}finally{nl.transition=e}};re.unstable_act=Qv;re.useCallback=function(t,e){return vt.current.useCallback(t,e)};re.useContext=function(t){return vt.current.useContext(t)};re.useDebugValue=function(){};re.useDeferredValue=function(t){return vt.current.useDeferredValue(t)};re.useEffect=function(t,e){return vt.current.useEffect(t,e)};re.useId=function(){return vt.current.useId()};re.useImperativeHandle=function(t,e,n){return vt.current.useImperativeHandle(t,e,n)};re.useInsertionEffect=function(t,e){return vt.current.useInsertionEffect(t,e)};re.useLayoutEffect=function(t,e){return vt.current.useLayoutEffect(t,e)};re.useMemo=function(t,e){return vt.current.useMemo(t,e)};re.useReducer=function(t,e,n){return vt.current.useReducer(t,e,n)};re.useRef=function(t){return vt.current.useRef(t)};re.useState=function(t){return vt.current.useState(t)};re.useSyncExternalStore=function(t,e,n){return vt.current.useSyncExternalStore(t,e,n)};re.useTransition=function(){return vt.current.useTransition()};re.version="18.3.1";Bv.exports=re;var O=Bv.exports;const pr=LE(O),JE=jE({__proto__:null,default:pr},[O]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ZE=O,eT=Symbol.for("react.element"),tT=Symbol.for("react.fragment"),nT=Object.prototype.hasOwnProperty,rT=ZE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,sT={key:!0,ref:!0,__self:!0,__source:!0};function Yv(t,e,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)nT.call(e,r)&&!sT.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:eT,type:t,key:i,ref:o,props:s,_owner:rT.current}}gu.Fragment=tT;gu.jsx=Yv;gu.jsxs=Yv;Fv.exports=gu;var d=Fv.exports,Xv={exports:{}},Vt={},Jv={exports:{}},Zv={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(z,K){var U=z.length;z.push(K);e:for(;0<U;){var q=U-1>>>1,Q=z[q];if(0<s(Q,K))z[q]=K,z[U]=Q,U=q;else break e}}function n(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var K=z[0],U=z.pop();if(U!==K){z[0]=U;e:for(var q=0,Q=z.length,ne=Q>>>1;q<ne;){var dt=2*(q+1)-1,Je=z[dt],Ee=dt+1,Gt=z[Ee];if(0>s(Je,U))Ee<Q&&0>s(Gt,Je)?(z[q]=Gt,z[Ee]=U,q=Ee):(z[q]=Je,z[dt]=U,q=dt);else if(Ee<Q&&0>s(Gt,U))z[q]=Gt,z[Ee]=U,q=Ee;else break e}}return K}function s(z,K){var U=z.sortIndex-K.sortIndex;return U!==0?U:z.id-K.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],c=[],f=1,m=null,g=3,k=!1,C=!1,N=!1,P=typeof setTimeout=="function"?setTimeout:null,A=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function T(z){for(var K=n(c);K!==null;){if(K.callback===null)r(c);else if(K.startTime<=z)r(c),K.sortIndex=K.expirationTime,e(u,K);else break;K=n(c)}}function R(z){if(N=!1,T(z),!C)if(n(u)!==null)C=!0,se(L);else{var K=n(c);K!==null&&Re(R,K.startTime-z)}}function L(z,K){C=!1,N&&(N=!1,A(y),y=-1),k=!0;var U=g;try{for(T(K),m=n(u);m!==null&&(!(m.expirationTime>K)||z&&!I());){var q=m.callback;if(typeof q=="function"){m.callback=null,g=m.priorityLevel;var Q=q(m.expirationTime<=K);K=t.unstable_now(),typeof Q=="function"?m.callback=Q:m===n(u)&&r(u),T(K)}else r(u);m=n(u)}if(m!==null)var ne=!0;else{var dt=n(c);dt!==null&&Re(R,dt.startTime-K),ne=!1}return ne}finally{m=null,g=U,k=!1}}var V=!1,w=null,y=-1,x=5,S=-1;function I(){return!(t.unstable_now()-S<x)}function b(){if(w!==null){var z=t.unstable_now();S=z;var K=!0;try{K=w(!0,z)}finally{K?E():(V=!1,w=null)}}else V=!1}var E;if(typeof _=="function")E=function(){_(b)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,ae=J.port2;J.port1.onmessage=b,E=function(){ae.postMessage(null)}}else E=function(){P(b,0)};function se(z){w=z,V||(V=!0,E())}function Re(z,K){y=P(function(){z(t.unstable_now())},K)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(z){z.callback=null},t.unstable_continueExecution=function(){C||k||(C=!0,se(L))},t.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):x=0<z?Math.floor(1e3/z):5},t.unstable_getCurrentPriorityLevel=function(){return g},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(z){switch(g){case 1:case 2:case 3:var K=3;break;default:K=g}var U=g;g=K;try{return z()}finally{g=U}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(z,K){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var U=g;g=z;try{return K()}finally{g=U}},t.unstable_scheduleCallback=function(z,K,U){var q=t.unstable_now();switch(typeof U=="object"&&U!==null?(U=U.delay,U=typeof U=="number"&&0<U?q+U:q):U=q,z){case 1:var Q=-1;break;case 2:Q=250;break;case 5:Q=1073741823;break;case 4:Q=1e4;break;default:Q=5e3}return Q=U+Q,z={id:f++,callback:K,priorityLevel:z,startTime:U,expirationTime:Q,sortIndex:-1},U>q?(z.sortIndex=U,e(c,z),n(u)===null&&z===n(c)&&(N?(A(y),y=-1):N=!0,Re(R,U-q))):(z.sortIndex=Q,e(u,z),C||k||(C=!0,se(L))),z},t.unstable_shouldYield=I,t.unstable_wrapCallback=function(z){var K=g;return function(){var U=g;g=K;try{return z.apply(this,arguments)}finally{g=U}}}})(Zv);Jv.exports=Zv;var iT=Jv.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var oT=O,Lt=iT;function B(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var e0=new Set,yo={};function ds(t,e){Zs(t,e),Zs(t+"Capture",e)}function Zs(t,e){for(yo[t]=e,t=0;t<e.length;t++)e0.add(e[t])}var Vn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Id=Object.prototype.hasOwnProperty,aT=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Km={},Gm={};function lT(t){return Id.call(Gm,t)?!0:Id.call(Km,t)?!1:aT.test(t)?Gm[t]=!0:(Km[t]=!0,!1)}function uT(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function cT(t,e,n,r){if(e===null||typeof e>"u"||uT(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function _t(t,e,n,r,s,i,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=i,this.removeEmptyString=o}var Ye={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Ye[t]=new _t(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Ye[e]=new _t(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Ye[t]=new _t(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Ye[t]=new _t(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Ye[t]=new _t(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Ye[t]=new _t(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Ye[t]=new _t(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Ye[t]=new _t(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Ye[t]=new _t(t,5,!1,t.toLowerCase(),null,!1,!1)});var Qh=/[\-:]([a-z])/g;function Yh(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Qh,Yh);Ye[e]=new _t(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Qh,Yh);Ye[e]=new _t(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Qh,Yh);Ye[e]=new _t(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Ye[t]=new _t(t,1,!1,t.toLowerCase(),null,!1,!1)});Ye.xlinkHref=new _t("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Ye[t]=new _t(t,1,!1,t.toLowerCase(),null,!0,!0)});function Xh(t,e,n,r){var s=Ye.hasOwnProperty(e)?Ye[e]:null;(s!==null?s.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(cT(e,n,s,r)&&(n=null),r||s===null?lT(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):s.mustUseProperty?t[s.propertyName]=n===null?s.type===3?!1:"":n:(e=s.attributeName,r=s.attributeNamespace,n===null?t.removeAttribute(e):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var qn=oT.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Da=Symbol.for("react.element"),Rs=Symbol.for("react.portal"),Ns=Symbol.for("react.fragment"),Jh=Symbol.for("react.strict_mode"),Sd=Symbol.for("react.profiler"),t0=Symbol.for("react.provider"),n0=Symbol.for("react.context"),Zh=Symbol.for("react.forward_ref"),Ad=Symbol.for("react.suspense"),kd=Symbol.for("react.suspense_list"),ef=Symbol.for("react.memo"),nr=Symbol.for("react.lazy"),r0=Symbol.for("react.offscreen"),Qm=Symbol.iterator;function Vi(t){return t===null||typeof t!="object"?null:(t=Qm&&t[Qm]||t["@@iterator"],typeof t=="function"?t:null)}var Se=Object.assign,Oc;function qi(t){if(Oc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Oc=e&&e[1]||""}return`
`+Oc+t}var jc=!1;function Lc(t,e){if(!t||jc)return"";jc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){r=c}t.call(e.prototype)}else{try{throw Error()}catch(c){r=c}t()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var s=c.stack.split(`
`),i=r.stack.split(`
`),o=s.length-1,l=i.length-1;1<=o&&0<=l&&s[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(s[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||s[o]!==i[l]){var u=`
`+s[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{jc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?qi(t):""}function dT(t){switch(t.tag){case 5:return qi(t.type);case 16:return qi("Lazy");case 13:return qi("Suspense");case 19:return qi("SuspenseList");case 0:case 2:case 15:return t=Lc(t.type,!1),t;case 11:return t=Lc(t.type.render,!1),t;case 1:return t=Lc(t.type,!0),t;default:return""}}function Cd(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Ns:return"Fragment";case Rs:return"Portal";case Sd:return"Profiler";case Jh:return"StrictMode";case Ad:return"Suspense";case kd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case n0:return(t.displayName||"Context")+".Consumer";case t0:return(t._context.displayName||"Context")+".Provider";case Zh:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case ef:return e=t.displayName||null,e!==null?e:Cd(t.type)||"Memo";case nr:e=t._payload,t=t._init;try{return Cd(t(e))}catch{}}return null}function hT(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Cd(e);case 8:return e===Jh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Ar(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function s0(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function fT(t){var e=s0(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Oa(t){t._valueTracker||(t._valueTracker=fT(t))}function i0(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=s0(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function El(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function bd(t,e){var n=e.checked;return Se({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Ym(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Ar(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function o0(t,e){e=e.checked,e!=null&&Xh(t,"checked",e,!1)}function Rd(t,e){o0(t,e);var n=Ar(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Nd(t,e.type,n):e.hasOwnProperty("defaultValue")&&Nd(t,e.type,Ar(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Xm(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Nd(t,e,n){(e!=="number"||El(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Ki=Array.isArray;function $s(t,e,n,r){if(t=t.options,e){e={};for(var s=0;s<n.length;s++)e["$"+n[s]]=!0;for(n=0;n<t.length;n++)s=e.hasOwnProperty("$"+t[n].value),t[n].selected!==s&&(t[n].selected=s),s&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Ar(n),e=null,s=0;s<t.length;s++){if(t[s].value===n){t[s].selected=!0,r&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function Pd(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(B(91));return Se({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Jm(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(B(92));if(Ki(n)){if(1<n.length)throw Error(B(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Ar(n)}}function a0(t,e){var n=Ar(e.value),r=Ar(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Zm(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function l0(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Dd(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?l0(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var ja,u0=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,s){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,s)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(ja=ja||document.createElement("div"),ja.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=ja.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function vo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var no={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},pT=["Webkit","ms","Moz","O"];Object.keys(no).forEach(function(t){pT.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),no[e]=no[t]})});function c0(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||no.hasOwnProperty(t)&&no[t]?(""+e).trim():e+"px"}function d0(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=c0(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,s):t[n]=s}}var mT=Se({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Od(t,e){if(e){if(mT[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(B(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(B(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(B(61))}if(e.style!=null&&typeof e.style!="object")throw Error(B(62))}}function jd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ld=null;function tf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Vd=null,Hs=null,Ws=null;function eg(t){if(t=Yo(t)){if(typeof Vd!="function")throw Error(B(280));var e=t.stateNode;e&&(e=xu(e),Vd(t.stateNode,t.type,e))}}function h0(t){Hs?Ws?Ws.push(t):Ws=[t]:Hs=t}function f0(){if(Hs){var t=Hs,e=Ws;if(Ws=Hs=null,eg(t),e)for(t=0;t<e.length;t++)eg(e[t])}}function p0(t,e){return t(e)}function m0(){}var Vc=!1;function g0(t,e,n){if(Vc)return t(e,n);Vc=!0;try{return p0(t,e,n)}finally{Vc=!1,(Hs!==null||Ws!==null)&&(m0(),f0())}}function _o(t,e){var n=t.stateNode;if(n===null)return null;var r=xu(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(B(231,e,typeof n));return n}var Md=!1;if(Vn)try{var Mi={};Object.defineProperty(Mi,"passive",{get:function(){Md=!0}}),window.addEventListener("test",Mi,Mi),window.removeEventListener("test",Mi,Mi)}catch{Md=!1}function gT(t,e,n,r,s,i,o,l,u){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(f){this.onError(f)}}var ro=!1,Tl=null,Il=!1,Ud=null,yT={onError:function(t){ro=!0,Tl=t}};function vT(t,e,n,r,s,i,o,l,u){ro=!1,Tl=null,gT.apply(yT,arguments)}function _T(t,e,n,r,s,i,o,l,u){if(vT.apply(this,arguments),ro){if(ro){var c=Tl;ro=!1,Tl=null}else throw Error(B(198));Il||(Il=!0,Ud=c)}}function hs(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function y0(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function tg(t){if(hs(t)!==t)throw Error(B(188))}function wT(t){var e=t.alternate;if(!e){if(e=hs(t),e===null)throw Error(B(188));return e!==t?null:t}for(var n=t,r=e;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return tg(s),t;if(i===r)return tg(s),e;i=i.sibling}throw Error(B(188))}if(n.return!==r.return)n=s,r=i;else{for(var o=!1,l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o)throw Error(B(189))}}if(n.alternate!==r)throw Error(B(190))}if(n.tag!==3)throw Error(B(188));return n.stateNode.current===n?t:e}function v0(t){return t=wT(t),t!==null?_0(t):null}function _0(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=_0(t);if(e!==null)return e;t=t.sibling}return null}var w0=Lt.unstable_scheduleCallback,ng=Lt.unstable_cancelCallback,xT=Lt.unstable_shouldYield,ET=Lt.unstable_requestPaint,Pe=Lt.unstable_now,TT=Lt.unstable_getCurrentPriorityLevel,nf=Lt.unstable_ImmediatePriority,x0=Lt.unstable_UserBlockingPriority,Sl=Lt.unstable_NormalPriority,IT=Lt.unstable_LowPriority,E0=Lt.unstable_IdlePriority,yu=null,fn=null;function ST(t){if(fn&&typeof fn.onCommitFiberRoot=="function")try{fn.onCommitFiberRoot(yu,t,void 0,(t.current.flags&128)===128)}catch{}}var tn=Math.clz32?Math.clz32:CT,AT=Math.log,kT=Math.LN2;function CT(t){return t>>>=0,t===0?32:31-(AT(t)/kT|0)|0}var La=64,Va=4194304;function Gi(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Al(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,s=t.suspendedLanes,i=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~s;l!==0?r=Gi(l):(i&=o,i!==0&&(r=Gi(i)))}else o=n&~s,o!==0?r=Gi(o):i!==0&&(r=Gi(i));if(r===0)return 0;if(e!==0&&e!==r&&!(e&s)&&(s=r&-r,i=e&-e,s>=i||s===16&&(i&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-tn(e),s=1<<n,r|=t[n],e&=~s;return r}function bT(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function RT(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,s=t.expirationTimes,i=t.pendingLanes;0<i;){var o=31-tn(i),l=1<<o,u=s[o];u===-1?(!(l&n)||l&r)&&(s[o]=bT(l,e)):u<=e&&(t.expiredLanes|=l),i&=~l}}function Fd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function T0(){var t=La;return La<<=1,!(La&4194240)&&(La=64),t}function Mc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Go(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-tn(e),t[e]=n}function NT(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var s=31-tn(n),i=1<<s;e[s]=0,r[s]=-1,t[s]=-1,n&=~i}}function rf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-tn(n),s=1<<r;s&e|t[r]&e&&(t[r]|=e),n&=~s}}var he=0;function I0(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var S0,sf,A0,k0,C0,Bd=!1,Ma=[],mr=null,gr=null,yr=null,wo=new Map,xo=new Map,sr=[],PT="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function rg(t,e){switch(t){case"focusin":case"focusout":mr=null;break;case"dragenter":case"dragleave":gr=null;break;case"mouseover":case"mouseout":yr=null;break;case"pointerover":case"pointerout":wo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":xo.delete(e.pointerId)}}function Ui(t,e,n,r,s,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},e!==null&&(e=Yo(e),e!==null&&sf(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function DT(t,e,n,r,s){switch(e){case"focusin":return mr=Ui(mr,t,e,n,r,s),!0;case"dragenter":return gr=Ui(gr,t,e,n,r,s),!0;case"mouseover":return yr=Ui(yr,t,e,n,r,s),!0;case"pointerover":var i=s.pointerId;return wo.set(i,Ui(wo.get(i)||null,t,e,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,xo.set(i,Ui(xo.get(i)||null,t,e,n,r,s)),!0}return!1}function b0(t){var e=Hr(t.target);if(e!==null){var n=hs(e);if(n!==null){if(e=n.tag,e===13){if(e=y0(n),e!==null){t.blockedOn=e,C0(t.priority,function(){A0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function rl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=zd(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Ld=r,n.target.dispatchEvent(r),Ld=null}else return e=Yo(n),e!==null&&sf(e),t.blockedOn=n,!1;e.shift()}return!0}function sg(t,e,n){rl(t)&&n.delete(e)}function OT(){Bd=!1,mr!==null&&rl(mr)&&(mr=null),gr!==null&&rl(gr)&&(gr=null),yr!==null&&rl(yr)&&(yr=null),wo.forEach(sg),xo.forEach(sg)}function Fi(t,e){t.blockedOn===e&&(t.blockedOn=null,Bd||(Bd=!0,Lt.unstable_scheduleCallback(Lt.unstable_NormalPriority,OT)))}function Eo(t){function e(s){return Fi(s,t)}if(0<Ma.length){Fi(Ma[0],t);for(var n=1;n<Ma.length;n++){var r=Ma[n];r.blockedOn===t&&(r.blockedOn=null)}}for(mr!==null&&Fi(mr,t),gr!==null&&Fi(gr,t),yr!==null&&Fi(yr,t),wo.forEach(e),xo.forEach(e),n=0;n<sr.length;n++)r=sr[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<sr.length&&(n=sr[0],n.blockedOn===null);)b0(n),n.blockedOn===null&&sr.shift()}var qs=qn.ReactCurrentBatchConfig,kl=!0;function jT(t,e,n,r){var s=he,i=qs.transition;qs.transition=null;try{he=1,of(t,e,n,r)}finally{he=s,qs.transition=i}}function LT(t,e,n,r){var s=he,i=qs.transition;qs.transition=null;try{he=4,of(t,e,n,r)}finally{he=s,qs.transition=i}}function of(t,e,n,r){if(kl){var s=zd(t,e,n,r);if(s===null)Gc(t,e,r,Cl,n),rg(t,r);else if(DT(s,t,e,n,r))r.stopPropagation();else if(rg(t,r),e&4&&-1<PT.indexOf(t)){for(;s!==null;){var i=Yo(s);if(i!==null&&S0(i),i=zd(t,e,n,r),i===null&&Gc(t,e,r,Cl,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else Gc(t,e,r,null,n)}}var Cl=null;function zd(t,e,n,r){if(Cl=null,t=tf(r),t=Hr(t),t!==null)if(e=hs(t),e===null)t=null;else if(n=e.tag,n===13){if(t=y0(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Cl=t,null}function R0(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(TT()){case nf:return 1;case x0:return 4;case Sl:case IT:return 16;case E0:return 536870912;default:return 16}default:return 16}}var cr=null,af=null,sl=null;function N0(){if(sl)return sl;var t,e=af,n=e.length,r,s="value"in cr?cr.value:cr.textContent,i=s.length;for(t=0;t<n&&e[t]===s[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===s[i-r];r++);return sl=s.slice(t,1<r?1-r:void 0)}function il(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ua(){return!0}function ig(){return!1}function Mt(t){function e(n,r,s,i,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Ua:ig,this.isPropagationStopped=ig,this}return Se(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ua)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ua)},persist:function(){},isPersistent:Ua}),e}var gi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},lf=Mt(gi),Qo=Se({},gi,{view:0,detail:0}),VT=Mt(Qo),Uc,Fc,Bi,vu=Se({},Qo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:uf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Bi&&(Bi&&t.type==="mousemove"?(Uc=t.screenX-Bi.screenX,Fc=t.screenY-Bi.screenY):Fc=Uc=0,Bi=t),Uc)},movementY:function(t){return"movementY"in t?t.movementY:Fc}}),og=Mt(vu),MT=Se({},vu,{dataTransfer:0}),UT=Mt(MT),FT=Se({},Qo,{relatedTarget:0}),Bc=Mt(FT),BT=Se({},gi,{animationName:0,elapsedTime:0,pseudoElement:0}),zT=Mt(BT),$T=Se({},gi,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),HT=Mt($T),WT=Se({},gi,{data:0}),ag=Mt(WT),qT={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},KT={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},GT={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function QT(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=GT[t])?!!e[t]:!1}function uf(){return QT}var YT=Se({},Qo,{key:function(t){if(t.key){var e=qT[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=il(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?KT[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:uf,charCode:function(t){return t.type==="keypress"?il(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?il(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),XT=Mt(YT),JT=Se({},vu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),lg=Mt(JT),ZT=Se({},Qo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:uf}),eI=Mt(ZT),tI=Se({},gi,{propertyName:0,elapsedTime:0,pseudoElement:0}),nI=Mt(tI),rI=Se({},vu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),sI=Mt(rI),iI=[9,13,27,32],cf=Vn&&"CompositionEvent"in window,so=null;Vn&&"documentMode"in document&&(so=document.documentMode);var oI=Vn&&"TextEvent"in window&&!so,P0=Vn&&(!cf||so&&8<so&&11>=so),ug=" ",cg=!1;function D0(t,e){switch(t){case"keyup":return iI.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function O0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Ps=!1;function aI(t,e){switch(t){case"compositionend":return O0(e);case"keypress":return e.which!==32?null:(cg=!0,ug);case"textInput":return t=e.data,t===ug&&cg?null:t;default:return null}}function lI(t,e){if(Ps)return t==="compositionend"||!cf&&D0(t,e)?(t=N0(),sl=af=cr=null,Ps=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return P0&&e.locale!=="ko"?null:e.data;default:return null}}var uI={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function dg(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!uI[t.type]:e==="textarea"}function j0(t,e,n,r){h0(r),e=bl(e,"onChange"),0<e.length&&(n=new lf("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var io=null,To=null;function cI(t){q0(t,0)}function _u(t){var e=js(t);if(i0(e))return t}function dI(t,e){if(t==="change")return e}var L0=!1;if(Vn){var zc;if(Vn){var $c="oninput"in document;if(!$c){var hg=document.createElement("div");hg.setAttribute("oninput","return;"),$c=typeof hg.oninput=="function"}zc=$c}else zc=!1;L0=zc&&(!document.documentMode||9<document.documentMode)}function fg(){io&&(io.detachEvent("onpropertychange",V0),To=io=null)}function V0(t){if(t.propertyName==="value"&&_u(To)){var e=[];j0(e,To,t,tf(t)),g0(cI,e)}}function hI(t,e,n){t==="focusin"?(fg(),io=e,To=n,io.attachEvent("onpropertychange",V0)):t==="focusout"&&fg()}function fI(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return _u(To)}function pI(t,e){if(t==="click")return _u(e)}function mI(t,e){if(t==="input"||t==="change")return _u(e)}function gI(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var rn=typeof Object.is=="function"?Object.is:gI;function Io(t,e){if(rn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!Id.call(e,s)||!rn(t[s],e[s]))return!1}return!0}function pg(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function mg(t,e){var n=pg(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=pg(n)}}function M0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?M0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function U0(){for(var t=window,e=El();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=El(t.document)}return e}function df(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function yI(t){var e=U0(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&M0(n.ownerDocument.documentElement,n)){if(r!==null&&df(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!t.extend&&i>r&&(s=r,r=i,i=s),s=mg(n,i);var o=mg(n,r);s&&o&&(t.rangeCount!==1||t.anchorNode!==s.node||t.anchorOffset!==s.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),t.removeAllRanges(),i>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var vI=Vn&&"documentMode"in document&&11>=document.documentMode,Ds=null,$d=null,oo=null,Hd=!1;function gg(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Hd||Ds==null||Ds!==El(r)||(r=Ds,"selectionStart"in r&&df(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),oo&&Io(oo,r)||(oo=r,r=bl($d,"onSelect"),0<r.length&&(e=new lf("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=Ds)))}function Fa(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Os={animationend:Fa("Animation","AnimationEnd"),animationiteration:Fa("Animation","AnimationIteration"),animationstart:Fa("Animation","AnimationStart"),transitionend:Fa("Transition","TransitionEnd")},Hc={},F0={};Vn&&(F0=document.createElement("div").style,"AnimationEvent"in window||(delete Os.animationend.animation,delete Os.animationiteration.animation,delete Os.animationstart.animation),"TransitionEvent"in window||delete Os.transitionend.transition);function wu(t){if(Hc[t])return Hc[t];if(!Os[t])return t;var e=Os[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in F0)return Hc[t]=e[n];return t}var B0=wu("animationend"),z0=wu("animationiteration"),$0=wu("animationstart"),H0=wu("transitionend"),W0=new Map,yg="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Nr(t,e){W0.set(t,e),ds(e,[t])}for(var Wc=0;Wc<yg.length;Wc++){var qc=yg[Wc],_I=qc.toLowerCase(),wI=qc[0].toUpperCase()+qc.slice(1);Nr(_I,"on"+wI)}Nr(B0,"onAnimationEnd");Nr(z0,"onAnimationIteration");Nr($0,"onAnimationStart");Nr("dblclick","onDoubleClick");Nr("focusin","onFocus");Nr("focusout","onBlur");Nr(H0,"onTransitionEnd");Zs("onMouseEnter",["mouseout","mouseover"]);Zs("onMouseLeave",["mouseout","mouseover"]);Zs("onPointerEnter",["pointerout","pointerover"]);Zs("onPointerLeave",["pointerout","pointerover"]);ds("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ds("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ds("onBeforeInput",["compositionend","keypress","textInput","paste"]);ds("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ds("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ds("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Qi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),xI=new Set("cancel close invalid load scroll toggle".split(" ").concat(Qi));function vg(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,_T(r,e,void 0,t),t.currentTarget=null}function q0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],s=r.event;r=r.listeners;e:{var i=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,c=l.currentTarget;if(l=l.listener,u!==i&&s.isPropagationStopped())break e;vg(s,l,c),i=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,c=l.currentTarget,l=l.listener,u!==i&&s.isPropagationStopped())break e;vg(s,l,c),i=u}}}if(Il)throw t=Ud,Il=!1,Ud=null,t}function ve(t,e){var n=e[Qd];n===void 0&&(n=e[Qd]=new Set);var r=t+"__bubble";n.has(r)||(K0(e,t,2,!1),n.add(r))}function Kc(t,e,n){var r=0;e&&(r|=4),K0(n,t,r,e)}var Ba="_reactListening"+Math.random().toString(36).slice(2);function So(t){if(!t[Ba]){t[Ba]=!0,e0.forEach(function(n){n!=="selectionchange"&&(xI.has(n)||Kc(n,!1,t),Kc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ba]||(e[Ba]=!0,Kc("selectionchange",!1,e))}}function K0(t,e,n,r){switch(R0(e)){case 1:var s=jT;break;case 4:s=LT;break;default:s=of}n=s.bind(null,e,n,t),s=void 0,!Md||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),r?s!==void 0?t.addEventListener(e,n,{capture:!0,passive:s}):t.addEventListener(e,n,!0):s!==void 0?t.addEventListener(e,n,{passive:s}):t.addEventListener(e,n,!1)}function Gc(t,e,n,r,s){var i=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===s||u.nodeType===8&&u.parentNode===s))return;o=o.return}for(;l!==null;){if(o=Hr(l),o===null)return;if(u=o.tag,u===5||u===6){r=i=o;continue e}l=l.parentNode}}r=r.return}g0(function(){var c=i,f=tf(n),m=[];e:{var g=W0.get(t);if(g!==void 0){var k=lf,C=t;switch(t){case"keypress":if(il(n)===0)break e;case"keydown":case"keyup":k=XT;break;case"focusin":C="focus",k=Bc;break;case"focusout":C="blur",k=Bc;break;case"beforeblur":case"afterblur":k=Bc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":k=og;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":k=UT;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":k=eI;break;case B0:case z0:case $0:k=zT;break;case H0:k=nI;break;case"scroll":k=VT;break;case"wheel":k=sI;break;case"copy":case"cut":case"paste":k=HT;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":k=lg}var N=(e&4)!==0,P=!N&&t==="scroll",A=N?g!==null?g+"Capture":null:g;N=[];for(var _=c,T;_!==null;){T=_;var R=T.stateNode;if(T.tag===5&&R!==null&&(T=R,A!==null&&(R=_o(_,A),R!=null&&N.push(Ao(_,R,T)))),P)break;_=_.return}0<N.length&&(g=new k(g,C,null,n,f),m.push({event:g,listeners:N}))}}if(!(e&7)){e:{if(g=t==="mouseover"||t==="pointerover",k=t==="mouseout"||t==="pointerout",g&&n!==Ld&&(C=n.relatedTarget||n.fromElement)&&(Hr(C)||C[Mn]))break e;if((k||g)&&(g=f.window===f?f:(g=f.ownerDocument)?g.defaultView||g.parentWindow:window,k?(C=n.relatedTarget||n.toElement,k=c,C=C?Hr(C):null,C!==null&&(P=hs(C),C!==P||C.tag!==5&&C.tag!==6)&&(C=null)):(k=null,C=c),k!==C)){if(N=og,R="onMouseLeave",A="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(N=lg,R="onPointerLeave",A="onPointerEnter",_="pointer"),P=k==null?g:js(k),T=C==null?g:js(C),g=new N(R,_+"leave",k,n,f),g.target=P,g.relatedTarget=T,R=null,Hr(f)===c&&(N=new N(A,_+"enter",C,n,f),N.target=T,N.relatedTarget=P,R=N),P=R,k&&C)t:{for(N=k,A=C,_=0,T=N;T;T=As(T))_++;for(T=0,R=A;R;R=As(R))T++;for(;0<_-T;)N=As(N),_--;for(;0<T-_;)A=As(A),T--;for(;_--;){if(N===A||A!==null&&N===A.alternate)break t;N=As(N),A=As(A)}N=null}else N=null;k!==null&&_g(m,g,k,N,!1),C!==null&&P!==null&&_g(m,P,C,N,!0)}}e:{if(g=c?js(c):window,k=g.nodeName&&g.nodeName.toLowerCase(),k==="select"||k==="input"&&g.type==="file")var L=dI;else if(dg(g))if(L0)L=mI;else{L=fI;var V=hI}else(k=g.nodeName)&&k.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(L=pI);if(L&&(L=L(t,c))){j0(m,L,n,f);break e}V&&V(t,g,c),t==="focusout"&&(V=g._wrapperState)&&V.controlled&&g.type==="number"&&Nd(g,"number",g.value)}switch(V=c?js(c):window,t){case"focusin":(dg(V)||V.contentEditable==="true")&&(Ds=V,$d=c,oo=null);break;case"focusout":oo=$d=Ds=null;break;case"mousedown":Hd=!0;break;case"contextmenu":case"mouseup":case"dragend":Hd=!1,gg(m,n,f);break;case"selectionchange":if(vI)break;case"keydown":case"keyup":gg(m,n,f)}var w;if(cf)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else Ps?D0(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(P0&&n.locale!=="ko"&&(Ps||y!=="onCompositionStart"?y==="onCompositionEnd"&&Ps&&(w=N0()):(cr=f,af="value"in cr?cr.value:cr.textContent,Ps=!0)),V=bl(c,y),0<V.length&&(y=new ag(y,t,null,n,f),m.push({event:y,listeners:V}),w?y.data=w:(w=O0(n),w!==null&&(y.data=w)))),(w=oI?aI(t,n):lI(t,n))&&(c=bl(c,"onBeforeInput"),0<c.length&&(f=new ag("onBeforeInput","beforeinput",null,n,f),m.push({event:f,listeners:c}),f.data=w))}q0(m,e)})}function Ao(t,e,n){return{instance:t,listener:e,currentTarget:n}}function bl(t,e){for(var n=e+"Capture",r=[];t!==null;){var s=t,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=_o(t,n),i!=null&&r.unshift(Ao(t,i,s)),i=_o(t,e),i!=null&&r.push(Ao(t,i,s))),t=t.return}return r}function As(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function _g(t,e,n,r,s){for(var i=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,c=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&c!==null&&(l=c,s?(u=_o(n,i),u!=null&&o.unshift(Ao(n,u,l))):s||(u=_o(n,i),u!=null&&o.push(Ao(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var EI=/\r\n?/g,TI=/\u0000|\uFFFD/g;function wg(t){return(typeof t=="string"?t:""+t).replace(EI,`
`).replace(TI,"")}function za(t,e,n){if(e=wg(e),wg(t)!==e&&n)throw Error(B(425))}function Rl(){}var Wd=null,qd=null;function Kd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Gd=typeof setTimeout=="function"?setTimeout:void 0,II=typeof clearTimeout=="function"?clearTimeout:void 0,xg=typeof Promise=="function"?Promise:void 0,SI=typeof queueMicrotask=="function"?queueMicrotask:typeof xg<"u"?function(t){return xg.resolve(null).then(t).catch(AI)}:Gd;function AI(t){setTimeout(function(){throw t})}function Qc(t,e){var n=e,r=0;do{var s=n.nextSibling;if(t.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){t.removeChild(s),Eo(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);Eo(e)}function vr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Eg(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var yi=Math.random().toString(36).slice(2),dn="__reactFiber$"+yi,ko="__reactProps$"+yi,Mn="__reactContainer$"+yi,Qd="__reactEvents$"+yi,kI="__reactListeners$"+yi,CI="__reactHandles$"+yi;function Hr(t){var e=t[dn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Mn]||n[dn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Eg(t);t!==null;){if(n=t[dn])return n;t=Eg(t)}return e}t=n,n=t.parentNode}return null}function Yo(t){return t=t[dn]||t[Mn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function js(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(B(33))}function xu(t){return t[ko]||null}var Yd=[],Ls=-1;function Pr(t){return{current:t}}function we(t){0>Ls||(t.current=Yd[Ls],Yd[Ls]=null,Ls--)}function ge(t,e){Ls++,Yd[Ls]=t.current,t.current=e}var kr={},ut=Pr(kr),It=Pr(!1),Jr=kr;function ei(t,e){var n=t.type.contextTypes;if(!n)return kr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=e[i];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=s),s}function St(t){return t=t.childContextTypes,t!=null}function Nl(){we(It),we(ut)}function Tg(t,e,n){if(ut.current!==kr)throw Error(B(168));ge(ut,e),ge(It,n)}function G0(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in e))throw Error(B(108,hT(t)||"Unknown",s));return Se({},n,r)}function Pl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||kr,Jr=ut.current,ge(ut,t),ge(It,It.current),!0}function Ig(t,e,n){var r=t.stateNode;if(!r)throw Error(B(169));n?(t=G0(t,e,Jr),r.__reactInternalMemoizedMergedChildContext=t,we(It),we(ut),ge(ut,t)):we(It),ge(It,n)}var kn=null,Eu=!1,Yc=!1;function Q0(t){kn===null?kn=[t]:kn.push(t)}function bI(t){Eu=!0,Q0(t)}function Dr(){if(!Yc&&kn!==null){Yc=!0;var t=0,e=he;try{var n=kn;for(he=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}kn=null,Eu=!1}catch(s){throw kn!==null&&(kn=kn.slice(t+1)),w0(nf,Dr),s}finally{he=e,Yc=!1}}return null}var Vs=[],Ms=0,Dl=null,Ol=0,Ut=[],Ft=0,Zr=null,Cn=1,bn="";function Br(t,e){Vs[Ms++]=Ol,Vs[Ms++]=Dl,Dl=t,Ol=e}function Y0(t,e,n){Ut[Ft++]=Cn,Ut[Ft++]=bn,Ut[Ft++]=Zr,Zr=t;var r=Cn;t=bn;var s=32-tn(r)-1;r&=~(1<<s),n+=1;var i=32-tn(e)+s;if(30<i){var o=s-s%5;i=(r&(1<<o)-1).toString(32),r>>=o,s-=o,Cn=1<<32-tn(e)+s|n<<s|r,bn=i+t}else Cn=1<<i|n<<s|r,bn=t}function hf(t){t.return!==null&&(Br(t,1),Y0(t,1,0))}function ff(t){for(;t===Dl;)Dl=Vs[--Ms],Vs[Ms]=null,Ol=Vs[--Ms],Vs[Ms]=null;for(;t===Zr;)Zr=Ut[--Ft],Ut[Ft]=null,bn=Ut[--Ft],Ut[Ft]=null,Cn=Ut[--Ft],Ut[Ft]=null}var jt=null,Dt=null,xe=!1,Zt=null;function X0(t,e){var n=Bt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Sg(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,jt=t,Dt=vr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,jt=t,Dt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Zr!==null?{id:Cn,overflow:bn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Bt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,jt=t,Dt=null,!0):!1;default:return!1}}function Xd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Jd(t){if(xe){var e=Dt;if(e){var n=e;if(!Sg(t,e)){if(Xd(t))throw Error(B(418));e=vr(n.nextSibling);var r=jt;e&&Sg(t,e)?X0(r,n):(t.flags=t.flags&-4097|2,xe=!1,jt=t)}}else{if(Xd(t))throw Error(B(418));t.flags=t.flags&-4097|2,xe=!1,jt=t}}}function Ag(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;jt=t}function $a(t){if(t!==jt)return!1;if(!xe)return Ag(t),xe=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Kd(t.type,t.memoizedProps)),e&&(e=Dt)){if(Xd(t))throw J0(),Error(B(418));for(;e;)X0(t,e),e=vr(e.nextSibling)}if(Ag(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(B(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Dt=vr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Dt=null}}else Dt=jt?vr(t.stateNode.nextSibling):null;return!0}function J0(){for(var t=Dt;t;)t=vr(t.nextSibling)}function ti(){Dt=jt=null,xe=!1}function pf(t){Zt===null?Zt=[t]:Zt.push(t)}var RI=qn.ReactCurrentBatchConfig;function zi(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(B(309));var r=n.stateNode}if(!r)throw Error(B(147,t));var s=r,i=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(o){var l=s.refs;o===null?delete l[i]:l[i]=o},e._stringRef=i,e)}if(typeof t!="string")throw Error(B(284));if(!n._owner)throw Error(B(290,t))}return t}function Ha(t,e){throw t=Object.prototype.toString.call(e),Error(B(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function kg(t){var e=t._init;return e(t._payload)}function Z0(t){function e(A,_){if(t){var T=A.deletions;T===null?(A.deletions=[_],A.flags|=16):T.push(_)}}function n(A,_){if(!t)return null;for(;_!==null;)e(A,_),_=_.sibling;return null}function r(A,_){for(A=new Map;_!==null;)_.key!==null?A.set(_.key,_):A.set(_.index,_),_=_.sibling;return A}function s(A,_){return A=Er(A,_),A.index=0,A.sibling=null,A}function i(A,_,T){return A.index=T,t?(T=A.alternate,T!==null?(T=T.index,T<_?(A.flags|=2,_):T):(A.flags|=2,_)):(A.flags|=1048576,_)}function o(A){return t&&A.alternate===null&&(A.flags|=2),A}function l(A,_,T,R){return _===null||_.tag!==6?(_=rd(T,A.mode,R),_.return=A,_):(_=s(_,T),_.return=A,_)}function u(A,_,T,R){var L=T.type;return L===Ns?f(A,_,T.props.children,R,T.key):_!==null&&(_.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===nr&&kg(L)===_.type)?(R=s(_,T.props),R.ref=zi(A,_,T),R.return=A,R):(R=hl(T.type,T.key,T.props,null,A.mode,R),R.ref=zi(A,_,T),R.return=A,R)}function c(A,_,T,R){return _===null||_.tag!==4||_.stateNode.containerInfo!==T.containerInfo||_.stateNode.implementation!==T.implementation?(_=sd(T,A.mode,R),_.return=A,_):(_=s(_,T.children||[]),_.return=A,_)}function f(A,_,T,R,L){return _===null||_.tag!==7?(_=Yr(T,A.mode,R,L),_.return=A,_):(_=s(_,T),_.return=A,_)}function m(A,_,T){if(typeof _=="string"&&_!==""||typeof _=="number")return _=rd(""+_,A.mode,T),_.return=A,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Da:return T=hl(_.type,_.key,_.props,null,A.mode,T),T.ref=zi(A,null,_),T.return=A,T;case Rs:return _=sd(_,A.mode,T),_.return=A,_;case nr:var R=_._init;return m(A,R(_._payload),T)}if(Ki(_)||Vi(_))return _=Yr(_,A.mode,T,null),_.return=A,_;Ha(A,_)}return null}function g(A,_,T,R){var L=_!==null?_.key:null;if(typeof T=="string"&&T!==""||typeof T=="number")return L!==null?null:l(A,_,""+T,R);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case Da:return T.key===L?u(A,_,T,R):null;case Rs:return T.key===L?c(A,_,T,R):null;case nr:return L=T._init,g(A,_,L(T._payload),R)}if(Ki(T)||Vi(T))return L!==null?null:f(A,_,T,R,null);Ha(A,T)}return null}function k(A,_,T,R,L){if(typeof R=="string"&&R!==""||typeof R=="number")return A=A.get(T)||null,l(_,A,""+R,L);if(typeof R=="object"&&R!==null){switch(R.$$typeof){case Da:return A=A.get(R.key===null?T:R.key)||null,u(_,A,R,L);case Rs:return A=A.get(R.key===null?T:R.key)||null,c(_,A,R,L);case nr:var V=R._init;return k(A,_,T,V(R._payload),L)}if(Ki(R)||Vi(R))return A=A.get(T)||null,f(_,A,R,L,null);Ha(_,R)}return null}function C(A,_,T,R){for(var L=null,V=null,w=_,y=_=0,x=null;w!==null&&y<T.length;y++){w.index>y?(x=w,w=null):x=w.sibling;var S=g(A,w,T[y],R);if(S===null){w===null&&(w=x);break}t&&w&&S.alternate===null&&e(A,w),_=i(S,_,y),V===null?L=S:V.sibling=S,V=S,w=x}if(y===T.length)return n(A,w),xe&&Br(A,y),L;if(w===null){for(;y<T.length;y++)w=m(A,T[y],R),w!==null&&(_=i(w,_,y),V===null?L=w:V.sibling=w,V=w);return xe&&Br(A,y),L}for(w=r(A,w);y<T.length;y++)x=k(w,A,y,T[y],R),x!==null&&(t&&x.alternate!==null&&w.delete(x.key===null?y:x.key),_=i(x,_,y),V===null?L=x:V.sibling=x,V=x);return t&&w.forEach(function(I){return e(A,I)}),xe&&Br(A,y),L}function N(A,_,T,R){var L=Vi(T);if(typeof L!="function")throw Error(B(150));if(T=L.call(T),T==null)throw Error(B(151));for(var V=L=null,w=_,y=_=0,x=null,S=T.next();w!==null&&!S.done;y++,S=T.next()){w.index>y?(x=w,w=null):x=w.sibling;var I=g(A,w,S.value,R);if(I===null){w===null&&(w=x);break}t&&w&&I.alternate===null&&e(A,w),_=i(I,_,y),V===null?L=I:V.sibling=I,V=I,w=x}if(S.done)return n(A,w),xe&&Br(A,y),L;if(w===null){for(;!S.done;y++,S=T.next())S=m(A,S.value,R),S!==null&&(_=i(S,_,y),V===null?L=S:V.sibling=S,V=S);return xe&&Br(A,y),L}for(w=r(A,w);!S.done;y++,S=T.next())S=k(w,A,y,S.value,R),S!==null&&(t&&S.alternate!==null&&w.delete(S.key===null?y:S.key),_=i(S,_,y),V===null?L=S:V.sibling=S,V=S);return t&&w.forEach(function(b){return e(A,b)}),xe&&Br(A,y),L}function P(A,_,T,R){if(typeof T=="object"&&T!==null&&T.type===Ns&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case Da:e:{for(var L=T.key,V=_;V!==null;){if(V.key===L){if(L=T.type,L===Ns){if(V.tag===7){n(A,V.sibling),_=s(V,T.props.children),_.return=A,A=_;break e}}else if(V.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===nr&&kg(L)===V.type){n(A,V.sibling),_=s(V,T.props),_.ref=zi(A,V,T),_.return=A,A=_;break e}n(A,V);break}else e(A,V);V=V.sibling}T.type===Ns?(_=Yr(T.props.children,A.mode,R,T.key),_.return=A,A=_):(R=hl(T.type,T.key,T.props,null,A.mode,R),R.ref=zi(A,_,T),R.return=A,A=R)}return o(A);case Rs:e:{for(V=T.key;_!==null;){if(_.key===V)if(_.tag===4&&_.stateNode.containerInfo===T.containerInfo&&_.stateNode.implementation===T.implementation){n(A,_.sibling),_=s(_,T.children||[]),_.return=A,A=_;break e}else{n(A,_);break}else e(A,_);_=_.sibling}_=sd(T,A.mode,R),_.return=A,A=_}return o(A);case nr:return V=T._init,P(A,_,V(T._payload),R)}if(Ki(T))return C(A,_,T,R);if(Vi(T))return N(A,_,T,R);Ha(A,T)}return typeof T=="string"&&T!==""||typeof T=="number"?(T=""+T,_!==null&&_.tag===6?(n(A,_.sibling),_=s(_,T),_.return=A,A=_):(n(A,_),_=rd(T,A.mode,R),_.return=A,A=_),o(A)):n(A,_)}return P}var ni=Z0(!0),e_=Z0(!1),jl=Pr(null),Ll=null,Us=null,mf=null;function gf(){mf=Us=Ll=null}function yf(t){var e=jl.current;we(jl),t._currentValue=e}function Zd(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Ks(t,e){Ll=t,mf=Us=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Tt=!0),t.firstContext=null)}function Wt(t){var e=t._currentValue;if(mf!==t)if(t={context:t,memoizedValue:e,next:null},Us===null){if(Ll===null)throw Error(B(308));Us=t,Ll.dependencies={lanes:0,firstContext:t}}else Us=Us.next=t;return e}var Wr=null;function vf(t){Wr===null?Wr=[t]:Wr.push(t)}function t_(t,e,n,r){var s=e.interleaved;return s===null?(n.next=n,vf(e)):(n.next=s.next,s.next=n),e.interleaved=n,Un(t,r)}function Un(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var rr=!1;function _f(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function n_(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Dn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function _r(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,ue&2){var s=r.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),r.pending=e,Un(t,n)}return s=r.interleaved,s===null?(e.next=e,vf(r)):(e.next=s.next,s.next=e),r.interleaved=e,Un(t,n)}function ol(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,rf(t,n)}}function Cg(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?s=i=e:i=i.next=e}else s=i=e;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Vl(t,e,n,r){var s=t.updateQueue;rr=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var u=l,c=u.next;u.next=null,o===null?i=c:o.next=c,o=u;var f=t.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==o&&(l===null?f.firstBaseUpdate=c:l.next=c,f.lastBaseUpdate=u))}if(i!==null){var m=s.baseState;o=0,f=c=u=null,l=i;do{var g=l.lane,k=l.eventTime;if((r&g)===g){f!==null&&(f=f.next={eventTime:k,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var C=t,N=l;switch(g=e,k=n,N.tag){case 1:if(C=N.payload,typeof C=="function"){m=C.call(k,m,g);break e}m=C;break e;case 3:C.flags=C.flags&-65537|128;case 0:if(C=N.payload,g=typeof C=="function"?C.call(k,m,g):C,g==null)break e;m=Se({},m,g);break e;case 2:rr=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,g=s.effects,g===null?s.effects=[l]:g.push(l))}else k={eventTime:k,lane:g,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(c=f=k,u=m):f=f.next=k,o|=g;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;g=l,l=g.next,g.next=null,s.lastBaseUpdate=g,s.shared.pending=null}}while(!0);if(f===null&&(u=m),s.baseState=u,s.firstBaseUpdate=c,s.lastBaseUpdate=f,e=s.shared.interleaved,e!==null){s=e;do o|=s.lane,s=s.next;while(s!==e)}else i===null&&(s.shared.lanes=0);ts|=o,t.lanes=o,t.memoizedState=m}}function bg(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(B(191,s));s.call(r)}}}var Xo={},pn=Pr(Xo),Co=Pr(Xo),bo=Pr(Xo);function qr(t){if(t===Xo)throw Error(B(174));return t}function wf(t,e){switch(ge(bo,e),ge(Co,t),ge(pn,Xo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Dd(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Dd(e,t)}we(pn),ge(pn,e)}function ri(){we(pn),we(Co),we(bo)}function r_(t){qr(bo.current);var e=qr(pn.current),n=Dd(e,t.type);e!==n&&(ge(Co,t),ge(pn,n))}function xf(t){Co.current===t&&(we(pn),we(Co))}var Te=Pr(0);function Ml(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Xc=[];function Ef(){for(var t=0;t<Xc.length;t++)Xc[t]._workInProgressVersionPrimary=null;Xc.length=0}var al=qn.ReactCurrentDispatcher,Jc=qn.ReactCurrentBatchConfig,es=0,Ie=null,Me=null,ze=null,Ul=!1,ao=!1,Ro=0,NI=0;function nt(){throw Error(B(321))}function Tf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!rn(t[n],e[n]))return!1;return!0}function If(t,e,n,r,s,i){if(es=i,Ie=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,al.current=t===null||t.memoizedState===null?jI:LI,t=n(r,s),ao){i=0;do{if(ao=!1,Ro=0,25<=i)throw Error(B(301));i+=1,ze=Me=null,e.updateQueue=null,al.current=VI,t=n(r,s)}while(ao)}if(al.current=Fl,e=Me!==null&&Me.next!==null,es=0,ze=Me=Ie=null,Ul=!1,e)throw Error(B(300));return t}function Sf(){var t=Ro!==0;return Ro=0,t}function cn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ze===null?Ie.memoizedState=ze=t:ze=ze.next=t,ze}function qt(){if(Me===null){var t=Ie.alternate;t=t!==null?t.memoizedState:null}else t=Me.next;var e=ze===null?Ie.memoizedState:ze.next;if(e!==null)ze=e,Me=t;else{if(t===null)throw Error(B(310));Me=t,t={memoizedState:Me.memoizedState,baseState:Me.baseState,baseQueue:Me.baseQueue,queue:Me.queue,next:null},ze===null?Ie.memoizedState=ze=t:ze=ze.next=t}return ze}function No(t,e){return typeof e=="function"?e(t):e}function Zc(t){var e=qt(),n=e.queue;if(n===null)throw Error(B(311));n.lastRenderedReducer=t;var r=Me,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var l=o=null,u=null,c=i;do{var f=c.lane;if((es&f)===f)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:t(r,c.action);else{var m={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(l=u=m,o=r):u=u.next=m,Ie.lanes|=f,ts|=f}c=c.next}while(c!==null&&c!==i);u===null?o=r:u.next=l,rn(r,e.memoizedState)||(Tt=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){s=t;do i=s.lane,Ie.lanes|=i,ts|=i,s=s.next;while(s!==t)}else s===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function ed(t){var e=qt(),n=e.queue;if(n===null)throw Error(B(311));n.lastRenderedReducer=t;var r=n.dispatch,s=n.pending,i=e.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do i=t(i,o.action),o=o.next;while(o!==s);rn(i,e.memoizedState)||(Tt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,r]}function s_(){}function i_(t,e){var n=Ie,r=qt(),s=e(),i=!rn(r.memoizedState,s);if(i&&(r.memoizedState=s,Tt=!0),r=r.queue,Af(l_.bind(null,n,r,t),[t]),r.getSnapshot!==e||i||ze!==null&&ze.memoizedState.tag&1){if(n.flags|=2048,Po(9,a_.bind(null,n,r,s,e),void 0,null),$e===null)throw Error(B(349));es&30||o_(n,e,s)}return s}function o_(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Ie.updateQueue,e===null?(e={lastEffect:null,stores:null},Ie.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function a_(t,e,n,r){e.value=n,e.getSnapshot=r,u_(e)&&c_(t)}function l_(t,e,n){return n(function(){u_(e)&&c_(t)})}function u_(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!rn(t,n)}catch{return!0}}function c_(t){var e=Un(t,1);e!==null&&nn(e,t,1,-1)}function Rg(t){var e=cn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:No,lastRenderedState:t},e.queue=t,t=t.dispatch=OI.bind(null,Ie,t),[e.memoizedState,t]}function Po(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=Ie.updateQueue,e===null?(e={lastEffect:null,stores:null},Ie.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function d_(){return qt().memoizedState}function ll(t,e,n,r){var s=cn();Ie.flags|=t,s.memoizedState=Po(1|e,n,void 0,r===void 0?null:r)}function Tu(t,e,n,r){var s=qt();r=r===void 0?null:r;var i=void 0;if(Me!==null){var o=Me.memoizedState;if(i=o.destroy,r!==null&&Tf(r,o.deps)){s.memoizedState=Po(e,n,i,r);return}}Ie.flags|=t,s.memoizedState=Po(1|e,n,i,r)}function Ng(t,e){return ll(8390656,8,t,e)}function Af(t,e){return Tu(2048,8,t,e)}function h_(t,e){return Tu(4,2,t,e)}function f_(t,e){return Tu(4,4,t,e)}function p_(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function m_(t,e,n){return n=n!=null?n.concat([t]):null,Tu(4,4,p_.bind(null,e,t),n)}function kf(){}function g_(t,e){var n=qt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Tf(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function y_(t,e){var n=qt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Tf(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function v_(t,e,n){return es&21?(rn(n,e)||(n=T0(),Ie.lanes|=n,ts|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Tt=!0),t.memoizedState=n)}function PI(t,e){var n=he;he=n!==0&&4>n?n:4,t(!0);var r=Jc.transition;Jc.transition={};try{t(!1),e()}finally{he=n,Jc.transition=r}}function __(){return qt().memoizedState}function DI(t,e,n){var r=xr(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},w_(t))x_(e,n);else if(n=t_(t,e,n,r),n!==null){var s=mt();nn(n,t,r,s),E_(n,e,r)}}function OI(t,e,n){var r=xr(t),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(w_(t))x_(e,s);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,l=i(o,n);if(s.hasEagerState=!0,s.eagerState=l,rn(l,o)){var u=e.interleaved;u===null?(s.next=s,vf(e)):(s.next=u.next,u.next=s),e.interleaved=s;return}}catch{}finally{}n=t_(t,e,s,r),n!==null&&(s=mt(),nn(n,t,r,s),E_(n,e,r))}}function w_(t){var e=t.alternate;return t===Ie||e!==null&&e===Ie}function x_(t,e){ao=Ul=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function E_(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,rf(t,n)}}var Fl={readContext:Wt,useCallback:nt,useContext:nt,useEffect:nt,useImperativeHandle:nt,useInsertionEffect:nt,useLayoutEffect:nt,useMemo:nt,useReducer:nt,useRef:nt,useState:nt,useDebugValue:nt,useDeferredValue:nt,useTransition:nt,useMutableSource:nt,useSyncExternalStore:nt,useId:nt,unstable_isNewReconciler:!1},jI={readContext:Wt,useCallback:function(t,e){return cn().memoizedState=[t,e===void 0?null:e],t},useContext:Wt,useEffect:Ng,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,ll(4194308,4,p_.bind(null,e,t),n)},useLayoutEffect:function(t,e){return ll(4194308,4,t,e)},useInsertionEffect:function(t,e){return ll(4,2,t,e)},useMemo:function(t,e){var n=cn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=cn();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=DI.bind(null,Ie,t),[r.memoizedState,t]},useRef:function(t){var e=cn();return t={current:t},e.memoizedState=t},useState:Rg,useDebugValue:kf,useDeferredValue:function(t){return cn().memoizedState=t},useTransition:function(){var t=Rg(!1),e=t[0];return t=PI.bind(null,t[1]),cn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=Ie,s=cn();if(xe){if(n===void 0)throw Error(B(407));n=n()}else{if(n=e(),$e===null)throw Error(B(349));es&30||o_(r,e,n)}s.memoizedState=n;var i={value:n,getSnapshot:e};return s.queue=i,Ng(l_.bind(null,r,i,t),[t]),r.flags|=2048,Po(9,a_.bind(null,r,i,n,e),void 0,null),n},useId:function(){var t=cn(),e=$e.identifierPrefix;if(xe){var n=bn,r=Cn;n=(r&~(1<<32-tn(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Ro++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=NI++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},LI={readContext:Wt,useCallback:g_,useContext:Wt,useEffect:Af,useImperativeHandle:m_,useInsertionEffect:h_,useLayoutEffect:f_,useMemo:y_,useReducer:Zc,useRef:d_,useState:function(){return Zc(No)},useDebugValue:kf,useDeferredValue:function(t){var e=qt();return v_(e,Me.memoizedState,t)},useTransition:function(){var t=Zc(No)[0],e=qt().memoizedState;return[t,e]},useMutableSource:s_,useSyncExternalStore:i_,useId:__,unstable_isNewReconciler:!1},VI={readContext:Wt,useCallback:g_,useContext:Wt,useEffect:Af,useImperativeHandle:m_,useInsertionEffect:h_,useLayoutEffect:f_,useMemo:y_,useReducer:ed,useRef:d_,useState:function(){return ed(No)},useDebugValue:kf,useDeferredValue:function(t){var e=qt();return Me===null?e.memoizedState=t:v_(e,Me.memoizedState,t)},useTransition:function(){var t=ed(No)[0],e=qt().memoizedState;return[t,e]},useMutableSource:s_,useSyncExternalStore:i_,useId:__,unstable_isNewReconciler:!1};function Xt(t,e){if(t&&t.defaultProps){e=Se({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function eh(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Se({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Iu={isMounted:function(t){return(t=t._reactInternals)?hs(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=mt(),s=xr(t),i=Dn(r,s);i.payload=e,n!=null&&(i.callback=n),e=_r(t,i,s),e!==null&&(nn(e,t,s,r),ol(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=mt(),s=xr(t),i=Dn(r,s);i.tag=1,i.payload=e,n!=null&&(i.callback=n),e=_r(t,i,s),e!==null&&(nn(e,t,s,r),ol(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=mt(),r=xr(t),s=Dn(n,r);s.tag=2,e!=null&&(s.callback=e),e=_r(t,s,r),e!==null&&(nn(e,t,r,n),ol(e,t,r))}};function Pg(t,e,n,r,s,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,i,o):e.prototype&&e.prototype.isPureReactComponent?!Io(n,r)||!Io(s,i):!0}function T_(t,e,n){var r=!1,s=kr,i=e.contextType;return typeof i=="object"&&i!==null?i=Wt(i):(s=St(e)?Jr:ut.current,r=e.contextTypes,i=(r=r!=null)?ei(t,s):kr),e=new e(n,i),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Iu,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=s,t.__reactInternalMemoizedMaskedChildContext=i),e}function Dg(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Iu.enqueueReplaceState(e,e.state,null)}function th(t,e,n,r){var s=t.stateNode;s.props=n,s.state=t.memoizedState,s.refs={},_f(t);var i=e.contextType;typeof i=="object"&&i!==null?s.context=Wt(i):(i=St(e)?Jr:ut.current,s.context=ei(t,i)),s.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(eh(t,e,i,n),s.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(e=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),e!==s.state&&Iu.enqueueReplaceState(s,s.state,null),Vl(t,n,s,r),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308)}function si(t,e){try{var n="",r=e;do n+=dT(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:t,source:e,stack:s,digest:null}}function td(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function nh(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var MI=typeof WeakMap=="function"?WeakMap:Map;function I_(t,e,n){n=Dn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){zl||(zl=!0,hh=r),nh(t,e)},n}function S_(t,e,n){n=Dn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var s=e.value;n.payload=function(){return r(s)},n.callback=function(){nh(t,e)}}var i=t.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){nh(t,e),typeof r!="function"&&(wr===null?wr=new Set([this]):wr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Og(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new MI;var s=new Set;r.set(e,s)}else s=r.get(e),s===void 0&&(s=new Set,r.set(e,s));s.has(n)||(s.add(n),t=JI.bind(null,t,e,n),e.then(t,t))}function jg(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Lg(t,e,n,r,s){return t.mode&1?(t.flags|=65536,t.lanes=s,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Dn(-1,1),e.tag=2,_r(n,e,1))),n.lanes|=1),t)}var UI=qn.ReactCurrentOwner,Tt=!1;function pt(t,e,n,r){e.child=t===null?e_(e,null,n,r):ni(e,t.child,n,r)}function Vg(t,e,n,r,s){n=n.render;var i=e.ref;return Ks(e,s),r=If(t,e,n,r,i,s),n=Sf(),t!==null&&!Tt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Fn(t,e,s)):(xe&&n&&hf(e),e.flags|=1,pt(t,e,r,s),e.child)}function Mg(t,e,n,r,s){if(t===null){var i=n.type;return typeof i=="function"&&!jf(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=i,A_(t,e,i,r,s)):(t=hl(n.type,null,r,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!(t.lanes&s)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:Io,n(o,r)&&t.ref===e.ref)return Fn(t,e,s)}return e.flags|=1,t=Er(i,r),t.ref=e.ref,t.return=e,e.child=t}function A_(t,e,n,r,s){if(t!==null){var i=t.memoizedProps;if(Io(i,r)&&t.ref===e.ref)if(Tt=!1,e.pendingProps=r=i,(t.lanes&s)!==0)t.flags&131072&&(Tt=!0);else return e.lanes=t.lanes,Fn(t,e,s)}return rh(t,e,n,r,s)}function k_(t,e,n){var r=e.pendingProps,s=r.children,i=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ge(Bs,Pt),Pt|=n;else{if(!(n&1073741824))return t=i!==null?i.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ge(Bs,Pt),Pt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,ge(Bs,Pt),Pt|=r}else i!==null?(r=i.baseLanes|n,e.memoizedState=null):r=n,ge(Bs,Pt),Pt|=r;return pt(t,e,s,n),e.child}function C_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function rh(t,e,n,r,s){var i=St(n)?Jr:ut.current;return i=ei(e,i),Ks(e,s),n=If(t,e,n,r,i,s),r=Sf(),t!==null&&!Tt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Fn(t,e,s)):(xe&&r&&hf(e),e.flags|=1,pt(t,e,n,s),e.child)}function Ug(t,e,n,r,s){if(St(n)){var i=!0;Pl(e)}else i=!1;if(Ks(e,s),e.stateNode===null)ul(t,e),T_(e,n,r),th(e,n,r,s),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Wt(c):(c=St(n)?Jr:ut.current,c=ei(e,c));var f=n.getDerivedStateFromProps,m=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==c)&&Dg(e,o,r,c),rr=!1;var g=e.memoizedState;o.state=g,Vl(e,r,o,s),u=e.memoizedState,l!==r||g!==u||It.current||rr?(typeof f=="function"&&(eh(e,n,f,r),u=e.memoizedState),(l=rr||Pg(e,n,l,r,g,u,c))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=c,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,n_(t,e),l=e.memoizedProps,c=e.type===e.elementType?l:Xt(e.type,l),o.props=c,m=e.pendingProps,g=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=Wt(u):(u=St(n)?Jr:ut.current,u=ei(e,u));var k=n.getDerivedStateFromProps;(f=typeof k=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==m||g!==u)&&Dg(e,o,r,u),rr=!1,g=e.memoizedState,o.state=g,Vl(e,r,o,s);var C=e.memoizedState;l!==m||g!==C||It.current||rr?(typeof k=="function"&&(eh(e,n,k,r),C=e.memoizedState),(c=rr||Pg(e,n,c,r,g,C,u)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,C,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,C,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=C),o.props=r,o.state=C,o.context=u,r=c):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),r=!1)}return sh(t,e,n,r,i,s)}function sh(t,e,n,r,s,i){C_(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return s&&Ig(e,n,!1),Fn(t,e,i);r=e.stateNode,UI.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=ni(e,t.child,null,i),e.child=ni(e,null,l,i)):pt(t,e,l,i),e.memoizedState=r.state,s&&Ig(e,n,!0),e.child}function b_(t){var e=t.stateNode;e.pendingContext?Tg(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Tg(t,e.context,!1),wf(t,e.containerInfo)}function Fg(t,e,n,r,s){return ti(),pf(s),e.flags|=256,pt(t,e,n,r),e.child}var ih={dehydrated:null,treeContext:null,retryLane:0};function oh(t){return{baseLanes:t,cachePool:null,transitions:null}}function R_(t,e,n){var r=e.pendingProps,s=Te.current,i=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(s&2)!==0),l?(i=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(s|=1),ge(Te,s&1),t===null)return Jd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,i?(r=e.mode,i=e.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=ku(o,r,0,null),t=Yr(t,r,n,null),i.return=e,t.return=e,i.sibling=t,e.child=i,e.child.memoizedState=oh(n),e.memoizedState=ih,t):Cf(e,o));if(s=t.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return FI(t,e,o,r,l,s,n);if(i){i=r.fallback,o=e.mode,s=t.child,l=s.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==s?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=Er(s,u),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=Er(l,i):(i=Yr(i,o,n,null),i.flags|=2),i.return=e,r.return=e,r.sibling=i,e.child=r,r=i,i=e.child,o=t.child.memoizedState,o=o===null?oh(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=t.childLanes&~n,e.memoizedState=ih,r}return i=t.child,t=i.sibling,r=Er(i,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function Cf(t,e){return e=ku({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Wa(t,e,n,r){return r!==null&&pf(r),ni(e,t.child,null,n),t=Cf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function FI(t,e,n,r,s,i,o){if(n)return e.flags&256?(e.flags&=-257,r=td(Error(B(422))),Wa(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(i=r.fallback,s=e.mode,r=ku({mode:"visible",children:r.children},s,0,null),i=Yr(i,s,o,null),i.flags|=2,r.return=e,i.return=e,r.sibling=i,e.child=r,e.mode&1&&ni(e,t.child,null,o),e.child.memoizedState=oh(o),e.memoizedState=ih,i);if(!(e.mode&1))return Wa(t,e,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(B(419)),r=td(i,r,void 0),Wa(t,e,o,r)}if(l=(o&t.childLanes)!==0,Tt||l){if(r=$e,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,Un(t,s),nn(r,t,s,-1))}return Of(),r=td(Error(B(421))),Wa(t,e,o,r)}return s.data==="$?"?(e.flags|=128,e.child=t.child,e=ZI.bind(null,t),s._reactRetry=e,null):(t=i.treeContext,Dt=vr(s.nextSibling),jt=e,xe=!0,Zt=null,t!==null&&(Ut[Ft++]=Cn,Ut[Ft++]=bn,Ut[Ft++]=Zr,Cn=t.id,bn=t.overflow,Zr=e),e=Cf(e,r.children),e.flags|=4096,e)}function Bg(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Zd(t.return,e,n)}function nd(t,e,n,r,s){var i=t.memoizedState;i===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function N_(t,e,n){var r=e.pendingProps,s=r.revealOrder,i=r.tail;if(pt(t,e,r.children,n),r=Te.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Bg(t,n,e);else if(t.tag===19)Bg(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(ge(Te,r),!(e.mode&1))e.memoizedState=null;else switch(s){case"forwards":for(n=e.child,s=null;n!==null;)t=n.alternate,t!==null&&Ml(t)===null&&(s=n),n=n.sibling;n=s,n===null?(s=e.child,e.child=null):(s=n.sibling,n.sibling=null),nd(e,!1,s,n,i);break;case"backwards":for(n=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&Ml(t)===null){e.child=s;break}t=s.sibling,s.sibling=n,n=s,s=t}nd(e,!0,n,null,i);break;case"together":nd(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function ul(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Fn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),ts|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(B(153));if(e.child!==null){for(t=e.child,n=Er(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Er(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function BI(t,e,n){switch(e.tag){case 3:b_(e),ti();break;case 5:r_(e);break;case 1:St(e.type)&&Pl(e);break;case 4:wf(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,s=e.memoizedProps.value;ge(jl,r._currentValue),r._currentValue=s;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(ge(Te,Te.current&1),e.flags|=128,null):n&e.child.childLanes?R_(t,e,n):(ge(Te,Te.current&1),t=Fn(t,e,n),t!==null?t.sibling:null);ge(Te,Te.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return N_(t,e,n);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),ge(Te,Te.current),r)break;return null;case 22:case 23:return e.lanes=0,k_(t,e,n)}return Fn(t,e,n)}var P_,ah,D_,O_;P_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};ah=function(){};D_=function(t,e,n,r){var s=t.memoizedProps;if(s!==r){t=e.stateNode,qr(pn.current);var i=null;switch(n){case"input":s=bd(t,s),r=bd(t,r),i=[];break;case"select":s=Se({},s,{value:void 0}),r=Se({},r,{value:void 0}),i=[];break;case"textarea":s=Pd(t,s),r=Pd(t,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=Rl)}Od(n,r);var o;n=null;for(c in s)if(!r.hasOwnProperty(c)&&s.hasOwnProperty(c)&&s[c]!=null)if(c==="style"){var l=s[c];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(yo.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in r){var u=r[c];if(l=s!=null?s[c]:void 0,r.hasOwnProperty(c)&&u!==l&&(u!=null||l!=null))if(c==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(i||(i=[]),i.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(i=i||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(yo.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&ve("scroll",t),i||l===u||(i=[])):(i=i||[]).push(c,u))}n&&(i=i||[]).push("style",n);var c=i;(e.updateQueue=c)&&(e.flags|=4)}};O_=function(t,e,n,r){n!==r&&(e.flags|=4)};function $i(t,e){if(!xe)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function rt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function zI(t,e,n){var r=e.pendingProps;switch(ff(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return rt(e),null;case 1:return St(e.type)&&Nl(),rt(e),null;case 3:return r=e.stateNode,ri(),we(It),we(ut),Ef(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&($a(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Zt!==null&&(mh(Zt),Zt=null))),ah(t,e),rt(e),null;case 5:xf(e);var s=qr(bo.current);if(n=e.type,t!==null&&e.stateNode!=null)D_(t,e,n,r,s),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(B(166));return rt(e),null}if(t=qr(pn.current),$a(e)){r=e.stateNode,n=e.type;var i=e.memoizedProps;switch(r[dn]=e,r[ko]=i,t=(e.mode&1)!==0,n){case"dialog":ve("cancel",r),ve("close",r);break;case"iframe":case"object":case"embed":ve("load",r);break;case"video":case"audio":for(s=0;s<Qi.length;s++)ve(Qi[s],r);break;case"source":ve("error",r);break;case"img":case"image":case"link":ve("error",r),ve("load",r);break;case"details":ve("toggle",r);break;case"input":Ym(r,i),ve("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},ve("invalid",r);break;case"textarea":Jm(r,i),ve("invalid",r)}Od(n,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&za(r.textContent,l,t),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&za(r.textContent,l,t),s=["children",""+l]):yo.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&ve("scroll",r)}switch(n){case"input":Oa(r),Xm(r,i,!0);break;case"textarea":Oa(r),Zm(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Rl)}r=s,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=l0(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[dn]=e,t[ko]=r,P_(t,e,!1,!1),e.stateNode=t;e:{switch(o=jd(n,r),n){case"dialog":ve("cancel",t),ve("close",t),s=r;break;case"iframe":case"object":case"embed":ve("load",t),s=r;break;case"video":case"audio":for(s=0;s<Qi.length;s++)ve(Qi[s],t);s=r;break;case"source":ve("error",t),s=r;break;case"img":case"image":case"link":ve("error",t),ve("load",t),s=r;break;case"details":ve("toggle",t),s=r;break;case"input":Ym(t,r),s=bd(t,r),ve("invalid",t);break;case"option":s=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},s=Se({},r,{value:void 0}),ve("invalid",t);break;case"textarea":Jm(t,r),s=Pd(t,r),ve("invalid",t);break;default:s=r}Od(n,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var u=l[i];i==="style"?d0(t,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&u0(t,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&vo(t,u):typeof u=="number"&&vo(t,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(yo.hasOwnProperty(i)?u!=null&&i==="onScroll"&&ve("scroll",t):u!=null&&Xh(t,i,u,o))}switch(n){case"input":Oa(t),Xm(t,r,!1);break;case"textarea":Oa(t),Zm(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Ar(r.value));break;case"select":t.multiple=!!r.multiple,i=r.value,i!=null?$s(t,!!r.multiple,i,!1):r.defaultValue!=null&&$s(t,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(t.onclick=Rl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return rt(e),null;case 6:if(t&&e.stateNode!=null)O_(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(B(166));if(n=qr(bo.current),qr(pn.current),$a(e)){if(r=e.stateNode,n=e.memoizedProps,r[dn]=e,(i=r.nodeValue!==n)&&(t=jt,t!==null))switch(t.tag){case 3:za(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&za(r.nodeValue,n,(t.mode&1)!==0)}i&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[dn]=e,e.stateNode=r}return rt(e),null;case 13:if(we(Te),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(xe&&Dt!==null&&e.mode&1&&!(e.flags&128))J0(),ti(),e.flags|=98560,i=!1;else if(i=$a(e),r!==null&&r.dehydrated!==null){if(t===null){if(!i)throw Error(B(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(B(317));i[dn]=e}else ti(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;rt(e),i=!1}else Zt!==null&&(mh(Zt),Zt=null),i=!0;if(!i)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||Te.current&1?Ue===0&&(Ue=3):Of())),e.updateQueue!==null&&(e.flags|=4),rt(e),null);case 4:return ri(),ah(t,e),t===null&&So(e.stateNode.containerInfo),rt(e),null;case 10:return yf(e.type._context),rt(e),null;case 17:return St(e.type)&&Nl(),rt(e),null;case 19:if(we(Te),i=e.memoizedState,i===null)return rt(e),null;if(r=(e.flags&128)!==0,o=i.rendering,o===null)if(r)$i(i,!1);else{if(Ue!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Ml(t),o!==null){for(e.flags|=128,$i(i,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)i=n,t=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=t,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,t=o.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ge(Te,Te.current&1|2),e.child}t=t.sibling}i.tail!==null&&Pe()>ii&&(e.flags|=128,r=!0,$i(i,!1),e.lanes=4194304)}else{if(!r)if(t=Ml(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),$i(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!xe)return rt(e),null}else 2*Pe()-i.renderingStartTime>ii&&n!==1073741824&&(e.flags|=128,r=!0,$i(i,!1),e.lanes=4194304);i.isBackwards?(o.sibling=e.child,e.child=o):(n=i.last,n!==null?n.sibling=o:e.child=o,i.last=o)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Pe(),e.sibling=null,n=Te.current,ge(Te,r?n&1|2:n&1),e):(rt(e),null);case 22:case 23:return Df(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Pt&1073741824&&(rt(e),e.subtreeFlags&6&&(e.flags|=8192)):rt(e),null;case 24:return null;case 25:return null}throw Error(B(156,e.tag))}function $I(t,e){switch(ff(e),e.tag){case 1:return St(e.type)&&Nl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ri(),we(It),we(ut),Ef(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return xf(e),null;case 13:if(we(Te),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(B(340));ti()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return we(Te),null;case 4:return ri(),null;case 10:return yf(e.type._context),null;case 22:case 23:return Df(),null;case 24:return null;default:return null}}var qa=!1,ot=!1,HI=typeof WeakSet=="function"?WeakSet:Set,H=null;function Fs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){be(t,e,r)}else n.current=null}function lh(t,e,n){try{n()}catch(r){be(t,e,r)}}var zg=!1;function WI(t,e){if(Wd=kl,t=U0(),df(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,c=0,f=0,m=t,g=null;t:for(;;){for(var k;m!==n||s!==0&&m.nodeType!==3||(l=o+s),m!==i||r!==0&&m.nodeType!==3||(u=o+r),m.nodeType===3&&(o+=m.nodeValue.length),(k=m.firstChild)!==null;)g=m,m=k;for(;;){if(m===t)break t;if(g===n&&++c===s&&(l=o),g===i&&++f===r&&(u=o),(k=m.nextSibling)!==null)break;m=g,g=m.parentNode}m=k}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(qd={focusedElem:t,selectionRange:n},kl=!1,H=e;H!==null;)if(e=H,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,H=t;else for(;H!==null;){e=H;try{var C=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(C!==null){var N=C.memoizedProps,P=C.memoizedState,A=e.stateNode,_=A.getSnapshotBeforeUpdate(e.elementType===e.type?N:Xt(e.type,N),P);A.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var T=e.stateNode.containerInfo;T.nodeType===1?T.textContent="":T.nodeType===9&&T.documentElement&&T.removeChild(T.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(B(163))}}catch(R){be(e,e.return,R)}if(t=e.sibling,t!==null){t.return=e.return,H=t;break}H=e.return}return C=zg,zg=!1,C}function lo(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&t)===t){var i=s.destroy;s.destroy=void 0,i!==void 0&&lh(e,n,i)}s=s.next}while(s!==r)}}function Su(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function uh(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function j_(t){var e=t.alternate;e!==null&&(t.alternate=null,j_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[dn],delete e[ko],delete e[Qd],delete e[kI],delete e[CI])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function L_(t){return t.tag===5||t.tag===3||t.tag===4}function $g(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||L_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function ch(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Rl));else if(r!==4&&(t=t.child,t!==null))for(ch(t,e,n),t=t.sibling;t!==null;)ch(t,e,n),t=t.sibling}function dh(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(dh(t,e,n),t=t.sibling;t!==null;)dh(t,e,n),t=t.sibling}var We=null,Jt=!1;function Zn(t,e,n){for(n=n.child;n!==null;)V_(t,e,n),n=n.sibling}function V_(t,e,n){if(fn&&typeof fn.onCommitFiberUnmount=="function")try{fn.onCommitFiberUnmount(yu,n)}catch{}switch(n.tag){case 5:ot||Fs(n,e);case 6:var r=We,s=Jt;We=null,Zn(t,e,n),We=r,Jt=s,We!==null&&(Jt?(t=We,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):We.removeChild(n.stateNode));break;case 18:We!==null&&(Jt?(t=We,n=n.stateNode,t.nodeType===8?Qc(t.parentNode,n):t.nodeType===1&&Qc(t,n),Eo(t)):Qc(We,n.stateNode));break;case 4:r=We,s=Jt,We=n.stateNode.containerInfo,Jt=!0,Zn(t,e,n),We=r,Jt=s;break;case 0:case 11:case 14:case 15:if(!ot&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&lh(n,e,o),s=s.next}while(s!==r)}Zn(t,e,n);break;case 1:if(!ot&&(Fs(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){be(n,e,l)}Zn(t,e,n);break;case 21:Zn(t,e,n);break;case 22:n.mode&1?(ot=(r=ot)||n.memoizedState!==null,Zn(t,e,n),ot=r):Zn(t,e,n);break;default:Zn(t,e,n)}}function Hg(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new HI),e.forEach(function(r){var s=e2.bind(null,t,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Yt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:We=l.stateNode,Jt=!1;break e;case 3:We=l.stateNode.containerInfo,Jt=!0;break e;case 4:We=l.stateNode.containerInfo,Jt=!0;break e}l=l.return}if(We===null)throw Error(B(160));V_(i,o,s),We=null,Jt=!1;var u=s.alternate;u!==null&&(u.return=null),s.return=null}catch(c){be(s,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)M_(e,t),e=e.sibling}function M_(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Yt(e,t),un(t),r&4){try{lo(3,t,t.return),Su(3,t)}catch(N){be(t,t.return,N)}try{lo(5,t,t.return)}catch(N){be(t,t.return,N)}}break;case 1:Yt(e,t),un(t),r&512&&n!==null&&Fs(n,n.return);break;case 5:if(Yt(e,t),un(t),r&512&&n!==null&&Fs(n,n.return),t.flags&32){var s=t.stateNode;try{vo(s,"")}catch(N){be(t,t.return,N)}}if(r&4&&(s=t.stateNode,s!=null)){var i=t.memoizedProps,o=n!==null?n.memoizedProps:i,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&o0(s,i),jd(l,o);var c=jd(l,i);for(o=0;o<u.length;o+=2){var f=u[o],m=u[o+1];f==="style"?d0(s,m):f==="dangerouslySetInnerHTML"?u0(s,m):f==="children"?vo(s,m):Xh(s,f,m,c)}switch(l){case"input":Rd(s,i);break;case"textarea":a0(s,i);break;case"select":var g=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var k=i.value;k!=null?$s(s,!!i.multiple,k,!1):g!==!!i.multiple&&(i.defaultValue!=null?$s(s,!!i.multiple,i.defaultValue,!0):$s(s,!!i.multiple,i.multiple?[]:"",!1))}s[ko]=i}catch(N){be(t,t.return,N)}}break;case 6:if(Yt(e,t),un(t),r&4){if(t.stateNode===null)throw Error(B(162));s=t.stateNode,i=t.memoizedProps;try{s.nodeValue=i}catch(N){be(t,t.return,N)}}break;case 3:if(Yt(e,t),un(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Eo(e.containerInfo)}catch(N){be(t,t.return,N)}break;case 4:Yt(e,t),un(t);break;case 13:Yt(e,t),un(t),s=t.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(Nf=Pe())),r&4&&Hg(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(ot=(c=ot)||f,Yt(e,t),ot=c):Yt(e,t),un(t),r&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!f&&t.mode&1)for(H=t,f=t.child;f!==null;){for(m=H=f;H!==null;){switch(g=H,k=g.child,g.tag){case 0:case 11:case 14:case 15:lo(4,g,g.return);break;case 1:Fs(g,g.return);var C=g.stateNode;if(typeof C.componentWillUnmount=="function"){r=g,n=g.return;try{e=r,C.props=e.memoizedProps,C.state=e.memoizedState,C.componentWillUnmount()}catch(N){be(r,n,N)}}break;case 5:Fs(g,g.return);break;case 22:if(g.memoizedState!==null){qg(m);continue}}k!==null?(k.return=g,H=k):qg(m)}f=f.sibling}e:for(f=null,m=t;;){if(m.tag===5){if(f===null){f=m;try{s=m.stateNode,c?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=m.stateNode,u=m.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=c0("display",o))}catch(N){be(t,t.return,N)}}}else if(m.tag===6){if(f===null)try{m.stateNode.nodeValue=c?"":m.memoizedProps}catch(N){be(t,t.return,N)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===t)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===t)break e;for(;m.sibling===null;){if(m.return===null||m.return===t)break e;f===m&&(f=null),m=m.return}f===m&&(f=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Yt(e,t),un(t),r&4&&Hg(t);break;case 21:break;default:Yt(e,t),un(t)}}function un(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(L_(n)){var r=n;break e}n=n.return}throw Error(B(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(vo(s,""),r.flags&=-33);var i=$g(t);dh(t,i,s);break;case 3:case 4:var o=r.stateNode.containerInfo,l=$g(t);ch(t,l,o);break;default:throw Error(B(161))}}catch(u){be(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function qI(t,e,n){H=t,U_(t)}function U_(t,e,n){for(var r=(t.mode&1)!==0;H!==null;){var s=H,i=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||qa;if(!o){var l=s.alternate,u=l!==null&&l.memoizedState!==null||ot;l=qa;var c=ot;if(qa=o,(ot=u)&&!c)for(H=s;H!==null;)o=H,u=o.child,o.tag===22&&o.memoizedState!==null?Kg(s):u!==null?(u.return=o,H=u):Kg(s);for(;i!==null;)H=i,U_(i),i=i.sibling;H=s,qa=l,ot=c}Wg(t)}else s.subtreeFlags&8772&&i!==null?(i.return=s,H=i):Wg(t)}}function Wg(t){for(;H!==null;){var e=H;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:ot||Su(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!ot)if(n===null)r.componentDidMount();else{var s=e.elementType===e.type?n.memoizedProps:Xt(e.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&bg(e,i,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}bg(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var m=f.dehydrated;m!==null&&Eo(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(B(163))}ot||e.flags&512&&uh(e)}catch(g){be(e,e.return,g)}}if(e===t){H=null;break}if(n=e.sibling,n!==null){n.return=e.return,H=n;break}H=e.return}}function qg(t){for(;H!==null;){var e=H;if(e===t){H=null;break}var n=e.sibling;if(n!==null){n.return=e.return,H=n;break}H=e.return}}function Kg(t){for(;H!==null;){var e=H;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Su(4,e)}catch(u){be(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var s=e.return;try{r.componentDidMount()}catch(u){be(e,s,u)}}var i=e.return;try{uh(e)}catch(u){be(e,i,u)}break;case 5:var o=e.return;try{uh(e)}catch(u){be(e,o,u)}}}catch(u){be(e,e.return,u)}if(e===t){H=null;break}var l=e.sibling;if(l!==null){l.return=e.return,H=l;break}H=e.return}}var KI=Math.ceil,Bl=qn.ReactCurrentDispatcher,bf=qn.ReactCurrentOwner,zt=qn.ReactCurrentBatchConfig,ue=0,$e=null,je=null,Ge=0,Pt=0,Bs=Pr(0),Ue=0,Do=null,ts=0,Au=0,Rf=0,uo=null,xt=null,Nf=0,ii=1/0,Sn=null,zl=!1,hh=null,wr=null,Ka=!1,dr=null,$l=0,co=0,fh=null,cl=-1,dl=0;function mt(){return ue&6?Pe():cl!==-1?cl:cl=Pe()}function xr(t){return t.mode&1?ue&2&&Ge!==0?Ge&-Ge:RI.transition!==null?(dl===0&&(dl=T0()),dl):(t=he,t!==0||(t=window.event,t=t===void 0?16:R0(t.type)),t):1}function nn(t,e,n,r){if(50<co)throw co=0,fh=null,Error(B(185));Go(t,n,r),(!(ue&2)||t!==$e)&&(t===$e&&(!(ue&2)&&(Au|=n),Ue===4&&ir(t,Ge)),At(t,r),n===1&&ue===0&&!(e.mode&1)&&(ii=Pe()+500,Eu&&Dr()))}function At(t,e){var n=t.callbackNode;RT(t,e);var r=Al(t,t===$e?Ge:0);if(r===0)n!==null&&ng(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&ng(n),e===1)t.tag===0?bI(Gg.bind(null,t)):Q0(Gg.bind(null,t)),SI(function(){!(ue&6)&&Dr()}),n=null;else{switch(I0(r)){case 1:n=nf;break;case 4:n=x0;break;case 16:n=Sl;break;case 536870912:n=E0;break;default:n=Sl}n=K_(n,F_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function F_(t,e){if(cl=-1,dl=0,ue&6)throw Error(B(327));var n=t.callbackNode;if(Gs()&&t.callbackNode!==n)return null;var r=Al(t,t===$e?Ge:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=Hl(t,r);else{e=r;var s=ue;ue|=2;var i=z_();($e!==t||Ge!==e)&&(Sn=null,ii=Pe()+500,Qr(t,e));do try{YI();break}catch(l){B_(t,l)}while(!0);gf(),Bl.current=i,ue=s,je!==null?e=0:($e=null,Ge=0,e=Ue)}if(e!==0){if(e===2&&(s=Fd(t),s!==0&&(r=s,e=ph(t,s))),e===1)throw n=Do,Qr(t,0),ir(t,r),At(t,Pe()),n;if(e===6)ir(t,r);else{if(s=t.current.alternate,!(r&30)&&!GI(s)&&(e=Hl(t,r),e===2&&(i=Fd(t),i!==0&&(r=i,e=ph(t,i))),e===1))throw n=Do,Qr(t,0),ir(t,r),At(t,Pe()),n;switch(t.finishedWork=s,t.finishedLanes=r,e){case 0:case 1:throw Error(B(345));case 2:zr(t,xt,Sn);break;case 3:if(ir(t,r),(r&130023424)===r&&(e=Nf+500-Pe(),10<e)){if(Al(t,0)!==0)break;if(s=t.suspendedLanes,(s&r)!==r){mt(),t.pingedLanes|=t.suspendedLanes&s;break}t.timeoutHandle=Gd(zr.bind(null,t,xt,Sn),e);break}zr(t,xt,Sn);break;case 4:if(ir(t,r),(r&4194240)===r)break;for(e=t.eventTimes,s=-1;0<r;){var o=31-tn(r);i=1<<o,o=e[o],o>s&&(s=o),r&=~i}if(r=s,r=Pe()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*KI(r/1960))-r,10<r){t.timeoutHandle=Gd(zr.bind(null,t,xt,Sn),r);break}zr(t,xt,Sn);break;case 5:zr(t,xt,Sn);break;default:throw Error(B(329))}}}return At(t,Pe()),t.callbackNode===n?F_.bind(null,t):null}function ph(t,e){var n=uo;return t.current.memoizedState.isDehydrated&&(Qr(t,e).flags|=256),t=Hl(t,e),t!==2&&(e=xt,xt=n,e!==null&&mh(e)),t}function mh(t){xt===null?xt=t:xt.push.apply(xt,t)}function GI(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!rn(i(),s))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ir(t,e){for(e&=~Rf,e&=~Au,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-tn(e),r=1<<n;t[n]=-1,e&=~r}}function Gg(t){if(ue&6)throw Error(B(327));Gs();var e=Al(t,0);if(!(e&1))return At(t,Pe()),null;var n=Hl(t,e);if(t.tag!==0&&n===2){var r=Fd(t);r!==0&&(e=r,n=ph(t,r))}if(n===1)throw n=Do,Qr(t,0),ir(t,e),At(t,Pe()),n;if(n===6)throw Error(B(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,zr(t,xt,Sn),At(t,Pe()),null}function Pf(t,e){var n=ue;ue|=1;try{return t(e)}finally{ue=n,ue===0&&(ii=Pe()+500,Eu&&Dr())}}function ns(t){dr!==null&&dr.tag===0&&!(ue&6)&&Gs();var e=ue;ue|=1;var n=zt.transition,r=he;try{if(zt.transition=null,he=1,t)return t()}finally{he=r,zt.transition=n,ue=e,!(ue&6)&&Dr()}}function Df(){Pt=Bs.current,we(Bs)}function Qr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,II(n)),je!==null)for(n=je.return;n!==null;){var r=n;switch(ff(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Nl();break;case 3:ri(),we(It),we(ut),Ef();break;case 5:xf(r);break;case 4:ri();break;case 13:we(Te);break;case 19:we(Te);break;case 10:yf(r.type._context);break;case 22:case 23:Df()}n=n.return}if($e=t,je=t=Er(t.current,null),Ge=Pt=e,Ue=0,Do=null,Rf=Au=ts=0,xt=uo=null,Wr!==null){for(e=0;e<Wr.length;e++)if(n=Wr[e],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=s,r.next=o}n.pending=r}Wr=null}return t}function B_(t,e){do{var n=je;try{if(gf(),al.current=Fl,Ul){for(var r=Ie.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}Ul=!1}if(es=0,ze=Me=Ie=null,ao=!1,Ro=0,bf.current=null,n===null||n.return===null){Ue=1,Do=e,je=null;break}e:{var i=t,o=n.return,l=n,u=e;if(e=Ge,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,f=l,m=f.tag;if(!(f.mode&1)&&(m===0||m===11||m===15)){var g=f.alternate;g?(f.updateQueue=g.updateQueue,f.memoizedState=g.memoizedState,f.lanes=g.lanes):(f.updateQueue=null,f.memoizedState=null)}var k=jg(o);if(k!==null){k.flags&=-257,Lg(k,o,l,i,e),k.mode&1&&Og(i,c,e),e=k,u=c;var C=e.updateQueue;if(C===null){var N=new Set;N.add(u),e.updateQueue=N}else C.add(u);break e}else{if(!(e&1)){Og(i,c,e),Of();break e}u=Error(B(426))}}else if(xe&&l.mode&1){var P=jg(o);if(P!==null){!(P.flags&65536)&&(P.flags|=256),Lg(P,o,l,i,e),pf(si(u,l));break e}}i=u=si(u,l),Ue!==4&&(Ue=2),uo===null?uo=[i]:uo.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var A=I_(i,u,e);Cg(i,A);break e;case 1:l=u;var _=i.type,T=i.stateNode;if(!(i.flags&128)&&(typeof _.getDerivedStateFromError=="function"||T!==null&&typeof T.componentDidCatch=="function"&&(wr===null||!wr.has(T)))){i.flags|=65536,e&=-e,i.lanes|=e;var R=S_(i,l,e);Cg(i,R);break e}}i=i.return}while(i!==null)}H_(n)}catch(L){e=L,je===n&&n!==null&&(je=n=n.return);continue}break}while(!0)}function z_(){var t=Bl.current;return Bl.current=Fl,t===null?Fl:t}function Of(){(Ue===0||Ue===3||Ue===2)&&(Ue=4),$e===null||!(ts&268435455)&&!(Au&268435455)||ir($e,Ge)}function Hl(t,e){var n=ue;ue|=2;var r=z_();($e!==t||Ge!==e)&&(Sn=null,Qr(t,e));do try{QI();break}catch(s){B_(t,s)}while(!0);if(gf(),ue=n,Bl.current=r,je!==null)throw Error(B(261));return $e=null,Ge=0,Ue}function QI(){for(;je!==null;)$_(je)}function YI(){for(;je!==null&&!xT();)$_(je)}function $_(t){var e=q_(t.alternate,t,Pt);t.memoizedProps=t.pendingProps,e===null?H_(t):je=e,bf.current=null}function H_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=$I(n,e),n!==null){n.flags&=32767,je=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ue=6,je=null;return}}else if(n=zI(n,e,Pt),n!==null){je=n;return}if(e=e.sibling,e!==null){je=e;return}je=e=t}while(e!==null);Ue===0&&(Ue=5)}function zr(t,e,n){var r=he,s=zt.transition;try{zt.transition=null,he=1,XI(t,e,n,r)}finally{zt.transition=s,he=r}return null}function XI(t,e,n,r){do Gs();while(dr!==null);if(ue&6)throw Error(B(327));n=t.finishedWork;var s=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(B(177));t.callbackNode=null,t.callbackPriority=0;var i=n.lanes|n.childLanes;if(NT(t,i),t===$e&&(je=$e=null,Ge=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ka||(Ka=!0,K_(Sl,function(){return Gs(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=zt.transition,zt.transition=null;var o=he;he=1;var l=ue;ue|=4,bf.current=null,WI(t,n),M_(n,t),yI(qd),kl=!!Wd,qd=Wd=null,t.current=n,qI(n),ET(),ue=l,he=o,zt.transition=i}else t.current=n;if(Ka&&(Ka=!1,dr=t,$l=s),i=t.pendingLanes,i===0&&(wr=null),ST(n.stateNode),At(t,Pe()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)s=e[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(zl)throw zl=!1,t=hh,hh=null,t;return $l&1&&t.tag!==0&&Gs(),i=t.pendingLanes,i&1?t===fh?co++:(co=0,fh=t):co=0,Dr(),null}function Gs(){if(dr!==null){var t=I0($l),e=zt.transition,n=he;try{if(zt.transition=null,he=16>t?16:t,dr===null)var r=!1;else{if(t=dr,dr=null,$l=0,ue&6)throw Error(B(331));var s=ue;for(ue|=4,H=t.current;H!==null;){var i=H,o=i.child;if(H.flags&16){var l=i.deletions;if(l!==null){for(var u=0;u<l.length;u++){var c=l[u];for(H=c;H!==null;){var f=H;switch(f.tag){case 0:case 11:case 15:lo(8,f,i)}var m=f.child;if(m!==null)m.return=f,H=m;else for(;H!==null;){f=H;var g=f.sibling,k=f.return;if(j_(f),f===c){H=null;break}if(g!==null){g.return=k,H=g;break}H=k}}}var C=i.alternate;if(C!==null){var N=C.child;if(N!==null){C.child=null;do{var P=N.sibling;N.sibling=null,N=P}while(N!==null)}}H=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,H=o;else e:for(;H!==null;){if(i=H,i.flags&2048)switch(i.tag){case 0:case 11:case 15:lo(9,i,i.return)}var A=i.sibling;if(A!==null){A.return=i.return,H=A;break e}H=i.return}}var _=t.current;for(H=_;H!==null;){o=H;var T=o.child;if(o.subtreeFlags&2064&&T!==null)T.return=o,H=T;else e:for(o=_;H!==null;){if(l=H,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Su(9,l)}}catch(L){be(l,l.return,L)}if(l===o){H=null;break e}var R=l.sibling;if(R!==null){R.return=l.return,H=R;break e}H=l.return}}if(ue=s,Dr(),fn&&typeof fn.onPostCommitFiberRoot=="function")try{fn.onPostCommitFiberRoot(yu,t)}catch{}r=!0}return r}finally{he=n,zt.transition=e}}return!1}function Qg(t,e,n){e=si(n,e),e=I_(t,e,1),t=_r(t,e,1),e=mt(),t!==null&&(Go(t,1,e),At(t,e))}function be(t,e,n){if(t.tag===3)Qg(t,t,n);else for(;e!==null;){if(e.tag===3){Qg(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(wr===null||!wr.has(r))){t=si(n,t),t=S_(e,t,1),e=_r(e,t,1),t=mt(),e!==null&&(Go(e,1,t),At(e,t));break}}e=e.return}}function JI(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=mt(),t.pingedLanes|=t.suspendedLanes&n,$e===t&&(Ge&n)===n&&(Ue===4||Ue===3&&(Ge&130023424)===Ge&&500>Pe()-Nf?Qr(t,0):Rf|=n),At(t,e)}function W_(t,e){e===0&&(t.mode&1?(e=Va,Va<<=1,!(Va&130023424)&&(Va=4194304)):e=1);var n=mt();t=Un(t,e),t!==null&&(Go(t,e,n),At(t,n))}function ZI(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),W_(t,n)}function e2(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,s=t.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(B(314))}r!==null&&r.delete(e),W_(t,n)}var q_;q_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||It.current)Tt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Tt=!1,BI(t,e,n);Tt=!!(t.flags&131072)}else Tt=!1,xe&&e.flags&1048576&&Y0(e,Ol,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;ul(t,e),t=e.pendingProps;var s=ei(e,ut.current);Ks(e,n),s=If(null,e,r,t,s,n);var i=Sf();return e.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,St(r)?(i=!0,Pl(e)):i=!1,e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,_f(e),s.updater=Iu,e.stateNode=s,s._reactInternals=e,th(e,r,t,n),e=sh(null,e,r,!0,i,n)):(e.tag=0,xe&&i&&hf(e),pt(null,e,s,n),e=e.child),e;case 16:r=e.elementType;e:{switch(ul(t,e),t=e.pendingProps,s=r._init,r=s(r._payload),e.type=r,s=e.tag=n2(r),t=Xt(r,t),s){case 0:e=rh(null,e,r,t,n);break e;case 1:e=Ug(null,e,r,t,n);break e;case 11:e=Vg(null,e,r,t,n);break e;case 14:e=Mg(null,e,r,Xt(r.type,t),n);break e}throw Error(B(306,r,""))}return e;case 0:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Xt(r,s),rh(t,e,r,s,n);case 1:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Xt(r,s),Ug(t,e,r,s,n);case 3:e:{if(b_(e),t===null)throw Error(B(387));r=e.pendingProps,i=e.memoizedState,s=i.element,n_(t,e),Vl(e,r,null,n);var o=e.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){s=si(Error(B(423)),e),e=Fg(t,e,r,n,s);break e}else if(r!==s){s=si(Error(B(424)),e),e=Fg(t,e,r,n,s);break e}else for(Dt=vr(e.stateNode.containerInfo.firstChild),jt=e,xe=!0,Zt=null,n=e_(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ti(),r===s){e=Fn(t,e,n);break e}pt(t,e,r,n)}e=e.child}return e;case 5:return r_(e),t===null&&Jd(e),r=e.type,s=e.pendingProps,i=t!==null?t.memoizedProps:null,o=s.children,Kd(r,s)?o=null:i!==null&&Kd(r,i)&&(e.flags|=32),C_(t,e),pt(t,e,o,n),e.child;case 6:return t===null&&Jd(e),null;case 13:return R_(t,e,n);case 4:return wf(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=ni(e,null,r,n):pt(t,e,r,n),e.child;case 11:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Xt(r,s),Vg(t,e,r,s,n);case 7:return pt(t,e,e.pendingProps,n),e.child;case 8:return pt(t,e,e.pendingProps.children,n),e.child;case 12:return pt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,s=e.pendingProps,i=e.memoizedProps,o=s.value,ge(jl,r._currentValue),r._currentValue=o,i!==null)if(rn(i.value,o)){if(i.children===s.children&&!It.current){e=Fn(t,e,n);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=Dn(-1,n&-n),u.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?u.next=u:(u.next=f.next,f.next=u),c.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Zd(i.return,n,e),l.lanes|=n;break}u=u.next}}else if(i.tag===10)o=i.type===e.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(B(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Zd(o,n,e),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}pt(t,e,s.children,n),e=e.child}return e;case 9:return s=e.type,r=e.pendingProps.children,Ks(e,n),s=Wt(s),r=r(s),e.flags|=1,pt(t,e,r,n),e.child;case 14:return r=e.type,s=Xt(r,e.pendingProps),s=Xt(r.type,s),Mg(t,e,r,s,n);case 15:return A_(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:Xt(r,s),ul(t,e),e.tag=1,St(r)?(t=!0,Pl(e)):t=!1,Ks(e,n),T_(e,r,s),th(e,r,s,n),sh(null,e,r,!0,t,n);case 19:return N_(t,e,n);case 22:return k_(t,e,n)}throw Error(B(156,e.tag))};function K_(t,e){return w0(t,e)}function t2(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Bt(t,e,n,r){return new t2(t,e,n,r)}function jf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function n2(t){if(typeof t=="function")return jf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Zh)return 11;if(t===ef)return 14}return 2}function Er(t,e){var n=t.alternate;return n===null?(n=Bt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function hl(t,e,n,r,s,i){var o=2;if(r=t,typeof t=="function")jf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Ns:return Yr(n.children,s,i,e);case Jh:o=8,s|=8;break;case Sd:return t=Bt(12,n,e,s|2),t.elementType=Sd,t.lanes=i,t;case Ad:return t=Bt(13,n,e,s),t.elementType=Ad,t.lanes=i,t;case kd:return t=Bt(19,n,e,s),t.elementType=kd,t.lanes=i,t;case r0:return ku(n,s,i,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case t0:o=10;break e;case n0:o=9;break e;case Zh:o=11;break e;case ef:o=14;break e;case nr:o=16,r=null;break e}throw Error(B(130,t==null?t:typeof t,""))}return e=Bt(o,n,e,s),e.elementType=t,e.type=r,e.lanes=i,e}function Yr(t,e,n,r){return t=Bt(7,t,r,e),t.lanes=n,t}function ku(t,e,n,r){return t=Bt(22,t,r,e),t.elementType=r0,t.lanes=n,t.stateNode={isHidden:!1},t}function rd(t,e,n){return t=Bt(6,t,null,e),t.lanes=n,t}function sd(t,e,n){return e=Bt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function r2(t,e,n,r,s){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Mc(0),this.expirationTimes=Mc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Mc(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Lf(t,e,n,r,s,i,o,l,u){return t=new r2(t,e,n,l,u),e===1?(e=1,i===!0&&(e|=8)):e=0,i=Bt(3,null,null,e),t.current=i,i.stateNode=t,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},_f(i),t}function s2(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Rs,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function G_(t){if(!t)return kr;t=t._reactInternals;e:{if(hs(t)!==t||t.tag!==1)throw Error(B(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(St(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(B(171))}if(t.tag===1){var n=t.type;if(St(n))return G0(t,n,e)}return e}function Q_(t,e,n,r,s,i,o,l,u){return t=Lf(n,r,!0,t,s,i,o,l,u),t.context=G_(null),n=t.current,r=mt(),s=xr(n),i=Dn(r,s),i.callback=e??null,_r(n,i,s),t.current.lanes=s,Go(t,s,r),At(t,r),t}function Cu(t,e,n,r){var s=e.current,i=mt(),o=xr(s);return n=G_(n),e.context===null?e.context=n:e.pendingContext=n,e=Dn(i,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=_r(s,e,o),t!==null&&(nn(t,s,o,i),ol(t,s,o)),o}function Wl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Yg(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Vf(t,e){Yg(t,e),(t=t.alternate)&&Yg(t,e)}function i2(){return null}var Y_=typeof reportError=="function"?reportError:function(t){console.error(t)};function Mf(t){this._internalRoot=t}bu.prototype.render=Mf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(B(409));Cu(t,e,null,null)};bu.prototype.unmount=Mf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;ns(function(){Cu(null,t,null,null)}),e[Mn]=null}};function bu(t){this._internalRoot=t}bu.prototype.unstable_scheduleHydration=function(t){if(t){var e=k0();t={blockedOn:null,target:t,priority:e};for(var n=0;n<sr.length&&e!==0&&e<sr[n].priority;n++);sr.splice(n,0,t),n===0&&b0(t)}};function Uf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Ru(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Xg(){}function o2(t,e,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var c=Wl(o);i.call(c)}}var o=Q_(e,r,t,0,null,!1,!1,"",Xg);return t._reactRootContainer=o,t[Mn]=o.current,So(t.nodeType===8?t.parentNode:t),ns(),o}for(;s=t.lastChild;)t.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var c=Wl(u);l.call(c)}}var u=Lf(t,0,!1,null,null,!1,!1,"",Xg);return t._reactRootContainer=u,t[Mn]=u.current,So(t.nodeType===8?t.parentNode:t),ns(function(){Cu(e,u,n,r)}),u}function Nu(t,e,n,r,s){var i=n._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var l=s;s=function(){var u=Wl(o);l.call(u)}}Cu(e,o,t,s)}else o=o2(n,e,t,s,r);return Wl(o)}S0=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Gi(e.pendingLanes);n!==0&&(rf(e,n|1),At(e,Pe()),!(ue&6)&&(ii=Pe()+500,Dr()))}break;case 13:ns(function(){var r=Un(t,1);if(r!==null){var s=mt();nn(r,t,1,s)}}),Vf(t,1)}};sf=function(t){if(t.tag===13){var e=Un(t,134217728);if(e!==null){var n=mt();nn(e,t,134217728,n)}Vf(t,134217728)}};A0=function(t){if(t.tag===13){var e=xr(t),n=Un(t,e);if(n!==null){var r=mt();nn(n,t,e,r)}Vf(t,e)}};k0=function(){return he};C0=function(t,e){var n=he;try{return he=t,e()}finally{he=n}};Vd=function(t,e,n){switch(e){case"input":if(Rd(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var s=xu(r);if(!s)throw Error(B(90));i0(r),Rd(r,s)}}}break;case"textarea":a0(t,n);break;case"select":e=n.value,e!=null&&$s(t,!!n.multiple,e,!1)}};p0=Pf;m0=ns;var a2={usingClientEntryPoint:!1,Events:[Yo,js,xu,h0,f0,Pf]},Hi={findFiberByHostInstance:Hr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},l2={bundleType:Hi.bundleType,version:Hi.version,rendererPackageName:Hi.rendererPackageName,rendererConfig:Hi.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:qn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=v0(t),t===null?null:t.stateNode},findFiberByHostInstance:Hi.findFiberByHostInstance||i2,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ga=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ga.isDisabled&&Ga.supportsFiber)try{yu=Ga.inject(l2),fn=Ga}catch{}}Vt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=a2;Vt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Uf(e))throw Error(B(200));return s2(t,e,null,n)};Vt.createRoot=function(t,e){if(!Uf(t))throw Error(B(299));var n=!1,r="",s=Y_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=Lf(t,1,!1,null,null,n,!1,r,s),t[Mn]=e.current,So(t.nodeType===8?t.parentNode:t),new Mf(e)};Vt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(B(188)):(t=Object.keys(t).join(","),Error(B(268,t)));return t=v0(e),t=t===null?null:t.stateNode,t};Vt.flushSync=function(t){return ns(t)};Vt.hydrate=function(t,e,n){if(!Ru(e))throw Error(B(200));return Nu(null,t,e,!0,n)};Vt.hydrateRoot=function(t,e,n){if(!Uf(t))throw Error(B(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",o=Y_;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Q_(e,null,t,1,n??null,s,!1,i,o),t[Mn]=e.current,So(t),r)for(t=0;t<r.length;t++)n=r[t],s=n._getVersion,s=s(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,s]:e.mutableSourceEagerHydrationData.push(n,s);return new bu(e)};Vt.render=function(t,e,n){if(!Ru(e))throw Error(B(200));return Nu(null,t,e,!1,n)};Vt.unmountComponentAtNode=function(t){if(!Ru(t))throw Error(B(40));return t._reactRootContainer?(ns(function(){Nu(null,null,t,!1,function(){t._reactRootContainer=null,t[Mn]=null})}),!0):!1};Vt.unstable_batchedUpdates=Pf;Vt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!Ru(n))throw Error(B(200));if(t==null||t._reactInternals===void 0)throw Error(B(38));return Nu(t,e,n,!1,r)};Vt.version="18.3.1-next-f1338f8080-20240426";function X_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(X_)}catch(t){console.error(t)}}X_(),Xv.exports=Vt;var u2=Xv.exports,J_,Jg=u2;J_=Jg.createRoot,Jg.hydrateRoot;/**
 * @remix-run/router v1.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Oo(){return Oo=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Oo.apply(this,arguments)}var hr;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(hr||(hr={}));const Zg="popstate";function c2(t){t===void 0&&(t={});function e(s,i){let{pathname:o="/",search:l="",hash:u=""}=fs(s.location.hash.substr(1));return!o.startsWith("/")&&!o.startsWith(".")&&(o="/"+o),gh("",{pathname:o,search:l,hash:u},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(s,i){let o=s.document.querySelector("base"),l="";if(o&&o.getAttribute("href")){let u=s.location.href,c=u.indexOf("#");l=c===-1?u:u.slice(0,c)}return l+"#"+(typeof i=="string"?i:ql(i))}function r(s,i){Pu(s.pathname.charAt(0)==="/","relative pathnames are not supported in hash history.push("+JSON.stringify(i)+")")}return h2(e,n,r,t)}function De(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function Pu(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function d2(){return Math.random().toString(36).substr(2,8)}function ey(t,e){return{usr:t.state,key:t.key,idx:e}}function gh(t,e,n,r){return n===void 0&&(n=null),Oo({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?fs(e):e,{state:n,key:e&&e.key||r||d2()})}function ql(t){let{pathname:e="/",search:n="",hash:r=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function fs(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let r=t.indexOf("?");r>=0&&(e.search=t.substr(r),t=t.substr(0,r)),t&&(e.pathname=t)}return e}function h2(t,e,n,r){r===void 0&&(r={});let{window:s=document.defaultView,v5Compat:i=!1}=r,o=s.history,l=hr.Pop,u=null,c=f();c==null&&(c=0,o.replaceState(Oo({},o.state,{idx:c}),""));function f(){return(o.state||{idx:null}).idx}function m(){l=hr.Pop;let P=f(),A=P==null?null:P-c;c=P,u&&u({action:l,location:N.location,delta:A})}function g(P,A){l=hr.Push;let _=gh(N.location,P,A);n&&n(_,P),c=f()+1;let T=ey(_,c),R=N.createHref(_);try{o.pushState(T,"",R)}catch(L){if(L instanceof DOMException&&L.name==="DataCloneError")throw L;s.location.assign(R)}i&&u&&u({action:l,location:N.location,delta:1})}function k(P,A){l=hr.Replace;let _=gh(N.location,P,A);n&&n(_,P),c=f();let T=ey(_,c),R=N.createHref(_);o.replaceState(T,"",R),i&&u&&u({action:l,location:N.location,delta:0})}function C(P){let A=s.location.origin!=="null"?s.location.origin:s.location.href,_=typeof P=="string"?P:ql(P);return _=_.replace(/ $/,"%20"),De(A,"No window.location.(origin|href) available to create URL for href: "+_),new URL(_,A)}let N={get action(){return l},get location(){return t(s,o)},listen(P){if(u)throw new Error("A history only accepts one active listener");return s.addEventListener(Zg,m),u=P,()=>{s.removeEventListener(Zg,m),u=null}},createHref(P){return e(s,P)},createURL:C,encodeLocation(P){let A=C(P);return{pathname:A.pathname,search:A.search,hash:A.hash}},push:g,replace:k,go(P){return o.go(P)}};return N}var ty;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(ty||(ty={}));function f2(t,e,n){return n===void 0&&(n="/"),p2(t,e,n)}function p2(t,e,n,r){let s=typeof e=="string"?fs(e):e,i=Ff(s.pathname||"/",n);if(i==null)return null;let o=Z_(t);m2(o);let l=null;for(let u=0;l==null&&u<o.length;++u){let c=k2(i);l=I2(o[u],c)}return l}function Z_(t,e,n,r){e===void 0&&(e=[]),n===void 0&&(n=[]),r===void 0&&(r="");let s=(i,o,l)=>{let u={relativePath:l===void 0?i.path||"":l,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};u.relativePath.startsWith("/")&&(De(u.relativePath.startsWith(r),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(r.length));let c=Tr([r,u.relativePath]),f=n.concat(u);i.children&&i.children.length>0&&(De(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),Z_(i.children,e,f,c)),!(i.path==null&&!i.index)&&e.push({path:c,score:E2(c,i.index),routesMeta:f})};return t.forEach((i,o)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))s(i,o);else for(let u of ew(i.path))s(i,o,u)}),e}function ew(t){let e=t.split("/");if(e.length===0)return[];let[n,...r]=e,s=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return s?[i,""]:[i];let o=ew(r.join("/")),l=[];return l.push(...o.map(u=>u===""?i:[i,u].join("/"))),s&&l.push(...o),l.map(u=>t.startsWith("/")&&u===""?"/":u)}function m2(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:T2(e.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const g2=/^:[\w-]+$/,y2=3,v2=2,_2=1,w2=10,x2=-2,ny=t=>t==="*";function E2(t,e){let n=t.split("/"),r=n.length;return n.some(ny)&&(r+=x2),e&&(r+=v2),n.filter(s=>!ny(s)).reduce((s,i)=>s+(g2.test(i)?y2:i===""?_2:w2),r)}function T2(t,e){return t.length===e.length&&t.slice(0,-1).every((r,s)=>r===e[s])?t[t.length-1]-e[e.length-1]:0}function I2(t,e,n){let{routesMeta:r}=t,s={},i="/",o=[];for(let l=0;l<r.length;++l){let u=r[l],c=l===r.length-1,f=i==="/"?e:e.slice(i.length)||"/",m=S2({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},f),g=u.route;if(!m)return null;Object.assign(s,m.params),o.push({params:s,pathname:Tr([i,m.pathname]),pathnameBase:P2(Tr([i,m.pathnameBase])),route:g}),m.pathnameBase!=="/"&&(i=Tr([i,m.pathnameBase]))}return o}function S2(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,r]=A2(t.path,t.caseSensitive,t.end),s=e.match(n);if(!s)return null;let i=s[0],o=i.replace(/(.)\/+$/,"$1"),l=s.slice(1);return{params:r.reduce((c,f,m)=>{let{paramName:g,isOptional:k}=f;if(g==="*"){let N=l[m]||"";o=i.slice(0,i.length-N.length).replace(/(.)\/+$/,"$1")}const C=l[m];return k&&!C?c[g]=void 0:c[g]=(C||"").replace(/%2F/g,"/"),c},{}),pathname:i,pathnameBase:o,pattern:t}}function A2(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),Pu(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let r=[],s="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,u)=>(r.push({paramName:l,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(r.push({paramName:"*"}),s+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?s+="\\/*$":t!==""&&t!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,e?void 0:"i"),r]}function k2(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Pu(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function Ff(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,r=t.charAt(n);return r&&r!=="/"?null:t.slice(n)||"/"}const C2=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,b2=t=>C2.test(t);function R2(t,e){e===void 0&&(e="/");let{pathname:n,search:r="",hash:s=""}=typeof t=="string"?fs(t):t,i;if(n)if(b2(n))i=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),Pu(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?i=ry(n.substring(1),"/"):i=ry(n,e)}else i=e;return{pathname:i,search:D2(r),hash:O2(s)}}function ry(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(s=>{s===".."?n.length>1&&n.pop():s!=="."&&n.push(s)}),n.length>1?n.join("/"):"/"}function id(t,e,n,r){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function N2(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function Bf(t,e){let n=N2(t);return e?n.map((r,s)=>s===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function zf(t,e,n,r){r===void 0&&(r=!1);let s;typeof t=="string"?s=fs(t):(s=Oo({},t),De(!s.pathname||!s.pathname.includes("?"),id("?","pathname","search",s)),De(!s.pathname||!s.pathname.includes("#"),id("#","pathname","hash",s)),De(!s.search||!s.search.includes("#"),id("#","search","hash",s)));let i=t===""||s.pathname==="",o=i?"/":s.pathname,l;if(o==null)l=n;else{let m=e.length-1;if(!r&&o.startsWith("..")){let g=o.split("/");for(;g[0]==="..";)g.shift(),m-=1;s.pathname=g.join("/")}l=m>=0?e[m]:"/"}let u=R2(s,l),c=o&&o!=="/"&&o.endsWith("/"),f=(i||o===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||f)&&(u.pathname+="/"),u}const Tr=t=>t.join("/").replace(/\/\/+/g,"/"),P2=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),D2=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,O2=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function j2(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const tw=["post","put","patch","delete"];new Set(tw);const L2=["get",...tw];new Set(L2);/**
 * React Router v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function jo(){return jo=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},jo.apply(this,arguments)}const $f=O.createContext(null),V2=O.createContext(null),Or=O.createContext(null),Du=O.createContext(null),Kn=O.createContext({outlet:null,matches:[],isDataRoute:!1}),nw=O.createContext(null);function M2(t,e){let{relative:n}=e===void 0?{}:e;vi()||De(!1);let{basename:r,navigator:s}=O.useContext(Or),{hash:i,pathname:o,search:l}=iw(t,{relative:n}),u=o;return r!=="/"&&(u=o==="/"?r:Tr([r,o])),s.createHref({pathname:u,search:l,hash:i})}function vi(){return O.useContext(Du)!=null}function _i(){return vi()||De(!1),O.useContext(Du).location}function rw(t){O.useContext(Or).static||O.useLayoutEffect(t)}function Gn(){let{isDataRoute:t}=O.useContext(Kn);return t?X2():U2()}function U2(){vi()||De(!1);let t=O.useContext($f),{basename:e,future:n,navigator:r}=O.useContext(Or),{matches:s}=O.useContext(Kn),{pathname:i}=_i(),o=JSON.stringify(Bf(s,n.v7_relativeSplatPath)),l=O.useRef(!1);return rw(()=>{l.current=!0}),O.useCallback(function(c,f){if(f===void 0&&(f={}),!l.current)return;if(typeof c=="number"){r.go(c);return}let m=zf(c,JSON.parse(o),i,f.relative==="path");t==null&&e!=="/"&&(m.pathname=m.pathname==="/"?e:Tr([e,m.pathname])),(f.replace?r.replace:r.push)(m,f.state,f)},[e,r,o,i,t])}function sw(){let{matches:t}=O.useContext(Kn),e=t[t.length-1];return e?e.params:{}}function iw(t,e){let{relative:n}=e===void 0?{}:e,{future:r}=O.useContext(Or),{matches:s}=O.useContext(Kn),{pathname:i}=_i(),o=JSON.stringify(Bf(s,r.v7_relativeSplatPath));return O.useMemo(()=>zf(t,JSON.parse(o),i,n==="path"),[t,o,i,n])}function F2(t,e){return B2(t,e)}function B2(t,e,n,r){vi()||De(!1);let{navigator:s}=O.useContext(Or),{matches:i}=O.useContext(Kn),o=i[i.length-1],l=o?o.params:{};o&&o.pathname;let u=o?o.pathnameBase:"/";o&&o.route;let c=_i(),f;if(e){var m;let P=typeof e=="string"?fs(e):e;u==="/"||(m=P.pathname)!=null&&m.startsWith(u)||De(!1),f=P}else f=c;let g=f.pathname||"/",k=g;if(u!=="/"){let P=u.replace(/^\//,"").split("/");k="/"+g.replace(/^\//,"").split("/").slice(P.length).join("/")}let C=f2(t,{pathname:k}),N=q2(C&&C.map(P=>Object.assign({},P,{params:Object.assign({},l,P.params),pathname:Tr([u,s.encodeLocation?s.encodeLocation(P.pathname).pathname:P.pathname]),pathnameBase:P.pathnameBase==="/"?u:Tr([u,s.encodeLocation?s.encodeLocation(P.pathnameBase).pathname:P.pathnameBase])})),i,n,r);return e&&N?O.createElement(Du.Provider,{value:{location:jo({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:hr.Pop}},N):N}function z2(){let t=Y2(),e=j2(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return O.createElement(O.Fragment,null,O.createElement("h2",null,"Unexpected Application Error!"),O.createElement("h3",{style:{fontStyle:"italic"}},e),n?O.createElement("pre",{style:s},n):null,null)}const $2=O.createElement(z2,null);class H2 extends O.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?O.createElement(Kn.Provider,{value:this.props.routeContext},O.createElement(nw.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function W2(t){let{routeContext:e,match:n,children:r}=t,s=O.useContext($f);return s&&s.static&&s.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=n.route.id),O.createElement(Kn.Provider,{value:e},r)}function q2(t,e,n,r){var s;if(e===void 0&&(e=[]),n===void 0&&(n=null),r===void 0&&(r=null),t==null){var i;if(!n)return null;if(n.errors)t=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let o=t,l=(s=n)==null?void 0:s.errors;if(l!=null){let f=o.findIndex(m=>m.route.id&&(l==null?void 0:l[m.route.id])!==void 0);f>=0||De(!1),o=o.slice(0,Math.min(o.length,f+1))}let u=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let f=0;f<o.length;f++){let m=o[f];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(c=f),m.route.id){let{loaderData:g,errors:k}=n,C=m.route.loader&&g[m.route.id]===void 0&&(!k||k[m.route.id]===void 0);if(m.route.lazy||C){u=!0,c>=0?o=o.slice(0,c+1):o=[o[0]];break}}}return o.reduceRight((f,m,g)=>{let k,C=!1,N=null,P=null;n&&(k=l&&m.route.id?l[m.route.id]:void 0,N=m.route.errorElement||$2,u&&(c<0&&g===0?(J2("route-fallback"),C=!0,P=null):c===g&&(C=!0,P=m.route.hydrateFallbackElement||null)));let A=e.concat(o.slice(0,g+1)),_=()=>{let T;return k?T=N:C?T=P:m.route.Component?T=O.createElement(m.route.Component,null):m.route.element?T=m.route.element:T=f,O.createElement(W2,{match:m,routeContext:{outlet:f,matches:A,isDataRoute:n!=null},children:T})};return n&&(m.route.ErrorBoundary||m.route.errorElement||g===0)?O.createElement(H2,{location:n.location,revalidation:n.revalidation,component:N,error:k,children:_(),routeContext:{outlet:null,matches:A,isDataRoute:!0}}):_()},null)}var ow=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(ow||{}),aw=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(aw||{});function K2(t){let e=O.useContext($f);return e||De(!1),e}function G2(t){let e=O.useContext(V2);return e||De(!1),e}function Q2(t){let e=O.useContext(Kn);return e||De(!1),e}function lw(t){let e=Q2(),n=e.matches[e.matches.length-1];return n.route.id||De(!1),n.route.id}function Y2(){var t;let e=O.useContext(nw),n=G2(),r=lw();return e!==void 0?e:(t=n.errors)==null?void 0:t[r]}function X2(){let{router:t}=K2(ow.UseNavigateStable),e=lw(aw.UseNavigateStable),n=O.useRef(!1);return rw(()=>{n.current=!0}),O.useCallback(function(s,i){i===void 0&&(i={}),n.current&&(typeof s=="number"?t.navigate(s):t.navigate(s,jo({fromRouteId:e},i)))},[t,e])}const sy={};function J2(t,e,n){sy[t]||(sy[t]=!0)}function Z2(t,e){t==null||t.v7_startTransition,t==null||t.v7_relativeSplatPath}function eS(t){let{to:e,replace:n,state:r,relative:s}=t;vi()||De(!1);let{future:i,static:o}=O.useContext(Or),{matches:l}=O.useContext(Kn),{pathname:u}=_i(),c=Gn(),f=zf(e,Bf(l,i.v7_relativeSplatPath),u,s==="path"),m=JSON.stringify(f);return O.useEffect(()=>c(JSON.parse(m),{replace:n,state:r,relative:s}),[c,m,s,n,r]),null}function wt(t){De(!1)}function tS(t){let{basename:e="/",children:n=null,location:r,navigationType:s=hr.Pop,navigator:i,static:o=!1,future:l}=t;vi()&&De(!1);let u=e.replace(/^\/*/,"/"),c=O.useMemo(()=>({basename:u,navigator:i,static:o,future:jo({v7_relativeSplatPath:!1},l)}),[u,l,i,o]);typeof r=="string"&&(r=fs(r));let{pathname:f="/",search:m="",hash:g="",state:k=null,key:C="default"}=r,N=O.useMemo(()=>{let P=Ff(f,u);return P==null?null:{location:{pathname:P,search:m,hash:g,state:k,key:C},navigationType:s}},[u,f,m,g,k,C,s]);return N==null?null:O.createElement(Or.Provider,{value:c},O.createElement(Du.Provider,{children:n,value:N}))}function nS(t){let{children:e,location:n}=t;return F2(yh(e),n)}new Promise(()=>{});function yh(t,e){e===void 0&&(e=[]);let n=[];return O.Children.forEach(t,(r,s)=>{if(!O.isValidElement(r))return;let i=[...e,s];if(r.type===O.Fragment){n.push.apply(n,yh(r.props.children,i));return}r.type!==wt&&De(!1),!r.props.index||!r.props.children||De(!1);let o={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=yh(r.props.children,i)),n.push(o)}),n}/**
 * React Router DOM v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function vh(){return vh=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},vh.apply(this,arguments)}function rS(t,e){if(t==null)return{};var n={},r=Object.keys(t),s,i;for(i=0;i<r.length;i++)s=r[i],!(e.indexOf(s)>=0)&&(n[s]=t[s]);return n}function sS(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function iS(t,e){return t.button===0&&(!e||e==="_self")&&!sS(t)}const oS=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],aS="6";try{window.__reactRouterVersion=aS}catch{}const lS="startTransition",iy=JE[lS];function uS(t){let{basename:e,children:n,future:r,window:s}=t,i=O.useRef();i.current==null&&(i.current=c2({window:s,v5Compat:!0}));let o=i.current,[l,u]=O.useState({action:o.action,location:o.location}),{v7_startTransition:c}=r||{},f=O.useCallback(m=>{c&&iy?iy(()=>u(m)):u(m)},[u,c]);return O.useLayoutEffect(()=>o.listen(f),[o,f]),O.useEffect(()=>Z2(r),[r]),O.createElement(tS,{basename:e,children:n,location:l.location,navigationType:l.action,navigator:o,future:r})}const cS=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",dS=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,oy=O.forwardRef(function(e,n){let{onClick:r,relative:s,reloadDocument:i,replace:o,state:l,target:u,to:c,preventScrollReset:f,viewTransition:m}=e,g=rS(e,oS),{basename:k}=O.useContext(Or),C,N=!1;if(typeof c=="string"&&dS.test(c)&&(C=c,cS))try{let T=new URL(window.location.href),R=c.startsWith("//")?new URL(T.protocol+c):new URL(c),L=Ff(R.pathname,k);R.origin===T.origin&&L!=null?c=L+R.search+R.hash:N=!0}catch{}let P=M2(c,{relative:s}),A=hS(c,{replace:o,state:l,target:u,preventScrollReset:f,relative:s,viewTransition:m});function _(T){r&&r(T),T.defaultPrevented||A(T)}return O.createElement("a",vh({},g,{href:C||P,onClick:N||i?r:_,ref:n,target:u}))});var ay;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(ay||(ay={}));var ly;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(ly||(ly={}));function hS(t,e){let{target:n,replace:r,state:s,preventScrollReset:i,relative:o,viewTransition:l}=e===void 0?{}:e,u=Gn(),c=_i(),f=iw(t,{relative:o});return O.useCallback(m=>{if(iS(m,n)){m.preventDefault();let g=r!==void 0?r:ql(c)===ql(f);u(t,{replace:g,state:s,preventScrollReset:i,relative:o,viewTransition:l})}},[c,u,f,r,s,n,t,i,o,l])}var uy={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uw=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},fS=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],l=t[n++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},cw={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,l=o?t[s+1]:0,u=s+2<t.length,c=u?t[s+2]:0,f=i>>2,m=(i&3)<<4|l>>4;let g=(l&15)<<2|c>>6,k=c&63;u||(k=64,o||(g=64)),r.push(n[f],n[m],n[g],n[k])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(uw(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):fS(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const m=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||l==null||c==null||m==null)throw new pS;const g=i<<2|l>>4;if(r.push(g),c!==64){const k=l<<4&240|c>>2;if(r.push(k),m!==64){const C=c<<6&192|m;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class pS extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const mS=function(t){const e=uw(t);return cw.encodeByteArray(e,!0)},Kl=function(t){return mS(t).replace(/\./g,"")},dw=function(t){try{return cw.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gS(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yS=()=>gS().__FIREBASE_DEFAULTS__,vS=()=>{if(typeof process>"u"||typeof uy>"u")return;const t=uy.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},_S=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&dw(t[1]);return e&&JSON.parse(e)},Ou=()=>{try{return yS()||vS()||_S()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},hw=t=>{var e,n;return(n=(e=Ou())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},fw=t=>{const e=hw(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},pw=()=>{var t;return(t=Ou())===null||t===void 0?void 0:t.config},mw=t=>{var e;return(e=Ou())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wS{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gw(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Kl(JSON.stringify(n)),Kl(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ct(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function xS(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ct())}function ES(){var t;const e=(t=Ou())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function TS(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function IS(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function SS(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function AS(){const t=ct();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function kS(){return!ES()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function yw(){try{return typeof indexedDB=="object"}catch{return!1}}function vw(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function CS(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bS="FirebaseError";class ln extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=bS,Object.setPrototypeOf(this,ln.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ps.prototype.create)}}class ps{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?RS(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new ln(s,l,r)}}function RS(t,e){return t.replace(NS,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const NS=/\{\$([^}]+)}/g;function PS(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Gl(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(cy(i)&&cy(o)){if(!Gl(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function cy(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jo(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Yi(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Xi(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function DS(t,e){const n=new OS(t,e);return n.subscribe.bind(n)}class OS{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");jS(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=od),s.error===void 0&&(s.error=od),s.complete===void 0&&(s.complete=od);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function jS(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function od(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(t){return t&&t._delegate?t._delegate:t}class Kt{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $r="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LS{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new wS;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(MS(e))try{this.getOrInitializeService({instanceIdentifier:$r})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=$r){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$r){return this.instances.has(e)}getOptions(e=$r){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:VS(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=$r){return this.component?this.component.multipleInstances?e:$r:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function VS(t){return t===$r?void 0:t}function MS(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class US{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new LS(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oe;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(oe||(oe={}));const FS={debug:oe.DEBUG,verbose:oe.VERBOSE,info:oe.INFO,warn:oe.WARN,error:oe.ERROR,silent:oe.SILENT},BS=oe.INFO,zS={[oe.DEBUG]:"log",[oe.VERBOSE]:"log",[oe.INFO]:"info",[oe.WARN]:"warn",[oe.ERROR]:"error"},$S=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=zS[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Hf{constructor(e){this.name=e,this._logLevel=BS,this._logHandler=$S,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in oe))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?FS[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,oe.DEBUG,...e),this._logHandler(this,oe.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,oe.VERBOSE,...e),this._logHandler(this,oe.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,oe.INFO,...e),this._logHandler(this,oe.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,oe.WARN,...e),this._logHandler(this,oe.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,oe.ERROR,...e),this._logHandler(this,oe.ERROR,...e)}}const HS=(t,e)=>e.some(n=>t instanceof n);let dy,hy;function WS(){return dy||(dy=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function qS(){return hy||(hy=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const _w=new WeakMap,_h=new WeakMap,ww=new WeakMap,ad=new WeakMap,Wf=new WeakMap;function KS(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(On(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&_w.set(n,t)}).catch(()=>{}),Wf.set(e,t),e}function GS(t){if(_h.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});_h.set(t,e)}let wh={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return _h.get(t);if(e==="objectStoreNames")return t.objectStoreNames||ww.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return On(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function QS(t){wh=t(wh)}function YS(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(ld(this),e,...n);return ww.set(r,e.sort?e.sort():[e]),On(r)}:qS().includes(t)?function(...e){return t.apply(ld(this),e),On(_w.get(this))}:function(...e){return On(t.apply(ld(this),e))}}function XS(t){return typeof t=="function"?YS(t):(t instanceof IDBTransaction&&GS(t),HS(t,WS())?new Proxy(t,wh):t)}function On(t){if(t instanceof IDBRequest)return KS(t);if(ad.has(t))return ad.get(t);const e=XS(t);return e!==t&&(ad.set(t,e),Wf.set(e,t)),e}const ld=t=>Wf.get(t);function ju(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),l=On(o);return r&&o.addEventListener("upgradeneeded",u=>{r(On(o.result),u.oldVersion,u.newVersion,On(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}function ud(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",r=>e(r.oldVersion,r)),On(n).then(()=>{})}const JS=["get","getKey","getAll","getAllKeys","count"],ZS=["put","add","delete","clear"],cd=new Map;function fy(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(cd.get(e))return cd.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=ZS.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||JS.includes(n)))return;const i=async function(o,...l){const u=this.transaction(o,s?"readwrite":"readonly");let c=u.store;return r&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),s&&u.done]))[0]};return cd.set(e,i),i}QS(t=>({...t,get:(e,n,r)=>fy(e,n)||t.get(e,n,r),has:(e,n)=>!!fy(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eA{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(tA(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function tA(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const xh="@firebase/app",py="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bn=new Hf("@firebase/app"),nA="@firebase/app-compat",rA="@firebase/analytics-compat",sA="@firebase/analytics",iA="@firebase/app-check-compat",oA="@firebase/app-check",aA="@firebase/auth",lA="@firebase/auth-compat",uA="@firebase/database",cA="@firebase/data-connect",dA="@firebase/database-compat",hA="@firebase/functions",fA="@firebase/functions-compat",pA="@firebase/installations",mA="@firebase/installations-compat",gA="@firebase/messaging",yA="@firebase/messaging-compat",vA="@firebase/performance",_A="@firebase/performance-compat",wA="@firebase/remote-config",xA="@firebase/remote-config-compat",EA="@firebase/storage",TA="@firebase/storage-compat",IA="@firebase/firestore",SA="@firebase/vertexai-preview",AA="@firebase/firestore-compat",kA="firebase",CA="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eh="[DEFAULT]",bA={[xh]:"fire-core",[nA]:"fire-core-compat",[sA]:"fire-analytics",[rA]:"fire-analytics-compat",[oA]:"fire-app-check",[iA]:"fire-app-check-compat",[aA]:"fire-auth",[lA]:"fire-auth-compat",[uA]:"fire-rtdb",[cA]:"fire-data-connect",[dA]:"fire-rtdb-compat",[hA]:"fire-fn",[fA]:"fire-fn-compat",[pA]:"fire-iid",[mA]:"fire-iid-compat",[gA]:"fire-fcm",[yA]:"fire-fcm-compat",[vA]:"fire-perf",[_A]:"fire-perf-compat",[wA]:"fire-rc",[xA]:"fire-rc-compat",[EA]:"fire-gcs",[TA]:"fire-gcs-compat",[IA]:"fire-fst",[AA]:"fire-fst-compat",[SA]:"fire-vertex","fire-js":"fire-js",[kA]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ql=new Map,RA=new Map,Th=new Map;function my(t,e){try{t.container.addComponent(e)}catch(n){Bn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function sn(t){const e=t.name;if(Th.has(e))return Bn.debug(`There were multiple attempts to register component ${e}.`),!1;Th.set(e,t);for(const n of Ql.values())my(n,t);for(const n of RA.values())my(n,t);return!0}function ms(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function hn(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NA={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ir=new ps("app","Firebase",NA);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PA{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Kt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ir.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gs=CA;function xw(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Eh,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Ir.create("bad-app-name",{appName:String(s)});if(n||(n=pw()),!n)throw Ir.create("no-options");const i=Ql.get(s);if(i){if(Gl(n,i.options)&&Gl(r,i.config))return i;throw Ir.create("duplicate-app",{appName:s})}const o=new US(s);for(const u of Th.values())o.addComponent(u);const l=new PA(n,r,o);return Ql.set(s,l),l}function Lu(t=Eh){const e=Ql.get(t);if(!e&&t===Eh&&pw())return xw();if(!e)throw Ir.create("no-app",{appName:t});return e}function kt(t,e,n){var r;let s=(r=bA[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Bn.warn(l.join(" "));return}sn(new Kt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DA="firebase-heartbeat-database",OA=1,Lo="firebase-heartbeat-store";let dd=null;function Ew(){return dd||(dd=ju(DA,OA,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Lo)}catch(n){console.warn(n)}}}}).catch(t=>{throw Ir.create("idb-open",{originalErrorMessage:t.message})})),dd}async function jA(t){try{const n=(await Ew()).transaction(Lo),r=await n.objectStore(Lo).get(Tw(t));return await n.done,r}catch(e){if(e instanceof ln)Bn.warn(e.message);else{const n=Ir.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Bn.warn(n.message)}}}async function gy(t,e){try{const r=(await Ew()).transaction(Lo,"readwrite");await r.objectStore(Lo).put(e,Tw(t)),await r.done}catch(n){if(n instanceof ln)Bn.warn(n.message);else{const r=Ir.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Bn.warn(r.message)}}}function Tw(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LA=1024,VA=30*24*60*60*1e3;class MA{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new FA(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=yy();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=VA}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Bn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=yy(),{heartbeatsToSend:r,unsentEntries:s}=UA(this._heartbeatsCache.heartbeats),i=Kl(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return Bn.warn(n),""}}}function yy(){return new Date().toISOString().substring(0,10)}function UA(t,e=LA){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),vy(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),vy(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class FA{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return yw()?vw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await jA(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return gy(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return gy(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function vy(t){return Kl(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BA(t){sn(new Kt("platform-logger",e=>new eA(e),"PRIVATE")),sn(new Kt("heartbeat",e=>new MA(e),"PRIVATE")),kt(xh,py,t),kt(xh,py,"esm2017"),kt("fire-js","")}BA("");function qf(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function Iw(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const zA=Iw,Sw=new ps("auth","Firebase",Iw());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yl=new Hf("@firebase/auth");function $A(t,...e){Yl.logLevel<=oe.WARN&&Yl.warn(`Auth (${gs}): ${t}`,...e)}function fl(t,...e){Yl.logLevel<=oe.ERROR&&Yl.error(`Auth (${gs}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(t,...e){throw Kf(t,...e)}function mn(t,...e){return Kf(t,...e)}function Aw(t,e,n){const r=Object.assign(Object.assign({},zA()),{[e]:n});return new ps("auth","Firebase",r).create(e,{appName:t.name})}function jn(t){return Aw(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Kf(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Sw.create(t,...e)}function X(t,e,...n){if(!t)throw Kf(e,...n)}function Rn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw fl(e),new Error(e)}function zn(t,e){t||Rn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ih(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function HA(){return _y()==="http:"||_y()==="https:"}function _y(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WA(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(HA()||IS()||"connection"in navigator)?navigator.onLine:!0}function qA(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo{constructor(e,n){this.shortDelay=e,this.longDelay=n,zn(n>e,"Short delay should be less than long delay!"),this.isMobile=xS()||SS()}get(){return WA()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gf(t,e){zn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kw{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Rn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Rn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Rn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KA={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GA=new Zo(3e4,6e4);function jr(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Qn(t,e,n,r,s={}){return Cw(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=Jo(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const c=Object.assign({method:e,headers:u},i);return TS()||(c.referrerPolicy="no-referrer"),kw.fetch()(bw(t,t.config.apiHost,n,l),c)})}async function Cw(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},KA),e);try{const s=new YA(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Qa(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[u,c]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Qa(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Qa(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw Qa(t,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Aw(t,f,c);on(t,f)}}catch(s){if(s instanceof ln)throw s;on(t,"network-request-failed",{message:String(s)})}}async function ea(t,e,n,r,s={}){const i=await Qn(t,e,n,r,s);return"mfaPendingCredential"in i&&on(t,"multi-factor-auth-required",{_serverResponse:i}),i}function bw(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Gf(t.config,s):`${t.config.apiScheme}://${s}`}function QA(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class YA{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(mn(this.auth,"network-request-failed")),GA.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Qa(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=mn(t,e,r);return s.customData._tokenResponse=n,s}function wy(t){return t!==void 0&&t.enterprise!==void 0}class XA{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return QA(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function JA(t,e){return Qn(t,"GET","/v2/recaptchaConfig",jr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ZA(t,e){return Qn(t,"POST","/v1/accounts:delete",e)}async function Rw(t,e){return Qn(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ho(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ek(t,e=!1){const n=Ae(t),r=await n.getIdToken(e),s=Qf(r);X(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:ho(hd(s.auth_time)),issuedAtTime:ho(hd(s.iat)),expirationTime:ho(hd(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function hd(t){return Number(t)*1e3}function Qf(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return fl("JWT malformed, contained fewer than 3 sections"),null;try{const s=dw(n);return s?JSON.parse(s):(fl("Failed to decode base64 JWT payload"),null)}catch(s){return fl("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function xy(t){const e=Qf(t);return X(e,"internal-error"),X(typeof e.exp<"u","internal-error"),X(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oi(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof ln&&tk(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function tk({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nk{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sh{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=ho(this.lastLoginAt),this.creationTime=ho(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xl(t){var e;const n=t.auth,r=await t.getIdToken(),s=await oi(t,Rw(n,{idToken:r}));X(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Nw(i.providerUserInfo):[],l=sk(t.providerData,o),u=t.isAnonymous,c=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),f=u?c:!1,m={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new Sh(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(t,m)}async function rk(t){const e=Ae(t);await Xl(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function sk(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Nw(t){return t.map(e=>{var{providerId:n}=e,r=qf(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ik(t,e){const n=await Cw(t,{},async()=>{const r=Jo({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=bw(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",kw.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function ok(t,e){return Qn(t,"POST","/v2/accounts:revokeToken",jr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){X(e.idToken,"internal-error"),X(typeof e.idToken<"u","internal-error"),X(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):xy(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){X(e.length!==0,"internal-error");const n=xy(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(X(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await ik(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Qs;return r&&(X(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(X(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(X(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Qs,this.toJSON())}_performRefresh(){return Rn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function er(t,e){X(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Nn{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=qf(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new nk(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Sh(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await oi(this,this.stsTokenManager.getToken(this.auth,e));return X(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return ek(this,e)}reload(){return rk(this)}_assign(e){this!==e&&(X(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Nn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){X(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Xl(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(hn(this.auth.app))return Promise.reject(jn(this.auth));const e=await this.getIdToken();return await oi(this,ZA(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,l,u,c,f;const m=(r=n.displayName)!==null&&r!==void 0?r:void 0,g=(s=n.email)!==null&&s!==void 0?s:void 0,k=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,C=(o=n.photoURL)!==null&&o!==void 0?o:void 0,N=(l=n.tenantId)!==null&&l!==void 0?l:void 0,P=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,A=(c=n.createdAt)!==null&&c!==void 0?c:void 0,_=(f=n.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:T,emailVerified:R,isAnonymous:L,providerData:V,stsTokenManager:w}=n;X(T&&w,e,"internal-error");const y=Qs.fromJSON(this.name,w);X(typeof T=="string",e,"internal-error"),er(m,e.name),er(g,e.name),X(typeof R=="boolean",e,"internal-error"),X(typeof L=="boolean",e,"internal-error"),er(k,e.name),er(C,e.name),er(N,e.name),er(P,e.name),er(A,e.name),er(_,e.name);const x=new Nn({uid:T,auth:e,email:g,emailVerified:R,displayName:m,isAnonymous:L,photoURL:C,phoneNumber:k,tenantId:N,stsTokenManager:y,createdAt:A,lastLoginAt:_});return V&&Array.isArray(V)&&(x.providerData=V.map(S=>Object.assign({},S))),P&&(x._redirectEventId=P),x}static async _fromIdTokenResponse(e,n,r=!1){const s=new Qs;s.updateFromServerResponse(n);const i=new Nn({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Xl(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];X(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Nw(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new Qs;l.updateFromIdToken(r);const u=new Nn({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Sh(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,c),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey=new Map;function Pn(t){zn(t instanceof Function,"Expected a class definition");let e=Ey.get(t);return e?(zn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Ey.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pw{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Pw.type="NONE";const Ty=Pw;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pl(t,e,n){return`firebase:${t}:${e}:${n}`}class Ys{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=pl(this.userKey,s.apiKey,i),this.fullPersistenceKey=pl("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Nn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Ys(Pn(Ty),e,r);const s=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let i=s[0]||Pn(Ty);const o=pl(r,e.config.apiKey,e.name);let l=null;for(const c of n)try{const f=await c._get(o);if(f){const m=Nn._fromJSON(e,f);c!==i&&(l=m),i=c;break}}catch{}const u=s.filter(c=>c._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Ys(i,e,r):(i=u[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async c=>{if(c!==i)try{await c._remove(o)}catch{}})),new Ys(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iy(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Lw(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Dw(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Mw(e))return"Blackberry";if(Uw(e))return"Webos";if(Ow(e))return"Safari";if((e.includes("chrome/")||jw(e))&&!e.includes("edge/"))return"Chrome";if(Vw(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Dw(t=ct()){return/firefox\//i.test(t)}function Ow(t=ct()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function jw(t=ct()){return/crios\//i.test(t)}function Lw(t=ct()){return/iemobile/i.test(t)}function Vw(t=ct()){return/android/i.test(t)}function Mw(t=ct()){return/blackberry/i.test(t)}function Uw(t=ct()){return/webos/i.test(t)}function Yf(t=ct()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function ak(t=ct()){var e;return Yf(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function lk(){return AS()&&document.documentMode===10}function Fw(t=ct()){return Yf(t)||Vw(t)||Uw(t)||Mw(t)||/windows phone/i.test(t)||Lw(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bw(t,e=[]){let n;switch(t){case"Browser":n=Iy(ct());break;case"Worker":n=`${Iy(ct())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${gs}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uk{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,l)=>{try{const u=e(i);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ck(t,e={}){return Qn(t,"GET","/v2/passwordPolicy",jr(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dk=6;class hk{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:dk,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fk{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Sy(this),this.idTokenSubscription=new Sy(this),this.beforeStateQueue=new uk(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Sw,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Pn(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Ys.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Rw(this,{idToken:e}),r=await Nn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(hn(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return X(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Xl(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=qA()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(hn(this.app))return Promise.reject(jn(this));const n=e?Ae(e):null;return n&&X(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&X(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return hn(this.app)?Promise.reject(jn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return hn(this.app)?Promise.reject(jn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Pn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ck(this),n=new hk(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ps("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await ok(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Pn(e)||this._popupRedirectResolver;X(n,this,"argument-error"),this.redirectPersistenceManager=await Ys.create(this,[Pn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(X(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return X(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Bw(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&$A(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function ys(t){return Ae(t)}class Sy{constructor(e){this.auth=e,this.observer=null,this.addObserver=DS(n=>this.observer=n)}get next(){return X(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function pk(t){Vu=t}function zw(t){return Vu.loadJS(t)}function mk(){return Vu.recaptchaEnterpriseScript}function gk(){return Vu.gapiScript}function yk(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const vk="recaptcha-enterprise",_k="NO_RECAPTCHA";class wk{constructor(e){this.type=vk,this.auth=ys(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,l)=>{JA(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const c=new XA(u);return i.tenantId==null?i._agentRecaptchaConfig=c:i._tenantRecaptchaConfigs[i.tenantId]=c,o(c.siteKey)}}).catch(u=>{l(u)})})}function s(i,o,l){const u=window.grecaptcha;wy(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(c=>{o(c)}).catch(()=>{o(_k)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{r(this.auth).then(l=>{if(!n&&wy(window.grecaptcha))s(l,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=mk();u.length!==0&&(u+=l),zw(u).then(()=>{s(l,i,o)}).catch(c=>{o(c)})}}).catch(l=>{o(l)})})}}async function Ay(t,e,n,r=!1){const s=new wk(t);let i;try{i=await s.verify(n)}catch{i=await s.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Ah(t,e,n,r){var s;if(!((s=t._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await Ay(t,e,n,n==="getOobCode");return r(t,i)}else return r(t,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await Ay(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(i)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xk(t,e){const n=ms(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Gl(i,e??{}))return s;on(s,"already-initialized")}return n.initialize({options:e})}function Ek(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Pn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Tk(t,e,n){const r=ys(t);X(r._canInitEmulator,r,"emulator-config-failed"),X(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=$w(e),{host:o,port:l}=Ik(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),Sk()}function $w(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Ik(t){const e=$w(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:ky(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:ky(o)}}}function ky(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Sk(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Rn("not implemented")}_getIdTokenResponse(e){return Rn("not implemented")}_linkToIdToken(e,n){return Rn("not implemented")}_getReauthenticationResolver(e){return Rn("not implemented")}}async function Ak(t,e){return Qn(t,"POST","/v1/accounts:update",e)}async function kk(t,e){return Qn(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ck(t,e){return ea(t,"POST","/v1/accounts:signInWithPassword",jr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bk(t,e){return ea(t,"POST","/v1/accounts:signInWithEmailLink",jr(t,e))}async function Rk(t,e){return ea(t,"POST","/v1/accounts:signInWithEmailLink",jr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo extends Xf{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new Vo(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Vo(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ah(e,n,"signInWithPassword",Ck);case"emailLink":return bk(e,{email:this._email,oobCode:this._password});default:on(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ah(e,r,"signUpPassword",kk);case"emailLink":return Rk(e,{idToken:n,email:this._email,oobCode:this._password});default:on(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xs(t,e){return ea(t,"POST","/v1/accounts:signInWithIdp",jr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nk="http://localhost";class rs extends Xf{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new rs(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):on("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=qf(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new rs(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Xs(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Xs(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Xs(e,n)}buildRequest(){const e={requestUri:Nk,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Jo(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pk(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Dk(t){const e=Yi(Xi(t)).link,n=e?Yi(Xi(e)).deep_link_id:null,r=Yi(Xi(t)).deep_link_id;return(r?Yi(Xi(r)).link:null)||r||n||e||t}class Jf{constructor(e){var n,r,s,i,o,l;const u=Yi(Xi(e)),c=(n=u.apiKey)!==null&&n!==void 0?n:null,f=(r=u.oobCode)!==null&&r!==void 0?r:null,m=Pk((s=u.mode)!==null&&s!==void 0?s:null);X(c&&f&&m,"argument-error"),this.apiKey=c,this.operation=m,this.code=f,this.continueUrl=(i=u.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(l=u.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const n=Dk(e);try{return new Jf(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(){this.providerId=wi.PROVIDER_ID}static credential(e,n){return Vo._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Jf.parseLink(n);return X(r,"argument-error"),Vo._fromEmailAndCode(e,r.code,r.tenantId)}}wi.PROVIDER_ID="password";wi.EMAIL_PASSWORD_SIGN_IN_METHOD="password";wi.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hw{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta extends Hw{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or extends ta{constructor(){super("facebook.com")}static credential(e){return rs._fromParams({providerId:or.PROVIDER_ID,signInMethod:or.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return or.credentialFromTaggedObject(e)}static credentialFromError(e){return or.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return or.credential(e.oauthAccessToken)}catch{return null}}}or.FACEBOOK_SIGN_IN_METHOD="facebook.com";or.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar extends ta{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return rs._fromParams({providerId:ar.PROVIDER_ID,signInMethod:ar.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return ar.credentialFromTaggedObject(e)}static credentialFromError(e){return ar.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return ar.credential(n,r)}catch{return null}}}ar.GOOGLE_SIGN_IN_METHOD="google.com";ar.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr extends ta{constructor(){super("github.com")}static credential(e){return rs._fromParams({providerId:lr.PROVIDER_ID,signInMethod:lr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return lr.credentialFromTaggedObject(e)}static credentialFromError(e){return lr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return lr.credential(e.oauthAccessToken)}catch{return null}}}lr.GITHUB_SIGN_IN_METHOD="github.com";lr.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur extends ta{constructor(){super("twitter.com")}static credential(e,n){return rs._fromParams({providerId:ur.PROVIDER_ID,signInMethod:ur.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return ur.credentialFromTaggedObject(e)}static credentialFromError(e){return ur.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return ur.credential(n,r)}catch{return null}}}ur.TWITTER_SIGN_IN_METHOD="twitter.com";ur.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ok(t,e){return ea(t,"POST","/v1/accounts:signUp",jr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await Nn._fromIdTokenResponse(e,r,s),o=Cy(r);return new ss({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Cy(r);return new ss({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Cy(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl extends ln{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Jl.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Jl(e,n,r,s)}}function Ww(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Jl._fromErrorAndOperation(t,i,e,r):i})}async function jk(t,e,n=!1){const r=await oi(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ss._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lk(t,e,n=!1){const{auth:r}=t;if(hn(r.app))return Promise.reject(jn(r));const s="reauthenticate";try{const i=await oi(t,Ww(r,s,e,t),n);X(i.idToken,r,"internal-error");const o=Qf(i.idToken);X(o,r,"internal-error");const{sub:l}=o;return X(t.uid===l,r,"user-mismatch"),ss._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&on(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qw(t,e,n=!1){if(hn(t.app))return Promise.reject(jn(t));const r="signIn",s=await Ww(t,r,e),i=await ss._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function Vk(t,e){return qw(ys(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Kw(t){const e=ys(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Gw(t,e,n){if(hn(t.app))return Promise.reject(jn(t));const r=ys(t),o=await Ah(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Ok).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Kw(t),u}),l=await ss._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(l.user),l}function Mk(t,e,n){return hn(t.app)?Promise.reject(jn(t)):Vk(Ae(t),wi.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Kw(t),r})}function Uk(t,e){return Fk(Ae(t),null,e)}async function Fk(t,e,n){const{auth:r}=t,i={idToken:await t.getIdToken(),returnSecureToken:!0};n&&(i.password=n);const o=await oi(t,Ak(r,i));await t._updateTokensIfNecessary(o,!0)}function Bk(t,e,n,r){return Ae(t).onIdTokenChanged(e,n,r)}function zk(t,e,n){return Ae(t).beforeAuthStateChanged(e,n)}function Mu(t,e,n,r){return Ae(t).onAuthStateChanged(e,n,r)}function $k(t){return Ae(t).signOut()}const Zl="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Zl,"1"),this.storage.removeItem(Zl),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hk=1e3,Wk=10;class Yw extends Qw{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Fw(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);lk()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Wk):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Hk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Yw.type="LOCAL";const qk=Yw;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xw extends Qw{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Xw.type="SESSION";const Jw=Xw;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kk(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uu{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Uu(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async c=>c(n.origin,i)),u=await Kk(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Uu.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zf(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gk{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,u)=>{const c=Zf("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(m){const g=m;if(g.data.eventId===c)switch(g.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(g.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(){return window}function Qk(t){gn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zw(){return typeof gn().WorkerGlobalScope<"u"&&typeof gn().importScripts=="function"}async function Yk(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Xk(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Jk(){return Zw()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e1="firebaseLocalStorageDb",Zk=1,eu="firebaseLocalStorage",t1="fbase_key";class na{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Fu(t,e){return t.transaction([eu],e?"readwrite":"readonly").objectStore(eu)}function eC(){const t=indexedDB.deleteDatabase(e1);return new na(t).toPromise()}function kh(){const t=indexedDB.open(e1,Zk);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(eu,{keyPath:t1})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(eu)?e(r):(r.close(),await eC(),e(await kh()))})})}async function by(t,e,n){const r=Fu(t,!0).put({[t1]:e,value:n});return new na(r).toPromise()}async function tC(t,e){const n=Fu(t,!1).get(e),r=await new na(n).toPromise();return r===void 0?null:r.value}function Ry(t,e){const n=Fu(t,!0).delete(e);return new na(n).toPromise()}const nC=800,rC=3;class n1{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await kh(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>rC)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Zw()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Uu._getInstance(Jk()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Yk(),!this.activeServiceWorker)return;this.sender=new Gk(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Xk()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await kh();return await by(e,Zl,"1"),await Ry(e,Zl),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>by(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>tC(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Ry(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Fu(s,!1).getAll();return new na(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),nC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}n1.type="LOCAL";const sC=n1;new Zo(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iC(t,e){return e?Pn(e):(X(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep extends Xf{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Xs(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Xs(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Xs(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function oC(t){return qw(t.auth,new ep(t),t.bypassAuthState)}function aC(t){const{auth:e,user:n}=t;return X(n,e,"internal-error"),Lk(n,new ep(t),t.bypassAuthState)}async function lC(t){const{auth:e,user:n}=t;return X(n,e,"internal-error"),jk(n,new ep(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r1{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return oC;case"linkViaPopup":case"linkViaRedirect":return lC;case"reauthViaPopup":case"reauthViaRedirect":return aC;default:on(this.auth,"internal-error")}}resolve(e){zn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){zn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uC=new Zo(2e3,1e4);class zs extends r1{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,zs.currentPopupAction&&zs.currentPopupAction.cancel(),zs.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return X(e,this.auth,"internal-error"),e}async onExecution(){zn(this.filter.length===1,"Popup operations only handle one event");const e=Zf();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(mn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(mn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,zs.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(mn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,uC.get())};e()}}zs.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cC="pendingRedirect",ml=new Map;class dC extends r1{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=ml.get(this.auth._key());if(!e){try{const r=await hC(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}ml.set(this.auth._key(),e)}return this.bypassAuthState||ml.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function hC(t,e){const n=mC(e),r=pC(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function fC(t,e){ml.set(t._key(),e)}function pC(t){return Pn(t._redirectPersistence)}function mC(t){return pl(cC,t.config.apiKey,t.name)}async function gC(t,e,n=!1){if(hn(t.app))return Promise.reject(jn(t));const r=ys(t),s=iC(r,e),o=await new dC(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yC=10*60*1e3;class vC{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!_C(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!s1(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(mn(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=yC&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ny(e))}saveEventToCache(e){this.cachedEventUids.add(Ny(e)),this.lastProcessedEventTime=Date.now()}}function Ny(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function s1({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function _C(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return s1(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wC(t,e={}){return Qn(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xC=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,EC=/^https?/;async function TC(t){if(t.config.emulator)return;const{authorizedDomains:e}=await wC(t);for(const n of e)try{if(IC(n))return}catch{}on(t,"unauthorized-domain")}function IC(t){const e=Ih(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!EC.test(n))return!1;if(xC.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SC=new Zo(3e4,6e4);function Py(){const t=gn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function AC(t){return new Promise((e,n)=>{var r,s,i;function o(){Py(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Py(),n(mn(t,"network-request-failed"))},timeout:SC.get()})}if(!((s=(r=gn().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=gn().gapi)===null||i===void 0)&&i.load)o();else{const l=yk("iframefcb");return gn()[l]=()=>{gapi.load?o():n(mn(t,"network-request-failed"))},zw(`${gk()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw gl=null,e})}let gl=null;function kC(t){return gl=gl||AC(t),gl}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CC=new Zo(5e3,15e3),bC="__/auth/iframe",RC="emulator/auth/iframe",NC={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},PC=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function DC(t){const e=t.config;X(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Gf(e,RC):`https://${t.config.authDomain}/${bC}`,r={apiKey:e.apiKey,appName:t.name,v:gs},s=PC.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${Jo(r).slice(1)}`}async function OC(t){const e=await kC(t),n=gn().gapi;return X(n,t,"internal-error"),e.open({where:document.body,url:DC(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:NC,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=mn(t,"network-request-failed"),l=gn().setTimeout(()=>{i(o)},CC.get());function u(){gn().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jC={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},LC=500,VC=600,MC="_blank",UC="http://localhost";class Dy{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function FC(t,e,n,r=LC,s=VC){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},jC),{width:r.toString(),height:s.toString(),top:i,left:o}),c=ct().toLowerCase();n&&(l=jw(c)?MC:n),Dw(c)&&(e=e||UC,u.scrollbars="yes");const f=Object.entries(u).reduce((g,[k,C])=>`${g}${k}=${C},`,"");if(ak(c)&&l!=="_self")return BC(e||"",l),new Dy(null);const m=window.open(e||"",l,f);X(m,t,"popup-blocked");try{m.focus()}catch{}return new Dy(m)}function BC(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zC="__/auth/handler",$C="emulator/auth/handler",HC=encodeURIComponent("fac");async function Oy(t,e,n,r,s,i){X(t.config.authDomain,t,"auth-domain-config-required"),X(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:gs,eventId:s};if(e instanceof Hw){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",PS(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))o[f]=m}if(e instanceof ta){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(o.scopes=f.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await t._getAppCheckToken(),c=u?`#${HC}=${encodeURIComponent(u)}`:"";return`${WC(t)}?${Jo(l).slice(1)}${c}`}function WC({config:t}){return t.emulator?Gf(t,$C):`https://${t.authDomain}/${zC}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fd="webStorageSupport";class qC{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Jw,this._completeRedirectFn=gC,this._overrideRedirectResult=fC}async _openPopup(e,n,r,s){var i;zn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Oy(e,n,r,Ih(),s);return FC(e,o,Zf())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await Oy(e,n,r,Ih(),s);return Qk(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(zn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await OC(e),r=new vC(e);return n.register("authEvent",s=>(X(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(fd,{type:fd},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[fd];o!==void 0&&n(!!o),on(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=TC(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Fw()||Ow()||Yf()}}const KC=qC;var jy="@firebase/auth",Ly="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GC{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){X(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QC(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function YC(t){sn(new Kt("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;X(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Bw(t)},c=new fk(r,s,i,u);return Ek(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),sn(new Kt("auth-internal",e=>{const n=ys(e.getProvider("auth").getImmediate());return(r=>new GC(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),kt(jy,Ly,QC(t)),kt(jy,Ly,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XC=5*60,JC=mw("authIdTokenMaxAge")||XC;let Vy=null;const ZC=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>JC)return;const s=n==null?void 0:n.token;Vy!==s&&(Vy=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function eb(t=Lu()){const e=ms(t,"auth");if(e.isInitialized())return e.getImmediate();const n=xk(t,{popupRedirectResolver:KC,persistence:[sC,qk,Jw]}),r=mw("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=ZC(i.toString());zk(n,o,()=>o(n.currentUser)),Bk(n,l=>o(l))}}const s=hw("auth");return s&&Tk(n,`http://${s}`),n}function tb(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}pk({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=mn("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",tb().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});YC("Browser");var My=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Xr,i1;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,y){function x(){}x.prototype=y.prototype,w.D=y.prototype,w.prototype=new x,w.prototype.constructor=w,w.C=function(S,I,b){for(var E=Array(arguments.length-2),J=2;J<arguments.length;J++)E[J-2]=arguments[J];return y.prototype[I].apply(S,E)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(w,y,x){x||(x=0);var S=Array(16);if(typeof y=="string")for(var I=0;16>I;++I)S[I]=y.charCodeAt(x++)|y.charCodeAt(x++)<<8|y.charCodeAt(x++)<<16|y.charCodeAt(x++)<<24;else for(I=0;16>I;++I)S[I]=y[x++]|y[x++]<<8|y[x++]<<16|y[x++]<<24;y=w.g[0],x=w.g[1],I=w.g[2];var b=w.g[3],E=y+(b^x&(I^b))+S[0]+3614090360&4294967295;y=x+(E<<7&4294967295|E>>>25),E=b+(I^y&(x^I))+S[1]+3905402710&4294967295,b=y+(E<<12&4294967295|E>>>20),E=I+(x^b&(y^x))+S[2]+606105819&4294967295,I=b+(E<<17&4294967295|E>>>15),E=x+(y^I&(b^y))+S[3]+3250441966&4294967295,x=I+(E<<22&4294967295|E>>>10),E=y+(b^x&(I^b))+S[4]+4118548399&4294967295,y=x+(E<<7&4294967295|E>>>25),E=b+(I^y&(x^I))+S[5]+1200080426&4294967295,b=y+(E<<12&4294967295|E>>>20),E=I+(x^b&(y^x))+S[6]+2821735955&4294967295,I=b+(E<<17&4294967295|E>>>15),E=x+(y^I&(b^y))+S[7]+4249261313&4294967295,x=I+(E<<22&4294967295|E>>>10),E=y+(b^x&(I^b))+S[8]+1770035416&4294967295,y=x+(E<<7&4294967295|E>>>25),E=b+(I^y&(x^I))+S[9]+2336552879&4294967295,b=y+(E<<12&4294967295|E>>>20),E=I+(x^b&(y^x))+S[10]+4294925233&4294967295,I=b+(E<<17&4294967295|E>>>15),E=x+(y^I&(b^y))+S[11]+2304563134&4294967295,x=I+(E<<22&4294967295|E>>>10),E=y+(b^x&(I^b))+S[12]+1804603682&4294967295,y=x+(E<<7&4294967295|E>>>25),E=b+(I^y&(x^I))+S[13]+4254626195&4294967295,b=y+(E<<12&4294967295|E>>>20),E=I+(x^b&(y^x))+S[14]+2792965006&4294967295,I=b+(E<<17&4294967295|E>>>15),E=x+(y^I&(b^y))+S[15]+1236535329&4294967295,x=I+(E<<22&4294967295|E>>>10),E=y+(I^b&(x^I))+S[1]+4129170786&4294967295,y=x+(E<<5&4294967295|E>>>27),E=b+(x^I&(y^x))+S[6]+3225465664&4294967295,b=y+(E<<9&4294967295|E>>>23),E=I+(y^x&(b^y))+S[11]+643717713&4294967295,I=b+(E<<14&4294967295|E>>>18),E=x+(b^y&(I^b))+S[0]+3921069994&4294967295,x=I+(E<<20&4294967295|E>>>12),E=y+(I^b&(x^I))+S[5]+3593408605&4294967295,y=x+(E<<5&4294967295|E>>>27),E=b+(x^I&(y^x))+S[10]+38016083&4294967295,b=y+(E<<9&4294967295|E>>>23),E=I+(y^x&(b^y))+S[15]+3634488961&4294967295,I=b+(E<<14&4294967295|E>>>18),E=x+(b^y&(I^b))+S[4]+3889429448&4294967295,x=I+(E<<20&4294967295|E>>>12),E=y+(I^b&(x^I))+S[9]+568446438&4294967295,y=x+(E<<5&4294967295|E>>>27),E=b+(x^I&(y^x))+S[14]+3275163606&4294967295,b=y+(E<<9&4294967295|E>>>23),E=I+(y^x&(b^y))+S[3]+4107603335&4294967295,I=b+(E<<14&4294967295|E>>>18),E=x+(b^y&(I^b))+S[8]+1163531501&4294967295,x=I+(E<<20&4294967295|E>>>12),E=y+(I^b&(x^I))+S[13]+2850285829&4294967295,y=x+(E<<5&4294967295|E>>>27),E=b+(x^I&(y^x))+S[2]+4243563512&4294967295,b=y+(E<<9&4294967295|E>>>23),E=I+(y^x&(b^y))+S[7]+1735328473&4294967295,I=b+(E<<14&4294967295|E>>>18),E=x+(b^y&(I^b))+S[12]+2368359562&4294967295,x=I+(E<<20&4294967295|E>>>12),E=y+(x^I^b)+S[5]+4294588738&4294967295,y=x+(E<<4&4294967295|E>>>28),E=b+(y^x^I)+S[8]+2272392833&4294967295,b=y+(E<<11&4294967295|E>>>21),E=I+(b^y^x)+S[11]+1839030562&4294967295,I=b+(E<<16&4294967295|E>>>16),E=x+(I^b^y)+S[14]+4259657740&4294967295,x=I+(E<<23&4294967295|E>>>9),E=y+(x^I^b)+S[1]+2763975236&4294967295,y=x+(E<<4&4294967295|E>>>28),E=b+(y^x^I)+S[4]+1272893353&4294967295,b=y+(E<<11&4294967295|E>>>21),E=I+(b^y^x)+S[7]+4139469664&4294967295,I=b+(E<<16&4294967295|E>>>16),E=x+(I^b^y)+S[10]+3200236656&4294967295,x=I+(E<<23&4294967295|E>>>9),E=y+(x^I^b)+S[13]+681279174&4294967295,y=x+(E<<4&4294967295|E>>>28),E=b+(y^x^I)+S[0]+3936430074&4294967295,b=y+(E<<11&4294967295|E>>>21),E=I+(b^y^x)+S[3]+3572445317&4294967295,I=b+(E<<16&4294967295|E>>>16),E=x+(I^b^y)+S[6]+76029189&4294967295,x=I+(E<<23&4294967295|E>>>9),E=y+(x^I^b)+S[9]+3654602809&4294967295,y=x+(E<<4&4294967295|E>>>28),E=b+(y^x^I)+S[12]+3873151461&4294967295,b=y+(E<<11&4294967295|E>>>21),E=I+(b^y^x)+S[15]+530742520&4294967295,I=b+(E<<16&4294967295|E>>>16),E=x+(I^b^y)+S[2]+3299628645&4294967295,x=I+(E<<23&4294967295|E>>>9),E=y+(I^(x|~b))+S[0]+4096336452&4294967295,y=x+(E<<6&4294967295|E>>>26),E=b+(x^(y|~I))+S[7]+1126891415&4294967295,b=y+(E<<10&4294967295|E>>>22),E=I+(y^(b|~x))+S[14]+2878612391&4294967295,I=b+(E<<15&4294967295|E>>>17),E=x+(b^(I|~y))+S[5]+4237533241&4294967295,x=I+(E<<21&4294967295|E>>>11),E=y+(I^(x|~b))+S[12]+1700485571&4294967295,y=x+(E<<6&4294967295|E>>>26),E=b+(x^(y|~I))+S[3]+2399980690&4294967295,b=y+(E<<10&4294967295|E>>>22),E=I+(y^(b|~x))+S[10]+4293915773&4294967295,I=b+(E<<15&4294967295|E>>>17),E=x+(b^(I|~y))+S[1]+2240044497&4294967295,x=I+(E<<21&4294967295|E>>>11),E=y+(I^(x|~b))+S[8]+1873313359&4294967295,y=x+(E<<6&4294967295|E>>>26),E=b+(x^(y|~I))+S[15]+4264355552&4294967295,b=y+(E<<10&4294967295|E>>>22),E=I+(y^(b|~x))+S[6]+2734768916&4294967295,I=b+(E<<15&4294967295|E>>>17),E=x+(b^(I|~y))+S[13]+1309151649&4294967295,x=I+(E<<21&4294967295|E>>>11),E=y+(I^(x|~b))+S[4]+4149444226&4294967295,y=x+(E<<6&4294967295|E>>>26),E=b+(x^(y|~I))+S[11]+3174756917&4294967295,b=y+(E<<10&4294967295|E>>>22),E=I+(y^(b|~x))+S[2]+718787259&4294967295,I=b+(E<<15&4294967295|E>>>17),E=x+(b^(I|~y))+S[9]+3951481745&4294967295,w.g[0]=w.g[0]+y&4294967295,w.g[1]=w.g[1]+(I+(E<<21&4294967295|E>>>11))&4294967295,w.g[2]=w.g[2]+I&4294967295,w.g[3]=w.g[3]+b&4294967295}r.prototype.u=function(w,y){y===void 0&&(y=w.length);for(var x=y-this.blockSize,S=this.B,I=this.h,b=0;b<y;){if(I==0)for(;b<=x;)s(this,w,b),b+=this.blockSize;if(typeof w=="string"){for(;b<y;)if(S[I++]=w.charCodeAt(b++),I==this.blockSize){s(this,S),I=0;break}}else for(;b<y;)if(S[I++]=w[b++],I==this.blockSize){s(this,S),I=0;break}}this.h=I,this.o+=y},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var y=1;y<w.length-8;++y)w[y]=0;var x=8*this.o;for(y=w.length-8;y<w.length;++y)w[y]=x&255,x/=256;for(this.u(w),w=Array(16),y=x=0;4>y;++y)for(var S=0;32>S;S+=8)w[x++]=this.g[y]>>>S&255;return w};function i(w,y){var x=l;return Object.prototype.hasOwnProperty.call(x,w)?x[w]:x[w]=y(w)}function o(w,y){this.h=y;for(var x=[],S=!0,I=w.length-1;0<=I;I--){var b=w[I]|0;S&&b==y||(x[I]=b,S=!1)}this.g=x}var l={};function u(w){return-128<=w&&128>w?i(w,function(y){return new o([y|0],0>y?-1:0)}):new o([w|0],0>w?-1:0)}function c(w){if(isNaN(w)||!isFinite(w))return m;if(0>w)return P(c(-w));for(var y=[],x=1,S=0;w>=x;S++)y[S]=w/x|0,x*=4294967296;return new o(y,0)}function f(w,y){if(w.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(w.charAt(0)=="-")return P(f(w.substring(1),y));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var x=c(Math.pow(y,8)),S=m,I=0;I<w.length;I+=8){var b=Math.min(8,w.length-I),E=parseInt(w.substring(I,I+b),y);8>b?(b=c(Math.pow(y,b)),S=S.j(b).add(c(E))):(S=S.j(x),S=S.add(c(E)))}return S}var m=u(0),g=u(1),k=u(16777216);t=o.prototype,t.m=function(){if(N(this))return-P(this).m();for(var w=0,y=1,x=0;x<this.g.length;x++){var S=this.i(x);w+=(0<=S?S:4294967296+S)*y,y*=4294967296}return w},t.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(C(this))return"0";if(N(this))return"-"+P(this).toString(w);for(var y=c(Math.pow(w,6)),x=this,S="";;){var I=R(x,y).g;x=A(x,I.j(y));var b=((0<x.g.length?x.g[0]:x.h)>>>0).toString(w);if(x=I,C(x))return b+S;for(;6>b.length;)b="0"+b;S=b+S}},t.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function C(w){if(w.h!=0)return!1;for(var y=0;y<w.g.length;y++)if(w.g[y]!=0)return!1;return!0}function N(w){return w.h==-1}t.l=function(w){return w=A(this,w),N(w)?-1:C(w)?0:1};function P(w){for(var y=w.g.length,x=[],S=0;S<y;S++)x[S]=~w.g[S];return new o(x,~w.h).add(g)}t.abs=function(){return N(this)?P(this):this},t.add=function(w){for(var y=Math.max(this.g.length,w.g.length),x=[],S=0,I=0;I<=y;I++){var b=S+(this.i(I)&65535)+(w.i(I)&65535),E=(b>>>16)+(this.i(I)>>>16)+(w.i(I)>>>16);S=E>>>16,b&=65535,E&=65535,x[I]=E<<16|b}return new o(x,x[x.length-1]&-2147483648?-1:0)};function A(w,y){return w.add(P(y))}t.j=function(w){if(C(this)||C(w))return m;if(N(this))return N(w)?P(this).j(P(w)):P(P(this).j(w));if(N(w))return P(this.j(P(w)));if(0>this.l(k)&&0>w.l(k))return c(this.m()*w.m());for(var y=this.g.length+w.g.length,x=[],S=0;S<2*y;S++)x[S]=0;for(S=0;S<this.g.length;S++)for(var I=0;I<w.g.length;I++){var b=this.i(S)>>>16,E=this.i(S)&65535,J=w.i(I)>>>16,ae=w.i(I)&65535;x[2*S+2*I]+=E*ae,_(x,2*S+2*I),x[2*S+2*I+1]+=b*ae,_(x,2*S+2*I+1),x[2*S+2*I+1]+=E*J,_(x,2*S+2*I+1),x[2*S+2*I+2]+=b*J,_(x,2*S+2*I+2)}for(S=0;S<y;S++)x[S]=x[2*S+1]<<16|x[2*S];for(S=y;S<2*y;S++)x[S]=0;return new o(x,0)};function _(w,y){for(;(w[y]&65535)!=w[y];)w[y+1]+=w[y]>>>16,w[y]&=65535,y++}function T(w,y){this.g=w,this.h=y}function R(w,y){if(C(y))throw Error("division by zero");if(C(w))return new T(m,m);if(N(w))return y=R(P(w),y),new T(P(y.g),P(y.h));if(N(y))return y=R(w,P(y)),new T(P(y.g),y.h);if(30<w.g.length){if(N(w)||N(y))throw Error("slowDivide_ only works with positive integers.");for(var x=g,S=y;0>=S.l(w);)x=L(x),S=L(S);var I=V(x,1),b=V(S,1);for(S=V(S,2),x=V(x,2);!C(S);){var E=b.add(S);0>=E.l(w)&&(I=I.add(x),b=E),S=V(S,1),x=V(x,1)}return y=A(w,I.j(y)),new T(I,y)}for(I=m;0<=w.l(y);){for(x=Math.max(1,Math.floor(w.m()/y.m())),S=Math.ceil(Math.log(x)/Math.LN2),S=48>=S?1:Math.pow(2,S-48),b=c(x),E=b.j(y);N(E)||0<E.l(w);)x-=S,b=c(x),E=b.j(y);C(b)&&(b=g),I=I.add(b),w=A(w,E)}return new T(I,w)}t.A=function(w){return R(this,w).h},t.and=function(w){for(var y=Math.max(this.g.length,w.g.length),x=[],S=0;S<y;S++)x[S]=this.i(S)&w.i(S);return new o(x,this.h&w.h)},t.or=function(w){for(var y=Math.max(this.g.length,w.g.length),x=[],S=0;S<y;S++)x[S]=this.i(S)|w.i(S);return new o(x,this.h|w.h)},t.xor=function(w){for(var y=Math.max(this.g.length,w.g.length),x=[],S=0;S<y;S++)x[S]=this.i(S)^w.i(S);return new o(x,this.h^w.h)};function L(w){for(var y=w.g.length+1,x=[],S=0;S<y;S++)x[S]=w.i(S)<<1|w.i(S-1)>>>31;return new o(x,w.h)}function V(w,y){var x=y>>5;y%=32;for(var S=w.g.length-x,I=[],b=0;b<S;b++)I[b]=0<y?w.i(b+x)>>>y|w.i(b+x+1)<<32-y:w.i(b+x);return new o(I,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,i1=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=f,Xr=o}).apply(typeof My<"u"?My:typeof self<"u"?self:typeof window<"u"?window:{});var Ya=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var o1,Ji,a1,yl,Ch,l1,u1,c1;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,h,p){return a==Array.prototype||a==Object.prototype||(a[h]=p.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ya=="object"&&Ya];for(var h=0;h<a.length;++h){var p=a[h];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var r=n(this);function s(a,h){if(h)e:{var p=r;a=a.split(".");for(var v=0;v<a.length-1;v++){var D=a[v];if(!(D in p))break e;p=p[D]}a=a[a.length-1],v=p[a],h=h(v),h!=v&&h!=null&&e(p,a,{configurable:!0,writable:!0,value:h})}}function i(a,h){a instanceof String&&(a+="");var p=0,v=!1,D={next:function(){if(!v&&p<a.length){var j=p++;return{value:h(j,a[j]),done:!1}}return v=!0,{done:!0,value:void 0}}};return D[Symbol.iterator]=function(){return D},D}s("Array.prototype.values",function(a){return a||function(){return i(this,function(h,p){return p})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(a){var h=typeof a;return h=h!="object"?h:a?Array.isArray(a)?"array":h:"null",h=="array"||h=="object"&&typeof a.length=="number"}function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function f(a,h,p){return a.call.apply(a.bind,arguments)}function m(a,h,p){if(!a)throw Error();if(2<arguments.length){var v=Array.prototype.slice.call(arguments,2);return function(){var D=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(D,v),a.apply(h,D)}}return function(){return a.apply(h,arguments)}}function g(a,h,p){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,g.apply(null,arguments)}function k(a,h){var p=Array.prototype.slice.call(arguments,1);return function(){var v=p.slice();return v.push.apply(v,arguments),a.apply(this,v)}}function C(a,h){function p(){}p.prototype=h.prototype,a.aa=h.prototype,a.prototype=new p,a.prototype.constructor=a,a.Qb=function(v,D,j){for(var $=Array(arguments.length-2),me=2;me<arguments.length;me++)$[me-2]=arguments[me];return h.prototype[D].apply(v,$)}}function N(a){const h=a.length;if(0<h){const p=Array(h);for(let v=0;v<h;v++)p[v]=a[v];return p}return[]}function P(a,h){for(let p=1;p<arguments.length;p++){const v=arguments[p];if(u(v)){const D=a.length||0,j=v.length||0;a.length=D+j;for(let $=0;$<j;$++)a[D+$]=v[$]}else a.push(v)}}class A{constructor(h,p){this.i=h,this.j=p,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function _(a){return/^[\s\xa0]*$/.test(a)}function T(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function R(a){return R[" "](a),a}R[" "]=function(){};var L=T().indexOf("Gecko")!=-1&&!(T().toLowerCase().indexOf("webkit")!=-1&&T().indexOf("Edge")==-1)&&!(T().indexOf("Trident")!=-1||T().indexOf("MSIE")!=-1)&&T().indexOf("Edge")==-1;function V(a,h,p){for(const v in a)h.call(p,a[v],v,a)}function w(a,h){for(const p in a)h.call(void 0,a[p],p,a)}function y(a){const h={};for(const p in a)h[p]=a[p];return h}const x="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function S(a,h){let p,v;for(let D=1;D<arguments.length;D++){v=arguments[D];for(p in v)a[p]=v[p];for(let j=0;j<x.length;j++)p=x[j],Object.prototype.hasOwnProperty.call(v,p)&&(a[p]=v[p])}}function I(a){var h=1;a=a.split(":");const p=[];for(;0<h&&a.length;)p.push(a.shift()),h--;return a.length&&p.push(a.join(":")),p}function b(a){l.setTimeout(()=>{throw a},0)}function E(){var a=K;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class J{constructor(){this.h=this.g=null}add(h,p){const v=ae.get();v.set(h,p),this.h?this.h.next=v:this.g=v,this.h=v}}var ae=new A(()=>new se,a=>a.reset());class se{constructor(){this.next=this.g=this.h=null}set(h,p){this.h=h,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let Re,z=!1,K=new J,U=()=>{const a=l.Promise.resolve(void 0);Re=()=>{a.then(q)}};var q=()=>{for(var a;a=E();){try{a.h.call(a.g)}catch(p){b(p)}var h=ae;h.j(a),100>h.h&&(h.h++,a.next=h.g,h.g=a)}z=!1};function Q(){this.s=this.s,this.C=this.C}Q.prototype.s=!1,Q.prototype.ma=function(){this.s||(this.s=!0,this.N())},Q.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ne(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}ne.prototype.h=function(){this.defaultPrevented=!0};var dt=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const p=()=>{};l.addEventListener("test",p,h),l.removeEventListener("test",p,h)}catch{}return a}();function Je(a,h){if(ne.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var p=this.type=a.type,v=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget){if(L){e:{try{R(h.nodeName);var D=!0;break e}catch{}D=!1}D||(h=null)}}else p=="mouseover"?h=a.fromElement:p=="mouseout"&&(h=a.toElement);this.relatedTarget=h,v?(this.clientX=v.clientX!==void 0?v.clientX:v.pageX,this.clientY=v.clientY!==void 0?v.clientY:v.pageY,this.screenX=v.screenX||0,this.screenY=v.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Ee[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Je.aa.h.call(this)}}C(Je,ne);var Ee={2:"touch",3:"pen",4:"mouse"};Je.prototype.h=function(){Je.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Gt="closure_listenable_"+(1e6*Math.random()|0),lc=0;function uc(a,h,p,v,D){this.listener=a,this.proxy=null,this.src=h,this.type=p,this.capture=!!v,this.ha=D,this.key=++lc,this.da=this.fa=!1}function pa(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function ma(a){this.src=a,this.g={},this.h=0}ma.prototype.add=function(a,h,p,v,D){var j=a.toString();a=this.g[j],a||(a=this.g[j]=[],this.h++);var $=dc(a,h,v,D);return-1<$?(h=a[$],p||(h.fa=!1)):(h=new uc(h,this.src,j,!!v,D),h.fa=p,a.push(h)),h};function cc(a,h){var p=h.type;if(p in a.g){var v=a.g[p],D=Array.prototype.indexOf.call(v,h,void 0),j;(j=0<=D)&&Array.prototype.splice.call(v,D,1),j&&(pa(h),a.g[p].length==0&&(delete a.g[p],a.h--))}}function dc(a,h,p,v){for(var D=0;D<a.length;++D){var j=a[D];if(!j.da&&j.listener==h&&j.capture==!!p&&j.ha==v)return D}return-1}var hc="closure_lm_"+(1e6*Math.random()|0),fc={};function Wp(a,h,p,v,D){if(Array.isArray(h)){for(var j=0;j<h.length;j++)Wp(a,h[j],p,v,D);return null}return p=Gp(p),a&&a[Gt]?a.K(h,p,c(v)?!!v.capture:!1,D):oE(a,h,p,!1,v,D)}function oE(a,h,p,v,D,j){if(!h)throw Error("Invalid event type");var $=c(D)?!!D.capture:!!D,me=mc(a);if(me||(a[hc]=me=new ma(a)),p=me.add(h,p,v,$,j),p.proxy)return p;if(v=aE(),p.proxy=v,v.src=a,v.listener=p,a.addEventListener)dt||(D=$),D===void 0&&(D=!1),a.addEventListener(h.toString(),v,D);else if(a.attachEvent)a.attachEvent(Kp(h.toString()),v);else if(a.addListener&&a.removeListener)a.addListener(v);else throw Error("addEventListener and attachEvent are unavailable.");return p}function aE(){function a(p){return h.call(a.src,a.listener,p)}const h=lE;return a}function qp(a,h,p,v,D){if(Array.isArray(h))for(var j=0;j<h.length;j++)qp(a,h[j],p,v,D);else v=c(v)?!!v.capture:!!v,p=Gp(p),a&&a[Gt]?(a=a.i,h=String(h).toString(),h in a.g&&(j=a.g[h],p=dc(j,p,v,D),-1<p&&(pa(j[p]),Array.prototype.splice.call(j,p,1),j.length==0&&(delete a.g[h],a.h--)))):a&&(a=mc(a))&&(h=a.g[h.toString()],a=-1,h&&(a=dc(h,p,v,D)),(p=-1<a?h[a]:null)&&pc(p))}function pc(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[Gt])cc(h.i,a);else{var p=a.type,v=a.proxy;h.removeEventListener?h.removeEventListener(p,v,a.capture):h.detachEvent?h.detachEvent(Kp(p),v):h.addListener&&h.removeListener&&h.removeListener(v),(p=mc(h))?(cc(p,a),p.h==0&&(p.src=null,h[hc]=null)):pa(a)}}}function Kp(a){return a in fc?fc[a]:fc[a]="on"+a}function lE(a,h){if(a.da)a=!0;else{h=new Je(h,this);var p=a.listener,v=a.ha||a.src;a.fa&&pc(a),a=p.call(v,h)}return a}function mc(a){return a=a[hc],a instanceof ma?a:null}var gc="__closure_events_fn_"+(1e9*Math.random()>>>0);function Gp(a){return typeof a=="function"?a:(a[gc]||(a[gc]=function(h){return a.handleEvent(h)}),a[gc])}function Ze(){Q.call(this),this.i=new ma(this),this.M=this,this.F=null}C(Ze,Q),Ze.prototype[Gt]=!0,Ze.prototype.removeEventListener=function(a,h,p,v){qp(this,a,h,p,v)};function ht(a,h){var p,v=a.F;if(v)for(p=[];v;v=v.F)p.push(v);if(a=a.M,v=h.type||h,typeof h=="string")h=new ne(h,a);else if(h instanceof ne)h.target=h.target||a;else{var D=h;h=new ne(v,a),S(h,D)}if(D=!0,p)for(var j=p.length-1;0<=j;j--){var $=h.g=p[j];D=ga($,v,!0,h)&&D}if($=h.g=a,D=ga($,v,!0,h)&&D,D=ga($,v,!1,h)&&D,p)for(j=0;j<p.length;j++)$=h.g=p[j],D=ga($,v,!1,h)&&D}Ze.prototype.N=function(){if(Ze.aa.N.call(this),this.i){var a=this.i,h;for(h in a.g){for(var p=a.g[h],v=0;v<p.length;v++)pa(p[v]);delete a.g[h],a.h--}}this.F=null},Ze.prototype.K=function(a,h,p,v){return this.i.add(String(a),h,!1,p,v)},Ze.prototype.L=function(a,h,p,v){return this.i.add(String(a),h,!0,p,v)};function ga(a,h,p,v){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();for(var D=!0,j=0;j<h.length;++j){var $=h[j];if($&&!$.da&&$.capture==p){var me=$.listener,He=$.ha||$.src;$.fa&&cc(a.i,$),D=me.call(He,v)!==!1&&D}}return D&&!v.defaultPrevented}function Qp(a,h,p){if(typeof a=="function")p&&(a=g(a,p));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:l.setTimeout(a,h||0)}function Yp(a){a.g=Qp(()=>{a.g=null,a.i&&(a.i=!1,Yp(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class uE extends Q{constructor(h,p){super(),this.m=h,this.l=p,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Yp(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ii(a){Q.call(this),this.h=a,this.g={}}C(Ii,Q);var Xp=[];function Jp(a){V(a.g,function(h,p){this.g.hasOwnProperty(p)&&pc(h)},a),a.g={}}Ii.prototype.N=function(){Ii.aa.N.call(this),Jp(this)},Ii.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var yc=l.JSON.stringify,cE=l.JSON.parse,dE=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function vc(){}vc.prototype.h=null;function Zp(a){return a.h||(a.h=a.i())}function em(){}var Si={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function _c(){ne.call(this,"d")}C(_c,ne);function wc(){ne.call(this,"c")}C(wc,ne);var Vr={},tm=null;function ya(){return tm=tm||new Ze}Vr.La="serverreachability";function nm(a){ne.call(this,Vr.La,a)}C(nm,ne);function Ai(a){const h=ya();ht(h,new nm(h))}Vr.STAT_EVENT="statevent";function rm(a,h){ne.call(this,Vr.STAT_EVENT,a),this.stat=h}C(rm,ne);function ft(a){const h=ya();ht(h,new rm(h,a))}Vr.Ma="timingevent";function sm(a,h){ne.call(this,Vr.Ma,a),this.size=h}C(sm,ne);function ki(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},h)}function Ci(){this.g=!0}Ci.prototype.xa=function(){this.g=!1};function hE(a,h,p,v,D,j){a.info(function(){if(a.g)if(j)for(var $="",me=j.split("&"),He=0;He<me.length;He++){var ce=me[He].split("=");if(1<ce.length){var et=ce[0];ce=ce[1];var tt=et.split("_");$=2<=tt.length&&tt[1]=="type"?$+(et+"="+ce+"&"):$+(et+"=redacted&")}}else $=null;else $=j;return"XMLHTTP REQ ("+v+") [attempt "+D+"]: "+h+`
`+p+`
`+$})}function fE(a,h,p,v,D,j,$){a.info(function(){return"XMLHTTP RESP ("+v+") [ attempt "+D+"]: "+h+`
`+p+`
`+j+" "+$})}function Es(a,h,p,v){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+mE(a,p)+(v?" "+v:"")})}function pE(a,h){a.info(function(){return"TIMEOUT: "+h})}Ci.prototype.info=function(){};function mE(a,h){if(!a.g)return h;if(!h)return null;try{var p=JSON.parse(h);if(p){for(a=0;a<p.length;a++)if(Array.isArray(p[a])){var v=p[a];if(!(2>v.length)){var D=v[1];if(Array.isArray(D)&&!(1>D.length)){var j=D[0];if(j!="noop"&&j!="stop"&&j!="close")for(var $=1;$<D.length;$++)D[$]=""}}}}return yc(p)}catch{return h}}var va={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},im={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},xc;function _a(){}C(_a,vc),_a.prototype.g=function(){return new XMLHttpRequest},_a.prototype.i=function(){return{}},xc=new _a;function Yn(a,h,p,v){this.j=a,this.i=h,this.l=p,this.R=v||1,this.U=new Ii(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new om}function om(){this.i=null,this.g="",this.h=!1}var am={},Ec={};function Tc(a,h,p){a.L=1,a.v=Ta(Tn(h)),a.m=p,a.P=!0,lm(a,null)}function lm(a,h){a.F=Date.now(),wa(a),a.A=Tn(a.v);var p=a.A,v=a.R;Array.isArray(v)||(v=[String(v)]),Em(p.i,"t",v),a.C=0,p=a.j.J,a.h=new om,a.g=Fm(a.j,p?h:null,!a.m),0<a.O&&(a.M=new uE(g(a.Y,a,a.g),a.O)),h=a.U,p=a.g,v=a.ca;var D="readystatechange";Array.isArray(D)||(D&&(Xp[0]=D.toString()),D=Xp);for(var j=0;j<D.length;j++){var $=Wp(p,D[j],v||h.handleEvent,!1,h.h||h);if(!$)break;h.g[$.key]=$}h=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,h)):(a.u="GET",a.g.ea(a.A,a.u,null,h)),Ai(),hE(a.i,a.u,a.A,a.l,a.R,a.m)}Yn.prototype.ca=function(a){a=a.target;const h=this.M;h&&In(a)==3?h.j():this.Y(a)},Yn.prototype.Y=function(a){try{if(a==this.g)e:{const tt=In(this.g);var h=this.g.Ba();const Ss=this.g.Z();if(!(3>tt)&&(tt!=3||this.g&&(this.h.h||this.g.oa()||bm(this.g)))){this.J||tt!=4||h==7||(h==8||0>=Ss?Ai(3):Ai(2)),Ic(this);var p=this.g.Z();this.X=p;t:if(um(this)){var v=bm(this.g);a="";var D=v.length,j=In(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Mr(this),bi(this);var $="";break t}this.h.i=new l.TextDecoder}for(h=0;h<D;h++)this.h.h=!0,a+=this.h.i.decode(v[h],{stream:!(j&&h==D-1)});v.length=0,this.h.g+=a,this.C=0,$=this.h.g}else $=this.g.oa();if(this.o=p==200,fE(this.i,this.u,this.A,this.l,this.R,tt,p),this.o){if(this.T&&!this.K){t:{if(this.g){var me,He=this.g;if((me=He.g?He.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(me)){var ce=me;break t}}ce=null}if(p=ce)Es(this.i,this.l,p,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Sc(this,p);else{this.o=!1,this.s=3,ft(12),Mr(this),bi(this);break e}}if(this.P){p=!0;let Qt;for(;!this.J&&this.C<$.length;)if(Qt=gE(this,$),Qt==Ec){tt==4&&(this.s=4,ft(14),p=!1),Es(this.i,this.l,null,"[Incomplete Response]");break}else if(Qt==am){this.s=4,ft(15),Es(this.i,this.l,$,"[Invalid Chunk]"),p=!1;break}else Es(this.i,this.l,Qt,null),Sc(this,Qt);if(um(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),tt!=4||$.length!=0||this.h.h||(this.s=1,ft(16),p=!1),this.o=this.o&&p,!p)Es(this.i,this.l,$,"[Invalid Chunked Response]"),Mr(this),bi(this);else if(0<$.length&&!this.W){this.W=!0;var et=this.j;et.g==this&&et.ba&&!et.M&&(et.j.info("Great, no buffering proxy detected. Bytes received: "+$.length),Nc(et),et.M=!0,ft(11))}}else Es(this.i,this.l,$,null),Sc(this,$);tt==4&&Mr(this),this.o&&!this.J&&(tt==4?Lm(this.j,this):(this.o=!1,wa(this)))}else DE(this.g),p==400&&0<$.indexOf("Unknown SID")?(this.s=3,ft(12)):(this.s=0,ft(13)),Mr(this),bi(this)}}}catch{}finally{}};function um(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function gE(a,h){var p=a.C,v=h.indexOf(`
`,p);return v==-1?Ec:(p=Number(h.substring(p,v)),isNaN(p)?am:(v+=1,v+p>h.length?Ec:(h=h.slice(v,v+p),a.C=v+p,h)))}Yn.prototype.cancel=function(){this.J=!0,Mr(this)};function wa(a){a.S=Date.now()+a.I,cm(a,a.I)}function cm(a,h){if(a.B!=null)throw Error("WatchDog timer not null");a.B=ki(g(a.ba,a),h)}function Ic(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Yn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(pE(this.i,this.A),this.L!=2&&(Ai(),ft(17)),Mr(this),this.s=2,bi(this)):cm(this,this.S-a)};function bi(a){a.j.G==0||a.J||Lm(a.j,a)}function Mr(a){Ic(a);var h=a.M;h&&typeof h.ma=="function"&&h.ma(),a.M=null,Jp(a.U),a.g&&(h=a.g,a.g=null,h.abort(),h.ma())}function Sc(a,h){try{var p=a.j;if(p.G!=0&&(p.g==a||Ac(p.h,a))){if(!a.K&&Ac(p.h,a)&&p.G==3){try{var v=p.Da.g.parse(h)}catch{v=null}if(Array.isArray(v)&&v.length==3){var D=v;if(D[0]==0){e:if(!p.u){if(p.g)if(p.g.F+3e3<a.F)ba(p),ka(p);else break e;Rc(p),ft(18)}}else p.za=D[1],0<p.za-p.T&&37500>D[2]&&p.F&&p.v==0&&!p.C&&(p.C=ki(g(p.Za,p),6e3));if(1>=fm(p.h)&&p.ca){try{p.ca()}catch{}p.ca=void 0}}else Fr(p,11)}else if((a.K||p.g==a)&&ba(p),!_(h))for(D=p.Da.g.parse(h),h=0;h<D.length;h++){let ce=D[h];if(p.T=ce[0],ce=ce[1],p.G==2)if(ce[0]=="c"){p.K=ce[1],p.ia=ce[2];const et=ce[3];et!=null&&(p.la=et,p.j.info("VER="+p.la));const tt=ce[4];tt!=null&&(p.Aa=tt,p.j.info("SVER="+p.Aa));const Ss=ce[5];Ss!=null&&typeof Ss=="number"&&0<Ss&&(v=1.5*Ss,p.L=v,p.j.info("backChannelRequestTimeoutMs_="+v)),v=p;const Qt=a.g;if(Qt){const Na=Qt.g?Qt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Na){var j=v.h;j.g||Na.indexOf("spdy")==-1&&Na.indexOf("quic")==-1&&Na.indexOf("h2")==-1||(j.j=j.l,j.g=new Set,j.h&&(kc(j,j.h),j.h=null))}if(v.D){const Pc=Qt.g?Qt.g.getResponseHeader("X-HTTP-Session-Id"):null;Pc&&(v.ya=Pc,ye(v.I,v.D,Pc))}}p.G=3,p.l&&p.l.ua(),p.ba&&(p.R=Date.now()-a.F,p.j.info("Handshake RTT: "+p.R+"ms")),v=p;var $=a;if(v.qa=Um(v,v.J?v.ia:null,v.W),$.K){pm(v.h,$);var me=$,He=v.L;He&&(me.I=He),me.B&&(Ic(me),wa(me)),v.g=$}else Om(v);0<p.i.length&&Ca(p)}else ce[0]!="stop"&&ce[0]!="close"||Fr(p,7);else p.G==3&&(ce[0]=="stop"||ce[0]=="close"?ce[0]=="stop"?Fr(p,7):bc(p):ce[0]!="noop"&&p.l&&p.l.ta(ce),p.v=0)}}Ai(4)}catch{}}var yE=class{constructor(a,h){this.g=a,this.map=h}};function dm(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function hm(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function fm(a){return a.h?1:a.g?a.g.size:0}function Ac(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function kc(a,h){a.g?a.g.add(h):a.h=h}function pm(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}dm.prototype.cancel=function(){if(this.i=mm(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function mm(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const p of a.g.values())h=h.concat(p.D);return h}return N(a.i)}function vE(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var h=[],p=a.length,v=0;v<p;v++)h.push(a[v]);return h}h=[],p=0;for(v in a)h[p++]=a[v];return h}function _E(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var h=[];a=a.length;for(var p=0;p<a;p++)h.push(p);return h}h=[],p=0;for(const v in a)h[p++]=v;return h}}}function gm(a,h){if(a.forEach&&typeof a.forEach=="function")a.forEach(h,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,h,void 0);else for(var p=_E(a),v=vE(a),D=v.length,j=0;j<D;j++)h.call(void 0,v[j],p&&p[j],a)}var ym=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function wE(a,h){if(a){a=a.split("&");for(var p=0;p<a.length;p++){var v=a[p].indexOf("="),D=null;if(0<=v){var j=a[p].substring(0,v);D=a[p].substring(v+1)}else j=a[p];h(j,D?decodeURIComponent(D.replace(/\+/g," ")):"")}}}function Ur(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Ur){this.h=a.h,xa(this,a.j),this.o=a.o,this.g=a.g,Ea(this,a.s),this.l=a.l;var h=a.i,p=new Pi;p.i=h.i,h.g&&(p.g=new Map(h.g),p.h=h.h),vm(this,p),this.m=a.m}else a&&(h=String(a).match(ym))?(this.h=!1,xa(this,h[1]||"",!0),this.o=Ri(h[2]||""),this.g=Ri(h[3]||"",!0),Ea(this,h[4]),this.l=Ri(h[5]||"",!0),vm(this,h[6]||"",!0),this.m=Ri(h[7]||"")):(this.h=!1,this.i=new Pi(null,this.h))}Ur.prototype.toString=function(){var a=[],h=this.j;h&&a.push(Ni(h,_m,!0),":");var p=this.g;return(p||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Ni(h,_m,!0),"@"),a.push(encodeURIComponent(String(p)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.s,p!=null&&a.push(":",String(p))),(p=this.l)&&(this.g&&p.charAt(0)!="/"&&a.push("/"),a.push(Ni(p,p.charAt(0)=="/"?TE:EE,!0))),(p=this.i.toString())&&a.push("?",p),(p=this.m)&&a.push("#",Ni(p,SE)),a.join("")};function Tn(a){return new Ur(a)}function xa(a,h,p){a.j=p?Ri(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Ea(a,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);a.s=h}else a.s=null}function vm(a,h,p){h instanceof Pi?(a.i=h,AE(a.i,a.h)):(p||(h=Ni(h,IE)),a.i=new Pi(h,a.h))}function ye(a,h,p){a.i.set(h,p)}function Ta(a){return ye(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Ri(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Ni(a,h,p){return typeof a=="string"?(a=encodeURI(a).replace(h,xE),p&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function xE(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var _m=/[#\/\?@]/g,EE=/[#\?:]/g,TE=/[#\?]/g,IE=/[#\?@]/g,SE=/#/g;function Pi(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Xn(a){a.g||(a.g=new Map,a.h=0,a.i&&wE(a.i,function(h,p){a.add(decodeURIComponent(h.replace(/\+/g," ")),p)}))}t=Pi.prototype,t.add=function(a,h){Xn(this),this.i=null,a=Ts(this,a);var p=this.g.get(a);return p||this.g.set(a,p=[]),p.push(h),this.h+=1,this};function wm(a,h){Xn(a),h=Ts(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function xm(a,h){return Xn(a),h=Ts(a,h),a.g.has(h)}t.forEach=function(a,h){Xn(this),this.g.forEach(function(p,v){p.forEach(function(D){a.call(h,D,v,this)},this)},this)},t.na=function(){Xn(this);const a=Array.from(this.g.values()),h=Array.from(this.g.keys()),p=[];for(let v=0;v<h.length;v++){const D=a[v];for(let j=0;j<D.length;j++)p.push(h[v])}return p},t.V=function(a){Xn(this);let h=[];if(typeof a=="string")xm(this,a)&&(h=h.concat(this.g.get(Ts(this,a))));else{a=Array.from(this.g.values());for(let p=0;p<a.length;p++)h=h.concat(a[p])}return h},t.set=function(a,h){return Xn(this),this.i=null,a=Ts(this,a),xm(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},t.get=function(a,h){return a?(a=this.V(a),0<a.length?String(a[0]):h):h};function Em(a,h,p){wm(a,h),0<p.length&&(a.i=null,a.g.set(Ts(a,h),N(p)),a.h+=p.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(var p=0;p<h.length;p++){var v=h[p];const j=encodeURIComponent(String(v)),$=this.V(v);for(v=0;v<$.length;v++){var D=j;$[v]!==""&&(D+="="+encodeURIComponent(String($[v]))),a.push(D)}}return this.i=a.join("&")};function Ts(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function AE(a,h){h&&!a.j&&(Xn(a),a.i=null,a.g.forEach(function(p,v){var D=v.toLowerCase();v!=D&&(wm(this,v),Em(this,D,p))},a)),a.j=h}function kE(a,h){const p=new Ci;if(l.Image){const v=new Image;v.onload=k(Jn,p,"TestLoadImage: loaded",!0,h,v),v.onerror=k(Jn,p,"TestLoadImage: error",!1,h,v),v.onabort=k(Jn,p,"TestLoadImage: abort",!1,h,v),v.ontimeout=k(Jn,p,"TestLoadImage: timeout",!1,h,v),l.setTimeout(function(){v.ontimeout&&v.ontimeout()},1e4),v.src=a}else h(!1)}function CE(a,h){const p=new Ci,v=new AbortController,D=setTimeout(()=>{v.abort(),Jn(p,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:v.signal}).then(j=>{clearTimeout(D),j.ok?Jn(p,"TestPingServer: ok",!0,h):Jn(p,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(D),Jn(p,"TestPingServer: error",!1,h)})}function Jn(a,h,p,v,D){try{D&&(D.onload=null,D.onerror=null,D.onabort=null,D.ontimeout=null),v(p)}catch{}}function bE(){this.g=new dE}function RE(a,h,p){const v=p||"";try{gm(a,function(D,j){let $=D;c(D)&&($=yc(D)),h.push(v+j+"="+encodeURIComponent($))})}catch(D){throw h.push(v+"type="+encodeURIComponent("_badmap")),D}}function Ia(a){this.l=a.Ub||null,this.j=a.eb||!1}C(Ia,vc),Ia.prototype.g=function(){return new Sa(this.l,this.j)},Ia.prototype.i=function(a){return function(){return a}}({});function Sa(a,h){Ze.call(this),this.D=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Sa,Ze),t=Sa.prototype,t.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=h,this.readyState=1,Oi(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(h.body=a),(this.D||l).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Di(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Oi(this)),this.g&&(this.readyState=3,Oi(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Tm(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Tm(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Di(this):Oi(this),this.readyState==3&&Tm(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,Di(this))},t.Qa=function(a){this.g&&(this.response=a,Di(this))},t.ga=function(){this.g&&Di(this)};function Di(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Oi(a)}t.setRequestHeader=function(a,h){this.u.append(a,h)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var p=h.next();!p.done;)p=p.value,a.push(p[0]+": "+p[1]),p=h.next();return a.join(`\r
`)};function Oi(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Sa.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Im(a){let h="";return V(a,function(p,v){h+=v,h+=":",h+=p,h+=`\r
`}),h}function Cc(a,h,p){e:{for(v in p){var v=!1;break e}v=!0}v||(p=Im(p),typeof a=="string"?p!=null&&encodeURIComponent(String(p)):ye(a,h,p))}function Ce(a){Ze.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(Ce,Ze);var NE=/^https?$/i,PE=["POST","PUT"];t=Ce.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,h,p,v){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():xc.g(),this.v=this.o?Zp(this.o):Zp(xc),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(j){Sm(this,j);return}if(a=p||"",p=new Map(this.headers),v)if(Object.getPrototypeOf(v)===Object.prototype)for(var D in v)p.set(D,v[D]);else if(typeof v.keys=="function"&&typeof v.get=="function")for(const j of v.keys())p.set(j,v.get(j));else throw Error("Unknown input type for opt_headers: "+String(v));v=Array.from(p.keys()).find(j=>j.toLowerCase()=="content-type"),D=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(PE,h,void 0))||v||D||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[j,$]of p)this.g.setRequestHeader(j,$);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Cm(this),this.u=!0,this.g.send(a),this.u=!1}catch(j){Sm(this,j)}};function Sm(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.m=5,Am(a),Aa(a)}function Am(a){a.A||(a.A=!0,ht(a,"complete"),ht(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,ht(this,"complete"),ht(this,"abort"),Aa(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Aa(this,!0)),Ce.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?km(this):this.bb())},t.bb=function(){km(this)};function km(a){if(a.h&&typeof o<"u"&&(!a.v[1]||In(a)!=4||a.Z()!=2)){if(a.u&&In(a)==4)Qp(a.Ea,0,a);else if(ht(a,"readystatechange"),In(a)==4){a.h=!1;try{const $=a.Z();e:switch($){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var p;if(!(p=h)){var v;if(v=$===0){var D=String(a.D).match(ym)[1]||null;!D&&l.self&&l.self.location&&(D=l.self.location.protocol.slice(0,-1)),v=!NE.test(D?D.toLowerCase():"")}p=v}if(p)ht(a,"complete"),ht(a,"success");else{a.m=6;try{var j=2<In(a)?a.g.statusText:""}catch{j=""}a.l=j+" ["+a.Z()+"]",Am(a)}}finally{Aa(a)}}}}function Aa(a,h){if(a.g){Cm(a);const p=a.g,v=a.v[0]?()=>{}:null;a.g=null,a.v=null,h||ht(a,"ready");try{p.onreadystatechange=v}catch{}}}function Cm(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function In(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<In(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),cE(h)}};function bm(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function DE(a){const h={};a=(a.g&&2<=In(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let v=0;v<a.length;v++){if(_(a[v]))continue;var p=I(a[v]);const D=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const j=h[D]||[];h[D]=j,j.push(p)}w(h,function(v){return v.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ji(a,h,p){return p&&p.internalChannelParams&&p.internalChannelParams[a]||h}function Rm(a){this.Aa=0,this.i=[],this.j=new Ci,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ji("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ji("baseRetryDelayMs",5e3,a),this.cb=ji("retryDelaySeedMs",1e4,a),this.Wa=ji("forwardChannelMaxRetries",2,a),this.wa=ji("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new dm(a&&a.concurrentRequestLimit),this.Da=new bE,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Rm.prototype,t.la=8,t.G=1,t.connect=function(a,h,p,v){ft(0),this.W=a,this.H=h||{},p&&v!==void 0&&(this.H.OSID=p,this.H.OAID=v),this.F=this.X,this.I=Um(this,null,this.W),Ca(this)};function bc(a){if(Nm(a),a.G==3){var h=a.U++,p=Tn(a.I);if(ye(p,"SID",a.K),ye(p,"RID",h),ye(p,"TYPE","terminate"),Li(a,p),h=new Yn(a,a.j,h),h.L=2,h.v=Ta(Tn(p)),p=!1,l.navigator&&l.navigator.sendBeacon)try{p=l.navigator.sendBeacon(h.v.toString(),"")}catch{}!p&&l.Image&&(new Image().src=h.v,p=!0),p||(h.g=Fm(h.j,null),h.g.ea(h.v)),h.F=Date.now(),wa(h)}Mm(a)}function ka(a){a.g&&(Nc(a),a.g.cancel(),a.g=null)}function Nm(a){ka(a),a.u&&(l.clearTimeout(a.u),a.u=null),ba(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function Ca(a){if(!hm(a.h)&&!a.s){a.s=!0;var h=a.Ga;Re||U(),z||(Re(),z=!0),K.add(h,a),a.B=0}}function OE(a,h){return fm(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=h.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=ki(g(a.Ga,a,h),Vm(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const D=new Yn(this,this.j,a);let j=this.o;if(this.S&&(j?(j=y(j),S(j,this.S)):j=this.S),this.m!==null||this.O||(D.H=j,j=null),this.P)e:{for(var h=0,p=0;p<this.i.length;p++){t:{var v=this.i[p];if("__data__"in v.map&&(v=v.map.__data__,typeof v=="string")){v=v.length;break t}v=void 0}if(v===void 0)break;if(h+=v,4096<h){h=p;break e}if(h===4096||p===this.i.length-1){h=p+1;break e}}h=1e3}else h=1e3;h=Dm(this,D,h),p=Tn(this.I),ye(p,"RID",a),ye(p,"CVER",22),this.D&&ye(p,"X-HTTP-Session-Id",this.D),Li(this,p),j&&(this.O?h="headers="+encodeURIComponent(String(Im(j)))+"&"+h:this.m&&Cc(p,this.m,j)),kc(this.h,D),this.Ua&&ye(p,"TYPE","init"),this.P?(ye(p,"$req",h),ye(p,"SID","null"),D.T=!0,Tc(D,p,null)):Tc(D,p,h),this.G=2}}else this.G==3&&(a?Pm(this,a):this.i.length==0||hm(this.h)||Pm(this))};function Pm(a,h){var p;h?p=h.l:p=a.U++;const v=Tn(a.I);ye(v,"SID",a.K),ye(v,"RID",p),ye(v,"AID",a.T),Li(a,v),a.m&&a.o&&Cc(v,a.m,a.o),p=new Yn(a,a.j,p,a.B+1),a.m===null&&(p.H=a.o),h&&(a.i=h.D.concat(a.i)),h=Dm(a,p,1e3),p.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),kc(a.h,p),Tc(p,v,h)}function Li(a,h){a.H&&V(a.H,function(p,v){ye(h,v,p)}),a.l&&gm({},function(p,v){ye(h,v,p)})}function Dm(a,h,p){p=Math.min(a.i.length,p);var v=a.l?g(a.l.Na,a.l,a):null;e:{var D=a.i;let j=-1;for(;;){const $=["count="+p];j==-1?0<p?(j=D[0].g,$.push("ofs="+j)):j=0:$.push("ofs="+j);let me=!0;for(let He=0;He<p;He++){let ce=D[He].g;const et=D[He].map;if(ce-=j,0>ce)j=Math.max(0,D[He].g-100),me=!1;else try{RE(et,$,"req"+ce+"_")}catch{v&&v(et)}}if(me){v=$.join("&");break e}}}return a=a.i.splice(0,p),h.D=a,v}function Om(a){if(!a.g&&!a.u){a.Y=1;var h=a.Fa;Re||U(),z||(Re(),z=!0),K.add(h,a),a.v=0}}function Rc(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=ki(g(a.Fa,a),Vm(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,jm(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=ki(g(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ft(10),ka(this),jm(this))};function Nc(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function jm(a){a.g=new Yn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var h=Tn(a.qa);ye(h,"RID","rpc"),ye(h,"SID",a.K),ye(h,"AID",a.T),ye(h,"CI",a.F?"0":"1"),!a.F&&a.ja&&ye(h,"TO",a.ja),ye(h,"TYPE","xmlhttp"),Li(a,h),a.m&&a.o&&Cc(h,a.m,a.o),a.L&&(a.g.I=a.L);var p=a.g;a=a.ia,p.L=1,p.v=Ta(Tn(h)),p.m=null,p.P=!0,lm(p,a)}t.Za=function(){this.C!=null&&(this.C=null,ka(this),Rc(this),ft(19))};function ba(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function Lm(a,h){var p=null;if(a.g==h){ba(a),Nc(a),a.g=null;var v=2}else if(Ac(a.h,h))p=h.D,pm(a.h,h),v=1;else return;if(a.G!=0){if(h.o)if(v==1){p=h.m?h.m.length:0,h=Date.now()-h.F;var D=a.B;v=ya(),ht(v,new sm(v,p)),Ca(a)}else Om(a);else if(D=h.s,D==3||D==0&&0<h.X||!(v==1&&OE(a,h)||v==2&&Rc(a)))switch(p&&0<p.length&&(h=a.h,h.i=h.i.concat(p)),D){case 1:Fr(a,5);break;case 4:Fr(a,10);break;case 3:Fr(a,6);break;default:Fr(a,2)}}}function Vm(a,h){let p=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(p*=2),p*h}function Fr(a,h){if(a.j.info("Error code "+h),h==2){var p=g(a.fb,a),v=a.Xa;const D=!v;v=new Ur(v||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||xa(v,"https"),Ta(v),D?kE(v.toString(),p):CE(v.toString(),p)}else ft(2);a.G=0,a.l&&a.l.sa(h),Mm(a),Nm(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),ft(2)):(this.j.info("Failed to ping google.com"),ft(1))};function Mm(a){if(a.G=0,a.ka=[],a.l){const h=mm(a.h);(h.length!=0||a.i.length!=0)&&(P(a.ka,h),P(a.ka,a.i),a.h.i.length=0,N(a.i),a.i.length=0),a.l.ra()}}function Um(a,h,p){var v=p instanceof Ur?Tn(p):new Ur(p);if(v.g!="")h&&(v.g=h+"."+v.g),Ea(v,v.s);else{var D=l.location;v=D.protocol,h=h?h+"."+D.hostname:D.hostname,D=+D.port;var j=new Ur(null);v&&xa(j,v),h&&(j.g=h),D&&Ea(j,D),p&&(j.l=p),v=j}return p=a.D,h=a.ya,p&&h&&ye(v,p,h),ye(v,"VER",a.la),Li(a,v),v}function Fm(a,h,p){if(h&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Ca&&!a.pa?new Ce(new Ia({eb:p})):new Ce(a.pa),h.Ha(a.J),h}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Bm(){}t=Bm.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Ra(){}Ra.prototype.g=function(a,h){return new Nt(a,h)};function Nt(a,h){Ze.call(this),this.g=new Rm(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(a?a["X-WebChannel-Client-Profile"]=h.va:a={"X-WebChannel-Client-Profile":h.va}),this.g.S=a,(a=h&&h.Sb)&&!_(a)&&(this.g.m=a),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!_(h)&&(this.g.D=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new Is(this)}C(Nt,Ze),Nt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Nt.prototype.close=function(){bc(this.g)},Nt.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var p={};p.__data__=a,a=p}else this.u&&(p={},p.__data__=yc(a),a=p);h.i.push(new yE(h.Ya++,a)),h.G==3&&Ca(h)},Nt.prototype.N=function(){this.g.l=null,delete this.j,bc(this.g),delete this.g,Nt.aa.N.call(this)};function zm(a){_c.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const p in h){a=p;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}C(zm,_c);function $m(){wc.call(this),this.status=1}C($m,wc);function Is(a){this.g=a}C(Is,Bm),Is.prototype.ua=function(){ht(this.g,"a")},Is.prototype.ta=function(a){ht(this.g,new zm(a))},Is.prototype.sa=function(a){ht(this.g,new $m)},Is.prototype.ra=function(){ht(this.g,"b")},Ra.prototype.createWebChannel=Ra.prototype.g,Nt.prototype.send=Nt.prototype.o,Nt.prototype.open=Nt.prototype.m,Nt.prototype.close=Nt.prototype.close,c1=function(){return new Ra},u1=function(){return ya()},l1=Vr,Ch={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},va.NO_ERROR=0,va.TIMEOUT=8,va.HTTP_ERROR=6,yl=va,im.COMPLETE="complete",a1=im,em.EventType=Si,Si.OPEN="a",Si.CLOSE="b",Si.ERROR="c",Si.MESSAGE="d",Ze.prototype.listen=Ze.prototype.K,Ji=em,Ce.prototype.listenOnce=Ce.prototype.L,Ce.prototype.getLastError=Ce.prototype.Ka,Ce.prototype.getLastErrorCode=Ce.prototype.Ba,Ce.prototype.getStatus=Ce.prototype.Z,Ce.prototype.getResponseJson=Ce.prototype.Oa,Ce.prototype.getResponseText=Ce.prototype.oa,Ce.prototype.send=Ce.prototype.ea,Ce.prototype.setWithCredentials=Ce.prototype.Ha,o1=Ce}).apply(typeof Ya<"u"?Ya:typeof self<"u"?self:typeof window<"u"?window:{});const Uy="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}it.UNAUTHENTICATED=new it(null),it.GOOGLE_CREDENTIALS=new it("google-credentials-uid"),it.FIRST_PARTY=new it("first-party-uid"),it.MOCK_USER=new it("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xi="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const is=new Hf("@firebase/firestore");function Wi(){return is.logLevel}function G(t,...e){if(is.logLevel<=oe.DEBUG){const n=e.map(tp);is.debug(`Firestore (${xi}): ${t}`,...n)}}function $n(t,...e){if(is.logLevel<=oe.ERROR){const n=e.map(tp);is.error(`Firestore (${xi}): ${t}`,...n)}}function ai(t,...e){if(is.logLevel<=oe.WARN){const n=e.map(tp);is.warn(`Firestore (${xi}): ${t}`,...n)}}function tp(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z(t="Unexpected state"){const e=`FIRESTORE (${xi}) INTERNAL ASSERTION FAILED: `+t;throw $n(e),new Error(e)}function fe(t,e){t||Z()}function te(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class W extends ln{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d1{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class nb{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(it.UNAUTHENTICATED))}shutdown(){}}class rb{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class sb{constructor(e){this.t=e,this.currentUser=it.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){fe(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let i=new Ln;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ln,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{G("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(G("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ln)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(G("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(fe(typeof r.accessToken=="string"),new d1(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return fe(e===null||typeof e=="string"),new it(e)}}class ib{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=it.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class ob{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new ib(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(it.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ab{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class lb{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){fe(this.o===void 0);const r=i=>{i.error!=null&&G("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,G("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{G("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):G("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(fe(typeof n.token=="string"),this.R=n.token,new ab(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ub(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h1{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=ub(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function de(t,e){return t<e?-1:t>e?1:0}function li(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new W(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new W(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new W(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new W(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Fe.fromMillis(Date.now())}static fromDate(e){return Fe.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Fe(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?de(this.nanoseconds,e.nanoseconds):de(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{constructor(e){this.timestamp=e}static fromTimestamp(e){return new ee(e)}static min(){return new ee(new Fe(0,0))}static max(){return new ee(new Fe(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo{constructor(e,n,r){n===void 0?n=0:n>e.length&&Z(),r===void 0?r=e.length-n:r>e.length-n&&Z(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Mo.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Mo?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class _e extends Mo{construct(e,n,r){return new _e(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new W(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new _e(n)}static emptyPath(){return new _e([])}}const cb=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ke extends Mo{construct(e,n,r){return new Ke(e,n,r)}static isValidIdentifier(e){return cb.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ke.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Ke(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new W(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new W(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new W(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(r+=l,s++):(i(),s++)}if(i(),o)throw new W(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ke(n)}static emptyPath(){return new Ke([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(e){this.path=e}static fromPath(e){return new Y(_e.fromString(e))}static fromName(e){return new Y(_e.fromString(e).popFirst(5))}static empty(){return new Y(_e.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&_e.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return _e.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Y(new _e(e.slice()))}}function db(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=ee.fromTimestamp(r===1e9?new Fe(n+1,0):new Fe(n,r));return new Cr(s,Y.empty(),e)}function hb(t){return new Cr(t.readTime,t.key,-1)}class Cr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Cr(ee.min(),Y.empty(),-1)}static max(){return new Cr(ee.max(),Y.empty(),-1)}}function fb(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=Y.comparator(t.documentKey,e.documentKey),n!==0?n:de(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pb="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class mb{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ra(t){if(t.code!==M.FAILED_PRECONDITION||t.message!==pb)throw t;G("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&Z(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new F((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof F?n:F.resolve(n)}catch(n){return F.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):F.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):F.reject(n)}static resolve(e){return new F((n,r)=>{n(e)})}static reject(e){return new F((n,r)=>{r(e)})}static waitFor(e){return new F((n,r)=>{let s=0,i=0,o=!1;e.forEach(l=>{++s,l.next(()=>{++i,o&&i===s&&n()},u=>r(u))}),o=!0,i===s&&n()})}static or(e){let n=F.resolve(!1);for(const r of e)n=n.next(s=>s?F.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new F((r,s)=>{const i=e.length,o=new Array(i);let l=0;for(let u=0;u<i;u++){const c=u;n(e[c]).next(f=>{o[c]=f,++l,l===i&&r(o)},f=>s(f))}})}static doWhile(e,n){return new F((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function gb(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function sa(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}np.oe=-1;function Bu(t){return t==null}function tu(t){return t===0&&1/t==-1/0}function yb(t){return typeof t=="number"&&Number.isInteger(t)&&!tu(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fy(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function vs(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function f1(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e,n){this.comparator=e,this.root=n||qe.EMPTY}insert(e,n){return new ke(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,qe.BLACK,null,null))}remove(e){return new ke(this.comparator,this.root.remove(e,this.comparator).copy(null,null,qe.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Xa(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Xa(this.root,e,this.comparator,!1)}getReverseIterator(){return new Xa(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Xa(this.root,e,this.comparator,!0)}}class Xa{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class qe{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??qe.RED,this.left=s??qe.EMPTY,this.right=i??qe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new qe(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return qe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return qe.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,qe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,qe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw Z();const e=this.left.check();if(e!==this.right.check())throw Z();return e+(this.isRed()?0:1)}}qe.EMPTY=null,qe.RED=!0,qe.BLACK=!1;qe.EMPTY=new class{constructor(){this.size=0}get key(){throw Z()}get value(){throw Z()}get color(){throw Z()}get left(){throw Z()}get right(){throw Z()}copy(e,n,r,s,i){return this}insert(e,n,r){return new qe(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e){this.comparator=e,this.data=new ke(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new By(this.data.getIterator())}getIteratorFrom(e){return new By(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof Qe)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Qe(this.comparator);return n.data=e,n}}class By{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(e){this.fields=e,e.sort(Ke.comparator)}static empty(){return new Ot([])}unionWith(e){let n=new Qe(Ke.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Ot(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return li(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p1 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new p1("Invalid base64 string: "+i):i}}(e);return new Xe(n)}static fromUint8Array(e){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new Xe(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return de(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Xe.EMPTY_BYTE_STRING=new Xe("");const vb=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function br(t){if(fe(!!t),typeof t=="string"){let e=0;const n=vb.exec(t);if(fe(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ne(t.seconds),nanos:Ne(t.nanos)}}function Ne(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function os(t){return typeof t=="string"?Xe.fromBase64String(t):Xe.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rp(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function sp(t){const e=t.mapValue.fields.__previous_value__;return rp(e)?sp(e):e}function Uo(t){const e=br(t.mapValue.fields.__local_write_time__.timestampValue);return new Fe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _b{constructor(e,n,r,s,i,o,l,u,c){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=c}}class Fo{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Fo("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Fo&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ja={mapValue:{}};function as(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?rp(t)?4:xb(t)?9007199254740991:wb(t)?10:11:Z()}function wn(t,e){if(t===e)return!0;const n=as(t);if(n!==as(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Uo(t).isEqual(Uo(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=br(s.timestampValue),l=br(i.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return os(s.bytesValue).isEqual(os(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return Ne(s.geoPointValue.latitude)===Ne(i.geoPointValue.latitude)&&Ne(s.geoPointValue.longitude)===Ne(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Ne(s.integerValue)===Ne(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Ne(s.doubleValue),l=Ne(i.doubleValue);return o===l?tu(o)===tu(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return li(t.arrayValue.values||[],e.arrayValue.values||[],wn);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},l=i.mapValue.fields||{};if(Fy(o)!==Fy(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!wn(o[u],l[u])))return!1;return!0}(t,e);default:return Z()}}function Bo(t,e){return(t.values||[]).find(n=>wn(n,e))!==void 0}function ui(t,e){if(t===e)return 0;const n=as(t),r=as(e);if(n!==r)return de(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return de(t.booleanValue,e.booleanValue);case 2:return function(i,o){const l=Ne(i.integerValue||i.doubleValue),u=Ne(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return zy(t.timestampValue,e.timestampValue);case 4:return zy(Uo(t),Uo(e));case 5:return de(t.stringValue,e.stringValue);case 6:return function(i,o){const l=os(i),u=os(o);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const l=i.split("/"),u=o.split("/");for(let c=0;c<l.length&&c<u.length;c++){const f=de(l[c],u[c]);if(f!==0)return f}return de(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const l=de(Ne(i.latitude),Ne(o.latitude));return l!==0?l:de(Ne(i.longitude),Ne(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return $y(t.arrayValue,e.arrayValue);case 10:return function(i,o){var l,u,c,f;const m=i.fields||{},g=o.fields||{},k=(l=m.value)===null||l===void 0?void 0:l.arrayValue,C=(u=g.value)===null||u===void 0?void 0:u.arrayValue,N=de(((c=k==null?void 0:k.values)===null||c===void 0?void 0:c.length)||0,((f=C==null?void 0:C.values)===null||f===void 0?void 0:f.length)||0);return N!==0?N:$y(k,C)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===Ja.mapValue&&o===Ja.mapValue)return 0;if(i===Ja.mapValue)return 1;if(o===Ja.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),c=o.fields||{},f=Object.keys(c);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const g=de(u[m],f[m]);if(g!==0)return g;const k=ui(l[u[m]],c[f[m]]);if(k!==0)return k}return de(u.length,f.length)}(t.mapValue,e.mapValue);default:throw Z()}}function zy(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return de(t,e);const n=br(t),r=br(e),s=de(n.seconds,r.seconds);return s!==0?s:de(n.nanos,r.nanos)}function $y(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=ui(n[s],r[s]);if(i)return i}return de(n.length,r.length)}function ci(t){return bh(t)}function bh(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=br(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return os(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return Y.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=bh(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${bh(n.fields[o])}`;return s+"}"}(t.mapValue):Z()}function Hy(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Rh(t){return!!t&&"integerValue"in t}function ip(t){return!!t&&"arrayValue"in t}function Wy(t){return!!t&&"nullValue"in t}function qy(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function vl(t){return!!t&&"mapValue"in t}function wb(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function fo(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return vs(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=fo(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=fo(t.arrayValue.values[n]);return e}return Object.assign({},t)}function xb(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(e){this.value=e}static empty(){return new Et({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!vl(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=fo(n)}setAll(e){let n=Ke.emptyPath(),r={},s=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,s),r={},s=[],n=l.popLast()}o?r[l.lastSegment()]=fo(o):s.push(l.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());vl(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return wn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];vl(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){vs(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Et(fo(this.value))}}function m1(t){const e=[];return vs(t.fields,(n,r)=>{const s=new Ke([n]);if(vl(r)){const i=m1(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Ot(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e,n,r,s,i,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=l}static newInvalidDocument(e){return new at(e,0,ee.min(),ee.min(),ee.min(),Et.empty(),0)}static newFoundDocument(e,n,r,s){return new at(e,1,n,ee.min(),r,s,0)}static newNoDocument(e,n){return new at(e,2,n,ee.min(),ee.min(),Et.empty(),0)}static newUnknownDocument(e,n){return new at(e,3,n,ee.min(),ee.min(),Et.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(ee.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Et.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Et.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ee.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof at&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new at(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{constructor(e,n){this.position=e,this.inclusive=n}}function Ky(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=Y.comparator(Y.fromName(o.referenceValue),n.key):r=ui(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Gy(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!wn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(e,n="asc"){this.field=e,this.dir=n}}function Eb(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g1{}class Le extends g1{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new Ib(e,n,r):n==="array-contains"?new kb(e,r):n==="in"?new Cb(e,r):n==="not-in"?new bb(e,r):n==="array-contains-any"?new Rb(e,r):new Le(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new Sb(e,r):new Ab(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(ui(n,this.value)):n!==null&&as(this.value)===as(n)&&this.matchesComparison(ui(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Z()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class an extends g1{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new an(e,n)}matches(e){return y1(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function y1(t){return t.op==="and"}function v1(t){return Tb(t)&&y1(t)}function Tb(t){for(const e of t.filters)if(e instanceof an)return!1;return!0}function Nh(t){if(t instanceof Le)return t.field.canonicalString()+t.op.toString()+ci(t.value);if(v1(t))return t.filters.map(e=>Nh(e)).join(",");{const e=t.filters.map(n=>Nh(n)).join(",");return`${t.op}(${e})`}}function _1(t,e){return t instanceof Le?function(r,s){return s instanceof Le&&r.op===s.op&&r.field.isEqual(s.field)&&wn(r.value,s.value)}(t,e):t instanceof an?function(r,s){return s instanceof an&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,l)=>i&&_1(o,s.filters[l]),!0):!1}(t,e):void Z()}function w1(t){return t instanceof Le?function(n){return`${n.field.canonicalString()} ${n.op} ${ci(n.value)}`}(t):t instanceof an?function(n){return n.op.toString()+" {"+n.getFilters().map(w1).join(" ,")+"}"}(t):"Filter"}class Ib extends Le{constructor(e,n,r){super(e,n,r),this.key=Y.fromName(r.referenceValue)}matches(e){const n=Y.comparator(e.key,this.key);return this.matchesComparison(n)}}class Sb extends Le{constructor(e,n){super(e,"in",n),this.keys=x1("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class Ab extends Le{constructor(e,n){super(e,"not-in",n),this.keys=x1("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function x1(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>Y.fromName(r.referenceValue))}class kb extends Le{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return ip(n)&&Bo(n.arrayValue,this.value)}}class Cb extends Le{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Bo(this.value.arrayValue,n)}}class bb extends Le{constructor(e,n){super(e,"not-in",n)}matches(e){if(Bo(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Bo(this.value.arrayValue,n)}}class Rb extends Le{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!ip(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Bo(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nb{constructor(e,n=null,r=[],s=[],i=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=l,this.ue=null}}function Qy(t,e=null,n=[],r=[],s=null,i=null,o=null){return new Nb(t,e,n,r,s,i,o)}function op(t){const e=te(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Nh(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Bu(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>ci(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>ci(r)).join(",")),e.ue=n}return e.ue}function ap(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!Eb(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!_1(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Gy(t.startAt,e.startAt)&&Gy(t.endAt,e.endAt)}function Ph(t){return Y.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ia{constructor(e,n=null,r=[],s=[],i=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Pb(t,e,n,r,s,i,o,l){return new ia(t,e,n,r,s,i,o,l)}function zu(t){return new ia(t)}function Yy(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function E1(t){return t.collectionGroup!==null}function po(t){const e=te(t);if(e.ce===null){e.ce=[];const n=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new Qe(Ke.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(c=>{c.isInequality()&&(l=l.add(c.field))})}),l})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.ce.push(new ru(i,r))}),n.has(Ke.keyField().canonicalString())||e.ce.push(new ru(Ke.keyField(),r))}return e.ce}function yn(t){const e=te(t);return e.le||(e.le=Db(e,po(t))),e.le}function Db(t,e){if(t.limitType==="F")return Qy(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new ru(s.field,i)});const n=t.endAt?new nu(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new nu(t.startAt.position,t.startAt.inclusive):null;return Qy(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Dh(t,e){const n=t.filters.concat([e]);return new ia(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Oh(t,e,n){return new ia(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function $u(t,e){return ap(yn(t),yn(e))&&t.limitType===e.limitType}function T1(t){return`${op(yn(t))}|lt:${t.limitType}`}function ks(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>w1(s)).join(", ")}]`),Bu(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>ci(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>ci(s)).join(",")),`Target(${r})`}(yn(t))}; limitType=${t.limitType})`}function Hu(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):Y.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of po(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(o,l,u){const c=Ky(o,l,u);return o.inclusive?c<=0:c<0}(r.startAt,po(r),s)||r.endAt&&!function(o,l,u){const c=Ky(o,l,u);return o.inclusive?c>=0:c>0}(r.endAt,po(r),s))}(t,e)}function Ob(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function I1(t){return(e,n)=>{let r=!1;for(const s of po(t)){const i=jb(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function jb(t,e,n){const r=t.field.isKeyField()?Y.comparator(e.key,n.key):function(i,o,l){const u=o.data.field(i),c=l.data.field(i);return u!==null&&c!==null?ui(u,c):Z()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return Z()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){vs(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return f1(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lb=new ke(Y.comparator);function Hn(){return Lb}const S1=new ke(Y.comparator);function Zi(...t){let e=S1;for(const n of t)e=e.insert(n.key,n);return e}function A1(t){let e=S1;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Kr(){return mo()}function k1(){return mo()}function mo(){return new Ei(t=>t.toString(),(t,e)=>t.isEqual(e))}const Vb=new ke(Y.comparator),Mb=new Qe(Y.comparator);function ie(...t){let e=Mb;for(const n of t)e=e.add(n);return e}const Ub=new Qe(de);function Fb(){return Ub}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lp(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:tu(e)?"-0":e}}function C1(t){return{integerValue:""+t}}function Bb(t,e){return yb(e)?C1(e):lp(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wu{constructor(){this._=void 0}}function zb(t,e,n){return t instanceof su?function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&rp(i)&&(i=sp(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(n,e):t instanceof zo?R1(t,e):t instanceof $o?N1(t,e):function(s,i){const o=b1(s,i),l=Xy(o)+Xy(s.Pe);return Rh(o)&&Rh(s.Pe)?C1(l):lp(s.serializer,l)}(t,e)}function $b(t,e,n){return t instanceof zo?R1(t,e):t instanceof $o?N1(t,e):n}function b1(t,e){return t instanceof iu?function(r){return Rh(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class su extends Wu{}class zo extends Wu{constructor(e){super(),this.elements=e}}function R1(t,e){const n=P1(e);for(const r of t.elements)n.some(s=>wn(s,r))||n.push(r);return{arrayValue:{values:n}}}class $o extends Wu{constructor(e){super(),this.elements=e}}function N1(t,e){let n=P1(e);for(const r of t.elements)n=n.filter(s=>!wn(s,r));return{arrayValue:{values:n}}}class iu extends Wu{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function Xy(t){return Ne(t.integerValue||t.doubleValue)}function P1(t){return ip(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function Hb(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof zo&&s instanceof zo||r instanceof $o&&s instanceof $o?li(r.elements,s.elements,wn):r instanceof iu&&s instanceof iu?wn(r.Pe,s.Pe):r instanceof su&&s instanceof su}(t.transform,e.transform)}class Wb{constructor(e,n){this.version=e,this.transformResults=n}}class $t{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new $t}static exists(e){return new $t(void 0,e)}static updateTime(e){return new $t(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function _l(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class qu{}function D1(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new up(t.key,$t.none()):new oa(t.key,t.data,$t.none());{const n=t.data,r=Et.empty();let s=new Qe(Ke.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Lr(t.key,r,new Ot(s.toArray()),$t.none())}}function qb(t,e,n){t instanceof oa?function(s,i,o){const l=s.value.clone(),u=Zy(s.fieldTransforms,i,o.transformResults);l.setAll(u),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof Lr?function(s,i,o){if(!_l(s.precondition,i))return void i.convertToUnknownDocument(o.version);const l=Zy(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(O1(s)),u.setAll(l),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function go(t,e,n,r){return t instanceof oa?function(i,o,l,u){if(!_l(i.precondition,o))return l;const c=i.value.clone(),f=ev(i.fieldTransforms,u,o);return c.setAll(f),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(t,e,n,r):t instanceof Lr?function(i,o,l,u){if(!_l(i.precondition,o))return l;const c=ev(i.fieldTransforms,u,o),f=o.data;return f.setAll(O1(i)),f.setAll(c),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(t,e,n,r):function(i,o,l){return _l(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function Kb(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=b1(r.transform,s||null);i!=null&&(n===null&&(n=Et.empty()),n.set(r.field,i))}return n||null}function Jy(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&li(r,s,(i,o)=>Hb(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class oa extends qu{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Lr extends qu{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function O1(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Zy(t,e,n){const r=new Map;fe(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,l=e.data.field(i.field);r.set(i.field,$b(o,l,n[s]))}return r}function ev(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,zb(i,o,e))}return r}class up extends qu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Gb extends qu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qb{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&qb(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=go(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=go(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=k1();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let l=this.applyToLocalView(o,i.mutatedFields);l=n.has(s.key)?null:l;const u=D1(o,l);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(ee.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),ie())}isEqual(e){return this.batchId===e.batchId&&li(this.mutations,e.mutations,(n,r)=>Jy(n,r))&&li(this.baseMutations,e.baseMutations,(n,r)=>Jy(n,r))}}class cp{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){fe(e.mutations.length===r.length);let s=function(){return Vb}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new cp(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yb{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xb{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Oe,le;function Jb(t){switch(t){default:return Z();case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0}}function j1(t){if(t===void 0)return $n("GRPC error has no .code"),M.UNKNOWN;switch(t){case Oe.OK:return M.OK;case Oe.CANCELLED:return M.CANCELLED;case Oe.UNKNOWN:return M.UNKNOWN;case Oe.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case Oe.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case Oe.INTERNAL:return M.INTERNAL;case Oe.UNAVAILABLE:return M.UNAVAILABLE;case Oe.UNAUTHENTICATED:return M.UNAUTHENTICATED;case Oe.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case Oe.NOT_FOUND:return M.NOT_FOUND;case Oe.ALREADY_EXISTS:return M.ALREADY_EXISTS;case Oe.PERMISSION_DENIED:return M.PERMISSION_DENIED;case Oe.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case Oe.ABORTED:return M.ABORTED;case Oe.OUT_OF_RANGE:return M.OUT_OF_RANGE;case Oe.UNIMPLEMENTED:return M.UNIMPLEMENTED;case Oe.DATA_LOSS:return M.DATA_LOSS;default:return Z()}}(le=Oe||(Oe={}))[le.OK=0]="OK",le[le.CANCELLED=1]="CANCELLED",le[le.UNKNOWN=2]="UNKNOWN",le[le.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",le[le.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",le[le.NOT_FOUND=5]="NOT_FOUND",le[le.ALREADY_EXISTS=6]="ALREADY_EXISTS",le[le.PERMISSION_DENIED=7]="PERMISSION_DENIED",le[le.UNAUTHENTICATED=16]="UNAUTHENTICATED",le[le.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",le[le.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",le[le.ABORTED=10]="ABORTED",le[le.OUT_OF_RANGE=11]="OUT_OF_RANGE",le[le.UNIMPLEMENTED=12]="UNIMPLEMENTED",le[le.INTERNAL=13]="INTERNAL",le[le.UNAVAILABLE=14]="UNAVAILABLE",le[le.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zb(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eR=new Xr([4294967295,4294967295],0);function tv(t){const e=Zb().encode(t),n=new i1;return n.update(e),new Uint8Array(n.digest())}function nv(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Xr([n,r],0),new Xr([s,i],0)]}class dp{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new eo(`Invalid padding: ${n}`);if(r<0)throw new eo(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new eo(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new eo(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=Xr.fromNumber(this.Ie)}Ee(e,n,r){let s=e.add(n.multiply(Xr.fromNumber(r)));return s.compare(eR)===1&&(s=new Xr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=tv(e),[r,s]=nv(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);if(!this.de(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new dp(i,s,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.Ie===0)return;const n=tv(e),[r,s]=nv(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class eo extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ku{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,aa.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Ku(ee.min(),s,new ke(de),Hn(),ie())}}class aa{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new aa(r,n,ie(),ie(),ie())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(e,n,r,s){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=s}}class L1{constructor(e,n){this.targetId=e,this.me=n}}class V1{constructor(e,n,r=Xe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class rv{constructor(){this.fe=0,this.ge=iv(),this.pe=Xe.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=ie(),n=ie(),r=ie();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:Z()}}),new aa(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=iv()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,fe(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class tR{constructor(e){this.Le=e,this.Be=new Map,this.ke=Hn(),this.qe=sv(),this.Qe=new ke(de)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:Z()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,s)=>{this.ze(s)&&n(s)})}He(e){const n=e.targetId,r=e.me.count,s=this.Je(n);if(s){const i=s.target;if(Ph(i))if(r===0){const o=new Y(i.path);this.Ue(n,o,at.newNoDocument(o,ee.min()))}else fe(r===1);else{const o=this.Ye(n);if(o!==r){const l=this.Ze(e),u=l?this.Xe(l,e,o):1;if(u!==0){this.je(n);const c=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,c)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,l;try{o=os(r).toUint8Array()}catch(u){if(u instanceof p1)return ai("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new dp(o,s,i)}catch(u){return ai(u instanceof eo?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.Ie===0?null:l}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.Le.tt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,i,null),s++)}),s}rt(e){const n=new Map;this.Be.forEach((i,o)=>{const l=this.Je(o);if(l){if(i.current&&Ph(l.target)){const u=new Y(l.target.path);this.ke.get(u)!==null||this.it(o,u)||this.Ue(o,u,at.newNoDocument(u,e))}i.be&&(n.set(o,i.ve()),i.Ce())}});let r=ie();this.qe.forEach((i,o)=>{let l=!0;o.forEachWhile(u=>{const c=this.Je(u);return!c||c.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ke.forEach((i,o)=>o.setReadTime(e));const s=new Ku(e,n,this.Qe,this.ke,r);return this.ke=Hn(),this.qe=sv(),this.Qe=new ke(de),s}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,n)?s.Fe(n,1):s.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new rv,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new Qe(de),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||G("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new rv),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function sv(){return new ke(Y.comparator)}function iv(){return new ke(Y.comparator)}const nR={asc:"ASCENDING",desc:"DESCENDING"},rR={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},sR={and:"AND",or:"OR"};class iR{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function jh(t,e){return t.useProto3Json||Bu(e)?e:{value:e}}function ou(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function M1(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function oR(t,e){return ou(t,e.toTimestamp())}function vn(t){return fe(!!t),ee.fromTimestamp(function(n){const r=br(n);return new Fe(r.seconds,r.nanos)}(t))}function hp(t,e){return Lh(t,e).canonicalString()}function Lh(t,e){const n=function(s){return new _e(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function U1(t){const e=_e.fromString(t);return fe(H1(e)),e}function Vh(t,e){return hp(t.databaseId,e.path)}function pd(t,e){const n=U1(e);if(n.get(1)!==t.databaseId.projectId)throw new W(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new W(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Y(B1(n))}function F1(t,e){return hp(t.databaseId,e)}function aR(t){const e=U1(t);return e.length===4?_e.emptyPath():B1(e)}function Mh(t){return new _e(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function B1(t){return fe(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function ov(t,e,n){return{name:Vh(t,e),fields:n.value.mapValue.fields}}function lR(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:Z()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(c,f){return c.useProto3Json?(fe(f===void 0||typeof f=="string"),Xe.fromBase64String(f||"")):(fe(f===void 0||f instanceof Buffer||f instanceof Uint8Array),Xe.fromUint8Array(f||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(c){const f=c.code===void 0?M.UNKNOWN:j1(c.code);return new W(f,c.message||"")}(o);n=new V1(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=pd(t,r.document.name),i=vn(r.document.updateTime),o=r.document.createTime?vn(r.document.createTime):ee.min(),l=new Et({mapValue:{fields:r.document.fields}}),u=at.newFoundDocument(s,i,o,l),c=r.targetIds||[],f=r.removedTargetIds||[];n=new wl(c,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=pd(t,r.document),i=r.readTime?vn(r.readTime):ee.min(),o=at.newNoDocument(s,i),l=r.removedTargetIds||[];n=new wl([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=pd(t,r.document),i=r.removedTargetIds||[];n=new wl([],i,s,null)}else{if(!("filter"in e))return Z();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new Xb(s,i),l=r.targetId;n=new L1(l,o)}}return n}function uR(t,e){let n;if(e instanceof oa)n={update:ov(t,e.key,e.value)};else if(e instanceof up)n={delete:Vh(t,e.key)};else if(e instanceof Lr)n={update:ov(t,e.key,e.data),updateMask:vR(e.fieldMask)};else{if(!(e instanceof Gb))return Z();n={verify:Vh(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const l=o.transform;if(l instanceof su)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof zo)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof $o)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof iu)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw Z()}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:oR(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:Z()}(t,e.precondition)),n}function cR(t,e){return t&&t.length>0?(fe(e!==void 0),t.map(n=>function(s,i){let o=s.updateTime?vn(s.updateTime):vn(i);return o.isEqual(ee.min())&&(o=vn(i)),new Wb(o,s.transformResults||[])}(n,e))):[]}function dR(t,e){return{documents:[F1(t,e.path)]}}function hR(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=F1(t,s);const i=function(c){if(c.length!==0)return $1(an.create(c,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(c){if(c.length!==0)return c.map(f=>function(g){return{field:Cs(g.field),direction:mR(g.dir)}}(f))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=jh(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{_t:n,parent:s}}function fR(t){let e=aR(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){fe(r===1);const f=n.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];n.where&&(i=function(m){const g=z1(m);return g instanceof an&&v1(g)?g.getFilters():[g]}(n.where));let o=[];n.orderBy&&(o=function(m){return m.map(g=>function(C){return new ru(bs(C.field),function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(g))}(n.orderBy));let l=null;n.limit&&(l=function(m){let g;return g=typeof m=="object"?m.value:m,Bu(g)?null:g}(n.limit));let u=null;n.startAt&&(u=function(m){const g=!!m.before,k=m.values||[];return new nu(k,g)}(n.startAt));let c=null;return n.endAt&&(c=function(m){const g=!m.before,k=m.values||[];return new nu(k,g)}(n.endAt)),Pb(e,s,o,i,l,"F",u,c)}function pR(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Z()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function z1(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=bs(n.unaryFilter.field);return Le.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=bs(n.unaryFilter.field);return Le.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=bs(n.unaryFilter.field);return Le.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=bs(n.unaryFilter.field);return Le.create(o,"!=",{nullValue:"NULL_VALUE"});default:return Z()}}(t):t.fieldFilter!==void 0?function(n){return Le.create(bs(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return Z()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return an.create(n.compositeFilter.filters.map(r=>z1(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return Z()}}(n.compositeFilter.op))}(t):Z()}function mR(t){return nR[t]}function gR(t){return rR[t]}function yR(t){return sR[t]}function Cs(t){return{fieldPath:t.canonicalString()}}function bs(t){return Ke.fromServerFormat(t.fieldPath)}function $1(t){return t instanceof Le?function(n){if(n.op==="=="){if(qy(n.value))return{unaryFilter:{field:Cs(n.field),op:"IS_NAN"}};if(Wy(n.value))return{unaryFilter:{field:Cs(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(qy(n.value))return{unaryFilter:{field:Cs(n.field),op:"IS_NOT_NAN"}};if(Wy(n.value))return{unaryFilter:{field:Cs(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Cs(n.field),op:gR(n.op),value:n.value}}}(t):t instanceof an?function(n){const r=n.getFilters().map(s=>$1(s));return r.length===1?r[0]:{compositeFilter:{op:yR(n.op),filters:r}}}(t):Z()}function vR(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function H1(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(e,n,r,s,i=ee.min(),o=ee.min(),l=Xe.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new fr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new fr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new fr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new fr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _R{constructor(e){this.ct=e}}function wR(t){const e=fR({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Oh(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xR{constructor(){this.un=new ER}addToCollectionParentIndex(e,n){return this.un.add(n),F.resolve()}getCollectionParents(e,n){return F.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return F.resolve()}deleteFieldIndex(e,n){return F.resolve()}deleteAllFieldIndexes(e){return F.resolve()}createTargetIndexes(e,n){return F.resolve()}getDocumentsMatchingTarget(e,n){return F.resolve(null)}getIndexType(e,n){return F.resolve(0)}getFieldIndexes(e,n){return F.resolve([])}getNextCollectionGroupToUpdate(e){return F.resolve(null)}getMinOffset(e,n){return F.resolve(Cr.min())}getMinOffsetFromCollectionGroup(e,n){return F.resolve(Cr.min())}updateCollectionGroup(e,n,r){return F.resolve()}updateIndexEntries(e,n){return F.resolve()}}class ER{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new Qe(_e.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Qe(_e.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new di(0)}static kn(){return new di(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TR{constructor(){this.changes=new Ei(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,at.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?F.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IR{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SR{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&go(r.mutation,s,Ot.empty(),Fe.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,ie()).next(()=>r))}getLocalViewOfDocuments(e,n,r=ie()){const s=Kr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=Zi();return i.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Kr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,ie()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,s){let i=Hn();const o=mo(),l=function(){return mo()}();return n.forEach((u,c)=>{const f=r.get(c.key);s.has(c.key)&&(f===void 0||f.mutation instanceof Lr)?i=i.insert(c.key,c):f!==void 0?(o.set(c.key,f.mutation.getFieldMask()),go(f.mutation,c,f.mutation.getFieldMask(),Fe.now())):o.set(c.key,Ot.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((c,f)=>o.set(c,f)),n.forEach((c,f)=>{var m;return l.set(c,new IR(f,(m=o.get(c))!==null&&m!==void 0?m:null))}),l))}recalculateAndSaveOverlays(e,n){const r=mo();let s=new ke((o,l)=>o-l),i=ie();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(u=>{const c=n.get(u);if(c===null)return;let f=r.get(u)||Ot.empty();f=l.applyToLocalView(c,f),r.set(u,f);const m=(s.get(l.batchId)||ie()).add(u);s=s.insert(l.batchId,m)})}).next(()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),c=u.key,f=u.value,m=k1();f.forEach(g=>{if(!i.has(g)){const k=D1(n.get(g),r.get(g));k!==null&&m.set(g,k),i=i.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,m))}return F.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(o){return Y.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):E1(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):F.resolve(Kr());let l=-1,u=i;return o.next(c=>F.forEach(c,(f,m)=>(l<m.largestBatchId&&(l=m.largestBatchId),i.get(f)?F.resolve():this.remoteDocumentCache.getEntry(e,f).next(g=>{u=u.insert(f,g)}))).next(()=>this.populateOverlays(e,c,i)).next(()=>this.computeViews(e,u,c,ie())).next(f=>({batchId:l,changes:A1(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new Y(n)).next(r=>{let s=Zi();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=Zi();return this.indexManager.getCollectionParents(e,i).next(l=>F.forEach(l,u=>{const c=function(m,g){return new ia(g,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(n,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,c,r,s).next(f=>{f.forEach((m,g)=>{o=o.insert(m,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(o=>{i.forEach((u,c)=>{const f=c.getKey();o.get(f)===null&&(o=o.insert(f,at.newInvalidDocument(f)))});let l=Zi();return o.forEach((u,c)=>{const f=i.get(u);f!==void 0&&go(f.mutation,c,Ot.empty(),Fe.now()),Hu(n,c)&&(l=l.insert(u,c))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AR{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return F.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:vn(s.createTime)}}(n)),F.resolve()}getNamedQuery(e,n){return F.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(s){return{name:s.name,query:wR(s.bundledQuery),readTime:vn(s.readTime)}}(n)),F.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kR{constructor(){this.overlays=new ke(Y.comparator),this.Ir=new Map}getOverlay(e,n){return F.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Kr();return F.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.ht(e,n,i)}),F.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(r)),F.resolve()}getOverlaysForCollection(e,n,r){const s=Kr(),i=n.length+1,o=new Y(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,c=u.getKey();if(!n.isPrefixOf(c.path))break;c.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return F.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new ke((c,f)=>c-f);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===n&&c.largestBatchId>r){let f=i.get(c.largestBatchId);f===null&&(f=Kr(),i=i.insert(c.largestBatchId,f)),f.set(c.getKey(),c)}}const l=Kr(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((c,f)=>l.set(c,f)),!(l.size()>=s)););return F.resolve(l)}ht(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Yb(n,r));let i=this.Ir.get(n);i===void 0&&(i=ie(),this.Ir.set(n,i)),this.Ir.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CR{constructor(){this.sessionToken=Xe.EMPTY_BYTE_STRING}getSessionToken(e){return F.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,F.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fp{constructor(){this.Tr=new Qe(Be.Er),this.dr=new Qe(Be.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new Be(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new Be(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new Y(new _e([])),r=new Be(n,e),s=new Be(n,e+1),i=[];return this.dr.forEachInRange([r,s],o=>{this.Vr(o),i.push(o.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new Y(new _e([])),r=new Be(n,e),s=new Be(n,e+1);let i=ie();return this.dr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new Be(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Be{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return Y.comparator(e.key,n.key)||de(e.wr,n.wr)}static Ar(e,n){return de(e.wr,n.wr)||Y.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bR{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new Qe(Be.Er)}checkEmpty(e){return F.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Qb(i,n,r,s);this.mutationQueue.push(o);for(const l of s)this.br=this.br.add(new Be(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return F.resolve(o)}lookupMutationBatch(e,n){return F.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.vr(r),i=s<0?0:s;return F.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return F.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return F.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Be(n,0),s=new Be(n,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],o=>{const l=this.Dr(o.wr);i.push(l)}),F.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Qe(de);return n.forEach(s=>{const i=new Be(s,0),o=new Be(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,o],l=>{r=r.add(l.wr)})}),F.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;Y.isDocumentKey(i)||(i=i.child(""));const o=new Be(new Y(i),0);let l=new Qe(de);return this.br.forEachWhile(u=>{const c=u.key.path;return!!r.isPrefixOf(c)&&(c.length===s&&(l=l.add(u.wr)),!0)},o),F.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){fe(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return F.forEach(n.mutations,s=>{const i=new Be(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new Be(n,0),s=this.br.firstAfterOrEqual(r);return F.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,F.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RR{constructor(e){this.Mr=e,this.docs=function(){return new ke(Y.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return F.resolve(r?r.document.mutableCopy():at.newInvalidDocument(n))}getEntries(e,n){let r=Hn();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():at.newInvalidDocument(s))}),F.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=Hn();const o=n.path,l=new Y(o.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:c,value:{document:f}}=u.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||fb(hb(f),r)<=0||(s.has(f.key)||Hu(n,f))&&(i=i.insert(f.key,f.mutableCopy()))}return F.resolve(i)}getAllFromCollectionGroup(e,n,r,s){Z()}Or(e,n){return F.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new NR(this)}getSize(e){return F.resolve(this.size)}}class NR extends TR{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),F.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PR{constructor(e){this.persistence=e,this.Nr=new Ei(n=>op(n),ap),this.lastRemoteSnapshotVersion=ee.min(),this.highestTargetId=0,this.Lr=0,this.Br=new fp,this.targetCount=0,this.kr=di.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,s)=>n(s)),F.resolve()}getLastRemoteSnapshotVersion(e){return F.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return F.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),F.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),F.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new di(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,F.resolve()}updateTargetData(e,n){return this.Kn(n),F.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,F.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),F.waitFor(i).next(()=>s)}getTargetCount(e){return F.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return F.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),F.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),F.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),F.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return F.resolve(r)}containsKey(e,n){return F.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DR{constructor(e,n){this.qr={},this.overlays={},this.Qr=new np(0),this.Kr=!1,this.Kr=!0,this.$r=new CR,this.referenceDelegate=e(this),this.Ur=new PR(this),this.indexManager=new xR,this.remoteDocumentCache=function(s){return new RR(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new _R(n),this.Gr=new AR(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new kR,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new bR(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){G("MemoryPersistence","Starting transaction:",e);const s=new OR(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,n){return F.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class OR extends mb{constructor(e){super(),this.currentSequenceNumber=e}}class pp{constructor(e){this.persistence=e,this.Jr=new fp,this.Yr=null}static Zr(e){return new pp(e)}get Xr(){if(this.Yr)return this.Yr;throw Z()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),F.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),F.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),F.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return F.forEach(this.Xr,r=>{const s=Y.fromPath(r);return this.ei(e,s).next(i=>{i||n.removeEntry(s,ee.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return F.or([()=>F.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mp{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=s}static Wi(e,n){let r=ie(),s=ie();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new mp(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jR{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LR{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return kS()?8:gb(ct())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.Yi(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Zi(e,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new jR;return this.Xi(e,n,o).next(l=>{if(i.result=l,this.zi)return this.es(e,n,o,l.size)})}).next(()=>i.result)}es(e,n,r,s){return r.documentReadCount<this.ji?(Wi()<=oe.DEBUG&&G("QueryEngine","SDK will not create cache indexes for query:",ks(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),F.resolve()):(Wi()<=oe.DEBUG&&G("QueryEngine","Query:",ks(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(Wi()<=oe.DEBUG&&G("QueryEngine","The SDK decides to create cache indexes for query:",ks(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,yn(n))):F.resolve())}Yi(e,n){if(Yy(n))return F.resolve(null);let r=yn(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=Oh(n,null,"F"),r=yn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=ie(...i);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const c=this.ts(n,l);return this.ns(n,c,o,u.readTime)?this.Yi(e,Oh(n,null,"F")):this.rs(e,c,n,u)}))})))}Zi(e,n,r,s){return Yy(n)||s.isEqual(ee.min())?F.resolve(null):this.Ji.getDocuments(e,r).next(i=>{const o=this.ts(n,i);return this.ns(n,o,r,s)?F.resolve(null):(Wi()<=oe.DEBUG&&G("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),ks(n)),this.rs(e,o,n,db(s,-1)).next(l=>l))})}ts(e,n){let r=new Qe(I1(e));return n.forEach((s,i)=>{Hu(e,i)&&(r=r.add(i))}),r}ns(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,n,r){return Wi()<=oe.DEBUG&&G("QueryEngine","Using full collection scan to execute query:",ks(n)),this.Ji.getDocumentsMatchingQuery(e,n,Cr.min(),r)}rs(e,n,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VR{constructor(e,n,r,s){this.persistence=e,this.ss=n,this.serializer=s,this.os=new ke(de),this._s=new Ei(i=>op(i),ap),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new SR(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function MR(t,e,n,r){return new VR(t,e,n,r)}async function W1(t,e){const n=te(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],l=[];let u=ie();for(const c of s){o.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}for(const c of i){l.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}return n.localDocuments.getDocuments(r,u).next(c=>({hs:c,removedBatchIds:o,addedBatchIds:l}))})})}function UR(t,e){const n=te(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,u,c,f){const m=c.batch,g=m.keys();let k=F.resolve();return g.forEach(C=>{k=k.next(()=>f.getEntry(u,C)).next(N=>{const P=c.docVersions.get(C);fe(P!==null),N.version.compareTo(P)<0&&(m.applyToRemoteDocument(N,c),N.isValidDocument()&&(N.setReadTime(c.commitVersion),f.addEntry(N)))})}),k.next(()=>l.mutationQueue.removeMutationBatch(u,m))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=ie();for(let c=0;c<l.mutationResults.length;++c)l.mutationResults[c].transformResults.length>0&&(u=u.add(l.batch.mutations[c].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function q1(t){const e=te(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function FR(t,e){const n=te(t),r=e.snapshotVersion;let s=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});s=n.os;const l=[];e.targetChanges.forEach((f,m)=>{const g=s.get(m);if(!g)return;l.push(n.Ur.removeMatchingKeys(i,f.removedDocuments,m).next(()=>n.Ur.addMatchingKeys(i,f.addedDocuments,m)));let k=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?k=k.withResumeToken(Xe.EMPTY_BYTE_STRING,ee.min()).withLastLimboFreeSnapshotVersion(ee.min()):f.resumeToken.approximateByteSize()>0&&(k=k.withResumeToken(f.resumeToken,r)),s=s.insert(m,k),function(N,P,A){return N.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=3e8?!0:A.addedDocuments.size+A.modifiedDocuments.size+A.removedDocuments.size>0}(g,k,f)&&l.push(n.Ur.updateTargetData(i,k))});let u=Hn(),c=ie();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,f))}),l.push(BR(i,o,e.documentUpdates).next(f=>{u=f.Ps,c=f.Is})),!r.isEqual(ee.min())){const f=n.Ur.getLastRemoteSnapshotVersion(i).next(m=>n.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(f)}return F.waitFor(l).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,u,c)).next(()=>u)}).then(i=>(n.os=s,i))}function BR(t,e,n){let r=ie(),s=ie();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=Hn();return n.forEach((l,u)=>{const c=i.get(l);u.isFoundDocument()!==c.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(ee.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!c.isValidDocument()||u.version.compareTo(c.version)>0||u.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):G("LocalStore","Ignoring outdated watch update for ",l,". Current version:",c.version," Watch version:",u.version)}),{Ps:o,Is:s}})}function zR(t,e){const n=te(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function $R(t,e){const n=te(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Ur.getTargetData(r,e).next(i=>i?(s=i,F.resolve(s)):n.Ur.allocateTargetId(r).next(o=>(s=new fr(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function Uh(t,e,n){const r=te(t),s=r.os.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!sa(o))throw o;G("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function av(t,e,n){const r=te(t);let s=ee.min(),i=ie();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,c,f){const m=te(u),g=m._s.get(f);return g!==void 0?F.resolve(m.os.get(g)):m.Ur.getTargetData(c,f)}(r,o,yn(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,l.targetId).next(u=>{i=u})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?s:ee.min(),n?i:ie())).next(l=>(HR(r,Ob(e),l),{documents:l,Ts:i})))}function HR(t,e,n){let r=t.us.get(e)||ee.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.us.set(e,r)}class lv{constructor(){this.activeTargetIds=Fb()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class WR{constructor(){this.so=new lv,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new lv,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qR{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uv{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){G("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){G("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Za=null;function md(){return Za===null?Za=function(){return 268435456+Math.round(2147483648*Math.random())}():Za++,"0x"+Za.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KR={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GR{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const st="WebChannelConnection";class QR extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(n,r,s,i,o){const l=md(),u=this.xo(n,r.toUriEncodedString());G("RestConnection",`Sending RPC '${n}' ${l}:`,u,s);const c={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(c,i,o),this.No(n,u,c,s).then(f=>(G("RestConnection",`Received RPC '${n}' ${l}: `,f),f),f=>{throw ai("RestConnection",`RPC '${n}' ${l} failed with error: `,f,"url: ",u,"request:",s),f})}Lo(n,r,s,i,o,l){return this.Mo(n,r,s,i,o)}Oo(n,r,s){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+xi}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,o)=>n[o]=i),s&&s.headers.forEach((i,o)=>n[o]=i)}xo(n,r){const s=KR[n];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,s){const i=md();return new Promise((o,l)=>{const u=new o1;u.setWithCredentials(!0),u.listenOnce(a1.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case yl.NO_ERROR:const f=u.getResponseJson();G(st,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(f)),o(f);break;case yl.TIMEOUT:G(st,`RPC '${e}' ${i} timed out`),l(new W(M.DEADLINE_EXCEEDED,"Request time out"));break;case yl.HTTP_ERROR:const m=u.getStatus();if(G(st,`RPC '${e}' ${i} failed with status:`,m,"response text:",u.getResponseText()),m>0){let g=u.getResponseJson();Array.isArray(g)&&(g=g[0]);const k=g==null?void 0:g.error;if(k&&k.status&&k.message){const C=function(P){const A=P.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(A)>=0?A:M.UNKNOWN}(k.status);l(new W(C,k.message))}else l(new W(M.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new W(M.UNAVAILABLE,"Connection failed."));break;default:Z()}}finally{G(st,`RPC '${e}' ${i} completed.`)}});const c=JSON.stringify(s);G(st,`RPC '${e}' ${i} sending request:`,s),u.send(n,"POST",c,r,15)})}Bo(e,n,r){const s=md(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=c1(),l=u1(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const f=i.join("");G(st,`Creating RPC '${e}' stream ${s}: ${f}`,u);const m=o.createWebChannel(f,u);let g=!1,k=!1;const C=new GR({Io:P=>{k?G(st,`Not sending because RPC '${e}' stream ${s} is closed:`,P):(g||(G(st,`Opening RPC '${e}' stream ${s} transport.`),m.open(),g=!0),G(st,`RPC '${e}' stream ${s} sending:`,P),m.send(P))},To:()=>m.close()}),N=(P,A,_)=>{P.listen(A,T=>{try{_(T)}catch(R){setTimeout(()=>{throw R},0)}})};return N(m,Ji.EventType.OPEN,()=>{k||(G(st,`RPC '${e}' stream ${s} transport opened.`),C.yo())}),N(m,Ji.EventType.CLOSE,()=>{k||(k=!0,G(st,`RPC '${e}' stream ${s} transport closed`),C.So())}),N(m,Ji.EventType.ERROR,P=>{k||(k=!0,ai(st,`RPC '${e}' stream ${s} transport errored:`,P),C.So(new W(M.UNAVAILABLE,"The operation could not be completed")))}),N(m,Ji.EventType.MESSAGE,P=>{var A;if(!k){const _=P.data[0];fe(!!_);const T=_,R=T.error||((A=T[0])===null||A===void 0?void 0:A.error);if(R){G(st,`RPC '${e}' stream ${s} received error:`,R);const L=R.status;let V=function(x){const S=Oe[x];if(S!==void 0)return j1(S)}(L),w=R.message;V===void 0&&(V=M.INTERNAL,w="Unknown error status: "+L+" with message "+R.message),k=!0,C.So(new W(V,w)),m.close()}else G(st,`RPC '${e}' stream ${s} received:`,_),C.bo(_)}}),N(l,l1.STAT_EVENT,P=>{P.stat===Ch.PROXY?G(st,`RPC '${e}' stream ${s} detected buffering proxy`):P.stat===Ch.NOPROXY&&G(st,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{C.wo()},0),C}}function gd(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gu(t){return new iR(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K1{constructor(e,n,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&G("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G1{constructor(e,n,r,s,i,o,l,u){this.ui=e,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new K1(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===M.RESOURCE_EXHAUSTED?($n(n.toString()),$n("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===n&&this.P_(r,s)},r=>{e(()=>{const s=new W(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return G("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(G("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class YR extends G1{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=lR(this.serializer,e),r=function(i){if(!("targetChange"in i))return ee.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?ee.min():o.readTime?vn(o.readTime):ee.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=Mh(this.serializer),n.addTarget=function(i,o){let l;const u=o.target;if(l=Ph(u)?{documents:dR(i,u)}:{query:hR(i,u)._t},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=M1(i,o.resumeToken);const c=jh(i,o.expectedCount);c!==null&&(l.expectedCount=c)}else if(o.snapshotVersion.compareTo(ee.min())>0){l.readTime=ou(i,o.snapshotVersion.toTimestamp());const c=jh(i,o.expectedCount);c!==null&&(l.expectedCount=c)}return l}(this.serializer,e);const r=pR(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=Mh(this.serializer),n.removeTarget=e,this.a_(n)}}class XR extends G1{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return fe(!!e.streamToken),this.lastStreamToken=e.streamToken,fe(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){fe(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=cR(e.writeResults,e.commitTime),r=vn(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=Mh(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>uR(this.serializer,r))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JR extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new W(M.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Mo(e,Lh(n,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new W(M.UNKNOWN,i.toString())})}Lo(e,n,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,Lh(n,r),s,o,l,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new W(M.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class ZR{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?($n(n),this.D_=!1):G("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eN{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(o=>{r.enqueueAndForget(async()=>{_s(this)&&(G("RemoteStore","Restarting streams for network reachability change."),await async function(u){const c=te(u);c.L_.add(4),await la(c),c.q_.set("Unknown"),c.L_.delete(4),await Qu(c)}(this))})}),this.q_=new ZR(r,s)}}async function Qu(t){if(_s(t))for(const e of t.B_)await e(!0)}async function la(t){for(const e of t.B_)await e(!1)}function Q1(t,e){const n=te(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),_p(n)?vp(n):Ti(n).r_()&&yp(n,e))}function gp(t,e){const n=te(t),r=Ti(n);n.N_.delete(e),r.r_()&&Y1(n,e),n.N_.size===0&&(r.r_()?r.o_():_s(n)&&n.q_.set("Unknown"))}function yp(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ee.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Ti(t).A_(e)}function Y1(t,e){t.Q_.xe(e),Ti(t).R_(e)}function vp(t){t.Q_=new tR({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),Ti(t).start(),t.q_.v_()}function _p(t){return _s(t)&&!Ti(t).n_()&&t.N_.size>0}function _s(t){return te(t).L_.size===0}function X1(t){t.Q_=void 0}async function tN(t){t.q_.set("Online")}async function nN(t){t.N_.forEach((e,n)=>{yp(t,e)})}async function rN(t,e){X1(t),_p(t)?(t.q_.M_(e),vp(t)):t.q_.set("Unknown")}async function sN(t,e,n){if(t.q_.set("Online"),e instanceof V1&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const l of i.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.N_.delete(l),s.Q_.removeTarget(l))}(t,e)}catch(r){G("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await au(t,r)}else if(e instanceof wl?t.Q_.Ke(e):e instanceof L1?t.Q_.He(e):t.Q_.We(e),!n.isEqual(ee.min()))try{const r=await q1(t.localStore);n.compareTo(r)>=0&&await function(i,o){const l=i.Q_.rt(o);return l.targetChanges.forEach((u,c)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.N_.get(c);f&&i.N_.set(c,f.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,c)=>{const f=i.N_.get(u);if(!f)return;i.N_.set(u,f.withResumeToken(Xe.EMPTY_BYTE_STRING,f.snapshotVersion)),Y1(i,u);const m=new fr(f.target,u,c,f.sequenceNumber);yp(i,m)}),i.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){G("RemoteStore","Failed to raise snapshot:",r),await au(t,r)}}async function au(t,e,n){if(!sa(e))throw e;t.L_.add(1),await la(t),t.q_.set("Offline"),n||(n=()=>q1(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{G("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await Qu(t)})}function J1(t,e){return e().catch(n=>au(t,n,e))}async function Yu(t){const e=te(t),n=Rr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;iN(e);)try{const s=await zR(e.localStore,r);if(s===null){e.O_.length===0&&n.o_();break}r=s.batchId,oN(e,s)}catch(s){await au(e,s)}Z1(e)&&ex(e)}function iN(t){return _s(t)&&t.O_.length<10}function oN(t,e){t.O_.push(e);const n=Rr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function Z1(t){return _s(t)&&!Rr(t).n_()&&t.O_.length>0}function ex(t){Rr(t).start()}async function aN(t){Rr(t).p_()}async function lN(t){const e=Rr(t);for(const n of t.O_)e.m_(n.mutations)}async function uN(t,e,n){const r=t.O_.shift(),s=cp.from(r,e,n);await J1(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await Yu(t)}async function cN(t,e){e&&Rr(t).V_&&await async function(r,s){if(function(o){return Jb(o)&&o!==M.ABORTED}(s.code)){const i=r.O_.shift();Rr(r).s_(),await J1(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Yu(r)}}(t,e),Z1(t)&&ex(t)}async function cv(t,e){const n=te(t);n.asyncQueue.verifyOperationInProgress(),G("RemoteStore","RemoteStore received new credentials");const r=_s(n);n.L_.add(3),await la(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await Qu(n)}async function dN(t,e){const n=te(t);e?(n.L_.delete(2),await Qu(n)):e||(n.L_.add(2),await la(n),n.q_.set("Unknown"))}function Ti(t){return t.K_||(t.K_=function(n,r,s){const i=te(n);return i.w_(),new YR(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:tN.bind(null,t),Ro:nN.bind(null,t),mo:rN.bind(null,t),d_:sN.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),_p(t)?vp(t):t.q_.set("Unknown")):(await t.K_.stop(),X1(t))})),t.K_}function Rr(t){return t.U_||(t.U_=function(n,r,s){const i=te(n);return i.w_(),new XR(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:aN.bind(null,t),mo:cN.bind(null,t),f_:lN.bind(null,t),g_:uN.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await Yu(t)):(await t.U_.stop(),t.O_.length>0&&(G("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wp{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Ln,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,l=new wp(e,n,o,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new W(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function xp(t,e){if($n("AsyncQueue",`${e}: ${t}`),sa(t))return new W(M.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e){this.comparator=e?(n,r)=>e(n,r)||Y.comparator(n.key,r.key):(n,r)=>Y.comparator(n.key,r.key),this.keyedMap=Zi(),this.sortedSet=new ke(this.comparator)}static emptySet(e){return new Js(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Js)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Js;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dv{constructor(){this.W_=new ke(Y.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):Z():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class hi{constructor(e,n,r,s,i,o,l,u,c){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=c}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new hi(e,n,Js.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&$u(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hN{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class fN{constructor(){this.queries=hv(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const s=te(n),i=s.queries;s.queries=hv(),i.forEach((o,l)=>{for(const u of l.j_)u.onError(r)})})(this,new W(M.ABORTED,"Firestore shutting down"))}}function hv(){return new Ei(t=>T1(t),$u)}async function Ep(t,e){const n=te(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.H_()&&e.J_()&&(r=2):(i=new hN,r=e.J_()?0:1);try{switch(r){case 0:i.z_=await n.onListen(s,!0);break;case 1:i.z_=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const l=xp(o,`Initialization of query '${ks(e.query)}' failed`);return void e.onError(l)}n.queries.set(s,i),i.j_.push(e),e.Z_(n.onlineState),i.z_&&e.X_(i.z_)&&Ip(n)}async function Tp(t,e){const n=te(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.j_.indexOf(e);o>=0&&(i.j_.splice(o,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function pN(t,e){const n=te(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const l of o.j_)l.X_(s)&&(r=!0);o.z_=s}}r&&Ip(n)}function mN(t,e,n){const r=te(t),s=r.queries.get(e);if(s)for(const i of s.j_)i.onError(n);r.queries.delete(e)}function Ip(t){t.Y_.forEach(e=>{e.next()})}var Fh,fv;(fv=Fh||(Fh={})).ea="default",fv.Cache="cache";class Sp{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new hi(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=hi.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Fh.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tx{constructor(e){this.key=e}}class nx{constructor(e){this.key=e}}class gN{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=ie(),this.mutatedKeys=ie(),this.Aa=I1(e),this.Ra=new Js(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new dv,s=n?n.Ra:this.Ra;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,c=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,m)=>{const g=s.get(f),k=Hu(this.query,m)?m:null,C=!!g&&this.mutatedKeys.has(g.key),N=!!k&&(k.hasLocalMutations||this.mutatedKeys.has(k.key)&&k.hasCommittedMutations);let P=!1;g&&k?g.data.isEqual(k.data)?C!==N&&(r.track({type:3,doc:k}),P=!0):this.ga(g,k)||(r.track({type:2,doc:k}),P=!0,(u&&this.Aa(k,u)>0||c&&this.Aa(k,c)<0)&&(l=!0)):!g&&k?(r.track({type:0,doc:k}),P=!0):g&&!k&&(r.track({type:1,doc:g}),P=!0,(u||c)&&(l=!0)),P&&(k?(o=o.add(k),i=N?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{Ra:o,fa:r,ns:l,mutatedKeys:i}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((f,m)=>function(k,C){const N=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Z()}};return N(k)-N(C)}(f.type,m.type)||this.Aa(f.doc,m.doc)),this.pa(r),s=s!=null&&s;const l=n&&!s?this.ya():[],u=this.da.size===0&&this.current&&!s?1:0,c=u!==this.Ea;return this.Ea=u,o.length!==0||c?{snapshot:new hi(this.query,e.Ra,i,o,e.mutatedKeys,u===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new dv,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=ie(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new nx(r))}),this.da.forEach(r=>{e.has(r)||n.push(new tx(r))}),n}ba(e){this.Ta=e.Ts,this.da=ie();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return hi.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class yN{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class vN{constructor(e){this.key=e,this.va=!1}}class _N{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Ei(l=>T1(l),$u),this.Ma=new Map,this.xa=new Set,this.Oa=new ke(Y.comparator),this.Na=new Map,this.La=new fp,this.Ba={},this.ka=new Map,this.qa=di.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function wN(t,e,n=!0){const r=lx(t);let s;const i=r.Fa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await rx(r,e,n,!0),s}async function xN(t,e){const n=lx(t);await rx(n,e,!0,!1)}async function rx(t,e,n,r){const s=await $R(t.localStore,yn(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let l;return r&&(l=await EN(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&Q1(t.remoteStore,s),l}async function EN(t,e,n,r,s){t.Ka=(m,g,k)=>async function(N,P,A,_){let T=P.view.ma(A);T.ns&&(T=await av(N.localStore,P.query,!1).then(({documents:w})=>P.view.ma(w,T)));const R=_&&_.targetChanges.get(P.targetId),L=_&&_.targetMismatches.get(P.targetId)!=null,V=P.view.applyChanges(T,N.isPrimaryClient,R,L);return mv(N,P.targetId,V.wa),V.snapshot}(t,m,g,k);const i=await av(t.localStore,e,!0),o=new gN(e,i.Ts),l=o.ma(i.documents),u=aa.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),c=o.applyChanges(l,t.isPrimaryClient,u);mv(t,n,c.wa);const f=new yN(e,n,o);return t.Fa.set(e,f),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),c.snapshot}async function TN(t,e,n){const r=te(t),s=r.Fa.get(e),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter(o=>!$u(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Uh(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&gp(r.remoteStore,s.targetId),Bh(r,s.targetId)}).catch(ra)):(Bh(r,s.targetId),await Uh(r.localStore,s.targetId,!0))}async function IN(t,e){const n=te(t),r=n.Fa.get(e),s=n.Ma.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),gp(n.remoteStore,r.targetId))}async function SN(t,e,n){const r=PN(t);try{const s=await function(o,l){const u=te(o),c=Fe.now(),f=l.reduce((k,C)=>k.add(C.key),ie());let m,g;return u.persistence.runTransaction("Locally write mutations","readwrite",k=>{let C=Hn(),N=ie();return u.cs.getEntries(k,f).next(P=>{C=P,C.forEach((A,_)=>{_.isValidDocument()||(N=N.add(A))})}).next(()=>u.localDocuments.getOverlayedDocuments(k,C)).next(P=>{m=P;const A=[];for(const _ of l){const T=Kb(_,m.get(_.key).overlayedDocument);T!=null&&A.push(new Lr(_.key,T,m1(T.value.mapValue),$t.exists(!0)))}return u.mutationQueue.addMutationBatch(k,c,A,l)}).next(P=>{g=P;const A=P.applyToLocalDocumentSet(m,N);return u.documentOverlayCache.saveOverlays(k,P.batchId,A)})}).then(()=>({batchId:g.batchId,changes:A1(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,l,u){let c=o.Ba[o.currentUser.toKey()];c||(c=new ke(de)),c=c.insert(l,u),o.Ba[o.currentUser.toKey()]=c}(r,s.batchId,n),await ua(r,s.changes),await Yu(r.remoteStore)}catch(s){const i=xp(s,"Failed to persist write");n.reject(i)}}async function sx(t,e){const n=te(t);try{const r=await FR(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Na.get(i);o&&(fe(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.va=!0:s.modifiedDocuments.size>0?fe(o.va):s.removedDocuments.size>0&&(fe(o.va),o.va=!1))}),await ua(n,r,e)}catch(r){await ra(r)}}function pv(t,e,n){const r=te(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Fa.forEach((i,o)=>{const l=o.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(o,l){const u=te(o);u.onlineState=l;let c=!1;u.queries.forEach((f,m)=>{for(const g of m.j_)g.Z_(l)&&(c=!0)}),c&&Ip(u)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function AN(t,e,n){const r=te(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Na.get(e),i=s&&s.key;if(i){let o=new ke(Y.comparator);o=o.insert(i,at.newNoDocument(i,ee.min()));const l=ie().add(i),u=new Ku(ee.min(),new Map,new ke(de),o,l);await sx(r,u),r.Oa=r.Oa.remove(i),r.Na.delete(e),Ap(r)}else await Uh(r.localStore,e,!1).then(()=>Bh(r,e,n)).catch(ra)}async function kN(t,e){const n=te(t),r=e.batch.batchId;try{const s=await UR(n.localStore,e);ox(n,r,null),ix(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await ua(n,s)}catch(s){await ra(s)}}async function CN(t,e,n){const r=te(t);try{const s=await function(o,l){const u=te(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let f;return u.mutationQueue.lookupMutationBatch(c,l).next(m=>(fe(m!==null),f=m.keys(),u.mutationQueue.removeMutationBatch(c,m))).next(()=>u.mutationQueue.performConsistencyCheck(c)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(c,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,f)).next(()=>u.localDocuments.getDocuments(c,f))})}(r.localStore,e);ox(r,e,n),ix(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await ua(r,s)}catch(s){await ra(s)}}function ix(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function ox(t,e,n){const r=te(t);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function Bh(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||ax(t,r)})}function ax(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(gp(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),Ap(t))}function mv(t,e,n){for(const r of n)r instanceof tx?(t.La.addReference(r.key,e),bN(t,r)):r instanceof nx?(G("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||ax(t,r.key)):Z()}function bN(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(G("SyncEngine","New document in limbo: "+n),t.xa.add(r),Ap(t))}function Ap(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new Y(_e.fromString(e)),r=t.qa.next();t.Na.set(r,new vN(n)),t.Oa=t.Oa.insert(n,r),Q1(t.remoteStore,new fr(yn(zu(n.path)),r,"TargetPurposeLimboResolution",np.oe))}}async function ua(t,e,n){const r=te(t),s=[],i=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((l,u)=>{o.push(r.Ka(u,e,n).then(c=>{var f;if((c||n)&&r.isPrimaryClient){const m=c?!c.fromCache:(f=n==null?void 0:n.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(c){s.push(c);const m=mp.Wi(u.targetId,c);i.push(m)}}))}),await Promise.all(o),r.Ca.d_(s),await async function(u,c){const f=te(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>F.forEach(c,g=>F.forEach(g.$i,k=>f.persistence.referenceDelegate.addReference(m,g.targetId,k)).next(()=>F.forEach(g.Ui,k=>f.persistence.referenceDelegate.removeReference(m,g.targetId,k)))))}catch(m){if(!sa(m))throw m;G("LocalStore","Failed to update sequence numbers: "+m)}for(const m of c){const g=m.targetId;if(!m.fromCache){const k=f.os.get(g),C=k.snapshotVersion,N=k.withLastLimboFreeSnapshotVersion(C);f.os=f.os.insert(g,N)}}}(r.localStore,i))}async function RN(t,e){const n=te(t);if(!n.currentUser.isEqual(e)){G("SyncEngine","User change. New user:",e.toKey());const r=await W1(n.localStore,e);n.currentUser=e,function(i,o){i.ka.forEach(l=>{l.forEach(u=>{u.reject(new W(M.CANCELLED,o))})}),i.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await ua(n,r.hs)}}function NN(t,e){const n=te(t),r=n.Na.get(e);if(r&&r.va)return ie().add(r.key);{let s=ie();const i=n.Ma.get(e);if(!i)return s;for(const o of i){const l=n.Fa.get(o);s=s.unionWith(l.view.Va)}return s}}function lx(t){const e=te(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=sx.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=NN.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=AN.bind(null,e),e.Ca.d_=pN.bind(null,e.eventManager),e.Ca.$a=mN.bind(null,e.eventManager),e}function PN(t){const e=te(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=kN.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=CN.bind(null,e),e}class lu{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Gu(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return MR(this.persistence,new LR,e.initialUser,this.serializer)}Ga(e){return new DR(pp.Zr,this.serializer)}Wa(e){return new WR}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}lu.provider={build:()=>new lu};class zh{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>pv(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=RN.bind(null,this.syncEngine),await dN(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new fN}()}createDatastore(e){const n=Gu(e.databaseInfo.databaseId),r=function(i){return new QR(i)}(e.databaseInfo);return function(i,o,l,u){return new JR(i,o,l,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,o,l){return new eN(r,s,i,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>pv(this.syncEngine,n,0),function(){return uv.D()?new uv:new qR}())}createSyncEngine(e,n){return function(s,i,o,l,u,c,f){const m=new _N(s,i,o,l,u,c);return f&&(m.Qa=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){const i=te(s);G("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await la(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}zh.provider={build:()=>new zh};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):$n("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DN{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=it.UNAUTHENTICATED,this.clientId=h1.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{G("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(G("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ln;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=xp(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function yd(t,e){t.asyncQueue.verifyOperationInProgress(),G("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await W1(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function gv(t,e){t.asyncQueue.verifyOperationInProgress();const n=await ON(t);G("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>cv(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>cv(e.remoteStore,s)),t._onlineComponents=e}async function ON(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){G("FirestoreClient","Using user provided OfflineComponentProvider");try{await yd(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===M.FAILED_PRECONDITION||s.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;ai("Error using user provided cache. Falling back to memory cache: "+n),await yd(t,new lu)}}else G("FirestoreClient","Using default OfflineComponentProvider"),await yd(t,new lu);return t._offlineComponents}async function ux(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(G("FirestoreClient","Using user provided OnlineComponentProvider"),await gv(t,t._uninitializedComponentsProvider._online)):(G("FirestoreClient","Using default OnlineComponentProvider"),await gv(t,new zh))),t._onlineComponents}function jN(t){return ux(t).then(e=>e.syncEngine)}async function uu(t){const e=await ux(t),n=e.eventManager;return n.onListen=wN.bind(null,e.syncEngine),n.onUnlisten=TN.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=xN.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=IN.bind(null,e.syncEngine),n}function LN(t,e,n={}){const r=new Ln;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,u,c){const f=new kp({next:g=>{f.Za(),o.enqueueAndForget(()=>Tp(i,m));const k=g.docs.has(l);!k&&g.fromCache?c.reject(new W(M.UNAVAILABLE,"Failed to get document because the client is offline.")):k&&g.fromCache&&u&&u.source==="server"?c.reject(new W(M.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(g)},error:g=>c.reject(g)}),m=new Sp(zu(l.path),f,{includeMetadataChanges:!0,_a:!0});return Ep(i,m)}(await uu(t),t.asyncQueue,e,n,r)),r.promise}function VN(t,e,n={}){const r=new Ln;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,u,c){const f=new kp({next:g=>{f.Za(),o.enqueueAndForget(()=>Tp(i,m)),g.fromCache&&u.source==="server"?c.reject(new W(M.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(g)},error:g=>c.reject(g)}),m=new Sp(l,f,{includeMetadataChanges:!0,_a:!0});return Ep(i,m)}(await uu(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cx(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yv=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dx(t,e,n){if(!n)throw new W(M.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function MN(t,e,n,r){if(e===!0&&r===!0)throw new W(M.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function vv(t){if(!Y.isDocumentKey(t))throw new W(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function _v(t){if(Y.isDocumentKey(t))throw new W(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Xu(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":Z()}function Ct(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new W(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Xu(t);throw new W(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wv{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new W(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new W(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}MN("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=cx((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new W(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new W(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new W(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ju{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new wv({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new W(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new W(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new wv(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new nb;switch(r.type){case"firstParty":return new ob(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new W(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=yv.get(n);r&&(G("ComponentProvider","Removing Datastore"),yv.delete(n),r.terminate())}(this),Promise.resolve()}}function UN(t,e,n,r={}){var s;const i=(t=Ct(t,Ju))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&ai("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=it.MOCK_USER;else{l=gw(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const c=r.mockUserToken.sub||r.mockUserToken.user_id;if(!c)throw new W(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new it(c)}t._authCredentials=new rb(new d1(l,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ws(this.firestore,e,this._query)}}class lt{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Sr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new lt(this.firestore,e,this._key)}}class Sr extends ws{constructor(e,n,r){super(e,n,zu(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new lt(this.firestore,null,new Y(e))}withConverter(e){return new Sr(this.firestore,e,this._path)}}function gt(t,e,...n){if(t=Ae(t),dx("collection","path",e),t instanceof Ju){const r=_e.fromString(e,...n);return _v(r),new Sr(t,null,r)}{if(!(t instanceof lt||t instanceof Sr))throw new W(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(_e.fromString(e,...n));return _v(r),new Sr(t.firestore,null,r)}}function bt(t,e,...n){if(t=Ae(t),arguments.length===1&&(e=h1.newId()),dx("doc","path",e),t instanceof Ju){const r=_e.fromString(e,...n);return vv(r),new lt(t,null,new Y(r))}{if(!(t instanceof lt||t instanceof Sr))throw new W(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(_e.fromString(e,...n));return vv(r),new lt(t.firestore,t instanceof Sr?t.converter:null,new Y(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xv{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new K1(this,"async_queue_retry"),this.Vu=()=>{const r=gd();r&&G("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=gd();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=gd();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new Ln;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!sa(e))throw e;G("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw $n("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const s=wp.createAndSchedule(this,e,n,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&Z()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function Ev(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const s=n;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(t,["next","error","complete"])}class Wn extends Ju{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new xv,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new xv(e),this._firestoreClient=void 0,await e}}}function FN(t,e){const n=typeof t=="object"?t:Lu(),r=typeof t=="string"?t:"(default)",s=ms(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=fw("firestore");i&&UN(s,...i)}return s}function Zu(t){if(t._terminated)throw new W(M.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||BN(t),t._firestoreClient}function BN(t){var e,n,r;const s=t._freezeSettings(),i=function(l,u,c,f){return new _b(l,u,c,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,cx(f.experimentalLongPollingOptions),f.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new DN(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(e){this._byteString=e}static fromBase64String(e){try{return new fi(Xe.fromBase64String(e))}catch(n){throw new W(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new fi(Xe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new W(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ke(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cp{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bp{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new W(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new W(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return de(this._lat,e._lat)||de(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rp{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zN=/^__.*__$/;class $N{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Lr(e,this.data,this.fieldMask,n,this.fieldTransforms):new oa(e,this.data,n,this.fieldTransforms)}}class hx{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Lr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function fx(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Z()}}class Np{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Np(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return cu(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(fx(this.Cu)&&zN.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class HN{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||Gu(e)}Qu(e,n,r,s=!1){return new Np({Cu:e,methodName:n,qu:r,path:Ke.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function tc(t){const e=t._freezeSettings(),n=Gu(t._databaseId);return new HN(t._databaseId,!!e.ignoreUndefinedProperties,n)}function px(t,e,n,r,s,i={}){const o=t.Qu(i.merge||i.mergeFields?2:0,e,n,s);Pp("Data must be an object, but it was:",o,r);const l=mx(r,o);let u,c;if(i.merge)u=new Ot(o.fieldMask),c=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const g=$h(e,m,n);if(!o.contains(g))throw new W(M.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);yx(f,g)||f.push(g)}u=new Ot(f),c=o.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,c=o.fieldTransforms;return new $N(new Et(l),u,c)}class nc extends Cp{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof nc}}function WN(t,e,n,r){const s=t.Qu(1,e,n);Pp("Data must be an object, but it was:",s,r);const i=[],o=Et.empty();vs(r,(u,c)=>{const f=Dp(e,u,n);c=Ae(c);const m=s.Nu(f);if(c instanceof nc)i.push(f);else{const g=ca(c,m);g!=null&&(i.push(f),o.set(f,g))}});const l=new Ot(i);return new hx(o,l,s.fieldTransforms)}function qN(t,e,n,r,s,i){const o=t.Qu(1,e,n),l=[$h(e,r,n)],u=[s];if(i.length%2!=0)throw new W(M.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)l.push($h(e,i[g])),u.push(i[g+1]);const c=[],f=Et.empty();for(let g=l.length-1;g>=0;--g)if(!yx(c,l[g])){const k=l[g];let C=u[g];C=Ae(C);const N=o.Nu(k);if(C instanceof nc)c.push(k);else{const P=ca(C,N);P!=null&&(c.push(k),f.set(k,P))}}const m=new Ot(c);return new hx(f,m,o.fieldTransforms)}function KN(t,e,n,r=!1){return ca(n,t.Qu(r?4:3,e))}function ca(t,e){if(gx(t=Ae(t)))return Pp("Unsupported field value:",e,t),mx(t,e);if(t instanceof Cp)return function(r,s){if(!fx(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const l of r){let u=ca(l,s.Lu(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=Ae(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Bb(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Fe.fromDate(r);return{timestampValue:ou(s.serializer,i)}}if(r instanceof Fe){const i=new Fe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ou(s.serializer,i)}}if(r instanceof bp)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof fi)return{bytesValue:M1(s.serializer,r._byteString)};if(r instanceof lt){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:hp(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Rp)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw l.Bu("VectorValues must only contain numeric values.");return lp(l.serializer,u)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${Xu(r)}`)}(t,e)}function mx(t,e){const n={};return f1(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):vs(t,(r,s)=>{const i=ca(s,e.Mu(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function gx(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Fe||t instanceof bp||t instanceof fi||t instanceof lt||t instanceof Cp||t instanceof Rp)}function Pp(t,e,n){if(!gx(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const r=Xu(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function $h(t,e,n){if((e=Ae(e))instanceof ec)return e._internalPath;if(typeof e=="string")return Dp(t,e);throw cu("Field path arguments must be of type string or ",t,!1,void 0,n)}const GN=new RegExp("[~\\*/\\[\\]]");function Dp(t,e,n){if(e.search(GN)>=0)throw cu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new ec(...e.split("."))._internalPath}catch{throw cu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function cu(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new W(M.INVALID_ARGUMENT,l+t+u)}function yx(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vx{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new lt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new QN(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Op("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class QN extends vx{data(){return super.data()}}function Op(t,e){return typeof e=="string"?Dp(t,e):e instanceof ec?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _x(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new W(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class jp{}class YN extends jp{}function XN(t,e,...n){let r=[];e instanceof jp&&r.push(e),r=r.concat(n),function(i){const o=i.filter(u=>u instanceof Lp).length,l=i.filter(u=>u instanceof rc).length;if(o>1||o>0&&l>0)throw new W(M.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class rc extends YN{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new rc(e,n,r)}_apply(e){const n=this._parse(e);return wx(e._query,n),new ws(e.firestore,e.converter,Dh(e._query,n))}_parse(e){const n=tc(e.firestore);return function(i,o,l,u,c,f,m){let g;if(c.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new W(M.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Iv(m,f);const k=[];for(const C of m)k.push(Tv(u,i,C));g={arrayValue:{values:k}}}else g=Tv(u,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Iv(m,f),g=KN(l,o,m,f==="in"||f==="not-in");return Le.create(c,f,g)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function JN(t,e,n){const r=e,s=Op("where",t);return rc._create(s,r,n)}class Lp extends jp{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new Lp(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:an.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(s,i){let o=s;const l=i.getFlattenedFilters();for(const u of l)wx(o,u),o=Dh(o,u)}(e._query,n),new ws(e.firestore,e.converter,Dh(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Tv(t,e,n){if(typeof(n=Ae(n))=="string"){if(n==="")throw new W(M.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!E1(e)&&n.indexOf("/")!==-1)throw new W(M.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(_e.fromString(n));if(!Y.isDocumentKey(r))throw new W(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Hy(t,new Y(r))}if(n instanceof lt)return Hy(t,n._key);throw new W(M.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Xu(n)}.`)}function Iv(t,e){if(!Array.isArray(t)||t.length===0)throw new W(M.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function wx(t,e){const n=function(s,i){for(const o of s)for(const l of o.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new W(M.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new W(M.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class ZN{convertValue(e,n="none"){switch(as(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ne(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(os(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw Z()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return vs(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){var n,r,s;const i=(s=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>Ne(o.doubleValue));return new Rp(i)}convertGeoPoint(e){return new bp(Ne(e.latitude),Ne(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=sp(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Uo(e));default:return null}}convertTimestamp(e){const n=br(e);return new Fe(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=_e.fromString(e);fe(H1(r));const s=new Fo(r.get(1),r.get(3)),i=new Y(r.popFirst(5));return s.isEqual(n)||$n(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xx(t,e,n){let r;return r=t?t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Ex extends vx{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new xl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Op("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class xl extends Ex{data(e={}){return super.data(e)}}class Tx{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new to(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new xl(this._firestore,this._userDataWriter,r.key,r,new to(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new W(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(l=>{const u=new xl(s._firestore,s._userDataWriter,l.doc.key,l.doc,new to(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const u=new xl(s._firestore,s._userDataWriter,l.doc.key,l.doc,new to(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let c=-1,f=-1;return l.type!==0&&(c=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),f=o.indexOf(l.doc.key)),{type:eP(l.type),doc:u,oldIndex:c,newIndex:f}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function eP(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Z()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function da(t){t=Ct(t,lt);const e=Ct(t.firestore,Wn);return LN(Zu(e),t._key).then(n=>Ax(e,t,n))}class Vp extends ZN{constructor(e){super(),this.firestore=e}convertBytes(e){return new fi(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new lt(this.firestore,null,n)}}function Ht(t){t=Ct(t,ws);const e=Ct(t.firestore,Wn),n=Zu(e),r=new Vp(e);return _x(t._query),VN(n,t._query).then(s=>new Tx(e,r,t,s))}function Ix(t,e,n){t=Ct(t,lt);const r=Ct(t.firestore,Wn),s=xx(t.converter,e);return sc(r,[px(tc(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,$t.none())])}function ha(t,e,n,...r){t=Ct(t,lt);const s=Ct(t.firestore,Wn),i=tc(s);let o;return o=typeof(e=Ae(e))=="string"||e instanceof ec?qN(i,"updateDoc",t._key,e,n,r):WN(i,"updateDoc",t._key,e),sc(s,[o.toMutation(t._key,$t.exists(!0))])}function tP(t){return sc(Ct(t.firestore,Wn),[new up(t._key,$t.none())])}function Sx(t,e){const n=Ct(t.firestore,Wn),r=bt(t),s=xx(t.converter,e);return sc(n,[px(tc(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,$t.exists(!1))]).then(()=>r)}function nP(t,...e){var n,r,s;t=Ae(t);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Ev(e[o])||(i=e[o],o++);const l={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Ev(e[o])){const m=e[o];e[o]=(n=m.next)===null||n===void 0?void 0:n.bind(m),e[o+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[o+2]=(s=m.complete)===null||s===void 0?void 0:s.bind(m)}let u,c,f;if(t instanceof lt)c=Ct(t.firestore,Wn),f=zu(t._key.path),u={next:m=>{e[o]&&e[o](Ax(c,t,m))},error:e[o+1],complete:e[o+2]};else{const m=Ct(t,ws);c=Ct(m.firestore,Wn),f=m._query;const g=new Vp(c);u={next:k=>{e[o]&&e[o](new Tx(c,g,m,k))},error:e[o+1],complete:e[o+2]},_x(t._query)}return function(g,k,C,N){const P=new kp(N),A=new Sp(k,P,C);return g.asyncQueue.enqueueAndForget(async()=>Ep(await uu(g),A)),()=>{P.Za(),g.asyncQueue.enqueueAndForget(async()=>Tp(await uu(g),A))}}(Zu(c),f,l,u)}function sc(t,e){return function(r,s){const i=new Ln;return r.asyncQueue.enqueueAndForget(async()=>SN(await jN(r),s,i)),i.promise}(Zu(t),e)}function Ax(t,e,n){const r=n.docs.get(e._key),s=new Vp(t);return new Ex(t,s,e._key,r,new to(n.hasPendingWrites,n.fromCache),e.converter)}(function(e,n=!0){(function(s){xi=s})(gs),sn(new Kt("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),l=new Wn(new sb(r.getProvider("auth-internal")),new lb(r.getProvider("app-check-internal")),function(c,f){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new W(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Fo(c.options.projectId,f)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),kt(Uy,"4.7.3",e),kt(Uy,"4.7.3","esm2017")})();var rP="firebase",sP="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */kt(rP,sP,"app");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kx="firebasestorage.googleapis.com",iP="storageBucket",oP=2*60*1e3,aP=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En extends ln{constructor(e,n,r=0){super(vd(e),`Firebase Storage: ${n} (${vd(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,En.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return vd(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var xn;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(xn||(xn={}));function vd(t){return"storage/"+t}function lP(){const t="An unknown error occurred, please check the error payload for server response.";return new En(xn.UNKNOWN,t)}function uP(){return new En(xn.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function cP(){return new En(xn.CANCELED,"User canceled the upload/download.")}function dP(t){return new En(xn.INVALID_URL,"Invalid URL '"+t+"'.")}function hP(t){return new En(xn.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function Sv(t){return new En(xn.INVALID_ARGUMENT,t)}function Cx(){return new En(xn.APP_DELETED,"The Firebase app was deleted.")}function fP(t){return new En(xn.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=en.makeFromUrl(e,n)}catch{return new en(e,"")}if(r.path==="")return r;throw hP(e)}static makeFromUrl(e,n){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(R){R.path.charAt(R.path.length-1)==="/"&&(R.path_=R.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function c(R){R.path_=decodeURIComponent(R.path)}const f="v[A-Za-z0-9_]+",m=n.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",k=new RegExp(`^https?://${m}/${f}/b/${s}/o${g}`,"i"),C={bucket:1,path:3},N=n===kx?"(?:storage.googleapis.com|storage.cloud.google.com)":n,P="([^?#]*)",A=new RegExp(`^https?://${N}/${s}/${P}`,"i"),T=[{regex:l,indices:u,postModify:i},{regex:k,indices:C,postModify:c},{regex:A,indices:{bucket:1,path:2},postModify:c}];for(let R=0;R<T.length;R++){const L=T[R],V=L.regex.exec(e);if(V){const w=V[L.indices.bucket];let y=V[L.indices.path];y||(y=""),r=new en(w,y),L.postModify(r);break}}if(r==null)throw dP(e);return r}}class pP{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mP(t,e,n){let r=1,s=null,i=null,o=!1,l=0;function u(){return l===2}let c=!1;function f(...P){c||(c=!0,e.apply(null,P))}function m(P){s=setTimeout(()=>{s=null,t(k,u())},P)}function g(){i&&clearTimeout(i)}function k(P,...A){if(c){g();return}if(P){g(),f.call(null,P,...A);return}if(u()||o){g(),f.call(null,P,...A);return}r<64&&(r*=2);let T;l===1?(l=2,T=0):T=(r+Math.random())*1e3,m(T)}let C=!1;function N(P){C||(C=!0,g(),!c&&(s!==null?(P||(l=2),clearTimeout(s),m(0)):P||(l=1)))}return m(0),i=setTimeout(()=>{o=!0,N(!0)},n),N}function gP(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yP(t){return t!==void 0}function Av(t,e,n,r){if(r<e)throw Sv(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw Sv(`Invalid value for '${t}'. Expected ${n} or less.`)}function vP(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const s=e(r)+"="+e(t[r]);n=n+s+"&"}return n=n.slice(0,-1),n}var du;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(du||(du={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _P(t,e){const n=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,i=e.indexOf(t)!==-1;return n||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wP{constructor(e,n,r,s,i,o,l,u,c,f,m,g=!0){this.url_=e,this.method_=n,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=u,this.timeout_=c,this.progressCallback_=f,this.connectionFactory_=m,this.retry=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((k,C)=>{this.resolve_=k,this.reject_=C,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new el(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=l=>{const u=l.loaded,c=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,c)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const l=i.getErrorCode()===du.NO_ERROR,u=i.getStatus();if(!l||_P(u,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===du.ABORT;r(!1,new el(!1,null,f));return}const c=this.successCodes_.indexOf(u)!==-1;r(!0,new el(c,i))})},n=(r,s)=>{const i=this.resolve_,o=this.reject_,l=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(l,l.getResponse());yP(u)?i(u):i()}catch(u){o(u)}else if(l!==null){const u=lP();u.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,u)):o(u)}else if(s.canceled){const u=this.appDelete_?Cx():cP();o(u)}else{const u=uP();o(u)}};this.canceled_?n(!1,new el(!1,null,!0)):this.backoffId_=mP(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&gP(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class el{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function xP(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function EP(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function TP(t,e){e&&(t["X-Firebase-GMPID"]=e)}function IP(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function SP(t,e,n,r,s,i,o=!0){const l=vP(t.urlParams),u=t.url+l,c=Object.assign({},t.headers);return TP(c,e),xP(c,n),EP(c,i),IP(c,r),new wP(u,t.method,c,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AP(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function kP(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{constructor(e,n){this._service=e,n instanceof en?this._location=n:this._location=en.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new hu(e,n)}get root(){const e=new en(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return kP(this._location.path)}get storage(){return this._service}get parent(){const e=AP(this._location.path);if(e===null)return null;const n=new en(this._location.bucket,e);return new hu(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw fP(e)}}function kv(t,e){const n=e==null?void 0:e[iP];return n==null?null:en.makeFromBucketSpec(n,t)}function CP(t,e,n,r={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:s}=r;s&&(t._overrideAuthToken=typeof s=="string"?s:gw(s,t.app.options.projectId))}class bP{constructor(e,n,r,s,i){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=kx,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=oP,this._maxUploadRetryTime=aP,this._requests=new Set,s!=null?this._bucket=en.makeFromBucketSpec(s,this._host):this._bucket=kv(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=en.makeFromBucketSpec(this._url,e):this._bucket=kv(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Av("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Av("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new hu(this,e)}_makeRequest(e,n,r,s,i=!0){if(this._deleted)return new pP(Cx());{const o=SP(e,this._appId,r,s,n,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,s).getPromise()}}const Cv="@firebase/storage",bv="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bx="storage";function RP(t=Lu(),e){t=Ae(t);const r=ms(t,bx).getImmediate({identifier:e}),s=fw("storage");return s&&NP(r,...s),r}function NP(t,e,n,r={}){CP(t,e,n,r)}function PP(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new bP(n,r,s,e,gs)}function DP(){sn(new Kt(bx,PP,"PUBLIC").setMultipleInstances(!0)),kt(Cv,bv,""),kt(Cv,bv,"esm2017")}DP();const Rx="@firebase/installations",Mp="0.6.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nx=1e4,Px=`w:${Mp}`,Dx="FIS_v2",OP="https://firebaseinstallations.googleapis.com/v1",jP=60*60*1e3,LP="installations",VP="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MP={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},ls=new ps(LP,VP,MP);function Ox(t){return t instanceof ln&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jx({projectId:t}){return`${OP}/projects/${t}/installations`}function Lx(t){return{token:t.token,requestStatus:2,expiresIn:FP(t.expiresIn),creationTime:Date.now()}}async function Vx(t,e){const r=(await e.json()).error;return ls.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Mx({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function UP(t,{refreshToken:e}){const n=Mx(t);return n.append("Authorization",BP(e)),n}async function Ux(t){const e=await t();return e.status>=500&&e.status<600?t():e}function FP(t){return Number(t.replace("s","000"))}function BP(t){return`${Dx} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zP({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=jx(t),s=Mx(t),i=e.getImmediate({optional:!0});if(i){const c=await i.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const o={fid:n,authVersion:Dx,appId:t.appId,sdkVersion:Px},l={method:"POST",headers:s,body:JSON.stringify(o)},u=await Ux(()=>fetch(r,l));if(u.ok){const c=await u.json();return{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:Lx(c.authToken)}}else throw await Vx("Create Installation",u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fx(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $P(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HP=/^[cdef][\w-]{21}$/,Hh="";function WP(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=qP(t);return HP.test(n)?n:Hh}catch{return Hh}}function qP(t){return $P(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ic(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bx=new Map;function zx(t,e){const n=ic(t);$x(n,e),KP(n,e)}function $x(t,e){const n=Bx.get(t);if(n)for(const r of n)r(e)}function KP(t,e){const n=GP();n&&n.postMessage({key:t,fid:e}),QP()}let Gr=null;function GP(){return!Gr&&"BroadcastChannel"in self&&(Gr=new BroadcastChannel("[Firebase] FID Change"),Gr.onmessage=t=>{$x(t.data.key,t.data.fid)}),Gr}function QP(){Bx.size===0&&Gr&&(Gr.close(),Gr=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YP="firebase-installations-database",XP=1,us="firebase-installations-store";let _d=null;function Up(){return _d||(_d=ju(YP,XP,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(us)}}})),_d}async function fu(t,e){const n=ic(t),s=(await Up()).transaction(us,"readwrite"),i=s.objectStore(us),o=await i.get(n);return await i.put(e,n),await s.done,(!o||o.fid!==e.fid)&&zx(t,e.fid),e}async function Hx(t){const e=ic(t),r=(await Up()).transaction(us,"readwrite");await r.objectStore(us).delete(e),await r.done}async function oc(t,e){const n=ic(t),s=(await Up()).transaction(us,"readwrite"),i=s.objectStore(us),o=await i.get(n),l=e(o);return l===void 0?await i.delete(n):await i.put(l,n),await s.done,l&&(!o||o.fid!==l.fid)&&zx(t,l.fid),l}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fp(t){let e;const n=await oc(t.appConfig,r=>{const s=JP(r),i=ZP(t,s);return e=i.registrationPromise,i.installationEntry});return n.fid===Hh?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function JP(t){const e=t||{fid:WP(),registrationStatus:0};return Wx(e)}function ZP(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(ls.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=e4(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:t4(t)}:{installationEntry:e}}async function e4(t,e){try{const n=await zP(t,e);return fu(t.appConfig,n)}catch(n){throw Ox(n)&&n.customData.serverCode===409?await Hx(t.appConfig):await fu(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function t4(t){let e=await Rv(t.appConfig);for(;e.registrationStatus===1;)await Fx(100),e=await Rv(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await Fp(t);return r||n}return e}function Rv(t){return oc(t,e=>{if(!e)throw ls.create("installation-not-found");return Wx(e)})}function Wx(t){return n4(t)?{fid:t.fid,registrationStatus:0}:t}function n4(t){return t.registrationStatus===1&&t.registrationTime+Nx<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function r4({appConfig:t,heartbeatServiceProvider:e},n){const r=s4(t,n),s=UP(t,n),i=e.getImmediate({optional:!0});if(i){const c=await i.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const o={installation:{sdkVersion:Px,appId:t.appId}},l={method:"POST",headers:s,body:JSON.stringify(o)},u=await Ux(()=>fetch(r,l));if(u.ok){const c=await u.json();return Lx(c)}else throw await Vx("Generate Auth Token",u)}function s4(t,{fid:e}){return`${jx(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bp(t,e=!1){let n;const r=await oc(t.appConfig,i=>{if(!qx(i))throw ls.create("not-registered");const o=i.authToken;if(!e&&a4(o))return i;if(o.requestStatus===1)return n=i4(t,e),i;{if(!navigator.onLine)throw ls.create("app-offline");const l=u4(i);return n=o4(t,l),l}});return n?await n:r.authToken}async function i4(t,e){let n=await Nv(t.appConfig);for(;n.authToken.requestStatus===1;)await Fx(100),n=await Nv(t.appConfig);const r=n.authToken;return r.requestStatus===0?Bp(t,e):r}function Nv(t){return oc(t,e=>{if(!qx(e))throw ls.create("not-registered");const n=e.authToken;return c4(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function o4(t,e){try{const n=await r4(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await fu(t.appConfig,r),n}catch(n){if(Ox(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Hx(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await fu(t.appConfig,r)}throw n}}function qx(t){return t!==void 0&&t.registrationStatus===2}function a4(t){return t.requestStatus===2&&!l4(t)}function l4(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+jP}function u4(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function c4(t){return t.requestStatus===1&&t.requestTime+Nx<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function d4(t){const e=t,{installationEntry:n,registrationPromise:r}=await Fp(e);return r?r.catch(console.error):Bp(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function h4(t,e=!1){const n=t;return await f4(n),(await Bp(n,e)).token}async function f4(t){const{registrationPromise:e}=await Fp(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p4(t){if(!t||!t.options)throw wd("App Configuration");if(!t.name)throw wd("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw wd(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function wd(t){return ls.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kx="installations",m4="installations-internal",g4=t=>{const e=t.getProvider("app").getImmediate(),n=p4(e),r=ms(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},y4=t=>{const e=t.getProvider("app").getImmediate(),n=ms(e,Kx).getImmediate();return{getId:()=>d4(n),getToken:s=>h4(n,s)}};function v4(){sn(new Kt(Kx,g4,"PUBLIC")),sn(new Kt(m4,y4,"PRIVATE"))}v4();kt(Rx,Mp);kt(Rx,Mp,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _4="/firebase-messaging-sw.js",w4="/firebase-cloud-messaging-push-scope",Gx="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",x4="https://fcmregistrations.googleapis.com/v1",Qx="google.c.a.c_id",E4="google.c.a.c_l",T4="google.c.a.ts",I4="google.c.a.e";var Pv;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(Pv||(Pv={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var Ho;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(Ho||(Ho={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function An(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function S4(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),s=new Uint8Array(r.length);for(let i=0;i<r.length;++i)s[i]=r.charCodeAt(i);return s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xd="fcm_token_details_db",A4=5,Dv="fcm_token_object_Store";async function k4(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(i=>i.name).includes(xd))return null;let e=null;return(await ju(xd,A4,{upgrade:async(r,s,i,o)=>{var l;if(s<2||!r.objectStoreNames.contains(Dv))return;const u=o.objectStore(Dv),c=await u.index("fcmSenderId").get(t);if(await u.clear(),!!c){if(s===2){const f=c;if(!f.auth||!f.p256dh||!f.endpoint)return;e={token:f.fcmToken,createTime:(l=f.createTime)!==null&&l!==void 0?l:Date.now(),subscriptionOptions:{auth:f.auth,p256dh:f.p256dh,endpoint:f.endpoint,swScope:f.swScope,vapidKey:typeof f.vapidKey=="string"?f.vapidKey:An(f.vapidKey)}}}else if(s===3){const f=c;e={token:f.fcmToken,createTime:f.createTime,subscriptionOptions:{auth:An(f.auth),p256dh:An(f.p256dh),endpoint:f.endpoint,swScope:f.swScope,vapidKey:An(f.vapidKey)}}}else if(s===4){const f=c;e={token:f.fcmToken,createTime:f.createTime,subscriptionOptions:{auth:An(f.auth),p256dh:An(f.p256dh),endpoint:f.endpoint,swScope:f.swScope,vapidKey:An(f.vapidKey)}}}}}})).close(),await ud(xd),await ud("fcm_vapid_details_db"),await ud("undefined"),C4(e)?e:null}function C4(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b4="firebase-messaging-database",R4=1,Wo="firebase-messaging-store";let Ed=null;function Yx(){return Ed||(Ed=ju(b4,R4,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Wo)}}})),Ed}async function N4(t){const e=Xx(t),r=await(await Yx()).transaction(Wo).objectStore(Wo).get(e);if(r)return r;{const s=await k4(t.appConfig.senderId);if(s)return await zp(t,s),s}}async function zp(t,e){const n=Xx(t),s=(await Yx()).transaction(Wo,"readwrite");return await s.objectStore(Wo).put(e,n),await s.done,e}function Xx({appConfig:t}){return t.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P4={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},yt=new ps("messaging","Messaging",P4);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function D4(t,e){const n=await Hp(t),r=Jx(e),s={method:"POST",headers:n,body:JSON.stringify(r)};let i;try{i=await(await fetch($p(t.appConfig),s)).json()}catch(o){throw yt.create("token-subscribe-failed",{errorInfo:o==null?void 0:o.toString()})}if(i.error){const o=i.error.message;throw yt.create("token-subscribe-failed",{errorInfo:o})}if(!i.token)throw yt.create("token-subscribe-no-token");return i.token}async function O4(t,e){const n=await Hp(t),r=Jx(e.subscriptionOptions),s={method:"PATCH",headers:n,body:JSON.stringify(r)};let i;try{i=await(await fetch(`${$p(t.appConfig)}/${e.token}`,s)).json()}catch(o){throw yt.create("token-update-failed",{errorInfo:o==null?void 0:o.toString()})}if(i.error){const o=i.error.message;throw yt.create("token-update-failed",{errorInfo:o})}if(!i.token)throw yt.create("token-update-no-token");return i.token}async function j4(t,e){const r={method:"DELETE",headers:await Hp(t)};try{const i=await(await fetch(`${$p(t.appConfig)}/${e}`,r)).json();if(i.error){const o=i.error.message;throw yt.create("token-unsubscribe-failed",{errorInfo:o})}}catch(s){throw yt.create("token-unsubscribe-failed",{errorInfo:s==null?void 0:s.toString()})}}function $p({projectId:t}){return`${x4}/projects/${t}/registrations`}async function Hp({appConfig:t,installations:e}){const n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function Jx({p256dh:t,auth:e,endpoint:n,vapidKey:r}){const s={web:{endpoint:n,auth:e,p256dh:t}};return r!==Gx&&(s.web.applicationPubKey=r),s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L4=7*24*60*60*1e3;async function V4(t){const e=await U4(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:An(e.getKey("auth")),p256dh:An(e.getKey("p256dh"))},r=await N4(t.firebaseDependencies);if(r){if(F4(r.subscriptionOptions,n))return Date.now()>=r.createTime+L4?M4(t,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await j4(t.firebaseDependencies,r.token)}catch(s){console.warn(s)}return Ov(t.firebaseDependencies,n)}else return Ov(t.firebaseDependencies,n)}async function M4(t,e){try{const n=await O4(t.firebaseDependencies,e),r=Object.assign(Object.assign({},e),{token:n,createTime:Date.now()});return await zp(t.firebaseDependencies,r),n}catch(n){throw n}}async function Ov(t,e){const r={token:await D4(t,e),createTime:Date.now(),subscriptionOptions:e};return await zp(t,r),r.token}async function U4(t,e){const n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:S4(e)})}function F4(t,e){const n=e.vapidKey===t.vapidKey,r=e.endpoint===t.endpoint,s=e.auth===t.auth,i=e.p256dh===t.p256dh;return n&&r&&s&&i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jv(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return B4(e,t),z4(e,t),$4(e,t),e}function B4(t,e){if(!e.notification)return;t.notification={};const n=e.notification.title;n&&(t.notification.title=n);const r=e.notification.body;r&&(t.notification.body=r);const s=e.notification.image;s&&(t.notification.image=s);const i=e.notification.icon;i&&(t.notification.icon=i)}function z4(t,e){e.data&&(t.data=e.data)}function $4(t,e){var n,r,s,i,o;if(!e.fcmOptions&&!(!((n=e.notification)===null||n===void 0)&&n.click_action))return;t.fcmOptions={};const l=(s=(r=e.fcmOptions)===null||r===void 0?void 0:r.link)!==null&&s!==void 0?s:(i=e.notification)===null||i===void 0?void 0:i.click_action;l&&(t.fcmOptions.link=l);const u=(o=e.fcmOptions)===null||o===void 0?void 0:o.analytics_label;u&&(t.fcmOptions.analyticsLabel=u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H4(t){return typeof t=="object"&&!!t&&Qx in t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W4(t){if(!t||!t.options)throw Td("App Configuration Object");if(!t.name)throw Td("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(const r of e)if(!n[r])throw Td(r);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function Td(t){return yt.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q4{constructor(e,n,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=W4(e);this.firebaseDependencies={app:e,appConfig:s,installations:n,analyticsProvider:r}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function K4(t){try{t.swRegistration=await navigator.serviceWorker.register(_4,{scope:w4}),t.swRegistration.update().catch(()=>{})}catch(e){throw yt.create("failed-service-worker-registration",{browserErrorMessage:e==null?void 0:e.message})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function G4(t,e){if(!e&&!t.swRegistration&&await K4(t),!(!e&&t.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw yt.create("invalid-sw-registration");t.swRegistration=e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Q4(t,e){e?t.vapidKey=e:t.vapidKey||(t.vapidKey=Gx)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zx(t,e){if(!navigator)throw yt.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw yt.create("permission-blocked");return await Q4(t,e==null?void 0:e.vapidKey),await G4(t,e==null?void 0:e.serviceWorkerRegistration),V4(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Y4(t,e,n){const r=X4(e);(await t.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[Qx],message_name:n[E4],message_time:n[T4],message_device_time:Math.floor(Date.now()/1e3)})}function X4(t){switch(t){case Ho.NOTIFICATION_CLICKED:return"notification_open";case Ho.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function J4(t,e){const n=e.data;if(!n.isFirebaseMessaging)return;t.onMessageHandler&&n.messageType===Ho.PUSH_RECEIVED&&(typeof t.onMessageHandler=="function"?t.onMessageHandler(jv(n)):t.onMessageHandler.next(jv(n)));const r=n.data;H4(r)&&r[I4]==="1"&&await Y4(t,n.messageType,r)}const Lv="@firebase/messaging",Vv="0.12.12";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z4=t=>{const e=new q4(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>J4(e,n)),e},e6=t=>{const e=t.getProvider("messaging").getImmediate();return{getToken:r=>Zx(e,r)}};function t6(){sn(new Kt("messaging",Z4,"PUBLIC")),sn(new Kt("messaging-internal",e6,"PRIVATE")),kt(Lv,Vv),kt(Lv,Vv,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function n6(){try{await vw()}catch{return!1}return typeof window<"u"&&yw()&&CS()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function r6(t=Lu()){return n6().then(e=>{if(!e)throw yt.create("unsupported-browser")},e=>{throw yt.create("indexed-db-unsupported")}),ms(Ae(t),"messaging").getImmediate()}async function s6(t,e){return t=Ae(t),Zx(t,e)}t6();const i6={apiKey:"AIzaSyCKPrE1B2ikGlnr6PmTq4JVLlBDlOe50Co",authDomain:"tmv1-7fc4f.firebaseapp.com",projectId:"tmv1-7fc4f",storageBucket:"tmv1-7fc4f.firebasestorage.app",messagingSenderId:"377085834114",appId:"1:377085834114:web:aeb2ca19e51abe8fc5959b",measurementId:"G-8J8CDN3QFF"},ac=xw(i6),_n=eb(ac),pe=FN(ac);RP(ac);const o6=r6(ac),tr=({children:t})=>{const[e,n]=O.useState("checking");return O.useEffect(()=>{const r=Mu(_n,async s=>{if(!s){n("denied");return}try{const i=await da(bt(pe,"users",s.uid));(i.exists()?i.data():{}).userType==="admin"?n("allowed"):n("denied")}catch{n("denied")}});return()=>r()},[]),e==="checking"?null:e==="denied"?d.jsx(eS,{to:"/home",replace:!0}):t};var eE={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},Mv=pr.createContext&&pr.createContext(eE),a6=["attr","size","title"];function l6(t,e){if(t==null)return{};var n=u6(t,e),r,s;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(s=0;s<i.length;s++)r=i[s],!(e.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}function u6(t,e){if(t==null)return{};var n={};for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r)){if(e.indexOf(r)>=0)continue;n[r]=t[r]}return n}function pu(){return pu=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},pu.apply(this,arguments)}function Uv(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),n.push.apply(n,r)}return n}function mu(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Uv(Object(n),!0).forEach(function(r){c6(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Uv(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function c6(t,e,n){return e=d6(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function d6(t){var e=h6(t,"string");return typeof e=="symbol"?e:e+""}function h6(t,e){if(typeof t!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function tE(t){return t&&t.map((e,n)=>pr.createElement(e.tag,mu({key:n},e.attr),tE(e.child)))}function Ve(t){return e=>pr.createElement(f6,pu({attr:mu({},t.attr)},e),tE(t.child))}function f6(t){var e=n=>{var{attr:r,size:s,title:i}=t,o=l6(t,a6),l=s||n.size||"1em",u;return n.className&&(u=n.className),t.className&&(u=(u?u+" ":"")+t.className),pr.createElement("svg",pu({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},n.attr,r,o,{className:u,style:mu(mu({color:t.color||n.color},n.style),t.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),i&&pr.createElement("title",null,i),t.children)};return Mv!==void 0?pr.createElement(Mv.Consumer,null,n=>e(n)):e(eE)}function p6(t){return Ve({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M12.83 352h262.34A12.82 12.82 0 0 0 288 339.17v-38.34A12.82 12.82 0 0 0 275.17 288H12.83A12.82 12.82 0 0 0 0 300.83v38.34A12.82 12.82 0 0 0 12.83 352zm0-256h262.34A12.82 12.82 0 0 0 288 83.17V44.83A12.82 12.82 0 0 0 275.17 32H12.83A12.82 12.82 0 0 0 0 44.83v38.34A12.82 12.82 0 0 0 12.83 96zM432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"},child:[]}]})(t)}function m6(t){return Ve({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"},child:[]}]})(t)}function fa(t){return Ve({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M509.5 184.6L458.9 32.8C452.4 13.2 434.1 0 413.4 0H272v192h238.7c-.4-2.5-.4-5-1.2-7.4zM240 0H98.6c-20.7 0-39 13.2-45.5 32.8L2.5 184.6c-.8 2.4-.8 4.9-1.2 7.4H240V0zM0 224v240c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V224H0z"},child:[]}]})(t)}function cs(t){return Ve({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"},child:[]}]})(t)}function qo(t){return Ve({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"},child:[]}]})(t)}function g6(t){return Ve({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"},child:[]}]})(t)}function y6(t){return Ve({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"},child:[]}]})(t)}function v6(t){return Ve({attr:{viewBox:"0 0 384 512"},child:[{tag:"path",attr:{d:"M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"},child:[]}]})(t)}function _6(t){return Ve({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M504 255.531c.253 136.64-111.18 248.372-247.82 248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609 22.353-9.551 31.891-1.984C173.062 425.135 212.781 440 256 440c101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 0-93.149 18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314H24c-8.837 0-16-7.163-16-16V38.627c0-14.254 17.234-21.393 27.314-11.314l49.372 49.372C129.209 34.136 189.552 8 256 8c136.81 0 247.747 110.78 248 247.531zm-180.912 78.784l9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679L288 256.349V152c0-13.255-10.745-24-24-24h-16c-13.255 0-24 10.745-24 24v135.651l65.409 50.874c10.463 8.137 25.541 6.253 33.679-4.21z"},child:[]}]})(t)}function w6(t){return Ve({attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"},child:[]}]})(t)}function x6(t){return Ve({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"},child:[]}]})(t)}function E6(t){return Ve({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"},child:[]}]})(t)}function pi(t){return Ve({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"},child:[]}]})(t)}function xs(t){return Ve({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"},child:[]}]})(t)}function nE(t){return Ve({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M139.61 35.5a12 12 0 0 0-17 0L58.93 98.81l-22.7-22.12a12 12 0 0 0-17 0L3.53 92.41a12 12 0 0 0 0 17l47.59 47.4a12.78 12.78 0 0 0 17.61 0l15.59-15.62L156.52 69a12.09 12.09 0 0 0 .09-17zm0 159.19a12 12 0 0 0-17 0l-63.68 63.72-22.7-22.1a12 12 0 0 0-17 0L3.53 252a12 12 0 0 0 0 17L51 316.5a12.77 12.77 0 0 0 17.6 0l15.7-15.69 72.2-72.22a12 12 0 0 0 .09-16.9zM64 368c-26.49 0-48.59 21.5-48.59 48S37.53 464 64 464a48 48 0 0 0 0-96zm432 16H208a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H208a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H208a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"},child:[]}]})(t)}function T6(t){return Ve({attr:{viewBox:"0 0 352 512"},child:[{tag:"path",attr:{d:"M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"},child:[]}]})(t)}function I6(t){return Ve({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"},child:[]}]})(t)}function rE(t){return Ve({attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"},child:[]}]})(t)}function sE(t){return Ve({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"},child:[]}]})(t)}function iE(t){return Ve({attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"},child:[]}]})(t)}const Rt=({userType:t})=>{const e=_i(),[n,r]=O.useState(!1),s=l=>e.pathname===l,o=[{path:t==="admin"?"/admin-home":"/home",label:"Home",icon:d.jsx(w6,{})},{path:"/profile",label:"Profile",icon:d.jsx(sE,{})}];return t==="user"&&o.push({path:"/task-history",label:"Task History",icon:d.jsx(_6,{})}),t==="admin"&&o.push({path:"/manage-users",label:"Manage Users",icon:d.jsx(rE,{})},{path:"/assign-work",label:"Assign Work",icon:d.jsx(nE,{})},{path:"/work-list",label:"Work List",icon:d.jsx(x6,{})},{path:"/inventory",label:"Inventory",icon:d.jsx(fa,{})}),d.jsx("header",{className:"bg-blue-600 text-white shadow-lg",children:d.jsxs("nav",{className:"container mx-auto px-4 py-4",children:[d.jsxs("div",{className:"flex items-center justify-between",children:[d.jsx("h1",{className:"text-lg sm:text-xl md:text-2xl font-bold",children:"Videography Manager"}),d.jsx("button",{onClick:()=>r(!n),className:"lg:hidden text-2xl focus:outline-none","aria-label":"Toggle menu",children:n?d.jsx(T6,{}):d.jsx(m6,{})}),d.jsx("ul",{className:"hidden lg:flex space-x-6",children:o.map(l=>d.jsx("li",{children:d.jsxs(oy,{to:l.path,className:`flex items-center gap-2 hover:text-blue-200 transition ${s(l.path)?"font-bold border-b-2 border-white pb-1":""}`,children:[l.icon,d.jsx("span",{children:l.label})]})},l.path))})]}),n&&d.jsx("ul",{className:"lg:hidden mt-4 space-y-2 pb-2",children:o.map(l=>d.jsx("li",{children:d.jsxs(oy,{to:l.path,onClick:()=>r(!1),className:`flex items-center gap-3 p-3 rounded hover:bg-blue-700 transition ${s(l.path)?"bg-blue-700 font-bold":""}`,children:[d.jsx("span",{className:"text-xl",children:l.icon}),d.jsx("span",{children:l.label})]})},l.path))})]})})},S6=()=>{const t=Gn();return d.jsxs("div",{className:"min-h-screen bg-gray-100",children:[d.jsx(Rt,{userType:"admin"}),d.jsx("main",{className:"container mx-auto px-4 py-6 sm:py-8",children:d.jsxs("div",{className:"max-w-4xl mx-auto",children:[d.jsx("h2",{className:"text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8",children:"Admin Dashboard"}),d.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6",children:[d.jsxs("div",{className:"bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition",children:[d.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[d.jsx(rE,{className:"text-3xl sm:text-4xl text-blue-600"}),d.jsx("h3",{className:"text-lg sm:text-xl font-semibold text-blue-600",children:"User Management"})]}),d.jsx("p",{className:"text-gray-600 mb-4 text-sm sm:text-base",children:"Create new user accounts for team members and manage their access."}),d.jsx("button",{onClick:()=>t("/create-user"),className:"w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded hover:bg-blue-700 transition font-medium",children:"Go to Create User"})]}),d.jsxs("div",{className:"bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition",children:[d.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[d.jsx(nE,{className:"text-3xl sm:text-4xl text-green-600"}),d.jsx("h3",{className:"text-lg sm:text-xl font-semibold text-green-600",children:"Work Assignment"})]}),d.jsx("p",{className:"text-gray-600 mb-4 text-sm sm:text-base",children:"Create new work projects and assign team members to tasks."}),d.jsx("button",{onClick:()=>t("/assign-work"),className:"w-full bg-green-600 text-white py-2 sm:py-3 px-4 rounded hover:bg-green-700 transition font-medium",children:"Go to Assign Work"})]})]})]})})]})},A6=()=>{const[t,e]=O.useState(null),[n,r]=O.useState([]),[s,i]=O.useState(!0),[o,l]=O.useState(!1),[u,c]=O.useState(""),f="user";O.useEffect(()=>{const R=Mu(_n,L=>{e(L||null),i(!1)});return()=>R()},[]),O.useEffect(()=>{if(!t)return;(async()=>{l(!0);try{const w=(await Ht(gt(pe,"works"))).docs.map(y=>({id:y.id,...y.data()})).filter(y=>Array.isArray(y.assignedUsers)&&y.assignedUsers.includes(t.uid));w.sort((y,x)=>{const S=y.date?new Date(y.date).getTime():0;return(x.date?new Date(x.date).getTime():0)-S}),r(w)}catch(L){console.error("Error loading user tasks:",L)}finally{l(!1)}})()},[t]);const m=R=>{c(R),setTimeout(()=>c(""),4e3)};O.useEffect(()=>{if(!t)return;const R=XN(gt(pe,"works"),JN("assignedUsers","array-contains",t.uid)),L=nP(R,V=>{V.docChanges().forEach(w=>{if(w.type==="added"){const y=w.doc.data();m(`New task assigned: ${y.title||"Task"}`),r(x=>x.some(b=>b.id===w.doc.id)?x:[{id:w.doc.id,...y},...x].sort((b,E)=>{const J=b.date?new Date(b.date).getTime():0;return(E.date?new Date(E.date).getTime():0)-J}))}})});return()=>L()},[t]);const g=R=>R.status||"incomplete",k=async(R,L)=>{if(g(R)==="complete")return;const V=`${t.uid}_${L}`,w=R.roleCompletion||{},y=w[V]==="done",x={...w};y?delete x[V]:x[V]="done";try{const S=bt(pe,"works",R.id);await ha(S,{roleCompletion:x}),r(I=>I.map(b=>b.id===R.id?{...b,roleCompletion:x}:b))}catch(S){console.error("Failed to update role status:",S)}},C=R=>{if(!t)return[];const V=(R.assignedUserDetails||[]).find(w=>w.userId===t.uid);return(V==null?void 0:V.roles)||[]},N=(R,L)=>{const V=`${t.uid}_${L}`;return(R.roleCompletion||{})[V]==="done"},P=R=>{const L=C(R);return L.length?L.every(V=>N(R,V)):!1},A=n.filter(R=>g(R)!=="complete"),_=A.filter(R=>!P(R)),T=A.filter(R=>P(R));return d.jsxs("div",{className:"min-h-screen bg-gray-100",children:[d.jsx(Rt,{userType:f}),u&&d.jsx("div",{className:"fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white text-xs sm:text-sm px-4 py-2 rounded shadow",children:u}),d.jsxs("main",{className:"container mx-auto px-4 py-8",children:[d.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-gray-800 mb-4",children:"Welcome"}),d.jsx("p",{className:"text-gray-600 text-sm sm:text-base mb-6",children:"Here are your tasks. Mark each work type as done when you finish. You can undo until admin marks the task as complete."}),s||o?d.jsxs("div",{className:"flex items-center gap-2 text-gray-600",children:[d.jsx(xs,{className:"animate-spin text-xl text-blue-600"}),d.jsx("span",{children:"Loading tasks..."})]}):A.length===0?d.jsx("p",{className:"text-gray-600 text-sm sm:text-base",children:"You do not have any active tasks."}):d.jsxs(d.Fragment,{children:[_.length>0&&d.jsxs("section",{className:"mb-6",children:[d.jsx("h2",{className:"text-lg sm:text-xl font-semibold text-gray-800 mb-3",children:"Current tasks"}),d.jsx("div",{className:"space-y-3",children:_.map(R=>{const L=C(R);return d.jsxs("div",{className:"bg-white rounded-lg shadow p-4 sm:p-5",children:[d.jsx("h3",{className:"font-semibold text-gray-800 text-sm sm:text-base mb-1",children:R.title||"Task"}),R.date&&d.jsxs("p",{className:"flex items-center gap-1 text-xs sm:text-sm text-gray-500",children:[d.jsx(cs,{}),d.jsx("span",{children:new Date(R.date).toLocaleDateString()})]}),R.description&&d.jsx("p",{className:"text-gray-700 text-xs sm:text-sm mt-2",children:R.description}),d.jsxs("div",{className:"mt-3",children:[d.jsx("p",{className:"text-xs sm:text-sm font-semibold text-gray-700 mb-2",children:"Your work types:"}),d.jsx("div",{className:"flex flex-wrap gap-2",children:L.map(V=>{const w=N(R,V);return d.jsxs("button",{type:"button",onClick:()=>k(R,V),className:`inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs sm:text-sm font-semibold transition ${w?"bg-green-600 text-white hover:bg-green-700":"bg-gray-200 text-gray-700 hover:bg-gray-300"}`,children:[w&&d.jsx(qo,{}),V]},V)})})]})]},R.id)})})]}),T.length>0&&d.jsxs("section",{children:[d.jsx("h2",{className:"text-lg sm:text-xl font-semibold text-gray-800 mb-3",children:"Done tasks (waiting for admin)"}),d.jsx("div",{className:"space-y-3",children:T.map(R=>{const L=C(R);return d.jsxs("div",{className:"bg-white rounded-lg shadow p-4 sm:p-5",children:[d.jsx("h3",{className:"font-semibold text-gray-800 text-sm sm:text-base mb-1",children:R.title||"Task"}),R.date&&d.jsxs("p",{className:"flex items-center gap-1 text-xs sm:text-sm text-gray-500",children:[d.jsx(cs,{}),d.jsx("span",{children:new Date(R.date).toLocaleDateString()})]}),R.description&&d.jsx("p",{className:"text-gray-700 text-xs sm:text-sm mt-2",children:R.description}),d.jsxs("div",{className:"mt-3",children:[d.jsx("p",{className:"text-xs sm:text-sm font-semibold text-gray-700 mb-2",children:"Your work types:"}),d.jsx("div",{className:"flex flex-wrap gap-2",children:L.map(V=>{const w=N(R,V);return d.jsxs("button",{type:"button",onClick:()=>k(R,V),className:`inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs sm:text-sm font-semibold transition ${w?"bg-green-600 text-white hover:bg-green-700":"bg-gray-200 text-gray-700 hover:bg-gray-300"}`,children:[w&&d.jsx(qo,{}),V]},V)})})]}),d.jsx("p",{className:"mt-3 text-xs sm:text-sm text-green-700 font-semibold",children:"All your work types are marked as done. Waiting for admin to complete."})]},R.id)})})]})]})]})]})},k6=()=>{const t=Gn(),[e,n]=O.useState({email:"",password:""}),[r,s]=O.useState(!1),[i,o]=O.useState(""),l=c=>{n(f=>({...f,[c.target.name]:c.target.value}))},u=async c=>{c.preventDefault(),o(""),s(!0);try{const m=(await Mk(_n,e.email,e.password)).user,g=bt(pe,"users",m.uid),k=await da(g);let C="user";k.exists()&&(C=k.data().userType||"user"),t(C==="admin"?"/admin-home":"/home")}catch(f){o(f.message||"Failed to log in.")}finally{s(!1)}};return d.jsx("div",{className:"min-h-screen bg-gray-100 flex items-center justify-center px-4",children:d.jsxs("div",{className:"w-full max-w-md bg-white rounded-lg shadow-md p-4 sm:p-6",children:[d.jsx("h1",{className:"text-xl sm:text-2xl font-bold text-gray-800 mb-4",children:"Log In"}),i&&d.jsx("div",{className:"mb-4 p-3 rounded bg-red-100 text-red-700 text-sm",children:i}),d.jsxs("form",{onSubmit:u,className:"space-y-3 sm:space-y-4",children:[d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Email"}),d.jsx("input",{type:"email",name:"email",value:e.email,onChange:l,required:!0,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Password"}),d.jsx("input",{type:"password",name:"password",value:e.password,onChange:l,required:!0,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),d.jsx("button",{type:"submit",disabled:r,className:"w-full bg-blue-600 text-white py-2 rounded font-semibold text-sm hover:bg-blue-700 disabled:opacity-50",children:r?"Logging in...":"Log In"}),d.jsxs("p",{className:"mt-3 text-center text-xs sm:text-sm text-gray-600",children:["Do not have an account?"," ",d.jsx("span",{onClick:()=>t("/signup"),className:"text-blue-600 font-semibold cursor-pointer hover:underline",children:"Sign up"})]})]})]})})},C6="mihirudahanayake@gmail.com",b6=["videography","photography"],R6=()=>{const t=Gn(),[e,n]=O.useState({name:"",email:"",phoneNo:"",departments:["videography"],firstPriority:"videography",batch:"20/21",studyDepartment:"ITT",gender:"male",registrationNumber:"",cardNumber:"",birthday:"",password:"",confirmPassword:""}),[r,s]=O.useState(!1),[i,o]=O.useState(""),l=m=>{n(g=>({...g,[m.target.name]:m.target.value}))},u=m=>{n(g=>{const C=g.departments.includes(m)?g.departments.filter(P=>P!==m):[...g.departments,m];let N=g.firstPriority;return C.includes(N)||(N=C[0]||""),{...g,departments:C,firstPriority:N}})},c=async m=>{if(m.preventDefault(),o(""),e.password!==e.confirmPassword){o("Password and confirm password do not match.");return}if(e.departments.length===0){o("Please select at least one work department.");return}s(!0);try{const k=(await Gw(_n,e.email,e.password)).user,C=k.email===C6?"admin":"user";await Ix(bt(pe,"users",k.uid),{name:e.name,email:e.email,phoneNo:e.phoneNo,departments:e.departments,firstPriority:e.firstPriority,batch:e.batch,studyDepartment:e.studyDepartment,gender:e.gender,registrationNumber:e.registrationNumber,cardNumber:e.cardNumber||null,birthday:e.birthday||null,userType:C,createdAt:new Date().toISOString()}),t(C==="admin"?"/admin-home":"/home")}catch(g){o(g.message||"Failed to sign up.")}finally{s(!1)}},f=m=>e.departments.includes(m);return d.jsx("div",{className:"min-h-screen bg-gray-100 flex items-center justify-center px-4",children:d.jsxs("div",{className:"w-full max-w-md bg-white rounded-lg shadow-md p-4 sm:p-6",children:[d.jsx("h1",{className:"text-xl sm:text-2xl font-bold text-gray-800 mb-4",children:"Sign Up"}),i&&d.jsx("div",{className:"mb-4 p-3 rounded bg-red-100 text-red-700 text-sm",children:i}),d.jsxs("form",{onSubmit:c,className:"space-y-3 sm:space-y-4",children:[d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Name"}),d.jsx("input",{type:"text",name:"name",value:e.name,onChange:l,required:!0,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Email"}),d.jsx("input",{type:"email",name:"email",value:e.email,onChange:l,required:!0,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Phone number"}),d.jsx("input",{type:"tel",name:"phoneNo",value:e.phoneNo,onChange:l,required:!0,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Batch"}),d.jsxs("select",{name:"batch",value:e.batch,onChange:l,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm",children:[d.jsx("option",{value:"20/21",children:"20/21"}),d.jsx("option",{value:"21/22",children:"21/22"}),d.jsx("option",{value:"22/23",children:"22/23"}),d.jsx("option",{value:"23/24",children:"23/24"})]})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Department in study"}),d.jsxs("select",{name:"studyDepartment",value:e.studyDepartment,onChange:l,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm",children:[d.jsx("option",{value:"ITT",children:"ITT"}),d.jsx("option",{value:"EET",children:"EET"}),d.jsx("option",{value:"MTT",children:"MTT"}),d.jsx("option",{value:"BPT",children:"BPT"}),d.jsx("option",{value:"Food",children:"Food"})]})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Gender"}),d.jsxs("div",{className:"flex items-center gap-4 text-sm",children:[d.jsxs("label",{className:"flex items-center gap-2",children:[d.jsx("input",{type:"radio",name:"gender",value:"male",checked:e.gender==="male",onChange:l}),d.jsx("span",{children:"Male"})]}),d.jsxs("label",{className:"flex items-center gap-2",children:[d.jsx("input",{type:"radio",name:"gender",value:"female",checked:e.gender==="female",onChange:l}),d.jsx("span",{children:"Female"})]})]})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Registration number"}),d.jsx("input",{type:"text",name:"registrationNumber",value:e.registrationNumber,onChange:l,required:!0,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Card (if have)"}),d.jsx("input",{type:"text",name:"cardNumber",value:e.cardNumber,onChange:l,placeholder:"Optional",className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Birthday"}),d.jsx("input",{type:"date",name:"birthday",value:e.birthday,onChange:l,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Departments (work)"}),d.jsx("div",{className:"bg-gray-50 border rounded p-2 flex flex-col gap-1",children:b6.map(m=>d.jsxs("label",{className:"flex items-center gap-2 text-sm",children:[d.jsx("input",{type:"checkbox",checked:f(m),onChange:()=>u(m)}),d.jsx("span",{className:"capitalize",children:m})]},m))}),d.jsx("p",{className:"mt-1 text-xs text-gray-500",children:"You can select one or more departments."})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"First priority department (work)"}),d.jsx("select",{name:"firstPriority",value:e.firstPriority,onChange:l,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm",children:e.departments.map(m=>d.jsx("option",{value:m,children:m},m))})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Password"}),d.jsx("input",{type:"password",name:"password",value:e.password,onChange:l,required:!0,minLength:6,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Confirm password"}),d.jsx("input",{type:"password",name:"confirmPassword",value:e.confirmPassword,onChange:l,required:!0,minLength:6,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),d.jsx("button",{type:"submit",disabled:r,className:"w-full bg-blue-600 text-white py-2 rounded font-semibold text-sm hover:bg-blue-700 disabled:opacity-50",children:r?"Creating account...":"Sign Up"}),d.jsxs("p",{className:"mt-3 text-center text-xs sm:text-sm text-gray-600",children:["Already have an account?"," ",d.jsx("span",{onClick:()=>t("/"),className:"text-blue-600 font-semibold cursor-pointer hover:underline",children:"Log in"})]})]})]})})},N6=()=>{const[t,e]=O.useState({name:"",email:"",password:"",phone:"",specialty:""}),[n,r]=O.useState(!1),[s,i]=O.useState({type:"",text:""}),o=u=>{e(c=>({...c,[u.target.name]:u.target.value}))},l=async u=>{u.preventDefault(),r(!0),i({type:"",text:""});try{const c=await Gw(_n,t.email,t.password),f=t.email==="mihirudahanayake@gmail.com"?"admin":"user";await Ix(bt(pe,"users",c.user.uid),{name:t.name,email:t.email,phone:t.phone,specialty:t.specialty,role:f,createdAt:new Date().toISOString()}),i({type:"success",text:"User created successfully."}),e({name:"",email:"",password:"",phone:"",specialty:""})}catch(c){i({type:"error",text:c.message})}finally{r(!1)}};return d.jsxs("div",{className:"min-h-screen bg-gray-100",children:[d.jsx(Rt,{userType:"admin"}),d.jsx("main",{className:"container mx-auto px-4 py-6 sm:py-8",children:d.jsxs("div",{className:"max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-8",children:[d.jsx("h2",{className:"text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6",children:"Create New User Account"}),s.text&&d.jsx("div",{className:`mb-4 p-3 sm:p-4 rounded text-sm sm:text-base ${s.type==="success"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`,children:s.text}),d.jsxs("form",{onSubmit:l,className:"space-y-4",children:[d.jsxs("div",{children:[d.jsx("label",{className:"block text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:"Name"}),d.jsx("input",{type:"text",name:"name",value:t.name,onChange:o,required:!0,className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:"Email"}),d.jsx("input",{type:"email",name:"email",value:t.email,onChange:o,required:!0,className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:"Password"}),d.jsx("input",{type:"password",name:"password",value:t.password,onChange:o,required:!0,minLength:6,className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:"Phone"}),d.jsx("input",{type:"tel",name:"phone",value:t.phone,onChange:o,className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:"Specialty"}),d.jsx("input",{type:"text",name:"specialty",value:t.specialty,onChange:o,className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"})]}),d.jsx("button",{type:"submit",disabled:n,className:"w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50 text-sm sm:text-base",children:n?"Creating user...":"Create User"})]})]})})]})},P6=["videography","editing"],D6=()=>{const[t,e]=O.useState([]),[n,r]=O.useState([]),[s,i]=O.useState({title:"",description:"",date:"",priority:"medium",assignedUsers:[],assignedItems:[]}),[o,l]=O.useState(!1),[u,c]=O.useState({type:"",text:""}),[f,m]=O.useState(""),[g,k]=O.useState("");O.useEffect(()=>{C(),N()},[]);const C=async()=>{try{const b=(await Ht(gt(pe,"users"))).docs.map(E=>({id:E.id,...E.data()}));e(b)}catch(I){console.error("Error fetching users:",I)}},N=async()=>{try{const b=(await Ht(gt(pe,"inventory"))).docs.map(E=>({id:E.id,...E.data()}));b.sort((E,J)=>{const ae=(E.itemName||"").toLowerCase(),se=(J.itemName||"").toLowerCase();return ae.localeCompare(se)}),r(b)}catch(I){console.error("Error fetching inventory:",I)}},P=I=>{i(b=>({...b,[I.target.name]:I.target.value}))},A=I=>{i(b=>b.assignedUsers.find(J=>J.userId===I)?{...b,assignedUsers:b.assignedUsers.filter(J=>J.userId!==I)}:{...b,assignedUsers:[...b.assignedUsers,{userId:I,roles:["videography"]}]})},_=(I,b)=>{i(E=>{const J=E.assignedUsers.map(ae=>{if(ae.userId!==I)return ae;const Re=ae.roles.includes(b)?ae.roles.filter(z=>z!==b):[...ae.roles,b];return{...ae,roles:Re.length?Re:[b]}});return{...E,assignedUsers:J}})},T=I=>{i(b=>({...b,assignedItems:b.assignedItems.includes(I)?b.assignedItems.filter(E=>E!==I):[...b.assignedItems,I]}))},R=async I=>{I.preventDefault(),l(!0),c({type:"",text:""});try{await Sx(gt(pe,"works"),{title:s.title,description:s.description,date:s.date,priority:s.priority,assignedUsers:s.assignedUsers.map(b=>b.userId),assignedUserDetails:s.assignedUsers,assignedItems:s.assignedItems,createdAt:new Date().toISOString(),status:"pending"}),c({type:"success",text:"Work assigned successfully!"}),i({title:"",description:"",date:"",priority:"medium",assignedUsers:[],assignedItems:[]})}catch(b){c({type:"error",text:b.message})}finally{l(!1)}},L=I=>s.assignedUsers.some(b=>b.userId===I),V=I=>{var b;return((b=s.assignedUsers.find(E=>E.userId===I))==null?void 0:b.roles)||[]},w=f.trim().toLowerCase(),y=t.filter(I=>{if(!w)return!0;const b=(I.name||"").toLowerCase(),E=(I.cardNumber||"").toLowerCase();return b.includes(w)||E.includes(w)}),x=g.trim().toLowerCase(),S=n.filter(I=>{if(!x)return!0;const b=(I.itemName||"").toLowerCase(),E=(I.itemNo||"").toLowerCase();return b.includes(x)||E.includes(x)});return d.jsxs("div",{className:"min-h-screen bg-gray-100",children:[d.jsx(Rt,{userType:"admin"}),d.jsx("main",{className:"container mx-auto px-4 py-6 sm:py-8",children:d.jsxs("div",{className:"max-w-3xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-8",children:[d.jsx("h2",{className:"text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6",children:"Create and Assign Work"}),u.text&&d.jsx("div",{className:`mb-4 p-3 sm:p-4 rounded text-sm sm:text-base ${u.type==="success"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`,children:u.text}),d.jsxs("form",{onSubmit:R,className:"space-y-4",children:[d.jsxs("div",{children:[d.jsxs("label",{className:"flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:[d.jsx(v6,{}),d.jsx("span",{children:"Work Title"})]}),d.jsx("input",{type:"text",name:"title",value:s.title,onChange:P,required:!0,className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"})]}),d.jsxs("div",{children:[d.jsxs("label",{className:"flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:[d.jsx(p6,{}),d.jsx("span",{children:"Description"})]}),d.jsx("textarea",{name:"description",value:s.description,onChange:P,required:!0,rows:"4",className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"})]}),d.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[d.jsxs("div",{children:[d.jsxs("label",{className:"flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:[d.jsx(cs,{}),d.jsx("span",{children:"Date"})]}),d.jsx("input",{type:"date",name:"date",value:s.date,onChange:P,required:!0,className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"})]}),d.jsxs("div",{children:[d.jsxs("label",{className:"flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:[d.jsx(y6,{}),d.jsx("span",{children:"Priority"})]}),d.jsxs("select",{name:"priority",value:s.priority,onChange:P,className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base",children:[d.jsx("option",{value:"low",children:"Low"}),d.jsx("option",{value:"medium",children:"Medium"}),d.jsx("option",{value:"high",children:"High"}),d.jsx("option",{value:"urgent",children:"Urgent"})]})]})]}),d.jsxs("div",{children:[d.jsxs("label",{className:"flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:[d.jsx(iE,{}),d.jsx("span",{children:"Assign Team Members"})]}),d.jsxs("div",{className:"relative mb-2",children:[d.jsx(pi,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"}),d.jsx("input",{type:"text",placeholder:"Search by name or card...",value:f,onChange:I=>m(I.target.value),className:"w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"})]}),d.jsx("div",{className:"border border-gray-300 rounded p-3 sm:p-4 max-h-60 overflow-y-auto",children:y.length===0?d.jsx("p",{className:"text-gray-500 text-sm sm:text-base",children:"No users found"}):y.map(I=>{const b=L(I.id),E=V(I.id);return d.jsxs("div",{className:"mb-2 p-2 rounded hover:bg-gray-50",children:[d.jsxs("label",{className:"flex items-center cursor-pointer",children:[d.jsx("input",{type:"checkbox",checked:b,onChange:()=>A(I.id),className:"mr-3 w-4 h-4"}),d.jsx("div",{className:"flex-1",children:d.jsxs("p",{className:"text-gray-700 text-sm sm:text-base",children:[I.name," ",d.jsxs("span",{className:"text-xs text-gray-500",children:["(",I.cardNumber||"-",")"]})]})})]}),b&&d.jsx("div",{className:"mt-1 ml-7 flex flex-wrap gap-2 text-xs sm:text-sm",children:P6.map(J=>d.jsx("button",{type:"button",onClick:()=>_(I.id,J),className:`px-2 py-1 rounded border ${E.includes(J)?"bg-green-600 text-white border-green-600":"bg-white text-gray-700 border-gray-300"}`,children:J},J))})]},I.id)})}),d.jsxs("p",{className:"text-xs sm:text-sm text-gray-500 mt-2",children:["Selected: ",s.assignedUsers.length," member(s)"]})]}),d.jsxs("div",{children:[d.jsxs("label",{className:"flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:[d.jsx(fa,{}),d.jsx("span",{children:"Assign Inventory Items (Optional)"})]}),d.jsxs("div",{className:"relative mb-2",children:[d.jsx(pi,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"}),d.jsx("input",{type:"text",placeholder:"Search by item name or number...",value:g,onChange:I=>k(I.target.value),className:"w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"})]}),d.jsx("div",{className:"border border-gray-300 rounded p-3 sm:p-4 max-h-60 overflow-y-auto",children:S.length===0?d.jsx("p",{className:"text-gray-500 text-sm sm:text-base",children:"No items found"}):S.map(I=>d.jsxs("label",{className:"flex items-center mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded",children:[d.jsx("input",{type:"checkbox",checked:s.assignedItems.includes(I.id),onChange:()=>T(I.id),className:"mr-3 w-4 h-4"}),d.jsxs("div",{className:"flex-1",children:[d.jsxs("p",{className:"text-gray-700 text-sm sm:text-base",children:[I.itemName," ",d.jsxs("span",{className:"text-xs text-gray-500",children:["(",I.itemNo,")"]})]}),I.details&&d.jsx("p",{className:"text-xs text-gray-500 mt-0.5",children:I.details})]})]},I.id))}),d.jsxs("p",{className:"text-xs sm:text-sm text-gray-500 mt-2",children:["Selected: ",s.assignedItems.length," item(s)"]})]}),d.jsx("button",{type:"submit",disabled:o||s.assignedUsers.length===0,className:"w-full bg-green-600 text-white py-2 sm:py-3 px-4 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50 text-sm sm:text-base",children:o?"Creating Work...":"Create and Assign Work"})]})]})})]})},O6=()=>{const[t,e]=O.useState([]),[n,r]=O.useState({}),[s,i]=O.useState({}),[o,l]=O.useState(!0),[u,c]=O.useState(""),[f,m]=O.useState(""),[g,k]=O.useState(""),C=Gn();O.useEffect(()=>{N()},[]);const N=async()=>{l(!0);try{const y=await Ht(gt(pe,"users")),x={};y.docs.forEach(J=>{x[J.id]=J.data()}),r(x);const S=await Ht(gt(pe,"inventory")),I={};S.docs.forEach(J=>{I[J.id]=J.data()}),i(I);const E=(await Ht(gt(pe,"works"))).docs.map(J=>({id:J.id,...J.data()}));e(E)}catch(y){console.error("Error fetching data:",y)}finally{l(!1)}},P=async y=>{try{const x=bt(pe,"works",y);await ha(x,{status:"complete"}),e(S=>S.map(I=>I.id===y?{...I,status:"complete"}:I))}catch(x){console.error("Failed to mark task complete:",x)}},A=u.trim().toLowerCase(),_=t.filter(y=>{if(f||g){if(!y.date)return!1;const se=new Date(y.date),Re=new Date(se.getTime()-se.getTimezoneOffset()*6e4).toISOString().slice(0,10);if(f&&Re<f||g&&Re>g)return!1}if(!A)return!0;const x=(y.title||"").toLowerCase(),S=(y.assignedUsers||[]).map(se=>n[se]||{}),I=S.map(se=>(se.name||"").toLowerCase()),b=S.map(se=>(se.cardNumber||"").toLowerCase()),E=x.includes(A),J=I.some(se=>se.includes(A)),ae=b.some(se=>se.includes(A));return E||J||ae}).sort((y,x)=>{const S=y.date?new Date(y.date).getTime():0;return(x.date?new Date(x.date).getTime():0)-S}),T=_.filter(y=>(y.status||"incomplete")!=="complete"),R=_.filter(y=>(y.status||"incomplete")==="complete");if(o)return d.jsxs("div",{className:"min-h-screen bg-gray-100",children:[d.jsx(Rt,{userType:"admin"}),d.jsxs("div",{className:"flex flex-col justify-center items-center h-64",children:[d.jsx(xs,{className:"animate-spin text-4xl text-blue-600 mb-4"}),d.jsx("p",{className:"text-gray-600",children:"Loading tasks..."})]})]});const L=y=>{const x={incomplete:"bg-gray-100 text-gray-800",done:"bg-yellow-100 text-yellow-800",complete:"bg-green-100 text-green-800"};return x[y]||x.incomplete},V=(y,x=!1)=>{var J;const S=y.status||"incomplete",I=y.assignedUserDetails||[],b=y.roleCompletion||{},E=y.assignedItems||[];return d.jsxs("div",{className:"bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-xl transition cursor-pointer",onClick:()=>C(`/tasks/${y.id}`),children:[d.jsxs("div",{className:"flex justify-between items-start mb-3",children:[d.jsxs("div",{className:"flex-1 pr-2",children:[d.jsx("h3",{className:"text-lg sm:text-xl font-semibold text-gray-800",children:y.title||"Task"}),d.jsxs("p",{className:"mt-1 text-xs sm:text-sm text-gray-500 capitalize",children:["Priority: ",y.priority||"medium"]})]}),d.jsx("span",{className:`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold capitalize ${L(S)}`,children:S})]}),y.description&&d.jsx("p",{className:"text-gray-600 mb-4 text-sm sm:text-base line-clamp-3",children:y.description}),y.date&&d.jsx("div",{className:"mb-3",children:d.jsxs("div",{className:"flex items-center gap-2 text-xs sm:text-sm text-gray-500",children:[d.jsx(cs,{}),d.jsxs("span",{children:["Date: ",new Date(y.date).toLocaleDateString()]})]})}),d.jsxs("div",{className:"mb-3",children:[d.jsxs("div",{className:"flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2",children:[d.jsx(iE,{}),d.jsx("span",{children:"Assigned to:"})]}),d.jsxs("div",{className:"space-y-2",children:[I.map(ae=>{var K;const se=ae.userId,Re=ae.roles||[],z=((K=n[se])==null?void 0:K.name)||"Unknown";return d.jsxs("div",{className:"bg-gray-50 px-2 py-1 rounded text-xs sm:text-sm",children:[d.jsx("p",{className:"font-semibold text-gray-800",children:z}),d.jsx("div",{className:"flex flex-wrap gap-1 mt-1",children:Re.map(U=>{const q=`${se}_${U}`,Q=b[q]==="done";return d.jsxs("span",{className:`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${Q?"bg-green-100 text-green-800":"bg-gray-200 text-gray-700"}`,children:[Q&&d.jsx(qo,{className:"text-xs"}),U]},U)})})]},se)}),I.length===0&&((J=y.assignedUsers)==null?void 0:J.map(ae=>{var se;return d.jsx("span",{className:"bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm text-gray-700",children:((se=n[ae])==null?void 0:se.name)||"Unknown"},ae)}))]})]}),E.length>0&&d.jsxs("div",{className:"mb-3",children:[d.jsxs("div",{className:"flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2",children:[d.jsx(fa,{}),d.jsx("span",{children:"Items:"})]}),d.jsx("div",{className:"flex flex-wrap gap-2",children:E.map(ae=>{const se=s[ae];return d.jsx("span",{className:"bg-blue-50 px-2 py-1 rounded text-xs sm:text-sm text-blue-800",children:se?`${se.itemName} (${se.itemNo})`:"Unknown item"},ae)})})]}),!x&&d.jsxs("button",{type:"button",onClick:ae=>{ae.stopPropagation(),P(y.id)},className:"mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded bg-green-600 text-white text-xs sm:text-sm hover:bg-green-700",children:[d.jsx(qo,{}),"Mark as complete"]}),x&&d.jsx("p",{className:"mt-2 text-xs sm:text-sm text-green-700 font-semibold",children:"Completed"})]},y.id)},w=T.length>0||R.length>0;return d.jsxs("div",{className:"min-h-screen bg-gray-100",children:[d.jsx(Rt,{userType:"admin"}),d.jsxs("main",{className:"container mx-auto px-4 py-6 sm:py-8",children:[d.jsxs("div",{className:"flex flex-col gap-3 mb-4 sm:mb-6",children:[d.jsx("h2",{className:"text-xl sm:text-2xl font-bold text-gray-800",children:"All Tasks"}),d.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-3",children:[d.jsxs("div",{className:"relative flex-1 min-w-0",children:[d.jsx(pi,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"}),d.jsx("input",{type:"text",placeholder:"Search title, user name, or card...",value:u,onChange:y=>c(y.target.value),className:"w-full pl-9 pr-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),d.jsxs("div",{className:"grid grid-cols-2 gap-2 sm:flex sm:gap-2 w-full sm:w-auto",children:[d.jsx("input",{type:"date",value:f,onChange:y=>m(y.target.value),className:"w-full px-2 py-2 border rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500","aria-label":"Start date"}),d.jsx("input",{type:"date",value:g,onChange:y=>k(y.target.value),className:"w-full px-2 py-2 border rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500","aria-label":"End date"})]})]})]}),w?d.jsxs(d.Fragment,{children:[T.length>0&&d.jsxs("section",{className:"mb-6",children:[d.jsx("h3",{className:"text-lg sm:text-xl font-semibold text-gray-800 mb-3",children:"Incomplete / waiting for admin"}),d.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",children:T.map(y=>V(y,!1))})]}),R.length>0&&d.jsxs("section",{children:[d.jsx("h3",{className:"text-lg sm:text-xl font-semibold text-gray-800 mb-3",children:"Completed tasks"}),d.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",children:R.map(y=>V(y,!0))})]})]}):d.jsx("div",{className:"bg-white rounded-lg shadow-md p-6 sm:p-8 text-center",children:d.jsx("p",{className:"text-gray-600 text-sm sm:text-base",children:"No tasks match your filters."})})]})]})},j6=()=>{const[t,e]=O.useState(null),[n,r]=O.useState(null),[s,i]=O.useState("loading"),[o,l]=O.useState(!1),[u,c]=O.useState(!1),[f,m]=O.useState(!1),[g,k]=O.useState(!1),[C,N]=O.useState(""),[P,A]=O.useState(""),[_,T]=O.useState(""),[R,L]=O.useState(""),[V,w]=O.useState({newPassword:"",confirmPassword:""}),y=Gn();O.useEffect(()=>{const K=Mu(_n,async U=>{if(!U){i("no-auth"),e(null);return}try{const q=await da(bt(pe,"users",U.uid));if(q.exists()){const Q={id:U.uid,...q.data()};e(Q),r(Q)}i("ready")}catch(q){console.error(q),i("error")}});return()=>K()},[]);const x=async()=>{await $k(_n),y("/")},S=K=>{if(!o)return;const{name:U,value:q}=K.target;e(Q=>({...Q,[U]:q}))},I=()=>{N(""),A(""),r(t),l(!0)},b=()=>{N(""),A(""),e(n),l(!1)},E=async K=>{if(K.preventDefault(),!!(t!=null&&t.id)){m(!0),N(""),A("");try{const U=bt(pe,"users",t.id),{id:q,userType:Q,createdAt:ne,...dt}=t;await ha(U,dt),A("Profile updated successfully."),l(!1),r(t)}catch(U){console.error(U),N("Failed to update profile.")}finally{m(!1)}}},J=()=>{T(""),L(""),w({newPassword:"",confirmPassword:""}),c(!0)},ae=()=>{T(""),L(""),w({newPassword:"",confirmPassword:""}),c(!1)},se=async K=>{if(K.preventDefault(),T(""),L(""),V.newPassword.length<6){T("New password must be at least 6 characters.");return}if(V.newPassword!==V.confirmPassword){T("New password and confirm password do not match.");return}const U=_n.currentUser;if(!U){T("You are not logged in.");return}k(!0);try{await Uk(U,V.newPassword),L("Password updated successfully."),c(!1),w({newPassword:"",confirmPassword:""})}catch(q){console.error(q),T(q.message||"Failed to update password.")}finally{k(!1)}},Re=(t==null?void 0:t.userType)==="admin"?"admin":"user",z="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";return d.jsxs("div",{className:"min-h-screen bg-gray-100",children:[d.jsx(Rt,{userType:Re}),d.jsxs("main",{className:"container mx-auto px-4 py-6 sm:py-8 max-w-2xl",children:[d.jsxs("div",{className:"flex items-center justify-between mb-6",children:[d.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-gray-800",children:"Profile"}),d.jsx("button",{onClick:x,className:"text-xs sm:text-sm px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700",children:"Logout"})]}),s==="loading"&&d.jsx("p",{className:"text-gray-600 text-sm sm:text-base",children:"Loading profile..."}),s==="no-auth"&&d.jsx("p",{className:"text-gray-600 text-sm sm:text-base",children:"You are not logged in."}),s==="error"&&d.jsx("p",{className:"text-red-600 text-sm sm:text-base",children:"Failed to load profile information."}),s==="ready"&&t&&d.jsxs(d.Fragment,{children:[d.jsxs("form",{onSubmit:E,className:"bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-3 mb-6",children:[d.jsxs("div",{className:"flex justify-between items-center mb-2",children:[d.jsx("h2",{className:"text-lg font-semibold text-gray-800",children:"Profile details"}),o?d.jsxs("div",{className:"flex gap-2",children:[d.jsx("button",{type:"submit",disabled:f,className:"text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50",children:f?"Saving...":"Save"}),d.jsx("button",{type:"button",onClick:b,className:"text-sm px-3 py-1 rounded bg-gray-300 text-gray-800 hover:bg-gray-400",children:"Cancel"})]}):d.jsx("button",{type:"button",onClick:I,className:"text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700",children:"Edit"})]}),C&&d.jsx("div",{className:"p-2 rounded bg-red-100 text-red-700 text-sm",children:C}),P&&d.jsx("div",{className:"p-2 rounded bg-green-100 text-green-700 text-sm",children:P}),d.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:[d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Name"}),d.jsx("input",{type:"text",name:"name",value:t.name||"",onChange:S,className:z,disabled:!o})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Phone"}),d.jsx("input",{type:"tel",name:"phoneNo",value:t.phoneNo||"",onChange:S,className:z,disabled:!o})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Batch"}),d.jsxs("select",{name:"batch",value:t.batch||"20/21",onChange:S,className:z,disabled:!o,children:[d.jsx("option",{value:"20/21",children:"20/21"}),d.jsx("option",{value:"21/22",children:"21/22"}),d.jsx("option",{value:"22/23",children:"22/23"}),d.jsx("option",{value:"23/24",children:"23/24"})]})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Study department"}),d.jsxs("select",{name:"studyDepartment",value:t.studyDepartment||"ITT",onChange:S,className:z,disabled:!o,children:[d.jsx("option",{value:"ITT",children:"ITT"}),d.jsx("option",{value:"EET",children:"EET"}),d.jsx("option",{value:"MTT",children:"MTT"}),d.jsx("option",{value:"BPT",children:"BPT"}),d.jsx("option",{value:"Food",children:"Food"})]})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Gender"}),d.jsxs("select",{name:"gender",value:t.gender||"male",onChange:S,className:z,disabled:!o,children:[d.jsx("option",{value:"male",children:"Male"}),d.jsx("option",{value:"female",children:"Female"})]})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Registration number"}),d.jsx("input",{type:"text",name:"registrationNumber",value:t.registrationNumber||"",onChange:S,className:z,disabled:!o})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Card"}),d.jsx("input",{type:"text",name:"cardNumber",value:t.cardNumber||"",onChange:S,className:z,disabled:!o})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Birthday"}),d.jsx("input",{type:"date",name:"birthday",value:t.birthday||"",onChange:S,className:z,disabled:!o})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Work department"}),d.jsxs("select",{name:"department",value:t.department||"videography",onChange:S,className:z,disabled:!o,children:[d.jsx("option",{value:"videography",children:"Videography"}),d.jsx("option",{value:"photography",children:"Photography"})]})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"First priority (work)"}),d.jsxs("select",{name:"firstPriority",value:t.firstPriority||"videography",onChange:S,className:z,disabled:!o,children:[d.jsx("option",{value:"videography",children:"Videography"}),d.jsx("option",{value:"photography",children:"Photography"})]})]})]})]}),d.jsxs("div",{className:"bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-3",children:[d.jsxs("div",{className:"flex justify-between items-center mb-1",children:[d.jsx("h2",{className:"text-lg font-semibold text-gray-800",children:"Change password"}),u?d.jsx("button",{type:"button",onClick:ae,className:"text-sm px-3 py-1 rounded bg-gray-300 text-gray-800 hover:bg-gray-400",children:"Cancel"}):d.jsx("button",{type:"button",onClick:J,className:"text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700",children:"Change"})]}),_&&d.jsx("div",{className:"p-2 rounded bg-red-100 text-red-700 text-sm",children:_}),R&&d.jsx("div",{className:"p-2 rounded bg-green-100 text-green-700 text-sm",children:R}),u&&d.jsxs("form",{onSubmit:se,className:"space-y-3 mt-2",children:[d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"New password"}),d.jsx("input",{type:"password",name:"newPassword",value:V.newPassword,onChange:K=>w(U=>({...U,newPassword:K.target.value})),className:z,minLength:6,required:!0})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Confirm new password"}),d.jsx("input",{type:"password",name:"confirmPassword",value:V.confirmPassword,onChange:K=>w(U=>({...U,confirmPassword:K.target.value})),className:z,minLength:6,required:!0})]}),d.jsx("button",{type:"submit",disabled:g,className:"w-full bg-blue-600 text-white py-2 rounded font-semibold text-sm hover:bg-blue-700 disabled:opacity-50",children:g?"Updating...":"Update password"})]})]})]})]})]})},L6=()=>{const[t,e]=O.useState([]),[n,r]=O.useState(!0),[s,i]=O.useState(""),[o,l]=O.useState("all"),u=Gn();O.useEffect(()=>{(async()=>{try{const k=(await Ht(gt(pe,"users"))).docs.map(C=>({id:C.id,...C.data()}));e(k)}catch(g){console.error("Error loading users:",g)}finally{r(!1)}})()},[]);const c=s.trim().toLowerCase(),f=t.filter(m=>{if(o!=="all"&&(m.batch||"")!==o)return!1;if(!c)return!0;const g=(m.name||"").toLowerCase(),k=(m.cardNumber||"").toLowerCase();return g.includes(c)||k.includes(c)});return d.jsxs("div",{className:"min-h-screen bg-gray-100",children:[d.jsx(Rt,{userType:"admin"}),d.jsxs("main",{className:"container mx-auto px-4 py-6 sm:py-8 max-w-4xl",children:[d.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-gray-800 mb-4",children:"Manage users"}),d.jsxs("div",{className:"mb-4 flex flex-col sm:flex-row gap-3 sm:items-center",children:[d.jsxs("div",{className:"flex-1 relative",children:[d.jsx(pi,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"}),d.jsx("input",{type:"text",placeholder:"Search by name or card...",value:s,onChange:m=>i(m.target.value),className:"w-full pl-9 pr-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),d.jsx("div",{className:"w-full sm:w-40",children:d.jsxs("select",{value:o,onChange:m=>l(m.target.value),className:"w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",children:[d.jsx("option",{value:"all",children:"All batches"}),d.jsx("option",{value:"20/21",children:"20/21"}),d.jsx("option",{value:"21/22",children:"21/22"}),d.jsx("option",{value:"22/23",children:"22/23"}),d.jsx("option",{value:"23/24",children:"23/24"})]})})]}),n?d.jsxs("div",{className:"flex items-center gap-2 text-gray-600",children:[d.jsx(xs,{className:"animate-spin"}),d.jsx("span",{children:"Loading users..."})]}):f.length===0?d.jsx("p",{className:"text-gray-600 text-sm sm:text-base",children:"No users match your search."}):d.jsx("div",{className:"bg-white rounded-lg shadow-md divide-y",children:f.map(m=>d.jsxs("button",{onClick:()=>u(`/users/${m.id}`),className:"w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50",children:[d.jsxs("div",{className:"flex items-center gap-3",children:[d.jsx("div",{className:"w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600",children:d.jsx(sE,{})}),d.jsxs("div",{children:[d.jsx("p",{className:"font-semibold text-gray-800 text-sm sm:text-base",children:m.name||"No name"}),d.jsxs("p",{className:"flex items-center gap-1 text-xs sm:text-sm text-gray-600",children:[d.jsx(g6,{})," ",m.email]}),d.jsxs("p",{className:"text-xs text-gray-500",children:["Card: ",m.cardNumber||"-"," • Batch: ",m.batch||"-"]})]})]}),d.jsx("span",{className:"text-xs sm:text-sm text-gray-500",children:m.userType||"user"})]},m.id))})]})]})},V6=()=>{const{userId:t}=sw(),[e,n]=O.useState(null),[r,s]=O.useState([]),[i,o]=O.useState(!0);O.useEffect(()=>{(async()=>{try{const f=await da(bt(pe,"users",t));f.exists()&&n({id:t,...f.data()});const k=(await Ht(gt(pe,"works"))).docs.map(C=>({id:C.id,...C.data()})).filter(C=>C.assignedUsers?Array.isArray(C.assignedUsers)?C.assignedUsers.includes(t):C.assignedUsers===t:!1);k.sort((C,N)=>{const P=C.date?new Date(C.date).getTime():0;return(N.date?new Date(N.date).getTime():0)-P}),s(k)}catch(f){console.error("Error loading user details:",f)}finally{o(!1)}})()},[t]);const l=c=>{const m=(c.assignedUserDetails||[]).find(g=>g.userId===t);return(m==null?void 0:m.roles)||[]},u=(c,f)=>{const m=`${t}_${f}`;return(c.roleCompletion||{})[m]==="done"};return d.jsxs("div",{className:"min-h-screen bg-gray-100",children:[d.jsx(Rt,{userType:"admin"}),d.jsxs("main",{className:"container mx-auto px-4 py-6 sm:py-8 max-w-4xl",children:[i&&d.jsxs("div",{className:"flex items-center gap-2 text-gray-600",children:[d.jsx(xs,{className:"animate-spin"}),d.jsx("span",{children:"Loading user..."})]}),!i&&!e&&d.jsx("p",{className:"text-gray-600 text-sm sm:text-base",children:"User not found."}),!i&&e&&d.jsxs(d.Fragment,{children:[d.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-gray-800 mb-2",children:e.name||"User details"}),d.jsx("p",{className:"text-sm sm:text-base text-gray-600 mb-4",children:e.email}),d.jsxs("div",{className:"bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 text-sm sm:text-base space-y-2",children:[d.jsxs("p",{children:[d.jsx("span",{className:"font-semibold",children:"Phone:"})," ",e.phoneNo||"-"]}),d.jsxs("p",{children:[d.jsx("span",{className:"font-semibold",children:"Batch:"})," ",e.batch||"-"]}),d.jsxs("p",{children:[d.jsx("span",{className:"font-semibold",children:"Study department:"})," ",e.studyDepartment||"-"]}),d.jsxs("p",{children:[d.jsx("span",{className:"font-semibold",children:"Gender:"})," ",e.gender||"-"]}),d.jsxs("p",{children:[d.jsx("span",{className:"font-semibold",children:"Registration no:"})," ",e.registrationNumber||"-"]}),d.jsxs("p",{children:[d.jsx("span",{className:"font-semibold",children:"Card:"})," ",e.cardNumber||"-"]}),d.jsxs("p",{children:[d.jsx("span",{className:"font-semibold",children:"Work departments:"})," ",Array.isArray(e.departments)?e.departments.join(", "):e.department||"-"]}),d.jsxs("p",{children:[d.jsx("span",{className:"font-semibold",children:"First priority:"})," ",e.firstPriority||"-"]}),d.jsxs("p",{children:[d.jsx("span",{className:"font-semibold",children:"User type:"})," ",e.userType||"user"]})]}),d.jsx("h2",{className:"text-xl sm:text-2xl font-semibold text-gray-800 mb-3",children:"Task history"}),r.length===0?d.jsx("p",{className:"text-gray-600 text-sm sm:text-base",children:"No tasks for this user."}):d.jsx("div",{className:"space-y-3",children:r.map(c=>{const f=l(c),m=c.status||"incomplete";return d.jsxs("div",{className:"bg-white rounded-lg shadow p-3 sm:p-4 text-sm sm:text-base",children:[d.jsxs("div",{className:"flex justify-between items-start mb-2",children:[d.jsxs("div",{className:"flex-1",children:[d.jsx("h3",{className:"font-semibold text-gray-800",children:c.title||"Untitled task"}),c.date&&d.jsxs("span",{className:"flex items-center gap-1 text-xs text-gray-500 mt-1",children:[d.jsx(cs,{})," ",new Date(c.date).toLocaleDateString()]})]}),d.jsx("span",{className:`px-2 py-1 rounded text-xs font-semibold capitalize ${m==="complete"?"bg-green-100 text-green-800":m==="done"?"bg-yellow-100 text-yellow-800":"bg-gray-100 text-gray-800"}`,children:m})]}),c.description&&d.jsx("p",{className:"text-gray-700 text-sm mb-2",children:c.description}),f.length>0&&d.jsxs("div",{className:"mt-2",children:[d.jsx("p",{className:"text-xs font-semibold text-gray-700 mb-1",children:"Assigned work types:"}),d.jsx("div",{className:"flex flex-wrap gap-1",children:f.map(g=>{const k=u(c,g);return d.jsxs("span",{className:`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${k?"bg-green-100 text-green-800":"bg-gray-100 text-gray-700"}`,children:[k&&d.jsx(qo,{className:"text-xs"}),g]},g)})})]})]},c.id)})})]})]})]})},M6=()=>{const[t,e]=O.useState(null),[n,r]=O.useState([]),[s,i]=O.useState(!0),[o,l]=O.useState(!1);O.useEffect(()=>{const f=Mu(_n,m=>{e(m||null),i(!1)});return()=>f()},[]),O.useEffect(()=>{if(!t)return;(async()=>{l(!0);try{const k=(await Ht(gt(pe,"works"))).docs.map(C=>({id:C.id,...C.data()})).filter(C=>Array.isArray(C.assignedUsers)&&C.assignedUsers.includes(t.uid));k.sort((C,N)=>{const P=C.date?new Date(C.date).getTime():0;return(N.date?new Date(N.date).getTime():0)-P}),r(k)}catch(m){console.error("Error loading task history:",m)}finally{l(!1)}})()},[t]);const u=f=>f.status||"incomplete";return d.jsxs("div",{className:"min-h-screen bg-gray-100",children:[d.jsx(Rt,{userType:"user"}),d.jsxs("main",{className:"container mx-auto px-4 py-8 max-w-3xl",children:[d.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-gray-800 mb-4",children:"Task history"}),d.jsx("p",{className:"text-gray-600 text-sm sm:text-base mb-6",children:"All tasks assigned to you, sorted by date (newest first)."}),s||o?d.jsxs("div",{className:"flex items-center gap-2 text-gray-600",children:[d.jsx(xs,{className:"animate-spin text-xl text-blue-600"}),d.jsx("span",{children:"Loading task history..."})]}):n.length===0?d.jsx("p",{className:"text-gray-600 text-sm sm:text-base",children:"No tasks found in your history."}):d.jsx("div",{className:"space-y-3",children:n.map(f=>d.jsxs("div",{className:"bg-white rounded-lg shadow p-4 sm:p-5",children:[d.jsxs("div",{className:"flex justify-between items-start gap-2 mb-1",children:[d.jsx("h2",{className:"font-semibold text-gray-800 text-sm sm:text-base",children:f.title||"Task"}),d.jsx("span",{className:"text-xs sm:text-sm capitalize text-gray-600",children:u(f)})]}),f.date&&d.jsxs("p",{className:"flex items-center gap-1 text-xs sm:text-sm text-gray-500 mb-1",children:[d.jsx(cs,{}),d.jsx("span",{children:new Date(f.date).toLocaleDateString()})]}),f.description&&d.jsx("p",{className:"text-gray-700 text-xs sm:text-sm mt-1",children:f.description})]},f.id))})]})]})},U6=["videography","editing"],F6=()=>{const{taskId:t}=sw(),e=Gn(),[n,r]=O.useState(null),[s,i]=O.useState([]),[o,l]=O.useState([]),[u,c]=O.useState([]),[f,m]=O.useState([]),[g,k]=O.useState(!0),[C,N]=O.useState(!1),[P,A]=O.useState(!1),[_,T]=O.useState(!1),[R,L]=O.useState(""),[V,w]=O.useState(""),[y,x]=O.useState("");O.useEffect(()=>{(async()=>{k(!0);try{const Q=(await Ht(gt(pe,"users"))).docs.map(Ee=>({id:Ee.id,...Ee.data()}));i(Q);const dt=(await Ht(gt(pe,"inventory"))).docs.map(Ee=>({id:Ee.id,...Ee.data()}));dt.sort((Ee,Gt)=>{const lc=(Ee.itemName||"").toLowerCase(),uc=(Gt.itemName||"").toLowerCase();return lc.localeCompare(uc)}),l(dt);const Je=await da(bt(pe,"works",t));if(Je.exists()){const Ee={id:Je.id,...Je.data()};r(Ee),c(Ee.assignedUserDetails||[]),m(Ee.assignedItems||[])}else L("Task not found.")}catch(q){console.error(q),L("Failed to load task.")}finally{k(!1)}})()},[t]);const S=U=>{if(!_)return;const q=u.find(Q=>Q.userId===U);c(q?Q=>Q.filter(ne=>ne.userId!==U):Q=>[...Q,{userId:U,roles:["videography"]}])},I=(U,q)=>{_&&c(Q=>Q.map(ne=>{if(ne.userId!==U)return ne;const Je=ne.roles.includes(q)?ne.roles.filter(Ee=>Ee!==q):[...ne.roles,q];return{...ne,roles:Je.length?Je:[q]}}))},b=U=>{_&&m(q=>q.includes(U)?q.filter(Q=>Q!==U):[...q,U])},E=U=>{if(!_)return;const{name:q,value:Q}=U.target;r(ne=>({...ne,[q]:Q}))},J=async U=>{if(U.preventDefault(),!!n){N(!0),L(""),w("");try{const{id:q,...Q}=n;await ha(bt(pe,"works",n.id),{...Q,assignedUsers:u.map(ne=>ne.userId),assignedUserDetails:u,assignedItems:f}),w("Task updated successfully."),T(!1)}catch(q){console.error(q),L("Failed to update task.")}finally{N(!1)}}},ae=async()=>{if(window.confirm("Are you sure you want to delete this task?")){A(!0),L(""),w("");try{await tP(bt(pe,"works",t)),w("Task deleted successfully."),setTimeout(()=>e("/work-list"),1500)}catch(U){console.error(U),L("Failed to delete task.")}finally{A(!1)}}};if(g)return d.jsxs("div",{className:"min-h-screen bg-gray-100",children:[d.jsx(Rt,{userType:"admin"}),d.jsxs("div",{className:"flex flex-col justify-center items-center h-64",children:[d.jsx(xs,{className:"animate-spin text-4xl text-blue-600 mb-4"}),d.jsx("p",{className:"text-gray-600",children:"Loading task..."})]})]});if(!n)return d.jsxs("div",{className:"min-h-screen bg-gray-100",children:[d.jsx(Rt,{userType:"admin"}),d.jsxs("main",{className:"container mx-auto px-4 py-6 sm:py-8 max-w-3xl",children:[d.jsx("p",{className:"text-gray-600 mb-4",children:R||"Task not found."}),d.jsx("button",{onClick:()=>e(-1),className:"px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700",children:"Back"})]})]});const se=U=>u.some(q=>q.userId===U),Re=U=>{var q;return((q=u.find(Q=>Q.userId===U))==null?void 0:q.roles)||[]},z=y.trim().toLowerCase(),K=o.filter(U=>{if(!z)return!0;const q=(U.itemName||"").toLowerCase(),Q=(U.itemNo||"").toLowerCase();return q.includes(z)||Q.includes(z)});return d.jsxs("div",{className:"min-h-screen bg-gray-100",children:[d.jsx(Rt,{userType:"admin"}),d.jsxs("main",{className:"container mx-auto px-4 py-6 sm:py-8 max-w-3xl",children:[d.jsxs("div",{className:"flex items-center justify-between mb-4",children:[d.jsx("h1",{className:"text-xl sm:text-2xl font-bold text-gray-800",children:"Task details"}),d.jsxs("div",{className:"flex gap-2",children:[_?d.jsxs(d.Fragment,{children:[d.jsx("button",{onClick:J,disabled:C,className:"px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50",children:C?"Saving...":"Save"}),d.jsx("button",{onClick:()=>{T(!1),w(""),L(""),c(n.assignedUserDetails||[]),m(n.assignedItems||[])},className:"px-3 py-1 rounded bg-gray-300 text-gray-800 text-sm hover:bg-gray-400",children:"Cancel"})]}):d.jsxs(d.Fragment,{children:[d.jsx("button",{onClick:()=>{T(!0),L(""),w("")},className:"px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700",children:"Edit"}),d.jsxs("button",{onClick:ae,disabled:P,className:"px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700 disabled:opacity-50 inline-flex items-center gap-1",children:[d.jsx(I6,{}),P?"Deleting...":"Delete"]})]}),d.jsx("button",{onClick:()=>e(-1),className:"px-3 py-1 rounded bg-gray-200 text-gray-800 text-sm hover:bg-gray-300",children:"Back"})]})]}),R&&d.jsx("div",{className:"mb-3 p-2 rounded bg-red-100 text-red-700 text-sm",children:R}),V&&d.jsx("div",{className:"mb-3 p-2 rounded bg-green-100 text-green-700 text-sm",children:V}),d.jsxs("form",{className:"space-y-4",onSubmit:J,children:[d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Title"}),d.jsx("input",{type:"text",name:"title",value:n.title||"",onChange:E,disabled:!_,className:"w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Description"}),d.jsx("textarea",{name:"description",value:n.description||"",onChange:E,disabled:!_,rows:3,className:"w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),d.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:[d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Date"}),d.jsxs("div",{className:"flex items-center gap-2",children:[d.jsx(cs,{className:"text-gray-500"}),d.jsx("input",{type:"date",name:"date",value:n.date?new Date(n.date).toISOString().slice(0,10):"",onChange:E,disabled:!_,className:"flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"})]})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Priority"}),d.jsxs("select",{name:"priority",value:n.priority||"medium",onChange:E,disabled:!_,className:"w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",children:[d.jsx("option",{value:"low",children:"Low"}),d.jsx("option",{value:"medium",children:"Medium"}),d.jsx("option",{value:"high",children:"High"}),d.jsx("option",{value:"urgent",children:"Urgent"})]})]})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-2",children:"Assigned users and work types"}),d.jsxs("div",{className:"bg-white rounded border p-3 max-h-80 overflow-y-auto",children:[s.map(U=>{const q=se(U.id),Q=Re(U.id);return d.jsxs("div",{className:"mb-2 p-2 rounded hover:bg-gray-50",children:[d.jsxs("label",{className:"flex items-center cursor-pointer",children:[d.jsx("input",{type:"checkbox",checked:q,onChange:()=>S(U.id),disabled:!_,className:"mr-3 w-4 h-4"}),d.jsx("div",{className:"flex-1",children:d.jsxs("p",{className:"text-sm",children:[U.name||"No name"," ",d.jsxs("span",{className:"text-xs text-gray-500",children:["(",U.cardNumber||"-",")"]})]})})]}),q&&d.jsx("div",{className:"mt-1 ml-7 flex flex-wrap gap-2 text-xs sm:text-sm",children:U6.map(ne=>d.jsx("button",{type:"button",onClick:()=>I(U.id,ne),disabled:!_,className:`px-2 py-1 rounded border ${Q.includes(ne)?"bg-green-600 text-white border-green-600":"bg-white text-gray-700 border-gray-300"} ${_?"cursor-pointer":"cursor-default"}`,children:ne},ne))})]},U.id)}),s.length===0&&d.jsx("p",{className:"text-xs text-gray-500",children:"No users found."})]})]}),d.jsxs("div",{children:[d.jsxs("label",{className:"block text-sm font-semibold text-gray-700 mb-2",children:[d.jsx(fa,{className:"inline mr-2"}),"Assigned inventory items"]}),_&&d.jsxs("div",{className:"relative mb-2",children:[d.jsx(pi,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"}),d.jsx("input",{type:"text",placeholder:"Search by item name or number...",value:y,onChange:U=>x(U.target.value),className:"w-full pl-8 pr-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),d.jsx("div",{className:"bg-white rounded border p-3 max-h-60 overflow-y-auto",children:K.length===0?d.jsx("p",{className:"text-xs text-gray-500",children:"No items available."}):K.map(U=>d.jsxs("label",{className:"flex items-center mb-2 cursor-pointer hover:bg-gray-50 p-2 rounded",children:[d.jsx("input",{type:"checkbox",checked:f.includes(U.id),onChange:()=>b(U.id),disabled:!_,className:"mr-3 w-4 h-4"}),d.jsxs("div",{className:"flex-1",children:[d.jsxs("p",{className:"text-sm",children:[U.itemName," ",d.jsxs("span",{className:"text-xs text-gray-500",children:["(",U.itemNo,")"]})]}),U.details&&d.jsx("p",{className:"text-xs text-gray-500 mt-0.5",children:U.details})]})]},U.id))}),d.jsxs("p",{className:"text-xs text-gray-500 mt-2",children:["Selected: ",f.length," item(s)"]})]})]})]})]})},B6=()=>{const[t,e]=O.useState([]),[n,r]=O.useState(!0),[s,i]=O.useState(!1),[o,l]=O.useState(""),[u,c]=O.useState(!1),[f,m]=O.useState({type:"",text:""}),[g,k]=O.useState({itemNo:"",itemName:"",details:""});O.useEffect(()=>{C()},[]);const C=async()=>{r(!0);try{const R=(await Ht(gt(pe,"inventory"))).docs.map(L=>({id:L.id,...L.data()}));R.sort((L,V)=>{const w=(L.itemName||"").toLowerCase(),y=(V.itemName||"").toLowerCase();return w.localeCompare(y)}),e(R)}catch(T){console.error("Error fetching inventory:",T)}finally{r(!1)}},N=T=>{k(R=>({...R,[T.target.name]:T.target.value}))},P=async T=>{T.preventDefault(),i(!0),m({type:"",text:""});try{await Sx(gt(pe,"inventory"),{...g,createdAt:new Date().toISOString()}),m({type:"success",text:"Item added successfully!"}),k({itemNo:"",itemName:"",details:""}),c(!1),await C()}catch(R){console.error("Error adding item:",R),m({type:"error",text:"Failed to add item."})}finally{i(!1)}},A=o.trim().toLowerCase(),_=t.filter(T=>{if(!A)return!0;const R=(T.itemName||"").toLowerCase(),L=(T.itemNo||"").toLowerCase();return R.includes(A)||L.includes(A)});return d.jsxs("div",{className:"min-h-screen bg-gray-100",children:[d.jsx(Rt,{userType:"admin"}),d.jsxs("main",{className:"container mx-auto px-4 py-6 sm:py-8",children:[d.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6",children:[d.jsx("h1",{className:"text-xl sm:text-2xl font-bold text-gray-800",children:"Inventory"}),d.jsxs("button",{onClick:()=>{c(!u),m({type:"",text:""})},className:"self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded bg-green-600 text-white text-sm font-semibold hover:bg-green-700",children:[d.jsx(E6,{}),u?"Cancel":"Add Item"]})]}),f.text&&d.jsx("div",{className:`mb-4 p-3 rounded text-sm ${f.type==="success"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`,children:f.text}),u&&d.jsxs("div",{className:"bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6",children:[d.jsx("h2",{className:"text-lg sm:text-xl font-semibold text-gray-800 mb-4",children:"Add New Item"}),d.jsxs("form",{onSubmit:P,className:"space-y-4",children:[d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Item No"}),d.jsx("input",{type:"text",name:"itemNo",value:g.itemNo,onChange:N,required:!0,className:"w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Item Name"}),d.jsx("input",{type:"text",name:"itemName",value:g.itemName,onChange:N,required:!0,className:"w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"})]}),d.jsxs("div",{children:[d.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Details"}),d.jsx("textarea",{name:"details",value:g.details,onChange:N,rows:"3",className:"w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"})]}),d.jsx("button",{type:"submit",disabled:s,className:"w-full bg-green-600 text-white py-2 px-4 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50 text-sm",children:s?"Adding...":"Add Item"})]})]}),d.jsxs("div",{className:"relative mb-4",children:[d.jsx(pi,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"}),d.jsx("input",{type:"text",placeholder:"Search by item name or number...",value:o,onChange:T=>l(T.target.value),className:"w-full pl-9 pr-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),n?d.jsxs("div",{className:"flex items-center gap-2 text-gray-600",children:[d.jsx(xs,{className:"animate-spin text-xl text-blue-600"}),d.jsx("span",{children:"Loading inventory..."})]}):_.length===0?d.jsxs("div",{className:"bg-white rounded-lg shadow-md p-6 text-center",children:[d.jsx(fa,{className:"mx-auto text-4xl text-gray-400 mb-2"}),d.jsx("p",{className:"text-gray-600 text-sm",children:o?"No items match your search.":"No items in inventory."})]}):d.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:_.map(T=>d.jsxs("div",{className:"bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition",children:[d.jsxs("div",{className:"flex items-start justify-between mb-2",children:[d.jsx("h3",{className:"font-semibold text-gray-800 text-sm sm:text-base",children:T.itemName}),d.jsx("span",{className:"text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded",children:T.itemNo})]}),T.details&&d.jsx("p",{className:"text-gray-600 text-xs sm:text-sm",children:T.details})]},T.id))})]})]})};function z6(){return d.jsx(uS,{children:d.jsxs(nS,{children:[d.jsx(wt,{path:"/",element:d.jsx(k6,{})}),d.jsx(wt,{path:"/signup",element:d.jsx(R6,{})}),d.jsx(wt,{path:"/home",element:d.jsx(A6,{})}),d.jsx(wt,{path:"/admin-home",element:d.jsxs(tr,{children:[" ",d.jsx(S6,{})," "]})}),d.jsx(wt,{path:"/create-user",element:d.jsxs(tr,{children:[" ",d.jsx(N6,{})," "]})}),d.jsx(wt,{path:"/assign-work",element:d.jsxs(tr,{children:[" ",d.jsx(D6,{})," "]})}),d.jsx(wt,{path:"/work-list",element:d.jsxs(tr,{children:[" ",d.jsx(O6,{})," "]})}),d.jsx(wt,{path:"/profile",element:d.jsx(j6,{})}),d.jsx(wt,{path:"/manage-users",element:d.jsxs(tr,{children:[" ",d.jsx(L6,{})," "]})}),d.jsx(wt,{path:"/users/:userId",element:d.jsxs(tr,{children:[" ",d.jsx(V6,{})," "]})}),d.jsx(wt,{path:"/tasks/:taskId",element:d.jsxs(tr,{children:[" ",d.jsx(F6,{})," "]})}),d.jsx(wt,{path:"/task-history",element:d.jsx(M6,{})}),d.jsx(wt,{path:"/inventory",element:d.jsxs(tr,{children:[" ",d.jsx(B6,{})," "]})})]})})}const $6="YOUR_PUBLIC_VAPID_KEY_FROM_FIREBASE";function H6(){return O.useEffect(()=>{(async()=>{if(!("serviceWorker"in navigator))return;const e=await navigator.serviceWorker.register("/firebase-messaging-sw.js");if(await Notification.requestPermission()!=="granted")return;const r=await s6(o6,{vapidKey:$6,serviceWorkerRegistration:e}),s=_n.currentUser;s&&r&&await ha(bt(pe,"users",s.uid),{fcmToken:r})})().catch(console.error)},[]),d.jsx(z6,{})}J_(document.getElementById("root")).render(d.jsx(O.StrictMode,{children:d.jsx(H6,{})}));
