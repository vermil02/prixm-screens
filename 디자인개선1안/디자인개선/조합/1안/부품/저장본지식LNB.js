/* 조합 1안 · 부품/저장본지식LNB — 손질/28_지식LNB/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-08
   지식/문서 저장본(d03)에만: 폴더 줄 = 이메일 줄 꼴 · 그림 셋 · 그림 단추(올리면 ⌃ / ⌄ · 회색 칸) · … 흰 단추(이름은 단추 앞에서 잘림) · 잘린 이름 = LNB 오른쪽 말풍선
   · 깊어서 하위 글 칸이 40 밑이 되는 폴더는 ⌄ = 「이 폴더부터 보기」 줄 → 그 폴더가 맨 위 + 「‹ 뒤로」(직전 화면) · 이름 = 오른쪽에서 열기. 접고 펴기도 됨.
   켠 항목: 그림 · 셋(열림 / 하위 있음 = 겹친 폴더 / 하위 없음) · 줄 꼴 = 이메일 줄(그림 +11, 글 +35, 글색 rgb(29,28,29)) · 「폴더 +」 의 + = 이메일 「편지함 +」 처럼 테 없는 + · 폴더 그림 = 단추(하위 있는 폴더만 · 올리면 흰 칸으로 떠오름 · 눌러 접고 폄) · 더보기 = … 만 · 올리면 흰 단추로 떠오름(폴더 단추와 같은 꼴) · 폴더 단추를 올리면 그림 대신 화살표(펼침 = 위 · 접힘 = 아래) · 화살표 · 없음(폴더 그림 단추가 맡음) · 줄을 올리면 폴더 그림이 화살표로(회색 칸은 화살표를 올릴 때만) · 잘린 이름은 줄을 올리면 전체 이름 말풍선 · 잘린 이름 말풍선을 줄 아래 대신 LNB 오른쪽에 · 글 칸이 40 밑으로 줄기 전 단계에서 ⌄ = 오른쪽에서 열림(본문에서 열림 · LNB 엔 「오른쪽에서 열림」 줄) · ⌄ 줄 = 「이 폴더부터 보기」 단추(누르면 그 폴더가 맨 위 · ‹ 뒤로 · 경로 · 안에서 또 깊으면 같은 꼴) · 폴더 그림 단추 = 회색 칸(… 은 흰 단추 그대로) */

(function(){
  var d=document, h=d.documentElement; if(window.__lab28적용) return;
  var 닫힘="<svg class=\"lab28-\uadf8\ub9bc lab28-\ub2eb\ud798\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\"/></svg>", 열림="<svg class=\"lab28-\uadf8\ub9bc lab28-\uc5f4\ub9bc\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2\"/></svg>", 화살="<svg class=\"lab28-\ud654\uc0b4\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m6 9 6 6 6-6\"/></svg>", 겹="<svg class=\"lab28-\uadf8\ub9bc lab28-\uacb9\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 17a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.9a2 2 0 0 1-1.69-.9l-.81-1.2a2 2 0 0 0-1.67-.9H8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2Z\"/><path d=\"M2 8v11a2 2 0 0 0 2 2h14\"/></svg>", 줄="<svg class=\"lab28-\uadf8\ub9bc lab28-\uc904\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\"/><path d=\"M2 10h20\"/></svg>";
  /* 하위 칸 — 바로 뒤 묶음(div.mt-[2px]) · 맨 위(내 문서)는 뒤따르는 들여쓴 감싸개들 */
  function 아래들(r){ var 뒤=r.nextElementSibling, 감=r.parentElement; if(뒤) return [뒤]; if(감&&!감.getAttribute('style')){ var o=[], x=감.nextElementSibling; while(x&&/padding-left/.test(x.getAttribute('style')||'')){ o.push(x); x=x.nextElementSibling; } return o; } return []; }
  /* 바뀔 때만 씀 — 같은 값을 다시 쓰면 그때마다 배치를 새로 계산(100 단계 트리에서 탭이 멈춤 · 2026-10-08) */
  function 켜끔(el,c,on){ on=!!on; if(el.classList.contains(c)!==on) el.classList.toggle(c,on); }
  function 꾸미기(){
    var 옆=d.querySelector('.knowledge-page aside'); if(!옆) return;
    var 줄들=옆.querySelectorAll('.k-folder-row');
    [].forEach.call(줄들,function(r){
      var ico=r.querySelector('.px-lnb-ico');
      if(ico&&!ico.querySelector('.lab28-그림')) ico.insertAdjacentHTML('beforeend',닫힘+열림+겹+줄+화살.replace('lab28-화살','lab28-단추화살')+화살.replace('lab28-화살','lab28-화살 lab28-겹침화살'));
      if(!r.querySelector(':scope > .lab28-화살')){ var 메뉴=r.querySelector(':scope > .px-more-btn'); var t=d.createElement('i'); t.innerHTML=화살; r.insertBefore(t.firstChild,메뉴); }
      /* 가지 = 화살표(원래 caret 안 svg)가 있는 줄 · 펼침 = 아래 칸이 숨겨지지 않음 */
      var 가지=!!r.querySelector('.px-lnb-caret svg'), 아=아래들(r);
      var 펼침=가지&&아.length&&아[0].style.display!=='none';
      켜끔(r,'lab28-가지',가지); 켜끔(r,'lab28-펼침',펼침);
    });
    [].forEach.call(옆.querySelectorAll('div[style*="padding-left"]:not(.lab28-더보기줄)'),function(x){ 켜끔(x,'lab28-아래',true); });   /* 「더 보기」 줄은 폴더가 아님 */
    /* 깊이 — 감싸개 겹 수(01 = 1 · 설계 = 2 · 2026 = 3 …) · 초점 길 위 겹은 빼고 셈 · 4 이상 lab28-깊음 · 6 이상 lab28-멈춤 · 단계표는 실제 단계 */
    [].forEach.call(옆.querySelectorAll('.lab28-아래'),function(x){ var n=0, 절=0, y=x; while(y&&y!==옆){ if(y.classList&&y.classList.contains('lab28-아래')){ 절++; if(!y.classList.contains('lab28-초점길')&&!y.classList.contains('lab28-초점')) n++; } y=y.parentElement; }
      켜끔(x,'lab28-깊음',n>=4); 켜끔(x,'lab28-멈춤',n>=6);
      var r=x.querySelector(':scope > .k-folder-row'); if(r){ var 표=r.querySelector('.lab28-단계표'); if(!표){ 표=d.createElement('span'); 표.className='lab28-단계표'; var l=r.querySelector('.px-lnb-label'); l.parentNode.insertBefore(표,l.nextSibling); } var 글=(절+1)+'단계'; if(표.textContent!==글) 표.textContent=글; 켜끔(r,'lab28-단계보임',절+1>=6); } });
    [].forEach.call(옆.querySelectorAll('.k-folder-row.lab28-가지'),function(r){ if(!r.parentElement.classList.contains('lab28-아래')||r.querySelector('.lab28-여기')) return; var b=d.createElement('span'); b.className='lab28-여기'; b.title='이 폴더부터 보기'; b.innerHTML=여기그림; r.appendChild(b); });
    /* 잘림 — 먼저 다 재고(배치 계산 한 번) 그다음 바뀐 줄만 씀 */
    var 잰=[].map.call(줄들,function(r){ var l=r.querySelector('.px-lnb-label'); return l&&l.offsetParent&&l.scrollWidth>l.clientWidth+1?l.textContent.trim():null; });
    [].forEach.call(줄들,function(r,i){ var 값=잰[i]; if(값){ if(r.getAttribute('data-lab28-이름')!==값) r.setAttribute('data-lab28-이름',값); } else if(r.hasAttribute('data-lab28-이름')) r.removeAttribute('data-lab28-이름'); });
  }
  /* 깊이 시험 — 2026 을 가지로 바꿔 아래로 10 단계까지 긴 이름 폴더 · 05.첨부파일 아래 15 개 · 끄면 넣은 것만 걷음(lab28-시험) */
  function 시험(켬){
    var 옆=d.querySelector('.knowledge-page aside'); if(!옆) return;
    var 넣음=옆.querySelectorAll('.lab28-시험');
    if(!켬){ [].forEach.call(넣음,function(x){ x.remove(); }); return; }
    if(넣음.length) return;
    var 줄들=[].slice.call(옆.querySelectorAll('.k-folder-row')), 찾=function(t){ return 줄들.filter(function(r){ var l=r.querySelector('.px-lnb-label'); return l&&l.textContent.trim()===t; })[0]; };
    var 설계=찾('설계'), 끝=찾('2026'), 첨=찾('05.첨부파일'), 잎=찾('작은파일'); if(!설계||!끝||!첨||!잎||!설계.nextElementSibling) return;
    var 묶음본=설계.nextElementSibling, 캐럿=설계.querySelector('.px-lnb-caret svg');
    function 새묶음(){ var c=묶음본.cloneNode(false); c.removeAttribute('style'); c.classList.add('lab28-시험'); return c; }
    function 새줄(본,이름){ var w=본.parentElement.cloneNode(false); w.classList.add('lab28-시험'); w.style.display=''; var r=본.cloneNode(true); r.classList.remove('is-active','lab28-가지','lab28-펼침'); r.removeAttribute('data-lab28-이름'); r.querySelector('.px-lnb-label').textContent=이름; w.appendChild(r); return w; }
    var 캐복=캐럿.cloneNode(true); 캐복.classList.add('lab28-시험'); 끝.querySelector('.px-lnb-caret').appendChild(캐복);
    var 묶=새묶음(); 끝.parentNode.insertBefore(묶,끝.nextSibling);
    var 이름들=['2026 상반기 설계 검토 회의록','3월 2주차 구조 변경안 비교','고객사 피드백 반영 버전 모음','최종 승인 전 내부 검토용','디자인팀 공유 폴더(임시)','백업 · 지난 버전','아카이브'];
    이름들.forEach(function(n,i){ var 막=i===이름들.length-1, w=새줄(막?잎:설계,n); 묶.appendChild(w); if(!막){ 묶=새묶음(); w.appendChild(묶); } });
    var 첨묶=첨.nextElementSibling; if(첨묶){ for(var i=1;i<=15;i++) 첨묶.appendChild(새줄(잎,'추가 폴더 '+(i<10?'0':'')+i+(i%3===0?' — 2026 협력사 계약 자료 모음':i%3===1?' 회의록':' 견적서'))); }
  }
  /* 하위 100 개 — 05.첨부파일 아래 100 개(작은파일 줄 복제 · lab28-시험백 · 끄면 그것만 지움) */
  function 백(켬){
    var 옆=d.querySelector('.knowledge-page aside'); if(!옆) return;
    var 넣음=옆.querySelectorAll('.lab28-시험백'); if(!켬){ [].forEach.call(넣음,function(x){ x.remove(); }); return; } if(넣음.length) return;
    var 줄들=[].slice.call(옆.querySelectorAll('.k-folder-row')), 찾=function(t){ return 줄들.filter(function(r){ var l=r.querySelector('.px-lnb-label'); return l&&l.textContent.trim()===t; })[0]; };
    var 첨=찾('05.첨부파일'), 잎=찾('작은파일'); if(!첨||!잎||!첨.nextElementSibling) return; var 묶=첨.nextElementSibling;
    var 종류=['계약서','회의록','견적서','제안서','보고서','참고 자료','사진','도면','검수 결과','회계 증빙'];
    for(var i=1;i<=100;i++){ var w=잎.parentElement.cloneNode(false); w.classList.add('lab28-시험백'); w.classList.remove('lab28-넘침'); w.style.display=''; var r=잎.cloneNode(true); r.classList.remove('is-active','lab28-가지','lab28-펼침'); r.removeAttribute('data-lab28-이름'); r.querySelector('.px-lnb-label').textContent=(i<10?'00':i<100?'0':'')+i+' '+종류[i%10]; w.appendChild(r); 묶.appendChild(w); }
  }
  /* 계층 100 — 03.분량테스트를 가지로 바꿔 아래로 100 단계까지(설계 · 작은파일 줄 복제 · lab28-시험계층 · 끄면 그것만) */
  function 계층(켬){
    var 옆=d.querySelector('.knowledge-page aside'); if(!옆) return;
    var 넣음=옆.querySelectorAll('.lab28-시험계층'); if(!켬){ [].forEach.call(넣음,function(x){ x.remove(); }); return; } if(넣음.length) return;
    var 줄들=[].slice.call(옆.querySelectorAll('.k-folder-row')), 찾=function(t){ return 줄들.filter(function(r){ var l=r.querySelector('.px-lnb-label'); return l&&l.textContent.trim()===t; })[0]; };
    var 설계=찾('설계'), 밑=찾('03.분량테스트'), 잎=찾('작은파일'); if(!설계||!밑||!잎||!설계.nextElementSibling) return;
    var 묶음본=설계.nextElementSibling, 캐럿=설계.querySelector('.px-lnb-caret svg');
    var 새묶음=function(){ var c=묶음본.cloneNode(false); c.removeAttribute('style'); c.classList.add('lab28-시험계층'); return c; };
    var 새줄=function(본,이름){ var w=본.parentElement.cloneNode(false); w.className=w.className.replace(/lab28-\S+/g,'').trim(); w.classList.add('lab28-시험계층'); w.style.display=''; var r=본.cloneNode(true); r.classList.remove('is-active','lab28-가지','lab28-펼침','lab28-단계보임'); r.removeAttribute('data-lab28-이름'); [].forEach.call(r.querySelectorAll('.lab28-여기,.lab28-단계표'),function(x){ x.remove(); }); r.querySelector('.px-lnb-label').textContent=이름; w.appendChild(r); return w; };
    var 캐복=캐럿.cloneNode(true); 캐복.classList.add('lab28-시험계층'); 밑.querySelector('.px-lnb-caret').appendChild(캐복);
    var 묶=새묶음(); 밑.parentNode.insertBefore(묶,밑.nextSibling);
    for(var k=3;k<=100;k++){ var 막=k===100, w=새줄(막?잎:설계,(k<10?'00':k<100?'0':'')+k+' 단계 폴더'); 묶.appendChild(w); if(!막){ 묶=새묶음(); w.appendChild(묶); } }
  }
  /* 초점(이 폴더부터 보기) — F = 고른 폴더 감싸개 · 길(조상)은 들여쓰기 0 · 길 밖은 숨김 · 맨 위 경로 줄 */
  var 지금초점=null;
  var 뒤그림='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';
  function 뿌리(옆){ var 첫=옆.querySelector('.k-folder-row'); return 첫&&첫.parentElement&&첫.parentElement.parentElement; }
  function 초점(F){
    var 옆=d.querySelector('.knowledge-page aside'); if(!옆) return;
    [].forEach.call(옆.querySelectorAll('.lab28-초점숨김'),function(x){ x.classList.remove('lab28-초점숨김'); });
    [].forEach.call(옆.querySelectorAll('.lab28-초점길,.lab28-초점'),function(x){ x.classList.remove('lab28-초점길','lab28-초점'); });
    [].forEach.call(옆.querySelectorAll('.lab28-경로'),function(x){ x.remove(); });
    지금초점=null; if(!F||!F.isConnected) return; var 뿌=뿌리(옆); if(!뿌||!뿌.contains(F)) return;
    지금초점=F; F.classList.add('lab28-초점'); var 조상=[];
    var x=F; while(x&&x!==뿌){ var P=x.parentElement; [].forEach.call(P.children,function(c){ if(c!==x&&!c.classList.contains('lab28-경로')) c.classList.add('lab28-초점숨김'); }); if(P!==뿌){ P.classList.add('lab28-초점길'); if(P.classList.contains('lab28-아래')) 조상.unshift(P); } x=P; }
    /* 경로 줄 — ‹ (한 단계 위) · 내 문서 › … › 바로 위 두 단계 */
    var 바=d.createElement('div'); 바.className='lab28-경로';
    var 이름=function(w){ var r=w.querySelector(':scope > .k-folder-row .px-lnb-label'); return r?r.textContent.trim():''; };
    var 단추=function(글,갈곳,cls){ var b=d.createElement('button'); b.type='button'; if(cls) b.className=cls; if(글.indexOf('<svg')===0) b.innerHTML=글; else { b.textContent=글; b.title=글; } var 뒤인가=!!cls&&cls.indexOf('lab28-뒤')===0; if(뒤인가) b.title='뒤로'; b.addEventListener('click',function(e){ if(h.classList.contains('lab28켬-보는줄단추')){ 보기이동(뒤인가?'뒤':갈곳); e.stopPropagation(); return; } 초점(갈곳); 꾸미기(); 이어(h.classList.contains('lab28켬-이어보기6')); if(h.classList.contains('lab28켬-보는줄단추')){ 보는중(true); 꾸미기(); } e.stopPropagation(); }); return b; };
    var 사이=function(){ var i=d.createElement('i'); i.textContent='›'; return i; };
    바.appendChild(단추(뒤그림,조상.length?조상[조상.length-1]:null,'lab28-뒤')); 바.appendChild(단추('내 문서',null));
    var 보일=조상.length>3?[조상[조상.length-2],조상[조상.length-1]]:조상.slice();
    if(조상.length>3){ 바.appendChild(사이()); var 줄임=d.createElement('i'); 줄임.textContent='…'; 줄임.title=조상.slice(0,조상.length-2).map(이름).join(' › '); 바.appendChild(줄임); }
    보일.forEach(function(w){ 바.appendChild(사이()); 바.appendChild(단추(이름(w),w)); });
    /* K9 — 경로(계층)를 다 늘어놓지 않고 「‹ 뒤로」 하나(사용자 「계층을 다 나타내는 게 아니라 해당 화면 상태에서 나가는 거지」) */
    if(h.classList.contains('lab28켬-보는줄단추')){ 바.innerHTML=''; 바.appendChild(단추(뒤그림+'<span>뒤로</span>',null,'lab28-뒤 lab28-뒤글')); }
    뿌.insertBefore(바,뿌.firstChild);
  }
  /* 6 단계에서 이어 보기(레딧 「Continue this thread」 꼴) — 깊이(초점 길 뺀 감싸개 겹 수) 6 인 감싸개를 숨기고 그 묶음 맨 앞에 「n단계 더 보기」 줄 · 누르면 바로 위(5 단계) 폴더부터 보기 · 다시 거기서 6 단계 아래는 또 이어 보기 */
  function 이어(켬){
    var 옆=d.querySelector('.knowledge-page aside'); if(!옆) return;
    [].forEach.call(옆.querySelectorAll('.lab28-이어줄'),function(x){ x.remove(); });
    [].forEach.call(옆.querySelectorAll('.lab28-이어숨김'),function(x){ x.classList.remove('lab28-이어숨김'); });
    if(!켬) return;
    var 깊이=function(x){ var n=0; while(x&&x!==옆){ if(x.classList&&x.classList.contains('lab28-아래')&&!x.classList.contains('lab28-초점길')&&!x.classList.contains('lab28-초점')) n++; x=x.parentElement; } return n; };
    var 묶들=[]; [].forEach.call(옆.querySelectorAll('.lab28-아래'),function(x){ if(묶들.indexOf(x.parentElement)<0&&!x.closest('.lab28-초점숨김')&&깊이(x)===6) 묶들.push(x.parentElement); });
    묶들.forEach(function(M){
      var 위=M.parentElement, 최대=0;
      [].forEach.call(M.querySelectorAll('.lab28-아래'),function(w){ var k=0, y=w; while(y&&y!==M){ if(y.classList.contains('lab28-아래')) k++; y=y.parentElement; } if(k>최대) 최대=k; });
      [].forEach.call(M.children,function(c){ if(c.classList.contains('lab28-아래')) c.classList.add('lab28-이어숨김'); });
      var 줄=d.createElement('div'); 줄.className='lab28-이어줄'; 줄.innerHTML='<div>'+여기그림+'<span>'+최대+'단계 더 보기</span></div>';
      var 위이름=위.querySelector(':scope > .k-folder-row .px-lnb-label'); 줄.firstChild.title=(위이름?위이름.textContent.trim():'이 폴더')+'부터 보기';
      줄.firstChild.addEventListener('click',function(e){ 초점(위); 꾸미기(); 이어(true); e.stopPropagation(); });
      M.insertBefore(줄,M.firstChild);
    });
  }
  var 여기그림='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m15 10 5 5-5 5"/><path d="M4 4v7a4 4 0 0 0 4 4h12"/></svg>';
  /* 붙잡기 값 — 줄마다 깊이(감싸개 겹 수)로 top · LNB 바탕색을 aside 에 */
  function 붙음값(){
    var 옆=d.querySelector('.knowledge-page aside'); if(!옆) return;
    /* 줄을 감싼 overflow:auto 칸 가운데 실제로 안 구르는 것(내용 ≤ 높이)에 표시 — 한 번 표시하면 그대로 */
    var 첫줄=옆.querySelector('.k-folder-row'), z=첫줄&&첫줄.parentElement; while(z&&z!==옆){ var o=getComputedStyle(z).overflowY; if((o==='auto'||o==='scroll')&&!z.classList.contains('lab28-안스크롤')&&z.scrollHeight<=z.clientHeight+2) z.classList.add('lab28-안스크롤'); z=z.parentElement; }
    var y=옆, 바=''; while(y&&y!==d.documentElement){ var c=getComputedStyle(y).backgroundColor; if(c&&c!=='rgba(0, 0, 0, 0)'&&c!=='transparent'){ 바=c; break; } y=y.parentElement; } if(바&&옆.style.getPropertyValue('--lab28바탕')!==바) 옆.style.setProperty('--lab28바탕',바);
    [].forEach.call(옆.querySelectorAll('.k-folder-row'),function(r){ var n=0, x=r.parentElement; while(x&&x!==옆){ if(x.classList&&x.classList.contains('lab28-아래')) n++; x=x.parentElement; } var 값=Math.max(0,n-1)*30+'px'; if(r.style.getPropertyValue('--lab28붙음')!==값) r.style.setProperty('--lab28붙음',값); });
  }
  /* 20 개만 — 같은 부모 아래 들여쓴 감싸개가 20 개를 넘으면 나머지 숨기고 끝에 「n 개 더 보기」 */
  var 더그림='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
  function 넘침(켬){
    var 옆=d.querySelector('.knowledge-page aside'); if(!옆) return;
    if(!켬){ [].forEach.call(옆.querySelectorAll('.lab28-더보기줄'),function(x){ x.remove(); }); [].forEach.call(옆.querySelectorAll('.lab28-넘침'),function(x){ x.classList.remove('lab28-넘침'); }); [].forEach.call(옆.querySelectorAll('.lab28-다봄'),function(x){ x.classList.remove('lab28-다봄'); }); return; }
    var 부모들=[]; [].forEach.call(옆.querySelectorAll('.lab28-아래'),function(w){ if(부모들.indexOf(w.parentElement)<0) 부모들.push(w.parentElement); });
    부모들.forEach(function(P){ var 애=[].filter.call(P.children,function(c){ return c.classList.contains('lab28-아래'); }); var 단=[].filter.call(P.children,function(c){ return c.classList.contains('lab28-더보기줄'); })[0];
      if(애.length<=20||P.classList.contains('lab28-다봄')){ if(단) 단.remove(); 애.forEach(function(c){ c.classList.remove('lab28-넘침'); }); return; }
      애.forEach(function(c,i){ c.classList.toggle('lab28-넘침',i>=20); });
      if(!단){ 단=d.createElement('div'); 단.className='lab28-더보기줄'; 단.innerHTML='<div>'+더그림+'<span></span></div>'; 단.firstChild.addEventListener('click',function(e){ P.classList.add('lab28-다봄'); 넘침(true); 꾸미기(); e.stopPropagation(); }); }
      단.style.paddingLeft=getComputedStyle(애[0]).paddingLeft; 단.querySelector('span').textContent=(애.length-20)+'개 더 보기'; P.insertBefore(단,애[애.length-1].nextSibling); });
  }
  /* 5 단계에서 펼침 막음 — 깊이(감싸개 겹 수) 5 인 가지 줄은 묶음을 접어 두고 lab28-막힘 · 누르면 본문열기 */
  var 본문=null;
  function 폴더이름(w){ var l=w&&w.querySelector(':scope > .k-folder-row .px-lnb-label'); return l?l.textContent.trim():''; }
  function 막음(켬){
    var 옆=d.querySelector('.knowledge-page aside'); if(!옆) return; 본문닫기();
    [].forEach.call(옆.querySelectorAll('.lab28-막힘'),function(r){ r.classList.remove('lab28-막힘'); r.removeAttribute('title'); });
    [].forEach.call(옆.querySelectorAll('.lab28-막음묶'),function(m){ m.classList.remove('lab28-막음묶'); m.style.display=''; });
    if(!켬) return;
    [].forEach.call(옆.querySelectorAll('.lab28-아래'),function(x){ var n=0, y=x; while(y&&y!==옆){ if(y.classList&&y.classList.contains('lab28-아래')) n++; y=y.parentElement; } if(n!==5) return;
      var r=x.querySelector(':scope > .k-folder-row'), m=r&&r.nextElementSibling; if(!r||!m||!r.querySelector('.px-lnb-caret svg')) return;
      m.classList.add('lab28-막음묶'); m.style.display='none'; r.classList.add('lab28-막힘'); r.title='하위 폴더는 오른쪽 본문에서 열림'; });
  }
  /* 본문에서 열기(흉내 — 본문은 사진본) — 제목 · 위 경로 · 파일 목록 자리 = 그 폴더 · LNB 는 보이는 가장 가까운 조상 줄을 고른 줄로 */
  function 본문열기(w){
    var 쪽=d.querySelector('.knowledge-page'); if(!쪽) return; var 옆=쪽.querySelector('aside');
    if(!본문){ var h1=쪽.querySelector('h1'), 판=쪽.querySelector('.flex.flex-wrap.content-start'), 길=[].filter.call(쪽.querySelectorAll('span.truncate.font-medium'),function(s){ return !옆.contains(s); })[0]; if(!h1||!판) return;
      본문={h1:h1, 판:판, 길:길, 제목:h1.textContent, 경로:길?길.textContent:null, 고른:옆.querySelector('.k-folder-row.is-active')}; [].forEach.call(판.children,function(c){ c.classList.add('lab28-본문숨김'); }); }
    [].forEach.call(본문.판.querySelectorAll('.lab28-카드,.lab28-빈'),function(c){ c.remove(); });
    본문.h1.textContent=폴더이름(w);
    var 줄=['내 문서'], y=w, 조상=[]; while(y&&y!==옆){ if(y.classList&&y.classList.contains('lab28-아래')) 조상.unshift(폴더이름(y)); y=y.parentElement; } 줄=줄.concat(조상); if(줄.length>5) 줄=[줄[0],'…'].concat(줄.slice(-3));
    if(본문.길) 본문.길.textContent=줄.join(' › ');
    var 보=w; while(보&&보!==옆){ var r=보.classList&&보.classList.contains('lab28-아래')&&보.querySelector(':scope > .k-folder-row'); if(r&&r.offsetParent) break; 보=보.parentElement; }
    [].forEach.call(옆.querySelectorAll('.k-folder-row.is-active'),function(r){ r.classList.remove('is-active'); }); if(보&&보!==옆) 보.querySelector(':scope > .k-folder-row').classList.add('is-active');
    var 묶=w.querySelector(':scope > .k-folder-row').nextElementSibling; if(묶&&묶.classList.contains('lab28-보는줄')) 묶=묶.nextElementSibling; var 애=묶?[].filter.call(묶.children,function(c){ return c.classList.contains('lab28-아래'); }):[];
    /* 카드 그림 = 선 폴더(하위 있으면 겹친 폴더) — 원래 파란 폴더 png 는 14 짜리라 44 로 키우면 흐림 */
    애.forEach(function(c){ var 아래있음=!!c.querySelector(':scope > .k-folder-row .px-lnb-caret svg'); var k=d.createElement('div'); k.className='lab28-카드'; k.innerHTML=(아래있음?겹:닫힘).replace(/class="[^"]*"/,'class="lab28-카드그림"')+'<span></span>'; k.lastChild.textContent=폴더이름(c); k.title=폴더이름(c); k.addEventListener('click',function(e){ 본문열기(c); e.stopPropagation(); }); 본문.판.appendChild(k); });
    if(!애.length){ var 빈=d.createElement('div'); 빈.className='lab28-빈'; 빈.textContent='하위 폴더 없음 (시험용 가짜 폴더라 파일도 없음)'; 본문.판.appendChild(빈); }
  }
  function 본문닫기(){
    if(!본문) return; var b=본문; 본문=null;
    b.h1.textContent=b.제목; if(b.길&&b.경로!=null) b.길.textContent=b.경로;
    [].forEach.call(b.판.querySelectorAll('.lab28-카드,.lab28-빈'),function(c){ c.remove(); }); [].forEach.call(b.판.querySelectorAll('.lab28-본문숨김'),function(c){ c.classList.remove('lab28-본문숨김'); });
    var 옆=d.querySelector('.knowledge-page aside'); if(옆){ [].forEach.call(옆.querySelectorAll('.k-folder-row.is-active'),function(r){ r.classList.remove('is-active'); }); if(b.고른&&b.고른.isConnected) b.고른.classList.add('is-active'); }
  }
  /* 오른쪽에서 보는 중 — 막는 깊이 = 하위 글 칸이 40 밑으로 줄 깊이(1 단계 글 칸 폭 · 들여쓰기를 재어 셈 → LNB 폭이 넓어지면 저절로 더 깊이) · 그 깊이 가지 줄은 묶음을 접어 두고 lab28-보는막힘 */
  var 눈그림='<svg class="lab28-보는눈" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>';   /* Lucide eye */
  var 보는그림='<svg class="lab28-보는화살" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';
  function 겹수(x,옆){ var n=0; while(x&&x!==옆){ if(x.classList&&x.classList.contains('lab28-아래')&&!x.classList.contains('lab28-초점길')&&!x.classList.contains('lab28-초점')) n++; x=x.parentElement; } return n; }
  function 보는줄걷기(옆){ [].forEach.call(옆.querySelectorAll('.lab28-보는줄'),function(x){ x.remove(); }); }
  function 보는중(켬){
    var 옆=d.querySelector('.knowledge-page aside'); if(!옆) return; 본문닫기(); 보는줄걷기(옆);
    [].forEach.call(옆.querySelectorAll('.lab28-보는막힘'),function(r){ r.classList.remove('lab28-보는막힘'); r.removeAttribute('title'); });
    [].forEach.call(옆.querySelectorAll('.lab28-보는묶'),function(m){ m.classList.remove('lab28-보는묶'); m.style.display=''; });
    if(!켬) return;
    var 감=[].slice.call(옆.querySelectorAll('.lab28-아래')), 첫=감.filter(function(x){ var r=x.querySelector(':scope > .k-folder-row'); return 겹수(x,옆)===1&&r&&r.offsetParent; })[0]; if(!첫) return;
    var 폭=첫.querySelector(':scope > .k-folder-row .px-lnb-label').clientWidth, 들=parseFloat(getComputedStyle(첫).paddingLeft)||10;
    var N=Math.floor((폭-40)/들)+1; 옆.setAttribute('data-lab28-막는깊이',N); 옆.style.setProperty('--lab28들',들+'px');
    감.forEach(function(x){ if(겹수(x,옆)!==N) return; var r=x.querySelector(':scope > .k-folder-row'), m=r&&r.nextElementSibling; if(!r||!m||!r.querySelector('.px-lnb-caret svg')) return;
      m.classList.add('lab28-보는묶'); m.style.display='none'; r.classList.add('lab28-보는막힘'); r.title='하위 폴더는 오른쪽에서 열림'; });
  }
  /* 단추 꼴(K9) — 줄 = 「이 폴더부터 보기」 단추 · 바탕은 LNB 왼끝(첫 줄 왼끝)부터 이 줄 오른끝까지 · 누르면 초점(K3 엔진) 뒤 막는 깊이 다시 셈 */
  function 보는단추켜기(r){ var 옆=r.closest('aside'); 보는줄걷기(옆); var 줄=d.createElement('div'); 줄.className='lab28-보는줄 lab28-보는단추'; 줄.innerHTML='<div>'+여기그림+'<span>이 폴더부터 보기</span></div>'; r.parentNode.insertBefore(줄,r.nextSibling);
    var 첫=옆.querySelector('.k-folder-row'); if(첫){ var 밀=Math.round(r.getBoundingClientRect().left-첫.getBoundingClientRect().left); 줄.firstChild.style.marginLeft=(-밀)+'px'; }
    줄.firstChild.addEventListener('click',function(e){ 보기이동(r.parentElement,r); e.stopPropagation(); e.preventDefault(); }); }
  /* 보기 기록(K9) — ‹ = 직전 화면(브라우저 뒤로 가기처럼 · 사용자 「뒤로 가기를 하면 이 폴더부터 보기 전 단계로 가진다던지는?」) · 들어가거나 경로를 누를 때마다 지금 화면을 쌓음 · 돌아오면 들어갔던 폴더 아래에 단추 줄을 다시 띄워 어디서 들어갔는지 보임 */
  var 보기기록=[];
  function 보기이동(갈곳,온줄){ var 돌아올=null;
    if(갈곳==='뒤'){ var x=보기기록.pop(); if(!x) return; 갈곳=x.앞; 돌아올=x.줄; } else 보기기록.push({앞:지금초점, 줄:온줄||null});
    초점(갈곳); 꾸미기(); 보는중(true); 꾸미기();
    if(돌아올&&돌아올.isConnected&&돌아올.offsetParent&&돌아올.classList.contains('lab28-보는막힘')){ 보는단추켜기(돌아올); 꾸미기(); 돌아올.scrollIntoView({block:'nearest'}); } }
  function 보는중켜기(r){ if(h.classList.contains('lab28켬-보는줄단추')) return 보는단추켜기(r); var 옆=r.closest('aside'); 보는줄걷기(옆); var 줄=d.createElement('div'); 줄.className='lab28-보는줄'; 줄.innerHTML='<div>'+눈그림+'<span>오른쪽에서 열림</span>'+보는그림+'</div>'; r.parentNode.insertBefore(줄,r.nextSibling); 본문열기(r.parentElement); }
  /* 잘린 이름 · LNB 오른쪽 말풍선 — 말풍선 + 계층 100 일 때 · .3 초 뒤 · 줄 가운데 높이 · 구르면 걷음 */
  var 옆말=null, 옆말줄=null, 옆말틈=null;
  /* 글이 칸을 넘나 — scrollWidth 는 … 자리로 비운 padding-right 까지 칸으로 쳐서 조금만 잘린 이름(「009 단계 폴…」)을 놓침(사용자 「009 단계도 ... 생기는데 툴팁 안 나오는데?」) → 글자 실제 폭(Range)과 내용 칸(padding 뺀 폭)을 견줌 */
  function 글넘침(l){ if(!l||!l.offsetParent) return false; var cs=getComputedStyle(l), 칸=l.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight), rg=d.createRange(); rg.selectNodeContents(l); return rg.getBoundingClientRect().width>칸+.01; }   /* 009 = 글 76.2 · 칸 76 — 0.2 만 넘어도 브라우저는 … 로 자름 */
  function 옆말감춤(){ clearTimeout(옆말틈); 옆말줄=null; if(옆말){ 옆말.remove(); 옆말=null; } }
  d.addEventListener('mouseover',function(e){
    if(!h.classList.contains('lab28켬-말풍선')){ 옆말감춤(); return; }
    var r=e.target.closest&&e.target.closest('.knowledge-page aside .k-folder-row'); if(!r){ 옆말감춤(); return; }
    /* 올린 순간에 다시 잼 — … 단추 자리를 비우면(올림 · padding-right) 평소엔 다 보이던 이름도 잘림(사용자 「호버해서 ... 되면 다 툴팁 보여야 하는 거 아냐?」) · I3 의 줄 아래 말풍선도 이 표시로 뜸 */
    var l=r.querySelector('.px-lnb-label'), 잘림=글넘침(l); if(잘림&&!r.hasAttribute('data-lab28-이름')) r.setAttribute('data-lab28-이름',l.textContent.trim());
    if(!h.classList.contains('lab28켬-옆말풍선')) return;
    if(!잘림){ 옆말감춤(); return; } if(r===옆말줄) return;
    옆말감춤(); 옆말줄=r; 옆말틈=setTimeout(function(){ if(옆말줄!==r||!r.isConnected) return; var a=r.closest('aside').getBoundingClientRect(), b=r.getBoundingClientRect();
      옆말=d.createElement('div'); 옆말.className='lab28-옆말'; 옆말.textContent=r.getAttribute('data-lab28-이름'); d.body.appendChild(옆말); 옆말.style.left=(a.right+8)+'px'; 옆말.style.top=Math.round(b.top+b.height/2-옆말.offsetHeight/2)+'px'; },300); });
  d.addEventListener('scroll',옆말감춤,true);
  d.addEventListener('mouseout',function(e){ if(!e.relatedTarget) 옆말감춤(); });   /* 화면(iframe) 밖으로 나가면 mouseover 가 안 와서 말풍선이 남음 → 걷음 */
  window.__lab28적용=function(켠){

    [].slice.call(h.classList).forEach(function(c){ if(c.indexOf('lab28켬-')===0) h.classList.remove(c); });
    켠.forEach(function(i){ h.classList.add('lab28켬-'+i); }); 시험(h.classList.contains('lab28켬-깊이시험')); 백(h.classList.contains('lab28켬-백개시험')); if(!h.classList.contains('lab28켬-여기부터')||(지금초점&&!지금초점.isConnected)) 초점(null); 계층(h.classList.contains('lab28켬-백단계')); if(지금초점&&!지금초점.isConnected) 초점(null); 꾸미기(); 보기기록.length=0; 이어(h.classList.contains('lab28켬-이어보기6')); 막음(h.classList.contains('lab28켬-막음5')); 보는중(h.classList.contains('lab28켬-보는중')); 꾸미기(); 넘침(h.classList.contains('lab28켬-더보기20')); 붙음값(); setTimeout(function(){ 꾸미기(); 넘침(h.classList.contains('lab28켬-더보기20')); 붙음값(); },80);
  };
  /* 랩에서만 — 하위 있는 폴더 줄을 누르면 접고 폄(사진본이라 원래는 안 됨 · 덧붙임이 하나라도 켜졌을 때만) */
  d.addEventListener('click',function(e){ var 여=e.target.closest&&e.target.closest('.knowledge-page aside .lab28-여기'); if(여&&h.classList.contains('lab28켬-여기부터')){ 초점(여.closest('.k-folder-row').parentElement); 꾸미기(); 이어(h.classList.contains('lab28켬-이어보기6')); e.preventDefault(); e.stopPropagation(); return; } }, true);
  /* 오른쪽에서 보는 중 — 막힌 줄은 어디를 눌러도 보는 중 켜고 끔 · 다른 줄을 누르면 보는 중 걷고 본문 원래대로 */
  d.addEventListener('click',function(e){ var r=e.target.closest&&e.target.closest('.knowledge-page aside .k-folder-row'); if(!r||e.target.closest('.px-more-btn')||!h.classList.contains('lab28켬-보는중')) return;
    var 옆=r.closest('aside');
    /* 이름 = 그 폴더 열기(오른쪽) · 그림 칸(⌄ / ⌃) = 펼치기 → 「오른쪽에 펼쳐짐」 줄 + 열기 / 접기 → 줄만 걷음(오른쪽은 그대로) — 사용자 「목록 누르면 원래는 그냥 폴더 열리는 거고 왼쪽 화살표 누르면 떠야 하는 거 아닌가」 */
    if(r.classList.contains('lab28-보는막힘')){ var 켜짐=r.nextElementSibling&&r.nextElementSibling.classList.contains('lab28-보는줄');
      if(e.target.closest('.px-lnb-ico')){ if(켜짐) 보는줄걷기(옆); else 보는중켜기(r); } else 본문열기(r.parentElement);
      꾸미기(); e.preventDefault(); e.stopPropagation(); return; }
    if(옆.querySelector('.lab28-보는줄')){ 보는줄걷기(옆); 본문닫기(); 꾸미기(); } },true);
  d.addEventListener('click',function(e){ var r=e.target.closest&&e.target.closest('.knowledge-page aside .k-folder-row'); if(!r||e.target.closest('.px-more-btn')||!h.classList.contains('lab28켬-막음5')) return;
    if(r.classList.contains('lab28-막힘')){ 본문열기(r.parentElement); e.preventDefault(); e.stopPropagation(); return; } 본문닫기(); },true);
  d.addEventListener('click',function(e){ if(e.defaultPrevented) return; var r=e.target.closest&&e.target.closest('.knowledge-page aside .k-folder-row.lab28-가지'); if(!r||e.target.closest('.px-more-btn')||!/lab28켬-/.test(h.className)) return;
    if(h.classList.contains('lab28켬-그림단추')&&!e.target.closest('.px-lnb-ico, .lab28-화살')) return;   /* 단추 꼴이면 그림 · 화살표만 접고 폄 */
    var 아=아래들(r), 접=r.classList.contains('lab28-펼침'); 아.forEach(function(x){ x.style.display=접?'none':''; }); 꾸미기(); e.preventDefault(); e.stopPropagation(); },true);
  꾸미기(); var t=setInterval(꾸미기,400); setTimeout(function(){ clearInterval(t); },6000);
})();

/* 1안 · 고정 항목 — 저장본지식LNB(손질/28_지식LNB/1안반영.py) · 지식/문서 저장본에서만 */
(function(){
  var w=window; if(!w.__lab28적용||w.__lab28고정) return; if(!document.querySelector('.knowledge-page aside .k-folder-row')) return;
  w.__lab28고정=1; w.__lab28적용(["그림셋겹", "줄", "머리", "화살표없음", "그림단추", "더보기단추", "단추화살", "단추회색", "줄올리면화살", "말풍선", "옆말풍선", "보는중", "보는줄단추"]);
})();
