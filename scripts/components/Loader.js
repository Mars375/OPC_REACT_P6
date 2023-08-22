import { createElement } from '../utils/createElement.js';

export class Loader {
  constructor(container) {
    this.loaderContainer = createElement('div', { id: 'loader-container' });
    this.loaderElement = createElement('div', { id: 'loader' });
    this.spinnerElement = createElement('div', { class: 'loader-spinner' });

    this.loaderElement.appendChild(this.spinnerElement);
    this.loaderContainer.appendChild(this.loaderElement);
    this._container = container;

    this._container ? this._container.appendChild(this.loaderContainer) : document.body.appendChild(this.loaderContainer);
  }

  show() {
    this.loaderContainer.style.display = 'flex';
  }

  hide() {
    this.loaderContainer.style.display = 'none';
  }
}
