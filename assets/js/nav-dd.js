/* Mobile drawer dropdown groups (Product, About) */
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.md-toggle');if(!b)return;var g=b.parentNode,o=g.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
(function(){
  var wrap=document.getElementById('navWrap')||document.getElementById('nav-wrap'); if(!wrap) return;
  var items=[].slice.call(wrap.querySelectorAll('.nav-dd')); if(!items.length) return;
  var bd=document.createElement('div'); bd.className='nav-backdrop'; document.body.appendChild(bd);
  var t;
  function closeAll(except){items.forEach(function(it){if(it!==except){it.classList.remove('is-open');it.querySelector('.nav-dd-btn').setAttribute('aria-expanded','false');}});}
  function open(it){clearTimeout(t);closeAll(it);it.classList.add('is-open');wrap.classList.add('dd-open');bd.classList.add('on');it.querySelector('.nav-dd-btn').setAttribute('aria-expanded','true');}
  function close(){clearTimeout(t);closeAll();wrap.classList.remove('dd-open');bd.classList.remove('on');}
  items.forEach(function(it){
    var btn=it.querySelector('.nav-dd-btn');
    var hov=function(){return window.matchMedia('(hover:hover)').matches;};
    btn.addEventListener('click',function(e){e.stopPropagation();if(it.classList.contains('is-open')){if(!hov())close();}else open(it);});
    it.addEventListener('mouseenter',function(){if(hov())open(it);});
    it.addEventListener('mouseleave',function(){if(hov()){clearTimeout(t);t=setTimeout(close,220);}});
  });
  bd.addEventListener('click',close);
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&wrap.classList.contains('dd-open')){var o=wrap.querySelector('.nav-dd.is-open .nav-dd-btn');close();if(o)o.focus();}});
  document.addEventListener('click',function(e){if(!wrap.contains(e.target))close();});
})();
