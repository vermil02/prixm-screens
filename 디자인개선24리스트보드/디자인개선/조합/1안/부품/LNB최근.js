/* 조합 1안 · 부품/LNB최근 — 손 부품(랩 없음) · 2026-10-07
   사용자 「LNB 에서는 그냥 최근 자동화라고 하고 · 데이터 분석에서도 최근 분석 내역 말고 최근 분석이라고만」
   - 자동화 LNB: 「자동 실행」 · 「수동 실행」 두 묶음 → 한 묶음 「최근 자동화」(줄 그림 = 자동 시계 / 수동 노드 · 상태 점 그대로 · 최근 실행순 · 실행 기록 없는 임시 저장은 끝)
   - 분석 LNB: 묶음 머리 「최근 분석 내역」 → 「최근 분석」
   우리 화면(자동화 ① ② ③ · 분석)에만 · 정본 LNB 마크업은 그대로 두고 보이는 것만 옮김 · 둘째 묶음은 숨김(지우지 않음) */
(function () {
  if (window.__1안LNB최근) return; window.__1안LNB최근 = 1;
  var d = document;
  /* 최근 실행순 — 화면01 카드(data-run)에서 읽고, 카드가 없는 화면은 정본 데모 값 */
  var 기본순 = ["정기 지식 보고", "회의록 정리", "민원 답변 작성", "계약서 검토 요청", "월간 안전점검 보고", "데일리 뉴스 검색", "월요일 업무 안내", "분기별 매출 정리", "주간 보고 초안 생성"];
  function 순서() {
    var 카 = [].slice.call(d.querySelectorAll(".grid > .wf-card[data-t]"));
    if (!카.length) return 기본순;
    return 카.map(function (c) { return [c.dataset.t, c.dataset.run || ""]; }).sort(function (a, b) { return a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0; }).map(function (x) { return x[0]; });
  }
  function 머리글(g) { var t = g && g.querySelector(":scope > .label-toggle .lt-inner"); if (!t) return null; return [].filter.call(t.childNodes, function (n) { return n.nodeType === 1 ? !n.children.length && n.textContent.trim() : n.nodeType === 3 && n.nodeValue.trim(); })[0] || null; }
  function 손질() {
    /* 자동화 — 두 묶음 합치기 */
    var 묶 = [].slice.call(d.querySelectorAll(".lnb-group.lnb-kind"));
    if (묶.length > 1) {
      var 첫 = 묶[0], 목 = 첫.querySelector(":scope > .lnb-list"), 글 = 머리글(첫);
      if (목) {
        if (글 && 글.textContent.trim() !== "최근 자동화") 글.textContent = "최근 자동화";
        묶.slice(1).forEach(function (g) { var l = g.querySelector(":scope > .lnb-list"); if (l) [].slice.call(l.children).forEach(function (x) { if (/수동/.test(머리글(g) ? 머리글(g).textContent : "")) x.classList.add("lab-수동줄"); 목.appendChild(x); }); if (g.style.display !== "none") g.style.display = "none"; });
        var 표 = 순서(), 줄 = [].slice.call(목.children);
        var 자리 = function (x) { var n = (x.querySelector(".ch-label") || x).textContent.trim(), i = 표.indexOf(n); return i < 0 ? 999 : i; };
        var 정렬 = 줄.slice().sort(function (a, b) { return 자리(a) - 자리(b); });
        if (정렬.some(function (x, i) { return x !== 줄[i]; })) 정렬.forEach(function (x) { 목.appendChild(x); });
      }
    }
    /* 분석 — 머리 이름만 */
    [].forEach.call(d.querySelectorAll(".lnb-group > .label-toggle .lt-inner"), function (t) {
      [].forEach.call(t.childNodes, function (n) { var x = n.nodeType === 3 ? n : (n.nodeType === 1 && !n.children.length ? n : null); if (x && x.textContent.trim() === "최근 분석 내역") x.textContent = "최근 분석"; });
    });
  }
  손질();
  var 몸 = d.querySelector(".lnb-panel, aside") || d.body, 봄 = new MutationObserver(function () { 봄.disconnect(); try { 손질(); } catch (e) {} 봄.observe(몸, { childList: true, subtree: true, characterData: true }); });
  봄.observe(몸, { childList: true, subtree: true, characterData: true });
})();
