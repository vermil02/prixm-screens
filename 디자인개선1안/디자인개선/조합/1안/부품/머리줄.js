/* 조합 1안 · 부품/머리줄.js — 머리줄.css 짝 (2026-10-06). 화면마다 「제목 줄」 · 「도구 줄」 요소를 찾아 [data-머리줄] 표시만 붙인다(값은 머리줄.css).
   html[data-머리] = 2(도구 줄이 보임) · 1(제목 줄만). 기준 화면(자동화 목록 · 템플릿 선택)은 표시하지 않음 — 제 부품(도구줄 · 템플릿) 그대로.
   새 화면 꼴이 생기면 아래 「자리」 에 한 줄 더한다. 화면 안에서 도구 줄이 숨었다 나타나면(템플릿 고른 뒤 등) 다시 봄. */
(function () {
  if (window.__머리붙음) return; window.__머리붙음 = true;
  var D = document, H = D.documentElement;
  /* [제목 줄, 도구 줄, 제목 글자, 받침(겹친 제목 줄 아래 여백을 가진 칸)] — 앞에서부터 처음 맞는 것 */
  var 자리 = [
    [".body > .main > .page-hd", ".body > .main > .head-zone", ".page-hd .crumb .cur"],                                  /* 우리 화면(자동화 · 분석) */
    ["header.conversation-head", null, ".conversation-head .lab18-제목"],                                                  /* AI 채팅 */
    ["main div[class*='absolute'][class*='top-0'][class*='h-[41px]']", null, "h1", "받침"],                              /* 협업 채널 */
    [".knowledge-page div[class*='h-[41px]'][class*='border-b']", ".knowledge-page .selection-toolbar-row", ".lab18-제목"], /* 지식/문서 */
    ["header[class*='h-[40px]']:has(.lab18-제목)", "div[class*='h-[45px]'][class*='gap-[40px]']", ".lab18-제목"],         /* 이메일 */
    ["nav.ax-crumb", ".pj-tools", ".lab18-제목"],                                                                          /* 프로젝트 */
    [".prism-page-header", null, ".prism-page-title"]                                                                      /* 설정(대시보드 등) */
  ];
  var 보임 = function (e) { return !!e && e.getClientRects().length > 0 && getComputedStyle(e).display !== "none"; };
  var 지움 = function () { [].forEach.call(D.querySelectorAll("[data-머리줄],[data-머리]"), function (e) { if (e !== H) { e.removeAttribute("data-머리줄"); e.removeAttribute("data-머리"); } }); H.removeAttribute("data-머리"); };
  function 붙이기() {
    if (H.classList.contains("lab-도구줄") || H.classList.contains("lab-목록머리")) { if (H.hasAttribute("data-머리")) 지움(); return; }
    for (var i = 0; i < 자리.length; i++) {
      var z = 자리[i], 제목 = D.querySelector(z[0]);
      if (!보임(제목)) continue;
      var 도구 = z[1] && D.querySelector(z[1]); if (!보임(도구)) 도구 = null;
      var 판 = 도구 ? "2" : "1";
      if (H.getAttribute("data-머리") === 판 && 제목.getAttribute("data-머리줄") === "제목" && (!도구 || 도구.getAttribute("data-머리줄") === "도구")) return;
      지움();
      제목.setAttribute("data-머리줄", "제목");
      var 글 = 제목.querySelector(z[2]); if (글) 글.setAttribute("data-머리", "제목글");
      if (도구) { 도구.setAttribute("data-머리줄", "도구"); if (!도구.querySelector("button,input")) 도구.setAttribute("data-머리", "글"); }
      if (z[3] === "받침" && 제목.parentElement) 제목.parentElement.setAttribute("data-머리", "받침");
      H.setAttribute("data-머리", 판);
      return;
    }
  }
  var 예약 = 0;
  var 다시 = function () { if (예약) return; 예약 = requestAnimationFrame(function () { 예약 = 0; 붙이기(); }); };
  붙이기();
  new MutationObserver(다시).observe(D.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ["class", "style", "hidden"] });
})();
