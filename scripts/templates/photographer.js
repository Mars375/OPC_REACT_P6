import { createElement } from "../utils/createDOM.js";

export const photographerTemplate = (data) => {
  const { name, tagline, city, country, portrait, price } = data;

  // Fill header with Photographer Data
  const getHeaderDOM = () => {
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerName = document.querySelector('.photograph-name');
    const photographInfo = document.querySelector('.photograph-info');
    const modalTitle = document.getElementById('modal_title')

    // Set photographer name
    photographerName.textContent = name;
    modalTitle.textContent = `Contactez-moi ${name}`;

    // Append tagline and location paragraphs to photographInfo
    photographInfo.append(
      createElement("p", tagline),
      createElement("p", `${city}, ${country}`)
    );

    // Create photographer portrait element
    const photographerPortrait = createElement("img", null, {
      src: `./assets/photographers/${portrait}`,
      alt: name
    });

    // Append photographer portrait to photographerHeader
    photographerHeader.appendChild(photographerPortrait);

    // Add class to photographer name
    photographerName.classList.add('photograph-name');

    return photographerHeader;
  };

  // Create badge element
  const getBadgeDOM = () => {
    const main = document.getElementById('main');

    // Create all elements using createElement function
    const badge = createElement("div", null, { class: "badge" });
    const badgeLike = createElement("p", '100');
    const badgeIcon = createElement("span", '♥');
    const badgePrice = createElement("p", `${price}€ / jour`);

    // Append all elements
    badge.append(badgeLike, badgePrice);
    badgeLike.appendChild(badgeIcon);
    main.appendChild(badge);

    return badge;
  };

  return { getHeaderDOM, getBadgeDOM };
};
