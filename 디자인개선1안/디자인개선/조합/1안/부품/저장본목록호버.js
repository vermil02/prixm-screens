/* 조합 1안 · 부품/저장본목록호버 — 손 부품 · 2026-10-12 · 짝 = 저장본목록호버.css (까닭은 짝 CSS 머리)
   .pjl 안에 줄(.프 · .묶음)이나 목록 자체가 새로 들어오면 html.lab57-새 를 붙였다가 두 틀 뒤 뗌(MutationObserver 는 그리기 전에 불림 → 새 줄 첫 꼴이 전환 없이 정해짐). */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab57) return; w.__lab57=1;
  var 걸림=0;
  function 새것(n){ return n.nodeType===1&&(n.classList.contains('pjl')||n.classList.contains('묶음')||n.classList.contains('프')||!!(n.querySelector&&n.querySelector('.pjl .프, .묶음, .프'))); }
  new MutationObserver(function(목록){
    var 있=false; for(var i=0;i<목록.length&&!있;i++){ var m=목록[i]; if(!m.addedNodes.length) continue; for(var j=0;j<m.addedNodes.length;j++){ if(새것(m.addedNodes[j])){ 있=true; break; } } }
    if(!있) return; if(!h.classList.contains('lab57-새')) h.classList.add('lab57-새'); var 내=++걸림;
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ if(내===걸림) h.classList.remove('lab57-새'); }); });
  }).observe(h,{childList:true,subtree:true});
})();
