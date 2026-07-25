document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.content-slider');
  const cards = document.querySelectorAll('.card');
  const overlay = document.querySelector('.expanded-overlay');
  const closeBtn = document.querySelector('.card-arrow-close');

  // 1. Принудительный скролл колесиком (без Shift)
  if (slider) {
    slider.addEventListener('wheel', (e) => {
      // Предотвращаем стандартный вертикальный скролл страницы
      e.preventDefault();
      
      // Перенаправляем вектор прокрутки
      const delta = e.deltaY || e.deltaX;
      slider.scrollLeft += delta * 1.2;
    }, { passive: false });
  }

  // 2. Открытие всплывающей модалки при клике на любую карточку
  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (overlay) {
        overlay.classList.add('is-active');
      }
    });
  });

  // 3. Закрытие по крестику или клику по темному фону
  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('is-active');
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('is-active');
      }
    });
  }
});
