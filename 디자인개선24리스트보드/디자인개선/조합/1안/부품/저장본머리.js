/* 조합 1안 · 부품/저장본머리.js — 저장본머리.css 의 짝(2026-10-06). 사진본 LNB 머리의 「… 검색」 · 「… 패널 접기」 단추를 찾아
   ① 표시(lab-저장본머리단추) ② 그림을 우리 것으로(검색 = LNB .lnb-top-search · 접기 = .lnb-top-fold 패널 아이콘) ③ 접기를 누르면 우리 방식으로 접음
   — 이 문서 body 와 바깥 틀 문서 body 에 lnb-접힘(바깥 틀.js 가 GNB 맨 위 「다시 열기」 를 띄우고, 누르면 안쪽 화면들 접힘도 풂). 사진본 자기 접기 동작은 막음. */
(function(){ var d=document; if(d.__저장본머리) return; d.__저장본머리=1;
  var 검색그림='<svg viewBox="0 0 20 20" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m16.667 16.667-3.375-3.375m0 0a5.834 5.834 0 1 0-8.251-8.25 5.834 5.834 0 0 0 8.25 8.25"/></svg>';
  var 접기그림='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3.1" y="3.1" width="13.8" height="13.8" rx="2.5"/><path d="M7.75 3.1v13.8"/><path d="M13.2 7.5 10.7 10l2.5 2.5"/></svg>';
  function 붙이기(){ var a=d.querySelector('aside[class*="gnb-panel-bg"]'); if(!a) return;
    a.querySelectorAll('button[aria-label]').forEach(function(b){ var l=b.getAttribute('aria-label')||'', r=b.getBoundingClientRect(), ar=a.getBoundingClientRect();
      if(b.dataset.저장본머리||r.width===0||r.top>ar.top+60) return;   /* 머리 줄(LNB 위 60 안)만 · 접힌 상태용 「펼치기」(안 보임)는 건드리지 않음 */
      if(/패널 접기$/.test(l)){ b.dataset.저장본머리='접기'; b.classList.add('lab-저장본머리단추'); b.innerHTML=접기그림; b.title='패널 접기';
        b.addEventListener('click',function(e){ e.preventDefault(); e.stopImmediatePropagation(); 접기(); },true); }
      else if(/검색$/.test(l)){ b.dataset.저장본머리='검색'; b.classList.add('lab-저장본머리단추'); b.innerHTML=검색그림; b.title=l; } }); }
  function 접기(){ d.body.classList.add('lnb-접힘'); try{ var p=window.parent; if(p&&p!==window&&p.document.querySelector('.gnb')) p.document.body.classList.add('lnb-접힘'); }catch(e){} }
  붙이기(); setTimeout(붙이기,300); setTimeout(붙이기,1200);
})();
