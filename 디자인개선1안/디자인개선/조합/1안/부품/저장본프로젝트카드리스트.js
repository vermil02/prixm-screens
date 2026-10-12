/* 조합 1안 · 부품/저장본프로젝트카드리스트 — 손질/63_프로젝트카드리스트/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12
   프로젝트(d06) 모든 프로젝트 리스트 — 63 랩 안 11: 회색 판(#f5f5f7) 안에 프로젝트마다 흰 카드 · 업무 칸 연한 회색 · 줄 펼침 화살 닫힘 ⌄ / 열림 ⌃
   · 프로젝트 줄 올리면 카드 테 #c9cbd6 + 화살 단추 바탕 rgba(0,0,0,.05)(이름 위 = 밑줄 · 둘 다 끔) · 누를 때 테 깜빡임 없음 · 이름 툴팁은 잘린(…) 이름에만. */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab63적용) return;
  w.__lab63적용=function(목록){ 목록=목록||[];
    [].slice.call(h.classList).forEach(function(c){ if(c.indexOf('lab63켬-')===0&&목록.indexOf(c.slice(8))<0) h.classList.remove(c); });
    목록.forEach(function(i){ h.classList.add('lab63켬-'+i); });
    };
  /* 툴팁잘림 — 이름 말풍선은 앱 crew-tooltip(document pointerover 캡처 · [title] 을 읽어 data-tip 에 옮김 · 0.3초 뒤 띄움 · 나갈 때 title 되돌림)
     → 그보다 먼저 도는 window pointerover 캡처에서 잘렸는지(scrollWidth > clientWidth) 재서, 안 잘렸으면 title 을 data-lab63제목 으로 치움(앱이 [title] 을 못 찾음 = 말풍선 없음) · 잘렸으면 되돌림 · 1안 목록이 다시 그리면 새 b 에 title 이 다시 오므로 올릴 때마다 잼 */
  w.addEventListener('pointerover',function(e){ var b=e.target&&e.target.closest&&e.target.closest('.pjl .프 .이름 b'); if(!b) return;
    var 글=b.getAttribute('title'); if(글!==null) b.setAttribute('data-lab63제목',글); else 글=b.getAttribute('data-lab63제목'); if(글===null) return;
    if(b.scrollWidth>b.clientWidth+1) b.setAttribute('title',글); else b.removeAttribute('title'); },true);
  /* 화살 — 줄이 새로 그려질 때 1안 목록호버(저장본목록호버.js)가 Web Animations 로 0° ↔ 90° 를 돌림 → 이 덧붙임이 켜져 있으면 그 각도를 90° ↔ 270° 로 바꿔 줌(그 파일은 안 고침) */
  var 원래=Element.prototype.animate;
  if(원래&&!원래.__lab63) { var 새=function(k,o){ try{ if(true&&this.closest&&this.closest('.pjl .펼')&&Array.isArray(k))
      k=k.map(function(f){ if(!f||typeof f.transform!=='string') return f; var g={}; for(var x in f) g[x]=f[x]; g.transform=f.transform.replace(/rotate\((-?\d+(?:\.\d+)?)deg\)/,function(_,a){ return 'rotate('+(+a+(+a===90?180:90))+'deg)'; }); return g; }); }catch(e){}
      return 원래.call(this,k,o); }; 새.__lab63=1; Element.prototype.animate=새; }
})();
