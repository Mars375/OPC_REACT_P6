import { getPhotographer, getPhotographerMedia } from "../../helpers/query.js";
import { photographerTemplate } from "../templates/photographer.js";
import { mediaCardTemplate } from "../templates/mediaCard.js"

// Display photographer data with Template
async function displayData(photographer, media) {
  const photographerModel = photographerTemplate(photographer);
  const mediaModel = mediaCardTemplate(media);
  photographerModel.getHeaderDOM();
  photographerModel.getBadgeDOM();
}

// function to handle filter change event
const handleFilterChange = (e) => {
  const filter = e.target.value;
  console.log(filter);
}

// add event listener to the filter select element
const filterSelect = document.getElementById('filter');
filterSelect.addEventListener('change', handleFilterChange);

const init = async () => {
  const photographer = await getPhotographer();
  const media = await getPhotographerMedia();
  displayData(photographer, media);
}

init();