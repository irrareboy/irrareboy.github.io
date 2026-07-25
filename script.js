document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.content-slider');
  const cards = document.querySelectorAll('.card');
  const expandedCard = document.querySelector('.card-expanded');
  const closeBtn = document.querySelector('.card-arrow-close');

  // 1. ПРОКРУТКА КОЛЕСОМ (ДЛЯ ПК)
  if (slider) {
    slider.addEventListener('wheel', (e) => {
      e.preventDefault();
      const moveDistance = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      slider.scrollLeft += moveDistance * 1.2;
    }, { passive: false });
  }

  // 2. ОТКРЫТИЕ КАРТОЧКИ
  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (expandedCard) {
        if (window.innerWidth > 1000) {
          // На десктопе ставим на место конкретной плитки
          const cardOffsetLeft = card.offsetLeft;
          expandedCard.style.left = `${cardOffsetLeft}px`;
        } else {
          // На мобилке ПОЛНОСТЬЮ очищаем инлайновый left, чтобы работал CSS left: 50%
          expandedCard.style.left = '';
        }
        
        expandedCard.classList.add('is-expanded');
      }
    });
  });

  // 3. ЗАКРЫТИЕ КАРТОЧКИ
  if (closeBtn && expandedCard) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      expandedCard.classList.remove('is-expanded');
    });
  }
});
