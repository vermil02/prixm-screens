/* 조합 1안 · 부품/저장본메일열기 — 손질/35_메일열기/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12
   이메일(d04)에만: 35 랩 안 2 「스르륵」 — 목록에서 메일로 들어갈 때 상세 칸 · 도우미 칸, 좌우 분할에서 메일을 바꿀 때 읽기 칸이 옅게 → 진하게 + 8 아래에서 올라옴 · 0.22초. */

(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab35적용) return;
  var 꼴='', 돎=[], 앞줄=null, 처음대기=false;
  var 결='cubic-bezier(.2,.8,.2,1)';   /* 33 접힘과 같은 결 */
  function 읽기(){ return d.querySelector('.lab25-읽기'); }
  function 고른줄(){ return d.querySelector('.lab25-목록카드 button.lab25-고른'); }
  function 끊기(){ 돎.forEach(function(a){ try{ a.cancel(); }catch(e){} }); 돎=[]; }
  function 걸기(el,틀,때,늦){ if(!el||!el.animate) return; 돎.push(el.animate(틀,{duration:때,delay:늦||0,easing:결,fill:'backwards'})); }

  /* 안마다 — 대상에 거는 움직임. 대상 = 메일만 바뀔 때 [읽기 칸] · 목록에서 들어갈 때 [상세 칸 · 도우미 칸]
     (리스트 보기(1안 기본)에선 메일을 누를 때마다 목록 → 상세로 「들어가는」 것이라 늘 뒤쪽 · 좌우 분할에선 처음 한 번만 뒤쪽) */
  function 틀(대상들){
    if(꼴==='스르륵') 대상들.forEach(function(e,i){ 걸기(e,[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],220,i*40); });
    else if(꼴==='옆에서') 대상들.forEach(function(e,i){ 걸기(e,[{opacity:0,transform:'translateX(20px)'},{opacity:1,transform:'none'}],260,i*40); });
    else if(꼴==='흐림') 대상들.forEach(function(e,i){ 걸기(e,[{opacity:0,filter:'blur(6px)'},{opacity:1,filter:'blur(0)'}],240,i*40); });
    else if(꼴==='차례로'){ var r=읽기(), n=0;
      대상들.forEach(function(e){
        if(e===r||!e.contains(r)){ (e===r?[].slice.call(r.children):[e]).forEach(function(c){ 걸기(c,[{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}],280,Math.min(n++,4)*50); }); return; }
        걸기(e,[{opacity:0},{opacity:1}],160);   /* 상세 칸 겉(카드)은 옅게만 · 안의 제목 → 보낸 → 본문 이 차례로 */
        [].slice.call(r.children).forEach(function(c){ 걸기(c,[{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}],280,Math.min(n++,4)*50); });
      }); }
  }
  function 틀기(처음){
    if(!꼴) return; if(w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var r=읽기(); if(!r) return; 끊기();
    var 대상=[r];
    if(처음){ var 상=d.querySelector('.lab25-상세칸'), 도=d.querySelector('.lab25-도우미칸'); 대상=[상||r]; if(도&&도.offsetWidth) 대상.push(도); }
    틀(대상);
  }

  /* 내용이 바뀌는 때 — 1안 열기() 가 읽기 칸을 비우고 제목 · 보낸 · 본문 셋을 넣음 → 그 뒤 한 번만 */
  var 살핌=null, 기다림=0;
  function 붙이기(){
    var r=읽기(); if(!r){ if(기다림++<60) setTimeout(붙이기,100); return; }
    앞줄=고른줄();
    살핌=new MutationObserver(function(){
      if(!r.querySelector('h2')||!r.querySelector('.lab25-본문')) return;   /* 다 넣은 뒤에만 */
      var 줄=고른줄(), 처음=처음대기; 처음대기=false;
      if(줄===앞줄&&!처음) return; 앞줄=줄;
      틀기(처음);
    });
    살핌.observe(r,{childList:true});
    /* 처음 안내가 걷히는 순간 — 안내 걷힘(30 · window 잡기)이 내용 바꿈(25 · 줄 잡기)보다 먼저라, 한 박자 미뤄 내용 바꿈과 한 번으로 묶음
       (첫 메일을 누르면 내용은 안 바뀌므로 미룬 쪽이 걸어 줌) */
    var 빈이었음=h.classList.contains('lab30-빈');
    new MutationObserver(function(){ var 지금빈=h.classList.contains('lab30-빈');
      if(빈이었음&&!지금빈){ 처음대기=true; setTimeout(function(){ if(처음대기){ 처음대기=false; 틀기(true); } },0); }
      빈이었음=지금빈; }).observe(h,{attributes:true,attributeFilter:['class']});
  }
  붙이기();

  w.__lab35적용=function(목록){
    var 새=(목록||[])[0]||'';
    [].slice.call(h.classList).forEach(function(c){ if(c.indexOf('lab35켬-')===0&&c!=='lab35켬-'+새) h.classList.remove(c); });
    if(새&&!h.classList.contains('lab35켬-'+새)) h.classList.add('lab35켬-'+새);
    꼴=새; 끊기();
  };
})();

/* 1안 · 고정 — 저장본메일열기(손질/35_메일열기/1안반영.py) · 이메일 문서에서만 켬 */
(function(){ var d=document, w=window, n=0; if(!w.__lab35적용) return;
  (function 켜기(){ if(d.querySelector('.lab25-읽기')){ w.__lab35적용(["스르륵"]); return; } if(n++<40) setTimeout(켜기,200); })();
})();
