import { createElement } from "../utils/createElement.js";

export class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer
  }

  getCardWrapper({ name }) {
    const $cardWrapper = createElement(
      'div',
      {
        class: 'card-photographer',
        'aria-label': `Photographer ${name}`
      })
    return $cardWrapper
  }

  getInformationSection() {
    const $informationSection = createElement(
      'div',
      {
        class: 'card-photographer__information',
        'aria-label': 'Plus d&apos;informations',
        tabindex: '0'
      })
    return $informationSection
  }

  getLink({ id }) {
    const $link = createElement(
      'a',
      {
        class: 'card-photographer__link',
        href: `./photographer.html?id=${id}`,
        'aria-roledescription': '',
        'aria-label': '',
        tabindex: '0'
      })
    return $link
  }

  getPortrait({ name, portrait }) {
    const $portraitWrapper = createElement(
      'div',
      {
        class: 'card-photographer__portrait'
      })
    const $portraitImage = createElement(
      'img',
      {
        src: portrait,
        alt: `Portrait de ${name}`
      })
    $portraitWrapper.append($portraitImage)
    return $portraitWrapper
  }

  getName({ name }) {
    const $nameElement = createElement(
      'h2',
      {
        class: 'card-photographer__name',
        innerText: name
      })
    return $nameElement
  }

  getLocation({ location }) {
    const $locationElement = createElement(
      'p',
      {
        class: 'card-photographer__location',
        'aria-roledescription': 'Localisation de l&apos;artiste',
        'aria-label': 'Ville et Pays',
        innerText: location
      })
    return $locationElement
  }

  getTagline({ tagline }) {
    const $taglineElement = createElement(
      'p',
      {
        class: 'card-photographer__tagline',
        'aria-roledescription': 'Tagline de l&apos;artiste',
        'aria-label': 'Tagline',
        innerText: tagline
      })
    return $taglineElement
  }

  getPrice({ price }) {
    const $priceElement = createElement(
      'p',
      {
        class: 'card-photographer__price',
        'aria-roledescription': 'Tarif journalier de l&apos;artiste',
        'aria-label': 'Tarif journalier',
        innerText: `${price}€/jour`
      })
    return $priceElement
  }

  createCard() {
    const cardWrapper = this.getCardWrapper(this._photographer)
    const informationSection = this.getInformationSection()
    const link = this.getLink(this._photographer)
    const portrait = this.getPortrait(this._photographer)
    const name = this.getName(this._photographer)
    const location = this.getLocation(this._photographer)
    const tagline = this.getTagline(this._photographer)
    const price = this.getPrice(this._photographer)

    informationSection.append(location, tagline, price)
    link.append(portrait, name)
    cardWrapper.append(link, informationSection)

    return cardWrapper
  }
}