/* 조합 2안 · 부품/펼치기.js — 펼치기.css 의 짝 = 틀.js 그대로(카드 전 틀용 · 2026-10-02). LNB 를 접으면 GNB 맨 위 「다시 열기」 단추(08 틀 랩 덧붙임 값).
   ① 단추는 GNB 맨 뒤에 넣고 보이는 순서만 맨 위(맨 앞에 끼우면 칸 차례 아이콘 규칙이 밀려 깨짐) ② 단추를 누르면 펼침(카드 전 틀은 단추로만 — GNB 빈 곳 누름은 뺌)
   ③ 1안 손질후는 보이는 GNB 가 바깥 화면 것이고 LNB · 접기 단추는 안쪽 화면(바깥 문서 안 iframe)에 있음 → 접힘(body.lnb-접힘)을 안쪽 ↔ 바깥끼리 맞춤 */
(function(){
  var D=document, B=D.body, 접='lnb-접힘';
  function 바깥(){ try{ var p=window.parent; return (p&&p!==window&&p.document.querySelector('.gnb'))?p.document:null; }catch(e){ return null; } }
  function 안쪽들(){ var a=[]; D.querySelectorAll('iframe').forEach(function(f){ try{ if(f.contentDocument&&f.contentDocument.body) a.push(f.contentDocument); }catch(e){} }); return a; }
  function 펼치기(){ B.classList.remove(접,'lnb-엿봄'); 안쪽들().forEach(function(d){ d.body.classList.remove(접,'lnb-엿봄'); }); var o=바깥(); if(o) o.body.classList.remove(접,'lnb-엿봄'); }
  var g=D.querySelector('.gnb');
  if(g && !g.querySelector('.lab-gnb열기')){
    var b=D.createElement('button'); b.type='button'; b.className='lab-gnb열기'; b.title='패널 열기';
    b.innerHTML='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="3.1" y="3.1" width="13.8" height="13.8" rx="2.5"/><path d="M7.75 3.1v13.8"/><path d="M11.2 7.5 13.7 10l-2.5 2.5"/></svg>';
    b.addEventListener('click',function(e){ e.stopPropagation(); 펼치기(); });
    g.appendChild(b);
    /* GNB 빈 곳 누르면 펼침 — 뺌(2026-10-02 사용자 「역 ㄱ자 구조가 되면서 섹션 느낌이 약해져서 · 다시 버튼으로만」) · 카드 틀의 틀.js 에는 남아 있음 */
  }
  // 접히는 순간 0.8초만 「막 접힘」 — 그동안 아이콘이 보이고 그 뒤 .6초에 걸쳐 사라짐(GNB 에 올리면 다시 보임 · 떼면 다시 사라짐)
  if(!B.dataset.막접힘감시) (function(){ B.dataset.막접힘감시=1; var t=0, 전=B.classList.contains(접); new MutationObserver(function(){ var 지금=B.classList.contains(접); if(지금&&!전){ B.classList.add('lab-막접힘'); clearTimeout(t); t=setTimeout(function(){ B.classList.remove('lab-막접힘'); },800); } if(!지금 && B.classList.contains('lab-막접힘')) B.classList.remove('lab-막접힘'); 전=지금;   /* 없는 꼬리표를 지워도 「바뀜」으로 잡혀 감시가 끝없이 돌다 탭이 멈췄던 것(2026-10-02) — 있을 때만 */ }).observe(B,{attributes:true,attributeFilter:['class']}); })();
  // 안쪽 화면이면: 내 접힘을 바깥에 알리고, 처음 열릴 때 바깥이 접혀 있으면 따라 접힘
  var o=바깥();
  if(o && !B.dataset.틀맞춤){
    B.dataset.틀맞춤=1;
    if(o.body.classList.contains(접)) B.classList.add(접);
    new MutationObserver(function(){ var 내=B.classList.contains(접); if(o.body.classList.contains(접)!==내) o.body.classList.toggle(접,내); }).observe(B,{attributes:true,attributeFilter:['class']});
  }
})();
