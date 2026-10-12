/* 조합 1안 · 부품/저장본진행중카드 — 손질/53_진행중카드/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12
   프로젝트(d06)에만: 53 랩 안 2 — 요약 「진행 중 프로젝트」 칸(칸 · 칩 어디든)을 누르면 도구 줄 상태 고르기가 보관됨 · 전체 상태일 때 진행 중으로 바꿈 ·
   그 칸 수 · 칩(지연 있음 · 정상)은 늘 진행 중 프로젝트만(녹화 dashboard 로 셈 · 사진본은 1안 수 그대로). 이 제품 프로젝트 상태 = 진행 중 · 보관됨 둘뿐(「완료」 없음). */

(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab53적용) return;
  var 켬=false;
  function 상태고르기(){ var 줄=d.querySelector('.pj-tools'); if(!줄) return null; return [].filter.call(줄.querySelectorAll('select'),function(s){ return [].some.call(s.options,function(o){ return o.value==='archived'; }); })[0]||null; }
  function 진행칸(){ return d.querySelector('.lab32요약 .칸[data-k=""]'); }
  /* ① 누름 — 칸 · 칩 어디든 · 잡기 단계(48 칩 거름 · 1안 칸 누름보다 먼저 · 막지 않음) */
  d.addEventListener('click',function(e){ if(!켬) return; var c=e.target.closest&&e.target.closest('.lab32요약 .칸'); if(!c||c.dataset.k!=='') return;
    var s=상태고르기(); if(!s||s.value==='active') return; s.value='active'; s.dispatchEvent(new Event('input',{bubbles:true})); s.dispatchEvent(new Event('change',{bubbles:true})); },true);
  /* ② 수 — 상태가 진행 중이 아닐 때만 녹화 dashboard 로 다시 셈 */
  function 셈(){ var b=w.__복제; if(!b||!b.표) return null; var dk=Object.keys(b.표).filter(function(x){ return /^GET \/api\/projects\/dashboard/.test(x); })[0]; if(!dk) return null;
    try{ var ps=(JSON.parse(b.표[dk][2]).projects||[]).filter(function(p){ return p.status!=='archived'; }); return {수:ps.length, 늦:ps.filter(function(p){ return (p.overdue_count||0)>0; }).length}; }catch(e){ return null; } }
  /* 늘 다시 셈 — 처음 판은 상태가 진행 중이 아닐 때만 셌는데, 칸을 눌러 진행 중으로 돌리는 순간 1안이 빈 목록(0줄)으로 칸을 다시 그려 「0개」 로 남았음(실측) */
  function 고침(){ if(!켬) return; var c=진행칸(); if(!c) return; var v=셈(); if(!v) return;
    var 큰=c.querySelector('.속 > b'), 첫=큰&&큰.firstChild; if(첫&&첫.nodeType===3&&첫.textContent!==String(v.수)) 첫.textContent=String(v.수);
    var 칩=c.querySelectorAll('.아래글 > .요칩 .수'); if(칩[0]&&칩[0].textContent!==String(v.늦)) 칩[0].textContent=String(v.늦); if(칩[1]&&칩[1].textContent!==String(v.수-v.늦)) 칩[1].textContent=String(v.수-v.늦); }
  new MutationObserver(function(){ 고침(); }).observe(h,{childList:true,subtree:true,characterData:true});
  d.addEventListener('change',function(e){ if(e.target&&e.target.tagName==='SELECT') setTimeout(고침,0); },true);
  w.__lab53적용=function(목록){ 켬=(목록||[]).indexOf('진행중')>=0; 고침(); };
})();

/* 1안 · 고정 — 저장본진행중카드(손질/53_진행중카드/1안반영.py) · 프로젝트 문서에서만 켬 */
(function(){ var d=document, w=window, n=0; if(!w.__lab53적용) return;
  (function 켜기(){ if(d.querySelector('.pj-main')){ w.__lab53적용(["진행중"]); return; } if(n++<40) setTimeout(켜기,250); })();
})();
