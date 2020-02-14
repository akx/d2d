(this.webpackJsonpd2d=this.webpackJsonpd2d||[]).push([[0],{186:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return doTransform}));var _converters__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(20),lodash__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(194),lodash__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__),ramda__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(212);function doTransform(sourceType,source,transform,destType){var input;try{input=_converters__WEBPACK_IMPORTED_MODULE_0__.d[sourceType](source)}catch(error){return{error:error,type:"error",phase:"input"}}var data=input;if(transform.trim().length)try{var _=lodash__WEBPACK_IMPORTED_MODULE_1___default.a,R=ramda__WEBPACK_IMPORTED_MODULE_2__;eval(transform)}catch(error){return{error:error,type:"error",phase:"transform"}}try{return _converters__WEBPACK_IMPORTED_MODULE_0__.a[destType](data)}catch(error){return{error:error,type:"error",phase:"output"}}}},20:function(e,t,a){"use strict";var r=a(426),n=a(187),o=a.n(n),c=a(128),l=a.n(c),s=a(52),u=a(53),i=a(54),m=a(57),d=a(59),p=a(0),_=a.n(p),f=function(e,t,a){return _.a.createElement("div",null,"Oops! An error occurred: $",e.toString(),_.a.createElement("br",null),_.a.createElement("a",{href:"#",onClick:a},"Try again"))},h=function(e){function t(){var e,a;Object(s.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(n)))).state={},a.resetError=function(){a.setState({error:void 0,errorInfo:void 0})},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidCatch",value:function(e,t){this.setState({error:e,errorInfo:t})}},{key:"render",value:function(){return this.state.error?(this.props.renderError||f)(this.state.error,this.state.errorInfo,this.resetError):this.props.render()}}]),t}(_.a.Component),v=a(72);var E=a(188),b=a.n(E)()({loader:function(){return a.e(5).then(a.bind(null,440))},loading:function(){return _.a.createElement("div",null,"Loading table")}}),y=function(e){var t=e.value;if("object"===typeof t)try{t=JSON.stringify(t)}catch(a){t="<unrenderable>"}return _.a.createElement(_.a.Fragment,null,t)},T=_.a.memo((function(e){var t=e.data;try{var a=Array.from(t),r=function(e){var t=[],a=new Set;return e.forEach((function(e){return e&&Object.keys(e).forEach((function(e){a.has(e)||(t.push(e),a.add(e))}))})),t}(a);return r.length?_.a.createElement(b,{data:a,columns:r.map((function(e){return{accessor:e,Header:e,Cell:y}}))}):_.a.createElement(v.a,{result:{phase:"output",error:new Error("Unable to figure out columns"),type:"error"}})}catch(n){return _.a.createElement(v.a,{result:{phase:"output",error:n,type:"error"}})}})),O=a(129),C=a.n(O),S=a(189),g=a(430);function j(){return(j=Object(S.a)(C.a.mark((function e(t,r){var n,o,c,l,s;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=Promise.all([a.e(3),a.e(4)]).then(a.t.bind(null,439,7)),o=Array.from(t),e.next=4,n;case 4:c=e.sent,l=c.utils.json_to_sheet(o),s=c.utils.book_new(),c.utils.book_append_sheet(s,l,"d2d"),c.writeFile(s,"d2d-".concat((new Date).toISOString(),".").concat(r));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var w=function(e){var t=e.label,a=e.format,r=e.data;return _.a.createElement(g.a,{onClick:function(e){try{!function(e,t){j.apply(this,arguments)}(r,a)}catch(t){alert(t)}}},t)},k=function(e){var t=e.data;return _.a.createElement("div",{style:{textAlign:"center"}},_.a.createElement(w,{label:"Download XLSX",format:"xlsx",data:t}),_.a.createElement(w,{label:"Download XLS",format:"xls",data:t}),_.a.createElement(w,{label:"Download ODS",format:"ods",data:t}))};a.d(t,"d",(function(){return L})),a.d(t,"a",(function(){return B})),a.d(t,"c",(function(){return P})),a.d(t,"b",(function(){return F}));var x=Object(r.a)(","),D=Object(r.a)(";"),M=Object(r.a)("\t"),L={csv:x.parse,json:JSON.parse,scsv:D.parse,text:function(e){return e},toml:o.a.parse,tsv:M.parse,yaml:l.a.safeLoad},A=function(e){return function(t){return{value:e(t),type:"string"}}},B={"json-compact":A(JSON.stringify),csv:A(x.format),scsv:A(D.format),json:A((function(e){return JSON.stringify(e,null,2)})),text:A((function(e){return""+e})),tsv:A(M.format),yaml:A(l.a.safeDump),table:function(e){return{error:null,type:"element",element:_.a.createElement(h,{render:function(){return _.a.createElement(T,{data:e})}})}},xlsx:function(e){return{error:null,type:"element",element:_.a.createElement(k,{data:e})}}},P={"json-compact":"JSON (compact)",csv:"CSV",json:"JSON",scsv:"SCSV",table:"Table",text:"Text",toml:"TOML",tsv:"TSV",xlsx:"XLS/XLSX",yaml:"YAML"},F={csv:"Comma-separated values",scsv:"Semicolon-separated values",tsv:"Tab-separated values"}},225:function(e,t,a){e.exports=a(419)},230:function(e,t,a){},419:function(e,t,a){"use strict";a.r(t);var r,n,o=a(0),c=a.n(o),l=a(42),s=a.n(l),u=(a(230),a(231),a(232),a(233),a(234),a(235),a(236),a(237),a(238),a(23)),i="\n- A: One\n  B: Two\n  C: Three\n- A: Two\n  B: Four\n  C: Five\n- A: Three\n  B: Six\n  C: Seven\n".trim(),m={"json-compact":"json-compact",csv:"A,B,C\nOne,Two,Three\nTwo,Four,Five\nThree,Six,Seven",scsv:'"A","B","C"\n"One","Two","Three"\n"Two","Four","Five"\n"Three","Six","Seven"',json:JSON.stringify([{A:"One",B:"Two",C:"Three"},{A:"Two",B:"Four",C:"Five"},{A:"Three",B:"Six",C:"Seven"}],null,2),text:"Some arbitrary text",tsv:"A\tB\tC\nOne\tTwo\tThree\nTwo\tFour\tFive\nThree\tSix\tSeven",yaml:i,toml:'# This is a TOML document.\ntitle = "TOML Example"\n[owner]\nname = "Tom Preston-Werner"\ndob = 1979-05-27T07:32:00-08:00 # First class dates'},d=a(186),p=a(21);!function(e){e.ThreeColumns="threeColumns",e.BottomCode="bottomCode"}(n||(n={}));var _=(r={},Object(p.a)(r,n.ThreeColumns,"Three Columns"),Object(p.a)(r,n.BottomCode,"Code on Bottom"),r),f=a(73),h=a(195),v=a(196),E=a(428),b=a(62),y=a(427),T=function(e){var t=e.value,a=e.options,r=e.onChange,n=c.a.useState(!1),o=Object(u.a)(n,2),l=o[0],s=o[1],i=c.a.useState(!1),m=Object(u.a)(i,2),d=m[0],p=m[1];return c.a.createElement(c.a.Fragment,null,d?c.a.createElement("textarea",{value:t,onChange:function(e){return r(e.target.value)},placeholder:a.placeholder}):c.a.createElement(v.Controlled,{className:"code-editor",value:t,options:Object(h.a)({},a,{lineWrapping:l}),onBeforeChange:function(e,t,a){return r(a)}}),c.a.createElement(E.a,{trigger:c.a.createElement(b.a,{circular:!0,name:"setting",style:{position:"absolute",right:"5px",bottom:"5px"}}),hoverable:!0,plain:!0},c.a.createElement(y.a,{label:"Wrap Lines",checked:l,onChange:function(e,t){return s(!!t.checked)}}),c.a.createElement("br",null),c.a.createElement(y.a,{label:"Plain Editor",checked:d,onChange:function(e,t){return p(!!t.checked)}})))},O=a(20),C=function(e){var t=e.sourceType,a=e.source,r=e.onChangeSource,n=e.style;return c.a.createElement("div",{className:"codebox-wrapper",style:n},c.a.createElement(T,{value:a,options:{mode:t,theme:"solarized light",lineNumbers:!0,placeholder:"Paste or type in ".concat(O.c[t]||t," data here.")},onChange:r}))},S="\n// Feel free to modify `data` using JavaScript here.\n// * Lodash is available as `_`\n// ** e.g. `_.reverse(data)`\n// * Ramda is available as `R`\n// ** e.g. `data = R.reverse(data)`\n".trim(),g=function(e){var t=e.transform,a=e.onChangeTransform,r=e.style;return c.a.createElement("div",{className:"codebox-wrapper",style:r},c.a.createElement(T,{value:t,options:{mode:"javascript",theme:"solarized dark",lineNumbers:!0,placeholder:S},onChange:a}))},j=a(72),w=function(e){var t=e.destType,a=e.result,r=e.style,n=null;switch(a.type){case"element":n=a.element;break;case"string":n=c.a.createElement(T,{value:a.value,options:{mode:t,theme:"solarized light",lineNumbers:!0,readOnly:!0,placeholder:"Output will appear here in ".concat(O.c[t]||t,".")},onChange:function(){}});break;case"error":n=c.a.createElement(j.a,{result:a})}return c.a.createElement("div",{className:"codebox-wrapper",style:r},n)},k=a(429),x=a(431),D=function(e){var t=e.label,a=e.value,r=e.options,n=e.onChange,o=(e.style,function(e,t){n(t.name),e.preventDefault()});return c.a.createElement(k.a,{item:!0,text:"".concat(t,": ").concat(O.c[a]||a),closeOnChange:!1},c.a.createElement(k.a.Menu,{style:{minWidth:"25em"}},r.map((function(e){return c.a.createElement(k.a.Item,{key:e,name:e,active:a===e,onClick:o,text:O.c[e]||e,description:O.b[e]})}))))},M=function(e){var t=e.sourceType,a=e.setSourceType,r=e.loadSample,n=e.destType,o=e.setDestType,l=e.layout,s=e.setLayout;return c.a.createElement(x.a,{fluid:!0,secondary:!0,size:"small"},c.a.createElement(D,{label:"Source Format",value:t,options:Object.keys(O.d),onChange:a}),c.a.createElement(D,{label:"Output Format",value:n,options:Object.keys(O.a),onChange:o}),c.a.createElement(x.a.Menu,{position:"right"},c.a.createElement(x.a.Item,{name:"loadSample",onClick:r},"Load ",O.c[t]||t," Sample"),c.a.createElement(k.a,{item:!0,text:"Layout..."},c.a.createElement(k.a.Menu,null,Object.entries(_).map((function(e){var t=Object(u.a)(e,2),a=t[0],r=t[1];return c.a.createElement(k.a.Item,{key:a,name:a,active:l===a,text:r,onClick:function(e,t){var a=t.name;return s(a)}})}))))))},L=a(210),A=Object(L.a)("d2d-layout"),B=function(){var e,t=c.a.useState("yaml"),a=Object(u.a)(t,2),r=a[0],o=a[1],l=c.a.useState(""),s=Object(u.a)(l,2),i=s[0],p=s[1],_=c.a.useState("json"),h=Object(u.a)(_,2),v=h[0],E=h[1],b=c.a.useState(""),y=Object(u.a)(b,2),T=y[0],O=y[1],S=A(n.ThreeColumns),j=Object(u.a)(S,2),k=j[0],x=j[1],D=c.a.useMemo((function(){return Object(d.a)(r,i,T,v)}),[r,i,T,v]);switch(k){case n.ThreeColumns:default:e=c.a.createElement(f.a,{split:"vertical",defaultSize:"35%"},c.a.createElement(C,{source:i,sourceType:r,onChangeSource:p}),c.a.createElement(f.a,{split:"vertical",defaultSize:"40%"},c.a.createElement(g,{transform:T,onChangeTransform:O}),c.a.createElement(w,{destType:v,result:D})));break;case n.BottomCode:e=c.a.createElement(f.a,{split:"horizontal",defaultSize:"80%"},c.a.createElement(f.a,{split:"vertical",defaultSize:"50%"},c.a.createElement(C,{source:i,sourceType:r,onChangeSource:p}),c.a.createElement(w,{destType:v,result:D})),c.a.createElement(g,{transform:T,onChangeTransform:O}))}return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{id:"settings"},c.a.createElement(M,{sourceType:r,setSourceType:o,loadSample:function(){p(m[r])},destType:v,setDestType:E,layout:k,setLayout:x})),c.a.createElement("div",{id:"main-panes"},e))};s.a.render(c.a.createElement(B,null),document.getElementById("root"))},72:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var r=a(0),n=a.n(r),o=function(e){var t=e.result,a=t.error,r=t.phase;return n.a.createElement("div",{className:"error-result"},n.a.createElement("h2",null,a.name||"Error"," in ",r),a.stack?n.a.createElement("div",{className:"error-stack"},a.stack):n.a.createElement("b",null,a.toString()))}}},[[225,1,2]]]);
//# sourceMappingURL=main.fd6ffa10.chunk.js.map