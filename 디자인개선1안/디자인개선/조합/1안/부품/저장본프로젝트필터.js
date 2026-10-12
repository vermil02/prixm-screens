/* 조합 1안 · 부품/저장본프로젝트필터 — 손으로 만든 부품(랩 없음) · 2026-10-12 · 짝 = 저장본프로젝트필터.css
   모든 프로젝트 도구 줄(.pj-tools)의 <select> 를 누르면 브라우저 기본 목록 대신 우리 드롭다운을 엶(사용자 「3번은 바꾸자」).
   select 는 그대로 둠(Vue 가 다시 그려도 · 글자 · 화살표 그대로) — 누름 · 키(Enter · Space · ↑ · ↓)만 가로챔.
   고르면 select 값을 바꾸고 change 를 보냄(앱 v-model 이 받음) · 고르면 · 바깥 누르면 · Esc · 스크롤 · 창 크기 바뀌면 닫음. 다른 저장본 화면엔 .pj-tools select 가 없어 아무 일 없음 */
(function(){
  var d=document, w=window; if(w.__pjf) return; w.__pjf=1;
  var 메뉴=null, 지금=null;
  var 값넣기=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value').set;
  function 대상(e){ var t=e.target; return t&&t.closest?t.closest('.pj-tools select'):null; }
  function 닫기(되돌림){ if(!메뉴||메뉴.hidden) return; 메뉴.hidden=true; if(지금){ 지금.classList.remove('pjf-열림'); if(되돌림) 지금.focus(); } 지금=null; }
  function 고름(s,v,키){ if(s.value!==v){ 값넣기.call(s,v); s.dispatchEvent(new Event('input',{bubbles:true})); s.dispatchEvent(new Event('change',{bubbles:true})); } 닫기(!!키); }   /* 키로 골랐을 때만 select 로 포커스 되돌림(마우스면 포커스 테가 남음) */
  function 열기(s){
    if(!메뉴){ 메뉴=d.createElement('div'); 메뉴.className='pjf-메뉴'; 메뉴.setAttribute('role','listbox'); 메뉴.hidden=true; d.body.appendChild(메뉴);
      메뉴.addEventListener('mousedown',function(e){ e.preventDefault(); });   /* select 의 포커스를 안 뺏음 */
      메뉴.addEventListener('click',function(e){ var b=e.target.closest('button'); if(b&&지금) 고름(지금,b.dataset.v,e.detail===0); });   /* detail 0 = 키(Enter · Space)로 누름 */
      메뉴.addEventListener('keydown',function(e){ var bs=[].slice.call(메뉴.querySelectorAll('button')), i=bs.indexOf(d.activeElement);
        if(e.key==='ArrowDown'||e.key==='ArrowUp'){ e.preventDefault(); var n=bs[(i+(e.key==='ArrowDown'?1:-1)+bs.length)%bs.length]; if(n) n.focus(); }
        else if(e.key==='Escape'||e.key==='Tab'){ e.preventDefault(); 닫기(true); } });
    }
    if(!메뉴.isConnected) d.body.appendChild(메뉴);
    지금=s; s.classList.add('pjf-열림');
    메뉴.innerHTML=''; [].slice.call(s.options).forEach(function(o){ if(o.hidden||o.disabled) return; var b=d.createElement('button'); b.type='button'; b.setAttribute('role','option'); b.dataset.v=o.value; b.textContent=o.textContent.trim(); if(o.selected){ b.className='on'; b.setAttribute('aria-selected','true'); } 메뉴.appendChild(b); });
    var r=s.getBoundingClientRect(); 메뉴.style.minWidth=Math.max(132,Math.round(r.width))+'px'; 메뉴.hidden=false;
    var 높=메뉴.offsetHeight, 넓=메뉴.offsetWidth, 위=r.bottom+4; if(위+높>w.innerHeight-8&&r.top-4-높>8) 위=r.top-4-높;
    메뉴.style.top=Math.round(위)+'px'; 메뉴.style.left=Math.round(Math.max(8,Math.min(r.left,w.innerWidth-넓-8)))+'px';
  }
  d.addEventListener('mousedown',function(e){
    var s=대상(e);
    if(s){ e.preventDefault(); if(지금===s&&메뉴&&!메뉴.hidden) 닫기(false); else { 닫기(false); 열기(s); } return; }   /* 기본 목록이 안 열리게 */
    if(메뉴&&!메뉴.hidden&&!메뉴.contains(e.target)) 닫기(false);
  },true);
  d.addEventListener('keydown',function(e){
    var s=대상(e); if(!s) return;
    if(e.key==='Enter'||e.key===' '||e.key==='ArrowDown'||e.key==='ArrowUp'){ e.preventDefault(); if(지금===s&&메뉴&&!메뉴.hidden){ var b=메뉴.querySelector('button.on')||메뉴.querySelector('button'); if(b) b.focus(); return; } 열기(s); var on=메뉴.querySelector('button.on')||메뉴.querySelector('button'); if(on) on.focus(); }
    else if(e.key==='Escape') 닫기(true);
  },true);
  w.addEventListener('scroll',function(e){ if(메뉴&&!메뉴.contains(e.target)) 닫기(false); },true);
  w.addEventListener('resize',function(){ 닫기(false); });
  w.addEventListener('blur',function(){ 닫기(false); });
})();
