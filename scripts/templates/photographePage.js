import { createElement } from "../utils/createElement.js";

export class PhotographerPage {
  constructor(data) {
    const { name, tagline, city, country, portrait, price } = data;
    this.name = name;
    this.tagline = tagline;
    this.city = city;
    this.country = country;
    this.portrait = portrait;
    this.price = price;
  }

  getHeaderDOM() {
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerName = document.querySelector(".photograph-name");
    const photographInfo = document.querySelector(".photograph-info");
    const modalTitle = document.getElementById("modal_title");

    photographerName.textContent = this.name;
    modalTitle.textContent = `Contactez-moi ${this.name}`;

    photographInfo.append(
      createElement("p", this.tagline),
      createElement("p", `${this.city}, ${this.country}`)
    );

    const photographerPortrait = createElement("img", null, {
      src: `./assets/photographers/${this.portrait}`,
      alt: this.name,
    });

    photographerHeader.appendChild(photographerPortrait);
    photographerName.classList.add("photograph-name");

    return photographerHeader;
  }

  getBadgeDOM() {
    const main = document.getElementById("main");

    const badge = createElement("div", null, { class: "badge" });
    const badgeLike = createElement("p", "", { class: "badge_likes" });
    const badgePrice = createElement("p", `${this.price}€ / jour`);

    badge.append(badgeLike, badgePrice);
    main.appendChild(badge);

    return badge;
  }
}
