(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{21:function(e,t,n){},23:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(14),s=n.n(a),o=(n(21),n(5)),u=n(30),i=n(1),f=function(){var e=Object(r.useState)(""),t=Object(o.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(!1),s=Object(o.a)(a,2),f=s[0],l=s[1];return Object(i.jsxs)("div",{children:["Hello New User !",Object(i.jsx)("input",{type:"text",placeholder:"new Name",name:"name",onKeyUp:function(e){var t;"Enter"===e.key&&(""!==n&&(!function(e){localStorage.setItem("user",JSON.stringify(e))}((t=n,{uid:Object(u.a)(),name:t})),l(!0)))},onChange:function(e){return t=e.target.value,void c(t);var t}}),f&&Object(i.jsx)("a",{href:"./",children:" see list"})]})},l=(n(23),n(2)),j=n.n(l),p=n(4),b="https://vote.metacity.jp",d="db",h=function(){var e=Object(p.a)(j.a.mark((function e(){var t,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(b,"/").concat(d,"/list/"));case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),v=function(){var e=Object(p.a)(j.a.mark((function e(t){var n,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(b,"/").concat(d,"/tag/").concat(t,"/"));case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),O=function(){var e=Object(p.a)(j.a.mark((function e(t){var n,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(b,"/").concat(d,"/info/").concat(t,"/"));case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=function(){var e=Object(p.a)(j.a.mark((function e(t){var n,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(b,"/").concat(d,"/result/").concat(t,"/"));case 2:return n=e.sent,e.next=5,n.json();case 5:if(r=e.sent){e.next=11;break}return console.log("hi"),e.abrupt("return",null);case 11:if(console.log(r),"result not found"!==r){e.next=16;break}return e.abrupt("return",null);case 16:return e.abrupt("return",r);case 17:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),m=function(){var e=Object(p.a)(j.a.mark((function e(t){var n,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(b,"/").concat(d,"/result/"),{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}});case 2:return n=e.sent,e.next=5,n.json();case 5:r=e.sent,console.log(r);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),y=function(){var e=Object(p.a)(j.a.mark((function e(t,n,r){var c,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(b,"/").concat(d,"/info/").concat(t,"/").concat(n,"/"),{method:"POST",body:JSON.stringify(r),headers:{"Content-Type":"application/json"}});case 2:return c=e.sent,e.next=5,c.json();case 5:a=e.sent,console.log(a);case 7:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),w=function(e){var t=e.user,n=Object(r.useState)([]),c=Object(o.a)(n,2),a=c[0],s=c[1];return Object(r.useEffect)((function(){(function(){var e=Object(p.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h();case 2:t=e.sent,s(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(i.jsxs)("div",{children:[Object(i.jsxs)("p",{children:["logged in as: ",t.name,"(",t.uid,")"]}),Object(i.jsx)("ul",{children:a.map((function(e){return Object(i.jsx)("li",{children:Object(i.jsx)("a",{href:"?t=".concat(e.uid),children:e.title})})}))})]})},g=n(8),k=function(e){var t=e.votes,n=e.user,r=e.uid,c={votes:Object.keys(t).map((function(e){return{to:e,value:t[e]}}))};return Object(i.jsx)("div",{children:Object(i.jsx)(g.e,{initialValues:c,onSubmit:function(e){var t=e.votes.filter((function(e){return""!==e.to})).filter((function(e){return 0!==e.value})).map((function(e){return{to:e.to,value:parseFloat(e.value)}})).filter((function(e){return!isNaN(e.value)})),c={};t.forEach((function(e){return c[e.to]=e.value})),function(){var e=Object(p.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y(r,n.name,c);case 2:window.location.reload(!0);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()},children:function(e){var t=e.values;return Object(i.jsxs)(g.d,{children:[Object(i.jsx)(g.c,{name:"votes",children:function(e){e.insert;var n=e.remove,r=e.push;return Object(i.jsxs)("div",{children:[t.votes.length>0&&t.votes.map((function(e,t){return Object(i.jsxs)("div",{className:"row",children:[Object(i.jsxs)("div",{className:"col",children:[Object(i.jsx)("label",{htmlFor:"votes.".concat(t,".to"),children:"To"}),Object(i.jsx)(g.b,{name:"votes.".concat(t,".to"),placeholder:"Option",type:"text"}),Object(i.jsx)(g.a,{name:"votes.".concat(t,".to"),component:"div",className:"field-error"})]}),Object(i.jsxs)("div",{className:"col",children:[Object(i.jsx)("label",{htmlFor:"votes.".concat(t,".value"),children:"Value"}),Object(i.jsx)(g.b,{name:"votes.".concat(t,".value"),placeholder:"Option",type:"text"}),Object(i.jsx)(g.a,{name:"votes.".concat(t,".value"),component:"div",className:"field-error"})]}),Object(i.jsx)("div",{className:"col",children:Object(i.jsx)("button",{type:"button",onClick:function(){return n(t)},children:"X"})})]},t)})),Object(i.jsx)("button",{type:"button",className:"secondary",onClick:function(){return r({to:"",value:"0.0"})},children:"Add Option"})]})}}),Object(i.jsx)("button",{type:"submit",children:"update vote"})]})}})})},S=function(){var e=Object(p.a)(j.a.mark((function e(t,n,r){var c,a,s;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c={jsonrpc:"2.0",id:r,method:n,params:t},e.next=3,fetch("".concat("https://vote.metacity.jp","/rpc/"),{mode:"cors",method:"POST",body:JSON.stringify(c),headers:{"Content-Type":"application/json"}});case 3:return a=e.sent,e.next=6,a.json();case 6:return s=e.sent,e.abrupt("return",s);case 8:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),N=function(e){var t=e.info,n=e.hash,c=Object(r.useState)(""),a=Object(o.a)(c,2),s=a[0],u=a[1];return Object(r.useEffect)((function(){(function(){var e=Object(p.a)(j.a.mark((function e(){var r,c,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(n);case 2:if(r=e.sent){e.next=14;break}return e.next=6,S(t.params,t.method,n);case 6:if(!(c=e.sent).result){e.next=12;break}return a={info_uid:t.uid,info_hash:n,data:c.result},u(JSON.stringify(a,null,2)),e.next=12,m(a);case 12:e.next=15;break;case 14:u(JSON.stringify(r,null,2));case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(i.jsx)("pre",{children:s})},E=function(e){var t=e.info,n=e.user,r=e.hash,c="liquid"===t.method?"\ud83c\udf0a":"\ud83d\udca0";return Object(i.jsxs)("div",{children:[Object(i.jsxs)("p",{children:["logged in as: ",n.name,"(",n.uid,")"]}),Object(i.jsx)("a",{href:"./",children:"back to list"}),Object(i.jsx)("h1",{children:t.title}),Object(i.jsx)("p",{children:t.description}),Object(i.jsx)("p",{children:t.parent||""}),Object(i.jsx)("p",{children:c}),Object(i.jsx)(k,{votes:function(){var e={};if("liquid"==t.method){var r=Object.keys(t.params.voters).concat(Object.values(t.params.voters).map((function(e){return Object.keys(e)})).flat());Array.from(new Set(r)).filter((function(e){return e!==n.name})).forEach((function(t){return e[t]=0}))}else{var c=Object.values(t.params.voters).map((function(e){return Object.keys(e)})).flat();Array.from(new Set(c)).forEach((function(t){return e[t]=0}))}var a=t.params.voters[n.name];return a&&Object.keys(a).forEach((function(t){return e[t]=a[t]})),e}(),user:n,uid:t.uid}),Object(i.jsx)(N,{info:t,hash:r})]})},C=function(e){var t=e.uid,n=e.user,c=Object(r.useState)(null),a=Object(o.a)(c,2),s=a[0],u=a[1],f=Object(r.useState)(""),l=Object(o.a)(f,2),b=l[0],d=l[1];return Object(r.useEffect)((function(){(function(){var e=Object(p.a)(j.a.mark((function e(){var n,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v(t);case 2:return n=e.sent,e.next=5,O(n);case 5:r=e.sent,d(n),u(r);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),s?Object(i.jsx)(E,{info:s,user:n,hash:b}):Object(i.jsx)("div",{children:"loading voting information..."})},J=function(e){var t=window.location.search;return new URLSearchParams(t).get(e)},T=function(){var e=localStorage.getItem("user");return e?JSON.parse(e):null},F=function(){var e=Object(r.useState)(null),t=Object(o.a)(e,2),n=t[0],c=t[1];if(Object(r.useEffect)((function(){var e=T();c(e)}),[]),!n)return Object(i.jsx)(f,{});var a=J("t");return a?Object(i.jsx)(C,{uid:a,user:n}):Object(i.jsx)(w,{user:n})},P=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,31)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),r(e),c(e),a(e),s(e)}))};s.a.render(Object(i.jsx)(c.a.StrictMode,{children:Object(i.jsx)(F,{})}),document.getElementById("root")),P()}},[[28,1,2]]]);
//# sourceMappingURL=main.6207ccff.chunk.js.map