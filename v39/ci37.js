(()=>{const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,MOB=matchMedia('(max-width:900px)').matches,G=window.gsap,ST=window.ScrollTrigger;
const hdr=$('.hdr');const sc=()=>hdr&&hdr.classList.toggle('solid',scrollY>40);addEventListener('scroll',sc,{passive:true});sc();
const bg=$('.burger'),nav=$('.nav');if(bg)bg.onclick=()=>{const o=nav.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
// lazy videos
const vo=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){if(!v.getAttribute('src')&&v.dataset.src){v.src=v.dataset.src}v.muted=true;v.play().catch(()=>{})}else if(v.getAttribute('src'))v.pause()}),{rootMargin:'300px'});
$$('video[data-src]').forEach(v=>vo.observe(v));
if(MOB)$$('.rv').forEach(x=>x.classList.add('in'));
// curtain transitions
const cu=$('.curtain');
if(cu&&G&&!RM){G.to(cu,{scaleY:0,duration:.9,ease:'expo.inOut',delay:.15,transformOrigin:'top'});
$$('a[href]').forEach(a=>{const h=a.getAttribute('href');if(!h||h.startsWith('#')||h.startsWith('mailto')||a.target||/^https?:/.test(h))return;a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey)return;e.preventDefault();G.fromTo(cu,{scaleY:0,transformOrigin:'bottom'},{scaleY:1,duration:.6,ease:'expo.in',onComplete:()=>location.href=h})})});
addEventListener('pageshow',e=>{if(e.persisted)G.set(cu,{scaleY:0})})}else if(cu)cu.style.display='none';
// cursor + magnetic
if(!MOB&&!RM&&matchMedia('(hover:hover)').matches){const d=document.createElement('div'),r=document.createElement('div');d.className='cur';r.className='cur-r';document.body.append(d,r);
let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;d.style.transform=`translate(${x-4}px,${y-4}px)`});
(function lp(){rx+=(x-rx)*.16;ry+=(y-ry)*.16;r.style.transform=`translate(${rx-r.offsetWidth/2}px,${ry-r.offsetHeight/2}px)`;requestAnimationFrame(lp)})();
d.style.left=r.style.left='0';
$$('[data-cursor]').forEach(el=>{el.addEventListener('mouseenter',()=>{r.classList.add('big');r.textContent=el.dataset.cursor});el.addEventListener('mouseleave',()=>{r.classList.remove('big');r.textContent=''})});
$$('.btn,.mag').forEach(el=>{el.addEventListener('pointermove',e=>{const b=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-b.left-b.width/2)*.25}px,${(e.clientY-b.top-b.height/2)*.35}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')})}
// hover video previews
$$('.rc').forEach(c=>{const v=c.querySelector('video');if(!v)return;c.addEventListener('mouseenter',()=>{if(!v.getAttribute('src'))v.src=v.dataset.src;v.play().then(()=>c.classList.add('play')).catch(()=>{})});c.addEventListener('mouseleave',()=>{c.classList.remove('play');v.pause()})});
// sound toggles
$$('[data-snd]').forEach(b=>b.onclick=()=>{const v=b.parentElement.querySelector('video');if(!v.getAttribute('src'))v.src=v.dataset.src;v.muted=!v.muted;v.play();b.textContent=v.muted?'🔈 Sound on':'🔇 Mute'});
// music
const m=$('#music'),t=$('#theme');if(m)m.onclick=()=>{if(t.paused){t.volume=.4;t.play();m.textContent='♪ Music on'}else{t.pause();m.textContent='♪ Music off'}};
// Biagio voices + waveform
let ac,an,cur=null;const bars=$$('.wave i');
function viz(){if(!an)return;const a=new Uint8Array(an.frequencyBinCount);an.getByteFrequencyData(a);bars.forEach((b,i)=>b.style.height=(12+a[(i*3)%a.length]/255*88)+'%');if(cur)requestAnimationFrame(viz);else bars.forEach(b=>b.style.height='12%')}
$$('.voice').forEach(btn=>btn.onclick=()=>{if(cur){cur.a.pause();cur.b.classList.remove('playing');cur.b.querySelector('.pl').textContent='▶';const same=cur.b===btn;cur=null;if(same)return}
const a=new Audio(btn.dataset.audio);a.crossOrigin='anonymous';try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();const s=ac.createMediaElementSource(a);an=ac.createAnalyser();an.fftSize=64;s.connect(an);an.connect(ac.destination);ac.resume()}catch(e){}
a.play();btn.classList.add('playing');btn.querySelector('.pl').textContent='❚❚';cur={a,b:btn};const cap=$('#bcap');if(cap)cap.innerHTML=btn.dataset.line;viz();a.onended=()=>{btn.classList.remove('playing');btn.querySelector('.pl').textContent='▶';cur=null}});
// counters
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,to=+el.dataset.count,fmt=n=>n.toLocaleString('en-US');co.unobserve(el);if(RM){el.textContent=fmt(to);return}let s=null;const st=ts=>{s=s||ts;const p=Math.min(1,(ts-s)/1600);el.textContent=fmt(Math.round(to*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(st)};requestAnimationFrame(st)}),{threshold:.5});$$('[data-count]').forEach(x=>co.observe(x));
// FAQ / syllabus single-open
$$('[data-acc]').forEach(g=>g.addEventListener('toggle',e=>{if(e.target.open)$$('details',g).forEach(d=>d!==e.target&&(d.open=false))},true));
// level finder
const qz=$('#qz');if(qz){const R={0:['CI Principiante','pages/courses/ci1.html','A0 to A1.1'],1:['CI Elementare','pages/courses/ci2.html','A1.1 to A1.2'],2:['CI Intermedio','pages/courses/ci3.html','A1.2 to A2.1'],3:['CI Avanzato','pages/courses/ci4.html','A2.1 to A2.2']},S={0:['Al Caffè','pages/spoken/ps1.html'],1:['A Tavola','pages/spoken/ps2.html'],2:['In Viaggio','pages/spoken/ps3.html'],3:['Chiacchierando','pages/spoken/ps4.html']};
qz.onchange=()=>{const d=new FormData(qz),lv=d.get('lv'),g=d.get('g');if(lv==null||!g)return;let h;if(g=='s')h=`Recommended: <b>${S[lv][0]}</b>, our spoken track. <a class="lnk" href="${S[lv][1]}">View course</a>`;else if(g=='c')h=`Recommended: a <b>cultural capsule</b> alongside <b>${R[lv][0]}</b>. <a class="lnk" href="capsules.html">See capsules</a>`;else if(g=='x')h=`Recommended: <b>${R[lv][0]}</b> (${R[lv][2]}), then on to B1 with CILS or CELI preparation. <a class="lnk" href="certifications.html">Certification path</a>`;else h=`Recommended: <b>${R[lv][0]}</b> (${R[lv][2]}). <a class="lnk" href="${R[lv][1]}">View course</a>`;if(d.get('p')=='2')h+=' Twice a week completes twenty lessons in ten weeks.';const r=$('#res');r.innerHTML=h;r.classList.add('on')}}
const lead=$('#lead');if(lead)lead.onsubmit=e=>{e.preventDefault();lead.innerHTML='<h4>Grazie.</h4><p style="grid-column:1/-1;color:#cfc8b8">Your request is on its way. A Club Italia advisor will reply within one working day.</p>'};
// MAP
const map=$('#italy');if(map){const C=JSON.parse($('#citydata').textContent);const panel=$('#mpanel');let idx=0,timer;
function show(k,user){const c=C.find(x=>x.k==k);if(!c)return;idx=C.indexOf(c);$$('.node',map).forEach(n=>n.classList.toggle('on',n.dataset.k==k));$$('.mtabs button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.k==k));
const v=$('video',panel);if(v.dataset.cur!==c.v){v.dataset.cur=c.v;if(G&&!RM)G.fromTo(v,{opacity:0},{opacity:1,duration:.7});v.poster=c.p;v.src=c.v;v.play().catch(()=>{})}
$('.city',panel).textContent=c.n;$('.tp img',panel).src=c.ti;$('.tp img',panel).alt=c.t;$('#mt').textContent=c.t;$('#mq').textContent=c.q;$('#mc').textContent=c.c;$('#ml').textContent=c.l;
$('ol',panel).innerHTML=c.u.map((u,i)=>`<li><b>${String(u[0]).padStart(2,'0')}</b><span><i>${u[1]}</i>. ${u[2]}</span></li>`).join('');$('.go',panel).href=c.h;if(user)clearInterval(timer)}
$$('.node',map).forEach(n=>{['mouseenter','click','focus'].forEach(ev=>n.addEventListener(ev,()=>show(n.dataset.k,true)));n.addEventListener('keydown',e=>{if(e.key=='ArrowRight'||e.key=='ArrowDown'){e.preventDefault();const nx=C[(idx+1)%C.length];show(nx.k,true);$(`.node[data-k=${nx.k}]`,map).focus()}if(e.key=='ArrowLeft'||e.key=='ArrowUp'){e.preventDefault();const nx=C[(idx+C.length-1)%C.length];show(nx.k,true);$(`.node[data-k=${nx.k}]`,map).focus()}})});
$$('.mtabs button').forEach(b=>b.onclick=()=>show(b.dataset.k,true));
show(C[0].k);
const mio=new IntersectionObserver(es=>es.forEach(e=>{clearInterval(timer);if(e.isIntersecting&&!RM)timer=setInterval(()=>show(C[(idx+1)%C.length].k),5200)}),{threshold:.3});mio.observe(map);
// comet along route
const rt=$('.route',map),cm=$('.comet',map);if(rt&&cm&&!RM){const L=rt.getTotalLength();let s=0;(function lp(){s=(s+1.4)%L;const p=rt.getPointAtLength(s);cm.setAttribute('cx',p.x);cm.setAttribute('cy',p.y);requestAnimationFrame(lp)})()}}
// ===== GSAP layer
if(!G||!ST||RM){$$('.rv').forEach(x=>x.classList.add('in'));$$('.mani .wd').forEach(w=>w.style.opacity=1);$$('.rg').forEach(r=>r.classList.add('on'));return}
G.registerPlugin(ST);
let lenis;if(false){lenis=new Lenis({lerp:.1,smoothWheel:true});lenis.on('scroll',ST.update);G.ticker.add(t=>lenis.raf(t*1000));G.ticker.lagSmoothing(0);
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const tg=$(a.getAttribute('href'));if(tg){e.preventDefault();lenis.scrollTo(tg,{offset:-60})}}))}
// reveals
$$('.rv').forEach(el=>G.fromTo(el,{y:40,opacity:0},{y:0,opacity:1,duration:1.1,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 88%'}}));
// split headings
if(!MOB)$$('h2[data-split],h1[data-split]').forEach(h=>{const walk=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType==3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w)){f.append(w);return}const o=document.createElement('span');o.className='sl';o.style.display='inline-block';const i=document.createElement('span');i.textContent=w;o.append(i);f.append(o)});c.replaceWith(f)}else if(c.nodeType==1&&!c.classList.contains('sl'))walk(c)})};walk(h);
G.from($$('.sl>span',h),{yPercent:115,rotate:3,duration:1.2,ease:'expo.out',stagger:.045,delay:h.tagName=='H1'?.6:0,scrollTrigger:h.tagName=='H1'?null:{trigger:h,start:'top 85%'}})});
// hero cinematic
const hero=$('.h18');if(hero&&false){const tl=G.timeline({scrollTrigger:{trigger:hero,start:'top top',end:'+=90%',scrub:.6,pin:true}});
tl.to('.h18 .vwrap',{clipPath:'inset(7% 6% 7% 6% round 28px)',scale:.92,ease:'none'},0).to('.h18 video',{scale:1.18,ease:'none'},0).to('.h18 .copy',{yPercent:-30,opacity:0,ease:'none'},0).to('.h18 .meta',{opacity:0,ease:'none'},0).fromTo('.h18 .after',{opacity:0,y:60},{opacity:1,y:0,ease:'none'},.35);
G.from('.h18 .lede,.h18 .ctas,.h18 .hero-badges,.h18 .meta',{y:30,opacity:0,duration:1.2,ease:'expo.out',stagger:.12,delay:1})}
// manifesto words
const mw=$$('.mani .wd');if(mw.length)G.to(mw,{opacity:1,stagger:.05,ease:'none',scrollTrigger:{trigger:'.mani',start:'top 70%',end:'bottom 60%',scrub:true}});
// pinned rail
const track=$('.track');if(track&&false){const dist=()=>track.scrollWidth-innerWidth;G.to(track,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:'.rail',start:'top top',end:()=>'+='+dist(),pin:true,scrub:.8,invalidateOnRefresh:true,onUpdate:s=>{const p=$('.prog i');if(p)p.style.width=(s.progress*100)+'%'}}})}
// map draw
const land=$$('#italy .land');land.forEach(p=>{const l=p.getTotalLength();p.style.strokeDasharray=l;p.style.strokeDashoffset=l});if(land.length){G.to(land,{strokeDashoffset:0,duration:2.6,ease:'power2.inOut',scrollTrigger:{trigger:'#italy',start:'top 75%'}});G.from('#italy .node',{scale:0,transformOrigin:'center',stagger:.12,duration:.8,ease:'back.out(2)',scrollTrigger:{trigger:'#italy',start:'top 60%'}})}
// ladder scrub
const lad=$('.lad18');if(lad){const rgs=$$('.rg',lad),D=JSON.parse($('#laddata').textContent);let last=-1;
const set=i=>{if(i===last)return;last=i;rgs.forEach((r,j)=>r.classList.toggle('on',j<=i));const d=D[i];$('#lvk').textContent=d.k;$('#lvh').innerHTML=d.h;$('#lvu').innerHTML=d.u.map(x=>`<li>${x}</li>`).join('');$('#lvr').textContent=d.r;G.fromTo('.cando',{opacity:.3,y:10},{opacity:1,y:0,duration:.4})};
G.set(rgs,{scaleY:0});
G.timeline({scrollTrigger:{trigger:lad,start:'top 75%',pin:false,scrub:.5,end:'bottom 40%',onUpdate:s=>set(Math.min(5,Math.floor(s.progress*6)))}}).to(rgs,{scaleY:1,stagger:.18,ease:'none'});set(0)}
// parallax media
if(false)$$('[data-par]').forEach(el=>G.fromTo(el,{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:true}}));
addEventListener('load',()=>ST.refresh());
})();
