/* 조합 1안 · 부품/저장본도우미입력프로젝트 — 손질/60_도우미입력/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12
   프로젝트 도우미(html.lab56-프)에만 · 이메일 것과 같은 꼴: AI 도우미 입력창 — 누름 땐 주요색 테(프리즘 없음) · 답 쓰는 중엔 진한 프리즘 2.4초 + 보냄 자리에 정지 ■. */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab60입력프) return;
  function 켬(c){ return h.classList.contains('lab25켬-'+c); }
  function 멈춤(){ if(!켬('쓰는')||!w.__lab56처음||!w.__lab56적용) return;
    var 쓰=d.querySelector('.lab25-쓰는중'), 흉=쓰&&쓰.parentNode; if(!흉) return;
    var 줄들=[].slice.call(흉.children).filter(function(c){ return c!==쓰&&!c.classList.contains('lab25-단계'); });
    var 글칸=d.querySelector('.lab25-입력 textarea'), 글=글칸?글칸.value:'';
    w.__lab56처음();
    줄들.forEach(function(c){ 흉.insertBefore(c,쓰); });
    var n=d.createElement('div'); n.className='lab25-멈춘'; n.textContent='답변을 멈췄어요'; 흉.insertBefore(n,쓰);
    var l=[].slice.call(h.classList).filter(function(c){ return c.indexOf('lab25켬-')===0; }).map(function(c){ return c.slice(7); }).filter(function(c){ return c!=='전'&&c!=='쓰는'&&c!=='중'; });
    l.push('중'); w.__lab56적용(l);
    if(글칸){ 글칸.value=글; 글칸.focus(); } }
  function 붙이기(){ var 칸=d.querySelector('.lab25-입력'); if(!칸||!w.__lab56처음) return false;
    if(칸.querySelector('i.멈춤')) return true; w.__lab60입력프=1;
    var b=d.createElement('i'); b.className='멈춤'; b.title='답변 멈추기'; b.setAttribute('role','button'); b.setAttribute('aria-label','답변 멈추기');
    b.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation(); 멈춤(); }); 칸.appendChild(b);
    d.addEventListener('keydown',function(e){ if(e.key==='Escape'&&켬('쓰는')) 멈춤(); });
    return true; }
  var n=0; (function 봄(){ if(붙이기()||++n>40) return; setTimeout(봄,100); })();
})();
