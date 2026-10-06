/* 조합 1안 · 부품/저장본스크롤 — 짝 저장본스크롤.css · 2026-10-06 사용자 「작업할 때 스크롤에 대한 거 작업했었는데 그거 반영되게끔」
   저장본 LNB 스크롤 칸(aside 안 overflow-y-auto · 제목 줄 다음)을 [고정 + 목록 칸] 으로 나눔 — 우리 LNB.js 의 「목록 칸」 과 같은 일.
   고정 = 맨 앞부터 이어지는 핵심 버튼(lab18-핵심묶음) · 세그(lab18-세그묶음) · 안 보이는 것. 나머지는 목록 칸으로.
   저장본부품.js 가 핵심 버튼을 만든 뒤에 돌아야 함(손질후 저장본JS 에서 그 뒤). 나누기 전후 첫 목록 줄 자리를 재서 틈을 그대로 맞춤(가만히 있을 때 픽셀 같게) */
(function(){
  var 칸=[].slice.call(document.querySelectorAll('aside[class*="gnb-panel-bg"] [class*="overflow-y-auto"]'))[0];
  if(!칸||칸.classList.contains('lab-스크롤칸')||!칸.children.length)return;
  var 보임=function(e){return getComputedStyle(e).display!=='none';};
  var 아이=[].slice.call(칸.children),고정들=[],i=0;
  for(;i<아이.length;i++){var e=아이[i];if(e.classList.contains('lab18-핵심묶음')||e.classList.contains('lab18-세그묶음')||!보임(e))고정들.push(e);else break;}
  var 첫=아이[i];if(!첫)return;
  var 전=첫.getBoundingClientRect().top-칸.getBoundingClientRect().top;
  var 고정=document.createElement('div');고정.className='lab-고정';
  var 목록=document.createElement('div');목록.className='lab-목록';
  고정들.forEach(function(e){고정.appendChild(e);});
  아이.slice(i).forEach(function(e){목록.appendChild(e);});
  칸.appendChild(고정);칸.appendChild(목록);칸.classList.add('lab-스크롤칸');
  /* 핵심 버튼 아래 틈(원래 21) = 고정 아래 10 + 목록 위 나머지 — 고정 끝 보이는 것의 아래 여백 · 첫 줄 위 여백을 0 으로 두고 원래 틈을 다시 나눠 줌(틈이 10 보다 작으면 다 고정 쪽) */
  var 끝=고정들.filter(보임).pop();if(끝)끝.style.setProperty('margin-bottom','0','important');
  첫.style.setProperty('margin-top','0','important');
  var 틈=Math.max(0,Math.round(전-(첫.getBoundingClientRect().top-칸.getBoundingClientRect().top)));
  var 아래=끝?Math.min(10,틈):0;
  고정.style.paddingBottom=아래+'px';
  목록.style.paddingTop=(틈-아래)+'px';
})();

