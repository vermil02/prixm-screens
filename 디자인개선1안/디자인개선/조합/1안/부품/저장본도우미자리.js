/* 조합 1안 · 부품/저장본도우미자리 — 손질/36_도우미자리/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12
   이메일(d04)에만: 36 랩 안 2 — AI 도우미 얼굴 단추를 메일 카드 오른쪽 위 → 창 오른쪽 아래(동그라미 + 이름표가 메일 카드 끝에서 오른쪽 · 아래 똑같이 24 · 지름 80) · 메일 열면 도우미 열린 채는 그대로. */

(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab36적용) return;
  var 켠=[], 열쇠='lab36-도우미', 우리가닫음=false, 사람손=false;
  function 켬(i){ return 켠.indexOf(i)>=0; }
  function 단(){ return d.querySelector('.lab31-AI단추'); }
  function 열림(){ return h.classList.contains('lab27-AI펼침'); }
  function 기억(){ try{ return sessionStorage.getItem(열쇠); }catch(e){ return null; } }
  function 적기(v){ try{ sessionStorage.setItem(열쇠,v); }catch(e){} }

  /* 말풍선 — 단추 왼쪽 14 · 단추 세로 가운데(1안 말자리 와 같은 값 · 창 기준) */
  function 말자리(){ var b=단(), m=d.querySelector('.lab31-말'); if(!켬('아래')||!b||!m) return;
    var r=b.getBoundingClientRect(); m.style.top=(r.top+r.height/2-17)+'px'; m.style.right=(w.innerWidth-r.left+14)+'px'; }
  d.addEventListener('mouseover',function(e){ if(e.target.closest&&e.target.closest('.lab31-AI단추')) 말자리(); },true);
  w.addEventListener('resize',function(){ setTimeout(말자리,0); });

  /* 처음 닫힘 — 1안은 처음에 도우미를 엶(AI열림). 사람이 열고 닫은 것은 이 창에서 기억(프로젝트 lab32-도우미 와 같은 방식) */
  d.addEventListener('click',function(e){ var t=e.target.closest&&e.target.closest('.lab31-AI단추,.lab27-AI단추,.lab31-닫기'); if(!t) return;
    사람손=true; setTimeout(function(){ 적기(열림()?'열림':'닫힘'); },0); },true);
  function 닫기맞춤(){
    if(켬('처음닫힘')){ if(사람손||기억()==='열림') return; if(열림()){ h.classList.remove('lab27-AI펼침'); 우리가닫음=true; } }
    else if(우리가닫음&&!사람손){ 우리가닫음=false; if(!열림()) h.classList.add('lab27-AI펼침'); }
  }
  /* 1안 엔진이 처음 몇 초 동안 다시 열 수 있어 잠깐 살핌(있을 때만 지움 — 없는 클래스 remove 는 감시를 또 돌림) */
  var 살핌=setInterval(닫기맞춤,150); setTimeout(function(){ clearInterval(살핌); },6000);

  /* 단추 · 말풍선을 메일 카드 밖(body)으로 — 35 「스르륵」 이 메일에 들어갈 때 상세 칸을 움직이면(transform) 그 안의 fixed 단추가 창이 아니라 상세 칸 기준이 되어
     0.22초 동안 왼쪽 위로 12 씩 밀렸다 돌아왔음(1안 실측 1783,861 → 1771,849 → 1783,861). 1안 엔진은 단추를 isConnected 로만 보므로 옮겨도 그대로 씀 · 끄면 카드로 되돌림 */
  function 옮김(){ var 카=d.querySelector('.lab25-상세카드'); if(!카) return;
    [단(), d.querySelector('.lab31-말')].forEach(function(e){ if(!e) return;
      if(켬('아래')&&e.parentNode!==d.body) d.body.appendChild(e); else if(!켬('아래')&&e.parentNode===d.body) 카.appendChild(e); }); }
  new MutationObserver(function(){ if(켬('아래')) 옮김(); }).observe(d.body,{childList:true,subtree:true});
  w.__lab36적용=function(목록){
    켠=(목록||[]).slice();
    ['아래','처음닫힘'].forEach(function(i){ var c='lab36켬-'+i, 있=h.classList.contains(c); if(켬(i)&&!있) h.classList.add(c); else if(!켬(i)&&있) h.classList.remove(c); });
    var m=d.querySelector('.lab31-말'); if(m&&!켬('아래')){ m.style.top=''; m.style.right=''; }
    옮김(); 닫기맞춤(); 말자리();
  };
})();

/* 1안 · 고정 — 저장본도우미자리(손질/36_도우미자리/1안반영.py) · 이메일 문서에서만 켬 */
(function(){ var d=document, w=window, n=0; if(!w.__lab36적용) return;
  (function 켜기(){ if(d.querySelector('.lab25-읽기')){ w.__lab36적용(["아래"]); return; } if(n++<40) setTimeout(켜기,200); })();
})();
