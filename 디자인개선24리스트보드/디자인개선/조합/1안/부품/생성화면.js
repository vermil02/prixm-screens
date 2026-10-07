/* 조합 1안 · 부품/생성화면.js — 짝 생성화면.css (2026-10-06 · 손으로 만든 부품)
   머리 경로의 첫 조각(.js-crumb-first) 글이 「새 자동화」 면 .lab-새입구 를 붙여 숨김 — 화면이 경로 글을 바꿀 때마다(템플릿 고름 · 구성 복사 · 뒤로) 다시 봄 */
(function(){ var d=document; if(d.__생성화면) return; d.__생성화면=1;
  function 맞춤(){ [].forEach.call(d.querySelectorAll('.page-hd .crumb .js-crumb-first'),function(e){ e.classList.toggle('lab-새입구', e.textContent.replace(/\s+/g,' ').trim()==='새 자동화'); }); }
  맞춤();
  var 머리=d.querySelector('.page-hd'); if(!머리) return;
  new MutationObserver(맞춤).observe(머리,{childList:true,subtree:true,characterData:true});
})();
