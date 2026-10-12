/* 조합 1안 · 부품/저장본요약칩나눔 — 손질/46_요약칩나눔/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12
   프로젝트(d06)에만: 46 랩 안 2 — 요약 「지연 업무」 · 「이번 주 마감」 칩을 내 업무 · 다른 사람 · 담당 없음으로(프로젝트별 간트 녹화로 셈 · 1안 「다른 사람」 = 뺄셈이라 담당 없음이 섞였음) ·
   이번 주 마감 큰 수 = 모두. 간트 녹화 없는 사진본에선 안 바꿈. */

(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab46적용) return;
  var 켠=false, 셈=null;
  /* 간트 녹화로 셈 — 1안 저장본프로젝트 와 같은 규칙(진행 100 = 완료 · 끝 < 오늘 = 지연 · 이번 주 = 오늘 ~ 일요일 · 지연 아님) · 오늘 = 진짜 오늘(로컬 복제) */
  function 세기(){ var b=w.__복제; if(!b||!b.표) return null; var 표=b.표;
    var dk=Object.keys(표).filter(function(x){ return /^GET \/api\/projects\/dashboard/.test(x); })[0]; if(!dk) return null;
    var D; try{ D=JSON.parse(표[dk][2]); }catch(e){ return null; }
    var n=new Date(), 오늘=new Date(n.getFullYear(),n.getMonth(),n.getDate()), 주끝=new Date(오늘.getFullYear(),오늘.getMonth(),오늘.getDate()+((7-오늘.getDay())%7));
    function 날(s){ var a=String(s).split('-'); return new Date(+a[0],+a[1]-1,+a[2]); }
    var c={지연:{내:0,다른:0,없음:0},주:{내:0,다른:0,없음:0}}, 있음=false;
    (D.projects||[]).filter(function(p){ return p.status!=='archived'; }).forEach(function(p){
      var gk='GET /api/projects/'+p.id+'/gantt'; if(!표[gk]) return; var G; try{ G=JSON.parse(표[gk][2]); }catch(e){ return; } 있음=true;
      var 내것=(D.my_tasks||[]).filter(function(t){ return t.project_id===p.id; }).map(function(t){ return t.task_key; });
      (G.tasks||[]).forEach(function(t){ var 진=t.progress||0; if(진>=100) return; var 끝=날(t.end), 지=끝<오늘, 주=!지&&끝>=오늘&&끝<=주끝;
        var 누=내것.indexOf(t.id)>=0?'내':(t.assignee_id?'다른':'없음'); if(지) c.지연[누]++; if(주) c.주[누]++; }); });
    return 있음?c:null; }
  function 칩(c,글,수,덧){ return '<span class="요칩'+(덧?' '+덧:'')+'" style="--c:'+c+'"><i></i>'+글+'<span class="수">'+수+'</span></span>'; }
  function 고침(){ if(!켠) return; var s=d.querySelector('.lab32요약'); if(!s) return; if(!셈) 셈=세기(); if(!셈) return;
    [['지연','239,68,68'],['이번주','59,130,246']].forEach(function(x){ var k=x[0], 칸=s.querySelector('.칸[data-k="'+k+'"]'); if(!칸) return;
      var v=k==='지연'?셈.지연:셈.주, 아=칸.querySelector('.아래글'), 큰=칸.querySelector('.속 > b');
      if(아&&!('lab46원' in 칸.dataset)){ 칸.dataset.lab46원=아.innerHTML; 칸.dataset.lab46큰=큰&&큰.firstChild?큰.firstChild.textContent:''; }   /* 끌 때 되돌릴 1안 원래 값 */
      var 새=칩(x[1],'내 업무',v.내)+칩('138,139,154','다른 사람',v.다른)+칩('170,172,190','담당 없음',v.없음,'lab46-없음');
      if(아&&아.innerHTML!==새) 아.innerHTML=새;
      if(k==='이번주'&&큰){ var 합=v.내+v.다른+v.없음, 첫=큰.firstChild; if(첫&&첫.nodeType===3&&첫.textContent!==String(합)) 첫.textContent=String(합); } }); }
  /* 1안이 요약을 다시 그리면(거름 · 간트 고침) 바로 다시 고침 — 내 고침도 변화라 같은 값이면 안 씀(맴돌지 않게) */
  new MutationObserver(function(){ 고침(); }).observe(d.documentElement,{childList:true,subtree:true});
  w.__lab46적용=function(목록){ var 새=(목록||[]).indexOf('나눔')>=0; 켠=새;
    var 있=h.classList.contains('lab46켬-나눔'); if(새&&!있) h.classList.add('lab46켬-나눔'); else if(!새&&있) h.classList.remove('lab46켬-나눔');
    if(!새) [].forEach.call(d.querySelectorAll('.lab32요약 .칸[data-lab46원]'),function(칸){ var 아=칸.querySelector('.아래글'), 큰=칸.querySelector('.속 > b');
      if(아) 아.innerHTML=칸.dataset.lab46원; if(큰&&큰.firstChild&&칸.dataset.lab46큰) 큰.firstChild.textContent=칸.dataset.lab46큰; delete 칸.dataset.lab46원; delete 칸.dataset.lab46큰; });
    고침(); };
})();

/* 1안 · 고정 — 저장본요약칩나눔(손질/46_요약칩나눔/1안반영.py) · 프로젝트 문서에서만 켬 */
(function(){ var d=document, w=window, n=0; if(!w.__lab46적용) return;
  (function 켜기(){ if(d.querySelector('.pj-main')){ w.__lab46적용(["나눔"]); return; } if(n++<40) setTimeout(켜기,200); })();
})();
