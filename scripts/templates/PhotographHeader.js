import { createElement } from "../utils/createElement.js";

export class PhotographHeader {
  constructor(data, container) {
    this._data = data;
    this.$container = container;
  }

  getInformationSection() {
    const $informationSection = createElement(
      "article",
      {
        class: "photograph-header__information-section",
        'aria-label': "Informations sur le photographe",
        tabIndex: "0"
      });
    return $informationSection;
  }

  getPhotographName({ name }) {
    const $photographName = createElement(
      "h1",
      {
        class: "photograph-header__name",
        'aria-label': `Nom du photographe : ${name}`,
        innerText: name,
      });
    return $photographName;
  }

  getPhotographLocation({ location }) {
    const $photographLocation = createElement(
      "p",
      {
        class: "photograph-header__location",
        'aria-label': `Localisation du photographe : ${location}`,
        innerText: location,
      });
    return $photographLocation;
  }

  getPhotographTagline({ tagline }) {
    const $photographTagline = createElement(
      "p",
      {
        class: "photograph-header__tagline",
        'aria-label': `Slogan du photographe : ${tagline}`,
        innerText: tagline,
      });
    return $photographTagline;
  }

  getPhotographPortrait({ portrait, name }) {
    const $portraitWrapper = createElement(
      "div",
      {
        class: "photograph-header__portrait-wrapper",
      });

    const $photographPortrait = createElement(
      "img",
      {
        class: "photograph-header__portrait",
        'aria-label': `Portrait du photographe : ${name}`,
        tabIndex: "0",
        alt: `${name} portrait`,
        src: portrait,
      });

    $portraitWrapper.append($photographPortrait);
    return $portraitWrapper;
  }

  createPhotographHeader() {
    const $informationSection = this.getInformationSection();
    const $photographName = this.getPhotographName(this._data);
    const $photographLocation = this.getPhotographLocation(this._data);
    const $photographTagline = this.getPhotographTagline(this._data);
    const $photographPortrait = this.getPhotographPortrait(this._data);

    $informationSection.append($photographName, $photographLocation, $photographTagline);
    this.$container.prepend($informationSection)
    this.$container.append($photographPortrait);
  }
}