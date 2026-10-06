/* 조합 1안 · 부품/템플릿카드 — 손 부품(랩 없음) · 2026-10-07 · 짝 CSS 설명 참고
   템플릿 카드마다 맨 위에 칩 줄: [자동] / [수동](정본 TPL[키].trigger 가 「수동」 이면 수동) + 분류 태그(data-tags). 갤러리를 다시 그리면 다시 붙임 */
(function () {
  if (!/화면02_자동화생성/.test(decodeURIComponent(location.pathname)) || window.__1안템플릿카드) return; window.__1안템플릿카드 = 1;
  var d = document;
  /* 수동 샘플 템플릿 — 사용자 「수동도 샘플로 넣어 줘」(2026-10-07) · 정본 템플릿 셋이 다 자동이라 수동 칩이 안 보였음
     정본은 안 고치고 이 부품이 TPL 에 한 벌(회의록 정리 · trigger 수동) 더하고 갤러리에 카드 한 장 끼움 — 누르면 정본 설정 화면이 그 값으로 열림 */
  try {
    if (typeof TPL !== "undefined" && !TPL.minutes) TPL.minutes = { name: "회의록 정리", cat: "지식/문서 · 수동", catKey: "지식/문서", tags: ["지식/문서", "보고"],
      desc: "올린 회의 녹취를 받아써서 회의록 초안을 만들고 채널에 공유합니다.", flow: ["녹취 업로드", "받아쓰기", "회의록 작성", "채널 공유"], trigger: "수동",
      needs: [["회의록을 둘 문서 폴더", "ico-folder.svg"], ["AI 직원", "ico-teamAI.svg"], ["결과를 공유할 채널", "ico-channel.svg"]] };
    var 갤 = d.querySelector("#v-pick .gal"), 본 = 갤 && 갤.querySelector(".tpl-card[data-tpl]");
    if (본 && !갤.querySelector('.tpl-card[data-tpl="minutes"]')) {
      var t = TPL.minutes, c = 본.cloneNode(true); c.dataset.tpl = "minutes"; c.dataset.tags = t.tags.join(",");
      var q = function (s) { return c.querySelector(s); };
      if (q(".tpl-tags")) q(".tpl-tags").innerHTML = t.tags.map(function (x) { return '<span class="tpl-badge">' + x + "</span>"; }).join("");
      if (q(".tpl-name")) q(".tpl-name").textContent = t.name;
      if (q(".tpl-desc")) q(".tpl-desc").textContent = t.desc;
      if (q(".td-flow")) q(".td-flow").innerHTML = t.flow.map(function (x) { return '<span class="fstep">' + x + "</span>"; }).join('<span class="farw">›</span>');
      if (q(".td-prep")) q(".td-prep").innerHTML = t.needs.map(function (x) { return '<span class="pchip">' + x[0] + "</span>"; }).join("");
      var 줄 = c.querySelector(":scope > .lab-tk줄"); if (줄) 줄.remove();
      갤.appendChild(c);
    }
  } catch (e) {}
  function 방식(c) { var k = c.dataset.tpl, t = null; try { t = (typeof TPL !== "undefined" && TPL[k]) ? TPL[k].trigger : null; } catch (e) {} return t === "수동" ? "수동" : "자동"; }
  function 붙임() {
    [].forEach.call(d.querySelectorAll("#v-pick .gal > .tpl-card"), function (c) {
      var 표 = 방식(c) + "|" + (c.dataset.tags || ""); var 줄 = c.querySelector(":scope > .lab-tk줄");
      if (줄 && 줄.__표 === 표) return; if (줄) 줄.remove();
      줄 = d.createElement("span"); 줄.className = "lab-tk줄"; 줄.__표 = 표;
      var m = d.createElement("span"); m.className = "lab-tk방식"; m.textContent = 방식(c); m.dataset.k = 방식(c); 줄.appendChild(m);
      (c.dataset.tags || "").split(",").filter(Boolean).forEach(function (t) { var x = d.createElement("span"); x.className = "lab-tk태그"; x.textContent = t; 줄.appendChild(x); });
      c.insertBefore(줄, c.firstChild);
    });
    /* 위 분류 탭 개수 — 샘플 카드를 더해도 맞게(템플릿 부품이 처음 센 값을 다시 셈) */
    var 카 = [].slice.call(d.querySelectorAll("#v-pick .gal > .tpl-card"));
    [].forEach.call(d.querySelectorAll(".head-zone .lab-탭"), function (b) {
      var 수 = b.querySelector("b"); if (!수) return; var 이름 = b.textContent.replace(수.textContent, "").trim(); if (!이름) return;
      var n = 카.filter(function (c) { return (c.dataset.tags || "").split(",").indexOf(이름) >= 0; }).length;
      if (n && String(n) !== 수.textContent) 수.textContent = n;
    });
  }
  붙임();
  var v = d.querySelector("#v-pick") || d.body, 봄 = new MutationObserver(function () { 봄.disconnect(); try { 붙임(); } catch (e) {} 봄.observe(v, { childList: true, subtree: true }); });
  봄.observe(v, { childList: true, subtree: true });
})();
