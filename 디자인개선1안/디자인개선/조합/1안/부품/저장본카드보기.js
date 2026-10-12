/* 조합 1안 · 부품/저장본카드보기 — 손질/55_카드보기거름/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12
   프로젝트(d06)에만: 55 랩 안 2 — 카드 보기에서도 요약 칸 · 칩 거름이 카드(.pj-card)에 걸림 · 「지연 업무」 큰 수 = 진행 중 프로젝트 지연 합(리스트 · 카드 같음) ·
   보기 단추(.pj-view-seg)가 다시 그려지면 1안 꼴 클래스(lab18-보기칸 · lab18-켬) 다시 붙임. */

(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab55적용) return;
  var 켬=false, 셈=null;
  function 글(e){ return e?e.textContent.replace(/\s+/g,' ').trim():''; }
  function 말(q){ var t=''; q.childNodes.forEach(function(n){ if(n.nodeType===3) t+=n.textContent; }); return t.trim(); }
  /* 프로젝트마다 셈 — 1안 · 46 과 같은 규칙(진행 100 = 완료 · 끝 < 오늘 = 지연 · 이번 주 = 오늘 ~ 일요일 · 진행 = 시작 ≤ 오늘 ≤ 끝) */
  function 세기(){ var b=w.__복제; if(!b||!b.표) return null; var 표=b.표, dk=Object.keys(표).filter(function(x){ return /^GET \/api\/projects\/dashboard/.test(x); })[0]; if(!dk) return null;
    var D; try{ D=JSON.parse(표[dk][2]); }catch(e){ return null; }
    var n=new Date(), 오늘=new Date(n.getFullYear(),n.getMonth(),n.getDate()), 주끝=new Date(오늘.getFullYear(),오늘.getMonth(),오늘.getDate()+((7-오늘.getDay())%7));
    function 날(s){ var a=String(s).split('-'); return new Date(+a[0],+a[1]-1,+a[2]); }
    var 프={}, 늦합=0;
    (D.projects||[]).filter(function(p){ return p.status!=='archived'; }).forEach(function(p){
      var c={늦:p.overdue_count||0, 지연:{내:0,다른:0,없음:0}, 주:{내:0,다른:0,없음:0}, 내:{모두:0,지연:0,진행:0}}; 프[p.name]=c; 늦합+=c.늦;
      var 내것=(D.my_tasks||[]).filter(function(t){ return t.project_id===p.id; });
      내것.forEach(function(t){ if((t.progress||0)>=100) return; c.내.모두++; var 끝=날(t.end), 시=날(t.start); if(끝<오늘) c.내.지연++; else if(시<=오늘) c.내.진행++; });
      var 키=내것.map(function(t){ return t.task_key; }), gk='GET /api/projects/'+p.id+'/gantt', G=null; if(표[gk]) try{ G=JSON.parse(표[gk][2]); }catch(e){}
      ((G&&G.tasks)||[]).forEach(function(t){ if((t.progress||0)>=100) return; var 끝=날(t.end), 누=키.indexOf(t.id)>=0?'내':(t.assignee_id?'다른':'없음');
        if(끝<오늘) c.지연[누]++; else if(끝<=주끝) c.주[누]++; }); });
    return {프:프, 늦합:늦합}; }
  var 누키={'내 업무':'내','다른 사람':'다른','담당 없음':'없음'};
  function 맞나(c,k,칩){ if(!c) return true;
    if(k==='진행'){ if(칩==='지연 있음') return c.늦>0; if(칩==='정상') return c.늦===0; return true; }
    if(k==='지연'){ if(!(c.늦>0)) return false; return 칩&&누키[칩]?c.지연[누키[칩]]>0:true; }
    if(k==='이번주'){ if(칩&&누키[칩]) return c.주[누키[칩]]>0; return c.주.내>0; }
    if(k==='내'){ if(칩==='지연') return c.내.지연>0; if(칩==='진행 중') return c.내.진행>0; return c.내.모두>0; }
    return true; }
  /* 지금 걸린 조건 — 1안 칸 거름(.칸.켬) · 48 칩 거름(칸의 data-lab48칩 = 고른 칩 차례) */
  function 조건(){ var s=d.querySelector('.lab32요약'); if(!s) return null; var 칸들=[].slice.call(s.querySelectorAll(':scope > .칸'));
    var 칩칸=칸들.filter(function(c){ return c.hasAttribute('data-lab48칩'); })[0], 켠=칸들.filter(function(c){ return c.classList.contains('켬'); })[0], 칸=칩칸||켠; if(!칸) return null;
    var 칩=null; if(칩칸){ var q=칩칸.querySelectorAll('.아래글 > .요칩')[+칩칸.getAttribute('data-lab48칩')-1]; if(q) 칩=말(q); }
    return {k:칸.dataset.k||'진행', 칩:칩}; }
  function 카드(){ var 카=[].slice.call(d.querySelectorAll('.pj-card[data-project-card]')); if(!카.length) return; if(!셈) 셈=세기(); var 조=켬?조건():null;
    카.forEach(function(e){ var 이=글(e.querySelector('.pj-card-title span'))||글(e.querySelector('.pj-card-title')), 보=!조||!셈||맞나(셈.프[이],조.k,조.칩);
      if(보===e.classList.contains('lab55-숨김')) e.classList.toggle('lab55-숨김',!보); }); }
  function 지연수(){ if(!켬) return; if(!셈) 셈=세기(); if(!셈) return; var c=d.querySelector('.lab32요약 .칸[data-k="지연"]'); if(!c) return;
    var 큰=c.querySelector('.속 > b'), 첫=큰&&큰.firstChild; if(첫&&첫.nodeType===3&&첫.textContent!==String(셈.늦합)) 첫.textContent=String(셈.늦합); }
  /* 보기 단추 — 앱이 다시 그리면 1안 꼴 클래스를 다시 붙임(저장본부품.js 「보기」 와 같은 것) */
  function 단추(){ if(!켬) return; [].forEach.call(d.querySelectorAll('.pj-view-seg'),function(g){ if(!g.classList.contains('lab18-보기')) g.classList.add('lab18-보기');
      [].forEach.call(g.children,function(b){ if(b.tagName!=='BUTTON') return; if(!b.classList.contains('lab18-보기칸')) b.classList.add('lab18-보기칸'); var 켜=b.classList.contains('is-active'); if(켜!==b.classList.contains('lab18-켬')) b.classList.toggle('lab18-켬',켜); }); });
    [].forEach.call(d.querySelectorAll('.pj-tools .px-btn-text:not(.lab18-글단추)'),function(b){ b.classList.add('lab18-글단추'); }); }
  function 맞춤(){ if(!켬){ [].forEach.call(d.querySelectorAll('.lab55-숨김'),function(e){ e.classList.remove('lab55-숨김'); }); return; } 카드(); 지연수(); 단추(); }
  new MutationObserver(맞춤).observe(h,{childList:true,subtree:true,attributes:true,attributeFilter:['data-lab48칩','class']});
  w.__lab55적용=function(목록){ 켬=(목록||[]).indexOf('정리')>=0; var 있=h.classList.contains('lab55켬-정리'); if(켬&&!있) h.classList.add('lab55켬-정리'); else if(!켬&&있) h.classList.remove('lab55켬-정리'); 맞춤(); };
})();

/* 1안 · 고정 — 저장본카드보기(손질/55_카드보기거름/1안반영.py) · 프로젝트 문서에서만 켬 */
(function(){ var d=document, w=window, n=0; if(!w.__lab55적용) return;
  (function 켜기(){ if(d.querySelector('.pj-main')){ w.__lab55적용(["정리"]); return; } if(n++<40) setTimeout(켜기,250); })();
})();
