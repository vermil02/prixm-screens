/* 조합 1안 · 부품/저장본목록즉시 — 손 부품 · 2026-10-12 · 짝 = 저장본목록즉시.css (까닭은 짝 CSS 머리)
   모든 프로젝트: 앱이 표(table.pj-table)를 새로 그렸는데 옆에 1안 목록(.pjl)이 없으면 그 자리에서 window.__pj목록그림() — 0.4초 기다리지 않게.
   MutationObserver 는 화면을 그리기 전에 불리므로 앱 원래 표가 한 틀도 안 보임. */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab56) return; w.__lab56=1;
  function 봄(){ if(!w.__pj목록그림) return; var t=d.querySelector('.pj-content .pj-scroll section > div.overflow-x-auto > table.pj-table'); if(!t) return;
    if(t.parentElement.querySelector(':scope > .pjl')) return; try{ w.__pj목록그림(); }catch(e){} }
  new MutationObserver(봄).observe(h,{childList:true,subtree:true});
  /* 목록 부품이 있는 문서(프로젝트)에서만 CSS 를 켬 — 없는 곳에선 표를 가리지 않음 */
  var n=0; (function 켜기(){ if(w.__pj목록그림){ if(!h.classList.contains('lab56-즉시')) h.classList.add('lab56-즉시'); 봄(); return; } if(n++<40) setTimeout(켜기,250); })();
})();
