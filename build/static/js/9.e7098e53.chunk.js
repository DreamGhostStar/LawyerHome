(this["webpackJsonpmedicine-back"]=this["webpackJsonpmedicine-back"]||[]).push([[9],{167:function(e,t,a){"use strict";a.d(t,"h",(function(){return u})),a.d(t,"a",(function(){return s})),a.d(t,"d",(function(){return o})),a.d(t,"g",(function(){return i})),a.d(t,"f",(function(){return l})),a.d(t,"c",(function(){return p})),a.d(t,"e",(function(){return A})),a.d(t,"b",(function(){return d}));var n=a(105),c=a(195),r=a.n(c),u=function(e){n.b.success(e)},s=function(e){n.b.error(e)},o=function(){return r.a.load("Authorization")},i=function(e){r.a.save("Authorization",e,{maxAge:604800})},l=function(){r.a.remove("Authorization")},p=function(){return{Authorization:o()}},A=function(e){return 0===e},d=function(e){var t=e.getFullYear(),a=e.getMonth()+1,n=e.getDay(),c=e.getHours(),r=e.getMinutes(),u=e.getSeconds();return"".concat(t,"-").concat(a,"-").concat(n," ").concat(c,":").concat(r,":").concat(u)}},170:function(e,t,a){"use strict";a.d(t,"b",(function(){return c})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return u}));var n=a(497),c="api",r="https://mock.yonyoucloud.com/mock/16533/api",u=Object(n.a)({scriptUrl:"http://at.alicdn.com/t/font_2274798_m840qtc2j2e.js"})},174:function(e,t,a){"use strict";a.d(t,"g",(function(){return i})),a.d(t,"h",(function(){return l})),a.d(t,"d",(function(){return p})),a.d(t,"f",(function(){return A})),a.d(t,"b",(function(){return d})),a.d(t,"i",(function(){return m})),a.d(t,"e",(function(){return f})),a.d(t,"c",(function(){return E})),a.d(t,"k",(function(){return g})),a.d(t,"a",(function(){return b})),a.d(t,"j",(function(){return v}));var n=a(168),c=a.n(n),r=a(169),u=a(170),s=a(167),o=a(176),i=function(){var e=Object(r.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.b,"/public/verificationCode/image"),{},"GET");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),l=function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.b,"/login/password"),t,"POST");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.b,"/user/getBasicInfo"),t,"GET",Object(s.c)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),A=function(){var e=Object(r.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.c,"/admin/userList"),{},"GET",Object(s.c)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.c,"/admin/user/identify"),t,"PUT",Object(s.c)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),m=function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.c,"/admin/user/password"),t,"PUT",Object(s.c)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),f=function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.c,"/admin/user"),t,"GET",Object(s.c)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),E=function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.c,"/admin/user"),t,"PUT",Object(s.c)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),g=function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.b,"/public/upload"),t,"POST",Object(s.c)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.c,"/admin/user"),t,"POST",Object(s.c)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.c,"/admin/user/tip"),t,"GET",Object(s.c)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},176:function(e,t,a){"use strict";var n=a(71),c=a(72),r=a(196),u=a.n(r);u.a.defaults.timeout=1e5,u.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}));var s=function(){function e(){Object(n.a)(this,e)}return Object(c.a)(e,null,[{key:"request",value:function(e,t,a,n){return new Promise("GET"===a?function(a,c){u.a.get(e,{params:t,headers:n}).then((function(e){a(e.data)})).catch((function(e){c(e)}))}:function(c,r){u()({method:a,data:t,headers:n,url:e}).then((function(e){c(e.data)})).catch((function(e){r(e)}))})}}]),e}();t.a=s},189:function(e,t,a){},194:function(e,t,a){"use strict";var n=a(53),c=a(55),r=a(168),u=a.n(r),s=a(169),o=a(172),i=a(0),l=a.n(i),p=(a(189),a(54)),A=a(167),d=a(5),m=a(174),f=a(170);t.a=Object(n.b)((function(e){return{user:e}}),{transform_user:function(e){return{type:c.b,data:e}}})((function(e){var t,a=e.transform_user,n=e.title,c=Object(d.g)(),r=Object(i.useState)(null===(t=p.a.getState().user)||void 0===t?void 0:t.avatar),E=Object(o.a)(r,2),g=E[0],b=E[1],v=Object(i.useState)(!1),h=Object(o.a)(v,2),j=h[0],Q=h[1],O=Object(i.useCallback)(Object(s.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!Object(A.d)()||p.a.getState().user){e.next=6;break}return e.next=4,Object(m.d)({});case 4:t=e.sent,Object(A.e)(t.code)?(n=t.data,b(n.avatar),a(n)):(Object(A.a)(t.message),c.push("/login"));case 6:p.a.getState().user||(Object(A.a)("\u8bf7\u5148\u767b\u5f55"),c.push("/login"));case 7:case"end":return e.stop()}}),e)}))),[c,a]);return Object(i.useEffect)((function(){p.a.subscribe((function(){O()})),O()}),[O]),l.a.createElement("div",{className:"".concat("home-header","-layout")},l.a.createElement("p",{className:"".concat("home-header","-logo"),onClick:function(){c.push("/home")}},"\u5f8b\u653f\u4e91"),n&&l.a.createElement("p",{className:"".concat("home-header","-title")},n),l.a.createElement("div",{className:"".concat("home-header","-user-layout"),onMouseOver:function(){return Q(!0)},onMouseOut:function(){return Q(!1)}},l.a.createElement("img",{onClick:function(){return console.log(g)},src:g,alt:"avatar",className:"".concat("home-header","-avatar")}),l.a.createElement(f.a,{type:"icon-xiabiao",className:"".concat("home-header","-icon"),style:{color:j?"#000":"#fff"}}),l.a.createElement("div",{className:"".concat("home-header","-user-operation-layout"),style:{display:j?"block":"none"}},l.a.createElement("p",{className:"".concat("home-header","-user-operation-word"),onClick:function(){Object(A.f)(),Object(A.h)("\u9000\u51fa\u767b\u5f55\u6210\u529f"),c.push("/login")}},"\u9000\u51fa\u767b\u5f55"))))}))},231:function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return l}));var n=a(168),c=a.n(n),r=a(169),u=a(170),s=a(167),o=a(176),i=function(){var e=Object(r.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.c,"/admin/case/list"),{},"GET",Object(s.c)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),l=function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.c,"/admin/case"),t,"POST",Object(s.c)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},273:function(e,t,a){},461:function(e){e.exports=JSON.parse('[{"id":"invest","value":"\u4fa6\u67e5"},{"id":"prosecute","value":"\u8d77\u8bc9"},{"id":"first_instance","value":"\u4e00\u5ba1"},{"id":"second_instance","value":"\u4e8c\u5ba1"},{"id":"review","value":"\u518d\u5ba1"},{"id":"arbitrament","value":"\u4ef2\u88c1"}]')},462:function(e){e.exports=JSON.parse('[{"id":"civil","value":"\u6c11\u4e8b"},{"id":"criminal","value":"\u5211\u4e8b"},{"id":"administrative","value":"\u884c\u653f"},{"id":"non_lawsuit","value":"\u975e\u8bc9\u8bbc\u4e1a\u52a1"}]')},463:function(e,t,a){},467:function(e,t,a){e.exports=a.p+"static/media/wordLogo.8d83bcf6.png"},493:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return q}));var n=a(168),c=a.n(n),r=a(169),u=a(172),s=a(233),o=a(492),i=a(487),l=a(183),p=a(194),A=a(0),d=a.n(A),m=a(53),f=a(5),E=a(54),g=(a(273),a(461)),b=a(462),v=a(174),h=a(167),j=a(73),Q=a(482);function O(e,t){var a=null;return Object(A.useCallback)((function(){a||(a=setTimeout((function(){a=null}),t),e.apply(void 0,arguments))}),[a])}a(463);var C=a(496);function N(e){var t=e.value,a=e.callback;return d.a.createElement(C.a,{size:"small",min:1,max:100,value:t,onChange:function(e){a(e)}})}var y="lawyer-assistInput";function k(e){var t=e.assistIDList,a=e.setAssistIDList,n=Object(A.useState)(""),s=Object(u.a)(n,2),o=s[0],l=s[1],p=Object(A.useState)([]),m=Object(u.a)(p,2),f=m[0],E=m[1];return O(function(){var e=Object(r.a)(c.a.mark((function e(t){var a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,Object(v.j)({value:t});case 4:a=e.sent,Object(h.e)(a.code)?E(a.data):Object(h.a)(a.message);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),500)(o),d.a.createElement(d.a.Fragment,null,d.a.createElement("h3",{className:"".concat(y,"-title")},"\u534f\u529e\u4eba"),d.a.createElement("div",{className:"".concat(y,"-input-layout")},d.a.createElement(i.a,{value:o,className:"".concat(y,"-autoComplete"),onSelect:function(e){for(var n=function(n){var c=f[n];if(c.id===e){var r=!1;return t.forEach((function(e){e.id!==parseInt(c.id)||(r=!0)})),r?Object(h.a)("\u8be5\u7528\u6237\u5df2\u6dfb\u52a0\uff0c\u8bf7\u68c0\u67e5"):(a([].concat(Object(Q.a)(t),[{id:parseInt(c.id),username:c.value,scale:0}])),l("")),{v:void 0}}},c=0;c<f.length;c++){var r=n(c);if("object"===typeof r)return r.v}},onChange:function(e){return l(e)},placeholder:"\u534f\u529e\u4eba"},f.map((function(e,t){return d.a.createElement(i.a.Option,{key:t,value:e.id},e.value)})))),d.a.createElement("div",{className:"".concat(y,"-user-show-layout")},t.map((function(e,n){return d.a.createElement("div",{key:n,className:"".concat(y,"-user-show")},d.a.createElement("p",{className:"".concat(y,"-value")},e.username),d.a.createElement("div",{className:"".concat(y,"-value")},d.a.createElement(N,{value:e.scale,callback:function(n){return function(e,n){var c=t.map((function(t){return n.id===t.id?Object(j.a)(Object(j.a)({},t),{},{scale:e}):t}));a(c)}(n,e)}}),"\xa0 %"))}))))}var B=a(231),w=a(494),S=a(34),I=a(170),x=a(176),J=function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.request("".concat(I.b,"/public/upload"),t,"POST",{Authorization:Object(h.d)(),"Content-Type":"multipart/form-data"});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),K=a(467),T=a.n(K);function R(e){var t=e.agencyWord,a=e.setAgencyWord,n=Object(A.useRef)(null),s=Object(A.useState)(!1),o=Object(u.a)(s,2),i=o[0],p=o[1],m=function(){var e=Object(r.a)(c.a.mark((function e(t){var n,r,u,s;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n=t.target.files)){e.next=11;break}return p(!0),r=n[0],(u=new FormData).append(r.name,r),e.next=8,J(u);case 8:s=e.sent,Object(h.e)(s.code)?a({url:s.data,filename:r.name,uploadTime:Object(h.b)(new Date)}):Object(h.a)(s.message),p(!1);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return d.a.createElement("div",{className:"".concat("page-editCase","-input-layout")},d.a.createElement("p",null,d.a.createElement("span",{className:"".concat("page-editCase","-title"),style:{lineHeight:"130px"}},"\u4ee3\u7406\u8bcd"),d.a.createElement("span",{className:"".concat("page-editCase","-symbol")},"\uff1a")),d.a.createElement("div",{className:"".concat("page-editCase","-agency-word")},t?d.a.createElement("div",{className:"".concat("page-editCase","-agency-word-main")},d.a.createElement(w.a,{width:130,height:130,src:T.a,fallback:"data:image/png;base64,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"}),d.a.createElement("div",null,d.a.createElement("p",{className:"".concat("page-editCase","-agency-word-info")},d.a.createElement("span",{className:"".concat("page-editCase","-agency-word-title")},"\u6587\u4ef6\u540d\uff1a"),d.a.createElement("span",null,t.filename)),d.a.createElement("p",{className:"".concat("page-editCase","-agency-word-info")},d.a.createElement("span",{className:"".concat("page-editCase","-agency-word-title")},"\u4e0a\u4f20\u65f6\u95f4\uff1a"),d.a.createElement("span",null,t.uploadTime)))):d.a.createElement(S.a,{image:S.a.PRESENTED_IMAGE_SIMPLE}),d.a.createElement("input",{type:"file",ref:n,accept:".doc,.docx",onChange:m,className:"".concat("page-editCase","-agency-word-input")}),d.a.createElement(l.a,{className:"".concat("page-editCase","-agency-word-button"),onClick:function(){var e;null===(e=n.current)||void 0===e||e.click()}},i?"\u4e0a\u4f20\u4e2d":"\u4e0a\u4f20")))}var U=s.a.Option,P=o.a.TextArea;function q(){var e,t,a,n=Object(f.h)(),j=Object(f.g)(),Q=void 0===n.id,C=Object(A.useState)(""),y=Object(u.a)(C,2),w=y[0],S=y[1],I=Object(A.useState)(""),x=Object(u.a)(I,2),J=x[0],K=x[1],T=Object(A.useState)(""),q=Object(u.a)(T,2),z=q[0],Y=q[1],D=Object(A.useState)(g[0].id),M=Object(u.a)(D,2),L=M[0],G=M[1],H=Object(A.useState)(b[0].id),F=Object(u.a)(H,2),Z=F[0],X=F[1],W=Object(A.useState)(""),V=Object(u.a)(W,2),_=V[0],$=V[1],ee=Object(A.useState)(""),te=Object(u.a)(ee,2),ae=te[0],ne=te[1],ce=Object(A.useState)([]),re=Object(u.a)(ce,2),ue=re[0],se=re[1],oe=Object(A.useState)(""),ie=Object(u.a)(oe,2),le=ie[0],pe=ie[1],Ae=Object(A.useState)(null),de=Object(u.a)(Ae,2),me=de[0],fe=de[1],Ee=Object(A.useState)(0),ge=Object(u.a)(Ee,2),be=ge[0],ve=ge[1],he=Object(A.useState)([]),je=Object(u.a)(he,2),Qe=je[0],Oe=je[1],Ce=Object(A.useState)(null),Ne=Object(u.a)(Ce,2),ye=Ne[0],ke=Ne[1],Be=function(e,t){e(t)},we=function(e,t,a){return d.a.createElement("div",{className:"".concat("page-editCase","-input-layout")},d.a.createElement("p",null,d.a.createElement("span",{className:"".concat("page-editCase","-title")},e),d.a.createElement("span",{className:"".concat("page-editCase","-symbol")},"\uff1a")),d.a.createElement(o.a,{onChange:function(e){return Be(a,e.target.value)},className:"".concat("page-editCase","-input"),placeholder:t}))},Se=function(e,t,a,n){return d.a.createElement("div",{className:"".concat("page-editCase","-input-layout")},d.a.createElement("p",null,d.a.createElement("span",{className:"".concat("page-editCase","-title")},e),d.a.createElement("span",{className:"".concat("page-editCase","-symbol")},"\uff1a")),d.a.createElement(s.a,{defaultValue:n,className:"".concat("page-editCase","-select"),onChange:function(e){return t(e)}},a.map((function(e,t){return d.a.createElement(U,{key:t,value:e.id},e.value)}))))},Ie=function(){var e=Object(r.a)(c.a.mark((function e(){var t,a,n=arguments;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=n.length<=0?void 0:n[0]){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,Object(v.j)({value:t});case 5:a=e.sent,Object(h.e)(a.code)?se(a.data):Object(h.a)(a.message);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),xe=function(){var e=Object(r.a)(c.a.mark((function e(){var t,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=!1,[w,_,L,Z,J,z,me,be,ye].map((function(e){t=!!t||(null===e||""===e)})),!t){e.next=5;break}return Object(h.a)("\u4fe1\u606f\u672a\u586b\u5199\u5b8c\uff0c\u8bf7\u68c0\u67e5\u540e\u91cd\u8bd5"),e.abrupt("return");case 5:return e.next=7,Object(B.a)({caseNumber:w,caseReason:_,caseTrial:L,caseType:Z,accuser:J,defendant:z,detail:ae,agency:ye.url,host:{id:me,scale:be},assiant:Qe.map((function(e){return{id:e.id,scale:e.scale}}))});case 7:a=e.sent,Object(h.e)(a.code)?(Object(h.h)("\u65b0\u5efa\u6848\u4ef6\u6210\u529f"),j.goBack()):Object(h.a)(a.message);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return O(Ie,500)(le),d.a.createElement("div",{className:"".concat("page-editCase","-layout")},d.a.createElement(m.a,{store:E.a},d.a.createElement(p.a,{title:Q?"\u65b0\u5efa\u6848\u4ef6":"\u4fee\u6539\u6848\u4ef6"})),d.a.createElement("div",{className:"".concat("page-editCase","-main")},we("\u6848\u4ef6\u53f7","\u6848\u4ef6\u53f7",S),we("\u539f\u544a","\u539f\u544a",K),we("\u88ab\u544a","\u88ab\u544a",Y),Se("\u7c7b\u578b",X,b,Z),Se("\u5ba1\u7ea7",G,g,L),we("\u6848\u7531","\u6848\u7531",$),(e="\u8be6\u60c5",t="\u8be6\u60c5",a=ne,d.a.createElement("div",{className:"".concat("page-editCase","-input-layout")},d.a.createElement("p",null,d.a.createElement("span",{className:"".concat("page-editCase","-title")},e),d.a.createElement("span",{className:"".concat("page-editCase","-symbol")},"\uff1a")),d.a.createElement(P,{className:"".concat("page-editCase","-input"),rows:4,placeholder:t,onChange:function(e){return Be(a,e.target.value)}}))),d.a.createElement("div",{className:"".concat("page-editCase","-input-layout")},d.a.createElement("p",null,d.a.createElement("span",{className:"".concat("page-editCase","-title")},"\u4e3b\u529e\u4eba"),d.a.createElement("span",{className:"".concat("page-editCase","-symbol")},"\uff1a")),d.a.createElement(i.a,{value:le,className:"".concat("page-editCase","-autoComplete"),onSelect:function(e){for(var t=0;t<ue.length;t++){var a=ue[t];if(a.id===e)return pe(a.value),void fe(parseInt(e))}},onChange:function(e){return pe(e)},placeholder:"\u4e3b\u529e\u4eba"},ue.map((function(e,t){return d.a.createElement(i.a.Option,{key:t,value:e.id},e.value)})))),d.a.createElement("div",{className:"".concat("page-editCase","-input-layout")},d.a.createElement("p",null,d.a.createElement("span",{className:"".concat("page-editCase","-title")},"\u4e3b\u529e\u4eba\u6bd4\u4f8b"),d.a.createElement("span",{className:"".concat("page-editCase","-symbol")},"\uff1a")),d.a.createElement("div",{className:"".concat("page-editCase","-couter-step")},d.a.createElement(N,{value:be,callback:function(e){return ve(e)}}),"\xa0 %")),d.a.createElement(R,{agencyWord:ye,setAgencyWord:ke})),d.a.createElement("div",{className:"".concat("page-editCase","-main")},d.a.createElement(k,{assistIDList:Qe,setAssistIDList:Oe})),d.a.createElement("div",{className:"".concat("page-editCase","-submit-layout")},d.a.createElement(l.a,{type:"primary",onClick:xe},"\u63d0\u4ea4")))}}}]);
//# sourceMappingURL=9.e7098e53.chunk.js.map