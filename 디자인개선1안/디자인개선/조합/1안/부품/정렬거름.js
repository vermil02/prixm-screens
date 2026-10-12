/* 조합 1안 · 부품/정렬거름 — 손질/65_정렬거름화살/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12 · 65 랩 안 11
   프로젝트 도구 줄: 거름 셋 왼쪽 아이콘(상태 · 역할 · 태그) · ⌄ 없음 · 역할 = 모든 역할 / 내가 담당자인 / 내가 만든 / 내가 포함된(member) · 「태그로 묶기」 앞 묶음 틀 아이콘
   · 정렬 = 처음 「⇅ 정렬」 → 한 번 고르면 「⇅ 이름 ↑↓」 · 메뉴 = 자동화처럼 켜진 항목 ↓/↑ · 같은 항목 다시 = 뒤집기(목록 · 카드 거꾸로) · 고른 뒤 메뉴 열어 둠 · 정렬 왼쪽 세로선 뺌
   자동화①: 정렬 단추 글만 같은 규칙(처음 「정렬」 → 한 번 고르면 「최근 실행순 ↑」 등). */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab65적용) return;
  w.__lab65적용=function(목록){ 목록=목록||[];
    [].slice.call(h.classList).forEach(function(c){ if(c.indexOf('lab65켬-')===0&&목록.indexOf(c.slice(8))<0) h.classList.remove(c); });
    목록.forEach(function(i){ h.classList.add('lab65켬-'+i); });
    맞춤(); 역할(); 묶기(); 뒤집기(); 자동화(); };
  /* 정렬만 — 「정렬」 글을 select 바로 뒤에 두고 select 자리에 맞춰 얹음 · 목록이 다시 그려져도(Vue) 0.3초마다 다시 맞춤 · 꺼지면 select 폭 · 글 되돌림 */
  function 맞춤(){
    var s=d.querySelector('.pj-tools .pj-pill.lab32정렬'); if(!s) return;
    var 켬=h.classList.contains('lab65켬-정렬만'), 글=s.nextElementSibling&&s.nextElementSibling.classList.contains('lab65정렬글')?s.nextElementSibling:null;
    if(!켬){ if(s.__lab65폭){ s.style.removeProperty('width'); s.__lab65폭=0; } return; }
    if(!글){ 글=d.createElement('span'); 글.className='lab65정렬글'; s.insertAdjacentElement('afterend',글); }
    var 쓸=h.classList.contains('lab65켬-정렬방향')&&(h.classList.contains('lab65켬-만지면값')?방향.만짐:!(s.value==='activity'&&!방향.뒤))?(s.options[s.selectedIndex]||{}).text+화살(!방향.뒤):'정렬';
    if(글.__쓸!==쓸){ 글.innerHTML=쓸; 글.__쓸=쓸; }
    var 부=s.offsetParent; if(부&&부!==글.offsetParent){}
    var 폭=27+Math.ceil(글.getBoundingClientRect().width)+8; if(s.__lab65폭!==폭){ s.style.setProperty('width',폭+'px','important'); s.__lab65폭=폭; }
    글.style.left=(s.offsetLeft+27)+'px'; 글.style.top=s.offsetTop+'px';
    if(getComputedStyle(s.parentElement).position==='static') s.parentElement.style.position='relative';
  }
  /* 역할셋 — 역할 select 의 글을 바꾸고 member 칸을 더함(앱이 다시 그려 글이 되돌아오면 0.3초마다 다시) · 꺼지면 앱 글로 되돌림 · 우리 메뉴(저장본프로젝트필터)는 열 때 option 을 읽음 */
  var 역할글={pm:['내가 PM','내가 담당자인'],owner:['내가 만든 것','내가 만든']};   /* 2026-10-12 사용자 「내가 담당자인 으로」 */
  function 역할(){ var s=[].filter.call(d.querySelectorAll('.pj-tools select'),function(x){ return !!x.querySelector('option[value=pm]'); })[0]; if(!s) return;
    var 켬=h.classList.contains('lab65켬-역할셋'), m=s.querySelector('option[value=member]');
    Object.keys(역할글).forEach(function(v){ var o=s.querySelector('option[value='+v+']'), t=역할글[v][켬?1:0]; if(o&&o.text!==t) o.text=t; });
    if(켬&&!m){ m=d.createElement('option'); m.value='member'; m.text='내가 포함된'; s.appendChild(m); }
    if(!켬&&m){ if(s.value==='member'){ s.value='all'; s.dispatchEvent(new Event('change',{bubbles:true})); } m.remove(); } }
  /* 묶기아이콘 — 「태그로 묶기」 단추 맨 앞에 내보내기와 같은 꼴 svg(앱이 다시 그려 빠지면 0.3초마다 다시) · 꺼지거나 꼴이 바뀌면 뺌 */
  var 묶기그림={묶기묶음:'<path d="M3 7V5c0-1.1.9-2 2-2h2"/><path d="M17 3h2c1.1 0 2 .9 2 2v2"/><path d="M21 17v2c0 1.1-.9 2-2 2h-2"/><path d="M7 21H5c-1.1 0-2-.9-2-2v-2"/><rect width="7" height="5" x="7" y="7" rx="1"/><rect width="7" height="5" x="10" y="12" rx="1"/>',
    묶기태그:'<path d="M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z"/><path d="M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193"/><circle cx="10.5" cy="6.5" r=".5" fill="currentColor"/>'};
  function 묶기(){ var b=[].filter.call(d.querySelectorAll('.pj-tools button'),function(x){ return /태그로 묶기/.test(x.textContent); })[0]; if(!b) return;
    var 꼴=Object.keys(묶기그림).filter(function(k){ return h.classList.contains('lab65켬-'+k); })[0]||'', 있=b.querySelector(':scope > svg.lab65묶기');
    if(있&&있.getAttribute('data-꼴')!==꼴){ 있.remove(); 있=null; }
    if(꼴&&!있) b.insertAdjacentHTML('afterbegin','<svg class="lab65묶기 mr-[2px]" data-꼴="'+꼴+'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+묶기그림[꼴]+'</svg>'); }
  /* ── 정렬방향 ── */
  var 방향={키:null,뒤:false,만짐:false}, 자만짐=false;
  function 화살(아래){ return '<svg class="lab65방향" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+(아래?'<path d="M12 5v14M19 12l-7 7-7-7"/>':'<path d="M12 19V5M5 12l7-7 7 7"/>')+'</svg>'; }   /* 자동화 ARROW 와 같음 */
  function 정렬s(){ return d.querySelector('.pj-tools .pj-pill.lab32정렬'); }
  function 값넣기(s,v){ var f=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value').set; f.call(s,v); s.dispatchEvent(new Event('input',{bubbles:true})); s.dispatchEvent(new Event('change',{bubbles:true})); }
  function 메뉴칠(){ var m=d.querySelector('.pjf-메뉴:not([hidden])'), s=정렬s(); if(!m||!s||!m.querySelector('button[data-v=activity]')) return;
    [].forEach.call(m.querySelectorAll('button'),function(b){ var on=b.dataset.v===s.value, 칸=b.querySelector(':scope > .dir');
      b.classList.toggle('on',on); b.setAttribute('aria-selected',on?'true':'false');
      if(!칸){ 칸=d.createElement('span'); 칸.className='dir'; b.appendChild(칸); }
      var 새=on?화살(!방향.뒤):''; if(칸.__쓸!==새){ 칸.innerHTML=새; 칸.__쓸=새; }
      b.title=on?(방향.뒤?'거꾸로 · 누르면 기본 순서':'기본 순서 · 누르면 거꾸로'):''; }); }
  d.addEventListener('click',function(e){ if(!h.classList.contains('lab65켬-정렬방향')) return;
    var b=e.target.closest&&e.target.closest('.pjf-메뉴 button'), s=정렬s();
    if(b&&s&&b.closest('.pjf-메뉴').querySelector('button[data-v=activity]')){ e.stopPropagation();
      방향.만짐=true; if(b.dataset.v===s.value) 방향.뒤=!방향.뒤; else { 방향.뒤=false; 방향.키=b.dataset.v; 값넣기(s,b.dataset.v); }
      메뉴칠(); 뒤집기(); 맞춤(); return; }
    var 머=e.target.closest&&e.target.closest('.pjl .머리 > span[data-정]');   /* 표 머리 같은 칸 다시 누름 = 뒤집기 */
    if(머&&s&&!e.target.closest('.손')){ 방향.만짐=true; if(머.dataset.정===s.value){ 방향.뒤=!방향.뒤; 뒤집기(); } 맞춤(); }
    if(e.target.closest&&e.target.closest('.js-sort-menu button[data-k], .js-sseg button')){ 자만짐=true; setTimeout(자동화,0); } },true);
  function 뒤집기(){ var s=정렬s(), 켬=h.classList.contains('lab65켬-정렬방향');
    if(s&&방향.키!==s.value){ if(방향.키!==null) 방향.뒤=false; 방향.키=s.value; }   /* 앱 쪽에서 키가 바뀌면(머리 누름 등) 방향은 기본으로 */
    var 뒤=켬&&방향.뒤; h.classList.toggle('lab65뒤집힘',뒤);
    [].forEach.call(d.querySelectorAll('.pj-cards'),function(g){ var cs=[].slice.call(g.querySelectorAll(':scope > .pj-card')), n=cs.length;
      cs.forEach(function(c,i){ var 핀=c.querySelector('.pj-card-pin[aria-pressed=true]'), o=뒤?(핀?i-n:n-i):''; if(c.style.order!==String(o)) c.style.order=o; }); });
    if(켬) [].forEach.call(d.querySelectorAll('.pjl .머리 > span.켬'),function(켠){ var 내=!/name|due/.test(켠.dataset.정||''); 켠.classList.toggle('내림',뒤?!내:내); }); }   /* 태그로 묶으면 .pjl 이 묶음마다 — 머리 화살 모두 */
  /* 자동화 — 단추 「정렬」 글을 감싸 두고 · 기본(최근 실행순 ↓)이 아니면 그 이름 + 방향으로(앱이 메뉴 .dir 에 그린 화살을 읽음) */
  function 자동화(){ var 켬=h.classList.contains('lab65켬-정렬방향');
    [].forEach.call(d.querySelectorAll('.js-sort'),function(b){ var t=[].filter.call(b.childNodes,function(n){ return n.nodeType===3&&n.textContent.trim()==='정렬'; })[0];
      if(t){ var w0=d.createElement('span'); w0.className='lab65자글'; w0.textContent='정렬'; b.replaceChild(w0,t); }
      var 글=b.querySelector('.lab65자글'), 값=b.querySelector('.lab65자값'); if(!글) return;
      if(!값){ 값=d.createElement('span'); 값.className='lab65자값'; 글.insertAdjacentElement('afterend',값); }
      var 키=(b.querySelector('.js-sort-val')||{}).textContent||'', on=d.querySelector('.js-sort-menu button.on .dir svg'), 아래=!on||/M12 5v14/.test(on.innerHTML);
      var 기본=h.classList.contains('lab65켬-만지면값')?!자만짐:키==='최근 실행순'&&아래, 쓸=켬&&!기본?키+화살(아래):'';
      글.style.display=쓸?'none':''; 값.style.display=쓸?'':'none'; if(값.__쓸!==쓸){ 값.innerHTML=쓸; 값.__쓸=쓸; } }); }
  setInterval(function(){ 맞춤(); 역할(); 묶기(); 메뉴칠(); 뒤집기(); 자동화(); },200);
})();

/* 65 안 11 늘 켬 — 65 랩은 이 파일을 빼고 제 엔진으로 안을 고름 */
(function(){ var 목=["정렬만", "거름화살뺌", "거름아이콘", "역할셋", "묶기묶음", "정렬방향", "만지면값", "가름뺌"];
  function 켜(){ try{ if(!document.documentElement.classList.contains('lab65켬-정렬방향')) window.__lab65적용(목); }catch(e){} }
  켜(); setInterval(켜,1000); })();   /* 다른 부품이 html class 를 통째로 바꿔도 다시 켬 */
