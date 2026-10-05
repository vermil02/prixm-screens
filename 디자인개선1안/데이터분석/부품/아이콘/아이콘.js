/* ===========================================================================
   prixm 아이콘 한 벌 — 데이터 분석 (2026-09-22)

   ★ 아이콘은 **이 파일로만** 씁니다. 화면·랩에 SVG 를 베껴 넣지 마십시오(규약 2).
     여는 법 — <base href="…/컴포넌트/"> 를 쓰는 시안에서:
       <link rel="stylesheet" href="../데이터분석/부품/아이콘/아이콘.css?v=20260922a">
       <script src="../데이터분석/부품/아이콘/아이콘.js?v=20260922a"></script>

   쓰는 법 둘
     ① 마크업에 자리만 두면 자동으로 채워집니다
          <i data-ico="좁히기" data-크기="16"></i>
     ② 글로 받아 씁니다
          PX_ICO("좁히기", 16)      →  <svg …>…</svg>

   prixm 규격 (`화면/_스타일규칙.md` 「아이콘」 절)
     · viewBox 24 · fill none · stroke currentColor · round
     · **획 두께는 `24 ÷ 그릴 크기`** — 16px→1.5 · 15px→1.6 · 20px→1.2 · 12px→2.
       그래서 파일에 stroke-width 를 박지 않고, 크기를 줄 때 같이 계산합니다.
     · 색에 뜻을 싣지 않습니다 — currentColor 라 글자색을 따라옵니다.

   출처 — **Lucide 1.47.0 (ISC)**. 원본 이름은 README.md 의 표에 있습니다.
   라이선스 원문은 LICENSE-lucide.txt.
   =========================================================================== */
(function (전역) {
  "use strict";

  var 속 = {
    "좁히기": '<path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />',
    "형변환": '<path d="M14 4a1 1 0 0 1 1-1" /><path d="M15 10a1 1 0 0 1-1-1" /><path d="M21 4a1 1 0 0 0-1-1" /><path d="M21 9a1 1 0 0 1-1 1" /><path d="m3 7 3 3 3-3" /><path d="M6 10V5a2 2 0 0 1 2-2h2" /><rect x="3" y="14" width="7" height="7" rx="1" />',
    "전체해제": '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />',
    "파일표": '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="M8 13h2" /><path d="M14 13h2" /><path d="M8 17h2" /><path d="M14 17h2" />',
    "올리기": '<path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />',
    "내리기": '<path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" />',
    "다시분석": '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" />',
    "지움": '<path d="M18 6 6 18" /><path d="m6 6 12 12" />',
    "폴더": '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />',
    "검색": '<path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" />',
    "보내기": '<path d="M20 4v7a4 4 0 0 1-4 4H4" /><path d="m9 10-5 5 5 5" />',
    "캐럿": '<path d="m6 9 6 6 6-6" />',
    "펼침": '<path d="m9 18 6-6-6-6" />',
    "위아래": '<path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5 5" />',
    /* Lucide `check` — 체크박스 안에 그린다. 12px 이므로 획은 24÷12 = 2 */
    "체크": '<path d="M20 6 9 17l-5-5" />',
    "더하기": '<path d="M5 12h14" /><path d="M12 5v14" />',
    "버리기": '<path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />',
    "플라스크": '<path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" /><path d="M6.453 15h11.094" /><path d="M8.5 2h7" />',
    "기술통계": '<path d="M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2" />',
    "상관분석": '<rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /><path d="M15 3v18" />',
    "그룹비교": '<path d="M8 3 4 7l4 4" /><path d="M4 7h16" /><path d="m16 21 4-4-4-4" /><path d="M20 17H4" />',
    "분포": '<path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />',
    "선형회귀": '<path d="M16 7h6v6" /><path d="m22 7-8.5 8.5-5-5L2 17" />',
    "정규성": '<path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7" />',
    "교차표": '<path d="M12 3v18" /><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M3 15h18" />',
    "이상치": '<circle cx="7.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="18.5" cy="5.5" r=".5" fill="currentColor" /><circle cx="11.5" cy="11.5" r=".5" fill="currentColor" /><circle cx="7.5" cy="16.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="14.5" r=".5" fill="currentColor" /><path d="M3 3v16a2 2 0 0 0 2 2h16" />',
    "추세": '<path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="m19 9-5 5-4-4-3 3" />',
    /* ── 회의록 (2026-09-28) — lucide-static 1.47.0 에서 받은 그대로 ── */
    "마이크": '<path d="M12 19v3" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><rect x="9" y="2" width="6" height="13" rx="3" />',
    "음성파일": '<path d="M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0" />',
    "사람": '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />',
    "메일": '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" />',
    "메일끔": '<path d="M22 12.532V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8.792" /><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><path d="m16.5 16.5 5 5" /><path d="m21.5 16.5-5 5" />',
    "사람더하기": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" />',
  };

  /* prixm 규칙 — 24 격자를 줄여 쓰면 획도 같이 줄어든다. 실효 1px 로 되돌린다. */
  function 획(크기) { return Math.round((24 / 크기) * 100) / 100; }

  전역.PX_ICO = function (이름, 크기) {
    크기 = 크기 || 16;
    if (!속[이름]) { console.warn("[PX_ICO] 없는 아이콘:", 이름); return ""; }
    return '<svg class="px-ico px-ico-' + 이름 + '" viewBox="0 0 24 24" ' +
           'width="' + 크기 + '" height="' + 크기 + '" fill="none" stroke="currentColor" ' +
           'stroke-width="' + 획(크기) + '" stroke-linecap="round" stroke-linejoin="round" ' +
           'aria-hidden="true">' + 속[이름] + "</svg>";
  };

  전역.PX_ICO_목록 = function () { return Object.keys(속); };

  /* <i data-ico="…"> 를 훑어 채운다. 늦게 그려진 것도 PX_ICO_채우기() 로 다시 부르면 된다. */
  function 채우기(뿌리) {
    var 것들 = (뿌리 || document).querySelectorAll("[data-ico]");
    Array.prototype.forEach.call(것들, function (el) {
      var 크기 = +(el.getAttribute("data-크기") || el.getAttribute("data-size") || 16);
      el.outerHTML = 전역.PX_ICO(el.getAttribute("data-ico"), 크기);
    });
  }
  전역.PX_ICO_채우기 = 채우기;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { 채우기(); });
  } else {
    채우기();
  }
})(window);
