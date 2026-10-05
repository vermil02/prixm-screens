/* 조합 1안 · 부품/핵심버튼.js — 핵심버튼.css 의 짝(2026-10-02 다시 짬). 하는 일: 누르는 순간 누른 버튼에 lab-켬 · 원래 켜진 버튼에 lab-끔.
   「누르는 순간」 = 손이 닿는 pointerdown(click 은 손을 뗄 때라 늦음 — 사용자 「클릭되는 순간 바로 시작해야」). 누른 채 밖으로 빠져 클릭이 안 되면 되돌림.
   움직임은 CSS 전환이 맡고, 넘어가기는 원래대로(막지 않음). 새 화면은 켜진 모습 그대로.
   __핵심상태 · __핵심이어받기 · __핵심정리 = 손질후가 화면을 갈아 끼울 때 효과를 이어 가려고 부름(2026-10-02). */
(function(){ var d=document; if(d.__핵심버튼) return; d.__핵심버튼=1;
  var S='.lnb-wrap > .lnb-group:first-child .lnb-list > .channel-text-demo', 지금=null, 옛=null;
  function 되돌림(){ if(지금) 지금.classList.remove('lab-켬'); if(옛) 옛.classList.remove('lab-끔'); 지금=옛=null; }
  d.addEventListener('pointerdown',function(e){ if(e.button) return; var b=e.target.closest&&e.target.closest(S); if(!b||b.classList.contains('active')) return;
    되돌림(); 옛=d.querySelector(S+'.active'); if(옛) 옛.classList.add('lab-끔'); 지금=b; b.classList.add('lab-켬'); },true);
  d.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest(S); if(b&&b===지금) 지금=옛=null; },true);   /* 클릭됨 — 그대로 넘어감 */
  d.addEventListener('pointerup',function(e){ setTimeout(function(){ if(지금) 되돌림(); },50); },true);   /* 클릭이 안 따라오면(밖에서 뗌) 되돌림 */
  /* 손질후(바깥)가 부름 — 화면을 갈아 끼울 때 효과를 이어 감(핵심버튼.css 끝 「lab-이어」) */
  function 판(b){ var c=getComputedStyle(b,'::before'), l=getComputedStyle(b.querySelector('.ch-label')||b); return {t:c.top,l:c.left,w:c.width,h:c.height,r:c.borderTopLeftRadius,c:l.color}; }
  window.__핵심상태=function(){ var o={}; d.querySelectorAll(S).forEach(function(b){ o[b.textContent.trim()]=판(b); }); return o; };
  window.__핵심이어받기=function(o){ if(!o) return; var 줄=[]; d.querySelectorAll(S).forEach(function(b){ var s=o[b.textContent.trim()]; if(!s) return;
      [['--이t',s.t],['--이l',s.l],['--이w',s.w],['--이h',s.h],['--이r',s.r],['--이c',s.c]].forEach(function(v){ b.style.setProperty(v[0],v[1]); }); b.classList.add('lab-이어'); 줄.push(b); });
    void d.body.offsetWidth; requestAnimationFrame(function(){ 줄.forEach(function(b){ b.classList.remove('lab-이어'); }); }); };
  window.__핵심정리=function(){ var r=d.documentElement; r.classList.add('lab-즉시'); 지금=옛=null; d.querySelectorAll(S).forEach(function(b){ b.classList.remove('lab-켬','lab-끔'); });
    void d.body.offsetWidth; requestAnimationFrame(function(){ requestAnimationFrame(function(){ r.classList.remove('lab-즉시'); }); }); };   /* 떠난 화면(미리 불러 둔 판)을 깨끗이 — 다시 돌아올 때 남은 표시가 없게 */
  /* 키보드(Enter)로 누를 때 — 클릭만 오므로 그때 켬 */
  d.addEventListener('keydown',function(e){ if(e.key!=='Enter') return; var b=e.target.closest&&e.target.closest(S); if(!b||b.classList.contains('active')) return; var o=d.querySelector(S+'.active'); if(o) o.classList.add('lab-끔'); b.classList.add('lab-켬'); },true);
})();
