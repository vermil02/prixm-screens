/* 조합 1안 · 부품/저장본목록호버 — 손 부품 · 2026-10-12 · 짝 = 저장본목록호버.css (까닭은 짝 CSS 머리)
   .pjl 안에 줄(.프 · .묶음)이나 목록 자체가 새로 들어오면 html.lab57-새 를 붙였다가 두 틀 뒤 뗌(MutationObserver 는 그리기 전에 불림 → 새 줄 첫 꼴이 전환 없이 정해짐).
   + 화살표 돌림(2026-10-12 사용자 「화살표 변경될 때 자연스럽게 변경되는 효과」): 1안 CSS 는 .펼.열림 svg 를 0.18초에 90도 돌리는데, 줄이 0.03초에 새로 그려져 돌림이 끊기고
     새 줄은 끝 각도로 바로 나옴(실측 0 → 90 한 틀). → 누를 때 그 묶음(data-id)의 열림을 적어 두고, 새 줄이 들어오면 그 화살표를 앞 각도 → 새 각도로 0.18초 돌림(Web Animations · 1안 값 그대로). */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab57) return; w.__lab57=1;
  var 걸림=0, 누름=null;   /* 누름 = {id, 열, 때} */
  d.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.pjl .펼'); if(!b) return; var 묶=b.closest('.묶음');
    누름={id:묶&&묶.getAttribute('data-id'), 열:b.classList.contains('열림'), 때:Date.now()}; },true);
  function 돌림(){ if(!누름||Date.now()-누름.때>1500) return; var 묶=누름.id&&d.querySelector('.pjl .묶음[data-id="'+누름.id+'"]'), b=묶&&묶.querySelector('.펼'), s=b&&b.querySelector('svg'); if(!s||!s.animate) return;
    var 새=b.classList.contains('열림'); if(새===누름.열||s.__lab57돎) return; s.__lab57돎=1; 누름=null;
    s.animate([{transform:'rotate('+(새?0:90)+'deg)'},{transform:'rotate('+(새?90:0)+'deg)'}],{duration:180,easing:'ease'}); }
  function 새것(n){ return n.nodeType===1&&(n.classList.contains('pjl')||n.classList.contains('묶음')||n.classList.contains('프')||!!(n.querySelector&&n.querySelector('.pjl .프, .묶음, .프'))); }
  new MutationObserver(function(목록){
    var 있=false; for(var i=0;i<목록.length&&!있;i++){ var m=목록[i]; if(!m.addedNodes.length) continue; for(var j=0;j<m.addedNodes.length;j++){ if(새것(m.addedNodes[j])){ 있=true; break; } } }
    if(!있) return; if(!h.classList.contains('lab57-새')) h.classList.add('lab57-새'); var 내=++걸림; 돌림();
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ if(내===걸림) h.classList.remove('lab57-새'); }); });
  }).observe(h,{childList:true,subtree:true});
})();
