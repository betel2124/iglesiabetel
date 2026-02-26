// Iglesia Betel — main.js

// ── Site timezone (Buenos Aires). Used for "próximamente" filtering by client date.
function getSiteTimezone() {
  const body = document.body;
  return (body && body.getAttribute('data-timezone')) || 'America/Argentina/Buenos_Aires';
}

// Today's date (YYYY-MM-DD) in the site timezone, based on client's current time.
function getTodayInSiteTz() {
  const tz = getSiteTimezone();
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' });
  const parts = formatter.formatToParts(now);
  const y = parts.find(p => p.type === 'year').value;
  const m = parts.find(p => p.type === 'month').value;
  const d = parts.find(p => p.type === 'day').value;
  return y + '-' + m + '-' + d;
}

// ── Home: filter "Próximos eventos" by client date in site timezone ─────────────────
function filterEventosHome() {
  const grid = document.querySelector('.js-eventos-home-grid');
  const noEventos = document.querySelector('.js-no-eventos-home');
  if (!grid || !noEventos) return;
  const cards = grid.querySelectorAll('.evento-card[data-date]');
  const today = getTodayInSiteTz();
  const maxVisible = parseInt(grid.getAttribute('data-max-visible') || '3', 10);
  let visible = 0;
  cards.forEach((card, i) => {
    const date = card.getAttribute('data-date') || '';
    const isUpcoming = date >= today;
    if (isUpcoming && visible < maxVisible) {
      card.style.display = '';
      visible++;
    } else {
      card.style.display = 'none';
    }
  });
  if (visible === 0) {
    grid.style.display = 'none';
    noEventos.style.display = 'block';
  } else {
    grid.style.display = '';
    noEventos.style.display = 'none';
  }
}

// ── Eventos page: distribute cards to Próximamente / Historial by client date ─────
function filterEventosPage() {
  const container = document.getElementById('eventos-all');
  const proximosGrid = document.getElementById('eventos-proximos-grid');
  const pasadosGrid = document.getElementById('historialGrid');
  const noEventosProximos = document.querySelector('.js-no-eventos-proximos');
  const countEl = document.getElementById('eventos-pasados-count');
  const pasadosSection = document.getElementById('eventos-pasados-section');
  if (!container || !proximosGrid || !pasadosGrid) return;
  const cards = Array.from(container.querySelectorAll('.ev-card[data-date]'));
  const today = getTodayInSiteTz();
  const proximos = cards.filter(c => (c.getAttribute('data-date') || '') >= today);
  const pasados = cards.filter(c => (c.getAttribute('data-date') || '') < today);
  proximos.sort((a, b) => (a.getAttribute('data-date') || '').localeCompare(b.getAttribute('data-date') || ''));
  pasados.sort((a, b) => (b.getAttribute('data-date') || '').localeCompare(a.getAttribute('data-date') || ''));
  proximos.forEach(c => {
    const top = c.querySelector('.ev-card-top');
    if (top) top.classList.remove('realizado');
    proximosGrid.appendChild(c);
  });
  pasados.forEach(c => {
    const top = c.querySelector('.ev-card-top');
    if (top) top.classList.add('realizado');
    pasadosGrid.appendChild(c);
  });
  if (noEventosProximos) {
    noEventosProximos.style.display = proximos.length === 0 ? 'block' : 'none';
  }
  if (countEl) countEl.textContent = pasados.length;
  if (pasadosSection) pasadosSection.style.display = pasados.length === 0 ? 'none' : '';
}

// ── Nav mobile toggle ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {

  // Run client-side eventos filtering (home and /eventos/ page)
  filterEventosHome();
  if (document.getElementById('eventos-all')) filterEventosPage();

  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      mobile.classList.toggle('open');
      // animate hamburger
      toggle.classList.toggle('open');
    });
  }

  // ── FAQ accordion ────────────────────────────────────────────
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ── Filtros de predicaciones (client-side) ───────────────────
  // Each filter button has data-filter="serie-slug" or data-filter="all"
  // Each pred-row has data-serie="serie-slug" and data-tags="tag1,tag2"
  document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.dataset.filter || 'all';
      const rows = document.querySelectorAll('[data-serie]');

      rows.forEach(row => {
        if (filter === 'all') {
          row.style.display = '';
        } else {
          const serie = row.dataset.serie || '';
          const tags = row.dataset.tags || '';
          const match = serie === filter || tags.includes(filter);
          row.style.display = match ? '' : 'none';
        }
      });
    });
  });

  // ── Netlify Identity redirect ────────────────────────────────
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on('init', user => {
      if (!user) {
        window.netlifyIdentity.on('login', () => {
          document.location.href = '/admin/';
        });
      }
    });
  }

});
