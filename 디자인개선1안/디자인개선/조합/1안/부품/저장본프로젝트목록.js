/* 조합 1안 · 부품/저장본프로젝트목록 — 손 부품 · 2026-10-12 · 짝 = 저장본프로젝트목록.css
   ※ 2026-10-12 손질/67_요약업무열기/1안반영.py 도 고침(요약 거름 때 업무 펼침 · 칩 거름 · 날짜 지연) — 그 앞 원본 = 손질/67_요약업무열기/원본_저장본프로젝트목록.js
   ※ 2026-10-12 손질/66_태그묶기/1안반영.py 가 고침(태그로 묶으면 묶음마다 새 목록) — 고치기 전 원본 = 손질/66_태그묶기/원본_저장본프로젝트목록.js · 이 파일을 손으로 고치면 66 원본도 같이
   45 프로젝트 카드 시안 안 3(회색 단계 · 판 꽉 · 지연 주황 · 상태 = 앱 값 · 색 점)을 모든 프로젝트 목록에.
   ■ 읽는 곳(앱 표는 숨김 · 지우지 않음):
     - 프로젝트 줄 · 차례 · 거름(진행 중 · 역할 · 태그 · 정렬 · 32 요약 거름 lab32숨김) · 고정 = 앱 표 tbody 의 프로젝트 줄(보이는 글을 그대로 읽음)
     - 프로젝트 id = 32 __lab32실(녹화 대시보드) 이름 짝 · 업무 = 녹화 /api/projects/{id}/gantt 맨 끝 업무 + 32 팝업에서 고친 값(__lab32고침) · 팝업이 연 간트(plot-line.lab32간트)가 있으면 그 값(새 업무 포함)
   ■ 누름: 이름 = 앱 이름 단추(상세) · 줄 · › = 펼침 / 접음 · 업무 줄 = 32 태스크 상세 팝업 · 업무 추가 = 32 업무 추가 · 더 보기 = 마저 펼침
     · ⋯ = 위로 고정(앱 핀) · 프로젝트 열기 · 간트에서 열기(앱 라우터) · 머리 = 앱 정렬 select · 머리 손잡이 = 칸 폭(localStorage 「pj-목록-칸폭」)
   32 팝업 · 추가는 tr.lab32업무[data-tid] · tr.lab32추가 누름을 문서에서 잡으므로 숨긴 표에 잠깐 그 줄을 만들어 누름을 넘김. */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__pjl) return; w.__pjl=1;
  var 펼침={}, 다={}, 서명='', 바쁨=false, 메뉴=null;
  var 열쇠='pj-목록-칸폭', 기본폭=[340,80,140,220,92,80], 최소폭=[200,64,96,160,72,64];
  function 폭들(){ try{ return JSON.parse(localStorage.getItem(열쇠)||'{}')||{}; }catch(e){ return {}; } }
  function 폭저장(v){ try{ localStorage.setItem(열쇠,JSON.stringify(v)); }catch(e){} }
  function 카드(){ return d.querySelector('.pj-content:has(.pj-tools) .pj-scroll section > div.overflow-x-auto'); }
  function 표(){ var c=카드(); return c&&c.querySelector(':scope > table.pj-table'); }
  function 칸들(){ var 모두=[].slice.call(d.querySelectorAll('.pj-content:has(.pj-tools) .pj-scroll section > div.overflow-x-auto')).filter(function(c){ return c.querySelector(':scope > table.pj-table'); });
    return 모두; }   /* 66 안 2 — 태그로 묶으면 묶음마다 그림(1안 은 늘) */
  function 전부(){ var o=[]; 칸들().forEach(function(c){ o=o.concat(프로젝트들(c.querySelector(':scope > table.pj-table'))); }); return o; }
  function 프줄들(t){ return [].slice.call(t.tBodies[0]?t.tBodies[0].rows:[]).filter(function(r){ return !/lab32(업무|더|추가)/.test(r.className)&&r.querySelector('.pj-name-btn'); }); }
  function 글(e){ return e?e.textContent.replace(/\s+/g,' ').trim():''; }
  function 해시(s){ var n=0; for(var i=0;i<s.length;i++) n=(n*31+s.charCodeAt(i))>>>0; return n; }
  var 타일색=[['#ecebfe','#5754d6'],['#e6f0fe','#2f6fe0'],['#e3f5ec','#15803d'],['#fdf1e3','#c26d0f'],['#fde8ef','#c0396b'],['#e6f6f9','#0e7490'],['#f1ecfd','#7c3aed']];
  var 사람색=[['#ededfd','#5754d6'],['#e7f6ee','#16794a'],['#fdf0e6','#b4541a'],['#e8f0fe','#2f6fe0'],['#f6eafd','#8b3fb8'],['#fdecef','#c0304f']];
  var 점색={완료:'#5ec79b',진행:'#82a8f4',지연:'#f09a6c',대기:'#9aa7b4',보류:'#f3c06b'};   /* 앱 업무 팝업 점(캡처 픽셀 · 추정) */
  var 앱상={done:'완료',progress:'진행',overdue:'지연',upcoming:'대기',hold:'보류'};      /* 앱 업무 표 다섯(ProjectTaskTable Ts) */
  var 꺾='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>';
  var 아래='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
  var 더하기='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
  var 점점='<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>';
  var 핀그림='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v5"/><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/></svg>';
  var 열그림='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>';
  var 간그림='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h8M7 12h10M5 19h7"/></svg>';
  var 화살='<svg class="화살" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9.5V2.5M3 5.5l3-3 3 3"/></svg>';
  /* ── 자료 ── */
  var 녹=null, 나='';
  function 녹화(){ if(녹) return 녹; var b=w.__복제; if(!b||!b.표) return null; 녹={};
    Object.keys(b.표).forEach(function(k){ var m=k.match(/^GET \/api\/projects\/([0-9a-f-]{36})\/gantt$/); if(!m) return; try{ 녹[m[1]]=JSON.parse(b.표[k][2]).tasks||[]; }catch(e){} });
    var mk=Object.keys(b.표).filter(function(k){ return /^GET \/api\/auth\/me/.test(k); })[0]; try{ 나=JSON.parse(b.표[mk][2]).name||''; }catch(e){}
    return 녹; }
  function 날(s){ if(s instanceof Date) return new Date(s.getFullYear(),s.getMonth(),s.getDate()); var b=String(s).slice(0,10).split('-'); return new Date(+b[0],+b[1]-1,+b[2]); }
  function 짧(s){ var t=날(s); return (t.getMonth()+1)+'/'+t.getDate(); }
  function 오늘(){ var n=new Date(); return new Date(n.getFullYear(),n.getMonth(),n.getDate()); }
  function 끝업(ts,부키){ var 부={}; ts.forEach(function(t){ var p=t[부키]; if(p) 부[p]=1; }); return ts.filter(function(t){ return !부[t.id]; }); }
  function 업무들(pid){ var 기=녹화()&&녹화()[pid]||[], 고=w.__lab32고침||{}, o={};
    끝업(기,'parentId').forEach(function(t){ o[t.id]={id:t.id,pid:pid,이:t.name,퍼:Math.round(Number(t.progress)||0),시:t.start,끝:t.end,담:(t.assignee||'').trim(),앱:t.status||''}; });
    /* 팝업이 연 간트가 있으면 그 값(이름 · 담당 · 상태 · 새 업무) */
    var el=d.querySelector('plot-line.lab32간트[storage-key="lab32:'+pid+'"]');
    if(el&&el.ir&&el.ir.tasks){ var 부={}; el.ir.tasks.forEach(function(t){ var p=t.parentId||t.parent; if(p) 부[p]=1; if(t.children&&t.children.length) 부[t.id]=1; });
      var 있={}; el.ir.tasks.forEach(function(t){ 있[t.id]=1; if(부[t.id]) { delete o[t.id]; return; } var 옛=o[t.id]||{};
        o[t.id]={id:t.id,pid:pid,이:t.name||옛.이,퍼:Math.round((Number(t.progress)||0)*100),시:t.start,끝:t.end,담:(t.assignee||'').trim(),앱:t.status||옛.앱||''}; });
      Object.keys(o).forEach(function(k){ if(!있[k]) delete o[k]; }); }
    else Object.keys(o).forEach(function(k){ var g=고[pid+'|'+k]; if(g){ o[k].퍼=g.progress; o[k].시=g.start; o[k].끝=g.end; } });
    return Object.keys(o).map(function(k){ return o[k]; }); }
  function 상태(t){ var 앱=앱상[t.앱]; if(true&&앱!=='완료'&&앱!=='보류'&&t.끝&&(Number(t.퍼)||0)<100&&날(t.끝)<오늘()) return '지연';   /* 67 — 날짜로 지연(앱 지연 수와 같게) */
    if(앱상[t.앱]) return 앱상[t.앱]; if(t.퍼>=100) return '완료'; if(날(t.끝)<오늘()) return '지연'; if(날(t.시)<=오늘()) return '진행'; return '대기'; }
  function 내것(t){ return !!나&&t.담.split(',').map(function(x){ return x.trim(); }).indexOf(나)>=0; }
  function 차례(t){ return ({지연:0,진행:1,대기:2,보류:3,완료:4}[상태(t)]||2)*1e7+(내것(t)?0:1)*1e6+날(t.끝).getTime()/864e5; }
  function 이번주(t){ var o=오늘(), 끝=날(t.끝), 주=new Date(o.getFullYear(),o.getMonth(),o.getDate()+((7-o.getDay())%7)); return 상태(t)!=='지연'&&끝>=o&&끝<=주; }
  function 프id(이){ var 실=w.__lab32실&&w.__lab32실(); if(!실) return null; var p=실.프.filter(function(x){ return x[0]===이; })[0]; return p&&p[3]; }
  /* ── 그림 조각 ── */
  function 타일(이){ var c=타일색[해시(이)%타일색.length], 자=(이.match(/[가-힣A-Za-z]/)||[이.charAt(0)])[0].toUpperCase(); return '<span class="타일" style="background:'+c[0]+';color:'+c[1]+'">'+자+'</span>'; }
  function 담(이){ 이=(이||'').split(',')[0].trim(); if(!이||이==='—'||이==='-') return '<span class="담 없" title="담당 없음"><i></i></span>'; var c=사람색[해시(이)%사람색.length]; return '<span class="담"><i style="background:'+c[0]+';color:'+c[1]+'">'+이.charAt(0)+'</i>'+이+'</span>'; }
  function 우칩(t){ var k=/높음|high/i.test(t)?'높':/낮음|low/i.test(t)?'낮':/긴급|urgent/i.test(t)?'높':'보'; return t?'<span class="칩 '+k+'">'+(k==='높'?'<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7.5 6 4.5l3 3"/></svg>':'')+t+'</span>':''; }
  function 원(s){ return '<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="4" fill="'+(점색[s]||'#9aa7b4')+'"/></svg>'; }
  function 칸틀(){ var 폭=폭들(), W=기본폭.map(function(x,i){ return 폭[i]||x; });
    var 이=폭[0]?폭[0]+'px':'minmax(200px,340px)', 뒤=W[1]+'px '+W[2]+'px 60px '+Math.max(40,W[3]-60)+'px '+W[4]+'px '+W[5]+'px minmax(96px,1fr)';
    return {전:이+' '+뒤, 뒤:뒤, 최소:(폭[0]||340)+W.slice(1).reduce(function(a,b){ return a+b; },0)+96+16}; }
  /* 앱 정렬 select — 값 · 방향 */
  function 정렬칸(){ var 줄=d.querySelector('.pj-content .pj-tools'); if(!줄) return null; return [].filter.call(줄.querySelectorAll('select'),function(s){ return [].some.call(s.options,function(o){ return o.value==='activity'; }); })[0]||null; }
  var 머리칸=[['이름','name'],['우선순위','priority'],['담당자',''],['진행률','progress'],['상태',''],['마감','due'],['최근 활동','activity']], 오름={name:1,due:1};
  function 머리글(){ var s=정렬칸(), v=s&&s.value;
    return '<div class="머리">'+머리칸.map(function(m,i){ var 정=m[1]&&s&&[].some.call(s.options,function(o){ return o.value===m[1]; });
      return '<span'+(i===3?' style="grid-column:span 2"':'')+(정?' data-정="'+m[1]+'"':'')+' class="'+(정&&v===m[1]?'켬':'')+(정&&!오름[m[1]]?' 내림':'')+'">'+m[0]+(정?화살:'')+(i<6?'<i class="손" data-손="'+i+'" title="끌어서 칸 폭 바꾸기"></i>':'')+'</span>'; }).join('')+'</div>'; }
  function 거름(){ var c=d.querySelector('.lab32거름칩'), t=글(c); if(true) t=t.split('·')[0];   /* 67 — 앞(요약 칸)만 봄 */
    return /지연/.test(t)?'지연':/이번 주/.test(t)?'이번주':/내 업무/.test(t)?'내':''; }
  function 잔거름(){ if(false) return ''; var 뒤=(글(d.querySelector('.lab32거름칩')).split('·')[1]||'').trim();   /* 67 — 칩(뒤) */
    return /내 업무/.test(뒤)?'내':/다른 사람/.test(뒤)?'다른':/담당 없음/.test(뒤)?'없음':/지연/.test(뒤)?'지연':/진행/.test(뒤)?'진행':''; }
  var 걸펼침={}, 앞걸글='';   /* 67 — 요약 거름이 켜진 동안의 펼침(거름이 바뀌면 비움 · 끄면 원래 펼침으로) */
  function 거름열기(){ return true&&!!거름(); }
  function 꼬리글(p){ var 목=p.업.slice().sort(function(a,b){ return 차례(a)-차례(b); }), 걸=거름();
    if(걸==='지연') 목=목.filter(function(t){ return 상태(t)==='지연'; }); else if(걸==='이번주') 목=목.filter(이번주); else if(걸==='내') 목=목.filter(내것);
    var 잔=잔거름(); if(잔==='내') 목=목.filter(내것); else if(잔==='다른') 목=목.filter(function(t){ return !!t.담&&t.담!=='—'&&!내것(t); }); else if(잔==='없음') 목=목.filter(function(t){ return !t.담||t.담==='—'; });
    else if(잔==='지연') 목=목.filter(function(t){ return 상태(t)==='지연'; }); else if(잔==='진행') 목=목.filter(function(t){ return 상태(t)==='진행'; });
    var 몇=(다[p.id]||걸)?목.length:Math.min(3,목.length), o='<div class="꼬리">';
    목.slice(0,몇).forEach(function(t){ var s=상태(t), 지=s==='지연';
      o+='<div class="줄 업" data-pid="'+p.id+'" data-tid="'+t.id+'"><span class="이름"><i class="아" title="'+s+'">'+원(s)+'</i>'+t.이+'</span><span></span><span>'+담(t.담)+'</span><span class="퍼">'+t.퍼+'%</span><span class="막대"><i style="width:'+t.퍼+'%"></i></span><span><span class="상 '+s+'">'+s+'</span></span><span class="날'+(지?' 지남':'')+'" style="grid-column:span 2">'+(t.시?짧(t.시)+' ~ '+짧(t.끝):'—')+'</span></div>'; });
    if(몇<목.length) o+='<div class="더" data-더="'+p.id+'"><i class="아">'+아래+'</i><button type="button">'+(목.length-몇)+'개 더 보기</button></div>';
    if(!걸) o+='<div class="추가" data-추가="'+p.id+'"><i class="아">'+더하기+'</i><button type="button">업무 추가</button>'+(목.length?'':'<span class="빈">아직 업무가 없어요</span>')+'</div>';
    return o+'</div>'; }
  function 프로젝트들(t){ return 프줄들(t).filter(function(r){ return !r.classList.contains('lab32숨김'); }).map(function(r){ var c=r.cells, 이=글(r.querySelector('.pj-name-btn')), id=프id(이);
      var 핀=r.querySelector('.pj-card-pin'), 고=!!(핀&&핀.getAttribute('aria-pressed')==='true');
      var 늦=parseInt(글(c[7]),10)||0, 퍼=parseInt(글(c[5]),10)||0, 업=id?업무들(id):[];
      return {r:r,이:이,id:id,고:고,우:글(c[2]).replace(/^[\^⌃]\s*/,''),담:글(c[4]),퍼:퍼,늦:늦,마:글(c[8]),활:글(c[9]),업:업}; }); }
  function 그림(강제){ if(바쁨) return; var 걸글=글(d.querySelector('.lab32거름칩')); if(걸글!==앞걸글){ 걸펼침={}; 앞걸글=걸글; } var 강=강제||서명===''; 서명='-'; var 칸=칸들(); 칸.forEach(function(c){ 그림하나(c,강); });
    [].forEach.call(d.querySelectorAll('.pjl'),function(p){ if(칸.indexOf(p.parentElement)<0) p.remove(); }); }
  function 그림하나(c,강제){ var t=c.querySelector(':scope > table.pj-table'); if(!t) return;
    var ps=프로젝트들(t), 틀=칸틀();
    var 새=JSON.stringify([ps.map(function(p){ return [p.이,p.고,p.우,p.담,p.퍼,p.늦,p.마,p.활,p.업.map(function(x){ return [x.id,x.이,x.퍼,x.시&&String(x.시),x.끝&&String(x.끝),x.담,x.앱]; })]; }),펼침,걸펼침,다,거름(),글(d.querySelector('.lab32거름칩')),(정렬칸()||{}).value,틀.전]);
    var 판=c.querySelector(':scope > .pjl');
    if(!강제&&판&&새===c.__서명) return; c.__서명=새; 바쁨=true;
    try{
      if(!판){ 판=d.createElement('div'); 판.className='pjl'; c.insertBefore(판,c.firstChild); }
      판.style.setProperty('--칸',틀.전); 판.style.setProperty('--칸뒤',틀.뒤); 판.style.minWidth=틀.최소+'px';
      var o=머리글();
      if(!ps.length) o+='<div class="빈목록">프로젝트가 없어요</div>';
      ps.forEach(function(p){ var 열=거름열기()?(p.id in 걸펼침?걸펼침[p.id]:true):p.id in 펼침?펼침[p.id]:p.업.some(function(x){ return 상태(x)==='지연'; });
        o+='<div class="묶음" data-id="'+(p.id||'')+'"><div class="줄 프" data-id="'+(p.id||'')+'"><span class="이름"><button type="button" class="펼'+(열?' 열림':'')+'" aria-label="업무 펼치기">'+타일(p.이)+꺾+'</button><b title="'+p.이.replace(/"/g,'&quot;')+'">'+p.이+'</b>'+(p.고?'<span class="핀" title="고정됨">'+핀그림+'</span>':'')+'</span><span>'+우칩(p.우)+'</span><span>'+담(p.담)+'</span><span class="퍼">'+p.퍼+'%</span><span class="막대"><i style="width:'+p.퍼+'%"></i></span><span>'+(p.늦?'<span class="상 지연">지연 '+p.늦+'건</span>':'<span class="상 정상">정상</span>')+'</span><span class="날">'+(p.마&&p.마!=='—'?p.마:'<span class="흐">—</span>')+'</span><span>'+p.활+'</span><button type="button" class="점점" aria-label="더 보기" title="더 보기">'+점점+'</button></div>'+(열&&p.id?꼬리글(p):'')+'</div>'; });
      판.innerHTML=o;
      var 이칸=판.querySelector('.프 > .이름'); if(이칸) 판.style.setProperty('--이름폭',이칸.getBoundingClientRect().width+'px');
    } finally { 바쁨=false; } }
  /* 그 묶음 꼬리만 넣고 뺌(45 — 다 다시 그리면 마우스 올림이 끊겨 타일이 한순간 보였음) */
  function 펼침바꿈(id,열){ if(거름열기()) 걸펼침[id]=열; else 펼침[id]=열; var 묶=d.querySelector('.pjl .묶음[data-id="'+id+'"]'); if(!묶) return; var 줄=묶.querySelector('.프'), 꼬=묶.querySelector(':scope > .꼬리');
    줄.querySelector('.펼').classList.toggle('열림',열); if(꼬) 꼬.remove();
    if(열){ var p=전부().filter(function(x){ return x.id===id; })[0]; if(p) 줄.insertAdjacentHTML('afterend',꼬리글(p)); }
    서명=''; 바쁨=true; setTimeout(function(){ 바쁨=false; 그림(); },0); }
  /* 숨긴 표에 잠깐 32 줄을 만들어 누름을 넘김 */
  function 넘김(html,안){ var t=표(); if(!t||!t.tBodies[0]) return; var tmp=d.createElement('tbody'); tmp.innerHTML=html; var tr=tmp.firstElementChild; t.tBodies[0].appendChild(tr); var 대=tr.querySelector(안)||tr; 대.click(); setTimeout(function(){ tr.remove(); },0); }
  function 길(){ var a=d.getElementById('app'); return a&&a.__vue_app__&&a.__vue_app__.config.globalProperties.$router; }
  function 메뉴닫기(){ if(메뉴){ 메뉴.remove(); 메뉴=null; } [].forEach.call(d.querySelectorAll('.pjl .점점.열림'),function(b){ b.classList.remove('열림'); }); }
  function 메뉴열기(b,id){ 메뉴닫기(); var p=전부().filter(function(x){ return x.id===id; })[0]; if(!p) return;
    메뉴=d.createElement('div'); 메뉴.className='pjl-메뉴'; 메뉴.setAttribute('role','menu');
    메뉴.innerHTML='<button type="button" data-a="핀">'+핀그림+(p.고?'고정 풀기':'위로 고정')+'</button><hr><button type="button" data-a="열">'+열그림+'프로젝트 열기</button><button type="button" data-a="간">'+간그림+'간트에서 열기</button>';
    d.body.appendChild(메뉴); var r=b.getBoundingClientRect(); 메뉴.style.top=Math.round(r.bottom+4)+'px'; 메뉴.style.left=Math.round(r.right-메뉴.offsetWidth)+'px'; b.classList.add('열림');
    메뉴.addEventListener('click',function(ev){ var x=ev.target.closest('button[data-a]'); if(!x) return; ev.stopPropagation(); var a=x.dataset.a; 메뉴닫기();
      if(a==='핀'){ var 핀=p.r.querySelector('.pj-card-pin'); if(핀) 핀.click(); } else if(a==='열'&&길()) 길().push('/projects/'+id); else if(a==='간'&&길()) 길().push('/projects/'+id+'?tab=gantt'); }); }
  d.addEventListener('click',function(e){ if(!e.target.closest) return; var 판=e.target.closest('.pjl');
    if(메뉴&&!e.target.closest('.pjl-메뉴')&&!e.target.closest('.pjl .점점')) 메뉴닫기();
    if(!판) return;
    var 머=e.target.closest('.머리 > span[data-정]'); if(머&&!e.target.closest('.손')){ var s=정렬칸(), v=머.dataset.정; if(s&&s.value!==v){ var 넣=Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value').set; 넣.call(s,v); s.dispatchEvent(new Event('input',{bubbles:true})); s.dispatchEvent(new Event('change',{bubbles:true})); } return; }
    var 점=e.target.closest('.점점'); if(점){ e.stopPropagation(); var id0=점.closest('.프').dataset.id; if(점.classList.contains('열림')) 메뉴닫기(); else 메뉴열기(점,id0); return; }
    var 프=e.target.closest('.프');
    if(프){ var id=프.dataset.id; if(e.target.closest('.이름 b')){ var p=전부().filter(function(x){ return x.id===id; })[0], nb=p&&p.r.querySelector('.pj-name-btn'); if(nb) nb.click(); return; }
      if(id) 펼침바꿈(id,!프.querySelector('.펼').classList.contains('열림')); return; }
    var 업=e.target.closest('.업'); if(업){ 넘김('<tr class="lab32업무" data-pid="'+업.dataset.pid+'" data-tid="'+업.dataset.tid+'"><td><span>.</span></td></tr>','span'); return; }
    var 더=e.target.closest('.더'); if(더){ 다[더.dataset.더]=true; 펼침바꿈(더.dataset.더,true); return; }
    var 추=e.target.closest('.추가'); if(추){ 넘김('<tr class="lab32추가" data-pid="'+추.dataset.추가+'"><td><button type="button" class="lab32추가단추">+</button></td></tr>','.lab32추가단추'); return; }
  });
  d.addEventListener('keydown',function(e){ if(e.key==='Escape') 메뉴닫기(); });
  w.addEventListener('scroll',function(e){ if(메뉴&&!메뉴.contains(e.target)) 메뉴닫기(); },true);
  /* 칸 폭 끌기 */
  d.addEventListener('mousedown',function(e){ var 손=e.target.closest&&e.target.closest('.pjl .머리 .손'); if(!손) return; e.preventDefault(); e.stopPropagation();
    var i=+손.dataset.손, 칸=손.parentElement, x0=e.clientX, w0=칸.getBoundingClientRect().width; 손.classList.add('끄는중'); h.classList.add('pjl-끄는중');
    function 움(ev){ var 폭=폭들(); 폭[i]=Math.max(최소폭[i],Math.round(w0+ev.clientX-x0)); 폭저장(폭); var 판=d.querySelector('.pjl'), 틀=칸틀(); if(판){ 판.style.setProperty('--칸',틀.전); 판.style.setProperty('--칸뒤',틀.뒤); 판.style.minWidth=틀.최소+'px'; var 이칸=판.querySelector('.프 > .이름'); if(이칸) 판.style.setProperty('--이름폭',이칸.getBoundingClientRect().width+'px'); } }
    function 놓(){ d.removeEventListener('mousemove',움,true); d.removeEventListener('mouseup',놓,true); 손.classList.remove('끄는중'); h.classList.remove('pjl-끄는중'); 서명=''; 그림(); }
    d.addEventListener('mousemove',움,true); d.addEventListener('mouseup',놓,true); },true);
  w.__pj목록칸폭초기화=function(){ try{ localStorage.removeItem(열쇠); }catch(e){} 서명=''; 그림(); };
  w.__pj목록그림=function(){ 서명=''; 그림(); };
  w.addEventListener('resize',function(){ var 판=d.querySelector('.pjl'), 이칸=판&&판.querySelector('.프 > .이름'); if(이칸) 판.style.setProperty('--이름폭',이칸.getBoundingClientRect().width+'px'); });
  /* 2026-10-12 사용자 「업무 눌러서 딤드 팝업 열릴 때 딤드된 부분이 좌측이랑 상단에 저렇게 나오던데」 — 이 화면(복제)은 바깥 우리 화면(GNB · 왼쪽 아이콘 줄)의 본문 칸 안 iframe 이라
     팝업 딤드(간트 .dd-backdrop rgba(15,15,20,.32))가 iframe 밖 GNB · 아이콘 줄엔 못 닿음(실측: iframe inset -42 0 0 -68 · 바깥 칸이 자름) → 팝업(html.lab32-팝업) 동안 바깥 문서에 같은 색 딤드 · iframe 칸 자리는 구멍(겹쳐 두 번 어두워지지 않게) */
  var 바깥=null;
  function 바깥딤드(켬){ try{ var f=w.frameElement, 칸=f&&f.parentElement, pd=칸&&칸.ownerDocument; if(!pd) return;
      if(!바깥||!바깥.isConnected){ 바깥=pd.createElement('div'); 바깥.setAttribute('aria-hidden','true'); 바깥.style.cssText='position:fixed;pointer-events:none;z-index:2147482000;border-radius:0;box-shadow:0 0 0 200vmax rgba(15,15,20,.32);opacity:0;transition:opacity .15s ease;'; pd.body.appendChild(바깥); }
      var r=칸.getBoundingClientRect(); 바깥.style.left=r.left+'px'; 바깥.style.top=r.top+'px'; 바깥.style.width=r.width+'px'; 바깥.style.height=r.height+'px';
      바깥.style.opacity=켬?'1':'0'; }catch(e){} }
  new MutationObserver(function(){ 바깥딤드(h.classList.contains('lab32-팝업')); }).observe(h,{attributes:true,attributeFilter:['class']});
  setInterval(function(){ 그림(); },400); 그림();
})();
