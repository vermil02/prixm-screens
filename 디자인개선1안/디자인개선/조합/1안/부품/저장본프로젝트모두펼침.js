/* 조합 1안 · 부품/저장본프로젝트모두펼침 — 손질/62_프로젝트모두펼침/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12
   프로젝트(d06)에만: 62 랩 안 2 — 모든 프로젝트 리스트 머리 「이름」 왼쪽(타일 열 · 24 × 24)에 모두 펼치기 ⇕ / 모두 접기(다 열렸을 때).
   누르면 바꿀 줄의 .프 .펼 을 한 번에 누름 · 머리가 다시 그려지면 그리기 전에 같은 단추를 옮겨 붙임(번쩍 없게) · 누름은 이름 정렬로 안 퍼짐. */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab62적용) return;
  var 꼴='', 도는중=false;
  var 펼그림='<svg viewBox="0 0 24 24"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>', 접그림='<svg viewBox="0 0 24 24"><path d="m7 20 5-5 5 5"/><path d="m7 4 5 5 5-5"/></svg>';
  function 펼들(){ return [].slice.call(d.querySelectorAll('.pjl .줄.프 .펼')); }
  function 다열림(){ var a=펼들(); return a.length>0&&a.every(function(b){ return b.classList.contains('열림'); }); }
  /* 단추는 머리 줄(.머리) 바로 아래 아이 · 이름 칸(span) 밖 — 칸 안에 두면 올릴 때 이름 칸 정렬 띠 · 화살까지 같이 뜸(첫 판 실측) */
  /* 같은 단추를 옮겨 붙임 — 새로 만들면 올림 바탕 · 앱 말풍선이 한순간 꺼졌다 켜짐(번쩍) */
  var 단=null;
  function 맞춤(){ var 머=d.querySelector('.pjl .머리'), b=단;
    if(꼴!=='모두펼침'){ if(b&&b.parentNode) b.remove(); return; }
    if(!머) return;
    if(!b){ b=단=d.createElement('button'); b.type='button'; b.className='lab62모두'; }
    if(b.parentNode!==머) 머.appendChild(b);
    var 열=다열림(), 뜻=열?'접':'펼'; if(b.dataset.뜻!==뜻){ b.dataset.뜻=뜻; b.innerHTML=열?접그림:펼그림; b.title=열?'모두 접기':'모두 펼치기'; b.setAttribute('aria-label',b.title); } }
  /* 한 번에 누름 — 2026-10-12 사용자 「열기 닫기 할 때 우측 이름 항목하고 버튼이 번쩍」: 16ms 간격으로 하나씩 누르니 머리가 2 ~ 6 번 다시 그려지고
     단추가 2 ~ 3 프레임 비었음(실측) → 같은 순간에 모두 누름(줄을 누를 때마다 목록이 다시 그려질 수 있어 매번 새로 찾음) + 머리가 바뀌면 그리기 전에 단추를 다시 붙임(아래 지킴) */
  function 모두(열기){ if(도는중) return; 도는중=true;
    for(var n=0;n<60;n++){ var b=펼들().filter(function(x){ return x.classList.contains('열림')!==열기; })[0]; if(!b) break; b.click(); }
    도는중=false; 맞춤(); }
  /* 지킴 — 목록(.pjl)이 머리를 새로 그리면 같은 틱(그리기 전)에 단추를 다시 붙임 · 250ms 살피기만으론 그사이 빈 프레임이 보였음 */
  new MutationObserver(function(){ if(꼴==='모두펼침') 맞춤(); }).observe(d.documentElement,{subtree:true,childList:true});
  d.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.pjl .머리 button.lab62모두'); if(!b) return;
    e.stopPropagation(); e.preventDefault(); 모두(!다열림()); },true);
  ['mousedown','pointerdown'].forEach(function(t){ d.addEventListener(t,function(e){ if(e.target.closest&&e.target.closest('.pjl .머리 button.lab62모두')) e.stopPropagation(); },true); });
  w.__lab62적용=function(목록){ var 새꼴=(목록||[])[0]||'';
    [].slice.call(h.classList).forEach(function(c){ if(c.indexOf('lab62켬-')===0&&c!=='lab62켬-'+새꼴) h.classList.remove(c); }); if(새꼴) h.classList.add('lab62켬-'+새꼴); 꼴=새꼴; 맞춤(); };
  setInterval(맞춤,250);
})();
/* 1안 — 안 2(이름 왼쪽 모두 펼치기 · 접기) 늘 켬 */
if(window.__lab62적용) window.__lab62적용(['모두펼침']);
