
var WA = '254111426065';
var FALLBACK_IMG = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="440"><rect width="800" height="440" fill="#1b263b"/><text x="400" y="225" font-family="Arial" font-size="34" fill="#ff6b35" text-anchor="middle">Mwamba Logistics</text></svg>');
function imgFallback(el) { el.onerror = null; el.src = FALLBACK_IMG; }

document.getElementById('yr').textContent = new Date().getFullYear();

// Close mobile menu after tapping a link
document.querySelectorAll('#navbarNav a').forEach(function (a) {
  a.addEventListener('click', function () {
    var m = document.getElementById('navbarNav');
    if (m.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(m).hide();
  });
});

function openWA(text) {
  window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
}
function validate(form) {
  var ok = true;
  form.querySelectorAll('[required]').forEach(function (f) {
    var bad = !f.value.trim();
    f.classList.toggle('is-invalid', bad);
    if (bad) ok = false;
  });
  return ok;
}

document.getElementById('trackForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var no = document.getElementById('trackNo').value.trim();
  document.getElementById('trackErr').hidden = !!no;
  if (no) openWA('Hello Mwamba Logistics, please send me the latest update for shipment: ' + no);
});

document.getElementById('quoteForm').addEventListener('submit', function (e) {
  e.preventDefault();
  if (!validate(this)) return;
  var v = function (id) { return document.getElementById(id).value.trim(); };
  var msg = 'QUOTE REQUEST\n' +
    'Name: ' + v('qName') + '\nPhone: ' + v('qPhone') + '\nService: ' + v('qService') +
    '\nCargo/Weight: ' + v('qWeight') + '\nFrom: ' + v('qFrom') + '\nTo: ' + v('qTo') +
    (v('qNotes') ? '\nNotes: ' + v('qNotes') : '');
  openWA(msg);
});

// Hero: fall back to gradient if the online photo fails
(function () {
  var p = new Image();
  p.onerror = function () { document.getElementById('home').classList.add('no-photo'); };
  p.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=75';
})();

// Fleet images: use the fallback if an online image fails (including failures before this script ran)
document.querySelectorAll('.fleet-img').forEach(function (img) {
  img.addEventListener('error', function () { imgFallback(img); });
  if (img.complete && img.naturalWidth === 0 && img.src !== FALLBACK_IMG) imgFallback(img);
});
