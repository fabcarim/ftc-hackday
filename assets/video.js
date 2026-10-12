// Carica il player YouTube solo quando si clicca sull'anteprima.
// Finche' nessuno clicca, la pagina non contatta YouTube.
document.querySelectorAll('.video-box[data-yt]').forEach(function (box) {
  var bottone = box.querySelector('button');
  if (!bottone) return;
  bottone.addEventListener('click', function () {
    var id = box.getAttribute('data-yt');
    var titolo = box.getAttribute('data-titolo') || 'Video';
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + id +
                 '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
    iframe.title = titolo;
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
    iframe.allowFullscreen = true;
    box.innerHTML = '';
    box.appendChild(iframe);
  });
});
