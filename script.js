document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.content-slider');
  const cards = document.querySelectorAll('.card');
  const expandedCard = document.querySelector('.card-expanded');
  const closeBtn = document.querySelector('.card-arrow-close');

  // 1. ПОКОЛОНОЧНЫЙ СКРОЛЛ НА ПК
  if (slider) {
    let isScrolling = false;

    slider.addEventListener('wheel', (e) => {
      // Запрещаем прокрутку галереи, если карточка уже открыта
      if (expandedCard && expandedCard.classList.contains('is-expanded')) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      if (isScrolling) return;

      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 10) return;

      isScrolling = true;

      // Шаг прокрутки: ровно одна колонка (410px + gap 24px)
      const columnStep = window.innerWidth <= 1000 ? 325 : 434;
      const direction = delta > 0 ? 1 : -1;

      slider.scrollBy({
        left: direction * columnStep,
        behavior: 'smooth'
      });

      setTimeout(() => {
        isScrolling = false;
      }, 300);
    }, { passive: false });
  }

  // 2. ОТКРЫТИЕ КАРТОЧКИ
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      if (!expandedCard) return;

      if (window.innerWidth > 1000 && slider) {
        // Находим центр видимой области слайдера с учётом текущего скролла
        const visibleCenterLeft = slider.scrollLeft + (slider.clientWidth / 2);
        
        expandedCard.style.position = 'absolute';
        expandedCard.style.left = `${visibleCenterLeft}px`;
        expandedCard.style.top = '50%';
      } else {
        // На мобилке оставляем fixed по центру экрана
        expandedCard.style.position = '';
        expandedCard.style.left = '';
        expandedCard.style.top = '';
      }

      expandedCard.classList.add('is-expanded');
      document.body.classList.add('has-open-card');
      
      if (slider) {
        slider.classList.add('is-locked');
      }
    });
  });

  // 3. ЗАКРЫТИЕ КАРТОЧКИ
  if (closeBtn && expandedCard) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      expandedCard.classList.remove('is-expanded');
      document.body.classList.remove('has-open-card');
      
      if (slider) {
        slider.classList.remove('is-locked');
      }
    });
  }
});
