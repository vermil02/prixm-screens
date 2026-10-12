/* 조합 1안 · 부품/스크롤바호버 — 손 부품 · 2026-10-12 · 짝 스크롤바호버.css (설명은 그 파일 머리 · 끝)
   ① 스크롤 칸을 찾아 data-lab63(서서히 · 즉시 · 숨김) — 화면이 뜰 때 · 내용이 바뀐 뒤(0.3초에 한 번까지) · 마우스가 들어올 때 · 스크롤할 때
   ② 덮개 막대: 이미 이 방식인 네 칸을 뺀 스크롤 칸은 크롬 막대를 끄고(lab63-덮개) 내용 위에 뜬 막대를 그림
      — 그 칸(또는 그 막대)에 마우스가 있을 때 · 스크롤하는 동안(0.8초) · 끄는 동안 보임 · 막대를 끌면 스크롤 · 막대 위 휠은 그 칸으로
      — 막대 길 = 칸 안쪽(테 안) · 위아래 여백 = 칸의 제 길 여백(34 표 머리 아래 40)과 둥글기 + 2 중 큰 것(최소 4) · 위 칸들에 잘린 만큼 막대도 잘림 */
(function(){
  var d=document, w=window, h=d.documentElement; if(d.__lab63) return; d.__lab63=1; h.classList.add('lab63-바');
  var 제것=['lab-목록','lab25-대화칸','lab25-읽기','lab25-본문'];
  function 칸인가(e){ var s=getComputedStyle(e); return /auto|scroll|overlay/.test(s.overflowY+' '+s.overflowX)||e===h; }
  var 덮개들=[];
  function 표시(e){ if(!e||e.nodeType!==1||e.hasAttribute('data-lab63')) return;
    var s=getComputedStyle(e), b=getComputedStyle(e,'::-webkit-scrollbar');
    if(s.scrollbarWidth==='none'||b.display==='none'||b.width==='0px'){ e.setAttribute('data-lab63','숨김'); return; }   /* 일부러 숨긴 칸(표준 · 웹킷 둘 다) */
    var 움=s.transitionDuration.split(',').some(function(t){ return parseFloat(t)>0; });
    e.setAttribute('data-lab63', 움?'즉시':'서서히');
    if(e===h||e===d.body||제것.some(function(c){ return e.classList.contains(c); })) return;
    var t=getComputedStyle(e,'::-webkit-scrollbar-track'), r=parseFloat(s.borderTopRightRadius)||0;
    e.__lab63길=[Math.max(parseFloat(t.marginTop)||0, r?r+2:0, 4), Math.max(parseFloat(t.marginBottom)||0, r?r+2:0, 4)];
    e.classList.add('lab63-덮개'); 덮개들.push(e); }
  function 훑기(){ var a=d.querySelectorAll('*'); for(var i=0;i<a.length;i++){ var e=a[i]; if(e.hasAttribute('data-lab63')) continue; var s=getComputedStyle(e); if(/auto|scroll|overlay/.test(s.overflowY+' '+s.overflowX)) 표시(e); } }
  var 훑타=0; function 곧훑기(){ if(훑타) return; 훑타=setTimeout(function(){ 훑타=0; 훑기(); 그림(); },300); }   /* 늘 바뀌는 화면(프로젝트 목록 0.4초 다시 그림)에서도 0.3초에 한 번까지만 */

  /* ── 덮개 막대 ── */
  var 층=null, 마우스=null, 끄는=null;
  function 층얻기(){ if(층&&층.isConnected) return 층; if(!d.body) return null; 층=d.createElement('div'); 층.id='lab63-층'; d.body.appendChild(층); return 층; }
  function 막대(e,가로){ var k=가로?'__lab63가':'__lab63세'; if(e[k]&&e[k].isConnected) return e[k]; var 층=층얻기(); if(!층) return null;
    var m=d.createElement('div'); m.className='lab63-막대'+(가로?' 가로':''); m.__칸=e; m.__가로=가로; 층.appendChild(m); e[k]=m;
    m.addEventListener('pointerdown',끌기시작); m.addEventListener('wheel',function(ev){ ev.preventDefault(); e.scrollBy(ev.deltaX,ev.deltaY); },{passive:false});
    return m; }
  function 보이는틀(e){ var r=e.getBoundingClientRect(), v={l:r.left,t:r.top,r:r.right,b:r.bottom};
    for(var p=e.parentElement; p&&p!==h; p=p.parentElement){ var s=getComputedStyle(p); if(s.overflowX==='visible'&&s.overflowY==='visible') continue;
      var q=p.getBoundingClientRect(); v.l=Math.max(v.l,q.left); v.t=Math.max(v.t,q.top); v.r=Math.min(v.r,q.right); v.b=Math.min(v.b,q.bottom); }
    v.l=Math.max(v.l,0); v.t=Math.max(v.t,0); v.r=Math.min(v.r,innerWidth); v.b=Math.min(v.b,innerHeight); return v; }
  function 놓기(m,x,y,폭,높,v){ m.style.left=x+'px'; m.style.top=y+'px'; m.style[m.__가로?'width':'height']=(m.__가로?폭:높)+'px';
    var c=[Math.max(0,v.t-y),Math.max(0,x+폭-v.r),Math.max(0,y+높-v.b),Math.max(0,v.l-x)];
    m.style.clipPath=(c[0]||c[1]||c[2]||c[3])?'inset('+c.map(function(n){ return n+'px'; }).join(' ')+')':''; }
  function 칸그림(e){ var 켜짐=e.isConnected&&e.offsetParent!==null&&(e.contains(마우스)||(마우스&&마우스.__칸===e)||e.classList.contains('lab63-구름')||(끄는&&끄는.__칸===e));
    var r=e.getBoundingClientRect(), s=getComputedStyle(e), bt=parseFloat(s.borderTopWidth), bl=parseFloat(s.borderLeftWidth),
        안폭=e.clientWidth, 안높=e.clientHeight, v=보이는틀(e), 길=e.__lab63길||[4,4];
    var 세로=/auto|scroll|overlay/.test(s.overflowY)&&e.scrollHeight>안높+1, 가로=/auto|scroll|overlay/.test(s.overflowX)&&e.scrollWidth>안폭+1;
    [[false,세로],[true,가로]].forEach(function(z){ var m=(z[1]||e[z[0]?'__lab63가':'__lab63세'])?막대(e,z[0]):null; if(!m) return;
      var 보=켜짐&&z[1]&&v.r>v.l&&v.b>v.t; m.classList.toggle('보임',보); m.classList.toggle('끄는',끄는===m); if(!z[1]) return;
      if(!z[0]){ var 길이=안높-길[0]-길[1], 손=Math.max(24,길이*안높/e.scrollHeight), 위=길[0]+(길이-손)*(e.scrollTop/Math.max(1,e.scrollHeight-안높));
        m.__비=(e.scrollHeight-안높)/Math.max(1,길이-손); 놓기(m, r.left+bl+안폭-5, r.top+bt+위, 5, 손, v); }
      else { var 길이2=안폭-8, 손2=Math.max(24,길이2*안폭/e.scrollWidth), 왼=4+(길이2-손2)*(e.scrollLeft/Math.max(1,e.scrollWidth-안폭));
        m.__비=(e.scrollWidth-안폭)/Math.max(1,길이2-손2); 놓기(m, r.left+bl+왼, r.top+bt+안높-5, 손2, 5, v); } }); }
  var 그림예약=0; function 그림(){ if(그림예약) return; 그림예약=requestAnimationFrame(function(){ 그림예약=0;
    덮개들=덮개들.filter(function(e){ if(e.isConnected) return true; [e.__lab63세,e.__lab63가].forEach(function(m){ m&&m.remove(); }); return false; });
    덮개들.forEach(칸그림); }); }
  function 끌기시작(ev){ var m=ev.currentTarget, e=m.__칸; ev.preventDefault(); ev.stopPropagation(); 끄는=m; m.setPointerCapture(ev.pointerId);
    var 처음=m.__가로?ev.clientX:ev.clientY, 앞=m.__가로?e.scrollLeft:e.scrollTop;
    function 움직(ev2){ var n=(m.__가로?ev2.clientX:ev2.clientY)-처음; if(m.__가로) e.scrollLeft=앞+n*m.__비; else e.scrollTop=앞+n*m.__비; }
    function 끝(){ 끄는=null; m.removeEventListener('pointermove',움직); m.removeEventListener('pointerup',끝); m.removeEventListener('pointercancel',끝); 그림(); }
    m.addEventListener('pointermove',움직); m.addEventListener('pointerup',끝); m.addEventListener('pointercancel',끝); 그림(); }

  d.addEventListener('pointerover',function(ev){ 마우스=ev.target; for(var e=ev.target; e&&e.nodeType===1; e=e.parentElement){ if(!e.hasAttribute('data-lab63')&&칸인가(e)) 표시(e); } 그림(); },true);
  d.addEventListener('pointerleave',function(){ 마우스=null; 그림(); });
  h.addEventListener('mouseleave',function(){ 마우스=null; 그림(); });
  d.addEventListener('scroll',function(ev){ var e=ev.target===d?h:ev.target; if(!e||e.nodeType!==1) return; 표시(e); e.classList.add('lab63-구름');
    clearTimeout(e.__lab63타); e.__lab63타=setTimeout(function(){ e.classList.remove('lab63-구름'); 그림(); },800); 그림(); },true);
  w.addEventListener('resize',그림);
  if(d.readyState==='loading') d.addEventListener('DOMContentLoaded',function(){ 훑기(); 그림(); }); else { 훑기(); 그림(); }
  new MutationObserver(function(l){ for(var i=0;i<l.length;i++){ if(!층||l[i].target!==층) { 곧훑기(); return; } } }).observe(d.documentElement,{childList:true,subtree:true});
})();
