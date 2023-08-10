export class Loader {
  constructor() {
    this.loaderElement = document.createElement('div');
    this.loaderElement.id = 'loader';
    this.spinnerElement = document.createElement('div');
    this.spinnerElement.classList.add('loader-spinner');
    this.loaderElement.appendChild(this.spinnerElement);

    document.body.appendChild(this.loaderElement);
  }

  show() {
    this.loaderElement.style.display = 'flex';
  }

  hide() {
    this.loaderElement.style.display = 'none';
  }
}