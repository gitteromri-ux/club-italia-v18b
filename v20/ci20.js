(function(){
  var nav=document.getElementById('nav');
  function onScroll(){nav.classList.toggle('solid',window.scrollY>40);}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  // mobile menu
  var burger=document.getElementById('burger'),drawer=document.getElementById('drawer');
  burger.addEventListener('click',function(){
    var open=burger.getAttribute('aria-expanded')==='true';
    burger.setAttribute('aria-expanded',String(!open));drawer.hidden=open;
    nav.classList.add('solid');
  });
  drawer.addEventListener('click',function(e){if(e.target.tagName==='A'){burger.setAttribute('aria-expanded','false');drawer.hidden=true;}});

  // course tabs
  var tabs=[].slice.call(document.querySelectorAll('.tab'));
  function select(t){
    tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;document.getElementById(x.getAttribute('aria-controls')).hidden=!on;});
    var p=document.getElementById(t.getAttribute('aria-controls'));p.scrollLeft=0;
  }
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){select(t);});
    t.addEventListener('keydown',function(e){
      if(e.key==='ArrowRight'||e.key==='ArrowLeft'){var n=tabs[(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length];n.focus();select(n);}
    });
  });

  // rail arrows (desktop)
  [].forEach.call(document.querySelectorAll('.rail-nav'),function(navEl){
    navEl.addEventListener('click',function(e){
      var b=e.target.closest('.rn');if(!b)return;
      var rails=navEl.previousElementSibling.querySelectorAll('.rail');
      var rail=[].filter.call(rails,function(r){return !r.hidden;})[0];if(!rail)return;
      var card=rail.firstElementChild;var step=card?card.getBoundingClientRect().width+16:rail.clientWidth*.8;
      rail.scrollBy({left:step*Number(b.dataset.dir),behavior:'smooth'});
    });
  });

  // lazy background / pillar videos
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vids=document.querySelectorAll('video[data-src]');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){
      var v=en.target;
      if(en.isIntersecting){
        if(!v.src&&!reduce){v.src=v.dataset.src;}
        if(v.src){var p=v.play();if(p&&p.catch)p.catch(function(){});}
      }else if(v.src){v.pause();}
    });},{rootMargin:'200px 0px'});
    [].forEach.call(vids,function(v){io.observe(v);});
  }

  // demo class with sound
  var demo=document.getElementById('demo'),play=document.getElementById('demoPlay');
  play.addEventListener('click',function(){demo.muted=false;demo.controls=true;demo.play();demo.parentNode.classList.add('on');});

  // Biagio voice lines
  var synth=window.speechSynthesis;
  [].forEach.call(document.querySelectorAll('.say'),function(b){
    b.addEventListener('click',function(){
      if(!synth)return;
      synth.cancel();
      var u=new SpeechSynthesisUtterance(b.dataset.it);u.lang='it-IT';u.rate=.92;
      var it=synth.getVoices().filter(function(v){return /^it/i.test(v.lang);})[0];if(it)u.voice=it;
      document.querySelectorAll('.say.speaking').forEach(function(x){x.classList.remove('speaking');});
      b.classList.add('speaking');u.onend=function(){b.classList.remove('speaking');};
      synth.speak(u);
    });
  });

  // annual plan centred on mobile
  var plans=document.getElementById('plans'),year=document.getElementById('planYear');
  function centreYear(){if(window.innerWidth<1100&&plans&&year){plans.scrollLeft=year.offsetLeft-(plans.clientWidth-year.offsetWidth)/2;}}
  window.addEventListener('load',centreYear);

  // form
  var form=document.getElementById('lead'),ok=document.getElementById('formOk');
  form.addEventListener('submit',function(e){
    e.preventDefault();var bad=null;
    [].forEach.call(form.querySelectorAll('[required]'),function(f){var v=f.checkValidity()&&f.value.trim();f.classList.toggle('err',!v);if(!v&&!bad)bad=f;});
    if(bad){bad.focus();return;}
    ok.hidden=false;form.querySelector('button[type=submit]').disabled=true;
  });

  // offer floater: after the hero, hidden over the form and footer
  var offer=document.getElementById('offer'),x=document.getElementById('offerX');
  var closed=false;try{closed=sessionStorage.getItem('ciOfferClosed')==='1';}catch(e){}
  if(!closed){offer.hidden=false;}
  var hero=document.querySelector('.hero'),enrol=document.getElementById('enrol'),foot=document.querySelector('.foot'),tuit=document.getElementById('tuition');
  function place(){
    if(offer.hidden)return;
    var pastHero=hero.getBoundingClientRect().bottom<window.innerHeight*.35;
    var vh=window.innerHeight;
    var er=enrol.getBoundingClientRect(),fr=foot.getBoundingClientRect();
    var tr=tuit.getBoundingClientRect();var overForm=er.top<vh&&er.bottom>0, overFoot=fr.top<vh, overPlans=tr.top<vh*.85&&tr.bottom>vh*.2;
    offer.classList.toggle('show',pastHero&&!overForm&&!overFoot&&!overPlans);
  }
  window.addEventListener('scroll',place,{passive:true});window.addEventListener('resize',place);place();
  x.addEventListener('click',function(){offer.hidden=true;try{sessionStorage.setItem('ciOfferClosed','1');}catch(e){}});
})();
