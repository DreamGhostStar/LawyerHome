(this["webpackJsonpmedicine-back"]=this["webpackJsonpmedicine-back"]||[]).push([[7],{167:function(e,t,n){"use strict";n.d(t,"g",(function(){return u})),n.d(t,"a",(function(){return s})),n.d(t,"c",(function(){return o})),n.d(t,"f",(function(){return i})),n.d(t,"e",(function(){return f})),n.d(t,"b",(function(){return l})),n.d(t,"d",(function(){return p}));var a=n(105),r=n(203),c=n.n(r),u=function(e){a.b.success(e)},s=function(e){a.b.error(e)},o=function(){return c.a.load("Authorization")},i=function(e){c.a.save("Authorization",e,{maxAge:604800})},f=function(){c.a.remove("Authorization")},l=function(){return{Authorization:o()}},p=function(e){return 0===e}},172:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return u}));var a=n(469),r="api",c="https://mock.yonyoucloud.com/mock/16533/api",u=Object(a.a)({scriptUrl:"http://at.alicdn.com/t/font_2274798_m840qtc2j2e.js"})},177:function(e,t,n){"use strict";n.d(t,"g",(function(){return i})),n.d(t,"h",(function(){return f})),n.d(t,"d",(function(){return l})),n.d(t,"f",(function(){return p})),n.d(t,"b",(function(){return m})),n.d(t,"i",(function(){return b})),n.d(t,"e",(function(){return d})),n.d(t,"c",(function(){return h})),n.d(t,"j",(function(){return v})),n.d(t,"a",(function(){return y}));var a=n(169),r=n.n(a),c=n(170),u=n(172),s=n(167),o=n(181),i=function(){var e=Object(c.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.b,"/public/verificationCode/image"),{},"GET");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),f=function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.b,"/login/password"),t,"POST");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.b,"/user/getBasicInfo"),t,"GET",Object(s.b)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=Object(c.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.c,"/admin/userList"),{},"GET",Object(s.b)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),m=function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.c,"/admin/user/identify"),t,"PUT",Object(s.b)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.c,"/admin/user/password"),t,"PUT",Object(s.b)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.c,"/admin/user"),t,"GET",Object(s.b)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),h=function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.c,"/admin/user"),t,"PUT",Object(s.b)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.b,"/public/upload"),t,"POST",Object(s.b)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.request("".concat(u.c,"/admin/user"),t,"POST",Object(s.b)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},181:function(e,t,n){"use strict";var a=n(72),r=n(73),c=n(204),u=n.n(c);u.a.defaults.timeout=1e5,u.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}));var s=function(){function e(){Object(a.a)(this,e)}return Object(r.a)(e,null,[{key:"request",value:function(e,t,n,a){return new Promise("GET"===n?function(n,r){u.a.get(e,{data:t,headers:a}).then((function(e){n(e.data)})).catch((function(e){r(e)}))}:function(r,c){u()({method:n,data:t,headers:a,url:e}).then((function(e){r(e.data)})).catch((function(e){c(e)}))})}}]),e}();t.a=s},206:function(e,t,n){},225:function(e,t,n){"use strict";var a=n(53),r=n(56),c=n(169),u=n.n(c),s=n(170),o=n(176),i=n(0),f=n.n(i),l=(n(206),n(54)),p=n(167),m=n(5),b=n(177),d=n(172);t.a=Object(a.b)((function(e){return{user:e}}),{transform_user:function(e){return{type:r.b,data:e}}})((function(e){var t,n=e.transform_user,a=Object(m.g)(),r=Object(i.useState)(null===(t=l.a.getState().user)||void 0===t?void 0:t.avatar),c=Object(o.a)(r,2),h=c[0],v=c[1],y=Object(i.useState)(!1),O=Object(o.a)(y,2),j=O[0],w=O[1],E=function(){var e=Object(s.a)(u.a.mark((function e(){var t,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!Object(p.c)()||l.a.getState().user){e.next=9;break}return e.next=4,Object(b.d)({});case 4:t=e.sent,r=t.data,console.log(r),v(r.avatar),n(r);case 9:l.a.getState().user||(Object(p.a)("\u8bf7\u5148\u767b\u5f55"),a.push("/login"));case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(i.useEffect)((function(){l.a.subscribe((function(){E()})),E()}),[]),f.a.createElement("div",{className:"".concat("home-header","-layout")},f.a.createElement("p",{className:"".concat("home-header","-title"),onClick:function(){a.push("/home")}},"\u5f8b\u653f\u4e91"),f.a.createElement("div",{className:"".concat("home-header","-user-layout"),onMouseOver:function(){return w(!0)},onMouseOut:function(){return w(!1)}},f.a.createElement("img",{onClick:function(){return console.log(h)},src:h,alt:"avatar",className:"".concat("home-header","-avatar")}),f.a.createElement(d.a,{type:"icon-xiabiao",className:"".concat("home-header","-icon"),style:{color:j?"#000":"#fff"}}),f.a.createElement("div",{className:"".concat("home-header","-user-operation-layout"),style:{display:j?"block":"none"}},f.a.createElement("p",{className:"".concat("home-header","-user-operation-word"),onClick:function(){Object(p.e)(),Object(p.g)("\u9000\u51fa\u767b\u5f55\u6210\u529f"),a.push("/login")}},"\u9000\u51fa\u767b\u5f55"))))}))},454:function(e,t,n){},455:function(e,t,n){},456:function(e,t,n){},468:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return E}));var a=n(169),r=n.n(a),c=n(170),u=n(176),s=n(167),o=n(172),i=n(181),f=function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.request("".concat(o.c,"/admin/salary/user"),t,"GET",Object(s.b)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.request("".concat(o.c,"/admin/salary/list"),t,"GET",Object(s.b)());case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=n(0),m=n.n(p),b=(n(454),"salary-salaryList");function d(e){var t=e.userID,n=Object(p.useState)([]),a=Object(u.a)(n,2),o=a[0],i=a[1],f=function(){var e=Object(c.a)(r.a.mark((function e(){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l({userID:t});case 2:n=e.sent,Object(s.d)(n.code)?i(n.data):Object(s.a)(n.message);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(p.useEffect)((function(){f()}),[t]),m.a.createElement("div",{className:"".concat(b,"-layout")},o.map((function(e,t){return m.a.createElement("div",{key:t,className:"".concat(b,"-salary-item-layout")},m.a.createElement("p",{className:"".concat(b,"-year")},"\u5e74\u4efd\uff1a",e.year),m.a.createElement("p",{className:"".concat(b,"-year")},"\u5e74\u5ea6\u603b\u6536\u5165\uff1a",e.year_salary),e.case_list.map((function(e,t){return m.a.createElement("div",{key:t,className:"".concat(b,"-case-item")},m.a.createElement("span",null,e.case_name),m.a.createElement("span",null,e.identity),m.a.createElement("span",null,e.salary),m.a.createElement("span",null,e.ratio))})))})))}var h=n(81);n(455);function v(e){var t=e.userID,n=Object(p.useState)({}),a=Object(u.a)(n,2),o=a[0],i=a[1],l=Object(p.useState)(!1),b=Object(u.a)(l,2),d=b[0],v=b[1],y=function(){var e=Object(c.a)(r.a.mark((function e(){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return v(!0),e.next=3,f({userID:t});case 3:n=e.sent,Object(s.d)(n.code)?i(n.data):Object(s.a)(n.message),v(!1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(p.useEffect)((function(){y()}),[t]);var O=function(e,t){return m.a.createElement("p",null,m.a.createElement("span",{className:"".concat("salary-userBasicShow","-title")},e,"\uff1a"),m.a.createElement("span",{className:"".concat("salary-userBasicShow","-value")},t))};return m.a.createElement("div",{className:"".concat("salary-userBasicShow","-layout")},d?m.a.createElement(h.a,null):m.a.createElement("div",{className:"".concat("salary-userBasicShow","-main")},m.a.createElement("div",{className:"".concat("salary-userBasicShow","-name-avatar-layout")},m.a.createElement("img",{src:o.avatar,className:"".concat("salary-userBasicShow","-avatar"),alt:""}),m.a.createElement("p",{className:"".concat("salary-userBasicShow","-name")},o.name)),m.a.createElement("div",{className:"".concat("salary-userBasicShow","-other-info")},O("\u6536\u5165\u603b\u989d","".concat(o.salaryNum||"0","\u5143")),O("\u624b\u673a\u53f7",o.phoneNumber||"\u65e0"),O("\u5fae\u4fe1\u53f7",o.weixin_number||"\u65e0"),O("\u5f8b\u5e08\u8bc1\u53f7",o.lawyer_number||"\u65e0"))))}var y=n(225),O=n(53),j=n(5),w=n(54);n(456);function E(){var e=Object(j.h)();return m.a.createElement("div",{className:"".concat("page-salary","-layout")},m.a.createElement(O.a,{store:w.a},m.a.createElement(y.a,null)),m.a.createElement("div",{className:"".concat("page-salary","-main")},m.a.createElement(v,{userID:parseInt(e.id)}),m.a.createElement(d,{userID:parseInt(e.id)})))}}}]);
//# sourceMappingURL=7.7413c642.chunk.js.map