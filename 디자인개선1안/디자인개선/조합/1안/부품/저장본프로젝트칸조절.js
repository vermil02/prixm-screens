/* 조합 1안 · 부품/저장본프로젝트칸조절 — 손 부품 · 2026-10-12 · 짝 = 저장본프로젝트칸조절.css
   모든 프로젝트 목록 표 머리 칸을 끌어 폭을 바꿈(자동화 리스트 24 랩 「표 칸 크기 조정」과 같은 움직임 · 사람마다 localStorage 「pj-표-칸폭」 · 칸 순번(nth-child) 열쇠).
   표는 table-layout:fixed — 끈 칸은 그 폭 그대로(인라인 !important 가 표열 부품의 이름 340 도 이김) · 남는 폭은 마지막 칸(최근 활동)이 받음 ·
   모자라면 표 최소 폭을 늘려 카드 안 가로 스크롤(최근 활동 최소 96). 앱(Vue)이 머리를 다시 그려도 0.4초마다 손잡이 · 폭을 다시 붙임. 되돌리기 __pj칸폭초기화() */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__pjc) return; w.__pjc=1;
  var 열쇠='pj-표-칸폭', 끝최소=96;
  function 폭들(){ try{ return JSON.parse(localStorage.getItem(열쇠)||'{}')||{}; }catch(e){ return {}; } }
  function 저장(v){ try{ localStorage.setItem(열쇠,JSON.stringify(v)); }catch(e){} }
  function 표(){ return d.querySelector('.pj-content:has(.pj-tools) .pj-scroll .pj-table'); }
  function 칸들(t){ return [].slice.call(t.querySelectorAll('thead th')).filter(function(x){ return x.offsetWidth>0||x.querySelector('.pjc-손잡이'); }); }
  function 번(th){ return String([].indexOf.call(th.parentNode.children,th)+1); }
  function 최소(th){ return 번(th)==='2'?160:48; }
  function 최소폭맞춤(t){ var 폭=폭들(); if(!Object.keys(폭).length){ t.style.removeProperty('min-width'); return; }
    var 보=칸들(t), 합=0; 보.forEach(function(x,i){ if(i<보.length-1) 합+=x.offsetWidth; }); t.style.setProperty('min-width',(합+끝최소)+'px','important'); }
  function 붙임(){ var t=표(); if(!t) return; var 보=칸들(t); if(보.length<2) return; var 폭=폭들();
    보.forEach(function(th,i){ var z=String(30-i); if(th.style.zIndex!==z) th.style.zIndex=z; });   /* 손잡이가 칸 끝 한가운데라 반쪽이 다음 칸 위 — 앞 칸일수록 위(표공통.css) */
    보.forEach(function(th,i){ var 끝=i===보.length-1||th.classList.contains('col-pct'), 손=th.querySelector(':scope > .pjc-손잡이');   /* 진행률 % 칸은 막대 칸과 한 덩이(머리 글이 둘에 걸침) — 손잡이 · 선 없음 */
      if(끝){ if(손) 손.remove(); return; }
      if(!손){ 손=d.createElement('i'); 손.className='pjc-손잡이'; 손.title='끌어서 칸 폭 바꾸기'; th.appendChild(손); }
      var v=폭[번(th)]; if(v&&th.style.getPropertyValue('width')!==v+'px') th.style.setProperty('width',v+'px','important'); });
    최소폭맞춤(t); }
  d.addEventListener('mousedown',function(e){ var 손=e.target.closest&&e.target.closest('.pjc-손잡이'); if(!손) return;
    e.preventDefault(); e.stopPropagation(); var th=손.parentNode, t=th.closest('table'), x0=e.clientX, w0=th.getBoundingClientRect().width, k=번(th), 끝값=w0;
    손.classList.add('끄는중'); h.classList.add('pjc-끄는중');
    function 움(ev){ 끝값=Math.max(최소(th),Math.round(w0+ev.clientX-x0)); th.style.setProperty('width',끝값+'px','important'); var 폭=폭들(); 폭[k]=끝값; 저장(폭); 최소폭맞춤(t); }
    function 놓(){ d.removeEventListener('mousemove',움,true); d.removeEventListener('mouseup',놓,true); 손.classList.remove('끄는중'); h.classList.remove('pjc-끄는중'); }
    d.addEventListener('mousemove',움,true); d.addEventListener('mouseup',놓,true); },true);
  d.addEventListener('click',function(e){ if(e.target.closest&&e.target.closest('.pjc-손잡이')){ e.preventDefault(); e.stopPropagation(); } },true);
  w.__pj칸폭초기화=function(){ try{ localStorage.removeItem(열쇠); }catch(e){} var t=표(); if(!t) return; 칸들(t).forEach(function(th){ th.style.removeProperty('width'); }); t.style.removeProperty('min-width'); };
  /* 2026-10-12 머리 눌러 정렬(사용자 「프로젝트 리스트에서는 이름 같은 항목 눌러서 정렬 바꾸는 기능 · 자동화는 있음」) — 칸 순번 → 도구 줄 정렬 select 값.
     앱 정렬은 값마다 방향이 하나라 다시 눌러도 그대로(자동화처럼 오름 · 내림을 바꾸진 못함) · 화살 = 그 값의 방향(이름 · 마감 = 오름 ↑ · 나머지 = 내림 ↓) */
  var 정렬값={'2':'name','3':'priority','6':'progress','9':'due','10':'activity'}, 오름={name:1,due:1};
  var 화살='<svg class="pjs-화살" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9.5V2.5M3 5.5l3-3 3 3"/></svg>';
  var 값넣기=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value').set;
  function 정렬칸(){ var 줄=d.querySelector('.pj-content .pj-tools'); if(!줄) return null; return [].slice.call(줄.querySelectorAll('select')).filter(function(s){ return [].some.call(s.options,function(o){ return o.value==='activity'; })&&[].some.call(s.options,function(o){ return o.value==='name'; }); })[0]||null; }
  function 머리맞춤(){ var t=표(), s=정렬칸(); if(!t||!s) return;
    [].slice.call(t.querySelectorAll('thead th')).forEach(function(th){ var v=정렬값[번(th)]; if(!v||![].some.call(s.options,function(o){ return o.value===v; })) return;
      if(th.dataset.pjs!==v) th.dataset.pjs=v; if(!th.querySelector('.pjs-화살')){ var 손=th.querySelector(':scope > .pjc-손잡이'); th.insertAdjacentHTML('beforeend',화살); if(손) th.appendChild(손); }
      var 켬=s.value===v; if(켬!==th.classList.contains('pjs-켬')) th.classList.toggle('pjs-켬',켬); var 내=!오름[v]; if(내!==th.classList.contains('pjs-내림')) th.classList.toggle('pjs-내림',내); }); }
  d.addEventListener('click',function(e){ var th=e.target.closest&&e.target.closest('.pj-content:has(.pj-tools) .pj-scroll .pj-table thead th[data-pjs]'); if(!th||e.target.closest('.pjc-손잡이')) return;
    var s=정렬칸(), v=th.dataset.pjs; if(!s||s.value===v) return; 값넣기.call(s,v); s.dispatchEvent(new Event('input',{bubbles:true})); s.dispatchEvent(new Event('change',{bubbles:true})); setTimeout(머리맞춤,30); },true);
  setInterval(function(){ 붙임(); 머리맞춤(); },400); 붙임(); 머리맞춤();
})();
