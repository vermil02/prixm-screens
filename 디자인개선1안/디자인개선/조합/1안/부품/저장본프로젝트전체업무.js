/* 조합 1안 · 부품/저장본프로젝트전체업무 — 손질/43_프로젝트전체업무/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12
   모든 프로젝트 목록: 펼침 = 전체 업무 · 담당자(얼굴 + 이름) · 역할 · PM → 담당자 · 지연 → 상태 · 「내 업무 N」 칩 숨김(43 랩 안 3) */

(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab43적용) return;
  var 꼴='', 열=false, 다={}, 바쁨=false, 자료=null, 나='';
  /* 녹화 자료 — 프로젝트별 gantt tasks(맨 끝 업무만) · 나 = /api/auth/me */
  function 읽기(){ if(자료) return 자료; var b=w.__복제; if(!b||!b.표) return null; var 표=b.표, o={};
    Object.keys(표).forEach(function(k){ var m=k.match(/^GET \/api\/projects\/([0-9a-f-]{36})\/gantt$/); if(!m) return; var j; try{ j=JSON.parse(표[k][2]); }catch(e){ return; }
      var ts=j.tasks||[], 부모={}; ts.forEach(function(t){ if(t.parentId) 부모[t.parentId]=1; });
      o[m[1]]=ts.filter(function(t){ return !부모[t.id]; }).map(function(t){ return {이:t.name, 퍼:Math.round(Number(t.progress)||0), 시:t.start, 끝:t.end, id:t.id, pid:m[1], 담:(t.assignee||'').trim()}; }); });
    var mk=Object.keys(표).filter(function(k){ return /^GET \/api\/auth\/me/.test(k); })[0]; try{ 나=JSON.parse(표[mk][2]).name||''; }catch(e){}
    자료=o; return o; }
  function 날(s){ var b=String(s).slice(0,10).split('-'); return new Date(+b[0],+b[1]-1,+b[2]); }
  function 짧(s){ var b=String(s).slice(0,10).split('-'); return (+b[1])+'/'+(+b[2]); }
  function 오늘(){ var n=new Date(); return new Date(n.getFullYear(),n.getMonth(),n.getDate()); }
  function 고침(t){ var g=(w.__lab32고침||{})[t.pid+'|'+t.id]; return g?{이:t.이,퍼:g.progress,시:g.start,끝:g.end,id:t.id,pid:t.pid,담:t.담}:t; }   /* 팝업에서 고친 값(32 와 같은 곳) */
  function 상태(t){ var o=오늘(); if(t.퍼>=100) return '완료'; if(날(t.끝)<o) return '지연'; if(날(t.시)<=o) return '진행'; return '대기'; }
  function 내것(t){ return !!나&&t.담.split(',').map(function(x){ return x.trim(); }).indexOf(나)>=0; }
  function 차례(t){ var s={지연:0,진행:1,대기:2,완료:3}[상태(t)]; return s*1e7+(내것(t)?0:1)*1e6+날(t.끝).getTime()/864e5; }
  var 판=[['#ededfd','#5754d6'],['#e7f6ee','#16794a'],['#fdf0e6','#b4541a'],['#e8f0fe','#2f6fe0'],['#f6eafd','#8b3fb8'],['#fdecef','#c0304f']];
  function 색(이){ var n=0; for(var i=0;i<이.length;i++) n=(n*31+이.charCodeAt(i))>>>0; return 판[n%판.length]; }
  function 담당칸(t){ var 이=t.담.split(',')[0].trim(), 없=!이, 나표='';   /* 「나」 표는 뺌 — PM 칸 96 에 「박준형 나」 가 안 들어가 「박…」 으로 잘렸음(실측) */
    if(없){ return 꼴==='얼굴'?'<span class="lab43담당 없음" title="담당 없음"><span class="얼"></span></span>':'<span class="lab43담당 없음">'+(꼴==='얼굴이름'?'<span class="얼"></span>':'')+'<span class="이">담당 없음</span></span>'; }
    var c=색(이), 얼='<span class="얼" style="--b:'+c[0]+';--f:'+c[1]+'">'+이.charAt(0)+'</span>';
    if(꼴==='이름') return '<span class="lab43담당"><span class="이">'+이+'</span>'+나표+'</span>';
    if(꼴==='얼굴이름') return '<span class="lab43담당">'+얼+'<span class="이">'+이+'</span>'+나표+'</span>';
    return '<span class="lab43담당" title="'+이+(내것(t)?' (나)':'')+'">'+얼+'</span>'; }
  function 업무줄(t){ t=고침(t); var s=상태(t), 글={지연:'지연',진행:'진행 중',대기:'대기',완료:'완료'}[s];
    var tr=d.createElement('tr'); tr.className='lab32업무 lab43'; tr.dataset.pid=t.pid; tr.dataset.tid=t.id;
    tr.innerHTML='<td></td><td><span class="업무이름">'+t.이+'</span></td><td></td><td></td><td>'+담당칸(t)+'</td><td class="퍼" style="text-align:right">'+t.퍼+'%</td><td><div class="막대"><span style="width:'+t.퍼+'%"></span></div></td><td><span class="상태 '+s+'">'+글+'</span></td><td colspan="2"><span class="기간'+(s==='지연'?' 지남':'')+'">'+짧(t.시)+' ~ '+짧(t.끝)+'</span></td>';
    return tr; }
  function 프로젝트줄들(){ return [].slice.call(d.querySelectorAll('.pj-content:has(.pj-tools) .pj-table tbody > tr:not(.lab32업무):not(.lab32더):not(.lab32추가)')); }
  function 프id(tr){ var b=tr.querySelector('.pj-name-btn'), 이=b&&b.textContent.trim(), 실=w.__lab32실&&w.__lab32실(); if(!실||!이) return null; var p=실.프.filter(function(x){ return x[0]===이; })[0]; return p&&p[3]; }
  function 뒤줄들(tr){ var o=[], n=tr.nextElementSibling; while(n&&(n.classList.contains('lab32업무')||n.classList.contains('lab32더')||n.classList.contains('lab32추가'))){ o.push(n); n=n.nextElementSibling; } return o; }
  function 그림(){
    if(바쁨) return; var 자=읽기(); if(!자) return;
    바쁨=true;
    try{
      var 걸름=!!d.querySelector('.lab32거름칩'), 맡=!!꼴&&!걸름; if(맡!==h.classList.contains('lab43-맡음')) h.classList.toggle('lab43-맡음',맡);
      프로젝트줄들().forEach(function(tr){
        var 뒤=뒤줄들(tr), 내=뒤.filter(function(x){ return x.classList.contains('lab43'); }), 남=뒤.filter(function(x){ return !x.classList.contains('lab43'); });
        if(!꼴||걸름){ if(내.length){ 내.forEach(function(x){ x.remove(); }); tr.dataset.lab43=''; if(w.__lab32업무그림) w.__lab32업무그림(); } return; }   /* 끄면 · 거른 동안 32 그대로 */
        var 펼=tr.querySelector('.lab32펼.열림'); if(!펼){ 내.forEach(function(x){ x.remove(); }); return; }
        var pid=프id(tr), 목=(자[pid]||[]).slice().sort(function(a,b){ return 차례(a)-차례(b); }), 몇=다[pid]?목.length:Math.min(3,목.length);
        var 서명=꼴+'|'+목.length+'|'+몇+'|'+JSON.stringify(w.__lab32고침||{}).length;
        var 추가=남.filter(function(x){ return x.classList.contains('lab32추가'); })[0];
        if(내.length&&tr.dataset.lab43===서명&&!남.some(function(x){ return !x.classList.contains('lab32추가'); })) return;   /* 그대로 */
        남.forEach(function(x){ if(x!==추가) x.remove(); }); 내.forEach(function(x){ x.remove(); });
        var 앞=tr;
        목.slice(0,몇).forEach(function(t){ var r=업무줄(t); 앞.parentNode.insertBefore(r,앞.nextSibling); 앞=r; });
        if(몇<목.length){ var m=d.createElement('tr'); m.className='lab32더 lab43'; m.innerHTML='<td></td><td colspan="9"><button type="button">'+(목.length-몇)+'개 더 보기</button></td>';
          m.querySelector('button').addEventListener('click',function(){ 다[pid]=true; 그림(); }); 앞.parentNode.insertBefore(m,앞.nextSibling); 앞=m; }
        if(!목.length){ var 표=d.createElement('tr'); 표.className='lab32업무 lab43 lab43빈'; 표.innerHTML='<td></td><td colspan="9"></td>'; 표.style.display='none'; 앞.parentNode.insertBefore(표,앞.nextSibling); 앞=표; }   /* 업무 0 이어도 「그려 둠」 표시 */
        if(추가){ 앞.parentNode.insertBefore(추가,앞.nextSibling); var 빈=추가.querySelector('.빈'); if(빈) 빈.textContent=목.length?'':'아직 업무가 없어요'; if(빈) 빈.style.display=목.length?'none':''; }
        tr.dataset.lab43=서명; });
    } finally { 바쁨=false; }
  }
  /* 담당자열 — PM 머리 글 → 「담당자」 · 프로젝트 줄 PM 칸 = 같은 꼴(앱 글은 그대로 두고 font-size 0 · 앱이 다시 그려도 0.5초마다 맞춤) */
  function 열맞춤(){ var t=d.querySelector('.pj-content:has(.pj-tools) .pj-scroll .pj-table'); if(!t) return; var th=t.querySelector('thead th:nth-child(5)');
    if(th){ var 글=[].filter.call(th.childNodes,function(n){ return n.nodeType===3&&n.textContent.trim(); })[0];
      if(열&&글&&글.textContent.trim()!=='담당자'){ th.dataset.lab43원래=글.textContent; 글.textContent='담당자'; }
      else if(!열&&글&&th.dataset.lab43원래){ 글.textContent=th.dataset.lab43원래; delete th.dataset.lab43원래; } }
    var th8=t.querySelector('thead th:nth-child(8)');
    if(th8){ var 글8=[].filter.call(th8.childNodes,function(n){ return n.nodeType===3&&n.textContent.trim(); })[0];
      if(열&&글8&&글8.textContent.trim()!=='상태'){ th8.dataset.lab43원래=글8.textContent; 글8.textContent='상태'; }
      else if(!열&&글8&&th8.dataset.lab43원래){ 글8.textContent=th8.dataset.lab43원래; delete th8.dataset.lab43원래; } }
    /* 프로젝트 줄 상태 = 앱 지연 수(「4건」 · 없으면 「—」)를 읽어 「지연 4건」 / 「정상」 칩으로 */
    프로젝트줄들().forEach(function(tr){ var td=tr.children[7]; if(!td) return; var 내=td.querySelector(':scope > .lab43상태칩');
      if(!열){ if(내) 내.remove(); td.classList.remove('lab43상'); return; }
      var 원=[].filter.call(td.childNodes,function(n){ return n!==내; }).map(function(n){ return n.textContent; }).join('').trim(), n=parseInt(원,10)||0, 키=n?'지연|'+n:'정상';
      if(!내||내.dataset.k!==키){ if(내) 내.remove(); td.insertAdjacentHTML('beforeend','<span class="lab43상태칩 '+(n?'지연':'정상')+'" data-k="'+키+'">'+(n?'지연 '+n+'건':'정상')+'</span>'); } td.classList.add('lab43상'); });
    프로젝트줄들().forEach(function(tr){ var td=tr.children[4]; if(!td) return; var 내=td.querySelector(':scope > .lab43담당');
      if(!열||!꼴){ if(내) 내.remove(); td.classList.remove('lab43pm'); return; }
      var 원=[].filter.call(td.childNodes,function(n){ return n!==내; }).map(function(n){ return n.textContent; }).join('').trim(), 이=/^[—\-–]?$/.test(원)?'':원;
      var 새=담당칸({담:이}); if(!내||td.dataset.lab43==='' ||td.dataset.lab43!==꼴+'|'+이){ if(내) 내.remove(); td.insertAdjacentHTML('beforeend',새); td.dataset.lab43=꼴+'|'+이; } td.classList.add('lab43pm'); }); }
  w.__lab43적용=function(목록){
    목록=목록||[]; 열=목록.indexOf('담당자열')>=0;
    var 새=목록.filter(function(x){ return x!=='담당자열'; })[0]||'';
    [].slice.call(h.classList).forEach(function(c){ if(c.indexOf('lab43켬-')===0&&목록.indexOf(c.slice(7))<0) h.classList.remove(c); });
    목록.forEach(function(x){ h.classList.add('lab43켬-'+x); });
    꼴=새; 열맞춤(); 프로젝트줄들().forEach(function(tr){ tr.dataset.lab43=''; }); 그림();
  };
  new MutationObserver(function(){ if(!바쁨) 그림(); }).observe(d.documentElement,{childList:true,subtree:true});
  setInterval(function(){ 그림(); 열맞춤(); },500);
})();

/* 늘 켬 — 43 랩이 제 엔진을 얹은 문서(lab43-css)에선 안 켬 */
(function(){ if(document.getElementById('lab43-css')) return; try{ window.__lab43적용(['얼굴이름','담당자열']); }catch(e){} })();
