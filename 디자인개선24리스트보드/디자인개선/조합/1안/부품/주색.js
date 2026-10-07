/* 조합 1안 · 부품/주색.js — 주색(프라이머리) 바꾸기 · 1안 · 2안 공통(2026-10-02 사용자 「프라이머리 컬러 · 준형 누르면 몇 가지 컬러 조정 · 직접 조정할 수 있는 거 하나」)
   하는 일: ① 아바타(.hd-user)를 누르면 고르기 판(칩 6 + 직접 고르기) ② 고른 색을 localStorage 「1안-주색」에 → 다른 화면(같은 출처 iframe)도 storage 알림으로 같이 바뀜
   칠하는 법: 이 문서의 모든 스타일 규칙에서 **파랑 ~ 인디고 계열 색**(HSL 색상 212 ~ 262° · 채도 30% 이상)만 골라, OKLCH(눈에 보이는 밝기 기준)로 색상 = 고른 색 · 채도 = 기준 인디고 #6c69f0 대비 비율 · 밝기 = 원래 + (고른 색 − 기준) 차(옅은 바탕일수록 덜)
     → 진한 칸은 진하게, 옅은 바탕은 옅게 남음. 상태색(초록 · 빨강 · 주황) · AI 보라(271°) · 로고 분홍 · 회색 톤(채도 낮음)은 안 건드림. 원래 값을 기억해 두고 늘 원래 값에서 다시 칠함. */
(function(){ var d=document, w=window; if(d.__주색) return; d.__주색=1;
  var 열쇠='1안-주색', 기준='#6c69f0';
  /* 2026-10-02 사용자 「어두운 것도 · 기업에서 사용할 때 적당한 색 위주로 추천하는 거 먼저」 — 줄 셋: 추천(채도 중간 · 업무 도구에 흔한 파랑 · 남 · 청록 계열) → 어두운 → 그 밖(밝고 센 색)
     초록은 뺌 — 상태 초록(동작 중 · 켜짐 스위치)과 겹쳐 주색으로 쓰면 「상태」와 「누를 것」이 갈리지 않음 */
  var 칩=[
    ['추천',[['인디고(지금)','#6c69f0'],['코발트','#2563eb'],['오션','#0369a1'],['딥 틸','#0f766e'],['슬레이트 블루','#4f5fa8'],['바이올렛','#6d28d9']]],
    ['어두운',[['네이비','#1e3a8a'],['미드나이트','#312e81'],['다크 틸','#134e4a'],['딥 퍼플','#4c1d95'],['차콜','#334155'],['버건디','#881337']]],
    ['그 밖',[['하늘','#0284c7'],['청록','#0d9488'],['보라','#7c3aed'],['장미','#e11d48']]]];
  function hsl(r,g,b){ r/=255;g/=255;b/=255; var M=Math.max(r,g,b),m=Math.min(r,g,b),h=0,s=0,l=(M+m)/2,c=M-m;
    if(c){ s=c/(1-Math.abs(2*l-1)); h=M===r?((g-b)/c)%6:M===g?(b-r)/c+2:(r-g)/c+4; h*=60; if(h<0)h+=360; } return [h,s,l]; }
  function rgb(h,s,l){ var c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2,v=[[c,x,0],[x,c,0],[0,c,x],[0,x,c],[x,0,c],[c,0,x]][Math.floor(h/60)%6];
    return v.map(function(t){ return Math.round((t+m)*255); }); }
  function 풀(hex){ hex=hex.replace('#',''); if(hex.length<6) hex=hex.split('').map(function(c){return c+c;}).join(''); return [parseInt(hex.substr(0,2),16),parseInt(hex.substr(2,2),16),parseInt(hex.substr(4,2),16)]; }
  /* OKLCH — 눈에 보이는 밝기 기준 색 공간. 색을 바꿀 때 「기준 인디고와의 밝기 차 · 채도 비율」을 그대로 옮김(HSL 로 밝기를 두면 청록 · 하늘이 형광처럼 밝아짐 · 2026-10-02 실측) */
  function 선(c){ c/=255; return c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4); } function 감(c){ c=c<=.0031308?12.92*c:1.055*Math.pow(c,1/2.4)-.055; return Math.round(Math.max(0,Math.min(1,c))*255); }
  function lch(r,g,b){ r=선(r);g=선(g);b=선(b); var l=Math.cbrt(.4122214708*r+.5363325363*g+.0514459929*b),m=Math.cbrt(.2119034982*r+.6806995451*g+.1073969566*b),s=Math.cbrt(.0883024619*r+.2817188376*g+.6299787005*b);
    var L=.2104542553*l+.793617785*m-.0040720468*s,A=1.9779984951*l-2.428592205*m+.4505937099*s,B=.0259040371*l+.7827717662*m-.808675766*s; var h=Math.atan2(B,A)*180/Math.PI; if(h<0)h+=360; return [L,Math.sqrt(A*A+B*B),h]; }
  function 안에(L,C,h){ var A=C*Math.cos(h*Math.PI/180),B=C*Math.sin(h*Math.PI/180); var l=L+.3963377774*A+.2158037573*B,m=L-.1055613458*A-.0638541728*B,s=L-.0894841775*A-1.291485548*B; l=l*l*l;m=m*m*m;s=s*s*s;
    return [4.0767416621*l-3.3077115913*m+.2309699292*s,-1.2684380046*l+2.6097574011*m-.3413193965*s,-.0041960863*l-.7034186147*m+1.707614701*s]; }
  function 칠(L,C,h){ L=Math.max(0,Math.min(1,L)); for(var i=0;i<24;i++){ var v=안에(L,C,h); if(v.every(function(t){return t>=-.0005&&t<=1.0005;})) return v.map(감); C*=.92; }   /* 화면에 못 그리는 색이면 채도를 조금씩 낮춤 */
    return 안에(L,0,h).map(감); }
  var 목표=null, 바탕lch=null;   /* 목표 = [밝기 차, 채도 비율, 색상] · null = 원래대로 */
  function 바꿈(r,g,b){ var x=hsl(r,g,b); if(!목표||x[1]<.3||x[0]<212||x[0]>262) return null;   /* 고르는 기준(파랑 ~ 인디고)은 HSL 그대로 */
    var o=lch(r,g,b), dL=목표[0]*(1-Math.pow(Math.max(0,(o[0]-.6)/.4),2));   /* 아주 옅은 바탕(밝기 .9 위)은 밝기 차를 거의 안 옮김 — 옅은 칸이 탁해지지 않게 */
    return 칠(o[0]+dL, o[1]*목표[1], 목표[2]); }
  function 칠한값(v){
    return v.replace(/#([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3})\b/gi,function(t,h){ var a=h.length===8?h.substr(6):'', c=풀(h.substr(0,6).length===6&&h.length!==3?h.substr(0,6):h), n=바꿈(c[0],c[1],c[2]);
        return n?'#'+n.map(function(q){return ('0'+q.toString(16)).slice(-2);}).join('')+a:t; })
      .replace(/rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)\s*(?:[,/]\s*([\d.]+%?)\s*)?\)/gi,function(t,r,g,b,a){ var n=바꿈(+r,+g,+b); return n?(a!==undefined?'rgba('+n.join(',')+','+a+')':'rgb('+n.join(',')+')'):t; }); }
  var 원래=new WeakMap();   /* 규칙 → {속성: [값, 우선]} — 색이 든 속성만 */
  function 규칙들(목록,모음){ if(!목록) return; for(var i=0;i<목록.length;i++){ var r=목록[i]; if(r.styleSheet){ try{ 규칙들(r.styleSheet.cssRules,모음); }catch(e){} continue; }
      if(r.cssRules&&!r.style){ try{ 규칙들(r.cssRules,모음); }catch(e){} continue; } if(r.style) 모음.push(r); } }
  function 칠하기(){ var 모음=[]; [].forEach.call(d.styleSheets,function(sh){ if(sh.ownerNode&&sh.ownerNode.classList&&sh.ownerNode.classList.contains('lab-주색제외')) return; try{ 규칙들(sh.cssRules,모음); }catch(e){} });
    모음.forEach(function(r){ var o=원래.get(r);
      if(!o){ o={}; for(var i=0;i<r.style.length;i++){ var p=r.style[i], v=r.style.getPropertyValue(p); if(/#[0-9a-f]{3}|rgba?\(/i.test(v)) o[p]=[v,r.style.getPropertyPriority(p)]; } 원래.set(r,o); }
      for(var p in o){ var nv=목표?칠한값(o[p][0]):o[p][0]; if(r.style.getPropertyValue(p)!==nv) r.style.setProperty(p,nv,o[p][1]); } }); }
  function 정함(hex){ if(!hex||hex.toLowerCase()===기준){ 목표=null; } else { var t=lch.apply(null,풀(hex)), b=lch.apply(null,풀(기준)); 목표=[t[0]-b[0], b[1]?t[1]/b[1]:1, t[2]]; } 칠하기(); 판표시(); }
  function 저장값(){ try{ return localStorage.getItem(열쇠)||''; }catch(e){ return ''; } }
  function 고름(hex){ try{ if(hex&&hex.toLowerCase()!==기준) localStorage.setItem(열쇠,hex); else localStorage.removeItem(열쇠); }catch(e){} 정함(hex); }
  w.addEventListener('storage',function(e){ if(e.key===열쇠) 정함(e.newValue||''); });

  /* 고르기 판 */
  var 판=null;
  function 판만들기(){ 판=d.createElement('div'); 판.className='lab-주색판'; 판.innerHTML='<div class="줄들"></div><div class="직접"><input type="color" title="직접 고르기"><input type="text" spellcheck="false" placeholder="#6c69f0"><button type="button" class="되돌림">되돌리기</button></div>';
    var 줄들=판.querySelector('.줄들'); 칩.forEach(function(g){ var 머=d.createElement('div'); 머.className='머리'; 머.textContent=g[0]; 줄들.appendChild(머); var 칩들=d.createElement('div'); 칩들.className='칩들'; 줄들.appendChild(칩들);
      g[1].forEach(function(c){ var b=d.createElement('button'); b.type='button'; b.className='칩'; b.title=c[0]+' '+c[1]; b.dataset.v=c[1]; b.style.background=c[1]; b.onclick=function(){ 고름(c[1]); 이름표(c[0]); }; 칩들.appendChild(b); }); });
    var 표=d.createElement('div'); 표.className='고른이름'; 줄들.appendChild(표);
    var 색=판.querySelector('input[type=color]'), 글=판.querySelector('input[type=text]');
    색.oninput=function(){ 글.value=색.value; 고름(색.value); 판표시(); };
    글.onchange=function(){ var v=글.value.trim(); if(!/^#?[0-9a-f]{6}$/i.test(v)) return; if(v[0]!=='#') v='#'+v; 색.value=v; 고름(v); };
    판.querySelector('.되돌림').onclick=function(){ 고름(''); 판표시(); };
    판.addEventListener('click',function(e){ e.stopPropagation(); }); d.body.appendChild(판); 판표시(); }
  function 이름표(n){ var e=판&&판.querySelector('.고른이름'); if(e) e.textContent=n||''; }
  function 판표시(){ if(!판) return; var v=(저장값()||기준).toLowerCase(), 찾음=''; 판.querySelectorAll('.칩').forEach(function(b){ var on=b.dataset.v===v; b.classList.toggle('켬',on); if(on) 찾음=b.title.split(' #')[0]; }); 이름표(찾음||'직접 고른 색');
    판.querySelector('input[type=color]').value=v; 판.querySelector('input[type=text]').value=v; }
  function 열기(u){ if(!판) 판만들기(); var r=u.getBoundingClientRect(); 판.style.top=(r.bottom+8)+'px'; 판.style.right=Math.max(8,innerWidth-r.right)+'px'; 판표시(); 판.classList.toggle('열림'); }
  d.addEventListener('click',function(e){ var u=e.target.closest&&e.target.closest('.hd-user'); if(u){ e.preventDefault(); 열기(u); return; } if(판&&!(e.target.closest&&e.target.closest('.lab-주색판'))) 판.classList.remove('열림'); },true);   /* 판 안을 누를 땐 열어 둠 — 여러 색을 견줘 보게 */
  d.addEventListener('keydown',function(e){ if(e.key==='Escape'&&판) 판.classList.remove('열림'); });
  w.addEventListener('blur',function(){ setTimeout(function(){ if(판&&d.activeElement&&d.activeElement.tagName==='IFRAME') 판.classList.remove('열림'); },0); });   /* 안쪽 화면(iframe)을 누르면 바깥엔 클릭이 안 와서 판이 안 닫히던 것 — 초점이 안쪽으로 가면 닫음 */

  if(저장값()) 정함(저장값());
})();
