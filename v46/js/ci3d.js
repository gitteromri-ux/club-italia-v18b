(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var root=document.documentElement, fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  var CARD='.cls-card,.cls-course,.hiw3-card,.s5-card,.etg3-card,.fac-card,.unit-card,.pillar-card,.price-card,.pillar,.lm-card,.sib-card,.ci-lesson,.teacher-photo,.lg-form';
  var cards=[].slice.call(document.querySelectorAll(CARD)), seen=new Set();
  cards.forEach(function(c){c.classList.add('ci-card');c._z=0;if(fine){var s=document.createElement('i');s.className='ci-spec';s.setAttribute('aria-hidden','true');c.appendChild(s)}});
  [].slice.call(document.querySelectorAll('body>section')).forEach(function(s){
    if(s.classList.contains('ci-hero')||s.classList.contains('course-hero')||s.id==='mapstr') return;
    var l=document.createElement('span');l.className='ci-light';l.setAttribute('aria-hidden','true');
    var bg=getComputedStyle(s).backgroundColor.match(/\d+/g)||[0,0,0];
    if((+bg[0]+ +bg[1]+ +bg[2])>450) l.classList.add('lt');
    s.insertBefore(l,s.firstChild);
  });
  var planes=[];
  function plane(sel,d,cls){[].slice.call(document.querySelectorAll(sel)).forEach(function(e){e._d=d;if(cls)e.classList.add(cls);planes.push(e)})}
  plane('.ci-hero .hero-bg video,.course-hero .hero-media video,.region-band>video',-0.16,'ci-plane-bg');
  plane('.ci-hero .ci-hero-copy',0.05,'ci-plane');
  plane('.ci-hero .ci-reel',0.12);
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)seen.add(e.target);else{seen.delete(e.target);setZ(e.target,0)}})},{rootMargin:'60px'});
    cards.forEach(function(c){io.observe(c)});
  } else cards.forEach(function(c){seen.add(c)});
  function setZ(e,z){if(e._z===z)return;e._z=z;e.classList.toggle('z1',z===1);e.classList.toggle('z2',z===2)}
  var tick=false,lastSp=-1;
  function frame(){
    tick=false;var vh=innerHeight, sy=scrollY, max=Math.max(1,root.scrollHeight-vh), sp=Math.round(sy/max*200)/200;
    if(sp!==lastSp){lastSp=sp;root.style.setProperty('--sp',sp)}
    planes.forEach(function(e){var p=e.parentElement.getBoundingClientRect();if(p.bottom<-100||p.top>vh+100)return;e.style.setProperty('--py',Math.round((p.top+p.height/2-vh/2)*e._d)+'px')});
    seen.forEach(function(e){var r=e.getBoundingClientRect(),c=Math.abs((r.top+r.height/2-vh/2)/vh);setZ(e,c<.22?2:(c<.42?1:0))});
  }
  function req(){if(!tick){tick=true;requestAnimationFrame(frame)}}
  addEventListener('scroll',req,{passive:true});addEventListener('resize',req,{passive:true});
  if(fine){cards.forEach(function(c){
    c.addEventListener('pointermove',function(ev){var r=c.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width,y=(ev.clientY-r.top)/r.height;
      c.classList.add('tilt');c.style.setProperty('--ry',((x-.5)*7).toFixed(2)+'deg');c.style.setProperty('--rx',((.5-y)*6).toFixed(2)+'deg');c.style.setProperty('--lx',(x*100).toFixed(0)+'%');c.style.setProperty('--ly',(y*100).toFixed(0)+'%')});
    c.addEventListener('pointerleave',function(){c.classList.remove('tilt')});
  })}
  addEventListener('load',req);setTimeout(req,400);req();
})();
