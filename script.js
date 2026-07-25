document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.content-slider');
  const cards = document.querySelectorAll('.card');
  const expandedCard = document.querySelector('.card-expanded');
  const closeBtn = document.querySelector('.card-arrow-close');

  // --- ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ КОЛЕСОМ ---
  if (slider) {
    slider.addEventListener('wheel', (e) => {
      // Если прокрутка идет по вертикали (обычное колесо)
      if (e.deltaY !== 0) {
        e.preventDefault();
        slider.scrollBy({
          left: e.deltaY * 1.5, // Множитель для приятной скорости
          behavior: 'smooth'
        });
      }
    }, { passive: false });
  }

  // --- РАСКРЫТИЕ ПЛИТКИ ---
  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (expandedCard) {
        // Смещаем большую карточку к тому месту, где стояла нажатая плитка
        const cardLeft = card.offsetLeft;
        expandedCard.style.left = `${cardLeft}px`;

        expandedCard.classList.add('is-expanded');
      }
    });
  });

  // --- ЗАКРЫТИЕ ПЛИТКИ ---
  if (closeBtn && expandedCard) {
    closeBtn.addEventListener('click', () => {
      expandedCard.classList.remove('is-expanded');
    });
  }
});
