import { Query } from "../helpers/query.js";
import { Photographer } from "../models/Photographer.js";

export class PhotographerService {
  constructor() {
    this.query = new Query('/P6/data/photographers.json'); // Initialize the query to fetch photographers
  }

  async getPhotographer(id) {
    try {
      const photographers = await this.query.fetch(); // Get the list of photographers
      const photographer = photographers.photographers.find(photographer => parseInt(photographer.id) === parseInt(id)); // Find the photographer by ID

      // If photographer is found, return a new instance of Photographer
      // Otherwise, throw an error indicating photographer not found
      return photographer ? new Photographer(photographer) : (() => {
        throw new Error(`Photographer not found.`);
      })();

    } catch (error) {
      // Handle errors by throwing an error with an explanatory message
      throw new Error(`Error while fetching photographer: ${error.message}`);
    }
  }
}
