/* 조합 1안 · 부품/저장본부품 — 손질/18_전체페이지/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-05
   자동화 · 분석 부품(LNB 핵심 버튼 · 묶음 머리 · 주색 · 콘텐츠 꼴 · 화면 전환 촤르륵)을 저장본 화면에. 손질후 저장본얹기() 가 저장본(html.lab-저장본)에만 얹음.
   켠 항목: LNB 제목(메뉴 이름) · 묶음 머리, 줄(자동 실행 · 수동 실행 꼴) · 핵심 버튼 · LNB 칸 고르기 · 회색 칸(보기 전환 꼴) · 핵심 범위 · 기본(이메일 · 프로젝트 · 채팅) · 핵심 첫 버튼 · 타일(자동화와 같게) · 주색(1안 인디고, 고른 주색 따라감) · 본문 머리(제목 16/600, 선) · 거르기 → 탭 · 보기 전환(회색 칸) · 글자 단추 · 검색, 고르기 칸 · 카드, 구역 · 표 머리 · 머리 아이콘 단추 · 주 단추 · 연하게(자동화 만들기 색) · 콘텐츠 바탕 · 연회색(자동화 #fcfcfe) · 화면 전환 촤르륵(자동화 · 분석과 같은 값) · 연동 계정 · 배경 없음 + 초록 사용중 */

/* 18 전체 페이지 엔진 — 저장본 화면 하나에 한 번. 요소를 찾아 lab18-* 표시 · 핵심 버튼 묶음 · LNB 제목을 만들고, __lab18적용(항목들) 로 html 클래스만 갈아 끼움 */
(function(){
  var d=document, w=window; if(w.__lab18적용) return;
  var 파일=decodeURIComponent(location.pathname).split('/').pop(), 번호=파일.slice(0,2);
  var 메뉴={'01':'AI 채팅','02':'협업','03':'지식/문서','04':'이메일','06':'프로젝트','08':'관리','09':'시스템'}[번호]||'';
  var A=d.querySelector('aside[class*="gnb-panel-bg"]'); if(!A) return; var B=A.nextElementSibling;
  function 표(e,c){ if(e) e.classList.add(c); return e; }
  function 모두(root,s,c){ if(!root) return []; var r=[].slice.call(root.querySelectorAll(s)); r.forEach(function(e){ e.classList.add(c); }); return r; }
  function 바(e){ return getComputedStyle(e).backgroundColor; }
  function 칠함(e){ var c=바(e); return !(c==='rgba(0, 0, 0, 0)'||c==='transparent'); }
  function 어둠(e){ var m=바(e).match(/[\d.]+/g); if(!m||(m.length>3&&+m[3]===0)) return false; return (+m[0]+ +m[1]+ +m[2])/3<90; }
  function 흰(e){ return 바(e)==='rgb(255, 255, 255)'; }
  function 글로(root,s,글){ return [].filter.call((root||d).querySelectorAll(s),function(e){ return e.textContent.replace(/\s+/g,' ').trim()===글; })[0]; }
  function 보임(e){ return e && e.getClientRects().length>0; }

  /* LNB 제목 — 머리 줄(접기 단추 줄)에 메뉴 이름 */
  var 머리줄=A.querySelector('header[class*="h-[28px]"]');
  if(머리줄&&메뉴){ var t=d.createElement('span'); t.className='lab18-LNB제목'; t.textContent=메뉴; 머리줄.appendChild(t); }
  /* 관리 · 시스템 LNB 맨 위 「설정」 — LNB 제목과 겹쳐 뺌 */
  if(번호==='08'||번호==='09'){ var h=A.querySelector('div.shrink-0 > h2'); 표(h,'lab18-설정머리'); }

  /* 핵심 버튼 — [글, 그림, 누르면 누를 원래 요소] · 원래 주 행동 단추는 lab18-원래핵심(핵심 켜면 숨김) */
  var 그림={
    펜:'<path d="M12.6 4.4l3 3L7.3 15.7l-3.6.6.6-3.6z"/><path d="M11 6l3 3"/>',
    봉투:'<rect x="3" y="5" width="14" height="10.5" rx="2"/><path d="M3.6 6.4 10 11l6.4-4.6"/>',
    새채팅:'<path d="M4 6a2.5 2.5 0 0 1 2.5-2.5h7A2.5 2.5 0 0 1 16 6v4.5a2.5 2.5 0 0 1-2.5 2.5H9.2L6 15.8V13A2.5 2.5 0 0 1 4 10.5z"/><path d="M10 6.2v4.3M7.85 8.35h4.3"/>',
    돋보기:'<circle cx="9" cy="9" r="5"/><path d="m16 16-3.4-3.4"/>',
    별:'<path d="M9.5 3.5l1.6 3.9 3.9 1.6-3.9 1.6-1.6 3.9-1.6-3.9L4 9l3.9-1.6z"/><path d="M15.3 13.4l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z"/>',
    채널:'<path d="M8 4 6.6 16M13.4 4 12 16M4.4 7.6h11.8M3.8 12.4h11.8"/>',
    새문서:'<path d="M11.5 3h-5A1.5 1.5 0 0 0 5 4.5v11A1.5 1.5 0 0 0 6.5 17h7a1.5 1.5 0 0 0 1.5-1.5V6.5z"/><path d="M11.5 3v3.5H15M10 9.2v4.6M7.7 11.5h4.6"/>',
    개인:'<circle cx="10" cy="7" r="3"/><path d="M4.5 16.5c.8-3 3-4.5 5.5-4.5s4.7 1.5 5.5 4.5"/>',
    공유:'<circle cx="7.5" cy="7.5" r="2.6"/><circle cx="13.6" cy="8.6" r="2.1"/><path d="M3 16c.6-2.6 2.4-4 4.5-4s3.9 1.4 4.5 4"/><path d="M12.8 12.3c1.8-.2 3.4.9 4 3.2"/>',
    내설정:'<path d="M4 6h7M15 6h1M4 14h1M9 14h7"/><circle cx="13" cy="6" r="2"/><circle cx="7" cy="14" r="2"/>',
    조직:'<rect x="4" y="3.5" width="9" height="13" rx="1.5"/><path d="M13 8h2.4a1 1 0 0 1 1 1v7.5H13M7 7h3M7 10h3M7 13h3"/>',
    시스템:'<rect x="3.5" y="4" width="13" height="5" rx="1.5"/><rect x="3.5" y="11" width="13" height="5" rx="1.5"/><path d="M6.5 6.5h.01M6.5 13.5h.01"/>',
    올림:'<path d="M10 12.5V4M6.6 7.4 10 4l3.4 3.4"/><path d="M4 12v2.5A1.5 1.5 0 0 0 5.5 16h9a1.5 1.5 0 0 0 1.5-1.5V12"/>',
    새판:'<rect x="3.2" y="3.2" width="13.6" height="13.6" rx="2.6"/><path d="M10 6.8v6.4M6.8 10h6.4"/>'
  };
  function 그려(p){ return '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>'; }
  function 핵심(목록,원래,붙여,원래있음){
    var 칸=A.querySelector('div[class*="overflow-y-auto"]'); if(!칸) return;
    var 묶음=d.createElement('div'); 묶음.className='lab18-핵심묶음'+(붙여?' lab18-붙여':'')+(원래있음?' lab18-원래있음':'');
    목록.forEach(function(x){ var b=d.createElement('button'); b.type='button'; b.className='lab18-핵심'; b.innerHTML='<span class="lab18-타일">'+그려(그림[x[1]])+'</span><span class="lab18-글">'+x[0]+'</span>';
      b.addEventListener('click',function(){ var 대상=x[2]&&x[2](); if(대상) 대상.click(); }); 묶음.appendChild(b); });
    칸.insertBefore(묶음,칸.firstChild); (원래||[]).forEach(function(e){ 표(e,'lab18-원래핵심'); if(원래있음) 표(e,'lab18-원래있음'); });
  }
  /* LNB 칸 고르기 → 핵심 버튼 꼴 묶음(켜진 칸 = 원래 켜진 칸 · 누르면 원래 칸을 누름) · 원래 칸은 lab18-세그원래(회색 칸 꼴은 그 칸을 칠함) */
  function 세그(칸,그림표,넣을곳,앞,설정){ if(!칸) return; 표(칸,'lab18-세그원래'); var 묶음=d.createElement('div'); 묶음.className='lab18-세그묶음'+(설정?' lab18-세그설정':'');
    [].forEach.call(칸.querySelectorAll(':scope > button'),function(b){ var 글=b.textContent.trim(), 켬=/is-active|bg-\[var\(--color-white\)\]/.test(b.className)||바(b)==='rgb(255, 255, 255)';
      if(켬) b.classList.add('lab18-켬');
      var n=d.createElement('button'); n.type='button'; n.className='lab18-핵심'+(켬?' lab18-켬':''); n.innerHTML='<span class="lab18-타일">'+그려(그림[그림표[글]||'새판'])+'</span><span class="lab18-글">'+글+'</span>';
      n.addEventListener('click',function(){ [].forEach.call(묶음.children,function(x){ x.classList.toggle('lab18-켬',x===n); }); [].forEach.call(칸.querySelectorAll(':scope > button'),function(x){ x.classList.toggle('lab18-켬',x===b); }); b.click(); });
      묶음.appendChild(n); });
    넣을곳.insertBefore(묶음,앞); }
  if(번호==='03'){ var 칸03=A.querySelector('.px-segment'), 스03=A.querySelector('div[class*="overflow-y-auto"]'); 세그(칸03,{'개인':'개인','공유':'공유'},스03,스03&&스03.firstChild); 표(칸03&&칸03.parentNode,'lab18-세그원래칸'); }
  if(번호==='08'||번호==='09'){ var 칸08=A.querySelector('div.shrink-0 > div[class*="p-[3px]"]'); if(칸08) 세그(칸08,{'내 설정':'내설정','조직':'조직','AI':'별','시스템':'시스템'},칸08.parentNode,칸08,1); }
  if(번호==='01'){ var 첫묶음=A.querySelector('.lnb-group:not(.pinned):not(.groups):not(.history)'), 제목칸=A.querySelector('div[class*="overflow-y-auto"] > div[class*="mb-[12px]"]');
    핵심([['새 채팅','새채팅',function(){ return 글로(A,'button.px-lnb-row','새 채팅'); }]],[첫묶음,제목칸],0,1); }   /* 채팅 검색은 뺌(사용자 2026-10-05 「채팅 검색 없어도 되고」) — LNB 머리 줄 돋보기가 같은 일 */
  if(번호==='02') 표(A.querySelector('.px-lnb-stack > .px-lnb-group'),'lab18-협업숨김');   /* 사용자 2026-10-05 「협업에서는 AI 직원 그냥 숨겨놔줘」 — 핵심 버튼 켜면 숨김 */
  /* 협업(02) — 핵심 버튼 없음: AI 직원 · 새 채널은 원래 버튼이 아니었음(사용자 2026-10-05) · 판 판/굽기_*_묶음전.py */
  if(번호==='03') 핵심([['새 문서','새문서',function(){ return 글로(B,'button.px-btn-text','새 파일'); }],['업로드','올림',function(){ return 글로(B,'button.px-btn-text','업로드'); }]],[]);
  if(번호==='04'){ var 쓰기=글로(A,'button','메일 쓰기'), 내게=글로(A,'button','내게 쓰기');
    핵심([['메일 쓰기','펜',function(){ return 쓰기; }],['내게 쓰기','봉투',function(){ return 내게; }]],[쓰기&&쓰기.parentNode],0,1); }
  if(번호==='06'){ var 새=글로(A,'button','새 프로젝트'); 핵심([['새 프로젝트','새판',function(){ return 새; }]],[새],1,1); }

  /* 묶음 머리 · 줄 — 화면마다 머리(줄 하나) · 머리 글 · 꺾쇠 · 묶음 머리 + 단추 · 줄 */
  function 묶음머리(머리,글,꺾쇠){ 표(머리,'lab18-묶음머리'); 표(글||머리,'lab18-묶음글'); 표(꺾쇠,'lab18-꺾쇠');
    var 곳=글||머리; if(곳&&!곳.querySelector('.lab18-새꺾쇠')){ var 새=d.createElement('span'); 새.className='lab18-새꺾쇠'; 새.innerHTML='<svg viewBox="0 0 16 16"><path d="M4.6 6.4h6.8L8 10.2z" fill="currentColor"/></svg>';   /* 자동화 ▾ 그대로 */
      var 단추=[].filter.call(곳.children,function(x){ return x.tagName==='BUTTON'; })[0]; 곳.insertBefore(새,단추||null); }
    if(머리) [].forEach.call(머리.querySelectorAll('button'),function(b){ if(b!==글&&!b.contains(글)&&b.querySelector('svg')&&!b.textContent.trim()) 표(b,'lab18-묶음더함'); }); }
  /* 저장본 공통 묶음 머리(.px-lnb-section — 채팅 · 협업 · 프로젝트 · 관리 · 시스템) */
  [].forEach.call(A.querySelectorAll('.px-lnb-section'),function(sec){ var 머리=sec.parentNode.classList.contains('px-lnb-section-head')?sec.parentNode:sec;
    묶음머리(머리,sec,sec.querySelector('.px-lnb-section-caret')||sec.querySelector('svg'));
    [].forEach.call(sec.querySelectorAll(':scope > svg'),function(g){ if(!g.classList.contains('lab18-꺾쇠')) 표(g,'lab18-묶음그림'); }); });
  /* 맨 위 글 머리(h2 — 채팅 「채팅 메뉴」 · 지식 「폴더」 · 이메일 「연동 계정」) */
  [].forEach.call(A.querySelectorAll('div[class*="overflow-y-auto"] > div[class*="mb-[12px]"]'),function(h){ var t=h.querySelector('h2'); if(t) 묶음머리(h,t,null); });
  if(번호==='01'){ 모두(A,'.lnb-group.px-lnb-group','lab18-틈0'); 모두(A,'.lnb-group.px-lnb-group','lab18-묶음위12'); 모두(A,'.sidebar-list','lab18-줄목록3'); 모두(A,'.group-row','lab18-줄30'); }
  if(번호==='02'){ 모두(A,'.px-lnb-group','lab18-틈0'); 모두(A,'.px-lnb-group','lab18-위0'); 표(A.querySelector('.px-lnb-stack'),'lab18-틈12'); 모두(A,'.px-lnb-stack > section','lab18-틈12'); }
  if(번호==='04'){ 표(A.querySelector('div[class*="overflow-y-auto"] > div[class*="mt-[6px]"]'),'lab18-위0');
    [].forEach.call(A.querySelectorAll('button span'),function(t){ if(t.textContent.trim()!=='사용중') return; var b=t.closest('button'); 표(b,'lab18-계정'); 표(t,'lab18-계정표'); if(b&&!b.title) b.title='사용 중인 계정'; var 글=b&&b.querySelector('span'); if(글) b.setAttribute('data-lab18-첫',(글.textContent.trim()[0]||'').toUpperCase()); }); }
  if(번호==='04'){ var 칸04=A.querySelector('div[class*="mt-[26px]"]'); 표(칸04,'lab18-묶음칸');
    var 함=칸04&&칸04.querySelector('div[class*="h-[26px]"]'); if(함){ var 함글=함.querySelector('button'); 묶음머리(함,함글,함글&&함글.querySelector('svg')); }
    표(칸04&&칸04.querySelector('nav'),'lab18-줄목록');
    [].forEach.call(A.querySelectorAll('nav > button, div[class*="mt-[6px]"] > button'),function(b){ 표(b,'lab18-줄'); }); }

  /* ── 본문 ── */
  if(!B) return 끝();
  /* 주 단추 — 본문에서 저장본 주색(p-500 #2563eb)으로 칠한 단추 */
  [].forEach.call(B.querySelectorAll('button,a'),function(e){ if(바(e)==='rgb(37, 99, 235)') e.classList.add('lab18-주단추'); });
  모두(B,'.tb-btn, .px-btn-text','lab18-글단추'); 모두(B,'.tb-divider, .px-btn-text-divider','lab18-가름');
  /* 보기 전환 — 켠 칸 = 흰 바탕 */
  function 보기(c){ if(!c) return; c.classList.add('lab18-보기'); [].forEach.call(c.children,function(b){ if(b.tagName!=='BUTTON') return; b.classList.add('lab18-보기칸'); if(흰(b)) b.classList.add('lab18-켬'); }); }
  [].forEach.call(B.querySelectorAll('.view-toggle, .pj-view-seg'),보기); var 분할=B.querySelector('.seg-item'); if(분할) 보기(분할.parentNode);
  /* 거르기 → 탭 */
  function 탭묶음(c,켬인가,작은){ if(!c) return; c.classList.add('lab18-탭묶음'); [].forEach.call(c.querySelectorAll('button'),function(b){ b.classList.add('lab18-탭'); if(작은) b.classList.add('lab18-작은탭'); if(켬인가(b)) b.classList.add('lab18-켬'); }); }
  var 알약=B.querySelector('button[class*="rounded-full"]'); if(알약&&번호==='04') 탭묶음(알약.parentNode,어둠);
  탭묶음(B.querySelector('.px-settings-toolbar div[class*="inline-flex"][class*="overflow-hidden"]'),칠함);
  탭묶음(B.querySelector('.prism-segment'),function(b){ return /--active/.test(b.className); },1);
  /* 저장본은 스크립트가 없어 눌러도 안 바뀜 — 탭 · 보기 칸은 눌러 켠 칸만 옮김(모양 보기용) */
  B.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.lab18-탭, .lab18-보기칸'); if(!b) return;
    [].forEach.call(b.parentNode.children,function(x){ x.classList.toggle('lab18-켬',x===b); }); });
  /* 검색 · 고르기 칸 */
  [].forEach.call(B.querySelectorAll('input'),function(e){ if(보임(e)&&/^(text|search|)$/.test(e.getAttribute('type')||'')) e.classList.add('lab18-칸'); });
  모두(B,'select.pj-pill','lab18-칸'); 모두(B,'.px-settings-toolbar > div.relative > button[class*="border"]','lab18-칸');
  /* 카드 · 구역 */
  모두(B,'.px-settings-card','lab18-카드'); 모두(B,'.px-settings-tile','lab18-작은카드'); 모두(B,'.condition-block','lab18-안칸');
  모두(B,'[class*="rounded-[10px]"][class*="border"], [class*="rounded-[15px]"][class*="border"]','lab18-카드');
  [].forEach.call(B.querySelectorAll('div[class*="rounded-lg"][class*="bg-white"]'),function(e){ if(e.querySelector('table')) e.classList.add('lab18-카드'); });
  모두(B,'.px-settings-section-title','lab18-구역제목'); 모두(B,'.px-settings-tile [class*="text-[24px]"], .condition-block [class*="text-[24px]"]','lab18-큰숫자');
  모두(B,'table','lab18-표');
  /* 머리 아이콘 단추 */
  모두(B,'.px-head-ico, .ax-ico-btn','lab18-아이콘단추');
  /* 본문 머리 · 도구 줄 · 바탕 — 화면마다 */
  if(번호==='01'){ var h1=B.querySelector('header.conversation-head'); 표(h1,'lab18-머리'); 표(B.querySelector('.title-button'),'lab18-제목'); }
  if(번호==='02'){ var h2=B.querySelector('div[class*="h-[41px]"]'); 표(h2,'lab18-머리'); 표(h2,'lab18-높이그대로'); 표(h2&&h2.querySelector('h1'),'lab18-제목'); }
  if(번호==='03'){ var h3=B.querySelector('div[class*="h-[41px]"]'); 표(h3,'lab18-머리'); 표(h3&&h3.querySelector('span[class*="font-medium"]'),'lab18-제목');
    모두(h3,'button','lab18-아이콘단추'); var 큰=B.querySelector('.knowledge-main h1'); 표(큰&&큰.parentNode,'lab18-큰제목');
    표(B.querySelector('.selection-toolbar-row'),'lab18-도구줄안'); 표(B.querySelector('.knowledge-main div[class*="overflow-y-auto"][class*="px-[30px]"]'),'lab18-바탕'); }
  if(번호==='04'){ var h4=B.querySelector(':scope > header'); 표(h4,'lab18-머리'); 표(h4,'lab18-붙음'); 표(h4&&h4.querySelector('h1'),'lab18-제목'); 모두(h4,'button','lab18-아이콘단추');
    표(h4&&h4.nextElementSibling,'lab18-도구줄'); }
  if(번호==='06'){ var h6=B.querySelector('nav.ax-crumb'); 표(h6,'lab18-머리'); 표(h6,'lab18-붙음'); 표(B.querySelector('.ax-crumb-cur'),'lab18-제목'); 표(B.querySelector('.pj-tools'),'lab18-도구줄'); 표(B.querySelector('.pj-scroll'),'lab18-바탕'); }
  if(번호==='08'||번호==='09'){ 표(B.querySelector('.prism-page-title'),'lab18-쪽제목'); 표(B.querySelector('.prism-page-header p'),'lab18-쪽설명');
    표(번호==='08'?B.querySelector('.px-settings-page'):B,'lab18-바탕'); }
  /* ── 화면 전환 촤르륵 — 1안 부품 「전환」(조합/1안/부품/전환.js)과 같은 값 · 같은 부르개. 그 엔진은 우리 마크업(.page-hd · .head-zone · .content · LNB .channel-text-demo)만 잡아 저장본엔 못 써서
     저장본용으로 모으기만 새로: 머리 = 본문 머리 · 도구 줄 · 쪽 머리 / 내용 = 본문을 크기로 벗겨 내려가 덩이(왼쪽 좁고 높은 칸 = 목록 칸은 안으로 · 오른쪽 좁고 높은 칸 = 패널, 옆에서) / LNB 줄 = 묶음 머리 · 줄(핵심 버튼 묶음은 뺌) ── */
  (function(){
    var R=d.documentElement;
    var l=d.createElement('link'); l.rel='stylesheet'; l.href='/prixm-screens/디자인개선1안/디자인개선/조합/1안/부품/전환.css?b='+Date.now(); d.head.appendChild(l);   /* 값(--전환-*)만 씀 — 규칙은 우리 마크업용이라 저장본엔 안 걸림 */
    if(!w.gsap){ var k=d.createElement('script'); k.src='/prixm-screens/디자인개선1안/디자인개선/_라이브러리/gsap-3.15.0/gsap.min.js'; d.head.appendChild(k); }
    function 값(n,기){ var v=getComputedStyle(R).getPropertyValue('--전환-'+n).trim(); return v===''?기:v; }
    function 수(n,기){ var v=parseFloat(값(n,'')); return isNaN(v)?기:v; }
    function 설정(){ return { 시간:수('시간',.3), 시차:수('시차',.015), 거리:수('거리',10), 이징:값('이징','power2.out'), 시작투명:수('시작투명',.3), LNB줄:값('LNB줄','1')==='1',
      LNB시차:수('LNB시차',.01), LNB이징:값('LNB이징','power2.out'), 줄임:matchMedia('(prefers-reduced-motion: reduce)').matches }; }
    function 켬(){ return R.classList.contains('lab18켬-전환')&&!!w.gsap; }
    function 보여(e){ var r=e.getBoundingClientRect(); return r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight; }
    function 자식들(el){ return [].filter.call(el.children,function(x){ return !/^(SCRIPT|STYLE|TEMPLATE|svg)$/i.test(x.tagName)&&보여(x); }); }
    function 글있음(x){ return [].some.call(x.childNodes,function(t){ return t.nodeType===3&&t.textContent.trim(); }); }
    /* 테두리 · 그림자 있는 상자는 통째로 — 안쪽만 내려오면 상자 위에 흰 띠(10px)가 보임(2026-10-06 사용자 「프로젝트에서 애니메이션 동작할 때 흰색 라인」 · 표 상자 .rounded-[10px].border 안의 table 만 움직였음) */
    function 상자(x){ var c=getComputedStyle(x); return (parseFloat(c.borderTopWidth)>0&&!/rgba\(.*, 0\)$/.test(c.borderTopColor))||c.boxShadow!=='none'; }
    function 모으기(){
      var 머리=[].filter.call(B.querySelectorAll('.lab18-머리, .lab18-도구줄, .prism-page-header, .px-settings-toolbar'),보여), 내용=[], 패널=[];
      var br=B.getBoundingClientRect(), W=br.width, H=Math.min(br.height,innerHeight-br.top);
      (function 펼침(el,깊이){ 자식들(el).forEach(function(x){
        if(머리.indexOf(x)>=0) return;
        var 자=자식들(x);
        if(머리.some(function(h){ return x.contains(h); })){ if(깊이<8) 펼침(x,깊이+1); return; }
        var r=x.getBoundingClientRect();
        if(W>700&&r.width<W*.4&&r.height>H*.6){ if(r.left>br.left+W*.5){ 패널.push(x); return; } if(깊이<8&&자.length){ 펼침(x,깊이+1); return; } }
        if(상자(x)&&r.height<H*.9){ 내용.push(x); return; }
        if(깊이<8&&자.length&&!글있음(x)&&(자.length===1||(r.height>H*.5&&자.length>=2))){ 펼침(x,깊이+1); return; }
        내용.push(x); }); })(B,0);
      var LNB=[].filter.call(A.querySelectorAll('.lab18-묶음머리, .px-lnb-row, .lab18-줄, ul > li > a, .group-row, .k-folder-row, div.px-segment, div[class*="rounded-[6px]"][class*="p-[3px]"]'),function(e){ return 보여(e)&&!e.closest('.lab18-핵심묶음'); });
      LNB=LNB.filter(function(e){ return !LNB.some(function(o){ return o!==e&&o.contains(e); }); });
      var 선=머리.filter(function(e){ var cs=getComputedStyle(e), c=(cs.borderBottomColor.match(/[\d.]+/g)||[]).map(Number); return parseFloat(cs.borderBottomWidth)>0&&!(c.length>3&&c[3]===0)&&!(c[0]===255&&c[1]===255&&c[2]===255); });
      return {머리:머리,내용:내용,패널:패널,LNB:LNB,선:선};
    }
    function 차례(els){ return els.slice().sort(function(a,b){ var p=a.getBoundingClientRect(), q=b.getBoundingClientRect(); return Math.abs(p.top-q.top)>4?p.top-q.top:p.left-q.left; }); }
    function 선정리(els){ (els||[]).forEach(function(e){ e.classList.remove('lab18-전환선'); e.style.removeProperty('--전환선색'); e.style.removeProperty('--전환선'); if(e.__선위치){ e.style.removeProperty('position'); e.__선위치=0; } }); }
    function 정리(els){ gsap.set(els,{clearProps:'opacity,visibility,transform,translate'}); }
    var 대기=null, 지금=null, 차례표=0;
    function 짓기(정보){
      var s=설정(), g=모으기(), LNB도=s.LNB줄&&!!(정보.GNB바뀜||정보.LNB줄), 모두=g.머리.concat(g.내용,g.패널,LNB도?g.LNB:[]);
      var tl=gsap.timeline({defaults:{lazy:false},onComplete:function(){ 정리(모두); 선정리(g.선); R.classList.remove('lab18-전환중'); R.classList.add('등장끝'); if(지금===tl) 지금=null; }});
      R.classList.add('lab18-전환중'); R.classList.remove('등장끝');
      if(s.줄임){ tl.fromTo(모두,{autoAlpha:0},{autoAlpha:1,duration:.15,ease:'none'}); return {tl:tl,모두:모두,선:[]}; }
      g.선.forEach(function(e){ e.style.setProperty('--전환선색',getComputedStyle(e).borderBottomColor); if(getComputedStyle(e).position==='static'){ e.style.position='relative'; e.__선위치=1; } e.classList.add('lab18-전환선'); });
      if(g.선.length) tl.fromTo(g.선,{'--전환선':0},{'--전환선':1,duration:Math.min(.6,s.시간*1.5),ease:s.이징},0);
      if(LNB도&&g.LNB.length) tl.fromTo(g.LNB,{autoAlpha:0,x:-Math.max(6,s.거리)},{autoAlpha:1,x:0,duration:s.시간,ease:s.LNB이징,stagger:{each:s.LNB시차}},0);
      var 줄=차례(g.머리.concat(g.내용));
      if(줄.length) tl.fromTo(줄,{autoAlpha:s.시작투명,y:s.거리},{autoAlpha:1,y:0,duration:s.시간,ease:s.이징,stagger:function(i){ return Math.min(i,12)*s.시차; }},0);
      if(g.패널.length) tl.fromTo(g.패널,{autoAlpha:s.시작투명,x:s.거리*2},{autoAlpha:1,x:0,duration:s.시간,ease:s.이징},s.시차*2);
      return {tl:tl,모두:모두,선:g.선};
    }
    function 버림(x){ if(!x) return; x.tl.kill(); 정리(x.모두); 선정리(x.선); R.classList.remove('lab18-전환중'); }
    /* 손질후 보기() — 보이기 직전 숨김(시작 모습으로 멈춰 둠) → 보인 뒤 등장 */
    w.__전환숨김=function(정보){ if(!켬()) return; if(지금){ 지금.tl.progress(1); 지금=null; } 버림(대기); 대기=짓기(정보||{}); 대기.tl.pause(0); };
    w.__전환등장=function(정보){ var 내=++차례표; requestAnimationFrame(function(){ if(내!==차례표) return;
      if(!켬()){ 버림(대기); 대기=null; return; }
      var 미리=대기; 대기=null;
      if(미리){ 미리.tl.play(0); 지금=미리; return; }
      지금=짓기(정보||{}); }); };
  })();

  끝();
  function 끝(){
    w.__lab18적용=function(목록){ var h=d.documentElement;
      [].slice.call(h.classList).forEach(function(c){ if(c.indexOf('lab18켬-')===0) h.classList.remove(c); });
      목록.forEach(function(i){ h.classList.add('lab18켬-'+i); });
      /* 주색 — 아바타로 고른 주색(localStorage 1안-주색)을 따라가게 1안 주색 부품을 한 번 부름(고른 게 없으면 아무 일 없음) */
      if(목록.indexOf('주색')>=0&&!w.__lab18주색js){ w.__lab18주색js=1; var s=d.createElement('script'); s.src='/prixm-screens/디자인개선1안/디자인개선/조합/1안/부품/주색.js?b='+Date.now(); d.body.appendChild(s); } };
  }
})();

if (window.__lab18적용) window.__lab18적용(["제목", "묶음", "핵심", "범위원래", "첫타일", "세그회색", "주색", "머리", "탭", "보기", "글단추", "칸", "카드", "표", "아이콘", "주연", "바탕회", "전환", "계정초록"]);
