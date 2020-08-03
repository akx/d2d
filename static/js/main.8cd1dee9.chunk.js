(this.webpackJsonpd2d=this.webpackJsonpd2d||[]).push([[0],{118:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a(0),r=a.n(n),o=function(e){var t=e.result,a=t.error,n=t.phase;return r.a.createElement("div",{className:"error-result"},r.a.createElement("h2",null,a.name||"Error"," in ",n),a.stack?r.a.createElement("div",{className:"error-stack"},a.stack):r.a.createElement("b",null,a.toString()))}},325:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return doTransform}));var _converters__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(37),lodash__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(326),lodash__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__),ramda__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(327);function innerTransform(inputs,transform){var data=inputs[0],data1=inputs[0],data2=inputs[1];if(transform.trim().length){var _=lodash__WEBPACK_IMPORTED_MODULE_1___default.a,R=ramda__WEBPACK_IMPORTED_MODULE_2__;eval(transform)}return data}function doTransform(e,t,a){for(var n,r=[],o=0;o<e.length;o++){var c=e[o];try{r.push(_converters__WEBPACK_IMPORTED_MODULE_0__.d[c.type](c.source))}catch(l){return{error:l,type:"error",phase:"input",index:o}}}try{n=innerTransform(r,t)}catch(l){return{error:l,type:"error",phase:"transform"}}try{return _converters__WEBPACK_IMPORTED_MODULE_0__.a[a](n)}catch(l){return{error:l,type:"error",phase:"output"}}}},342:function(e,t,a){e.exports=a(554)},347:function(e,t,a){},37:function(e,t,a){"use strict";a.d(t,"d",(function(){return L})),a.d(t,"a",(function(){return A})),a.d(t,"c",(function(){return B})),a.d(t,"b",(function(){return N}));var n=a(595),r=a(286),o=a.n(r),c=a(201),l=a.n(c),s=a(287),u=a(288),i=a(329),m=a(328),p=a(0),d=a.n(p),f=function(e,t,a){return d.a.createElement("div",null,"Oops! An error occurred: $",e.toString(),d.a.createElement("br",null),d.a.createElement("a",{href:"#",onClick:a},"Try again"))},h=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={},e.resetError=function(){e.setState({error:void 0,errorInfo:void 0})},e}return Object(u.a)(a,[{key:"componentDidCatch",value:function(e,t){this.setState({error:e,errorInfo:t})}},{key:"render",value:function(){return this.state.error?(this.props.renderError||f)(this.state.error,this.state.errorInfo,this.resetError):this.props.render()}}]),a}(d.a.Component),v=a(118),_=a(289),E=a.n(_)()({loader:function(){return a.e(5).then(a.bind(null,610))},loading:function(){return d.a.createElement("div",null,"Loading table")}}),b=function(e){var t=e.value;if("object"===typeof t)try{t=JSON.stringify(t)}catch(a){t="<unrenderable>"}return d.a.createElement(d.a.Fragment,null,t)};var y=d.a.memo((function(e){var t=e.data;try{var a=Array.from(t),n=function(e){var t=[],a=new Set;return e.forEach((function(e){return e&&Object.keys(e).forEach((function(e){a.has(e)||(t.push(e),a.add(e))}))})),t}(a);return n.length?d.a.createElement(E,{data:a,columns:n.map((function(e){return{accessor:e,Header:e,Cell:b}}))}):d.a.createElement(v.a,{result:{phase:"output",error:new Error("Unable to figure out columns"),type:"error"}})}catch(r){return d.a.createElement(v.a,{result:{phase:"output",error:r,type:"error"}})}})),C=a(202),S=a.n(C),O=a(290),g=a(154);function T(){return(T=Object(O.a)(S.a.mark((function e(t,n){var r,o,c,l,s;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=Promise.all([a.e(3),a.e(4)]).then(a.t.bind(null,609,7)),o=Array.from(t),e.next=4,r;case 4:c=e.sent,l=c.utils.json_to_sheet(o),s=c.utils.book_new(),c.utils.book_append_sheet(s,l,"d2d"),c.writeFile(s,"d2d-".concat((new Date).toISOString(),".").concat(n));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var k=function(e){var t=e.label,a=e.format,n=e.data;return d.a.createElement(g.a,{onClick:function(e){try{!function(e,t){T.apply(this,arguments)}(n,a)}catch(t){alert(t)}}},t)},j=function(e){var t=e.data;return d.a.createElement("div",{style:{textAlign:"center"}},d.a.createElement(k,{label:"Download XLSX",format:"xlsx",data:t}),d.a.createElement(k,{label:"Download XLS",format:"xls",data:t}),d.a.createElement(k,{label:"Download ODS",format:"ods",data:t}))},x=Object(n.a)(","),w=Object(n.a)(";"),D=Object(n.a)("\t");var L={csv:x.parse,json:JSON.parse,scsv:w.parse,text:function(e){return e},lines:function(e){return e.split("\n").filter((function(e){return(e=e.trimStart())&&!e.startsWith("#")}))},toml:o.a.parse,tsv:D.parse,yaml:l.a.safeLoad},M=function(e){return function(t){return{value:e(t),type:"string"}}},A={"json-compact":M(JSON.stringify),csv:M(x.format),scsv:M(w.format),json:M((function(e){return JSON.stringify(e,null,2)})),text:M((function(e){return""+e})),tsv:M(D.format),yaml:M(l.a.safeDump),table:function(e){return{error:null,type:"element",element:d.a.createElement(h,{render:function(){return d.a.createElement(y,{data:e})}})}},xlsx:function(e){return{error:null,type:"element",element:d.a.createElement(j,{data:e})}}},B={"json-compact":"JSON (compact)",csv:"CSV",json:"JSON",scsv:"SCSV",table:"Table",text:"Text",lines:"Text lines",toml:"TOML",tsv:"TSV",xlsx:"XLS/XLSX",yaml:"YAML"},N={csv:"Comma-separated values",scsv:"Semicolon-separated values",tsv:"Tab-separated values",lines:"Sans #comments and blanks"}},554:function(e,t,a){"use strict";a.r(t);var n,r,o=a(0),c=a.n(o),l=a(73),s=a.n(l),u=(a(347),a(348),a(349),a(350),a(351),a(352),a(353),a(354),a(355),a(36)),i=a(87);!function(e){e.ThreeColumns="threeColumns",e.BottomCode="bottomCode",e.NoCode="noCode"}(r||(r={}));var m=(n={},Object(i.a)(n,r.ThreeColumns,"Three Columns"),Object(i.a)(n,r.BottomCode,"Code on Bottom"),Object(i.a)(n,r.NoCode,"No Code"),n),p=a(300),d=a(602),f=a(37),h=function(e){var t=e.label,a=e.value,n=e.options,r=e.onChange,o=(e.style,function(e,t){r(t.name),e.preventDefault()});return c.a.createElement(d.a,{item:!0,text:"".concat(t,": ").concat(f.c[a]||a),closeOnChange:!1},c.a.createElement(d.a.Menu,{style:{minWidth:"25em"}},n.map((function(e){return c.a.createElement(d.a.Item,{key:e,name:e,active:a===e,onClick:o,text:f.c[e]||e,description:f.b[e]})}))))},v=[1,2,3],_=function(e){var t=e.destType,a=e.layout,n=e.setDestType,r=e.setLayout,o=e.nSources,l=e.setNSources;return c.a.createElement(p.a,{fluid:!0},c.a.createElement(d.a,{item:!0,text:"Layout: ".concat(m[a])||!1},c.a.createElement(d.a.Menu,null,Object.entries(m).map((function(e){var t=Object(u.a)(e,2),n=t[0],o=t[1];return c.a.createElement(d.a.Item,{key:n,name:n,active:a===n,text:o,onClick:function(e,t){var a=t.name;return r(a)}})})))),c.a.createElement(d.a,{item:!0,text:"Sources: ".concat(o)},c.a.createElement(d.a.Menu,null,v.map((function(e){return c.a.createElement(d.a.Item,{key:e,name:e,active:o===e,text:e,onClick:function(){return l(e)}})})))),c.a.createElement(h,{label:"Output Format",value:t,options:Object.keys(f.a),onChange:n}))},E=a(205),b=a(124),y=(a(552),"\n- A: One\n  B: Two\n  C: Three\n- A: Two\n  B: Four\n  C: Five\n- A: Three\n  B: Six\n  C: Seven\n".trim()),C={"json-compact":"json-compact",csv:"A,B,C\nOne,Two,Three\nTwo,Four,Five\nThree,Six,Seven",scsv:'"A","B","C"\n"One","Two","Three"\n"Two","Four","Five"\n"Three","Six","Seven"',json:JSON.stringify([{A:"One",B:"Two",C:"Three"},{A:"Two",B:"Four",C:"Five"},{A:"Three",B:"Six",C:"Seven"}],null,2),text:"Some arbitrary text",lines:"Hello\nWorld\n# Octothorpe comments are ignored, as are blank lines:\n\n\n\nHernekeitto",tsv:"A\tB\tC\nOne\tTwo\tThree\nTwo\tFour\tFive\nThree\tSix\tSeven",yaml:y,toml:'# This is a TOML document.\ntitle = "TOML Example"\n[owner]\nname = "Tom Preston-Werner"\ndob = 1979-05-27T07:32:00-08:00 # First class dates'},S=a(208),O=a(324),g=a(40),T=a(600),k=a(598),j=function(e){var t=e.value,a=e.options,n=e.onChange,r=c.a.useState(!1),o=Object(u.a)(r,2),l=o[0],s=o[1],i=c.a.useState(!!(t&&t.length>5e5)),m=Object(u.a)(i,2),p=m[0],d=m[1];return c.a.createElement(c.a.Fragment,null,p?c.a.createElement("textarea",{value:t,onChange:function(e){return n(e.target.value)},placeholder:a.placeholder}):c.a.createElement(O.Controlled,{className:"code-editor",value:t,options:Object(S.a)(Object(S.a)({},a),{},{lineWrapping:l}),onBeforeChange:function(e,t,a){return n(a)}}),c.a.createElement(g.a,{circular:!0,name:"copy",style:{position:"absolute",right:"35px",bottom:"5px"},link:!0,title:"Copy content",onClick:function(){return navigator.clipboard.writeText(t).then((function(){return Object(b.toast)({type:"success",title:"Copied ".concat(t.length," characters.")})}),(function(){return Object(b.toast)({type:"warning",title:"Copy failed."})}))}}),c.a.createElement(T.a,{trigger:c.a.createElement(g.a,{circular:!0,name:"setting",style:{position:"absolute",right:"5px",bottom:"5px"}}),hoverable:!0,plain:!0,basic:!0},c.a.createElement(k.a,{label:"Wrap Lines",checked:l,onChange:function(e,t){return s(!!t.checked)}}),c.a.createElement("br",null),c.a.createElement(k.a,{label:"Plain Editor",checked:p,onChange:function(e,t){return d(!!t.checked)}})))},x=a(599),w=a(154),D=function(e){var t=e.sourceType,a=e.source,n=e.onChangeSource,r=e.onChangeSourceType,o=e.onLoadSample,l=e.style,s=e.label,i=c.a.useState(!1),m=Object(u.a)(i,2),d=m[0],v=m[1],_=c.a.useCallback((function(){v(!1),n("")}),[v,n]),E=a.length>5e5&&!d?c.a.createElement("div",null,c.a.createElement(x.a,null,c.a.createElement(x.a.Header,null,"Large Content"),c.a.createElement("p",null,"The length of this data is ",a.length.toLocaleString()," characters.",c.a.createElement("br",null),"Showing it may cause performance problems.",c.a.createElement("br",null)),c.a.createElement("p",null,c.a.createElement(w.a,{primary:!0,onClick:function(){return v(!0)}},"Show it anyway"),c.a.createElement(w.a,{negative:!0,basic:!0,onClick:_},"Clear the data")))):c.a.createElement(j,{value:a,options:{mode:t,theme:"solarized light",lineNumbers:!0,placeholder:"Paste, drop or type in ".concat(f.c[t]||t," data here.")},onChange:n});return c.a.createElement("div",{className:"codebox-wrapper",style:l},c.a.createElement(p.a,{secondary:!0,size:"small",style:{margin:0}},s?c.a.createElement(p.a.Item,{style:{fontWeight:"bold"}},s):null,c.a.createElement(h,{label:"Source Format",value:t,options:Object.keys(f.d),onChange:r}),c.a.createElement(p.a.Item,{name:"loadSample",onClick:o},"Load ",f.c[t]||t," Sample")),E)},L=a(325);function M(){var e=c.a.useState("yaml"),t=Object(u.a)(e,2),a=t[0],n=t[1],r=c.a.useState(""),o=Object(u.a)(r,2),l=o[0],s=o[1],i=c.a.useCallback((function(){s(C[a])}),[a,s]);return{type:a,setType:n,source:l,setSource:s,loadSample:i}}var A="\n// * Lodash is available as `_`\n// ** e.g. `_.reverse(data)`\n// * Ramda is available as `R`\n// ** e.g. `data = R.reverse(data)`\n".trim(),B="\n// Feel free to modify `data` using JavaScript here.\n".concat(A,"\n").trim(),N="\n// Feel free to modify `data` using JavaScript here.\n// Multiple sources are available:\n// * as the `inputs` array\n// * as `data1`, `data2`, ...\n//\n".concat(A,"\n").trim(),P=function(e){var t=e.transform,a=e.onChangeTransform,n=e.nSources,r=e.style;return c.a.createElement("div",{className:"codebox-wrapper",style:r},c.a.createElement(j,{value:t,options:{mode:"javascript",theme:"solarized dark",lineNumbers:!0,placeholder:n>1?N:B},onChange:a}))},I=a(118),F=function(e){var t=e.destType,a=e.result,n=e.style,r=null;switch(a.type){case"element":r=a.element;break;case"string":r=c.a.createElement(j,{value:a.value,options:{mode:t,theme:"solarized light",lineNumbers:!0,readOnly:!0,placeholder:"Output will appear here in ".concat(f.c[t]||t,".")},onChange:function(){}});break;case"error":r=c.a.createElement(I.a,{result:a})}return c.a.createElement("div",{className:"codebox-wrapper",style:n},r)},W=a(90),R=function(e){var t=e.sources,a=e.transform,n=e.setTransform,o=e.destType,l=e.result,s=e.layout,u=t.length,i=c.a.createElement("div",{style:{display:"flex",flex:1,flexDirection:"column"}},t.map((function(e,t){return function(e,t,a){var n={source:e.source,sourceType:e.type,onChangeSource:e.setSource,onChangeSourceType:e.setType,onLoadSample:e.loadSample,label:t};return c.a.createElement(D,Object.assign({},n,{key:a}))}(e,u>1?"Input ".concat(t+1):void 0,"input-".concat(t))}))),m=c.a.createElement(P,{transform:a,onChangeTransform:n,nSources:u}),p=c.a.createElement(F,{destType:o,result:l});switch(s){case r.ThreeColumns:default:return c.a.createElement(W.a,{split:"vertical",defaultSize:"35%"},i,c.a.createElement(W.a,{split:"vertical",defaultSize:"40%"},m,p));case r.BottomCode:return c.a.createElement(W.a,{split:"horizontal",defaultSize:"80%"},c.a.createElement(W.a,{split:"vertical",defaultSize:"50%"},i,p),m);case r.NoCode:return c.a.createElement(W.a,{split:"vertical",defaultSize:"50%"},i,p)}},J=Object(E.a)("d2d-layout"),z=Object(E.a)("d2d-transform"),U=function(){var e=c.a.useState(1),t=Object(u.a)(e,2),a=t[0],n=t[1],o=c.a.useState("json"),l=Object(u.a)(o,2),s=l[0],i=l[1],m=z(""),p=Object(u.a)(m,2),d=p[0],f=p[1],h=J(r.ThreeColumns),v=Object(u.a)(h,2),E=v[0],y=v[1],C=[M(),M(),M()].slice(0,a),S=function(e,t,a){for(var n=e.length,r=[n,t,a],o=[],l=0;l<n;l++){var s=e[l],u=s.source,i=s.type;r.push(u),r.push(i),o.push({source:u,type:i})}return c.a.useMemo((function(){return Object(L.a)(o,t,a)}),r)}(C,d,s);return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{id:"settings"},c.a.createElement(_,{nSources:a,setNSources:n,destType:s,setDestType:i,layout:E,setLayout:y})),c.a.createElement("div",{id:"main-panes"},c.a.createElement(R,{sources:C,transform:d,setTransform:f,destType:s,result:S,layout:E})),c.a.createElement(b.SemanticToastContainer,{position:"top-right"}))};s.a.render(c.a.createElement(U,null),document.getElementById("root"))}},[[342,1,2]]]);
//# sourceMappingURL=main.8cd1dee9.chunk.js.map