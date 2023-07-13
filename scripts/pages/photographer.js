import { getPhotographer, getPhotographerMedia } from "../../helpers/query.js";
import { photographerTemplate } from "../templates/photographer.js";
import { mediaCardTemplate } from "../templates/mediaCard.js";
import { sortMedia } from "../utils/filterSelect.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { displayLightboxModal } from "../utils/lightboxModal.js";

// Display photographer data with Template
async function displayData(photographer, media) {
  const photographerModel = photographerTemplate(photographer);
  const mediaContainer = document.querySelector(".media_container");

  photographerModel.getBadgeDOM();
  photographerModel.getHeaderDOM();

  const displayMedia = (sortedMedia) => {
    mediaContainer.innerHTML = "";

    const mediaModel = mediaCardTemplate(sortedMedia);
    const mediaDOM = mediaModel.getMediaDOM();

    mediaDOM.forEach((mediaElement, index) => {
      const mediaElementPicture = mediaElement.querySelector(".media_element_picture");
      mediaElementPicture.addEventListener("click", () => {
        displayLightboxModal(sortedMedia, index);
      });
      mediaElementPicture.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          displayLightboxModal(sortedMedia, index);
        }
      });
    });
    mediaModel.updateTotalLikes()
  };

  const filterSelect = document.getElementById('filter');

  // Initial display of media (default: popularity)
  displayMedia(sortMedia(media, "popularite"));

  filterSelect.addEventListener('change', (event) => {
    const selectedOption = event.target.value;
    displayMedia(sortMedia(media, selectedOption));
  });

}

const modalBtn = document.querySelector('.contact_button');
modalBtn.addEventListener('click', displayModal);

const closeModalBtn = document.getElementById('close_modal');
closeModalBtn.addEventListener('click', closeModal);

const init = async () => {
  const loader = document.getElementById('loader')
  try {
    const photographer = await getPhotographer();
    const media = await getPhotographerMedia();
    await displayData(photographer, media);
    // timeout before remove loader
    setTimeout(() => {
      loader.remove();
    }, 1000);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'initialisation :', error);
  }
}

init();
