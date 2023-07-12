import { createElement } from "./createDOM.js";

export const displayLightboxModal = (mediaItem) => {
  const modal = document.getElementById("lightbox_modal");
  const modalContent = document.getElementById("lightbox_modal_container")

  // Remove any previous content from the lightbox
  modalContent.innerHTML = "";

  //create div for img
  const mediaElementContent = createElement("div", null, {
    class: "lightbox_element_content",
  });

  //Create img element to display closeup view
  const mediaElementPictureContent = createElement(
    mediaItem.image ? "img" : "video", null, {
    src: `./assets/media/${mediaItem.photographerId}/${mediaItem.image || mediaItem.video}`,
    alt: mediaItem.title,
  }
  );

  //Create title element to display closeup view
  const mediaElementTitle = createElement("p", mediaItem.title, {
    class: "media_element_title",
  });

  //add img and title element to lightbox
  mediaElementContent.append(mediaElementPictureContent, mediaElementTitle);
  modalContent.append(mediaElementContent);

  document.body.style.overflow = 'hidden';
  modal.style.display = "flex"

  const closeMediaModalBtn = document.getElementById("close_lightbox_modal");
  closeMediaModalBtn.addEventListener("click", closeLightboxModal)
}

export const closeLightboxModal = () => {
  const modal = document.getElementById("lightbox_modal");
  document.body.style.overflow = '';
  modal.style.display = "none"
  document.getElementById('close_lightbox_modal').removeEventListener('click', closeLightboxModal);
}
