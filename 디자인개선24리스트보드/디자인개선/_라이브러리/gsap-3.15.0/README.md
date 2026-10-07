# GSAP 3.15.0 — 본체 + Flip

- 무엇: 웹 애니메이션 라이브러리 GSAP 본체(`gsap.min.js`)와 플러그인 Flip(`Flip.min.js` — 바뀌기 전 자리 → 바뀐 뒤 자리를 부드럽게 이음).
- 어디서: npm 패키지 `gsap@3.15.0` 의 `dist/` 그대로(jsDelivr https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/) · 2026-10-02 내려받음 · 고치지 않음.
- sha256: gsap.min.js `92bb9a96…0fbb` · Flip.min.js `cbe3ca72…8c2f`
- 라이선스: Standard 'no charge' license(https://gsap.com/standard-license) — 상업 사용 무료 · Webflow 와 경쟁하는 노코드 애니메이션 제작 도구에만 금지.
- 왜: 07 콘텐츠 랩 「목록 바뀔 때」 자리 이동을 직접 짠 코드 대신 검증된 라이브러리로(사용자 2026-10-02 「라이브러리 혹은 우수하고 잘 짜여진 걸」). 조사 노트 `AI조사노트/서칭/261002-카드목록-레이아웃전환-애니메이션-서칭-layout-transition-animation-libraries.md`.
- 쓰는 곳: `손질/07_콘텐츠/굽기.py` ⑦ 「자리 5 GSAP Flip」.
