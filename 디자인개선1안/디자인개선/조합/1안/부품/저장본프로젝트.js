/* 조합 1안 · 부품/저장본프로젝트 — 손질/32_프로젝트/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-11
   프로젝트(d06 · test-crew 로컬 복제 / 사진본)에만: 32 랩 안 「9 = 8 + 업무 추가 · 줄 끝 ⋯ 메뉴」.
   켠 항목: 도구 줄 = 글 드롭다운, 거름 │ 정렬 · 표 = 자동화 리스트 표 꼴 · AI 도우미 = 이메일 도우미 카드 꼴 · 요약 칸 넷(누르면 거름) · 프로젝트별 내 업무 펼침 · LNB = 모든 프로젝트 + 프로젝트 목록 · LNB 내 업무 뺌(모든 프로젝트로 합침) · 프로젝트 표시 = 머리글자 타일 · AI 도우미 여닫기(× · 오른쪽 아래 얼굴) · 프로젝트 누르면 상세(실서비스 손저장) · 업무 누르면 태스크 상세 팝업(실서비스 간트 부품) · 펼친 끝 「+ 업무 추가」(간트 부품 새 행 → 팝업) · 줄 끝 ⋯ 메뉴(고정 · 열기 · 간트) */

/* 32 실데이터 — 로컬 복제(test-crew_app · window.__복제)면 녹화된 /api/projects/dashboard 에서 프로젝트 · 지연 수 · 내 업무(my_tasks)를 읽음(없으면 null → 사진본용 고정값) */
window.__lab32실=window.__lab32실||function(){ var b=window.__복제; if(!b||!b.표) return null;
  var k=Object.keys(b.표).filter(function(x){ return /^GET \/api\/projects\/dashboard/.test(x); })[0]; if(!k) return null;
  var j; try{ j=JSON.parse(b.표[k][2]); }catch(e){ return null; }
  var 고정=[]; try{ 고정=JSON.parse(localStorage.getItem('projects.pinned')||'[]')||[]; }catch(e){}
  var 프=(j.projects||[]).filter(function(p){ return p.status!=='archived'; }).map(function(p){ return [p.name,p.overdue_count||0,null,p.id]; });
  var 업={}; (j.my_tasks||[]).forEach(function(t){ var pp=(j.projects||[]).filter(function(x){ return x.id===t.project_id; })[0], 이=pp?pp.name:t.project_name; (업[이]=업[이]||[]).push([t.name,t.progress||0,t.start,t.end,t.task_key,t.project_id]); });
  return {프:프, 업:업, 고정:고정}; };
/* 32 프로젝트 랩 엔진 — 항목 켜기(html.lab32켬-*) + 도구 줄 손봄(정렬 select 를 거름 뒤로 · 사이 구분선) + 추천 그림 바꿈 */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab32적용) return;
  var 켠=[];
  function 켬(c){ return 켠.indexOf(c)>=0; }
  var 원래=null;
  function 도구(){ var 줄=d.querySelector('.pj-tools'); if(!줄) return; var 알=[].slice.call(줄.querySelectorAll(':scope > select.pj-pill'));
    var 정=알.filter(function(s){ return /최근 활동순/.test(s.textContent); })[0];
    if(켬('도구꼴')){ if(!정||정.classList.contains('lab32정렬')) return;
      if(!원래) 원래={정:정, 다음:정.nextSibling};
      정.classList.add('lab32정렬'); 정.title='정렬'; var 끝=알[알.length-1]; var 가=d.createElement('span'); 가.className='lab32가름';
      if(끝!==정){ 줄.insertBefore(가,끝.nextSibling); 줄.insertBefore(정,가.nextSibling); } else 줄.insertBefore(가,정);
    } else if(원래&&정&&정.classList.contains('lab32정렬')){ 정.classList.remove('lab32정렬'); var g=줄.querySelector('.lab32가름'); if(g) g.remove(); 줄.insertBefore(정,원래.다음); 원래=null; } }
  var 달력='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
  function 추천(){ [].forEach.call(d.querySelectorAll('.pj-ai-sugg'),function(b){ var e=b.querySelector('span[aria-hidden]');
      if(켬('도우미꼴')){ if(e&&!b.dataset.lab32){ b.dataset.lab32=e.outerHTML; e.outerHTML=달력; } }
      else if(b.dataset.lab32){ var s=b.querySelector('svg'); if(s) s.outerHTML=b.dataset.lab32; delete b.dataset.lab32; } }); }
  function 맞춤(){ 도구(); 추천(); }
  w.__lab32적용=function(목록){ 켠=목록||[]; [].slice.call(h.classList).forEach(function(c){ if(c.indexOf('lab32켬-')===0) h.classList.remove(c); }); 켠.forEach(function(c){ h.classList.add('lab32켬-'+c); }); 맞춤(); };
  var t=setInterval(맞춤,300); setTimeout(function(){ clearInterval(t); },6000);
})();

/* 32 요약칸 · 내업무펼침 — 데모값 = 실서비스 「프로젝트 내 업무」(2026-10-11 읽음) · 오늘 = 사진본 날짜 10-01 */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab32업무) return; w.__lab32업무=1;
  var 실=window.__lab32실&&window.__lab32실();   /* 로컬 복제 = 녹화 데이터 · 오늘 = 진짜 오늘 / 사진본 = 10-01 고정 */
  var 오늘=실?(function(){ var n=new Date(); return new Date(n.getFullYear(),n.getMonth(),n.getDate()); })():new Date(2026,9,1);
  var 주끝=new Date(오늘.getFullYear(),오늘.getMonth(),오늘.getDate()+((7-오늘.getDay())%7));   /* 이번 주 = ~ 일요일 */
  var 업무={
    "홈페이지 디자인 전면 개편":[["화면 기획·구성",50,"9/22","9/25"],["디자인",25,"9/18","9/19"],["QA",0,"9/19","9/20"]],
    "2026 소자연구":[["행정업무",50,"9/9","9/10"],["소자 평가 기능",0,"9/9","9/14"],["물성실측 관리",59,"9/9","9/10"],["테스트 일감",0,"9/11","9/15"],["단위테스트1",0,"9/9","9/10"],["단위테스트2",0,"9/9","9/10"],["통합테스트",0,"9/29","10/3"],["이행",0,"9/9","9/10"]]
  };
  function 날(s){ if(/^\d{4}-/.test(s)){ var b=s.split('-'); return new Date(+b[0],+b[1]-1,+b[2]); } var a=s.split('/'); return new Date(2026,+a[0]-1,+a[1]); }
  function 짧(s){ if(/^\d{4}-/.test(s)){ var b=s.split('-'); return (+b[1])+'/'+(+b[2]); } return s; }
  if(실) 업무=실.업;
  var 이름id={}; if(실) 실.프.forEach(function(p){ 이름id[p[0]]=p[3]; });
  /* 간트(팝업)에서 고친 내 업무 목록 — window.__lab32간트업무[pid] 가 있으면 그 프로젝트는 그걸로 */
  function 업무들(){ var o={}; Object.keys(업무).forEach(function(k){ o[k]=업무[k]; }); var g=w.__lab32간트업무; if(실&&g) 실.프.forEach(function(p){ if(g[p[3]]) o[p[0]]=g[p[3]]; }); return o; }
  function 상태(t){ var 시=날(t[2]), 끝=날(t[3]); if(t[1]>=100) return '완료'; if(끝<오늘) return '지연'; if(시<=오늘) return '진행'; return '대기'; }
  function 이번주(t){ var 끝=날(t[3]); return 상태(t)!=='지연'&&끝>=오늘&&끝<=주끝; }
  /* 차례 = 진행(이번 주 마감) → 지연(오래 밀린 것부터) → 대기 */
  function 차례(t){ var s=상태(t); return (s==='진행'?0:s==='지연'?1:2)*1e6+날(t[3]).getTime()/864e5; }
  function 켬(c){ return h.classList.contains('lab32켬-'+c); }
  var 거름=null, 펼침={};
  var 꺾='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>';
  var 엑스='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>';
  function 줄들(){ return [].slice.call(d.querySelectorAll('.pj-table tbody > tr:not(.lab32업무):not(.lab32더):not(.lab32추가)')); }   /* 「+ 업무 추가」 줄은 프로젝트가 아님(처음엔 요약 「진행 중 프로젝트」 에 셌음) */
  function 이름(tr){ var b=tr.querySelector('.pj-name-btn'); return b?b.textContent.trim():''; }
  function 늦은수(tr){ var e=tr.querySelector('.pj-late'); return e?(parseInt(e.textContent,10)||0):0; }
  var 칸판=null;
  function 요약(){
    var 줄=d.querySelector('.pj-tools');
    if(!켬('요약칸')){ if(칸판){ 칸판.remove(); 칸판=null; } 거름=null; var 거=d.querySelector('.lab32거름칩'); if(거) 거.remove(); return; }
    if(!줄) return;
    var ps=줄들(), 늦음=ps.map(늦은수), 늦프=늦음.filter(function(n){ return n>0; }).length, 늦합=늦음.reduce(function(a,b){ return a+b; },0);
    var 업=업무들(), 내=0, 내늦=0, 내진=0, 주=0; Object.keys(업).forEach(function(k){ 업[k].forEach(function(t){ 내++; var s=상태(t); if(s==='지연') 내늦++; if(s==='진행') 내진++; if(이번주(t)) 주++; }); });
    function 칩(c,글,수){ return '<span class="요칩" style="--c:'+c+'"><i></i>'+글+'<span class="수">'+수+'</span></span>'; }
    var 아={
      프:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
      늦:'<svg class="빨" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5M12 16h.01"/></svg>',
      주:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M16 2.5v4M8 2.5v4M3 10h18"/></svg>',
      내:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>'};
    var 칸들=[
      ['',아.프,'진행 중 프로젝트',ps.length,'개',칩('239,68,68','지연 있음',늦프)+칩('29,186,87','정상',ps.length-늦프)],
      ['지연',아.늦,'지연 업무',늦합,'건',칩('239,68,68','내 업무',내늦)+칩('138,139,154','다른 사람',Math.max(0,늦합-내늦))],
      ['이번주',아.주,'이번 주 마감',주,'건',칩('59,130,246','내 업무',주)],
      ['내',아.내,'내 업무',내,'건',칩('239,68,68','지연',내늦)+칩('59,130,246','진행 중',내진)]];
    if(!칸판||!칸판.isConnected){ 칸판=d.createElement('div'); 칸판.className='lab32요약'; 줄.parentNode.insertBefore(칸판,줄);
      칸판.addEventListener('click',function(e){ var b=e.target.closest('.칸'); if(!b) return; var k=b.dataset.k||null; 거름=(!k||거름===k)?null:k; 그림(); }); }
    칸판.innerHTML=칸들.map(function(c){ return '<button type="button" class="칸'+(거름&&거름===c[0]?' 켬':'')+'" data-k="'+c[0]+'"><span class="윗">'+c[1]+c[2]+'</span><span class="속"><b>'+c[3]+'<small>'+c[4]+'</small></b><span class="아래글">'+c[5]+'</span></span></button>'; }).join('');
    var 거칩=줄.querySelector('.lab32거름칩');
    if(거름){ var 글={지연:'지연 업무',이번주:'이번 주 마감',내:'내 업무'}[거름];
      if(!거칩){ 거칩=d.createElement('button'); 거칩.type='button'; 거칩.className='lab32거름칩'; 거칩.addEventListener('click',function(){ 거름=null; 그림(); });
        var 기준=줄.querySelector('.lab32정렬'); if(기준) 기준.parentNode.insertBefore(거칩,기준.nextSibling); else { var ss=줄.querySelectorAll('select.pj-pill'); var 끝=ss[ss.length-1]; 끝.parentNode.insertBefore(거칩,끝.nextSibling); } 줄.classList.add('lab32거름줄'); }
      거칩.innerHTML=글+엑스; }
    else if(거칩) 거칩.remove();
  }
  function 업무줄(t){ var 고=(window.__lab32고침||{})[(t[5]||'')+'|'+(t[4]||'')]; if(고) t=[t[0],고.progress,고.start,고.end,t[4],t[5]];   /* 팝업에서 고친 값 */
    var s=상태(t), 글={지연:'지연',진행:'진행 중',대기:'대기',완료:'완료'}[s];
    var tr=d.createElement('tr'); tr.className='lab32업무'; if(t[4]&&t[5]){ tr.dataset.pid=t[5]; tr.dataset.tid=t[4]; }
    tr.innerHTML='<td></td><td><span class="업무이름">'+t[0]+'</span></td><td></td><td></td><td></td><td class="퍼" style="text-align:right">'+t[1]+'%</td><td><div class="막대"><span style="width:'+t[1]+'%"></span></div></td><td><span class="상태 '+s+'">'+글+'</span></td><td colspan="2"><span class="기간'+(s==='지연'?' 지남':'')+'">'+짧(t[2])+' ~ '+짧(t[3])+'</span></td>';
    return tr; }
  function 펼침그림(){
    var on=켬('내업무펼침');
    줄들().forEach(function(tr){ var 이=이름(tr), 칸=tr.querySelector('td.col-name'), 버=tr.querySelector('.pj-name-btn'); if(!칸||!버) return;
      var 랩=칸.querySelector('.lab32이름줄');
      if(!on){ if(랩){ 칸.insertBefore(버,랩); 랩.remove(); } return; }
      /* 2026-10-12 사용자 「프로젝트인데 그 아래에 업무를 하려면 무조건 열리게끔 하고 거기에 + 버튼」 — 내 업무가 없어도 펼침 · 끝에 「+ 업무 추가」 */
      if(!랩){ 랩=d.createElement('div'); 랩.className='lab32이름줄'; 칸.insertBefore(랩,버); var 펼=d.createElement('button'); 펼.type='button'; 펼.className='lab32펼'; 펼.innerHTML=꺾; 펼.setAttribute('aria-label','업무 펼치기'); 랩.appendChild(펼); 랩.appendChild(버);
        var 표=d.createElement('span'); 표.className='lab32고정표'; 표.title='고정됨'; 표.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>'; 랩.appendChild(표);
        var 칩=d.createElement('button'); 칩.type='button'; 칩.className='lab32내칩'; 칩.title='이 프로젝트의 내 업무'; 랩.appendChild(칩);
        [펼,칩].forEach(function(x){ x.addEventListener('click',function(e){ e.stopPropagation(); 펼침[이]=!펼침[이]; 그림(); }); }); }
      var 목=업무들()[이]||[], 늦=목.filter(function(t){ return 상태(t)==='지연'; }).length, 칩=랩.querySelector('.lab32내칩');
      if(칩){ 칩.style.display=목.length?'':'none'; 칩.innerHTML=(늦?'<i></i>':'')+'내 업무 <b>'+목.length+'</b>'; }
      if(!(이 in 펼침)) 펼침[이]=늦>0;   /* 처음 = 내 업무가 밀린 프로젝트만 펼침 */
      var 고=false; try{ 고=(JSON.parse(localStorage.getItem('projects.pinned')||'[]')||[]).indexOf(이름id[이])>=0; }catch(x){} 랩.classList.toggle('고정',고);
    });
    [].forEach.call(d.querySelectorAll('.pj-table tr.lab32업무,.pj-table tr.lab32더,.pj-table tr.lab32추가'),function(x){ x.remove(); });
    if(!on) return;
    var 업=업무들();
    줄들().forEach(function(tr){ if(tr.classList.contains('lab32숨김')) return; var 이=이름(tr), 목=(업[이]||[]).slice().sort(function(a,b){ return 차례(a)-차례(b); });
      var 맞=거름==='이번주'?목.filter(이번주):거름==='지연'?목.filter(function(t){ return 상태(t)==='지연'; }):목;
      var 보일=!!거름||펼침[이], 추가=!거름&&켬('업무추가')&&!!w.__복제&&!!이름id[이]; var 펼=tr.querySelector('.lab32펼'); if(펼) 펼.classList.toggle('열림',!!(보일&&(맞.length||추가)));
      if(!보일||(!맞.length&&!추가)) return;
      var 다=!!거름||펼침[이+'#다'], 몇=다?맞.length:Math.min(3,맞.length), 뒤=tr;
      맞.slice(0,몇).forEach(function(t){ var r=업무줄(t); 뒤.parentNode.insertBefore(r,뒤.nextSibling); 뒤=r; });
      if(몇<맞.length){ var m=d.createElement('tr'); m.className='lab32더'; m.innerHTML='<td></td><td colspan="9"><button type="button">'+(맞.length-몇)+'개 더 보기</button></td>'; m.querySelector('button').addEventListener('click',function(){ 펼침[이+'#다']=true; 그림(); }); 뒤.parentNode.insertBefore(m,뒤.nextSibling); 뒤=m; }
      if(추가){ var a=d.createElement('tr'); a.className='lab32추가'; a.dataset.pid=이름id[이];
        a.innerHTML='<td></td><td colspan="9">'+(맞.length?'':'<span class="빈">이 프로젝트에 내 업무가 없어요</span>')+'<button type="button" class="lab32추가단추"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>업무 추가</button></td>';
        뒤.parentNode.insertBefore(a,뒤.nextSibling); }
    });
  }
  function 거르기(){ var 업=업무들(); 줄들().forEach(function(tr){ var 이=이름(tr), 목=업[이]||[], 보=true;
      if(거름==='지연') 보=늦은수(tr)>0; else if(거름==='이번주') 보=목.some(이번주); else if(거름==='내') 보=목.length>0;
      tr.classList.toggle('lab32숨김',!보); }); }
  function 그림(){ if(!d.querySelector('.pj-tools')) return; 요약(); 거르기(); 펼침그림(); }   /* 목록 화면만(상세 대시보드의 .pj-table = 업무 표) */
  w.__lab32업무그림=그림;
  new MutationObserver(function(){ 그림(); }).observe(h,{attributes:true,attributeFilter:['class']});
  var t=setInterval(function(){ if(d.querySelector('.pj-table tbody tr')){ 그림(); clearInterval(t); } },200); setTimeout(function(){ clearInterval(t); },8000);
})();

/* 32 LNB프로젝트 — 핵심 버튼 셋 + 프로젝트 이름 줄(표에서 읽음) · 줄 누르면 표에서 그 프로젝트를 펼치고 잠깐 강조(사진본엔 상세가 없음) · 끄면 되돌림 */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab32LNB) return; w.__lab32LNB=1;
  var 그림={
    모:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="5.5" height="5.5" rx="1.4"/><rect x="11.5" y="3" width="5.5" height="5.5" rx="1.4"/><rect x="3" y="11.5" width="5.5" height="5.5" rx="1.4"/><rect x="11.5" y="11.5" width="5.5" height="5.5" rx="1.4"/></svg>',
    내:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7" r="3.2"/><path d="M3.8 17a6.2 6.2 0 0 1 12.4 0"/></svg>',
    프:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>'};
  function 켬(){ return h.classList.contains('lab32켬-LNB프로젝트'); }
  /* 프로젝트 목록(사진본 10-01 목록 · 지연 = 표 「지연」) · 상세 키 = 손질후 d06p1 · d06p2(2026-10-11 크롬 손저장 · 긴 이름 프로젝트는 상세 사진본 없음) */
  var 프목록=[["홈페이지 디자인 전면 개편",4,"d06p1","4d423baa-b2d7-4b7e-94b9-7d1f5d7dbe58"],["이름이엄청나게 길면 어떻게 나오는지 확인하기위한 테스트 프로젝트 이름겸 격차분석 poc 어쩌고 샬라",0,null,"9023ec0c-8006-457e-868a-4d7e6b6c5969"],["2026 소자연구",9,"d06p2","0af38fd1-45ff-46f1-b867-c5138fb1b7af"]];   /* [이름, 지연(사진본), 사진본 키, 실서비스 id] */
  function 목록(){ var 실=window.__lab32실&&window.__lab32실(); return 실?실.프:프목록; }
  function 지금프로젝트(){ var u=decodeURIComponent(location.pathname), m=u.match(/^\/projects\/([0-9a-f-]{36})/); if(m){ var p=목록().filter(function(x){ return x[3]===m[1]; })[0]; return p?p[0]:null; } return /상세2_/.test(u)?"2026 소자연구":/상세_/.test(u)?"홈페이지 디자인 전면 개편":null; }
  function 이동(k){ var w2=window; try{ while(w2.parent&&w2.parent!==w2){ w2=w2.parent; if(typeof w2.보기==='function'){ w2.보기(k); return; } } }catch(e){} }
  var 만든=[], 머리원래=null, 제목원래=null, 지난짝='';
  /* 프로젝트 머리글자 타일 — 이름 해시로 옅은 색 짝(Asana · Jira · Linear 프로젝트 표시 관행 · 제품엔 프로젝트 색 칸이 있으면 그 색) */
  var 짝색=[['#ecebfe','#5754d6'],['#e6f0fe','#2f6fe0'],['#e3f5ec','#15803d'],['#fdf1e3','#c26d0f'],['#fde8ef','#c0396b'],['#e6f6f9','#0e7490'],['#f1ecfd','#7c3aed']];
  function 타일(이){ var 글=(이.match(/[가-힣A-Za-z]/)||[이.charAt(0)])[0].toUpperCase(), n=0; for(var i=0;i<이.length;i++) n=(n*31+이.charCodeAt(i))>>>0; var c=짝색[n%짝색.length];
    return '<span class="lab32타일" style="background:'+c[0]+';color:'+c[1]+'">'+글+'</span>'; }
  function 걷기(){ 만든.forEach(function(x){ x.remove(); }); 만든=[]; [].forEach.call(d.querySelectorAll('li.lab32원래'),function(li){ li.classList.remove('lab32원래'); });
    var 무=d.querySelector('.px-lnb-group'), 머=무&&무.querySelector('h3'), 제=d.querySelector('.ax-crumb-cur'); if(머&&머리원래!==null) 머.textContent=머리원래; if(제&&제목원래!==null) 제.textContent=제목원래; }
  function 맞춤(){
    var 묶=d.querySelector('.lab18-핵심묶음'), 새=묶&&[].slice.call(묶.querySelectorAll('.lab18-핵심')).filter(function(b){ return /새 프로젝트/.test(b.textContent); })[0];
    var 무=d.querySelector('.px-lnb-group'), 머=무&&무.querySelector('h3'), ul=무&&무.querySelector('ul'), 제=d.querySelector('.ax-crumb-cur');
    if(!켬()){ if(만든.length) 걷기(); 지난짝=''; return; }
    var 실=window.__lab32실&&window.__lab32실(), 고정=실?실.고정:[];
    var 짝=(h.classList.contains('lab32켬-내업무뺌')?'뺌':'')+'|'+(h.classList.contains('lab32켬-머리글자타일')?'타일':'')+'|'+고정.join(',');
    if(만든.length&&짝===지난짝) return; if(만든.length) 걷기(); if(!새||!ul) return; 지난짝=짝;
    function 핵(글,그,켜){ var b=새.cloneNode(true); [b].concat([].slice.call(b.querySelectorAll('*'))).forEach(function(x){ if(x.style&&(x.style.visibility||x.style.opacity)) x.removeAttribute('style'); }); b.querySelector('.lab18-타일').innerHTML=그; b.querySelector('.lab18-글').textContent=글; if(켜) b.classList.add('lab32-켬'); 묶.insertBefore(b,새); 만든.push(b); return b; }
    var 지금=지금프로젝트(), 모=핵('모든 프로젝트',그림.모,!지금); if(짝.indexOf('뺌')<0) 핵('내 업무',그림.내,false);
    모.addEventListener('click',function(e){ if(window.__복제){ e.preventDefault(); e.stopPropagation(); var 앱=d.getElementById('app'), 길=앱&&앱.__vue_app__&&앱.__vue_app__.config.globalProperties.$router; if(길&&지금) 길.push('/projects'); return; } if(!h.classList.contains('lab32켬-상세연결')) return; e.preventDefault(); e.stopPropagation(); 이동('d06'); });
    머리원래=머.textContent; 머.textContent='프로젝트';
    if(제&&!지금){ 제목원래=제.textContent; 제.textContent='모든 프로젝트'; }
    var 틀=ul.querySelector('li:last-child');
    [].forEach.call(ul.children,function(li){ li.classList.add('lab32원래'); });
    /* 고정 먼저 — 사용자 「추천대로」(자동화 「고정」 묶음 관행) · 고정이 있으면 묶음 머리 「고정」 + 가운데 「프로젝트」 */
    var 줄목록=목록().slice().sort(function(a,b){ return (고정.indexOf(b[3])>=0)-(고정.indexOf(a[3])>=0); }), 가운데=null;
    if(고정.length&&줄목록.some(function(x){ return 고정.indexOf(x[3])>=0; })){ 머.textContent='고정'; }
    줄목록.forEach(function(pj){ var 고=고정.indexOf(pj[3])>=0; if(고정.length&&!고&&!가운데&&줄목록.some(function(x){ return 고정.indexOf(x[3])>=0; })){ 가운데=d.createElement('li'); 가운데.className='lab32묶음글'; 가운데.textContent='프로젝트'; ul.appendChild(가운데); 만든.push(가운데); }
      var 이=pj[0], 늦=pj[1], tr=[].slice.call(d.querySelectorAll('.pj-tools ~ * .pj-table tbody > tr, .pj-scroll .pj-table tbody > tr')).filter(function(x){ var b=x.querySelector('.pj-name-btn'); return b&&b.textContent.trim()===이; })[0]||null;
      var li=틀.cloneNode(true); li.classList.remove('lab32원래'); var row=li.querySelector('.px-lnb-row'); if(지금===이) row.classList.add('is-active'); /* 원래 줄이 1안 등장 움직임 중(인라인 visibility:hidden · opacity 0)일 때 베끼면 숨은 채 남음 → 인라인 스타일 걷음 */ [li,row].concat([].slice.call(li.querySelectorAll('*'))).forEach(function(x){ x.removeAttribute('style'); }); if(지금!==이) row.classList.remove('is-active'); row.classList.add('lab32프'); var 늦수=늦; row.title=이+(늦수?' · 지연 업무 '+늦수+'건':'');   /* 2026-10-11 사용자 「빨간색 원 초록색 원은 뭐야?」 — 뜻이 안 보임 → 초록(정상) 뺌 · 빨강만 · 올리면 「지연 업무 N건」 */
      row.querySelector('.px-lnb-ico').innerHTML=(짝.indexOf('타일')>=0?타일(이):그림.프)+(늦>0?'<i class="빨"></i>':''); row.querySelector('.px-lnb-label').textContent=이;
      row.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation();
        if(window.__복제){ var 앱=d.getElementById('app'), 길=앱&&앱.__vue_app__&&앱.__vue_app__.config.globalProperties.$router; if(길&&pj[3]){ 길.push('/projects/'+pj[3]); return; } }   /* 로컬 복제 = 실앱 라우터(복제가 손질후 전환으로 넘김) */
        if(h.classList.contains('lab32켬-상세연결')&&pj[2]){ 이동(pj[2]); return; } if(!tr) return; tr.scrollIntoView({block:'center',behavior:'smooth'}); tr.classList.remove('lab32번쩍'); void tr.offsetWidth; tr.classList.add('lab32번쩍');
        var 펼=tr.querySelector('.lab32펼:not(.열림)'); if(펼&&펼.style.visibility!=='hidden') 펼.click(); });
      ul.appendChild(li); 만든.push(li); });
  }
  /* 표의 핀(위로 고정)을 누르면 LNB 를 다시 그림(앱이 localStorage projects.pinned 를 바꿈) */
  d.addEventListener('click',function(e){ if(e.target.closest&&e.target.closest('.pj-card-pin')) setTimeout(function(){ 지난짝='~'; 맞춤(); },200); },true);
  new MutationObserver(맞춤).observe(h,{attributes:true,attributeFilter:['class']});
  var t=setInterval(맞춤,300); setTimeout(function(){ clearInterval(t); },8000);
})();

/* 32 도우미여닫기 — 창 × 누르면 html.lab32-AI닫힘(폭 0.2초) · 얼굴 단추(프로젝트 도우미 얼굴) 누르면 다시 열림 · 끄면 되돌림 */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab32여닫) return; w.__lab32여닫=1;
  var 엑스='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg>';
  var 단=null, 말=null, 닫=null, 원닫=null;
  function 켬(){ return h.classList.contains('lab32켬-도우미여닫기'); }
  function 말자리(){ if(!단||!말) return; 말.style.top=(단.offsetTop+단.offsetHeight/2-17)+'px'; 말.style.right=(단.offsetParent?단.offsetParent.clientWidth-단.offsetLeft+14:0)+'px'; }
  function 맞춤(){
    var 인=d.querySelector('[data-ai-greeting]'), 창=인&&인.closest('aside'), 본=d.querySelector('.pj-content');
    if(!켬()){ if(단){ 단.remove(); 단=null; } if(말){ 말.remove(); 말=null; } if(닫&&원닫!==null){ 닫.innerHTML=원닫; 닫.classList.remove('lab32창닫기'); 닫.title=''; } 닫=null; 원닫=null; if(h.classList.contains('lab32-AI닫힘')) h.classList.remove('lab32-AI닫힘'); return; }   /* 2026-10-11 고침: 없는 클래스도 remove 하면 class 속성을 다시 써 MutationObserver 가 또 불림 → 안 1 에서 무한 반복 · 탭 멈춤 */
    if(!창||!본) return;
    if(!닫){ 닫=창.querySelector('div.absolute > button'); if(닫){ 원닫=닫.innerHTML; 닫.innerHTML=엑스; 닫.classList.add('lab32창닫기'); 닫.title='AI 도우미 닫기'; 닫.setAttribute('aria-label','AI 도우미 닫기');
      닫.addEventListener('click',function(e){ if(!켬()) return; e.preventDefault(); e.stopPropagation(); h.classList.add('lab32-AI닫힘'); try{ sessionStorage.setItem('lab32-도우미','닫힘'); }catch(x){} },true); } }
    if(!단||!단.isConnected){ var img=인.querySelector('img');
      단=d.createElement('button'); 단.type='button'; 단.className='lab32얼굴'; 단.setAttribute('aria-label','프로젝트 AI 도우미 열기');
      단.innerHTML='<img alt="" src="'+(img?img.src:'')+'"><span>프로젝트 AI 도우미</span>'; 본.appendChild(단);
      말=d.createElement('div'); 말.className='lab32말'; 말.setAttribute('aria-hidden','true'); 말.innerHTML='<b>일정 등록</b>이나 <b>업무 정리</b>를 도와 드릴까요?'; 본.appendChild(말);
      단.addEventListener('mouseenter',function(){ 말자리(); 말.classList.add('보임'); }); 단.addEventListener('mouseleave',function(){ 말.classList.remove('보임'); });
      단.addEventListener('click',function(){ 말.classList.remove('보임'); h.classList.remove('lab32-AI닫힘'); try{ sessionStorage.setItem('lab32-도우미','열림'); }catch(x){} });
      /* 처음 = 닫힌 채(사용자 「추천대로」 · 목록을 넓게) — 이 창에서 한 번 열었으면 열린 채 */
      var 처음열림=false; try{ 처음열림=sessionStorage.getItem('lab32-도우미')==='열림'; }catch(x){}
      if(!처음열림&&!h.classList.contains('lab32-AI닫힘')){ h.classList.add('lab32-처음'); h.classList.add('lab32-AI닫힘'); requestAnimationFrame(function(){ requestAnimationFrame(function(){ if(h.classList.contains('lab32-처음')) h.classList.remove('lab32-처음'); }); }); } }
  }
  w.addEventListener('resize',말자리);
  new MutationObserver(맞춤).observe(h,{attributes:true,attributeFilter:['class']});
  var t=setInterval(맞춤,300); setTimeout(function(){ clearInterval(t); },8000);
})();

/* 32 상세연결 — 목록 이름 → 상세 대시보드 · 상세 ← → 목록 · 상세 탭 → 그 탭 사진본(손질후 보기(키)) */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab32상세) return; w.__lab32상세=1;
  var 키={"홈페이지 디자인 전면 개편":{대시보드:"d06p1",간트:"d06p1g",위키:"d06p1w",회의록:"d06p1m",설정:"d06p1s"},"2026 소자연구":{대시보드:"d06p2",간트:"d06p2g"}};
  function 켬(){ return h.classList.contains('lab32켬-상세연결'); }
  function 이동(k){ var w2=window; try{ while(w2.parent&&w2.parent!==w2){ w2=w2.parent; if(typeof w2.보기==='function'){ w2.보기(k); return true; } } }catch(e){} return false; }
  function 지금(){ var u=decodeURIComponent(location.pathname); return /상세2_/.test(u)?"2026 소자연구":/상세_/.test(u)?"홈페이지 디자인 전면 개편":null; }
  d.addEventListener('click',function(e){ if(!켬()||!e.target.closest||window.__복제) return;   /* 로컬 복제(실앱)는 앱이 직접 이동 */
    var 이름=e.target.closest('.pj-tools ~ * .pj-name-btn, .pj-scroll .pj-name-btn');
    if(이름&&d.querySelector('.pj-tools')){ var 묶=키[이름.textContent.trim()]; if(묶){ e.preventDefault(); e.stopPropagation(); 이동(묶.대시보드); } return; }
    var 지=지금(); if(!지) return;
    if(e.target.closest('button[aria-label="프로젝트 목록으로"]')){ e.preventDefault(); e.stopPropagation(); 이동('d06'); return; }
    var 탭=e.target.closest('button'); if(탭&&탭.getBoundingClientRect().y<150){ var t=탭.textContent.trim(), k=(키[지]||{})[t]; if(k){ e.preventDefault(); e.stopPropagation(); 이동(k); } }
  },true);
})();

/* 32 업무상세팝업 — 펼친 내 업무 줄 누르면 실서비스 간트 부품의 「태스크 상세」 팝업(plot-line.openDetail) · 로컬 복제에서만(간트 데이터 = 녹화 /api/projects/<id>/gantt) */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab32팝업) return; w.__lab32팝업=1;
  function 켬(){ return h.classList.contains('lab32켬-업무상세팝업'); }
  var 간트={};
  function 부품(){ if(w.customElements&&customElements.get('plot-line')) return Promise.resolve();
    if(!d.querySelector('script[data-plotline]')){ var k=d.createElement('script'); k.type='module'; k.src='/prixm-screens/디자인개선1안/plotline/plotline.esm.js'; k.dataset.plotline='true'; d.head.appendChild(k); }
    return customElements.whenDefined('plot-line'); }
  /* 앱(ProjectDetailView)이 간트에 넣는 꼴 그대로 — parentId 로 묶고(children) · 진척 0 ~ 1 */
  function 꼴(b){ var 있=new Set(b.tasks.map(function(y){ return y.id; })), 자=new Map(), 뿌=[], 본=new Set();
    function 한(c){ var o={id:c.id,name:c.name,start:c.start,end:c.end,progress:Math.min(1,Math.max(0,Number(c.progress)/100||0))}; if(c.assignee) o.assignee=c.assignee; if(c.status) o.status=c.status; if(c.milestone) o.milestone=true; if(c.color) o.color=c.color; if(c.note) o.note=c.note; return o; }
    b.tasks.forEach(function(y){ var m=y.parentId; if(m&&있.has(m)&&m!==y.id){ (자.get(m)||자.set(m,[]).get(m)).push(y); } else 뿌.push(y); });
    function 재(y){ 본.add(y.id); var 아=(자.get(y.id)||[]).filter(function(v){ return !본.has(v.id); }), j=한(y); if(아.length) j.children=아.map(재); return j; }
    var u=뿌.map(재); b.tasks.forEach(function(y){ if(!본.has(y.id)) u.push(재(y)); });
    return {tasks:u, links:(b.links||[]).map(function(y){ return {source:y.source,target:y.target,type:y.type,lag:y.lag}; })}; }
  function 날글(x){ var t=x instanceof Date?x:new Date(x); return t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0'); }
  /* 나 = 녹화 /api/auth/me 이름(간트 담당 = 이름 글) */
  function 나(){ try{ var b=w.__복제, k=Object.keys(b.표).filter(function(x){ return /^GET \/api\/auth\/me/.test(x); })[0]; return JSON.parse(b.표[k][2]).name||''; }catch(e){ return ''; } }
  /* 간트 ir 에서 내 업무(담당에 내 이름) 다시 셈 → 목록 · 요약 */
  function 다시셈(pid,el){ try{ var 내이름=나(), g=w.__lab32간트업무=w.__lab32간트업무||{}, 고=w.__lab32고침=w.__lab32고침||{};
      g[pid]=el.ir.tasks.filter(function(t){ return (t.assignee||'').split(',').map(function(x){ return x.trim(); }).indexOf(내이름)>=0; }).map(function(t){ return [t.name,Math.round((t.progress||0)*100),날글(t.start),날글(t.end),t.id,pid]; });
      el.ir.tasks.forEach(function(t){ 고[pid+'|'+t.id]={progress:Math.round((t.progress||0)*100),start:날글(t.start),end:날글(t.end)}; });
      if(w.__lab32업무그림) w.__lab32업무그림(); }catch(e){} }
  function 준비(pid){ if(간트[pid]) return 간트[pid];
    return 간트[pid]=부품().then(function(){ return fetch('/api/projects/'+pid+'/gantt').then(function(r){ return r.json(); }); }).then(function(b){
      var el=d.createElement('plot-line'); el.className='lab32간트'; el.setAttribute('storage-key','lab32:'+pid); el.setAttribute('detail-placement','center'); d.body.appendChild(el);
      el.people=b.people||[]; el.data=꼴(b);
      return new Promise(function(ok){ var n=0; (function 봄(){ if(el.ir&&el.shadowRoot||++n>100) ok(el); else setTimeout(봄,30); })(); }).then(function(el){
        /* 팝업만 보이게 — 간트 몸통 숨김 · 바탕 투명 */
        /* 숨김 스타일은 열 때마다 확인(간트가 다시 그리면 shadow 안을 통째로 바꿔 지워짐) */
        /* 팝업이 닫히면(.detail-drawer 사라짐) 깔개도 걷음 · 고친 값은 목록 줄에 */
        new MutationObserver(function(){ var 열=!!el.shadowRoot.querySelector('.detail-drawer'); if(열){ el.__열림=1; 숨김(el); } if(!열&&el.__열림&&h.classList.contains('lab32-팝업')){ el.__열림=0; h.classList.remove('lab32-팝업'); 다시셈(pid,el); } }).observe(el.shadowRoot,{childList:true,subtree:true});   /* 한 번 열린 뒤 닫힐 때만 걷음 */
        ['taskchange','taskmove','taskadd','taskdelete'].forEach(function(ev){ el.addEventListener(ev,function(){ 다시셈(pid,el); }); });
        return el; }); }); }
  /* + 업무 추가 — 간트 부품 addTask(실서비스와 같은 새 행) → 오늘 · 담당 나 · 이름 「새 업무」 → 바로 태스크 상세 팝업(이름 칸에 커서) */
  d.addEventListener('click',function(e){ if(!w.__복제||!e.target.closest||!h.classList.contains('lab32켬-업무추가')) return; var b=e.target.closest('tr.lab32추가 .lab32추가단추'); if(!b) return;
    e.preventDefault(); e.stopPropagation(); var pid=b.closest('tr').dataset.pid;
    준비(pid).then(function(el){ var 새=null; function 받(ev){ 새=ev.detail&&ev.detail.taskId; } el.addEventListener('taskadd',받); el.selection=new Set(); el.addTask(); el.removeEventListener('taskadd',받);
      var t=새&&el.ir.tasks.filter(function(x){ return x.id===새; })[0]; if(!t) return;
      var 오=new Date(); 오.setHours(0,0,0,0); t.name='새 업무'; t.start=오; t.end=new Date(오.getTime()); t.assignee=나()||t.assignee; t.progress=0;
      try{ el.renderPreserve(); }catch(x){} 다시셈(pid,el);
      h.classList.add('lab32-팝업'); setTimeout(function(){ 숨김(el); el.openDetail(새); setTimeout(function(){ var n=el.shadowRoot.querySelector('.detail-drawer .dd-name'); if(n){ n.focus(); n.select(); } },60); },220); }); },true);
  d.addEventListener('click',function(e){ if(!켬()||!w.__복제||!e.target.closest) return; var tr=e.target.closest('tr.lab32업무[data-tid]'); if(!tr) return;
    e.preventDefault(); e.stopPropagation(); var pid=tr.dataset.pid, tid=tr.dataset.tid;
    준비(pid).then(function(el){ h.classList.add('lab32-팝업'); requestAnimationFrame(function(){ requestAnimationFrame(function(){ 숨김(el); el.openDetail(tid); }); }); }); },true);
  function 숨김(el){ if(el.shadowRoot.querySelector('style[data-lab32]')) return; var st=d.createElement('style'); st.dataset.lab32='1';
    st.textContent=':host{background:transparent!important}.root{background:transparent!important}.root>*:not(.dd-backdrop):not(.detail-drawer){visibility:hidden!important}';
    el.shadowRoot.appendChild(st); }
})();

/* 32 줄메뉴 — 프로젝트 줄 끝 ⋯ → 위로 고정 / 고정 풀기(앱 핀 단추를 대신 누름) · 프로젝트 열기 · 간트에서 보기(앱 라우터) */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab32줄메뉴) return; w.__lab32줄메뉴=1;
  function 켬(){ return h.classList.contains('lab32켬-줄메뉴'); }
  var 점='<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>';
  var 그={핀:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>',
    열:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
    간:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h8M7 12h10M5 19h7"/></svg>'};
  var 판=null, 지금단=null;
  function 닫기(){ if(판){ 판.remove(); 판=null; } if(지금단){ 지금단.classList.remove('열림'); 지금단=null; } }
  function 길(){ var a=d.getElementById('app'); return a&&a.__vue_app__&&a.__vue_app__.config.globalProperties.$router; }
  function 아이디(tr){ var b=tr.querySelector('.pj-name-btn'), 이=b&&b.textContent.trim(), 실=w.__lab32실&&w.__lab32실(); if(!실) return null; var p=실.프.filter(function(x){ return x[0]===이; })[0]; return p&&p[3]; }
  function 붙임(){ if(!켬()||!d.querySelector('.pj-tools')) return;
    [].forEach.call(d.querySelectorAll('.pj-table tbody > tr:not(.lab32업무):not(.lab32더):not(.lab32추가)'),function(tr){ var 끝=tr.lastElementChild; if(!끝||끝.querySelector('.lab32점점')) return;
      var b=d.createElement('button'); b.type='button'; b.className='lab32점점'; b.setAttribute('aria-label','더 보기'); b.title='더 보기'; b.innerHTML=점; 끝.appendChild(b); }); }
  d.addEventListener('click',function(e){ if(!e.target.closest) return;
    var b=켬()&&e.target.closest('.lab32점점');
    if(b){ e.preventDefault(); e.stopPropagation(); if(지금단===b){ 닫기(); return; } 닫기();
      var tr=b.closest('tr'), 핀=tr.querySelector('.pj-card-pin'), 고=핀&&핀.getAttribute('aria-pressed')==='true', id=아이디(tr);
      판=d.createElement('div'); 판.className='lab32줄판'; 판.setAttribute('role','menu');
      판.innerHTML='<button type="button" data-a="핀">'+그.핀+(고?'고정 풀기':'위로 고정')+'</button><hr><button type="button" data-a="열">'+그.열+'프로젝트 열기</button><button type="button" data-a="간">'+그.간+'간트에서 보기</button>';
      var 표=tr.closest('.pj-scroll')||d.body; 표.style.position=표.style.position||'relative'; 표.appendChild(판);
      var r=b.getBoundingClientRect(), q=표.getBoundingClientRect(); 판.style.top=(r.bottom-q.top+표.scrollTop+4)+'px'; 판.style.left=(r.right-q.left-판.offsetWidth)+'px';
      b.classList.add('열림'); 지금단=b;
      판.addEventListener('click',function(ev){ var x=ev.target.closest('button[data-a]'); if(!x) return; ev.stopPropagation(); var a=x.dataset.a; 닫기();
        if(a==='핀'&&핀){ 핀.click(); setTimeout(function(){ if(w.__lab32업무그림) w.__lab32업무그림(); },150); }   /* 이름 옆 고정 핀도 바로 */ else if(a==='열'&&id&&길()) 길().push('/projects/'+id); else if(a==='간'&&id&&길()) 길().push('/projects/'+id+'?tab=gantt'); });
      return; }
    if(판&&!e.target.closest('.lab32줄판')) 닫기(); },true);
  d.addEventListener('keydown',function(e){ if(e.key==='Escape') 닫기(); });
  new MutationObserver(function(){ 붙임(); }).observe(h,{attributes:true,attributeFilter:['class']});
  var t=setInterval(function(){ 붙임(); },400); setTimeout(function(){ clearInterval(t); },10000);
  /* 표가 다시 그려지면(거름 · 정렬) 다시 붙임 */
  (function 표봄(){ var tb=d.querySelector('.pj-table tbody'); if(!tb){ return setTimeout(표봄,300); } new MutationObserver(function(){ 붙임(); }).observe(tb,{childList:true}); })();
})();

/* 1안 · 고정 항목 — 저장본프로젝트(손질/32_프로젝트/1안반영.py) · 프로젝트 화면(.pj-main · 06)에서만 */
(function(){
  var d=document, w=window; if(!w.__lab32적용||w.__lab32고정) return;
  var 번=d.documentElement.getAttribute('data-저장본번호')||decodeURIComponent(location.pathname).split('/').pop().slice(0,2);
  function 켜기(){ if(w.__lab32고정) return; if(번!=='06'&&!d.querySelector('.pj-main')) return; w.__lab32고정=1; w.__lab32적용(["도구꼴", "표꼴", "도우미꼴", "요약칸", "내업무펼침", "LNB프로젝트", "내업무뺌", "머리글자타일", "도우미여닫기", "상세연결", "업무상세팝업", "업무추가", "줄메뉴"]); }
  켜기(); var t=setInterval(function(){ 켜기(); if(w.__lab32고정) clearInterval(t); },200); setTimeout(function(){ clearInterval(t); },8000);
})();
