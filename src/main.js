/* main.js
   - Filtragem de categorias do cardápio
   - Ativa botão de filtro
   - Preenche ano no rodapé
   - Simula envio do form de contato (você pode integrar com backend / email / webhook)
*/

document.addEventListener('DOMContentLoaded', function () {
  // preencher ano nos pés de página
  const year = new Date().getFullYear();
  const spans = ['year','year2','year3'];
  spans.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = year;
  });

  // FILTRO DO CARDÁPIO
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // ativa visual
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
      if (filter === 'all' || filter === catName) {
        cat.style.display = ''; // mostra
      } else {
        cat.style.display = 'none';
      }
    });
  }

  // Inicial: mostrar tudo
  filterMenu('all');

  // FORMULÁRIO DE CONTATO (simples)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const alertBox = document.getElementById('contactAlert');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulação de envio - aqui você pode integrar com fetch() para sua API
      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.className = 'alert alert-success';
        alertBox.textContent = 'Mensagem enviada! Em breve retornamos pelo seu contato.';
        setTimeout(() => { alertBox.style.display = 'none'; contactForm.reset(); }, 3000);
      }
    });
  }
});
// main.js ou um script no final do body
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop(); // pega o nome do arquivo atual
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if(linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
