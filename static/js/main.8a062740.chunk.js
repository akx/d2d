(window.webpackJsonpd2d=window.webpackJsonpd2d||[]).push([[0],{171:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return doTransform}));var _converters__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(52),lodash__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(172),lodash__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__),ramda__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(183);function doTransform(sourceType,source,transform,destType){var input;try{input=_converters__WEBPACK_IMPORTED_MODULE_0__.b[sourceType](source)}catch(error){return{error:error,type:"error",phase:"input"}}var data=input;if(transform.trim().length)try{var _=lodash__WEBPACK_IMPORTED_MODULE_1___default.a,R=ramda__WEBPACK_IMPORTED_MODULE_2__;eval(transform)}catch(error){return{error:error,type:"error",phase:"transform"}}try{return _converters__WEBPACK_IMPORTED_MODULE_0__.a[destType](data)}catch(error){return{error:error,type:"error",phase:"output"}}}},193:function(e,t,r){e.exports=r(377)},198:function(e,t,r){},377:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),o=r(32),c=r.n(o),l=(r(198),r(199),r(200),r(201),r(202),r(203),r(204),r(205),r(206),r(29)),u=r(52),i=r(171),s=r(384),m=r(64),p=r(112),d=r(22),_=r(173),f=r(383),E=r(53),h=r(381);function v(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?v(r,!0).forEach((function(t){Object(d.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var y=function(e){var t=e.value,r=e.options,a=e.onChange,o=n.a.useState(!1),c=Object(l.a)(o,2),u=c[0],i=c[1],s=n.a.useState(!1),m=Object(l.a)(s,2),p=m[0],d=m[1];return n.a.createElement(n.a.Fragment,null,p?n.a.createElement("textarea",{value:t,onChange:function(e){return a(e.target.value)},placeholder:r.placeholder}):n.a.createElement(_.Controlled,{className:"code-editor",value:t,options:b({},r,{lineWrapping:u}),onBeforeChange:function(e,t,r){return a(r)}}),n.a.createElement(f.a,{trigger:n.a.createElement(E.a,{circular:!0,name:"setting",style:{position:"absolute",right:"5px",bottom:"5px"}}),hoverable:!0,plain:!0},n.a.createElement(h.a,{label:"Wrap Lines",checked:u,onChange:function(e,t){return i(!!t.checked)}}),n.a.createElement("br",null),n.a.createElement(h.a,{label:"Plain Editor",checked:p,onChange:function(e,t){return d(!!t.checked)}})))},O=function(e){var t=e.value,r=e.options,a=e.onChange,o=e.style,c=function(e,t){var r=t.name;return r&&a(r)};return n.a.createElement(s.a,{fluid:!0,size:"mini",style:o},r.map((function(e){return n.a.createElement(s.a.Item,{name:e,active:t===e,onClick:c})})))},g=function(e){var t=e.sourceType,r=e.source,a=e.onChangeSource,o=e.style;return n.a.createElement("div",{className:"codebox-wrapper",style:o},n.a.createElement(y,{value:r,options:{mode:t,theme:"solarized light",lineNumbers:!0,placeholder:"Paste or type in ".concat(t," data here.")},onChange:a}))},w="\n// Feel free to modify `data` using JavaScript here.\n// * Lodash is available as `_`\n// * Ramda is available as `R`\n".trim(),j=function(e){var t=e.transform,r=e.onChangeTransform,a=e.style;return n.a.createElement("div",{className:"codebox-wrapper",style:a},n.a.createElement(y,{value:t,options:{mode:"javascript",theme:"solarized dark",lineNumbers:!0,placeholder:w},onChange:r}))},k=function(e){var t=e.destType,r=e.result,a=e.style,o=null;switch(r.type){case"element":o=r.element;break;case"string":o=n.a.createElement(y,{value:r.value,options:{mode:t,theme:"solarized light",lineNumbers:!0,readOnly:!0,placeholder:"Output will appear here in ".concat(t,".")},onChange:function(){}});break;case"error":o=n.a.createElement(m.a,{result:r})}return n.a.createElement("div",{className:"codebox-wrapper",style:a},o)},C=function(){var e=n.a.useState(""),t=Object(l.a)(e,2),r=t[0],a=t[1],o=n.a.useState("text"),c=Object(l.a)(o,2),s=c[0],m=c[1],d=n.a.useState("text"),_=Object(l.a)(d,2),f=_[0],E=_[1],h=n.a.useState(""),v=Object(l.a)(h,2),b=v[0],y=v[1],w=n.a.useMemo((function(){return Object(i.a)(s,r,b,f)}),[s,r,b,f]);return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{id:"settings"},n.a.createElement("div",null,"Input Format",n.a.createElement(O,{value:s,options:Object.keys(u.b),onChange:m})),n.a.createElement("div",null,"Output Format",n.a.createElement(O,{value:f,options:Object.keys(u.a),onChange:E}))),n.a.createElement("div",{id:"main-panes"},n.a.createElement(p.a,{split:"vertical",defaultSize:"35%"},n.a.createElement(g,{source:r,sourceType:s,onChangeSource:a}),n.a.createElement(p.a,{split:"vertical",defaultSize:"40%"},n.a.createElement(j,{transform:b,onChangeTransform:y}),n.a.createElement(k,{destType:f,result:w})))))};c.a.render(n.a.createElement(C,null),document.getElementById("root"))},52:function(e,t,r){"use strict";var a=r(65),n=r(162),o=r.n(n),c=r(107),l=r.n(c),u=r(43),i=r(44),s=r(45),m=r(48),p=r(50),d=r(0),_=r.n(d),f=function(e,t,r){return _.a.createElement("div",null,"Oops! An error occurred: $",e.toString(),_.a.createElement("br",null),_.a.createElement("a",{href:"#",onClick:r},"Try again"))},E=function(e){function t(){var e,r;Object(u.a)(this,t);for(var a=arguments.length,n=new Array(a),o=0;o<a;o++)n[o]=arguments[o];return(r=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(n)))).state={},r.resetError=function(){r.setState({error:void 0,errorInfo:void 0})},r}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidCatch",value:function(e,t){this.setState({error:e,errorInfo:t})}},{key:"render",value:function(){return this.state.error?(this.props.renderError||f)(this.state.error,this.state.errorInfo,this.resetError):this.props.render()}}]),t}(_.a.Component),h=r(64);var v=r(163),b=r.n(v)()({loader:function(){return r.e(5).then(r.bind(null,393))},loading:function(){return _.a.createElement("div",null,"Loading table")}}),y=function(e){var t=e.value;if("object"===typeof t)try{t=JSON.stringify(t)}catch(r){t="<unrenderable>"}return _.a.createElement(_.a.Fragment,null,t)},O=_.a.memo((function(e){var t=e.data;try{var r=Array.from(t),a=function(e){var t=[],r=new Set;return e.forEach((function(e){return e&&Object.keys(e).forEach((function(e){r.has(e)||(t.push(e),r.add(e))}))})),t}(r);return a.length?_.a.createElement(b,{data:r,columns:a.map((function(e){return{accessor:e,Header:e,Cell:y}}))}):_.a.createElement(h.a,{result:{phase:"output",error:new Error("Unable to figure out columns"),type:"error"}})}catch(n){return _.a.createElement(h.a,{result:{phase:"output",error:n,type:"error"}})}})),g=r(108),w=r.n(g),j=r(164),k=r(382);function C(){return(C=Object(j.a)(w.a.mark((function e(t,a){var n,o,c,l,u;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Promise.all([r.e(3),r.e(4)]).then(r.t.bind(null,392,7)),o=Array.from(t),e.next=4,n;case 4:c=e.sent,l=c.utils.json_to_sheet(o),u=c.utils.book_new(),c.utils.book_append_sheet(u,l,"d2d"),c.writeFile(u,"d2d-".concat((new Date).toISOString(),".").concat(a));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var D=function(e){var t=e.label,r=e.format,a=e.data;return _.a.createElement(k.a,{onClick:function(e){try{!function(e,t){C.apply(this,arguments)}(a,r)}catch(t){alert(t)}}},t)},P=function(e){var t=e.data;return _.a.createElement("div",{style:{textAlign:"center"}},_.a.createElement(D,{label:"Download XLSX",format:"xlsx",data:t}),_.a.createElement(D,{label:"Download XLS",format:"xls",data:t}),_.a.createElement(D,{label:"Download ODS",format:"ods",data:t}))};r.d(t,"b",(function(){return S})),r.d(t,"a",(function(){return x}));var S={csv:a.b,json:JSON.parse,text:function(e){return e},toml:o.a.parse,tsv:a.d,yaml:l.a.safeLoad},T=function(e){return function(t){return{value:e(t),type:"string"}}},x={"json-compact":T(JSON.stringify),csv:T(a.a),json:T((function(e){return JSON.stringify(e,null,2)})),text:T((function(e){return""+e})),tsv:T(a.c),yaml:T(l.a.safeDump),table:function(e){return{error:null,type:"element",element:_.a.createElement(E,{render:function(){return _.a.createElement(O,{data:e})}})}},xlsx:function(e){return{error:null,type:"element",element:_.a.createElement(P,{data:e})}}}},64:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var a=r(0),n=r.n(a),o=function(e){var t=e.result,r=t.error,a=t.phase;return n.a.createElement("div",{className:"error-result"},n.a.createElement("h2",null,r.name||"Error"," in ",a),r.stack?n.a.createElement("div",{className:"error-stack"},r.stack):n.a.createElement("b",null,r.toString()))}}},[[193,1,2]]]);
//# sourceMappingURL=main.8a062740.chunk.js.map