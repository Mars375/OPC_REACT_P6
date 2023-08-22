import { createElement } from '../utils/createElement.js';

export class Loader {
  constructor() {
    this.loaderContainer = createElement('div', { id: 'loader-container' });
    this.loaderElement = createElement('div', { id: 'loader' });
    this.spinnerElement = createElement('div', { class: 'loader-spinner' });

    this.loaderElement.appendChild(this.spinnerElement);
    this.loaderContainer.appendChild(this.loaderElement);

    document.body.appendChild(this.loaderContainer);
  }

  show() {
    this.loaderContainer.style.display = 'flex';
    setTimeout(() => {
      this.loaderContainer.style.display = 'none';
    }, 1000);
  }
}
