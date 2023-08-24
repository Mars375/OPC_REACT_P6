import { createElement } from "../utils/createElement.js";
import { MediaFactory } from "../factories/MediaFactory.js";

export class Lightbox {
  constructor(medias, index, photographer) {
    this._photographer = photographer;
    this._medias = medias;
    this._index = index;
    this.$lightboxInner = null;

    this.createLightbox = this.createLightbox.bind(this);
    this.updateMediaContent = this.updateMediaContent.bind(this);
    this.navigate = this.navigate.bind(this);
    this.initEventListeners = this.initEventListeners.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
  }

  // Create the lightbox structure
  createLightbox() {
    this.$lightbox = createElement('div', {
      class: 'lightbox',
    });

    this.$lightboxInner = createElement('div', {
      class: 'lightbox__inner',
      dataset: {
        index: this._index,
      },
    });

    const $lightboxClose = createElement('button', {
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

    this.$lightboxMediaContent = new MediaFactory(this._medias[this._index], this._photographer).createComponent();
    this.$lightboxMediaContent.controls = true;

    const $lightboxPrev = createElement('button', {
      class: 'lightbox__prev',
    });

    const $lightboxPrevIcon = createElement('i', {
      class: 'fas fa-chevron-left',
      'aria-label': 'Previous caption',
    });

    const $lightboxNext = createElement('button', {
      class: 'lightbox__next',
    });

    const $lightboxNextIcon = createElement('i', {
      class: 'fas fa-chevron-right',
      'aria-label': 'Next caption',
    });

    $lightboxMedia.append(this.$lightboxMediaContent);
    $lightboxPrev.append($lightboxPrevIcon);
    $lightboxNext.append($lightboxNextIcon);
    $lightboxContent.append($lightboxPrev, $lightboxMedia, $lightboxNext, $lightboxClose);
    $lightboxClose.append($lightboxCloseIcon);
    this.$lightboxInner.appendChild($lightboxContent);

    return this.$lightboxInner;
  }

  // Update the content of the lightbox media
  updateMediaContent() {
    this.$lightboxMediaContent = new MediaFactory(this._medias[this._index], this._photographer).createComponent();
    this.$lightboxMediaContent.controls = true;

    const $lightboxMedia = this.$lightboxInner.querySelector('.lightbox__caption');
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
    const $lightboxClose = this.$lightboxInner.querySelector('.lightbox__close');
    const $lightboxPrev = this.$lightboxInner.querySelector('.lightbox__prev');
    const $lightboxNext = this.$lightboxInner.querySelector('.lightbox__next');

    $lightboxClose.addEventListener('click', this.closeLightbox);
    $lightboxPrev.addEventListener('click', () => {
      this.navigate(-1);
    });
    $lightboxNext.addEventListener('click', () => {
      this.navigate(1);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.closeLightbox();
      }
      if (event.key === 'ArrowLeft') {
        this.navigate(-1);
      }
      if (event.key === 'ArrowRight') {
        this.navigate(1);
      }
    });

    document.addEventListener('click', (event) => {
      if (event.target === document.body) {
        this.closeLightbox();
      }
    });
  }

  // Close the lightbox
  closeLightbox() {
    this.$lightboxInner.remove();
    document.body.classList.remove('overlay-active');
    this.removeEventListeners();
  }

  // Remove event listeners when they are no longer needed
  removeEventListeners() {
    const $lightboxClose = this.$lightboxInner.querySelector('.lightbox__close');
    const $lightboxPrev = this.$lightboxInner.querySelector('.lightbox__prev');
    const $lightboxNext = this.$lightboxInner.querySelector('.lightbox__next');

    $lightboxClose.removeEventListener('click', this.closeLightbox);
    $lightboxPrev.removeEventListener('click', () => {
      this.navigate(-1);
    });
    $lightboxNext.removeEventListener('click', () => {
      this.navigate(1);
    });

    document.removeEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.closeLightbox();
      }
      if (event.key === 'ArrowLeft') {
        this.navigate(-1);
      }
      if (event.key === 'ArrowRight') {
        this.navigate(1);
      }
    });

    document.removeEventListener('click', (event) => {
      if (event.target === document.body) {
        this.closeLightbox();
      }
    });
  }

  // Initialize the lightbox
  init() {
    this.$lightboxInner = this.createLightbox();
    document.body.classList.add('overlay-active');
    document.body.appendChild(this.$lightboxInner);
    this.initEventListeners();
  }
}
