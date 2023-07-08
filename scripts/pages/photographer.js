import { getPhotographer, getPhotographerMedia } from "../../helpers/query.js";
import { photographerTemplate } from "../templates/photographer.js";
import { mediaCardTemplate } from "../templates/mediaCard.js"
import { handleFilterChange } from "../utils/filterSelect.js";
import { displayModal, closeModal } from "../utils/contactForm.js";

// Display photographer data with Template
async function displayData(photographer, media) {
  const photographerModel = photographerTemplate(photographer);
  mediaCardTemplate(media);
  photographerModel.getHeaderDOM();
  photographerModel.getBadgeDOM();
}

// add event listener to the filter select element
const filterSelect = document.getElementById('filter');
filterSelect.addEventListener('change', handleFilterChange);

//add event listener to mobal button
const modalBtn = document.querySelector('.contact_button');
modalBtn.addEventListener('click', displayModal);

//add event listener to close modal button
const closeModalBtn = document.getElementById('close_modal');
closeModalBtn.addEventListener('click', closeModal);

// init function
const init = async () => {
  try {
    const photographer = await getPhotographer();
    const media = await getPhotographerMedia();
    displayData(photographer, media);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de l\'initialisation :', error);
  }
}

init();