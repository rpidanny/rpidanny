(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{307:function(t,e,n){"use strict";n.r(e);var o=n(16),a=n(10),s=n(11),i=n(13),c=n(12),l=n(14),r=n(0),u=n.n(r),p=n(121),b=n(122),h=function(t){function e(t){var n;return Object(a.a)(this,e),(n=Object(i.a)(this,Object(c.a)(e).call(this,t))).state={books:t.books},n}return Object(l.a)(e,t),Object(s.a)(e,[{key:"componentWillReceiveProps",value:function(t){this.setState({books:t.books})}},{key:"render",value:function(){return this.state.books.length>0?u.a.createElement(p.a,{photos:this.state.books.map(function(t,e){return Object(o.a)({},t,{src:t.small_image_url.replace(/.(s\/)/g,function(t){var e=t.split("s/");return e[0]<58?e[0].concat("l/"):t}),width:98,height:148,alt:t.title,key:e})}),onClick:function(t,e){console.log(e),window.open(e.photo.link,"_blank")},direction:"column",margin:this.props.margin,columns:this.props.columns,ImageComponent:b.a}):u.a.createElement("div",null)}}]),e}(r.Component);e.default=h}}]);
//# sourceMappingURL=1.f53d0c69.chunk.js.map