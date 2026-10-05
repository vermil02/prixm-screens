/* 카드 등장 짝 스크립트 — 보이는 카드 목록(.grid · .gal)마다 대각선 순서(줄 + 칸, 최대 9)를 재서 --등장순 · 부를 때마다 처음부터 · 1.5초 뒤 html.등장끝
   손질후는 화면이 보이는 순간 window.__1안등장() 을 부름(뒤에서 미리 불러 둔 화면도 그때 돎)
   자동화② 는 템플릿 목록(#v-pick)이 화면 안에서 나타날 때도 다시 돎 — 「새 화면에 들어온 것」 이라서(필터 · 정렬 · 보기 바꿈은 아님) */
(function () {
  var D = document;
  window.__1안등장 = function () {
    var 있음 = false;
    [].forEach.call(D.querySelectorAll(".grid, .gal"), function (목록) {
      var c = [].filter.call(목록.children, function (e) { return e.matches(".wf-card, .tpl-card") && !e.hidden && e.offsetParent; }); if (!c.length) return;
      var xs = [], ys = [];
      c.forEach(function (e) { if (xs.indexOf(e.offsetLeft) < 0) xs.push(e.offsetLeft); if (ys.indexOf(e.offsetTop) < 0) ys.push(e.offsetTop); });
      xs.sort(function (a, b) { return a - b; }); ys.sort(function (a, b) { return a - b; });
      c.forEach(function (e) { e.style.setProperty("--등장순", Math.min(9, xs.indexOf(e.offsetLeft) + ys.indexOf(e.offsetTop))); });
      있음 = true;
    });
    if (!있음) return;
    D.documentElement.classList.remove("등장끝");
    var 다 = D.querySelectorAll(".grid > .wf-card, .gal > .tpl-card");
    [].forEach.call(다, function (e) { e.style.animation = "none"; }); void D.body.offsetWidth; [].forEach.call(다, function (e) { e.style.animation = ""; });
    clearTimeout(window.__등장타이머); window.__등장타이머 = setTimeout(function () { D.documentElement.classList.add("등장끝"); }, 1500);
  };
  var 고르기 = D.getElementById("v-pick");
  if (고르기 && !고르기.dataset.등장) { 고르기.dataset.등장 = 1;
    new MutationObserver(function () { if (!고르기.hidden) window.__1안등장(); }).observe(고르기, { attributes: true, attributeFilter: ["hidden"] }); }
  window.__1안등장();
})();
