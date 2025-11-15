/* main.js
   - Filtragem do cardápio
   - Ativar botão de filtro
   - Preencher ano no rodapé
   - Simular envio do formulário de contato
   - Carregar navbar/footer dinamicamente
   - Marcar item ativo da navbar (compatível com Netlify)
*/

document.addEventListener('DOMContentLoaded', function () {

  /* ========================
        ANO AUTOMÁTICO
  ==========================*/
  const year = new Date().getFullYear();
  const spans = ['year','year2','year3'];
  spans.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
  });


  /* ========================
         FILTRO DO CARDÁPIO
  ==========================*/
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        filterMenu(filter);
      });
    });
  }

  function filterMenu(filter) {
    const categories = document.querySelectorAll('.menu-category');
    categories.forEach(cat => {
      const catName = cat.getAttribute('data-category') || 'all';
      cat.style.display = (filter === 'all' || filter === catName) ? '' : 'none';
    });
  }

  // Mostrar tudo inicialmente
  filterMenu('all');


  /* ========================
        FORM DE CONTATO
  ==========================*/
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const alertBox = document.getElementById('contactAlert');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.className = 'alert alert-success';
        alertBox.textContent = 'Mensagem enviada! Em breve retornamos.';
        setTimeout(() => {
          alertBox.style.display = 'none';
          contactForm.reset();
        }, 3000);
      }
    });
  }

});


function makeAbsolutePaths(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  // imagens
  container.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src') || '';
    if (src && !src.startsWith('/') && !src.startsWith('http')) {
      img.src = '/' + src.replace(/^(\.\/|\/?)/, '');
    }
  });

  // links CSS/JS etc (caso você use link/script dentro do fragmento)
  container.querySelectorAll('link, a, script').forEach(el => {
    const attr = el.tagName.toLowerCase() === 'a' ? 'href' : 'src';
    const val = el.getAttribute(attr);
    if (val && !val.startsWith('/') && !val.startsWith('http') && !val.startsWith('#')) {
      el.setAttribute(attr, '/' + val.replace(/^(\.\/|\/?)/, ''));
    }
  });
}

function loadHTML(selector, url) {
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
      return res.text();
    })
    .then(html => {
      document.querySelector(selector).innerHTML = html;
      // normaliza paths dentro do fragmento inserido
      makeAbsolutePaths(selector);

      // atualiza ano no footer (caso haja)
      const yearEl = document.querySelector('#year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();

      // marca link ativo se for a navbar
      if (selector === '#navbar-placeholder') {
        setActiveNavLink();
      }
    })
    .catch(err => console.error(`Erro ao carregar ${url}:`, err));
}


/* ================================
         NAVBAR ATIVA
   Compatível com Netlify:
   - /cardapio
   - /cardapio.html
=================================*/
function setActiveNavLink() {
  let path = window.location.pathname;

  // Remove "/" final (ex: "/cardapio/")
  path = path.replace(/\/$/, "");

  // pega só o final da rota
  let current = path.split('/').pop();  // cardapio, contato, index

  // Se estiver vazio → index
  if (current === "") current = "index";

  // Remove .html caso exista
  current = current.replace(".html", "");

  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(link => {
    link.classList.remove('active');

    let linkHref = link.getAttribute('href')
      .replace(".html", "")
      .replace("/", "");

    if (linkHref === "") linkHref = "index";

    if (linkHref === current) {
      link.classList.add('active');
    }
  });
}


/* ================================
      INICIAR CARREGAMENTO
=================================*/
document.addEventListener('DOMContentLoaded', () => {
  loadHTML('#navbar-placeholder', 'navbar.html');
  loadHTML('#footer-placeholder', 'footer.html');
});
