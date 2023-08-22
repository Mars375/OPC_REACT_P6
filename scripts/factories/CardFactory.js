import { PhotographerCard } from "../templates/PhotographerCard.js";
import { MediaCard } from "../templates/MediaCard.js";

export class CardFactory {
  constructor(data, type, photographer) {
    // Store the data and type parameters
    this.data = data;
    this.type = type;
    this.photographer = photographer;

    // Depending on the type, create an instance of the corresponding card
    // This uses a ternary operator to conditionally choose the card type
    return this.type === 'photographer' ?
      new PhotographerCard(this.data) :
      new MediaCard(this.data, this.photographer);
  }
}
