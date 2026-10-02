/* ============================================================
   SW SUPPLY & SERVICES C.A. — JavaScript global
   Nav · menú móvil · reveal · contadores · formulario · galería
   ============================================================ */
(function () {
  'use strict';

  var WA_NUMBER = '584148396308';
  var EMAIL = 'info@swsecuritygroups.com';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── NAV: fondo sólido al hacer scroll ─── */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── NAV: menú móvil accesible ─── */
  var burger = document.querySelector('.nav-burger');
  var mobileMenu = document.getElementById('nav-mobile');
  if (burger && mobileMenu) {
    var setMenu = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      mobileMenu.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
    };
    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) { setMenu(false); burger.focus(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1080 && mobileMenu.classList.contains('open')) setMenu(false);
    });
  }

  /* ─── AÑO EN FOOTER ─── */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ─── SCROLL REVEAL ─── */
  var revs = document.querySelectorAll('.rev');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('vis'); revealObs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revs.forEach(function (el) { revealObs.observe(el); });
  } else {
    revs.forEach(function (el) { el.classList.add('vis'); });
  }

  /* ─── CONTADORES ─── */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window && !reduceMotion) {
    var fmt = function (n) { return n.toLocaleString('en-US'); };
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseFloat(el.dataset.count);
        var start = null;
        var step = function (ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 1400, 1);
          var ease = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(Math.floor(ease * target));
          if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(target);
        };
        requestAnimationFrame(step);
        countObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countObs.observe(el); });
  }

  /* ─── FORMULARIO DE CONTACTO ─── */
  var form = document.getElementById('sw-contact-form');
  if (form) {
    var status = document.getElementById('form-status');

    // Preseleccionar servicio desde la URL: contacto.html?servicio=coiled-tubing
    var params = new URLSearchParams(location.search);
    var pre = params.get('servicio');
    var sel = form.querySelector('#servicio');
    if (pre && sel && sel.querySelector('option[value="' + pre.replace(/[^a-z-]/g, '') + '"]')) sel.value = pre;

    var validate = function (field) {
      var group = field.closest('.form-group');
      if (!group) return true;
      var v = field.value.trim();
      var valid = true;
      if (field.required && !v) valid = false;
      if (valid && field.type === 'email' && v) valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
      if (valid && field.type === 'tel' && v) valid = /^[\d\s+\-().]{7,}$/.test(v);
      group.classList.toggle('has-error', !valid);
      field.setAttribute('aria-invalid', String(!valid));
      return valid;
    };

    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (field) {
      field.addEventListener('blur', function () { validate(field); });
      field.addEventListener('input', function () { if (field.closest('.has-error')) validate(field); });
      field.addEventListener('change', function () { if (field.closest('.has-error')) validate(field); });
    });

    var summary = function () {
      var d = new FormData(form);
      var extras = d.getAll('adicional[]').join(', ');
      var lines = [
        'Solicitud de servicio — SW Supply & Services',
        'Nombre: ' + (d.get('nombre') || ''),
        'Cargo: ' + (d.get('cargo') || ''),
        'Empresa: ' + (d.get('empresa') || ''),
        'Email: ' + (d.get('email') || ''),
        'Teléfono: ' + (d.get('telefono') || ''),
        'Servicio: ' + (sel && sel.selectedIndex > 0 ? sel.options[sel.selectedIndex].text : ''),
        extras ? 'Adicionales: ' + extras : '',
        d.get('campo') ? 'Campo / pozo: ' + d.get('campo') : '',
        d.get('urgencia') ? 'Prioridad: ' + d.get('urgencia') : '',
        'Descripción: ' + (d.get('descripcion') || '')
      ];
      return lines.filter(Boolean).join('\n');
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      form.querySelectorAll('[required]').forEach(function (field) {
        if (!validate(field) && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      var btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.classList.add('loading');
      var text = summary();

      var endpoint = form.getAttribute('action');
      var configured = endpoint && endpoint.indexOf('YOUR_FORM_ID') === -1;

      var fail = function () {
        btn.disabled = false;
        btn.classList.remove('loading');
        if (!status) return;
        var wa = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
        var mail = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Solicitud de servicio a pozo') + '&body=' + encodeURIComponent(text);
        status.className = 'form-status error';
        status.innerHTML =
          '<p><strong>No pudimos enviar el formulario en este momento.</strong> Sus datos no se han perdido: envíelos con un clic por WhatsApp o correo.</p>' +
          '<div class="btn-row"><a class="btn btn-wa" target="_blank" rel="noopener" href="' + wa + '">Enviar por WhatsApp</a>' +
          '<a class="btn btn-outline" href="' + mail + '">Enviar por correo</a></div>';
        status.setAttribute('tabindex', '-1');
        status.focus();
      };

      if (!configured) { fail(); return; }

      fetch(endpoint, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form) })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          form.reset();
          form.hidden = true;
          if (status) {
            status.className = 'form-status success';
            status.innerHTML =
              '<svg width="44" height="44" viewBox="0 0 40 40" fill="none" aria-hidden="true"><circle cx="20" cy="20" r="19" stroke="#FF6600" stroke-width="1.5"/><path d="M12 20l6 6 10-12" stroke="#FF6600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
              '<h3>Solicitud recibida</h3>' +
              '<p>Nuestro equipo de operaciones revisará su requerimiento y le contactará en menos de 24 horas hábiles. ' +
              'Si su caso es una <strong>emergencia operacional</strong>, llámenos ahora al <a href="tel:+584148396308">0414-839.6308</a>.</p>';
            status.setAttribute('tabindex', '-1');
            status.focus();
          }
        })
        .catch(fail);
    });
  }

  /* ─── GALERÍA: filtros + lightbox ─── */
  var grid = document.getElementById('gal-grid');
  if (grid) {
    var items = Array.prototype.slice.call(grid.querySelectorAll('.gal-item'));
    var btns = document.querySelectorAll('.filter-btn');
    var count = document.getElementById('filter-count');
    var updateCount = function () {
      var n = items.filter(function (i) { return !i.hidden; }).length;
      if (count) count.textContent = n + (n === 1 ? ' foto' : ' fotos');
      btns.forEach(function (b) {
        var f = b.dataset.filter;
        if (f !== 'all') b.hidden = !items.some(function (i) { return i.dataset.cat === f; });
      });
    };

    // Ocultar imágenes externas que no carguen
    items.forEach(function (item) {
      var img = item.querySelector('img');
      var drop = function () { item.remove(); items.splice(items.indexOf(item), 1); updateCount(); };
      if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) drop();
      else img.addEventListener('error', drop);
    });

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        var f = btn.dataset.filter;
        items.forEach(function (item) { item.hidden = !(f === 'all' || item.dataset.cat === f); });
        updateCount();
      });
    });
    updateCount();

    var lb = document.getElementById('lightbox');
    var lbImg = document.getElementById('lb-img');
    var lbCap = document.getElementById('lb-caption');
    var lbCtr = document.getElementById('lb-counter');
    var current = 0, active = [], lastFocus = null;

    var show = function (idx) {
      var item = active[idx];
      if (!item) return;
      var img = item.querySelector('img');
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      var cap = item.querySelector('.tile-cap p');
      lbCap.textContent = cap ? cap.textContent : img.alt;
      lbCtr.textContent = (idx + 1) + ' / ' + active.length;
    };
    var open = function (item) {
      active = items.filter(function (i) { return !i.hidden; });
      current = active.indexOf(item);
      lastFocus = document.activeElement;
      show(current);
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.getElementById('lb-close').focus();
    };
    var close = function () {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lbImg.removeAttribute('src');
      if (lastFocus) lastFocus.focus();
    };
    var prev = function () { current = (current - 1 + active.length) % active.length; show(current); };
    var next = function () { current = (current + 1) % active.length; show(current); };

    items.forEach(function (item) { item.addEventListener('click', function () { open(item); }); });
    document.getElementById('lb-close').addEventListener('click', close);
    document.getElementById('lb-prev').addEventListener('click', prev);
    document.getElementById('lb-next').addEventListener('click', next);
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Tab') {
        var f = lb.querySelectorAll('button');
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    var tx = 0;
    lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) { if (dx < 0) next(); else prev(); }
    });
  }
})();
