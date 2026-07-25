document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.content-slider');
  const cards = document.querySelectorAll('.card');
  const expandedCard = document.querySelector('.card-expanded');
  const closeBtn = document.querySelector('.card-arrow-close');

  // 1. ПОКОЛОНОЧНАЯ ПРОКРУТКА КОЛЕСОМ НА ПК
  if (slider) {
    let isScrolling = false;

    slider.addEventListener('wheel', (e) => {
      // Запрещаем скролл, если карточка открыта
      if (expandedCard && expandedCard.classList.contains('is-expanded')) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      if (isScrolling) return;

      // Определение направления скролла
      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 10) return;

      isScrolling = true;

      // Длина шага: на 2x2 — 434px (410 + 24), на 2x1 (планшет) — 434px, на мобилке — 325px
      const columnWidth = window.innerWidth <= 1000 ? 325 : 434;
      const direction = delta > 0 ? 1 : -1;

      slider.scrollBy({
        left: direction * columnWidth,
        behavior: 'smooth'
      });

      // Задержка против «дребезга» колесика мыши
      setTimeout(() => {
        isScrolling = false;
      }, 350);
    }, { passive: false });
  }

  // 2. УМНОЕ ОТКРЫТИЕ КАРТОЧКИ (ВЛЕВО ИЛИ ВПРАВО)
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (!expandedCard) return;

      if (window.innerWidth > 1000) {
        const cardOffsetLeft = card.offsetLeft;
        const totalCards = cards.length;
        
        // Для сетки 2х2: узнаем номер колонки (0, 1, 2...)
        // По HTML у нас пары: [0,1], [2,3], [4,5]. Колонка = Math.floor(index / 2)
        const columnIndex = Math.floor(index / 2);
        const totalColumns = Math.ceil(totalCards / 2);

        // Если это последняя колонка — раскрываем карточку ВЛЕВО
        if (columnIndex >= totalColumns - 1 && totalColumns > 1) {
          // Сдвигаем влево на одну ширину плитки + gap (434px)
          expandedCard.style.left = `${cardOffsetLeft - 434}px`;
        } else {
          // Иначе раскрываем вправо
          expandedCard.style.left = `${cardOffsetLeft}px`;
        }
      } else {
        expandedCard.style.left = '';
      }

      // Добавляем класс открытой карточки и блокируем скролл слайдера
      expandedCard.classList.add('is-expanded');
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
      if (slider) {
        slider.classList.remove('is-locked');
      }
    });
  }
});
