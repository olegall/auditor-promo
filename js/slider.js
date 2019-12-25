'use strict';

function slider (wrapper,buttonControlRight) {
  const sliderItems = wrapper.
                      children, 
        sliderTitle = wrapper.
                      parentNode.
                      children[0],
        //sliderControls = document.querySelectorAll(buttonControls);
        sliderControls = wrapper.
                         parentNode.
                         children[2].
                         children;
  let positionLeftItem,
      itemsNumber,
      transform;
  positionLeftItem = itemsNumber = transform = 0;
  wrapper.parentNode.children[0].innerText = wrapper.children[0].attributes[1].value;

  let wrapperWidth = parseFloat(getComputedStyle(wrapper).width), // ширина обёртки
      itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width), // ширина одного элемента    
      // значение трансформации .slider-wrapper
      step = itemWidth / wrapperWidth * 100, // величина шага (для трансформации)
      items = []; // массив элементов

    for(let i = 0; i < sliderItems.length; i++) {
        items.push({ item : sliderItems[i], position: i, transform: 0 });
    }

    let position = {
      getItemMin: function () {
        let indexItem = 0;
        items.forEach(function (item, index) {
          if (item.position < items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        let indexItem = 0;
          items.forEach(function (item, index) {
            if (item.position > items[indexItem].position) {
              indexItem = index;
            }
          });
        return indexItem;
      },
      getMin: function () {
        return items[position.getItemMin()].position;
      },
      getMax: function () {
        return items[position.getItemMax()].position;
      }
    }

    let transformItem = function (direction) {
      let nextItem;
      if (direction === 'right') {
        positionLeftItem++;
        itemsNumber++;
        if(itemsNumber < sliderItems.length && itemsNumber >= 0) 
          sliderTitle.innerText = sliderItems[itemsNumber].attributes[1].value;

        if ((positionLeftItem + wrapperWidth / itemWidth - 1) > position.getMax()) {
          nextItem = position.getItemMin();
          items[nextItem].position = position.getMax() + 1;
          items[nextItem].transform += items.length * 100;
          items[nextItem].item.style.transform = `translateX(${items[nextItem].transform}%)`;
        }

        if(itemsNumber > sliderItems.length - 1 && itemsNumber >= 0) {
          itemsNumber = 0;
          sliderTitle.innerText = sliderItems[itemsNumber].attributes[1].value;
        }
        transform -= step;
      }

      if (direction === 'left') {
        positionLeftItem--;
        itemsNumber--;
        if(itemsNumber < sliderItems.length && itemsNumber < 0) {
          itemsNumber = sliderItems.length - 1;
          sliderTitle.innerText = sliderItems[itemsNumber].attributes[1].value;
        }

        if(itemsNumber < sliderItems.length && itemsNumber >= 0) {
          sliderTitle.innerText = sliderItems[itemsNumber].attributes[1].value;
        }

        if (positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          items[nextItem].position = position.getMin() - 1;
          items[nextItem].transform -= items.length * 100;
          items[nextItem].item.style.transform = `translateX(${items[nextItem].transform}%)`;
        }
        transform += step;
      }

      wrapper.style.transform = `translateX(${transform}%)`;
    }

    // обработчик события click для кнопок "назад" и "вперед"
    let controlClick = function (e) {
      var direction = this.classList.contains(buttonControlRight) ? 'right' : 'left';
      e.preventDefault();
      transformItem(direction);
    };

    let setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обработчика controlClick для события click
      for(let i = 0; i < sliderControls.length; i++) {
        sliderControls[i].addEventListener('click', controlClick);
      }
    }

    // инициализация
    setUpListeners();

    return {
      right: function () { // метод right
        transformItem('right');
      },
      left: function () { // метод left
        transformItem('left');
      }
    }

  }

let sliders = document.querySelectorAll('.slider-wrapper');
for(let i = 0; i < sliders.length; i++) {
  slider(sliders[i], 'slider-control-right')
}