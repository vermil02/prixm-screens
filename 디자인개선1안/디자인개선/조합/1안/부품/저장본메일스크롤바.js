/* 조합 1안 · 부품/저장본메일스크롤바 — 손질/42_메일스크롤바/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12
   이메일(d04)에만: 42 랩 안 3 — 메일 읽기 칸 스크롤 막대 5 · 위아래 12 띄움(카드 둥글기 10 에 안 깎이게) · 끝 둥글기 3 · 평소엔 숨고 카드에 올리거나 스크롤하는 동안만 #d6d8e6. */

(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab42적용) return;
  /* 안 3 — 스크롤하는 동안(올리지 않고 휠 · 키보드로) 0.8초 보임 */
  var 때=null;
  d.addEventListener('scroll',function(e){ var t=e.target; if(!t||!t.classList||!(t.classList.contains('lab25-읽기')||t.classList.contains('lab25-본문'))) return;
    if(!t.classList.contains('lab42-구름')) t.classList.add('lab42-구름'); clearTimeout(때); 때=setTimeout(function(){ t.classList.remove('lab42-구름'); },800); },true);
  w.__lab42적용=function(목록){ var 켠=목록||[];
    ['띄움','띄움숨김'].forEach(function(i){ var c='lab42켬-'+i, 있=h.classList.contains(c), 켜=켠.indexOf(i)>=0; if(켜&&!있) h.classList.add(c); else if(!켜&&있) h.classList.remove(c); });   /* 있을 때만 지움 */
  };
})();

/* 1안 · 고정 — 저장본메일스크롤바(손질/42_메일스크롤바/1안반영.py) · 이메일 문서에서만 켬 */
(function(){ var d=document, w=window, n=0; if(!w.__lab42적용) return;
  (function 켜기(){ if(d.querySelector('.lab25-읽기')){ w.__lab42적용(["띄움숨김"]); return; } if(n++<40) setTimeout(켜기,200); })();
})();
