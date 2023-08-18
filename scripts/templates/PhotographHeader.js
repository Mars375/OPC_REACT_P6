import { createElement } from "../utils/createElement.js";

export class PhotographHeader {
  constructor(data, container) {
    this._data = data;
    this.$container = document.querySelector(container);
  }

  // Create the information section of the header
  createInformationSection() {
    const $informationSection = createElement('article', {
      class: 'photograph-header__information-section',
      'aria-label': 'Informations sur le photographe',
      tabIndex: '0'
    });

    const $photographName = createElement('h1', {
      class: 'photograph-header__name',
      'aria-label': `Nom du photographe : ${this._data.name}`,
      innerText: this._data.name
    });

    const $photographLocation = createElement('p', {
      class: 'photograph-header__location',
      'aria-label': `Localisation du photographe : ${this._data.location}`,
      innerText: this._data.location
    });

    const $photographTagline = createElement('p', {
      class: 'photograph-header__tagline',
      'aria-label': `Slogan du photographe : ${this._data.tagline}`,
      innerText: this._data.tagline
    });

    $informationSection.append($photographName, $photographLocation, $photographTagline);
    return $informationSection;
  }

  // Create the photographer portrait
  createPhotographPortrait() {
    const $portraitWrapper = createElement('div', {
      class: 'photograph-header__portrait-wrapper'
    });

    const $photographPortrait = createElement('img', {
      class: 'photograph-header__portrait',
      'aria-label': `Portrait du photographe : ${this._data.name}`,
      tabIndex: '0',
      alt: `${this._data.name} portrait`,
      src: `assets/photographers/${this._data.portrait}`
    });

    $portraitWrapper.append($photographPortrait);
    return $portraitWrapper;
  }

  // Create the photograph header
  createPhotographHeader() {
    const $informationSection = this.createInformationSection();
    const $photographPortrait = this.createPhotographPortrait();

    this.$container.prepend($informationSection);
    this.$container.append($photographPortrait);
  }
}
