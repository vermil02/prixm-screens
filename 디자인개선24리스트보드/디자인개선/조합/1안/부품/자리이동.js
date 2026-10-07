/* 목록 바뀔 때 자리 이동 짝 스크립트 — 라이브러리 GSAP 3.15 Flip(/prixm-screens/디자인개선24리스트보드/디자인개선/_라이브러리/gsap-3.15.0) · 07 랩 「자리 5」 그대로
   자동화① 목록(.grid > .wf-card) · 자동화② 템플릿(.gal > .tpl-card) — 정렬 · 필터 · 보기(상세/요약/줄) 바꿀 때만. 처음 들어올 때는 「등장」 부품 몫(html.등장끝 전엔 안 함)
   차례: 클릭 직전(capture) 보이는 그대로 기록 → 정본 render → 다음 그리기 직전(requestAnimationFrame) Flip.from
   랩에서 잡은 것: ① 마이크로태스크로 부르면 정본 render 전에 돌 때가 있음 → rAF ② 다 띄우면(absolute) 높이가 줄 높이 → 내용 높이로 흔들림 → 사라지는 카드만
   ③ GSAP toggleClass 는 끝날 때 표시를 먼저 떼서 덧입힘 전환이 끌어 카드가 두 배 거리로 튐 → 표시 직접 · 위치값 지운 뒤 두 프레임 지나 뗌
   ④ 움직이는 도중 또 바꾸면 getState 가 옛 움직임을 「끝」으로 돌려 끝 처리가 새 움직임 도중 표시를 뗌 → 끝 처리 지우고 kill → 그 자리에서 이어 움직임 */
(function () {
  if (window.__자리이동) return; window.__자리이동 = 1;
  var D = document, 상태 = null, 상태때 = 0, 지금 = null, 대기 = false, 보기바뀜 = false, 길 = "/prixm-screens/디자인개선24리스트보드/디자인개선/_라이브러리/gsap-3.15.0/";
  function 카드들() { return D.querySelectorAll(".grid > .wf-card, .gal > .tpl-card"); }
  function 준비() { return window.gsap && window.Flip && D.documentElement.classList.contains("등장끝") && !matchMedia("(prefers-reduced-motion: reduce)").matches; }
  ["gsap.min.js", "Flip.min.js"].reduce(function (앞, f) {
    return 앞.then(function () { return window[f === "gsap.min.js" ? "gsap" : "Flip"] ? 0 : new Promise(function (된) { var k = D.createElement("script"); k.src = 길 + f; k.onload = k.onerror = 된; D.head.appendChild(k); }); });
  }, Promise.resolve()).then(function () { if (window.gsap && window.Flip) gsap.registerPlugin(Flip); });

  /* 되돌림(2026-10-04 사용자 「정렬 쪽도 같은 방식으로 고쳐줘」 — 도구줄과 같은 방식) — 움직이기 전 카드 인라인 style 을 적어 두고 끝에 그대로 되돌림 + GSAP 기록 비움(clearProps all)
     전엔 transform · opacity · scale 만 지워서 Flip 이 남긴 폭 · 높이 · absolute 가 남거나, 화면01 이 다시 그릴 때 묵은 기록으로 한 번 더 움직였음(실측) */
  function 적기(다) { [].forEach.call(다, function (c) { c.__자리원 = c.classList.contains("자리이동중") && c.__원 != null ? c.__원 : (c.getAttribute("style") || "").replace(/(translate|rotate|scale): none;\s*/g, ""); }); }   /* 도구줄 움직임 도중이면 도구줄이 적어 둔 원래 모습(__원)을 씀 · Flip.getState 가 남기는 translate/rotate/scale: none 은 뺌(메뉴 열기 클릭 뒤 고르기 클릭에서 그대로 적혀 남았음 · 실측) */
  function 되돌림(다) { [].forEach.call(다, function (c) { if (c.__자리원 == null) return; gsap.set(c, { clearProps: "all" }); if (c.__자리원) c.setAttribute("style", c.__자리원); else c.removeAttribute("style"); }); }
  function 움직이기(st) {
    var 빠짐 = st.elementStates.map(function (e) { return e.element; }).filter(function (el) { return el.hidden || !el.offsetParent; });
    var 다 = 카드들(); [].forEach.call(다, function (c) { c.classList.add("자리이동중"); });
    지금 = Flip.from(st, { duration: .35, ease: "power2.out", stagger: .015, absolute: 빠짐.length ? 빠짐 : false, prune: true, simple: true,
      onEnter: function (els) { return gsap.fromTo(els, { opacity: 0, scale: .94 }, { opacity: 1, scale: 1, duration: .25, delay: .08, ease: "power2.out" }); },
      onLeave: function (els) { return gsap.to(els, { opacity: 0, scale: .94, duration: .2, ease: "power1.in" }); },
      onComplete: function () { 지금 = null; 되돌림(다);
        requestAnimationFrame(function () { if (!지금) 되돌림(다); requestAnimationFrame(function () { if (!지금) [].forEach.call(다, function (c) { c.classList.remove("자리이동중"); }); }); }); } });
  }
  /* 기록은 목록을 바꿀 수 있는 곳을 누를 때만 — 기록(getState)이 1안 화면에서 35~39ms 라(실측), 모든 클릭에 돌면 처음 · 매번 멈칫(사용자 「처음 실행할 때 버벅임」)
     도구 줄(구분 · 정렬 · 보기) · 그 메뉴 · 확인 대화(스위치 끄기 등) */
  var 바꾸는곳 = ".tools, .head-zone, .px-menu, .js-view, .cf-wrap";
  D.addEventListener("click", function (e) {
    if (!준비() || !(e.target.closest && e.target.closest(바꾸는곳))) return;
    /* 도구줄 탭 · 검색은 도구줄.js 가 직접 Flip(2026-10-03) — 여기서도 기록해 두면 화면01 이 주기로 다시 그릴 때(hidden 다시 씀) 묵은 기록으로 한 번 더 움직이고 폭 · 높이 · absolute 를 남겼음(실측) */
    if (e.target.closest(".lab-탭들, .lab-하위, .lab-검색")) return;
    var 끊음 = !!지금; if (지금) { 지금.eventCallback("onComplete", null); 지금.kill(); 지금 = null; }
    var 다 = 카드들();
    if (!끊음) 적기(다);   /* 처음 움직임 전 모습만 적음 — 이 부품 움직임 도중(끊음)엔 Flip 이 쓴 값이라 안 적음 */
    var 전 = [].map.call(다, function (c) { return c.getAttribute("style"); });
    상태 = Flip.getState(다, { simple: true }); 상태때 = Date.now();   /* 회전 · 기울임 계산 건너뜀 */
    /* getState 가 카드에 translate · rotate · scale: none 을 써 두고 감 — 목록이 안 바뀌는 클릭(메뉴만 열고 닫기)이면 그대로 남았음(실측) → 재기 전 그대로 */
    if (!끊음) [].forEach.call(다, function (c, i) { if (c.getAttribute("style") !== 전[i]) { if (전[i] == null) c.removeAttribute("style"); else c.setAttribute("style", 전[i]); } });
    if (끊음) { 되돌림(다);
      /* 클릭이 목록을 안 바꿨으면(메뉴 열기 등) 세운 자리 → 원래 자리로 마저 */
      requestAnimationFrame(function () { requestAnimationFrame(function () { if (상태) { var st = 상태; 상태 = null; 움직이기(st); } }); }); }
  }, true);
  /* 기록은 한 번만 · 0.8초 안에만 씀 — 메뉴만 열고 닫은 클릭의 기록이 남아 있다가 화면01 이 주기로 다시 그릴 때 엉뚱하게 움직이던 것 막음 */
  function 바뀜() { 대기 = false; 보기바뀜 = false; if (!상태 || !준비() || Date.now() - 상태때 > 800) { 상태 = null; return; } var st = 상태; 상태 = null; 움직이기(st); }
  new MutationObserver(function (ms) {
    var 됨 = ms.some(function (m) { var t = m.target;
      if (m.type === "childList") return t.matches && t.matches(".grid, .gal");
      if (!t.matches || !t.matches(".wf-card, .tpl-card")) return false;
      if (m.attributeName === "hidden") return true;
      var a = " " + (m.oldValue || "") + " ", b = " " + t.className + " ";
      return ["sc", "rc"].some(function (k) { return (a.indexOf(" " + k + " ") < 0) !== (b.indexOf(" " + k + " ") < 0); }); });
    if (됨 && !대기) { 대기 = true; requestAnimationFrame(바뀜); }
  }).observe(D.querySelector(".content") || D.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden", "class"], attributeOldValue: true });
})();
