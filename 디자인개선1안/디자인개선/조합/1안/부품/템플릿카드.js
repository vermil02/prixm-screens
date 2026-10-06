/* 조합 1안 · 부품/템플릿카드 — 손 부품(랩 없음) · 2026-10-07 · 짝 CSS 설명 참고
   템플릿 카드마다 맨 위에 칩 줄: [자동] / [수동](정본 TPL[키].trigger 가 「수동」 이면 수동) + 분류 태그(data-tags). 갤러리를 다시 그리면 다시 붙임 */
(function () {
  if (!/화면02_자동화생성/.test(decodeURIComponent(location.pathname)) || window.__1안템플릿카드) return; window.__1안템플릿카드 = 1;
  var d = document;
  function 방식(c) { var k = c.dataset.tpl, t = null; try { t = (typeof TPL !== "undefined" && TPL[k]) ? TPL[k].trigger : null; } catch (e) {} return t === "수동" ? "수동" : "자동"; }
  function 붙임() {
    [].forEach.call(d.querySelectorAll("#v-pick .gal > .tpl-card"), function (c) {
      var 표 = 방식(c) + "|" + (c.dataset.tags || ""); var 줄 = c.querySelector(":scope > .lab-tk줄");
      if (줄 && 줄.__표 === 표) return; if (줄) 줄.remove();
      줄 = d.createElement("span"); 줄.className = "lab-tk줄"; 줄.__표 = 표;
      var m = d.createElement("span"); m.className = "lab-tk방식"; m.textContent = 방식(c); 줄.appendChild(m);
      (c.dataset.tags || "").split(",").filter(Boolean).forEach(function (t) { var x = d.createElement("span"); x.className = "lab-tk태그"; x.textContent = t; 줄.appendChild(x); });
      c.insertBefore(줄, c.firstChild);
    });
  }
  붙임();
  var v = d.querySelector("#v-pick") || d.body, 봄 = new MutationObserver(function () { 봄.disconnect(); try { 붙임(); } catch (e) {} 봄.observe(v, { childList: true, subtree: true }); });
  봄.observe(v, { childList: true, subtree: true });
})();
