/* ===========================================================================
   데이터 분석 좌측 목록 — 화면들이 함께 쓰는 한 벌 (2026-09-22)

   그리는 것
     분석 메뉴          ← 묶음 머리 (12px/500)
       새 분석           ← 화면①로 가는 자리. 아이콘은 플라스크(만들어지는 것의 모양)
     최근 분석 내역      ← 묶음 머리 + 접기 화살표
       …내역 줄들…       ← 한 줄. AI 가 지은 분석 이름만

   **상단 유틸(검색·접기)은 자리만 둡니다** — `화면/_뼈대.js` 가 제품 svg 로 갈아 끼웁니다.
   모양(CSS)은 여기 없습니다 — `화면/_공용.css` 와 라이브러리 `컴포넌트/common/common.css` 가 맡습니다.
   이 부품은 **마크업만** 그립니다(자동화 `_상단바.js` 와 같은 규칙).

   여는 법 — 시안 <head> 에서 **defer 없이**:
     <script src="부품/좌측목록/_좌측목록.js?v=20260922c"></script>
   마크업 자리에 빈 칸을 두고 바로 부릅니다:
     <div class="lnb-panel"><div class="js-lnb"></div></div>
     <script>PRIXM_ANALYSIS_LNB({ … })</script>

   쓰는 법
     PRIXM_ANALYSIS_LNB({
       새분석: false,                        // 「새 분석」 줄이 켜진 상태인가 (화면①이면 true)
       새분석링크: '../데이터분석/정본/화면01_새분석/화면01_새분석.html',
       내역: [
         {t:'화학물질 안전 데이터 기술통계'},
         {t:'측정값 월별 추세', on:true, cls:'js-row-trend'},
         {t:'부서 × 위험등급 교차표', cls:'js-row-cross'},
       ],
     })

     내역 항목
       {t:'글자'}            그냥 줄
       {t:'…', on:true}      지금 보고 있는 줄(선택 바탕)
       {t:'…', href:'…'}     누르면 가는 곳. **<base> 기준 경로**로 적는다
                             (시안들은 <base href="…/컴포넌트/"> 를 쓰므로
                              `../데이터분석/정본/…` 처럼 쓴다)
       {t:'…', 아직:'없는 까닭'}  링크가 없는 줄 — 누르면 안 움직이고 까닭을 title 로 보여 준다
       cls                   화면 JS 가 잡을 클래스

   ※ as-is 단계의 **임시 부품**입니다(`화면/_부품나누기.md` 4절).
     정식 라이브러리에 바로 넣지 않고, 엑셀 「컴포넌트 목록」에 이름만 걸어 두었다가
     디자인 단계에서 승격합니다.
   =========================================================================== */
(function (전역) {
  "use strict";

  /* 플라스크 — 제품 자체 얇은 세트 규격(viewBox 20). 같은 그림이 `assets/ico-analysis.svg` 에도
     있지만 그쪽은 `stroke="#475062"` 가 박혀 있어 켜짐/꺼짐 색이 안 따라옵니다. 그래서 여기서는
     인라인으로 두고 `currentColor` 로 바꿔 씁니다 — `_스타일규칙.md` 3절의 규칙 그대로입니다.
     (그 파일은 **GNB** 용입니다 — GNB 는 `.g-item img{width:20px}` 라 20 이 맞습니다.)

     ★ 크기 16 (2026-09-22 고침) — 전에는 20 이었습니다.
       LNB 에서 이 줄과 나란히 서는 것은 **AI 채팅 「새 채팅」(`ico-chat.svg` = 16)** 입니다.
       머리안 랩에서 A안을 고른 이유가 「AI 채팅과 나란히 놓아도 안 튄다」였는데 크기가 튀고 있었고,
       플라스크는 **획 아이콘**이라 실루엣이 20 격자를 가로 64%·세로 71% 채워 fill 아이콘보다 더 커 보였습니다.
     ★ 획 1.25 — prixm 규칙 `stroke = viewBox ÷ 그릴 크기` = 20 ÷ 16. 16px 에서 실효 1px 이 됩니다. */
  var 플라스크 =
    '<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" ' +
    'stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M8 2.5V8.2L3.6 15.2c-.45.7.06 1.6.9 1.6h11c.84 0 1.35-.9.9-1.6L12 8.2V2.5"/>' +
    '<path d="M7 2.5h6"/><path d="M5.7 12.6h8.6"/></svg>';

  /* 묶음 머리의 접기 화살표 — 라이브러리 `.lt-arrow` 규격(8×5) */
  var 화살표 =
    '<svg fill="none" viewBox="0 0 8 5"><path d="M1 1L4 3.5L7 1" ' +
    'stroke="currentColor" stroke-linecap="round" stroke-width="1.2"></path></svg>';

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* 아이콘이 붙는 줄 — `.ch-ico` + `.ch-label` */
  function 아이콘줄(아이콘, 글자, 켜짐, 링크) {
    return '<div class="channel-text-demo' + (켜짐 ? " active" : "") + '"' +
             (링크 ? ' data-go="' + esc(링크) + '"' : "") + ">" +
             '<div class="ch-inner">' +
               '<span class="ch-ico">' + 아이콘 + "</span>" +
               '<span class="ch-label">' + esc(글자) + "</span>" +
             "</div></div>";
  }

  /* 글자만 있는 줄 — 아이콘이 없으므로 `.ch-label` 을 2px 들여쓴다(AI 채팅 내역 줄과 같은 자리) */
  function 글자줄(항목) {
    return '<div class="channel-text-demo' + (항목.on ? " active" : "") + '"' +
             (항목.cls ? ' data-cls="' + esc(항목.cls) + '"' : "") +
             (항목.href ? ' data-go="' + esc(항목.href) + '"' : "") +
             (항목.아직 ? ' data-아직="1" title="' + esc(항목.아직) + '"' : "") + ">" +
             '<div class="ch-inner">' +
               '<span class="ch-label" style="padding-left:2px;">' + esc(항목.t) + "</span>" +
             "</div></div>";
  }

  function 묶음(머리, 화살표달기, 속) {
    var h = 화살표달기
      ? '<div class="label-toggle"><div class="lt-inner" style="display:flex; align-items:center; gap:2px;">' +
          '<div class="lt-arrow" style="background:none;">' + 화살표 + "</div>" +
          "<span>" + esc(머리) + "</span></div></div>"
      : '<div class="label-toggle"><span>' + esc(머리) + "</span></div>";
    return '<div class="lnb-group">' + h + '<div class="lnb-list">' + 속 + "</div></div>";
  }

  전역.PRIXM_ANALYSIS_LNB = function (설정) {
    설정 = 설정 || {};
    var 자리 = document.querySelector(".js-lnb");
    if (!자리) return;

    var 내역 = (설정.내역 || []).map(글자줄).join("");

    자리.outerHTML =
      '<div class="lnb-top-util"></div>' +   /* _뼈대.js 가 검색·접기를 채운다 */
      '<div class="lnb-wrap">' +
        묶음("분석 메뉴", false, 아이콘줄(플라스크, "새 분석", !!설정.새분석, 설정.새분석링크)) +
        묶음("최근 분석 내역", true, 내역) +
      "</div>";

    /* 누르면 가기. 링크가 없는 줄은 「아직 없다」는 뜻이라 움직이지 않는다 —
       as-is 시안에서 없는 화면으로 보내는 것보다 안 움직이는 쪽이 정직하다. */
    var 판 = document.querySelector(".lnb-panel");
    if (판 && !판.dataset.링크붙음) {
      판.dataset.링크붙음 = "1";
      판.addEventListener("click", function (e) {
        var 줄 = e.target.closest(".channel-text-demo");
        if (!줄) return;
        var 갈곳 = 줄.getAttribute("data-go");
        if (갈곳) location.href = 갈곳;
      });
      /* 갈 곳이 있는 줄만 손가락 커서 */
      Array.prototype.forEach.call(판.querySelectorAll(".channel-text-demo"), function (el) {
        el.style.cursor = el.hasAttribute("data-go") ? "pointer" : "default";
        if (el.hasAttribute("data-아직")) el.style.opacity = ".55";
      });
    }

    /* data-cls → 진짜 class. 마크업을 만들 때 넣으면 esc 가 꼬여서 여기서 옮긴다. */
    Array.prototype.forEach.call(document.querySelectorAll(".lnb-panel [data-cls]"), function (el) {
      el.className += " " + el.getAttribute("data-cls");
      el.removeAttribute("data-cls");
    });
  };
})(window);
