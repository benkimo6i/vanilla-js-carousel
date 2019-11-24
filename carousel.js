const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryControlsContainer.innerHTML = '<button class="gallery-controls-previous">Previous</button><button class="gallery-controls-next">Next</button>'

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselArray = [...items];
    this.carouselControls = [...controls]
  }

  // Assign initial css classes for array items
  setInitialState() {
    this.carouselArray[0].classList.add('gallery-item-first');
    this.carouselArray[1].classList.add('gallery-item-previous');
    this.carouselArray[2].classList.add('gallery-item-selected');
    this.carouselArray[3].classList.add('gallery-item-next');
    this.carouselArray[4].classList.add('gallery-item-last');
  }

  // Update the order state of the carousel by removing its initial items and appending the new items from the updated carouselArray
  setCurrentState() {
    console.log(this.carouselArray);
    
    this.carouselContainer.innerHTML = '';

    this.carouselArray.forEach(item => {
      // console.log(item);

      item.classList.remove('gallery-item-first', 'gallery-item-previous', 'gallery-item-selected', 'gallery-item-next', 'gallery-item-last');
      this.setInitialState();
      this.carouselContainer.appendChild(item);
    });
  }
 
  // Update the order of array upon selection
  setUpdatedArray() {
    // this.carouselArray.forEach(item => {
    //   item.addEventListener('click', () => {
    //     const selected = item;
    //     const previous = selected.previousElementSibling;
    //     const next = selected.nextElementSibling;
    //     const first = previous.previousElementSibling;
    //     const last = next.nextElementSibling;

    //     console.log(selected);
    //     console.log(this.carouselArray)
    //   });
    // });

    this.carouselControls.forEach(control => {
      control.addEventListener('click', () => {
        const selected = control;

        if (selected.className == 'gallery-controls-previous') {
          const [first, ...rest] = this.carouselArray;
          this.carouselArray = [...rest, first];

          this.setCurrentState();
        } else {
          const [last, ...rest] = this.carouselArray;
          this.carouselArray = [...rest, last];

          this.setCurrentState();
        }
      });
    });
    
  }
}

window.addEventListener('DOMContentLoaded', (e) => {
  const galleryControls = galleryControlsContainer.childNodes;
  const appleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

  appleCarousel.setInitialState();
  appleCarousel.setUpdatedArray();
});
