/* 조합 1안 · 부품/저장본LNB새소식 — 손질/54_LNB새소식/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12
   프로젝트(d06)에만: 54 랩 안 2 — LNB 프로젝트 줄 지연 점 대신 새 소식 점(주색 #6c69f0 7 + 이름 600) · 차례 = 고정 → 최근 활동순(새 소식이 위).
   새 소식 = 마지막으로 연 뒤 활동이 있음 · 연 때 = 이 브라우저 localStorage lab54-연때(기록 없으면 2026-09-21 12:00 · 시연용) · 프로젝트를 열면 점 사라짐 · 되돌리기 __lab54연때초기화() */
(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab54적용) return;
  var 꼴='', 열쇠='lab54-연때', 기준=new Date('2026-09-21T12:00:00').getTime();
  function 연때(){ try{ return JSON.parse(localStorage.getItem(열쇠)||'{}')||{}; }catch(e){ return {}; } }
  function 봄(id){ if(!id) return; var o=연때(); o[id]=Date.now(); try{ localStorage.setItem(열쇠,JSON.stringify(o)); }catch(e){} }
  w.__lab54연때초기화=function(){ try{ localStorage.removeItem(열쇠); }catch(e){} };
  var 대=null; function 대시(){ if(대) return 대; var b=w.__복제; if(!b||!b.표) return null; var k=Object.keys(b.표).filter(function(x){ return /^GET \/api\/projects\/dashboard/.test(x); })[0]; try{ 대=JSON.parse(b.표[k][2]).projects||[]; }catch(e){} return 대; }
  function 이름(b){ var l=b.querySelector('.px-lnb-label'); return l?l.textContent.trim():(b.title||'').split(' · ')[0]; }   /* title 엔 32 가 「 · 지연 업무 N건」 을 붙임 → 글로 */
  function 짝(이){ var p=(대시()||[]).filter(function(x){ return x.name===이; })[0]; return p; }
  function 새(p){ if(!p) return false; var t=new Date(p.last_activity_at).getTime(), o=연때()[p.id]; return t>(o||기준); }
  function 고정(){ try{ return JSON.parse(localStorage.getItem('projects.pinned')||'[]')||[]; }catch(e){ return []; } }
  function 맞춤(){ var m=decodeURIComponent(location.pathname).match(/^\/projects\/([0-9a-f-]{36})/); if(m){ var o=연때(); if(!o[m[1]]||Date.now()-o[m[1]]>2000) 봄(m[1]); }
    var 줄=[].slice.call(d.querySelectorAll('.px-lnb-row.lab32프')); if(!줄.length) return;
    줄.forEach(function(b){ var p=짝(이름(b)), 점=b.querySelector('.px-lnb-ico i.lab54새'), 켜=!!꼴&&새(p);
      if(켜&&!점){ 점=d.createElement('i'); 점.className='lab54새'; b.querySelector('.px-lnb-ico').appendChild(점); } else if(!켜&&점) 점.remove();
      b.classList.toggle('lab54새줄',켜);  });
    if(꼴!=='새소식순서') return;
    /* 차례 = 고정 → 최근 활동순(새 소식이 자연히 위) */
    var 고=고정(), lis=줄.map(function(b){ return b.closest('li'); }), 부=lis[0]&&lis[0].parentElement; if(!부) return;
    var 차=lis.slice().sort(function(a,b){ var pa=짝(이름(a.querySelector('.px-lnb-row')))||{}, pb=짝(이름(b.querySelector('.px-lnb-row')))||{};
      var ga=고.indexOf(pa.id)>=0?0:1, gb=고.indexOf(pb.id)>=0?0:1; if(ga!==gb) return ga-gb; return new Date(pb.last_activity_at)-new Date(pa.last_activity_at); });
    var 지금=lis.map(function(x){ return x.textContent; }).join('|'), 새차=차.map(function(x){ return x.textContent; }).join('|');
    if(지금!==새차){ var 앞=lis[0].previousElementSibling; 차.forEach(function(li){ if(앞) 앞.after(li); else 부.prepend(li); 앞=li; }); } }
  d.addEventListener('click',function(e){ var b=e.target.closest&&e.target.closest('.px-lnb-row.lab32프'); if(b){ var p=짝(이름(b)); if(p) 봄(p.id); }
    var n=e.target.closest&&e.target.closest('.pjl .프 .이름 b, .pj-name-btn'); if(n){ var p2=짝(n.textContent.trim()); if(p2) 봄(p2.id); } setTimeout(맞춤,50); },true);
  w.__lab54적용=function(목록){ var 새꼴=(목록||[])[0]||'';
    [].slice.call(h.classList).forEach(function(c){ if(c.indexOf('lab54켬-')===0&&c!=='lab54켬-'+새꼴) h.classList.remove(c); }); if(새꼴) h.classList.add('lab54켬-'+새꼴); 꼴=새꼴; 맞춤(); };
  setInterval(맞춤,300);
})();
/* 1안 — 안 2(새 소식 점 + 최근 활동순) 늘 켬 */
if(window.__lab54적용) window.__lab54적용(['새소식순서']);
