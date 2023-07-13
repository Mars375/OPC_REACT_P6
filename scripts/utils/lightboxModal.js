import { createElement } from "./createDOM.js";

let currentIndex = 0
let medias = []

export const displayLightboxModal = (mediaItems, index) => {
  const modal = document.getElementById("lightbox_modal");
  const modalContent = document.getElementById("lightbox_modal_container")
  const closeMediaModalBtn = document.getElementById("close_lightbox_modal");
  const leftArrow = document.getElementById("lightbox_modal_left_arrow");
  const rightArrow = document.getElementById("lightbox_modal_right_arrow");

  // Update the current index
  currentIndex = index;
  medias = mediaItems

  // Remove any previous content from the lightbox
  modalContent.innerHTML = "";

  //create div for img
  const mediaElementContent = createElement("div", null, {
    class: "lightbox_element_content",
  });

  //Create img element to display closeup view
  const mediaElementPictureContent = createElement(
    medias[currentIndex].image ? "img" : "video", null, {
    src: `./assets/media/${medias[currentIndex].photographerId}/${medias[currentIndex].image || medias[currentIndex].video}`,
    alt: medias[currentIndex].title,
  }
  );

  //Create title element to display closeup view
  const mediaElementTitle = createElement("p", medias[currentIndex].title, {
    class: "media_element_title",
  });

  //add img and title element to lightbox
  mediaElementContent.append(mediaElementPictureContent, mediaElementTitle);
  modalContent.append(mediaElementContent);

  document.body.style.overflow = 'hidden';
  modal.style.display = "flex"

  // add listener on our close button
  closeMediaModalBtn.addEventListener("click", closeLightboxModal)

  // add listener on our left arrow
  leftArrow.addEventListener("click", showPreviousImage);

  // add listener on our right arrow
  rightArrow.addEventListener("click", showNextImage);
}

const closeLightboxModal = () => {
  const modal = document.getElementById("lightbox_modal");
  document.body.style.overflow = '';
  modal.style.display = "none"
  document.getElementById('close_lightbox_modal').removeEventListener('click', closeLightboxModal);
}

const showPreviousImage = () => {
  currentIndex = (currentIndex - 1 + medias.length) % medias.length
  displayLightboxModal(medias, currentIndex);
}

const showNextImage = () => {
  currentIndex = (currentIndex + 1) % medias.length;
  displayLightboxModal(medias, currentIndex);
}
