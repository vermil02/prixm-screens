/* 조합 1안 · 부품/저장본도우미 — 손질/25_AI도우미/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-08
   이메일 저장본(d04)에만: 첫 메일을 연 채로 시작(가운데 읽기 칸) · 오른쪽 AI 도우미 = 25 랩 조합 · 추천 단추 / 입력창 → 물음 · 쓰는 중 · 답(시연).
   켠 항목: 얼굴 · 머리 크게 45(피그마 시안 2) · 얼굴 · 대화 전엔 가운데 크게 → 대화 중 머리 45 · 제안 꼴 · 회색 알약(레퍼런스) · 제안 빛 · 프리즘 테두리 올렸을 때만 · 추천 자리 · 인사 아래(피그마 원래) · 하는 일 한 줄(제목 아래) · 쓰는 중 테 · 프리즘(추천) · 전환 · GSAP(얼굴이 머리로 · 말풍선 · 답 차례로)(추천) · 쓰는 중 표시 · 하는 일 단계(사실 기반)(추천) */

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
})();

/* 1안 · 메일 연 채 + 대화 흉내 — 저장본도우미(손질/25_AI도우미/1안반영.py) */
(function(){
  var d=document, w=window; if(!w.__lab25적용||w.__lab25메일) return;
  var 인사=d.querySelector('[data-ai-greeting]'), 흉=d.querySelector('.lab25-흉내');
  if(!인사||!흉||!d.querySelector('.lab25-도우미제목')) return;
  w.__lab25메일=1; var h=d.documentElement; h.classList.add('lab25-메일');
  var 고정=["처음가운데", "크게", "한줄", "프리즘테", "알약", "인사아래", "빛호버", "날기", "단계"];
  function 상태(s){ w.__lab25적용(고정.concat([s])); }
  상태('전');

  /* ── 읽기 칸 ── */
  var 빈글=[].filter.call(d.querySelectorAll('p,div,span'),function(e){ return !e.children.length&&/메일을 선택해주세요/.test(e.textContent); })[0];
  var 빈=빈글&&빈글.parentElement, 칸=빈&&빈.closest('section'), 목록칸=칸&&칸.previousElementSibling;
  var 줄들=목록칸?[].slice.call(목록칸.querySelectorAll('div.overflow-y-auto > button')):[];
  if(!빈||!줄들.length) return;
  빈.classList.add('lab25-빈칸');
  var 읽기=d.createElement('div'); 읽기.className='lab25-읽기'; 칸.appendChild(읽기);
  /* 저장본 미리보기 글은 메일 머리 일부라 잘림 · 알림 메일은 HTML 주석뿐 → 시연 본문 */
  var 본문들={
    '화학안전팀 김민수입니다.':'안녕하세요, 화학안전팀 김민수입니다.\n\n지난주 회의 내용 정리해서 보냅니다. 중간에 변경된 부분이 있어서 헷갈릴 수 있는데, 아래 참고 부탁드립니다.\n\n먼저 2-부톡시에탄올 물성/독성 자료는 지난 회의에서 말씀드린 MSDS 기준 대신 최신 개정판 기준으로 다시 정리하기로 했습니다. 개정판 자료는 공유 폴더 「화학안전/2026」 에 올려 두었습니다.\n\n둘째, 취급 공정 점검 일정이 다음 주 수요일에서 목요일 오후 2시로 바뀌었습니다. 참석 가능 여부를 금요일까지 회신 부탁드립니다.\n\n셋째, 보호구 지급 기준은 현장 의견을 더 듣고 다음 회의에서 확정합니다.\n\n궁금한 점 있으면 편하게 연락 주세요.\n감사합니다.\n\n김민수 드림'
  };
  function 글(e){ return e?e.textContent.replace(/\s+/g,' ').trim():''; }
  function 메일(b){ var 칸들=b.querySelectorAll('.min-w-0 > div'), 머=칸들[0];
    var 보낸=글(머&&머.querySelector('span')), 날=글(머&&머.querySelector('.text-muted')), 제목=글(칸들[1]);
    var 본=본문들[제목]; if(!본){ 본=(칸들[2]?칸들[2].textContent:'').replace(/<!--[\s\S]*?(-->|$)/g,'').replace(/<!?\[[^\]]*\]>?/g,'').trim();
      if(본.length<20) 본=보낸.replace(/"/g,'')+' 알림 메일입니다.\n\n'+제목+'\n\n본인이 한 일이 아니라면 계정 설정에서 비밀번호를 바꾸고 2단계 인증을 확인해 주세요.\n\n이 메일은 발신 전용입니다.'; }
    return {보낸:보낸.replace(/"/g,''), 날:날, 제목:제목, 본:본}; }
  var 지금={};
  function 열기(b){
    줄들.forEach(function(x){ x.classList.toggle('lab25-고른',x===b); });
    지금=메일(b); 읽기.innerHTML='';
    var h2=d.createElement('h2'); h2.textContent=지금.제목; 읽기.appendChild(h2);
    var 보=d.createElement('div'); 보.className='lab25-보낸'; 보.innerHTML='<span class="lab25-보낸얼굴"></span><div><b></b><em class="lab25-보낸때"></em></div>';
    보.querySelector('.lab25-보낸얼굴').textContent=지금.보낸.charAt(0); 보.querySelector('b').textContent=지금.보낸; 보.querySelector('.lab25-보낸때').textContent='받는 사람 나 · '+지금.날; 읽기.appendChild(보);
    var 본=d.createElement('div'); 본.className='lab25-본문'; 본.textContent=지금.본; 읽기.appendChild(본); 읽기.scrollTop=0;
    처음으로(); }
  줄들.forEach(function(b){ b.addEventListener('click',function(e){ if(e.target.closest('[title="별표"]')) return; e.preventDefault(); e.stopPropagation(); 열기(b); },true); });
  /* 메일을 열면 켜지는 도구 단추(삭제 · 답장 …) — 저장본엔 disabled 로 박혀 있음 · 보기만 */
  [].forEach.call(d.querySelectorAll('button.tb-btn[disabled]'),function(b){ b.removeAttribute('disabled'); });

  /* ── 대화 = 25 엔진(굽기.py · __lab25묻기 · 단계 · GSAP 전환) — 여기선 연 메일 정보만 넘김 ── */
  w.__lab25메일정보=function(){ return 지금; };
  function 처음으로(){ if(w.__lab25처음) w.__lab25처음(); else 상태('전'); }
  열기(줄들[0]);
})();
