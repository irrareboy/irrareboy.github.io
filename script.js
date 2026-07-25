document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.content-slider');
  const cards = document.querySelectorAll('.card');
  const expandedCard = document.querySelector('.card-expanded');
  const closeBtn = document.querySelector('.card-arrow-close');

  // 1. Принудительный скролл колесиком мыши (любое вращение крутит горизонтально)
  if (slider) {
    slider.addEventListener('wheel', (e) => {
      e.preventDefault();
      slider.scrollLeft += e.deltaY + e.deltaX;
    }, { passive: false });
  }

  // 2. Открытие карточки
  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Скрываем маленькую карточку, на которую кликнули (по желанию, или оставляем)
      card.style.display = 'none';
      
      // Показываем большую
      if (expandedCard) {
        expandedCard.classList.add('is-expanded');
        expandedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    });
  });

  // 3. Закрытие карточки
  if (closeBtn && expandedCard) {
    closeBtn.addEventListener('click', () => {
      expandedCard.classList.remove('is-expanded');
      
      // Возвращаем маленькие карточки
      cards.forEach(card => card.style.display = 'flex');
    });
  }
});
