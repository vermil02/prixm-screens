/* 전환 짝 스크립트 — 손질/17_등장전환/1안반영.py 가 랩 전환.js 에서 만듦(손으로 고치지 말 것) · 값은 전환.css 의 --전환-* 변수
   부르개: __전환숨김() 보이기 직전 · __전환등장({GNB바뀜}) 보인 뒤(1안 · 2안 손질후 보기() · 넘김잡기()) · 끝나면 html.등장끝(자리이동 · 도구줄 부품이 그 뒤 움직임) */
/* 17 등장 · 전환 랩 — 화면(iframe) 안에서 도는 엔진. 라이브러리 GSAP 3.15(/prixm-screens/디자인개선24리스트보드/디자인개선/_라이브러리/gsap-3.15.0 · 본체만)
   2026-10-04 사용자 「각 페이지 전체 등장 효과 레이아웃 · LNB · GNB 메뉴를 눌러 다른 페이지로 들어갈 때의 촤르륵 전환」
   값은 모두 CSS 변수로 받음 — 안(등장_안.json · 전환_안.json)이 :root 에 기본값, 덧붙임 라디오가 뒤에서 덮음(같은 자리 = 뒤가 이김)
     --꼴      등장 꼴: 지금 | 한번 | 차례 | 카드 | 블록 | 패널옆
     --시간    한 덩이 시간(초) · --시차 덩이 사이(초) · --거리 px · --방향 아래|위|왼쪽|오른쪽|없음|순서 · --이징 GSAP ease 이름
     --블러    px · --크기 시작 배율(1 = 없음)
     --나감    빠지기: 없음 | 페이드 | 위로 | 차례 · --나감시간(초)
     --LNB줄   1 이면 GNB 가 바뀔 때(자동화 ↔ 분석) LNB 줄도 차르르 · --느리게 배수(보기용) · --줄임흉내 1 = 움직임 줄이기 설정처럼
   부르개(전체보기.html 이 부름):  __전환숨김()  보이기 직전 들어올 것들을 숨김 · __전환등장(정보)  들어오기 · __전환나감(정보) → Promise  빠지기
   이 랩만의 것 — 1안 「덩이 떠오름」(덧입힘 .content > *) · 부품 「등장」(카드 대각선)을 대신하는 자리. 부품 「자리이동」 · 「도구줄」 은 그대로: 들어오기가 끝나면 html.등장끝 을 붙여 넘겨줌 */
(function () {
  /* 이미 돎 표시는 문서에 — 손질후가 뒤에서 부르는 판이 아직 빈 문서(about:blank)일 때도 부품을 얹어, window 에 두면 진짜 문서가 들어온 뒤 같은 창이라 다시 안 돌고 빈 문서에 묶여 가림이 안 풀렸음(실측 1안 분석①) */
  if (document.__전환부품) return; document.__전환부품 = 1;
  var D = document, R = D.documentElement, 길 = "/prixm-screens/디자인개선24리스트보드/디자인개선/_라이브러리/gsap-3.15.0/gsap.min.js";

  function 값(n, 기본) { var v = getComputedStyle(R).getPropertyValue("--전환-" + n).trim().replace(/^["']|["']$/g, ""); return v === "" ? 기본 : v; }
  function 수(n, 기본) { var v = parseFloat(값(n, "")); return isNaN(v) ? 기본 : v; }
  function 설정() {
    var 줄임 = matchMedia("(prefers-reduced-motion: reduce)").matches || 값("줄임흉내", "0") === "1";
    return { 꼴: 값("꼴", "지금"), 시간: 수("시간", .32), 시차: 수("시차", .04), 거리: 수("거리", 8), 방향: 값("방향", "아래"), 이징: 값("이징", "power2.out"),
      블러: 수("블러", 0), 크기: 수("크기", 1), 나감: 값("나감", "없음"), 나감시간: 수("나감시간", .12), LNB줄: 값("LNB줄", "0") === "1", 느리게: 수("느리게", 1), 줄임: 줄임,
      상한: 수("상한", 0), 시작투명: 수("시작투명", 0),
      /* LNB 줄 따로(2026-10-04 사용자 「lnb 촤르륵도 조정하고 싶어서」) — 안 주면 예전처럼 본문 값을 빌려 씀(시간 = 본문 · 간격 ≤ 30ms · 왼쪽 = 본문 거리, 최소 6) */
      LNB시간: 수("LNB시간", 0), LNB시차: 수("LNB시차", -1), LNB거리: 수("LNB거리", -1), LNB방향: 값("LNB방향", "왼쪽"), LNB시작: 수("LNB시작투명", 0), LNB이징: 값("LNB이징", ""),
      선: 값("선", "그음") };   /* 본문 머리 구분선(.head-zone 아래 테두리) — 그음(왼쪽 → 오른쪽) · 페이드(머리와 같이) · 그대로 — 2026-10-05 사용자 「콘텐츠 영역 가로선은 전환이 안 걸린다」 */   /* 상한 = 마지막 덩이가 출발하는 때(초 · 0 = 없음) · 시작투명 = 들어올 때 처음 투명도(0 ~ 1) — 2026-10-04 사용자 「페이지 전환할 때 효과를 기다리다 보니 느린 느낌」 */
  }
  function 보임(e) { if (!e) return false; var r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; }   /* visibility 는 안 봄 — 숨김(autoAlpha = visibility:hidden)한 것을 다시 모을 때 빠져 그대로 나타났음(실측) */
  function 보이는(목록) { return [].filter.call(목록, 보임); }

  /* 들어올 것 모으기 — 머리(제목 줄 · 도구 줄) · 내용 덩이(카드 목록이면 카드 한 장씩) · 패널(옆 칸) · LNB 줄
     내용은 .content 에서 크기로 판단해 다섯 번까지 내려감:
       · 보이는 자식이 하나뿐 · 또는 내용 칸 높이의 절반 넘게 큰 감싸개 → 벗기고 안으로(화면02 stage-area › v-setup › g6 · 화면03 p-page › p-right · 분석② 자리 · 분석⑤ 가운데(폭 51%) › 결과속)
       · display:contents 줄(화면02 작성 g6-row)은 상자가 없어 그 자식을 같은 층으로
       · 좁고(40%↓) 높은(60%↑) 칸 · aside · .rail · 펼친 .sheet = 패널 */
  var 패널선택 = "aside, .rail, .sheet:not(.is-fold)";
  function 펼친자식(el) {
    var a = [];
    [].forEach.call(el.children, function (x) {
      if (x.tagName === "SCRIPT" || x.tagName === "STYLE" || x.tagName === "TEMPLATE") return;
      if (getComputedStyle(x).display === "contents") a = a.concat(펼친자식(x)); else if (보임(x)) a.push(x);
    });
    return a;
  }
  function 글있음(x) { return [].some.call(x.childNodes, function (t) { return t.nodeType === 3 && t.textContent.trim(); }); }   /* 자기 글자가 있는 상자는 벗기지 않음(벗기면 글자만 남아 안 움직임) */
  function 모으기() {
    var m = D.querySelector(".body > .main") || D.querySelector(".main"), 머리 = [], 내용 = [], 패널 = [], 카드 = [];
    if (!m) return { 머리: 머리, 내용: 내용, 패널: 패널, 카드: 카드, LNB: [] };
    보이는(m.querySelectorAll(":scope > .page-hd")).forEach(function (e) { 머리.push(e); });
    보이는(m.querySelectorAll(":scope > .head-zone")).forEach(function (z) { var k = 펼친자식(z); if (k.length) k.forEach(function (e) { 머리.push(e); }); else 머리.push(z); });
    var c = m.querySelector(":scope > .content");
    if (c) {
      var cr = c.getBoundingClientRect(), W = cr.width, H = Math.min(cr.height, innerHeight - cr.top);
      (function 펼침(el, 깊이) {
        펼친자식(el).forEach(function (x) {
          if (x.matches(".grid, .gal") || x.querySelector(":scope > .wf-card, :scope > .tpl-card")) {
            보이는(x.querySelectorAll(":scope > .wf-card, :scope > .tpl-card")).forEach(function (e) { 카드.push(e); 내용.push(e); }); return; }
          var r = x.getBoundingClientRect();
          if (x.matches(패널선택) || (W > 700 && r.width < W * .4 && r.height > H * .6)) { 패널.push(x); return; }
          var 자식 = 펼친자식(x);
          if (깊이 < 5 && 자식.length && !글있음(x) && (자식.length === 1 || (r.height > H * .5 && 자식.length >= 2))) { 펼침(x, 깊이 + 1); return; }
          내용.push(x);
        });
      })(c, 0);
    }
    /* LNB 맨 위 핵심 버튼 묶음(모든 자동화 · 새 자동화 / 새 분석 = 부품 핵심버튼의 S)은 뺌 — 그 버튼엔 켜질 때 타일이 퍼지는 효과가 따로 있음(2026-10-04 사용자 「lnb에서 버튼 애니메이션에는 적용 안 되게」) */
    var LNB = 보이는(D.querySelectorAll(".lnb-panel .channel-text-demo, .lnb-panel .label-toggle")).filter(function (e) { return !e.closest(".lnb-wrap > .lnb-group:first-child"); });
    /* 본문 머리 구분선 — 제목 줄 · 도구 줄을 감싼 상자(.head-zone · .page-hd)의 아래 테두리. 상자 자체는 안 움직여서 선만 처음부터 보였음 */
    var 선 = [].filter.call(m.querySelectorAll(":scope > .head-zone, :scope > .page-hd"), function (e) {
      var cs = getComputedStyle(e), c = cs.borderBottomColor; if (!보임(e) || parseFloat(cs.borderBottomWidth) <= 0) return false;
      var n = (c.match(/[\d.]+/g) || []).map(Number); if (n.length > 3 && n[3] === 0) return false; if (n[0] === 255 && n[1] === 255 && n[2] === 255) return false; return true; });
    return { 머리: 머리, 내용: 내용, 패널: 패널, 카드: 카드, LNB: LNB, 선: 선 };
  }
  /* LNB 줄도 움직일 때 — GNB 가 바뀌었거나(정보.GNB바뀜) · LNB 핵심 버튼(모든 자동화 · 새 자동화 / 새 분석)으로 넘어왔을 때(정보.LNB줄 · 2026-10-05 사용자 「핵심 버튼을 눌러 화면이 바뀔 때도 촤르륵」) · 핵심 버튼 묶음 자체는 늘 빠짐 */
  function LNB도움직임(s, 정보) { return !!(s.LNB줄 && 정보 && (정보.GNB바뀜 || 정보.LNB줄)); }
  window.__전환모으기 = 모으기;   /* 실측용 */
  function 다(g, s) { var a = g.머리.concat(g.내용, g.패널); if (s && s.LNB) a = a.concat(g.LNB); return a; }

  /* 차례 번호 — 위에서 아래(같은 줄은 왼쪽부터) · 너무 길면 12번째부터 같이(목록이 길어도 끌지 않게) */
  function 차례(els) { return els.slice().sort(function (a, b) { var p = a.getBoundingClientRect(), q = b.getBoundingClientRect(); return Math.abs(p.top - q.top) > 4 ? p.top - q.top : p.left - q.left; }); }
  function 시작값(s, 방향, 배) {
    var d = s.거리 * (배 || 1), o = { autoAlpha: s.시작투명, lazy: false };
    if (방향 === "아래") o.y = d; else if (방향 === "위") o.y = -d; else if (방향 === "오른쪽") o.x = d; else if (방향 === "왼쪽") o.x = -d;
    if (s.블러 > 0) o.filter = "blur(" + s.블러 + "px)";
    if (s.크기 !== 1) o.scale = s.크기;
    return o;
  }
  function 끝값(s) { var o = { autoAlpha: 1, x: 0, y: 0, ease: s.이징, duration: s.시간 }; if (s.블러 > 0) o.filter = "blur(0px)"; if (s.크기 !== 1) o.scale = 1; return o; }

  /* 움직이는 동안 CSS 전환 끔 — 템플릿 카드 transition: transform .3s 가 GSAP 가 매 프레임 쓰는 값을 끌고 가 이동이 0 으로 재졌음(실측) · 끝나면 뗌 */
  (function () { var k = D.createElement("style"); k.id = "전환중css";
    var h = "html" + ".전환중".repeat(6);
    k.textContent = h + " body .body > .main *," + h + " body .lnb-panel .lnb-wrap > .lnb-group:not(:first-child) *{transition:none!important;}"
      /* 구분선 — 움직이는 동안 테두리는 투명, 같은 색 1px 을 겹쳐 그음 · 페이드(값은 짝 GSAP 가 --전환선 · --전환선op 로) */
      + "html body .body > .main > .전환선.전환선{border-bottom-color:transparent!important;}"
      + "html body .body > .main > .전환선.전환선::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:1px;background:var(--전환선색);transform-origin:0 50%;transform:scaleX(var(--전환선,1));opacity:var(--전환선op,1);pointer-events:none;}";   /* LNB 는 움직이는 줄 묶음만 — 핵심 버튼(첫 묶음) 전환은 그대로 */ D.head.appendChild(k); })();
  function 움직임(켬) { R.classList.toggle("전환중", 켬); }
  var 지금tl = null;
  function 정리(els) { if (!window.gsap) return; gsap.set(els, { clearProps: "opacity,visibility,transform,translate,scale,filter,willChange" }); }
  function 선정리(els) { (els || []).forEach(function (e) { e.classList.remove("전환선"); e.style.removeProperty("--전환선색"); e.style.removeProperty("--전환선"); e.style.removeProperty("--전환선op"); if (e.__선위치) { e.style.removeProperty("position"); e.__선위치 = 0; } if (e.getAttribute("style") === "") e.removeAttribute("style"); }); }
  function 끝표시() { R.classList.add("등장끝"); }   /* 자리이동 · 도구줄 부품이 이걸 보고 움직임 시작 */

  /* 숨김 = 들어오기 타임라인을 미리 지어 멈춰 둠 — 시작 모습(시작 투명도 · 거리 · 방향)이 그대로 깔림.
     전엔 무조건 투명 0 으로 숨겨, 실제 GNB · LNB 로 넘어갈 때 몇 프레임 빈 뒤 30% · 60% 로 튀어 「시작 투명도가 정해진 것처럼」 보였음(2026-10-04 사용자 「lnb는 시작 투명도가 정해져 있는 것 같은데」) */
  var 대기tl = null;
  window.__전환숨김 = function (정보) {
    var s = 설정(); if (s.꼴 === "지금" || !window.gsap) return;
    if (지금tl) { 선정리(지금tl.선); 지금tl.kill(); 지금tl = null; }
    if (대기tl) { 대기tl.tl.kill(); 정리(대기tl.모두); 선정리(대기tl.선); 대기tl = null; }
    대기tl = 짓기(정보 || {}, s); 대기tl.tl.pause(0); 풀기();
  };

  /* 「지금」 = 1안 그대로 — 덧입힘 덩이 떠오름 + 부품 등장(카드 대각선) 다시 */
  function 지금재생() {
    if (window.__1안등장) try { window.__1안등장(); } catch (e) {}
    var 덩이 = D.querySelectorAll(".content > *"); [].forEach.call(덩이, function (x) { x.style.animation = "none"; }); void D.body.offsetWidth; [].forEach.call(덩이, function (x) { x.style.animation = ""; });
  }

  /* 처음 가림(안 CSS · html:not(.전환준비) 의 머리 · 내용 opacity 0) 풀기 — 들어올 것을 숨긴 그 순간에만 */
  function 풀기() { R.classList.add("전환준비"); }
  /* 들어오기 — 한 프레임 미뤄 모음: 부품 스크립트(본문머리 등)가 다음 프레임에 제목 줄을 그려서, 바로 모으면 분석①이 「.면」 하나만 잡혔음(실측) · 그동안은 처음 가림이 덮음 */
  var 차례표 = 0;
  window.__전환등장 = function (정보) {
    var 내 = ++차례표;
    requestAnimationFrame(function () { if (내 === 차례표) 들어오기(정보); });
  };
  function 들어오기(정보) {
    정보 = 정보 || {};
    var s = 설정();
    if (s.꼴 !== "지금" && !window.gsap && !gsap없음) { window.__전환대기 = 정보; return; }   /* GSAP 을 아직 읽는 중 — 가린 채 기다렸다 준비끝에서 돎(1안 손질후는 짝 스크립트가 끝나면 바로 보여서 GSAP 보다 빠를 수 있음) */
    if (s.꼴 === "지금" || !window.gsap) { 풀기(); 지금재생(); return; }
    if (지금tl) { 지금tl.progress(1).kill(); 지금tl = null; }
    R.classList.remove("등장끝");
    var 미리 = 대기tl; 대기tl = null;
    if (미리) {   /* 숨김 때 지어 둔 것 — 덩이가 그대로면 그대로 재생, 바뀌었으면 버리고 새로 */
      var 지금덩이 = 다(모으기(), { LNB: LNB도움직임(s, 정보) });
      var 같음 = 지금덩이.length === 미리.모두.length && 지금덩이.every(function (e, i) { return e === 미리.모두[i]; });
      if (같음) { 지금tl = 미리.tl; 움직임(true); 풀기(); 미리.tl.play(0); return; }
      미리.tl.kill(); 정리(미리.모두); 선정리(미리.선);
    }
    var 새 = 짓기(정보, s); 지금tl = 새.tl; 풀기();   /* fromTo 들이 시작 모습을 바로 그리므로 같은 프레임에 풀어도 번쩍 없음 */
  }
  function 짓기(정보, s) {
    var g = 모으기(), LNB도 = LNB도움직임(s, 정보), 모두 = 다(g, { LNB: LNB도 });
    if (!LNB도) 정리(g.LNB);   /* 같은 판에서 빠졌다 다시 들어오면(LNB 줄까지 빠진 채) 남지 않게 */
    var tl = gsap.timeline({ defaults: { lazy: false }, onStart: function () { 움직임(true); }, onComplete: function () { 정리(모두); 선정리(tl.선); 끝표시(); if (지금tl === tl) 지금tl = null; 움직임(false); } });
    움직임(true);
    tl.timeScale(1 / Math.max(.05, s.느리게));
    var 결과 = { tl: tl, 모두: 모두, 선: [] };
    if (s.선 !== "그대로" && !s.줄임 && g.선.length) {   /* 구분선 — 머리와 같이 시작 */
      결과.선 = g.선; tl.선 = g.선;
      g.선.forEach(function (e) { e.style.setProperty("--전환선색", getComputedStyle(e).borderBottomColor); if (getComputedStyle(e).position === "static") { e.style.position = "relative"; e.__선위치 = 1; } e.classList.add("전환선"); });
      if (s.선 === "페이드") tl.fromTo(g.선, { "--전환선op": s.시작투명 }, { "--전환선op": 1, duration: s.시간, ease: s.이징 }, 0);
      else tl.fromTo(g.선, { "--전환선": 0 }, { "--전환선": 1, duration: Math.min(.6, s.시간 * 1.5), ease: s.이징 }, 0);
    }
    if (s.줄임) {   /* 움직임 줄이기 — 이동 · 블러 · 시차 없이 0.15초 페이드 한 번 */
      tl.fromTo(모두, { autoAlpha: 0, lazy: false }, { autoAlpha: 1, duration: .15, ease: "none" }); return 결과;
    }
    var 방향 = s.방향 === "순서" ? (정보.방향 < 0 ? "위" : "아래") : s.방향;
    if (LNB도 && g.LNB.length) {
      var ld = s.LNB거리 >= 0 ? s.LNB거리 : Math.max(6, s.거리), l시작 = { autoAlpha: s.LNB시작, lazy: false, x: 0, y: 0 };
      if (s.LNB방향 === "위") l시작.y = -ld; else if (s.LNB방향 === "아래") l시작.y = ld; else if (s.LNB방향 !== "제자리") l시작.x = -ld;
      tl.fromTo(g.LNB, l시작, { autoAlpha: 1, x: 0, y: 0, duration: s.LNB시간 > 0 ? s.LNB시간 : s.시간, ease: s.LNB이징 || s.이징,
        stagger: s.LNB시차 >= 0 ? { each: s.LNB시차 } : { each: Math.min(s.시차, .03), amount: Math.min(.3, s.시차 * g.LNB.length) } }, 0);
    }
    var 바로 = function (els, 때, 방, 배) { if (els.length) tl.fromTo(els, 시작값(s, 방 || 방향, 배), 끝값(s), 때); };
    var 줄 = function (els, 때, 방, 배) { els = 차례(els); if (!els.length) return;
      var 칸 = Math.min(els.length, 13) - 1, 시차 = s.상한 > 0 && 칸 > 0 ? Math.min(s.시차, s.상한 / 칸) : s.시차;   /* 상한이 있으면 덩이가 많을수록 시차를 줄여 마지막이 상한 안에 출발 */
      tl.fromTo(els, 시작값(s, 방 || 방향, 배), Object.assign(끝값(s), { stagger: function (i) { return Math.min(i, 12) * 시차; } }), 때); };
    if (s.꼴 === "한번") { 바로(g.머리.concat(g.내용, g.패널), 0); }
    else if (s.꼴 === "차례") { 줄(g.머리.concat(g.내용, g.패널), 0); }
    else if (s.꼴 === "카드") {   /* 머리 · 패널 · 카드 아닌 덩이는 같이 페이드(이동 없음), 카드만 시차 */
      var 나머지 = g.머리.concat(g.패널, g.내용.filter(function (e) { return g.카드.indexOf(e) < 0; }));
      if (나머지.length) tl.fromTo(나머지, { autoAlpha: s.시작투명, lazy: false }, { autoAlpha: 1, duration: s.시간, ease: s.이징 }, 0);
      if (g.카드.length) 줄(g.카드, s.시차 * 2); else 줄(g.내용, s.시차 * 2);
    }
    else if (s.꼴 === "블록") {   /* 머리 묶음 → 내용 묶음 → 패널, 묶음 안은 같이 · 묶음 사이 = 시차 × 2 */
      var 박 = s.시차 * 2; 바로(g.머리, 0); 바로(g.내용, 박); 바로(g.패널, 박 * 2, "오른쪽");
    }
    else if (s.꼴 === "패널옆") {   /* 머리 · 내용은 차례로, 오른쪽 패널은 옆에서 두 배 거리로 밀려 들어옴 */
      줄(g.머리.concat(g.내용), 0); 바로(g.패널, s.시차 * 2, "오른쪽", 2);
    }
    else 줄(g.머리.concat(g.내용, g.패널), 0);
    return 결과;
  }

  window.__전환나감 = function (정보) {
    정보 = 정보 || {};
    var s = 설정();
    if (!window.gsap || s.꼴 === "지금" || s.줄임 || s.나감 === "없음") return Promise.resolve();
    if (지금tl) { 지금tl.progress(1).kill(); 지금tl = null; }
    var g = 모으기(), 모두 = 다(g, { LNB: LNB도움직임(s, 정보) }), 블 = s.블러 > 0 ? { filter: "blur(" + Math.round(s.블러 / 2) + "px)" } : {};
    return new Promise(function (된) {
      움직임(true); var tl = gsap.timeline({ defaults: { lazy: false }, onComplete: 된 }); tl.timeScale(1 / Math.max(.05, s.느리게));
      var 끝 = Object.assign({ autoAlpha: 0, duration: s.나감시간, ease: "power1.in" }, 블);
      if (s.나감 === "페이드") tl.to(모두, 끝);
      else if (s.나감 === "위로") tl.to(모두, Object.assign(끝, { y: -Math.max(4, s.거리 / 2) }));
      else if (s.나감 === "차례") tl.to(차례(모두), Object.assign(끝, { y: -4, stagger: function (i) { return Math.min(i, 8) * Math.min(.02, s.시차 / 2); } }));
      else tl.to(모두, 끝);
      setTimeout(된, 1500);   /* 혹시 안 끝나도 넘어감 */
    });
  };

  /* GSAP 부르기 — 자리이동 부품이 먼저 불렀으면 그대로 씀 · 다 되면 html.전환준비(안 CSS 의 「처음 가림」 이 풀림) + 기다리던 등장 */
  var gsap없음 = false;
  function 준비끝() {
    if (!window.gsap) { gsap없음 = true; 풀기(); }   /* GSAP 를 못 읽으면 가림만 풀고 그대로 보임 */
    if (window.__전환대기) { var w = window.__전환대기; window.__전환대기 = null; window.__전환등장(w); }
  }
  if (window.gsap) 준비끝();
  else { var k = D.createElement("script"); k.src = 길; k.onload = k.onerror = 준비끝; D.head.appendChild(k); }
  setTimeout(function () { var f = null; try { f = window.frameElement; } catch (e) {}
    if (!R.classList.contains("전환준비") && !(f && f.style.visibility === "hidden")) window.__전환등장({}); }, 0);
})();
