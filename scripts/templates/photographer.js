function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  function getUserCardDOM() {
    // Create new article
    const article = document.createElement('article');

    // Create new link
    const url = `./photographer.html?id=${id}`;
    const link = document.createElement('a');
    link.setAttribute('href', url)

    // Create new div
    const div = document.createElement('div');
    div.setAttribute('tabindex', '0');

    // Create img element
    const img = document.createElement('img');
    img.setAttribute('src', `./assets/photographers/${portrait}`);
    img.setAttribute('alt', `${name}`);

    // Create title element for name
    const h2 = document.createElement('h2')
    h2.textContent = name;

    // Create section element for details section
    const section = document.createElement('section');

    // Create paragraph element for location
    const location = document.createElement('p');
    location.textContent = `${city}, ${country}`;

    // Create paragraph element for tagline
    const tag = document.createElement('p');
    tag.textContent = tagline;

    // Create paragraph element for price
    const pricePerDay = document.createElement('p');
    pricePerDay.textContent = `${price}€/jour`;

    // Append elements to article
    div.appendChild(img)
    div.appendChild(h2)
    section.appendChild(location)
    section.appendChild(tag)
    section.appendChild(pricePerDay)
    link.appendChild(div)
    article.appendChild(link)
    article.appendChild(section)
    return (article);
  }
  return { getUserCardDOM }
}