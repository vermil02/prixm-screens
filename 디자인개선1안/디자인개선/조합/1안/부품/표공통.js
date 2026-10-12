/* 조합 1안 · 부품/표공통(짝 스크립트) — 손 부품 · 2026-10-12 사용자 「자동화 호버할 때 툴팁은 프로젝트처럼」
   자동화 리스트 표 머리 손잡이의 title(브라우저 기본 말풍선)을 프로젝트(앱 crew-tooltip)와 같은 검은 말풍선으로:
   올리고 0.25초 뒤 · 위 6 · 가운데 · 바탕 rgba(0,0,0,.7) · 둥글기 4 · 5 7 · 12 / 500 / 흰 · 자간 -.5 · 아래 꼬리 4 · 0.12초 · 꼴은 표공통.css(.표팁).
   프로젝트(저장본)엔 앱 말풍선이 이미 있어 이 스크립트는 우리 화면(부품js)에만. */
(function(){
  var d=document, w=window; if(w.__표팁) return; w.__표팁=1;
  var 팁=null, 때=0, 대상=null;
  function 숨김(){ clearTimeout(때); 대상=null; if(팁) 팁.classList.remove('보임'); }
  function 보임(e){ if(!팁){ 팁=d.createElement('div'); 팁.className='표팁'; 팁.innerHTML='<span class="글"></span><i class="꼬리"></i>'; d.body.appendChild(팁); }
    var 글=e.dataset.표팁||''; if(!글) return; 팁.querySelector('.글').textContent=글;
    var r=e.getBoundingClientRect(), t=팁.getBoundingClientRect();
    팁.style.left=Math.round(Math.max(4,Math.min(r.left+r.width/2-t.width/2,w.innerWidth-t.width-4)))+'px'; 팁.style.top=Math.round(r.top-6-t.height)+'px';
    팁.querySelector('.꼬리').style.left=Math.round(r.left+r.width/2-parseFloat(팁.style.left))+'px'; 팁.classList.add('보임'); }
  d.addEventListener('mouseover',function(e){ var h=e.target.closest&&e.target.closest('.lab24우표 > .머리 .손잡이'); if(h===대상) return; 숨김(); if(!h) return;
    if(h.title){ h.dataset.표팁=h.title; h.removeAttribute('title'); }   /* 기본 말풍선이 겹쳐 뜨지 않게 */
    대상=h; 때=setTimeout(function(){ if(대상===h) 보임(h); },250); },true);
  d.addEventListener('mousedown',숨김,true); w.addEventListener('scroll',숨김,true); w.addEventListener('blur',숨김);
})();
