document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.content-slider');
  const cards = document.querySelectorAll('.card');
  const expandedCard = document.querySelector('.card-expanded');
  const closeBtn = document.querySelector('.card-arrow-close');

  // 1. НАДЕЖНАЯ ПРОКРУТКА КОЛЕСИКОМ
  if (slider) {
    slider.addEventListener('wheel', (e) => {
      // Предотвращаем стандартный скролл страницы
      e.preventDefault();
      
      // Направление прокрутки (deltaY — вертикальное колесико)
      const moveDistance = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      
      // Плавно смещаем скролл слайдера
      slider.scrollLeft += moveDistance * 1.2;
    }, { passive: false });
  }

  // 2. РАСКРЫТИЕ ПЛИТКИ НА МЕСТЕ КЛИКА
  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (expandedCard) {
        // Проверяем, десктоп ли это (ширина экрана больше 1000px)
        if (window.innerWidth > 1000) {
          const cardOffsetLeft = card.offsetLeft;
          expandedCard.style.left = `${cardOffsetLeft}px`;
        } else {
          // На мобилке сбрасываем инлайновый left, чтобы работал CSS fixed
          expandedCard.style.left = '';
        }
        
        expandedCard.classList.add('is-expanded');
      }
    });
  });

  // 3. ЗАКРЫТИЕ ПЛИТКИ
  if (closeBtn && expandedCard) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      expandedCard.classList.remove('is-expanded');
    });
  }
});
