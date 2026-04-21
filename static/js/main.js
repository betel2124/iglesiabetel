// Iglesia Betel main.js

document.addEventListener('DOMContentLoaded', function () {
  function buildContactMessage() {
    const nameInput = document.getElementById('cta-contact-name');
    const messageInput = document.getElementById('cta-contact-message');
    const name = nameInput ? nameInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';
    const parts = [];

    if (name) {
      parts.push('Nombre: ' + name);
    }

    if (message) {
      parts.push('Mensaje: ' + message);
    }

    if (parts.length === 0) {
      parts.push('Mensaje: Quiero hacer una consulta.');
    }

    return {
      name: name,
      text: parts.join('\n')
    };
  }

  function extractHandle(url) {
    if (!url) return '';
    try {
      const parsed = new URL(url);
      return parsed.pathname.replace(/^\/+|\/+$/g, '').split('/')[0] || '';
    } catch (error) {
      return '';
    }
  }

  document.querySelectorAll('.js-contact-channel').forEach(link => {
    link.addEventListener('click', event => {
      const channel = link.dataset.channel || '';
      const contact = buildContactMessage();
      const whatsapp = link.dataset.whatsapp || '';
      const email = link.dataset.email || '';
      const instagram = link.dataset.instagram || '';
      const facebook = link.dataset.facebook || '';
      let href = link.getAttribute('href') || '#';

      if (channel === 'whatsapp' && whatsapp) {
        href = 'https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(contact.text);
      } else if (channel === 'email' && email) {
        const subject = contact.name ? 'Contacto web ' + contact.name : 'Contacto web';
        href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(contact.text);
      } else if (channel === 'instagram' && instagram) {
        const handle = extractHandle(instagram);
        href = handle ? 'https://ig.me/m/' + handle + '?text=' + encodeURIComponent(contact.text) : instagram;
      } else if (channel === 'facebook' && facebook) {
        const handle = extractHandle(facebook);
        href = handle ? 'https://m.me/' + handle + '?ref=' + encodeURIComponent(contact.text) : facebook;
      }

      if (!href || href === '#') {
        event.preventDefault();
        return;
      }

      link.setAttribute('href', href);

      if (channel === 'whatsapp' || channel === 'instagram' || channel === 'facebook') {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
      }
    });
  });

  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      mobile.classList.toggle('open');
      toggle.classList.toggle('open');
    });
  }

  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

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
