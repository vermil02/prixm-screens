/* 조합 1안 · 부품/저장본도우미단추줄 — 손질/61_도우미단추줄/1안반영.py 가 만듦(손으로 고치지 말 것) · 2026-10-12
   이메일(d04) · 프로젝트(d06): 61 랩 안 2 — 도우미 대화 중 위 단추 줄 = 새 채팅 · 현재 대화 문서화 · ✦ AI 기능 ▾(드롭다운: [AI] 메일 요약하기 · [AI] 회신 초안 쓰기 · 항목 앞 AI 칩) ·
   저장본도우미대화도구 의 「AI로 메일 요약하기」 · 프로젝트 앱 「AI로 일정 등록하기」 단추는 숨김(그 파일들은 안 고침 · 일정 등록은 드롭다운에서 숨긴 앱 단추를 대신 누름) ·
   프로젝트 드롭다운 = [AI] 일정 등록하기 · 지연 업무 정리하기 · 이번 주 마감 알려주기 · 담당 없는 업무 찾기 · 아이콘 = 피그마 ico-ai-fill(prixm 247:35245). */

(function(){
  var d=document, w=window, h=d.documentElement; if(w.__lab61적용) return;
  var 꼴='', AI그림="<svg viewBox=\"0 0 16 16\" aria-hidden=\"true\"><g id=\"lab56ai\"></g><path d=\"M6.64 6.09133L7.23067 4.02533C7.452 3.252 8.548 3.252 8.76933 4.02533L9.35933 6.09133C9.39669 6.22202 9.46673 6.34104 9.56284 6.43716C9.65896 6.53327 9.77797 6.60331 9.90867 6.64067L11.9747 7.23067C12.748 7.452 12.748 8.548 11.9747 8.76933L9.90867 9.35933C9.77797 9.39669 9.65896 9.46673 9.56284 9.56284C9.46673 9.65896 9.39669 9.77797 9.35933 9.90867L8.76933 11.9747C8.548 12.748 7.452 12.748 7.23067 11.9747L6.64067 9.90867C6.60331 9.77797 6.53327 9.65896 6.43716 9.56284C6.34104 9.46673 6.22203 9.39669 6.09133 9.35933L4.02533 8.76933C3.252 8.548 3.252 7.452 4.02533 7.23067L6.09133 6.64067C6.22203 6.60331 6.34104 6.53327 6.43716 6.43716C6.53327 6.34104 6.60264 6.22202 6.64 6.09133ZM12.0693 11.0047C12.262 10.4427 13.072 10.442 13.264 11.0047L13.2813 11.0627L13.4787 11.8547L14.2707 12.0527C14.9107 12.2127 14.9107 13.1207 14.2707 13.2807L13.4787 13.4787L13.2813 14.2707C13.1213 14.91 12.2127 14.91 12.0527 14.2707L11.8547 13.4787L11.0627 13.2807C10.4227 13.1207 10.4227 12.212 11.0627 12.0527L11.8547 11.8547L12.0527 11.0627L12.0693 11.0047ZM2.736 1.67067C2.93467 1.09 3.79267 1.10933 3.948 1.72867L4.14533 2.52067L4.93733 2.71867C5.57733 2.87867 5.57733 3.78667 4.93733 3.94667L4.14533 4.14467L3.948 4.93667C3.788 5.576 2.87933 5.576 2.71933 4.93667L2.52133 4.14467L1.72933 3.94667C1.08933 3.78667 1.08933 2.878 1.72933 2.71867L2.52133 2.52067L2.71933 1.72867L2.736 1.67067Z\" fill=\"url(#lab61ai)\"/><defs><linearGradient id=\"lab61ai\" x1=\"2.66665\" y1=\"0.333337\" x2=\"12.3333\" y2=\"14.6667\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#6366F1\"/><stop offset=\"1\" stop-color=\"#840AFE\"/></linearGradient></defs></svg>", 아래="<svg class=\"\uaebe\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"m6 9 6 6 6-6\"/></svg>";
  /* AI 일 — 이메일 = 메일 요약 · 회신 초안(이메일 엔진 __lab25묻기) / 프로젝트 = 앱 「AI로 일정 등록하기」(숨긴 앱 단추를 대신 누름) + 프로젝트 도우미(56)가 돌릴 수 있는 일 셋(__lab56묻기) */
  var 일들메일=[['메일 요약하기','이 이메일 요약해줘','메일'],['회신 초안 쓰기','회신 초안 써줘','회신']];
  var 일들프=[['일정 등록하기','','앱'],['지연 업무 정리하기','지연 업무 정리해줘','지연'],['이번 주 마감 알려주기','이번 주 마감 알려줘','이번주'],['담당 없는 업무 찾기','담당 없는 업무 찾아줘','담당']];
  function 줄(){ return d.querySelector('.lab25-대화도구')||d.querySelector('.pj-ai-act'); }
  function 프인가(z){ return !!z&&z.classList.contains('pj-ai-act'); }
  var 일들=일들메일;
  function 지움(z){ [].forEach.call(z.querySelectorAll('.lab61-덧'),function(e){ e.remove(); }); }
  /* 프로젝트 앱 단추(새 대화 · 전체 대화 문서화) 안쪽을 이메일 대화도구와 같은 아이콘 · 이름으로 — 앱이 다시 그려도 다시(관찰자) */
  var 새그림='<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 7v6M9 10h6"/></svg>';
  var 문그림='<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>';
  function 프단추(z){ [].forEach.call(z.querySelectorAll(':scope > button:not(.lab56-AI):not(.lab61-덧)'),function(b){ var 꼴=b.querySelector(':scope > .lab61-꼴'); if(꼴){ if(!b.classList.contains('lab61-꼴단추')) b.classList.add('lab61-꼴단추'); return; }
      var 원=b.textContent.trim(), k=/새\s*(대화|채팅)/.test(원)?'새':(/문서화/.test(원)?'문서':''); if(!k) return;
      var s=d.createElement('span'); s.className='lab61-꼴'; s.innerHTML=(k==='새'?새그림+'새 채팅':문그림+'현재 대화 문서화'); b.setAttribute('data-lab61꼴',k); b.classList.add('lab61-꼴단추'); b.appendChild(s); }); }
  function 그림(){ var z=줄(); if(!z) return; 일들=프인가(z)?일들프:일들메일; if(프인가(z)&&꼴) 프단추(z); if((z.dataset.lab61||'')===꼴&&(꼴===''||z.querySelector('.lab61-덧'))) return; 지움(z); z.dataset.lab61=꼴; if(!꼴) return;
    if(꼴==='앞'){ 일들.slice().reverse().forEach(function(x){ var b=d.createElement('button'); b.type='button'; b.className='lab61-덧 lab61-AI'; b.dataset.물음=x[1]; b.dataset.종류=x[2]; b.innerHTML=AI그림+x[0]; z.insertBefore(b,z.firstChild); }); return; }
    var b=d.createElement('button'); b.type='button'; b.className='lab61-덧 lab61-AI lab61-펼'; b.setAttribute('aria-haspopup','menu'); b.setAttribute('aria-expanded','false'); b.innerHTML=AI그림+'AI 기능'+아래;
    var 판=d.createElement('div'); 판.className='lab61-덧 lab61-판'; 판.setAttribute('role','menu');
    판.innerHTML=일들.map(function(x){ return '<button type="button" role="menuitem" data-물음="'+x[1]+'" data-종류="'+x[2]+'"><span class="lab61-칩">AI</span>'+x[0]+'</button>'; }).join('');   /* 항목 앞 = AI 칩(2026-10-12 사용자 「별 말고 AI 칩」) */
    if(꼴==='드롭앞'){ z.insertBefore(판,z.firstChild); z.insertBefore(b,z.firstChild); } else { z.appendChild(b); z.appendChild(판); } }
  function 판자리(){ var z=줄(), b=z&&z.querySelector('.lab61-펼'), 판=z&&z.querySelector('.lab61-판'); if(!b||!판) return; 판.style.left=b.offsetLeft+'px'; }
  function 닫기(){ var z=줄(); if(!z) return; var 판=z.querySelector('.lab61-판'), b=z.querySelector('.lab61-펼'); if(판) 판.classList.remove('보임'); if(b){ b.classList.remove('열림'); b.setAttribute('aria-expanded','false'); } }
  /* 누름 — 창 잡기 단계(대화도구 부품의 문서 잡기보다 먼저) · 우리 단추만 */
  w.addEventListener('click',function(e){ if(!꼴) return; var t=e.target; if(!t.closest) return;
    var 펼=t.closest('.lab61-펼'); if(펼){ e.stopPropagation(); e.preventDefault(); var 판=펼.parentNode.querySelector('.lab61-판'), 열=!판.classList.contains('보임'); 판자리(); 판.classList.toggle('보임',열); 펼.classList.toggle('열림',열); 펼.setAttribute('aria-expanded',열?'true':'false'); return; }
    var 일=t.closest('.lab61-AI[data-물음], .lab61-판 button[data-물음]'); if(일){ e.stopPropagation(); e.preventDefault(); 닫기(); if(h.classList.contains('lab25켬-쓰는')) return;
      var z=일.closest('.lab25-대화도구, .pj-ai-act');
      if(일.dataset.종류==='앱'){ /* 앱 「AI로 일정 등록하기」 가 하던 일(앱 aiScheduleTemplate) — 1안은 앱 입력칸을 숨기고 도우미 입력칸(.lab25-입력)을 쓰므로 보이는 칸에 넣음
          (처음 판은 숨긴 앱 단추를 대신 눌러 숨은 칸에만 들어가 아무 일도 안 보였음 · 실측) */
        var 칸=[].filter.call(d.querySelectorAll('.lab25-입력 textarea'),function(t){ return t.offsetWidth>0; })[0]; if(!칸) return;
        칸.value='다음 일정을 프로젝트 간트에 등록해줘: '; 칸.dispatchEvent(new Event('input',{bubbles:true})); 칸.focus(); 칸.setSelectionRange(칸.value.length,칸.value.length); return; }
      var 묻=프인가(z)?w.__lab56묻기:w.__lab25묻기; if(묻) 묻(일.dataset.물음,일.dataset.종류); return; }
    if(!t.closest('.lab61-판')) 닫기(); },true);
  d.addEventListener('keydown',function(e){ if(e.key==='Escape') 닫기(); },true);
  new MutationObserver(function(){ if(꼴) 그림(); }).observe(h,{childList:true,subtree:true});
  w.__lab61적용=function(목록){ var 새=(목록||[]).filter(function(x){ return x==='드롭'||x==='앞'||x==='드롭앞'; })[0]||''; 꼴=새;
    ['드롭','앞','드롭앞'].forEach(function(i){ var c='lab61켬-'+i, 있=h.classList.contains(c), 켜=새===i; if(켜&&!있) h.classList.add(c); else if(!켜&&있) h.classList.remove(c); });   /* 있을 때만 지움 */
    var z=줄(); if(z){ z.dataset.lab61='\u0000'; } 그림(); };
})();

/* 1안 · 고정 — 저장본도우미단추줄(손질/61_도우미단추줄/1안반영.py) · 이메일 · 프로젝트 문서에서 켬 */
(function(){ var d=document, w=window, n=0; if(!w.__lab61적용) return;
  (function 켜기(){ if(d.querySelector('.lab25-읽기, .pj-main')){ w.__lab61적용(["드롭"]); return; } if(n++<40) setTimeout(켜기,250); })();
})();
