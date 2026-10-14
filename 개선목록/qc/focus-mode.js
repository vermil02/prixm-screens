/* focus-mode.js — 마우스로 들어왔는지 키보드로 들어왔는지를 <html> 에 표시한다.

   왜 필요한가: 마우스로 누른 뒤에도 포커스 링이 남으면 화면이 시끄럽다. ChatGPT 는 이것을
   <html data-focus-mode="mouse|keyboard"> 한 곳에서 가르고, CSS 는 그 속성만 본다.
   실측: 캡처에 data-focus-mode 73곳 · keyboard-focused: 52곳
   (design 요소/icons/sources/gpt-library-260922.md 3절)

   브라우저의 :focus-visible 로는 부족하다 — **텍스트 입력은 마우스로 눌러도 :focus-visible 이
   걸린다**(명세). 그래서 검색칸을 클릭하면 링이 나온다. ChatGPT 는 그 자리에서 링 대신
   테두리만 진하게 한다. 그 구분을 하려면 이 장치가 있어야 한다. */
(function () {
  var root = document.documentElement;
  var set = function (mode) {
    if (root.getAttribute('data-focus-mode') !== mode) root.setAttribute('data-focus-mode', mode);
  };
  set('mouse');
  // 키보드로 옮겨 다니기 시작하면 keyboard
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key.startsWith('Arrow') || e.key === 'Home' || e.key === 'End') set('keyboard');
  }, true);
  // 손으로 짚으면 다시 mouse
  document.addEventListener('pointerdown', function () { set('mouse'); }, true);
})();
