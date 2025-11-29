function DT(t,e){for(var n=0;n<e.length;n++){const r=e[n];if(typeof r!="string"&&!Array.isArray(r)){for(const s in r)if(s!=="default"&&!(s in t)){const i=Object.getOwnPropertyDescriptor(r,s);i&&Object.defineProperty(t,s,i.get?i:{enumerable:!0,get:()=>r[s]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function OT(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var jv={exports:{}},pu={},Mv={exports:{}},ee={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qo=Symbol.for("react.element"),VT=Symbol.for("react.portal"),LT=Symbol.for("react.fragment"),jT=Symbol.for("react.strict_mode"),MT=Symbol.for("react.profiler"),UT=Symbol.for("react.provider"),FT=Symbol.for("react.context"),BT=Symbol.for("react.forward_ref"),zT=Symbol.for("react.suspense"),$T=Symbol.for("react.memo"),WT=Symbol.for("react.lazy"),Bm=Symbol.iterator;function HT(t){return t===null||typeof t!="object"?null:(t=Bm&&t[Bm]||t["@@iterator"],typeof t=="function"?t:null)}var Uv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Fv=Object.assign,Bv={};function fi(t,e,n){this.props=t,this.context=e,this.refs=Bv,this.updater=n||Uv}fi.prototype.isReactComponent={};fi.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};fi.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function zv(){}zv.prototype=fi.prototype;function Bh(t,e,n){this.props=t,this.context=e,this.refs=Bv,this.updater=n||Uv}var zh=Bh.prototype=new zv;zh.constructor=Bh;Fv(zh,fi.prototype);zh.isPureReactComponent=!0;var zm=Array.isArray,$v=Object.prototype.hasOwnProperty,$h={current:null},Wv={key:!0,ref:!0,__self:!0,__source:!0};function Hv(t,e,n){var r,s={},i=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(i=""+e.key),e)$v.call(e,r)&&!Wv.hasOwnProperty(r)&&(s[r]=e[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var u=Array(l),c=0;c<l;c++)u[c]=arguments[c+2];s.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:qo,type:t,key:i,ref:o,props:s,_owner:$h.current}}function qT(t,e){return{$$typeof:qo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Wh(t){return typeof t=="object"&&t!==null&&t.$$typeof===qo}function KT(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var $m=/\/+/g;function Rc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?KT(""+t.key):e.toString(36)}function Za(t,e,n,r,s){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case qo:case VT:o=!0}}if(o)return o=t,s=s(o),t=r===""?"."+Rc(o,0):r,zm(s)?(n="",t!=null&&(n=t.replace($m,"$&/")+"/"),Za(s,e,n,"",function(c){return c})):s!=null&&(Wh(s)&&(s=qT(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace($m,"$&/")+"/")+t)),e.push(s)),1;if(o=0,r=r===""?".":r+":",zm(t))for(var l=0;l<t.length;l++){i=t[l];var u=r+Rc(i,l);o+=Za(i,e,n,u,s)}else if(u=HT(t),typeof u=="function")for(t=u.call(t),l=0;!(i=t.next()).done;)i=i.value,u=r+Rc(i,l++),o+=Za(i,e,n,u,s);else if(i==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Pa(t,e,n){if(t==null)return t;var r=[],s=0;return Za(t,r,"","",function(i){return e.call(n,i,s++)}),r}function GT(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var ft={current:null},el={transition:null},QT={ReactCurrentDispatcher:ft,ReactCurrentBatchConfig:el,ReactCurrentOwner:$h};function qv(){throw Error("act(...) is not supported in production builds of React.")}ee.Children={map:Pa,forEach:function(t,e,n){Pa(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Pa(t,function(){e++}),e},toArray:function(t){return Pa(t,function(e){return e})||[]},only:function(t){if(!Wh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ee.Component=fi;ee.Fragment=LT;ee.Profiler=MT;ee.PureComponent=Bh;ee.StrictMode=jT;ee.Suspense=zT;ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=QT;ee.act=qv;ee.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=Fv({},t.props),s=t.key,i=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(i=e.ref,o=$h.current),e.key!==void 0&&(s=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)$v.call(e,u)&&!Wv.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var c=0;c<u;c++)l[c]=arguments[c+2];r.children=l}return{$$typeof:qo,type:t.type,key:s,ref:i,props:r,_owner:o}};ee.createContext=function(t){return t={$$typeof:FT,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:UT,_context:t},t.Consumer=t};ee.createElement=Hv;ee.createFactory=function(t){var e=Hv.bind(null,t);return e.type=t,e};ee.createRef=function(){return{current:null}};ee.forwardRef=function(t){return{$$typeof:BT,render:t}};ee.isValidElement=Wh;ee.lazy=function(t){return{$$typeof:WT,_payload:{_status:-1,_result:t},_init:GT}};ee.memo=function(t,e){return{$$typeof:$T,type:t,compare:e===void 0?null:e}};ee.startTransition=function(t){var e=el.transition;el.transition={};try{t()}finally{el.transition=e}};ee.unstable_act=qv;ee.useCallback=function(t,e){return ft.current.useCallback(t,e)};ee.useContext=function(t){return ft.current.useContext(t)};ee.useDebugValue=function(){};ee.useDeferredValue=function(t){return ft.current.useDeferredValue(t)};ee.useEffect=function(t,e){return ft.current.useEffect(t,e)};ee.useId=function(){return ft.current.useId()};ee.useImperativeHandle=function(t,e,n){return ft.current.useImperativeHandle(t,e,n)};ee.useInsertionEffect=function(t,e){return ft.current.useInsertionEffect(t,e)};ee.useLayoutEffect=function(t,e){return ft.current.useLayoutEffect(t,e)};ee.useMemo=function(t,e){return ft.current.useMemo(t,e)};ee.useReducer=function(t,e,n){return ft.current.useReducer(t,e,n)};ee.useRef=function(t){return ft.current.useRef(t)};ee.useState=function(t){return ft.current.useState(t)};ee.useSyncExternalStore=function(t,e,n){return ft.current.useSyncExternalStore(t,e,n)};ee.useTransition=function(){return ft.current.useTransition()};ee.version="18.3.1";Mv.exports=ee;var V=Mv.exports;const hr=OT(V),YT=DT({__proto__:null,default:hr},[V]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var XT=V,JT=Symbol.for("react.element"),ZT=Symbol.for("react.fragment"),ex=Object.prototype.hasOwnProperty,tx=XT.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,nx={key:!0,ref:!0,__self:!0,__source:!0};function Kv(t,e,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)ex.call(e,r)&&!nx.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:JT,type:t,key:i,ref:o,props:s,_owner:tx.current}}pu.Fragment=ZT;pu.jsx=Kv;pu.jsxs=Kv;jv.exports=pu;var h=jv.exports,Gv={exports:{}},Dt={},Qv={exports:{}},Yv={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(B,q){var K=B.length;B.push(q);e:for(;0<K;){var re=K-1>>>1,ie=B[re];if(0<s(ie,q))B[re]=q,B[K]=ie,K=re;else break e}}function n(B){return B.length===0?null:B[0]}function r(B){if(B.length===0)return null;var q=B[0],K=B.pop();if(K!==q){B[0]=K;e:for(var re=0,ie=B.length,Se=ie>>>1;re<Se;){var $t=2*(re+1)-1,_n=B[$t],wn=$t+1,En=B[wn];if(0>s(_n,K))wn<ie&&0>s(En,_n)?(B[re]=En,B[wn]=K,re=wn):(B[re]=_n,B[$t]=K,re=$t);else if(wn<ie&&0>s(En,K))B[re]=En,B[wn]=K,re=wn;else break e}}return q}function s(B,q){var K=B.sortIndex-q.sortIndex;return K!==0?K:B.id-q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],c=[],f=1,m=null,g=3,A=!1,k=!1,b=!1,N=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,T=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function w(B){for(var q=n(c);q!==null;){if(q.callback===null)r(c);else if(q.startTime<=B)r(c),q.sortIndex=q.expirationTime,e(u,q);else break;q=n(c)}}function C(B){if(b=!1,w(B),!k)if(n(u)!==null)k=!0,It(j);else{var q=n(c);q!==null&&Be(C,q.startTime-B)}}function j(B,q){k=!1,b&&(b=!1,x(y),y=-1),A=!0;var K=g;try{for(w(q),m=n(u);m!==null&&(!(m.expirationTime>q)||B&&!R());){var re=m.callback;if(typeof re=="function"){m.callback=null,g=m.priorityLevel;var ie=re(m.expirationTime<=q);q=t.unstable_now(),typeof ie=="function"?m.callback=ie:m===n(u)&&r(u),w(q)}else r(u);m=n(u)}if(m!==null)var Se=!0;else{var $t=n(c);$t!==null&&Be(C,$t.startTime-q),Se=!1}return Se}finally{m=null,g=K,A=!1}}var D=!1,_=null,y=-1,E=5,I=-1;function R(){return!(t.unstable_now()-I<E)}function P(){if(_!==null){var B=t.unstable_now();I=B;var q=!0;try{q=_(!0,B)}finally{q?S():(D=!1,_=null)}}else D=!1}var S;if(typeof T=="function")S=function(){T(P)};else if(typeof MessageChannel<"u"){var Q=new MessageChannel,Ie=Q.port2;Q.port1.onmessage=P,S=function(){Ie.postMessage(null)}}else S=function(){N(P,0)};function It(B){_=B,D||(D=!0,S())}function Be(B,q){y=N(function(){B(t.unstable_now())},q)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(B){B.callback=null},t.unstable_continueExecution=function(){k||A||(k=!0,It(j))},t.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<B?Math.floor(1e3/B):5},t.unstable_getCurrentPriorityLevel=function(){return g},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(B){switch(g){case 1:case 2:case 3:var q=3;break;default:q=g}var K=g;g=q;try{return B()}finally{g=K}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(B,q){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var K=g;g=B;try{return q()}finally{g=K}},t.unstable_scheduleCallback=function(B,q,K){var re=t.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?re+K:re):K=re,B){case 1:var ie=-1;break;case 2:ie=250;break;case 5:ie=1073741823;break;case 4:ie=1e4;break;default:ie=5e3}return ie=K+ie,B={id:f++,callback:q,priorityLevel:B,startTime:K,expirationTime:ie,sortIndex:-1},K>re?(B.sortIndex=K,e(c,B),n(u)===null&&B===n(c)&&(b?(x(y),y=-1):b=!0,Be(C,K-re))):(B.sortIndex=ie,e(u,B),k||A||(k=!0,It(j))),B},t.unstable_shouldYield=R,t.unstable_wrapCallback=function(B){var q=g;return function(){var K=g;g=q;try{return B.apply(this,arguments)}finally{g=K}}}})(Yv);Qv.exports=Yv;var rx=Qv.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sx=V,Nt=rx;function F(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Xv=new Set,go={};function ds(t,e){Js(t,e),Js(t+"Capture",e)}function Js(t,e){for(go[t]=e,t=0;t<e.length;t++)Xv.add(e[t])}var Ln=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),wd=Object.prototype.hasOwnProperty,ix=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Wm={},Hm={};function ox(t){return wd.call(Hm,t)?!0:wd.call(Wm,t)?!1:ix.test(t)?Hm[t]=!0:(Wm[t]=!0,!1)}function ax(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function lx(t,e,n,r){if(e===null||typeof e>"u"||ax(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function pt(t,e,n,r,s,i,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=i,this.removeEmptyString=o}var Ge={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Ge[t]=new pt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Ge[e]=new pt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Ge[t]=new pt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Ge[t]=new pt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Ge[t]=new pt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Ge[t]=new pt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Ge[t]=new pt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Ge[t]=new pt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Ge[t]=new pt(t,5,!1,t.toLowerCase(),null,!1,!1)});var Hh=/[\-:]([a-z])/g;function qh(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Hh,qh);Ge[e]=new pt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Hh,qh);Ge[e]=new pt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Hh,qh);Ge[e]=new pt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Ge[t]=new pt(t,1,!1,t.toLowerCase(),null,!1,!1)});Ge.xlinkHref=new pt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Ge[t]=new pt(t,1,!1,t.toLowerCase(),null,!0,!0)});function Kh(t,e,n,r){var s=Ge.hasOwnProperty(e)?Ge[e]:null;(s!==null?s.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(lx(e,n,s,r)&&(n=null),r||s===null?ox(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):s.mustUseProperty?t[s.propertyName]=n===null?s.type===3?!1:"":n:(e=s.attributeName,r=s.attributeNamespace,n===null?t.removeAttribute(e):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Hn=sx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ba=Symbol.for("react.element"),Rs=Symbol.for("react.portal"),Ps=Symbol.for("react.fragment"),Gh=Symbol.for("react.strict_mode"),Ed=Symbol.for("react.profiler"),Jv=Symbol.for("react.provider"),Zv=Symbol.for("react.context"),Qh=Symbol.for("react.forward_ref"),Td=Symbol.for("react.suspense"),xd=Symbol.for("react.suspense_list"),Yh=Symbol.for("react.memo"),er=Symbol.for("react.lazy"),e_=Symbol.for("react.offscreen"),qm=Symbol.iterator;function Li(t){return t===null||typeof t!="object"?null:(t=qm&&t[qm]||t["@@iterator"],typeof t=="function"?t:null)}var Ee=Object.assign,Pc;function Hi(t){if(Pc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Pc=e&&e[1]||""}return`
`+Pc+t}var bc=!1;function Nc(t,e){if(!t||bc)return"";bc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){r=c}t.call(e.prototype)}else{try{throw Error()}catch(c){r=c}t()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var s=c.stack.split(`
`),i=r.stack.split(`
`),o=s.length-1,l=i.length-1;1<=o&&0<=l&&s[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(s[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||s[o]!==i[l]){var u=`
`+s[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{bc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Hi(t):""}function ux(t){switch(t.tag){case 5:return Hi(t.type);case 16:return Hi("Lazy");case 13:return Hi("Suspense");case 19:return Hi("SuspenseList");case 0:case 2:case 15:return t=Nc(t.type,!1),t;case 11:return t=Nc(t.type.render,!1),t;case 1:return t=Nc(t.type,!0),t;default:return""}}function Id(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Ps:return"Fragment";case Rs:return"Portal";case Ed:return"Profiler";case Gh:return"StrictMode";case Td:return"Suspense";case xd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Zv:return(t.displayName||"Context")+".Consumer";case Jv:return(t._context.displayName||"Context")+".Provider";case Qh:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Yh:return e=t.displayName||null,e!==null?e:Id(t.type)||"Memo";case er:e=t._payload,t=t._init;try{return Id(t(e))}catch{}}return null}function cx(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Id(e);case 8:return e===Gh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Ir(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function t_(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function dx(t){var e=t_(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Na(t){t._valueTracker||(t._valueTracker=dx(t))}function n_(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=t_(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function wl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Sd(t,e){var n=e.checked;return Ee({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Km(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Ir(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function r_(t,e){e=e.checked,e!=null&&Kh(t,"checked",e,!1)}function Ad(t,e){r_(t,e);var n=Ir(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?kd(t,e.type,n):e.hasOwnProperty("defaultValue")&&kd(t,e.type,Ir(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Gm(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function kd(t,e,n){(e!=="number"||wl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var qi=Array.isArray;function zs(t,e,n,r){if(t=t.options,e){e={};for(var s=0;s<n.length;s++)e["$"+n[s]]=!0;for(n=0;n<t.length;n++)s=e.hasOwnProperty("$"+t[n].value),t[n].selected!==s&&(t[n].selected=s),s&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Ir(n),e=null,s=0;s<t.length;s++){if(t[s].value===n){t[s].selected=!0,r&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function Cd(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(F(91));return Ee({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Qm(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(F(92));if(qi(n)){if(1<n.length)throw Error(F(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Ir(n)}}function s_(t,e){var n=Ir(e.value),r=Ir(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Ym(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function i_(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Rd(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?i_(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Da,o_=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,s){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,s)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Da=Da||document.createElement("div"),Da.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Da.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function yo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var to={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},hx=["Webkit","ms","Moz","O"];Object.keys(to).forEach(function(t){hx.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),to[e]=to[t]})});function a_(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||to.hasOwnProperty(t)&&to[t]?(""+e).trim():e+"px"}function l_(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=a_(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,s):t[n]=s}}var fx=Ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Pd(t,e){if(e){if(fx[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(F(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(F(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(F(61))}if(e.style!=null&&typeof e.style!="object")throw Error(F(62))}}function bd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Nd=null;function Xh(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Dd=null,$s=null,Ws=null;function Xm(t){if(t=Qo(t)){if(typeof Dd!="function")throw Error(F(280));var e=t.stateNode;e&&(e=_u(e),Dd(t.stateNode,t.type,e))}}function u_(t){$s?Ws?Ws.push(t):Ws=[t]:$s=t}function c_(){if($s){var t=$s,e=Ws;if(Ws=$s=null,Xm(t),e)for(t=0;t<e.length;t++)Xm(e[t])}}function d_(t,e){return t(e)}function h_(){}var Dc=!1;function f_(t,e,n){if(Dc)return t(e,n);Dc=!0;try{return d_(t,e,n)}finally{Dc=!1,($s!==null||Ws!==null)&&(h_(),c_())}}function vo(t,e){var n=t.stateNode;if(n===null)return null;var r=_u(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(F(231,e,typeof n));return n}var Od=!1;if(Ln)try{var ji={};Object.defineProperty(ji,"passive",{get:function(){Od=!0}}),window.addEventListener("test",ji,ji),window.removeEventListener("test",ji,ji)}catch{Od=!1}function px(t,e,n,r,s,i,o,l,u){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(f){this.onError(f)}}var no=!1,El=null,Tl=!1,Vd=null,mx={onError:function(t){no=!0,El=t}};function gx(t,e,n,r,s,i,o,l,u){no=!1,El=null,px.apply(mx,arguments)}function yx(t,e,n,r,s,i,o,l,u){if(gx.apply(this,arguments),no){if(no){var c=El;no=!1,El=null}else throw Error(F(198));Tl||(Tl=!0,Vd=c)}}function hs(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function p_(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Jm(t){if(hs(t)!==t)throw Error(F(188))}function vx(t){var e=t.alternate;if(!e){if(e=hs(t),e===null)throw Error(F(188));return e!==t?null:t}for(var n=t,r=e;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return Jm(s),t;if(i===r)return Jm(s),e;i=i.sibling}throw Error(F(188))}if(n.return!==r.return)n=s,r=i;else{for(var o=!1,l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o)throw Error(F(189))}}if(n.alternate!==r)throw Error(F(190))}if(n.tag!==3)throw Error(F(188));return n.stateNode.current===n?t:e}function m_(t){return t=vx(t),t!==null?g_(t):null}function g_(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=g_(t);if(e!==null)return e;t=t.sibling}return null}var y_=Nt.unstable_scheduleCallback,Zm=Nt.unstable_cancelCallback,_x=Nt.unstable_shouldYield,wx=Nt.unstable_requestPaint,Re=Nt.unstable_now,Ex=Nt.unstable_getCurrentPriorityLevel,Jh=Nt.unstable_ImmediatePriority,v_=Nt.unstable_UserBlockingPriority,xl=Nt.unstable_NormalPriority,Tx=Nt.unstable_LowPriority,__=Nt.unstable_IdlePriority,mu=null,ln=null;function xx(t){if(ln&&typeof ln.onCommitFiberRoot=="function")try{ln.onCommitFiberRoot(mu,t,void 0,(t.current.flags&128)===128)}catch{}}var Yt=Math.clz32?Math.clz32:Ax,Ix=Math.log,Sx=Math.LN2;function Ax(t){return t>>>=0,t===0?32:31-(Ix(t)/Sx|0)|0}var Oa=64,Va=4194304;function Ki(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Il(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,s=t.suspendedLanes,i=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~s;l!==0?r=Ki(l):(i&=o,i!==0&&(r=Ki(i)))}else o=n&~s,o!==0?r=Ki(o):i!==0&&(r=Ki(i));if(r===0)return 0;if(e!==0&&e!==r&&!(e&s)&&(s=r&-r,i=e&-e,s>=i||s===16&&(i&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Yt(e),s=1<<n,r|=t[n],e&=~s;return r}function kx(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Cx(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,s=t.expirationTimes,i=t.pendingLanes;0<i;){var o=31-Yt(i),l=1<<o,u=s[o];u===-1?(!(l&n)||l&r)&&(s[o]=kx(l,e)):u<=e&&(t.expiredLanes|=l),i&=~l}}function Ld(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function w_(){var t=Oa;return Oa<<=1,!(Oa&4194240)&&(Oa=64),t}function Oc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ko(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Yt(e),t[e]=n}function Rx(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var s=31-Yt(n),i=1<<s;e[s]=0,r[s]=-1,t[s]=-1,n&=~i}}function Zh(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Yt(n),s=1<<r;s&e|t[r]&e&&(t[r]|=e),n&=~s}}var ue=0;function E_(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var T_,ef,x_,I_,S_,jd=!1,La=[],fr=null,pr=null,mr=null,_o=new Map,wo=new Map,nr=[],Px="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function eg(t,e){switch(t){case"focusin":case"focusout":fr=null;break;case"dragenter":case"dragleave":pr=null;break;case"mouseover":case"mouseout":mr=null;break;case"pointerover":case"pointerout":_o.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":wo.delete(e.pointerId)}}function Mi(t,e,n,r,s,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},e!==null&&(e=Qo(e),e!==null&&ef(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function bx(t,e,n,r,s){switch(e){case"focusin":return fr=Mi(fr,t,e,n,r,s),!0;case"dragenter":return pr=Mi(pr,t,e,n,r,s),!0;case"mouseover":return mr=Mi(mr,t,e,n,r,s),!0;case"pointerover":var i=s.pointerId;return _o.set(i,Mi(_o.get(i)||null,t,e,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,wo.set(i,Mi(wo.get(i)||null,t,e,n,r,s)),!0}return!1}function A_(t){var e=Wr(t.target);if(e!==null){var n=hs(e);if(n!==null){if(e=n.tag,e===13){if(e=p_(n),e!==null){t.blockedOn=e,S_(t.priority,function(){x_(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function tl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Md(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Nd=r,n.target.dispatchEvent(r),Nd=null}else return e=Qo(n),e!==null&&ef(e),t.blockedOn=n,!1;e.shift()}return!0}function tg(t,e,n){tl(t)&&n.delete(e)}function Nx(){jd=!1,fr!==null&&tl(fr)&&(fr=null),pr!==null&&tl(pr)&&(pr=null),mr!==null&&tl(mr)&&(mr=null),_o.forEach(tg),wo.forEach(tg)}function Ui(t,e){t.blockedOn===e&&(t.blockedOn=null,jd||(jd=!0,Nt.unstable_scheduleCallback(Nt.unstable_NormalPriority,Nx)))}function Eo(t){function e(s){return Ui(s,t)}if(0<La.length){Ui(La[0],t);for(var n=1;n<La.length;n++){var r=La[n];r.blockedOn===t&&(r.blockedOn=null)}}for(fr!==null&&Ui(fr,t),pr!==null&&Ui(pr,t),mr!==null&&Ui(mr,t),_o.forEach(e),wo.forEach(e),n=0;n<nr.length;n++)r=nr[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<nr.length&&(n=nr[0],n.blockedOn===null);)A_(n),n.blockedOn===null&&nr.shift()}var Hs=Hn.ReactCurrentBatchConfig,Sl=!0;function Dx(t,e,n,r){var s=ue,i=Hs.transition;Hs.transition=null;try{ue=1,tf(t,e,n,r)}finally{ue=s,Hs.transition=i}}function Ox(t,e,n,r){var s=ue,i=Hs.transition;Hs.transition=null;try{ue=4,tf(t,e,n,r)}finally{ue=s,Hs.transition=i}}function tf(t,e,n,r){if(Sl){var s=Md(t,e,n,r);if(s===null)Wc(t,e,r,Al,n),eg(t,r);else if(bx(s,t,e,n,r))r.stopPropagation();else if(eg(t,r),e&4&&-1<Px.indexOf(t)){for(;s!==null;){var i=Qo(s);if(i!==null&&T_(i),i=Md(t,e,n,r),i===null&&Wc(t,e,r,Al,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else Wc(t,e,r,null,n)}}var Al=null;function Md(t,e,n,r){if(Al=null,t=Xh(r),t=Wr(t),t!==null)if(e=hs(t),e===null)t=null;else if(n=e.tag,n===13){if(t=p_(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Al=t,null}function k_(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Ex()){case Jh:return 1;case v_:return 4;case xl:case Tx:return 16;case __:return 536870912;default:return 16}default:return 16}}var lr=null,nf=null,nl=null;function C_(){if(nl)return nl;var t,e=nf,n=e.length,r,s="value"in lr?lr.value:lr.textContent,i=s.length;for(t=0;t<n&&e[t]===s[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===s[i-r];r++);return nl=s.slice(t,1<r?1-r:void 0)}function rl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ja(){return!0}function ng(){return!1}function Ot(t){function e(n,r,s,i,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?ja:ng,this.isPropagationStopped=ng,this}return Ee(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ja)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ja)},persist:function(){},isPersistent:ja}),e}var pi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},rf=Ot(pi),Go=Ee({},pi,{view:0,detail:0}),Vx=Ot(Go),Vc,Lc,Fi,gu=Ee({},Go,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:sf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Fi&&(Fi&&t.type==="mousemove"?(Vc=t.screenX-Fi.screenX,Lc=t.screenY-Fi.screenY):Lc=Vc=0,Fi=t),Vc)},movementY:function(t){return"movementY"in t?t.movementY:Lc}}),rg=Ot(gu),Lx=Ee({},gu,{dataTransfer:0}),jx=Ot(Lx),Mx=Ee({},Go,{relatedTarget:0}),jc=Ot(Mx),Ux=Ee({},pi,{animationName:0,elapsedTime:0,pseudoElement:0}),Fx=Ot(Ux),Bx=Ee({},pi,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),zx=Ot(Bx),$x=Ee({},pi,{data:0}),sg=Ot($x),Wx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Hx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},qx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Kx(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=qx[t])?!!e[t]:!1}function sf(){return Kx}var Gx=Ee({},Go,{key:function(t){if(t.key){var e=Wx[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=rl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Hx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:sf,charCode:function(t){return t.type==="keypress"?rl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?rl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Qx=Ot(Gx),Yx=Ee({},gu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ig=Ot(Yx),Xx=Ee({},Go,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:sf}),Jx=Ot(Xx),Zx=Ee({},pi,{propertyName:0,elapsedTime:0,pseudoElement:0}),eI=Ot(Zx),tI=Ee({},gu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),nI=Ot(tI),rI=[9,13,27,32],of=Ln&&"CompositionEvent"in window,ro=null;Ln&&"documentMode"in document&&(ro=document.documentMode);var sI=Ln&&"TextEvent"in window&&!ro,R_=Ln&&(!of||ro&&8<ro&&11>=ro),og=" ",ag=!1;function P_(t,e){switch(t){case"keyup":return rI.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function b_(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var bs=!1;function iI(t,e){switch(t){case"compositionend":return b_(e);case"keypress":return e.which!==32?null:(ag=!0,og);case"textInput":return t=e.data,t===og&&ag?null:t;default:return null}}function oI(t,e){if(bs)return t==="compositionend"||!of&&P_(t,e)?(t=C_(),nl=nf=lr=null,bs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return R_&&e.locale!=="ko"?null:e.data;default:return null}}var aI={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function lg(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!aI[t.type]:e==="textarea"}function N_(t,e,n,r){u_(r),e=kl(e,"onChange"),0<e.length&&(n=new rf("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var so=null,To=null;function lI(t){$_(t,0)}function yu(t){var e=Os(t);if(n_(e))return t}function uI(t,e){if(t==="change")return e}var D_=!1;if(Ln){var Mc;if(Ln){var Uc="oninput"in document;if(!Uc){var ug=document.createElement("div");ug.setAttribute("oninput","return;"),Uc=typeof ug.oninput=="function"}Mc=Uc}else Mc=!1;D_=Mc&&(!document.documentMode||9<document.documentMode)}function cg(){so&&(so.detachEvent("onpropertychange",O_),To=so=null)}function O_(t){if(t.propertyName==="value"&&yu(To)){var e=[];N_(e,To,t,Xh(t)),f_(lI,e)}}function cI(t,e,n){t==="focusin"?(cg(),so=e,To=n,so.attachEvent("onpropertychange",O_)):t==="focusout"&&cg()}function dI(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return yu(To)}function hI(t,e){if(t==="click")return yu(e)}function fI(t,e){if(t==="input"||t==="change")return yu(e)}function pI(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Jt=typeof Object.is=="function"?Object.is:pI;function xo(t,e){if(Jt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!wd.call(e,s)||!Jt(t[s],e[s]))return!1}return!0}function dg(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function hg(t,e){var n=dg(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=dg(n)}}function V_(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?V_(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function L_(){for(var t=window,e=wl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=wl(t.document)}return e}function af(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function mI(t){var e=L_(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&V_(n.ownerDocument.documentElement,n)){if(r!==null&&af(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!t.extend&&i>r&&(s=r,r=i,i=s),s=hg(n,i);var o=hg(n,r);s&&o&&(t.rangeCount!==1||t.anchorNode!==s.node||t.anchorOffset!==s.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),t.removeAllRanges(),i>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var gI=Ln&&"documentMode"in document&&11>=document.documentMode,Ns=null,Ud=null,io=null,Fd=!1;function fg(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Fd||Ns==null||Ns!==wl(r)||(r=Ns,"selectionStart"in r&&af(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),io&&xo(io,r)||(io=r,r=kl(Ud,"onSelect"),0<r.length&&(e=new rf("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=Ns)))}function Ma(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Ds={animationend:Ma("Animation","AnimationEnd"),animationiteration:Ma("Animation","AnimationIteration"),animationstart:Ma("Animation","AnimationStart"),transitionend:Ma("Transition","TransitionEnd")},Fc={},j_={};Ln&&(j_=document.createElement("div").style,"AnimationEvent"in window||(delete Ds.animationend.animation,delete Ds.animationiteration.animation,delete Ds.animationstart.animation),"TransitionEvent"in window||delete Ds.transitionend.transition);function vu(t){if(Fc[t])return Fc[t];if(!Ds[t])return t;var e=Ds[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in j_)return Fc[t]=e[n];return t}var M_=vu("animationend"),U_=vu("animationiteration"),F_=vu("animationstart"),B_=vu("transitionend"),z_=new Map,pg="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Pr(t,e){z_.set(t,e),ds(e,[t])}for(var Bc=0;Bc<pg.length;Bc++){var zc=pg[Bc],yI=zc.toLowerCase(),vI=zc[0].toUpperCase()+zc.slice(1);Pr(yI,"on"+vI)}Pr(M_,"onAnimationEnd");Pr(U_,"onAnimationIteration");Pr(F_,"onAnimationStart");Pr("dblclick","onDoubleClick");Pr("focusin","onFocus");Pr("focusout","onBlur");Pr(B_,"onTransitionEnd");Js("onMouseEnter",["mouseout","mouseover"]);Js("onMouseLeave",["mouseout","mouseover"]);Js("onPointerEnter",["pointerout","pointerover"]);Js("onPointerLeave",["pointerout","pointerover"]);ds("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ds("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ds("onBeforeInput",["compositionend","keypress","textInput","paste"]);ds("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ds("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ds("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Gi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),_I=new Set("cancel close invalid load scroll toggle".split(" ").concat(Gi));function mg(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,yx(r,e,void 0,t),t.currentTarget=null}function $_(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],s=r.event;r=r.listeners;e:{var i=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,c=l.currentTarget;if(l=l.listener,u!==i&&s.isPropagationStopped())break e;mg(s,l,c),i=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,c=l.currentTarget,l=l.listener,u!==i&&s.isPropagationStopped())break e;mg(s,l,c),i=u}}}if(Tl)throw t=Vd,Tl=!1,Vd=null,t}function pe(t,e){var n=e[Hd];n===void 0&&(n=e[Hd]=new Set);var r=t+"__bubble";n.has(r)||(W_(e,t,2,!1),n.add(r))}function $c(t,e,n){var r=0;e&&(r|=4),W_(n,t,r,e)}var Ua="_reactListening"+Math.random().toString(36).slice(2);function Io(t){if(!t[Ua]){t[Ua]=!0,Xv.forEach(function(n){n!=="selectionchange"&&(_I.has(n)||$c(n,!1,t),$c(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ua]||(e[Ua]=!0,$c("selectionchange",!1,e))}}function W_(t,e,n,r){switch(k_(e)){case 1:var s=Dx;break;case 4:s=Ox;break;default:s=tf}n=s.bind(null,e,n,t),s=void 0,!Od||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),r?s!==void 0?t.addEventListener(e,n,{capture:!0,passive:s}):t.addEventListener(e,n,!0):s!==void 0?t.addEventListener(e,n,{passive:s}):t.addEventListener(e,n,!1)}function Wc(t,e,n,r,s){var i=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===s||u.nodeType===8&&u.parentNode===s))return;o=o.return}for(;l!==null;){if(o=Wr(l),o===null)return;if(u=o.tag,u===5||u===6){r=i=o;continue e}l=l.parentNode}}r=r.return}f_(function(){var c=i,f=Xh(n),m=[];e:{var g=z_.get(t);if(g!==void 0){var A=rf,k=t;switch(t){case"keypress":if(rl(n)===0)break e;case"keydown":case"keyup":A=Qx;break;case"focusin":k="focus",A=jc;break;case"focusout":k="blur",A=jc;break;case"beforeblur":case"afterblur":A=jc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":A=rg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":A=jx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":A=Jx;break;case M_:case U_:case F_:A=Fx;break;case B_:A=eI;break;case"scroll":A=Vx;break;case"wheel":A=nI;break;case"copy":case"cut":case"paste":A=zx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":A=ig}var b=(e&4)!==0,N=!b&&t==="scroll",x=b?g!==null?g+"Capture":null:g;b=[];for(var T=c,w;T!==null;){w=T;var C=w.stateNode;if(w.tag===5&&C!==null&&(w=C,x!==null&&(C=vo(T,x),C!=null&&b.push(So(T,C,w)))),N)break;T=T.return}0<b.length&&(g=new A(g,k,null,n,f),m.push({event:g,listeners:b}))}}if(!(e&7)){e:{if(g=t==="mouseover"||t==="pointerover",A=t==="mouseout"||t==="pointerout",g&&n!==Nd&&(k=n.relatedTarget||n.fromElement)&&(Wr(k)||k[jn]))break e;if((A||g)&&(g=f.window===f?f:(g=f.ownerDocument)?g.defaultView||g.parentWindow:window,A?(k=n.relatedTarget||n.toElement,A=c,k=k?Wr(k):null,k!==null&&(N=hs(k),k!==N||k.tag!==5&&k.tag!==6)&&(k=null)):(A=null,k=c),A!==k)){if(b=rg,C="onMouseLeave",x="onMouseEnter",T="mouse",(t==="pointerout"||t==="pointerover")&&(b=ig,C="onPointerLeave",x="onPointerEnter",T="pointer"),N=A==null?g:Os(A),w=k==null?g:Os(k),g=new b(C,T+"leave",A,n,f),g.target=N,g.relatedTarget=w,C=null,Wr(f)===c&&(b=new b(x,T+"enter",k,n,f),b.target=w,b.relatedTarget=N,C=b),N=C,A&&k)t:{for(b=A,x=k,T=0,w=b;w;w=Ss(w))T++;for(w=0,C=x;C;C=Ss(C))w++;for(;0<T-w;)b=Ss(b),T--;for(;0<w-T;)x=Ss(x),w--;for(;T--;){if(b===x||x!==null&&b===x.alternate)break t;b=Ss(b),x=Ss(x)}b=null}else b=null;A!==null&&gg(m,g,A,b,!1),k!==null&&N!==null&&gg(m,N,k,b,!0)}}e:{if(g=c?Os(c):window,A=g.nodeName&&g.nodeName.toLowerCase(),A==="select"||A==="input"&&g.type==="file")var j=uI;else if(lg(g))if(D_)j=fI;else{j=dI;var D=cI}else(A=g.nodeName)&&A.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(j=hI);if(j&&(j=j(t,c))){N_(m,j,n,f);break e}D&&D(t,g,c),t==="focusout"&&(D=g._wrapperState)&&D.controlled&&g.type==="number"&&kd(g,"number",g.value)}switch(D=c?Os(c):window,t){case"focusin":(lg(D)||D.contentEditable==="true")&&(Ns=D,Ud=c,io=null);break;case"focusout":io=Ud=Ns=null;break;case"mousedown":Fd=!0;break;case"contextmenu":case"mouseup":case"dragend":Fd=!1,fg(m,n,f);break;case"selectionchange":if(gI)break;case"keydown":case"keyup":fg(m,n,f)}var _;if(of)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else bs?P_(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(R_&&n.locale!=="ko"&&(bs||y!=="onCompositionStart"?y==="onCompositionEnd"&&bs&&(_=C_()):(lr=f,nf="value"in lr?lr.value:lr.textContent,bs=!0)),D=kl(c,y),0<D.length&&(y=new sg(y,t,null,n,f),m.push({event:y,listeners:D}),_?y.data=_:(_=b_(n),_!==null&&(y.data=_)))),(_=sI?iI(t,n):oI(t,n))&&(c=kl(c,"onBeforeInput"),0<c.length&&(f=new sg("onBeforeInput","beforeinput",null,n,f),m.push({event:f,listeners:c}),f.data=_))}$_(m,e)})}function So(t,e,n){return{instance:t,listener:e,currentTarget:n}}function kl(t,e){for(var n=e+"Capture",r=[];t!==null;){var s=t,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=vo(t,n),i!=null&&r.unshift(So(t,i,s)),i=vo(t,e),i!=null&&r.push(So(t,i,s))),t=t.return}return r}function Ss(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function gg(t,e,n,r,s){for(var i=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,c=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&c!==null&&(l=c,s?(u=vo(n,i),u!=null&&o.unshift(So(n,u,l))):s||(u=vo(n,i),u!=null&&o.push(So(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var wI=/\r\n?/g,EI=/\u0000|\uFFFD/g;function yg(t){return(typeof t=="string"?t:""+t).replace(wI,`
`).replace(EI,"")}function Fa(t,e,n){if(e=yg(e),yg(t)!==e&&n)throw Error(F(425))}function Cl(){}var Bd=null,zd=null;function $d(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Wd=typeof setTimeout=="function"?setTimeout:void 0,TI=typeof clearTimeout=="function"?clearTimeout:void 0,vg=typeof Promise=="function"?Promise:void 0,xI=typeof queueMicrotask=="function"?queueMicrotask:typeof vg<"u"?function(t){return vg.resolve(null).then(t).catch(II)}:Wd;function II(t){setTimeout(function(){throw t})}function Hc(t,e){var n=e,r=0;do{var s=n.nextSibling;if(t.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){t.removeChild(s),Eo(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);Eo(e)}function gr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function _g(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var mi=Math.random().toString(36).slice(2),on="__reactFiber$"+mi,Ao="__reactProps$"+mi,jn="__reactContainer$"+mi,Hd="__reactEvents$"+mi,SI="__reactListeners$"+mi,AI="__reactHandles$"+mi;function Wr(t){var e=t[on];if(e)return e;for(var n=t.parentNode;n;){if(e=n[jn]||n[on]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=_g(t);t!==null;){if(n=t[on])return n;t=_g(t)}return e}t=n,n=t.parentNode}return null}function Qo(t){return t=t[on]||t[jn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Os(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(F(33))}function _u(t){return t[Ao]||null}var qd=[],Vs=-1;function br(t){return{current:t}}function ge(t){0>Vs||(t.current=qd[Vs],qd[Vs]=null,Vs--)}function he(t,e){Vs++,qd[Vs]=t.current,t.current=e}var Sr={},ot=br(Sr),vt=br(!1),Jr=Sr;function Zs(t,e){var n=t.type.contextTypes;if(!n)return Sr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=e[i];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=s),s}function _t(t){return t=t.childContextTypes,t!=null}function Rl(){ge(vt),ge(ot)}function wg(t,e,n){if(ot.current!==Sr)throw Error(F(168));he(ot,e),he(vt,n)}function H_(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in e))throw Error(F(108,cx(t)||"Unknown",s));return Ee({},n,r)}function Pl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Sr,Jr=ot.current,he(ot,t),he(vt,vt.current),!0}function Eg(t,e,n){var r=t.stateNode;if(!r)throw Error(F(169));n?(t=H_(t,e,Jr),r.__reactInternalMemoizedMergedChildContext=t,ge(vt),ge(ot),he(ot,t)):ge(vt),he(vt,n)}var An=null,wu=!1,qc=!1;function q_(t){An===null?An=[t]:An.push(t)}function kI(t){wu=!0,q_(t)}function Nr(){if(!qc&&An!==null){qc=!0;var t=0,e=ue;try{var n=An;for(ue=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}An=null,wu=!1}catch(s){throw An!==null&&(An=An.slice(t+1)),y_(Jh,Nr),s}finally{ue=e,qc=!1}}return null}var Ls=[],js=0,bl=null,Nl=0,Vt=[],Lt=0,Zr=null,kn=1,Cn="";function Br(t,e){Ls[js++]=Nl,Ls[js++]=bl,bl=t,Nl=e}function K_(t,e,n){Vt[Lt++]=kn,Vt[Lt++]=Cn,Vt[Lt++]=Zr,Zr=t;var r=kn;t=Cn;var s=32-Yt(r)-1;r&=~(1<<s),n+=1;var i=32-Yt(e)+s;if(30<i){var o=s-s%5;i=(r&(1<<o)-1).toString(32),r>>=o,s-=o,kn=1<<32-Yt(e)+s|n<<s|r,Cn=i+t}else kn=1<<i|n<<s|r,Cn=t}function lf(t){t.return!==null&&(Br(t,1),K_(t,1,0))}function uf(t){for(;t===bl;)bl=Ls[--js],Ls[js]=null,Nl=Ls[--js],Ls[js]=null;for(;t===Zr;)Zr=Vt[--Lt],Vt[Lt]=null,Cn=Vt[--Lt],Vt[Lt]=null,kn=Vt[--Lt],Vt[Lt]=null}var Pt=null,Ct=null,ye=!1,Gt=null;function G_(t,e){var n=jt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Tg(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Pt=t,Ct=gr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Pt=t,Ct=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Zr!==null?{id:kn,overflow:Cn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=jt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Pt=t,Ct=null,!0):!1;default:return!1}}function Kd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Gd(t){if(ye){var e=Ct;if(e){var n=e;if(!Tg(t,e)){if(Kd(t))throw Error(F(418));e=gr(n.nextSibling);var r=Pt;e&&Tg(t,e)?G_(r,n):(t.flags=t.flags&-4097|2,ye=!1,Pt=t)}}else{if(Kd(t))throw Error(F(418));t.flags=t.flags&-4097|2,ye=!1,Pt=t}}}function xg(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Pt=t}function Ba(t){if(t!==Pt)return!1;if(!ye)return xg(t),ye=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!$d(t.type,t.memoizedProps)),e&&(e=Ct)){if(Kd(t))throw Q_(),Error(F(418));for(;e;)G_(t,e),e=gr(e.nextSibling)}if(xg(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(F(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Ct=gr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Ct=null}}else Ct=Pt?gr(t.stateNode.nextSibling):null;return!0}function Q_(){for(var t=Ct;t;)t=gr(t.nextSibling)}function ei(){Ct=Pt=null,ye=!1}function cf(t){Gt===null?Gt=[t]:Gt.push(t)}var CI=Hn.ReactCurrentBatchConfig;function Bi(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(F(309));var r=n.stateNode}if(!r)throw Error(F(147,t));var s=r,i=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(o){var l=s.refs;o===null?delete l[i]:l[i]=o},e._stringRef=i,e)}if(typeof t!="string")throw Error(F(284));if(!n._owner)throw Error(F(290,t))}return t}function za(t,e){throw t=Object.prototype.toString.call(e),Error(F(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Ig(t){var e=t._init;return e(t._payload)}function Y_(t){function e(x,T){if(t){var w=x.deletions;w===null?(x.deletions=[T],x.flags|=16):w.push(T)}}function n(x,T){if(!t)return null;for(;T!==null;)e(x,T),T=T.sibling;return null}function r(x,T){for(x=new Map;T!==null;)T.key!==null?x.set(T.key,T):x.set(T.index,T),T=T.sibling;return x}function s(x,T){return x=wr(x,T),x.index=0,x.sibling=null,x}function i(x,T,w){return x.index=w,t?(w=x.alternate,w!==null?(w=w.index,w<T?(x.flags|=2,T):w):(x.flags|=2,T)):(x.flags|=1048576,T)}function o(x){return t&&x.alternate===null&&(x.flags|=2),x}function l(x,T,w,C){return T===null||T.tag!==6?(T=Zc(w,x.mode,C),T.return=x,T):(T=s(T,w),T.return=x,T)}function u(x,T,w,C){var j=w.type;return j===Ps?f(x,T,w.props.children,C,w.key):T!==null&&(T.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===er&&Ig(j)===T.type)?(C=s(T,w.props),C.ref=Bi(x,T,w),C.return=x,C):(C=cl(w.type,w.key,w.props,null,x.mode,C),C.ref=Bi(x,T,w),C.return=x,C)}function c(x,T,w,C){return T===null||T.tag!==4||T.stateNode.containerInfo!==w.containerInfo||T.stateNode.implementation!==w.implementation?(T=ed(w,x.mode,C),T.return=x,T):(T=s(T,w.children||[]),T.return=x,T)}function f(x,T,w,C,j){return T===null||T.tag!==7?(T=Yr(w,x.mode,C,j),T.return=x,T):(T=s(T,w),T.return=x,T)}function m(x,T,w){if(typeof T=="string"&&T!==""||typeof T=="number")return T=Zc(""+T,x.mode,w),T.return=x,T;if(typeof T=="object"&&T!==null){switch(T.$$typeof){case ba:return w=cl(T.type,T.key,T.props,null,x.mode,w),w.ref=Bi(x,null,T),w.return=x,w;case Rs:return T=ed(T,x.mode,w),T.return=x,T;case er:var C=T._init;return m(x,C(T._payload),w)}if(qi(T)||Li(T))return T=Yr(T,x.mode,w,null),T.return=x,T;za(x,T)}return null}function g(x,T,w,C){var j=T!==null?T.key:null;if(typeof w=="string"&&w!==""||typeof w=="number")return j!==null?null:l(x,T,""+w,C);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case ba:return w.key===j?u(x,T,w,C):null;case Rs:return w.key===j?c(x,T,w,C):null;case er:return j=w._init,g(x,T,j(w._payload),C)}if(qi(w)||Li(w))return j!==null?null:f(x,T,w,C,null);za(x,w)}return null}function A(x,T,w,C,j){if(typeof C=="string"&&C!==""||typeof C=="number")return x=x.get(w)||null,l(T,x,""+C,j);if(typeof C=="object"&&C!==null){switch(C.$$typeof){case ba:return x=x.get(C.key===null?w:C.key)||null,u(T,x,C,j);case Rs:return x=x.get(C.key===null?w:C.key)||null,c(T,x,C,j);case er:var D=C._init;return A(x,T,w,D(C._payload),j)}if(qi(C)||Li(C))return x=x.get(w)||null,f(T,x,C,j,null);za(T,C)}return null}function k(x,T,w,C){for(var j=null,D=null,_=T,y=T=0,E=null;_!==null&&y<w.length;y++){_.index>y?(E=_,_=null):E=_.sibling;var I=g(x,_,w[y],C);if(I===null){_===null&&(_=E);break}t&&_&&I.alternate===null&&e(x,_),T=i(I,T,y),D===null?j=I:D.sibling=I,D=I,_=E}if(y===w.length)return n(x,_),ye&&Br(x,y),j;if(_===null){for(;y<w.length;y++)_=m(x,w[y],C),_!==null&&(T=i(_,T,y),D===null?j=_:D.sibling=_,D=_);return ye&&Br(x,y),j}for(_=r(x,_);y<w.length;y++)E=A(_,x,y,w[y],C),E!==null&&(t&&E.alternate!==null&&_.delete(E.key===null?y:E.key),T=i(E,T,y),D===null?j=E:D.sibling=E,D=E);return t&&_.forEach(function(R){return e(x,R)}),ye&&Br(x,y),j}function b(x,T,w,C){var j=Li(w);if(typeof j!="function")throw Error(F(150));if(w=j.call(w),w==null)throw Error(F(151));for(var D=j=null,_=T,y=T=0,E=null,I=w.next();_!==null&&!I.done;y++,I=w.next()){_.index>y?(E=_,_=null):E=_.sibling;var R=g(x,_,I.value,C);if(R===null){_===null&&(_=E);break}t&&_&&R.alternate===null&&e(x,_),T=i(R,T,y),D===null?j=R:D.sibling=R,D=R,_=E}if(I.done)return n(x,_),ye&&Br(x,y),j;if(_===null){for(;!I.done;y++,I=w.next())I=m(x,I.value,C),I!==null&&(T=i(I,T,y),D===null?j=I:D.sibling=I,D=I);return ye&&Br(x,y),j}for(_=r(x,_);!I.done;y++,I=w.next())I=A(_,x,y,I.value,C),I!==null&&(t&&I.alternate!==null&&_.delete(I.key===null?y:I.key),T=i(I,T,y),D===null?j=I:D.sibling=I,D=I);return t&&_.forEach(function(P){return e(x,P)}),ye&&Br(x,y),j}function N(x,T,w,C){if(typeof w=="object"&&w!==null&&w.type===Ps&&w.key===null&&(w=w.props.children),typeof w=="object"&&w!==null){switch(w.$$typeof){case ba:e:{for(var j=w.key,D=T;D!==null;){if(D.key===j){if(j=w.type,j===Ps){if(D.tag===7){n(x,D.sibling),T=s(D,w.props.children),T.return=x,x=T;break e}}else if(D.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===er&&Ig(j)===D.type){n(x,D.sibling),T=s(D,w.props),T.ref=Bi(x,D,w),T.return=x,x=T;break e}n(x,D);break}else e(x,D);D=D.sibling}w.type===Ps?(T=Yr(w.props.children,x.mode,C,w.key),T.return=x,x=T):(C=cl(w.type,w.key,w.props,null,x.mode,C),C.ref=Bi(x,T,w),C.return=x,x=C)}return o(x);case Rs:e:{for(D=w.key;T!==null;){if(T.key===D)if(T.tag===4&&T.stateNode.containerInfo===w.containerInfo&&T.stateNode.implementation===w.implementation){n(x,T.sibling),T=s(T,w.children||[]),T.return=x,x=T;break e}else{n(x,T);break}else e(x,T);T=T.sibling}T=ed(w,x.mode,C),T.return=x,x=T}return o(x);case er:return D=w._init,N(x,T,D(w._payload),C)}if(qi(w))return k(x,T,w,C);if(Li(w))return b(x,T,w,C);za(x,w)}return typeof w=="string"&&w!==""||typeof w=="number"?(w=""+w,T!==null&&T.tag===6?(n(x,T.sibling),T=s(T,w),T.return=x,x=T):(n(x,T),T=Zc(w,x.mode,C),T.return=x,x=T),o(x)):n(x,T)}return N}var ti=Y_(!0),X_=Y_(!1),Dl=br(null),Ol=null,Ms=null,df=null;function hf(){df=Ms=Ol=null}function ff(t){var e=Dl.current;ge(Dl),t._currentValue=e}function Qd(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function qs(t,e){Ol=t,df=Ms=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(yt=!0),t.firstContext=null)}function Ft(t){var e=t._currentValue;if(df!==t)if(t={context:t,memoizedValue:e,next:null},Ms===null){if(Ol===null)throw Error(F(308));Ms=t,Ol.dependencies={lanes:0,firstContext:t}}else Ms=Ms.next=t;return e}var Hr=null;function pf(t){Hr===null?Hr=[t]:Hr.push(t)}function J_(t,e,n,r){var s=e.interleaved;return s===null?(n.next=n,pf(e)):(n.next=s.next,s.next=n),e.interleaved=n,Mn(t,r)}function Mn(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var tr=!1;function mf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Z_(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Nn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function yr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,oe&2){var s=r.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),r.pending=e,Mn(t,n)}return s=r.interleaved,s===null?(e.next=e,pf(r)):(e.next=s.next,s.next=e),r.interleaved=e,Mn(t,n)}function sl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Zh(t,n)}}function Sg(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?s=i=e:i=i.next=e}else s=i=e;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Vl(t,e,n,r){var s=t.updateQueue;tr=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var u=l,c=u.next;u.next=null,o===null?i=c:o.next=c,o=u;var f=t.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==o&&(l===null?f.firstBaseUpdate=c:l.next=c,f.lastBaseUpdate=u))}if(i!==null){var m=s.baseState;o=0,f=c=u=null,l=i;do{var g=l.lane,A=l.eventTime;if((r&g)===g){f!==null&&(f=f.next={eventTime:A,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var k=t,b=l;switch(g=e,A=n,b.tag){case 1:if(k=b.payload,typeof k=="function"){m=k.call(A,m,g);break e}m=k;break e;case 3:k.flags=k.flags&-65537|128;case 0:if(k=b.payload,g=typeof k=="function"?k.call(A,m,g):k,g==null)break e;m=Ee({},m,g);break e;case 2:tr=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,g=s.effects,g===null?s.effects=[l]:g.push(l))}else A={eventTime:A,lane:g,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(c=f=A,u=m):f=f.next=A,o|=g;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;g=l,l=g.next,g.next=null,s.lastBaseUpdate=g,s.shared.pending=null}}while(!0);if(f===null&&(u=m),s.baseState=u,s.firstBaseUpdate=c,s.lastBaseUpdate=f,e=s.shared.interleaved,e!==null){s=e;do o|=s.lane,s=s.next;while(s!==e)}else i===null&&(s.shared.lanes=0);ts|=o,t.lanes=o,t.memoizedState=m}}function Ag(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(F(191,s));s.call(r)}}}var Yo={},un=br(Yo),ko=br(Yo),Co=br(Yo);function qr(t){if(t===Yo)throw Error(F(174));return t}function gf(t,e){switch(he(Co,e),he(ko,t),he(un,Yo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Rd(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Rd(e,t)}ge(un),he(un,e)}function ni(){ge(un),ge(ko),ge(Co)}function e0(t){qr(Co.current);var e=qr(un.current),n=Rd(e,t.type);e!==n&&(he(ko,t),he(un,n))}function yf(t){ko.current===t&&(ge(un),ge(ko))}var ve=br(0);function Ll(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Kc=[];function vf(){for(var t=0;t<Kc.length;t++)Kc[t]._workInProgressVersionPrimary=null;Kc.length=0}var il=Hn.ReactCurrentDispatcher,Gc=Hn.ReactCurrentBatchConfig,es=0,we=null,Oe=null,Me=null,jl=!1,oo=!1,Ro=0,RI=0;function Ze(){throw Error(F(321))}function _f(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Jt(t[n],e[n]))return!1;return!0}function wf(t,e,n,r,s,i){if(es=i,we=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,il.current=t===null||t.memoizedState===null?DI:OI,t=n(r,s),oo){i=0;do{if(oo=!1,Ro=0,25<=i)throw Error(F(301));i+=1,Me=Oe=null,e.updateQueue=null,il.current=VI,t=n(r,s)}while(oo)}if(il.current=Ml,e=Oe!==null&&Oe.next!==null,es=0,Me=Oe=we=null,jl=!1,e)throw Error(F(300));return t}function Ef(){var t=Ro!==0;return Ro=0,t}function sn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Me===null?we.memoizedState=Me=t:Me=Me.next=t,Me}function Bt(){if(Oe===null){var t=we.alternate;t=t!==null?t.memoizedState:null}else t=Oe.next;var e=Me===null?we.memoizedState:Me.next;if(e!==null)Me=e,Oe=t;else{if(t===null)throw Error(F(310));Oe=t,t={memoizedState:Oe.memoizedState,baseState:Oe.baseState,baseQueue:Oe.baseQueue,queue:Oe.queue,next:null},Me===null?we.memoizedState=Me=t:Me=Me.next=t}return Me}function Po(t,e){return typeof e=="function"?e(t):e}function Qc(t){var e=Bt(),n=e.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=t;var r=Oe,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var l=o=null,u=null,c=i;do{var f=c.lane;if((es&f)===f)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:t(r,c.action);else{var m={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(l=u=m,o=r):u=u.next=m,we.lanes|=f,ts|=f}c=c.next}while(c!==null&&c!==i);u===null?o=r:u.next=l,Jt(r,e.memoizedState)||(yt=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){s=t;do i=s.lane,we.lanes|=i,ts|=i,s=s.next;while(s!==t)}else s===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Yc(t){var e=Bt(),n=e.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=t;var r=n.dispatch,s=n.pending,i=e.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do i=t(i,o.action),o=o.next;while(o!==s);Jt(i,e.memoizedState)||(yt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,r]}function t0(){}function n0(t,e){var n=we,r=Bt(),s=e(),i=!Jt(r.memoizedState,s);if(i&&(r.memoizedState=s,yt=!0),r=r.queue,Tf(i0.bind(null,n,r,t),[t]),r.getSnapshot!==e||i||Me!==null&&Me.memoizedState.tag&1){if(n.flags|=2048,bo(9,s0.bind(null,n,r,s,e),void 0,null),Ue===null)throw Error(F(349));es&30||r0(n,e,s)}return s}function r0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=we.updateQueue,e===null?(e={lastEffect:null,stores:null},we.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function s0(t,e,n,r){e.value=n,e.getSnapshot=r,o0(e)&&a0(t)}function i0(t,e,n){return n(function(){o0(e)&&a0(t)})}function o0(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Jt(t,n)}catch{return!0}}function a0(t){var e=Mn(t,1);e!==null&&Xt(e,t,1,-1)}function kg(t){var e=sn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Po,lastRenderedState:t},e.queue=t,t=t.dispatch=NI.bind(null,we,t),[e.memoizedState,t]}function bo(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=we.updateQueue,e===null?(e={lastEffect:null,stores:null},we.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function l0(){return Bt().memoizedState}function ol(t,e,n,r){var s=sn();we.flags|=t,s.memoizedState=bo(1|e,n,void 0,r===void 0?null:r)}function Eu(t,e,n,r){var s=Bt();r=r===void 0?null:r;var i=void 0;if(Oe!==null){var o=Oe.memoizedState;if(i=o.destroy,r!==null&&_f(r,o.deps)){s.memoizedState=bo(e,n,i,r);return}}we.flags|=t,s.memoizedState=bo(1|e,n,i,r)}function Cg(t,e){return ol(8390656,8,t,e)}function Tf(t,e){return Eu(2048,8,t,e)}function u0(t,e){return Eu(4,2,t,e)}function c0(t,e){return Eu(4,4,t,e)}function d0(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function h0(t,e,n){return n=n!=null?n.concat([t]):null,Eu(4,4,d0.bind(null,e,t),n)}function xf(){}function f0(t,e){var n=Bt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&_f(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function p0(t,e){var n=Bt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&_f(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function m0(t,e,n){return es&21?(Jt(n,e)||(n=w_(),we.lanes|=n,ts|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,yt=!0),t.memoizedState=n)}function PI(t,e){var n=ue;ue=n!==0&&4>n?n:4,t(!0);var r=Gc.transition;Gc.transition={};try{t(!1),e()}finally{ue=n,Gc.transition=r}}function g0(){return Bt().memoizedState}function bI(t,e,n){var r=_r(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},y0(t))v0(e,n);else if(n=J_(t,e,n,r),n!==null){var s=dt();Xt(n,t,r,s),_0(n,e,r)}}function NI(t,e,n){var r=_r(t),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(y0(t))v0(e,s);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,l=i(o,n);if(s.hasEagerState=!0,s.eagerState=l,Jt(l,o)){var u=e.interleaved;u===null?(s.next=s,pf(e)):(s.next=u.next,u.next=s),e.interleaved=s;return}}catch{}finally{}n=J_(t,e,s,r),n!==null&&(s=dt(),Xt(n,t,r,s),_0(n,e,r))}}function y0(t){var e=t.alternate;return t===we||e!==null&&e===we}function v0(t,e){oo=jl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function _0(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Zh(t,n)}}var Ml={readContext:Ft,useCallback:Ze,useContext:Ze,useEffect:Ze,useImperativeHandle:Ze,useInsertionEffect:Ze,useLayoutEffect:Ze,useMemo:Ze,useReducer:Ze,useRef:Ze,useState:Ze,useDebugValue:Ze,useDeferredValue:Ze,useTransition:Ze,useMutableSource:Ze,useSyncExternalStore:Ze,useId:Ze,unstable_isNewReconciler:!1},DI={readContext:Ft,useCallback:function(t,e){return sn().memoizedState=[t,e===void 0?null:e],t},useContext:Ft,useEffect:Cg,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,ol(4194308,4,d0.bind(null,e,t),n)},useLayoutEffect:function(t,e){return ol(4194308,4,t,e)},useInsertionEffect:function(t,e){return ol(4,2,t,e)},useMemo:function(t,e){var n=sn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=sn();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=bI.bind(null,we,t),[r.memoizedState,t]},useRef:function(t){var e=sn();return t={current:t},e.memoizedState=t},useState:kg,useDebugValue:xf,useDeferredValue:function(t){return sn().memoizedState=t},useTransition:function(){var t=kg(!1),e=t[0];return t=PI.bind(null,t[1]),sn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=we,s=sn();if(ye){if(n===void 0)throw Error(F(407));n=n()}else{if(n=e(),Ue===null)throw Error(F(349));es&30||r0(r,e,n)}s.memoizedState=n;var i={value:n,getSnapshot:e};return s.queue=i,Cg(i0.bind(null,r,i,t),[t]),r.flags|=2048,bo(9,s0.bind(null,r,i,n,e),void 0,null),n},useId:function(){var t=sn(),e=Ue.identifierPrefix;if(ye){var n=Cn,r=kn;n=(r&~(1<<32-Yt(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Ro++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=RI++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},OI={readContext:Ft,useCallback:f0,useContext:Ft,useEffect:Tf,useImperativeHandle:h0,useInsertionEffect:u0,useLayoutEffect:c0,useMemo:p0,useReducer:Qc,useRef:l0,useState:function(){return Qc(Po)},useDebugValue:xf,useDeferredValue:function(t){var e=Bt();return m0(e,Oe.memoizedState,t)},useTransition:function(){var t=Qc(Po)[0],e=Bt().memoizedState;return[t,e]},useMutableSource:t0,useSyncExternalStore:n0,useId:g0,unstable_isNewReconciler:!1},VI={readContext:Ft,useCallback:f0,useContext:Ft,useEffect:Tf,useImperativeHandle:h0,useInsertionEffect:u0,useLayoutEffect:c0,useMemo:p0,useReducer:Yc,useRef:l0,useState:function(){return Yc(Po)},useDebugValue:xf,useDeferredValue:function(t){var e=Bt();return Oe===null?e.memoizedState=t:m0(e,Oe.memoizedState,t)},useTransition:function(){var t=Yc(Po)[0],e=Bt().memoizedState;return[t,e]},useMutableSource:t0,useSyncExternalStore:n0,useId:g0,unstable_isNewReconciler:!1};function qt(t,e){if(t&&t.defaultProps){e=Ee({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Yd(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Ee({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Tu={isMounted:function(t){return(t=t._reactInternals)?hs(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=dt(),s=_r(t),i=Nn(r,s);i.payload=e,n!=null&&(i.callback=n),e=yr(t,i,s),e!==null&&(Xt(e,t,s,r),sl(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=dt(),s=_r(t),i=Nn(r,s);i.tag=1,i.payload=e,n!=null&&(i.callback=n),e=yr(t,i,s),e!==null&&(Xt(e,t,s,r),sl(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=dt(),r=_r(t),s=Nn(n,r);s.tag=2,e!=null&&(s.callback=e),e=yr(t,s,r),e!==null&&(Xt(e,t,r,n),sl(e,t,r))}};function Rg(t,e,n,r,s,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,i,o):e.prototype&&e.prototype.isPureReactComponent?!xo(n,r)||!xo(s,i):!0}function w0(t,e,n){var r=!1,s=Sr,i=e.contextType;return typeof i=="object"&&i!==null?i=Ft(i):(s=_t(e)?Jr:ot.current,r=e.contextTypes,i=(r=r!=null)?Zs(t,s):Sr),e=new e(n,i),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Tu,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=s,t.__reactInternalMemoizedMaskedChildContext=i),e}function Pg(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Tu.enqueueReplaceState(e,e.state,null)}function Xd(t,e,n,r){var s=t.stateNode;s.props=n,s.state=t.memoizedState,s.refs={},mf(t);var i=e.contextType;typeof i=="object"&&i!==null?s.context=Ft(i):(i=_t(e)?Jr:ot.current,s.context=Zs(t,i)),s.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(Yd(t,e,i,n),s.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(e=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),e!==s.state&&Tu.enqueueReplaceState(s,s.state,null),Vl(t,n,s,r),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308)}function ri(t,e){try{var n="",r=e;do n+=ux(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:t,source:e,stack:s,digest:null}}function Xc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Jd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var LI=typeof WeakMap=="function"?WeakMap:Map;function E0(t,e,n){n=Nn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){Fl||(Fl=!0,lh=r),Jd(t,e)},n}function T0(t,e,n){n=Nn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var s=e.value;n.payload=function(){return r(s)},n.callback=function(){Jd(t,e)}}var i=t.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Jd(t,e),typeof r!="function"&&(vr===null?vr=new Set([this]):vr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function bg(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new LI;var s=new Set;r.set(e,s)}else s=r.get(e),s===void 0&&(s=new Set,r.set(e,s));s.has(n)||(s.add(n),t=YI.bind(null,t,e,n),e.then(t,t))}function Ng(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Dg(t,e,n,r,s){return t.mode&1?(t.flags|=65536,t.lanes=s,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Nn(-1,1),e.tag=2,yr(n,e,1))),n.lanes|=1),t)}var jI=Hn.ReactCurrentOwner,yt=!1;function ct(t,e,n,r){e.child=t===null?X_(e,null,n,r):ti(e,t.child,n,r)}function Og(t,e,n,r,s){n=n.render;var i=e.ref;return qs(e,s),r=wf(t,e,n,r,i,s),n=Ef(),t!==null&&!yt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Un(t,e,s)):(ye&&n&&lf(e),e.flags|=1,ct(t,e,r,s),e.child)}function Vg(t,e,n,r,s){if(t===null){var i=n.type;return typeof i=="function"&&!bf(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=i,x0(t,e,i,r,s)):(t=cl(n.type,null,r,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!(t.lanes&s)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:xo,n(o,r)&&t.ref===e.ref)return Un(t,e,s)}return e.flags|=1,t=wr(i,r),t.ref=e.ref,t.return=e,e.child=t}function x0(t,e,n,r,s){if(t!==null){var i=t.memoizedProps;if(xo(i,r)&&t.ref===e.ref)if(yt=!1,e.pendingProps=r=i,(t.lanes&s)!==0)t.flags&131072&&(yt=!0);else return e.lanes=t.lanes,Un(t,e,s)}return Zd(t,e,n,r,s)}function I0(t,e,n){var r=e.pendingProps,s=r.children,i=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},he(Fs,kt),kt|=n;else{if(!(n&1073741824))return t=i!==null?i.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,he(Fs,kt),kt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,he(Fs,kt),kt|=r}else i!==null?(r=i.baseLanes|n,e.memoizedState=null):r=n,he(Fs,kt),kt|=r;return ct(t,e,s,n),e.child}function S0(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Zd(t,e,n,r,s){var i=_t(n)?Jr:ot.current;return i=Zs(e,i),qs(e,s),n=wf(t,e,n,r,i,s),r=Ef(),t!==null&&!yt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Un(t,e,s)):(ye&&r&&lf(e),e.flags|=1,ct(t,e,n,s),e.child)}function Lg(t,e,n,r,s){if(_t(n)){var i=!0;Pl(e)}else i=!1;if(qs(e,s),e.stateNode===null)al(t,e),w0(e,n,r),Xd(e,n,r,s),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Ft(c):(c=_t(n)?Jr:ot.current,c=Zs(e,c));var f=n.getDerivedStateFromProps,m=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==c)&&Pg(e,o,r,c),tr=!1;var g=e.memoizedState;o.state=g,Vl(e,r,o,s),u=e.memoizedState,l!==r||g!==u||vt.current||tr?(typeof f=="function"&&(Yd(e,n,f,r),u=e.memoizedState),(l=tr||Rg(e,n,l,r,g,u,c))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=c,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,Z_(t,e),l=e.memoizedProps,c=e.type===e.elementType?l:qt(e.type,l),o.props=c,m=e.pendingProps,g=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=Ft(u):(u=_t(n)?Jr:ot.current,u=Zs(e,u));var A=n.getDerivedStateFromProps;(f=typeof A=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==m||g!==u)&&Pg(e,o,r,u),tr=!1,g=e.memoizedState,o.state=g,Vl(e,r,o,s);var k=e.memoizedState;l!==m||g!==k||vt.current||tr?(typeof A=="function"&&(Yd(e,n,A,r),k=e.memoizedState),(c=tr||Rg(e,n,c,r,g,k,u)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,k,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,k,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=k),o.props=r,o.state=k,o.context=u,r=c):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&g===t.memoizedState||(e.flags|=1024),r=!1)}return eh(t,e,n,r,i,s)}function eh(t,e,n,r,s,i){S0(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return s&&Eg(e,n,!1),Un(t,e,i);r=e.stateNode,jI.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=ti(e,t.child,null,i),e.child=ti(e,null,l,i)):ct(t,e,l,i),e.memoizedState=r.state,s&&Eg(e,n,!0),e.child}function A0(t){var e=t.stateNode;e.pendingContext?wg(t,e.pendingContext,e.pendingContext!==e.context):e.context&&wg(t,e.context,!1),gf(t,e.containerInfo)}function jg(t,e,n,r,s){return ei(),cf(s),e.flags|=256,ct(t,e,n,r),e.child}var th={dehydrated:null,treeContext:null,retryLane:0};function nh(t){return{baseLanes:t,cachePool:null,transitions:null}}function k0(t,e,n){var r=e.pendingProps,s=ve.current,i=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(s&2)!==0),l?(i=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(s|=1),he(ve,s&1),t===null)return Gd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,i?(r=e.mode,i=e.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=Su(o,r,0,null),t=Yr(t,r,n,null),i.return=e,t.return=e,i.sibling=t,e.child=i,e.child.memoizedState=nh(n),e.memoizedState=th,t):If(e,o));if(s=t.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return MI(t,e,o,r,l,s,n);if(i){i=r.fallback,o=e.mode,s=t.child,l=s.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==s?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=wr(s,u),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=wr(l,i):(i=Yr(i,o,n,null),i.flags|=2),i.return=e,r.return=e,r.sibling=i,e.child=r,r=i,i=e.child,o=t.child.memoizedState,o=o===null?nh(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=t.childLanes&~n,e.memoizedState=th,r}return i=t.child,t=i.sibling,r=wr(i,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function If(t,e){return e=Su({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function $a(t,e,n,r){return r!==null&&cf(r),ti(e,t.child,null,n),t=If(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function MI(t,e,n,r,s,i,o){if(n)return e.flags&256?(e.flags&=-257,r=Xc(Error(F(422))),$a(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(i=r.fallback,s=e.mode,r=Su({mode:"visible",children:r.children},s,0,null),i=Yr(i,s,o,null),i.flags|=2,r.return=e,i.return=e,r.sibling=i,e.child=r,e.mode&1&&ti(e,t.child,null,o),e.child.memoizedState=nh(o),e.memoizedState=th,i);if(!(e.mode&1))return $a(t,e,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(F(419)),r=Xc(i,r,void 0),$a(t,e,o,r)}if(l=(o&t.childLanes)!==0,yt||l){if(r=Ue,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,Mn(t,s),Xt(r,t,s,-1))}return Pf(),r=Xc(Error(F(421))),$a(t,e,o,r)}return s.data==="$?"?(e.flags|=128,e.child=t.child,e=XI.bind(null,t),s._reactRetry=e,null):(t=i.treeContext,Ct=gr(s.nextSibling),Pt=e,ye=!0,Gt=null,t!==null&&(Vt[Lt++]=kn,Vt[Lt++]=Cn,Vt[Lt++]=Zr,kn=t.id,Cn=t.overflow,Zr=e),e=If(e,r.children),e.flags|=4096,e)}function Mg(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Qd(t.return,e,n)}function Jc(t,e,n,r,s){var i=t.memoizedState;i===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function C0(t,e,n){var r=e.pendingProps,s=r.revealOrder,i=r.tail;if(ct(t,e,r.children,n),r=ve.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Mg(t,n,e);else if(t.tag===19)Mg(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(he(ve,r),!(e.mode&1))e.memoizedState=null;else switch(s){case"forwards":for(n=e.child,s=null;n!==null;)t=n.alternate,t!==null&&Ll(t)===null&&(s=n),n=n.sibling;n=s,n===null?(s=e.child,e.child=null):(s=n.sibling,n.sibling=null),Jc(e,!1,s,n,i);break;case"backwards":for(n=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&Ll(t)===null){e.child=s;break}t=s.sibling,s.sibling=n,n=s,s=t}Jc(e,!0,n,null,i);break;case"together":Jc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function al(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Un(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),ts|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(F(153));if(e.child!==null){for(t=e.child,n=wr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=wr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function UI(t,e,n){switch(e.tag){case 3:A0(e),ei();break;case 5:e0(e);break;case 1:_t(e.type)&&Pl(e);break;case 4:gf(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,s=e.memoizedProps.value;he(Dl,r._currentValue),r._currentValue=s;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(he(ve,ve.current&1),e.flags|=128,null):n&e.child.childLanes?k0(t,e,n):(he(ve,ve.current&1),t=Un(t,e,n),t!==null?t.sibling:null);he(ve,ve.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return C0(t,e,n);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),he(ve,ve.current),r)break;return null;case 22:case 23:return e.lanes=0,I0(t,e,n)}return Un(t,e,n)}var R0,rh,P0,b0;R0=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};rh=function(){};P0=function(t,e,n,r){var s=t.memoizedProps;if(s!==r){t=e.stateNode,qr(un.current);var i=null;switch(n){case"input":s=Sd(t,s),r=Sd(t,r),i=[];break;case"select":s=Ee({},s,{value:void 0}),r=Ee({},r,{value:void 0}),i=[];break;case"textarea":s=Cd(t,s),r=Cd(t,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=Cl)}Pd(n,r);var o;n=null;for(c in s)if(!r.hasOwnProperty(c)&&s.hasOwnProperty(c)&&s[c]!=null)if(c==="style"){var l=s[c];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(go.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in r){var u=r[c];if(l=s!=null?s[c]:void 0,r.hasOwnProperty(c)&&u!==l&&(u!=null||l!=null))if(c==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(i||(i=[]),i.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(i=i||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(go.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&pe("scroll",t),i||l===u||(i=[])):(i=i||[]).push(c,u))}n&&(i=i||[]).push("style",n);var c=i;(e.updateQueue=c)&&(e.flags|=4)}};b0=function(t,e,n,r){n!==r&&(e.flags|=4)};function zi(t,e){if(!ye)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function et(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function FI(t,e,n){var r=e.pendingProps;switch(uf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return et(e),null;case 1:return _t(e.type)&&Rl(),et(e),null;case 3:return r=e.stateNode,ni(),ge(vt),ge(ot),vf(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(Ba(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Gt!==null&&(dh(Gt),Gt=null))),rh(t,e),et(e),null;case 5:yf(e);var s=qr(Co.current);if(n=e.type,t!==null&&e.stateNode!=null)P0(t,e,n,r,s),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(F(166));return et(e),null}if(t=qr(un.current),Ba(e)){r=e.stateNode,n=e.type;var i=e.memoizedProps;switch(r[on]=e,r[Ao]=i,t=(e.mode&1)!==0,n){case"dialog":pe("cancel",r),pe("close",r);break;case"iframe":case"object":case"embed":pe("load",r);break;case"video":case"audio":for(s=0;s<Gi.length;s++)pe(Gi[s],r);break;case"source":pe("error",r);break;case"img":case"image":case"link":pe("error",r),pe("load",r);break;case"details":pe("toggle",r);break;case"input":Km(r,i),pe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},pe("invalid",r);break;case"textarea":Qm(r,i),pe("invalid",r)}Pd(n,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&Fa(r.textContent,l,t),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&Fa(r.textContent,l,t),s=["children",""+l]):go.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&pe("scroll",r)}switch(n){case"input":Na(r),Gm(r,i,!0);break;case"textarea":Na(r),Ym(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Cl)}r=s,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=i_(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[on]=e,t[Ao]=r,R0(t,e,!1,!1),e.stateNode=t;e:{switch(o=bd(n,r),n){case"dialog":pe("cancel",t),pe("close",t),s=r;break;case"iframe":case"object":case"embed":pe("load",t),s=r;break;case"video":case"audio":for(s=0;s<Gi.length;s++)pe(Gi[s],t);s=r;break;case"source":pe("error",t),s=r;break;case"img":case"image":case"link":pe("error",t),pe("load",t),s=r;break;case"details":pe("toggle",t),s=r;break;case"input":Km(t,r),s=Sd(t,r),pe("invalid",t);break;case"option":s=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},s=Ee({},r,{value:void 0}),pe("invalid",t);break;case"textarea":Qm(t,r),s=Cd(t,r),pe("invalid",t);break;default:s=r}Pd(n,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var u=l[i];i==="style"?l_(t,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&o_(t,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&yo(t,u):typeof u=="number"&&yo(t,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(go.hasOwnProperty(i)?u!=null&&i==="onScroll"&&pe("scroll",t):u!=null&&Kh(t,i,u,o))}switch(n){case"input":Na(t),Gm(t,r,!1);break;case"textarea":Na(t),Ym(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Ir(r.value));break;case"select":t.multiple=!!r.multiple,i=r.value,i!=null?zs(t,!!r.multiple,i,!1):r.defaultValue!=null&&zs(t,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(t.onclick=Cl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return et(e),null;case 6:if(t&&e.stateNode!=null)b0(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(F(166));if(n=qr(Co.current),qr(un.current),Ba(e)){if(r=e.stateNode,n=e.memoizedProps,r[on]=e,(i=r.nodeValue!==n)&&(t=Pt,t!==null))switch(t.tag){case 3:Fa(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Fa(r.nodeValue,n,(t.mode&1)!==0)}i&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[on]=e,e.stateNode=r}return et(e),null;case 13:if(ge(ve),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ye&&Ct!==null&&e.mode&1&&!(e.flags&128))Q_(),ei(),e.flags|=98560,i=!1;else if(i=Ba(e),r!==null&&r.dehydrated!==null){if(t===null){if(!i)throw Error(F(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(F(317));i[on]=e}else ei(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;et(e),i=!1}else Gt!==null&&(dh(Gt),Gt=null),i=!0;if(!i)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||ve.current&1?Ve===0&&(Ve=3):Pf())),e.updateQueue!==null&&(e.flags|=4),et(e),null);case 4:return ni(),rh(t,e),t===null&&Io(e.stateNode.containerInfo),et(e),null;case 10:return ff(e.type._context),et(e),null;case 17:return _t(e.type)&&Rl(),et(e),null;case 19:if(ge(ve),i=e.memoizedState,i===null)return et(e),null;if(r=(e.flags&128)!==0,o=i.rendering,o===null)if(r)zi(i,!1);else{if(Ve!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Ll(t),o!==null){for(e.flags|=128,zi(i,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)i=n,t=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=t,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,t=o.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return he(ve,ve.current&1|2),e.child}t=t.sibling}i.tail!==null&&Re()>si&&(e.flags|=128,r=!0,zi(i,!1),e.lanes=4194304)}else{if(!r)if(t=Ll(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),zi(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!ye)return et(e),null}else 2*Re()-i.renderingStartTime>si&&n!==1073741824&&(e.flags|=128,r=!0,zi(i,!1),e.lanes=4194304);i.isBackwards?(o.sibling=e.child,e.child=o):(n=i.last,n!==null?n.sibling=o:e.child=o,i.last=o)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Re(),e.sibling=null,n=ve.current,he(ve,r?n&1|2:n&1),e):(et(e),null);case 22:case 23:return Rf(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?kt&1073741824&&(et(e),e.subtreeFlags&6&&(e.flags|=8192)):et(e),null;case 24:return null;case 25:return null}throw Error(F(156,e.tag))}function BI(t,e){switch(uf(e),e.tag){case 1:return _t(e.type)&&Rl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ni(),ge(vt),ge(ot),vf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return yf(e),null;case 13:if(ge(ve),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(F(340));ei()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ge(ve),null;case 4:return ni(),null;case 10:return ff(e.type._context),null;case 22:case 23:return Rf(),null;case 24:return null;default:return null}}var Wa=!1,rt=!1,zI=typeof WeakSet=="function"?WeakSet:Set,$=null;function Us(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ke(t,e,r)}else n.current=null}function sh(t,e,n){try{n()}catch(r){ke(t,e,r)}}var Ug=!1;function $I(t,e){if(Bd=Sl,t=L_(),af(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,c=0,f=0,m=t,g=null;t:for(;;){for(var A;m!==n||s!==0&&m.nodeType!==3||(l=o+s),m!==i||r!==0&&m.nodeType!==3||(u=o+r),m.nodeType===3&&(o+=m.nodeValue.length),(A=m.firstChild)!==null;)g=m,m=A;for(;;){if(m===t)break t;if(g===n&&++c===s&&(l=o),g===i&&++f===r&&(u=o),(A=m.nextSibling)!==null)break;m=g,g=m.parentNode}m=A}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(zd={focusedElem:t,selectionRange:n},Sl=!1,$=e;$!==null;)if(e=$,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,$=t;else for(;$!==null;){e=$;try{var k=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(k!==null){var b=k.memoizedProps,N=k.memoizedState,x=e.stateNode,T=x.getSnapshotBeforeUpdate(e.elementType===e.type?b:qt(e.type,b),N);x.__reactInternalSnapshotBeforeUpdate=T}break;case 3:var w=e.stateNode.containerInfo;w.nodeType===1?w.textContent="":w.nodeType===9&&w.documentElement&&w.removeChild(w.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(F(163))}}catch(C){ke(e,e.return,C)}if(t=e.sibling,t!==null){t.return=e.return,$=t;break}$=e.return}return k=Ug,Ug=!1,k}function ao(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&t)===t){var i=s.destroy;s.destroy=void 0,i!==void 0&&sh(e,n,i)}s=s.next}while(s!==r)}}function xu(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function ih(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function N0(t){var e=t.alternate;e!==null&&(t.alternate=null,N0(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[on],delete e[Ao],delete e[Hd],delete e[SI],delete e[AI])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function D0(t){return t.tag===5||t.tag===3||t.tag===4}function Fg(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||D0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function oh(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Cl));else if(r!==4&&(t=t.child,t!==null))for(oh(t,e,n),t=t.sibling;t!==null;)oh(t,e,n),t=t.sibling}function ah(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(ah(t,e,n),t=t.sibling;t!==null;)ah(t,e,n),t=t.sibling}var $e=null,Kt=!1;function Jn(t,e,n){for(n=n.child;n!==null;)O0(t,e,n),n=n.sibling}function O0(t,e,n){if(ln&&typeof ln.onCommitFiberUnmount=="function")try{ln.onCommitFiberUnmount(mu,n)}catch{}switch(n.tag){case 5:rt||Us(n,e);case 6:var r=$e,s=Kt;$e=null,Jn(t,e,n),$e=r,Kt=s,$e!==null&&(Kt?(t=$e,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):$e.removeChild(n.stateNode));break;case 18:$e!==null&&(Kt?(t=$e,n=n.stateNode,t.nodeType===8?Hc(t.parentNode,n):t.nodeType===1&&Hc(t,n),Eo(t)):Hc($e,n.stateNode));break;case 4:r=$e,s=Kt,$e=n.stateNode.containerInfo,Kt=!0,Jn(t,e,n),$e=r,Kt=s;break;case 0:case 11:case 14:case 15:if(!rt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&sh(n,e,o),s=s.next}while(s!==r)}Jn(t,e,n);break;case 1:if(!rt&&(Us(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){ke(n,e,l)}Jn(t,e,n);break;case 21:Jn(t,e,n);break;case 22:n.mode&1?(rt=(r=rt)||n.memoizedState!==null,Jn(t,e,n),rt=r):Jn(t,e,n);break;default:Jn(t,e,n)}}function Bg(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new zI),e.forEach(function(r){var s=JI.bind(null,t,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Ht(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:$e=l.stateNode,Kt=!1;break e;case 3:$e=l.stateNode.containerInfo,Kt=!0;break e;case 4:$e=l.stateNode.containerInfo,Kt=!0;break e}l=l.return}if($e===null)throw Error(F(160));O0(i,o,s),$e=null,Kt=!1;var u=s.alternate;u!==null&&(u.return=null),s.return=null}catch(c){ke(s,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)V0(e,t),e=e.sibling}function V0(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Ht(e,t),rn(t),r&4){try{ao(3,t,t.return),xu(3,t)}catch(b){ke(t,t.return,b)}try{ao(5,t,t.return)}catch(b){ke(t,t.return,b)}}break;case 1:Ht(e,t),rn(t),r&512&&n!==null&&Us(n,n.return);break;case 5:if(Ht(e,t),rn(t),r&512&&n!==null&&Us(n,n.return),t.flags&32){var s=t.stateNode;try{yo(s,"")}catch(b){ke(t,t.return,b)}}if(r&4&&(s=t.stateNode,s!=null)){var i=t.memoizedProps,o=n!==null?n.memoizedProps:i,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&r_(s,i),bd(l,o);var c=bd(l,i);for(o=0;o<u.length;o+=2){var f=u[o],m=u[o+1];f==="style"?l_(s,m):f==="dangerouslySetInnerHTML"?o_(s,m):f==="children"?yo(s,m):Kh(s,f,m,c)}switch(l){case"input":Ad(s,i);break;case"textarea":s_(s,i);break;case"select":var g=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var A=i.value;A!=null?zs(s,!!i.multiple,A,!1):g!==!!i.multiple&&(i.defaultValue!=null?zs(s,!!i.multiple,i.defaultValue,!0):zs(s,!!i.multiple,i.multiple?[]:"",!1))}s[Ao]=i}catch(b){ke(t,t.return,b)}}break;case 6:if(Ht(e,t),rn(t),r&4){if(t.stateNode===null)throw Error(F(162));s=t.stateNode,i=t.memoizedProps;try{s.nodeValue=i}catch(b){ke(t,t.return,b)}}break;case 3:if(Ht(e,t),rn(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Eo(e.containerInfo)}catch(b){ke(t,t.return,b)}break;case 4:Ht(e,t),rn(t);break;case 13:Ht(e,t),rn(t),s=t.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(kf=Re())),r&4&&Bg(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(rt=(c=rt)||f,Ht(e,t),rt=c):Ht(e,t),rn(t),r&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!f&&t.mode&1)for($=t,f=t.child;f!==null;){for(m=$=f;$!==null;){switch(g=$,A=g.child,g.tag){case 0:case 11:case 14:case 15:ao(4,g,g.return);break;case 1:Us(g,g.return);var k=g.stateNode;if(typeof k.componentWillUnmount=="function"){r=g,n=g.return;try{e=r,k.props=e.memoizedProps,k.state=e.memoizedState,k.componentWillUnmount()}catch(b){ke(r,n,b)}}break;case 5:Us(g,g.return);break;case 22:if(g.memoizedState!==null){$g(m);continue}}A!==null?(A.return=g,$=A):$g(m)}f=f.sibling}e:for(f=null,m=t;;){if(m.tag===5){if(f===null){f=m;try{s=m.stateNode,c?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=m.stateNode,u=m.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=a_("display",o))}catch(b){ke(t,t.return,b)}}}else if(m.tag===6){if(f===null)try{m.stateNode.nodeValue=c?"":m.memoizedProps}catch(b){ke(t,t.return,b)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===t)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===t)break e;for(;m.sibling===null;){if(m.return===null||m.return===t)break e;f===m&&(f=null),m=m.return}f===m&&(f=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Ht(e,t),rn(t),r&4&&Bg(t);break;case 21:break;default:Ht(e,t),rn(t)}}function rn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(D0(n)){var r=n;break e}n=n.return}throw Error(F(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(yo(s,""),r.flags&=-33);var i=Fg(t);ah(t,i,s);break;case 3:case 4:var o=r.stateNode.containerInfo,l=Fg(t);oh(t,l,o);break;default:throw Error(F(161))}}catch(u){ke(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function WI(t,e,n){$=t,L0(t)}function L0(t,e,n){for(var r=(t.mode&1)!==0;$!==null;){var s=$,i=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||Wa;if(!o){var l=s.alternate,u=l!==null&&l.memoizedState!==null||rt;l=Wa;var c=rt;if(Wa=o,(rt=u)&&!c)for($=s;$!==null;)o=$,u=o.child,o.tag===22&&o.memoizedState!==null?Wg(s):u!==null?(u.return=o,$=u):Wg(s);for(;i!==null;)$=i,L0(i),i=i.sibling;$=s,Wa=l,rt=c}zg(t)}else s.subtreeFlags&8772&&i!==null?(i.return=s,$=i):zg(t)}}function zg(t){for(;$!==null;){var e=$;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:rt||xu(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!rt)if(n===null)r.componentDidMount();else{var s=e.elementType===e.type?n.memoizedProps:qt(e.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&Ag(e,i,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Ag(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var m=f.dehydrated;m!==null&&Eo(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(F(163))}rt||e.flags&512&&ih(e)}catch(g){ke(e,e.return,g)}}if(e===t){$=null;break}if(n=e.sibling,n!==null){n.return=e.return,$=n;break}$=e.return}}function $g(t){for(;$!==null;){var e=$;if(e===t){$=null;break}var n=e.sibling;if(n!==null){n.return=e.return,$=n;break}$=e.return}}function Wg(t){for(;$!==null;){var e=$;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{xu(4,e)}catch(u){ke(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var s=e.return;try{r.componentDidMount()}catch(u){ke(e,s,u)}}var i=e.return;try{ih(e)}catch(u){ke(e,i,u)}break;case 5:var o=e.return;try{ih(e)}catch(u){ke(e,o,u)}}}catch(u){ke(e,e.return,u)}if(e===t){$=null;break}var l=e.sibling;if(l!==null){l.return=e.return,$=l;break}$=e.return}}var HI=Math.ceil,Ul=Hn.ReactCurrentDispatcher,Sf=Hn.ReactCurrentOwner,Mt=Hn.ReactCurrentBatchConfig,oe=0,Ue=null,Ne=null,qe=0,kt=0,Fs=br(0),Ve=0,No=null,ts=0,Iu=0,Af=0,lo=null,mt=null,kf=0,si=1/0,In=null,Fl=!1,lh=null,vr=null,Ha=!1,ur=null,Bl=0,uo=0,uh=null,ll=-1,ul=0;function dt(){return oe&6?Re():ll!==-1?ll:ll=Re()}function _r(t){return t.mode&1?oe&2&&qe!==0?qe&-qe:CI.transition!==null?(ul===0&&(ul=w_()),ul):(t=ue,t!==0||(t=window.event,t=t===void 0?16:k_(t.type)),t):1}function Xt(t,e,n,r){if(50<uo)throw uo=0,uh=null,Error(F(185));Ko(t,n,r),(!(oe&2)||t!==Ue)&&(t===Ue&&(!(oe&2)&&(Iu|=n),Ve===4&&rr(t,qe)),wt(t,r),n===1&&oe===0&&!(e.mode&1)&&(si=Re()+500,wu&&Nr()))}function wt(t,e){var n=t.callbackNode;Cx(t,e);var r=Il(t,t===Ue?qe:0);if(r===0)n!==null&&Zm(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Zm(n),e===1)t.tag===0?kI(Hg.bind(null,t)):q_(Hg.bind(null,t)),xI(function(){!(oe&6)&&Nr()}),n=null;else{switch(E_(r)){case 1:n=Jh;break;case 4:n=v_;break;case 16:n=xl;break;case 536870912:n=__;break;default:n=xl}n=W0(n,j0.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function j0(t,e){if(ll=-1,ul=0,oe&6)throw Error(F(327));var n=t.callbackNode;if(Ks()&&t.callbackNode!==n)return null;var r=Il(t,t===Ue?qe:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=zl(t,r);else{e=r;var s=oe;oe|=2;var i=U0();(Ue!==t||qe!==e)&&(In=null,si=Re()+500,Qr(t,e));do try{GI();break}catch(l){M0(t,l)}while(!0);hf(),Ul.current=i,oe=s,Ne!==null?e=0:(Ue=null,qe=0,e=Ve)}if(e!==0){if(e===2&&(s=Ld(t),s!==0&&(r=s,e=ch(t,s))),e===1)throw n=No,Qr(t,0),rr(t,r),wt(t,Re()),n;if(e===6)rr(t,r);else{if(s=t.current.alternate,!(r&30)&&!qI(s)&&(e=zl(t,r),e===2&&(i=Ld(t),i!==0&&(r=i,e=ch(t,i))),e===1))throw n=No,Qr(t,0),rr(t,r),wt(t,Re()),n;switch(t.finishedWork=s,t.finishedLanes=r,e){case 0:case 1:throw Error(F(345));case 2:zr(t,mt,In);break;case 3:if(rr(t,r),(r&130023424)===r&&(e=kf+500-Re(),10<e)){if(Il(t,0)!==0)break;if(s=t.suspendedLanes,(s&r)!==r){dt(),t.pingedLanes|=t.suspendedLanes&s;break}t.timeoutHandle=Wd(zr.bind(null,t,mt,In),e);break}zr(t,mt,In);break;case 4:if(rr(t,r),(r&4194240)===r)break;for(e=t.eventTimes,s=-1;0<r;){var o=31-Yt(r);i=1<<o,o=e[o],o>s&&(s=o),r&=~i}if(r=s,r=Re()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*HI(r/1960))-r,10<r){t.timeoutHandle=Wd(zr.bind(null,t,mt,In),r);break}zr(t,mt,In);break;case 5:zr(t,mt,In);break;default:throw Error(F(329))}}}return wt(t,Re()),t.callbackNode===n?j0.bind(null,t):null}function ch(t,e){var n=lo;return t.current.memoizedState.isDehydrated&&(Qr(t,e).flags|=256),t=zl(t,e),t!==2&&(e=mt,mt=n,e!==null&&dh(e)),t}function dh(t){mt===null?mt=t:mt.push.apply(mt,t)}function qI(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!Jt(i(),s))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function rr(t,e){for(e&=~Af,e&=~Iu,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Yt(e),r=1<<n;t[n]=-1,e&=~r}}function Hg(t){if(oe&6)throw Error(F(327));Ks();var e=Il(t,0);if(!(e&1))return wt(t,Re()),null;var n=zl(t,e);if(t.tag!==0&&n===2){var r=Ld(t);r!==0&&(e=r,n=ch(t,r))}if(n===1)throw n=No,Qr(t,0),rr(t,e),wt(t,Re()),n;if(n===6)throw Error(F(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,zr(t,mt,In),wt(t,Re()),null}function Cf(t,e){var n=oe;oe|=1;try{return t(e)}finally{oe=n,oe===0&&(si=Re()+500,wu&&Nr())}}function ns(t){ur!==null&&ur.tag===0&&!(oe&6)&&Ks();var e=oe;oe|=1;var n=Mt.transition,r=ue;try{if(Mt.transition=null,ue=1,t)return t()}finally{ue=r,Mt.transition=n,oe=e,!(oe&6)&&Nr()}}function Rf(){kt=Fs.current,ge(Fs)}function Qr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,TI(n)),Ne!==null)for(n=Ne.return;n!==null;){var r=n;switch(uf(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Rl();break;case 3:ni(),ge(vt),ge(ot),vf();break;case 5:yf(r);break;case 4:ni();break;case 13:ge(ve);break;case 19:ge(ve);break;case 10:ff(r.type._context);break;case 22:case 23:Rf()}n=n.return}if(Ue=t,Ne=t=wr(t.current,null),qe=kt=e,Ve=0,No=null,Af=Iu=ts=0,mt=lo=null,Hr!==null){for(e=0;e<Hr.length;e++)if(n=Hr[e],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=s,r.next=o}n.pending=r}Hr=null}return t}function M0(t,e){do{var n=Ne;try{if(hf(),il.current=Ml,jl){for(var r=we.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}jl=!1}if(es=0,Me=Oe=we=null,oo=!1,Ro=0,Sf.current=null,n===null||n.return===null){Ve=1,No=e,Ne=null;break}e:{var i=t,o=n.return,l=n,u=e;if(e=qe,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,f=l,m=f.tag;if(!(f.mode&1)&&(m===0||m===11||m===15)){var g=f.alternate;g?(f.updateQueue=g.updateQueue,f.memoizedState=g.memoizedState,f.lanes=g.lanes):(f.updateQueue=null,f.memoizedState=null)}var A=Ng(o);if(A!==null){A.flags&=-257,Dg(A,o,l,i,e),A.mode&1&&bg(i,c,e),e=A,u=c;var k=e.updateQueue;if(k===null){var b=new Set;b.add(u),e.updateQueue=b}else k.add(u);break e}else{if(!(e&1)){bg(i,c,e),Pf();break e}u=Error(F(426))}}else if(ye&&l.mode&1){var N=Ng(o);if(N!==null){!(N.flags&65536)&&(N.flags|=256),Dg(N,o,l,i,e),cf(ri(u,l));break e}}i=u=ri(u,l),Ve!==4&&(Ve=2),lo===null?lo=[i]:lo.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var x=E0(i,u,e);Sg(i,x);break e;case 1:l=u;var T=i.type,w=i.stateNode;if(!(i.flags&128)&&(typeof T.getDerivedStateFromError=="function"||w!==null&&typeof w.componentDidCatch=="function"&&(vr===null||!vr.has(w)))){i.flags|=65536,e&=-e,i.lanes|=e;var C=T0(i,l,e);Sg(i,C);break e}}i=i.return}while(i!==null)}B0(n)}catch(j){e=j,Ne===n&&n!==null&&(Ne=n=n.return);continue}break}while(!0)}function U0(){var t=Ul.current;return Ul.current=Ml,t===null?Ml:t}function Pf(){(Ve===0||Ve===3||Ve===2)&&(Ve=4),Ue===null||!(ts&268435455)&&!(Iu&268435455)||rr(Ue,qe)}function zl(t,e){var n=oe;oe|=2;var r=U0();(Ue!==t||qe!==e)&&(In=null,Qr(t,e));do try{KI();break}catch(s){M0(t,s)}while(!0);if(hf(),oe=n,Ul.current=r,Ne!==null)throw Error(F(261));return Ue=null,qe=0,Ve}function KI(){for(;Ne!==null;)F0(Ne)}function GI(){for(;Ne!==null&&!_x();)F0(Ne)}function F0(t){var e=$0(t.alternate,t,kt);t.memoizedProps=t.pendingProps,e===null?B0(t):Ne=e,Sf.current=null}function B0(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=BI(n,e),n!==null){n.flags&=32767,Ne=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ve=6,Ne=null;return}}else if(n=FI(n,e,kt),n!==null){Ne=n;return}if(e=e.sibling,e!==null){Ne=e;return}Ne=e=t}while(e!==null);Ve===0&&(Ve=5)}function zr(t,e,n){var r=ue,s=Mt.transition;try{Mt.transition=null,ue=1,QI(t,e,n,r)}finally{Mt.transition=s,ue=r}return null}function QI(t,e,n,r){do Ks();while(ur!==null);if(oe&6)throw Error(F(327));n=t.finishedWork;var s=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(F(177));t.callbackNode=null,t.callbackPriority=0;var i=n.lanes|n.childLanes;if(Rx(t,i),t===Ue&&(Ne=Ue=null,qe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ha||(Ha=!0,W0(xl,function(){return Ks(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Mt.transition,Mt.transition=null;var o=ue;ue=1;var l=oe;oe|=4,Sf.current=null,$I(t,n),V0(n,t),mI(zd),Sl=!!Bd,zd=Bd=null,t.current=n,WI(n),wx(),oe=l,ue=o,Mt.transition=i}else t.current=n;if(Ha&&(Ha=!1,ur=t,Bl=s),i=t.pendingLanes,i===0&&(vr=null),xx(n.stateNode),wt(t,Re()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)s=e[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(Fl)throw Fl=!1,t=lh,lh=null,t;return Bl&1&&t.tag!==0&&Ks(),i=t.pendingLanes,i&1?t===uh?uo++:(uo=0,uh=t):uo=0,Nr(),null}function Ks(){if(ur!==null){var t=E_(Bl),e=Mt.transition,n=ue;try{if(Mt.transition=null,ue=16>t?16:t,ur===null)var r=!1;else{if(t=ur,ur=null,Bl=0,oe&6)throw Error(F(331));var s=oe;for(oe|=4,$=t.current;$!==null;){var i=$,o=i.child;if($.flags&16){var l=i.deletions;if(l!==null){for(var u=0;u<l.length;u++){var c=l[u];for($=c;$!==null;){var f=$;switch(f.tag){case 0:case 11:case 15:ao(8,f,i)}var m=f.child;if(m!==null)m.return=f,$=m;else for(;$!==null;){f=$;var g=f.sibling,A=f.return;if(N0(f),f===c){$=null;break}if(g!==null){g.return=A,$=g;break}$=A}}}var k=i.alternate;if(k!==null){var b=k.child;if(b!==null){k.child=null;do{var N=b.sibling;b.sibling=null,b=N}while(b!==null)}}$=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,$=o;else e:for(;$!==null;){if(i=$,i.flags&2048)switch(i.tag){case 0:case 11:case 15:ao(9,i,i.return)}var x=i.sibling;if(x!==null){x.return=i.return,$=x;break e}$=i.return}}var T=t.current;for($=T;$!==null;){o=$;var w=o.child;if(o.subtreeFlags&2064&&w!==null)w.return=o,$=w;else e:for(o=T;$!==null;){if(l=$,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:xu(9,l)}}catch(j){ke(l,l.return,j)}if(l===o){$=null;break e}var C=l.sibling;if(C!==null){C.return=l.return,$=C;break e}$=l.return}}if(oe=s,Nr(),ln&&typeof ln.onPostCommitFiberRoot=="function")try{ln.onPostCommitFiberRoot(mu,t)}catch{}r=!0}return r}finally{ue=n,Mt.transition=e}}return!1}function qg(t,e,n){e=ri(n,e),e=E0(t,e,1),t=yr(t,e,1),e=dt(),t!==null&&(Ko(t,1,e),wt(t,e))}function ke(t,e,n){if(t.tag===3)qg(t,t,n);else for(;e!==null;){if(e.tag===3){qg(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(vr===null||!vr.has(r))){t=ri(n,t),t=T0(e,t,1),e=yr(e,t,1),t=dt(),e!==null&&(Ko(e,1,t),wt(e,t));break}}e=e.return}}function YI(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=dt(),t.pingedLanes|=t.suspendedLanes&n,Ue===t&&(qe&n)===n&&(Ve===4||Ve===3&&(qe&130023424)===qe&&500>Re()-kf?Qr(t,0):Af|=n),wt(t,e)}function z0(t,e){e===0&&(t.mode&1?(e=Va,Va<<=1,!(Va&130023424)&&(Va=4194304)):e=1);var n=dt();t=Mn(t,e),t!==null&&(Ko(t,e,n),wt(t,n))}function XI(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),z0(t,n)}function JI(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,s=t.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(F(314))}r!==null&&r.delete(e),z0(t,n)}var $0;$0=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||vt.current)yt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return yt=!1,UI(t,e,n);yt=!!(t.flags&131072)}else yt=!1,ye&&e.flags&1048576&&K_(e,Nl,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;al(t,e),t=e.pendingProps;var s=Zs(e,ot.current);qs(e,n),s=wf(null,e,r,t,s,n);var i=Ef();return e.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,_t(r)?(i=!0,Pl(e)):i=!1,e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,mf(e),s.updater=Tu,e.stateNode=s,s._reactInternals=e,Xd(e,r,t,n),e=eh(null,e,r,!0,i,n)):(e.tag=0,ye&&i&&lf(e),ct(null,e,s,n),e=e.child),e;case 16:r=e.elementType;e:{switch(al(t,e),t=e.pendingProps,s=r._init,r=s(r._payload),e.type=r,s=e.tag=e2(r),t=qt(r,t),s){case 0:e=Zd(null,e,r,t,n);break e;case 1:e=Lg(null,e,r,t,n);break e;case 11:e=Og(null,e,r,t,n);break e;case 14:e=Vg(null,e,r,qt(r.type,t),n);break e}throw Error(F(306,r,""))}return e;case 0:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:qt(r,s),Zd(t,e,r,s,n);case 1:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:qt(r,s),Lg(t,e,r,s,n);case 3:e:{if(A0(e),t===null)throw Error(F(387));r=e.pendingProps,i=e.memoizedState,s=i.element,Z_(t,e),Vl(e,r,null,n);var o=e.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){s=ri(Error(F(423)),e),e=jg(t,e,r,n,s);break e}else if(r!==s){s=ri(Error(F(424)),e),e=jg(t,e,r,n,s);break e}else for(Ct=gr(e.stateNode.containerInfo.firstChild),Pt=e,ye=!0,Gt=null,n=X_(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ei(),r===s){e=Un(t,e,n);break e}ct(t,e,r,n)}e=e.child}return e;case 5:return e0(e),t===null&&Gd(e),r=e.type,s=e.pendingProps,i=t!==null?t.memoizedProps:null,o=s.children,$d(r,s)?o=null:i!==null&&$d(r,i)&&(e.flags|=32),S0(t,e),ct(t,e,o,n),e.child;case 6:return t===null&&Gd(e),null;case 13:return k0(t,e,n);case 4:return gf(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=ti(e,null,r,n):ct(t,e,r,n),e.child;case 11:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:qt(r,s),Og(t,e,r,s,n);case 7:return ct(t,e,e.pendingProps,n),e.child;case 8:return ct(t,e,e.pendingProps.children,n),e.child;case 12:return ct(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,s=e.pendingProps,i=e.memoizedProps,o=s.value,he(Dl,r._currentValue),r._currentValue=o,i!==null)if(Jt(i.value,o)){if(i.children===s.children&&!vt.current){e=Un(t,e,n);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=Nn(-1,n&-n),u.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?u.next=u:(u.next=f.next,f.next=u),c.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Qd(i.return,n,e),l.lanes|=n;break}u=u.next}}else if(i.tag===10)o=i.type===e.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(F(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Qd(o,n,e),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}ct(t,e,s.children,n),e=e.child}return e;case 9:return s=e.type,r=e.pendingProps.children,qs(e,n),s=Ft(s),r=r(s),e.flags|=1,ct(t,e,r,n),e.child;case 14:return r=e.type,s=qt(r,e.pendingProps),s=qt(r.type,s),Vg(t,e,r,s,n);case 15:return x0(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:qt(r,s),al(t,e),e.tag=1,_t(r)?(t=!0,Pl(e)):t=!1,qs(e,n),w0(e,r,s),Xd(e,r,s,n),eh(null,e,r,!0,t,n);case 19:return C0(t,e,n);case 22:return I0(t,e,n)}throw Error(F(156,e.tag))};function W0(t,e){return y_(t,e)}function ZI(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function jt(t,e,n,r){return new ZI(t,e,n,r)}function bf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function e2(t){if(typeof t=="function")return bf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Qh)return 11;if(t===Yh)return 14}return 2}function wr(t,e){var n=t.alternate;return n===null?(n=jt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function cl(t,e,n,r,s,i){var o=2;if(r=t,typeof t=="function")bf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Ps:return Yr(n.children,s,i,e);case Gh:o=8,s|=8;break;case Ed:return t=jt(12,n,e,s|2),t.elementType=Ed,t.lanes=i,t;case Td:return t=jt(13,n,e,s),t.elementType=Td,t.lanes=i,t;case xd:return t=jt(19,n,e,s),t.elementType=xd,t.lanes=i,t;case e_:return Su(n,s,i,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Jv:o=10;break e;case Zv:o=9;break e;case Qh:o=11;break e;case Yh:o=14;break e;case er:o=16,r=null;break e}throw Error(F(130,t==null?t:typeof t,""))}return e=jt(o,n,e,s),e.elementType=t,e.type=r,e.lanes=i,e}function Yr(t,e,n,r){return t=jt(7,t,r,e),t.lanes=n,t}function Su(t,e,n,r){return t=jt(22,t,r,e),t.elementType=e_,t.lanes=n,t.stateNode={isHidden:!1},t}function Zc(t,e,n){return t=jt(6,t,null,e),t.lanes=n,t}function ed(t,e,n){return e=jt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function t2(t,e,n,r,s){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Oc(0),this.expirationTimes=Oc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Oc(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Nf(t,e,n,r,s,i,o,l,u){return t=new t2(t,e,n,l,u),e===1?(e=1,i===!0&&(e|=8)):e=0,i=jt(3,null,null,e),t.current=i,i.stateNode=t,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},mf(i),t}function n2(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Rs,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function H0(t){if(!t)return Sr;t=t._reactInternals;e:{if(hs(t)!==t||t.tag!==1)throw Error(F(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(_t(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(F(171))}if(t.tag===1){var n=t.type;if(_t(n))return H_(t,n,e)}return e}function q0(t,e,n,r,s,i,o,l,u){return t=Nf(n,r,!0,t,s,i,o,l,u),t.context=H0(null),n=t.current,r=dt(),s=_r(n),i=Nn(r,s),i.callback=e??null,yr(n,i,s),t.current.lanes=s,Ko(t,s,r),wt(t,r),t}function Au(t,e,n,r){var s=e.current,i=dt(),o=_r(s);return n=H0(n),e.context===null?e.context=n:e.pendingContext=n,e=Nn(i,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=yr(s,e,o),t!==null&&(Xt(t,s,o,i),sl(t,s,o)),o}function $l(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Kg(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Df(t,e){Kg(t,e),(t=t.alternate)&&Kg(t,e)}function r2(){return null}var K0=typeof reportError=="function"?reportError:function(t){console.error(t)};function Of(t){this._internalRoot=t}ku.prototype.render=Of.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(F(409));Au(t,e,null,null)};ku.prototype.unmount=Of.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;ns(function(){Au(null,t,null,null)}),e[jn]=null}};function ku(t){this._internalRoot=t}ku.prototype.unstable_scheduleHydration=function(t){if(t){var e=I_();t={blockedOn:null,target:t,priority:e};for(var n=0;n<nr.length&&e!==0&&e<nr[n].priority;n++);nr.splice(n,0,t),n===0&&A_(t)}};function Vf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Cu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Gg(){}function s2(t,e,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var c=$l(o);i.call(c)}}var o=q0(e,r,t,0,null,!1,!1,"",Gg);return t._reactRootContainer=o,t[jn]=o.current,Io(t.nodeType===8?t.parentNode:t),ns(),o}for(;s=t.lastChild;)t.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var c=$l(u);l.call(c)}}var u=Nf(t,0,!1,null,null,!1,!1,"",Gg);return t._reactRootContainer=u,t[jn]=u.current,Io(t.nodeType===8?t.parentNode:t),ns(function(){Au(e,u,n,r)}),u}function Ru(t,e,n,r,s){var i=n._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var l=s;s=function(){var u=$l(o);l.call(u)}}Au(e,o,t,s)}else o=s2(n,e,t,s,r);return $l(o)}T_=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Ki(e.pendingLanes);n!==0&&(Zh(e,n|1),wt(e,Re()),!(oe&6)&&(si=Re()+500,Nr()))}break;case 13:ns(function(){var r=Mn(t,1);if(r!==null){var s=dt();Xt(r,t,1,s)}}),Df(t,1)}};ef=function(t){if(t.tag===13){var e=Mn(t,134217728);if(e!==null){var n=dt();Xt(e,t,134217728,n)}Df(t,134217728)}};x_=function(t){if(t.tag===13){var e=_r(t),n=Mn(t,e);if(n!==null){var r=dt();Xt(n,t,e,r)}Df(t,e)}};I_=function(){return ue};S_=function(t,e){var n=ue;try{return ue=t,e()}finally{ue=n}};Dd=function(t,e,n){switch(e){case"input":if(Ad(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var s=_u(r);if(!s)throw Error(F(90));n_(r),Ad(r,s)}}}break;case"textarea":s_(t,n);break;case"select":e=n.value,e!=null&&zs(t,!!n.multiple,e,!1)}};d_=Cf;h_=ns;var i2={usingClientEntryPoint:!1,Events:[Qo,Os,_u,u_,c_,Cf]},$i={findFiberByHostInstance:Wr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},o2={bundleType:$i.bundleType,version:$i.version,rendererPackageName:$i.rendererPackageName,rendererConfig:$i.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Hn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=m_(t),t===null?null:t.stateNode},findFiberByHostInstance:$i.findFiberByHostInstance||r2,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var qa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!qa.isDisabled&&qa.supportsFiber)try{mu=qa.inject(o2),ln=qa}catch{}}Dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=i2;Dt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Vf(e))throw Error(F(200));return n2(t,e,null,n)};Dt.createRoot=function(t,e){if(!Vf(t))throw Error(F(299));var n=!1,r="",s=K0;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=Nf(t,1,!1,null,null,n,!1,r,s),t[jn]=e.current,Io(t.nodeType===8?t.parentNode:t),new Of(e)};Dt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(F(188)):(t=Object.keys(t).join(","),Error(F(268,t)));return t=m_(e),t=t===null?null:t.stateNode,t};Dt.flushSync=function(t){return ns(t)};Dt.hydrate=function(t,e,n){if(!Cu(e))throw Error(F(200));return Ru(null,t,e,!0,n)};Dt.hydrateRoot=function(t,e,n){if(!Vf(t))throw Error(F(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",o=K0;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=q0(e,null,t,1,n??null,s,!1,i,o),t[jn]=e.current,Io(t),r)for(t=0;t<r.length;t++)n=r[t],s=n._getVersion,s=s(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,s]:e.mutableSourceEagerHydrationData.push(n,s);return new ku(e)};Dt.render=function(t,e,n){if(!Cu(e))throw Error(F(200));return Ru(null,t,e,!1,n)};Dt.unmountComponentAtNode=function(t){if(!Cu(t))throw Error(F(40));return t._reactRootContainer?(ns(function(){Ru(null,null,t,!1,function(){t._reactRootContainer=null,t[jn]=null})}),!0):!1};Dt.unstable_batchedUpdates=Cf;Dt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!Cu(n))throw Error(F(200));if(t==null||t._reactInternals===void 0)throw Error(F(38));return Ru(t,e,n,!1,r)};Dt.version="18.3.1-next-f1338f8080-20240426";function G0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(G0)}catch(t){console.error(t)}}G0(),Gv.exports=Dt;var a2=Gv.exports,Q0,Qg=a2;Q0=Qg.createRoot,Qg.hydrateRoot;/**
 * @remix-run/router v1.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Do(){return Do=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Do.apply(this,arguments)}var cr;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(cr||(cr={}));const Yg="popstate";function l2(t){t===void 0&&(t={});function e(s,i){let{pathname:o="/",search:l="",hash:u=""}=fs(s.location.hash.substr(1));return!o.startsWith("/")&&!o.startsWith(".")&&(o="/"+o),hh("",{pathname:o,search:l,hash:u},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(s,i){let o=s.document.querySelector("base"),l="";if(o&&o.getAttribute("href")){let u=s.location.href,c=u.indexOf("#");l=c===-1?u:u.slice(0,c)}return l+"#"+(typeof i=="string"?i:Wl(i))}function r(s,i){Pu(s.pathname.charAt(0)==="/","relative pathnames are not supported in hash history.push("+JSON.stringify(i)+")")}return c2(e,n,r,t)}function Pe(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function Pu(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function u2(){return Math.random().toString(36).substr(2,8)}function Xg(t,e){return{usr:t.state,key:t.key,idx:e}}function hh(t,e,n,r){return n===void 0&&(n=null),Do({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?fs(e):e,{state:n,key:e&&e.key||r||u2()})}function Wl(t){let{pathname:e="/",search:n="",hash:r=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(e+=r.charAt(0)==="#"?r:"#"+r),e}function fs(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let r=t.indexOf("?");r>=0&&(e.search=t.substr(r),t=t.substr(0,r)),t&&(e.pathname=t)}return e}function c2(t,e,n,r){r===void 0&&(r={});let{window:s=document.defaultView,v5Compat:i=!1}=r,o=s.history,l=cr.Pop,u=null,c=f();c==null&&(c=0,o.replaceState(Do({},o.state,{idx:c}),""));function f(){return(o.state||{idx:null}).idx}function m(){l=cr.Pop;let N=f(),x=N==null?null:N-c;c=N,u&&u({action:l,location:b.location,delta:x})}function g(N,x){l=cr.Push;let T=hh(b.location,N,x);n&&n(T,N),c=f()+1;let w=Xg(T,c),C=b.createHref(T);try{o.pushState(w,"",C)}catch(j){if(j instanceof DOMException&&j.name==="DataCloneError")throw j;s.location.assign(C)}i&&u&&u({action:l,location:b.location,delta:1})}function A(N,x){l=cr.Replace;let T=hh(b.location,N,x);n&&n(T,N),c=f();let w=Xg(T,c),C=b.createHref(T);o.replaceState(w,"",C),i&&u&&u({action:l,location:b.location,delta:0})}function k(N){let x=s.location.origin!=="null"?s.location.origin:s.location.href,T=typeof N=="string"?N:Wl(N);return T=T.replace(/ $/,"%20"),Pe(x,"No window.location.(origin|href) available to create URL for href: "+T),new URL(T,x)}let b={get action(){return l},get location(){return t(s,o)},listen(N){if(u)throw new Error("A history only accepts one active listener");return s.addEventListener(Yg,m),u=N,()=>{s.removeEventListener(Yg,m),u=null}},createHref(N){return e(s,N)},createURL:k,encodeLocation(N){let x=k(N);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:g,replace:A,go(N){return o.go(N)}};return b}var Jg;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(Jg||(Jg={}));function d2(t,e,n){return n===void 0&&(n="/"),h2(t,e,n)}function h2(t,e,n,r){let s=typeof e=="string"?fs(e):e,i=Lf(s.pathname||"/",n);if(i==null)return null;let o=Y0(t);f2(o);let l=null;for(let u=0;l==null&&u<o.length;++u){let c=S2(i);l=T2(o[u],c)}return l}function Y0(t,e,n,r){e===void 0&&(e=[]),n===void 0&&(n=[]),r===void 0&&(r="");let s=(i,o,l)=>{let u={relativePath:l===void 0?i.path||"":l,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};u.relativePath.startsWith("/")&&(Pe(u.relativePath.startsWith(r),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(r.length));let c=Er([r,u.relativePath]),f=n.concat(u);i.children&&i.children.length>0&&(Pe(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),Y0(i.children,e,f,c)),!(i.path==null&&!i.index)&&e.push({path:c,score:w2(c,i.index),routesMeta:f})};return t.forEach((i,o)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))s(i,o);else for(let u of X0(i.path))s(i,o,u)}),e}function X0(t){let e=t.split("/");if(e.length===0)return[];let[n,...r]=e,s=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return s?[i,""]:[i];let o=X0(r.join("/")),l=[];return l.push(...o.map(u=>u===""?i:[i,u].join("/"))),s&&l.push(...o),l.map(u=>t.startsWith("/")&&u===""?"/":u)}function f2(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:E2(e.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const p2=/^:[\w-]+$/,m2=3,g2=2,y2=1,v2=10,_2=-2,Zg=t=>t==="*";function w2(t,e){let n=t.split("/"),r=n.length;return n.some(Zg)&&(r+=_2),e&&(r+=g2),n.filter(s=>!Zg(s)).reduce((s,i)=>s+(p2.test(i)?m2:i===""?y2:v2),r)}function E2(t,e){return t.length===e.length&&t.slice(0,-1).every((r,s)=>r===e[s])?t[t.length-1]-e[e.length-1]:0}function T2(t,e,n){let{routesMeta:r}=t,s={},i="/",o=[];for(let l=0;l<r.length;++l){let u=r[l],c=l===r.length-1,f=i==="/"?e:e.slice(i.length)||"/",m=x2({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},f),g=u.route;if(!m)return null;Object.assign(s,m.params),o.push({params:s,pathname:Er([i,m.pathname]),pathnameBase:P2(Er([i,m.pathnameBase])),route:g}),m.pathnameBase!=="/"&&(i=Er([i,m.pathnameBase]))}return o}function x2(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,r]=I2(t.path,t.caseSensitive,t.end),s=e.match(n);if(!s)return null;let i=s[0],o=i.replace(/(.)\/+$/,"$1"),l=s.slice(1);return{params:r.reduce((c,f,m)=>{let{paramName:g,isOptional:A}=f;if(g==="*"){let b=l[m]||"";o=i.slice(0,i.length-b.length).replace(/(.)\/+$/,"$1")}const k=l[m];return A&&!k?c[g]=void 0:c[g]=(k||"").replace(/%2F/g,"/"),c},{}),pathname:i,pathnameBase:o,pattern:t}}function I2(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),Pu(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let r=[],s="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,u)=>(r.push({paramName:l,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(r.push({paramName:"*"}),s+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?s+="\\/*$":t!==""&&t!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,e?void 0:"i"),r]}function S2(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Pu(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function Lf(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,r=t.charAt(n);return r&&r!=="/"?null:t.slice(n)||"/"}const A2=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,k2=t=>A2.test(t);function C2(t,e){e===void 0&&(e="/");let{pathname:n,search:r="",hash:s=""}=typeof t=="string"?fs(t):t,i;if(n)if(k2(n))i=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),Pu(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?i=ey(n.substring(1),"/"):i=ey(n,e)}else i=e;return{pathname:i,search:b2(r),hash:N2(s)}}function ey(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(s=>{s===".."?n.length>1&&n.pop():s!=="."&&n.push(s)}),n.length>1?n.join("/"):"/"}function td(t,e,n,r){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function R2(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function jf(t,e){let n=R2(t);return e?n.map((r,s)=>s===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function Mf(t,e,n,r){r===void 0&&(r=!1);let s;typeof t=="string"?s=fs(t):(s=Do({},t),Pe(!s.pathname||!s.pathname.includes("?"),td("?","pathname","search",s)),Pe(!s.pathname||!s.pathname.includes("#"),td("#","pathname","hash",s)),Pe(!s.search||!s.search.includes("#"),td("#","search","hash",s)));let i=t===""||s.pathname==="",o=i?"/":s.pathname,l;if(o==null)l=n;else{let m=e.length-1;if(!r&&o.startsWith("..")){let g=o.split("/");for(;g[0]==="..";)g.shift(),m-=1;s.pathname=g.join("/")}l=m>=0?e[m]:"/"}let u=C2(s,l),c=o&&o!=="/"&&o.endsWith("/"),f=(i||o===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||f)&&(u.pathname+="/"),u}const Er=t=>t.join("/").replace(/\/\/+/g,"/"),P2=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),b2=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,N2=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function D2(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const J0=["post","put","patch","delete"];new Set(J0);const O2=["get",...J0];new Set(O2);/**
 * React Router v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Oo(){return Oo=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},Oo.apply(this,arguments)}const Uf=V.createContext(null),V2=V.createContext(null),Dr=V.createContext(null),bu=V.createContext(null),qn=V.createContext({outlet:null,matches:[],isDataRoute:!1}),Z0=V.createContext(null);function L2(t,e){let{relative:n}=e===void 0?{}:e;gi()||Pe(!1);let{basename:r,navigator:s}=V.useContext(Dr),{hash:i,pathname:o,search:l}=nw(t,{relative:n}),u=o;return r!=="/"&&(u=o==="/"?r:Er([r,o])),s.createHref({pathname:u,search:l,hash:i})}function gi(){return V.useContext(bu)!=null}function yi(){return gi()||Pe(!1),V.useContext(bu).location}function ew(t){V.useContext(Dr).static||V.useLayoutEffect(t)}function Kn(){let{isDataRoute:t}=V.useContext(qn);return t?Q2():j2()}function j2(){gi()||Pe(!1);let t=V.useContext(Uf),{basename:e,future:n,navigator:r}=V.useContext(Dr),{matches:s}=V.useContext(qn),{pathname:i}=yi(),o=JSON.stringify(jf(s,n.v7_relativeSplatPath)),l=V.useRef(!1);return ew(()=>{l.current=!0}),V.useCallback(function(c,f){if(f===void 0&&(f={}),!l.current)return;if(typeof c=="number"){r.go(c);return}let m=Mf(c,JSON.parse(o),i,f.relative==="path");t==null&&e!=="/"&&(m.pathname=m.pathname==="/"?e:Er([e,m.pathname])),(f.replace?r.replace:r.push)(m,f.state,f)},[e,r,o,i,t])}function tw(){let{matches:t}=V.useContext(qn),e=t[t.length-1];return e?e.params:{}}function nw(t,e){let{relative:n}=e===void 0?{}:e,{future:r}=V.useContext(Dr),{matches:s}=V.useContext(qn),{pathname:i}=yi(),o=JSON.stringify(jf(s,r.v7_relativeSplatPath));return V.useMemo(()=>Mf(t,JSON.parse(o),i,n==="path"),[t,o,i,n])}function M2(t,e){return U2(t,e)}function U2(t,e,n,r){gi()||Pe(!1);let{navigator:s}=V.useContext(Dr),{matches:i}=V.useContext(qn),o=i[i.length-1],l=o?o.params:{};o&&o.pathname;let u=o?o.pathnameBase:"/";o&&o.route;let c=yi(),f;if(e){var m;let N=typeof e=="string"?fs(e):e;u==="/"||(m=N.pathname)!=null&&m.startsWith(u)||Pe(!1),f=N}else f=c;let g=f.pathname||"/",A=g;if(u!=="/"){let N=u.replace(/^\//,"").split("/");A="/"+g.replace(/^\//,"").split("/").slice(N.length).join("/")}let k=d2(t,{pathname:A}),b=W2(k&&k.map(N=>Object.assign({},N,{params:Object.assign({},l,N.params),pathname:Er([u,s.encodeLocation?s.encodeLocation(N.pathname).pathname:N.pathname]),pathnameBase:N.pathnameBase==="/"?u:Er([u,s.encodeLocation?s.encodeLocation(N.pathnameBase).pathname:N.pathnameBase])})),i,n,r);return e&&b?V.createElement(bu.Provider,{value:{location:Oo({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:cr.Pop}},b):b}function F2(){let t=G2(),e=D2(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return V.createElement(V.Fragment,null,V.createElement("h2",null,"Unexpected Application Error!"),V.createElement("h3",{style:{fontStyle:"italic"}},e),n?V.createElement("pre",{style:s},n):null,null)}const B2=V.createElement(F2,null);class z2 extends V.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?V.createElement(qn.Provider,{value:this.props.routeContext},V.createElement(Z0.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function $2(t){let{routeContext:e,match:n,children:r}=t,s=V.useContext(Uf);return s&&s.static&&s.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=n.route.id),V.createElement(qn.Provider,{value:e},r)}function W2(t,e,n,r){var s;if(e===void 0&&(e=[]),n===void 0&&(n=null),r===void 0&&(r=null),t==null){var i;if(!n)return null;if(n.errors)t=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let o=t,l=(s=n)==null?void 0:s.errors;if(l!=null){let f=o.findIndex(m=>m.route.id&&(l==null?void 0:l[m.route.id])!==void 0);f>=0||Pe(!1),o=o.slice(0,Math.min(o.length,f+1))}let u=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let f=0;f<o.length;f++){let m=o[f];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(c=f),m.route.id){let{loaderData:g,errors:A}=n,k=m.route.loader&&g[m.route.id]===void 0&&(!A||A[m.route.id]===void 0);if(m.route.lazy||k){u=!0,c>=0?o=o.slice(0,c+1):o=[o[0]];break}}}return o.reduceRight((f,m,g)=>{let A,k=!1,b=null,N=null;n&&(A=l&&m.route.id?l[m.route.id]:void 0,b=m.route.errorElement||B2,u&&(c<0&&g===0?(Y2("route-fallback"),k=!0,N=null):c===g&&(k=!0,N=m.route.hydrateFallbackElement||null)));let x=e.concat(o.slice(0,g+1)),T=()=>{let w;return A?w=b:k?w=N:m.route.Component?w=V.createElement(m.route.Component,null):m.route.element?w=m.route.element:w=f,V.createElement($2,{match:m,routeContext:{outlet:f,matches:x,isDataRoute:n!=null},children:w})};return n&&(m.route.ErrorBoundary||m.route.errorElement||g===0)?V.createElement(z2,{location:n.location,revalidation:n.revalidation,component:b,error:A,children:T(),routeContext:{outlet:null,matches:x,isDataRoute:!0}}):T()},null)}var rw=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(rw||{}),sw=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(sw||{});function H2(t){let e=V.useContext(Uf);return e||Pe(!1),e}function q2(t){let e=V.useContext(V2);return e||Pe(!1),e}function K2(t){let e=V.useContext(qn);return e||Pe(!1),e}function iw(t){let e=K2(),n=e.matches[e.matches.length-1];return n.route.id||Pe(!1),n.route.id}function G2(){var t;let e=V.useContext(Z0),n=q2(),r=iw();return e!==void 0?e:(t=n.errors)==null?void 0:t[r]}function Q2(){let{router:t}=H2(rw.UseNavigateStable),e=iw(sw.UseNavigateStable),n=V.useRef(!1);return ew(()=>{n.current=!0}),V.useCallback(function(s,i){i===void 0&&(i={}),n.current&&(typeof s=="number"?t.navigate(s):t.navigate(s,Oo({fromRouteId:e},i)))},[t,e])}const ty={};function Y2(t,e,n){ty[t]||(ty[t]=!0)}function X2(t,e){t==null||t.v7_startTransition,t==null||t.v7_relativeSplatPath}function J2(t){let{to:e,replace:n,state:r,relative:s}=t;gi()||Pe(!1);let{future:i,static:o}=V.useContext(Dr),{matches:l}=V.useContext(qn),{pathname:u}=yi(),c=Kn(),f=Mf(e,jf(l,i.v7_relativeSplatPath),u,s==="path"),m=JSON.stringify(f);return V.useEffect(()=>c(JSON.parse(m),{replace:n,state:r,relative:s}),[c,m,s,n,r]),null}function At(t){Pe(!1)}function Z2(t){let{basename:e="/",children:n=null,location:r,navigationType:s=cr.Pop,navigator:i,static:o=!1,future:l}=t;gi()&&Pe(!1);let u=e.replace(/^\/*/,"/"),c=V.useMemo(()=>({basename:u,navigator:i,static:o,future:Oo({v7_relativeSplatPath:!1},l)}),[u,l,i,o]);typeof r=="string"&&(r=fs(r));let{pathname:f="/",search:m="",hash:g="",state:A=null,key:k="default"}=r,b=V.useMemo(()=>{let N=Lf(f,u);return N==null?null:{location:{pathname:N,search:m,hash:g,state:A,key:k},navigationType:s}},[u,f,m,g,A,k,s]);return b==null?null:V.createElement(Dr.Provider,{value:c},V.createElement(bu.Provider,{children:n,value:b}))}function eS(t){let{children:e,location:n}=t;return M2(fh(e),n)}new Promise(()=>{});function fh(t,e){e===void 0&&(e=[]);let n=[];return V.Children.forEach(t,(r,s)=>{if(!V.isValidElement(r))return;let i=[...e,s];if(r.type===V.Fragment){n.push.apply(n,fh(r.props.children,i));return}r.type!==At&&Pe(!1),!r.props.index||!r.props.children||Pe(!1);let o={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=fh(r.props.children,i)),n.push(o)}),n}/**
 * React Router DOM v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ph(){return ph=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},ph.apply(this,arguments)}function tS(t,e){if(t==null)return{};var n={},r=Object.keys(t),s,i;for(i=0;i<r.length;i++)s=r[i],!(e.indexOf(s)>=0)&&(n[s]=t[s]);return n}function nS(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function rS(t,e){return t.button===0&&(!e||e==="_self")&&!nS(t)}const sS=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],iS="6";try{window.__reactRouterVersion=iS}catch{}const oS="startTransition",ny=YT[oS];function aS(t){let{basename:e,children:n,future:r,window:s}=t,i=V.useRef();i.current==null&&(i.current=l2({window:s,v5Compat:!0}));let o=i.current,[l,u]=V.useState({action:o.action,location:o.location}),{v7_startTransition:c}=r||{},f=V.useCallback(m=>{c&&ny?ny(()=>u(m)):u(m)},[u,c]);return V.useLayoutEffect(()=>o.listen(f),[o,f]),V.useEffect(()=>X2(r),[r]),V.createElement(Z2,{basename:e,children:n,location:l.location,navigationType:l.action,navigator:o,future:r})}const lS=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",uS=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,ry=V.forwardRef(function(e,n){let{onClick:r,relative:s,reloadDocument:i,replace:o,state:l,target:u,to:c,preventScrollReset:f,viewTransition:m}=e,g=tS(e,sS),{basename:A}=V.useContext(Dr),k,b=!1;if(typeof c=="string"&&uS.test(c)&&(k=c,lS))try{let w=new URL(window.location.href),C=c.startsWith("//")?new URL(w.protocol+c):new URL(c),j=Lf(C.pathname,A);C.origin===w.origin&&j!=null?c=j+C.search+C.hash:b=!0}catch{}let N=L2(c,{relative:s}),x=cS(c,{replace:o,state:l,target:u,preventScrollReset:f,relative:s,viewTransition:m});function T(w){r&&r(w),w.defaultPrevented||x(w)}return V.createElement("a",ph({},g,{href:k||N,onClick:b||i?r:T,ref:n,target:u}))});var sy;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(sy||(sy={}));var iy;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(iy||(iy={}));function cS(t,e){let{target:n,replace:r,state:s,preventScrollReset:i,relative:o,viewTransition:l}=e===void 0?{}:e,u=Kn(),c=yi(),f=nw(t,{relative:o});return V.useCallback(m=>{if(rS(m,n)){m.preventDefault();let g=r!==void 0?r:Wl(c)===Wl(f);u(t,{replace:g,state:s,preventScrollReset:i,relative:o,viewTransition:l})}},[c,u,f,r,s,n,t,i,o,l])}var oy={};/**
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
 */const ow=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},dS=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],l=t[n++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},aw={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,l=o?t[s+1]:0,u=s+2<t.length,c=u?t[s+2]:0,f=i>>2,m=(i&3)<<4|l>>4;let g=(l&15)<<2|c>>6,A=c&63;u||(A=64,o||(g=64)),r.push(n[f],n[m],n[g],n[A])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ow(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):dS(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const m=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||l==null||c==null||m==null)throw new hS;const g=i<<2|l>>4;if(r.push(g),c!==64){const A=l<<4&240|c>>2;if(r.push(A),m!==64){const k=c<<6&192|m;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class hS extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const fS=function(t){const e=ow(t);return aw.encodeByteArray(e,!0)},Hl=function(t){return fS(t).replace(/\./g,"")},lw=function(t){try{return aw.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function pS(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const mS=()=>pS().__FIREBASE_DEFAULTS__,gS=()=>{if(typeof process>"u"||typeof oy>"u")return;const t=oy.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},yS=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&lw(t[1]);return e&&JSON.parse(e)},Nu=()=>{try{return mS()||gS()||yS()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},uw=t=>{var e,n;return(n=(e=Nu())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},cw=t=>{const e=uw(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},dw=()=>{var t;return(t=Nu())===null||t===void 0?void 0:t.config},hw=t=>{var e;return(e=Nu())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class vS{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function fw(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Hl(JSON.stringify(n)),Hl(JSON.stringify(o)),""].join(".")}/**
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
 */function at(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function _S(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(at())}function wS(){var t;const e=(t=Nu())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ES(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function TS(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function xS(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function IS(){const t=at();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function SS(){return!wS()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function pw(){try{return typeof indexedDB=="object"}catch{return!1}}function mw(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}function AS(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const kS="FirebaseError";class nn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=kS,Object.setPrototypeOf(this,nn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ps.prototype.create)}}class ps{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?CS(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new nn(s,l,r)}}function CS(t,e){return t.replace(RS,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const RS=/\{\$([^}]+)}/g;function PS(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function ql(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(ay(i)&&ay(o)){if(!ql(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function ay(t){return t!==null&&typeof t=="object"}/**
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
 */function Xo(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Qi(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Yi(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function bS(t,e){const n=new NS(t,e);return n.subscribe.bind(n)}class NS{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");DS(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=nd),s.error===void 0&&(s.error=nd),s.complete===void 0&&(s.complete=nd);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function DS(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function nd(){}/**
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
 */function Te(t){return t&&t._delegate?t._delegate:t}class zt{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class OS{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new vS;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(LS(e))try{this.getOrInitializeService({instanceIdentifier:$r})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=$r){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$r){return this.instances.has(e)}getOptions(e=$r){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:VS(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=$r){return this.component?this.component.multipleInstances?e:$r:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function VS(t){return t===$r?void 0:t}function LS(t){return t.instantiationMode==="EAGER"}/**
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
 */class jS{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new OS(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ne;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(ne||(ne={}));const MS={debug:ne.DEBUG,verbose:ne.VERBOSE,info:ne.INFO,warn:ne.WARN,error:ne.ERROR,silent:ne.SILENT},US=ne.INFO,FS={[ne.DEBUG]:"log",[ne.VERBOSE]:"log",[ne.INFO]:"info",[ne.WARN]:"warn",[ne.ERROR]:"error"},BS=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=FS[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ff{constructor(e){this.name=e,this._logLevel=US,this._logHandler=BS,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ne))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?MS[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ne.DEBUG,...e),this._logHandler(this,ne.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ne.VERBOSE,...e),this._logHandler(this,ne.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ne.INFO,...e),this._logHandler(this,ne.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ne.WARN,...e),this._logHandler(this,ne.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ne.ERROR,...e),this._logHandler(this,ne.ERROR,...e)}}const zS=(t,e)=>e.some(n=>t instanceof n);let ly,uy;function $S(){return ly||(ly=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function WS(){return uy||(uy=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const gw=new WeakMap,mh=new WeakMap,yw=new WeakMap,rd=new WeakMap,Bf=new WeakMap;function HS(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Dn(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&gw.set(n,t)}).catch(()=>{}),Bf.set(e,t),e}function qS(t){if(mh.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});mh.set(t,e)}let gh={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return mh.get(t);if(e==="objectStoreNames")return t.objectStoreNames||yw.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Dn(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function KS(t){gh=t(gh)}function GS(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(sd(this),e,...n);return yw.set(r,e.sort?e.sort():[e]),Dn(r)}:WS().includes(t)?function(...e){return t.apply(sd(this),e),Dn(gw.get(this))}:function(...e){return Dn(t.apply(sd(this),e))}}function QS(t){return typeof t=="function"?GS(t):(t instanceof IDBTransaction&&qS(t),zS(t,$S())?new Proxy(t,gh):t)}function Dn(t){if(t instanceof IDBRequest)return HS(t);if(rd.has(t))return rd.get(t);const e=QS(t);return e!==t&&(rd.set(t,e),Bf.set(e,t)),e}const sd=t=>Bf.get(t);function Du(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),l=Dn(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Dn(o.result),u.oldVersion,u.newVersion,Dn(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}function id(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",r=>e(r.oldVersion,r)),Dn(n).then(()=>{})}const YS=["get","getKey","getAll","getAllKeys","count"],XS=["put","add","delete","clear"],od=new Map;function cy(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(od.get(e))return od.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=XS.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||YS.includes(n)))return;const i=async function(o,...l){const u=this.transaction(o,s?"readwrite":"readonly");let c=u.store;return r&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),s&&u.done]))[0]};return od.set(e,i),i}KS(t=>({...t,get:(e,n,r)=>cy(e,n)||t.get(e,n,r),has:(e,n)=>!!cy(e,n)||t.has(e,n)}));/**
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
 */class JS{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(ZS(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function ZS(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const yh="@firebase/app",dy="0.10.13";/**
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
 */const Fn=new Ff("@firebase/app"),eA="@firebase/app-compat",tA="@firebase/analytics-compat",nA="@firebase/analytics",rA="@firebase/app-check-compat",sA="@firebase/app-check",iA="@firebase/auth",oA="@firebase/auth-compat",aA="@firebase/database",lA="@firebase/data-connect",uA="@firebase/database-compat",cA="@firebase/functions",dA="@firebase/functions-compat",hA="@firebase/installations",fA="@firebase/installations-compat",pA="@firebase/messaging",mA="@firebase/messaging-compat",gA="@firebase/performance",yA="@firebase/performance-compat",vA="@firebase/remote-config",_A="@firebase/remote-config-compat",wA="@firebase/storage",EA="@firebase/storage-compat",TA="@firebase/firestore",xA="@firebase/vertexai-preview",IA="@firebase/firestore-compat",SA="firebase",AA="10.14.1";/**
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
 */const vh="[DEFAULT]",kA={[yh]:"fire-core",[eA]:"fire-core-compat",[nA]:"fire-analytics",[tA]:"fire-analytics-compat",[sA]:"fire-app-check",[rA]:"fire-app-check-compat",[iA]:"fire-auth",[oA]:"fire-auth-compat",[aA]:"fire-rtdb",[lA]:"fire-data-connect",[uA]:"fire-rtdb-compat",[cA]:"fire-fn",[dA]:"fire-fn-compat",[hA]:"fire-iid",[fA]:"fire-iid-compat",[pA]:"fire-fcm",[mA]:"fire-fcm-compat",[gA]:"fire-perf",[yA]:"fire-perf-compat",[vA]:"fire-rc",[_A]:"fire-rc-compat",[wA]:"fire-gcs",[EA]:"fire-gcs-compat",[TA]:"fire-fst",[IA]:"fire-fst-compat",[xA]:"fire-vertex","fire-js":"fire-js",[SA]:"fire-js-all"};/**
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
 */const Kl=new Map,CA=new Map,_h=new Map;function hy(t,e){try{t.container.addComponent(e)}catch(n){Fn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Zt(t){const e=t.name;if(_h.has(e))return Fn.debug(`There were multiple attempts to register component ${e}.`),!1;_h.set(e,t);for(const n of Kl.values())hy(n,t);for(const n of CA.values())hy(n,t);return!0}function ms(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function an(t){return t.settings!==void 0}/**
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
 */const RA={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Tr=new ps("app","Firebase",RA);/**
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
 */class PA{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new zt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Tr.create("app-deleted",{appName:this._name})}}/**
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
 */const gs=AA;function vw(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:vh,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Tr.create("bad-app-name",{appName:String(s)});if(n||(n=dw()),!n)throw Tr.create("no-options");const i=Kl.get(s);if(i){if(ql(n,i.options)&&ql(r,i.config))return i;throw Tr.create("duplicate-app",{appName:s})}const o=new jS(s);for(const u of _h.values())o.addComponent(u);const l=new PA(n,r,o);return Kl.set(s,l),l}function Ou(t=vh){const e=Kl.get(t);if(!e&&t===vh&&dw())return vw();if(!e)throw Tr.create("no-app",{appName:t});return e}function Et(t,e,n){var r;let s=(r=kA[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Fn.warn(l.join(" "));return}Zt(new zt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const bA="firebase-heartbeat-database",NA=1,Vo="firebase-heartbeat-store";let ad=null;function _w(){return ad||(ad=Du(bA,NA,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Vo)}catch(n){console.warn(n)}}}}).catch(t=>{throw Tr.create("idb-open",{originalErrorMessage:t.message})})),ad}async function DA(t){try{const n=(await _w()).transaction(Vo),r=await n.objectStore(Vo).get(ww(t));return await n.done,r}catch(e){if(e instanceof nn)Fn.warn(e.message);else{const n=Tr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Fn.warn(n.message)}}}async function fy(t,e){try{const r=(await _w()).transaction(Vo,"readwrite");await r.objectStore(Vo).put(e,ww(t)),await r.done}catch(n){if(n instanceof nn)Fn.warn(n.message);else{const r=Tr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Fn.warn(r.message)}}}function ww(t){return`${t.name}!${t.options.appId}`}/**
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
 */const OA=1024,VA=30*24*60*60*1e3;class LA{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new MA(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=py();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=VA}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Fn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=py(),{heartbeatsToSend:r,unsentEntries:s}=jA(this._heartbeatsCache.heartbeats),i=Hl(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return Fn.warn(n),""}}}function py(){return new Date().toISOString().substring(0,10)}function jA(t,e=OA){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),my(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),my(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class MA{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return pw()?mw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await DA(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return fy(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return fy(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function my(t){return Hl(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function UA(t){Zt(new zt("platform-logger",e=>new JS(e),"PRIVATE")),Zt(new zt("heartbeat",e=>new LA(e),"PRIVATE")),Et(yh,dy,t),Et(yh,dy,"esm2017"),Et("fire-js","")}UA("");function zf(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function Ew(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const FA=Ew,Tw=new ps("auth","Firebase",Ew());/**
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
 */const Gl=new Ff("@firebase/auth");function BA(t,...e){Gl.logLevel<=ne.WARN&&Gl.warn(`Auth (${gs}): ${t}`,...e)}function dl(t,...e){Gl.logLevel<=ne.ERROR&&Gl.error(`Auth (${gs}): ${t}`,...e)}/**
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
 */function en(t,...e){throw $f(t,...e)}function cn(t,...e){return $f(t,...e)}function xw(t,e,n){const r=Object.assign(Object.assign({},FA()),{[e]:n});return new ps("auth","Firebase",r).create(e,{appName:t.name})}function On(t){return xw(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function $f(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Tw.create(t,...e)}function Y(t,e,...n){if(!t)throw $f(e,...n)}function Rn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw dl(e),new Error(e)}function Bn(t,e){t||Rn(e)}/**
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
 */function wh(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function zA(){return gy()==="http:"||gy()==="https:"}function gy(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function $A(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(zA()||TS()||"connection"in navigator)?navigator.onLine:!0}function WA(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Jo{constructor(e,n){this.shortDelay=e,this.longDelay=n,Bn(n>e,"Short delay should be less than long delay!"),this.isMobile=_S()||xS()}get(){return $A()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Wf(t,e){Bn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Iw{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Rn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Rn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Rn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const HA={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const qA=new Jo(3e4,6e4);function Or(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Gn(t,e,n,r,s={}){return Sw(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=Xo(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const c=Object.assign({method:e,headers:u},i);return ES()||(c.referrerPolicy="no-referrer"),Iw.fetch()(Aw(t,t.config.apiHost,n,l),c)})}async function Sw(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},HA),e);try{const s=new GA(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Ka(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[u,c]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ka(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Ka(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw Ka(t,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw xw(t,f,c);en(t,f)}}catch(s){if(s instanceof nn)throw s;en(t,"network-request-failed",{message:String(s)})}}async function Zo(t,e,n,r,s={}){const i=await Gn(t,e,n,r,s);return"mfaPendingCredential"in i&&en(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Aw(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Wf(t.config,s):`${t.config.apiScheme}://${s}`}function KA(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class GA{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(cn(this.auth,"network-request-failed")),qA.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Ka(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=cn(t,e,r);return s.customData._tokenResponse=n,s}function yy(t){return t!==void 0&&t.enterprise!==void 0}class QA{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return KA(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function YA(t,e){return Gn(t,"GET","/v2/recaptchaConfig",Or(t,e))}/**
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
 */async function XA(t,e){return Gn(t,"POST","/v1/accounts:delete",e)}async function kw(t,e){return Gn(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function co(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function JA(t,e=!1){const n=Te(t),r=await n.getIdToken(e),s=Hf(r);Y(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:co(ld(s.auth_time)),issuedAtTime:co(ld(s.iat)),expirationTime:co(ld(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function ld(t){return Number(t)*1e3}function Hf(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return dl("JWT malformed, contained fewer than 3 sections"),null;try{const s=lw(n);return s?JSON.parse(s):(dl("Failed to decode base64 JWT payload"),null)}catch(s){return dl("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function vy(t){const e=Hf(t);return Y(e,"internal-error"),Y(typeof e.exp<"u","internal-error"),Y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ii(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof nn&&ZA(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function ZA({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class ek{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Eh{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=co(this.lastLoginAt),this.creationTime=co(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Ql(t){var e;const n=t.auth,r=await t.getIdToken(),s=await ii(t,kw(n,{idToken:r}));Y(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Cw(i.providerUserInfo):[],l=nk(t.providerData,o),u=t.isAnonymous,c=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),f=u?c:!1,m={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new Eh(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(t,m)}async function tk(t){const e=Te(t);await Ql(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function nk(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Cw(t){return t.map(e=>{var{providerId:n}=e,r=zf(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function rk(t,e){const n=await Sw(t,{},async()=>{const r=Xo({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=Aw(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",Iw.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function sk(t,e){return Gn(t,"POST","/v2/accounts:revokeToken",Or(t,e))}/**
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
 */class Gs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Y(e.idToken,"internal-error"),Y(typeof e.idToken<"u","internal-error"),Y(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):vy(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){Y(e.length!==0,"internal-error");const n=vy(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(Y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await rk(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Gs;return r&&(Y(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(Y(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(Y(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Gs,this.toJSON())}_performRefresh(){return Rn("not implemented")}}/**
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
 */function Zn(t,e){Y(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Pn{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=zf(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new ek(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Eh(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await ii(this,this.stsTokenManager.getToken(this.auth,e));return Y(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return JA(this,e)}reload(){return tk(this)}_assign(e){this!==e&&(Y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Pn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){Y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Ql(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(an(this.auth.app))return Promise.reject(On(this.auth));const e=await this.getIdToken();return await ii(this,XA(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,l,u,c,f;const m=(r=n.displayName)!==null&&r!==void 0?r:void 0,g=(s=n.email)!==null&&s!==void 0?s:void 0,A=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,k=(o=n.photoURL)!==null&&o!==void 0?o:void 0,b=(l=n.tenantId)!==null&&l!==void 0?l:void 0,N=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,x=(c=n.createdAt)!==null&&c!==void 0?c:void 0,T=(f=n.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:w,emailVerified:C,isAnonymous:j,providerData:D,stsTokenManager:_}=n;Y(w&&_,e,"internal-error");const y=Gs.fromJSON(this.name,_);Y(typeof w=="string",e,"internal-error"),Zn(m,e.name),Zn(g,e.name),Y(typeof C=="boolean",e,"internal-error"),Y(typeof j=="boolean",e,"internal-error"),Zn(A,e.name),Zn(k,e.name),Zn(b,e.name),Zn(N,e.name),Zn(x,e.name),Zn(T,e.name);const E=new Pn({uid:w,auth:e,email:g,emailVerified:C,displayName:m,isAnonymous:j,photoURL:k,phoneNumber:A,tenantId:b,stsTokenManager:y,createdAt:x,lastLoginAt:T});return D&&Array.isArray(D)&&(E.providerData=D.map(I=>Object.assign({},I))),N&&(E._redirectEventId=N),E}static async _fromIdTokenResponse(e,n,r=!1){const s=new Gs;s.updateFromServerResponse(n);const i=new Pn({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Ql(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];Y(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Cw(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new Gs;l.updateFromIdToken(r);const u=new Pn({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Eh(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,c),u}}/**
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
 */const _y=new Map;function bn(t){Bn(t instanceof Function,"Expected a class definition");let e=_y.get(t);return e?(Bn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,_y.set(t,e),e)}/**
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
 */class Rw{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Rw.type="NONE";const wy=Rw;/**
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
 */function hl(t,e,n){return`firebase:${t}:${e}:${n}`}class Qs{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=hl(this.userKey,s.apiKey,i),this.fullPersistenceKey=hl("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Pn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Qs(bn(wy),e,r);const s=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let i=s[0]||bn(wy);const o=hl(r,e.config.apiKey,e.name);let l=null;for(const c of n)try{const f=await c._get(o);if(f){const m=Pn._fromJSON(e,f);c!==i&&(l=m),i=c;break}}catch{}const u=s.filter(c=>c._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Qs(i,e,r):(i=u[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async c=>{if(c!==i)try{await c._remove(o)}catch{}})),new Qs(i,e,r))}}/**
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
 */function Ey(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Dw(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Pw(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Vw(e))return"Blackberry";if(Lw(e))return"Webos";if(bw(e))return"Safari";if((e.includes("chrome/")||Nw(e))&&!e.includes("edge/"))return"Chrome";if(Ow(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Pw(t=at()){return/firefox\//i.test(t)}function bw(t=at()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Nw(t=at()){return/crios\//i.test(t)}function Dw(t=at()){return/iemobile/i.test(t)}function Ow(t=at()){return/android/i.test(t)}function Vw(t=at()){return/blackberry/i.test(t)}function Lw(t=at()){return/webos/i.test(t)}function qf(t=at()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function ik(t=at()){var e;return qf(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function ok(){return IS()&&document.documentMode===10}function jw(t=at()){return qf(t)||Ow(t)||Lw(t)||Vw(t)||/windows phone/i.test(t)||Dw(t)}/**
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
 */function Mw(t,e=[]){let n;switch(t){case"Browser":n=Ey(at());break;case"Worker":n=`${Ey(at())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${gs}/${r}`}/**
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
 */class ak{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,l)=>{try{const u=e(i);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function lk(t,e={}){return Gn(t,"GET","/v2/passwordPolicy",Or(t,e))}/**
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
 */const uk=6;class ck{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:uk,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class dk{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ty(this),this.idTokenSubscription=new Ty(this),this.beforeStateQueue=new ak(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Tw,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=bn(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Qs.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await kw(this,{idToken:e}),r=await Pn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(an(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Ql(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=WA()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(an(this.app))return Promise.reject(On(this));const n=e?Te(e):null;return n&&Y(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&Y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return an(this.app)?Promise.reject(On(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return an(this.app)?Promise.reject(On(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(bn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await lk(this),n=new ck(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ps("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await sk(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&bn(e)||this._popupRedirectResolver;Y(n,this,"argument-error"),this.redirectPersistenceManager=await Qs.create(this,[bn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(Y(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Mw(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&BA(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function ys(t){return Te(t)}class Ty{constructor(e){this.auth=e,this.observer=null,this.addObserver=bS(n=>this.observer=n)}get next(){return Y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Vu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function hk(t){Vu=t}function Uw(t){return Vu.loadJS(t)}function fk(){return Vu.recaptchaEnterpriseScript}function pk(){return Vu.gapiScript}function mk(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const gk="recaptcha-enterprise",yk="NO_RECAPTCHA";class vk{constructor(e){this.type=gk,this.auth=ys(e)}async verify(e="verify",n=!1){async function r(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,l)=>{YA(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const c=new QA(u);return i.tenantId==null?i._agentRecaptchaConfig=c:i._tenantRecaptchaConfigs[i.tenantId]=c,o(c.siteKey)}}).catch(u=>{l(u)})})}function s(i,o,l){const u=window.grecaptcha;yy(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(c=>{o(c)}).catch(()=>{o(yk)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{r(this.auth).then(l=>{if(!n&&yy(window.grecaptcha))s(l,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=fk();u.length!==0&&(u+=l),Uw(u).then(()=>{s(l,i,o)}).catch(c=>{o(c)})}}).catch(l=>{o(l)})})}}async function xy(t,e,n,r=!1){const s=new vk(t);let i;try{i=await s.verify(n)}catch{i=await s.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Th(t,e,n,r){var s;if(!((s=t._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await xy(t,e,n,n==="getOobCode");return r(t,i)}else return r(t,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await xy(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(i)})}/**
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
 */function _k(t,e){const n=ms(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(ql(i,e??{}))return s;en(s,"already-initialized")}return n.initialize({options:e})}function wk(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(bn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Ek(t,e,n){const r=ys(t);Y(r._canInitEmulator,r,"emulator-config-failed"),Y(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Fw(e),{host:o,port:l}=Tk(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),xk()}function Fw(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Tk(t){const e=Fw(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Iy(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Iy(o)}}}function Iy(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function xk(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class Kf{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Rn("not implemented")}_getIdTokenResponse(e){return Rn("not implemented")}_linkToIdToken(e,n){return Rn("not implemented")}_getReauthenticationResolver(e){return Rn("not implemented")}}async function Ik(t,e){return Gn(t,"POST","/v1/accounts:update",e)}async function Sk(t,e){return Gn(t,"POST","/v1/accounts:signUp",e)}/**
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
 */async function Ak(t,e){return Zo(t,"POST","/v1/accounts:signInWithPassword",Or(t,e))}/**
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
 */async function kk(t,e){return Zo(t,"POST","/v1/accounts:signInWithEmailLink",Or(t,e))}async function Ck(t,e){return Zo(t,"POST","/v1/accounts:signInWithEmailLink",Or(t,e))}/**
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
 */class Lo extends Kf{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new Lo(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Lo(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Th(e,n,"signInWithPassword",Ak);case"emailLink":return kk(e,{email:this._email,oobCode:this._password});default:en(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Th(e,r,"signUpPassword",Sk);case"emailLink":return Ck(e,{idToken:n,email:this._email,oobCode:this._password});default:en(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Ys(t,e){return Zo(t,"POST","/v1/accounts:signInWithIdp",Or(t,e))}/**
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
 */const Rk="http://localhost";class rs extends Kf{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new rs(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):en("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=zf(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new rs(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Ys(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Ys(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ys(e,n)}buildRequest(){const e={requestUri:Rk,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Xo(n)}return e}}/**
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
 */function Pk(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function bk(t){const e=Qi(Yi(t)).link,n=e?Qi(Yi(e)).deep_link_id:null,r=Qi(Yi(t)).deep_link_id;return(r?Qi(Yi(r)).link:null)||r||n||e||t}class Gf{constructor(e){var n,r,s,i,o,l;const u=Qi(Yi(e)),c=(n=u.apiKey)!==null&&n!==void 0?n:null,f=(r=u.oobCode)!==null&&r!==void 0?r:null,m=Pk((s=u.mode)!==null&&s!==void 0?s:null);Y(c&&f&&m,"argument-error"),this.apiKey=c,this.operation=m,this.code=f,this.continueUrl=(i=u.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(l=u.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const n=bk(e);try{return new Gf(n)}catch{return null}}}/**
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
 */class vi{constructor(){this.providerId=vi.PROVIDER_ID}static credential(e,n){return Lo._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Gf.parseLink(n);return Y(r,"argument-error"),Lo._fromEmailAndCode(e,r.code,r.tenantId)}}vi.PROVIDER_ID="password";vi.EMAIL_PASSWORD_SIGN_IN_METHOD="password";vi.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Bw{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ea extends Bw{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class sr extends ea{constructor(){super("facebook.com")}static credential(e){return rs._fromParams({providerId:sr.PROVIDER_ID,signInMethod:sr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return sr.credentialFromTaggedObject(e)}static credentialFromError(e){return sr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return sr.credential(e.oauthAccessToken)}catch{return null}}}sr.FACEBOOK_SIGN_IN_METHOD="facebook.com";sr.PROVIDER_ID="facebook.com";/**
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
 */class ir extends ea{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return rs._fromParams({providerId:ir.PROVIDER_ID,signInMethod:ir.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return ir.credentialFromTaggedObject(e)}static credentialFromError(e){return ir.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return ir.credential(n,r)}catch{return null}}}ir.GOOGLE_SIGN_IN_METHOD="google.com";ir.PROVIDER_ID="google.com";/**
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
 */class or extends ea{constructor(){super("github.com")}static credential(e){return rs._fromParams({providerId:or.PROVIDER_ID,signInMethod:or.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return or.credentialFromTaggedObject(e)}static credentialFromError(e){return or.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return or.credential(e.oauthAccessToken)}catch{return null}}}or.GITHUB_SIGN_IN_METHOD="github.com";or.PROVIDER_ID="github.com";/**
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
 */class ar extends ea{constructor(){super("twitter.com")}static credential(e,n){return rs._fromParams({providerId:ar.PROVIDER_ID,signInMethod:ar.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return ar.credentialFromTaggedObject(e)}static credentialFromError(e){return ar.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return ar.credential(n,r)}catch{return null}}}ar.TWITTER_SIGN_IN_METHOD="twitter.com";ar.PROVIDER_ID="twitter.com";/**
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
 */async function Nk(t,e){return Zo(t,"POST","/v1/accounts:signUp",Or(t,e))}/**
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
 */class ss{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await Pn._fromIdTokenResponse(e,r,s),o=Sy(r);return new ss({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Sy(r);return new ss({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Sy(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class Yl extends nn{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Yl.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Yl(e,n,r,s)}}function zw(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Yl._fromErrorAndOperation(t,i,e,r):i})}async function Dk(t,e,n=!1){const r=await ii(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ss._forOperation(t,"link",r)}/**
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
 */async function Ok(t,e,n=!1){const{auth:r}=t;if(an(r.app))return Promise.reject(On(r));const s="reauthenticate";try{const i=await ii(t,zw(r,s,e,t),n);Y(i.idToken,r,"internal-error");const o=Hf(i.idToken);Y(o,r,"internal-error");const{sub:l}=o;return Y(t.uid===l,r,"user-mismatch"),ss._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&en(r,"user-mismatch"),i}}/**
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
 */async function $w(t,e,n=!1){if(an(t.app))return Promise.reject(On(t));const r="signIn",s=await zw(t,r,e),i=await ss._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}async function Vk(t,e){return $w(ys(t),e)}/**
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
 */async function Ww(t){const e=ys(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Hw(t,e,n){if(an(t.app))return Promise.reject(On(t));const r=ys(t),o=await Th(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Nk).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&Ww(t),u}),l=await ss._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(l.user),l}function Lk(t,e,n){return an(t.app)?Promise.reject(On(t)):Vk(Te(t),vi.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Ww(t),r})}function jk(t,e){return Mk(Te(t),null,e)}async function Mk(t,e,n){const{auth:r}=t,i={idToken:await t.getIdToken(),returnSecureToken:!0};n&&(i.password=n);const o=await ii(t,Ik(r,i));await t._updateTokensIfNecessary(o,!0)}function Uk(t,e,n,r){return Te(t).onIdTokenChanged(e,n,r)}function Fk(t,e,n){return Te(t).beforeAuthStateChanged(e,n)}function Lu(t,e,n,r){return Te(t).onAuthStateChanged(e,n,r)}function Bk(t){return Te(t).signOut()}const Xl="__sak";/**
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
 */class qw{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Xl,"1"),this.storage.removeItem(Xl),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const zk=1e3,$k=10;class Kw extends qw{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=jw(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);ok()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,$k):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},zk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Kw.type="LOCAL";const Wk=Kw;/**
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
 */class Gw extends qw{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Gw.type="SESSION";const Qw=Gw;/**
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
 */function Hk(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class ju{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new ju(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async c=>c(n.origin,i)),u=await Hk(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ju.receivers=[];/**
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
 */function Qf(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class qk{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,u)=>{const c=Qf("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(m){const g=m;if(g.data.eventId===c)switch(g.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(g.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function dn(){return window}function Kk(t){dn().location.href=t}/**
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
 */function Yw(){return typeof dn().WorkerGlobalScope<"u"&&typeof dn().importScripts=="function"}async function Gk(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Qk(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Yk(){return Yw()?self:null}/**
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
 */const Xw="firebaseLocalStorageDb",Xk=1,Jl="firebaseLocalStorage",Jw="fbase_key";class ta{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Mu(t,e){return t.transaction([Jl],e?"readwrite":"readonly").objectStore(Jl)}function Jk(){const t=indexedDB.deleteDatabase(Xw);return new ta(t).toPromise()}function xh(){const t=indexedDB.open(Xw,Xk);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Jl,{keyPath:Jw})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Jl)?e(r):(r.close(),await Jk(),e(await xh()))})})}async function Ay(t,e,n){const r=Mu(t,!0).put({[Jw]:e,value:n});return new ta(r).toPromise()}async function Zk(t,e){const n=Mu(t,!1).get(e),r=await new ta(n).toPromise();return r===void 0?null:r.value}function ky(t,e){const n=Mu(t,!0).delete(e);return new ta(n).toPromise()}const eC=800,tC=3;class Zw{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await xh(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>tC)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Yw()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ju._getInstance(Yk()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Gk(),!this.activeServiceWorker)return;this.sender=new qk(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Qk()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await xh();return await Ay(e,Xl,"1"),await ky(e,Xl),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ay(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Zk(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>ky(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Mu(s,!1).getAll();return new ta(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),eC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Zw.type="LOCAL";const nC=Zw;new Jo(3e4,6e4);/**
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
 */function rC(t,e){return e?bn(e):(Y(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Yf extends Kf{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ys(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ys(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ys(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function sC(t){return $w(t.auth,new Yf(t),t.bypassAuthState)}function iC(t){const{auth:e,user:n}=t;return Y(n,e,"internal-error"),Ok(n,new Yf(t),t.bypassAuthState)}async function oC(t){const{auth:e,user:n}=t;return Y(n,e,"internal-error"),Dk(n,new Yf(t),t.bypassAuthState)}/**
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
 */class e1{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return sC;case"linkViaPopup":case"linkViaRedirect":return oC;case"reauthViaPopup":case"reauthViaRedirect":return iC;default:en(this.auth,"internal-error")}}resolve(e){Bn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Bn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const aC=new Jo(2e3,1e4);class Bs extends e1{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Bs.currentPopupAction&&Bs.currentPopupAction.cancel(),Bs.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Y(e,this.auth,"internal-error"),e}async onExecution(){Bn(this.filter.length===1,"Popup operations only handle one event");const e=Qf();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(cn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(cn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Bs.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(cn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,aC.get())};e()}}Bs.currentPopupAction=null;/**
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
 */const lC="pendingRedirect",fl=new Map;class uC extends e1{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=fl.get(this.auth._key());if(!e){try{const r=await cC(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}fl.set(this.auth._key(),e)}return this.bypassAuthState||fl.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function cC(t,e){const n=fC(e),r=hC(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function dC(t,e){fl.set(t._key(),e)}function hC(t){return bn(t._redirectPersistence)}function fC(t){return hl(lC,t.config.apiKey,t.name)}async function pC(t,e,n=!1){if(an(t.app))return Promise.reject(On(t));const r=ys(t),s=rC(r,e),o=await new uC(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const mC=10*60*1e3;class gC{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!yC(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!t1(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(cn(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=mC&&this.cachedEventUids.clear(),this.cachedEventUids.has(Cy(e))}saveEventToCache(e){this.cachedEventUids.add(Cy(e)),this.lastProcessedEventTime=Date.now()}}function Cy(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function t1({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function yC(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return t1(t);default:return!1}}/**
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
 */async function vC(t,e={}){return Gn(t,"GET","/v1/projects",e)}/**
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
 */const _C=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,wC=/^https?/;async function EC(t){if(t.config.emulator)return;const{authorizedDomains:e}=await vC(t);for(const n of e)try{if(TC(n))return}catch{}en(t,"unauthorized-domain")}function TC(t){const e=wh(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!wC.test(n))return!1;if(_C.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const xC=new Jo(3e4,6e4);function Ry(){const t=dn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function IC(t){return new Promise((e,n)=>{var r,s,i;function o(){Ry(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ry(),n(cn(t,"network-request-failed"))},timeout:xC.get()})}if(!((s=(r=dn().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=dn().gapi)===null||i===void 0)&&i.load)o();else{const l=mk("iframefcb");return dn()[l]=()=>{gapi.load?o():n(cn(t,"network-request-failed"))},Uw(`${pk()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw pl=null,e})}let pl=null;function SC(t){return pl=pl||IC(t),pl}/**
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
 */const AC=new Jo(5e3,15e3),kC="__/auth/iframe",CC="emulator/auth/iframe",RC={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},PC=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function bC(t){const e=t.config;Y(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Wf(e,CC):`https://${t.config.authDomain}/${kC}`,r={apiKey:e.apiKey,appName:t.name,v:gs},s=PC.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${Xo(r).slice(1)}`}async function NC(t){const e=await SC(t),n=dn().gapi;return Y(n,t,"internal-error"),e.open({where:document.body,url:bC(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:RC,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=cn(t,"network-request-failed"),l=dn().setTimeout(()=>{i(o)},AC.get());function u(){dn().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
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
 */const DC={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},OC=500,VC=600,LC="_blank",jC="http://localhost";class Py{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function MC(t,e,n,r=OC,s=VC){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},DC),{width:r.toString(),height:s.toString(),top:i,left:o}),c=at().toLowerCase();n&&(l=Nw(c)?LC:n),Pw(c)&&(e=e||jC,u.scrollbars="yes");const f=Object.entries(u).reduce((g,[A,k])=>`${g}${A}=${k},`,"");if(ik(c)&&l!=="_self")return UC(e||"",l),new Py(null);const m=window.open(e||"",l,f);Y(m,t,"popup-blocked");try{m.focus()}catch{}return new Py(m)}function UC(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const FC="__/auth/handler",BC="emulator/auth/handler",zC=encodeURIComponent("fac");async function by(t,e,n,r,s,i){Y(t.config.authDomain,t,"auth-domain-config-required"),Y(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:gs,eventId:s};if(e instanceof Bw){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",PS(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))o[f]=m}if(e instanceof ea){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(o.scopes=f.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await t._getAppCheckToken(),c=u?`#${zC}=${encodeURIComponent(u)}`:"";return`${$C(t)}?${Xo(l).slice(1)}${c}`}function $C({config:t}){return t.emulator?Wf(t,BC):`https://${t.authDomain}/${FC}`}/**
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
 */const ud="webStorageSupport";class WC{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Qw,this._completeRedirectFn=pC,this._overrideRedirectResult=dC}async _openPopup(e,n,r,s){var i;Bn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await by(e,n,r,wh(),s);return MC(e,o,Qf())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await by(e,n,r,wh(),s);return Kk(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Bn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await NC(e),r=new gC(e);return n.register("authEvent",s=>(Y(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(ud,{type:ud},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[ud];o!==void 0&&n(!!o),en(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=EC(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return jw()||bw()||qf()}}const HC=WC;var Ny="@firebase/auth",Dy="1.7.9";/**
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
 */class qC{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){Y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function KC(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function GC(t){Zt(new zt("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;Y(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Mw(t)},c=new dk(r,s,i,u);return wk(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Zt(new zt("auth-internal",e=>{const n=ys(e.getProvider("auth").getImmediate());return(r=>new qC(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Et(Ny,Dy,KC(t)),Et(Ny,Dy,"esm2017")}/**
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
 */const QC=5*60,YC=hw("authIdTokenMaxAge")||QC;let Oy=null;const XC=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>YC)return;const s=n==null?void 0:n.token;Oy!==s&&(Oy=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function JC(t=Ou()){const e=ms(t,"auth");if(e.isInitialized())return e.getImmediate();const n=_k(t,{popupRedirectResolver:HC,persistence:[nC,Wk,Qw]}),r=hw("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=XC(i.toString());Fk(n,o,()=>o(n.currentUser)),Uk(n,l=>o(l))}}const s=uw("auth");return s&&Ek(n,`http://${s}`),n}function ZC(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}hk({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=cn("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",ZC().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});GC("Browser");var Vy=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Xr,n1;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(_,y){function E(){}E.prototype=y.prototype,_.D=y.prototype,_.prototype=new E,_.prototype.constructor=_,_.C=function(I,R,P){for(var S=Array(arguments.length-2),Q=2;Q<arguments.length;Q++)S[Q-2]=arguments[Q];return y.prototype[R].apply(I,S)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(_,y,E){E||(E=0);var I=Array(16);if(typeof y=="string")for(var R=0;16>R;++R)I[R]=y.charCodeAt(E++)|y.charCodeAt(E++)<<8|y.charCodeAt(E++)<<16|y.charCodeAt(E++)<<24;else for(R=0;16>R;++R)I[R]=y[E++]|y[E++]<<8|y[E++]<<16|y[E++]<<24;y=_.g[0],E=_.g[1],R=_.g[2];var P=_.g[3],S=y+(P^E&(R^P))+I[0]+3614090360&4294967295;y=E+(S<<7&4294967295|S>>>25),S=P+(R^y&(E^R))+I[1]+3905402710&4294967295,P=y+(S<<12&4294967295|S>>>20),S=R+(E^P&(y^E))+I[2]+606105819&4294967295,R=P+(S<<17&4294967295|S>>>15),S=E+(y^R&(P^y))+I[3]+3250441966&4294967295,E=R+(S<<22&4294967295|S>>>10),S=y+(P^E&(R^P))+I[4]+4118548399&4294967295,y=E+(S<<7&4294967295|S>>>25),S=P+(R^y&(E^R))+I[5]+1200080426&4294967295,P=y+(S<<12&4294967295|S>>>20),S=R+(E^P&(y^E))+I[6]+2821735955&4294967295,R=P+(S<<17&4294967295|S>>>15),S=E+(y^R&(P^y))+I[7]+4249261313&4294967295,E=R+(S<<22&4294967295|S>>>10),S=y+(P^E&(R^P))+I[8]+1770035416&4294967295,y=E+(S<<7&4294967295|S>>>25),S=P+(R^y&(E^R))+I[9]+2336552879&4294967295,P=y+(S<<12&4294967295|S>>>20),S=R+(E^P&(y^E))+I[10]+4294925233&4294967295,R=P+(S<<17&4294967295|S>>>15),S=E+(y^R&(P^y))+I[11]+2304563134&4294967295,E=R+(S<<22&4294967295|S>>>10),S=y+(P^E&(R^P))+I[12]+1804603682&4294967295,y=E+(S<<7&4294967295|S>>>25),S=P+(R^y&(E^R))+I[13]+4254626195&4294967295,P=y+(S<<12&4294967295|S>>>20),S=R+(E^P&(y^E))+I[14]+2792965006&4294967295,R=P+(S<<17&4294967295|S>>>15),S=E+(y^R&(P^y))+I[15]+1236535329&4294967295,E=R+(S<<22&4294967295|S>>>10),S=y+(R^P&(E^R))+I[1]+4129170786&4294967295,y=E+(S<<5&4294967295|S>>>27),S=P+(E^R&(y^E))+I[6]+3225465664&4294967295,P=y+(S<<9&4294967295|S>>>23),S=R+(y^E&(P^y))+I[11]+643717713&4294967295,R=P+(S<<14&4294967295|S>>>18),S=E+(P^y&(R^P))+I[0]+3921069994&4294967295,E=R+(S<<20&4294967295|S>>>12),S=y+(R^P&(E^R))+I[5]+3593408605&4294967295,y=E+(S<<5&4294967295|S>>>27),S=P+(E^R&(y^E))+I[10]+38016083&4294967295,P=y+(S<<9&4294967295|S>>>23),S=R+(y^E&(P^y))+I[15]+3634488961&4294967295,R=P+(S<<14&4294967295|S>>>18),S=E+(P^y&(R^P))+I[4]+3889429448&4294967295,E=R+(S<<20&4294967295|S>>>12),S=y+(R^P&(E^R))+I[9]+568446438&4294967295,y=E+(S<<5&4294967295|S>>>27),S=P+(E^R&(y^E))+I[14]+3275163606&4294967295,P=y+(S<<9&4294967295|S>>>23),S=R+(y^E&(P^y))+I[3]+4107603335&4294967295,R=P+(S<<14&4294967295|S>>>18),S=E+(P^y&(R^P))+I[8]+1163531501&4294967295,E=R+(S<<20&4294967295|S>>>12),S=y+(R^P&(E^R))+I[13]+2850285829&4294967295,y=E+(S<<5&4294967295|S>>>27),S=P+(E^R&(y^E))+I[2]+4243563512&4294967295,P=y+(S<<9&4294967295|S>>>23),S=R+(y^E&(P^y))+I[7]+1735328473&4294967295,R=P+(S<<14&4294967295|S>>>18),S=E+(P^y&(R^P))+I[12]+2368359562&4294967295,E=R+(S<<20&4294967295|S>>>12),S=y+(E^R^P)+I[5]+4294588738&4294967295,y=E+(S<<4&4294967295|S>>>28),S=P+(y^E^R)+I[8]+2272392833&4294967295,P=y+(S<<11&4294967295|S>>>21),S=R+(P^y^E)+I[11]+1839030562&4294967295,R=P+(S<<16&4294967295|S>>>16),S=E+(R^P^y)+I[14]+4259657740&4294967295,E=R+(S<<23&4294967295|S>>>9),S=y+(E^R^P)+I[1]+2763975236&4294967295,y=E+(S<<4&4294967295|S>>>28),S=P+(y^E^R)+I[4]+1272893353&4294967295,P=y+(S<<11&4294967295|S>>>21),S=R+(P^y^E)+I[7]+4139469664&4294967295,R=P+(S<<16&4294967295|S>>>16),S=E+(R^P^y)+I[10]+3200236656&4294967295,E=R+(S<<23&4294967295|S>>>9),S=y+(E^R^P)+I[13]+681279174&4294967295,y=E+(S<<4&4294967295|S>>>28),S=P+(y^E^R)+I[0]+3936430074&4294967295,P=y+(S<<11&4294967295|S>>>21),S=R+(P^y^E)+I[3]+3572445317&4294967295,R=P+(S<<16&4294967295|S>>>16),S=E+(R^P^y)+I[6]+76029189&4294967295,E=R+(S<<23&4294967295|S>>>9),S=y+(E^R^P)+I[9]+3654602809&4294967295,y=E+(S<<4&4294967295|S>>>28),S=P+(y^E^R)+I[12]+3873151461&4294967295,P=y+(S<<11&4294967295|S>>>21),S=R+(P^y^E)+I[15]+530742520&4294967295,R=P+(S<<16&4294967295|S>>>16),S=E+(R^P^y)+I[2]+3299628645&4294967295,E=R+(S<<23&4294967295|S>>>9),S=y+(R^(E|~P))+I[0]+4096336452&4294967295,y=E+(S<<6&4294967295|S>>>26),S=P+(E^(y|~R))+I[7]+1126891415&4294967295,P=y+(S<<10&4294967295|S>>>22),S=R+(y^(P|~E))+I[14]+2878612391&4294967295,R=P+(S<<15&4294967295|S>>>17),S=E+(P^(R|~y))+I[5]+4237533241&4294967295,E=R+(S<<21&4294967295|S>>>11),S=y+(R^(E|~P))+I[12]+1700485571&4294967295,y=E+(S<<6&4294967295|S>>>26),S=P+(E^(y|~R))+I[3]+2399980690&4294967295,P=y+(S<<10&4294967295|S>>>22),S=R+(y^(P|~E))+I[10]+4293915773&4294967295,R=P+(S<<15&4294967295|S>>>17),S=E+(P^(R|~y))+I[1]+2240044497&4294967295,E=R+(S<<21&4294967295|S>>>11),S=y+(R^(E|~P))+I[8]+1873313359&4294967295,y=E+(S<<6&4294967295|S>>>26),S=P+(E^(y|~R))+I[15]+4264355552&4294967295,P=y+(S<<10&4294967295|S>>>22),S=R+(y^(P|~E))+I[6]+2734768916&4294967295,R=P+(S<<15&4294967295|S>>>17),S=E+(P^(R|~y))+I[13]+1309151649&4294967295,E=R+(S<<21&4294967295|S>>>11),S=y+(R^(E|~P))+I[4]+4149444226&4294967295,y=E+(S<<6&4294967295|S>>>26),S=P+(E^(y|~R))+I[11]+3174756917&4294967295,P=y+(S<<10&4294967295|S>>>22),S=R+(y^(P|~E))+I[2]+718787259&4294967295,R=P+(S<<15&4294967295|S>>>17),S=E+(P^(R|~y))+I[9]+3951481745&4294967295,_.g[0]=_.g[0]+y&4294967295,_.g[1]=_.g[1]+(R+(S<<21&4294967295|S>>>11))&4294967295,_.g[2]=_.g[2]+R&4294967295,_.g[3]=_.g[3]+P&4294967295}r.prototype.u=function(_,y){y===void 0&&(y=_.length);for(var E=y-this.blockSize,I=this.B,R=this.h,P=0;P<y;){if(R==0)for(;P<=E;)s(this,_,P),P+=this.blockSize;if(typeof _=="string"){for(;P<y;)if(I[R++]=_.charCodeAt(P++),R==this.blockSize){s(this,I),R=0;break}}else for(;P<y;)if(I[R++]=_[P++],R==this.blockSize){s(this,I),R=0;break}}this.h=R,this.o+=y},r.prototype.v=function(){var _=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);_[0]=128;for(var y=1;y<_.length-8;++y)_[y]=0;var E=8*this.o;for(y=_.length-8;y<_.length;++y)_[y]=E&255,E/=256;for(this.u(_),_=Array(16),y=E=0;4>y;++y)for(var I=0;32>I;I+=8)_[E++]=this.g[y]>>>I&255;return _};function i(_,y){var E=l;return Object.prototype.hasOwnProperty.call(E,_)?E[_]:E[_]=y(_)}function o(_,y){this.h=y;for(var E=[],I=!0,R=_.length-1;0<=R;R--){var P=_[R]|0;I&&P==y||(E[R]=P,I=!1)}this.g=E}var l={};function u(_){return-128<=_&&128>_?i(_,function(y){return new o([y|0],0>y?-1:0)}):new o([_|0],0>_?-1:0)}function c(_){if(isNaN(_)||!isFinite(_))return m;if(0>_)return N(c(-_));for(var y=[],E=1,I=0;_>=E;I++)y[I]=_/E|0,E*=4294967296;return new o(y,0)}function f(_,y){if(_.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(_.charAt(0)=="-")return N(f(_.substring(1),y));if(0<=_.indexOf("-"))throw Error('number format error: interior "-" character');for(var E=c(Math.pow(y,8)),I=m,R=0;R<_.length;R+=8){var P=Math.min(8,_.length-R),S=parseInt(_.substring(R,R+P),y);8>P?(P=c(Math.pow(y,P)),I=I.j(P).add(c(S))):(I=I.j(E),I=I.add(c(S)))}return I}var m=u(0),g=u(1),A=u(16777216);t=o.prototype,t.m=function(){if(b(this))return-N(this).m();for(var _=0,y=1,E=0;E<this.g.length;E++){var I=this.i(E);_+=(0<=I?I:4294967296+I)*y,y*=4294967296}return _},t.toString=function(_){if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(k(this))return"0";if(b(this))return"-"+N(this).toString(_);for(var y=c(Math.pow(_,6)),E=this,I="";;){var R=C(E,y).g;E=x(E,R.j(y));var P=((0<E.g.length?E.g[0]:E.h)>>>0).toString(_);if(E=R,k(E))return P+I;for(;6>P.length;)P="0"+P;I=P+I}},t.i=function(_){return 0>_?0:_<this.g.length?this.g[_]:this.h};function k(_){if(_.h!=0)return!1;for(var y=0;y<_.g.length;y++)if(_.g[y]!=0)return!1;return!0}function b(_){return _.h==-1}t.l=function(_){return _=x(this,_),b(_)?-1:k(_)?0:1};function N(_){for(var y=_.g.length,E=[],I=0;I<y;I++)E[I]=~_.g[I];return new o(E,~_.h).add(g)}t.abs=function(){return b(this)?N(this):this},t.add=function(_){for(var y=Math.max(this.g.length,_.g.length),E=[],I=0,R=0;R<=y;R++){var P=I+(this.i(R)&65535)+(_.i(R)&65535),S=(P>>>16)+(this.i(R)>>>16)+(_.i(R)>>>16);I=S>>>16,P&=65535,S&=65535,E[R]=S<<16|P}return new o(E,E[E.length-1]&-2147483648?-1:0)};function x(_,y){return _.add(N(y))}t.j=function(_){if(k(this)||k(_))return m;if(b(this))return b(_)?N(this).j(N(_)):N(N(this).j(_));if(b(_))return N(this.j(N(_)));if(0>this.l(A)&&0>_.l(A))return c(this.m()*_.m());for(var y=this.g.length+_.g.length,E=[],I=0;I<2*y;I++)E[I]=0;for(I=0;I<this.g.length;I++)for(var R=0;R<_.g.length;R++){var P=this.i(I)>>>16,S=this.i(I)&65535,Q=_.i(R)>>>16,Ie=_.i(R)&65535;E[2*I+2*R]+=S*Ie,T(E,2*I+2*R),E[2*I+2*R+1]+=P*Ie,T(E,2*I+2*R+1),E[2*I+2*R+1]+=S*Q,T(E,2*I+2*R+1),E[2*I+2*R+2]+=P*Q,T(E,2*I+2*R+2)}for(I=0;I<y;I++)E[I]=E[2*I+1]<<16|E[2*I];for(I=y;I<2*y;I++)E[I]=0;return new o(E,0)};function T(_,y){for(;(_[y]&65535)!=_[y];)_[y+1]+=_[y]>>>16,_[y]&=65535,y++}function w(_,y){this.g=_,this.h=y}function C(_,y){if(k(y))throw Error("division by zero");if(k(_))return new w(m,m);if(b(_))return y=C(N(_),y),new w(N(y.g),N(y.h));if(b(y))return y=C(_,N(y)),new w(N(y.g),y.h);if(30<_.g.length){if(b(_)||b(y))throw Error("slowDivide_ only works with positive integers.");for(var E=g,I=y;0>=I.l(_);)E=j(E),I=j(I);var R=D(E,1),P=D(I,1);for(I=D(I,2),E=D(E,2);!k(I);){var S=P.add(I);0>=S.l(_)&&(R=R.add(E),P=S),I=D(I,1),E=D(E,1)}return y=x(_,R.j(y)),new w(R,y)}for(R=m;0<=_.l(y);){for(E=Math.max(1,Math.floor(_.m()/y.m())),I=Math.ceil(Math.log(E)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),P=c(E),S=P.j(y);b(S)||0<S.l(_);)E-=I,P=c(E),S=P.j(y);k(P)&&(P=g),R=R.add(P),_=x(_,S)}return new w(R,_)}t.A=function(_){return C(this,_).h},t.and=function(_){for(var y=Math.max(this.g.length,_.g.length),E=[],I=0;I<y;I++)E[I]=this.i(I)&_.i(I);return new o(E,this.h&_.h)},t.or=function(_){for(var y=Math.max(this.g.length,_.g.length),E=[],I=0;I<y;I++)E[I]=this.i(I)|_.i(I);return new o(E,this.h|_.h)},t.xor=function(_){for(var y=Math.max(this.g.length,_.g.length),E=[],I=0;I<y;I++)E[I]=this.i(I)^_.i(I);return new o(E,this.h^_.h)};function j(_){for(var y=_.g.length+1,E=[],I=0;I<y;I++)E[I]=_.i(I)<<1|_.i(I-1)>>>31;return new o(E,_.h)}function D(_,y){var E=y>>5;y%=32;for(var I=_.g.length-E,R=[],P=0;P<I;P++)R[P]=0<y?_.i(P+E)>>>y|_.i(P+E+1)<<32-y:_.i(P+E);return new o(R,_.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,n1=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=f,Xr=o}).apply(typeof Vy<"u"?Vy:typeof self<"u"?self:typeof window<"u"?window:{});var Ga=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var r1,Xi,s1,ml,Ih,i1,o1,a1;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,d,p){return a==Array.prototype||a==Object.prototype||(a[d]=p.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ga=="object"&&Ga];for(var d=0;d<a.length;++d){var p=a[d];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var r=n(this);function s(a,d){if(d)e:{var p=r;a=a.split(".");for(var v=0;v<a.length-1;v++){var O=a[v];if(!(O in p))break e;p=p[O]}a=a[a.length-1],v=p[a],d=d(v),d!=v&&d!=null&&e(p,a,{configurable:!0,writable:!0,value:d})}}function i(a,d){a instanceof String&&(a+="");var p=0,v=!1,O={next:function(){if(!v&&p<a.length){var L=p++;return{value:d(L,a[L]),done:!1}}return v=!0,{done:!0,value:void 0}}};return O[Symbol.iterator]=function(){return O},O}s("Array.prototype.values",function(a){return a||function(){return i(this,function(d,p){return p})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(a){var d=typeof a;return d=d!="object"?d:a?Array.isArray(a)?"array":d:"null",d=="array"||d=="object"&&typeof a.length=="number"}function c(a){var d=typeof a;return d=="object"&&a!=null||d=="function"}function f(a,d,p){return a.call.apply(a.bind,arguments)}function m(a,d,p){if(!a)throw Error();if(2<arguments.length){var v=Array.prototype.slice.call(arguments,2);return function(){var O=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(O,v),a.apply(d,O)}}return function(){return a.apply(d,arguments)}}function g(a,d,p){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,g.apply(null,arguments)}function A(a,d){var p=Array.prototype.slice.call(arguments,1);return function(){var v=p.slice();return v.push.apply(v,arguments),a.apply(this,v)}}function k(a,d){function p(){}p.prototype=d.prototype,a.aa=d.prototype,a.prototype=new p,a.prototype.constructor=a,a.Qb=function(v,O,L){for(var z=Array(arguments.length-2),de=2;de<arguments.length;de++)z[de-2]=arguments[de];return d.prototype[O].apply(v,z)}}function b(a){const d=a.length;if(0<d){const p=Array(d);for(let v=0;v<d;v++)p[v]=a[v];return p}return[]}function N(a,d){for(let p=1;p<arguments.length;p++){const v=arguments[p];if(u(v)){const O=a.length||0,L=v.length||0;a.length=O+L;for(let z=0;z<L;z++)a[O+z]=v[z]}else a.push(v)}}class x{constructor(d,p){this.i=d,this.j=p,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function T(a){return/^[\s\xa0]*$/.test(a)}function w(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function C(a){return C[" "](a),a}C[" "]=function(){};var j=w().indexOf("Gecko")!=-1&&!(w().toLowerCase().indexOf("webkit")!=-1&&w().indexOf("Edge")==-1)&&!(w().indexOf("Trident")!=-1||w().indexOf("MSIE")!=-1)&&w().indexOf("Edge")==-1;function D(a,d,p){for(const v in a)d.call(p,a[v],v,a)}function _(a,d){for(const p in a)d.call(void 0,a[p],p,a)}function y(a){const d={};for(const p in a)d[p]=a[p];return d}const E="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(a,d){let p,v;for(let O=1;O<arguments.length;O++){v=arguments[O];for(p in v)a[p]=v[p];for(let L=0;L<E.length;L++)p=E[L],Object.prototype.hasOwnProperty.call(v,p)&&(a[p]=v[p])}}function R(a){var d=1;a=a.split(":");const p=[];for(;0<d&&a.length;)p.push(a.shift()),d--;return a.length&&p.push(a.join(":")),p}function P(a){l.setTimeout(()=>{throw a},0)}function S(){var a=q;let d=null;return a.g&&(d=a.g,a.g=a.g.next,a.g||(a.h=null),d.next=null),d}class Q{constructor(){this.h=this.g=null}add(d,p){const v=Ie.get();v.set(d,p),this.h?this.h.next=v:this.g=v,this.h=v}}var Ie=new x(()=>new It,a=>a.reset());class It{constructor(){this.next=this.g=this.h=null}set(d,p){this.h=d,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let Be,B=!1,q=new Q,K=()=>{const a=l.Promise.resolve(void 0);Be=()=>{a.then(re)}};var re=()=>{for(var a;a=S();){try{a.h.call(a.g)}catch(p){P(p)}var d=Ie;d.j(a),100>d.h&&(d.h++,a.next=d.g,d.g=a)}B=!1};function ie(){this.s=this.s,this.C=this.C}ie.prototype.s=!1,ie.prototype.ma=function(){this.s||(this.s=!0,this.N())},ie.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Se(a,d){this.type=a,this.g=this.target=d,this.defaultPrevented=!1}Se.prototype.h=function(){this.defaultPrevented=!0};var $t=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,d=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const p=()=>{};l.addEventListener("test",p,d),l.removeEventListener("test",p,d)}catch{}return a}();function _n(a,d){if(Se.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var p=this.type=a.type,v=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=d,d=a.relatedTarget){if(j){e:{try{C(d.nodeName);var O=!0;break e}catch{}O=!1}O||(d=null)}}else p=="mouseover"?d=a.fromElement:p=="mouseout"&&(d=a.toElement);this.relatedTarget=d,v?(this.clientX=v.clientX!==void 0?v.clientX:v.pageX,this.clientY=v.clientY!==void 0?v.clientY:v.pageY,this.screenX=v.screenX||0,this.screenY=v.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:wn[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&_n.aa.h.call(this)}}k(_n,Se);var wn={2:"touch",3:"pen",4:"mouse"};_n.prototype.h=function(){_n.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var En="closure_listenable_"+(1e6*Math.random()|0),nT=0;function rT(a,d,p,v,O){this.listener=a,this.proxy=null,this.src=d,this.type=p,this.capture=!!v,this.ha=O,this.key=++nT,this.da=this.fa=!1}function ha(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function fa(a){this.src=a,this.g={},this.h=0}fa.prototype.add=function(a,d,p,v,O){var L=a.toString();a=this.g[L],a||(a=this.g[L]=[],this.h++);var z=ac(a,d,v,O);return-1<z?(d=a[z],p||(d.fa=!1)):(d=new rT(d,this.src,L,!!v,O),d.fa=p,a.push(d)),d};function oc(a,d){var p=d.type;if(p in a.g){var v=a.g[p],O=Array.prototype.indexOf.call(v,d,void 0),L;(L=0<=O)&&Array.prototype.splice.call(v,O,1),L&&(ha(d),a.g[p].length==0&&(delete a.g[p],a.h--))}}function ac(a,d,p,v){for(var O=0;O<a.length;++O){var L=a[O];if(!L.da&&L.listener==d&&L.capture==!!p&&L.ha==v)return O}return-1}var lc="closure_lm_"+(1e6*Math.random()|0),uc={};function zp(a,d,p,v,O){if(Array.isArray(d)){for(var L=0;L<d.length;L++)zp(a,d[L],p,v,O);return null}return p=Hp(p),a&&a[En]?a.K(d,p,c(v)?!!v.capture:!1,O):sT(a,d,p,!1,v,O)}function sT(a,d,p,v,O,L){if(!d)throw Error("Invalid event type");var z=c(O)?!!O.capture:!!O,de=dc(a);if(de||(a[lc]=de=new fa(a)),p=de.add(d,p,v,z,L),p.proxy)return p;if(v=iT(),p.proxy=v,v.src=a,v.listener=p,a.addEventListener)$t||(O=z),O===void 0&&(O=!1),a.addEventListener(d.toString(),v,O);else if(a.attachEvent)a.attachEvent(Wp(d.toString()),v);else if(a.addListener&&a.removeListener)a.addListener(v);else throw Error("addEventListener and attachEvent are unavailable.");return p}function iT(){function a(p){return d.call(a.src,a.listener,p)}const d=oT;return a}function $p(a,d,p,v,O){if(Array.isArray(d))for(var L=0;L<d.length;L++)$p(a,d[L],p,v,O);else v=c(v)?!!v.capture:!!v,p=Hp(p),a&&a[En]?(a=a.i,d=String(d).toString(),d in a.g&&(L=a.g[d],p=ac(L,p,v,O),-1<p&&(ha(L[p]),Array.prototype.splice.call(L,p,1),L.length==0&&(delete a.g[d],a.h--)))):a&&(a=dc(a))&&(d=a.g[d.toString()],a=-1,d&&(a=ac(d,p,v,O)),(p=-1<a?d[a]:null)&&cc(p))}function cc(a){if(typeof a!="number"&&a&&!a.da){var d=a.src;if(d&&d[En])oc(d.i,a);else{var p=a.type,v=a.proxy;d.removeEventListener?d.removeEventListener(p,v,a.capture):d.detachEvent?d.detachEvent(Wp(p),v):d.addListener&&d.removeListener&&d.removeListener(v),(p=dc(d))?(oc(p,a),p.h==0&&(p.src=null,d[lc]=null)):ha(a)}}}function Wp(a){return a in uc?uc[a]:uc[a]="on"+a}function oT(a,d){if(a.da)a=!0;else{d=new _n(d,this);var p=a.listener,v=a.ha||a.src;a.fa&&cc(a),a=p.call(v,d)}return a}function dc(a){return a=a[lc],a instanceof fa?a:null}var hc="__closure_events_fn_"+(1e9*Math.random()>>>0);function Hp(a){return typeof a=="function"?a:(a[hc]||(a[hc]=function(d){return a.handleEvent(d)}),a[hc])}function Ye(){ie.call(this),this.i=new fa(this),this.M=this,this.F=null}k(Ye,ie),Ye.prototype[En]=!0,Ye.prototype.removeEventListener=function(a,d,p,v){$p(this,a,d,p,v)};function lt(a,d){var p,v=a.F;if(v)for(p=[];v;v=v.F)p.push(v);if(a=a.M,v=d.type||d,typeof d=="string")d=new Se(d,a);else if(d instanceof Se)d.target=d.target||a;else{var O=d;d=new Se(v,a),I(d,O)}if(O=!0,p)for(var L=p.length-1;0<=L;L--){var z=d.g=p[L];O=pa(z,v,!0,d)&&O}if(z=d.g=a,O=pa(z,v,!0,d)&&O,O=pa(z,v,!1,d)&&O,p)for(L=0;L<p.length;L++)z=d.g=p[L],O=pa(z,v,!1,d)&&O}Ye.prototype.N=function(){if(Ye.aa.N.call(this),this.i){var a=this.i,d;for(d in a.g){for(var p=a.g[d],v=0;v<p.length;v++)ha(p[v]);delete a.g[d],a.h--}}this.F=null},Ye.prototype.K=function(a,d,p,v){return this.i.add(String(a),d,!1,p,v)},Ye.prototype.L=function(a,d,p,v){return this.i.add(String(a),d,!0,p,v)};function pa(a,d,p,v){if(d=a.i.g[String(d)],!d)return!0;d=d.concat();for(var O=!0,L=0;L<d.length;++L){var z=d[L];if(z&&!z.da&&z.capture==p){var de=z.listener,ze=z.ha||z.src;z.fa&&oc(a.i,z),O=de.call(ze,v)!==!1&&O}}return O&&!v.defaultPrevented}function qp(a,d,p){if(typeof a=="function")p&&(a=g(a,p));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:l.setTimeout(a,d||0)}function Kp(a){a.g=qp(()=>{a.g=null,a.i&&(a.i=!1,Kp(a))},a.l);const d=a.h;a.h=null,a.m.apply(null,d)}class aT extends ie{constructor(d,p){super(),this.m=d,this.l=p,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:Kp(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function xi(a){ie.call(this),this.h=a,this.g={}}k(xi,ie);var Gp=[];function Qp(a){D(a.g,function(d,p){this.g.hasOwnProperty(p)&&cc(d)},a),a.g={}}xi.prototype.N=function(){xi.aa.N.call(this),Qp(this)},xi.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var fc=l.JSON.stringify,lT=l.JSON.parse,uT=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function pc(){}pc.prototype.h=null;function Yp(a){return a.h||(a.h=a.i())}function Xp(){}var Ii={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function mc(){Se.call(this,"d")}k(mc,Se);function gc(){Se.call(this,"c")}k(gc,Se);var Lr={},Jp=null;function ma(){return Jp=Jp||new Ye}Lr.La="serverreachability";function Zp(a){Se.call(this,Lr.La,a)}k(Zp,Se);function Si(a){const d=ma();lt(d,new Zp(d))}Lr.STAT_EVENT="statevent";function em(a,d){Se.call(this,Lr.STAT_EVENT,a),this.stat=d}k(em,Se);function ut(a){const d=ma();lt(d,new em(d,a))}Lr.Ma="timingevent";function tm(a,d){Se.call(this,Lr.Ma,a),this.size=d}k(tm,Se);function Ai(a,d){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},d)}function ki(){this.g=!0}ki.prototype.xa=function(){this.g=!1};function cT(a,d,p,v,O,L){a.info(function(){if(a.g)if(L)for(var z="",de=L.split("&"),ze=0;ze<de.length;ze++){var ae=de[ze].split("=");if(1<ae.length){var Xe=ae[0];ae=ae[1];var Je=Xe.split("_");z=2<=Je.length&&Je[1]=="type"?z+(Xe+"="+ae+"&"):z+(Xe+"=redacted&")}}else z=null;else z=L;return"XMLHTTP REQ ("+v+") [attempt "+O+"]: "+d+`
`+p+`
`+z})}function dT(a,d,p,v,O,L,z){a.info(function(){return"XMLHTTP RESP ("+v+") [ attempt "+O+"]: "+d+`
`+p+`
`+L+" "+z})}function Es(a,d,p,v){a.info(function(){return"XMLHTTP TEXT ("+d+"): "+fT(a,p)+(v?" "+v:"")})}function hT(a,d){a.info(function(){return"TIMEOUT: "+d})}ki.prototype.info=function(){};function fT(a,d){if(!a.g)return d;if(!d)return null;try{var p=JSON.parse(d);if(p){for(a=0;a<p.length;a++)if(Array.isArray(p[a])){var v=p[a];if(!(2>v.length)){var O=v[1];if(Array.isArray(O)&&!(1>O.length)){var L=O[0];if(L!="noop"&&L!="stop"&&L!="close")for(var z=1;z<O.length;z++)O[z]=""}}}}return fc(p)}catch{return d}}var ga={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},nm={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},yc;function ya(){}k(ya,pc),ya.prototype.g=function(){return new XMLHttpRequest},ya.prototype.i=function(){return{}},yc=new ya;function Qn(a,d,p,v){this.j=a,this.i=d,this.l=p,this.R=v||1,this.U=new xi(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new rm}function rm(){this.i=null,this.g="",this.h=!1}var sm={},vc={};function _c(a,d,p){a.L=1,a.v=Ea(Tn(d)),a.m=p,a.P=!0,im(a,null)}function im(a,d){a.F=Date.now(),va(a),a.A=Tn(a.v);var p=a.A,v=a.R;Array.isArray(v)||(v=[String(v)]),_m(p.i,"t",v),a.C=0,p=a.j.J,a.h=new rm,a.g=jm(a.j,p?d:null,!a.m),0<a.O&&(a.M=new aT(g(a.Y,a,a.g),a.O)),d=a.U,p=a.g,v=a.ca;var O="readystatechange";Array.isArray(O)||(O&&(Gp[0]=O.toString()),O=Gp);for(var L=0;L<O.length;L++){var z=zp(p,O[L],v||d.handleEvent,!1,d.h||d);if(!z)break;d.g[z.key]=z}d=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,d)):(a.u="GET",a.g.ea(a.A,a.u,null,d)),Si(),cT(a.i,a.u,a.A,a.l,a.R,a.m)}Qn.prototype.ca=function(a){a=a.target;const d=this.M;d&&xn(a)==3?d.j():this.Y(a)},Qn.prototype.Y=function(a){try{if(a==this.g)e:{const Je=xn(this.g);var d=this.g.Ba();const Is=this.g.Z();if(!(3>Je)&&(Je!=3||this.g&&(this.h.h||this.g.oa()||Am(this.g)))){this.J||Je!=4||d==7||(d==8||0>=Is?Si(3):Si(2)),wc(this);var p=this.g.Z();this.X=p;t:if(om(this)){var v=Am(this.g);a="";var O=v.length,L=xn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){jr(this),Ci(this);var z="";break t}this.h.i=new l.TextDecoder}for(d=0;d<O;d++)this.h.h=!0,a+=this.h.i.decode(v[d],{stream:!(L&&d==O-1)});v.length=0,this.h.g+=a,this.C=0,z=this.h.g}else z=this.g.oa();if(this.o=p==200,dT(this.i,this.u,this.A,this.l,this.R,Je,p),this.o){if(this.T&&!this.K){t:{if(this.g){var de,ze=this.g;if((de=ze.g?ze.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!T(de)){var ae=de;break t}}ae=null}if(p=ae)Es(this.i,this.l,p,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ec(this,p);else{this.o=!1,this.s=3,ut(12),jr(this),Ci(this);break e}}if(this.P){p=!0;let Wt;for(;!this.J&&this.C<z.length;)if(Wt=pT(this,z),Wt==vc){Je==4&&(this.s=4,ut(14),p=!1),Es(this.i,this.l,null,"[Incomplete Response]");break}else if(Wt==sm){this.s=4,ut(15),Es(this.i,this.l,z,"[Invalid Chunk]"),p=!1;break}else Es(this.i,this.l,Wt,null),Ec(this,Wt);if(om(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Je!=4||z.length!=0||this.h.h||(this.s=1,ut(16),p=!1),this.o=this.o&&p,!p)Es(this.i,this.l,z,"[Invalid Chunked Response]"),jr(this),Ci(this);else if(0<z.length&&!this.W){this.W=!0;var Xe=this.j;Xe.g==this&&Xe.ba&&!Xe.M&&(Xe.j.info("Great, no buffering proxy detected. Bytes received: "+z.length),kc(Xe),Xe.M=!0,ut(11))}}else Es(this.i,this.l,z,null),Ec(this,z);Je==4&&jr(this),this.o&&!this.J&&(Je==4?Dm(this.j,this):(this.o=!1,va(this)))}else bT(this.g),p==400&&0<z.indexOf("Unknown SID")?(this.s=3,ut(12)):(this.s=0,ut(13)),jr(this),Ci(this)}}}catch{}finally{}};function om(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function pT(a,d){var p=a.C,v=d.indexOf(`
`,p);return v==-1?vc:(p=Number(d.substring(p,v)),isNaN(p)?sm:(v+=1,v+p>d.length?vc:(d=d.slice(v,v+p),a.C=v+p,d)))}Qn.prototype.cancel=function(){this.J=!0,jr(this)};function va(a){a.S=Date.now()+a.I,am(a,a.I)}function am(a,d){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Ai(g(a.ba,a),d)}function wc(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Qn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(hT(this.i,this.A),this.L!=2&&(Si(),ut(17)),jr(this),this.s=2,Ci(this)):am(this,this.S-a)};function Ci(a){a.j.G==0||a.J||Dm(a.j,a)}function jr(a){wc(a);var d=a.M;d&&typeof d.ma=="function"&&d.ma(),a.M=null,Qp(a.U),a.g&&(d=a.g,a.g=null,d.abort(),d.ma())}function Ec(a,d){try{var p=a.j;if(p.G!=0&&(p.g==a||Tc(p.h,a))){if(!a.K&&Tc(p.h,a)&&p.G==3){try{var v=p.Da.g.parse(d)}catch{v=null}if(Array.isArray(v)&&v.length==3){var O=v;if(O[0]==0){e:if(!p.u){if(p.g)if(p.g.F+3e3<a.F)ka(p),Sa(p);else break e;Ac(p),ut(18)}}else p.za=O[1],0<p.za-p.T&&37500>O[2]&&p.F&&p.v==0&&!p.C&&(p.C=Ai(g(p.Za,p),6e3));if(1>=cm(p.h)&&p.ca){try{p.ca()}catch{}p.ca=void 0}}else Ur(p,11)}else if((a.K||p.g==a)&&ka(p),!T(d))for(O=p.Da.g.parse(d),d=0;d<O.length;d++){let ae=O[d];if(p.T=ae[0],ae=ae[1],p.G==2)if(ae[0]=="c"){p.K=ae[1],p.ia=ae[2];const Xe=ae[3];Xe!=null&&(p.la=Xe,p.j.info("VER="+p.la));const Je=ae[4];Je!=null&&(p.Aa=Je,p.j.info("SVER="+p.Aa));const Is=ae[5];Is!=null&&typeof Is=="number"&&0<Is&&(v=1.5*Is,p.L=v,p.j.info("backChannelRequestTimeoutMs_="+v)),v=p;const Wt=a.g;if(Wt){const Ra=Wt.g?Wt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ra){var L=v.h;L.g||Ra.indexOf("spdy")==-1&&Ra.indexOf("quic")==-1&&Ra.indexOf("h2")==-1||(L.j=L.l,L.g=new Set,L.h&&(xc(L,L.h),L.h=null))}if(v.D){const Cc=Wt.g?Wt.g.getResponseHeader("X-HTTP-Session-Id"):null;Cc&&(v.ya=Cc,fe(v.I,v.D,Cc))}}p.G=3,p.l&&p.l.ua(),p.ba&&(p.R=Date.now()-a.F,p.j.info("Handshake RTT: "+p.R+"ms")),v=p;var z=a;if(v.qa=Lm(v,v.J?v.ia:null,v.W),z.K){dm(v.h,z);var de=z,ze=v.L;ze&&(de.I=ze),de.B&&(wc(de),va(de)),v.g=z}else bm(v);0<p.i.length&&Aa(p)}else ae[0]!="stop"&&ae[0]!="close"||Ur(p,7);else p.G==3&&(ae[0]=="stop"||ae[0]=="close"?ae[0]=="stop"?Ur(p,7):Sc(p):ae[0]!="noop"&&p.l&&p.l.ta(ae),p.v=0)}}Si(4)}catch{}}var mT=class{constructor(a,d){this.g=a,this.map=d}};function lm(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function um(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function cm(a){return a.h?1:a.g?a.g.size:0}function Tc(a,d){return a.h?a.h==d:a.g?a.g.has(d):!1}function xc(a,d){a.g?a.g.add(d):a.h=d}function dm(a,d){a.h&&a.h==d?a.h=null:a.g&&a.g.has(d)&&a.g.delete(d)}lm.prototype.cancel=function(){if(this.i=hm(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function hm(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let d=a.i;for(const p of a.g.values())d=d.concat(p.D);return d}return b(a.i)}function gT(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var d=[],p=a.length,v=0;v<p;v++)d.push(a[v]);return d}d=[],p=0;for(v in a)d[p++]=a[v];return d}function yT(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var d=[];a=a.length;for(var p=0;p<a;p++)d.push(p);return d}d=[],p=0;for(const v in a)d[p++]=v;return d}}}function fm(a,d){if(a.forEach&&typeof a.forEach=="function")a.forEach(d,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,d,void 0);else for(var p=yT(a),v=gT(a),O=v.length,L=0;L<O;L++)d.call(void 0,v[L],p&&p[L],a)}var pm=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function vT(a,d){if(a){a=a.split("&");for(var p=0;p<a.length;p++){var v=a[p].indexOf("="),O=null;if(0<=v){var L=a[p].substring(0,v);O=a[p].substring(v+1)}else L=a[p];d(L,O?decodeURIComponent(O.replace(/\+/g," ")):"")}}}function Mr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Mr){this.h=a.h,_a(this,a.j),this.o=a.o,this.g=a.g,wa(this,a.s),this.l=a.l;var d=a.i,p=new bi;p.i=d.i,d.g&&(p.g=new Map(d.g),p.h=d.h),mm(this,p),this.m=a.m}else a&&(d=String(a).match(pm))?(this.h=!1,_a(this,d[1]||"",!0),this.o=Ri(d[2]||""),this.g=Ri(d[3]||"",!0),wa(this,d[4]),this.l=Ri(d[5]||"",!0),mm(this,d[6]||"",!0),this.m=Ri(d[7]||"")):(this.h=!1,this.i=new bi(null,this.h))}Mr.prototype.toString=function(){var a=[],d=this.j;d&&a.push(Pi(d,gm,!0),":");var p=this.g;return(p||d=="file")&&(a.push("//"),(d=this.o)&&a.push(Pi(d,gm,!0),"@"),a.push(encodeURIComponent(String(p)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.s,p!=null&&a.push(":",String(p))),(p=this.l)&&(this.g&&p.charAt(0)!="/"&&a.push("/"),a.push(Pi(p,p.charAt(0)=="/"?ET:wT,!0))),(p=this.i.toString())&&a.push("?",p),(p=this.m)&&a.push("#",Pi(p,xT)),a.join("")};function Tn(a){return new Mr(a)}function _a(a,d,p){a.j=p?Ri(d,!0):d,a.j&&(a.j=a.j.replace(/:$/,""))}function wa(a,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);a.s=d}else a.s=null}function mm(a,d,p){d instanceof bi?(a.i=d,IT(a.i,a.h)):(p||(d=Pi(d,TT)),a.i=new bi(d,a.h))}function fe(a,d,p){a.i.set(d,p)}function Ea(a){return fe(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Ri(a,d){return a?d?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Pi(a,d,p){return typeof a=="string"?(a=encodeURI(a).replace(d,_T),p&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function _T(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var gm=/[#\/\?@]/g,wT=/[#\?:]/g,ET=/[#\?]/g,TT=/[#\?@]/g,xT=/#/g;function bi(a,d){this.h=this.g=null,this.i=a||null,this.j=!!d}function Yn(a){a.g||(a.g=new Map,a.h=0,a.i&&vT(a.i,function(d,p){a.add(decodeURIComponent(d.replace(/\+/g," ")),p)}))}t=bi.prototype,t.add=function(a,d){Yn(this),this.i=null,a=Ts(this,a);var p=this.g.get(a);return p||this.g.set(a,p=[]),p.push(d),this.h+=1,this};function ym(a,d){Yn(a),d=Ts(a,d),a.g.has(d)&&(a.i=null,a.h-=a.g.get(d).length,a.g.delete(d))}function vm(a,d){return Yn(a),d=Ts(a,d),a.g.has(d)}t.forEach=function(a,d){Yn(this),this.g.forEach(function(p,v){p.forEach(function(O){a.call(d,O,v,this)},this)},this)},t.na=function(){Yn(this);const a=Array.from(this.g.values()),d=Array.from(this.g.keys()),p=[];for(let v=0;v<d.length;v++){const O=a[v];for(let L=0;L<O.length;L++)p.push(d[v])}return p},t.V=function(a){Yn(this);let d=[];if(typeof a=="string")vm(this,a)&&(d=d.concat(this.g.get(Ts(this,a))));else{a=Array.from(this.g.values());for(let p=0;p<a.length;p++)d=d.concat(a[p])}return d},t.set=function(a,d){return Yn(this),this.i=null,a=Ts(this,a),vm(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[d]),this.h+=1,this},t.get=function(a,d){return a?(a=this.V(a),0<a.length?String(a[0]):d):d};function _m(a,d,p){ym(a,d),0<p.length&&(a.i=null,a.g.set(Ts(a,d),b(p)),a.h+=p.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],d=Array.from(this.g.keys());for(var p=0;p<d.length;p++){var v=d[p];const L=encodeURIComponent(String(v)),z=this.V(v);for(v=0;v<z.length;v++){var O=L;z[v]!==""&&(O+="="+encodeURIComponent(String(z[v]))),a.push(O)}}return this.i=a.join("&")};function Ts(a,d){return d=String(d),a.j&&(d=d.toLowerCase()),d}function IT(a,d){d&&!a.j&&(Yn(a),a.i=null,a.g.forEach(function(p,v){var O=v.toLowerCase();v!=O&&(ym(this,v),_m(this,O,p))},a)),a.j=d}function ST(a,d){const p=new ki;if(l.Image){const v=new Image;v.onload=A(Xn,p,"TestLoadImage: loaded",!0,d,v),v.onerror=A(Xn,p,"TestLoadImage: error",!1,d,v),v.onabort=A(Xn,p,"TestLoadImage: abort",!1,d,v),v.ontimeout=A(Xn,p,"TestLoadImage: timeout",!1,d,v),l.setTimeout(function(){v.ontimeout&&v.ontimeout()},1e4),v.src=a}else d(!1)}function AT(a,d){const p=new ki,v=new AbortController,O=setTimeout(()=>{v.abort(),Xn(p,"TestPingServer: timeout",!1,d)},1e4);fetch(a,{signal:v.signal}).then(L=>{clearTimeout(O),L.ok?Xn(p,"TestPingServer: ok",!0,d):Xn(p,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(O),Xn(p,"TestPingServer: error",!1,d)})}function Xn(a,d,p,v,O){try{O&&(O.onload=null,O.onerror=null,O.onabort=null,O.ontimeout=null),v(p)}catch{}}function kT(){this.g=new uT}function CT(a,d,p){const v=p||"";try{fm(a,function(O,L){let z=O;c(O)&&(z=fc(O)),d.push(v+L+"="+encodeURIComponent(z))})}catch(O){throw d.push(v+"type="+encodeURIComponent("_badmap")),O}}function Ta(a){this.l=a.Ub||null,this.j=a.eb||!1}k(Ta,pc),Ta.prototype.g=function(){return new xa(this.l,this.j)},Ta.prototype.i=function(a){return function(){return a}}({});function xa(a,d){Ye.call(this),this.D=a,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(xa,Ye),t=xa.prototype,t.open=function(a,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=d,this.readyState=1,Di(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(d.body=a),(this.D||l).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ni(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Di(this)),this.g&&(this.readyState=3,Di(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;wm(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function wm(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var d=a.value?a.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!a.done}))&&(this.response=this.responseText+=d)}a.done?Ni(this):Di(this),this.readyState==3&&wm(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,Ni(this))},t.Qa=function(a){this.g&&(this.response=a,Ni(this))},t.ga=function(){this.g&&Ni(this)};function Ni(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Di(a)}t.setRequestHeader=function(a,d){this.u.append(a,d)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],d=this.h.entries();for(var p=d.next();!p.done;)p=p.value,a.push(p[0]+": "+p[1]),p=d.next();return a.join(`\r
`)};function Di(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(xa.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Em(a){let d="";return D(a,function(p,v){d+=v,d+=":",d+=p,d+=`\r
`}),d}function Ic(a,d,p){e:{for(v in p){var v=!1;break e}v=!0}v||(p=Em(p),typeof a=="string"?p!=null&&encodeURIComponent(String(p)):fe(a,d,p))}function Ae(a){Ye.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(Ae,Ye);var RT=/^https?$/i,PT=["POST","PUT"];t=Ae.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,d,p,v){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);d=d?d.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():yc.g(),this.v=this.o?Yp(this.o):Yp(yc),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(d,String(a),!0),this.B=!1}catch(L){Tm(this,L);return}if(a=p||"",p=new Map(this.headers),v)if(Object.getPrototypeOf(v)===Object.prototype)for(var O in v)p.set(O,v[O]);else if(typeof v.keys=="function"&&typeof v.get=="function")for(const L of v.keys())p.set(L,v.get(L));else throw Error("Unknown input type for opt_headers: "+String(v));v=Array.from(p.keys()).find(L=>L.toLowerCase()=="content-type"),O=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(PT,d,void 0))||v||O||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[L,z]of p)this.g.setRequestHeader(L,z);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Sm(this),this.u=!0,this.g.send(a),this.u=!1}catch(L){Tm(this,L)}};function Tm(a,d){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=d,a.m=5,xm(a),Ia(a)}function xm(a){a.A||(a.A=!0,lt(a,"complete"),lt(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,lt(this,"complete"),lt(this,"abort"),Ia(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ia(this,!0)),Ae.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Im(this):this.bb())},t.bb=function(){Im(this)};function Im(a){if(a.h&&typeof o<"u"&&(!a.v[1]||xn(a)!=4||a.Z()!=2)){if(a.u&&xn(a)==4)qp(a.Ea,0,a);else if(lt(a,"readystatechange"),xn(a)==4){a.h=!1;try{const z=a.Z();e:switch(z){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var p;if(!(p=d)){var v;if(v=z===0){var O=String(a.D).match(pm)[1]||null;!O&&l.self&&l.self.location&&(O=l.self.location.protocol.slice(0,-1)),v=!RT.test(O?O.toLowerCase():"")}p=v}if(p)lt(a,"complete"),lt(a,"success");else{a.m=6;try{var L=2<xn(a)?a.g.statusText:""}catch{L=""}a.l=L+" ["+a.Z()+"]",xm(a)}}finally{Ia(a)}}}}function Ia(a,d){if(a.g){Sm(a);const p=a.g,v=a.v[0]?()=>{}:null;a.g=null,a.v=null,d||lt(a,"ready");try{p.onreadystatechange=v}catch{}}}function Sm(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function xn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<xn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var d=this.g.responseText;return a&&d.indexOf(a)==0&&(d=d.substring(a.length)),lT(d)}};function Am(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function bT(a){const d={};a=(a.g&&2<=xn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let v=0;v<a.length;v++){if(T(a[v]))continue;var p=R(a[v]);const O=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const L=d[O]||[];d[O]=L,L.push(p)}_(d,function(v){return v.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Oi(a,d,p){return p&&p.internalChannelParams&&p.internalChannelParams[a]||d}function km(a){this.Aa=0,this.i=[],this.j=new ki,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Oi("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Oi("baseRetryDelayMs",5e3,a),this.cb=Oi("retryDelaySeedMs",1e4,a),this.Wa=Oi("forwardChannelMaxRetries",2,a),this.wa=Oi("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new lm(a&&a.concurrentRequestLimit),this.Da=new kT,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=km.prototype,t.la=8,t.G=1,t.connect=function(a,d,p,v){ut(0),this.W=a,this.H=d||{},p&&v!==void 0&&(this.H.OSID=p,this.H.OAID=v),this.F=this.X,this.I=Lm(this,null,this.W),Aa(this)};function Sc(a){if(Cm(a),a.G==3){var d=a.U++,p=Tn(a.I);if(fe(p,"SID",a.K),fe(p,"RID",d),fe(p,"TYPE","terminate"),Vi(a,p),d=new Qn(a,a.j,d),d.L=2,d.v=Ea(Tn(p)),p=!1,l.navigator&&l.navigator.sendBeacon)try{p=l.navigator.sendBeacon(d.v.toString(),"")}catch{}!p&&l.Image&&(new Image().src=d.v,p=!0),p||(d.g=jm(d.j,null),d.g.ea(d.v)),d.F=Date.now(),va(d)}Vm(a)}function Sa(a){a.g&&(kc(a),a.g.cancel(),a.g=null)}function Cm(a){Sa(a),a.u&&(l.clearTimeout(a.u),a.u=null),ka(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function Aa(a){if(!um(a.h)&&!a.s){a.s=!0;var d=a.Ga;Be||K(),B||(Be(),B=!0),q.add(d,a),a.B=0}}function NT(a,d){return cm(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=d.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Ai(g(a.Ga,a,d),Om(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const O=new Qn(this,this.j,a);let L=this.o;if(this.S&&(L?(L=y(L),I(L,this.S)):L=this.S),this.m!==null||this.O||(O.H=L,L=null),this.P)e:{for(var d=0,p=0;p<this.i.length;p++){t:{var v=this.i[p];if("__data__"in v.map&&(v=v.map.__data__,typeof v=="string")){v=v.length;break t}v=void 0}if(v===void 0)break;if(d+=v,4096<d){d=p;break e}if(d===4096||p===this.i.length-1){d=p+1;break e}}d=1e3}else d=1e3;d=Pm(this,O,d),p=Tn(this.I),fe(p,"RID",a),fe(p,"CVER",22),this.D&&fe(p,"X-HTTP-Session-Id",this.D),Vi(this,p),L&&(this.O?d="headers="+encodeURIComponent(String(Em(L)))+"&"+d:this.m&&Ic(p,this.m,L)),xc(this.h,O),this.Ua&&fe(p,"TYPE","init"),this.P?(fe(p,"$req",d),fe(p,"SID","null"),O.T=!0,_c(O,p,null)):_c(O,p,d),this.G=2}}else this.G==3&&(a?Rm(this,a):this.i.length==0||um(this.h)||Rm(this))};function Rm(a,d){var p;d?p=d.l:p=a.U++;const v=Tn(a.I);fe(v,"SID",a.K),fe(v,"RID",p),fe(v,"AID",a.T),Vi(a,v),a.m&&a.o&&Ic(v,a.m,a.o),p=new Qn(a,a.j,p,a.B+1),a.m===null&&(p.H=a.o),d&&(a.i=d.D.concat(a.i)),d=Pm(a,p,1e3),p.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),xc(a.h,p),_c(p,v,d)}function Vi(a,d){a.H&&D(a.H,function(p,v){fe(d,v,p)}),a.l&&fm({},function(p,v){fe(d,v,p)})}function Pm(a,d,p){p=Math.min(a.i.length,p);var v=a.l?g(a.l.Na,a.l,a):null;e:{var O=a.i;let L=-1;for(;;){const z=["count="+p];L==-1?0<p?(L=O[0].g,z.push("ofs="+L)):L=0:z.push("ofs="+L);let de=!0;for(let ze=0;ze<p;ze++){let ae=O[ze].g;const Xe=O[ze].map;if(ae-=L,0>ae)L=Math.max(0,O[ze].g-100),de=!1;else try{CT(Xe,z,"req"+ae+"_")}catch{v&&v(Xe)}}if(de){v=z.join("&");break e}}}return a=a.i.splice(0,p),d.D=a,v}function bm(a){if(!a.g&&!a.u){a.Y=1;var d=a.Fa;Be||K(),B||(Be(),B=!0),q.add(d,a),a.v=0}}function Ac(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Ai(g(a.Fa,a),Om(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,Nm(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Ai(g(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ut(10),Sa(this),Nm(this))};function kc(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function Nm(a){a.g=new Qn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var d=Tn(a.qa);fe(d,"RID","rpc"),fe(d,"SID",a.K),fe(d,"AID",a.T),fe(d,"CI",a.F?"0":"1"),!a.F&&a.ja&&fe(d,"TO",a.ja),fe(d,"TYPE","xmlhttp"),Vi(a,d),a.m&&a.o&&Ic(d,a.m,a.o),a.L&&(a.g.I=a.L);var p=a.g;a=a.ia,p.L=1,p.v=Ea(Tn(d)),p.m=null,p.P=!0,im(p,a)}t.Za=function(){this.C!=null&&(this.C=null,Sa(this),Ac(this),ut(19))};function ka(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function Dm(a,d){var p=null;if(a.g==d){ka(a),kc(a),a.g=null;var v=2}else if(Tc(a.h,d))p=d.D,dm(a.h,d),v=1;else return;if(a.G!=0){if(d.o)if(v==1){p=d.m?d.m.length:0,d=Date.now()-d.F;var O=a.B;v=ma(),lt(v,new tm(v,p)),Aa(a)}else bm(a);else if(O=d.s,O==3||O==0&&0<d.X||!(v==1&&NT(a,d)||v==2&&Ac(a)))switch(p&&0<p.length&&(d=a.h,d.i=d.i.concat(p)),O){case 1:Ur(a,5);break;case 4:Ur(a,10);break;case 3:Ur(a,6);break;default:Ur(a,2)}}}function Om(a,d){let p=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(p*=2),p*d}function Ur(a,d){if(a.j.info("Error code "+d),d==2){var p=g(a.fb,a),v=a.Xa;const O=!v;v=new Mr(v||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||_a(v,"https"),Ea(v),O?ST(v.toString(),p):AT(v.toString(),p)}else ut(2);a.G=0,a.l&&a.l.sa(d),Vm(a),Cm(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),ut(2)):(this.j.info("Failed to ping google.com"),ut(1))};function Vm(a){if(a.G=0,a.ka=[],a.l){const d=hm(a.h);(d.length!=0||a.i.length!=0)&&(N(a.ka,d),N(a.ka,a.i),a.h.i.length=0,b(a.i),a.i.length=0),a.l.ra()}}function Lm(a,d,p){var v=p instanceof Mr?Tn(p):new Mr(p);if(v.g!="")d&&(v.g=d+"."+v.g),wa(v,v.s);else{var O=l.location;v=O.protocol,d=d?d+"."+O.hostname:O.hostname,O=+O.port;var L=new Mr(null);v&&_a(L,v),d&&(L.g=d),O&&wa(L,O),p&&(L.l=p),v=L}return p=a.D,d=a.ya,p&&d&&fe(v,p,d),fe(v,"VER",a.la),Vi(a,v),v}function jm(a,d,p){if(d&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=a.Ca&&!a.pa?new Ae(new Ta({eb:p})):new Ae(a.pa),d.Ha(a.J),d}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Mm(){}t=Mm.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Ca(){}Ca.prototype.g=function(a,d){return new St(a,d)};function St(a,d){Ye.call(this),this.g=new km(d),this.l=a,this.h=d&&d.messageUrlParams||null,a=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(a?a["X-WebChannel-Content-Type"]=d.messageContentType:a={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(a?a["X-WebChannel-Client-Profile"]=d.va:a={"X-WebChannel-Client-Profile":d.va}),this.g.S=a,(a=d&&d.Sb)&&!T(a)&&(this.g.m=a),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!T(d)&&(this.g.D=d,a=this.h,a!==null&&d in a&&(a=this.h,d in a&&delete a[d])),this.j=new xs(this)}k(St,Ye),St.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},St.prototype.close=function(){Sc(this.g)},St.prototype.o=function(a){var d=this.g;if(typeof a=="string"){var p={};p.__data__=a,a=p}else this.u&&(p={},p.__data__=fc(a),a=p);d.i.push(new mT(d.Ya++,a)),d.G==3&&Aa(d)},St.prototype.N=function(){this.g.l=null,delete this.j,Sc(this.g),delete this.g,St.aa.N.call(this)};function Um(a){mc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var d=a.__sm__;if(d){e:{for(const p in d){a=p;break e}a=void 0}(this.i=a)&&(a=this.i,d=d!==null&&a in d?d[a]:void 0),this.data=d}else this.data=a}k(Um,mc);function Fm(){gc.call(this),this.status=1}k(Fm,gc);function xs(a){this.g=a}k(xs,Mm),xs.prototype.ua=function(){lt(this.g,"a")},xs.prototype.ta=function(a){lt(this.g,new Um(a))},xs.prototype.sa=function(a){lt(this.g,new Fm)},xs.prototype.ra=function(){lt(this.g,"b")},Ca.prototype.createWebChannel=Ca.prototype.g,St.prototype.send=St.prototype.o,St.prototype.open=St.prototype.m,St.prototype.close=St.prototype.close,a1=function(){return new Ca},o1=function(){return ma()},i1=Lr,Ih={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ga.NO_ERROR=0,ga.TIMEOUT=8,ga.HTTP_ERROR=6,ml=ga,nm.COMPLETE="complete",s1=nm,Xp.EventType=Ii,Ii.OPEN="a",Ii.CLOSE="b",Ii.ERROR="c",Ii.MESSAGE="d",Ye.prototype.listen=Ye.prototype.K,Xi=Xp,Ae.prototype.listenOnce=Ae.prototype.L,Ae.prototype.getLastError=Ae.prototype.Ka,Ae.prototype.getLastErrorCode=Ae.prototype.Ba,Ae.prototype.getStatus=Ae.prototype.Z,Ae.prototype.getResponseJson=Ae.prototype.Oa,Ae.prototype.getResponseText=Ae.prototype.oa,Ae.prototype.send=Ae.prototype.ea,Ae.prototype.setWithCredentials=Ae.prototype.Ha,r1=Ae}).apply(typeof Ga<"u"?Ga:typeof self<"u"?self:typeof window<"u"?window:{});const Ly="@firebase/firestore";/**
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
 */class nt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}nt.UNAUTHENTICATED=new nt(null),nt.GOOGLE_CREDENTIALS=new nt("google-credentials-uid"),nt.FIRST_PARTY=new nt("first-party-uid"),nt.MOCK_USER=new nt("mock-user");/**
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
 */let _i="10.14.0";/**
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
 */const is=new Ff("@firebase/firestore");function Wi(){return is.logLevel}function H(t,...e){if(is.logLevel<=ne.DEBUG){const n=e.map(Xf);is.debug(`Firestore (${_i}): ${t}`,...n)}}function zn(t,...e){if(is.logLevel<=ne.ERROR){const n=e.map(Xf);is.error(`Firestore (${_i}): ${t}`,...n)}}function oi(t,...e){if(is.logLevel<=ne.WARN){const n=e.map(Xf);is.warn(`Firestore (${_i}): ${t}`,...n)}}function Xf(t){if(typeof t=="string")return t;try{/**
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
 */function X(t="Unexpected state"){const e=`FIRESTORE (${_i}) INTERNAL ASSERTION FAILED: `+t;throw zn(e),new Error(e)}function ce(t,e){t||X()}function Z(t,e){return t}/**
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
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class W extends nn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Vn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
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
 */class l1{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class eR{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(nt.UNAUTHENTICATED))}shutdown(){}}class tR{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class nR{constructor(e){this.t=e,this.currentUser=nt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){ce(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let i=new Vn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Vn,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{H("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(H("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Vn)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(H("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ce(typeof r.accessToken=="string"),new l1(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ce(e===null||typeof e=="string"),new nt(e)}}class rR{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=nt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class sR{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new rR(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(nt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class iR{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class oR{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){ce(this.o===void 0);const r=i=>{i.error!=null&&H("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,H("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{H("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):H("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(ce(typeof n.token=="string"),this.R=n.token,new iR(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function aR(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
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
 */class u1{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=aR(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function le(t,e){return t<e?-1:t>e?1:0}function ai(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
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
 */class Le{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new W(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new W(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new W(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new W(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Le.fromMillis(Date.now())}static fromDate(e){return Le.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Le(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?le(this.nanoseconds,e.nanoseconds):le(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class J{constructor(e){this.timestamp=e}static fromTimestamp(e){return new J(e)}static min(){return new J(new Le(0,0))}static max(){return new J(new Le(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class jo{constructor(e,n,r){n===void 0?n=0:n>e.length&&X(),r===void 0?r=e.length-n:r>e.length-n&&X(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return jo.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof jo?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class me extends jo{construct(e,n,r){return new me(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new W(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new me(n)}static emptyPath(){return new me([])}}const lR=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class He extends jo{construct(e,n,r){return new He(e,n,r)}static isValidIdentifier(e){return lR.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),He.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new He(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new W(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new W(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new W(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(r+=l,s++):(i(),s++)}if(i(),o)throw new W(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new He(n)}static emptyPath(){return new He([])}}/**
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
 */class G{constructor(e){this.path=e}static fromPath(e){return new G(me.fromString(e))}static fromName(e){return new G(me.fromString(e).popFirst(5))}static empty(){return new G(me.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&me.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return me.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new G(new me(e.slice()))}}function uR(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=J.fromTimestamp(r===1e9?new Le(n+1,0):new Le(n,r));return new Ar(s,G.empty(),e)}function cR(t){return new Ar(t.readTime,t.key,-1)}class Ar{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Ar(J.min(),G.empty(),-1)}static max(){return new Ar(J.max(),G.empty(),-1)}}function dR(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=G.comparator(t.documentKey,e.documentKey),n!==0?n:le(t.largestBatchId,e.largestBatchId))}/**
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
 */const hR="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class fR{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function na(t){if(t.code!==M.FAILED_PRECONDITION||t.message!==hR)throw t;H("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class U{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&X(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new U((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof U?n:U.resolve(n)}catch(n){return U.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):U.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):U.reject(n)}static resolve(e){return new U((n,r)=>{n(e)})}static reject(e){return new U((n,r)=>{r(e)})}static waitFor(e){return new U((n,r)=>{let s=0,i=0,o=!1;e.forEach(l=>{++s,l.next(()=>{++i,o&&i===s&&n()},u=>r(u))}),o=!0,i===s&&n()})}static or(e){let n=U.resolve(!1);for(const r of e)n=n.next(s=>s?U.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new U((r,s)=>{const i=e.length,o=new Array(i);let l=0;for(let u=0;u<i;u++){const c=u;n(e[c]).next(f=>{o[c]=f,++l,l===i&&r(o)},f=>s(f))}})}static doWhile(e,n){return new U((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function pR(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function ra(t){return t.name==="IndexedDbTransactionError"}/**
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
 */class Jf{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Jf.oe=-1;function Uu(t){return t==null}function Zl(t){return t===0&&1/t==-1/0}function mR(t){return typeof t=="number"&&Number.isInteger(t)&&!Zl(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
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
 */function jy(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function vs(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function c1(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
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
 */class xe{constructor(e,n){this.comparator=e,this.root=n||We.EMPTY}insert(e,n){return new xe(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,We.BLACK,null,null))}remove(e){return new xe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,We.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Qa(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Qa(this.root,e,this.comparator,!1)}getReverseIterator(){return new Qa(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Qa(this.root,e,this.comparator,!0)}}class Qa{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class We{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??We.RED,this.left=s??We.EMPTY,this.right=i??We.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new We(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return We.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return We.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,We.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,We.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw X();const e=this.left.check();if(e!==this.right.check())throw X();return e+(this.isRed()?0:1)}}We.EMPTY=null,We.RED=!0,We.BLACK=!1;We.EMPTY=new class{constructor(){this.size=0}get key(){throw X()}get value(){throw X()}get color(){throw X()}get left(){throw X()}get right(){throw X()}copy(e,n,r,s,i){return this}insert(e,n,r){return new We(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Ke{constructor(e){this.comparator=e,this.data=new xe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new My(this.data.getIterator())}getIteratorFrom(e){return new My(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof Ke)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Ke(this.comparator);return n.data=e,n}}class My{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Rt{constructor(e){this.fields=e,e.sort(He.comparator)}static empty(){return new Rt([])}unionWith(e){let n=new Ke(He.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Rt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return ai(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
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
 */class d1 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Qe{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new d1("Invalid base64 string: "+i):i}}(e);return new Qe(n)}static fromUint8Array(e){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new Qe(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return le(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Qe.EMPTY_BYTE_STRING=new Qe("");const gR=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function kr(t){if(ce(!!t),typeof t=="string"){let e=0;const n=gR.exec(t);if(ce(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ce(t.seconds),nanos:Ce(t.nanos)}}function Ce(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function os(t){return typeof t=="string"?Qe.fromBase64String(t):Qe.fromUint8Array(t)}/**
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
 */function Zf(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function ep(t){const e=t.mapValue.fields.__previous_value__;return Zf(e)?ep(e):e}function Mo(t){const e=kr(t.mapValue.fields.__local_write_time__.timestampValue);return new Le(e.seconds,e.nanos)}/**
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
 */class yR{constructor(e,n,r,s,i,o,l,u,c){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=c}}class Uo{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Uo("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Uo&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Ya={mapValue:{}};function as(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Zf(t)?4:_R(t)?9007199254740991:vR(t)?10:11:X()}function mn(t,e){if(t===e)return!0;const n=as(t);if(n!==as(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return Mo(t).isEqual(Mo(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=kr(s.timestampValue),l=kr(i.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return os(s.bytesValue).isEqual(os(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return Ce(s.geoPointValue.latitude)===Ce(i.geoPointValue.latitude)&&Ce(s.geoPointValue.longitude)===Ce(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Ce(s.integerValue)===Ce(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Ce(s.doubleValue),l=Ce(i.doubleValue);return o===l?Zl(o)===Zl(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return ai(t.arrayValue.values||[],e.arrayValue.values||[],mn);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},l=i.mapValue.fields||{};if(jy(o)!==jy(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!mn(o[u],l[u])))return!1;return!0}(t,e);default:return X()}}function Fo(t,e){return(t.values||[]).find(n=>mn(n,e))!==void 0}function li(t,e){if(t===e)return 0;const n=as(t),r=as(e);if(n!==r)return le(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return le(t.booleanValue,e.booleanValue);case 2:return function(i,o){const l=Ce(i.integerValue||i.doubleValue),u=Ce(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return Uy(t.timestampValue,e.timestampValue);case 4:return Uy(Mo(t),Mo(e));case 5:return le(t.stringValue,e.stringValue);case 6:return function(i,o){const l=os(i),u=os(o);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const l=i.split("/"),u=o.split("/");for(let c=0;c<l.length&&c<u.length;c++){const f=le(l[c],u[c]);if(f!==0)return f}return le(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const l=le(Ce(i.latitude),Ce(o.latitude));return l!==0?l:le(Ce(i.longitude),Ce(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Fy(t.arrayValue,e.arrayValue);case 10:return function(i,o){var l,u,c,f;const m=i.fields||{},g=o.fields||{},A=(l=m.value)===null||l===void 0?void 0:l.arrayValue,k=(u=g.value)===null||u===void 0?void 0:u.arrayValue,b=le(((c=A==null?void 0:A.values)===null||c===void 0?void 0:c.length)||0,((f=k==null?void 0:k.values)===null||f===void 0?void 0:f.length)||0);return b!==0?b:Fy(A,k)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===Ya.mapValue&&o===Ya.mapValue)return 0;if(i===Ya.mapValue)return 1;if(o===Ya.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),c=o.fields||{},f=Object.keys(c);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const g=le(u[m],f[m]);if(g!==0)return g;const A=li(l[u[m]],c[f[m]]);if(A!==0)return A}return le(u.length,f.length)}(t.mapValue,e.mapValue);default:throw X()}}function Uy(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return le(t,e);const n=kr(t),r=kr(e),s=le(n.seconds,r.seconds);return s!==0?s:le(n.nanos,r.nanos)}function Fy(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=li(n[s],r[s]);if(i)return i}return le(n.length,r.length)}function ui(t){return Sh(t)}function Sh(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=kr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return os(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return G.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=Sh(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Sh(n.fields[o])}`;return s+"}"}(t.mapValue):X()}function By(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Ah(t){return!!t&&"integerValue"in t}function tp(t){return!!t&&"arrayValue"in t}function zy(t){return!!t&&"nullValue"in t}function $y(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function gl(t){return!!t&&"mapValue"in t}function vR(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function ho(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return vs(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=ho(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=ho(t.arrayValue.values[n]);return e}return Object.assign({},t)}function _R(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class gt{constructor(e){this.value=e}static empty(){return new gt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!gl(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=ho(n)}setAll(e){let n=He.emptyPath(),r={},s=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,s),r={},s=[],n=l.popLast()}o?r[l.lastSegment()]=ho(o):s.push(l.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());gl(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return mn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];gl(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){vs(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new gt(ho(this.value))}}function h1(t){const e=[];return vs(t.fields,(n,r)=>{const s=new He([n]);if(gl(r)){const i=h1(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Rt(e)}/**
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
 */class st{constructor(e,n,r,s,i,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=l}static newInvalidDocument(e){return new st(e,0,J.min(),J.min(),J.min(),gt.empty(),0)}static newFoundDocument(e,n,r,s){return new st(e,1,n,J.min(),r,s,0)}static newNoDocument(e,n){return new st(e,2,n,J.min(),J.min(),gt.empty(),0)}static newUnknownDocument(e,n){return new st(e,3,n,J.min(),J.min(),gt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(J.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=gt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=gt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=J.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof st&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new st(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class eu{constructor(e,n){this.position=e,this.inclusive=n}}function Wy(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=G.comparator(G.fromName(o.referenceValue),n.key):r=li(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Hy(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!mn(t.position[n],e.position[n]))return!1;return!0}/**
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
 */class tu{constructor(e,n="asc"){this.field=e,this.dir=n}}function wR(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
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
 */class f1{}class De extends f1{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new TR(e,n,r):n==="array-contains"?new SR(e,r):n==="in"?new AR(e,r):n==="not-in"?new kR(e,r):n==="array-contains-any"?new CR(e,r):new De(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new xR(e,r):new IR(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(li(n,this.value)):n!==null&&as(this.value)===as(n)&&this.matchesComparison(li(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return X()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class tn extends f1{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new tn(e,n)}matches(e){return p1(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function p1(t){return t.op==="and"}function m1(t){return ER(t)&&p1(t)}function ER(t){for(const e of t.filters)if(e instanceof tn)return!1;return!0}function kh(t){if(t instanceof De)return t.field.canonicalString()+t.op.toString()+ui(t.value);if(m1(t))return t.filters.map(e=>kh(e)).join(",");{const e=t.filters.map(n=>kh(n)).join(",");return`${t.op}(${e})`}}function g1(t,e){return t instanceof De?function(r,s){return s instanceof De&&r.op===s.op&&r.field.isEqual(s.field)&&mn(r.value,s.value)}(t,e):t instanceof tn?function(r,s){return s instanceof tn&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,l)=>i&&g1(o,s.filters[l]),!0):!1}(t,e):void X()}function y1(t){return t instanceof De?function(n){return`${n.field.canonicalString()} ${n.op} ${ui(n.value)}`}(t):t instanceof tn?function(n){return n.op.toString()+" {"+n.getFilters().map(y1).join(" ,")+"}"}(t):"Filter"}class TR extends De{constructor(e,n,r){super(e,n,r),this.key=G.fromName(r.referenceValue)}matches(e){const n=G.comparator(e.key,this.key);return this.matchesComparison(n)}}class xR extends De{constructor(e,n){super(e,"in",n),this.keys=v1("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class IR extends De{constructor(e,n){super(e,"not-in",n),this.keys=v1("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function v1(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>G.fromName(r.referenceValue))}class SR extends De{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return tp(n)&&Fo(n.arrayValue,this.value)}}class AR extends De{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&Fo(this.value.arrayValue,n)}}class kR extends De{constructor(e,n){super(e,"not-in",n)}matches(e){if(Fo(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!Fo(this.value.arrayValue,n)}}class CR extends De{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!tp(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Fo(this.value.arrayValue,r))}}/**
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
 */class RR{constructor(e,n=null,r=[],s=[],i=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=l,this.ue=null}}function qy(t,e=null,n=[],r=[],s=null,i=null,o=null){return new RR(t,e,n,r,s,i,o)}function np(t){const e=Z(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>kh(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Uu(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>ui(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>ui(r)).join(",")),e.ue=n}return e.ue}function rp(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!wR(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!g1(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Hy(t.startAt,e.startAt)&&Hy(t.endAt,e.endAt)}function Ch(t){return G.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
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
 */class sa{constructor(e,n=null,r=[],s=[],i=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function PR(t,e,n,r,s,i,o,l){return new sa(t,e,n,r,s,i,o,l)}function Fu(t){return new sa(t)}function Ky(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function _1(t){return t.collectionGroup!==null}function fo(t){const e=Z(t);if(e.ce===null){e.ce=[];const n=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new Ke(He.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(c=>{c.isInequality()&&(l=l.add(c.field))})}),l})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.ce.push(new tu(i,r))}),n.has(He.keyField().canonicalString())||e.ce.push(new tu(He.keyField(),r))}return e.ce}function hn(t){const e=Z(t);return e.le||(e.le=bR(e,fo(t))),e.le}function bR(t,e){if(t.limitType==="F")return qy(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new tu(s.field,i)});const n=t.endAt?new eu(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new eu(t.startAt.position,t.startAt.inclusive):null;return qy(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Rh(t,e){const n=t.filters.concat([e]);return new sa(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function Ph(t,e,n){return new sa(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Bu(t,e){return rp(hn(t),hn(e))&&t.limitType===e.limitType}function w1(t){return`${np(hn(t))}|lt:${t.limitType}`}function As(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>y1(s)).join(", ")}]`),Uu(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>ui(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>ui(s)).join(",")),`Target(${r})`}(hn(t))}; limitType=${t.limitType})`}function zu(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):G.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of fo(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(o,l,u){const c=Wy(o,l,u);return o.inclusive?c<=0:c<0}(r.startAt,fo(r),s)||r.endAt&&!function(o,l,u){const c=Wy(o,l,u);return o.inclusive?c>=0:c>0}(r.endAt,fo(r),s))}(t,e)}function NR(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function E1(t){return(e,n)=>{let r=!1;for(const s of fo(t)){const i=DR(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function DR(t,e,n){const r=t.field.isKeyField()?G.comparator(e.key,n.key):function(i,o,l){const u=o.data.field(i),c=l.data.field(i);return u!==null&&c!==null?li(u,c):X()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return X()}}/**
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
 */class wi{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){vs(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return c1(this.inner)}size(){return this.innerSize}}/**
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
 */const OR=new xe(G.comparator);function $n(){return OR}const T1=new xe(G.comparator);function Ji(...t){let e=T1;for(const n of t)e=e.insert(n.key,n);return e}function x1(t){let e=T1;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Kr(){return po()}function I1(){return po()}function po(){return new wi(t=>t.toString(),(t,e)=>t.isEqual(e))}const VR=new xe(G.comparator),LR=new Ke(G.comparator);function te(...t){let e=LR;for(const n of t)e=e.add(n);return e}const jR=new Ke(le);function MR(){return jR}/**
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
 */function sp(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Zl(e)?"-0":e}}function S1(t){return{integerValue:""+t}}function UR(t,e){return mR(e)?S1(e):sp(t,e)}/**
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
 */class $u{constructor(){this._=void 0}}function FR(t,e,n){return t instanceof nu?function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Zf(i)&&(i=ep(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(n,e):t instanceof Bo?k1(t,e):t instanceof zo?C1(t,e):function(s,i){const o=A1(s,i),l=Gy(o)+Gy(s.Pe);return Ah(o)&&Ah(s.Pe)?S1(l):sp(s.serializer,l)}(t,e)}function BR(t,e,n){return t instanceof Bo?k1(t,e):t instanceof zo?C1(t,e):n}function A1(t,e){return t instanceof ru?function(r){return Ah(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class nu extends $u{}class Bo extends $u{constructor(e){super(),this.elements=e}}function k1(t,e){const n=R1(e);for(const r of t.elements)n.some(s=>mn(s,r))||n.push(r);return{arrayValue:{values:n}}}class zo extends $u{constructor(e){super(),this.elements=e}}function C1(t,e){let n=R1(e);for(const r of t.elements)n=n.filter(s=>!mn(s,r));return{arrayValue:{values:n}}}class ru extends $u{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function Gy(t){return Ce(t.integerValue||t.doubleValue)}function R1(t){return tp(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function zR(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof Bo&&s instanceof Bo||r instanceof zo&&s instanceof zo?ai(r.elements,s.elements,mn):r instanceof ru&&s instanceof ru?mn(r.Pe,s.Pe):r instanceof nu&&s instanceof nu}(t.transform,e.transform)}class $R{constructor(e,n){this.version=e,this.transformResults=n}}class Ut{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Ut}static exists(e){return new Ut(void 0,e)}static updateTime(e){return new Ut(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function yl(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Wu{}function P1(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new ip(t.key,Ut.none()):new ia(t.key,t.data,Ut.none());{const n=t.data,r=gt.empty();let s=new Ke(He.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Vr(t.key,r,new Rt(s.toArray()),Ut.none())}}function WR(t,e,n){t instanceof ia?function(s,i,o){const l=s.value.clone(),u=Yy(s.fieldTransforms,i,o.transformResults);l.setAll(u),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof Vr?function(s,i,o){if(!yl(s.precondition,i))return void i.convertToUnknownDocument(o.version);const l=Yy(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(b1(s)),u.setAll(l),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function mo(t,e,n,r){return t instanceof ia?function(i,o,l,u){if(!yl(i.precondition,o))return l;const c=i.value.clone(),f=Xy(i.fieldTransforms,u,o);return c.setAll(f),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(t,e,n,r):t instanceof Vr?function(i,o,l,u){if(!yl(i.precondition,o))return l;const c=Xy(i.fieldTransforms,u,o),f=o.data;return f.setAll(b1(i)),f.setAll(c),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(t,e,n,r):function(i,o,l){return yl(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function HR(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=A1(r.transform,s||null);i!=null&&(n===null&&(n=gt.empty()),n.set(r.field,i))}return n||null}function Qy(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ai(r,s,(i,o)=>zR(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class ia extends Wu{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Vr extends Wu{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function b1(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Yy(t,e,n){const r=new Map;ce(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,l=e.data.field(i.field);r.set(i.field,BR(o,l,n[s]))}return r}function Xy(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,FR(i,o,e))}return r}class ip extends Wu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class qR extends Wu{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class KR{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&WR(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=mo(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=mo(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=I1();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let l=this.applyToLocalView(o,i.mutatedFields);l=n.has(s.key)?null:l;const u=P1(o,l);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(J.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),te())}isEqual(e){return this.batchId===e.batchId&&ai(this.mutations,e.mutations,(n,r)=>Qy(n,r))&&ai(this.baseMutations,e.baseMutations,(n,r)=>Qy(n,r))}}class op{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){ce(e.mutations.length===r.length);let s=function(){return VR}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new op(e,n,r,s)}}/**
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
 */class GR{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class QR{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
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
 */var be,se;function YR(t){switch(t){default:return X();case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0}}function N1(t){if(t===void 0)return zn("GRPC error has no .code"),M.UNKNOWN;switch(t){case be.OK:return M.OK;case be.CANCELLED:return M.CANCELLED;case be.UNKNOWN:return M.UNKNOWN;case be.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case be.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case be.INTERNAL:return M.INTERNAL;case be.UNAVAILABLE:return M.UNAVAILABLE;case be.UNAUTHENTICATED:return M.UNAUTHENTICATED;case be.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case be.NOT_FOUND:return M.NOT_FOUND;case be.ALREADY_EXISTS:return M.ALREADY_EXISTS;case be.PERMISSION_DENIED:return M.PERMISSION_DENIED;case be.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case be.ABORTED:return M.ABORTED;case be.OUT_OF_RANGE:return M.OUT_OF_RANGE;case be.UNIMPLEMENTED:return M.UNIMPLEMENTED;case be.DATA_LOSS:return M.DATA_LOSS;default:return X()}}(se=be||(be={}))[se.OK=0]="OK",se[se.CANCELLED=1]="CANCELLED",se[se.UNKNOWN=2]="UNKNOWN",se[se.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",se[se.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",se[se.NOT_FOUND=5]="NOT_FOUND",se[se.ALREADY_EXISTS=6]="ALREADY_EXISTS",se[se.PERMISSION_DENIED=7]="PERMISSION_DENIED",se[se.UNAUTHENTICATED=16]="UNAUTHENTICATED",se[se.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",se[se.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",se[se.ABORTED=10]="ABORTED",se[se.OUT_OF_RANGE=11]="OUT_OF_RANGE",se[se.UNIMPLEMENTED=12]="UNIMPLEMENTED",se[se.INTERNAL=13]="INTERNAL",se[se.UNAVAILABLE=14]="UNAVAILABLE",se[se.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function XR(){return new TextEncoder}/**
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
 */const JR=new Xr([4294967295,4294967295],0);function Jy(t){const e=XR().encode(t),n=new n1;return n.update(e),new Uint8Array(n.digest())}function Zy(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Xr([n,r],0),new Xr([s,i],0)]}class ap{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Zi(`Invalid padding: ${n}`);if(r<0)throw new Zi(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Zi(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Zi(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=Xr.fromNumber(this.Ie)}Ee(e,n,r){let s=e.add(n.multiply(Xr.fromNumber(r)));return s.compare(JR)===1&&(s=new Xr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=Jy(e),[r,s]=Zy(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);if(!this.de(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new ap(i,s,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.Ie===0)return;const n=Jy(e),[r,s]=Zy(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Zi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Hu{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,oa.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Hu(J.min(),s,new xe(le),$n(),te())}}class oa{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new oa(r,n,te(),te(),te())}}/**
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
 */class vl{constructor(e,n,r,s){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=s}}class D1{constructor(e,n){this.targetId=e,this.me=n}}class O1{constructor(e,n,r=Qe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class ev{constructor(){this.fe=0,this.ge=nv(),this.pe=Qe.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=te(),n=te(),r=te();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:X()}}),new oa(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=nv()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,ce(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class ZR{constructor(e){this.Le=e,this.Be=new Map,this.ke=$n(),this.qe=tv(),this.Qe=new xe(le)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:X()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,s)=>{this.ze(s)&&n(s)})}He(e){const n=e.targetId,r=e.me.count,s=this.Je(n);if(s){const i=s.target;if(Ch(i))if(r===0){const o=new G(i.path);this.Ue(n,o,st.newNoDocument(o,J.min()))}else ce(r===1);else{const o=this.Ye(n);if(o!==r){const l=this.Ze(e),u=l?this.Xe(l,e,o):1;if(u!==0){this.je(n);const c=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,c)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,l;try{o=os(r).toUint8Array()}catch(u){if(u instanceof d1)return oi("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new ap(o,s,i)}catch(u){return oi(u instanceof Zi?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.Ie===0?null:l}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.Le.tt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,i,null),s++)}),s}rt(e){const n=new Map;this.Be.forEach((i,o)=>{const l=this.Je(o);if(l){if(i.current&&Ch(l.target)){const u=new G(l.target.path);this.ke.get(u)!==null||this.it(o,u)||this.Ue(o,u,st.newNoDocument(u,e))}i.be&&(n.set(o,i.ve()),i.Ce())}});let r=te();this.qe.forEach((i,o)=>{let l=!0;o.forEachWhile(u=>{const c=this.Je(u);return!c||c.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ke.forEach((i,o)=>o.setReadTime(e));const s=new Hu(e,n,this.Qe,this.ke,r);return this.ke=$n(),this.qe=tv(),this.Qe=new xe(le),s}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,n)?s.Fe(n,1):s.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new ev,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new Ke(le),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||H("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new ev),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function tv(){return new xe(G.comparator)}function nv(){return new xe(G.comparator)}const eP={asc:"ASCENDING",desc:"DESCENDING"},tP={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},nP={and:"AND",or:"OR"};class rP{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function bh(t,e){return t.useProto3Json||Uu(e)?e:{value:e}}function su(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function V1(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function sP(t,e){return su(t,e.toTimestamp())}function fn(t){return ce(!!t),J.fromTimestamp(function(n){const r=kr(n);return new Le(r.seconds,r.nanos)}(t))}function lp(t,e){return Nh(t,e).canonicalString()}function Nh(t,e){const n=function(s){return new me(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function L1(t){const e=me.fromString(t);return ce(B1(e)),e}function Dh(t,e){return lp(t.databaseId,e.path)}function cd(t,e){const n=L1(e);if(n.get(1)!==t.databaseId.projectId)throw new W(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new W(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new G(M1(n))}function j1(t,e){return lp(t.databaseId,e)}function iP(t){const e=L1(t);return e.length===4?me.emptyPath():M1(e)}function Oh(t){return new me(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function M1(t){return ce(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function rv(t,e,n){return{name:Dh(t,e),fields:n.value.mapValue.fields}}function oP(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:X()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(c,f){return c.useProto3Json?(ce(f===void 0||typeof f=="string"),Qe.fromBase64String(f||"")):(ce(f===void 0||f instanceof Buffer||f instanceof Uint8Array),Qe.fromUint8Array(f||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(c){const f=c.code===void 0?M.UNKNOWN:N1(c.code);return new W(f,c.message||"")}(o);n=new O1(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=cd(t,r.document.name),i=fn(r.document.updateTime),o=r.document.createTime?fn(r.document.createTime):J.min(),l=new gt({mapValue:{fields:r.document.fields}}),u=st.newFoundDocument(s,i,o,l),c=r.targetIds||[],f=r.removedTargetIds||[];n=new vl(c,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=cd(t,r.document),i=r.readTime?fn(r.readTime):J.min(),o=st.newNoDocument(s,i),l=r.removedTargetIds||[];n=new vl([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=cd(t,r.document),i=r.removedTargetIds||[];n=new vl([],i,s,null)}else{if(!("filter"in e))return X();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new QR(s,i),l=r.targetId;n=new D1(l,o)}}return n}function aP(t,e){let n;if(e instanceof ia)n={update:rv(t,e.key,e.value)};else if(e instanceof ip)n={delete:Dh(t,e.key)};else if(e instanceof Vr)n={update:rv(t,e.key,e.data),updateMask:gP(e.fieldMask)};else{if(!(e instanceof qR))return X();n={verify:Dh(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const l=o.transform;if(l instanceof nu)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Bo)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof zo)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof ru)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw X()}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:sP(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:X()}(t,e.precondition)),n}function lP(t,e){return t&&t.length>0?(ce(e!==void 0),t.map(n=>function(s,i){let o=s.updateTime?fn(s.updateTime):fn(i);return o.isEqual(J.min())&&(o=fn(i)),new $R(o,s.transformResults||[])}(n,e))):[]}function uP(t,e){return{documents:[j1(t,e.path)]}}function cP(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=j1(t,s);const i=function(c){if(c.length!==0)return F1(tn.create(c,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(c){if(c.length!==0)return c.map(f=>function(g){return{field:ks(g.field),direction:fP(g.dir)}}(f))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=bh(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{_t:n,parent:s}}function dP(t){let e=iP(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){ce(r===1);const f=n.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];n.where&&(i=function(m){const g=U1(m);return g instanceof tn&&m1(g)?g.getFilters():[g]}(n.where));let o=[];n.orderBy&&(o=function(m){return m.map(g=>function(k){return new tu(Cs(k.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(g))}(n.orderBy));let l=null;n.limit&&(l=function(m){let g;return g=typeof m=="object"?m.value:m,Uu(g)?null:g}(n.limit));let u=null;n.startAt&&(u=function(m){const g=!!m.before,A=m.values||[];return new eu(A,g)}(n.startAt));let c=null;return n.endAt&&(c=function(m){const g=!m.before,A=m.values||[];return new eu(A,g)}(n.endAt)),PR(e,s,o,i,l,"F",u,c)}function hP(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return X()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function U1(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Cs(n.unaryFilter.field);return De.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Cs(n.unaryFilter.field);return De.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Cs(n.unaryFilter.field);return De.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Cs(n.unaryFilter.field);return De.create(o,"!=",{nullValue:"NULL_VALUE"});default:return X()}}(t):t.fieldFilter!==void 0?function(n){return De.create(Cs(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return X()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return tn.create(n.compositeFilter.filters.map(r=>U1(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return X()}}(n.compositeFilter.op))}(t):X()}function fP(t){return eP[t]}function pP(t){return tP[t]}function mP(t){return nP[t]}function ks(t){return{fieldPath:t.canonicalString()}}function Cs(t){return He.fromServerFormat(t.fieldPath)}function F1(t){return t instanceof De?function(n){if(n.op==="=="){if($y(n.value))return{unaryFilter:{field:ks(n.field),op:"IS_NAN"}};if(zy(n.value))return{unaryFilter:{field:ks(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if($y(n.value))return{unaryFilter:{field:ks(n.field),op:"IS_NOT_NAN"}};if(zy(n.value))return{unaryFilter:{field:ks(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ks(n.field),op:pP(n.op),value:n.value}}}(t):t instanceof tn?function(n){const r=n.getFilters().map(s=>F1(s));return r.length===1?r[0]:{compositeFilter:{op:mP(n.op),filters:r}}}(t):X()}function gP(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function B1(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
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
 */class dr{constructor(e,n,r,s,i=J.min(),o=J.min(),l=Qe.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new dr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new dr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new dr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new dr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class yP{constructor(e){this.ct=e}}function vP(t){const e=dP({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Ph(e,e.limit,"L"):e}/**
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
 */class _P{constructor(){this.un=new wP}addToCollectionParentIndex(e,n){return this.un.add(n),U.resolve()}getCollectionParents(e,n){return U.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return U.resolve()}deleteFieldIndex(e,n){return U.resolve()}deleteAllFieldIndexes(e){return U.resolve()}createTargetIndexes(e,n){return U.resolve()}getDocumentsMatchingTarget(e,n){return U.resolve(null)}getIndexType(e,n){return U.resolve(0)}getFieldIndexes(e,n){return U.resolve([])}getNextCollectionGroupToUpdate(e){return U.resolve(null)}getMinOffset(e,n){return U.resolve(Ar.min())}getMinOffsetFromCollectionGroup(e,n){return U.resolve(Ar.min())}updateCollectionGroup(e,n,r){return U.resolve()}updateIndexEntries(e,n){return U.resolve()}}class wP{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new Ke(me.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new Ke(me.comparator)).toArray()}}/**
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
 */class ci{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new ci(0)}static kn(){return new ci(-1)}}/**
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
 */class EP{constructor(){this.changes=new wi(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,st.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?U.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class TP{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
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
 */class xP{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&mo(r.mutation,s,Rt.empty(),Le.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,te()).next(()=>r))}getLocalViewOfDocuments(e,n,r=te()){const s=Kr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=Ji();return i.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Kr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,te()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,s){let i=$n();const o=po(),l=function(){return po()}();return n.forEach((u,c)=>{const f=r.get(c.key);s.has(c.key)&&(f===void 0||f.mutation instanceof Vr)?i=i.insert(c.key,c):f!==void 0?(o.set(c.key,f.mutation.getFieldMask()),mo(f.mutation,c,f.mutation.getFieldMask(),Le.now())):o.set(c.key,Rt.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((c,f)=>o.set(c,f)),n.forEach((c,f)=>{var m;return l.set(c,new TP(f,(m=o.get(c))!==null&&m!==void 0?m:null))}),l))}recalculateAndSaveOverlays(e,n){const r=po();let s=new xe((o,l)=>o-l),i=te();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(u=>{const c=n.get(u);if(c===null)return;let f=r.get(u)||Rt.empty();f=l.applyToLocalView(c,f),r.set(u,f);const m=(s.get(l.batchId)||te()).add(u);s=s.insert(l.batchId,m)})}).next(()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),c=u.key,f=u.value,m=I1();f.forEach(g=>{if(!i.has(g)){const A=P1(n.get(g),r.get(g));A!==null&&m.set(g,A),i=i.add(g)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,m))}return U.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(o){return G.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):_1(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):U.resolve(Kr());let l=-1,u=i;return o.next(c=>U.forEach(c,(f,m)=>(l<m.largestBatchId&&(l=m.largestBatchId),i.get(f)?U.resolve():this.remoteDocumentCache.getEntry(e,f).next(g=>{u=u.insert(f,g)}))).next(()=>this.populateOverlays(e,c,i)).next(()=>this.computeViews(e,u,c,te())).next(f=>({batchId:l,changes:x1(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new G(n)).next(r=>{let s=Ji();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=Ji();return this.indexManager.getCollectionParents(e,i).next(l=>U.forEach(l,u=>{const c=function(m,g){return new sa(g,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(n,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,c,r,s).next(f=>{f.forEach((m,g)=>{o=o.insert(m,g)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(o=>{i.forEach((u,c)=>{const f=c.getKey();o.get(f)===null&&(o=o.insert(f,st.newInvalidDocument(f)))});let l=Ji();return o.forEach((u,c)=>{const f=i.get(u);f!==void 0&&mo(f.mutation,c,Rt.empty(),Le.now()),zu(n,c)&&(l=l.insert(u,c))}),l})}}/**
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
 */class IP{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return U.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:fn(s.createTime)}}(n)),U.resolve()}getNamedQuery(e,n){return U.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(s){return{name:s.name,query:vP(s.bundledQuery),readTime:fn(s.readTime)}}(n)),U.resolve()}}/**
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
 */class SP{constructor(){this.overlays=new xe(G.comparator),this.Ir=new Map}getOverlay(e,n){return U.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Kr();return U.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.ht(e,n,i)}),U.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(r)),U.resolve()}getOverlaysForCollection(e,n,r){const s=Kr(),i=n.length+1,o=new G(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,c=u.getKey();if(!n.isPrefixOf(c.path))break;c.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return U.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new xe((c,f)=>c-f);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===n&&c.largestBatchId>r){let f=i.get(c.largestBatchId);f===null&&(f=Kr(),i=i.insert(c.largestBatchId,f)),f.set(c.getKey(),c)}}const l=Kr(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((c,f)=>l.set(c,f)),!(l.size()>=s)););return U.resolve(l)}ht(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new GR(n,r));let i=this.Ir.get(n);i===void 0&&(i=te(),this.Ir.set(n,i)),this.Ir.set(n,i.add(r.key))}}/**
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
 */class AP{constructor(){this.sessionToken=Qe.EMPTY_BYTE_STRING}getSessionToken(e){return U.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,U.resolve()}}/**
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
 */class up{constructor(){this.Tr=new Ke(je.Er),this.dr=new Ke(je.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new je(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new je(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new G(new me([])),r=new je(n,e),s=new je(n,e+1),i=[];return this.dr.forEachInRange([r,s],o=>{this.Vr(o),i.push(o.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new G(new me([])),r=new je(n,e),s=new je(n,e+1);let i=te();return this.dr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new je(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class je{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return G.comparator(e.key,n.key)||le(e.wr,n.wr)}static Ar(e,n){return le(e.wr,n.wr)||G.comparator(e.key,n.key)}}/**
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
 */class kP{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new Ke(je.Er)}checkEmpty(e){return U.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new KR(i,n,r,s);this.mutationQueue.push(o);for(const l of s)this.br=this.br.add(new je(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return U.resolve(o)}lookupMutationBatch(e,n){return U.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.vr(r),i=s<0?0:s;return U.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return U.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return U.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new je(n,0),s=new je(n,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],o=>{const l=this.Dr(o.wr);i.push(l)}),U.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Ke(le);return n.forEach(s=>{const i=new je(s,0),o=new je(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,o],l=>{r=r.add(l.wr)})}),U.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;G.isDocumentKey(i)||(i=i.child(""));const o=new je(new G(i),0);let l=new Ke(le);return this.br.forEachWhile(u=>{const c=u.key.path;return!!r.isPrefixOf(c)&&(c.length===s&&(l=l.add(u.wr)),!0)},o),U.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){ce(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return U.forEach(n.mutations,s=>{const i=new je(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new je(n,0),s=this.br.firstAfterOrEqual(r);return U.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,U.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
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
 */class CP{constructor(e){this.Mr=e,this.docs=function(){return new xe(G.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return U.resolve(r?r.document.mutableCopy():st.newInvalidDocument(n))}getEntries(e,n){let r=$n();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():st.newInvalidDocument(s))}),U.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=$n();const o=n.path,l=new G(o.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:c,value:{document:f}}=u.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||dR(cR(f),r)<=0||(s.has(f.key)||zu(n,f))&&(i=i.insert(f.key,f.mutableCopy()))}return U.resolve(i)}getAllFromCollectionGroup(e,n,r,s){X()}Or(e,n){return U.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new RP(this)}getSize(e){return U.resolve(this.size)}}class RP extends EP{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),U.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
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
 */class PP{constructor(e){this.persistence=e,this.Nr=new wi(n=>np(n),rp),this.lastRemoteSnapshotVersion=J.min(),this.highestTargetId=0,this.Lr=0,this.Br=new up,this.targetCount=0,this.kr=ci.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,s)=>n(s)),U.resolve()}getLastRemoteSnapshotVersion(e){return U.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return U.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),U.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),U.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new ci(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,U.resolve()}updateTargetData(e,n){return this.Kn(n),U.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,U.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),U.waitFor(i).next(()=>s)}getTargetCount(e){return U.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return U.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),U.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),U.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),U.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return U.resolve(r)}containsKey(e,n){return U.resolve(this.Br.containsKey(n))}}/**
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
 */class bP{constructor(e,n){this.qr={},this.overlays={},this.Qr=new Jf(0),this.Kr=!1,this.Kr=!0,this.$r=new AP,this.referenceDelegate=e(this),this.Ur=new PP(this),this.indexManager=new _P,this.remoteDocumentCache=function(s){return new CP(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new yP(n),this.Gr=new IP(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new SP,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new kP(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){H("MemoryPersistence","Starting transaction:",e);const s=new NP(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,n){return U.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class NP extends fR{constructor(e){super(),this.currentSequenceNumber=e}}class cp{constructor(e){this.persistence=e,this.Jr=new up,this.Yr=null}static Zr(e){return new cp(e)}get Xr(){if(this.Yr)return this.Yr;throw X()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),U.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),U.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),U.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return U.forEach(this.Xr,r=>{const s=G.fromPath(r);return this.ei(e,s).next(i=>{i||n.removeEntry(s,J.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return U.or([()=>U.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
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
 */class dp{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=s}static Wi(e,n){let r=te(),s=te();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new dp(e,n.fromCache,r,s)}}/**
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
 */class DP{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class OP{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return SS()?8:pR(at())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.Yi(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Zi(e,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new DP;return this.Xi(e,n,o).next(l=>{if(i.result=l,this.zi)return this.es(e,n,o,l.size)})}).next(()=>i.result)}es(e,n,r,s){return r.documentReadCount<this.ji?(Wi()<=ne.DEBUG&&H("QueryEngine","SDK will not create cache indexes for query:",As(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),U.resolve()):(Wi()<=ne.DEBUG&&H("QueryEngine","Query:",As(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(Wi()<=ne.DEBUG&&H("QueryEngine","The SDK decides to create cache indexes for query:",As(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,hn(n))):U.resolve())}Yi(e,n){if(Ky(n))return U.resolve(null);let r=hn(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=Ph(n,null,"F"),r=hn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=te(...i);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const c=this.ts(n,l);return this.ns(n,c,o,u.readTime)?this.Yi(e,Ph(n,null,"F")):this.rs(e,c,n,u)}))})))}Zi(e,n,r,s){return Ky(n)||s.isEqual(J.min())?U.resolve(null):this.Ji.getDocuments(e,r).next(i=>{const o=this.ts(n,i);return this.ns(n,o,r,s)?U.resolve(null):(Wi()<=ne.DEBUG&&H("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),As(n)),this.rs(e,o,n,uR(s,-1)).next(l=>l))})}ts(e,n){let r=new Ke(E1(e));return n.forEach((s,i)=>{zu(e,i)&&(r=r.add(i))}),r}ns(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,n,r){return Wi()<=ne.DEBUG&&H("QueryEngine","Using full collection scan to execute query:",As(n)),this.Ji.getDocumentsMatchingQuery(e,n,Ar.min(),r)}rs(e,n,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
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
 */class VP{constructor(e,n,r,s){this.persistence=e,this.ss=n,this.serializer=s,this.os=new xe(le),this._s=new wi(i=>np(i),rp),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new xP(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function LP(t,e,n,r){return new VP(t,e,n,r)}async function z1(t,e){const n=Z(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],l=[];let u=te();for(const c of s){o.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}for(const c of i){l.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}return n.localDocuments.getDocuments(r,u).next(c=>({hs:c,removedBatchIds:o,addedBatchIds:l}))})})}function jP(t,e){const n=Z(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,u,c,f){const m=c.batch,g=m.keys();let A=U.resolve();return g.forEach(k=>{A=A.next(()=>f.getEntry(u,k)).next(b=>{const N=c.docVersions.get(k);ce(N!==null),b.version.compareTo(N)<0&&(m.applyToRemoteDocument(b,c),b.isValidDocument()&&(b.setReadTime(c.commitVersion),f.addEntry(b)))})}),A.next(()=>l.mutationQueue.removeMutationBatch(u,m))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=te();for(let c=0;c<l.mutationResults.length;++c)l.mutationResults[c].transformResults.length>0&&(u=u.add(l.batch.mutations[c].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function $1(t){const e=Z(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function MP(t,e){const n=Z(t),r=e.snapshotVersion;let s=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});s=n.os;const l=[];e.targetChanges.forEach((f,m)=>{const g=s.get(m);if(!g)return;l.push(n.Ur.removeMatchingKeys(i,f.removedDocuments,m).next(()=>n.Ur.addMatchingKeys(i,f.addedDocuments,m)));let A=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?A=A.withResumeToken(Qe.EMPTY_BYTE_STRING,J.min()).withLastLimboFreeSnapshotVersion(J.min()):f.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(f.resumeToken,r)),s=s.insert(m,A),function(b,N,x){return b.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-b.snapshotVersion.toMicroseconds()>=3e8?!0:x.addedDocuments.size+x.modifiedDocuments.size+x.removedDocuments.size>0}(g,A,f)&&l.push(n.Ur.updateTargetData(i,A))});let u=$n(),c=te();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,f))}),l.push(UP(i,o,e.documentUpdates).next(f=>{u=f.Ps,c=f.Is})),!r.isEqual(J.min())){const f=n.Ur.getLastRemoteSnapshotVersion(i).next(m=>n.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(f)}return U.waitFor(l).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,u,c)).next(()=>u)}).then(i=>(n.os=s,i))}function UP(t,e,n){let r=te(),s=te();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=$n();return n.forEach((l,u)=>{const c=i.get(l);u.isFoundDocument()!==c.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(J.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!c.isValidDocument()||u.version.compareTo(c.version)>0||u.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):H("LocalStore","Ignoring outdated watch update for ",l,". Current version:",c.version," Watch version:",u.version)}),{Ps:o,Is:s}})}function FP(t,e){const n=Z(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function BP(t,e){const n=Z(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Ur.getTargetData(r,e).next(i=>i?(s=i,U.resolve(s)):n.Ur.allocateTargetId(r).next(o=>(s=new dr(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function Vh(t,e,n){const r=Z(t),s=r.os.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!ra(o))throw o;H("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function sv(t,e,n){const r=Z(t);let s=J.min(),i=te();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,c,f){const m=Z(u),g=m._s.get(f);return g!==void 0?U.resolve(m.os.get(g)):m.Ur.getTargetData(c,f)}(r,o,hn(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,l.targetId).next(u=>{i=u})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?s:J.min(),n?i:te())).next(l=>(zP(r,NR(e),l),{documents:l,Ts:i})))}function zP(t,e,n){let r=t.us.get(e)||J.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.us.set(e,r)}class iv{constructor(){this.activeTargetIds=MR()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class $P{constructor(){this.so=new iv,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new iv,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class WP{_o(e){}shutdown(){}}/**
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
 */class ov{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){H("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){H("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Xa=null;function dd(){return Xa===null?Xa=function(){return 268435456+Math.round(2147483648*Math.random())}():Xa++,"0x"+Xa.toString(16)}/**
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
 */const HP={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class qP{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const tt="WebChannelConnection";class KP extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(n,r,s,i,o){const l=dd(),u=this.xo(n,r.toUriEncodedString());H("RestConnection",`Sending RPC '${n}' ${l}:`,u,s);const c={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(c,i,o),this.No(n,u,c,s).then(f=>(H("RestConnection",`Received RPC '${n}' ${l}: `,f),f),f=>{throw oi("RestConnection",`RPC '${n}' ${l} failed with error: `,f,"url: ",u,"request:",s),f})}Lo(n,r,s,i,o,l){return this.Mo(n,r,s,i,o)}Oo(n,r,s){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+_i}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,o)=>n[o]=i),s&&s.headers.forEach((i,o)=>n[o]=i)}xo(n,r){const s=HP[n];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,s){const i=dd();return new Promise((o,l)=>{const u=new r1;u.setWithCredentials(!0),u.listenOnce(s1.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case ml.NO_ERROR:const f=u.getResponseJson();H(tt,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(f)),o(f);break;case ml.TIMEOUT:H(tt,`RPC '${e}' ${i} timed out`),l(new W(M.DEADLINE_EXCEEDED,"Request time out"));break;case ml.HTTP_ERROR:const m=u.getStatus();if(H(tt,`RPC '${e}' ${i} failed with status:`,m,"response text:",u.getResponseText()),m>0){let g=u.getResponseJson();Array.isArray(g)&&(g=g[0]);const A=g==null?void 0:g.error;if(A&&A.status&&A.message){const k=function(N){const x=N.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(x)>=0?x:M.UNKNOWN}(A.status);l(new W(k,A.message))}else l(new W(M.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new W(M.UNAVAILABLE,"Connection failed."));break;default:X()}}finally{H(tt,`RPC '${e}' ${i} completed.`)}});const c=JSON.stringify(s);H(tt,`RPC '${e}' ${i} sending request:`,s),u.send(n,"POST",c,r,15)})}Bo(e,n,r){const s=dd(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=a1(),l=o1(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const f=i.join("");H(tt,`Creating RPC '${e}' stream ${s}: ${f}`,u);const m=o.createWebChannel(f,u);let g=!1,A=!1;const k=new qP({Io:N=>{A?H(tt,`Not sending because RPC '${e}' stream ${s} is closed:`,N):(g||(H(tt,`Opening RPC '${e}' stream ${s} transport.`),m.open(),g=!0),H(tt,`RPC '${e}' stream ${s} sending:`,N),m.send(N))},To:()=>m.close()}),b=(N,x,T)=>{N.listen(x,w=>{try{T(w)}catch(C){setTimeout(()=>{throw C},0)}})};return b(m,Xi.EventType.OPEN,()=>{A||(H(tt,`RPC '${e}' stream ${s} transport opened.`),k.yo())}),b(m,Xi.EventType.CLOSE,()=>{A||(A=!0,H(tt,`RPC '${e}' stream ${s} transport closed`),k.So())}),b(m,Xi.EventType.ERROR,N=>{A||(A=!0,oi(tt,`RPC '${e}' stream ${s} transport errored:`,N),k.So(new W(M.UNAVAILABLE,"The operation could not be completed")))}),b(m,Xi.EventType.MESSAGE,N=>{var x;if(!A){const T=N.data[0];ce(!!T);const w=T,C=w.error||((x=w[0])===null||x===void 0?void 0:x.error);if(C){H(tt,`RPC '${e}' stream ${s} received error:`,C);const j=C.status;let D=function(E){const I=be[E];if(I!==void 0)return N1(I)}(j),_=C.message;D===void 0&&(D=M.INTERNAL,_="Unknown error status: "+j+" with message "+C.message),A=!0,k.So(new W(D,_)),m.close()}else H(tt,`RPC '${e}' stream ${s} received:`,T),k.bo(T)}}),b(l,i1.STAT_EVENT,N=>{N.stat===Ih.PROXY?H(tt,`RPC '${e}' stream ${s} detected buffering proxy`):N.stat===Ih.NOPROXY&&H(tt,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{k.wo()},0),k}}function hd(){return typeof document<"u"?document:null}/**
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
 */function qu(t){return new rP(t,!0)}/**
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
 */class W1{constructor(e,n,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&H("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class H1{constructor(e,n,r,s,i,o,l,u){this.ui=e,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new W1(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===M.RESOURCE_EXHAUSTED?(zn(n.toString()),zn("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===n&&this.P_(r,s)},r=>{e(()=>{const s=new W(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return H("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(H("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class GP extends H1{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=oP(this.serializer,e),r=function(i){if(!("targetChange"in i))return J.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?J.min():o.readTime?fn(o.readTime):J.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=Oh(this.serializer),n.addTarget=function(i,o){let l;const u=o.target;if(l=Ch(u)?{documents:uP(i,u)}:{query:cP(i,u)._t},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=V1(i,o.resumeToken);const c=bh(i,o.expectedCount);c!==null&&(l.expectedCount=c)}else if(o.snapshotVersion.compareTo(J.min())>0){l.readTime=su(i,o.snapshotVersion.toTimestamp());const c=bh(i,o.expectedCount);c!==null&&(l.expectedCount=c)}return l}(this.serializer,e);const r=hP(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=Oh(this.serializer),n.removeTarget=e,this.a_(n)}}class QP extends H1{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return ce(!!e.streamToken),this.lastStreamToken=e.streamToken,ce(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){ce(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=lP(e.writeResults,e.commitTime),r=fn(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=Oh(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>aP(this.serializer,r))};this.a_(n)}}/**
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
 */class YP extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new W(M.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Mo(e,Nh(n,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new W(M.UNKNOWN,i.toString())})}Lo(e,n,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,Nh(n,r),s,o,l,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new W(M.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class XP{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(zn(n),this.D_=!1):H("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class JP{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(o=>{r.enqueueAndForget(async()=>{_s(this)&&(H("RemoteStore","Restarting streams for network reachability change."),await async function(u){const c=Z(u);c.L_.add(4),await aa(c),c.q_.set("Unknown"),c.L_.delete(4),await Ku(c)}(this))})}),this.q_=new XP(r,s)}}async function Ku(t){if(_s(t))for(const e of t.B_)await e(!0)}async function aa(t){for(const e of t.B_)await e(!1)}function q1(t,e){const n=Z(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),mp(n)?pp(n):Ei(n).r_()&&fp(n,e))}function hp(t,e){const n=Z(t),r=Ei(n);n.N_.delete(e),r.r_()&&K1(n,e),n.N_.size===0&&(r.r_()?r.o_():_s(n)&&n.q_.set("Unknown"))}function fp(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(J.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Ei(t).A_(e)}function K1(t,e){t.Q_.xe(e),Ei(t).R_(e)}function pp(t){t.Q_=new ZR({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),Ei(t).start(),t.q_.v_()}function mp(t){return _s(t)&&!Ei(t).n_()&&t.N_.size>0}function _s(t){return Z(t).L_.size===0}function G1(t){t.Q_=void 0}async function ZP(t){t.q_.set("Online")}async function eb(t){t.N_.forEach((e,n)=>{fp(t,e)})}async function tb(t,e){G1(t),mp(t)?(t.q_.M_(e),pp(t)):t.q_.set("Unknown")}async function nb(t,e,n){if(t.q_.set("Online"),e instanceof O1&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const l of i.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.N_.delete(l),s.Q_.removeTarget(l))}(t,e)}catch(r){H("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await iu(t,r)}else if(e instanceof vl?t.Q_.Ke(e):e instanceof D1?t.Q_.He(e):t.Q_.We(e),!n.isEqual(J.min()))try{const r=await $1(t.localStore);n.compareTo(r)>=0&&await function(i,o){const l=i.Q_.rt(o);return l.targetChanges.forEach((u,c)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.N_.get(c);f&&i.N_.set(c,f.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,c)=>{const f=i.N_.get(u);if(!f)return;i.N_.set(u,f.withResumeToken(Qe.EMPTY_BYTE_STRING,f.snapshotVersion)),K1(i,u);const m=new dr(f.target,u,c,f.sequenceNumber);fp(i,m)}),i.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){H("RemoteStore","Failed to raise snapshot:",r),await iu(t,r)}}async function iu(t,e,n){if(!ra(e))throw e;t.L_.add(1),await aa(t),t.q_.set("Offline"),n||(n=()=>$1(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{H("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await Ku(t)})}function Q1(t,e){return e().catch(n=>iu(t,n,e))}async function Gu(t){const e=Z(t),n=Cr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;rb(e);)try{const s=await FP(e.localStore,r);if(s===null){e.O_.length===0&&n.o_();break}r=s.batchId,sb(e,s)}catch(s){await iu(e,s)}Y1(e)&&X1(e)}function rb(t){return _s(t)&&t.O_.length<10}function sb(t,e){t.O_.push(e);const n=Cr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function Y1(t){return _s(t)&&!Cr(t).n_()&&t.O_.length>0}function X1(t){Cr(t).start()}async function ib(t){Cr(t).p_()}async function ob(t){const e=Cr(t);for(const n of t.O_)e.m_(n.mutations)}async function ab(t,e,n){const r=t.O_.shift(),s=op.from(r,e,n);await Q1(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await Gu(t)}async function lb(t,e){e&&Cr(t).V_&&await async function(r,s){if(function(o){return YR(o)&&o!==M.ABORTED}(s.code)){const i=r.O_.shift();Cr(r).s_(),await Q1(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Gu(r)}}(t,e),Y1(t)&&X1(t)}async function av(t,e){const n=Z(t);n.asyncQueue.verifyOperationInProgress(),H("RemoteStore","RemoteStore received new credentials");const r=_s(n);n.L_.add(3),await aa(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await Ku(n)}async function ub(t,e){const n=Z(t);e?(n.L_.delete(2),await Ku(n)):e||(n.L_.add(2),await aa(n),n.q_.set("Unknown"))}function Ei(t){return t.K_||(t.K_=function(n,r,s){const i=Z(n);return i.w_(),new GP(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:ZP.bind(null,t),Ro:eb.bind(null,t),mo:tb.bind(null,t),d_:nb.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),mp(t)?pp(t):t.q_.set("Unknown")):(await t.K_.stop(),G1(t))})),t.K_}function Cr(t){return t.U_||(t.U_=function(n,r,s){const i=Z(n);return i.w_(),new QP(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:ib.bind(null,t),mo:lb.bind(null,t),f_:ob.bind(null,t),g_:ab.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await Gu(t)):(await t.U_.stop(),t.O_.length>0&&(H("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
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
 */class gp{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Vn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,l=new gp(e,n,o,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new W(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function yp(t,e){if(zn("AsyncQueue",`${e}: ${t}`),ra(t))return new W(M.UNAVAILABLE,`${e}: ${t}`);throw t}/**
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
 */class Xs{constructor(e){this.comparator=e?(n,r)=>e(n,r)||G.comparator(n.key,r.key):(n,r)=>G.comparator(n.key,r.key),this.keyedMap=Ji(),this.sortedSet=new xe(this.comparator)}static emptySet(e){return new Xs(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Xs)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Xs;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
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
 */class lv{constructor(){this.W_=new xe(G.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):X():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class di{constructor(e,n,r,s,i,o,l,u,c){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=c}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new di(e,n,Xs.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Bu(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class cb{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class db{constructor(){this.queries=uv(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const s=Z(n),i=s.queries;s.queries=uv(),i.forEach((o,l)=>{for(const u of l.j_)u.onError(r)})})(this,new W(M.ABORTED,"Firestore shutting down"))}}function uv(){return new wi(t=>w1(t),Bu)}async function vp(t,e){const n=Z(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.H_()&&e.J_()&&(r=2):(i=new cb,r=e.J_()?0:1);try{switch(r){case 0:i.z_=await n.onListen(s,!0);break;case 1:i.z_=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const l=yp(o,`Initialization of query '${As(e.query)}' failed`);return void e.onError(l)}n.queries.set(s,i),i.j_.push(e),e.Z_(n.onlineState),i.z_&&e.X_(i.z_)&&wp(n)}async function _p(t,e){const n=Z(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.j_.indexOf(e);o>=0&&(i.j_.splice(o,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function hb(t,e){const n=Z(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const l of o.j_)l.X_(s)&&(r=!0);o.z_=s}}r&&wp(n)}function fb(t,e,n){const r=Z(t),s=r.queries.get(e);if(s)for(const i of s.j_)i.onError(n);r.queries.delete(e)}function wp(t){t.Y_.forEach(e=>{e.next()})}var Lh,cv;(cv=Lh||(Lh={})).ea="default",cv.Cache="cache";class Ep{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new di(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=di.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Lh.Cache}}/**
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
 */class J1{constructor(e){this.key=e}}class Z1{constructor(e){this.key=e}}class pb{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=te(),this.mutatedKeys=te(),this.Aa=E1(e),this.Ra=new Xs(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new lv,s=n?n.Ra:this.Ra;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,c=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,m)=>{const g=s.get(f),A=zu(this.query,m)?m:null,k=!!g&&this.mutatedKeys.has(g.key),b=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let N=!1;g&&A?g.data.isEqual(A.data)?k!==b&&(r.track({type:3,doc:A}),N=!0):this.ga(g,A)||(r.track({type:2,doc:A}),N=!0,(u&&this.Aa(A,u)>0||c&&this.Aa(A,c)<0)&&(l=!0)):!g&&A?(r.track({type:0,doc:A}),N=!0):g&&!A&&(r.track({type:1,doc:g}),N=!0,(u||c)&&(l=!0)),N&&(A?(o=o.add(A),i=b?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{Ra:o,fa:r,ns:l,mutatedKeys:i}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((f,m)=>function(A,k){const b=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return X()}};return b(A)-b(k)}(f.type,m.type)||this.Aa(f.doc,m.doc)),this.pa(r),s=s!=null&&s;const l=n&&!s?this.ya():[],u=this.da.size===0&&this.current&&!s?1:0,c=u!==this.Ea;return this.Ea=u,o.length!==0||c?{snapshot:new di(this.query,e.Ra,i,o,e.mutatedKeys,u===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new lv,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=te(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new Z1(r))}),this.da.forEach(r=>{e.has(r)||n.push(new J1(r))}),n}ba(e){this.Ta=e.Ts,this.da=te();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return di.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class mb{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class gb{constructor(e){this.key=e,this.va=!1}}class yb{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new wi(l=>w1(l),Bu),this.Ma=new Map,this.xa=new Set,this.Oa=new xe(G.comparator),this.Na=new Map,this.La=new up,this.Ba={},this.ka=new Map,this.qa=ci.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function vb(t,e,n=!0){const r=iE(t);let s;const i=r.Fa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await eE(r,e,n,!0),s}async function _b(t,e){const n=iE(t);await eE(n,e,!0,!1)}async function eE(t,e,n,r){const s=await BP(t.localStore,hn(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let l;return r&&(l=await wb(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&q1(t.remoteStore,s),l}async function wb(t,e,n,r,s){t.Ka=(m,g,A)=>async function(b,N,x,T){let w=N.view.ma(x);w.ns&&(w=await sv(b.localStore,N.query,!1).then(({documents:_})=>N.view.ma(_,w)));const C=T&&T.targetChanges.get(N.targetId),j=T&&T.targetMismatches.get(N.targetId)!=null,D=N.view.applyChanges(w,b.isPrimaryClient,C,j);return hv(b,N.targetId,D.wa),D.snapshot}(t,m,g,A);const i=await sv(t.localStore,e,!0),o=new pb(e,i.Ts),l=o.ma(i.documents),u=oa.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),c=o.applyChanges(l,t.isPrimaryClient,u);hv(t,n,c.wa);const f=new mb(e,n,o);return t.Fa.set(e,f),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),c.snapshot}async function Eb(t,e,n){const r=Z(t),s=r.Fa.get(e),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter(o=>!Bu(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Vh(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&hp(r.remoteStore,s.targetId),jh(r,s.targetId)}).catch(na)):(jh(r,s.targetId),await Vh(r.localStore,s.targetId,!0))}async function Tb(t,e){const n=Z(t),r=n.Fa.get(e),s=n.Ma.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),hp(n.remoteStore,r.targetId))}async function xb(t,e,n){const r=Pb(t);try{const s=await function(o,l){const u=Z(o),c=Le.now(),f=l.reduce((A,k)=>A.add(k.key),te());let m,g;return u.persistence.runTransaction("Locally write mutations","readwrite",A=>{let k=$n(),b=te();return u.cs.getEntries(A,f).next(N=>{k=N,k.forEach((x,T)=>{T.isValidDocument()||(b=b.add(x))})}).next(()=>u.localDocuments.getOverlayedDocuments(A,k)).next(N=>{m=N;const x=[];for(const T of l){const w=HR(T,m.get(T.key).overlayedDocument);w!=null&&x.push(new Vr(T.key,w,h1(w.value.mapValue),Ut.exists(!0)))}return u.mutationQueue.addMutationBatch(A,c,x,l)}).next(N=>{g=N;const x=N.applyToLocalDocumentSet(m,b);return u.documentOverlayCache.saveOverlays(A,N.batchId,x)})}).then(()=>({batchId:g.batchId,changes:x1(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,l,u){let c=o.Ba[o.currentUser.toKey()];c||(c=new xe(le)),c=c.insert(l,u),o.Ba[o.currentUser.toKey()]=c}(r,s.batchId,n),await la(r,s.changes),await Gu(r.remoteStore)}catch(s){const i=yp(s,"Failed to persist write");n.reject(i)}}async function tE(t,e){const n=Z(t);try{const r=await MP(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Na.get(i);o&&(ce(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.va=!0:s.modifiedDocuments.size>0?ce(o.va):s.removedDocuments.size>0&&(ce(o.va),o.va=!1))}),await la(n,r,e)}catch(r){await na(r)}}function dv(t,e,n){const r=Z(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Fa.forEach((i,o)=>{const l=o.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(o,l){const u=Z(o);u.onlineState=l;let c=!1;u.queries.forEach((f,m)=>{for(const g of m.j_)g.Z_(l)&&(c=!0)}),c&&wp(u)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Ib(t,e,n){const r=Z(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Na.get(e),i=s&&s.key;if(i){let o=new xe(G.comparator);o=o.insert(i,st.newNoDocument(i,J.min()));const l=te().add(i),u=new Hu(J.min(),new Map,new xe(le),o,l);await tE(r,u),r.Oa=r.Oa.remove(i),r.Na.delete(e),Tp(r)}else await Vh(r.localStore,e,!1).then(()=>jh(r,e,n)).catch(na)}async function Sb(t,e){const n=Z(t),r=e.batch.batchId;try{const s=await jP(n.localStore,e);rE(n,r,null),nE(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await la(n,s)}catch(s){await na(s)}}async function Ab(t,e,n){const r=Z(t);try{const s=await function(o,l){const u=Z(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let f;return u.mutationQueue.lookupMutationBatch(c,l).next(m=>(ce(m!==null),f=m.keys(),u.mutationQueue.removeMutationBatch(c,m))).next(()=>u.mutationQueue.performConsistencyCheck(c)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(c,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,f)).next(()=>u.localDocuments.getDocuments(c,f))})}(r.localStore,e);rE(r,e,n),nE(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await la(r,s)}catch(s){await na(s)}}function nE(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function rE(t,e,n){const r=Z(t);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function jh(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||sE(t,r)})}function sE(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(hp(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),Tp(t))}function hv(t,e,n){for(const r of n)r instanceof J1?(t.La.addReference(r.key,e),kb(t,r)):r instanceof Z1?(H("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||sE(t,r.key)):X()}function kb(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(H("SyncEngine","New document in limbo: "+n),t.xa.add(r),Tp(t))}function Tp(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new G(me.fromString(e)),r=t.qa.next();t.Na.set(r,new gb(n)),t.Oa=t.Oa.insert(n,r),q1(t.remoteStore,new dr(hn(Fu(n.path)),r,"TargetPurposeLimboResolution",Jf.oe))}}async function la(t,e,n){const r=Z(t),s=[],i=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((l,u)=>{o.push(r.Ka(u,e,n).then(c=>{var f;if((c||n)&&r.isPrimaryClient){const m=c?!c.fromCache:(f=n==null?void 0:n.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(c){s.push(c);const m=dp.Wi(u.targetId,c);i.push(m)}}))}),await Promise.all(o),r.Ca.d_(s),await async function(u,c){const f=Z(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>U.forEach(c,g=>U.forEach(g.$i,A=>f.persistence.referenceDelegate.addReference(m,g.targetId,A)).next(()=>U.forEach(g.Ui,A=>f.persistence.referenceDelegate.removeReference(m,g.targetId,A)))))}catch(m){if(!ra(m))throw m;H("LocalStore","Failed to update sequence numbers: "+m)}for(const m of c){const g=m.targetId;if(!m.fromCache){const A=f.os.get(g),k=A.snapshotVersion,b=A.withLastLimboFreeSnapshotVersion(k);f.os=f.os.insert(g,b)}}}(r.localStore,i))}async function Cb(t,e){const n=Z(t);if(!n.currentUser.isEqual(e)){H("SyncEngine","User change. New user:",e.toKey());const r=await z1(n.localStore,e);n.currentUser=e,function(i,o){i.ka.forEach(l=>{l.forEach(u=>{u.reject(new W(M.CANCELLED,o))})}),i.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await la(n,r.hs)}}function Rb(t,e){const n=Z(t),r=n.Na.get(e);if(r&&r.va)return te().add(r.key);{let s=te();const i=n.Ma.get(e);if(!i)return s;for(const o of i){const l=n.Fa.get(o);s=s.unionWith(l.view.Va)}return s}}function iE(t){const e=Z(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=tE.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Rb.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Ib.bind(null,e),e.Ca.d_=hb.bind(null,e.eventManager),e.Ca.$a=fb.bind(null,e.eventManager),e}function Pb(t){const e=Z(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Sb.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Ab.bind(null,e),e}class ou{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=qu(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return LP(this.persistence,new OP,e.initialUser,this.serializer)}Ga(e){return new bP(cp.Zr,this.serializer)}Wa(e){return new $P}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ou.provider={build:()=>new ou};class Mh{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>dv(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Cb.bind(null,this.syncEngine),await ub(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new db}()}createDatastore(e){const n=qu(e.databaseInfo.databaseId),r=function(i){return new KP(i)}(e.databaseInfo);return function(i,o,l,u){return new YP(i,o,l,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,o,l){return new JP(r,s,i,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>dv(this.syncEngine,n,0),function(){return ov.D()?new ov:new WP}())}createSyncEngine(e,n){return function(s,i,o,l,u,c,f){const m=new yb(s,i,o,l,u,c);return f&&(m.Qa=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){const i=Z(s);H("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await aa(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}Mh.provider={build:()=>new Mh};/**
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
 */class xp{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):zn("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
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
 */class bb{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=nt.UNAUTHENTICATED,this.clientId=u1.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{H("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(H("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Vn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=yp(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function fd(t,e){t.asyncQueue.verifyOperationInProgress(),H("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await z1(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function fv(t,e){t.asyncQueue.verifyOperationInProgress();const n=await Nb(t);H("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>av(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>av(e.remoteStore,s)),t._onlineComponents=e}async function Nb(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){H("FirestoreClient","Using user provided OfflineComponentProvider");try{await fd(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===M.FAILED_PRECONDITION||s.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;oi("Error using user provided cache. Falling back to memory cache: "+n),await fd(t,new ou)}}else H("FirestoreClient","Using default OfflineComponentProvider"),await fd(t,new ou);return t._offlineComponents}async function oE(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(H("FirestoreClient","Using user provided OnlineComponentProvider"),await fv(t,t._uninitializedComponentsProvider._online)):(H("FirestoreClient","Using default OnlineComponentProvider"),await fv(t,new Mh))),t._onlineComponents}function Db(t){return oE(t).then(e=>e.syncEngine)}async function au(t){const e=await oE(t),n=e.eventManager;return n.onListen=vb.bind(null,e.syncEngine),n.onUnlisten=Eb.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=_b.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=Tb.bind(null,e.syncEngine),n}function Ob(t,e,n={}){const r=new Vn;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,u,c){const f=new xp({next:g=>{f.Za(),o.enqueueAndForget(()=>_p(i,m));const A=g.docs.has(l);!A&&g.fromCache?c.reject(new W(M.UNAVAILABLE,"Failed to get document because the client is offline.")):A&&g.fromCache&&u&&u.source==="server"?c.reject(new W(M.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(g)},error:g=>c.reject(g)}),m=new Ep(Fu(l.path),f,{includeMetadataChanges:!0,_a:!0});return vp(i,m)}(await au(t),t.asyncQueue,e,n,r)),r.promise}function Vb(t,e,n={}){const r=new Vn;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,u,c){const f=new xp({next:g=>{f.Za(),o.enqueueAndForget(()=>_p(i,m)),g.fromCache&&u.source==="server"?c.reject(new W(M.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(g)},error:g=>c.reject(g)}),m=new Ep(l,f,{includeMetadataChanges:!0,_a:!0});return vp(i,m)}(await au(t),t.asyncQueue,e,n,r)),r.promise}/**
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
 */function aE(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const pv=new Map;/**
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
 */function lE(t,e,n){if(!n)throw new W(M.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function Lb(t,e,n,r){if(e===!0&&r===!0)throw new W(M.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function mv(t){if(!G.isDocumentKey(t))throw new W(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function gv(t){if(G.isDocumentKey(t))throw new W(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Qu(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":X()}function Tt(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new W(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Qu(t);throw new W(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
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
 */class yv{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new W(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new W(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Lb("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=aE((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new W(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new W(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new W(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Yu{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new yv({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new W(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new W(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new yv(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new eR;switch(r.type){case"firstParty":return new sR(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new W(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=pv.get(n);r&&(H("ComponentProvider","Removing Datastore"),pv.delete(n),r.terminate())}(this),Promise.resolve()}}function jb(t,e,n,r={}){var s;const i=(t=Tt(t,Yu))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&oi("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=nt.MOCK_USER;else{l=fw(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const c=r.mockUserToken.sub||r.mockUserToken.user_id;if(!c)throw new W(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new nt(c)}t._authCredentials=new tR(new l1(l,u))}}/**
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
 */class ws{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ws(this.firestore,e,this._query)}}class it{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new xr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new it(this.firestore,e,this._key)}}class xr extends ws{constructor(e,n,r){super(e,n,Fu(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new it(this.firestore,null,new G(e))}withConverter(e){return new xr(this.firestore,e,this._path)}}function gn(t,e,...n){if(t=Te(t),lE("collection","path",e),t instanceof Yu){const r=me.fromString(e,...n);return gv(r),new xr(t,null,r)}{if(!(t instanceof it||t instanceof xr))throw new W(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(me.fromString(e,...n));return gv(r),new xr(t.firestore,null,r)}}function xt(t,e,...n){if(t=Te(t),arguments.length===1&&(e=u1.newId()),lE("doc","path",e),t instanceof Yu){const r=me.fromString(e,...n);return mv(r),new it(t,null,new G(r))}{if(!(t instanceof it||t instanceof xr))throw new W(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(me.fromString(e,...n));return mv(r),new it(t.firestore,t instanceof xr?t.converter:null,new G(r))}}/**
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
 */class vv{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new W1(this,"async_queue_retry"),this.Vu=()=>{const r=hd();r&&H("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=hd();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=hd();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new Vn;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!ra(e))throw e;H("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw zn("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const s=gp.createAndSchedule(this,e,n,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&X()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function _v(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const s=n;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(t,["next","error","complete"])}class Wn extends Yu{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new vv,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new vv(e),this._firestoreClient=void 0,await e}}}function Mb(t,e){const n=typeof t=="object"?t:Ou(),r=typeof t=="string"?t:"(default)",s=ms(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=cw("firestore");i&&jb(s,...i)}return s}function Xu(t){if(t._terminated)throw new W(M.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||Ub(t),t._firestoreClient}function Ub(t){var e,n,r;const s=t._freezeSettings(),i=function(l,u,c,f){return new yR(l,u,c,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,aE(f.experimentalLongPollingOptions),f.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new bb(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(t._componentsProvider))}/**
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
 */class hi{constructor(e){this._byteString=e}static fromBase64String(e){try{return new hi(Qe.fromBase64String(e))}catch(n){throw new W(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new hi(Qe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class Ju{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new W(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new He(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Ip{constructor(e){this._methodName=e}}/**
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
 */class Sp{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new W(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new W(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return le(this._lat,e._lat)||le(this._long,e._long)}}/**
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
 */class Ap{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
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
 */const Fb=/^__.*__$/;class Bb{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Vr(e,this.data,this.fieldMask,n,this.fieldTransforms):new ia(e,this.data,n,this.fieldTransforms)}}class uE{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Vr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function cE(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw X()}}class kp{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new kp(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return lu(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(cE(this.Cu)&&Fb.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class zb{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||qu(e)}Qu(e,n,r,s=!1){return new kp({Cu:e,methodName:n,qu:r,path:He.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Zu(t){const e=t._freezeSettings(),n=qu(t._databaseId);return new zb(t._databaseId,!!e.ignoreUndefinedProperties,n)}function dE(t,e,n,r,s,i={}){const o=t.Qu(i.merge||i.mergeFields?2:0,e,n,s);Cp("Data must be an object, but it was:",o,r);const l=hE(r,o);let u,c;if(i.merge)u=new Rt(o.fieldMask),c=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const g=Uh(e,m,n);if(!o.contains(g))throw new W(M.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);pE(f,g)||f.push(g)}u=new Rt(f),c=o.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,c=o.fieldTransforms;return new Bb(new gt(l),u,c)}class ec extends Ip{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ec}}function $b(t,e,n,r){const s=t.Qu(1,e,n);Cp("Data must be an object, but it was:",s,r);const i=[],o=gt.empty();vs(r,(u,c)=>{const f=Rp(e,u,n);c=Te(c);const m=s.Nu(f);if(c instanceof ec)i.push(f);else{const g=ua(c,m);g!=null&&(i.push(f),o.set(f,g))}});const l=new Rt(i);return new uE(o,l,s.fieldTransforms)}function Wb(t,e,n,r,s,i){const o=t.Qu(1,e,n),l=[Uh(e,r,n)],u=[s];if(i.length%2!=0)throw new W(M.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)l.push(Uh(e,i[g])),u.push(i[g+1]);const c=[],f=gt.empty();for(let g=l.length-1;g>=0;--g)if(!pE(c,l[g])){const A=l[g];let k=u[g];k=Te(k);const b=o.Nu(A);if(k instanceof ec)c.push(A);else{const N=ua(k,b);N!=null&&(c.push(A),f.set(A,N))}}const m=new Rt(c);return new uE(f,m,o.fieldTransforms)}function Hb(t,e,n,r=!1){return ua(n,t.Qu(r?4:3,e))}function ua(t,e){if(fE(t=Te(t)))return Cp("Unsupported field value:",e,t),hE(t,e);if(t instanceof Ip)return function(r,s){if(!cE(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const l of r){let u=ua(l,s.Lu(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=Te(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return UR(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Le.fromDate(r);return{timestampValue:su(s.serializer,i)}}if(r instanceof Le){const i=new Le(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:su(s.serializer,i)}}if(r instanceof Sp)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof hi)return{bytesValue:V1(s.serializer,r._byteString)};if(r instanceof it){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:lp(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Ap)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw l.Bu("VectorValues must only contain numeric values.");return sp(l.serializer,u)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${Qu(r)}`)}(t,e)}function hE(t,e){const n={};return c1(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):vs(t,(r,s)=>{const i=ua(s,e.Mu(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function fE(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Le||t instanceof Sp||t instanceof hi||t instanceof it||t instanceof Ip||t instanceof Ap)}function Cp(t,e,n){if(!fE(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const r=Qu(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function Uh(t,e,n){if((e=Te(e))instanceof Ju)return e._internalPath;if(typeof e=="string")return Rp(t,e);throw lu("Field path arguments must be of type string or ",t,!1,void 0,n)}const qb=new RegExp("[~\\*/\\[\\]]");function Rp(t,e,n){if(e.search(qb)>=0)throw lu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Ju(...e.split("."))._internalPath}catch{throw lu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function lu(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new W(M.INVALID_ARGUMENT,l+t+u)}function pE(t,e){return t.some(n=>n.isEqual(e))}/**
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
 */class mE{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new it(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Kb(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Pp("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class Kb extends mE{data(){return super.data()}}function Pp(t,e){return typeof e=="string"?Rp(t,e):e instanceof Ju?e._internalPath:e._delegate._internalPath}/**
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
 */function gE(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new W(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class bp{}class Gb extends bp{}function Qb(t,e,...n){let r=[];e instanceof bp&&r.push(e),r=r.concat(n),function(i){const o=i.filter(u=>u instanceof Np).length,l=i.filter(u=>u instanceof tc).length;if(o>1||o>0&&l>0)throw new W(M.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class tc extends Gb{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new tc(e,n,r)}_apply(e){const n=this._parse(e);return yE(e._query,n),new ws(e.firestore,e.converter,Rh(e._query,n))}_parse(e){const n=Zu(e.firestore);return function(i,o,l,u,c,f,m){let g;if(c.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new W(M.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Ev(m,f);const A=[];for(const k of m)A.push(wv(u,i,k));g={arrayValue:{values:A}}}else g=wv(u,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Ev(m,f),g=Hb(l,o,m,f==="in"||f==="not-in");return De.create(c,f,g)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function Yb(t,e,n){const r=e,s=Pp("where",t);return tc._create(s,r,n)}class Np extends bp{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new Np(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:tn.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(s,i){let o=s;const l=i.getFlattenedFilters();for(const u of l)yE(o,u),o=Rh(o,u)}(e._query,n),new ws(e.firestore,e.converter,Rh(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function wv(t,e,n){if(typeof(n=Te(n))=="string"){if(n==="")throw new W(M.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!_1(e)&&n.indexOf("/")!==-1)throw new W(M.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(me.fromString(n));if(!G.isDocumentKey(r))throw new W(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return By(t,new G(r))}if(n instanceof it)return By(t,n._key);throw new W(M.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Qu(n)}.`)}function Ev(t,e){if(!Array.isArray(t)||t.length===0)throw new W(M.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function yE(t,e){const n=function(s,i){for(const o of s)for(const l of o.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new W(M.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new W(M.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class Xb{convertValue(e,n="none"){switch(as(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ce(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(os(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw X()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return vs(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){var n,r,s;const i=(s=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>Ce(o.doubleValue));return new Ap(i)}convertGeoPoint(e){return new Sp(Ce(e.latitude),Ce(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=ep(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(Mo(e));default:return null}}convertTimestamp(e){const n=kr(e);return new Le(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=me.fromString(e);ce(B1(r));const s=new Uo(r.get(1),r.get(3)),i=new G(r.popFirst(5));return s.isEqual(n)||zn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
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
 */function vE(t,e,n){let r;return r=t?t.toFirestore(e):e,r}/**
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
 */class eo{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class _E extends mE{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new _l(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Pp("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class _l extends _E{data(e={}){return super.data(e)}}class wE{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new eo(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new _l(this._firestore,this._userDataWriter,r.key,r,new eo(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new W(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(l=>{const u=new _l(s._firestore,s._userDataWriter,l.doc.key,l.doc,new eo(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const u=new _l(s._firestore,s._userDataWriter,l.doc.key,l.doc,new eo(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let c=-1,f=-1;return l.type!==0&&(c=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),f=o.indexOf(l.doc.key)),{type:Jb(l.type),doc:u,oldIndex:c,newIndex:f}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function Jb(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return X()}}/**
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
 */function ca(t){t=Tt(t,it);const e=Tt(t.firestore,Wn);return Ob(Xu(e),t._key).then(n=>TE(e,t,n))}class Dp extends Xb{constructor(e){super(),this.firestore=e}convertBytes(e){return new hi(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new it(this.firestore,null,n)}}function Rr(t){t=Tt(t,ws);const e=Tt(t.firestore,Wn),n=Xu(e),r=new Dp(e);return gE(t._query),Vb(n,t._query).then(s=>new wE(e,r,t,s))}function EE(t,e,n){t=Tt(t,it);const r=Tt(t.firestore,Wn),s=vE(t.converter,e);return nc(r,[dE(Zu(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,Ut.none())])}function da(t,e,n,...r){t=Tt(t,it);const s=Tt(t.firestore,Wn),i=Zu(s);let o;return o=typeof(e=Te(e))=="string"||e instanceof Ju?Wb(i,"updateDoc",t._key,e,n,r):$b(i,"updateDoc",t._key,e),nc(s,[o.toMutation(t._key,Ut.exists(!0))])}function Zb(t){return nc(Tt(t.firestore,Wn),[new ip(t._key,Ut.none())])}function eN(t,e){const n=Tt(t.firestore,Wn),r=xt(t),s=vE(t.converter,e);return nc(n,[dE(Zu(t.firestore),"addDoc",r._key,s,t.converter!==null,{}).toMutation(r._key,Ut.exists(!1))]).then(()=>r)}function tN(t,...e){var n,r,s;t=Te(t);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||_v(e[o])||(i=e[o],o++);const l={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(_v(e[o])){const m=e[o];e[o]=(n=m.next)===null||n===void 0?void 0:n.bind(m),e[o+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[o+2]=(s=m.complete)===null||s===void 0?void 0:s.bind(m)}let u,c,f;if(t instanceof it)c=Tt(t.firestore,Wn),f=Fu(t._key.path),u={next:m=>{e[o]&&e[o](TE(c,t,m))},error:e[o+1],complete:e[o+2]};else{const m=Tt(t,ws);c=Tt(m.firestore,Wn),f=m._query;const g=new Dp(c);u={next:A=>{e[o]&&e[o](new wE(c,g,m,A))},error:e[o+1],complete:e[o+2]},gE(t._query)}return function(g,A,k,b){const N=new xp(b),x=new Ep(A,N,k);return g.asyncQueue.enqueueAndForget(async()=>vp(await au(g),x)),()=>{N.Za(),g.asyncQueue.enqueueAndForget(async()=>_p(await au(g),x))}}(Xu(c),f,l,u)}function nc(t,e){return function(r,s){const i=new Vn;return r.asyncQueue.enqueueAndForget(async()=>xb(await Db(r),s,i)),i.promise}(Xu(t),e)}function TE(t,e,n){const r=n.docs.get(e._key),s=new Dp(t);return new _E(t,s,e._key,r,new eo(n.hasPendingWrites,n.fromCache),e.converter)}(function(e,n=!0){(function(s){_i=s})(gs),Zt(new zt("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),l=new Wn(new nR(r.getProvider("auth-internal")),new oR(r.getProvider("app-check-internal")),function(c,f){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new W(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Uo(c.options.projectId,f)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),Et(Ly,"4.7.3",e),Et(Ly,"4.7.3","esm2017")})();var nN="firebase",rN="10.14.1";/**
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
 */Et(nN,rN,"app");/**
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
 */const xE="firebasestorage.googleapis.com",sN="storageBucket",iN=2*60*1e3,oN=10*60*1e3;/**
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
 */class vn extends nn{constructor(e,n,r=0){super(pd(e),`Firebase Storage: ${n} (${pd(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,vn.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return pd(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var yn;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(yn||(yn={}));function pd(t){return"storage/"+t}function aN(){const t="An unknown error occurred, please check the error payload for server response.";return new vn(yn.UNKNOWN,t)}function lN(){return new vn(yn.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function uN(){return new vn(yn.CANCELED,"User canceled the upload/download.")}function cN(t){return new vn(yn.INVALID_URL,"Invalid URL '"+t+"'.")}function dN(t){return new vn(yn.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function Tv(t){return new vn(yn.INVALID_ARGUMENT,t)}function IE(){return new vn(yn.APP_DELETED,"The Firebase app was deleted.")}function hN(t){return new vn(yn.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
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
 */class Qt{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=Qt.makeFromUrl(e,n)}catch{return new Qt(e,"")}if(r.path==="")return r;throw dN(e)}static makeFromUrl(e,n){let r=null;const s="([A-Za-z0-9.\\-_]+)";function i(C){C.path.charAt(C.path.length-1)==="/"&&(C.path_=C.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+s+o,"i"),u={bucket:1,path:3};function c(C){C.path_=decodeURIComponent(C.path)}const f="v[A-Za-z0-9_]+",m=n.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",A=new RegExp(`^https?://${m}/${f}/b/${s}/o${g}`,"i"),k={bucket:1,path:3},b=n===xE?"(?:storage.googleapis.com|storage.cloud.google.com)":n,N="([^?#]*)",x=new RegExp(`^https?://${b}/${s}/${N}`,"i"),w=[{regex:l,indices:u,postModify:i},{regex:A,indices:k,postModify:c},{regex:x,indices:{bucket:1,path:2},postModify:c}];for(let C=0;C<w.length;C++){const j=w[C],D=j.regex.exec(e);if(D){const _=D[j.indices.bucket];let y=D[j.indices.path];y||(y=""),r=new Qt(_,y),j.postModify(r);break}}if(r==null)throw cN(e);return r}}class fN{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
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
 */function pN(t,e,n){let r=1,s=null,i=null,o=!1,l=0;function u(){return l===2}let c=!1;function f(...N){c||(c=!0,e.apply(null,N))}function m(N){s=setTimeout(()=>{s=null,t(A,u())},N)}function g(){i&&clearTimeout(i)}function A(N,...x){if(c){g();return}if(N){g(),f.call(null,N,...x);return}if(u()||o){g(),f.call(null,N,...x);return}r<64&&(r*=2);let w;l===1?(l=2,w=0):w=(r+Math.random())*1e3,m(w)}let k=!1;function b(N){k||(k=!0,g(),!c&&(s!==null?(N||(l=2),clearTimeout(s),m(0)):N||(l=1)))}return m(0),i=setTimeout(()=>{o=!0,b(!0)},n),b}function mN(t){t(!1)}/**
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
 */function gN(t){return t!==void 0}function xv(t,e,n,r){if(r<e)throw Tv(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw Tv(`Invalid value for '${t}'. Expected ${n} or less.`)}function yN(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const s=e(r)+"="+e(t[r]);n=n+s+"&"}return n=n.slice(0,-1),n}var uu;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(uu||(uu={}));/**
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
 */function vN(t,e){const n=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,i=e.indexOf(t)!==-1;return n||s||i}/**
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
 */class _N{constructor(e,n,r,s,i,o,l,u,c,f,m,g=!0){this.url_=e,this.method_=n,this.headers_=r,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=u,this.timeout_=c,this.progressCallback_=f,this.connectionFactory_=m,this.retry=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((A,k)=>{this.resolve_=A,this.reject_=k,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new Ja(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=l=>{const u=l.loaded,c=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,c)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const l=i.getErrorCode()===uu.NO_ERROR,u=i.getStatus();if(!l||vN(u,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===uu.ABORT;r(!1,new Ja(!1,null,f));return}const c=this.successCodes_.indexOf(u)!==-1;r(!0,new Ja(c,i))})},n=(r,s)=>{const i=this.resolve_,o=this.reject_,l=s.connection;if(s.wasSuccessCode)try{const u=this.callback_(l,l.getResponse());gN(u)?i(u):i()}catch(u){o(u)}else if(l!==null){const u=aN();u.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,u)):o(u)}else if(s.canceled){const u=this.appDelete_?IE():uN();o(u)}else{const u=lN();o(u)}};this.canceled_?n(!1,new Ja(!1,null,!0)):this.backoffId_=pN(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&mN(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Ja{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function wN(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function EN(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function TN(t,e){e&&(t["X-Firebase-GMPID"]=e)}function xN(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function IN(t,e,n,r,s,i,o=!0){const l=yN(t.urlParams),u=t.url+l,c=Object.assign({},t.headers);return TN(c,e),wN(c,n),EN(c,i),xN(c,r),new _N(u,t.method,c,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,o)}/**
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
 */function SN(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function AN(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
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
 */class cu{constructor(e,n){this._service=e,n instanceof Qt?this._location=n:this._location=Qt.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new cu(e,n)}get root(){const e=new Qt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return AN(this._location.path)}get storage(){return this._service}get parent(){const e=SN(this._location.path);if(e===null)return null;const n=new Qt(this._location.bucket,e);return new cu(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw hN(e)}}function Iv(t,e){const n=e==null?void 0:e[sN];return n==null?null:Qt.makeFromBucketSpec(n,t)}function kN(t,e,n,r={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:s}=r;s&&(t._overrideAuthToken=typeof s=="string"?s:fw(s,t.app.options.projectId))}class CN{constructor(e,n,r,s,i){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=xE,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=iN,this._maxUploadRetryTime=oN,this._requests=new Set,s!=null?this._bucket=Qt.makeFromBucketSpec(s,this._host):this._bucket=Iv(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Qt.makeFromBucketSpec(this._url,e):this._bucket=Iv(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){xv("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){xv("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new cu(this,e)}_makeRequest(e,n,r,s,i=!0){if(this._deleted)return new fN(IE());{const o=IN(e,this._appId,r,s,n,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,s).getPromise()}}const Sv="@firebase/storage",Av="0.13.2";/**
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
 */const SE="storage";function RN(t=Ou(),e){t=Te(t);const r=ms(t,SE).getImmediate({identifier:e}),s=cw("storage");return s&&PN(r,...s),r}function PN(t,e,n,r={}){kN(t,e,n,r)}function bN(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new CN(n,r,s,e,gs)}function NN(){Zt(new zt(SE,bN,"PUBLIC").setMultipleInstances(!0)),Et(Sv,Av,""),Et(Sv,Av,"esm2017")}NN();const AE="@firebase/installations",Op="0.6.9";/**
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
 */const kE=1e4,CE=`w:${Op}`,RE="FIS_v2",DN="https://firebaseinstallations.googleapis.com/v1",ON=60*60*1e3,VN="installations",LN="Installations";/**
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
 */const jN={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},ls=new ps(VN,LN,jN);function PE(t){return t instanceof nn&&t.code.includes("request-failed")}/**
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
 */function bE({projectId:t}){return`${DN}/projects/${t}/installations`}function NE(t){return{token:t.token,requestStatus:2,expiresIn:UN(t.expiresIn),creationTime:Date.now()}}async function DE(t,e){const r=(await e.json()).error;return ls.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function OE({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function MN(t,{refreshToken:e}){const n=OE(t);return n.append("Authorization",FN(e)),n}async function VE(t){const e=await t();return e.status>=500&&e.status<600?t():e}function UN(t){return Number(t.replace("s","000"))}function FN(t){return`${RE} ${t}`}/**
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
 */async function BN({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=bE(t),s=OE(t),i=e.getImmediate({optional:!0});if(i){const c=await i.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const o={fid:n,authVersion:RE,appId:t.appId,sdkVersion:CE},l={method:"POST",headers:s,body:JSON.stringify(o)},u=await VE(()=>fetch(r,l));if(u.ok){const c=await u.json();return{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:NE(c.authToken)}}else throw await DE("Create Installation",u)}/**
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
 */function LE(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function zN(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const $N=/^[cdef][\w-]{21}$/,Fh="";function WN(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=HN(t);return $N.test(n)?n:Fh}catch{return Fh}}function HN(t){return zN(t).substr(0,22)}/**
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
 */function rc(t){return`${t.appName}!${t.appId}`}/**
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
 */const jE=new Map;function ME(t,e){const n=rc(t);UE(n,e),qN(n,e)}function UE(t,e){const n=jE.get(t);if(n)for(const r of n)r(e)}function qN(t,e){const n=KN();n&&n.postMessage({key:t,fid:e}),GN()}let Gr=null;function KN(){return!Gr&&"BroadcastChannel"in self&&(Gr=new BroadcastChannel("[Firebase] FID Change"),Gr.onmessage=t=>{UE(t.data.key,t.data.fid)}),Gr}function GN(){jE.size===0&&Gr&&(Gr.close(),Gr=null)}/**
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
 */const QN="firebase-installations-database",YN=1,us="firebase-installations-store";let md=null;function Vp(){return md||(md=Du(QN,YN,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(us)}}})),md}async function du(t,e){const n=rc(t),s=(await Vp()).transaction(us,"readwrite"),i=s.objectStore(us),o=await i.get(n);return await i.put(e,n),await s.done,(!o||o.fid!==e.fid)&&ME(t,e.fid),e}async function FE(t){const e=rc(t),r=(await Vp()).transaction(us,"readwrite");await r.objectStore(us).delete(e),await r.done}async function sc(t,e){const n=rc(t),s=(await Vp()).transaction(us,"readwrite"),i=s.objectStore(us),o=await i.get(n),l=e(o);return l===void 0?await i.delete(n):await i.put(l,n),await s.done,l&&(!o||o.fid!==l.fid)&&ME(t,l.fid),l}/**
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
 */async function Lp(t){let e;const n=await sc(t.appConfig,r=>{const s=XN(r),i=JN(t,s);return e=i.registrationPromise,i.installationEntry});return n.fid===Fh?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function XN(t){const e=t||{fid:WN(),registrationStatus:0};return BE(e)}function JN(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(ls.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=ZN(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:e4(t)}:{installationEntry:e}}async function ZN(t,e){try{const n=await BN(t,e);return du(t.appConfig,n)}catch(n){throw PE(n)&&n.customData.serverCode===409?await FE(t.appConfig):await du(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function e4(t){let e=await kv(t.appConfig);for(;e.registrationStatus===1;)await LE(100),e=await kv(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await Lp(t);return r||n}return e}function kv(t){return sc(t,e=>{if(!e)throw ls.create("installation-not-found");return BE(e)})}function BE(t){return t4(t)?{fid:t.fid,registrationStatus:0}:t}function t4(t){return t.registrationStatus===1&&t.registrationTime+kE<Date.now()}/**
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
 */async function n4({appConfig:t,heartbeatServiceProvider:e},n){const r=r4(t,n),s=MN(t,n),i=e.getImmediate({optional:!0});if(i){const c=await i.getHeartbeatsHeader();c&&s.append("x-firebase-client",c)}const o={installation:{sdkVersion:CE,appId:t.appId}},l={method:"POST",headers:s,body:JSON.stringify(o)},u=await VE(()=>fetch(r,l));if(u.ok){const c=await u.json();return NE(c)}else throw await DE("Generate Auth Token",u)}function r4(t,{fid:e}){return`${bE(t)}/${e}/authTokens:generate`}/**
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
 */async function jp(t,e=!1){let n;const r=await sc(t.appConfig,i=>{if(!zE(i))throw ls.create("not-registered");const o=i.authToken;if(!e&&o4(o))return i;if(o.requestStatus===1)return n=s4(t,e),i;{if(!navigator.onLine)throw ls.create("app-offline");const l=l4(i);return n=i4(t,l),l}});return n?await n:r.authToken}async function s4(t,e){let n=await Cv(t.appConfig);for(;n.authToken.requestStatus===1;)await LE(100),n=await Cv(t.appConfig);const r=n.authToken;return r.requestStatus===0?jp(t,e):r}function Cv(t){return sc(t,e=>{if(!zE(e))throw ls.create("not-registered");const n=e.authToken;return u4(n)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function i4(t,e){try{const n=await n4(t,e),r=Object.assign(Object.assign({},e),{authToken:n});return await du(t.appConfig,r),n}catch(n){if(PE(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await FE(t.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await du(t.appConfig,r)}throw n}}function zE(t){return t!==void 0&&t.registrationStatus===2}function o4(t){return t.requestStatus===2&&!a4(t)}function a4(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+ON}function l4(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}function u4(t){return t.requestStatus===1&&t.requestTime+kE<Date.now()}/**
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
 */async function c4(t){const e=t,{installationEntry:n,registrationPromise:r}=await Lp(e);return r?r.catch(console.error):jp(e).catch(console.error),n.fid}/**
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
 */async function d4(t,e=!1){const n=t;return await h4(n),(await jp(n,e)).token}async function h4(t){const{registrationPromise:e}=await Lp(t);e&&await e}/**
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
 */function f4(t){if(!t||!t.options)throw gd("App Configuration");if(!t.name)throw gd("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw gd(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function gd(t){return ls.create("missing-app-config-values",{valueName:t})}/**
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
 */const $E="installations",p4="installations-internal",m4=t=>{const e=t.getProvider("app").getImmediate(),n=f4(e),r=ms(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},g4=t=>{const e=t.getProvider("app").getImmediate(),n=ms(e,$E).getImmediate();return{getId:()=>c4(n),getToken:s=>d4(n,s)}};function y4(){Zt(new zt($E,m4,"PUBLIC")),Zt(new zt(p4,g4,"PRIVATE"))}y4();Et(AE,Op);Et(AE,Op,"esm2017");/**
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
 */const v4="/firebase-messaging-sw.js",_4="/firebase-cloud-messaging-push-scope",WE="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",w4="https://fcmregistrations.googleapis.com/v1",HE="google.c.a.c_id",E4="google.c.a.c_l",T4="google.c.a.ts",x4="google.c.a.e";var Rv;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(Rv||(Rv={}));/**
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
 */var $o;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})($o||($o={}));/**
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
 */function Sn(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function I4(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),s=new Uint8Array(r.length);for(let i=0;i<r.length;++i)s[i]=r.charCodeAt(i);return s}/**
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
 */const yd="fcm_token_details_db",S4=5,Pv="fcm_token_object_Store";async function A4(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(i=>i.name).includes(yd))return null;let e=null;return(await Du(yd,S4,{upgrade:async(r,s,i,o)=>{var l;if(s<2||!r.objectStoreNames.contains(Pv))return;const u=o.objectStore(Pv),c=await u.index("fcmSenderId").get(t);if(await u.clear(),!!c){if(s===2){const f=c;if(!f.auth||!f.p256dh||!f.endpoint)return;e={token:f.fcmToken,createTime:(l=f.createTime)!==null&&l!==void 0?l:Date.now(),subscriptionOptions:{auth:f.auth,p256dh:f.p256dh,endpoint:f.endpoint,swScope:f.swScope,vapidKey:typeof f.vapidKey=="string"?f.vapidKey:Sn(f.vapidKey)}}}else if(s===3){const f=c;e={token:f.fcmToken,createTime:f.createTime,subscriptionOptions:{auth:Sn(f.auth),p256dh:Sn(f.p256dh),endpoint:f.endpoint,swScope:f.swScope,vapidKey:Sn(f.vapidKey)}}}else if(s===4){const f=c;e={token:f.fcmToken,createTime:f.createTime,subscriptionOptions:{auth:Sn(f.auth),p256dh:Sn(f.p256dh),endpoint:f.endpoint,swScope:f.swScope,vapidKey:Sn(f.vapidKey)}}}}}})).close(),await id(yd),await id("fcm_vapid_details_db"),await id("undefined"),k4(e)?e:null}function k4(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
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
 */const C4="firebase-messaging-database",R4=1,Wo="firebase-messaging-store";let vd=null;function qE(){return vd||(vd=Du(C4,R4,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Wo)}}})),vd}async function P4(t){const e=KE(t),r=await(await qE()).transaction(Wo).objectStore(Wo).get(e);if(r)return r;{const s=await A4(t.appConfig.senderId);if(s)return await Mp(t,s),s}}async function Mp(t,e){const n=KE(t),s=(await qE()).transaction(Wo,"readwrite");return await s.objectStore(Wo).put(e,n),await s.done,e}function KE({appConfig:t}){return t.appId}/**
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
 */const b4={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},ht=new ps("messaging","Messaging",b4);/**
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
 */async function N4(t,e){const n=await Fp(t),r=GE(e),s={method:"POST",headers:n,body:JSON.stringify(r)};let i;try{i=await(await fetch(Up(t.appConfig),s)).json()}catch(o){throw ht.create("token-subscribe-failed",{errorInfo:o==null?void 0:o.toString()})}if(i.error){const o=i.error.message;throw ht.create("token-subscribe-failed",{errorInfo:o})}if(!i.token)throw ht.create("token-subscribe-no-token");return i.token}async function D4(t,e){const n=await Fp(t),r=GE(e.subscriptionOptions),s={method:"PATCH",headers:n,body:JSON.stringify(r)};let i;try{i=await(await fetch(`${Up(t.appConfig)}/${e.token}`,s)).json()}catch(o){throw ht.create("token-update-failed",{errorInfo:o==null?void 0:o.toString()})}if(i.error){const o=i.error.message;throw ht.create("token-update-failed",{errorInfo:o})}if(!i.token)throw ht.create("token-update-no-token");return i.token}async function O4(t,e){const r={method:"DELETE",headers:await Fp(t)};try{const i=await(await fetch(`${Up(t.appConfig)}/${e}`,r)).json();if(i.error){const o=i.error.message;throw ht.create("token-unsubscribe-failed",{errorInfo:o})}}catch(s){throw ht.create("token-unsubscribe-failed",{errorInfo:s==null?void 0:s.toString()})}}function Up({projectId:t}){return`${w4}/projects/${t}/registrations`}async function Fp({appConfig:t,installations:e}){const n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function GE({p256dh:t,auth:e,endpoint:n,vapidKey:r}){const s={web:{endpoint:n,auth:e,p256dh:t}};return r!==WE&&(s.web.applicationPubKey=r),s}/**
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
 */const V4=7*24*60*60*1e3;async function L4(t){const e=await M4(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:Sn(e.getKey("auth")),p256dh:Sn(e.getKey("p256dh"))},r=await P4(t.firebaseDependencies);if(r){if(U4(r.subscriptionOptions,n))return Date.now()>=r.createTime+V4?j4(t,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await O4(t.firebaseDependencies,r.token)}catch(s){console.warn(s)}return bv(t.firebaseDependencies,n)}else return bv(t.firebaseDependencies,n)}async function j4(t,e){try{const n=await D4(t.firebaseDependencies,e),r=Object.assign(Object.assign({},e),{token:n,createTime:Date.now()});return await Mp(t.firebaseDependencies,r),n}catch(n){throw n}}async function bv(t,e){const r={token:await N4(t,e),createTime:Date.now(),subscriptionOptions:e};return await Mp(t,r),r.token}async function M4(t,e){const n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:I4(e)})}function U4(t,e){const n=e.vapidKey===t.vapidKey,r=e.endpoint===t.endpoint,s=e.auth===t.auth,i=e.p256dh===t.p256dh;return n&&r&&s&&i}/**
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
 */function Nv(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return F4(e,t),B4(e,t),z4(e,t),e}function F4(t,e){if(!e.notification)return;t.notification={};const n=e.notification.title;n&&(t.notification.title=n);const r=e.notification.body;r&&(t.notification.body=r);const s=e.notification.image;s&&(t.notification.image=s);const i=e.notification.icon;i&&(t.notification.icon=i)}function B4(t,e){e.data&&(t.data=e.data)}function z4(t,e){var n,r,s,i,o;if(!e.fcmOptions&&!(!((n=e.notification)===null||n===void 0)&&n.click_action))return;t.fcmOptions={};const l=(s=(r=e.fcmOptions)===null||r===void 0?void 0:r.link)!==null&&s!==void 0?s:(i=e.notification)===null||i===void 0?void 0:i.click_action;l&&(t.fcmOptions.link=l);const u=(o=e.fcmOptions)===null||o===void 0?void 0:o.analytics_label;u&&(t.fcmOptions.analyticsLabel=u)}/**
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
 */function $4(t){return typeof t=="object"&&!!t&&HE in t}/**
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
 */function W4(t){if(!t||!t.options)throw _d("App Configuration Object");if(!t.name)throw _d("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(const r of e)if(!n[r])throw _d(r);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function _d(t){return ht.create("missing-app-config-values",{valueName:t})}/**
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
 */class H4{constructor(e,n,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=W4(e);this.firebaseDependencies={app:e,appConfig:s,installations:n,analyticsProvider:r}}_delete(){return Promise.resolve()}}/**
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
 */async function q4(t){try{t.swRegistration=await navigator.serviceWorker.register(v4,{scope:_4}),t.swRegistration.update().catch(()=>{})}catch(e){throw ht.create("failed-service-worker-registration",{browserErrorMessage:e==null?void 0:e.message})}}/**
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
 */async function K4(t,e){if(!e&&!t.swRegistration&&await q4(t),!(!e&&t.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw ht.create("invalid-sw-registration");t.swRegistration=e}}/**
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
 */async function G4(t,e){e?t.vapidKey=e:t.vapidKey||(t.vapidKey=WE)}/**
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
 */async function QE(t,e){if(!navigator)throw ht.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw ht.create("permission-blocked");return await G4(t,e==null?void 0:e.vapidKey),await K4(t,e==null?void 0:e.serviceWorkerRegistration),L4(t)}/**
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
 */async function Q4(t,e,n){const r=Y4(e);(await t.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[HE],message_name:n[E4],message_time:n[T4],message_device_time:Math.floor(Date.now()/1e3)})}function Y4(t){switch(t){case $o.NOTIFICATION_CLICKED:return"notification_open";case $o.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
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
 */async function X4(t,e){const n=e.data;if(!n.isFirebaseMessaging)return;t.onMessageHandler&&n.messageType===$o.PUSH_RECEIVED&&(typeof t.onMessageHandler=="function"?t.onMessageHandler(Nv(n)):t.onMessageHandler.next(Nv(n)));const r=n.data;$4(r)&&r[x4]==="1"&&await Q4(t,n.messageType,r)}const Dv="@firebase/messaging",Ov="0.12.12";/**
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
 */const J4=t=>{const e=new H4(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>X4(e,n)),e},Z4=t=>{const e=t.getProvider("messaging").getImmediate();return{getToken:r=>QE(e,r)}};function e6(){Zt(new zt("messaging",J4,"PUBLIC")),Zt(new zt("messaging-internal",Z4,"PRIVATE")),Et(Dv,Ov),Et(Dv,Ov,"esm2017")}/**
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
 */async function t6(){try{await mw()}catch{return!1}return typeof window<"u"&&pw()&&AS()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */function n6(t=Ou()){return t6().then(e=>{if(!e)throw ht.create("unsupported-browser")},e=>{throw ht.create("indexed-db-unsupported")}),ms(Te(t),"messaging").getImmediate()}async function r6(t,e){return t=Te(t),QE(t,e)}e6();const s6={apiKey:"AIzaSyCKPrE1B2ikGlnr6PmTq4JVLlBDlOe50Co",authDomain:"tmv1-7fc4f.firebaseapp.com",projectId:"tmv1-7fc4f",storageBucket:"tmv1-7fc4f.firebasestorage.app",messagingSenderId:"377085834114",appId:"1:377085834114:web:aeb2ca19e51abe8fc5959b",measurementId:"G-8J8CDN3QFF"},ic=vw(s6),pn=JC(ic),_e=Mb(ic);RN(ic);const i6=n6(ic),Fr=({children:t})=>{const[e,n]=V.useState("checking");return V.useEffect(()=>{const r=Lu(pn,async s=>{if(!s){n("denied");return}try{const i=await ca(xt(_e,"users",s.uid));(i.exists()?i.data():{}).userType==="admin"?n("allowed"):n("denied")}catch{n("denied")}});return()=>r()},[]),e==="checking"?null:e==="denied"?h.jsx(J2,{to:"/home",replace:!0}):t};var YE={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},Vv=hr.createContext&&hr.createContext(YE),o6=["attr","size","title"];function a6(t,e){if(t==null)return{};var n=l6(t,e),r,s;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(s=0;s<i.length;s++)r=i[s],!(e.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}function l6(t,e){if(t==null)return{};var n={};for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r)){if(e.indexOf(r)>=0)continue;n[r]=t[r]}return n}function hu(){return hu=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},hu.apply(this,arguments)}function Lv(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),n.push.apply(n,r)}return n}function fu(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Lv(Object(n),!0).forEach(function(r){u6(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Lv(Object(n)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function u6(t,e,n){return e=c6(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function c6(t){var e=d6(t,"string");return typeof e=="symbol"?e:e+""}function d6(t,e){if(typeof t!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var r=n.call(t,e);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function XE(t){return t&&t.map((e,n)=>hr.createElement(e.tag,fu({key:n},e.attr),XE(e.child)))}function Fe(t){return e=>hr.createElement(h6,hu({attr:fu({},t.attr)},e),XE(t.child))}function h6(t){var e=n=>{var{attr:r,size:s,title:i}=t,o=a6(t,o6),l=s||n.size||"1em",u;return n.className&&(u=n.className),t.className&&(u=(u?u+" ":"")+t.className),hr.createElement("svg",hu({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},n.attr,r,o,{className:u,style:fu(fu({color:t.color||n.color},n.style),t.style),height:l,width:l,xmlns:"http://www.w3.org/2000/svg"}),i&&hr.createElement("title",null,i),t.children)};return Vv!==void 0?hr.createElement(Vv.Consumer,null,n=>e(n)):e(YE)}function f6(t){return Fe({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M12.83 352h262.34A12.82 12.82 0 0 0 288 339.17v-38.34A12.82 12.82 0 0 0 275.17 288H12.83A12.82 12.82 0 0 0 0 300.83v38.34A12.82 12.82 0 0 0 12.83 352zm0-256h262.34A12.82 12.82 0 0 0 288 83.17V44.83A12.82 12.82 0 0 0 275.17 32H12.83A12.82 12.82 0 0 0 0 44.83v38.34A12.82 12.82 0 0 0 12.83 96zM432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"},child:[]}]})(t)}function p6(t){return Fe({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"},child:[]}]})(t)}function cs(t){return Fe({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"},child:[]}]})(t)}function Ho(t){return Fe({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"},child:[]}]})(t)}function m6(t){return Fe({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"},child:[]}]})(t)}function g6(t){return Fe({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"},child:[]}]})(t)}function y6(t){return Fe({attr:{viewBox:"0 0 384 512"},child:[{tag:"path",attr:{d:"M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"},child:[]}]})(t)}function v6(t){return Fe({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M504 255.531c.253 136.64-111.18 248.372-247.82 248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609 22.353-9.551 31.891-1.984C173.062 425.135 212.781 440 256 440c101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 0-93.149 18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314H24c-8.837 0-16-7.163-16-16V38.627c0-14.254 17.234-21.393 27.314-11.314l49.372 49.372C129.209 34.136 189.552 8 256 8c136.81 0 247.747 110.78 248 247.531zm-180.912 78.784l9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679L288 256.349V152c0-13.255-10.745-24-24-24h-16c-13.255 0-24 10.745-24 24v135.651l65.409 50.874c10.463 8.137 25.541 6.253 33.679-4.21z"},child:[]}]})(t)}function _6(t){return Fe({attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"},child:[]}]})(t)}function w6(t){return Fe({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"},child:[]}]})(t)}function Bp(t){return Fe({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"},child:[]}]})(t)}function Ti(t){return Fe({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"},child:[]}]})(t)}function JE(t){return Fe({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M139.61 35.5a12 12 0 0 0-17 0L58.93 98.81l-22.7-22.12a12 12 0 0 0-17 0L3.53 92.41a12 12 0 0 0 0 17l47.59 47.4a12.78 12.78 0 0 0 17.61 0l15.59-15.62L156.52 69a12.09 12.09 0 0 0 .09-17zm0 159.19a12 12 0 0 0-17 0l-63.68 63.72-22.7-22.1a12 12 0 0 0-17 0L3.53 252a12 12 0 0 0 0 17L51 316.5a12.77 12.77 0 0 0 17.6 0l15.7-15.69 72.2-72.22a12 12 0 0 0 .09-16.9zM64 368c-26.49 0-48.59 21.5-48.59 48S37.53 464 64 464a48 48 0 0 0 0-96zm432 16H208a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H208a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H208a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h288a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"},child:[]}]})(t)}function E6(t){return Fe({attr:{viewBox:"0 0 352 512"},child:[{tag:"path",attr:{d:"M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"},child:[]}]})(t)}function T6(t){return Fe({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"},child:[]}]})(t)}function ZE(t){return Fe({attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"},child:[]}]})(t)}function eT(t){return Fe({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"},child:[]}]})(t)}function tT(t){return Fe({attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"},child:[]}]})(t)}const bt=({userType:t})=>{const e=yi(),[n,r]=V.useState(!1),s=l=>e.pathname===l,o=[{path:t==="admin"?"/admin-home":"/home",label:"Home",icon:h.jsx(_6,{})},{path:"/profile",label:"Profile",icon:h.jsx(eT,{})}];return t==="user"&&o.push({path:"/task-history",label:"Task History",icon:h.jsx(v6,{})}),t==="admin"&&o.push({path:"/manage-users",label:"Manage Users",icon:h.jsx(ZE,{})},{path:"/assign-work",label:"Assign Work",icon:h.jsx(JE,{})},{path:"/work-list",label:"Work List",icon:h.jsx(w6,{})}),h.jsx("header",{className:"bg-blue-600 text-white shadow-lg",children:h.jsxs("nav",{className:"container mx-auto px-4 py-4",children:[h.jsxs("div",{className:"flex items-center justify-between",children:[h.jsx("h1",{className:"text-lg sm:text-xl md:text-2xl font-bold",children:"Videography Manager"}),h.jsx("button",{onClick:()=>r(!n),className:"lg:hidden text-2xl focus:outline-none","aria-label":"Toggle menu",children:n?h.jsx(E6,{}):h.jsx(p6,{})}),h.jsx("ul",{className:"hidden lg:flex space-x-6",children:o.map(l=>h.jsx("li",{children:h.jsxs(ry,{to:l.path,className:`flex items-center gap-2 hover:text-blue-200 transition ${s(l.path)?"font-bold border-b-2 border-white pb-1":""}`,children:[l.icon,h.jsx("span",{children:l.label})]})},l.path))})]}),n&&h.jsx("ul",{className:"lg:hidden mt-4 space-y-2 pb-2",children:o.map(l=>h.jsx("li",{children:h.jsxs(ry,{to:l.path,onClick:()=>r(!1),className:`flex items-center gap-3 p-3 rounded hover:bg-blue-700 transition ${s(l.path)?"bg-blue-700 font-bold":""}`,children:[h.jsx("span",{className:"text-xl",children:l.icon}),h.jsx("span",{children:l.label})]})},l.path))})]})})},x6=()=>{const t=Kn();return h.jsxs("div",{className:"min-h-screen bg-gray-100",children:[h.jsx(bt,{userType:"admin"}),h.jsx("main",{className:"container mx-auto px-4 py-6 sm:py-8",children:h.jsxs("div",{className:"max-w-4xl mx-auto",children:[h.jsx("h2",{className:"text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8",children:"Admin Dashboard"}),h.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6",children:[h.jsxs("div",{className:"bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition",children:[h.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[h.jsx(ZE,{className:"text-3xl sm:text-4xl text-blue-600"}),h.jsx("h3",{className:"text-lg sm:text-xl font-semibold text-blue-600",children:"User Management"})]}),h.jsx("p",{className:"text-gray-600 mb-4 text-sm sm:text-base",children:"Create new user accounts for team members and manage their access."}),h.jsx("button",{onClick:()=>t("/create-user"),className:"w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded hover:bg-blue-700 transition font-medium",children:"Go to Create User"})]}),h.jsxs("div",{className:"bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition",children:[h.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[h.jsx(JE,{className:"text-3xl sm:text-4xl text-green-600"}),h.jsx("h3",{className:"text-lg sm:text-xl font-semibold text-green-600",children:"Work Assignment"})]}),h.jsx("p",{className:"text-gray-600 mb-4 text-sm sm:text-base",children:"Create new work projects and assign team members to tasks."}),h.jsx("button",{onClick:()=>t("/assign-work"),className:"w-full bg-green-600 text-white py-2 sm:py-3 px-4 rounded hover:bg-green-700 transition font-medium",children:"Go to Assign Work"})]})]})]})})]})},I6=()=>{const[t,e]=V.useState(null),[n,r]=V.useState([]),[s,i]=V.useState(!0),[o,l]=V.useState(!1),[u,c]=V.useState(""),f="user";V.useEffect(()=>{const C=Lu(pn,j=>{e(j||null),i(!1)});return()=>C()},[]),V.useEffect(()=>{if(!t)return;(async()=>{l(!0);try{const _=(await Rr(gn(_e,"works"))).docs.map(y=>({id:y.id,...y.data()})).filter(y=>Array.isArray(y.assignedUsers)&&y.assignedUsers.includes(t.uid));_.sort((y,E)=>{const I=y.date?new Date(y.date).getTime():0;return(E.date?new Date(E.date).getTime():0)-I}),r(_)}catch(j){console.error("Error loading user tasks:",j)}finally{l(!1)}})()},[t]);const m=C=>{c(C),setTimeout(()=>c(""),4e3)};V.useEffect(()=>{if(!t)return;const C=Qb(gn(_e,"works"),Yb("assignedUsers","array-contains",t.uid)),j=tN(C,D=>{D.docChanges().forEach(_=>{if(_.type==="added"){const y=_.doc.data();m(`New task assigned: ${y.title||"Task"}`),r(E=>E.some(P=>P.id===_.doc.id)?E:[{id:_.doc.id,...y},...E].sort((P,S)=>{const Q=P.date?new Date(P.date).getTime():0;return(S.date?new Date(S.date).getTime():0)-Q}))}})});return()=>j()},[t]);const g=C=>C.status||"incomplete",A=async(C,j)=>{if(g(C)==="complete")return;const D=`${t.uid}_${j}`,_=C.roleCompletion||{},y=_[D]==="done",E={..._};y?delete E[D]:E[D]="done";try{const I=xt(_e,"works",C.id);await da(I,{roleCompletion:E}),r(R=>R.map(P=>P.id===C.id?{...P,roleCompletion:E}:P))}catch(I){console.error("Failed to update role status:",I)}},k=C=>{if(!t)return[];const D=(C.assignedUserDetails||[]).find(_=>_.userId===t.uid);return(D==null?void 0:D.roles)||[]},b=(C,j)=>{const D=`${t.uid}_${j}`;return(C.roleCompletion||{})[D]==="done"},N=C=>{const j=k(C);return j.length?j.every(D=>b(C,D)):!1},x=n.filter(C=>g(C)!=="complete"),T=x.filter(C=>!N(C)),w=x.filter(C=>N(C));return h.jsxs("div",{className:"min-h-screen bg-gray-100",children:[h.jsx(bt,{userType:f}),u&&h.jsx("div",{className:"fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white text-xs sm:text-sm px-4 py-2 rounded shadow",children:u}),h.jsxs("main",{className:"container mx-auto px-4 py-8",children:[h.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-gray-800 mb-4",children:"Welcome"}),h.jsx("p",{className:"text-gray-600 text-sm sm:text-base mb-6",children:"Here are your tasks. Mark each work type as done when you finish. You can undo until admin marks the task as complete."}),s||o?h.jsxs("div",{className:"flex items-center gap-2 text-gray-600",children:[h.jsx(Ti,{className:"animate-spin text-xl text-blue-600"}),h.jsx("span",{children:"Loading tasks..."})]}):x.length===0?h.jsx("p",{className:"text-gray-600 text-sm sm:text-base",children:"You do not have any active tasks."}):h.jsxs(h.Fragment,{children:[T.length>0&&h.jsxs("section",{className:"mb-6",children:[h.jsx("h2",{className:"text-lg sm:text-xl font-semibold text-gray-800 mb-3",children:"Current tasks"}),h.jsx("div",{className:"space-y-3",children:T.map(C=>{const j=k(C);return h.jsxs("div",{className:"bg-white rounded-lg shadow p-4 sm:p-5",children:[h.jsx("h3",{className:"font-semibold text-gray-800 text-sm sm:text-base mb-1",children:C.title||"Task"}),C.date&&h.jsxs("p",{className:"flex items-center gap-1 text-xs sm:text-sm text-gray-500",children:[h.jsx(cs,{}),h.jsx("span",{children:new Date(C.date).toLocaleDateString()})]}),C.description&&h.jsx("p",{className:"text-gray-700 text-xs sm:text-sm mt-2",children:C.description}),h.jsxs("div",{className:"mt-3",children:[h.jsx("p",{className:"text-xs sm:text-sm font-semibold text-gray-700 mb-2",children:"Your work types:"}),h.jsx("div",{className:"flex flex-wrap gap-2",children:j.map(D=>{const _=b(C,D);return h.jsxs("button",{type:"button",onClick:()=>A(C,D),className:`inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs sm:text-sm font-semibold transition ${_?"bg-green-600 text-white hover:bg-green-700":"bg-gray-200 text-gray-700 hover:bg-gray-300"}`,children:[_&&h.jsx(Ho,{}),D]},D)})})]})]},C.id)})})]}),w.length>0&&h.jsxs("section",{children:[h.jsx("h2",{className:"text-lg sm:text-xl font-semibold text-gray-800 mb-3",children:"Done tasks (waiting for admin)"}),h.jsx("div",{className:"space-y-3",children:w.map(C=>{const j=k(C);return h.jsxs("div",{className:"bg-white rounded-lg shadow p-4 sm:p-5",children:[h.jsx("h3",{className:"font-semibold text-gray-800 text-sm sm:text-base mb-1",children:C.title||"Task"}),C.date&&h.jsxs("p",{className:"flex items-center gap-1 text-xs sm:text-sm text-gray-500",children:[h.jsx(cs,{}),h.jsx("span",{children:new Date(C.date).toLocaleDateString()})]}),C.description&&h.jsx("p",{className:"text-gray-700 text-xs sm:text-sm mt-2",children:C.description}),h.jsxs("div",{className:"mt-3",children:[h.jsx("p",{className:"text-xs sm:text-sm font-semibold text-gray-700 mb-2",children:"Your work types:"}),h.jsx("div",{className:"flex flex-wrap gap-2",children:j.map(D=>{const _=b(C,D);return h.jsxs("button",{type:"button",onClick:()=>A(C,D),className:`inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs sm:text-sm font-semibold transition ${_?"bg-green-600 text-white hover:bg-green-700":"bg-gray-200 text-gray-700 hover:bg-gray-300"}`,children:[_&&h.jsx(Ho,{}),D]},D)})})]}),h.jsx("p",{className:"mt-3 text-xs sm:text-sm text-green-700 font-semibold",children:"All your work types are marked as done. Waiting for admin to complete."})]},C.id)})})]})]})]})]})},S6=()=>{const t=Kn(),[e,n]=V.useState({email:"",password:""}),[r,s]=V.useState(!1),[i,o]=V.useState(""),l=c=>{n(f=>({...f,[c.target.name]:c.target.value}))},u=async c=>{c.preventDefault(),o(""),s(!0);try{const m=(await Lk(pn,e.email,e.password)).user,g=xt(_e,"users",m.uid),A=await ca(g);let k="user";A.exists()&&(k=A.data().userType||"user"),t(k==="admin"?"/admin-home":"/home")}catch(f){o(f.message||"Failed to log in.")}finally{s(!1)}};return h.jsx("div",{className:"min-h-screen bg-gray-100 flex items-center justify-center px-4",children:h.jsxs("div",{className:"w-full max-w-md bg-white rounded-lg shadow-md p-4 sm:p-6",children:[h.jsx("h1",{className:"text-xl sm:text-2xl font-bold text-gray-800 mb-4",children:"Log In"}),i&&h.jsx("div",{className:"mb-4 p-3 rounded bg-red-100 text-red-700 text-sm",children:i}),h.jsxs("form",{onSubmit:u,className:"space-y-3 sm:space-y-4",children:[h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Email"}),h.jsx("input",{type:"email",name:"email",value:e.email,onChange:l,required:!0,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Password"}),h.jsx("input",{type:"password",name:"password",value:e.password,onChange:l,required:!0,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),h.jsx("button",{type:"submit",disabled:r,className:"w-full bg-blue-600 text-white py-2 rounded font-semibold text-sm hover:bg-blue-700 disabled:opacity-50",children:r?"Logging in...":"Log In"}),h.jsxs("p",{className:"mt-3 text-center text-xs sm:text-sm text-gray-600",children:["Do not have an account?"," ",h.jsx("span",{onClick:()=>t("/signup"),className:"text-blue-600 font-semibold cursor-pointer hover:underline",children:"Sign up"})]})]})]})})},A6="mihirudahanayake@gmail.com",k6=["videography","photography"],C6=()=>{const t=Kn(),[e,n]=V.useState({name:"",email:"",phoneNo:"",departments:["videography"],firstPriority:"videography",batch:"20/21",studyDepartment:"ITT",gender:"male",registrationNumber:"",cardNumber:"",birthday:"",password:"",confirmPassword:""}),[r,s]=V.useState(!1),[i,o]=V.useState(""),l=m=>{n(g=>({...g,[m.target.name]:m.target.value}))},u=m=>{n(g=>{const k=g.departments.includes(m)?g.departments.filter(N=>N!==m):[...g.departments,m];let b=g.firstPriority;return k.includes(b)||(b=k[0]||""),{...g,departments:k,firstPriority:b}})},c=async m=>{if(m.preventDefault(),o(""),e.password!==e.confirmPassword){o("Password and confirm password do not match.");return}if(e.departments.length===0){o("Please select at least one work department.");return}s(!0);try{const A=(await Hw(pn,e.email,e.password)).user,k=A.email===A6?"admin":"user";await EE(xt(_e,"users",A.uid),{name:e.name,email:e.email,phoneNo:e.phoneNo,departments:e.departments,firstPriority:e.firstPriority,batch:e.batch,studyDepartment:e.studyDepartment,gender:e.gender,registrationNumber:e.registrationNumber,cardNumber:e.cardNumber||null,birthday:e.birthday||null,userType:k,createdAt:new Date().toISOString()}),t(k==="admin"?"/admin-home":"/home")}catch(g){o(g.message||"Failed to sign up.")}finally{s(!1)}},f=m=>e.departments.includes(m);return h.jsx("div",{className:"min-h-screen bg-gray-100 flex items-center justify-center px-4",children:h.jsxs("div",{className:"w-full max-w-md bg-white rounded-lg shadow-md p-4 sm:p-6",children:[h.jsx("h1",{className:"text-xl sm:text-2xl font-bold text-gray-800 mb-4",children:"Sign Up"}),i&&h.jsx("div",{className:"mb-4 p-3 rounded bg-red-100 text-red-700 text-sm",children:i}),h.jsxs("form",{onSubmit:c,className:"space-y-3 sm:space-y-4",children:[h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Name"}),h.jsx("input",{type:"text",name:"name",value:e.name,onChange:l,required:!0,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Email"}),h.jsx("input",{type:"email",name:"email",value:e.email,onChange:l,required:!0,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Phone number"}),h.jsx("input",{type:"tel",name:"phoneNo",value:e.phoneNo,onChange:l,required:!0,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Batch"}),h.jsxs("select",{name:"batch",value:e.batch,onChange:l,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm",children:[h.jsx("option",{value:"20/21",children:"20/21"}),h.jsx("option",{value:"21/22",children:"21/22"}),h.jsx("option",{value:"22/23",children:"22/23"}),h.jsx("option",{value:"23/24",children:"23/24"})]})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Department in study"}),h.jsxs("select",{name:"studyDepartment",value:e.studyDepartment,onChange:l,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm",children:[h.jsx("option",{value:"ITT",children:"ITT"}),h.jsx("option",{value:"EET",children:"EET"}),h.jsx("option",{value:"MTT",children:"MTT"}),h.jsx("option",{value:"BPT",children:"BPT"}),h.jsx("option",{value:"Food",children:"Food"})]})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Gender"}),h.jsxs("div",{className:"flex items-center gap-4 text-sm",children:[h.jsxs("label",{className:"flex items-center gap-2",children:[h.jsx("input",{type:"radio",name:"gender",value:"male",checked:e.gender==="male",onChange:l}),h.jsx("span",{children:"Male"})]}),h.jsxs("label",{className:"flex items-center gap-2",children:[h.jsx("input",{type:"radio",name:"gender",value:"female",checked:e.gender==="female",onChange:l}),h.jsx("span",{children:"Female"})]})]})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Registration number"}),h.jsx("input",{type:"text",name:"registrationNumber",value:e.registrationNumber,onChange:l,required:!0,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Card (if have)"}),h.jsx("input",{type:"text",name:"cardNumber",value:e.cardNumber,onChange:l,placeholder:"Optional",className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Birthday"}),h.jsx("input",{type:"date",name:"birthday",value:e.birthday,onChange:l,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Departments (work)"}),h.jsx("div",{className:"bg-gray-50 border rounded p-2 flex flex-col gap-1",children:k6.map(m=>h.jsxs("label",{className:"flex items-center gap-2 text-sm",children:[h.jsx("input",{type:"checkbox",checked:f(m),onChange:()=>u(m)}),h.jsx("span",{className:"capitalize",children:m})]},m))}),h.jsx("p",{className:"mt-1 text-xs text-gray-500",children:"You can select one or more departments."})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"First priority department (work)"}),h.jsx("select",{name:"firstPriority",value:e.firstPriority,onChange:l,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm",children:e.departments.map(m=>h.jsx("option",{value:m,children:m},m))})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Password"}),h.jsx("input",{type:"password",name:"password",value:e.password,onChange:l,required:!0,minLength:6,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Confirm password"}),h.jsx("input",{type:"password",name:"confirmPassword",value:e.confirmPassword,onChange:l,required:!0,minLength:6,className:"w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"})]}),h.jsx("button",{type:"submit",disabled:r,className:"w-full bg-blue-600 text-white py-2 rounded font-semibold text-sm hover:bg-blue-700 disabled:opacity-50",children:r?"Creating account...":"Sign Up"}),h.jsxs("p",{className:"mt-3 text-center text-xs sm:text-sm text-gray-600",children:["Already have an account?"," ",h.jsx("span",{onClick:()=>t("/"),className:"text-blue-600 font-semibold cursor-pointer hover:underline",children:"Log in"})]})]})]})})},R6=()=>{const[t,e]=V.useState({name:"",email:"",password:"",phone:"",specialty:""}),[n,r]=V.useState(!1),[s,i]=V.useState({type:"",text:""}),o=u=>{e(c=>({...c,[u.target.name]:u.target.value}))},l=async u=>{u.preventDefault(),r(!0),i({type:"",text:""});try{const c=await Hw(pn,t.email,t.password),f=t.email==="mihirudahanayake@gmail.com"?"admin":"user";await EE(xt(_e,"users",c.user.uid),{name:t.name,email:t.email,phone:t.phone,specialty:t.specialty,role:f,createdAt:new Date().toISOString()}),i({type:"success",text:"User created successfully."}),e({name:"",email:"",password:"",phone:"",specialty:""})}catch(c){i({type:"error",text:c.message})}finally{r(!1)}};return h.jsxs("div",{className:"min-h-screen bg-gray-100",children:[h.jsx(bt,{userType:"admin"}),h.jsx("main",{className:"container mx-auto px-4 py-6 sm:py-8",children:h.jsxs("div",{className:"max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-8",children:[h.jsx("h2",{className:"text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6",children:"Create New User Account"}),s.text&&h.jsx("div",{className:`mb-4 p-3 sm:p-4 rounded text-sm sm:text-base ${s.type==="success"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`,children:s.text}),h.jsxs("form",{onSubmit:l,className:"space-y-4",children:[h.jsxs("div",{children:[h.jsx("label",{className:"block text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:"Name"}),h.jsx("input",{type:"text",name:"name",value:t.name,onChange:o,required:!0,className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:"Email"}),h.jsx("input",{type:"email",name:"email",value:t.email,onChange:o,required:!0,className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:"Password"}),h.jsx("input",{type:"password",name:"password",value:t.password,onChange:o,required:!0,minLength:6,className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:"Phone"}),h.jsx("input",{type:"tel",name:"phone",value:t.phone,onChange:o,className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:"Specialty"}),h.jsx("input",{type:"text",name:"specialty",value:t.specialty,onChange:o,className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"})]}),h.jsx("button",{type:"submit",disabled:n,className:"w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50 text-sm sm:text-base",children:n?"Creating user...":"Create User"})]})]})})]})},P6=["videography","editing"],b6=()=>{const[t,e]=V.useState([]),[n,r]=V.useState({title:"",description:"",date:"",priority:"medium",assignedUsers:[]}),[s,i]=V.useState(!1),[o,l]=V.useState({type:"",text:""}),[u,c]=V.useState("");V.useEffect(()=>{f()},[]);const f=async()=>{try{const C=(await Rr(gn(_e,"users"))).docs.map(j=>({id:j.id,...j.data()}));e(C)}catch(w){console.error("Error fetching users:",w)}},m=w=>{r(C=>({...C,[w.target.name]:w.target.value}))},g=w=>{r(C=>C.assignedUsers.find(D=>D.userId===w)?{...C,assignedUsers:C.assignedUsers.filter(D=>D.userId!==w)}:{...C,assignedUsers:[...C.assignedUsers,{userId:w,roles:["videography"]}]})},A=(w,C)=>{r(j=>{const D=j.assignedUsers.map(_=>{if(_.userId!==w)return _;const E=_.roles.includes(C)?_.roles.filter(I=>I!==C):[..._.roles,C];return{..._,roles:E.length?E:[C]}});return{...j,assignedUsers:D}})},k=async w=>{w.preventDefault(),i(!0),l({type:"",text:""});try{await eN(gn(_e,"works"),{title:n.title,description:n.description,date:n.date,priority:n.priority,assignedUsers:n.assignedUsers.map(C=>C.userId),assignedUserDetails:n.assignedUsers,createdAt:new Date().toISOString(),status:"pending"}),l({type:"success",text:"Work assigned successfully!"}),r({title:"",description:"",date:"",priority:"medium",assignedUsers:[]})}catch(C){l({type:"error",text:C.message})}finally{i(!1)}},b=w=>n.assignedUsers.some(C=>C.userId===w),N=w=>{var C;return((C=n.assignedUsers.find(j=>j.userId===w))==null?void 0:C.roles)||[]},x=u.trim().toLowerCase(),T=t.filter(w=>{if(!x)return!0;const C=(w.name||"").toLowerCase(),j=(w.cardNumber||"").toLowerCase();return C.includes(x)||j.includes(x)});return h.jsxs("div",{className:"min-h-screen bg-gray-100",children:[h.jsx(bt,{userType:"admin"}),h.jsx("main",{className:"container mx-auto px-4 py-6 sm:py-8",children:h.jsxs("div",{className:"max-w-3xl mx-auto bg-white rounded-lg shadow-md p-4 sm:p-8",children:[h.jsx("h2",{className:"text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6",children:"Create and Assign Work"}),o.text&&h.jsx("div",{className:`mb-4 p-3 sm:p-4 rounded text-sm sm:text-base ${o.type==="success"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`,children:o.text}),h.jsxs("form",{onSubmit:k,className:"space-y-4",children:[h.jsxs("div",{children:[h.jsxs("label",{className:"flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:[h.jsx(y6,{}),h.jsx("span",{children:"Work Title"})]}),h.jsx("input",{type:"text",name:"title",value:n.title,onChange:m,required:!0,className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"})]}),h.jsxs("div",{children:[h.jsxs("label",{className:"flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:[h.jsx(f6,{}),h.jsx("span",{children:"Description"})]}),h.jsx("textarea",{name:"description",value:n.description,onChange:m,required:!0,rows:"4",className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"})]}),h.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[h.jsxs("div",{children:[h.jsxs("label",{className:"flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:[h.jsx(cs,{}),h.jsx("span",{children:"Date"})]}),h.jsx("input",{type:"date",name:"date",value:n.date,onChange:m,required:!0,className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"})]}),h.jsxs("div",{children:[h.jsxs("label",{className:"flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:[h.jsx(g6,{}),h.jsx("span",{children:"Priority"})]}),h.jsxs("select",{name:"priority",value:n.priority,onChange:m,className:"w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base",children:[h.jsx("option",{value:"low",children:"Low"}),h.jsx("option",{value:"medium",children:"Medium"}),h.jsx("option",{value:"high",children:"High"}),h.jsx("option",{value:"urgent",children:"Urgent"})]})]})]}),h.jsxs("div",{children:[h.jsxs("label",{className:"flex items-center gap-2 text-gray-700 font-semibold mb-2 text-sm sm:text-base",children:[h.jsx(tT,{}),h.jsx("span",{children:"Assign Team Members"})]}),h.jsxs("div",{className:"relative mb-2",children:[h.jsx(Bp,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"}),h.jsx("input",{type:"text",placeholder:"Search by name or card...",value:u,onChange:w=>c(w.target.value),className:"w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"})]}),h.jsx("div",{className:"border border-gray-300 rounded p-3 sm:p-4 max-h-60 overflow-y-auto",children:T.length===0?h.jsx("p",{className:"text-gray-500 text-sm sm:text-base",children:"No users found"}):T.map(w=>{const C=b(w.id),j=N(w.id);return h.jsxs("div",{className:"mb-2 p-2 rounded hover:bg-gray-50",children:[h.jsxs("label",{className:"flex items-center cursor-pointer",children:[h.jsx("input",{type:"checkbox",checked:C,onChange:()=>g(w.id),className:"mr-3 w-4 h-4"}),h.jsx("div",{className:"flex-1",children:h.jsxs("p",{className:"text-gray-700 text-sm sm:text-base",children:[w.name," ",h.jsxs("span",{className:"text-xs text-gray-500",children:["(",w.cardNumber||"-",")"]})]})})]}),C&&h.jsx("div",{className:"mt-1 ml-7 flex flex-wrap gap-2 text-xs sm:text-sm",children:P6.map(D=>h.jsx("button",{type:"button",onClick:()=>A(w.id,D),className:`px-2 py-1 rounded border ${j.includes(D)?"bg-green-600 text-white border-green-600":"bg-white text-gray-700 border-gray-300"}`,children:D},D))})]},w.id)})}),h.jsxs("p",{className:"text-xs sm:text-sm text-gray-500 mt-2",children:["Selected: ",n.assignedUsers.length," member(s)"]})]}),h.jsx("button",{type:"submit",disabled:s||n.assignedUsers.length===0,className:"w-full bg-green-600 text-white py-2 sm:py-3 px-4 rounded font-semibold hover:bg-green-700 transition disabled:opacity-50 text-sm sm:text-base",children:s?"Creating Work...":"Create and Assign Work"})]})]})})]})},N6=()=>{const[t,e]=V.useState([]),[n,r]=V.useState({}),[s,i]=V.useState(!0),[o,l]=V.useState(""),[u,c]=V.useState(""),[f,m]=V.useState(""),g=Kn();V.useEffect(()=>{A()},[]);const A=async()=>{i(!0);try{const D=await Rr(gn(_e,"users")),_={};D.docs.forEach(I=>{_[I.id]=I.data()}),r(_);const E=(await Rr(gn(_e,"works"))).docs.map(I=>({id:I.id,...I.data()}));e(E)}catch(D){console.error("Error fetching data:",D)}finally{i(!1)}},k=async D=>{try{const _=xt(_e,"works",D);await da(_,{status:"complete"}),e(y=>y.map(E=>E.id===D?{...E,status:"complete"}:E))}catch(_){console.error("Failed to mark task complete:",_)}},b=o.trim().toLowerCase(),N=t.filter(D=>{if(u||f){if(!D.date)return!1;const Q=new Date(D.date),Ie=new Date(Q.getTime()-Q.getTimezoneOffset()*6e4).toISOString().slice(0,10);if(u&&Ie<u||f&&Ie>f)return!1}if(!b)return!0;const _=(D.title||"").toLowerCase(),y=(D.assignedUsers||[]).map(Q=>n[Q]||{}),E=y.map(Q=>(Q.name||"").toLowerCase()),I=y.map(Q=>(Q.cardNumber||"").toLowerCase()),R=_.includes(b),P=E.some(Q=>Q.includes(b)),S=I.some(Q=>Q.includes(b));return R||P||S}).sort((D,_)=>{const y=D.date?new Date(D.date).getTime():0;return(_.date?new Date(_.date).getTime():0)-y}),x=N.filter(D=>(D.status||"incomplete")!=="complete"),T=N.filter(D=>(D.status||"incomplete")==="complete");if(s)return h.jsxs("div",{className:"min-h-screen bg-gray-100",children:[h.jsx(bt,{userType:"admin"}),h.jsxs("div",{className:"flex flex-col justify-center items-center h-64",children:[h.jsx(Ti,{className:"animate-spin text-4xl text-blue-600 mb-4"}),h.jsx("p",{className:"text-gray-600",children:"Loading tasks..."})]})]});const w=D=>{const _={incomplete:"bg-gray-100 text-gray-800",done:"bg-yellow-100 text-yellow-800",complete:"bg-green-100 text-green-800"};return _[D]||_.incomplete},C=(D,_=!1)=>{var R;const y=D.status||"incomplete",E=D.assignedUserDetails||[],I=D.roleCompletion||{};return h.jsxs("div",{className:"bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-xl transition cursor-pointer",onClick:()=>g(`/tasks/${D.id}`),children:[h.jsxs("div",{className:"flex justify-between items-start mb-3",children:[h.jsxs("div",{className:"flex-1 pr-2",children:[h.jsx("h3",{className:"text-lg sm:text-xl font-semibold text-gray-800",children:D.title||"Task"}),h.jsxs("p",{className:"mt-1 text-xs sm:text-sm text-gray-500 capitalize",children:["Priority: ",D.priority||"medium"]})]}),h.jsx("span",{className:`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold capitalize ${w(y)}`,children:y})]}),D.description&&h.jsx("p",{className:"text-gray-600 mb-4 text-sm sm:text-base line-clamp-3",children:D.description}),D.date&&h.jsx("div",{className:"mb-3",children:h.jsxs("div",{className:"flex items-center gap-2 text-xs sm:text-sm text-gray-500",children:[h.jsx(cs,{}),h.jsxs("span",{children:["Date: ",new Date(D.date).toLocaleDateString()]})]})}),h.jsxs("div",{className:"mb-3",children:[h.jsxs("div",{className:"flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2",children:[h.jsx(tT,{}),h.jsx("span",{children:"Assigned to:"})]}),h.jsxs("div",{className:"space-y-2",children:[E.map(P=>{var It;const S=P.userId,Q=P.roles||[],Ie=((It=n[S])==null?void 0:It.name)||"Unknown";return h.jsxs("div",{className:"bg-gray-50 px-2 py-1 rounded text-xs sm:text-sm",children:[h.jsx("p",{className:"font-semibold text-gray-800",children:Ie}),h.jsx("div",{className:"flex flex-wrap gap-1 mt-1",children:Q.map(Be=>{const B=`${S}_${Be}`,q=I[B]==="done";return h.jsxs("span",{className:`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${q?"bg-green-100 text-green-800":"bg-gray-200 text-gray-700"}`,children:[q&&h.jsx(Ho,{className:"text-xs"}),Be]},Be)})})]},S)}),E.length===0&&((R=D.assignedUsers)==null?void 0:R.map(P=>{var S;return h.jsx("span",{className:"bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm text-gray-700",children:((S=n[P])==null?void 0:S.name)||"Unknown"},P)}))]})]}),!_&&h.jsxs("button",{type:"button",onClick:P=>{P.stopPropagation(),k(D.id)},className:"mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded bg-green-600 text-white text-xs sm:text-sm hover:bg-green-700",children:[h.jsx(Ho,{}),"Mark as complete"]}),_&&h.jsx("p",{className:"mt-2 text-xs sm:text-sm text-green-700 font-semibold",children:"Completed"})]},D.id)},j=x.length>0||T.length>0;return h.jsxs("div",{className:"min-h-screen bg-gray-100",children:[h.jsx(bt,{userType:"admin"}),h.jsxs("main",{className:"container mx-auto px-4 py-6 sm:py-8",children:[h.jsxs("div",{className:"flex flex-col gap-3 mb-4 sm:mb-6",children:[h.jsx("h2",{className:"text-xl sm:text-2xl font-bold text-gray-800",children:"All Tasks"}),h.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center gap-3",children:[h.jsxs("div",{className:"relative flex-1 min-w-0",children:[h.jsx(Bp,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"}),h.jsx("input",{type:"text",placeholder:"Search title, user name, or card...",value:o,onChange:D=>l(D.target.value),className:"w-full pl-9 pr-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),h.jsxs("div",{className:"grid grid-cols-2 gap-2 sm:flex sm:gap-2 w-full sm:w-auto",children:[h.jsx("input",{type:"date",value:u,onChange:D=>c(D.target.value),className:"w-full px-2 py-2 border rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500","aria-label":"Start date"}),h.jsx("input",{type:"date",value:f,onChange:D=>m(D.target.value),className:"w-full px-2 py-2 border rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500","aria-label":"End date"})]})]})]}),j?h.jsxs(h.Fragment,{children:[x.length>0&&h.jsxs("section",{className:"mb-6",children:[h.jsx("h3",{className:"text-lg sm:text-xl font-semibold text-gray-800 mb-3",children:"Incomplete / waiting for admin"}),h.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",children:x.map(D=>C(D,!1))})]}),T.length>0&&h.jsxs("section",{children:[h.jsx("h3",{className:"text-lg sm:text-xl font-semibold text-gray-800 mb-3",children:"Completed tasks"}),h.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",children:T.map(D=>C(D,!0))})]})]}):h.jsx("div",{className:"bg-white rounded-lg shadow-md p-6 sm:p-8 text-center",children:h.jsx("p",{className:"text-gray-600 text-sm sm:text-base",children:"No tasks match your filters."})})]})]})},D6=()=>{const[t,e]=V.useState(null),[n,r]=V.useState(null),[s,i]=V.useState("loading"),[o,l]=V.useState(!1),[u,c]=V.useState(!1),[f,m]=V.useState(!1),[g,A]=V.useState(!1),[k,b]=V.useState(""),[N,x]=V.useState(""),[T,w]=V.useState(""),[C,j]=V.useState(""),[D,_]=V.useState({newPassword:"",confirmPassword:""}),y=Kn();V.useEffect(()=>{const q=Lu(pn,async K=>{if(!K){i("no-auth"),e(null);return}try{const re=await ca(xt(_e,"users",K.uid));if(re.exists()){const ie={id:K.uid,...re.data()};e(ie),r(ie)}i("ready")}catch(re){console.error(re),i("error")}});return()=>q()},[]);const E=async()=>{await Bk(pn),y("/")},I=q=>{if(!o)return;const{name:K,value:re}=q.target;e(ie=>({...ie,[K]:re}))},R=()=>{b(""),x(""),r(t),l(!0)},P=()=>{b(""),x(""),e(n),l(!1)},S=async q=>{if(q.preventDefault(),!!(t!=null&&t.id)){m(!0),b(""),x("");try{const K=xt(_e,"users",t.id),{id:re,userType:ie,createdAt:Se,...$t}=t;await da(K,$t),x("Profile updated successfully."),l(!1),r(t)}catch(K){console.error(K),b("Failed to update profile.")}finally{m(!1)}}},Q=()=>{w(""),j(""),_({newPassword:"",confirmPassword:""}),c(!0)},Ie=()=>{w(""),j(""),_({newPassword:"",confirmPassword:""}),c(!1)},It=async q=>{if(q.preventDefault(),w(""),j(""),D.newPassword.length<6){w("New password must be at least 6 characters.");return}if(D.newPassword!==D.confirmPassword){w("New password and confirm password do not match.");return}const K=pn.currentUser;if(!K){w("You are not logged in.");return}A(!0);try{await jk(K,D.newPassword),j("Password updated successfully."),c(!1),_({newPassword:"",confirmPassword:""})}catch(re){console.error(re),w(re.message||"Failed to update password.")}finally{A(!1)}},Be=(t==null?void 0:t.userType)==="admin"?"admin":"user",B="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";return h.jsxs("div",{className:"min-h-screen bg-gray-100",children:[h.jsx(bt,{userType:Be}),h.jsxs("main",{className:"container mx-auto px-4 py-6 sm:py-8 max-w-2xl",children:[h.jsxs("div",{className:"flex items-center justify-between mb-6",children:[h.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-gray-800",children:"Profile"}),h.jsx("button",{onClick:E,className:"text-xs sm:text-sm px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700",children:"Logout"})]}),s==="loading"&&h.jsx("p",{className:"text-gray-600 text-sm sm:text-base",children:"Loading profile..."}),s==="no-auth"&&h.jsx("p",{className:"text-gray-600 text-sm sm:text-base",children:"You are not logged in."}),s==="error"&&h.jsx("p",{className:"text-red-600 text-sm sm:text-base",children:"Failed to load profile information."}),s==="ready"&&t&&h.jsxs(h.Fragment,{children:[h.jsxs("form",{onSubmit:S,className:"bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-3 mb-6",children:[h.jsxs("div",{className:"flex justify-between items-center mb-2",children:[h.jsx("h2",{className:"text-lg font-semibold text-gray-800",children:"Profile details"}),o?h.jsxs("div",{className:"flex gap-2",children:[h.jsx("button",{type:"submit",disabled:f,className:"text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50",children:f?"Saving...":"Save"}),h.jsx("button",{type:"button",onClick:P,className:"text-sm px-3 py-1 rounded bg-gray-300 text-gray-800 hover:bg-gray-400",children:"Cancel"})]}):h.jsx("button",{type:"button",onClick:R,className:"text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700",children:"Edit"})]}),k&&h.jsx("div",{className:"p-2 rounded bg-red-100 text-red-700 text-sm",children:k}),N&&h.jsx("div",{className:"p-2 rounded bg-green-100 text-green-700 text-sm",children:N}),h.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:[h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Name"}),h.jsx("input",{type:"text",name:"name",value:t.name||"",onChange:I,className:B,disabled:!o})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Phone"}),h.jsx("input",{type:"tel",name:"phoneNo",value:t.phoneNo||"",onChange:I,className:B,disabled:!o})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Batch"}),h.jsxs("select",{name:"batch",value:t.batch||"20/21",onChange:I,className:B,disabled:!o,children:[h.jsx("option",{value:"20/21",children:"20/21"}),h.jsx("option",{value:"21/22",children:"21/22"}),h.jsx("option",{value:"22/23",children:"22/23"}),h.jsx("option",{value:"23/24",children:"23/24"})]})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Study department"}),h.jsxs("select",{name:"studyDepartment",value:t.studyDepartment||"ITT",onChange:I,className:B,disabled:!o,children:[h.jsx("option",{value:"ITT",children:"ITT"}),h.jsx("option",{value:"EET",children:"EET"}),h.jsx("option",{value:"MTT",children:"MTT"}),h.jsx("option",{value:"BPT",children:"BPT"}),h.jsx("option",{value:"Food",children:"Food"})]})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Gender"}),h.jsxs("select",{name:"gender",value:t.gender||"male",onChange:I,className:B,disabled:!o,children:[h.jsx("option",{value:"male",children:"Male"}),h.jsx("option",{value:"female",children:"Female"})]})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Registration number"}),h.jsx("input",{type:"text",name:"registrationNumber",value:t.registrationNumber||"",onChange:I,className:B,disabled:!o})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Card"}),h.jsx("input",{type:"text",name:"cardNumber",value:t.cardNumber||"",onChange:I,className:B,disabled:!o})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Birthday"}),h.jsx("input",{type:"date",name:"birthday",value:t.birthday||"",onChange:I,className:B,disabled:!o})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Work department"}),h.jsxs("select",{name:"department",value:t.department||"videography",onChange:I,className:B,disabled:!o,children:[h.jsx("option",{value:"videography",children:"Videography"}),h.jsx("option",{value:"photography",children:"Photography"})]})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"First priority (work)"}),h.jsxs("select",{name:"firstPriority",value:t.firstPriority||"videography",onChange:I,className:B,disabled:!o,children:[h.jsx("option",{value:"videography",children:"Videography"}),h.jsx("option",{value:"photography",children:"Photography"})]})]})]})]}),h.jsxs("div",{className:"bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-3",children:[h.jsxs("div",{className:"flex justify-between items-center mb-1",children:[h.jsx("h2",{className:"text-lg font-semibold text-gray-800",children:"Change password"}),u?h.jsx("button",{type:"button",onClick:Ie,className:"text-sm px-3 py-1 rounded bg-gray-300 text-gray-800 hover:bg-gray-400",children:"Cancel"}):h.jsx("button",{type:"button",onClick:Q,className:"text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700",children:"Change"})]}),T&&h.jsx("div",{className:"p-2 rounded bg-red-100 text-red-700 text-sm",children:T}),C&&h.jsx("div",{className:"p-2 rounded bg-green-100 text-green-700 text-sm",children:C}),u&&h.jsxs("form",{onSubmit:It,className:"space-y-3 mt-2",children:[h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"New password"}),h.jsx("input",{type:"password",name:"newPassword",value:D.newPassword,onChange:q=>_(K=>({...K,newPassword:q.target.value})),className:B,minLength:6,required:!0})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Confirm new password"}),h.jsx("input",{type:"password",name:"confirmPassword",value:D.confirmPassword,onChange:q=>_(K=>({...K,confirmPassword:q.target.value})),className:B,minLength:6,required:!0})]}),h.jsx("button",{type:"submit",disabled:g,className:"w-full bg-blue-600 text-white py-2 rounded font-semibold text-sm hover:bg-blue-700 disabled:opacity-50",children:g?"Updating...":"Update password"})]})]})]})]})]})},O6=()=>{const[t,e]=V.useState([]),[n,r]=V.useState(!0),[s,i]=V.useState(""),[o,l]=V.useState("all"),u=Kn();V.useEffect(()=>{(async()=>{try{const A=(await Rr(gn(_e,"users"))).docs.map(k=>({id:k.id,...k.data()}));e(A)}catch(g){console.error("Error loading users:",g)}finally{r(!1)}})()},[]);const c=s.trim().toLowerCase(),f=t.filter(m=>{if(o!=="all"&&(m.batch||"")!==o)return!1;if(!c)return!0;const g=(m.name||"").toLowerCase(),A=(m.cardNumber||"").toLowerCase();return g.includes(c)||A.includes(c)});return h.jsxs("div",{className:"min-h-screen bg-gray-100",children:[h.jsx(bt,{userType:"admin"}),h.jsxs("main",{className:"container mx-auto px-4 py-6 sm:py-8 max-w-4xl",children:[h.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-gray-800 mb-4",children:"Manage users"}),h.jsxs("div",{className:"mb-4 flex flex-col sm:flex-row gap-3 sm:items-center",children:[h.jsxs("div",{className:"flex-1 relative",children:[h.jsx(Bp,{className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"}),h.jsx("input",{type:"text",placeholder:"Search by name or card...",value:s,onChange:m=>i(m.target.value),className:"w-full pl-9 pr-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),h.jsx("div",{className:"w-full sm:w-40",children:h.jsxs("select",{value:o,onChange:m=>l(m.target.value),className:"w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",children:[h.jsx("option",{value:"all",children:"All batches"}),h.jsx("option",{value:"20/21",children:"20/21"}),h.jsx("option",{value:"21/22",children:"21/22"}),h.jsx("option",{value:"22/23",children:"22/23"}),h.jsx("option",{value:"23/24",children:"23/24"})]})})]}),n?h.jsxs("div",{className:"flex items-center gap-2 text-gray-600",children:[h.jsx(Ti,{className:"animate-spin"}),h.jsx("span",{children:"Loading users..."})]}):f.length===0?h.jsx("p",{className:"text-gray-600 text-sm sm:text-base",children:"No users match your search."}):h.jsx("div",{className:"bg-white rounded-lg shadow-md divide-y",children:f.map(m=>h.jsxs("button",{onClick:()=>u(`/users/${m.id}`),className:"w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50",children:[h.jsxs("div",{className:"flex items-center gap-3",children:[h.jsx("div",{className:"w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600",children:h.jsx(eT,{})}),h.jsxs("div",{children:[h.jsx("p",{className:"font-semibold text-gray-800 text-sm sm:text-base",children:m.name||"No name"}),h.jsxs("p",{className:"flex items-center gap-1 text-xs sm:text-sm text-gray-600",children:[h.jsx(m6,{})," ",m.email]}),h.jsxs("p",{className:"text-xs text-gray-500",children:["Card: ",m.cardNumber||"-"," • Batch: ",m.batch||"-"]})]})]}),h.jsx("span",{className:"text-xs sm:text-sm text-gray-500",children:m.userType||"user"})]},m.id))})]})]})},V6=()=>{const{userId:t}=tw(),[e,n]=V.useState(null),[r,s]=V.useState([]),[i,o]=V.useState(!0);V.useEffect(()=>{(async()=>{try{const f=await ca(xt(_e,"users",t));f.exists()&&n({id:t,...f.data()});const A=(await Rr(gn(_e,"works"))).docs.map(k=>({id:k.id,...k.data()})).filter(k=>k.assignedUsers?Array.isArray(k.assignedUsers)?k.assignedUsers.includes(t):k.assignedUsers===t:!1);A.sort((k,b)=>{const N=k.date?new Date(k.date).getTime():0;return(b.date?new Date(b.date).getTime():0)-N}),s(A)}catch(f){console.error("Error loading user details:",f)}finally{o(!1)}})()},[t]);const l=c=>{const m=(c.assignedUserDetails||[]).find(g=>g.userId===t);return(m==null?void 0:m.roles)||[]},u=(c,f)=>{const m=`${t}_${f}`;return(c.roleCompletion||{})[m]==="done"};return h.jsxs("div",{className:"min-h-screen bg-gray-100",children:[h.jsx(bt,{userType:"admin"}),h.jsxs("main",{className:"container mx-auto px-4 py-6 sm:py-8 max-w-4xl",children:[i&&h.jsxs("div",{className:"flex items-center gap-2 text-gray-600",children:[h.jsx(Ti,{className:"animate-spin"}),h.jsx("span",{children:"Loading user..."})]}),!i&&!e&&h.jsx("p",{className:"text-gray-600 text-sm sm:text-base",children:"User not found."}),!i&&e&&h.jsxs(h.Fragment,{children:[h.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-gray-800 mb-2",children:e.name||"User details"}),h.jsx("p",{className:"text-sm sm:text-base text-gray-600 mb-4",children:e.email}),h.jsxs("div",{className:"bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 text-sm sm:text-base space-y-2",children:[h.jsxs("p",{children:[h.jsx("span",{className:"font-semibold",children:"Phone:"})," ",e.phoneNo||"-"]}),h.jsxs("p",{children:[h.jsx("span",{className:"font-semibold",children:"Batch:"})," ",e.batch||"-"]}),h.jsxs("p",{children:[h.jsx("span",{className:"font-semibold",children:"Study department:"})," ",e.studyDepartment||"-"]}),h.jsxs("p",{children:[h.jsx("span",{className:"font-semibold",children:"Gender:"})," ",e.gender||"-"]}),h.jsxs("p",{children:[h.jsx("span",{className:"font-semibold",children:"Registration no:"})," ",e.registrationNumber||"-"]}),h.jsxs("p",{children:[h.jsx("span",{className:"font-semibold",children:"Card:"})," ",e.cardNumber||"-"]}),h.jsxs("p",{children:[h.jsx("span",{className:"font-semibold",children:"Work departments:"})," ",Array.isArray(e.departments)?e.departments.join(", "):e.department||"-"]}),h.jsxs("p",{children:[h.jsx("span",{className:"font-semibold",children:"First priority:"})," ",e.firstPriority||"-"]}),h.jsxs("p",{children:[h.jsx("span",{className:"font-semibold",children:"User type:"})," ",e.userType||"user"]})]}),h.jsx("h2",{className:"text-xl sm:text-2xl font-semibold text-gray-800 mb-3",children:"Task history"}),r.length===0?h.jsx("p",{className:"text-gray-600 text-sm sm:text-base",children:"No tasks for this user."}):h.jsx("div",{className:"space-y-3",children:r.map(c=>{const f=l(c),m=c.status||"incomplete";return h.jsxs("div",{className:"bg-white rounded-lg shadow p-3 sm:p-4 text-sm sm:text-base",children:[h.jsxs("div",{className:"flex justify-between items-start mb-2",children:[h.jsxs("div",{className:"flex-1",children:[h.jsx("h3",{className:"font-semibold text-gray-800",children:c.title||"Untitled task"}),c.date&&h.jsxs("span",{className:"flex items-center gap-1 text-xs text-gray-500 mt-1",children:[h.jsx(cs,{})," ",new Date(c.date).toLocaleDateString()]})]}),h.jsx("span",{className:`px-2 py-1 rounded text-xs font-semibold capitalize ${m==="complete"?"bg-green-100 text-green-800":m==="done"?"bg-yellow-100 text-yellow-800":"bg-gray-100 text-gray-800"}`,children:m})]}),c.description&&h.jsx("p",{className:"text-gray-700 text-sm mb-2",children:c.description}),f.length>0&&h.jsxs("div",{className:"mt-2",children:[h.jsx("p",{className:"text-xs font-semibold text-gray-700 mb-1",children:"Assigned work types:"}),h.jsx("div",{className:"flex flex-wrap gap-1",children:f.map(g=>{const A=u(c,g);return h.jsxs("span",{className:`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${A?"bg-green-100 text-green-800":"bg-gray-100 text-gray-700"}`,children:[A&&h.jsx(Ho,{className:"text-xs"}),g]},g)})})]})]},c.id)})})]})]})]})},L6=()=>{const[t,e]=V.useState(null),[n,r]=V.useState([]),[s,i]=V.useState(!0),[o,l]=V.useState(!1);V.useEffect(()=>{const f=Lu(pn,m=>{e(m||null),i(!1)});return()=>f()},[]),V.useEffect(()=>{if(!t)return;(async()=>{l(!0);try{const A=(await Rr(gn(_e,"works"))).docs.map(k=>({id:k.id,...k.data()})).filter(k=>Array.isArray(k.assignedUsers)&&k.assignedUsers.includes(t.uid));A.sort((k,b)=>{const N=k.date?new Date(k.date).getTime():0;return(b.date?new Date(b.date).getTime():0)-N}),r(A)}catch(m){console.error("Error loading task history:",m)}finally{l(!1)}})()},[t]);const u=f=>f.status||"incomplete";return h.jsxs("div",{className:"min-h-screen bg-gray-100",children:[h.jsx(bt,{userType:"user"}),h.jsxs("main",{className:"container mx-auto px-4 py-8 max-w-3xl",children:[h.jsx("h1",{className:"text-2xl sm:text-3xl font-bold text-gray-800 mb-4",children:"Task history"}),h.jsx("p",{className:"text-gray-600 text-sm sm:text-base mb-6",children:"All tasks assigned to you, sorted by date (newest first)."}),s||o?h.jsxs("div",{className:"flex items-center gap-2 text-gray-600",children:[h.jsx(Ti,{className:"animate-spin text-xl text-blue-600"}),h.jsx("span",{children:"Loading task history..."})]}):n.length===0?h.jsx("p",{className:"text-gray-600 text-sm sm:text-base",children:"No tasks found in your history."}):h.jsx("div",{className:"space-y-3",children:n.map(f=>h.jsxs("div",{className:"bg-white rounded-lg shadow p-4 sm:p-5",children:[h.jsxs("div",{className:"flex justify-between items-start gap-2 mb-1",children:[h.jsx("h2",{className:"font-semibold text-gray-800 text-sm sm:text-base",children:f.title||"Task"}),h.jsx("span",{className:"text-xs sm:text-sm capitalize text-gray-600",children:u(f)})]}),f.date&&h.jsxs("p",{className:"flex items-center gap-1 text-xs sm:text-sm text-gray-500 mb-1",children:[h.jsx(cs,{}),h.jsx("span",{children:new Date(f.date).toLocaleDateString()})]}),f.description&&h.jsx("p",{className:"text-gray-700 text-xs sm:text-sm mt-1",children:f.description})]},f.id))})]})]})},j6=["videography","editing"],M6=()=>{const{taskId:t}=tw(),e=Kn(),[n,r]=V.useState(null),[s,i]=V.useState([]),[o,l]=V.useState([]),[u,c]=V.useState(!0),[f,m]=V.useState(!1),[g,A]=V.useState(!1),[k,b]=V.useState(!1),[N,x]=V.useState(""),[T,w]=V.useState("");V.useEffect(()=>{(async()=>{c(!0);try{const S=(await Rr(gn(_e,"users"))).docs.map(Ie=>({id:Ie.id,...Ie.data()}));i(S);const Q=await ca(xt(_e,"works",t));if(Q.exists()){const Ie={id:Q.id,...Q.data()};r(Ie),l(Ie.assignedUserDetails||[])}else x("Task not found.")}catch(P){console.error(P),x("Failed to load task.")}finally{c(!1)}})()},[t]);const C=R=>{if(!k)return;const P=o.find(S=>S.userId===R);l(P?S=>S.filter(Q=>Q.userId!==R):S=>[...S,{userId:R,roles:["videography"]}])},j=(R,P)=>{k&&l(S=>S.map(Q=>{if(Q.userId!==R)return Q;const It=Q.roles.includes(P)?Q.roles.filter(Be=>Be!==P):[...Q.roles,P];return{...Q,roles:It.length?It:[P]}}))},D=R=>{if(!k)return;const{name:P,value:S}=R.target;r(Q=>({...Q,[P]:S}))},_=async R=>{if(R.preventDefault(),!!n){m(!0),x(""),w("");try{const{id:P,...S}=n;await da(xt(_e,"works",n.id),{...S,assignedUsers:o.map(Q=>Q.userId),assignedUserDetails:o}),w("Task updated successfully."),b(!1)}catch(P){console.error(P),x("Failed to update task.")}finally{m(!1)}}},y=async()=>{if(window.confirm("Are you sure you want to delete this task?")){A(!0),x(""),w("");try{await Zb(xt(_e,"works",t)),w("Task deleted successfully."),setTimeout(()=>e("/work-list"),1500)}catch(R){console.error(R),x("Failed to delete task.")}finally{A(!1)}}};if(u)return h.jsxs("div",{className:"min-h-screen bg-gray-100",children:[h.jsx(bt,{userType:"admin"}),h.jsxs("div",{className:"flex flex-col justify-center items-center h-64",children:[h.jsx(Ti,{className:"animate-spin text-4xl text-blue-600 mb-4"}),h.jsx("p",{className:"text-gray-600",children:"Loading task..."})]})]});if(!n)return h.jsxs("div",{className:"min-h-screen bg-gray-100",children:[h.jsx(bt,{userType:"admin"}),h.jsxs("main",{className:"container mx-auto px-4 py-6 sm:py-8 max-w-3xl",children:[h.jsx("p",{className:"text-gray-600 mb-4",children:N||"Task not found."}),h.jsx("button",{onClick:()=>e(-1),className:"px-4 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700",children:"Back"})]})]});const E=R=>o.some(P=>P.userId===R),I=R=>{var P;return((P=o.find(S=>S.userId===R))==null?void 0:P.roles)||[]};return h.jsxs("div",{className:"min-h-screen bg-gray-100",children:[h.jsx(bt,{userType:"admin"}),h.jsxs("main",{className:"container mx-auto px-4 py-6 sm:py-8 max-w-3xl",children:[h.jsxs("div",{className:"flex items-center justify-between mb-4",children:[h.jsx("h1",{className:"text-xl sm:text-2xl font-bold text-gray-800",children:"Task details"}),h.jsxs("div",{className:"flex gap-2",children:[k?h.jsxs(h.Fragment,{children:[h.jsx("button",{onClick:_,disabled:f,className:"px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50",children:f?"Saving...":"Save"}),h.jsx("button",{onClick:()=>{b(!1),w(""),x(""),l(n.assignedUserDetails||[])},className:"px-3 py-1 rounded bg-gray-300 text-gray-800 text-sm hover:bg-gray-400",children:"Cancel"})]}):h.jsxs(h.Fragment,{children:[h.jsx("button",{onClick:()=>{b(!0),x(""),w("")},className:"px-3 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700",children:"Edit"}),h.jsxs("button",{onClick:y,disabled:g,className:"px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700 disabled:opacity-50 inline-flex items-center gap-1",children:[h.jsx(T6,{}),g?"Deleting...":"Delete"]})]}),h.jsx("button",{onClick:()=>e(-1),className:"px-3 py-1 rounded bg-gray-200 text-gray-800 text-sm hover:bg-gray-300",children:"Back"})]})]}),N&&h.jsx("div",{className:"mb-3 p-2 rounded bg-red-100 text-red-700 text-sm",children:N}),T&&h.jsx("div",{className:"mb-3 p-2 rounded bg-green-100 text-green-700 text-sm",children:T}),h.jsxs("form",{className:"space-y-4",onSubmit:_,children:[h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Title"}),h.jsx("input",{type:"text",name:"title",value:n.title||"",onChange:D,disabled:!k,className:"w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Description"}),h.jsx("textarea",{name:"description",value:n.description||"",onChange:D,disabled:!k,rows:3,className:"w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"})]}),h.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:[h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Date"}),h.jsxs("div",{className:"flex items-center gap-2",children:[h.jsx(cs,{className:"text-gray-500"}),h.jsx("input",{type:"date",name:"date",value:n.date?new Date(n.date).toISOString().slice(0,10):"",onChange:D,disabled:!k,className:"flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"})]})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-1",children:"Priority"}),h.jsxs("select",{name:"priority",value:n.priority||"medium",onChange:D,disabled:!k,className:"w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",children:[h.jsx("option",{value:"low",children:"Low"}),h.jsx("option",{value:"medium",children:"Medium"}),h.jsx("option",{value:"high",children:"High"}),h.jsx("option",{value:"urgent",children:"Urgent"})]})]})]}),h.jsxs("div",{children:[h.jsx("label",{className:"block text-sm font-semibold text-gray-700 mb-2",children:"Assigned users and work types"}),h.jsxs("div",{className:"bg-white rounded border p-3 max-h-80 overflow-y-auto",children:[s.map(R=>{const P=E(R.id),S=I(R.id);return h.jsxs("div",{className:"mb-2 p-2 rounded hover:bg-gray-50",children:[h.jsxs("label",{className:"flex items-center cursor-pointer",children:[h.jsx("input",{type:"checkbox",checked:P,onChange:()=>C(R.id),disabled:!k,className:"mr-3 w-4 h-4"}),h.jsx("div",{className:"flex-1",children:h.jsxs("p",{className:"text-sm",children:[R.name||"No name"," ",h.jsxs("span",{className:"text-xs text-gray-500",children:["(",R.cardNumber||"-",")"]})]})})]}),P&&h.jsx("div",{className:"mt-1 ml-7 flex flex-wrap gap-2 text-xs sm:text-sm",children:j6.map(Q=>h.jsx("button",{type:"button",onClick:()=>j(R.id,Q),disabled:!k,className:`px-2 py-1 rounded border ${S.includes(Q)?"bg-green-600 text-white border-green-600":"bg-white text-gray-700 border-gray-300"} ${k?"cursor-pointer":"cursor-default"}`,children:Q},Q))})]},R.id)}),s.length===0&&h.jsx("p",{className:"text-xs text-gray-500",children:"No users found."})]})]})]})]})]})};function U6(){return h.jsx(aS,{children:h.jsxs(eS,{children:[h.jsx(At,{path:"/",element:h.jsx(S6,{})}),h.jsx(At,{path:"/signup",element:h.jsx(C6,{})}),h.jsx(At,{path:"/home",element:h.jsx(I6,{})}),h.jsx(At,{path:"/admin-home",element:h.jsxs(Fr,{children:[" ",h.jsx(x6,{})," "]})}),h.jsx(At,{path:"/create-user",element:h.jsxs(Fr,{children:[" ",h.jsx(R6,{})," "]})}),h.jsx(At,{path:"/assign-work",element:h.jsxs(Fr,{children:[" ",h.jsx(b6,{})," "]})}),h.jsx(At,{path:"/work-list",element:h.jsxs(Fr,{children:[" ",h.jsx(N6,{})," "]})}),h.jsx(At,{path:"/profile",element:h.jsx(D6,{})}),h.jsx(At,{path:"/manage-users",element:h.jsxs(Fr,{children:[" ",h.jsx(O6,{})," "]})}),h.jsx(At,{path:"/users/:userId",element:h.jsxs(Fr,{children:[" ",h.jsx(V6,{})," "]})}),h.jsx(At,{path:"/tasks/:taskId",element:h.jsxs(Fr,{children:[" ",h.jsx(M6,{})," "]})}),h.jsx(At,{path:"/task-history",element:h.jsx(L6,{})})]})})}const F6="YOUR_PUBLIC_VAPID_KEY_FROM_FIREBASE";function B6(){return V.useEffect(()=>{(async()=>{if(!("serviceWorker"in navigator))return;const e=await navigator.serviceWorker.register("/firebase-messaging-sw.js");if(await Notification.requestPermission()!=="granted")return;const r=await r6(i6,{vapidKey:F6,serviceWorkerRegistration:e}),s=pn.currentUser;s&&r&&await da(xt(_e,"users",s.uid),{fcmToken:r})})().catch(console.error)},[]),h.jsx(U6,{})}Q0(document.getElementById("root")).render(h.jsx(V.StrictMode,{children:h.jsx(B6,{})}));
