export const mediaTemplate = (media) => {
  console.log(media);
  const mediaContainer = document.querySelector(".media_container");
  const mediaModel = media.map((media) => {
    const mediaElement = document.createElement("div");
    mediaElement.classList.add("media_element");
    mediaElement.setAttribute("tabindex", "0");
    mediaElement.setAttribute("aria-label", media.title);
    mediaElement.innerHTML = `
      <div class="media_element_picture">
        <img src="./assets//media/${media.photographerId}/${media.image}" alt="${media.title}">
      </div>
      <div class="media_element_info">
        <p class="media_element_title">${media.title}</p>
        <div class="media_element_like">
          <p class="media_element_like_count">${media.likes}</p>
          <i class="fas fa-heart" aria-label="likes"></i>
        </div>
      </div>
    `;
    mediaContainer.appendChild(mediaElement);
  });
  return {
    getMediaDOM: () => mediaModel,
  };

}