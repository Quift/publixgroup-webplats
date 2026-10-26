/* Video answers (.video-answer): subtitle tracks in all site languages, the page
   language on by default; play on open, pause on close; "full interview" swaps
   the short answer for the whole film in the same player. */
(function () {
  var LANGS = [['en', 'English'], ['sv', 'Svenska'], ['da', 'Dansk'], ['no', 'Norsk'], ['fi', 'Suomi'], ['de', 'Deutsch']];
  var page = document.documentElement.lang || 'en';

  function load(video, base) {
    video.querySelectorAll('track').forEach(function (t) { t.remove(); });
    video.src = base + '.mp4';
    LANGS.forEach(function (l) {
      var t = document.createElement('track');
      t.kind = 'subtitles'; t.srclang = l[0]; t.label = l[1]; t.src = base + '.' + l[0] + '.vtt';
      if (l[0] === page) t.default = true;
      video.appendChild(t);
    });
    video.load();
    // Somliga webbläsare ignorerar default på spår som läggs till efter start
    video.addEventListener('loadedmetadata', function () {
      for (var i = 0; i < video.textTracks.length; i++) {
        video.textTracks[i].mode = video.textTracks[i].language === page ? 'showing' : 'disabled';
      }
    }, { once: true });
  }

  document.querySelectorAll('.video-answer').forEach(function (box) {
    var video = box.querySelector('video');
    var full = box.querySelector('.video-answer__full');
    box.addEventListener('toggle', function () {
      if (!box.open) { video.pause(); return; }
      if (!video.getAttribute('src')) load(video, video.dataset.src);
      video.play().catch(function () {});
    });
    if (full) full.addEventListener('click', function () {
      load(video, full.dataset.src);
      full.hidden = true;
      video.play().catch(function () {});
    });
  });
})();
