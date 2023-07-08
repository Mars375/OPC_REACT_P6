import { createElement } from '../utils/createDOM.js';

export function photographerCardTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  function getUserCardDOM() {

    // Create all elements using createElement function
    const article = createElement('article');
    // Create URL for the photographer page
    const url = `./photographer.html?id=${id}`;
    const link = createElement('a', null, { href: url });
    const div = createElement('div', null, { tabindex: '0' });
    const img = createElement('img', null, { src: `./assets/photographers/${portrait}`, alt: name });
    const h2 = createElement('h2', name);
    const section = createElement('section');
    const location = createElement('p', `${city}, ${country}`);
    const tag = createElement('p', tagline);
    const pricePerDay = createElement('p', `${price}€/jour`);

    // Append all element to their respective container
    div.append(img, h2);
    section.append(location, tag, pricePerDay);
    link.append(div);
    article.append(link, section);

    return article;
  }

  return { getUserCardDOM };
}
