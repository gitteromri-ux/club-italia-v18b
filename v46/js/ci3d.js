(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var root=document.documentElement, fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  var CARD='.cls-card,.cls-course,.hiw3-card,.s5-card,.etg3-card,.fac-card,.unit-card,.pillar-card,.price-card,.pillar,.lm-card,.sib-card,.ci-lesson,.teacher-photo,.lg-form';
  var cards=[].slice.call(document.querySelectorAll(CARD)), seen=new Set();
  cards.forEach(function(c){c.classList.add('ci-card');var s=document.createElement('i');s.className='ci-spec';s.setAttribute('aria-hidden','true');c.appendChild(s)});
  [].slice.call(document.querySelectorAll('body>section')).forEach(function(s){
    if(s.classList.contains('ci-hero')||s.classList.contains('course-hero')||s.id==='mapstr') return;
    var l=document.createElement('span');l.className='ci-light';l.setAttribute('aria-hidden','true');
    var bg=getComputedStyle(s).backgroundColor.match(/\d+/g)||[0,0,0];
    if((+bg[0]+ +bg[1]+ +bg[2])>450) l.classList.add('lt');
    s.insertBefore(l,s.firstChild);
  });
  var planes=[];
  function plane(sel,d,cls){[].slice.call(document.querySelectorAll(sel)).forEach(function(e){e.dataset.depth=d;e.classList.add(cls||'ci-plane');planes.push(e)})}
  plane('.ci-hero .hero-bg video,.course-hero .hero-media video,.region-band>video',-0.16,'ci-plane-bg');
  plane('.ci-hero .ci-hero-copy',0.05);
  planes.push.apply(planes,[].slice.call(document.querySelectorAll('.ci-hero .ci-reel')).map(function(e){e.dataset.depth=0.12;return e}));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?seen.add(e.target):seen.delete(e.target)})},{rootMargin:'120px'});
    cards.forEach(function(c){io.observe(c)});
  } else cards.forEach(function(c){seen.add(c)});
  var tick=false;
  function frame(){
    tick=false;var vh=innerHeight, sy=scrollY, max=Math.max(1,root.scrollHeight-vh);
    root.style.setProperty('--sp',(sy/max).toFixed(4));
    planes.forEach(function(e){var p=e.parentElement.getBoundingClientRect();if(p.bottom<-100||p.top>vh+100)return;var c=p.top+p.height/2-vh/2;e.style.setProperty('--py',(c*parseFloat(e.dataset.depth)).toFixed(1)+'px')});
    seen.forEach(function(e){var r=e.getBoundingClientRect();var c=Math.abs((r.top+r.height/2-vh/2)/vh);var z=Math.max(0,Math.min(1,1.15-c*2));
      e.style.setProperty('--z',z.toFixed(3));
      if(!e._hover){e.style.setProperty('--lx','50%');e.style.setProperty('--ly',(100-((r.top+r.height/2)/vh*100)).toFixed(1)+'%')}});
  }
  function req(){if(!tick){tick=true;requestAnimationFrame(frame)}}
  addEventListener('scroll',req,{passive:true});addEventListener('resize',req,{passive:true});
  document.addEventListener('scroll',req,{passive:true,capture:true});
  if(fine){cards.forEach(function(c){
    c.addEventListener('pointermove',function(ev){var r=c.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width,y=(ev.clientY-r.top)/r.height;c._hover=true;
      c.style.setProperty('--ry',((x-.5)*7).toFixed(2)+'deg');c.style.setProperty('--rx',((.5-y)*6).toFixed(2)+'deg');c.style.setProperty('--lx',(x*100).toFixed(1)+'%');c.style.setProperty('--ly',(y*100).toFixed(1)+'%');c.style.setProperty('--z','1')});
    c.addEventListener('pointerleave',function(){c._hover=false;c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg');req()});
  })}
  setInterval(req,600);req();
})();
