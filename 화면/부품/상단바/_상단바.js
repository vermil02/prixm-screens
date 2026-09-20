/* ===========================================================================
   상단 바 — 화면들이 함께 쓰는 한 벌 (2026-09-18 · 결정 6002)

   그리는 것은 둘입니다.
     경로 줄  `.page-hd > .crumb`   — 「새 자동화 › 템플릿 선택 › 민원 답변 작성」 + 오른쪽 검색 버튼(41px · 결정 151)
     타이틀 줄 `.head-zone > .page-ttl` — 화면 이름(+ 새로고침 버튼)

   **도구 줄(.tools)은 그리지 않습니다** — 화면마다 든 것이 완전히 다릅니다
   (화면① 구분·정렬·보기 전환 / 화면② 키워드·보기 전환). 화면이 자기 HTML 로 갖습니다.
   모양(CSS)은 `_공용.css` 에 이미 한 벌로 모여 있습니다(결정 184).

   여는 법 — 시안 <head> 에서 **defer 없이**:
     <script src="../화면/_상단바.js?v=…"></script>
   그리고 마크업 자리에서 바로:
     <div class="js-head"></div>
     <div class="head-zone"><div class="js-ttl"></div><div class="tools">…화면이 가진 것…</div></div>
     <script>PRIXM_HEAD({ … })</script>

   ※ defer 를 쓰면 화면의 인라인 스크립트가 **먼저** 돌아서 `.js-crumb` 를 못 찾습니다.
     그래서 동기로 읽고, 부르는 것은 마크업 바로 뒤에서 합니다.

   쓰는 법
     PRIXM_HEAD({
       crumb: [{t:'새 자동화'}, {mid:true}, {t:'템플릿 선택', cur:true, cls:'js-crumb'}],
       search: '템플릿 검색',
       title:  {t:'템플릿 선택', cls:'js-ttlrow', tcls:'js-hd-ttl'}
     })

     crumb 항목
       {t:'글자'}                  그냥 조각
       {t:'…', cur:true}           지금 자리(진하게)
       {mid:true}                  **쌓이는 자리**(결정 180) — 평소 숨김, 화면 JS 가 켠다.
                                   `.js-crumb-mid` 와 그 앞 화살표 `.js-crumb-arw` 가 생긴다
       cls                         화면 JS 가 잡을 클래스(예: js-crumb)
     title
       {t:'…'}                     글자만
       {t:'…', refresh:'라벨'}      오른쪽에 새로고침 버튼(화면①)
       {cls, tcls}                 화면 JS 가 잡을 클래스(줄 / 글자)
   =========================================================================== */
(function () {
  var ICO_SEARCH = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
  var ICO_REFRESH = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3" ' +
    'stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M16.5 8.3A6.8 6.8 0 1 0 16 13"/><path d="M16.5 3.6v4.7h-4.7"/></svg>';

  function esc(s) { return String(s == null ? '' : s); }

  window.PRIXM_HEAD = function (o) {
    o = o || {};

    // ── 경로 줄 ────────────────────────────────────────────────
    var slot = document.querySelector('.js-head');
    if (slot) {
      var parts = [], skipArw = false;
      (o.crumb || []).forEach(function (c, i) {
        // 조각 사이에 화살표. 바로 앞이 「쌓이는 자리」였다면 그쪽이 화살표를 이미 달고 있다
        if (i && !skipArw) parts.push('<span class="arw">›</span>');
        skipArw = false;
        if (c.mid) {
          // 쌓이는 자리 — 평소엔 숨어 있고 화면 JS 가 켠다.
          // **뒤** 화살표(js-crumb-arw)가 이 조각과 한 짝으로 같이 숨는다 — 앞 화살표는 늘 보인다
          parts.push('<span class="js-crumb-mid" hidden></span>');
          parts.push('<span class="arw js-crumb-arw" hidden>›</span>');
          skipArw = true;                               // 다음 조각은 화살표를 또 넣지 않는다
          return;
        }
        var cls = (c.cur ? 'cur' : '') + (c.cls ? (c.cur ? ' ' : '') + c.cls : '');
        parts.push('<span' + (cls ? ' class="' + cls + '"' : '') + '>' + esc(c.t) + '</span>');
      });
      var srch = o.search
        ? '<span class="v-gap"></span><button class="btn-ico js-search" aria-label="' + esc(o.search) + '">' + ICO_SEARCH + '</button>'
        : '';
      var hd = document.createElement('div');
      hd.className = 'page-hd';
      hd.innerHTML = '<div class="crumb">' + parts.join('') + srch + '</div>';
      slot.parentNode.replaceChild(hd, slot);
    }

    // ── 타이틀 줄 ──────────────────────────────────────────────
    var ts = document.querySelector('.js-ttl');
    if (ts && o.title) {
      var t = o.title;
      var inner = '<span class="t' + (t.tcls ? ' ' + t.tcls : '') + '">' + esc(t.t) + '</span>';
      if (t.refresh) {
        inner = '<div class="ttl-in">' + inner +
          '<button class="btn-ico" aria-label="' + esc(t.refresh) + '">' + ICO_REFRESH + '</button></div>';
      }
      var row = document.createElement('div');
      row.className = 'page-ttl' + (t.cls ? ' ' + t.cls : '');
      row.innerHTML = inner;
      ts.parentNode.replaceChild(row, ts);
    }
  };
})();
