/* 조합 1안 · 부품/저장본목록호버 — 손 부품 · 2026-10-12 · 짝 = 저장본목록호버.css (까닭은 짝 CSS 머리)
   .pjl 안에 줄(.프 · .묶음)이나 목록 자체가 새로 들어오면 html.lab57-새 를 붙였다가 두 틀 뒤 뗌(MutationObserver 는 그리기 전에 불림 → 새 줄 첫 꼴이 전환 없이 정해짐).
   + 화살표 돌림(2026-10-12 사용자 「화살표 변경될 때 자연스럽게 변경되는 효과」): 1안 CSS 는 .펼.열림 svg 를 0.18초에 90도 돌리는데, 줄이 0.03초에 새로 그려져 돌림이 끊기고
     새 줄은 끝 각도로 바로 나옴(실측 0 → 90 한 틀). → 묶음(data-id)마다 열림을 기억해 두고, 새 줄이 들어오면 바뀐 묶음의 화살표를 앞 각도 → 새 각도로 0.18초 돌림(Web Animations · 1안 값 그대로). */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab57) return; w.__lab57=1;
  var 걸림=0, 기억={};   /* 기억 = 묶음 data-id → 열림(참 · 거짓) */
  /* 처음 판은 화살표 단추(.펼)를 누를 때만 열림을 적어서, 줄(항목)을 눌러 펼치면 기억이 없어 여전히 한 틀에 90도 튐(사용자 「자연스럽게 안 돌아가는데?」 · 실측)
     → 누른 곳과 상관없이 줄이 새로 그려질 때마다 묶음마다 앞 열림과 견줘 바뀐 것만 돌림. 앞 판 판/저장본목록호버_*_누름기준.js */
  function 돌림(){ [].forEach.call(d.querySelectorAll('.pjl .묶음[data-id]'),function(묶){ var id=묶.getAttribute('data-id'), b=묶.querySelector('.펼'), s=b&&b.querySelector('svg'); if(!b) return;
      var 새=b.classList.contains('열림'), 앞=기억[id]; 기억[id]=새;
      if(앞===undefined||앞===새||!s||!s.animate||s.__lab57돎) return; s.__lab57돎=1;
      s.animate([{transform:'rotate('+(앞?90:0)+'deg)'},{transform:'rotate('+(새?90:0)+'deg)'}],{duration:180,easing:'ease'}); }); }
  /* 줄을 새로 안 그리고 클래스만 바뀐 경우(1안 CSS 전환이 돎) — 잠시 뒤 기억만 맞춤 */
  /* 기억이 아직 없는 묶음은 바뀌기 전 클래스(oldValue)로 채움 — 화면에 처음 들어온 뒤 첫 누름도 돌게(처음 판은 첫 누름이 기억 없음 → 튐 · 실측) */
  new MutationObserver(function(목록){ 목록.forEach(function(m){ var b=m.target; if(!b.classList||!b.classList.contains('펼')) return; var 묶=b.closest('.묶음'), id=묶&&묶.getAttribute('data-id'); if(!id) return;
      if(기억[id]===undefined) 기억[id]=/(^|\s)열림(\s|$)/.test(m.oldValue||'');
      setTimeout(function(){ if(!b.isConnected) return; 기억[id]=b.classList.contains('열림'); },600); }); })
    .observe(h,{attributes:true,attributeFilter:['class'],attributeOldValue:true,subtree:true});
  /* 목록이 뜨면 바로 기억을 채움(돌리지 않음) */
  var n=0; (function 채움(){ var 묶들=d.querySelectorAll('.pjl .묶음[data-id]'); if(묶들.length){ [].forEach.call(묶들,function(묶){ var b=묶.querySelector('.펼'), id=묶.getAttribute('data-id'); if(b&&기억[id]===undefined) 기억[id]=b.classList.contains('열림'); }); return; } if(n++<60) setTimeout(채움,250); })();
  function 새것(n){ return n.nodeType===1&&(n.classList.contains('pjl')||n.classList.contains('묶음')||n.classList.contains('프')||!!(n.querySelector&&n.querySelector('.pjl .프, .묶음, .프'))); }
  new MutationObserver(function(목록){
    var 있=false; for(var i=0;i<목록.length&&!있;i++){ var m=목록[i]; if(!m.addedNodes.length) continue; for(var j=0;j<m.addedNodes.length;j++){ if(새것(m.addedNodes[j])){ 있=true; break; } } }
    if(!있) return; if(!h.classList.contains('lab57-새')) h.classList.add('lab57-새'); var 내=++걸림; 돌림();
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ if(내===걸림) h.classList.remove('lab57-새'); }); });
  }).observe(h,{childList:true,subtree:true});
})();
