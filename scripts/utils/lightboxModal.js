import { createElement } from "./createDOM.js";

let currentIndex = 0
let medias = []

// get DOM content
const modal = document.getElementById("lightbox_modal");
const modalContent = document.getElementById("lightbox_modal_container")
const closeMediaModalBtn = document.getElementById("close_lightbox_modal");
const leftArrow = document.getElementById("lightbox_modal_left_arrow");
const rightArrow = document.getElementById("lightbox_modal_right_arrow");


// add listener on our close button
closeMediaModalBtn.addEventListener("click", closeLightboxModal)

// add listener on our left arrow
leftArrow.addEventListener("click", showPreviousImage);

// add listener on our right arrow
rightArrow.addEventListener("click", showNextImage);

// add listener on our keyboard
document.addEventListener("keydown", handleKeyDown);

export const displayLightboxModal = (mediaItems, index) => {
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
    controls: "true"
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

}

function handleKeyDown(event) {
  switch (event.key) {
    case "ArrowLeft":
      showPreviousImage();
      break;
    case "ArrowRight":
      showNextImage();
      break;
    case "Escape":
      closeLightboxModal();
      break;
    default:
      break;
  }
}

function closeLightboxModal() {
  modal.style.display = "none"
  document.body.style.overflow = '';
}

function showPreviousImage() {
  currentIndex = (currentIndex - 1 + medias.length) % medias.length
  displayLightboxModal(medias, currentIndex);
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % medias.length;
  displayLightboxModal(medias, currentIndex);
}
