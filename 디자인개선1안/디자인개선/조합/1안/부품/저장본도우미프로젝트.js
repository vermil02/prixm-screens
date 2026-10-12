/* 조합 1안 · 부품/저장본도우미프로젝트 — 손질/56_프로젝트도우미/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12
   프로젝트 AI 도우미 = 이메일 도우미 엔진(카드 안) + 프로젝트 대본 · 얼굴 · 여닫기 속도 · 대화 도구 줄 / 피드백 = GNB 맨 아래(앱 화면 전부) — 56 랩 안 2 */

/* 56 랩 엔진 — 안 2: 프로젝트 문서에 이메일 도우미 카드 엔진을 켬(32 도우미꼴 끔) · 안 1: 안 켬(처음 한 번 켜면 되돌리려면 새로고침) */
(function(){
  var w=window, d=document, h=d.documentElement; if(w.__lab56랩적용) return;
  /* AI 기능 단추(앱 「AI로 …」) 그림 → 피그마 ico-ai-fill(바탕 네모는 피그마 틀 바탕이라 뺌) · 앱이 다시 그려도 0.4초마다 */
  var AI그림='<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><defs><linearGradient id="lab56ai" x1="2.667" y1=".334" x2="12.334" y2="14.668" gradientUnits="userSpaceOnUse"><stop stop-color="#6366F1"/><stop offset="1" stop-color="#840AFE"/></linearGradient></defs><path fill="url(#lab56ai)" d="M6.64067 6.09213L7.23133 4.02613C7.45267 3.2528 8.54867 3.2528 8.77 4.02613L9.36 6.09213C9.39736 6.22282 9.46739 6.34184 9.56351 6.43796C9.65962 6.53407 9.77864 6.60411 9.90933 6.64147L11.9753 7.23147C12.7487 7.4528 12.7487 8.5488 11.9753 8.77013L9.90933 9.36013C9.77864 9.39749 9.65962 9.46753 9.56351 9.56364C9.46739 9.65976 9.39736 9.77877 9.36 9.90947L8.77 11.9755C8.54867 12.7488 7.45267 12.7488 7.23133 11.9755L6.64133 9.90947C6.60398 9.77877 6.53394 9.65976 6.43782 9.56364C6.34171 9.46753 6.22269 9.39749 6.092 9.36013L4.026 8.77013C3.25267 8.5488 3.25267 7.4528 4.026 7.23147L6.092 6.64147C6.22269 6.60411 6.34171 6.53407 6.43782 6.43796C6.53394 6.34184 6.60331 6.22282 6.64067 6.09213ZM12.07 11.0055C12.2627 10.4435 13.0727 10.4428 13.2647 11.0055L13.282 11.0635L13.4793 11.8555L14.2713 12.0535C14.9113 12.2135 14.9113 13.1215 14.2713 13.2815L13.4793 13.4795L13.282 14.2715C13.122 14.9108 12.2133 14.9108 12.0533 14.2715L11.8553 13.4795L11.0633 13.2815C10.4233 13.1215 10.4233 12.2128 11.0633 12.0535L11.8553 11.8555L12.0533 11.0635L12.07 11.0055ZM2.73667 1.67147C2.93533 1.0908 3.79333 1.11013 3.94867 1.72947L4.146 2.52147L4.938 2.71947C5.578 2.87947 5.578 3.78747 4.938 3.94747L4.146 4.14547L3.94867 4.93747C3.78867 5.5768 2.88 5.5768 2.72 4.93747L2.522 4.14547L1.73 3.94747C1.09 3.78747 1.09 2.8788 1.73 2.71947L2.522 2.52147L2.72 1.72947L2.73667 1.67147Z"/></svg>';
  function AI단추(){ [].forEach.call(d.querySelectorAll('.pj-ai-act > button'),function(b){ if(!/^AI/.test(b.textContent.trim())) return; b.classList.add('lab56-AI'); var sv=b.querySelector('svg'); if(sv&&!sv.querySelector('#lab56ai')){ sv.outerHTML=AI그림; } }); }
  setInterval(function(){ if(h.classList.contains('lab56-프')) AI단추(); },400);
  var 켠=false, 목록=["처음가운데","크게","한줄","프리즘테","알약","인사아래","빛호버","날기","단계","바탕셋","막대","꼴보라면","보라면다듬","띠좁게","번짐뺌","보라테","띠75","보라테진하게","입력테","라인흐름","테좌측","라인천천히"];
  function 켜기(){ if(켠) return; if(!d.querySelector('.pj-main [data-ai-greeting]')) return;
    h.classList.remove('lab32켬-도우미꼴'); h.classList.add('lab56-프');
    var 인=d.querySelector('.pj-main [data-ai-greeting]'), 카=인&&인.closest('[class*="rounded-[15px]"]'); if(카) 카.classList.add('lab25-도우미카드'); if(인&&인.parentNode) 인.parentNode.classList.add('lab25-대화칸');   /* 이메일 엔진은 「메일 구조」 쪽에서 붙이던 카드 · 대화칸 표시 — 프리즘 띠 · 테 · 스크롤 막대가 여기 걸림 */
    AI단추();
    [].forEach.call(d.querySelectorAll('.lab32얼굴 img'),function(i){ if(i.getAttribute('src').indexOf('프로젝트도우미얼굴_480')<0) i.src='/prixm-screens/디자인개선1안/디자인개선/조합/1안/부품/프로젝트도우미얼굴_480.png'; });   /* 오른쪽 아래 얼굴 단추도 같은 그림 */
    if(!w.__lab56적용){ 
/* 56 — 프로젝트 도우미 설정(이메일 엔진이 읽음) · 대본 = 녹화 대시보드 · gantt(목록과 같은 자료 · 상태 = 앱 값) */
(function(){
  var w=window, d=document; if(w.__도우미설정) return;
  var 앱상={done:'완료',progress:'진행',overdue:'지연',upcoming:'대기',hold:'보류'};
  function 녹(){ var b=w.__복제; if(!b||!b.표) return null; var 표=b.표, o={프:[],업:[]};
    var k=Object.keys(표).filter(function(x){ return /^GET \/api\/projects\/dashboard/.test(x); })[0]; try{ o.프=(JSON.parse(표[k][2]).projects||[]).filter(function(p){ return p.status!=='archived'; }); }catch(e){}
    o.프.forEach(function(p){ var g=표['GET /api/projects/'+p.id+'/gantt']; if(!g) return; var ts=[]; try{ ts=JSON.parse(g[2]).tasks||[]; }catch(e){} var 부={}; ts.forEach(function(t){ if(t.parentId) 부[t.parentId]=1; });
      ts.filter(function(t){ return !부[t.id]; }).forEach(function(t){ o.업.push({프:p.name,이:t.name,끝:t.end,퍼:Math.round(Number(t.progress)||0),담:(t.assignee||'').trim(),상:앱상[t.status]||'대기'}); }); });
    return o; }
  function 날(s){ var b=String(s).slice(0,10).split('-'); return new Date(+b[0],+b[1]-1,+b[2]); }
  function 짧(s){ var t=날(s); return (t.getMonth()+1)+'/'+t.getDate(); }
  function 오늘(){ var n=new Date(); return new Date(n.getFullYear(),n.getMonth(),n.getDate()); }
  function 줄(t){ return '· <strong>'+t.이+'</strong> — '+t.프+' · '+(t.담||'담당 없음')+' · '+짧(t.끝)+' 마감 · '+t.퍼+'%'; }
  w.__도우미설정={
    제목:'프로젝트 AI 도우미', 얼굴:'/prixm-screens/디자인개선1안/디자인개선/조합/1안/부품/프로젝트도우미얼굴_480.png',   /* 2026-10-12 사용자가 준 그림(Downloads/2 27.png) 아래 원을 잘라 480(이메일과 같은 꼴 · 둥근 투명) — 앱 그림은 80 뿐이라 흐렸음 */
    설명:'업무 정리 · 마감 확인 · 담당 배정',
    인사:'안녕하세요 프로젝트 AI 도우미 입니다.<br><span class="font-semibold">밀린 업무 정리부터 마감 확인까지,</span><br><span class="font-semibold">필요한 일을 편하게 말씀해 주세요.</span>',
    자리글:'프로젝트 · 업무 관련 궁금한 걸 질문해 보세요.',
    제안:[['지연 업무 정리해줘','지연'],['이번 주 마감 알려줘','이번주'],['담당 없는 업무 찾아줘','담당']],
    대본:function(종류){ var o=녹()||{프:[],업:[]}, 업=o.업, 오=오늘();
      if(종류==='지연'){ var 늦=업.filter(function(t){ return t.상==='지연'; }), 지남=업.filter(function(t){ return t.상!=='지연'&&t.상!=='완료'&&날(t.끝)<오; }), 곳={}; 늦.forEach(function(t){ 곳[t.프]=1; });
        return {단계:[['프로젝트 살펴보는 중','진행 중 '+o.프.length+'개 · 업무 '+업.length+'건'],['지연 업무 찾는 중','상태 「지연」 '+늦.length+'건 · 마감 지난 업무 '+지남.length+'건'],['정리하는 중','프로젝트 · 담당자별로']],
          근거:'프로젝트 '+o.프.length+'개의 업무 '+업.length+'건을 봤어요',
          답:['지연 업무를 정리했습니다.', (늦.length?'지연 상태인 업무는 '+늦.length+'건입니다.<br>'+늦.map(줄).join('<br>'):'지연 상태인 업무는 없습니다.')+(지남.length?'<br><br>마감이 지났는데 아직 지연으로 바뀌지 않은 업무가 <strong>'+지남.length+'건</strong> 있어요. 상태를 확인해 보세요.':'')]}; }
      if(종류==='이번주'){ var 주끝=new Date(오.getFullYear(),오.getMonth(),오.getDate()+((7-오.getDay())%7)), 이번=업.filter(function(t){ var e=날(t.끝); return t.상!=='완료'&&e>=오&&e<=주끝; }),
          다음=업.filter(function(t){ return t.상!=='완료'&&날(t.끝)>주끝; }).sort(function(a,b){ return 날(a.끝)-날(b.끝); })[0];
        return {단계:[['프로젝트 살펴보는 중','진행 중 '+o.프.length+'개'],['마감 날짜 보는 중','이번 주 '+(오.getMonth()+1)+'/'+오.getDate()+' ~ '+(주끝.getMonth()+1)+'/'+주끝.getDate()],['정리하는 중','']],
          근거:'업무 '+업.length+'건의 마감 날짜를 봤어요',
          답:['이번 주 마감을 확인했습니다.', 이번.length?'이번 주 마감인 업무는 '+이번.length+'건입니다.<br>'+이번.map(줄).join('<br>'):'이번 주에 마감인 업무는 없습니다.'+(다음?'<br>다음 마감은 <strong>'+다음.이+'</strong>('+다음.프+' · '+짧(다음.끝)+')입니다.':'')]}; }
      if(종류==='담당'){ var 없=업.filter(function(t){ return !t.담&&t.상!=='완료'; }), 묶={}; 없.forEach(function(t){ (묶[t.프]=묶[t.프]||[]).push(t.이); });
        return {단계:[['프로젝트 살펴보는 중','진행 중 '+o.프.length+'개 · 업무 '+업.length+'건'],['담당자 보는 중','담당 없음 '+없.length+'건'],['정리하는 중','프로젝트별로']],
          근거:'업무 '+업.length+'건의 담당자를 봤어요',
          답:['담당 없는 업무를 찾았습니다.', 없.length?'담당자가 정해지지 않은 업무는 '+없.length+'건입니다.<br>'+Object.keys(묶).map(function(p){ return '· <strong>'+p+'</strong> — '+묶[p].join(', '); }).join('<br>')+'<br><br>업무를 눌러 담당자를 지정할 수 있어요.':'담당자가 없는 업무는 없습니다.']}; }
      return {단계:[['프로젝트 살펴보는 중','진행 중 '+o.프.length+'개'],['물음과 맞는 부분 찾는 중',''],['답 쓰는 중','']], 근거:'프로젝트 '+o.프.length+'개를 봤어요',
        답:['답변 예시입니다.','시연 화면이라 실제 답 대신 예시를 보여 드려요. 「지연 업무 정리해줘」 · 「이번 주 마감 알려줘」 · 「담당 없는 업무 찾아줘」 를 눌러 보세요.']}; } };
})();

(function(){
  var d=document, w=window; if(w.__lab56적용) return;
  function 표(e,c){ if(e) e.classList.add(c); return e; }
  function 글로(s,글){ return [].filter.call(d.querySelectorAll(s),function(e){ return e.textContent.replace(/\s+/g,' ').trim()===글; })[0]; }
  var 설정=w.__도우미설정||{}, 인사=d.querySelector('[data-ai-greeting]'), 얼굴=인사&&인사.querySelector('img'), 카=인사&&인사.closest('[class*="rounded-[15px]"]'),
      제목=카&&[].filter.call(카.querySelectorAll('span'),function(e){ return e.textContent.replace(/\s+/g,' ').trim()===(설정.제목||'이메일 AI 도우미'); })[0];   /* 56: 카드 안에서만 찾음(32 얼굴 단추 이름표에도 같은 글이 있음) */
  if(!제목||!얼굴){ return; }   /* 56: 칸이 아직 안 그려졌으면 다음에 다시(이메일은 「아님」 표시로 끝냈음) */   /* 이메일만 — 프로젝트 도우미에도 같은 인사 칸이 있음 */
  if(얼굴&&설정.얼굴!==false){ 얼굴.src=설정.얼굴||'/prixm-screens/디자인개선1안/디자인개선/조합/1안/부품/도우미얼굴_480.png'; 얼굴.removeAttribute('data-w2h-got'); }   /* 저장본 그림은 80×80 이라 120 · 날기(2.7배)에서 흐림 → 피그마 원본(772×791)을 정사각 480 으로(2026-10-08 사용자 「이미지가 왜 이렇게 깨져 보이지」) */
  function 얼굴칸(c){ var s=d.createElement('span'); s.className=c; var i=d.createElement('img'); i.src=얼굴.src; i.alt=''; s.appendChild(i); return s; }
  if(제목&&제목.parentNode&&제목.parentNode.matches('div.shrink-0')){ var 밖=d.createElement('div'); 밖.className='min-w-0 flex-1'; var 안=d.createElement('div'); 안.className='flex items-center gap-1.5'; 제목.parentNode.insertBefore(밖,제목); 밖.appendChild(안); 안.appendChild(제목); }
  if(얼굴&&제목){ var 머리=제목.closest('div.shrink-0'); 표(머리,'lab25-도우미머리'); 표(제목,'lab25-도우미제목'); 머리.insertBefore(얼굴칸('lab25-머리얼굴'),머리.firstChild);
    var 설=d.createElement('div'); 설.className='lab25-머리설명'; 설.textContent=설정.설명||'메일 요약 · 답장 초안 · 내용 분석'; 제목.parentNode.parentNode.appendChild(설); }
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
    (설정.제안||[['이 이메일 요약해줘','메일'],['회신 초안 써줘','회신']]).forEach(function(x){ var s=d.createElement('span'); s.textContent=x[0]; s.dataset.i=x[1]; 제.appendChild(s); });
    인사.appendChild(제);
    /* 입력칸(흉내) — 대화 칸(스크롤) 바로 아래 */
    /* 메일 고른 뒤 인사 글(피그마 221:131) — 원래 글 옆에 두고 상태로 갈아 끼움 */
    var 원p=인사.querySelector('p'); if(원p){ 원p.classList.add('lab25-인사원래'); var 새p=원p.cloneNode(false); 새p.classList.remove('lab25-인사원래'); 새p.classList.add('lab25-인사고름');
      새p.innerHTML=설정.인사||'안녕하세요 이메일 AI 도우미 입니다.<br><span class="font-semibold">이메일 요약부터 내용 분석까지,</span><br><span class="font-semibold">필요한 내용을 편하게 말씀해 주세요.</span>'; 원p.parentNode.insertBefore(새p,원p.nextSibling); }
    var 칸=인사.parentNode, 입=d.createElement('div'); 입.className='lab25-입력';
    입.innerHTML='<textarea placeholder="'+(설정.자리글||'메일 관련 궁금한걸 질문해보세요.')+'"></textarea><i class="더">+</i><i class="보냄">↵</i>';
    입.addEventListener('mousedown',function(e){ if(e.target.tagName!=='TEXTAREA'){ e.preventDefault(); 입.querySelector('textarea').focus(); } });
    if(칸&&칸.parentNode) 칸.parentNode.insertBefore(입,칸.nextSibling);
    var 위=제.cloneNode(true); 위.className='lab25-제안 lab25-제안위'; 제.classList.add('lab25-제안속'); if(입.parentNode) 입.parentNode.insertBefore(위,입); }
  w.__lab56적용=function(목록){ var h=d.documentElement;
    [].slice.call(h.classList).forEach(function(c){ if(c.indexOf('lab25켬-')===0) h.classList.remove(c); });
    목록.forEach(function(i){ h.classList.add('lab25켬-'+i); }); };

  /* ── 대화 돌리기(2026-10-08) — 추천 단추 · 입력 Enter / ↵ → 물음 → 쓰는 중(단계) → 답. 랩 상태 라디오와 따로(엔진이 상태 클래스만 바꿈)
     메일 정보는 w.__lab56메일정보() 가 있으면 그것(1안 = 연 메일) · 없으면 저장본 첫 메일(박종진) ── */
  var 흉=d.querySelector('.lab25-흉내'); if(!흉) return;
  var h=d.documentElement, 상태들=['전','중','쓰는','고르기전'], 쓰=흉.querySelector('.lab25-쓰는중'), 스크=흉.parentNode,
      입칸=d.querySelector('.lab25-입력'), 글칸=입칸&&입칸.querySelector('textarea'), 돌=0;
  function 켬(c){ return h.classList.contains('lab25켬-'+c); }
  function 상태(s){ var l=[].slice.call(h.classList).filter(function(c){ return c.indexOf('lab25켬-')===0; }).map(function(c){ return c.slice(7); }).filter(function(c){ return 상태들.indexOf(c)<0; }); l.push(s); w.__lab56적용(l); }
  function 지(){ return w.gsap&&켬('날기')&&!(w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches)?w.gsap:null; }
  function 아래(){ 스크.scrollTop=스크.scrollHeight; }
  var 김='화학안전팀 김민수입니다.';
  function 메일(){ return (w.__lab56메일정보&&w.__lab56메일정보())||{보낸:'박종진',제목:김,날:'09/09'}; }
  /* 단계 · 답 — 메일에서 실제로 찾은 것만(사실 기반) · 시연 메일(박종진) 은 본문 내용 · 나머지는 제목 · 보낸 사람으로 */
  function 대본(종류,말){ if(설정.대본) return 설정.대본(종류,말); var m=메일(), 박=m.제목===김, 보=m.보낸||'보낸 분', 제=m.제목||'메일';
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
  function 묻기(말,종류){ 말=(말||'').trim(); if(!말) return; var 이번=++돌, 판=대본(종류,말), 처음=켬('전');
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
  w.__lab56처음=function(){ 돌++; [].slice.call(흉.children).forEach(function(c){ if(c!==쓰) c.remove(); }); if(글칸) 글칸.value=''; 상태('전');
    var g=지(); if(g) g.from(인사,{opacity:0,duration:.3,clearProps:'opacity'}); };
  w.__lab56묻기=묻기;
  d.addEventListener('click',function(e){ var t=e.target, s=t.closest&&t.closest('.lab25-제안 span'); if(s){ 묻기(s.textContent,s.dataset.i); return; }
    if(t.closest&&t.closest('.lab25-입력 i.보냄')&&글칸){ 묻기(글칸.value,'자유'); 글칸.value=''; } });
  if(글칸) 글칸.addEventListener('keydown',function(e){ if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){ e.preventDefault(); 묻기(글칸.value,'자유'); 글칸.value=''; } });

  
})();
 }
    if(!d.querySelector('.lab25-도우미머리')||!w.__lab56적용) return;   /* 칸이 아직이면 다음 차례에 다시 */
    켠=true; w.__lab56적용(['전'].concat(목록)); }
  w.__lab56랩적용=function(l){ l=l||[]; h.classList.toggle('lab56켬-피드백GNB',l.indexOf('피드백GNB')>=0); h.classList.toggle('lab56켬-속도',l.indexOf('속도')>=0); if(l.indexOf('이메일엔진')>=0){ 켜기(); var t=setInterval(function(){ 켜기(); if(켠) clearInterval(t); },300); } };
})();

/* 56 피드백 → GNB 맨 아래 — 앱 피드백(relay-fab · 검은 둥근 단추 54 · 열면 안내 · 목록 · 캡처 · 녹화 · 글쓰기)은 복제 문서 안 · GNB 는 바깥 우리 화면.
   복제 문서는 바깥 본문 칸 안 iframe(왼쪽 · 위가 잘림)이라 그 안에선 GNB 위에 못 둠. 단추 덩이를 바깥으로 옮기면 랩에선 누름이 안 먹었음(원인 모름 · 1안 단독 시험은 됨)
   → 거울: 진짜 단추 덩이는 복제 안에 두고 숨김 · 바깥 GNB 아래에 같은 꼴 사본(앱 relay CSS 통째 복사 · 앱의 왼쪽 아래 모드 bl = 메뉴가 단추 오른쪽으로) ·
     사본을 누르면 진짜의 같은 단추(.relay-btn · [data-a])를 누르고 · 진짜가 바뀌면 사본을 다시 그림. 캡처 · 녹화 · 글쓰기는 앱 그대로(복제 문서에서). */
(function(){ var d=document, w=window, h=d.documentElement; if(w.__lab56피드백) return; w.__lab56피드백=1;
  var 거=null, 끝글='';
  function 바깥(){ try{ var f=w.frameElement; return f&&f.ownerDocument; }catch(e){ return null; } }
  function 진짜(){ return d.querySelector('.relay-fab'); }
  function 맞춤(){ var pd=바깥(); if(!pd) return; var 켬=h.classList.contains('lab56켬-피드백GNB'), g=pd.querySelector('.gnb'), r0=진짜();
    var 보임=false; try{ var fr=w.frameElement.getBoundingClientRect(); 보임=fr.width>0&&fr.height>0&&getComputedStyle(w.frameElement).visibility!=='hidden'; }catch(e){}   /* 1안은 화면 여러 장을 미리 띄워 둠 — 지금 보이는 화면만 거울 주인 */
    if(!켬||!g||!r0||!보임){ if(거){ 거.remove(); 거=null; } if(r0) r0.classList.remove('lab56-숨김'); return; }
    [].forEach.call(pd.querySelectorAll('.lab56-거울'),function(x){ if(x!==거) x.remove(); });
    if(!pd.getElementById('relay-style')){ var 원=d.getElementById('relay-style'); if(!원) return; var st=pd.createElement('style'); st.id='relay-style'; st.textContent=원.textContent; pd.head.appendChild(st); }
    r0.classList.add('lab56-숨김');
    if(!거||!거.isConnected){ 거=pd.createElement('div'); 거.className='relay-fab bl lab56-거울'; 거.style.zIndex='60'; pd.body.appendChild(거); 끝글='';
      거.addEventListener('click',function(e){ var t=e.target.closest('button'); if(!t) return; e.stopPropagation(); var 진=진짜(); if(!진) return;
        var 짝=t.classList.contains('relay-btn')?진.querySelector('.relay-btn'):(t.dataset.a?진.querySelector('[data-a="'+t.dataset.a+'"]'):null); if(짝) 짝.click(); 맞춤(); }); }
    if(r0.innerHTML!==끝글){ 끝글=r0.innerHTML; 거.innerHTML=끝글; }
    var r=g.getBoundingClientRect(), b=거.querySelector('.relay-btn'), bw=b?b.offsetWidth:54; 거.style.left=Math.round(r.left+(r.width-bw)/2)+'px'; 거.style.bottom=Math.round(pd.defaultView.innerHeight-r.bottom+12)+'px'; }
  new MutationObserver(function(){ 맞춤(); }).observe(d.body,{childList:true,subtree:true,attributes:true,attributeFilter:['aria-expanded']});
  setInterval(맞춤,400); })();

/* 늘 켬 — 56 랩이 제 엔진을 얹은 문서(lab56-css)에선 안 켬 */
(function(){ if(document.getElementById('lab56-css')) return; try{ window.__lab56랩적용(["이메일엔진", "피드백GNB", "속도"]); }catch(e){} })();
