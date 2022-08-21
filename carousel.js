'use strict';

class Carousel {
  constructor(el) {
    this.el = el;
    this.carouselContainer = this.el.querySelector('.carousel-container');
    this.carouselControls = this.el.querySelector('.carousel-controls');
    this.carouselOptions = ['previous', 'add', 'play', 'next'];
    this.carouselData = [
      {
        'name': 'item-1',
        'src': 'http://fakeimg.pl/300/?text=1',
      },
      {
        'name': 'item-2',
        'src': 'http://fakeimg.pl/300/?text=2',
      },
      {
        'name': 'item-3',
        'src': 'http://fakeimg.pl/300/?text=3',
      },
      {
        'name': 'item-4',
        'src': 'http://fakeimg.pl/300/?text=4',
      },
      {
        'name': 'item-5',
        'src': 'http://fakeimg.pl/300/?text=5',
      }
    ];
    this.carouselArray = [...this.carouselData];

  }

  // Setup methods
  mounted() {
    this.setupCarousel();
    // this.setControls();
    // this.setNav();
    // this.useControls(); 
  }

  // Build carousel html
  setupCarousel() {
    const container = document.createElement('div');
    const controls = document.createElement('div');

    // Add container for carousel items and controls
    this.el.append(container, controls);
    // Add class selectors
    container.className = 'carousel-container';
    controls.className = 'carousel-controls';

    // Take dataset array and append carousel items to container
    this.carouselArray.forEach((item, index) => {
      const carouselItem = item.src ? document.createElement('img') : document.createElement('div');

      container.append(carouselItem);
      
      // Add item attributes
      carouselItem.className = `carousel-item carousel-item-${index + 1}`;
      carouselItem.src = item.src;
      // To show items in view using data-index, max 5 items shown, min 5 items required
      carouselItem.setAttribute('data-index', `${index + 1}`);
    });

    this.carouselOptions.forEach((option) => {
      const btn = document.createElement('button');

      // Add carousel control options
      controls.append(btn);
      btn.className = `carousel-controls-${option}`;
      btn.innerText = option;
    });

  }

  // Update css classes for carousel
  updatecarousel() {
    this.carouselArray.forEach(el => {
      el.classList.remove('carousel-item-1');
      el.classList.remove('carousel-item-2');
      el.classList.remove('carousel-item-3');
      el.classList.remove('carousel-item-4');
      el.classList.remove('carousel-item-5');
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`carousel-item-${i+1}`);
    });
  }

  // Update the current order of the carouselArray and carousel
  setCurrentState(direction) {

    if (direction.className == 'carousel-controls-previous') {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }
    
    this.updatecarousel();
  }

  // Construct the carousel navigation
  // setNav() {
    // carouselContainer.appendChild(document.createElement('ul')).className = 'carousel-nav';

    // this.carouselArray.forEach(item => {
    //   const nav = carouselContainer.lastElementChild;
    //   nav.appendChild(document.createElement('li'));
    // }); 
  // }s
 
  // Add a click event listener to trigger setCurrentState method to rearrange carousel
  useControls() {
    const triggers = [...this.carouselControls.children];

    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();

        if (control.className == 'carousel-controls-add') {
          const newItem = document.createElement('img');
          const latestItem = this.carouselArray.length;
          const latestIndex = this.carouselArray.findIndex(item => item.getAttribute('data-index') == this.carouselArray.length)+1;

          // Assign the necessary properties for new carousel item
          Object.assign(newItem,{
            className: 'carousel-item',
            src: `http://fakeimg.pl/300/?text=${this.carouselArray.length+1}`
          });
          newItem.setAttribute('data-index', this.carouselArray.length+1);

          // Then add it to the carouselArray and update the carousel
          this.carouselArray.splice(latestIndex, 0, newItem);
          document.querySelector(`[data-index="${latestItem}"]`).after(newItem);
          this.updatecarousel();

        } else {
          this.setCurrentState(control);
        }

      });
    });
  }
}

// Refers to the carousel element you want to target
const el = document.querySelector('.carousel');
// Create carousel object and setup methods
const exampleCarousel = new Carousel(el).mounted();
