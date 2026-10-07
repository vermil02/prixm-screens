/* 조합 1안 · 부품/상세 — 손질/19_상세화면/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-06
   자동화 ③ 상세 · 분석 ⑤ 결과에 목록 화면 꼴(도구 줄 머리 · 구역 카드 · 표 · 주색 포인트 · 숫자 올라감 · 실행 상세 촤르륵 · 차트 그려짐 등).
   안: D-13 D-12 + 숫자 · 실행 상세
   켠 항목: 목록 머리 꼴(도구 줄, 아래 선, 큰 제목 뺌) · 머리 아이콘 칸(32, 회색) · 꼬리표 · 글자 줄(카드 칩 꼴) · 카드, 구역(자동화 카드 값) · 표(머리 #f5f5fe, 줄 올림) · 글자 단추 · 상태 표시 · 점 + 글자(바탕 없음) · 실패 줄은 결과만 빨강 · 표 머리 위 선 없앰(구역 제목과 머리 줄 사이) · 표 첫 칸 맞춤(구역 아이콘 왼쪽과 같게, 표 통일) · 바탕 연회색(목록 칸 #fcfcfe) · 숫자 올라감(들어올 때 0 에서) · 화면 안에서 바뀔 때도 촤르륵(실행 상세 들어갈 때 등) · 차트 그려짐(선이 왼쪽에서 오른쪽으로) · 카드 차례 · 40ms(위에서 아래로 살짝 보임) · 실행 이력 패널(카드, 위 맞춤, 사이 16, 회색 토글) · 누르는 카드 올림(자동화 카드 효과) · 카드 그림자 · 틀과 같게(은은히 · 테 없음) · 표 머리 · 흰 바탕 + 아래 선 · 구역 아이콘 · 옅은 주색 상자 + 주색 그림 · 주색 포인트 더(글자 단추, 순서 번호, 올림 테) · 본문 폭 · 가운데 960(지금) */
if (/화면03_자동화상세\.html|화면05_결과\.html/.test(decodeURIComponent(location.pathname))) {

/* 19 상세 화면 엔진 — 자동화 ③ · 분석 ⑤ 문서 하나에 한 번. __lab19적용(항목들) = html 클래스 갈아 끼움 + 도구 줄로 옮기기 / 되돌리기 */
(function(){
  var d=document, w=window; if(d.__lab19) return; d.__lab19=1;
  var R=d.documentElement; R.classList.add('lab19-상세');
  var 메인=d.querySelector('.body > .main'), 머리=메인&&메인.querySelector(':scope > .page-hd');
  /* 도구 줄에 담을 줄 = 지금 보이는 설명 · 메타 하나 — 고정해 두지 않고 매번 고름.
     분석 ⑤ 문서엔 결과별(추세 · 교차표) 제목 줄이 다 있고 안 쓰는 건 숨어 있음 · 같은 문서 안에서 결과를 바꿔 그리면 보이는 쪽이 바뀜
     (사용자 「교차표도 눌리긴 하는데 화면이 이상한 듯」 → 숨은 추세 메타가 올라가 있었음 · 「누르면 이렇게 보였다가 사라짐」 → 옛 판이 추세를 먼저 그리는 사이 도구 줄엔 교차표 메타가 남아 있었음)
     옮긴 줄은 제자리(부모 · 다음)를 기억해 두고, 다른 줄이 보이면 돌려놓고 바꿔 담음 */
  var 도구=null, 담은=null;
  var 후보='.bh-desc, .제목줄 .메타';
  function 제자리(e){ if(!e||!e.__원부모) return; e.__원부모.insertBefore(e, e.__원다음&&e.__원다음.parentNode===e.__원부모?e.__원다음:null); }
  function 도구줄(켬){
    if(!메인||!머리) return;
    if(!켬){ 제자리(담은); 담은=null; if(도구&&도구.parentNode) 도구.parentNode.removeChild(도구); var 빈2=d.querySelector('.lab19-빈머리'); if(빈2) 빈2.classList.remove('lab19-빈머리'); return; }
    var 새=[].filter.call(d.querySelectorAll(후보),function(e){ return e!==담은&&!(도구&&도구.contains(e))&&e.getClientRects().length; })[0];
    if(!새&&!담은) return;
    if(!도구){ 도구=d.createElement('div'); 도구.className='head-zone lab19-도구줄'; }
    if(도구.parentNode!==메인) 메인.insertBefore(도구, 머리.nextSibling);
    if(새){ 제자리(담은); 새.__원부모=새.parentNode; 새.__원다음=새.nextSibling; 도구.appendChild(새); 담은=새; }
    var 빈=d.querySelector('.bh-head'); if(빈&&!빈.textContent.trim()) 빈.classList.add('lab19-빈머리');
  }
  /* 구역 감싸기(자동화 ③ 머리 + 몸) — 카드 항목이 켜질 때만. 늘 감싸 두면 화면 CSS 의 「바로 아래 자식」 선택자가 빗나가 D-0 에서 머리 테두리가 사라졌음(실측) */
  /* 원래 간격을 한 번 재 둠 — 구역 머리 위(앞 요소 아래 끝 → 머리 위 끝) · 맨 끝 구역 몸 아래 여백 · 실행 상세(.lb 머리)도 같은 꼴 */
  var 머리들='.sec-hd, .js-run-body > .lb';
  function 간격재기(){ [].forEach.call(d.querySelectorAll(머리들),function(h){ if(h.__잼||h.parentNode.classList.contains('lab19-구역')) return; h.__잼=1; var 앞=h.previousElementSibling, 몸=h.nextElementSibling;
    h.__위=앞?Math.max(0,Math.round(h.getBoundingClientRect().top-앞.getBoundingClientRect().bottom)):null;
    h.__아래=몸&&!몸.nextElementSibling?parseFloat(getComputedStyle(몸).marginBottom)||0:0; }); }
  간격재기();
  function 감싸기(켬){
    if(켬) [].forEach.call(d.querySelectorAll(머리들),function(h){ var 몸=h.nextElementSibling; if(!몸||h.parentNode.classList.contains('lab19-구역')) return;
      var 감=d.createElement('div'); 감.className='lab19-구역';
      /* 구역 사이 여백(원래 머리 위 · 몸 아래 여백)을 감싸개가 넘겨받음 — 안 그러면 여백이 카드 안쪽으로 들어가 위 카드 아래에 빈 칸 · 카드끼리 붙음(사용자 「여기 여백은 왜 붙었어?」) */
      /* 간격 = 엔진이 처음 얹힐 때(꾸밈 없는 원래 모습) 잰 보이는 간격(h.__위) — 계산값은 위 요소 여백과 겹쳐 달랐고(14 → 22),
         감쌀 때마다 재면 이미 감싼 앞 카드를 기준으로 재 0 이 됐음(실측) */
      감.style.marginTop=(h.__위!=null?h.__위:parseFloat(getComputedStyle(h).marginTop))+'px'; 감.style.marginBottom=(h.__아래||0)+'px';
      h.parentNode.insertBefore(감,h); 감.appendChild(h); 감.appendChild(몸); });
    else [].forEach.call(d.querySelectorAll('.lab19-구역'),function(감){ while(감.firstChild) 감.parentNode.insertBefore(감.firstChild,감); 감.remove(); });
  }
  /* 구역 제목 타일 — 이름으로 그림 고름 */
  var 그림={'하는 일':'<path d="M7.5 6h8.5M7.5 10h8.5M7.5 14h8.5"/><path d="M4 6h.01M4 10h.01M4 14h.01" stroke-width="2.4"/>','최근 실행 결과':'<circle cx="10" cy="10" r="6.5"/><path d="M10 6.5V10l2.5 1.5"/>',
    '실행 기록':'<circle cx="10" cy="10" r="6.5"/><path d="M10 6.5V10l2.5 1.5"/>','주요 지표':'<path d="M5 15.5V11M10 15.5V5M15 15.5V8"/>','이 결과를 읽을 때':'<circle cx="10" cy="10" r="6.5"/><path d="M10 9.2v4.3M10 6.6h.01"/>',
    '차트':'<path d="M3.5 15.5h13"/><path d="M4.5 12l3.5-3.5 3 2.5 4.5-5"/>','결론':'<path d="M9.5 3.5l1.6 3.9 3.9 1.6-3.9 1.6-1.6 3.9-1.6-3.9L4 9l3.9-1.6z"/>','실행한 코드':'<path d="M7.5 6.5 4 10l3.5 3.5M12.5 6.5 16 10l-3.5 3.5"/>'};
  그림['결과']='<path d="M4.5 10.5 8 14l7.5-8"/>'; 그림['표']='<rect x="3.5" y="4" width="13" height="12" rx="2"/><path d="M3.5 8h13M8 8v8"/>'; 그림['단계별 실행']=그림['하는 일']; 그림['세부 정보']=그림['이 결과를 읽을 때'];
  function 타일넣기(){ [].forEach.call(d.querySelectorAll('.sec-t, .라벨, .js-run-body > .lb, .h-pan-hd h2'),function(t){ if(t.querySelector('.lab19-타일')) return; var 글=t.matches('.h-pan-hd h2')?'실행 기록':t.textContent.trim(), 길=그림[글]||'<circle cx="10" cy="10" r="2.6" fill="currentColor"/>';
    var 색={'하는 일':'#516ED4','최근 실행 결과':'#0F9D7F','실행 기록':'#0F9D7F','주요 지표':'#835FDD','이 결과를 읽을 때':'#D9861A','차트':'#14A0D8','결론':'#6c69f0','실행한 코드':'#5964AB','표':'#0F9D7F'}[글]||'#6c69f0';
    var s=d.createElement('span'); s.className='lab19-타일'; s.style.setProperty('--구역색',색); s.innerHTML='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+길+'</svg>'; t.insertBefore(s,t.firstChild); }); }
  타일넣기();
  /* 실행 이력 패널 위 = 본문 첫 카드 위(본문 칸 위 + 22 — 도구 줄이 생기면 그만큼 내려감) · inline !important(CSS 의 122 를 이김) */
  function 패널(){ var p=d.querySelector('.h-pan'), c=d.querySelector('.body > .main > .content'); if(!p||!c) return;
    if(R.classList.contains('lab19켬-이력패널')) p.style.setProperty('top',Math.round(c.getBoundingClientRect().top+22)+'px','important'); else p.style.removeProperty('top'); }
  w.addEventListener('resize',패널);
  /* 다듬기 — 화면이 같은 문서 안에서 내용을 새로 그려도(자동화 ③ 실행 상세 ?view=run 등) 간격 · 타일 · 감싸기 · 패널을 다시(엔진이 처음 얹힐 땐 그 요소가 없었음 · 실측) */
  var 지금목록=[], 관=null, 틀=0;
  function 다듬기(){ if(관) 관.disconnect(); 간격재기(); 타일넣기(); 도구줄(지금목록.indexOf('머리')>=0); 감싸기(지금목록.indexOf('카드')>=0); 패널(); if(관) 관.observe(d.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','hidden']}); }
  /* 화면 안에서 바뀔 때(주소 ?view= 등이 바뀜 · 같은 문서 안에서 다시 그림 — 실행 상세로 들어가기 · 실행 이력에서 다른 실행 · 뒤로) 도 촤르륵
     손질후는 판을 갈아 끼울 때만 __전환숨김 · __전환등장 을 불러 이 경우엔 안 돌았음(사용자 「결과값 들어갈 때 카드들 촤르륵하는 건?」)
     문서 변화 알림은 그리기 전(마이크로태스크)에 오므로 그 자리에서 다듬고 숨김 → 다음 프레임 등장(숫자 올라감도 같이) */
  d.__lab19주소=location.search;
  관=new MutationObserver(function(기록){
    if(지금목록.indexOf('머리')>=0){ 관.disconnect(); 도구줄(true); 관.observe(d.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','hidden']}); }   /* 그리기 전에 — 보였다 사라지는 틈 없게 */
    /* 주소만 바뀌고 본문이 안 바뀐 경우(분석 LNB 를 누르면 화면이 주소를 먼저 바꾼 뒤 손질후가 새 판으로 갈아 끼움)엔 안 돎 — 두 번 돌던 것(사용자 「측정값 월별 추세 누르면 효과가 두 번 발동」) */
    /* 주소가 바뀌면 그 순간 촤르륵 — 요소를 새로 그리든(자동화 ③ 실행 상세) 있던 결과 블록의 숨김만 바꾸든(분석 ⑤ 추세 ↔ 교차표 · class · hidden) 같게
       뒤따라 손질후가 새 판으로 갈아 끼우면 아래 표시(__lab19즉시)로 그 판은 효과 없이 바뀜 → 두 번 안 돎 */
    if(location.search!==d.__lab19주소){ d.__lab19주소=location.search; clearTimeout(틀); 다듬기();
      if(R.classList.contains('lab19켬-결과전환')&&w.__전환숨김){ try{ w.__전환숨김({}); }catch(e){} try{ w.parent.__lab19즉시={키:키(location),때:Date.now()}; }catch(e){}   /* 표시는 자기 숨김 뒤에 — 먼저 남기면 자기 표시를 보고 건너뜀 */ requestAnimationFrame(function(){ try{ w.__전환등장({}); }catch(e){} }); }
      return; }
    if(location.search!==d.__lab19주소) d.__lab19주소=location.search;
    clearTimeout(틀); 틀=setTimeout(다듬기,30); });
  관.observe(d.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class','hidden']});
  /* 숫자 올라감 — 들어올 때(1안 전환 부품의 __전환등장 과 같은 순간) 누적 실행 · 실패 · 지표 값이 0 에서 0.7초(빠르게 시작해 천천히 멈춤) · 숫자만인 글(128 · 0.000208)만 · 소수 자리 그대로 */
  function 올리기(){ if(!R.classList.contains('lab19켬-숫자올라감')) return;
    [].forEach.call(d.querySelectorAll('.sum-v, .지표값'),function(e){ var n=[].filter.call(e.childNodes,function(x){ return x.nodeType===3&&x.textContent.trim(); })[0]; if(!n) return;
      var 원=n.__원||n.textContent.trim(); n.__원=원; if(!/^\d+(\.\d+)?$/.test(원)) return; var 끝=parseFloat(원), 자리=(원.split('.')[1]||'').length, t0=performance.now(), 앞=n.textContent.match(/^\s*/)[0];
      (function 틱(t){ var p=Math.min(1,(t-t0)/700), e2=1-Math.pow(1-p,3); n.textContent=앞+(끝*e2).toFixed(자리); if(p<1) requestAnimationFrame(틱); else n.textContent=앞+원; })(t0); }); }
  /* 실행 상세 촤르륵 — 1안 전환 엔진은 「좁고(본문 폭 40% 아래) 높은 칸」 을 옆 패널로 봐서, 실행 상세 본문 단(926 · 39%)을 통째로 옆에서 밀어 넣었음(실측 모으기: 패널 = h-pan · js-run-body)
     → 실행 상세일 때만 랩이 같은 값(전환.css --전환-*: 0.3초 · 15ms 차례 · 아래 10px · 처음 투명 30% · power2.out · 패널은 옆 20px · 차례 × 2 뒤)으로 직접: 머리 → 카드 하나씩 → 패널 */
  function 값(n,기){ var v=getComputedStyle(R).getPropertyValue('--전환-'+n).trim(); return v===''?기:v; }
  var 내tl=null;
  /* 랩이 직접 촤르륵하는 화면 = 자동화 ③ 실행 상세(.js-run-body) · 분석 ⑤ 결과(보이는 .결과속) — 사용자 「주요 지표, 이 결과를 읽을 때, 표 이런 게 살짝 순차적으로 나오는 거」 · 1안 엔진의 칸 판단(좁고 높은 칸 = 패널)에 안 기댐 */
  function 몸찾기(){ return d.querySelector('.js-run-body')||[].filter.call(d.querySelectorAll('.결과속'),function(e){ return e.getClientRects().length; })[0]||null; }
  function 실행상세(){ return R.classList.contains('lab19켬-결과전환')&&!!몸찾기()&&!!w.gsap; }
  function 내모으기(){ var 몸=몸찾기();
    var 머리=[].filter.call(d.querySelectorAll('.body > .main > .page-hd, .body > .main > .lab19-도구줄'),function(e){ return e.getClientRects().length; });
    var 덩이=[].filter.call(몸.children,function(e){ return e.getClientRects().length; });
    var 패=[].filter.call(d.querySelectorAll('.h-pan'),function(e){ return e.getClientRects().length; });
    return {머리:머리,덩이:덩이,패:패,모두:머리.concat(덩이,패)}; }
  function 내숨김(){ if(내tl){ 내tl.progress(1).kill(); 내tl=null; } var g=내모으기(), 시간=parseFloat(값('시간',.3)), 시차=parseFloat(값('시차',.015)), 거리=parseFloat(값('거리',10)), 시작=parseFloat(값('시작투명',.3)), 이징=값('이징','power2.out');
    var 줄=g.머리.concat(g.덩이);
    내tl=gsap.timeline({paused:true,defaults:{lazy:false},onComplete:function(){ gsap.set(g.모두,{clearProps:'opacity,visibility,transform,translate'}); R.classList.add('등장끝'); 내tl=null; }});
    if(줄.length) 내tl.fromTo(줄,{autoAlpha:시작,y:거리},{autoAlpha:1,y:0,duration:시간,ease:이징,stagger:function(i){ return Math.min(i,12)*시차; }},0);
    if(g.패.length) 내tl.fromTo(g.패,{autoAlpha:시작,x:거리*2},{autoAlpha:1,x:0,duration:시간,ease:이징},시차*2);
    R.classList.remove('등장끝'); 내tl.progress(0); R.classList.add('전환준비'); }   /* 전환준비 = 1안 전환 부품의 「처음 가림」 풀기 — 랩이 직접 돌 땐 1안 숨김이 안 불려 안 붙음(새로 불러온 분석 판이 가려진 채 남지 않게) */
  function 내등장(){ requestAnimationFrame(function(){ if(내tl) 내tl.play(0); }); }
  /* 바로 그린 화면 표시 — 분석 LNB 를 누르면 ① 지금 판이 그 자리에서 새 결과를 바로 그리고 ② 0.2초쯤 뒤 손질후가 새 판(미리 안 불러 둠)으로 갈아 끼움.
     효과는 ① 에서 돌리고(내용이 바뀌는 순간) ② 는 같은 주소면 효과 없이 바꿈 — 사용자 「효과가 누르고 나서 약간의 딜레이 후에 동작 · 그러면 효과가 동작할 필요가 있나?」
     표시는 판들이 함께 사는 틀 문서 창(w.parent)에 { 주소 키, 때 } · 2초 안에 같은 키의 새 판이면 건너뜀 */
  /* 키 = 화면 파일 경로만 — 주소 꼬리로 견주면 기본 결과(추세)는 옛 판이 꼬리 없이(?), 새 판은 ?view=trend 로 달라 못 알아봤음(실측) · 5초 안에 같은 파일이면 같은 화면 */
  function 키(l){ return l.pathname; }
  function 즉시맞음(){ try{ var m=w.parent.__lab19즉시; if(m&&m.키===키(location)&&Date.now()-m.때<5000){ w.parent.__lab19즉시=null; return true; } }catch(e){} return false; }
  /* 차트 그려짐 — 사용자 「차트 같은 건 그려지게」 · 보이는 차트(.차트틀 svg)의 선을 숨김 때 감춰 두고(stroke-dashoffset = 길이) 등장 때 그음:
     축 · 기준선(line) 0.5초 · 값 꺾은선(polyline · path) 0.9초 · 차트 구역이 들어오는 틈(0.15초) 뒤 · power2.out · 끝나면 인라인 지움 */
  function 차트선(){ return R.classList.contains('lab19켬-차트그림')?[].filter.call(d.querySelectorAll('.차트틀 svg line, .차트틀 svg polyline, .차트틀 svg path'),function(e){ return e.getClientRects().length&&e.getTotalLength; }):[]; }
  function 차트감춤(){ 차트선().forEach(function(e){ var n=0; try{ n=e.getTotalLength(); }catch(x){} if(!n) return; e.__길이=n; e.style.strokeDasharray=n; e.style.strokeDashoffset=n; }); }
  function 차트그림(시작){ var 선=차트선(); if(!선.length) return; 시작=시작||Date.now();
    선.forEach(function(e){ if(!e.__길이){ try{ e.__길이=e.getTotalLength(); }catch(x){} e.style.strokeDasharray=e.__길이; e.style.strokeDashoffset=e.__길이; }
      var 값=e.tagName!=='line', 시간=값?900:500, 늦춤=150+(값?120:0);
      (function 틱(){ var p=Math.max(0,Math.min(1,(Date.now()-시작-늦춤)/시간)), q=1-Math.pow(1-p,2); e.style.strokeDashoffset=e.__길이*(1-q); if(p<1) requestAnimationFrame(틱); else { e.style.strokeDasharray=''; e.style.strokeDashoffset=''; } })(); }); }
  var 원등장=w.__전환등장; w.__전환등장=function(정보){ if(d.__lab19건너뜀){ d.__lab19건너뜀=0; R.classList.add('전환준비','등장끝'); var 표=w.parent.__lab19즉시; 차트그림(표&&표.때); return; } requestAnimationFrame(function(){ 차트그림(); }); if(실행상세()){ if(!내tl) 내숨김(); 내등장(); } else if(원등장) 원등장(정보); 올리기(); };
  /* 보이기 직전(__전환숨김)에 0 으로 깔아 둠 — 안 그러면 보이는 순간 128 이 한 번 보였다가 0 으로 튐(실측) */
  function 영(){ if(!R.classList.contains('lab19켬-숫자올라감')) return; [].forEach.call(d.querySelectorAll('.sum-v, .지표값'),function(e){ var n=[].filter.call(e.childNodes,function(x){ return x.nodeType===3&&x.textContent.trim(); })[0]; if(!n) return;
    var 원=n.__원||n.textContent.trim(); n.__원=원; if(!/^\d+(\.\d+)?$/.test(원)) return; n.textContent=n.textContent.match(/^\s*/)[0]+(0).toFixed((원.split('.')[1]||'').length); }); }
  var 원숨김=w.__전환숨김; w.__전환숨김=function(정보){ if(R.classList.contains('lab19켬-결과전환')&&즉시맞음()){ d.__lab19건너뜀=1; R.classList.add('전환준비'); return; } 차트감춤(); if(실행상세()) 내숨김(); else if(원숨김) 원숨김(정보); 영(); };
  w.__lab19적용=function(목록){
    [].slice.call(R.classList).forEach(function(c){ if(c.indexOf('lab19켬-')===0) R.classList.remove(c); });
    목록.forEach(function(i){ R.classList.add('lab19켬-'+i); });
    지금목록=목록.slice(); 다듬기(); if(목록.indexOf('숫자올라감')>=0&&!d.__lab19올림처음){ d.__lab19올림처음=1; 올리기(); }
  };
})();

if (window.__lab19적용) window.__lab19적용(["머리", "아이콘", "꼬리표글", "카드", "표", "글단추", "표머리흰", "바탕", "올림", "폭가운데", "그림자틀", "아이콘주색", "표위선없음", "표첫칸맞춤", "상태점", "실패결과만", "주색포인트", "숫자올라감", "이력패널", "결과전환", "차례40", "차트그림"]);
}
