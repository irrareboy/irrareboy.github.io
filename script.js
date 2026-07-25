document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.content-slider');
  const cards = document.querySelectorAll('.card');
  const expandedCard = document.querySelector('.card-expanded');
  const closeBtn = document.querySelector('.card-arrow-close');

  // 1. ПЛАВНАЯ И ОБЛЕГЧЕННАЯ ПРОКРУТКА КОЛЕСОМ (ДЛЯ ПК)
  if (slider) {
    slider.addEventListener('wheel', (e) => {
      // Если карточка открыта — запрещаем прокручивать галерею заднего фона
      if (expandedCard && expandedCard.classList.contains('is-expanded')) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const moveDistance = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      
      // Мягкий коэффициент 0.5 вместо 1.2 делает скролл легким и контролируемым
      slider.scrollBy({
        left: moveDistance * 0.5,
        behavior: 'smooth'
      });
    }, { passive: false });
  }

  // 2. ОТКРЫТИЕ КАРТОЧКИ С БЛОКИРОВКОЙ СКРОЛЛА
  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (expandedCard) {
        if (window.innerWidth > 1000) {
          const cardOffsetLeft = card.offsetLeft;
          expandedCard.style.left = `${cardOffsetLeft}px`;
        } else {
          expandedCard.style.left = '';
        }
        
        expandedCard.classList.add('is-expanded');
        
        // Блокируем скролл самого слайдера
        if (slider) {
          slider.style.overflowX = 'hidden';
        }
      }
    });
  });

  // 3. ЗАКРЫТИЕ КАРТОЧКИ И ВОЗВРАТ СКРОЛЛА
  if (closeBtn && expandedCard) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      expandedCard.classList.remove('is-expanded');
      
      // Разблокируем скролл
      if (slider) {
        slider.style.overflowX = 'auto';
      }
    });
  }
});
