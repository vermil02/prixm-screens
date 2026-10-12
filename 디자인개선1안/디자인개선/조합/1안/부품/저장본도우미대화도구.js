/* 조합 1안 · 부품/저장본도우미대화도구 — 손질/26_도우미대화도구/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12
   이메일(d04)에만: 26 랩 E-1 — 대화 중 · 답 쓰는 중에 도우미 머리 바로 아래 「새 채팅 · 현재 대화 문서화」(대화 전엔 숨김).
   문서화 결과가 어디에 쌓이는지는 아직 안 정함(데모 알림). */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab26대화도구) return;
  function 켬(c){ return h.classList.contains('lab25켬-'+c); }
  function 지(){ return w.gsap&&켬('날기')&&!(w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches)?w.gsap:null; }
  function 붙이기(){
    var 머리칸=d.querySelector('.lab25-도우미머리'); if(!머리칸||!w.__lab25처음) return false;
    if(d.querySelector('.lab25-대화도구')) return true; w.__lab26대화도구=1;
    var 글칸=d.querySelector('.lab25-입력 textarea');
    function 알림(글){ var 카=d.querySelector('.lab25-도우미카드')||머리칸.parentNode; if(!카) return;
      var 옛=카.querySelector('.lab25-알림'); if(옛) 옛.remove();
      var n=d.createElement('div'); n.className='lab25-알림'; n.textContent=글; 카.appendChild(n); var g=지();
      if(g){ g.from(n,{opacity:0,y:6,duration:.25,ease:'power2.out',clearProps:'opacity,transform'}); g.to(n,{opacity:0,duration:.3,delay:2.2,onComplete:function(){ n.remove(); }}); }
      else setTimeout(function(){ n.remove(); },2500); }
    var 도구=d.createElement('div'); 도구.className='lab25-대화도구';
    도구.innerHTML='<button type="button" class="새"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 7v6M9 10h6"/></svg>새 채팅</button>'
      +'<button type="button" class="문서"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg><span>현재 대화 문서화</span></button>';
    머리칸.parentNode.insertBefore(도구,머리칸.nextSibling);
    도구.querySelector('.새').addEventListener('click',function(){ var o=d.querySelector('.lab25-알림'); if(o) o.remove(); w.__lab25처음(); if(글칸) 글칸.focus(); });
    var 문=도구.querySelector('.문서'), 문글=문.querySelector('span');
    문.addEventListener('click',function(){ if(문.classList.contains('하는중')||켬('쓰는')) return; 문.classList.add('하는중'); 문글.textContent='문서로 만드는 중…';
      setTimeout(function(){ 문.classList.remove('하는중'); 문글.textContent='현재 대화 문서화'; if(!켬('전')) 알림('현재 대화를 문서로 만들었어요'); },900); });
    /* 등장 — 2026-10-12 사용자 「새 채팅 현재 대화 문서화도 애니메이션 적용해줘 타이밍 비슷하게 등장하도록」
       26 랩 날기와 같은 값: 얼굴이 머리로 날기 시작할 때(대화 전 → 쓰는 중) 머리 설명(.35) 다음 .45 에 아래서 4 · .35초.
       1안 엔진 날기는 「대화도구」 켬이 없어 이 줄을 건너뛰므로 html 상태가 바뀌는 때를 보고 따로 붙임 */
    var 전이었음=켬('전');
    new MutationObserver(function(){ var 지금전=켬('전');
      if(전이었음&&!지금전){ var g=지(); if(g) g.from(도구,{opacity:0,y:4,duration:.35,delay:.45,clearProps:'opacity,transform'}); }
      전이었음=지금전; }).observe(h,{attributes:true,attributeFilter:['class']});
    return true; }
  /* 엔진이 머리를 다 만든 뒤에 붙음 — 늦게 뜨면 잠깐 다시 봄 */
  var n=0; (function 봄(){ if(붙이기()||++n>40) return; setTimeout(봄,100); })();
})();
