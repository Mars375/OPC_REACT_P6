// Fichier photographer.js

import { getPhotographer, getPhotographerMedia } from "../../helpers/query.js";
import { PhotographerPage } from "../templates/photographePage.js";
import { MediaCard } from "../templates/mediaCard.js";
import { displayModal, closeModal } from "../utils/contactForm.js";
import { displayLightboxModal } from "../utils/displayLightboxModal.js";
import { sortMedia } from "../utils/sortMedia.js";

async function displayData(photographer, media) {
  const photographerModel = new PhotographerPage(photographer);
  const mediaContainer = document.querySelector(".media_container");

  photographerModel.getBadgeDOM();
  photographerModel.getHeaderDOM();

  const displayMedia = (sortedMedia) => {
    mediaContainer.innerHTML = "";

    const mediaCard = new MediaCard(sortedMedia);
    const mediaDOM = mediaCard.getMediaDOM();

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

    mediaCard.updateTotalLikes();
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

const form = document.getElementById('contact_form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // console.log all element
  for (const element of event.target.elements) {
    if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
      console.log(element.value);
      element.value = '';
    }
  }
  closeModal();
});

const init = async () => {
  const loader = document.getElementById('loader');
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
};

init();
