import { createElement } from '../utils/createElement.js';

export class Loader {
  constructor(container) {
    // Create the loader container and elements
    this.loaderContainer = createElement('div', { id: 'loader-container' });
    this.loaderElement = createElement('div', { id: 'loader' });
    this.spinnerElement = createElement('div', { class: 'loader-spinner' });

    // Assemble the loader elements
    this.loaderElement.appendChild(this.spinnerElement);
    this.loaderContainer.appendChild(this.loaderElement);

    // Specify the container where the loader will be appended
    this._container = container;

    // Append the loader container to the specified container or document body
    if (this._container) {
      this._container.appendChild(this.loaderContainer);
    } else {
      document.body.appendChild(this.loaderContainer);
    }
  }

  // Show the loader with a fade-out effect
  show() {
    this.loaderContainer.style.display = 'flex';

    // Set a timeout to hide the loader and handle opacity transition
    setTimeout(() => {
      this.loaderContainer.style.opacity = '0';

      // Listen for the opacity transition end to hide the loader
      this.loaderContainer.addEventListener('transitionend', this.handleTransitionEnd);
    }, 1300);
  }

  // Handle the opacity transition end to hide the loader
  handleTransitionEnd = (event) => {
    if (event.propertyName === 'opacity' && parseFloat(event.target.style.opacity) === 0) {
      this.loaderContainer.style.display = 'none';

      // Remove the event listener to prevent memory leaks
      this.loaderContainer.removeEventListener('transitionend', this.handleTransitionEnd);
    }
  };
}
