(function () {
  var btn = document.getElementById('navToggle');
  var menu = document.getElementById('navMobile');
  if (!btn || !menu) return;
  btn.addEventListener('click', function () {
    menu.classList.toggle('hidden');
  });
})();
