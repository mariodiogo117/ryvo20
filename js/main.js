(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const year = document.querySelector('#year');
  year.textContent = new Date().getFullYear();

  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
    mobileNav.hidden = open;
    document.body.classList.toggle('menu-open', !open);
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    mobileNav.hidden = true;
    document.body.classList.remove('menu-open');
  }));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const glow = document.querySelector('.cursor-glow');
  if (window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', event => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  const tabs = document.querySelectorAll('[role="tab"]');
  const profileInput = document.querySelector('input[name="perfil"]');
  const mainForm = document.querySelector('.main-form');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(item => item.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');
    const role = tab.dataset.role;
    profileInput.value = role;
    mainForm.dataset.subject = `${role} — contacto RYVO`;
    document.querySelector('#message').placeholder = role === 'Organizador'
      ? 'Conta-nos que tipo de torneio queres organizar'
      : `Conta-nos brevemente o que procuras como ${role.toLowerCase()}`;
  }));

  document.querySelectorAll('.js-mail-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const lines = [];
      data.forEach((value, key) => {
        if (value) lines.push(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`);
      });
      const subject = form.dataset.subject || 'Contacto através de ryvo.pt';
      const status = form.querySelector('.submit-status');
      if (status) status.textContent = 'A abrir a tua aplicação de e-mail…';
      window.location.href = `mailto:geral@ryvo.pt?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    });
  });
})();
