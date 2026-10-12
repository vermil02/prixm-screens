/* 조합 1안 · 부품/요약표스크롤 — 손질/34_표스크롤/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12
   모든 자동화 · 모든 프로젝트 목록: 33 안 3(내리면 요약 칸이 작은 칸으로 접힘) + 34 안 3(표 카드 안만 스크롤 · 머리 고정 · 바깥 흰색) */

(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab33적용) return;
  var 붙듦=false, 꼴='', 접힘=false, 줄=null, 원높이=0, 서명='', 틀=null, 때=0;
  var 시간='.28s cubic-bezier(.2,.8,.2,1)';
  function 요약(){ return d.querySelector('.lab24요약, .lab32요약'); }
  function 칸들(s){ return [].slice.call(s.querySelectorAll(':scope > .칸')); }
  function 글(e){ var t=''; if(!e) return t; e.childNodes.forEach(function(n){ if(n.nodeType===3) t+=n.textContent; }); return t.trim(); }
  var 펼그림='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';

  /* 줄 안쪽 — 요약 칸을 읽어서 그림(수 · 켬 · 없음이 바뀌면 다시) */
  function 그림(s){
    var 칸=칸들(s), 겉=[];
    칸.forEach(function(c,i){
      var 윗=c.querySelector('.윗'), 아='';
      if(윗){ var a=윗.querySelector(':scope > svg, :scope > span.방식선, :scope > i'); if(a) 아=a.outerHTML; }
      var b=c.querySelector('b'), 수=글(b), 단=b&&b.querySelector('small')?b.querySelector('small').textContent:'';
      var 세='';
      if(꼴==='세부'){ c.querySelectorAll('.요칩').forEach(function(q){ var 점=q.querySelector('i'), 값=q.querySelector('.수'), 말=글(q)||q.textContent.replace(값?값.textContent:'','').trim();
        var 색=점?getComputedStyle(점):null, 점글=점?'<i class="'+(점.classList.contains('돎')?'돎':'')+'" style="background:'+색.backgroundColor+';box-shadow:'+(색.boxShadow==='none'?'none':색.boxShadow)+'"></i>':'';
        세+='<span>'+점글+말+' <b>'+(값?값.textContent:'')+'</b></span>'; });
        if(세) 세='<span class="세">'+세+'</span>'; }
      겉.push((i?'<span class="가"></span>':'')+'<button type="button" class="칩'+(c.classList.contains('켬')?' 켬':'')+(c.classList.contains('없음')?' 없음':'')+'" data-i="'+i+'" title="'+(윗?윗.textContent.trim():'')+'">'
        +'<span class="아">'+아+'</span><span class="이">'+(윗?윗.textContent.trim():'')+'</span><span class="수">'+수+(단?'<small>'+단+'</small>':'')+'</span>'+세+'</button>');
    });
    겉.push('<button type="button" class="펼" title="요약 펼치기" aria-label="요약 펼치기">'+펼그림+'</button>');
    return {html:겉.join(''), n:칸.length};
  }
  function 줄맞춤(s){
    if(!줄) return; var g=그림(s), 새=꼴+'|'+g.html; if(새===서명) return; 서명=새;
    var 판=줄.querySelector('.판'); 판.innerHTML=g.html;
  }
  function 줄만들기(s){
    if(줄&&줄.isConnected&&줄.previousElementSibling===s) return 줄;
    if(줄) 줄.remove();
    var cs=getComputedStyle(s);
    줄=d.createElement('div'); 줄.className='lab33-줄'; 줄.innerHTML='<div class="판"></div>';
    줄.style.padding='12px '+cs.paddingRight+' '+cs.paddingBottom+' '+cs.paddingLeft;
    줄.style.height='0px'; 줄.style.opacity='0'; 줄.style.paddingTop='0px'; 줄.style.paddingBottom='0px';
    줄.dataset.pt='12px'; 줄.dataset.pb=cs.paddingBottom;
    s.after(줄); 서명='';
    줄.addEventListener('click',function(e){
      var 펼=e.target.closest('.펼'); if(펼){ e.stopPropagation(); 붙듦=false; if(틀&&틀.scrollTop>2) 틀.scrollTo({top:0,behavior:'smooth'}); else { 펴기(false); 빈칸뗌(); } return; }
      var b=e.target.closest('.칩'); if(!b||b.classList.contains('없음')) return; e.stopPropagation(); 붙듦=true; 빈칸뗌();
      var c=칸들(요약())[+b.dataset.i]; if(c) c.click(); setTimeout(function(){ var s2=요약(); if(s2) 줄맞춤(s2); },60);
    });
    return 줄;
  }
  function 줄높이(){ return (꼴==='작은칸'?44:44)+12+(parseFloat(줄&&줄.dataset.pb)||0); }

  function 접기(바로){
    var s=요약(); if(!s||!꼴) return; 줄만들기(s); 줄맞춤(s);
    if(!s.dataset.lab33) 원높이=s.offsetHeight;
    s.dataset.lab33='1'; 접힘=true; h.classList.add('lab33-접힘');
    var 전=바로?'none':'height '+시간+',padding '+시간+',opacity .18s ease';
    s.style.transition='none'; s.style.overflow='hidden'; s.style.height=s.offsetHeight+'px'; s.offsetHeight;
    s.style.transition=전; s.style.height='0px'; s.style.setProperty('padding-top','0px','important'); s.style.setProperty('padding-bottom','0px','important'); s.style.opacity='0'; s.style.pointerEvents='none';
    줄.style.transition=바로?'none':'height '+시간+',padding '+시간+',opacity .22s ease .06s';
    줄.style.height=줄높이()+'px'; 줄.style.paddingTop=줄.dataset.pt; 줄.style.paddingBottom=줄.dataset.pb; 줄.style.opacity='1';
  }
  function 펴기(바로){
    var s=요약(); 접힘=false; h.classList.remove('lab33-접힘');
    if(줄){ 줄.style.transition=바로?'none':'height '+시간+',padding '+시간+',opacity .12s ease'; 줄.style.height='0px'; 줄.style.paddingTop='0px'; 줄.style.paddingBottom='0px'; 줄.style.opacity='0'; }
    if(!s||!s.dataset.lab33) return;
    s.style.transition=바로?'none':'height '+시간+',padding '+시간+',opacity .22s ease .06s';
    s.style.height=(원높이||s.scrollHeight)+'px'; s.style.removeProperty('padding-top'); s.style.removeProperty('padding-bottom'); s.style.opacity=''; s.style.pointerEvents='';
    var 끝=function(){ if(접힘) return; ['transition','overflow','height'].forEach(function(p){ s.style.removeProperty(p); }); delete s.dataset.lab33; };
    if(바로) 끝(); else setTimeout(끝,320);
  }

  /* 목록이 내려가면 접음 — 요약 아래에 있는 세로 스크롤 틀이면 무엇이든(리스트 · 보드 · 프로젝트 표) */
  function 아래틀(t){
    var s=요약(); if(!s||!t||t.nodeType!==1) return false;
    var a=(s.dataset.lab33&&줄?줄:s).getBoundingClientRect(), r=t.getBoundingClientRect();
    return r.top>=a.bottom-4 && r.left<a.right && r.right>a.left && t.scrollHeight>t.clientHeight+2;
  }
  var 빈=null;
  function 빈칸붙임(t,높이){ 빈칸뗌(); 빈=d.createElement('div'); 빈.className='lab33-빈'; 빈.setAttribute('aria-hidden','true'); 빈.style.cssText='height:'+높이+'px;flex:none;pointer-events:none;'; t.appendChild(빈); }
  function 빈칸뗌(){ if(빈){ 빈.remove(); 빈=null; } }
  d.addEventListener('scroll',function(e){
    if(!꼴) return; var t=e.target; if(!아래틀(t)) return; 틀=t;
    var y=t.scrollTop;
    if(붙듦&&y>24) 붙듦=false;   /* 다시 내리면 보통으로 */
    if(!접힘&&y>24){
      /* 접으면 틀이 그만큼 길어져 남는 스크롤이 줄어듦 — 목록이 짧으면 맨 위로 튕겨 다시 펴짐(프로젝트 3개 · 1440×760 실측 남는 76 < 줄어듦 100)
         → 줄어든 만큼 틀 끝에 빈 칸을 붙여 남는 스크롤을 그대로 둠 · 펼 때 뗌 */
      var s=요약(), 줄어듦=Math.max(0,(s?s.offsetHeight:0)-줄높이());
      /* 2026-10-12 빈 칸은 모자란 만큼만(사용자 「자동화 표 하단에 여백」 — 34 안 3 은 틀이 표 카드라 빈 칸이 마지막 줄 아래에 보였음) · 접은 뒤에도 26 넘게 남으면 0 */
      /* 2026-10-12 빈 칸 없앰(사용자 「프로젝트 리스트에서 하단에 남는 여백 없애 주고」 — 짧은 목록에서 66 이 남았음) → 접은 뒤 남는 스크롤이 모자라면
         빈 칸 대신 「붙듦」(거른 뒤와 같음 · 맨 위로 튕겨도 접힌 채 · 펴기 = 맨 위에서 휠 위로 · ⌄) */
      if(줄어듦+26>(t.scrollHeight-t.clientHeight)) 붙듦=true; 접기(false);
    } else if(접힘&&y<=2&&!붙듦){ 펴기(false); 빈칸뗌(); }
  },true);
  /* 거른 뒤(붙듦) 스크롤이 없거나 맨 위면 — 목록 위에서 휠을 위로 굴리면 폄 */
  d.addEventListener('wheel',function(e){
    if(!꼴||!접힘||!붙듦||e.deltaY>=0) return; var t=틀;
    if(t&&t.isConnected&&!t.contains(e.target)&&!(줄&&줄.contains(e.target))) return;
    if(!t||!t.isConnected||t.scrollTop<=2){ 붙듦=false; 펴기(false); 빈칸뗌(); }
  },{passive:true,capture:true});

  /* 요약이 다시 그려지면(거름 · 보기 바꿈) — 접힌 채면 새 요약도 바로 접고, 줄 수 · 켬을 맞춤 */
  setInterval(function(){
    if(!꼴) return; var s=요약(); if(!s) return;
    if(접힘){ if(!s.dataset.lab33||!줄||줄.previousElementSibling!==s) 접기(true); else 줄맞춤(s); }
    if(접힘&&틀&&!틀.isConnected){ 틀=null; 빈칸뗌(); if(!붙듦) 펴기(true); }   /* 거른 뒤 표가 다시 그려져도 접힌 채 */
  },300);

  w.__lab33적용=function(목록){
    var 새=(목록||[])[0]||'';
    [].slice.call(h.classList).forEach(function(c){ if(c.indexOf('lab33켬-')===0&&c!=='lab33켬-'+새) h.classList.remove(c); });
    if(새&&!h.classList.contains('lab33켬-'+새)) h.classList.add('lab33켬-'+새);
    꼴=새; 서명='';
    if(!꼴){ if(접힘) 펴기(true); 빈칸뗌(); if(줄){ 줄.remove(); 줄=null; } return; }
    if(접힘){ var s=요약(); if(s){ 줄만들기(s); 줄맞춤(s); 줄.style.transition='none'; 줄.style.height=줄높이()+'px'; } }
  };
})();

(function(){
  var w=window, h=document.documentElement; if(w.__lab34적용) return;
  w.__lab34적용=function(목록){
    if(w.__lab33적용) w.__lab33적용(["작은칸"]);   /* 전제 — 33 안 3 */
    var 새=(목록||[])[0]||'';
    [].slice.call(h.classList).forEach(function(c){ if(c.indexOf('lab34켬-')===0&&c!=='lab34켬-'+새) h.classList.remove(c); });
    if(새&&!h.classList.contains('lab34켬-'+새)) h.classList.add('lab34켬-'+새);
  };
  /* 안 2 — 머리가 붙어 있는 동안만 lab34-붙음(쉴 때 자리보다 아래로 밀렸으면 = 카드 위가 지나감) · 바뀔 때만 씀 */
  function 붙음봄(){ var d=document;
    [].slice.call(d.querySelectorAll('.lab24우표 > .머리, .pj-table thead')).forEach(function(m){
      var 카=m.closest('.lab24우표, section > div'); if(!카) return;
      var 보임=m.tagName==='THEAD'?[].slice.call(m.querySelectorAll('th')).filter(function(x){ return x.offsetHeight>0; }):[m], 칸=보임[0]; if(!칸) return;   /* 프로젝트는 th 가 붙고 thead 는 그대로 · 맨 앞 th 는 숨은 칸이라 보이는 첫 · 끝에 표시 */
      if(m.tagName==='THEAD'){ 보임.forEach(function(x,i){ var 첫=i===0, 끝=i===보임.length-1; if(첫!==x.classList.contains('lab34-첫')) x.classList.toggle('lab34-첫',첫); if(끝!==x.classList.contains('lab34-끝')) x.classList.toggle('lab34-끝',끝); }); }
      var 붙=h.classList.contains('lab34켬-붙박이')&&(칸.getBoundingClientRect().top-카.getBoundingClientRect().top>1.5);
      if(붙!==m.classList.contains('lab34-붙음')) m.classList.toggle('lab34-붙음',붙); }); }
  document.addEventListener('scroll',붙음봄,true); setInterval(붙음봄,500);
})();

/* 늘 켬 — 33 · 34 랩이 제 엔진을 얹은 문서(lab33-css · lab34-css)에선 안 켬(랩이 안을 고름) */
(function(){ var d=document; if(d.getElementById('lab33-css')||d.getElementById('lab34-css')) return; try{ window.__lab34적용(['표만']); }catch(e){} })();
