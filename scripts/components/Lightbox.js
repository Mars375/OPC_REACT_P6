import { createElement } from "../utils/createElement.js";
import { MediaFactory } from "../factories/MediaFactory.js";

export class Lightbox {
  constructor(medias, index, container) {
    this._medias = medias;
    this._index = index;
    this.$container = document.querySelector(container);
    this.$lightbox = null;
    this.$lightboxClose = null;
    this.$lightboxPrev = null;
    this.$lightboxNext = null;
    this.$lightboxMediaContent = null;
  }

  // Create the lightbox structure
  createLightbox() {
    this.$lightbox = createElement('div', {
      class: 'lightbox',
      dataset: {
        index: this._index,
      },
    });

    const $lightboxModal = createElement('div', {
      class: 'lightbox__modal',
    });

    this.$lightboxClose = createElement('button', {
      class: 'lightbox__close',
    });

    const $lightboxCloseIcon = createElement('i', {
      class: 'fas fa-times',
      'aria-label': 'Close the lightbox',
    });

    const $lightboxContent = createElement('div', {
      class: 'lightbox__content',
    });

    const $lightboxMedia = createElement('div', {
      class: 'lightbox__caption',
    });

    this.$lightboxMediaContent = new MediaFactory(this._medias[this._index]).createComponent();
    this.$lightboxMediaContent.controls = true;

    this.$lightboxPrev = createElement('button', {
      class: 'lightbox__prev',
    });

    const $lightboxPrevIcon = createElement('i', {
      class: 'fas fa-chevron-left',
      'aria-label': 'Previous caption'
    })

    this.$lightboxNext = createElement('button', {
      class: 'lightbox__next',
    });

    const $lightboxNextIcon = createElement('i', {
      class: 'fas fa-chevron-right',
      'aria-label': 'Next caption'
    })

    $lightboxMedia.append(this.$lightboxMediaContent);
    this.$lightboxPrev.append($lightboxPrevIcon);
    this.$lightboxNext.append($lightboxNextIcon);
    $lightboxContent.append(this.$lightboxPrev, $lightboxMedia, this.$lightboxNext, this.$lightboxClose);
    this.$lightboxClose.append($lightboxCloseIcon);
    $lightboxModal.appendChild($lightboxContent);
    this.$lightbox.appendChild($lightboxModal);

    return this.$lightbox;
  }

  // Update the content of the lightbox media
  updateMediaContent() {
    this.$lightboxMediaContent = new MediaFactory(this._medias[this._index]).createComponent();
    this.$lightboxMediaContent.controls = true;

    const $lightboxMedia = this.$lightbox.querySelector('.lightbox__caption');
    $lightboxMedia.innerHTML = '';
    $lightboxMedia.append(this.$lightboxMediaContent);
  }

  // Navigate to the previous or next media
  navigate(indexDiff) {
    this._index = (this._index + indexDiff + this._medias.length) % this._medias.length;
    this.updateMediaContent();
  }

  // Initialize event listeners for the lightbox
  initEventListeners() {
    this.$lightboxClose.addEventListener('click', () => {
      this.$lightbox.remove();
    });

    this.$lightboxPrev.addEventListener('click', () => {
      this.navigate(-1);
    });

    this.$lightboxNext.addEventListener('click', () => {
      this.navigate(1);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.$lightbox.remove();
      }
      if (event.key === 'ArrowLeft') {
        this.navigate(-1);
      }
      if (event.key === 'ArrowRight') {
        this.navigate(1);
      }
    });

    this.$lightbox.addEventListener('click', (event) => {
      if (event.target === this.$lightbox) {
        this.$lightbox.remove();
      }
    });
  }

  // Initialize the lightbox
  init() {
    this.$lightbox = this.createLightbox();
    this.$container.appendChild(this.$lightbox);
    this.initEventListeners();
  }
}
