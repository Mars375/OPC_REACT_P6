import { Query } from '../helpers/query.js';
import { Loader } from '../components/Loader.js';
import { Photographer } from '../models/Photographer.js';
import { CardFactory } from '../factories/cardFactory.js';

class App {
  constructor() {
    // Initialize the query to fetch photographers' data from the JSON file
    this.query = new Query('/P6/data/photographers.json');

    // Get the section element where photographer cards will be displayed
    this.photographerSection = document.querySelector('.photographer_section');

    // Create an instance of the Loader component for showing loading spinner
    this.spinnerLoader = new Loader();
  }

  // Fetch photographers' data using the query and return the 'photographers' array
  async getPhotographers() {
    const data = await this.query.fetch();
    return data.photographers;
  }

  // Loop through each photographer's data, create and display their cards
  displayPhotographers(photographers) {
    photographers.forEach(photographerData => {
      // Create a Photographer instance from the data
      const photographer = new Photographer(photographerData);

      // Create a CardFactory instance to generate the photographer's card
      const cardFactory = new CardFactory(photographer, 'photographer');
      const card = cardFactory.createCard();

      // Append the card to the photographer section
      this.photographerSection.append(card);
    });
  }

  // Show the loading spinner, fetch photographers' data, and display their cards
  async init() {
    this.spinnerLoader.show();
    const photographers = await this.getPhotographers();
    this.displayPhotographers(photographers);
  }
}

// Instantiate the App and initialize its functionality
const app = new App();
app.init();
