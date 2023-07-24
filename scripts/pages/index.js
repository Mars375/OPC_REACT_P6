import { getPhotographers } from "../../helpers/query.js";
import { PhotographerCard } from "../templates/PhotographerCard.js";

class App {
  async init() {
    const { photographers } = await getPhotographers();
    this.displayData(photographers);
  }

  displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
      const photographerCard = new PhotographerCard(photographer);
      const userCardDOM = photographerCard.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
    });
  }
}

const app = new App();
app.init();