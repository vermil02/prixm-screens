/* 조합 1안 · 부품/GNB.js — GNB.css 의 짝(2026-10-02). 켜진 칸 「톡」(뽀잉 · 80% → 107% → 100%)을 **GNB 를 누를 때만**.
   전엔 .g-item.on 이 화면에 나타날 때마다 돌아서, LNB 버튼으로 화면이 바뀌어도 새 화면 GNB 가 톡 튐(사용자 「lnb 버튼 누를 때 gnb 클릭이 동작 · 화면 로드할 때 뽀잉 효과가 있는 듯」).
   누른 칸에 꼬리표 lab-톡 을 0.4초 붙임 → GNB.css 끝 규칙이 그때만 톡. */
(function(){ var d=document; if(d.__GNB톡) return; d.__GNB톡=1;
  d.addEventListener('click',function(e){ var it=e.target.closest&&e.target.closest('.gnb .g-item'); if(!it) return;
    it.classList.remove('lab-톡'); void it.offsetWidth; it.classList.add('lab-톡'); clearTimeout(it.__톡); it.__톡=setTimeout(function(){ it.classList.remove('lab-톡'); },400); },true);
})();
