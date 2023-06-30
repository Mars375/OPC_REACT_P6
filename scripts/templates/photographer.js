
export const photographerTemplate = (data) => {
  const { name, tagline, city, country, portrait, price } = data

  // Fill header with Photographer Data
  const getHeaderDOM = () => {

    // Get DOM Element
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerName = document.querySelector('.photograph-name')
    const photographInfo = document.querySelector('.photograph-info')


    //Create element
    const photographerTagline = document.createElement("p");
    const photographerLocation = document.createElement("p");
    const photographerPortrait = document.createElement("img");

    // Add content
    photographerName.textContent = name;
    photographerTagline.textContent = tagline;
    photographerLocation.textContent = `${city}, ${country}`;
    photographerPortrait.setAttribute('src', `./assets/photographers/${portrait}`);
    photographerPortrait.setAttribute('alt', `${name}` || '');

    //Add style
    photographerName.classList.add('photograph-name');

    // Append elements
    photographInfo.appendChild(photographerLocation);
    photographInfo.appendChild(photographerTagline);
    photographerHeader.appendChild(photographerPortrait);

    return (photographerHeader);
  }

  //Create badge element
  const getBadgeDOM = () => {
    const main = document.getElementById('main')

    //Create element
    const badge = document.createElement('div')
    const badgeLike = document.createElement('p')
    const badgePrice = document.createElement('p')
    const badgeIcon = document.createElement('span')

    //Add content
    badgeLike.textContent = '100'
    badgeIcon.textContent = '♥'
    badgePrice.textContent = `${price}€ / jour`

    //Add style
    badge.classList.add('badge')

    //Append elements
    badge.appendChild(badgeLike)
    badgeLike.appendChild(badgeIcon)
    badge.appendChild(badgePrice)
    main.appendChild(badge)

    return (badge)
  }

  return { getHeaderDOM, getBadgeDOM }
}