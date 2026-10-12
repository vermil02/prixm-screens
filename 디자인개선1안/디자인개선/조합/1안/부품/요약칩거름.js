/* 조합 1안 · 부품/요약칩거름 — 손질/48_요약칩거름/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12
   모든 자동화 · 모든 프로젝트 요약: 칸 = 그 칸만 거름(1안 그대로) · 칸 안 칩 = 칸 + 칩 두 조건(칸이 안 켜져 있으면 대신 켬 · 같은 칩 다시 = 칩만 풂 · 고른 칩 = 칩 색 테) ·
   ⚠ 칩 · 칩 줄 안은 안 건드림(저장본요약칩나눔 이 칩 줄을 다시 써서 서로 고치면 멎음) — 고른 차례는 칸의 data-lab48칩. */

(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab48적용) return;
  var 켬=false, 칩거름=null, 대신=false;   /* {칸:키, 말:칩 말} · 대신 = 칩 때문에 칸을 대신 누르는 중(그 누름으로 칩 거름을 풀지 않게) */
  function 말(q){ var t=''; q.childNodes.forEach(function(n){ if(n.nodeType===3) t+=n.textContent; }); return t.trim(); }
  function 수(q){ var s=q.querySelector('.수'); return s?+(s.textContent.replace(/[^0-9]/g,''))||0:0; }
  function 요약(){ return d.querySelector('.lab24요약, .lab32요약'); }
  function 자동화(){ var s=요약(); return !!s&&s.classList.contains('lab24요약'); }
  function 칸키(c){ return 자동화()?c.dataset.f:(c.dataset.k||'진행'); }
  function 칸켬(c){ return c.classList.contains('켬'); }

  /* ── 프로젝트 간트 셈(46 과 같은 규칙) — 프로젝트별 · 업무별 담당 */
  var 셈=null;
  function 세기(){ var b=w.__복제; if(!b||!b.표) return null; var 표=b.표, dk=Object.keys(표).filter(function(x){ return /^GET \/api\/projects\/dashboard/.test(x); })[0]; if(!dk) return null;
    var D; try{ D=JSON.parse(표[dk][2]); }catch(e){ return null; }
    var n=new Date(), 오늘=new Date(n.getFullYear(),n.getMonth(),n.getDate()), 주끝=new Date(오늘.getFullYear(),오늘.getMonth(),오늘.getDate()+((7-오늘.getDay())%7));
    function 날(s){ var a=String(s).split('-'); return new Date(+a[0],+a[1]-1,+a[2]); }
    var 프={}, 업={};
    (D.projects||[]).forEach(function(p){ var gk='GET /api/projects/'+p.id+'/gantt'; var c={이름:p.name,지연:{내:0,다른:0,없음:0},주:{내:0,다른:0,없음:0}}; 프[p.name]=c; if(!표[gk]) return;
      var G; try{ G=JSON.parse(표[gk][2]); }catch(e){ return; }
      var 내것=(D.my_tasks||[]).filter(function(t){ return t.project_id===p.id; }).map(function(t){ return t.task_key; });
      (G.tasks||[]).forEach(function(t){ var 누=내것.indexOf(t.id)>=0?'내':(t.assignee_id?'다른':'없음'); 업[p.id+'|'+t.id]=누; if((t.progress||0)>=100) return;
        var 끝=날(t.end), 지=끝<오늘, 주=!지&&끝>=오늘&&끝<=주끝; if(지) c.지연[누]++; if(주) c.주[누]++; }); });
    return {프:프, 업:업}; }
  var 누키={'내 업무':'내','다른 사람':'다른','담당 없음':'없음'};

  /* ── 줄 숨김 */
  function 숨김(e,v){ if(v!==e.classList.contains('lab48-숨김')) e.classList.toggle('lab48-숨김',v); }
  function 풂(){ [].forEach.call(d.querySelectorAll('.lab48-숨김'),function(e){ e.classList.remove('lab48-숨김'); }); }
  var 활=['실행 중','예약 중'];
  function 자동맞나(상){ var m=칩거름.말; if(m==='활성') return 활.indexOf(상)>=0; if(m==='비활성') return 활.indexOf(상)<0; return 상===m; }
  function 자동숨김(){ var 판=d.querySelector('.lab24판'); if(!판) return;
    [].forEach.call(판.querySelectorAll('.줄[data-t]'),function(r){ var 상=r.children[0]?r.children[0].textContent.trim():''; 숨김(r,!자동맞나(상)); });
    [].forEach.call(판.querySelectorAll('.lab24칸'),function(칸){ var 머=칸.querySelector('.머,.칸머,header,b'); var 이=칸.getAttribute('data-이름')||(머?머.textContent.replace(/[0-9]/g,'').trim():'');
      if(이) 숨김(칸,!자동맞나(이)); }); }
  function 프로숨김(){ var t=d.querySelector('.pj-table'); if(!t) return; if(!셈) 셈=세기();
    var k=칩거름.칸, m=칩거름.말, 누=누키[m], 줄=[].slice.call(t.querySelectorAll('tbody > tr')), 지금프=null, 지금보임=true;
    줄.forEach(function(r){
      if('projectRow' in r.dataset){ var 이=(r.querySelector('.pj-name-btn')||{}).textContent; 이=(이||'').trim(); var c=셈&&셈.프[이], 보=true;
        if(k==='진행'){ var 늦=r.querySelector('.pj-late'), n=늦?parseInt(늦.textContent,10)||0:0; 보=m==='지연 있음'?n>0:n===0; }
        else if((k==='지연'||k==='이번주')&&누) 보=!!c&&(k==='지연'?c.지연:c.주)[누]>0;
        else if(k==='내') 보=true;   /* 아래 업무 줄로 정함 */
        지금프=r; 지금보임=보; 숨김(r,!보); return; }
      if(!지금보임){ 숨김(r,true); return; }
      if(r.classList.contains('lab32업무')){ var 보2=true;
        if((k==='지연'||k==='이번주')&&누&&셈){ 보2=셈.업[r.dataset.pid+'|'+r.dataset.tid]===누; }
        if(k==='내'){ var 상=r.textContent; 보2=m==='지연'?/지연/.test(상):(m==='진행 중'?/진행 중/.test(상):true); }
        숨김(r,!보2); return; }
      숨김(r,false); });
    if(k==='내'){ /* 내 업무 칩 — 보이는 업무 줄이 없는 프로젝트는 숨김 */
      var 프로=null, 있=false; 줄.concat([null]).forEach(function(r){ if(!r||'projectRow' in r.dataset){ if(프로) 숨김(프로,!있); 프로=r; 있=false; return; }
        if(r.classList.contains('lab32업무')&&!r.classList.contains('lab48-숨김')) 있=true; });
      var 숨프=null; 줄.forEach(function(r){ if('projectRow' in r.dataset){ 숨프=r.classList.contains('lab48-숨김'); return; } if(숨프) 숨김(r,true); }); } }
  /* ── 칩 표시 · 도구 줄 글 */
  function 칠(){ var s=요약(); if(!s) return;
    [].forEach.call(s.querySelectorAll(':scope > .칸'),function(c){ var 칩들=[].slice.call(c.querySelectorAll('.아래글 > .요칩')), i=-1;
      if(칩거름&&칸키(c)===칩거름.칸) 칩들.forEach(function(q,j){ if(말(q)===칩거름.말) i=j; });
      var 값=i>=0?String(i+1):null; if(c.getAttribute('data-lab48칩')!==값){ if(값) c.setAttribute('data-lab48칩',값); else c.removeAttribute('data-lab48칩'); } });
    var 거=d.querySelector('.lab24거름칩 b, .lab32거름칩'); if(거){ var 덧=거.querySelector('.lab48-덧');
      if(칩거름){ if(!덧){ 덧=d.createElement('span'); 덧.className='lab48-덧'; var 엑=거.querySelector('svg'); if(엑&&엑.parentNode===거) 거.insertBefore(덧,엑); else 거.appendChild(덧); } if(덧.textContent!==' · '+칩거름.말) 덧.textContent=' · '+칩거름.말; }
      else if(덧) 덧.remove(); } }
  function 맞춤(){ if(!켬) return; var s=요약();
    if(칩거름){ var 켠=s&&[].filter.call(s.querySelectorAll(':scope > .칸'),function(c){ return 칸키(c)===칩거름.칸; })[0];
      /* 칸 거름이 풀렸으면(1안 「거름 풀기」 칩 · 다른 칸) 칩 거름도 풂 — 진행 중 칸은 1안 거름이 없어 켬 표시로 못 봄 */
      if(!켠||(칩거름.칸!=='진행'&&!칸켬(켠))){ 칩거름=null; 풂(); } }
    if(칩거름){ if(자동화()) 자동숨김(); else 프로숨김(); }
    칠(); }
  d.addEventListener('click',function(e){ if(!켬||대신) return; var q=e.target.closest&&e.target.closest('.lab24요약 .요칩, .lab32요약 .요칩');
    if(!q){ if(e.target.closest&&e.target.closest('.lab24요약 .칸, .lab32요약 .칸')&&칩거름){ 칩거름=null; 풂(); setTimeout(맞춤,0); } return; }
    e.stopPropagation(); e.preventDefault(); if(수(q)===0) return;
    var c=q.closest('.칸'), k=칸키(c), m=말(q);
    if(칩거름&&칩거름.칸===k&&칩거름.말===m){ 칩거름=null; 풂(); 맞춤(); return; }
    칩거름={칸:k, 말:m};
    if(k!=='진행'&&!칸켬(c)){ 대신=true; try{ c.click(); } finally{ 대신=false; } }   /* 1안 칸 거름 켬(진행 중 칸은 1안 거름 없음) · 처음 판은 이 누름을 「칸 누름」 으로 보고 칩 거름을 풀어 첫 칩이 안 먹었음 */
    setTimeout(맞춤,0); },true);
  new MutationObserver(function(){ if(켬&&칩거름) 맞춤(); else if(켬) 칠(); }).observe(d.documentElement,{childList:true,subtree:true});
  w.__lab48적용=function(목록){ 켬=(목록||[]).indexOf('거름')>=0; var 있=h.classList.contains('lab48켬-거름'); if(켬&&!있) h.classList.add('lab48켬-거름'); else if(!켬&&있) h.classList.remove('lab48켬-거름');
    if(!켬){ 칩거름=null; 풂(); [].forEach.call(d.querySelectorAll('[data-lab48칩]'),function(c){ c.removeAttribute('data-lab48칩'); }); [].forEach.call(d.querySelectorAll('.lab48-덧'),function(x){ x.remove(); }); }
    맞춤(); };
})();

/* 1안 · 고정 — 요약칩거름(손질/48_요약칩거름/1안반영.py) · 요약 칸이 있는 문서에서만 켬 */
(function(){ var d=document, w=window, n=0; if(!w.__lab48적용) return;
  (function 켜기(){ if(d.querySelector('.lab24요약, .lab32요약')){ w.__lab48적용(["거름"]); return; } if(n++<40) setTimeout(켜기,250); })();
})();
