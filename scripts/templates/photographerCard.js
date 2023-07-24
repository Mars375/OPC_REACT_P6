import { createElement } from "../utils/createElement.js"

export class PhotographerCard {
  constructor(data) {
    const { name, portrait, id, city, country, tagline, price } = data;
    this.name = name;
    this.portrait = portrait;
    this.id = id;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.price = price;
  }

  getUserCardDOM() {
    const article = createElement("article");
    const url = `./photographer.html?id=${this.id}`;
    const link = createElement("a", null, { href: url });
    const div = createElement("div", null, { tabindex: "0" });
    const img = createElement("img", null, {
      src: `./assets/photographers/${this.portrait}`,
      alt: this.name,
      class: "clickableImg",
    });
    const h2 = createElement("h2", this.name);
    const section = createElement("section");
    const location = createElement("p", `${this.city}, ${this.country}`);
    const tag = createElement("p", this.tagline);
    const pricePerDay = createElement("p", `${this.price}€/jour`);

    div.append(img, h2);
    section.append(location, tag, pricePerDay);
    link.append(div);
    article.append(link, section);

    return article;
  }
}