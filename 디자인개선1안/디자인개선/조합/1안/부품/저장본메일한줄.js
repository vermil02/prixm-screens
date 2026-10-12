/* 조합 1안 · 부품/저장본메일한줄 — 손질/41_메일스크롤/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12
   이메일(d04)에만: 41 랩 안 5 — 메일 내용은 통째로 스크롤 그대로 · 제목 줄(제목 · 보낸 사람)이 다 올라가면 카드 위에 한 줄 「메일 제목 │ 작성자 날짜」(48 · 흰 바탕 · 아래 선 + 옅은 그림자) · 누르면 맨 위로. */

(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab41적용) return;
  var 켠=[];
  /* 내림 표시 — 읽기 칸이나 본문이 1 넘게 내려가면 읽기 칸에 lab41-내림 · 메일을 바꾸면(읽기 칸을 새로 그림) 뗌 */
  function 맞춤(r){ if(!r) return; var b=r.querySelector('.lab25-본문'), y=Math.max(r.scrollTop, b?b.scrollTop:0), 내=y>1;
    if(내!==r.classList.contains('lab41-내림')) r.classList.toggle('lab41-내림',내); }
  d.addEventListener('scroll',function(e){ var t=e.target; if(!t||t.nodeType!==1) return; var r=t.closest&&t.closest('.lab25-읽기'); if(r) 맞춤(r); },true);
  var 붙음=false;
  (function 붙이기(){ var r=d.querySelector('.lab25-읽기'); if(!r){ setTimeout(붙이기,200); return; } if(붙음) return; 붙음=true;
    new MutationObserver(function(){ 맞춤(r); if(줄&&줄.classList.contains('보임')){ 줄.style.transition='none'; 줄.classList.remove('보임'); 줄.offsetHeight; 줄.style.transition=''; } }).observe(r,{childList:true}); })();   /* 메일을 바꾸면 한 줄은 전환 없이 바로 숨김 */
  /* 안 5 한 줄 — 읽기 칸이 제목 줄(보낸 사람 줄 아래 끝)보다 더 내려가면 보임 · 글은 1안이 그린 제목 · 보낸 사람 · 때를 그대로 읽음(얼굴 색도 그대로) */
  var 줄=null;
  function 한줄(){ var r=d.querySelector('.lab25-읽기'); if(!r) return; var 카=r.parentElement;
    if(켠.indexOf('한줄')<0){ if(줄) 줄.classList.remove('보임'); return; }
    if(!줄||!줄.isConnected){ 줄=d.createElement('div'); 줄.className='lab41-한줄'; 줄.setAttribute('aria-hidden','true'); 카.appendChild(줄); 줄.dataset.제='';
      줄.addEventListener('click',function(){ var r2=d.querySelector('.lab25-읽기'); if(r2) r2.scrollTo({top:0,behavior:'smooth'}); }); }
    var h2=r.querySelector('h2'), 보=r.querySelector('.lab25-보낸'), 얼=보&&보.querySelector('.lab25-보낸얼굴');
    var 제=h2?h2.textContent:'', 키=제+'|'+(보?보.textContent:'');
    if(줄.dataset.제!==키){ 줄.dataset.제=키;
      줄.innerHTML='<b></b><em></em><span class="보"></span><span class="때"></span>';   /* 2026-10-12 사용자 「박 아바타 부분 없이 · 메일 제목 | 작성자 날짜」 */
      줄.querySelector('b').textContent=제; 줄.querySelector('.보').textContent=보&&보.querySelector('b')?보.querySelector('b').textContent:'';
      var 때=보&&보.querySelector('.lab25-보낸때'); 줄.querySelector('.때').textContent=때?때.textContent.replace(/^받는 사람 나 · /,''):''; }
    /* 목록 화면(리스트 보기 · 상세 칸 숨김)에선 자리 값이 다 0 이라 「끝 0 < 내림 0 + 48」 로 미리 켜져 있다가 메일을 열면 0.1초 떴다 사라졌음
       (1안 실측 · 사용자 「메일 틀면 요약된 게 상단에 떴다가 사라짐」) → 보낸 사람 줄이 실제로 보이고(높이 > 0) 1 넘게 내렸을 때만 */
    var 끝=보?보.offsetTop+보.offsetHeight-r.offsetTop:80, 보임=!!보&&보.offsetHeight>0&&r.scrollTop>1&&r.scrollTop>끝-48;
    if(보임!==줄.classList.contains('보임')) 줄.classList.toggle('보임',보임); }
  d.addEventListener('scroll',function(e){ var t=e.target; if(t&&t.classList&&t.classList.contains('lab25-읽기')) 한줄(); },true);
  setInterval(function(){ if(켠.indexOf('한줄')>=0) 한줄(); },400);   /* 메일을 바꾸면(읽기 칸 새로 그림 · 맨 위) 숨김 · 글 바꿈 */
  w.__lab41적용=function(목록){ 켠=목록||[];
    ['머리고정','머리고정그림자','위흐림','한줄'].forEach(function(i){ var c='lab41켬-'+i, 있=h.classList.contains(c), 켜=켠.indexOf(i)>=0; if(켜&&!있) h.classList.add(c); else if(!켜&&있) h.classList.remove(c); });   /* 있을 때만 지움 */
    var r=d.querySelector('.lab25-읽기'); if(r){ r.scrollTop=0; var b=r.querySelector('.lab25-본문'); if(b) b.scrollTop=0; 맞춤(r); } 한줄();
  };
})();

/* 1안 · 고정 — 저장본메일한줄(손질/41_메일스크롤/1안반영.py) · 이메일 문서에서만 켬 */
(function(){ var d=document, w=window, n=0; if(!w.__lab41적용) return;
  (function 켜기(){ if(d.querySelector('.lab25-읽기')){ w.__lab41적용(["한줄"]); return; } if(n++<40) setTimeout(켜기,200); })();
})();
