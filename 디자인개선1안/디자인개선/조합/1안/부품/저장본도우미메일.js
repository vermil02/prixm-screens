/* 조합 1안 · 부품/저장본도우미메일 — 손질/31_AI도우미정본/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-11
   이메일 저장본(d04)에만: 25 AI 도우미 + 27 이메일 구조 + 30 메일 색 + 27 카드 꼴 G-25 + 31(랩 안 「13 = 12 + 리스트 보기」).
   켠 항목: 얼굴 · 머리 크게 45(피그마 시안 2) · 얼굴 · 대화 전엔 가운데 크게 → 대화 중 머리 45 · 제안 꼴 · 회색 알약(레퍼런스) · 제안 빛 · 프리즘 테두리 올렸을 때만 · 추천 자리 · 인사 아래(피그마 원래) · 대화 칸 스크롤바 · LNB 꼴(올리면 나타남) · 하는 일 한 줄(제목 아래) · 쓰는 중 테 · 프리즘(추천) · 전환 · GSAP(얼굴이 머리로 · 말풍선 · 답 차례로)(추천) · 쓰는 중 표시 · 하는 일 단계(사실 기반)(추천) · 상세 바탕 · 세 칸 카드(목록도) + 템플릿 바탕 · 여백 12 · 구조 · B 목록 · 내용 카드 붙음(도우미 카드는 따로) · 고른 메일 바탕 = 안쪽으로 들어간 둥근 카드 영역(좌우 8 · 위아래 3 · 둥글기 10 · 옅은 주요색) · A+B 목록 │ 내용 사이 세로선만 살짝 진하게(229 231 235 → 214 217 225) · 둥글기 15 → 10 · 바탕은 그대로 · A+B 목록 │ 메일 세로선 = 좌우로 끌어 목록 폭 조절(가운데 손잡이 · 올리면 주요색 · 260 ~ 560 · 두 번 누르면 350) · 끌선 꼴 · 두 줄(1px 선 둘 · 사이 3) · 메일 줄마다 체크박스(네이버 메일처럼 · 줄 왼쪽 16 · 고르면 주요색) + 목록 위 전체 선택(일부면 ─) · 고른 수 표시 · 전체 · 안읽음 · 읽음 = 위 도구줄 맨 앞 필터(전체 ▾ 펼침) · 목록 위 탭 줄 숨김 · 전체 선택 체크도 도구줄 맨 앞(줄 체크와 같은 x) · 받은편지함 카드 뒤 바탕만 아주 살짝 어둡게(흰색 → 248,248,251 · 머리 줄은 흰색 그대로) · AI 도우미 접기 · 펼치기 — 자리는 그대로(받은편지함 안 오른쪽 카드) · 제목 줄 검색 옆 ✦ 단추 · 폭 0 ↔ 455 · C 에서 AI 섹션을 연 채로 시작 · 안읽음 표시 켬(꼴은 아래 「안읽음 꼴」) · 안읽음 꼴 · 아바타 진하게(안읽음 = 사람 주요색 · 자동 발신 진회색으로 채우고 흰 글 / 읽음 = 옅게) · 답장 필요 칩 — AI 가 본 답장 필요 = 연한 빨강 칩(바탕 254 242 242 · 글 220 38 38) · 사용자 「답장 필요 이런 건 차라리 칩 형태가 나을지도」 · 분류 칩 — 보낸 이 줄 날짜 앞 테두리 칩(자동화 분류 칩과 같은 꼴 · LNB 스마트 메일함 분류만: 청구·결제 · 카페 · SNS · 프로모션 — 맞는 분류 없는 메일은 칩 없음) · 중요 별 — 켜지면 노랑으로 채움(자동화 「쉬는 중」 노랑) · 눌러서 켜고 끔 · 보낸 사람 동그라미 28 — 첫 글자 · 사람마다 옅은 색(파랑 · 초록 · 주황 · 보라 · 자동화 칩 톤) · 보낸 사람 색 · 사람 / 자동 발신(사람 = 옅은 주요색 · 네이버 · noreply 같은 자동 발신 = 회색) · 보낸 사람 ↔ 체크박스 — 평소 동그라미 · 줄에 올리면 그 자리가 체크박스 · 하나라도 고르면 모든 줄이 체크박스(Gmail 식) · 동그라미 눌러도 체크 · 처음 화면 = 아무 메일도 안 연 상태 · 오른쪽 「메일을 선택하세요」 안내(누르면 사라지고 내용) · 사용자 「처음은 아무것도 안 열린 상태에서 우측에 메일 선택하라는 문구가 디폴트가 나을 듯」 · 목록 좌우 · 위 여백 +6(29 탭 「15」 값 그대로: 고른 바탕 8/10 → 14/16 · 글 20/22 → 26/28 · 위 11 → 17 · 요약 칩 줄도 26) · 요약 칩 줄 — 목록 맨 위 「● 안읽음 3 · ● 답장 필요 1 · ★ 중요 1」 · 누르면 그 줄만(자동화 「활성 ✕」 처럼 옅은 주요색 + ✕) · 요약 칩 수 상한 — 99 넘으면 「99+」(MUI Badge · Ant Design Badge 기본 상한 99) · 칩에 올리면 정확한 수(쉼표) · 걸렀을 때 정확한 수 + 한 번에 처리 — 칩을 누르면 칩 줄 아래 「안읽음 10,000,000,000,000통 · [모두 읽음]」(중요 = [중요 모두 해제] · 답장 필요 = 수만) · 목록 │ 메일 두 줄 끌선 색 옅게 214 217 225 → 229 231 235(n-200 · 카드 테 · 분류 칩 테 · 구분선과 같은 색) · 올리거나 끄면 주요색 두 단계 옅게(p-300 176 174 248) · 카드 꼴 · 옅은 보라 면 + 위 프리즘 띠(움직임 없음) · G-3 다듬음(띠 양 끝 흐림 · 위 흰 → 아래 옅은 보라) · 흰 바탕 + 위 띠 처음엔 좁게 → 답 쓰는 중 펴짐 · 위 띠 아래 빛 번짐 뺌(라인만) · 카드 테두리 연보라 #d8cafc · 위 라인 대기 폭 75%(쓰는 중 88%) · 카드 테두리 연보라 한 단계 진하게 #cbb9fa · 입력창 기본 테두리 #e5e7eb → #d1d5db(올림 #b9bec7) · 답 쓰는 중: 위 라인 색이 프리즘처럼 흐름 + 아래로 같이 흐르는 은은한 빛 · 카드 테두리 · 왼쪽 카드처럼 회색 선 + 옅은 그림자 · 대기 중 위 라인 색이 아주 천천히 흐름(16초) · AI 단추 · 얼굴(동그라미) · 떠 있는 단추를 위로 · 얼굴 정원(40) · 정원 56 + 이름표 · 열리면 단추 숨김, 닫기는 창 × · 정원 88 · 이름표 「이메일 AI 도우미」 · 호버 말풍선 · 카드 폭 스르륵 · 정원 90%(80) · 리스트 보기(기본) · 전체 · 안읽음 · 읽음 거름 뺌 */

/* 25 AI 도우미 엔진 — 이메일 저장본에 한 번. 인사 그림을 머리 · 흉내 대화의 답에 복사해 두고, __lab25적용(항목들) 로 html 클래스만 갈아 끼움 */
(function(){
  var d=document, w=window; if(w.__lab25적용) return;
  function 표(e,c){ if(e) e.classList.add(c); return e; }
  function 글로(s,글){ return [].filter.call(d.querySelectorAll(s),function(e){ return e.textContent.replace(/\s+/g,' ').trim()===글; })[0]; }
  var 인사=d.querySelector('[data-ai-greeting]'), 얼굴=인사&&인사.querySelector('img'), 제목=글로('span','이메일 AI 도우미');
  if(!제목||!얼굴){ w.__lab25적용=function(){}; return; }   /* 이메일만 — 프로젝트 도우미에도 같은 인사 칸이 있음 */
  if(얼굴){ 얼굴.src='/prixm-screens/디자인개선1안/디자인개선/조합/1안/부품/도우미얼굴_480.png'; 얼굴.removeAttribute('data-w2h-got'); }   /* 저장본 그림은 80×80 이라 120 · 날기(2.7배)에서 흐림 → 피그마 원본(772×791)을 정사각 480 으로(2026-10-08 사용자 「이미지가 왜 이렇게 깨져 보이지」) */
  function 얼굴칸(c){ var s=d.createElement('span'); s.className=c; var i=d.createElement('img'); i.src=얼굴.src; i.alt=''; s.appendChild(i); return s; }
  if(얼굴&&제목){ var 머리=제목.closest('div.shrink-0'); 표(머리,'lab25-도우미머리'); 표(제목,'lab25-도우미제목'); 머리.insertBefore(얼굴칸('lab25-머리얼굴'),머리.firstChild);
    var 설=d.createElement('div'); 설.className='lab25-머리설명'; 설.textContent='메일 요약 · 답장 초안 · 내용 분석'; 제목.parentNode.parentNode.appendChild(설); }
  if(얼굴&&인사){ var 흉=d.createElement('div'); 흉.className='lab25-흉내';
    [['이메일 요약해줘','메일 요약이 완료되었습니다.','보낸 사람이 다음 주 회의 일정 조정을 요청했습니다. 회신 기한은 금요일입니다.'],
     ['회신 초안 써줘','메일 작성이 완료되었습니다.','상대방 성함과 직함이 제공되지 않아 [성함/직함]으로 표시하였습니다. 실제 발송 시 수정하여 사용하시기 바랍니다.']].forEach(function(x){
      var q=d.createElement('div'); q.className='lab25-물음'; q.textContent=x[0]; 흉.appendChild(q);
      var a=d.createElement('div'); a.className='lab25-답'; a.appendChild(얼굴칸('lab25-답얼굴')); var p=d.createElement('p'); p.innerHTML='<b>'+x[1]+'</b>'+x[2]; a.appendChild(p); 흉.appendChild(a); 흉.__끝=a; }); 표(흉.__끝,'lab25-끝답');
    var 쓰=d.createElement('div'); 쓰.className='lab25-쓰는중'; 쓰.textContent='답을 쓰는 중…'; 흉.appendChild(쓰);
    인사.parentNode.insertBefore(흉,인사.nextSibling);
    /* 제안 알약(데모) — 인사 칸 맨 끝 */
    var 제=d.createElement('div'); 제.className='lab25-제안';
    /* 사용자 「메일 내용 보고 있을 때인데 이런 예시가 맞냐」 — 받은편지함 전체 일(중요한 메일만 골라줘)은 빼고 지금 연 메일 일만 */
    /* 사용자 「이 이메일 요약해줘 · 회신 초안 써줘」 — 둘로 */
    [['이 이메일 요약해줘','메일'],['회신 초안 써줘','회신']].forEach(function(x){ var s=d.createElement('span'); s.textContent=x[0]; s.dataset.i=x[1]; 제.appendChild(s); });
    인사.appendChild(제);
    /* 입력칸(흉내) — 대화 칸(스크롤) 바로 아래 */
    /* 메일 고른 뒤 인사 글(피그마 221:131) — 원래 글 옆에 두고 상태로 갈아 끼움 */
    var 원p=인사.querySelector('p'); if(원p){ 원p.classList.add('lab25-인사원래'); var 새p=원p.cloneNode(false); 새p.classList.remove('lab25-인사원래'); 새p.classList.add('lab25-인사고름');
      새p.innerHTML='안녕하세요 이메일 AI 도우미 입니다.<br><span class="font-semibold">이메일 요약부터 내용 분석까지,</span><br><span class="font-semibold">필요한 내용을 편하게 말씀해 주세요.</span>'; 원p.parentNode.insertBefore(새p,원p.nextSibling); }
    var 칸=인사.parentNode, 입=d.createElement('div'); 입.className='lab25-입력';
    입.innerHTML='<textarea placeholder="메일 관련 궁금한걸 질문해보세요."></textarea><i class="더">+</i><i class="보냄">↵</i>';
    입.addEventListener('mousedown',function(e){ if(e.target.tagName!=='TEXTAREA'){ e.preventDefault(); 입.querySelector('textarea').focus(); } });
    if(칸&&칸.parentNode) 칸.parentNode.insertBefore(입,칸.nextSibling);
    var 위=제.cloneNode(true); 위.className='lab25-제안 lab25-제안위'; 제.classList.add('lab25-제안속'); if(입.parentNode) 입.parentNode.insertBefore(위,입); }
  w.__lab25적용=function(목록){ var h=d.documentElement;
    [].slice.call(h.classList).forEach(function(c){ if(c.indexOf('lab25켬-')===0) h.classList.remove(c); });
    목록.forEach(function(i){ h.classList.add('lab25켬-'+i); }); };

  /* ── 대화 돌리기(2026-10-08) — 추천 단추 · 입력 Enter / ↵ → 물음 → 쓰는 중(단계) → 답. 랩 상태 라디오와 따로(엔진이 상태 클래스만 바꿈)
     메일 정보는 w.__lab25메일정보() 가 있으면 그것(1안 = 연 메일) · 없으면 저장본 첫 메일(박종진) ── */
  var 흉=d.querySelector('.lab25-흉내'); if(!흉) return;
  var h=d.documentElement, 상태들=['전','중','쓰는','고르기전'], 쓰=흉.querySelector('.lab25-쓰는중'), 스크=흉.parentNode,
      입칸=d.querySelector('.lab25-입력'), 글칸=입칸&&입칸.querySelector('textarea'), 돌=0;
  function 켬(c){ return h.classList.contains('lab25켬-'+c); }
  function 상태(s){ var l=[].slice.call(h.classList).filter(function(c){ return c.indexOf('lab25켬-')===0; }).map(function(c){ return c.slice(7); }).filter(function(c){ return 상태들.indexOf(c)<0; }); l.push(s); w.__lab25적용(l); }
  function 지(){ return w.gsap&&켬('날기')&&!(w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches)?w.gsap:null; }
  function 아래(){ 스크.scrollTop=스크.scrollHeight; }
  var 김='화학안전팀 김민수입니다.';
  function 메일(){ return (w.__lab25메일정보&&w.__lab25메일정보())||{보낸:'박종진',제목:김,날:'09/09'}; }
  /* 단계 · 답 — 메일에서 실제로 찾은 것만(사실 기반) · 시연 메일(박종진) 은 본문 내용 · 나머지는 제목 · 보낸 사람으로 */
  function 대본(종류){ var m=메일(), 박=m.제목===김, 보=m.보낸||'보낸 분', 제=m.제목||'메일';
    if(종류==='메일') return 박
      ? {단계:[['메일 읽는 중','본문 6문단 · 보낸 사람 박종진'],['핵심 찾는 중','일정 변경 1건 · 회신 요청 1건 · 미정 1건'],['요약 쓰는 중','3줄로']],
         근거:'메일 6문단을 읽고 일정 변경 · 회신 요청을 찾았어요',
         답:['메일 요약이 완료되었습니다.','· 2-부톡시에탄올 물성/독성 자료는 최신 개정판 기준으로 다시 정리(공유 폴더 「화학안전/2026」)<br>· 취급 공정 점검이 <strong>목요일 오후 2시</strong>로 바뀜 — 금요일까지 참석 회신<br>· 보호구 지급 기준은 다음 회의에서 확정']}
      : {단계:[['메일 읽는 중','보낸 사람 '+보],['핵심 찾는 중','계정 보안 알림 1건'],['요약 쓰는 중','2줄로']], 근거:보+' 알림 메일을 읽었어요',
         답:['메일 요약이 완료되었습니다.',보+'에서 온 「'+제+'」 알림입니다. 본인이 한 일이 아니라면 비밀번호와 2단계 인증을 확인하라는 내용입니다.']};
    if(종류==='회신') return 박
      ? {단계:[['메일 읽는 중','회신 요청 — 금요일까지 참석 여부'],['답할 내용 고르는 중','목요일 오후 2시 점검 참석 · 개정판 자료 확인'],['초안 쓰는 중','받는 사람 김민수 님']],
         근거:'회신 요청(금요일까지 참석 여부)에 맞춰 썼어요',
         답:['메일 작성이 완료되었습니다.','안녕하세요, 김민수 님.<br>회의 내용 정리해 주셔서 감사합니다. 목요일 오후 2시 취급 공정 점검에 참석하겠습니다. 개정판 자료도 미리 확인해 두겠습니다.<br>감사합니다.']}
      : {단계:[['메일 읽는 중','보낸 사람 '+보],['답할 내용 고르는 중','발신 전용 — 회신 받는 곳 없음'],['초안 쓰는 중','짧게']], 근거:'발신 전용 메일이라 확인용으로만 썼어요',
         답:['메일 작성이 완료되었습니다.','안녕하세요, '+보+' 담당자님.<br>보내 주신 「'+제+'」 잘 받았습니다. 내용 확인했습니다.<br>감사합니다.']};
    return 박
      ? {단계:[['메일 읽는 중','「'+제+'」'],['물음과 맞는 부분 찾는 중','회신 기한 · 일정 문단'],['답 쓰는 중','']], 근거:'메일 둘째 · 셋째 문단을 봤어요',
         답:['회신 기한은 이번 주 금요일입니다.','점검 일정이 <strong>목요일 오후 2시</strong>로 바뀌었고, 참석 여부를 금요일까지 회신해 달라고 했습니다.']}
      : {단계:[['메일 읽는 중','「'+제+'」'],['물음과 맞는 부분 찾는 중','본문 전체'],['답 쓰는 중','']], 근거:'메일 본문을 봤어요',
         답:['답변 예시입니다.','시연 화면이라 실제 답 대신 예시를 보여 드려요. 「이 이메일 요약해줘」 · 「회신 초안 써줘」 를 눌러 보세요.']}; }
  /* 처음 → 대화: 큰 얼굴(인사) 이 머리 45 자리로 · 제목이 가운데 → 왼쪽으로(FLIP — 바꾸기 전 · 뒤 자리를 재서 그 차이만큼 되돌렸다가 0 으로) */
  function 날기(바꿈){ var g=지(), 큰=인사.querySelector('span.relative')||얼굴, 머=d.querySelector('.lab25-머리얼굴'), 제=d.querySelector('.lab25-도우미제목');
    if(!g||!켬('전')||!머||!제){ 바꿈(); return; }
    var 가=큰.getBoundingClientRect(), 제가=제.getBoundingClientRect(), 사라질=[].slice.call(인사.querySelectorAll('p,.lab25-제안')).concat([].slice.call(d.querySelectorAll('.lab25-제안위')));
    g.to(사라질,{opacity:0,y:-6,duration:.16,ease:'power1.in',onComplete:function(){
      바꿈(); var 나=머.getBoundingClientRect(), 제나=제.getBoundingClientRect();
      g.set(사라질,{clearProps:'opacity,transform'});
      머.classList.add('lab25-나는중');
      g.fromTo(머,{x:가.left-나.left,y:가.top-나.top,scale:가.width/나.width,transformOrigin:'0 0'},{x:0,y:0,scale:1,duration:.6,ease:'power3.inOut',clearProps:'transform',onComplete:function(){ 머.classList.remove('lab25-나는중'); }});
      g.fromTo(제,{x:제가.left-제나.left,y:제가.top-제나.top},{x:0,y:0,duration:.6,ease:'power3.inOut',clearProps:'transform'});
      var 설=d.querySelector('.lab25-머리설명'); if(설) g.from(설,{opacity:0,y:4,duration:.35,delay:.35,clearProps:'opacity,transform'}); }}); }
  function 들어옴(e,늦){ var g=지(); if(g) g.from(e,{opacity:0,y:8,duration:.32,delay:늦||0,ease:'power2.out',clearProps:'opacity,transform'}); }
  function 묻기(말,종류){ 말=(말||'').trim(); if(!말) return; var 이번=++돌, 판=대본(종류), 처음=켬('전');
    if(처음) [].slice.call(흉.children).forEach(function(c){ if(c!==쓰) c.remove(); });   /* 랩 흉내(고정 물음 2 · 답 2) 를 비우고 새로 */
    var q=d.createElement('div'); q.className='lab25-물음'; q.textContent=말; 흉.insertBefore(q,쓰);
    var 단=null; if(!켬('글만')){ 단=d.createElement('div'); 단.className='lab25-단계'; 흉.insertBefore(단,쓰); }
    날기(function(){ 상태('쓰는'); });
    들어옴(q,처음?.28:0); requestAnimationFrame(아래);
    function 다음(i){ if(이번!==돌) return;
      if(단&&i<판.단계.length){ [].forEach.call(단.children,function(c){ c.className='lab25-단계줄 끝'; });
        var 줄=d.createElement('div'); 줄.className='lab25-단계줄 켬'; 줄.innerHTML='<i></i><span></span><em></em>'; 줄.querySelector('span').textContent=판.단계[i][0]; 줄.querySelector('em').textContent=판.단계[i][1]; 단.appendChild(줄);
        들어옴(줄); requestAnimationFrame(아래); setTimeout(function(){ 다음(i+1); },900); return; }
      if(!단&&i===0){ setTimeout(function(){ 다음(99); },1400); return; }
      /* 답 — 단계는 근거 한 줄로 접힘 */
      var 근=null; if(단){ 근=d.createElement('div'); 근.className='lab25-근거'; 근.textContent=판.근거; 흉.insertBefore(근,단); 단.remove(); }
      var a=d.createElement('div'); a.className='lab25-답';
      var s=d.createElement('span'); s.className='lab25-답얼굴'; var im=d.createElement('img'); im.src=얼굴.src; im.alt=''; s.appendChild(im); a.appendChild(s);
      var p=d.createElement('p'); p.innerHTML='<b>'+판.답[0]+'</b>'+판.답[1]; a.appendChild(p); 흉.insertBefore(a,쓰);
      상태('중'); if(근) 들어옴(근); 들어옴(a,근?.08:0); requestAnimationFrame(아래); }
    setTimeout(function(){ 다음(0); },처음?750:350); }
  w.__lab25처음=function(){ 돌++; [].slice.call(흉.children).forEach(function(c){ if(c!==쓰) c.remove(); }); if(글칸) 글칸.value=''; 상태('전');
    var g=지(); if(g) g.from(인사,{opacity:0,duration:.3,clearProps:'opacity'}); };
  w.__lab25묻기=묻기;
  d.addEventListener('click',function(e){ var t=e.target, s=t.closest&&t.closest('.lab25-제안 span'); if(s){ 묻기(s.textContent,s.dataset.i); return; }
    if(t.closest&&t.closest('.lab25-입력 i.보냄')&&글칸){ 묻기(글칸.value,'자유'); 글칸.value=''; } });
  if(글칸) 글칸.addEventListener('keydown',function(e){ if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){ e.preventDefault(); 묻기(글칸.value,'자유'); 글칸.value=''; } });

  /* ── 메일 연 채(읽기 칸) — 2026-10-08 1안반영.py 에서 엔진으로 옮김(랩도 1안처럼 메일을 연 채 · 사용자 「메일을 누르고 난 뒤에 도우미」)
     저장본 「메일을 선택해 주세요」 자리에 고른 메일 · 왼쪽 메일을 누르면 바뀌고 도우미는 대화 전으로 ── */
  var 빈글=[].filter.call(d.querySelectorAll('p,div,span'),function(e){ return !e.children.length&&/메일을 선택해주세요/.test(e.textContent); })[0];
  var 빈=빈글&&빈글.parentElement, 상칸=빈&&빈.closest('section'), 목록칸=상칸&&상칸.previousElementSibling;
  var 줄들=목록칸?[].slice.call(목록칸.querySelectorAll('div.overflow-y-auto > button')):[];
  if(!빈||!줄들.length) return;
  빈.classList.add('lab25-빈칸'); 상칸.classList.add('lab25-상세칸');
  목록칸.classList.add('lab25-목록칸'); var 목카=d.createElement('div'); 목카.className='lab25-목록카드'; while(목록칸.firstChild) 목카.appendChild(목록칸.firstChild); 목록칸.appendChild(목카);
  /* 상세 카드 — 「상세 바탕」 라디오가 켜면 카드(흰 · 선 · 둥글기 15)가 되고 바깥(상세칸 · 도우미칸)에 은은한 바탕 */
  var 상카=d.createElement('div'); 상카.className='lab25-상세카드'; while(상칸.firstChild) 상카.appendChild(상칸.firstChild); 상칸.appendChild(상카);
  var 도카=인사.closest('.rounded-\\[15px\\]'), 도칸=도카&&도카.parentElement&&도카.parentElement.parentElement; if(도칸) 도칸.classList.add('lab25-도우미칸'); if(도카) 도카.classList.add('lab25-도우미카드'); if(인사.parentNode) 인사.parentNode.classList.add('lab25-대화칸');
  var 읽기=d.createElement('div'); 읽기.className='lab25-읽기'; 상카.appendChild(읽기);
  /* 저장본 미리보기 글은 메일 머리 일부라 잘림 · 알림 메일은 HTML 주석뿐 → 시연 본문 */
  var 본문들={};
  본문들[김]='안녕하세요, 화학안전팀 김민수입니다.\n\n지난주 회의 내용 정리해서 보냅니다. 중간에 변경된 부분이 있어서 헷갈릴 수 있는데, 아래 참고 부탁드립니다.\n\n먼저 2-부톡시에탄올 물성/독성 자료는 지난 회의에서 말씀드린 MSDS 기준 대신 최신 개정판 기준으로 다시 정리하기로 했습니다. 개정판 자료는 공유 폴더 「화학안전/2026」 에 올려 두었습니다.\n\n둘째, 취급 공정 점검 일정이 다음 주 수요일에서 목요일 오후 2시로 바뀌었습니다. 참석 가능 여부를 금요일까지 회신 부탁드립니다.\n\n셋째, 보호구 지급 기준은 현장 의견을 더 듣고 다음 회의에서 확정합니다.\n\n궁금한 점 있으면 편하게 연락 주세요.\n감사합니다.\n\n김민수 드림';
  function 글(e){ return e?e.textContent.replace(/\s+/g,' ').trim():''; }
  function 줄메일(b){ var 칸들=b.querySelectorAll('.min-w-0 > div'), 머=칸들[0];
    var 보낸=글(머&&머.querySelector('span')), 날=글(머&&머.querySelector('.text-muted')), 제목=글(칸들[1]);
    var 본=본문들[제목]; if(!본){ 본=(칸들[2]?칸들[2].textContent:'').replace(/<!--[\s\S]*?(-->|$)/g,'').replace(/<!?\[[^\]]*\]>?/g,'').trim();
      if(본.length<20) 본=보낸.replace(/"/g,'')+' 알림 메일입니다.\n\n'+제목+'\n\n본인이 한 일이 아니라면 계정 설정에서 비밀번호를 바꾸고 2단계 인증을 확인해 주세요.\n\n이 메일은 발신 전용입니다.'; }
    return {보낸:보낸.replace(/"/g,''), 날:날, 제목:제목, 본:본}; }
  var 연={};
  function 열기(b){
    줄들.forEach(function(x){ x.classList.toggle('lab25-고른',x===b); });
    연=줄메일(b); 읽기.innerHTML='';
    var h2=d.createElement('h2'); h2.textContent=연.제목; 읽기.appendChild(h2);
    var 보=d.createElement('div'); 보.className='lab25-보낸'; 보.innerHTML='<span class="lab25-보낸얼굴"></span><div><b></b><em class="lab25-보낸때"></em></div>';
    보.querySelector('.lab25-보낸얼굴').textContent=연.보낸.charAt(0); 보.querySelector('b').textContent=연.보낸; 보.querySelector('.lab25-보낸때').textContent='받는 사람 나 · '+연.날; 읽기.appendChild(보);
    var 본=d.createElement('div'); 본.className='lab25-본문'; 본.textContent=연.본; 읽기.appendChild(본); 읽기.scrollTop=0;
    w.__lab25처음(); }
  w.__lab25메일정보=function(){ return 연; };
  줄들.forEach(function(b){ b.addEventListener('click',function(e){ if(e.target.closest('[title="별표"]')) return; e.preventDefault(); e.stopPropagation(); 열기(b); },true); });
  /* 메일을 열면 켜지는 도구 단추(삭제 · 답장 …) — 저장본엔 disabled 로 박혀 있음 · 보기만 */
  [].forEach.call(d.querySelectorAll('button.tb-btn[disabled]'),function(b){ b.removeAttribute('disabled'); });
  열기(줄들[0]);
})();

/* 27 이메일 구조 엔진 — 25 엔진(__lab25적용)이 html 클래스 lab25켬-<id> 를 갈아 끼우면 그걸 보고 움직임 */
(function(){ var d=document, w=window; if(d.__lab27) return; d.__lab27=1; var h=d.documentElement;
  function 켬(c){ return h.classList.contains('lab25켬-'+c); }
  var 섹션=null, 단추=null, 원자리=null, 원다음=null, 열어봄=false;
  var 반짝='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>';
  function 열기(v){ if(!섹션) return; 섹션.classList.toggle('열림',v); if(단추){ 단추.classList.toggle('열림',v); 단추.setAttribute('aria-pressed',v?'true':'false'); } }
  function 맞춤(){
    var 도=d.querySelector('.lab25-도우미칸'), 목=d.querySelector('.lab25-목록칸'); if(!도||!목) return;
    var 카드=목.parentElement&&목.parentElement.parentElement, 줄=카드&&카드.parentElement; if(!줄) return;
    if(켬('구조C')||켬('구조D')||켬('구조D2')||켬('AI밖')){
      if(!섹션){ 원자리=도.parentElement; 원다음=도.nextSibling; 섹션=d.createElement('div'); 섹션.className='lab27-AI섹션'; 섹션.style.boxShadow=getComputedStyle(카드).boxShadow; 줄.insertBefore(섹션,카드.nextSibling); 섹션.appendChild(도); 카드.classList.add('lab27-받은편지함카드');
        var 검=[].find.call(카드.querySelectorAll('header button'),function(b){ return /검색/.test(b.title||''); });
        if(검){ 단추=검.cloneNode(false); 단추.classList.add('lab27-AI단추'); 단추.title='AI 도우미'; 단추.setAttribute('aria-label','AI 도우미'); 단추.innerHTML=반짝; 검.parentNode.insertBefore(단추,검.nextSibling);
          단추.addEventListener('click',function(e){ e.stopPropagation(); 열기(!섹션.classList.contains('열림')); }); }
        열어봄=false; }
      if(켬('AI열림')&&!열어봄){ 열어봄=true; 열기(true); }
      if(!켬('AI열림')&&열어봄){ 열어봄=false; 열기(false); }
    } else if(섹션){
      if(원자리) 원자리.insertBefore(도,원다음&&원다음.parentNode===원자리?원다음:null);
      섹션.remove(); 섹션=null; if(단추){ 단추.remove(); 단추=null; } 카드.classList.remove('lab27-받은편지함카드'); 열어봄=false;
    } }
  /* D — 제목 줄 · 도구 줄을 왼쪽(목록 위) · 오른쪽(내용 위)으로 · 보기 전환은 왼쪽 위로 옮김 · 풀면 원래 자리로 */
  var D=null;
  function D맞춤(){ var 목=d.querySelector('.lab25-목록칸'); if(!목) return; var 카드=목.parentElement&&목.parentElement.parentElement; if(!카드) return;
    var 머=카드.querySelector(':scope > header'), 도=머&&머.nextElementSibling;
    if(켬('구조D')&&!D&&머&&도){ var 제목=머.querySelector('h1'), 보기=도.querySelector(':scope > .ml-auto'), 묶=[].filter.call(도.children,function(c){ return c!==보기; });
      if(!제목||!보기||묶.length<3) return;
      D={머:머,도:도,제목:제목,보기:보기,보기다음:보기.nextSibling,묶:묶};
      var 왼=d.createElement('div'); 왼.className='lab27-왼'; 머.insertBefore(왼,제목); 왼.appendChild(제목); 왼.appendChild(보기); D.왼머=왼;
      var 왼2=d.createElement('div'); 왼2.className='lab27-왼'; 도.insertBefore(왼2,묶[0]); 왼2.appendChild(묶[0]); D.왼도=왼2;
      도.classList.add('lab27-도구줄'); 묶[1].classList.add('lab27-메일1'); 묶[2].classList.add('lab27-메일2');
      카드.style.setProperty('--lab27위높이',(도.getBoundingClientRect().bottom-카드.getBoundingClientRect().top)+'px'); }
    else if(!켬('구조D')&&D){ D해체(); } }
  var 원맞춤=맞춤; 맞춤=function(){ 원맞춤(); D맞춤(); };
  /* E — 목록 칸을 LNB 옆 판으로 · 제목 · 보기 전환 · 새로고침 묶음을 그 판 위 두 줄로 · AI 는 카드 안에서 폭으로 열고 닫음 · 풀면 다 원래 자리로 */
  var E=null;
  function 자리(el){ return [el.parentNode, el.nextSibling]; }
  function 되놓기(el,z){ if(z[0]) z[0].insertBefore(el, z[1]&&z[1].parentNode===z[0]?z[1]:null); }
  function E열기(v){ if(!E) return; E.도우미.classList.toggle('lab27-열림',v); if(E.단추){ E.단추.classList.toggle('열림',v); E.단추.setAttribute('aria-pressed',v?'true':'false'); } }
  function E맞춤(){
    var D2=켬('구조D2'); if((켬('구조E')||D2)&&!E){ var 목=d.querySelector('.lab25-목록칸'), 도우미=d.querySelector('.lab25-도우미칸'); if(!목||!도우미) return;
      var 카드=목.parentElement&&목.parentElement.parentElement, 줄=카드&&카드.parentElement, 옆=줄&&줄.querySelector(':scope > aside'); if(!옆) return;
      var 머=카드.querySelector(':scope > header'), 도=머&&머.nextElementSibling; if(!도) return;
      var 제목=머.querySelector('h1'), 보기=도.querySelector(':scope > .ml-auto'), G1=[].filter.call(도.children,function(c){ return c!==보기; })[0]; if(!제목||!보기||!G1) return;
      E={목:목,목z:자리(목),제목:제목,제목z:자리(제목),보기:보기,보기z:자리(보기),G1:G1,G1z:자리(G1),옆:옆,카드:카드,머:머,도우미:도우미};
      /* 1안 틀이 카드 여백 · 모서리 · 바탕을 「aside 바로 다음 칸」 으로 줌(실측: 판을 끼우자 카드가 위 · 오른쪽 여백을 잃고 판이 그걸 받아 LNB 와 12 떨어짐) → 끼우기 전 카드 값을 재 두고 인라인으로 고정 */
      var cc=getComputedStyle(카드), 옛=카드.getAttribute('style'); E.카드style=옛;
      ['marginTop','marginRight','marginBottom','marginLeft','borderRadius','backgroundColor','boxShadow','borderTopWidth','borderTopStyle','borderTopColor','overflow'].forEach(function(k){ 카드.style[k]=cc[k]; });
      ['borderRightWidth','borderBottomWidth','borderLeftWidth'].forEach(function(k){ 카드.style[k]=cc[k]; }); 카드.style.borderStyle=cc.borderTopStyle; 카드.style.borderColor=cc.borderTopColor;
      var 판=d.createElement('div'); 판.className='lab27-목록판'; var 판머=머.cloneNode(false); 판머.classList.add('lab27-판머리'); var 판도=도.cloneNode(false); 판도.classList.add('lab27-판도구');
      판머.appendChild(제목); 판머.appendChild(보기); 판도.appendChild(G1); 판.appendChild(판머); 판.appendChild(판도); 판.appendChild(목); E.판=판; E.D2=D2;
      if(D2){ var 우=d.createElement('div'); 우.className='lab27-오른열'; [].slice.call(카드.children).forEach(function(c){ 우.appendChild(c); }); 카드.appendChild(판); 카드.appendChild(우); 카드.classList.add('lab27-D2카드'); E.우=우; }
      else 줄.insertBefore(판,카드);
      var cs=getComputedStyle(옆); if(!D2) 판.style.setProperty('margin',cs.marginTop+' 0 '+cs.marginBottom+' 0','important'); if(!D2) 판.style.setProperty('border-radius','0 10px 10px 0','important'); 판.style.setProperty('box-shadow','none','important'); 판.style.setProperty('padding','0','important'); if(!D2){ 판.style.boxShadow=cc.boxShadow; 판.style.clipPath='inset(-24px -24px -24px 0)'; }   /* 사용자 「e 에서 받은편지함 쪽에 그림자 효과가 없고」 — 카드와 같은 그림자 · LNB 와 붙은 왼쪽엔 안 번지게 잘라 냄 */
      if(!D2) 옆.classList.add('lab27-LNB붙음'); 머.classList.add('lab27-E머리');
      var 검=[].find.call(머.querySelectorAll('button'),function(b){ return /검색/.test(b.title||''); });
      if(검&&!D2){ var 단=검.cloneNode(false); 단.classList.add('lab27-AI단추'); 단.title='AI 도우미'; 단.setAttribute('aria-label','AI 도우미'); 단.innerHTML=반짝; 검.parentNode.insertBefore(단,검.nextSibling); E.단추=단;
        단.addEventListener('click',function(e){ e.stopPropagation(); E열기(!E.도우미.classList.contains('lab27-열림')); }); }
      E.열어봄=false; }
    if(E&&(켬('구조E')||켬('구조D2'))){ if(켬('AI열림')&&!E.열어봄){ E.열어봄=true; E열기(true); } if(!켬('AI열림')&&E.열어봄){ E.열어봄=false; E열기(false); } }
    if(!(켬('구조E')||켬('구조D2'))&&E){ E해체(); } }
  /* E2 머리 정리 — E 위에서만 · 켜고 끄기를 따로(안을 바꿔도 E 는 남을 수 있음) */
  function E2맞춤(){ if(!E) return;
    if(켬('E머리정리')&&!E.e2){ var 탭=E.목.querySelector('.lab25-목록카드 > div:first-child')||E.목.querySelector(':scope > div:first-child'); var 아이=E.머.querySelector(':scope > div:last-child'); if(!탭||!아이) return;
      E.e2={탭:탭,탭z:자리(탭),보기z:자리(E.보기)}; 탭.classList.add('lab27-탭'); E.판.children[1].insertBefore(탭,E.판.children[1].firstChild);   /* 사용자 「e2 에서 타이틀 아래에 전체 안읽음 읽음하고 기능들 들어오게」 — 둘째 줄 = 탭 + 새로고침 · 모아보기 */ E.보기.classList.add('lab27-보기'); 아이.appendChild(E.보기); [].forEach.call(E.G1.querySelectorAll('button'),function(b){ if(!b.title) b.title=b.textContent.trim(); [].slice.call(b.childNodes).forEach(function(n){ if(n.nodeType===3&&n.textContent.trim()){ var t=d.createElement('span'); t.className='lab27-글'; t.textContent=n.textContent; b.replaceChild(t,n); } }); }); }
    else if(!켬('E머리정리')&&E.e2){ 되놓기(E.e2.탭,E.e2.탭z); E.e2.탭.classList.remove('lab27-탭'); 되놓기(E.보기,E.e2.보기z); E.보기.classList.remove('lab27-보기'); E.e2=null; } }
  /* 걷기 — 구조 항목 조합이 바뀌면 넷(E2 · E/D2 · D · C)을 모두 원래대로 걷고 새로 지음
     사용자 「d2 하고 e 하고 구조가 달라서 그런지 서로 왔다 갔다 하면 이상하게 보임」 — E 와 D2 는 같은 엔진이라 오갈 때 「이미 지음」 으로 보고 안 다시 지어 앞 배치가 남았음 */
  function E2해체(){ if(!E||!E.e2) return; 되놓기(E.e2.탭,E.e2.탭z); E.e2.탭.classList.remove('lab27-탭'); 되놓기(E.보기,E.e2.보기z); E.보기.classList.remove('lab27-보기'); E.e2=null; }
  function E해체(){ if(!E) return; E2해체(); if(E.우){ [].slice.call(E.우.children).forEach(function(c){ E.카드.insertBefore(c,E.판); }); E.우.remove(); E.카드.classList.remove('lab27-D2카드'); } 되놓기(E.목,E.목z); 되놓기(E.제목,E.제목z); 되놓기(E.보기,E.보기z); 되놓기(E.G1,E.G1z); E.판.remove(); if(E.단추) E.단추.remove();
      E.옆.classList.remove('lab27-LNB붙음'); E.머.classList.remove('lab27-E머리'); if(E.카드style===null) E.카드.removeAttribute('style'); else E.카드.setAttribute('style',E.카드style); E.도우미.classList.remove('lab27-열림'); E=null;  }
  function D해체(){ if(!D) return; D.머.insertBefore(D.제목,D.왼머); D.왼머.remove(); D.도.insertBefore(D.묶[0],D.왼도); D.왼도.remove(); D.도.insertBefore(D.보기,D.보기다음&&D.보기다음.parentNode===D.도?D.보기다음:null);
      D.도.classList.remove('lab27-도구줄'); D.묶[1].classList.remove('lab27-메일1'); D.묶[2].classList.remove('lab27-메일2'); D.머.parentElement.style.removeProperty('--lab27위높이'); D=null;  }
  function C해체(){ if(!섹션) return; var 도=섹션.querySelector('.lab25-도우미칸'); if(도&&원자리) 원자리.insertBefore(도,원다음&&원다음.parentNode===원자리?원다음:null); 섹션.remove(); 섹션=null; if(단추){ 단추.remove(); 단추=null; } [].forEach.call(d.querySelectorAll('.lab27-받은편지함카드'),function(x){ x.classList.remove('lab27-받은편지함카드'); }); 열어봄=false; }
  /* G — 메일 카드 오른쪽 위 「✦ AI 도우미」 단추 · html.lab27-편지AI 로 열고 닫음 */
  var G=null;
  function G맞춤(){ if(켬('AI편지안')){ var 카=d.querySelector('.lab25-상세카드'); if(!카) return;
      if(!G||!G.단.isConnected){ var 단=d.createElement('button'); 단.type='button'; 단.className='lab27-편지AI단추'; 단.innerHTML=반짝+'AI 도우미'; 카.appendChild(단); G={단:단,열어봄:false};
        단.addEventListener('click',function(e){ e.stopPropagation(); var v=!h.classList.contains('lab27-편지AI'); h.classList.toggle('lab27-편지AI',v); 단.classList.toggle('열림',v); }); }
      if(켬('AI열림')&&!G.열어봄){ G.열어봄=true; h.classList.add('lab27-편지AI'); G.단.classList.add('열림'); }
      if(!켬('AI열림')&&G.열어봄){ G.열어봄=false; h.classList.remove('lab27-편지AI'); G.단.classList.remove('열림'); } }
    else G해체(); }
  function G해체(){ if(G){ G.단.remove(); G=null; } if(h.classList.contains('lab27-편지AI')) h.classList.remove('lab27-편지AI'); }   /* 없는 클래스도 remove 하면 class 속성이 다시 쓰여 감시가 또 돎 → 무한 반복 */
  /* AI접기 — 제목 줄 검색 옆 ✦ 단추 · 도우미 머리의 » 단추도 접기 */
  var K=null;
  function K열기(v){ h.classList.toggle('lab27-AI펼침',v); if(K){ K.단.classList.toggle('열림',v); K.단.setAttribute('aria-pressed',v?'true':'false'); } }
  function K맞춤(){ if(켬('AI접기')){
      if(!K||!K.단.isConnected){ var 검=[].find.call(d.querySelectorAll('header button'),function(b){ return /검색/.test(b.title||''); }); if(!검) return;
        var 단=검.cloneNode(false); 단.classList.add('lab27-AI단추'); 단.title='AI 도우미'; 단.setAttribute('aria-label','AI 도우미'); 단.innerHTML=반짝; 검.parentNode.insertBefore(단,검.nextSibling); K={단:단,열어봄:false};
        단.addEventListener('click',function(e){ e.stopPropagation(); K열기(!h.classList.contains('lab27-AI펼침')); });
        var 도=d.querySelector('.lab25-도우미카드'); if(도&&!도.__lab27접기){ 도.__lab27접기=1; 도.addEventListener('click',function(e){ var b=e.target.closest('button'); if(b&&K&&b.getBoundingClientRect().top-도.getBoundingClientRect().top<60&&b.getBoundingClientRect().right>도.getBoundingClientRect().right-60){ e.stopPropagation(); e.preventDefault(); K열기(false); } },true); } }
      if(켬('AI열림')&&!K.열어봄){ K.열어봄=true; K열기(true); }
      if(!켬('AI열림')&&K.열어봄){ K.열어봄=false; K열기(false); } }
    else K해체(); }
  function K해체(){ if(K){ K.단.remove(); K=null; } if(h.classList.contains('lab27-AI펼침')) h.classList.remove('lab27-AI펼침'); }
  /* AB끌선 — 목록 칸 폭을 끌어서 조절 · 두 번 누르면 350 으로 */
  var 끌=null;
  function 끌맞춤(){ if(켬('AB끌선')&&켬('구조B')){ var 칸=d.querySelector('.lab25-목록칸'); if(!칸) return; if(끌&&끌.선.isConnected) return;
      if(getComputedStyle(칸).position==='static') 칸.style.position='relative';
      var 선=d.createElement('div'); 선.className='lab27-끌선'; 선.title='끌어서 목록 폭 조절 · 두 번 누르면 처음 폭'; 칸.appendChild(선); 끌={선:선,칸:칸};
      function 폭(w){ w=Math.max(260,Math.min(560,Math.round(w))); 칸.style.setProperty('width',w+'px','important'); 칸.style.setProperty('flex-basis',w+'px','important'); }
      선.addEventListener('mousedown',function(e){ if(e.button) return; e.preventDefault(); var x0=e.clientX, w0=칸.getBoundingClientRect().width; 선.classList.add('끄는중'); h.classList.add('lab27-끄는중');
        function 움(ev){ 폭(w0+ev.clientX-x0); } function 끝(){ 선.classList.remove('끄는중'); h.classList.remove('lab27-끄는중'); d.removeEventListener('mousemove',움); d.removeEventListener('mouseup',끝); }
        d.addEventListener('mousemove',움); d.addEventListener('mouseup',끝); });
      선.addEventListener('dblclick',function(){ 폭(350); }); }
    else 끌해체(); }
  function 끌해체(){ if(끌){ 끌.선.remove(); 끌.칸.style.removeProperty('width'); 끌.칸.style.removeProperty('flex-basis'); 끌=null; } }
  /* 필터위로 — 도구줄 맨 앞 묶음 · 필터 펼침에서 고르면 숨은 원래 탭 단추를 눌러 줌 */
  var 필=null, 아래='<svg class="lab27-아래" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>', 체표='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  function 필맞춤(){ if(켬('필터위로')){ if(필&&필.묶.isConnected) return;
      var 새=[].find.call(d.querySelectorAll('button'),function(b){ return /새로고침/.test(b.textContent)&&b.closest('.lab18-도구줄'); }); if(!새) return; var 줄=새.closest('.lab18-도구줄'), 원묶=새.parentElement, 가름=원묶.querySelector('.tb-divider');
      var 묶=d.createElement('div'); 묶.className=원묶.className+' lab27-도구앞'; 줄.insertBefore(묶,줄.firstChild);
      var 단=새.cloneNode(false); 단.classList.add('lab27-필터단추'); 단.innerHTML='<span>전체</span>'+아래; 단.title='필터';
      var 판=d.createElement('div'); 판.className='lab27-필터판';
      ['전체','안읽음','읽음'].forEach(function(t,i){ var o=d.createElement('button'); o.type='button'; o.innerHTML='<span>'+t+'</span>'+체표; if(!i) o.classList.add('켬'); 판.appendChild(o);
        o.addEventListener('click',function(e){ e.stopPropagation(); [].forEach.call(판.children,function(x){ x.classList.toggle('켬',x===o); }); 단.firstChild.textContent=t; 단.classList.toggle('걸림',i>0); 판.classList.remove('열림'); 단.classList.remove('열림');
          var 원=[].find.call(d.querySelectorAll('.lab25-목록카드 > div:first-child button'),function(b){ return b.textContent.trim()===t; }); if(원) 원.click(); }); });
      if(가름) 묶.appendChild(가름.cloneNode(false)); 묶.appendChild(단); 묶.appendChild(판);
      단.addEventListener('click',function(e){ e.stopPropagation(); var v=!판.classList.contains('열림'); 판.classList.toggle('열림',v); 단.classList.toggle('열림',v); 판.style.left=단.offsetLeft+'px'; });
      function 닫(){ 판.classList.remove('열림'); 단.classList.remove('열림'); } d.addEventListener('click',닫); 필={묶:묶,닫:닫}; }
    else 필해체(); }
  function 필해체(){ if(필){ 필.묶.remove(); d.removeEventListener('click',필.닫); 필=null; } }
  /* 체크박스 — 메일 줄 맨 앞 · 목록 위 전체 선택 · 누르면 메일은 안 열림 */
  var 체=null, V='<svg class="v" viewBox="0 0 12 12" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 6.2 5 8.6 9.6 3.6"/></svg><svg class="ㅡ" viewBox="0 0 12 12" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M3 6h6"/></svg>';
  function 체상자(){ var s=d.createElement('span'); s.className='lab27-체크'; s.setAttribute('role','checkbox'); s.setAttribute('aria-checked','false'); s.innerHTML=V; return s; }
  function 체줄들(){ return [].slice.call(d.querySelectorAll('.lab25-목록카드 button.w-full')); }
  function 체새로(){ if(!체) return; var 줄=체줄들(), n=줄.filter(function(b){ return b.classList.contains('lab27-체크됨'); }).length, 전=체.전.querySelector('.lab27-체크');
    전.classList.toggle('켬',n&&n===줄.length); 전.classList.toggle('일부',n>0&&n<줄.length); 전.setAttribute('aria-checked',n===줄.length&&n?'true':(n?'mixed':'false')); 체.수.textContent=n?n+'개 선택':(켬('필터위로')?'':'전체 선택'); }
  function 체열쇠(b){ return (b.textContent||'').replace(/\s+/g,' ').slice(0,80)+'#'+체줄들().filter(function(x){ return x.textContent===b.textContent; }).indexOf(b); }
  function 체칠(b,v){ b.classList.toggle('lab27-체크됨',v); var c=b.querySelector(':scope > .lab27-체크'); if(c){ c.classList.toggle('켬',v); c.setAttribute('aria-checked',v?'true':'false'); } }
  function 체줄채움(){ 체줄들().forEach(function(b){ if(!b.querySelector(':scope > .lab27-체크')) b.insertBefore(체상자(),b.firstChild); 체칠(b,!!(체&&체.고름[체열쇠(b)])); }); }
  /* 줄을 누르면 메일이 열리는 처리가 먼저 가로채서(실측: 체크 대신 메일이 열림) — window 캡처 단계에서 체크박스 누름을 먼저 잡고 멈춤 */
  function 체가로(e){ if(!체) return; var c=e.target&&e.target.closest&&e.target.closest('.lab27-체크, .lab27-전체선택'); if(!c) return; e.stopImmediatePropagation(); e.preventDefault(); if(e.type!=='click') return;
    if(c.closest('.lab27-전체선택')){ var 줄=체줄들(), 다=줄.length&&줄.every(function(b){ return 체.고름[체열쇠(b)]; }); 줄.forEach(function(b){ var k=체열쇠(b); if(다) delete 체.고름[k]; else 체.고름[k]=1; 체칠(b,!다); }); }
    else { var b=c.closest('button.w-full'); if(!b) return; var k=체열쇠(b), v=!체.고름[k]; if(v) 체.고름[k]=1; else delete 체.고름[k]; 체칠(b,v); }
    체새로(); }
  ['pointerdown','mousedown','mouseup','pointerup','click'].forEach(function(t){ w.addEventListener(t,체가로,true); });
  function 체맞춤(){ if(켬('체크박스')){ var 탭=켬('필터위로')?(필&&필.묶):d.querySelector('.lab25-목록카드 > div:first-child:not(.overflow-y-auto)'); if(!탭) return;
      if(!체||!체.전.isConnected){ var 전=d.createElement('label'); 전.className='lab27-전체선택'; var s=체상자(), 수=d.createElement('span'); 수.textContent='전체 선택'; 전.appendChild(s); 전.appendChild(수); 탭.insertBefore(전,탭.firstChild); 체={전:전,수:수,고름:{}};
        var 판=d.querySelector('.lab25-목록카드 .overflow-y-auto'); if(판){ 체.관=new MutationObserver(function(){ 체줄채움(); 체새로(); }); 체.관.observe(판,{childList:true}); } }
      체줄채움(); 체새로(); }
    else 체해체(); }
  function 체x맞춤(){ if(!체||!켬('필터위로')) return; var 줄체=d.querySelector('.lab25-목록카드 button.w-full > .lab27-체크'), 전체=체.전.querySelector('.lab27-체크'); if(!줄체) return; var 지금=parseFloat(getComputedStyle(체.전).marginLeft)||0, 차=줄체.getBoundingClientRect().left-전체.getBoundingClientRect().left; if(Math.abs(차)>0.5) 체.전.style.setProperty('--lab27체x',(지금+차)+'px'); }
  function 체해체(){ if(체){ 체.전.remove(); if(체.관) 체.관.disconnect(); 체=null; } [].forEach.call(d.querySelectorAll('.lab27-체크'),function(x){ x.remove(); }); [].forEach.call(d.querySelectorAll('.lab27-체크됨'),function(x){ x.classList.remove('lab27-체크됨'); }); }
  /* 계정여럿 — 연동 계정 줄(lab18-계정)을 복제해 가짜 계정 둘 더함 · 누른 줄로 「사용중」 표가 옮겨 감(보기만 · 실제 계정 전환 아님) */
  var 계=null;
  function 계맞춤(){ if(켬('계정여럿')){ if(계&&계.원.isConnected) return; var 원=d.querySelector('.lab18-계정'); if(!원) return; var 표=원.querySelector('.lab18-계정표'); if(!표) return;
      var 새들=['work@example.com','team@example.co.kr'].map(function(주소){ var b=원.cloneNode(true); b.classList.add('lab27-가짜계정'); b.removeAttribute('title'); var 글=b.querySelector('span:not(.lab18-계정표)'); if(글) 글.textContent=주소; var t=b.querySelector('.lab18-계정표'); if(t) t.remove(); b.setAttribute('data-lab18-첫',주소[0].toUpperCase()); return b; });
      var 뒤=원.nextSibling; 새들.forEach(function(b){ 원.parentNode.insertBefore(b,뒤); });
      계={원:원,새들:새들,표:표,줄들:[원].concat(새들)}; }
    else 계해체(); }
  var 계주소=['criss_it@naver.com','work@example.com','team@example.co.kr'];
  /* 드롭다운 — 지금 계정 줄에 ▾ · 누르면 바로 아래 펼침(position:fixed · LNB 스크롤 칸에 잘리지 않게) */
  var 드=null;
  function 드맞춤(){ if(켬('계정드롭')){ if(드&&드.원.isConnected) return; var 원=d.querySelector('.lab18-계정'); if(!원) return;
      var 아=d.createElement('span'); 아.className='lab27-계정아래'; 아.innerHTML=아래; 원.appendChild(아);
      var 판=d.createElement('div'); 판.className='lab27-계정판'; d.body.appendChild(판);
      드={원:원,아:아,판:판,지금:0}; 드그림(); }
    else 드해체(); }
  function 드그림(){ var 판=드.판; 판.innerHTML=계주소.map(function(a,i){ return '<button type="button" data-i="'+i+'" class="'+(i===드.지금?'켬':'')+'"><span class="lab27-계정첫">'+a[0].toUpperCase()+'</span><span class="lab27-계정글">'+a+'</span>'+체표+'</button>'; }).join('')+'<div class="lab27-계정가름"></div><button type="button" class="lab27-계정더"><span class="lab27-계정첫 더">+</span><span class="lab27-계정글">'+(켬('메일계정이름')?'메일 계정 추가':'계정 연동하기')+'</span></button>'; }
  function 드해체(){ if(드){ 드.아.remove(); 드.판.remove(); var 글=드.원.querySelector('span:not(.lab18-계정표):not(.lab27-계정아래)'); if(글) 글.textContent=계주소[0]; 드=null; } }
  /* 계정 누름은 화면 처리가 먼저 가로채서(실측: 나열형에서 눌러도 안 옮겨 감) window 캡처에서 먼저 잡음 */
  function 계가로(e){ var t=e.target; if(!t||!t.closest) return;
    var 판단=드&&t.closest('.lab27-계정판 button'), 줄=t.closest('.lab18-계정');
    if(!판단&&!(줄&&(계||드))){ if(드&&e.type==='click'&&!t.closest('.lab27-계정판')){ 드.판.classList.remove('열림'); 드.원.classList.remove('lab27-펼침'); } return; }
    e.stopImmediatePropagation(); e.preventDefault(); if(e.type!=='click') return;
    if(판단){ if(판단.dataset.i!=null){ 드.지금=+판단.dataset.i; var 글=드.원.querySelector('span:not(.lab18-계정표):not(.lab27-계정아래)'); if(글) 글.textContent=계주소[드.지금]; 드그림(); } 드.판.classList.remove('열림'); 드.원.classList.remove('lab27-펼침'); return; }
    if(드&&줄===드.원){ var v=!드.판.classList.contains('열림'); if(v){ var r=드.원.getBoundingClientRect(); 드.판.style.left=r.left+'px'; 드.판.style.top=(r.bottom+4)+'px'; 드.판.style.width=Math.max(r.width,232)+'px'; } 드.판.classList.toggle('열림',v); 드.원.classList.toggle('lab27-펼침',v); return; }
    if(계&&계.줄들.indexOf(줄)>=0) 줄.appendChild(계.표); }
  ['pointerdown','mousedown','mouseup','pointerup','click'].forEach(function(t){ w.addEventListener(t,계가로,true); });
  /* 메일계정이름 — LNB 묶음 제목 글자만 바꿈(사용자 「연동 계정도 연동된 메일 계정의 줄임말인데 메일 계정이 나을 것 같기도」) */
  var 이름=null;
  function 이름맞춤(){ if(켬('메일계정이름')){ if(이름&&이름.isConnected) return; var 걷=d.createTreeWalker(d.body,NodeFilter.SHOW_TEXT), n, t=null; while((n=걷.nextNode())){ if(n.nodeValue.trim()==='연동 계정'){ t=n; break; } } if(t){ t.nodeValue=t.nodeValue.replace('연동 계정','메일 계정'); 이름=t; } if(드) 드그림(); }
    else if(이름){ 이름.nodeValue=이름.nodeValue.replace('메일 계정','연동 계정'); 이름=null; if(드) 드그림(); } }
  function 계해체(){ if(계){ 계.새들.forEach(function(b){ b.remove(); }); if(계.표.parentNode!==계.원) 계.원.appendChild(계.표); 계=null; } }
  var 앞표=null;
  맞춤=function(){ var 표=['구조C','구조D','구조E','구조D2','E머리정리','AI편지안','AI밖','AI접기','AB끌선','체크박스','필터위로','계정여럿','계정드롭','메일계정이름'].map(켬).join(''); if(앞표!==null&&표!==앞표){ 드해체(); 계해체(); 체해체(); 필해체(); 끌해체(); K해체(); G해체(); E해체(); D해체(); C해체(); } 앞표=표; E맞춤(); E2맞춤(); 원맞춤(); D맞춤(); G맞춤(); K맞춤(); 끌맞춤(); 필맞춤(); 체맞춤(); 체x맞춤(); 계맞춤(); 드맞춤(); 이름맞춤(); };
  new MutationObserver(function(){ 맞춤(); }).observe(h,{attributes:true,attributeFilter:['class']});
  var 처음=setInterval(맞춤,300); setTimeout(function(){ clearInterval(처음); },6000); 맞춤();
})();

/* 30 메일 색 엔진 — html 클래스 lab25켬-<id> 를 보고 줄마다 시연 상태를 칠함 · 바뀌면 다 걷고 다시 */
(function(){ var d=document, w=window; if(d.__lab30) return; d.__lab30=1; var h=d.documentElement;
  function 켬(c){ return h.classList.contains('lab25켬-'+c); }
  var 상태=[{읽:0,답:1,별:1},{읽:0},{읽:1},{읽:0},{읽:1},{읽:1,분:'프로모션'},{읽:1,분:'프로모션'}];   /* 분류 = LNB 스마트 메일함에 있는 것만(사용자 「알림은 뭐임?」 — 지어낸 분류였음 → 뺌) */
  var 색들=['보','파','초','주'];
  function 줄들(){ return [].slice.call(d.querySelectorAll('.lab25-목록카드 button.w-full')); }
  function 색(이름){ var n=0; for(var i=0;i<이름.length;i++) n=(n*31+이름.charCodeAt(i))%9973; return 색들[n%색들.length]; }
  var 봉닫힘='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>', 봉열림='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg>';
  var 별켬={}, 거름=null, 요약=null, 관=null, 앞표=null, 큰=null, 걸름줄=null, 수={};
  /* 시연큰수 — 서버가 센 전체 수인 셈(보이는 7 줄 밖의 메일) · 처음 안읽음 합 = 10,000,000,000,000 · 답장 필요 합 = 1,284 */
  function 큰수(){ if(!켬('시연큰수')) return {안:0,답:0}; if(!큰) 큰={안:9999999999997,답:1283}; return 큰; }
  function 쉼(n){ return n.toLocaleString('ko-KR'); }
  var 시연이름={2:'김민수',4:'이서연'};
  function 시연맞춤(){ 줄들().forEach(function(b,i){ var 이=b.querySelector('.flex.items-center.gap-1 span.flex-1'); if(!이) return; if(켬('시연사람')&&시연이름[i]){ if(!이.dataset.lab30원) 이.dataset.lab30원=이.textContent; if(이.textContent!==시연이름[i]) 이.textContent=시연이름[i]; } else if(이.dataset.lab30원){ 이.textContent=이.dataset.lab30원; delete 이.dataset.lab30원; } }); }
  function 칠(){ 시연맞춤(); var 점=켬('색점'), 칩=켬('색칩'), 별=켬('색별'), 사=켬('색사람');
    줄들().forEach(function(b,i){ var s=상태[i]||{읽:1}, 머리=b.querySelector('.flex.items-center.gap-1'), 이름=머리&&머리.querySelector('span.flex-1'), 날=머리&&머리.lastElementChild;
      b.classList.toggle('lab30-안읽음',점&&!s.읽);
      var 답장=켬('색답장'), 답=b.querySelector('.lab30-답장'); if(답장&&s.답&&!답&&머리){ 답=d.createElement('span'); 답.className='lab30-답장'; 답.textContent='답장 필요'; 머리.insertBefore(답,날); } if(!(답장&&s.답)&&답) 답.remove();
      var 분=b.querySelector('.lab30-분류'); if(칩&&s.분&&!분&&머리){ 분=d.createElement('span'); 분.className='lab30-분류'; 분.textContent=s.분; 머리.insertBefore(분,날); } if(!(칩&&s.분)&&분) 분.remove();
      var 별칸=b.lastElementChild; if(별칸&&별칸.querySelector('svg')){ var k=i in 별켬?별켬[i]:!!s.별; 별칸.classList.toggle('lab30-별칸',별); 별칸.classList.toggle('lab30-별켬',별&&k); }
      var 동=b.querySelector('.lab30-사람'); if(사&&!동&&이름){ 동=d.createElement('span'); var t=이름.textContent.replace(/["\s]/g,''); var 자동=/네이버|noreply|no-reply|알림|admin/i.test(t); 동.className='lab30-사람 '+(켬('사람구분')?(자동?'회':'사'):켬('사람돌림')?(자동?'회':색(t)):색(t));   /* 자동 발신 = 이름에 서비스 · noreply 류(시연 · 실서비스는 발신 주소로 가려야 함) */ 동.textContent=t.charAt(0); var 글=b.querySelector('.min-w-0.flex-1'); if(글) b.insertBefore(동,글); } if(!사&&동) 동.remove();
      if(동){ var 체칸=b.querySelector(':scope > .lab27-체크'), 안으로=켬('사람체크')&&체칸; if(안으로&&동.parentNode!==체칸) 체칸.appendChild(동); if(!안으로&&동.parentNode!==b){ var 글2=b.querySelector('.min-w-0.flex-1'); if(글2) b.insertBefore(동,글2); } }
      var 봉=b.querySelector(':scope > .lab30-봉투'), 봉켬=점&&켬('안봉투'); if(봉켬){ if(!봉){ 봉=d.createElement('span'); 봉.className='lab30-봉투'; var 점칸=b.querySelector(':scope > span.size-\\[5px\\]'); b.insertBefore(봉,점칸?점칸.nextSibling:b.firstChild); } 봉.innerHTML=s.읽?봉열림:봉닫힘; 봉.classList.toggle('읽음',!!s.읽); } else if(봉) 봉.remove(); });
    요약칠(); }
  function 요약칠(){ var 카=d.querySelector('.lab25-목록카드'); if(!카) return;
    if(!켬('색요약')){ if(요약){ 요약.remove(); 요약=null; } if(걸름줄){ 걸름줄.remove(); 걸름줄=null; } if(거름){ 거름=null; 거르기(); } return; }
    var 줄=줄들(), 큰=큰수(), 안=줄.filter(function(b,i){ return !(상태[i]||{읽:1}).읽; }).length+큰.안, 답=줄.filter(function(b,i){ return (상태[i]||{}).답; }).length+큰.답, 중=줄.filter(function(b,i){ return i in 별켬?별켬[i]:!!(상태[i]||{}).별; }).length;
    수={'안읽음':안,'답장 필요':답,'중요':중};
    /* 요약상한 — 칩은 99 넘으면 99+(MUI · Ant Design 배지 기본 상한 · 999+ 는 「안읽음 999+ ✕」 에서 칩 줄이 350 폭을 넘어 중요가 둘째 줄로 밀림) · 올리면 정확한 수(사용자 「안읽은 메일이 10000000000000 건이거나 하면?」) · 끄면 받은 수 그대로(지금 12) */
    var 상한=켬('요약상한'); function 칩수(n){ return 상한?(n>99?'99+':쉼(n)):String(n); }
    if(!요약||!요약.isConnected){ 요약=d.createElement('div'); 요약.className='lab30-요약'; var 판=카.querySelector('.overflow-y-auto'); 카.insertBefore(요약,판||null); }
    var 안아이콘=(켬('안점')||켬('안막대'))?'<i style="background:rgb(108,105,240)"></i>':'<i class="봉">'+봉닫힘+'</i>';   /* 안읽음 = 주요색으로 표시하는 꼴(점 · 막대)일 때만 주요색 점 · 아바타 · 굵게 · 흐림 · 봉투 꼴에선 색 뜻이 없으니 봉투 선 아이콘(사용자 「안읽음이 무조건 저 색은 아니지 않아?」) */
    요약.innerHTML=[['안읽음',안아이콘,안],['답장 필요','<i style="background:rgb(239,68,68)"></i>',답],['중요','<i class="별">★</i>',중]].map(function(x){ return '<button type="button" data-k="'+x[0]+'" class="'+(거름===x[0]?'켬':'')+'"'+(상한&&x[2]>99?' title="'+x[0]+' '+쉼(x[2])+'통"':'')+'>'+x[1]+x[0]+' <b>'+칩수(x[2])+'</b><span class="ㅅ">✕</span></button>'; }).join('');
    걸름줄칠(); }
  /* 요약걸름줄 — 칩을 눌러 걸렀을 때만 칩 줄 아래 「<이름> <정확한 수>통 · [일괄]」 · 안읽음 = 모두 읽음 · 중요 = 중요 모두 해제 · 답장 필요 = 수만(답장은 한 번에 못 함) */
  function 걸름줄칠(){ if(!켬('요약걸름줄')||!거름||!요약||!요약.isConnected){ if(걸름줄){ 걸름줄.remove(); 걸름줄=null; } return; }
    if(!걸름줄||!걸름줄.isConnected){ 걸름줄=d.createElement('div'); 걸름줄.className='lab30-걸름줄'; 요약.parentNode.insertBefore(걸름줄,요약.nextSibling); }
    var n=수[거름]||0, 단=(거름==='안읽음'&&n>0)?'<button type="button" data-a="읽음">모두 읽음</button>':(거름==='중요'&&n>0)?'<button type="button" data-a="별끔">중요 모두 해제</button>':'';
    걸름줄.innerHTML='<span>'+거름+' <b>'+쉼(n)+'</b>통</span>'+단; }
  function 거르기(){ 줄들().forEach(function(b,i){ var s=상태[i]||{읽:1}, 별=i in 별켬?별켬[i]:!!s.별, 남=!거름||(거름==='안읽음'&&!s.읽)||(거름==='답장 필요'&&s.답)||(거름==='중요'&&별); b.classList.toggle('lab30-걸러짐',!남); }); }
  function 해체(){ 줄들().forEach(function(b){ b.classList.remove('lab30-안읽음','lab30-걸러짐'); [].forEach.call(b.querySelectorAll('.lab30-답장,.lab30-분류,.lab30-사람,.lab30-봉투'),function(x){ x.remove(); }); var 별칸=b.lastElementChild; if(별칸) 별칸.classList.remove('lab30-별칸','lab30-별켬'); }); if(요약){ 요약.remove(); 요약=null; } if(걸름줄){ 걸름줄.remove(); 걸름줄=null; } 큰=null; 거름=null; }
  /* 별 · 요약 칩 누름 — 줄 누름(메일 열기)이 먼저 가로채므로 window 캡처에서 먼저 잡음(27 체크박스와 같은 까닭) */
  function 가로(e){ var t=e.target; if(!t||!t.closest) return; var 별칸=켬('색별')&&t.closest('.lab30-별칸'), 칩=t.closest('.lab30-요약 button'), 줄칸=t.closest('.lab30-걸름줄'); if(!별칸&&!칩&&!줄칸) return;
    e.stopImmediatePropagation(); e.preventDefault(); if(e.type!=='click') return;
    if(별칸){ var b=별칸.closest('button.w-full'), i=줄들().indexOf(b); 별켬[i]=!(i in 별켬?별켬[i]:!!(상태[i]||{}).별); 칠(); if(거름) 거르기(); return; }
    if(줄칸){ var 단=t.closest('.lab30-걸름줄 button'); if(!단) return;
      if(단.dataset.a==='읽음'){ 상태.forEach(function(s){ s.읽=1; }); if(큰) 큰.안=0; }   /* 보이는 줄만이 아니라 걸린 메일 전체(서버 수 포함) */
      if(단.dataset.a==='별끔'){ 줄들().forEach(function(b,i){ 별켬[i]=false; }); }
      칠(); return; }
    거름=(거름===칩.dataset.k)?null:칩.dataset.k; 거르기(); 요약칠(); }
  ['pointerdown','mousedown','mouseup','pointerup','click'].forEach(function(t){ w.addEventListener(t,가로,true); });
  /* 처음빈 — 안 고른 상태로 시작(25 엔진이 첫 메일을 연 채 시작하므로 고른 표시를 걷고 안내를 덮음) · 줄을 누르면 걷음 */
  var 빈한번=false, 빈칸=null;
  function 빈맞춤(){ if(!켬('처음빈')){ if(h.classList.contains('lab30-빈')) h.classList.remove('lab30-빈'); if(빈칸){ 빈칸.remove(); 빈칸=null; } 빈한번=false; return; }
    var 카=d.querySelector('.lab25-상세카드'); if(!카) return;
    if(!빈칸||!빈칸.isConnected){ 빈칸=d.createElement('div'); 빈칸.className='lab30-빈칸'; 빈칸.innerHTML='<span class="동"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></span><b>메일을 선택하세요</b><p>왼쪽 목록에서 메일을 고르면 여기에 내용이 보여요.</p>'; 카.appendChild(빈칸); }
    if(!빈한번){ 빈한번=true; h.classList.add('lab30-빈'); 줄들().forEach(function(b){ if(b.classList.contains('lab25-고른')) b.classList.remove('lab25-고른'); }); } }
  w.addEventListener('click',function(e){ if(!h.classList.contains('lab30-빈')) return; var b=e.target&&e.target.closest&&e.target.closest('.lab25-목록카드 button.w-full'); if(!b||e.target.closest('.lab27-체크,.lab30-별칸')) return; h.classList.remove('lab30-빈'); }, true);
  /* 메일을 누르면 읽음으로(사용자 「메일 누르면 읽음으로 바뀌게」) — 체크 · 별 · 요약 칩 누름은 위에서 먼저 멈추므로 여기 안 옴 · 걸러 보는 중엔 그 줄을 바로 숨기지 않음(요약 수만 갱신) */
  w.addEventListener('click',function(e){ var b=e.target&&e.target.closest&&e.target.closest('.lab25-목록카드 button.w-full'); if(!b||e.target.closest('.lab27-체크,.lab30-별칸')) return; var i=줄들().indexOf(b); if(i<0) return; if(!상태[i]) 상태[i]={읽:1}; if(상태[i].읽) return; 상태[i].읽=1; setTimeout(칠,0); }, true);
  function 맞춤(){ var 표=['색점','안점','안굵게','안막대','안흐림','색답장','색칩','색별','색사람','사람구분','사람이름별','사람체크','안봉투','안아진함','안아테','안아점','색요약','처음빈','사람돌림','시연사람','요약상한','요약걸름줄','시연큰수'].map(켬).join(''); if(앞표!==null&&표!==앞표) 해체(); 앞표=표; 칠(); 빈맞춤();
    var 판=d.querySelector('.lab25-목록카드 .overflow-y-auto'); if(판&&!관){ 관=new MutationObserver(function(){ 칠(); if(거름) 거르기(); }); 관.observe(판,{childList:true}); } }
  new MutationObserver(function(){ 맞춤(); }).observe(h,{attributes:true,attributeFilter:['class']});
  var 처음=setInterval(맞춤,300); setTimeout(function(){ clearInterval(처음); },6000); 맞춤();
})();

/* ── 31 AI내용단추 — 상세 카드에 「✦ AI 도우미」 단추 · 누르면 제목 줄 ✦(27 AI접기 단추)를 대신 눌러 엔진 상태를 그대로 씀 · 접기(»)는 LNB 패널 닫기 그림으로 ── */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab31) return; w.__lab31=1;
  var 반짝='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z"/><path d="M19 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/></svg>';
  var 패널닫기='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3.1" y="3.1" width="13.8" height="13.8" rx="2.5"/><path d="M12.25 3.1v13.8"/><path d="M6.8 7.5 9.3 10l-2.5 2.5"/></svg>';
  var 엑스='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg>';
  var 단=null, 원닫기=null;
  function 켬(c){ return h.classList.contains('lab25켬-'+c); }
  /* 정원크게 + 단추위로 — 단추를 메일 머리(카드 위 끝 ~ 보낸 사람 줄 아래 가로줄) 세로 가운데에 */
  function 가운데(){ if(!단) return; if(!(켬('정원크게')&&켬('단추위로')&&켬('AI아바타단추'))){ if(단.style.top) 단.style.top=''; return; }
    var 카=d.querySelector('.lab25-상세카드'), 보=d.querySelector('.lab25-읽기 .lab25-보낸'); if(!카||!보) return;
    var sp=단.querySelector('span'), 꼬=sp&&getComputedStyle(sp).position==='absolute'?Math.max(0,sp.offsetTop+sp.offsetHeight-단.offsetHeight):0;
    /* 사용자 「이름표 포함 가운데 정렬」 — 동그라미 + 아래로 삐져나온 꼬리표까지를 한 덩이로 보고 머리 세로 가운데에(offsetHeight = 56 / 88 · scale 영향 없음) */
    var 위=Math.round((보.getBoundingClientRect().bottom-카.getBoundingClientRect().top)/2-(단.offsetHeight+꼬)/2); if(단.style.top!==위+'px') 단.style.top=위+'px'; }
  /* 픽셀 맞춤(사용자 「멀리서 보면 우측 테두리가 더 얇아지는 느낌」) — 화면 배율 1.1 등에서 단추 왼쪽 · 위가 화면 점 사이에 걸리면 1.5 고리가 한쪽은 진한 2 점 · 다른 쪽은 흐린 3 점으로 갈려 얇아 보임
     → 정원더크게일 때 단추를 화면 점에 맞게 소수점만큼 translate(우리 단추 · GSAP 요소 아님) */
  function 점맞춤(){ if(!단) return; if(!켬('정원더크게')){ if(단.style.translate) 단.style.translate=''; return; }
    단.style.translate=''; var r=단.getBoundingClientRect(), p=w.devicePixelRatio||1; 단.style.setProperty('--lab31고리',(Math.max(1,Math.round(1.5*p))/p).toFixed(3)+'px');   /* 고리 두께도 화면 점 정수(배율 1.1 → 2 점) */
    var fx=(r.left*p)%1, fy=(r.top*p)%1;
    if(fx>.5) fx-=1; if(fy>.5) fy-=1; if(Math.abs(fx)>.01||Math.abs(fy)>.01) 단.style.translate=(-fx/p).toFixed(3)+'px '+(-fy/p).toFixed(3)+'px'; }
  w.addEventListener('resize',function(){ 가운데(); 점맞춤(); 말자리(); });
  /* 호버말풍선 — 단추 밖 말풍선 · 단추 왼쪽 14 · 동그라미 세로 가운데(offset 값이라 띠용 scale 영향 없음) */
  var 말=null;
  function 말자리(){ if(!단||!단.isConnected) return;
    if(!말||!말.isConnected){ 말=d.createElement('div'); 말.className='lab31-말'; 말.setAttribute('aria-hidden','true'); 말.innerHTML='<b>요약</b>하거나 <b>답장 초안</b>을 써 드릴까요?'; 단.parentElement.appendChild(말); }
    if(!단.dataset.말){ 단.dataset.말='1'; 단.addEventListener('mouseenter',function(){ if(말) 말.classList.add('보임'); }); 단.addEventListener('mouseleave',function(){ if(말) 말.classList.remove('보임'); }); 단.addEventListener('click',function(){ if(말) 말.classList.remove('보임'); }); }
    var 카=단.offsetParent; if(!카) return;
    말.style.top=(단.offsetTop+단.offsetHeight/2-17)+'px'; 말.style.right=(카.clientWidth-단.offsetLeft+14)+'px'; }
  function 맞춤(){
    if(!켬('AI내용단추')&&!켬('AI플로팅단추')&&!켬('AI아바타단추')){ if(단){ 단.remove(); 단=null; } return; }
    var 카=d.querySelector('.lab25-상세카드'); if(!카) return;
    if(!단||!단.isConnected){
      단=d.createElement('button'); 단.type='button'; 단.className='lab31-AI단추'; 단.innerHTML=반짝+'<span>AI 도우미</span>'; 카.appendChild(단);
      단.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation(); var k=d.querySelector('.lab27-AI단추'); if(k) k.click(); else h.classList.toggle('lab27-AI펼침'); 맞춤(); });
    }
    var 열=h.classList.contains('lab27-AI펼침'), 창닫기=켬('열리면창닫기');
    /* 열리면창닫기 — 열릴 때 단추는 얼굴 그대로 흐려지며 사라져야 함(처음 판은 × 꼴로 바뀐 뒤 사라졌음 · 사용자 「사라질 때 X 였다가 사라지는 현상」) → 열림 꼴 · × 를 안 씀 */
    단.classList.toggle('열림',열&&!창닫기); 단.setAttribute('aria-pressed',열?'true':'false'); /* 꼬리표가 늘 보이는 정원크게에선 브라우저 기본 말풍선(title 「AI 도우미 열기」)이 겹말이라 뺌 · 읽기 프로그램용 aria-label 은 그대로 */
    if(켬('정원크게')&&켬('AI아바타단추')) 단.removeAttribute('title'); else 단.title=열?'AI 도우미 닫기':'AI 도우미 열기';
    var 얼=켬('AI아바타단추'), 글=(켬('꼬리표이메일')?'메':'')+(얼?'얼':'')+((켬('단추로닫기')||얼)&&열&&!창닫기?'닫기':'열기');
    if(단.dataset.글!==글){ 단.dataset.글=글;
      단.innerHTML= 글.slice(-3)==='얼닫기' ? (켬('정원크게')?엑스+'<span>'+(켬('꼬리표이메일')?'이메일 AI 도우미':'AI 도우미')+'</span>':엑스) : 글.slice(-3)==='얼열기' ? '<img alt="" src="/prixm-screens/디자인개선1안/디자인개선/조합/1안/부품/도우미얼굴_480.png"><span>'+(켬('꼬리표이메일')?'이메일 AI 도우미':'AI 도우미')+'</span>' : 글==='닫기' ? 엑스+'<span>AI 도우미 닫기</span>' : 반짝+'<span>AI 도우미</span>'; }
    단.setAttribute('aria-label',열?'AI 도우미 닫기':'AI 도우미 열기');   /* 그림이 안 바뀌어도(열리면창닫기) 열림 상태 따라 */
    가운데(); 점맞춤(); 말자리();
    var 접=d.querySelector('button[title="AI 도우미 접기"]');
    if(접&&!접.classList.contains('lab31-닫기')){ 원닫기=접.innerHTML; 접.classList.add('lab31-닫기'); if(접.parentElement) 접.parentElement.classList.add('lab31-닫기자리'); }
    if(접){ var 그=켬('열리면창닫기')?'x':'p'; if(접.dataset.그!==그){ 접.dataset.그=그; 접.innerHTML=(그==='x'?엑스:패널닫기); 접.title='AI 도우미 닫기'; 접.setAttribute('aria-label','AI 도우미 닫기'); } }
  }
  /* 닫힘스르륵 — 열려 있을 때 닫기(창 × · 제목 줄 ✦ · 메일 쪽 단추) 누름을 붙잡아 0.2초 나가는 움직임 뒤에 다시 눌러 줌 */
  var 통과=0;
  d.addEventListener('click',function(e){ if(통과||!켬('닫힘스르륵')||!h.classList.contains('lab27-AI펼침')) return;
    var t=e.target&&e.target.closest&&e.target.closest('.lab31-닫기,.lab27-AI단추,.lab31-AI단추'); if(!t) return;
    e.preventDefault(); e.stopImmediatePropagation(); if(h.classList.contains('lab31-닫는중')) return;
    h.classList.add('lab31-닫는중');
    setTimeout(function(){ 통과=1; try{ t.click(); } finally{ 통과=0; h.classList.remove('lab31-닫는중'); } },200); },true);
  /* 폭스르륵 — 폭 전환이 끝나면 단추 자리 다시 잼(점맞춤 · 가운데) */
  d.addEventListener('transitionend',function(e){ if(e.propertyName==='width'&&e.target.classList&&e.target.classList.contains('lab25-도우미칸')){ 가운데(); 점맞춤(); 말자리(); } },true);
  /* 리스트보기 — 처음 = 리스트(test-crew 기본) · 「리스트 | 좌우 분할」 단추가 html.lab31-리스트 를 바꿈 · 「‹ 목록으로」 = 메일 고름을 걷고(lab30-빈) 목록으로 */
  var 리처음=false, 뒤=null;
  function 칸단추(){ return [].slice.call(d.querySelectorAll('button.seg-item')).filter(function(b){ return /리스트|좌우 분할/.test(b.textContent); }); }
  function 칸칠(){ var 리=h.classList.contains('lab31-리스트'); 칸단추().forEach(function(b){ var 켜=/리스트/.test(b.textContent)===리; b.classList.toggle('seg-on',켜); b.classList.toggle('seg-off',!켜); b.classList.toggle('lab18-켬',켜);   /* 켜진 꼴(흰 바탕 · 그림자)은 18 의 lab18-켬 이 그림 */ b.setAttribute('aria-pressed',켜?'true':'false'); }); }
  function 리맞춤(){
    if(!켬('리스트보기')){ if(리처음){ 리처음=false; h.classList.remove('lab31-리스트'); 칸칠(); } if(뒤){ 뒤.remove(); 뒤=null; } return; }
    if(!리처음){ if(!칸단추().length) return; 리처음=true; h.classList.add('lab31-리스트'); 칸칠(); }
    var 앞=d.querySelector('h1.lab18-제목');   /* 제목 「받은편지함」 맨 앞(자동화 상세 경로 줄 ← 와 같은 자리) */
    if(앞&&(!뒤||!뒤.isConnected)){ 뒤=d.createElement('button'); 뒤.type='button'; 뒤.className='lab31-목록으로'; 뒤.title='목록으로'; 뒤.setAttribute('aria-label','목록으로');
      뒤.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>';
      앞.insertBefore(뒤,앞.firstChild); }
  }
  d.addEventListener('click',function(e){ if(!켬('리스트보기')) return; var t=e.target&&e.target.closest;
    var 칸=t&&e.target.closest('button.seg-item');
    if(칸&&/리스트|좌우 분할/.test(칸.textContent)){ e.preventDefault(); e.stopImmediatePropagation(); h.classList.toggle('lab31-리스트',/리스트/.test(칸.textContent)); 칸칠(); return; }
    if(t&&e.target.closest('.lab31-목록으로')){ e.preventDefault(); e.stopImmediatePropagation(); if(말) 말.classList.remove('보임');
      h.classList.add('lab30-빈'); [].forEach.call(d.querySelectorAll('.lab25-목록카드 .lab25-고른'),function(b){ b.classList.remove('lab25-고른'); }); }
  },true);
  new MutationObserver(리맞춤).observe(h,{attributes:true,attributeFilter:['class']});
  var t2=setInterval(리맞춤,300); setTimeout(function(){ clearInterval(t2); },6000); 리맞춤();
  new MutationObserver(맞춤).observe(h,{attributes:true,attributeFilter:['class']});
  var t=setInterval(맞춤,300); setTimeout(function(){ clearInterval(t); },6000); 맞춤();
})();

/* 1안 · 고정 항목 — 저장본도우미메일(손질/31_AI도우미정본/1안반영.py) */
(function(){
  var d=document, w=window; if(!w.__lab25적용||w.__lab25메일) return;
  var 인사=d.querySelector('[data-ai-greeting]'), 흉=d.querySelector('.lab25-흉내');
  if(!인사||!흉||!d.querySelector('.lab25-도우미제목')) return;
  w.__lab25메일=1; d.documentElement.classList.add('lab25-메일');
  w.__lab25적용(['전'].concat(["처음가운데", "크게", "한줄", "프리즘테", "알약", "인사아래", "빛호버", "날기", "단계", "바탕셋", "막대", "구조B", "고른카드", "AB살짝선", "A바탕", "AI접기", "AB끌선", "끌꼴두줄", "체크박스", "필터위로", "끌선옅게", "색점", "안아진함", "색답장", "색칩", "색별", "색사람", "사람구분", "사람체크", "색요약", "처음빈", "목록여백6", "요약상한", "요약걸름줄", "꼴보라면", "보라면다듬", "띠좁게", "번짐뺌", "보라테", "띠75", "보라테진하게", "입력테", "라인흐름", "테좌측", "라인천천히", "AI열림", "AI아바타단추", "얼굴정원", "정원크게", "열리면창닫기", "정원더크게", "단추위로", "꼬리표이메일", "정원90", "폭스르륵", "호버말풍선", "리스트보기", "전체필터뺌"]));
})();
